import { Internal } from './internal'

Internal.define({
  '/pins.add': {
    POST: { 'pinsAdd': true },
  },
  '/pins.list': {
    GET: { 'pinsList': false },
  },
  '/pins.remove': {
    POST: { 'pinsRemove': true },
  },
})

export namespace Pins {
  export namespace Params {
    export interface Add {
      channel: string
      timestamp?: string
    }
    export interface List {
      channel: string
    }
    export interface Remove {
      channel: string
      timestamp?: string
    }
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Pins an item to a channel.
     * @see https://api.slack.com/methods/pins.add
     */
    pinsAdd(token: TokenInput, params: Pins.Params.Add): Promise<{
      ok: boolean
    }>

    /**
     * Lists items pinned to a channel.
     * @see https://api.slack.com/methods/pins.list
     */
    pinsList(token: TokenInput, params: Pins.Params.List): Promise<unknown>

    /**
     * Un-pins an item from a channel.
     * @see https://api.slack.com/methods/pins.remove
     */
    pinsRemove(token: TokenInput, params: Pins.Params.Remove): Promise<{
      ok: boolean
    }>
  }
}
