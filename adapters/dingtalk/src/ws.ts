import { Adapter, Context, Schema } from '@satorijs/core'
import { DingtalkBot } from './bot'
import { decodeMessage } from './utils'

export class WsClient<C extends Context = Context> extends Adapter.WsClient<C, DingtalkBot<C>> {
  async prepare() {
    await this.bot.refreshToken()
    await this.bot.getLogin()
    // Ref: https://open.dingtalk.com/document/direction/stream-mode-protocol-access-description
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
    this.bot.online()
    this.socket.addEventListener('message', async ({ data }) => {
      const parsed = JSON.parse(data.toString())
      this.bot.logger.debug(parsed)
      if (parsed.type === 'SYSTEM') {
        if (parsed.headers.topic === 'ping') {
          this.socket.send(JSON.stringify({
            code: 200,
            headers: parsed.headers,
            message: 'OK',
            data: parsed.data,
          }))
        }
      } else if (parsed.type === 'CALLBACK') {
        this.bot.logger.debug(JSON.parse(parsed.data))
        const session = await decodeMessage(this.bot, JSON.parse(parsed.data))
        if (session) this.bot.dispatch(session)
        this.bot.logger.debug(session)
      }
    })
  }
}

export namespace WsClient {
  export interface Options extends Adapter.WsClientConfig {}

  export const Options: Schema<Options> = Schema.intersect([
    Adapter.WsClientConfig,
  ] as const)
}
