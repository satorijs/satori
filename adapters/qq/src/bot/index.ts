import { Bot, Context, HTTP, Schema, Universal } from '@satorijs/core'
import { WsClient } from '../ws'
import * as QQ from '../types'
import { QQGuildBot } from './guild'
import { QQMessageEncoder } from '../message'
import { GroupInternal } from '../internal'

interface GetAppAccessTokenResult {
  access_token: string
  expires_in: number
}

export class QQBot<C extends Context = Context> extends Bot<C, QQBot.Config> {
  static MessageEncoder = QQMessageEncoder
  static inject = ['http']

  public guildBot: QQGuildBot<C>

  internal: GroupInternal
  http: HTTP
  guildHttp: HTTP

  private _token: string
  private _timer: NodeJS.Timeout

  constructor(ctx: C, config: QQBot.Config) {
    super(ctx, config, 'qq')
    let endpoint = config.endpoint
    if (config.sandbox) {
      endpoint = endpoint.replace(/^(https?:\/\/)/, '$1sandbox.')
    }
    this.guildHttp = ctx.http.extend({
      endpoint,
      headers: {
        'Authorization': `Bot ${this.config.id}.${this.config.token}`,
      },
    })

    this.ctx.plugin(QQGuildBot, {
      parent: this,
    })
    this.internal = new GroupInternal(this, () => this.http)
    this.ctx.plugin(WsClient, this)
  }

  async initialize() {
    try {
      const user = await this.guildBot.internal.getMe()
      Object.assign(this.user, user)
    } catch (e) {
      this.logger.error(e)
    }
  }

  async stop() {
    clearTimeout(this._timer)
    if (this.guildBot) {
      delete this.ctx.bots[this.guildBot.sid]
    }
    await super.stop()
  }

  async _ensureAccessToken() {
    try {
      const result = await this.ctx.http<GetAppAccessTokenResult>('https://bots.qq.com/app/getAppAccessToken', {
        method: 'POST',
        data: {
          appId: this.config.id,
          clientSecret: this.config.secret,
        },
      })
      if (!result.data.access_token) {
        this.logger.warn(`POST https://bots.qq.com/app/getAppAccessToken response: %o, trace id: %s`, result.data, result.headers.get('x-tps-trace-id'))
        throw new Error('failed to refresh access token')
      }
      let endpoint = this.config.endpoint
      if (this.config.sandbox) {
        endpoint = endpoint.replace(/^(https?:\/\/)/, '$1sandbox.')
      }
      this._token = result.data.access_token
      this.http = this.ctx.http.extend({
        endpoint,
        headers: {
          'Authorization': `QQBot ${this._token}`,
          'X-Union-Appid': this.config.id,
        },
      })
      // 在上一个 access_token 接近过期的 60 秒内
      // 重新请求可以获取到一个新的 access_token
      this._timer = setTimeout(() => {
        this._ensureAccessToken()
      }, (result.data.expires_in - 40) * 1000)
    } catch (e) {
      if (!this.ctx.http.isError(e) || !e.response) throw e
      this.logger.warn(`POST https://bots.qq.com/app/getAppAccessToken response: %o, trace id: %s`, e.response.data, e.response.headers.get('x-tps-trace-id'))
      throw e
    }
  }

  async getAccessToken() {
    if (!this._token) {
      await this._ensureAccessToken()
    }
    return this._token
  }

  async getLogin() {
    return this.toJSON()
  }

  async createDirectChannel(id: string) {
    return { id, type: Universal.Channel.Type.DIRECT }
  }

  async deleteMessage(channelId: string, messageId: string): Promise<void> {
    // @TODO: need `private:`
    try {
      await this.internal.deleteMessage(channelId, messageId)
    } catch (e) {
      await this.internal.deletePrivateMessage(channelId, messageId)
    }
  }
}

export namespace QQBot {
  export interface Config extends QQ.Options, WsClient.Options {
    intents?: number
    retryWhen: number[]
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      id: Schema.string().description('机器人 id。').required(),
      secret: Schema.string().description('机器人密钥。').role('secret'),
      token: Schema.string().description('机器人令牌。').role('secret'),
      type: Schema.union(['public', 'private'] as const).description('机器人类型。').required(),
      sandbox: Schema.boolean().description('是否开启沙箱模式。').default(false),
      endpoint: Schema.string().role('link').description('要连接的服务器地址。').default('https://api.sgroup.qq.com/'),
      authType: Schema.union(['bot', 'bearer'] as const).description('采用的验证方式。').default('bot'),
      intents: Schema.bitset(QQ.Intents).description('需要订阅的机器人事件。'),
      retryWhen: Schema.array(Number).description('发送消息遇到平台错误码时重试。').default([]),
    }),
    WsClient.Options,
  ] as const)
}
