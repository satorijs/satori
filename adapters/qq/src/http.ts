import { Adapter, Binary, Context, Schema, Universal } from '@satorijs/core'
import { getPublicKeyAsync, signAsync, verifyAsync } from '@noble/ed25519'
import { QQBot } from './bot'
import { Opcode, Payload } from './types'
import { adaptSession } from './utils'
import { IncomingHttpHeaders } from 'node:http'
import { } from '@cordisjs/plugin-server'

export class HttpServer<C extends Context = Context> extends Adapter<C, QQBot<C>> {
  static inject = ['server']

  async connect(bot: QQBot) {
    if (bot.config.authType === 'bearer') {
      await bot.getAccessToken()
    }
    await this.initialize(bot)

    bot.ctx.server.post(bot.config.path, async (ctx) => {
      const bot = this.bots.find(bot => bot.config.id === ctx.get('X-Bot-Appid'))
      if (!bot) return ctx.status = 403

      ctx.status = 200
      const payload: Payload = ctx.request.body
      if (payload.op === Opcode.ADDRESS_VERIFICATION) {
        const key = this.getPrivateKey(bot.config.secret)
        const data = payload.d.event_ts + payload.d.plain_token
        const sig = await signAsync(new TextEncoder().encode(data), key)
        return ctx.body = {
          plain_token: payload.d.plain_token,
          signature: Binary.toHex(sig),
        }
      } else if (payload.op === Opcode.DISPATCH) {
        // https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/sign.html
        const key = this.getPrivateKey(bot.config.secret)
        const body = ctx.request.body[Symbol.for('unparsedBody')]
        if (!(await this.verify(key, ctx.request.header, body))) {
          return ctx.status = 403
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

      ctx.body = {
        d: {},
        op: Opcode.HTTP_CALLBACK_ACK,
      }
    })
  }

  async initialize(bot: QQBot) {
    try {
      await bot.initialize()
      bot.online()
    } catch (e) {
      if (bot.http.isError(e) && e.response) {
        bot.logger.warn(`GET /users/@me response: %o`, e.response.data)
      } else {
        bot.logger.warn(e)
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

  private async verify(privateKey: Uint8Array, header: IncomingHttpHeaders, body: string) {
    const sig = Binary.fromHex(header['x-signature-ed25519'] as string)
    const timestamp = header['x-signature-timestamp'] as string
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

  export const Options: Schema<Options> = Schema.object({
    protocol: Schema.const('webhook').required(),
    path: Schema.string().role('url').description('服务器监听的路径。').default('/qq'),
  })
}
