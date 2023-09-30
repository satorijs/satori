import { Awaitable, remove, Time } from 'cosmokit'
import { Status, WebSocket } from '@satorijs/protocol'
import { Context } from '.'
import { Bot } from './bot'
import Schema from 'schemastery'
import Logger from 'reggol'

const logger = new Logger('adapter')

export abstract class Adapter<T extends Bot = Bot> {
  static schema = false

  public bots: T[] = []

  async connect(bot: T) {}
  async disconnect(bot: T) {}

  fork(ctx: Context, bot: T) {
    bot.adapter = this
    this.bots.push(bot)
    ctx.on('dispose', () => {
      remove(this.bots, bot)
    })
  }
}

export namespace Adapter {
  export interface WsClientConfig {
    retryLazy?: number
    retryTimes?: number
    retryInterval?: number
  }

  export const WsClientConfig: Schema<WsClientConfig> = Schema.object({
    retryTimes: Schema.natural().description('初次连接时的最大重试次数。').default(6),
    retryInterval: Schema.natural().role('ms').description('初次连接时的重试时间间隔。').default(5 * Time.second),
    retryLazy: Schema.natural().role('ms').description('连接关闭后的重试时间间隔。').default(Time.minute),
  }).description('连接设置')

  export abstract class WsClientBase<T extends Bot = Bot> extends Adapter<T> {
    protected socket: WebSocket

    protected abstract prepare(): Awaitable<WebSocket>
    protected abstract accept(socket: WebSocket): void
    protected abstract getActive(): boolean
    protected abstract setStatus(status: Status, error?: Error): void

    constructor(public ctx: Context, public config: WsClientConfig) {
      super()
    }

    async start() {
      let _retryCount = 0
      const { retryTimes, retryInterval, retryLazy } = this.config

      const reconnect = async (initial = false) => {
        logger.debug('websocket client opening')
        const socket = await this.prepare()
        // remove query args to protect privacy
        const url = socket.url.replace(/\?.+/, '')

        socket.addEventListener('error', (event) => {
          logger.debug(event)
        })

        socket.addEventListener('close', ({ code, reason }) => {
          this.socket = null
          logger.debug(`websocket closed with ${code}`)
          if (!this.getActive()) return

          const message = reason.toString() || `failed to connect to ${url}, code: ${code}`
          let timeout = retryInterval
          if (_retryCount >= retryTimes) {
            if (initial) {
              return this.setStatus(Status.OFFLINE, new Error(message))
            } else {
              timeout = retryLazy
            }
          }

          _retryCount++
          this.setStatus(Status.RECONNECT)
          logger.warn(`${message}, will retry in ${Time.format(timeout)}...`)
          setTimeout(() => {
            if (this.getActive()) reconnect()
          }, timeout)
        })

        socket.addEventListener('open', () => {
          _retryCount = 0
          this.socket = socket
          logger.info('connect to server: %c', url)
          this.accept(socket)
        })
      }

      reconnect(true)
    }

    async stop() {
      this.socket?.close()
    }
  }

  export abstract class WsClient<T extends Bot<WsClientConfig>> extends WsClientBase<T> {
    static reusable = true
    static Config = WsClientConfig

    constructor(ctx: Context, public bot: T) {
      super(ctx, bot.config)
      bot.adapter = this
    }

    getActive() {
      return this.bot.isActive
    }

    setStatus(status: Status, error: Error = null) {
      this.bot.status = status
      this.bot.error = error
    }

    async connect(bot: T) {
      this.start()
    }

    async disconnect(bot: T) {
      this.stop()
    }
  }
}
