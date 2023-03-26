import * as QQGuild from '@qq-guild-sdk/core'
import { Bot, Context, Fragment, h, Schema, SendOptions } from '@satorijs/satori'
import { segment } from '@satorijs/core'
import { adaptGuild, adaptUser } from './utils'
import { QQGuildMessenger } from './message'
import { WsClient } from './ws'

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

  async sendMessage(channelId: string, fragment: Fragment, guildId?: string, opts?: SendOptions) {
    const messenger = new QQGuildMessenger(this, channelId, guildId, opts)
    try {
      return await messenger.send(fragment)
    } catch (e) {
      // https://bot.q.qq.com/wiki/develop/api/openapi/error/error.html#%E9%94%99%E8%AF%AF%E7%A0%81%E5%A4%84%E7%90%86:~:text=304031,%E6%8B%89%E7%A7%81%E4%BF%A1%E9%94%99%E8%AF%AF
      if ([304031, 304032, 304033].includes(e.code)) {
        await this.internal.createDMS(channelId, guildId)
        return await messenger.send(fragment)
      }
      throw e
    }
  }

  async sendPrivateMessage(userId: string, content: segment.Fragment, options?: SendOptions): Promise<string[]> {
    return this.sendMessage(userId, content, options.session.guildId, options)
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
    // TODO https://github.com/satorijs/satori/blob/fbcf4665c77381ff80c8718106d2282a931d5736/packages/core/src/message.ts#L23
    //      satori core need set guildId is undefined when isPrivate
    //      this is a temporary solution
    if (msg.isPrivate) {
      session.guildId = undefined
      session.channelId = msg.guildId
    } else {
      session.guildId = msg.guildId
      session.channelId = msg.channelId
    }
    // it's useless, but I need it
    session.subtype = msg.isPrivate ? 'private' : 'group'
    session.content = (msg.content ?? '')
      .replace(/<@!(.+)>/, (_, $1) => h.at($1).toString())
      .replace(/<#(.+)>/, (_, $1) => h.sharp($1).toString())
    const { attachments = [] } = msg as { attachments?: any[] }
    if (attachments.length > 0) {
      session.content += attachments.map((attachment) => {
        if (attachment.contentType.startsWith('image')) {
          return h.image(attachment.url)
        }
      }).join('')
    }
    session.content = attachments
      .filter(({ contentType }) => contentType.startsWith('image'))
      .reduce((content, attachment) => content + h.image(attachment.url), session.content)
    session.elements = h.parse(session.content)
    return session
  }
}

export namespace QQGuildBot {
  type BotOptions = QQGuild.Bot.Options
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
      }),
      sandbox: Schema.boolean().description('是否开启沙箱模式。').default(true),
      endpoint: Schema.string().role('link').description('要连接的服务器地址。').default('https://api.sgroup.qq.com/'),
      authType: Schema.union(['bot', 'bearer'] as const).description('采用的验证方式。').default('bot'),
      intents: Schema.bitset(QQGuild.Bot.Intents).description('需要订阅的机器人事件。').default(QQGuild.Bot.Intents.PUBLIC_GUILD_MESSAGES),
    }),
    WsClient.Config,
  ] as const)
}

QQGuildBot.prototype.platform = 'qqguild'
