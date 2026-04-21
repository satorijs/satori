import { Binary, Context, Universal } from '@satorijs/core'
import { getPublicKeyAsync, signAsync, verifyAsync } from '@noble/ed25519'
import { QQBot } from './bot'
import { Opcode, Payload } from './types'
import { adaptSession } from './utils'
import { } from '@cordisjs/plugin-server'
import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import z from 'schemastery'

export class HttpServer {
  static inject = ['server']

  constructor(public ctx: Context, public bot: QQBot) {
    bot.adapter = this
  }

  async connect() {
    const bot = this.bot
    if (bot.config.authType === 'bearer') {
      await bot.getAccessToken()
    }
    await this.initialize(bot)

    bot.ctx.server.post(bot.config.path, async (req, res, next) => {
      if (req.headers.get('X-Bot-Appid') !== bot.config.id) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      res.status = 200
      const rawBody = await req.text()
      const payload: Payload = JSON.parse(rawBody)
      if (payload.op === Opcode.ADDRESS_VERIFICATION) {
        const key = this.getPrivateKey(bot.config.secret)
        const data = payload.d.event_ts + payload.d.plain_token
        const sig = await signAsync(new TextEncoder().encode(data), key)
        res.headers.set('content-type', 'application/json')
        res.body = JSON.stringify({
          plain_token: payload.d.plain_token,
          signature: Binary.toHex(sig.buffer),
        })
        return
      } else if (payload.op === Opcode.DISPATCH) {
        // https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/sign.html
        const key = this.getPrivateKey(bot.config.secret)
        if (!(await this.verify(key, req.headers, rawBody))) {
          res.status = 403
          return
        }

        if (bot.status !== Universal.Status.ONLINE) {
          await this.initialize(bot)
        }
        bot.dispatch(bot.session({
          type: 'internal',
          _type: 'qq/' + payload.t.toLowerCase().replace(/_/g, '-'),
          _data: payload.d,
        }))
        const session = await adaptSession(bot, payload)
        if (session) bot.dispatch(session)
      }

      res.headers.set('content-type', 'application/json')
      res.body = JSON.stringify({
        d: {},
        op: Opcode.HTTP_CALLBACK_ACK,
      })
    })
  }

  async disconnect() {}

  async initialize(bot: QQBot) {
    try {
      await bot.initialize()
      bot.online()
    } catch (e) {
      if (bot.http.isError(e) && e.response) {
        const body = await e.response.json().catch(() => null)
        bot.ctx.logger.warn(`GET /users/@me response: %o`, body)
      } else {
        bot.ctx.logger.warn(e)
      }
      bot.offline()
    }
  }

  private getPrivateKey(secret: string) {
    const seedSize = 32
    let seed = secret
    if (seed.length < seedSize) {
      seed = seed + seed.slice(0, seedSize - seed.length)
    }
    return new TextEncoder().encode(seed)
  }

  private async verify(privateKey: Uint8Array, headers: Headers, body: string) {
    const sig = Binary.fromHex(headers.get('x-signature-ed25519')!)
    const timestamp = headers.get('x-signature-timestamp')!
    const msg = timestamp + body
    const pubKey = await getPublicKeyAsync(privateKey)
    return verifyAsync(new Uint8Array(sig), new TextEncoder().encode(msg), pubKey)
  }
}

export namespace HttpServer {
  export interface Options {
    protocol: 'webhook'
    path: string
  }

  export const Options: z<Options> = z.object({
    protocol: z.const('webhook').required(),
    path: z.string().role('url').description('服务器监听的路径。').default('/qq'),
  })
}
