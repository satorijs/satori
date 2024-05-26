import { Binary, camelCase, Context, makeArray, sanitize, Schema, Service, Session, snakeCase, Time, Universal } from '@satorijs/core'
import {} from '@cordisjs/plugin-server'
import WebSocket from 'ws'
import { Readable } from 'node:stream'
import { ReadableStream } from 'node:stream/web'
import { readFile } from 'node:fs/promises'

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

class SatoriServer extends Service<SatoriServer.Config> {
  static inject = ['server', 'http']

  constructor(ctx: Context, public config: SatoriServer.Config) {
    super(ctx, 'satori.server', true)
    const logger = ctx.logger('server')
    const path = sanitize(config.path)

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

      if (config.token) {
        if (koa.request.headers.authorization !== `Bearer ${config.token}`) {
          koa.body = 'invalid token'
          koa.status = 403
          return
        }
      }

      const selfId = koa.request.headers['x-self-id']
      const platform = koa.request.headers['x-platform']
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
      const result = await bot.internal[name](...koa.request.body)
      koa.body = result
      koa.status = 200
    })

    ctx.server.get(path + '/v1/proxy/:url(.+)', async (koa) => {
      const url = koa.params.url
      try {
        new URL(url)
      } catch {
        koa.body = 'invalid url'
        koa.status = 400
        return
      }

      const proxyUrls = ctx.bots.flatMap(bot => bot.proxyUrls, 1)
      if (!proxyUrls.some(proxyUrl => url.startsWith(proxyUrl))) {
        koa.body = 'forbidden'
        koa.status = 403
        return
      }

      koa.header['Access-Control-Allow-Origin'] = ctx.server.config.selfUrl || '*'
      if (url.startsWith('upload://')) {
        const { status, statusText, data, headers } = await ctx.satori.download(url.slice(9))
        koa.status = status
        for (const [key, value] of headers || new Headers()) {
          koa.set(key, value)
        }
        if (status >= 200 && status < 300) {
          koa.body = data instanceof ReadableStream ? Readable.fromWeb(data) : data
        } else {
          koa.body = statusText
        }
      } else {
        try {
          koa.body = Readable.fromWeb(await ctx.http.get(koa.params.url, { responseType: 'stream' }))
        } catch (error) {
          if (!ctx.http.isError(error) || !error.response) throw error
          koa.status = error.response.status
          koa.body = error.response.data
        }
      }
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
        ctx.http.post(webhook.endpoint, body, {
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
    endpoint: string
    token?: string
  }

  export const Webhook: Schema<Webhook> = Schema.object({
    enabled: Schema.boolean().default(true),
    endpoint: Schema.string(),
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
