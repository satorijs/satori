import { AvatarDecorationData, Collectibles, DefaultReaction, Emoji, Internal, Oauth2Scopes, Role, RoleColors, Sticker, Tag, User, integer, snowflake, timestamp } from '.'

/** https://discord.com/developers/docs/resources/guild#guild-object-guild-structure */
export interface Guild {
  /** guild id */
  id: snowflake
  /** guild name (2-100 characters, excluding trailing and leading whitespace) */
  name: string
  /** icon hash */
  icon: string | null
  /** icon hash, returned when in the template object */
  icon_hash?: string | null
  /** splash hash */
  splash: string | null
  /** discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discovery_splash: string | null
  /** true if the user is the owner of the guild */
  owner?: boolean
  /** id of owner */
  owner_id: snowflake
  /** total permissions for the user in the guild (excludes overwrites and implicit permissions) */
  permissions?: string
  /** voice region id for the guild (deprecated) */
  region?: string | null
  /** id of afk channel */
  afk_channel_id: snowflake | null
  /** afk timeout in seconds */
  afk_timeout: integer
  /** true if the server widget is enabled */
  widget_enabled?: boolean
  /** the channel id that the widget will generate an invite to, or `null` if set to no invite */
  widget_channel_id?: snowflake | null
  /** verification level required for the guild */
  verification_level: integer
  /** default message notifications level */
  default_message_notifications: integer
  /** explicit content filter level */
  explicit_content_filter: integer
  /** roles in the guild */
  roles: Role[]
  /** custom guild emojis */
  emojis: Emoji[]
  /** enabled guild features */
  features: GuildFeatureStrings[]
  /** required MFA level for the guild */
  mfa_level: integer
  /** application id of the guild creator if it is bot-created */
  application_id: snowflake | null
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  system_channel_id: snowflake | null
  /** system channel flags */
  system_channel_flags: integer
  /** the id of the channel where Community guilds can display rules and/or guidelines */
  rules_channel_id: snowflake | null
  /** the maximum number of presences for the guild (`null` is always returned, apart from the largest of guilds) */
  max_presences?: integer | null
  /** the maximum number of members for the guild */
  max_members?: integer
  /** the vanity url code for the guild */
  vanity_url_code: string | null
  /** the description of a guild */
  description: string | null
  /** banner hash */
  banner: string | null
  /** premium tier (Server Boost level) */
  premium_tier: integer
  /** the number of boosts this guild currently has */
  premium_subscription_count?: integer
  /** the preferred locale of a Community guild; used in server discovery and notices from Discord, and sent in interactions; defaults to "en-US" */
  preferred_locale: string
  /** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id: snowflake | null
  /** the maximum amount of users in a video channel */
  max_video_channel_users?: integer
  /** the maximum amount of users in a stage video channel */
  max_stage_video_channel_users?: integer
  /** approximate number of members in this guild, returned from the `GET /guilds/<id>` and `/users/@me/guilds` endpoints when `with_counts` is `true` */
  approximate_member_count?: integer
  /** approximate number of non-offline members in this guild, returned from the `GET /guilds/<id>` and `/users/@me/guilds`  endpoints when `with_counts` is `true` */
  approximate_presence_count?: integer
  /** the welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcome_screen?: WelcomeScreen
  /** guild age-restriction level */
  nsfw_level: integer
  /** custom guild stickers */
  stickers?: Sticker[]
  /** whether the guild has the boost progress bar enabled */
  premium_progress_bar_enabled: boolean
  /** the id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
  safety_alerts_channel_id: snowflake | null
  /** the incidents data for this guild */
  incidents_data: IncidentsData | null
}

export namespace Guild {
  /** https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags */
  export enum SystemChannelFlag {
    /** Suppress member join notifications */
    SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
    /** Suppress server boost notifications */
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
    /** Suppress server setup tips */
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
    /** Hide member join sticker reply buttons */
    SUPPRESS_JOIN_NOTIFICATION_REPLIES = 1 << 3,
    /** Suppress role subscription purchase and renewal notifications */
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS = 1 << 4,
    /** Hide role subscription sticker reply buttons */
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES = 1 << 5,
  }

  /** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-flags */
  export enum MemberFlag {
    /** Member has left and rejoined the guild */
    DID_REJOIN = 1 << 0,
    /** Member has completed onboarding */
    COMPLETED_ONBOARDING = 1 << 1,
    /** Member is exempt from guild verification requirements */
    BYPASSES_VERIFICATION = 1 << 2,
    /** Member has started onboarding */
    STARTED_ONBOARDING = 1 << 3,
    /** Member is a guest and can only access the voice channel they were invited to */
    IS_GUEST = 1 << 4,
    /** Member has started Server Guide new member actions */
    STARTED_HOME_ACTIONS = 1 << 5,
    /** Member has completed Server Guide new member actions */
    COMPLETED_HOME_ACTIONS = 1 << 6,
    /** Member's username, display name, or nickname is blocked by AutoMod */
    AUTOMOD_QUARANTINED_USERNAME = 1 << 7,
    /** Member has dismissed the DM settings upsell */
    DM_SETTINGS_UPSELL_ACKNOWLEDGED = 1 << 9,
    /** Member's guild tag is blocked by AutoMod */
    AUTOMOD_QUARANTINED_GUILD_TAG = 1 << 10,
  }

