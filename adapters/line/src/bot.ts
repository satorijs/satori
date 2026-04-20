import { Bot, Context, Inject } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import {} from '@cordisjs/plugin-server'
import { HttpServer } from './http'
import { Internal } from './types'
import { LineMessageEncoder } from './message'
import z from 'schemastery'

@Inject('http')
@Inject('logger', true, { name: 'line' })
export class LineBot extends Bot<LineBot.Config> {
  static inject = ['server']
  static MessageEncoder = LineMessageEncoder

  public http: HTTP
  public contentHttp: HTTP
  public internal: Internal

  constructor(ctx: Context, config: LineBot.Config) {
    super(ctx, config, 'line')
    if (!ctx.server.config.selfUrl) {
      this.ctx.logger.warn('selfUrl is not set, some features may not work')
    }

    this.http = ctx.http.extend({
      baseUrl: 'https://api.line.me/',
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
    this.contentHttp = ctx.http.extend({
      baseUrl: 'https://api-data.line.me/',
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
    this.internal = new Internal(this.http)

    ctx.plugin(HttpServer, this)
  }

  // https://developers.line.biz/en/reference/messaging-api/#get-profile
  async getLogin() {
    const { userId, displayName, pictureUrl } = await this.internal.getBotInfo()
    this.user.id = userId
    this.user.name = displayName
    this.user.avatar = pictureUrl
    return this.toJSON()
  }

  async getFriendList(start?: string) {
    const { userIds, next } = await this.internal.getFollowers({
      start,
      limit: 1000,
    })
    return { data: userIds.map(v => ({ user: { id: v } })), next }
  }

  async getGuild(guildId: string) {
    const res = await this.internal.getGroupSummary(guildId)
    return {
      id: res.groupId,
      name: res.groupName,
    }
  }

  async getGuildMemberList(guildId: string, start?: string) {
    const { memberIds, next } = await this.internal.getGroupMembersIds(guildId, { start })
    return { data: memberIds.map(id => ({ user: { id }, userId: id })), next }
  }

  async getGuildMember(guildId: string, userId: string) {
    const res = await this.internal.getGroupMemberProfile(guildId, userId)
    return {
      user: {
        id: res.userId,
        name: res.displayName,
        avatar: res.pictureUrl,
      },
      nick: res.displayName,
      avatar: res.pictureUrl,
    }
  }
}

export namespace LineBot {
  export interface Config {
    token: string
    secret: string
  }

  export const Config: z<Config> = z.object({
    token: z.string().required().description('机器人令牌。'),
    secret: z.string().required().description('机器人密钥。'),
  })
}
