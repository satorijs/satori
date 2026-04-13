import { ApplicationCommandOption, ApplicationCommandOptionChoice, ApplicationCommandPermissionType, ApplicationCommandPermissions, ChannelTypes, CommandOptions, IntegrationTypes, InteractionContextTypes, Internal, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/command#application-command-object-application-command-structure */
export interface Command {
  /** Unique ID of command */
  id: snowflake
  /** Type of command, defaults to `1` */
  type?: Command.ApplicationCommandType
  /** ID of the parent application */
  application_id: snowflake
  /** Guild ID of the command, if not global */
  guild_id?: snowflake
  /** Name of command, 1-32 characters */
  name: string
  /** Localization dictionary for `name` field. Values follow the same restrictions as `name` */
  name_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** Description for `CHAT_INPUT` commands, 1-100 characters. Empty string for `USER` and `MESSAGE` commands */
  description: string
  /** Localization dictionary for `description` field. Values follow the same restrictions as `description` */
  description_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** Parameters for the command, max of 25 */
  options?: CommandOptions[]
  /** Set of permissions represented as a bit set */
  default_member_permissions: string | null
  /** **Deprecated (use `contexts` instead)**; Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dm_permission?: boolean
  /** Not recommended for use as field will soon be deprecated. Indicates whether the command is enabled by default when the app is added to a guild, defaults to `true` */
  default_permission?: boolean | null
  /** Indicates whether the command is age-restricted, defaults to `false` */
  nsfw?: boolean
  /** Installation contexts where the command is available, only for globally-scoped commands. Defaults to your app's configured contexts */
  integration_types?: IntegrationTypes[]
  /** Interaction context(s) where the command can be used, only for globally-scoped commands. */
  contexts?: InteractionContextTypes[] | null
  /** Autoincrementing version identifier updated during substantial record changes */
  version: snowflake
  /** Determines whether the interaction is handled by the app's interactions handler or by Discord */
  handler?: OneOfCommandHandlerTypes
}

export namespace Command {
  /** https://discord.com/developers/docs/resources/command#application-command-object-application-command-types */
  export enum ApplicationCommandType {
    /** Slash commands; a text-based command that shows up when a user types `/` */
    1 = 1,
    /** A UI-based command that shows up when you right click or tap on a user */
    2 = 2,
    /** A UI-based command that shows up when you right click or tap on a message */
    3 = 3,
    /** A UI-based command that represents the primary way to invoke an app's Activity */
    4 = 4,
  }

  /** https://discord.com/developers/docs/resources/command#application-command-object-application-command-option-type */
  export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    /** Any integer between -2^53+1 and 2^53-1 */
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    /** Includes all channel types + categories */
    CHANNEL = 7,
    ROLE = 8,
    /** Includes users and roles */
    MENTIONABLE = 9,
    /** Any double between -2^53 and 2^53 */
    NUMBER = 10,
    /** attachment object */
    ATTACHMENT = 11,
  }

  /** https://discord.com/developers/docs/resources/command#application-command-object-entry-point-command-handler-types */
  export enum EntryPointCommandHandlerType {
    /** The app handles the interaction using an interaction token */
    APP_HANDLER = 1,
    /** Discord handles the interaction by launching an Activity and sending a follow-up message without coordinating with the app */
    DISCORD_LAUNCH_ACTIVITY = 2,
  }

  /** https://discord.com/developers/docs/resources/command#application-command-permissions-object-application-command-permission-type */
  export enum ApplicationCommandPermissionType {
    ROLE = 1,
    USER = 2,
    CHANNEL = 3,
  }

  /** https://discord.com/developers/docs/resources/command#application-command-object-application-command-option-structure */
  export interface ApplicationCommandOption {
    /** Type of option */
    type: OneOfApplicationCommandOptionType
    /** 1-32 character name */
    name: string
    /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
    name_localizations?: DictionaryWithKeysInAvailableLocales | null
    /** 1-100 character description */
    description: string
    /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
    description_localizations?: DictionaryWithKeysInAvailableLocales | null
    /** Whether the parameter is required or optional, default `false` */
    required?: boolean
    /** Choices for the user to pick from, max 25 */
    choices?: ApplicationCommandOptionChoice[]
    /** If the option is a subcommand or subcommand group type, these nested options will be the parameters or subcommands respectively; up to 25 */
    options?: ApplicationCommandOption[]
    /** The channels shown will be restricted to these types */
    channel_types?: ChannelTypes[]
    /** The minimum value permitted */
    min_value?: IntegerFor`integer`Options,DoubleFor`number`Options
    /** The maximum value permitted */
    max_value?: IntegerFor`integer`Options,DoubleFor`number`Options
    /** The minimum allowed length (minimum of `0`, maximum of `6000`) */
    min_length?: integer
    /** The maximum allowed length (minimum of `1`, maximum of `6000`) */
    max_length?: integer
    /** If autocomplete interactions are enabled for this option */
    autocomplete?: boolean
  }

  /** https://discord.com/developers/docs/resources/command#application-command-object-application-command-option-choice-structure */
  export interface ApplicationCommandOptionChoice {
    /** 1-100 character choice name */
    name: string
    /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
    name_localizations?: DictionaryWithKeysInAvailableLocales | null
    /** Value for the choice, up to 100 characters if string */
    value: String,Integer,OrDouble
  }

  /** https://discord.com/developers/docs/resources/command#application-command-permissions-object-guild-application-command-permissions-structure */
  export interface GuildApplicationCommandPermissions {
    /** ID of the command or the application ID */
    id: snowflake
    /** ID of the application the command belongs to */
    application_id: snowflake
    /** ID of the guild */
    guild_id: snowflake
    /** Permissions for the command in the guild, max of 100 */
    permissions: ApplicationCommandPermissions[]
  }

  /** https://discord.com/developers/docs/resources/command#application-command-permissions-object-application-command-permissions-structure */
  export interface ApplicationCommandPermissions {
    /** ID of the role, user, or channel. It can also be a permission constant */
    id: snowflake
    /** role (`1`), user (`2`), or channel (`3`) */
    type: ApplicationCommandPermissionType
    /** `true` to allow, `false`, to disallow */
    permission: boolean
  }

}

