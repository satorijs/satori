import { Context, Element, MessageEncoder } from '@satorijs/core'
import { MailBot } from './bot'
import { Attachment } from './mail'

const letters = 'abcdefghijklmnopqrstuvwxyz'

export function randomId() {
  return Array(8).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
}

export class MailMessageEncoder<C extends Context = Context> extends MessageEncoder<C, MailBot<C>> {
  buffer = ''
  reply: string
  attachments: Attachment[] = []
  figure = false

  async flush() {
    if (!this.buffer && this.attachments.length === 0) return
    const messageId = await this.bot.internal.send({
      to: this.session.channelId.substring(8),
      html: `<pre>${this.buffer}</pre>`,
      attachments: this.attachments,
      inReplyTo: this.reply,
      subject: this.bot.config.subject,
    })
    const session = this.bot.session()
    session.messageId = messageId
    session.timestamp = +new Date()
    session.userId = this.bot.selfId
    this.results.push(session.event.message)
    session.app.emit(session, 'send', session)

    this.buffer = ''
    this.reply = undefined
    this.attachments = []
  }

  async visit(element: Element) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += attrs.content
    } else if (type === 'br') {
      this.buffer += '<br>'
    } else if (['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'del', 'p', 'code', 'li', 'ul', 'ol', 'blockquote'].includes(type)) {
      this.buffer += `<${type}>`
      await this.render(children)
      this.buffer += `</${type}>`
    } else if (type === 'a') {
      this.buffer += `<a href=${attrs.href}>`
      await this.render(children)
      this.buffer += `</a>`
    } else if (type === 'at') {
      if (attrs.id) {
        this.buffer += `<a href="mailto:${attrs.id}">@${attrs.id}</a>`
      }
    } else if (type === 'sharp' && attrs.id) {
      this.buffer += ` #${attrs.id} `
    } else if (['image', 'audio', 'video', 'file'].includes(type) && (attrs.src || attrs.url)) {
      let url: string = attrs.src || attrs.url
      if (!url.match(/^https?:/)) {
        const cid = randomId()
        const { filename, mime, data } = await this.bot.ctx.http.file(url)
        this.attachments.push({
          cid,
          filename,
          content: Buffer.from(data),
          contentType: mime,
        })
        url = `cid:${cid}`
      }
      if (type === 'image') {
        this.buffer += `<img src="${url}" />`
      } else if (type === 'audio') {
        this.buffer += `<audio src="${url}" controls />`
      } else if (type === 'video') {
        this.buffer += `<video src="${url}" controls />`
      }
    } else if (type === 'quote') {
      this.reply = attrs.id
    } else if (type === 'message') {
      if (this.figure) {
        await this.render(children)
        this.buffer += '<br/>'
      } else {
        await this.flush()
        await this.render(children, true)
      }
    } else if (type === 'figure') {
      this.figure = true
      await this.render(children)
      this.figure = false
    } else {
      await this.render(children)
    }
  }
}
