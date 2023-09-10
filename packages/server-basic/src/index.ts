import { Context, Schema, Universal } from '@satorijs/satori'

export interface Config {
  path: string
}

export const Config: Schema<Config> = Schema.object({
  path: Schema.string().default('/basic'),
})

export function apply(ctx: Context, config: Config) {
  ctx.router.all(config + '/:name', async (koa) => {
    const method = Universal.Methods[koa.params.name]
    if (!method) {
      koa.body = 'method not found'
      return koa.status = 404
    }

    const json = koa.method === 'GET' ? koa.query : koa.request.body
    const selfId = json.self_id
    const platform = json.platform
    const bot = ctx.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
    if (!bot) {
      koa.body = 'bot not found'
      return koa.status = 403
    }

    const args = method.fields.map(field => json[field])
    const result = await bot[method.name](...args)
    koa.body = result
    koa.status = 200
  })
}
