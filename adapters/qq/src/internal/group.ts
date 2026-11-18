import * as QQ from '../types'
import { GroupInternal } from '.'

declare module './internal' {
  interface GroupInternal {
    sendMessage(channel_id: string, data: QQ.Message.Request): Promise<{
      id: string
      timestamp: string
      audit_id?: string
      audit_tips?: string
    }>
    sendPrivateMessage(openid: string, data: QQ.Message.Request): Promise<{
      id: string
      timestamp: string
      audit_id?: string
      audit_tips?: string
    }>
    sendFilePrivate(openid: string, data: QQ.Message.File.Request): Promise<any>
    sendFileGuild(group_openid: string, data: QQ.Message.File.Request): Promise<any>
    acknowledgeInteraction(interaction_id: string, data: {
      code: number
    }): Promise<any>
    getGateway(): Promise<QQ.GetGatewayResponse>
    getGatewayBot(): Promise<QQ.GetGatewayBotResponse>
    deleteMessage(openid: string, message_id: string): Promise<any>
    deletePrivateMessage(userid: string, message_id: string): Promise<any>
    getGroupInfo(group_openid: string): Promise<QQ.GroupInfo>
    getGroupMembers(group_openid: string, params?: { cursor?: string }): Promise<QQ.GroupMemberList>
    getGroupMember(group_openid: string, member_openid: string): Promise<QQ.GroupMember>
    batchRemoveGroupMembers(group_openid: string, data: QQ.BatchRemoveGroupMembersRequest): Promise<QQ.BatchRemoveGroupMembersResponse>
    getRestrictChatSetting(group_openid: string): Promise<QQ.RestrictChatSetting>
    setRestrictChatSetting(group_openid: string, data: QQ.SetRestrictChatSettingRequest): Promise<any>
  }
}

GroupInternal.define(false, {
  '/v2/groups/{channel.id}/messages': {
    POST: 'sendMessage',
  },
  '/v2/groups/{channel.id}/messages/{message.id}': {
    DELETE: 'deleteMessage',
  },
  '/v2/users/{user.id}/messages': {
    POST: 'sendPrivateMessage',
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
  '/gateway': {
    GET: 'getGateway',
  },
  '/gateway/bot': {
    GET: 'getGatewayBot',
  },
  '/v2/groups/{channel.id}/info': {
    GET: 'getGroupInfo',
  },
  '/v2/groups/{channel.id}/members': {
    GET: 'getGroupMembers',
  },
  '/v2/groups/{channel.id}/members/{user.id}': {
    GET: 'getGroupMember',
  },
  '/v2/groups/{channel.id}/batch_remove_members': {
    POST: 'batchRemoveGroupMembers',
  },
  '/v2/groups/{channel.id}/restrict_chat_setting': {
    GET: 'getRestrictChatSetting',
    POST: 'setRestrictChatSetting',
  },
})

// fxxk tencent
GroupInternal.define(false, {
  '/interactions/{interaction.id}': {
    PUT: 'acknowledgeInteraction',
  },
}, { responseType: 'text' })
