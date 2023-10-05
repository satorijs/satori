import Element from '@satorijs/element'
import { Dict } from 'cosmokit'

export interface SendOptions {
  linkPreview?: boolean
}

export interface Field {
  name: string
}

function Field(name: string): Field {
  return { name }
}

export interface Method {
  name: string
  fields: Field[]
}

function Method(name: string, fields: string[]): Method {
  return { name, fields: fields.map(Field) }
}

export const Methods: Dict<Method> = {
  'channel.get': Method('getChannel', ['channel_id', 'guild_id']),
  'channel.list': Method('getChannelList', ['guild_id', 'next']),
  'channel.create': Method('createChannel', ['guild_id', 'data']),
  'channel.update': Method('updateChannel', ['channel_id', 'data']),
  'channel.delete': Method('deleteChannel', ['channel_id']),
  'channel.mute': Method('muteChannel', ['channel_id', 'guild_id', 'enable']),

  'message.create': Method('sendMessage', ['channel_id', 'content']),
  'message.update': Method('editMessage', ['channel_id', 'message_id', 'content']),
  'message.delete': Method('deleteMessage', ['channel_id', 'message_id']),
  'message.get': Method('getMessage', ['channel_id', 'message_id']),
  'message.list': Method('getMessageList', ['channel_id', 'next']),

  'reaction.create': Method('createReaction', ['channel_id', 'message_id', 'emoji']),
  'reaction.delete': Method('deleteReaction', ['channel_id', 'message_id', 'emoji', 'user_id']),
  'reaction.clear': Method('clearReaction', ['channel_id', 'message_id', 'emoji']),
  'reaction.list': Method('getReactionList', ['channel_id', 'message_id', 'emoji', 'next']),

  'guild.get': Method('getGuild', ['guild_id']),
  'guild.list': Method('getGuildList', ['next']),

  'guild.member.get': Method('getGuildMember', ['guild_id', 'user_id']),
  'guild.member.list': Method('getGuildMemberList', ['guild_id', 'next']),
  'guild.member.kick': Method('kickGuildMember', ['guild_id', 'user_id', 'permanent']),
  'guild.member.mute': Method('muteGuildMember', ['guild_id', 'user_id', 'duration', 'reason']),
  'guild.member.role.set': Method('setGuildMemberRole', ['guild_id', 'user_id', 'role_id']),
  'guild.member.role.unset': Method('unsetGuildMemberRole', ['guild_id', 'user_id', 'role_id']),

  'guild.role.list': Method('getGuildRoleList', ['guild_id', 'next']),
  'guild.role.create': Method('createGuildRole', ['guild_id', 'data']),
  'guild.role.update': Method('updateGuildRole', ['guild_id', 'role_id', 'data']),
  'guild.role.delete': Method('deleteGuildRole', ['guild_id', 'role_id']),

  'login.get': Method('getLogin', []),
  'user.get': Method('getUser', ['user_id']),
  'user.channel.create': Method('createDirectChannel', ['user_id', 'guild_id']),
  'friend.list': Method('getFriendList', ['next']),
  'friend.delete': Method('deleteFriend', ['user_id']),

  'friend.approve': Method('handleFriendRequest', ['message_id', 'approve', 'comment']),
  'guild.approve': Method('handleGuildRequest', ['message_id', 'approve', 'comment']),
  'guild.member.approve': Method('handleGuildMemberRequest', ['message_id', 'approve', 'comment']),
}

export interface List<T> {
  data: T[]
  next?: string
}

export interface Methods {
  // message
  sendMessage(channelId: string, content: Element.Fragment, guildId?: string, options?: SendOptions): Promise<string[]>
  sendPrivateMessage(userId: string, content: Element.Fragment, options?: SendOptions): Promise<string[]>
  getMessage(channelId: string, messageId: string): Promise<Message>
  getMessageList(channelId: string, next?: string): Promise<List<Message>>
  getMessageIter(channelId: string): AsyncIterable<Message>
  editMessage(channelId: string, messageId: string, content: Element.Fragment): Promise<void>
  deleteMessage(channelId: string, messageId: string): Promise<void>

