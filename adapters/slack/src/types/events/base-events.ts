// https://github.com/slackapi/bolt-js/blob/main/src/types/events/base-events.ts

import { MessageEvent as AllMessageEvents } from './message-events'
import { SlackUser } from '.'

/**
 * All known event types in Slack's Events API
 * Please refer to https://api.slack.com/events for more details
 *
 * This is a discriminated union. The discriminant is the `type` property.
 */
export type SlackEvent =
  | ChannelArchiveEvent
  | ChannelCreatedEvent
  | ChannelDeletedEvent
  | ChannelIDChangedEvent
  | ChannelLeftEvent
  | ChannelRenameEvent
  | EmojiChangedEvent
  | FileChangeEvent
  | InviteRequestedEvent
  | MemberJoinedChannelEvent
  | MemberLeftChannelEvent
  | MessageEvent
  | ReactionAddedEvent
  | ReactionRemovedEvent
  | UserChangeEvent
  | UserProfileChangedEvent
  | UserStatusChangedEvent
  | HelloEvent

export type EventTypePattern = string | RegExp

export interface HelloEvent {
  type: 'hello'
}

export interface BasicSlackEvent<Type extends string = string> {
  type: Type
}

export interface ChannelArchiveEvent {
  type: 'channel_archive'
  channel: string
  user: string
  is_moved?: number
  event_ts: string
}

export interface ChannelCreatedEvent {
  type: 'channel_created'
  channel: {
    id: string
    is_channel: boolean
    name: string
    name_normalized: string
    created: number
    creator: string // user ID
    is_shared: boolean
    is_org_shared: boolean
  }
}

export interface ChannelDeletedEvent {
  type: 'channel_deleted'
  channel: string
}

export interface ChannelIDChangedEvent {
  type: 'channel_id_changed'
  old_channel_id: string
  new_channel_id: string
  event_ts: string
}

export interface ChannelLeftEvent {
  type: 'channel_left'
  channel: string
  actor_id: string
  event_ts: string
}

export interface ChannelRenameEvent {
  type: 'channel_rename'
  channel: {
    id: string
    name: string
    name_normalized: string
    created: number
    is_channel: boolean
    is_mpim: boolean
  }
  event_ts: string
}

// NOTE: this should probably be broken into its two subtypes
export interface EmojiChangedEvent {
  type: 'emoji_changed'
  subtype: 'add' | 'remove' | 'rename'
  names?: string[] // only for remove
  name?: string // only for add
  value?: string // only for add
  old_name?: string
  new_name?: string
  event_ts: string
}

export interface FileChangeEvent {
  type: 'file_change'
  file_id: string
  file: {
    id: string
  }
}

export interface InviteRequestedEvent {
  type: 'invite_requested'
  invite_request: {
    id: string
    email: string
    date_created: number
    requester_ids: string[]
    channel_ids: string[]
    invite_type: 'restricted' | 'ultra_restricted' | 'full_member'
    real_name: string
    date_expire: number
    request_reason: string
    team: {
      id: string
      name: string
      domain: string
    }
  }
}

export interface MemberJoinedChannelEvent {
  type: 'member_joined_channel'
  user: string
  channel: string
  channel_type: string
  team: string
  inviter?: string
  event_ts: string
}

export interface MemberLeftChannelEvent {
  type: 'member_left_channel'
  user: string
  channel: string
  channel_type: string
  team: string
  event_ts: string
}

export type MessageEvent = AllMessageEvents

export interface ReactionMessageItem {
  type: 'message'
  channel: string
  ts: string
}

export interface ReactionAddedEvent {
  type: 'reaction_added'
  user: string
  reaction: string
  item_user: string
  item: ReactionMessageItem
  event_ts: string
}

export interface ReactionRemovedEvent {
  type: 'reaction_removed'
  user: string
  reaction: string
  item_user: string
  item: ReactionMessageItem
  event_ts: string
}

export interface StatusEmojiDisplayInfo {
  emoji_name?: string
  display_alias?: string
  display_url?: string
}

export interface UserChangeEvent {
  type: 'user_change'
  user: SlackUser
  cache_ts: number
  event_ts: string
}

export interface UserProfileChangedEvent {
  type: 'user_profile_changed'
  user: {
    id: string
    team_id: string
    name: string
    deleted: boolean
    color: string
    real_name: string
    tz: string
    tz_label: string
    tz_offset: number
    profile: {
      title: string
      phone: string
      skype: string
      real_name: string
      real_name_normalized: string
      display_name: string
      display_name_normalized: string
      status_text: string
      status_text_canonical: string
      status_emoji: string
      status_emoji_display_info: StatusEmojiDisplayInfo[]
      status_expiration: number
      avatar_hash: string
      huddle_state: string
      huddle_state_expiration_ts: number
      first_name: string
      last_name: string
      email?: string
      image_original?: string
      is_custom_image?: boolean
      image_24: string
      image_32: string
      image_48: string
      image_72: string
      image_192: string
      image_512: string
      image_1024?: string
      team: string
      fields:
      | {
        [key: string]: {
          value: string
          alt: string
        }
      }
      | []
      | null
    }
    is_admin: boolean
    is_owner: boolean
    is_primary_owner: boolean
    is_restricted: boolean
    is_ultra_restricted: boolean
    is_bot: boolean
    is_stranger?: boolean
    updated: number
    is_email_confirmed: boolean
    is_app_user: boolean
    is_invited_user?: boolean
    has_2fa?: boolean
    locale: string
    presence?: string
    enterprise_user?: {
      id: string
      enterprise_id: string
      enterprise_name: string
      is_admin: boolean
      is_owner: boolean
      teams: string[]
    }
    two_factor_type?: string
    has_files?: boolean
    is_workflow_bot?: boolean
    who_can_share_contact_card: string
  }
  cache_ts: number
  event_ts: string
}

export interface UserStatusChangedEvent {
  type: 'user_status_changed'
  user: SlackUser
  cache_ts: number
  event_ts: string
}
