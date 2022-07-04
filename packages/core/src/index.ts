import * as cordis from 'cordis'
import { Awaitable, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Session } from './session'

export * from './bot'
export * from './adapter'
export * from './protocol'
export * from './session'

type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
type Actions = 'added' | 'deleted' | 'updated'
type SessionEventCallback = (this: Session, session: Session) => void

export interface Events<C extends Context = Context> extends cordis.Events<C>, Record<`${Genres}-${Actions}`, SessionEventCallback> {
  // session events
  'message': SessionEventCallback
  'message-deleted': SessionEventCallback
  'message-updated': SessionEventCallback
  'reaction-added': SessionEventCallback
  'reaction-deleted': SessionEventCallback
  'reaction-deleted/one': SessionEventCallback
  'reaction-deleted/all': SessionEventCallback
  'reaction-deleted/emoji': SessionEventCallback
  'send': SessionEventCallback
  'friend-request': SessionEventCallback
  'guild-request': SessionEventCallback
  'guild-member-request': SessionEventCallback
  'guild-member/role': SessionEventCallback
  'guild-member/ban': SessionEventCallback
  'guild-member/nickname': SessionEventCallback
  'notice/poke': SessionEventCallback
  'notice/lucky-king': SessionEventCallback
  'notice/honor': SessionEventCallback
  'notice/honor/talkative': SessionEventCallback
  'notice/honor/performer': SessionEventCallback
  'notice/honor/emotion': SessionEventCallback

  // lifecycle events
  'before-send': (this: Session, session: Session) => boolean
  'bot-added'(client: Bot): void
  'bot-removed'(client: Bot): void
  'bot-status-updated'(client: Bot): void
  'bot-connect'(client: Bot): Awaitable<void>
  'bot-disconnect'(client: Bot): Awaitable<void>
}

export interface Context {
  bots: Bot[] & Dict<Bot> & { counter: number }
}

export class Context extends cordis.Context<Context.Config> {
  [cordis.Events]: Events<this>
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
