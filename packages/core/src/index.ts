import * as cordis from 'cordis'
import { Awaitable, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Session } from './session'
import segment from '@satorijs/message'

export { segment }

export * from './bot'
export * from './adapter'
export * from './protocol'
export * from './session'

type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
type Actions = 'added' | 'deleted' | 'updated'
type SessionEventCallback<C extends Context = Context, T = void> = (this: C[typeof Context.session], session: C[typeof Context.session]) => T

export interface Events<C extends Context = Context> extends cordis.Events<C>, Record<`${Genres}-${Actions}`, SessionEventCallback<C>> {
  // session events
  'message': SessionEventCallback<C>
  'message-deleted': SessionEventCallback<C>
  'message-updated': SessionEventCallback<C>
  'reaction-added': SessionEventCallback<C>
  'reaction-deleted': SessionEventCallback<C>
  'reaction-deleted/one': SessionEventCallback<C>
  'reaction-deleted/all': SessionEventCallback<C>
  'reaction-deleted/emoji': SessionEventCallback<C>
  'send': SessionEventCallback<C>
  'friend-request': SessionEventCallback<C>
  'guild-request': SessionEventCallback<C>
  'guild-member-request': SessionEventCallback<C>
  'guild-member/role': SessionEventCallback<C>
  'guild-member/ban': SessionEventCallback<C>
  'guild-member/nickname': SessionEventCallback<C>
  'notice/poke': SessionEventCallback<C>
  'notice/lucky-king': SessionEventCallback<C>
  'notice/honor': SessionEventCallback<C>
  'notice/honor/talkative': SessionEventCallback<C>
  'notice/honor/performer': SessionEventCallback<C>
  'notice/honor/emotion': SessionEventCallback<C>

  // lifecycle events
  'before-send': SessionEventCallback<C, boolean>
  'bot-added'(client: Bot<C>): void
  'bot-removed'(client: Bot<C>): void
  'bot-status-updated'(client: Bot<C>): void
  'bot-connect'(client: Bot<C>): Awaitable<void>
  'bot-disconnect'(client: Bot<C>): Awaitable<void>
}

export interface Context {
  [Context.events]: Events<this>
  [Context.session]: Session<Context>
  bots: Bot<this>[] & Dict<Bot<this>> & { counter: number }
}

export class Context<T extends Context.Config = Context.Config> extends cordis.Context<T> {
  static readonly session = Symbol('session')
}

export namespace Context {
  export interface Config extends cordis.Context.Config {}
}

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
