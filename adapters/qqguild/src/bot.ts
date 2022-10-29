import * as QQGuild from '@qq-guild-sdk/core'
import { Bot, Context, Fragment, Logger, Schema, segment } from '@satorijs/satori'
import { adaptGuild, adaptUser } from './utils'
import { QQGuildModulator } from './modulator'
import { WsClient } from './ws'

const logger = new Logger('satori')

function isAxiosError(e: unknown): e is {
  response: {
    status: number
    statusText: string
  }
  data: {
    code: number
    message: string
    data: any
  }
} {
  // @ts-ignore
  return e.data?.code !== undefined
}

export class QQGuildBot extends Bot<QQGuildBot.Config> {
  internal: QQGuild.Bot

  constructor(ctx: Context, config: QQGuildBot.Config) {
    super(ctx, config)
    this.internal = new QQGuild.Bot(config as QQGuild.Bot.Options)
    ctx.plugin(WsClient, this)
  }

  async getSelf() {
    const user = adaptUser(await this.internal.me)
    user['selfId'] = user.userId
    delete user.userId
    return user
  }

  async sendMessage(channelId: string, fragment: Fragment, guildId?: string) {
    try {
      return await new QQGuildModulator(this, channelId, guildId).send(fragment)
    } catch (e) {
      if (isAxiosError(e)) {
        logger.warn(`QQGuild: ${e.response.status} ${e.response.statusText} [${e.data.code}](${e.data.message})`)
        logger.warn(e.data.data)
      } else {
        logger.warn(e)
      }
    }
  }

  async getGuildList() {
    return this.internal.guilds.then(guilds => guilds.map(adaptGuild))
  }

  adaptMessage(msg: QQGuild.Message) {
    const { id: messageId, author, guildId, channelId, timestamp } = msg
    const session = this.session({
      type: 'message',
      guildId,
      messageId,
      channelId,
      timestamp: +timestamp,
    })
    session.author = adaptUser(msg.author)
    session.userId = author.id
    session.guildId = msg.guildId
    session.channelId = msg.channelId
    session.subtype = 'group'
    session.content = (msg.content ?? '')
      .replace(/<@!(.+)>/, (_, $1) => segment.at($1).toString())
      .replace(/<#(.+)>/, (_, $1) => segment.sharp($1).toString())
    const { attachments = [] } = msg as { attachments?: any[] }
    if (attachments.length > 0) {
      session.content += attachments.map((attachment) => {
        if (attachment.contentType.startsWith('image')) {
          return segment.image(attachment.url)
        }
      }).join('')
    }
    session.content = attachments
      .filter(({ contentType }) => contentType.startsWith('image'))
      .reduce((content, attachment) => content + segment.image(attachment.url), session.content)
    session.elements = segment.parse(session.content)
    return session
  }
}

export namespace QQGuildBot {
  type BotOptions = QQGuild.Bot.Options
  type CustomBotOptions = Omit<BotOptions, 'sandbox'> & Partial<Pick<BotOptions, 'sandbox'>>
  export interface Config extends Bot.Config, CustomBotOptions, WsClient.Config {
    intents?: number
    autoWithMsgId?: boolean
    autoSplit?: boolean
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      app: Schema.object({
        id: Schema.string().description('机器人 id。').required(),
        key: Schema.string().description('机器人 key。').role('secret').required(),
        token: Schema.string().description('机器人令牌。').role('secret').required(),
      }),
      autoWithMsgId: Schema.boolean().description(
        '是否自动携带消息 ID，频道未携带消息 ID 的信息会视为主动消息，有频次限制。' +
        '[详情参考](https://bot.q.qq.com/wiki/develop/api/openapi/message/post_messages.html#%E5%8A%9F%E8%83%BD%E6%8F%8F%E8%BF%B0)。'
      ).default(true),
      autoSplit: Schema.boolean().description(
        '是否自动分割消息，由于 qq 官方只支持发送一个文件，以及不保证文件顺序，开启此功能可以尽量保证 segment 的文件顺序。\n' +
        '如果你不需要该功能，可以关闭此选项，所有的文件会在文本内容发送完后按照 segement 中的相对顺序发送。'
      ).default(true),
      sandbox: Schema.boolean().description('是否开启沙箱模式。').default(true),
      endpoint: Schema.string().role('link').description('要连接的服务器地址。').default('https://api.sgroup.qq.com/'),
      authType: Schema.union(['bot', 'bearer'] as const).description('采用的验证方式。').default('bot'),
      intents: Schema.bitset(QQGuild.Bot.Intents).description('需要订阅的机器人事件。').default(QQGuild.Bot.Intents.PUBLIC_GUILD_MESSAGES),
    }),
    WsClient.Config,
  ] as const)
}

QQGuildBot.prototype.platform = 'qqguild'
