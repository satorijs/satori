import { Adapter, Context, Logger } from '@satorijs/satori'
import { DingtalkBot } from './bot'
import crypto from 'node:crypto'
import internal from 'stream'
import { TextMessage } from './types'

export class HttpServer extends Adapter.Server<DingtalkBot> {
  logger = new Logger('dingtalk')
  constructor(ctx: Context, bot: DingtalkBot) {
    super()
  }

  async start(bot: DingtalkBot) {
    await bot.refreshToken()
    bot.selfId = bot.config.appkey
    bot.ctx.router.post('/dingtalk', async (ctx) => {
      const timestamp = ctx.get('timestamp');
      const sign = ctx.get('sign');

      if (!timestamp || !sign) return ctx.status = 403
      const timeDiff = Math.abs(Date.now() - Number(timestamp));
      if (timeDiff > 3600000) return ctx.status = 401
      const signContent = timestamp + "\n" + bot.config.secret;
      const computedSign = crypto
        .createHmac('sha256', bot.config.secret)
        .update(signContent)
        .digest('base64');

      if (computedSign !== sign) return ctx.status = 403
      const body = ctx.request.body as TextMessage
      this.logger.debug(require('util').inspect(body, false, null, true))
      const session = bot.session()
      session.type = "message"
      session.messageId = body.msgId
      session.isDirect = body.conversationType === "1"
      session.guildId = body.chatbotCorpId
      session.channelId = body.conversationId
      session.channelName = body.conversationTitle
      session.userId = body.senderStaffId
      session.author = {
        userId: body.senderStaffId,
        username: body.senderNick,
        roles: body.isAdmin ? ['admin'] : [],
      }
      session.timestamp = Number(body.createAt)
      if(body.msgtype === "text") {
        session.content = body.text.content
      }
      this.logger.debug(require('util').inspect(session, false, null, true))
      bot.dispatch(session)
    })
  }
}
