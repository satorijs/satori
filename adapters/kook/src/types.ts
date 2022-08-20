export enum Signal {
  event,
  hello,
  ping,
  pong,
  reconnect,
  resume,
}

export interface Payload {
  s: Signal
  sn?: number
  d: Data
}

export enum Type {
  text = 1,
  image = 2,
  video = 3,
  file = 4,
  unknown = 7,
  audio = 8,
  kmarkdown = 9,
  card = 10,
  system = 255,
}

export interface MessageParams {
  type: Type
  msg_id: string
  chat_code: string
  target_id: string
  content: any
  quote: string
  nonce: string
}

export interface MessageBase {
  type: Type
  content: string
  extra: MessageExtra | Notice
}

export interface Data extends MessageBase {
  channel_type: 'GROUP' | 'PERSON' | 'WEBHOOK_CHALLENGE'
  challenge: string
  verify_token: string
  target_id: string
  author_id: string
  msg_id: string
  msg_timestamp: number
  nonce: string
}

type AttachmentType = 'image' | 'video' | 'audio' | 'file'
type NoticeType =
  | 'message_btn_click'
  | 'added_reaction' | 'deleted_reaction'
  | 'updated_message' | 'deleted_message'
  | 'joined_guild' | 'exited_guild'
  | 'updated_guild_member'
  | 'added_channel' | 'updated_channel' | 'deleted_channel'
  | 'updated_private_message' | 'deleted_private_message'
  | 'private_added_reaction' | 'private_deleted_reaction'
  | 'joined_channel' | 'exited_channel'
  | 'guild_member_online' | 'guild_member_offline'

export interface MessageMeta {
  mention: string[]
  mention_all: boolean
  mention_roles: string[]
  mention_here: boolean
  attachments: Attachment
  quote: Message
  author: Author
  kmarkdown?: {
    raw_content: string
    mention_part: KmarkdownUserMeta[]
    mention_role_part: KmarkdownRoleMeta[]
  }
}

export interface KmarkdownUserMeta {
  id: string
  username: string
  full_name: string
  avatar: string
}

export interface KmarkdownRoleMeta {
  role_id: number
  name: string
  color: number
}

export interface MessageExtra extends MessageMeta {
  type: Type
  code: string
  guild_id: string
  channel_name: string
}

export interface Message extends MessageBase, MessageMeta {
  id: string
  embeds: any[]
  reactions: any[]
  mention_info: object
}

export interface Card {
  type: 'card'
  theme?: Card.Theme
  size?: 'lg' | 'sm'
  color?: string
  modules: Card.Module[]
}

export namespace Card {
  export type Theme = 'primary' | 'secondary' | 'warning' | 'danger' | 'info'
  export type Module = Section | ImageGroup | Header | Divider | File | Countdown | Context

  export interface Text {
    type: 'plain-text' | 'kmarkdown'
    content: string
    emoji?: boolean
  }

  export interface Paragraph {
    type: 'paragraph'
    content: string
    cols: number
    fields: Text[]
  }

  export interface Section {
    type: 'section'
    mode?: 'left' | 'right'
    text: Text | Paragraph
    accessory?: Image | Button
  }

  export interface Image {
    type: 'image'
    size?: 'lg' | 'sm'
    src: string
    alt?: string
    circle?: boolean
  }

  export interface Button {
    type: 'button'
    theme?: Theme
    value: string
    text: Text
    click?: string
  }

  export interface ImageGroup {
    type: 'image-group'
    elements: Image[]
  }

  export interface Header {
    type: 'header'
    text: Text
  }

  export interface Divider {
    type: 'divider'
  }

  export interface ActionGroup {
    type: 'action-group'
    elements: Button[]
  }

  export interface Context {
    type: 'context'
    elements: (Text | Image)[]
  }

  export interface File {
    type: 'file' | 'audio' | 'video'
    src: string
    title: string
    cover?: string
  }

  export interface Countdown {
    type: 'countdown'
    end_time: string
    start_time: string
    mode: 'day' | 'hour' | 'second'
  }
}

export interface User {
  id: string
  username: string
  identify_num: string
  avatar: string
  online: boolean
  bot?: boolean
}

export enum UserStatus {
  normal = 0,
  banned = 10,
}

export interface Self extends User {
  status: UserStatus
  mobile_verified: boolean
  system: boolean
  mobile_prefix: string
  mobile: string
  invited_count: number
}

export interface Author extends User {
  roles: number[]
  nickname?: string
}

export interface Attachment {
  type: AttachmentType
  name: string
  url: string
  file_type: string
  size: number
  duration: number
  width: number
  height: number
}

export interface Notice {
  type: NoticeType
  body: NoticeBody
}

export interface Channel {
  id: string
  name: string
  user_id: string
  guild_id: string
  isCategory: number
  parentId: string
  topic: string
  type: number
  level: number
  slow_mode: number
  permission_overwrites: Overwrite
  permission_users: any
  permission_sync: 0 | 1
}

export interface NoticeBody extends Channel, MessageMeta {
  value: string
  msg_id: string
  target_id: string
  channel_id: string
  emoji: Emoji
  content: string
  icon: string
  notify_type: number
  region: string
  enable_open: number
  openId: number
  default_channel_id: string
  welcome_channel_id: string
  updated_at: number
  joined_at: number
  exited_at: number
  deleted_at: number
  nickname: string
  chat_code: string
  event_time: number
  guilds: string[]
}

export interface Emoji {
  id: string
  name: string
}

export interface Overwrite {
  role_id: number
  allow: number
  deny: number
}

export interface ListMeta {
  page: number
  page_total: number
  page_size: number
  total: number
}

export interface List<T> {
  items: T[]
  meta: ListMeta
  sort: Partial<Record<keyof T, number>>
}

export interface Guild {
  id: string
  name: string
  topic: string
  master_id: string
  is_master: boolean
  icon: string
  invite_enabled: number
  notify_type: number
  region: string
  enable_open: number
  openId: string
  default_channel_id: string
  welcome_channel_id: string
}

export interface GuildList extends List<Guild> {}

export interface GuildMember extends User {
  joined_at: number
  active_time: number
  roles: number[]
  is_master: boolean
  abbr: string
}

export interface GuildMemberList extends List<GuildMember> {
  user_count: number
  online_count: number
  offline_count: number
}
