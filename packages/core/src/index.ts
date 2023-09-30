import * as cordis from 'cordis'
import { Awaitable, defineProperty, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Session } from './session'
import Schema from 'schemastery'
import Logger from 'reggol'
import Quester from 'cordis-axios'
import { SendOptions } from '@satorijs/protocol'
import { Internal } from './internal'
import h from '@satorijs/element'

h.warn = new Logger('element').warn

// do not remove the `type` modifier
// because `esModuleInterop` is not respected by esbuild
export type { Fragment, Render } from '@satorijs/element'

export { h, h as Element, h as segment }
export { Schema, Schema as z, Logger, Quester }

export * as Satori from '@satorijs/protocol'
export * as Universal from '@satorijs/protocol'

export * from './bot'
export * from './adapter'
export * from './internal'
export * from './message'
export * from './session'

declare module 'cordis-axios' {
  namespace Quester {
    export const Config: Schema<Config>
    export function createConfig(this: typeof Quester, endpoint?: string | boolean): Schema<Config>
  }
}

defineProperty(Quester, 'Config', Schema.object({
  timeout: Schema.natural().role('ms').description('等待连接建立的最长时间。'),
}).description('请求设置'))

Quester.createConfig = function createConfig(this, endpoint) {
  return Schema.object({
    endpoint: Schema.string().role('link').description('要连接的服务器地址。')
      .default(typeof endpoint === 'string' ? endpoint : null)
      .required(typeof endpoint === 'boolean' ? endpoint : false),
    headers: Schema.dict(String).role('table').description('要附加的额外请求头。'),
    ...this.Config.dict,
  }).description('请求设置')
}

type EventCallback<T = void, R extends any[] = []> = (this: Session, session: Session, ...args: R) => T

export interface Events<C extends Context = Context> extends cordis.Events<C> {
  'internal/session'(session: Session): void
  'interaction/command'(session: Session): void
  'message'(session: Session): void
  'message-created'(session: Session): void
  'message-deleted'(session: Session): void
  'message-updated'(session: Session): void
  'message-pinned'(session: Session): void
  'message-unpinned'(session: Session): void
  'guild-added'(session: Session): void
  'guild-removed'(session: Session): void
  'guild-updated'(session: Session): void
  'guild-member-added'(session: Session): void
  'guild-member-removed'(session: Session): void
  'guild-member-updated'(session: Session): void
  'guild-role-created'(session: Session): void
  'guild-role-deleted'(session: Session): void
  'guild-role-updated'(session: Session): void
  'reaction-added'(session: Session): void
  'reaction-removed'(session: Session): void
  'login-updated'(session: Session): void
  'friend-request'(session: Session): void
  'guild-request'(session: Session): void
  'guild-member-request'(session: Session): void
  'before-send': EventCallback<Awaitable<void | boolean>, [SendOptions]>
  'send'(session: Session): void
  'bot-added'(client: Bot): void
  'bot-removed'(client: Bot): void
  'bot-status-updated'(client: Bot): void
  'bot-connect'(client: Bot): Awaitable<void>
  'bot-disconnect'(client: Bot): Awaitable<void>
}

export interface Context {
  [Context.config]: Context.Config
  [Context.events]: Events<this>
  bots: Bot[] & Dict<Bot>
}

export class Context extends cordis.Context {
  static readonly session = Symbol('session')

  constructor(options?: Context.Config) {
    super(options)

    this.on('internal/warning', (format, ...args) => {
      this.logger('app').warn(format, ...args)
    })
  }

  logger(name: string) {
    return new Logger(name)
  }
}

export namespace Context {
  export interface Config extends cordis.Context.Config {}

  export const Config: Config.Static = Schema.intersect([
    Schema.object({}),
  ])

  namespace Config {
    export interface Static extends Schema<Config> {}
  }
}

Context.service('internal', Internal)

Context.service('bots', class {
  constructor(root: Context) {
    const list: Bot[] = []
    return new Proxy(list, {
      get(target, prop) {
        if (prop in target || typeof prop === 'symbol') {
          return target[prop]
        }
        return list.find(bot => bot.sid === prop)
      },
      deleteProperty(target, prop) {
        if (prop in target || typeof prop === 'symbol') {
          return delete target[prop]
        }
        const bot = target.findIndex(bot => bot.sid === prop)
        if (bot < 0) return true
        target.splice(bot, 1)
        return true
      },
    })
  }
})
