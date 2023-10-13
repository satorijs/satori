import { Adapter, Logger, Schema, Time, Universal } from '@satorijs/satori'
import { KookBot } from './bot'
import { adaptSession } from './utils'
import { Payload, Signal } from './types'

const logger = new Logger('kook')

const heartbeatIntervals = [6, 2, 4]

export class WsClient extends Adapter.WsClient<KookBot<KookBot.BaseConfig & WsClient.Config>> {
  _sn = 0
  _ping: NodeJS.Timeout
  _heartbeat: NodeJS.Timeout

  async prepare() {
    const { url } = await this.bot.request('GET', '/gateway/index?compress=0')
    const headers = { Authorization: `Bot ${this.bot.config.token}` }
    return this.bot.ctx.http.ws(url, { headers })
  }

  heartbeat() {
    if (!this.socket || this.bot.status !== Universal.Status.ONLINE) {
      clearInterval(this._heartbeat)
      return
    }
    let trials = 0
    const send = () => {
      if (!this.socket) return
      if (trials >= 2) {
        return this.socket.close(1013)
      }
      this.socket.send(JSON.stringify({ s: Signal.ping, sn: this._sn }))
      this._ping = setTimeout(send, heartbeatIntervals[trials++] * Time.second)
    }
    send()
  }

  async accept() {
    this._sn = 0
    clearInterval(this._heartbeat)

    this.socket.addEventListener('message', async ({ data }) => {
      let parsed: Payload
      try {
        parsed = JSON.parse(data.toString())
      } catch (error) {
        return logger.warn('cannot parse message', data)
      }

      logger.debug('[receive] %o', parsed)
      if (parsed.s === Signal.event) {
        this._sn = Math.max(this._sn, parsed.sn)
        const session = adaptSession(this.bot, parsed.d)
        if (session) this.bot.dispatch(session)
      } else if (parsed.s === Signal.hello) {
        this._heartbeat = setInterval(() => this.heartbeat(), Time.minute * 0.5)
        await this.bot.getLogin()
        this.bot.online()
      } else if (parsed.s === Signal.pong) {
        clearTimeout(this._ping)
      } else if (parsed.s === Signal.resume) {
        this.socket.close(1013)
      }
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClientConfig {
    protocol: 'ws'
    token: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.const('ws').required(process.env.KOISHI_ENV !== 'browser'),
      token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
    }),
    Adapter.WsClientConfig,
  ])
}
