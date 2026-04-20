import { Session, Universal } from '@satorijs/core'
import h, { audio, file, image, text, video } from '@satorijs/element'
import { HTTP } from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-server'
import { WhatsAppBot } from './bot'
import { Entry } from './types'

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

export async function decodeSession(bot: WhatsAppBot, entry: Entry) {
  const result: Session[] = []
  for (const change of entry.changes) {
    bot.dispatch(bot.session({
      type: 'internal',
      _type: 'whatsapp/' + change.field,
      _data: change.value,
    }))
    if (change.field === 'messages' && change.value.messages?.length) {
      const session = bot.session()
      session.type = 'message'
      session.setInternal('whatsapp', change.value)
      session.isDirect = true
      const message = change.value.messages[0]
      session.channelId = message.from
      session.guildId = message.from
      session.messageId = message.id
      session.event.user = {
        id: message.from,
        name: change.value.contacts[0].profile.name,
      }
      session.timestamp = parseInt(message.timestamp) * 1000

      if (message.context) {
        session.quote = {
          id: message.context.id,
          channel: { id: message.context.from, type: Universal.Channel.Type.DIRECT },
          user: { id: message.context.from },
          content: '',
        }
      }

      if (message.type === 'text') {
        session.elements = [text(message.text.body)]
      } else if (['video', 'audio', 'image', 'document'].includes(message.type)) {
        const elements = []
        let type = message.type as string
        if (message.type === 'document') type = 'file'
        const resource = message[message.type]
        if (resource.caption) elements.push(text(message[message.type].caption))
        const ctor = ({ video, audio, image, file } as Record<string, typeof image>)[type]
        elements.push(ctor(`${bot.ctx.server.config.selfUrl}/whatsapp/assets/${bot.selfId}/${resource.id}`))
        session.elements = elements
      } else if (message.type === 'sticker') {
        session.elements = [h('face', {
          id: /* (message.sticker.animated ? 'a:' : '') + */message.sticker.id,
          platform: 'whatsapp',
        }, [
          image(`${bot.ctx.server.config.selfUrl}/whatsapp/assets/${bot.selfId}/${message.sticker.id}`),
        ])]
      } else if (message.type === 'location') {
        session.elements = [h('whatsapp:location', {
          latitude: message.location.latitude,
          longitude: message.location.longitude,
        })]
      } else if (message.type === 'interactive' && message.interactive.type === 'button_reply') {
        session.type = 'interaction/button'
        session.event.button = {
          id: message.interactive.button_reply.id,
        }
      } else {
        continue
      }
      session.content = session.elements.join('')
      result.push(session)
    }
  }
  return result
}
