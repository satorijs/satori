import { Context, hyphenate } from '@satorijs/core'
import { LineBot } from './bot'
import * as Line from './types'

export { Line }

export * from './bot'
export * from './utils'
export * from './http'
export * from './message'

type LineEvents<C extends Context = Context> = {
  [P in Line.WebhookEvent['type'] as `line/${hyphenate<P>}`]: (data: Line.WebhookEvent & { type: P }, bot: LineBot<C>) => void
}

declare module '@satorijs/core' {
  interface Session {
    line?: Line.WebhookEvent & Line.Internal
  }
}

declare module 'cordis' {
  interface Events<C> extends LineEvents<C> {}
}

export default LineBot
