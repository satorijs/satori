import { Internal, User, integer, snowflake, timestamp } from '.'

/** https://discord.com/developers/docs/resources/message#message-object-message-activity-structure */
export interface Message {
  /** type of message activity */
  type: Message.ActivityType
  /** party_id from a Rich Presence event */
  party_id?: string
}

export namespace Message {
  /** https://discord.com/developers/docs/resources/message#message-object-message-types */
  export enum Type {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    USER_JOIN = 7,
    GUILD_BOOST = 8,
    GUILD_BOOST_TIER_1 = 9,
    GUILD_BOOST_TIER_2 = 10,
    GUILD_BOOST_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    THREAD_CREATED = 18,
    REPLY = 19,
    CHAT_INPUT_COMMAND = 20,
    THREAD_STARTER_MESSAGE = 21,
    GUILD_INVITE_REMINDER = 22,
    CONTEXT_MENU_COMMAND = 23,
    AUTO_MODERATION_ACTION = 24,
    ROLE_SUBSCRIPTION_PURCHASE = 25,
    INTERACTION_PREMIUM_UPSELL = 26,
    STAGE_START = 27,
    STAGE_END = 28,
    STAGE_SPEAKER = 29,
    STAGE_TOPIC = 31,
    GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
    GUILD_INCIDENT_ALERT_MODE_ENABLED = 36,
    GUILD_INCIDENT_ALERT_MODE_DISABLED = 37,
    GUILD_INCIDENT_REPORT_RAID = 38,
    GUILD_INCIDENT_REPORT_FALSE_ALARM = 39,
    PURCHASE_NOTIFICATION = 44,
    POLL_RESULT = 46,
  }

  /** https://discord.com/developers/docs/resources/message#message-object-message-activity-types */
  export enum ActivityType {
    JOIN = 1,
    SPECTATE = 2,
    LISTEN = 3,
    JOIN_REQUEST = 5,
  }

  /** https://discord.com/developers/docs/resources/message#message-object-message-flags */
  export enum Flag {
    /** this message has been published to subscribed channels (via Channel Following) */
    CROSSPOSTED = 1 << 0,
    /** this message originated from a message in another channel (via Channel Following) */
    IS_CROSSPOST = 1 << 1,
    /** do not include any embeds when serializing this message */
    SUPPRESS_EMBEDS = 1 << 2,
    /** the source message for this crosspost has been deleted (via Channel Following) */
    SOURCE_MESSAGE_DELETED = 1 << 3,
    /** this message came from the urgent message system */
    URGENT = 1 << 4,
    /** this message has an associated thread, with the same id as the message */
    HAS_THREAD = 1 << 5,
    /** this message is only visible to the user who invoked the Interaction */
    EPHEMERAL = 1 << 6,
    /** this message is an Interaction Response and the bot is "thinking" */
    LOADING = 1 << 7,
    /** this message failed to mention some roles and add their members to the thread */
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8,
    /** this message will not trigger push and desktop notifications */
    SUPPRESS_NOTIFICATIONS = 1 << 12,
    /** this message is a voice message */
    IS_VOICE_MESSAGE = 1 << 13,
    /** this message has a snapshot (via Message Forwarding) */
    HAS_SNAPSHOT = 1 << 14,
    /** allows you to create fully component-driven messages */
    IS_COMPONENTS_V2 = 1 << 15,
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-types */
  export enum EmbedType {
    /** generic embed rendered from embed attributes */
    rich = 'generic embed rendered from embed attributes',
    /** image embed */
    image = 'image embed',
    /** video embed */
    video = 'video embed',
    /** animated gif image embed rendered as a video embed */
    gifv = 'animated gif image embed rendered as a video embed',
    /** article embed */
    article = 'article embed',
    /** link embed */
    link = 'link embed',
    /** poll result embed */
    poll_result = '[poll result embed](/developers/resources/message#embed-fields-by-embed-type-poll-result-embed-fields)',
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-flags */
  export enum EmbedFlag {
    /** this embed is a fallback for a reply to an activity card */
    IS_CONTENT_INVENTORY_ENTRY = 1 << 5,
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-media-flags */
  export enum EmbedMediaFlag {
    /** this image is animated */
    IS_ANIMATED = 1 << 5,
  }

