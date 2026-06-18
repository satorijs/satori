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
    sendPrivateStreamMessage(openid: string, data: QQ.Message.Stream.Request): Promise<{
      id: string
      timestamp: string
    }>
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
    deleteMessage(openid: string, message_id: string): Promise<any>
    deletePrivateMessage(userid: string, message_id: string): Promise<any>
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
