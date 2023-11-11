import { Adapter, Context, Logger, sanitize, Schema } from '@satorijs/satori'
import {} from '@satorijs/router'
import { KookBot } from './bot'
import { adaptSession } from './utils'

export class HttpServer<C extends Context = Context> extends Adapter<C, KookBot<C, KookBot.BaseConfig & HttpServer.Config>> {
  static inject = ['router']

  private logger: Logger

  constructor(ctx: C, bot: KookBot<C>) {
    super(ctx)
    this.logger = ctx.logger('kook')
    let { path } = bot.config as HttpServer.Config
    path = sanitize(path)
    ctx.router.post(path, async (ctx) => {
      const { body } = ctx.request
      this.logger.debug('receive %o', body)

      const { challenge } = body.d
      ctx.status = 200
      if (challenge) {
        ctx.body = { challenge }
        return
      }

      const bot = this.bots.find(bot => bot.config.verifyToken === body.d.verify_token)
      if (!bot) return

      // dispatch events
      const session = await adaptSession(bot, body.d)
      if (session) bot.dispatch(session)
    })
  }

  async connect(bot: KookBot) {
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
