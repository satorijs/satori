import { arrayBufferToBase64, Awaitable, camelize, defineProperty, Dict, hyphenate, is, isNullable, makeArray } from 'cosmokit'

const kElement = Symbol.for('satori.element')

function isElement(source: any): source is Element {
  return source && typeof source === 'object' && source[kElement]
}

function toElement(content: string | Element) {
  if (typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {
    if (content) return Element('text', { content: '' + content })
  } else if (isElement(content)) {
    return content
  } else if (!isNullable(content)) {
    throw new TypeError(`Invalid content: ${content}`)
  }
}

function toElementArray(content: Element.Fragment) {
  if (Array.isArray(content)) {
    return content.map(toElement).filter(x => x)
  } else {
    return [toElement(content)].filter(x => x)
  }
}

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

interface ElementConstructor extends Element {}

class ElementConstructor {
  get data() {
    return this.attrs
  }

  toString(strip = false) {
    if (this.type === 'text') return Element.escape(this.attrs.content)
    const inner = this.children.map(child => child.toString(strip)).join('')
    if (strip) return inner
    const attrs = Object.entries(this.attrs).map(([key, value]) => {
      if (isNullable(value)) return ''
      key = hyphenate(key)
      if (value === true) return ` ${key}`
      if (value === false) return ` no-${key}`
      return ` ${key}="${Element.escape('' + value, true)}"`
    }).join('')
    if (!this.children.length) return `<${this.type}${attrs}/>`
    return `<${this.type}${attrs}>${inner}</${this.type}>`
  }
}

defineProperty(ElementConstructor, 'name', 'Element')
defineProperty(ElementConstructor.prototype, kElement, true)

function Element(type: string, ...children: Element.Fragment[]): Element
function Element(type: string, attrs: Dict, ...children: Element.Fragment[]): Element
function Element(type: string, ...args: any[]) {
  const el = Object.create(ElementConstructor.prototype)
  let attrs: Dict = {}, children: Element[] = []
  if (args[0] && typeof args[0] === 'object' && !isElement(args[0]) && !Array.isArray(args[0])) {
    const props = args.shift()
    for (const [key, value] of Object.entries(props)) {
      if (isNullable(value)) continue
      // https://github.com/reactjs/rfcs/pull/107
      if (key === 'children') {
        args.push(...makeArray(value))
      } else {
        attrs[key] = value
      }
    }
  }
  for (const child of args) {
    children.push(...toElementArray(child))
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
  export type Render<T, S> = (attrs: Dict<any>, children: Element[], session: S) => T
  export type Transformer<S = never> = boolean | Fragment | Render<boolean | Fragment, S>
  export type AsyncTransformer<S = never> = boolean | Fragment | Render<Awaitable<boolean | Fragment>, S>

  export function normalize(source: Fragment, context?: any) {
    if (typeof source !== 'string') return toElementArray(source)
    return Element.parse(source, context)
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
      .replace(/&#(\d+);/g, (_, code) => code === '38' ? _ : String.fromCharCode(+code))
      .replace(/&#x([0-9a-f]+);/gi, (_, code) => code === '26' ? _ : String.fromCharCode(parseInt(code, 16)))
      .replace(/&(amp|#38|#x26);/g, '&')
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

  const tagRegExp = /<!--[\s\S]*?-->|<(\/?)\s*([^!\s>/]*)([^>]*?)\s*(\/?)>/
  const attrRegExp1 = /([^\s=]+)(?:="([^"]*)"|='([^']*)')?/g
  const attrRegExp2 = /([^\s=]+)(?:="([^"]*)"|='([^']*)'|=\{([^}]+)\})?/g
  const interpRegExp = /\{([^}]*)\}/

  interface Token {
    type: string
    close: string
    empty: string
    attrs: Dict
    source: string
  }

  export function parse(source: string, context?: any) {
    const tokens: (Element | Token)[] = []
    function pushText(content: string) {
      if (content) tokens.push(Element('text', { content }))
    }

    const attrRegExp = context ? attrRegExp2 : attrRegExp1
    let tagCap: RegExpExecArray
    while ((tagCap = tagRegExp.exec(source))) {
      parseContent(source.slice(0, tagCap.index))
      const [_, close, type, attrs, empty] = tagCap
      source = source.slice(tagCap.index + _.length)
      if (_.startsWith('<!')) continue
      const token: Token = { source: _, type: type || Fragment, close, empty, attrs: {} }
      let attrCap: RegExpExecArray
      while ((attrCap = attrRegExp.exec(attrs))) {
        const [_, key, v1, v2 = v1, v3] = attrCap
        if (v3) {
          token.attrs[camelize(key)] = interpolate(v3, context)
        } else if (!isNullable(v2)) {
          token.attrs[camelize(key)] = unescape(v2)
        } else if (key.startsWith('no-')) {
          token.attrs[camelize(key.slice(3))] = false
        } else {
          token.attrs[camelize(key)] = true
        }
      }
      tokens.push(token)
    }

    parseContent(source)
    function parseContent(source: string) {
      source = source
        .replace(/^\s*\n\s*/, '')
        .replace(/\s*\n\s*$/, '')
      if (context) {
        let interpCap: RegExpExecArray
        while ((interpCap = interpRegExp.exec(source))) {
          const [_, expr] = interpCap
          pushText(unescape(source.slice(0, interpCap.index)))
          source = source.slice(interpCap.index + _.length)
          const content = interpolate(expr, context)
          tokens.push(...toElementArray(content))
        }
      }
      pushText(unescape(source))
    }

    const stack = [Element(Fragment)]
    function rollback(index: number) {
      for (; index > 0; index--) {
        const { children } = stack.shift()
        const { source } = stack[0].children.pop()
        stack[0].children.push(Element('text', { content: source }))
        stack[0].children.push(...children)
      }
    }

    for (const token of tokens) {
      if (isElement(token)) {
        stack[0].children.push(token)
      } else if (token.close) {
        let index = 0
        while (index < stack.length && stack[index].type !== token.type) index++
        if (index === stack.length) {
          // no matching open tag
          stack[0].children.push(Element('text', { content: token.source }))
        } else {
          rollback(index)
          const element = stack.shift()
          delete element.source
        }
      } else {
        const element = Element(token.type, token.attrs)
        stack[0].children.push(element)
        if (!token.empty) {
          element.source = token.source
          stack.unshift(element)
        }
      }
    }
    rollback(stack.length - 1)
    return stack[0].children
  }

  export function transform<S = never>(source: string, rules: Dict<Transformer<S>>, session?: S): string
  export function transform<S = never>(source: Element[], rules: Dict<Transformer<S>>, session?: S): Element[]
  export function transform<S>(source: string | Element[], rules: Dict<Transformer<S>>, session?: S) {
    const elements = typeof source === 'string' ? parse(source) : source
    const output: Element[] = []
    elements.forEach((element) => {
      const { type, attrs, children } = element
      let result = rules[type] ?? rules.default ?? true
      if (typeof result === 'function') {
        result = result(attrs, children, session)
      }
      if (result === true) {
        output.push(Element(type, attrs, transform(children, rules, session)))
      } else if (result !== false) {
        output.push(...normalize(result))
      }
    })
    return typeof source === 'string' ? output.join('') : output
  }

  export async function transformAsync<S = never>(source: string, rules: Dict<AsyncTransformer<S>>, session?: S): Promise<string>
  export async function transformAsync<S = never>(source: Element[], rules: Dict<AsyncTransformer<S>>, session?: S): Promise<Element[]>
  export async function transformAsync<S>(source: string | Element[], rules: Dict<AsyncTransformer<S>>, session?: S) {
    const elements = typeof source === 'string' ? parse(source) : source
    const children = (await Promise.all(elements.map(async (element) => {
      const { type, attrs, children } = element
      let result = rules[type] ?? rules.default ?? true
      if (typeof result === 'function') {
        result = await result(attrs, children, session)
      }
      if (result === true) {
        return [Element(type, attrs, await transformAsync(children, rules, session))]
      } else if (result !== false) {
        return normalize(result)
      } else {
        return []
      }
    }))).flat(1)
    return typeof source === 'string' ? children.join('') : children
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

  export let warn: (message: string) => void = () => {}

  function createAssetFactory(type: string): Factory<[data: string] | [data: Buffer | ArrayBuffer, type: string]> {
    return (url, ...args) => {
      let prefix = 'base64://'
      if (typeof args[0] === 'string') {
        prefix = `data:${args.shift()};base64,`
      }
      if (is('Buffer', url)) {
        url = prefix + url.toString('base64')
      } else if (is('ArrayBuffer', url)) {
        url = prefix + arrayBufferToBase64(url)
      }
      if (url.startsWith('base64://')) {
        warn(`protocol "base64:" is deprecated and will be removed in the future, please use "data:" instead`)
      }
      return Element(type, { ...args[0] as {}, url })
    }
  }

  export const text = createFactory<[content: any]>('text', 'content')
  export const at = createFactory<[id: any]>('at', 'id')
  export const sharp = createFactory<[id: any]>('sharp', 'id')
  export const quote = createFactory<[id: any]>('quote', 'id')
  export const image = createAssetFactory('image')
  export const video = createAssetFactory('video')
  export const audio = createAssetFactory('audio')
  export const file = createAssetFactory('file')
}

export = Element
