import { Bot, Adapter, Context } from '@satorijs/core'
import { Awaitable, Time } from 'cosmokit'
import Schema from 'schemastery'
import WebSocket from 'ws'
import Logger from 'reggol'

declare module '@satorijs/core' {
  interface Bot {
    socket?: WebSocket
  }

  namespace Adapter {
    export namespace WsClient {
      export interface Config extends Bot.Config {
        retryLazy?: number
        retryTimes?: number
        retryInterval?: number
      }

      export const Config: Schema<Config>
    }

    export abstract class WsClient<T extends Bot<Context, WsClient.Config>> extends Adapter.Client<T> {
      protected abstract prepare(bot: T): Awaitable<WebSocket>
      protected abstract accept(bot: T): void
    }
  }
}

const logger = new Logger('adapter')

abstract class WsClient<T extends Bot<Context, Adapter.WsClient.Config>> extends Adapter.Client<T> {
  static reusable = true

  static Config: Schema<Adapter.WsClient.Config> = Schema.object({
    retryTimes: Schema.natural().description('初次连接时的最大重试次数，仅用于 ws 协议。').default(6),
    retryInterval: Schema.natural().role('ms').description('初次连接时的重试时间间隔，仅用于 ws 协议。').default(5 * Time.second),
    retryLazy: Schema.natural().role('ms').description('连接关闭后的重试时间间隔，仅用于 ws 协议。').default(Time.minute),
  }).description('连接设置')

  protected abstract prepare(bot: T): Awaitable<WebSocket>
  protected abstract accept(bot: T): void

  async start(bot: T) {
    let _retryCount = 0
    const { retryTimes, retryInterval, retryLazy } = bot.config

    const reconnect = async (initial = false) => {
      logger.debug('websocket client opening')
      const socket = await this.prepare(bot)
      const url = socket.url.replace(/\?.+/, '')

      socket.on('error', error => logger.debug(error))

      socket.on('close', (code, reason) => {
        bot.socket = null
        logger.debug(`websocket closed with ${code}`)
        if (bot.status === 'disconnect') {
          return bot.status = 'offline'
        }

        // remove query args to protect privacy
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

      socket.on('open', () => {
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

Object.defineProperties(Adapter, {
  WsClient: { value: WsClient, enumerable: true },
})
