import { h, Session } from '@satorijs/satori'
import { Message } from './types';
import { DingtalkBot } from './bot';

export async function decodeMessage(bot: DingtalkBot, body: Message): Promise<Session> {
  const session = bot.session()
  session.type = "message"
  session.messageId = body.msgId
  session.isDirect = body.conversationType === "1"
  session.guildId = body.chatbotCorpId

  if (body.conversationTitle) session.channelName = body.conversationTitle
  session.userId = body.senderStaffId
  session.author = {
    userId: body.senderStaffId,
    username: body.senderNick,
    roles: body.isAdmin ? ['admin'] : [],
  }
  session.timestamp = Number(body.createAt)
  if (body.msgtype === "text") {
    session.elements = [h.text(body.text.content)]
  } else if (body.msgtype === 'richText') {
    let elements: h[] = []
    for (const item of body.content.richText) {
      if (item.text) elements.push(h.text(item.text))
      if (item.downloadCode) {
        const url = await bot.downloadFile(item.downloadCode)
        elements.push(h.image(url))
      }
    }
    session.elements = elements
  } else {
    return
  }
  if (!session.isDirect) {
    // group message
    session.elements = [h.at(body.robotCode), ...session.elements]
    session.channelId = body.conversationId
  } else {
    session.channelId = session.userId
  }
  return session
}
