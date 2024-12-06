import { Service } from 'cordis'
import { Dict, remove } from 'cosmokit'
import { HTTP } from '@cordisjs/plugin-http'
import { Response } from '@satorijs/protocol'
import { Key, pathToRegexp } from 'path-to-regexp'
import { Context } from '.'

export interface VirtualRequest<P = any> {
  method: HTTP.Method
  params: P
  query: URLSearchParams
}

export interface VirtualRoute {
  regexp: RegExp
  keys: Key[]
  callback: (request: VirtualRequest) => Promise<Response>
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
  | S extends `${infer L extends D}${infer S}`
  ? Take<S, D, `${O}${L}`>
  : [O, S]

type TakeIdent<S extends string> =
  | S extends `"${infer M}"${infer S}`
  ? [M, S]
  : Take<S, Upper | Lower | Digit | '_'>

type SkipRegExp<S extends string, A extends 0[] = [], B extends 0[] = []> =
  | S extends `${infer M}${infer S}`
  ? M extends '\\'
    ? S extends `${string}${infer S}`
      ? SkipRegExp<S, A, B>
      : never
    : M extends '('
    ? SkipRegExp<S, [0, ...A], B>
    : M extends ')'
    ? A['length'] extends B['length']
      ? S
      : SkipRegExp<S, A, [0, ...B]>
    : SkipRegExp<S, A, B>
  : never

type TakeModifier<P extends string, S extends string> =
  | S extends `?${infer S}`
  ? [{ [K in P]?: string }, S]
  : S extends `+${infer S}`
  ? [{ [K in P]: string[] }, S]
  : S extends `*${infer S}`
  ? [{ [K in P]?: string[] }, S]
  : S extends `(${infer S}`
  ? [{ [K in P]: string }, SkipRegExp<S>]
  : [{ [K in P]: string }, S]

export type ExtractParams<S extends string, O extends {} = {}> =
  | S extends `${string}:${infer S}`
  ? TakeIdent<S> extends [infer P extends string, infer S extends string]
    ? TakeModifier<P, S> extends [infer E, infer S extends string]
      ? ExtractParams<S, O & E>
      : never
    : never
  : O

export class VirtualRouter {
  public [Service.tracker] = {
    property: 'ctx',
  }

  routes: VirtualRoute[] = []

  constructor(public ctx: Context) {}

  define<P extends string>(path: P, callback: (request: VirtualRequest<ExtractParams<P>>) => Promise<Response>) {
    return this.ctx.effect(() => {
      const keys: Key[] = []
      const route: VirtualRoute = {
        regexp: pathToRegexp(path, keys),
        keys,
        callback,
      }
      this.routes.push(route)
      return () => remove(this.routes, route)
    })
  }

  handle(method: HTTP.Method, path: string, query: URLSearchParams): undefined | Promise<Response> {
    for (const route of this.routes) {
      const capture = route.regexp.exec(path)
      if (!capture) continue
      const params: Dict<string> = {}
      route.keys.forEach(({ name }, index) => {
        params[name] = capture[index + 1]
      })
      return route.callback({ method, params, query })
    }
  }
}
