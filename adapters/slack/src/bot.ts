import { Bot, Context, Inject, Universal } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { WsClient } from './ws'
import { HttpServer } from './http'
import { adaptMessage, decodeChannel, decodeGuild, decodeGuildMember, decodeUser } from './utils'
import { SlackMessageEncoder } from './message'
import { GenericMessageEvent, SlackChannel, SlackTeam, SlackUser } from './types'
import { Internal, Token } from './types/internal'
import z from 'schemastery'

@Inject('http', true, { baseUrl: 'https://slack.com/api/' })
@Inject('logger', true, { name: 'slack' })
export class SlackBot<T extends SlackBot.Config = SlackBot.Config> extends Bot<T> {
  static MessageEncoder = SlackMessageEncoder

  public http: HTTP
  public internal: Internal
  public adapter?: HttpServer | WsClient

  constructor(ctx: Context, config: T) {
    super(ctx, config, 'slack')
    this.http = ctx.http
    this.internal = new Internal(this, this.http)

    if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this as any)
    } else {
      ctx.plugin(HttpServer, this)
    }
  }

  async connect() {
    await this.adapter?.connect()
  }

  async disconnect() {
    await this.adapter?.disconnect()
  }

  async request<T = any>(method: string, path: string, data = {}, headers: any = {}, zap: boolean = false): Promise<T> {
    headers['Authorization'] = `Bearer ${zap ? this.config.token : this.config.botToken}`
    if (method === 'GET') {
      return await this.http.get(path, { params: data, headers })
    } else {
      const response = await this.http(path, { method, data, headers })
      return await response.json()
    }
  }

  async getLogin() {
    const data = await this.internal.authTest(Token.BOT)
    this.user = {
      id: data.user_id,
      name: data.user,
      avatar: null,
      isBot: !!data.bot_id,
    }
    return this.toJSON()
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.chatDelete(Token.BOT, {
      channel: channelId,
      ts: Number(messageId),
    })
  }

  async getMessage(channelId: string, messageId: string) {
    const { messages: [data] } = await this.internal.conversationsHistory(Token.BOT, {
      channel: channelId,
      oldest: Number(messageId),
      limit: 1,
      inclusive: true,
    })
    if (!data) return
    const message = {} as Universal.Message
    await adaptMessage(this, data, message, message)
    return message
  }

  async getMessageList(channelId: string, before?: string) {
    const { messages } = await this.request<{
      messages: GenericMessageEvent[]
    }>('POST', '/conversations.history', {
      channel: channelId,
      latest: before,
    })
    const data = await Promise.all(messages.map(async v => {
      const message = {} as Universal.Message
      await adaptMessage(this, v, message, message)
      return message
    }))
    return { data, next: data[0]?.id }
  }

  async getUser(userId: string, guildId?: string) {
    // users:read
    // @TODO guildId
    const { user } = await this.request<{ user: SlackUser }>('POST', '/users.info', {
      user: userId,
    })
    return decodeUser(user)
  }

  async getGuildMemberList(guildId: string) {
    // users:read
    const { members } = await this.request<{ members: SlackUser[] }>('POST', '/users.list')
    return { data: members.map(decodeGuildMember) }
  }

  async getChannel(channelId: string, guildId?: string) {
    const { channel } = await this.request<{
      channel: SlackChannel
    }>('POST', '/conversations.info', {
      channel: channelId,
    })
    return decodeChannel(channel)
  }

  async getChannelList(guildId: string) {
    const { channels } = await this.request<{
      channels: SlackChannel[]
    }>('POST', '/conversations.list', {
      team_id: guildId,
    })
    return { data: channels.map(decodeChannel) }
  }

  async getGuild(guildId?: string) {
    const { team } = await this.request<{ team: SlackTeam }>('POST', '/team.info', {
      team_id: guildId,
    })
    return decodeGuild(team)
  }

  async getGuildList() {
    return { data: [await this.getGuild()] }
  }

  async getGuildMember(guildId: string, userId: string) {
    const { user } = await this.request<{ user: SlackUser }>('POST', '/users.info', {
      user: userId,
    })
    return decodeGuildMember(user)
  }

  async createDirectChannel(userId: string) {
    // "channels:write,groups:write,mpim:write,im:write",
    const { channel } = await this.internal.conversationsOpen(Token.BOT, {
      users: userId,
    })
    return { id: channel.id, type: Universal.Channel.Type.DIRECT }
  }

  async getReactions(channelId: string, messageId: string, emoji: string) {
    const { message } = await this.internal.reactionsGet(Token.BOT, {
      channel: channelId,
      timestamp: messageId,
      full: true,
    })
    return message.reactions.find(v => v.name === emoji)?.users.map(v => ({
      id: v,
    })) ?? []
  }

  async createReaction(channelId: string, messageId: string, emojiId: string) {
    // reactions.write
    await this.internal.reactionsAdd(Token.BOT, {
      channel: channelId,
      timestamp: messageId,
      name: emojiId,
    })
  }

  async clearReaction(channelId: string, messageId: string, emojiId?: string) {
    const { message } = await this.internal.reactionsGet(Token.BOT, {
      channel: channelId,
      timestamp: messageId,
      full: true,
    })
    for (const reaction of message.reactions) {
      if (!emojiId || reaction.name === emojiId) {
        await this.internal.reactionsRemove(Token.BOT, {
          channel: channelId,
          timestamp: messageId,
          name: reaction.name,
        })
      }
    }
  }
}

export namespace SlackBot {
  export interface BaseConfig extends HTTP.Config {
    token: string
    botToken: string
  }

  export type Config = BaseConfig & (HttpServer.Options | WsClient.Options)

  export const Config: z<Config> = z.intersect([
    z.object({
      protocol: z.union(['http', 'ws']).description('选择要使用的协议。').required(),
      token: z.string().description('App-Level Token.').role('secret').required(),
      botToken: z.string().description('OAuth Token.').role('secret').required(),
    }),
    z.union([
      WsClient.Options,
      HttpServer.Options,
    ]),
  ] as const)
}
