import { defineProperty, isNullable } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import { Universal } from './universal'
import Element from '@satorijs/element'

export interface SendOptions {
  session?: Session
  linkPreview?: boolean
}

export interface Session extends Session.Payload, Satori.Session {}

export namespace Session {
  export interface Payload {
    isDirect?: boolean
    platform?: string
    selfId?: string
    type?: string
    /** @deprecated */
    subtype?: string
    /** @deprecated */
    subsubtype?: string
    messageId?: string
    channelId?: string
    guildId?: string
    userId?: string
    content?: string
    elements?: Element[]
    timestamp?: number
    author?: Universal.Author
    quote?: Universal.Message
    channelName?: string
    guildName?: string
    operatorId?: string
    targetId?: string
    duration?: number
    roleId?: string
    data?: Universal.EventData
    locales?: string[]
  }
}

export class Session {
  public id: string
  public bot: Bot
  public app: Context['root']

  constructor(bot: Bot, payload: Partial<Session.Payload> = {}) {
    this.data = {}
    for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(payload))) {
      Object.defineProperty(this, key, descriptor)
    }
    this.selfId = bot.selfId
    this.platform = bot.platform
    this.locales = []
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'app', bot.ctx.root)
    defineProperty(this, 'id', ++bot.ctx.internal.counter)
    this.initialize()
  }

  initialize() {}

  get uid() {
    return `${this.platform}:${this.userId}`
  }

  get gid() {
    return `${this.platform}:${this.guildId}`
  }

  get cid() {
    return `${this.platform}:${this.channelId}`
  }

  get fid() {
    return `${this.platform}:${this.channelId}:${this.userId}`
  }

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  get content() {
    return this.elements?.join('')
  }

  set content(value: string) {
    this.elements = isNullable(value) ? value : Element.parse(value)
  }

  async transform(elements: Element[]): Promise<Element[]> {
    return await Element.transformAsync(elements, ({ type, attrs, children }, session) => {
      const render = type === 'component' ? attrs.is : this.app['component:' + type]
      return render?.(attrs, children, session) ?? true
    }, this)
  }

  toJSON(): Session.Payload {
    return Object.fromEntries(Object.entries(this).filter(([key]) => {
      return !key.startsWith('_') && !key.startsWith('$')
    })) as any
  }
}
