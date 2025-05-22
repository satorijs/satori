import { Bot, camelCase, Context, JsonForm, normalize, omit, snakeCase, Universal } from '@satorijs/core'
import { SatoriAdapter } from './ws'
import type { HTTP } from '@cordisjs/plugin-http'
import type { Logger } from '@cordisjs/plugin-logger'

function createInternal<C extends Context = Context>(bot: SatoriBot<C>, prefix = '') {
  return new Proxy(() => {}, {
    apply(target, thisArg, args) {
      const key = prefix.slice(1)
      bot.logger.debug('[request.internal]', key, args)

      const impl = async (pagination = false) => {
        const req = await JsonForm.encode(args)
        if (pagination) {
          req.headers.set('satori-pagination', 'true')
        }
        const res = await bot._request(
          'POST',
          '/v1/' + bot.getInternalUrl(`/_api/${key}`, {}, true),
          req.body,
          req.headers,
        )
        return await JsonForm.decode(res)
      }

      let promise: Promise<any> | undefined
      const result = {} as Promise<any> & AsyncIterableIterator<any>
      for (const key of ['then', 'catch', 'finally']) {
        result[key] = (...args: any[]) => {
          return (promise ??= impl())[key](...args)
        }
      }

      type Pagination = { data: any[]; next?: any }
      let pagination: Pagination | undefined
      result.next = async function () {
        pagination ??= await impl(true) as Pagination
        if (!pagination.data) throw new Error('Invalid pagination response')
        if (pagination.data.length) return { done: false, value: pagination.data.shift() }
        if (!pagination.next) return { done: true, value: undefined }
        args = pagination.next
        pagination = await impl(true) as Pagination
        return this.next()
      }
      result[Symbol.asyncIterator] = function () {
        return this
      }
      result[Symbol.for('satori.pagination')] = () => {
        return impl(true)
      }

      return result
    },
    get(target, key, receiver) {
      if (typeof key === 'symbol' || key in target) {
        return Reflect.get(target, key, receiver)
      }
      return createInternal(bot, prefix + '.' + key)
    },
  })
}

export class SatoriBot<C extends Context = Context> extends Bot<C, Universal.Login> {
  declare adapter: SatoriAdapter<C, this>

  public internal = createInternal(this)
  public logger: Logger

  constructor(ctx: C, config: Universal.Login) {
    super(ctx, config, config.adapter)
    this.logger = ctx.logger('satori')
    Object.assign(this, omit(config, ['sn', 'adapter']))

    this.defineInternalRoute('/*path', async ({ method, params, query, headers, body }) => {
      return this._request(
        method as any,
        `/v1/${this.getInternalUrl('/' + params.path, query, true)}`,
        method === 'GET' || method === 'HEAD' ? null : body,
        headers,
      )
    })
  }

  _request(method: HTTP.Method, path: string, body: BodyInit | null, headers?: HeadersInit) {
    return this.adapter.http(path, {
      method,
      data: body,
      headers: {
        ...Object.fromEntries(new Headers(headers)),
        'satori-platform': this.platform,
        'satori-user-id': this.user?.id,
      },
    })
  }
}

for (const [key, method] of Object.entries(Universal.Methods)) {
  SatoriBot.prototype[method.name] = async function (this: SatoriBot, ...args: any[]) {
    let payload: any
    if (method.name === 'createUpload') {
      payload = new FormData()
      for (const blob of args as Blob[]) {
        payload.append('file', blob)
      }
    } else {
      payload = {}
      for (const [index, field] of method.fields.entries()) {
        if ((method.name === 'createMessage' || method.name === 'editMessage') && field.name === 'content') {
          const session = this.session({
            type: 'send',
            channel: { id: args[0], type: 0 },
            ...args[3]?.session?.event,
          })
          session.elements = await session.transform(normalize(args[index]))
          if (await session.app.serial(session, 'before-send', session, args[3] ?? {})) return
          payload[field.name] = session.elements.join('')
        } else if (field.name === 'referrer') {
          payload[field.name] = args[index]
        } else {
          payload[field.name] = Universal.transformKey(args[index], snakeCase)
        }
      }
    }
    this.logger.debug('[request]', key, payload)
    const result = await this._request('POST', '/v1/' + key, payload)
    return Universal.transformKey(result, camelCase)
  }
}
