import { Dict, makeArray } from '@satorijs/core'
import { Http } from '@cordisjs/plugin-http'
import { DiscordBot } from '../bot'

export class Internal {
  constructor(private bot: DiscordBot) {}

  static define(routes: Dict<Partial<Record<string, string | string[]>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as string
        for (const name of makeArray(routes[path][method])) {
          Internal.prototype[name] = async function (this: Internal, ...args: any[]) {
            const raw = args.join(', ')
            const url = path.replace(/^\//, '').replace(/\{([^}]+)\}/g, () => {
              if (!args.length) throw new Error(`too few arguments for ${path}, received ${raw}`)
              return args.shift()
            })
            const config: Http.RequestConfig = {}
            if (args.length === 1) {
              if (method === 'GET' || method === 'DELETE') {
                config.params = args[0]
              } else {
                config.data = args[0]
              }
            } else if (args.length === 2 && method !== 'GET' && method !== 'DELETE') {
              config.data = args[0]
              config.params = args[1]
            } else if (args.length > 1) {
              throw new Error(`too many arguments for ${path}, received ${raw}`)
            }
            this.bot.ctx.logger.debug(`${method} ${url}`, config)
            const response = await this.bot.http(url, { ...config, method })
            const body = await response.text()
            if (response.status >= 400) {
              throw new Error(`[${response.status}] ${body}`)
            }
            if (!body) return
            return JSON.parse(body)
          }
        }
      }
    }
  }
}
