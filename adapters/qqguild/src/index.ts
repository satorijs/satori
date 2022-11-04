import * as QQGuild from '@qq-guild-sdk/core'
import { QQGuildBot } from './bot'

export { QQGuild }

export * from './bot'
export * from './message'
export * from './utils'
export * from './ws'

export default QQGuildBot

declare module '@satorijs/core' {
  interface Session {
    qqguild?: QQGuild.Bot
  }
}
