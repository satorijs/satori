import { FeishuBot } from './bot'
import * as Feishu from './types'

export { Feishu }

export default FeishuBot

declare module '@satorijs/core' {
  interface Session {
    feishu: Feishu.Internal
  }
}
