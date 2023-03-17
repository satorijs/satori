import { Dict, Messenger, Schema, segment, Universal, Session, Quester, Logger } from '@satorijs/satori'
import FormData from 'form-data'
import { DiscordBot } from './bot'
import { Channel, Message } from './types'
import { adaptMessage, sanitize } from './utils'

type RenderMode = 'default' | 'figure'

const logger = new Logger('discord')

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

  async post(data?: any, headers?: any) {
    try {
      let url = `/channels/${this.channelId}/messages`
      if (this.stack[0].author.nickname || this.stack[0].author.avatar || (this.stack[0].type === 'forward' && !this.stack[0].threadCreated)) {
        let webhook = await this.ensureWebhook()
        url = `/webhooks/${webhook.id}/${webhook.token}?wait=true`
      }
      if (this.stack[0].type === 'forward' && this.stack[0].channel?.id) {
        // 发送到子区
        if (this.stack[1].author.nickname || this.stack[1].author.avatar) {
          let webhook = await this.ensureWebhook()
          url = `/webhooks/${webhook.id}/${webhook.token}?wait=true&thread_id=${this.stack[0].channel?.id}`
        } else {
          url = `/channels/${this.stack[0].channel.id}/messages`
        }
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
      if (Quester.isAxiosError(e) && e.response?.data.code === 10015) {
        logger.debug('webhook has been deleted, recreating..., %o, lock %o', e.response.data, this.bot.webhookLock[this.channelId])
        if (!this.bot.webhookLock[this.channelId]) this.bot.webhooks[this.channelId] = null
        await this.ensureWebhook()
        return this.post(data, headers)
      }
      this.errors.push(e)
    }
  }

  async sendEmbed(attrs: Dict, payload: Dict) {
    const { filename, data, mime } = await this.bot.ctx.http.file(attrs.url)
    const form = new FormData()
    // https://github.com/form-data/form-data/issues/468
    const value = process.env.KOISHI_ENV === 'browser'
      ? new Blob([data], { type: mime })
      : Buffer.from(data)
    form.append('file', value, attrs.file || filename)
    form.append('payload_json', JSON.stringify(payload))
    return this.post(form, form.getHeaders())
  }

  async sendAsset(type: string, attrs: Dict<string>, addition: Dict) {
    const { handleMixedContent, handleExternalAsset } = this.bot.config as DiscordMessenger.Config

    if (handleMixedContent === 'separate' && addition.content) {
      await this.post(addition)
      addition.content = ''
    }

    const sendDirect = async () => {
      if (addition.content) {
        await this.post(addition)
      }
      return this.post({ ...addition, content: attrs.url })
    }

    const sendDownload = () => this.sendEmbed(attrs, addition)

    if (['file:', 'data:', 'base64:'].some((prefix) => attrs.url.startsWith(prefix))) {
      return await sendDownload()
    }

    const mode = attrs.mode as DiscordMessenger.HandleExternalAsset || handleExternalAsset
    if (mode === 'download' || handleMixedContent === 'attach' && addition.content || type === 'file') {
      return sendDownload()
    } else if (mode === 'direct') {
      return sendDirect()
    }

    // auto mode
    return await this.bot.ctx.http.head(attrs.url, {
      headers: { accept: type + '/*' },
    }).then((headers) => {
      if (headers['content-type'].startsWith(type)) {
        return sendDirect()
      } else {
        return sendDownload()
      }
    }, sendDownload)
  }


  async ensureWebhook() {
    return this.bot.ensureWebhook(this.channelId)
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
      this.buffer += sanitize(attrs.content);
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
      if (this.options.linkPreview) {
        this.buffer += ` (${attrs.href}) `
      } else {
        this.buffer += ` (<${attrs.href}>) `
      }
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
    } else if (type === 'audio') {
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
    } else if (type === 'message' && !attrs.forward) {
      if (this.mode === 'figure') {
        await this.render(children)
        this.buffer += '\n'
      } else {
        let resultLength = +this.results.length
        await this.flush()

        // author
        const [author] = segment.select(children, 'author')
        if (author) {
          const { avatar, nickname } = author.attrs
          if (avatar) this.addition.avatar_url = avatar
          if (nickname) this.addition.username = nickname
          if (this.stack[0].type === 'message') {
            this.stack[0].author = author.attrs
          }
          if (this.stack[0].type === 'forward') {
            this.stack[1].author = author.attrs
          }
        }

        // quote
        const [quote] = segment.select(children, 'quote')
        if (quote) {
          const parse = (val: string) => val.replace(/\\([\\*_`~|()\[\]])/g, "$1")

          let message = this.stack[this.stack[0].type === 'forward' ? 1 : 0]
          if (!message.author.avatar && !message.author.nickname && this.stack[0].type !== 'forward') {
            // no quote and author, send by bot
            await this.flush()
            this.addition.message_reference = {
              message_id: quote.attrs.id,
            }
          } else {
            // quote
            let replyId = quote.attrs.id, channelId = this.channelId
            if (this.stack[0].type === 'forward' && this.stack[0].fakeMessageMap[quote.attrs.id]?.length >= 1) {
              // quote to fake message, eg. 1st message has id (in channel or thread), later message quote to it
              replyId = this.stack[0].fakeMessageMap[quote.attrs.id][0].messageId
              channelId = this.stack[0].fakeMessageMap[quote.attrs.id][0].channelId
            }
            let quoted = await this.bot.getMessage(channelId, replyId)
            this.addition.embeds = [{
              description: `${sanitize(parse(quoted.elements.filter(v => v.type === 'text').join('')).slice(0, 30))}\n\n <t:${Math.ceil(quoted.timestamp / 1000)}:R> [[ ↑ ]](https://discord.com/channels/${this.guildId}/${channelId}/${replyId})`,
              author: {
                name: quoted.author.nickname || quoted.author.username,
                icon_url: quoted.author.avatar
              }
            }]

            // this.addition.embeds = [{
            //   description: `${sanity(quoted.author.nickname || quoted.author.username)} <t:${Math.ceil(quoted.timestamp / 1000)}:R> [[ ↑ ]](https://discord.com/channels/${this.guildId}/${channelId}/${replyId})`,
            //   footer: {
            //     text: parse(quoted.elements.filter(v => v.type === 'text').join('')).slice(0, 30) || " ",
            //     icon_url: quoted.author.avatar
            //   }
            // }]
          }
        }

        await this.render(children)
        await this.flush()
        let newLength = +this.results.length
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
