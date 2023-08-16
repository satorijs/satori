import { Bot, Context, omit, Quester, Schema } from '@satorijs/satori'
import { WsServer } from './ws'
import { Internal } from './internal'
import { RocketChatMessageEncoder } from './message'

export class RocketChatBot extends Bot<RocketChatBot.Config> {
  static MessageEncoder = RocketChatMessageEncoder
  public http: Quester
  public internal: Internal
  public logger = this.ctx.logger('rocketchat')
  public token = ''
  public endpoint: string
  constructor(ctx: Context, config: RocketChatBot.Config) {
    super(ctx, config)
    this.endpoint = (this.config.endpoint || `https://${this.config.host}`)
    this.http = ctx.http.extend({
      endpoint: this.endpoint,
    }).extend(config)
    this.internal = new Internal(this.http)
    ctx.plugin(WsServer, this)
  }

  callMethod(method: string, params: any[]) {
    const id = Math.random().toString().slice(2)
    this.socket.send(JSON.stringify({
      'msg': 'method',
      method,
      id,
      params,
    }))
    return id
  }

  subscribe(name: string, params: any[]) {
    const id = Math.random().toString().slice(2)
    this.socket.send(JSON.stringify({
      'msg': 'sub',
      name,
      id,
      params,
    }))
    return id
  }

  async initliaze() {
    const data = await this.internal.login(this.config.username, this.config.password)
    this.token = data.authToken
    this.selfId = data.userId
    this.http.config.headers['X-Auth-Token'] = this.token
    this.http.config.headers['X-User-Id'] = this.selfId
    // const statistics = await this.internal.statistics()
    // this.logger.info('statistics: %s', JSON.stringify(statistics, null, 2))
    // this.userId = `@${this.config.username}:${this.config.host}`
    this.platform = 'rocketchat'
    this.username = data.me.name
  }
}

export namespace RocketChatBot {
  export interface Config extends Bot.Config, Quester.Config {
    username: string
    password: string
    endpoint: string
    host: string
  }
  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      username: Schema.string().required(),
      password: Schema.string().role('secret').required(),
      host: Schema.string().description('Matrix Homeserver 域名。').required(),
      endpoint: Schema.string().description('Matrix Homeserver 地址。默认为 `https://{host}`。'),
      ...omit(Quester.Config.dict, ['endpoint']),
    }),
  ] as const)
}
