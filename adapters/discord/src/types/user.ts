import { Guild, Internal, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/user#user-object-user-structure */
export interface User {
  /** the user's id */
  id: snowflake
  /** the user's username, not unique across the platform */
  username: string
  /** the user's Discord-tag */
  discriminator: string
  /** the user's display name, if it is set */
  global_name: string | null
  /** the user's avatar hash */
  avatar: string | null
  /** whether the user belongs to an OAuth2 application */
  bot?: boolean
  /** whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean
  /** whether the user has two factor enabled on their account */
  mfa_enabled?: boolean
  /** the user's banner hash */
  banner?: string | null
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accent_color?: integer | null
  /** the user's chosen language option */
  locale?: string
  /** whether the email on this account has been verified */
  verified?: boolean
  /** the user's email */
  email?: string | null
  /** the flags on a user's account */
  flags?: integer
  /** the type of Nitro subscription on a user's account */
  premium_type?: User.PremiumType
  /** the public flags on a user's account */
  public_flags?: integer
  /** data for the user's avatar decoration */
  avatar_decoration_data?: User.AvatarDecorationData | null
  /** data for the user's collectibles */
  collectibles?: Collectibles | null
  /** the user's primary guild */
  primary_guild?: UserPrimaryGuild | null
}

export namespace User {
  /** https://discord.com/developers/docs/resources/user#user-object-user-flags */
  export enum Flag {
    /** Discord Employee */
    STAFF = 1 << 0,
    /** Partnered Server Owner */
    PARTNER = 1 << 1,
    /** HypeSquad Events Member */
    HYPESQUAD = 1 << 2,
    /** Bug Hunter Level 1 */
    BUG_HUNTER_LEVEL_1 = 1 << 3,
    /** House Bravery Member */
    HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
    /** House Brilliance Member */
    HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
    /** House Balance Member */
    HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
    /** Early Nitro Supporter */
    PREMIUM_EARLY_SUPPORTER = 1 << 9,
    /** User is a team */
    TEAM_PSEUDO_USER = 1 << 10,
    /** Bug Hunter Level 2 */
    BUG_HUNTER_LEVEL_2 = 1 << 14,
    /** Verified Bot */
    VERIFIED_BOT = 1 << 16,
    /** Early Verified Bot Developer */
    VERIFIED_DEVELOPER = 1 << 17,
    /** Moderator Programs Alumni */
    CERTIFIED_MODERATOR = 1 << 18,
    /** Bot uses only HTTP interactions and is shown in the online member list */
    BOT_HTTP_INTERACTIONS = 1 << 19,
  }

  /** https://discord.com/developers/docs/resources/user#user-object-premium-types */
  export enum PremiumType {
    NONE = 0,
    NITRO_CLASSIC = 1,
    NITRO = 2,
    NITRO_BASIC = 3,
  }

  /** https://discord.com/developers/docs/resources/user#connection-object-visibility-types */
  export enum VisibilityType {
    /** invisible to everyone except the user themselves */
    NONE = 0,
    /** visible to everyone */
    EVERYONE = 1,
  }

  /** https://discord.com/developers/docs/resources/user#avatar-decoration-data-object-avatar-decoration-data-structure */
  export interface AvatarDecorationData {
    /** the avatar decoration hash */
    asset: string
    /** id of the avatar decoration's SKU */
    sku_id: snowflake
  }

  /** https://discord.com/developers/docs/resources/user#collectibles-collectible-structure */
  export interface Collectible {
    /** object mapping of nameplate data */
    nameplate?: any
  }

  /** https://discord.com/developers/docs/resources/user#nameplate-nameplate-structure */
  export interface Nameplate {
    /** id of the nameplate SKU */
    sku_id: snowflake
    /** path to the nameplate asset */
    asset: string
    /** the label of this nameplate. Currently unused */
    label: string
    /** background color of the nameplate, one of: `crimson`, `berry`, `sky`, `teal`, `forest`, `bubble_gum`, `violet`, `cobalt`, `clover`, `lemon`, `white` */
    palette: string
  }

  /** https://discord.com/developers/docs/resources/user#connection-object-connection-structure */
  export interface Connection {
    /** id of the connection account */
    id: string
    /** the username of the connection account */
    name: string
    /** the service of this connection */
    type: string
    /** whether the connection is revoked */
    revoked?: boolean
    /** an array of partial server integrations */
    integrations?: unknown[]
    /** whether the connection is verified */
    verified: boolean
    /** whether friend sync is enabled for this connection */
    friend_sync: boolean
    /** whether activities related to this connection will be shown in presence updates */
    show_activity: boolean
    /** whether this connection has a corresponding third party OAuth2 token */
    two_way_link: boolean
    /** visibility of this connection */
    visibility: integer
  }

  /** https://discord.com/developers/docs/resources/user#application-role-connection-object-application-role-connection-structure */
  export interface ApplicationRoleConnection {
    /** the vanity name of the platform a bot has connected (max 50 characters) */
    platform_name: string | null
    /** object mapping application role connection metadata keys to their `string`-ified value (max 100 characters) for the user on the platform a bot has connected */
    metadata: any
  }
}

/** https://discord.com/developers/docs/resources/user#modify-current-user-json-params */
export interface ModifyCurrentUserParams {
  /** user's username, if changed may cause the user's discriminator to be randomized. */
  username: string
  /** if passed, modifies the user's avatar */
  avatar: ImageData | null
  /** if passed, modifies the user's banner */
  banner: ImageData | null
}

/** https://discord.com/developers/docs/resources/user#get-current-user-guilds-query-string-params */
export interface GetCurrentUserGuildsParams {
  /** get guilds before this guild ID */
  before: snowflake
  /** get guilds after this guild ID */
  after: snowflake
  /** max number of guilds to return (1-200) */
  limit: integer
  /** include approximate member and presence counts in response */
  with_counts: Boolean
}

/** https://discord.com/developers/docs/resources/user#create-dm-json-params */
export interface CreateDmParams {
  /** the recipient to open a DM channel with */
  recipient_id: snowflake
}

/** https://discord.com/developers/docs/resources/user#create-group-dm-json-params */
export interface CreateGroupDmParams {
  /** access tokens of users that have granted your app the `gdm.join` scope */
  access_tokens: string[]
  /** a dictionary of user ids to their respective nicknames */
  nicks: Record<string, string>
}

/** https://discord.com/developers/docs/resources/user#update-current-user-application-role-connection-json-params */
export interface UpdateCurrentUserApplicationRoleConnectionParams {
  /** the vanity name of the platform a bot has connected (max 50 characters) */
  platform_name?: string
  /** the username on the platform a bot has connected (max 100 characters) */
  platform_username?: string
  /** object mapping application role connection metadata keys to their `string`-ified value (max 100 characters) for the user on the platform a bot has connected */
  metadata?: any
}

declare module './internal' {
  interface Internal {
    /**
     * Returns the user object of the requester's account. For OAuth2, this requires the `identify` scope, which will return the object _without_ an email, and optionally the `email` scope, which returns the object _with_ an email if the user has one.
     * @see https://discord.com/developers/docs/resources/user#get-current-user
     */
    getCurrentUser(): Promise<User>
    /**
     * Returns a user object for a given user ID.
     * @see https://discord.com/developers/docs/resources/user#get-user
     */
    getUser(user_id: snowflake): Promise<User>
    /**
     * Modify the requester's user account settings. Returns a user object on success. Fires a User Update Gateway event.
     * @see https://discord.com/developers/docs/resources/user#modify-current-user
     */
    modifyCurrentUser(params: ModifyCurrentUserParams): Promise<User>
    /**
     * Returns a list of partial guild objects the current user is a member of. For OAuth2, requires the `guilds` scope.
     * @see https://discord.com/developers/docs/resources/user#get-current-user-guilds
     */
    getCurrentUserGuilds(params: GetCurrentUserGuildsParams): Promise<Partial<Guild>[]>
    /**
     * Returns a guild member object for the current user. Requires the `guilds.members.read` OAuth2 scope.
     * @see https://discord.com/developers/docs/resources/user#get-current-user-guild-member
     */
    getCurrentUserGuildMember(guild_id: snowflake): Promise<Guild.Member>
    /**
     * Leave a guild. Returns a 204 empty response on success. Fires a Guild Delete Gateway event and a Guild Member Remove Gateway event.
     * @see https://discord.com/developers/docs/resources/user#leave-guild
     */
    leaveGuild(guild_id: snowflake): Promise<void>
    /**
     * Create a new DM channel with a user. Returns a DM channel object (if one already exists, it will be returned instead).
     * @see https://discord.com/developers/docs/resources/user#create-dm
     */
    createDm(params: CreateDmParams): Promise<DmChannel>
    /**
     * Create a new group DM channel with multiple users. Returns a DM channel object. This endpoint was intended to be used with the now-deprecated GameBridge SDK. Fires a Channel Create Gateway event.
     * @see https://discord.com/developers/docs/resources/user#create-group-dm
     */
    createGroupDm(params: CreateGroupDmParams): Promise<DmChannel>
    /**
     * Returns a list of connection objects. Requires the `connections` OAuth2 scope.
     * @see https://discord.com/developers/docs/resources/user#get-current-user-connections
     */
    getCurrentUserConnections(): Promise<User.Connection[]>
    /**
     * Returns the application role connection for the user. Requires an OAuth2 access token with `role_connections.write` scope for the application specified in the path.
     * @see https://discord.com/developers/docs/resources/user#get-current-user-application-role-connection
     */
    getCurrentUserApplicationRoleConnection(application_id: snowflake): Promise<void>
    /**
     * Updates and returns the application role connection for the user. Requires an OAuth2 access token with `role_connections.write` scope for the application specified in the path.
     * @see https://discord.com/developers/docs/resources/user#update-current-user-application-role-connection
     */
    updateCurrentUserApplicationRoleConnection(application_id: snowflake, params: UpdateCurrentUserApplicationRoleConnectionParams): Promise<void>
  }
}

Internal.define({
  '/users/@me': {
    GET: 'getCurrentUser',
    PATCH: 'modifyCurrentUser',
  },
  '/users/{user.id}': {
    GET: 'getUser',
  },
  '/users/@me/guilds': {
    GET: 'getCurrentUserGuilds',
  },
  '/users/@me/guilds/{guild.id}/member': {
    GET: 'getCurrentUserGuildMember',
  },
  '/users/@me/guilds/{guild.id}': {
    DELETE: 'leaveGuild',
  },
  '/users/@me/channels': {
    POST: 'createGroupDm',
  },
  '/users/@me/connections': {
    GET: 'getCurrentUserConnections',
  },
  '/users/@me/applications/{application.id}/role-connection': {
    GET: 'getCurrentUserApplicationRoleConnection',
    PUT: 'updateCurrentUserApplicationRoleConnection',
  },
})
