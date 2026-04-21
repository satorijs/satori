import { Bot, Context, Inject, omit, Universal } from '@satorijs/core'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { Response } from '@cordisjs/plugin-server'
import { MatrixMessageEncoder } from './message'
import * as Matrix from './types'
import { adaptMessage, decodeUser, dispatchSession, downloadFile } from './utils'
import z from 'schemastery'

@Inject('http')
@Inject('logger', true, { name: 'matrix' })
export class MatrixBot extends Bot<MatrixBot.Config> {
  static inject = ['server']
  static MessageEncoder = MatrixMessageEncoder

  http: HTTP
  id: string
  endpoint: string
  rooms: string[] = []
  internal: Matrix.Internal

  private txnId: string = null

  constructor(ctx: Context, config: MatrixBot.Config) {
    super(ctx, config, 'matrix')
    this.id = config.id
    this.user.id = `@${this.id}:${this.config.host}`
    this.user.name = config.name || this.id
    this.endpoint = (config.endpoint || `https://${config.host}`) + '/_matrix'
    this.internal = new Matrix.Internal(this)
  }

  async connect() {
    this.ctx.server.all('/*path', async (req, res, next) => {
      const reqPath = '/' + req.params.path
      if (!reqPath.startsWith(this.config.path + '/')) return next()
      //                                            Bearer
      const asToken = req.headers.get('authorization')?.substring(7) || req.query.get('access_token')
      if (!asToken) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      if (this.config.hsToken !== asToken) {
        const result = await next()
        if (result) return result
        if (!res.claimed) res.status = 403
        return
      }
      const trimmed = reqPath.substring(this.config.path.length)
      const path = trimmed.startsWith('/_matrix/app/v1/') ? trimmed.substring(15) : trimmed
      if (req.method === 'PUT' && path.startsWith('/transactions/')) {
        const txnId = path.substring(14)
        const body = await req.json()
        this.transactions(body, res, txnId)
      } else if (req.method === 'GET' && path.startsWith('/users/')) {
        const user = path.substring(7)
        this.users(res, user)
      } else if (req.method === 'GET' && path.startsWith('/rooms/')) {
        const room = path.substring(7)
        this.rooms_(res, room)
      } else {
        res.status = 404
      }
    })

    try {
      await this.initialize()
      this.online()
    } catch (e) {
      this.ctx.logger.error('failed to initialize', e)
      throw e
    }
  }

  private transactions(body: any, res: Response, txnId: string) {
    const events = body.events as Matrix.ClientEvent[]
    res.headers.set('content-type', 'application/json')
    res.body = JSON.stringify({})
    if (txnId === this.txnId) return
    this.txnId = txnId
    for (const event of events) {
      const inRoom = this.userId !== event.sender && this.rooms.includes(event.room_id)
      const isInvite = event.type === 'm.room.member'
        && (event.content as Matrix.M_ROOM_MEMBER).membership === 'invite'
        && this.userId === event.state_key
      if (inRoom || isInvite) {
        dispatchSession(this, event)
      }
    }
  }

  private users(res: Response, userId: string) {
    if (this.userId !== userId) {
      res.status = 404
      res.headers.set('content-type', 'application/json')
      res.body = JSON.stringify({ 'errcode': 'CHAT.SATORI.NOT_FOUND' })
      return
    }
    res.headers.set('content-type', 'application/json')
    res.body = JSON.stringify({})
  }

  private rooms_(res: Response, room: string) {
    res.status = 404
    res.headers.set('content-type', 'application/json')
    res.body = JSON.stringify({ 'errcode': 'CHAT.SATORI.NOT_FOUND' })
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
      baseUrl: this.endpoint,
      headers: {
        'Authorization': `Bearer ${user.access_token}`,
      },
    })
    if (this.config.name) {
      await this.internal.setDisplayName(this.userId, this.config.name)
    }
    if (this.config.avatar) {
      const { data, type } = await downloadFile(this.http, this.config.avatar)
      await this.internal.setAvatar(this.userId, Buffer.from(data), type)
    }
    await this.getLogin()
    const sync = await this.syncRooms()
    // dispatch invitations
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
          roles: [{ id: levels.users[event.state_key].toString() }],
        }
      })
    return { data }
  }

  async getGuildMember(guildId: string, userId: string) {
    const { data } = await this.getGuildMemberList(guildId)
    return data.find(member => member.user.id === userId)
  }

  async createReaction(channelId: string, messageId: string, emojiId: string) {
    await this.internal.sendReaction(channelId, messageId, emojiId)
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
    endpoint?: string
  }

  export const Config: z<Config> = z.object({
    name: z.string().description('机器人的名称，如果设置了将会在启动时为机器人更改。'),
    avatar: z.string().description('机器人的头像地址，如果设置了将会在启动时为机器人更改。'),
    id: z.string().description('机器人的 ID。机器人最后的用户名将会是 `@{id}:{host}`。').required(),
    host: z.string().description('Matrix Homeserver 域名。').required(),
    hsToken: z.string().description('hs_token').role('secret').required(),
    asToken: z.string().description('as_token').role('secret').required(),
    endpoint: z.string().description('Matrix Homeserver 地址。默认为 `https://{host}`。'),
    path: z.string().description('Matrix Application Service 的路径。默认为 `/matrix`。').default('/matrix'),
    ...omit(HTTP.Config.dict, ['baseUrl']),
  })
}
