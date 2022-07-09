import { Bot, Context } from '@satorijs/core'
import { noop, Schema } from '@satorijs/env-node'
import { HttpServer } from './http'
import { WsClient, WsServer } from './ws'
import { QQGuildBot } from './qqguild'
import segment from '@satorijs/message'
import * as OneBot from './utils'

export function renderText(source: string) {
  return segment.parse(source).reduce((prev, { type, data }) => {
    if (type === 'at') {
      if (data.type === 'all') return prev + '[CQ:at,qq=all]'
      return prev + `[CQ:at,qq=${data.id}]`
    } else if (['video', 'audio', 'image'].includes(type)) {
      if (type === 'audio') type = 'record'
      data.file = data.url
      delete data.url
    } else if (type === 'quote') {
      type = 'reply'
    }
    return prev + segment(type, data)
  }, '')
}

export class OneBotBot<T extends OneBotBot.Config = OneBotBot.Config> extends Bot<Context, T> {
  public internal = new OneBot.Internal()
  public guildBot: QQGuildBot

  constructor(ctx: Context, config: T) {
    super(ctx, config)
    this.selfId = config.selfId
    this.avatar = `http://q.qlogo.cn/headimg_dl?dst_uin=${config.selfId}&spec=640`

    if (config.protocol === 'http') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this)
    } else if (config.protocol === 'ws-reverse') {
      ctx.plugin(WsServer, this)
    }
  }

  async stop() {
    if (this.guildBot) {
      // QQGuild stub bot should also be removed
      delete this.ctx.bots[this.guildBot.sid]
    }
    await super.stop()
  }

  async initialize() {
    await Promise.all([
      this.getSelf().then(data => Object.assign(this, data)),
      this.setupGuildService().catch(noop),
    ]).then(() => this.online(), error => this.offline(error))
  }

  async setupGuildService() {
    const profile = await this.internal.getGuildServiceProfile()
    // guild service is not supported in this account
    if (!profile?.tiny_id || profile.tiny_id === '0') return
    this.ctx.plugin(QQGuildBot, {
      profile,
      parent: this,
      platform: this.config.qqguild.platform,
    })
  }

  sendMessage(channelId: string, content: string, guildId?: string) {
    content = renderText(content)
    return channelId.startsWith('private:')
      ? this.sendPrivateMessage(channelId.slice(8), content)
      : this.sendGuildMessage(guildId, channelId, content)
  }

  async getMessage(channelId: string, messageId: string) {
    const data = await this.internal.getMsg(messageId)
    return OneBot.adaptMessage(data)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.deleteMsg(messageId)
  }

  async getSelf() {
    const data = await this.internal.getLoginInfo()
    return OneBot.adaptUser(data)
  }

  async getUser(userId: string) {
    const data = await this.internal.getStrangerInfo(userId)
    return OneBot.adaptUser(data)
  }

  async getFriendList() {
    const data = await this.internal.getFriendList()
    return data.map(OneBot.adaptUser)
  }

  async getChannel(channelId: string) {
    const data = await this.internal.getGroupInfo(channelId)
    return OneBot.adaptChannel(data)
  }

  async getGuild(guildId: string) {
    const data = await this.internal.getGroupInfo(guildId)
    return OneBot.adaptGuild(data)
  }

  async getGuildList() {
    const data = await this.internal.getGroupList()
    return data.map(OneBot.adaptGuild)
  }

  async getGuildMember(guildId: string, userId: string) {
    const data = await this.internal.getGroupMemberInfo(guildId, userId)
    return OneBot.adaptGuildMember(data)
  }

  async getGuildMemberList(guildId: string) {
    const data = await this.internal.getGroupMemberList(guildId)
    return data.map(OneBot.adaptGuildMember)
  }

  async kickGuildMember(guildId: string, userId: string, permanent?: boolean) {
    return this.internal.setGroupKick(guildId, userId, permanent)
  }

  async muteGuildMember(guildId: string, userId: string, duration: number) {
    return this.internal.setGroupBan(guildId, userId, duration / 1000)
  }

  async muteChannel(channelId: string, guildId?: string, enable?: boolean) {
    return this.internal.setGroupWholeBan(channelId, enable)
  }

  protected async sendGuildMessage(guildId: string, channelId: string, content: string) {
    const session = this.session({
      content,
      type: 'send',
      subtype: 'group',
      author: this,
      guildId,
      channelId,
    })

    if (await this.ctx.serial(session, 'before-send', session)) return
    if (!session?.content) return []
    session.messageId = '' + await this.internal.sendGroupMsg(channelId, session.content)
    this.ctx.emit(session, 'send', session)
    return [session.messageId]
  }

  async sendPrivateMessage(userId: string, content: string) {
    const session = this.session({
      content,
      type: 'send',
      subtype: 'private',
      author: this,
      userId,
      channelId: 'private:' + userId,
    })

    if (await this.ctx.serial(session, 'before-send', session)) return
    if (!session?.content) return []
    session.messageId = '' + await this.internal.sendPrivateMsg(userId, session.content)
    this.ctx.emit(session, 'send', session)
    return [session.messageId]
  }

  async handleFriendRequest(messageId: string, approve: boolean, comment?: string) {
    await this.internal.setFriendAddRequest(messageId, approve, comment)
  }

  async handleGuildRequest(messageId: string, approve: boolean, comment?: string) {
    await this.internal.setGroupAddRequest(messageId, 'invite', approve, comment)
  }

  async handleGuildMemberRequest(messageId: string, approve: boolean, comment?: string) {
    await this.internal.setGroupAddRequest(messageId, 'add', approve, comment)
  }

  async deleteFriend(userId: string) {
    await this.internal.deleteFriend(userId)
  }

  async getMessageList(channelId: string, before?: string) {
    // include `before` message
    let list: OneBot.Message[]
    if (before) {
      const msg = await this.internal.getMsg(before)
      if (msg?.message_seq) {
        list = (await this.internal.getGroupMsgHistory(Number(channelId), msg.message_seq)).messages
      }
    } else {
      list = (await this.internal.getGroupMsgHistory(Number(channelId))).messages
    }

    // 从旧到新
    return list.map(OneBot.adaptMessage)
  }
}

OneBotBot.prototype.platform = 'onebot'

export namespace OneBotBot {
  export interface QQGuildConfig extends Bot.Config {}

  export interface BaseConfig extends Bot.Config {
    selfId: string
    password?: string
    token?: string
    qqguild?: QQGuildConfig
  }

  export const BaseConfig: Schema<BaseConfig> = Schema.object({
    selfId: Schema.string().description('机器人的账号。').required(),
    password: Schema.string().role('secret').description('机器人的密码。'),
    token: Schema.string().role('secret').description('发送信息时用于验证的字段，应与 OneBot 配置文件中的 `access_token` 保持一致。'),
  })

  export type Config = BaseConfig & (HttpServer.Config | WsServer.Config | WsClient.Config)

  export const Config: Schema<Config> = Schema.intersect([
    BaseConfig,
    Schema.union([
      HttpServer.Config,
      WsClient.Config,
      WsServer.Config,
    ]),
  ])
}
