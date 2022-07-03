import { DiscordBot } from './bot'
import * as Discord from './types'

export { Discord }

export * from './bot'
export * from './sender'
export * from './utils'
export * from './ws'

declare module '@satorijs/core' {
  interface Session {
    discord?: Discord.GatewayPayload & Discord.Internal
  }
}

export default DiscordBot
