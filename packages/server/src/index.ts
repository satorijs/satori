import { Context, Schema, Service, Session, Universal } from '@satorijs/core'
import { Binary, camelCase, defineProperty, makeArray, sanitize, snakeCase, Time } from 'cosmokit'
import {} from '@cordisjs/plugin-server'
import WebSocket from 'ws'
import { Readable } from 'node:stream'
import { readFile } from 'node:fs/promises'
import { DefaultState, Middleware, ParameterizedContext } from 'koa'

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
  'x-self-id',
  'x-platform',
]

class SatoriServer extends Service<SatoriServer.Config> {
  static inject = ['server', 'http']

  constructor(ctx: Context, public config: SatoriServer.Config) {
    super(ctx, 'satori.server', true)
    const logger = ctx.logger('server')
    const path = sanitize(config.path)

    function checkAuth<T>(koa: ParameterizedContext<DefaultState, T, unknown>) {
      if (!config.token) return
      if (koa.request.headers.authorization !== `Bearer ${config.token}`) {
        koa.body = 'invalid token'
        koa.status = 403
        return true
      }
    }

    ctx.server.get(path + '/v1/:name', async (koa, next) => {
      const method = Universal.Methods[koa.params.name]
      if (!method) return next()
      koa.body = 'Please use POST method to send requests.'
      koa.status = 405
    })

    ctx.server.post(path + '/v1/:name', async (koa) => {
      const method = Universal.Methods[koa.params.name]
      if (!method) {
        koa.body = 'method not found'
        koa.status = 404
        return
      }

      if (checkAuth(koa)) return

      const selfId = koa.request.headers['satori-user-id'] ?? koa.request.headers['x-self-id']
      const platform = koa.request.headers['satori-platform'] ?? koa.request.headers['x-platform']
      const bot = ctx.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
      if (!bot) {
        koa.body = 'login not found'
        koa.status = 403
        return
      }

      if (method.name === 'createUpload') {
        const entries = Object.entries(koa.request.files ?? {}).map(([key, value]) => {
          return [key, makeArray(value)[0]] as const
        })
        const uploads = await Promise.all(entries.map<Promise<Universal.Upload>>(async ([, file]) => {
          const buffer = await readFile(file.filepath)
          return {
            data: Binary.fromSource(buffer),
            type: file.mimetype!,
            filename: file.newFilename,
          }
        }))
        const result = await bot.createUpload(...uploads)
        koa.body = Object.fromEntries(entries.map(([key], index) => [key, result[index]]))
        koa.status = 200
        return
      }

      const json = koa.request.body
      const args = method.fields.map(({ name }) => {
        if (name === 'referrer') return json[name]
        return Universal.transformKey(json[name], camelCase)
      })
      const result = await bot[method.name](...args)
      koa.body = Universal.transformKey(result, snakeCase)
      koa.status = 200
    })

    const marker: Middleware = defineProperty((_, next) => next(), Symbol.for('noParseBody'), true)

    ctx.server.all(path + '/v1/internal/:path(.+)', marker, async (koa) => {
      const url = new URL(`internal:${koa.params.path}`)
      for (const [key, value] of Object.entries(koa.query)) {
        for (const item of makeArray(value)) {
          url.searchParams.append(key, item)
        }
      }

      const headers = new Headers()
      for (const [key, value] of Object.entries(koa.headers)) {
        if (FILTER_HEADERS.includes(key)) continue
        headers.set(key, value as string)
      }

      const buffers: any[] = []
      for await (const chunk of koa.req) {
        buffers.push(chunk)
      }
      const body = Binary.fromSource(Buffer.concat(buffers))
      const response = await ctx.satori.handleInternalRoute(koa.method as any, url, headers, body)
      for (const [key, value] of response.headers ?? new Headers()) {
        koa.set(key, value)
      }
      koa.status = response.status
      koa.body = response.body ? Buffer.from(response.body) : ''
    })

    ctx.server.get(path + '/v1/proxy/:url(.+)', async (koa) => {
      let url: URL
      try {
        url = new URL(koa.params.url)
      } catch {
        koa.body = 'invalid url'
        koa.status = 400
        return
      }

      koa.header['Access-Control-Allow-Origin'] = ctx.server.config.selfUrl || '*'
      const proxyUrls = [...ctx.satori.proxyUrls]
      if (!proxyUrls.some(proxyUrl => url.href.startsWith(proxyUrl))) {
        koa.body = 'forbidden'
        koa.status = 403
        return
      }

      try {
        koa.body = Readable.fromWeb(await ctx.http.get(url.href, { responseType: 'stream' }))
      } catch (error) {
        if (!ctx.http.isError(error) || !error.response) throw error
        koa.status = error.response.status
        koa.body = error.response.data
        for (const [key, value] of error.response.headers) {
          koa.set(key, value)
        }
      }
    })

    ctx.server.all(path + '/v1/admin/:path(.+)', async (koa) => {
      koa.redirect(`${path}/v1/meta/${koa.params.path}`)
    })

    ctx.server.post(path + '/v1/meta', async (koa) => {
      if (checkAuth(koa)) return
      koa.body = Universal.transformKey(ctx.satori.toJSON(), snakeCase)
      koa.status = 200
    })

    ctx.server.post(path + '/v1/meta/webhook.create', async (koa) => {
      if (checkAuth(koa)) return
      const webhook: SatoriServer.Webhook = Universal.transformKey(koa.request.body, camelCase)
      const index = config.webhooks.findIndex(({ url }) => url === webhook.url)
      if (index === -1) {
        config.webhooks.push(webhook)
        ctx.scope.update(config, false)
      }
      koa.body = {}
      koa.status = 200
    })

    ctx.server.post(path + '/v1/meta/webhook.delete', async (koa) => {
      if (checkAuth(koa)) return
      const url = koa.request.body.url
      const index = config.webhooks.findIndex(webhook => webhook.url === url)
      if (index !== -1) {
        config.webhooks.splice(index, 1)
        ctx.scope.update(config, false)
      }
      koa.body = {}
      koa.status = 200
    })

    const buffer: Session[] = []

    const timeout = setInterval(() => {
      while (buffer[0]?.timestamp! + config.websocket?.resumeTimeout! < Date.now()) {
        buffer.shift()
      }
    }, Time.second * 10)

    ctx.on('dispose', () => clearInterval(timeout))

    const layer = ctx.server.ws(path + '/v1/events', (socket) => {
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
          for (const session of buffer) {
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
      for (const socket of layer.clients) {
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
        }).catch(logger.warn)
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
