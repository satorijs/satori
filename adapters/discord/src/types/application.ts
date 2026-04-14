import { Guild, integer, Internal, snowflake, Team, User } from '.'

/** https://discord.com/developers/docs/resources/application#application-object-application-structure */
export interface Application {
  /** ID of the app */
  id: snowflake
  /** Name of the app */
  name: string
  /** Icon hash of the app */
  icon: string | null
  /** Description of the app */
  description: string
  /** List of RPC origin URLs, if RPC is enabled */
  rpc_origins?: string[]
  /** When `false`, only the app owner can add the app to guilds */
  bot_public: boolean
  /** When `true`, the app's bot will only join upon completion of the full OAuth2 code grant flow */
  bot_require_code_grant: boolean
  /** Partial user object for the bot user associated with the app */
  bot?: Partial<User>
  /** URL of the app's Terms of Service */
  terms_of_service_url?: string
  /** URL of the app's Privacy Policy */
  privacy_policy_url?: string
  /** Partial user object for the owner of the app */
  owner?: Partial<User>
  /** Hex encoded key for verification in interactions and the GameSDK's GetTicket */
  verify_key: string
  /** If the app belongs to a team, this will be a list of the members of that team */
  team: Team | null
  /** Guild associated with the app. For example, a developer support server. */
  guild_id?: snowflake
  /** Partial object of the associated guild */
  guild?: Partial<Guild>
  /** If this app is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  primary_sku_id?: snowflake
  /** If this app is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string
  /** App's default rich presence invite cover image hash */
  cover_image?: string
  /** App's public flags */
  flags?: integer
  /** Approximate count of guilds the app has been added to */
  approximate_guild_count?: integer
  /** Approximate count of users that have installed the app (authorized with `application.commands` as a scope) */
  approximate_user_install_count?: integer
  /** Approximate count of users that have OAuth2 authorizations for the app */
  approximate_user_authorization_count?: integer
  /** Array of redirect URIs for the app */
  redirect_uris?: string[]
  /** Interactions endpoint URL for the app */
  interactions_endpoint_url?: string | null
  /** Role connection verification URL for the app */
  role_connections_verification_url?: string | null
  /** Event webhooks URL for the app to receive webhook events */
  event_webhooks_url?: string | null
  /** If webhook events are enabled for the app. `1` (default) means disabled, `2` means enabled, and `3` means disabled by Discord */
  event_webhooks_status?: Application.EventWebhookStatus
  /** List of Webhook event types the app subscribes to */
  event_webhooks_types?: string[]
  /** List of tags describing the content and functionality of the app. Max of 5 tags. */
  tags?: string[]
  /** Settings for the app's default in-app authorization link, if enabled */
  install_params?: Application.InstallParams
  /** Default scopes and permissions for each supported installation context. Value for each key is an integration type configuration object */
  integration_types_config?: Application.IntegrationType
  /** Default custom authorization URL for the app, if enabled */
  custom_install_url?: string
}

export namespace Application {
  /** https://discord.com/developers/docs/resources/application#application-object-application-integration-types */
  export enum IntegrationType {
    /** App is installable to servers */
    GUILD_INSTALL = 'guild_install',
    /** App is installable to users */
    USER_INSTALL = 'user_install',
  }

  /** https://discord.com/developers/docs/resources/application#application-object-application-event-webhook-status */
  export enum EventWebhookStatus {
    /** Webhook events are disabled by developer */
    DISABLED = 1,
    /** Webhook events are enabled by developer */
    ENABLED = 2,
    /** Webhook events are disabled by Discord, usually due to inactivity */
    DISABLED_BY_DISCORD = 3,
  }

