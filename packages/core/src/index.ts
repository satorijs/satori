import * as cordis from 'cordis'
import { Awaitable, defineProperty, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Session } from './session'
import Schema from 'schemastery'
import Logger from 'reggol'
import Quester from 'cordis-axios'
import { Event, SendOptions } from '@satorijs/protocol'
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

export type Component<S extends Session = Session> = h.Render<Awaitable<h.Fragment>, S>

export namespace Component {
  export interface Options {
    session?: boolean
  }
}

export type GetSession<C extends Context> = C[typeof Context.session]

export interface Events<C extends Context = Context> extends cordis.Events<C> {
  'internal/session'(session: GetSession<C>): void
  'interaction/command'(session: GetSession<C>): void
  'interaction/button'(session: GetSession<C>): void
  'message'(session: GetSession<C>): void
  'message-created'(session: GetSession<C>): void
  'message-deleted'(session: GetSession<C>): void
  'message-updated'(session: GetSession<C>): void
  'message-pinned'(session: GetSession<C>): void
  'message-unpinned'(session: GetSession<C>): void
  'guild-added'(session: GetSession<C>): void
  'guild-removed'(session: GetSession<C>): void
  'guild-updated'(session: GetSession<C>): void
  'guild-member-added'(session: GetSession<C>): void
  'guild-member-removed'(session: GetSession<C>): void
  'guild-member-updated'(session: GetSession<C>): void
  'guild-role-created'(session: GetSession<C>): void
  'guild-role-deleted'(session: GetSession<C>): void
  'guild-role-updated'(session: GetSession<C>): void
  'reaction-added'(session: GetSession<C>): void
  'reaction-removed'(session: GetSession<C>): void
  'login-added'(session: GetSession<C>): void
  'login-removed'(session: GetSession<C>): void
  'login-updated'(session: GetSession<C>): void
  'friend-request'(session: GetSession<C>): void
  'guild-request'(session: GetSession<C>): void
  'guild-member-request'(session: GetSession<C>): void
  'before-send'(session: GetSession<C>, options: SendOptions): Awaitable<void | boolean>
  'send'(session: GetSession<C>): void
  /** @deprecated use `login-added` instead */
  'bot-added'(client: Bot): void
  /** @deprecated use `login-removed` instead */
  'bot-removed'(client: Bot): void
  /** @deprecated use `login-updated` instead */
  'bot-status-updated'(client: Bot): void
  'bot-connect'(client: Bot): Awaitable<void>
  'bot-disconnect'(client: Bot): Awaitable<void>
}

export interface Context {
  [Context.config]: Context.Config
  [Context.events]: Events<this>
  [Context.session]: Session<this>
  http: Quester
}

export class Context extends cordis.Context {
  static readonly session = Symbol('session')
  // remove generic type to loosen the constraint
  static readonly Session = Session as new (bot: Bot, event: Partial<Event>) => Session

  public bots = new Proxy([] as Bot[] & Dict<Bot>, {
    get(target, prop) {
      if (prop in target || typeof prop === 'symbol') {
        return Reflect.get(target, prop)
      }
      return target.find(bot => bot.sid === prop)
    },
    deleteProperty(target, prop) {
      if (prop in target || typeof prop === 'symbol') {
        return Reflect.deleteProperty(target, prop)
      }
      const bot = target.findIndex(bot => bot.sid === prop)
      if (bot < 0) return true
      target.splice(bot, 1)
      return true
    },
  })

  constructor(config: Context.Config = {}) {
    super(config)

    this.http = new Quester(config.request)

    this.on('internal/warning', (format, ...args) => {
      this.logger('app').warn(format, ...args)
    })
  }

  logger(name: string) {
    return new Logger(name)
  }

  component(name: string, component: Component<this[typeof Context.session]>, options: Component.Options = {}) {
    const render: Component = async (attrs, children, session) => {
      if (options.session && session.type === 'send') {
        throw new Error('interactive components is not available outside sessions')
      }
      const result = await component(attrs, children, session)
      return session.transform(h.normalize(result))
    }
    const service = 'component:' + name
    this.root.provide(service)
    this[service] = render
    return this.collect('component', () => {
      this[service] = null
      return true
    })
  }
}

export namespace Context {
  export interface Config extends cordis.Context.Config {
    request?: Quester.Config
  }

  export const Config: Config.Static = Schema.intersect([
    Schema.object({}),
  ])

  namespace Config {
    export interface Static extends Schema<Config> {}
  }
}
