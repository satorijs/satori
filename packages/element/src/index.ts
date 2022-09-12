import { Awaitable, camelize, capitalize, defineProperty, Dict, hyphenate, isNullable } from 'cosmokit'
import { isType } from './utils'

const kElement = Symbol('element')

function isElement(source: any): source is Element {
  return source && typeof source === 'object' && source[kElement]
}

function toElement(content: string | Element) {
  if (typeof content !== 'string') return content
  return Element('text', { content })
}

function toElementArray(input: Element.Content) {
  if (Array.isArray(input)) {
    return input.map(toElement)
  } else if (typeof input === 'string') {
    return [toElement(input)]
  } else if (!input.type) {
    return input.children
  } else {
    return [input]
  }
}

interface Element {
  [kElement]: true
  type: string
  attrs: Dict<string>
  /** @deprecated use `attrs` instead */
  data: Dict<string>
  children: Element[]
  source?: string
  toString(strip?: boolean): string
}

interface ElementConstructor extends Element {}

class ElementConstructor {
  get data() {
    return this.attrs
  }

  toString(strip = false) {
    const inner = this.children.map(child => child.toString(strip)).join('')
    if (!this.type || strip) return inner
    if (this.type === 'text') return Element.escape(this.attrs.content)
    const attrs = Object.entries(this.attrs).map(([key, value]) => {
      if (isNullable(value)) return ''
      key = hyphenate(key)
      if (value === '') return ` ${key}`
      return ` ${key}="${Element.escape(value, true)}"`
    }).join('')
    if (!this.children.length) return `<${this.type}${attrs}/>`
    return `<${this.type}${attrs}>${inner}</${this.type}>`
  }
}

defineProperty(ElementConstructor, 'name', 'Element')
defineProperty(ElementConstructor.prototype, kElement, true)

function Element(type: string, children?: Element.Content): Element
function Element(type: string, attrs: Dict<any>, children?: Element.Content): Element
function Element(type: string, ...args: any[]) {
  const el = Object.create(ElementConstructor.prototype)
  let attrs: Dict<string> = {}, children: Element[] = []
  if (args[0] && typeof args[0] === 'object' && !isElement(args[0]) && !Array.isArray(args[0])) {
    for (const [key, value] of Object.entries(args.shift())) {
      if (isNullable(value)) continue
      if (value === true) {
        attrs[key] = ''
      } else if (value === false) {
        attrs['no' + capitalize(key)] = ''
      } else {
        attrs[key] = '' + value
      }
    }
  }
  if (args[0]) children = toElementArray(args[0])
  return Object.assign(el, { type, attrs, children })
}

namespace Element {
  export type Content = string | Element | (string | Element)[]
  export type Transformer = boolean | Content | ((attrs: Dict<string>, index: number, array: Element[]) => boolean | Content)
  export type AsyncTransformer = boolean | Content | ((attrs: Dict<string>, index: number, array: Element[]) => Awaitable<boolean | Content>)

  export function normalize(source: string | Element) {
    if (typeof source !== 'string') return Element(null, source)
    return Element.parse(source, true)
  }

