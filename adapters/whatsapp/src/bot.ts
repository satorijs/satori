import { Bot, Context, Logger, Quester, Schema, Universal } from '@satorijs/satori'
import { WhatsAppMessageEncoder } from './message'
import { HttpServer } from './http'

export class WhatsAppBot extends Bot<WhatsAppBot.Config> {
  static MessageEncoder = WhatsAppMessageEncoder
  public http: Quester

  constructor(ctx: Context, config: WhatsAppBot.Config) {
    super(ctx, config)
    ctx.plugin(HttpServer, this)
    this.http = ctx.http.extend({
      ...config,
      headers: {
        Authorization: `Bearer ${config.systemToken}`,
      },
    })
  }

  async initialize() {
    const { data } = await this.http<{
      data: {
        verified_name: string
        code_verification_status: string
        display_phone_number: string
        quality_rating: string
        id: string
      }[]
    }>('GET', `/v17.0/${this.config.id}/phone_numbers`)
    this.ctx.logger('whatsapp').debug(require('util').inspect(data, false, null, true))
    if (data.length) {
      this.selfId = data[0].id
      this.username = data[0].verified_name
    }
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
  export interface Config extends Bot.Config, Quester.Config {
    systemToken: string
    verifyToken: string
    id: string
  }
  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      systemToken: Schema.string(),
      verifyToken: Schema.string().required(),
      id: Schema.string().description('WhatsApp Business Account ID').required(),
    }),
    Quester.createConfig('https://graph.facebook.com'),
  ] as const)
}

WhatsAppBot.prototype.platform = 'whatsapp'
