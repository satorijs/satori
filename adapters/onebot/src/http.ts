import { Adapter, Context, Logger, Quester, Schema } from '@satorijs/satori'
import { OneBotBot } from './bot'
import { dispatchSession } from './utils'
import { createHmac } from 'crypto'

const logger = new Logger('onebot')

export class HttpServer extends Adapter.Server<OneBotBot> {
  public bots: OneBotBot[]

  async fork(ctx: Context, bot: OneBotBot<OneBotBot.Config & HttpServer.Config>) {
    const config = bot.config
    const { endpoint, token } = config
    if (!endpoint) return

    const http = ctx.http.extend(config).extend({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    })

    bot.internal._request = async (action, params) => {
      return http.post('/' + action, params)
    }

    return bot.initialize()
  }

  async start(bot: OneBotBot<OneBotBot.Config & HttpServer.Config>) {
    const { secret, path = '/onebot' } = bot.config
    bot.ctx.router.post(path, (ctx) => {
      if (secret) {
        // no signature
        const signature = ctx.headers['x-signature']
        if (!signature) return ctx.status = 401

        // invalid signature
        const sig = createHmac('sha1', secret).update(ctx.request.rawBody).digest('hex')
        if (signature !== `sha1=${sig}`) return ctx.status = 403
      }

      const selfId = ctx.headers['x-self-id'].toString()
      const bot = this.bots.find(bot => bot.selfId === selfId)
      if (!bot) return ctx.status = 403

      logger.debug('receive %o', ctx.request.body)
      dispatchSession(bot, ctx.request.body)
    })
  }

  async stop() {
    logger.debug('http server closing')
  }
}

export namespace HttpServer {
  export interface Config extends Quester.Config {
    protocol: 'http'
    path?: string
    secret?: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.const('http' as const).required(),
      path: Schema.string().description('服务器监听的路径。').default('/onebot'),
      secret: Schema.string().description('接收事件推送时用于验证的字段，应该与 OneBot 的 secret 配置保持一致。').role('secret'),
    }).description('连接设置'),
    Quester.createConfig(true),
  ])
}
