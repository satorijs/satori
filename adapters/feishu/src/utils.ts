import crypto from 'crypto'

import { Context, Message, Session } from '@satorijs/satori'

import { FeishuBot } from './bot'
import { Event } from './types'

export function adaptMessage(data: Event<'im.message.receive_v1'>['event']): Message {
  const result: Message = {
    channelId: data.message.chat_id,
    content: data.message.content,
  }

  return result
}

export async function adaptSession(bot: FeishuBot, body: Event): Promise<Session<Context>> {
  const session = bot.session()
  session.selfId = bot.selfId

  if (body.header.event_type === 'im.message.receive_v1') {
    session.type = 'message'
    subtype: body.event.message.chat_type,
    Object.assign(session, adaptMessage(body.event))
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
