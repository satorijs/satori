import { Dict, HTTP, makeArray } from '@satorijs/core'
import { LarkBot } from '../bot'

export interface Internal {}

export interface BaseResponse {
  /** error code. would be 0 if success, and non-0 if failed. */
  code: number
  /** error message. would be 'success' if success. */
  msg: string
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export class Internal {
  constructor(private bot: LarkBot) {}

  private assertResponse(response: HTTP.Response<BaseResponse>) {
    if (!response.data.code) return
    this.bot.logger.debug('response: %o', response.data)
    const error = new HTTP.Error(`request failed`)
    error.response = response
    throw error
  }

  static define(routes: Dict<Partial<Record<Method, string | string[]>>>, extractData = true) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as Method
        for (const name of makeArray(routes[path][method])) {
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
            const response = await this.bot.http(method, url, config)
            this.assertResponse(response)
            return extractData ? response.data.data : response.data
          }
        }
      }
    }
  }
}
