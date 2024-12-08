import { Bot, Context, h, HTTP, Schema, Universal } from '@satorijs/core'

import { HttpServer } from './http'
import { LarkMessageEncoder } from './message'
import { Internal } from './types'
import * as Utils from './utils'

export class LarkBot<C extends Context = Context> extends Bot<C, LarkBot.Config> {
  static inject = ['server', 'http']
  static MessageEncoder = LarkMessageEncoder

  _token?: string
  _refresher?: NodeJS.Timeout
  http: HTTP
  assetsQuester: HTTP
  internal: Internal

  constructor(ctx: C, config: LarkBot.Config) {
    super(ctx, config, 'lark')

    this.http = ctx.http.extend({
      endpoint: config.endpoint,
    })
    this.assetsQuester = ctx.http
    this.internal = new Internal(this)

    ctx.plugin(HttpServer, this)

    this.defineInternalRoute('/*path', async ({ params, method, headers, body }) => {
      return this.http(params.path, { method, data: body, headers })
    })
  }

  getResourceUrl(type: string, message_id: string, file_key: string) {
    return this.getInternalUrl(`/im/v1/messages/${message_id}/resources/${file_key}`, { type })
  }

  async initialize() {
    await this.refreshToken()
    const { bot } = await this.http.get<{
      bot: {
        activate_status: number
        app_name: string
        avatar_url: string
        ip_white_list: any[]
        open_id: string
      }
    }>('/bot/v3/info')
    this.selfId = bot.open_id
    this.user.avatar = bot.avatar_url
    this.user.name = bot.app_name
    this.online()
  }

  private async refreshToken() {
    const { tenant_access_token: token } = await this.internal.tenantAccessTokenInternalAuth({
      app_id: this.config.appId,
      app_secret: this.config.appSecret,
    })
    this.logger.debug('refreshed token %s', token)
    this.token = token
    // Token would be expired in 2 hours, refresh it every 1 hour
    // see https://open.larksuite.com/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
    if (this._refresher) clearTimeout(this._refresher)
    this._refresher = setTimeout(() => this.refreshToken(), 3600 * 1000)
    this.online()
  }

  get token() {
    return this._token
  }

  set token(v: string) {
    this._token = v
    this.http.config.headers.Authorization = `Bearer ${v}`
  }

  async editMessage(channelId: string, messageId: string, content: h.Fragment) {
    await this.internal.updateImMessage(messageId, {
      content: h.normalize(content).join(''),
      msg_type: 'text',
    })
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteImMessage(messageId)
  }

  async getMessage(channelId: string, messageId: string, recursive = true) {
    const data = await this.internal.getImMessage(messageId)
    const message = await Utils.decodeMessage(this, data.items[0], recursive)
    const im = await this.internal.getImChat(channelId)
    message.channel.type = im.chat_mode === 'p2p' ? Universal.Channel.Type.DIRECT : Universal.Channel.Type.TEXT
    return message
  }

  async getMessageList(channelId: string, before?: string) {
    const messages = await this.internal.listImMessage({ container_id_type: 'chat', container_id: channelId, page_token: before })
    const data = await Promise.all(messages.items.reverse().map(data => Utils.decodeMessage(this, data)))
    return { data, next: data[0]?.id }
  }

  async getUser(userId: string, guildId?: string) {
    const data = await this.internal.getContactUser(userId)
    return Utils.decodeUser(data.user)
  }

  async getChannel(channelId: string) {
    const chat = await this.internal.getImChat(channelId)
    return Utils.decodeChannel(channelId, chat)
  }

  async getChannelList(guildId: string) {
    return { data: [await this.getChannel(guildId)] }
  }

  async getGuild(guildId: string) {
    const chat = await this.internal.getImChat(guildId)
    return Utils.decodeGuild(chat)
  }

  async getGuildList(after?: string) {
    const chats = await this.internal.listImChat({ page_token: after })
    return { data: chats.items.map(Utils.decodeGuild), next: chats.page_token }
  }

  async getGuildMemberList(guildId: string, after?: string) {
    const members = await this.internal.getImChatMembers(guildId, { page_token: after })
    const data = members.items.map(v => ({ user: { id: v.member_id, name: v.name }, name: v.name }))
    return { data, next: members.page_token }
  }

  async createUpload(...uploads: Universal.Upload[]): Promise<string[]> {
    return await Promise.all(uploads.map(async (upload) => {
      const response = await this.internal.createImFile({
        file_name: upload.filename,
        file_type: upload.type,
        file: new Blob([upload.data]),
      })
      return this.getInternalUrl(`/im/v1/files/${response.file_key}`)
    }))
  }
}

export namespace LarkBot {
  export interface Config extends HttpServer.Options, HTTP.Config {
    appId: string
    appSecret: string
    encryptKey?: string
    verificationToken?: string
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      platform: Schema.union(['feishu', 'lark']).required().description('平台名称。'),
      appId: Schema.string().required().description('机器人的应用 ID。'),
      appSecret: Schema.string().role('secret').required().description('机器人的应用密钥。'),
      encryptKey: Schema.string().role('secret').description('机器人的 Encrypt Key。'),
      verificationToken: Schema.string().description('事件推送的验证令牌。'),
    }),
    Schema.union([
      Schema.intersect([
        Schema.object({
          platform: Schema.const('feishu').required(),
        }),
        HTTP.createConfig('https://open.feishu.cn/open-apis/'),
        HttpServer.createConfig('/feishu'),
      ]),
      Schema.intersect([
        Schema.object({
          platform: Schema.const('lark').required(),
        }),
        HTTP.createConfig('https://open.larksuite.com/open-apis/'),
        HttpServer.createConfig('/lark'),
      ]),
    ]),
  ])
}

export { LarkBot as FeishuBot }
