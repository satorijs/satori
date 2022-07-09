import { Bot, Context, Session } from '@satorijs/core'
import { Quester, Schema } from '@satorijs/env-node'
import { Method } from 'axios'
import * as Kook from './types'
import { adaptAuthor, AdapterConfig, adaptGroup, adaptUser } from './utils'
import FormData from 'form-data'
import { createReadStream } from 'fs'
import segment from '@satorijs/message'
import internal from 'stream'

const attachmentTypes = ['image', 'video', 'audio', 'file']

type SendHandle = [string, Kook.MessageParams, Session]

export class KookBot extends Bot<Context, KookBot.Config> {
  _sn: number
  _ping: NodeJS.Timeout
  _heartbeat: NodeJS.Timeout
  http: Quester

  static schema = AdapterConfig

  constructor(ctx: Context, config: KookBot.Config) {
    super(ctx, config)
    this._sn = 0
    this.http = ctx.http.extend({
      endpoint: 'https://www.kaiheila.cn/api/v3',
      headers: {
        'Authorization': `Bot ${config.token}`,
        'Content-Type': 'application/json',
      },
    }).extend(config)
  }

  async request<T = any>(method: Method, path: string, data?: any, headers: any = {}): Promise<T> {
    data = data instanceof FormData ? data : JSON.stringify(data)
    return await this.http(method, path, { data, headers })
  }

  private async _prepareHandle(channelId: string, content: string, guildId: string) {
    let path: string
    const params = {} as Kook.MessageParams
    const data = { type: 'send', author: this, channelId, content, guildId } as Partial<Session>
    if (channelId.length > 30) {
      params.chat_code = channelId
      data.subtype = 'private'
      path = '/user-chat/create-msg'
    } else {
      params.target_id = channelId
      data.subtype = 'group'
      path = '/message/create'
    }
    const session = this.session(data)
    if (await this.ctx.serial(session, 'before-send', session)) return
    return [path, params, session] as SendHandle
  }

  private async _sendHandle([path, params, session]: SendHandle, type: Kook.Type, content: string) {
    params.type = type
    params.content = content
    const message = await this.request('POST', path, params)
    session.messageId = message.msg_id
    this.ctx.emit(session, 'send', session)
  }

  private async _transformUrl({ type, data }: segment.Parsed) {
    if (data.url.startsWith('file://') || data.url.startsWith('base64://')) {
      const payload = new FormData()
      payload.append('file', data.url.startsWith('file://')
        ? createReadStream(data.url.slice(8))
        : Buffer.from(data.url.slice(9), 'base64'))
      const { url } = await this.request('POST', '/asset/create', payload, payload.getHeaders())
      data.url = url
    } else if (!data.url.includes('kaiheila')) {
      const res = await this.ctx.http.get<internal.Readable>(data.url, {
        headers: { accept: type },
        responseType: 'stream',
      })
      const payload = new FormData()
      payload.append('file', res)
      const { url } = await this.request('POST', '/asset/create', payload, payload.getHeaders())
      data.url = url
      console.log(url)
    }
  }

  private async _sendCard(handle: SendHandle, chain: segment.Chain, useMarkdown: boolean) {
    const type = useMarkdown ? 'kmarkdown' : 'plain-text'
    let text: Kook.Card.Text = { type, content: '' }
    let card: Kook.Card = { type: 'card', modules: [] }
    const output: Kook.Card[] = []
    const flushText = () => {
      text.content = text.content.trim()
      if (!text.content) return
      card.modules.push({ type: 'section', text })
      text = { type, content: '' }
    }
    const flushCard = () => {
      flushText()
      if (!card.modules.length) return
      output.push(card)
      card = { type: 'card', modules: [] }
    }

    for (const { type, data } of chain) {
      if (type === 'text') {
        text.content += data.content
      } else if (type === 'at') {
        if (data.id) {
          text.content += `@user#${data.id}`
        } else if (data.type === 'all') {
          text.content += '@全体成员'
        } else if (data.type === 'here') {
          text.content += '@在线成员'
        } else if (data.role) {
          text.content += `@role:${data.role};`
        }
      } else if (type === 'sharp') {
        text.content += `#channel:${data.id};`
      } else if (attachmentTypes.includes(type)) {
        flushText()
        await this._transformUrl({ type, data })
        if (type === 'image') {
          card.modules.push({
            type: 'image-group',
            elements: [{
              type: 'image',
              src: data.url,
            }],
          })
        } else {
          card.modules.push({
            type: type as never,
            src: data.url,
          })
        }
      } else if (type === 'card') {
        flushCard()
        output.push(JSON.parse(data.content))
      }
    }
    flushCard()
    await this._sendHandle(handle, Kook.Type.card, JSON.stringify(output))
  }

