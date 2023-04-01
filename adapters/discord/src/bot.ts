import { Bot, Context, Fragment, Quester, Schema, SendOptions, segment } from '@satorijs/satori'
import { adaptChannel, adaptGuild, adaptMessage, adaptUser } from './utils'
import { DiscordMessenger } from './message'
import { Internal, Webhook } from './types'
import { WsClient } from './ws'

// @ts-ignore
import { version } from '../package.json'

export class DiscordBot extends Bot<DiscordBot.Config> {
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
    let webhook: Webhook;
    let webhooks = await this.internal.getChannelWebhooks(channelId)
    let selfId = this.selfId
    if (!webhooks.find(v => v.name === "Koishi" && v.user.id === selfId)) {
      webhook = await this.internal.createWebhook(channelId, {
        name: "Koishi"
      })
      // webhook may be `AxiosError: Request failed with status code 429` error
    } else {
      webhook = webhooks.find(v => v.name === "Koishi" && v.user.id === this.selfId)
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

  async sendMessage(channelId: string, content: Fragment, guildId?: string, options?: SendOptions) {
    return new DiscordMessenger(this, channelId, guildId, options).send(content)
  }

  async sendPrivateMessage(channelId: string, content: Fragment, options?: SendOptions) {
    return new DiscordMessenger(this, channelId, null, options).send(content)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteMessage(channelId, messageId)
  }

  async editMessage(channelId: string, messageId: string, content: Fragment) {
    const elements = segment.normalize(content)
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
    return data.map(v => adaptGuild(v))
  }

  async getChannelList(guildId: string) {
    const data = await this.internal.getGuildChannels(guildId)
    return data.map(v => adaptChannel(v))
  }
}

export namespace DiscordBot {
  export interface Config extends Bot.Config, Quester.Config, DiscordMessenger.Config, WsClient.Config {
    token: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
    }),
    WsClient.Config,
    DiscordMessenger.Config,
    Quester.createConfig('https://discord.com/api/v10'),
  ])
}

DiscordBot.prototype.platform = 'discord'
