import { Messenger, Element } from '@satorijs/satori'
import { MailBot } from './bot'
import { Attachment } from './mail'

const letters = 'abcdefghijklmnopqrstuvwxyz'

export function randomId() {
  return Array(8).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
}

export class MailMessenger extends Messenger<MailBot> {
  buffer = ''
  reply: string
  attachments: Attachment[] = []
  figure = false
  async flush() {
    if (!this.buffer && this.attachments.length === 0) return
    await this.bot.smtp.send({
      to: this.channelId.substring(8),
      html: this.buffer,
      attachments: this.attachments,
      inReplyTo: this.reply,
      subject: this.bot.config.subject,
    })
    this.buffer = ''
    this.reply = undefined
    this.attachments = []
  }
  async visit(element: Element) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += `<pre>${attrs.content}</pre>`
    } else if (type === 'b' || type === 'strong') {
      this.buffer += '<b>'
      await this.render(children)
      this.buffer += '</b>'
    } else if (type === 'i' || type === 'em') {
      this.buffer += '<i>'
      await this.render(children)
      this.buffer += '</i>'
    } else if (type === 'u' || type === 'ins') {
      this.buffer += '<u>'
      await this.render(children)
      this.buffer += '</u>'
    } else if (type === 's' || type === 'del') {
      this.buffer += '<s>'
      await this.render(children)
      this.buffer += '</s>'
    } else if (type === 'code') {
      this.buffer += '<code>'
      await this.render(children)
      this.buffer += '</code>'
    } else if (type === 'a') {
      this.buffer += `<a href=${attrs.href}>`
      await this.render(children)
      this.buffer += `</a>`
    } else if (type === 'p') {
      this.buffer += `</p>`
      await this.render(children)
      this.buffer += `</p>`
    } else if (type === 'at') {
      if (attrs.id) {
        this.buffer += `<a href="mailto:${attrs.id}">@${attrs.id}</a>`
      }
    } else if (type === 'sharp' && attrs.id) {
      this.buffer += ` #${attrs.id} `
    } else if (type === 'image' && attrs.url) {
      let url: string
      if (attrs.url.match(/^https?:/)) {
        url = attrs.url
      } else {
        const cid = randomId()
        const { filename, mime, data } = await this.bot.ctx.http.file(attrs.url)
        this.attachments.push({
          filename, cid,
          content: Buffer.from(data),
          contentType: mime,
        })
        url = `cid:${cid}`
      }
      this.buffer += `<img src="${url}"/>`
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
