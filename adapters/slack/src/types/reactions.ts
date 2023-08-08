import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/reactions.add': {
    POST: { 'reactionsAdd': true },
  },
  '/reactions.get': {
    GET: { 'reactionsGet': false },
  },
  '/reactions.list': {
    GET: { 'reactionsList': false },
  },
  '/reactions.remove': {
    POST: { 'reactionsRemove': true },
  },
})

export namespace Reactions {
  export namespace Params {
    export interface Add {
      channel: string
      name: string
      timestamp: string
    }
    export interface Get {
      channel?: string
      file?: string
      file_comment?: string
      full?: boolean
      timestamp?: string
    }
    export interface List {
      user?: string
      full?: boolean
      count?: number
      page?: number
      cursor?: string
      limit?: number
    }
    export interface Remove {
      name: string
      file?: string
      file_comment?: string
      channel?: string
      timestamp?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Adds a reaction to an item.
     * @see https://api.slack.com/methods/reactions.add
     */
    reactionsAdd(token: TokenInput, params: Reactions.Params.Add): Promise<{
      ok: boolean
    }>

    /**
     * Gets reactions for an item.
     * @see https://api.slack.com/methods/reactions.get
     */
    reactionsGet(token: TokenInput, params: Reactions.Params.Get): Promise<{
      channel: string
      message: Definitions.Message
      ok: boolean
      type: string
    }>

    /**
     * Lists reactions made by a user.
     * @see https://api.slack.com/methods/reactions.list
     */
    reactionsList(token: TokenInput, params: Reactions.Params.List): Promise<{
      items: {
        channel: string
        message: Definitions.Message
        type: string
      }[]
      ok: boolean
      paging?: Definitions.Paging
      response_metadata?: Definitions.ResponseMetadata
    }>

    /**
     * Removes a reaction from an item.
     * @see https://api.slack.com/methods/reactions.remove
     */
    reactionsRemove(token: TokenInput, params: Reactions.Params.Remove): Promise<{
      ok: boolean
    }>

  }
}
