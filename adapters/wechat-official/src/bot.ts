import { Bot, Context, Inject } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import xml2js from 'xml2js'
import { decrypt, encrypt, getSignature } from '@wecom/crypto'
import { WechatOfficialMessageEncoder } from './message'
import { Message } from './types'
import { decodeMessage } from './utils'
// import { Internal } from './types/internal'
import z from 'schemastery'

@Inject('http', true, { baseUrl: 'https://api.weixin.qq.com/' })
@Inject('logger', true, { name: 'wechat-official' })
export class WechatOfficialBot extends Bot<WechatOfficialBot.Config> {
  static inject = ['server']
  static MessageEncoder = WechatOfficialMessageEncoder

  http: HTTP
  // internal: Internal
  refreshTokenTimer: NodeJS.Timeout

  constructor(ctx: Context, config: WechatOfficialBot.Config) {
    super(ctx, config, 'wechat-official')
    this.selfId = config.account
    this.http = ctx.http
    // this.internal = new Internal(this.http, this)

    this.defineInternalRoute('/assets/:media_id', async ({ params }) => {
      const resp = await this.http('/cgi-bin/media/get', {
        method: 'GET',
        params: { access_token: this.token, media_id: params.media_id },
      })
      return new Response(resp.body, {
        headers: {
          'content-type': resp.headers.get('content-type')!,
          'cache-control': resp.headers.get('cache-control')!,
        },
      })
    })
  }

  async connect() {
    await this.refreshToken()
    await this.ensureCustom()

    // https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html
    this.ctx.server.get('/wechat-official', async (req, res, next) => {
      const signature = req.query.get('signature')
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const echostr = req.query.get('echostr')

      const localSign = getSignature(this.config.token, timestamp, nonce, '')
      if (localSign !== signature) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      res.status = 200
      res.body = echostr
    })

    this.ctx.server.post('/wechat-official', async (req, res, next) => {
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const msg_signature = req.query.get('msg_signature')
      const rawBody = await req.text()
      this.ctx.logger.debug('%c', rawBody)
      let { xml: data }: {
        xml: Message
      } = await xml2js.parseStringPromise(rawBody, {
        explicitArray: false,
      })
      if (data.ToUserName !== this.selfId) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      if (data.Encrypt) {
        const localSign = getSignature(this.config.token, timestamp, nonce, data.Encrypt)
        if (localSign !== msg_signature) {
          const result = await next()
          if (result) return result
          if (!res.claimed) res.status = 403
          return
        }
        const { message, id } = decrypt(this.config.aesKey, data.Encrypt)
        if (id !== this.config.appid) {
          const result = await next()
          if (result) return result
          if (!res.claimed) res.status = 403
          return
        }
        const { xml: data2 } = await xml2js.parseStringPromise(message, {
          explicitArray: false,
        })
        this.ctx.logger.debug('decrypted %c', data2)
        data = data2
      }

      const session = await decodeMessage(this, data)

      let resolveFunction: (text: string) => void
      const promise = new Promise((resolve, reject) => {
        if (this.config.customerService) return resolve('success')
        const timeout = setTimeout(() => {
          res.status = 200
          res.body = 'success'
          reject(new Error('timeout'))
        }, 4500)
        resolveFunction = (text: string) => {
          resolve(text)
          clearTimeout(timeout)
        }
      })
      if (session) {
        session.wechatOfficialResolve = resolveFunction
        this.dispatch(session)
        // bot.logger.debug(session)
      }
      try {
        const result: any = await promise
        if (this.config.aesKey) {
          const builder = new xml2js.Builder({
            cdata: true,
            headless: true,
          })
          const encrypted = encrypt(this.config.aesKey, result, this.config.appid)
          const sign = getSignature(this.config.token, timestamp, nonce, encrypted)
          const xml = builder.buildObject({
            xml: {
              Encrypt: encrypted,
              Nonce: nonce,
              TimeStamp: timestamp,
              MsgSignature: sign,
            },
          })
          res.body = xml
          return
        }

        res.status = 200
        res.body = result
      } catch (error) {
        this.ctx.logger.warn('resolve timeout')
        res.status = 200
        res.body = 'success'
      }
    })

    this.online()
  }

  // @ts-ignore
  stop(): Promise<void> {
    clearTimeout(this.refreshTokenTimer)
  }

  public token: string
  /** https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html */
  async refreshToken() {
    const { access_token, expires_in, errcode, errmsg } = await this.http.get<{
      access_token: string
      expires_in: number
      errcode?: number
      errmsg?: string
    }>('/cgi-bin/token', {
      params: {
        grant_type: 'client_credential',
        appid: this.config.appid,
        secret: this.config.secret,
      },
    })
    if (errcode > 0) {
      this.ctx.logger.error(errmsg)
      return
    }
    this.token = access_token
    this.ctx.logger.debug('token %o, expires in %d', access_token, expires_in)
    this.refreshTokenTimer = setTimeout(this.refreshToken.bind(this), (expires_in - 10) * 1000)
    return access_token
  }

  /** https://developers.weixin.qq.com/doc/offiaccount/Customer_Service/Customer_Service_Management.html */
  async ensureCustom() {
    if (!this.config.customerService) return
    const data = await this.http.get<{
      kf_list: {
        kf_account: string
        kf_headimgurl: string
        kf_id: number
        kf_nick: string
      }[]
    }>('/cgi-bin/customservice/getkflist', {
      params: { access_token: this.token },
    })
    if (data.kf_list.find(v => v.kf_nick === 'Koishi')) return
    await this.http.post('/customservice/kfaccount/add', {
      kf_account: 'koishi@' + this.config.account,
      nickname: 'Koishi',
    }, {
      params: { access_token: this.token },
    })
  }

  async getMedia(mediaId: string) {
    return await this.http.get('/cgi-bin/media/get', {
      params: {
        access_token: this.token,
        media_id: mediaId,
      },
    })
  }

  $toMediaUrl(mediaId: string) {
    return this.getInternalUrl('/assets/' + mediaId)
  }
}

export namespace WechatOfficialBot {
  export interface Config {
    appid: string
    secret: string
    token: string
    aesKey: string
    customerService: boolean
    account: string
  }

  export const Config: z<Config> = z.object({
    account: z.string().required(),
    appid: z.string().description('AppID').required(),
    secret: z.string().role('secret').description('AppSecret').required(),
    token: z.string().role('secret').description('Webhook Token').required(),
    aesKey: z.string().role('secret').description('EncodingAESKey'),
    customerService: z.boolean().default(false).description('启用客服消息回复'),
  })
}
