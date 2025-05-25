import { Awaitable, Binary, camelize, defineProperty, Dict, hyphenate, is, isNonNullable, isNullable, makeArray } from 'cosmokit'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any
      message: {
        id?: string
        forward?: boolean
        children?: any
      }
      quote: {
        id?: string
        name?: string
        avatar?: string
        children?: any
      }
      at: {
        id?: string
        name?: string
        avatar?: string
        role?: string
        type?: string
      }
      sharp: {
        id?: string
        name?: string
        avatar?: string
      }
      img: ResourceElement
      audio: ResourceElement
      video: ResourceElement
      file: ResourceElement
    }

    interface ResourceElement {
      [key: string]: any
      src?: string
      title?: string
      width?: string | number
      height?: string | number
      duration?: string | number
      poster?: string
    }
  }
}

const kElement = Symbol.for('satori.element')

interface Element {
  [kElement]: true
  type: string
  attrs: Dict
  /** @deprecated use `attrs` instead */
  data: Dict
  children: Element[]
  source?: string
  toString(strip?: boolean): string
}

interface ElementConstructor extends Element { }

class ElementConstructor {
  get data() {
    return this.attrs
  }

  getTagName() {
    if (this.type === 'component') {
      return this.attrs.is?.name ?? 'component'
    } else {
      return this.type
    }
  }

  toAttrString() {
    return Object.entries(this.attrs).map(([key, value]) => {
      if (isNullable(value)) return ''
      key = hyphenate(key)
      if (value === true) return ` ${key}`
      if (value === false) return ` no-${key}`
      return ` ${key}="${Element.escape('' + value, true)}"`
    }).join('')
  }

  toString(strip = false) {
    if (this.type === 'text' && 'content' in this.attrs) {
      return strip ? this.attrs.content : Element.escape(this.attrs.content)
    }
    const inner = this.children.map(child => child.toString(strip)).join('')
    if (strip) return inner
    const attrs = this.toAttrString()
    const tag = this.getTagName()
    if (!this.children.length) return `<${tag}${attrs}/>`
    return `<${tag}${attrs}>${inner}</${tag}>`
  }
}

defineProperty(ElementConstructor, 'name', 'Element')
defineProperty(ElementConstructor.prototype, kElement, true)

type RenderFunction = Element.Render<Element.Fragment, Awaitable<Element.Fragment>>

function Element(type: string | RenderFunction, ...children: (Element.Fragment | undefined)[]): Element
function Element(type: string | RenderFunction, attrs: Dict, ...children: (Element.Fragment | undefined)[]): Element
function Element(type: string | RenderFunction, ...args: any[]) {
  const el = Object.create(ElementConstructor.prototype)
  const attrs: Dict = {}, children: Element[] = []
  if (args[0] && typeof args[0] === 'object' && !Element.isElement(args[0]) && !Array.isArray(args[0])) {
    const props = args.shift()
    for (const [key, value] of Object.entries(props)) {
      if (isNullable(value)) continue
      // https://github.com/reactjs/rfcs/pull/107
      if (key === 'children') {
        args.push(...makeArray(value))
      } else {
        attrs[camelize(key)] = value
      }
    }
  }
  for (const child of args) {
    children.push(...Element.toElementArray(child))
  }
  if (typeof type === 'function') {
    attrs.is = type
    type = 'component'
  }
  return Object.assign(el, { type, attrs, children })
}

// eslint-disable-next-line no-new-func
const evaluate = new Function('expr', 'context', `
  try {
    with (context) {
      return eval(expr)
    }
  } catch {}
`) as ((expr: string, context: object) => string)

namespace Element {
  export const jsx = Element
  export const jsxs = Element
  export const jsxDEV = Element
  export const Fragment = 'template'

  export type Fragment = string | Element | (string | Element)[]
  export type Visit<T, S> = (element: Element, session: S) => T
  export type Render<T, S> = (attrs: Dict, children: Element[], session: S) => T
  export type SyncTransformer<S = never> = boolean | Fragment | Render<boolean | Fragment, S>
  export type Transformer<S = never> = boolean | Fragment | Render<Awaitable<boolean | Fragment>, S>

  type SyncVisitor<S> = Dict<SyncTransformer<S>> | Visit<boolean | Fragment, S>
  type Visitor<S> = Dict<Transformer<S>> | Visit<Awaitable<boolean | Fragment>, S>

  export function isElement(source: any): source is Element {
    return source && typeof source === 'object' && source[kElement]
  }

