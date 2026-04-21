import { Context, sanitize } from '@satorijs/core'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import { KookBot } from './bot'
import { adaptSession } from './utils'
import z from 'schemastery'

export class HttpServer {
  static inject = ['server']

  constructor(public ctx: Context, public bot: KookBot<KookBot.BaseConfig & HttpServer.Options>) {
    bot.adapter = this
    let { path } = bot.config as HttpServer.Options
    path = sanitize(path)
    ctx.server.post(path, async (req, res, next) => {
      const body = await req.json()
      this.ctx.logger.debug('receive %o', body)

      const { challenge } = body.d
      if (challenge) {
        if (this.bot.config.verifyToken !== body.d.verify_token) {
          const result = await next()
          if (result) return result
          if (!res.claimed) res.status = 403
          return
        }
        res.status = 200
        res.headers.set('content-type', 'application/json')
        res.body = JSON.stringify({ challenge })
        return
      }

      if (this.bot.config.verifyToken !== body.d.verify_token) {

        const result = await next()

        if (result) return result

        if (!res.claimed) res.status = 403

        return

      }
      res.status = 200

      // dispatch events
      const session = await adaptSession(this.bot, body.d)
      if (session) this.bot.dispatch(session)
    })
  }

  async connect() {
    await this.bot.getLogin()
    this.bot.online()
  }

  async disconnect() {}
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
