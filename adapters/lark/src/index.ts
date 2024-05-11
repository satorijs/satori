import { LarkBot } from './bot'
import * as Lark from './types'

export * from './bot'

export { Lark, Lark as Feishu }

export default LarkBot

declare module '@satorijs/core' {
  interface Session {
    feishu: Lark.Internal
    lark: Lark.Internal
  }
}
