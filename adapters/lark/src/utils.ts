import crypto from 'crypto'
import { Context, h, pick, Session, Universal } from '@satorijs/core'
import { LarkBot } from './bot'
import { Im, ListChat, Message, User } from './types'
import { MessageContent } from './content'
import { hyphenate } from 'cosmokit'

export interface EventHeader<K extends keyof Events> {
  event_id: string
  event_type: K
  create_time: string
  token: string
  app_id: string
  tenant_key: string
}

export interface Events {
  /**
   * Receive message event.
   * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/receive
   */
  'im.message.receive_v1': {
    sender: {
      sender_id: UserIds
      sender_type?: string
      tenant_key: string
    }
    message: {
      message_id: string
      root_id: string
      parent_id: string
      thread_id: string
      create_time: string
      chat_id: string
      chat_type: string
      message_type: keyof MessageContent
      content: string
      mentions: {
        key: string
        id: UserIds
        name: string
        tenant_key: string
      }[]
    }
  }
  /**
   * Message read event.
   * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/message_read
   */
  'im.message.message_read_v1': {
    reader: {
      reader_id: UserIds
      read_time: string
      tenant_key: string
    }
    message_id_list: string[]
  }
  /**
   * Message card callback event.
   * @see https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/card-callback-communication
   */
  'card.action.trigger': {
    operator: {
      tenant_key: string
      user_id: string
      union_id: string
      open_id: string
    }
    token: string
    action: {
      value: any
      tag: string
      timezone?: string
      name?: string
      form_value?: any
      input_value?: string
      option?: string
      options?: string[]
      checked?: boolean
    }
    host: string
    /** 卡片分发类型，固定取值为 url_preview，表示链接预览卡片。仅链接预览卡片有此字段。 */
    delivery_type?: 'url_preview'
    context: {
      url?: string
      preview_token?: string
      open_message_id: string
      open_chat_id: string
    }
  }
  /**
   * 机器人自定义菜单事件
   * @see https://open.feishu.cn/document/client-docs/bot-v3/events/menu
   */
  'application.bot.menu_v6': {
    operator: {
      operator_name: string
      operator_id: {
        union_id: string
        user_id: string
        open_id: string
      }
    }
    event_key: string
    timestamp: number
  }
}

// In fact, this is the 2.0 version of the event sent by Lark.
// And only the 2.0 version has the `schema` field.
export type EventPayload = {
  [K in keyof Events]: {
    schema: '2.0'
    // special added field for TypeScript
    type: K
    header: EventHeader<K>
    event: Events[K]
  }
}[keyof Events]

/**
 * A user in Lark has several different IDs.
 * @see https://open.larksuite.com/document/home/user-identity-introduction/introduction
 */
export interface UserIds {
  union_id: string
  /** *user_id* only available when the app has permissions granted by the administrator */
  user_id?: string
  open_id: string
}

/**
 * Identify a user in Lark.
 * This behaves like {@link UserIds}, but it only contains *open_id*.
 * (i.e. the id_type is always `open_id`)
 */
export interface UserIdentifiers {
  id: string
  id_type: string
}

export type UserIdType = 'union_id' | 'user_id' | 'open_id'
/**
 * The id type when specify a receiver, would be used in the request query.
 *
 * NOTE: we always use **open_id** to identify a user, use **chat_id** to identify a channel.
 * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
 */
export type ReceiveIdType = UserIdType | 'email' | 'chat_id'

export type DepartmentIdType = 'department_id' | 'open_department_id'

export type Sender =
  | {
    sender_id: UserIds
    sender_type?: string
    tenant_key: string
  }
  | (UserIdentifiers & { sender_type?: string; tenant_key: string })

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

