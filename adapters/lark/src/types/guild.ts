import { Dict } from '@satorijs/satori'

import { Lark } from '.'
import { Internal } from './internal'
import { Paginated, Pagination } from './utils'

declare module '.' {
  export namespace Lark {
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

export interface GuildMember {
  member_id_type: Lark.UserIdType
  member_id: string
  name: string
  tenant_key: string
}

declare module './internal' {
  export interface Internal {
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/list */
    getCurrentUserGuilds(params: Pagination<{ user_id_type: Lark.UserIdType }>): Promise<{ data: Paginated<Lark.Guild> }>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get */
    getGuildInfo(chat_id: string, params: { user_id_type: string }): Promise<BaseResponse & { data: Lark.Guild }>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/get */
    getGuildMembers(chat_id: string, params: Pagination<{ member_id_type: Lark.UserIdType }>): Promise<{ data: Paginated<GuildMember> }>
  }
}

Internal.define({
  '/im/v1/chats': {
    GET: 'getCurrentUserGuilds',
  },
  '/im/v1/chats/{chat_id}': {
    GET: 'getGuildInfo',
  },
  '/im/v1/chats/{chat_id}/members': {
    GET: 'getGuildMembers',
  },
})
