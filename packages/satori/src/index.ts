import { Context, Logger, Quester, Schema } from '@satorijs/core'
import { defineProperty, trimSlash } from 'cosmokit'
import { listen } from './listen'

export * from '@satorijs/core'
export * from 'cosmokit'
export * from './axios'
export * from './router'

declare module '@satorijs/core' {
  namespace Context {
    interface Config extends Config.Network {}

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

defineProperty(Context.Config, 'Network', Schema.object({
  host: Schema.string().default('127.0.0.1').description('要监听的 IP 地址。如果将此设置为 `0.0.0.0` 将监听所有地址，包括局域网和公网地址。'),
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
  if (this.root.config.selfUrl) {
    this.root.config.selfUrl = trimSlash(this.root.config.selfUrl)
  }

  if (this.root.config.port) {
    const { host } = this.root.config
    this.router.host = host
    this.router.port = await listen(this.root.config)
    this.router._http.listen(this.router.port, host)
    logger.info('server listening at %c', this.router.selfUrl)
    this.on('dispose', () => {
      logger.info('http server closing')
      this.router._ws?.close()
      this.router._http?.close()
    })
  }

  this.decline(['selfUrl', 'host', 'port', 'maxPort'])

  return start.call(this, ...args)
}
