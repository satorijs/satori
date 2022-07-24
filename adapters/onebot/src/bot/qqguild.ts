import { Bot, Context, GuildMember } from '@satorijs/satori'
import { BaseBot } from './base'
import { OneBotBot } from '.'
import * as OneBot from '../utils'

export namespace QQGuildBot {
  export interface Config extends Bot.Config {
    parent: OneBotBot
    profile: OneBot.GuildServiceProfile
  }
}

export class QQGuildBot extends BaseBot {
  parent: OneBotBot
  hidden = true

  constructor(ctx: Context, config: QQGuildBot.Config) {
    super(ctx, config)
    this.parent = config.parent
    this.internal = config.parent.internal
    this.selfId = config.profile.tiny_id
    this.avatar = config.profile.avatar_url
    this.username = config.profile.nickname
    this.parent.guildBot = this
  }

  get status() {
    return this.parent.status
  }

  set status(status) {
    this.parent.status = status
  }

  async start() {
    await this.ctx.parallel('bot-connect', this)
  }

  async stop() {
    // Don't stop this bot twice
    if (!this.parent) return
    // prevent circular reference and use this as already disposed
    this.parent = undefined
    await this.ctx.parallel('bot-disconnect', this)
  }

  async sendGuildMessage(guildId: string, channelId: string, content: string) {
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
    session.messageId = '' + await this.internal.sendGuildChannelMsg(guildId, channelId, session.content)
    this.ctx.emit(session, 'send', session)
    return [session.messageId]
  }

  async getChannel(channelId: string, guildId?: string) {
    const channels = await this.getChannelList(guildId)
    return channels.find((channel) => channel.channelId === channelId)
  }

  async getChannelList(guildId: string) {
    const data = await this.internal.getGuildChannelList(guildId, false)
    return (data || []).map(OneBot.adaptChannel)
  }

  async getGuild(guildId: string) {
    const data = await this.internal.getGuildMetaByGuest(guildId)
    return OneBot.adaptGuild(data)
  }

  async getGuildList() {
    const data = await this.internal.getGuildList()
    return data.map(OneBot.adaptGuild)
  }

  async getGuildMember(guildId: string, userId: string) {
    const profile = await this.internal.getGuildMemberProfile(guildId, userId)
    return OneBot.adaptQQGuildMemberProfile(profile)
  }

  async getGuildMemberList(guildId: string) {
    let nextToken: string | undefined
    let list: GuildMember[] = []
    while (true) {
      const data = await this.internal.getGuildMemberList(guildId, nextToken)
      if (!data.members?.length) break
      list = list.concat(data.members.map(OneBot.adaptQQGuildMemberInfo))
      if (data.finished) break
      nextToken = data.next_token
    }
    return list
  }
}
