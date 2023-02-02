import { Adapter, Logger, Schema } from '@satorijs/satori'
import { GatewayIntent, GatewayOpcode, GatewayPayload } from './types'
import { adaptSession, adaptUser } from './utils'
import { DiscordBot } from './bot'

const logger = new Logger('discord')

export class WsClient extends Adapter.WsClient<DiscordBot> {
  _d = 0
  _ping: NodeJS.Timeout
  _sessionId = ''
  _resumeUrl: string

  async prepare() {
    if (this._resumeUrl) {
      return this.bot.http.ws(this._resumeUrl)
    }
    const { url } = await this.bot.internal.getGatewayBot()
    return this.bot.http.ws(url)
  }

  heartbeat() {
    logger.debug(`heartbeat d ${this._d}`)
    this.bot.socket.send(JSON.stringify({
      op: GatewayOpcode.HEARTBEAT,
      d: this._d,
    }))
  }

  accept() {
    this.bot.socket.on('message', async (data) => {
      let parsed: GatewayPayload
      try {
        parsed = JSON.parse(data.toString())
      } catch (error) {
        return logger.warn('cannot parse message', data)
      }
      logger.debug(require('util').inspect(parsed, false, null, true))
      if (parsed.s) {
        this._d = parsed.s
      }

      // https://discord.com/developers/docs/topics/gateway#connection-lifecycle
      if (parsed.op === GatewayOpcode.HELLO) {
        this._ping = setInterval(() => this.heartbeat(), parsed.d.heartbeat_interval)
        if (this._sessionId) {
          logger.debug('resuming')
          this.bot.socket.send(JSON.stringify({
            op: GatewayOpcode.RESUME,
            d: {
              token: this.bot.config.token,
              session_id: this._sessionId,
              seq: this._d,
            },
          }))
        } else {
          this.bot.socket.send(JSON.stringify({
            op: GatewayOpcode.IDENTIFY,
            d: {
              token: this.bot.config.token,
              properties: {},
              compress: false,
              intents: this.bot.config.intents,
            },
          }))
        }
      }

      if (parsed.op === GatewayOpcode.INVALID_SESSION) {
        if (parsed.d) return;
        this._sessionId = ''
        logger.warn('offline: invalid session')
        this.bot.offline()
        this.bot.socket?.close()
      }

      if (parsed.op === GatewayOpcode.DISPATCH) {
        if (parsed.t === 'READY') {
          this._sessionId = parsed.d.session_id
          this._resumeUrl = parsed.d.resume_gateway_url
          const self: any = adaptUser(parsed.d.user)
          self.selfId = self.userId
          delete self.userId
          Object.assign(this.bot, self)
          logger.debug('session_id ' + this._sessionId)
          return this.bot.online()
        }
        if (parsed.t === "RESUMED") {
          return this.bot.online()
        }
        const session = await adaptSession(this.bot, parsed)
        if (session) this.bot.dispatch(session)
      }

      if (parsed.op === GatewayOpcode.RECONNECT) {
        this.bot.offline()
        logger.warn('offline: discord request reconnect')
        this.bot.socket?.close()
      }
    })

    this.bot.socket.on('close', () => {
      clearInterval(this._ping)
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config {
    intents?: number
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      intents: Schema.bitset(GatewayIntent).description('需要订阅的机器人事件。').default(0
        | GatewayIntent.GUILD_MESSAGES
        | GatewayIntent.GUILD_MESSAGE_REACTIONS
        | GatewayIntent.DIRECT_MESSAGES
        | GatewayIntent.DIRECT_MESSAGE_REACTIONS
        | GatewayIntent.MESSAGE_CONTENT),
    }).description('推送设置'),
    Adapter.WsClient.Config,
  ] as const)
}
