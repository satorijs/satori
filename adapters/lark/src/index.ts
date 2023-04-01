import { FeishuBot } from './bot'
import * as Lark from './types'

export * from './bot'

export { Lark, Lark as Feishu }

export default FeishuBot

declare module '@satorijs/core' {
  interface Session {
    feishu: Lark.Internal
    lark: Lark.Internal
  }
}
