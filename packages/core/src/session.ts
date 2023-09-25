import { defineProperty, isNullable } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import { Channel, EventData, h, Message } from '@satorijs/protocol'

declare module '@satorijs/protocol' {
  interface SendOptions {
    session?: Session
  }
}

export interface Session {
  type: string
  subtype: string
  subsubtype: string
  timestamp: number
  userId: string
  channelId: string
  guildId: string
  messageId: string
  roleId: string
  quote: Message
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

  set isDirect(value) {
    (this.data.channel ??= {} as Channel).type = value ? Channel.Type.DIRECT : Channel.Type.TEXT
  }

  get author() {
    return { user: this.data.user, ...this.data.user, ...this.data.member }
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

  static accessor(name: string, keys: string[]) {
    Object.defineProperty(Session.prototype, name, {
      get() {
        return keys.reduce((data, key) => data?.[key], this.data)
      },
      set(value) {
        const last = keys.pop()
        const data = keys.reduce((data, key) => data[key] ??= {}, this.data)
        data[last] = value
      },
    })
  }
}

Session.accessor('type', ['type'])
Session.accessor('subtype', ['subtype'])
Session.accessor('subsubtype', ['subsubtype'])
Session.accessor('timestamp', ['timestamp'])
Session.accessor('userId', ['user', 'id'])
Session.accessor('channelId', ['channel', 'id'])
Session.accessor('guildId', ['guild', 'id'])
Session.accessor('messageId', ['message', 'id'])
Session.accessor('roleId', ['role', 'id'])
Session.accessor('quote', ['message', 'quote'])
