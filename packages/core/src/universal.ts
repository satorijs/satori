import Element from '@satorijs/element'
import { SendOptions } from './session'
import { Dict } from 'cosmokit'

export namespace Universal {
  export const Methods = {
    'message.get': 'getMessage',
    'message.list': 'getMessageList',
    'message.update': 'editMessage',
    'message.delete': 'deleteMessage',
    'reaction.create': 'createReaction',
    'reaction.delete': 'deleteReaction',
    'reaction.clear': 'clearReaction',
    'reaction.list': 'getReactions',
    'guild.get': 'getGuild',
    'guild.list': 'getGuildList',
    'guild.member.get': 'getGuildMember',
    'guild.member.list': 'getGuildMemberList',
    'guild.member.kick': 'kickGuildMember',
    'guild.member.mute': 'muteGuildMember',
    'guild.member.role': 'setGuildMemberRole',
    'guild.role.list': 'getGuildRoles',
    'guild.role.create': 'createGuildRole',
    'guild.role.update': 'modifyGuildRole',
    'guild.role.delete': 'deleteGuildRole',
    'channel.get': 'getChannel',
    'channel.list': 'getChannelList',
    'channel.mute': 'muteChannel',
  }

  export interface Methods {
    // message
    sendMessage(channelId: string, content: Element.Fragment, guildId?: string, options?: SendOptions): Promise<string[]>
    // sendMessage(session: Session.Payload, content: segment.Fragment, options?: SendOptions): Promise<string[]>
    sendPrivateMessage(userId: string, content: Element.Fragment, options?: SendOptions): Promise<string[]>
    // sendPrivateMessage(session: Session.Payload, content: segment.Fragment, options?: SendOptions): Promise<string[]>
    getMessage(channelId: string, messageId: string): Promise<Message>
    getMessageList(channelId: string, before?: string): Promise<Message[]>
    editMessage(channelId: string, messageId: string, content: Element.Fragment): Promise<void>
    deleteMessage(channelId: string, messageId: string): Promise<void>

    // reaction
    createReaction(channelId: string, messageId: string, emoji: string): Promise<void>
    deleteReaction(channelId: string, messageId: string, emoji: string, userId?: string): Promise<void>
    clearReaction(channelId: string, messageId: string, emoji?: string): Promise<void>
    getReactions(channelId: string, messageId: string, emoji: string): Promise<User[]>

    // user
    getSelf(): Promise<User>
    getUser(userId: string, guildId?: string): Promise<User>
    getFriendList(): Promise<User[]>
    deleteFriend(userId: string): Promise<void>

    // guild
    getGuild(guildId: string): Promise<Guild>
    getGuildList(): Promise<Guild[]>

    // guild member
    getGuildMember(guildId: string, userId: string): Promise<GuildMember>
    getGuildMemberList(guildId: string): Promise<GuildMember[]>
    kickGuildMember(guildId: string, userId: string, permanent?: boolean): Promise<void>
    muteGuildMember(guildId: string, userId: string, duration: number, reason?: string): Promise<void>

    // role
    setGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
    unsetGuildMemberRole(guildId: string, userId: string, roleId: string): Promise<void>
    getGuildRoles(guildId: string): Promise<Role[]>
    createGuildRole(guildId: string, data: Partial<Role>): Promise<string>
    modifyGuildRole(guildId: string, roleId: string, data: Partial<Role>): Promise<void>
    deleteGuildRole(guildId: string, roleId: string): Promise<void>

    // channel
    getChannel(channelId: string, guildId?: string): Promise<Channel>
    getChannelList(guildId: string): Promise<Channel[]>
    muteChannel(channelId: string, guildId?: string, enable?: boolean): Promise<void>

    // request
    handleFriendRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
    handleGuildRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
    handleGuildMemberRequest(messageId: string, approve: boolean, comment?: string): Promise<void>

    // commands
    updateCommands(commands: Command[]): Promise<void>
  }

  export interface Channel {
    channelId: string
    channelName?: string
  }

  export interface Guild {
    guildId: string
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
