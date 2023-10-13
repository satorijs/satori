import { Bot, Context, Quester, Universal } from '@satorijs/satori'
import { QQBot } from '.'
import { decodeChannel, decodeGuild, decodeGuildMember, decodeMessage, decodeUser } from '../utils'
import { GuildInternal } from '../internal/guild'
import { QQGuildMessageEncoder } from '../message'

export namespace QQGuildBot {
  export interface Config {
    parent: QQBot
  }
}

export class QQGuildBot extends Bot {
  declare parent: QQBot
  hidden = true
  public internal: GuildInternal
  public http: Quester
  static MessageEncoder = QQGuildMessageEncoder

  constructor(ctx: Context, config: QQGuildBot.Config) {
    super(ctx, config)
    this.parent = config.parent
    this.parent.guildBot = this
    this.platform = 'qqguild'
    this.internal = new GuildInternal(() => config.parent.guildHttp)
    this.http = config.parent.guildHttp
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
    await this.internal.removeGuildMember(guildId, userId)
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

  async getLogin(): Promise<Universal.Login> {
    return this.parent.getLogin()
  }

  async createDirectChannel(id: string, guild_id?: string) {
    let input_guild_id = guild_id
    if (guild_id?.includes('_')) input_guild_id = guild_id.split('_')[0] // call sendPM directly from DM channel
    const dms = await this.internal.createDMS(id, input_guild_id)
    return { id: `${dms.guild_id}_${input_guild_id}`, type: Universal.Channel.Type.DIRECT }
  }
}
