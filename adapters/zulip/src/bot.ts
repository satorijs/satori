import { Bot, Context, Logger, Quester, Schema, Universal } from '@satorijs/satori'
import { HttpPolling } from './polling'
import { Internal } from './internal'
import { ZulipMessageEncoder } from './message'
// @ts-ignore
import { version } from '../package.json'

export class ZulipBot extends Bot<ZulipBot.Config> {
  static MessageEncoder = ZulipMessageEncoder
  public http: Quester
  public logger: Logger
  public internal: Internal
  constructor(ctx: Context, config: ZulipBot.Config) {
    super(ctx, config)

    this.platform = 'zulip'
    this.http = ctx.http.extend({
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.email}:${config.key}`).toString('base64')}`,
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': `Koishi/${version}`,
      },
    }).extend(config)
    this.internal = new Internal(this.http)
    this.logger = ctx.logger('zulip')

    ctx.plugin(HttpPolling, this)
  }

  async initliaze() {
    const { avatar_url, user_id, full_name } = await this.internal.getOwnUser()
    this.selfId = user_id.toString()
    this.username = full_name
    this.avatar = avatar_url
  }
}

export namespace ZulipBot {
  export interface Config extends Bot.Config, Quester.Config {
    email: string
    key: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      email: Schema.string(),
      key: Schema.string(),
    }),
    Quester.createConfig(),
  ])
}