  export function toElement(content: string | Element | undefined) {
    if (typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {
      content = '' + content
      if (content) return Element('text', { content })
    } else if (isElement(content)) {
      return content
    } else if (!isNullable(content)) {
      throw new TypeError(`Invalid content: ${content}`)
    }
  }

  export function toElementArray(content?: Element.Fragment) {
    if (Array.isArray(content)) {
      return content.map(toElement).filter(isNonNullable)
    } else {
      return [toElement(content)].filter(isNonNullable)
    }
  }

  export function normalize(source: Fragment, context?: any) {
    return typeof source === 'string' ? parse(source, context) : toElementArray(source)
  }

  export function escape(source: string, inline = false) {
    const result
      = (source ?? '').replace(/&/g, '&amp;')
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
      .replace(/&#(\d+);/g, (_, code) => code === '38' ? _ : String.fromCharCode(+code))
      .replace(/&#x([0-9a-f]+);/gi, (_, code) => code === '26' ? _ : String.fromCharCode(parseInt(code, 16)))
      .replace(/&(amp|#38|#x26);/g, '&')
  }

  export interface FindOptions {
    type?: string
    caret?: boolean
  }

  /** @deprecated use `Element.select()` instead */
  export function from(source: string, options: FindOptions = {}): Element | undefined {
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
      let combCap: RegExpExecArray | null, combinator: Combinator = ' '
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
    if (!source || !query) return []
    if (typeof source === 'string') source = parse(source)
    if (typeof query === 'string') query = parseSelector(query)
    if (!query.length) return []
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

  export function interpolate(expr: string, context: any) {
    expr = expr.trim()
    if (!/^[\w.]+$/.test(expr)) {
      return evaluate(expr, context) ?? ''
    }
    let value = context
    for (const part of expr.split('.')) {
      value = value[part]
      if (isNullable(value)) return ''
    }
    return value ?? ''
  }

  const tagRegExp1 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)/
  const tagRegExp2 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)|(?<curly>\{(?<derivative>[@:/#][^\s}]*)?[\s\S]*?\})/
  const attrRegExp1 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)')?/g
  const attrRegExp2 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)'|=\{(?<curly>[^}]+)\})?/g

  const enum Position {
    OPEN,
    CLOSE,
    EMPTY,
    CONTINUE,
  }

  interface Token {
    type: 'angle' | 'curly'
    name: string
    position: Position
    source: string
    extra: string
    children?: Dict<(string | Token)[]>
  }

  export function parse(source: string, context?: any) {
    const tokens: (string | Token)[] = []
    function pushText(content: string) {
      if (content) tokens.push(content)
    }

    const tagRegExp = context ? tagRegExp2 : tagRegExp1
    let tagCap: RegExpExecArray | null
    let trimStart = true
    while ((tagCap = tagRegExp.exec(source))) {
      const { curly, comment, derivative } = tagCap.groups!
      const trimEnd = !curly
      parseContent(source.slice(0, tagCap.index), trimStart, trimEnd)
      trimStart = trimEnd
      source = source.slice(tagCap.index + tagCap[0].length)
      const [_, , , close, type, extra, empty] = tagCap
      if (comment) continue
      if (curly) {
        let name = '', position = Position.EMPTY
        if (derivative) {
          name = derivative.slice(1)
          position = {
            '@': Position.EMPTY,
            '#': Position.OPEN,
            '/': Position.CLOSE,
            ':': Position.CONTINUE,
          }[derivative[0]]!
        }
        tokens.push({
          type: 'curly',
          name,
          position,
          source: curly,
          extra: curly.slice(1 + (derivative ?? '').length, -1),
        })
        continue
      }
      tokens.push({
        type: 'angle',
        source: _,
        name: type || Fragment,
        position: close ? Position.CLOSE : empty ? Position.EMPTY : Position.OPEN,
        extra,
      })
    }

    parseContent(source, trimStart, true)
    function parseContent(source: string, trimStart: boolean, trimEnd: boolean) {
      source = unescape(source)
      if (trimStart) source = source.replace(/^\s*\n\s*/, '')
      if (trimEnd) source = source.replace(/\s*\n\s*$/, '')
      pushText(source)
    }

    return parseTokens(foldTokens(tokens), context)
  }

  function foldTokens(tokens: (string | Token)[]) {
    const stack: [Token, string][] = [[{
      type: 'angle',
      name: Fragment,
      position: Position.OPEN,
      source: '',
      extra: '',
      children: { default: [] },
    }, 'default']]

    function pushToken(...tokens: (string | Token)[]) {
      const [token, slot] = stack[0]
      token.children![slot].push(...tokens)
    }

    for (const token of tokens) {
      if (typeof token === 'string') {
        pushToken(token)
        continue
      }
      const { name, position } = token
      if (position === Position.CLOSE) {
        if (stack[0][0].name === name) {
          stack.shift()
        }
      } else if (position === Position.CONTINUE) {
        stack[0][0].children![name] = []
        stack[0][1] = name
      } else if (position === Position.OPEN) {
        pushToken(token)
        token.children = { default: [] }
        stack.unshift([token, 'default'])
      } else {
        pushToken(token)
      }
    }

    return stack[stack.length - 1][0].children!.default
  }

  function parseTokens(tokens: (string | Token)[], context?: any) {
    const result: Element[] = []
    for (const token of tokens) {
      if (typeof token === 'string') {
        result.push(Element('text', { content: token }))
      } else if (token.type === 'angle') {
        const attrs = {}
        const attrRegExp = context ? attrRegExp2 : attrRegExp1
        let attrCap: RegExpExecArray | null
        while ((attrCap = attrRegExp.exec(token.extra))) {
          const [, key, v1, v2 = v1, v3] = attrCap
          if (v3) {
            attrs[key] = interpolate(v3, context)
          } else if (!isNullable(v2)) {
            attrs[key] = unescape(v2)
          } else if (key.startsWith('no-')) {
            attrs[key.slice(3)] = false
          } else {
            attrs[key] = true
          }
        }
        result.push(Element(token.name, attrs, token.children && parseTokens(token.children.default, context)))
      } else if (!token.name) {
        result.push(...toElementArray(interpolate(token.extra, context)))
      } else if (token.name === 'if') {
        if (evaluate(token.extra, context)) {
          result.push(...parseTokens(token.children!.default, context))
        } else {
          result.push(...parseTokens(token.children!.else || [], context))
        }
      } else if (token.name === 'each') {
        const [expr, ident] = token.extra.split(/\s+as\s+/)
        const items = interpolate(expr, context)
        if (!items || !items[Symbol.iterator]) continue
        for (const item of items) {
          result.push(...parseTokens(token.children!.default, { ...context, [ident]: item }))
        }
      }
    }
    return result
  }

  function visit<S>(element: Element, rules: Visitor<S>, session: S) {
    const { type, attrs, children } = element
    if (typeof rules === 'function') {
      return rules(element, session)
    } else {
      let result: any = rules[typeof type === 'string' ? type : ''] ?? rules.default ?? true
      if (typeof result === 'function') {
        result = result(attrs, children, session)
      }
      return result
    }
  }

  type Rest<T> = [T] extends [never] ? [session?: T] : [session: T]

  export function transform<S = never>(source: string, rules: SyncVisitor<S>, ...rest: Rest<S>): string
  export function transform<S = never>(source: Element[], rules: SyncVisitor<S>, ...rest: Rest<S>): Element[]
  export function transform<S>(source: string | Element[], rules: SyncVisitor<S>, session: S) {
    const elements = typeof source === 'string' ? parse(source) : source
    const output: Element[] = []
    elements.forEach((element) => {
      const { type, attrs, children } = element
      const result = visit(element, rules, session)
      if (result === true) {
        output.push(Element(type, attrs, transform(children, rules, session)))
      } else if (result !== false) {
        output.push(...toElementArray(result))
      }
    })
    return typeof source === 'string' ? output.join('') : output
  }

  export async function transformAsync<S = never>(source: string, rules: Visitor<S>, ...rest: Rest<S>): Promise<string>
  export async function transformAsync<S = never>(source: Element[], rules: Visitor<S>, ...rest: Rest<S>): Promise<Element[]>
  export async function transformAsync<S>(source: string | Element[], rules: Visitor<S>, session: S) {
    const elements = typeof source === 'string' ? parse(source) : source
    const children = (await Promise.all(elements.map(async (element) => {
      const { type, attrs, children } = element
      const result = await visit(element, rules, session)
      if (result === true) {
        return [Element(type, attrs, await transformAsync(children, rules, session))]
      } else if (result !== false) {
        return toElementArray(result)
      } else {
        return []
      }
    }))).flat(1)
    return typeof source === 'string' ? children.join('') : children
  }

  export type Factory<R extends any[]> = (...args: [...rest: R, attrs?: Dict]) => Element

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

  // eslint-disable-next-line prefer-const
  export let warn: (message: string) => void = () => { }

  function createAssetFactory(type: string): Factory<[data: string] | [data: Buffer | ArrayBuffer | ArrayBufferView, type: string]> {
    return (src, ...args) => {
      let prefix = 'base64://'
      if (typeof args[0] === 'string') {
        prefix = `data:${args.shift()};base64,`
      }
      if (is('Buffer', src)) {
        src = prefix + src.toString('base64')
      } else if (is('ArrayBuffer', src)) {
        src = prefix + Binary.toBase64(src)
      } else if (ArrayBuffer.isView(src)) {
        src = prefix + Binary.toBase64(src.buffer)
      }
      if (src.startsWith('base64://')) {
        warn(`protocol "base64:" is deprecated and will be removed in the future, please use "data:" instead`)
      }
      return Element(type, { ...args[0] as {}, src })
    }
  }

  export const text = createFactory<[content: any]>('text', 'content')
  export const at = createFactory<[id: any]>('at', 'id')
  export const sharp = createFactory<[id: any]>('sharp', 'id')
  export const quote = createFactory<[id: any]>('quote', 'id')
  export const image = createAssetFactory('img')
  export const img = createAssetFactory('img')
  export const video = createAssetFactory('video')
  export const audio = createAssetFactory('audio')
  export const file = createAssetFactory('file')

  export function i18n(path: string | Dict, children?: any[]) {
    return Element('i18n', typeof path === 'string' ? { path } : path, children)
  }
}

export = Element
