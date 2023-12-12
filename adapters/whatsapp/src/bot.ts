import { Bot, Context, Quester } from '@satorijs/satori'
import { WhatsAppMessageEncoder } from './message'
import { Internal } from './internal'

export class WhatsAppBot<C extends Context = Context> extends Bot<C> {
  static inject = ['server']
  static MessageEncoder = WhatsAppMessageEncoder

  public internal: Internal
  public http: Quester
  public platform = 'whatsapp'

  async createReaction(channelId: string, messageId: string, emoji: string): Promise<void> {
    await this.internal.messageReaction(this.selfId, channelId, messageId, emoji)
  }
}
