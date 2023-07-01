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
      'kook/guild-member-online': {}
      'kook/guild-member-offline': {},
      'kook/added-role': {},
      'kook/deleted-role': {},
      'kook/updated-role' {},
      'kook/added-block-list': {},
      'kook/added-emoji': {},
      'kook/updated-emoji': {},
      'kook/joined-channel': {},
      'kook/exited-channel': {},
      'kook/user-updated': {}
    }
  }
}
