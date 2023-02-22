import { FeishuBot } from './bot'
import * as Feishu from './types'

export * from './bot'

export { Feishu }

export default FeishuBot

declare module '@satorijs/core' {
  interface Session {
    feishu: Feishu.Internal
  }
}
