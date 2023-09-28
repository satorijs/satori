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

  interface Events {
    'onebot/message-reactions-updated'(session: Session): void
    'onebot/channel-updated'(session: Session): void
    'onebot/channel-created'(session: Session): void
    'onebot/channel-destroyed'(session: Session): void
  }
}
