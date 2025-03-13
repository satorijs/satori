import { Dict, h, Universal } from '@satorijs/core'
import { TelegramBot } from './bot'
import * as Telegram from './types'

export * from './types'

export const decodeUser = (data: Telegram.User): Universal.User => ({
  id: data.id.toString(),
  name: data.username,
  nick: data.first_name + (data.last_name ? ' ' + data.last_name : ''),
  isBot: data.is_bot,
})

export const decodeGuildMember = (data: Telegram.ChatMember): Universal.GuildMember => ({
  user: decodeUser(data.user),
  title: data['custom_title'],
})

const mediaGroupMap = new Map<string, [Date, {
  id: number
  elements: h[]
}[]]>()

export async function handleUpdate(update: Telegram.Update, bot: TelegramBot) {
  bot.logger.debug('receive %s', JSON.stringify(update))
  // Internal event: get update type from field name.
  const subtype = Object.keys(update).filter(v => v !== 'update_id')[0]
  if (subtype) {
    bot.dispatch(bot.session({
      type: 'internal',
      _type: `telegram/${subtype.replace(/_/g, '-')}`,
      _data: update[subtype],
    }))
  }

  const session = bot.session()
  session.setInternal('telegram', update)

  const message = update.message || update.edited_message || update.channel_post || update.edited_channel_post
  const isBotCommand = update.message && update.message.entities?.[0].type === 'bot_command'
  const code = message?.from?.language_code
  if (code) {
    if (code === 'zh-hans') {
      session.locales = ['zh-CN']
    } else if (code === 'zh-hant') {
      session.locales = ['zh-TW']
    } else {
      session.locales = [code.slice(0, 2)]
    }
  }

  if (isBotCommand) {
    session.type = 'interaction/command'
    await decodeMessage(bot, message, session.event.message = {}, session.event)
    // content: /command@bot ...args
    const [group] = session.content.split(' ', 1)
    const [command, username] = group.slice(1).split('@')
    if (username && username !== bot.user.name) return
    session.content = command + session.content.slice(group.length)
  } else if (message) {
    if (update.message?.media_group_id) {
      if (!mediaGroupMap.has(update.message.media_group_id)) {
        mediaGroupMap.set(update.message.media_group_id, [new Date(), []])
      }

      const [, updates] = mediaGroupMap.get(update.message.media_group_id)
      session.type = update.message || update.channel_post ? 'message' : 'message-updated'
      await decodeMessage(bot, message, session.event.message = {}, session.event)
      updates.push({
        id: update.message.message_id,
        elements: session.event.message.elements,
      })

      const thisUpdateTime = new Date()
      mediaGroupMap.set(update.message.media_group_id, [thisUpdateTime, updates])
      await new Promise(resolve => setTimeout(resolve, 1200))
      if (mediaGroupMap.get(update.message.media_group_id)[0] === thisUpdateTime) {
        mediaGroupMap.delete(update.message.media_group_id)
        // merge all messages
        session.event.message.elements = updates
          .sort((a, b) => a.id - b.id)
          .reduce((acc, cur) => acc.concat(cur.elements), [])
        session.event.message.content = session.event.message.elements.join('')
        session.event.message.id = Math.min(...updates.map(e => e.id)).toString()
        session.event._data.mediaGroup = updates.map(e => e.id)
      } else {
        // the media group is still updating
        return
      }
    } else {
      session.type = update.message || update.channel_post ? 'message' : 'message-updated'
      await decodeMessage(bot, message, session.event.message = {}, session.event)
    }
  } else if (update.chat_join_request) {
    session.timestamp = update.chat_join_request.date * 1000
    session.type = 'guild-member-request'
    session.messageId = `${update.chat_join_request.chat.id}@${update.chat_join_request.from.id}`
    // Telegram join request does not have text
    session.content = ''
    session.channelId = update.chat_join_request.chat.id.toString()
    session.guildId = session.channelId
  } else if (update.my_chat_member) {
    session.timestamp = update.my_chat_member.date * 1000
    session.messageId = `${update.my_chat_member.chat.id}@${update.my_chat_member.from.id}`
    session.content = ''
    session.channelId = update.my_chat_member.chat.id.toString()
    session.guildId = session.channelId
    if (update.my_chat_member.old_chat_member.user.id.toString() === bot.selfId) {
      if (update.my_chat_member.new_chat_member.status === 'left') {
        session.type = 'group-deleted'
      } else if (update.my_chat_member.old_chat_member.status === 'left') {
        session.type = 'group-added'
      }
    }
  } else if (update.callback_query) {
    session.type = 'interaction/button'
    session.userId = update.callback_query.from.id.toString()
    session.messageId = update.callback_query.id.toString()
    session.event.button = {
      id: update.callback_query.data,
    }
    const data = update.callback_query.message
    if (data) {
      if (data.chat.type === 'private') {
        session.event.channel = {
          id: data.chat.id.toString(),
          type: Universal.Channel.Type.DIRECT,
        }
      } else {
        session.event.guild = {
          id: data.chat.id.toString(),
          name: data.chat.title,
        }
        session.event.channel = {
          id: data.is_topic_message
            ? data.message_thread_id.toString()
            : data.chat.id.toString(),
          type: Universal.Channel.Type.TEXT,
        }
      }
    }
    await bot.internal.answerCallbackQuery({
      callback_query_id: update.callback_query.id,
    })
  }

  bot.dispatch(session)
}

