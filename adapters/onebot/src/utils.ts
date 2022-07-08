import { Author, Bot, Channel, Guild, GuildMember, Message, Session, User } from '@satorijs/core'
import { defineProperty, hyphenate } from '@satorijs/env-node'
import segment from '@satorijs/message'
import * as qface from 'qface'
import * as OneBot from './types'

export * from './types'

export const adaptUser = (user: OneBot.AccountInfo): User => ({
  userId: user.tiny_id || user.user_id.toString(),
  avatar: user.user_id ? `http://q.qlogo.cn/headimg_dl?dst_uin=${user.user_id}&spec=640` : undefined,
  username: user.nickname,
})

export const adaptGuildMember = (user: OneBot.SenderInfo): GuildMember => ({
  ...adaptUser(user),
  nickname: user.card,
  roles: [user.role],
})

export const adaptQQGuildMemberInfo = (user: OneBot.GuildMemberInfo): GuildMember => ({
  userId: user.tiny_id,
  username: user.nickname,
  nickname: user.nickname,
  roles: user.role_name ? [user.role_name] : [],
  isBot: user.role_name === '机器人',
})

export const adaptQQGuildMemberProfile = (user: OneBot.GuildMemberProfile): GuildMember => ({
  userId: user.tiny_id,
  username: user.nickname,
  nickname: user.nickname,
  roles: user.roles?.map(r => r.role_name) || [],
  isBot: user.roles?.some(r => r.role_name === '机器人'),
})

export const adaptAuthor = (user: OneBot.SenderInfo, anonymous?: OneBot.AnonymousInfo): Author => ({
  ...adaptUser(user),
  nickname: anonymous?.name || user.card,
  anonymous: anonymous?.flag,
  roles: [user.role],
})

export function adaptMessage(message: OneBot.Message): Message {
  const author = adaptAuthor(message.sender, message.anonymous)
  const result: Message = {
    author,
    userId: author.userId,
    messageId: message.message_id.toString(),
    timestamp: message.time * 1000,
    content: segment.transform(message.message, {
      at({ qq }) {
        if (qq !== 'all') return segment.at(qq)
        return segment('at', { type: 'all' })
      },
      face: ({ id }) => segment('face', { id, url: qface.getUrl(id) }),
      reply: (data) => segment('quote', data),
    }),
  }
  if (message.guild_id) {
    result.guildId = message.guild_id
    result.channelId = message.channel_id
  } else if (message.group_id) {
    result.guildId = result.channelId = message.group_id.toString()
  } else {
    result.channelId = 'private:' + author.userId
  }
  return result
}

export const adaptGuild = (info: OneBot.GroupInfo | OneBot.GuildBaseInfo): Guild => {
  if ((info as OneBot.GuildBaseInfo).guild_id) {
    const guild = info as OneBot.GuildBaseInfo
    return {
      guildId: guild.guild_id,
      guildName: guild.guild_name,
    }
  } else {
    const group = info as OneBot.GroupInfo
    return {
      guildId: group.group_id.toString(),
      guildName: group.group_name,
    }
  }
}

export const adaptChannel = (info: OneBot.GroupInfo | OneBot.ChannelInfo): Channel => {
  if ((info as OneBot.ChannelInfo).channel_id) {
    const channel = info as OneBot.ChannelInfo
    return {
      channelId: channel.channel_id.toString(),
      channelName: channel.channel_name,
    }
  } else {
    const group = info as OneBot.GroupInfo
    return {
      channelId: group.group_id.toString(),
      channelName: group.group_name,
    }
  }
}

export function dispatchSession(bot: Bot, data: OneBot.Payload) {
  if (data.self_tiny_id) {
    // don't dispatch any guild message without guild initialization
    bot = bot['guildBot']
    if (!bot) return
  }

  const session = adaptSession(bot, data)
  if (!session) return
  defineProperty(session, 'onebot', Object.create(bot.internal))
  Object.assign(session.onebot, data)
  bot.dispatch(session)
}

export function adaptSession(bot: Bot, data: OneBot.Payload) {
  const session = bot.session()
  session.selfId = data.self_tiny_id ? data.self_tiny_id : '' + data.self_id
  session.type = data.post_type

  if (data.post_type === 'message' || data.post_type === 'message_sent') {
    Object.assign(session, adaptMessage(data))
    if (data.post_type === 'message_sent' && !session.guildId) {
      session.channelId = 'private:' + data.target_id
    }
    session.type = 'message'
    session.subtype = data.message_type === 'guild' ? 'group' : data.message_type
    session.subsubtype = data.message_type
    return session
  }

  session.subtype = data.sub_type
  if (data.user_id) session.userId = '' + data.user_id
  if (data.group_id) session.guildId = session.channelId = '' + data.group_id
  if (data.guild_id) session.guildId = '' + data.guild_id
  if (data.channel_id) session.channelId = '' + data.channel_id
  if (data.target_id) session.targetId = '' + data.target_id
  if (data.operator_id) session.operatorId = '' + data.operator_id
  if (data.message_id) session.messageId = '' + data.message_id

  if (data.post_type === 'request') {
    session.content = data.comment
    session.messageId = data.flag
    if (data.request_type === 'friend') {
      session.type = 'friend-request'
      session.channelId = `private:${session.userId}`
    } else if (data.sub_type === 'add') {
      session.type = 'guild-member-request'
    } else {
      session.type = 'guild-request'
    }
  } else if (data.post_type === 'notice') {
    switch (data.notice_type) {
      case 'group_recall':
        session.type = 'message-deleted'
        session.subtype = 'group'
        session.subsubtype = 'group'
        break
      case 'friend_recall':
        session.type = 'message-deleted'
        session.subtype = 'private'
        session.channelId = `private:${session.userId}`
        session.subsubtype = 'private'
        break
      // from go-cqhttp source code, but not mentioned in official docs
      case 'guild_channel_recall':
        session.type = 'message-deleted'
        session.subtype = 'guild'
        session.subsubtype = 'guild'
        break
      case 'friend_add':
        session.type = 'friend-added'
        break
      case 'group_upload':
        session.type = 'guild-file-added'
        break
      case 'group_admin':
        session.type = 'guild-member'
        session.subtype = 'role'
        break
      case 'group_ban':
        session.type = 'guild-member'
        session.subtype = 'ban'
        break
      case 'group_decrease':
        session.type = session.userId === session.selfId ? 'guild-deleted' : 'guild-member-deleted'
        session.subtype = session.userId === session.operatorId ? 'active' : 'passive'
        break
      case 'group_increase':
        session.type = session.userId === session.selfId ? 'guild-added' : 'guild-member-added'
        session.subtype = session.userId === session.operatorId ? 'active' : 'passive'
        break
      case 'group_card':
        session.type = 'guild-member'
        session.subtype = 'nickname'
        break
      case 'notify':
        session.type = 'notice'
        session.subtype = hyphenate(data.sub_type) as any
        if (session.subtype === 'poke') {
          session.channelId ||= `private:${session.userId}`
        } else if (session.subtype === 'honor') {
          session.subsubtype = hyphenate(data.honor_type) as any
        }
        break
      case 'message_reactions_updated':
        session.type = 'onebot'
        session.subtype = 'message-reactions-updated'
        break
      case 'channel_created':
        session.type = 'onebot'
        session.subtype = 'channel-created'
        break
      case 'channel_updated':
        session.type = 'onebot'
        session.subtype = 'channel-updated'
        break
      case 'channel_destroyed':
        session.type = 'onebot'
        session.subtype = 'channel-destroyed'
        break
      default: return
    }
  } else return

  return session
}
