import { Context, Dict, h, MessageEncoder, Schema, Universal } from '@satorijs/core'
import { DiscordBot } from './bot'
import { ActionRow, Button, ButtonStyles, Channel, ComponentType, Message } from './types'
import { decodeMessage, sanitize, sanitizeCode } from './utils'

type RenderMode = 'default' | 'figure'

class State {
  author: Partial<Universal.User> = {}
  quote: Partial<Universal.Message> = {}
  channel: Partial<Channel> = {}
  fakeMessageMap: Record<string, Universal.Message[]> = {} // [userInput] = discord messages
  threadCreated = false // forward: send the first message and create a thread

  constructor(public type: 'message' | 'forward') { }
}

export class DiscordMessageEncoder<C extends Context = Context> extends MessageEncoder<C, DiscordBot<C>> {
  private stack: State[] = [new State('message')]
  private buffer: string = ''
  private addition: Dict = {}
  private figure?: h
  private mode: RenderMode = 'default'
  private listType?: 'ol' | 'ul'
  private rows: ActionRow[] = []
  private async getUrl() {
    const input = this.options?.session?.discord
    if (input?.t === 'INTERACTION_CREATE') {
      // 消息交互
      return `/webhooks/${input.d.application_id}/${input.d.token}`
    } else if (this.stack[0].type === 'forward' && this.stack[0].channel?.id) {
      // 发送到子区
      if (this.stack[1].author.name || this.stack[1].author.avatar) {
        const webhook = await this.ensureWebhook()
        return `/webhooks/${webhook.id}/${webhook.token}?wait=true&thread_id=${this.stack[0].channel?.id}`
      } else {
        return `/channels/${this.stack[0].channel.id}/messages`
      }
    } else {
      if (this.stack[0].author.name || this.stack[0].author.avatar || (this.stack[0].type === 'forward' && !this.stack[0].threadCreated)) {
        const webhook = await this.ensureWebhook()
        return `/webhooks/${webhook.id}/${webhook.token}?wait=true`
      } else {
        return `/channels/${this.channelId}/messages`
      }
    }
  }

  async post(data?: any, headers?: any) {
    try {
      const url = await this.getUrl()
      const result = await this.bot.http.post<Message>(url, data, { headers })
      const session = this.bot.session()
      const message = await decodeMessage(this.bot, result, session.event.message = {}, session.event)
      session.app.emit(session, 'send', session)
      this.results.push(session.event.message)
      Object.defineProperty(session.event.message, 'channel', {
        configurable: true,
        get: () => session.event.channel,
      })

      if (this.stack[0].type === 'forward' && !this.stack[0].threadCreated) {
        this.stack[0].threadCreated = true
        const thread = await this.bot.internal.startThreadFromMessage(this.channelId, result.id, {
          name: 'Forward',
          auto_archive_duration: 60,
        })
        this.stack[0].channel = thread
      }

      return message
    } catch (e) {
      if (this.bot.http.isError(e) && e.response) {
        if (e.response.data?.code === 10015) {
          this.bot.logger.debug('webhook has been deleted, recreating..., %o', e.response.data)
          if (!this.bot.webhookLock[this.channelId]) {
            this.bot.webhooks[this.channelId] = null
          }
          await this.ensureWebhook()
          return this.post(data, headers)
        } else {
          e = new Error(`[${e.response.status}] ${JSON.stringify(e.response.data)}`)
        }
      }
      this.errors.push(e)
    }
  }

  async sendEmbed(attrs: Dict, payload: Dict) {
    const { filename, data, type } = await this.bot.ctx.http.file(attrs.src || attrs.url, attrs)
    const form = new FormData()
    const value = new Blob([data], { type })
    // https://discord.com/developers/docs/reference#uploading-files
    form.append('files[0]', value, attrs.file || filename)
    form.append('payload_json', JSON.stringify(payload))
    return this.post(form)
  }

  async sendAsset(type: string, attrs: Dict<string>, addition: Dict) {
    const { handleMixedContent, handleExternalAsset } = this.bot.config as DiscordMessageEncoder.Config

    if (handleMixedContent === 'separate' && addition.content) {
      await this.post(addition)
      addition.content = ''
    }

    const sendDirect = async () => {
      if (addition.content) {
        await this.post(addition)
      }
      return this.post({ ...addition, content: attrs.src || attrs.url })
    }

    if (await this.bot.http.isLocal(attrs.src || attrs.url)) {
      return await this.sendEmbed(attrs, addition)
    }

    const mode = attrs.mode as DiscordMessageEncoder.HandleExternalAsset || handleExternalAsset
    if (mode === 'download' || handleMixedContent === 'attach' && addition.content || type === 'file') {
      return this.sendEmbed(attrs, addition)
    } else if (mode === 'direct') {
      return sendDirect()
    }

    // auto mode
    if (await this.checkMediaType(attrs.src || attrs.url, type)) {
      return sendDirect()
    } else {
      return this.sendEmbed(attrs, addition)
    }
  }

