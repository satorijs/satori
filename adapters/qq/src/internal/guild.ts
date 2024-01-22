import * as QQ from '../types'
import { GuildInternal } from './internal'

declare module './internal' {
  interface GuildInternal {
    sendMessage(channelId: string, data: QQ.Message.ChannelRequest): Promise<QQ.Message>

    getMe(): Promise<QQ.User>

    getGuilds(params?: Partial<{
      before: string
      after: string
      limit: number
    }>): Promise<QQ.Guild[]>

    getGuild(guild_id: string): Promise<QQ.Guild>
    getChannels(guild_id: string): Promise<QQ.Channel[]>
    getChannel(channel_id: string): Promise<QQ.Channel>
    createGuildChannel(guild_id: string, params: QQ.CreateGuildParams): Promise<QQ.Channel>
    modifyChannel(channel_id: string, params: QQ.ModifyGuildParams): Promise<QQ.Channel>
    deleteChannel(channel_id: string): Promise<void>
    getChannelOnlineNums(channel_id: string): Promise<{
      online_nums: number
    }>
    getGuildMembers(guild_id: string, params?: Partial<{
      after: string
      limit: number
    }>): Promise<QQ.Member[]>

    getGuildRoleMembers(guild_id: string, role_id: string, params?: Partial<{
      start_index: string
      limit: number
    }>): Promise<{
      data: QQ.Member[]
      next: string
    }>
    getGuildMember(guild_id: string, user_id: string): Promise<QQ.Member>
    removeGuildMember(guild_id: string, user_id: string): Promise<void>
    getGuildRoles(guild_id: string): Promise<QQ.Role[]>
    createGuildRole(guild_id: string, params: QQ.CreateGuildRoleParams): Promise<{
      role_id: string
      role: QQ.Role
    }>
    modifyGuildRole(guild_id: string, role_id: string, params: QQ.CreateGuildRoleParams): Promise<{
      guild_id: string
      role_id: string
      role: QQ.Role
    }>
    removeGuildRole(guild_id: string, role_id: string): Promise<void>
    addGuildMemberRole(guild_id: string, user_id: string, role_id: string, params: {
      channel: { id: string }
    }): Promise<void>
    removeGuildMemberRole(guild_id: string, user_id: string, role_id: string, params?: {
      channel: { id: string }
    }): Promise<void>
    getChannelMemberPermissions(channel_id: string, user_id: string): Promise<QQ.ChannelPermissions>
    modifyChannelMemberPermissions(channel_id: string, user_id: string, params: {
      add: string
      remove: string
    }): Promise<QQ.ChannelPermissions>
    getChannelRole(channel_id: string, role_id: string): Promise<QQ.ChannelPermissions>
    modifyChannelRole(channel_id: string, role_id: string, params: {
      add: string
      remove: string
    }): Promise<void>
    getMessage(channelId: string, messageId: string): Promise<QQ.Message>
    sendMessage(channelId: string, data: QQ.Message.ChannelRequest): Promise<QQ.Message>
    sendDM(guildId: string, data: QQ.Message.ChannelRequest): Promise<QQ.Message>
    deleteMessage(channelId: string, messageId: string, params?: {
      hidetip?: boolean
    }): Promise<void>
    getMessageSetting(guildId: string): Promise<QQ.MessageSetting>
    createDMS(data: {
      recipient_id: string
      source_guild_id: string
    }): Promise<QQ.DMS>
    deleteDM(guildId: string, messageId: string, params?: {
      hidetip?: boolean
    }): Promise<void>
    muteGuildOrMembers(guildId: string, data: {
      mute_seconds: number
      user_ids?: string[]
    }): Promise<{
      user_ids?: string[]
    }>
    muteGuildMember(guildId: string, userId: string, data: {
      mute_seconds: number
    }): Promise<void>
    createGuildAnnounce(guildId: string, params: Partial<QQ.CreateGuildAnnounceParams>): Promise<QQ.Announces>
    removeGuildAnnounce(guildId: string, messageId: string): Promise<void>
    createPinsMessage(channelId: string, messageId: string): Promise<QQ.PinsMessage>
    removePinsMessage(channelId: string, messageId: string): Promise<void>
    getPinsMessage(channelId: string): Promise<QQ.PinsMessage[]>
    getSchedules(channelId: string, params?: {
      since: number
    }): Promise<QQ.Schedule[]>
    getSchedule(channelId: string, scheduleId: string): Promise<QQ.Schedule>
    createSchedule(channelId: string, schedule: QQ.Schedule): Promise<QQ.Schedule>
    modifySchedule(channelId: string, scheduleId: string, schedule: QQ.Schedule): Promise<QQ.Schedule>
    removeSchedule(channelId: string, scheduleId: string): Promise<void>
    createReaction(channelId: string, messageId: string, type: string, id: string): Promise<void>
    deleteReaction(channelId: string, messageId: string, type: string, id: string): Promise<void>
    getReactions(channelId: string, messageId: string, type: string, id: string, params?: Partial<{
      cookie: string
      limit: number
    }>): Promise<{
      cookie: string
      is_end: boolean
      users: Pick<QQ.User, 'id' | 'username' | 'avatar'>[]
    }>
    listThreads(channelId: string): Promise<{
      threads: QQ.Forum.Thread[]
      is_finish: number
    }>
    getThread(channelId: string, threadId: string): Promise<{
      thread: QQ.Forum.Thread
    }>
    createPost(channelId: string, data: QQ.Forum.CreatePostRequest): Promise<{
      task_id: string
      create_time: string
    }>
    removePost(channelId: string, threadId: string): Promise<void>
    getGuildApiPermissions(guildId: string): Promise<{
      apis: QQ.APIPermission[]
    }>
    createGuildApiPermissionDemand(guildId: string, data: QQ.APIPermissionDemand): Promise<QQ.APIPermissionDemand>
  }
}

