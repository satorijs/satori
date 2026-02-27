import { Bot, Context, HTTP, Schema, Universal } from '@satorijs/core'
import { HttpPolling } from './polling'
import { Internal } from './types'
import { ZulipMessageEncoder } from './message'
// @ts-ignore
import { version } from '../package.json'
import { decodeGuild, decodeMessage, decodeUser } from './utils'

export class ZulipBot<C extends Context = Context> extends Bot<C, ZulipBot.Config> {
  static MessageEncoder = ZulipMessageEncoder
  static inject = ['http']

  public http: HTTP
  public internal: Internal

  constructor(ctx: C, config: ZulipBot.Config) {
    super(ctx, config, 'zulip')
    this.http = ctx.http.extend({
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.email}:${config.key}`).toString('base64')}`,
        'user-agent': `Koishi/${version}`,
      },
    }).extend({
      ...config,
      baseURL: config.endpoint + '/api/v1/',
    })
    this.internal = new Internal(this.http)

    ctx.plugin(HttpPolling, this)
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
  export interface Config extends HTTP.Config, HttpPolling.Options {
    email: string
    key: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      email: Schema.string().required().description('Bot Email'),
      key: Schema.string().required().role('secret').description('API Key'),
    }),
    Schema.union([
      HttpPolling.Options,
    ]).description('推送设置'),
    HTTP.createConfig(),
  ])
}
