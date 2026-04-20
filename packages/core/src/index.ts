import { Context, Service } from 'cordis'
import { Awaitable, defineProperty, Dict } from 'cosmokit'
import { Bot } from './bot'
import { InternalRouteCallback, InternalRouter, JsonForm } from './internal'
import { Session } from './session'
import type {} from '@cordisjs/plugin-http'
import { Meta, SendOptions } from '@satorijs/protocol'
import { ExtractParams } from 'path-to-regexp-typed'
import * as h from '@satorijs/element'

export * from 'cordis'
export * from 'cosmokit'

export * from '@satorijs/element'
export * as Universal from '@satorijs/protocol'

export * from './bot'
export * from './adapter'
export * from './message'
export * from './internal'
export * from './session'

declare module 'cordis' {
  export interface Context {
    [Context.session]: Session
    satori: Satori
    bots: Bot[] & Dict<Bot>
    component(name: string, component: Component<Session>, options?: Component.Options): () => void
  }

  export namespace Context {
    const session: unique symbol
  }

  interface Events {
    'satori/meta'(): void
    'internal/session'(session: Session): void
    'interaction/command'(session: Session): void
    'interaction/button'(session: Session): void
    'message'(session: Session): void
    'message-created'(session: Session): void
    'message-deleted'(session: Session): void
    'message-updated'(session: Session): void
    'message-pinned'(session: Session): void
    'message-unpinned'(session: Session): void
    'guild-added'(session: Session): void
    'guild-removed'(session: Session): void
    'guild-updated'(session: Session): void
    'guild-member-added'(session: Session): void
    'guild-member-removed'(session: Session): void
    'guild-member-updated'(session: Session): void
    'guild-role-created'(session: Session): void
    'guild-role-deleted'(session: Session): void
    'guild-role-updated'(session: Session): void
    'reaction-added'(session: Session): void
    'reaction-removed'(session: Session): void
    'login-added'(session: Session): void
    'login-removed'(session: Session): void
    'login-updated'(session: Session): void
    'friend-request'(session: Session): void
    'guild-request'(session: Session): void
    'guild-member-request'(session: Session): void
    'before-send'(session: Session, options: SendOptions): Awaitable<void | boolean>
    'send'(session: Session): void
    'bot-connect'(client: Bot): Awaitable<void>
    'bot-disconnect'(client: Bot): Awaitable<void>
  }
}

export type Component<S extends Session = Session> = h.Render<Awaitable<h.Fragment>, S>

export namespace Component {
  export interface Options {
    session?: boolean
  }
}

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

export class Satori extends Service {
  public uid = Math.random().toString(36).slice(2)
  public proxyUrls: DisposableSet<string> = new DisposableSet(this.ctx)

  public _internalRouter: InternalRouter
  public _tempStore: Dict<Response> = Object.create(null)

  public _loginSeq = 0
  public _sessionSeq = 0

  constructor(ctx: Context) {
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

  public bots = new Proxy([] as Bot[], {
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
  }) as Bot[] & Dict<Bot>

  component(name: string, component: Component<Session>, options: Component.Options = {}) {
    const render: Component = async (attrs, children, session) => {
      if (options.session && session.type === 'send') {
        throw new Error('interactive components is not available outside sessions')
      }
      const result = await component(attrs, children, session)
      return session.transform(h.normalize(result))
    }
    return this.ctx.set('component:' + name, render)
  }

  defineInternalRoute<P extends string>(path: P, callback: InternalRouteCallback<ExtractParams<P>>) {
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
