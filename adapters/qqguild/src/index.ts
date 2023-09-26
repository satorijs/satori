import * as QQGuild from './types'
import { QQGuildBot } from './bot'

export { QQGuild }

export * from './bot'
export * from './message'
export * from './utils'
export * from './ws'

export default QQGuildBot

type ParamCase<S extends string> =
  | S extends `${infer L}${infer R}`
  ? `${L extends '_' ? '-' : Lowercase<L>}${ParamCase<R>}`
  : S

type QQGuildEvents = {
  [T in keyof QQGuild.GatewayEvents as `qqguild/${ParamCase<T>}`]: (input: QQGuild.GatewayEvents[T]) => void
}

declare module '@satorijs/core' {
  interface Session {
    qqguild?: QQGuild.Payload
  }

  interface Events extends QQGuildEvents {}
}
