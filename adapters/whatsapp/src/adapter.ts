import { Adapter, Context, remove, Service } from '@satorijs/core'
import type { HTTP } from '@cordisjs/plugin-http'
import type { Logger } from '@cordisjs/plugin-logger'
import type {} from '@cordisjs/plugin-server'
import { Internal } from './internal'
import { WhatsAppBot } from './bot'
import { WebhookBody } from './types'
import { decodeSession } from './utils'
import internal from 'stream'
import crypto from 'crypto'
import z from 'schemastery'

class HttpServer {
  static inject = ['server']

  private logger: Logger
  private adapters: WhatsAppAdapter[] = []

  constructor(private ctx: Context) {
    this.logger = ctx.logger('whatsapp')
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp/
    ctx.server.post('/whatsapp', async (req, res) => {
      const received = (req.headers.get('X-Hub-Signature-256') || '').split('sha256=')[1]
      if (!received) {
        res.status = 403
        return
      }

      const rawBody = await req.text()
      const adapters = this.adapters.filter((adapter) => {
        const expected = crypto
          .createHmac('sha256', adapter.config.secret)
          .update(rawBody)
          .digest('hex')
        return expected === received
      })
      if (!adapters.length) {
        res.status = 403
        return
      }

      const parsed = JSON.parse(rawBody) as WebhookBody
      this.logger.debug(parsed)
      res.body = 'ok'
      res.status = 200
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

    ctx.server.get('/whatsapp', async (req, res) => {
      const verifyToken = req.query.get('hub.verify_token')
      const challenge = req.query.get('hub.challenge')
      for (const adapter of this.adapters) {
        if (adapter.config.verifyToken === verifyToken) {
          res.body = challenge
          res.status = 200
          return
        }
      }
      res.status = 403
    })

    ctx.server.get('/whatsapp/assets/:self_id/:media_id', async (req, res) => {
      const mediaId = req.params.media_id
      const selfId = req.params.self_id
      const bot = this.getBot(selfId)
      if (!bot) {
        res.status = 404
        return
      }

      const fetched = await bot.internal.getMedia(mediaId)
      this.logger.debug(fetched.url)
      const resp = await bot.ctx.http<internal.Readable>(fetched.url, {
        method: 'GET',
        responseType: 'stream',
      })
      res.headers.set('content-type', resp.headers.get('content-type')!)
      res.headers.set('cache-control', resp.headers.get('cache-control')!)
      res.body = resp.data
      res.status = 200
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

export class WhatsAppAdapter extends Adapter<C, WhatsAppBot> {
  static inject = ['server', 'http']
  static schema = true as any
  static reusable = true

  constructor(ctx: Context, public config: WhatsAppAdapter.Config) {
    super(ctx)
    ctx.plugin(HttpServer, this)
  }

  async [Service.init]() {
    const http = this.ctx.http.extend({
      headers: {
        Authorization: `Bearer ${this.config.systemToken}`,
      },
    }).extend(this.config)
    const internal = new Internal(http)
    const data = await internal.getPhoneNumbers(this.config.id)
    for (const item of data) {
      const bot = new WhatsAppBot(this.ctx)
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
  }
}

export namespace WhatsAppAdapter {
  export interface Config extends HTTP.Config {
    systemToken: string
    verifyToken: string
    id: string
    secret: string
  }

  export const Config: z<Config> = z.intersect([
    z.object({
      secret: z.string().role('secret').description('App Secret').required(),
      systemToken: z.string().role('secret').description('System User Token').required(),
      verifyToken: z.string().role('secret').description('Verify Token').required(),
      id: z.string().description('WhatsApp Business Account ID').required(),
    }),
    HTTP.createConfig('https://graph.facebook.com'),
  ] as const)
}
