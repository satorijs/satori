import { Adapter, Context, Schema } from '@satorijs/core'
import { Gateway } from './types'
import { adaptSession, decodeUser } from './utils'
import { DiscordBot } from './bot'
import type { WebSocket } from '@satorijs/protocol'

export class WsClient<C extends Context = Context> extends Adapter.WsClient<C, DiscordBot<C>> {
  _d = 0
  _ping = new WeakMap<WebSocket, NodeJS.Timeout>()
  _sessionId = ''
  _resumeUrl?: string
  _lastHeartbeatAck = true
  responseTimeout = 5000

  async prepare() {
    if (this._resumeUrl) {
      return this.bot.http.ws(this._resumeUrl + '/?v=10&encoding=json')
    }
    const { url } = await this.bot.internal.getGatewayBot()
    this._lastHeartbeatAck = true
    this.responseTimeout = this.config.retryInterval * 0.9
    const socket = this.bot.http.ws(url + '/?v=10&encoding=json')
    setTimeout(() => {
      if (this._ping.get(socket)) return
      this.bot.logger.warn(`offline: connect timeout after ${this.responseTimeout}ms`)
      socket.close()
      // Forcibly start a new connection instead of waiting for the closing handshake to finish.
      // This is because the situation where the response timeout occurs is when the connection is already broken
      // or when the peer is already dead,
      // so waiting for the closing frame will just hang indefinitely until the close timeout
      // set by the underlying WebSocket library used by @cordisjs/plugin-http is reached
      // (which is hardcoded to 30s for the case of ws, or never for the case of undici,
      // in which case it will only close when the OS cleans dead TCP connections automatically).
      this.start()
    }, this.responseTimeout)
    return socket
  }

  heartbeat(socket: WebSocket) {
    if (socket !== this.socket) return
    this.bot.logger.debug(`heartbeat d ${this._d}`)
    socket.send(JSON.stringify({
      op: Gateway.Opcode.HEARTBEAT,
      d: this._d,
    }))
    this._lastHeartbeatAck = false
    setTimeout(() => {
      if (this._lastHeartbeatAck) return
      this.bot.logger.warn(`offline: heartbeat timeout after ${this.responseTimeout}ms`)
      socket.close()
      this.start() // refer to the comment in prepare()
    }, this.responseTimeout)
  }

  accept() {
    const socket = this.socket!
    socket.addEventListener('message', async ({ data }) => {
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
        this.responseTimeout = Math.min(this.config.retryInterval, parsed.d.heartbeat_interval) * 0.9
        this._ping.set(socket, setInterval(() => this.heartbeat(socket), parsed.d.heartbeat_interval))
        if (this._sessionId) {
          this.bot.logger.debug('resuming')
          socket.send(JSON.stringify({
            op: Gateway.Opcode.RESUME,
            d: {
              token: this.bot.config.token,
              session_id: this._sessionId,
              seq: this._d,
            },
          }))
        } else {
          socket.send(JSON.stringify({
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

      if (parsed.op === Gateway.Opcode.HEARTBEAT_ACK) {
        this._lastHeartbeatAck = true
        this.bot.logger.debug('heartbeat ack')
      }

      if (parsed.op === Gateway.Opcode.INVALID_SESSION) {
        if (parsed.d) return
        this._sessionId = ''
        this.bot.logger.warn('offline: invalid session')
        socket.close()
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
        socket.close()
      }
    })

    socket.addEventListener('close', () => {
      clearInterval(this._ping.get(socket))
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
