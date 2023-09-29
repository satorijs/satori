import { defineProperty, h, hyphenate, Logger, Universal } from '@satorijs/satori'
import * as qface from 'qface'
import { BaseBot, CQCode } from './bot'
import * as OneBot from './types'

export * from './types'

const logger = new Logger('onebot')

export const decodeUser = (user: OneBot.AccountInfo): Universal.User => ({
  id: user.tiny_id || user.user_id.toString(),
  name: user.nickname,
  userId: user.tiny_id || user.user_id.toString(),
  avatar: user.user_id ? `http://q.qlogo.cn/headimg_dl?dst_uin=${user.user_id}&spec=640` : undefined,
  username: user.nickname,
})

export const decodeGuildMember = (user: OneBot.SenderInfo): Universal.GuildMember => ({
  user: decodeUser(user),
  name: user.card,
  roles: [user.role],
})

export const adaptQQGuildMemberInfo = (user: OneBot.GuildMemberInfo): Universal.GuildMember => ({
  user: {
    id: user.tiny_id,
    name: user.nickname,
    isBot: user.role_name === '机器人',
  },
  name: user.nickname,
  roles: user.role_name ? [user.role_name] : [],
})

export const adaptQQGuildMemberProfile = (user: OneBot.GuildMemberProfile): Universal.GuildMember => ({
  user: {
    id: user.tiny_id,
    name: user.nickname,
    isBot: user.roles?.some(r => r.role_name === '机器人'),
  },
  name: user.nickname,
  roles: user.roles?.map(r => r.role_name) || [],
})

export async function adaptMessage(
  bot: BaseBot,
  data: OneBot.Message,
  message: Universal.Message = {},
  payload: Universal.Message | Universal.EventData = message,
) {
  message.id = message.messageId = data.message_id.toString()

  // message content
  const chain = CQCode.parse(data.message)
  if (bot.config.advanced.splitMixedContent) {
    chain.forEach((item, index) => {
      if (item.type !== 'image') return
      const left = chain[index - 1]
      if (left && left.type === 'text' && left.attrs.content.trimEnd() === left.attrs.content) {
        left.attrs.content += ' '
      }
      const right = chain[index + 1]
      if (right && right.type === 'text' && right.attrs.content.trimStart() === right.attrs.content) {
        right.attrs.content = ' ' + right.attrs.content
      }
    })
  }

  message.elements = h.transform(chain, {
    at({ qq }) {
      if (qq !== 'all') return h.at(qq)
      return h('at', { type: 'all' })
    },
    face({ id }) {
      const name = qface.get(id)?.QDes.slice(1)
      return h('face', { id, name, platform: bot.platform }, [
        h.image(qface.getUrl(id)),
      ])
    },
    record(attrs) {
      return h('audio', attrs)
    },
  })
  const [guildId, channelId] = decodeGuildChannelId(data)
  if (message.elements[0]?.type === 'reply') {
    const reply = message.elements.shift()
    message.quote = await bot.getMessage(channelId, reply.attrs.id).catch((error) => {
      logger.warn(error)
      return undefined
    })
  }
  message.content = message.elements.join('')

  if (!payload) return message
  payload.user = decodeUser(data.sender)
  payload.member = decodeGuildMember(data.sender)
  payload.timestamp = data.time * 1000
  payload.guild = guildId && { id: guildId }
  payload.channel = channelId && { id: channelId, type: guildId ? Universal.Channel.Type.TEXT : Universal.Channel.Type.DIRECT }
}

const decodeGuildChannelId = (data: OneBot.Message) => {
  if (data.guild_id) {
    return [data.guild_id, data.channel_id]
  } else if (data.group_id) {
    return [data.group_id.toString(), data.group_id.toString()]
  } else {
    return [undefined, 'private:' + data.sender.user_id]
  }
}

export const adaptGuild = (info: OneBot.GroupInfo | OneBot.GuildBaseInfo): Universal.Guild => {
  if ((info as OneBot.GuildBaseInfo).guild_id) {
    const guild = info as OneBot.GuildBaseInfo
    return {
      id: guild.guild_id,
      name: guild.guild_name,
    }
  } else {
    const group = info as OneBot.GroupInfo
    return {
      id: group.group_id.toString(),
      name: group.group_name,
    }
  }
}

export const adaptChannel = (info: OneBot.GroupInfo | OneBot.ChannelInfo): Universal.Channel => {
  if ((info as OneBot.ChannelInfo).channel_id) {
    const channel = info as OneBot.ChannelInfo
    return {
      id: channel.channel_id,
      name: channel.channel_name,
      type: Universal.Channel.Type.TEXT,
    }
  } else {
    const group = info as OneBot.GroupInfo
    return {
      id: group.group_id.toString(),
      name: group.group_name,
      type: Universal.Channel.Type.TEXT,
    }
  }
}

export async function dispatchSession(bot: BaseBot, data: OneBot.Payload) {
  if (data.self_tiny_id) {
    // don't dispatch any guild message without guild initialization
    bot = bot['guildBot']
    if (!bot) return
  }

  const session = await adaptSession(bot, data)
  if (!session) return
  const internal = Object.create(bot.internal)
  defineProperty(session, 'onebot', Object.assign(internal, data))
  bot.dispatch(session)
}

export async function adaptSession(bot: BaseBot, data: OneBot.Payload) {
  const session = bot.session()
  session.selfId = data.self_tiny_id ? data.self_tiny_id : '' + data.self_id
  session.type = data.post_type

  if (data.post_type === 'message' || data.post_type === 'message_sent') {
    await adaptMessage(bot, data, session.body.message = {}, session.body)
    if (data.post_type === 'message_sent' && !session.guildId) {
      session.channelId = 'private:' + data.target_id
    }
    session.type = 'message'
    session.subtype = data.message_type === 'guild' ? 'group' : data.message_type
    session.isDirect = data.message_type === 'private'
    session.subsubtype = data.message_type
    return session
  }

  session.subtype = data.sub_type
  if (data.user_id) session.userId = '' + data.user_id
  if (data.group_id) session.guildId = session.channelId = '' + data.group_id
  if (data.guild_id) session.guildId = '' + data.guild_id
  if (data.channel_id) session.channelId = '' + data.channel_id
  if (data.target_id) session['targetId'] = '' + data.target_id
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
      case 'offline_file':
        session.elements = [h('file', data.file)]
        session.type = 'message'
        session.subtype = 'private'
        session.isDirect = true
        session.subsubtype = 'offline-file-added'
        break
      case 'group_upload':
        session.elements = [h('file', data.file)]
        session.type = 'message'
        session.subtype = 'group'
        session.subsubtype = 'guild-file-added'
        break
      default: return
    }
  } else return

  return session
}
