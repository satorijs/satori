import { segment, Session, Universal } from '@satorijs/core'
import { MatrixBot } from './bot'
import * as Matrix from './types'
import { INode, ITag, parse, SyntaxKind } from 'html5parser'

export const decodeUser = (data: Matrix.Profile, id: string): Universal.User => ({
  id,
  name: data.displayname,
  avatar: data.avatar_url,
})

export async function adaptMessage(
  bot: MatrixBot,
  data: Matrix.ClientEvent,
  message: Universal.Message = {},
  payload: Universal.MessageLike = message,
): Promise<Universal.Message> {
  message.id = message.messageId = data.event_id
  const content = data.content as Matrix.M_ROOM_MESSAGE
  const reply = content['m.relates_to']?.['m.in_reply_to']
  if (reply) {
    message.quote = await bot.getMessage(data.room_id, reply.event_id)
  }
  switch (content.msgtype) {
    case 'm.text':
    case 'm.emote':
    case 'm.notice': {
      message.content = parsseContent(bot, content)
      break
    }
    case 'm.image':
    case 'm.file':
    case 'm.audio':
    case 'm.video': {
      const src = bot.internal.getAssetUrl((content as any).url)
      const type = content.msgtype.substring(2)
      message.content = segment(type === 'audio' ? 'record' : type === 'image' ? 'img' : type, { src }).toString()
      break
    }
    default:
      return null
  }
  // result.content is not a setter if result is a Universal.Message
  message.elements ??= segment.parse(message.content)

  if (!payload) return message
  payload.timestamp = data.origin_server_ts
  payload.channel = {
    id: data.room_id,
    type: Universal.Channel.Type.TEXT,
  }
  payload.guild = {
    id: data.room_id,
  }
  payload.user = {
    id: data.sender,
  }
  payload.member = {}
  return message
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
    if (!await adaptMessage(bot, event, session.event.message = {}, session.event)) return null
    return session
  }
  session.userId = event.sender
  session.guildId = event.room_id
  session.channelId = event.room_id
  session.messageId = event.event_id
  session.timestamp = event.origin_server_ts
  session.isDirect = false
  switch (event.type) {
    case 'm.room.redaction': {
      session.type = 'message-deleted'
      session.subtype = 'group'
      session.messageId = event.redacts
      break
    }
    case 'm.reaction': {
      const content = event.content as Matrix.M_REACTION
      session.type = 'reaction-added'
      session.subtype = 'group'
      session.content = content['m.relates_to'].key
      session.messageId = content['m.relates_to'].event_id
      break
    }
    case 'm.room.member': {
      bot.syncRooms()
      const memberEvent = event.content as Matrix.M_ROOM_MEMBER
      session['targetId'] = (memberEvent as any).state_key
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
  session.setInternal('matrix', event)
  bot.dispatch(session)
}

function parsseContent(bot: MatrixBot, content: Matrix.M_ROOM_MESSAGE) {
  if (content['format'] !== 'org.matrix.custom.html') {
    return content.body
  }
  const { formatted_body } = content as Matrix.M_TEXT
  let result = ''

  ;(function visit(nodes: INode[]) {
    if (!nodes) return
    for (const node of nodes) {
      if (node.type === SyntaxKind.Text) {
        result += segment.escape(decodeHE(node.value).trim() || '')
      } else {
        function tag(name: string) {
          result += `<${name}>`
          visit((node as ITag).body)
          result += `</${name}>`
        }
        switch (node.name) {
          case 'del': tag('s'); break
          case 'p': tag('p'); break
          case 'b': tag('b'); break
          case 'i': tag('i'); break
          case 'u': tag('u'); break
          case 'strong': tag('b'); break
          case 'em': tag('em'); break
          case 'strike': tag('s'); break
          case 'code': tag('code'); break
          case 'sup': tag('sup'); break
          case 'sub': tag('sub'); break
          case 'a': {
            const href = node.attributeMap.href?.value.value || '#'
            if (href.startsWith('https://matrix.to/#/@')) {
              result += `<at id="${href.substring(20)}">`
              visit(node.body)
              result += '</at>'
              break
            } else if (href.startsWith('https://matrix.to/#/#')) {
              result += `<sharp id="${href.substring(20)}">`
              visit(node.body)
              result += '</sharp>'
              break
            }
            result += `<a href="${href}">`
            visit(node.body)
            result += '</a>'
            break
          }
          case 'li': {
            visit(node.body)
            result += '\n'
            break
          }
          case 'hr': {
            result += '\n\n'
            break
          }
          case 'br': {
            result += '\n'
            break
          }
          case 'img': {
            const src = node.attributeMap.src?.value.value
            const alt = node.attributeMap.src?.value.value
            if (!src) {
              if (alt) result += alt
              break
            }
            if (src.match(/^(data|https?):/)) {
              result += `<img src="${src}"/>`
              break
            } else if (src.startsWith('mxc://')) {
              result += `<img src="${bot.internal.getAssetUrl(src)}">`
              break
            }
            break
          }
          case 'blockquote': {
            result += '> '
            visit(node.body)
            break
          }
          case 'mx-reply':
            // ignore
            break
          // div table thead tbody tr th td caption pre span
          // details summary ul ol font h1 h2 h3 h4 h5 h6
          default:
            visit(node.body)
        }
      }
    }
  })(parse(formatted_body, { setAttributeMap: true }))
  return result
}

// this is not a full list
const entities = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: '\'',
}

function decodeHE(text: string) {
  const regex = /&(([a-z0-9]+)|(#[0-9]{1,6})|(#x[0-9a-fA-F]{1,6}));/ig
  return text.replace(regex, (_1, _2, name: string, dec: string, hex: string) => {
    if (name) {
      if (name in entities) {
        return entities[name]
      } else {
        return text
      }
    } else if (dec) {
      return String.fromCharCode(+dec.substring(1))
    } else if (hex) {
      return String.fromCharCode(parseInt(hex.substring(2), 16))
    }
  })
}
