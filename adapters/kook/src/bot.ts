import { Bot, Context, Fragment, Quester, Schema, SendOptions, segment } from '@satorijs/satori'
import { Method } from 'axios'
import { adaptAuthor, adaptGroup, adaptMessage, adaptUser } from './utils'
import * as Kook from './types'
import FormData from 'form-data'
import { WsClient } from './ws'
import { HttpServer } from './http'
import { KookMessenger } from './message'

export class KookBot<T extends KookBot.Config = KookBot.Config> extends Bot<T> {
  http: Quester
  internal: Kook.Internal

  constructor(ctx: Context, config: T) {
    super(ctx, config)
    this.http = ctx.http.extend({
      headers: {
        'Authorization': `Bot ${config.token}`,
        'Content-Type': 'application/json',
      },
    }).extend(config)
    this.internal = new Kook.Internal(this.http)

    if (config.protocol === 'http') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'ws') {
      ctx.plugin(WsClient, this)
    }
  }

  async request<T = any>(method: Method, path: string, data = {}, headers: any = {}): Promise<T> {
    if (method === 'GET') {
      return (await this.http.get(path, { params: data, headers })).data
    } else {
      data = data instanceof FormData ? data : JSON.stringify(data)
      return (await this.http(method, path, { data, headers })).data
    }
  }

  async sendMessage(channelId: string, content: Fragment, guildId?: string, options?: SendOptions) {
    return new KookMessenger(this, channelId, guildId, options).send(content)
  }

  async sendPrivateMessage(target_id: string, content: Fragment, options?: SendOptions) {
    const { code } = await this.request('POST', '/user-chat/create', { target_id })
    return this.sendMessage(code, content, null, options)
  }

  async deleteMessage(channelId: string, msg_id: string) {
    if (channelId.length > 30) {
      await this.request('POST', '/user-chat/delete-msg', { msg_id })
    } else {
      await this.request('POST', '/message/delete', { msg_id })
    }
  }

  async editMessage(channelId: string, msg_id: string, content: Fragment) {
    content = segment.normalize(content).join('')
    if (channelId.length > 30) {
      await this.request('POST', '/user-chat/update-msg', { msg_id, content })
    } else {
      await this.request('POST', '/message/update', { msg_id, content })
    }
  }

  async getMessage(channelId: string, msg_id: string) {
    if (channelId.length > 30) {
      return adaptMessage(await this.request('POST', '/user-chat/view', { msg_id }))
    } else {
      return adaptMessage(await this.request('POST', '/message/view', { msg_id }))
    }
  }

  async $createReaction(channelId: string, msg_id: string, emoji: string) {
    if (channelId.length > 30) {
      await this.request('POST', '/direct-message/add-reaction', { msg_id, emoji })
    } else {
      await this.request('POST', '/message/add-reaction', { msg_id, emoji })
    }
  }

  async $deleteReaction(channelId: string, messageId: string, emoji: string, user_id?: string) {
    if (channelId.length > 30) {
      await this.request('POST', '/direct-message/delete-reaction', { msg_id: messageId, emoji })
    } else {
      await this.request('POST', '/message/delete-reaction', { msg_id: messageId, emoji, user_id })
    }
  }

  async getSelf() {
    const data = adaptUser(await this.request<Kook.Self>('GET', '/user/me'))
    data['selfId'] = data.userId
    delete data.userId
    return data
  }

  async getGuildList() {
    const { items } = await this.request<Kook.GuildList>('GET', '/guild/list')
    return items.map(adaptGroup)
  }

  async getGuildMemberList(guild_id: string) {
    const { items } = await this.request<Kook.GuildMemberList>('GET', '/guild/user-list', { guild_id })
    return items.map(adaptAuthor)
  }

  async setGroupNickname(guild_id: string, user_id: string, nickname: string) {
    await this.request('POST', '/guild/nickname', { guild_id, user_id, nickname })
  }

  async leaveGroup(guild_id: string) {
    await this.request('POST', '/guild/leave', { guild_id })
  }

  async kickGroup(guild_id: string, user_id: string) {
    await this.request('POST', '/guild/kickout', { guild_id, user_id })
  }
}

export namespace KookBot {
  export interface BaseConfig extends Bot.Config, Quester.Config, KookMessenger.Config {}

  export type Config = BaseConfig & (HttpServer.Config | WsClient.Config)

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      protocol: process.env.KOISHI_ENV === 'browser'
        ? Schema.const('ws').default('ws')
        : Schema.union(['http', 'ws']).description('选择要使用的协议。').required(),
    }),
    Schema.union([
      WsClient.Config,
      HttpServer.Config,
    ]),
    KookMessenger.Config,
    Quester.createConfig('https://www.kookapp.cn/api/v3'),
  ] as const)
}

// for backward compatibility
KookBot.prototype.platform = 'kook'
