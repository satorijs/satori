import { Bot, Context, Inject, Universal } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import xml2js from 'xml2js'
import { decrypt, getSignature } from '@wecom/crypto'
import { WecomMessageEncoder } from './message'
import { Message } from './types'
import { decodeMessage } from './utils'
import z from 'schemastery'

@Inject('http', true, { baseUrl: 'https://qyapi.weixin.qq.com/' })
@Inject('logger', true, { name: 'wecom' })
export class WecomBot extends Bot<WecomBot.Config> {
  static inject = ['server']
  static MessageEncoder = WecomMessageEncoder

  http: HTTP
  // internal: Internal
  refreshTokenTimer: NodeJS.Timeout

  constructor(ctx: Context, config: WecomBot.Config) {
    super(ctx, config, 'wecom')
    this.selfId = config.agentId
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
    await this.getLogin()

    // https://developer.work.weixin.qq.com/document/10514
    this.ctx.server.get('/wecom', async (req, res, next) => {
      const msg_signature = req.query.get('msg_signature')
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const echostr = req.query.get('echostr')

      const localSign = getSignature(this.config.token, timestamp, nonce, echostr)
      if (localSign !== msg_signature) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      const dec = decrypt(this.config.aesKey, echostr)
      res.body = dec.message
      res.status = 200
    })

    this.ctx.server.post('/wecom', async (req, res, next) => {
      const timestamp = req.query.get('timestamp')
      const nonce = req.query.get('nonce')
      const msg_signature = req.query.get('msg_signature')
      const rawBody = await req.text()
      this.ctx.logger.debug(rawBody)
      let { xml: data }: {
        xml: Message
      } = await xml2js.parseStringPromise(rawBody, {
        explicitArray: false,
      })
      if (data.AgentID !== this.selfId) {
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
        const { message } = decrypt(this.config.aesKey, data.Encrypt)
        // if (id !== bot.config.appid) return ctx.status = 403
        const { xml: data2 } = await xml2js.parseStringPromise(message, {
          explicitArray: false,
        })
        this.ctx.logger.debug('decrypted %c', data2)
        data = data2
      }

      const session = await decodeMessage(this, data)
      if (session) {
        this.dispatch(session)
        this.ctx.logger.debug(session)
      }
      res.status = 200
      res.body = 'success'
    })

    this.online()
  }

  async stop() {
    clearTimeout(this.refreshTokenTimer)
  }

  public token: string
  /** hhttps://developer.work.weixin.qq.com/document/path/91039 */
  async refreshToken() {
    const { access_token, expires_in, errcode, errmsg } = await this.http.get<{
      access_token: string
      expires_in: number
      errcode?: number
      errmsg?: string
    }>('/cgi-bin/gettoken', {
      params: {
        corpid: this.config.corpId,
        corpsecret: this.config.secret,
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

  /** https://developer.work.weixin.qq.com/document/path/90196 */
  async getUser(userId: string, guildId?: string): Promise<Universal.User> {
    const data = await this.http.get('/cgi-bin/user/get', {
      params: {
        userid: userId,
        access_token: this.token,
      },
    })
    const { name, avatar } = data
    return {
      id: userId,
      name,
      avatar,
    }
  }

  /** https://developer.work.weixin.qq.com/document/path/90227 */
  async getLogin() {
    const { square_logo_url, name } = await this.http.get<{
      errcode: number
      errmsg: string
      agentid: number
      name: string
      square_logo_url: string
      description: string
      allow_userinfos: any[]
      allow_partys: any[]
      close: number
      redirect_domain: string
      report_location_flag: number
      isreportenter: number
      home_url: string
    }>('/cgi-bin/agent/get', {
      params: {
        access_token: this.token,
        agentid: this.config.agentId,
      },
    })
    this.user = {
      id: this.config.agentId,
      name,
      avatar: square_logo_url,
    }
    return this.toJSON()
  }

  /** https://developer.work.weixin.qq.com/document/path/94867 */
  async deleteMessage(channelId: string, messageId: string): Promise<void> {
    await this.http.post('/cgi-bin/message/recall', {
      msgid: messageId,
    }, {
      params: { access_token: this.token },
    })
  }
}

export namespace WecomBot {
  export interface Config {
    corpId: string
    token: string
    aesKey: string
    agentId: string
    secret: string
  }

  export const Config: z<Config> = z.object({
    corpId: z.string().required(),
    agentId: z.string().description('AgentID').required(),
    secret: z.string().role('secret').description('AppSecret').required(),
    token: z.string().role('secret').description('Webhook Token').required(),
    aesKey: z.string().role('secret').description('EncodingAESKey'),
  })
}
