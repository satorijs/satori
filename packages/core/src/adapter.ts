import { Awaitable, remove, Time } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import Schema from 'schemastery'
import Logger from 'reggol'
import WebSocket from 'ws'

const logger = new Logger('adapter')

export abstract class Adapter<T extends Bot = Bot> {
  static schema = false

  async start(bot: T) {}
  async stop(bot: T) {}
}

export namespace Adapter {
  export abstract class Client<T extends Bot = Bot> extends Adapter<T> {
    static reusable = true

    constructor(protected ctx: Context, protected bot: T) {
      super()
      bot.adapter = this
    }
  }

  export abstract class Server<T extends Bot = Bot> extends Adapter<T> {
    public bots: T[] = []

    fork(ctx: Context, bot: T) {
      bot.adapter = this
      this.bots.push(bot)
      ctx.on('dispose', () => {
        remove(this.bots, bot)
      })
    }
  }

  export namespace WsClient {
    export interface Config extends Bot.Config {
      retryLazy?: number
      retryTimes?: number
      retryInterval?: number
    }
  }

  export abstract class WsClient<T extends Bot<WsClient.Config>> extends Adapter.Client<T> {
    static reusable = true

    static Config: Schema<Adapter.WsClient.Config> = Schema.object({
      retryTimes: Schema.natural().description('初次连接时的最大重试次数。').default(6),
      retryInterval: Schema.natural().role('ms').description('初次连接时的重试时间间隔。').default(5 * Time.second),
      retryLazy: Schema.natural().role('ms').description('连接关闭后的重试时间间隔。').default(Time.minute),
    }).description('连接设置')

    protected abstract prepare(bot: T): Awaitable<WebSocket>
    protected abstract accept(bot: T): void

    async start(bot: T) {
      let _retryCount = 0
      const { retryTimes, retryInterval, retryLazy } = bot.config

      const reconnect = async (initial = false) => {
        logger.debug('websocket client opening')
        const socket = await this.prepare(bot)
        // remove query args to protect privacy
        const url = socket.url.replace(/\?.+/, '')

        socket.addEventListener('error', ({ error }) => {
          logger.debug(error)
        })

        socket.addEventListener('close', ({ code, reason }) => {
          bot.socket = null
          logger.debug(`websocket closed with ${code}`)
          if (bot.status === 'disconnect') {
            return bot.status = 'offline'
          }

          const message = reason.toString() || `failed to connect to ${url}, code: ${code}`
          let timeout = retryInterval
          if (_retryCount >= retryTimes) {
            if (initial) {
              bot.error = new Error(message)
              return bot.status = 'offline'
            } else {
              timeout = retryLazy
            }
          }

          _retryCount++
          bot.status = 'reconnect'
          logger.warn(`${message}, will retry in ${Time.format(timeout)}...`)
          setTimeout(() => {
            if (bot.status === 'reconnect') reconnect()
          }, timeout)
        })

        socket.addEventListener('open', () => {
          _retryCount = 0
          bot.socket = socket
          logger.info('connect to server: %c', url)
          this.accept(bot)
        })
      }

      reconnect(true)
    }

    async stop(bot: T) {
      bot.socket?.close()
    }
  }
}
