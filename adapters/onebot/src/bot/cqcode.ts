import { Dict, segment } from '@satorijs/satori'

export function CQCode(type: string, attrs: Dict<string>) {
  if (type === 'text') return attrs.content
  let output = '[CQ:' + type
  for (const key in attrs) {
    if (attrs[key]) output += `,${key}=${segment.escape(attrs[key], true)}`
  }
  return output + ']'
}

export interface CQCode {
  type: string
  data: Dict<string>
  capture?: RegExpExecArray
}

export namespace CQCode {
  export function escape(source: any, inline = false) {
    const result = String(source)
      .replace(/&/g, '&amp;')
      .replace(/\[/g, '&#91;')
      .replace(/\]/g, '&#93;')
    return inline
      ? result.replace(/,/g, '&#44;').replace(/(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g, ' ')
      : result
  }

  export function unescape(source: string) {
    return String(source)
      .replace(/&#91;/g, '[')
      .replace(/&#93;/g, ']')
      .replace(/&#44;/g, ',')
      .replace(/&amp;/g, '&')
  }

  const pattern = /\[CQ:(\w+)((,\w+=[^,\]]*)*)\]/

  export function from(source: string): CQCode {
    const capture = pattern.exec(source)
    if (!capture) return null
    const [, type, attrs] = capture
    const data: Dict<string> = {}
    attrs && attrs.slice(1).split(',').forEach((str) => {
      const index = str.indexOf('=')
      data[str.slice(0, index)] = unescape(str.slice(index + 1))
    })
    return { type, data, capture }
  }

  export function parse(source: string | CQCode[]) {
    if (typeof source !== 'string') {
      return source.map(({ type, data }) => segment(type, data))
    }
    const elements: segment[] = []
    let result: ReturnType<typeof from>
    while ((result = from(source))) {
      const { type, data, capture } = result
      if (capture.index) {
        elements.push(segment('text', { content: unescape(source.slice(0, capture.index)) }))
      }
      elements.push(segment(type, data))
      source = source.slice(capture.index + capture[0].length)
    }
    if (source) elements.push(segment('text', { content: unescape(source) }))
    return elements
  }
}
