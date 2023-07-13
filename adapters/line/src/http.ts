import { Adapter, Context, Logger } from '@satorijs/satori'
import { LineBot } from './bot'
import crypto from 'node:crypto'
import { WebhookRequestBody } from './types'
import { adaptSessions } from './utils'
import internal from 'stream'

export class HttpServer extends Adapter.Server<LineBot> {
  logger = new Logger('line')
  constructor(ctx: Context, bot: LineBot) {
    super()
  }

  async start(bot: LineBot) {
    const { userId } = await bot.internal.getBotInfo()
    bot.selfId = userId
    bot.online()
    bot.ctx.router.post('/line', async (ctx) => {
      const sign = ctx.headers['x-line-signature']?.toString()
      const hash = crypto.createHmac('SHA256', bot.config.secret).update(ctx.request.rawBody || '').digest('base64')
      if (hash !== sign) {
        return ctx.status = 403
      }
      const parsed = ctx.request.body as WebhookRequestBody
      this.logger.debug(require('util').inspect(parsed, false, null, true))
      for (const event of parsed.events) {
        const sessions = await adaptSessions(bot, event)
        if (sessions.length) sessions.forEach(bot.dispatch.bind(bot))
        this.logger.debug(require('util').inspect(sessions, false, null, true))
      }
      ctx.status = 200
      ctx.body = 'ok'
    })
    bot.ctx.router.get('/line/assets/:self_id/:message_id', async (ctx) => {
      const messageId = ctx.params.message_id
      const selfId = ctx.params.self_id
      const localBot = this.bots.find((bot) => bot.selfId === selfId)
      if (!localBot) return ctx.status = 404
      const resp = await localBot.contentHttp.axios<internal.Readable>(`/v2/bot/message/${messageId}/content`, {
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