  checkMediaType(url: string, type: string) {
    if (url.startsWith('https://cdn.discordapp.com/')) return true
    return this.bot.ctx.http.head(url, {
      headers: { accept: type + '/*' },
      timeout: 1000,
    }).then(
      (headers) => headers.get('content-type')?.startsWith(type),
      () => false,
    )
  }

  async ensureWebhook() {
    return this.bot.ensureWebhook(this.channelId)
  }

  async flush() {
    const content = this.buffer.trim()
    this.trimButtons()
    if (!content && !this.rows.length) return
    this.addition.components = this.rows
    await this.post({ ...this.addition, content })
    this.buffer = ''
    this.addition = {}
    this.rows = []
  }

  decodeButton(attrs: Dict, label: string): Button {
    let style = ButtonStyles.PRIMARY
    if (attrs.class === 'secondary') style = ButtonStyles.SECONDARY
    if (attrs.class === 'danger') style = ButtonStyles.DANGER
    if (attrs.class === 'success') style = ButtonStyles.SUCCESS
    if (attrs.type === 'link') {
      return {
        type: ComponentType.BUTTON,
        url: attrs.href,
        label: label || 'Link',
        style: ButtonStyles.LINK,
      }
    } else if (attrs.type === 'input') {
      return {
        type: ComponentType.BUTTON,
        custom_id: `input${attrs.id}:${attrs.text ?? ''}`,
        label: label || 'Input',
        style,
      }
    } else {
      return {
        type: ComponentType.BUTTON,
        custom_id: attrs.id,
        label: label || 'Button',
        style,
      }
    }
  }

  lastRow() {
    if (!this.rows.length) {
      this.rows.push({
        type: ComponentType.ACTION_ROW,
        components: [],
      })
    }
    let last = this.rows[this.rows.length - 1]
    if (last.components.length >= 5) {
      this.rows.push({
        type: ComponentType.ACTION_ROW,
        components: [],
      })
      last = this.rows[this.rows.length - 1]
    }
    return last
  }

