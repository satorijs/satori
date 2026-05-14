import { Context, WsClient as CoreWsClient, WsClientConfig } from '@satorijs/core'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { DingtalkBot } from './bot'
import { decodeMessage } from './utils'
import z from 'schemastery'

export class WsClient extends CoreWsClient<DingtalkBot> {
  constructor(ctx: Context, bot: DingtalkBot) {
    super(ctx, bot)
    bot.adapter = this
  }

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
    // DingTalk Stream API may redeliver the same event within a short window to avoid delivery loss.
    // Keep a small in-memory dedup window per connection as a minimal idempotency guard.
    const handledMessageIds = new Set<string>()
    const handledMessageQueue: string[] = []
    const handledMessageLimit = 100
    this.socket.addEventListener('message', async ({ data }) => {
      const parsed = JSON.parse(data.toString())
      this.bot.ctx.logger.debug(parsed)
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
        this.bot.ctx.logger.debug(JSON.parse(parsed.data))
        const session = await decodeMessage(this.bot, JSON.parse(parsed.data))
        if (session) {
          const messageId = session.messageId
          if (messageId && handledMessageIds.has(messageId)) {
            this.bot.ctx.logger.debug('duplicate message %s, skipped', messageId)
          } else {
            this.bot.dispatch(session)
            if (messageId) {
              handledMessageIds.add(messageId)
              handledMessageQueue.push(messageId)
              if (handledMessageQueue.length > handledMessageLimit) {
                handledMessageIds.delete(handledMessageQueue.shift()!)
              }
            }
          }
        }
        this.bot.ctx.logger.debug(session)
      }
    })
  }
}

export namespace WsClient {
  export interface Options extends WsClientConfig {}

  export const Options: z<Options> = z.intersect([
    WsClientConfig,
  ] as const)
}
