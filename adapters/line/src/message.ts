import { h, MessageEncoder } from '@satorijs/satori'
import { LineBot } from './bot'
import * as Line from './types'

export const escape = (val: string) =>
  val
    .replace(/(?<!\u200b)[\*_~`]/g, '\u200B$&')

export const unescape = (val: string) =>
  val
    .replace(/\u200b([\*_~`])/g, '$1')

export class LineMessageEncoder extends MessageEncoder<LineBot> {
  buffer = ''
  blocks: Line.Message[] = []
  block: Line.Message = null
  sender: Line.Sender = {}
  emojis: Line.Emoji[] = []

  async flush(): Promise<void> {
    await this.insertBlock()
    // https://developers.line.biz/en/reference/messaging-api/#send-push-message
    for (let i = 0; i < this.blocks.length; i += 5) {
      const { sentMessages } = await this.bot.internal.pushMessage({
        to: this.channelId,
        messages: this.blocks.slice(i, i + 5),
      })
      for (const sent of sentMessages) {
        const session = this.bot.session(this.session.event)
        session.messageId = sent.id
        this.results.push(session.event.message)
        session.app.emit(session, 'send', session)
      }
    }
  }

  async insertBlock() {
    if (this.buffer.length) {
      this.blocks.push({
        ...{
          type: 'text',
          text: escape(this.buffer),
          sender: { ...this.sender },
        },
        ...this.emojis.length ? { emojis: this.emojis } : {},
      })
      this.buffer = ''
      this.emojis = []
    }
  }

  async visit(element: h) {
    const { type, attrs, children } = element

    if (type === 'text') {
      this.buffer += attrs.content
    } else if (type === 'br') {
      this.buffer += '\n'
    } else if (type === 'p') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      await this.render(children)
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
    } else if (type === 'image' && attrs.url) {
      await this.insertBlock()
      this.blocks.push({
        type: 'image',
        originalContentUrl: attrs.url,
        previewImageUrl: attrs.url,
      })
    } else if (type === 'video' && attrs.url) {
      await this.insertBlock()
      this.blocks.push({
        type: 'video',
        originalContentUrl: attrs.url,
        previewImageUrl: attrs.url,
      })
    } else if (type === 'audio' && attrs.url) {
      await this.insertBlock()
      this.blocks.push({
        type: 'audio',
        originalContentUrl: attrs.url,
        duration: 1145,
      })
    } else if (type === 'face' && attrs.id) {
      if (attrs.id.startsWith('s')) {
        // https://developers.line.biz/en/reference/messaging-api/#sticker-message
        await this.insertBlock()
        this.blocks.push({
          type: 'sticker',
          packageId: attrs.id.split(':')[1],
          stickerId: attrs.id.split(':')[2],
        })
      } else {
        // https://developers.line.biz/en/reference/messaging-api/#text-message
        this.emojis.push({
          index: this.buffer.length,
          productId: attrs.id.split(':')[1],
          emojiId: attrs.id.split(':')[2],
        })
        this.buffer += '$'
      }
    } else if (type === 'author') {
      this.sender.name = attrs.nickname
      this.sender.iconUrl = attrs.avatar
    } else if (type === 'message') {
      // let childAuthor = h.select(children, 'author')
      const sender = { ...this.sender }
      await this.insertBlock()
      await this.render(children)
      await this.insertBlock()
      if (this.sender.iconUrl || this.sender.name) {
        this.sender = { ...sender }
      }
    }
  }
}
