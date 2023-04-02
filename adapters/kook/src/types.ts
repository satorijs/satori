import { Quester } from '@satorijs/satori'

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
}

export interface Data<E = any> extends MessageBase {
  channel_type: 'GROUP' | 'PERSON' | 'WEBHOOK_CHALLENGE'
  challenge: string
  verify_token: string
  target_id: string
  author_id: string
  msg_id: string
  msg_timestamp: number
  nonce: string
  extra: E
}

type AttachmentType = 'image' | 'video' | 'audio' | 'file'
type NoticeType =
  | 'user_updated'
  | 'message_btn_click'
  | 'added_reaction' | 'deleted_reaction'
  | 'updated_message' | 'deleted_message'
  | 'pinned_message' | 'unpinned_message'
  | 'joined_guild' | 'exited_guild' | 'updated_guild_member'
  | 'updated_guild' | 'deleted_guild'
  | 'self_joined_guild' | 'self_exited_guild'
  | 'added_role' | 'deleted_role' | 'updated_role'
  | 'added_block_list' | 'deleted_block_list'
  | 'added_emoji' | 'updated_emoji'
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

export interface PrivateChat {
  code: string
  last_read_time: number
  latest_msg_time: number
  unread_count: number
  is_friend: boolean
  is_blocked: boolean
  is_target_blocked: boolean
  target_info: PrivateChatUserMeta
}

export interface PrivateChatUserMeta {
  id: string
  username: string
  online: boolean
  avatar: string
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
  rong_id?: string
  embeds: any[]
  reactions: any[]
  mention_info: object
  extra: MessageExtra | Notice
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
  is_category: number
  parent_id: string
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
  operator_id: string
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

export interface GuildUser extends User {
  joined_at: number
  active_time: number
  roles: number[]
  is_master: boolean
  abbr: string
}

export interface GuildUserList extends List<GuildUser> {
  user_count: number
  online_count: number
  offline_count: number
}

interface Pagination {
  page?: number
  page_size?: number
  sort?: string[]
}

interface GuildMute {
  type: GuildMute.Type
  user_ids: string[]
}

namespace GuildMute {
  export enum Type {
    mic = 1,
    headset = 2,
  }
}

interface GuildMuteList {
  mic: GuildMute
  headset: GuildMute
}

interface GuildBoost {
  user_id: string
  guild_id: string
  start_time: number
  end_time: number
  user: User
}

export interface Internal {
  getGuildList(param?: Pagination): Promise<List<Guild>>
  getGuildView(param: { guild_id: string }): Promise<Guild>
  getGuildUserList(param: { guild_id: string } & Pagination): Promise<GuildUserList>
  setGuildUserNickname(param: { guild_id: string; user_id: string; nickname: string }): Promise<void>
  leaveGuild(param: { guild_id: string }): Promise<void>
  kickoutGuildUser(param: { guild_id: string; target_id: string }): Promise<void>
  getGuildMuteList(param: { guild_id: string }): Promise<GuildMuteList>
  createGuildMute(param: { guild_id: string; user_id: string; type: GuildMute.Type }): Promise<void>
  deleteGuildMute(param: { guild_id: string; user_id: string; type: GuildMute.Type }): Promise<void>
  getGuildBoostHistory(param: { guild_id: string; start_time: number; end_time: number }): Promise<List<GuildBoost>>

