import Element from '@satorijs/element'
import { SendOptions } from './session'
import { Dict } from 'cosmokit'

export namespace Universal {
  export interface Method {
    name: string
    fields: string[]
  }

  function Method(name: string, fields: string[]): Method {
    return { name, fields }
  }

  export const Methods: Dict<Method> = {
    'message.send': Method('sendMessage', ['channelId', 'content', 'guildId', 'options']),
    'message.get': Method('getMessage', ['channelId', 'messageId']),
    'message.list': Method('getMessageList', ['channelId', 'next']),
    'message.update': Method('editMessage', ['channelId', 'messageId']),
    'message.delete': Method('deleteMessage', ['channelId', 'messageId']),
    'reaction.create': Method('createReaction', ['channelId', 'messageId', 'emoji']),
    'reaction.delete': Method('deleteReaction', ['channelId', 'messageId', 'emoji', 'userId']),
    'reaction.clear': Method('clearReaction', ['channelId', 'messageId', 'emoji']),
    'reaction.list': Method('getReactionList', ['channelId', 'messageId', 'emoji', 'next']),
    'guild.get': Method('getGuild', ['guildId']),
    'guild.list': Method('getGuildList', ['next']),
    'guild.member.get': Method('getGuildMember', ['guildId', 'userId']),
    'guild.member.list': Method('getGuildMemberList', ['guildId', 'next']),
    'guild.member.kick': Method('kickGuildMember', ['guildId', 'userId', 'permanent']),
    'guild.member.mute': Method('muteGuildMember', ['guildId', 'userId', 'duration', 'reason']),
    'guild.member.role': Method('setGuildMemberRole', ['guildId', 'userId', 'roleId']),
    'guild.role.list': Method('getGuildRoleList', ['guildId', 'next']),
    'guild.role.create': Method('createGuildRole', ['guildId', 'data']),
    'guild.role.update': Method('modifyGuildRole', ['guildId', 'roleId', 'data']),
    'guild.role.delete': Method('deleteGuildRole', ['guildId', 'roleId']),
    'channel.get': Method('getChannel', ['channelId', 'guildId']),
    'channel.list': Method('getChannelList', ['guildId', 'next']),
    'channel.mute': Method('muteChannel', ['channelId', 'guildId', 'enable']),
  }

  export interface List<T> {
    data: T[]
    next?: string
  }

  export interface Methods {
    // message
    sendMessage(channelId: string, content: Element.Fragment, guildId?: string, options?: SendOptions): Promise<string[]>
    // sendMessage(session: Session.Payload, content: segment.Fragment, options?: SendOptions): Promise<string[]>
    sendPrivateMessage(userId: string, content: Element.Fragment, options?: SendOptions): Promise<string[]>
    // sendPrivateMessage(session: Session.Payload, content: segment.Fragment, options?: SendOptions): Promise<string[]>
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
    getSelf(): Promise<User>
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
    getGuildRoleList(guildId: string, next?: string): Promise<List<Role>>
    getGuildRoleIter(guildId: string): AsyncIterable<Role>
    createGuildRole(guildId: string, data: Partial<Role>): Promise<string>
    modifyGuildRole(guildId: string, roleId: string, data: Partial<Role>): Promise<void>
    deleteGuildRole(guildId: string, roleId: string): Promise<void>

    // channel
    getChannel(channelId: string, guildId?: string): Promise<Channel>
    getChannelList(guildId: string, next?: string): Promise<List<Channel>>
    getChannelIter(guildId: string): AsyncIterable<Channel>
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
    name?: string
    parentId?: string
    /** @deprecated */
    channelId: string
    /** @deprecated */
    channelName?: string
  }

  export interface Guild {
    id: string
    name: string
    /** @deprecated */
    guildId: string
    /** @deprecated */
    guildName?: string
  }

  export interface Role {
    id: string
    name: string
    color: number
    position: number
    permissions: bigint
    hoist: boolean
    mentionable: boolean
  }

  export interface UserBase {
    username?: string
    nickname?: string
    avatar?: string
    discriminator?: string
    isBot?: boolean
  }

  export interface User extends UserBase {
    userId: string
  }

  export interface GuildMember extends User {
    roles?: string[]
  }

  export interface Author extends GuildMember {
    anonymous?: string
  }

  export interface Role {
    id: string
  }

  export interface Message {
    messageId?: string
    channelId?: string
    guildId?: string
    userId?: string
    content?: string
    elements?: Element[]
    timestamp?: number
    author?: Author
    quote?: Message
    isDirect?: boolean
    /** @deprecated please use `isDirect` instead */
    subtype?: string
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

  export interface EventData {
    role?: Role
    argv?: Argv
  }
}
