import { Context, sanitize, trimSlash } from '@satorijs/core'
import type {} from '@cordisjs/plugin-server'
import {} from '@cordisjs/plugin-logger'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'
import * as Telegram from './types'
import z from 'schemastery'

export { Telegram }

export class HttpServer {
  static inject = ['server']

  constructor(public ctx: Context, public bot: TelegramBot) {
    bot.adapter = this
  }

  async connect() {
    const bot = this.bot as TelegramBot<TelegramBot.BaseConfig & HttpServer.Options>
    let { token, path, selfUrl } = bot.config
    path = sanitize(path || '/telegram')
    if (selfUrl) {
      selfUrl = trimSlash(selfUrl)
    } else {
      selfUrl = this.ctx.server.config.selfUrl
    }

    this.ctx.server.post(path, async (req, res, next) => {
      const payload: Telegram.Update = await req.json()
      const reqToken = req.query.get('token')!
      const [selfId] = reqToken.split(':')
      if (bot.selfId !== selfId || bot.config.token !== reqToken) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      res.body = 'OK'
      await handleUpdate(payload, bot)
    })

    bot.initialize(async (bot) => {
      const info = await bot.internal.setWebhook({
        url: selfUrl + path + '?token=' + token,
        drop_pending_updates: true,
      })
      if (!info) throw new Error('Set webhook failed')
      bot.ctx.logger.debug('listening updates %c', 'telegram: ' + bot.selfId)
    })
  }

  async disconnect() {}
}

export namespace HttpServer {
  export interface Options {
    protocol: 'server'
    path?: string
    selfUrl?: string
  }

  export const Options: z<Options> = z.object({
    protocol: z.const('server').required(),
    path: z.string().description('服务器监听的路径。').default('/telegram'),
    selfUrl: z.string().role('link').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
  })
}
