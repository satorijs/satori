import { Guild, User } from '@satorijs/env-node'
import * as QQGuild from '@qq-guild-sdk/core'

export const adaptGuild = (guild: QQGuild.Guild): Guild => ({
  guildId: guild.id,
  guildName: guild.name,
})

export const adaptUser = (user: QQGuild.User): User => ({
  isBot: user.bot,
  avatar: user.avatar,
  userId: user.id,
  username: user.username,
  nickname: user.username,
})
