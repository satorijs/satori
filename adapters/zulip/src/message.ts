import { Context, h, MessageEncoder } from '@satorijs/satori'
import { ZulipBot } from './bot'
import FormData from 'form-data'
import { by_stream_topic_url, encodeHashComponent } from './utils'

export const escape = (val: string) =>
  val
    .replace(/(?<!\u200b)[\*_~`\->[\](#!@]/g, '\u200b$&')
    .replace(/^\s+/gm, (match) => Array(match.length + 1).join('&nbsp;'))

export const unescape = (val: string) =>
  val
    .replace(/^(&nbsp;)+/g, (match) => Array(match.length + 1).join(' '))
    .replace(/\u200b([\*_~`\->[\](#!@])/g, '$1')

export class ZulipMessageEncoder<C extends Context = Context> extends MessageEncoder<C, ZulipBot<C>> {
  buffer: string = ''

  async flush() {
    if (!this.buffer.length) return
    const form = new FormData()
    form.append('type', this.session.isDirect ? 'private' : 'stream')
    form.append('to', this.session.isDirect
      ? `[${this.options.session.userId}]`
      : this.session.guildId)
    form.append('content', this.buffer)
    if (!this.session.isDirect) form.append('topic', this.session.channelId)

    const { id } = await this.bot.http.post('/messages', form, {
      headers: form.getHeaders(),
    })
    const session = this.bot.session()
    session.content = this.buffer
    session.messageId = id.toString()
    session.userId = this.bot.selfId
    session.channelId = this.session.channelId
    session.guildId = this.session.guildId
    session.isDirect = this.session.isDirect
    session.app.emit(session, 'send', session)
    this.results.push(session.event.message)
  }

  async uploadMedia(element: h) {
    const { attrs } = element
    const { filename, data, mime } = await this.bot.ctx.http.file(attrs.src || attrs.url, attrs)
    const form = new FormData()
    // https://github.com/form-data/form-data/issues/468
    const value = process.env.KOISHI_ENV === 'browser'
      ? new Blob([data], { type: mime })
      : Buffer.from(data)
    form.append('file', value, attrs.file || filename)
    const response = await this.bot.http.post<{
      uri: string
    }>('/user_uploads', form, {
      headers: form.getHeaders(),
    })
    return [response.uri, filename]
  }

  async getUser(id: string) {
    const { user } = await this.bot.internal.getUser(id)
    return user?.full_name
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += escape(attrs.content)
    } else if (type === 'p') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      await this.render(children)
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
    } else if (type === 'b' || type === 'strong') {
      this.buffer += ` **`
      await this.render(children)
      this.buffer += `** `
    } else if (type === 'i' || type === 'em') {
      this.buffer += ` *`
      await this.render(children)
      this.buffer += `* `
    } else if (type === 'a' && attrs.href) {
      this.buffer += `[`
      await this.render(children)
      this.buffer += `](${encodeURI(attrs.href)})`
    } else if (['audio', 'video', 'file', 'image', 'img'].includes(type)) {
      const [uri, filename] = await this.uploadMedia(element)
      this.buffer += `[${filename}](${encodeURI(uri)})\n`
    } else if (type === 'quote') {
      const quoteMsg = await this.bot.internal.getMessage(attrs.id)
      const suffix = '/near/' + encodeHashComponent(attrs.id)
      const path = by_stream_topic_url(Number(this.guildId), this.channelId) + suffix

      this.buffer = `@_**${quoteMsg.message.sender_full_name}|${quoteMsg.message.sender_id}** [Said](${path}):\n`
        + '```quote\n' + quoteMsg.raw_content + '\n```\n\n' + this.buffer
    } else if (type === 'sharp' && attrs.guild) {
      const { stream } = await this.bot.internal.getStreamById(attrs.guild)
      if (!attrs.id) {
        this.buffer += ` #**${stream.name}** `
      } else {
        this.buffer += ` #**${stream.name}>${attrs.id}** `
      }
    } else if (type === 'at' && attrs.id) {
      try {
        const u = await this.getUser(attrs.id)
        if (u) this.buffer += ` @**${u}|${attrs.id}** `
      } catch (e) {
        this.bot.logger.error(e)
        this.buffer += ` @**${attrs.id}** `
      }
    } else if (type === 'at' && ['all', 'here'].includes(attrs.type)) {
      this.buffer += ` @**all** `
    } else if (type === 'message') {
      await this.render(children)
    }
  }
}
