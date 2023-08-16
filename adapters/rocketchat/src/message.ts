import { h, MessageEncoder } from '@satorijs/satori'
import { RocketChatBot } from './bot'
import FormData from 'form-data'

export const escape = (val: string) =>
  val
    .replace(/(?<!\u200b)[\*_~` \->[\](#!@]/g, '\u200B$&')
    .replace(/([\\`*_{}])/g, '\\$&')
    .replace(/([\-\*]|\d\.) /g, '\u200B$&')

export const unescape = (val: string) =>
  val
    .replace(/\u200b([\*_~`])/g, '$1')
export class RocketChatMessageEncoder extends MessageEncoder<RocketChatBot> {
  buffer = ''
  addition: Record<string, any> = {}
  async flush() {
    if (!this.buffer.length) return
    /** https://developer.rocket.chat/reference/api/rest-api/endpoints/messaging/chat-endpoints/send-message */
    await this.bot.http.post('/api/v1/chat.sendMessage', {
      message: {
        ...this.addition,
        rid: this.channelId,
        // msg: this.buffer,
        blocks: [{
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: this.buffer,
          },
        }],
      },
    })
  }

  async sendAsset(element: h) {
    if (this.buffer.length) await this.flush()
    const { attrs } = element
    const { filename, data, mime } = await this.bot.ctx.http.file(attrs.url, attrs)
    const form = new FormData()
    // https://github.com/form-data/form-data/issues/468
    const value = process.env.KOISHI_ENV === 'browser'
      ? new Blob([data], { type: mime })
      : Buffer.from(data)
    form.append('file', value, attrs.file || filename)
    // form.append('channels', this.channelId)
    // if (this.thread_ts) form.append('thread_ts', this.thread_ts)
    const sent = await this.bot.http.post<{
      ok: boolean
      file: File
    }>(`/api/v1/rooms.upload/${this.channelId}`, form, {
      headers: form.getHeaders(),
    })
    if (sent.ok) {
      const session = this.bot.session()
      // adaptSentAsset(sent.file, session)
      session.app.emit(session, 'send', session)
      this.results.push(session)
    }
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += escape(attrs.content)
    } else if (type === 'image' && attrs.url) {
      await this.sendAsset(element)
    } else if (type === 'sharp' && attrs.id) {
      this.buffer += ` #${attrs.id} `
    } else if (type === 'at') {
      if (attrs.id) this.buffer += ` @${attrs.id} `
      if (attrs.type === 'all') this.buffer += ` @all `
      if (attrs.type === 'here') this.buffer += ` @here `
    } else if (type === 'b' || type === 'strong') {
      this.buffer += '*'
      await this.render(children)
      this.buffer += '*'
    } else if (type === 'i' || type === 'em') {
      this.buffer += '_'
      await this.render(children)
      this.buffer += '_'
    } else if (type === 's' || type === 'del') {
      this.buffer += '~'
      await this.render(children)
      this.buffer += '~'
    } else if (type === 'code') {
      this.buffer += '`'
      await this.render(children)
      this.buffer += '`'
    } else if (type === 'a') {
      this.buffer += `<${attrs.href}|`
      await this.render(children)
      this.buffer += `>`
    } else if (type === 'quote') {
      this.addition.tmid = attrs.id
    } else if (type === 'p') {
      this.buffer += `\n`
      await this.render(children)
    } else if (type === 'face') {
      this.buffer += `:${attrs.id}:`
    } else if (type === 'author') {
      this.addition = {
        alias: attrs.nickname,
        avatar: attrs.avatar,
      }
    } else if (type === 'message') {
      await this.render(children)
    }
  }
}