/** https://discord.com/developers/docs/resources/command#get-global-application-commands-query-string-params */
export interface GetGlobalApplicationCommandsParams {
  /** Whether to include full localization dictionaries (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields. Default `false`. */
  with_localizations?: Boolean
}

/** https://discord.com/developers/docs/resources/command#create-global-application-command-json-params */
export interface CreateGlobalApplicationCommandParams {
  /** Name of command, 1-32 characters */
  name: string
  /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** 1-100 character description for `CHAT_INPUT` commands */
  description?: string
  /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
  description_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** the parameters for the command, max of 25 */
  options?: ApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  default_member_permissions?: string | null
  /** **Deprecated (use `contexts` instead)**; Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dm_permission?: boolean | null
  /** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
  default_permission?: boolean
  /** Installation context(s) where the command is available */
  integration_types?: IntegrationTypes[]
  /** Interaction context(s) where the command can be used */
  contexts?: InteractionContextTypes[]
  /** Type of command, defaults `1` if not set */
  type?: OneOfApplicationCommandType
  /** Indicates whether the command is age-restricted */
  nsfw?: boolean
}

/** https://discord.com/developers/docs/resources/command#edit-global-application-command-json-params */
export interface EditGlobalApplicationCommandParams {
  /** Name of command, 1-32 characters */
  name?: string
  /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** 1-100 character description */
  description?: string
  /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
  description_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** the parameters for the command */
  options?: ApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  default_member_permissions?: string | null
  /** **Deprecated (use `contexts` instead)**; Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dm_permission?: boolean | null
  /** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
  default_permission?: boolean
  /** Installation context(s) where the command is available */
  integration_types?: IntegrationTypes[]
  /** Interaction context(s) where the command can be used */
  contexts?: InteractionContextTypes[]
  /** Indicates whether the command is age-restricted */
  nsfw?: boolean
}

/** https://discord.com/developers/docs/resources/command#get-guild-application-commands-query-string-params */
export interface GetGuildApplicationCommandsParams {
  /** Whether to include full localization dictionaries (`name_localizations` and `description_localizations`) in the returned objects, instead of the `name_localized` and `description_localized` fields. Default `false`. */
  with_localizations?: Boolean
}

