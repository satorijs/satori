import crypto from 'crypto'

import { Context, Message, segment, Session } from '@satorijs/satori'

import { FeishuBot } from './bot'
import { Event, MessageContentType } from './types'

export function adaptMessage(bot: FeishuBot, data: Event<'im.message.receive_v1'>['event']): Message {
  const json = JSON.parse(data.message.content) as MessageContentType<typeof data.message.message_type>
  const assetEndpoint = (bot.config.selfUrl ?? bot.ctx.options.selfUrl) + bot.config.path + '/assets'
  let content = ''
  switch (data.message.message_type) {
    case 'text':
      content = json.text
      break
    case 'image':
      const imageUrl = `${assetEndpoint}/image/${data.message.message_id}/${json.image_key}?self_id=${bot.selfId}`
      content = segment.image(imageUrl)
      break
    case 'audio':
      const audioUrl = `${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`
      content = segment.audio(audioUrl)
      break
    case 'media':
      const mediaUrl = `${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`
      content = segment.video(mediaUrl, json.image_key)
      break
    case 'file':
      const fileUrl = `${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`
      content = segment.file(fileUrl)
      break
  }
  const result: Message = {
    userId: data.sender.sender_id.open_id,
    timestamp: Number(data.message.create_time),
    author: {
      userId: data.sender.sender_id.open_id,
    },
    messageId: data.message.message_id,
    channelId: data.message.chat_id,
    content: content,
  }

  return result
}

export function adaptSession(bot: FeishuBot, body: Event): Session<Context> {
  const session = bot.session()
  session.selfId = bot.selfId

  if (body.header.event_type === 'im.message.receive_v1') {
    session.type = 'message'
    session.subtype = body.event.message.chat_type,
    Object.assign(session, adaptMessage(bot, body.event))
  }
  return session
}

export class Cipher {
  encryptKey: string
  key: Buffer

  constructor(key: string) {
    this.encryptKey = key
    const hash = crypto.createHash('sha256')
    hash.update(key)
    this.key = hash.digest()
  }

  decrypt(encrypt: string) {
    const encryptBuffer = Buffer.from(encrypt, 'base64')
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, encryptBuffer.slice(0, 16))
    let decrypted = decipher.update(encryptBuffer.slice(16).toString('hex'), 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }

  calculateSignature(timestamp: string, nonce: string, body: string): string {
    const content = timestamp + nonce + this.encryptKey + body
    const sign = crypto.createHash('sha256').update(content).digest('hex')
    return sign
  }
}
