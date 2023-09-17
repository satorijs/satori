import { camelCase, Context, Schema, Session, snakeCase, Time, Universal } from '@satorijs/satori'
import WebSocket from 'ws'

const kClient = Symbol('state')

class Client {
  authorized = false
}

type Message = Message.Identify | Message.Heartbeat

namespace Message {
  export interface Base {
    op: string
    data?: any
  }

  export interface Identify extends Base {
    op: 'identify'
    data: {
      sequence?: number
    }
  }

  export interface Heartbeat extends Base {
    op: 'heartbeat'
  }
}

export interface ApiConfig {
  enabled?: boolean
}

export interface WebSocketConfig {
  enabled?: boolean
  resumeTimeout?: number
}

export interface WebhookConfig {
  enabled?: boolean
}

export interface Config {
  path?: string
  api?: ApiConfig
  websocket?: WebSocketConfig
  webhook?: WebhookConfig
}

export const Config: Schema<Config> = Schema.object({
  path: Schema.string().default(''),
  api: Schema.object({
    // enabled: Schema.boolean().default(true),
  }),
  websocket: Schema.object({
    // enabled: Schema.boolean().default(true),
    resumeTimeout: Schema.number().default(Time.minute * 5),
  }),
  webhook: Schema.object({
    // enabled: Schema.boolean().default(true),
  }),
})

function recursive(source: any, callback: (key: string) => string) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(value => recursive(value, callback))
  return Object.fromEntries(Object.entries(source).map(([key, value]) => [callback(key), recursive(value, callback)]))
}

export function apply(ctx: Context, config: Config) {
  ctx.router.post(config.path + '/v1/:name', async (koa) => {
    const method = Universal.Methods[koa.params.name]
    if (!method) {
      koa.body = 'method not found'
      return koa.status = 404
    }

    const json = koa.request.body
    const selfId = json.self_id
    const platform = json.platform
    const bot = ctx.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
    if (!bot) {
      koa.body = 'bot not found'
      return koa.status = 403
    }

    const args = method.fields.map(({ name }) => {
      return recursive(json[name], camelCase)
    })
    const result = await bot[method.name](...args)
    koa.body = recursive(result, snakeCase)
    koa.status = 200
  })

  const buffer: Session[] = []

  const timeout = setInterval(() => {
    while (buffer[0]?.timestamp! + config.websocket?.resumeTimeout! < Date.now()) {
      buffer.shift()
    }
  }, Time.second * 10)

  ctx.on('dispose', () => clearInterval(timeout))

  const layer = ctx.router.ws(config.path + '/v1', (socket) => {
    const client = socket[kClient] = new Client()

    socket.addEventListener('message', (event) => {
      let payload: Message
      try {
        payload = JSON.parse(event.data.toString())
      } catch (error) {
        return socket.close(4000, 'invalid message')
      }

      if (payload.op === 'identify') {
        client.authorized = true
        socket.send(JSON.stringify({
          op: 'ready',
        }))
        if (!payload.data.sequence) return
        for (const session of buffer) {
          if (session.id <= payload.data.sequence) continue
          dispatch(socket, session)
        }
      } else if (payload.op === 'heartbeat') {
        socket.send(JSON.stringify({ op: 'heartbeat' }))
      } else {
        return socket.close(4000, 'invalid message')
      }
    })
  })

  function dispatch(socket: WebSocket, session: Session) {
    socket.send(JSON.stringify({
      op: 'event',
      data: recursive(session, snakeCase),
    }))
  }

  ctx.on('internal/session', (session) => {
    for (const socket of layer.clients) {
      if (!socket[kClient]?.authorized) continue
      dispatch(socket, session)
    }
  })
}
