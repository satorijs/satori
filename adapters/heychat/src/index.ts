import { HeychatBot } from './bot'
import { Internal } from './internal'
import * as Heychat from './types'

export * from './bot'

export { Heychat }

export default HeychatBot

declare module '@satorijs/core' {
  interface Session {
    heychat: Internal
  }
}
