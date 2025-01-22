import Element from '@satorijs/element'
import { Dict, isNullable, pick } from 'cosmokit'

type PartialWithPick<T, K extends keyof T> = Partial<T> & Pick<T, K>

export interface SendOptions {
  linkPreview?: boolean
}

export interface Upload {
  type: string
  filename?: string
  data: ArrayBuffer
}

export interface Response {
  status: number
  statusText?: string
  body?: ArrayBuffer
  headers?: Headers
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
  isForm: boolean
}

function Method(name: string, fields: string[], isForm = false): Method {
  return { name, fields: fields.map(Field), isForm }
}

export const Methods: Dict<Method> = {
  'channel.get': Method('getChannel', ['channel_id', 'guild_id']),
  'channel.list': Method('getChannelList', ['guild_id', 'next']),
  'channel.create': Method('createChannel', ['guild_id', 'data']),
  'channel.update': Method('updateChannel', ['channel_id', 'data']),
  'channel.delete': Method('deleteChannel', ['channel_id']),
  'channel.mute': Method('muteChannel', ['channel_id', 'guild_id', 'enable']),

  'message.create': Method('createMessage', ['channel_id', 'content', 'referrer']),
  'message.update': Method('editMessage', ['channel_id', 'message_id', 'content']),
  'message.delete': Method('deleteMessage', ['channel_id', 'message_id']),
  'message.get': Method('getMessage', ['channel_id', 'message_id']),
  'message.list': Method('getMessageList', ['channel_id', 'next', 'direction', 'limit', 'order']),

  'reaction.create': Method('createReaction', ['channel_id', 'message_id', 'emoji']),
  'reaction.delete': Method('deleteReaction', ['channel_id', 'message_id', 'emoji', 'user_id']),
  'reaction.clear': Method('clearReaction', ['channel_id', 'message_id', 'emoji']),
  'reaction.list': Method('getReactionList', ['channel_id', 'message_id', 'emoji', 'next']),

  'upload.create': Method('createUpload', [], true),

  'guild.get': Method('getGuild', ['guild_id']),
  'guild.list': Method('getGuildList', ['next']),

  'guild.member.get': Method('getGuildMember', ['guild_id', 'user_id']),
  'guild.member.list': Method('getGuildMemberList', ['guild_id', 'next']),
  'guild.member.kick': Method('kickGuildMember', ['guild_id', 'user_id', 'permanent']),
  'guild.member.mute': Method('muteGuildMember', ['guild_id', 'user_id', 'duration', 'reason']),
  'guild.member.role.set': Method('setGuildMemberRole', ['guild_id', 'user_id', 'role_id']),
  'guild.member.role.unset': Method('unsetGuildMemberRole', ['guild_id', 'user_id', 'role_id']),
  'guild.member.role.list': Method('getGuildMemberRoleList', ['guild_id', 'user_id', 'next']),

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

export interface List<T = any> {
  data: T[]
  next?: string
}

export interface BidiList<T = any> {
  data: T[]
  prev?: string
  next?: string
}

export type Direction = 'before' | 'after' | 'around'

export type Order = 'asc' | 'desc'

export interface Methods {
  // message
  createMessage(channelId: string, content: Element.Fragment, referrer?: any, options?: SendOptions): Promise<Message[]>
  sendMessage(channelId: string, content: Element.Fragment, referrer?: any, options?: SendOptions): Promise<string[]>
  sendPrivateMessage(userId: string, content: Element.Fragment, guildId?: string, options?: SendOptions): Promise<string[]>
  getMessage(channelId: string, messageId: string): Promise<Message>
  getMessageList(channelId: string, next?: string, direction?: Direction, limit?: number, order?: Order): Promise<BidiList<Message>>
  getMessageIter(channelId: string): AsyncIterable<Message>
  editMessage(channelId: string, messageId: string, content: Element.Fragment): Promise<void>
  deleteMessage(channelId: string, messageId: string): Promise<void>

  // reaction
  createReaction(channelId: string, messageId: string, emoji: string): Promise<void>
  deleteReaction(channelId: string, messageId: string, emoji: string, userId?: string): Promise<void>
  clearReaction(channelId: string, messageId: string, emoji?: string): Promise<void>
  getReactionList(channelId: string, messageId: string, emoji: string, next?: string): Promise<List<User>>
  getReactionIter(channelId: string, messageId: string, emoji: string): AsyncIterable<User>

  // upload
  createUpload(...uploads: Upload[]): Promise<string[]>

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
  setGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
  unsetGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
  getGuildMemberRoleList(guildId: string, userId: string, next?: string): Promise<List<PartialWithPick<GuildRole, 'id'>>>

  // role
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
  position?: number
}

export namespace Channel {
  export const enum Type {
    TEXT = 0,
    DIRECT = 1,
    CATEGORY = 2,
    VOICE = 3,
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
  nick?: string
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

export interface Resource<K = any> {
  attrs: (keyof K)[]
  children: (keyof K)[]
  content?: keyof K
}

export function Resource<K>(attrs: (keyof K)[] = [], children: (keyof K)[] = [], content?: keyof K): Resource<K> {
  return { attrs, children, content }
}

export namespace Resource {
  export interface Definitions {
    user: User
    member: GuildMember
    channel: Channel
    guild: Guild
    quote: Message
  }

  const Definitions: { [K in keyof Definitions]: Resource<Definitions[K]> } = {
    user: Resource(['id', 'name', 'nick', 'avatar', 'isBot']),
    member: Resource(['name', 'nick', 'avatar']),
    channel: Resource(['id', 'type', 'name']),
    guild: Resource(['id', 'name', 'avatar']),
    quote: Resource(['id'], ['quote', 'user', 'member', 'channel'], 'content'),
  }

  export function encode<K extends keyof Definitions>(type: K, data: Definitions[K]) {
    const resource = Definitions[type]
    const element = Element(type, pick(data, resource.attrs as any))
    for (const key of resource.children) {
      if (isNullable(data[key])) continue
      element.children.push(encode(key as any, data[key]))
    }
    if (resource.content && !isNullable(data[resource.content])) {
      element.children.push(...Element.parse(data[resource.content] as string))
    }
    return element
  }

  export function decode(element: Element) {
    const data: any = element.attrs
    const resource = Definitions[element.type]
    for (const key of resource.children) {
      const index = element.children.findIndex((el) => el.type === key)
      if (index === -1) continue
      const [child] = element.children.splice(index, 1)
      data[key] = decode(child)
    }
    if (resource.content && element.children.length) {
      data[resource.content] = element.children.join('')
    }
    return data
  }
}

export function transformKey(source: any, callback: (key: string) => string) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(value => transformKey(value, callback))
  return Object.fromEntries(Object.entries(source).map(([key, value]) => {
    if (key.startsWith('_') || key === 'referrer') return [key, value]
    return [callback(key), transformKey(value, callback)]
  }))
}

export interface GuildMember {
  user?: User
  name?: string
  nick?: string
  avatar?: string
  title?: string
  roles?: string[]
  joinedAt?: number
}

export interface Login {
  sn: number
  adapter: string
  user?: User
  platform?: string
  /** @deprecated use `login.user.id` instead */
  selfId?: string
  hidden?: boolean
  status: Status
  features: string[]
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
  description: Dict<string>
  arguments: Command.Declaration[]
  options: Command.Declaration[]
  children: Command[]
}

export namespace Command {
  export interface Declaration {
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
  sn: number
  type: string
  login: Login
  selfId: string
  platform: string
  timestamp: number
  argv?: Argv
  channel?: Channel
  guild?: Guild
  member?: GuildMember
  message?: Message
  operator?: User
  role?: GuildRole
  user?: User
  button?: Button
  referrer: any
  _type?: string
  _data?: any
  /** @deprecated */
  subtype?: string
  /** @deprecated */
  subsubtype?: string
}

export interface Meta {
  logins: Login[]
  proxyUrls: string[]
}

export type MessageLike = Message | Event

export const enum Opcode {
  EVENT = 0,
  PING = 1,
  PONG = 2,
  IDENTIFY = 3,
  READY = 4,
  META = 5,
}

export interface GatewayPayloadStructure<O extends Opcode> {
  op: O
  body: GatewayBody[O]
}

export type ServerPayload = {
  [O in Opcode]: GatewayPayloadStructure<O>
}[Opcode.EVENT | Opcode.PONG | Opcode.READY | Opcode.META]

export type ClientPayload = {
  [O in Opcode]: GatewayPayloadStructure<O>
}[Opcode.PING | Opcode.IDENTIFY]

export interface GatewayBody {
  [Opcode.EVENT]: Event
  [Opcode.PING]: {}
  [Opcode.PONG]: {}
  [Opcode.IDENTIFY]: {
    token?: string
    sn?: number
  }
  [Opcode.READY]: Meta
  [Opcode.META]: {
    proxyUrls: string[]
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
    error: ErrorEvent
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

  export interface ErrorEvent extends Event {
    message?: string
  }
}

export interface WebSocket {
  readonly url: string
  readonly protocol?: string
  readonly readyState?: number
  close(code?: number, reason?: string): void
  send(data: string): void
  dispatchEvent?(event: any): boolean
  addEventListener<K extends keyof WebSocket.EventMap>(type: K, listener: (event: WebSocket.EventMap[K]) => void): void
  removeEventListener<K extends keyof WebSocket.EventMap>(type: K, listener: (event: WebSocket.EventMap[K]) => void): void
}
