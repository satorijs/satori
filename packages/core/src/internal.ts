import { Context, Service } from 'cordis'
import { Dict, remove, valueMap } from 'cosmokit'
import { HTTP } from '@cordisjs/plugin-http'
import { ExtractParams, Key, pathToRegexp } from 'path-to-regexp-typed'
import { Bot } from '.'

export interface InternalRequest<C extends Context, P = any> {
  bot: Bot<C>
  method: HTTP.Method
  params: P
  query: URLSearchParams
  headers: Headers
  body: ArrayBuffer
}

export interface InternalRoute<C extends Context> {
  regexp: RegExp
  keys: Key[]
  callback: (request: InternalRequest<C>) => Promise<Response>
}

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
        headers,
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

  export async function decode(body: Response) {
    const type = body.headers.get('content-type')
    if (type?.startsWith('multipart/form-data')) {
      const form = await body.formData()
      const json = form.get('$') as string
      return load(JSON.parse(json), '$', form)
    } else if (type?.startsWith('application/json')) {
      return await body.json()
    } else {
      throw new Error(`Unsupported content type: ${type}`)
    }
  }

  export async function encode(data: any): Promise<Response> {
    const form = new FormData()
    const json = JSON.stringify(JsonForm.dump(data, '$', form))
    if ([...form.entries()].length) {
      form.append('$', json)
      return new Response(form)
    } else {
      return new Response(json, {
        headers: {
          'content-type': 'application/json',
        },
      })
    }
  }
}
