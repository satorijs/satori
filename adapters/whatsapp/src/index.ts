import { Bot, Context, Quester, Schema } from '@satorijs/satori'
import { WhatsAppBot } from './bot'
import { HttpServer } from './http'

export * from './http'
export * from './bot'
export * from './types'
export * from './utils'
export * from './message'

export async function WhatsAppBusiness(ctx: Context, config: WhatsAppBusiness.Config) {
  const http: Quester = ctx.http.extend({
    ...config,
    headers: {
      Authorization: `Bearer ${config.systemToken}`,
    },
  })
  const { data } = await http<{
    data: {
      verified_name: string
      code_verification_status: string
      display_phone_number: string
      quality_rating: string
      id: string
    }[]
  }>('GET', `/${config.id}/phone_numbers`)
  ctx.logger('whatsapp').debug(require('util').inspect(data, false, null, true))
  const httpServer = new HttpServer()
  for (const item of data) {
    const bot = new WhatsAppBot(ctx, {
      ...config,
      phoneNumber: item.id,
    })
    httpServer.fork(ctx, bot)
  }
}

export namespace WhatsAppBusiness {
  export interface Config extends Quester.Config {
    systemToken: string
    verifyToken: string
    id: string
    secret: string
  }
  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      secret: Schema.string().role('secret').description('App Secret').required(),
      systemToken: Schema.string().role('secret').description('System User Token').required(),
      verifyToken: Schema.string().required(),
      id: Schema.string().description('WhatsApp Business Account ID').required(),
    }),
    Quester.createConfig('https://graph.facebook.com'),
  ] as const)
}

export default WhatsAppBusiness
