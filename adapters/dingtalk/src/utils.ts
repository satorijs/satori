import { at, Element, file, image, text } from '@satorijs/element'
import { HTTP } from '@cordisjs/plugin-http'
import { Message } from './types'
import { DingtalkBot } from './bot'

export async function downloadFile(http: HTTP, url: string) {
  const response = await http(url)
  const data = await response.arrayBuffer()
  const type = response.headers.get('content-type') ?? 'application/octet-stream'
  const disposition = response.headers.get('content-disposition') ?? ''
  const match = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition)
  const filename = match
    ? decodeURIComponent(match[1])
    : new URL(url, 'http://localhost').pathname.split('/').pop() || 'file'
  return { type, filename, data }
}

export async function decodeMessage(bot: DingtalkBot, body: Message) {
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
    const atUsers = body.atUsers.filter(v => v.dingtalkId !== body.chatbotUserId).map(v => at(v.staffId))
    session.elements = [at(body.robotCode), ...atUsers]
    session.channelId = body.conversationId
    session.isDirect = false
  }
  if (body.conversationTitle) {
    session.event.channel.name = body.conversationTitle
  }

  session.event.member = {
    roles: body.isAdmin ? [{ id: 'admin' }] : [],
  }
  session.timestamp = +body.createAt
  if (body.msgtype === 'text') {
    session.elements = [text(body.text.content)]
  } else if (body.msgtype === 'richText') {
    const elements: Element[] = []
    for (const item of body.content.richText) {
      if (item.text) elements.push(text(item.text))
      if (item.downloadCode) {
        const url = await bot.downloadFile(item.downloadCode)
        elements.push(image(url))
      }
    }
    session.elements = elements
  } else if (body.msgtype === 'picture') {
    session.elements = [image(await bot.downloadFile(body.content.downloadCode))]
  } else if (body.msgtype === 'file') {
    session.elements = [file(await bot.downloadFile(body.content.downloadCode))]
  } else {
    return
  }
  session.content = session.elements.join('')
  return session
}
