import { Element, h, Session, Universal } from '@satorijs/satori'
import { SlackBot } from './bot'
// eslint-disable-next-line max-len
import { EnvelopedEvent, GenericMessageEvent, MessageChangedEvent, MessageDeletedEvent, ReactionAddedEvent, ReactionRemovedEvent, RichText, RichTextBlock, SlackEvent, SlackUser } from './types/events'
import { KnownBlock } from '@slack/types'
import { Definitions, File, SlackChannel, SlackTeam } from './types'
import { unescape } from './message'

type NewKnownBlock = KnownBlock | RichTextBlock

function adaptRichText(elements: RichText[]) {
  const result: Element[] = []
  for (const text of elements) {
    if (text.type === 'text') {
      let item = h.text(unescape(text.text))
      if (text.style?.bold) item = h('b', {}, item)
      if (text.style?.italic) item = h('i', {}, item)
      if (text.style?.strike) item = h('del', {}, item)
      if (text.style?.code) item = h('code', {}, item)
      result.push(item)
    } else if (text.type === 'link') {
      result.push(h('a', { href: text.url }, text.text))
    } else if (text.type === 'emoji') {
      result.push(h.text(String.fromCodePoint(...text.unicode.split('-').map(v => parseInt(v, 16)))))
    } else if (text.type === 'user') {
      result.push(h.at(text.user_id))
    } else if (text.type === 'broadcast') {
      result.push(h('at', { type: text.range }))
    }
  }
  return result
}

function adaptMarkdown(markdown: string) {
  let list = markdown.split(/(<(?:.*?)>)/g)
  list = list.map(v => v.split(/(:(?:[a-zA-Z0-9_]+):)/g)).flat() // face
  const result: Element[] = []
  for (const item of list) {
    if (!item) continue
    const match = item.match(/<(.*?)>/)
    if (match) {
      if (match[0].startsWith('@U')) result.push(h.at(match[0].slice(2)))
      if (match[0].startsWith('#C')) result.push(h.sharp(match[0].slice(2)))
    } else if (item.startsWith(':') && item.endsWith(':')) {
      result.push(h('face', { id: item.slice(1, -1) }))
    } else {
      result.push(h.text(item))
    }
  }
  return result
}

function adaptMessageBlocks(blocks: NewKnownBlock[]) {
  let result: Element[] = []
  for (const block of blocks) {
    if (block.type === 'rich_text') {
      for (const element of block.elements) {
        if (element.type === 'rich_text_section') {
          result = result.concat(adaptRichText(element.elements as RichText[]))
        } else if (element.type === 'rich_text_list') {
          result.push(h(element.style === 'bullet' ? 'ul' : 'ol', {},
            element.elements.map(v => h('li', {}, adaptRichText(v.elements)),
            )))
        }
      }
    } else if (block.type === 'section') {
      result = result.concat(adaptMarkdown(block.text.text))
    }
  }
  return result
}

const decodeBotProfile = (data: Definitions.BotProfile): Universal.User => ({
  id: data.app_id,
  name: data.name,
  isBot: true,
  avatar: data.icons.image_72,
})

export async function adaptMessage(
  bot: SlackBot,
  data: Partial<GenericMessageEvent> | Definitions.Message,
  message: Universal.Message,
  payload: Universal.MessageLike = message,
) {
  const elements = adaptMessageBlocks(data.blocks as unknown as NewKnownBlock[])
  // if (evt.thread_ts) elements.unshift(h.quote(evt.thread_ts))
  for (const file of data.files ?? []) {
    if (file.mimetype.startsWith('video/')) {
      elements.push(h.video(file.url_private, { id: file.id }))
    } else if (file.mimetype.startsWith('audio/')) {
      elements.push(h.video(file.url_private, { id: file.id }))
    } else if (file.mimetype.startsWith('image/')) {
      elements.push(h.image(file.url_private, { id: file.id }))
    } else {
      elements.push(h.file(file.url_private, { id: file.id }))
    }
  }
  let forward = null
  for (const attachment of data.attachments ?? []) {
    // FIXME add typings
    if (attachment['is_msg_unfurl']) {
      forward = attachment['ts']
    }
  }
  message.id = message.messageId = data.ts
  message.elements = forward ? [h('message', { forward: true, id: forward }, elements)] : elements
  message.content = message.elements.join('')

  if (!payload) return
  payload.timestamp = Math.floor(Number(data.ts) * 1000)
  if ('channel' in data) {
    payload.channel = {
      id: data.channel,
      type: data.channel_type === 'im' ? Universal.Channel.Type.DIRECT : Universal.Channel.Type.TEXT,
    }
  }
  if ('bot_profile' in data) {
    payload.user = decodeBotProfile(data.bot_profile as Definitions.BotProfile)
  } else {
    payload.user = { id: data.user }
  }
  // if a message(parent message) was a thread, it has thread_ts property too
  if (data.thread_ts && data.thread_ts !== data.ts) {
    message.quote = await bot.getMessage(payload.channel.id, data.thread_ts)
  }
  if (data.team) {
    payload.guild = { id: data.team }
  }
}

