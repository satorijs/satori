import { Context } from '@satorijs/core'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import { LarkBot } from './bot'
import { adaptSession, Cipher, EventPayload } from './utils'
import z from 'schemastery'

export class HttpServer {
  static inject = ['server']

  private cipher?: Cipher

  constructor(public ctx: Context, public bot: LarkBot<LarkBot.BaseConfig & HttpServer.Options>) {
    bot.adapter = this
    if (bot.config.encryptKey) {
      this.cipher = new Cipher(bot.config.encryptKey)
    }
  }

  async connect() {
    const bot = this.bot
    const { path } = bot.config
    this.ctx.server.post(path, async (req, res, next) => {
      const rawBody = await req.text()
      const parsedBody = JSON.parse(rawBody)

      // compare signature if encryptKey is set
      // But not every message contains signature
      // https://open.larksuite.com/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case#d41e8916
      const signature = req.headers.get('X-Lark-Signature')
      if (signature && bot.config.verifySignature) {
        const timestamp = req.headers.get('X-Lark-Request-Timestamp')
        const nonce = req.headers.get('X-Lark-Request-Nonce')
        const actualSignature = this.cipher?.calculateSignature(timestamp, nonce, rawBody)
        if (actualSignature !== signature) {
          const result = await next()
          if (result) return result
          if (!res.claimed) res.status = 403
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
      if (bot.config.verifyToken && bot.config.verificationToken) {
        const token = parsedBody?.token
        // only compare token if token exists
        if (token && token !== bot.config.verificationToken) {
          const result = await next()
          if (result) return result
          if (!res.claimed) res.status = 403
          return
        }
      }

      // verify app_id matches this bot
      const appId = body?.header?.app_id
      if (appId && appId !== bot.config.appId) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      // dispatch message
      bot.ctx.logger.debug('received decrypted event: %o', body)
      this.dispatchSession(body)

      // Lark requires 200 OK response to make sure event is received
      res.headers.set('content-type', 'application/json')
      res.body = JSON.stringify({})
      res.status = 200
    })

    await bot.initialize()
  }

  async disconnect() {}

  async dispatchSession(body: EventPayload) {
    const { header } = body
    if (!header) return
    const { event_type } = header
    body.type = event_type // add type to body to ease typescript type narrowing
    const session = await adaptSession(this.bot, body)
    this.bot.dispatch(session)
  }

  private _tryDecryptBody(body: any): any {
    // try to decrypt message if encryptKey is set
    // https://open.larksuite.com/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case
    if (this.cipher && typeof body.encrypt === 'string') {
      try {
        return JSON.parse(this.cipher.decrypt(body.encrypt))
      } catch {
        this.ctx.logger.warn('failed to decrypt message: %o', body)
      }
    }

    if (typeof body.encrypt === 'string' && !this.cipher) {
      this.ctx.logger.warn('encryptKey is not set, but received encrypted message: %o', body)
    }

    return body
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
