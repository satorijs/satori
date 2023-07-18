import { Dict, h, Logger, MessageEncoder } from '@satorijs/satori'
import { WhatsAppBot } from './bot'
import FormData from 'form-data'
import { SendMessage } from './types'

const SUPPORTED_MEDIA = 'audio/aac, audio/mp4, audio/mpeg, audio/amr, audio/ogg, audio/opus, application/vnd.ms-powerpoint, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/pdf, text/plain, application/vnd.ms-excel, image/jpeg, image/png, image/webp, video/mp4, video/3gpp'.split(', ')

export class WhatsAppMessageEncoder extends MessageEncoder<WhatsAppBot> {
  private buffer = ''
  quoteId: string = null
  logger: Logger
  prepare(): Promise<void> {
    this.logger = this.bot.ctx.logger('whatsapp')
  }

  async flush(): Promise<void> {
    await this.flushTextMessage()
  }

  async flushTextMessage() {
    await this.sendMessage('text', { body: this.buffer })
    this.buffer = ''
  }

  async sendMessage<T extends SendMessage['type']>(type: T, data: Dict) {
    if (type === 'text' && !this.buffer.length) return
    // https://developers.facebook.com/docs/whatsapp/api/messages/text
    const { messages } = await this.bot.http.post<{
      messages: { id: string }[]
    }>(`/${this.bot.selfId}/messages`, {
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
    })

    for (const msg of messages) {
      const session = this.bot.session()
      session.type = 'message'
      session.messageId = msg.id
      // @TODO session body
      session.app.emit(session, 'send', session)
      this.results.push(session)
    }
  }

  // https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media
  async uploadMedia(attrs: Dict) {
    const { filename, data, mime } = await this.bot.ctx.http.file(attrs.url, attrs)

    if (!SUPPORTED_MEDIA.includes(mime)) {
      this.logger.warn(`Unsupported media type: ${mime}`)
      return
    }

    const form = new FormData()
    const value = process.env.KOISHI_ENV === 'browser'
      ? new Blob([data], { type: mime })
      : Buffer.from(data)
    form.append('file', value, attrs.file || filename)
    form.append('type', mime)
    form.append('messaging_product', 'whatsapp')

    const r = await this.bot.http.post<{
      id: string
    }>(`/${this.bot.selfId}/media`, form, {
      headers: form.getHeaders(),
    })
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
      await this.flushTextMessage()
      await this.sendMessage(type, { id })
    } else if (type === 'file') {
      const id = await this.uploadMedia(attrs)
      if (!id) return
      await this.flushTextMessage()
      await this.sendMessage('document', { id })
    } else if (type === 'face' && attrs.id) {
      await this.flushTextMessage()
      await this.sendMessage('sticker', { id: attrs.id })
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
    } else if (type === 'quote') {
      this.quoteId = attrs.id
    }
  }
}
