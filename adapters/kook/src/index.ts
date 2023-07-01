import { KookBot } from './bot'
import * as Kook from './types'

export { Kook }

export * from './bot'
export * from './message'
export * from './http'
export * from './ws'
export * from './utils'

export default KookBot

declare global {
  namespace Satori {
    interface Session {
      kook?: Kook.Payload & Kook.Internal
    }

    interface Events {
      'kook/message-btn-click': {}
      'kook/joined-channel': (session: Session) => void
      'kook/exited-channel': (session: Session) => void
    }
  }
}
