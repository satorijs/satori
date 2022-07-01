import { Bot, Adapter } from '@satorijs/core'
import { Awaitable, Time } from 'cosmokit'
import WebSocket from 'ws'
import Logger from 'reggol'

declare module '@satorijs/core' {
  interface Bot {
    socket?: WebSocket
  }

  namespace Adapter {
    export namespace WsClient {
      export interface Config extends Bot.BaseConfig {
        retryLazy?: number
        retryTimes?: number
        retryInterval?: number
      }
    }

    export abstract class WsClient<T extends Bot<WsClient.Config>> extends Adapter.Client<T> {
      protected abstract prepare(): Awaitable<WebSocket>
      protected abstract accept(): void
      start(bot: T): Promise<void>
      stop(bot: T): Promise<void>
    }
  }
}

const logger = new Logger('adapter')

abstract class WsClient<T extends Bot<Adapter.WsClient.Config>> extends Adapter.Client<T> {
  static reusable = true

  protected abstract prepare(): Awaitable<WebSocket>
  protected abstract accept(): void

  async start() {
    let _retryCount = 0
    const { retryTimes, retryInterval, retryLazy } = this.config

    const reconnect = async (initial = false) => {
      logger.debug('websocket client opening')
      const socket = await this.prepare()
      const url = socket.url.replace(/\?.+/, '')

      socket.on('error', error => logger.debug(error))

      socket.on('close', (code, reason) => {
        this.bot.socket = null
        logger.debug(`websocket closed with ${code}`)
        if (this.bot.status === 'disconnect') {
          return this.bot.status = 'offline'
        }

        // remove query args to protect privacy
        const message = reason.toString() || `failed to connect to ${url}, code: ${code}`
        let timeout = retryInterval
        if (_retryCount >= retryTimes) {
          if (initial) {
            return this.bot.reject(new Error(message))
          } else {
            timeout = retryLazy
          }
        }

        _retryCount++
        this.bot.status = 'reconnect'
        logger.warn(`${message}, will retry in ${Time.format(timeout)}...`)
        setTimeout(() => {
          if (this.bot.status === 'reconnect') reconnect()
        }, timeout)
      })

      socket.on('open', () => {
        _retryCount = 0
        this.bot.socket = socket
        logger.info('connect to server: %c', url)
        this.accept()
      })
    }

    reconnect(true)
  }

  async stop() {
    if (this.bot.socket) {
      this.bot.socket.close()
    } else {
      this.bot.status = 'offline'
    }
  }
}

Object.defineProperties(Adapter, {
  WsClient: { value: WsClient, enumerable: true },
})
