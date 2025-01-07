import { Dict, HTTP, makeArray } from '@satorijs/core'
import { LarkBot } from './bot'

export interface Internal {}

export interface BaseResponse {
  /** error code. would be 0 if success, and non-0 if failed. */
  code: number
  /** error message. would be 'success' if success. */
  msg: string
}

export interface Pagination {
  page_size?: number
  page_token?: string
}

export type Paginated<T, K extends string = 'items'> = {
  [P in K]: T[];
} & {
  has_more: boolean
  page_token: string
}

export interface InternalRoute {
  name: string
  pagination?: {
    argIndex: number
    itemsKey?: string
    tokenKey?: string
  }
  multipart?: boolean
  type?: 'raw-json' | 'binary'
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

  private _buildData(arg: object, options: InternalRoute) {
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

  static define(routes: Dict<Partial<Record<HTTP.Method, string | InternalRoute>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as HTTP.Method
        for (let route of makeArray(routes[path][method])) {
          if (typeof route === 'string') {
            route = { name: route }
          }
          Internal.prototype[route.name] = async function (this: Internal, ...args: any[]) {
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
                config.data = this._buildData(args[0], route)
              }
            } else if (args.length === 2 && method !== 'GET' && method !== 'DELETE') {
              config.data = this._buildData(args[0], route)
              config.params = args[1]
            } else if (args.length > 1) {
              throw new Error(`too many arguments for ${path}, received ${raw}`)
            }
            if (route.type === 'binary') {
              config.responseType = 'arraybuffer'
            }
            const response = await this.bot.http(method, url, config)
            this._assertResponse(response)
            if (route.type === 'raw-json' || route.type === 'binary') {
              return response.data
            } else {
              return response.data.data
            }
          }

          if (route.pagination) {
            const { argIndex, itemsKey = 'items', tokenKey = 'page_token' } = route.pagination
            Internal.prototype[route.name + 'Iter'] = async function (this: Internal, ...args: any[]) {
              let list: Paginated<any>
              const getList = async () => {
                args[argIndex] = { ...args[argIndex], page_token: list?.[tokenKey] }
                list = await this[route.name](...args)
              }
              return {
                async next() {
                  if (list?.[itemsKey].length) return { done: false, value: list[itemsKey].shift() }
                  if (!list.has_more) return { done: true, value: undefined }
                  await getList()
                  return this.next()
                },
                [Symbol.asyncIterator]() {
                  return this
                },
              }
            }
          }
        }
      }
    }
  }
}
