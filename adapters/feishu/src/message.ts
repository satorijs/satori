import { Messenger, segment } from '@satorijs/core'
import FormData from 'form-data'
import { createReadStream } from 'fs'
import internal from 'stream'

import { FeishuBot } from './bot'
import { BaseResponse, Message, MessageContent, MessageType } from './types'
import { extractIdType } from './utils'

export interface Addition {
  file: MessageContent.MediaContents
  type: MessageType
}

export class FeishuMessenger extends Messenger<FeishuBot> {
  private mode: 'default' | 'figure' = 'default'
  private quote: string | undefined
  private content = ''
  private addition: Addition
  private richText: MessageContent.RichText[string]

  async post(data?: any) {
    try {
      let resp: BaseResponse & { data: Message }
      if (this.quote) {
        resp = await this.bot.internal?.replyMessage(this.quote, data)
      }
      else {
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
      message = { zh_cn: this.richText } as MessageContent.RichText
    }
    if (this.content) {
      message = { text: this.content }
    }
    await this.post({
      msg_type: this.richText ? 'post' : this.addition ? this.addition.type : 'text',
      content: JSON.stringify(message)
    })

    // reset cached content
    this.content = ''
    this.addition = undefined
    this.richText = undefined
  }

  async sendFile(type: 'image' | 'video' | 'audio' |'file', url: string): Promise<Addition> {
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

  async visit(element: segment) {
    const { type, attrs, children } = element

    // render rich text post
    if (this.mode === 'figure') {
      if (!this.richText) {
        this.richText = { title: '', content: [] }
      }
      switch (type) {
        case 'text':
          this.richText.content.push([{ tag: 'text', text: attrs.content }])
          break
        case 'a':
          this.richText.content.push([{ tag: 'a', text: attrs.text, href: attrs.href }])
          break
        case 'at':
          this.richText.content.push([{ tag: 'at', user_id: attrs.id }])
          break
        case 'image':
          const data = await this.sendFile('image', attrs.url)
          this.richText.content.push([{ tag: 'img', image_key: (data.file as MessageContent.Image).image_key }])
          break
        case 'video':
          const video = await this.sendFile('video', attrs.url)
          this.richText.content.push([{ tag: 'media', file_key: (video.file as MessageContent.Media).file_key }])
          break
      }
      return
    }

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
      case 'figure':
        await this.flush()
        this.mode = 'figure'
        await this.render(children, true)
        this.mode = 'default'
        break
      case 'message':
        await this.flush()
        await this.render(children, true)
        break
      default:
        await this.render(children)
    }
  }
}
