import { Modulator, segment } from '@satorijs/core'
import { FeishuBot } from './bot'

export class FeishuModulator extends Modulator<FeishuBot> {
  private buffer: any

  async post(data?: any, headers?: any) {
    try {
      const result = await this.bot.http.post(`/channels/${this.channelId}/messages`, data, { headers })
      const session = this.bot.session()
      // await adaptMessage(this.bot, result, session)
      session.app.emit(session, 'send', session)
      this.results.push(session)
    } catch (e) {
      this.errors.push(e)
    }
  }

  async flush() {
    if (!this.buffer) return
    const content = JSON.stringify(this.buffer)
    await this.post({ content })
  }

  async visit(element: segment) {
  }
}
