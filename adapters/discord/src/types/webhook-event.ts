import { Guild, integer, snowflake, User } from '.'

/** https://discord.com/developers/docs/events/webhook-events#application-authorized-application-authorized-structure */
export interface WebhookEvent {
  /** Installation context for the authorization. Either guild (`0`) if installed to a server or user (`1`) if installed to a user's account */
  integration_type?: integer
  /** User who authorized the app */
  user: User
  /** List of scopes the user authorized */
  scopes: string[]
  /** Server which app was authorized for (when integration type is `0`) */
  guild?: Guild
}

export namespace WebhookEvent {
  /** https://discord.com/developers/docs/events/webhook-events#application-deauthorized-application-deauthorized-structure */
  export interface ApplicationDeauthorized {
    /** User who deauthorized the app */
    user: User
  }

  /** https://discord.com/developers/docs/events/webhook-events#payload-structure */
  export interface Payload {
    /** Version scheme for the webhook event. Currently always `1` */
    version: integer
    /** ID of your app */
    application_id: snowflake
    /** Type of webhook, either `0` for PING or `1` for webhook events */
    type: unknown
    /** Event data payload */
    event?: unknown
  }
}
