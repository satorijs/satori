import { Internal, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/gateway#identify-identify-structure */
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
  shard?: TwoIntegers(shard_id,Num_shards)[]
  /** Presence structure for initial presence information */
  presence?: UpdatePresence
  /** Gateway Intents you wish to receive */
  intents: integer
}

export namespace Gateway {
  /** https://discord.com/developers/docs/resources/gateway#update-presence-status-types */
  export enum StatusType {
    /** Online */
    online = 'Online',
    /** Do Not Disturb */
    dnd = 'Do Not Disturb',
    /** AFK */
    idle = 'AFK',
    /** Invisible and shown as offline */
    invisible = 'Invisible and shown as offline',
    /** Offline */
    offline = 'Offline',
  }

  /** https://discord.com/developers/docs/resources/gateway#activity-object-activity-types */
  export enum ActivityType {
    Playing = 'Playing',
    Streaming = 'Streaming',
    Listening = 'Listening',
    Watching = 'Watching',
    Custom = 'Custom',
    Competing = 'Competing',
  }

  /** https://discord.com/developers/docs/resources/gateway#activity-object-status-display-types */
  export enum StatusDisplayType {
    Name = 'Name',
    State = 'State',
    Details = 'Details',
  }

  /** https://discord.com/developers/docs/resources/gateway#activity-object-activity-flags */
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

  /** https://discord.com/developers/docs/resources/gateway#voice-channel-effect-send-animation-types */
  export enum AnimationType {
    /** A fun animation, sent by a Nitro subscriber */
    PREMIUM = 0,
    /** The standard animation */
    BASIC = 1,
  }

  /** https://discord.com/developers/docs/resources/gateway#resume-resume-structure */
  export interface Resume {
    /** Session token */
    token: string
    /** Session ID */
    session_id: string
    /** Last sequence number received */
    seq: integer
  }

  /** https://discord.com/developers/docs/resources/gateway#request-guild-members-request-guild-members-structure */
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
    user_ids?: SnowflakeOrArrayOfSnowflakes
    /** nonce to identify the Guild Members Chunk response */
    nonce?: string
  }

  /** https://discord.com/developers/docs/resources/gateway#request-soundboard-sounds-request-soundboard-sounds-structure */
  export interface RequestSoundboardSounds {
    /** IDs of the guilds to get soundboard sounds for */
    guild_ids: Snowflakes[]
  }

  /** https://discord.com/developers/docs/resources/gateway#update-voice-state-gateway-voice-state-update-structure */
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

  /** https://discord.com/developers/docs/resources/gateway#update-presence-gateway-presence-update-structure */
  export interface PresenceUpdate {
    /** Unix time (in milliseconds) of when the client went idle, or null if the client is not idle */
    since: integer | null
    /** User's activities */
    activities: Activity[]
    /** User's new status */
    status: string
    /** Whether or not the client is afk */
    afk: boolean
  }

  /** https://discord.com/developers/docs/resources/gateway#hello-hello-structure */
  export interface Hello {
    /** Interval (in milliseconds) an app should heartbeat with */
    heartbeat_interval: integer
  }

  /** https://discord.com/developers/docs/resources/gateway#activity-object-activity-structure */
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

