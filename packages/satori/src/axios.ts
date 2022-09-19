import { Quester } from '@satorijs/core'
import { defineProperty, Dict } from 'cosmokit'
import { ClientRequestArgs } from 'http'
import { Agent } from 'agent-base'
import { WebSocket } from 'ws'
import createHttpProxyAgent from 'http-proxy-agent'
import createHttpsProxyAgent from 'https-proxy-agent'
import createSocksProxyAgent from 'socks-proxy-agent'
import Schema from 'schemastery'

Quester.prototype.ws = function ws(this: Quester, url: string, options: ClientRequestArgs = {}) {
  return new WebSocket(url, {
    agent: getAgent(this.config.proxyAgent),
    handshakeTimeout: this.config.timeout,
    ...options,
    headers: {
      ...this.config.headers,
      ...options.headers,
    },
  })
}

const _prepare = Quester.prototype.prepare
Quester.prototype.prepare = function prepare(this: Quester) {
  const options = _prepare.call(this)
  options.httpAgent = getAgent(this.config.proxyAgent)
  options.httpsAgent = getAgent(this.config.proxyAgent)
  return options
}

defineProperty(Quester, 'Config', Schema.object({
  ...Quester.Config.dict,
  proxyAgent: Schema.string().description('使用的代理服务器地址。'),
}).description('请求设置'))

type CreateAgent = (opts: string) => Agent

const agents: Dict<Agent> = Object.create(null)
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
  if (!url) return
  if (agents[url]) return agents[url]
  const { protocol } = new URL(url)
  const callback = proxies[protocol.slice(0, -1)]
  return agents[url] ||= callback(url)
}
