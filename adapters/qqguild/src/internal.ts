import { Quester } from '@satorijs/satori'
import * as QQGuild from './types'

export class Internal {
  constructor(private http: Quester) { }

  async getMe() {
    return this.http.get<QQGuild.User>('/users/@me')
  }

  /** https://bot.q.qq.com/wiki/develop/api/openapi/dms/post_dms.html */
  async createDMS(recipient_id: string, source_guild_id: string) {
    return this.http.post<QQGuild.DMS>('/users/@me/dms', {
      recipient_id, source_guild_id,
    })
  }

  async getMessage(channelId: string, messageId: string) {
    const { message } = await this.http.get<{
      message: QQGuild.Message
    }>(`/channels/${channelId}/messages/${messageId}`)
    return message
  }

  async getGuilds(params?: Partial<{
    before: string
    after: string
    limit: number
  }>) {
    return this.http.get<QQGuild.Guild[]>('/users/@me/guilds', {
      params,
    })
  }

  async getGuild(guild_id: string) {
    return this.http.get<QQGuild.Guild>(`/guilds/${guild_id}`)
  }

  async getChannels(guild_id: string) {
    return this.http.get<QQGuild.Channel[]>(`/guilds/${guild_id}/channels`)
  }

  async getChannel(channel_id: string) {
    return this.http.get<QQGuild.Channel>(`/channels/${channel_id}`)
  }

  async getGuildMembers(guild_id: string) {
    return this.http.get<QQGuild.Member[]>(`/guilds/${guild_id}/members`)
  }

  async getGuildMember(guild_id: string, user_id: string) {
    return this.http.get<QQGuild.Member>(`/guilds/${guild_id}/members/${user_id}`)
  }

  async deleteGuildMember(guild_id: string, user_id: string) {
    return this.http.delete(`/guilds/${guild_id}/members/${user_id}`)
  }

  async getGuildRoles(guild_id: string) {
    return this.http.get<QQGuild.Role[]>(`/guilds/${guild_id}/roles`)
  }

  async muteGuildMember(guild_id: string, user_id: string, duration: number) {
    return this.http.patch(`/guilds/${guild_id}/members/${user_id}/mute`, {
      mute_seconds: duration / 1000,
    })
  }

  async getReactions(channel_id: string, message_id: string, type: string, id: string, params?: Partial<{
    cookie: string
    limit: number
  }>) {
    return this.http.get<{
      cookie: string
      is_end: boolean
      users: Pick<QQGuild.User, 'id' | 'username' | 'avatar'>[]
    }>(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`, {
      params,
    })
  }

  async createReaction(channel_id: string, message_id: string, type: string, id: string) {
    return this.http.put(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`)
  }

  async deleteReaction(channel_id: string, message_id: string, type: string, id: string) {
    return this.http.delete(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`)
  }
}
