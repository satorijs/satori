import { WhatsAppAdapter } from './adapter'
import { Change, MessageValue } from './types'

declare module '@satorijs/core' {
  interface Session {
    whatsapp?: Change
  }

  interface Events {
    'whatsapp/messages'(messages: MessageValue): void
  }
}

export default WhatsAppAdapter

export * from './adapter'
export * from './bot'
export * from './types'
export * from './utils'
export * from './message'
