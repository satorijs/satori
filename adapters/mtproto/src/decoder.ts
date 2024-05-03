import { Universal, h } from "@satorijs/core";
import { api } from "./mtproto/gen/api";

export const parseText = (text: string | undefined, entities: api.MessageEntity[]): h[] => {
  if (!text) return []
  if (!entities) return [h('text', { content: text })]
  const breakpoints = new Set<number>()
  for (const e of entities) {
    breakpoints.add(e.offset)
    breakpoints.add(e.offset + e.length)
  }

  breakpoints.add(text.length)

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      breakpoints.add(i)
      breakpoints.add(i + 1)
    }
  }

  const obtainAttributeAtBP = (bp: number) => {
    const attr = []
    let url = null, user = null
    for (const e of entities) {
      if (e.offset <= bp && e.offset + e.length > bp) {
        const type = e._.slice('messageEntity'.length)
        attr.push(type)

        if (e._ === 'messageEntityTextUrl') {
          url = e.url
        } else if (e._ === 'messageEntityMentionName') {
          user = e.user_id
        }
      }
    }

    return { attr, url, user }
  }

  const segs: h[] = []
  let start = 0
  for (const bp of Array.from(breakpoints).sort((a, b) => a - b)) {
    if (start < bp) {
      const { attr, url, user } = obtainAttributeAtBP(start)
      const content = text.slice(start, bp)
      let ele = h('text', { content })
      if (attr.includes('Bold')) ele = h('b', {}, ele)
      if (attr.includes('Italic')) ele = h('i', {}, ele)
      if (attr.includes('Underline')) ele = h('u', {}, ele)
      if (attr.includes('Strikethrough')) ele = h('s', {}, ele)
      if (attr.includes('Code')) ele = h('code', {}, ele)
      if (attr.includes('Pre')) ele = h('pre', {}, ele)
      if (attr.includes('Spoiler')) ele = h('spl', {}, ele)
      if (url) ele = h('a', { href: url }, ele)
      if (user) ele = h('at', { id: user.id }, ele)
      if (content === '\n') ele = h('br')
      segs.push(ele)
    }
    start = bp
  }

  return segs
}