  /** https://discord.com/developers/docs/resources/message#attachment-object-attachment-flags */
  export enum AttachmentFlag {
    /** this attachment is a Clip from a stream */
    IS_CLIP = 1 << 0,
    /** this attachment is the thumbnail of a thread in a media channel, displayed in the grid but not on the message */
    IS_THUMBNAIL = 1 << 1,
    /** this attachment has been edited using the remix feature on mobile (deprecated) */
    IS_REMIX = 1 << 2,
    /** this attachment was marked as a spoiler and is blurred until clicked */
    IS_SPOILER = 1 << 3,
    /** this attachment is an animated image */
    IS_ANIMATED = 1 << 5,
  }

  /** https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mention-types */
  export enum AllowedMentionType {
    /** Controls role mentions */
    Role Mentions = '"roles"',
    /** Controls user mentions */
    User Mentions = '"users"',
    /** Controls @everyone and @here mentions */
    Everyone Mentions = '"everyone"',
  }

  /** https://discord.com/developers/docs/resources/message#base-theme-types */
  export enum BaseThemeType {
    UNSET \[1\] = 0,
    DARK = 1,
    LIGHT = 2,
    DARKER = 3,
    MIDNIGHT = 4,
  }

  /** https://discord.com/developers/docs/resources/message#search-guild-messages-author-types */
  export enum AuthorType {
    /** Return messages sent by user accounts */
    user = 'Return messages sent by user accounts',
    /** Return messages sent by bot accounts */
    bot = 'Return messages sent by bot accounts',
    /** Return messages sent by webhooks */
    webhook = 'Return messages sent by webhooks',
  }

  /** https://discord.com/developers/docs/resources/message#search-guild-messages-search-has-types */
  export enum SearchHasType {
    /** Return messages that have an image */
    image = 'Return messages that have an image',
    /** Return messages that have a sound attachment */
    sound = 'Return messages that have a sound attachment',
    /** Return messages that have a video */
    video = 'Return messages that have a video',
    /** Return messages that have an attachment */
    file = 'Return messages that have an attachment',
    /** Return messages that have a sent sticker */
    sticker = 'Return messages that have a sent sticker',
    /** Return messages that have an embed */
    embed = 'Return messages that have an embed',
    /** Return messages that have a link */
    link = 'Return messages that have a link',
    /** Return messages that have a poll */
    poll = 'Return messages that have a poll',
    /** Return messages that have a forwarded message */
    snapshot = 'Return messages that have a forwarded message',
  }

  /** https://discord.com/developers/docs/resources/message#search-guild-messages-search-embed-types */
  export enum SearchEmbedType {
    /** Return messages that have an image embed */
    image = 'Return messages that have an image embed',
    /** Return messages that have a video embed */
    video = 'Return messages that have a video embed',
    /** Return messages that have a gifv embed */
    gif \[1\] = 'Return messages that have a gifv embed',
    /** Return messages that have a sound embed */
    sound = 'Return messages that have a sound embed',
    /** Return messages that have an article embed */
    article = 'Return messages that have an article embed',
  }

  /** https://discord.com/developers/docs/resources/message#get-reactions-reaction-types */
  export enum ReactionType {
    NORMAL = 0,
    BURST = 1,
  }

  /** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-application-command-interaction-metadata-structure */
  export interface ApplicationCommandInteractionMetadata {
    /** ID of the interaction */
    id: snowflake
    /** Type of interaction */
    type: InteractionType
    /** User who triggered the interaction */
    user: User
    /** IDs for installation context(s) related to an interaction. Details in Authorizing Integration Owners Object */
    authorizing_integration_owners: DictionaryWithKeysOfApplicationIntegrationTypes
    /** ID of the original response message, present only on follow-up messages */
    original_response_message_id?: snowflake
    /** The user the command was run on, present only on user command interactions */
    target_user?: User
    /** The ID of the message the command was run on, present only on message command interactions. The original response message will also have `message_reference` and `referenced_message` pointing to this message. */
    target_message_id?: snowflake
  }

  /** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-message-component-interaction-metadata-structure */
  export interface ComponentInteractionMetadata {
    /** ID of the interaction */
    id: snowflake
    /** Type of interaction */
    type: InteractionType
    /** User who triggered the interaction */
    user: User
    /** IDs for installation context(s) related to an interaction. Details in Authorizing Integration Owners Object */
    authorizing_integration_owners: DictionaryWithKeysOfApplicationIntegrationTypes
    /** ID of the original response message, present only on follow-up messages */
    original_response_message_id?: snowflake
    /** ID of the message that contained the interactive component */
    interacted_message_id: snowflake
  }

