import { Bot, h, Session, Universal } from '@satorijs/satori'
import * as Kook from './types'

export const adaptGroup = (data: Kook.Guild): Universal.Guild => ({
  guildId: data.id,
  guildName: data.name,
})

export const adaptUser = (user: Kook.User): Universal.User => ({
  userId: user.id,
  avatar: user.avatar,
  username: user.username,
  discriminator: user.identify_num,
})

export const adaptAuthor = (author: Kook.Author): Universal.Author => ({
  ...adaptUser(author),
  nickname: author.nickname,
})

function adaptMessageMeta(base: Kook.MessageBase, meta: Kook.MessageMeta, session: Universal.MessageBase = {}) {
  if (meta.author) {
    session.author = adaptAuthor(meta.author)
    session.userId = meta.author.id
  }
  if (base.type === Kook.Type.text) {
    session.content = base.content
      .replace(/@(.+?)#(\d+)/, (_, name, id) => h('at', { id, name }).toString())
      .replace(/@全体成员/, () => h('at', { type: 'all' }).toString())
      .replace(/@在线成员/, () => h('at', { type: 'here' }).toString())
      .replace(/@role:(\d+);/, (_, role) => h('at', { role }).toString())
      .replace(/#channel:(\d+);/, (_, id) => h.sharp(id).toString())
    session.elements = h.parse(session.content)
  } else if (base.type === Kook.Type.image) {
    const element = h('image', { url: base.content, file: meta.attachments?.name })
    session.elements = [element]
    session.content = element.toString()
  } else if (base.type === Kook.Type.kmarkdown) {
    session.content = base.content
      .replace(/\(met\)all\(met\)/g, () => h('at', { type: 'all' }).toString())
      .replace(/\(met\)here\(met\)/g, () => h('at', { type: 'here' }).toString())
      .replace(/\(chn\)(\d+)\(chn\)/g, (_, id) => h.sharp(id).toString())
    for (const mention of meta.kmarkdown.mention_part) {
      session.content = session.content
        .replace(`(met)${mention.id}(met)`, h.at(mention.id, { name: mention.username }).toString())
    }
    for (const mention of meta.kmarkdown.mention_role_part) {
      const element = h('at', { role: mention.role_id, name: mention.name })
      session.content = session.content.replace(`(rol)${mention.role_id}(rol)`, element.toString())
    }
    session.content = session.content
      .replace(/\\\*/g, () => '*')
      .replace(/\\\\/g, () => '\\')
      .replace(/\\\(/g, () => '(')
      .replace(/\\\)/g, () => ')')
    session.elements = h.parse(session.content)
  }
  return session
}

export function adaptMessage(message: Kook.Message, session: Partial<Session> = {}) {
  adaptMessageMeta(message, message, session)
  session.messageId = message.id
  return session
}

function adaptMessageSession(data: Kook.Data, meta: Kook.MessageMeta, session: Partial<Session> = {}) {
  adaptMessageMeta(data, meta, session)
  session.messageId = data.msg_id
  session.timestamp = data.msg_timestamp
  const subtype = data.channel_type === 'GROUP' ? 'group' : 'private'
  session.subtype = subtype
  if (meta.quote) {
    session.quote = adaptMessageMeta(meta.quote, meta.quote)
    session.quote.messageId = meta.quote.id
    session.quote.channelId = session.channelId
    session.quote.subtype = subtype
  }
  return session
}

function adaptMessageCreate(data: Kook.Data, meta: Kook.MessageExtra, session: Partial<Session>) {
  adaptMessageSession(data, meta, session)
  session.guildId = meta.guild_id
  session.channelName = meta.channel_name
  if (data.channel_type === 'GROUP') {
    session.subtype = 'group'
    session.channelId = data.target_id
  } else {
    session.subtype = 'private'
    session.channelId = meta.code
  }
}

function adaptMessageModify(data: Kook.Data, meta: Kook.NoticeBody, session: Partial<Session>) {
  adaptMessageSession(data, meta, session)
  session.messageId = meta.msg_id
  session.channelId = meta.channel_id
}

function adaptReaction(body: Kook.NoticeBody, session: Partial<Session>) {
  session.channelId = body.channel_id
  session.messageId = body.msg_id
  session.userId = body.user_id
  session['emoji'] = body.emoji.id
}

export function adaptSession(bot: Bot, input: any) {
  const session = bot.session()
  if (input.type === Kook.Type.system) {
    const { type, body } = input.extra as Kook.Notice
    switch (type) {
      case 'updated_message':
      case 'updated_private_message':
        session.type = 'message-updated'
        adaptMessageModify(input, body, session)
        break
      case 'deleted_message':
      case 'deleted_private_message':
        session.type = 'message-deleted'
        adaptMessageModify(input, body, session)
        break
      case 'added_reaction':
      case 'private_added_reaction':
        session.type = 'reaction-added'
        adaptReaction(body, session)
        break
      case 'deleted_reaction':
      case 'private_deleted_reaction':
        session.type = 'reaction-deleted'
        adaptReaction(body, session)
        break
      case 'message_btn_click':
        session.type = 'kook'
        session.subtype = 'message-btn-click'
        session.messageId = body.msg_id
        session.userId = body.user_id
        session.content = body.value
        session.targetId = body.target_id
        break
      default: return
    }
  } else {
    session.type = 'message'
    adaptMessageCreate(input, input.extra as Kook.MessageExtra, session)
    if (!session.content) return
  }
  return session
}
