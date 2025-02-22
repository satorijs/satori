import { Dict, h, Session, Universal } from '@satorijs/core'
import { ZulipBot } from './bot'
import * as marked from 'marked'
import * as Zulip from './types'

// internal_url.ts
const hashReplacements = new Map([
  ['%', '.'],
  ['(', '.28'],
  [')', '.29'],
  ['.', '.2E'],
])

export function encodeHashComponent(str: string): string {
  return encodeURIComponent(str).replace(/[%().]/g, (matched) => hashReplacements.get(matched)!)
}

export function by_stream_topic_url(stream_id: number, topic: string) {
  return `#narrow/stream/${encodeHashComponent(`${stream_id}-unknown`)}/topic/${encodeHashComponent(topic)}`
}

const atBlock: marked.TokenizerAndRendererExtension = {
  name: 'koishi.at',
  level: 'inline',
  start(src) { return src.match(/@_?\*\*/)?.index },
  tokenizer(src) {
    const rule = /^@_?\*\*(.*\|\d+)\*\*/
    const match = rule.exec(src)
    if (match) {
      return {
        type: 'koishi.at',
        raw: match[0],
        param: match[1],
      }
    }
  },
}

const atRoleBlock: marked.TokenizerAndRendererExtension = {
  name: 'koishi.at.role',
  level: 'inline',
  start(src) { return src.match(/@\*/)?.index },
  tokenizer(src) {
    const rule = /^@\*(?!\*)(.*)\*/
    const match = rule.exec(src)
    if (match) {
      return {
        type: 'koishi.at.role',
        raw: match[0],
        param: match[1],
      }
    }
  },
}

