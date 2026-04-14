import { Guild, integer, Internal, snowflake, timestamp, User } from '.'

/** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-structure */
export interface GuildScheduledEvent {
  /** the id of the scheduled event */
  id: snowflake
  /** the guild id which the scheduled event belongs to */
  guild_id: snowflake
  /** the channel id in which the scheduled event will be hosted, or `null` if scheduled entity type is `EXTERNAL` */
  channel_id: GuildScheduledEvent.GuildScheduledEventEntityType | null
  /** the id of the user that created the scheduled event * */
  creator_id?: snowflake | null
  /** the name of the scheduled event (1-100 characters) */
  name: string
  /** the description of the scheduled event (1-1000 characters) */
  description?: string | null
  /** the time the scheduled event will start */
  scheduled_start_time: timestamp
  /** the time the scheduled event will end, required if entity_type is `EXTERNAL` */
  scheduled_end_time: timestamp | null
  /** the privacy level of the scheduled event */
  privacy_level: GuildScheduledEvent.GuildScheduledEventPrivacyLevel
  /** the status of the scheduled event */
  status: GuildScheduledEvent.GuildScheduledEventStatus
  /** the type of the scheduled event */
  entity_type: GuildScheduledEvent.GuildScheduledEventEntityType
  /** the id of an entity associated with a guild scheduled event */
  entity_id: snowflake | null
  /** additional metadata for the guild scheduled event */
  entity_metadata: GuildScheduledEvent.EntityMetadata | null
  /** the user that created the scheduled event */
  creator?: User
  /** the number of users subscribed to the scheduled event */
  user_count?: integer
  /** the cover image hash of the scheduled event */
  image?: string | null
  /** the definition for how often this event should recur */
  recurrence_rule: GuildScheduledEvent.RecurrenceRule | null
}

export namespace GuildScheduledEvent {
  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level */
  export enum GuildScheduledEventPrivacyLevel {
    /** the scheduled event is only accessible to guild members */
    GUILD_ONLY = 2,
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types */
  export enum GuildScheduledEventEntityType {
    STAGE_INSTANCE = 1,
    VOICE = 2,
    EXTERNAL = 3,
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-field-requirements-by-entity-type */
  export enum FieldRequirementsByEntityType {
    /** value */
    STAGE_INSTANCE = 'stage_instance',
    /** value */
    VOICE = 'voice',
    /** null */
    EXTERNAL = 'external',
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status */
  export enum GuildScheduledEventStatus {
    SCHEDULED = 1,
    ACTIVE = 2,
    COMPLETED = 3,
    CANCELED = 4,
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule--frequency */
  export enum GuildScheduledEventRecurrenceRuleFrequency {
    YEARLY = 0,
    MONTHLY = 1,
    WEEKLY = 2,
    DAILY = 3,
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule--weekday */
  export enum GuildScheduledEventRecurrenceRuleWeekday {
    MONDAY = 0,
    TUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6,
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule--month */
  export enum GuildScheduledEventRecurrenceRuleMonth {
    JANUARY = 1,
    FEBRUARY = 2,
    MARCH = 3,
    APRIL = 4,
    MAY = 5,
    JUNE = 6,
    JULY = 7,
    AUGUST = 8,
    SEPTEMBER = 9,
    OCTOBER = 10,
    NOVEMBER = 11,
    DECEMBER = 12,
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata */
  export interface EntityMetadata {
    /** location of the event (1-100 characters) */
    location?: string
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-user-object-guild-scheduled-event-user-structure */
  export interface User {
    /** the scheduled event id which the user subscribed to */
    guild_scheduled_event_id: snowflake
    /** user which subscribed to an event */
    user: User
    /** guild member data for this user for the guild which this event belongs to, if any */
    member?: Guild.Member
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule-structure */
  export interface RecurrenceRule {
    /** Starting time of the recurrence interval */
    start: timestamp
    /** Ending time of the recurrence interval */
    end: timestamp | null
    /** How often the event occurs */
    frequency: GuildScheduledEvent.GuildScheduledEventRecurrenceRuleFrequency
    /** The spacing between the events, defined by `frequency`. For example, `frequency` of `WEEKLY` and an `interval` of `2` would be "every-other week" */
    interval: integer
    /** Set of specific days within a week for the event to recur on */
    by_weekday: GuildScheduledEvent.GuildScheduledEventRecurrenceRuleWeekday[] | null
    /** List of specific days within a specific week (1-5) to recur on */
    by_n_weekday: GuildScheduledEvent.RecurrenceRuleNWeekday[] | null
    /** Set of specific months to recur on */
    by_month: GuildScheduledEvent.GuildScheduledEventRecurrenceRuleMonth[] | null
    /** Set of specific dates within a month to recur on */
    by_month_day: integer[] | null
    /** Set of days within a year to recur on (1-364) */
    by_year_day: integer[] | null
    /** The total amount of times that the event is allowed to recur before stopping */
    count: integer | null
  }

