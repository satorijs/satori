import { Context } from '@satorijs/core'
import { FluxerBot } from './bot'
import * as Fluxer from './utils'

export { Fluxer }

export * from './bot'
export * from './message'
export * from './ws'
export * from './discovery'
export * from './protocol/gateway'

export default FluxerBot

type ParamCase<S extends string> =
  | S extends `${infer L}${infer R}`
  ? `${L extends '_' ? '-' : Lowercase<L>}${ParamCase<R>}`
  : S

type FluxerEvents<C extends Context = Context> = {
  [T in keyof Fluxer.GatewayEvents & string as `fluxer/${ParamCase<T>}`]: (input: Fluxer.GatewayEvents[T], bot: FluxerBot<C>) => void
}

declare module '@satorijs/core' {
  interface Session {
    fluxer?: Fluxer.Gateway.Payload & { _type?: string }
  }
}

declare module 'cordis' {
  interface Events<C> extends FluxerEvents<C> {}
}
