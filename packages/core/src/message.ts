import { defineProperty } from 'cosmokit'
import segment from '@satorijs/element'
import { Bot } from './bot'
import { SendOptions, Session } from './session'

class AggregateError extends Error {
  constructor(public errors: Error[], message = '') {
    super(message)
  }
}

export abstract class Messenger<B extends Bot = Bot> {
  public errors: Error[] = []
  public results: Session[] = []
  public session: Session

  constructor(public bot: B, public channelId: string, public guildId?: string, public options?: SendOptions) {
    this.session = bot.session({
      type: 'send',
      author: bot,
      channelId,
      guildId,
      subtype: guildId ? 'group' : 'private',
    })
    defineProperty(this.session, bot.platform, Object.create(bot.internal))
  }

  abstract flush(): Promise<void>
  abstract visit(element: segment): Promise<void>

  async render(elements: segment[], flush?: boolean) {
    for (const element of elements) {
      await this.visit(element)
    }
    if (flush) {
      await this.flush()
    }
  }

  async send(content: segment.Fragment) {
    this.session.elements = segment.normalize(content)
    if (await this.session.app.serial(this.session, 'before-send', this.session)) return
    await this.render(this.session.elements, true)
    if (this.errors.length) {
      throw new AggregateError(this.errors)
    } else {
      return this.results.map(result => result.messageId)
    }
  }
}

export { Messenger as Modulator }
