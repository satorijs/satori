import { Bot, Context, Dict, Fragment, Logger, Quester, Schema, segment, Session, Time, Universal } from '@satorijs/satori'
import * as Telegram from './types'
import { adaptGuildMember, adaptUser } from './utils'
import { TelegramMessenger } from './message'
import { HttpServer } from './server'
import { HttpPolling } from './polling'
import { fromBuffer } from 'file-type'
import fs from 'fs'

const logger = new Logger('telegram')

export class SenderError extends Error {
  constructor(args: Dict<any>, url: string, retcode: number, selfId: string) {
    super(`Error when trying to send to ${url}, args: ${JSON.stringify(args)}, retcode: ${retcode}`)
    Object.defineProperties(this, {
      name: { value: 'SenderError' },
      selfId: { value: selfId },
      code: { value: retcode },
      args: { value: args },
      url: { value: url },
    })
  }
}

export interface TelegramResponse {
  ok: boolean
  result: any
}

export class TelegramBot<T extends TelegramBot.Config = TelegramBot.Config> extends Bot<T> {
  http: Quester
  file: Quester
  internal?: Telegram.Internal
  local?: boolean

  constructor(ctx: Context, config: T) {
    super(ctx, config)
    this.selfId = config.token.split(':')[0]
    this.local = config.files.local
    this.http = this.ctx.http.extend({
      ...config,
      endpoint: `${config.endpoint}/bot${config.token}`,
    })
    this.file = this.ctx.http.extend({
      ...config,
      endpoint: `${config.files.endpoint || config.endpoint}/file/bot${config.token}`,
    })
    this.internal = new Telegram.Internal(this.http)
    if (config.protocol === 'server') {
      ctx.plugin(HttpServer, this)
    } else if (config.protocol === 'polling') {
      ctx.plugin(HttpPolling, this)
    }
  }

  async initialize(callback: (bot: this) => Promise<void>) {
    const { username, userId, avatar, nickname } = await this.getLoginInfo()
    this.username = username
    this.avatar = avatar
    this.selfId = userId
    this.nickname = nickname
    await callback(this)
    logger.debug('connected to %c', 'telegram:' + this.selfId)
    this.online()
  }

  async adaptMessage(message: Telegram.Message, session: Session) {
    const parseText = (text: string, entities: Telegram.MessageEntity[]): segment[] => {
      let curr = 0
      const segs: segment[] = []
      for (const e of entities) {
        const eText = text.substr(e.offset, e.length)
        if (e.type === 'mention') {
          if (eText[0] !== '@') throw new Error('Telegram mention does not start with @: ' + eText)
          const atName = eText.slice(1)
          if (eText === '@' + this.username) segs.push(segment('at', { id: this.selfId, name: atName }))
          // TODO handle @others
        } else if (e.type === 'text_mention') {
          segs.push(segment('at', { id: e.user.id }))
        } else {
          continue
        }
        if (e.offset > curr) {
          segs.splice(-1, 0, segment('text', { content: text.slice(curr, e.offset) }))
          curr = e.offset + e.length
        }
      }
      if (curr < text?.length || 0) {
        segs.push(segment('text', { content: text.slice(curr) }))
      }
      return segs
    }

    session.messageId = message.message_id.toString()
    session.timestamp = message.date * 1000
    const segments: segment[] = []
    if (message.reply_to_message) {
      session.quote = {}
      await this.adaptMessage(message.reply_to_message, session.quote as Session)
    }

    // make sure text comes first so that commands can be triggered
    const msgText = message.text || message.caption
    segments.push(...parseText(msgText, message.entities || []))

    if (message.caption) {
      // add a space to separate caption from media
      segments.push(segment('text', { content: ' ' }))
    }

    if (message.location) {
      segments.push(segment('location', { lat: message.location.latitude, lon: message.location.longitude }))
    }
    if (message.photo) {
      const photo = message.photo.sort((s1, s2) => s2.file_size - s1.file_size)[0]
      segments.push(segment('image', await this.$getFileData(photo.file_id)))
    }
    if (message.sticker) {
      // TODO: Convert tgs to gif
      // https://github.com/ed-asriyan/tgs-to-gif
      // Currently use thumb only
      try {
        const file = await this.internal.getFile({ file_id: message.sticker.file_id })
        if (file.file_path.endsWith('.tgs')) {
          throw new Error('tgs is not supported now')
        }
        segments.push(segment('image', await this.$getFileContent(file.file_path)))
      } catch (e) {
        logger.warn('get file error', e)
        segments.push(segment('text', { content: `[${message.sticker.set_name || 'sticker'} ${message.sticker.emoji || ''}]` }))
      }
    } else if (message.animation) {
      segments.push(segment('image', await this.$getFileData(message.animation.file_id)))
    } else if (message.voice) {
      segments.push(segment('audio', await this.$getFileData(message.voice.file_id)))
    } else if (message.video) {
      segments.push(segment('video', await this.$getFileData(message.video.file_id)))
    } else if (message.document) {
      segments.push(segment('file', await this.$getFileData(message.document.file_id)))
    }

    session.content = segments.join('')
    session.userId = message.from.id.toString()
    session.author = adaptUser(message.from)
    session.channelId = message.chat.id.toString()
    if (message.chat.type === 'private') {
      session.subtype = 'private'
      session.channelId = 'private:' + session.channelId
    } else {
      session.subtype = 'group'
      session.guildId = session.channelId
    }
  }

