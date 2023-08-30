import { Message } from './types'
import { WecomBot } from './bot'
import { h } from '@satorijs/satori'

export async function decodeMessage(bot: WecomBot, message: Message) {
  const session = bot.session()
  session.timestamp = message.CreateTime * 1000
  // session.wechatOfficial = message
  session.guildId = bot.config.corpId
  session.userId = message.FromUserName
  session.author = {
    userId: message.FromUserName,
  }
  // session.channelId = session.userId
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
    session.elements = [h.audio(`${bot.ctx.root.config.selfUrl}/wecom/assets/${bot.selfId}/${message.MediaId}`)]
    // https://developer.work.weixin.qq.com/document/path/90254
    return session
  } else if (message.MsgType === 'video') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.video(`${bot.ctx.root.config.selfUrl}/wecom/assets/${bot.selfId}/${message.MediaId}`)]
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
