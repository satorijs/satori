import { Message } from './types'
import { WecomBot } from './bot'
import { Context, h } from '@satorijs/core'

export async function decodeMessage<C extends Context>(bot: WecomBot<C>, message: Message) {
  const session = bot.session()
  session.timestamp = message.CreateTime * 1000
  // session.wechatOfficial = message
  session.guildId = bot.config.corpId
  session.userId = message.FromUserName
  session.channelId = session.userId
  // session.guildId = session.userId
  session.messageId = message.MsgId
  if (message.MsgType === 'text') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.text(message.Content)]
    return session
  } else if (message.MsgType === 'image') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.image(message.PicUrl)]
    return session
  } else if (message.MsgType === 'voice') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.audio(bot.$toMediaUrl(message.MediaId))]
    // https://developer.work.weixin.qq.com/document/path/90254
    return session
  } else if (message.MsgType === 'video') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.video(bot.$toMediaUrl(message.MediaId))]
    return session
  } else if (message.MsgType === 'location') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h('wecom:location', {
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