/** https://discord.com/developers/docs/resources/command#create-guild-application-command-json-params */
export interface CreateGuildApplicationCommandParams {
  /** Name of command, 1-32 characters */
  name: string
  /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** 1-100 character description for `CHAT_INPUT` commands */
  description?: string
  /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
  description_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** Parameters for the command, max of 25 */
  options?: ApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  default_member_permissions?: string | null
  /** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
  default_permission?: boolean
  /** Type of command, defaults `1` if not set */
  type?: OneOfApplicationCommandType
  /** Indicates whether the command is age-restricted */
  nsfw?: boolean
}

/** https://discord.com/developers/docs/resources/command#edit-guild-application-command-json-params */
export interface EditGuildApplicationCommandParams {
  /** Name of command, 1-32 characters */
  name?: string
  /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** 1-100 character description */
  description?: string
  /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
  description_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** Parameters for the command, max of  25 */
  options?: ApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  default_member_permissions?: string | null
  /** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
  default_permission?: boolean
  /** Indicates whether the command is age-restricted */
  nsfw?: boolean
}

/** https://discord.com/developers/docs/resources/command#bulk-overwrite-guild-application-commands-json-params */
export interface BulkOverwriteGuildApplicationCommandsParams {
  /** ID of the command, if known */
  id?: snowflake
  /** Name of command, 1-32 characters */
  name: string
  /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
  name_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** 1-100 character description */
  description: string
  /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
  description_localizations?: DictionaryWithKeysInAvailableLocales | null
  /** Parameters for the command */
  options?: ApplicationCommandOption[]
  /** Set of permissions represented as a bit set */
  default_member_permissions?: string | null
  /** **Deprecated (use `contexts` instead)**; Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dm_permission?: boolean | null
  /** Replaced by `default_member_permissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
  default_permission?: boolean
  /** Installation context(s) where the command is available, defaults to `GUILD_INSTALL` (`[0]`) */
  integration_types: IntegrationTypes[]
  /** Interaction context(s) where the command can be used, defaults to all contexts `[0,1,2]` */
  contexts: InteractionContextTypes[]
  /** Type of command, defaults `1` if not set */
  type?: OneOfApplicationCommandType
}

/** https://discord.com/developers/docs/resources/command#edit-application-command-permissions-json-params */
export interface EditApplicationCommandPermissionsParams {
  /** Permissions for the command in the guild */
  permissions: ApplicationCommandPermissions[]
}