  /** https://discord.com/developers/docs/resources/application#application-object-application-flags */
  export enum Flag {
    /** Indicates if an app uses the Auto Moderation API */
    APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE = 1 << 6,
    /** Intent required for bots in **100 or more servers** to receive `presence_update` events */
    GATEWAY_PRESENCE = 1 << 12,
    /** Intent required for bots in under 100 servers to receive `presence_update` events, found on the **Bot** page in your app's settings */
    GATEWAY_PRESENCE_LIMITED = 1 << 13,
    /** Intent required for bots in **100 or more servers** to receive member-related events like `guild_member_add`. See the list of member-related events under `GUILD_MEMBERS` */
    GATEWAY_GUILD_MEMBERS = 1 << 14,
    /** Intent required for bots in under 100 servers to receive member-related events like `guild_member_add`, found on the **Bot** page in your app's settings. See the list of member-related events under `GUILD_MEMBERS` */
    GATEWAY_GUILD_MEMBERS_LIMITED = 1 << 15,
    /** Indicates unusual growth of an app that prevents verification */
    VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
    /** Indicates if an app is embedded within the Discord client (currently unavailable publicly) */
    EMBEDDED = 1 << 17,
    /** Intent required for bots in **100 or more servers** to receive message content */
    GATEWAY_MESSAGE_CONTENT = 1 << 18,
    /** Intent required for bots in under 100 servers to receive message content, found on the **Bot** page in your app's settings */
    GATEWAY_MESSAGE_CONTENT_LIMITED = 1 << 19,
    /** Indicates if an app has registered global application commands */
    APPLICATION_COMMAND_BADGE = 1 << 23,
  }

  /** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-location-kind-enum */
  export enum ActivityLocationKindEnum {
    /** Location is a Guild Channel */
    GC = 'gc',
    /** Location is a Private Channel, such as a DM or GDM */
    PC = 'pc',
  }

  /** https://discord.com/developers/docs/resources/application#application-object-application-integration-type-configuration-object */
  export interface IntegrationTypeConfiguration {
    /** Install params for each installation context's default in-app authorization link */
    oauth2_install_params?: Application.InstallParams
  }

  /** https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure */
  export interface InstallParams {
    /** Scopes to add the application to the server with */
    scopes: string[]
    /** Permissions to request for the bot role */
    permissions: string
  }

  /** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-instance-object */
  export interface ActivityInstance {
    /** Application ID */
    application_id: snowflake
    /** Activity Instance ID */
    instance_id: string
    /** Unique identifier for the launch */
    launch_id: snowflake
    /** Location the instance is running in */
    location: Application.ActivityLocation
    /** IDs of the Users currently connected to the instance */
    users: User[]
  }

  /** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-location-object */
  export interface ActivityLocation {
    /** Unique identifier for the location */
    id: string
    /** Enum describing kind of location */
    kind: Application.ActivityLocationKindEnum
    /** ID of the Channel */
    channel_id: snowflake
    /** ID of the Guild */
    guild_id?: snowflake | null
  }
}

/** https://discord.com/developers/docs/resources/application#edit-current-application-json-params */
export interface EditCurrentApplicationParams {
  /** Default custom authorization URL for the app, if enabled */
  custom_install_url: string
  /** Description of the app */
  description: string
  /** Role connection verification URL for the app */
  role_connections_verification_url: string
  /** Settings for the app's default in-app authorization link, if enabled */
  install_params: Application.InstallParams
  /** Default scopes and permissions for each supported installation context. Value for each key is an integration type configuration object */
  integration_types_config: Application.IntegrationType
  /** App's public flags */
  flags: integer
  /** Icon for the app */
  icon: string | null
  /** Default rich presence invite cover image for the app */
  cover_image: string | null
  /** Interactions endpoint URL for the app */
  interactions_endpoint_url: string
  /** List of tags describing the content and functionality of the app (max of 20 characters per tag). Max of 5 tags. */
  tags: string[]
  /** Event webhooks URL for the app to receive webhook events */
  event_webhooks_url: string
  /** If webhook events are enabled for the app. `1` to disable, and `2` to enable */
  event_webhooks_status: Application.EventWebhookStatus
  /** List of Webhook event types to subscribe to */
  event_webhooks_types: string[]
}

declare module './internal' {
  interface Internal {
    /**
     * Returns the application object associated with the requesting bot user.
     * @see https://discord.com/developers/docs/resources/application#get-current-application
     */
    getCurrentApplication(): Promise<Application>
    /**
     * Edit properties of the app associated with the requesting bot user. Only properties that are passed will be updated. Returns the updated application object on success.
     * @see https://discord.com/developers/docs/resources/application#edit-current-application
     */
    editCurrentApplication(params: EditCurrentApplicationParams): Promise<Application>
    /**
     * Returns a serialized activity instance, if it exists. Useful for preventing unwanted activity sessions.
     * @see https://discord.com/developers/docs/resources/application#get-application-activity-instance
     */
    getApplicationActivityInstance(application_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/applications/@me': {
    GET: 'getCurrentApplication',
    PATCH: 'editCurrentApplication',
  },
  '/applications/{application.id}/activity-instances/{instance_id}': {
    GET: 'getApplicationActivityInstance',
  },
})
