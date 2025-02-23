import { Context } from '@satorijs/core'
import { TelegramBot } from './bot'
import * as Telegram from './types'

export { Telegram }

export * from './bot'
export * from './polling'
export * from './message'
export * from './server'
export * from './utils'

export default TelegramBot

type ParamCase<S extends string> =
  | S extends `${infer L}${infer R}`
  ? `${L extends '_' ? '-' : Lowercase<L>}${ParamCase<R>}`
  : S

type TelegramEvents<C extends Context = Context> = {
  [T in Exclude<keyof Telegram.Update, 'update_id'> as `telegram/${ParamCase<T>}`]: (input: NonNullable<Telegram.Update[T]>, bot: TelegramBot<C>) => void
}

declare module '@satorijs/core' {
  interface Session {
    telegram?: Telegram.Update & Telegram.Internal
  }
}

declare module 'cordis' {
  interface Events<C> extends TelegramEvents<C> {}
}
