import { AllowedMentions, ApplicationCommand, Attachment, Channel, Component, ComponentType, Embed, GuildMember, integer, Internal, Message, Role, snowflake, User } from '.'
import * as Discord from '.'

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-structure */
export interface Interaction {
  /** id of the interaction */
  id: snowflake
  /** id of the application this interaction is for */
  application_id: snowflake
  /** the type of interaction */
  type: Interaction.Type
  /** the command data payload */
  data?: InteractionData
  /** the guild it was sent from */
  guild_id?: snowflake
  /** the channel it was sent from */
  channel_id?: snowflake
  /** guild member data for the invoking user, including permissions */
  member?: GuildMember
  /** user object for the invoking user, if invoked in a DM */
  user?: User
  /** a continuation token for responding to the interaction */
  token: string
  /** read-only property, always 1 */
  version: integer
  /** for components, the message they were attached to */
  message?: Message
  /** bitwise set of permissions the app or bot has within the channel the interaction was sent from */
  app_permissions?: string
  /** selected language of the invoking user */
  locale?: string
  /** guild's preferred locale, if invoked in a guild */
  guild_locale?: string
}

export type InteractionData =
  | InteractionData.ApplicationCommand
  | InteractionData.MessageComponent
  | InteractionData.ModalSubmit

export namespace InteractionData {
  /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-data-structure */
  export interface ApplicationCommand {
    /** the ID of the invoked command */
    id: snowflake
    /** the name of the invoked command */
    name: string
    /** the type of the invoked command */
    type: integer
    /** converted users + roles + channels */
    resolved?: ResolvedData
    /** the params + values from the user */
    options?: ApplicationCommand.Option[]
    /** the id of the guild the command is registered to */
    guild_id?: snowflake
    /** id of the user or message targeted by a user or message command */
    target_id?: snowflake
  }

  export namespace ApplicationCommand {
    /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure */
    export interface Option {
      /** the name of the parameter */
      name: string
      /** value of application command option type */
      type: Discord.ApplicationCommand.OptionType
      /** the value of the pair */
      value?: any
      /** present if this option is a group or subcommand */
      options?: Option[]
      /** true if this option is the currently focused option for autocomplete */
      focused?: boolean
    }
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-message-component-data-structure */
  export interface MessageComponent {
    /** the custom_id of the component */
    custom_id: string
    /** the type of the component */
    component_type: ComponentType
    /** values the user selected in a select menu component */
    values?: string[]
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-modal-submit-data-structure */
  export interface ModalSubmit {
    custom_id: string
    components: Component[]
  }
}

export namespace Interaction {
  /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type */
  export enum Type {
    PING = 1,
    APPLICATION_COMMAND = 2,
    MESSAGE_COMPONENT = 3,
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    MODAL_SUBMIT = 5,
  }
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface ResolvedData {
  /** the ids and User objects */
  users?: Record<snowflake, User>
  /** the ids and partial Member objects */
  members?: Record<snowflake, Partial<GuildMember>>
  /** the ids and Role objects */
  roles?: Record<snowflake, Role>
  /** the ids and partial Channel objects */
  channels?: Record<snowflake, Partial<Channel>>
  /** the ids and partial Message objects */
  messages?: Record<snowflake, Partial<Message>>
  /** the ids and attachment objects */
  attachments?: Record<snowflake, Attachment>
}

/** https://discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface MessageInteraction {
  /** id of the interaction */
  id: snowflake
  /** the type of interaction */
  type: Interaction.Type
  /** the name of the application command */
  name: string
  /** the user who invoked the interaction */
  user: User
  /** member who invoked the interaction in the guild */
  member?: Partial<GuildMember>
}

export namespace Interaction {
  /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-response-structure */
  export interface Response {
    /** the type of response */
    type: CallbackType
    /** an optional response message */
    data?: CallbackData
  }

