import { integer, Internal, snowflake } from '.'

/** @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-auto-moderation-rule-structure */
export interface AutoModerationRule {
  /** the id of this rule */
  id: snowflake
  /** the id of the guild which this rule belongs to */
  guild_id: snowflake
  /** the rule name */
  name: string
  /** the user which first created this rule */
  creator_id: snowflake
  /** the rule event type */
  event_type: AutoModerationRule.EventType
  /** the rule trigger type */
  trigger_type: AutoModerationRule.TriggerType
  /** the rule trigger metadata */
  trigger_metadata: AutoModerationRule.TriggerMetadata
  /** the actions which will execute when the rule is triggered */
  actions: AutoModerationAction[]
  /** whether the rule is enabled */
  enabled: boolean
  /** the role ids that should not be affected by the rule (Maximum of 20) */
  exempt_roles: snowflake[]
  /** the channel ids that should not be affected by the rule (Maximum of 50) */
  exempt_channels: snowflake[]
}

export namespace AutoModerationRule {
  /**
   * Indicates in what event context a rule should be checked.
   * @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types
   */
  export const enum EventType {
    /** when a member sends or edits a message in the guild */
    MESSAGE_SEND = 1,
  }

  /**
   * Characterizes the type of content which can trigger the rule.
   * @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types
   */
  export const enum TriggerType {
    /** check if content contains words from a user defined list of keywords (max per guild: 3) */
    KEYWORD = 1,
    /** check if content represents generic spam (max per guild: 1) */
    SPAM = 3,
    /** check if content contains words from internal pre-defined wordsets (max per guild: 1) */
    KEYWORD_PRESET = 4,
    /** check if content contains more unique mentions than allowed (max per guild: 1) */
    MENTION_SPAM = 5,
  }

  /**
   * Additional data used to determine whether a rule should be triggered.
   * Different fields are relevant based on the value of trigger_type.
   * @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata
   */
  export interface TriggerMetadata {
    /** associated with `KEYWORD`: substrings which will be searched for in content */
    keyword_filter: string[]
    /** 	regular expression patterns which will be matched against content (Maximum of 10) */
    regex_patterns: string[]
    /** associated with `KEYWORD_PRESET`: the internally pre-defined wordsets which will be searched for in content */
    presets: KeywordPresetType[]
    /** associated with `KEYWORD_PRESET`: substrings which will be exempt from triggering the preset trigger type */
    allow_list: string[]
    /** associated with `MENTION_SPAM`: total number of unique role and user mentions allowed per message (Maximum of 50)     */
    mention_total_limit: integer
  }

  /** @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types */
  export const enum KeywordPresetType {
    /** Words that may be considered forms of swearing or cursing */
    PROFANITY = 1,
    /** Words that refer to sexually explicit behavior or activity */
    SEXUAL_CONTEN = 2,
    /** Personal insults or words that may be considered hate speech */
    SLURS = 3,
  }

  /** @see https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule-json-params */
  export interface CreateParams {
    /** the rule name */
    name: string
    /** the event type */
    event_type: EventType
    /** the trigger type */
    trigger_type: TriggerType
    /** the trigger metadata */
    trigger_metadata?: TriggerMetadata
    /** the actions which will execute when the rule is triggered */
    actions: AutoModerationAction[]
    /** whether the rule is enabled (False by default) */
    enabled?: boolean
    /** the role ids that should not be affected by the rule (Maximum of 20) */
    exempt_roles?: snowflake[]
    /** the channel ids that should not be affected by the rule (Maximum of 50) */
    exempt_channels?: snowflake[]
  }
}

/** @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
export interface AutoModerationAction {
  /** the type of action */
  type: AutoModerationAction.Type
  /** additional metadata needed during execution for this specific action type */
  metadata?: AutoModerationAction.Metadata
}

export namespace AutoModerationAction {
  /** @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types */
  export const enum Type {
    /** blocks the content of a message according to the rule */
    BLOCK_MESSAGE = 1,
    /** logs user content to a specified channel */
    SEND_ALERT_MESSAGE = 2,
    /**
     * timeout user for a specified duration
     *
     * A `TIMEOUT` action can only be set up for `KEYWORD` and `MENTION_SPAM` rules.
     * The `MODERATE_MEMBERS` permission is required to use the `TIMEOUT` action type.)
     */
    TIMEOUT = 3,
  }

  /** @see https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata */
  export interface Metadata {
    /**
     * associated with `SEND_ALERT_MESSAGE`:
     * channel to which user content should be logged
     */
    channel_id?: snowflake
    /**
     * associated with `TIMEOUT`:
     * timeout duration in seconds, maximum of 2419200 seconds (4 weeks)
     */
    duration_seconds?: integer
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Get a list of all rules currently configured for the guild.
     * Returns a list of auto moderation rule objects for the given guild.
     * This endpoint requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild
     */
    listAutoModerationRules(guildId: snowflake): Promise<AutoModerationRule[]>
    /**
     * Get a single rule. Returns an auto moderation rule object.
     * This endpoint requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule
     */
    getAutoModerationRule(guildId: snowflake, ruleId: snowflake): Promise<AutoModerationRule>
    /**
     * Create a new rule. Returns an auto moderation rule on success. Fires an Auto Moderation Rule Create Gateway event.
     * This endpoint requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule
     */
    createAutoModerationRule(guildId: snowflake, data: AutoModerationRule.CreateParams): Promise<AutoModerationRule>
    /**
     * Modify an existing rule. Returns an auto moderation rule on success.
     * Fires an Auto Moderation Rule Update Gateway event.
     * This endpoint requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule
     */
    modifyAutoModerationRule(guildId: snowflake, ruleId: snowflake, data: Partial<AutoModerationRule.CreateParams>): Promise<AutoModerationRule>
    /**
     * Delete a rule. Returns a 204 on success. Fires an Auto Moderation Rule Delete Gateway event.
     * This endpoint requires the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule
     */
    deleteAutoModerationRule(guildId: snowflake, ruleId: snowflake): Promise<void>
  }
}

Internal.define({
  '/guilds/{guild.id}/auto-moderation/rules': {
    GET: 'listAutoModerationRules',
    POST: 'createAutoModerationRule',
  },
  '/guilds/{guild.id}/auto-moderation/rules/{rule.id}': {
    GET: 'getAutoModerationRule',
    PATCH: 'modifyAutoModerationRule',
    DELETE: 'deleteAutoModerationRule',
  },
})
