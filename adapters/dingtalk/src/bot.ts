import { Bot, Context, Schema } from '@satorijs/core'
import type { HTTP } from '@cordisjs/plugin-http'
import type { Logger } from '@cordisjs/plugin-logger'
import { HttpServer } from './http'
import { DingtalkMessageEncoder } from './message'
import { WsClient } from './ws'
import { Internal } from './internal'

// https://open.dingtalk.com/document/orgapp/enterprise-created-chatbot
export class DingtalkBot<C extends Context = Context> extends Bot<C, DingtalkBot.Config> {
  static MessageEncoder = DingtalkMessageEncoder
  static inject = ['http']

  public oldHttp: HTTP
  public http: HTTP
  public internal: Internal
  private refreshTokenTimer: NodeJS.Timeout

  private logger: Logger

  constructor(ctx: C, config: DingtalkBot.Config) {
    super(ctx, config, 'dingtalk')
    this.selfId = config.appkey
    this.http = ctx.http.extend(config.api)
    this.oldHttp = ctx.http.extend(config.oldApi)
    this.internal = new Internal(this)

    if (config.protocol === 'http') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this)
    }
  }

  async getLogin() {
    try {
      const { appList } = await this.internal.listAllInnerApps()
      const self = appList.find(v => v.agentId === this.config.agentId)
      if (self) {
        this.user.name = self.name
        this.user.avatar = self.icon
        return this.toJSON()
      }
    } catch (e) {
      this.logger.warn(e)
    }

    const data = await this.internal.oapiMicroappList()
    if (!data.appList) {
      this.logger.error('getLogin failed: %o', data)
      return this.toJSON()
    }
    const self = data.appList.find(v => v.agentId === this.config.agentId)
    if (self) {
      this.user.name = self.name
      this.user.avatar = self.appIcon
    }
    return this.toJSON()
  }

  stop() {
    clearTimeout(this.refreshTokenTimer)
    return super.stop()
  }

  public token: string

  async refreshToken() {
    const data = await this.internal.getAccessToken({
      appKey: this.config.appkey,
      appSecret: this.config.secret,
    })
    this.logger.debug('gettoken result: %o', data)
    this.token = data.accessToken
    // https://open.dingtalk.com/document/orgapp/authorization-overview
    this.http = this.http.extend({
      headers: {
        'x-acs-dingtalk-access-token': data.accessToken,
      },
    }).extend(this.config.api)
    this.refreshTokenTimer = setTimeout(this.refreshToken.bind(this), (data.expireIn - 10) * 1000)
  }

  // https://open.dingtalk.com/document/orgapp/download-the-file-content-of-the-robot-receiving-message
  async downloadFile(downloadCode: string): Promise<string> {
    const { downloadUrl } = await this.internal.robotMessageFileDownload({
      downloadCode,
      robotCode: this.selfId,
    })
    return downloadUrl
  }

  async deleteMessage(channelId: string, messageId: string): Promise<void> {
    if (channelId.startsWith('cid')) {
      await this.internal.orgGroupRecall({
        robotCode: this.selfId,
        processQueryKeys: [messageId],
        openConversationId: channelId,
      })
    } else {
      await this.internal.batchRecallOTO({
        robotCode: this.selfId,
        processQueryKeys: [messageId],
      })
    }
  }
}

export namespace DingtalkBot {
  export interface Config extends WsClient.Options {
    secret: string
    protocol: string
    appkey: string
    agentId?: number
    api: HTTP.Config
    oldApi: HTTP.Config
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: process.env.KOISHI_ENV === 'browser'
        ? Schema.const('ws').default('ws')
        : Schema.union(['http', 'ws']).description('选择要使用的协议。').required(),
    }),
    Schema.object({
      secret: Schema.string().required().description('机器人密钥。'),
      agentId: Schema.number().description('AgentId'),
      appkey: Schema.string().required(),
      api: HTTP.createConfig('https://api.dingtalk.com/v1.0/'),
      oldApi: HTTP.createConfig('https://oapi.dingtalk.com/'),
    }),
    WsClient.Options,
  ])
}
