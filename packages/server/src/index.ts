import { camelCase, Context, Logger, Schema, Session, snakeCase, Time, Universal } from '@satorijs/satori'
import {} from '@satorijs/router'
import WebSocket from 'ws'

const logger = new Logger('server')

export const name = 'server'
export const inject = ['router']

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

export interface Webhook {
  enabled?: boolean
  endpoint: string
  token?: string
}

export const Webhook: Schema<Webhook> = Schema.object({
  enabled: Schema.boolean().default(true),
  endpoint: Schema.string(),
  token: Schema.string(),
})

export interface Config {
  path?: string
  token?: string
  api?: ApiConfig
  websocket?: WebSocketConfig
  webhooks: Webhook[]
}

export const Config: Schema<Config> = Schema.object({
  path: Schema.string().default('/satori'),
  token: Schema.string().experimental(),
  api: Schema.object({
    // enabled: Schema.boolean().default(true),
  }),
  websocket: Schema.object({
    // enabled: Schema.boolean().default(true),
    resumeTimeout: Schema.number().default(Time.minute * 5),
  }),
  webhooks: Schema.array(Webhook),
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
  ctx.router.get(config.path + '/v1(/.+)*', async (koa) => {
    koa.body = 'Please use POST method to send requests.'
    koa.status = 405
  })

  ctx.router.post(config.path + '/v1/:name', async (koa) => {
    const method = Universal.Methods[koa.params.name]
    if (!method) {
      koa.body = 'method not found'
      return koa.status = 404
    }

    if (config.token) {
      if (koa.request.headers.authorization !== `Bearer ${config.token}`) {
        koa.body = 'invalid token'
        return koa.status = 403
      }
    }

    const json = koa.request.body
    const selfId = koa.request.headers['x-self-id']
    const platform = koa.request.headers['x-platform']
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
        if (config.token) {
          if (payload.body?.token !== config.token) {
            return socket.close(4004, 'invalid token')
          }
        }

        client.authorized = true
        socket.send(JSON.stringify({
          op: Universal.Opcode.READY,
          body: {
            logins: transformKey(ctx.bots.map(bot => bot.toJSON()), snakeCase),
          },
        }))
        if (!payload.body?.sequence) return
        for (const session of buffer) {
          if (session.id <= payload.body.sequence) continue
          dispatch(socket, transformKey(session.toJSON(), snakeCase))
        }
      } else if (payload.op === Universal.Opcode.PING) {
        socket.send(JSON.stringify({
          op: Universal.Opcode.PONG,
          body: {},
        }))
      }
    })
  })

  function dispatch(socket: WebSocket, body: any) {
    socket.send(JSON.stringify({
      op: Universal.Opcode.EVENT,
      body,
    }))
  }

  ctx.on('internal/session', (session) => {
    const body = transformKey(session.toJSON(), snakeCase)
    for (const socket of layer.clients) {
      if (!socket[kClient]?.authorized) continue
      dispatch(socket, body)
    }
    for (const webhook of config.webhooks) {
      if (!webhook.enabled) continue
      ctx.http.post(webhook.endpoint, body, {
        headers: webhook.token ? {
          Authorization: `Bearer ${webhook.token}`,
        } : {},
      }).catch(logger.warn)
    }
  })
}
