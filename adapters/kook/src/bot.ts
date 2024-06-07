import { Bot, Context, Fragment, h, HTTP, Schema, Universal } from '@satorijs/core'
import { adaptChannel, adaptGroup, adaptMessage, adaptUser, decodeGuildMember, decodeRole, encodeRole } from './utils'
import * as Kook from './types'
import { WsClient } from './ws'
import { HttpServer } from './http'
import { isDirectChannel, KookMessageEncoder } from './message'

export class KookBot<C extends Context = Context, T extends KookBot.Config = KookBot.Config> extends Bot<C, T> {
  static MessageEncoder = KookMessageEncoder
  static inject = ['http']

  http: HTTP
  internal: Kook.Internal

  constructor(ctx: C, config: T) {
    super(ctx, config, 'kook')
    this.http = ctx.http.extend({
      headers: {
        'Authorization': `Bot ${config.token}`,
      },
    }).extend(config)
    ctx.satori.proxyUrls.add('https://www.kookapp.cn/')
    this.internal = new Kook.Internal(this.http)

    if (config.protocol === 'http') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this as any)
    }
  }

  async request<T = any>(method: HTTP.Method, path: string, data = {}, headers: any = {}): Promise<T> {
    if (method === 'GET') {
      return (await this.http.get(path, { params: data, headers })).data
    } else {
      return (await this.http(method, path, { data, headers })).data?.data
    }
  }

  async deleteMessage(channelId: string, msg_id: string) {
    if (isDirectChannel(channelId)) {
      await this.request('POST', '/user-chat/delete-msg', { msg_id })
    } else {
      await this.request('POST', '/message/delete', { msg_id })
    }
  }

  async editMessage(channelId: string, msg_id: string, content: Fragment) {
    content = h.normalize(content).join('')
    if (isDirectChannel(channelId)) {
      await this.request('POST', '/user-chat/update-msg', { msg_id, content })
    } else {
      await this.request('POST', '/message/update', { msg_id, content })
    }
  }

  async getMessage(channelId: string, msg_id: string) {
    if (isDirectChannel(channelId)) {
      return adaptMessage(await this.request('GET', '/user-chat/view', { msg_id }))
    } else {
      return adaptMessage(await this.request('GET', '/message/view', { msg_id }))
    }
  }

  async $createReaction(channelId: string, msg_id: string, emoji: string) {
    if (isDirectChannel(channelId)) {
      await this.request('POST', '/direct-message/add-reaction', { msg_id, emoji })
    } else {
      await this.request('POST', '/message/add-reaction', { msg_id, emoji })
    }
  }

  async $deleteReaction(channelId: string, messageId: string, emoji: string, user_id?: string) {
    if (isDirectChannel(channelId)) {
      await this.request('POST', '/direct-message/delete-reaction', { msg_id: messageId, emoji })
    } else {
      await this.request('POST', '/message/delete-reaction', { msg_id: messageId, emoji, user_id })
    }
  }

  async getLogin() {
    this.user = adaptUser(await this.request<Kook.Self>('GET', '/user/me'))
    return this.toJSON()
  }

  async getGuildList() {
    const { items } = await this.request<Kook.GuildList>('GET', '/guild/list')
    return { data: items.map(adaptGroup) }
  }

  async getChannelList(guildId: string, next?: string): Promise<Universal.List<Universal.Channel>> {
    const channels = await this.internal.getChannelList({ guild_id: guildId })
    return { data: channels.items.map(adaptChannel) }
  }

  async createChannel(guildId: string, data: Partial<Universal.Channel>) {
    const channel = await this.internal.createChannel({
      guild_id: guildId,
      name: data.name,
      type: data.type === Universal.Channel.Type.TEXT ? 1
        : data.type === Universal.Channel.Type.VOICE ? 2
          : 1,
      parent_id: data.parentId,
      is_category: data.type === Universal.Channel.Type.CATEGORY ? 1 : 0,
    })
    return adaptChannel(channel)
  }

  async getGuildMemberList(guild_id: string) {
    const { items } = await this.request<Kook.GuildUserList>('GET', '/guild/user-list', { guild_id })
    return { data: items.map(decodeGuildMember) }
  }

  async setGroupNickname(guild_id: string, user_id: string, nickname: string) {
    await this.request('POST', '/guild/nickname', { guild_id, user_id, nickname })
  }

  async leaveGroup(guild_id: string) {
    await this.request('POST', '/guild/leave', { guild_id })
  }

  async kickGroup(guild_id: string, user_id: string) {
    await this.request('POST', '/guild/kickout', { guild_id, user_id })
  }

  async createDirectChannel(userId: string) {
    const { code } = await this.request('POST', '/user-chat/create', { target_id: userId })
    return { id: code, type: Universal.Channel.Type.DIRECT }
  }

  createReaction(channelId: string, messageId: string, emoji: string) {
    if (isDirectChannel(channelId)) {
      return this.internal.addDirectMessageReaction({ msg_id: messageId, emoji })
    } else {
      return this.internal.addMessageReaction({ msg_id: messageId, emoji })
    }
  }

  deleteReaction(channelId: string, messageId: string, emoji: string, userId?: string) {
    if (isDirectChannel(channelId)) {
      return this.internal.deleteDirectMessageReaction({ msg_id: messageId, emoji, user_id: userId })
    } else {
      return this.internal.deleteMessageReaction({ msg_id: messageId, emoji, user_id: userId })
    }
  }

  async getReactionList(channelId: string, messageId: string, emoji: string) {
    let users: Kook.User[]
    if (isDirectChannel(channelId)) {
      users = await this.internal.getDirectMessageReactionList({ msg_id: messageId, emoji })
    } else {
      users = await this.internal.getMessageReactionList({ msg_id: messageId, emoji })
    }
    return { data: users.map(adaptUser) }
  }

  async setGuildMemberRole(guildId: string, userId: string, roleId: string) {
    await this.internal.grantGuildRole({ guild_id: guildId, user_id: userId, role_id: +roleId })
  }

  async unsetGuildMemberRole(guildId: string, userId: string, roleId: string) {
    await this.internal.revokeGuildRole({ guild_id: guildId, user_id: userId, role_id: +roleId })
  }

  async getGuildRoles(guildId: string) {
    const { items } = await this.internal.getGuildRoleList({ guild_id: guildId })
    return { data: items.map(decodeRole) }
  }

  async createGuildRole(guildId: string, data: Partial<Universal.GuildRole>) {
    const role = await this.internal.createGuildRole({
      guild_id: guildId,
      ...data,
    })
    return decodeRole(role)
  }

  async updateGuildRole(guildId: string, roleId: string, data: Partial<Universal.GuildRole>) {
    await this.internal.updateGuildRole({
      guild_id: guildId,
      ...encodeRole(data),
      role_id: +roleId,
    })
  }

  async deleteGuildRole(guildId: string, roleId: string) {
    await this.internal.deleteGuildRole({ guild_id: guildId, role_id: +roleId })
  }
}

export namespace KookBot {
  export interface BaseConfig extends HTTP.Config, KookMessageEncoder.Config {}

  export type Config = BaseConfig & (HttpServer.Options | WsClient.Options)

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: process.env.KOISHI_ENV === 'browser'
        ? Schema.const('ws').default('ws')
        : Schema.union(['http', 'ws']).description('选择要使用的协议。').required(),
    }),
    Schema.union([
      WsClient.Options,
      HttpServer.Options,
    ]),
    KookMessageEncoder.Config,
    HTTP.createConfig('https://www.kookapp.cn/api/v3'),
  ] as const)
}