  /** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-types */
  export enum PromptType {
    MULTIPLE_CHOICE = 0,
    DROPDOWN = 1,
  }

  /** https://discord.com/developers/docs/resources/guild#guild-preview-object-guild-preview-structure */
  export interface Preview {
    /** guild id */
    id: snowflake
    /** guild name (2-100 characters) */
    name: string
    /** icon hash */
    icon: string | null
    /** splash hash */
    splash: string | null
    /** discovery splash hash */
    discovery_splash: string | null
    /** custom guild emojis */
    emojis: Emoji[]
    /** enabled guild features */
    features: GuildFeatureStrings[]
    /** approximate number of members in this guild */
    approximate_member_count: integer
    /** approximate number of online members in this guild */
    approximate_presence_count: integer
    /** the description for the guild */
    description: string | null
    /** custom guild stickers */
    stickers: Sticker[]
  }

  /** https://discord.com/developers/docs/resources/guild#guild-widget-settings-object-guild-widget-settings-structure */
  export interface WidgetSettings {
    /** whether the widget is enabled */
    enabled: boolean
    /** the widget channel id */
    channel_id: snowflake | null
  }

  /** https://discord.com/developers/docs/resources/guild#guild-widget-object-guild-widget-structure */
  export interface Widget {
    /** guild id */
    id: snowflake
    /** guild name (2-100 characters) */
    name: string
    /** instant invite for the guilds specified widget invite channel */
    instant_invite: string | null
    /** voice and stage channels which are accessible by @everyone */
    channels: PartialChannel[]
    /** special widget user objects that includes users presence (Limit 100) */
    members: PartialUser[]
    /** number of online members in this guild */
    presence_count: integer
  }

