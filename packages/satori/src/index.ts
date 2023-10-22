import { Context, Quester, Schema } from '@satorijs/core'
import { defineProperty } from 'cosmokit'

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
