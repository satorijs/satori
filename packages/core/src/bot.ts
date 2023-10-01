import { pick, remove } from 'cosmokit'
import { Context, Fragment } from '.'
import { Adapter } from './adapter'
import { MessageEncoder } from './message'
import { defineAccessor, Session } from './session'
import { Event, List, Login, Methods, SendOptions, Status, User } from '@satorijs/protocol'

const eventAliases = [
  ['message-created', 'message'],
]

export interface Bot extends Methods {
  userId: string
  selfId: string
  internal: any
}

export abstract class Bot<T = any> implements Login {
  static reusable = true
  static filter = false
  static MessageEncoder?: new (bot: Bot, channelId: string, guildId?: string, options?: SendOptions) => MessageEncoder

  public user = {} as User
  public isBot = true
  public hidden = false
  public platform: string
  public adapter?: Adapter<this>
  public error?: Error

  protected context: Context
  protected _status: Status = Status.OFFLINE

  constructor(public ctx: Context, public config: T) {
    this.internal = null
    this.context = ctx
    ctx.bots.push(this)
    this.context.emit('bot-added', this)

    ctx.on('ready', () => {
      this.dispatchLoginEvent('login-added')
      return this.start()
    })

    ctx.on('dispose', () => this.dispose())
  }

  update(login: Login) {
    this._status = login.status
    this.user = login.user
    this.dispatchUpdate()
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
    session.body.login = this.toJSON()
    this.dispatch(session)
  }

  dispatchUpdate() {
    this.dispatchLoginEvent('login-updated')
  }

  get status() {
    return this._status
  }

  set status(value) {
    if (value === this._status) return
    this._status = value
    if (this.ctx.bots.includes(this)) {
      this.context.emit('bot-status-updated', this)
      this.dispatchUpdate()
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
      this.context.emit('internal/warning', error)
    } finally {
      this.offline()
    }
  }

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  session(body: Partial<Event> = {}) {
    return new Session(this, body)
  }

  dispatch(session: Session) {
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
    if (session.type === 'internal') return
    for (const event of events) {
      this.context.emit(session, event as any, session)
    }
  }

  sendMessage(channelId: string, content: Fragment, guildId?: string, options?: SendOptions) {
    const { MessageEncoder } = this.constructor as typeof Bot
    return new MessageEncoder(this, channelId, guildId, options).send(content)
  }

  async sendPrivateMessage(userId: string, content: Fragment, options?: SendOptions) {
    const { id } = await this.createDirectChannel(userId)
    return this.sendMessage(id, content, null, options)
  }

  async supports(name: string, session: Partial<Session> = {}) {
    return !!this[Methods[name]?.name]
  }

  async checkPermission(name: string, session: Partial<Session>) {
    if (name.startsWith('bot.')) {
      return this.supports(name.slice(4), session)
    }
  }

  toJSON(): Login {
    return pick(this, ['platform', 'selfId', 'status', 'user'])
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
