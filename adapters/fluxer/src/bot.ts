import { Bot, Context, Dict, h, HTTP, makeArray, Schema, Universal } from '@satorijs/core'
import { discover } from './discovery'
import { FluxerMessageEncoder } from './message'
import type { Discovery, GuildRole, Message, User } from './types'
import { decodeGuildMember, decodeMessage, decodeUser } from './utils'
import { WsClient } from './ws'

// @ts-ignore
import { version } from '../package.json'

export class FluxerBot<C extends Context = Context> extends Bot<C, FluxerBot.Config> {
  static MessageEncoder = FluxerMessageEncoder
  static inject = ['http']

  public http: HTTP
  public internal: Internal<C>
  declare user?: User & { username?: string }
  public discovery!: Discovery

  constructor(ctx: C, config: FluxerBot.Config) {
    super(ctx, config, 'fluxer')
    const apiBase = config.apiBase.replace(/\/+$/, '')
    this.internal = new Internal(this, apiBase)
    this.http = ctx.http.extend({
      ...config,
      baseURL: `${apiBase}/v1`,
      headers: {
        Authorization: config.type === 'user' ? config.token : `Bot ${config.token}`,
        'User-Agent': `Satori (https://koishi.chat/, ${version})`,
        ...config.headers,
      },
    })
    ctx.plugin(WsClient, this)
  }

  async start() {
    super.start()
    this.discovery = await discover(this.config.discovery)
    this.ctx.satori.proxyUrls.add(this.discovery.endpoints.media)
    await this.refreshUser()
  }

  private async refreshUser() {
    const user = await this.internal.getCurrentUser()
    this.user = user
    this.logger.debug('logged in as %s', user?.username ?? user?.id)
  }

  async getMessage(channelId: string, messageId: string) {
    const session = this.session()
    const message: Universal.Message = {} as any
    session.event.message = message
    const data = await this.internal.getChannelMessage(channelId, messageId)
    return decodeMessage(this, data as Message, message, message)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteMessage(channelId, messageId)
  }

  async editMessage(channelId: string, messageId: string, content: h.Fragment): Promise<void> {
    const session = this.session()
    session.event.channel = { id: channelId, type: Universal.Channel.Type.TEXT }
    session.messageId = messageId
    const encoder = new FluxerMessageEncoder(this, channelId, { messageId }, { session })
    await encoder.send(content)
  }

  async sendMessage(channelId: string, content: h.Fragment, referrer?: any, options?: any): Promise<string[]> {
    const encoder = new FluxerMessageEncoder(this, channelId, referrer, options)
    const results = await encoder.send(content)
    return results.map((message: any) => message.id).filter(Boolean)
  }

  async getUser(userId: string): Promise<Universal.User> {
    const data = await this.internal.getUser(userId)
    return decodeUser(data)
  }

  async getGuild(guildId: string): Promise<Universal.Guild> {
    const data = await this.internal.getGuild(guildId)
    return { id: data.id, name: data.name }
  }

  async getGuildMember(guildId: string, userId: string) {
    const data = await this.internal.getGuildMember(guildId, userId)
    return decodeGuildMember(data)
  }

  async getGuildRoles(guildId: string): Promise<Universal.GuildRole[]> {
    const guild = await this.internal.getGuild(guildId)
    return (guild.roles ?? []).map((role: GuildRole) => ({ ...role, permissions: BigInt(role.permissions ?? 0) }))
  }

  async createReaction(channelId: string, messageId: string, emoji: string) {
    await this.internal.createReaction(channelId, messageId, encodeURIComponent(emoji))
  }

  async deleteReaction(channelId: string, messageId: string, emoji: string) {
    await this.internal.deleteOwnReaction(channelId, messageId, encodeURIComponent(emoji))
  }
}

export namespace FluxerBot {
  export type LoginType = 'bot' | 'user'

  export interface Config extends HTTP.Config {
    type: LoginType
    token: string
    apiBase: string
    discovery?: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      type: Schema.union(['bot', 'user']).default('bot').description('登录方式'),
    }),
    Schema.object({
      token: Schema.string().role('secret').required().description('Bot token：`Bot <token>` 的 token 部分。'),
    }),
    Schema.object({
      apiBase: Schema.string().default('https://api.fluxer.app').description('实例 API 地址。自建实例填自建地址。'),
      // eslint-disable-next-line no-template-curly-in-string
      discovery: Schema.string().description('发现文档地址，缺省取 `${apiBase}/.well-known/fluxer`'),
    }).description('实例设置'),
    HTTP.createConfig(),
  ]) as any
}

