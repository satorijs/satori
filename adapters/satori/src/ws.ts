import { Adapter, Logger, Schema, Time, Universal } from '@satorijs/satori'
import { camelizeKeys, SatoriBot } from './bot'

const logger = new Logger('discord')

type Message = Message.Heartbeat | Message.Dispatch | Message.Ready

namespace Message {
  export interface Base {
    op: string
    seq?: number
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
    op: 'dispatch'
    data: any
  }
}

export class WsClient extends Adapter.WsClient<SatoriBot> {
  _seq = 0
  _ses?: string
  _ping: NodeJS.Timeout

  async prepare() {
    const { url } = await this.bot.internal.getGatewayBot()
    return this.bot.http.ws(url + '/?v=10&encoding=json')
  }

  accept() {
    this.bot.socket.send(JSON.stringify({
      op: 'identify',
      d: {
        seq: this._ses,
      },
    }))

    this._ping = setInterval(() => {
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
      if (parsed.seq) {
        this._seq = parsed.seq
      }

      if (parsed.op === 'ready') {
        logger.debug('ready')
        Object.assign(this.bot, camelizeKeys(parsed.data.user))
        return this.bot.online()
      }

      if (parsed.op === 'dispatch') {
        const session = this.bot.session(camelizeKeys(parsed.data))
        this.bot.dispatch(session)
      }
    })

    this.bot.socket.addEventListener('close', () => {
      clearInterval(this._ping)
    })
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config {}

  export const Config: Schema<Config> = Schema.intersect([
    Adapter.WsClient.Config,
  ] as const)
}
