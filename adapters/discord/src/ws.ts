import { Adapter, Logger, Schema } from '@satorijs/satori'
import { GatewayIntent, GatewayOpcode, GatewayPayload } from './types'
import { adaptSession, adaptUser } from './utils'
import { DiscordBot } from './bot'

const logger = new Logger('discord')

export class WsClient extends Adapter.WsClient<DiscordBot> {
  _d = 0
  _ping: NodeJS.Timeout
  _sessionId = ''

  prepare() {
    return this.bot.http.ws(this.bot.config.gateway)
  }

  heartbeat() {
    logger.debug(`heartbeat d ${this._d}`)
    this.bot.socket.send(JSON.stringify({
      op: GatewayOpcode.HEARTBEAT,
      d: this._d,
    }))
  }

  accept() {
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
      this.bot.online()
    }

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

      // https://discord.com/developers/docs/topics/gateway#identifying
      if (parsed.op === GatewayOpcode.HELLO) {
        this._ping = setInterval(() => this.heartbeat(), parsed.d.heartbeat_interval)
        if (this._sessionId) return
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

      if (parsed.op === GatewayOpcode.DISPATCH) {
        if (parsed.t === 'READY') {
          this._sessionId = parsed.d.session_id
          const self: any = adaptUser(parsed.d.user)
          self.selfId = self.userId
          delete self.userId
          Object.assign(this.bot, self)
          logger.debug('session_id ' + this._sessionId)
          return this.bot.online()
        }
        const session = await adaptSession(this.bot, parsed)
        if (session) this.bot.dispatch(session)
      }
    })

    this.bot.socket.on('close', () => {
      clearInterval(this._ping)
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config {
    gateway?: string
    intents?: number
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      gateway: Schema.string().default('wss://gateway.discord.gg/?v=8&encoding=json').description('要连接的 WebSocket 网关。'),
      intents: Schema.bitset(GatewayIntent).description('需要订阅的机器人事件。').default(0
        | GatewayIntent.GUILD_MESSAGES
        | GatewayIntent.GUILD_MESSAGE_REACTIONS
        | GatewayIntent.DIRECT_MESSAGES
        | GatewayIntent.DIRECT_MESSAGE_REACTIONS),
    }).description('推送设置'),
    Adapter.WsClient.Config,
  ] as const)
}
