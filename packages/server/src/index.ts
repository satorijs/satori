import { Context, Inject, Schema, Service, Session, Universal } from '@satorijs/core'
import { camelCase, snakeCase, Time } from 'cosmokit'
import { Request, Response } from '@cordisjs/plugin-server'
import type {} from '@cordisjs/plugin-http'
import type {} from '@cordisjs/plugin-logger'
import { WebSocket } from 'ws'

declare module '@satorijs/core' {
  interface Satori {
    server: SatoriServer
  }
}

const kClient = Symbol('state')

class Client {
  authorized = false
}

const FILTER_HEADERS = [
  'host',
  'authorization',
  'satori-user-id',
  'satori-platform',
]

@Inject('http', true)
@Inject('server', true, { path: '/satori' })
@Inject('logger', true, { name: 'satori:server' })
class SatoriServer<C extends Context = Context> extends Service<C> {
  private buffer: Session[] = []

  constructor(ctx: C, public config: SatoriServer.Config) {
    super(ctx, 'satori.server')

    function checkAuth(req: Request, res: Response) {
      if (!config.token) return
      if (req.headers.get('authorization') !== `Bearer ${config.token}`) {
        res.body = 'invalid token'
        res.status = 403
        return true
      }
    }

    ctx.server.get('/v1/:name', async (req, res, next) => {
      const method = Universal.Methods[req.params.name]
      if (!method) return next()
      res.body = 'Please use POST method to send requests.'
      res.status = 405
    })

    ctx.server.post('/v1/:name', async (req, res) => {
      const method = Universal.Methods[req.params.name]
      if (!method) {
        res.body = 'method not found'
        res.status = 404
        return
      }

      if (checkAuth(req, res)) return

      const selfId = req.headers.get('satori-user-id')
      const platform = req.headers.get('satori-platform')
      const bot = ctx.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
      if (!bot) {
        res.body = 'login not found'
        res.status = 403
        return
      }

      if (method.name === 'createUpload') {
        const form = await req.formData()
        const blobs = [...form].map(([, value]) => {
          if (value instanceof File) return value
          return new Blob([value], { type: 'text/plain' })
        })
        const result = await bot.createUpload(...blobs)
        res.body = JSON.stringify(Object.fromEntries([...form].map(([key], index) => [key, result[index]])))
        res.headers.set('content-type', 'application/json')
        res.status = 200
        return
      }

      const json = await req.json()
      const args = method.fields.map(({ name }) => {
        if (name === 'referrer') return json[name]
        return Universal.transformKey(json[name], camelCase)
      })
      const result = await bot[method.name](...args)
      res.body = Universal.transformKey(result, snakeCase)
      res.status = 200
    })

    ctx.server.all('/v1/internal/*path', async (req, res) => {
      const url = new URL(`satori:${req.params.path}`)
      for (const [key, value] of req.query) {
        url.searchParams.append(key, value)
      }
      const headers = new Headers()
      for (const [key, value] of req.headers) {
        if (FILTER_HEADERS.includes(key)) continue
        headers.set(key, value as string)
      }
      const _req = new globalThis.Request(url, { headers, body: req.body })
      return ctx.satori.handleInternalRoute(_req)
    })

    ctx.server.get('/v1/proxy/*url', async (req, res) => {
      let url: URL
      try {
        url = new URL(req.params.url)
      } catch {
        res.body = 'invalid url'
        res.status = 400
        return
      }

      req.headers.set('access-control-allow-origin', ctx.server.config.selfUrl || '*')
      const proxyUrls = [...ctx.satori.proxyUrls]
      if (!proxyUrls.some(proxyUrl => url.href.startsWith(proxyUrl))) {
        res.body = 'forbidden'
        res.status = 403
        return
      }

      try {
        res.body = await ctx.http.get(url.href, { responseType: 'stream' })
      } catch (error) {
        if (!ctx.http.isError(error) || !error.response) throw error
        return error.response
      }
    })

    ctx.server.all('/v1/admin/*path', async (req, res) => {
      res.status = 301
      res.headers.set('location', `/v1/meta/${req.params.path}`)
    })

    ctx.server.post('/v1/meta', async (req, res) => {
      if (checkAuth(req, res)) return
      res.body = JSON.stringify(Universal.transformKey(ctx.satori.toJSON(), snakeCase))
      res.headers.set('content-type', 'application/json')
      res.status = 200
    })

    ctx.server.post('/v1/meta/webhook.create', async (req, res) => {
      if (checkAuth(req, res)) return
      const webhook: SatoriServer.Webhook = Universal.transformKey(await req.json(), camelCase)
      const index = config.webhooks.findIndex(({ url }) => url === webhook.url)
      if (index === -1) {
        config.webhooks.push(webhook)
        ctx.fiber.update(config)
      }
      res.body = JSON.stringify({})
      res.headers.set('content-type', 'application/json')
      res.status = 200
    })

    ctx.server.post('/v1/meta/webhook.delete', async (req, res) => {
      if (checkAuth(req, res)) return
      const body = await req.json()
      const index = config.webhooks.findIndex(webhook => webhook.url === body.url)
      if (index !== -1) {
        config.webhooks.splice(index, 1)
        ctx.fiber.update(config)
      }
      res.body = JSON.stringify({})
      res.headers.set('content-type', 'application/json')
      res.status = 200
    })

    const route = ctx.server.ws('/v1/events', async (req, next) => {
      const socket = await next()
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
            body: Universal.transformKey(ctx.satori.toJSON(), snakeCase),
          }))
          if (!payload.body?.sn) return
          for (const session of this.buffer) {
            if (session.id <= payload.body.sn) continue
            dispatch(socket, Universal.transformKey(session.toJSON(), snakeCase))
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

    function sendEvent(opcode: Universal.Opcode, body: any) {
      for (const socket of route.clients) {
        if (!socket[kClient]?.authorized) continue
        dispatch(socket, body)
      }
      for (const webhook of config.webhooks) {
        if (!webhook.enabled) continue
        ctx.http.post(webhook.url, body, {
          headers: {
            'Satori-Opcode': opcode,
            ...webhook.token ? {
              'Authorization': `Bearer ${webhook.token}`,
            } : {},
          },
        }).catch(ctx.logger.warn)
      }
    }

    ctx.on('internal/session', (session) => {
      const body = Universal.transformKey(session.toJSON(), snakeCase)
      sendEvent(Universal.Opcode.EVENT, body)
    })

    ctx.on('satori/meta', () => {
      const body = Universal.transformKey(ctx.satori.toJSON(true), snakeCase)
      sendEvent(Universal.Opcode.META, body)
    })
  }

  get url() {
    return (this.ctx.server.config.selfUrl ?? this.ctx.server.selfUrl) + this.config.path
  }

  * [Service.init]() {
    const timeout = setInterval(() => {
      while (this.buffer[0]?.timestamp! + this.config.websocket?.resumeTimeout! < Date.now()) {
        this.buffer.shift()
      }
    }, Time.second * 10)
    yield () => clearInterval(timeout)
  }
}

namespace SatoriServer {
  export interface ApiConfig {
    enabled?: boolean
  }

  export interface WebSocketConfig {
    enabled?: boolean
    resumeTimeout?: number
  }

  export interface Webhook {
    enabled?: boolean
    url: string
    token?: string
  }

  export const Webhook: Schema<Webhook> = Schema.object({
    enabled: Schema.boolean().default(true),
    url: Schema.string(),
    token: Schema.string(),
  })

  export interface Config {
    path: string
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
}

export default SatoriServer
