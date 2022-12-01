import { createReadStream } from 'fs'
import internal from 'stream'

import { Bot, Context } from '@satorijs/core'
import { Logger, Quester, Schema, segment } from '@satorijs/satori'
import FormData from 'form-data'

import { FeishuMessenger } from './message'
import { HttpServer } from './http'
import { Internal, MessageContent, MessagePayload, MessageType } from './types'
import { extractIdType } from './utils'

type AssetType = 'image' | 'audio' | 'video' | 'file'

const logger = new Logger('feishu')

export class FeishuBot extends Bot<FeishuBot.Config> {
  _token?: string
  http: Quester
  assetsQuester: Quester
  internal?: Internal

  constructor(ctx: Context, config: FeishuBot.Config) {
    super(ctx, config)

    // feishu bot needs config.selfUrl to be set as it should be serve on a public url
    if (!config.selfUrl && !ctx.config.selfUrl) {
      logger.warn('selfUrl is not set, some features may not work')
    }

    this.selfId = config.appId

    this.http = ctx.http.extend({
      endpoint: config.endpoint ?? 'https://open.feishu.cn/open-apis/',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
    this.assetsQuester = Quester.create()

    this.internal = new Internal(this.http)

    ctx.plugin(HttpServer, this)
  }

  async initialize(): Promise<void> {
    await this.refreshToken()
    this.online()
  }

  private async refreshToken(): Promise<void> {
    const { tenant_access_token: token } = await this.internal.getTenantAccessToken({
      app_id: this.config.appId,
      app_secret: this.config.appSecret,
    })
    logger.debug('refreshed token %s', token)
    this.token = token
    this.online()
  }

  get token() {
    return this._token
  }

  set token(v: string) {
    this._token = v
    this.http.config.headers.Authorization = `Bearer ${v}`
  }

  async sendMessage(channelId: string, content: string, guildId?: string): Promise<string[]> {
    return new FeishuMessenger(this, channelId, guildId).send(content)
  }

  async sendPrivateMessage(userId: string, content: string): Promise<string[]> {
    return this.sendMessage(userId, content)
  }

  async deleteMessage(channelId: string, messageId: string): Promise<void> {
    await this.internal.deleteMessage(messageId)
  }
}

export namespace FeishuBot {
  export interface Config extends Bot.Config, HttpServer.Config, Quester.Config {
    path?: string
    appId: string
    appSecret: string
    encryptKey?: string
    verificationToken?: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      path: Schema.string().role('url').description('要连接的服务器地址。').default('/feishu'),
      appId: Schema.string().required().description('机器人的应用 ID。'),
      appSecret: Schema.string().role('secret').required().description('机器人的应用密钥。'),
      encryptKey: Schema.string().role('secret').description('机器人的 Encrypt Key。'),
      verificationToken: Schema.string().description('事件推送的 Varification Token'),
    }),
    Quester.Config,
    HttpServer.Config,
  ])
}

FeishuBot.prototype.platform = 'feishu'
