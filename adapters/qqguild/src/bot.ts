import { Bot, Context, defineProperty, Fragment, h, Quester, Schema, SendOptions } from '@satorijs/satori'
import { adaptGuild, adaptUser } from './utils'
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

  adaptMessage(msg: QQGuild.Message
    , input?: QQGuild.Payload,
  ) {
    const { id: messageId, author, guild_id, channel_id, timestamp } = msg
    const session = this.session({
      type: 'message',
      guildId: guild_id,
      messageId,
      channelId: channel_id,
      timestamp: new Date(timestamp).valueOf(),
    }
    , input,
    )
    session.author = adaptUser(msg.author)
    session.userId = author.id
    if (msg.direct_message) {
      session.guildId = msg.src_guild_id
    } else {
      session.guildId = guild_id
      session.channelId = channel_id
    }
    session.isDirect = !!msg.direct_message
    session.content = (msg.content ?? '')
      .replace(/<@!(.+)>/, (_, $1) => h.at($1).toString())
      .replace(/<#(.+)>/, (_, $1) => h.sharp($1).toString())
    const { attachments = [] } = msg as { attachments?: any[] }
    session.content = attachments
      .filter(({ contentType }) => contentType.startsWith('image'))
      .reduce((content, attachment) => content + h.image(attachment.url), session.content)
    session.elements = h.parse(session.content)
    return session
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
      }) as any,
      sandbox: Schema.boolean().description('是否开启沙箱模式。').default(true),
      endpoint: Schema.string().role('link').description('要连接的服务器地址。').default('https://api.sgroup.qq.com/'),
      authType: Schema.union(['bot', 'bearer'] as const).description('采用的验证方式。').default('bot'),
      intents: Schema.bitset(QQGuild.Intents).description('需要订阅的机器人事件。').default(QQGuild.Intents.PUBLIC_GUILD_MESSAGES),
    }),
    WsClient.Config,
  ] as const)
}
