import { defineProperty, GuildMember, hyphenate, Logger, User } from '@satorijs/satori'
import { TelegramBot } from './bot'
import * as Telegram from './types'

export * from './types'

const logger = new Logger('telegram')

export const adaptUser = (data: Telegram.User): User => ({
  userId: data.id.toString(),
  username: data.username,
  nickname: data.first_name + (data.last_name ? ' ' + data.last_name : ''),
  isBot: data.is_bot,
})

export const adaptGuildMember = (data: Telegram.ChatMember): GuildMember => adaptUser(data.user)

export async function handleUpdate(update: Telegram.Update, bot: TelegramBot) {
  logger.debug('receive %s', JSON.stringify(update))
  const session = bot.session()
  defineProperty(session, 'telegram', Object.create(bot.internal))
  Object.assign(session.telegram, update)

  const message = update.message || update.edited_message || update.channel_post || update.edited_channel_post
  if (message) {
    session.type = update.message || update.channel_post ? 'message' : 'message-updated'
    await bot.adaptMessage(message, session)
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
  } else {
    // Get update type from field name.
    const subtype = Object.keys(update).filter(v => v !== 'update_id')[0]
    if (subtype) {
      session.type = 'telegram'
      session.subtype = hyphenate(subtype)
    }
  }

  bot.dispatch(session)
}
