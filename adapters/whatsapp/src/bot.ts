import { Bot, Context, HTTP } from '@satorijs/core'
import { WhatsAppMessageEncoder } from './message'
import { Internal } from './internal'

export class WhatsAppBot extends Bot {
  static inject = ['server']
  static MessageEncoder = WhatsAppMessageEncoder

  public internal: Internal
  public http: HTTP

  constructor(ctx: Context) {
    super(ctx, {}, 'whatsapp')
  }

  async createReaction(channelId: string, messageId: string, emojiId: string): Promise<void> {
    await this.internal.messageReaction(this.selfId, channelId, messageId, emojiId)
  }
}
