import { Adapter, Context, Logger } from '@satorijs/satori'
import { WhatsAppBot } from './bot'
import { WebhookBody } from './types'

export class HttpServer extends Adapter.Server<WhatsAppBot> {
  logger = new Logger('whatsapp')
  constructor(ctx: Context, bot: WhatsAppBot) {
    super()
  }

  async start(bot: WhatsAppBot) {
    // @TODO selfId
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started
    await bot.initialize()
    bot.ctx.router.post('/whatsapp', async (ctx) => {
      const parsed = ctx.request.body as WebhookBody
      this.logger.debug(require('util').inspect(parsed, false, null, true))
      ctx.body = 'ok'
      ctx.status = 200
      for (const entry of parsed.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages' && change.value.messages?.length) {
            const session = bot.session()
            session.type = 'message'
            session.isDirect = true
            session.content = change.value.messages[0].text.body
            session.channelId = change.value.messages[0].from
            session.guildId = change.value.messages[0].from
            session.messageId = change.value.messages[0].id
            session.author = {
              userId: change.value.messages[0].from,
              username: change.value.contacts[0].profile.name,
            }
            session.userId = change.value.messages[0].from
            session.timestamp = parseInt(change.value.messages[0].timestamp) * 1000

            bot.dispatch(session)
          }
        }
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
    bot.online()
  }
}