  /** https://discord.com/developers/docs/resources/message#message-interaction-metadata-object-modal-submit-interaction-metadata-structure */
  export interface ModalSubmitInteractionMetadata {
    /** ID of the interaction */
    id: snowflake
    /** Type of interaction */
    type: InteractionType
    /** User who triggered the interaction */
    user: User
    /** IDs for installation context(s) related to an interaction. Details in Authorizing Integration Owners Object */
    authorizing_integration_owners: DictionaryWithKeysOfApplicationIntegrationTypes
    /** ID of the original response message, present only on follow-up messages */
    original_response_message_id?: snowflake
    /** Metadata for the interaction that was used to open the modal */
    triggering_interaction_metadata: ApplicationCommandInteractionMetadataOrMessageComponentInteractionMetadata
  }

  /** https://discord.com/developers/docs/resources/message#message-call-object-message-call-object-structure */
  export interface CallObject {
    /** array of user object ids that participated in the call */
    participants: Snowflakes[]
    /** time when call ended */
    ended_timestamp?: timestamp | null
  }

  /** https://discord.com/developers/docs/resources/message#reaction-object-reaction-structure */
  export interface Reaction {
    /** Total number of times this emoji has been used to react (including super reacts) */
    count: integer
    /** Reaction count details object */
    count_details: any
    /** Whether the current user reacted using this emoji */
    me: boolean
    /** Whether the current user super-reacted using this emoji */
    me_burst: boolean
    /** emoji information */
    emoji: PartialEmoji
    /** HEX colors used for super reaction */
    burst_colors: Array
  }

  /** https://discord.com/developers/docs/resources/message#reaction-count-details-object-reaction-count-details-structure */
  export interface ReactionCountDetails {
    /** Count of super reactions */
    burst: integer
    /** Count of normal reactions */
    normal: integer
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-structure */
  export interface Embed {
    /** title of embed */
    title?: string
    /** type of embed (always "rich" for webhook embeds) */
    type?: Message.EmbedType
    /** description of embed */
    description?: string
    /** url of embed */
    url?: string
    /** timestamp of embed content */
    timestamp?: timestamp
    /** color code of the embed */
    color?: integer
    /** footer information */
    footer?: EmbedFooter
    /** image information */
    image?: EmbedImage
    /** thumbnail information */
    thumbnail?: EmbedImage
    /** video information */
    video?: EmbedVideo
    /** provider information */
    provider?: EmbedProvider
    /** author information */
    author?: EmbedAuthor
    /** fields information, max of 25 */
    fields?: EmbedField[]
    /** embed flags combined as a bitfield */
    flags?: integer
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-video-structure */
  export interface EmbedVideo {
    /** source url of video */
    url?: string
    /** a proxied url of the video */
    proxy_url?: string
    /** height of video */
    height?: integer
    /** width of video */
    width?: integer
    /** the video's media type */
    content_type?: string
    /** thumbhash placeholder of the video */
    placeholder?: string
    /** version of the placeholder */
    placeholder_version?: integer
    /** description (alt text) for the video */
    description?: string
    /** embed media flags combined as a bitfield */
    flags?: integer
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-image-structure */
  export interface EmbedImage {
    /** source url of image (only supports http(s) and attachments) */
    url: string
    /** a proxied url of the image */
    proxy_url?: string
    /** height of image */
    height?: integer
    /** width of image */
    width?: integer
    /** the image's media type */
    content_type?: string
    /** thumbhash placeholder of the image */
    placeholder?: string
    /** version of the placeholder */
    placeholder_version?: integer
    /** description (alt text) for the image */
    description?: string
    /** embed media flags combined as a bitfield */
    flags?: integer
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-provider-structure */
  export interface EmbedProvider {
    /** name of provider */
    name?: string
    /** url of provider */
    url?: string
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-author-structure */
  export interface EmbedAuthor {
    /** name of author */
    name: string
    /** url of author (only supports http(s)) */
    url?: string
    /** url of author icon (only supports http(s) and attachments) */
    icon_url?: string
    /** a proxied url of author icon */
    proxy_icon_url?: string
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-footer-structure */
  export interface EmbedFooter {
    /** footer text */
    text: string
    /** url of footer icon (only supports http(s) and attachments) */
    icon_url?: string
    /** a proxied url of footer icon */
    proxy_icon_url?: string
  }

