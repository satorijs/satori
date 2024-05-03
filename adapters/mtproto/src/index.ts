import { TelegramBot } from './bot'


export { Telegram }

export * from './bot'
export * from './polling'
export * from './message'
export * from './server'
export * from './utilsxD'

export default TelegramBot

type ParamCase<S extends string> =
  | S extends `${infer L}${infer R}`
  ? `${L extends '_' ? '-' : Lowercase<L>}${ParamCase<R>}`
  : S

type TelegramEvents = {
  [T in Exclude<keyof Telegram.Update, 'update_id'> as `telegram/${ParamCase<T>}`]: (input: Telegram.Update[T], bot: TelegramBot) => void
}

declare module '@satorijs/core' {
  interface Session {
    telegram?: Telegram.Update & Telegram.Internal
  }

  interface Events extends TelegramEvents {}
}
