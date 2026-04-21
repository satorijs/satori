import { Bot, Context, Inject, Time, Universal } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { Internal } from './types'
import { ZulipMessageEncoder } from './message'
// @ts-ignore
import { version } from '../package.json'
import { adaptSession, decodeGuild, decodeMessage, decodeUser } from './utils'
import z from 'schemastery'

@Inject('http')
@Inject('logger', true, { name: 'zulip' })
export class ZulipBot extends Bot<ZulipBot.Config> {
  static MessageEncoder = ZulipMessageEncoder

  public http: HTTP
  public internal: Internal
  private timeout: NodeJS.Timeout

  constructor(ctx: Context, config: ZulipBot.Config) {
    super(ctx, config, 'zulip')
    this.http = ctx.http.extend({
      baseUrl: config.baseUrl + '/api/v1/',
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.email}:${config.key}`).toString('base64')}`,
        'user-agent': `Koishi/${version}`,
      },
    })
    this.internal = new Internal(this.http)
  }

  async connect() {
    await this.getLogin()
    const r = await this.internal.registerQueue({
      // event_types: `["message"]`,
    })
    let last = -1
    let _retryCount = 0
    this.online()
    const { retryTimes, retryInterval } = this.config
    const polling = async () => {
      try {
        const updates = await this.internal.getEvents({
          queue_id: r.queue_id,
          last_event_id: last,
        })
        if (!this.isActive) {
          return this.offline()
        }
        this.online()
        _retryCount = 0
        for (const e of updates.events) {
          this.ctx.logger.debug('[receive] %o', e)

          last = Math.max(last, e.id)
          const session = await adaptSession(this, e)

          if (session) this.dispatch(session)
          this.ctx.logger.debug('[session] %o', session)
        }
        setTimeout(polling, 0)
      } catch (e) {
        if (!this.ctx.http.isError(e) || !e.response) {
          this.ctx.logger.warn('failed to get updates. reason: %s', e.stack)
        } else {
          this.ctx.logger.error(e.stack)
        }
        if (_retryCount > retryTimes) {
          this.error = e
          return this.status = Universal.Status.OFFLINE
        }
        _retryCount++
        this.status = Universal.Status.RECONNECT
        this.timeout = setTimeout(() => polling(), retryInterval)
      }
    }
    polling()
    this.ctx.logger.debug('listening updates %c', this.sid)
  }

  async disconnect() {
    clearTimeout(this.timeout)
  }

  async getGuildList() {
    const { streams } = await this.internal.getStreams()
    return { data: streams.map(decodeGuild) }
  }

  async getGuild(guildId: string) {
    const { stream } = await this.internal.getStreamById(guildId)
    return decodeGuild(stream)
  }

  async getChannelList(guildId: string) {
    const { topics } = await this.internal.getStreamTopics(guildId)
    return { data: topics.map(({ name }) => ({ id: name, type: Universal.Channel.Type.TEXT })) }
  }

  async getGuildMember(guildId: string, userId: string) {
    const { user } = await this.internal.getUser(userId)
    return decodeUser(user)
  }

  getUser(userId: string, guildId?: string) {
    return this.getGuildMember(guildId, userId)
  }

  async getGuildMemberList(guildId: string) {
    const { members } = await this.internal.getUsers()
    return { data: members.map(m => ({ user: decodeUser(m) })) }
  }

  async getMessage(channelId: string, messageId: string) {
    const { message } = await this.internal.getMessage(messageId)
    return await decodeMessage(this, message)
  }

  async getLogin() {
    const self = await this.internal.getOwnUser()
    this.user = decodeUser(self)
    return this.toJSON()
  }

  async getMessageList(channelId: string, before?: string) {
    const { messages } = await this.internal.getMessages({
      num_before: 50,
      num_after: 0,
      narrow: JSON.stringify([
        { operator: 'topic', operand: channelId },
      ]),
      anchor: before ?? 'newest',
      apply_markdown: false,
    })
    const data = await Promise.all(messages.map(data => decodeMessage(this, data)))
    return { data, next: data[0].id }
  }

  async getReactions(channelId: string, messageId: string, emoji: string) {
    const { message } = await this.internal.getMessage(messageId)
    return message.reactions.map(v => decodeUser(v.user))
  }

  async createReaction(channelId: string, messageId: string, emojiId: string) {
    await this.internal.addReaction(messageId, {
      emoji_name: emojiId,
    })
  }

  async deleteReaction(channelId: string, messageId: string, emojiId: string) {
    await this.internal.removeReaction(messageId, {
      emoji_name: emojiId,
    })
  }
}

export namespace ZulipBot {
  export interface Config {
    baseUrl: string
    email: string
    key: string
    protocol: 'polling'
    retryTimes?: number
    retryInterval?: number
  }

  export const Config: z<Config> = z.intersect([
    z.object({
      baseUrl: z.string().role('url').required().description('Zulip 服务器地址。'),
      email: z.string().required().description('Bot Email'),
      key: z.string().required().role('secret').description('API Key'),
    }),
    z.object({
      protocol: z.const('polling').required(process.env.KOISHI_ENV !== 'browser'),
      retryTimes: z.natural().description('连接时的最大重试次数。').default(6),
      retryInterval: z.natural().role('ms').default(Time.second * 5).description('长轮询断开后的重试时间间隔 (单位为毫秒)。'),
    }).description('推送设置'),
  ])
}
