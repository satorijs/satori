import { Dict, Messenger, Schema, segment } from '@satorijs/satori'
import { fromBuffer } from 'file-type'
import FormData from 'form-data'
import { DiscordBot } from './bot'
import { adaptMessage } from './utils'

type RenderMode = 'default' | 'figure'

export class DiscordMessenger extends Messenger<DiscordBot> {
  private buffer: string = ''
  private addition: Dict = {}
  private figure: segment = null
  private mode: RenderMode = 'default'

  async post(data?: any, headers?: any) {
    try {
      const result = await this.bot.http.post(`/channels/${this.channelId}/messages`, data, { headers })
      const session = this.bot.session()
      await adaptMessage(this.bot, result, session)
      session.app.emit(session, 'send', session)
      this.results.push(session)
    } catch (e) {
      this.errors.push(e)
    }
  }

  async sendEmbed(fileBuffer: ArrayBuffer, payload_json: Dict, filename: string) {
    const fd = new FormData()
    filename ||= 'file.' + (await fromBuffer(fileBuffer)).ext
    fd.append('file', Buffer.from(fileBuffer), filename)
    fd.append('payload_json', JSON.stringify(payload_json))
    return this.post(fd, fd.getHeaders())
  }

  async sendContent(content: string, addition: Dict) {
    return this.post({ ...addition, content })
  }

  async sendAsset(type: string, data: Dict<string>, addition: Dict) {
    const { handleMixedContent, handleExternalAsset } = this.bot.config as DiscordMessenger.Config

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

    const mode = data.mode as DiscordMessenger.HandleExternalAsset || handleExternalAsset
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

  async flush() {
    const content = this.buffer.trim()
    if (!content) return
    await this.post({ ...this.addition, content })
    this.buffer = ''
    this.addition = {}
  }

  async visit(element: segment) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += attrs.content.replace(/[\\*_`~|()]/g, '\\$&')
    } else if (type === 'b' || type === 'strong') {
      this.buffer += '**'
      await this.render(children)
      this.buffer += '**'
    } else if (type === 'i' || type === 'em') {
      this.buffer += '*'
      await this.render(children)
      this.buffer += '*'
    } else if (type === 'u' || type === 'ins') {
      this.buffer += '__'
      await this.render(children)
      this.buffer += '__'
    } else if (type === 's' || type === 'del') {
      this.buffer += '~~'
      await this.render(children)
      this.buffer += '~~'
    } else if (type === 'spl') {
      this.buffer += '||'
      await this.render(children)
      this.buffer += '||'
    } else if (type === 'code') {
      this.buffer += '`'
      await this.render(children)
      this.buffer += '`'
    } else if (type === 'a') {
      await this.render(children)
      this.buffer += ` (${attrs.href}) `
    } else if (type === 'p') {
      await this.render(children)
      this.buffer += '\n'
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
    } else if (type === 'face') {
      if (attrs.platform && attrs.platform !== this.bot.platform) {
        return this.render(children)
      } else {
        this.buffer += `<${attrs.animated ? 'a' : ''}:${attrs.name}:${attrs.id}>`
      }
    } else if ((type === 'image' || type === 'video') && attrs.url) {
      if (this.mode === 'figure') {
        this.figure = element
      } else {
        await this.sendAsset(type, attrs, {
          ...this.addition,
          content: this.buffer.trim(),
        })
        this.buffer = ''
      }
    } else if (type === 'share') {
      await this.flush()
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
    } else if (type === 'figure') {
      await this.flush()
      this.mode = 'figure'
      await this.render(children)
      await this.sendAsset(this.figure.type, this.figure.attrs, {
        ...this.addition,
        content: this.buffer.trim(),
      })
      this.buffer = ''
      this.mode = 'default'
    } else if (type === 'quote') {
      await this.flush()
      this.addition.message_reference = {
        message_id: attrs.id,
      }
    } else if (type === 'message') {
      if (this.mode === 'figure') {
        await this.render(children)
        this.buffer += '\n'
      } else {
        await this.flush()
        await this.render(children, true)
      }
    } else {
      await this.render(children)
    }
  }
}

export namespace DiscordMessenger {
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

  export const Config: Schema<DiscordMessenger.Config> = Schema.object({
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
