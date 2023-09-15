import { Adapter, Logger, Schema } from '@satorijs/satori'
import { QQGuildBot } from './bot'
import { Opcode, Payload } from './types'

const logger = new Logger('qqguild')
export class WsClient extends Adapter.WsClient<QQGuildBot> {
  _sessionId = ''
  _s: number = null
  _ping: NodeJS.Timeout
  async prepare() {
    await this.bot.initialize()
    const { url } = await this.bot.http.get(`/gateway`)
    logger.debug('url: %s', url)
    return this.bot.http.ws(url)
  }

  heartbeat() {
    this.bot.socket.send(JSON.stringify({
      op: Opcode.HEARTBEAT,
      s: this._s,
    }))
  }

  async accept(bot: QQGuildBot) {
    bot.socket.addEventListener('message', async ({ data }) => {
      const parsed: Payload = JSON.parse(data.toString())
      logger.debug(require('util').inspect(parsed, false, null, true))
      if (parsed.op === Opcode.HELLO) {
        bot.socket.send(JSON.stringify({
          op: Opcode.IDENTIFY,
          d: {
            token: `Bot ${bot.config.app.id}.${bot.config.app.token}`,
            intents: 0 | bot.config.intents,
          },
        }))
        this._ping = setInterval(() => this.heartbeat(), parsed.d.heartbeat_interval)

        // @TODO resume
      } else if (parsed.op === Opcode.RECONNECT) {

      } else if (parsed.op === Opcode.DISPATCH) {
        this._s = parsed.s
        if (parsed.t === 'READY') {
          bot.online()
          this._sessionId = parsed.d.sessionId
        } else if (parsed.t === 'MESSAGE_CREATE' || parsed.t === 'AT_MESSAGE_CREATE' || parsed.t === 'DIRECT_MESSAGE_CREATE') {
          const session = bot.adaptMessage(parsed.d
            , parsed,
          )
          if (session) bot.dispatch(session)
        }
      }
    })

    bot.socket.addEventListener('close', (e) => {
      clearInterval(this._ping)
    })
    // Object.assign(bot, await bot.getSelf())
    // await bot.internal.startClient(bot.config.intents)
    // bot.internal.on('ready', bot.online.bind(bot))
    // bot.internal.on('message', msg => {
    //   const session = bot.adaptMessage(msg)
    //   if (session) bot.dispatch(session)
    // })
  }

  async stop(bot: QQGuildBot) {
    // bot.internal.stopClient()
    // bot.offline()
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config { }

  export const Config: Schema<Config> = Schema.intersect([
    Adapter.WsClient.Config,
  ])
}
