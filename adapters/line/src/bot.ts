import { Bot, Context, Logger, Quester, Schema } from '@satorijs/satori'
import { HttpServer } from './http'
import { Internal } from './types'
import { LineMessageEncoder } from './message'

const logger = new Logger('line')

export class LineBot extends Bot<LineBot.Config> {
  static MessageEncoder = LineMessageEncoder
  public http: Quester
  public contentHttp: Quester
  public internal: Internal

  constructor(ctx: Context, config: LineBot.Config) {
    super(ctx, config)
    if (!ctx.root.config.selfUrl) {
      logger.warn('selfUrl is not set, some features may not work')
    }

    this.platform = 'line'
    this.http = ctx.http.extend({
      ...config.api,
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
    this.contentHttp = ctx.http.extend({
      ...config.content,
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    })
    this.internal = new Internal(this.http)

    ctx.plugin(HttpServer, this)
  }

  async initialize(callback: (bot: this) => Promise<void>) {
    const user = await this.getSelf()
    Object.assign(this, user)
    await callback(this)
    this.online()
  }

  // https://developers.line.biz/en/reference/messaging-api/#get-profile
  async getSelf() {
    const { userId, displayName, pictureUrl } = await this.internal.getBotInfo()
    return {
      userId,
      nickname: displayName,
      avatar: pictureUrl,
    }
  }

  async getFriendList() {
    let userIds: string[] = []
    let start: string
    do {
      const res = await this.internal.getFollowers({
        start,
        limit: 1000,
      })
      userIds = userIds.concat(res.userIds)
      start = res.next
    } while (start)

    return userIds.map(v => ({ userId: v }))
  }

  async getGuild(guildId: string) {
    const res = await this.internal.getGroupSummary(guildId)
    return {
      guildId: res.groupId,
      guildName: res.groupName,
    }
  }

  async getGuildMemberList(guildId: string) {
    let userIds: string[] = []
    let start: string
    do {
      const res = await this.internal.getGroupMembersIds(guildId, { start })
      userIds = userIds.concat(res.memberIds)
      start = res.next
    } while (start)

    return { data: userIds.map(v => ({ userId: v })) }
  }

  async getGuildMember(guildId: string, userId: string) {
    const res = await this.internal.getGroupMemberProfile(guildId, userId)
    return ({
      userId: res.userId,
      nickname: res.displayName,
      avatar: res.pictureUrl,
    })
  }
}

export namespace LineBot {
  export interface Config extends Bot.Config {
    token: string
    secret: string
    api: Quester.Config
    content: Quester.Config
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      token: Schema.string().required().description('机器人令牌。'),
      secret: Schema.string().required().description('机器人密钥。'),
    }),
    Schema.object({
      api: Quester.createConfig('https://api.line.me/'),
    }),
    Schema.object({
      content: Quester.createConfig('https://api-data.line.me/'),
    }),
  ])
}
