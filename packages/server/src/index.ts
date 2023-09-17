import { camelCase, Context, Schema, snakeCase, Universal } from '@satorijs/satori'

const kClient = Symbol('state')

class Client {
  authorized = false
}

export interface Config {
  path: string
}

type Message = Message.Identify | Message.Heartbeat

namespace Message {
  export interface Base {
    type: string
  }

  export interface Identify extends Base {
    type: 'identify'
  }

  export interface Heartbeat extends Base {
    type: 'heartbeat'
  }
}

export const Config: Schema<Config> = Schema.object({
  path: Schema.string().default('/v1'),
})

function recursive(source: any, callback: (key: string) => string) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(value => recursive(value, callback))
  return Object.fromEntries(Object.entries(source).map(([key, value]) => [callback(key), recursive(value, callback)]))
}

export function apply(ctx: Context, config: Config) {
  ctx.router.post(config.path + '/:name', async (koa) => {
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

  const layer = ctx.router.ws(config.path, (socket) => {
    const client = socket[kClient] = new Client()

    socket.addEventListener('message', (event) => {
      let payload: Message
      try {
        payload = JSON.parse(event.data.toString())
      } catch (error) {
        return socket.close(4000, 'invalid message')
      }

      if (payload.type === 'identify') {
        client.authorized = true
      } else if (payload.type === 'heartbeat') {
        socket.send(JSON.stringify({ type: 'heartbeat' }))
      } else {
        return socket.close(4000, 'invalid message')
      }
    })
  })

  ctx.on('internal/session', (session) => {
    for (const socket of layer.clients) {
      if (!socket[kClient]?.authorized) continue
      socket.send(JSON.stringify({
        type: 'event',
        body: recursive(session, snakeCase),
      }))
    }
  })
}
