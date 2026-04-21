import { Context } from '@satorijs/core'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import { DingtalkBot } from './bot'
import crypto from 'node:crypto'
import { Message } from './types'
import { decodeMessage } from './utils'

export class HttpServer {
  static inject = ['server']

  constructor(public ctx: Context, public bot: DingtalkBot) {
    bot.adapter = this
  }

  async connect() {
    const bot = this.bot
    await bot.refreshToken()
    await bot.getLogin()
    bot.online()

    // https://open.dingtalk.com/document/orgapp/receive-message
    this.ctx.server.post('/dingtalk', async (req, res, next) => {
      const timestamp = req.headers.get('timestamp')
      const sign = req.headers.get('sign')
      if (!timestamp || !sign) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 401
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
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 401
        return
      }
      const body = await req.json() as Message
      this.ctx.logger.debug(body)
      const session = await decodeMessage(bot, body)
      this.ctx.logger.debug(session)
      if (session) bot.dispatch(session)
    })
  }

  async disconnect() {}
}
