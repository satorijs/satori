import { Adapter, Context, Logger, Quester, Schema } from '@satorijs/satori'
import { Internal } from './internal'
import { WhatsAppBot } from './bot'
import { WebhookBody } from './types'
import { decodeMessage } from './utils'
import internal from 'stream'
import crypto from 'crypto'

export class WhatsAppAdapter extends Adapter<WhatsAppBot> {
  static reusable = true

  public bots: WhatsAppBot[] = []
  public logger = new Logger('whatsapp')

  constructor(private ctx: Context, public config: WhatsAppAdapter.Config) {
    super()

    const http = ctx.http.extend({
      headers: {
        Authorization: `Bearer ${config.systemToken}`,
      },
    }).extend(config)
    const internal = new Internal(http)

    ctx.on('ready', async () => {
      const data = await internal.getPhoneNumbers(config.id)
      for (const item of data) {
        const bot = new WhatsAppBot(ctx, {
          selfId: item.id,
        })
        bot.adapter = this
        bot.internal = internal
        this.bots.push(bot)
        bot.online()
      }
    })

    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp/
    ctx.router.post('/whatsapp', async (ctx) => {
      const receivedSignature = ctx.get('X-Hub-Signature-256').split('sha256=')[1]

      const payload = ctx.request.rawBody

      const generatedSignature = crypto
        .createHmac('sha256', this.config.secret)
        .update(payload)
        .digest('hex')
      if (receivedSignature !== generatedSignature) return ctx.status = 403

      const parsed = ctx.request.body as WebhookBody
      this.logger.debug(require('util').inspect(parsed, false, null, true))
      ctx.body = 'ok'
      ctx.status = 200
      if (parsed.object !== 'whatsapp_business_account') return
      for (const entry of parsed.entry) {
        const phone_number_id = entry.changes[0].value.metadata.phone_number_id
        const bot = this.bots.find((bot) => bot.selfId === phone_number_id)
        const session = await decodeMessage(bot, entry)
        if (session.length) session.forEach(bot.dispatch.bind(bot))
        this.logger.debug('handling bot: %s', bot.sid)
        this.logger.debug(require('util').inspect(session, false, null, true))
      }
    })

    ctx.router.get('/whatsapp', async (ctx) => {
      this.logger.debug(require('util').inspect(ctx.query, false, null, true))
      const verifyToken = ctx.query['hub.verify_token']
      const challenge = ctx.query['hub.challenge']
      if (verifyToken !== this.config.verifyToken) return ctx.status = 403
      ctx.body = challenge
      ctx.status = 200
    })

    ctx.router.get('/whatsapp/assets/:self_id/:media_id', async (ctx) => {
      const mediaId = ctx.params.media_id
      const selfId = ctx.params.self_id
      const bot = this.bots.find((bot) => bot.selfId === selfId)
      if (!bot) return ctx.status = 404

      const fetched = await bot.http.get<{ url: string }>('/' + mediaId)
      this.logger.debug(fetched.url)
      const resp = await bot.ctx.http.axios<internal.Readable>({
        url: fetched.url,
        method: 'GET',
        responseType: 'stream',
      })
      ctx.type = resp.headers['content-type']
      ctx.set('cache-control', resp.headers['cache-control'])
      ctx.response.body = resp.data
      ctx.status = 200
    })
  }
}

export namespace WhatsAppAdapter {
  export interface Config extends Quester.Config {
    systemToken: string
    verifyToken: string
    id: string
    secret: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      secret: Schema.string().role('secret').description('App Secret').required(),
      systemToken: Schema.string().role('secret').description('System User Token').required(),
      verifyToken: Schema.string().role('secret').description('Verify Token').required(),
      id: Schema.string().description('WhatsApp Business Account ID').required(),
    }),
    Quester.createConfig('https://graph.facebook.com'),
  ] as const)
}
