import { Adapter, Context } from '@satorijs/core'
import { Schema, Logger } from '@satorijs/satori'
import internal from 'stream'

import { FeishuBot } from './bot'
import { AllEvents } from './types'
import { adaptSession, Cipher } from './utils'

const logger = new Logger('feishu')

export class HttpServer extends Adapter.Server<FeishuBot> {
  private ciphers: Record<string, Cipher> = {}

  fork(ctx: Context, bot: FeishuBot) {
    super.fork(ctx, bot)

    this._refreshCipher()
    return bot.initialize()
  }

  async start(bot: FeishuBot) {
    const { path = '/feishu' } = bot.config
    bot.ctx.router.post(path, (ctx) => {
      this._refreshCipher()

      // // compare signature if encryptKey is set
      // // But not every message contains signature
      // // https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-security-verification
      // const signature = firstOrDefault(ctx.headers['X-Lark-Signature'])
      // if (encryptKey && signature) {
      //   const timestamp = firstOrDefault(ctx.headers['X-Lark-Request-Timestamp'])
      //   const nonce = firstOrDefault(ctx.headers['X-Lark-Request-Nonce'])
      //   const body = ctx.request.rawBody
      //   const actualSignature = this.cipher.calculateSignature(timestamp, nonce, body)
      //   if (signature !== actualSignature) return (ctx.status = 403)
      // }

      // try to decrypt message first if encryptKey is set
      const body = this._tryDecryptBody(ctx.request.body)
      // respond challenge message
      // https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case
      if (body?.type === 'url_verification' && body?.challenge && typeof body.challenge === 'string') {
        ctx.response.body = { challenge: body.challenge }
        return
      }

      // Feishu requires 200 OK response to make sure event is received
      ctx.body = 'OK'
      ctx.status = 200

      // dispatch message
      const decryped = this._tryDecryptBody(ctx.request.body)
      logger.debug('received decryped event: %o', decryped)
      this.dispatchSession(decryped)
    })

    bot.ctx.router.get(path + '/assets/:type/:message_id/:key', async (ctx) => {
      const type = ctx.params.type === 'image' ? 'image' : 'file'
      const key = ctx.params.key
      const messageId = ctx.params.message_id
      const selfId = ctx.request.query.self_id
      const bot = this.bots.find((bot) => bot.selfId === selfId)
      if (!bot) return ctx.status = 404

      const resp = await bot.http.axios<internal.Readable>(`/im/v1/messages/${messageId}/resources/${key}`, {
        method: 'GET',
        params: { type },
        responseType: 'stream',
      })

      ctx.status = 200
      ctx.response.headers['Content-Type'] = resp.headers['content-type']
      ctx.response.body = resp.data
    })
  }

  async stop() {
    logger.debug('http server stopped')
  }

  dispatchSession(body: AllEvents): void {
    const { header } = body
    const { app_id, event_type } = header
    body.type = event_type // add type to body to ease typescript type narrowing
    const bot = this.bots.find((bot) => bot.selfId === app_id)
    const session = adaptSession(bot, body)
    bot.dispatch(session)
  }

  private _tryDecryptBody(body: any): any {
    this._refreshCipher()
    // try to decrypt message if encryptKey is set
    // https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case
    const ciphers = Object.values(this.ciphers)
    if (ciphers.length && typeof body.encrypt === 'string') {
      for (const cipher of ciphers) {
        try {
          return JSON.parse(cipher.decrypt(body.encrypt))
        } catch {}
      }
      logger.warn('failed to decrypt message: %o', body)
    }

    if (typeof body.encrypt === 'string' && !ciphers.length) {
      logger.warn('encryptKey is not set, but received encrypted message: %o', body)
    }

    return body
  }

  private _refreshCipher(): void {
    const ciphers = Object.keys(this.ciphers)
    const bots = this.bots.map((bot) => bot.config.appId)
    if (bots.length === ciphers.length && bots.every((bot) => ciphers.includes(bot))) return

    this.ciphers = {}
    for (const bot of this.bots) {
      this.ciphers[bot.config.appId] = new Cipher(bot.config.encryptKey)
    }
  }
}

export namespace HttpServer {
  export interface Config {
    selfUrl?: string
    verifyToken?: boolean
    verifySignature?: boolean
  }

  export const Config: Schema<HttpServer.Config> = Schema.object({
    selfUrl: Schema.string().role('link').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
    verifyToken: Schema.boolean().description('是否验证 Varification Token'),
    verifySignature: Schema.boolean().description('是否验证 Signature'),
  })
}

// function firstOrDefault(arg: string | string[]): string {
//   if (Array.isArray(arg)) {
//     return arg[0]
//   }
//   return arg
// }
