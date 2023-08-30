import { Dict, h, Session, Universal } from '@satorijs/satori'
import { ZulipBot } from './bot'
import marked from 'marked'
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
export function by_stream_topic_url(
  stream_id: number,
  topic: string,
): string {
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

async function setupReaction(session: Partial<Session>, data: ReactionEvent) {
  session.type = data.op === 'add' ? 'reaction-added' : 'reaction-removed'
  session.userId = data.user_id.toString()
  session.messageId = data.message_id.toString()
  session.timestamp = Date.now()
  session.content = data.emoji_name
}

export async function adaptSession(bot: ZulipBot, input: Event) {
  const session = bot.session({})
  if (input.type === 'message') {
    await decodeMessage(bot, input.message, session)
  } else if (input.type === 'reaction') {
    session.type = input.op === 'add' ? 'reaction-added' : 'reaction-removed'
    const msg = await bot.internal.getMessage(input.message_id.toString())
    setupMessage(session, msg.message)
    await setupReaction(session, input)
  } else {
    return
  }
  return session
}

export function setupMessage(session: Partial<Session>, data: Zulip.MessagesBase) {
  session.isDirect = data.type === 'private'
  session.messageId = data.id.toString()
  session.timestamp = data.timestamp * 1000
  if (!session.isDirect) {
    session.guildId = data.stream_id.toString()
    session.channelId = data.subject
  }
  session.userId = data.sender_id.toString()
  session.author = {
    userId: session.userId,
    username: data.sender_full_name,
  }
}

export async function decodeMessage(bot: ZulipBot, message: Zulip.MessagesBase, session: Partial<Session> = {}) {
  setupMessage(session, message)
  session.userId = message.sender_id.toString()
  session.type = 'message'

  const quoteMatch = message.content.match(/^@_\*\*\w+\|(\d+)\*\* \[.*\]\(.*\/near\/(\d+)\)/)
  if (quoteMatch) {
    const splited = message.content.split('\n')
    const quoteLength = splited[1].indexOf('quote')
    const quotes = splited[1].slice(0, quoteLength)
    const quoteEndIndex = splited.indexOf(quotes, 2)
    const trueContent = splited.slice(quoteEndIndex + 1).join('\n').trim()
    const quoteMsg = await bot.internal.getMessage(quoteMatch[2])
    quoteMsg.message.content = quoteMsg.raw_content
    session.quote = await decodeMessage(bot, quoteMsg.message)
    message.content = trueContent
  }
  const content: string = message.content
  marked.use({ extensions: [sharp, atBlock, atRoleBlock] })
  session.elements = render(marked.lexer(content))
  if (session.elements?.[0]?.type === 'p') {
    session.elements = session.elements[0].children
  }
  session.elements = await h.transformAsync(session.elements, {
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
  session.content = session.elements.join('')

  return session as Universal.Message
}

export const decodeGuild = (stream: Zulip.BasicStream): Universal.Guild => {
  return {
    guildId: stream.stream_id.toString(),
    guildName: stream.name,
  }
}

export const decodeMember = (user: Zulip.User): Universal.GuildMember => {
  return {
    userId: user.user_id.toString(),
    username: user.full_name,
    avatar: user.avatar_url,
  }
}
