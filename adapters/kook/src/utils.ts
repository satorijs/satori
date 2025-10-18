import { Context, h, isNullable, Session, Universal } from '@satorijs/core'
import * as Kook from './types'
import { KookBot } from './bot'

export * from './types'

export const adaptGroup = (data: Kook.Guild): Universal.Guild => ({
  id: data.id,
  name: data.name,
  avatar: data.icon,
})

export const adaptChannel = (data: Kook.Channel): Universal.Channel => ({
  id: data.id,
  type: data.is_category ? Universal.Channel.Type.CATEGORY
    : data.type === 1 ? Universal.Channel.Type.TEXT
      : data.type === 2 ? Universal.Channel.Type.VOICE
        : Universal.Channel.Type.TEXT,
  name: data.name,
  parentId: data.parent_id,
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
  nick: member.nickname,
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
    const element = h('img', { src: base.content, file: data.attachments?.name })
    message.elements = [element]
    message.content = element.toString()
  } else if (base.type === Kook.Type.card) {
    const data = JSON.parse(base.content)
    message.elements = data.map(transformCardElement)
    message.content = message.elements.join('')
  } else if (base.type === Kook.Type.kmarkdown) {
    let content = base.content
    let buffer = ''
    let cap: RegExpExecArray
    const elements: h[] = []
    const flushText = () => {
      if (!buffer) return
      // https://github.com/koishijs/koishi/issues/1050
      // https://github.com/koishijs/koishi/issues/1227
      elements.push(h.text(buffer.replace(/\\(.)/g, (_, char) => char)))
      buffer = ''
    }
    while (content) {
      if (content.startsWith('\\') && content.length > 1) {
        buffer += content[1]
        content = content.slice(2)
      } else if ((cap = /^(\((met|chn|rol)\))(\w+)\1/.exec(content))) {
        content = content.slice(cap[0].length)
        flushText()
        if (cap[2] === 'met') {
          if (cap[3] === 'all' || cap[3] === 'here') {
            elements.push(h('at', { type: cap[3] }))
          } else {
            const name = data.kmarkdown.mention_part.find(mention => mention.id === cap[3])?.username
            elements.push(h('at', { id: cap[3], name }))
          }
        } else if (cap[2] === 'chn') {
          elements.push(h.sharp(cap[3]))
        } else if (cap[2] === 'rol') {
          const name = data.kmarkdown.mention_role_part.find(mention => mention.role_id + '' === cap[3])?.name
          elements.push(h('at', { role: cap[3], name }))
        }
      } else {
        buffer += content[0]
        content = content.slice(1)
      }
    }
    flushText()
    message.content = elements.join('')
    message.elements = elements
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

function adaptMessageCreate(data: Kook.Data, meta: Kook.MessageExtra, session: Session) {
  session.guildId = meta.guild_id
  if (data.channel_type === 'GROUP') {
    session.isDirect = false
    session.channelId = data.target_id
  } else {
    session.isDirect = true
    session.channelId = meta.code
  }
  session.event.channel.name = meta.channel_name
  session.event.member = decodeGuildMember(data.extra.author)
  session.event.user = session.event.member.user
  delete session.event.member.user
  adaptMessageSession(data, meta, session.event.message = {}, session.event)
}

async function adaptMessageModify(bot: KookBot, data: Kook.Data, meta: Kook.NoticeBody, session: Session) {
  session.guildId = meta.guild_id
  // updated_private_message 事件会有两个不同的 author_id
  // 这里优先使用 meta.user_info，当不存在时使用 meta.author_id
  session.event.user = meta.user_info && adaptUser(meta.user_info)
  session.userId = meta.author_id
  // message_btn_click 事件会有两个不同的 channel_type
  // 其中 data.channel_type 永远是 PERSON (即使是群聊环境)
  // 但其他任何事件都未出现 meta.channel_type，因此这里做了 fallback
  if ((meta.channel_type || data.channel_type) === 'GROUP') {
    session.isDirect = false
    // updated_message 事件使用 meta.channel_id
    // message_btn_click 事件使用 meta.target_id
    session.channelId = meta.channel_id || meta.target_id
  } else {
    session.isDirect = true
    // 私聊环境的 message_btn_click 事件中拿不到 channel_id
    session.channelId = meta.chat_code || (await bot.createDirectChannel(session.userId)).id
  }
  adaptMessageSession(data, meta, session.event.message = {}, session.event)
}

function adaptReaction(data: Kook.Data, body: Kook.NoticeBody, session: Session) {
  if (data.channel_type === 'GROUP') {
    session.guildId = data.target_id
  }
  session.channelId = body.channel_id
  session.messageId = body.msg_id
  session.userId = body.user_id
  session['emoji'] = body.emoji.id
}

export async function adaptSession<C extends Context>(bot: KookBot<C>, input: any) {
  const session = bot.session()
  session.setInternal('kook', input)
  if (input.type === Kook.Type.system) {
    const { type, body } = input.extra as Kook.Notice
    bot.dispatch(bot.session({
      type: 'internal',
      _type: 'kook/' + type.replace(/_/g, '-'),
      _data: body,
    }))
    switch (type) {
      case 'message_btn_click':
        session.type = 'interaction/button'
        await adaptMessageModify(bot, input, body, session)
        session.event.button = {
          id: body.value,
        }
        break
      case 'updated_message':
      case 'updated_private_message':
        session.type = 'message-updated'
        await adaptMessageModify(bot, input, body, session)
        break
      case 'deleted_message':
      case 'deleted_private_message':
        session.type = 'message-deleted'
        await adaptMessageModify(bot, input, body, session)
        break
      case 'added_reaction':
      case 'private_added_reaction':
        session.type = 'reaction-added'
        adaptReaction(input, body, session)
        break
      case 'deleted_reaction':
      case 'private_deleted_reaction':
        session.type = 'reaction-deleted'
        adaptReaction(input, body, session)
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
        session.event.role = decodeRole(body)
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
