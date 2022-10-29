import { defineProperty } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import { Universal } from './universal'
import segment from '@satorijs/element'

export interface SendOptions {
  session?: Session
}

export interface Session extends Session.Payload {}

export namespace Session {
  export interface Payload {
    platform: string
    selfId: string
    type?: string
    subtype?: string
    subsubtype?: string
    messageId?: string
    channelId?: string
    guildId?: string
    userId?: string
    content?: string
    elements?: segment[]
    timestamp?: number
    author?: Universal.Author
    quote?: Universal.Message
    channelName?: string
    guildName?: string
    operatorId?: string
    targetId?: string
    duration?: number
  }

  export type EventCallback<T = void> = (this: Session, session: Session) => T
}

export class Session {
  public id: string
  public bot: Bot
  public app: Context

  constructor(bot: Bot, payload?: Partial<Session.Payload>) {
    Object.assign(this, payload)
    this.selfId = bot.selfId
    this.platform = bot.platform
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'app', bot.ctx.root)
    defineProperty(this, 'id', bot.ctx.bots.counter)
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

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  get content() {
    return this.elements.join('')
  }

  set content(value: string) {
    this.elements = segment.parse(value)
  }

  toJSON(): Session.Payload {
    return Object.fromEntries(Object.entries(this).filter(([key]) => {
      return !key.startsWith('_') && !key.startsWith('$')
    })) as any
  }
}