  /** https://discord.com/developers/docs/resources/message#embed-object-embed-field-structure */
  export interface EmbedField {
    /** name of the field */
    name: string
    /** value of the field */
    value: string
    /** whether or not this field should display inline */
    inline?: boolean
  }

  /** https://discord.com/developers/docs/resources/message#attachment-object-attachment-structure */
  export interface Attachment {
    /** attachment id */
    id: snowflake
    /** name of file attached */
    filename: string
    /** the title of the file */
    title?: string
    /** description (alt text) for the file (max 1024 characters) */
    description?: string
    /** the attachment's media type */
    content_type?: string
    /** size of file in bytes */
    size: integer
    /** source url of file */
    url: string
    /** a proxied url of file */
    proxy_url: string
    /** height of file (if image or video) */
    height?: integer | null
    /** width of file (if image or video) */
    width?: integer | null
    /** thumbhash placeholder (if image or video) */
    placeholder?: string
    /** version of the placeholder (if image or video) */
    placeholder_version?: integer
    /** whether this attachment is ephemeral */
    ephemeral?: boolean
    /** the duration of the audio file (currently for voice messages) */
    duration_secs?: number
    /** base64 encoded bytearray representing a sampled waveform (currently for voice messages) */
    waveform?: string
    /** attachment flags combined as a bitfield */
    flags?: integer
    /** for Clips, array of users who were in the stream */
    clip_participants?: User[]
    /** for Clips, when the clip was created */
    clip_created_at?: timestamp
    /** for Clips, the application in the stream, if recognized */
    application?: Application | null
  }

  /** https://discord.com/developers/docs/resources/message#channel-mention-object-channel-mention-structure */
  export interface ChannelMention {
    /** id of the channel */
    id: snowflake
    /** id of the guild containing the channel */
    guild_id: snowflake
    /** the type of channel */
    type: integer
    /** the name of the channel */
    name: string
  }

  /** https://discord.com/developers/docs/resources/message#role-subscription-data-object-role-subscription-data-object-structure */
  export interface RoleSubscriptionDataObject {
    /** the id of the sku and listing that the user is subscribed to */
    role_subscription_listing_id: snowflake
    /** the name of the tier that the user is subscribed to */
    tier_name: string
    /** the cumulative number of months that the user has been subscribed for */
    total_months_subscribed: integer
    /** whether this notification is for a renewal rather than a new purchase */
    is_renewal: boolean
  }

  /** https://discord.com/developers/docs/resources/message#get-channel-pins-response-structure */
  export interface PackResult {
    /**  */
    items: MessagePin[]
    /**  */
    has_more: boolean
  }

  export namespace Params {
    /** https://discord.com/developers/docs/resources/message#get-channel-messages-query-string-params */
    export interface GetChannelMessages {
      /** Get messages around this message ID */
      around?: snowflake
      /** Get messages before this message ID */
      before?: snowflake
      /** Get messages after this message ID */
      after?: snowflake
      /** Max number of messages to return (1-100) */
      limit?: integer
    }

