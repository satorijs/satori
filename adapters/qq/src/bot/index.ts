import { Bot, Context, HTTP, Schema, Universal } from '@satorijs/core'
import { WsClient } from '../ws'
import * as QQ from '../types'
import { QQGuildBot } from './guild'
import { QQMessageEncoder } from '../message'
import { GroupInternal } from '../internal'
import { HttpServer } from '../http'
import { decodeUser } from '../utils'

interface GetAppAccessTokenResult {
  access_token: string
  expires_in: number
}

export class QQBot<C extends Context = Context, T extends QQBot.Config = QQBot.Config> extends Bot<C, T> {
  static MessageEncoder = QQMessageEncoder
  static inject = {
    required: ['http'],
    optional: ['server'],
  }

  public guildBot: QQGuildBot<C>

  internal: GroupInternal
  http: HTTP

  private _token: string
  private _timer: NodeJS.Timeout

  constructor(ctx: C, config: T) {
    super(ctx, config, 'qq')
    let endpoint = config.endpoint
    if (config.sandbox) {
      endpoint = endpoint.replace(/^(https?:\/\/)/, '$1sandbox.')
    }
    // 如果是 bot 类型, 使用固定 token
    this.http = this.ctx.http.extend({
      endpoint,
      headers: {
        'Authorization': '',
        'X-Union-Appid': this.config.id,
      },
    })

    this.ctx.plugin(QQGuildBot, {
      parent: this,
    })
    this.internal = new GroupInternal(this, () => this.http)
    if (config.protocol === 'websocket') {
      this.ctx.plugin(WsClient, this as any)
    } else {
      this.ctx.plugin(HttpServer, this)
    }
  }

  async initialize() {
    const user = await this.guildBot.internal.getMe()
    // user 在 ws 内设置, http 内未设置, 此处补上
    if (!this.user) this.user = decodeUser(user)
    else Object.assign(this.user, decodeUser(user))
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
      this._token = result.data.access_token
      this.http.config.headers.Authorization = `QQBot ${this._token}`
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

  async getGuild(guildId: string): Promise<Universal.Guild> {
    const data = await this.internal.getGuildInfo(guildId)
    return { id: data.group_openid, name: data.group_name }
  }

  async getGuildMember(guildId: string, userId: string): Promise<Universal.GuildMember> {
    const data = await this.internal.getGuildMember(guildId, userId)
    return {
      user: { id: data.member_openid, name: data.username, avatar: `https://q.qlogo.cn/qqapp/${this.config.id}/${data.member_openid}/640` },
      name: data.username,
      roles: [{ id: data.member_role }],
      joinedAt: new Date(data.joined_at).getTime(),
    }
  }

  async muteGuildMember(guildId: string, userId: string, duration: number): Promise<void> {
    await this.internal.updateRestrictChatSetting(guildId, {
      members: [{
        op: duration ? 'add' : 'del',
        member_openid: userId,
        mute_expire_at: duration ? new Date(Date.now() + duration).toISOString() : undefined,
      }],
    })
  }

  public guildMemberRequestMap = new Map<string, { guildId: string; userId: string }>()
  async handleGuildMemberRequest(messageId: string, approve: boolean, comment?: string): Promise<void> {
    const request = this.guildMemberRequestMap.get(messageId)
    if (!request) throw new Error('join request not found')
    await this.internal.approveGuildJoinRequest(request.guildId, request.userId, {
      op: approve ? 'approve' : 'decline',
      join_request_id: messageId,
      reject_reason: comment,
    })
    this.guildMemberRequestMap.delete(messageId)
  }
}

export namespace QQBot {
  export interface BaseConfig extends QQ.Options {
    intents?: number
    retryWhen: number[]
    manualAcknowledge: boolean
    protocol: 'websocket' | 'webhook'
    path?: string
    uploadThreshold: number
    markdownVerifyImage: boolean
  }

  export type Config = BaseConfig & (HttpServer.Options | WsClient.Options)

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      id: Schema.string().description('机器人 id。').required(),
      secret: Schema.string().description('机器人密钥。').role('secret'),
      type: Schema.union(['public', 'private'] as const).description('机器人类型。').required(),
      sandbox: Schema.boolean().description('是否开启沙箱模式。').default(false),
      endpoint: Schema.string().role('link').description('要连接的服务器地址。').default('https://api.bot.qq.com/'),
      intents: Schema.bitset(QQ.Intents).description('需要订阅的机器人事件。'),
      retryWhen: Schema.array(Number).description('发送消息遇到平台错误码时重试。').default([]),
      protocol: Schema.union(['websocket', 'webhook']).description('选择要使用的协议。').default('websocket'),
    }),
    Schema.union([
      WsClient.Options,
      HttpServer.Options,
    ]),
    Schema.object({
      manualAcknowledge: Schema.boolean().description('手动响应回调消息。').default(false),
      uploadThreshold: Schema.natural().role('ms').description('超过该大小的文件将使用分片上传。').default(3 * 1000 * 1000),
      markdownVerifyImage: Schema.boolean().description('在 Markdown 图片转存失败时报错。').default(false),
    }).description('高级设置'),
  ] as const)
}
