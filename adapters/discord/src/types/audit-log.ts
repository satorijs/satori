import { ApplicationCommands, AutoModerationRule, GuildScheduledEvent, Internal, User, Webhook, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/audit-log#audit-log-object-audit-log-structure */
export interface AuditLog {
  /** List of application commands referenced in the audit log */
  application_commands: ApplicationCommands[]
  /** List of audit log entries, sorted from most to least recent */
  audit_log_entries: AuditLogEntry[]
  /** List of auto moderation rules referenced in the audit log */
  auto_moderation_rules: AutoModerationRule[]
  /** List of guild scheduled events referenced in the audit log */
  guild_scheduled_events: GuildScheduledEvent[]
  /** List of partial integration objects */
  integrations: PartialIntegration[]
  /** List of threads referenced in the audit log\* */
  threads: ThreadSpecificChannel[]
  /** List of users referenced in the audit log */
  users: User[]
  /** List of webhooks referenced in the audit log */
  webhooks: Webhook[]
}

export namespace AuditLog {
  /** https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure */
  export interface Entry {
    /** ID of the affected entity (webhook, user, role, etc.) */
    target_id: string | null
    /** Changes made to the target_id */
    changes?: AuditLogChange[]
    /** User or app that made the changes */
    user_id: snowflake | null
    /** ID of the entry */
    id: snowflake
    /** Type of action that occurred */
    action_type: AuditLogEvent
    /** Additional info for certain event types */
    options?: OptionalAuditEntryInfo
    /** Reason for the change (1-512 characters) */
    reason?: string
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
