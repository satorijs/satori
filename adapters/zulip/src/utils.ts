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

// @TODO u200b in quote's content?
function renderToken(token: marked.Token): h {
  if (token.type === 'code') {
    return h('text', { content: unescape(token.text) + '\n' })
  } else if (token.type === 'paragraph') {
    return h('p', render(token.tokens))
  } else if (token.type === 'image') {
    return h.image(token.href)
  } else if (token.type === 'blockquote') {
    return h('text', { content: token.text + '\n' })
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

  session.elements = render(marked.lexer(message.content))
  if (session.elements?.[0]?.type === 'p') {
    session.elements = session.elements[0].children
  }

  return session
}
