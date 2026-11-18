import { Bot, Context, Inject, Universal } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { WsClient } from '../ws'
import * as QQ from '../types'
import { QQGuildBot } from './guild'
import { QQMessageEncoder } from '../message'
import { GroupInternal } from '../internal'
import { HttpServer } from '../http'
import { decodeUser } from '../utils'
import z from 'schemastery'

interface GetAppAccessTokenResult {
  access_token: string
  expires_in: number
}

@Inject('http')
@Inject('logger', true, { name: 'qq' })
export class QQBot<T extends QQBot.Config = QQBot.Config> extends Bot<T> {
  static MessageEncoder = QQMessageEncoder
  static inject = {
    optional: ['server'],
  }

  public guildBot: QQGuildBot
  public adapter?: HttpServer | WsClient

  internal: GroupInternal
  http: HTTP

  private _token: string
  private _timer: NodeJS.Timeout

  constructor(ctx: Context, config: T) {
    super(ctx, config, 'qq')
    let baseUrl = config.baseUrl
    if (config.sandbox) {
      baseUrl = baseUrl.replace(/^(https?:\/\/)/, '$1sandbox.')
    }
    // 如果是 bot 类型, 使用固定 token
    this.http = this.ctx.http.extend({
      baseUrl,
      headers: {
        'Authorization': this.config.authType === 'bot' ? `Bot ${this.config.id}.${this.config.token}` : '',
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

  async connect() {
    await this.adapter?.connect()
  }

  async disconnect() {
    await this.adapter?.disconnect()
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
      const response = await this.ctx.http('https://bots.qq.com/app/getAppAccessToken', {
        method: 'POST',
        data: {
          appId: this.config.id,
          clientSecret: this.config.secret,
        },
      })
      const data: GetAppAccessTokenResult = await response.json()
      if (!data.access_token) {
        this.ctx.logger.warn(`POST https://bots.qq.com/app/getAppAccessToken response: %o, trace id: %s`, data, response.headers.get('x-tps-trace-id'))
        throw new Error('failed to refresh access token')
      }
      this._token = data.access_token
      this.http.config.headers.Authorization = `QQBot ${this._token}`
      // 在上一个 access_token 接近过期的 60 秒内
      // 重新请求可以获取到一个新的 access_token
      this._timer = setTimeout(() => {
        this._ensureAccessToken()
      }, (data.expires_in - 40) * 1000)
    } catch (e) {
      if (!this.ctx.http.isError(e) || !e.response) throw e
      this.ctx.logger.warn(`POST https://bots.qq.com/app/getAppAccessToken response: %o, trace id: %s`, await e.response.text(), e.response.headers.get('x-tps-trace-id'))
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

  async getChannel(channelId: string): Promise<Universal.Channel> {
    const group = await this.internal.getGroupInfo(channelId)
    return {
      id: group.group_openid,
      type: Universal.Channel.Type.TEXT,
      name: group.group_name,
    }
  }

  async getChannelList(guildId: string, next?: string): Promise<Universal.List<Universal.Channel>> {
    return { data: [await this.getChannel(guildId)] }
  }

  async getGuild(guildId: string): Promise<Universal.Guild> {
    const group = await this.internal.getGroupInfo(guildId)
    return {
      id: group.group_openid,
      name: group.group_name,
      avatar: group.group_avatar,
    }
  }

  async getGuildMember(guildId: string, userId: string): Promise<Universal.GuildMember> {
    const member = await this.internal.getGroupMember(guildId, userId)
    return {
      user: {
        id: member.member_openid,
        name: member.username,
        isBot: member.bot,
      },
      roles: [member.member_role],
      joinedAt: member.joined_at ? new Date(member.joined_at).getTime() : undefined,
    }
  }

  async kickGuildMember(guildId: string, userId: string): Promise<void> {
    try {
      await this.internal.batchRemoveGroupMembers(guildId, {
        member_openids: [userId],
      })
    } catch (error: any) {
      const code = error?.response?.data?.code
      if (code === 40103011) {
        this.ctx.logger.warn(`群 ${guildId} 移除群成员失败：机器人尚未在开放平台 WEB 管理端开启“移除群成员”权限 (code: 40103011)`)
      } else if (code === 40103012) {
        this.ctx.logger.warn(`群 ${guildId} 移除群成员失败：群主尚未在手机 QQ 群设置中授权机器人“移除群成员”权限 (code: 40103012)`)
      }
      throw error
    }
  }

  async muteChannel(channelId: string, guildId?: string, enable = true): Promise<void> {
    const targetGuildId = guildId ?? channelId
    await this.internal.setRestrictChatSetting(targetGuildId, {
      global_rule: {
        mode: enable ? 'always' : 'none',
      },
    })
  }

  async muteGuildMember(guildId: string, userId: string, duration: number): Promise<void> {
    const op = duration <= 0 ? 'del' : 'add'
    await this.internal.setRestrictChatSetting(guildId, {
      members: [{
        op,
        member_openid: userId,
        mute_expire_at: duration > 0 ? new Date(Date.now() + duration).toISOString() : '',
      }],
    })
  }
}

export namespace QQBot {
  export interface BaseConfig extends QQ.Options {
    intents?: number
    retryWhen: number[]
    manualAcknowledge: boolean
    protocol: 'websocket' | 'webhook'
    path?: string
    gatewayUrl?: string
  }

  export type Config = BaseConfig & (HttpServer.Options | WsClient.Options)

  export const Config: z<Config> = z.intersect([
    z.object({
      id: z.string().description('机器人 id。').required(),
      secret: z.string().description('机器人密钥。').role('secret'),
      token: z.string().description('机器人令牌。').role('secret'),
      type: z.union(['public', 'private'] as const).description('机器人类型。').required(),
      sandbox: z.boolean().description('是否开启沙箱模式。').default(false),
      baseUrl: z.string().role('link').description('要连接的服务器地址。').default('https://api.sgroup.qq.com/'),
      authType: z.union(['bot', 'bearer'] as const).description('采用的验证方式。').default('bearer'),
      intents: z.bitset(QQ.Intents).description('需要订阅的机器人事件。'),
      retryWhen: z.array(Number).description('发送消息遇到平台错误码时重试。').default([]),
      protocol: z.union(['websocket', 'webhook']).description('选择要使用的协议。').default('websocket'),
    }),
    z.union([
      WsClient.Options,
      HttpServer.Options,
    ]),
    z.object({
      manualAcknowledge: z.boolean().description('手动响应回调消息。').default(false),
      gatewayUrl: z.string().role('link').description('覆写 WebSocket 地址。'),
    }).description('高级设置'),
  ] as const)
}
