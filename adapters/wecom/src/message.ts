import { Context, h, MessageEncoder } from '@satorijs/core'
import { WecomBot } from './bot'

/** https://developer.work.weixin.qq.com/document/path/90236#%E6%94%AF%E6%8C%81%E7%9A%84markdown%E8%AF%AD%E6%B3%95 */

export class WecomMessageEncoder<C extends Context = Context> extends MessageEncoder<C, WecomBot<C>> {
  buffer = ''

  upsertSend(msgId: string, payload: any) {
    const session = this.bot.session()
    session.type = 'message'
    session.messageId = msgId
    session.isDirect = true
    session.userId = this.bot.selfId
    session.timestamp = new Date().valueOf()
    session.elements = payload.msgtype === 'text'
      ? [h.text(payload.text.content)]
      : [h(payload.msgtype === 'voice' ? 'audio' : payload.msgtype, {
        src: this.bot.$toMediaUrl(payload[payload.msgtype].media_id),
      })]
    session.app.emit(session, 'send', session)
    this.results.push(session.event.message)
  }

  /** https://developer.work.weixin.qq.com/document/path/90236 */
  async sendByCustom(payload: any) {
    if (payload.msgtype === 'text' && !payload.text?.content) return
    // if (payload.msgtype === "markdown" && !payload.markdown?.content) return;
    const { msgid } = await this.bot.http.post('/cgi-bin/message/send', {
      touser: this.options.session.userId,
      agentid: this.bot.selfId,
      ...payload,
    }, {
      params: { access_token: this.bot.token },
    })

    this.upsertSend(msgid, payload)
  }

  async flushMedia(element: h) {
    if (!['audio', 'video', 'image', 'file', 'img'].includes(element.type)) return
    let type = element.type
    if (type === 'audio') type = 'voice'
    if (type === 'img') type = 'image'
    const [media] = await this.uploadMedia(element)

    await this.sendByCustom({
      msgtype: type,
      [type]: {
        media_id: media,
      },
    })
  }

  async flush(): Promise<void> {
    await this.sendByCustom({
      msgtype: 'text',
      text: {
        content: this.buffer,
      },
    })
    this.buffer = ''
  }

  /** https://developer.work.weixin.qq.com/document/path/90253 */
  async uploadMedia(element: h) {
    const { type, attrs } = element
    const uploadType = type === 'audio' ? 'voice' : type
    const form = new FormData()

    const { filename, data, mime } = await this.bot.ctx.http.file(attrs.src || attrs.url, attrs)
    const value = new Blob([data], { type: mime })
    form.append('media', value, attrs.file || filename)

    const resp = await this.bot.http.post<{
      type: string
      media_id: string
      created_at: number
      errcode: number
      errmsg: string
    }>('/cgi-bin/media/upload', form, {
      params: {
        access_token: this.bot.token,
        type: uploadType,
      },
    })
    if (resp.media_id) {
      return [resp.media_id, uploadType]
    }
    this.bot.logger.error(resp.errmsg)
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
    } else if (type === 'img' || type === 'image' || type === 'audio' || type === 'video' || type === 'file') {
      await this.flushMedia(element)
    } else if (type === 'a' && attrs.href) {
      await this.render(children)
      this.buffer += ` (${attrs.href})`
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
    } else {
      await this.render(children)
    }
  }
}