  /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type */
  export enum CallbackType {
    /** ACK a Ping */
    PONG = 1,
    /** respond to an interaction with a message */
    CHANNEL_MESSAGE_WITH_SOURCE = 4,
    /** ACK an interaction and edit a response later, the user sees a loading state */
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
    /**
     * for components, ACK an interaction and edit the original message later; the user does not see a loading state
     * (only valid for [component-based](https://discord.com/developers/docs/interactions/message-components) interactions)
     */
    DEFERRED_UPDATE_MESSAGE = 6,
    /**
     * for components, edit the message the component was attached to
     * (only valid for [component-based](https://discord.com/developers/docs/interactions/message-components) interactions)
     */
    UPDATE_MESSAGE = 7,
    /** respond to an autocomplete interaction with suggested choices */
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
    /**
     * respond to an interaction with a popup modal
     * (not available for `MODAL_SUBMIT` and `PING` interactions)
     */
    MODAL = 9,
  }

  export type CallbackData =
    | CallbackData.Messages
    | CallbackData.Autocomplete
    | CallbackData.Modal

  export namespace CallbackData {
    /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-messages */
    export interface Messages {
      /** is the response TTS */
      tts?: boolean
      /** message content */
      content?: string
      /** supports up to 10 embeds */
      embeds?: Embed[]
      /** allowed mentions object */
      allowed_mentions?: AllowedMentions
      /** interaction callback data flags */
      flags?: integer
      /** message components */
      components?: Component[]
      /** attachment objects with filename and description */
      attachments?: Partial<Attachment>[]
    }

    /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-autocomplete */
    export interface Autocomplete {
      /** autocomplete choices (max of 25 choices) */
      choices: ApplicationCommand.OptionChoice[]
    }

    /** https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-modal */
    export interface Modal {
      /** a developer-defined identifier for the modal, max 100 characters */
      custom_id: string
      /** the title of the popup modal, max 45 characters */
      title: string
      /** between 1 and 5 (inclusive) components that make up the modal */
      components: Component[]
    }
  }
}

export interface InteractionCreateEvent extends Interaction { }

declare module './gateway' {
  interface GatewayEvents {
    /** user used an interaction, such as an Application Command */
    INTERACTION_CREATE: InteractionCreateEvent
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Create a response to an Interaction from the gateway. Takes an interaction response. This endpoint also supports file attachments similar to the webhook endpoints. Refer to Uploading Files for details on uploading files and multipart/form-data requests.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response
     */
    createInteractionResponse(interaction_id: snowflake, token: string, params: Interaction.Response): Promise<void>
    /**
     * Returns the initial Interaction response. Functions the same as Get Webhook Message.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#get-original-interaction-response
     */
    getOriginalInteractionResponse(application_id: snowflake, token: string): Promise<Interaction.Response>
    /**
     * Edits the initial Interaction response. Functions the same as Edit Webhook Message.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response
     */
    editOriginalInteractionResponse(application_id: snowflake, token: string): Promise<Interaction.Response>
    /**
     * Deletes the initial Interaction response. Returns 204 No Content on success.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response
     */
    deleteOriginalInteractionResponse(application_id: snowflake, token: string): Promise<void>
    /**
     * Create a followup message for an Interaction. Functions the same as Execute Webhook, but wait is always true, and flags can be set to 64 in the body to send an ephemeral message. The thread_id, avatar_url, and username parameters are not supported when using this endpoint for interaction followups.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message
     */
    createFollowupMessage(application_id: snowflake, token: string): Promise<any>
    /**
     * Returns a followup message for an Interaction. Functions the same as Get Webhook Message. Does not support ephemeral followups.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#get-followup-message
     */
    getFollowupMessage(application_id: snowflake, token: string, message_id: snowflake): Promise<any>
    /**
     * Edits a followup message for an Interaction. Functions the same as Edit Webhook Message. Does not support ephemeral followups.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message
     */
    editFollowupMessage(application_id: snowflake, token: string, message_id: snowflake): Promise<any>
    /**
     * Deletes a followup message for an Interaction. Returns 204 No Content on success. Does not support ephemeral followups.
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#delete-followup-message
     */
    deleteFollowupMessage(application_id: snowflake, token: string, message_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/interactions/{interaction.id}/{interaction.token}/callback': {
    POST: 'createInteractionResponse',
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
