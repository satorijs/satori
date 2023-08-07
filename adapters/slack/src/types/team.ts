import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/team.accessLogs': {
    GET: { 'teamAccessLogs': false },
  },
  '/team.billableInfo': {
    GET: { 'teamBillableInfo': false },
  },
  '/team.info': {
    GET: { 'teamInfo': false },
  },
  '/team.integrationLogs': {
    GET: { 'teamIntegrationLogs': false },
  },
  '/team.profile.get': {
    GET: { 'teamProfileGet': false },
  },
})

export namespace Team {
  export namespace Params {
    export interface AccessLogs {
      before?: string
      count?: string
      page?: string
    }
    export interface BillableInfo {
      user?: string
    }
    export interface Info {
      team?: string
    }
    export interface IntegrationLogs {
      app_id?: string
      change_type?: string
      count?: string
      page?: string
      service_id?: string
      user?: string
    }
    export interface ProfileGet {
      visibility?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Gets the access logs for the current team.
     * @see https://api.slack.com/methods/team.accessLogs
     */
    teamAccessLogs(token: TokenInput, params: Team.Params.AccessLogs): Promise<{
      logins: {
        count: number
        country: unknown
        date_first: number
        date_last: number
        ip: unknown
        isp: unknown
        region: unknown
        user_agent: string
        user_id: string
        username: string
      }[]
      ok: boolean
      paging: Definitions.Paging
    }>

    /**
     * Gets billable users information for the current team.
     * @see https://api.slack.com/methods/team.billableInfo
     */
    teamBillableInfo(token: TokenInput, params: Team.Params.BillableInfo): Promise<{
      ok: boolean
    }>

    /**
     * Gets information about the current team.
     * @see https://api.slack.com/methods/team.info
     */
    teamInfo(token: TokenInput, params: Team.Params.Info): Promise<{
      ok: boolean
      team: Definitions.Team
    }>

    /**
     * Gets the integration logs for the current team.
     * @see https://api.slack.com/methods/team.integrationLogs
     */
    teamIntegrationLogs(token: TokenInput, params: Team.Params.IntegrationLogs): Promise<{
      logs: {
        admin_app_id: string
        app_id: string
        app_type: string
        change_type: string
        channel: string
        date: string
        scope: string
        service_id: string
        service_type: string
        user_id: string
        user_name: string
      }[]
      ok: boolean
      paging: Definitions.Paging
    }>

    /**
     * Retrieve a team's profile.
     * @see https://api.slack.com/methods/team.profile.get
     */
    teamProfileGet(token: TokenInput, params: Team.Params.ProfileGet): Promise<{
      ok: boolean
      profile: {
        fields: Definitions.TeamProfileField[]
      }
    }>

  }
}
