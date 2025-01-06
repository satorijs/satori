import { LarkBot } from './bot'
import { Internal } from './internal'
import { EventPayload } from './utils'
import * as Lark from './types'

export * from './bot'

export { Lark, Lark as Feishu }

export default LarkBot

declare module '@satorijs/core' {
  interface Session {
    feishu: Internal & EventPayload
    lark: Internal & EventPayload
  }
}
