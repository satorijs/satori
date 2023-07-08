import { Element, h, Session, Universal } from '@satorijs/satori'
import { SlackBot } from './bot'
import { BasicSlackEvent, EnvelopedEvent, GenericMessageEvent, MessageChangedEvent, MessageDeletedEvent, MessageEvent, ReactionAddedEvent, ReactionRemovedEvent, RichText, RichTextBlock, SlackEvent, SlackUser } from './types/events'
import { KnownBlock } from '@slack/types'
import { File, SlackChannel, SlackTeam } from './types'
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
          result = result.concat(adaptRichText(element.elements))
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

const adaptAuthor = (evt: GenericMessageEvent): Universal.Author => ({
  userId: evt.user || evt.app_id,
  // username: evt.username
})

const adaptBotProfile = (evt: GenericMessageEvent): Universal.Author => ({
  userId: evt.bot_profile.app_id,
  username: evt.bot_profile.name,
  isBot: true,
  avatar: evt.bot_profile.icons.image_72,
})

export async function adaptMessage(bot: SlackBot, evt: GenericMessageEvent, session: Partial<Session> = {}) {
  session.isDirect = evt.channel_type === 'im'
  session.channelId = evt.channel
  session.messageId = evt.ts
  session.timestamp = Math.floor(Number(evt.ts) * 1000)
  session.author = evt.bot_profile ? adaptBotProfile(evt) : adaptAuthor(evt)
  session.userId = session.author.userId
  if (evt.team) session.guildId = evt.team

  let elements = []
  // if a message(parent message) was a thread, it has thread_ts property too
  if (evt.thread_ts && evt.thread_ts !== evt.ts) {
    const quoted = await bot.getMessage(session.channelId, evt.thread_ts)
    session.quote = quoted
    session.quote.channelId = session.channelId
  }

  // if (evt.thread_ts) elements.push(h.quote(evt.thread_ts))
  elements = [...elements, ...adaptMessageBlocks(evt.blocks as unknown as NewKnownBlock[])]
  for (const file of evt.files ?? []) {
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
  for (const attachment of evt.attachments ?? []) {
    // @ts-ignore
    if (attachment.is_msg_unfurl) {
      forward = attachment.ts
    }
  }
  session.elements = forward ? [h('message', { forward: true, id: forward }, elements)] : elements
  session.content = session.elements.join('')
  return session as Universal.Message
}

export function adaptMessageDeleted(bot: SlackBot, evt: MessageDeletedEvent, session: Partial<Session> = {}) {
  session.isDirect = evt.channel_type === 'im'
  session.channelId = evt.channel
  session.guildId = evt.previous_message.team
  session.type = 'message-deleted'
  session.messageId = evt.previous_message.ts
  session.timestamp = Math.floor(Number(evt.previous_message.ts) * 1000)

  adaptMessage(bot, evt.previous_message, session)
}

export function adaptSentAsset(file: File, session: Partial<Session> = {}) {
  session.messageId = file.shares.public[Object.keys(file.shares.public)[0]][0].ts
  session.timestamp = file.created * 1000
  session.elements = [h.image(file.url_private, { id: file.id })]
  session.content = session.elements.join('')
  session.channelId = file.channels[0]
  // session.guildId = file.shares.public[Object.keys(file.shares.public)[0]][0].ts
  session.type = 'message'
  session.author = {
    userId: file.user,
  }
  session.userId = session.author.userId
  return session as Universal.Message
}

function setupReaction(session: Partial<Session>, data: EnvelopedEvent<ReactionAddedEvent> | EnvelopedEvent<ReactionRemovedEvent>) {
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
    const input = payload.event as GenericMessageEvent
    // @ts-ignore
    if (input.user === bot.selfId) return
    if (!input.subtype) {
      session.type = 'message'
      await adaptMessage(bot, input as unknown as GenericMessageEvent, session)
    }
    if (input.subtype === 'message_deleted') adaptMessageDeleted(bot, input as unknown as MessageDeletedEvent, session)
    if (input.subtype === 'message_changed') {
      const evt = input as unknown as MessageChangedEvent
      session.type = 'message-updated'
      // @ts-ignore
      session.guildId = payload.team_id
      await adaptMessage(bot, evt.message, session)
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

export function adaptUser(data: SlackUser): Universal.User {
  return {
    userId: data.id,
    avatar: data.profile.image_512 ?? data.profile.image_192 ?? data.profile.image_72 ?? data.profile.image_48 ?? data.profile.image_32 ?? data.profile.image_24,
    username: data.real_name,
    isBot: data.is_bot,
  }
}

export function adaptChannel(data: SlackChannel): Universal.Channel {
  return {
    channelId: data.id,
    channelName: data.name,
  }
}

export const adaptGuild = (data: SlackTeam): Universal.Guild => ({
  guildId: data.id,
  guildName: data.name,
})
