import * as cordis from 'cordis'
import { Awaitable, defineProperty, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Session } from './session'
import Schema from 'schemastery'
import Logger from 'reggol'
import Quester from 'cordis-axios'
import Element from '@satorijs/element'
import { SendOptions } from '@satorijs/protocol'
import { Internal } from './internal'

Element.warn = new Logger('element').warn

// do not remove the `type` modifier
// because `esModuleInterop` is not respected by esbuild
export type { Fragment, Render } from '@satorijs/element'
export { h, Element, h as segment } from '@satorijs/protocol'

export { Schema, Schema as z, Logger, Quester }
export * as Universal from '@satorijs/protocol'

export * from './bot'
export * from './adapter'
export * from './internal'
export * from './message'
export * from './session'

declare global {
  namespace Satori {
    type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
    type Actions = 'added' | 'deleted' | 'updated'

    interface Session {}

    interface Events extends Record<`${Genres}-${Actions}`, {}> {
      'message': {}
      'message-deleted': {}
      'message-updated': {}
      'message-pinned': {}
      'message-unpinned': {}
      'interaction/command': {}
      'reaction-added': {}
      'reaction-deleted': {}
      'reaction-deleted/one': {}
      'reaction-deleted/all': {}
      'reaction-deleted/emoji': {}
      'send': {}
      'friend-request': {}
      'guild-request': {}
      'guild-member-request': {}
      'guild-member/role': {}
      'guild-member/ban': {}
      'guild-member/nickname': {}
      'notice/poke': {}
      'notice/lucky-king': {}
      'notice/honor': {}
      'notice/honor/talkative': {}
      'notice/honor/performer': {}
      'notice/honor/emotion': {}
    }
  }
}

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

export interface Events<C extends Context = Context> extends cordis.Events<C>, Record<keyof Satori.Events, EventCallback> {
  'internal/session'(session: Session): void
  'before-send': EventCallback<Awaitable<void | boolean>, [SendOptions]>
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
