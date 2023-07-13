import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/apps.event.authorizations.list': {
    GET: { 'appsEventAuthorizationsList': true },
  },
  '/apps.permissions.info': {
    GET: { 'appsPermissionsInfo': false },
  },
  '/apps.permissions.request': {
    GET: { 'appsPermissionsRequest': false },
  },
  '/apps.permissions.resources.list': {
    GET: { 'appsPermissionsResourcesList': false },
  },
  '/apps.permissions.scopes.list': {
    GET: { 'appsPermissionsScopesList': false },
  },
  '/apps.permissions.users.list': {
    GET: { 'appsPermissionsUsersList': false },
  },
  '/apps.permissions.users.request': {
    GET: { 'appsPermissionsUsersRequest': false },
  },
  '/apps.uninstall': {
    GET: { 'appsUninstall': false },
  },
})

export namespace Apps {
  export namespace Params {
    export interface EventAuthorizationsList {
      event_context: string
      cursor?: string
      limit?: number
    }
    export interface PermissionsInfo {
    }
    export interface PermissionsRequest {
      scopes: string
      trigger_id: string
    }
    export interface PermissionsResourcesList {
      cursor?: string
      limit?: number
    }
    export interface PermissionsScopesList {
    }
    export interface PermissionsUsersList {
      cursor?: string
      limit?: number
    }
    export interface PermissionsUsersRequest {
      scopes: string
      trigger_id: string
      user: string
    }
    export interface Uninstall {
      client_id?: string
      client_secret?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Get a list of authorizations for the given event context. Each authorization represents an app installation that the event is visible to.
     * @see https://api.slack.com/methods/apps.event.authorizations.list
     */
    appsEventAuthorizationsList(token: TokenInput, params: Apps.Params.EventAuthorizationsList): Promise<{
      ok: boolean
    }>

    /**
     * Returns list of permissions this app has on a team.
     * @see https://api.slack.com/methods/apps.permissions.info
     */
    appsPermissionsInfo(token: TokenInput): Promise<{
      info: {
        app_home: {
          resources: Definitions.Resources
          scopes: Definitions.Scopes
        }
        channel: {
          resources: Definitions.Resources
          scopes: Definitions.Scopes
        }
        group: {
          resources: Definitions.Resources
          scopes: Definitions.Scopes
        }
        im: {
          resources: Definitions.Resources
          scopes: Definitions.Scopes
        }
        mpim: {
          resources: Definitions.Resources
          scopes: Definitions.Scopes
        }
        team: {
          resources: Definitions.Resources
          scopes: Definitions.Scopes
        }
      }
      ok: boolean
    }>

    /**
     * Allows an app to request additional scopes
     * @see https://api.slack.com/methods/apps.permissions.request
     */
    appsPermissionsRequest(token: TokenInput, params: Apps.Params.PermissionsRequest): Promise<{
      ok: boolean
    }>

    /**
     * Returns list of resource grants this app has on a team.
     * @see https://api.slack.com/methods/apps.permissions.resources.list
     */
    appsPermissionsResourcesList(token: TokenInput, params: Apps.Params.PermissionsResourcesList): Promise<{
      ok: boolean
      resources: {
        id: string
        type: string
      }[]
      response_metadata?: {
        next_cursor: string
      }
    }>

    /**
     * Returns list of scopes this app has on a team.
     * @see https://api.slack.com/methods/apps.permissions.scopes.list
     */
    appsPermissionsScopesList(token: TokenInput): Promise<{
      ok: boolean
      scopes: {
        app_home: Definitions.Scopes
        channel: Definitions.Scopes
        group: Definitions.Scopes
        im: Definitions.Scopes
        mpim: Definitions.Scopes
        team: Definitions.Scopes
        user: Definitions.Scopes
      }
    }>

    /**
     * Returns list of user grants and corresponding scopes this app has on a team.
     * @see https://api.slack.com/methods/apps.permissions.users.list
     */
    appsPermissionsUsersList(token: TokenInput, params: Apps.Params.PermissionsUsersList): Promise<{
      ok: boolean
    }>

    /**
     * Enables an app to trigger a permissions modal to grant an app access to a user access scope.
     * @see https://api.slack.com/methods/apps.permissions.users.request
     */
    appsPermissionsUsersRequest(token: TokenInput, params: Apps.Params.PermissionsUsersRequest): Promise<{
      ok: boolean
    }>

    /**
     * Uninstalls your app from a workspace.
     * @see https://api.slack.com/methods/apps.uninstall
     */
    appsUninstall(token: TokenInput, params: Apps.Params.Uninstall): Promise<{
      ok: boolean
    }>

  }
}
