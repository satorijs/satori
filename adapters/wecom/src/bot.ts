import { Bot, Context, Logger, Quester, Schema, Universal } from '@satorijs/satori'
import { HttpServer } from './http'
import { WecomMessageEncoder } from './message'

export class WecomBot extends Bot<WecomBot.Config> {
  static MessageEncoder = WecomMessageEncoder
  http: Quester
  // internal: Internal
  refreshTokenTimer: NodeJS.Timeout
  logger = new Logger('wecom')

  constructor(ctx: Context, config: WecomBot.Config) {
    super(ctx, config)
    this.selfId = config.agentId
    this.platform = 'wecom'
    this.http = ctx.http.extend(config)
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
      this.logger.error(errmsg)
      return
    }
    this.token = access_token
    this.logger.debug('token %o, expires in %d', access_token, expires_in)
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
  async getSelf(): Promise<Universal.User> {
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
    return {
      id: this.config.agentId,
      name,
      userId: this.config.agentId,
      username: name,
      avatar: square_logo_url,
    }
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
  export interface Config extends Bot.Config, Quester.Config {
    corpId: string
    token: string
    aesKey: string
    agentId: string
    secret: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      corpId: Schema.string().required(),
      agentId: Schema.string().description('AgentID').required(),
      secret: Schema.string().role('secret').description('AppSecret').required(),
      token: Schema.string().role('secret').description('Webhook Token').required(),
      aesKey: Schema.string().role('secret').description('EncodingAESKey'),
    }),
    Quester.createConfig('https://qyapi.weixin.qq.com/'),
  ])
}
