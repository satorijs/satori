import { h, Session } from '@satorijs/satori'
import { LineBot } from './bot'
import { EventMessage, WebhookEvent } from './types'
// import jose from 'jose'

export async function adaptMessage(bot: LineBot, message: EventMessage) {
  const result: h[] = []
  if (message.type === 'text') {
    const splits: number[] = []
    let nowPos = 0
    const finalLen = message.text.length
    for (const emoji of (message.emojis ?? [])) {
      splits.push(emoji.index)
    }
    for (const mention of (message.mention?.mentionees ?? [])) {
      splits.push(mention.index)
    }
    if (splits.length === 0) return [h.text(message.text)]
    do {
      const nextPos = splits.shift() ?? finalLen
      if (nextPos !== nowPos) {
        result.push(h.text(message.text.substring(nowPos, nextPos)))
        nowPos = nextPos
      }
      if (message.emojis) {
        const emoji = message.emojis.find(v => v.index === nextPos)
        if (emoji) {
          result.push(h('face', { id: `e:${emoji.productId}:${emoji.emojiId}`, platform: bot.platform }))
          nowPos = nowPos + emoji.length
        }
      }
      if (message.mention) {
        const mention = message.mention.mentionees.find(v => v.index === nextPos)
        if (mention) {
          if (mention.type === 'all') {
            result.push(h('at', { type: 'all' }))
          } else {
            result.push(h('at', { name: message.text.slice(nowPos + 1, nowPos + mention.length) }))
          }
          nowPos = nowPos + mention.length
        }
      }
    } while (nowPos !== finalLen)
  } else if (message.type === 'image') {
    if (message.contentProvider.type === 'line') {
      return [h.image(`${bot.ctx.root.config.selfUrl}/line/assets/${bot.selfId}/${message.id}`)]
    } else {
      return [h.image(message.contentProvider.originalContentUrl)]
    }
  } else if (message.type === 'video') {
    if (message.contentProvider.type === 'line') {
      return [h.video(`${bot.ctx.root.config.selfUrl}/line/assets/${bot.selfId}/${message.id}`)]
    } else {
      return [h.video(message.contentProvider.originalContentUrl)]
    }
  } else if (message.type === 'sticker') {
    return [h('face', { type: 'sticker', id: `s:${message.packageId}:${message.stickerId}`, platform: bot.platform })]
  } else if (message.type === 'file') {
    return [h.file(`${bot.ctx.root.config.selfUrl}/line/assets/${bot.selfId}/${message.id}`)]
  }
  return result
}

export async function adaptSessions(bot: LineBot, body: WebhookEvent) {
  const result: Partial<Session>[] = []
  const session = bot.session()
  session.timestamp = +body.timestamp
  if (body.source.type === 'user') {
    session.userId = body.source.userId
    session.channelId = body.source.userId // for message encoder
  } else if (body.source.type === 'group') {
    session.guildId = body.source.groupId
    session.channelId = body.source.groupId
    session.userId = body.source.userId
  } else if (body.source.type === 'room') {
    session.guildId = body.source.roomId
    session.channelId = body.source.roomId
    session.userId = body.source.userId
  }
  // https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects
  if (body.type === 'message') {
    session.type = 'message'
    session.isDirect = body.source.type === 'user'
    session.messageId = body.message.id
    session.elements = await adaptMessage(bot, body.message)
    session.content = session.elements.join('')
  } else if (body.type === 'memberJoined') {
    session.type = 'guild-member-added'
    for (const user of body.joined.members) {
      const tmpSession = Object.assign({}, session)
      tmpSession.userId = user.userId
      result.push(tmpSession)
    }
  } else if (body.type === 'memberLeft') {
    session.type = 'guild-member-deleted'
    for (const user of body.left.members) {
      const tmpSession = Object.assign({}, session)
      tmpSession.userId = user.userId
      result.push(tmpSession)
    }
  } else if (body.type === 'follow') {
    session.type = 'friend-added'
    session.userId = body.source.userId
  } else if (body.type === 'unfollow') {
    session.type = 'friend-deleted'
    session.userId = body.source.userId
  } else if (body.type === 'unsend') {
    session.type = 'message-deleted'
    session.messageId = body.unsend.messageId
  } else if (body.type === 'join') {
    session.type = 'guild-added'
  } else if (body.type === 'leave') {
    session.type = 'guild-deleted'
  }
  if (session.type) result.push(session)
  return result
}

// export async function getChannelToken(kid: string, privKey: string, channelId: string) {
//   const jws = await new jose.CompactSign(
//     new TextEncoder().encode(JSON.stringify({
//       iss: channelId,
//       sub: channelId,
//       aud: 'https://api.line.me/',
//       exp: Math.floor(Date.now() / 1000) + (60 * 60),
//       token_exp: 60 * 60
//     })),
//   )
//     .setProtectedHeader({ alg: 'RS256', type: 'JWT', kid })
//     .sign(await jose.importJWK(JSON.parse(privKey)))
//   return jws
// }
