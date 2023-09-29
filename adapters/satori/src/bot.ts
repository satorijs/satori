import { Bot, Context, Quester, Schema, snakeCase, Universal } from '@satorijs/satori'
import { WsClient } from './ws'

export function transformKey(source: any, callback: (key: string) => string) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(value => transformKey(value, callback))
  return Object.fromEntries(Object.entries(source).map(([key, value]) => {
    if (key.startsWith('_')) return [key, value]
    return [callback(key), transformKey(value, callback)]
  }))
}

export class SatoriBot extends Bot<SatoriBot.Config> {
  public http: Quester

  constructor(ctx: Context, config: SatoriBot.Config) {
    super(ctx, config)
    this.platform = 'discord'
    this.http = ctx.http.extend(config)
    // TODO: Internal
    // this.internal = new Internal(this.http)
    ctx.plugin(WsClient, this)
  }
}

for (const [key, method] of Object.entries(Universal.Methods)) {
  SatoriBot.prototype[key] = function (this: SatoriBot, ...args: any[]) {
    const payload = {}
    for (const { name } of method.fields) {
      payload[name] = transformKey(args.shift(), snakeCase)
    }
    this.http.post('/' + key, payload)
  }
}

export namespace SatoriBot {
  export interface Config extends Bot.Config, WsClient.Config {
    slash?: boolean
    endpoint: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      endpoint: Schema.string().description('API endpoint.').required(),
    }),
    Schema.object({
      slash: Schema.boolean().description('是否启用斜线指令。').default(true),
    }).description('功能设置'),
    WsClient.Config,
  ])
}
