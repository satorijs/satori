import { Internal } from './internal'

Internal.define({
  '/views.open': {
    GET: { 'viewsOpen': true },
  },
  '/views.publish': {
    GET: { 'viewsPublish': true },
  },
  '/views.push': {
    GET: { 'viewsPush': true },
  },
  '/views.update': {
    GET: { 'viewsUpdate': true },
  },
})

export namespace Views {
  export namespace Params {
    export interface Open {
      trigger_id: string
      view: string
    }
    export interface Publish {
      user_id: string
      view: string
      hash?: string
    }
    export interface Push {
      trigger_id: string
      view: string
    }
    export interface Update {
      view_id?: string
      external_id?: string
      view?: string
      hash?: string
    }
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Open a view for a user.
     * @see https://api.slack.com/methods/views.open
     */
    viewsOpen(token: TokenInput, params: Views.Params.Open): Promise<{
      ok: boolean
    }>

    /**
     * Publish a static view for a User.
     * @see https://api.slack.com/methods/views.publish
     */
    viewsPublish(token: TokenInput, params: Views.Params.Publish): Promise<{
      ok: boolean
    }>

    /**
     * Push a view onto the stack of a root view.
     * @see https://api.slack.com/methods/views.push
     */
    viewsPush(token: TokenInput, params: Views.Params.Push): Promise<{
      ok: boolean
    }>

    /**
     * Update an existing view.
     * @see https://api.slack.com/methods/views.update
     */
    viewsUpdate(token: TokenInput, params: Views.Params.Update): Promise<{
      ok: boolean
    }>
  }
}
