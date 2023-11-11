import { MatrixBot } from './bot'
import * as Matrix from './types'

declare module '@satorijs/satori' {
  interface Session {
      matrix: Matrix.Internal & Matrix.ClientEvent
  }
}

export * from './bot'
export * from './http'
export * from './message'
export * from './types'
export * from './utils'

export default MatrixBot
