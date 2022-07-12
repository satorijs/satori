import { Adapter, Context, Logger, Schema } from '@satorijs/satori'
import { sanitize, trimSlash } from 'cosmokit'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'
import * as Telegram from './types'

const logger = new Logger('telegram')

export class HttpServer extends Adapter.Server<TelegramBot> {
  fork(ctx: Context, bot: TelegramBot<Context, TelegramBot.BaseConfig & HttpServer.Config>) {
    super.fork(ctx, bot)
    const config = bot.config
    config.path = sanitize(config.path || '/telegram')
    if (config.selfUrl) {
      config.selfUrl = trimSlash(config.selfUrl)
    } else {
      config.selfUrl = ctx.options.selfUrl
    }
  }

  async start(bot: TelegramBot<Context, TelegramBot.BaseConfig & HttpServer.Config>) {
    const { path } = bot.config
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
      const { token, path, selfUrl } = bot.config
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
    protocol: Schema.const('server' as const).required(),
    path: Schema.string().description('服务器监听的路径。').default('/telegram'),
    selfUrl: Schema.string().role('url').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
  })
}
