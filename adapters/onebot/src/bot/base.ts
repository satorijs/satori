import { Bot, Context, segment } from '@satorijs/satori'
import * as OneBot from '../utils'

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

export class BaseBot<C extends Context = Context, T extends Bot.Config = Bot.Config> extends Bot<C, T> {
  public internal: OneBot.Internal

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

  async sendGuildMessage(guildId: string, channelId: string, content: string) {
    const session = this.session({
      content,
      type: 'send',
      subtype: 'group',
      author: this,
      guildId,
      channelId,
    })

    if (await this.context.serial(session, 'before-send', session)) return
    if (!session?.content) return []
    session.messageId = '' + await this.internal.sendGroupMsg(channelId, session.content)
    this.context.emit(session, 'send', session)
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

    if (await this.context.serial(session, 'before-send', session)) return
    if (!session?.content) return []
    session.messageId = '' + await this.internal.sendPrivateMsg(userId, session.content)
    this.context.emit(session, 'send', session)
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
