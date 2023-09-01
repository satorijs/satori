import { fileURLToPath } from 'url'
import * as QQGuild from '@qq-guild-sdk/core'
import { Dict, h, Logger, MessageEncoder, Quester } from '@satorijs/satori'
import { QQGuildBot } from './bot'

const logger = new Logger('satori')

type File = {
  type: 'url'
  data: string
} | {
  type: 'filepath'
  data: string
} | {
  type: 'buffer'
  data: Buffer
}

function dataUrlToBuffer(dataUrl: string) {
  const [, data] = dataUrl.split(',')
  return Buffer.from(data, 'base64')
}

function base64ToBuffer(base64: string) {
  return Buffer.from(base64, 'base64')
}

function urlToBuffer(url: string) {
  if (url.startsWith('data:')) {
    return dataUrlToBuffer(url)
  } else if (url.startsWith('base64:')) {
    return base64ToBuffer(url.slice(9))
  } else {
    throw new Error(`Unsupported url: ${url}`)
  }
}

function checkEmpty(req: QQGuild.Message.Request) {
  return req.content.trim() === ''
    && req.image === undefined
    && req.fileImage === undefined
    // && req.ark === undefined
    // && req.markdown === undefined
    // && req.embed === undefined
}

export class QQGuildMessageEncoder extends MessageEncoder<QQGuildBot> {
  private mode: 'figure' | 'default' = 'default'
  private content: string = ''
  private addition = {
    reference: null as string | null,
    file: null as File | null,
  }

  async flush() {
    const { reference, file } = this.addition
    const req: QQGuild.Message.Request = {
      content: this.content,
    }
    req.msgId = this.options?.session?.messageId
    if (file) {
      if (file.type === 'url') {
        req.image = file.data
      } else if (['filepath', 'buffer'].includes(file.type)) {
        req.fileImage = file.data
      } else {
        throw new Error(`Unsupported file type: ${file.type}`)
      }
      this.addition.file = null
    } else if (reference) {
      req.messageReference = reference
      this.addition.reference = null
    }

    const sender = this.bot.internal.send as QQGuild.Sender
    let result: QQGuild.Message.Response

    try {
      if (checkEmpty(req)) {
        return
      }
      if (this.session.isDirect) {
        result = await sender.private(this.session.uid, req)
      } else {
        result = await sender.channel(this.session.channelId, req)
      }
      const session = this.bot.adaptMessage(result)
      this.results.push(session)
      session.app.emit(session, 'message', session)
    } catch (e) {
      if (Quester.isAxiosError(e)) {
        const res = e.response
        logger.warn(`QQGuild: ${res.status} ${res.statusText} [${res.data.code}](${res.data.message})`)
        logger.warn(res.data.data)
      } else {
        logger.warn(e)
      }
    } finally {
      this.content = ''
    }
  }

  resolveFile(attrs: Dict) {
    const { url } = attrs as { url: string }
    try {
      if (!url) {
        throw new Error('url is required')
      }
      let file: Partial<File>
      if (url.startsWith('file:')) {
        file = {
          type: 'filepath',
          data: fileURLToPath(url),
        }
      } else if (['data:', 'base64:'].some((prefix) => url.startsWith(prefix))) {
        file = {
          type: 'buffer',
          data: urlToBuffer(url),
        }
      } else {
        throw new Error(`Unsupported url: ${url}`)
      }
      this.addition.file = file as File
    } catch (e) {
      logger.warn(e)
    }
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
      await this.flush()
      this.addition.reference = attrs.id
    } else if ((type === 'image' || type === 'video' || type === 'audio' || type === 'file') && attrs.url) {
      this.resolveFile(attrs)
      await this.flush()
    } else if (type === 'figure') {
      await this.flush()
      this.mode = 'figure'
      await this.render(children)
      await this.flush()
      this.mode = 'default'
    } else if (type === 'message') {
      if (this.mode === 'figure') {
        await this.render(children)
        this.content += '\n'
      } else {
        await this.flush()
        await this.render(children)
        await this.flush()
      }
    } else {
      await this.render(children)
    }
  }

  async send(content: h.Fragment) {
    try {
      return await super.send(content)
    } catch (e) {
      // https://bot.q.qq.com/wiki/develop/api/openapi/error/error.html#错误码处理:~:text=304031,拉私信错误
      if ([304031, 304032, 304033].includes(e.code)) {
        await this.bot.internal.createDMS(this.session.channelId, this.session.guildId || this.options.session.guildId)
        return await super.send(content)
      }
      throw e
    }
  }
}
