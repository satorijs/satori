import { Bot, Context, Logger, Quester, Schema } from '@satorijs/satori'
import { HttpServer } from './http'
import { DingtalkMessageEncoder } from './message'
import { WsClient } from './ws'
import { Internal } from './internal'

const logger = new Logger('dingtalk')

// https://open.dingtalk.com/document/orgapp/enterprise-created-chatbot
export class DingtalkBot extends Bot<DingtalkBot.Config> {
  static MessageEncoder = DingtalkMessageEncoder
  public oldHttp: Quester
  public http: Quester
  refreshTokenTimer: NodeJS.Timeout
  public internal: Internal
  constructor(ctx: Context, config: DingtalkBot.Config) {
    super(ctx, config)
    this.http = ctx.http.extend(config)
    this.oldHttp = ctx.http.extend({
      endpoint: 'https://oapi.dingtalk.com/',
    })
    this.internal = new Internal(this)

    if (config.protocol === 'http') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this)
    }
  }

  // @ts-ignore
  stop(): Promise<void> {
    clearTimeout(this.refreshTokenTimer)
  }

  public token: string

  async refreshToken() {
    const data = await this.internal.getAccessToken({
      appKey: this.config.appkey,
      appSecret: this.config.secret,
    })
    logger.debug('gettoken result: %o', data)
    this.token = data.accessToken
    // https://open.dingtalk.com/document/orgapp/authorization-overview
    this.http = this.http.extend({
      headers: {
        'x-acs-dingtalk-access-token': data.accessToken,
      },
    }).extend(this.config)
    this.refreshTokenTimer = setTimeout(this.refreshToken.bind(this), (data.expireIn - 10) * 1000)
  }

  // https://open.dingtalk.com/document/orgapp/download-the-file-content-of-the-robot-receiving-message
  async downloadFile(downloadCode: string): Promise<string> {
    const { downloadUrl } = await this.internal.robotMessageFileDownload({
      downloadCode, robotCode: this.selfId,
    })
    return downloadUrl
  }
}

export namespace DingtalkBot {
  export interface Config extends Bot.Config, Quester.Config, WsClient.Config {
    secret: string
    protocol: string
    appkey: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: process.env.KOISHI_ENV === 'browser'
        ? Schema.const('ws').default('ws')
        : Schema.union(['http', 'ws']).description('选择要使用的协议。').required(),
    }),
    Schema.object({
      secret: Schema.string().required().description('机器人密钥。'),
      appkey: Schema.string().required(),
    }),
    WsClient.Config,
    Quester.createConfig('https://api.dingtalk.com/v1.0/'),
  ])
}

DingtalkBot.prototype.platform = 'dingtalk'
