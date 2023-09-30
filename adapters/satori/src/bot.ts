import { Bot, Context, Quester, snakeCase, Universal } from '@satorijs/satori'

export function transformKey(source: any, callback: (key: string) => string) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(value => transformKey(value, callback))
  return Object.fromEntries(Object.entries(source).map(([key, value]) => {
    if (key.startsWith('_')) return [key, value]
    return [callback(key), transformKey(value, callback)]
  }))
}

export class SatoriBot extends Bot<Universal.Login> {
  public http: Quester

  constructor(ctx: Context, config: Universal.Login) {
    super(ctx, config)
    Object.assign(this, config)
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
