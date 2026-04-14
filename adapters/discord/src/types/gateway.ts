import { Application, AutoModeration, Channel, Emoji, Guild, GuildScheduledEvent, integer, Permission, snowflake, Soundboard, StageInstance, Sticker, timestamp, User, Voice } from '.'

/** https://discord.com/developers/docs/events/gateway-events#identify-identify-structure */
export interface Gateway {
  /** Authentication token */
  token: string
  /** Connection properties */
  properties: Gateway.IdentifyConnectionProperties
  /** Whether this connection supports compression of packets */
  compress?: boolean
  /** Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list */
  large_threshold?: integer
  /** Used for Guild Sharding */
  shard?: [integer, integer][]
  /** Presence structure for initial presence information */
  presence?: Gateway.PresenceUpdate
  /** Gateway Intents you wish to receive */
  intents: integer
}

export namespace Gateway {
  /** https://discord.com/developers/docs/events/gateway-events#update-presence-status-types */
  export enum StatusType {
    /** Online */
    ONLINE = 'online',
    /** Do Not Disturb */
    DND = 'dnd',
    /** AFK */
    IDLE = 'idle',
    /** Invisible and shown as offline */
    INVISIBLE = 'invisible',
    /** Offline */
    OFFLINE = 'offline',
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-types */
  export enum ActivityType {
    /** 0 */
    PLAYING = 'playing',
    /** 1 */
    STREAMING = 'streaming',
    /** 2 */
    LISTENING = 'listening',
    /** 3 */
    WATCHING = 'watching',
    /** 4 */
    CUSTOM = 'custom',
    /** 5 */
    COMPETING = 'competing',
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-status-display-types */
  export enum StatusDisplayType {
    /** 0 */
    NAME = 'name',
    /** 1 */
    STATE = 'state',
    /** 2 */
    DETAILS = 'details',
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-asset-image */
  export enum ActivityAssetImage {
    /** `{application_asset_id}` */
    APPLICATION_ASSET = 'application_asset',
    /** `mp:{image_id}` */
    MEDIA_PROXY_IMAGE = 'media_proxy_image',
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-flags */
  export enum ActivityFlag {
    INSTANCE = 1 << 0,
    JOIN = 1 << 1,
    SPECTATE = 1 << 2,
    JOIN_REQUEST = 1 << 3,
    SYNC = 1 << 4,
    PLAY = 1 << 5,
    PARTY_PRIVACY_FRIENDS = 1 << 6,
    PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
    EMBEDDED = 1 << 8,
  }

  /** https://discord.com/developers/docs/events/gateway-events#voice-channel-effect-send-animation-types */
  export enum AnimationType {
    /** A fun animation, sent by a Nitro subscriber */
    PREMIUM = 0,
    /** The standard animation */
    BASIC = 1,
  }

  /** https://discord.com/developers/docs/events/gateway-events#identify-identify-connection-properties */
  export interface IdentifyConnectionProperties {
    /** Your operating system */
    os: string
    /** Your library name */
    browser: string
    /** Your library name */
    device: string
  }

  /** https://discord.com/developers/docs/events/gateway-events#resume-resume-structure */
  export interface Resume {
    /** Session token */
    token: string
    /** Session ID */
    session_id: string
    /** Last sequence number received */
    seq: integer
  }

  /** https://discord.com/developers/docs/events/gateway-events#request-guild-members-request-guild-members-structure */
  export interface RequestGuildMembers {
    /** ID of the guild to get members for */
    guild_id: snowflake
    /** string that username starts with, or an empty string to return all members */
    query?: string
    /** maximum number of members to send matching the `query`; a limit of `0` can be used with an empty string `query` to return all members */
    limit: integer
    /** used to specify if we want the presences of the matched members */
    presences?: boolean
    /** used to specify which users you wish to fetch */
    user_ids?: snowflake | snowflake[]
    /** nonce to identify the Guild Members Chunk response */
    nonce?: string
  }

