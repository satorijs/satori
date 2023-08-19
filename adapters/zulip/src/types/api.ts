import { Internal } from './internal'
export type IgnoredParametersUnsupported = string[]
export type EventIdSchema = number
export type EventTypeSchema = string
export type Attachments = {
  id?: number
  name?: string
  path_id?: string
  size?: number
  create_time?: number
  messages?: {
    date_sent?: number
    id?: number
  }[]
}
export type BasicStream = BasicStreamBase & {
  message_retention_days?: unknown
  first_message_id?: unknown
  stream_weekly_traffic?: number
}
export type DefaultStream = BasicStreamBase & {
  message_retention_days?: unknown
  first_message_id?: unknown
}
export type BasicStreamBase = {
  stream_id?: number
  name?: string
  description?: string
  date_created?: number
  invite_only?: boolean
  rendered_description?: string
  is_web_public?: boolean
  stream_post_policy?: number
  message_retention_days?: number
  history_public_to_subscribers?: boolean
  first_message_id?: number
  is_announcement_only?: boolean
  can_remove_subscribers_group?: number
}
export type BasicBot = BasicBotBase & {
  default_sending_stream?: unknown
  default_events_register_stream?: unknown
  owner_id?: unknown
}
export type BasicBotBase = {
  user_id?: number
  full_name?: string
  api_key?: string
  default_sending_stream?: string
  default_events_register_stream?: string
  default_all_public_streams?: boolean
  avatar_url?: string
  owner_id?: number
  services?: (
    | {
        base_url?: string
        token?: string
        interface?: number
      }
    | {
        service_name?: string
        config_data?: Config
      }
  )[]
}
export type Bot = BasicBotBase & {
  default_sending_stream?: unknown
  default_events_register_stream?: unknown
  owner_id?: unknown
  email?: string
  bot_type?: number
  is_active?: boolean
}
export type Config = {}
export type CustomProfileField = {
  id?: number
  type?: number
  order?: number
  name?: string
  hint?: string
  field_data?: string
  display_in_profile_summary?: boolean
}
export type Hotspot = {
  delay?: unknown
  name?: string
  title?: string
  description?: string
}
export type RealmEmoji = {
  id?: string
  name?: string
  source_url?: string
  still_url?: string
  deactivated?: boolean
  author_id?: number
}
export type RealmDomain = {
  domain?: string
  allow_subdomains?: boolean
}
export type RealmPlayground = {
  id?: number
  name?: string
  pygments_language?: string
  url_template?: string
}
export type RealmExport = {
  id?: number
  acting_user_id?: number
  export_time?: unknown
  deleted_timestamp?: unknown
  failed_timestamp?: unknown
  export_url?: string
  pending?: boolean
}
export type UserGroup = {
  name?: string
  description?: string
  members?: number[]
  direct_subgroup_ids?: number[]
  id?: number
  is_system_group?: boolean
  can_mention_group?: number
}
export type Subscriptions = {
  stream_id?: number
  name?: string
  description?: string
  rendered_description?: string
  date_created?: number
  invite_only?: boolean
  subscribers?: number[]
  desktop_notifications?: boolean
  email_notifications?: boolean
  wildcard_mentions_notify?: boolean
  push_notifications?: boolean
  audible_notifications?: boolean
  pin_to_top?: boolean
  email_address?: string
  is_muted?: boolean
  in_home_view?: boolean
  is_announcement_only?: boolean
  is_web_public?: boolean
  color?: string
  stream_post_policy?: number
  message_retention_days?: number
  history_public_to_subscribers?: boolean
  first_message_id?: number
  stream_weekly_traffic?: number
  can_remove_subscribers_group?: number
}
export type DefaultStreamGroup = {
  name?: string
  description?: string
  id?: number
  streams?: DefaultStream[]
}
export type EmailAddressVisibility = number
export type EmojiReaction = EmojiReactionBase & {}
export type EmojiBase = {
  emoji_name?: string
  emoji_code?: string
  reaction_type?: string
}
export type EmojiReactionBase = EmojiBase & {
  user_id?: number
  user?: {
    id?: number
    email?: string
    full_name?: string
    is_mirror_dummy?: boolean
  }
}
export type MessagesEvent = MessagesBase & {
  avatar_url?: unknown
}
export type MessagesBase = {
  avatar_url?: string
  client?: string
  content?: string
  content_type?: string
  display_recipient?:
    | string
    | {
        id?: number
        email?: string
        full_name?: string
        is_mirror_dummy?: boolean
      }[]
  edit_history?: {
    prev_content?: string
    prev_rendered_content?: string
    prev_rendered_content_version?: number
    prev_stream?: number
    prev_topic?: string
    stream?: number
    timestamp: number
    topic?: string
    user_id: number
  }[]
  id?: number
  is_me_message?: boolean
  last_edit_timestamp?: number
  reactions?: EmojiReaction[]
  recipient_id?: number
  sender_email?: string
  sender_full_name?: string
  sender_id?: number
  sender_realm_str?: string
  stream_id?: number
  subject?: string
  submessages?: {
    msg_type?: string
    content?: string
    message_id?: number
    sender_id?: number
    id?: number
  }[]
  timestamp?: number
  topic_links?: {
    text?: string
    url?: string
  }[]
  type?: string
}
export type Presence = {
  client?: string
  status?: string
  timestamp?: number
  pushable?: boolean
}
export type Draft = {
  id?: number
  type: string
  to: number[]
  topic: string
  content: string
  timestamp?: unknown
}
export type ScheduledMessage = {
  scheduled_message_id: number
  type: string
  to: number | number[]
  topic?: string
  content: string
  rendered_content: string
  scheduled_delivery_timestamp: number
  failed: boolean
}
export type User = UserBase & {
  delivery_email?: unknown
  bot_type?: unknown
  bot_owner_id?: unknown
  avatar_url?: unknown
}
export type UserBase = {
  user_id?: number
  delivery_email?: string
  email?: string
  full_name?: string
  date_joined?: string
  is_active?: boolean
  is_owner?: boolean
  is_admin?: boolean
  is_guest?: boolean
  is_billing_admin?: boolean
  is_bot?: boolean
  bot_type?: number
  bot_owner_id?: number
  role?: number
  timezone?: string
  avatar_url?: string
  avatar_version?: number
  profile_data?: profile_data
}
export type profile_data = {}
export type JsonResponseBase = {
  result?: string
}
export type SuccessDescription = unknown
export type JsonSuccess = JsonSuccessBase & {}
export type JsonSuccessBase = JsonResponseBase & {
  result?: 'success'
  msg?: string
  ignored_parameters_unsupported?: IgnoredParametersUnsupported
}
export type IgnoredParametersSuccess = IgnoredParametersBase & {}
export type IgnoredParametersBase = JsonResponseBase & {
  result?: 'success'
  msg?: string
  ignored_parameters_unsupported?: IgnoredParametersUnsupported
}
export type JsonError = JsonErrorBase & {}
export type JsonErrorBase = JsonResponseBase & {
  result?: 'error'
  msg?: string
}
export type PartiallyCompleted = JsonResponseBase & {
  result?: 'partially_completed'
  code?: string
  msg?: string
}
export type ApiKeyResponse = JsonSuccessBase & {
  api_key?: string
  email?: string
  user_id?: number
}
export type CodedError = CodedErrorBase & {}
export type CodedErrorBase = JsonErrorBase & {
  code?: string
}
export type BadEventQueueIdError = CodedErrorBase & {
  queue_id?: string
}
export type InvalidMessageError = JsonErrorBase & {}
export type NonExistingStreamNameError = CodedErrorBase & {
  stream?: string
}
export type NonExistingStreamIdError = CodedErrorBase & {
  stream_id?: number
}
export type AddSubscriptionsResponse = JsonSuccessBase & {
  subscribed?: {}
  already_subscribed?: {}
  unauthorized?: string[]
}
export type InvalidApiKeyError = JsonError
export type MissingArgumentError = CodedErrorBase & {
  var_name?: string
}
export type UserNotAuthorizedError = CodedError
export type UserDeactivatedError = CodedError
export type RateLimitedError = CodedError
export type RealmDeactivatedError = CodedError
export interface FetchApiKeyQuery {
  username: string
  password: string
}
export type FetchApiKeyResponse = ApiKeyResponse & SuccessDescription
export interface DevFetchApiKeyQuery {
  username: string
}
export type DevFetchApiKeyResponse = ApiKeyResponse & SuccessDescription
export interface GetEventsQuery {
  queue_id: string
  last_event_id?: number
  dont_block?: boolean
}
export type GetEventsResponse = JsonSuccessBase &
  SuccessDescription & {
    events?: (
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'alert_words'
          alert_words?: string[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'update_display_settings'
          setting_name?: string
          setting?: boolean | number | string
          language_name?: string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'update_global_notifications'
          notification_name?: string
          setting?: boolean | number | string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_settings'
          op?: string
          property?: string
          value?: boolean | number | string
          language_name?: string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_user'
          op?: string
          person?:
            | {
                user_id?: number
                full_name?: string
              }
            | {
                user_id?: number
                avatar_url?: string
                avatar_source?: string
                avatar_url_medium?: string
                avatar_version?: number
              }
            | {
                user_id?: number
                email?: string
                timezone?: string
              }
            | {
                user_id?: number
                bot_owner_id?: number
              }
            | {
                user_id?: number
                role?: number
              }
            | {
                user_id?: number
                is_billing_admin?: boolean
              }
            | {
                user_id?: number
                delivery_email?: string
              }
            | {
                user_id?: number
                custom_profile_field?: {
                  id?: number
                  value?: string
                  rendered_value?: string
                }
              }
            | {
                user_id?: number
                new_email?: string
              }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'subscription'
          op?: string
          subscriptions?: Subscriptions[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'subscription'
          op?: string
          subscriptions?: {
            stream_id?: number
            name?: string
          }[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'subscription'
          op?: string
          stream_id?: number
          property?: string
          value?: number | boolean | string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'subscription'
          op?: string
          stream_ids?: number[]
          user_ids?: number[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'subscription'
          op?: string
          stream_ids?: number[]
          user_ids?: number[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'message'
          message?: MessagesEvent
          flags?: string[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'has_zoom_token'
          value?: boolean
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'invites_changed'
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_user'
          op?: string
          person?: User
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_user'
          op?: string
          person?: {
            user_id?: number
            full_name?: string
          }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'presence'
          user_id?: number
          email?: string
          server_timestamp?: unknown
          presence?: {}
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'stream'
          op?: string
          streams?: BasicStream[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'stream'
          op?: string
          streams?: BasicStream[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'stream'
          op?: string
          stream_id?: number
          name?: string
          property?: string
          value?: number | boolean | string
          rendered_description?: string
          history_public_to_subscribers?: boolean
          is_web_public?: boolean
        }
      | (EmojiReactionBase & {
          id?: EventIdSchema
          type?: EventTypeSchema & 'reaction'
          op?: string
          message_id?: number
        })
      | (EmojiReactionBase & {
          id?: EventIdSchema
          type?: EventTypeSchema & 'reaction'
          op?: string
          message_id?: number
        })
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'attachment'
          op?: string
          attachment?: Attachments
          upload_space_used?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'attachment'
          op?: string
          attachment?: Attachments
          upload_space_used?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'attachment'
          op?: string
          attachment?: {
            id?: number
          }
          upload_space_used?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'submessage'
          msg_type?: string
          content?: string
          message_id?: number
          sender_id?: number
          submessage_id?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_status'
          away?: boolean
          status_text?: string
          emoji_name?: string
          emoji_code?: string
          reaction_type?: string
          user_id?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'custom_profile_fields'
          fields?: CustomProfileField[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'default_stream_groups'
          default_stream_groups?: DefaultStreamGroup[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'default_streams'
          default_streams?: DefaultStream[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'delete_message'
          message_ids?: number[]
          message_id?: number
          message_type?: string
          stream_id?: number
          topic?: string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'muted_topics'
          muted_topics?: (string | number)[][]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_topic'
          stream_id?: number
          topic_name?: string
          last_updated?: number
          visibility_policy?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'muted_users'
          muted_users?: {
            id?: number
            timestamp?: number
          }[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'heartbeat'
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'hotspots'
          hotspots?: Hotspot[]
        }
      | {
          id: EventIdSchema
          type: EventTypeSchema & 'update_message'
          user_id: number
          rendering_only: boolean
          message_id: number
          message_ids: number[]
          flags: string[]
          edit_timestamp: number
          stream_name?: string
          stream_id?: number
          new_stream_id?: number
          propagate_mode?: string
          orig_subject?: string
          subject?: string
          topic_links?: {
            text?: string
            url?: string
          }[]
          orig_content?: string
          orig_rendered_content?: string
          prev_rendered_content_version?: number
          content?: string
          rendered_content?: string
          is_me_message?: boolean
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'typing'
          op?: string
          message_type?: string
          sender?: {
            user_id?: number
            email?: string
          }
          recipients?: {
            user_id?: number
            email?: string
          }[]
          stream_id?: number
          topic?: string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'typing'
          op?: string
          message_type?: string
          sender?: {
            user_id?: number
            email?: string
          }
          recipients?: {
            user_id?: number
            email?: string
          }[]
          stream_id?: number
          topic?: string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'update_message_flags'
          op?: string
          operation?: string
          flag?: string
          messages?: number[]
          all?: boolean
        }
      | {
          id: EventIdSchema
          type: EventTypeSchema & 'update_message_flags'
          op: string
          operation: string
          flag: string
          messages: number[]
          all: boolean
          message_details?: {}
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_group'
          op?: string
          group?: UserGroup
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_group'
          op?: string
          group_id?: number
          data?: {
            name?: string
            description?: string
            can_mention_group?: number
          }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_group'
          op?: string
          group_id?: number
          user_ids?: number[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_group'
          op?: string
          group_id?: number
          user_ids?: number[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_group'
          op?: string
          group_id?: number
          direct_subgroup_ids?: number[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_group'
          op?: string
          group_id?: number
          direct_subgroup_ids?: number[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'user_group'
          op?: string
          group_id?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_linkifiers'
          realm_linkifiers?: {
            pattern?: string
            url_template?: string
            id?: number
          }[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_filters'
          realm_filters?: (number | string)[][]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_playgrounds'
          realm_playgrounds?: RealmPlayground[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_emoji'
          op?: string
          realm_emoji?: {}
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_domains'
          op?: string
          realm_domain?: RealmDomain
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_domains'
          op?: string
          realm_domain?: {
            domain?: string
            allow_subdomains?: boolean
          }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_domains'
          op?: string
          domain?: string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_export'
          exports?: RealmExport[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_bot'
          op?: string
          bot?: Bot
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_bot'
          op?: string
          bot?: BasicBot
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_bot'
          op?: string
          bot?: {
            user_id?: number
            full_name?: string
          }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_bot'
          op?: string
          bot?: {
            user_id?: number
          }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm'
          op?: string
          property?: string
          value?: string | boolean | number
          extra_data?: {
            upload_quota?: number
          }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm'
          op?: string
          realm_id?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'restart'
          zulip_version?: string
          zulip_merge_base?: string
          zulip_feature_level?: number
          immediate?: boolean
          server_generation?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm'
          op?: string
          property?: string
          data?: {
            add_custom_emoji_policy?: number
            allow_edit_history?: boolean
            allow_message_editing?: boolean
            authentication_methods?: {}
            bot_creation_policy?: number
            create_public_stream_policy?: number
            create_private_stream_policy?: number
            create_web_public_stream_policy?: number
            default_code_block_language?: string
            default_language?: string
            description?: string
            digest_emails_enabled?: boolean
            digest_weekday?: number
            disallow_disposable_email_addresses?: boolean
            edit_topic_policy?: number
            email_changes_disabled?: boolean
            emails_restricted_to_domains?: boolean
            enable_spectator_access?: boolean
            giphy_rating?: number
            icon_source?: string
            icon_url?: string
            inline_image_preview?: boolean
            inline_url_embed_preview?: boolean
            invite_required?: boolean
            invite_to_realm_policy?: number
            invite_to_stream_policy?: number
            logo_source?: string
            logo_url?: string
            mandatory_topics?: boolean
            message_content_allowed_in_email_notifications?: boolean
            message_content_delete_limit_seconds?: number
            message_content_edit_limit_seconds?: number
            move_messages_within_stream_limit_seconds?: number
            move_messages_between_streams_limit_seconds?: number
            move_messages_between_streams_policy?: number
            name?: string
            name_changes_disabled?: boolean
            night_logo_source?: string
            night_logo_url?: string
            notifications_stream_id?: number
            org_type?: number
            plan_type?: number
            presence_disabled?: boolean
            private_message_policy?: number
            send_welcome_emails?: boolean
            signup_notifications_stream_id?: number
            user_group_edit_policy?: number
            video_chat_provider?: number
            waiting_period_threshold?: number
            want_advertise_in_communities_directory?: boolean
            wildcard_mention_policy?: number
            enable_read_receipts?: boolean
          }
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'realm_user_settings_defaults'
          op?: string
          property?: string
          value?: boolean | number | string
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'drafts'
          op?: string
          drafts?: Draft[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'drafts'
          op?: string
          draft?: Draft
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'drafts'
          op?: string
          draft_id?: number
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'scheduled_messages'
          op?: string
          scheduled_messages?: ScheduledMessage[]
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'scheduled_messages'
          op?: string
          scheduled_message?: ScheduledMessage
        }
      | {
          id?: EventIdSchema
          type?: EventTypeSchema & 'scheduled_messages'
          op?: string
          scheduled_message_id?: number
        }
    )[]
    queue_id?: string
  }
export interface DeleteQueueQuery {
  queue_id: string
}
export interface GetStreamIdQuery {
  stream: string
}
export type GetStreamIdResponse = JsonSuccessBase &
  SuccessDescription & {
    stream_id?: number
  }
export type MarkAllAsReadResponse =
  | (JsonSuccess & SuccessDescription)
  | PartiallyCompleted
export interface MarkStreamAsReadQuery {
  stream_id: number
}
export interface MarkTopicAsReadQuery {
  stream_id: number
  topic_name: string
}
export type GetAttachmentsResponse = JsonSuccessBase &
  SuccessDescription & {
    attachments?: Attachments[]
    upload_space_used?: number
  }
export interface RemoveAttachmentParam {
  attachment_id: string
}
export type GetDraftsResponse = JsonSuccessBase &
  SuccessDescription & {
    count?: number
    drafts?: Draft[]
  }
export interface CreateDraftsQuery {
  drafts?: string
}
export type CreateDraftsResponse = JsonSuccessBase &
  SuccessDescription & {
    ids?: number[]
  }
export interface EditDraftParam {
  draft_id: string
}
export interface EditDraftQuery {
  draft: string
}
export interface DeleteDraftParam {
  draft_id: string
}
export type GetScheduledMessagesResponse = JsonSuccessBase &
  SuccessDescription & {
    scheduled_messages?: ScheduledMessage[]
  }
export interface CreateScheduledMessageQuery {
  type: string
  to: string
  content: string
  topic?: string
  scheduled_delivery_timestamp: number
}
export type CreateScheduledMessageResponse = JsonSuccessBase &
  SuccessDescription & {
    scheduled_message_id?: number
  }
export interface UpdateScheduledMessageParam {
  scheduled_message_id: string
}
export interface UpdateScheduledMessageQuery {
  type?: string
  to?: string
  content?: string
  topic?: string
  scheduled_delivery_timestamp?: number
}
export interface DeleteScheduledMessageParam {
  scheduled_message_id: string
}
export interface AddDefaultStreamQuery {
  stream_id: number
}
export interface RemoveDefaultStreamQuery {
  stream_id: number
}
export interface GetMessagesQuery {
  anchor?: string | number
  include_anchor?: boolean
  num_before: number
  num_after: number
  narrow?: string
  client_gravatar?: boolean
  apply_markdown?: boolean
  use_first_unread_anchor?: boolean
}
export type GetMessagesResponse = JsonSuccessBase &
  SuccessDescription & {
    anchor?: number
    found_newest?: boolean
    found_oldest?: boolean
    found_anchor?: boolean
    history_limited?: boolean
    messages?: (MessagesBase & {
      avatar_url?: unknown
      flags?: string[]
      match_content?: string
      match_subject?: string
    })[]
  }
export interface SendMessageQuery {
  type: string
  to: string
  content: string
  topic?: string
  queue_id?: string
  local_id?: string
}
export type SendMessageResponse = JsonSuccessBase &
  SuccessDescription & {
    id?: number
  }
export interface GetMessageHistoryParam {
  message_id: string
}
export type GetMessageHistoryResponse = JsonSuccessBase &
  SuccessDescription & {
    message_history?: {
      topic?: string
      prev_topic?: string
      stream?: number
      prev_stream?: number
      content?: string
      rendered_content?: string
      prev_content?: string
      prev_rendered_content?: string
      user_id?: number
      content_html_diff?: string
      timestamp?: number
    }[]
  }
export interface UpdateMessageFlagsQuery {
  messages: string
  op: string
  flag: string
}
export type UpdateMessageFlagsResponse = JsonSuccessBase &
  SuccessDescription & {
    messages?: number[]
  }
export interface UpdateMessageFlagsForNarrowQuery {
  anchor: string | number
  include_anchor?: boolean
  num_before: number
  num_after: number
  narrow: string
  op: string
  flag: string
}
export type UpdateMessageFlagsForNarrowResponse = JsonSuccessBase &
  SuccessDescription & {
    processed_count?: number
    updated_count?: number
    first_processed_id?: number
    last_processed_id?: number
    found_oldest?: boolean
    found_newest?: boolean
  }
export interface RenderMessageQuery {
  content: string
}
export type RenderMessageResponse = JsonSuccessBase &
  SuccessDescription & {
    rendered?: string
  }
export interface AddReactionParam {
  message_id: string
}
export interface AddReactionQuery {
  emoji_name: string
  emoji_code?: string
  reaction_type?: string
}
export interface RemoveReactionParam {
  message_id: string
}
export interface RemoveReactionQuery {
  emoji_name?: string
  emoji_code?: string
  reaction_type?: string
}
export interface GetReadReceiptsParam {
  message_id: string
}
export type GetReadReceiptsResponse = JsonSuccessBase &
  SuccessDescription & {
    user_ids?: number[]
  }
export interface CheckMessagesMatchNarrowQuery {
  msg_ids: string
  narrow: string
}
export type CheckMessagesMatchNarrowResponse = SuccessDescription &
  JsonSuccessBase & {
    messages?: {}
  }
export interface GetMessageParam {
  message_id: string
}
export interface GetMessageQuery {
  apply_markdown?: boolean
}
export type GetMessageResponse = JsonSuccessBase &
  SuccessDescription & {
    raw_content?: string
    message?: MessagesBase & {
      avatar_url?: unknown
      flags?: string[]
    }
  }
export interface UpdateMessageParam {
  message_id: string
}
export interface UpdateMessageQuery {
  topic?: string
  propagate_mode?: string
  send_notification_to_old_thread?: boolean
  send_notification_to_new_thread?: boolean
  content?: string
  stream_id?: number
}
export interface DeleteMessageParam {
  message_id: string
}
export type UploadFileResponse = JsonSuccessBase &
  SuccessDescription & {
    uri?: string
  }
export interface GetFileTemporaryUrlParam {
  realm_id_str: string
  filename: string
}
export type GetFileTemporaryUrlResponse = JsonSuccessBase &
  SuccessDescription & {
    url?: string
  }
export interface GetUsersQuery {
  client_gravatar?: boolean
  include_custom_profile_fields?: boolean
}
export type GetUsersResponse = JsonSuccessBase &
  SuccessDescription & {
    members?: User[]
  }
export interface CreateUserQuery {
  email: string
  password: string
  full_name: string
}
export type CreateUserResponse = JsonSuccessBase &
  SuccessDescription & {
    user_id?: number
  }
export interface ReactivateUserParam {
  user_id: string
}
export interface GetUserPresenceParam {
  user_id_or_email: string
}
export type GetUserPresenceResponse = JsonSuccessBase &
  SuccessDescription & {
    presence?: {}
  }
export type GetOwnUserResponse = JsonSuccessBase &
  SuccessDescription & {
    avatar_url?: string
    avatar_version?: number
    email?: string
    full_name?: string
    is_admin?: boolean
    is_owner?: boolean
    is_billing_admin?: boolean
    role?: number
    is_guest?: boolean
    is_bot?: boolean
    is_active?: boolean
    timezone?: string
    date_joined?: string
    max_message_id?: number
    user_id?: number
    delivery_email?: string
    profile_data?: profile_data
  }
export type GetAlertWordsResponse = JsonSuccessBase &
  SuccessDescription & {
    alert_words?: string[]
  }
export interface AddAlertWordsQuery {
  alert_words: string
}
export type AddAlertWordsResponse = JsonSuccessBase &
  SuccessDescription & {
    alert_words?: string[]
  }
export interface RemoveAlertWordsQuery {
  alert_words: string
}
export type RemoveAlertWordsResponse = JsonSuccessBase &
  SuccessDescription & {
    alert_words?: string[]
  }
export interface UpdateStatusQuery {
  status_text?: string
  away?: boolean
  emoji_name?: string
  emoji_code?: string
  reaction_type?: string
}
export interface GetStreamTopicsParam {
  stream_id: string
}
export type GetStreamTopicsResponse = JsonSuccessBase &
  SuccessDescription & {
    topics?: {
      max_id?: number
      name?: string
    }[]
  }
export interface GetSubscriptionsQuery {
  include_subscribers?: boolean
}
export type GetSubscriptionsResponse = JsonSuccessBase &
  SuccessDescription & {
    subscriptions?: Subscriptions[]
  }
export interface SubscribeQuery {
  subscriptions: string
  principals?: string
  authorization_errors_fatal?: boolean
  announce?: boolean
  invite_only?: boolean
  is_web_public?: boolean
  is_default_stream?: boolean
  history_public_to_subscribers?: boolean
  stream_post_policy?: number
  message_retention_days?: string | number
  can_remove_subscribers_group?: number
}
export type SubscribeResponse = AddSubscriptionsResponse & SuccessDescription
export interface UpdateSubscriptionsQuery {
  delete?: string
  add?: string
}
export type UpdateSubscriptionsResponse = JsonSuccessBase &
  SuccessDescription & {
    subscribed?: {}
    already_subscribed?: {}
    not_removed?: string[]
    removed?: string[]
  }
export interface UnsubscribeQuery {
  subscriptions: string
  principals?: string
}
export type UnsubscribeResponse = JsonSuccessBase &
  SuccessDescription & {
    not_removed?: string[]
    removed?: string[]
  }
export interface MuteTopicQuery {
  stream_id?: number
  stream?: string
  topic: string
  op: string
}
export interface UpdateUserTopicQuery {
  stream_id: number
  topic: string
  visibility_policy: number
}
export interface MuteUserParam {
  muted_user_id: string
}
export interface UnmuteUserParam {
  muted_user_id: string
}
export interface GetSubscriptionStatusParam {
  user_id: string
  stream_id: string
}
export type GetSubscriptionStatusResponse = JsonSuccessBase &
  SuccessDescription & {
    is_subscribed?: boolean
  }
export interface UploadCustomEmojiParam {
  emoji_name: string
}
export interface DeactivateCustomEmojiParam {
  emoji_name: string
}
export type GetCustomEmojiResponse = JsonSuccessBase &
  SuccessDescription & {
    emoji?: {}
  }
export type GetPresenceResponse = JsonSuccessBase &
  SuccessDescription & {
    server_timestamp?: unknown
    presences?: {}
  }
export type GetCustomProfileFieldsResponse = JsonSuccessBase &
  SuccessDescription & {
    custom_fields?: CustomProfileField[]
  }
export interface ReorderCustomProfileFieldsQuery {
  order: string
}
export interface CreateCustomProfileFieldQuery {
  name?: string
  hint?: string
  field_type: number
  field_data?: string
  display_in_profile_summary?: boolean
}
export type CreateCustomProfileFieldResponse = JsonSuccessBase &
  SuccessDescription & {
    id?: number
  }
export interface UpdateRealmUserSettingsDefaultsQuery {
  dense_mode?: boolean
  starred_message_counts?: boolean
  fluid_layout_width?: boolean
  high_contrast_mode?: boolean
  web_mark_read_on_scroll_policy?: number
  color_scheme?: number
  enable_drafts_synchronization?: boolean
  translate_emoticons?: boolean
  display_emoji_reaction_users?: boolean
  default_view?: string
  escape_navigates_to_default_view?: boolean
  left_side_userlist?: boolean
  emojiset?: string
  demote_inactive_streams?: number
  user_list_style?: number
  enable_stream_desktop_notifications?: boolean
  enable_stream_email_notifications?: boolean
  enable_stream_push_notifications?: boolean
  enable_stream_audible_notifications?: boolean
  notification_sound?: string
  enable_desktop_notifications?: boolean
  enable_sounds?: boolean
  enable_followed_topic_desktop_notifications?: boolean
  enable_followed_topic_email_notifications?: boolean
  enable_followed_topic_push_notifications?: boolean
  enable_followed_topic_audible_notifications?: boolean
  email_notifications_batching_period_seconds?: number
  enable_offline_email_notifications?: boolean
  enable_offline_push_notifications?: boolean
  enable_online_push_notifications?: boolean
  enable_digest_emails?: boolean
  message_content_in_email_notifications?: boolean
  pm_content_in_desktop_notifications?: boolean
  wildcard_mentions_notify?: boolean
  enable_followed_topic_wildcard_mentions_notify?: boolean
  desktop_icon_count_display?: number
  realm_name_in_email_notifications_policy?: number
  presence_enabled?: boolean
  enter_sends?: boolean
  twenty_four_hour_time?: boolean
  send_private_typing_notifications?: boolean
  send_stream_typing_notifications?: boolean
  send_read_receipts?: boolean
  email_address_visibility?: number
}
export interface UpdateSubscriptionSettingsQuery {
  subscription_data: string
}
export interface GetUserByEmailParam {
  email: string
}
export interface GetUserByEmailQuery {
  client_gravatar?: boolean
  include_custom_profile_fields?: boolean
}
export type GetUserByEmailResponse = JsonSuccessBase &
  SuccessDescription & {
    user?: User
  }
export interface GetUserParam {
  user_id: string
}
export interface GetUserQuery {
  client_gravatar?: boolean
  include_custom_profile_fields?: boolean
}
export type GetUserResponse = JsonSuccessBase &
  SuccessDescription & {
    user?: User
  }
export interface UpdateUserParam {
  user_id: string
}
export interface UpdateUserQuery {
  full_name?: string
  role?: number
  profile_data?: string
}
export interface DeactivateUserParam {
  user_id: string
}
export interface DeactivateUserQuery {
  deactivation_notification_comment?: string
}
export type GetLinkifiersResponse = JsonSuccessBase &
  SuccessDescription & {
    linkifiers?: {
      pattern?: string
      url_template?: string
      id?: number
    }[]
  }
export interface ReorderLinkifiersQuery {
  ordered_linkifier_ids: string
}
export interface AddLinkifierQuery {
  pattern: string
  url_template: string
}
export type AddLinkifierResponse = JsonSuccessBase &
  SuccessDescription & {
    id?: number
  }
export interface RemoveLinkifierParam {
  filter_id: string
}
export interface UpdateLinkifierParam {
  filter_id: string
}
export interface UpdateLinkifierQuery {
  pattern: string
  url_template: string
}
export interface AddCodePlaygroundQuery {
  name: string
  pygments_language: string
  url_template: string
}
export type AddCodePlaygroundResponse = JsonSuccessBase &
  SuccessDescription & {
    id?: number
  }
export interface RemoveCodePlaygroundParam {
  playground_id: string
}
export interface RegisterQueueQuery {
  apply_markdown?: boolean
  client_gravatar?: boolean
  include_subscribers?: boolean
  slim_presence?: boolean
  event_types?: string
  all_public_streams?: boolean
  client_capabilities?: string
  fetch_event_types?: string
  narrow?: string
}
export type RegisterQueueResponse = JsonSuccessBase &
  SuccessDescription & {
    queue_id?: string
    last_event_id?: number
    zulip_feature_level?: number
    zulip_version?: string
    zulip_merge_base?: string
    alert_words?: string[]
    custom_profile_fields?: CustomProfileField[]
    custom_profile_field_types?: {}
    realm_date_created?: number
    demo_organization_scheduled_deletion_date?: number
    drafts?: Draft[]
    hotspots?: Hotspot[]
    max_message_id?: number
    max_stream_name_length?: number
    max_stream_description_length?: number
    max_topic_length?: number
    max_message_length?: number
    server_presence_ping_interval_seconds?: number
    server_presence_offline_threshold_seconds?: number
    scheduled_messages?: ScheduledMessage[]
    muted_topics?: (string | number)[][]
    muted_users?: {
      id?: number
      timestamp?: number
    }[]
    presences?: {}
    server_timestamp?: unknown
    realm_domains?: RealmDomain[]
    realm_emoji?: {} | number[]
    realm_linkifiers?: {
      pattern?: string
      url_template?: string
      id?: number
    }[]
    realm_filters?: (number | string)[][]
    realm_playgrounds?: RealmPlayground[]
    realm_user_groups?: UserGroup[]
    realm_bots?: Bot[]
    realm_embedded_bots?: {
      name?: string
      config?: Config
    }[]
    realm_incoming_webhook_bots?: {
      name?: string
      config?: Config
    }[]
    recent_private_conversations?: {
      max_message_id?: number
      user_ids?: number[]
    }[]
    subscriptions?: Subscriptions[]
    unsubscribed?: Subscriptions[]
    never_subscribed?: (BasicStreamBase & {
      message_retention_days?: unknown
      first_message_id?: unknown
      stream_weekly_traffic?: number
      subscribers?: number[]
    })[]
    unread_msgs?: {
      count?: number
      pms?: {
        other_user_id?: number
        sender_id?: number
        message_ids?: number[]
      }[]
      streams?: {
        topic?: string
        stream_id?: number
        unread_message_ids?: number[]
      }[]
      huddles?: {
        user_ids_string?: string
        message_ids?: number[]
      }[]
      mentions?: number[]
      old_unreads_missing?: boolean
    }
    starred_messages?: number[]
    streams?: BasicStream[]
    realm_default_streams?: DefaultStream[]
    realm_default_stream_groups?: DefaultStreamGroup[]
    stop_words?: string[]
    user_status?: {}
    user_settings?: {
      twenty_four_hour_time?: boolean
      dense_mode?: boolean
      web_mark_read_on_scroll_policy?: number
      starred_message_counts?: boolean
      fluid_layout_width?: boolean
      high_contrast_mode?: boolean
      color_scheme?: number
      translate_emoticons?: boolean
      display_emoji_reaction_users?: boolean
      default_language?: string
      default_view?: string
      escape_navigates_to_default_view?: boolean
      left_side_userlist?: boolean
      emojiset?: string
      demote_inactive_streams?: number
      user_list_style?: number
      timezone?: string
      enter_sends?: boolean
      enable_drafts_synchronization?: boolean
      enable_stream_desktop_notifications?: boolean
      enable_stream_email_notifications?: boolean
      enable_stream_push_notifications?: boolean
      enable_stream_audible_notifications?: boolean
      notification_sound?: string
      enable_desktop_notifications?: boolean
      enable_sounds?: boolean
      enable_followed_topic_desktop_notifications?: boolean
      enable_followed_topic_email_notifications?: boolean
      enable_followed_topic_push_notifications?: boolean
      enable_followed_topic_audible_notifications?: boolean
      email_notifications_batching_period_seconds?: number
      enable_offline_email_notifications?: boolean
      enable_offline_push_notifications?: boolean
      enable_online_push_notifications?: boolean
      enable_digest_emails?: boolean
      enable_marketing_emails?: boolean
      enable_login_emails?: boolean
      message_content_in_email_notifications?: boolean
      pm_content_in_desktop_notifications?: boolean
      wildcard_mentions_notify?: boolean
      enable_followed_topic_wildcard_mentions_notify?: boolean
      desktop_icon_count_display?: number
      realm_name_in_email_notifications_policy?: number
      presence_enabled?: boolean
      available_notification_sounds?: string[]
      emojiset_choices?: {
        key?: string
        text?: string
      }[]
      send_private_typing_notifications?: boolean
      send_stream_typing_notifications?: boolean
      send_read_receipts?: boolean
      email_address_visibility?: EmailAddressVisibility
    }
    user_topics?: {
      stream_id?: number
      topic_name?: string
      last_updated?: number
      visibility_policy?: number
    }[]
    has_zoom_token?: boolean
    giphy_api_key?: string
    enable_desktop_notifications?: boolean
    enable_digest_emails?: boolean
    enable_login_emails?: boolean
    enable_marketing_emails?: boolean
    email_notifications_batching_period_seconds?: number
    enable_offline_email_notifications?: boolean
    enable_offline_push_notifications?: boolean
    enable_online_push_notifications?: boolean
    enable_sounds?: boolean
    enable_stream_desktop_notifications?: boolean
    enable_stream_email_notifications?: boolean
    enable_stream_push_notifications?: boolean
    enable_stream_audible_notifications?: boolean
    wildcard_mentions_notify?: boolean
    message_content_in_email_notifications?: boolean
    notification_sound?: string
    pm_content_in_desktop_notifications?: boolean
    desktop_icon_count_display?: number
    realm_name_in_email_notifications_policy?: number
    presence_enabled?: boolean
    available_notification_sounds?: string[]
    color_scheme?: number
    default_language?: string
    demote_inactive_streams?: number
    dense_mode?: boolean
    emojiset?: string
    enable_drafts_synchronization?: boolean
    fluid_layout_width?: boolean
    default_view?: string
    high_contrast_mode?: boolean
    left_side_userlist?: boolean
    starred_message_counts?: boolean
    timezone?: string
    translate_emoticons?: boolean
    twenty_four_hour_time?: boolean
    enter_sends?: boolean
    emojiset_choices?: {
      key?: string
      text?: string
    }[]
    realm_add_custom_emoji_policy?: number
    realm_allow_edit_history?: boolean
    realm_delete_own_message_policy?: number
    realm_bot_creation_policy?: number
    realm_create_public_stream_policy?: number
    realm_create_private_stream_policy?: number
    realm_create_web_public_stream_policy?: number
    realm_invite_to_stream_policy?: number
    realm_wildcard_mention_policy?: number
    realm_default_language?: string
    realm_description?: string
    realm_digest_emails_enabled?: boolean
    realm_disallow_disposable_email_addresses?: boolean
    realm_email_changes_disabled?: boolean
    realm_invite_required?: boolean
    realm_invite_to_realm_policy?: number
    realm_move_messages_between_streams_policy?: number
    realm_inline_image_preview?: boolean
    realm_inline_url_embed_preview?: boolean
    realm_mandatory_topics?: boolean
    realm_message_retention_days?: number
    realm_name?: string
    realm_name_changes_disabled?: boolean
    realm_avatar_changes_disabled?: boolean
    realm_emails_restricted_to_domains?: boolean
    realm_send_welcome_emails?: boolean
    realm_message_content_allowed_in_email_notifications?: boolean
    realm_enable_spectator_access?: boolean
    realm_want_advertise_in_communities_directory?: boolean
    realm_video_chat_provider?: number
    realm_giphy_rating?: number
    realm_waiting_period_threshold?: number
    realm_digest_weekday?: number
    realm_private_message_policy?: number
    realm_user_group_edit_policy?: number
    realm_default_code_block_language?: string
    realm_message_content_delete_limit_seconds?: number
    realm_authentication_methods?: {}
    realm_allow_message_editing?: boolean
    realm_edit_topic_policy?: number
    realm_message_content_edit_limit_seconds?: number
    realm_move_messages_within_stream_limit_seconds?: number
    realm_move_messages_between_streams_limit_seconds?: number
    realm_enable_read_receipts?: boolean
    realm_icon_url?: string
    realm_icon_source?: string
    max_icon_file_size_mib?: number
    realm_logo_url?: string
    realm_logo_source?: string
    realm_night_logo_url?: string
    realm_night_logo_source?: string
    max_logo_file_size_mib?: number
    realm_bot_domain?: string
    realm_uri?: string
    realm_available_video_chat_providers?: {}
    realm_presence_disabled?: boolean
    settings_send_digest_emails?: boolean
    realm_is_zephyr_mirror_realm?: boolean
    realm_email_auth_enabled?: boolean
    realm_password_auth_enabled?: boolean
    realm_push_notifications_enabled?: boolean
    realm_upload_quota_mib?: number
    realm_org_type?: number
    realm_plan_type?: number
    zulip_plan_is_not_limited?: boolean
    upgrade_text_for_wide_organization_logo?: string
    realm_default_external_accounts?: {}
    jitsi_server_url?: string
    development_environment?: boolean
    server_generation?: number
    password_min_length?: number
    password_min_guesses?: number
    giphy_rating_options?: {}
    max_file_upload_size_mib?: number
    max_avatar_file_size_mib?: number
    server_inline_image_preview?: boolean
    server_inline_url_embed_preview?: boolean
    server_avatar_changes_disabled?: boolean
    server_name_changes_disabled?: boolean
    server_needs_upgrade?: boolean
    server_web_public_streams_enabled?: boolean
    server_emoji_data_url?: string
    event_queue_longpoll_timeout_seconds?: number
    realm_notifications_stream_id?: number
    realm_signup_notifications_stream_id?: number
    realm_user_settings_defaults?: {
      twenty_four_hour_time?: boolean
      dense_mode?: boolean
      web_mark_read_on_scroll_policy?: number
      starred_message_counts?: boolean
      fluid_layout_width?: boolean
      high_contrast_mode?: boolean
      color_scheme?: number
      translate_emoticons?: boolean
      display_emoji_reaction_users?: boolean
      default_language?: string
      default_view?: string
      escape_navigates_to_default_view?: boolean
      left_side_userlist?: boolean
      emojiset?: string
      demote_inactive_streams?: number
      user_list_style?: number
      enable_stream_desktop_notifications?: boolean
      enable_stream_email_notifications?: boolean
      enable_stream_push_notifications?: boolean
      enable_stream_audible_notifications?: boolean
      notification_sound?: string
      enable_desktop_notifications?: boolean
      enable_sounds?: boolean
      enable_offline_email_notifications?: boolean
      enable_offline_push_notifications?: boolean
      enable_online_push_notifications?: boolean
      enable_followed_topic_desktop_notifications?: boolean
      enable_followed_topic_email_notifications?: boolean
      enable_followed_topic_push_notifications?: boolean
      enable_followed_topic_audible_notifications?: boolean
      enable_digest_emails?: boolean
      enable_marketing_emails?: boolean
      enable_login_emails?: boolean
      message_content_in_email_notifications?: boolean
      pm_content_in_desktop_notifications?: boolean
      wildcard_mentions_notify?: boolean
      enable_followed_topic_wildcard_mentions_notify?: boolean
      desktop_icon_count_display?: number
      realm_name_in_email_notifications_policy?: number
      presence_enabled?: boolean
      enter_sends?: boolean
      enable_drafts_synchronization?: boolean
      email_notifications_batching_period_seconds?: number
      available_notification_sounds?: string[]
      emojiset_choices?: {
        key?: string
        text?: string
      }[]
      send_private_typing_notifications?: boolean
      send_stream_typing_notifications?: boolean
      send_read_receipts?: boolean
      email_address_visibility?: EmailAddressVisibility
    }
    realm_users?: User[]
    realm_non_active_users?: User[]
    avatar_source?: string
    avatar_url_medium?: string
    avatar_url?: string
    can_create_streams?: boolean
    can_create_public_streams?: boolean
    can_create_private_streams?: boolean
    can_create_web_public_streams?: boolean
    can_subscribe_other_users?: boolean
    can_invite_others_to_realm?: boolean
    is_admin?: boolean
    is_owner?: boolean
    is_billing_admin?: boolean
    is_moderator?: boolean
    is_guest?: boolean
    user_id?: number
    email?: string
    delivery_email?: string
    full_name?: string
    cross_realm_bots?: (UserBase & {
      is_system_bot?: boolean
      bot_type?: unknown
      bot_owner_id?: unknown
      avatar_url?: unknown
    })[]
  }
export type GetServerSettingsResponse = JsonSuccessBase & {
  authentication_methods?: {
    password?: boolean
    dev?: boolean
    email?: boolean
    ldap?: boolean
    remoteuser?: boolean
    github?: boolean
    azuread?: boolean
    gitlab?: boolean
    apple?: boolean
    google?: boolean
    saml?: boolean
    'openid connect'?: boolean
  }
  external_authentication_methods?: {
    name?: string
    display_name?: string
    display_icon?: string
    login_url?: string
    signup_url?: string
  }[]
  zulip_feature_level?: number
  zulip_version?: string
  zulip_merge_base?: string
  push_notifications_enabled?: boolean
  is_incompatible?: boolean
  email_auth_enabled?: boolean
  require_email_format_usernames?: boolean
  realm_uri?: string
  realm_name?: string
  realm_icon?: string
  realm_description?: string
  realm_web_public_access_enabled?: boolean
}
export interface UpdateSettingsQuery {
  full_name?: string
  email?: string
  old_password?: string
  new_password?: string
  twenty_four_hour_time?: boolean
  dense_mode?: boolean
  web_mark_read_on_scroll_policy?: number
  starred_message_counts?: boolean
  fluid_layout_width?: boolean
  high_contrast_mode?: boolean
  color_scheme?: number
  enable_drafts_synchronization?: boolean
  translate_emoticons?: boolean
  display_emoji_reaction_users?: boolean
  default_language?: string
  default_view?: string
  escape_navigates_to_default_view?: boolean
  left_side_userlist?: boolean
  emojiset?: string
  demote_inactive_streams?: number
  user_list_style?: number
  timezone?: string
  enable_stream_desktop_notifications?: boolean
  enable_stream_email_notifications?: boolean
  enable_stream_push_notifications?: boolean
  enable_stream_audible_notifications?: boolean
  notification_sound?: string
  enable_desktop_notifications?: boolean
  enable_sounds?: boolean
  email_notifications_batching_period_seconds?: number
  enable_offline_email_notifications?: boolean
  enable_offline_push_notifications?: boolean
  enable_online_push_notifications?: boolean
  enable_followed_topic_desktop_notifications?: boolean
  enable_followed_topic_email_notifications?: boolean
  enable_followed_topic_push_notifications?: boolean
  enable_followed_topic_audible_notifications?: boolean
  enable_digest_emails?: boolean
  enable_marketing_emails?: boolean
  enable_login_emails?: boolean
  message_content_in_email_notifications?: boolean
  pm_content_in_desktop_notifications?: boolean
  wildcard_mentions_notify?: boolean
  enable_followed_topic_wildcard_mentions_notify?: boolean
  desktop_icon_count_display?: number
  realm_name_in_email_notifications_policy?: number
  presence_enabled?: boolean
  enter_sends?: boolean
  send_private_typing_notifications?: boolean
  send_stream_typing_notifications?: boolean
  send_read_receipts?: boolean
  email_address_visibility?: number
}
export interface GetSubscribersParam {
  stream_id: string
}
export type GetSubscribersResponse = JsonSuccessBase &
  SuccessDescription & {
    subscribers?: number[]
  }
export interface GetStreamsQuery {
  include_public?: boolean
  include_web_public?: boolean
  include_subscribed?: boolean
  include_all_active?: boolean
  include_default?: boolean
  include_owner_subscribed?: boolean
}
export type GetStreamsResponse = JsonSuccessBase &
  SuccessDescription & {
    streams?: (BasicStreamBase & {
      message_retention_days?: unknown
      first_message_id?: unknown
      stream_weekly_traffic?: number
      is_default?: boolean
    })[]
  }
export interface GetStreamByIdParam {
  stream_id: string
}
export type GetStreamByIdResponse = JsonSuccessBase &
  SuccessDescription & {
    stream?: BasicStream
  }
export interface ArchiveStreamParam {
  stream_id: string
}
export interface UpdateStreamParam {
  stream_id: string
}
export interface UpdateStreamQuery {
  description?: string
  new_name?: string
  is_private?: boolean
  is_announcement_only?: boolean
  is_web_public?: boolean
  history_public_to_subscribers?: boolean
  is_default_stream?: boolean
  stream_post_policy?: number
  message_retention_days?: string | number
  can_remove_subscribers_group?: number
}
export interface DeleteTopicParam {
  stream_id: string
}
export interface DeleteTopicQuery {
  topic_name: string
}
export type DeleteTopicResponse =
  | (JsonSuccess & SuccessDescription)
  | PartiallyCompleted
export interface SetTypingStatusQuery {
  type?: string
  op: string
  to: string
  topic?: string
}
export interface CreateUserGroupQuery {
  name: string
  description: string
  members: string
  can_mention_group?: number
}
export interface UpdateUserGroupMembersParam {
  user_group_id: string
}
export interface UpdateUserGroupMembersQuery {
  delete?: string
  add?: string
}
export interface GetUserGroupMembersParam {
  user_group_id: string
}
export interface GetUserGroupMembersQuery {
  direct_member_only?: boolean
}
export type GetUserGroupMembersResponse = JsonSuccessBase &
  SuccessDescription & {
    members?: number[]
  }
export interface UpdateUserGroupParam {
  user_group_id: string
}
export interface UpdateUserGroupQuery {
  name?: string
  description?: string
  can_mention_group?: number
}
export interface RemoveUserGroupParam {
  user_group_id: string
}
export type GetUserGroupsResponse = JsonSuccessBase &
  SuccessDescription & {
    user_groups?: {
      description?: string
      id?: number
      members?: number[]
      direct_subgroup_ids?: number[]
      name?: string
      is_system_group?: boolean
      can_mention_group?: number
    }[]
  }
export interface UpdateUserGroupSubgroupsParam {
  user_group_id: string
}
export interface UpdateUserGroupSubgroupsQuery {
  delete?: string
  add?: string
}
export interface GetUserGroupSubgroupsParam {
  user_group_id: string
}
export interface GetUserGroupSubgroupsQuery {
  direct_subgroup_only?: boolean
}
export type GetUserGroupSubgroupsResponse = JsonSuccessBase &
  SuccessDescription & {
    subgroups?: number[]
  }
export interface GetIsUserGroupMemberParam {
  user_group_id: string
  user_id: string
}
export interface GetIsUserGroupMemberQuery {
  direct_member_only?: boolean
}
export type GetIsUserGroupMemberResponse = JsonSuccessBase &
  SuccessDescription & {
    is_user_group_member?: boolean
  }
export type ZulipOutgoingWebhooksResponse = {
  bot_email?: string
  bot_full_name?: string
  data?: string
  trigger?: string
  token?: string
  message?: MessagesBase & {
    avatar_url?: unknown
    rendered_content?: string
  }
}
export interface CreateBigBlueButtonVideoCallQuery {
  meeting_name: string
}
export type CreateBigBlueButtonVideoCallResponse = JsonSuccessBase &
  SuccessDescription & {
    url?: string
  }

Internal.define({
  '/fetch_api_key': {
    POST: 'fetchApiKey',
  },
  '/dev_fetch_api_key': {
    POST: 'devFetchApiKey',
  },
  '/events': {
    GET: 'getEvents',
    DELETE: 'deleteQueue',
  },
  '/get_stream_id': {
    GET: 'getStreamId',
  },
  '/mark_all_as_read': {
    POST: 'markAllAsRead',
  },
  '/mark_stream_as_read': {
    POST: 'markStreamAsRead',
  },
  '/mark_topic_as_read': {
    POST: 'markTopicAsRead',
  },
  '/attachments': {
    GET: 'getAttachments',
  },
  '/attachments/{attachment_id}': {
    DELETE: 'removeAttachment',
  },
  '/drafts': {
    GET: 'getDrafts',
    POST: 'createDrafts',
  },
  '/drafts/{draft_id}': {
    PATCH: 'editDraft',
    DELETE: 'deleteDraft',
  },
  '/scheduled_messages': {
    GET: 'getScheduledMessages',
    POST: 'createScheduledMessage',
  },
  '/scheduled_messages/{scheduled_message_id}': {
    PATCH: 'updateScheduledMessage',
    DELETE: 'deleteScheduledMessage',
  },
  '/default_streams': {
    POST: 'addDefaultStream',
    DELETE: 'removeDefaultStream',
  },
  '/messages': {
    GET: 'getMessages',
    POST: 'sendMessage',
  },
  '/messages/{message_id}/history': {
    GET: 'getMessageHistory',
  },
  '/messages/flags': {
    POST: 'updateMessageFlags',
  },
  '/messages/flags/narrow': {
    POST: 'updateMessageFlagsForNarrow',
  },
  '/messages/render': {
    POST: 'renderMessage',
  },
  '/messages/{message_id}/reactions': {
    POST: 'addReaction',
    DELETE: 'removeReaction',
  },
  '/messages/{message_id}/read_receipts': {
    GET: 'getReadReceipts',
  },
  '/messages/matches_narrow': {
    GET: 'checkMessagesMatchNarrow',
  },
  '/messages/{message_id}': {
    GET: 'getMessage',
    PATCH: 'updateMessage',
    DELETE: 'deleteMessage',
  },
  '/user_uploads': {
    POST: 'uploadFile',
  },
  '/user_uploads/{realm_id_str}/{filename}': {
    GET: 'getFileTemporaryUrl',
  },
  '/users': {
    GET: 'getUsers',
    POST: 'createUser',
  },
  '/users/{user_id}/reactivate': {
    POST: 'reactivateUser',
  },
  '/users/{user_id_or_email}/presence': {
    GET: 'getUserPresence',
  },
  '/users/me': {
    GET: 'getOwnUser',
    DELETE: 'deactivateOwnUser',
  },
  '/users/me/alert_words': {
    GET: 'getAlertWords',
    POST: 'addAlertWords',
    DELETE: 'removeAlertWords',
  },
  '/users/me/status': {
    POST: 'updateStatus',
  },
  '/users/me/{stream_id}/topics': {
    GET: 'getStreamTopics',
  },
  '/users/me/subscriptions': {
    GET: 'getSubscriptions',
    POST: 'subscribe',
    PATCH: 'updateSubscriptions',
    DELETE: 'unsubscribe',
  },
  '/users/me/subscriptions/muted_topics': {
    PATCH: 'muteTopic',
  },
  '/user_topics': {
    POST: 'updateUserTopic',
  },
  '/users/me/muted_users/{muted_user_id}': {
    POST: 'muteUser',
    DELETE: 'unmuteUser',
  },
  '/users/{user_id}/subscriptions/{stream_id}': {
    GET: 'getSubscriptionStatus',
  },
  '/realm/emoji/{emoji_name}': {
    POST: 'uploadCustomEmoji',
    DELETE: 'deactivateCustomEmoji',
  },
  '/realm/emoji': {
    GET: 'getCustomEmoji',
  },
  '/realm/presence': {
    GET: 'getPresence',
  },
  '/realm/profile_fields': {
    GET: 'getCustomProfileFields',
    PATCH: 'reorderCustomProfileFields',
    POST: 'createCustomProfileField',
  },
  '/realm/user_settings_defaults': {
    PATCH: 'updateRealmUserSettingsDefaults',
  },
  '/users/me/subscriptions/properties': {
    POST: 'updateSubscriptionSettings',
  },
  '/users/{email}': {
    GET: 'getUserByEmail',
  },
  '/users/{user_id}': {
    GET: 'getUser',
    PATCH: 'updateUser',
    DELETE: 'deactivateUser',
  },
  '/realm/linkifiers': {
    GET: 'getLinkifiers',
    PATCH: 'reorderLinkifiers',
  },
  '/realm/filters': {
    POST: 'addLinkifier',
  },
  '/realm/filters/{filter_id}': {
    DELETE: 'removeLinkifier',
    PATCH: 'updateLinkifier',
  },
  '/realm/playgrounds': {
    POST: 'addCodePlayground',
  },
  '/realm/playgrounds/{playground_id}': {
    DELETE: 'removeCodePlayground',
  },
  '/register': {
    POST: 'registerQueue',
  },
  '/server_settings': {
    GET: 'getServerSettings',
  },
  '/settings': {
    PATCH: 'updateSettings',
  },
  '/streams/{stream_id}/members': {
    GET: 'getSubscribers',
  },
  '/streams': {
    GET: 'getStreams',
  },
  '/streams/{stream_id}': {
    GET: 'getStreamById',
    DELETE: 'archiveStream',
    PATCH: 'updateStream',
  },
  '/streams/{stream_id}/delete_topic': {
    POST: 'deleteTopic',
  },
  '/typing': {
    POST: 'setTypingStatus',
  },
  '/user_groups/create': {
    POST: 'createUserGroup',
  },
  '/user_groups/{user_group_id}/members': {
    POST: 'updateUserGroupMembers',
    GET: 'getUserGroupMembers',
  },
  '/user_groups/{user_group_id}': {
    PATCH: 'updateUserGroup',
    DELETE: 'removeUserGroup',
  },
  '/user_groups': {
    GET: 'getUserGroups',
  },
  '/user_groups/{user_group_id}/subgroups': {
    POST: 'updateUserGroupSubgroups',
    GET: 'getUserGroupSubgroups',
  },
  '/user_groups/{user_group_id}/members/{user_id}': {
    GET: 'getIsUserGroupMember',
  },
  '/real-time': {},
  '/rest-error-handling': {},
  '/zulip-outgoing-webhook': {
    POST: 'zulipOutgoingWebhooks',
  },
  '/calls/bigbluebutton/create': {
    GET: 'createBigBlueButtonVideoCall',
  },
})

declare module './internal' {
  interface Internal {
    fetchApiKey(query?: FetchApiKeyQuery): Promise<FetchApiKeyResponse>
    devFetchApiKey(
      query?: DevFetchApiKeyQuery,
    ): Promise<DevFetchApiKeyResponse>
    getEvents(query?: GetEventsQuery): Promise<GetEventsResponse>
    deleteQueue(query?: DeleteQueueQuery): Promise<unknown>
    getStreamId(query?: GetStreamIdQuery): Promise<GetStreamIdResponse>
    markAllAsRead(): Promise<MarkAllAsReadResponse>
    markStreamAsRead(query?: MarkStreamAsReadQuery): Promise<unknown>
    markTopicAsRead(query?: MarkTopicAsReadQuery): Promise<unknown>
    getAttachments(): Promise<GetAttachmentsResponse>
    removeAttachment(param: RemoveAttachmentParam): Promise<unknown>
    getDrafts(): Promise<GetDraftsResponse>
    createDrafts(query?: CreateDraftsQuery): Promise<CreateDraftsResponse>
    editDraft(param: EditDraftParam, query?: EditDraftQuery): Promise<unknown>
    deleteDraft(param: DeleteDraftParam): Promise<unknown>
    getScheduledMessages(): Promise<GetScheduledMessagesResponse>
    createScheduledMessage(
      query?: CreateScheduledMessageQuery,
    ): Promise<CreateScheduledMessageResponse>
    updateScheduledMessage(
      param: UpdateScheduledMessageParam,
      query?: UpdateScheduledMessageQuery,
    ): Promise<unknown>
    deleteScheduledMessage(
      param: DeleteScheduledMessageParam,
    ): Promise<unknown>
    addDefaultStream(query?: AddDefaultStreamQuery): Promise<unknown>
    removeDefaultStream(query?: RemoveDefaultStreamQuery): Promise<unknown>
    getMessages(query?: GetMessagesQuery): Promise<GetMessagesResponse>
    sendMessage(query?: SendMessageQuery): Promise<SendMessageResponse>
    getMessageHistory(
      param: GetMessageHistoryParam,
    ): Promise<GetMessageHistoryResponse>
    updateMessageFlags(
      query?: UpdateMessageFlagsQuery,
    ): Promise<UpdateMessageFlagsResponse>
    updateMessageFlagsForNarrow(
      query?: UpdateMessageFlagsForNarrowQuery,
    ): Promise<UpdateMessageFlagsForNarrowResponse>
    renderMessage(query?: RenderMessageQuery): Promise<RenderMessageResponse>
    addReaction(
      param: AddReactionParam,
      query?: AddReactionQuery,
    ): Promise<unknown>
    removeReaction(
      param: RemoveReactionParam,
      query?: RemoveReactionQuery,
    ): Promise<unknown>
    getReadReceipts(
      param: GetReadReceiptsParam,
    ): Promise<GetReadReceiptsResponse>
    checkMessagesMatchNarrow(
      query?: CheckMessagesMatchNarrowQuery,
    ): Promise<CheckMessagesMatchNarrowResponse>
    getMessage(
      param: GetMessageParam,
      query?: GetMessageQuery,
    ): Promise<GetMessageResponse>
    updateMessage(
      param: UpdateMessageParam,
      query?: UpdateMessageQuery,
    ): Promise<unknown>
    deleteMessage(param: DeleteMessageParam): Promise<unknown>
    uploadFile(): Promise<UploadFileResponse>
    getFileTemporaryUrl(
      param: GetFileTemporaryUrlParam,
    ): Promise<GetFileTemporaryUrlResponse>
    getUsers(query?: GetUsersQuery): Promise<GetUsersResponse>
    createUser(query?: CreateUserQuery): Promise<CreateUserResponse>
    reactivateUser(param: ReactivateUserParam): Promise<unknown>
    getUserPresence(
      param: GetUserPresenceParam,
    ): Promise<GetUserPresenceResponse>
    getOwnUser(): Promise<GetOwnUserResponse>
    deactivateOwnUser(): Promise<unknown>
    getAlertWords(): Promise<GetAlertWordsResponse>
    addAlertWords(query?: AddAlertWordsQuery): Promise<AddAlertWordsResponse>
    removeAlertWords(
      query?: RemoveAlertWordsQuery,
    ): Promise<RemoveAlertWordsResponse>
    updateStatus(query?: UpdateStatusQuery): Promise<unknown>
    getStreamTopics(
      param: GetStreamTopicsParam,
    ): Promise<GetStreamTopicsResponse>
    getSubscriptions(
      query?: GetSubscriptionsQuery,
    ): Promise<GetSubscriptionsResponse>
    subscribe(query?: SubscribeQuery): Promise<SubscribeResponse>
    updateSubscriptions(
      query?: UpdateSubscriptionsQuery,
    ): Promise<UpdateSubscriptionsResponse>
    unsubscribe(query?: UnsubscribeQuery): Promise<UnsubscribeResponse>
    muteTopic(query?: MuteTopicQuery): Promise<unknown>
    updateUserTopic(query?: UpdateUserTopicQuery): Promise<unknown>
    muteUser(param: MuteUserParam): Promise<unknown>
    unmuteUser(param: UnmuteUserParam): Promise<unknown>
    getSubscriptionStatus(
      param: GetSubscriptionStatusParam,
    ): Promise<GetSubscriptionStatusResponse>
    uploadCustomEmoji(param: UploadCustomEmojiParam): Promise<unknown>
    deactivateCustomEmoji(param: DeactivateCustomEmojiParam): Promise<unknown>
    getCustomEmoji(): Promise<GetCustomEmojiResponse>
    getPresence(): Promise<GetPresenceResponse>
    getCustomProfileFields(): Promise<GetCustomProfileFieldsResponse>
    reorderCustomProfileFields(
      query?: ReorderCustomProfileFieldsQuery,
    ): Promise<unknown>
    createCustomProfileField(
      query?: CreateCustomProfileFieldQuery,
    ): Promise<CreateCustomProfileFieldResponse>
    updateRealmUserSettingsDefaults(
      query?: UpdateRealmUserSettingsDefaultsQuery,
    ): Promise<unknown>
    updateSubscriptionSettings(
      query?: UpdateSubscriptionSettingsQuery,
    ): Promise<unknown>
    getUserByEmail(
      param: GetUserByEmailParam,
      query?: GetUserByEmailQuery,
    ): Promise<GetUserByEmailResponse>
    getUser(
      param: GetUserParam,
      query?: GetUserQuery,
    ): Promise<GetUserResponse>
    updateUser(
      param: UpdateUserParam,
      query?: UpdateUserQuery,
    ): Promise<unknown>
    deactivateUser(
      param: DeactivateUserParam,
      query?: DeactivateUserQuery,
    ): Promise<unknown>
    getLinkifiers(): Promise<GetLinkifiersResponse>
    reorderLinkifiers(query?: ReorderLinkifiersQuery): Promise<unknown>
    addLinkifier(query?: AddLinkifierQuery): Promise<AddLinkifierResponse>
    removeLinkifier(param: RemoveLinkifierParam): Promise<unknown>
    updateLinkifier(
      param: UpdateLinkifierParam,
      query?: UpdateLinkifierQuery,
    ): Promise<unknown>
    addCodePlayground(
      query?: AddCodePlaygroundQuery,
    ): Promise<AddCodePlaygroundResponse>
    removeCodePlayground(param: RemoveCodePlaygroundParam): Promise<unknown>
    registerQueue(query?: RegisterQueueQuery): Promise<RegisterQueueResponse>
    getServerSettings(): Promise<GetServerSettingsResponse>
    updateSettings(query?: UpdateSettingsQuery): Promise<unknown>
    getSubscribers(param: GetSubscribersParam): Promise<GetSubscribersResponse>
    getStreams(query?: GetStreamsQuery): Promise<GetStreamsResponse>
    getStreamById(param: GetStreamByIdParam): Promise<GetStreamByIdResponse>
    archiveStream(param: ArchiveStreamParam): Promise<unknown>
    updateStream(
      param: UpdateStreamParam,
      query?: UpdateStreamQuery,
    ): Promise<unknown>
    deleteTopic(
      param: DeleteTopicParam,
      query?: DeleteTopicQuery,
    ): Promise<DeleteTopicResponse>
    setTypingStatus(query?: SetTypingStatusQuery): Promise<unknown>
    createUserGroup(query?: CreateUserGroupQuery): Promise<unknown>
    updateUserGroupMembers(
      param: UpdateUserGroupMembersParam,
      query?: UpdateUserGroupMembersQuery,
    ): Promise<unknown>
    getUserGroupMembers(
      param: GetUserGroupMembersParam,
      query?: GetUserGroupMembersQuery,
    ): Promise<GetUserGroupMembersResponse>
    updateUserGroup(
      param: UpdateUserGroupParam,
      query?: UpdateUserGroupQuery,
    ): Promise<unknown>
    removeUserGroup(param: RemoveUserGroupParam): Promise<unknown>
    getUserGroups(): Promise<GetUserGroupsResponse>
    updateUserGroupSubgroups(
      param: UpdateUserGroupSubgroupsParam,
      query?: UpdateUserGroupSubgroupsQuery,
    ): Promise<unknown>
    getUserGroupSubgroups(
      param: GetUserGroupSubgroupsParam,
      query?: GetUserGroupSubgroupsQuery,
    ): Promise<GetUserGroupSubgroupsResponse>
    getIsUserGroupMember(
      param: GetIsUserGroupMemberParam,
      query?: GetIsUserGroupMemberQuery,
    ): Promise<GetIsUserGroupMemberResponse>
    zulipOutgoingWebhooks(): Promise<ZulipOutgoingWebhooksResponse>
    createBigBlueButtonVideoCall(
      query?: CreateBigBlueButtonVideoCallQuery,
    ): Promise<CreateBigBlueButtonVideoCallResponse>
  }
}
