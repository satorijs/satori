import { createReadStream } from 'fs'
import internal from 'stream'

import { h, MessageEncoder, Quester } from '@satorijs/satori'
import FormData from 'form-data'

import { LarkBot } from './bot'
import { BaseResponse, Message, MessageContent, MessageType } from './types'
import { extractIdType } from './utils'

export interface Addition {
  file: MessageContent.MediaContents
  type: MessageType
}

export class LarkMessageEncoder extends MessageEncoder<LarkBot> {
  private quote: string | undefined
  private content = ''
  private addition: Addition
  // TODO: currently not used, would be supported in the future
  private richText: MessageContent.RichText[string]

  async post(data?: any) {
    try {
      let resp: BaseResponse & { data: Message }
      if (this.quote) {
        resp = await this.bot.internal?.replyMessage(this.quote, data)
      } else {
        data.receive_id = this.channelId
        resp = await this.bot.internal?.sendMessage(extractIdType(this.channelId), data)
      }
      const session = this.bot.session()
      session.messageId = resp.data.message_id
      session.timestamp = Number(resp.data.create_time) * 1000
      session.userId = resp.data.sender.id
      session.app.emit(session, 'send', session)
      this.results.push(session)
    } catch (e) {
      // try to extract error message from Lark API
      if (Quester.isAxiosError(e)) {
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

  async sendFile(type: 'image' | 'video' | 'audio' | 'file', url: string): Promise<Addition> {
    const payload = new FormData()

    const assetKey = type === 'image' ? 'image' : 'file'
    const [schema, file] = url.split('://')
    const filename = schema === 'base64' ? 'unknown' : new URL(url).pathname.split('/').pop()
    if (schema === 'file') {
      payload.append(assetKey, createReadStream(file))
    } else if (schema === 'base64') {
      payload.append(assetKey, Buffer.from(file, 'base64'))
    } else {
      const resp = await this.bot.assetsQuester.get<internal.Readable>(url, { responseType: 'stream' })
      payload.append(assetKey, resp)
    }

    if (type === 'image') {
      payload.append('image_type', 'message')
      const { data } = await this.bot.internal.uploadImage(payload)
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
      const { data } = await this.bot.internal.uploadFile(payload)
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

    switch (type) {
      case 'text':
        this.content += attrs.content
        break
      case 'at': {
        if (attrs.type === 'all') {
          this.content += `<at user_id="all">${attrs.name ?? '所有人'}</at>`
        } else {
          this.content += `<at user_id="${attrs.id}">${attrs.name}</at>`
        }
        break
      }
      case 'a':
        await this.render(children)
        if (attrs.href) this.content += ` (${attrs.href})`
        break
      case 'p':
        if (!this.content.endsWith('\n')) this.content += '\n'
        await this.render(children)
        if (!this.content.endsWith('\n')) this.content += '\n'
        break
      case 'br':
        this.content += '\n'
        break
      case 'sharp':
        // platform does not support sharp
        break
      case 'quote':
        await this.flush()
        this.quote = attrs.id
        break
      case 'image':
      case 'video':
      case 'audio':
      case 'file':
        if (attrs.url) {
          await this.flush()
          this.addition = await this.sendFile(type, attrs.url)
        }
        break
      case 'figure': // FIXME: treat as message element for now
      case 'message':
        await this.flush()
        await this.render(children, true)
        break
      default:
        await this.render(children)
    }
  }
}

export { LarkMessageEncoder as FeishuMessageEncoder }
