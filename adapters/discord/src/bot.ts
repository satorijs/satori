import { Bot, Context, Message, Quester, Schema, segment } from '@satorijs/satori'
import { adaptChannel, adaptGuild, adaptMessage, adaptMessageSession, adaptUser, prepareMessageSession } from './utils'
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

  private parseQuote(chain: segment.Chain) {
    if (chain[0].type !== 'quote') return
    return chain.shift().data.id
  }

  async sendMessage(channelId: string, content: string, guildId?: string) {
    const session = this.session({
      type: 'send',
      author: this,
      channelId,
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

  async sendPrivateMessage(channelId: string, content: string) {
    return this.sendMessage(channelId, content)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteMessage(channelId, messageId)
  }

  async editMessage(channelId: string, messageId: string, content: string) {
    const chain = segment.parse(content)
    const image = chain.find(v => v.type === 'image')
    if (image) {
      throw new Error("You can't include embed object(s) while editing message.")
    }
    await this.internal.editMessage(channelId, messageId, {
      content,
    })
  }

  async getMessage(channelId: string, messageId: string): Promise<Message> {
    const original = await this.internal.getChannelMessage(channelId, messageId)
    const result = adaptMessage(original)
    const reference = original.message_reference
    if (reference) {
      const quoteMsg = await this.internal.getChannelMessage(reference.channel_id, reference.message_id)
      result.quote = adaptMessage(quoteMsg)
    }
    return result
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

  async getMessageList(channelId: string, before?: string) {
    // doesnt include `before` message
    // 从旧到新
    const data = (await this.internal.getChannelMessages(channelId, {
      before: before,
      limit: 50,
    })).reverse()
    return data.map(v => {
      const session = {}
      prepareMessageSession(session, v)
      adaptMessageSession(v, session)
      return session
    }) as unknown as Message[]
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
    Quester.createConfig('https://discord.com/api/v8'),
  ])
}

DiscordBot.prototype.platform = 'discord'
