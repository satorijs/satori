import { Bot, Context, defineProperty, Quester, Schema, Universal } from '@satorijs/satori'
import { decodeChannel, decodeGuild, decodeGuildMember, decodeMessage, decodeUser } from './utils'
import { QQMessageEncoder } from './message'
import { WsClient } from './ws'
import { Internal } from './internal'
import * as QQ from './types'

interface GetAppAccessTokenResult {
  access_token: string
  expires_in: number
}

export class QQBot extends Bot<QQBot.Config> {
  static MessageEncoder = QQMessageEncoder

  internal: Internal
  groupHttp: Quester
  guildHttp: Quester

  private _token: string
  private _timer: NodeJS.Timeout

  constructor(ctx: Context, config: QQBot.Config) {
    super(ctx, config)
    this.platform = 'qq'
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
    this.internal = new Internal(() => this.guildHttp)
    // this.internal = new Internal(() => this.groupHttp)
    ctx.plugin(WsClient, this)
  }

  async _ensureAccessToken() {
    const result = await this.ctx.http.post<GetAppAccessTokenResult>('https://bots.qq.com/app/getAppAccessToken', {
      appId: this.config.id,
      clientSecret: this.config.secret,
    })
    this._token = result.access_token
    this.groupHttp = this.ctx.http.extend({
      endpoint: this.config.endpoint,
      headers: {
        'Authorization': `QQBot ${this._token}`,
        'X-Union-Appid': this.config.id,
      },
    })
    // 在上一个 access_token 接近过期的 60 秒内
    // 重新请求可以获取到一个新的 access_token
    this._timer = setTimeout(() => {
      this._ensureAccessToken()
    }, (result.expires_in - 40) * 1000)
  }

  async getAccessToken() {
    if (!this._token) {
      await this._ensureAccessToken()
    }
    return this._token
  }

  stop() {
    clearTimeout(this._timer)
    return super.stop()
  }

  session(payload?: any, input?: any) {
    return defineProperty(super.session(payload), 'qq', Object.assign(Object.create(this.internal), input))
  }

  async getLogin() {
    this.user = decodeUser(await this.internal.getMe())
    return this.toJSON()
  }

  async getUser(userId: string, guildId?: string): Promise<Universal.User> {
    const { user } = await this.getGuildMember(guildId, userId)
    return user
  }

  async getGuildList(next?: string) {
    const guilds = await this.internal.getGuilds()
    return { data: guilds.map(decodeGuild) }
  }

  async getGuild(guildId: string) {
    const guild = await this.internal.getGuild(guildId)
    return decodeGuild(guild)
  }

  async getChannelList(guildId: string, next?: string): Promise<Universal.List<Universal.Channel>> {
    const channels = await this.internal.getChannels(guildId)
    return { data: channels.map(decodeChannel) }
  }

  async getChannel(channelId: string): Promise<Universal.Channel> {
    const channel = await this.internal.getChannel(channelId)
    return decodeChannel(channel)
  }

  async getGuildMemberList(guildId: string, next?: string): Promise<Universal.List<Universal.GuildMember>> {
    const members = await this.internal.getGuildMembers(guildId, {
      limit: 400,
      after: next,
    })
    return { data: members.map(decodeGuildMember), next: members[members.length - 1].user.id }
  }

  async getGuildMember(guildId: string, userId: string): Promise<Universal.GuildMember> {
    const member = await this.internal.getGuildMember(guildId, userId)
    return decodeGuildMember(member)
  }

  async kickGuildMember(guildId: string, userId: string) {
    await this.internal.deleteGuildMember(guildId, userId)
  }

  async muteGuildMember(guildId: string, userId: string, duration: number) {
    await this.internal.muteGuildMember(guildId, userId, duration)
  }

  async getReactionList(channelId: string, messageId: string, emoji: string, next?: string): Promise<Universal.List<Universal.User>> {
    const [type, id] = emoji.split(':')
    const { users, cookie } = await this.internal.getReactions(channelId, messageId, type, id, {
      limit: 50,
      cookie: next,
    })
    return { next: cookie, data: users.map(decodeUser) }
  }

  async createReaction(channelId: string, messageId: string, emoji: string) {
    const [type, id] = emoji.split(':')
    await this.internal.createReaction(channelId, messageId, type, id)
  }

  async deleteReaction(channelId: string, messageId: string, emoji: string) {
    const [type, id] = emoji.split(':')
    await this.internal.deleteReaction(channelId, messageId, type, id)
  }

  async getMessage(channelId: string, messageId: string): Promise<Universal.Message> {
    const r = await this.internal.getMessage(channelId, messageId)
    return decodeMessage(this, r)
  }

  async deleteMessage(channelId: string, messageId: string) {
    if (channelId.includes('_')) {
      // direct message
      const [guildId] = channelId.split('_')
      await this.internal.deleteDM(guildId, messageId)
    } else {
      await this.internal.deleteMessage(channelId, messageId)
    }
  }
}

export namespace QQBot {
  export interface Config extends Bot.Config, QQ.Options, WsClient.Config {
    intents?: number
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      id: Schema.string().description('机器人 id。').required(),
      secret: Schema.string().description('机器人密钥。').role('secret').required(),
      token: Schema.string().description('机器人令牌。').role('secret').required(),
      type: Schema.union(['public', 'private'] as const).description('机器人类型。').required(),
      sandbox: Schema.boolean().description('是否开启沙箱模式。').default(false),
      endpoint: Schema.string().role('link').description('要连接的服务器地址。').default('https://api.sgroup.qq.com/'),
      authType: Schema.union(['bot', 'bearer'] as const).description('采用的验证方式。').default('bot'),
      intents: Schema.bitset(QQ.Intents).description('需要订阅的机器人事件。'),
    }),
    WsClient.Config,
  ] as const)
}