export async function decodeMessage(
  bot: TelegramBot,
  data: Telegram.Message,
  message: Universal.Message,
  payload: Universal.MessageLike = message,
) {
  const parseText = (text: string | undefined, entities: Telegram.MessageEntity[]): h[] => {
    if (!text) return []
    const breakpoints = new Set<number>()
    for (const e of entities) {
      breakpoints.add(e.offset)
      breakpoints.add(e.offset + e.length)
    }

    breakpoints.add(text.length)

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\n') {
        breakpoints.add(i)
        breakpoints.add(i + 1)
      }
    }

    const obtainAttributeAtBP = (bp: number) => {
      const attr = []
      let url = null, user: Telegram.User = null
      for (const e of entities) {
        if (e.offset <= bp && e.offset + e.length > bp) {
          attr.push(e.type)

          if (e.type === 'text_link') {
            url = e.url
          } else if (e.type === 'text_mention') {
            user = e.user
          }
        }
      }

      return { attr, url, user }
    }

    const segs: h[] = []
    let start = 0
    for (const bp of Array.from(breakpoints).sort((a, b) => a - b)) {
      if (start < bp) {
        const { attr, url, user } = obtainAttributeAtBP(start)
        const content = text.slice(start, bp)
        let ele = h('text', { content })
        if (attr.includes('bold')) ele = h('b', {}, ele)
        if (attr.includes('italic')) ele = h('i', {}, ele)
        if (attr.includes('underline')) ele = h('u', {}, ele)
        if (attr.includes('strikethrough')) ele = h('s', {}, ele)
        if (attr.includes('code')) ele = h('code', {}, ele)
        if (attr.includes('pre')) ele = h('pre', {}, ele)
        if (attr.includes('spoiler')) ele = h('spl', {}, ele)
        if (attr.includes('mention')) ele = h('at', { name: content.slice(1) })
        if (url) ele = h('a', { href: url }, ele)
        if (user) ele = h('at', { id: user.id, name: user.username }, ele)
        if (content === '\n') ele = h('br')
        segs.push(ele)
      }
      start = bp
    }

    return segs
  }

  const segments: h[] = []
  // topic messages are reply chains, if a message is forum_topic_created, the session shoudn't have a quote.
  if (data.reply_to_message && !(data.is_topic_message && data.reply_to_message.forum_topic_created)) {
    await decodeMessage(bot, data.reply_to_message, message.quote = {}, null)
    message.quote.user = decodeUser(data.reply_to_message.from)
  }

  // make sure text comes first so that commands can be triggered
  const msgText = data.text || data.caption
  segments.push(...parseText(msgText, [...(data.entities ?? []), ...(data.caption_entities ?? [])]))

  if (data.caption) {
    // add a space to separate caption from media
    segments.push(h('text', { content: ' ' }))
  }

  const addResource = async (type: string, data: Telegram.Animation | Telegram.Video | Telegram.Document | Telegram.Voice) => {
    const attrs: Dict<string> = await bot.$getFileFromId(data.file_id)
    if (data['file_name']) {
      attrs.filename = data['file_name']
    }
    segments.push(h(type, attrs))
  }

  if (data.location) {
    segments.push(h('location', { lat: data.location.latitude, lon: data.location.longitude }))
  } else if (data.photo) {
    const photo = data.photo.sort((s1, s2) => s2.file_size - s1.file_size)[0]
    segments.push(h('img', await bot.$getFileFromId(photo.file_id)))
  } else if (data.sticker) {
    // TODO: Convert tgs to gif
    // https://github.com/ed-asriyan/tgs-to-gif
    // Currently use thumb only
    try {
      const file = await bot.internal.getFile({ file_id: data.sticker.file_id })
      if (file.file_path.endsWith('.tgs')) {
        throw new Error('tgs is not supported now')
      }
      segments.push(h('img', await bot.$getFileFromPath(file.file_path, {
        id: data.sticker.file_id,
        uniqueId: data.sticker.file_unique_id,
        setName: data.sticker.set_name,
      })))
    } catch (e) {
      bot.logger.warn('get file error', e)
      segments.push(h('text', { content: `[${data.sticker.set_name || 'sticker'} ${data.sticker.emoji || ''}]` }))
    }
  } else if (data.voice) {
    await addResource('audio', data.voice)
  } else if (data.animation) {
    await addResource('img', data.animation)
  } else if (data.video) {
    await addResource('video', data.video)
  } else if (data.document) {
    await addResource('file', data.document)
  } else if (data.audio) {
    await addResource('audio', data.audio)
  }

  message.elements = segments
  message.content = segments.join('')
  message.id = message.messageId = data.message_id.toString()

  if (!payload) return
  payload.timestamp = data.date * 1000
  payload.user = data.from ? decodeUser(data.from) : {} as any
  if (data.chat.type === 'private') {
    payload.channel = {
      id: data.chat.id.toString(),
      type: Universal.Channel.Type.DIRECT,
    }
  } else {
    payload.guild = {
      id: data.chat.id.toString(),
      name: data.chat.title,
    }
    payload.member = {}
    payload.channel = {
      id: data.is_topic_message
        ? data.message_thread_id.toString()
        : data.chat.id.toString(),
      type: Universal.Channel.Type.TEXT,
    }
  }
}
