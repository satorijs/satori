import { Bot } from './bot'
import { Channel, Message, SendOptions } from '@satorijs/protocol'
import h from '@satorijs/element'
import { Context } from '.'

class AggregateError extends Error {
  constructor(public errors: Error[], message = '') {
    super(message)
  }
}

export abstract class MessageEncoder<C extends Context = Context, B extends Bot<C> = Bot<C>> {
  public errors: Error[] = []
  public results: Message[] = []
  public session: C[typeof Context.session]

  constructor(public bot: B, public channelId: string, public guildId?: string, public options: SendOptions = {}) { }

  async prepare() { }

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
    const isDirect = this.options.session?.isDirect ?? !this.guildId
    this.session = this.bot.session({
      type: 'send',
      channel: { id: this.channelId, type: isDirect ? Channel.Type.DIRECT : Channel.Type.TEXT },
      guild: { id: this.guildId },
      subtype: isDirect ? 'private' : 'group',
    })
    for (const key in this.options.session || {}) {
      if (key in this.session) continue
      this.session[key] = this.options.session[key]
    }
    await this.prepare()
    this.session.elements = h.normalize(content)
    const btns = h.select(this.session.elements, 'button').filter(v => v.attrs.type !== 'link' && !v.attrs.id)
    for (const btn of btns) {
      const r = (Math.random() + 1).toString(36).substring(7)
      btn.attrs.id ||= r
      if (typeof btn.attrs.action === 'function') this.bot.callbacks[btn.attrs.id] = btn.attrs.action
    }
    if (await this.session.app.serial(this.session, 'before-send', this.session, this.options)) return
    const session = this.options.session ?? this.session
    await this.render(await session.transform(this.session.elements))
    await this.flush()
    if (this.errors.length) {
      throw new AggregateError(this.errors)
    } else {
      return this.results
    }
  }
}

export { MessageEncoder as Modulator, MessageEncoder as Messenger }
