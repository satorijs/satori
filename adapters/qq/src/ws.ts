import { Adapter, Context, Schema } from '@satorijs/core'
import { QQBot } from './bot'
import { Opcode, Payload } from './types'
import { adaptSession, decodeUser } from './utils'

export class WsClient<C extends Context = Context> extends Adapter.WsClient<C, QQBot<C, QQBot.Config & WsClient.Options>> {
  _sessionId = ''
  _s: number = null
  _ping: NodeJS.Timeout
  _acked = true

  async prepare() {
    if (this.bot.config.authType === 'bearer') await this.bot.getAccessToken()
    try {
      const url = this.bot.config.gatewayUrl
        ? this.bot.config.gatewayUrl
        : (await this.bot.internal.getGateway()).url.replace('api.sgroup.qq.com', new URL(this.bot.config.endpoint).host)
      this.bot.logger.debug('url: %s', url)
      return this.bot.http.ws(url)
    } catch (error) {
      if (this.bot.http.isError(error) && error.response) {
        this.bot.logger.warn(`GET /gateway response: %o`, error.response.data)
      }
      throw error
    }
  }

  heartbeat() {
    if (!this._acked) {
      this.bot.logger.warn('zombied connection')
      return this.socket.close()
    }
    this.socket.send(JSON.stringify({
      op: Opcode.HEARTBEAT,
      s: this._s,
    }))
    this._acked = false
  }

  async accept() {
    this.socket.addEventListener('message', async ({ data }) => {
      const parsed: Payload = JSON.parse(data.toString())
      this.bot.logger.debug('websocket receives %o', parsed)
      if (parsed.op === Opcode.HELLO) {
        const token = this.bot.config.authType === 'bearer'
          ? `QQBot ${await this.bot.getAccessToken()}`
          : `Bot ${this.bot.config.id}.${this.bot.config.token}`
        if (this._sessionId) {
          this.socket.send(JSON.stringify({
            op: Opcode.RESUME,
            d: {
              token,
              session_id: this._sessionId,
              seq: this._s,
            },
          }))
        } else {
          this.socket.send(JSON.stringify({
            op: Opcode.IDENTIFY,
            d: {
              token,
              intents: this.bot.config.intents,
              shard: [0, 1],
            },
          }))
        }
        this._ping = setInterval(() => this.heartbeat(), parsed.d.heartbeat_interval)
      } else if (parsed.op === Opcode.HEARTBEAT_ACK) {
        this._acked = true
      } else if (parsed.op === Opcode.INVALID_SESSION) {
        this._sessionId = ''
        this._s = null
        this.bot.logger.warn('offline: invalid session')
      } else if (parsed.op === Opcode.RECONNECT) {
        this.bot.logger.warn('offline: server request reconnect')
      } else if (parsed.op === Opcode.DISPATCH) {
        this.bot.dispatch(this.bot.session({
          type: 'internal',
          _type: 'qq/' + parsed.t.toLowerCase().replace(/_/g, '-'),
          _data: parsed.d,
        }))
        this._s = parsed.s
        if (parsed.t === 'READY') {
          this._sessionId = parsed.d.session_id
          this.bot.user = decodeUser(parsed.d.user)
          this.bot.guildBot.user = this.bot.user
          try {
            await this.bot.initialize()
          } catch (e) {
            this.bot.logger.warn(e)
          }
          return this.bot.online()
        }
        if (parsed.t === 'RESUMED') {
          return this.bot.online()
        }
        const session = await adaptSession(this.bot, parsed)
        if (session) this.bot.dispatch(session)
        // this.bot.logger.debug(session)
      }
    })

    this.socket.addEventListener('close', (e) => {
      this.bot.logger.debug('websocket closed, code %o, reason: %s', e.code, e.reason)
      if (e.code > 4000 && ![4008, 4009].includes(e.code)) {
        this._sessionId = ''
        this._s = null
      }
      clearInterval(this._ping)
    })
  }
}

export namespace WsClient {
  export interface Options extends Adapter.WsClientConfig {
    protocol?: 'websocket'
  }

  export const Options: Schema<Options> = Schema.intersect([
    Schema.object({
      protocol: Schema.const('websocket').required(false),
    }),
    Adapter.WsClientConfig,
  ])
}
