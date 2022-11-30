import segment from '@satorijs/element'
import { SendOptions } from './session'

export namespace Universal {
  export interface Methods {
    // message
    sendMessage(channelId: string, content: segment.Fragment, guildId?: string, options?: SendOptions): Promise<string[]>
    sendPrivateMessage(userId: string, content: segment.Fragment, options?: SendOptions): Promise<string[]>
    getMessage(channelId: string, messageId: string): Promise<Message>
    getMessageList(channelId: string, before?: string): Promise<Message[]>
    editMessage(channelId: string, messageId: string, content: segment.Fragment): Promise<void>
    deleteMessage(channelId: string, messageId: string): Promise<void>

    // user
    getSelf(): Promise<User>
    getUser(userId: string): Promise<User>
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

    // channel
    getChannel(channelId: string, guildId?: string): Promise<Channel>
    getChannelList(guildId: string): Promise<Channel[]>
    muteChannel(channelId: string, guildId?: string, enable?: boolean): Promise<void>

    // request
    handleFriendRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
    handleGuildRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
    handleGuildMemberRequest(messageId: string, approve: boolean, comment?: string): Promise<void>
  }

  export interface Channel {
    channelId: string
    channelName?: string
  }

  export interface Guild {
    guildId: string
    guildName?: string
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

  export interface MessageBase {
    messageId?: string
    channelId?: string
    guildId?: string
    userId?: string
    content?: string
    elements?: segment[]
    timestamp?: number
    author?: Author
    quote?: Message
  }

  export interface Message extends MessageBase {
    subtype?: string
  }
}
