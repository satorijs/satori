import { Context, WsClient as CoreWsClient, WsClientConfig } from '@satorijs/core'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { SlackBot } from './bot'
import { adaptSession } from './utils'
import { SocketEvent } from './types/events'
import z from 'schemastery'

export class WsClient extends CoreWsClient<SlackBot<SlackBot.BaseConfig & WsClient.Options>> {
  constructor(ctx: Context, bot: SlackBot<SlackBot.BaseConfig & WsClient.Options>) {
    super(ctx, bot)
    bot.adapter = this
  }
  async prepare() {
    await this.bot.getLogin()
    const data = await this.bot.request('POST', '/apps.connections.open', {}, {}, true)
    const { url } = data
    this.bot.ctx.logger.debug('ws url: %s', url)
    return this.bot.ctx.http.ws(url)
  }

  async accept() {
    this.socket.addEventListener('message', async ({ data }) => {
      const parsed: SocketEvent = JSON.parse(data.toString())
      this.bot.ctx.logger.debug(parsed)
      const { type } = parsed
      if (type === 'hello') {
        // @ts-ignore
        // this.bot.selfId = parsed.connection_info.app_id
        return this.bot.online()
      }
      if (type === 'events_api') {
        const { envelope_id } = parsed
        const payload = parsed.payload
        this.socket.send(JSON.stringify({ envelope_id }))
        const session = await adaptSession(this.bot, payload)

        if (session) {
          this.bot.dispatch(session)
          this.bot.ctx.logger.debug(session)
        }
      }
    })
  }
}

export namespace WsClient {
  export interface Options extends WsClientConfig {
    protocol: 'ws'
  }

  export const Options: z<Options> = z.intersect([
    z.object({
      protocol: z.const('ws').required(process.env.KOISHI_ENV !== 'browser'),
    }),
    WsClientConfig,
  ])
}
