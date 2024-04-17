import { clone, Dict, pick, remove } from 'cosmokit'
import * as cordis from 'cordis'
import h from '@satorijs/element'
import { Context } from '.'
import { Adapter } from './adapter'
import { MessageEncoder } from './message'
import { defineAccessor } from './session'
import { Event, List, Login, Methods, SendOptions, Status, User } from '@satorijs/protocol'

const eventAliases = [
  ['message-created', 'message'],
]

export interface Bot extends Methods {
  userId: string
  selfId: string
  internal: any
}

export abstract class Bot<C extends Context = Context, T = any> implements Login {
  static reusable = true
  static MessageEncoder?: new (bot: Bot, channelId: string, guildId?: string, options?: SendOptions) => MessageEncoder

  public user = {} as User
  public isBot = true
  public hidden = false
  public platform: string
  public adapter?: Adapter<C, this>
  public error?: Error
  public callbacks: Dict<Function> = {}
  public logger: cordis.Logger

  // Same as `this.ctx`, but with a more specific type.
  protected context: Context
  protected _status: Status = Status.OFFLINE

  constructor(public ctx: C, public config: T, platform?: string) {
    this.internal = null
    this.context = ctx
    ctx.bots.push(this)
    this.context.emit('bot-added', this)
    if (platform) {
      this.logger = ctx.logger(platform)
      this.platform = platform
    }

    ctx.on('ready', async () => {
      await Promise.resolve()
      this.dispatchLoginEvent('login-added')
      return this.start()
    })

    ctx.on('dispose', () => this.dispose())

    ctx.on('interaction/button', (session: C[typeof Context.session]) => {
      const cb = this.callbacks[session.event.button.id]
      if (cb) cb(session)
    })
  }

  update(login: Login) {
    // make sure `status` is the last property to be assigned
    // so that `login-updated` event can be dispatched after all properties are updated
    const { status, ...rest } = login
    Object.assign(this, rest)
    this.status = status
  }

  dispose() {
    remove(this.ctx.bots, this)
    this.context.emit('bot-removed', this)
    this.dispatchLoginEvent('login-removed')
    return this.stop()
  }

  private dispatchLoginEvent(type: string) {
    const session = this.session()
    session.type = type
    session.event.login = this.toJSON()
    this.dispatch(session)
  }

  get status() {
    return this._status
  }

  set status(value) {
    if (value === this._status) return
    this._status = value
    if (this.ctx.bots?.includes(this)) {
      this.context.emit('bot-status-updated', this)
      this.dispatchLoginEvent('login-updated')
    }
  }

  get isActive() {
    return this._status !== Status.OFFLINE && this._status !== Status.DISCONNECT
  }

  online() {
    this.status = Status.ONLINE
    this.error = null
  }

  offline(error?: Error) {
    this.status = Status.OFFLINE
    this.error = error
  }

  async start() {
    if (this.isActive) return
    this.status = Status.CONNECT
    try {
      await this.context.parallel('bot-connect', this)
      await this.adapter?.connect(this)
    } catch (error) {
      this.offline(error)
    }
  }

  async stop() {
    if (!this.isActive) return
    this.status = Status.DISCONNECT
    try {
      await this.context.parallel('bot-disconnect', this)
      await this.adapter?.disconnect(this)
    } catch (error) {
      this.context.emit('internal/error', error)
    } finally {
      this.offline()
    }
  }

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  session(event: Partial<Event> = {}): C[typeof Context.session] {
    const { Session } = this.ctx.constructor as typeof Context
    return new Session(this, event)
  }

  dispatch(session: C[typeof Context.session]) {
    if (!this.ctx.lifecycle.isActive) return
    let events = [session.type]
    for (const aliases of eventAliases) {
      if (aliases.includes(session.type)) {
        events = aliases
        session.type = aliases[0]
        break
      }
    }
    this.context.emit('internal/session', session)
    if (session.type === 'internal') {
      this.context.emit(session.event._type, session.event._data, session.bot)
      return
    }
    for (const event of events) {
      this.context.emit(session, event as any, session)
    }
  }

  async createMessage(channelId: string, content: h.Fragment, guildId?: string, options?: SendOptions) {
    const { MessageEncoder } = this.constructor as typeof Bot
    return new MessageEncoder(this, channelId, guildId, options).send(content)
  }

  async sendMessage(channelId: string, content: h.Fragment, guildId?: string, options?: SendOptions) {
    const messages = await this.createMessage(channelId, content, guildId, options)
    return messages.map(message => message.id)
  }

  async sendPrivateMessage(userId: string, content: h.Fragment, guildId?: string, options?: SendOptions) {
    const { id } = await this.createDirectChannel(userId, guildId ?? options?.session?.guildId)
    return this.sendMessage(id, content, null, options)
  }

  async supports(name: string, session: Partial<C[typeof Context.session]> = {}) {
    return !!this[Methods[name]?.name]
  }

  async checkPermission(name: string, session: Partial<C[typeof Context.session]>) {
    if (name.startsWith('bot.')) {
      return this.supports(name.slice(4), session)
    }
  }

  toJSON(): Login {
    return clone(pick(this, ['platform', 'selfId', 'status', 'user', 'hidden']))
  }

  async getLogin() {
    return this.toJSON()
  }

  /** @deprecated use `bot.getLogin()` instead */
  async getSelf() {
    const { user } = await this.getLogin()
    return user
  }
}

const iterableMethods = [
  'getMessage',
  'getReaction',
  'getFriend',
  'getGuild',
  'getGuildMember',
  'getGuildRole',
  'getChannel',
]

for (const name of iterableMethods) {
  Bot.prototype[name + 'Iter'] = function (this: Bot, ...args: any[]) {
    let list: List<any>
    if (!this[name + 'List']) throw new Error(`not implemented: ${name}List`)
    const getList = async () => {
      list = await this[name + 'List'](...args, list?.next)
    }
    return {
      async next() {
        if (list?.data.length) return { done: false, value: list.data.shift() }
        if (list && !list?.next) return { done: true, value: undefined }
        await getList()
        return this.next()
      },
      [Symbol.asyncIterator]() {
        return this
      },
    }
  }
}

defineAccessor(Bot.prototype, 'selfId', ['user', 'id'])
defineAccessor(Bot.prototype, 'userId', ['user', 'id'])
