import * as cordis from 'cordis'
import { Awaitable, defineProperty, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Session } from './session'
import { z } from 'cordis'
import { HTTP } from 'undios'
import * as file from 'undios-file'
import { Event, SendOptions } from '@satorijs/protocol'
import h from '@satorijs/element'

h.warn = new cordis.Logger('element').warn

// do not remove the `type` modifier
// because `esModuleInterop` is not respected by esbuild
export type { Fragment, Render } from '@satorijs/element'

export { h, h as Element, h as segment, HTTP, HTTP as Quester }

export * from 'cordis'
export * as file from 'undios-file'

export * as Universal from '@satorijs/protocol'

export * from './bot'
export * from './adapter'
export * from './message'
export * from './session'

declare module 'undios' {
  namespace HTTP {
    export const Config: z<Config>
    export function createConfig(this: typeof HTTP, endpoint?: string | boolean): z<Config>
  }
}

defineProperty(HTTP, 'Config', z.object({
  timeout: z.natural().role('ms').description('等待连接建立的最长时间。'),
  proxyAgent: z.string().description('使用的代理服务器地址。'),
  keepAlive: z.boolean().description('是否保持连接。'),
}).description('请求设置'))

HTTP.createConfig = function createConfig(this, endpoint) {
  return z.object({
    endpoint: z.string().role('link').description('要连接的服务器地址。')
      .default(typeof endpoint === 'string' ? endpoint : null)
      .required(typeof endpoint === 'boolean' ? endpoint : false),
    headers: z.dict(String).role('table').description('要附加的额外请求头。'),
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
  'bot-added'(client: Bot<C>): void
  /** @deprecated use `login-removed` instead */
  'bot-removed'(client: Bot<C>): void
  /** @deprecated use `login-updated` instead */
  'bot-status-updated'(client: Bot<C>): void
  'bot-connect'(client: Bot<C>): Awaitable<void>
  'bot-disconnect'(client: Bot<C>): Awaitable<void>
}

export interface Events<C extends Context = Context> extends cordis.Events<C> {}

export interface Context {
  [Context.events]: Events<this>
  [Context.session]: Session<this>
}

export class Context extends cordis.Context {
  static readonly session = Symbol('session')
  // remove generic type to loosen the constraint
  static readonly Session = Session as new (bot: Bot, event: Partial<Event>) => Session

  public bots = new Proxy([], {
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
  }) as Bot<this>[] & Dict<Bot<this>>

  constructor(config: Context.Config = {}) {
    super(config)
    this.provide('http', undefined, true)
    this.plugin(HTTP, config.request)
    this.plugin(file)
  }

  component(name: string, component: Component<this[typeof Context.session]>, options: Component.Options = {}) {
    const render: Component = async (attrs, children, session) => {
      if (options.session && session.type === 'send') {
        throw new Error('interactive components is not available outside sessions')
      }
      const result = await component(attrs, children, session)
      return session.transform(h.normalize(result))
    }
    return this.set('component:' + name, render)
  }
}

export namespace Context {
  export interface Config {
    request?: HTTP.Config
  }

  export const Config: Config.Static = z.intersect([
    z.object({}),
  ])

  namespace Config {
    export interface Static extends z<Config> {}
  }

  export type Associate<P extends string, C extends Context = Context> = cordis.Context.Associate<P, C>
}

export abstract class Service<T = any, C extends Context = Context> extends cordis.Service<T, C> {
  [cordis.Service.setup]() {
    this.ctx = new Context() as C
  }
}
