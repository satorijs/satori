import { Bot, Context, Inject, Universal } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { HttpServer } from './http'
import { WecomMessageEncoder } from './message'
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

    ctx.plugin(HttpServer, this)
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
    return `${this.ctx.server.config.selfUrl}/wecom/assets/${this.selfId}/${mediaId}`
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
