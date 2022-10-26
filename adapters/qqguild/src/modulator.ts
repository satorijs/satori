import { Modulator, segment } from '@satorijs/satori'
import { QQGuildBot } from './bot'

export class QQGuildModulator extends Modulator<QQGuildBot> {
  private content = ''

  async flush() {
    if (this.content) {
      const result = await this.session.bot.internal.send.channel(this.channelId, this.content)
      const session = this.bot.adaptMessage(result)
      this.results.push(session)
      session.app.emit(session, 'message', session)
    }
    this.content = ''
  }

  async visit(element: segment) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.content += attrs.content
    } else if (type === 'message') {
      await this.flush()
      await this.render(children, true)
    } else {
      await this.render(children)
    }
  }
}
