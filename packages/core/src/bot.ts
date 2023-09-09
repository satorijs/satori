import { remove } from 'cosmokit'
import { Context, Fragment } from '.'
import { Adapter } from './adapter'
import { MessageEncoder } from './message'
import { SendOptions, Session } from './session'
import { Universal } from './universal'
import WebSocket from 'ws'

export interface Bot extends Universal.Methods, Universal.User {
  socket?: WebSocket
  internal: any
}

export abstract class Bot<T extends Bot.Config = Bot.Config> {
  static reusable = true
  static filter = false
  static MessageEncoder?: new (bot: Bot, channelId: string, guildId?: string, options?: SendOptions) => MessageEncoder

  public isBot = true
  public hidden = false
  public platform: string
  public selfId: string
  public adapter?: Adapter<this>
  public error?: Error

  protected context: Context
  protected _status: Bot.Status = 'offline'

  constructor(public ctx: Context, public config: T) {
    if (config.platform) {
      this.platform = config.platform
    }
    if (config.selfId) {
      this.selfId = config.selfId
    }

    this.internal = null
    this.context = ctx
    ctx.bots.push(this)
    this.context.emit('bot-added', this)
    ctx.on('ready', () => this.start())
    ctx.on('dispose', () => {
      remove(ctx.bots, this)
      this.context.emit('bot-removed', this)
      this.stop()
    })
  }

  get userId() {
    return this.selfId
  }

  set userId(value) {
    this.selfId = value
  }

  get status() {
    return this._status
  }

  set status(value) {
    if (value === this._status) return
    this._status = value
    if (this.ctx.bots.includes(this)) {
      this.context.emit('bot-status-updated', this)
    }
  }

  get isActive() {
    return this._status !== 'offline' && this._status !== 'disconnect'
  }

  online() {
    this.status = 'online'
    this.error = null
  }

  offline(error?: Error) {
    this.status = 'offline'
    this.error = error
  }

  async start() {
    if (this.isActive) return
    this.status = 'connect'
    try {
      await this.context.parallel('bot-connect', this)
      await this.adapter?.start(this)
    } catch (error) {
      this.offline(error)
    }
  }

  async stop() {
    if (!this.isActive) return
    this.status = 'disconnect'
    try {
      await this.context.parallel('bot-disconnect', this)
      await this.adapter?.stop(this)
    } catch (error) {
      this.context.emit('internal/warning', error)
    } finally {
      this.offline()
    }
  }

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  session(payload?: Partial<Session.Payload>) {
    return new Session(this, payload)
  }

  dispatch(session: Session) {
    if (!this.ctx.lifecycle.isActive) return
    const events: string[] = [session.type]
    if (session.subtype) {
      events.unshift(events[0] + '/' + session.subtype)
      if (session.subsubtype) {
        events.unshift(events[0] + '/' + session.subsubtype)
      }
    }
    for (const event of events) {
      this.context.emit(session, event as any, session)
    }
  }

  async sendMessage(channelId: string, content: Fragment, guildId?: string, options?: SendOptions) {
    const { MessageEncoder } = this.constructor as typeof Bot
    return new MessageEncoder(this, channelId, guildId, options).send(content)
  }

  async sendPrivateMessage(channelId: string, content: Fragment, options?: SendOptions) {
    const { MessageEncoder } = this.constructor as typeof Bot
    return new MessageEncoder(this, channelId, null, options).send(content)
  }

  async supports(name: string, session: Partial<Session> = {}) {
    return !!this[Universal.Methods[name]]
  }

  async checkPermission(name: string, session: Partial<Session>) {
    if (name.startsWith('bot.')) {
      return this.supports(name.slice(4), session)
    }
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
    let list: Universal.List<any>
    const getList = () => list = this[name + 'List'](...args, list?.next)
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

export namespace Bot {
  export interface Config {
    platform?: string
    selfId?: string
  }

  export type Status = 'offline' | 'online' | 'connect' | 'disconnect' | 'reconnect'
}
