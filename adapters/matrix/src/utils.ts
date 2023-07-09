import { defineProperty, segment, Session, Universal } from '@satorijs/satori'
import { MatrixBot } from './bot'
import * as Matrix from './types'

export interface AdapterConfig { }

export function adaptAuthor(bot: MatrixBot, event: Matrix.ClientEvent): Universal.Author {
  return {
    userId: event.sender,
    username: event.sender,
    isBot: !!bot.ctx.bots.find(bot => bot.userId === event.sender),
  }
}

export async function adaptMessage(bot: MatrixBot, event: Matrix.ClientEvent, result: Universal.Message = {}): Promise<Universal.Message> {
  result.subtype = 'group'
  result.messageId = event.event_id
  result.channelId = event.room_id
  result.userId = event.sender
  result.timestamp = event.origin_server_ts
  result.author = adaptAuthor(bot, event)
  const content = event.content as Matrix.M_ROOM_MESSAGE
  const reply = content['m.relates_to']?.['m.in_reply_to']
  let { body } = content
  if (reply) {
    result.quote = await bot.getMessage(event.room_id, reply.event_id)
    body = body.substring(content.body.indexOf('\n\n') + 2)
  }
  switch (content.msgtype) {
    case 'm.text':
    case 'm.emote': {
      result.content = body
      break
    }
    case 'm.image':
    case 'm.file':
    case 'm.audio':
    case 'm.video': {
      const url = bot.internal.getAssetUrl((content as any).url)
      const type = content.msgtype.substring(2)
      result.content = segment(type === 'audio' ? 'record' : type, { url }).toString()
      break
    }
    default:
      return null
  }
  // result.content is not a setter if result is a Universal.Message
  result.elements ??= segment.parse(result.content)
  return result
}

export async function adaptSession(bot: MatrixBot, event: Matrix.ClientEvent): Promise<Session> {
  const session = bot.session()
  if (event.type === 'm.room.message') {
    const content = event.content as Matrix.M_ROOM_MESSAGE
    const newContent = content['m.new_content']
    if (newContent) {
      session.type = 'message-update'
      content.body = newContent.body
      content.msgtype = newContent.msgtype
    } else {
      session.type = 'message'
    }
    if (!await adaptMessage(bot, event, session)) return null
    return session
  }
  session.userId = event.sender
  session.guildId = event.room_id
  session.channelId = event.room_id
  session.messageId = event.event_id
  session.timestamp = event.origin_server_ts
  session.author = adaptAuthor(bot, event)
  switch (event.type) {
    case 'm.room.redaction':
      session.type = 'message-delete'
      session.messageId = event.redacts
      break
    case 'm.room.member': {
      bot.syncRooms()
      const memberEvent = event.content as Matrix.M_ROOM_MEMBER
      session.targetId = (memberEvent as any).state_key
      session.operatorId = event.sender
      session.messageId = event.event_id
      if (memberEvent.reason) {
        session.content = memberEvent.reason
      }
      switch (memberEvent.membership) {
        case 'join':
          session.type = 'guild-member-added'
          break
        case 'leave':
          session.type = 'guild-member-deleted'
          break
        case 'ban':
          session.type = 'guild-member'
          session.subtype = 'ban'
          break
        case 'invite':
          if (event.state_key === bot.userId) {
            session.type = 'guild-request'
            // Use room_id instead messageId because handleGuildRequest Only passes messageId.
            // We need room_id and messageId to call getMessage and get the room_id.
            // So I decided to pass room_id directly.
            session.messageId = event.room_id
            break
          }
        // fallthrough
        default:
          session.type = event.type
      }
      break
    }
    default:
      session.type = event.type
  }
  return session
}

export async function dispatchSession(bot: MatrixBot, event: Matrix.ClientEvent) {
  const session = await adaptSession(bot, event)
  if (!session) return

  defineProperty(session, 'matrix', Object.create(bot.internal))
  Object.assign(session.matrix, event)
  bot.dispatch(session)
}