    /** https://discord.com/developers/docs/resources/message#search-guild-messages-query-string-params */
    export interface SearchGuildMessages {
      /** Max number of messages to return (1-25, default 25) */
      limit?: integer
      /** Number to offset the returned messages by (max 9975) */
      offset?: integer
      /** Get messages before this message ID */
      max_id?: snowflake
      /** Get messages after this message ID */
      min_id?: snowflake
      /** Max number of words to skip between matching tokens in the search `content` (max 100, default 2) */
      slop?: integer
      /** Filter messages by content (max 1024 characters) */
      content?: string
      /** Filter messages by these channels (max 500) */
      channel_id?: Snowflakes[]
      /** Filter messages by author type */
      author_type?: Strings[]
      /** Filter messages by these authors (max 100) */
      author_id?: Snowflakes[]
      /** Filter messages that mention these users (max 100) */
      mentions?: Snowflakes[]
      /** Filter messages that mention these roles (max 100) */
      mentions_role_id?: Snowflakes[]
      /** Filter messages that do or do not mention @everyone */
      mention_everyone?: boolean
      /** Filter messages that reply to these users (max 100) */
      replied_to_user_id?: Snowflakes[]
      /** Filter messages that reply to these messages (max 100) */
      replied_to_message_id?: Snowflakes[]
      /** Filter messages by whether they are or are not pinned */
      pinned?: boolean
      /** Filter messages by whether or not they have specific things */
      has?: Strings[]
      /** Filter messages by embed type */
      embed_type?: Strings[]
      /** Filter messages by embed provider (case-sensitive, e.g. `Tenor`) (max 256 characters, max 100) */
      embed_provider?: Strings[]
      /** Filter messages by link hostname (e.g. `discordapp.com`) (max 256 characters, max 100) */
      link_hostname?: Strings[]
      /** Filter messages by attachment filename (max 1024 characters, max 100) */
      attachment_filename?: Strings[]
      /** Filter messages by attachment extension (e.g. `txt`) (max 256 characters, max 100) */
      attachment_extension?: Strings[]
      /** The sorting algorithm to use */
      sort_by? \[1\]: string
      /** The direction to sort (`asc` or `desc`, default `desc`) */
      sort_order? \[1\]: string
      /** Whether to include results from age-restricted channels (default false) */
      include_nsfw?: boolean
    }

    /** https://discord.com/developers/docs/resources/message#create-message-json/form-params */
    export interface Create {
      /** Message contents (up to 2000 characters) */
      content?: string
      /** Can be used to verify a message was sent (up to 25 characters). Value will appear in the Message Create event. */
      nonce?: IntegerOrString
      /** `true` if this is a TTS message */
      tts?: boolean
      /** Up to 10 `rich` embeds (up to 6000 characters) */
      embeds?: Embed[]
      /** Allowed mentions for the message */
      allowed_mentions?: AllowedMention
      /** Include to make your message a reply or a forward */
      message_reference?: MessageReference
      /** Components to include with the message */
      components?: MessageComponent[]
      /** IDs of up to 3 stickers in the server to send in the message */
      sticker_ids?: Snowflakes[]
      /** Contents of the file being sent. See Uploading Files */
      files[n]?: any
      /** JSON-encoded body of non-file params, only for `multipart/form-data` requests. See Uploading Files */
      payload_json?: string
      /** Attachment objects with filename and description. See Uploading Files */
      attachments?: PartialAttachment[]
      /** Message flags combined as a bitfield (only `SUPPRESS_EMBEDS`, `SUPPRESS_NOTIFICATIONS`, `IS_VOICE_MESSAGE`, and `IS_COMPONENTS_V2` can be set) */
      flags?: integer
      /** If true and nonce is present, it will be checked for uniqueness in the past few minutes. If another message was created by the same author with the same nonce, that message will be returned and no new message will be created. */
      enforce_nonce?: boolean
      /** A poll! */
      poll?: PollRequest
      /** The custom client-side theme to share via the message */
      shared_client_theme?: SharedClientTheme
    }

    /** https://discord.com/developers/docs/resources/message#get-reactions-query-string-params */
    export interface GetReactions {
      /** The type of reaction */
      type?: integer
      /** Get users after this user ID */
      after?: snowflake
      /** Max number of users to return (1-100) */
      limit?: integer
    }

    /** https://discord.com/developers/docs/resources/message#edit-message-json/form-params */
    export interface Modify {
      /** Message contents (up to 2000 characters) */
      content: string
      /** Up to 10 `rich` embeds (up to 6000 characters) */
      embeds: Embed[]
      /** Edit the flags of a message (`SUPPRESS_EMBEDS` and `IS_COMPONENTS_V2` only) */
      flags: integer
      /** Allowed mentions for the message */
      allowed_mentions: AllowedMention
      /** Components to include with the message */
      components: MessageComponent[]
      /** Contents of the file being sent/edited. See Uploading Files */
      files[n]: any
      /** JSON-encoded body of non-file params (multipart/form-data only). See Uploading Files */
      payload_json: string
      /** Attached files to keep and possible descriptions for new files. See Uploading Files */
      attachments: Attachment[]
    }

    /** https://discord.com/developers/docs/resources/message#bulk-delete-messages-json-params */
    export interface BulkDeleteMessages {
      /** an array of message ids to delete (2-100) */
      messages: Snowflakes[]
    }

