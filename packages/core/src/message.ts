import { Context } from 'cordis'
import { Bot } from './bot'
import { Channel, Message, SendOptions } from '@satorijs/protocol'
import h from '@satorijs/element'

class AggregateError extends Error {
  constructor(public errors: Error[], message = '') {
    super(message)
  }
}

export abstract class MessageEncoder<C extends Context = Context, B extends Bot<C> = Bot<C>> {
  public errors: Error[] = []
  public results: Message[] = []
  public session!: C[typeof Context.session]

  constructor(public bot: B, public channelId: string, public referrer?: any, public options: SendOptions = {}) {}

  async prepare() {}

  abstract flush(): Promise<void>
  abstract visit(element: h): Promise<void>

  async render(elements: h[], flush?: boolean) {
    for (const element of elements) {
      await this.visit(element)
    }
    if (flush) {
      await this.flush()
    }
  }

  async send(content: h.Fragment) {
    this.session = this.bot.session({
      type: 'send',
      channel: { id: this.channelId, ...this.options.session?.event.channel } as Channel,
      guild: this.options.session?.event.guild,
    })
    for (const key in this.options.session || {}) {
      if (key === 'id' || key === 'event') continue
      this.session[key] = this.options.session![key]
    }
    await this.prepare()
    const session = this.options.session ?? this.session
    this.session.elements = await session.transform(h.normalize(content))
    const btns = h.select(this.session.elements, 'button').filter(v => v.attrs.type !== 'link' && !v.attrs.id)
    for (const btn of btns) {
      const r = Math.random().toString(36).slice(2)
      btn.attrs.id ||= r
      if (typeof btn.attrs.action === 'function') this.bot.callbacks[btn.attrs.id] = btn.attrs.action
    }
    if (await this.session.app.serial(this.session, 'before-send', this.session, this.options)) return []
    await this.render(this.session.elements)
    await this.flush()
    if (this.errors.length) {
      throw new AggregateError(this.errors)
    } else {
      return this.results
    }
  }
}

export { MessageEncoder as Modulator, MessageEncoder as Messenger }
