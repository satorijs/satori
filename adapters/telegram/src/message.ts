import { Context, Dict, h, MessageEncoder } from '@satorijs/satori'
import FormData from 'form-data'
import { TelegramBot } from './bot'
import * as Telegram from './utils'

type RenderMode = 'default' | 'figure'

type AssetMethod = 'sendPhoto' | 'sendAudio' | 'sendDocument' | 'sendVideo' | 'sendAnimation' | 'sendVoice'

async function appendAsset(bot: TelegramBot, form: FormData, element: h): Promise<AssetMethod> {
  let method: AssetMethod
  const { filename, data, mime } = await bot.ctx.http.file(element.attrs.src || element.attrs.url, element.attrs)
  if (element.type === 'img' || element.type === 'image') {
    method = mime === 'image/gif' ? 'sendAnimation' : 'sendPhoto'
  } else if (element.type === 'file') {
    method = 'sendDocument'
  } else if (element.type === 'video') {
    method = 'sendVideo'
  } else if (element.type === 'audio') {
    method = element.attrs.type === 'voice' ? 'sendVoice' : 'sendAudio'
  }
  // https://github.com/form-data/form-data/issues/468
  const value = process.env.KOISHI_ENV === 'browser'
    ? new Blob([data], { type: mime })
    : Buffer.from(data)
  form.append(method.slice(4).toLowerCase(), value, filename)
  return method
}

const supportedElements = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'del', 'a']

export class TelegramMessageEncoder<C extends Context = Context> extends MessageEncoder<C, TelegramBot<C>> {
  private asset: h = null
  private payload: Dict
  private mode: RenderMode = 'default'
  private rows: Telegram.InlineKeyboardButton[][] = []

  async prepare() {
    const chat_id = this.session.guildId || this.channelId
    this.payload = { chat_id, parse_mode: 'html', caption: '' }
    if (this.session.guildId && this.channelId !== this.session.guildId) {
      this.payload.message_thread_id = +this.channelId
    }
  }

  async addResult(result: Telegram.Message) {
    const session = this.bot.session()
    await Telegram.decodeMessage(this.bot, result, session.event.message = {}, session.event)
    this.results.push(session.event.message)
    session.app.emit(session, 'send', session)
  }

  async sendAsset() {
    const form = new FormData()
    for (const key in this.payload) {
      form.append(key, this.payload[key].toString())
    }
    form.append('reply_markup', JSON.stringify({
      inline_keyboard: this.rows,
    }))
    const method = await appendAsset(this.bot, form, this.asset)
    const result = await this.bot.internal[method](form as any)
    await this.addResult(result)
    delete this.payload.reply_to_message_id
    this.asset = null
    this.payload.caption = ''
  }

  async flush() {
    if (this.asset) {
      // send previous asset if there is any
      await this.sendAsset()
    } else if (this.payload.caption) {
      this.trimButtons()
      const result = await this.bot.internal.sendMessage({
        chat_id: this.payload.chat_id,
        text: this.payload.caption,
        parse_mode: this.payload.parse_mode,
        reply_to_message_id: this.payload.reply_to_message_id,
        message_thread_id: this.payload.message_thread_id,
        disable_web_page_preview: !this.options.linkPreview,
        reply_markup: {
          inline_keyboard: this.rows,
        },
      })
      await this.addResult(result)
      delete this.payload.reply_to_message_id
      this.payload.caption = ''
      this.rows = []
    }
  }

  decodeButton(attrs: Dict, label: string): Telegram.InlineKeyboardButton {
    if (attrs.type === 'link') {
      return {
        text: label,
        url: attrs.href,
      }
    } else if (attrs.type === 'input') {
      return {
        text: label,
        switch_inline_query_current_chat: attrs.text,
      }
    } else {
      return {
        text: label,
        callback_data: attrs.id,
      }
    }
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

  async visit(element: h) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.payload.caption += h.escape(attrs.content)
    } else if (type === 'br') {
      this.payload.caption += '\n'
    } else if (type === 'p') {
      if (!this.payload.caption.endsWith('\n')) this.payload.caption += '\n'
      await this.render(children)
      if (!this.payload.caption.endsWith('\n')) this.payload.caption += '\n'
    } else if (supportedElements.includes(type)) {
      this.payload.caption += element.toString()
    } else if (type === 'spl') {
      this.payload.caption += '<tg-spoiler>'
      await this.render(children)
      this.payload.caption += '</tg-spoiler>'
    } else if (type === 'code') {
      const { lang } = attrs
      this.payload.caption += `<code${lang ? ` class="language-${lang}"` : ''}>${h.escape(attrs.content)}</code>`
    } else if (type === 'at') {
      if (attrs.id) {
        this.payload.caption += `<a href="tg://user?id=${attrs.id}">@${attrs.name || attrs.id}</a>`
      }
    } else if (['img', 'image', 'audio', 'video', 'file'].includes(type)) {
      if (this.mode === 'default') {
        await this.flush()
      }
      this.asset = element
    } else if (type === 'figure') {
      await this.flush()
      this.mode = 'figure'
      await this.render(children)
      await this.flush()
      this.mode = 'default'
    } else if (type === 'quote') {
      await this.flush()
      this.payload.reply_to_message_id = attrs.id
    } else if (type === 'button') {
      const last = this.lastRow()
      last.push(this.decodeButton(
        attrs, children.join(''),
      ))
    } else if (type === 'button-group') {
      this.rows.push([])
      await this.render(children)
      this.rows.push([])
    } else if (type === 'message') {
      if (this.mode === 'figure') {
        await this.render(children)
        this.payload.caption += '\n'
      } else {
        await this.flush()
        await this.render(children)
        await this.flush()
      }
    } else {
      await this.render(children)
    }
  }
}
