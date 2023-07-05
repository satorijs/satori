import { Element, h, Session, Universal } from '@satorijs/satori'
import { SlackBot } from './bot'
import { GenericMessageEvent, MessageChangedEvent, MessageDeletedEvent, MessageEvent, RichText, RichTextBlock, SlackUser } from './types/events'
import { KnownBlock } from '@slack/types'
import { File, SlackChannel, SlackTeam } from './types'

type NewKnownBlock = KnownBlock | RichTextBlock

function adaptRichText(elements: RichText[]) {
  const result: Element[] = []
  for (const text of elements) {
    if (text.type === 'text') {
      let item = h.text(text.text)
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
    }
  }
  return result
}

const adaptAuthor = (evt: GenericMessageEvent): Universal.Author => ({
  userId: evt.user,
})

const adaptBotProfile = (evt: GenericMessageEvent): Universal.Author => ({
  userId: evt.bot_profile.app_id,
  username: evt.bot_profile.name,
  isBot: true,
  avatar: evt.bot_profile.icons.image_72,
})

export function prepareMessage(session: Partial<Session>, evt: MessageEvent) {
  session.subtype = evt.channel_type === 'channel' ? 'group' : 'private'
  session.channelId = evt.channel
}

export function adaptMessage(bot: SlackBot, evt: GenericMessageEvent, session: Partial<Session> = {}) {
  session.messageId = evt.ts
  session.timestamp = ~~(Number(evt.ts) * 1000)
  session.author = evt.bot_profile ? adaptBotProfile(evt) : adaptAuthor(evt)
  session.userId = session.author.userId
  session.guildId = evt.team

  let elements = []
  if (evt.thread_ts) elements.push(h.quote(evt.thread_ts))
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
  session.subtype = evt.channel_type === 'channel' ? 'group' : 'private'
  session.channelId = evt.channel
  session.guildId = evt.previous_message.team
  session.type = 'message-deleted'
  session.messageId = evt.previous_message.ts
  session.timestamp = ~~(Number(evt.previous_message.ts) * 1000)

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

export async function adaptSession(bot: SlackBot, input: MessageEvent) {
  const session = bot.session()
  if (input.type === 'message') {
    // @ts-ignore
    if (input.app_id === bot.selfId) return
    if (!input.subtype) {
      session.type = 'message'
      prepareMessage(session, input)
      adaptMessage(bot, input as unknown as GenericMessageEvent, session)
    }
    if (input.subtype === 'message_deleted') adaptMessageDeleted(bot, input as unknown as MessageDeletedEvent, session)
    if (input.subtype === 'message_changed') {
      const evt = input as unknown as MessageChangedEvent
      session.type = 'message-updated'
      // @ts-ignore
      session.guildId = evt.message.user_team
      prepareMessage(session, input)
      adaptMessage(bot, evt.message, session)
    }
    return session
  }
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
