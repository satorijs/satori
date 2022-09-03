import * as cordis from 'cordis'
import { Awaitable, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Selector } from './selector'
import { Session } from './session'
import segment from '@satorijs/element'

export { segment, segment as h }

export * from './bot'
export * from './adapter'
export * from './protocol'
export * from './selector'
export * from './session'

type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
type Actions = 'added' | 'deleted' | 'updated'

export interface Events<C extends Context = Context> extends cordis.Events<C>, Record<`${Genres}-${Actions}`, Session.EventCallback<C>> {
  // session events
  'message': Session.EventCallback<C>
  'message-deleted': Session.EventCallback<C>
  'message-updated': Session.EventCallback<C>
  'reaction-added': Session.EventCallback<C>
  'reaction-deleted': Session.EventCallback<C>
  'reaction-deleted/one': Session.EventCallback<C>
  'reaction-deleted/all': Session.EventCallback<C>
  'reaction-deleted/emoji': Session.EventCallback<C>
  'send': Session.EventCallback<C>
  'friend-request': Session.EventCallback<C>
  'guild-request': Session.EventCallback<C>
  'guild-member-request': Session.EventCallback<C>
  'guild-member/role': Session.EventCallback<C>
  'guild-member/ban': Session.EventCallback<C>
  'guild-member/nickname': Session.EventCallback<C>
  'notice/poke': Session.EventCallback<C>
  'notice/lucky-king': Session.EventCallback<C>
  'notice/honor': Session.EventCallback<C>
  'notice/honor/talkative': Session.EventCallback<C>
  'notice/honor/performer': Session.EventCallback<C>
  'notice/honor/emotion': Session.EventCallback<C>

  // lifecycle events
  'before-send': Session.EventCallback<C, void | boolean>
  'bot-added'(client: Bot<C>): void
  'bot-removed'(client: Bot<C>): void
  'bot-status-updated'(client: Bot<C>): void
  'bot-connect'(client: Bot<C>): Awaitable<void>
  'bot-disconnect'(client: Bot<C>): Awaitable<void>
}

export interface Context {
  [Context.events]: Events<this>
  [Context.session]: Session<Context>
  options: Context.Config
  bots: Bot<this>[] & Dict<Bot<this>> & { counter: number }
}

export class Context extends cordis.Context {
  static readonly session = Symbol('session')

  constructor(options?: Context.Config) {
    super(options)
  }
}

export namespace Context {
  export interface Config extends cordis.Context.Config {}
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
