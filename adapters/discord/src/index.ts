import { DiscordBot } from './bot'
import * as Discord from './utils'

export { Discord }

export * from './bot'
export * from './message'
export * from './ws'

export default DiscordBot

type ParamCase<S extends string> =
  | S extends `${infer L}${infer R}`
  ? `${L extends '_' ? '-' : Lowercase<L>}${ParamCase<R>}`
  : S

type DiscordEvents = {
  [T in keyof Discord.GatewayEvents as `discord/${ParamCase<T>}`]: (input: Discord.GatewayEvents[T], bot: DiscordBot) => void
}

declare module '@satorijs/core' {
  interface Session {
    discord?: Discord.Gateway.Payload & Discord.Internal
  }

  interface Events extends DiscordEvents {}
}
