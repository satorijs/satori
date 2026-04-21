import { Awaitable, Time } from 'cosmokit'
import { Status, WebSocket } from '@satorijs/protocol'
import type {} from '@cordisjs/plugin-logger'
import { Context } from 'cordis'
import { Bot } from './bot'
import z from 'schemastery'

export interface WsClientConfig {
  retryLazy: number
  retryTimes: number
  retryInterval: number
}

export const WsClientConfig: z<WsClientConfig> = z.object({
  retryTimes: z.natural().description('初次连接时的最大重试次数。').default(6),
  retryInterval: z.natural().role('ms').description('初次连接时的重试时间间隔。').default(5 * Time.second),
  retryLazy: z.natural().role('ms').description('连接关闭后的重试时间间隔。').default(Time.minute),
}).description('连接设置')

export abstract class WsClientBase<B extends Bot = Bot> {
  protected socket?: WebSocket
  protected connectionId = 0

  protected abstract prepare(): Awaitable<WebSocket>
  protected abstract accept(socket: WebSocket): void
  protected abstract getActive(): boolean
  protected abstract setStatus(status: Status, error?: Error): void

  constructor(public ctx: Context, public bot: B, public config: WsClientConfig) {}

  async start() {
    let retryCount = 0
    const connectionId = ++this.connectionId
    const logger = this.ctx.logger('adapter')
    const { retryTimes, retryInterval, retryLazy } = this.config

    const reconnect = (initial: boolean, message: string) => {
      if (!this.getActive() || connectionId !== this.connectionId) return

      let timeout = retryInterval
      if (retryCount >= retryTimes) {
        if (initial) {
          return this.setStatus(Status.OFFLINE, new Error(message))
        } else {
          timeout = retryLazy
        }
      }

      retryCount++
      this.setStatus(Status.RECONNECT)
      logger.warn(`${message}, will retry in ${Time.format(timeout)}...`)
      setTimeout(() => {
        if (!this.getActive() || connectionId !== this.connectionId) return
        connect()
      }, timeout)
    }

    const connect = async (initial = false) => {
      logger.debug('websocket client opening')
      let socket: WebSocket
      try {
        socket = await this.prepare()
      } catch (error: any) {
        reconnect(initial, error.toString() || `failed to prepare websocket`)
        return
      }

      // remove query args to protect privacy
      const url = socket.url.replace(/\?.+/, '')

      socket.addEventListener('error', (event) => {
        if (event.message) logger.warn(event.message)
      })

      socket.addEventListener('close', ({ code, reason }) => {
        if (this.socket === socket) this.socket = undefined
        logger.debug(`websocket closed with ${code}`)
        reconnect(initial, reason.toString() || `failed to connect to ${url}, code: ${code}`)
      })

      socket.addEventListener('open', () => {
        retryCount = 0
        this.socket = socket
        logger.info('connect to server: %c', url)
        this.accept(socket)
      })
    }

    connect(true)
  }

  async stop() {
    this.socket?.close()
  }
}

export abstract class WsClient<B extends Bot<WsClientConfig>> extends WsClientBase<B> {
  constructor(ctx: Context, bot: B) {
    super(ctx, bot, bot.config)
  }

  getActive() {
    return this.bot.isActive
  }

  setStatus(status: Status, error?: Error) {
    this.bot.status = status
    this.bot.error = error
  }

  async connect() {
    this.start()
  }

  async disconnect() {
    this.stop()
  }
}