  trimButtons() {
    if (this.rows.length && this.rows[this.rows.length - 1].components.length === 0) this.rows.pop()
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += sanitize(attrs.content)
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
      this.buffer += '``'
      this.buffer += sanitizeCode(children.toString())
      this.buffer += '``'
    } else if (type === 'code-block') {
      this.buffer += `\`\`\`${attrs.language ?? ''}\n`
      this.buffer += sanitizeCode(children.toString())
      this.buffer += '\n```'
    } else if (type === 'a') {
      this.buffer += '['
      await this.render(children)
      this.buffer += ']'
      if (this.options.linkPreview) {
        this.buffer += `(${attrs.href})`
      } else {
        this.buffer += `(<${attrs.href}>)`
      }
    } else if (type === 'br') {
      this.buffer += '\n'
    } else if (type === 'p') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      await this.render(children)
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
    } else if (type === 'blockquote') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      this.buffer += '> '
      await this.render(children)
      this.buffer += '\n'
    } else if (type === 'ul' || type === 'ol') {
      this.listType = type
      await this.render(children)
      this.listType = undefined
    } else if (type === 'li') {
      if (!this.buffer.endsWith('\n')) this.buffer += '\n'
      if (this.listType === 'ol') {
        this.buffer += '0. '
      } else if (this.listType === 'ul') {
        this.buffer += '- '
      }
      this.render(children)
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
    } else if ((type === 'img' || type === 'image' || type === 'video') && (attrs.src || attrs.url)) {
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
    } else if (type === 'audio') {
      await this.sendAsset('file', attrs, {
        ...this.addition,
        content: '',
        attachments: [
          {
            waveform: '', // base64 encoded bytearray representing a sampled waveform
            id: 0,
            duration_secs: attrs.duration ?? 0,
          },
        ],
        flags: Message.Flag.IS_VOICE_MESSAGE,
      })
      this.buffer = ''
    } else if (type === 'author') {
      const { avatar, name } = attrs
      if (avatar) this.addition.avatar_url = avatar
      if (name) this.addition.username = name
      if (this.stack[0].type === 'message') {
        this.stack[0].author = attrs
      }
      if (this.stack[0].type === 'forward') {
        this.stack[1].author = attrs
      }
    } else if (type === 'quote') {
      await this.flush()
      const parse = (val: string) => val.replace(/\\([\\*_`~|()\[\]])/g, '$1')

      const message = this.stack[this.stack[0].type === 'forward' ? 1 : 0]
      if (!message.author.avatar && !message.author.name && this.stack[0].type !== 'forward') {
        // no quote and author, send by bot
        await this.flush()
        this.addition.message_reference = {
          message_id: attrs.id,
        }
      } else {
        // quote
        let replyId = attrs.id, guildId = this.session.guildId, channelId = this.channelId
        if (this.stack[0].type === 'forward' && this.stack[0].fakeMessageMap[attrs.id]?.length >= 1) {
          // quote to fake message, eg. 1st message has id (in channel or thread), later message quote to it
          replyId = this.stack[0].fakeMessageMap[attrs.id][0].id
          channelId = this.stack[0].fakeMessageMap[attrs.id][0].channel!.id
        }
        const quote = await this.bot.getMessage(channelId, replyId)
        if (!guildId) {
          const c = await this.bot.internal.getChannel(channelId)
          if (c.guild_id) guildId = c.guild_id
        }
        if (!guildId) {
          this.bot.logger.warn('skip <quote> due to missing guild id')
          return
        }
        this.addition.embeds = [{
          description: [
            sanitize(parse(quote.elements.filter(v => v.type === 'text').join('')).slice(0, 30)),
            `<t:${Math.ceil(quote.timestamp / 1000)}:R> [[ ↑ ]](https://discord.com/channels/${guildId}/${channelId}/${replyId})`,
          ].join('\n\n'),
          author: {
            name: quote.user.name,
            icon_url: quote.user.avatar,
          },
        }]
      }
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
    } else if (type === 'message' && !attrs.forward) {
      if (this.mode === 'figure') {
        await this.render(children)
        this.buffer += '\n'
      } else {
        const resultLength = +this.results.length
        await this.flush()

        await this.render(children)
        await this.flush()
        const newLength = +this.results.length
        const sentMessages = this.results.slice(resultLength, newLength)
        if (this.stack[0].type === 'forward' && attrs.id) {
          this.stack[0].fakeMessageMap[attrs.id] = sentMessages
        }
        if (this.stack[0].type === 'message') {
          this.stack[0].author = {}
        }
        if (this.stack[0].type === 'forward') {
          this.stack[1].author = {}
        }
      }
    } else if (type === 'button') {
      const last = this.lastRow()
      last.components.push(this.decodeButton(
        attrs, children.join(''),
      ))
    } else if (type === 'button-group') {
      if (this.rows.length && this.rows[this.rows.length - 1].components.length) {
        // eg. two <button-group>
        this.rows.push({
          type: ComponentType.ACTION_ROW,
          components: [],
        })
      }
      await this.render(children)
      this.rows.push({
        type: ComponentType.ACTION_ROW,
        components: [],
      })
    } else if (type === 'message' && attrs.forward) {
      this.stack.unshift(new State('forward'))
      await this.render(children)
      await this.flush()
      await this.bot.internal.modifyChannel(this.stack[0].channel.id, {
        archived: true,
        locked: true,
      })
      this.stack.shift()
    } else {
      await this.render(children)
    }
  }
}

export namespace DiscordMessageEncoder {
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

  export const Config: Schema<DiscordMessageEncoder.Config> = Schema.object({
    handleExternalAsset: Schema.union([
      Schema.const('download').description('先下载后发送'),
      Schema.const('direct').description('直接发送链接'),
      Schema.const('auto').description('发送一个 HEAD 请求，根据返回的 Content-Type 决定发送方式'),
    ]).role('radio').description('发送外链资源时采用的方式。').default('auto'),
    handleMixedContent: Schema.union([
      Schema.const('separate').description('将每个不同形式的内容分开发送'),
      Schema.const('attach').description('图片前如果有文本内容，则将文本作为图片的附带信息进行发送'),
      Schema.const('auto').description('如果图片本身采用直接发送则与前面的文本分开，否则将文本作为图片的附带信息发送'),
    ]).role('radio').description('发送图文等混合内容时采用的方式。').default('auto'),
  }).description('发送设置')
}
