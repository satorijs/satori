import { Adapter, Context, Logger } from '@satorijs/core'
import type {} from '@cordisjs/plugin-server'
import { DingtalkBot } from './bot'
import crypto from 'node:crypto'
import { Message } from './types'
import { decodeMessage } from './utils'

export class HttpServer extends Adapter<C, DingtalkBot> {
  static inject = ['server']

  private logger: Logger

  constructor(ctx: Context, bot: DingtalkBot) {
    super(ctx)
    this.logger = ctx.logger('dingtalk')
  }

  async connect(bot: DingtalkBot) {
    await bot.refreshToken()
    await bot.getLogin()
    bot.online()

    // https://open.dingtalk.com/document/orgapp/receive-message
    this.ctx.server.post('/dingtalk', async (req, res) => {
      const timestamp = req.headers.get('timestamp')
      const sign = req.headers.get('sign')
      if (!timestamp || !sign) {
        res.status = 403
        return
      }

      const timeDiff = Math.abs(Date.now() - Number(timestamp))
      if (timeDiff > 3600000) {
        res.status = 401
        return
      }
      const signContent = timestamp + '\n' + bot.config.secret
      const computedSign = crypto
        .createHmac('sha256', bot.config.secret)
        .update(signContent)
        .digest('base64')

      if (computedSign !== sign) {
        res.status = 403
        return
      }
      const body = await req.json() as Message
      this.logger.debug(body)
      const session = await decodeMessage(bot, body)
      this.logger.debug(session)
      if (session) bot.dispatch(session)
    })
  }
}
