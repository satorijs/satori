import * as cordis from 'cordis'
import { Awaitable, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Selector } from './selector'
import { Session } from './session'
import Schema from 'schemastery'
import Logger from 'reggol'
import Quester from 'cordis-axios'
import segment from '@satorijs/element'

export { Schema, Logger, segment, segment as h, Quester }

export * from './bot'
export * from './adapter'
export * from './modulator'
export * from './universal'
export * from './selector'
export * from './session'

type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
type Actions = 'added' | 'deleted' | 'updated'

export interface Events<C extends Context = Context> extends cordis.Events<C>, Record<`${Genres}-${Actions}`, Session.EventCallback> {
  // session events
  'message': Session.EventCallback
  'message-deleted': Session.EventCallback
  'message-updated': Session.EventCallback
  'reaction-added': Session.EventCallback
  'reaction-deleted': Session.EventCallback
  'reaction-deleted/one': Session.EventCallback
  'reaction-deleted/all': Session.EventCallback
  'reaction-deleted/emoji': Session.EventCallback
  'send': Session.EventCallback
  'friend-request': Session.EventCallback
  'guild-request': Session.EventCallback
  'guild-member-request': Session.EventCallback
  'guild-member/role': Session.EventCallback
  'guild-member/ban': Session.EventCallback
  'guild-member/nickname': Session.EventCallback
  'notice/poke': Session.EventCallback
  'notice/lucky-king': Session.EventCallback
  'notice/honor': Session.EventCallback
  'notice/honor/talkative': Session.EventCallback
  'notice/honor/performer': Session.EventCallback
  'notice/honor/emotion': Session.EventCallback

  // lifecycle events
  'before-send': Session.EventCallback<Awaitable<void | boolean>>
  'bot-added'(client: Bot): void
  'bot-removed'(client: Bot): void
  'bot-status-updated'(client: Bot): void
  'bot-connect'(client: Bot): Awaitable<void>
  'bot-disconnect'(client: Bot): Awaitable<void>
}

export interface Context {
  [Context.config]: Context.Config
  [Context.events]: Events<this>
  bots: Bot[] & Dict<Bot> & { counter: number }
}

export type Fragment = segment.Fragment
export type Render = segment.Render<Awaitable<Fragment>, Session>

export class Context extends cordis.Context {
  static readonly session = Symbol('session')
  _components: Dict<Render> = Object.create(null)

  constructor(options?: Context.Config) {
    super(options)

    this.on('before-send', async (session) => {
      session.elements = await segment.transformAsync(session.elements, this._components, session)
    })
  }

  component(name: string, render: Render) {
    this._components[name] = render
    this.collect('component', () => {
      const shouldDelete = this._components[name] === render
      if (shouldDelete) delete this._components[name]
      return shouldDelete
    })
  }
}

export namespace Context {
  export interface Config extends cordis.Context.Config {}

  export const Config: Config.Static = Schema.intersect([])

  namespace Config {
    export interface Static extends Schema<Config> {}
  }
}

Session.prototype[Context.filter] = function (ctx: Context) {
  return ctx.filter(this)
}

Context.service('__selector__', Selector)

Context.service('bots', class {
  constructor(root: Context) {
    const list: Bot[] = []
    let counter = 0
    return new Proxy(list, {
      get(target, prop) {
        if (prop in target || typeof prop === 'symbol') {
          return target[prop]
        }
        if (prop === 'counter') return counter++
        return list.find(bot => bot.sid === prop)
      },
      deleteProperty(target, prop) {
        if (prop in target || typeof prop === 'symbol') {
          return delete target[prop]
        }
        const bot = target.findIndex(bot => bot.sid === prop)
        if (bot < 0) return false
        target.splice(bot, 1)
        return true
      },
    })
  }
})
