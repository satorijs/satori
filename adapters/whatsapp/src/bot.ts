import { Bot, Context, Quester, Schema } from '@satorijs/satori'
import { WhatsAppMessageEncoder } from './message'
import { WhatsAppBusiness } from '.'

export class WhatsAppBot extends Bot<WhatsAppBot.Config> {
  static MessageEncoder = WhatsAppMessageEncoder
  public http: Quester

  constructor(ctx: Context, config: WhatsAppBot.Config) {
    super(ctx, config)
    this.http = ctx.http.extend({
      ...config,
      headers: {
        Authorization: `Bearer ${config.systemToken}`,
      },
    })
  }

  async initialize() {
    this.selfId = this.config.phoneNumber
  }

  async createReaction(channelId: string, messageId: string, emoji: string): Promise<void> {
    // https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#reaction-messages
    await this.http.post(`/${this.selfId}/messages`, {
      messaging_product: 'whatsapp',
      to: channelId,
      recipient_type: 'individual',
      type: 'reaction',
      reaction: {
        message_id: messageId,
        emoji,
      },
    })
  }
}

export namespace WhatsAppBot {
  export interface Config extends WhatsAppBusiness.Config, Bot.Config {
    phoneNumber: string
  }
  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      phoneNumber: Schema.string().description('手机号').required(),
    }),
    WhatsAppBusiness.Config,
  ] as const)
}

WhatsAppBot.prototype.platform = 'whatsapp'
