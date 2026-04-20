import { Message } from './types'
import { WechatOfficialBot } from './bot'
import { Context } from '@satorijs/core'
import h, { audio, image, text, video } from '@satorijs/element'
import { HTTP } from '@cordisjs/plugin-http'

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

export async function decodeMessage(bot: WechatOfficialBot, message: Message) {
  const session = bot.session()
  // https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html
  session.timestamp = message.CreateTime * 1000
  session.wechatOfficial = message
  session.userId = message.FromUserName
  session.channelId = session.userId
  // session.guildId = session.userId
  session.messageId = message.MsgId
  if (message.MsgType === 'text') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [text(message.Content)]
    return session
  } else if (message.MsgType === 'image') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [image(message.PicUrl)]
    return session
  } else if (message.MsgType === 'voice') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [audio(bot.$toMediaUrl(message.MediaId))]
    // https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Get_temporary_materials.html
    return session
  } else if (message.MsgType === 'video') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [video(bot.$toMediaUrl(message.MediaId))]
    // const { video_url } = await bot.getMedia(message.MediaId)
    // session.elements = [h.video(video_url)]
    return session
  } else if (message.MsgType === 'location') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h('wechat-official:location', {
      latitude: message.Location_X,
      longitude: message.Location_Y,
      label: message.Label,
    })]
    return session
  } else if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      session.type = 'friend-added'
      return session
    } else if (message.Event === 'unsubscribe') {
      session.type = 'friend-deleted'
      return session
    }
  }
}
