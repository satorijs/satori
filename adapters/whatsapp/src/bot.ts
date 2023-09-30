import { Bot, Context, Quester } from '@satorijs/satori'
import { WhatsAppMessageEncoder } from './message'
import { Internal } from './internal'

export class WhatsAppBot extends Bot {
  static MessageEncoder = WhatsAppMessageEncoder

  public internal: Internal
  public http: Quester

  constructor(ctx: Context, config: {}) {
    super(ctx, config)
    this.platform = 'whatsapp'
  }

  async createReaction(channelId: string, messageId: string, emoji: string): Promise<void> {
    await this.internal.messageReaction(this.selfId, channelId, messageId, emoji)
  }
}
