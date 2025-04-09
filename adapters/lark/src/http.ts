import { Adapter, Context, Logger, Schema } from '@satorijs/core'
import {} from '@cordisjs/plugin-server'
import { LarkBot } from './bot'
import { adaptSession, Cipher, EventPayload } from './utils'

export class HttpServer<C extends Context = Context> extends Adapter<C, LarkBot<C>> {
  static inject = ['server']

  private logger: Logger
  private ciphers: Record<string, Cipher> = {}

  constructor(ctx: C, bot: LarkBot<C>) {
    super(ctx)
    this.logger = ctx.logger('lark')
  }

  fork(ctx: C, bot: LarkBot<C>) {
    super.fork(ctx, bot)

    this._refreshCipher()
    return bot.initialize()
  }

  async connect(bot: LarkBot) {
    const { path } = bot.config
    bot.ctx.server.post(path, (ctx) => {
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
          const body = ctx.request.body[Symbol.for('unparsedBody')]
          const actualSignature = this.ciphers[bot.config.appId]?.calculateSignature(timestamp, nonce, body)
          if (actualSignature === signature) return true
          else return false
        })
        if (!result) return (ctx.status = 403)
      }

      // only accept JSON body
      if (!ctx.request.is('json')) return ctx.status = 415

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
      bot.logger.debug('received decryped event: %o', body)
      this.dispatchSession(body)

      // Lark requires 200 OK response to make sure event is received
      ctx.body = {}
      return ctx.status = 200
    })
  }

  async dispatchSession(body: EventPayload) {
    const { header } = body
    if (!header) return
    const { app_id, event_type } = header
    body.type = event_type // add type to body to ease typescript type narrowing
    const bot = this.bots.find((bot) => bot.config.appId === app_id)!
    const session = await adaptSession(bot, body)
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
      this.logger.warn('failed to decrypt message: %o', body)
    }

    if (typeof body.encrypt === 'string' && !ciphers.length) {
      this.logger.warn('encryptKey is not set, but received encrypted message: %o', body)
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
  export interface Options {
    selfUrl?: string
    path?: string
    verifyToken?: boolean
    verifySignature?: boolean
  }

  export const createConfig = (path: string): Schema<Options> => Schema.object({
    path: Schema.string().role('url').description('要连接的服务器地址。').default(path),
    selfUrl: Schema.string().role('link').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
    verifyToken: Schema.boolean().description('是否验证令牌。'),
    verifySignature: Schema.boolean().description('是否验证签名。'),
  }).description('服务端设置')
}
