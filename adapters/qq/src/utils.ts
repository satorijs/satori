import { Bot, Context, h, Session, Universal } from '@satorijs/core'
import * as QQ from './types'
import { QQBot } from './bot'
import { inspect } from 'node:util'

export const decodeGuild = (guild: QQ.Guild): Universal.Guild => ({
  id: guild.id,
  name: guild.name,
  avatar: guild.icon,
})

export const decodeChannel = (channel: QQ.Channel): Universal.Channel => ({
  id: channel.id,
  name: channel.name,
  type: channel.type === QQ.ChannelType.TEXT ? Universal.Channel.Type.TEXT
    : channel.type === QQ.ChannelType.VOICE ? Universal.Channel.Type.VOICE
      : channel.type === QQ.ChannelType.GROUP ? Universal.Channel.Type.CATEGORY
        : Universal.Channel.Type.TEXT,
  parentId: channel.parent_id,
  position: channel.position,
})

export const decodeUser = (user: QQ.User): Universal.User => ({
  id: user.id,
  name: user.username,
  isBot: user.bot,
  avatar: user.avatar,
})

export const decodeGuildMember = (member: QQ.Member): Universal.GuildMember => ({
  user: member.user ? decodeUser(member.user) : undefined,
  nick: member.nick,
  roles: member.roles?.map(id => ({ id })),
  joinedAt: new Date(member.joined_at).valueOf(),
})

/** 将 <faceType...> 串用 faceId 取 attachments 转成 h.image, 如果没有对应 attachment 则删除 <faceType...> */
export const decodeGroupMessageContent = (content: string, attachments: QQ.Attachment[] = [], attachedFace: Set<number> = new Set()): h[] => {
  const elements = []
  let lastIndex = 0

  for (const match of content.matchAll(/<faceType=(\d+),faceId="([^"]*)",ext="([^"]*)">/g)) {
    const [fullMatch, faceType, faceId, ext] = match

    if (match.index > lastIndex) {
      elements.push(h.text(content.slice(lastIndex, match.index)))
    }
    switch (+faceType) {
      // 动画表情, 超级QQ秀表情, GIF表情
      case 6: {
        const imageAttachment = attachments[+faceId]
        if (imageAttachment) {
          elements.push(h.image(imageAttachment.url, {
            width: imageAttachment.width, height: imageAttachment.height,
          }))
          attachedFace.add(+faceId)
        }
        break
      }
      case 4: // 表情商城, 无 id
      case 3: // 超级表情
      case 1: { // 小黄脸
        let name = ''
        try {
          name = JSON.parse(Buffer.from(ext, 'base64').toString()).text
        } finally {
          elements.push(h('emoji', {
            ...faceId ? { id: faceId } : {},
            name,
          }))
        }
      }
    }
    lastIndex = match.index + fullMatch.length
  }
  if (lastIndex < content.length) {
    elements.push(h.text(content.slice(lastIndex)))
  }
  return elements
}

export const decodeAttachments = (attachments: QQ.Attachment[], attachedFace: Set<number> = new Set()): h[] => {
  const elements = []
  for (const [index, attachment] of attachments.entries()) {
    if (attachment.content_type === 'file') {
      elements.push(h.file(attachment.url, {
        filename: attachment.filename,
      }))
    } else if (attachment.content_type.startsWith('image/')) {
      if (attachedFace.has(index)) continue
      elements.push(h.image(attachment.url, { width: attachment.width, height: attachment.height }))
    } else if (attachment.content_type === 'voice') {
      elements.push(h.audio(attachment.url))
    } else if (attachment.content_type.startsWith('video')) {
      elements.push(h.video(attachment.url, { width: attachment.width, height: attachment.height }))
    }
  }
  return elements
}

