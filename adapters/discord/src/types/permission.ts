import { integer, snowflake } from '.'

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface Permission {
  /** role id */
  id: snowflake
  /** role name */
  name: string
  /** **Deprecated** integer representation of hexadecimal color code */
  color: integer
  /** the role's colors */
  colors: Permission.RoleColors
  /** if this role is pinned in the user listing */
  hoist: boolean
  /** role icon hash */
  icon?: string | null
  /** role unicode emoji */
  unicode_emoji?: string | null
  /** position of this role (roles with the same position are sorted by id) */
  position: integer
  /** permission bit set */
  permissions: string
  /** whether this role is managed by an integration */
  managed: boolean
  /** whether this role is mentionable */
  mentionable: boolean
  /** the tags this role has */
  tags?: Permission.RoleTags
  /** role flags combined as a bitfield */
  flags: integer
}

export namespace Permission {
  /** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
  export enum BitwisePermissionFlag {
    /** Allows creation of instant invites */
    CREATE_INSTANT_INVITE = '0x0000000000000001',
    /** Allows kicking members */
    KICK_MEMBERS = '0x0000000000000002',
    /** Allows banning members */
    BAN_MEMBERS = '0x0000000000000004',
    /** Allows all permissions and bypasses channel permission overwrites */
    ADMINISTRATOR = '0x0000000000000008',
    /** Allows management and editing of channels */
    MANAGE_CHANNELS = '0x0000000000000010',
    /** Allows management and editing of the guild */
    MANAGE_GUILD = '0x0000000000000020',
    /** Allows for adding new reactions to messages. This permission does not apply to reacting with an existing reaction on a message. */
    ADD_REACTIONS = '0x0000000000000040',
    /** Allows for viewing of audit logs */
    VIEW_AUDIT_LOG = '0x0000000000000080',
    /** Allows for using priority speaker in a voice channel */
    PRIORITY_SPEAKER = '0x0000000000000100',
    /** Allows the user to go live */
    STREAM = '0x0000000000000200',
    /** Allows guild members to view a channel, which includes reading messages in text channels and joining voice channels */
    VIEW_CHANNEL = '0x0000000000000400',
    /** Allows for sending messages in a channel and creating threads in a forum (does not allow sending messages in threads) */
    SEND_MESSAGES = '0x0000000000000800',
    /** Allows for sending of `/tts` messages */
    SEND_TTS_MESSAGES = '0x0000000000001000',
    /** Allows for deletion of other users messages */
    MANAGE_MESSAGES = '0x0000000000002000',
    /** Links sent by users with this permission will be auto-embedded */
    EMBED_LINKS = '0x0000000000004000',
    /** Allows for uploading images and files */
    ATTACH_FILES = '0x0000000000008000',
    /** Allows for reading of message history */
    READ_MESSAGE_HISTORY = '0x0000000000010000',
    /** Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel */
    MENTION_EVERYONE = '0x0000000000020000',
    /** Allows the usage of custom emojis from other servers */
    USE_EXTERNAL_EMOJIS = '0x0000000000040000',
    /** Allows for viewing guild insights */
    VIEW_GUILD_INSIGHTS = '0x0000000000080000',
    /** Allows for joining of a voice channel */
    CONNECT = '0x0000000000100000',
    /** Allows for speaking in a voice channel */
    SPEAK = '0x0000000000200000',
    /** Allows for muting members in a voice channel */
    MUTE_MEMBERS = '0x0000000000400000',
    /** Allows for deafening of members in a voice channel */
    DEAFEN_MEMBERS = '0x0000000000800000',
    /** Allows for moving of members between voice channels */
    MOVE_MEMBERS = '0x0000000001000000',
    /** Allows for using voice-activity-detection in a voice channel */
    USE_VAD = '0x0000000002000000',
    /** Allows for modification of own nickname */
    CHANGE_NICKNAME = '0x0000000004000000',
    /** Allows for modification of other users nicknames */
    MANAGE_NICKNAMES = '0x0000000008000000',
    /** Allows management and editing of roles */
    MANAGE_ROLES = '0x0000000010000000',
    /** Allows management and editing of webhooks */
    MANAGE_WEBHOOKS = '0x0000000020000000',
    /** Allows for editing and deleting emojis, stickers, and soundboard sounds created by all users */
    MANAGE_GUILD_EXPRESSIONS = '0x0000000040000000',
    /** Allows members to use application commands, including slash commands and context menu commands. */
    USE_APPLICATION_COMMANDS = '0x0000000080000000',
    /** Allows for requesting to speak in stage channels */
    REQUEST_TO_SPEAK = '0x0000000100000000',
    /** Allows for editing and deleting scheduled events created by all users */
    MANAGE_EVENTS = '0x0000000200000000',
    /** Allows for deleting and archiving threads, and viewing all private threads */
    MANAGE_THREADS = '0x0000000400000000',
    /** Allows for creating public and announcement threads */
    CREATE_PUBLIC_THREADS = '0x0000000800000000',
    /** Allows for creating private threads */
    CREATE_PRIVATE_THREADS = '0x0000001000000000',
    /** Allows the usage of custom stickers from other servers */
    USE_EXTERNAL_STICKERS = '0x0000002000000000',
    /** Allows for sending messages in threads */
    SEND_MESSAGES_IN_THREADS = '0x0000004000000000',
    /** Allows for using Activities (applications with the `EMBEDDED` flag) */
    USE_EMBEDDED_ACTIVITIES = '0x0000008000000000',
    /** Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels */
    MODERATE_MEMBERS = '0x0000010000000000',
    /** Allows for viewing role subscription insights */
    VIEW_CREATOR_MONETIZATION_ANALYTICS = '0x0000020000000000',
    /** Allows for using soundboard in a voice channel */
    USE_SOUNDBOARD = '0x0000040000000000',
    /** Allows for creating emojis, stickers, and soundboard sounds, and editing and deleting those created by the current user. */
    CREATE_GUILD_EXPRESSIONS = '0x0000080000000000',
    /** Allows for creating scheduled events, and editing and deleting those created by the current user. */
    CREATE_EVENTS = '0x0000100000000000',
    /** Allows the usage of custom soundboard sounds from other servers */
    USE_EXTERNAL_SOUNDS = '0x0000200000000000',
    /** Allows sending voice messages */
    SEND_VOICE_MESSAGES = '0x0000400000000000',
    /** Allows sending polls */
    SEND_POLLS = '0x0002000000000000',
    /** Allows user-installed apps to send public responses. When disabled, users will still be allowed to use their apps but the responses will be ephemeral. This only applies to apps not also installed to the server. */
    USE_EXTERNAL_APPS = '0x0004000000000000',
    /** Allows pinning and unpinning messages */
    PIN_MESSAGES = '0x0008000000000000',
    /** Allows bypassing slowmode restrictions */
    BYPASS_SLOWMODE = '0x0010000000000000',
  }

  /** https://discord.com/developers/docs/topics/permissions#role-object-role-flags */
  export enum RoleFlag {
    /** role can be selected by members in an onboarding prompt */
    IN_PROMPT = 1 << 0,
  }

  /** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
  export interface RoleTags {
    /** the id of the bot this role belongs to */
    bot_id?: snowflake
    /** the id of the integration this role belongs to */
    integration_id?: snowflake
    /** whether this is the guild's Booster role */
    premium_subscriber?: null
    /** the id of this role's subscription sku and listing */
    subscription_listing_id?: snowflake
    /** whether this role is available for purchase */
    available_for_purchase?: null
    /** whether this role is a guild's linked role */
    guild_connections?: null
  }

  /** https://discord.com/developers/docs/topics/permissions#role-object-role-colors-object */
  export interface RoleColors {
    /** the primary color for the role */
    primary_color: integer
    /** the secondary color for the role, this will make the role a gradient between the other provided colors */
    secondary_color: integer | null
    /** the tertiary color for the role, this will turn the gradient into a holographic style */
    tertiary_color: integer | null
  }
}