export async function adaptMessage<C extends Context = Context>(
  bot: LarkBot<C>,
  data: Events['im.message.receive_v1'],
  session: Session,
  details = true,
): Promise<Session> {
  const json = JSON.parse(data.message.content)
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
          const mention = data.message.mentions.find((mention) => mention.key === word)!
          if (mention) {
            content.push(h.at(mention.id.open_id, { name: mention.name }))
            return
          }
        }
        content.push(word)
      })
      break
    }
    case 'image':
      content.push(h.image(bot.getResourceUrl('image', data.message.message_id, json.image_key)))
      break
    case 'audio':
      content.push(h.audio(bot.getResourceUrl('file', data.message.message_id, json.file_key)))
      break
    case 'media':
      content.push(h.video(bot.getResourceUrl('file', data.message.message_id, json.file_key), {
        poster: json.image_key,
      }))
      break
    case 'file':
      content.push(h.file(bot.getResourceUrl('file', data.message.message_id, json.file_key)))
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
  session.event.referrer = {
    type: body.type,
    event: {},
  }

  switch (body.type) {
    case 'im.message.receive_v1':
      session.event.referrer.event.message = pick(body.event.message, ['message_id', 'thread_id'])
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
      session.event.referrer.event.context = pick(body.event.context, ['open_message_id'])
      if (body.event.action.value?._satori_type === 'command') {
        session.type = 'interaction/command'
        let content = body.event.action.value.content
        const args: any[] = [], options = Object.create(null)
        const setOption = (key: string, value: any) => {
          if (key in options) {
            options[key] += ',' + value
          } else {
            options[key] = value
          }
        }
        for (const [key, value] of Object.entries(body.event.action.form_value ?? {})) {
          if (key.startsWith('@@')) {
            if (value === false) continue
            args.push(key.slice(2))
          } else if (key.startsWith('@')) {
            if (value === false) continue
            const [_key] = key.slice(1).split('=', 1)
            setOption(_key, key.slice(2 + _key.length))
          } else if (+key * 0 === 0) {
            args[+key] = value
          } else {
            setOption(key, value)
          }
        }
        const toArg = (value: any) => {
          if (typeof value === 'string') {
            return `'${value}'`
          } else { // number, boolean
            return value
          }
        }
        for (let i = 0; i < args.length; ++i) {
          content += ` ${toArg(args[i])}`
        }
        for (const [key, value] of Object.entries(options)) {
          if (value === true) {
            content += ` --${hyphenate(key)} 1`
          } else if (value === false) {
            content += ` --${hyphenate(key)} 0`
          } else {
            content += ` --${hyphenate(key)} ${toArg(value)}`
          }
        }
        if (body.event.action.input_value) {
          content += ` ${toArg(body.event.action.input_value)}`
        }
        session.content = content
        session.messageId = body.event.context.open_message_id
        session.channelId = body.event.context.open_chat_id
        session.guildId = body.event.context.open_chat_id
        session.userId = body.event.operator.open_id
        const chat = await bot.internal.im.chat.get(session.channelId)
        // TODO: add channel data
        session.isDirect = chat.chat_mode === 'p2p'
      }
      break
  }
  return session
}

// TODO: This function has many duplicated code with `adaptMessage`, should refactor them
export async function decodeMessage<C extends Context = Context>(bot: LarkBot<C>, body: Message, details = true): Promise<Universal.Message> {
  const json = JSON.parse(body.body!.content)
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
          const mention = body.mentions!.find((mention) => mention.key === word)!
          if (mention) {
            content.push(h.at(mention.id, { name: mention.name }))
            return
          }
        }
        content.push(h.text(word))
      })
      break
    }
    case 'image':
      content.push(h.image(bot.getResourceUrl('image', body.message_id!, json.image_key)))
      break
    case 'audio':
      content.push(h.audio(bot.getResourceUrl('file', body.message_id!, json.file_key)))
      break
    case 'media':
      content.push(h.video(bot.getResourceUrl('file', body.message_id!, json.file_key), {
        poster: json.image_key,
      }))
      break
    case 'file':
      content.push(h.file(bot.getResourceUrl('file', body.message_id!, json.file_key)))
      break
  }

  return {
    timestamp: +body.update_time!,
    createdAt: +body.create_time!,
    updatedAt: +body.update_time!,
    id: body.message_id,
    messageId: body.message_id,
    user: {
      id: body.sender!.id,
    },
    channel: {
      id: body.chat_id!,
      type: Universal.Channel.Type.TEXT,
    },
    content: content.map((c) => c.toString()).join(' '),
    elements: content,
    quote: (body.upper_message_id && details) ? await bot.getMessage(body.chat_id!, body.upper_message_id, false) : undefined,
  }
}

/**
 * Get ID type from id string
 * @see https://open.larksuite.com/document/home/user-identity-introduction/introduction
 */
export function extractIdType(id: string): ReceiveIdType {
  if (id.startsWith('ou')) return 'open_id'
  if (id.startsWith('on')) return 'union_id'
  if (id.startsWith('oc')) return 'chat_id'
  if (id.includes('@')) return 'email'
  return 'user_id'
}

export function decodeChannel(channelId: string, guild: Im.Chat.GetResponse): Universal.Channel {
  return {
    id: channelId,
    type: Universal.Channel.Type.TEXT,
    name: guild.name,
    parentId: channelId,
  }
}

export function decodeGuild(guild: ListChat): Universal.Guild {
  return {
    id: guild.chat_id!,
    name: guild.name,
    avatar: guild.avatar,
  }
}

export function decodeUser(user: User): Universal.User {
  return {
    id: user.open_id!,
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
