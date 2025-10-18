import { Adapter, camelize, Context, Schema, Service, Time, Universal } from '@satorijs/core'
import type { HTTP } from '@cordisjs/plugin-http'
import type { Logger } from '@cordisjs/plugin-logger'
import { SatoriBot } from './bot'

export class SatoriAdapter<C extends Context = Context, B extends SatoriBot<C> = SatoriBot<C>> extends Adapter.WsClientBase<C, B> {
  static schema = true as any
  static reusable = true
  static inject = ['http']

  public http: HTTP
  public logger: Logger

  private _status = Universal.Status.OFFLINE
  private sequence?: number
  private timeout?: NodeJS.Timeout

  private _metaDispose?: () => void

  constructor(public ctx: C, public config: SatoriAdapter.Config) {
    super(ctx, config)
    this.logger = ctx.logger('satori')
    this.http = ctx.http.extend({
      baseUrl: config.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.token}`,
      },
    })
  }

  getActive() {
    return this._status !== Universal.Status.OFFLINE && this._status !== Universal.Status.DISCONNECT
  }

  setStatus(status: Universal.Status, error?: Error): void {
    this._status = status
    if (status === Universal.Status.ONLINE) return
    for (const bot of this.bots) {
      bot.status = status
      bot.error = error
    }
  }

  async prepare() {
    return this.http.ws('/v1/events')
  }

  getBot(login: Universal.Login, action?: 'created' | 'updated' | 'removed') {
    // FIXME Do not dispatch event from outside adapters.
    let bot = this.bots.find(bot => bot.config.sn === login.sn)
    if (bot) {
      if (action === 'created') {
        this.logger.warn('bot already exists when login created, sn = %s, adapter = %s', login.sn, login.adapter)
      } else if (action === 'updated') {
        bot.update(login)
      } else if (action === 'removed') {
        bot.dispose()
      }
      return bot
    } else if (!action) {
      this.logger.warn('bot not found when non-login event received, sn = %s, adapter = %s', action, login.sn, login.adapter)
      return
    }

    bot = new SatoriBot(this.ctx, login) as B
    bot.adapter = this
    this.bots.push(bot)
  }

  accept(socket: WebSocket) {
    socket.send(JSON.stringify({
      op: Universal.Opcode.IDENTIFY,
      body: {
        token: this.config.token,
        sn: this.sequence,
      },
    }))

    clearInterval(this.timeout)
    this.timeout = setInterval(() => {
      if (socket !== this.socket) return
      socket.send(JSON.stringify({
        op: Universal.Opcode.PING,
        body: {},
      }))
    }, Time.second * 10)

    socket.addEventListener('message', async ({ data }) => {
      let parsed: Universal.ServerPayload
      data = data.toString()
      try {
        parsed = Universal.transformKey(JSON.parse(data), camelize)
      } catch (error) {
        return this.logger.warn('cannot parse message', data)
      }

      if (parsed.op === Universal.Opcode.READY) {
        this.logger.debug('ready')
        for (const login of parsed.body.logins) {
          this.getBot(login)
        }
        this._metaDispose?.()
        this._metaDispose = this.ctx.satori.proxyUrls.add(...parsed.body.proxyUrls ?? [])
      }

      if (parsed.op === Universal.Opcode.META) {
        this._metaDispose?.()
        this._metaDispose = this.ctx.satori.proxyUrls.add(...parsed.body.proxyUrls ?? [])
      }

      if (parsed.op === Universal.Opcode.EVENT) {
        // Satori protocol ensures that login.user and login.platform are always present ?
        const { sn, type, login } = parsed.body
        this.sequence = sn
        // `login-*` events will be dispatched by the bot,
        // so there is no need to create sessions manually.
        const bot = this.getBot(login, type.startsWith('login-') ? type.slice(6) as any : undefined)
        if (!bot) return
        const session = bot.session(parsed.body)
        if (typeof parsed.body.message?.content === 'string') {
          session.content = parsed.body.message.content
        }
        if (parsed.body._type && parsed.body.type !== 'internal') {
          session.setInternal(parsed.body._type, parsed.body._data)
        }
        bot.dispatch(session)
        // temporary solution for `send` event
        if (type === 'message-created' && session.userId === login.user?.id) {
          session.app.emit(session, 'send', session)
        }
      }
    })

    socket.addEventListener('close', () => {
      clearInterval(this.timeout)
      this._metaDispose?.()
    })
  }

  async* [Service.init]() {
    yield async () => {
      this.setStatus(Universal.Status.DISCONNECT)
      await super.stop()
    }

    this.setStatus(Universal.Status.CONNECT)
    await super.start()
  }
}

export namespace SatoriAdapter {
  export interface Config extends Adapter.WsClientConfig {
    baseUrl: string
    token?: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      baseUrl: Schema.string().description('API 终结点。').required(),
      token: Schema.string().description('API 访问令牌。'),
    }),
    Adapter.WsClientConfig,
  ] as const)
}
