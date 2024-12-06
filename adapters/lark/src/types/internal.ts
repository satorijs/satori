import { Dict, HTTP, makeArray } from '@satorijs/core'
import { LarkBot } from '../bot'

export interface Internal {}

export interface BaseResponse {
  /** error code. would be 0 if success, and non-0 if failed. */
  code: number
  /** error message. would be 'success' if success. */
  msg: string
}

export interface InternalConfig {
  multipart?: boolean
  type?: 'json-body' | 'binary'
}

export class Internal {
  constructor(private bot: LarkBot) {}

  private _assertResponse(response: HTTP.Response<BaseResponse>) {
    if (!response.data.code) return
    this.bot.logger.debug('response: %o', response.data)
    const error = new HTTP.Error(`request failed`)
    error.response = response
    throw error
  }

  private _buildData(arg: object, options: InternalConfig) {
    if (options.multipart) {
      const form = new FormData()
      for (const [key, value] of Object.entries(arg)) {
        if (value instanceof File) {
          form.append(key, value, value.name)
        } else {
          form.append(key, value)
        }
      }
      return form
    } else {
      return arg
    }
  }

  static define(routes: Dict<Partial<Record<HTTP.Method, string | string[]>>>, options: InternalConfig = {}) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as HTTP.Method
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
                config.data = this._buildData(args[0], options)
              }
            } else if (args.length === 2 && method !== 'GET' && method !== 'DELETE') {
              config.data = this._buildData(args[0], options)
              config.params = args[1]
            } else if (args.length > 1) {
              throw new Error(`too many arguments for ${path}, received ${raw}`)
            }
            if (options.type === 'binary') {
              config.responseType = 'arraybuffer'
            }
            const response = await this.bot.http(method, url, config)
            this._assertResponse(response)
            if (options.type === 'json-body' || options.type === 'binary') {
              return response.data
            } else {
              return response.data.data
            }
          }
        }
      }
    }
  }
}
