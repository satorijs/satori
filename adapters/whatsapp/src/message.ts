import { Dict, h, MessageEncoder } from '@satorijs/satori'
import { WhatsAppBot } from './bot'
import FormData from 'form-data'
import { SendMessage } from './types'

const SUPPORTED_MEDIA = [
  'audio/aac',
  'audio/mp4',
  'audio/mpeg',
  'audio/amr',
  'audio/ogg',
  'audio/opus',
  'application/vnd.ms-powerpoint',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf',
  'text/plain',
  'application/vnd.ms-excel',
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/3gpp',
]

export class WhatsAppMessageEncoder extends MessageEncoder<WhatsAppBot> {
  private buffer = ''
  quoteId: string = null

  async flush(): Promise<void> {
    await this.flushTextMessage()
  }

  async flushTextMessage() {
    await this.sendMessage('text', { body: this.buffer, preview_url: this.options.linkPreview })
    this.buffer = ''
  }

  async sendMessage<T extends SendMessage['type']>(type: T, data: Dict) {
    if (type === 'text' && !this.buffer.length) return
    if (type !== 'text' && this.buffer.length) await this.flushTextMessage()
    // https://developers.facebook.com/docs/whatsapp/api/messages/text
    const { messages } = await this.bot.internal.sendMessage(this.bot.selfId, {
      messaging_product: 'whatsapp',
      to: this.channelId,
      recipient_type: 'individual',
      type,
      [type]: data,
      ...(this.quoteId ? {
        context: {
          message_id: this.quoteId,
        },
      } : {}),
    } as SendMessage)
    for (const msg of messages) {
      const session = this.bot.session()
      session.type = 'message'
      session.messageId = msg.id
      session.channelId = this.channelId
      session.guildId = this.channelId
      session.isDirect = true
      session.body.user = this.bot.user
      session.timestamp = Date.now()
      session.app.emit(session, 'send', session)
      this.results.push(session)
    }
  }

  // https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media
  async uploadMedia(attrs: Dict) {
    const { filename, data, mime } = await this.bot.ctx.http.file(attrs.url, attrs)

    if (!SUPPORTED_MEDIA.includes(mime)) {
      this.bot.ctx.logger('whatsapp').warn(`Unsupported media type: ${mime}`)
      return
    }

    const form = new FormData()
    const value = process.env.KOISHI_ENV === 'browser'
      ? new Blob([data], { type: mime })
      : Buffer.from(data)
    form.append('file', value, attrs.file || filename)
    form.append('type', mime)
    form.append('messaging_product', 'whatsapp')

    const r = await this.bot.internal.uploadMedia(this.bot.selfId, form)
    return r.id
  }

  async visit(element: h): Promise<void> {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += attrs.content
    } else if ((
      type === 'image' || type === 'audio' || type === 'video'
    ) && attrs.url) {
      // https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types
      const id = await this.uploadMedia(attrs)
      if (!id) return
      await this.sendMessage(type, { id })
    } else if (type === 'file') {
      const id = await this.uploadMedia(attrs)
      if (!id) return
      await this.sendMessage('document', { id })
    } else if (type === 'face') {
      if (attrs.platform && attrs.platform !== this.bot.platform) {
        return this.render(children)
      } else {
        await this.sendMessage('sticker', { id: attrs.id })
      }
    } else if (type === 'br') {
      this.buffer += '\n'
    } else if (type === 'p') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      await this.render(children)
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
    } else if (type === 'a') {
      await this.render(children)
      this.buffer += ` (${attrs.href}) `
    } else if (type === 'at') {
      if (attrs.id) {
        this.buffer += `@${attrs.id}`
      }
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
      this.quoteId = null
    } else if (type === 'quote') {
      this.quoteId = attrs.id
    } else {
      await this.render(children)
    }
  }
}
