import { Bot, Context, segment } from '@satorijs/satori'
import * as OneBot from '../utils'
import { CQCode } from './cqcode'

export class BaseBot<C extends Context = Context, T extends Bot.Config = Bot.Config> extends Bot<C, T> {
  public internal: OneBot.Internal

  sendMessage(channelId: string, fragment: string | segment, guildId?: string) {
    return channelId.startsWith('private:')
      ? this.sendPrivateMessage(channelId.slice(8), fragment)
      : this.sendGuildMessage(guildId, channelId, fragment)
  }

  async getMessage(channelId: string, messageId: string) {
    const data = await this.internal.getMsg(messageId)
    return await OneBot.adaptMessage(this, data)
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

  async sendGuildMessage(guildId: string, channelId: string, fragment: string | segment) {
    const element = segment.normalize(fragment)
    const session = this.session({
      content: element.toString(),
      elements: element.children,
      type: 'send',
      subtype: 'group',
      author: this,
      guildId,
      channelId,
    })

    if (await this.context.serial(session, 'before-send', session)) return
    const ids: string[] = []
    for (const result of CQCode.render(session.content)) {
      session.messageId = '' + await this.internal.sendGroupMsg(channelId, result)
      ids.push(session.messageId)
    }
    this.context.emit(session, 'send', session)
    return ids
  }

  async sendPrivateMessage(userId: string, fragment: string | segment) {
    const element = segment.normalize(fragment)
    const session = this.session({
      content: element.toString(),
      elements: element.children,
      type: 'send',
      subtype: 'private',
      author: this,
      userId,
      channelId: 'private:' + userId,
    })

    if (await this.context.serial(session, 'before-send', session)) return
    if (!session.content) return []
    const ids: string[] = []
    for (const result of CQCode.render(session.content)) {
      session.messageId = '' + await this.internal.sendPrivateMsg(userId, result)
      ids.push(session.messageId)
    }
    this.context.emit(session, 'send', session)
    return ids
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
    return await Promise.all(list.map(item => OneBot.adaptMessage(this, item)))
  }
}