  async sendMessage(channelId: string, fragment: Fragment, guildId?: string) {
    return new TelegramMessenger(this, channelId, guildId).send(fragment)
  }

  async sendPrivateMessage(userId: string, content: Fragment) {
    return this.sendMessage('private:' + userId, content)
  }

  async getMessage() {
    return null
  }

  async deleteMessage(chat_id: string, message_id: string | number) {
    message_id = +message_id
    await this.internal.deleteMessage({ chat_id, message_id })
  }

  static adaptGroup(data: Telegram.Chat): Universal.Guild {
    data['guildId'] = data.id + ''
    data['guildName'] = data.title
    delete data.id
    delete data.title
    return data as any
  }

  async getGuild(chat_id: string): Promise<Universal.Guild> {
    const data = await this.internal.getChat({ chat_id })
    return TelegramBot.adaptGroup(data)
  }

  async getGuildList() {
    return []
  }

  async getGuildMember(chat_id: string, user_id: string | number) {
    user_id = +user_id
    if (Number.isNaN(user_id)) return null
    const data = await this.internal.getChatMember({ chat_id, user_id })
    const user = adaptGuildMember(data)
    await this.setAvatarUrl(user)
    return user
  }

  async getGuildMemberList(chat_id: string) {
    const data = await this.internal.getChatAdministrators({ chat_id })
    const users = data.map(adaptGuildMember)
    await Promise.all(users.map(this.setAvatarUrl.bind(this)))
    return users
  }

  async kickGuildMember(chat_id: string, user_id: string | number, permanent?: boolean) {
    user_id = +user_id
    await this.internal.banChatMember({
      chat_id,
      user_id,
      until_date: Date.now() + (permanent ? 0 : Time.minute),
      revoke_messages: true,
    })
  }

  setGroupLeave(chat_id: string) {
    return this.internal.leaveChat({ chat_id })
  }

  async handleGuildMemberRequest(messageId: string, approve: boolean, comment?: string) {
    const [chat_id, user_id] = messageId.split('@')
    const method = approve ? 'approveChatJoinRequest' : 'declineChatJoinRequest'
    const success = await this.internal[method]({ chat_id, user_id: +user_id })
    if (!success) throw new Error(`handel guild member request field ${success}`)
  }

  async getLoginInfo() {
    const data = await this.internal.getMe()
    const user = adaptUser(data)
    await this.setAvatarUrl(user)
    return user
  }

  async $getFileData(file_id: string) {
    try {
      const file = await this.internal.getFile({ file_id })
      return await this.$getFileContent(file.file_path)
    } catch (e) {
      logger.warn('get file error', e)
    }
  }

  async $getFileContent(filePath: string) {
    let res: Buffer
    if (this.local) {
      res = await fs.promises.readFile(filePath)
    } else {
      res = await this.file.get(`/${filePath}`, { responseType: 'arraybuffer' })
    }
    const { mime } = await fromBuffer(res)
    const base64 = `data:${mime};base64,` + res.toString('base64')
    return { url: base64 }
  }

  private async setAvatarUrl(user: Universal.User) {
    const { endpoint } = this.file.config
    const { photos: [avatar] } = await this.internal.getUserProfilePhotos({ user_id: +user.userId })
    if (!avatar) return
    const { file_id } = avatar[avatar.length - 1]
    const file = await this.internal.getFile({ file_id })
    user.avatar = `${endpoint}/${file.file_path}`
  }
}

TelegramBot.prototype.platform = 'telegram'

export namespace TelegramBot {
  export interface BaseConfig extends Bot.Config, Quester.Config {
    protocol: 'server' | 'polling'
    token: string
    files?: Config.Files
  }

  export type Config = BaseConfig & (HttpServer.Config | HttpPolling.Config)

  export namespace Config {
    export interface Files {
      endpoint?: string
      local?: boolean
    }
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      token: Schema.string().description('机器人的用户令牌。').role('secret').required(),
      protocol: Schema.union(['server', 'polling']).description('选择要使用的协议。').required(),
    }),
    Schema.union([
      HttpServer.Config,
      HttpPolling.Config,
    ]).description('推送设置'),
    Quester.createConfig('https://api.telegram.org'),
    Schema.object({
      files: Schema.object({
        endpoint: Schema.string().description('文件请求的终结点。'),
        local: Schema.boolean().description('是否启用 [Telegram Bot API](https://github.com/tdlib/telegram-bot-api) 本地模式。'),
      }),
    }).description('文件设置'),
  ] as const)
}
