import { Bot, Fragment, Schema } from '@satorijs/satori'
import * as OneBot from '../utils'
import { OneBotMessenger } from './message'

export class BaseBot<T extends BaseBot.Config = BaseBot.Config> extends Bot<T> {
  public parent?: BaseBot
  public internal: OneBot.Internal

  sendMessage(channelId: string, fragment: Fragment, guildId?: string) {
    if (!this.parent && !channelId.startsWith('private:')) {
      guildId = channelId
    }
    return new OneBotMessenger(this, channelId, guildId).send(fragment)
  }

  sendPrivateMessage(userId: string, fragment: Fragment) {
    return this.sendMessage('private:' + userId, fragment)
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
    return await Promise.all(list.map(item => OneBot.adaptMessage(this, item)))
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
