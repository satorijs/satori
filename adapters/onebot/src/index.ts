import { OneBotBot } from './bot'
import * as OneBot from './utils'

export { OneBot }

export * from './bot'
export * from './qqguild'
export * from './http'
export * from './ws'

export default OneBotBot

declare module '@satorijs/core' {
  interface Session {
    onebot?: OneBot.Payload & OneBot.Internal
  }

  namespace Session {
    interface Events {
      onebot: {
        'message-reactions-updated': {}
        'channel-updated': {}
        'channel-created': {}
        'channel-destroyed': {}
      }
    }
  }
}