  /** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
  export interface Member {
    /** the user this guild member represents */
    user?: User
    /** this user's guild nickname */
    nick?: string | null
    /** the member's guild avatar hash */
    avatar?: string | null
    /** the member's guild banner hash */
    banner?: string | null
    /** array of role object ids */
    roles: snowflake[]
    /** when the user joined the guild */
    joined_at: timestamp | null
    /** when the user started boosting the guild */
    premium_since?: timestamp | null
    /** whether the user is deafened in voice channels */
    deaf: boolean
    /** whether the user is muted in voice channels */
    mute: boolean
    /** guild member flags represented as a bit set, defaults to `0` */
    flags: integer
    /** whether the user has not yet passed the guild's Membership Screening requirements */
    pending?: boolean
    /** total permissions of the member in the channel, including overwrites, returned when in the interaction object */
    permissions?: string
    /** when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out */
    communication_disabled_until?: timestamp | null
    /** data for the member's guild avatar decoration */
    avatar_decoration_data?: AvatarDecorationData | null
    /** data for the member's collectibles */
    collectibles?: Collectibles | null
  }

  /** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
  export interface Integration {
    /** integration id */
    id: snowflake
    /** integration name */
    name: string
    /** integration type (twitch, youtube, discord, or guild_subscription) */
    type: string
    /** is this integration enabled */
    enabled: boolean
    /** is this integration syncing */
    syncing?: boolean
    /** id that this integration uses for "subscribers" */
    role_id?: snowflake
    /** whether emoticons should be synced for this integration (twitch only currently) */
    enable_emoticons?: boolean
    /** the behavior of expiring subscribers */
    expire_behavior?: IntegrationExpireBehavior
    /** the grace period (in days) before expiring subscribers */
    expire_grace_period?: integer
    /** user for this integration */
    user?: User
    /** integration account information */
    account: Account
    /** when this integration was last synced */
    synced_at?: timestamp
    /** how many subscribers this integration has */
    subscriber_count?: integer
    /** has this integration been revoked */
    revoked?: boolean
    /** The bot/OAuth2 application for discord integrations */
    application?: Application
    /** the scopes the application has been authorized for */
    scopes?: Oauth2Scopes[]
  }

  /** https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure */
  export interface IntegrationAccount {
    /** id of the account */
    id: string
    /** name of the account */
    name: string
  }

  /** https://discord.com/developers/docs/resources/guild#integration-application-object-integration-application-structure */
  export interface IntegrationApplication {
    /** the id of the app */
    id: snowflake
    /** the name of the app */
    name: string
    /** the icon hash of the app */
    icon: string | null
    /** the description of the app */
    description: string
    /** the bot associated with this application */
    bot?: User
  }

  /** https://discord.com/developers/docs/resources/guild#ban-object-ban-structure */
  export interface Ban {
    /** the reason for the ban */
    reason: string | null
    /** the banned user */
    user: User
  }

  /** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-structure */
  export interface WelcomeScreen {
    /** the server description shown in the welcome screen */
    description: string | null
    /** the channels shown in the welcome screen, up to 5 */
    welcome_channels: WelcomeScreenChannel[]
  }

  /** https://discord.com/developers/docs/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
  export interface WelcomeScreenChannel {
    /** the channel's id */
    channel_id: snowflake
    /** the description shown for the channel */
    description: string
    /** the emoji id, if the emoji is custom */
    emoji_id: snowflake | null
    /** the emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
    emoji_name: string | null
  }

  /** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-guild-onboarding-structure */
  export interface Onboarding {
    /** ID of the guild this onboarding is part of */
    guild_id: snowflake
    /** Prompts shown during onboarding and in customize community */
    prompts: OnboardingPrompt[]
    /** Channel IDs that members get opted into automatically */
    default_channel_ids: snowflake[]
    /** Whether onboarding is enabled in the guild */
    enabled: boolean
    /** Current mode of onboarding */
    mode: OnboardingMode
  }

  /** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-onboarding-prompt-structure */
  export interface OnboardingPrompt {
    /** ID of the prompt */
    id: snowflake
    /** Type of prompt */
    type: PromptType
    /** Options available within the prompt */
    options: PromptOption[]
    /** Title of the prompt */
    title: string
    /** Indicates whether users are limited to selecting one option for the prompt */
    single_select: boolean
    /** Indicates whether the prompt is required before a user completes the onboarding flow */
    required: boolean
    /** Indicates whether the prompt is present in the onboarding flow. If `false`, the prompt will only appear in the Channels & Roles tab */
    in_onboarding: boolean
  }

  /** https://discord.com/developers/docs/resources/guild#guild-onboarding-object-prompt-option-structure */
  export interface PromptOption {
    /** ID of the prompt option */
    id: snowflake
    /** IDs for channels a member is added to when the option is selected */
    channel_ids: snowflake[]
    /** IDs for roles assigned to a member when the option is selected */
    role_ids: snowflake[]
    /** Emoji of the option (see below) */
    emoji?: Emoji
    /** Emoji ID of the option (see below) */
    emoji_id?: snowflake
    /** Emoji name of the option (see below) */
    emoji_name?: string
    /** Whether the emoji is animated (see below) */
    emoji_animated?: boolean
    /** Title of the option */
    title: string
    /** Description of the option */
    description: string | null
  }

  /** https://discord.com/developers/docs/resources/guild#incidents-data-object-incidents-data-structure */
  export interface IncidentsData {
    /** when invites get enabled again */
    invites_disabled_until: timestamp | null
    /** when direct messages get enabled again */
    dms_disabled_until: timestamp | null
    /** when the dm spam was detected */
    dm_spam_detected_at?: timestamp | null
    /** when the raid was detected */
    raid_detected_at?: timestamp | null
  }

}

