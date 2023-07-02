import { DiscordBot } from './bot'
import * as Discord from './utils'

export { Discord }

export * from './bot'
export * from './message'
export * from './ws'

export default DiscordBot

declare module '@satorijs/core' {
  interface Session {
    discord?: Discord.GatewayPayload & Discord.Internal
  }
}
