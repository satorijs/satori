import { Adapter, Context } from '@satorijs/core'
import { Logger, sanitize, Schema } from '@satorijs/env-node'
import { KookBot } from './bot'
import { adaptSession } from './utils'

const logger = new Logger('kaiheila')

export class HttpServer extends Adapter.Server<KookBot<KookBot.BaseConfig & HttpServer.Config>> {
  constructor(ctx: Context, bot: KookBot) {
    super()
    let { path = '' } = bot.config as HttpServer.Config
    path = sanitize(path || '/kaiheila')
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
    Object.assign(bot, await bot.getSelf())
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
    protocol: Schema.const('http' as const).required(),
    path: Schema.string().description('服务器监听的路径。').default('/kaiheila'),
    token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
    verifyToken: Schema.string().description('机器人的验证令牌。').role('secret').required(),
  })
}
