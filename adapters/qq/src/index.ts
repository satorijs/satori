import * as QQ from './types'
import { QQBot } from './bot'
import { GroupInternal, GuildInternal } from './internal'

export { QQ }

export * from './bot'
export * from './message'
export * from './utils'
export * from './ws'

export default QQBot

type ParamCase<S extends string> =
  | S extends `${infer L}${infer R}`
  ? `${L extends '_' ? '-' : Lowercase<L>}${ParamCase<R>}`
  : S

type QQEvents = {
  [T in keyof QQ.GatewayEvents as `qq/${ParamCase<T>}`]: (input: QQ.GatewayEvents[T]) => void
}

declare module '@satorijs/core' {
  interface Session {
    qq?: QQ.Payload & GroupInternal
    qqguild?: QQ.Payload & GuildInternal
  }
}

declare module 'cordis' {
  interface Events extends QQEvents { }
}
