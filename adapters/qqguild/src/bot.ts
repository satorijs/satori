import { Bot, Context, defineProperty, Quester, Schema, Universal } from '@satorijs/satori'
import { adaptUser, decodeMessage } from './utils'
import { QQGuildMessageEncoder } from './message'
import { WsClient } from './ws'
import { Internal } from './internal'
import * as QQGuild from './types'

export class QQGuildBot extends Bot<QQGuildBot.Config> {
  static MessageEncoder = QQGuildMessageEncoder

  internal: Internal
  http: Quester

  constructor(ctx: Context, config: QQGuildBot.Config) {
    super(ctx, config)
    this.platform = 'qqguild'
    this.http = ctx.http.extend({
      endpoint: config.endpoint,
      headers: {
        Authorization: `Bot ${this.config.app.id}.${this.config.app.token}`,
      },
    })
    this.internal = new Internal(this.http)
    ctx.plugin(WsClient, this)
  }

  session(payload?: any, input?: any) {
    return defineProperty(super.session(payload), 'qqguild', Object.assign(Object.create(this.internal), input))
  }

  async initialize() {
    const self = await this.getSelf()
    this.name = self.name
    this.username = self.name
    this.selfId = self.id
    this.avatar = self.avatar
  }

  async getSelf() {
    const user = adaptUser(await this.internal.getMe())
    return user
  }

  // async getGuildList() {
  //   const guilds = await this.internal.guilds
  //   return { data: guilds.map(adaptGuild) }
  // }
  async getMessage(channelId: string, messageId: string): Promise<Universal.Message> {
    const r = await this.internal.getMessage(channelId, messageId)
    return decodeMessage(this, r)
  }
}

export namespace QQGuildBot {
  type BotOptions = QQGuild.Options
  type CustomBotOptions = Omit<BotOptions, 'sandbox'> & Partial<Pick<BotOptions, 'sandbox'>>
  export interface Config extends Bot.Config, CustomBotOptions, WsClient.Config {
    intents?: number
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      app: Schema.object({
        id: Schema.string().description('机器人 id。').required(),
        key: Schema.string().description('机器人 key。').role('secret').required(),
        token: Schema.string().description('机器人令牌。').role('secret').required(),
        type: Schema.union(['public', 'private'] as const).description('机器人类型。').required(),
      }) as any,
      sandbox: Schema.boolean().description('是否开启沙箱模式。').default(true),
      endpoint: Schema.string().role('link').description('要连接的服务器地址。').default('https://api.sgroup.qq.com/'),
      authType: Schema.union(['bot', 'bearer'] as const).description('采用的验证方式。').default('bot'),
      intents: Schema.bitset(QQGuild.Intents).description('需要订阅的机器人事件。').default(QQGuild.Intents.PUBLIC_GUILD_MESSAGES),
    }),
    WsClient.Config,
  ] as const)
}
