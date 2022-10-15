import { Dict, Schema, segment } from '@satorijs/satori'
import { readFileSync } from 'fs'
import { basename } from 'path'
import { fromBuffer } from 'file-type'
import FormData from 'form-data'
import { DiscordBot } from './bot'

class AggregateError extends Error {
  constructor(public errors: Error[], message = '') {
    super(message)
  }
}

export class Sender {
  private results: string[] = []
  private errors: Error[] = []
  private buffer: string = ''
  private addition: Dict = {}

  constructor(private bot: DiscordBot, private url: string) {}

  async post(data?: any, headers?: any) {
    try {
      const result = await this.bot.http.post(this.url, data, { headers })
      this.results.push(result.id)
    } catch (e) {
      this.errors.push(e)
    }
  }

  async sendEmbed(fileBuffer: ArrayBuffer, payload_json: Dict, filename: string) {
    const fd = new FormData()
    filename ||= 'file.' + (await fromBuffer(fileBuffer)).ext
    fd.append('file', fileBuffer, filename)
    fd.append('payload_json', JSON.stringify(payload_json))
    return this.post(fd, fd.getHeaders())
  }

  async sendContent(content: string, addition: Dict) {
    return this.post({ ...addition, content })
  }

  async sendAsset(type: string, data: Dict<string>, addition: Dict) {
    const { handleMixedContent, handleExternalAsset } = this.bot.config as Sender.Config

    if (handleMixedContent === 'separate' && addition.content) {
      await this.post(addition)
      addition.content = ''
    }

    if (['file:', 'data:', 'base64:'].some((prefix) => data.url.startsWith(prefix))) {
      const result = await this.bot.ctx.http.file(data.url)
      return await this.sendEmbed(result.data, addition, data.file || result.filename)
    }

    const sendDirect = async () => {
      if (addition.content) {
        await this.post(addition)
      }
      return this.post({ ...addition, content: data.url })
    }

    const sendDownload = async () => {
      const buffer = await this.bot.ctx.http.get<ArrayBuffer>(data.url, {
        headers: { accept: type + '/*' },
        responseType: 'arraybuffer',
      })
      return this.sendEmbed(buffer, addition, data.file)
    }

    const mode = data.mode as Sender.HandleExternalAsset || handleExternalAsset
    if (mode === 'download' || handleMixedContent === 'attach' && addition.content || type === 'file') {
      return sendDownload()
    } else if (mode === 'direct') {
      return sendDirect()
    }

    // auto mode
    return await this.bot.ctx.http.head(data.url, {
      headers: { accept: type + '/*' },
    }).then((headers) => {
      if (headers['content-type'].startsWith(type)) {
        return sendDirect()
      } else {
        return sendDownload()
      }
    }, sendDownload)
  }

  async sendBuffer() {
    const content = this.buffer.trim()
    if (!content) return
    await this.post({ ...this.addition, content })
    this.buffer = ''
    this.addition = {}
  }

  async render(elements: segment[]) {
    for (const { type, attrs, children } of elements) {
      if (type === 'text') {
        this.buffer += attrs.content
      } else if (type === 'at') {
        if (attrs.id) {
          this.buffer += `<@${attrs.id}>`
        } else if (attrs.type === 'all') {
          this.buffer += `@everyone`
        } else if (attrs.type === 'here') {
          this.buffer += `@here`
        }
      } else if (type === 'sharp' && attrs.id) {
        this.buffer += `<#${attrs.id}>`
      } else if (type === 'face' && attrs.name && attrs.id) {
        this.buffer += `<:${attrs.name}:${attrs.id}>`
      } else if ((type === 'image' || type === 'video') && attrs.url) {
        await this.sendAsset(type, attrs, {
          ...this.addition,
          content: this.buffer.trim(),
        })
        this.buffer = ''
      } else if (type === 'share') {
        await this.sendBuffer()
        await this.post({
          ...this.addition,
          embeds: [{ ...attrs }],
        })
      } else if (type === 'record') {
        await this.sendAsset('file', attrs, {
          ...this.addition,
          content: this.buffer.trim(),
        })
        this.buffer = ''
      } else if (type === 'quote') {
        await this.sendBuffer()
        this.addition.message_reference = {
          message_id: attrs.id,
        }
      } else if (type === 'message') {
        await this.sendBuffer()
        if ('quote' in attrs) {
          this.addition.message_reference = {
            message_id: attrs.id,
          }
        } else {
          await this.sendMessage(children)
        }
      } else {
        await this.render(children)
      }
    }
  }

  async sendMessage(elements: segment[]) {
    await this.render(elements)
    await this.sendBuffer()
  }

  async send(content: string) {
    const elements = segment.parse(content)
    await this.sendMessage(elements)
    if (!this.errors.length) return this.results
    throw new AggregateError(this.errors)
  }
}

export namespace Sender {
  export type HandleExternalAsset = 'auto' | 'download' | 'direct'
  export type HandleMixedContent = 'auto' | 'separate' | 'attach'

  export interface Config {
    /**
     * 发送外链资源时采用的方式
     * - download：先下载后发送
     * - direct：直接发送链接
     * - auto：发送一个 HEAD 请求，如果返回的 Content-Type 正确，则直接发送链接，否则先下载后发送（默认）
     */
    handleExternalAsset?: HandleExternalAsset
    /**
     * 发送图文等混合内容时采用的方式
     * - separate：将每个不同形式的内容分开发送
     * - attach：图片前如果有文本内容，则将文本作为图片的附带信息进行发送
     * - auto：如果图片本身采用直接发送则与前面的文本分开，否则将文本作为图片的附带信息发送（默认）
     */
    handleMixedContent?: HandleMixedContent
  }

  export const Config: Schema<Sender.Config> = Schema.object({
    handleExternalAsset: Schema.union([
      Schema.const('download' as const).description('先下载后发送'),
      Schema.const('direct' as const).description('直接发送链接'),
      Schema.const('auto' as const).description('发送一个 HEAD 请求，根据返回的 Content-Type 决定发送方式'),
    ]).role('radio').description('发送外链资源时采用的方式。').default('auto'),
    handleMixedContent: Schema.union([
      Schema.const('separate' as const).description('将每个不同形式的内容分开发送'),
      Schema.const('attach' as const).description('图片前如果有文本内容，则将文本作为图片的附带信息进行发送'),
      Schema.const('auto' as const).description('如果图片本身采用直接发送则与前面的文本分开，否则将文本作为图片的附带信息发送'),
    ]).role('radio').description('发送图文等混合内容时采用的方式。').default('auto'),
  }).description('发送设置')
}
