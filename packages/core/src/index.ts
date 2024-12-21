import { Context, Logger, Service, z } from 'cordis'
import { Awaitable, defineProperty, Dict } from 'cosmokit'
import { Bot } from './bot'
import { ExtractParams, InternalRequest, InternalRouter } from './internal'
import { Session } from './session'
import { HTTP } from '@cordisjs/plugin-http'
import { Response, SendOptions } from '@satorijs/protocol'
import h from '@satorijs/element'

h.warn = new Logger('element').warn

// do not remove the `type` modifier
// because `esModuleInterop` is not respected by esbuild
export type { Fragment, Render } from '@satorijs/element'

export { h, h as Element, h as segment, HTTP, HTTP as Quester }

export * from 'cordis'
export * from 'cosmokit'

export * as Universal from '@satorijs/protocol'

export * from './bot'
export * from './adapter'
export * from './message'
export * from './internal'
export * from './session'

declare module 'cordis' {
  export interface Context {
    [Context.session]: Session<this>
    satori: Satori<this>
    bots: Bot<this>[] & Dict<Bot<this>>
    component(name: string, component: Component<GetSession<this>>, options?: Component.Options): () => void
  }

  export namespace Context {
    const session: unique symbol
  }

  interface Events<C> {
    'internal/session'(session: GetSession<C>): void
    'interaction/command'(session: GetSession<C>): void
    'interaction/button'(session: GetSession<C>): void
    'message'(session: GetSession<C>): void
    'message-created'(session: GetSession<C>): void
    'message-deleted'(session: GetSession<C>): void
    'message-updated'(session: GetSession<C>): void
    'message-pinned'(session: GetSession<C>): void
    'message-unpinned'(session: GetSession<C>): void
    'guild-added'(session: GetSession<C>): void
    'guild-removed'(session: GetSession<C>): void
    'guild-updated'(session: GetSession<C>): void
    'guild-member-added'(session: GetSession<C>): void
    'guild-member-removed'(session: GetSession<C>): void
    'guild-member-updated'(session: GetSession<C>): void
    'guild-role-created'(session: GetSession<C>): void
    'guild-role-deleted'(session: GetSession<C>): void
    'guild-role-updated'(session: GetSession<C>): void
    'reaction-added'(session: GetSession<C>): void
    'reaction-removed'(session: GetSession<C>): void
    'login-added'(session: GetSession<C>): void
    'login-removed'(session: GetSession<C>): void
    'login-updated'(session: GetSession<C>): void
    'friend-request'(session: GetSession<C>): void
    'guild-request'(session: GetSession<C>): void
    'guild-member-request'(session: GetSession<C>): void
    'before-send'(session: GetSession<C>, options: SendOptions): Awaitable<void | boolean>
    'send'(session: GetSession<C>): void
    /** @deprecated use `login-added` instead */
    'bot-added'(client: Bot<C>): void
    /** @deprecated use `login-removed` instead */
    'bot-removed'(client: Bot<C>): void
    /** @deprecated use `login-updated` instead */
    'bot-status-updated'(client: Bot<C>): void
    'bot-connect'(client: Bot<C>): Awaitable<void>
    'bot-disconnect'(client: Bot<C>): Awaitable<void>
  }
}

declare module '@cordisjs/plugin-http' {
  namespace HTTP {
    export function createConfig(this: typeof HTTP, endpoint?: string | boolean): z<Config>
  }
}

HTTP.createConfig = function createConfig(this, endpoint) {
  return z.object({
    endpoint: z.string().role('link').description('要连接的服务器地址。')
      .default(typeof endpoint === 'string' ? endpoint : null)
      .required(typeof endpoint === 'boolean' ? endpoint : false),
    headers: z.dict(String).role('table').description('要附加的额外请求头。'),
    ...this.Config.dict,
  }).description('请求设置')
}

export type Component<S extends Session = Session> = h.Render<Awaitable<h.Fragment>, S>

export namespace Component {
  export interface Options {
    session?: boolean
  }
}

export type GetSession<C extends Context> = C[typeof Context.session]

class SatoriContext extends Context {
  constructor(config?: any) {
    super(config)
    this.provide('satori', undefined, true)
    this.plugin(Satori)
  }
}

export { SatoriContext as Context }

export class Satori<C extends Context = Context> extends Service<unknown, C> {
  static [Service.provide] = 'satori'
  static [Service.immediate] = true

  public uid = Math.random().toString(36).slice(2)

  public _internalRouter: InternalRouter<C>
  public _tempStore: Dict<Response> = Object.create(null)

  constructor(ctx?: C) {
    super(ctx)
    ctx.mixin('satori', ['bots', 'component'])

    defineProperty(this.bots, Service.tracker, {})

    const self = this
    ;(ctx as Context).on('http/file', async function (_url, options) {
      const url = new URL(_url)
      if (url.protocol !== 'internal:') return
      const { status, body, headers } = await self.handleInternalRoute('GET', url)
      if (status >= 400) throw new Error(`Failed to fetch ${_url}, status code: ${status}`)
      if (status >= 300) {
        const location = headers?.get('location')
        return this.file(location, options)
      }
      const type = headers?.get('content-type')
      const filename = headers?.get('content-disposition')?.split('filename=')[1]
      return { data: body, filename, type, mime: type }
    })

    this._internalRouter = new InternalRouter(ctx)

    this.defineInternalRoute('/_tmp/:id', async ({ params, method }) => {
      if (method !== 'GET') return { status: 405 }
      return this._tempStore[params.id] ?? { status: 404 }
    })
  }

  public bots = new Proxy([], {
    get(target, prop) {
      if (prop in target || typeof prop === 'symbol') {
        return Reflect.get(target, prop)
      }
      return target.find(bot => bot.sid === prop)
    },
    deleteProperty(target, prop) {
      if (prop in target || typeof prop === 'symbol') {
        return Reflect.deleteProperty(target, prop)
      }
      const bot = target.findIndex(bot => bot.sid === prop)
      if (bot < 0) return true
      target.splice(bot, 1)
      return true
    },
  }) as Bot<C>[] & Dict<Bot<C>>

  component(name: string, component: Component<C[typeof Context.session]>, options: Component.Options = {}) {
    const render: Component = async (attrs, children, session) => {
      if (options.session && session.type === 'send') {
        throw new Error('interactive components is not available outside sessions')
      }
      const result = await component(attrs, children, session)
      return session.transform(h.normalize(result))
    }
    return this.ctx.set('component:' + name, render)
  }

  defineInternalRoute<P extends string>(path: P, callback: (request: InternalRequest<C, ExtractParams<P>>) => Promise<Response>) {
    return this._internalRouter.define(path, callback)
  }

  async handleInternalRoute(method: HTTP.Method, url: URL, headers = new Headers(), body?: any): Promise<Response> {
    const capture = /^([^/]+)\/([^/]+)(\/.+)$/.exec(url.pathname)
    if (!capture) return { status: 400 }
    const [, platform, selfId, path] = capture
    const bot = this.bots[`${platform}:${selfId}`]
    if (!bot) return { status: 404 }
    let response = await bot._internalRouter.handle(bot, method, path, url.searchParams, headers, body)
    response ??= await this._internalRouter.handle(bot, method, path, url.searchParams, headers, body)
    if (!response) return { status: 404 }
    return response
  }
}

export default Satori
