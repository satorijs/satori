import { Adapter, Context, Schema } from '@satorijs/core'
import { Gateway } from './protocol/gateway'
import { discover } from './discovery'
import { adaptSession, decodeUser } from './utils'
import { FluxerBot } from './bot'

/**
 * https://docs.fluxer.app/gateway/overview
 */
export class WsClient<C extends Context = Context> extends Adapter.WsClient<C, FluxerBot<C> & any> {
  getActive() {
    return this.bot.isActive
  }

  setStatus(status: any, error?: Error) {
    this.bot.status = status
    if (status === 'offline') {
      this.bot.logger.warn(error)
      this.bot.offline(error)
    }
  }

  _d = 0
  _ping?: NodeJS.Timeout
  _sessionId = ''

  async prepare() {
    const { endpoints } = await discover()
    return this.bot.http.ws(`${endpoints.gateway}/?v=1&encoding=json`)
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
      if (typeof data !== 'string') {
        // 未协商压缩时服务端不会发二进制帧；收到即异常，记录后跳过
        this.bot.logger.warn('unexpected binary frame')
        return
      }
      try {
        parsed = JSON.parse(data)
      } catch (error) {
        return this.bot.logger.warn('cannot parse message', data)
      }
      if (parsed.op === Gateway.Opcode.DISPATCH) {
        this.bot.logger.debug('dispatch %s (seq %s)', parsed.t, parsed.s)
      } else if (![
        Gateway.Opcode.HELLO,
        Gateway.Opcode.HEARTBEAT,
        Gateway.Opcode.HEARTBEAT_ACK,
        Gateway.Opcode.INVALID_SESSION,
        Gateway.Opcode.RECONNECT,
        Gateway.Opcode.GATEWAY_ERROR,
      ].includes(parsed.op)) {
        this.bot.logger.warn('unexpected opcode %s: %s', parsed.op, JSON.stringify(parsed.d ?? null)?.slice(0, 160))
      }
      if (parsed.s) {
        this._d = parsed.s
      }

      if (parsed.op === Gateway.Opcode.HELLO) {
        const { heartbeat_interval } = parsed.d as Gateway.Hello
        this._ping = setInterval(() => this.heartbeat(), heartbeat_interval)
        if (this._sessionId) {
          this.bot.logger.debug('resuming')
          this.socket!.send(JSON.stringify({
            op: Gateway.Opcode.RESUME,
            d: {
              token: this.bot.config.token,
              session_id: this._sessionId,
              seq: this._d,
            } satisfies Gateway.Resume,
          }))
        } else {
          this.socket!.send(JSON.stringify({
            op: Gateway.Opcode.IDENTIFY,
            d: {
              token: this.bot.config.token,
              properties: {
                os: process.platform,
                browser: 'satori',
                device: 'server',
              },
            } satisfies Gateway.Identify,
          }))
        }
        return
      }

      if (parsed.op === Gateway.Opcode.HEARTBEAT) {
        // 服务端请求立即心跳（文档：90% 间隔时触发，d 为 null）
        this.heartbeat()
        return
      }

      if (parsed.op === Gateway.Opcode.HEARTBEAT_ACK) return

      if (parsed.op === Gateway.Opcode.INVALID_SESSION) {
        // Fluxer 只发 d:false（会话不可恢复）：清掉会话重连
        this._sessionId = ''
        this.bot.logger.warn('offline: invalid session')
        this.socket?.close()
        return
      }

      if (parsed.op === Gateway.Opcode.RECONNECT) {
        this.bot.logger.debug('reconnect requested')
        this.socket?.close()
        return
      }

      if (parsed.op === Gateway.Opcode.GATEWAY_ERROR) {
        const err = parsed.d as Gateway.GatewayError
        this.bot.logger.warn('gateway error: %s %s', err.code, err.message)
        return
      }

      if (parsed.op === Gateway.Opcode.DISPATCH) {
        if (parsed.t === 'READY') {
          const ready = parsed.d as Gateway.Ready
          this._sessionId = ready.session_id
          this.bot.user = decodeUser(ready.user as any) as any
          this.bot.logger.debug('session_id %s', this._sessionId)
          return this.bot.online()
        }
        if (parsed.t === 'RESUMED') return this.bot.online()
        const session = await adaptSession(this.bot, parsed)
        if (session) this.bot.dispatch(session)
      }
    })

    this.socket!.addEventListener('close', (event) => {
      clearInterval(this._ping)
      this.bot.logger.debug('gateway closed: %s %s', event.code, event.reason)
    })
  }
}

export namespace WsClient {
  export interface Options extends Adapter.WsClientConfig {}

  export const Options: Schema<Options> = Schema.intersect([
    Schema.object({}).description('推送设置'),
    Adapter.WsClientConfig,
  ] as const)
}
