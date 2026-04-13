import { Internal, User, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/interaction#interaction-object-interaction-structure */
export interface Interaction {
  /** ID of the interaction */
  id: snowflake
  /** ID of the application this interaction is for */
  application_id: snowflake
  /** Type of interaction */
  type: InteractionType
  /** Interaction data payload */
  data?: InteractionData
  /** Guild that the interaction was sent from */
  guild?: PartialGuild
  /** Guild that the interaction was sent from */
  guild_id?: snowflake
  /** Channel that the interaction was sent from */
  channel?: PartialChannel
  /** Channel that the interaction was sent from */
  channel_id?: snowflake
  /** Guild member data for the invoking user, including permissions */
  member?: GuildMember
  /** User object for the invoking user, if invoked in a DM */
  user?: User
  /** Continuation token for responding to the interaction */
  token: string
  /** Read-only property, always `1` */
  version: integer
  /** For components or modals triggered by components, the message they were attached to */
  message?: Message
  /** Bitwise set of permissions the app has in the source location of the interaction */
  app_permissions: string
  /** Selected language of the invoking user */
  locale?: string
  /** Guild's preferred locale, if invoked in a guild */
  guild_locale?: string
  /** For monetized apps, any entitlements for the invoking user, representing access to premium SKUs */
  entitlements: Entitlement[]
  /** Mapping of installation contexts that the interaction was authorized for to related user or guild IDs. See Authorizing Integration Owners Object for details */
  authorizing_integration_owners: DictionaryWithKeysOfApplicationIntegrationTypes
  /** Context where the interaction was triggered from */
  context?: InteractionContextType
  /** Attachment size limit in bytes */
  attachment_size_limit: integer
}

export namespace Interaction {
  /** https://discord.com/developers/docs/resources/interaction#interaction-object-interaction-type */
  export enum Type {
    PING = 1,
    APPLICATION_COMMAND = 2,
    MESSAGE_COMPONENT = 3,
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    MODAL_SUBMIT = 5,
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-object-interaction-context-types */
  export enum ContextType {
    /** Interaction can be used within servers */
    0 = 0,
    /** Interaction can be used within DMs with the app's bot user */
    1 = 1,
    /** Interaction can be used within Group DMs and DMs other than the app's bot user */
    2 = 2,
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-response-object-interaction-callback-type */
  export enum CallbackType {
    /** ACK a `Ping` */
    PONG = 1,
    /** Respond to an interaction with a message */
    CHANNEL_MESSAGE_WITH_SOURCE = 4,
    /** ACK an interaction and edit a response later, the user sees a loading state */
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
    /** For components, ACK an interaction and edit the original message later; the user does not see a loading state */
    DEFERRED_UPDATE_MESSAGE = 6,
    /** For components, edit the message the component was attached to */
    UPDATE_MESSAGE = 7,
    /** Respond to an autocomplete interaction with suggested choices */
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
    /** Respond to an interaction with a popup modal */
    MODAL = 9,
    /** **Deprecated**; respond to an interaction with an upgrade button, only available for apps with monetization enabled */
    PREMIUM_REQUIRED = 10,
    /** Launch the Activity associated with the app. Only available for apps with Activities enabled */
    LAUNCH_ACTIVITY = 12,
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-object-application-command-data-structure */
  export interface ApplicationCommandData {
    /** `ID` of the invoked command */
    id: snowflake
    /** `name` of the invoked command */
    name: string
    /** `type` of the invoked command */
    type: integer
    /** Converted users + roles + channels + attachments */
    resolved?: ResolvedData
    /** Params + values from the user */
    options?: ApplicationCommandInteractionDataOption[]
    /** ID of the guild the command is registered to */
    guild_id?: snowflake
    /** ID of the user or message targeted by a user or message command */
    target_id?: snowflake
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-object-message-component-data-structure */
  export interface MessageComponentData {
    /** `custom_id` of the component */
    custom_id: string
    /** type of the component */
    component_type: integer
    /** Values the user selected in a select menu component */
    values?: SelectOptionValues[]
    /** Resolved entities from selected options */
    resolved?: ResolvedData
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-object-modal-submit-data-structure */
  export interface ModalSubmitData {
    /** The custom ID provided for the modal */
    custom_id: string
    /** Values submitted by the user */
    components: ComponentInteractionResponse[]
    /** Resolved entities from selected options */
    resolved?: ResolvedData
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-object-resolved-data-structure */
  export interface ResolvedData {
    /** IDs and User objects */
    users?: MapOfSnowflakesToUser
    /** IDs and partial Member objects */
    members?: MapOfSnowflakesToPartialMember
    /** IDs and Role objects */
    roles?: MapOfSnowflakesToRole
    /** IDs and partial Channel objects */
    channels?: MapOfSnowflakesToPartialChannel
    /** IDs and partial Message objects */
    messages?: MapOfSnowflakesToPartialMessages
    /** IDs and attachment objects */
    attachments?: MapOfSnowflakesToAttachment
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-object-application-command-interaction-data-option-structure */
  export interface ApplicationCommandInteractionDataOption {
    /** Name of the parameter */
    name: string
    /** Value of application command option type */
    type: integer
    /** Value of the option resulting from user input */
    value?: String,Integer,Double,OrBoolean
    /** Present if this option is a group or subcommand */
    options?: ApplicationCommandInteractionDataOption[]
    /** `true` if this option is the currently focused option for autocomplete */
    focused?: boolean
  }

  /** https://discord.com/developers/docs/resources/interaction#message-interaction-object-message-interaction-structure */
  export interface MessageInteraction {
    /** ID of the interaction */
    id: snowflake
    /** Type of interaction */
    type: InteractionType
    /** Name of the application command, including subcommands and subcommand groups */
    name: string
    /** User who invoked the interaction */
    user: User
    /** Member who invoked the interaction in the guild */
    member?: PartialMember
  }

  /** https://discord.com/developers/docs/resources/interaction#interaction-response-object-interaction-response-structure */
  export interface PackResult {
    /** Type of response */
    type: InteractionCallbackType
    /** An optional response message */
    data?: InteractionCallbackData
  }

  export namespace Params {
    /** https://discord.com/developers/docs/resources/interaction#create-interaction-response-query-string-params */
    export interface Create {
      /** Whether to include an interaction callback object as the response */
      with_response?: boolean
    }

  }
}

declare module './internal' {
  interface Internal {
    /**
     * Create a response to an Interaction. Body is an interaction response. Returns `204` unless `with_response` is set to `true` which returns `200` with the body as interaction callback response.
     * @see https://discord.com/developers/docs/resources/interaction#create-interaction-response
     */
    createInteractionResponse(interaction_id: snowflake, interaction_token: snowflake, params: Interaction.Params.Create): Promise<void>
    /**
     * Returns the initial Interaction response. Functions the same as Get Webhook Message.
     * @see https://discord.com/developers/docs/resources/interaction#get-original-interaction-response
     */
    getOriginalInteractionResponse(application_id: snowflake, interaction_token: snowflake): Promise<void>
    /**
     * Edits the initial Interaction response. Functions the same as Edit Webhook Message.
     * @see https://discord.com/developers/docs/resources/interaction#edit-original-interaction-response
     */
    editOriginalInteractionResponse(application_id: snowflake, interaction_token: snowflake): Promise<void>
    /**
     * Deletes the initial Interaction response. Returns `204 No Content` on success.
     * @see https://discord.com/developers/docs/resources/interaction#delete-original-interaction-response
     */
    deleteOriginalInteractionResponse(application_id: snowflake, interaction_token: snowflake): Promise<void>
    /**
     * <Info>
     * @see https://discord.com/developers/docs/resources/interaction#create-followup-message
     */
    createFollowupMessage(application_id: snowflake, interaction_token: snowflake): Promise<void>
    /**
     * Returns a followup message for an Interaction. Functions the same as Get Webhook Message.
     * @see https://discord.com/developers/docs/resources/interaction#get-followup-message
     */
    getFollowupMessage(application_id: snowflake, interaction_token: snowflake, message_id: snowflake): Promise<void>
    /**
     * Edits a followup message for an Interaction. Functions the same as Edit Webhook Message.
     * @see https://discord.com/developers/docs/resources/interaction#edit-followup-message
     */
    editFollowupMessage(application_id: snowflake, interaction_token: snowflake, message_id: snowflake): Promise<void>
    /**
     * Deletes a followup message for an Interaction. Returns `204 No Content` on success.
     * @see https://discord.com/developers/docs/resources/interaction#delete-followup-message
     */
    deleteFollowupMessage(application_id: snowflake, interaction_token: snowflake, message_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/interactions/{interaction.id}/{interaction.token}/callback': {
    POST: { name: 'createInteractionResponse', multipart: true },
  },
  '/webhooks/{application.id}/{interaction.token}/messages/@original': {
    GET: 'getOriginalInteractionResponse',
    PATCH: 'editOriginalInteractionResponse',
    DELETE: 'deleteOriginalInteractionResponse',
  },
  '/webhooks/{application.id}/{interaction.token}': {
    POST: 'createFollowupMessage',
  },
  '/webhooks/{application.id}/{interaction.token}/messages/{message.id}': {
    GET: 'getFollowupMessage',
    PATCH: 'editFollowupMessage',
    DELETE: 'deleteFollowupMessage',
  },
})
