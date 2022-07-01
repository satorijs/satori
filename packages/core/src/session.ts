import { defineProperty } from 'cosmokit'
import { Bot } from './bot'
import { Author, Message } from './protocol'

export interface Session extends Session.Payload {}

export namespace Session {
  export interface Payload {
    platform?: string
    selfId: string
    type?: string
    subtype?: string
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

export class Session {
  type?: string
  subtype?: string
  subsubtype?: string

  id: string
  bot: Bot
  platform?: string
  selfId: string
  operatorId?: string
  targetId?: string
  duration?: number

  constructor(bot: Bot, session: Partial<Session.Payload>) {
    Object.assign(this, session)
    this.platform = bot.platform
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'user', null)
    defineProperty(this, 'channel', null)
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
