import { Adapter, Context, Logger } from '@satorijs/satori'
import { WhatsAppBot } from './bot'
import { WebhookBody } from './types'
import { decodeMessage } from './utils'
import internal from 'stream'

export class HttpServer extends Adapter.Server<WhatsAppBot> {
  logger = new Logger('whatsapp')
  constructor(ctx: Context, bot: WhatsAppBot) {
    super()
  }

  async start(bot: WhatsAppBot) {
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp/
    await bot.initialize()
    bot.ctx.router.post('/whatsapp', async (ctx) => {
      const parsed = ctx.request.body as WebhookBody
      this.logger.debug(require('util').inspect(parsed, false, null, true))
      ctx.body = 'ok'
      ctx.status = 200
      if (parsed.object !== 'whatsapp_business_account') return
      for (const entry of parsed.entry) {
        const session = await decodeMessage(bot, entry)
        if (session.length) session.forEach(bot.dispatch.bind(bot))
        this.logger.debug(require('util').inspect(session, false, null, true))
      }
    })
    bot.ctx.router.get('/whatsapp', async (ctx) => {
      this.logger.debug(require('util').inspect(ctx.query, false, null, true))
      const verifyToken = ctx.query['hub.verify_token']
      const challenge = ctx.query['hub.challenge']
      if (verifyToken !== bot.config.verifyToken) return ctx.status = 403
      ctx.body = challenge
      ctx.status = 200
    })
    bot.ctx.router.get('/whatsapp/assets/:self_id/:media_id', async (ctx) => {
      const mediaId = ctx.params.media_id
      const selfId = ctx.params.self_id
      const localBot = this.bots.find((bot) => bot.selfId === selfId)
      if (!localBot) return ctx.status = 404

      const fetched = await localBot.http.get<{
        url: string
      }>('/' + mediaId)
      this.logger.debug(fetched.url)
      const resp = await localBot.ctx.http.axios<internal.Readable>({
        url: fetched.url,
        method: 'GET',
        responseType: 'stream',
        headers: {
          Authorization: `Bearer ${localBot.config.systemToken}`,
        },
      })
      ctx.type = resp.headers['content-type']
      ctx.set('cache-control', resp.headers['cache-control'])
      ctx.response.body = resp.data
      ctx.status = 200
    })
    bot.online()
  }
}
