import { h, Session, Universal } from '@satorijs/satori'
import * as QQGuild from './types'
import { QQGuildBot } from './bot'

export const adaptGuild = (guild: QQGuild.Guild): Universal.Guild => ({
  id: guild.id,
  name: guild.name,
  guildId: guild.id,
  guildName: guild.name,
})

export const adaptUser = (user: QQGuild.User): Universal.User => ({
  id: user.id,
  name: user.username,
  isBot: user.bot,
  avatar: user.avatar,
})

export async function decodeMessage(bot: QQGuildBot, msg: QQGuild.Message, session: Partial<Session> = {}): Promise<Universal.Message> {
  const { id: messageId, author, guild_id, channel_id, timestamp } = msg
  session.type = 'message'
  session.guildId = guild_id
  session.messageId = messageId
  session.channelId = channel_id
  session.timestamp = new Date(timestamp).valueOf()

  session.author = adaptUser(msg.author)
  session.userId = author.id
  if (msg.direct_message) {
    session.guildId = msg.src_guild_id
  } else {
    session.guildId = guild_id
    session.channelId = channel_id
  }
  session.isDirect = !!msg.direct_message
  session.content = (msg.content ?? '')
    .replace(/<@!(.+)>/, (_, $1) => h.at($1).toString())
    .replace(/<#(.+)>/, (_, $1) => h.sharp($1).toString())
  const { attachments = [] } = msg
  session.content = attachments
    .filter(({ content_type }) => content_type.startsWith('image'))
    .reduce((content, attachment) => content + h.image('https://' + attachment.url), session.content)
  session.elements = h.parse(session.content)

  if (msg.message_reference) {
    session.quote = await bot.getMessage(msg.channel_id, msg.message_reference.message_id)
  }

  return session
}

export function setupReaction(session: Partial<Session>, data: QQGuild.MessageReaction) {
  session.userId = data.user_id
  session.guildId = data.guild_id
  session.channelId = data.channel_id
  session.content = `${data.emoji.type}:${data.emoji.id}`
  // https://bot.q.qq.com/wiki/develop/api/openapi/reaction/model.html#reactiontargettype
  session.messageId = data.target.id
  session.isDirect = false
  // @TODO type
  return session
}

export async function adaptSession(bot: QQGuildBot, input: QQGuild.DispatchPayload) {
  const session = bot.session({}, input)
  if (input.t === 'MESSAGE_CREATE' || input.t === 'AT_MESSAGE_CREATE' || input.t === 'DIRECT_MESSAGE_CREATE') {
    if (bot.config.app.type === 'private' && input.t === 'AT_MESSAGE_CREATE') return
    await decodeMessage(bot, input.d, session)
  } else if (input.t === 'MESSAGE_REACTION_ADD') {
    setupReaction(session, input.d)
    session.type = 'reaction-added'
  } else if (input.t === 'MESSAGE_REACTION_REMOVE') {
    setupReaction(session, input.d)
    session.type = 'reaction-removed'
  } else if (input.t === 'CHANNEL_CREATE' || input.t === 'CHANNEL_UPDATE' || input.t === 'CHANNEL_DELETE') {
    session.type = {
      CHANNEL_CREATE: 'channel-added',
      CHANNEL_UPDATE: 'channel-updated',
      CHANNEL_DELETE: 'channel-deleted',
    }[input.t]
    session.guildId = input.d.guild_id
    session.channelId = input.d.id
    session.channelName = input.d.name
  } else if (input.t === 'GUILD_CREATE' || input.t === 'GUILD_UPDATE' || input.t === 'GUILD_DELETE') {
    session.type = {
      GUILD_CREATE: 'guild-added',
      GUILD_UPDATE: 'guild-updated',
      GUILD_DELETE: 'guild-deleted',
    }[input.t]
    session.guildId = input.d.id
    session.guildName = input.d.name
  } else {
    return
  }
  return session
}
