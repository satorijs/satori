import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/search.messages': {
    GET: { 'searchMessages': false },
  },
})

export namespace Search {
  export namespace Params {
    export interface Messages {
      count?: number
      highlight?: boolean
      page?: number
      query: string
      sort?: string
      sort_dir?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Searches for messages matching a query.
     * @see https://api.slack.com/methods/search.messages
     */
    searchMessages(token: TokenInput, params: Search.Params.Messages): Promise<{
      ok: boolean
    }>

  }
}
