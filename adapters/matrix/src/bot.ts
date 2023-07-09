import { Bot, Context, omit, Quester, Schema, Universal } from '@satorijs/satori'
import { HttpAdapter } from './http'
import { MatrixMessageEncoder } from './message'
import * as Matrix from './types'
import { adaptMessage, dispatchSession } from './utils'

export class MatrixBot extends Bot<MatrixBot.Config> {
  static MessageEncoder = MatrixMessageEncoder
  http: Quester
  id: string
  endpoint: string
  rooms: string[] = []
  declare internal: Matrix.Internal
  constructor(ctx: Context, config: MatrixBot.Config) {
    super(ctx, config)
    this.id = config.id
    this.selfId = `@${this.id}:${this.config.host}`
    this.userId = this.selfId
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
    Object.assign(this, await this.getSelf())
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

  async getMessage(channelId: string, messageId: string): Promise<Universal.Message> {
    const event = await this.internal.getEvent(channelId, messageId)
    return await adaptMessage(this, event)
  }

  async deleteMessage(channelId: string, messageId: string) {
    await this.internal.redactEvent(channelId, messageId)
  }

  async getSelf() {
    return await this.getUser(this.userId)
  }

  async getUser(userId: string): Promise<Universal.User> {
    const profile = await this.internal.getProfile(userId)
    let avatar: string
    if (profile.avatar_url) avatar = this.internal.getAssetUrl(profile.avatar_url)
    return {
      userId,
      avatar,
      username: userId,
      nickname: profile.displayname,
    }
  }

  async getFriendList(): Promise<Universal.User[]> {
    return []
  }

  async deleteFriend(): Promise<void> { }

  async getGuild(guildId: string): Promise<Universal.Guild> {
    const events = await this.internal.getState(guildId)
    const guildName = (events.find(event => event.type === 'm.room.name')?.content as Matrix.M_ROOM_NAME)?.name
    return { guildId, guildName }
  }

  async getChannel(channelId: string): Promise<Universal.Channel> {
    const events = await this.internal.getState(channelId)
    const channelName = (events.find(event => event.type === 'm.room.name')?.content as Matrix.M_ROOM_NAME)?.name
    return { channelId, channelName }
  }

  async getGuildList(): Promise<Universal.Guild[]> {
    const sync = await this.syncRooms()
    const joined = sync?.rooms?.join
    if (!joined) return []
    const result: string[] = []
    for (const [roomId, room] of Object.entries(joined)) {
      const create = room.state?.events?.find(event => event.type === 'm.room.create')
      const space = (create?.content as Matrix.M_ROOM_CREATE)?.type === 'm.space'
      if (space) result.push(roomId)
    }
    return await Promise.all(result.map(this.getGuild.bind(this)))
  }

  async getChannelList(guildId: string): Promise<Universal.Channel[]> {
    const state = await this.internal.getState(guildId)
    const children = state
      .filter(event => event.type === 'm.space.child')
      .map(event => event.state_key)
      .filter(roomId => this.rooms.includes(roomId))
    return await Promise.all(children.map(this.getChannel.bind(this)))
  }

  async handleFriendRequest(): Promise<void> { }

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
  export interface Config extends Bot.Config, Quester.Config {
    name?: string
    avatar?: string
    id?: string
    hsToken?: string
    asToken?: string
    host?: string
  }

  export const Config: Schema<Config> = Schema.object({
    name: Schema.string().description('机器人的名称，如果设置了将会在启动时为机器人更改。'),
    avatar: Schema.string().description('机器人的头像地址，如果设置了将会在启动时为机器人更改。'),
    // eslint-disable-next-line
    id: Schema.string().description('机器人的 ID。机器人最后的用户名将会是 @${id}:${host}。').required(),
    host: Schema.string().description('Matrix homeserver 域名。').required(),
    hsToken: Schema.string().description('hs_token').role('secret').required(),
    asToken: Schema.string().description('as_token').role('secret').required(),
    // eslint-disable-next-line
    endpoint: Schema.string().description('Matrix homeserver 地址。默认为 https://${host}。'),
    ...omit(Quester.Config.dict, ['endpoint']),
  })
}

MatrixBot.prototype.platform = 'matrix'
