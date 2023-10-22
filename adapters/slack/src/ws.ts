import { Adapter, Context, Logger, Schema } from '@satorijs/satori'
import { SlackBot } from './bot'
import { adaptSession } from './utils'
import { SocketEvent } from './types/events'

const logger = new Logger('slack')

export class WsClient<C extends Context = Context> extends Adapter.WsClient<C, SlackBot<C, SlackBot.BaseConfig & WsClient.Config>> {
  async prepare() {
    await this.bot.getLogin()
    const data = await this.bot.request('POST', '/apps.connections.open', {}, {}, true)
    const { url } = data
    logger.debug('ws url: %s', url)
    return this.bot.ctx.http.ws(url)
  }

  async accept() {
    this.socket.addEventListener('message', async ({ data }) => {
      const parsed: SocketEvent = JSON.parse(data.toString())
      logger.debug(parsed)
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
          logger.debug(session)
        }
      }
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClientConfig {
    protocol: 'ws'
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.const('ws').required(process.env.KOISHI_ENV !== 'browser'),
    }),
    Adapter.WsClientConfig,
  ])
}
