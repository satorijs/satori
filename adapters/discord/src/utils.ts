import { Context, Dict, h, pick, Session, Universal, valueMap } from '@satorijs/core'
import { rulesExtended, SimpleMarkdown } from 'discord-markdown-parser'
import { DiscordBot } from './bot'
import * as Discord from './types'

export * from './types'

export const sanitize = (val: string) =>
  val
    .replace(/[\\*_`~|()\[\]<]/g, '\\$&')
    .replace(/@everyone/g, () => '\\@everyone')
    .replace(/@here/g, () => '\\@here')

// discord has no way to escape ` in code/codeblock, so we use zero-width space as a fallback.
// we don't need or have to do any escape other than ` in code/codeblock.
export const sanitizeCode = (val: string) => val.replace(/(?<=`)(?=`)/g, '\u200b')

export const decodeUser = (user: Discord.User): Universal.User => ({
  id: user.id,
  nick: user.global_name,
  name: user.username,
  userId: user.id,
  avatar: user.avatar && `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
  username: user.username,
  discriminator: user.discriminator,
  isBot: user.bot || false,
})

export const decodeGuildMember = (member: Partial<Discord.GuildMember>): Universal.GuildMember => ({
  user: member.user && decodeUser(member.user),
  nick: member.nick,
  roles: member.roles?.map(id => ({ id })),
  joinedAt: member.joined_at ? new Date(member.joined_at).valueOf() : undefined,
})

export const decodeGuild = (data: Discord.Guild): Universal.Guild => ({
  id: data.id,
  name: data.name,
  avatar: data.icon && `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.webp?size=240`,
})

export const decodeChannel = (data: Discord.Channel): Universal.Channel => ({
  id: data.id,
  name: data.name,
  type: data.type === Discord.Channel.Type.DM ? Universal.Channel.Type.DIRECT
    : data.type === Discord.Channel.Type.GUILD_VOICE ? Universal.Channel.Type.VOICE
      : data.type === Discord.Channel.Type.GUILD_CATEGORY ? Universal.Channel.Type.CATEGORY
        : Universal.Channel.Type.TEXT,
  parentId: data.parent_id,
  position: data.position,
})

export const decodeRole = (role: Discord.Role): Universal.GuildRole => ({
  ...role,
  permissions: BigInt(role.permissions),
})

export const encodeRole = (role: Partial<Universal.GuildRole>): Partial<Discord.Role> => ({
  ...role,
  permissions: role.permissions ? '' + role.permissions : undefined,
})

interface MarkdownNode {
  type: string
  [key: string]: any
}

const inlineRule = (regexp: RegExp, parse: (capture: RegExpExecArray) => object) => ({
  order: SimpleMarkdown.defaultRules.strong.order,
  match: (source: string) => regexp.exec(source),
  parse,
})

// https://discord.com/developers/docs/reference#message-formatting
const parseMarkdown = SimpleMarkdown.parserFor({
  ...rulesExtended,
  // parser lib misses the `s` and `S` styles
  timestamp: inlineRule(/^<t:(-?\d+)(?::([tTdDfFsSR]))?>/, ([, timestamp, format]) => ({ timestamp, format })),
  // parser lib expects `<GUILD_ID:TYPE>`, it doesn't work. Use `<id:TYPE>`
  guildNavigation: inlineRule(/^<id:(customize|browse|guide|linked-roles)(?::(\d+))?>/, ([, navigation, roleId]) => ({ navigation, roleId })),
  gameProfile: inlineRule(/^<@\$(\d+)>/, ([, id]) => ({ id })),
})

function decodeMarkdown(nodes: MarkdownNode[], data: Discord.Message, platform: string): h[] {
  const result: h[] = []
  for (const node of nodes) {
    const children = () => decodeMarkdown(node.content, data, platform)
    let element: h | h[]
    switch (node.type) {
      case 'text': element = h.text(node.content); break
      case 'br': element = h('br'); break
      case 'strong': element = h('b', children()); break
      case 'em': element = h('i', children()); break
      case 'underline': element = h('u', children()); break
      case 'strikethrough': element = h('s', children()); break
      case 'spoiler': element = h('spl', children()); break
      case 'inlineCode': element = h('code', [h.text(node.content)]); break
      case 'codeBlock': element = h('code-block', { language: node.lang || undefined }, [h.text(node.content)]); break
      case 'blockQuote': element = h('blockquote', children()); break
      case 'url':
      case 'autolink':
      // case 'link': element = h.text(node.target); break
      case 'link': element = h('a', { href: node.target }, children()); break
      case 'heading':
      case 'subtext': element = node === nodes[nodes.length - 1] ? children() : [...children(), h('br')]; break
      case 'user': {
        const user = data.mentions?.find(u => u.id === node.id)
        element = h.at(node.id, { name: user?.username })
        break
      }
      case 'role': element = h('at', { role: node.id }); break
      case 'everyone': element = h('at', { type: 'all' }); break
      case 'here': element = h('at', { type: 'here' }); break
      case 'channel': {
        const channel = data.mention_channels?.find(c => c.id === node.id)
        element = h.sharp(node.id, { name: channel?.name })
        break
      }
      case 'emoji':
        element = h('emoji', { id: node.id, name: node.name, animated: node.animated, platform }, [
          h.image(`https://cdn.discordapp.com/emojis/${node.id}.webp?quality=lossless`),
        ])
        break
      case 'slashCommand': element = h.text(`/${node.fullName ?? ''}`); break
      case 'timestamp':
        element = h('discord:timestamp', { value: node.timestamp, style: node.format }, [h.text(node.timestamp)])
        break
      case 'guildNavigation': element = h('discord:navigation', { type: node.navigation, id: node.roleId }); break
      case 'gameProfile': element = h('discord:game-profile', { id: node.id }); break
      default: element = Array.isArray(node.content) ? children() : []
    }
    for (const item of [element].flat()) {
      const last = result[result.length - 1]
      if (item.type === 'text' && last?.type === 'text') {
        last.attrs.content += item.attrs.content
      } else {
        result.push(item)
      }
    }
  }
  return result
}

