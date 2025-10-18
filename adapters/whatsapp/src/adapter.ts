import { Adapter, Context, HTTP, Logger, remove, Schema } from '@satorijs/core'
import {} from '@cordisjs/plugin-server'
import { Internal } from './internal'
import { WhatsAppBot } from './bot'
import { WebhookBody } from './types'
import { decodeSession } from './utils'
import internal from 'stream'
import crypto from 'crypto'

class HttpServer {
  static inject = ['server']

  private logger: Logger
  private adapters: WhatsAppAdapter[] = []

  constructor(private ctx: Context) {
    this.logger = ctx.logger('whatsapp')
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp/
    ctx.server.post('/whatsapp', async (ctx) => {
      const received = ctx.get('X-Hub-Signature-256').split('sha256=')[1]
      if (!received) return ctx.status = 403

      const payload = ctx.request.body[Symbol.for('unparsedBody')]
      const adapters = this.adapters.filter((adapter) => {
        const expected = crypto
          .createHmac('sha256', adapter.config.secret)
          .update(payload)
          .digest('hex')
        return expected === received
      })
      if (!adapters.length) return ctx.status = 403

      const parsed = ctx.request.body as WebhookBody
      this.logger.debug(parsed)
      ctx.body = 'ok'
      ctx.status = 200
      if (parsed.object !== 'whatsapp_business_account') return
      for (const entry of parsed.entry) {
        const phone_number_id = entry.changes[0].value.metadata.phone_number_id
        const bot = this.getBot(phone_number_id)
        const session = await decodeSession(bot, entry)
        if (session.length) session.forEach(bot.dispatch.bind(bot))
        this.logger.debug('handling bot: %s', bot.sid)
        this.logger.debug(session)
      }
    })

    ctx.server.get('/whatsapp', async (ctx) => {
      this.logger.debug(ctx.query)
      const verifyToken = ctx.query['hub.verify_token']
      const challenge = ctx.query['hub.challenge']
      for (const adapter of this.adapters) {
        if (adapter.config.verifyToken === verifyToken) {
          ctx.body = challenge
          ctx.status = 200
          return
        }
      }
      return ctx.status = 403
    })

    ctx.server.get('/whatsapp/assets/:self_id/:media_id', async (ctx) => {
      const mediaId = ctx.params.media_id
      const selfId = ctx.params.self_id
      const bot = this.getBot(selfId)
      if (!bot) return ctx.status = 404

      const fetched = await bot.internal.getMedia(mediaId)
      this.logger.debug(fetched.url)
      const resp = await bot.ctx.http<internal.Readable>(fetched.url, {
        method: 'GET',
        responseType: 'stream',
      })
      ctx.type = resp.headers.get('content-type')
      ctx.set('cache-control', resp.headers.get('cache-control'))
      ctx.response.body = resp.data
      ctx.status = 200
    })
  }

  getBot(selfId: string) {
    for (const adapter of this.adapters) {
      for (const bot of adapter.bots) {
        if (bot.selfId === selfId) return bot
      }
    }
  }

  fork(ctx: Context, adapter: WhatsAppAdapter) {
    this.adapters.push(adapter)
    ctx.on('dispose', () => {
      remove(this.adapters, adapter)
    })
  }
}

export class WhatsAppAdapter<C extends Context = Context> extends Adapter<C, WhatsAppBot<C>> {
  static inject = ['server', 'http']
  static schema = true as any
  static reusable = true

  constructor(ctx: C, public config: WhatsAppAdapter.Config) {
    super(ctx)
    ctx.plugin(HttpServer, this)

    const http = ctx.http.extend({
      headers: {
        Authorization: `Bearer ${config.systemToken}`,
      },
    }).extend(config)
    const internal = new Internal(http)

    ctx.on('ready', async () => {
      const data = await internal.getPhoneNumbers(config.id)
      for (const item of data) {
        const bot = new WhatsAppBot(ctx)
        bot.selfId = item.id
        bot.adapter = this
        bot.internal = internal
        bot.user = {
          id: item.id,
          name: item.display_phone_number,
        }
        this.bots.push(bot)
        bot.online()
      }
    })
  }
}

export namespace WhatsAppAdapter {
  export interface Config extends HTTP.Config {
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
    HTTP.createConfig('https://graph.facebook.com'),
  ] as const)
}
