import { Dict, Messenger, Schema, segment, Universal, Session } from '@satorijs/satori'
import { fromBuffer } from 'file-type'
import FormData from 'form-data'
import { DiscordBot } from './bot'
import { Channel, Message } from './types'
import { adaptMessage } from './utils'

type RenderMode = 'default' | 'figure'

class State {
  author: Partial<Universal.Author> = {}
  quote: Partial<Universal.Message> = {}
  channel: Partial<Channel> = {}
  fakeMessageMap: Record<string, Session[]> = {} // [userInput] = discord messages
  threadCreated = false // forward: send the first message and create a thread

  constructor(public type: 'message' | 'forward') { }
}

export class DiscordMessenger extends Messenger<DiscordBot> {
  private stack: State[] = [new State('message')]
  private buffer: string = ''
  private addition: Dict = {}
  private figure: segment = null
  private mode: RenderMode = 'default'

  get webhook() {
    return this.bot.webhooks[this.channelId]
  }
  set webhook(val) {
    this.bot.webhooks[this.channelId] = val
  }

  async post(data?: any, headers?: any) {
    try {
      let url = `/channels/${this.channelId}/messages`
      if (this.stack[0].author.nickname || this.stack[0].author.avatar || (this.stack[0].type === 'forward' && !this.stack[0].threadCreated)) {
        await this.ensureWebhook()
        url = `/webhooks/${this.webhook.id}/${this.webhook.token}?wait=true`
      }
      if (this.stack[0].type === 'forward' && this.stack[0].channel?.id) {
        // 发送到子区
        await this.ensureWebhook()
        url = `/webhooks/${this.webhook.id}/${this.webhook.token}?wait=true&thread_id=${this.stack[0].channel?.id}`
      }
      const result = await this.bot.http.post<Message>(url, data, { headers })
      const session = this.bot.session()
      const message = await adaptMessage(this.bot, result, session)
      session.app.emit(session, 'send', session)
      this.results.push(session)

      if (this.stack[0].type === 'forward' && !this.stack[0].threadCreated) {
        this.stack[0].threadCreated = true
        let thread = await this.bot.internal.startThreadFromMessage(this.channelId, result.id, {
          name: 'Forward',
          auto_archive_duration: 60,
        })
        this.stack[0].channel = thread
      }

      return message
    } catch (e) {
      if (e?.response?.status === 404) {
        this.webhook = null
        await this.ensureWebhook()
        return this.post(data, headers)
      }
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
      if (headers['content-type'].startsWith(type) && !this.stack[0].quote) {
        return sendDirect()
      } else {
        return sendDownload()
      }
    }, sendDownload)
  }

  private async ensureWebhook() {
    if (this.webhook) return;
    let webhooks = await this.bot.internal.getChannelWebhooks(this.channelId)
    if (!webhooks.find(v => v.name === "Koishi" && v.user.id === this.bot.selfId)) {
      this.webhook = await this.bot.internal.createWebhook(this.channelId, {
        name: "Koishi"
      })
    } else {
      this.webhook = webhooks.find(v => v.name === "Koishi" && v.user.id === this.bot.selfId)
    }
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
      let target = this.stack[this.stack[0].type === 'forward' ? 1 : 0]
      if (!target.author.avatar && !target.author.nickname && this.stack[0].type !== 'forward') {
        await this.flush()
        this.addition.message_reference = {
          message_id: attrs.id,
        }
      } else {
        let replyId = attrs.id, channelId = this.channelId
        if (this.stack[0].type === 'forward' && this.stack[0].fakeMessageMap[attrs.id]?.length >= 1) {
          // quote to fake message, eg. 1st message has id (in channel or thread), later message quote to it
          replyId = this.stack[0].fakeMessageMap[attrs.id][0].messageId
          channelId = this.stack[0].fakeMessageMap[attrs.id][0].channelId
        }
        let quoted = await this.bot.getMessage(channelId, replyId)
        this.addition.embeds = [{
          description: `${quoted.author.nickname || quoted.author.username} <t:${Math.ceil(quoted.timestamp / 1000)}:R> [[ ↑ ]](https://discord.com/channels/${this.guildId}/${channelId}/${replyId})`,
          footer: {
            text: quoted.elements.filter(v => v.type === 'text').join('').slice(0, 30),
            icon_url: quoted.author.avatar
          }
        }]
      }
    }
    else if (type === 'message' && !attrs.forward) {
      if (this.mode === 'figure') {
        await this.render(children)
        this.buffer += '\n'
      } else {
        let resultLength = +this.results.length
        await this.flush()
        await this.render(children)
        await this.flush()
        let newLength = +this.results.length
        const sentMessages = this.results.slice(resultLength, newLength)
        if (this.stack[0].type === 'forward' && attrs.id) {
          this.stack[0].fakeMessageMap[attrs.id] = sentMessages
        }
        if (this.stack[0].type === 'message') {
          Object.assign(this.stack[0].author, {})
        }
        if (this.stack[0].type === 'forward') {
          Object.assign(this.stack[1].author, {})
        }
      }
    } else if (type === 'message' && attrs.forward) {
      this.stack.unshift(new State('forward'))
      await this.render(children)
      await this.flush()
      await this.bot.internal.modifyChannel(this.stack[0].channel.id, {
        archived: true,
        locked: true
      })
      this.stack.shift()
    }
    else if (type === 'author') {
      const { avatar, nickname } = attrs
      if (avatar) this.addition.avatar_url = avatar
      if (nickname) this.addition.username = nickname
      if (this.stack[0].type === 'message') {
        Object.assign(this.stack[0].author, attrs)
      }
      if (this.stack[0].type === 'forward') {
        Object.assign(this.stack[1].author, attrs)
      }
    }
    else {
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
