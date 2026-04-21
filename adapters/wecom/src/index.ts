import { WecomBot } from './bot'
import { Message } from './types'

declare module '@satorijs/core' {
  interface Session {
    wecom?: Message
  }
}

export * from './bot'
export * from './utils'
export * from './types'
export * from './message'

export default WecomBot
