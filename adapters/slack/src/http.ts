import { Adapter, Logger, Schema } from '@satorijs/satori'
import { SlackBot } from './bot'
import crypto from 'node:crypto'
import { EnvelopedEvent, SlackEvent, SocketEvent } from './types'
import { adaptSession } from './utils'

export class HttpServer extends Adapter<SlackBot> {
  logger = new Logger('slack')

  async connect(bot: SlackBot<SlackBot.Config & HttpServer.Config>) {
    const { signing } = bot.config
    await bot.getLogin()
    bot.ctx.router.post('/slack', async (ctx) => {
      const timestamp = ctx.request.header['x-slack-request-timestamp'].toString()
      const signature = ctx.request.header['x-slack-signature'].toString()
      const requestBody = ctx.request.rawBody

      const hmac = crypto.createHmac('sha256', signing)
      const [version, hash] = signature.split('=')

      const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5
      if (Number(timestamp) < fiveMinutesAgo) {
        return ctx.status = 403
      }

      hmac.update(`${version}:${timestamp}:${requestBody}`)

      if (hash !== hmac.digest('hex')) {
        return ctx.status = 403
      }
      const { type } = ctx.request.body as SocketEvent
      if (type === 'url_verification') {
        ctx.status = 200
        return ctx.body = {
          challenge: ctx.request.body.challenge,
        }
      }
      // https://api.slack.com/apis/connections/events-api#receiving-events
      if (type === 'event_callback') {
        ctx.status = 200
        ctx.body = 'ok'
        const payload: EnvelopedEvent<SlackEvent> = ctx.request.body
        this.logger.debug(payload)
        const session = await adaptSession(bot, payload)
        this.logger.debug(session)
        if (session) bot.dispatch(session)
      }
    })
  }
}

export namespace HttpServer {
  export interface Config {
    protocol: 'http'
    signing: string
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('http').required(),
    signing: Schema.string().required(),
  })
}
