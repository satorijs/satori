import { defineProperty, isNullable } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import { Channel, EventData, h } from '@satorijs/protocol'

declare module '@satorijs/protocol' {
  interface SendOptions {
    session?: Session
  }
}

export class Session {
  static counter = 0

  public id: number
  public bot: Bot
  public app: Context['root']
  public data: Omit<EventData, 'id'>

  constructor(bot: Bot, payload: Partial<EventData>) {
    payload.selfId ??= bot.selfId
    payload.platform ??= bot.platform
    payload.timestamp ??= Date.now()
    this.data = payload as EventData
    this.id = ++Session.counter
    Object.assign(this, payload)
    for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(payload))) {
      if (descriptor.enumerable) continue
      Object.defineProperty(this, key, descriptor)
    }
    // this.selfId = bot.selfId
    // this.platform = bot.platform
    this.data.locales = []
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'app', bot.ctx.root)
    this.initialize()
  }

  initialize() {}

  get isDirect() {
    return this.data.channel.type === Channel.Type.DIRECT
  }

  get author() {
    return { user: this.data.user, ...this.data.user, ...this.data.member }
  }

  get type() {
    return this.data.type
  }

  set type(value) {
    this.data.type = value
  }

  get userId() {
    return this.data.user?.id
  }

  get channelId() {
    return this.data.channel?.id
  }

  get guildId() {
    return this.data.guild?.id
  }

  get messageId() {
    return this.data.message?.id
  }

  get quote() {
    return this.data.message?.quote
  }

  get uid() {
    return `${this.data.platform}:${this.userId}`
  }

  get gid() {
    return `${this.data.platform}:${this.guildId}`
  }

  get cid() {
    return `${this.data.platform}:${this.channelId}`
  }

  get fid() {
    return `${this.data.platform}:${this.channelId}:${this.userId}`
  }

  get sid() {
    return `${this.data.platform}:${this.data.selfId}`
  }

  get elements() {
    return this.data.message?.elements
  }

  set elements(value) {
    this.data.message ??= {}
    this.data.message.elements = value
  }

  get content(): string | undefined {
    return this.data.message?.elements?.join('')
  }

  set content(value: string | undefined) {
    (this.data.message ??= {}).elements = isNullable(value) ? value : h.parse(value)
  }

  async transform(elements: h[]): Promise<h[]> {
    return await h.transformAsync(elements, ({ type, attrs, children }, session) => {
      const render = type === 'component' ? attrs.is : this.app['component:' + type]
      return render?.(attrs, children, session) ?? true
    }, this)
  }

  toJSON(): EventData {
    return { ...this.data, id: this.id }
  }
}
