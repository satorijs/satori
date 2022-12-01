import { Dict } from '@satorijs/satori'
import { Feishu } from '.'
import { BaseResponse, Internal } from './internal'
import { Paginated, Pagination } from './utils'

declare module '.' {
  export namespace Feishu {
    export interface Guild {
      avatar: string
      name: string
      description: string
      i18n_names: Dict<string>
      add_member_permission: string
      share_card_permission: string
      at_all_permission: string
      edit_permission: string
      owner_id_type: string
      owner_id: string
      chat_mode: string
      chat_type: string
      chat_tag: string
      join_message_visibility: string
      leave_message_visibility: string
      membership_approval: string
      moderation_permission: string
      external: boolean
      tenant_key: string
      user_count: string
      bot_count: string
    }
  }
}

declare module './internal' {
  export interface Internal {
    getCurrentUserGuilds(params: Pagination<{ user_id_type: Feishu.UserIdType }>): Promise<{ data: Paginated<Feishu.Guild> }>
    GetGuildInfo(chat_id: string, params: { user_id_type: string }): Promise<BaseResponse & { data: Feishu.Guild }>
  }
}

Internal.define({
  '/im/v1/chats': {
    GET: 'getCurrentUserGuilds',
  },
  '/im/v1/chats/{chat_id}': {
    GET: 'GetGuildInfo',
  },
})
