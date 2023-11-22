import { Context, h } from '@satorijs/satori'
import { Message } from './types'
import { DingtalkBot } from './bot'

export async function decodeMessage<C extends Context>(bot: DingtalkBot<C>, body: Message) {
  const session = bot.session()
  session.type = 'message'
  session.messageId = body.msgId
  session.guildId = body.chatbotCorpId
  session.event.user = {
    id: body.senderStaffId,
    name: body.senderNick,
  }

  if (body.conversationType === '1') {
    session.channelId = session.userId
    session.isDirect = true
  } else {
    const atUsers = body.atUsers.filter(v => v.dingtalkId !== body.chatbotUserId).map(v => h.at(v.staffId))
    session.elements = [h.at(body.robotCode), ...atUsers]
    session.channelId = body.conversationId
    session.isDirect = false
  }
  if (body.conversationTitle) {
    session.event.channel.name = body.conversationTitle
  }

  session.event.member = {
    roles: body.isAdmin ? ['admin'] : [],
  }
  session.timestamp = +body.createAt
  if (body.msgtype === 'text') {
    session.elements = [h.text(body.text.content)]
  } else if (body.msgtype === 'richText') {
    const elements: h[] = []
    for (const item of body.content.richText) {
      if (item.text) elements.push(h.text(item.text))
      if (item.downloadCode) {
        const url = await bot.downloadFile(item.downloadCode)
        elements.push(h.image(url))
      }
    }
    session.elements = elements
  } else if (body.msgtype === 'picture') {
    session.elements = [h.image(await bot.downloadFile(body.content.downloadCode))]
  } else if (body.msgtype === 'file') {
    session.elements = [h.file(await bot.downloadFile(body.content.downloadCode))]
  } else {
    return
  }
  session.content = session.elements.join('')
  return session
}
