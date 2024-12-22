import { Binary, camelCase, Context, Dict, makeArray, sanitize, Schema, Service, Session, snakeCase, Time, Universal, valueMap } from '@satorijs/core'
import {} from '@cordisjs/plugin-server'
import WebSocket from 'ws'
import { Readable } from 'node:stream'
import { ReadableStream } from 'node:stream/web'
import { readFile } from 'node:fs/promises'
import { ParameterizedContext } from 'koa'

declare module 'cordis' {
  interface Context {
    'satori.server': SatoriServer
  }
}

declare module '@satorijs/core' {
  interface Satori {
    server: SatoriServer
  }
}

const kClient = Symbol('state')

class Client {
  authorized = false
}

function transformKey(source: any, callback: (key: string) => string) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(value => transformKey(value, callback))
  return Object.fromEntries(Object.entries(source).map(([key, value]) => {
    if (key.startsWith('_')) return [key, value]
    return [callback(key), transformKey(value, callback)]
  }))
}

function deserialize(data: any, path: string, blobs: Dict<Blob>) {
  if (path in blobs) return blobs[path]
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) {
    return data.map((value, index) => deserialize(value, `${path}.${index}`, blobs))
  }
  return valueMap(data, (value, key) => {
    return deserialize(value, `${path}.${key}`, blobs)
  })
}

class SatoriServer extends Service<SatoriServer.Config> {
  static inject = ['server', 'http']

  constructor(ctx: Context, public config: SatoriServer.Config) {
    super(ctx, 'satori.server', true)
    const logger = ctx.logger('server')
    const path = sanitize(config.path)

    function checkAuth(koa: ParameterizedContext) {
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
        return transformKey(json[name], camelCase)
      })
      const result = await bot[method.name](...args)
      koa.body = transformKey(result, snakeCase)
      koa.status = 200
    })

    ctx.server.post(path + '/v1/internal/:name', async (koa) => {
      if (checkAuth(koa)) return

      const selfId = koa.request.headers['x-self-id']
      const platform = koa.request.headers['x-platform']
      const bot = ctx.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
      if (!bot) {
        koa.body = 'login not found'
        koa.status = 403
        return
      }

      const name = camelCase(koa.params.name)
      if (!bot.internal?.[name]) {
        koa.body = 'method not found'
        koa.status = 404
        return
      }
      try {
        let args = koa.request.body
        if (koa.request.files) {
          const blobs = Object.fromEntries(await Promise.all(Object.entries(koa.request.files).map(async ([key, value]) => {
            value = makeArray(value)[0]
            const buffer = await readFile(value.filepath)
            return [key, new File([buffer], value.originalFilename!, { type: value.mimetype! })] as const
          })))
          args = deserialize(JSON.parse(koa.request.body.$), '$', blobs)
        }
        const result = await bot.internal[name](...args)
        koa.body = result
        koa.status = 200
      } catch (error) {
        if (!ctx.http.isError(error) || !error.response) throw error
        koa.status = error.response.status
        koa.body = error.response.data
        for (const [key, value] of error.response.headers) {
          koa.set(key, value)
        }
      }
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
      if (url.protocol === 'satori:') {
        const { status, statusText, data, headers } = await ctx.satori.handleVirtualRoute('GET', url)
        koa.status = status
        for (const [key, value] of headers || new Headers()) {
          koa.set(key, value)
        }
        if (status >= 200 && status < 300) {
          koa.body = data instanceof ReadableStream ? Readable.fromWeb(data) : data ? Buffer.from(data) : null
        } else {
          koa.body = statusText
        }
      } else {
        const proxyUrls = ctx.bots.flatMap(bot => bot.proxyUrls)
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
      }
    })

    ctx.server.post(path + '/v1/admin/login.list', async (koa) => {
      if (checkAuth(koa)) return
      koa.body = transformKey(ctx.bots.map(bot => bot.toJSON()), snakeCase)
      koa.status = 200
    })

    ctx.server.post(path + '/v1/admin/webhook.create', async (koa) => {
      if (checkAuth(koa)) return
      const webhook: SatoriServer.Webhook = transformKey(koa.request.body, camelCase)
      const index = config.webhooks.findIndex(({ url }) => url === webhook.url)
      if (index === -1) {
        config.webhooks.push(webhook)
        ctx.scope.update(config, false)
      }
      koa.body = {}
      koa.status = 200
    })

    ctx.server.post(path + '/v1/admin/webhook.delete', async (koa) => {
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
        ctx.http.post(webhook.url, body, {
          headers: webhook.token ? {
            Authorization: `Bearer ${webhook.token}`,
          } : {},
        }).catch(logger.warn)
      }
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