function decodeContent(data: Discord.Message, platform: string): h[] {
  const nodes = parseMarkdown(data.content, { inline: true }) as MarkdownNode[]
  return decodeMarkdown(nodes, data, platform)
}

export async function decodeMessage<C extends Context = Context>(
  bot: DiscordBot<C>,
  data: Discord.Message,
  message: Universal.Message,
  payload: Universal.MessageLike = message,
  details = true,
) {
  const { platform } = bot

  message.id = message.messageId = data.id
  // https://discord.com/developers/docs/reference#message-formatting
  const elements = data.content ? decodeContent(data, platform) : []

  if (data.sticker_items) {
    elements.push(...data.sticker_items.map(s => h('sticker', {
      id: s.id,
      format_type: s.format_type,
      name: s.name,
    }, [
      h.image(`https://media.discordapp.net/stickers/${s.id}.webp?size=160`),
    ])))
  }

  // embed 的 update event 太阴间了 只有 id embeds channel_id guild_id 四个成员
  if (data.attachments?.length) {
    const last = elements[elements.length - 1]
    if (last?.type !== 'text') elements.push(h.text(' '))
    else if (!/\s$/.test(last.attrs.content)) last.attrs.content += ' '
    elements.push(...data.attachments.map(v => {
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
    }))
  }
  for (const embed of data.embeds) {
    // not using embed types
    // https://discord.com/developers/docs/resources/channel#embed-object-embed-types
    if (embed.image) {
      elements.push(h('img', { src: embed.image.url, proxy_url: embed.image.proxy_url }))
    }
    if (embed.thumbnail) {
      elements.push(h('img', { src: embed.thumbnail.url, proxy_url: embed.thumbnail.proxy_url }))
    }
    if (embed.video) {
      elements.push(h('video', { src: embed.video.url, proxy_url: embed.video.proxy_url }))
    }
  }
  message.elements = elements
  message.content = elements.join('')
  // 遇到过 cross post 的消息在这里不会传消息 id
  // https://github.com/satorijs/satori/issues/306
  // THREAD_CREATED (18) 事件下，message_reference 没有 message_id
  // THREAD_STARTER_MESSAGE (21) 事件下，message_reference 有 message_id
  if (details && data.message_reference?.message_id) {
    const { message_id, channel_id } = data.message_reference
    message.quote = await bot.getMessage(channel_id!, message_id, false)
  }

  message.createdAt = new Date(data.timestamp).valueOf()
  message.updatedAt = data.edited_timestamp ? new Date(data.edited_timestamp).valueOf() : undefined
  if (!payload) return message
  payload.channel = {
    id: data.channel_id,
    type: data.member ? Universal.Channel.Type.TEXT : Universal.Channel.Type.DIRECT,
  }
  payload.user = decodeUser(data.author)
  payload.member = data.member && decodeGuildMember(data.member)
  payload.timestamp = new Date(data.timestamp).valueOf()
  return message
}

