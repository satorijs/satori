import crypto from 'crypto'
import { Context, h, Session, trimSlash, Universal } from '@satorijs/core'
import { LarkBot } from './bot'
import { EventPayload, Events, GetImChatResponse, Lark } from './types'

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
  session.userId = userId
  return session
}

export async function adaptMessage(bot: LarkBot, data: Events['im.message.receive_v1'], session: Session, details = true): Promise<Session> {
  const json = JSON.parse(data.message.content)
  const assetEndpoint = trimSlash(bot.config.selfUrl ?? bot.ctx.server.config.selfUrl) + bot.config.path + '/assets'
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
  session.guildId = data.message.chat_id
  session.content = content.map((c) => c.toString()).join(' ')

  if (data.message.parent_id && details) {
    session.quote = await bot.getMessage(session.channelId, data.message.parent_id, false)
  }
  return session
}

export async function adaptSession<C extends Context>(bot: LarkBot<C>, body: EventPayload) {
  const session = bot.session()
  session.setInternal('lark', body)

  switch (body.type) {
    case 'im.message.receive_v1':
      session.type = 'message'
      session.subtype = body.event.message.chat_type
      if (session.subtype === 'p2p') session.subtype = 'private'
      session.isDirect = session.subtype === 'private'
      adaptSender(body.event.sender, session)
      await adaptMessage(bot, body.event, session)
      break
    case 'application.bot.menu_v6':
      if (body.event.event_key.startsWith('command:')) {
        session.type = 'interaction/command'
        session.content = body.event.event_key.slice(8)
        session.channelId = body.event.operator.operator_id.open_id
        session.userId = body.event.operator.operator_id.open_id
        session.isDirect = true
      }
      break
    case 'card.action.trigger':
      if (body.event.action.value?._satori_type === 'command') {
        session.type = 'interaction/command'
        let content = body.event.action.value.content
        const args = [], options = Object.create(null)
        for (const [key, value] of Object.entries(body.event.action.form_value ?? {})) {
          if (+key * 0 === 0) {
            args[+key] = value
          } else {
            options[key] = value
          }
        }
        for (let i = 0; i < args.length; ++i) {
          if (i in args) {
            content += ` ${args[i]}`
          } else {
            content += ` ''`
          }
        }
        for (const [key, value] of Object.entries(options)) {
          content += ` --${key} ${value}`
        }
        if (body.event.action.input_value) {
          content += ` ${body.event.action.input_value}`
        }
        session.content = content
        session.messageId = body.event.context.open_message_id
        session.channelId = body.event.context.open_chat_id
        session.guildId = body.event.context.open_chat_id
        session.userId = body.event.operator.open_id
        const chat = await bot.internal.getImChat(session.channelId)
        // TODO: add channel data
        session.isDirect = chat.chat_mode === 'p2p'
      }
      break
  }
  return session
}

// TODO: This function has many duplicated code with `adaptMessage`, should refactor them
export async function decodeMessage(bot: LarkBot, body: Lark.Message, details = true): Promise<Universal.Message> {
  const json = JSON.parse(body.body.content)
  const assetEndpoint = trimSlash(bot.config.selfUrl ?? bot.ctx.server.config.selfUrl) + bot.config.path + '/assets'
  const content: h[] = []
  switch (body.msg_type) {
    case 'text': {
      const text = json.text as string
      if (!body.mentions?.length) {
        content.push(h.text(text))
        break
      }

      // Lark's `at` Element would be `@user_id` in text
      text.split(' ').forEach((word) => {
        if (word.startsWith('@')) {
          const mention = body.mentions.find((mention) => mention.key === word)
          content.push(h.at(mention.id, { name: mention.name }))
        } else {
          content.push(h.text(word))
        }
      })
      break
    }
    case 'image':
      content.push(h.image(`${assetEndpoint}/image/${body.message_id}/${json.image_key}?self_id=${bot.selfId}`))
      break
    case 'audio':
      content.push(h.audio(`${assetEndpoint}/file/${body.message_id}/${json.file_key}?self_id=${bot.selfId}`))
      break
    case 'media':
      content.push(h.video(`${assetEndpoint}/file/${body.message_id}/${json.file_key}?self_id=${bot.selfId}`, json.image_key))
      break
    case 'file':
      content.push(h.file(`${assetEndpoint}/file/${body.message_id}/${json.file_key}?self_id=${bot.selfId}`))
      break
  }

  return {
    timestamp: +body.update_time,
    createdAt: +body.create_time,
    updatedAt: +body.update_time,
    id: body.message_id,
    messageId: body.message_id,
    user: {
      id: body.sender.id,
    },
    channel: {
      id: body.chat_id,
      type: Universal.Channel.Type.TEXT,
    },
    content: content.map((c) => c.toString()).join(' '),
    elements: content,
    quote: (body.upper_message_id && details) ? await bot.getMessage(body.chat_id, body.upper_message_id, false) : undefined,
  }
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

export function decodeChannel(channelId: string, guild: GetImChatResponse): Universal.Channel {
  return {
    id: channelId,
    type: Universal.Channel.Type.TEXT,
    name: guild.name,
    parentId: channelId,
  }
}

export function decodeGuild(guild: Lark.ListChat): Universal.Guild {
  return {
    id: guild.chat_id,
    name: guild.name,
    avatar: guild.avatar,
  }
}

export function decodeUser(user: Lark.User): Universal.User {
  return {
    id: user.open_id,
    avatar: user.avatar?.avatar_origin,
    isBot: false,
    name: user.name,
  }
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
