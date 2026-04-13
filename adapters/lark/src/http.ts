import { Adapter, Context, Logger } from '@satorijs/core'
import type {} from '@cordisjs/plugin-server'
import { LarkBot } from './bot'
import { adaptSession, Cipher, EventPayload } from './utils'
import z from 'schemastery'

export class HttpServer extends Adapter<C, LarkBot<C, LarkBot.BaseConfig & HttpServer.Options>> {
  static inject = ['server']

  private logger: Logger
  private ciphers: Record<string, Cipher> = {}

  constructor(ctx: Context, bot: LarkBot) {
    super(ctx)
    this.logger = ctx.logger('lark')
  }

  fork(ctx: Context, bot: LarkBot<C, LarkBot.BaseConfig & HttpServer.Options>) {
    super.fork(ctx, bot)

    this._refreshCipher()
    return bot.initialize()
  }

  async connect(bot: LarkBot<C, LarkBot.BaseConfig & HttpServer.Options>) {
    const { path } = bot.config
    this.ctx.server.post(path, async (req, res) => {
      this._refreshCipher()

      const rawBody = await req.text()
      const parsedBody = JSON.parse(rawBody)

      // compare signature if encryptKey is set
      // But not every message contains signature
      // https://open.larksuite.com/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case#d41e8916
      const signature = req.headers.get('X-Lark-Signature')
      const enabledSignatureVerify = this.bots.filter((bot) => bot.config.verifySignature)
      if (signature && enabledSignatureVerify.length) {
        const result = enabledSignatureVerify.some((bot) => {
          const timestamp = req.headers.get('X-Lark-Request-Timestamp')
          const nonce = req.headers.get('X-Lark-Request-Nonce')
          const actualSignature = this.ciphers[bot.config.appId]?.calculateSignature(timestamp, nonce, rawBody)
          if (actualSignature === signature) return true
          else return false
        })
        if (!result) {
          res.status = 403
          return
        }
      }

      // only accept JSON body
      if (!req.headers.get('content-type')?.includes('json')) {
        res.status = 415
        return
      }

      // try to decrypt message first if encryptKey is set
      const body = this._tryDecryptBody(parsedBody)
      // respond challenge message
      // https://open.larksuite.com/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case
      if (body?.type === 'url_verification' && body?.challenge && typeof body.challenge === 'string') {
        res.headers.set('content-type', 'application/json')
        res.body = JSON.stringify({ challenge: body.challenge })
        return
      }

      // compare verification token
      const enabledVerifyTokenVerify = this.bots.filter((bot) => bot.config.verifyToken && bot.config.verificationToken)
      if (enabledVerifyTokenVerify.length) {
        const token = parsedBody?.token
        // only compare token if token exists
        if (token) {
          const result = enabledVerifyTokenVerify.some((bot) => {
            if (token === bot.config.verificationToken) return true
            else return false
          })
          if (!result) {
            res.status = 403
            return
          }
        }
      }

      // dispatch message
      bot.logger.debug('received decrypted event: %o', body)
      this.dispatchSession(body)

      // Lark requires 200 OK response to make sure event is received
      res.headers.set('content-type', 'application/json')
      res.body = JSON.stringify({})
      res.status = 200
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
    protocol: 'http'
    selfUrl?: string
    path?: string
    encryptKey?: string
    verificationToken?: string
    verifyToken?: boolean
    verifySignature?: boolean
  }

  export const createConfig = (path: string): z<Options> => z.object({
    protocol: z.const('http'),
    path: z.string().role('url').description('要连接的服务器地址。').default(path),
    selfUrl: z.string().role('link').description('服务器暴露在公网的地址。缺省时将使用全局配置。'),
    encryptKey: z.string().role('secret').description('机器人的 Encrypt Key。'),
    verificationToken: z.string().description('事件推送的验证令牌。'),
    verifyToken: z.boolean().description('是否验证令牌。'),
    verifySignature: z.boolean().description('是否验证签名。'),
  }).description('服务端设置')
}
