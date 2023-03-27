import { h, Session, Universal } from '@satorijs/satori'
import { DiscordBot } from './bot'
import * as Discord from './types'

export const adaptUser = (user: Discord.User): Universal.User => ({
  userId: user.id,
  avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  username: user.username,
  discriminator: user.discriminator,
  isBot: user.bot || false,
})

export const adaptGuild = (data: Discord.Guild): Universal.Guild => ({
  guildId: data.id,
  guildName: data.name,
})

export const adaptChannel = (data: Discord.Channel): Universal.Channel => ({
  channelId: data.id,
  channelName: data.name,
})

export const adaptAuthor = (author: Discord.User): Universal.Author => ({
  ...adaptUser(author),
  nickname: author.username,
})

export async function adaptMessage(bot: DiscordBot, meta: Discord.Message, session: Partial<Session> = {}) {
  const { platform } = bot

  prepareMessage(session, meta)
  session.messageId = meta.id
  session.timestamp = new Date(meta.timestamp).valueOf() || Date.now()
  if (meta.author) {
    session.author = adaptAuthor(meta.author)
    session.userId = meta.author.id
  }
  if (meta.member?.nick) {
    session.author.nickname = meta.member?.nick
  }

  // https://discord.com/developers/docs/reference#message-formatting
  session.content = ''
  if (meta.content) {
    session.content = meta.content
      .replace(/<@[!&]?(.+?)>/g, (_, id) => {
        if (meta.mention_roles.includes(id)) {
          return h('at', { role: id }).toString()
        } else {
          const user = meta.mentions?.find(u => u.id === id || `${u.username}#${u.discriminator}` === id)
          return h.at(id, { name: user?.username }).toString()
        }
      })
      .replace(/<a?:(.*):(.+?)>/g, (_, name, id) => {
        const animated = _[1] === 'a'
        return h('face', { id, name, animated, platform }, [
          h.image(`https://cdn.discordapp.com/emojis/${id}.gif?quality=lossless`),
        ]).toString()
      })
      .replace(/@everyone/g, () => h('at', { type: 'all' }).toString())
      .replace(/@here/g, () => h('at', { type: 'here' }).toString())
      .replace(/<#(.+?)>/g, (_, id) => {
        const channel = meta.mention_channels?.find(c => c.id === id)
        return h.sharp(id, { name: channel?.name }).toString()
      })
  }

  // embed 的 update event 太阴间了 只有 id embeds channel_id guild_id 四个成员
  if (meta.attachments?.length) {
    if (session.content) session.content += ' '
    session.content += meta.attachments.map(v => {
      if (v.height && v.width && v.content_type?.startsWith('image/')) {
        return h('image', {
          url: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
        })
      } else if (v.height && v.width && v.content_type?.startsWith('video/')) {
        return h('video', {
          url: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
        })
      } else if (v.content_type?.startsWith('audio/')) {
        return h('record', {
          url: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
        })
      } else {
        return h('file', {
          url: v.url,
          proxy_url: v.proxy_url,
          file: v.filename,
        })
      }
    }).join('')
  }
  for (const embed of meta.embeds) {
    // not using embed types
    // https://discord.com/developers/docs/resources/channel#embed-object-embed-types
    if (embed.image) {
      session.content += h('image', { url: embed.image.url, proxy_url: embed.image.proxy_url })
    }
    if (embed.thumbnail) {
      session.content += h('image', { url: embed.thumbnail.url, proxy_url: embed.thumbnail.proxy_url })
    }
    if (embed.video) {
      session.content += h('video', { url: embed.video.url, proxy_url: embed.video.proxy_url })
    }
  }
  session.elements = h.parse(session.content)
  // 遇到过 cross post 的消息在这里不会传消息 id
  if (meta.message_reference) {
    const { message_id, channel_id } = meta.message_reference
    session.quote = await bot.getMessage(channel_id, message_id)
  }
  return session as Universal.Message
}

export function prepareMessage(session: Partial<Session>, data: Partial<Discord.Message>) {
  session.guildId = data.guild_id
  session.subtype = data.guild_id ? 'group' : 'private'
  session.channelId = data.channel_id
}

function prepareReactionSession(session: Partial<Session>, data: any) {
  session.userId = data.user_id
  session.messageId = data.message_id
  session.guildId = data.guild_id
  session.channelId = data.channel_id
  session.subtype = data.guild_id ? 'group' : 'private'
  if (!data.emoji) return
  const { id, name } = data.emoji
  session.content = id ? `${name}:${id}` : name
}

export async function adaptSession(bot: DiscordBot, input: Discord.GatewayPayload) {
  const session = bot.session()
  if (input.t === 'MESSAGE_CREATE') {
    session.type = 'message'
    await adaptMessage(bot, input.d, session)
    // dc 情况特殊 可能有 embeds 但是没有消息主体
    // if (!session.content) return
  } else if (input.t === 'MESSAGE_UPDATE') {
    session.type = 'message-updated'
    const msg = await bot.internal.getChannelMessage(input.d.channel_id, input.d.id)
    // Unlike creates, message updates may contain only a subset of the full message object payload
    // https://discord.com/developers/docs/topics/gateway-events#message-update
    await adaptMessage(bot, msg, session)
    // if (!session.content) return
  } else if (input.t === 'MESSAGE_DELETE') {
    session.type = 'message-deleted'
    session.messageId = input.d.id
    prepareMessage(session, input.d)
  } else if (input.t === 'MESSAGE_REACTION_ADD') {
    session.type = 'reaction-added'
    prepareReactionSession(session, input.d)
  } else if (input.t === 'MESSAGE_REACTION_REMOVE') {
    session.type = 'reaction-deleted'
    session.subtype = 'one'
    prepareReactionSession(session, input.d)
  } else if (input.t === 'MESSAGE_REACTION_REMOVE_ALL') {
    session.type = 'reaction-deleted'
    session.subtype = 'all'
    prepareReactionSession(session, input.d)
  } else if (input.t === 'MESSAGE_REACTION_REMOVE_EMOJI') {
    session.type = 'reaction-deleted'
    session.subtype = 'emoji'
    prepareReactionSession(session, input.d)
  } else if (input.t === 'CHANNEL_UPDATE') {
    session.type = 'channel-updated'
    session.guildId = input.d.guild_id
    session.subtype = input.d.guild_id ? 'group' : 'private'
    session.channelId = input.d.id
  } else {
    return
  }
  return session
}
