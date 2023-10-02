import { h, MessageEncoder } from '@satorijs/satori'
import { SlackBot } from './bot'
import FormData from 'form-data'
import { adaptMessage, adaptSentAsset } from './utils'
import { File } from './types'

// https://api.slack.com/reference/surfaces/formatting#basics
export const escape = (val: string) =>
  val
    .replace(/(?<!\u200b)[\*_~`]/g, '\u200B$&')
    .replace(/@everyone/g, () => '@\u200Beveryone')
    .replace(/@here/g, () => '@\u200Bhere')
    .replace(/(?<!\u200b)^>/g, '\u200A&gt;')
    // .replace(/<((?:#C|@U|!subteam\^)[0-9A-Z]{1,12})>/g, '&lt;$1&gt;')
    // .replace(/<(\!(?:here|channel|everyone)(?:\|[0-9a-zA-Z?]*)?)>/g, '&lt;$1&gt;')
    .replace(/<(.*?)>/g, '&lt;$1&gt;')

export const unescape = (val: string) =>
  val
    .replace(/\u200b([\*_~`])/g, '$1')
    .replace(/@\u200Beveryone/g, () => '@everyone')
    .replace(/@\u200Bhere/g, () => '@here')

export class SlackMessageEncoder extends MessageEncoder<SlackBot> {
  buffer = ''
  thread_ts = null
  elements: any[] = []
  addition: Record<string, any> = {}

  async flush() {
    if (!this.buffer.length) return
    const r = await this.bot.internal.chatPostMessage(this.bot.config.botToken, {
      channel: this.channelId,
      ...this.addition,
      thread_ts: this.thread_ts,
      text: this.buffer,
    })
    if (!r.ok) throw new Error(r['error'])
    const session = this.bot.session()
    await adaptMessage(this.bot, r.message, session.event.message = {}, session.event)
    session.channelId = this.channelId
    session.app.emit(session, 'send', session)
    this.results.push(session.event.message)
    this.buffer = ''
  }

  async sendAsset(element: h) {
    if (this.buffer.length) await this.flush()
    const { attrs } = element
    const { filename, data, mime } = await this.bot.ctx.http.file(attrs.url, attrs)
    const form = new FormData()
    // https://github.com/form-data/form-data/issues/468
    const value = process.env.KOISHI_ENV === 'browser'
      ? new Blob([data], { type: mime })
      : Buffer.from(data)
    form.append('file', value, attrs.file || filename)
    form.append('channels', this.channelId)
    if (this.thread_ts) form.append('thread_ts', this.thread_ts)
    const sent = await this.bot.request<{
      ok: boolean
      file: File
    }>('POST', '/files.upload', form, form.getHeaders())
    if (sent.ok) {
      const session = this.bot.session()
      adaptSentAsset(sent.file, session)
      session.app.emit(session, 'send', session)
      this.results.push(session.event.message)
    }
  }

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.buffer += escape(attrs.content)
    } else if (type === 'image' && attrs.url) {
      await this.sendAsset(element)
    } else if (type === 'sharp' && attrs.id) {
      this.buffer += `<#${attrs.id}>`
    } else if (type === 'at') {
      if (attrs.id) this.buffer += `<@${attrs.id}>`
      if (attrs.type === 'all') this.buffer += `<!everyone>`
      if (attrs.type === 'here') this.buffer += `<!here>`
    } else if (type === 'b' || type === 'strong') {
      this.buffer += '*'
      await this.render(children)
      this.buffer += '*'
    } else if (type === 'i' || type === 'em') {
      this.buffer += '_'
      await this.render(children)
      this.buffer += '_'
    } else if (type === 's' || type === 'del') {
      this.buffer += '~'
      await this.render(children)
      this.buffer += '~'
    } else if (type === 'code') {
      this.buffer += '`'
      await this.render(children)
      this.buffer += '`'
    } else if (type === 'a') {
      this.buffer += `<${attrs.href}|`
      await this.render(children)
      this.buffer += `>`
    } else if (type === 'quote') {
      this.thread_ts = attrs.id
    } else if (type === 'br') {
      this.buffer += '\n'
    } else if (type === 'p') {
      if (!this.buffer.endsWith('\n')) this.buffer += `\n`
      await this.render(children)
      if (!this.buffer.endsWith('\n')) this.buffer += `\n`
    } else if (type === 'face') {
      this.buffer += `:${attrs.id}:`
    } else if (type === 'author') {
      this.addition = {
        username: attrs.nickname,
        icon_url: attrs.avatar,
      }
    } else if (type === 'message') {
      await this.render(children)
    }
  }
}
