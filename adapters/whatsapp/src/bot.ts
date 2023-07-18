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
    const { data } = await this.http('GET', `/v17.0/${this.config.id}/phone_numbers`)
    if (data.length) {
      console.log(data[0])
      this.selfId = data[0].id
      this.username = data[0].display_phone_number
    }
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