const sharp: marked.TokenizerAndRendererExtension = {
  name: 'koishi.sharp',
  level: 'inline',
  start(src) { return src.match(/#\*\*/)?.index },
  tokenizer(src) {
    const rule = /^#\*\*(.+>(?:(?!\*\*).)+)\*\*/
    const match = rule.exec(src)
    if (match) {
      return {
        type: 'koishi.sharp',
        raw: match[0],
        param: match[1],
      }
    }
  },
}

marked.use({ extensions: [sharp, atBlock, atRoleBlock] })

// @TODO u200b in quote's content?
function renderToken(token: marked.Token): h {
  if (token.type === 'code') {
    return h('code', { content: token.text })
  } else if (token.type === 'paragraph') {
    return h('p', render(token.tokens))
  } else if (token.type === 'image') {
    return h.image(token.href)
  } else if (token.type === 'blockquote') {
    return h('p', render(token.tokens))
  } else if (token.type === 'text') {
    return h('text', { content: token.text })
  } else if (token.type === 'em') {
    return h('em', render(token.tokens))
  } else if (token.type === 'strong') {
    return h('strong', render(token.tokens))
  } else if (token.type === 'del') {
    return h('del', render(token.tokens))
  } else if (token.type === 'link') {
    return h('a', { href: token.href }, render(token.tokens))
  } else if (token.type === 'koishi.at') {
    return h('at', { raw: token.param })
  } else if (token.type === 'koishi.at.role') {
    return h('at', { role: token.param })
  } else if (token.type === 'koishi.sharp') {
    return h('sharp', { raw: token.param })
  }
  return h('text', { content: token.raw })
}

function render(tokens: marked.Token[]): h[] {
  return tokens.map(renderToken).filter(Boolean)
}

type Event = Zulip.GetEventsResponse['events'][0]

type ReactionEvent = Extract<Event, { type?: 'reaction' }>

function setupReaction(session: Session, data: ReactionEvent) {
  session.type = data.op === 'add' ? 'reaction-added' : 'reaction-removed'
  session.userId = data.user_id.toString()
  session.messageId = data.message_id.toString()
  session.timestamp = Date.now()
  session.content = data.emoji_name
}

export async function adaptSession(bot: ZulipBot, input: Event) {
  const session = bot.session({})
  if (input.type === 'message') {
    await decodeMessage(bot, input.message, session.event.message = {}, session.event)
  } else if (input.type === 'reaction') {
    session.type = input.op === 'add' ? 'reaction-added' : 'reaction-removed'
    const { message } = await bot.internal.getMessage(input.message_id.toString())
    setupMessage(session.event, message)
    session.messageId = input.message_id.toString()
    setupReaction(session, input)
  } else if (input.type === 'delete_message' && input.message_type === 'stream') {
    session.type = 'channel-deleted'
    session.channelId = input.topic
    session.messageId = input.message_id.toString()
    session.guildId = input.stream_id.toString()
  } else if (input.type === 'subscription' && input.op === 'peer_add') {
    session.type = 'guild-added'
    // @ts-ignore
    session.guildId = input.stream_ids[0].toString()
    // create new guild
  } else if (input.type === 'subscription' && input.op === 'add') {
    session.type = 'guild-added'
    // @ts-ignore
    session.guildId = input.subscriptions[0].stream_id.toString()
    // add bot to private guild
  } else if (input.type === 'subscription' && input.op === 'remove') {
    session.type = 'guild-removed'
    // @ts-ignore
    session.guildId = input.subscriptions[0].stream_id.toString()
  } else if (input.type === 'stream' && input.op === 'delete') {
    session.type = 'guild-deleted'
    // @ts-ignore
    session.guildId = input.streams[0].stream_id.toString()
  } else if (input.type === 'realm_user' && input.op === 'delete') {
    session.type = 'guild-member-deleted'
    session.userId = input.person.user_id.toString()
  } else if (input.type === 'realm_user' && input.op === 'add') {
    session.type = 'guild-member-added'
    session.userId = input.person.user_id.toString()
  } else {
    return
  }
  return session
}

export function setupMessage(payload: Universal.MessageLike, data: Zulip.MessagesBase) {
  if (data.type === 'private') {
    payload.channel = {
      id: data.sender_id.toString(),
      type: Universal.Channel.Type.DIRECT,
    }
  } else {
    payload.channel = {
      id: data.subject,
      type: Universal.Channel.Type.TEXT,
    }
    payload.guild = { id: data.stream_id.toString() }
  }
  payload.user = {
    id: data.sender_id.toString(),
    name: data.sender_full_name,
  }
}

export async function decodeMessage(
  bot: ZulipBot,
  data: Zulip.MessagesBase,
  message: Universal.Message = {},
  payload: Universal.MessageLike = message,
) {
  const quoteMatch = data.content.match(/^@_\*\*\w+\|(\d+)\*\* \[.*\]\(.*\/near\/(\d+)\)/)
  if (quoteMatch) {
    const splited = data.content.split('\n')
    const quoteLength = splited[1].indexOf('quote')
    const quotes = splited[1].slice(0, quoteLength)
    const quoteEndIndex = splited.indexOf(quotes, 2)
    const trueContent = splited.slice(quoteEndIndex + 1).join('\n').trim()
    const quoteMsg = await bot.internal.getMessage(quoteMatch[2])
    quoteMsg.message.content = quoteMsg.raw_content
    message.quote = await decodeMessage(bot, quoteMsg.message)
    data.content = trueContent
  }
  const content: string = data.content
  message.elements = render(marked.lexer(content, {}))
  if (message.elements?.[0]?.type === 'p') {
    message.elements = message.elements[0].children
  }
  message.elements = await h.transformAsync(message.elements, {
    async at(attrs: Dict) {
      if (attrs.role) return h('at', attrs)
      const raw = attrs.raw as string
      if (raw === 'all' || raw === 'everyone' || raw === 'stream') return h('at', { type: 'all' })
      if (raw.includes('|')) return h.at(raw.split('|')[1])
      const { members } = await bot.internal.getUsers()
      const user = members.find(v => v.full_name === raw)

      // 没有 | 的是 guild 内没有重名的
      if (user) return h.at(user.user_id.toString(), { name: user.full_name })
    },
    async sharp(attrs: Dict) {
      const raw = attrs.raw as string
      if (raw.includes('>')) {
        const guildName = raw.slice(0, raw.indexOf('>'))
        const { stream_id } = await bot.internal.getStreamId({
          stream: guildName,
        })
        const channel = raw.slice(raw.indexOf('>') + 1)
        return h('sharp', { id: channel, guild: stream_id.toString() })
      }
      return h('sharp', { guild: raw })
    },
  })
  message.content = message.elements.join('')
  message.id = data.id.toString()
  message.timestamp = data.timestamp * 1000
  setupMessage(payload, data)
  return message
}

export const decodeGuild = (stream: Zulip.BasicStream): Universal.Guild => ({
  id: stream.stream_id.toString(),
  name: stream.name,
})

export const decodeUser = (user: Zulip.User): Universal.User => ({
  id: user.user_id.toString(),
  name: user.full_name,
  avatar: user.avatar_url,
})
