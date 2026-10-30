import * as QQ from '../types'
import { GroupInternal } from '.'

declare module './internal' {
  interface GroupInternal {
    getGuildInfo(group_openid: string): Promise<QQ.GroupInfo>
    getGuildBotState(group_openid: string): Promise<QQ.GroupBotState>
    getGuildMember(group_openid: string, user_openid: string): Promise<QQ.GroupMember>
    getGuildJoinRequestList(group_openid: string): Promise<{
      list: QQ.GroupJoinRequest[]
      next_cursor: string
    }>
    approveGuildJoinRequest(group_openid: string, user_openid: string, data: QQ.ApprovalJoinRequestRequest): Promise<void>
    getRestrictChatSetting(group_openid: string): Promise<QQ.RestrictChatSetting>
    updateRestrictChatSetting(group_openid: string, data: QQ.UpdateRestrictChatSettingRequest): Promise<QQ.RestrictChatSetting>
    sendMessage(channel_id: string, data: QQ.Message.Request): Promise<{
      id: string
      timestamp: string
      audit_id?: string
      audit_tips?: string
    }>
    deleteMessage(openid: string, message_id: string): Promise<any>
    sendPrivateMessage(openid: string, data: QQ.Message.Request): Promise<{
      id: string
      timestamp: string
      audit_id?: string
      audit_tips?: string
    }>
    sendPrivateStreamMessage(openid: string, data: QQ.Message.Stream.Request): Promise<{
      id: string
      timestamp: string
    }>
    deletePrivateMessage(userid: string, message_id: string): Promise<any>
    sendFilePrivate(openid: string, data: QQ.Message.File.Request): Promise<QQ.Message.File.Response>
    sendFileGuild(group_openid: string, data: QQ.Message.File.Request): Promise<QQ.Message.File.Response>
    uploadPreparePrivate(openid: string, data: QQ.Message.File.UploadPrepareRequest): Promise<QQ.Message.File.UploadPrepareResponse>
    uploadPrepareGuild(group_openid: string, data: QQ.Message.File.UploadPrepareRequest): Promise<QQ.Message.File.UploadPrepareResponse>
    uploadPartFinishPrivate(openid: string, data: QQ.Message.File.UploadPartFinishRequest): Promise<void>
    uploadPartFinishGuild(group_openid: string, data: QQ.Message.File.UploadPartFinishRequest): Promise<void>
    acknowledgeInteraction(interaction_id: string, data: {
      code: number
    }): Promise<any>
    getGateway(): Promise<QQ.GetGatewayResponse>
    getGatewayBot(): Promise<QQ.GetGatewayBotResponse>
  }
}

GroupInternal.define(false, {
  '/v2/groups/{channel.id}/info': {
    GET: 'getGuildInfo',
  },
  '/v2/groups/{channel.id}/bot_state': {
    GET: 'getGuildBotState',
  },
  '/v2/groups/{channel.id}/members/{user.id}': {
    GET: 'getGuildMember',
  },
  '/v2/groups/{channel.id}/join_request_list': {
    GET: 'getGuildJoinRequestList',
  },
  '/v2/groups/{channel.id}/approval_join_request/{user.id}': {
    POST: 'approveGuildJoinRequest',
  },
  '/v2/groups/{channel.id}/restrict_chat_setting': {
    GET: 'getRestrictChatSetting',
    POST: 'updateRestrictChatSetting',
  },
  '/v2/groups/{channel.id}/messages': {
    POST: 'sendMessage',
  },
  '/v2/groups/{channel.id}/messages/{message.id}': {
    DELETE: 'deleteMessage',
  },
  '/v2/users/{user.id}/messages': {
    POST: 'sendPrivateMessage',
  },
  '/v2/users/{user.id}/stream_messages': {
    POST: 'sendPrivateStreamMessage',
  },
  '/v2/users/{user.id}/messages/{message.id}': {
    DELETE: 'deletePrivateMessage',
  },
  '/v2/users/{user.id}/files': {
    POST: 'sendFilePrivate',
  },
  '/v2/groups/{channel.id}/files': {
    POST: 'sendFileGuild',
  },
  '/v2/users/{user.id}/upload_prepare': {
    POST: 'uploadPreparePrivate',
  },
  '/v2/groups/{channel.id}/upload_prepare': {
    POST: 'uploadPrepareGuild',
  },
  '/v2/users/{user.id}/upload_part_finish': {
    POST: 'uploadPartFinishPrivate',
  },
  '/v2/groups/{channel.id}/upload_part_finish': {
    POST: 'uploadPartFinishGuild',
  },
  '/gateway': {
    GET: 'getGateway',
  },
  '/gateway/bot': {
    GET: 'getGatewayBot',
  },
})

// fxxk tencent
GroupInternal.define(false, {
  '/interactions/{interaction.id}': {
    PUT: 'acknowledgeInteraction',
  },
}, { responseType: 'text' })
