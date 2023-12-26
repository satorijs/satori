import { KookBot } from './bot'
import * as Kook from './utils'

export { Kook }

export * from './bot'
export * from './message'
export * from './http'
export * from './ws'
export * from './utils'

export default KookBot

declare module '@satorijs/core' {
  interface Events extends Kook.Events {}

  interface Session {
    kook?: Kook.Data & Kook.Internal
  }
}