export interface InternalApi {
  getGatewayBot(): Promise<any>
  getCurrentUser(): Promise<User>
  getCurrentUserGuilds(params?: any): Promise<any[]>
  getUser(userId: string): Promise<any>
  getGuild(guildId: string): Promise<any>
  getGuildChannels(guildId: string): Promise<any[]>
  getGuildMember(guildId: string, userId: string): Promise<any>
  getGuildRoles(guildId: string): Promise<any[]>
  getChannel(channelId: string): Promise<any>
  getChannelMessages(channelId: string, params?: any): Promise<any[]>
  getChannelMessage(channelId: string, messageId: string): Promise<any>
  createMessage(channelId: string, data: any): Promise<any>
  editMessage(channelId: string, messageId: string, data: any): Promise<any>
  deleteMessage(channelId: string, messageId: string): Promise<void>
  createReaction(channelId: string, messageId: string, emoji: string): Promise<void>
  deleteOwnReaction(channelId: string, messageId: string, emoji: string): Promise<void>
  deleteUserReaction(channelId: string, messageId: string, emoji: string, userId: string): Promise<void>
  getReactionUsers(channelId: string, messageId: string, emoji: string, params?: any): Promise<any[]>
  deleteAllReactionsForEmoji(channelId: string, messageId: string, emoji: string): Promise<void>
  sendTyping(channelId: string): Promise<void>
  requestPresignedMessageAttachmentUploads(channelId: string, data: any): Promise<any[]>
}

export interface Internal extends InternalApi {}

export class Internal<C extends Context = Context> {
  constructor(
    private bot: FluxerBot<C>,
    private apiBase: string,
  ) {}

  static define(routes: Dict<Partial<Record<HTTP.Method, string | string[]>>>) {
    for (const path in routes) {
      for (const key in routes[path]) {
        const method = key as HTTP.Method
        for (const name of makeArray(routes[path][method])) {
          Internal.prototype[name] = async function (this: Internal, ...args: any[]) {
            const raw = args.join(', ')
            const url = path.replace(/\{([^}]+)\}/g, () => {
              if (!args.length) throw new Error(`too few arguments for ${path}, received ${raw}`)
              return args.shift()
            })
            const config: HTTP.RequestConfig = {}
            if (args.length === 1) {
              if (method === 'GET' || method === 'DELETE') config.params = args[0]
              else config.data = args[0]
            } else if (args.length === 2 && method !== 'GET' && method !== 'DELETE') {
              config.data = args[0]
              config.params = args[1]
            } else if (args.length > 1) {
              throw new Error(`too many arguments for ${path}, received ${raw}`)
            }
            return (await this.bot.http(method, url, config)).data
          } as never
        }
      }
    }
  }
}

Internal.define({
  '/gateway/bot': { GET: 'getGatewayBot' },
  '/users/@me': { GET: 'getCurrentUser' },
  '/users/@me/guilds': { GET: 'getCurrentUserGuilds' },
  '/users/{user.id}': { GET: 'getUser' },
  '/guilds/{guild.id}': { GET: 'getGuild' },
  '/guilds/{guild.id}/channels': { GET: 'getGuildChannels' },
  '/guilds/{guild.id}/members/{user.id}': { GET: 'getGuildMember' },
  '/guilds/{guild.id}/roles': { GET: 'getGuildRoles' },
  '/channels/{channel.id}': { GET: 'getChannel' },
  '/channels/{channel.id}/messages': { GET: 'getChannelMessages', POST: 'createMessage' },
  '/channels/{channel.id}/messages/{message.id}': {
    GET: 'getChannelMessage',
    PATCH: 'editMessage',
    DELETE: 'deleteMessage',
  },
  '/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/@me': {
    PUT: 'createReaction',
    DELETE: 'deleteOwnReaction',
  },
  '/channels/{channel.id}/messages/{message.id}/reactions/{emoji}/{user.id}': { DELETE: 'deleteUserReaction' },
  '/channels/{channel.id}/messages/{message.id}/reactions/{emoji}': {
    GET: 'getReactionUsers',
    DELETE: 'deleteAllReactionsForEmoji',
  },
  '/channels/{channel.id}/typing': { POST: 'sendTyping' },
  '/channels/{channel.id}/attachments': { POST: 'requestPresignedMessageAttachmentUploads' },
})

export type { Discovery, Message, User }
