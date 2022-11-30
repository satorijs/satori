import { Messenger, segment } from '@satorijs/core'
import { FeishuBot } from './bot'
import { BaseResponse, Message, MessageType } from './types'
import { extractIdType } from './utils'

interface Addition {
  file?: {
    id: string
    type: MessageType
  }
}

export class FeishuMessenger extends Messenger<FeishuBot> {
  private mode: 'default' | 'figure' = 'default'
  private quote: string | undefined
  private content = ''
  private addition: Addition = {}

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
    if (this.content === '' && !this.addition.file) return

    let message = {} as FeishuBot.Message.Contents<MessageType>
    if (this.addition.file) {
      message.msg_type = this.addition.file.type
      if (FeishuBot.Message.extractContentsType('image', message)) {
        message.image_key = this.addition.file.id
      } else if (
        FeishuBot.Message.extractContentsType('audio', message)
        || FeishuBot.Message.extractContentsType('file', message)
      ) {
        message.file_key = this.addition.file.id
      } else if (FeishuBot.Message.extractContentsType('media', message)) {
        message.file_key = this.addition.file.id
      }
    } else {
      message.msg_type = 'text'
      if (FeishuBot.Message.extractContentsType('text', message)) {
        message.text = this.content
      }
    }
    await this.post({
      msg_type: message.msg_type,
      content: JSON.stringify(message)
    })

    // reset cached content
    this.content = ''
    this.addition = {}
  }

  async sendFile(type: 'image' | 'video' | 'audio' |'file', url: string) {
    let newType = type as MessageType
    if (type === 'audio') {
      newType = 'media'
    }
    // TODO send file, and get file id
    return {
      id: 'fileId',
      type: newType,
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
      this.addition.file = await this.sendFile(type, attrs.url)
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
