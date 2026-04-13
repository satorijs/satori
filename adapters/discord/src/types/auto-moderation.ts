import { Internal, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-auto-moderation-rule-structure */
export interface AutoModeration {
  /** the id of this rule */
  id: snowflake
  /** the id of the guild which this rule belongs to */
  guild_id: snowflake
  /** the rule name */
  name: string
  /** the user which first created this rule */
  creator_id: snowflake
  /** the rule event type */
  event_type: AutoModeration.EventType
  /** the rule trigger type */
  trigger_type: AutoModeration.TriggerType
  /** the rule trigger metadata */
  trigger_metadata: any
  /** the actions which will execute when the rule is triggered */
  actions: Action[]
  /** whether the rule is enabled */
  enabled: boolean
  /** the role ids that should not be affected by the rule (Maximum of 20) */
  exempt_roles: snowflake[]
  /** the channel ids that should not be affected by the rule (Maximum of 50) */
  exempt_channels: snowflake[]
}

export namespace AutoModeration {
  /** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types */
  export enum TriggerType {
    /** check if content contains words from a user defined list of keywords */
    KEYWORD = 1,
    /** check if content represents generic spam */
    SPAM = 3,
    /** check if content contains words from internal pre-defined wordsets */
    KEYWORD_PRESET = 4,
    /** check if content contains more unique mentions than allowed */
    MENTION_SPAM = 5,
    /** check if member profile contains words from a user defined list of keywords */
    MEMBER_PROFILE = 6,
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types */
  export enum KeywordPresetType {
    /** words that may be considered forms of swearing or cursing */
    PROFANITY = 1,
    /** words that refer to sexually explicit behavior or activity */
    SEXUAL_CONTENT = 2,
    /** personal insults or words that may be considered hate speech */
    SLURS = 3,
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types */
  export enum EventType {
    /** when a member sends or edits a message in the guild */
    MESSAGE_SEND = 1,
    /** when a member edits their profile */
    MEMBER_UPDATE = 2,
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types */
  export enum ActionType {
    /** blocks a member's message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked. */
    BLOCK_MESSAGE = 1,
    /** logs user content to a specified channel */
    SEND_ALERT_MESSAGE = 2,
    /** timeout user for a specified duration * */
    TIMEOUT = 3,
    /** prevents a member from using text, voice, or other interactions */
    BLOCK_MEMBER_INTERACTION = 4,
  }

  /** https://discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-auto-moderation-action-structure */
  export interface Action {
    /** the type of action */
    type: ActionType
    /** additional metadata needed during execution for this specific action type */
    metadata?: ActionMetadata
  }
}

/** https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule-json-params */
export interface CreateAutoModerationRuleParams {
  /** the rule name */
  name: string
  /** the event type */
  event_type: integer
  /** the trigger type */
  trigger_type: integer
  /** the trigger metadata */
  trigger_metadata?: any
  /** the actions which will execute when the rule is triggered */
  actions: AutoModeration.Action[]
  /** whether the rule is enabled (False by default) */
  enabled?: boolean
  /** the role ids that should not be affected by the rule (Maximum of 20) */
  exempt_roles?: snowflake[]
}

/** https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule-json-params */
export interface ModifyAutoModerationRuleParams {
  /** the rule name */
  name: string
  /** the event type */
  event_type: integer
  /** the trigger metadata */
  trigger_metadata?: any
  /** the actions which will execute when the rule is triggered */
  actions: AutoModeration.Action[]
  /** whether the rule is enabled */
  enabled: boolean
  /** the role ids that should not be affected by the rule (Maximum of 20) */
  exempt_roles: snowflake[]
  /** the channel ids that should not be affected by the rule (Maximum of 50) */
  exempt_channels: snowflake[]
}

declare module './internal' {
  interface Internal {
    /**
     * Get a list of all rules currently configured for the guild. Returns a list of auto moderation rule objects for the given guild.
     * @see https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild
     */
    listAutoModerationRulesForGuild(guild_id: snowflake): Promise<AutoModeration[]>
    /**
     * Get a single rule. Returns an auto moderation rule object.
     * @see https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule
     */
    getAutoModerationRule(guild_id: snowflake, auto_moderation_rule_id: snowflake): Promise<void>
    /**
     * Create a new rule. Returns an auto moderation rule on success. Fires an Auto Moderation Rule Create Gateway event.
     * @see https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule
     */
    createAutoModerationRule(guild_id: snowflake, params: CreateAutoModerationRuleParams): Promise<void>
    /**
     * Modify an existing rule. Returns an auto moderation rule on success. Fires an Auto Moderation Rule Update Gateway event.
     * @see https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule
     */
    modifyAutoModerationRule(guild_id: snowflake, auto_moderation_rule_id: snowflake, params: ModifyAutoModerationRuleParams): Promise<void>
    /**
     * Delete a rule. Returns a `204` on success. Fires an Auto Moderation Rule Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule
     */
    deleteAutoModerationRule(guild_id: snowflake, auto_moderation_rule_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/guilds/{guild.id}/auto-moderation/rules': {
    GET: 'listAutoModerationRulesForGuild',
    POST: 'createAutoModerationRule',
  },
  '/guilds/{guild.id}/auto-moderation/rules/{auto_moderation_rule.id}': {
    GET: 'getAutoModerationRule',
    PATCH: 'modifyAutoModerationRule',
    DELETE: 'deleteAutoModerationRule',
  },
})
