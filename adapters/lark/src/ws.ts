import { Adapter, Context, Schema, Universal } from '@satorijs/core'
import { LarkBot } from './bot'
import { adaptSession, EventPayload } from './utils'
import pb from 'protobufjs/light'

enum FrameType {
  control = 0,
  data = 1,
}

enum MessageType {
  event = 'event',
  card = 'card',
  ping = 'ping',
  pong = 'pong',
}

interface FrameSegment {
  message_id: string
  sum: number
  seq: number
  data: Uint8Array
}

export class WsClient<C extends Context = Context> extends Adapter.WsClient<C, LarkBot<C, LarkBot.BaseConfig & WsClient.Options>> {
  _deviceId: string
  _serviceId: number
  _pingInterval: number = 90000
  _ping: NodeJS.Timeout
  _cache: Record<string, FrameSegment[]> = {}
  _frame: pb.Type

  constructor(ctx: C, bot: LarkBot<C, LarkBot.BaseConfig & WsClient.Options>) {
    super(ctx, bot)
  }

  async prepare() {
    this._frame = pb.Root.fromJSON({
      nested: {
        Header: {
          fields: {
            key: { rule: 'required', type: 'string', id: 1 },
            value: { rule: 'required', type: 'string', id: 2 },
          },
        },
        Frame: {
          fields: {
            SeqID: { rule: 'required', type: 'uint64', id: 1 },
            LogID: { rule: 'required', type: 'uint64', id: 2 },
            service: { rule: 'required', type: 'int32', id: 3 },
            method: { rule: 'required', type: 'int32', id: 4 },
            headers: { rule: 'repeated', type: 'Header', id: 5 },
            payloadEncoding: { type: 'string', id: 6 },
            payloadType: { type: 'string', id: 7 },
            payload: { type: 'bytes', id: 8 },
            LogIDNew: { type: 'string', id: 9 },
          },
        },
      },
    }).lookupType('Frame')

    const baseUrl = this.bot.config.baseURL ?? new URL(this.bot.config.endpoint).origin
    const { code, data: { URL: url, ClientConfig: config }, msg } = await this.bot.http.post(`${baseUrl}/callback/ws/endpoint`, {
      AppID: this.bot.config.appId,
      AppSecret: this.bot.config.appSecret,
    })
    if (code !== 0) throw new Error(`failed to get gateway url: ${code} ${msg}`)

    const urlObj = new URL(url)
    this._deviceId = urlObj.searchParams.get('device_id')
    this._serviceId = +urlObj.searchParams.get('service_id')
    this._pingInterval = config.PingInterval * 1000

    return this.bot.ctx.http.ws(url)
  }

  ping() {
    if (!this.socket || this.bot.status !== Universal.Status.ONLINE) {
      clearTimeout(this._ping)
      return
    }
    const frame = {
      headers: [{
        key: 'type',
        value: MessageType.ping,
      }],
      service: this._serviceId,
      method: FrameType.control,
      SeqID: 0,
      LogID: 0,
    }
    this.send(frame)
    this._ping = setTimeout(() => this.ping(), this._pingInterval)
  }

  async accept() {
    await this.bot.initialize()

    this.socket.addEventListener('message', async ({ data }) => {
      const frame: {
        headers: { key: string; value: string }[]
        method: FrameType
        payload?: Uint8Array
      } = this._frame.decode(new Uint8Array(data as any)) as any
      const headers: {
        message_id: string
        type: MessageType
        sum: string
        seq: string
      } = (frame.headers ?? []).reduce((acc, cur) => {
        acc[cur.key] = cur.value
        return acc
      }, {} as any)

      if (frame.method === FrameType.control && headers.type === MessageType.pong) {
        this.bot.logger.debug('pong')
        return
      }

      if (frame.method === FrameType.data) {
        if (headers.type !== MessageType.event) return

        const data = this.retrieve({
          message_id: headers.message_id,
          sum: +headers.sum,
          seq: +headers.seq,
          data: frame.payload,
        })
        if (!data) return

        const body: EventPayload = JSON.parse(Buffer.from(data).toString('utf8'))
        if (!body.header) return
        this.bot.logger.info('received event: %o', body)
        body.type = body.header.event_type
        const session = await adaptSession(this.bot, body)
        this.bot.dispatch(session)

        this.send({
          ...frame,
          headers: [...frame.headers, { key: 'biz_rt', value: '0' }],
          payload: Buffer.from(JSON.stringify({ code: 200 })),
        })
      }
    })

    this.socket.addEventListener('close', (e) => {
      clearTimeout(this._ping)
      this.bot.offline()
    })
    this.ping()
  }

  send(frame: any) {
    const encoded = this._frame.encode(frame).finish()
    this.socket.send(encoded as any)
  }

  retrieve(seg: FrameSegment): Uint8Array | undefined {
    const { message_id, sum } = seg
    if (sum === 1) return seg.data
    if (!this._cache[message_id]) this._cache[message_id] = []

    this._cache[message_id].push(seg)
    if (this._cache[message_id].length === sum) {
      const data = Buffer.concat(this._cache[message_id].sort((a, b) => a.seq - b.seq).map((item) => item.data))
      delete this._cache[message_id]
      return data
    }
  }
}

export namespace WsClient {
  export interface Options extends Adapter.WsClientConfig {
    protocol: 'ws'
  }

  export const Options: Schema<Options> = Schema.intersect([
    Schema.object({
      protocol: Schema.const('ws').required(),
    }),
    Adapter.WsClientConfig,
  ])
}
