import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/api.test': {
    GET: { 'apiTest': true },
  },
})

export namespace Api {
  export namespace Params {
    export interface Test {
      error?: string
      foo?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Checks API calling code.
     * @see https://api.slack.com/methods/api.test
     */
    apiTest(token: TokenInput, params: Api.Params.Test): Promise<{
      ok: boolean
    }>

  }
}