  getChannelList(param: { guild_id: string } & Pagination): Promise<List<Channel>>
  getChannelView(param: { target_id: string }): Promise<Channel>
  createChannel(param: {
    guild_id: string
    parent_id?: string
    name: string
    type?: number
    limit_amount?: number
    voice_quality?: string
    is_category?: 0|1
  }): Promise<Channel>
  updateChannel(param: {
    channel_id: string
    name?: string
    topic?: string
    slow_mode?: 0|5000|10000|15000|30000|60000|120000|300000|600000|900000|1800000|3600000|7200000|21600000
  }): Promise<Channel>
  deleteChannel(param: { channel_id: string }): Promise<void>
  getChannelUserList(param: { channel_id: string }): Promise<List<User>>
  moveChannelUser(param: { target_id: string; user_ids: [] }): Promise<void>
  getChannelRoleIndex(param: { channel_id: string }): Promise<{ permission_overwrites: Overwrite; permission_users: List<User>; permission_sync: 0 | 1 }>
  createChannelRole(param: { channel_id: string; type?: 'user_id'; value?: string }): Promise<{
    user_id: string
    allow: number
    deny: number
  }>
  createChannelRole(param: { channel_id: string; type: 'role_id'; value?: string }): Promise<{
    role_id: string
    allow: number
    deny: number
  }>
  updateChannelRole(param: { channel_id: string; type?: 'user_id'; value?: string; allow?: number; deny?: number }): Promise<{
    user_id: string
    allow: number
    deny: number
  }>
  updateChannelRole(param: { channel_id: string; type: 'role_id'; value?: string; allow?: number; deny?: number }): Promise<{
    role_id: string
    allow: number
    deny: number
  }>
  deleteChannelRole(param: { channel_id: string; type?: 'role_id' | 'user_id'; value?: string }): Promise<void>

  getMessageList(param: { target_id: string; msg_id?: string; pin?: 0 | 1; flag?: 'before' | 'around' | 'after' } & Pagination): Promise<List<Message>>
  getMessageView(param: { msg_id: string }): Promise<Message>
  createMessage(param: { type?: Type; target_id: string; content: string; quote?: string; nonce?: string; temp_target_id: string }): Promise<{
    msg_id: string
    msg_timestamp: number
    nonce: string
  }>
  updateMessage(param: { msg_id: string; content: string; quote?: string; temp_target_id: string }): Promise<void>
  deleteMessage(param: { msg_id: string }): Promise<void>
  getMessageReactionList(param: { msg_id: string; emoji: string }): Promise<User[]>
  addMessageReaction(param: { msg_id: string; emoji: string }): Promise<void>
  deleteMessageReaction(param: { msg_id: string; emoji: string; user_id?: string}): Promise<void>

  getChannelJoinedUserList(param: { guild_id: string; user_id: string } & Pagination): Promise<List<Channel>>

  getPrivateChatList(param?: Pagination): Promise<List<Omit<PrivateChat, 'is_friend' | 'is_blocked' | 'is_target_blocked'>>>
  getPrivateChatView(param: { chat_code: string }): Promise<PrivateChat>
  createPrivateChat(param: { target_id: string }): Promise<PrivateChat>
  deletePrivateChat(param: { chat_code: string }): Promise<void>
}

export class Internal {
  constructor(private http: Quester) {}

