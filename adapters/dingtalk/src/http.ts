import { Adapter, Context, Logger } from '@satorijs/satori'
import {} from '@cordisjs/plugin-server'
import { DingtalkBot } from './bot'
import crypto from 'node:crypto'
import { Message } from './types'
import { decodeMessage } from './utils'

export class HttpServer<C extends Context = Context> extends Adapter<C, DingtalkBot<C>> {
  static inject = ['server']

  private logger: Logger

  constructor(ctx: C, bot: DingtalkBot<C>) {
    super(ctx)
    this.logger = ctx.logger('dingtalk')
  }

  async connect(bot: DingtalkBot<C>) {
    await bot.refreshToken()
    await bot.getLogin()
    bot.online()

    // https://open.dingtalk.com/document/orgapp/receive-message
    this.ctx.server.post('/dingtalk', async (ctx) => {
      const timestamp = ctx.get('timestamp')
      const sign = ctx.get('sign')

      if (!timestamp || !sign) return ctx.status = 403
      const timeDiff = Math.abs(Date.now() - Number(timestamp))
      if (timeDiff > 3600000) return ctx.status = 401
      const signContent = timestamp + '\n' + bot.config.secret
      const computedSign = crypto
        .createHmac('sha256', bot.config.secret)
        .update(signContent)
        .digest('base64')

      if (computedSign !== sign) return ctx.status = 403
      const body = ctx.request.body as Message
      this.logger.debug(body)
      const session = await decodeMessage(bot, body)
      this.logger.debug(session)
      if (session) bot.dispatch(session)
    })
  }
}
