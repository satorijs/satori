import { Adapter, camelize, Context, Logger, Quester, Schema, Time, Universal } from '@satorijs/satori'
import { SatoriBot, transformKey } from './bot'

const logger = new Logger('satori')

export class SatoriAdapter extends Adapter.WsClientBase<SatoriBot> {
  static schema = true
  static reusable = true

  public http: Quester

  private isActive = true
  private sequence?: number
  private token?: string
  private timeout?: NodeJS.Timeout

  constructor(public ctx: Context, config: SatoriAdapter.Config) {
    super(ctx, config)
    this.http = ctx.http.extend(config)
    this.token = config.token
    ctx.on('ready', () => this.start())
    ctx.on('dispose', () => this.stop())
  }

  getActive() {
    return this.isActive
  }

  setStatus(status: Universal.Status, error?: Error): void {
    if (status === Universal.Status.OFFLINE) {
      this.isActive = false
    }
    for (const bot of this.bots) {
      bot.status = status
      bot.error = error
    }
  }

  async prepare() {
    return this.http.ws('/v1/events')
  }

  getBot(platform: string, selfId: string, login: Universal.Login) {
    let bot = this.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
    // Do not dispatch event from outside adapters.
    if (bot) return this.bots.includes(bot) ? bot : undefined
    if (!login) {
      logger.error('cannot find bot for', platform, selfId)
      return
    }
    bot = new SatoriBot(this.ctx, login)
    bot.adapter = this
    bot.http = this.http
    this.bots.push(bot)
  }

  accept() {
    this.socket.send(JSON.stringify({
      op: Universal.Opcode.IDENTIFY,
      body: {
        sequence: this.sequence,
        token: this.token,
      },
    }))

    this.timeout = setInterval(() => {
      this.socket.send(JSON.stringify({
        op: Universal.Opcode.PING,
        body: {},
      }))
    }, Time.second * 10)

    this.socket.addEventListener('message', async ({ data }) => {
      let parsed: Universal.ServerPayload
      try {
        parsed = transformKey(JSON.parse(data.toString()), camelize)
      } catch (error) {
        return logger.warn('cannot parse message', data)
      }

      if (parsed.op === Universal.Opcode.READY) {
        logger.debug('ready')
        for (const login of parsed.body.logins) {
          this.getBot(login.platform, login.selfId, login)
        }
      }

      if (parsed.op === Universal.Opcode.EVENT) {
        const { id, type, selfId, platform, login } = parsed.body
        this.sequence = id
        // `login-*` events will be dispatched by the bot,
        // so there is no need to create sessions manually.
        const bot = this.getBot(platform, selfId, type === 'login-added' && login)
        if (!bot) return
        if (type === 'login-updated') {
          return bot.update(login)
        } else if (type === 'login-removed') {
          return bot.dispose()
        }
        const session = bot.session(parsed.body)
        if (parsed.body._type && parsed.body.type !== 'internal') {
          session.setInternal(parsed.body._type, parsed.body._data)
        }
        bot.dispatch(session)
      }
    })

    this.socket.addEventListener('close', () => {
      clearInterval(this.timeout)
    })
  }
}

export namespace SatoriAdapter {
  export interface Config extends Adapter.WsClientConfig {
    endpoint: string,
    token: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      endpoint: Schema.string().description('API 终结点。').required(),
      token: Schema.string().description('鉴权令牌。'),
    }),
    Adapter.WsClientConfig,
  ] as const)
}
