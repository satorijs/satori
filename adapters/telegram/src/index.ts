import { TelegramBot } from './bot'
import * as Telegram from './types'

export { Telegram }

export * from './bot'
export * from './polling'
export * from './modulator'
export * from './server'
export * from './utils'

export default TelegramBot

declare module '@satorijs/core' {
  interface Session {
    telegram?: Telegram.Update & Telegram.Internal
  }

  interface Events {
    'telegram/inline-query'(session: Session): void
    'telegram/chosen-inline-result'(session: Session): void
    'telegram/callback-query'(session: Session): void
    'telegram/shipping-query'(session: Session): void
    'telegram/pre-checkout-query'(session: Session): void
    'telegram/poll'(session: Session): void
    'telegram/poll-answer'(session: Session): void
    'telegram/chat-member'(session: Session): void
  }
}
