import { Universal } from '@satorijs/satori'
import * as QQGuild from '@qq-guild-sdk/core'

export const adaptGuild = (guild: QQGuild.Guild): Universal.Guild => ({
  id: guild.id,
  name: guild.name,
  guildId: guild.id,
  guildName: guild.name,
})

export const adaptUser = (user: QQGuild.User): Universal.User => ({
  id: user.id,
  name: user.username,
  isBot: user.bot,
  avatar: user.avatar,
  userId: user.id,
  username: user.username,
})
