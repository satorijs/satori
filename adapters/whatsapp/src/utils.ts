import { h, Session } from '@satorijs/satori'
import { WhatsAppBot } from './bot'
import { Entry } from './types'

export async function decodeMessage(bot: WhatsAppBot, entry: Entry) {
  const result: Session[] = []
  for (const change of entry.changes) {
    if (change.field === 'messages' && change.value.messages?.length) {
      const session = bot.session()
      session.type = 'message'
      session.isDirect = true
      const message = change.value.messages[0]
      session.channelId = message.from
      session.guildId = message.from
      session.messageId = message.id
      session.author = {
        userId: message.from,
        username: change.value.contacts[0].profile.name,
      }
      session.userId = message.from
      session.timestamp = parseInt(message.timestamp) * 1000

      if (message.context) {
        session.quote = {
          messageId: message.context.id,
          channelId: message.context.from,
          userId: message.context.from,
          content: '',
        }
      }

      if (message.type === 'text') {
        session.elements = [h.text(message.text.body)]
      } else if (['video', 'audio', 'image', 'document'].includes(message.type)) {
        const elements = []
        let type = message.type as string
        if (message.type === 'document') type = 'file'
        const resource = message[message.type]
        if (resource.caption) elements.push(h.text(message[message.type].caption))
        elements.push(h[type](`${bot.ctx.root.config.selfUrl}/whatsapp/assets/${bot.selfId}/${resource.id}`))
        session.elements = elements
      } else if (message.type === 'sticker') {
        session.elements = [h('face', {
          id: /* (message.sticker.animated ? 'a:' : '') + */message.sticker.id,
          platform: 'whatsapp',
        }, [
          h.image(`${bot.ctx.root.config.selfUrl}/whatsapp/assets/${bot.selfId}/${message.sticker.id}`),
        ])]
      } else {
        continue
      }
      session.content = session.elements.join('')
      result.push(session)
    }
  }
  return result
}
