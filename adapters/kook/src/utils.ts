import { Bot, defineProperty, h, hyphenate, isNullable, Session, Universal } from '@satorijs/satori'
import * as Kook from './types'

export * from './types'

export const adaptGroup = (data: Kook.Guild): Universal.Guild => ({
  id: data.id,
  name: data.name,
})

export const adaptUser = (user: Kook.User): Universal.User => ({
  id: user.id,
  name: user.username,
  userId: user.id,
  avatar: user.avatar,
  username: user.username,
  discriminator: user.identify_num,
})

export const decodeGuildMember = (member: Kook.Author): Universal.GuildMember => ({
  user: adaptUser(member),
  name: member.nickname,
})

export const decodeRole = (role: Kook.GuildRole): Universal.GuildRole => ({
  ...role,
  id: '' + role.role_id,
  permissions: BigInt(role.permissions),
  hoist: !!role.hoist,
  mentionable: !!role.mentionable,
})

function encodeBit(value: boolean) {
  return isNullable(value) ? value : value ? 1 : 0
}

export const encodeRole = (role: Partial<Universal.GuildRole>): Partial<Kook.GuildRole> => ({
  ...role,
  role_id: +role.id,
  permissions: role.permissions && Number(role.permissions),
  hoist: encodeBit(role.hoist),
  mentionable: encodeBit(role.mentionable),
})

function transformCardElement(data: any) {
  const { type, modules, text, elements, fields, ...attrs } = data
  const children = modules || elements || fields || (text ? [text] : [])
  return h(type, attrs, children.map(transformCardElement))
}

