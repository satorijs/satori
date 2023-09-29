import { Quester } from '@satorijs/satori'
import * as QQ from './types'

export class Internal {
  constructor(private http: () => Quester) { }

  async getMe() {
    return this.http().get<QQ.User>('/users/@me')
  }

  /** https://bot.q.qq.com/wiki/develop/api/openapi/dms/post_dms.html */
  async createDMS(recipient_id: string, source_guild_id: string) {
    return this.http().post<QQ.DMS>('/users/@me/dms', {
      recipient_id, source_guild_id,
    })
  }

  async getMessage(channelId: string, messageId: string) {
    const { message } = await this.http().get<{
      message: QQ.Message
    }>(`/channels/${channelId}/messages/${messageId}`)
    return message
  }

  async getGuilds(params?: Partial<{
    before: string
    after: string
    limit: number
  }>) {
    return this.http().get<QQ.Guild[]>('/users/@me/guilds', {
      params,
    })
  }

  async getGuild(guild_id: string) {
    return this.http().get<QQ.Guild>(`/guilds/${guild_id}`)
  }

  async getChannels(guild_id: string) {
    return this.http().get<QQ.Channel[]>(`/guilds/${guild_id}/channels`)
  }

  async getChannel(channel_id: string) {
    return this.http().get<QQ.Channel>(`/channels/${channel_id}`)
  }

  async getGuildMembers(guild_id: string, params?: Partial<{
    after: string
    limit: number
  }>) {
    return this.http().get<QQ.Member[]>(`/guilds/${guild_id}/members`, { params })
  }

  async getGuildMember(guild_id: string, user_id: string) {
    return this.http().get<QQ.Member>(`/guilds/${guild_id}/members/${user_id}`)
  }

  async deleteGuildMember(guild_id: string, user_id: string) {
    return this.http().delete(`/guilds/${guild_id}/members/${user_id}`)
  }

  async getGuildRoles(guild_id: string) {
    return this.http().get<QQ.Role[]>(`/guilds/${guild_id}/roles`)
  }

  async muteGuildMember(guild_id: string, user_id: string, duration: number) {
    return this.http().patch(`/guilds/${guild_id}/members/${user_id}/mute`, {
      mute_seconds: duration / 1000,
    })
  }

  async getReactions(channel_id: string, message_id: string, type: string, id: string, params?: Partial<{
    cookie: string
    limit: number
  }>) {
    return this.http().get<{
      cookie: string
      is_end: boolean
      users: Pick<QQ.User, 'id' | 'username' | 'avatar'>[]
    }>(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`, {
      params,
    })
  }

  async createReaction(channel_id: string, message_id: string, type: string, id: string) {
    return this.http().put(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`)
  }

  async deleteReaction(channel_id: string, message_id: string, type: string, id: string) {
    return this.http().delete(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`)
  }

  async deleteMessage(channel_id: string, message_id: string) {
    return this.http().delete(`/channels/${channel_id}/messages/${message_id}`)
  }

  async deleteDM(guild_id: string, message_id: string) {
    // guild_id 是 createDMS 之后的 id
    return this.http().delete(`/dms/${guild_id}/messages/${message_id}`)
  }
}
