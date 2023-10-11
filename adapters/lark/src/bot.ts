import { Bot, Context, h, Logger, Quester, Schema } from '@satorijs/satori'

import { HttpServer } from './http'
import { LarkMessageEncoder } from './message'
import { Internal } from './types'
import * as Utils from './utils'

const logger = new Logger('lark')

export class LarkBot extends Bot<LarkBot.Config> {
  static MessageEncoder = LarkMessageEncoder

  _token?: string
  _refresher?: NodeJS.Timeout
  http: Quester
  assetsQuester: Quester
  internal: Internal

  constructor(ctx: Context, config: LarkBot.Config) {
    super(ctx, config)

    // lark bot needs config.selfUrl to be set as it should be serve on a public url
    if (!config.selfUrl && !ctx.root.config.selfUrl) {
      logger.warn('selfUrl is not set, some features may not work')
    }

    this.platform = 'lark'
    this.selfId = config.appId

    this.http = ctx.http.extend({
      endpoint: config.endpoint,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    this.assetsQuester = Quester.create()

    this.internal = new Internal(this.http)

    ctx.plugin(HttpServer, this)
  }

  async initialize() {
    await this.refreshToken()
    this.online()
  }

  private async refreshToken() {
    const { tenant_access_token: token } = await this.internal.getTenantAccessToken({
      app_id: this.config.appId,
      app_secret: this.config.appSecret,
    })
    logger.debug('refreshed token %s', token)
    this.token = token
    // Token would be expired in 2 hours, refresh it every 1 hour
    // see https://open.larksuite.com/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
    if (this._refresher) clearTimeout(this._refresher)
    this._refresher = setTimeout(() => this.refreshToken(), 3600 * 1000)
    this.online()
  }

  get token() {
    return this._token
  }

  set token(v: string) {
    this._token = v
    this.http.config.headers.Authorization = `Bearer ${v}`
  }

  async editMessage(channelId: string, messageId: string, content: h.Fragment) {
    await this.internal.updateMessage(messageId, {
      content: h.normalize(content).join(''),
      msg_type: 'text',
    })
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteMessage(messageId)
  }

  async getMessage(channelId: string, messageId: string) {
    const data = await this.internal.getMessage(messageId)
    return await Utils.decodeMessage(this, data.data)
  }

  async getMessageList(channelId: string, before?: string) {
    const { data: messages } = await this.internal.getMessageList({ container_id_type: 'chat', container_id: channelId, page_token: before })
    const data = await Promise.all(messages.items.reverse().map(data => Utils.decodeMessage(this, data)))
    return { data, next: data[0]?.id }
  }

  async getUser(userId: string, guildId?: string) {
    const data = await this.internal.getUserInfo(userId)
    return Utils.decodeUser(data.data)
  }
}

export namespace LarkBot {
  export interface Config extends HttpServer.Config, Quester.Config {
    appId: string
    appSecret: string
    encryptKey?: string
    verificationToken?: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      platform: Schema.union(['feishu', 'lark']).required().description('平台名称。'),
      appId: Schema.string().required().description('机器人的应用 ID。'),
      appSecret: Schema.string().role('secret').required().description('机器人的应用密钥。'),
      encryptKey: Schema.string().role('secret').description('机器人的 Encrypt Key。'),
      verificationToken: Schema.string().description('事件推送的验证令牌。'),
    }),
    Schema.union([
      Schema.intersect([
        Schema.object({
          platform: Schema.const('feishu').required(),
        }),
        Quester.createConfig('https://open.feishu.cn/open-apis/'),
        HttpServer.createConfig('/feishu'),
      ]),
      Schema.intersect([
        Schema.object({
          platform: Schema.const('lark').required(),
        }),
        Quester.createConfig('https://open.larksuite.com/open-apis/'),
        HttpServer.createConfig('/lark'),
      ]),
    ]),
  ])
}

export { LarkBot as FeishuBot }
