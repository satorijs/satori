import internal from 'stream'

import { Adapter, Context, Logger, Schema } from '@satorijs/satori'

import { FeishuBot } from './bot'
import { AllEvents } from './types'
import { adaptSession, Cipher } from './utils'

const logger = new Logger('lark')

export class HttpServer<C extends Context = Context> extends Adapter<C, FeishuBot<C>> {
  static inject = ['router']

  private ciphers: Record<string, Cipher> = {}

  fork(ctx: C, bot: FeishuBot<C>) {
    super.fork(ctx, bot)

    this._refreshCipher()
    return bot.initialize()
  }

  async connect(bot: FeishuBot) {
    const { path } = bot.config
    bot.ctx.router.post(path, (ctx) => {
      this._refreshCipher()

      // compare signature if encryptKey is set
      // But not every message contains signature
      // https://open.larksuite.com/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case#d41e8916
      const signature = ctx.get('X-Lark-Signature')
      const enabledSignatureVerify = this.bots.filter((bot) => bot.config.verifySignature)
      if (signature && enabledSignatureVerify.length) {
        const result = enabledSignatureVerify.some((bot) => {
          const timestamp = ctx.get('X-Lark-Request-Timestamp')
          const nonce = ctx.get('X-Lark-Request-Nonce')
          const body = ctx.request.rawBody
          const actualSignature = this.ciphers[bot.config.appId]?.calculateSignature(timestamp, nonce, body)
          if (actualSignature === signature) return true
          else return false
        })
        if (!result) return (ctx.status = 403)
      }

      // try to decrypt message first if encryptKey is set
      const body = this._tryDecryptBody(ctx.request.body)
      // respond challenge message
      // https://open.larksuite.com/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case
      if (body?.type === 'url_verification' && body?.challenge && typeof body.challenge === 'string') {
        ctx.response.body = { challenge: body.challenge }
        return
      }

      // compare verification token
      const enabledVerifyTokenVerify = this.bots.filter((bot) => bot.config.verifyToken && bot.config.verificationToken)
      if (enabledVerifyTokenVerify.length) {
        const token = ctx.request.body?.token
        // only compare token if token exists
        if (token) {
          const result = enabledVerifyTokenVerify.some((bot) => {
            if (token === bot.config.verificationToken) return true
            else return false
          })
          if (!result) return (ctx.status = 403)
        }
      }

      // dispatch message
      logger.debug('received decryped event: %o', body)
      this.dispatchSession(body)

      // Lark requires 200 OK response to make sure event is received
      return ctx.status = 200
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

  dispatchSession(body: AllEvents): void {
    const { header } = body
    if (!header) return
    const { app_id, event_type } = header
    body.type = event_type // add type to body to ease typescript type narrowing
    const bot = this.bots.find((bot) => bot.selfId === app_id)
    const session = adaptSession(bot, body)
    bot.dispatch(session)
  }

  private _tryDecryptBody(body: any): any {
    this._refreshCipher()
    // try to decrypt message if encryptKey is set
    // https://open.larksuite.com/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case
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
    path?: string
    verifyToken?: boolean
    verifySignature?: boolean
  }

  export const createConfig = (path: string): Schema<Config> => Schema.object({
    path: Schema.string().role('url').description('要连接的服务器地址。').default(path),
    selfUrl: Schema.string().role('link').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
    verifyToken: Schema.boolean().description('是否验证令牌。'),
    verifySignature: Schema.boolean().description('是否验证签名。'),
  }).description('服务端设置')
}
