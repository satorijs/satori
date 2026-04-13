import { Emoji, GatewayEvents, Internal, integer, snowflake } from '.'

/** https://discord.com/developers/docs/events/gateway-events#identify-identify-structure */
export interface Gateway {
  /** Authentication token */
  token: string
  /** Connection properties */
  properties: any
  /** Whether this connection supports compression of packets */
  compress?: boolean
  /** Value between 50 and 250, total number of members where the gateway will stop sending offline members in the guild member list */
  large_threshold?: integer
  /** Used for Guild Sharding */
  shard?: [integer, integer][]
  /** Presence structure for initial presence information */
  presence?: UpdatePresence
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
    timestamps?: Timestamps
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
    emoji?: Emoji | null
    /** Information for the current party of the player */
    party?: Party
    /** Images for the presence and their hover texts */
    assets?: Assets
    /** Secrets for Rich Presence joining and spectating */
    secrets?: Secrets
    /** Whether or not the activity is an instanced game session */
    instance?: boolean
    /** Activity flags `OR`d together, describes what the payload includes */
    flags?: integer
    /** Custom buttons shown in the Rich Presence (max 2) */
    buttons?: Buttons[]
  }
}