  export function escape(source: string, inline = false) {
    const result = source
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return inline
      ? result.replace(/"/g, '&quot;')
      : result
  }

  export function unescape(source: string) {
    return source
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
  }

  export interface FindOptions {
    type?: string
    caret?: boolean
  }

  /** @deprecated use `Element.select()` instead */
  export function from(source: string, options: FindOptions = {}): Element {
    const elements = parse(source)
    if (options.caret) {
      if (options.type && elements[0]?.type !== options.type) return
      return elements[0]
    }
    return select(elements, options.type || '*')[0]
  }

  type Combinator = ' ' | '>' | '+' | '~'

  export interface Selector {
    type: string
    combinator: Combinator
  }

  const combRegExp = / *([ >+~]) */g

  export function parseSelector(input: string): Selector[][] {
    return input.split(',').map((query) => {
      const selectors: Selector[] = []
      query = query.trim()
      let combCap: RegExpExecArray, combinator: Combinator = ' '
      while ((combCap = combRegExp.exec(query))) {
        selectors.push({ type: query.slice(0, combCap.index), combinator })
        combinator = combCap[1] as Combinator
        query = query.slice(combCap.index + combCap[0].length)
      }
      selectors.push({ type: query, combinator })
      return selectors
    })
  }

  export function select(source: string | Element[], query: string | Selector[][]): Element[] {
    if (typeof source === 'string') source = parse(source)
    if (typeof query === 'string') query = parseSelector(query)
    if (!query.length) return
    let adjacent: Selector[][] = []
    const results: Element[] = []
    for (const [index, element] of source.entries()) {
      const inner: Selector[][] = []
      const local = [...query, ...adjacent]
      adjacent = []
      let matched = false
      for (const group of local) {
        const { type, combinator } = group[0]
        if (type === element.type || type === '*') {
          if (group.length === 1) {
            matched = true
          } else if ([' ', '>'].includes(group[1].combinator)) {
            inner.push(group.slice(1))
          } else if (group[1].combinator === '+') {
            adjacent.push(group.slice(1))
          } else {
            query.push(group.slice(1))
          }
        }
        if (combinator === ' ') {
          inner.push(group)
        }
      }
      if (matched) results.push(source[index])
      results.push(...select(element.children, inner))
    }
    return results
  }

  const tagRegExp = /<(\/?)\s*([^\s>]+)([^>]*?)\s*(\/?)>/
  const attrRegExp = /([^\s=]+)(?:="([^"]*)"|=([^"\s]+))?/g

  interface Token {
    tag: string
    close: string
    empty: string
    attrs: Dict<string>
    source: string
  }

  export function parse(source: string): Element[]
  export function parse(source: string, fragment: true): Element
  export function parse(source: string, fragment = false) {
    const tokens: (string | Token)[] = []
    let tagCap: RegExpExecArray
    while ((tagCap = tagRegExp.exec(source))) {
      if (tagCap.index) {
        tokens.push(unescape(source.slice(0, tagCap.index)))
      }
      const [_, close, tag, attrs, empty] = tagCap
      const token: Token = { source: _, tag, close, empty, attrs: {} }
      let attrCap: RegExpExecArray
      while ((attrCap = attrRegExp.exec(attrs))) {
        const [_, key, v1 = '', v2 = v1] = attrCap
        token.attrs[camelize(key)] = unescape(v2)
      }
      tokens.push(token)
      source = source.slice(tagCap.index + tagCap[0].length)
    }
    if (source) tokens.push(unescape(source))
    const stack = [Element(null)]
    function rollback(index: number) {
      for (; index > 0; index--) {
        const { children } = stack.shift()
        const { source } = stack[0].children.pop()
        stack[0].children.push(Element('text', { content: source }))
        stack[0].children.push(...children)
      }
    }
    for (const token of tokens) {
      if (typeof token === 'string') {
        stack[0].children.push(Element('text', { content: token }))
      } else if (token.close) {
        let index = 0
        while (index < stack.length && stack[index].type !== token.tag) index++
        if (index === stack.length) {
          // no matching open tag
          stack[0].children.push(Element('text', { content: token.source }))
        } else {
          rollback(index)
          const element = stack.shift()
          delete element.source
        }
      } else {
        const element = Element(token.tag, token.attrs)
        stack[0].children.push(element)
        if (!token.empty) {
          element.source = token.source
          stack.unshift(element)
        }
      }
    }
    rollback(stack.length - 1)
    return fragment ? stack[0] : stack[0].children
  }

  export function transform(source: string, rules: Dict<Transformer>): string
  export function transform(source: Element[], rules: Dict<Transformer>): Element[]
  export function transform(source: string | Element[], rules: Dict<Transformer>) {
    const elements = typeof source === 'string' ? parse(source) : source
    const output: Element[] = []
    elements.forEach((element, index, elements) => {
      let result = rules[element.type] ?? rules.default ?? true
      if (typeof result === 'function') {
        result = result(element.attrs, index, elements)
      }
      if (result === true) {
        const { type, attrs, children } = element
        output.push(Element(type, attrs, transform(children, rules)))
      } else if (result !== false) {
        output.push(...toElementArray(result))
      }
    })
    return typeof source === 'string' ? output.join('') : output
  }

  export async function transformAsync(source: string, rules: Dict<AsyncTransformer>): Promise<string>
  export async function transformAsync(source: Element[], rules: Dict<AsyncTransformer>): Promise<Element[]>
  export async function transformAsync(source: string | Element[], rules: Dict<AsyncTransformer>) {
    const elements = typeof source === 'string' ? parse(source) : source
    const children = (await Promise.all(elements.map(async (element, index, elements) => {
      let result = rules[element.type] ?? rules.default ?? true
      if (typeof result === 'function') {
        result = await result(element.attrs, index, elements)
      }
      if (result === true) {
        const { type, attrs, children } = element
        return [Element(type, attrs, await transformAsync(children, rules))]
      } else if (result !== false) {
        return toElementArray(result)
      } else {
        return []
      }
    }))).flat(1)
    return typeof source === 'string' ? children.join('') : children
  }

  /** @deprecated use `elements.join('')` instead */
  export function join(elements: Element[]) {
    return elements.join('')
  }

  export type Factory<R extends any[]> = (...args: [...rest: R, attrs?: Dict<any>]) => Element

  function createFactory<R extends any[] = any[]>(type: string, ...keys: string[]): Factory<R> {
    return (...args: any[]) => {
      const element = Element(type)
      keys.forEach((key, index) => {
        if (!isNullable(args[index])) {
          element.attrs[key] = args[index]
        }
      })
      if (args[keys.length]) {
        Object.assign(element.attrs, args[keys.length])
      }
      return element
    }
  }

  function createAssetFactory(type: string): Factory<[data: string | Buffer | ArrayBuffer]> {
    return (value, attrs = {}) => {
      if (isType('Buffer', value)) {
        value = 'base64://' + value.toString('base64')
      } else if (isType('ArrayBuffer', value)) {
        value = 'base64://' + Buffer.from(value).toString('base64')
      }
      return Element(type, { ...attrs, url: value })
    }
  }

  export const at = createFactory<[id: any]>('at', 'id')
  export const sharp = createFactory<[id: any]>('sharp', 'id')
  export const quote = createFactory<[id: any]>('quote', 'id')
  export const image = createAssetFactory('image')
  export const video = createAssetFactory('video')
  export const audio = createAssetFactory('audio')
  export const file = createAssetFactory('file')
}

export = Element
