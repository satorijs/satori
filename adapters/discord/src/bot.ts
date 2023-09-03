import { Bot, Context, defineProperty, Fragment, h, isNullable, Logger, Quester, Schema, SendOptions, Universal } from '@satorijs/satori'
import { decodeChannel, decodeGuild, decodeMessage, decodeRole, decodeUser, encodeRole } from './utils'
import * as Discord from './utils'
import { DiscordMessageEncoder } from './message'
import { Internal, Webhook } from './types'
import { WsClient } from './ws'

// @ts-ignore
import { version } from '../package.json'

const logger = new Logger('discord')

export class DiscordBot extends Bot<DiscordBot.Config> {
  static MessageEncoder = DiscordMessageEncoder

  public http: Quester
  public internal: Internal
  public webhooks: Record<string, Webhook> = {}
  public webhookLock: Record<string, Promise<Webhook>> = {}
  public commands: Universal.Command[] = []

  constructor(ctx: Context, config: DiscordBot.Config) {
    super(ctx, config)
    this.platform = 'discord'
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

  session(payload?: any, input?: any) {
    return defineProperty(super.session(payload), 'discord', Object.assign(Object.create(this.internal), input))
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
    return decodeUser(data)
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
    return await decodeMessage(this, data)
  }

  async getMessageList(channelId: string, before?: string) {
    const data = await this.internal.getChannelMessages(channelId, { before, limit: 100 })
    return { data: await Promise.all(data.reverse().map(data => decodeMessage(this, data, {}, false))) }
  }

  async getUser(userId: string) {
    const data = await this.internal.getUser(userId)
    return decodeUser(data)
  }

  async getGuildMemberList(guildId: string) {
    const data = await this.internal.listGuildMembers(guildId)
    return { data: data.map(v => decodeUser(v.user)) }
  }

  async getChannel(channelId: string) {
    const data = await this.internal.getChannel(channelId)
    return decodeChannel(data)
  }

  async getGuildMember(guildId: string, userId: string) {
    const member = await this.internal.getGuildMember(guildId, userId)
    return {
      ...decodeUser(member.user),
      nickname: member.nick,
    }
  }

  async kickGuildMember(guildId: string, userId: string) {
    return this.internal.removeGuildMember(guildId, userId)
  }

  async getGuild(guildId: string) {
    const data = await this.internal.getGuild(guildId)
    return decodeGuild(data)
  }

  async getGuildList() {
    const data = await this.internal.getCurrentUserGuilds()
    return data.map(decodeGuild)
  }

  async getChannelList(guildId: string) {
    const data = await this.internal.getGuildChannels(guildId)
    return data.map(decodeChannel)
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
    return data.map(decodeUser)
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
    return role.id
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

  async updateCommands(commands: Universal.Command[]) {
    this.commands = commands
    const local = Object.fromEntries(commands.map(cmd => [cmd.name, cmd] as const))
    const remote = Object.fromEntries((await this.internal.getGlobalApplicationCommands(this.selfId, { with_localizations: true }))
      .filter(cmd => cmd.type === Discord.ApplicationCommand.Type.CHAT_INPUT)
      .map(cmd => [cmd.name, cmd] as const))
    const updates: any[] = []
    for (const key in { ...local, ...remote }) {
      if (!local[key]) {
        logger.debug('delete command %s', key)
        await this.internal.deleteGlobalApplicationCommand(this.selfId, remote[key].id)
        continue
      }
      const data = Discord.encodeCommand(local[key])
      logger.debug(data, remote[key])
      if (!remote[key]) {
        logger.debug('create command: %s', local[key].name)
        updates.push(data)
      } else if (!shapeEqual(data, remote[key])) {
        logger.debug('edit command: %s', local[key].name)
        updates.push(data)
      }
    }
    if (updates.length) {
      await this.internal.bulkOverwriteGlobalApplicationCommands(this.selfId, updates)
    }
  }
}

function shapeEqual(a: any, b: any) {
  if (a === b) return true
  if (isNullable(a) && isNullable(b)) return true

  if (typeof a !== typeof b) return false
  if (typeof a !== 'object') return false
  if (Object.values(a).every(isNullable) && isNullable(b)) return true
  // ^ a = { foo: undefined }, b = null
  if (!a || !b) return false

  // check array
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false
    return a.every((item, index) => shapeEqual(item, b[index]))
  } else if (Array.isArray(b)) {
    return false
  }

  // check object
  return Object.keys(a).every(key => shapeEqual(a[key], b[key]))
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
