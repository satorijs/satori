import { OneBotBot } from './bot'
import * as OneBot from './utils'

export { OneBot }

export * from './bot'
export * from './http'
export * from './ws'

export default OneBotBot

declare module '@satorijs/core' {
  interface Session {
    onebot?: OneBot.Payload & OneBot.Internal
  }

  interface Events<C> {
    'onebot/message-reactions-updated': Session.EventCallback
    'onebot/channel-updated': Session.EventCallback
    'onebot/channel-created': Session.EventCallback
    'onebot/channel-destroyed': Session.EventCallback
  }
}
