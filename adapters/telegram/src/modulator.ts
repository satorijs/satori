import { createReadStream } from 'fs'
import { fileURLToPath } from 'url'
import { Dict, Logger, Messenger, segment } from '@satorijs/satori'
import { fromBuffer } from 'file-type'
import FormData from 'form-data'
import { TelegramBot } from './bot'
import * as Telegram from './utils'

type RenderMode = 'default' | 'figure'

const logger = new Logger('telegram')

type AssetType = 'photo' | 'audio' | 'document' | 'video' | 'animation'

async function maybeFile(payload: Dict, field: AssetType): Promise<[string?, Buffer?, string?]> {
  if (!payload[field]) return []
  let content: any
  let filename = 'file'

  const { protocol } = new URL(payload[field])

  // Because the base64 string is not url encoded, so it will contain slash
  // and can't parse with URL.pathname
  let data = payload[field].split('://')[1]

  if (protocol === 'file:') {
    content = createReadStream(fileURLToPath(payload[field]))
    delete payload[field]
  } else if (protocol === 'base64:') {
    content = Buffer.from(data, 'base64')
    delete payload[field]
  } else if (protocol === 'data:') {
    data = payload[field].split('base64,')[1]
    content = Buffer.from(data, 'base64')
    delete payload[field]
  }
  // add file extension for base64 document (general file)
  if (field === 'document' && (protocol === 'base64:' || protocol === 'data:')) {
    const type = await fromBuffer(content)
    if (!type) {
      logger.warn('Can not infer file mime')
    } else filename = `file.${type.ext}`
  }
  return [field, content, filename]
}

async function isGif(url: string) {
  if (url.toLowerCase().endsWith('.gif')) return true
  const { protocol } = new URL(url)
  let data: string
  if (protocol === 'base64:') {
    data = url.split('://')[1]
  } else if (protocol === 'data:') {
    data = url.split('base64,')[1]
  }
  if (data) {
    const type = await fromBuffer(Buffer.from(data, 'base64'))
    if (!type) {
      logger.warn('Can not infer file mime')
    } else if (type.ext === 'gif') return true
  }
  return false
}

const assetApi = {
  photo: 'sendPhoto',
  audio: 'sendAudio',
  document: 'sendDocument',
  video: 'sendVideo',
  animation: 'sendAnimation',
} as const

const supportedElements = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'del', 'a']

export class TelegramModulator extends Messenger<TelegramBot> {
  private assetType: AssetType = null
  private payload: Dict
  private mode: RenderMode = 'default'

  constructor(bot: TelegramBot, channelId: string, guildId?: string) {
    super(bot, channelId, guildId)
    const chat_id = channelId.startsWith('private:')
      ? channelId.slice(8)
      : channelId
    this.payload = { chat_id, parse_mode: 'html', caption: '' }
  }

  async addResult(result: Telegram.Message) {
    const session = this.bot.session()
    await this.bot.adaptMessage(result, session)
    this.results.push(session)
    session.app.emit(session, 'send', session)
  }

  async sendAsset() {
    const [field, content, filename] = await maybeFile(this.payload, this.assetType)
    const payload = new FormData()
    for (const key in this.payload) {
      payload.append(key, this.payload[key].toString())
    }
    if (field && content) payload.append(field, content, filename)
    const result = await this.bot.internal[assetApi[this.assetType]](payload as any)
    await this.addResult(result)
    delete this.payload[this.assetType]
    delete this.payload.reply_to_message
    this.assetType = null
    this.payload.caption = ''
  }

  async flush() {
    if (this.assetType) {
      // send previous asset if there is any
      await this.sendAsset()
    } else if (this.payload.caption) {
      const result = await this.bot.internal.sendMessage({
        chat_id: this.payload.chat_id,
        text: this.payload.caption,
        parse_mode: this.payload.parse_mode,
        reply_to_message_id: this.payload.reply_to_message_id,
      })
      await this.addResult(result)
      delete this.payload.reply_to_message
      this.payload.caption = ''
    }
  }

  async visit(element: segment) {
    const { type, attrs, children } = element
    if (type === 'text') {
      this.payload.caption += segment.escape(attrs.content)
    } else if (type === 'p') {
      await this.render(children)
      this.payload.caption += '\n'
    } else if (supportedElements.includes(type)) {
      this.payload.caption += element.toString()
    } else if (type === 'spl') {
      this.payload.caption += '<tg-spoiler>'
      await this.render(children)
      this.payload.caption += '</tg-spoiler>'
    } else if (type === 'code') {
      const { lang } = attrs
      this.payload.caption += `<code${lang ? ` class="language-${lang}"` : ''}>${segment.escape(attrs.content)}</code>`
    } else if (type === 'at') {
      if (attrs.id) {
        this.payload.caption += `<a href="tg://user?id=${attrs.id}">@${attrs.name || attrs.id}</a>`
      }
    } else if (['image', 'audio', 'video', 'file'].includes(type)) {
      if (this.mode === 'default') {
        await this.flush()
      }
      if (type === 'image') {
        this.assetType = await isGif(attrs.url) ? 'animation' : 'photo'
      } else if (type === 'file') {
        this.assetType = 'document'
      } else {
        this.assetType = type as any
      }
      this.payload[this.assetType] = attrs.url
    } else if (type === 'figure') {
      await this.flush()
      this.mode = 'figure'
      await this.render(children)
      await this.flush()
      this.mode = 'default'
    } else if (type === 'quote') {
      await this.flush()
      this.payload.reply_to_message_id = attrs.id
    } else if (type === 'message') {
      if (this.mode === 'figure') {
        await this.render(children)
        this.payload.caption += '\n'
      } else {
        await this.flush()
        await this.render(children, true)
      }
    } else {
      await this.render(children)
    }
  }
}
