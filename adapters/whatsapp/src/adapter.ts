import { Context, Inject, Service } from '@satorijs/core'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import type {} from '@cordisjs/plugin-server'
import { Internal } from './internal'
import { WhatsAppBot } from './bot'
import { WebhookBody } from './types'
import { decodeSession } from './utils'
import crypto from 'crypto'
import z from 'schemastery'

class HttpServer {
  static inject = ['server']

  constructor(private ctx: Context, private adapter: WhatsAppAdapter) {
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-whatsapp/
    ctx.server.post('/whatsapp', async (req, res, next) => {
      const received = (req.headers.get('X-Hub-Signature-256') || '').split('sha256=')[1]
      if (!received) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      const rawBody = await req.text()
      const expected = crypto
        .createHmac('sha256', this.adapter.config.secret)
        .update(rawBody)
        .digest('hex')
      if (expected !== received) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      const parsed = JSON.parse(rawBody) as WebhookBody
      this.ctx.logger.debug(parsed)
      res.body = 'ok'
      res.status = 200
      if (parsed.object !== 'whatsapp_business_account') return
      for (const entry of parsed.entry) {
        const phone_number_id = entry.changes[0].value.metadata.phone_number_id
        const bot = this.getBot(phone_number_id)
        if (!bot) continue
        const session = await decodeSession(bot, entry)
        if (session.length) session.forEach(bot.dispatch.bind(bot))
        this.ctx.logger.debug('handling bot: %s', bot.sid)
        this.ctx.logger.debug(session)
      }
    })

    ctx.server.get('/whatsapp', async (req, res, next) => {
      const verifyToken = req.query.get('hub.verify_token')
      const challenge = req.query.get('hub.challenge')
      if (this.adapter.config.verifyToken !== verifyToken) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      res.body = challenge
      res.status = 200
    })
  }

  getBot(selfId: string) {
    for (const bot of this.adapter.bots) {
      if (bot.selfId === selfId) return bot
    }
  }
}

@Inject('server')
@Inject('http', true, { baseUrl: 'https://graph.facebook.com' })
export class WhatsAppAdapter {
  static schema = true as any
  static reusable = true

  public bots: WhatsAppBot[] = []

  constructor(public ctx: Context, public config: WhatsAppAdapter.Config) {
    ctx.plugin(HttpServer, this)
  }

  async [Service.init]() {
    const http = this.ctx.http.extend({
      headers: {
        Authorization: `Bearer ${this.config.systemToken}`,
      },
    })
    const internal = new Internal(http)
    const data = await internal.getPhoneNumbers(this.config.id)
    for (const item of data) {
      const bot = new WhatsAppBot(this.ctx)
      bot.selfId = item.id
      bot.internal = internal
      bot.user = {
        id: item.id,
        name: item.display_phone_number,
      }
      bot.defineInternalRoute('/assets/:media_id', async ({ params }) => {
        const fetched = await bot.internal.getMedia(params.media_id)
        this.ctx.logger.debug(fetched.url)
        const resp = await bot.ctx.http(fetched.url, { method: 'GET' })
        return new Response(resp.body, {
          headers: {
            'content-type': resp.headers.get('content-type')!,
            'cache-control': resp.headers.get('cache-control')!,
          },
        })
      })
      this.bots.push(bot)
      bot.online()
    }
  }
}

export namespace WhatsAppAdapter {
  export interface Config {
    systemToken: string
    verifyToken: string
    id: string
    secret: string
  }

  export const Config: z<Config> = z.object({
    secret: z.string().role('secret').description('App Secret').required(),
    systemToken: z.string().role('secret').description('System User Token').required(),
    verifyToken: z.string().role('secret').description('Verify Token').required(),
    id: z.string().description('WhatsApp Business Account ID').required(),
  })
}
