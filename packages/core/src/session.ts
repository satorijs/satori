import { defineProperty } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import { Author, Message } from './protocol'

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
    timestamp?: number
    author?: Author
    quote?: Message
    channelName?: string
    guildName?: string
    operatorId?: string
    targetId?: string
    duration?: number
  }
}

export class Session<C extends Context = Context> {
  id: string
  bot: Bot<C>

  constructor(bot: Bot<C>, payload?: Partial<Session.Payload>) {
    Object.assign(this, payload)
    this.selfId = bot.selfId
    this.platform = bot.platform
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'id', bot.ctx.bots.counter)
  }

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

  toJSON(): Session.Payload {
    return Object.fromEntries(Object.entries(this).filter(([key]) => {
      return !key.startsWith('_') && !key.startsWith('$')
    })) as any
  }
}
