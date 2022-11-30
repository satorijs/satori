import { Universal } from '@satorijs/satori'
import * as QQGuild from '@qq-guild-sdk/core'

export const adaptGuild = (guild: QQGuild.Guild): Universal.Guild => ({
  guildId: guild.id,
  guildName: guild.name,
})

export const adaptUser = (user: QQGuild.User): Universal.User => ({
  isBot: user.bot,
  avatar: user.avatar,
  userId: user.id,
  username: user.username,
  nickname: user.username,
})
