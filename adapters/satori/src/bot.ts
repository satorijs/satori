import { Bot, camelCase, Context, h, HTTP, JsonForm, omit, pick, snakeCase, Universal } from '@satorijs/core'
import { SatoriAdapter } from './ws'

function createInternal<C extends Context = Context>(bot: SatoriBot<C>, prefix = '') {
  return new Proxy(() => {}, {
    apply(target, thisArg, args) {
      const key = prefix.slice(1)
      bot.logger.debug('[request.internal]', key, args)

      const impl = async (pagination = false) => {
        const request = await JsonForm.encode(args)
        if (pagination) {
          request.headers.set('Satori-Pagination', 'true')
        }
        const response = await bot.request('/v1/' + bot.getInternalUrl(`/_api/${key}`, {}, true), {
          method: 'POST',
          headers: Object.fromEntries(request.headers.entries()),
          data: request.body,
          responseType: 'arraybuffer',
        })
        return await JsonForm.decode({ body: response.data, headers: response.headers })
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
  public upstream: Pick<Universal.Login, 'sn' | 'adapter'>

  constructor(ctx: C, config: Universal.Login) {
    super(ctx, config, 'satori')
    Object.assign(this, omit(config, ['sn', 'adapter']))
    this.upstream = pick(config, ['sn', 'adapter'])

    this.defineInternalRoute('/*path', async ({ method, params, query, headers, body }) => {
      const response = await this.request(`/v1/${this.getInternalUrl('/' + params.path, query, true)}`, {
        method,
        headers,
        data: method === 'GET' || method === 'HEAD' ? null : body,
        responseType: 'arraybuffer',
        validateStatus: () => true,
      })
      return {
        status: response.status,
        body: response.data,
        headers: response.headers,
      }
    })
  }

  get adapterName() {
    return this.upstream.adapter
  }

  request(url: string, config: HTTP.RequestConfig) {
    return this.adapter.http(url, {
      ...config,
      headers: {
        ...config.headers,
        'Satori-Platform': this.platform,
        'Satori-User-ID': this.user?.id,
        'X-Platform': this.platform,
        'X-Self-ID': this.user?.id,
      },
    })
  }
}

for (const [key, method] of Object.entries(Universal.Methods)) {
  SatoriBot.prototype[method.name] = async function (this: SatoriBot, ...args: any[]) {
    let payload: any
    if (method.name === 'createUpload') {
      payload = new FormData()
      for (const { data, type, filename } of args as Universal.Upload[]) {
        payload.append('file', new Blob([data], { type }), filename)
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
          session.elements = await session.transform(h.normalize(args[index]))
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
    const result = await this.request('/v1/' + key, {
      method: 'POST',
      data: payload,
    })
    return Universal.transformKey(result, camelCase)
  }
}
