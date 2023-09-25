import { defineProperty } from 'cosmokit'
import { Bot } from './bot'
import { Channel, h, SendOptions } from '@satorijs/protocol'
import { Session } from './session'

class AggregateError extends Error {
  constructor(public errors: Error[], message = '') {
    super(message)
  }
}

export abstract class MessageEncoder<B extends Bot = Bot> {
  public errors: Error[] = []
  public results: Session[] = []
  public session: Session

  constructor(public bot: B, public channelId: string, public guildId?: string, public options: SendOptions = {}) {}

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
    const isDirect = this.options.session?.isDirect ?? !this.guildId
    this.session = this.bot.session({
      type: 'send',
      channel: { id: this.channelId, type: isDirect ? Channel.Type.DIRECT : Channel.Type.TEXT },
      guild: { id: this.guildId },
      subtype: isDirect ? 'private' : 'group',
    })
    defineProperty(this.session, this.bot.platform, Object.create(this.bot.internal))
    await this.prepare()
    this.session.elements = h.normalize(content)
    if (await this.session.app.serial(this.session, 'before-send', this.session, this.options)) return
    const session = this.options.session ?? this.session
    await this.render(await session.transform(this.session.elements))
    await this.flush()
    if (this.errors.length) {
      throw new AggregateError(this.errors)
    } else {
      return this.results.map(result => result.messageId)
    }
  }
}

export { MessageEncoder as Modulator, MessageEncoder as Messenger }
