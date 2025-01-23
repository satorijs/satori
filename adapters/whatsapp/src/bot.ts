import { Bot, Context, HTTP } from '@satorijs/core'
import { WhatsAppMessageEncoder } from './message'
import { Internal } from './internal'

export class WhatsAppBot<C extends Context = Context> extends Bot<C> {
  static inject = ['server']
  static MessageEncoder = WhatsAppMessageEncoder

  public internal: Internal
  public http: HTTP

  constructor(ctx: C) {
    super(ctx, {}, 'whatsapp')
  }

  async createReaction(channelId: string, messageId: string, emoji: string): Promise<void> {
    await this.internal.messageReaction(this.selfId, channelId, messageId, emoji)
  }
}
