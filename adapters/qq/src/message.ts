import * as QQ from './types'
import { Context, Dict, h, MessageEncoder, Quester } from '@satorijs/satori'
import { QQBot } from './bot'
import FormData from 'form-data'
import { QQGuildBot } from './bot/guild'
import { Entry } from '@satorijs/server-temp'

export const escapeMarkdown = (val: string) =>
  val
    .replace(/([\\`*_[\*_~`\]\-(#!>])/g, '\\$&')

export class QQGuildMessageEncoder<C extends Context = Context> extends MessageEncoder<C, QQGuildBot<C>> {
  private content: string = ''
  private file: Buffer
  private filename: string
  fileUrl: string
  reference: string
  private retry = false
  private resource: Dict
  // 先文后图
  async flush() {
    if (!this.content.trim().length && !this.file && !this.fileUrl) {
      return
    }
    const isDirect = this.channelId.includes('_')

    let endpoint = `/channels/${this.channelId}/messages`
    if (isDirect) endpoint = `/dms/${this.channelId.split('_')[0]}/messages`
    const useFormData = Boolean(this.file)
    let msg_id = this.options?.session?.messageId ?? this.options?.session?.id
    if (this.options?.session && (Date.now() - this.options?.session?.timestamp) > MSG_TIMEOUT) {
      msg_id = null
    }

    let r: QQ.Message
    this.bot.logger.debug('use form data %s', useFormData)
    try {
      if (useFormData) {
        const form = new FormData()
        form.append('content', this.content)
        if (this.options?.session && msg_id) {
          form.append('msg_id', msg_id)
        }
        if (this.file) {
          form.append('file_image', this.file, this.filename)
        }
        // if (this.fileUrl) {
        //   form.append('image', this.fileUrl)
        // }
        r = await this.bot.http.post<QQ.Message>(endpoint, form, {
          headers: form.getHeaders(),
        })
      } else {
        r = await this.bot.http.post<QQ.Message>(endpoint, {
          ...{
            content: this.content,
            msg_id,
            image: this.fileUrl,
          },
          ...(this.reference ? {
            messageReference: {
              message_id: this.reference,
            },
          } : {}),
        })
      }
    } catch (e) {
      this.bot.logger.error(e)
      this.bot.logger.error('[response] %o', e.response?.data)
      if ((e.repsonse?.data?.code === 40004 || e.response?.data?.code === 102) && !this.retry && this.fileUrl) {
        this.bot.logger.warn('retry image sending')
        this.retry = true
        await this.resolveFile(null, true)
        await this.flush()
      }
    }

    this.bot.logger.debug(r)
    const session = this.bot.session()
    session.type = 'send'
    // await decodeMessage(this.bot, r, session.event.message = {}, session.event)
    if (isDirect) {
      session.guildId = this.session.guildId
      session.channelId = this.channelId
      session.isDirect = true
    }

    // https://bot.q.qq.com/wiki/develop/api/gateway/direct_message.html#%E6%B3%A8%E6%84%8F
    // this.results.push(session.event.message)
    // session.app.emit(session, 'send', session)
    this.content = ''
    this.file = null
    this.filename = null
    this.fileUrl = null
    this.resource = null
    this.retry = false
  }

  async resolveFile(attrs: Dict, download = false) {
    if (attrs) this.resource = attrs
    if (!download && !await this.bot.ctx.http.isPrivate(this.resource.url)) {
      return this.fileUrl = this.resource.url
    }
    const { data, filename } = await this.bot.ctx.http.file(this.resource.url, this.resource)
    this.file = Buffer.from(data)
    this.filename = filename
    this.fileUrl = null
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.content += attrs.content
    } else if (type === 'at') {
      switch (attrs.type) {
        case 'all':
          this.content += `@everyone`
          break
        default:
          this.content += `<@${attrs.id}>`
      }
    } else if (type === 'br') {
      this.content += '\n'
    } else if (type === 'p') {
      if (!this.content.endsWith('\n')) this.content += '\n'
      await this.render(children)
      if (!this.content.endsWith('\n')) this.content += '\n'
    } else if (type === 'sharp') {
      this.content += `<#${attrs.id}>`
    } else if (type === 'quote') {
      this.reference = attrs.id
      await this.flush()
    } else if (type === 'image' && attrs.url) {
      await this.flush()
      await this.resolveFile(attrs)
      await this.flush()
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
    } else {
      await this.render(children)
    }
  }
}

const MSG_TIMEOUT = 5 * 60 * 1000 - 2000// 5 mins

export class QQMessageEncoder<C extends Context = Context> extends MessageEncoder<C, QQBot<C>> {
  private content: string = ''
  private useMarkdown = false
  private rows: QQ.Button[][] = []
  private attachedFile: QQ.SendFileResponse

  // 先图后文
  async flush() {
    if (!this.content.trim() && !this.rows.flat().length && !this.attachedFile) return
    this.trimButtons()
    let msg_id: string, msg_seq: number
    if (this.options?.session?.messageId && Date.now() - this.options.session.timestamp < MSG_TIMEOUT) {
      this.options.session['seq'] ||= 0
      msg_id = this.options.session.messageId
      msg_seq = ++this.options.session['seq']
    }
    const data: QQ.SendMessageParams = {
      content: this.content,
      msg_type: QQ.MessageType.TEXT,
      timestamp: Math.floor(Date.now() / 1000),
      msg_id,
      msg_seq,
    }
    if (this.attachedFile) {
      if (!data.content.length) data.content = ' '
      data.media = this.attachedFile
      data.msg_type = QQ.MessageType.MEDIA
    }

    if (this.useMarkdown) {
      data.msg_type = QQ.MessageType.MARKDOWN
      delete data.content
      data.markdown = {
        content: escapeMarkdown(this.content) || ' ',
      }
      if (this.rows.length) {
        data.keyboard = {
          content: {
            rows: this.exportButtons(),
          },
        }
      }
    }
    const session = this.bot.session()
    session.type = 'send'
    try {
      if (this.session.isDirect) {
        const { sendResult: { msg_id } } = await this.bot.internal.sendPrivateMessage(this.session.channelId, data)
        session.messageId = msg_id
      } else {
        // FIXME: missing message id
        const resp = await this.bot.internal.sendMessage(this.guildId, data)
        if (resp.msg !== 'success') {
          this.bot.logger.warn(resp)
        }
      }
    } catch (e) {
      if (!Quester.isAxiosError(e)) throw e
      this.errors.push(e)
      this.bot.logger.warn('[response] %s %o', e.response?.status, e.response?.data)
    }

    // this.results.push(session.event.message)
    // session.app.emit(session, 'send', session)
    this.content = ''
    this.attachedFile = null
    this.rows = []
  }

  async sendFile(type: string, attrs: Dict) {
    let url = attrs.url, entry: Entry | undefined
    if (await this.bot.ctx.http.isPrivate(url)) {
      const temp = this.bot.ctx.get('server.temp')
      if (!temp) {
        return this.bot.logger.warn('missing temporary file service, cannot send assets with private url')
      }
      entry = await temp.create(url)
      url = entry.url
    }
    await this.flush()
    let file_type = 0
    if (type === 'image') file_type = 1
    else if (type === 'video') file_type = 2
    else return
    const data: QQ.SendFileParams = {
      file_type,
      url,
      srv_send_msg: false,
    }
    let res: QQ.SendFileResponse
    try {
      if (this.session.isDirect) {
        res = await this.bot.internal.sendFilePrivate(this.options.session.event.message.user.id, data)
      } else {
        res = await this.bot.internal.sendFileGuild(this.session.guildId, data)
      }
    } catch (e) {
      if (!Quester.isAxiosError(e)) throw e
      this.errors.push(e)
      this.bot.logger.warn('[response] %s %o', e.response?.status, e.response?.data)
    }
    entry?.dispose?.()
    return res
  }

  decodeButton(attrs: Dict, label: string) {
    const result: QQ.Button = {
      id: attrs.id,
      render_data: {
        label,
        visited_label: label,
        style: attrs.class === 'primary' ? 1 : 0,
      },
      action: {
        type: attrs.type === 'input' ? 2
          : (attrs.type === 'link' ? 0 : 1),
        permission: {
          type: 2,
        },
        data: attrs.type === 'input'
          ? attrs.text : attrs.type === 'link'
            ? attrs.href : attrs.id,
      },
    }
    return result
  }

  lastRow() {
    if (!this.rows.length) this.rows.push([])
    let last = this.rows[this.rows.length - 1]
    if (last.length >= 5) {
      this.rows.push([])
      last = this.rows[this.rows.length - 1]
    }
    return last
  }

  trimButtons() {
    if (this.rows.length && this.rows[this.rows.length - 1].length === 0) this.rows.pop()
  }

  exportButtons() {
    return this.rows.map(v => ({
      buttons: v,
    })) as QQ.InlineKeyboardRow[]
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.content += attrs.content
    } else if (type === 'image' && attrs.url) {
      await this.flush()
      const data = await this.sendFile(type, attrs)
      if (data) this.attachedFile = data
    } else if (type === 'video' && attrs.url) {
      await this.flush()
      const data = await this.sendFile(type, attrs)
      if (data) this.attachedFile = data
      await this.flush() // text can't send with video
    } else if (type === 'br') {
      this.content += '\n'
    } else if (type === 'p') {
      if (!this.content.endsWith('\n')) this.content += '\n'
      await this.render(children)
      if (!this.content.endsWith('\n')) this.content += '\n'
    } else if (type === 'button-group') {
      this.useMarkdown = true
      this.rows.push([])
      await this.render(children)
      this.rows.push([])
    } else if (type === 'button') {
      this.useMarkdown = true
      const last = this.lastRow()
      last.push(this.decodeButton(attrs, children.join('')))
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
    } else {
      await this.render(children)
    }
  }
}