export function decodeGroupMessage(
  bot: QQBot,
  data: QQ.UserMessage,
  message: Universal.Message = {},
  payload: Universal.MessageLike = message,
) {
  message.id = data.id

  if (data.message_type === QQ.Message.Type.QUOTE) // fuck tencent
    data.content = data.content.replace(/^(<@[0-9A-F]{32}>) \1/, '$1')
  const attachedFace = new Set<number>() // attachments 下标
  if (data.msg_elements?.length && data.content[0] === ' ') data.content = data.content.slice(1)
  message.elements = decodeGroupMessageContent(data.content, data.attachments ?? [], attachedFace)
  const mentionMap = new Map<string, h>()
  for (const mention of data.mentions ?? []) {
    // 这个 id 和 bot selfId 不一样
    if (mention.is_you && mention.scope === 'single') mentionMap.set(mention.id, h.at(bot.selfId))
    else if (mention.scope === 'all') mentionMap.set('all', h.at({ type: 'all' }))
    else mentionMap.set(mention.id, h.at(mention.id))
  }
  message.elements = h.transform(message.elements, {
    text: (attrs) => {
      return attrs.content.split(/(<@(?:[0-9a-fA-F]{32}|all)>)/g)
        .filter(Boolean)
        .map((part) => {
          const match = part.match(/^<@([0-9a-fA-F]{32}|all)>$/)
          if (match) return mentionMap.get(match[1]) || h.text(part)
          return h.text(part)
        })
    },
  })
  message.elements.push(...decodeAttachments(data.attachments ?? [], attachedFace))

  if (data.message_type === QQ.Message.Type.QUOTE) {
    // msg_elements[0] 无 mentions；有 author, content 会有 <faceType ...>
    const quoted: h[] = []
    const quotedAttached = new Set<number>()
    quoted.push(...decodeGroupMessageContent(data.msg_elements[0].content, data.msg_elements[0].attachments ?? [], quotedAttached))
    quoted.push(...decodeAttachments(data.msg_elements[0].attachments ?? [], quotedAttached))
    message.quote = {
      elements: quoted,
      content: quoted.join(''),
    }
  }
  message.content = message.elements.join('')

  if (!payload) return message
  let date = data.timestamp
  if (date.includes('m=')) {
    date = data.timestamp.slice(0, data.timestamp.indexOf('m=')).trim().replace(/\+(\d{4}) CST/, 'GMT+$1')
  }
  payload.timestamp = new Date(date).valueOf()
  payload.guild = data.group_id && { id: data.group_id }
  payload.user = { id: data.author.id, avatar: `https://q.qlogo.cn/qqapp/${bot.config.id}/${data.author.id}/640` }
  if (data.author.username) payload.user.name = data.author.username
  if (data.author.member_role) payload.member = { roles: [{ id: data.author.member_role }] }
  return message
}

export async function decodeMessage(
  bot: Bot,
  data: QQ.Message,
  message: Universal.Message = {},
  payload: Universal.MessageLike = message,
): Promise<Universal.Message> {
  message.id = message.messageId = data.id
  message.content = (data.content ?? '')
    .replace(/<@!(\d+)>/g, (_, $1) => h.at($1).toString())
  // .replace(/<#(.+)>/, (_, $1) => h.sharp($1).toString()) // not used?
  const { attachments = [] } = data
  if (attachments.length && !/\s$/.test(message.content)) message.content += ' '
  message.content = attachments
    .filter(({ content_type }) => content_type.startsWith('image'))
    .reduce((content, attachment) => content + h.image('https://' + attachment.url), message.content)
  message.elements = h.parse(message.content)
  message.elements = h.transform(message.elements, {
    text: (attrs) => h.unescape(attrs.content),
  })

  if (data.message_reference) {
    message.quote = bot.getMessage
      ? await bot.getMessage(data.channel_id, data.message_reference.message_id)
      : { id: data.message_reference.message_id }
  }

  if (!payload) return message
  payload.timestamp = new Date(data.timestamp).valueOf()
  payload.user = decodeUser(data.author)
  if (data.direct_message) {
    // real guild id, dm's fake guild id
    payload.guild = { id: `${data.src_guild_id}_${data.guild_id}` }
    payload.channel = { id: `${data.guild_id}_${data.channel_id}`, type: Universal.Channel.Type.DIRECT }
  } else {
    payload.guild = { id: data.guild_id }
    payload.channel = { id: data.channel_id, type: Universal.Channel.Type.TEXT }
  }
  return message
}

export function setupReaction(session: Session, data: QQ.MessageReaction) {
  session.userId = data.user_id
  session.guildId = data.guild_id
  session.channelId = data.channel_id
  session.content = `${data.emoji.type}:${data.emoji.id}`
  // https://bot.q.qq.com/wiki/develop/api/openapi/reaction/model.html#reactiontargettype
  session.messageId = data.target.id
  session.isDirect = false
  return session
}

