import { defineProperty, h, pick, Session, Universal } from '@satorijs/satori'
import { DiscordBot } from './bot'
import * as Discord from './types'

export * from './types'

export const sanitize = (val: string) =>
  val
    .replace(/[\\*_`~|()\[\]]/g, '\\$&')
    .replace(/@everyone/g, () => '\\@everyone')
    .replace(/@here/g, () => '\\@here')

export const decodeUser = (user: Discord.User): Universal.User => ({
  userId: user.id,
  avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  username: user.username,
  discriminator: user.discriminator,
  isBot: user.bot || false,
})

export const decodeGuild = (data: Discord.Guild): Universal.Guild => ({
  guildId: data.id,
  guildName: data.name,
})

export const decodeChannel = (data: Discord.Channel): Universal.Channel => ({
  channelId: data.id,
  channelName: data.name,
})

export const decodeAuthor = (author: Discord.User): Universal.Author => ({
  ...decodeUser(author),
  nickname: author.username,
})

export const decodeRole = (role: Discord.Role): Universal.Role => ({
  ...role,
  permissions: BigInt(role.permissions),
})

export const encodeRole = (role: Partial<Universal.Role>): Partial<Discord.Role> => ({
  ...role,
  permissions: role.permissions && '' + role.permissions,
})

export async function decodeMessage(bot: DiscordBot, meta: Discord.Message, session: Partial<Session> = {}) {
  const { platform } = bot

  setupMessage(session, meta)
  session.messageId = meta.id
  session.timestamp = new Date(meta.timestamp).valueOf() || Date.now()
  if (meta.author) {
    session.author = decodeAuthor(meta.author)
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

export function setupMessage(session: Partial<Session>, data: Partial<Discord.Message>) {
  session.guildId = data.guild_id
  session.isDirect = !data.guild_id
  session.subtype = data.guild_id ? 'group' : 'private'
  session.channelId = data.channel_id
}

type ReactionEvent = Partial<
  & Discord.Reaction.Event.Add
  & Discord.Reaction.Event.Remove
  & Discord.Reaction.Event.RemoveAll
  & Discord.Reaction.Event.RemoveEmoji>

function setupReaction(session: Partial<Session>, data: ReactionEvent) {
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

export async function adaptSession(bot: DiscordBot, input: Discord.GatewayPayload) {
  const session = bot.session()
  defineProperty(session, 'discord', Object.assign(Object.create(bot.internal), input))
  if (input.t === 'MESSAGE_CREATE') {
    if (input.d.webhook_id) {
      const webhook = await bot.ensureWebhook(input.d.channel_id)
      if (webhook.id === input.d.webhook_id) {
        // koishi's webhook
        return
      }
    }
    session.type = 'message'
    await decodeMessage(bot, input.d, session)
    // dc 情况特殊 可能有 embeds 但是没有消息主体
    // if (!session.content) return
  } else if (input.t === 'MESSAGE_UPDATE') {
    session.type = 'message-updated'
    const msg = await bot.internal.getChannelMessage(input.d.channel_id, input.d.id)
    // Unlike creates, message updates may contain only a subset of the full message object payload
    // https://discord.com/developers/docs/topics/gateway-events#message-update
    await decodeMessage(bot, msg, session)
    // if (!session.content) return
  } else if (input.t === 'MESSAGE_DELETE') {
    session.type = 'message-deleted'
    session.messageId = input.d.id
    setupMessage(session, input.d)
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
  } else if (input.t === 'INTERACTION_CREATE' && input.d.type === Discord.Interaction.Type.APPLICATION_COMMAND) {
    const data = input.d.data as Discord.InteractionData.ApplicationCommand
    const command = bot.commands.find(cmd => cmd.name === data.name)
    if (!command) return
    await bot.internal.createInteractionResponse(input.d.id, input.d.token, {
      type: Discord.Interaction.CallbackType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    })
    session.type = 'interaction/command'
    session.isDirect = !input.d.guild_id
    session.subtype = input.d.guild_id ? 'group' : 'private'
    session.channelId = input.d.channel_id
    session.guildId = input.d.guild_id
    session.userId = input.d.member.user.id
    session.messageId = input.d.id
    session.content = ''
    session.data = {
      command: decodeArgv(data, command),
    }
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

const types = {
  text: Discord.ApplicationCommand.OptionType.STRING,
  string: Discord.ApplicationCommand.OptionType.STRING,
  boolean: Discord.ApplicationCommand.OptionType.BOOLEAN,
  number: Discord.ApplicationCommand.OptionType.NUMBER,
  integer: Discord.ApplicationCommand.OptionType.INTEGER,
  posint: Discord.ApplicationCommand.OptionType.INTEGER,
  user: Discord.ApplicationCommand.OptionType.STRING,
  channel: Discord.ApplicationCommand.OptionType.STRING,
  guild: Discord.ApplicationCommand.OptionType.STRING,
}

export const encodeCommand = (cmd: Universal.Command): Discord.ApplicationCommand.Params.Create => ({
  name: cmd.name,
  type: Discord.ApplicationCommand.Type.CHAT_INPUT,
  description: cmd.description[''] || cmd.name,
  description_localizations: pick(cmd.description, Discord.Locale),
  options: encodeCommandOptions(cmd),
})

const decodeArgv = (data: Discord.InteractionData.ApplicationCommand, command: Universal.Command) => {
  const result = { name: data.name, arguments: [], options: {} } as Universal.EventData.Command
  for (const argument of command.arguments) {
    const value = data.options?.find(opt => opt.name === argument.name)?.value
    if (value !== undefined) result.arguments.push(value)
  }
  for (const option of command.options) {
    const value = data.options?.find(opt => opt.name === option.name)?.value
    if (value !== undefined) result.options[option.name] = value
  }
  return result
}

export function encodeCommandOptions(cmd: Universal.Command): Discord.ApplicationCommand.Option[] {
  const result: Discord.ApplicationCommand.Option[] = []
  if (cmd.children.length) {
    result.push(...cmd.children.map(child => ({
      name: child.name.slice(cmd.name.length + 1),
      type: child.children.length
        ? Discord.ApplicationCommand.OptionType.SUB_COMMAND_GROUP
        : Discord.ApplicationCommand.OptionType.SUB_COMMAND,
      options: encodeCommandOptions(child),
      description: cmd.description[''] || child.name,
      description_localizations: pick(cmd.description, Discord.Locale),
    })))
  } else {
    for (const arg of cmd.arguments) {
      result.push({
        name: arg.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        description: arg.description[''] || arg.name,
        description_localizations: pick(arg.description, Discord.Locale),
        type: types[arg.type] ?? types.text,
        required: arg.required ?? false,
      })
    }
    for (const option of cmd.options) {
      result.push({
        name: option.name.toLowerCase(),
        description: option.description[''] || option.name,
        description_localizations: pick(option.description, Discord.Locale),
        type: types[option.type] ?? types.text,
        required: option.required ?? false,
        min_value: option.type === 'posint' ? 1 : undefined,
      })
    }
  }
  return result.sort((a, b) => +b.required - +a.required)
}
