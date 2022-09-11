import { Context } from 'cordis'
import { Dict } from 'cosmokit'
import { ClientRequestArgs } from 'http'
import { Agent } from 'agent-base'
import createHttpProxyAgent from 'http-proxy-agent'
import createHttpsProxyAgent from 'https-proxy-agent'
import createSocksProxyAgent from 'socks-proxy-agent'
import WebSocket from 'ws'
import Schema from 'schemastery'
import BaseQuester from './shared'

class Quester extends BaseQuester {
  ws(url: string, options: ClientRequestArgs = {}) {
    return new WebSocket(url, {
      agent: this.config.proxyAgent && Quester.getAgent(this.config.proxyAgent),
      handshakeTimeout: this.config.timeout,
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    }) as any
  }
}

namespace Quester {
  export interface Config extends BaseQuester.Config {
    proxyAgent?: string
  }

  export const Config: Schema<Config> = Schema.object({
    ...BaseQuester.Config.dict,
    proxyAgent: Schema.string().description('使用的代理服务器地址。'),
  }).description('请求设置')

  type CreateAgent = (opts: string) => Agent

  const agents: Dict<Agent> = {}
  const proxies: Dict<CreateAgent> = Object.create(null)

  export function register(protocols: string[], callback: CreateAgent) {
    for (const protocol of protocols) {
      proxies[protocol] = callback
    }
  }

  register(['http'], createHttpProxyAgent)
  register(['https'], createHttpsProxyAgent)
  register(['socks', 'socks4', 'socks4a', 'socks5', 'socks5h'], createSocksProxyAgent)

  export function getAgent(url: string) {
    if (agents[url]) return agents[url]
    const { protocol } = new URL(url)
    const callback = proxies[protocol.slice(0, -1)]
    return agents[url] ||= callback(url)
  }

  export function prepare(config: Quester.Config) {
    const options = BaseQuester.prepare(config)
    if (config.proxyAgent) {
      options.httpAgent = getAgent(config.proxyAgent)
      options.httpsAgent = getAgent(config.proxyAgent)
    }
    return options
  }
}

Context.service('http', Quester)

export default Quester
