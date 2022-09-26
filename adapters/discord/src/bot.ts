import { Bot, Context, Message, Quester, Schema, segment } from '@satorijs/satori'
import { adaptChannel, adaptGuild, adaptMessage, adaptUser } from './utils'
import { Sender } from './sender'
import { Internal } from './types'
import { WsClient } from './ws'

export class DiscordBot<C extends Context = Context> extends Bot<C, DiscordBot.Config> {
  public http: Quester
  public internal: Internal

  constructor(ctx: C, config: DiscordBot.Config) {
    super(ctx, config)
    this.http = ctx.http.extend({
      ...config,
      headers: {
        Authorization: `Bot ${config.token}`,
        ...config.headers,
      },
    })
    this.internal = new Internal(this.http)
    ctx.plugin(WsClient, this)
  }

  async getSelf() {
    const data = await this.internal.getCurrentUser()
    return adaptUser(data)
  }

  private parseQuote(chain: segment[]) {
    if (chain[0].type !== 'quote') return
    return chain.shift().attrs.id
  }

  async sendMessage(channelId: string, content: string | segment, guildId?: string) {
    const fragment = segment.normalize(content)
    const elements = fragment.children
    content = fragment.toString()
    const session = this.session({
      type: 'send',
      author: this,
      channelId,
      elements,
      content,
      guildId,
      subtype: guildId ? 'group' : 'private',
    })

    if (await this.context.serial(session, 'before-send', session)) return
    if (!session?.content) return []

    const chain = segment.parse(session.content)
    const quote = this.parseQuote(chain)
    const message_reference = quote ? {
      message_id: quote,
    } : undefined

    const send = Sender.from(this, `/channels/${channelId}/messages`)
    const results = await send(session.content, { message_reference })

    for (const id of results) {
      session.messageId = id
      this.context.emit(session, 'send', session)
    }

    return results
  }

  async sendPrivateMessage(channelId: string, content: string | segment) {
    return this.sendMessage(channelId, content)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteMessage(channelId, messageId)
  }

  async editMessage(channelId: string, messageId: string, content: string | segment) {
    const fragment = segment.normalize(content)
    content = fragment.toString()
    const chain = fragment.children
    const image = chain.find(v => v.type === 'image')
    if (image) {
      throw new Error("You can't include embed object(s) while editing message.")
    }
    await this.internal.editMessage(channelId, messageId, {
      content,
    })
  }

  async getMessage(channelId: string, messageId: string): Promise<Message> {
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
  export interface Config extends Bot.Config, Quester.Config, Sender.Config, WsClient.Config {
    token: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
    }),
    WsClient.Config,
    Sender.Config,
    Quester.createConfig('https://discord.com/api/v10'),
  ])
}

DiscordBot.prototype.platform = 'discord'
