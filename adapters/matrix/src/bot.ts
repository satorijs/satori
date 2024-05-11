import { Bot, Context, HTTP, omit, Schema, Universal } from '@satorijs/core'
import { HttpAdapter } from './http'
import { MatrixMessageEncoder } from './message'
import * as Matrix from './types'
import { adaptMessage, decodeUser, dispatchSession } from './utils'

export class MatrixBot<C extends Context = Context> extends Bot<C, MatrixBot.Config> {
  static MessageEncoder = MatrixMessageEncoder
  static inject = ['http']

  http: HTTP
  id: string
  endpoint: string
  rooms: string[] = []
  internal: Matrix.Internal

  constructor(ctx: C, config: MatrixBot.Config) {
    super(ctx, config, 'matrix')
    this.id = config.id
    this.user.id = `@${this.id}:${this.config.host}`
    this.user.name = config.name || this.id
    this.endpoint = (config.endpoint || `https://${config.host}`) + '/_matrix'
    this.internal = new Matrix.Internal(this)
    ctx.plugin(HttpAdapter, this)
  }

  async initialize() {
    let user: Matrix.User
    try {
      user = await this.internal.register(this.id, this.config.asToken)
    } catch (e) {
      if (e.response.status !== 400 && e.data.errcode !== 'M_USER_IN_USE') throw e
    }
    if (!user) user = await this.internal.login(this.id, this.config.asToken)
    this.http = this.ctx.http.extend({
      ...this.config,
      endpoint: this.endpoint,
      headers: {
        'Authorization': `Bearer ${user.access_token}`,
      },
    })
    if (this.config.name) {
      await this.internal.setDisplayName(this.userId, this.config.name)
    }
    if (this.config.avatar) {
      const { data, mime } = await this.http.file(this.config.avatar)
      await this.internal.setAvatar(this.userId, Buffer.from(data), mime)
    }
    await this.getLogin()
    const sync = await this.syncRooms()
    // dispatch invitiations
    if (!sync?.rooms?.invite) return
    setTimeout(() => Object.entries(sync.rooms.invite).forEach(([roomId, room]) => {
      const event = room.invite_state.events.find(event =>
        event.type === 'm.room.member' && (event.content as Matrix.M_ROOM_MEMBER).membership === 'invite')
      event.room_id = roomId
      dispatchSession(this, event)
    }))
  }

  async getMessage(channelId: string, messageId: string) {
    const event = await this.internal.getEvent(channelId, messageId)
    return await adaptMessage(this, event)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.redactEvent(channelId, messageId)
  }

  async getLogin() {
    this.user = await this.getUser(this.userId)
    return this.toJSON()
  }

  async getUser(userId: string) {
    const profile = await this.internal.getProfile(userId)
    const user = decodeUser(profile, userId)
    user.avatar = user.avatar && this.internal.getAssetUrl(user.avatar)
    return user
  }

  async getGuild(guildId: string) {
    const { id, name } = await this.getChannel(guildId)
    return { id, name }
  }

  async getChannel(id: string) {
    const events = await this.internal.getState(id)
    const name = (events.find(event => event.type === 'm.room.name')?.content as Matrix.M_ROOM_NAME)?.name
    return { id, name, type: Universal.Channel.Type.TEXT }
  }

  async getGuildList() {
    const data = await Promise.all(this.rooms.map(roomId => this.getGuild(roomId)))
    return { data }
  }

  async getChannelList(guildId: string) {
    const data = await Promise.all(this.rooms.map(roomId => this.getChannel(roomId)))
    return { data }
  }

  async getGuildMemberList(guildId: string) {
    const state = await this.internal.getState(guildId)
    const levels = state.find(event => event.type === 'm.room.power_levels').content as Matrix.M_ROOM_POWER_LEVELS
    const data = state
      .filter(event => event.type === 'm.room.member')
      .map(event => {
        const content = event.content as Matrix.M_ROOM_MEMBER
        return {
          user: decodeUser(content, event.state_key),
          isBot: !!this.ctx.bots.find(bot => bot.userId === event.state_key),
          roles: [levels.users[event.state_key].toString()],
        }
      })
    return { data }
  }

  async getGuildMember(guildId: string, userId: string) {
    const { data } = await this.getGuildMemberList(guildId)
    return data.find(member => member.user.id === userId)
  }

  async createReaction(channelId: string, messageId: string, emoji: string) {
    await this.internal.sendReaction(channelId, messageId, emoji)
  }

  async handleFriendRequest() { }

  // as utils.ts commented, messageId is roomId
  async handleGuildRequest(messageId: string, approve: boolean, commit: string) {
    if (approve) {
      await this.internal.joinRoom(messageId, commit)
    } else {
      await this.internal.leaveRoom(messageId, commit)
    }
    this.syncRooms()
  }

  // will be called after m.room.member received
  async syncRooms() {
    const sync = await this.internal.sync(true)
    if (!sync?.rooms?.join) return
    this.rooms = Object.keys(sync.rooms.join)
    return sync
  }
}

export namespace MatrixBot {
  export interface Config extends HTTP.Config {
    name?: string
    avatar?: string
    id?: string
    hsToken?: string
    asToken?: string
    host?: string
    path?: string
  }

  export const Config: Schema<Config> = Schema.object({
    name: Schema.string().description('机器人的名称，如果设置了将会在启动时为机器人更改。'),
    avatar: Schema.string().description('机器人的头像地址，如果设置了将会在启动时为机器人更改。'),
    id: Schema.string().description('机器人的 ID。机器人最后的用户名将会是 `@{id}:{host}`。').required(),
    host: Schema.string().description('Matrix Homeserver 域名。').required(),
    hsToken: Schema.string().description('hs_token').role('secret').required(),
    asToken: Schema.string().description('as_token').role('secret').required(),
    endpoint: Schema.string().description('Matrix Homeserver 地址。默认为 `https://{host}`。'),
    path: Schema.string().description('Matrix Application Service 的路径。默认为 `/matrix`。').default('/matrix'),
    ...omit(HTTP.Config.dict, ['endpoint']),
  })
}
