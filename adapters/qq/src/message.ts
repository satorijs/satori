import * as QQ from './types'
import { Context, Dict, h, MessageEncoder, omit, Session } from '@satorijs/core'
import { QQBot } from './bot'
import { QQGuildBot } from './bot/guild'
import crypto from 'crypto'

export const escapeMarkdown = (value: string, before: string) => {
  value = value.replaceAll(/[\\`*_!|>]|(?<=\])\(|^[#+-]|(?<=^\d+)\./gm, '\\$&')
  if (before.match(/\n\d+$/) && value.startsWith('.')
    || before.endsWith(']') && value.startsWith('(')
    || before.endsWith('\n') && '#+-'.includes(value[0]))
    value = '\\' + value
  return value
}

interface InlineCmdOption {
  text: string
  show?: string
  enter?: boolean
  reply?: boolean
}

export function inlinecmd({
  text,
  show,
  enter = false,
  reply = false,
}: InlineCmdOption) {
  return `[${show || text}](${inlinecmdUrl({ text, reply, enter })})`
}

export function inlinecmdUrl({
  text,
  reply = false,
  enter = false
}: Omit<InlineCmdOption, 'show'>) {
  const command = encodeURIComponent(text)
    .replaceAll('(', '%28')
    .replaceAll(')', '%29')
  return `mqqapi://aio/inlinecmd?` +
    Object.entries({ command, reply, enter })
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
}

declare module '@satorijs/core' {
  interface Session {
    seq: number
    streamIndex?: number
    streamId?: string
  }
}

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

const MSG_TIMEOUT = 5 * 60 * 1000 - 2000 // 5 mins

export class QQMessageEncoder<C extends Context = Context> extends MessageEncoder<C, QQBot<C>> {
  private content: string = ''
  private passiveId: string
  private passiveSeq: number
  private passiveEventId: string
  // private markdownFontSize: QQ.Message.Markdown['style']['main_font_size']
  private markdownLayout: QQ.Message.Markdown['style']['layout']
  private useMarkdown = false
  private inMarkdown = 0
  private keyboardFontSize: string
  private keyboardRows: QQ.Button[][] = []
  private promptRows: QQ.Button[][] = []
  private attachedFile: QQ.Message.File.Response
  private ark: QQ.Message.Ark
  private stream: QQ.Message.Stream.Request
  private retry = false
  reference: string

  async sendMessage(data: QQ.Message.Request, session: Session) {
    try {
      const resp = this.session.isDirect
        ? await this.bot.internal.sendPrivateMessage(this.session.channelId, data)
        : await this.bot.internal.sendMessage(this.session.channelId, data)
      if (resp.id && !resp.audit_id) {
        session.messageId = resp.id
        session.timestamp = new Date(resp.timestamp).valueOf()
        session.channelId = this.session.channelId
        session.guildId = this.session.guildId
        session.app.emit(session, 'send', session)
        this.results.push(session.event.message)
      } else if (resp.audit_id && this.bot.config.intents & QQ.Intents.MESSAGE_AUDIT) {
        try {
          const auditData: QQ.MessageAudited = await this.audit(resp.audit_id)
          session.messageId = auditData.message_id
          session.app.emit(session, 'send', session)
          this.results.push(session.event.message)
        } catch (e) {
          this.bot.logger.error(e)
        }
      }
    } catch (e) {
      if (!this.bot.http.isError(e)) throw e
      this.bot.logger.error(e.response.data)
      this.errors.push(e)
      if (!this.retry && this.bot.config.retryWhen.includes(e.response.data.code)) {
        this.bot.logger.warn('%s retry message sending', this.session.cid)
        this.retry = true
        await this.sendMessage(data, session)
      }
    }
  }

  async sendStreamMessage(data: QQ.Message.Stream.Request, session: Session) {
    try {
      const resp = await this.bot.internal.sendPrivateStreamMessage(this.session.channelId, data)
      if (resp.id) {
        session.messageId = resp.id
        session.timestamp = new Date(resp.timestamp).valueOf()
        session.channelId = this.session.channelId
        session.guildId = this.session.guildId
        session.app.emit(session, 'send', session)
        this.results.push(session.event.message)
      }
    } catch (e) {
      if (!this.bot.http.isError(e)) throw e
      this.bot.logger.error(e.response.data)
      this.errors.push(e)
      if (!this.retry && this.bot.config.retryWhen.includes(e.response.data.code)) {
        this.bot.logger.warn('%s retry message sending', this.session.cid)
        this.retry = true
        await this.sendStreamMessage(data, session)
      }
    }
  }

  async flush() {
    if (!this.content.trim() && !this.keyboardRows.flat().length && !this.promptRows.flat().length && !this.attachedFile && !this.ark) {
      this.reset() // eg: <><qq:markdown></qq:markdown><image ...></>
      return
    }
    this.trimButtons()
    let msg_id: string, msg_seq: number, event_id: string
    if (this.options?.session?.messageId && Date.now() - this.options.session.timestamp < MSG_TIMEOUT) {
      this.options.session.seq ||= 0
      msg_id = this.options.session.messageId
      msg_seq = ++this.options.session['seq']
    } else if (this.options?.session?.qq?.['id'] && Date.now() - this.options.session.timestamp < MSG_TIMEOUT) {
      event_id = this.options.session.qq['id']
    }
    if (this.passiveId) msg_id = this.passiveId
    if (this.passiveSeq) msg_seq = this.passiveSeq
    if (this.passiveEventId) event_id = this.passiveEventId
    const data: QQ.Message.Request = {
      content: this.content.trim(),
      msg_type: QQ.Message.Type.TEXT,
      msg_id,
      msg_seq,
      event_id,
    }
    if (this.reference) {
      data.message_reference = {
        message_id: this.bot.msgIdxMap.get(this.reference) || this.reference,
      }
    }
    if (this.attachedFile) {
      data.media = this.attachedFile
      data.msg_type = QQ.Message.Type.MEDIA
    }
    if (this.useMarkdown) {
      if (this.attachedFile)
        throw new Error('attachedFile and markdown cannot be used together')
      data.msg_type = QQ.Message.Type.MARKDOWN
      delete data.content
      data.markdown = {
        content: this.content,
        ...this.markdownLayout ? {
          style: {
            // main_font_size: this.markdownFontSize,
            layout: this.markdownLayout,
          }
        } : {},
      }
      if (this.bot.config.markdownVerifyImage) {
        data.markdown.force_verify_image_resource = true
      }
      if (this.keyboardRows.length) {
        data.markdown.content ||= ' '
        data.keyboard = {
          content: {
            ...this.keyboardFontSize ? { style: { font_size: this.keyboardFontSize } } : {},
            rows: this.exportButtons(),
          },
        }
      }
      if (this.promptRows.length) {
        data.markdown.content ||= ' '
        data.prompt_keyboard = {
          keyboard: {
            content: {
              rows: this.exportButtons(true),
            },
          }
        }
      }
    }
    if (this.ark) {
      data.content = ' '
      delete data.markdown // noop
      data.msg_type = QQ.Message.Type.ARK
      data.ark = this.ark
    }
    const session = this.bot.session()
    session.type = 'send'
    if (this.stream && this.session.isDirect) {
      await this.sendStreamMessage(Object.assign(this.stream, {
        msg_id,
        msg_seq,
        event_id,
      }), session)
      if (session.messageId) {
        this.options.session.streamId = session.messageId
      }
    }
    else {
      await this.sendMessage(data, session)
    }
    this.reset()
  }

  private reset() {
    this.content = ''
    this.useMarkdown = false
    this.attachedFile = null
    this.keyboardFontSize = null
    this.keyboardRows = []
    this.promptRows = []
    this.ark = null
    this.stream = null
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
    else if (type === 'file') file_type = 4
    else return
    const data: QQ.Message.File.Request = {
      file_type,
      srv_send_msg: false,
    }
    let fileData: Buffer | undefined
    let fileDataBase64: string | undefined
    let fileSize = 0
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    const capture = /^data:([\w/.+-]+);base64,(.*)$/.exec(url)
    if (capture?.[2]) {
      fileDataBase64 = capture[2]
      fileSize = Buffer.byteLength(fileDataBase64, 'base64')
    } else if (await this.bot.ctx.http.isLocal(url)) {
      const file = await this.bot.ctx.http.file(url)
      data.file_name = file.filename
      fileData = Buffer.from(file.data)
      fileSize = fileData.length
    } else {
      data.url = url
    }
    if (attrs.title) data.file_name = attrs.title
    let res: QQ.Message.File.Response
    try {
      if (fileSize > this.bot.config.uploadThreshold) {
        res = await this.chunkedUpload(file_type, data.file_name ?? 'unnamed', fileData ?? Buffer.from(fileDataBase64!, 'base64'))
      } else {
        if (fileData || fileDataBase64) {
          data.file_data = fileDataBase64 ?? fileData.toString('base64')
        }
        if (this.session.isDirect) {
          res = await this.bot.internal.sendFilePrivate(this.options.session.userId, data)
        } else {
          res = await this.bot.internal.sendFileGuild(this.session.channelId, data)
        }
      }
    } catch (e) {
      if (!this.bot.http.isError(e)) throw e
      this.bot.logger.error(e.response.data)
      this.errors.push(e)
      if (!this.retry && this.bot.config.retryWhen.includes(e.response.data.code)) {
        this.bot.logger.warn('%s retry message sending', this.session.cid)
        this.retry = true
        return await this.sendFile(type, attrs)
      }
    }
    this.retry = false
    return res
  }

  async chunkedUpload(
    fileType: QQ.Message.File.Type,
    fileName: string,
    fileData: Uint8Array,
    send?: boolean,
  ) {
    const md5 = crypto.createHash('md5').update(fileData).digest('hex')
    const sha1 = crypto.createHash('sha1').update(fileData).digest('hex')
    let uploadInfo: QQ.Message.File.UploadPrepareResponse
    if (this.session.isDirect) {
      uploadInfo = await this.bot.internal.uploadPreparePrivate(this.options.session.userId, {
        file_type: fileType, file_size: fileData.length, file_name: fileName, md5, sha1,
      })
    } else {
      uploadInfo = await this.bot.internal.uploadPrepareGuild(this.session.channelId, {
        file_type: fileType, file_size: fileData.length, file_name: fileName, md5, sha1,
      })
    }
    const blockSize = +uploadInfo.block_size
    for (const part of uploadInfo.parts) {
      const buffer = fileData.subarray((part.index - 1) * blockSize, part.index * blockSize)
      await this.bot.ctx.http.put(part.presigned_url, buffer)
      const data: QQ.Message.File.UploadPartFinishRequest = {
        upload_id: uploadInfo.upload_id,
        part_index: part.index,
        block_size: buffer.length,
        md5: crypto.createHash('md5').update(buffer).digest('hex'),
      }
      if (this.session.isDirect) {
        await this.bot.internal.uploadPartFinishPrivate(this.options.session.userId, data)
      } else {
        await this.bot.internal.uploadPartFinishGuild(this.session.channelId, data)
      }
    }
    if (this.session.isDirect) {
      return this.bot.internal.sendFilePrivate(this.options.session.userId, {
        upload_id: uploadInfo.upload_id,
        srv_send_msg: !!send,
      })
    } else {
      return this.bot.internal.sendFileGuild(this.session.channelId, {
        upload_id: uploadInfo.upload_id,
        srv_send_msg: !!send,
      })
    }
  }


  static buttonStyleMap = {
    default: 0,
    primary: 1,
    suggest: 2,
    danger: 3,
    filled: 4
  } as const

  static buttonActionMap = {
    url: 0, link: 0,
    callback: 1, action: 1,
    atbot: 2, input: 2,
    mqqapi: 3, scheme: 3,
    subscribe: 4,
  } as const

  decodeButton(attrs: Dict, label: string) {
    const visited = attrs['qq:visited'] ?? attrs['visited']
    const reply = attrs['qq:reply'] ?? attrs['reply']
    const enter = attrs['qq:enter'] ?? attrs['enter']
    const anchor = attrs['qq:anchor'] ?? attrs['anchor']
    const type = attrs['qq:type'] != null ? +attrs['qq:type'] :
      QQMessageEncoder.buttonActionMap[attrs.type?.toLowerCase()] ?? (
        attrs.text ? QQMessageEncoder.buttonActionMap.input
          : attrs.href ? attrs.href.startsWith('mqq')
            ? QQMessageEncoder.buttonActionMap.mqqapi
            : QQMessageEncoder.buttonActionMap.link
            : QQMessageEncoder.buttonActionMap.atbot
      )
    const result: QQ.Button = {
      id: attrs.id,
      ...attrs['qq:group'] ? { group_id: attrs['qq:group'] } : {},
      render_data: {
        label,
        visited_label: visited || label, // 电脑端不加 visited_label 点完就没了。
        // ...visited === true ? { visited_label: label }
        //   : visited ? { visited_label: visited } : {},
        style: attrs['qq:style'] != null ? +attrs['qq:style'] :
          QQMessageEncoder.buttonStyleMap[attrs.class ?? attrs.style] ?? 0,
      },
      action: {
        type,
        permission: attrs['qq:permission'] ||
          { type: attrs.permission === 'admin' ? 1 : 2 },
        data: attrs['qq:data'] != null ? attrs['qq:data'] : {
          [QQMessageEncoder.buttonActionMap.url]: attrs.href,
          [QQMessageEncoder.buttonActionMap.callback]: attrs.id,
          [QQMessageEncoder.buttonActionMap.atbot]: attrs.text,
          [QQMessageEncoder.buttonActionMap.mqqapi]: attrs.href,
        }[type],
        ...reply ? { reply } : {},
        ...enter ? { enter } : {},
        ...anchor != null ? { anchor: +anchor } : {},
        ...attrs['qq:subscribe_data'] ? { subscribe_data: tryParseJson(attrs['qq:subscribe_data']) } : {},
        ...attrs['qq:modal'] ? { modal: tryParseJson(attrs['qq:modal']) || { content: attrs['qq:modal'] } } : {},
      },
    }
    return result
  }

  decodeArkKv(attrs: Dict<string | Dict<string>[]>): QQ.Message.ArkKv[] {
    return Object.entries(attrs)
      .flatMap(([key, value]): QQ.Message.ArkKv[] => {
        key = `#${key.toUpperCase()}#`;
        return typeof value === 'string' ? [{ key, value }] : [{
          key, obj: value.map(item => ({
            obj_kv: Object.entries(item)
              .map(([key, value]) => ({ key, value }))
          }))
        }];
      })
  }

  lastRow(prompt = false) {
    const rows = prompt ? this.promptRows : this.keyboardRows
    if (!rows.length) rows.push([])
    let last = rows[rows.length - 1]
    if (last.length >= 5) {
      rows.push([])
      last = rows[rows.length - 1]
    }
    return last
  }

  trimButtons() {
    this.keyboardRows = this.keyboardRows.filter(v => v.length > 0)
    this.promptRows = this.promptRows.filter(v => v.length > 0)
  }

  exportButtons(prompt = false) {
    const rows = prompt ? this.promptRows : this.keyboardRows
    return rows.map(v => ({
      buttons: v,
    })) as QQ.InlineKeyboardRow[]
  }

  async ensureMarkdown() {
    if (this.useMarkdown)
      return
    if (this.attachedFile)
      await this.flush()
    this.content = escapeMarkdown(this.content, '')
    this.useMarkdown = true
  }

  parseKeyboardFontSize(attrs: Dict) {
    const fontSize = attrs['qq:size'] || attrs['size']
    if (fontSize)
      this.keyboardFontSize = fontSize
    if (attrs['small'])
      this.keyboardFontSize = 'small'
  }

  static MARKDOWN_MODIFIERS = Object.entries({
    '**': ['b', 'strong'],
    '_': ['i', 'em'],
    '~~': ['s', 'del'],
    '`': ['code'],
    // '/': ['u', 'ins'],
    // '==': ['mark'],
  })

  async visit(element: h) {
    const { attrs, children } = element
    const type = element.type.replace(/^qq:/, '')
    if (type === 'text') {
      this.content += this.useMarkdown && !this.inMarkdown
        ? escapeMarkdown(attrs.content, this.content) : attrs.content
    } else if (type === 'at') {
      await this.ensureMarkdown()
      if (attrs.type === 'all') this.content += `@everyone`
      else if (attrs.id) this.content += `<@${attrs.id}>`
    } else if (type === 'inlinecmd' || type === 'a' && attrs.href) {
      await this.ensureMarkdown()
      this.content += `[`
      const length = this.content.length
      await this.render(children)
      if (type === 'inlinecmd') {
        attrs.text ??= this.content.slice(length)
        attrs.href = inlinecmdUrl(attrs as InlineCmdOption)
      }
      this.content += `](${attrs.href})`
    } else if (type === 'emoji') {
      // TODO: emoji id 和 Unicode 码点似乎不全是对应的，可能需要手动映射
      // this.content += String.fromCharCode(20, attrs.id)
    } else if (type === 'passive') {
      if (attrs.messageId) this.passiveId = attrs.messageId
      if (attrs.seq) this.passiveSeq = Number(attrs.seq)
      if (attrs.eventId) this.passiveEventId = attrs.eventId
    } else if (type === 'quote') {
      this.reference = attrs.id
      await this.flush()
    } else if ((type === 'img' || type === 'image') && (attrs.src || attrs.url)) {
      if (this.useMarkdown) {
        let { alt = attrs.title, src = attrs.url, width, height } = attrs
        if (width && height)
          alt += ` #${width}px #${height}px`
        this.content += `![${alt}](${src})`
      } else {
        await this.flush()
        const data = await this.sendFile(type, attrs)
        if (data) this.attachedFile = data
      }
    } else if (type === 'video' && (attrs.src || attrs.url)) {
      await this.flush()
      const data = await this.sendFile(type, attrs)
      if (data) this.attachedFile = data
      await this.flush() // text can't send with video
    } else if (type === 'file' && (attrs.src || attrs.url)) {
      await this.flush()
      const data = await this.sendFile(type, attrs)
      if (data) this.attachedFile = data
      await this.flush()
    } else if (type === 'audio' && (attrs.src || attrs.url)) {
      await this.flush()
      const { data } = await this.bot.ctx.http.file(attrs.src || attrs.url, attrs)
      if (new TextDecoder().decode(data.slice(0, 7)).includes('#!SILK')) {
        const onlineFile = await this.sendFile(type, {
          src: `data:audio/amr;base64,` + Buffer.from(data).toString('base64'),
        })
        this.attachedFile = onlineFile
      } else {
        const ntsilk = this.bot.ctx.get('ntsilk')
        if (ntsilk) {
          const result = await ntsilk.encode(data)
          const onlineFile = await this.sendFile(type, {
            src: `data:audio/amr;base64,` + result.output.toString('base64'),
          })
          if (onlineFile) this.attachedFile = onlineFile
        } else {
          const silk = this.bot.ctx.get('silk')
          if (!silk) return this.bot.logger.warn('missing ntsilk/silk service, cannot send non-silk audio')
          const allowSampleRate = [8000, 12000, 16000, 24000, 32000, 44100, 48000]
          if (silk.isWav(data) && allowSampleRate.includes(silk.getWavFileInfo(data).fmt.sampleRate)) {
            const result = await silk.encode(data, 0)
            const onlineFile = await this.sendFile(type, {
              src: `data:audio/amr;base64,` + Buffer.from(result.data).toString('base64'),
            })
            if (onlineFile) this.attachedFile = onlineFile
          } else {
            if (!this.bot.ctx.get('ffmpeg')) return this.bot.logger.warn('missing ffmpeg service, cannot send non-silk audio except some wav')
            const pcmBuf = await this.bot.ctx.get('ffmpeg')
              .builder()
              .input(Buffer.from(data))
              .outputOption('-ar', '24000', '-ac', '1', '-f', 's16le')
              .run('buffer')
            const result = await silk.encode(pcmBuf, 24000)
            const onlineFile = await this.sendFile(type, {
              src: `data:audio/amr;base64,` + Buffer.from(result.data).toString('base64'),
            })
            if (onlineFile) this.attachedFile = onlineFile
          }
        }
      }
      await this.flush()
    } else if (type === 'br') {
      this.content += '\n'
    } else if (type === 'p') {
      if (!this.content.endsWith('\n')) this.content += '\n'
      await this.render(children)
      if (!this.content.endsWith('\n')) this.content += '\n'
    } else if (type === 'markdown') {
      if (attrs['qq:layout'])
        this.markdownLayout = attrs['qq:layout']
      if (attrs['qq:fullwidth'] || attrs.fullwidth)
        this.markdownLayout = 'hide_avatar_and_center'
      await this.ensureMarkdown()
      this.inMarkdown++
      await this.render(children)
      this.inMarkdown--
    } else if (type === 'button-group') {
      this.parseKeyboardFontSize(attrs)
      await this.ensureMarkdown()
      this.keyboardRows.push([])
      await this.render(children)
      this.keyboardRows.push([])
    } else if (type === 'button') {
      this.parseKeyboardFontSize(attrs)
      await this.ensureMarkdown()
      const prompt = attrs['qq:prompt'] || attrs['qq:suggest'] || attrs.prompt || attrs.suggest
      const last = this.lastRow(!!prompt)
      last.push(this.decodeButton(attrs, children.join('')))
    } else if (type.startsWith('ark')) {
      await this.flush()
      this.ark = {
        template_id: type.slice(3) || attrs.id,
        kv: attrs.kv || this.decodeArkKv(omit(attrs, ['id'])),
      }
      await this.flush()
    } else if (type === 'message') {
      await this.flush()
      await this.render(children)
      await this.flush()
    } else if (type === 'stream') {
      await this.flush()
      await this.ensureMarkdown()
      await this.render(children)

      const reset = attrs.reset || attrs.head || attrs.start || !this.session.streamId
      const done = attrs.done || attrs.tail || attrs.end || attrs.finish
      if (reset) {
        this.options.session.streamIndex = 0
        this.options.session.streamId = undefined
      }
      this.stream = {
        input_mode: attrs.replace
          ? QQ.Message.Stream.InputMode.REPLACE
          : QQ.Message.Stream.InputMode.APPEND,
        input_state: done
          ? QQ.Message.Stream.InputState.DONE
          : QQ.Message.Stream.InputState.GENERATING,
        index: this.options.session.streamIndex++,
        content_type: this.useMarkdown
          || true // 整条流式消息 content_type 必须相同，使用 markdown 可以部分兼容 text。
          ? QQ.Message.Stream.ContentType.MARKDOWN
          : QQ.Message.Stream.ContentType.TEXT,
        content_raw: this.content,
        stream_msg_id: this.session.streamId,
        msg_seq: this.session.seq,
      }
      await this.flush()
      if (done) {
        delete this.options.session.streamIndex
        delete this.options.session.streamId
      }
    } else {
      for (const [delimiter, types] of QQMessageEncoder.MARKDOWN_MODIFIERS) {
        if (types.includes(type)) {
          await this.ensureMarkdown()
          this.content += delimiter
          await this.render(children)
          this.content += delimiter
          return
        }
      }
      await this.render(children)
    }
  }
}

function tryParseJson<T>(source: string | any): T | undefined {
  if (typeof source !== 'string') return source
  try { return JSON.parse(source) } catch {}
}
