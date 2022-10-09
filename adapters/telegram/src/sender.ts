import { createReadStream } from 'fs'
import { fileURLToPath } from 'url'
import { Dict, Logger, segment } from '@satorijs/satori'
import AggregateError from 'es-aggregate-error'
import fileType from 'file-type'
import FormData from 'form-data'
import * as Telegram from './types'
import { TelegramBot } from './bot'

const logger = new Logger('telegram')

const prefixTypes = ['quote', 'card', 'anonymous', 'markdown', 'html']

type AssetType = 'photo' | 'audio' | 'document' | 'video' | 'animation'

async function maybeFile(payload: Dict, field: AssetType): Promise<[string?, Buffer?, string?]> {
  if (!payload[field]) return []
  let content: any
  let filename = 'file'

  const url = new URL(payload[field])
  const schema = url.protocol

  // Because the base64 string is not url encoded, so it will contain slash
  // and can't parse with URL.pathname
  const data = payload[field].split('://')[1]

  if (schema === 'file:') {
    content = createReadStream(fileURLToPath(url))
    delete payload[field]
  } else if (schema === 'base64:') {
    content = Buffer.from(data, 'base64')
    delete payload[field]
  }
  // add file extension for base64 document (general file)
  if (field === 'document' && schema === 'base64:') {
    const type = await fileType.fromBuffer(Buffer.from(data, 'base64'))
    if (!type) {
      logger.warn('Can not infer file mime')
    } else filename = `file.${type.ext}`
  }
  return [field, content, filename]
}

async function isGif(url: string) {
  if (url.toLowerCase().endsWith('.gif')) return true
  const [schema, data] = url.split('://')
  if (schema === 'base64') {
    const type = await fileType.fromBuffer(Buffer.from(data, 'base64'))
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

export class Sender {
  private errors: Error[] = []
  private results: Telegram.Message[] = []
  private assetType: AssetType = null
  private payload: Dict

  constructor(private bot: TelegramBot, private chat_id: string) {
    this.payload = { chat_id, caption: '' }
  }

  async sendAsset() {
    const [field, content, filename] = await maybeFile(this.payload, this.assetType)
    const payload = new FormData()
    for (const key in this.payload) {
      payload.append(key, this.payload[key].toString())
    }
    if (field && content) payload.append(field, content, filename)
    this.results.push(await this.bot.internal[assetApi[this.assetType]](payload as any))
    delete this.payload[this.assetType]
    delete this.payload.reply_to_message
    this.assetType = null
    this.payload.caption = ''
  }

  async sendBuffer() {
    if (this.assetType) {
      // send previous asset if there is any
      await this.sendAsset()
    } else if (this.payload.caption) {
      this.results.push(await this.bot.internal.sendMessage({
        chat_id: this.chat_id,
        text: this.payload.caption,
        parse_mode: this.payload.parse_mode,
        reply_to_message_id: this.payload.reply_to_message_id,
      }))
      delete this.payload.reply_to_message
      this.payload.caption = ''
    }
  }

  async sendMessage(elements: segment[]) {
    for (const { type, attrs, children } of elements) {
      if (type === 'text') {
        this.payload.caption += attrs.content
      } else if (type === 'at') {
        const atTarget = attrs.name || attrs.id || attrs.role || attrs.type
        if (atTarget) this.payload.caption += `@${atTarget} `
      } else if (type === 'sharp') {
        const sharpTarget = attrs.name || attrs.id
        if (sharpTarget) this.payload.caption += `#${sharpTarget} `
      } else if (['image', 'audio', 'video', 'file'].includes(type)) {
        await this.sendBuffer()
        if (type === 'image') {
          this.assetType = await isGif(attrs.url) ? 'animation' : 'photo'
        } else if (type === 'file') {
          this.assetType = 'document'
        } else {
          this.assetType = type as any
        }
        this.payload[this.assetType] = attrs.url
      } else if (type === 'quote') {
        await this.sendBuffer()
        this.payload.reply_to_message_id = attrs.id
      } else if (type === 'message') {
        await this.sendBuffer()
        if ('quote' in attrs) {
          this.payload.reply_to_message_id = attrs.id
        } else {
          await this.sendMessage(children)
        }
      } else if (type === 'markdown') {
        this.payload.parse_mode = 'MarkdownV2'
      } else if (type === 'html') {
        this.payload.parse_mode = 'html'
      }
    }
    await this.sendBuffer()
  }

  async send(content: string) {
    const elements = segment.parse(content)
    await this.sendMessage(elements)
    if (!this.errors.length) return this.results
    throw new AggregateError(this.errors)
  }
}
