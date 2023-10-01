import { Quester } from '@satorijs/satori'
import * as QQ from '../types'

export class GuildInternal {
  constructor(private http: () => Quester) { }

  async getMe() {
    return this.http().get<QQ.User>('/users/@me')
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

  async createGuildChannel(guild_id: string, params: QQ.CreateGuildParams) {
    return this.http().post<QQ.Channel>(`/guilds/${guild_id}/channels`, params)
  }

  async modifyChannel(channel_id: string, params: QQ.ModifyGuildParams) {
    return this.http().patch<QQ.Channel>(`/channels/${channel_id}/channels`, params)
  }

  async deleteChannel(channel_id: string) {
    return this.http().delete(`/channels/${channel_id}`)
  }

  async getChannelOnlineNums(channel_id: string) {
    return this.http().get<{
      online_nums: number
    }>(`/channels/${channel_id}/online_nums`)
  }

  async getGuildMembers(guild_id: string, params?: Partial<{
    after: string
    limit: number
  }>) {
    return this.http().get<QQ.Member[]>(`/guilds/${guild_id}/members`, { params })
  }

  async getGuildRoleMembers(guild_id: string, role_id: string, nextInput = '0') {
    return await this.http().get<{
      data: QQ.Member[]
      next: string
    }>(`/guilds/${guild_id}/roles/${role_id}/members`, {
      params: {
        start_index: nextInput,
        limit: 0,
      },
    })
  }

  async getGuildMember(guild_id: string, user_id: string) {
    return this.http().get<QQ.Member>(`/guilds/${guild_id}/members/${user_id}`)
  }

  async removeGuildMember(guild_id: string, user_id: string) {
    return this.http().delete(`/guilds/${guild_id}/members/${user_id}`)
  }

  async getGuildRoles(guild_id: string) {
    return this.http().get<QQ.Role[]>(`/guilds/${guild_id}/roles`)
  }

  async createGuildRole(guild_id: string, params: QQ.CreateGuildRoleParams) {
    return this.http().post<{
      role_id: string
      role: QQ.Role
    }>(`/guilds/${guild_id}/roles`, params)
  }

  async modifyGuildRole(guild_id: string, role_id: string, params: QQ.CreateGuildRoleParams) {
    return this.http().patch<{
      guild_id: string
      role_id: string
      role: QQ.Role
    }>(`/guilds/${guild_id}/roles/${role_id}`, params)
  }

  async removeGuildRole(guild_id: string, role_id: string) {
    return this.http().delete(`/guilds/${guild_id}/roles/${role_id}`)
  }

  async addGuildMemberRole(guild_id: string, user_id: string, role_id: string, channel_id?: string) {
    return this.http().put(`/guilds/${guild_id}/members/${user_id}/roles/${role_id}`, channel_id ? {
      channel: { id: channel_id },
    } : {})
  }

  async removeGuildMemberRole(guild_id: string, user_id: string, role_id: string, channel_id?: string) {
    return this.http().axios({
      url: `/guilds/${guild_id}/members/${user_id}/roles/${role_id}`,
      method: 'delete',
      data: channel_id ? {
        channel: { id: channel_id },
      } : {},
    })
  }

  async getChannelMemberPermissions(channel_id: string, user_id: string) {
    return this.http().get<QQ.ChannelPermissions>(`/channels/${channel_id}/members/${user_id}/permissions`)
  }

  async modifyChannelMemberPermissions(channel_id: string, user_id: string, params: {
    add: string
    remove: string
  }) {
    return this.http().put<QQ.ChannelPermissions>(`/channels/${channel_id}/members/${user_id}/permissions`, params)
  }

  async getChannelRole(channel_id: string, role_id: string) {
    return this.http().get<QQ.ChannelPermissions>(`/channels/${channel_id}/roles/${role_id}/permissions`)
  }

  async modifyChannelRole(channel_id: string, role_id: string, params: {
    add: string
    remove: string
  }) {
    return this.http().put(`/channels/${channel_id}/roles/${role_id}/permissions`, params)
  }

  async getMessage(channelId: string, messageId: string) {
    const { message } = await this.http().get<{
      message: QQ.Message
    }>(`/channels/${channelId}/messages/${messageId}`)
    return message
  }

  async deleteMessage(channel_id: string, message_id: string, hidetip = false) {
    return this.http().delete(`/channels/${channel_id}/messages/${message_id}?hidetip=${hidetip.toString()}`)
  }

  async getMessageSetting(guild_id: string) {
    return this.http().get<QQ.MessageSetting>(`/guilds/${guild_id}/messages/setting`)
  }

  async createDMS(recipient_id: string, source_guild_id: string) {
    return this.http().post<QQ.DMS>('/users/@me/dms', {
      recipient_id, source_guild_id,
    })
  }

  async deleteDM(guild_id: string, message_id: string, hidetip = false) {
    // guild_id 是 createDMS 之后的 id
    return this.http().delete(`/dms/${guild_id}/messages/${message_id}?hidetip=${hidetip.toString()}`)
  }

  async muteGuild(guild_id: string, duration: number) {
    return this.http().patch(`/guilds/${guild_id}/mute`, {
      mute_seconds: duration / 1000,
    })
  }

  async muteGuildMember(guild_id: string, user_id: string, duration: number) {
    return this.http().patch(`/guilds/${guild_id}/members/${user_id}/mute`, {
      mute_seconds: duration / 1000,
    })
  }

  async muteGuildMembers(guild_id: string, user_ids: string[], duration: number) {
    return this.http().patch<{
      user_ids: string[]
    }>(`/guilds/${guild_id}/mute`, {
      mute_seconds: duration / 1000,
      user_ids,
    })
  }

  async createGuildAnnounce(guild_id: string, params: Partial<QQ.CreateGuildAnnounceParams>) {
    return this.http().post<QQ.Announces>(`/guilds/${guild_id}/announces`, params)
  }

  async removeGuildAnnounce(guild_id: string, message_id: string) {
    return this.http().delete(`/guilds/${guild_id}/announces/${message_id}`)
  }

  async createPinsMessage(channel_id: string, message_id: string) {
    return this.http().put<QQ.PinsMessage>(`/channels/${channel_id}/pins/${message_id}`)
  }

  async removePinsMessage(channel_id: string, message_id: string) {
    return this.http().delete(`/channels/${channel_id}/pins/${message_id}`)
  }

  async getPinsMessage(channel_id: string) {
    return this.http().get<QQ.PinsMessage[]>(`/channels/${channel_id}/pins`)
  }

  // @TODO test: since
  async getSchedules(channel_id: string, since?: number) {
    return this.http().get<QQ.Schedule[]>(`/channels/${channel_id}/schedules?since=${since ?? ''}`)
  }

  async getSchedule(channel_id: string, schedule_id: string) {
    return this.http().get<QQ.Schedule>(`/channels/${channel_id}/schedules/${schedule_id}`)
  }

  async createSchedule(channel_id: string, schedule: QQ.Schedule) {
    return this.http().post<QQ.Schedule>(`/channels/${channel_id}/schedules`, schedule)
  }

  async modifySchedule(channel_id: string, schedule_id: string, schedule: QQ.Schedule) {
    return this.http().patch<QQ.Schedule>(`/channels/${channel_id}/schedules/${schedule_id}`, schedule)
  }

  async removeSchedule(channel_id: string, schedule_id: string) {
    return this.http().delete(`/channels/${channel_id}/schedules/${schedule_id}`)
  }

  async createReaction(channel_id: string, message_id: string, type: string, id: string) {
    return this.http().put(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`)
  }

  async deleteReaction(channel_id: string, message_id: string, type: string, id: string) {
    return this.http().delete(`/channels/${channel_id}/messages/${message_id}/reactions/${type}/${id}`)
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

  async listThreads(channel_id: string) {
    return this.http().get<{
      threads: QQ.Forum.Thread[]
      is_finish: number
    }>(`/channels/${channel_id}/threads`)
  }

  async getThread(channel_id: string, thread_id: string) {
    return this.http().get<{
      thread: QQ.Forum.Thread
    }>(`/channels/${channel_id}/threads/${thread_id}`)
  }

  async createPost(channel_id: string, data: QQ.CreatePostRequest) {
    return this.http().put<{
      task_id: string
      create_time: string
    }>(`/channels/${channel_id}/threads`, data)
  }

  async removePost(channel_id: string, thread_id: string) {
    return this.http().delete(`/channels/${channel_id}/threads/${thread_id}`)
  }

  async getGuildApiPermissions(guild_id: string) {
    return this.http().get<{
      apis: QQ.APIPermission[]
    }>(`/guilds/${guild_id}/api_permissions`)
  }

  async createGuildApiPermissionDemand(guild_id: string, data: QQ.APIPermissionDemand) {
    return this.http().post<QQ.APIPermissionDemand>(`/guilds/${guild_id}/api_permissions/demand`, data)
  }
}