GuildInternal.define(true, {
  '/users/@me': {
    GET: 'getMe',
  },
  '/users/@me/guilds': {
    GET: 'getGuilds',
  },
  '/guilds/{guild.id}': {
    GET: 'getGuild',
  },
  '/guilds/{guild.id}/channels': {
    GET: 'getChannels',
    POST: 'createGuildChannel',
  },
  '/channels/{channel.id}': {
    GET: 'getChannel',
    PATCH: 'modifyChannel',
    DELETE: 'deleteChannel',
  },
  '/channels/{channel.id}/online_nums': {
    GET: 'getChannelOnlineNums',
  },
  '/guilds/{guild.id}/members': {
    GET: 'getGuildMembers',
  },
  '/guilds/{guild.id}/roles/{role.id}/members': {
    GET: 'getGuildRoleMembers',
  },
  '/guilds/{guild.id}/members/{user.id}': {
    GET: 'getGuildMember',
    DELETE: 'removeGuildMember',
  },
  '/guilds/{guild.id}/roles': {
    GET: 'getGuildRoles',
    POST: 'createGuildRole',
  },
  '/guilds/{guild.id}/roles/{role.id}': {
    PATCH: 'modifyGuildRole',
    DELETE: 'removeGuildRole',
  },
  '/guilds/{guild.id}/members/{user.id}/roles/{role.id}': {
    PUT: 'addGuildMemberRole',
    DELETE: 'removeGuildMemberRole',
  },
  '/channels/{channel.id}/members/{user.id}/permissions': {
    GET: 'getChannelMemberPermissions',
    PUT: 'modifyChannelMemberPermissions',
  },
  '/channels/{channel.id}/roles/{role.id}/permissions': {
    GET: 'getChannelRole',
    PUT: 'modifyChannelRole',
  },
  '/channels/{channel.id}/messages/{message.id}': {
    GET: 'getMessage',
    DELETE: 'deleteMessage',
  },
  '/channels/{channel.id}/messages': {
    POST: 'sendMessage',
  },
  '/dms/{guild.id}/messages': {
    POST: 'sendDM',
  },
  '/guilds/{guild.id}/messages/setting': {
    GET: 'getMessageSetting',
  },
  '/users/@me/dms': {
    POST: 'createDMS',
  },
  '/dms/{guild.id}/messages/{message.id}': {
    DELETE: 'deleteDM',
  },
  '/guilds/{guild.id}/mute': {
    PATCH: 'muteGuildOrMembers',
  },
  '/guilds/{guild.id}/members/{user.id}/mute': {
    PATCH: 'muteGuildMember',
  },
  '/guilds/{guild.id}/announces': {
    POST: 'createGuildAnnounce',
  },
  '/guilds/{guild.id}/announces/{message.id}': {
    DELETE: 'removeGuildAnnounce',
  },
  '/channels/{channel.id}/pins/{message.id}': {
    PUT: 'createPinsMessage',
    DELETE: 'removePinsMessage',
  },
  '/channels/{channel.id}/pins': {
    GET: 'getPinsMessage',
  },
  '/channels/{channel.id}/schedules': {
    GET: 'getSchedules',
    POST: 'createSchedule',
  },
  '/channels/{channel.id}/schedules/{schedule.id}': {
    GET: 'getSchedule',
    PATCH: 'modifySchedule',
    DELETE: 'removeSchedule',
  },
  '/channels/{channel.id}/messages/{message.id}/reactions/{type}/{id}': {
    PUT: 'createReaction',
    DELETE: 'deleteReaction',
    GET: 'getReactions',
  },
  '/channels/{channel.id}/threads': {
    GET: 'listThreads',
    PUT: 'createPost',
  },
  '/channels/{channel.id}/threads/{thread.id}': {
    DELETE: 'removePost',
  },
  '/guilds/{guild.id}/api_permissions': {
    GET: 'getGuildApiPermissions',
  },
  '/guilds/{guild.id}/api_permissions/demand': {
    POST: 'createGuildApiPermissionDemand',
  },
})
