import { Context, h, MessageEncoder } from '@satorijs/core'
import { LarkBot } from './bot'
import { BaseResponse, Lark, MessageContent, MessageType } from './types'
import { extractIdType } from './utils'

export interface Addition {
  file: MessageContent.MediaContents
  type: MessageType
}

export class LarkMessageEncoder<C extends Context = Context> extends MessageEncoder<C, LarkBot<C>> {
  private quote: string | undefined
  private content = ''
  private addition: Addition
  // TODO: currently not used, would be supported in the future
  private richText: MessageContent.RichText[string]

  async post(data?: any) {
    try {
      let resp: BaseResponse & { data?: Lark.Message }
      if (this.quote) {
        resp = await this.bot.internal.replyImMessage(this.quote, data)
      } else {
        data.receive_id = this.channelId
        resp = await this.bot.internal?.createImMessage(data, {
          receive_id_type: extractIdType(this.channelId),
        })
      }
      const session = this.bot.session()
      session.messageId = resp.data.message_id
      session.timestamp = Number(resp.data.create_time) * 1000
      session.userId = resp.data.sender.id
      session.channelId = this.channelId
      session.guildId = this.guildId
      session.app.emit(session, 'send', session)
      this.results.push(session.event.message)
    } catch (e) {
      // try to extract error message from Lark API
      if (this.bot.http.isError(e)) {
        if (e.response?.data?.code) {
          const generalErrorMsg = `Check error code at https://open.larksuite.com/document/server-docs/getting-started/server-error-codes`
          e.message += ` (Lark error code ${e.response.data.code}: ${e.response.data.msg ?? generalErrorMsg})`
        }
      }
      this.errors.push(e)
    }
  }

  async flush() {
    if (this.content === '' && !this.addition && !this.richText) return

    let message: MessageContent.Contents
    if (this.addition) {
      message = {
        ...message,
        ...this.addition.file,
      }
    }
    if (this.richText) {
      message = { zh_cn: this.richText }
    }
    if (this.content) {
      message = { text: this.content }
    }
    await this.post({
      msg_type: this.richText ? 'post' : this.addition ? this.addition.type : 'text',
      content: JSON.stringify(message),
    })

    // reset cached content
    this.quote = undefined
    this.content = ''
    this.addition = undefined
    this.richText = undefined
  }

  async sendFile(type: 'img' | 'image' | 'video' | 'audio' | 'file', url: string): Promise<Addition> {
    const payload = new FormData()

    const assetKey = type === 'img' || type === 'image' ? 'image' : 'file'
    const { filename, mime, data } = await this.bot.assetsQuester.file(url)
    payload.append(assetKey, new Blob([data], { type: mime }), filename)

    if (type === 'img' || type === 'image') {
      payload.append('image_type', 'message')
      const { data } = await this.bot.internal.createImImage(payload)
      return {
        type: 'image',
        file: {
          image_key: data.image_key,
        },
      }
    } else {
      let msgType: MessageType = 'file'
      if (type === 'audio') {
        // FIXME: only support opus
        payload.append('file_type', 'opus')
        msgType = 'audio'
      } else if (type === 'video') {
        // FIXME: only support mp4
        payload.append('file_type', 'mp4')
        msgType = 'media'
      } else {
        const ext = filename.split('.').pop()
        if (['xls', 'ppt', 'pdf'].includes(ext)) {
          payload.append('file_type', ext)
        } else {
          payload.append('file_type', 'stream')
        }
      }
      payload.append('file_name', filename)
      const { data } = await this.bot.internal.createImFile(payload)
      return {
        type: msgType,
        file: {
          file_key: data.file_key,
        },
      }
    }
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.content += attrs.content
    } else if (type === 'at') {
      if (attrs.type === 'all') {
        this.content += `<at user_id="all">${attrs.name ?? '所有人'}</at>`
      } else {
        this.content += `<at user_id="${attrs.id}">${attrs.name}</at>`
      }
    } else if (type === 'a') {
      await this.render(children)
      if (attrs.href) this.content += ` (${attrs.href})`
    } else if (type === 'p') {
      if (!this.content.endsWith('\n')) this.content += '\n'
      await this.render(children)
      if (!this.content.endsWith('\n')) this.content += '\n'
    } else if (type === 'br') {
      this.content += '\n'
    } else if (type === 'sharp') {
      // platform does not support sharp
    } else if (type === 'quote') {
      await this.flush()
      this.quote = attrs.id
    } else if (['img', 'image', 'video', 'audio', 'file'].includes(type)) {
      if (attrs.src || attrs.url) {
        await this.flush()
        this.addition = await this.sendFile(type as any, attrs.src || attrs.url)
        await this.flush()
      }
    } else if (type === 'figure' || type === 'message') {
      await this.flush()
      await this.render(children, true)
    } else {
      await this.render(children)
    }
  }
}

export { LarkMessageEncoder as FeishuMessageEncoder }
