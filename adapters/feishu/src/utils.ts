import crypto from 'crypto'

import { segment, Session, trimSlash } from '@satorijs/satori'

import { FeishuBot } from './bot'
import { AllEvents, Events, Feishu, MessageContentType, MessageType } from './types'

export function adaptMessage(bot: FeishuBot, data: Events['im.message.receive_v1']['event']): Session.Payload {
  const json = JSON.parse(data.message.content) as MessageContentType<MessageType>
  const assetEndpoint = trimSlash(bot.config.selfUrl ?? bot.ctx.config.selfUrl ?? `http://localhost:${bot.ctx.config.port}/`) + bot.config.path + '/assets'
  const content: (string | segment)[] = []
  switch (data.message.message_type) {
    case 'text': {
      let text = json.text as string
      if (!data.message.mentions?.length) {
        content.push(text)
        break
      }

      // Feishu's `at` Element would be `@{user_id}` in text
      text.split(' ').forEach((word) => {
        if (word.startsWith('@')) {
          const mention = data.message.mentions.find((mention) => mention.key === word)
          content.push(segment.at(mention.id.open_id, { name: mention.name }))
        } else {
          content.push(word)
        }
      })
      break
    }
    case 'image':
      const imageUrl = `${assetEndpoint}/image/${data.message.message_id}/${json.image_key}?self_id=${bot.selfId}`
      content.push(segment.image(imageUrl))
      break
    case 'audio':
      const audioUrl = `${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`
      content.push(segment.audio(audioUrl))
      break
    case 'media':
      const mediaUrl = `${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`
      content.push(segment.video(mediaUrl, json.image_key))
      break
    case 'file':
      const fileUrl = `${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`
      content.push(segment.file(fileUrl))
      break
  }
  const result: Session.Payload = {
    userId: data.sender.sender_id.open_id,
    timestamp: Number(data.message.create_time),
    author: {
      userId: data.sender.sender_id.open_id,
    },
    messageId: data.message.message_id,
    channelId: data.message.chat_id,
    content: content.map((c) => c.toString()).join(' '),
    platform: 'feishu',
    selfId: bot.selfId,
  }

  return result
}

export function adaptSession(bot: FeishuBot, body: AllEvents): Session {
  const session = bot.session()
  session.selfId = bot.selfId

  switch (body.type) {
    case 'im.message.receive_v1':
      session.type = 'message'
      session.subtype = body.event.message.chat_type,
      Object.assign(session, adaptMessage(bot, body.event))
      break
  }
  return session
}

/**
 * Get ID type from id string
 *
 * @see https://open.feishu.cn/document/home/user-identity-introduction/introduction
 */
export function extractIdType(id: string): Feishu.ReceiveIdType {
  if (id.startsWith('ou')) return 'open_id'
  if (id.startsWith('on')) return 'union_id'
  if (id.startsWith('oc')) return 'chat_id'
  if (id.includes('@')) return 'email'
  return 'user_id'
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
