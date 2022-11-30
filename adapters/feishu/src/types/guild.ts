import { Dict } from '@satorijs/satori'
import { BaseResponse, Internal } from './internal'

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

export interface GetCurrentUserGuildsParams {
  user_id_type: string
  page_token?: string
  page_size?: number
}

export interface GetCurrentUserGuildsResponse extends BaseResponse {
  data: {
    items: Feishu.Guild[]
    page_token: string
    has_more: boolean
  }
}

declare module './internal' {
  export interface Internal {
    getCurrentUserGuilds(params: GetCurrentUserGuildsParams): Promise<GetCurrentUserGuildsResponse>
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
