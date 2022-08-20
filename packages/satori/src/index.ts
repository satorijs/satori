import { Context } from '@satorijs/core'
import { defineProperty, trimSlash } from 'cosmokit'
import { getPortPromise } from 'portfinder'
import Schema from 'schemastery'
import Logger from 'reggol'
import { Quester } from './quester'

export { Schema, Logger }

export * from '@satorijs/core'
export * from 'cosmokit'
export * from './adapter'
export * from './quester'
export * from './router'

declare module '@satorijs/core' {
  namespace Context {
    interface Config extends Config.Network {}

    const Config: Config.Static
  
    namespace Config {
      interface Network {
        host?: string
        port?: number
        maxPort?: number
        selfUrl?: string
      }

      interface Static extends Schema<Config> {
        Network: Schema<Network>
      }
    }
  }
}

defineProperty(Context, 'Config', Schema.intersect([]))

defineProperty(Context.Config, 'Network', Schema.object({
  host: Schema.string().default('localhost').description('要监听的 IP 地址。如果将此设置为 `0.0.0.0` 将监听所有地址，包括局域网和公网地址。'),
  port: Schema.natural().max(65535).description('要监听的初始端口号。'),
  maxPort: Schema.natural().max(65535).description('允许监听的最大端口号。'),
  selfUrl: Schema.string().role('link').description('应用暴露在公网的地址。'),
}).description('网络设置'))

Context.Config.list.unshift(Context.Config.Network)
Context.Config.list.push(Schema.object({
  request: Quester.Config,
}))

const logger = new Logger('app')

const start = Context.prototype.start
Context.prototype.start = async function (this: Context, ...args) {
  if (this.options.selfUrl) {
    this.options.selfUrl = trimSlash(this.options.selfUrl)
  }

  if (this.options.port) {
    this.options.port = await getPortPromise({
      port: this.options.port,
      stopPort: this.options.maxPort || this.options.port,
    })

    const { host, port } = this.options
    await new Promise<void>((resolve) => {
      this.router._http.listen(port, host, resolve)
    })

    logger.info('server listening at %c', `http://${host}:${port}`)
    this.on('dispose', () => {
      logger.info('http server closing')
      this.router._ws?.close()
      this.router._http?.close()
    })
  }

  return start.call(this, ...args)
}
