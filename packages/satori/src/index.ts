import { Quester } from '@satorijs/core'
import { base64ToArrayBuffer } from 'cosmokit'
import { ClientRequestArgs } from 'http'
import { WebSocket } from 'ws'
import { basename } from 'path'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import FileType from 'file-type'
import createHttpProxyAgent from 'http-proxy-agent'
import createHttpsProxyAgent from 'https-proxy-agent'
import createSocksProxyAgent from 'socks-proxy-agent'

export * from '@satorijs/core'
export * from 'cosmokit'

const oldFile = Quester.prototype.file
Quester.prototype.file = async function file(this: Quester, url: string) {
  // for backward compatibility
  if (url.startsWith('base64://')) {
    const data = base64ToArrayBuffer(url.slice(9))
    const result = await FileType.fromBuffer(data)
    const filename = 'file' + (result ? '.' + result.ext : '')
    return { mime: result?.mime, filename, data }
  }
  if (url.startsWith('file://')) {
    const data = await fs.readFile(fileURLToPath(url))
    const result = await FileType.fromBuffer(data)
    return { mime: result?.mime, filename: basename(url), data }
  }
  return oldFile.call(this, url)
}

Quester.prototype.ws = function ws(this: Quester, url: string, options: ClientRequestArgs = {}) {
  return new WebSocket(this.resolve(url), {
    agent: this.agent(this.config.proxyAgent),
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
  options.httpAgent = this.agent(this.config.proxyAgent)
  options.httpsAgent = this.agent(this.config.proxyAgent)
  return options
}

Quester.defineAgent(['http'], createHttpProxyAgent)
Quester.defineAgent(['https'], createHttpsProxyAgent)
Quester.defineAgent(['socks', 'socks4', 'socks4a', 'socks5', 'socks5h'], createSocksProxyAgent)
