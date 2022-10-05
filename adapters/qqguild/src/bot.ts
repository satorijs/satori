import * as QQGuild from '@qq-guild-sdk/core'
import { Bot, Context, Schema, segment } from '@satorijs/satori'
import { adaptGuild, adaptUser } from './utils'
import { WsClient } from './ws'

export class QQGuildBot<C extends Context = Context> extends Bot<C, QQGuildBot.Config> {
  internal: QQGuild.Bot

  constructor(ctx: C, config: QQGuildBot.Config) {
    super(ctx, config)
    this.internal = new QQGuild.Bot(config)
    ctx.plugin(WsClient, this)
  }

  async getSelf() {
    const user = adaptUser(await this.internal.me)
    user['selfId'] = user.userId
    delete user.userId
    return user
  }

  async sendMessage(channelId: string, fragment: string | segment, guildId?: string) {
    const element = segment.normalize(fragment)
    const session = this.session({
      content: element.toString(),
      elements: element.children,
      guildId,
      author: this,
      type: 'send',
      subtype: 'group',
    })

    if (await this.context.serial(session, 'before-send', session)) return
    if (!session.content) return []
    const ids: string[] = []
    for (const content of this.render(session.content)) {
      const resp = await this.internal.send.channel(channelId, content)
      ids.push(session.messageId = resp.id)
      this.context.emit(session, 'message', this.adaptMessage(resp))
    }
    this.context.emit(session, 'send', session)
    return ids
  }

  async getGuildList() {
    return this.internal.guilds.then(guilds => guilds.map(adaptGuild))
  }

  render(source: string | segment) {
    const result: string[] = []
    let current = ''
    const flush = () => {
      if (current) result.push(current)
      current = ''
    }
    const render = (elements: segment[]) => {
      for (const element of elements) {
        let { type, attrs, children } = element
        if (type === 'text') {
          current += attrs.content
        } else if (type === 'message') {
          flush()
          if ('quote' in attrs) {
            // not supported
          } else {
            render(children)
          }
        }
      }
      flush()
    }
    render(segment.normalize(source).children)
    return result
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
  export interface Config extends Bot.Config, QQGuild.Bot.Options, WsClient.Config {
    intents: number
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
