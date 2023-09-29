import { defineProperty, isNullable } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import { Channel, Event, GuildMember, Message, User } from '@satorijs/protocol'
import h from '@satorijs/element'

declare module '@satorijs/protocol' {
  interface SendOptions {
    session?: Session
  }
}

// Accessors
export interface Session {
  type: string
  subtype: string
  subsubtype: string
  selfId: string
  platform: string
  timestamp: number
  userId: string
  channelId: string
  guildId: string
  messageId: string
  operatorId: string
  roleId: string
  quote: Message
}

export class Session {
  static counter = 0

  public id: number
  public bot: Bot
  public app: Context['root']
  public body: Omit<Event, 'id'>
  public locales: string[] = []

  constructor(bot: Bot, payload: Partial<Event>) {
    payload.selfId ??= bot.selfId
    payload.platform ??= bot.platform
    payload.timestamp ??= Date.now()
    this.body = payload as Event
    this.id = ++Session.counter
    Object.assign(this, payload)
    for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(payload))) {
      if (descriptor.enumerable) continue
      Object.defineProperty(this, key, descriptor)
    }
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'app', bot.ctx.root)
    this.initialize()
  }

  initialize() {}

  /** @deprecated */
  get data() {
    return this.body
  }

  get isDirect() {
    return this.body.channel.type === Channel.Type.DIRECT
  }

  set isDirect(value) {
    (this.body.channel ??= {} as Channel).type = value ? Channel.Type.DIRECT : Channel.Type.TEXT
  }

  get author(): GuildMember & User {
    return {
      ...this.body.user,
      ...this.body.member,
      userId: this.body.user?.id,
      username: this.body.user?.name,
      nickname: this.body.member?.name,
    }
  }

  get uid() {
    return `${this.body.platform}:${this.userId}`
  }

  get gid() {
    return `${this.body.platform}:${this.guildId}`
  }

  get cid() {
    return `${this.body.platform}:${this.channelId}`
  }

  get fid() {
    return `${this.body.platform}:${this.channelId}:${this.userId}`
  }

  get sid() {
    return `${this.body.platform}:${this.body.selfId}`
  }

  get elements() {
    return this.body.message?.elements
  }

  set elements(value) {
    this.body.message ??= {}
    this.body.message.elements = value
  }

  get content(): string | undefined {
    return this.body.message?.elements?.join('')
  }

  set content(value: string | undefined) {
    (this.body.message ??= {}).elements = isNullable(value) ? value : h.parse(value)
  }

  async transform(elements: h[]): Promise<h[]> {
    return await h.transformAsync(elements, ({ type, attrs, children }, session) => {
      const render = type === 'component' ? attrs.is : this.app['component:' + type]
      return render?.(attrs, children, session) ?? true
    }, this)
  }

  toJSON(): Event {
    return { ...this.body, id: this.id }
  }

  static accessor(name: string, keys: string[]) {
    Object.defineProperty(Session.prototype, name, {
      get() {
        return keys.reduce((data, key) => data?.[key], this.data)
      },
      set(value) {
        const _keys = keys.slice()
        const last = _keys.pop()
        const data = _keys.reduce((data, key) => data[key] ??= {}, this.data)
        data[last] = value
      },
    })
  }
}

Session.accessor('type', ['type'])
Session.accessor('subtype', ['subtype'])
Session.accessor('subsubtype', ['subsubtype'])
Session.accessor('selfId', ['selfId'])
Session.accessor('platform', ['platform'])
Session.accessor('timestamp', ['timestamp'])
Session.accessor('userId', ['user', 'id'])
Session.accessor('channelId', ['channel', 'id'])
Session.accessor('channelName', ['channel', 'name'])
Session.accessor('guildId', ['guild', 'id'])
Session.accessor('guildName', ['guild', 'name'])
Session.accessor('messageId', ['message', 'id'])
Session.accessor('operatorId', ['operator', 'id'])
Session.accessor('roleId', ['role', 'id'])
Session.accessor('quote', ['message', 'quote'])
