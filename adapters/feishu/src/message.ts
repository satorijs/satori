import { Messenger, segment } from '@satorijs/core'
import FormData from 'form-data'
import { createReadStream } from 'fs'
import internal from 'stream'
import { Feishu } from '.'

import { FeishuBot } from './bot'
import { BaseResponse, Message, MessageType } from './types'
import { extractIdType } from './utils'

type Addition = FeishuBot.Message.Contents<'audio' | 'file' | 'image' | 'media'>

export class FeishuMessenger extends Messenger<FeishuBot> {
  private mode: 'default' | 'figure' = 'default'
  private quote: string | undefined
  private content = ''
  private addition: Addition

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
    if (this.content === '' && !this.addition) return

    let message = {} as FeishuBot.Message.Contents<MessageType>
    if (this.addition) {
      message = {
        ...message,
        ...this.addition,
      }
    } else {
      message.msg_type = 'text'
      ;(message as FeishuBot.Message.Text).text = this.content
    }
    await this.post({
      msg_type: message.msg_type,
      content: JSON.stringify(message)
    })

    // reset cached content
    this.content = ''
    this.addition = undefined
  }

  async sendFile(type: 'image' | 'video' | 'audio' |'file', url: string): Promise<Addition> {
    let newType = type as MessageType
    if (type === 'audio') {
      newType = 'media'
    }
    // TODO send file, and get file id
    // return {
    //   id: 'fileId',
    //   type: newType,
    // }

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
      return { msg_type: 'image', image_key: data.image_key }
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
      return { msg_type: msgType, file_key: data.file_key }
    }
  }

  async visit(element: segment) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.content += attrs.content
    } else if (type === 'at') {
      switch (attrs.type) {
        case 'all':
          this.content += `<at user_id="all">${ attrs.name ?? '所有人' }</at>`
          break
        default:
          this.content += `<at user_id="${attrs.id}">${attrs.name}</at>`
      }
    } else if (type === 'sharp') {
      // platform does not support sharp
    } else if (type === 'quote') {
      await this.flush()
      this.quote = attrs.id
    } else if ((type === 'image' || type === 'video' || type === 'audio' || type === 'file') && attrs.url) {
      await this.flush()
      this.addition = await this.sendFile(type, attrs.url)
    } else if (type === 'figure') {
      await this.flush()
      this.mode = 'figure'
      await this.render(children, true)
      this.mode = 'default'
    } else if (type === 'message') {
      if (this.mode === 'figure') {
        await this.render(children)
        this.content += '\n'
      } else {
        await this.flush()
        await this.render(children, true)
      }
    } else {
      await this.render(children)
    }
  }
}
