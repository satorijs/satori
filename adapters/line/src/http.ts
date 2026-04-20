import { Adapter, Context } from '@satorijs/core'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import crypto from 'node:crypto'
import { LineBot } from './bot'
import { WebhookRequestBody } from './types'
import { adaptSessions } from './utils'

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
      bot.ctx.logger.debug(parsed)
      for (const event of parsed.events) {
        const sessions = await adaptSessions(bot, event)
        if (sessions.length) sessions.forEach(bot.dispatch.bind(bot))
        bot.ctx.logger.debug(sessions)
      }
      res.status = 200
      res.body = 'ok'
    })
    await bot.getLogin()
    await bot.internal.setWebhookEndpoint({
      endpoint: bot.ctx.server.config.selfUrl + '/line',
    })
    bot.ctx.logger.debug('listening updates %c', 'line:' + bot.selfId)
    bot.online()
  }
}
