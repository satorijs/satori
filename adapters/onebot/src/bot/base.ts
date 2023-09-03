import { Bot, Fragment, Schema, SendOptions } from '@satorijs/satori'
import * as OneBot from '../utils'
import { OneBotMessageEncoder } from './message'

export class BaseBot<T extends BaseBot.Config = BaseBot.Config> extends Bot<T> {
  public parent?: BaseBot
  public internal: OneBot.Internal

  sendMessage(channelId: string, fragment: Fragment, guildId?: string, options?: SendOptions) {
    if (!this.parent && !channelId.startsWith('private:')) {
      guildId = channelId
    }
    return new OneBotMessageEncoder(this, channelId, guildId, options).send(fragment)
  }

  sendPrivateMessage(userId: string, fragment: Fragment, options?: SendOptions) {
    return this.sendMessage('private:' + userId, fragment, null, options)
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
    return { data: await Promise.all(list.map(item => OneBot.adaptMessage(this, item))) }
  }
}

export namespace BaseBot {
  export interface Config extends Bot.Config {
    advanced?: AdvancedConfig
  }

  export interface AdvancedConfig {
    splitMixedContent?: boolean
  }

  export const AdvancedConfig: Schema<AdvancedConfig> = Schema.object({
    splitMixedContent: Schema.boolean().description('是否自动在混合内容间插入空格。').default(true),
  }).description('高级设置')
}
