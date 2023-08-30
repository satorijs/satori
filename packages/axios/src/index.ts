import { Context } from 'cordis'
import { Agent } from 'agent-base'
import { arrayBufferToBase64, base64ToArrayBuffer, Dict, pick, trimSlash } from 'cosmokit'
import { ClientRequestArgs } from 'http'
import mimedb from 'mime-db'
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import * as Axios from 'axios'

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

/* eslint-disable no-multi-spaces */
const ranges = [
  '0.0.0.0/8',          // RFC 1122 'this' network
  '10.0.0.0/8',         // RFC 1918 private space
  '100.64.0.0/10',      // RFC 6598 Carrier grade nat space
  '127.0.0.0/8',        // RFC 1122 localhost
  '169.254.0.0/16',     // RFC 3927 link local
  '172.16.0.0/12',      // RFC 1918 private space
  '192.0.2.0/24',       // RFC 5737 TEST-NET-1
  '192.88.99.0/24',     // RFC 7526 6to4 anycast relay
  '192.168.0.0/16',     // RFC 1918 private space
  '198.18.0.0/15',      // RFC 2544 benchmarking
  '198.51.100.0/24',    // RFC 5737 TEST-NET-2
  '203.0.113.0/24',     // RFC 5737 TEST-NET-3
  '224.0.0.0/4',        // multicast
  '240.0.0.0/4',        // reserved
]
/* eslint-enable no-multi-spaces */

function addressToNumber(address: string) {
  return address.split('.').reduce((a, b) => (a << 8n) + BigInt(b), 0n)
}

function isPrivate(hostname: string) {
  if (!/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(hostname)) return false
  for (const cidr of ranges) {
    const [address, length] = cidr.split('/')
    const mask = -1n << BigInt(32 - +length)
    const value1 = addressToNumber(hostname) & mask
    const value2 = addressToNumber(address) & mask
    if (value1 === value2) return true
  }
  return false
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

  agent(url: string, persist = true) {
    if (!url) return
    if (Quester.agents[url]) return Quester.agents[url]
    const { protocol } = new URL(url)
    const callback = Quester.proxies[protocol.slice(0, -1)]
    if (!callback) return
    const agent = callback(url)
    if (persist) Quester.agents[url] = agent
    return agent
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

  async head(url: string, config?: AxiosRequestConfig): Promise<Dict<any>> {
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

  async file(url: string, options: Quester.FileOptions = {}): Promise<Quester.File> {
    const capture = /^data:([\w/-]+);base64,(.*)$/.exec(url)
    if (capture) {
      const [, mime, base64] = capture
      const ext = mimedb[mime]?.extensions?.[0]
      const name = 'file' + (ext ? '.' + ext : '')
      return { mime, filename: name, data: base64ToArrayBuffer(base64) }
    }
    let [, name] = this.resolve(url).match(/.+\/([^/?]*)(?=\?)?/)!
    const { headers, data } = await this.axios(url, {
      method: 'GET',
      responseType: 'arraybuffer',
      timeout: +options.timeout! || undefined,
    })
    const mime = headers['content-type']
    if (!name.includes('.')) {
      const ext = mimedb[mime]?.extensions?.[0]
      name += ext ? '.' + ext : ''
    }
    return { mime, filename: name, data }
  }

  isPrivate(url: string) {
    const { hostname, protocol } = new URL(url)
    if (protocol !== 'http:' && protocol !== 'https:') return true
    return isPrivate(hostname)
  }

  async toPublic(url: string) {
    if (!this.isPrivate(url)) return url
    const { headers, data } = await this.axios(url, {
      method: 'GET',
      responseType: 'arraybuffer',
    })
    const mime = headers['content-type']
    return `data:${mime};base64,${arrayBufferToBase64(data)}`
  }
}

export namespace Quester {
  export type Method = Axios.Method
  export type AxiosResponse = Axios.AxiosResponse
  export type AxiosRequestConfig = Axios.AxiosRequestConfig
  export type CreateAgent = (opts: string) => Agent

  export const agents: Dict<Agent> = Object.create(null)
  export const proxies: Dict<CreateAgent> = Object.create(null)

  export function defineAgent(protocols: string[], callback: CreateAgent) {
    for (const protocol of protocols) {
      proxies[protocol] = callback
    }
  }

  export interface File {
    mime?: string
    filename: string
    data: ArrayBufferLike
  }

  export interface FileOptions {
    timeout?: number | string
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
      const error = new Error() as Axios.AxiosError
      return axios({
        ...options,
        ...config,
        url: http.resolve(config.url!),
        headers: {
          ...options.headers,
          ...config.headers,
        },
      }).catch((cause) => {
        if (!axios.isAxiosError(cause)) throw cause
        Object.assign(error, cause)
        error.isAxiosError = true
        error.cause = cause
        throw error
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