export function adaptMessageDeleted(bot: SlackBot, event: MessageDeletedEvent, session: Session) {
  session.isDirect = event.channel_type === 'im'
  session.channelId = event.channel
  session.guildId = event.previous_message.team
  session.type = 'message-deleted'
  session.messageId = event.previous_message.ts
  session.timestamp = Math.floor(Number(event.previous_message.ts) * 1000)

  adaptMessage(bot, event.previous_message, session.event.message = {}, session.event)
}

export function adaptSentAsset(file: File, session: Session) {
  session.messageId = file.shares.public[Object.keys(file.shares.public)[0]][0].ts
  session.timestamp = file.created * 1000
  session.elements = [h.image(file.url_private, { id: file.id })]
  session.content = session.elements.join('')
  session.channelId = file.channels[0]
  // session.guildId = file.shares.public[Object.keys(file.shares.public)[0]][0].ts
  session.type = 'message'
  session.userId = file.user
}

function setupReaction(session: Session, data: EnvelopedEvent<ReactionAddedEvent> | EnvelopedEvent<ReactionRemovedEvent>) {
  session.guildId = data.team_id
  session.channelId = data.event.item.channel
  session.messageId = data.event.item.ts
  session.timestamp = Math.floor(Number(data.event.item.ts) * 1000)
  session.userId = data.event.user
  session.content = data.event.reaction
}

export async function adaptSession(bot: SlackBot, payload: EnvelopedEvent<SlackEvent>) {
  const session = bot.session()
  // https://api.slack.com/events
  if (payload.event.type === 'message') {
    const input = payload.event
    // @ts-ignore
    if (input.user === bot.selfId) return
    if (!input.subtype) {
      session.type = 'message'
      await adaptMessage(bot, input as GenericMessageEvent, session.event.message = {}, session.event)
    } else if (input.subtype === 'message_deleted') {
      adaptMessageDeleted(bot, input, session)
    } else if (input.subtype === 'message_changed') {
      const evt = input as MessageChangedEvent
      if (evt.message.subtype === 'thread_broadcast') return
      session.type = 'message-updated'
      // @ts-ignore
      session.guildId = payload.team_id
      await adaptMessage(bot, evt.message, session.event.message = {}, session.event)
    } else {
      return
    }
  } else if (payload.event.type === 'channel_left') {
    session.type = 'channel-removed'
    session.channelId = payload.event.channel
    session.timestamp = Math.floor(Number(payload.event.event_ts) * 1000)
    session.guildId = payload.team_id
  } else if (payload.event.type === 'reaction_added') {
    session.type = 'reaction-added'
    setupReaction(session, payload as any)
  } else if (payload.event.type === 'reaction_removed') {
    session.type = 'reaction-deleted'
    setupReaction(session, payload as any)
  } else {
    return
  }
  return session
}

export interface AuthTestResponse {
  ok: boolean
  url: string
  team: string
  user: string
  team_id: string
  user_id: string
  bot_id?: string
  is_enterprise_install: boolean
}

export const decodeUser = (data: SlackUser): Universal.User => ({
  id: data.id,
  name: data.real_name,
  nickname: data.profile.display_name,
  userId: data.id,
  avatar: data.profile.image_512
    ?? data.profile.image_192
    ?? data.profile.image_72
    ?? data.profile.image_48
    ?? data.profile.image_32
    ?? data.profile.image_24,
  username: data.real_name,
  isBot: data.is_bot,
})

export const decodeGuildMember = (data: SlackUser): Universal.GuildMember => ({
  user: decodeUser(data),
})

export const decodeChannel = (data: SlackChannel): Universal.Channel => ({
  id: data.id,
  name: data.name,
  type: data.is_private ? Universal.Channel.Type.DIRECT : Universal.Channel.Type.TEXT,
})

export const decodeGuild = (data: SlackTeam | Definitions.Team): Universal.Guild => ({
  id: data.id,
  name: data.name,
})
