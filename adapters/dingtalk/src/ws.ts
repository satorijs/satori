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
    // DingTalk Stream API may redeliver the same event within a short window to avoid delivery loss.
    // Keep a small in-memory dedup window per connection as a minimal idempotency guard.
    const handledMessageIds = new Set<string>()
    const handledMessageQueue: string[] = []
    const handledMessageLimit = 100
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
        if (session) {
          const messageId = session.messageId
          if (messageId && handledMessageIds.has(messageId)) {
            this.bot.logger.debug('duplicate message %s, skipped', messageId)
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
        this.bot.logger.debug(session)
        // Ref: https://open.dingtalk.com/document/direction/stream-mode-protocol-access-description
        // Send response for CALLBACK type to prevent duplicate pushes
        this.socket.send(JSON.stringify({
          code: 200,
          headers: {
            contentType: 'application/json',
            messageId: parsed.headers.messageId,
          },
          message: 'OK',
          data: JSON.stringify({ response: {} }),
        }))
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