function adaptMessageMeta(
  base: Kook.MessageBase,
  data: Kook.MessageMeta,
  message: Universal.Message = {},
  payload: Universal.MessageLike = message,
) {
  if (base.type === Kook.Type.text) {
    message.content = base.content
      .replace(/@(.+?)#(\d+)/, (_, name, id) => h('at', { id, name }).toString())
      .replace(/@全体成员/, () => h('at', { type: 'all' }).toString())
      .replace(/@在线成员/, () => h('at', { type: 'here' }).toString())
      .replace(/@role:(\d+);/, (_, role) => h('at', { role }).toString())
      .replace(/#channel:(\d+);/, (_, id) => h.sharp(id).toString())
    message.elements = h.parse(message.content)
  } else if (base.type === Kook.Type.image) {
    const element = h('image', { url: base.content, file: data.attachments?.name })
    message.elements = [element]
    message.content = element.toString()
  } else if (base.type === Kook.Type.card) {
    const data = JSON.parse(base.content)
    message.elements = data.map(transformCardElement)
    message.content = message.elements.join('')
  } else if (base.type === Kook.Type.kmarkdown) {
    message.content = base.content
      .replace(/\(met\)all\(met\)/g, () => h('at', { type: 'all' }).toString())
      .replace(/\(met\)here\(met\)/g, () => h('at', { type: 'here' }).toString())
      .replace(/\(chn\)(\d+)\(chn\)/g, (_, id) => h.sharp(id).toString())
    for (const mention of data.kmarkdown.mention_part) {
      message.content = message.content
        .replace(`(met)${mention.id}(met)`, h.at(mention.id, { name: mention.username }).toString())
    }
    for (const mention of data.kmarkdown.mention_role_part) {
      const element = h('at', { role: mention.role_id, name: mention.name })
      message.content = message.content.replace(`(rol)${mention.role_id}(rol)`, element.toString())
    }
    message.content = message.content
      .replace(/\\\*/g, () => '*')
      .replace(/\\\\/g, () => '\\')
      .replace(/\\\(/g, () => '(')
      .replace(/\\\)/g, () => ')')
    message.elements = h.parse(message.content)
  }
  if (data.author) {
    payload.user = adaptUser(data.author)
    payload.member = decodeGuildMember(data.author)
  }
  return message
}

export function adaptMessage(data: Kook.Message, message: Universal.Message = {}, payload: Universal.MessageLike = message) {
  adaptMessageMeta(data, data, message, payload)
  message.id = message.messageId = data.id
  return message
}

function adaptMessageSession(
  data: Kook.Data,
  meta: Kook.MessageMeta,
  message: Universal.Message = {},
  payload: Universal.MessageLike = message,
) {
  adaptMessageMeta(data, meta, message)
  message.id = message.messageId = data.msg_id
  message.timestamp = data.msg_timestamp
  if (meta.quote) {
    message.quote = adaptMessageMeta(meta.quote, meta.quote)
    message.quote.messageId = message.quote.id = meta.quote.rong_id
  }
  return message
}

function adaptMessageCreate(data: Kook.Data, meta: Kook.MessageExtra, session: Partial<Session>) {
  session.guildId = meta.guild_id
  if (data.channel_type === 'GROUP') {
    session.isDirect = false
    session.channelId = data.target_id
  } else {
    session.isDirect = true
    session.channelId = meta.code
  }
  session.body.channel.name = meta.channel_name
  adaptMessageSession(data, meta, session.body.message = {}, session.body)
}

function adaptMessageModify(data: Kook.Data, meta: Kook.NoticeBody, session: Session) {
  session.channelId = meta.channel_id
  adaptMessageSession(data, meta, session.body.message = {}, session.body)
}

function adaptReaction(body: Kook.NoticeBody, session: Partial<Session>) {
  session.channelId = body.channel_id
  session.messageId = body.msg_id
  session.userId = body.user_id
  session['emoji'] = body.emoji.id
}

export function adaptSession(bot: Bot, input: any) {
  const session = bot.session()
  session.body._data = input
  const internal = Object.create(bot.internal)
  Object.assign(internal, input)
  defineProperty(session, 'kook', internal)
  if (input.type === Kook.Type.system) {
    const { type, body } = input.extra as Kook.Notice
    this.bot.dispatch(this.bot.session({
      type: 'internal',
      _type: 'kook/' + type.replace(/_/g, '-'),
      _data: input.body,
    }))
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
      case 'updated_channel':
      case 'deleted_channel':
        session.type = 'channel-deleted'
        session.subtype = 'group'
        session.channelId = body.id
        break
      case 'pinned_message':
      case 'unpinned_message':
        session.type = type === 'pinned_message' ? 'message-pinned' : 'message-unpinned'
        session.operatorId = body.operator_id
        session.messageId = body.msg_id
        session.channelId = body.channel_id
        break
      case 'joined_guild':
      case 'exited_guild':
      case 'updated_guild':
      case 'deleted_guild':
      case 'self_joined_guild':
      case 'self_exited_guild':
      case 'updated_guild_member':
        session.type = {
          joined_guild: 'guild-member-added',
          exited_guild: 'guild-member-deleted',
          updated_guild: 'guild-updated',
          deleted_guild: 'guild-deleted',
          self_joined_guild: 'guild-added',
          self_exited_guild: 'guild-deleted',
          updated_guild_member: 'guild-member-updated',
        }[type]
        session.guildId = input.target_id
        session.userId = body.user_id || bot.selfId
        break
      case 'guild_member_online':
      case 'guild_member_offline':
        session.type = 'kook'
        session.subtype = hyphenate(type)
        session.userId = body.user_id
        break
      case 'added_role':
      case 'deleted_role':
      case 'updated_role':
        session.type = {
          added_role: 'guild-role-added',
          deleted_role: 'guild-role-deleted',
          updated_role: 'guild-role-updated',
        }[type]
        session.guildId = input.target_id
        session.roleId = '' + body.role_id
        session.body.role = decodeRole(body)
        break
      case 'added_block_list':
      case 'deleted_block_list':
      case 'added_emoji':
      case 'updated_emoji':
        session.type = 'kook'
        session.subtype = hyphenate(type)
        session.guildId = input.target_id
        break
      case 'joined_channel':
      case 'exited_channel':
        session.type = 'kook'
        session.subtype = hyphenate(type)
        session.guildId = input.target_id
        session.channelId = body.channel_id
        session.userId = body.user_id
        break
      case 'user_updated':
        session.type = 'kook'
        session.subtype = hyphenate(type)
        session.userId = body.user_id
        break
      case 'message_btn_click':
        session.type = 'kook'
        session.subtype = hyphenate(type)
        session.messageId = body.msg_id
        session.userId = body.user_id
        session.content = body.value
        session['targetId'] = body.target_id
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
