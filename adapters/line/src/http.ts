import { Adapter, Context } from '@satorijs/core'
import type {} from '@cordisjs/plugin-server'
import crypto from 'node:crypto'
import { LineBot } from './bot'
import { WebhookRequestBody } from './types'
import { adaptSessions } from './utils'
import internal from 'stream'

export class HttpServer extends Adapter<LineBot> {
  static inject = ['server']

  async connect(bot: LineBot) {
    bot.ctx.server.post('/line', async (req, res) => {
      const sign = req.headers.get('x-line-signature')
      const rawBody = await req.text()
      const parsed = JSON.parse(rawBody) as WebhookRequestBody
      const { destination } = parsed
      const bot = this.bots.find(bot => bot.selfId === destination)
      if (!bot) {
        res.status = 403
        return
      }
      const hash = crypto.createHmac('SHA256', bot?.config?.secret).update(rawBody || '').digest('base64')
      if (hash !== sign) {
        res.status = 403
        return
      }
      bot.logger.debug(parsed)
      for (const event of parsed.events) {
        const sessions = await adaptSessions(bot, event)
        if (sessions.length) sessions.forEach(bot.dispatch.bind(bot))
        bot.logger.debug(sessions)
      }
      res.status = 200
      res.body = 'ok'
    })
    bot.ctx.server.get('/line/assets/:self_id/:message_id', async (req, res) => {
      const messageId = req.params.message_id
      const selfId = req.params.self_id
      const bot = this.bots.find((bot) => bot.selfId === selfId)
      if (!bot) {
        res.status = 404
        return
      }
      const resp = await bot.contentHttp.axios<internal.Readable>(`/v2/bot/message/${messageId}/content`, {
        method: 'GET',
        responseType: 'stream',
      })
      res.headers.set('content-type', resp.headers.get('content-type')!)
      res.headers.set('cache-control', resp.headers.get('cache-control')!)
      res.body = resp.data
      res.status = 200
    })
    await bot.getLogin()
    await bot.internal.setWebhookEndpoint({
      endpoint: bot.ctx.server.config.selfUrl + '/line',
    })
    bot.logger.debug('listening updates %c', 'line:' + bot.selfId)
    bot.online()
  }
}
