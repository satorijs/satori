import * as cordis from 'cordis'
import { Awaitable, Dict } from 'cosmokit'
import { Bot } from './bot'
import { Selector } from './selector'
import { SendOptions, Session } from './session'
import Schema from 'schemastery'
import Logger from 'reggol'
import Quester from 'cordis-axios'
import segment from '@satorijs/element'
import { Fragment, Render, escape, unescape } from '@satorijs/element'
import { Internal } from './internal'

segment.warn = new Logger('element').warn

export { Fragment, Render, escape, unescape }
export { Schema, Logger, segment, segment as Element, segment as h, Quester }

export * from './bot'
export * from './adapter'
export * from './internal'
export * from './message'
export * from './selector'
export * from './session'
export * from './universal'

declare global {
  namespace Satori {
    type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
    type Actions = 'added' | 'deleted' | 'updated'

    interface Session {}

    interface Events extends Record<`${Genres}-${Actions}`, {}> {
      'message': {}
      'message-deleted': {}
      'message-updated': {}
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

type EventCallback<T = void, R extends any[] = []> = (this: Session, session: Session, ...args: R) => T

export interface Events<C extends Context = Context> extends cordis.Events<C>, Record<keyof Satori.Events, EventCallback> {
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
  bots: Bot[] & Dict<Bot> & { counter: number }
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

Session.prototype[Context.filter] = function (ctx: Context) {
  return ctx.filter(this)
}

Context.service('selector', Selector)

Context.service('internal', Internal)

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
        if (bot < 0) return true
        target.splice(bot, 1)
        return true
      },
    })
  }
})
