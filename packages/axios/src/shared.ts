import { Context } from 'cordis'
import { Dict, trimSlash } from 'cosmokit'
import { ClientRequestArgs } from 'http'
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import * as types from 'axios'
import Schema from 'schemastery'
import WebSocket from 'ws'

declare module 'cordis' {
  interface Context {
    http: Quester
  }

  namespace Context {
    interface Config {
      request?: Quester.Config
    }
  }
}

interface Quester {
  <T = any>(method: Method, url: string, config?: AxiosRequestConfig): Promise<T>
  axios<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  config: Quester.Config
}

class Quester {
  constructor(ctx: Context, config: Context.Config) {
    return Object.getPrototypeOf(this).constructor.create(config.request)
  }

  extend(newConfig: Quester.Config): Quester {
    return (this.constructor as typeof Quester).create({
      ...this.config,
      ...newConfig,
      headers: {
        ...this.config.headers,
        ...newConfig.headers,
      },
    })
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this('GET', url, config)
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this('DELETE', url, config)
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this('POST', url, { ...config, data })
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this('PUT', url, { ...config, data })
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this('PATCH', url, { ...config, data })
  }

  async head(url: string, config?: AxiosRequestConfig): Promise<Dict<string>> {
    const response = await this.axios(url, { ...config, method: 'HEAD' })
    return response.headers
  }

  ws(url: string, options?: ClientRequestArgs) {
    return new WebSocket(url)
  }
}

namespace Quester {
  export type Method = types.Method
  export type AxiosResponse = types.AxiosResponse
  export type AxiosRequestConfig = types.AxiosRequestConfig

  export const isAxiosError = axios.isAxiosError

  export interface Config {
    headers?: Dict
    endpoint?: string
    timeout?: number
    proxyAgent?: string
  }

  export const Config: Schema<Config> = Schema.object({
    timeout: Schema.natural().role('ms').description('等待连接建立的最长时间。'),
  }).description('请求设置')

  export function createConfig(this: typeof Quester, endpoint: string | boolean): Schema<Config> {
    return Schema.object({
      endpoint: Schema.string().role('link').description('要连接的服务器地址。')
        .default(typeof endpoint === 'string' ? endpoint : null)
        .required(typeof endpoint === 'boolean' ? endpoint : false),
      headers: Schema.dict(String).description('要附加的额外请求头。'),
      ...this.Config.dict,
    }).description('请求设置')
  }

  export const prepare = (config: Quester.Config): AxiosRequestConfig => ({
    timeout: config.timeout,
    headers: config.headers,
  })

  export function create(this: typeof Quester, config: Quester.Config = {}) {
    const options = this.prepare(config)
    const endpoint = config.endpoint = trimSlash(config.endpoint || '')

    const request = async (url: string, config: AxiosRequestConfig = {}) => axios({
      ...options,
      ...config,
      url: endpoint + url,
      headers: {
        ...options.headers,
        ...config.headers,
      },
    })

    const http = (async (method, url, config) => {
      const response = await request(url, { ...config, method })
      return response.data
    }) as Quester

    Object.setPrototypeOf(http, this.prototype)
    for (const key of ['extend', 'get', 'delete', 'post', 'put', 'patch', 'head', 'ws']) {
      http[key] = this.prototype[key].bind(http)
    }

    http.config = config
    http.axios = request
    return http
  }
}

Context.service('http', Quester)

export default Quester
