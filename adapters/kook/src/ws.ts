import { Adapter, Logger, Schema, Time } from '@satorijs/satori'
import { KookBot } from './bot'
import { adaptSession } from './utils'
import { Payload, Signal } from './types'
import WebSocket from 'ws'

const logger = new Logger('kook')

const heartbeatIntervals = [6, 2, 4]

export class WsClient extends Adapter.WsClient<KookBot> {
  _sn = 0
  _ping: NodeJS.Timeout
  _heartbeat: NodeJS.Timeout

  async prepare(bot: KookBot) {
    const { url } = await bot.request('GET', '/gateway/index?compress=0')
    const headers = { Authorization: `Bot ${bot.config.token}` }
    return new WebSocket(url, { headers })
  }

  heartbeat(bot: KookBot) {
    if (!bot.socket || bot.status !== 'online') {
      clearInterval(this._heartbeat)
      return
    }
    let trials = 0
    const send = () => {
      if (!bot.socket) return
      if (trials >= 2) {
        return bot.socket.close(1013)
      }
      bot.socket.send(JSON.stringify({ s: Signal.ping, sn: this._sn }))
      this._ping = setTimeout(send, heartbeatIntervals[trials++] * Time.second)
    }
    send()
  }

  async accept(bot: KookBot) {
    this._sn = 0
    clearInterval(this._heartbeat)

    bot.socket.on('message', async (data) => {
      let parsed: Payload
      try {
        parsed = JSON.parse(data.toString())
      } catch (error) {
        return logger.warn('cannot parse message', data)
      }

      if (parsed.s === Signal.event) {
        this._sn = Math.max(this._sn, parsed.sn)
        const session = adaptSession(bot, parsed.d)
        if (session) bot.dispatch(session)
      } else if (parsed.s === Signal.hello) {
        this._heartbeat = setInterval(() => this.heartbeat(bot), Time.minute * 0.5)
        Object.assign(bot, await bot.getSelf())
        bot.online()
      } else if (parsed.s === Signal.pong) {
        clearTimeout(this._ping)
      } else if (parsed.s === Signal.resume) {
        bot.socket.close(1013)
      }
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config {
    protocol: 'ws'
    token: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.const('ws' as const).required(),
      token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
    }),
    Adapter.WsClient.Config,
  ])
}
