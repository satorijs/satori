import { Bot, Dict, makeArray } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'

export class Internal {
  constructor(private bot: Bot, private http: () => HTTP) { }

  static define(isGuild: boolean, routes: Dict<Partial<Record<string, string | string[]>>>, preset?: HTTP.RequestConfig) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as string
        for (const name of makeArray(routes[path][method])) {
          (isGuild ? GuildInternal : GroupInternal).prototype[name] = async function (this: Internal, ...args: any[]) {
            const raw = args.join(', ')
            const url = path.replace(/\{([^}]+)\}/g, () => {
              if (!args.length) throw new Error(`too few arguments for ${path}, received ${raw}`)
              return args.shift()
            })
            const config: HTTP.RequestConfig = { ...preset }
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
            const http = this.http()
            const decode = async (res: Response) => {
              return config.responseType === 'text' ? await res.text() : await res.json()
            }
            try {
              this.bot.ctx.logger.debug(`${method} ${url} request: %o`, config)
              const response = await http(url, { ...config, method })
              const data = await decode(response)
              this.bot.ctx.logger.debug(`${method} ${url} response: %o, trace id: %s`, data, response.headers.get('x-tps-trace-id'))
              return data
            } catch (error) {
              if (!http.isError(error) || !error.response) throw error
              const body = await decode(error.response).catch(() => null)
              this.bot.ctx.logger.debug(`${method} ${url} response: %o, trace id: %s`, body, error.response.headers.get('x-tps-trace-id'))
              throw error
            }
          }
        }
      }
    }
  }
}

export class GroupInternal extends Internal { }

export class GuildInternal extends Internal { }
