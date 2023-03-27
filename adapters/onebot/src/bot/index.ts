import { Bot, Context, noop, Schema } from '@satorijs/satori'
import { HttpServer } from '../http'
import { WsClient, WsServer } from '../ws'
import { QQGuildBot } from './qqguild'
import { BaseBot } from './base'
import * as OneBot from '../utils'

export * from './base'
export * from './cqcode'
export * from './message'
export * from './qqguild'

export class OneBotBot<T extends OneBotBot.Config = OneBotBot.Config> extends BaseBot<T> {
  public guildBot: QQGuildBot

  constructor(ctx: Context, config: T) {
    super(ctx, config)
    this.selfId = config.selfId
    this.internal = new OneBot.Internal()
    this.avatar = `http://q.qlogo.cn/headimg_dl?dst_uin=${config.selfId}&spec=640`

    if (config.protocol === 'http') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this)
    } else if (config.protocol === 'ws-reverse') {
      ctx.plugin(WsServer, this)
    }
  }

  async stop() {
    if (this.guildBot) {
      // QQGuild stub bot should also be removed
      delete this.ctx.bots[this.guildBot.sid]
    }
    await super.stop()
  }

  async initialize() {
    await Promise.all([
      this.getSelf().then(data => Object.assign(this, data)),
      this.setupGuildService().catch(noop),
    ]).then(() => this.online(), error => this.offline(error))
  }

  async setupGuildService() {
    const profile = await this.internal.getGuildServiceProfile()
    // guild service is not supported in this account
    if (!profile?.tiny_id || profile.tiny_id === '0') return
    this.ctx.plugin(QQGuildBot, {
      ...this.config.qqguild,
      profile,
      parent: this,
      advanced: this.config.advanced,
    })
  }

  async getChannel(channelId: string) {
    const data = await this.internal.getGroupInfo(channelId)
    return OneBot.adaptChannel(data)
  }

  async getGuild(guildId: string) {
    const data = await this.internal.getGroupInfo(guildId)
    return OneBot.adaptGuild(data)
  }

  async getGuildList() {
    const data = await this.internal.getGroupList()
    return data.map(OneBot.adaptGuild)
  }

  async getChannelList(guildId: string) {
    return [await this.getChannel(guildId)]
  }

  async getGuildMember(guildId: string, userId: string) {
    const data = await this.internal.getGroupMemberInfo(guildId, userId)
    return OneBot.adaptGuildMember(data)
  }

  async getGuildMemberList(guildId: string) {
    const data = await this.internal.getGroupMemberList(guildId)
    return data.map(OneBot.adaptGuildMember)
  }

  async kickGuildMember(guildId: string, userId: string, permanent?: boolean) {
    return this.internal.setGroupKick(guildId, userId, permanent)
  }

  async muteGuildMember(guildId: string, userId: string, duration: number) {
    return this.internal.setGroupBan(guildId, userId, duration / 1000)
  }

  async muteChannel(channelId: string, guildId?: string, enable?: boolean) {
    return this.internal.setGroupWholeBan(channelId, enable)
  }
}

OneBotBot.prototype.platform = 'onebot'

export namespace OneBotBot {
  export interface QQGuildConfig extends Bot.Config {}

  export const QQGuildConfig: Schema<QQGuildConfig> = Schema.object({
    platform: Schema.string().default('qqguild').description('QQ 频道的平台名称'),
  })

  export interface BaseConfig extends BaseBot.Config {
    selfId: string
    password?: string
    token?: string
    qqguild?: QQGuildConfig
  }

  export const BaseConfig: Schema<BaseConfig> = Schema.object({
    selfId: Schema.string().description('机器人的账号。').required(),
    token: Schema.string().role('secret').description('发送信息时用于验证的字段，应与 OneBot 配置文件中的 `access_token` 保持一致。'),
    protocol: process.env.KOISHI_ENV === 'browser'
      ? Schema.const('ws').default('ws')
      : Schema.union(['http', 'ws', 'ws-reverse']).description('选择要使用的协议。').default('ws-reverse'),
    qqguild: QQGuildConfig.hidden(),
  })

  export type Config = BaseConfig & (HttpServer.Config | WsServer.Config | WsClient.Config)

  export const Config: Schema<Config> = Schema.intersect([
    BaseConfig,
    Schema.union([
      HttpServer.Config,
      WsClient.Config,
      WsServer.Config,
    ]),
    Schema.object({
      advanced: BaseBot.AdvancedConfig,
    }),
  ])
}
