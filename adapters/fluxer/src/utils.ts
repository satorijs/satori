import { Context, h, Session, Universal } from '@satorijs/core'
import { FluxerBot } from './bot'
import { currentCdn } from './discovery'
import * as Fluxer from './types'

export * from './types'

export const sanitize = (val: string) =>
  val
    .replace(/[\\*_`~|()\[\]]/g, '\\$&')
    .replace(/@everyone/g, () => '\\@everyone')
    .replace(/@here/g, () => '\\@here')

// Inline code has no escape for a backtick, so a zero-width space is used as a fallback.
export const sanitizeCode = (val: string) => val.replace(/(?<=`)(?=`)/g, '\u200b')

export const decodeUser = (user: Fluxer.User): Universal.User => ({
  id: user.id,
  nick: user.global_name,
  name: user.username,
  userId: user.id,
  avatar: currentCdn?.avatar(user.id, user.avatar),
  username: user.username,
  discriminator: user.discriminator,
  isBot: user.bot || false,
})

export const decodeGuildMember = (member: Partial<Fluxer.GuildMember>): Universal.GuildMember => ({
  user: member.user && decodeUser(member.user),
  nick: member.nick,
  roles: member.roles?.map(id => ({ id })),
  joinedAt: member.joined_at ? new Date(member.joined_at).valueOf() : undefined,
})

export const decodeGuild = (data: Fluxer.Guild): Universal.Guild => ({
  id: data.id,
  name: data.name,
  avatar: currentCdn?.guildIcon(data.id, data.icon),
})

export const decodeChannel = (data: Fluxer.Channel): Universal.Channel => ({
  id: data.id,
  name: data.name,
  type: data.type === Fluxer.ChannelType.DM ? Universal.Channel.Type.DIRECT
    : data.type === Fluxer.ChannelType.GUILD_VOICE ? Universal.Channel.Type.VOICE
      : data.type === Fluxer.ChannelType.GUILD_CATEGORY ? Universal.Channel.Type.CATEGORY
        : Universal.Channel.Type.TEXT,
  parentId: data.parent_id,
  position: data.position,
})

export const decodeRole = (role: Fluxer.Role): Universal.GuildRole => ({
  ...role,
  permissions: BigInt(role.permissions),
})

export const encodeRole = (role: Partial<Universal.GuildRole>): Partial<Fluxer.Role> => ({
  ...role,
  permissions: role.permissions ? '' + role.permissions : undefined,
})

export async function decodeMessage<C extends Context = Context>(
  bot: FluxerBot<C>,
  data: Fluxer.Message,
  message: Universal.Message,
  payload: Universal.MessageLike = message,
  details = true,
) {
  const { platform } = bot

  message.id = message.messageId = data.id
  message.content = ''
  if (data.content) {
    message.content = data.content
      .replace(/<@[!&]?(.+?)>/g, (_, id) => {
        if (data.mention_roles?.includes(id)) {
          return h('at', { role: id }).toString()
        } else {
          const user = data.mentions?.find(u => u.id === id || `${u.username}#${u.discriminator}` === id)
          return h.at(id, { name: user?.username }).toString()
        }
      })
      .replace(/<a?:(.*):(.+?)>/g, (_, name, id) => {
        const animated = _[1] === 'a'
        return h('face', { id, name, animated, platform }, [
          h.image(currentCdn?.emoji(id, animated) ?? ''),
        ]).toString()
      })
      .replace(/@everyone/g, () => h('at', { type: 'all' }).toString())
      .replace(/@here/g, () => h('at', { type: 'here' }).toString())
      .replace(/<#(.+?)>/g, (_, id) => {
        const channel = data.mention_channels?.find((c: any) => c.id === id)
        return h.sharp(id, { name: channel?.name }).toString()
      })
  }

  if (data.stickers) {
    message.content += data.stickers.map((s: any) => h('sticker', {
      id: s.id,
      name: s.name,
      animated: s.animated,
    }, [
      h.image(currentCdn?.sticker(s.id, s.animated) ?? ''),
    ])).join('')
  }

  if (data.attachments?.length) {
    if (!/\s$/.test(message.content)) message.content += ' '
    message.content += data.attachments.map(v => {
      if (v.height && v.width && v.content_type?.startsWith('image/')) {
        return h('img', {
          src: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
          type: v.content_type,
          width: v.width,
          height: v.height,
        })
      } else if (v.height && v.width && v.content_type?.startsWith('video/')) {
        return h('video', {
          src: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
          type: v.content_type,
          width: v.width,
          height: v.height,
          size: v.size,
        })
      } else if (v.content_type?.startsWith('audio/')) {
        return h('record', {
          src: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
          type: v.content_type,
          size: v.size,
        })
      } else {
        return h('file', {
          src: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
          type: v.content_type,
          size: v.size,
        })
      }
    }).join('')
  }
  for (const embed of data.embeds ?? []) {
    if (embed.image) {
      message.content += h('img', { src: embed.image.url, proxy_url: embed.image.proxy_url })
    }
    if (embed.thumbnail) {
      message.content += h('img', { src: embed.thumbnail.url, proxy_url: embed.thumbnail.proxy_url })
    }
    if (embed.video) {
      message.content += h('video', { src: embed.video.url, proxy_url: embed.video.proxy_url })
    }
  }
  message.elements = h.parse(message.content)

  if (details && data.type === Fluxer.Message.Type.REPLY) {
    const { message_id, channel_id, guild_id } = data.message_reference
    try {
      message.quote = await bot.getMessage(channel_id!, message_id)
    } catch (e) {
      bot.logger.warn('failed to fetch quote message, channelId: %s, messageId: %s', data.channel_id, data.id)
      bot.logger.warn(e)
      message.quote = {
        id: message_id,
        // @ts-expect-error
        channel: { id: channel_id },
        guild: { id: guild_id },
      }
    }
  }

  message.createdAt = new Date(data.timestamp).valueOf()
  message.updatedAt = data.edited_timestamp ? new Date(data.edited_timestamp).valueOf() : undefined
  if (!payload) return message
  const member = (data as any).member
  payload.channel = {
    id: data.channel_id,
    type: member ? Universal.Channel.Type.TEXT : Universal.Channel.Type.DIRECT,
  }
  payload.user = decodeUser(data.author)
  payload.member = member && decodeGuildMember(member)
  payload.timestamp = new Date(data.timestamp).valueOf()
  return message
}

