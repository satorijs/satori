import { Bot, Dict, HTTP, makeArray } from '@satorijs/core'

export class Internal {
  constructor(private bot: Bot, private http: () => HTTP) { }

  static define(isGuild: boolean, routes: Dict<Partial<Record<HTTP.Method, string | string[]>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as HTTP.Method
        for (const name of makeArray(routes[path][method])) {
          (isGuild ? GuildInternal : GroupInternal).prototype[name] = async function (this: Internal, ...args: any[]) {
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
            const http = this.http()
            try {
              this.bot.logger.debug(`${method} ${url} request: %o`, config)
              const response = await http(url, { ...config, method })
              this.bot.logger.debug(`${method} ${url} response: %o, trace id: %s`, response.data, response.headers.get('x-tps-trace-id'))
              return response.data
            } catch (error) {
              this.bot.logger.warn(`${method} ${url} request: %o`, config)
              if (!http.isError(error) || !error.response) throw error
              this.bot.logger.warn(`${method} ${url} response: %o, trace id: %s`, error.response.data, error.response.headers.get('x-tps-trace-id'))
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
