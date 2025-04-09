import { Service } from 'cordis'
import { Dict, remove, valueMap } from 'cosmokit'
import { HTTP } from '@cordisjs/plugin-http'
import { Response } from '@satorijs/protocol'
import { Key, pathToRegexp } from 'path-to-regexp'
import { Bot, Context } from '.'

export interface InternalRequest<C extends Context, P = any> {
  bot: Bot<C>
  method: HTTP.Method
  params: P
  query: URLSearchParams
  headers: Dict<string> // Headers
  body: ArrayBuffer
}

export interface InternalRoute<C extends Context> {
  regexp: RegExp
  keys: Key[]
  callback: (request: InternalRequest<C>) => Promise<Response>
}

type Upper =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M'
  | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

type Lower =
  | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm'
  | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

/* eslint-disable @typescript-eslint/no-unused-vars */

type Take<S extends string, D extends string, O extends string = ''> =
  | S extends `${infer C extends D}${infer S}`
  ? Take<S, D, `${O}${C}`>
  : [O, S]

type TakeIdent<S extends string> =
  | S extends `"${infer P}"${infer S}`
  ? [P, S]
  : Take<S, Upper | Lower | Digit | '_'>

// path-to-regexp v8 syntax
export type ExtractParams<S extends string, O extends {} = {}, A extends 0[] = []> =
  | S extends `${infer C}${infer S}`
  ? C extends '\\'
    ? S extends `${string}${infer S}`
      ? ExtractParams<S, O, A>
      : O
    : C extends ':' | '*'
      ? TakeIdent<S> extends [infer P extends string, infer S extends string]
        ? ExtractParams<S, O & (
          | A['length'] extends 0
          ? { [K in P]: string }
          : { [K in P]?: string }
        ), A>
        : never
      : C extends '{'
        ? ExtractParams<S, O, [0, ...A]>
        : C extends '}'
          ? A extends [0, ...infer A extends 0[]]
            ? ExtractParams<S, O, A>
            : ExtractParams<S, O, A>
          : ExtractParams<S, O, A>
  : O

export class InternalRouter<C extends Context> {
  public [Service.tracker] = {
    property: 'ctx',
  }

  routes: InternalRoute<C>[] = []

  constructor(public ctx: Context) {}

  define<P extends string>(path: P, callback: (request: InternalRequest<C, ExtractParams<P>>) => Promise<Response>) {
    return this.ctx.effect(() => {
      const route: InternalRoute<C> = {
        ...pathToRegexp(path),
        callback,
      }
      this.routes.push(route)
      return () => remove(this.routes, route)
    })
  }

  handle(bot: Bot<C>, method: HTTP.Method, path: string, query: URLSearchParams, headers: Headers, body: any): undefined | Promise<Response> {
    for (const route of this.routes) {
      const capture = route.regexp.exec(path)
      if (!capture) continue
      const params: Dict<string> = {}
      route.keys.forEach(({ name }, index) => {
        params[name] = capture[index + 1]
      })
      return route.callback({
        bot,
        method,
        params,
        query,
        body,
        headers: Object.fromEntries(headers.entries()),
      })
    }
  }
}

export namespace JsonForm {
  export function load(data: any, path: string, form: FormData) {
    const value = form.get(path)
    if (value instanceof File) return value
    if (!data || typeof data !== 'object') return data
    if (Array.isArray(data)) {
      return data.map((value, index) => load(value, `${path}.${index}`, form))
    }
    return valueMap(data, (value, key) => {
      return load(value, `${path}.${key}`, form)
    })
  }

  export function dump(data: any, path: string, form: FormData) {
    if (!data || typeof data !== 'object') return data
    if (data instanceof Blob) {
      form.append(path, data)
      return null
    }
    if (Array.isArray(data)) {
      return data.map((value, index) => dump(value, `${path}.${index}`, form))
    }
    return valueMap(data, (value, key) => {
      return dump(value, `${path}.${key}`, form)
    })
  }

  export interface Body {
    body: ArrayBuffer
    headers: Headers
  }

  export async function decode(body: Body) {
    const type = body.headers.get('content-type')
    if (type?.startsWith('multipart/form-data')) {
      const response = new globalThis.Response(body.body, { headers: body.headers })
      const form = await response.formData()
      const json = form.get('$') as string
      return load(JSON.parse(json), '$', form)
    } else if (type?.startsWith('application/json')) {
      return JSON.parse(new TextDecoder().decode(body.body))
    } else {
      throw new Error(`Unsupported content type: ${type}`)
    }
  }

  export async function encode(data: any): Promise<Body> {
    const form = new FormData()
    const json = JSON.stringify(JsonForm.dump(data, '$', form))
    if ([...form.entries()].length) {
      form.append('$', json)
      const request = new Request('stub:', {
        method: 'POST',
        body: form,
      })
      return {
        body: await request.arrayBuffer(),
        headers: request.headers,
      }
    } else {
      const body = new TextEncoder().encode(json).buffer as ArrayBuffer
      const headers = new Headers({
        'content-type': 'application/json',
      })
      return { body, headers }
    }
  }
}