export function setupMessageGuildId(session: Session, guildId?: string) {
  session.guildId = guildId
  session.isDirect = !guildId
  session.subtype = guildId ? 'group' : 'private'
}

type ReactionEvent = {
  user_id: string
  message_id: string
  channel_id: string
  guild_id?: string
  emoji: { id?: string | null; name?: string | null }
  user?: any
  member?: any
}

function setupReaction(session: Session, data: ReactionEvent) {
  session.userId = data.user_id
  session.messageId = data.message_id
  session.guildId = data.guild_id
  session.channelId = data.channel_id
  session.isDirect = !data.guild_id
  session.subtype = data.guild_id ? 'group' : 'private'
  if (!data.emoji) return
  const { id, name } = data.emoji
  session.content = id ? `${name}:${id}` : name
}

/** 记录每个频道最近一次 pin 时间，用来区分置顶与取消（事件本身不带方向） */
const pinTimestamps = new Map<string, number>()

export async function adaptSession<C extends Context>(bot: FluxerBot<C>, input: Fluxer.Gateway.Payload) {
  const session = bot.session()
  session.setInternal('fluxer', input)
  if (input.t === 'MESSAGE_CREATE') {
    setupMessageGuildId(session, input.d.guild_id)
    session.type = 'message'
    await decodeMessage(bot, input.d, session.event.message = {}, session.event)
    // 空壳消息（引用/表情/附件载体）不派发：Satori 的惯例是空消息不进入消费者
    if (!session.content && !session.event.message?.elements?.length) return
  } else if (input.t === 'MESSAGE_UPDATE') {
    session.type = 'message-updated'
    // update 事件只带部分字段，按 id 取全量再解码
    const full = await bot.internal.getChannelMessage(input.d.channel_id!, input.d.id!) as Fluxer.Message
    await decodeMessage(bot, full, session.event.message = {}, session.event)
    const channel = await bot.internal.getChannel(input.d.channel_id!)
    setupMessageGuildId(session, channel.guild_id)
  } else if (input.t === 'MESSAGE_DELETE') {
    session.type = 'message-deleted'
    session.messageId = input.d.id
    session.channelId = input.d.channel_id
    setupMessageGuildId(session, input.d.guild_id)
  } else if (input.t === 'MESSAGE_REACTION_ADD') {
    session.type = 'reaction-added'
    setupReaction(session, input.d)
  } else if (input.t === 'MESSAGE_REACTION_REMOVE') {
    session.type = 'reaction-deleted'
    session.subtype = 'one'
    setupReaction(session, input.d)
  } else if (input.t === 'MESSAGE_REACTION_REMOVE_ALL') {
    session.type = 'reaction-deleted'
    session.subtype = 'all'
    setupReaction(session, input.d)
  } else if (input.t === 'MESSAGE_REACTION_REMOVE_EMOJI') {
    session.type = 'reaction-deleted'
    session.subtype = 'emoji'
    setupReaction(session, input.d)
  } else if (input.t === 'GUILD_ROLE_CREATE') {
    session.type = 'guild-role-added'
    session.guildId = input.d.guild_id
    session.roleId = input.d.role.id
    session.event.role = decodeRole(input.d.role)
  } else if (input.t === 'GUILD_ROLE_UPDATE') {
    session.type = 'guild-role-updated'
    session.guildId = input.d.guild_id
    session.roleId = input.d.role.id
    session.event.role = decodeRole(input.d.role)
  } else if (input.t === 'GUILD_ROLE_DELETE') {
    session.type = 'guild-role-deleted'
    session.guildId = input.d.guild_id
    session.roleId = input.d.role_id
  } else if (input.t === 'GUILD_MEMBER_ADD') {
    session.type = 'guild-member-added'
    session.guildId = input.d.guild_id
    session.userId = input.d.user?.id
    session.event.member = decodeGuildMember(input.d)
    if (session.event.member.user) {
      session.event.user = session.event.member.user
      delete session.event.member.user
    }
    session.timestamp = input.d.joined_at ? new Date(input.d.joined_at).valueOf() : Date.now()
  } else if (input.t === 'GUILD_MEMBER_REMOVE') {
    session.type = 'guild-member-removed'
    session.guildId = input.d.guild_id
    session.userId = input.d.user.id
    session.event.user = decodeUser(input.d.user)
  } else if (input.t === 'GUILD_MEMBER_UPDATE') {
    session.type = 'guild-member-updated'
    session.guildId = input.d.guild_id
    session.userId = input.d.user?.id
    session.event.member = decodeGuildMember({
      user: input.d.user,
      nick: input.d.nick,
      roles: input.d.roles,
      joined_at: input.d.joined_at,
    })
    if (session.event.member.user) {
      session.event.user = session.event.member.user
      delete session.event.member.user
    }
  } else if (input.t === 'CHANNEL_CREATE') {
    session.type = 'channel-added'
    session.guildId = input.d.guild_id
    session.channelId = input.d.id
    session.event.channel = decodeChannel(input.d)
  } else if (input.t === 'CHANNEL_UPDATE') {
    session.type = 'channel-updated'
    session.guildId = input.d.guild_id
    session.channelId = input.d.id
    session.event.channel = decodeChannel(input.d)
  } else if (input.t === 'TYPING_START') {
    session.type = 'typing'
    session.guildId = input.d.guild_id
    session.channelId = input.d.channel_id
    session.userId = input.d.user_id
    session.timestamp = input.d.timestamp ? new Date(input.d.timestamp).valueOf() : Date.now()
  } else if (input.t === 'SESSIONS_REPLACE') {
    session.type = 'presence-updated'
    session.userId = bot.selfId
    ;(session.event as any).presences = input.d
  } else if (input.t === 'CHANNEL_PINS_UPDATE') {
    // 事件不带方向，按时间戳与上次比对区分置顶/取消
    const channelId = input.d.channel_id
    const pinnedAt = input.d.last_pin_timestamp ? new Date(input.d.last_pin_timestamp).valueOf() : 0
    const previous = pinTimestamps.get(channelId)
    pinTimestamps.set(channelId, pinnedAt)
    session.type = (previous !== undefined && pinnedAt <= previous) ? 'message-unpinned' : 'message-pinned'
    session.guildId = input.d.guild_id
    session.channelId = channelId
    session.event.channel = { id: channelId, type: Universal.Channel.Type.TEXT }
  } else if (input.t === 'THREAD_CREATE' || input.t === 'THREAD_UPDATE') {
    session.type = 'channel-updated'
    session.guildId = input.d.guild_id
    session.channelId = input.d.id
    session.event.channel = decodeChannel(input.d)
  } else if (input.t === 'THREAD_DELETE') {
    session.type = 'channel-removed'
    session.guildId = input.d.guild_id
    session.channelId = input.d.id
    session.event.channel = decodeChannel(input.d)
  } else if (input.t === 'CHANNEL_DELETE') {
    session.type = 'channel-removed'
    session.guildId = input.d.guild_id
    session.channelId = input.d.id
    session.event.channel = decodeChannel(input.d)
  } else {
    return
  }
  return session
}
