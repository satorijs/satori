import { fileURLToPath } from 'url'
import * as QQGuild from './types'
import { Dict, h, Logger, MessageEncoder, Quester } from '@satorijs/satori'
import { QQGuildBot } from './bot'
import FormData from 'form-data'

const logger = new Logger('satori')

export class QQGuildMessageEncoder extends MessageEncoder<QQGuildBot> {
  private mode: 'figure' | 'default' = 'default'
  private content: string = ''
  private file: Buffer
  private filename: string
  dms: QQGuild.DMS

  async initDms() {
    const dms = await this.bot.internal.createDMS(this.options.session.userId, this.session.guildId || this.options.session.guildId)
    this.dms = dms
  }

  async prepare() {
    if (this.session.isDirect && !this.options.session) {
      // initiative send
      await this.initDms()
    }
  }

  // 先文后图
  async flush() {
    if (!this.content.trim().length && !this.file) {
      return
    }
    let endpoint = `/channels/${this.session.channelId}/messages`
    if (this.session.isDirect && !this.options?.session) {
      // initiative send
      endpoint = `/dms/${this.dms.guild_id}/messages`
    } else if (this.session.isDirect && this.options?.session) {
      // @ts-ignore
      const payload = this.options.session.qqguild.d as QQGuild.Message
      endpoint = `/dms/${payload.guild_id}/messages`
    }
    const form = new FormData()
    form.append('content', this.content)
    if (this.options?.session) {
      form.append('msg_id', this.options?.session?.messageId)
    }
    if (this.file) {
      form.append('file_image', this.file, this.filename)
    }

    const r = await this.bot.http.post(endpoint, form, {
      headers: form.getHeaders(),
    })
    const session = this.bot.adaptMessage(r)

    // https://bot.q.qq.com/wiki/develop/api/gateway/direct_message.html#%E6%B3%A8%E6%84%8F
    // session.guildId = this.session.guildId
    this.results.push(session)
    session.app.emit(session, 'send', session)
    this.content = ''
    this.file = null
    this.filename = null
  }

  async resolveFile(attrs: Dict) {
    const { data, filename } = await this.bot.ctx.http.file(attrs.url, attrs)
    this.file = Buffer.from(data)
    this.filename = filename
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
      // this.addition.reference = attrs.id
    } else if (type === 'image' && attrs.url) {
      await this.resolveFile(attrs)
      await this.flush()
    }
    //  else if (type === 'figure') {
    //   await this.flush()
    //   this.mode = 'figure'
    //   await this.render(children)
    //   await this.flush()
    //   this.mode = 'default'
    // }
    else if (type === 'message') {
      // if (this.mode === 'figure') {
      // await this.render(children)
      // this.content += '\n'
      // } else {
      await this.flush()
      await this.render(children)
      await this.flush()
      // }
    } else {
      await this.render(children)
    }
  }

  // async send(content: h.Fragment) {
  //   try {
  //     return await super.send(content)
  //   } catch (e) {
  //     // https://bot.q.qq.com/wiki/develop/api/openapi/error/error.html#错误码处理:~:text=304031
  //     if ([304031, 304032, 304033].includes(e.code)) {
  //       const { channel_id, guild_id } = await this.bot.internal.createDMS(this.session.channelId, this.session.guildId || this.options.session.guildId)
  //       this.session.channelId = channel_id
  //       this.session.guildId = guild_id
  //       return await super.send(content)
  //     }
  //     throw e
  //   }
  // }
}
