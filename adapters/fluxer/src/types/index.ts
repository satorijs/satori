import type { components } from '../protocol/schema'

export * from '../protocol/gateway'

type Schema = components['schemas']

export namespace Message {
  export enum Type {
    DEFAULT = 0,
    REPLY = 19,
  }
  export enum Flag {
    CROSSPOSTED = 1 << 0,
    IS_CROSSPOST = 1 << 1,
    SUPPRESS_EMBEDS = 1 << 2,
    SOURCE_MESSAGE_DELETED = 1 << 3,
    URGENT = 1 << 4,
  }
  export type Struct = Schema['MessageResponseSchema']
}

export namespace ApplicationCommand {
  export enum OptionType {}
  export enum Type {}
}

export type User = Schema['UserPartialResponse']
export type UserPrivate = Schema['UserPrivateResponse']
export type Message = Schema['MessageResponseSchema'] & { member?: any; thread?: any }
export type MessageRequest = Schema['MessageRequestSchema']
export type Channel = Schema['ChannelResponse']
export type Guild = Schema['GuildResponse']
export type GuildMember = Schema['GuildMemberResponse']
export type GuildRole = Schema['GuildRoleResponse']
export type Role = GuildRole
export type GuildEmoji = Schema['GuildEmojiResponse']
export type Attachment = Schema['MessageAttachmentResponse']
export type Embed = Schema['MessageEmbedResponse']
export type Reaction = Schema['MessageReactionResponse']
export type ThreadChannel = Schema['ThreadChannelResponse']
export type Webhook = Schema['WebhookResponse']

export type snowflake = string
export type timestamp = string
export type integer = number

/** Fluxer has no message components; kept as no-op shapes for the encoder's call sites. */
export enum ComponentType {
  ACTION_ROW = 1,
  BUTTON = 2,
}

export enum ButtonStyles {
  PRIMARY = 1,
  SECONDARY = 2,
  SUCCESS = 3,
  DANGER = 4,
  LINK = 5,
}

export interface Button {
  type: ComponentType.BUTTON
  style: ButtonStyles
  label?: string
  url?: string
  custom_id?: string
  disabled?: boolean
}

export interface ActionRow {
  type: ComponentType.ACTION_ROW
  components: Button[]
}

export interface GatewayEvents {
  READY: any
  RESUMED: any
  MESSAGE_CREATE: any
  MESSAGE_UPDATE: any
  MESSAGE_DELETE: any
  MESSAGE_DELETE_BULK: any
  MESSAGE_REACTION_ADD: any
  MESSAGE_REACTION_REMOVE: any
  MESSAGE_REACTION_REMOVE_ALL: any
  MESSAGE_REACTION_REMOVE_EMOJI: any
  GUILD_CREATE: any
  GUILD_UPDATE: any
  GUILD_DELETE: any
  CHANNEL_CREATE: any
  CHANNEL_UPDATE: any
  CHANNEL_DELETE: any
  GUILD_MEMBER_ADD: any
  GUILD_MEMBER_REMOVE: any
  GUILD_MEMBER_UPDATE: any
  GUILD_ROLE_CREATE: any
  GUILD_ROLE_UPDATE: any
  GUILD_ROLE_DELETE: any
  CHANNEL_PINS_UPDATE: any
  THREAD_CREATE: any
  THREAD_UPDATE: any
  THREAD_DELETE: any
  TYPING_START: any
  SESSIONS_REPLACE: any
  [key: string]: any
}