    /** https://discord.com/developers/docs/resources/message#get-channel-pins-query-string-params */
    export interface GetChannelPins {
      /** Get messages pinned before this timestamp */
      before?: timestamp
      /** Max number of pins to return (1-50) */
      limit?: integer
    }

  }
}

declare module './internal' {
  interface Internal {
    /**
     * Retrieves the messages in a channel. Returns an array of message objects from newest to oldest on success.
     * @see https://discord.com/developers/docs/resources/message#get-channel-messages
     */
    getChannelMessages(channel_id: snowflake, params: Message.Params.Params): Promise<Message[]>
    /**
     * Returns a list of messages without the `reactions` key that match a search query in the guild. Requires the `READ_MESSAGE_HISTORY` permission.
     * @see https://discord.com/developers/docs/resources/message#search-guild-messages
     */
    searchGuildMessages(guild_id: snowflake, params: Message.Params.Params): Promise<void>
    /**
     * Retrieves a specific message in the channel. Returns a message object on success.
     * @see https://discord.com/developers/docs/resources/message#get-channel-message
     */
    getChannelMessage(channel_id: snowflake, message_id: snowflake): Promise<Message>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/resources/message#create-message
     */
    createMessage(channel_id: snowflake, params: Message.Params.Create): Promise<void>
    /**
     * Crosspost a message in an Announcement Channel to following channels. This endpoint requires the `SEND_MESSAGES` permission, if the current user sent the message, or additionally the `MANAGE_MESSAGES` permission, for all other messages, to be present for the current user.
     * @see https://discord.com/developers/docs/resources/message#crosspost-message
     */
    crosspostMessage(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * Create a reaction for the message. This endpoint requires the `READ_MESSAGE_HISTORY` permission to be present on the current user. Additionally, if nobody else has reacted to the message using this emoji, this endpoint requires the `ADD_REACTIONS` permission to be present on the current user. Returns a 204 empty response on success. Fires a Message Reaction Add Gateway event.
     * @see https://discord.com/developers/docs/resources/message#create-reaction
     */
    createReaction(channel_id: snowflake, message_id: snowflake, emoji_id: snowflake): Promise<void>
    /**
     * Delete a reaction the current user has made for the message. Returns a 204 empty response on success. Fires a Message Reaction Remove Gateway event.
     * @see https://discord.com/developers/docs/resources/message#delete-own-reaction
     */
    deleteOwnReaction(channel_id: snowflake, message_id: snowflake, emoji_id: snowflake): Promise<void>
    /**
     * Deletes another user's reaction. This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user. Returns a 204 empty response on success. Fires a Message Reaction Remove Gateway event.
     * @see https://discord.com/developers/docs/resources/message#delete-user-reaction
     */
    deleteUserReaction(channel_id: snowflake, message_id: snowflake, emoji_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Get a list of users that reacted with this emoji. Returns an array of user objects on success.
     * @see https://discord.com/developers/docs/resources/message#get-reactions
     */
    getReactions(channel_id: snowflake, message_id: snowflake, emoji_id: snowflake, params: Message.Params.Params): Promise<User[]>
    /**
     * Deletes all reactions on a message. This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user. Fires a Message Reaction Remove All Gateway event.
     * @see https://discord.com/developers/docs/resources/message#delete-all-reactions
     */
    deleteAllReactions(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * Deletes all the reactions for a given emoji on a message. This endpoint requires the `MANAGE_MESSAGES` permission to be present on the current user. Fires a Message Reaction Remove Emoji Gateway event.
     * @see https://discord.com/developers/docs/resources/message#delete-all-reactions-for-emoji
     */
    deleteAllReactionsForEmoji(channel_id: snowflake, message_id: snowflake, emoji_id: snowflake): Promise<void>
    /**
     * Edit a previously sent message. The fields `content`, `embeds`, `flags` and `components` can be edited by the original message author. Other users can only edit `flags` and only if they have the `MANAGE_MESSAGES` permission in the corresponding channel. When specifying flags, ensure to include all previously set flags/bits in addition to ones that you are modifying. Only `flags` documented in the table below may be modified by users (unsupported flag changes are currently ignored without error).
     * @see https://discord.com/developers/docs/resources/message#edit-message
     */
    editMessage(channel_id: snowflake, message_id: snowflake, params: Message.Params.Modify): Promise<void>
    /**
     * Delete a message. If operating on a guild channel and trying to delete a message that was not sent by the current user, this endpoint requires the `MANAGE_MESSAGES` permission. Returns a 204 empty response on success. Fires a Message Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/message#delete-message
     */
    deleteMessage(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * Delete multiple messages in a single request. This endpoint can only be used on guild channels and requires the `MANAGE_MESSAGES` permission. Returns a 204 empty response on success. Fires a Message Delete Bulk Gateway event.
     * @see https://discord.com/developers/docs/resources/message#bulk-delete-messages
     */
    bulkDeleteMessages(channel_id: snowflake, params: Message.Params.Params): Promise<void>
    /**
     * Retrieves the list of pins in a channel. Requires the `VIEW_CHANNEL` permission. If the user is missing the `READ_MESSAGE_HISTORY` permission in the channel, then no pins will be returned.
     * @see https://discord.com/developers/docs/resources/message#get-channel-pins
     */
    getChannelPins(channel_id: snowflake, params: Message.Params.Params): Promise<void>
    /**
     * Pin a message in a channel. Requires the `PIN_MESSAGES` permission. Fires a Channel Pins Update Gateway event.
     * @see https://discord.com/developers/docs/resources/message#pin-message
     */
    pinMessage(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * Unpin a message in a channel. Requires the `PIN_MESSAGES` permission. Returns a 204 empty response on success. Fires a Channel Pins Update Gateway event.
     * @see https://discord.com/developers/docs/resources/message#unpin-message
     */
    unpinMessage(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * Gets the first 50 pinned messages in a channel, returning an array of message objects on success.
     * @see https://discord.com/developers/docs/resources/message#get-pinned-messages-(deprecated)
     */
    getPinnedMessages(deprecated)(channel_id: snowflake): Promise<void>
    /**
     * This endpoint is deprecated. Use Pin Message instead.
     * @see https://discord.com/developers/docs/resources/message#pin-message-(deprecated)
     */
    pinMessage(deprecated)(channel_id: snowflake, message_id: snowflake): Promise<void>
    /**
     * This endpoint is deprecated. Use Unpin Message instead.
     * @see https://discord.com/developers/docs/resources/message#unpin-message-(deprecated)
     */
    unpinMessage(deprecated)(channel_id: snowflake, message_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/channels/{channel.id}/messages': {
    GET: 'getChannelMessages',
    POST: { name: 'createMessage', multipart: true },
  },
  '/guilds/{guild.id}/messages/search': {
    GET: 'searchGuildMessages',
  },
  '/channels/{channel.id}/messages/{message.id}': {
    GET: 'getChannelMessage',
    PATCH: { name: 'editMessage', multipart: true },
    DELETE: 'deleteMessage',
  },
  '/channels/{channel.id}/messages/{message.id}/crosspost': {
    POST: 'crosspostMessage',
  },
  '/channels/{channel.id}/messages/{message.id}/reactions/{emoji.id}/@me': {
    PUT: 'createReaction',
    DELETE: 'deleteOwnReaction',
  },
  '/channels/{channel.id}/messages/{message.id}/reactions/{emoji.id}/{user.id}': {
    DELETE: 'deleteUserReaction',
  },
  '/channels/{channel.id}/messages/{message.id}/reactions/{emoji.id}': {
    GET: 'getReactions',
    DELETE: 'deleteAllReactionsForEmoji',
  },
  '/channels/{channel.id}/messages/{message.id}/reactions': {
    DELETE: 'deleteAllReactions',
  },
  '/channels/{channel.id}/messages/bulk-delete': {
    POST: 'bulkDeleteMessages',
  },
  '/channels/{channel.id}/messages/pins': {
    GET: 'getChannelPins',
  },
  '/channels/{channel.id}/messages/pins/{message.id}': {
    PUT: 'pinMessage',
    DELETE: 'unpinMessage',
  },
  '/channels/{channel.id}/pins': {
    GET: 'getPinnedMessages(deprecated)',
  },
  '/channels/{channel.id}/pins/{message.id}': {
    PUT: 'pinMessage(deprecated)',
    DELETE: 'unpinMessage(deprecated)',
  },
})
