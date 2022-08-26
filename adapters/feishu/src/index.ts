import * as Feishu from './types'
import { FeishuBot } from './bot'

export { Feishu }

export default FeishuBot

declare module '@satorijs/core' {
  interface Session {
    feishu: Feishu.Internal
  }
}
