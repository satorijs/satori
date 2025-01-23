import { clone, Dict, isNonNullable, pick } from 'cosmokit'
import { Context, Logger, Service } from 'cordis'
import h from '@satorijs/element'
import { Adapter } from './adapter'
import { MessageEncoder } from './message'
import { defineAccessor, Session } from './session'
import { ExtractParams, InternalRequest, InternalRouter } from './internal'
import { Event, List, Login, Methods, Response, SendOptions, Status, Upload, User } from '@satorijs/protocol'

/* eslint-enable @typescript-eslint/no-unused-vars */

const eventAliases = [
  ['message-created', 'message'],
  ['guild-removed', 'guild-deleted'],
  ['guild-member-removed', 'guild-member-deleted'],
]

export interface Bot extends Methods {
  userId: string
  selfId: string
  internal: any
}

export abstract class Bot<C extends Context = Context, T = any> {
  static reusable = true
  static MessageEncoder?: new (bot: Bot, channelId: string, referrer?: any, options?: SendOptions) => MessageEncoder

  public [Service.tracker] = {
    associate: 'bot',
    property: 'ctx',
  }

  public sn: number
  public user?: User
  public platform?: string
  public features: string[]
  public hidden = false
  public adapter!: Adapter<C, this>
  public error: any
  public callbacks: Dict<Function> = {}
  public logger!: Logger

  public _internalRouter: InternalRouter<C>

  // Same as `this.ctx`, but with a more specific type.
  protected context: Context
  protected _status: Status = Status.OFFLINE

  constructor(public ctx: C, public config: T, public adapterName: string) {
    this.sn = ++ctx.satori._loginSeq
    this.internal = null
    this._internalRouter = new InternalRouter(ctx)
    this.context = ctx
    ctx.bots.push(this)
    this.context.emit('bot-added', this)
    this.logger = ctx.logger(adapterName)
    this.platform = adapterName

    this.features = Object.entries(Methods)
      .filter(([, value]) => this[value.name])
      .map(([key]) => key)

    ctx.on('ready', async () => {
      await Promise.resolve()
      this.dispatchLoginEvent('login-added')
      return this.start()
    })

    ctx.on('dispose', () => this.dispose())

    ctx.on('interaction/button', (session) => {
      const cb = this.callbacks[session.event.button!.id]
      if (cb) cb(session)
    })
  }

  getInternalUrl(path: string, init?: ConstructorParameters<typeof URLSearchParams>[0], slash?: boolean) {
    let search = new URLSearchParams(init).toString()
    if (search) search = '?' + search
    return `internal${slash ? '/' : ':'}${this.platform}/${this.selfId}${path}${search}`
  }

  defineInternalRoute<P extends string>(path: P, callback: (request: InternalRequest<C, ExtractParams<P>>) => Promise<Response>) {
    return this._internalRouter.define(path, callback)
  }

  update(login: Login) {
    // make sure `status` is the last property to be assigned
    // so that `login-updated` event can be dispatched after all properties are updated
    const { sn, status, ...rest } = login
    Object.assign(this, rest)
    this.status = status
  }

  dispose() {
    const index = this.ctx.bots.findIndex(bot => bot.sid === this.sid)
    if (index >= 0) {
      this.ctx.bots.splice(index, 1)
      this.context.emit('bot-removed', this)
      this.dispatchLoginEvent('login-removed')
    }
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
    if (this.ctx.bots?.some(bot => bot.sid === this.sid)) {
      this.context.emit('bot-status-updated', this)
      this.dispatchLoginEvent('login-updated')
    }
  }

  get isActive() {
    return this._status !== Status.OFFLINE && this._status !== Status.DISCONNECT
  }

  online() {
    this.status = Status.ONLINE
    this.error = undefined
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
    } catch (error: any) {
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
      this.context.emit(this.ctx, 'internal/error', error)
    } finally {
      this.offline()
    }
  }

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  session(event: Partial<Event> = {}): C[typeof Context.session] {
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

  async createMessage(channelId: string, content: h.Fragment, referrer?: any, options?: SendOptions) {
    const { MessageEncoder } = this.constructor as typeof Bot
    return new MessageEncoder!(this, channelId, referrer, options).send(content)
  }

  async sendMessage(channelId: string, content: h.Fragment, referrer?: any, options?: SendOptions) {
    const messages = await this.createMessage(channelId, content, referrer, options)
    return messages.map(message => message.id).filter(isNonNullable)
  }

  async sendPrivateMessage(userId: string, content: h.Fragment, guildId?: string, options?: SendOptions) {
    const { id } = await this.createDirectChannel(userId, guildId ?? options?.session?.guildId)
    return this.sendMessage(id, content, null, options)
  }

  async createUpload(...uploads: Upload[]): Promise<string[]> {
    const ids: string[] = []
    for (const upload of uploads) {
      const id = Math.random().toString(36).slice(2)
      const headers = new Headers()
      headers.set('content-type', upload.type)
      if (upload.filename) {
        headers.set('content-disposition', `attachment; filename*=UTF-8''${encodeURIComponent(upload.filename)}`)
      }
      this.ctx.satori._tempStore[id] = {
        status: 200,
        body: upload.data,
        headers,
      }
      ids.push(id)
    }
    const timer = setTimeout(() => dispose(), 600000)
    const dispose = () => {
      _dispose()
      clearTimeout(timer)
      for (const id of ids) {
        delete this.ctx.satori._tempStore[id]
      }
    }
    const _dispose = this.ctx.on('dispose', dispose)
    return ids.map(id => this.getInternalUrl(`/_tmp/${id}`))
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
    return clone({
      ...pick(this, ['sn', 'user', 'platform', 'selfId', 'status', 'hidden', 'features']),
      adapter: this.adapterName,
    })
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
      // `bot.getMessageList()` returns messages in ascending order
      if (name === 'getMessage') list.data.reverse()
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
