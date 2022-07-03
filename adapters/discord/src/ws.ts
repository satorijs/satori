import { Adapter } from '@satorijs/core'
import { GatewayOpcode, GatewayPayload } from './types'
import { adaptSession, adaptUser } from './utils'
import { DiscordBot } from './bot'
import Logger from 'reggol'
import Schema from 'schemastery'

const logger = new Logger('discord')

export class WsClient extends Adapter.WsClient<DiscordBot> {
  prepare() {
    return this.bot.http.ws(this.config.gateway)
  }

  heartbeat() {
    logger.debug(`heartbeat d ${this.bot._d}`)
    this.bot.socket.send(JSON.stringify({
      op: GatewayOpcode.HEARTBEAT,
      d: this.bot._d,
    }))
  }

  accept() {
    if (this.bot._sessionId) {
      logger.debug('resuming')
      this.bot.socket.send(JSON.stringify({
        op: GatewayOpcode.RESUME,
        d: {
          token: this.bot.config.token,
          session_id: this.bot._sessionId,
          seq: this.bot._d,
        },
      }))
      this.bot.resolve()
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
        this.bot._d = parsed.s
      }

      // https://discord.com/developers/docs/topics/gateway#identifying
      if (parsed.op === GatewayOpcode.HELLO) {
        this.bot._ping = setInterval(() => this.heartbeat(), parsed.d.heartbeat_interval)
        if (this.bot._sessionId) return
        this.bot.socket.send(JSON.stringify({
          op: GatewayOpcode.IDENTIFY,
          d: {
            token: this.bot.config.token,
            properties: {},
            compress: false,
            intents: this.bot.getIntents(),
          },
        }))
      }

      if (parsed.op === GatewayOpcode.DISPATCH) {
        if (parsed.t === 'READY') {
          this.bot._sessionId = parsed.d.session_id
          const self: any = adaptUser(parsed.d.user)
          self.selfId = self.userId
          delete self.userId
          Object.assign(this.bot, self)
          logger.debug('session_id ' + this.bot._sessionId)
          return this.bot.resolve()
        }
        const session = await adaptSession(this.bot, parsed)
        if (session) this.bot.dispatch(session)
      }
    })

    this.bot.socket.on('close', () => {
      clearInterval(this.bot._ping)
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config {}

  export const Config: Schema<Config> = Schema.intersect([
    Adapter.WsClient.Config,
  ])
}
