import { AutoModeration, Channel, Command, Guild, GuildScheduledEvent, integer, Internal, snowflake, User, Webhook } from '.'

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
export interface AuditLog {
  /** List of application commands referenced in the audit log */
  application_commands: Command[]
  /** List of audit log entries, sorted from most to least recent */
  audit_log_entries: AuditLog.Entry[]
  /** List of auto moderation rules referenced in the audit log */
  auto_moderation_rules: AutoModeration[]
  /** List of guild scheduled events referenced in the audit log */
  guild_scheduled_events: GuildScheduledEvent[]
  /** List of partial integration objects */
  integrations: Partial<Guild.Integration>[]
  /** List of threads referenced in the audit log\* */
  threads: Channel[]
  /** List of users referenced in the audit log */
  users: User[]
  /** List of webhooks referenced in the audit log */
  webhooks: Webhook[]
}

export namespace AuditLog {
  /** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
  export enum AuditLogEvents {
    /** Server settings were updated */
    GUILD_UPDATE = 1,
    /** Channel was created */
    CHANNEL_CREATE = 10,
    /** Channel settings were updated */
    CHANNEL_UPDATE = 11,
    /** Channel was deleted */
    CHANNEL_DELETE = 12,
    /** Permission overwrite was added to a channel */
    CHANNEL_OVERWRITE_CREATE = 13,
    /** Permission overwrite was updated for a channel */
    CHANNEL_OVERWRITE_UPDATE = 14,
    /** Permission overwrite was deleted from a channel */
    CHANNEL_OVERWRITE_DELETE = 15,
    /** Member was removed from server */
    MEMBER_KICK = 20,
    /** Members were pruned from server */
    MEMBER_PRUNE = 21,
    /** Member was banned from server */
    MEMBER_BAN_ADD = 22,
    /** Server ban was lifted for a member */
    MEMBER_BAN_REMOVE = 23,
    /** Member was updated in server */
    MEMBER_UPDATE = 24,
    /** Member was added or removed from a role */
    MEMBER_ROLE_UPDATE = 25,
    /** Member was moved to a different voice channel */
    MEMBER_MOVE = 26,
    /** Member was disconnected from a voice channel */
    MEMBER_DISCONNECT = 27,
    /** Bot user was added to server */
    BOT_ADD = 28,
    /** Role was created */
    ROLE_CREATE = 30,
    /** Role was edited */
    ROLE_UPDATE = 31,
    /** Role was deleted */
    ROLE_DELETE = 32,
    /** Server invite was created */
    INVITE_CREATE = 40,
    /** Server invite was updated */
    INVITE_UPDATE = 41,
    /** Server invite was deleted */
    INVITE_DELETE = 42,
    /** Webhook was created */
    WEBHOOK_CREATE = 50,
    /** Webhook properties or channel were updated */
    WEBHOOK_UPDATE = 51,
    /** Webhook was deleted */
    WEBHOOK_DELETE = 52,
    /** Emoji was created */
    EMOJI_CREATE = 60,
    /** Emoji name was updated */
    EMOJI_UPDATE = 61,
    /** Emoji was deleted */
    EMOJI_DELETE = 62,
    /** Single message was deleted */
    MESSAGE_DELETE = 72,
    /** Multiple messages were deleted */
    MESSAGE_BULK_DELETE = 73,
    /** Message was pinned to a channel */
    MESSAGE_PIN = 74,
    /** Message was unpinned from a channel */
    MESSAGE_UNPIN = 75,
    /** App was added to server */
    INTEGRATION_CREATE = 80,
    /** App was updated (as an example, its scopes were updated) */
    INTEGRATION_UPDATE = 81,
    /** App was removed from server */
    INTEGRATION_DELETE = 82,
    /** Stage instance was created (stage channel becomes live) */
    STAGE_INSTANCE_CREATE = 83,
    /** Stage instance details were updated */
    STAGE_INSTANCE_UPDATE = 84,
    /** Stage instance was deleted (stage channel no longer live) */
    STAGE_INSTANCE_DELETE = 85,
    /** Sticker was created */
    STICKER_CREATE = 90,
    /** Sticker details were updated */
    STICKER_UPDATE = 91,
    /** Sticker was deleted */
    STICKER_DELETE = 92,
    /** Event was created */
    GUILD_SCHEDULED_EVENT_CREATE = 100,
    /** Event was updated */
    GUILD_SCHEDULED_EVENT_UPDATE = 101,
    /** Event was cancelled */
    GUILD_SCHEDULED_EVENT_DELETE = 102,
    /** Thread was created in a channel */
    THREAD_CREATE = 110,
    /** Thread was updated */
    THREAD_UPDATE = 111,
    /** Thread was deleted */
    THREAD_DELETE = 112,
    /** Permissions were updated for a command */
    APPLICATION_COMMAND_PERMISSION_UPDATE = 121,
    /** Soundboard sound was created */
    SOUNDBOARD_SOUND_CREATE = 130,
    /** Soundboard sound was updated */
    SOUNDBOARD_SOUND_UPDATE = 131,
    /** Soundboard sound was deleted */
    SOUNDBOARD_SOUND_DELETE = 132,
    /** Auto Moderation rule was created */
    AUTO_MODERATION_RULE_CREATE = 140,
    /** Auto Moderation rule was updated */
    AUTO_MODERATION_RULE_UPDATE = 141,
    /** Auto Moderation rule was deleted */
    AUTO_MODERATION_RULE_DELETE = 142,
    /** Message was blocked by Auto Moderation */
    AUTO_MODERATION_BLOCK_MESSAGE = 143,
    /** Message was flagged by Auto Moderation */
    AUTO_MODERATION_FLAG_TO_CHANNEL = 144,
    /** Member was timed out by Auto Moderation */
    AUTO_MODERATION_USER_COMMUNICATION_DISABLED = 145,
    /** Member was quarantined by Auto Moderation */
    AUTO_MODERATION_QUARANTINE_USER = 146,
    /** Creator monetization request was created */
    CREATOR_MONETIZATION_REQUEST_CREATED = 150,
    /** Creator monetization terms were accepted */
    CREATOR_MONETIZATION_TERMS_ACCEPTED = 151,
    /** Guild Onboarding Question was created */
    ONBOARDING_PROMPT_CREATE = 163,
    /** Guild Onboarding Question was updated */
    ONBOARDING_PROMPT_UPDATE = 164,
    /** Guild Onboarding Question was deleted */
    ONBOARDING_PROMPT_DELETE = 165,
    /** Guild Onboarding was created */
    ONBOARDING_CREATE = 166,
    /** Guild Onboarding was updated */
    ONBOARDING_UPDATE = 167,
    /** Guild Server Guide was created */
    HOME_SETTINGS_CREATE = 190,
    /** Guild Server Guide was updated */
    HOME_SETTINGS_UPDATE = 191,
  }

  /** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-exceptions */
  export enum AuditLogChangeExceptions {
    /** snowflake as key */
    COMMAND_PERMISSION = 'command_permission',
    /** Additional `channel_id` key (instead of object's `channel.id`) */
    INVITE_AND_INVITE_METADATA = 'invite_and_invite_metadata',
    /** `$add` and `$remove` as keys */
    PARTIAL_ROLE = 'partial_role',
    /** `avatar_hash` key (instead of `avatar`) */
    WEBHOOK = 'webhook',
  }

  /** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
  export interface Entry {
    /** ID of the affected entity (webhook, user, role, etc.) */
    target_id: string | null
    /** Changes made to the target_id */
    changes?: AuditLog.Change[]
    /** User or app that made the changes */
    user_id: snowflake | null
    /** ID of the entry */
    id: snowflake
    /** Type of action that occurred */
    action_type: AuditLog.AuditLogEvents
    /** Additional info for certain event types */
    options?: AuditLog.OptionalAuditEntryInfo
    /** Reason for the change (1-512 characters) */
    reason?: string
  }

  /** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
  export interface OptionalAuditEntryInfo {
    /** ID of the app whose permissions were targeted */
    application_id: snowflake
    /** Name of the Auto Moderation rule that was triggered */
    auto_moderation_rule_name: string
    /** Trigger type of the Auto Moderation rule that was triggered */
    auto_moderation_rule_trigger_type: string
    /** Channel in which the entities were targeted */
    channel_id: snowflake
    /** Number of entities that were targeted */
    count: string
    /** Number of days after which inactive members were kicked */
    delete_member_days: string
    /** ID of the overwritten entity */
    id: snowflake
    /** Number of members removed by the prune */
    members_removed: string
    /** ID of the message that was targeted */
    message_id: snowflake
    /** Name of the role if type is `"0"` (not present if type is `"1"`) */
    role_name: string
    /** Type of overwritten entity - role (`"0"`) or member (`"1"`) */
    type: string
    /** The type of integration which performed the action */
    integration_type: string
  }

  /** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
  export interface Change {
    /** New value of the key */
    new_value?: any
    /** Old value of the key */
    old_value?: any
    /** Name of the changed entity, with a few exceptions */
    key: string
  }
}

/** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-params */
export interface GetGuildAuditLogParams {
  /** Entries from a specific user ID */
  user_id?: snowflake
  /** Entries for a specific audit log event */
  action_type?: integer
  /** Entries with ID less than a specific audit log entry ID */
  before?: snowflake
  /** Entries with ID greater than a specific audit log entry ID */
  after?: snowflake
  /** Maximum number of entries (between 1-100) to return, defaults to 50 */
  limit?: integer
}

declare module './internal' {
  interface Internal {
    /**
     * Returns an audit log object for the guild. Requires the `VIEW_AUDIT_LOG` permission.
     * @see https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
     */
    getGuildAuditLog(guild_id: snowflake, params: GetGuildAuditLogParams): Promise<void>
  }
}

Internal.define({
  '/guilds/{guild.id}/audit-logs': {
    GET: 'getGuildAuditLog',
  },
})
