import crypto from 'crypto'

import { defineProperty, h, Session, trimSlash } from '@satorijs/satori'

import { FeishuBot } from './bot'
import { AllEvents, Events, Lark, MessageContentType, MessageType } from './types'

export type Sender =
  | {
      sender_id: Lark.UserIds
      sender_type?: string
      tenant_key: string
    }
  | (Lark.UserIdentifiers & { sender_type?: string; tenant_key: string })

export function adaptSender(sender: Sender, session: Session): Session {
  let userId: string | undefined
  if ('sender_id' in sender) {
    userId = sender.sender_id.open_id
  } else {
    userId = sender.id
  }
  session.author ??= { userId }
  session.author.userId = userId
  session.userId = userId

  return session
}

export function adaptMessage(bot: FeishuBot, data: Events['im.message.receive_v1']['event'], session: Session): Session {
  const json = JSON.parse(data.message.content) as MessageContentType<MessageType>
  const assetEndpoint = trimSlash(bot.config.selfUrl ?? bot.ctx.root.config.selfUrl) + bot.config.path + '/assets'
  const content: (string | h)[] = []
  switch (data.message.message_type) {
    case 'text': {
      const text = json.text as string
      if (!data.message.mentions?.length) {
        content.push(text)
        break
      }

      // Lark's `at` Element would be `@user_id` in text
      text.split(' ').forEach((word) => {
        if (word.startsWith('@')) {
          const mention = data.message.mentions.find((mention) => mention.key === word)
          content.push(h.at(mention.id.open_id, { name: mention.name }))
        } else {
          content.push(word)
        }
      })
      break
    }
    case 'image':
      content.push(h.image(`${assetEndpoint}/image/${data.message.message_id}/${json.image_key}?self_id=${bot.selfId}`))
      break
    case 'audio':
      content.push(h.audio(`${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`))
      break
    case 'media':
      content.push(h.video(`${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`, json.image_key))
      break
    case 'file':
      content.push(h.file(`${assetEndpoint}/file/${data.message.message_id}/${json.file_key}?self_id=${bot.selfId}`))
      break
  }

  session.timestamp = +data.message.create_time
  session.messageId = data.message.message_id
  session.channelId = data.message.chat_id
  session.content = content.map((c) => c.toString()).join(' ')

  return session
}

export function adaptSession(bot: FeishuBot, body: AllEvents): Session {
  const session = bot.session()
  const internal = Object.create(bot.internal)
  Object.assign(internal, body)
  defineProperty(session, 'feishu', internal)
  defineProperty(session, 'lark', internal)

  switch (body.type) {
    case 'im.message.receive_v1':
      session.type = 'message'
      session.subtype = body.event.message.chat_type
      if (session.subtype === 'p2p') session.subtype = 'private'
      session.isDirect = session.subtype === 'private'
      adaptSender(body.event.sender, session)
      adaptMessage(bot, body.event, session)
      break
  }
  return session
}

/**
 * Get ID type from id string
 * @see https://open.larksuite.com/document/home/user-identity-introduction/introduction
 */
export function extractIdType(id: string): Lark.ReceiveIdType {
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
