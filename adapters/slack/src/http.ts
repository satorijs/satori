import { Adapter, Context, Schema } from '@satorijs/satori'
import {} from '@cordisjs/plugin-server'
import { SlackBot } from './bot'
import crypto from 'node:crypto'
import { EnvelopedEvent, SlackEvent, SocketEvent } from './types'
import { adaptSession } from './utils'

export class HttpServer<C extends Context = Context> extends Adapter<C, SlackBot<C>> {
  static inject = ['server']

  async connect(bot: SlackBot<C, SlackBot.Config & HttpServer.Options>) {
    const { signing } = bot.config
    await bot.getLogin()
    this.ctx.server.post('/slack', async (ctx) => {
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
        bot.logger.debug(payload)
        const session = await adaptSession(bot, payload)
        bot.logger.debug(session)
        if (session) bot.dispatch(session)
      }
    })
  }
}

export namespace HttpServer {
  export interface Options {
    protocol: 'http'
    signing: string
  }

  export const Options: Schema<Options> = Schema.object({
    protocol: Schema.const('http').required(),
    signing: Schema.string().required(),
  })
}
