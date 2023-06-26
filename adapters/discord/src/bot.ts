import { Bot, Context, Fragment, h, Quester, Schema, SendOptions, Universal } from '@satorijs/satori'
import { adaptChannel, adaptGuild, adaptMessage, adaptUser, decodeRole, encodeRole } from './utils'
import { DiscordMessageEncoder } from './message'
import { Internal, Webhook } from './types'
import { WsClient } from './ws'

// @ts-ignore
import { version } from '../package.json'

export class DiscordBot extends Bot<DiscordBot.Config> {
  static MessageEncoder = DiscordMessageEncoder

  public http: Quester
  public internal: Internal
  public webhooks: Record<string, Webhook> = {}
  public webhookLock: Record<string, Promise<Webhook>> = {}

  constructor(ctx: Context, config: DiscordBot.Config) {
    super(ctx, config)
    this.http = ctx.http.extend({
      ...config,
      headers: {
        Authorization: `Bot ${config.token}`,
        'User-Agent': `Koishi (https://koishi.chat/, ${version})`,
        ...config.headers,
      },
    })
    this.internal = new Internal(this.http)
    ctx.plugin(WsClient, this)
  }

  private async _ensureWebhook(channelId: string) {
    let webhook: Webhook
    const webhooks = await this.internal.getChannelWebhooks(channelId)
    const selfId = this.selfId
    if (!webhooks.find(v => v.name === 'Koishi' && v.user.id === selfId)) {
      webhook = await this.internal.createWebhook(channelId, {
        name: 'Koishi',
      })
      // webhook may be `AxiosError: Request failed with status code 429` error
    } else {
      webhook = webhooks.find(v => v.name === 'Koishi' && v.user.id === this.selfId)
    }
    return this.webhooks[channelId] = webhook
  }

  async ensureWebhook(channelId: string) {
    if (this.webhooks[channelId] === null) {
      delete this.webhooks[channelId]
      delete this.webhookLock[channelId]
    }
    if (this.webhooks[channelId]) {
      delete this.webhookLock[channelId]
      return this.webhooks[channelId]
    }
    return this.webhookLock[channelId] ||= this._ensureWebhook(channelId)
  }

  async getSelf() {
    const data = await this.internal.getCurrentUser()
    return adaptUser(data)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteMessage(channelId, messageId)
  }

  async editMessage(channelId: string, messageId: string, content: Fragment) {
    const elements = h.normalize(content)
    content = elements.toString()
    const image = elements.find(v => v.type === 'image')
    if (image) {
      throw new Error("You can't include embed object(s) while editing message.")
    }
    await this.internal.editMessage(channelId, messageId, {
      content,
    })
  }

  async getMessage(channelId: string, messageId: string) {
    const data = await this.internal.getChannelMessage(channelId, messageId)
    return await adaptMessage(this, data)
  }

  async getMessageList(channelId: string, before?: string) {
    // doesn't include `before` message
    // 从旧到新
    const data = (await this.internal.getChannelMessages(channelId, { before, limit: 50 })).reverse()
    return await Promise.all(data.map(data => adaptMessage(this, data)))
  }

  async getUser(userId: string) {
    const data = await this.internal.getUser(userId)
    return adaptUser(data)
  }

  async getGuildMemberList(guildId: string) {
    const data = await this.internal.listGuildMembers(guildId)
    return data.map(v => adaptUser(v.user))
  }

  async getChannel(channelId: string) {
    const data = await this.internal.getChannel(channelId)
    return adaptChannel(data)
  }

  async getGuildMember(guildId: string, userId: string) {
    const member = await this.internal.getGuildMember(guildId, userId)
    return {
      ...adaptUser(member.user),
      nickname: member.nick,
    }
  }

  async kickGuildMember(guildId: string, userId: string) {
    return this.internal.removeGuildMember(guildId, userId)
  }

  async getGuild(guildId: string) {
    const data = await this.internal.getGuild(guildId)
    return adaptGuild(data)
  }

  async getGuildList() {
    const data = await this.internal.getCurrentUserGuilds()
    return data.map(adaptGuild)
  }

  async getChannelList(guildId: string) {
    const data = await this.internal.getGuildChannels(guildId)
    return data.map(adaptChannel)
  }

  createReaction(channelId: string, messageId: string, emoji: string) {
    return this.internal.createReaction(channelId, messageId, emoji)
  }

  deleteReaction(channelId: string, messageId: string, emoji: string, userId?: string) {
    if (!userId) {
      return this.internal.deleteOwnReaction(channelId, messageId, emoji)
    } else {
      return this.internal.deleteUserReaction(channelId, messageId, emoji, userId)
    }
  }

  clearReaction(channelId: string, messageId: string, emoji?: string) {
    if (!emoji) {
      return this.internal.deleteAllReactions(channelId, messageId)
    } else {
      return this.internal.deleteAllReactionsForEmoji(channelId, messageId, emoji)
    }
  }

  async getReactions(channelId: string, messageId: string, emoji: string) {
    const data = await this.internal.getReactions(channelId, messageId, emoji)
    return data.map(adaptUser)
  }

  setGuildMemberRole(guildId: string, userId: string, roleId: string) {
    return this.internal.addGuildMemberRole(guildId, userId, roleId)
  }

  unsetGuildMemberRole(guildId: string, userId: string, roleId: string) {
    return this.internal.removeGuildMemberRole(guildId, userId, roleId)
  }

  async getGuildRoles(guildId: string) {
    const data = await this.internal.getGuildRoles(guildId)
    return data.map(decodeRole)
  }

  async createGuildRole(guildId: string, data: Partial<Universal.Role>) {
    const role = await this.internal.createGuildRole(guildId, encodeRole(data))
    return decodeRole(role)
  }

  async modifyGuildRole(guildId: string, roleId: string, data: Partial<Universal.Role>) {
    await this.internal.modifyGuildRole(guildId, roleId, encodeRole(data))
  }

  deleteGuildRole(guildId: string, roleId: string) {
    return this.internal.deleteGuildRole(guildId, roleId)
  }

  async sendPrivateMessage(userId: string, content: Fragment, options?: SendOptions) {
    const channel = await this.internal.createDM({
      recipient_id: userId,
    })
    return this.sendMessage(channel.id, content, null, options)
  }
}

export namespace DiscordBot {
  export interface Config extends Bot.Config, Quester.Config, DiscordMessageEncoder.Config, WsClient.Config {
    token: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
    }),
    WsClient.Config,
    DiscordMessageEncoder.Config,
    Quester.createConfig('https://discord.com/api/v10'),
  ])
}

DiscordBot.prototype.platform = 'discord'