export function setupMessageGuildId(session: Session, guildId?: string) {
  session.guildId = guildId
  session.isDirect = !guildId
  session.subtype = guildId ? 'group' : 'private'
}

type ReactionEvent = Partial<
  & Discord.Reaction.Event.Add
  & Discord.Reaction.Event.Remove
  & Discord.Reaction.Event.RemoveAll
  & Discord.Reaction.Event.RemoveEmoji>

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

export async function adaptSession<C extends Context>(bot: DiscordBot<C>, input: Discord.Gateway.Payload) {
  const session = bot.session()
  session.setInternal('discord', input)
  if (input.t === 'MESSAGE_CREATE') {
    setupMessageGuildId(session, input.d.guild_id)
    if (input.d.webhook_id && !session.isDirect) {
      try {
        // 403 Missing Permissions
        const webhook = await bot.ensureWebhook(input.d.channel_id)
        // koishi's webhook
        if (webhook.id === input.d.webhook_id) return
      } catch (e) { }
    }
    session.type = 'message'
    await decodeMessage(bot, input.d, session.event.message = {}, session.event)
    // dc 情况特殊 可能有 embeds 但是没有消息主体
    // if (!session.content) return
  } else if (input.t === 'MESSAGE_UPDATE') {
    session.type = 'message-updated'
    const message = await bot._getMessage(input.d.channel_id!, input.d.id!)
    // Unlike creates, message updates may contain only a subset of the full message object payload
    // https://discord.com/developers/docs/topics/gateway-events#message-update
    await decodeMessage(bot, message, session.event.message = {}, session.event)
    const channel = await bot.internal.getChannel(input.d.channel_id!)
    setupMessageGuildId(session, channel.guild_id)
    // if (!session.content) return
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
    session.type = 'guild-role-added'
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
    session.userId = session.isDirect ? input.d.user!.id : input.d.member!.user!.id
    session.messageId = input.d.id
    session.content = ''
    session.event.argv = decodeArgv(data, command)
  } else if (input.t === 'INTERACTION_CREATE' && input.d.type === Discord.Interaction.Type.MODAL_SUBMIT) {
    const data = input.d.data as Discord.InteractionData.ModalSubmit
    if (!data.custom_id.startsWith('input') && !data.custom_id.includes(':')) return
    // @ts-ignore
    const user_input = data.components[0].components[0].value
    await bot.internal.createInteractionResponse(input.d.id, input.d.token, {
      type: Discord.Interaction.CallbackType.DEFERRED_UPDATE_MESSAGE,
    })
    session.type = 'interaction/command'
    session.isDirect = !input.d.guild_id
    session.subtype = input.d.guild_id ? 'group' : 'private'
    session.channelId = input.d.channel_id
    session.guildId = input.d.guild_id
    session.userId = session.isDirect ? input.d.user!.id : input.d.member!.user!.id
    session.messageId = input.d.id
    session.content = user_input
  } else if (input.t === 'INTERACTION_CREATE' && input.d.type === Discord.Interaction.Type.MESSAGE_COMPONENT) {
    const id = (input.d.data as Discord.InteractionData.MessageComponent).custom_id
    if (id.startsWith('input') && id.includes(':')) {
      await bot.internal.createInteractionResponse(input.d.id, input.d.token, {
        type: Discord.Interaction.CallbackType.MODAL,
        data: {
          custom_id: id,
          title: 'Input',
          components: [{
            type: Discord.ComponentType.ACTION_ROW,
            components: [{
              custom_id: id,
              type: Discord.ComponentType.TEXT_INPUT,
              label: 'Command',
              value: id.slice(id.indexOf(':') + 1),
              style: 1,
            }],
          }],
        },
      })
    } else {
      await bot.internal.createInteractionResponse(input.d.id, input.d.token, {
        type: Discord.Interaction.CallbackType.DEFERRED_UPDATE_MESSAGE,
      })
    }
    session.type = 'interaction/button'
    session.isDirect = !input.d.guild_id
    session.channelId = input.d.channel_id
    session.guildId = input.d.guild_id
    session.userId = session.isDirect ? input.d.user!.id : input.d.member!.user!.id
    session.messageId = input.d.id
    session.content = ''
    session.event.button = {
      id,
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

const types = {
  text: Discord.ApplicationCommand.OptionType.STRING,
  string: Discord.ApplicationCommand.OptionType.STRING,
  boolean: Discord.ApplicationCommand.OptionType.BOOLEAN,
  number: Discord.ApplicationCommand.OptionType.NUMBER,
  integer: Discord.ApplicationCommand.OptionType.INTEGER,
  posint: Discord.ApplicationCommand.OptionType.INTEGER,
  natural: Discord.ApplicationCommand.OptionType.INTEGER,
  bigint: Discord.ApplicationCommand.OptionType.INTEGER,
  user: Discord.ApplicationCommand.OptionType.STRING,
  channel: Discord.ApplicationCommand.OptionType.STRING,
  guild: Discord.ApplicationCommand.OptionType.STRING,
}

interface Description {
  name: string
  description: Dict<string>
}

const trimDescription = (source: string) => {
  if (!source || source.length < 96) return source
  return source.slice(0, 93) + '...'
}

const encodeDescription = (object: Description) => ({
  description: trimDescription(object.description[''] || object.name),
  description_localizations: valueMap(pick(object.description, Discord.Locale), trimDescription),
})

export const encodeCommand = (cmd: Universal.Command): Discord.ApplicationCommand.Params.Create => ({
  ...encodeDescription(cmd),
  name: cmd.name,
  type: Discord.ApplicationCommand.Type.CHAT_INPUT,
  options: encodeCommandOptions(cmd),
})

const decodeArgv = (
  data: Discord.InteractionData.ApplicationCommand | Discord.InteractionData.ApplicationCommand.Option,
  command: Universal.Command,
) => {
  const result = { name: command.name, arguments: [], options: {} } as Universal.Argv
  const options = data.options
  if (!options) return result
  const dataChild = options[0]
  if (dataChild && (
    // eslint-disable-next-line operator-linebreak
    dataChild.type === Discord.ApplicationCommand.OptionType.SUB_COMMAND ||
    dataChild.type === Discord.ApplicationCommand.OptionType.SUB_COMMAND_GROUP
  )) {
    const commandChild = command.children.find(cmd => cmd.name.endsWith('.' + dataChild.name))
    return commandChild ? decodeArgv(dataChild, commandChild) : result
  }
  for (const argument of command.arguments) {
    const name = argument.name.toLowerCase()
    const value = options.find(opt => opt.name === name)?.value
    if (value !== undefined) result.arguments.push(value)
  }
  for (const option of command.options) {
    const name = option.name.toLowerCase()
    const value = options.find(opt => opt.name === name)?.value
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
      description: child.description[''] || child.name,
      description_localizations: pick(child.description, Discord.Locale),
    })))
  } else {
    for (const arg of cmd.arguments) {
      result.push({
        ...encodeDescription(arg),
        name: arg.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        type: types[arg.type] ?? types.text,
        required: arg.required ?? false,
      })
    }
    for (const option of cmd.options) {
      result.push({
        ...encodeDescription(option),
        name: option.name.toLowerCase(),
        type: types[option.type] ?? types.text,
        required: false,
        min_value: option.type === 'posint' ? 1 : option.type === 'natural' ? 0 : undefined,
      })
    }
  }
  return result.sort((a, b) => +b.required! - +a.required!)
}
