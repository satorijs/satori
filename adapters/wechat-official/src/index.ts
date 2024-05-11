import { WechatOfficialBot } from './bot'
import { Message } from './types'

declare module '@satorijs/core' {
  interface Session {
    wechatOfficial?: Message
    wechatOfficialResolve?: (value?: any) => void
  }
}

export * from './bot'
export * from './utils'
export * from './types'
export * from './http'
export * from './message'

export default WechatOfficialBot
