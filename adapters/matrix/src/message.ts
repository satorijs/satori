import { Context, MessageEncoder, segment, Universal } from '@satorijs/core'
import { MatrixBot } from './bot'

export class MatrixMessageEncoder<C extends Context = Context> extends MessageEncoder<C, MatrixBot<C>> {
  private buffer: string = ''
  private reply: Universal.Message = null

  async sendMedia(url: string, type: 'file' | 'image' | 'video' | 'audio') {
    try {
      const session = this.bot.session(this.session)
      const { data, filename, mime } = await this.bot.ctx.http.file(url)
      const id = await this.bot.internal.sendMediaMessage(
        this.channelId, type, Buffer.from(data), this.reply?.id, mime, filename,
      )
      session.messageId = id
      this.results.push(session.event.message)
      this.reply = null
    } catch (e) {
      this.errors.push(e)
    }
  }

  async flush() {
    if (!this.buffer) return
    try {
      const session = this.bot.session(this.session)
      if (this.reply) {
        this.buffer = `> <${this.reply.user.id}> ${this.reply.content}\n\n` + this.buffer
      }
      const id = await this.bot.internal.sendTextMessage(
        this.channelId, this.buffer, this.reply?.id,
      )
      session.messageId = id
      this.results.push(session.event.message)
      this.buffer = ''
      this.reply = null
    } catch (e) {
      this.errors.push(e)
    }
  }

  async visit(element: segment) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += attrs.content.replace(/[\\*_`~|]/g, '\\$&')
    } else if (type === 'b' || type === 'strong') {
      this.buffer += '**'
      await this.render(children)
      this.buffer += '**'
    } else if (type === 'i' || type === 'em') {
      this.buffer += '*'
      await this.render(children)
      this.buffer += '*'
    } else if (type === 'u' || type === 'ins') {
      this.buffer += '__'
      await this.render(children)
      this.buffer += '__'
    } else if (type === 's' || type === 'del') {
      this.buffer += '~~'
      await this.render(children)
      this.buffer += '~~'
    } else if (type === 'code') {
      this.buffer += '`'
      await this.render(children)
      this.buffer += '`'
    } else if (type === 'a') {
      this.buffer += '['
      await this.render(children)
      this.buffer += `](${attrs.href})`
    } else if (type === 'br') {
      this.buffer += '\n'
    } else if (type === 'p') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      await this.render(children)
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
    } else if (type === 'at') {
      if (attrs.id) {
        this.buffer += ` @${attrs.id} `
      } else if (attrs.type === 'all') {
        this.buffer += ` @room `
      }
    } else if (type === 'sharp' && attrs.id) {
      this.buffer += ` #${attrs.id} `
    } else if ((type === 'image' || type === 'img' || type === 'video' || type === 'record' || type === 'file') && (attrs.src || attrs.url)) {
      await this.flush()
      const matrixType = type === 'record' ? 'audio' : type === 'img' ? 'image' : type
      await this.sendMedia(attrs.src || attrs.url, matrixType)
    } else if (type === 'quote') {
      this.reply = await this.bot.getMessage(this.channelId, attrs.id)
    } else if (type === 'message') {
      await this.flush()
      await this.render(children, true)
    } else {
      await this.render(children)
    }
  }
}