  private async _sendSeparate(handle: SendHandle, chain: segment.Chain, useMarkdown: boolean) {
    let textBuffer = ''
    const type = useMarkdown ? Kook.Type.kmarkdown : Kook.Type.text
    const flush = async () => {
      textBuffer = textBuffer.trim()
      if (!textBuffer) return
      await this._sendHandle(handle, type, textBuffer)
      handle[1].quote = null
      textBuffer = ''
    }

    for (const { type, data } of chain) {
      if (type === 'text') {
        textBuffer += data.content
      } else if (type === 'at') {
        if (data.id) {
          textBuffer += `@user#${data.id}`
        } else if (data.type === 'all') {
          textBuffer += '@全体成员'
        } else if (data.type === 'here') {
          textBuffer += '@在线成员'
        } else if (data.role) {
          textBuffer += `@role:${data.role};`
        }
      } else if (type === 'sharp') {
        textBuffer += `#channel:${data.id};`
      } else if (attachmentTypes.includes(type)) {
        await flush()
        await this._transformUrl({ type, data })
        await this._sendHandle(handle, Kook.Type[type], data.url)
      } else if (type === 'card') {
        await flush()
        await this._sendHandle(handle, Kook.Type.card, JSON.stringify([JSON.parse(data.content)]))
      }
    }
    await flush()
  }

  async sendMessage(channelId: string, content: string, guildId?: string) {
    const handle = await this._prepareHandle(channelId, content, guildId)
    const [, params, session] = handle
    if (!session?.content) return []

    let useMarkdown = false
    const chain = segment.parse(session.content)
    if (chain[0].type === 'quote') {
      params.quote = chain.shift().data.id
    }
    if (chain[0].type === 'markdown') {
      useMarkdown = true
      chain.shift()
    }

    const { attachMode } = this.config
    const hasAttachment = chain.some(node => attachmentTypes.includes(node.type))
    const useCard = hasAttachment && (attachMode === 'card' || attachMode === 'mixed' && chain.length > 1)

    if (useCard) {
      await this._sendCard(handle, chain, useMarkdown)
    } else {
      await this._sendSeparate(handle, chain, useMarkdown)
    }

    return [session.messageId]
  }

  async sendPrivateMessage(target_id: string, content: string) {
    const { code } = await this.request('POST', '/user-chat/create', { target_id })
    return this.sendMessage(code, content)
  }

  async deleteMessage(channelId: string, msg_id: string) {
    if (channelId.length > 30) {
      await this.request('POST', '/user-chat/delete-msg', { msg_id })
    } else {
      await this.request('POST', '/message/delete', { msg_id })
    }
  }

  async editMessage(channelId: string, msg_id: string, content: string) {
    if (channelId.length > 30) {
      await this.request('POST', '/user-chat/update-msg', { msg_id, content })
    } else {
      await this.request('POST', '/message/update', { msg_id, content })
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

  async getGuildMemberList() {
    const { items } = await this.request<Kook.GuildMemberList>('GET', '/guild/user-list')
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
  export interface Config extends Bot.Config, Quester.Config {
    token?: string
    verifyToken?: string
    attachMode?: 'separate' | 'card' | 'mixed'
  }

  export const Config: Schema<Config> = Schema.object({})
}

// for backward compatibility
KookBot.prototype.platform = 'kaiheila'
