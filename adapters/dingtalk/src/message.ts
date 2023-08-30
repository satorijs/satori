import { Dict, h, MessageEncoder } from '@satorijs/satori'
import { DingtalkBot } from './bot'
import FormData from 'form-data'
import { SendMessageData } from './types'

export const escape = (val: string) =>
  val
    .replace(/(?<!\u200b)[\*_~`]/g, '\u200B$&')
    .replace(/([\\`*_{}[\]\-(#!>])/g, '\\$&')
    .replace(/([\-\*]|\d\.) /g, '\u200B$&')
    .replace(/^(\s{4})/gm, '\u200B&nbsp;&nbsp;&nbsp;&nbsp;')

export const unescape = (val: string) =>
  val
    .replace(/\u200b([\*_~`])/g, '$1')

export class DingtalkMessageEncoder extends MessageEncoder<DingtalkBot> {
  buffer = ''

  /**
   * Markdown: https://open.dingtalk.com/document/isvapp/robot-message-types-and-data-format
   */

  hasRichContent = true
  async flush(): Promise<void> {
    if (this.buffer.length && !this.hasRichContent) {
      await this.sendMessage('sampleText', {
        content: this.buffer,
      })
    } else if (this.buffer.length && this.hasRichContent) {
      await this.sendMessage('sampleMarkdown', {
        text: this.buffer.replace(/\n/g, '\n\n'),
      })
    }
  }

  // https://open.dingtalk.com/document/orgapp/the-robot-sends-a-group-message
  async sendMessage<T extends keyof SendMessageData>(msgType: T, msgParam: SendMessageData[T]) {
    const { processQueryKey } = this.session.isDirect ? await this.bot.internal.batchSendOTO({
      msgKey: msgType,
      msgParam: JSON.stringify(msgParam),
      robotCode: this.bot.config.appkey,
      userIds: [this.session.channelId],
    }) : await this.bot.internal.orgGroupSend({
      // https://open.dingtalk.com/document/orgapp/types-of-messages-sent-by-robots
      msgKey: msgType,
      msgParam: JSON.stringify(msgParam),
      robotCode: this.bot.config.appkey,
      openConversationId: this.channelId,
    })
    const session = this.bot.session()
    session.messageId = processQueryKey
    session.channelId = this.session.channelId
    session.guildId = this.session.guildId
    console.log(session, processQueryKey)
    session.app.emit(session, 'send', session)
    this.results.push(session)
  }

  // https://open.dingtalk.com/document/orgapp/upload-media-files?spm=ding_open_doc.document.0.0.3b166172ERBuHw
  async uploadMedia(attrs: Dict) {
    const { data, mime } = await this.bot.ctx.http.file(attrs.url, attrs)
    const form = new FormData()
    // https://github.com/form-data/form-data/issues/468
    const value = process.env.KOISHI_ENV === 'browser'
      ? new Blob([data], { type: mime })
      : Buffer.from(data)
    let type: string
    if (mime.startsWith('image/') || mime.startsWith('video/')) {
      type = mime.split('/')[0]
    } else if (mime.startsWith('audio/')) {
      type = 'voice'
    } else {
      type = 'file'
    }
    form.append('type', type)
    form.append('media', value)
    const { media_id } = await this.bot.oldHttp.post('/media/upload', form, {
      headers: form.getHeaders(),
    })
    return media_id
  }

  private listType: 'ol' | 'ul' = null

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += escape(attrs.content)
    } else if (type === 'image' && attrs.url) {
      // await this.flush()
      // await this.sendMessage('sampleImageMsg', {
      //   photoURL: attrs.url
      // })
      if (this.bot.ctx.http.isPrivate(attrs.url)) {
        throw new Error(`Send ${type} failed, please use public url.`)
        // this.buffer += `![${attrs.alt}](https://static.dingtalk.com/media/${media_id}_${width}_${height}.jpg)`
      }
      this.buffer += `![${attrs.alt}](${attrs.url})`
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
    } else if (type === 'at') {
      this.buffer += `@${attrs.id}`
    } else if (type === 'p') {
      this.buffer += '\n'
      await this.render(children)
      this.buffer += '\n'
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
    } else if (type === 'ul' || type === 'ol') {
      this.listType = type
      await this.render(children)
      this.listType = null
    } else if (type === 'li') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      if (this.listType === 'ol') {
        this.buffer += `1. `
      } else if (this.listType === 'ul') {
        this.buffer += '- '
      }
      this.render(children)
      this.buffer += '\n'
    } else if (type === 'blockquote') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      this.buffer += '> '
      await this.render(children)
      this.buffer += '\n\n'
    }
  }
}
