import { Adapter, camelCase, Logger, Schema, Time, Universal } from '@satorijs/satori'
import { SatoriBot, transformKey } from './bot'

const logger = new Logger('discord')

type Message = Message.Heartbeat | Message.Dispatch | Message.Ready

namespace Message {
  export interface Base {
    op: string
    data?: any
  }

  export interface Heartbeat extends Base {
    op: 'heartbeat'
  }

  export interface Ready extends Base {
    op: 'ready'
    data: {
      user: Universal.User
    }
  }

  export interface Dispatch extends Base {
    op: 'event'
    data: any
  }
}

export class WsClient extends Adapter.WsClient<SatoriBot> {
  sequence?: number
  timeout?: NodeJS.Timeout

  async prepare() {
    const { url } = await this.bot.internal.getGatewayBot()
    return this.bot.http.ws(url + '/?v=10&encoding=json')
  }

  accept() {
    this.bot.socket.send(JSON.stringify({
      op: 'identify',
      d: {
        sequence: this.sequence,
      },
    }))

    this.timeout = setInterval(() => {
      this.bot.socket.send(JSON.stringify({
        op: 'heartbeat',
      }))
    }, Time.second * 10)

    this.bot.socket.addEventListener('message', async ({ data }) => {
      let parsed: Message
      try {
        parsed = JSON.parse(data.toString())
      } catch (error) {
        return logger.warn('cannot parse message', data)
      }

      if (parsed.op === 'ready') {
        logger.debug('ready')
        Object.assign(this.bot, transformKey(parsed.data.user, camelCase))
        return this.bot.online()
      }

      if (parsed.op === 'event') {
        const session = this.bot.session(transformKey(parsed.data, camelCase))
        this.sequence = session.id
        this.bot.dispatch(session)
      }
    })

    this.bot.socket.addEventListener('close', () => {
      clearInterval(this.timeout)
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config {}

  export const Config: Schema<Config> = Schema.intersect([
    Adapter.WsClient.Config,
  ] as const)
}