  // reaction
  createReaction(channelId: string, messageId: string, emoji: string): Promise<void>
  deleteReaction(channelId: string, messageId: string, emoji: string, userId?: string): Promise<void>
  clearReaction(channelId: string, messageId: string, emoji?: string): Promise<void>
  getReactionList(channelId: string, messageId: string, emoji: string, next?: string): Promise<List<User>>
  getReactionIter(channelId: string, messageId: string, emoji: string): AsyncIterable<User>

  // user
  getLogin(): Promise<Login>
  getUser(userId: string, guildId?: string): Promise<User>
  getFriendList(next?: string): Promise<List<User>>
  getFriendIter(): AsyncIterable<User>
  deleteFriend(userId: string): Promise<void>

  // guild
  getGuild(guildId: string): Promise<Guild>
  getGuildList(next?: string): Promise<List<Guild>>
  getGuildIter(): AsyncIterable<Guild>

  // guild member
  getGuildMember(guildId: string, userId: string): Promise<GuildMember>
  getGuildMemberList(guildId: string, next?: string): Promise<List<GuildMember>>
  getGuildMemberIter(guildId: string): AsyncIterable<GuildMember>
  kickGuildMember(guildId: string, userId: string, permanent?: boolean): Promise<void>
  muteGuildMember(guildId: string, userId: string, duration: number, reason?: string): Promise<void>

  // role
  setGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
  unsetGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
  getGuildRoleList(guildId: string, next?: string): Promise<List<GuildRole>>
  getGuildRoleIter(guildId: string): AsyncIterable<GuildRole>
  createGuildRole(guildId: string, data: Partial<GuildRole>): Promise<GuildRole>
  updateGuildRole(guildId: string, roleId: string, data: Partial<GuildRole>): Promise<void>
  deleteGuildRole(guildId: string, roleId: string): Promise<void>

  // channel
  getChannel(channelId: string, guildId?: string): Promise<Channel>
  getChannelList(guildId: string, next?: string): Promise<List<Channel>>
  getChannelIter(guildId: string): AsyncIterable<Channel>
  createDirectChannel(userId: string, guildId?: string): Promise<Channel>
  createChannel(guildId: string, data: Partial<Channel>): Promise<Channel>
  updateChannel(channelId: string, data: Partial<Channel>): Promise<void>
  deleteChannel(channelId: string): Promise<void>
  muteChannel(channelId: string, guildId?: string, enable?: boolean): Promise<void>

  // request
  handleFriendRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
  handleGuildRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
  handleGuildMemberRequest(messageId: string, approve: boolean, comment?: string): Promise<void>

  // commands
  updateCommands(commands: Command[]): Promise<void>
}

export interface Channel {
  id: string
  type: Channel.Type
  name?: string
  parentId?: string
}

export namespace Channel {
  export const enum Type {
    TEXT = 0,
    DIRECT = 1,
    VOICE = 2,
    CATEGORY = 3,
  }
}

export interface Guild {
  id: string
  name?: string
  avatar?: string
}

export interface GuildRole {
  id: string
  name: string
  color: number
  position: number
  permissions: bigint
  hoist: boolean
  mentionable: boolean
}

export interface User {
  id: string
  name?: string
  /** @deprecated */
  userId?: string
  /** @deprecated */
  username?: string
  /** @deprecated */
  nickname?: string
  avatar?: string
  discriminator?: string
  isBot?: boolean
}

export interface GuildMember {
  user?: User
  name?: string
  avatar?: string
  title?: string
  roles?: string[]
  joinedAt?: number
}

export interface Login {
  user?: User
  platform?: string
  selfId?: string
  status: Status
}

export const enum Status {
  OFFLINE = 0,
  ONLINE = 1,
  CONNECT = 2,
  DISCONNECT = 3,
  RECONNECT = 4,
}