export async function adaptSession<C extends Context = Context>(bot: QQBot<C>, input: QQ.DispatchPayload) {
  let session = bot.session()

  if (!['GROUP_AT_MESSAGE_CREATE', 'C2C_MESSAGE_CREATE', 'GROUP_MESSAGE_CREATE', 'FRIEND_ADD', 'FRIEND_DEL',
    'GROUP_ADD_ROBOT', 'GROUP_DEL_ROBOT', 'INTERACTION_CREATE', 'GROUP_MEMBER_ADD', 'GROUP_MEMBER_REMOVE', 'GROUP_JOIN_REQUEST'].includes(input.t)) {
    session = bot.guildBot.session()
    session.setInternal(bot.guildBot.platform, input)
  } else {
    session.setInternal(bot.platform, input)
  }

  if (input.t === 'MESSAGE_CREATE' || input.t === 'AT_MESSAGE_CREATE' || input.t === 'DIRECT_MESSAGE_CREATE') {
    if (bot.config.type === 'private' && input.t === 'AT_MESSAGE_CREATE' && bot.config.intents & QQ.Intents.GUILD_MESSAGES) return
    session.type = 'message'
    await decodeMessage(bot, input.d, session.event.message = {}, session.event)
  } else if (input.t === 'MESSAGE_REACTION_ADD') {
    if (input.d.target.type !== 'ReactionTargetType_MSG') return
    setupReaction(session, input.d)
    session.type = 'reaction-added'
  } else if (input.t === 'MESSAGE_REACTION_REMOVE') {
    if (input.d.target.type !== 'ReactionTargetType_MSG') return
    setupReaction(session, input.d)
    session.type = 'reaction-removed'
  } else if (input.t === 'CHANNEL_CREATE' || input.t === 'CHANNEL_UPDATE' || input.t === 'CHANNEL_DELETE') {
    session.type = {
      CHANNEL_CREATE: 'channel-added',
      CHANNEL_UPDATE: 'channel-updated',
      CHANNEL_DELETE: 'channel-deleted',
    }[input.t]
    session.guildId = input.d.guild_id
    session.event.channel = decodeChannel(input.d)
  } else if (input.t === 'GUILD_CREATE' || input.t === 'GUILD_UPDATE' || input.t === 'GUILD_DELETE') {
    session.type = {
      GUILD_CREATE: 'guild-added',
      GUILD_UPDATE: 'guild-updated',
      GUILD_DELETE: 'guild-deleted',
    }[input.t]
    session.event.guild = decodeGuild(input.d)
  } else if (input.t === 'DIRECT_MESSAGE_DELETE' || input.t === 'MESSAGE_DELETE' || input.t === 'PUBLIC_MESSAGE_DELETE') {
    if (bot.config.type === 'private' && input.t === 'PUBLIC_MESSAGE_DELETE' && bot.config.intents & QQ.Intents.GUILD_MESSAGES) return
    session.type = 'message-deleted'
    session.userId = input.d.message.author.id
    session.operatorId = input.d.op_user.id
    session.messageId = input.d.message.id
    session.isDirect = input.d.message.direct_message
    if (session.isDirect) {
      session.guildId = `${input.d.message.src_guild_id}_${input.d.message.guild_id}`
      session.channelId = `${input.d.message.guild_id}_${input.d.message.channel_id}`
    } else {
      session.guildId = input.d.message.guild_id
      session.channelId = input.d.message.channel_id
    }
  } else if (input.t === 'GROUP_AT_MESSAGE_CREATE') {
    session.type = 'message'
    session.isDirect = false
    decodeGroupMessage(bot, input.d, session.event.message = {}, session.event)
    session.channelId = session.guildId
    session.elements.unshift(h.at(session.selfId))
  } else if (input.t === 'C2C_MESSAGE_CREATE') {
    session.type = 'message'
    session.isDirect = true
    decodeGroupMessage(bot, input.d, session.event.message = {}, session.event)
    session.channelId = session.userId
  } else if (input.t === 'GROUP_MESSAGE_CREATE') {
    session.type = 'message'
    decodeGroupMessage(bot, input.d, session.event.message = {}, session.event)
    session.channelId = session.guildId
  } else if (input.t === 'FRIEND_ADD') {
    session.type = 'friend-added'
    session.timestamp = input.d.timestamp
    session.userId = input.d.openid
  } else if (input.t === 'FRIEND_DEL') {
    session.type = 'friend-deleted'
    session.timestamp = input.d.timestamp
    session.userId = input.d.openid
  } else if (input.t === 'GROUP_ADD_ROBOT') {
    session.type = 'guild-added'
    session.timestamp = input.d.timestamp
    session.guildId = input.d.group_openid
    session.operatorId = input.d.op_member_openid
  } else if (input.t === 'GROUP_DEL_ROBOT') {
    session.type = 'guild-removed'
    session.timestamp = input.d.timestamp
    session.guildId = input.d.group_openid
    session.operatorId = input.d.op_member_openid
  } else if (input.t === 'INTERACTION_CREATE') {
    session.type = 'interaction/button'
    session.userId = input.d.group_member_openid ?? input.d.user_openid ?? input.d.data.resolved.user_id
    if (input.d.chat_type === QQ.ChatType.GROUP) {
      session.guildId = input.d.group_openid
      session.channelId = input.d.group_openid
      session.isDirect = false
    } else if (input.d.chat_type === QQ.ChatType.CHANNEL) {
      session.channelId = input.d.channel_id
      session.isDirect = false // ?
    } else if (input.d.chat_type === QQ.ChatType.DIRECT) {
      session.isDirect = true
      session.channelId = session.userId
    }
    session.event.button = {
      id: input.d.data.resolved.button_id,
      // @ts-ignore
      data: input.d.data.resolved.button_data,
    }
    // session.messageId = input.d.id // event_id is not supported for sending message

    // {message: 'get header appid failed', code: 630006}
    // {"message":"check app privilege not pass","code":11253
    if (!bot.config.manualAcknowledge) bot.internal.acknowledgeInteraction(input.d.id, { code: 0 }).catch(() => {})
  } else if (input.t === 'GUILD_MEMBER_ADD' || input.t === 'GUILD_MEMBER_DELETE' || input.t === 'GUILD_MEMBER_UPDATE') {
    session.type = {
      GUILD_MEMBER_ADD: 'guild-member-added',
      GUILD_MEMBER_UPDATE: 'guild-member-updated',
      GUILD_MEMBER_DELETE: 'guild-member-removed',
    }[input.t]
    session.guildId = input.d.guild_id
    session.operatorId = input.d.op_user_id
    // session.timestamp = new Date(input.d.joined_at).valueOf()
    session.timestamp = Date.now()
    session.event.user = decodeUser(input.d.user)
  } else if (input.t === 'GROUP_MEMBER_ADD' || input.t === 'GROUP_MEMBER_REMOVE') {
    session.type = {
      GROUP_MEMBER_ADD: 'guild-member-added',
      GROUP_MEMBER_REMOVE: 'guild-member-removed',
    }[input.t]
    session.guildId = input.d.group_openid
    session.channelId = input.d.group_openid
    session.userId = input.d.member_openid
    session.timestamp = input.d.timestamp
  } else if (input.t === 'GROUP_JOIN_REQUEST') {
    session.type = 'guild-member-request'
    session.timestamp = new Date(input.d.apply_at).getTime()
    session.guildId = input.d.group_openid
    session.channelId = input.d.group_openid
    session.userId = input.d.member_openid
    session.messageId = input.d.join_request_id
    session.event.user = {
      id: input.d.member_openid,
      avatar: `https://q.qlogo.cn/qqapp/${bot.config.id}/${input.d.member_openid}/640`,
      name: input.d.username,
    }
    if (input.d.verify_info?.verify_message) {
      session.content = input.d.verify_info.verify_message
    } else if (input.d.verify_info?.review_qa_list?.length) {
      session.content = input.d.verify_info.review_qa_list.map(qa => qa.answer).join('\n')
    }
    bot.guildMemberRequestMap.set(input.d.join_request_id, { guildId: input.d.group_openid, userId: input.d.member_openid })
  } else {
    return
  }
  return session
}
