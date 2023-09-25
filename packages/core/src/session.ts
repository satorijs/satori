import { defineProperty } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'
import { h, Session as SessionBase } from '@satorijs/protocol'

declare module '@satorijs/protocol' {
  interface SendOptions {
    session?: SessionCore
  }
}

type SessionCore = Session

export namespace Session {
  export interface Payload extends SessionBase.Payload {}
}

export class Session extends SessionBase {
  public bot: Bot
  public app: Context['root']

  constructor(bot: Bot, payload: Partial<Session.Payload> = {}) {
    super(payload)
    this.selfId = bot.selfId
    this.platform = bot.platform
    this.locales = []
    defineProperty(this, 'bot', bot)
    defineProperty(this, 'app', bot.ctx.root)
    this.initialize()
  }

  initialize() {}

  async transform(elements: h[]): Promise<h[]> {
    return await h.transformAsync(elements, ({ type, attrs, children }, session) => {
      const render = type === 'component' ? attrs.is : this.app['component:' + type]
      return render?.(attrs, children, session) ?? true
    }, this)
  }
}
