import { remove } from 'cosmokit'
import { Context } from '.'
import { Adapter } from './adapter'
import { Session } from './session'
import { Methods, User } from './protocol'

export interface Bot extends Bot.Config, Methods, User {}

export abstract class Bot<C extends Context = Context, T extends Bot.Config = Bot.Config> {
  static reusable = true

  public isBot = true
  public platform: string
  public hidden?: boolean
  public internal?: any
  public selfId?: string
  public adapter?: Adapter<this>
  public error?: Error

  protected context: Context
  protected _status: Bot.Status = 'offline'

  constructor(public ctx: C, public config: T) {
    if (config.platform) {
      this.platform = config.platform
    }

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

  get status() {
    return this._status
  }

  set status(value) {
    this._status = value
    if (this.ctx.bots.includes(this)) {
      this.context.emit('bot-status-updated', this)
    }
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
    if (['connect', 'reconnect', 'online'].includes(this.status)) return
    this.status = 'connect'
    try {
      await this.context.parallel('bot-connect', this)
      await this.adapter.start(this)
    } catch (error) {
      this.offline(error)
    }
  }

  async stop() {
    if (['disconnect', 'offline'].includes(this.status)) return
    this.status = 'disconnect'
    try {
      await this.context.parallel('bot-disconnect', this)
      await this.adapter.stop(this)
    } catch (error) {
      this.context.emit('internal/warning', error)
      this.offline()
    }
  }

  get sid() {
    return `${this.platform}:${this.selfId}`
  }

  session(payload?: Partial<Session.Payload>) {
    return new Session(this, payload)
  }

  dispatch(session: Session<C>) {
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
}

export namespace Bot {
  export interface Config {
    platform?: string
  }

  export type Status = 'offline' | 'online' | 'connect' | 'disconnect' | 'reconnect'
}
