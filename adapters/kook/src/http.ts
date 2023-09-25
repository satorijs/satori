import { Adapter, Context, Logger, sanitize, Schema } from '@satorijs/satori'
import { KookBot } from './bot'
import { adaptSession } from './utils'

const logger = new Logger('kook')

export class HttpServer extends Adapter.Server<KookBot<KookBot.BaseConfig & HttpServer.Config>> {
  constructor(ctx: Context, bot: KookBot) {
    super()
    let { path } = bot.config as HttpServer.Config
    path = sanitize(path)
    ctx.router.post(path, (ctx) => {
      const { body } = ctx.request
      logger.debug('receive %o', body)

      const { challenge } = body.d
      ctx.status = 200
      if (challenge) {
        ctx.body = { challenge }
        return
      }

      const bot = this.bots.find(bot => bot.config.verifyToken === body.d.verify_token)
      if (!bot) return

      // dispatch events
      const session = adaptSession(bot, body.d)
      if (session) bot.dispatch(session)
    })
  }

  async start(bot: KookBot) {
    await bot.getLogin()
    bot.online()
  }
}

export namespace HttpServer {
  export interface Config {
    protocol: 'http'
    path?: string
    token: string
    verifyToken: string
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('http').required(),
    token: Schema.string().description('机器人令牌。').role('secret').required(),
    verifyToken: Schema.string().description('验证令牌。').role('secret').required(),
    path: Schema.string().description('服务器监听的路径。').default('/kook'),
  })
}