export interface Message {
  id?: string
  /** @deprecated */
  messageId?: string
  channel?: Channel
  guild?: Guild
  user?: User
  member?: GuildMember
  content?: string
  elements?: Element[]
  timestamp?: number
  quote?: Message
  createdAt?: number
  updatedAt?: number
}

export interface Button {
  id: string
}

export interface Command {
  name: string
  aliases: string[]
  description: Dict<string>
  arguments: Command.Argument[]
  options: Command.Option[]
  children: Command[]
}

export namespace Command {
  export interface Argument {
    name: string
    description: Dict<string>
    type: string
    required: boolean
  }

  export interface Option {
    name: string
    description: Dict<string>
    type: string
    required: boolean
  }
}

export interface Argv {
  name: string
  arguments: any[]
  options: Dict
}

type Genres = 'friend' | 'channel' | 'guild' | 'guild-member' | 'guild-role' | 'guild-file' | 'guild-emoji'
type Actions = 'added' | 'deleted' | 'updated'

export type EventName =
  | `${Genres}-${Actions}`
  | 'message'
  | 'message-deleted'
  | 'message-updated'
  | 'message-pinned'
  | 'message-unpinned'
  | 'interaction/command'
  | 'reaction-added'
  | 'reaction-deleted'
  | 'reaction-deleted/one'
  | 'reaction-deleted/all'
  | 'reaction-deleted/emoji'
  | 'send'
  | 'friend-request'
  | 'guild-request'
  | 'guild-member-request'

export interface Event {
  id: number
  type: string
  selfId: string
  platform: string
  timestamp: number
  argv?: Argv
  channel?: Channel
  guild?: Guild
  login?: Login
  member?: GuildMember
  message?: Message
  operator?: User
  role?: GuildRole
  user?: User
  button?: Button
  _type?: string
  _data?: any
  /** @deprecated */
  subtype?: string
  /** @deprecated */
  subsubtype?: string
}

export type MessageLike = Message | Event

export const enum Opcode {
  EVENT = 0,
  PING = 1,
  PONG = 2,
  IDENTIFY = 3,
  READY = 4,
}

export interface GatewayPayloadStructure<O extends Opcode> {
  op: O
  body: GatewayBody[O]
}

export type ServerPayload = {
  [O in Opcode]: GatewayPayloadStructure<O>
}[Opcode.EVENT | Opcode.PONG | Opcode.READY]

export type ClientPayload = {
  [O in Opcode]: GatewayPayloadStructure<O>
}[Opcode.PING | Opcode.IDENTIFY]

export interface GatewayBody {
  [Opcode.EVENT]: Event
  [Opcode.PING]: {}
  [Opcode.PONG]: {}
  [Opcode.IDENTIFY]: {
    token?: string
    sequence?: number
  }
  [Opcode.READY]: {
    logins: Login[]
  }
}

export namespace WebSocket {
  /** The connection is not yet open. */
  export const CONNECTING = 0
  /** The connection is open and ready to communicate. */
  export const OPEN = 1
  /** The connection is in the process of closing. */
  export const CLOSING = 2
  /** The connection is closed. */
  export const CLOSED = 3

  export type ReadyState =
    | typeof CONNECTING
    | typeof OPEN
    | typeof CLOSING
    | typeof CLOSED

  export interface EventMap {
    open: Event
    error: Event
    message: MessageEvent
    close: CloseEvent
  }

  export interface EventListener {
    (event: Event): void
  }

  export interface Event {
    type: string
    target: WebSocket
  }

  export interface CloseEvent extends Event {
    code: number
    reason: string
  }

  export interface MessageEvent extends Event {
    data: string
  }
}

export interface WebSocket {
  readonly url?: string
  readonly protocol?: string
  readonly readyState?: WebSocket.ReadyState
  close(code?: number, reason?: string): void
  send(data: string): void
  dispatchEvent?(event: any): boolean
  addEventListener<K extends keyof WebSocket.EventMap>(type: K, listener: (event: WebSocket.EventMap[K]) => void): void
  removeEventListener<K extends keyof WebSocket.EventMap>(type: K, listener: (event: WebSocket.EventMap[K]) => void): void
}
