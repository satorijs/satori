import { camelCase, Context, Schema, Session, snakeCase, Time, Universal } from '@satorijs/satori'
import WebSocket from 'ws'

const kClient = Symbol('state')

class Client {
  authorized = false
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

function transformKey(source: any, callback: (key: string) => string) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(value => transformKey(value, callback))
  return Object.fromEntries(Object.entries(source).map(([key, value]) => {
    if (key.startsWith('_')) return [key, value]
    return [callback(key), transformKey(value, callback)]
  }))
}

export function apply(ctx: Context, config: Config) {
  ctx.router.post(config.path + '/v1/:name', async (koa) => {
    const method = Universal.Methods[koa.params.name]
    if (!method) {
      koa.body = 'method not found'
      return koa.status = 404
    }

    const json = koa.request.body
    const selfId = koa.request.headers['X-Self-ID']
    const platform = koa.request.headers['X-Platform']
    const bot = ctx.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
    if (!bot) {
      koa.body = 'bot not found'
      return koa.status = 403
    }

    const args = method.fields.map(({ name }) => {
      return transformKey(json[name], camelCase)
    })
    const result = await bot[method.name](...args)
    koa.body = transformKey(result, snakeCase)
    koa.status = 200
  })

  ctx.router.post(config.path + '/v1/internal/:name', async (koa) => {
    const selfId = koa.request.headers['X-Self-ID']
    const platform = koa.request.headers['X-Platform']
    const bot = ctx.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
    if (!bot) {
      koa.body = 'bot not found'
      return koa.status = 403
    }

    const name = camelCase(koa.params.name)
    if (!bot.internal?.[name]) {
      koa.body = 'method not found'
      return koa.status = 404
    }
    const result = await bot.internal[name](...koa.request.body)
    koa.body = result
    koa.status = 200
  })

  const buffer: Session[] = []

  const timeout = setInterval(() => {
    while (buffer[0]?.timestamp! + config.websocket?.resumeTimeout! < Date.now()) {
      buffer.shift()
    }
  }, Time.second * 10)

  ctx.on('dispose', () => clearInterval(timeout))

  const layer = ctx.router.ws(config.path + '/v1/events', (socket) => {
    const client = socket[kClient] = new Client()

    socket.addEventListener('message', (event) => {
      let payload: Universal.ClientPayload
      try {
        payload = JSON.parse(event.data.toString())
      } catch (error) {
        return socket.close(4000, 'invalid message')
      }

      if (payload.op === Universal.Opcode.IDENTIFY) {
        client.authorized = true
        socket.send(JSON.stringify({
          op: Universal.Opcode.READY,
          body: {
            logins: ctx.bots.map(bot => bot.toJSON()),
          },
        }))
        if (!payload.body?.sequence) return
        for (const session of buffer) {
          if (session.id <= payload.body.sequence) continue
          dispatch(socket, session)
        }
      } else if (payload.op === Universal.Opcode.PING) {
        socket.send(JSON.stringify({
          op: Universal.Opcode.PONG,
          body: {},
        }))
      }
    })
  })

  function dispatch(socket: WebSocket, session: Session) {
    socket.send(JSON.stringify({
      op: 'event',
      body: transformKey(session.event, snakeCase),
    }))
  }

  ctx.on('internal/session', (session) => {
    for (const socket of layer.clients) {
      if (!socket[kClient]?.authorized) continue
      dispatch(socket, session)
    }
  })
}
