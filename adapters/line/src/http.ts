import { Adapter, Context } from '@satorijs/satori'
import {} from '@cordisjs/server'
import crypto from 'node:crypto'
import { LineBot } from './bot'
import { WebhookRequestBody } from './types'
import { adaptSessions } from './utils'
import internal from 'stream'

export class HttpServer<C extends Context = Context> extends Adapter<C, LineBot<C>> {
  static inject = ['server']

  async connect(bot: LineBot<C>) {
    bot.ctx.server.post('/line', async (ctx) => {
      const sign = ctx.headers['x-line-signature']?.toString()
      const parsed = ctx.request.body as WebhookRequestBody
      const { destination } = parsed
      const bot = this.bots.find(bot => bot.selfId === destination)
      if (!bot) return ctx.status = 403
      const hash = crypto.createHmac('SHA256', bot?.config?.secret).update(ctx.request.rawBody || '').digest('base64')
      if (hash !== sign) {
        return ctx.status = 403
      }
      bot.logger.debug(parsed)
      for (const event of parsed.events) {
        const sessions = await adaptSessions(bot, event)
        if (sessions.length) sessions.forEach(bot.dispatch.bind(bot))
        bot.logger.debug(sessions)
      }
      ctx.status = 200
      ctx.body = 'ok'
    })
    bot.ctx.server.get('/line/assets/:self_id/:message_id', async (ctx) => {
      const messageId = ctx.params.message_id
      const selfId = ctx.params.self_id
      const bot = this.bots.find((bot) => bot.selfId === selfId)
      if (!bot) return ctx.status = 404
      const resp = await bot.contentHttp.axios<internal.Readable>(`/v2/bot/message/${messageId}/content`, {
        method: 'GET',
        responseType: 'stream',
      })
      ctx.type = resp.headers['content-type']
      ctx.set('cache-control', resp.headers['cache-control'])
      ctx.response.body = resp.data
      ctx.status = 200
    })
    await bot.getLogin()
    await bot.internal.setWebhookEndpoint({
      endpoint: bot.ctx.server.config.selfUrl + '/line',
    })
    bot.logger.debug('listening updates %c', 'line:' + bot.selfId)
    bot.online()
  }
}
