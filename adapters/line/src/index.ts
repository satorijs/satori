import { hyphenate } from '@satorijs/satori'
import { LineBot } from './bot'
import * as Line from './types'

export { Line }

export * from './bot'
export * from './utils'
export * from './http'
export * from './message'

type LineEvents = {
  [P in hyphenate<Line.WebhookEvent['type']>]: Line.WebhookEvent & { type: P }
}

declare module '@satorijs/core' {
  interface Session {
    line?: Line.WebhookEvent & Line.Internal
  }

  interface Events extends LineEvents {}
}

export default LineBot
