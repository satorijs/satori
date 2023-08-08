import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/oauth.access': {
    GET: { 'oauthAccess': false },
  },
  '/oauth.token': {
    GET: { 'oauthToken': false },
  },
  '/oauth.v2.access': {
    GET: { 'oauthV2Access': false },
  },
})

export namespace Oauth {
  export namespace Params {
    export interface Access {
      client_id?: string
      client_secret?: string
      code?: string
      redirect_uri?: string
      single_channel?: boolean
    }
    export interface Token {
      client_id?: string
      client_secret?: string
      code?: string
      redirect_uri?: string
      single_channel?: boolean
    }
    export interface V2Access {
      client_id?: string
      client_secret?: string
      code: string
      redirect_uri?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Exchanges a temporary OAuth verifier code for an access token.
     * @see https://api.slack.com/methods/oauth.access
     */
    oauthAccess(token: TokenInput, params: Oauth.Params.Access): Promise<{
      ok: boolean
    }>

    /**
     * Exchanges a temporary OAuth verifier code for a workspace token.
     * @see https://api.slack.com/methods/oauth.token
     */
    oauthToken(token: TokenInput, params: Oauth.Params.Token): Promise<{
      ok: boolean
    }>

    /**
     * Exchanges a temporary OAuth verifier code for an access token.
     * @see https://api.slack.com/methods/oauth.v2.access
     */
    oauthV2Access(token: TokenInput, params: Oauth.Params.V2Access): Promise<{
      ok: boolean
    }>

  }
}
