import * as QQ from './types'
import { Context, Dict, h, MessageEncoder } from '@satorijs/core'
import { QQBot } from './bot'
import { QQGuildBot } from './bot/guild'

export const escapeMarkdown = (val: string) =>
  val
    .replace(/([\\`*_[\*_~`\]\-(#!>])/g, '\\$&')

export class QQGuildMessageEncoder<C extends Context = Context> extends MessageEncoder<C, QQGuildBot<C>> {
  private content: string = ''
  private file: Blob
  private filename: string
  fileUrl: string
  private passiveId: string
  private passiveEventId: string
  reference: string
  private retry = false
  // 先文后图
  async flush() {
    if (!this.content.trim().length && !this.file && !this.fileUrl) {
      return
    }
    const isDirect = this.channelId.includes('_')

    let endpoint = `/channels/${this.channelId}/messages`
    if (isDirect) endpoint = `/dms/${this.channelId.split('_')[0]}/messages`
    const useFormData = Boolean(this.file)
    let msg_id = this.options?.session?.messageId
    if (this.options?.session && (Date.now() - this.options?.session?.timestamp) > MSG_TIMEOUT) {
      msg_id = null
    }
    if (this.passiveId) msg_id = this.passiveId

    let r: Partial<QQ.Message.Response>
    this.bot.logger.debug('use form data %s', useFormData)
    try {
      if (useFormData) {
        const form = new FormData()
        form.append('content', this.content)
        if (this.options?.session && msg_id) {
          form.append('msg_id', msg_id)
        }
        if (this.passiveEventId) {
          form.append('event_id', this.passiveEventId)
        }
        if (this.file) {
          form.append('file_image', this.file, this.filename)
        }
        // if (this.fileUrl) {
        //   form.append('image', this.fileUrl)
        // }
        r = await this.bot.http.post<QQ.Message>(endpoint, form)
      } else {
        const payload: QQ.Message.ChannelRequest = {
          ...{
            content: this.content,
            msg_id,
            image: this.fileUrl,
          },
          ...(this.reference ? {
            message_reference: {
              message_id: this.reference,
            },
          } : {}),
          ...(this.passiveEventId ? {
            event_id: this.passiveEventId,
          } : {}),
        }
        if (isDirect) r = await this.bot.internal.sendDM(this.channelId.split('_')[0], payload)
        else r = await this.bot.internal.sendMessage(this.channelId, payload)
      }
    } catch (e) {
      if (this.bot.http.isError(e)) {
        if (this.bot.parent.config.retryWhen.includes(e.response.data.code) && !this.retry && this.fileUrl) {
          this.bot.logger.warn('retry image sending')
          this.retry = true
          await this.resolveFile(null, true)
          await this.flush()
        }
        if (useFormData) {
          this.bot.logger.warn(`POST ${endpoint} response: %o, trace id: %s`, e.response.data, e.response.headers.get('x-tps-trace-id'))
        }
      }
    }

    // this.bot.logger.debug(r)
    const session = this.bot.session()
    session.type = 'send'
    // await decodeMessage(this.bot, r, session.event.message = {}, session.event)
    session.guildId = this.session.guildId
    session.channelId = this.channelId
    session.isDirect = isDirect

    // https://bot.q.qq.com/wiki/develop/api/gateway/direct_message.html#%E6%B3%A8%E6%84%8F
    /**
     * active msg, http 202: {"code":304023,"message":"push message is waiting for audit now","data":{"message_audit":{"audit_id":"xxx"}}}
     * passive msg, http 200: Partial<QQ.Message>
     */
    if (r?.id) {
      session.messageId = r.id
      session.app.emit(session, 'send', session)
      this.results.push(session.event.message)
    } else if (r?.code === 304023 && this.bot.config.parent.intents & QQ.Intents.MESSAGE_AUDIT) {
      try {
        const auditData: QQ.MessageAudited = await this.audit(r.data.message_audit.audit_id)
        session.messageId = auditData.message_id
        session.app.emit(session, 'send', session)
        this.results.push(session.event.message)
      } catch (e) {
        this.bot.logger.error(e)
      }
    }
    this.content = ''
    this.file = null
    this.filename = null
    this.fileUrl = null
    this.retry = false
  }

  async audit(audit_id: string): Promise<QQ.MessageAudited> {
    return new Promise((resolve, reject) => {
      const dispose = this.bot.ctx.on('qq/message-audit-pass', (data) => {
        if (data.audit_id === audit_id) {
          dispose()
          dispose2()
          resolve(data)
        }
      })
      const dispose2 = this.bot.ctx.on('qq/message-audit-reject', (data) => {
        if (data.audit_id === audit_id) {
          dispose()
          dispose2()
          reject(data)
        }
      })
    })
  }

  async resolveFile(attrs: Dict, download = false) {
    if (!download && !await this.bot.ctx.http.isLocal(attrs.src || attrs.url)) {
      return this.fileUrl = attrs.src || attrs.url
    }
    const { data, filename, type } = await this.bot.ctx.http.file(this.fileUrl || attrs.src || attrs.url, attrs)
    this.file = new Blob([data], { type })
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
    } else if (type === 'passive') {
      if (attrs.messageId) this.passiveId = attrs.messageId
      if (attrs.eventId) this.passiveEventId = attrs.eventId
    } else if ((type === 'img' || type === 'image') && (attrs.src || attrs.url)) {
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
  private passiveId: string
  private passiveSeq: number
  private useMarkdown = false
  private rows: QQ.Button[][] = []
  private attachedFile: QQ.Message.File.Response
  private retry = false

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
    if (this.passiveId) msg_id = this.passiveId
    if (this.passiveSeq) msg_seq = this.passiveSeq
    const data: QQ.Message.Request = {
      content: this.content,
      msg_type: QQ.Message.Type.TEXT,
      msg_id,
      msg_seq,
    }
    if (this.attachedFile) {
      if (!data.content.length) data.content = ' '
      data.media = this.attachedFile
      data.msg_type = QQ.Message.Type.MEDIA
    }

    if (this.useMarkdown) {
      data.msg_type = QQ.Message.Type.MARKDOWN
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
    const send = async () => {
      try {
        if (this.session.isDirect) {
          const { sendResult: { msg_id } } = await this.bot.internal.sendPrivateMessage(this.session.channelId, data)
          session.messageId = msg_id
        } else {
          const resp = await this.bot.internal.sendMessage(this.session.channelId, data)
          if (resp.id) {
            session.messageId = resp.id
            session.timestamp = new Date(resp.timestamp).valueOf()
            session.channelId = this.session.channelId
            session.guildId = this.session.guildId
            session.app.emit(session, 'send', session)
            this.results.push(session.event.message)
          } else if (resp.code === 304023 && this.bot.config.intents & QQ.Intents.MESSAGE_AUDIT) {
            try {
              const auditData: QQ.MessageAudited = await this.audit(resp.data.message_audit.audit_id)
              session.messageId = auditData.message_id
              session.app.emit(session, 'send', session)
              this.results.push(session.event.message)
            } catch (e) {
              this.bot.logger.error(e)
            }
          }
        }
      } catch (e) {
        if (!this.bot.http.isError(e)) throw e
        this.errors.push(e)
        if (!this.retry && this.bot.config.retryWhen.includes(e.response.data.code)) {
          this.bot.logger.warn('%s retry message sending', this.session.cid)
          this.retry = true
          await send()
        }
      }
    }
    await send()
    this.content = ''
    this.attachedFile = null
    this.rows = []
    this.retry = false
  }

  async audit(audit_id: string): Promise<QQ.MessageAudited> {
    return new Promise((resolve, reject) => {
      const dispose = this.bot.ctx.on('qq/message-audit-pass', (data) => {
        if (data.audit_id === audit_id) {
          dispose()
          dispose2()
          resolve(data)
        }
      })
      const dispose2 = this.bot.ctx.on('qq/message-audit-reject', (data) => {
        if (data.audit_id === audit_id) {
          dispose()
          dispose2()
          reject(data)
        }
      })
    })
  }

  async sendFile(type: string, attrs: Dict) {
    const url = attrs.src || attrs.url
    let file_type = 0
    if (type === 'img' || type === 'image') file_type = 1
    else if (type === 'video') file_type = 2
    else if (type === 'audio') file_type = 3
    else return
    const data: QQ.Message.File.Request = {
      file_type,
      srv_send_msg: false,
    }
    const capture = /^data:([\w/-]+);base64,(.*)$/.exec(url)
    if (capture?.[2]) {
      data.file_data = capture[2]
    } else if (await this.bot.ctx.http.isLocal(url)) {
      data.file_data = Buffer.from((await this.bot.ctx.http.file(url)).data).toString('base64')
    } else {
      data.url = url
    }
    let res: QQ.Message.File.Response
    try {
      if (this.session.isDirect) {
        res = await this.bot.internal.sendFilePrivate(this.options.session.event.message.user.id, data)
      } else {
        res = await this.bot.internal.sendFileGuild(this.session.guildId, data)
      }
    } catch (e) {
      if (!this.bot.http.isError(e)) throw e
      this.errors.push(e)
      if (!this.retry && this.bot.config.retryWhen.includes(e.response.data.code)) {
        this.bot.logger.warn('%s retry message sending', this.session.cid)
        this.retry = true
        await this.sendFile(type, attrs)
      }
    }
    this.retry = false
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
    } else if (type === 'passive') {
      this.passiveId = attrs.messageId
      this.passiveSeq = Number(attrs.seq)
    } else if ((type === 'img' || type === 'image') && (attrs.src || attrs.url)) {
      await this.flush()
      const data = await this.sendFile(type, attrs)
      if (data) this.attachedFile = data
    } else if (type === 'video' && (attrs.src || attrs.url)) {
      await this.flush()
      const data = await this.sendFile(type, attrs)
      if (data) this.attachedFile = data
      await this.flush() // text can't send with video
    } else if (type === 'audio' && (attrs.src || attrs.url)) {
      await this.flush()
      const { data } = await this.bot.ctx.http.file(attrs.src || attrs.url, attrs)
      if (data.slice(0, 7).toString().includes('#!SILK')) {
        const onlineFile = await this.sendFile(type, {
          src: `data:audio/amr;base64,` + Buffer.from(data).toString('base64'),
        })
        this.attachedFile = onlineFile
      } else {
        const silk = this.bot.ctx.get('silk')
        if (!silk) return this.bot.logger.warn('missing silk service, cannot send non-silk audio')
        if (silk.isWav(data)) {
          const result = await silk.encode(data, 0)
          const onlineFile = await this.sendFile(type, {
            src: `data:audio/amr;base64,` + Buffer.from(result.data).toString('base64'),
          })
          if (onlineFile) this.attachedFile = onlineFile
        } else {
          if (!this.bot.ctx.get('ffmpeg')) return this.bot.logger.warn('missing ffmpeg service, cannot send non-silk audio except wav')
          const wavBuf = await this.bot.ctx.get('ffmpeg')
            .builder()
            .input(Buffer.from(data))
            .outputOption('-ar', '24000', '-ac', '1', '-f', 's16le')
            .run('buffer')
          const result = await silk.encode(wavBuf, 24000)
          const onlineFile = await this.sendFile(type, {
            src: `data:audio/amr;base64,` + Buffer.from(result.data).toString('base64'),
          })
          if (onlineFile) this.attachedFile = onlineFile
        }
      }
      await this.flush()
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
