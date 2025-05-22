import { Context, Service } from 'cordis'
import { Dict, remove, valueMap } from 'cosmokit'
import { ExtractParams, Key, pathToRegexp } from 'path-to-regexp-typed'
import { Bot } from '.'

export type InternalRouteCallback<C extends Context, T = any> = (
  request: Request & { params: T; query: URLSearchParams },
  bot: Bot<C>,
) => Promise<Response>

export interface InternalRoute<C extends Context> {
  regexp: RegExp
  keys: Key[]
  callback: InternalRouteCallback<C>
}

export class InternalRouter<C extends Context> {
  public [Service.tracker] = {
    property: 'ctx',
  }

  routes: InternalRoute<C>[] = []

  constructor(public ctx: Context) {}

  define<P extends string>(path: P, callback: InternalRouteCallback<C, ExtractParams<P>>) {
    return this.ctx.effect(() => {
      const route: InternalRoute<C> = {
        ...pathToRegexp(path),
        callback,
      }
      this.routes.push(route)
      return () => remove(this.routes, route)
    })
  }

  handle(bot: Bot<C>, req: Request, path: string, query: URLSearchParams): undefined | Promise<Response> {
    for (const route of this.routes) {
      const capture = route.regexp.exec(path)
      if (!capture) continue
      const params: Dict<string> = {}
      route.keys.forEach(({ name }, index) => {
        params[name] = capture[index + 1]
      })
      const _req = Object.assign(Object.create(req), { params, query })
      return route.callback(_req, bot)
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

  export async function decode(body: Response | Request) {
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
