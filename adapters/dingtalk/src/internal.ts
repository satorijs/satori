import { Dict } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import { DingtalkBot } from './bot'

export class Internal {
  constructor(private bot: DingtalkBot) { }

  static define(routes: Dict<Partial<Record<string, Record<string, boolean>>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key
        for (const name of Object.keys(routes[path][method])) {
          const isOldApi = routes[path][method][name]
          Internal.prototype[name] = async function (this: Internal, ...args: any[]) {
            const raw = args.join(', ')
            const url = path.replace(/\{([^}]+)\}/g, () => {
              if (!args.length) throw new Error(`too few arguments for ${path}, received ${raw}`)
              return args.shift()
            })
            const config: HTTP.RequestConfig = {}
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
            const http = isOldApi ? this.bot.oldHttp : this.bot.http
            if (isOldApi) {
              config.params = { method, ...config.params, access_token: this.bot.token }
            }
            try {
              const response = await http(url, { ...config, method })
              return await response.json()
            } catch (error) {
              if (!this.bot.http.isError(error) || !error.response) throw error
              throw new Error(`[${error.response.status}] ${await error.response.text()}`)
            }
          }
        }
      }
    }
  }
}
