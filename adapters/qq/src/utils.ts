import { h, Session, Universal } from '@satorijs/satori'
import * as QQ from './types'
import { QQBot } from './bot'
import { unescape } from '@satorijs/element'

export const decodeGuild = (guild: QQ.Guild): Universal.Guild => ({
  id: guild.id,
  name: guild.name,
})

export const decodeChannel = (channel: QQ.Channel): Universal.Channel => ({
  id: channel.id,
  name: channel.name,
  // TODO support more channel types
  type: Universal.Channel.Type.TEXT,
})

export const decodeUser = (user: QQ.User): Universal.User => ({
  id: user.id,
  name: user.username,
  isBot: user.bot,
  avatar: user.avatar,
})

export const decodeGuildMember = (member: QQ.Member): Universal.GuildMember => ({
  user: decodeUser(member.user),
  name: member.nick,
  roles: member.roles,
})

export async function decodeMessage(
  bot: QQBot,
  data: QQ.Message,
  message: Universal.Message = {},
  payload: Universal.MessageLike = message,
): Promise<Universal.Message> {
  message.id = message.messageId = data.id
  message.content = (data.content ?? '')
    .replace(/<@!(\d+)>/g, (_, $1) => h.at($1).toString())
  // .replace(/<#(.+)>/, (_, $1) => h.sharp($1).toString()) // not used?
  const { attachments = [] } = data
  message.content = attachments
    .filter(({ content_type }) => content_type.startsWith('image'))
    .reduce((content, attachment) => content + h.image('https://' + attachment.url), message.content)
  message.elements = h.parse(message.content)
  message.elements = h.transform(message.elements, {
    text: (attrs) => unescape(attrs.content),
  })

  if (data.message_reference) {
    message.quote = await bot.getMessage(data.channel_id, data.message_reference.message_id)
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

export function setupReaction(session: Partial<Session>, data: QQ.MessageReaction) {
  session.userId = data.user_id
  session.guildId = data.guild_id
  session.channelId = data.channel_id
  session.content = `${data.emoji.type}:${data.emoji.id}`
  // https://bot.q.qq.com/wiki/develop/api/openapi/reaction/model.html#reactiontargettype
  session.messageId = data.target.id
  session.isDirect = false
  return session
}

export async function adaptSession(bot: QQBot, input: QQ.DispatchPayload) {
  const session = bot.session()
  session.setInternal('qq', input)
  if (input.t === 'MESSAGE_CREATE' || input.t === 'AT_MESSAGE_CREATE' || input.t === 'DIRECT_MESSAGE_CREATE') {
    if (bot.config.type === 'private' && input.t === 'AT_MESSAGE_CREATE') return
    session.type = 'message'
    await decodeMessage(bot, input.d, session.body.message = {}, session.body)
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
    session.body.channel = decodeChannel(input.d)
  } else if (input.t === 'GUILD_CREATE' || input.t === 'GUILD_UPDATE' || input.t === 'GUILD_DELETE') {
    session.type = {
      GUILD_CREATE: 'guild-added',
      GUILD_UPDATE: 'guild-updated',
      GUILD_DELETE: 'guild-deleted',
    }[input.t]
    session.body.guild = decodeGuild(input.d)
  } else if (input.t === 'DIRECT_MESSAGE_DELETE' || input.t === 'MESSAGE_DELETE' || input.t === 'PUBLIC_MESSAGE_DELETE') {
    if (bot.config.type === 'private' && input.t === 'PUBLIC_MESSAGE_DELETE') return
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
  } else {
    return
  }
  return session
}
