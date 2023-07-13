import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/dnd.endDnd': {
    POST: { 'dndEndDnd': true },
  },
  '/dnd.endSnooze': {
    POST: { 'dndEndSnooze': true },
  },
  '/dnd.info': {
    GET: { 'dndInfo': false },
  },
  '/dnd.setSnooze': {
    POST: { 'dndSetSnooze': false },
  },
  '/dnd.teamInfo': {
    GET: { 'dndTeamInfo': false },
  },
})

export namespace Dnd {
  export namespace Params {
    export interface EndDnd {
    }
    export interface EndSnooze {
    }
    export interface Info {
      user?: string
    }
    export interface SetSnooze {
      num_minutes: string
    }
    export interface TeamInfo {
      users?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Ends the current user's Do Not Disturb session immediately.
     * @see https://api.slack.com/methods/dnd.endDnd
     */
    dndEndDnd(token: TokenInput): Promise<{
      ok: boolean
    }>

    /**
     * Ends the current user's snooze mode immediately.
     * @see https://api.slack.com/methods/dnd.endSnooze
     */
    dndEndSnooze(token: TokenInput): Promise<{
      dnd_enabled: boolean
      next_dnd_end_ts: number
      next_dnd_start_ts: number
      ok: boolean
      snooze_enabled: boolean
    }>

    /**
     * Retrieves a user's current Do Not Disturb status.
     * @see https://api.slack.com/methods/dnd.info
     */
    dndInfo(token: TokenInput, params: Dnd.Params.Info): Promise<{
      dnd_enabled: boolean
      next_dnd_end_ts: number
      next_dnd_start_ts: number
      ok: boolean
      snooze_enabled?: boolean
      snooze_endtime?: number
      snooze_remaining?: number
    }>

    /**
     * Turns on Do Not Disturb mode for the current user, or changes its duration.
     * @see https://api.slack.com/methods/dnd.setSnooze
     */
    dndSetSnooze(token: TokenInput, params: Dnd.Params.SetSnooze): Promise<{
      ok: boolean
      snooze_enabled: boolean
      snooze_endtime: number
      snooze_remaining: number
    }>

    /**
     * Retrieves the Do Not Disturb status for up to 50 users on a team.
     * @see https://api.slack.com/methods/dnd.teamInfo
     */
    dndTeamInfo(token: TokenInput, params: Dnd.Params.TeamInfo): Promise<{
      ok: boolean
    }>

  }
}
