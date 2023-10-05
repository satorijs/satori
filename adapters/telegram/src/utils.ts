import { Dict, h, Logger, Universal } from '@satorijs/satori'
import { TelegramBot } from './bot'
import * as Telegram from './types'

export * from './types'

const logger = new Logger('telegram')

export const decodeUser = (data: Telegram.User): Universal.User => ({
  id: data.id.toString(),
  name: data.username,
  nickname: data.first_name + (data.last_name ? ' ' + data.last_name : ''),
  isBot: data.is_bot,
  userId: data.id.toString(),
  username: data.username,
})

export const decodeGuildMember = (data: Telegram.ChatMember): Universal.GuildMember => ({
  user: decodeUser(data.user),
  title: data['custom_title'],
})

export async function handleUpdate(update: Telegram.Update, bot: TelegramBot) {
  logger.debug('receive %s', JSON.stringify(update))
  // Internal event: get update type from field name.
  const subtype = Object.keys(update).filter(v => v !== 'update_id')[0]
  if (subtype) {
    this.bot.dispatch(this.bot.session({
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
    session.content = session.content.slice(1)
  } else if (message) {
    session.type = update.message || update.channel_post ? 'message' : 'message-updated'
    await decodeMessage(bot, message, session.event.message = {}, session.event)
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
  const parseText = (text: string, entities: Telegram.MessageEntity[]): h[] => {
    let curr = 0
    const segs: h[] = []
    for (const e of entities) {
      const eText = text.substr(e.offset, e.length)
      if (e.type === 'mention') {
        if (eText[0] !== '@') throw new Error('Telegram mention does not start with @: ' + eText)
        const atName = eText.slice(1)
        if (eText === '@' + bot.user.name) {
          segs.push(h('at', { id: bot.user.id, name: atName }))
        } else {
          // TODO handle @others
          segs.push(h('text', { content: eText }))
        }
      } else if (e.type === 'text_mention') {
        segs.push(h('at', { id: e.user.id }))
      } else {
        // TODO: bold, italic, underline, strikethrough, spoiler, code, pre,
        //       text_link, custom_emoji
        segs.push(h('text', { content: eText }))
      }
      if (e.offset > curr) {
        segs.splice(-1, 0, h('text', { content: text.slice(curr, e.offset) }))
      }
      curr = e.offset + e.length
    }
    if (curr < text?.length || 0) {
      segs.push(h('text', { content: text.slice(curr) }))
    }
    return segs
  }

  const segments: h[] = []
  // topic messages are reply chains, if a message is forum_topic_created, the session shoudn't have a quote.
  if (data.reply_to_message && !(data.is_topic_message && data.reply_to_message.forum_topic_created)) {
    await decodeMessage(bot, data.reply_to_message, message.quote = {}, null)
  }

  // make sure text comes first so that commands can be triggered
  const msgText = data.text || data.caption
  segments.push(...parseText(msgText, data.entities || []))

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
    segments.push(h('image', await bot.$getFileFromId(photo.file_id)))
  } else if (data.sticker) {
    // TODO: Convert tgs to gif
    // https://github.com/ed-asriyan/tgs-to-gif
    // Currently use thumb only
    try {
      const file = await bot.internal.getFile({ file_id: data.sticker.file_id })
      if (file.file_path.endsWith('.tgs')) {
        throw new Error('tgs is not supported now')
      }
      segments.push(h('image', await bot.$getFileFromPath(file.file_path)))
    } catch (e) {
      logger.warn('get file error', e)
      segments.push(h('text', { content: `[${data.sticker.set_name || 'sticker'} ${data.sticker.emoji || ''}]` }))
    }
  } else if (data.voice) {
    await addResource('audio', data.voice)
  } else if (data.animation) {
    await addResource('image', data.animation)
  } else if (data.video) {
    await addResource('video', data.video)
  } else if (data.document) {
    await addResource('file', data.document)
  }

  message.elements = segments
  message.content = segments.join('')
  message.id = message.messageId = data.message_id.toString()

  if (!payload) return
  payload.timestamp = data.date * 1000
  payload.user = decodeUser(data.from)
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
