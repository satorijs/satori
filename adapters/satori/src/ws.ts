import { Adapter, camelize, Context, Logger, Quester, Schema, Time, Universal } from '@satorijs/satori'
import { SatoriBot, transformKey } from './bot'

const logger = new Logger('satori')

export class SatoriAdapter extends Adapter.WsClientBase<SatoriBot> {
  static schema = true
  static reusable = true

  public http: Quester

  private isActive = true
  private sequence?: number
  private timeout?: NodeJS.Timeout

  constructor(public ctx: Context, config: SatoriAdapter.Config) {
    super(ctx, config)
    this.http = ctx.http.extend(config)
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

  accept() {
    this.socket.send(JSON.stringify({
      op: Universal.Opcode.IDENTIFY,
      body: {
        sequence: this.sequence,
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
          const { selfId, platform } = login
          if (this.bots.some(bot => bot.selfId === selfId && bot.platform === platform)) continue
          const bot = new SatoriBot(this.ctx, login)
          bot.adapter = this
          bot.http = this.http
          this.bots.push(bot)
        }
      }

      if (parsed.op === Universal.Opcode.EVENT) {
        const { id, selfId, platform } = parsed.body
        this.sequence = id
        const bot = this.bots.find(bot => bot.selfId === selfId && bot.platform === platform)
        const session = bot.session(parsed.body)
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
    endpoint: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      endpoint: Schema.string().description('API 终结点。').required(),
    }),
    Adapter.WsClientConfig,
  ] as const)
}
