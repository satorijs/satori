import { Adapter, Context, sanitize } from '@satorijs/core'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import { KookBot } from './bot'
import { adaptSession } from './utils'
import z from 'schemastery'

export class HttpServer extends Adapter<KookBot<KookBot.BaseConfig & HttpServer.Options>> {
  static inject = ['server']

  constructor(ctx: Context, bot: KookBot) {
    super(ctx)
    let { path } = bot.config as HttpServer.Options
    path = sanitize(path)
    ctx.server.post(path, async (req, res) => {
      const body = await req.json()
      this.ctx.logger.debug('receive %o', body)

      const { challenge } = body.d
      res.status = 200
      if (challenge) {
        res.headers.set('content-type', 'application/json')
        res.body = JSON.stringify({ challenge })
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

  export const Options: z<Options> = z.object({
    protocol: z.const('http').required(),
    token: z.string().description('机器人令牌。').role('secret').required(),
    verifyToken: z.string().description('验证令牌。').role('secret').required(),
    path: z.string().description('服务器监听的路径。').default('/kook'),
  })
}
