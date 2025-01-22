import { Adapter, Context, Schema } from '@satorijs/core'
import { Gateway } from './types'
import { adaptSession, decodeUser } from './utils'
import { DiscordBot } from './bot'

export class WsClient<C extends Context = Context> extends Adapter.WsClient<C, DiscordBot<C>> {
  _d = 0
  _ping?: NodeJS.Timeout
  _sessionId = ''
  _resumeUrl?: string

  async prepare() {
    if (this._resumeUrl) {
      return this.bot.http.ws(this._resumeUrl + '/?v=10&encoding=json')
    }
    const { url } = await this.bot.internal.getGatewayBot()
    return this.bot.http.ws(url + '/?v=10&encoding=json')
  }

  heartbeat() {
    if (!this.socket) return
    this.bot.logger.debug(`heartbeat d ${this._d}`)
    this.socket.send(JSON.stringify({
      op: Gateway.Opcode.HEARTBEAT,
      d: this._d,
    }))
  }

  accept() {
    this.socket!.addEventListener('message', async ({ data }) => {
      let parsed: Gateway.Payload
      data = data.toString()
      try {
        parsed = JSON.parse(data)
      } catch (error) {
        return this.bot.logger.warn('cannot parse message', data)
      }
      this.bot.logger.debug(parsed)
      if (parsed.s) {
        this._d = parsed.s
      }

      // https://discord.com/developers/docs/topics/gateway#connection-lifecycle
      if (parsed.op === Gateway.Opcode.HELLO) {
        this._ping = setInterval(() => this.heartbeat(), parsed.d.heartbeat_interval)
        if (this._sessionId) {
          this.bot.logger.debug('resuming')
          this.socket!.send(JSON.stringify({
            op: Gateway.Opcode.RESUME,
            d: {
              token: this.bot.config.token,
              session_id: this._sessionId,
              seq: this._d,
            },
          }))
        } else {
          this.socket!.send(JSON.stringify({
            op: Gateway.Opcode.IDENTIFY,
            d: {
              token: this.bot.config.token,
              properties: {},
              compress: false,
              intents: this.bot.config.intents,
            },
          }))
        }
      }

      if (parsed.op === Gateway.Opcode.INVALID_SESSION) {
        if (parsed.d) return
        this._sessionId = ''
        this.bot.logger.warn('offline: invalid session')
        this.socket?.close()
      }

      if (parsed.op === Gateway.Opcode.DISPATCH) {
        this.bot.dispatch(this.bot.session({
          type: 'internal',
          _type: 'discord/' + parsed.t!.toLowerCase().replace(/_/g, '-'),
          _data: parsed.d,
        }))
        if (parsed.t === 'READY') {
          this._sessionId = parsed.d.session_id
          this._resumeUrl = parsed.d.resume_gateway_url
          this.bot.user = decodeUser(parsed.d.user)
          this.bot.logger.debug('session_id ' + this._sessionId)
          return this.bot.online()
        }
        if (parsed.t === 'RESUMED') {
          return this.bot.online()
        }
        const session = await adaptSession(this.bot, parsed)
        if (session) this.bot.dispatch(session)
      }

      if (parsed.op === Gateway.Opcode.RECONNECT) {
        this.bot.logger.warn('offline: discord request reconnect')
        this.socket?.close()
      }
    })

    this.socket!.addEventListener('close', () => {
      clearInterval(this._ping)
    })
  }
}

export namespace WsClient {
  export interface Options extends Adapter.WsClientConfig {
    intents?: number
  }

  export const Options: Schema<Options> = Schema.intersect([
    Schema.object({
      intents: Schema.bitset(Gateway.Intent).description('需要订阅的机器人事件。').default(0
        | Gateway.Intent.GUILD_MESSAGES
        | Gateway.Intent.GUILD_MESSAGE_REACTIONS
        | Gateway.Intent.DIRECT_MESSAGES
        | Gateway.Intent.DIRECT_MESSAGE_REACTIONS
        | Gateway.Intent.MESSAGE_CONTENT),
    }).description('推送设置'),
    Adapter.WsClientConfig,
  ] as const)
}
