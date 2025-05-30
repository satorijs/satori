import { Context, Service } from 'cordis'
import { Awaitable, defineProperty, Dict } from 'cosmokit'
import { Bot } from './bot'
import { InternalRouteCallback, InternalRouter, JsonForm } from './internal'
import { Session } from './session'
import type {} from '@cordisjs/plugin-http'
import { Meta, SendOptions } from '@satorijs/protocol'
import { ExtractParams } from 'path-to-regexp-typed'
import * as h from '@cordisjs/element'

export * from 'cordis'
export * from 'cosmokit'

export * from '@cordisjs/element'
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
    'satori/meta'(): void
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
    'bot-connect'(client: Bot<C>): Awaitable<void>
    'bot-disconnect'(client: Bot<C>): Awaitable<void>
  }
}

export type Component<S extends Session = Session> = h.Render<Awaitable<h.Fragment>, S>

export namespace Component {
  export interface Options {
    session?: boolean
  }
}

export type GetSession<C extends Context> = C[typeof Context.session]

class DisposableSet<T> {
  private sn = 0
  private map1 = new Map<number, T[]>()
  private map2 = new Map<T, Set<number>>()

  constructor(private ctx: Context) {
    defineProperty(this, Service.tracker, {
      property: 'ctx',
    })
  }

  add(...values: T[]) {
    const sn = ++this.sn
    return this.ctx.effect(() => {
      let hasUpdate = false
      for (const value of values) {
        if (!this.map2.has(value)) {
          this.map2.set(value, new Set())
          hasUpdate = true
        }
        this.map2.get(value)!.add(sn)
      }
      this.map1.set(sn, values)
      if (hasUpdate) this.ctx.emit('satori/meta')
      return () => {
        let hasUpdate = false
        this.map1.delete(sn)
        for (const value of values) {
          this.map2.get(value)!.delete(sn)
          if (this.map2.get(value)!.size === 0) {
            this.map2.delete(value)
            hasUpdate = true
          }
        }
        if (hasUpdate) this.ctx.emit('satori/meta')
      }
    })
  }

  [Symbol.iterator]() {
    return new Set(([] as T[]).concat(...this.map1.values()))[Symbol.iterator]()
  }
}

export class Satori<C extends Context = Context> extends Service<C> {
  public uid = Math.random().toString(36).slice(2)
  public proxyUrls: DisposableSet<string> = new DisposableSet(this.ctx)

  public _internalRouter: InternalRouter<C>
  public _tempStore: Dict<Response> = Object.create(null)

  public _loginSeq = 0
  public _sessionSeq = 0

  constructor(ctx: C) {
    super(ctx, 'satori')
    ctx.mixin('satori', ['bots', 'component'])

    defineProperty(this.bots, Service.tracker, {})

    const self = this
    ;(ctx as Context).on('http/fetch', async function (url, init, next) {
      if (url.protocol !== 'satori:') return
      const res = await self.handleInternalRoute(new Request(url))
      if (res.status >= 400) throw new Error(`Failed to fetch ${url}, status code: ${status}`)
      if (res.status >= 300) {
        const location = res.headers.get('location')!
        return this(location) as any // FIXME
      }
      return res
    })

    this._internalRouter = new InternalRouter(ctx)

    this.defineInternalRoute('/_tmp/:id', async ({ params, method }) => {
      if (method !== 'GET') return new Response(null, { status: 405 })
      return this._tempStore[params.id] ?? new Response(null, { status: 404 })
    })

    this.defineInternalRoute('/_api/:name', async (req, bot) => {
      if (req.method !== 'POST') return new Response(null, { status: 405 })
      const args = await JsonForm.decode(req)
      if (!args) return new Response(null, { status: 400 })
      try {
        let root = bot.internal
        for (const part of req.params.name.split('.')) {
          root = root[part]
        }
        let result = root(...args)
        if (req.headers.get('satori-pagination')) {
          if (!result?.[Symbol.for('satori.pagination')]) {
            return new Response('This API does not support pagination', { status: 400 })
          }
          result = await result[Symbol.for('satori.pagination')]()
        } else {
          result = await result
        }
        return await JsonForm.encode(result)
      } catch (error) {
        if (!ctx.get('http')?.isError(error) || !error.response) throw error
        return error.response
      }
    })
  }

  public bots = new Proxy([] as Bot<C>[], {
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

  defineInternalRoute<P extends string>(path: P, callback: InternalRouteCallback<C, ExtractParams<P>>) {
    return this._internalRouter.define(path, callback)
  }

  async handleInternalRoute(req: Request): Promise<Response> {
    const url = new URL(req.url)
    const capture = /^([^/]+)\/([^/]+)(\/.+)$/.exec(url.pathname)
    if (!capture) return new Response(null, { status: 404 })
    const [, platform, selfId, path] = capture
    const bot = this.bots[`${platform}:${selfId}`]
    if (!bot) return new Response(null, { status: 404 })
    let response = await this._internalRouter.handle(bot, req, path, url.searchParams)
    response ??= await bot._internalRouter.handle(bot, req, path, url.searchParams)
    if (!response) return new Response(null, { status: 404 })
    return response
  }

  toJSON(meta = false): Meta {
    return {
      logins: meta ? undefined! : this.bots.map(bot => bot.toJSON()),
      proxyUrls: [...this.proxyUrls],
    }
  }
}

export default Satori
