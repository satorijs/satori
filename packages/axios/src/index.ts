import { Context } from 'cordis'
import { Dict, base64ToArrayBuffer, pick, trimSlash } from 'cosmokit'
import { ClientRequestArgs } from 'http'
import mimedb from 'mime-db'
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import * as types from 'axios'

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

export interface Quester {
  <T = any>(method: Method, url: string, config?: AxiosRequestConfig): Promise<T>
  axios<T = any>(config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  axios<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  config: Quester.Config
}

export class Quester {
  constructor(ctx: Context, config: Context.Config) {
    return Quester.create(config.request)
  }

  extend(newConfig: Quester.Config): Quester {
    return Quester.create({
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
    return new WebSocket(url) as any as import('ws').WebSocket
  }

  prepare(): AxiosRequestConfig {
    return pick(this.config, ['timeout', 'headers'])
  }

  resolve(url: string) {
    // do not use new URL(url, this.config.endpoint) here
    return trimSlash(this.config.endpoint || '') + url
  }

  async file(url: string): Promise<Quester.File> {
    const capture = /^data:([\w/-]+);base64,(.*)$/.exec(url)
    if (capture) {
      const [, mime, base64] = capture
      const ext = mimedb[mime]?.extensions?.[0]
      const name = 'file' + (ext ? '.' + ext : '')
      return { mime, filename: name, data: base64ToArrayBuffer(base64) }
    }
    let [_, name] = this.resolve(url).match(/.+\/([^/]*)(?=\?)/)
    const { headers, data } = await this.axios(url, { method: 'GET', responseType: 'arraybuffer' })
    const mime = headers['content-type']
    if (!name.includes('.')){
      const ext = mimedb[mime]?.extensions?.[0]
      name += ext ? '.' + ext : ''
    }
    return { mime, filename: name, data }
  }
}

export namespace Quester {
  export type Method = types.Method
  export type AxiosResponse = types.AxiosResponse
  export type AxiosRequestConfig = types.AxiosRequestConfig

  export interface File {
    mime?: string
    filename: string
    data: ArrayBufferLike
  }

  export const isAxiosError = axios.isAxiosError

  export interface Config {
    headers?: Dict
    endpoint?: string
    timeout?: number
    proxyAgent?: string
  }

  export function create(this: typeof Quester, config: Quester.Config = {}) {
    const request = async (config: AxiosRequestConfig = {}) => {
      const options = http.prepare()
      return axios({
        ...options,
        ...config,
        url: http.resolve(config.url),
        headers: {
          ...options.headers,
          ...config.headers,
        },
      })
    }

    const http = (async (method, url, config) => {
      const response = await request({ url, ...config, method })
      return response.data
    }) as Quester

    Object.setPrototypeOf(http, this.prototype)
    for (const key of ['extend', 'get', 'delete', 'post', 'put', 'patch', 'head', 'ws']) {
      http[key] = this.prototype[key].bind(http)
    }

    http.config = config
    http.axios = (...args: any[]) => {
      if (typeof args[0] === 'string') {
        return request({ url: args[0], ...args[1] })
      } else {
        return request(args[0])
      }
    }
    return http
  }
}

Context.service('http', Quester)

export default Quester
