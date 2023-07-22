import { Adapter, Schema } from '@satorijs/satori'
import { DingtalkBot } from './bot'
import { decodeMessage } from './utils'

export class WsClient extends Adapter.WsClient<DingtalkBot> {
  async prepare() {
    await this.bot.refreshToken()
    this.bot.selfId = this.bot.config.appkey
    const { endpoint, ticket } = await this.bot.http.post<{
      endpoint: string
      ticket: string
    }>('/gateway/connections/open', {
      clientId: this.bot.config.appkey,
      clientSecret: this.bot.config.secret,
      subscriptions: [
        {
          type: 'CALLBACK',
          topic: '/v1.0/im/bot/messages/get',
        },
      ],
    })
    return this.bot.http.ws(`${endpoint}?ticket=${ticket}`)
  }

  accept() {
    this.bot.socket.addEventListener('message', async ({ data }) => {
      const parsed = JSON.parse(data.toString())
      this.ctx.logger('dingtalk').debug(require('util').inspect(parsed, false, null, true))
      if (parsed.type === 'SYSTEM') {
        if (parsed.headers.topic === 'ping') {
          this.bot.socket.send(JSON.stringify({
            code: 200,
            headers: parsed.headers,
            message: 'OK',
            data: parsed.data,
          }))
        }
      } else if (parsed.type === 'CALLBACK') {
        this.ctx.logger('dingtalk').debug(require('util').inspect(JSON.parse(parsed.data), false, null, true))
        const session = await decodeMessage(this.bot, JSON.parse(parsed.data))
        if (session) this.bot.dispatch(session)
        this.ctx.logger('dingtalk').debug(require('util').inspect(session, false, null, true))
      }
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config { }
  export const Config: Schema<Config> = Schema.intersect([
    Adapter.WsClient.Config,
  ] as const)
}
