import { Bot, Context, Fragment, h, Quester, Schema, Universal } from '@satorijs/satori'
import * as Discord from './utils'
import { DiscordMessageEncoder } from './message'
import { Internal, Webhook } from './types'
import { WsClient } from './ws'

// @ts-ignore
import { version } from '../package.json'

export class DiscordBot<C extends Context = Context> extends Bot<C, DiscordBot.Config> {
  static MessageEncoder = DiscordMessageEncoder

  public http: Quester
  public internal: Internal
  public webhooks: Record<string, Webhook> = {}
  public webhookLock: Record<string, Promise<Webhook>> = {}
  public commands: Universal.Command[] = []

  constructor(ctx: C, config: DiscordBot.Config) {
    super(ctx, config, 'discord')
    this.http = ctx.http.extend({
      ...config,
      headers: {
        Authorization: `Bot ${config.token}`,
        'User-Agent': `Koishi (https://koishi.chat/, ${version})`,
        ...config.headers,
      },
    })
    this.internal = new Internal(this)
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

  async getLogin() {
    const data = await this.internal.getCurrentUser()
    this.user = Discord.decodeUser(data)
    return this.toJSON()
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
    return await Discord.decodeMessage(this, data, {})
  }

  async getMessageList(channelId: string, before?: string) {
    const messages = await this.internal.getChannelMessages(channelId, { before, limit: 100 })
    const data = await Promise.all(messages.reverse().map(data => Discord.decodeMessage(this, data, {}, undefined, false)))
    return { data, next: data[0]?.id }
  }

  async getUser(userId: string) {
    const data = await this.internal.getUser(userId)
    return Discord.decodeUser(data)
  }

  async getGuildMemberList(guildId: string, after?: string) {
    const users = await this.internal.listGuildMembers(guildId, { after, limit: 1000 })
    const data = users.map(v => Discord.decodeGuildMember(v))
    return { data, next: data[999]?.user.id }
  }

  async getChannel(channelId: string) {
    const data = await this.internal.getChannel(channelId)
    return Discord.decodeChannel(data)
  }

  async getGuildMember(guildId: string, userId: string) {
    const member = await this.internal.getGuildMember(guildId, userId)
    return Discord.decodeGuildMember(member)
  }

  async kickGuildMember(guildId: string, userId: string) {
    return this.internal.removeGuildMember(guildId, userId)
  }

  async getGuild(guildId: string) {
    const data = await this.internal.getGuild(guildId)
    return Discord.decodeGuild(data)
  }

  async getGuildList(after?: string) {
    const guilds = await this.internal.getCurrentUserGuilds({ after, limit: 200 })
    const data = guilds.map(Discord.decodeGuild)
    return { data, next: data[199]?.id }
  }

  async getChannelList(guildId: string) {
    const channels = await this.internal.getGuildChannels(guildId)
    return { data: channels.map(Discord.decodeChannel) }
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

  async getReactionList(channelId: string, messageId: string, emoji: string, after?: string) {
    const data = await this.internal.getReactions(channelId, messageId, emoji, { after, limit: 100 })
    return { data: data.map(Discord.decodeUser), next: data[99]?.id }
  }

  setGuildMemberRole(guildId: string, userId: string, roleId: string) {
    return this.internal.addGuildMemberRole(guildId, userId, roleId)
  }

  unsetGuildMemberRole(guildId: string, userId: string, roleId: string) {
    return this.internal.removeGuildMemberRole(guildId, userId, roleId)
  }

  async getGuildRoleList(guildId: string) {
    const data = await this.internal.getGuildRoles(guildId)
    return { data: data.map(Discord.decodeRole) }
  }

  async createGuildRole(guildId: string, data: Partial<Universal.GuildRole>) {
    const role = await this.internal.createGuildRole(guildId, Discord.encodeRole(data))
    return Discord.decodeRole(role)
  }

  async updateGuildRole(guildId: string, roleId: string, data: Partial<Universal.GuildRole>) {
    await this.internal.modifyGuildRole(guildId, roleId, Discord.encodeRole(data))
  }

  deleteGuildRole(guildId: string, roleId: string) {
    return this.internal.deleteGuildRole(guildId, roleId)
  }

  async createDirectChannel(userId: string) {
    const channel = await this.internal.createDM({ recipient_id: userId })
    return Discord.decodeChannel(channel)
  }

  async updateCommands(commands: Universal.Command[]) {
    if (!this.config.slash) return
    this.commands = commands
    const updates = commands.map(Discord.encodeCommand)
    if (updates.length) {
      this.logger.debug('update %d command(s)', updates.length)
      await this.internal.bulkOverwriteGlobalApplicationCommands(this.selfId, updates)
    }
  }
}

export namespace DiscordBot {
  export interface Config extends Quester.Config, DiscordMessageEncoder.Config, WsClient.Config {
    token: string
    slash?: boolean
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
    }),
    Schema.object({
      slash: Schema.boolean().description('是否启用斜线指令。').default(true),
    }).description('功能设置'),
    WsClient.Config,
    DiscordMessageEncoder.Config,
    Quester.createConfig('https://discord.com/api/v10'),
  ])
}
