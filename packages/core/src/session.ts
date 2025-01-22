import { Channel, Event, GuildMember, Message, Resource, User } from '@satorijs/protocol'
import { clone, defineProperty, isNullable } from 'cosmokit'
import { Context, Service } from 'cordis'
import { Bot } from './bot'
import h from '@satorijs/element'

declare module '@satorijs/protocol' {
  interface SendOptions {
    session?: Session
  }
}

// Accessors
export interface Session {
  type: string
  /** @deprecated */
  subtype: string
  /** @deprecated */
  subsubtype: string
  selfId: string
  platform: string
  timestamp: number
  userId?: string
  channelId?: string
  guildId?: string
  messageId?: string
  operatorId?: string
  roleId?: string
  quote?: Message
  referrer: any
}

export class Session<C extends Context = Context> {
  public [Service.tracker] = {
    associate: 'session',
    property: 'ctx',
  }

  public id: number // for backward compatibility
  public sn: number
  public bot!: Bot<C>
  public app!: C['root']
  public event: Event
  public locales: string[] = []

  constructor(bot: Bot<C>, event: Partial<Event>) {
    event.selfId ??= bot.selfId
    event.platform ??= bot.platform
    event.timestamp ??= Date.now()
    this.event = event as Event
    this.sn = this.id = ++bot.ctx.satori._sessionSeq
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'app', bot.ctx.root)
    defineProperty(this, Context.current, bot.ctx)
    return Context.associate(this, 'session')
  }

  /** @deprecated */
  get data() {
    return this.event
  }

  get isDirect() {
    return this.event.channel?.type === Channel.Type.DIRECT
  }

  set isDirect(value) {
    (this.event.channel ??= {} as Channel).type = value ? Channel.Type.DIRECT : Channel.Type.TEXT
  }

  get author() {
    return {
      ...this.event.user,
      ...this.event.member,
      userId: this.event.user?.id,
      username: this.event.user?.name,
      nickname: this.event.member?.name,
    } as GuildMember & User
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

  get fid() {
    return `${this.platform}:${this.channelId}:${this.userId}`
  }

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  get elements() {
    return this.event.message?.elements
  }

  set elements(value) {
    this.event.message ??= {}
    this.event.message.elements = value
  }

  get content(): string | undefined {
    return this.event.message?.elements?.join('')
  }

  set content(value: string | undefined) {
    this.event.message ??= {}
    this.event.message.quote = undefined
    this.event.message.elements = isNullable(value) ? value : h.parse(value)
    if (this.event.message.elements?.[0]?.type === 'quote') {
      const el = this.event.message.elements.shift()!
      this.event.message.quote = Resource.decode(el)
    }
  }

  setInternal(type: string, data: any) {
    this.event._type = type
    this.event._data = data
    const internal = Object.create(this.bot.internal)
    defineProperty(this, type, Object.assign(internal, data))
  }

  async transform(elements: h[]): Promise<h[]> {
    return await h.transformAsync(elements, async ({ type, attrs, children }, session) => {
      const render = type === 'component' ? attrs.is : this.app.get('component:' + type)
      if (!render) return true
      children = await render(attrs, children, session)
      return this.transform(h.toElementArray(children))
    }, this)
  }

  toJSON() {
    const event: Event = {
      ...clone(this.event),
      sn: this.sn,
      login: this.bot.toJSON(),
      ['id' as never]: this.sn, // for backward compatibility
    }
    if (event.message?.elements) {
      event.message.content = this.content
      delete event.message.elements
      if (event.message.quote) {
        event.message.content = Resource.encode('quote', event.message.quote) + event.message.content!
      }
    }
    return event
  }
}

export function defineAccessor(prototype: {}, name: string, keys: string[]) {
  Object.defineProperty(prototype, name, {
    get() {
      return keys.reduce((data, key) => data?.[key], this)
    },
    set(value) {
      // Do not set undefined value
      // See https://github.com/satorijs/satori/issues/166
      if (value === undefined) return
      const _keys = keys.slice()
      const last = _keys.pop()!
      const data = _keys.reduce((data, key) => data[key] ??= {}, this)
      data[last] = value
    },
  })
}

defineAccessor(Session.prototype, 'type', ['event', 'type'])
defineAccessor(Session.prototype, 'subtype', ['event', 'subtype'])
defineAccessor(Session.prototype, 'subsubtype', ['event', 'subsubtype'])
defineAccessor(Session.prototype, 'selfId', ['event', 'selfId'])
defineAccessor(Session.prototype, 'platform', ['event', 'platform'])
defineAccessor(Session.prototype, 'timestamp', ['event', 'timestamp'])
defineAccessor(Session.prototype, 'userId', ['event', 'user', 'id'])
defineAccessor(Session.prototype, 'channelId', ['event', 'channel', 'id'])
defineAccessor(Session.prototype, 'channelName', ['event', 'channel', 'name'])
defineAccessor(Session.prototype, 'guildId', ['event', 'guild', 'id'])
defineAccessor(Session.prototype, 'guildName', ['event', 'guild', 'name'])
defineAccessor(Session.prototype, 'messageId', ['event', 'message', 'id'])
defineAccessor(Session.prototype, 'operatorId', ['event', 'operator', 'id'])
defineAccessor(Session.prototype, 'roleId', ['event', 'role', 'id'])
defineAccessor(Session.prototype, 'quote', ['event', 'message', 'quote'])
defineAccessor(Session.prototype, 'referrer', ['event', 'referrer'])
