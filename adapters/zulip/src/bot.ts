import { Bot, Context, Logger, Quester, Schema, Universal } from '@satorijs/satori'
import { HttpPolling } from './polling'
import { Internal } from './types'
import { ZulipMessageEncoder } from './message'
// @ts-ignore
import { version } from '../package.json'
import { decodeGuild, decodeMember, decodeMessage } from './utils'

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
    }).extend({
      ...config,
      endpoint: config.endpoint + '/api/v1',
    })
    this.internal = new Internal(this.http)
    this.logger = ctx.logger('zulip')

    ctx.plugin(HttpPolling, this)
  }

  async initliaze() {
    const { avatar, userId, username } = await this.getSelf()
    this.selfId = userId
    this.username = username
    this.avatar = avatar
  }

  async getGuildList() {
    const { streams } = await this.internal.getStreams()
    return streams.map(decodeGuild)
  }

  async getGuild(guildId: string) {
    const { stream } = await this.internal.getStreamById(guildId)
    return decodeGuild(stream)
  }

  async getChannelList(guildId: string) {
    const { topics } = await this.internal.getStreamTopics(guildId)
    return topics.map(({ name }) => ({ channelId: name }))
  }

  async getGuildMember(guildId: string, userId: string) {
    const { user } = await this.internal.getUser(userId)
    return decodeMember(user)
  }

  getUser(userId: string, guildId?: string) {
    return this.getGuildMember(guildId, userId)
  }

  async getGuildMemberList(guildId: string) {
    const { members } = await this.internal.getUsers()
    return members.map(decodeMember)
  }

  async getMessage(channelId: string, messageId: string) {
    const { message } = await this.internal.getMessage(messageId)
    const msg = await decodeMessage(this, message)
    return msg
  }

  async getSelf() {
    const self = await this.internal.getOwnUser()
    return decodeMember(self)
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
    return await Promise.all(messages.map(data => decodeMessage(this, data)))
  }

  async getReactions(channelId: string, messageId: string, emoji: string): Promise<Universal.User[]> {
    const { message } = await this.internal.getMessage(messageId)
    return message.reactions.map(v => ({
      userId: v.user_id.toString(),
      username: v.user.full_name,
    }))
  }

  async createReaction(channelId: string, messageId: string, emoji: string) {
    await this.internal.addReaction(messageId, {
      emoji_name: emoji,
    })
  }

  async deleteReaction(channelId: string, messageId: string, emoji: string) {
    await this.internal.removeReaction(messageId, {
      emoji_name: emoji,
    })
  }
}

export namespace ZulipBot {
  export interface Config extends Bot.Config, Quester.Config, HttpPolling.Config {
    email: string
    key: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      email: Schema.string().required().description('Bot Email'),
      key: Schema.string().required().role('secret').description('API Key'),
    }),
    Schema.union([
      HttpPolling.Config,
    ]).description('推送设置'),
    Quester.createConfig(),
  ])
}
