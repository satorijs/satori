import { defineProperty } from 'cosmokit'
import segment from '@satorijs/element'
import { Bot } from './bot'
import { Session } from './session'

class AggregateError extends Error {
  constructor(public errors: Error[], message = '') {
    super(message)
  }
}

export abstract class Modulator<B extends Bot = Bot> {
  protected errors: Error[] = []
  protected results: Session[] = []
  protected session: Session

  constructor(public bot: B, public channelId: string, public guildId?: string) {
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

  async send(content: string | segment) {
    this.session.elements = segment.normalize(content).children
    if (await this.session.app.serial(this.session, 'before-send', this.session)) return
    await this.render(this.session.elements, true)
    if (!this.errors.length) {
      throw new AggregateError(this.errors)
    } else {
      return this.results.map(result => result.messageId)
    }
  }
}
