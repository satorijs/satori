import { Element, MessageEncoder } from '@satorijs/satori'
import { MailBot } from './bot'
import { Attachment } from './mail'

const letters = 'abcdefghijklmnopqrstuvwxyz'

export function randomId() {
  return Array(8).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
}

export class MailMessageEncoder extends MessageEncoder<MailBot> {
  buffer = ''
  reply: string
  attachments: Attachment[] = []
  figure = false

  async flush() {
    if (!this.buffer && this.attachments.length === 0) return
    const messageId = await this.bot.smtp.send({
      to: this.session.channelId,
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
    } else if (['image', 'audio', 'video', 'file'].includes(type) && attrs.url) {
      let url: string
      if (attrs.url.match(/^https?:/)) {
        url = attrs.url
      } else {
        const cid = randomId()
        const { filename, mime, data } = await this.bot.ctx.http.file(attrs.url)
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
