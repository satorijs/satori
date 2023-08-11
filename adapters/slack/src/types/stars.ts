import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/stars.add': {
    POST: { 'starsAdd': true },
  },
  '/stars.list': {
    GET: { 'starsList': false },
  },
  '/stars.remove': {
    POST: { 'starsRemove': true },
  },
})

export namespace Stars {
  export namespace Params {
    export interface Add {
      channel?: string
      file?: string
      file_comment?: string
      timestamp?: string
    }
    export interface List {
      count?: string
      page?: string
      cursor?: string
      limit?: number
    }
    export interface Remove {
      channel?: string
      file?: string
      file_comment?: string
      timestamp?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Adds a star to an item.
     * @see https://api.slack.com/methods/stars.add
     */
    starsAdd(token: TokenInput, params: Stars.Params.Add): Promise<{
      ok: boolean
    }>

    /**
     * Lists stars for a user.
     * @see https://api.slack.com/methods/stars.list
     */
    starsList(token: TokenInput, params: Stars.Params.List): Promise<{
      items: {
        channel: string
        date_create: number
        message: Definitions.Message
        type: string
      }[]
      ok: boolean
      paging?: Definitions.Paging
    }>

    /**
     * Removes a star from an item.
     * @see https://api.slack.com/methods/stars.remove
     */
    starsRemove(token: TokenInput, params: Stars.Params.Remove): Promise<{
      ok: boolean
    }>
  }
}
