import { Adapter, Context, sanitize, Schema, trimSlash } from '@satorijs/core'
import {} from '@cordisjs/plugin-server'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'
import * as Telegram from './types'

export { Telegram }

export class HttpServer<C extends Context = Context> extends Adapter<C, TelegramBot<C>> {
  static inject = ['server']

  async connect(bot: TelegramBot<C, TelegramBot.BaseConfig & HttpServer.Options>) {
    let { token, path, selfUrl } = bot.config
    path = sanitize(path || '/telegram')
    if (selfUrl) {
      selfUrl = trimSlash(selfUrl)
    } else {
      selfUrl = this.ctx.server.config.selfUrl
    }

    this.ctx.server.post(path, async (ctx) => {
      const payload: Telegram.Update = ctx.request.body
      const token = ctx.request.query.token as string
      const [selfId] = token.split(':')
      const bot = this.bots.find(bot => bot.selfId === selfId)
      if (!(bot?.config?.token === token)) return ctx.status = 403
      ctx.body = 'OK'
      await handleUpdate(payload, bot)
    })

    bot.initialize(async (bot) => {
      const info = await bot.internal.setWebhook({
        url: selfUrl + path + '?token=' + token,
        drop_pending_updates: true,
      })
      if (!info) throw new Error('Set webhook failed')
      bot.logger.debug('listening updates %c', 'telegram: ' + bot.selfId)
    })
  }
}

export namespace HttpServer {
  export interface Options {
    protocol: 'server'
    path?: string
    selfUrl?: string
  }

  export const Options: Schema<Options> = Schema.object({
    protocol: Schema.const('server').required(),
    path: Schema.string().description('服务器监听的路径。').default('/telegram'),
    selfUrl: Schema.string().role('link').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
  })
}
