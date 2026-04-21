import { Context } from '@satorijs/core'
import type {} from '@cordisjs/plugin-server'
import {} from '@cordisjs/plugin-logger'
import { SlackBot } from './bot'
import crypto from 'node:crypto'
import { EnvelopedEvent, SlackEvent, SocketEvent } from './types'
import { adaptSession } from './utils'
import z from 'schemastery'

export class HttpServer {
  static inject = ['server']

  constructor(public ctx: Context, public bot: SlackBot) {
    bot.adapter = this
  }

  async connect() {
    const bot = this.bot as SlackBot<SlackBot.Config & HttpServer.Options>
    const { signing } = bot.config
    await bot.getLogin()
    this.ctx.server.post('/slack', async (req, res, next) => {
      const timestamp = req.headers.get('x-slack-request-timestamp')!
      const signature = req.headers.get('x-slack-signature')!
      const requestBody = await req.text()

      const hmac = crypto.createHmac('sha256', signing)
      const [version, hash] = signature.split('=')

      const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5
      if (Number(timestamp) < fiveMinutesAgo) {
        res.status = 403
        return
      }

      hmac.update(`${version}:${timestamp}:${requestBody}`)

      if (hash !== hmac.digest('hex')) {

        const result = await next()

        if (result) return result

        if (!res.claimed) res.status = 403

        return

      }
      const body = JSON.parse(requestBody) as SocketEvent
      if (body.type === 'url_verification') {
        res.status = 200
        res.headers.set('content-type', 'application/json')
        res.body = JSON.stringify({ challenge: body.challenge })
        return
      }
      // https://api.slack.com/apis/connections/events-api#receiving-events
      if (body.type === 'event_callback') {
        res.status = 200
        res.body = 'ok'
        const payload = body as unknown as EnvelopedEvent<SlackEvent>
        bot.ctx.logger.debug(payload)
        const session = await adaptSession(bot, payload)
        bot.ctx.logger.debug(session)
        if (session) bot.dispatch(session)
      }
    })
  }

  async disconnect() {}
}

export namespace HttpServer {
  export interface Options {
    protocol: 'http'
    signing: string
  }

  export const Options: z<Options> = z.object({
    protocol: z.const('http').required(),
    signing: z.string().required(),
  })
}
