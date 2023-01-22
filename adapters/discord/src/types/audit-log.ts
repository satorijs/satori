import { ApplicationCommand, AutoModerationRule, Channel, GuildScheduledEvent, integer, Integration, Internal, snowflake, User, Webhook } from '.'

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
export interface AuditLog {
  /** list of application commands referenced in the audit log */
  application_commands: ApplicationCommand[]
  /** list of audit log entries */
  audit_log_entries: AuditLog.Entry[]
  /**	list of auto moderation rules referenced in the audit log */
  auto_moderation_rules: AutoModerationRule[]
  /** list of guild scheduled events referenced in the audit log */
  guild_scheduled_events: GuildScheduledEvent[]
  /** list of partial integration objects */
  integrations: Partial<Integration>[]
  /** list of threads found in the audit log* */
  threads: Channel[]
  /** list of users found in the audit log */
  users: User[]
  /** list of webhooks found in the audit log */
  webhooks: Webhook[]
}

export namespace AuditLog {
  /** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
  export interface Entry {
    /** id of the affected entity (webhook, user, role, etc.) */
    target_id?: string
    /** changes made to the target_id */
    changes?: Change[]
    /** the user who made the changes */
    user_id?: snowflake
    /** id of the entry */
    id: snowflake
    /** type of action that occurred */
    action_type: Type
    /** additional info for certain action types */
    options?: OptionalInfo
    /** the reason for the change (0-512 characters) */
    reason?: string
  }

  /** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events */
  export enum Type {
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
    /** Auto Moderation rule was created */
    AUTO_MODERATION_RULE_CREATE = 140,
    /** Auto Moderation rule was updated */
    AUTO_MODERATION_RULE_UPDATE = 141,
    /** Auto Moderation rule was deleted */
    AUTO_MODERATION_RULE_DELETE = 142,
    /** Message was blocked by AutoMod */
    AUTO_MODERATION_BLOCK_MESSAGE = 143,
    /** Message was flagged by AutoMod */
    AUTO_MODERATION_FLAG_TO_CHANNEL = 144,
    /** Member was timed out by AutoMod */
    AUTO_MODERATION_USER_COMMUNICATION_DISABLED = 145,
  }

  /** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info */
  export interface OptionalInfo {
    /** ID of the app whose permissions were targeted */
    application_id: snowflake
    /**	name of the Auto Moderation rule that was triggered */
    auto_moderation_rule_name: string
    /** trigger type of the Auto Moderation rule that was triggered */
    auto_moderation_rule_trigger_type: string
    /** channel in which the entities were targeted */
    channel_id: snowflake
    /** number of entities that were targeted */
    count: string
    /** number of days after which inactive members were kicked */
    delete_member_days: string
    /** id of the overwritten entity */
    id: snowflake
    /** number of members removed by the prune */
    members_removed: string
    /** id of the message that was targeted */
    message_id: snowflake
    /** name of the role if type is "0" (not present if type is "1") */
    role_name: string
    /** type of overwritten entity - "0" for "role" or "1" for "member" */
    type: string
  }

  /** https://discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure */
  export interface Change {
    /** new value of the key */
    new_value?: any
    /** old value of the key */
    old_value?: any
    /** name of audit log change key */
    key: string
  }

  /** https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log-query-string-params */
  export interface GetParams {
    /** entries from a specific user ID */
    user_id?: snowflake
    /** entries for a specific audit log event */
    action_type?: Type
    /** entries that preceded a specific audit log entry ID */
    before?: snowflake
    /** entries that succeeded a specific audit log entry ID */
    after?: snowflake
    /** maximum number of entries (between 1-100) to return, defaults to 50 */
    limit?: integer
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns an audit log object for the guild. Requires the 'VIEW_AUDIT_LOG' permission.
     * @see https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
     */
    getGuildAuditLog(guildId: snowflake, params?: AuditLog.GetParams): Promise<AuditLog>
  }
}

Internal.define({
  '/guilds/{guild.id}/audit-logs': {
    GET: 'getGuildAuditLog',
  },
})
