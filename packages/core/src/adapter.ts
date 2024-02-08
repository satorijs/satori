import { Awaitable, remove, Time } from 'cosmokit'
import { Status, WebSocket } from '@satorijs/protocol'
import { Context, Schema } from '.'
import { Bot } from './bot'

export abstract class Adapter<C extends Context = Context, B extends Bot<C> = Bot<C>> {
  static schema = false as const

  public bots: B[] = []

  constructor(protected ctx: C) {}
  async connect(bot: B) {}
  async disconnect(bot: B) {}

  fork(ctx: Context, bot: B) {
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

  export abstract class WsClientBase<C extends Context, B extends Bot<C>> extends Adapter<C, B> {
    protected socket: WebSocket

    protected abstract prepare(): Awaitable<WebSocket>
    protected abstract accept(socket: WebSocket): void
    protected abstract getActive(): boolean
    protected abstract setStatus(status: Status, error?: Error): void

    constructor(ctx: C, public config: WsClientConfig) {
      super(ctx)
    }

    async start() {
      let _retryCount = 0
      const logger = this.ctx.logger('adapter')
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

  export abstract class WsClient<C extends Context, B extends Bot<C, WsClientConfig>> extends WsClientBase<C, B> {
    static reusable = true

    constructor(ctx: C, public bot: B) {
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

    async connect(bot: B) {
      this.start()
    }

    async disconnect(bot: B) {
      this.stop()
    }
  }
}
