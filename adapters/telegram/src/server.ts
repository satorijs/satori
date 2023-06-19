import { Adapter, Logger, sanitize, Schema, trimSlash } from '@satorijs/satori'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'
import * as Telegram from './types'

const logger = new Logger('telegram')

export class HttpServer extends Adapter.Server<TelegramBot> {
  async start(bot: TelegramBot<TelegramBot.BaseConfig & HttpServer.Config>) {
    let { token, path, selfUrl } = bot.config
    path = sanitize(path || '/telegram')
    if (selfUrl) {
      selfUrl = trimSlash(selfUrl)
    } else {
      selfUrl = bot.ctx.root.config.selfUrl
    }

    bot.ctx.router.post(path, async (ctx) => {
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
      logger.debug('listening updates %c', 'telegram: ' + bot.selfId)
    })
  }

  async stop() {
    logger.debug('http server closing')
  }
}

export namespace HttpServer {
  export interface Config {
    protocol: 'server'
    path?: string
    selfUrl?: string
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('server').required(),
    path: Schema.string().description('服务器监听的路径。').default('/telegram'),
    selfUrl: Schema.string().role('link').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
  })
}
