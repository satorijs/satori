import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/migration.exchange': {
    GET: { 'migrationExchange': false },
  },
})

export namespace Migration {
  export namespace Params {
    export interface Exchange {
      users: string
      team_id?: string
      to_old?: boolean
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * For Enterprise Grid workspaces, map local user IDs to global user IDs
     * @see https://api.slack.com/methods/migration.exchange
     */
    migrationExchange(token: TokenInput, params: Migration.Params.Exchange): Promise<{
      enterprise_id: string
      invalid_user_ids?: string[]
      ok: boolean
      team_id: string
      user_id_map?: {
      }
    }>

  }
}