/** https://discord.com/developers/docs/resources/guild#get-guild-query-string-params */
export interface GetGuildParams {
  /** when `true`, will return approximate member and presence counts for the guild */
  with_counts?: Boolean
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-json-params */
export interface ModifyGuildParams {
  /** guild name */
  name: string
  /** guild voice region id (deprecated) */
  region: string | null
  /** verification level */
  verification_level: integer | null
  /** default message notification level */
  default_message_notifications: integer | null
  /** explicit content filter level */
  explicit_content_filter: integer | null
  /** id for afk channel */
  afk_channel_id: snowflake | null
  /** afk timeout in seconds, can be set to: 60, 300, 900, 1800, 3600 */
  afk_timeout: integer
  /** base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature) */
  icon: ImageData | null
  /** base64 16:9 png/jpeg image for the guild splash (when the server has the `INVITE_SPLASH` feature) */
  splash: ImageData | null
  /** base64 16:9 png/jpeg image for the guild discovery splash (when the server has the `DISCOVERABLE` feature) */
  discovery_splash: ImageData | null
  /** base64 16:9 png/jpeg image for the guild banner (when the server has the `BANNER` feature; can be animated gif when the server has the `ANIMATED_BANNER` feature) */
  banner: ImageData | null
  /** the id of the channel where guild notices such as welcome messages and boost events are posted */
  system_channel_id: snowflake | null
  /** system channel flags */
  system_channel_flags: integer
  /** the id of the channel where Community guilds display rules and/or guidelines */
  rules_channel_id: snowflake | null
  /** the id of the channel where admins and moderators of Community guilds receive notices from Discord */
  public_updates_channel_id: snowflake | null
  /** the preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferred_locale: string | null
  /** enabled guild features */
  features: GuildFeatureStrings[]
  /** the description for the guild */
  description: string | null
  /** whether the guild's boost progress bar should be enabled */
  premium_progress_bar_enabled: boolean
  /** the id of the channel where admins and moderators of Community guilds receive safety alerts from Discord */
  safety_alerts_channel_id: snowflake | null
}

/** https://discord.com/developers/docs/resources/guild#create-guild-channel-json-params */
export interface CreateGuildChannelParams {
  /** channel name (1-100 characters) */
  name: string
  /** the type of channel */
  type: integer
  /** channel topic (0-1024 characters) */
  topic: string
  /** the bitrate (in bits per second) of the voice or stage channel; min 8000 */
  bitrate: integer
  /** the user limit of the voice channel */
  user_limit: integer
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `BYPASS_SLOWMODE`, are unaffected */
  rate_limit_per_user: integer
  /** sorting position of the channel (channels with the same position are sorted by id) */
  position: integer
  /** the channel's permission overwrites */
  permission_overwrites: PartialOverwrite[]
  /** id of the parent category for a channel */
  parent_id: snowflake
  /** whether the channel is age-restricted */
  nsfw: boolean
  /** channel voice region id of the voice or stage channel, automatic when set to null */
  rtc_region: string
  /** the camera video quality mode of the voice channel */
  video_quality_mode: integer
  /** the default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity */
  default_auto_archive_duration: integer
  /** emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel */
  default_reaction_emoji: DefaultReaction
  /** set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel */
  available_tags: Tag[]
  /** the default sort order type used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels */
  default_sort_order: integer
  /** the default forum layout view used to display posts in `GUILD_FORUM` channels */
  default_forum_layout: integer
  /** the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
  default_thread_rate_limit_per_user: integer
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions-json-params */
export interface ModifyGuildChannelPositionsParams {
  /** channel id */
  id: snowflake
  /** sorting position of the channel (channels with the same position are sorted by id) */
  position?: integer | null
  /** syncs the permission overwrites with the new parent, if moving to a new category */
  lock_permissions?: boolean | null
  /** the new parent ID for the channel that is moved */
  parent_id?: snowflake | null
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members-query-string-params */
export interface ListGuildMembersParams {
  /** max number of members to return (1-1000) */
  limit: integer
  /** the highest user id in the previous page */
  after: snowflake
}

/** https://discord.com/developers/docs/resources/guild#search-guild-members-query-string-params */
export interface SearchGuildMembersParams {
  /** Query string to match username(s) and nickname(s) against. */
  query: string
  /** max number of members to return (1-1000) */
  limit: integer
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member-json-params */
export interface AddGuildMemberParams {
  /** an oauth2 access token granted with the `guilds.join` to the bot's application for the user you want to add to the guild */
  access_token: string
  /** value to set user's nickname to */
  nick: string
  /** array of role ids the member is assigned */
  roles: snowflake[]
  /** whether the user is muted in voice channels */
  mute: boolean
  /** whether the user is deafened in voice channels */
  deaf: boolean
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member-json-params */
export interface ModifyGuildMemberParams {
  /** value to set user's nickname to */
  nick: string
  /** array of role ids the member is assigned */
  roles: snowflake[]
  /** whether the user is muted in voice channels. Will throw a 400 error if the user is not in a voice channel */
  mute: boolean
  /** whether the user is deafened in voice channels. Will throw a 400 error if the user is not in a voice channel */
  deaf: boolean
  /** id of channel to move user to (if they are connected to voice) */
  channel_id: snowflake
  /** when the user's timeout will expire and the user will be able to communicate in the guild again (up to 28 days in the future), set to null to remove timeout. Will throw a 403 error if the user has the ADMINISTRATOR permission or is the owner of the guild */
  communication_disabled_until: timestamp
  /** guild member flags */
  flags: integer
}

/** https://discord.com/developers/docs/resources/guild#modify-current-member-json-params */
export interface ModifyCurrentMemberParams {
  /** value to set user's nickname to */
  nick?: string | null
  /** data URI base64 encoded banner image */
  banner?: string | null
  /** data URI base64 encoded avatar image */
  avatar?: string | null
  /** guild member bio */
  bio?: string | null
}

/** https://discord.com/developers/docs/resources/guild#modify-current-user-nick-json-params */
export interface ModifyCurrentUserNickParams {
  /** value to set user's nickname to */
  nick?: string | null
}

/** https://discord.com/developers/docs/resources/guild#get-guild-bans-query-string-params */
export interface GetGuildBansParams {
  /** number of users to return (up to maximum 1000) */
  limit?: number
  /** consider only users before given user id */
  before?: snowflake
  /** consider only users after given user id */
  after?: snowflake
}

/** https://discord.com/developers/docs/resources/guild#create-guild-ban-json-params */
export interface CreateGuildBanParams {
  /** number of days to delete messages for (0-7) (deprecated) */
  delete_message_days?: integer
  /** number of seconds to delete messages for, between 0 and 604800 (7 days) */
  delete_message_seconds?: integer
}

/** https://discord.com/developers/docs/resources/guild#bulk-guild-ban-json-params */
export interface BulkGuildBanParams {
  /** list of user ids to ban (max 200) */
  user_ids: snowflake[]
  /** number of seconds to delete messages for, between 0 and 604800 (7 days) */
  delete_message_seconds?: integer
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role-json-params */
export interface CreateGuildRoleParams {
  /** name of the role, max 100 characters */
  name: string
  /** bitwise value of the enabled/disabled permissions */
  permissions: string
  /** **Deprecated** RGB color value */
  color: integer
  /** the role's colors */
  colors: RoleColors
  /** whether the role should be displayed separately in the sidebar */
  hoist: boolean
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon: ImageData | null
  /** the role's unicode emoji as a standard emoji (if the guild has the `ROLE_ICONS` feature) */
  unicode_emoji: string | null
  /** whether the role should be mentionable */
  mentionable: boolean
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions-json-params */
export interface ModifyGuildRolePositionsParams {
  /** role */
  id: snowflake
  /** sorting position of the role (roles with the same position are sorted by id) */
  position?: integer | null
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-json-params */
export interface ModifyGuildRoleParams {
  /** name of the role, max 100 characters */
  name: string
  /** bitwise value of the enabled/disabled permissions */
  permissions: string
  /** **Deprecated** RGB color value */
  color: integer
  /** the role's colors */
  colors: RoleColors
  /** whether the role should be displayed separately in the sidebar */
  hoist: boolean
  /** the role's icon image (if the guild has the `ROLE_ICONS` feature) */
  icon: ImageData
  /** the role's unicode emoji as a standard emoji (if the guild has the `ROLE_ICONS` feature) */
  unicode_emoji: string
  /** whether the role should be mentionable */
  mentionable: boolean
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count-query-string-params */
export interface GetGuildPruneCountParams {
  /** number of days to count prune for (1-30) */
  days: integer
  /** role(s) to include */
  include_roles: String;CommaDelimitedArrayOfSnowflakes
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune-json-params */
export interface BeginGuildPruneParams {
  /** number of days to prune (1-30) */
  days: integer
  /** whether `pruned` is returned, discouraged for large guilds */
  compute_prune_count: boolean
  /** role(s) to include */
  include_roles: snowflake[]
  /** reason for the prune (deprecated) */
  reason?: string
}

/** https://discord.com/developers/docs/resources/guild#get-guild-widget-image-query-string-params */
export interface GetGuildWidgetImageParams {
  /** style of the widget image returned (see below) */
  style: string
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen-json-params */
export interface ModifyGuildWelcomeScreenParams {
  /** whether the welcome screen is enabled */
  enabled: boolean
  /** channels linked in the welcome screen and their display options */
  welcome_channels: WelcomeScreenChannel[]
  /** the server description to show in the welcome screen */
  description: string
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-onboarding-json-params */
export interface ModifyGuildOnboardingParams {
  /** Prompts shown during onboarding and in customize community */
  prompts: OnboardingPrompt[]
  /** Channel IDs that members get opted into automatically */
  default_channel_ids: snowflake[]
  /** Whether onboarding is enabled in the guild */
  enabled: boolean
  /** Current mode of onboarding */
  mode: OnboardingMode
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-incident-actions-json-params */
export interface ModifyGuildIncidentActionsParams {
  /** when invites will be enabled again */
  invites_disabled_until?: timestamp | null
  /** when direct messages will be enabled again */
  dms_disabled_until?: timestamp | null
}

declare module './internal' {
  interface Internal {
    /**
     * Returns the guild object for the given id. If `with_counts` is set to `true`, this endpoint will also return `approximate_member_count` and `approximate_presence_count` for the guild.
     * @see https://discord.com/developers/docs/resources/guild#get-guild
     */
    getGuild(guild_id: snowflake, params: GetGuildParams): Promise<Guild>
    /**
     * Returns the guild preview object for the given id.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-preview
     */
    getGuildPreview(guild_id: snowflake): Promise<GuildPreview>
    /**
     * Modify a guild's settings. Requires the `MANAGE_GUILD` permission. Returns the updated guild object on success. Fires a Guild Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild
     */
    modifyGuild(guild_id: snowflake, params: ModifyGuildParams): Promise<Guild>
    /**
     * Returns a list of guild channel objects. Does not include threads.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-channels
     */
    getGuildChannels(guild_id: snowflake): Promise<ListOfGuildChannel>
    /**
     * Create a new channel object for the guild. Requires the `MANAGE_CHANNELS` permission. If setting permission overwrites, only permissions your bot has in the guild can be allowed/denied. Setting `MANAGE_ROLES` permission in channels is only possible for guild administrators. Returns the new channel object on success. Fires a Channel Create Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-channel
     */
    createGuildChannel(guild_id: snowflake, params: CreateGuildChannelParams): Promise<Channel>
    /**
     * Modify the positions of a set of channel objects for the guild. Requires `MANAGE_CHANNELS` permission. Returns a 204 empty response on success. Fires multiple Channel Update Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-channel-positions
     */
    modifyGuildChannelPositions(guild_id: snowflake, params: ModifyGuildChannelPositionsParams): Promise<void>
    /**
     * Returns all active threads in the guild, including public and private threads. Threads are ordered by their `id`, in descending order.
     * @see https://discord.com/developers/docs/resources/guild#list-active-guild-threads
     */
    listActiveGuildThreads(guild_id: snowflake): Promise<void>
    /**
     * Returns a guild member object for the specified user.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-member
     */
    getGuildMember(guild_id: snowflake, user_id: snowflake): Promise<GuildMember>
    /**
     * Returns a list of guild member objects that are members of the guild.
     * @see https://discord.com/developers/docs/resources/guild#list-guild-members
     */
    listGuildMembers(guild_id: snowflake, params: ListGuildMembersParams): Promise<ListOfGuildMember>
    /**
     * Returns a list of guild member objects whose username or nickname starts with a provided string.
     * @see https://discord.com/developers/docs/resources/guild#search-guild-members
     */
    searchGuildMembers(guild_id: snowflake, params: SearchGuildMembersParams): Promise<ListOfGuildMember>
    /**
     * Adds a user to the guild, provided you have a valid oauth2 access token for the user with the `guilds.join` scope. Returns a 201 Created with the guild member as the body, or 204 No Content if the user is already a member of the guild. Fires a Guild Member Add Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member
     */
    addGuildMember(guild_id: snowflake, user_id: snowflake, params: AddGuildMemberParams): Promise<void>
    /**
     * Modify attributes of a guild member. Returns a 200 OK with the guild member as the body. Fires a Guild Member Update Gateway event. If the `channel_id` is set to null, this will force the target user to be disconnected from voice.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-member
     */
    modifyGuildMember(guild_id: snowflake, user_id: snowflake, params: ModifyGuildMemberParams): Promise<void>
    /**
     * Modifies the current member in a guild. Returns a 200 with the updated member object on success. Fires a Guild Member Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-current-member
     */
    modifyCurrentMember(guild_id: snowflake, params: ModifyCurrentMemberParams): Promise<200WithTheUpdatedMember>
    /**
     * <Danger>
     * @see https://discord.com/developers/docs/resources/guild#modify-current-user-nick
     */
    modifyCurrentUserNick(guild_id: snowflake, params: ModifyCurrentUserNickParams): Promise<void>
    /**
     * Adds a role to a guild member. Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. Fires a Guild Member Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
     */
    addGuildMemberRole(guild_id: snowflake, user_id: snowflake, role_id: snowflake): Promise<void>
    /**
     * Removes a role from a guild member. Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. Fires a Guild Member Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member-role
     */
    removeGuildMemberRole(guild_id: snowflake, user_id: snowflake, role_id: snowflake): Promise<void>
    /**
     * Remove a member from a guild. Requires `KICK_MEMBERS` permission. Returns a 204 empty response on success. Fires a Guild Member Remove Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
     */
    removeGuildMember(guild_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Returns a list of ban objects for the users banned from this guild. Requires the `BAN_MEMBERS` permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-bans
     */
    getGuildBans(guild_id: snowflake, params: GetGuildBansParams): Promise<ListOfBan>
    /**
     * Returns a ban object for the given user or a 404 not found if the ban cannot be found. Requires the `BAN_MEMBERS` permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-ban
     */
    getGuildBan(guild_id: snowflake, user_id: snowflake): Promise<Ban>
    /**
     * Create a guild ban, and optionally delete previous messages sent by the banned user. Requires the `BAN_MEMBERS` permission. Returns a 204 empty response on success. Fires a Guild Ban Add Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-ban
     */
    createGuildBan(guild_id: snowflake, user_id: snowflake, params: CreateGuildBanParams): Promise<void>
    /**
     * Remove the ban for a user. Requires the `BAN_MEMBERS` permissions. Returns a 204 empty response on success. Fires a Guild Ban Remove Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
     */
    removeGuildBan(guild_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Ban up to 200 users from a guild, and optionally delete previous messages sent by the banned users. Requires both the `BAN_MEMBERS` and `MANAGE_GUILD` permissions. Returns a 200 response on success, including the fields `banned_users` with the IDs of the banned users and `failed_users` with IDs that could not be banned or were already banned.
     * @see https://discord.com/developers/docs/resources/guild#bulk-guild-ban
     */
    bulkGuildBan(guild_id: snowflake, params: BulkGuildBanParams): Promise<void>
    /**
     * Returns a list of role objects for the guild.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-roles
     */
    getGuildRoles(guild_id: snowflake): Promise<ListOfRole>
    /**
     * Returns a role object for the specified role.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-role
     */
    getGuildRole(guild_id: snowflake, role_id: snowflake): Promise<Role>
    /**
     * Returns a map of role IDs to the number of members with the role. Does not include the @everyone role.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-role-member-counts
     */
    getGuildRoleMemberCounts(guild_id: snowflake): Promise<void>
    /**
     * Create a new role for the guild. Requires the `MANAGE_ROLES` permission. Returns the new role object on success. Fires a Guild Role Create Gateway event. All JSON params are optional.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-role
     */
    createGuildRole(guild_id: snowflake, params: CreateGuildRoleParams): Promise<Role>
    /**
     * Modify the positions of a set of role objects for the guild. Requires the `MANAGE_ROLES` permission. Returns a list of all of the guild's role objects on success. Fires multiple Guild Role Update Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
     */
    modifyGuildRolePositions(guild_id: snowflake, params: ModifyGuildRolePositionsParams): Promise<ListOfAllOfTheGuild'sRole>
    /**
     * Modify a guild role. Requires the `MANAGE_ROLES` permission. Returns the updated role on success. Fires a Guild Role Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role
     */
    modifyGuildRole(guild_id: snowflake, role_id: snowflake, params: ModifyGuildRoleParams): Promise<void>
    /**
     * Delete a guild role. Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. Fires a Guild Role Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
     */
    deleteGuildRole(guild_id: snowflake, role_id: snowflake): Promise<void>
    /**
     * Returns an object with one `pruned` key indicating the number of members that would be removed in a prune operation. Requires the `MANAGE_GUILD` and `KICK_MEMBERS` permissions.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-prune-count
     */
    getGuildPruneCount(guild_id: snowflake, params: GetGuildPruneCountParams): Promise<void>
    /**
     * Begin a prune operation. Requires the `MANAGE_GUILD` and `KICK_MEMBERS` permissions. Returns an object with one `pruned` key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the `compute_prune_count` option to `false`, forcing `pruned` to `null`. Fires multiple Guild Member Remove Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#begin-guild-prune
     */
    beginGuildPrune(guild_id: snowflake, params: BeginGuildPruneParams): Promise<void>
    /**
     * Returns a list of voice region objects for the guild. Unlike the similar `/voice` route, this returns VIP servers when the guild is VIP-enabled.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-voice-regions
     */
    getGuildVoiceRegions(guild_id: snowflake): Promise<ListOfVoiceRegion>
    /**
     * Returns a list of invite objects. Requires the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission. Invite Metadata is included with the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
     */
    getGuildInvites(guild_id: snowflake): Promise<ListOfInvite>
    /**
     * Returns a list of integration objects for the guild. Requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-integrations
     */
    getGuildIntegrations(guild_id: snowflake): Promise<ListOfIntegration>
    /**
     * Delete the attached integration object for the guild. Deletes any associated webhooks and kicks the associated bot if there is one. Requires the `MANAGE_GUILD` permission. Returns a 204 empty response on success. Fires Guild Integrations Update and Integration Delete Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-integration
     */
    deleteGuildIntegration(guild_id: snowflake, integration_id: snowflake): Promise<void>
    /**
     * Returns a guild widget settings object. Requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-settings
     */
    getGuildWidgetSettings(guild_id: snowflake): Promise<GuildWidgetSettings>
    /**
     * Modify a guild widget settings object for the guild. All attributes may be passed in with JSON and modified. Requires the `MANAGE_GUILD` permission. Returns the updated guild widget settings object. Fires a Guild Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-widget
     */
    modifyGuildWidget(guild_id: snowflake): Promise<GuildWidgetSettings>
    /**
     * Returns the widget for the guild. Fires an Invite Create Gateway event when an invite channel is defined and a new Invite is generated.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget
     */
    getGuildWidget(guild_id: snowflake): Promise<void>
    /**
     * Returns a partial invite object for guilds with that feature enabled. Requires the `MANAGE_GUILD` permission. `code` will be null if a vanity url for the guild is not set.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-vanity-url
     */
    getGuildVanityUrl(guild_id: snowflake): Promise<PartialInvite>
    /**
     * Returns a PNG image widget for the guild. Requires no permissions or authentication.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-widget-image
     */
    getGuildWidgetImage(guild_id: snowflake, params: GetGuildWidgetImageParams): Promise<void>
    /**
     * Returns the Welcome Screen object for the guild. If the welcome screen is not enabled, the `MANAGE_GUILD` permission is required.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-welcome-screen
     */
    getGuildWelcomeScreen(guild_id: snowflake): Promise<WelcomeScreen>
    /**
     * Modify the guild's Welcome Screen. Requires the `MANAGE_GUILD` permission. Returns the updated Welcome Screen object. May fire a Guild Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen
     */
    modifyGuildWelcomeScreen(guild_id: snowflake, params: ModifyGuildWelcomeScreenParams): Promise<WelcomeScreen>
    /**
     * Returns the Onboarding object for the guild.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-onboarding
     */
    getGuildOnboarding(guild_id: snowflake): Promise<Onboarding>
    /**
     * Modifies the onboarding configuration of the guild. Returns a 200 with the Onboarding object for the guild. Requires the `MANAGE_GUILD` and `MANAGE_ROLES` permissions.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-onboarding
     */
    modifyGuildOnboarding(guild_id: snowflake, params: ModifyGuildOnboardingParams): Promise<200WithTheOnboarding>
    /**
     * Modifies the incident actions of the guild. Returns a 200 with the Incidents Data object for the guild. Requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-incident-actions
     */
    modifyGuildIncidentActions(guild_id: snowflake, params: ModifyGuildIncidentActionsParams): Promise<200WithTheIncidentsData>
  }
}

Internal.define({
  '/guilds/{guild.id}': {
    GET: 'getGuild',
    PATCH: 'modifyGuild',
  },
  '/guilds/{guild.id}/preview': {
    GET: 'getGuildPreview',
  },
  '/guilds/{guild.id}/channels': {
    GET: 'getGuildChannels',
    POST: 'createGuildChannel',
    PATCH: 'modifyGuildChannelPositions',
  },
  '/guilds/{guild.id}/threads/active': {
    GET: 'listActiveGuildThreads',
  },
  '/guilds/{guild.id}/members/{user.id}': {
    GET: 'getGuildMember',
    PUT: 'addGuildMember',
    PATCH: 'modifyGuildMember',
    DELETE: 'removeGuildMember',
  },
  '/guilds/{guild.id}/members': {
    GET: 'listGuildMembers',
  },
  '/guilds/{guild.id}/members/search': {
    GET: 'searchGuildMembers',
  },
  '/guilds/{guild.id}/members/@me': {
    PATCH: 'modifyCurrentMember',
  },
  '/guilds/{guild.id}/members/@me/nick': {
    PATCH: 'modifyCurrentUserNick',
  },
  '/guilds/{guild.id}/members/{user.id}/roles/{role.id}': {
    PUT: 'addGuildMemberRole',
    DELETE: 'removeGuildMemberRole',
  },
  '/guilds/{guild.id}/bans': {
    GET: 'getGuildBans',
  },
  '/guilds/{guild.id}/bans/{user.id}': {
    GET: 'getGuildBan',
    PUT: 'createGuildBan',
    DELETE: 'removeGuildBan',
  },
  '/guilds/{guild.id}/bulk-ban': {
    POST: 'bulkGuildBan',
  },
  '/guilds/{guild.id}/roles': {
    GET: 'getGuildRoles',
    POST: 'createGuildRole',
    PATCH: 'modifyGuildRolePositions',
  },
  '/guilds/{guild.id}/roles/{role.id}': {
    GET: 'getGuildRole',
    PATCH: 'modifyGuildRole',
    DELETE: 'deleteGuildRole',
  },
  '/guilds/{guild.id}/roles/member-counts': {
    GET: 'getGuildRoleMemberCounts',
  },
  '/guilds/{guild.id}/prune': {
    GET: 'getGuildPruneCount',
    POST: 'beginGuildPrune',
  },
  '/guilds/{guild.id}/regions': {
    GET: 'getGuildVoiceRegions',
  },
  '/guilds/{guild.id}/invites': {
    GET: 'getGuildInvites',
  },
  '/guilds/{guild.id}/integrations': {
    GET: 'getGuildIntegrations',
  },
  '/guilds/{guild.id}/integrations/{integration.id}': {
    DELETE: 'deleteGuildIntegration',
  },
  '/guilds/{guild.id}/widget': {
    GET: 'getGuildWidgetSettings',
    PATCH: 'modifyGuildWidget',
  },
  '/guilds/{guild.id}/widget.json': {
    GET: 'getGuildWidget',
  },
  '/guilds/{guild.id}/vanity-url': {
    GET: 'getGuildVanityUrl',
  },
  '/guilds/{guild.id}/widget.png': {
    GET: 'getGuildWidgetImage',
  },
  '/guilds/{guild.id}/welcome-screen': {
    GET: 'getGuildWelcomeScreen',
    PATCH: 'modifyGuildWelcomeScreen',
  },
  '/guilds/{guild.id}/onboarding': {
    GET: 'getGuildOnboarding',
    PUT: 'modifyGuildOnboarding',
  },
  '/guilds/{guild.id}/incident-actions': {
    PUT: 'modifyGuildIncidentActions',
  },
})
