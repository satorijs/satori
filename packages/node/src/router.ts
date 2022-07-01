import { Context } from '@satorijs/core'
import { MaybeArray, remove } from 'cosmokit'
import { createServer, IncomingMessage, Server } from 'http'
import { pathToRegexp } from 'path-to-regexp'
import parseUrl from 'parseurl'
import WebSocket from 'ws'
import KoaRouter from '@koa/router'
import Koa from 'koa'

declare module 'koa' {
  // koa-bodyparser
  interface Request {
    body?: any
    rawBody?: string
  }
}

declare module '@satorijs/core' {
  interface Context {
    router: Router
  }

  namespace Context {
    interface Config extends Config.Network {}

    namespace Config {
      interface Network {
        host?: string
        port?: number
        maxPort?: number
        selfUrl?: string
      }
    }
  }
}

type WebSocketCallback = (socket: WebSocket, request: IncomingMessage) => void

export class WebSocketLayer {
  clients = new Set<WebSocket>()
  regexp: RegExp

  constructor(private router: Router, path: MaybeArray<string | RegExp>, public callback?: WebSocketCallback) {
    this.regexp = pathToRegexp(path)
  }

  accept(socket: WebSocket, request: IncomingMessage) {
    if (!this.regexp.test(parseUrl(request).pathname)) return
    this.clients.add(socket)
    socket.on('close', () => {
      this.clients.delete(socket)
    })
    this.callback?.(socket, request)
    return true
  }

  close() {
    remove(this.router.wsStack, this)
    for (const socket of this.clients) {
      socket.close()
    }
  }
}

export class Router extends KoaRouter {
  httpServer?: Server
  wsServer?: WebSocket.Server
  wsStack: WebSocketLayer[] = []

  constructor(ctx: Context) {
    super()

    // create server
    const koa = new Koa()
    koa.use(require('koa-bodyparser')())
    koa.use(this.routes())
    koa.use(this.allowedMethods())

    this.httpServer = createServer(koa.callback())
    this.wsServer = new WebSocket.Server({
      server: this.httpServer,
    })

    this.wsServer.on('connection', (socket, request) => {
      for (const manager of this.wsStack) {
        if (manager.accept(socket, request)) return
      }
      socket.close()
    })
  }

  /**
   * hack into router methods to make sure that koa middlewares are disposable
   */
  register(...args: Parameters<KoaRouter['register']>) {
    const layer = super.register(...args)
    const context = this[Context.current]
    context?.state.disposables.push(() => {
      remove(this.stack, layer)
    })
    return layer
  }

  ws(path: MaybeArray<string | RegExp>, callback?: WebSocketCallback) {
    const layer = new WebSocketLayer(this, path, callback)
    this.wsStack.push(layer)
    const context = this[Context.current]
    context?.state.disposables.push(() => layer.close())
    return layer
  }
}

Context.service('router', Router)
