import { Adapter, Context, Logger, sanitize, Schema } from '@satorijs/core'
import {} from '@cordisjs/plugin-server'
import { KookBot } from './bot'
import { adaptSession } from './utils'

export class HttpServer<C extends Context = Context> extends Adapter<C, KookBot<C, KookBot.BaseConfig & HttpServer.Options>> {
  static inject = ['server']

  private logger: Logger

  constructor(ctx: C, bot: KookBot<C>) {
    super(ctx)
    this.logger = ctx.logger('kook')
    let { path } = bot.config as HttpServer.Options
    path = sanitize(path)
    ctx.server.post(path, async (ctx) => {
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
  export interface Options {
    protocol: 'http'
    path?: string
    token: string
    verifyToken: string
  }

  export const Options: Schema<Options> = Schema.object({
    protocol: Schema.const('http').required(),
    token: Schema.string().description('机器人令牌。').role('secret').required(),
    verifyToken: Schema.string().description('验证令牌。').role('secret').required(),
    path: Schema.string().description('服务器监听的路径。').default('/kook'),
  })
}
