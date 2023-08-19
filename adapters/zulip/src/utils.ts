import { Dict, h } from '@satorijs/satori'
import { ZulipBot } from './bot'
import marked from 'marked'
import { unescape } from './message'

const tagRegExp = /^<(\/?)([^!\s>/]+)([^>]*?)\s*(\/?)>$/

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
  topic: string
): string {
  return `#narrow/stream/${encodeHashComponent(`${stream_id}-unknown`)}/topic/${encodeHashComponent(topic)}`
}

const atBlock: marked.TokenizerAndRendererExtension = {
  name: 'at',
  level: 'inline',
  start(src) { return src.match(/@\*\*/)?.index },
  tokenizer(src) {
    const rule = /@_?\*\*(.*)\*\*/
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
  name: 'atRole',
  level: 'inline',
  start(src) { return src.match(/@\*/)?.index },
  tokenizer(src) {
    const rule = /@\*(?!\*)(.*)\*/
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
  name: 'sharp',
  level: 'inline',
  start(src) { return src.match(/#\*/)?.index },
  tokenizer(src) {
    const rule = /#\*\*(.*)\*\*/
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

export async function decodeMessage(bot: ZulipBot, message: Dict) {
  const session = bot.session()
  session.isDirect = message.type === 'private'
  session.messageId = message.id.toString()
  session.timestamp = message.timestamp * 1000
  if (!session.isDirect) {
    session.guildId = message.stream_id.toString()
    session.channelId = message.subject
  }
  session.userId = message.sender_id.toString()
  session.type = 'message'

  const quoteMatch = message.content.match(/^@_\*\*\w+\|(\d+)\*\* \[.*\]\(.*\/near\/(\d+)\)/)
  if (quoteMatch) {
    const quoteMsg = await bot.internal.getMessage(quoteMatch[2])
    quoteMsg.message.content = quoteMsg.raw_content
    session.quote = await decodeMessage(bot, quoteMsg.message)
    message.content = message.content.slice(message.content.indexOf('\n') + 1)
  }
  const content: string = message.content
  marked.use({ extensions: [atBlock, atRoleBlock, sharp] })
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
        const channel = raw.slice(raw.indexOf('>') + 1)
        return h('sharp', { id: channel, guild: raw.slice(0, raw.indexOf('>')) })
      }
      return h('sharp', { guild: raw })
    },
  })

  return session
}