declare module './internal' {
  interface Internal {
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/resources/command#get-global-application-commands
     */
    getGlobalApplicationCommands(application_id: snowflake, params: GetGlobalApplicationCommandsParams): Promise<void>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/resources/command#create-global-application-command
     */
    createGlobalApplicationCommand(application_id: snowflake, params: CreateGlobalApplicationCommandParams): Promise<void>
    /**
     * Fetch a global command for your application. Returns an application command object.
     * @see https://discord.com/developers/docs/resources/command#get-global-application-command
     */
    getGlobalApplicationCommand(application_id: snowflake, command_id: snowflake): Promise<void>
    /**
     * <Info>
     * @see https://discord.com/developers/docs/resources/command#edit-global-application-command
     */
    editGlobalApplicationCommand(application_id: snowflake, command_id: snowflake, params: EditGlobalApplicationCommandParams): Promise<void>
    /**
     * Deletes a global command. Returns `204 No Content` on success.
     * @see https://discord.com/developers/docs/resources/command#delete-global-application-command
     */
    deleteGlobalApplicationCommand(application_id: snowflake, command_id: snowflake): Promise<void>
    /**
     * Takes a list of application commands, overwriting the existing global command list for this application. Returns `200` and a list of application command objects. Commands that do not already exist will count toward daily application command create limits.
     * @see https://discord.com/developers/docs/resources/command#bulk-overwrite-global-application-commands
     */
    bulkOverwriteGlobalApplicationCommands(application_id: snowflake): Promise<void>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/resources/command#get-guild-application-commands
     */
    getGuildApplicationCommands(application_id: snowflake, guild_id: snowflake, params: GetGuildApplicationCommandsParams): Promise<void>
    /**
     * <Danger>
     * @see https://discord.com/developers/docs/resources/command#create-guild-application-command
     */
    createGuildApplicationCommand(application_id: snowflake, guild_id: snowflake, params: CreateGuildApplicationCommandParams): Promise<void>
    /**
     * Fetch a guild command for your application. Returns an application command object.
     * @see https://discord.com/developers/docs/resources/command#get-guild-application-command
     */
    getGuildApplicationCommand(application_id: snowflake, guild_id: snowflake, command_id: snowflake): Promise<void>
    /**
     * <Info>
     * @see https://discord.com/developers/docs/resources/command#edit-guild-application-command
     */
    editGuildApplicationCommand(application_id: snowflake, guild_id: snowflake, command_id: snowflake, params: EditGuildApplicationCommandParams): Promise<void>
    /**
     * Delete a guild command. Returns `204 No Content` on success.
     * @see https://discord.com/developers/docs/resources/command#delete-guild-application-command
     */
    deleteGuildApplicationCommand(application_id: snowflake, guild_id: snowflake, command_id: snowflake): Promise<void>
    /**
     * Takes a list of application commands, overwriting the existing command list for this application for the targeted guild. Returns `200` and a list of application command objects.
     * @see https://discord.com/developers/docs/resources/command#bulk-overwrite-guild-application-commands
     */
    bulkOverwriteGuildApplicationCommands(application_id: snowflake, guild_id: snowflake, params: BulkOverwriteGuildApplicationCommandsParams): Promise<void>
    /**
     * Fetches permissions for all commands for your application in a guild. Returns an array of guild application command permissions objects.
     * @see https://discord.com/developers/docs/resources/command#get-guild-application-command-permissions
     */
    getGuildApplicationCommandPermissions(application_id: snowflake, guild_id: snowflake): Promise<GuildApplicationCommandPermissions[]>
    /**
     * Fetches permissions for a specific command for your application in a guild. Returns a guild application command permissions object.
     * @see https://discord.com/developers/docs/resources/command#get-application-command-permissions
     */
    getApplicationCommandPermissions(application_id: snowflake, guild_id: snowflake, command_id: snowflake): Promise<GuildApplicationCommandPermissions>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/resources/command#edit-application-command-permissions
     */
    editApplicationCommandPermissions(application_id: snowflake, guild_id: snowflake, command_id: snowflake, params: EditApplicationCommandPermissionsParams): Promise<void>
    /**
     * <Danger>
     * @see https://discord.com/developers/docs/resources/command#batch-edit-application-command-permissions
     */
    batchEditApplicationCommandPermissions(application_id: snowflake, guild_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/applications/{application.id}/commands': {
    GET: 'getGlobalApplicationCommands',
    POST: 'createGlobalApplicationCommand',
    PUT: 'bulkOverwriteGlobalApplicationCommands',
  },
  '/applications/{application.id}/commands/{command.id}': {
    GET: 'getGlobalApplicationCommand',
    PATCH: 'editGlobalApplicationCommand',
    DELETE: 'deleteGlobalApplicationCommand',
  },
  '/applications/{application.id}/guilds/{guild.id}/commands': {
    GET: 'getGuildApplicationCommands',
    POST: 'createGuildApplicationCommand',
    PUT: 'bulkOverwriteGuildApplicationCommands',
  },
  '/applications/{application.id}/guilds/{guild.id}/commands/{command.id}': {
    GET: 'getGuildApplicationCommand',
    PATCH: 'editGuildApplicationCommand',
    DELETE: 'deleteGuildApplicationCommand',
  },
  '/applications/{application.id}/guilds/{guild.id}/commands/permissions': {
    GET: 'getGuildApplicationCommandPermissions',
    PUT: 'batchEditApplicationCommandPermissions',
  },
  '/applications/{application.id}/guilds/{guild.id}/commands/{command.id}/permissions': {
    GET: 'getApplicationCommandPermissions',
    PUT: 'editApplicationCommandPermissions',
  },
})
