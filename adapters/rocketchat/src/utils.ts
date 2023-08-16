import { h } from '@satorijs/satori'
import { RocketChatBot } from './bot'
import { IMessage } from './types'

export async function nicknameToUserId(bot: RocketChatBot, nickname: string) {
  /** https://developer.rocket.chat/reference/api/rest-api/endpoints/user-management/users-endpoints/get-users-info */
  const data = await bot.http.get('/api/v1/users.info', {
    params: {
      username: nickname,
    },
  })
  return data.user._id
}

export async function decodeMessage(bot: RocketChatBot, message: IMessage) {
  // @ts-ignore
  if (message.t) return
  const session = bot.session()
  session.channelId = message.rid
  session.messageId = message._id
  session.userId = message.u._id
  session.timestamp = message.ts.$date
  // @ts-ignore
  session.type = message.editedAt ? 'message-updated' : 'message'
  session.isDirect = false
  session.elements = []

  for (const item of message.md) {
    if (item.type === 'PARAGRAPH') {
      let sliced = false
      for (const [idx, child] of item.value.entries()) {
        if (child.type === 'PLAIN_TEXT') {
          session.elements.push(h.text(
            child.value.slice(sliced ? 1 : 0),
          ))
        } else if (child.type === 'MENTION_USER') {
          if (idx === 0) sliced = true
          const userId = message.mentions.find(v => v.username === child.value.value)._id
          if (userId === 'all' || userId === 'here') {
            session.elements.push(h.at({ type: userId }))
          } else {
            session.elements.push(h.at(userId))
          }
        }
      }
    }
  }

  if (message.tmid) {
    session.elements = [h.quote(message.tmid), ...session.elements]
  }

  return session
}
