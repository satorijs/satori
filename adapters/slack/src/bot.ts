import { Bot, Context, Fragment, Quester, Schema, SendOptions, Universal } from '@satorijs/satori'
import { WsClient } from './ws'
import { HttpServer } from './http'
import { adaptChannel, adaptGuild, adaptMessage, adaptUser, AuthTestResponse } from './utils'
import { SlackMessageEncoder } from './message'
import { GenericMessageEvent, SlackChannel, SlackTeam, SlackUser } from './types'
import FormData from 'form-data'

export class SlackBot<T extends SlackBot.Config = SlackBot.Config> extends Bot<T> {
  static MessageEncoder = SlackMessageEncoder
  public http: Quester

  constructor(ctx: Context, config: T) {
    super(ctx, config)
    this.http = ctx.http.extend({
      headers: {
        // 'Authorization': `Bearer ${config.token}`,
      },
    }).extend(config)

    if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this)
    }
  }

  async request<T = any>(method: Quester.Method, path: string, data = {}, headers: any = {}, zap: boolean = false): Promise<T> {
    headers['Authorization'] = `Bearer ${zap ? this.config.token : this.config.botToken}`
    if (method === 'GET') {
      return (await this.http.get(path, { params: data, headers })).data
    } else {
      data = data instanceof FormData ? data : JSON.stringify(data)
      const type = data instanceof FormData ? 'multipart/form-data' : 'application/json; charset=utf-8'
      headers['content-type'] = type
      return (await this.http(method, path, { data, headers }))
    }
  }

  async getSelf() {
    const data = await this.request<AuthTestResponse>('POST', '/auth.test')
    return {
      userId: data.user_id,
      avatar: null,
      username: data.user,
      isBot: !!data.bot_id,
    }
  }

  async deleteMessage(channelId: string, messageId: string): Promise<void> {
    return this.request('POST', '/chat.delete', { channel: channelId, ts: messageId })
  }

  async getMessage(channelId: string, messageId: string): Promise<Universal.Message> {
    const msg = await this.request<{
      messages: GenericMessageEvent[]
    }>('POST', '/conversations.history', {
      channel: channelId,
      oldest: messageId,
      limit: 1,
      inclusive: true
    })
    return adaptMessage(this, msg.messages[0])
  }

  async getMessageList(channelId: string, before?: string): Promise<Universal.Message[]> {
    const msg = await this.request<{
      messages: GenericMessageEvent[]
    }>('POST', '/conversations.history', {
      channel: channelId,
      latest: before,
    })
    return msg.messages.map(v => adaptMessage(this, v))
  }

  async getUser(userId: string, guildId?: string): Promise<Universal.User> {
    // users:read
    // @TODO guildId
    const { user } = await this.request<{ user: SlackUser }>('POST', '/users.info', {
      user: userId,
    })
    return adaptUser(user)
  }

  async getGuildMemberList(guildId: string): Promise<Universal.GuildMember[]> {
    // users:read
    const { members } = await this.request<{ members: SlackUser[] }>('POST', '/users.list')
    return members.map(adaptUser)
  }

  async getChannel(channelId: string, guildId?: string): Promise<Universal.Channel> {
    const { channel } = await this.request<{
      channel: SlackChannel
    }>('POST', '/conversations.info', {
      channel: channelId,
    })
    return adaptChannel(channel)
  }

  async getChannelList(guildId: string): Promise<Universal.Channel[]> {
    const { channels } = await this.request<{
      channels: SlackChannel[]
    }>('POST', '/conversations.list', {
      team_id: guildId,
    })
    return channels.map(adaptChannel)
  }

  async getGuild(guildId: string): Promise<Universal.Guild> {
    const { team } = await this.request<{ team: SlackTeam }>('POST', '/team.info', {
      team_id: guildId,
    })
    return adaptGuild(team)
  }

  async getGuildMember(guildId: string, userId: string): Promise<Universal.GuildMember> {
    const { user } = await this.request<{ user: SlackUser }>('POST', '/users.info', {
      user: userId,
    })
    return {
      ...adaptUser(user),
      nickname: user.profile.display_name,
    }
  }

  async sendPrivateMessage(channelId: string, content: Fragment, options?: SendOptions): Promise<string[]> {
    // "channels:write,groups:write,mpim:write,im:write",
    const { channel } = await this.request<{
      channel: {
        id: string
      }
    }>('POST', '/conversations.open', {
      users: channelId,
    })
    return this.sendMessage(channel.id, content, undefined, options)
  }
}

export namespace SlackBot {
  export interface BaseConfig extends Bot.Config, Quester.Config {
    token: string
    botToken: string
  }
  export type Config = BaseConfig & (HttpServer.Config | WsClient.Config)

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: Schema.union(['http', 'ws']).description('选择要使用的协议。').required(),
      token: Schema.string().description('App-Level Tokens').role('secret').required(),
      botToken: Schema.string().description('OAuth Tokens(Bot Tokens)').role('secret').required(),
    }),
    Schema.union([
      WsClient.Config,
      HttpServer.Config,
    ]),
    Quester.createConfig('https://slack.com/api/'),
  ] as const)
}

SlackBot.prototype.platform = 'slack'
