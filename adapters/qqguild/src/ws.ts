import { Adapter, Logger, Schema } from '@satorijs/satori'
import { QQGuildBot } from './bot'
import { Opcode, Payload } from './types'
import { adaptSession } from './utils'

const logger = new Logger('qqguild')
export class WsClient extends Adapter.WsClient<QQGuildBot> {
  _sessionId = ''
  _s: number = null
  _ping: NodeJS.Timeout

  async prepare() {
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
        if (this._sessionId) {
          bot.socket.send(JSON.stringify({
            op: Opcode.RESUME,
            d: {
              token: `Bot ${bot.config.app.id}.${bot.config.app.token}`,
              session_id: this._sessionId,
              seq: this._s,
            },
          }))
        } else {
          bot.socket.send(JSON.stringify({
            op: Opcode.IDENTIFY,
            d: {
              token: `Bot ${bot.config.app.id}.${bot.config.app.token}`,
              intents: 0 | bot.config.intents,
            },
          }))
        }
        this._ping = setInterval(() => this.heartbeat(), parsed.d.heartbeat_interval)
      } else if (parsed.op === Opcode.INVALID_SESSION) {
        this._sessionId = ''
        this._s = null
        logger.warn('offline: invalid session')
        bot.socket?.close()
      } else if (parsed.op === Opcode.RECONNECT) {
        logger.warn('offline: server request reconnect')
        this.bot.socket?.close()
      } else if (parsed.op === Opcode.DISPATCH) {
        this._s = parsed.s
        if (parsed.t === 'READY') {
          this._sessionId = parsed.d.session_id
          return bot.online()
        }
        if (parsed.t === 'RESUMED') {
          return bot.online()
        }
        const session = await adaptSession(bot, parsed)
        if (session) bot.dispatch(session)
        logger.debug(require('util').inspect(session, false, null, true))
      }
    })

    bot.socket.addEventListener('close', (e) => {
      clearInterval(this._ping)
    })
  }

  async stop(bot: QQGuildBot): Promise<void> {
    bot.offline()
    bot.socket?.close()
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config { }

  export const Config: Schema<Config> = Schema.intersect([
    Adapter.WsClient.Config,
  ])
}