  static define(name: string, method: Quester.Method, path: string) {
    Internal.prototype[name] = async function (this: Internal, ...args: any[]) {
      const config: Quester.AxiosRequestConfig = {}
      if (method === 'GET' || method === 'DELETE') {
        config.params = args[0]
      } else {
        config.data = args[0]
      }
      return (await this.http(method, path, config))?.data
    }
  }
}

Internal.define('getGuildList', 'GET', '/guild/list')
Internal.define('getGuildView', 'GET', '/guild/view')
Internal.define('getGuildUserList', 'GET', '/guild/user-list')
Internal.define('setGuildUserNickname', 'POST', '/guild/nickname')
Internal.define('leaveGuild', 'POST', '/guild/leave')
Internal.define('kickoutGuildUser', 'POST', '/guild/kickout')
Internal.define('getGuildMuteList', 'GET', '/guild-mute/list')
Internal.define('createGuildMute', 'POST', '/guild-mute/create')
Internal.define('deleteGuildMute', 'POST', '/guild-mute/delete')
Internal.define('getGuildBoostHistory', 'GET', '/guild-boost/history')

Internal.define('getChannelList', 'GET', '/channel/list')
Internal.define('getChannelView', 'GET', '/channel/view')
Internal.define('createChannel', 'POST', '/channel/create')
Internal.define('updateChannel', 'POST', '/channel/update')
Internal.define('deleteChannel', 'POST', '/channel/delete')
Internal.define('getChannelUserList', 'GET', '/channel/user-list')
Internal.define('moveChannelUser', 'POST', '/channel/move-user')
Internal.define('getChannelRoleIndex', 'GET', '/channel-role/index')
Internal.define('createChannelRole', 'POST', '/channel-role/create')
Internal.define('updateChannelRole', 'POST', '/channel-role/update')
Internal.define('deleteChannelRole', 'POST', '/channel-role/delete')

Internal.define('getMessageList', 'GET', '/message/list')
Internal.define('getMessageView', 'GET', '/message/view')
Internal.define('createMessage', 'POST', '/message/create')
Internal.define('updateMessage', 'POST', '/message/update')
Internal.define('deleteMessage', 'POST', '/message/delete')
Internal.define('getMessageReactionList', 'GET', '/message/reaction-list')
Internal.define('addMessageReaction', 'POST', '/message/add-reaction')
Internal.define('deleteMessageReaction', 'POST', '/message/delete-reaction')

Internal.define('getChannelJoinedUserList', 'GET', '/channel-user/get-joined-channel')

Internal.define('getPrivateChatList', 'GET', '/user-chat/list')
Internal.define('getPrivateChatView', 'GET', '/user-chat/view')
Internal.define('createPrivateChat', 'POST', '/user-chat/create')
Internal.define('deletePrivateChat', 'POST', '/user-chat/delete')

Internal.define('getDirectMessageList', 'GET', '/direct-message/list')
Internal.define('getDirectMessageView', 'GET', '/direct-message/view')
Internal.define('createDirectMessage', 'POST', '/direct-message/create')
Internal.define('updateDirectMessage', 'POST', '/direct-message/update')
Internal.define('deleteDirectMessage', 'POST', '/direct-message/delete')
Internal.define('getDirectMessageReactionList', 'GET', '/direct-message/reaction-list')
Internal.define('addDirectMessageReaction', 'POST', '/direct-message/add-reaction')
Internal.define('deleteDirectMessageReaction', 'POST', '/direct-message/delete-reaction')

Internal.define('getGateway', 'GET', '/gateway/index')
Internal.define('getToken', 'POST', '/oauth2/token')
Internal.define('createAsset', 'POST', '/asset/create')

Internal.define('getUserMe', 'GET', '/user/me')
Internal.define('getUserView', 'GET', '/user/view')
Internal.define('offline', 'POST', '/user/offline')

Internal.define('createGuildRole', 'POST', '/guild-role/create')
Internal.define('updateGuildRole', 'POST', '/guild-role/update')
Internal.define('deleteGuildRole', 'POST', '/guild-role/delete')
Internal.define('grantGuildRole', 'POST', '/guild-role/grant')
Internal.define('revokeGuildRole', 'POST', '/guild-role/revoke')

Internal.define('getIntimacy', 'GET', '/intimacy/index')
Internal.define('updateIntimacy', 'POST', '/intimacy/update')

Internal.define('getGuildEmojiList', 'GET', '/guild-emoji/list')
Internal.define('createGuildEmoji', 'POST', '/guild-emoji/create')
Internal.define('updateGuildEmoji', 'POST', '/guild-emoji/update')
Internal.define('deleteGuildEmoji', 'POST', '/guild-emoji/delete')

Internal.define('getInviteList', 'GET', '/invite/list')
Internal.define('createInvite', 'POST', '/invite/create')
Internal.define('deleteInvite', 'POST', '/invite/delete')

Internal.define('getBlacklist', 'GET', '/blacklist/list')
Internal.define('createBlacklist', 'POST', '/blacklist/create')
Internal.define('deleteBlacklist', 'POST', '/blacklist/delete')

Internal.define('getGuildBadge', 'GET', '/badge/guild')
Internal.define('getGameList', 'GET', '/game')
Internal.define('createGame', 'POST', '/game/create')
Internal.define('updateGame', 'POST', '/game/update')
Internal.define('deleteGame', 'POST', '/game/delete')
Internal.define('createGameActivity', 'POST', '/game/activity')
Internal.define('deleteGameActivity', 'POST', '/game/delete-activity')
