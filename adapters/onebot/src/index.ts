import { OneBotBot } from './bot'
import * as OneBot from './utils'

export { OneBot }

export * from './bot'
export * from './http'
export * from './ws'

export default OneBotBot

declare global {
  namespace Satori {
    interface Session {
      onebot?: OneBot.Payload & OneBot.Internal
    }

    interface Events {
      'onebot/message-reactions-updated': {}
      'onebot/channel-updated': {}
      'onebot/channel-created': {}
      'onebot/channel-destroyed': {}
    }
  }
}