  /** https://discord.com/developers/docs/events/gateway-events#request-soundboard-sounds-request-soundboard-sounds-structure */
  export interface RequestSoundboardSounds {
    /** IDs of the guilds to get soundboard sounds for */
    guild_ids: snowflake[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#update-voice-state-gateway-voice-state-update-structure */
  export interface VoiceStateUpdate {
    /** ID of the guild */
    guild_id: snowflake
    /** ID of the voice channel client wants to join (null if disconnecting) */
    channel_id: snowflake | null
    /** Whether the client is muted */
    self_mute: boolean
    /** Whether the client deafened */
    self_deaf: boolean
  }

  /** https://discord.com/developers/docs/events/gateway-events#update-presence-gateway-presence-update-structure */
  export interface PresenceUpdate {
    /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
    since: integer | null
    /** User's activities */
    activities: Gateway.Activity[]
    /** User's new status */
    status: string
    /** Whether or not the client is afk */
    afk: boolean
  }

  /** https://discord.com/developers/docs/events/gateway-events#hello-hello-structure */
  export interface Hello {
    /** Interval (in milliseconds) an app should heartbeat with */
    heartbeat_interval: integer
  }

  /** https://discord.com/developers/docs/events/gateway-events#ready-ready-event-fields */
  export interface ReadyEventFields {
    /** API version */
    v: integer
    /** Information about the user including email */
    user: User
    /** Guilds the user is in */
    guilds: unknown[]
    /** Used for resuming connections */
    session_id: string
    /** Gateway URL for resuming connections */
    resume_gateway_url: string
    /** Shard information associated with this session, if sent when identifying */
    shard?: [integer, integer][]
    /** Contains `id` and `flags` */
    application: Partial<Application>
  }

  /** https://discord.com/developers/docs/events/gateway-events#auto-moderation-action-execution-auto-moderation-action-execution-event-fields */
  export interface AutoModerationActionExecutionEventFields {
    /** ID of the guild in which action was executed */
    guild_id: snowflake
    /** Action which was executed */
    action: AutoModeration.Action
    /** ID of the rule which action belongs to */
    rule_id: snowflake
    /** Trigger type of rule which was triggered */
    rule_trigger_type: AutoModeration.TriggerType
    /** ID of the user which generated the content which triggered the rule */
    user_id: snowflake
    /** ID of the channel in which user content was posted */
    channel_id?: snowflake
    /** ID of any user message which content belongs to * */
    message_id?: snowflake
    /** ID of any system auto moderation messages posted as a result of this action ** */
    alert_system_message_id?: snowflake
    /** User-generated text content */
    content: string
    /** Word or phrase configured in the rule that triggered the rule */
    matched_keyword: string | null
    /** Substring in content that triggered the rule */
    matched_content: string | null
  }

  /** https://discord.com/developers/docs/events/gateway-events#thread-list-sync-thread-list-sync-event-fields */
  export interface ThreadListSyncEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** Parent channel IDs whose threads are being synced.  If omitted, then threads were synced for the entire guild.  This array may contain channel_ids that have no active threads as well, so you know to clear that data. */
    channel_ids?: snowflake[]
    /** All active threads in the given channels that the current user can access */
    threads: Channel[]
    /** All thread member objects from the synced threads for the current user, indicating which threads the current user has been added to */
    members: Channel.ThreadMember[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#thread-member-update-thread-member-update-event-extra-fields */
  export interface ThreadMemberUpdateEventExtraFields {
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#thread-members-update-thread-members-update-event-fields */
  export interface ThreadMembersUpdateEventFields {
    /** ID of the thread */
    id: snowflake
    /** ID of the guild */
    guild_id: snowflake
    /** Approximate number of members in the thread, capped at 50 */
    member_count: integer
    /** Users who were added to the thread */
    added_members?: Channel.ThreadMember[]
    /** ID of the users who were removed from the thread */
    removed_member_ids?: snowflake[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#channel-pins-update-channel-pins-update-event-fields */
  export interface ChannelPinsUpdateEventFields {
    /** ID of the guild */
    guild_id?: snowflake
    /** ID of the channel */
    channel_id: snowflake
    /** Time at which the most recent pinned message was pinned */
    last_pin_timestamp?: timestamp | null
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-create-guild-create-extra-fields */
  export interface GuildCreateExtraFields {
    /** When this guild was joined at */
    joined_at: timestamp
    /** `true` if this is considered a large guild */
    large: boolean
    /** `true` if this guild is unavailable due to an outage */
    unavailable?: boolean
    /** Total number of members in this guild */
    member_count: integer
    /** States of members currently in voice channels; lacks the `guild_id` key */
    voice_states: Partial<Voice>[]
    /** Users in the guild */
    members: Guild.Member[]
    /** Channels in the guild */
    channels: Channel[]
    /** All active threads in the guild that current user has permission to view */
    threads: Channel[]
    /** Presences of the members in the guild, will only include non-offline members if the size is greater than `large threshold` */
    presences: Partial<Gateway.PresenceUpdateEventFields>[]
    /** Stage instances in the guild */
    stage_instances: StageInstance[]
    /** Scheduled events in the guild */
    guild_scheduled_events: GuildScheduledEvent[]
    /** Soundboard sounds in the guild */
    soundboard_sounds: Soundboard[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-audit-log-entry-create-guild-audit-log-entry-create-event-extra-fields */
  export interface GuildAuditLogEntryCreateEventExtraFields {
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-ban-add-guild-ban-add-event-fields */
  export interface GuildBanAddEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** User who was banned */
    user: User
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-ban-remove-guild-ban-remove-event-fields */
  export interface GuildBanRemoveEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** User who was unbanned */
    user: User
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-emojis-update-guild-emojis-update-event-fields */
  export interface GuildEmojisUpdateEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** Array of emojis */
    emojis: Emoji[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-stickers-update-guild-stickers-update-event-fields */
  export interface GuildStickersUpdateEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** Array of stickers */
    stickers: Sticker[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-integrations-update-guild-integrations-update-event-fields */
  export interface GuildIntegrationsUpdateEventFields {
    /** ID of the guild whose integrations were updated */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-member-add-guild-member-add-extra-fields */
  export interface GuildMemberAddExtraFields {
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-member-remove-guild-member-remove-event-fields */
  export interface GuildMemberRemoveEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** User who was removed */
    user: User
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-member-update-guild-member-update-event-fields */
  export interface GuildMemberUpdateEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** User role ids */
    roles: snowflake[]
    /** User */
    user: User
    /** Nickname of the user in the guild */
    nick?: string | null
    /** Member's guild avatar hash */
    avatar: string | null
    /** Member's guild banner hash */
    banner: string | null
    /** When the user joined the guild */
    joined_at: timestamp | null
    /** When the user starting boosting the guild */
    premium_since?: timestamp | null
    /** Whether the user is deafened in voice channels */
    deaf?: boolean
    /** Whether the user is muted in voice channels */
    mute?: boolean
    /** Whether the user has not yet passed the guild's Membership Screening requirements */
    pending?: boolean
    /** When the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out */
    communication_disabled_until?: timestamp | null
    /** Data for the member's guild avatar decoration */
    avatar_decoration_data?: User.AvatarDecorationData | null
    /** data for the member's collectibles */
    collectibles?: User.Collectible | null
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-members-chunk-guild-members-chunk-event-fields */
  export interface GuildMembersChunkEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** Set of guild members */
    members: Guild.Member[]
    /** Chunk index in the expected chunks for this response (`0 <= chunk_index < chunk_count`) */
    chunk_index: integer
    /** Total number of expected chunks for this response */
    chunk_count: integer
    /** When passing an invalid ID to `REQUEST_GUILD_MEMBERS`, it will be returned here */
    not_found?: unknown[]
    /** When passing `true` to `REQUEST_GUILD_MEMBERS`, presences of the returned members will be here */
    presences?: Gateway.PresenceUpdateEventFields[]
    /** Nonce used in the Guild Members Request */
    nonce?: string
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-role-create-guild-role-create-event-fields */
  export interface GuildRoleCreateEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** Role that was created */
    role: Permission
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-role-update-guild-role-update-event-fields */
  export interface GuildRoleUpdateEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** Role that was updated */
    role: Permission
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-role-delete-guild-role-delete-event-fields */
  export interface GuildRoleDeleteEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** ID of the role */
    role_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-add-guild-scheduled-event-user-add-event-fields */
  export interface GuildScheduledEventUserAddEventFields {
    /** ID of the guild scheduled event */
    guild_scheduled_event_id: snowflake
    /** ID of the user */
    user_id: snowflake
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-scheduled-event-user-remove-guild-scheduled-event-user-remove-event-fields */
  export interface GuildScheduledEventUserRemoveEventFields {
    /** ID of the guild scheduled event */
    guild_scheduled_event_id: snowflake
    /** ID of the user */
    user_id: snowflake
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sound-delete-guild-soundboard-sound-delete-event-fields */
  export interface GuildSoundboardSoundDeleteEventFields {
    /** ID of the sound that was deleted */
    sound_id: snowflake
    /** ID of the guild the sound was in */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#guild-soundboard-sounds-update-guild-soundboard-sounds-update-event-fields */
  export interface GuildSoundboardSoundsUpdateEventFields {
    /** The guild's soundboard sounds */
    soundboard_sounds: Soundboard[]
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#soundboard-sounds-soundboard-sounds-event-fields */
  export interface SoundboardSoundsEventFields {
    /** The guild's soundboard sounds */
    soundboard_sounds: Soundboard[]
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#integration-create-integration-create-event-additional-fields */
  export interface IntegrationCreateEventAdditionalFields {
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#integration-update-integration-update-event-additional-fields */
  export interface IntegrationUpdateEventAdditionalFields {
    /** ID of the guild */
    guild_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#integration-delete-integration-delete-event-fields */
  export interface IntegrationDeleteEventFields {
    /** Integration ID */
    id: snowflake
    /** ID of the guild */
    guild_id: snowflake
    /** ID of the bot/OAuth2 application for this discord integration */
    application_id?: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#invite-create-invite-create-event-fields */
  export interface InviteCreateEventFields {
    /** Channel the invite is for */
    channel_id: snowflake
    /** Unique invite code */
    code: string
    /** Time at which the invite was created */
    created_at: timestamp
    /** Guild of the invite */
    guild_id?: snowflake
    /** User that created the invite */
    inviter?: User
    /** How long the invite is valid for (in seconds) */
    max_age: integer
    /** Maximum number of times the invite can be used */
    max_uses: integer
    /** Type of target for this voice channel invite */
    target_type?: integer
    /** User whose stream to display for this voice channel stream invite */
    target_user?: User
    /** Embedded application to open for this voice channel embedded application invite */
    target_application?: Partial<Application>
    /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
    temporary: boolean
    /** How many times the invite has been used (always will be 0) */
    uses: integer
    /** the expiration date of this invite */
    expires_at: timestamp | null
    /** the role ID(s) for roles in the guild given to the users that accept this invite */
    role_ids?: snowflake[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#invite-delete-invite-delete-event-fields */
  export interface InviteDeleteEventFields {
    /** Channel of the invite */
    channel_id: snowflake
    /** Guild of the invite */
    guild_id?: snowflake
    /** Unique invite code */
    code: string
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-create-message-create-extra-fields */
  export interface MessageCreateExtraFields {
    /** ID of the guild the message was sent in - unless it is an ephemeral message */
    guild_id?: snowflake
    /** Member properties for this message's author. Missing for ephemeral messages and messages from webhooks */
    member?: Partial<Guild.Member>
    /** Users specifically mentioned in the message */
    mentions: Partial<User>[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-delete-message-delete-event-fields */
  export interface MessageDeleteEventFields {
    /** ID of the message */
    id: snowflake
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-delete-bulk-message-delete-bulk-event-fields */
  export interface MessageDeleteBulkEventFields {
    /** IDs of the messages */
    ids: snowflake[]
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-reaction-add-message-reaction-add-event-fields */
  export interface MessageReactionAddEventFields {
    /** ID of the user */
    user_id: snowflake
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the message */
    message_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
    /** Member who reacted if this happened in a guild */
    member?: Guild.Member
    /** Emoji used to react - example */
    emoji: Partial<Emoji>
    /** ID of the user who authored the message which was reacted to */
    message_author_id?: snowflake
    /** true if this is a super-reaction */
    burst: boolean
    /** Colors used for super-reaction animation in "#rrggbb" format */
    burst_colors?: string[]
    /** The type of reaction */
    type: integer
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-message-reaction-remove-event-fields */
  export interface MessageReactionRemoveEventFields {
    /** ID of the user */
    user_id: snowflake
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the message */
    message_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
    /** Emoji used to react - example */
    emoji: Partial<Emoji>
    /** true if this was a super-reaction */
    burst: boolean
    /** The type of reaction */
    type: integer
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-all-message-reaction-remove-all-event-fields */
  export interface MessageReactionRemoveAllEventFields {
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the message */
    message_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-reaction-remove-emoji-message-reaction-remove-emoji-event-fields */
  export interface MessageReactionRemoveEmojiEventFields {
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
    /** ID of the message */
    message_id: snowflake
    /** Emoji that was removed */
    emoji: Partial<Emoji>
  }

  /** https://discord.com/developers/docs/events/gateway-events#presence-update-presence-update-event-fields */
  export interface PresenceUpdateEventFields {
    /** User whose presence is being updated */
    user: User
    /** ID of the guild */
    guild_id: snowflake
    /** Either "idle", "dnd", "online", or "offline" */
    status: string
    /** User's current activities */
    activities: Gateway.Activity[]
    /** User's platform-dependent status */
    client_status: unknown
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-structure */
  export interface Activity {
    /** Activity's name */
    name: string
    /** Activity type */
    type: Gateway.ActivityType
    /** Stream URL, is validated when type is 1 */
    url?: string | null
    /** Unix timestamp (in milliseconds) of when the activity was added to the user's session */
    created_at: integer
    /** Unix timestamps for start and/or end of the game */
    timestamps?: Gateway.ActivityTimestamps
    /** Application ID for the game */
    application_id?: snowflake
    /** Status display type; controls which field is displayed in the user's status text in the member list */
    status_display_type?: Gateway.StatusDisplayType | null
    /** What the player is currently doing */
    details?: string | null
    /** URL that is linked when clicking on the details text */
    details_url?: string | null
    /** User's current party status, or text used for a custom status */
    state?: string | null
    /** URL that is linked when clicking on the state text */
    state_url?: string | null
    /** Emoji used for a custom status */
    emoji?: Gateway.ActivityEmoji | null
    /** Information for the current party of the player */
    party?: Gateway.ActivityParty
    /** Images for the presence and their hover texts */
    assets?: Gateway.ActivityAssets
    /** Secrets for Rich Presence joining and spectating */
    secrets?: Gateway.ActivitySecrets
    /** Whether or not the activity is an instanced game session */
    instance?: boolean
    /** Activity flags `OR`d together, describes what the payload includes */
    flags?: integer
    /** Custom buttons shown in the Rich Presence (max 2) */
    buttons?: Gateway.ActivityButtons[]
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-timestamps */
  export interface ActivityTimestamps {
    /** Unix time (in milliseconds) of when the activity started */
    start?: integer
    /** Unix time (in milliseconds) of when the activity ends */
    end?: integer
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-emoji */
  export interface ActivityEmoji {
    /** Name of the emoji */
    name: string
    /** ID of the emoji */
    id?: snowflake
    /** Whether the emoji is animated */
    animated?: boolean
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-party */
  export interface ActivityParty {
    /** ID of the party */
    id?: string
    /** Used to show the party's current and maximum size */
    size?: [integer, integer][]
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-assets */
  export interface ActivityAssets {
    /** See Activity Asset Image */
    large_image?: string
    /** Text displayed when hovering over the large image of the activity */
    large_text?: string
    /** URL that is opened when clicking on the large image */
    large_url?: string
    /** See Activity Asset Image */
    small_image?: string
    /** Text displayed when hovering over the small image of the activity */
    small_text?: string
    /** URL that is opened when clicking on the small image */
    small_url?: string
    /** See Activity Asset Image. Displayed as a banner on a Game Invite. */
    invite_cover_image?: string
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-secrets */
  export interface ActivitySecrets {
    /** Secret for joining a party */
    join?: string
    /** Secret for spectating a game */
    spectate?: string
    /** Secret for a specific instanced match */
    match?: string
  }

  /** https://discord.com/developers/docs/events/gateway-events#activity-object-activity-buttons */
  export interface ActivityButtons {
    /** Text shown on the button (1-32 characters) */
    label: string
    /** URL opened when clicking the button (1-512 characters) */
    url: string
  }

  /** https://discord.com/developers/docs/events/gateway-events#typing-start-typing-start-event-fields */
  export interface TypingStartEventFields {
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
    /** ID of the user */
    user_id: snowflake
    /** Unix time (in seconds) of when the user started typing */
    timestamp: integer
    /** Member who started typing if this happened in a guild */
    member?: Guild.Member
  }

  /** https://discord.com/developers/docs/events/gateway-events#voice-channel-effect-send-voice-channel-effect-send-event-fields */
  export interface VoiceChannelEffectSendEventFields {
    /** ID of the channel the effect was sent in */
    channel_id: snowflake
    /** ID of the guild the effect was sent in */
    guild_id: snowflake
    /** ID of the user who sent the effect */
    user_id: snowflake
    /** The emoji sent, for emoji reaction and soundboard effects */
    emoji?: Emoji | null
    /** The type of emoji animation, for emoji reaction and soundboard effects */
    animation_type?: Gateway.AnimationType | null
    /** The ID of the emoji animation, for emoji reaction and soundboard effects */
    animation_id?: integer
    /** The ID of the soundboard sound, for soundboard effects */
    sound_id?: snowflake | integer
    /** The volume of the soundboard sound, from 0 to 1, for soundboard effects */
    sound_volume?: number
  }

  /** https://discord.com/developers/docs/events/gateway-events#voice-server-update-voice-server-update-event-fields */
  export interface VoiceServerUpdateEventFields {
    /** Voice connection token */
    token: string
    /** Guild this voice server update is for */
    guild_id: snowflake
    /** Voice server host */
    endpoint: string | null
  }

  /** https://discord.com/developers/docs/events/gateway-events#webhooks-update-webhooks-update-event-fields */
  export interface WebhooksUpdateEventFields {
    /** ID of the guild */
    guild_id: snowflake
    /** ID of the channel */
    channel_id: snowflake
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-add-message-poll-vote-add-fields */
  export interface MessagePollVoteAddFields {
    /** ID of the user */
    user_id: snowflake
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the message */
    message_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
    /** ID of the answer */
    answer_id: integer
  }

  /** https://discord.com/developers/docs/events/gateway-events#message-poll-vote-remove-message-poll-vote-remove-fields */
  export interface MessagePollVoteRemoveFields {
    /** ID of the user */
    user_id: snowflake
    /** ID of the channel */
    channel_id: snowflake
    /** ID of the message */
    message_id: snowflake
    /** ID of the guild */
    guild_id?: snowflake
    /** ID of the answer */
    answer_id: integer
  }

  /** https://discord.com/developers/docs/events/gateway-events#payload-structure */
  export interface Payload {
    /** Gateway opcode, which indicates the payload type */
    op: integer
    /** Event data */
    d: any | null
    /** Sequence number of event used for resuming sessions and heartbeating */
    s: integer | null
    /** Event name */
    t: string | null
  }
}
