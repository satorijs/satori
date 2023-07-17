import { Bot, Context, Logger, Quester, Schema, Universal } from '@satorijs/satori'
import { HttpServer } from './http'
import { DingtalkMessageEncoder } from './message'

const logger = new Logger('dingtalk')

// https://open.dingtalk.com/document/orgapp/enterprise-created-chatbot
export class DingtalkBot extends Bot<DingtalkBot.Config> {
  static MessageEncoder = DingtalkMessageEncoder
  public oldHttp: Quester
  public http: Quester
  constructor(ctx: Context, config: DingtalkBot.Config) {
    super(ctx, config)
    this.http = ctx.http.extend(config)
    this.oldHttp = ctx.http.extend({
      endpoint: 'https://oapi.dingtalk.com/'
    })
    ctx.plugin(HttpServer, this)
  }

  tokenExpiresAt: number;
  public token: string

  async refreshToken() {
    if (this.tokenExpiresAt && this.tokenExpiresAt > Date.now()) return
    const data = await this.http.post('/oauth2/accessToken', {
      appKey: this.config.appkey,
      appSecret: this.config.secret
    })
    logger.debug('gettoken result: %o', data)
    this.tokenExpiresAt = Date.now() + data.expireIn * 1000
    this.token = data.accessToken
    // https://open.dingtalk.com/document/orgapp/authorization-overview
    this.http = this.http.extend({
      headers: {
        'x-acs-dingtalk-access-token': data.accessToken
      }
    }).extend(this.config)
  }

  // https://open.dingtalk.com/document/orgapp/download-the-file-content-of-the-robot-receiving-message
  async downloadFile(downloadCode: string): Promise<string> {
    const { downloadUrl } = await this.http.post('/robot/messageFiles/download', {
      downloadCode, robotCode: this.selfId
    })
    return downloadUrl
  }
}

export namespace DingtalkBot {
  export interface Config extends Bot.Config, Quester.Config {
    secret: string
    protocol: string
    appkey: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.string().required(),
      secret: Schema.string().required().description('机器人密钥。'),
      appkey: Schema.string().required()
    }),
    Quester.createConfig("https://api.dingtalk.com/v1.0/")
  ])
}

DingtalkBot.prototype.platform = 'dingtalk'
