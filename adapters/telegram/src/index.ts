import { TelegramBot } from './bot'
import * as Telegram from './types'

export { Telegram }

export * from './bot'
export * from './polling'
export * from './sender'
export * from './server'
export * from './utils'

export default TelegramBot

declare module '@satorijs/core' {
  interface Session {
    telegram?: Telegram.Update & Telegram.Internal
  }
}
