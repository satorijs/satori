import { Bot, Context, Inject } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { WhatsAppMessageEncoder } from './message'
import { Internal } from './internal'

@Inject('logger', true, { name: 'whatsapp' })
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
