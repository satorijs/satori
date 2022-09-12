import { OneBotBot } from './bot'
import * as OneBot from './utils'

export { OneBot }

export * from './bot'
export * from './http'
export * from './ws'
export * from './cqcode'

export default OneBotBot

declare module '@satorijs/core' {
  interface Session {
    onebot?: OneBot.Payload & OneBot.Internal
  }

  interface Events<C> {
    'onebot/message-reactions-updated': Session.EventCallback<C>
    'onebot/channel-updated': Session.EventCallback<C>
    'onebot/channel-created': Session.EventCallback<C>
    'onebot/channel-destroyed': Session.EventCallback<C>
  }
}