  /** https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-recurrence-rule-object-guild-scheduled-event-recurrence-rule--nweekday-structure */
  export interface RecurrenceRuleNWeekday {
    /** The week to reoccur on. 1 - 5 */
    n: integer
    /** The day within the week to reoccur on */
    day: GuildScheduledEvent.GuildScheduledEventRecurrenceRuleWeekday
  }
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild-query-string-params */
export interface ListScheduledEventsForGuildParams {
  /** include number of users subscribed to each event */
  with_user_count?: boolean
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event-json-params */
export interface CreateGuildScheduledEventParams {
  /** the channel id of the scheduled event. */
  channel_id?: snowflake
  /** the entity metadata of the scheduled event */
  entity_metadata?: GuildScheduledEvent.EntityMetadata
  /** the name of the scheduled event */
  name: string
  /** the privacy level of the scheduled event */
  privacy_level: GuildScheduledEvent.GuildScheduledEventPrivacyLevel
  /** the time to schedule the scheduled event */
  scheduled_start_time: timestamp
  /** the time when the scheduled event is scheduled to end */
  scheduled_end_time?: timestamp
  /** the description of the scheduled event */
  description?: string
  /** the entity type of the scheduled event */
  entity_type: GuildScheduledEvent.GuildScheduledEventEntityType
  /** the cover image of the scheduled event */
  image?: string
  /** the definition for how often this event should recur */
  recurrence_rule?: GuildScheduledEvent.RecurrenceRule
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-query-string-params */
export interface GetGuildScheduledEventParams {
  /** include number of users subscribed to this event */
  with_user_count?: boolean
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event-json-params */
export interface ModifyGuildScheduledEventParams {
  /** the channel id of the scheduled event, set to `null` if changing entity type to `EXTERNAL` */
  channel_id?: snowflake | null
  /** the entity metadata of the scheduled event */
  entity_metadata?: GuildScheduledEvent.EntityMetadata | null
  /** the name of the scheduled event */
  name?: string
  /** the privacy level of the scheduled event */
  privacy_level?: GuildScheduledEvent.GuildScheduledEventPrivacyLevel
  /** the time to schedule the scheduled event */
  scheduled_start_time?: timestamp
  /** the time when the scheduled event is scheduled to end */
  scheduled_end_time?: timestamp
  /** the description of the scheduled event */
  description?: string | null
  /** the entity type of the scheduled event */
  entity_type?: GuildScheduledEvent.GuildScheduledEventEntityType
  /** the status of the scheduled event */
  status?: GuildScheduledEvent.GuildScheduledEventStatus
  /** the cover image of the scheduled event */
  image?: string
  /** the definition for how often this event should recur */
  recurrence_rule?: GuildScheduledEvent.RecurrenceRule | null
}

/** https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users-query-string-params */
export interface GetGuildScheduledEventUsersParams {
  /** number of users to return (up to maximum 100) */
  limit?: number
  /** include guild member data if it exists */
  with_member?: boolean
  /** consider only users before given user id */
  before?: snowflake
  /** consider only users after given user id */
  after?: snowflake
}

declare module './internal' {
  interface Internal {
    /**
     * Returns a list of guild scheduled event objects for the given guild.
     * @see https://discord.com/developers/docs/resources/guild-scheduled-event#list-scheduled-events-for-guild
     */
    listScheduledEventsForGuild(guild_id: snowflake, params: ListScheduledEventsForGuildParams): Promise<GuildScheduledEvent[]>
    /**
     * Create a guild scheduled event in the guild. Returns a guild scheduled event object on success. Fires a Guild Scheduled Event Create Gateway event.
     * @see https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event
     */
    createGuildScheduledEvent(guild_id: snowflake, params: CreateGuildScheduledEventParams): Promise<GuildScheduledEvent>
    /**
     * Get a guild scheduled event. Returns a guild scheduled event object on success.
     * @see https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event
     */
    getGuildScheduledEvent(guild_id: snowflake, guild_scheduled_event_id: snowflake, params: GetGuildScheduledEventParams): Promise<GuildScheduledEvent>
    /**
     * Modify a guild scheduled event. Returns the modified guild scheduled event object on success. Fires a Guild Scheduled Event Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event
     */
    modifyGuildScheduledEvent(guild_id: snowflake, guild_scheduled_event_id: snowflake, params: ModifyGuildScheduledEventParams): Promise<GuildScheduledEvent>
    /**
     * Delete a guild scheduled event. Returns a `204` on success. Fires a Guild Scheduled Event Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event
     */
    deleteGuildScheduledEvent(guild_id: snowflake, guild_scheduled_event_id: snowflake): Promise<void>
    /**
     * Get a list of guild scheduled event users subscribed to a guild scheduled event. Returns a list of guild scheduled event user objects on success. Guild member data, if it exists, is included if the `with_member` query parameter is set.
     * @see https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users
     */
    getGuildScheduledEventUsers(guild_id: snowflake, guild_scheduled_event_id: snowflake, params: GetGuildScheduledEventUsersParams): Promise<GuildScheduledEvent.User[]>
  }
}

Internal.define({
  '/guilds/{guild.id}/scheduled-events': {
    GET: 'listScheduledEventsForGuild',
    POST: 'createGuildScheduledEvent',
  },
  '/guilds/{guild.id}/scheduled-events/{guild_scheduled_event.id}': {
    GET: 'getGuildScheduledEvent',
    PATCH: 'modifyGuildScheduledEvent',
    DELETE: 'deleteGuildScheduledEvent',
  },
  '/guilds/{guild.id}/scheduled-events/{guild_scheduled_event.id}/users': {
    GET: 'getGuildScheduledEventUsers',
  },
})
