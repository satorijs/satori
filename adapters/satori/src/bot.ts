import { Bot, camelize, Context, Quester, Schema, Universal } from '@satorijs/satori'
import { WsClient } from './ws'

export function camelizeKeys<T>(source: T): T {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(camelizeKeys) as any
  return Object.fromEntries(Object.entries(source).map(([k, v]) => [camelize(k), camelizeKeys(v)])) as any
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
    for (const key of method.fields) {
      payload[key] = args.shift()
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
