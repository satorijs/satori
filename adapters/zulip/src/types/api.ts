import { Internal } from './internal'
/** An array of any parameters sent in the request that are not
supported by the endpoint.

See [error handling](/api/rest-error-handling#ignored-parameters) documentation
for details on this and its change history. */
export type IgnoredParametersUnsupported = string[]
/** The ID of the event. Events appear in increasing order but may not be consecutive. */
export type EventIdSchema = number
/** The event's type, relevant both for client-side dispatch and server-side
filtering by event type in [POST /register](/api/register-queue). */
export type EventTypeSchema = string
/** Dictionary containing details of a file uploaded by a user. */
export type Attachments = {
  /** The unique ID for the attachment. */
  id?: number
  /** Name of the uploaded file. */
  name?: string
  /** A representation of the path of the file within the
  repository of user-uploaded files. If the `path_id` of a
  file is `{realm_id}/ab/cdef/temp_file.py`, its URL will be:
  `{server_url}/user_uploads/{realm_id}/ab/cdef/temp_file.py`. */
  path_id?: string
  /** Size of the file in bytes. */
  size?: number
  /** Time when the attachment was uploaded as a UNIX timestamp
  multiplied by 1000 (matching the format of getTime() in JavaScript).

  **Changes**: Changed in Zulip 3.0 (feature level 22). This field was
  previously a floating point number. */
  create_time?: number
  /** Contains basic details on any Zulip messages that have been
  sent referencing this [uploaded file](/api/upload-file).
  This includes messages sent by any user in the Zulip
  organization who sent a message containing a link to the
  uploaded file. */
  messages?: {
    /** Time when the message was sent as a UNIX timestamp
    multiplied by 1000 (matching the format of getTime() in JavaScript).

    **Changes**: Changed in Zulip 3.0 (feature level 22). This
    field was previously strangely called `name` and was a floating
    point number. */
    date_sent?: number
    /** The unique message ID. Messages should always be
    displayed sorted by ID. */
    id?: number
  }[]
}
export type BasicStream = (BasicStreamBase & ({
  message_retention_days: unknown
  first_message_id: unknown
  stream_weekly_traffic: number
}))
export type DefaultStream = (BasicStreamBase & ({
  message_retention_days: unknown
  first_message_id: unknown
}))
/** Object containing basic details about the stream. */
export type BasicStreamBase = {
  /** The unique ID of the stream. */
  stream_id?: number
  /** The name of the stream. */
  name?: string
  /** The short description of the stream in text/markdown format,
  intended to be used to prepopulate UI for editing a stream's
  description. */
  description?: string
  /** The UNIX timestamp for when the stream was created, in UTC seconds.

  **Changes**: New in Zulip 4.0 (feature level 30). */
  date_created?: number
  /** Specifies whether the stream is private or not.
  Only people who have been invited can access a private stream. */
  invite_only?: boolean
  /** The short description of the stream rendered as HTML, intended to
  be used when displaying the stream description in a UI.

  One should use the standard Zulip rendered_markdown CSS when
  displaying this content so that emoji, LaTeX, and other syntax
  work correctly. And any client-side security logic for
  user-generated message content should be applied when displaying
  this HTML as though it were the body of a Zulip message. */
  rendered_description?: string
  /** Whether the stream has been configured to allow unauthenticated
  access to its message history from the web.

  **Changes**: New in Zulip 2.1.0. */
  is_web_public?: boolean
  /** [Policy][permission-level] for which users can post messages to the stream.

  - 1 = Any user can post.
  - 2 = Only administrators can post.
  - 3 = Only [full members][calc-full-member] can post.
  - 4 = Only moderators can post.

  **Changes**: New in Zulip 3.0 (feature level 1), replacing the previous
  `is_announcement_only` boolean.

  [permission-level]: /api/roles-and-permissions#permission-levels
  [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member */
  stream_post_policy?: number
  /** Number of days that messages sent to this stream will be stored
  before being automatically deleted by the [message retention
  policy](/help/message-retention-policy). There are two special values:

  - `null`, the default, means the stream will inherit the organization
  level setting.
  - `-1` encodes retaining messages in this stream forever.

  **Changes**: New in Zulip 3.0 (feature level 17). */
  message_retention_days?: number
  /** Whether the history of the stream is public to its subscribers.

  Currently always true for public streams (i.e. `"invite_only": false` implies
  `"history_public_to_subscribers": true`), but clients should not make that
  assumption, as we may change that behavior in the future. */
  history_public_to_subscribers?: boolean
  /** The ID of the first message in the stream.

  Intended to help clients determine whether they need to display
  UI like the "more topics" widget that would suggest the stream
  has older history that can be accessed.

  Is `null` for streams with no message history.

  **Changes**: New in Zulip 2.1.0. */
  first_message_id?: number
  /** Whether the given stream is announcement only or not.

  **Changes**: Deprecated in Zulip 3.0 (feature level 1). Clients
  should use `stream_post_policy` instead. */
  is_announcement_only?: boolean
  /** ID of the user group whose members are allowed to unsubscribe others
  from the stream.

  **Changes**: Before Zulip 8.0 (feature level 197),
  the `can_remove_subscribers_group` setting
  was named `can_remove_subscribers_group_id`.

  New in Zulip 6.0 (feature level 142). */
  can_remove_subscribers_group?: number
}
export type BasicBot = (BasicBotBase & ({
  default_sending_stream?: unknown
  default_events_register_stream?: unknown
  owner_id?: unknown
}))
export type BasicBotBase = {
  /** The user ID of the bot. */
  user_id?: number
  /** The full name of the bot. */
  full_name?: string
  /** The API key of the bot which it uses to make API requests. */
  api_key?: string
  /** The default sending stream of the bot. If `null`, the bot doesn't
  have a default sending stream. */
  default_sending_stream?: string
  /** The default stream for which the bot receives events/register data.
  If `null`, the bot doesn't have such a default stream. */
  default_events_register_stream?: string
  /** Whether the bot can send messages to all streams by default. */
  default_all_public_streams?: boolean
  /** The URL of the bot's avatar. */
  avatar_url?: string
  /** The user ID of the bot's owner.

  If `null`, the bot has no owner. */
  owner_id?: number
  /** The "Services" array contains extra configuration fields only relevant
  for Outgoing webhook bots and Embedded bots. It is always a single-element
  array.

  We consider this part of the Zulip API to be unstable; it is used only for
  UI elements for administering bots and is likely to change. */
  services?: ({
    /** The URL the outgoing webhook is configured to post to. */
    base_url?: string
    /** A unique token that the third-party service can use to confirm
    that the request is indeed coming from Zulip. */
    token?: string
    /** Integer indicating what format requests are posted in:

    - 1 = Zulip's native outgoing webhook format.
    - 2 = Emulate the Slack outgoing webhook format. */
    interface?: number
  } | {
    /** The name of the bot. */
    service_name?: string
    config_data?: Config
  })[]
}
export type Bot = (BasicBotBase & ({
  default_sending_stream?: unknown
  default_events_register_stream?: unknown
  owner_id?: unknown
  email?: string
  bot_type?: number
  is_active?: boolean
}))
/** A "string: string" dictionary which describes the configuration
for the embedded bot (usually details like API keys). */
export type Config = {
}
/** Dictionary containing the details of a custom profile field configured
for this organization. */
export type CustomProfileField = {
  /** The ID of the custom profile field. This will be referenced in the custom
  profile fields section of user objects. */
  id?: number
  /** An integer indicating the type of the custom profile field, which determines
  how it is configured and displayed to users.

  See the [Custom profile fields](/help/custom-profile-fields#profile-field-types)
  article for details on what each type means.

  - **1**: Short text
  - **2**: Long text
  - **3**: List of options
  - **4**: Date picker
  - **5**: Link
  - **6**: Person picker
  - **7**: External account
  - **8**: Pronouns

  **Changes**: Field type `8` added in Zulip 6.0 (feature level 151). */
  type?: number
  /** Custom profile fields are displayed in both settings UI and
  UI showing users' profiles in increasing `order`. */
  order?: number
  /** The name of the custom profile field. */
  name?: string
  /** The help text to be displayed for the custom profile field in user-facing
  settings UI for configuring custom profile fields. */
  hint?: string
  /** Field types 3 (List of options) and 7 (External account) support storing
  additional configuration for the field type in the `field_data` attribute.

  For field type 3 (List of options), this attribute is a JSON dictionary
  defining the choices and the order they will be displayed in the
  dropdown UI for individual users to select an option.

  The interface for field type 7 is not yet stabilized. */
  field_data?: string
  /** Whether the custom profile field, display or not on the user card.

  Currently it's value not allowed to be `true` of `Long text` and `Person picker`
  [profile field types](/help/custom-profile-fields#profile-field-types).

  **Changes**: New in Zulip 6.0 (feature level 146). */
  display_in_profile_summary?: boolean
}
/** Dictionary containing details of a single hotspot. */
export type Hotspot = {
  /** The delay after which the user should be shown the hotspot. */
  delay?: unknown
  /** The name of the hotspot. */
  name?: string
  /** The title of the hotspot, as will be displayed to the user. */
  title?: string
  /** The description of the hotspot, as will be displayed to the
  user. */
  description?: string
}
/** `{emoji_id}`: Object containing details about the emoji with
the specified ID. It has the following properties: */
export type RealmEmoji = {
  /** The ID for this emoji, same as the object's key. */
  id?: string
  /** The user-friendly name for this emoji. Users in the organization
  can use this emoji by writing this name between colons (`:name :`). */
  name?: string
  /** The path relative to the organization's URL where the
  emoji's image can be found. */
  source_url?: string
  /** Only non-null when the emoji's image is animated.

  The path relative to the organization's URL where a still
  (not animated) version of the emoji can be found. (This is
  currently always the first frame of the animation).

  This is useful for clients to display the emoji in contexts
  where continuously animating it would be a bad user experience
  (E.g. because it would be distracting).

  **Changes**: New in Zulip 5.0 (added as optional field in
  feature level 97 and then made mandatory, but nullable, in
  feature level 113). */
  still_url?: string
  /** Whether the emoji has been deactivated or not. */
  deactivated?: boolean
  /** The user ID of the user who uploaded the custom emoji.
  Will be `null` if the uploader is unknown.

  **Changes**: New in Zulip 3.0 (feature level 7). Previously
  was accessible via an `author` object with an `id` field. */
  author_id?: number
}
/** Object containing details of the newly added domain. */
export type RealmDomain = {
  /** The new allowed domain. */
  domain?: string
  /** Whether subdomains are allowed for this domain. */
  allow_subdomains?: boolean
}
/** Object containing details about a realm playground. */
export type RealmPlayground = {
  /** The unique ID for the realm playground. */
  id?: number
  /** The user-visible display name of the playground. Clients
  should display this in UI for picking which playground to
  open a code block in, to differentiate between multiple
  configured playground options for a given pygments
  language.

  **Changes**: New in Zulip 4.0 (feature level 49). */
  name?: string
  /** The name of the Pygments language lexer for that
  programming language. */
  pygments_language?: string
  /** The [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html)
  compliant URL template for the playground. The template contains
  exactly one variable named `code`, which determines how the
  extracted code should be substituted in the playground URL.

  **Changes**: New in Zulip 8.0 (feature level 196). This replaced the
  `url_prefix` parameter, which was used to construct URLs by just
  concatenating url_prefix and code. */
  url_template?: string
}
/** Object containing details about a realm export. */
export type RealmExport = {
  /** The ID of the export. */
  id?: number
  /** The ID of the user who did the export. */
  acting_user_id?: number
  /** The UNIX timestamp of when the export was made. */
  export_time?: unknown
  /** The timestamp of when the export was deleted.
  If `null`, it wasn't deleted. */
  deleted_timestamp?: unknown
  /** The timestamp of when the export failed.
  If `null`, it didn't fail. */
  failed_timestamp?: unknown
  /** The URL of the export. `null` if there's no URL. */
  export_url?: string
  /** Whether the export is pending or not. */
  pending?: boolean
}
/** Object containing the user group's attributes. */
export type UserGroup = {
  /** The name of the user group. */
  name?: string
  /** The description of the user group. */
  description?: string
  /** Array containing the ID of the users who are
  members of this user group. */
  members?: number[]
  /** Array containing the ID of the direct_subgroups of
  this user group.

  **Changes**: New in Zulip 6.0 (feature level 131).
  Introduced in feature level 127 as `subgroups`, but
  clients can ignore older events as this feature level
  predates subgroups being fully implemented. */
  direct_subgroup_ids?: number[]
  /** The ID of the user group. */
  id?: number
  /** Whether the user group is a system group which cannot be
  directly modified by users.

  **Changes**: New in Zulip 5.0 (feature level 93). */
  is_system_group?: boolean
  /** ID of the user group whose members are allowed to mention the group.

  **Changes**: Before Zulip 8.0 (feature level 198),
  the `can_mention_group` setting was named `can_mention_group_id`.

  New in Zulip 8.0 (feature level 191). Previously, groups
  could be mentioned if and only if they were not system groups. */
  can_mention_group?: number
}
export type Subscriptions = {
  /** The unique ID of a stream. */
  stream_id?: number
  /** The name of a stream. */
  name?: string
  /** The [description](/help/change-the-stream-description) of the stream in text/markdown format,
  intended to be used to prepopulate UI for editing a stream's
  description.

  See also `rendered_description`. */
  description?: string
  /** The [description](/help/change-the-stream-description) of the stream rendered as HTML, intended to
  be used when displaying the stream description in a UI.

  One should use the standard Zulip rendered_markdown CSS when
  displaying this content so that emoji, LaTeX, and other syntax
  work correctly. And any client-side security logic for
  user-generated message content should be applied when displaying
  this HTML as though it were the body of a Zulip message.

  See also `description`. */
  rendered_description?: string
  /** The UNIX timestamp for when the stream was created, in UTC seconds.

  **Changes**: New in Zulip 4.0 (feature level 30). */
  date_created?: number
  /** Specifies whether the stream is private or not.
  Only people who have been invited can access a private stream. */
  invite_only?: boolean
  /** A list of user IDs of users who are also subscribed
  to a given stream. Included only if `include_subscribers` is `true`. */
  subscribers?: number[]
  /** A boolean specifying whether desktop notifications
  are enabled for the given stream.

  A `null` value means the value of this setting
  should be inherited from the user-level default
  setting, enable_stream_desktop_notifications, for
  this stream. */
  desktop_notifications?: boolean
  /** A boolean specifying whether email notifications
  are enabled for the given stream.

  A `null` value means the value of this setting
  should be inherited from the user-level default
  setting, enable_stream_email_notifications, for
  this stream. */
  email_notifications?: boolean
  /** A boolean specifying whether wildcard mentions
  trigger notifications as though they were personal
  mentions in this stream.

  A `null` value means the value of this setting
  should be inherited from the user-level default
  setting, wildcard_mentions_notify, for
  this stream. */
  wildcard_mentions_notify?: boolean
  /** A boolean specifying whether push notifications
  are enabled for the given stream.

  A `null` value means the value of this setting
  should be inherited from the user-level default
  setting, enable_stream_push_notifications, for
  this stream. */
  push_notifications?: boolean
  /** A boolean specifying whether audible notifications
  are enabled for the given stream.

  A `null` value means the value of this setting
  should be inherited from the user-level default
  setting, enable_stream_audible_notifications, for
  this stream. */
  audible_notifications?: boolean
  /** A boolean specifying whether the given stream has been pinned
  to the top. */
  pin_to_top?: boolean
  /** Email address of the given stream, used for
  [sending emails to the stream](/help/message-a-stream-by-email). */
  email_address?: string
  /** Whether the user has muted the stream. Muted streams do
  not count towards your total unread count and do not show up in
  `All messages` view (previously known as `Home` view).

  **Changes**: Prior to Zulip 2.1.0, this feature was
  represented by the more confusingly named `in_home_view` (with the
  opposite value, `in_home_view=!is_muted`). */
  is_muted?: boolean
  /** Legacy property for if the given stream is muted, with inverted meaning.

  **Changes**: Deprecated in Zulip 2.1.0. Clients should use `is_muted`
  where available. */
  in_home_view?: boolean
  /** Whether only organization administrators can post to the stream.

  **Changes**: Deprecated in Zulip 3.0 (feature level 1). Clients
  should use `stream_post_policy` instead. */
  is_announcement_only?: boolean
  /** Whether the stream has been configured to allow unauthenticated
  access to its message history from the web. */
  is_web_public?: boolean
  /** The user's personal color for the stream. */
  color?: string
  /** [Policy][permission-level] for which users can post messages to the stream.

  - 1 = Any user can post.
  - 2 = Only administrators can post.
  - 3 = Only [full members][calc-full-member] can post.
  - 4 = Only moderators can post.

  **Changes**: New in Zulip 3.0 (feature level 1), replacing the previous
  `is_announcement_only` boolean.

  [permission-level]: /api/roles-and-permissions#permission-levels
  [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member */
  stream_post_policy?: number
  /** Number of days that messages sent to this stream will be stored
  before being automatically deleted by the [message retention
  policy](/help/message-retention-policy). There are two special values:

  - `null`, the default, means the stream will inherit the organization
  level setting.
  - `-1` encodes retaining messages in this stream forever.

  **Changes**: New in Zulip 3.0 (feature level 17). */
  message_retention_days?: number
  /** Whether the history of the stream is public to its subscribers.

  Currently always true for public streams (i.e. `"invite_only": false` implies
  `"history_public_to_subscribers": true`), but clients should not make that
  assumption, as we may change that behavior in the future. */
  history_public_to_subscribers?: boolean
  /** The ID of the first message in the stream.

  Intended to help clients determine whether they need to display
  UI like the "more topics" widget that would suggest the stream
  has older history that can be accessed.

  Is `null` for streams with no message history. */
  first_message_id?: number
  /** The average number of messages sent to the stream per week, as
  estimated based on recent weeks, rounded to the nearest integer.

  If `null`, the stream was recently created and there is
  insufficient data to estimate the average traffic. */
  stream_weekly_traffic?: number
  /** ID of the user group whose members are allowed to unsubscribe others
  from the stream.

  **Changes**: Before Zulip 8.0 (feature level 197),
  the `can_remove_subscribers_group` setting
  was named `can_remove_subscribers_group_id`.

  New in Zulip 6.0 (feature level 142). */
  can_remove_subscribers_group?: number
}
/** Dictionary containing details of a default stream
group. */
export type DefaultStreamGroup = {
  /** Name of the default stream group. */
  name?: string
  /** Description of the default stream group. */
  description?: string
  /** The ID of the default stream group. */
  id?: number
  /** Array containing details about the streams
  in the default stream group. */
  streams?: DefaultStream[]
}
/** The [policy][permission-level] for [which other users][help-email-visibility]
in this organization can see the user's real email address.

- 1 = Everyone
- 2 = Members only
- 3 = Administrators only
- 4 = Nobody
- 5 = Moderators only

**Changes**: New in Zulip 7.0 (feature level 163), replacing the
realm-level setting.

[permission-level]: /api/roles-and-permissions#permission-levels
[help-email-visibility]: /help/configure-email-visibility */
export type EmailAddressVisibility = number
export type EmojiReaction = (EmojiReactionBase & ({
}))
export type EmojiBase = {
  /** Name of the emoji. */
  emoji_name?: string
  /** A unique identifier, defining the specific emoji codepoint requested,
  within the namespace of the `reaction_type`. */
  emoji_code?: string
  /** A string indicating the type of emoji. Each emoji `reaction_type`
  has an independent namespace for values of `emoji_code`.

  Must be one of the following values:

  - `unicode_emoji` : In this namespace, `emoji_code` will be a
  dash-separated hex encoding of the sequence of Unicode codepoints
  that define this emoji in the Unicode specification.

  - `realm_emoji` : In this namespace, `emoji_code` will be the ID of
  the uploaded [custom emoji](/help/custom-emoji).

  - `zulip_extra_emoji` : These are special emoji included with Zulip.
  In this namespace, `emoji_code` will be the name of the emoji (e.g.
  "zulip"). */
  reaction_type?: string
}
export type EmojiReactionBase = (EmojiBase & ({
  user_id?: number
  user?: {
    /** ID of the user. */
    id?: number
    /** Zulip API email of the user. */
    email?: string
    /** Full name of the user. */
    full_name?: string
    /** Whether the user is a mirror dummy. */
    is_mirror_dummy?: boolean
  }
}))
export type MessagesEvent = (MessagesBase & ({
  avatar_url?: unknown
}))
/** Object containing details of the message. */
export type MessagesBase = {
  /** The URL of the message sender's avatar. Can be `null` only if
  the current user has access to the sender's real email address
  and `client_gravatar` was `true`.

  If `null`, then the sender has not uploaded an avatar in Zulip,
  and the client can compute the gravatar URL by hashing the
  sender's email address, which corresponds in this case to their
  real email address.

  **Changes**: Before Zulip 7.0 (feature level 163), access to a
  user's real email address was a realm-level setting. As of this
  feature level, `email_address_visibility` is a user setting. */
  avatar_url?: string
  /** A Zulip "client" string, describing what Zulip client
  sent the message. */
  client?: string
  /** The content/body of the message. */
  content?: string
  /** The HTTP `content_type` for the message content. This
  will be `text/html` or `text/x-markdown`, depending on
  whether `apply_markdown` was set. */
  content_type?: string
  /** Data on the recipient of the message;
  either the name of a stream or a dictionary containing basic data on
  the users who received the message. */
  display_recipient?: (string | {
    /** ID of the user. */
    id?: number
    /** Zulip API email of the user. */
    email?: string
    /** Full name of the user. */
    full_name?: string
    /** Whether the user is a mirror dummy. */
    is_mirror_dummy?: boolean
  }[])
  /** An array of objects, with each object documenting the
  changes in a previous edit made to the the message,
  ordered chronologically from most recent to least recent
  edit.

  Not present if the message has never been edited or if the realm has
  [disabled viewing of message edit history][disable-edit-history].

  Every object will contain `user_id` and `timestamp`.

  The other fields are optional, and will be present or not
  depending on whether the stream, topic, and/or message
  content were modified in the edit event. For example, if
  only the topic was edited, only `prev_topic` and `topic`
  will be present in addition to `user_id` and `timestamp`.

  [disable-edit-history]: /help/disable-message-edit-history */
  edit_history?: {
    /** Only present if message's content was edited.

    The content of the message immediately prior to this
    edit event. */
    prev_content?: string
    /** Only present if message's content was edited.

    The rendered HTML representation of `prev_content`. */
    prev_rendered_content?: string
    /** Only present if message's content was edited.

    The Markdown processor version number for the message
    immediately prior to this edit event. */
    prev_rendered_content_version?: number
    /** Only present if message's stream was edited.

    The stream ID of the message immediately prior to this
    edit event.

    **Changes**: New in Zulip 3.0 (feature level 1). */
    prev_stream?: number
    /** Only present if message's topic was edited.

    The topic of the message immediately prior to this
    edit event.

    **Changes**: New in Zulip 5.0 (feature level 118).
    Previously, this field was called `prev_subject`;
    clients are recommended to rename `prev_subject` to
    `prev_topic` if present for compatibility with
    older Zulip servers. */
    prev_topic?: string
    /** Only present if message's stream was edited.

    The ID of the stream containing the message
    immediately after this edit event.

    **Changes**: New in Zulip 5.0 (feature level 118). */
    stream?: number
    /** The UNIX timestamp for the edit. */
    timestamp: number
    /** Only present if message's topic was edited.

    The topic of the message immediately after this edit event.

    **Changes**: New in Zulip 5.0 (feature level 118). */
    topic?: string
    /** The ID of the user that made the edit.

    Will be `null` only for edit history
    events predating March 2017.

    Clients can display edit history events where this
    is `null` as modified by either the sender (for content
    edits) or an unknown user (for topic edits). */
    user_id: number
  }[]
  /** The unique message ID. Messages should always be
  displayed sorted by ID. */
  id?: number
  /** Whether the message is a [/me status message][status-messages]

  [status-messages]: /help/format-your-message-using-markdown#status-messages */
  is_me_message?: boolean
  /** The UNIX timestamp for when the message was last edited,
  in UTC seconds.

  Not present if the message has never been edited. */
  last_edit_timestamp?: number
  /** Data on any reactions to the message. */
  reactions?: EmojiReaction[]
  /** A unique ID for the set of users receiving the
  message (either a stream or group of users). Useful primarily
  for hashing. */
  recipient_id?: number
  /** The Zulip API email address of the message's sender. */
  sender_email?: string
  /** The full name of the message's sender. */
  sender_full_name?: string
  /** The user ID of the message's sender. */
  sender_id?: number
  /** A string identifier for the realm the sender is in. Unique only within
  the context of a given Zulip server.

  E.g. on `example.zulip.com`, this will be `example`. */
  sender_realm_str?: string
  /** Only present for stream messages; the ID of the stream. */
  stream_id?: number
  /** The `topic` of the message. Currently always `""` for direct messages,
  though this could change if Zulip adds support for topics in direct
  message conversations.

  The field name is a legacy holdover from when topics were
  called "subjects" and will eventually change. */
  subject?: string
  /** Data used for certain experimental Zulip integrations. */
  submessages?: {
    /** The type of the message. */
    msg_type?: string
    /** The new content of the submessage. */
    content?: string
    /** The ID of the message to which the submessage has been added. */
    message_id?: number
    /** The ID of the user who sent the message. */
    sender_id?: number
    /** The ID of the submessage. */
    id?: number
  }[]
  /** The UNIX timestamp for when the message was sent,
  in UTC seconds. */
  timestamp?: number
  /** Data on any links to be included in the `topic`
  line (these are generated by [custom linkification
  filters](/help/add-a-custom-linkifier) that match content in the
  message's topic.)

  **Changes**: This field contained a list of urls before
  Zulip 4.0 (feature level 46).

  New in Zulip 3.0 (feature level 1). Previously, this field was called
  `subject_links`; clients are recommended to rename `subject_links` to `topic_links`
  if present for compatibility with older Zulip servers. */
  topic_links?: {
    /** The original link text present in the topic. */
    text?: string
    /** The expanded target url which the link points to. */
    url?: string
  }[]
  /** The type of the message: `stream` or `private`. */
  type?: string
}
/** `{client_name}` or `"aggregated"`: Object containing the details of the user's
presence.

**Changes**: Starting with Zulip 7.0 (feature level 178), this will always
contain two keys, `"website"` and `"aggregated"`, with identical data. The
server no longer stores which client submitted presence updates.

Previously, the `{client_name}` keys for these objects were the names of the
different clients where the user was logged in, for example `website` or
`ZulipDesktop`. */
export type Presence = {
  /** The client's platform name.

  **Changes**: Starting with Zulip 7.0 (feature level 178), this will
  always be `"website"` as the server no longer stores which client
  submitted presence data. */
  client?: string
  /** The status of the user on this client. Will be either `"idle"`
  or `"active"`. */
  status?: string
  /** The UNIX timestamp of when this client sent the user's presence
  to the server with the precision of a second. */
  timestamp?: number
  /** Whether the client is capable of showing mobile/push notifications
  to the user.

  Not present in objects with the `"aggregated"` key.

  **Changes**: Starting with Zulip 7.0 (feature level 178), always
  `false` when present as the server no longer stores which client
  submitted presence data. */
  pushable?: boolean
}
/** A dictionary for representing a message draft. */
export type Draft = {
  /** The unique ID of the draft. It will only used whenever the drafts are
  fetched. This field should not be specified when the draft is being
  created or edited. */
  id?: number
  /** The type of the draft. Either unaddressed (empty string), "stream",
  or "private" (for one-on-one and group direct messages). */
  type: string
  /** An array of the tentative target audience IDs. For "stream"
  messages, this should contain exactly 1 ID, the ID of the
  target stream. For direct messages, this should be an array
  of target user IDs. For unaddressed drafts, this is ignored,
  and clients should send an empty array. */
  to: number[]
  /** For stream message drafts, the tentative topic name. For direct
  or unaddressed messages, this will be ignored and should ideally
  be the empty string. Should not contain null bytes. */
  topic: string
  /** The body of the draft. Should not contain null bytes. */
  content: string
  /** A Unix timestamp (seconds only) representing when the draft was
  last edited. When creating a draft, this key need not be present
  and it will be filled in automatically by the server. */
  timestamp?: unknown
}
/** Object containing details of the scheduled message. */
export type ScheduledMessage = {
  /** The unique ID of the scheduled message, which can be used to
  modify or delete the scheduled message.

  This is different from the unique ID that the message will have
  after it is sent. */
  scheduled_message_id: number
  /** The type of the scheduled message. Either `"stream"` or `"private"`. */
  type: string
  /** The scheduled message's tentative target audience.

  For stream messages, it will be the unique ID of the target
  stream. For direct messages, it will be an array with the
  target users' IDs. */
  to: (number | number[])
  /** Only present if `type` is `"stream"`.

  The topic for the stream message. */
  topic?: string
  /** The content/body of the scheduled message, in text/markdown format. */
  content: string
  /** The content/body of the scheduled message rendered in HTML. */
  rendered_content: string
  /** The UNIX timestamp for when the message will be sent
  by the server, in UTC seconds. */
  scheduled_delivery_timestamp: number
  /** Whether the server has tried to send the scheduled message
  and it failed to successfully send.

  Clients that support unscheduling and editing scheduled messages
  should display scheduled messages with `"failed": true` with an
  indicator that the server failed to send the message at the
  scheduled time, so that the user is aware of the failure and can
  get the content of the scheduled message.

  **Changes**: New in Zulip 7.0 (feature level 181). */
  failed: boolean
}
export type User = (UserBase & ({
  delivery_email?: unknown
  bot_type?: unknown
  bot_owner_id?: unknown
  avatar_url?: unknown
}))
/** A dictionary containing basic data on a given Zulip user. */
export type UserBase = {
  /** The unique ID of the user. */
  user_id?: number
  /** The user's real email address. This value will be `null` if you cannot
  access user's real email address. For bot users, this field is always
  set to the real email of the bot, because bot users always have
  `email_address_visibility` set to everyone.

  **Changes**: Prior to Zulip 7.0 (feature level 163), this field was
  present only when `email_address_visibility` was restricted and you had
  access to the user's real email. As of this feature level, this field
  is always present, including the case when `email_address_visibility`
  is set to everyone (and therefore not restricted). */
  delivery_email?: string
  /** The Zulip API email address of the user or bot.

  If you do not have permission to view the email address of the target user,
  this will be a fake email address that is usable for the Zulip API but nothing else. */
  email?: string
  /** Full name of the user or bot, used for all display purposes. */
  full_name?: string
  /** The time the user account was created. */
  date_joined?: string
  /** A boolean specifying whether the user account has been deactivated. */
  is_active?: boolean
  /** A boolean specifying whether the user is an organization owner.
  If true, `is_admin` will also be true.

  **Changes**: New in Zulip 3.0 (feature level 8). */
  is_owner?: boolean
  /** A boolean specifying whether the user is an organization administrator. */
  is_admin?: boolean
  /** A boolean specifying whether the user is a guest user. */
  is_guest?: boolean
  /** A boolean specifying whether the user is a billing administrator.

  **Changes**: New in Zulip 5.0 (feature level 73). */
  is_billing_admin?: boolean
  /** A boolean specifying whether the user is a bot or full account. */
  is_bot?: boolean
  /** An integer describing the type of bot:

  - `null` if the user isn't a bot.
  - `1` for a `Generic` bot.
  - `2` for an `Incoming webhook` bot.
  - `3` for an `Outgoing webhook` bot.
  - `4` for an `Embedded` bot. */
  bot_type?: number
  /** If the user is a bot (i.e. `is_bot` is true), then `bot_owner_id`
  is the user ID of the bot's owner (usually, whoever created the bot).

  Will be `null` for legacy bots that do not have an owner.

  **Changes**: New in Zulip 3.0 (feature level 1). In previous
  versions, there was a `bot_owner` field containing the email
  address of the bot's owner. */
  bot_owner_id?: number
  /** [Organization-level role](/api/roles-and-permissions) of the user.
  Possible values are:

  - 100 = Organization owner
  - 200 = Organization administrator
  - 300 = Organization moderator
  - 400 = Member
  - 600 = Guest

  **Changes**: New in Zulip 4.0 (feature level 59). */
  role?: number
  /** The time zone of the user. */
  timezone?: string
  /** URL for the user's avatar.

  Will be `null` if the `client_gravatar`
  query parameter was set to `true`, the current user has access to
  this user's real email address, and this user's avatar is hosted by
  the Gravatar provider (i.e. this user has never uploaded an avatar).

  **Changes**: Before Zulip 7.0 (feature level 163), access to a
  user's real email address was a realm-level setting. As of this
  feature level, `email_address_visibility` is a user setting.

  In Zulip 3.0 (feature level 18), if the client has the
  `user_avatar_url_field_optional` capability, this will be missing at
  the server's sole discretion. */
  avatar_url?: string
  /** Version for the user's avatar. Used for cache-busting requests
  for the user's avatar. Clients generally shouldn't need to use this;
  most avatar URLs sent by Zulip will already end with `?v={avatar_version}`. */
  avatar_version?: number
  profile_data?: profile_data
}
/** Only present if `is_bot` is false; bots can't have custom profile fields.

A dictionary containing custom profile field data for the user. Each entry
maps the integer ID of a custom profile field in the organization to a
dictionary containing the user's data for that field. Generally the data
includes just a single `value` key; for those custom profile fields
supporting Markdown, a `rendered_value` key will also be present. */
export type profile_data = {
}
export type JsonResponseBase = {
  result?: string
}
/** **Changes**: As of Zulip 7.0 (feature level 167), if any
parameters sent in the request are not supported by this
endpoint, a successful JSON response will include an
[`ignored_parameters_unsupported`][ignored_params] array.

A typical successful JSON response may look like:

[ignored_params]: /api/rest-error-handling#ignored-parameters */
export type SuccessDescription = unknown
export type JsonSuccess = (JsonSuccessBase & ({
}))
export type JsonSuccessBase = (JsonResponseBase & ({
  result: 'success'
  msg: string
  ignored_parameters_unsupported?: IgnoredParametersUnsupported
}))
/** **Changes**: The [`ignored_parameters_unsupported`][ignored_params]
array was added as a possible return value for all REST API endpoint
JSON success responses in Zulip 7.0 (feature level 167).

Previously, it was added to
[`POST /users/me/subscriptions/properties`](/api/update-subscription-settings)
in Zulip 5.0 (feature level 111) and to
[`PATCH /realm/user_settings_defaults`](/api/update-realm-user-settings-defaults)
in Zulip 5.0 (feature level 96). The feature was introduced in Zulip 5.0
(feature level 78) as a return value for the
[`PATCH /settings`](/api/update-settings) endpoint.

A typical successful JSON response with ignored parameters may look like:

[ignored_params]: /api/rest-error-handling#ignored-parameters */
export type IgnoredParametersSuccess = (IgnoredParametersBase & ({
}))
export type IgnoredParametersBase = (JsonResponseBase & ({
  result: 'success'
  msg: string
  ignored_parameters_unsupported?: IgnoredParametersUnsupported
}))
export type JsonError = (JsonErrorBase & ({
}))
export type JsonErrorBase = (JsonResponseBase & ({
  result: 'error'
  msg: string
}))
export type PartiallyCompleted = (JsonResponseBase & ({
  result: 'partially_completed'
  code: string
  msg?: string
}))
export type ApiKeyResponse = (JsonSuccessBase & ({
  api_key: string
  email: string
  user_id?: number
}))
export type CodedError = (CodedErrorBase & ({
}))
export type CodedErrorBase = (JsonErrorBase & ({
  code?: string
}))
export type BadEventQueueIdError = (CodedErrorBase & ({
  queue_id?: string
}))
export type InvalidMessageError = (JsonErrorBase & ({
}))
export type NonExistingStreamNameError = (CodedErrorBase & ({
  stream?: string
}))
export type NonExistingStreamIdError = (CodedErrorBase & ({
  stream_id?: number
}))
export type AddSubscriptionsResponse = (JsonSuccessBase & ({
  subscribed?: {
  }
  already_subscribed?: {
  }
  unauthorized?: string[]
}))
export type InvalidApiKeyError = (JsonError)
export type MissingArgumentError = (CodedErrorBase & ({
  var_name?: string
}))
export type UserNotAuthorizedError = (CodedError)
export type UserDeactivatedError = (CodedError)
export type RateLimitedError = (CodedError)
export type RealmDeactivatedError = (CodedError)
export interface FetchApiKeyQuery {
  /** The username to be used for authentication (typically, the email
  address, but depending on configuration, it could be an LDAP username).

  See the `require_email_format_usernames` parameter documented in
  [GET /server_settings](/api/get-server-settings) for details.
  */
  username: string
  /** The user's Zulip password (or LDAP password, if LDAP authentication is in use).
  */
  password: string
}
export type FetchApiKeyResponse = (ApiKeyResponse & SuccessDescription)
export interface DevFetchApiKeyQuery {
  /** The email address for the user that owns the API key.
  */
  username: string
}
export type DevFetchApiKeyResponse = (ApiKeyResponse & SuccessDescription)
export interface GetEventsQuery {
  /** The ID of an event queue that was previously registered via
  `POST /api/v1/register` (see [Register a queue](/api/register-queue)).
  */
  queue_id: string
  /** The highest event ID in this queue that you've received and
  wish to acknowledge. See the [code for
  `call_on_each_event`](https://github.com/zulip/python-zulip-api/blob/main/zulip/zulip/__init__.py)
  in the [zulip Python
  module](https://github.com/zulip/python-zulip-api) for an
  example implementation of correctly processing each event
  exactly once.
  */
  last_event_id?: number
  /** Set to `true` if the client is requesting a nonblocking reply. If not
  specified, the request will block until either a new event is available
  or a few minutes have passed, in which case the server will send the
  client a heartbeat event.
  */
  dont_block?: boolean
}
export type GetEventsResponse = (JsonSuccessBase & SuccessDescription & ({
  events?: ({
    id?: EventIdSchema
    type?: (EventTypeSchema & 'alert_words')
    /** An array of strings, where each string is an alert word (or phrase)
    configured by the user. */
    alert_words?: string[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'update_display_settings')
    /** Name of the changed display setting. */
    setting_name?: string
    /** New value of the changed setting. */
    setting?: (boolean | number | string)
    /** Present only if the setting to be changed is
    `default_language`. Contains the name of the
    new default language in English. */
    language_name?: string
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'update_global_notifications')
    /** Name of the changed notification setting. */
    notification_name?: string
    /** New value of the changed setting. */
    setting?: (boolean | number | string)
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_settings')
    op?: string
    /** Name of the changed setting. */
    property?: string
    /** New value of the changed setting. */
    value?: (boolean | number | string)
    /** Present only if the setting to be changed is
    `default_language`. Contains the name of the
    new default language in English. */
    language_name?: string
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_user')
    op?: string
    /** Object containing the changed details of the user.
    It has multiple forms depending on the value changed. */
    person?: ({
      /** The ID of modified user. */
      user_id?: number
      /** The new full name for the user. */
      full_name?: string
    } | {
      /** The ID of the user who is affected by this change. */
      user_id?: number
      /** The URL of the new avatar for the user. */
      avatar_url?: string
      /** The new avatar data source type for the user.

      Value values are `G` (gravatar) and `U` (uploaded by user). */
      avatar_source?: string
      /** The new medium-size avatar URL for user. */
      avatar_url_medium?: string
      /** The version number for the user's avatar. This is useful
      for cache-busting. */
      avatar_version?: number
    } | {
      /** The ID of modified user. */
      user_id?: number
      /** The Zulip API email of the user.

      **Deprecated**: This field will be removed in a future
      release as it is redundant with the `user_id`. */
      email?: string
      /** The new time zone of the user. */
      timezone?: string
    } | {
      /** The ID of the user/bot whose owner has changed. */
      user_id?: number
      /** The user ID of the new bot owner. */
      bot_owner_id?: number
    } | {
      /** The ID of the user affected by this change. */
      user_id?: number
      /** The new [role](/api/roles-and-permissions) of the user. */
      role?: number
    } | {
      /** The ID of the user affected by this change. */
      user_id?: number
      /** A boolean specifying whether the user is now a billing administrator.

      **Changes**: New in Zulip 5.0 (feature level 73). */
      is_billing_admin?: boolean
    } | {
      /** The ID of the user affected by this change. */
      user_id?: number
      /** The new delivery email of the user.

      This value can be `null` if the affected user
      changed their `email_address_visibility` setting
      such that you cannot access their real email.

      **Changes**: Before Zulip 7.0 (feature level 163),
      `null` was not a possible value for this event as
      it was only sent to the affected user when their
      email address was changed. */
      delivery_email?: string
    } | {
      /** The ID of the user affected by this change. */
      user_id?: number
      /** Object containing details about the custom
      profile data change. */
      custom_profile_field?: {
        /** The ID of the custom profile field which user updated. */
        id?: number
        /** User's personal value for this custom profile field,
        or `null` if unset. */
        value?: string
        /** The `value` rendered in HTML. Will only be present for
        custom profile field types that support Markdown rendering.

        This user-generated HTML content should be rendered
        using the same CSS and client-side security protections
        as are used for message content. */
        rendered_value?: string
      }
    } | {
      /** The ID of the user affected by this change. */
      user_id?: number
      /** The new value of `email` for the user. The client
      should update any data structures associated
      with this user to use this new value as the
      user's Zulip API email address. */
      new_email?: string
    })
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'subscription')
    op?: string
    /** A list of dictionaries where each dictionary contains
    information about one of the subscribed streams.

    **Changes**: Removed `role` field from the dictionary
    in Zulip 6.0 (feature level 133). */
    subscriptions?: Subscriptions[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'subscription')
    op?: string
    /** A list of dictionaries, where each dictionary contains
    information about one of the newly unsubscribed streams. */
    subscriptions?: {
      /** The ID of the stream. */
      stream_id?: number
      /** The name of the stream. */
      name?: string
    }[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'subscription')
    op?: string
    /** The ID of the stream whose subscription details have changed. */
    stream_id?: number
    /** The property of the subscription which has changed. For details on the
    various subscription properties that a user can change, see
    [POST /users/me/subscriptions/properties](/api/update-subscription-settings).

    Clients should generally handle an unknown property received here without
    crashing, since that will naturally happen when connecting to a Zulip
    server running a new version that adds a new subscription property.

    **Changes**: As of Zulip 6.0 (feature level 139), updates to the `is_muted`
    property or the deprecated `in_home_view` property will send two `subscription`
    update events, one for each property, to support clients fully migrating to
    use the `is_muted` property. Prior to this feature level, updates to either
    property only sent one event with the deprecated `in_home_view` property. */
    property?: string
    /** The new value of the changed property. */
    value?: (number | boolean | string)
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'subscription')
    op?: string
    /** The IDs of the streams to which the user has subscribed.

    **Changes**: New in Zulip 4.0 (feature level 35), replacing
    the `stream_id` integer. */
    stream_ids?: number[]
    /** The IDs of the users who subscribed.

    **Changes**: New in Zulip 4.0 (feature level 35), replacing
    the `user_id` integer. */
    user_ids?: number[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'subscription')
    op?: string
    /** The IDs of the streams from which the users have been
    unsubscribed from.

    **Changes**: New in Zulip 4.0 (feature level 35), replacing
    the `stream_id` integer. */
    stream_ids?: number[]
    /** The IDs of the users who have been unsubscribed.

    **Changes**: New in Zulip 4.0 (feature level 35), replacing
    the `user_id` integer. */
    user_ids?: number[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'message')
    message?: MessagesEvent
    /** The user's [message flags][message-flags] for the message.

    Clients should inspect the flags field rather than assuming that
    new messages are unread; [muted users](/api/mute-user), messages
    sent by the current user, and more subtle scenarios can result
    in a new message that the server has already marked as read for
    the user.

    [message-flags]: /api/update-message-flags#available-flags */
    flags?: string[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'has_zoom_token')
    /** A boolean specifying whether the user has zoom
    token or not. */
    value?: boolean
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'invites_changed')
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_user')
    op?: string
    person?: User
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_user')
    op?: string
    /** Object containing details of the deactivated user. */
    person?: {
      /** The ID of the deactivated user. */
      user_id?: number
      /** The full name of the user.

      **Deprecated**: We expect to remove this field in the future. */
      full_name?: string
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'presence')
    /** The ID of the modified user. */
    user_id?: number
    /** The Zulip API email of the user.

    **Deprecated**: This field will be removed in a future
    release as it is redundant with the `user_id`. */
    email?: string
    /** The timestamp of when the Zulip server received the user's
    presence as a UNIX timestamp. */
    server_timestamp?: unknown
    /** Object containing the details of the user's most recent presence. */
    presence?: {
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'stream')
    op?: string
    /** Array of stream objects, each containing
    details about the newly added stream(s). */
    streams?: BasicStream[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'stream')
    op?: string
    /** Array of stream objects, each containing
    details about a stream that was deleted. */
    streams?: BasicStream[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'stream')
    op?: string
    /** The ID of the stream whose details have changed. */
    stream_id?: number
    /** The name of the stream whose details have changed. */
    name?: string
    /** The property of the stream which has changed. See
    [/stream GET](/api/get-streams) for details on the various
    properties of a stream.

    Clients should handle an "unknown" property received here without
    crashing, since that can happen when connecting to a server running a
    newer version of Zulip with new features. */
    property?: string
    /** The new value of the changed property. */
    value?: (number | boolean | string)
    /** Note: Only present if the changed property was `description`.

    The short description of the stream rendered as HTML, intended to
    be used when displaying the stream description in a UI.

    One should use the standard Zulip rendered_markdown CSS when
    displaying this content so that emoji, LaTeX, and other syntax
    work correctly. And any client-side security logic for
    user-generated message content should be applied when displaying
    this HTML as though it were the body of a Zulip message. */
    rendered_description?: string
    /** Note: Only present if the changed property was `invite_only`.

    Whether the history of the stream is public to its subscribers.

    Currently always true for public streams (i.e. `"invite_only": false` implies
    `"history_public_to_subscribers": true`), but clients should not make that
    assumption, as we may change that behavior in the future. */
    history_public_to_subscribers?: boolean
    /** Note: Only present if the changed property was `invite_only`.

    Whether the stream's history is now readable by web-public spectators.

    **Changes**: New in Zulip 5.0 (feature level 71). */
    is_web_public?: boolean
  } | (EmojiReactionBase & ({
    id?: EventIdSchema
    type?: (EventTypeSchema & 'reaction')
    op?: string
    message_id?: number
  })) | (EmojiReactionBase & ({
    id?: EventIdSchema
    type?: (EventTypeSchema & 'reaction')
    op?: string
    message_id?: number
  })) | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'attachment')
    op?: string
    attachment?: Attachments
    /** The total size of all files uploaded by in the organization,
    in bytes. */
    upload_space_used?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'attachment')
    op?: string
    attachment?: Attachments
    /** The total size of all files uploaded by in the organization,
    in bytes. */
    upload_space_used?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'attachment')
    op?: string
    /** Dictionary containing the ID of the deleted attachment. */
    attachment?: {
      /** The ID of the deleted attachment. */
      id?: number
    }
    /** The total size of all files uploaded by in the organization,
    in bytes. */
    upload_space_used?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'submessage')
    /** The type of the message. */
    msg_type?: string
    /** The new content of the submessage. */
    content?: string
    /** The ID of the message to which the submessage has been added. */
    message_id?: number
    /** The ID of the user who sent the message. */
    sender_id?: number
    /** The ID of the submessage. */
    submessage_id?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_status')
    /** Whether the user has marked themself "away" with this status.

    **Changes**: Deprecated in Zulip 6.0 (feature level 148);
    starting with that feature level, `away` is a legacy way to
    access the user's `presence_enabled` setting, with
    `away = !presence_enabled`. To be removed in a future release. */
    away?: boolean
    /** The text content of the status message.

    This will be `""` for users who set a status without selecting
    or writing a message. */
    status_text?: string
    /** The [emoji name](/api/update-status#parameter-emoji_name) for
    the emoji the user selected for their new status.

    This will be `""` for users who set a status without selecting
    an emoji.

    **Changes**: New in Zulip 5.0 (feature level 86). */
    emoji_name?: string
    /** The [emoji code](/api/update-status#parameter-emoji_code) for
    the emoji the user selected for their new status.

    This will be `""` for users who set a status without selecting
    an emoji.

    **Changes**: New in Zulip 5.0 (feature level 86). */
    emoji_code?: string
    /** The [emoji type](/api/update-status#parameter-reaction_type) for
    the emoji the user selected for their new status.

    This will be `""` for users who set a status without selecting
    an emoji.

    **Changes**: New in Zulip 5.0 (feature level 86). */
    reaction_type?: string
    /** The ID of the user whose status changed. */
    user_id?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'custom_profile_fields')
    /** An array of dictionaries where each dictionary contains
    details of a single new custom profile field for the Zulip
    organization. */
    fields?: CustomProfileField[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'default_stream_groups')
    /** An array of dictionaries where each dictionary
    contains details about a single default stream group. */
    default_stream_groups?: DefaultStreamGroup[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'default_streams')
    /** An array of dictionaries where each dictionary
    contains details about a single default stream. */
    default_streams?: DefaultStream[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'delete_message')
    /** Only present for clients that support the `bulk_message_deletion`
    [client capability][client-capabilities].

    A list containing the IDs of the newly deleted messages.

    [client-capabilities]: /api/register-queue#parameter-client_capabilities */
    message_ids?: number[]
    /** Only present for clients that do not support the `bulk_message_deletion`
    [client capability][client-capabilities].

    The ID of the newly deleted message.

    [client-capabilities]: /api/register-queue#parameter-client_capabilities */
    message_id?: number
    /** The type of message. Either `"stream"` or `"private"`. */
    message_type?: string
    /** Only present if `message_type` is `"stream"`.

    The ID of the stream to which the message was sent. */
    stream_id?: number
    /** Only present if `message_type` is `"stream"`.

    The topic to which the message was sent. */
    topic?: string
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'muted_topics')
    /** Array of tuples, where each tuple describes a muted topic.
    The first element of the tuple is the stream name in which the topic
    has to be muted, the second element is the topic name to be muted
    and the third element is an integer UNIX timestamp representing
    when the topic was muted.

    **Changes**: Deprecated in Zulip 6.0 (feature level
    134). Starting with this version, clients that explicitly
    requested the replacement `user_topic` event type when
    registering their event queue will not receive this legacy
    event type.

    **Changes**: Before Zulip 3.0 (feature level 1), the `muted_topics`
    array objects were 2-item tuples and did not include the timestamp
    information for when the topic was muted. */
    muted_topics?: (string | number)[][]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_topic')
    /** The ID of the stream to which the topic belongs. */
    stream_id?: number
    /** The name of the topic. */
    topic_name?: string
    /** An integer UNIX timestamp representing when the user-topic
    relationship was last changed. */
    last_updated?: number
    /** An integer indicating the user's visibility
    preferences for the topic, such as whether the topic
    is muted.

    - 0 = None. Used to indicate that the user no
    longer has a special visibility policy for this topic.
    - 1 = Muted. Used to record muted topics.
    - 2 = Unmuted. Used to record unmuted topics.

    **Changes**: In Zulip 7.0 (feature level 170), added unmuted as
    a visibility policy option. */
    visibility_policy?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'muted_users')
    /** A list of dictionaries where each dictionary describes
    a muted user. */
    muted_users?: {
      /** The ID of the muted user. */
      id?: number
      /** An integer UNIX timestamp representing when the user was muted. */
      timestamp?: number
    }[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'heartbeat')
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'hotspots')
    /** An array of dictionaries where each
    dictionary contains details about a single hotspot. */
    hotspots?: Hotspot[]
  } | {
    id: EventIdSchema
    type: (EventTypeSchema & 'update_message')
    /** The ID of the user who sent the message.

    Is `null` when event is for a rendering update of the original message,
    such as for an [inline URL preview][inline-url-previews].

    **Changes**: As of Zulip 5.0 (feature level 114), this field
    is present for all `update_message` events. Previously, this
    field was omitted for [inline URL preview][inline-url-previews]
    updates. */
    user_id: number
    /** Whether the event only updates the rendered content of the message.

    This field should be used by clients to determine if the event
    only provides a rendering update to the message content,
    such as for an [inline URL preview][inline-url-previews].
    When `true`, the event does not reflect a user-generated edit
    and does not modify the message history.

    **Changes**: New in Zulip 5.0 (feature level 114). Clients can
    correctly identify these rendering update event with earlier
    Zulip versions by checking whether the `user_id` field was omitted. */
    rendering_only: boolean
    /** The ID of the message which was edited or updated.

    This field should be used to apply content edits to the client's
    cached message history, or to apply rendered content updates.

    If the stream or topic was changed, the set of moved messages is
    encoded in the separate `message_ids` field, which is guaranteed
    to include `message_id`. */
    message_id: number
    /** The list of IDs of messages to which any stream or topic changes
    encoded in this event should be applied.

    These messages are guaranteed to have all been previously sent
    to stream `stream_id` with topic `orig_subject`, and have been
    moved to `new_stream_id` with topic `subject` (if those fields
    are present in the event).

    Clients processing these events should update all cached message
    history associated with the moved messages (including adjusting
    `unread_msgs` data structures, where the client may not have the
    message itself in its history) to reflect the new stream and
    topic.

    Content changes should be applied only to the single message
    indicated by `message_id`. */
    message_ids: number[]
    /** The user's personal [message flags][message-flags] for the
    message with ID `message_id` following the edit.

    A client application should compare these to the original flags
    to identify cases where a mention or alert word was added by the
    edit.

    [message-flags]: /api/update-message-flags#available-flags */
    flags: string[]
    /** The time when this message edit operation was processed by the
    server.

    **Changes**: As of Zulip 5.0 (feature level 114), this field
    is present for all `update_message` events. Previously, this
    field was omitted for [inline URL preview][inline-url-previews]
    updates. */
    edit_timestamp: number
    /** Only present if the message was edited and originally sent to a stream.

    The name of the stream that the message was sent to. Clients
    are recommended to use the `stream_id` field instead. */
    stream_name?: string
    /** Only present if the message was edited and originally sent to a stream.

    The pre-edit stream for all of the messages with IDs in
    `message_ids`.

    **Changes**: As of Zulip 5.0 (feature level 112), this field
    is present for all edits to a stream message. Previously, it
    was not present when only the content of the stream message was
    edited. */
    stream_id?: number
    /** Only present if message(s) were moved to a different stream.

    The post-edit stream for all of the messages with IDs in
    `message_ids`. */
    new_stream_id?: number
    /** Only present if this event moved messages to a different
    topic and/or stream.

    The choice the editing user made about which messages should be
    affected by a stream/topic edit:

    - `"change_one"`: Just change the one indicated in `message_id`.
    - `"change_later"`: Change messages in the same topic that had
    been sent after this one.
    - `"change_all"`: Change all messages in that topic.

    This parameter should be used to decide whether to change
    navigation and compose box state in response to the edit. For
    example, if the user was previously in topic narrow, and the
    topic was edited with `"change_later"` or `"change_all"`, the Zulip
    web app will automatically navigate to the new topic narrow.
    Similarly, a message being composed to the old topic should
    have its recipient changed to the new topic.

    This navigation makes it much more convenient to move content
    between topics without disruption or messages continuing
    to be sent to the pre-edit topic by accident. */
    propagate_mode?: string
    /** Only present if this event moved messages to a different
    topic and/or stream.

    The pre-edit topic for all of the messages with IDs in
    `message_ids`. */
    orig_subject?: string
    /** Only present if this event moved messages to a different
    topic.

    The post-edit topic for all of the messages with IDs in
    `message_ids`. */
    subject?: string
    /** Only present if this event moved messages to a different
    topic.

    Data on any links to be included in the `topic`
    line (these are generated by
    [custom linkification filter](/help/add-a-custom-linkifier)
    that match content in the message's topic.), corresponding
    to the post-edit topic.

    **Changes**: This field contained a list of urls before
    Zulip 4.0 (feature level 46).

    New in Zulip 3.0 (feature level 1). Previously, this field
    was called `subject_links`; clients are recommended to
    rename `subject_links` to `topic_links` if present for
    compatibility with older Zulip servers. */
    topic_links?: {
      /** The original link text present in the topic. */
      text?: string
      /** The expanded target url which the link points to. */
      url?: string
    }[]
    /** Only present if this event changed the message content.

    The original content of the message with ID `message_id`
    immediately prior to this edit, in the original markdown. */
    orig_content?: string
    /** Only present if this event changed the message content.

    The original content of the message with ID `message_id`
    immediately prior to this edit, rendered as HTML. */
    orig_rendered_content?: string
    /** Only present if this event changed the message content.

    The Markdown processor version number for the pre-edit message.

    Clients should ignore this field. */
    prev_rendered_content_version?: number
    /** Only present if this event changed the message content or
    updated the message content for an
    [inline URL preview][inline-url-previews].

    The new content of the message with ID `message_id`, in the
    original Markdown. */
    content?: string
    /** Only present if this event changed the message content or
    updated the message content for an
    [inline URL preview][inline-url-previews].

    The new content of the message with ID `message_id`,
    rendered in HTML. */
    rendered_content?: string
    /** Only present if this event changed the message content.

    Whether the message with ID `message_id` is now a
    [/me status message][status-messages].

    [status-messages]: /help/format-your-message-using-markdown#status-messages */
    is_me_message?: boolean
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'typing')
    op?: string
    /** Type of message being composed. Must be `"stream"` or `"private"`.

    **Changes**: New in Zulip 4.0 (feature level 58). Previously,
    all typing notifications were implicitly direct messages. */
    message_type?: string
    /** Object describing the user who is typing the message. */
    sender?: {
      /** The user's ID. */
      user_id?: number
      /** The Zulip API email address for the user. */
      email?: string
    }
    /** Only present if `message_type` is `"private"`.

    Array of dictionaries describing the set of users who would be
    recipients of the message being typed. Each dictionary contains
    details about one of the recipients. The sending user is guaranteed
    to appear among the recipients. */
    recipients?: {
      /** The ID of the user. */
      user_id?: number
      /** The Zulip API email address for the user. */
      email?: string
    }[]
    /** Only present if `message_type` is `"stream"`.

    The unique ID of the stream to which message is being typed.

    **Changes**: New in Zulip 4.0 (feature level 58). Previously,
    typing notifications were only for direct messages. */
    stream_id?: number
    /** Only present if `message_type` is `"stream"`.

    Topic within the stream where the message is being typed.

    **Changes**: New in Zulip 4.0 (feature level 58). Previously,
    typing notifications were only for direct messages. */
    topic?: string
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'typing')
    op?: string
    /** Type of message being composed. Must be `"stream"` or `"private"`.

    **Changes**: New in Zulip 4.0 (feature level 58). Previously,
    all typing notifications were implicitly direct messages. */
    message_type?: string
    /** Object describing the user who was previously typing the message. */
    sender?: {
      /** The user's ID. */
      user_id?: number
      /** The Zulip API email address for the user. */
      email?: string
    }
    /** Only present if `message_type` is `"private"`.

    Array of dictionaries describing the set of users who would be
    recipients of the message that was previously being typed. Each
    dictionary contains details about one of the recipients. The
    sending user is guaranteed to appear among the recipients. */
    recipients?: {
      /** The ID of the user. */
      user_id?: number
      /** The Zulip API email address for the user. */
      email?: string
    }[]
    /** Only present if `message_type` is `"stream"`.

    The unique ID of the stream to which message is being typed.

    **Changes**: New in Zulip 4.0 (feature level 58). Previously,
    typing notifications were only for direct messages. */
    stream_id?: number
    /** Only present if `message_type` is `"stream"`.

    Topic within the stream where the message is being typed.

    **Changes**: New in Zulip 4.0 (feature level 58). Previously,
    typing notifications were only for direct messages. */
    topic?: string
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'update_message_flags')
    op?: string
    /** Old name for `op` for this event type.

    **Deprecated**: This is deprecated; please use `op` instead
    starting with Zulip 4.0 (feature level 32). */
    operation?: string
    /** The flag that was added. */
    flag?: string
    /** Array containing the IDs of all messages to which
    the flag was added. */
    messages?: number[]
    /** Whether the flag was added to all messages (E.g. all messages
    were marked as read).
    If this is true, then the `messages` array will be empty. */
    all?: boolean
  } | {
    id: EventIdSchema
    type: (EventTypeSchema & 'update_message_flags')
    op: string
    /** Old name for `op` for this event type.

    **Deprecated**: This is deprecated; please use `op` instead
    starting with Zulip 4.0 (feature level 32). */
    operation: string
    /** The flag to be removed. */
    flag: string
    /** Array containing the IDs of the messages from which the flag
    was removed. */
    messages: number[]
    /** Whether the flag was removed from all messages.
    If this is true then the `messages` array will be empty. */
    all: boolean
    /** Present if `message` and `update_message_flags` are both present in
    `event_types` and the `flag` is `read` and the `op` is `remove`.

    A set of data structures describing the messages that
    are being marked as unread with additional details to
    allow a client to update the `unread_msgs` data
    structure for these messages (which may not be
    otherwise known to the client).

    **Changes**: New in Zulip 5.0 (feature level 121). Previously,
    marking already read messages as unread was not
    supported by the Zulip API. */
    message_details?: {
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_group')
    op?: string
    group?: UserGroup
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_group')
    op?: string
    /** The ID of the user group whose details have changed. */
    group_id?: number
    /** Dictionary containing the changed details of the user group. */
    data?: {
      /** The new name of the user group. Only present if the group's name changed. */
      name?: string
      /** The new description of the group. Only present if the description
      changed. */
      description?: string
      /** ID of the new user group whose members are allowed to mention the
      group.

      **Changes**: Before Zulip 8.0 (feature level 198),
      the `can_mention_group` setting
      was named `can_mention_group_id`.

      New in Zulip 8.0 (feature level 191). Previously, groups
      could be mentioned if and only if they were not system groups. */
      can_mention_group?: number
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_group')
    op?: string
    /** The ID of the user group with new members. */
    group_id?: number
    /** Array containing the IDs of the users who have been added
    to the user group. */
    user_ids?: number[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_group')
    op?: string
    /** The ID of the user group whose details have changed. */
    group_id?: number
    /** Array containing the IDs of the users who have been removed
    from the user group. */
    user_ids?: number[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_group')
    op?: string
    /** The ID of the user group whose details have changed. */
    group_id?: number
    /** Array containing the IDs of the subgroups that have been added
    to the user group.

    **Changes**: New in Zulip 6.0 (feature level 131).
    Previously, this was called `subgroup_ids`, but
    clients can ignore older events as this feature level
    predates subgroups being fully implemented. */
    direct_subgroup_ids?: number[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_group')
    op?: string
    /** The ID of the user group whose details have changed. */
    group_id?: number
    /** Array containing the IDs of the subgroups that have been
    removed from the user group.

    **Changes**: New in Zulip 6.0 (feature level 131).
    Previously, this was called `subgroup_ids`, but
    clients can ignore older events as this feature level
    predates subgroups being fully implemented. */
    direct_subgroup_ids?: number[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'user_group')
    op?: string
    /** The ID of the group which has been deleted. */
    group_id?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_linkifiers')
    /** An ordered array of dictionaries where each dictionary contains
    details about a single linkifier.

    Clients should always process linkifiers in the order given;
    this is important if the realm has linkifiers with overlapping
    patterns. The order can be modified using [`PATCH
    /realm/linkifiers`](/api/reorder-linkifiers). */
    realm_linkifiers?: {
      /** The [Python regular expression](https://docs.python.org/3/howto/regex.html)
      that represents the pattern that should be linkified by this linkifier. */
      pattern?: string
      /** The [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html) compliant
      URL template to be used for linkifying matches.

      **Changes**: New in Zulip 7.0 (feature level 176). This replaced `url_format`,
      which contained a URL format string. */
      url_template?: string
      /** The ID of the linkifier. */
      id?: number
    }[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_filters')
    /** An array of tuples, where each tuple described a linkifier. The first
    element of the tuple was a string regex pattern which represented the
    pattern to be linkified on matching, for example `"#(?P<id>[123])"`.
    The second element was the URL format string that the pattern should be
    linkified with. A URL format string for the above example would be
    `"https://realm.com/my_realm_filter/%(id)s"`. And the third element
    was the ID of the realm filter. */
    realm_filters?: (number | string)[][]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_playgrounds')
    /** An array of dictionaries where each dictionary contains
    data about a single playground entry. */
    realm_playgrounds?: RealmPlayground[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_emoji')
    op?: string
    /** An object in which each key describes a realm emoji. */
    realm_emoji?: {
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_domains')
    op?: string
    realm_domain?: RealmDomain
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_domains')
    op?: string
    /** Object containing details of the edited domain. */
    realm_domain?: {
      /** The domain whose settings have changed. */
      domain?: string
      /** Whether subdomains are allowed for this domain. */
      allow_subdomains?: boolean
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_domains')
    op?: string
    /** The domain to be removed. */
    domain?: string
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_export')
    /** An array of dictionaries where each dictionary contains
    data about a single organization export request. */
    exports?: RealmExport[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_bot')
    op?: string
    bot?: Bot
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_bot')
    op?: string
    bot?: (BasicBot)
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_bot')
    op?: string
    /** Object containing details about the deactivated bot. */
    bot?: {
      /** The user ID of the deactivated bot. */
      user_id?: number
      /** The full name of the deactivated bot. */
      full_name?: string
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_bot')
    op?: string
    /** Object containing details about the deactivated bot. */
    bot?: {
      /** The user ID of the deactivated bot. */
      user_id?: number
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm')
    op?: string
    /** The name of the property that was changed. */
    property?: string
    /** The new value of the property. */
    value?: (string | boolean | number)
    /** Object containing extra data related to the changed
    property. */
    extra_data?: {
      /** Note: Only present if changed property is `plan_type`.

      The new upload quota for the Zulip organization. */
      upload_quota?: number
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm')
    op?: string
    /** The ID of the deactivated realm. */
    realm_id?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'restart')
    /** The Zulip version number, in the format where this appears
    in the [server_settings](/api/get-server-settings) and
    [register](/api/register-queue) responses.

    **Changes**: New in Zulip 4.0 (feature level 59). */
    zulip_version?: string
    /** The Zulip merge base number, in the format where this appears
    in the [server_settings](/api/get-server-settings) and
    [register](/api/register-queue) responses.

    **Changes**: New in Zulip 5.0 (feature level 88). */
    zulip_merge_base?: string
    /** The [Zulip feature level](/api/changelog) of the server
    after the restart.

    Clients can safely avoid refetching their state and
    creating a new event queue when the API feature level has not
    changed, or when they know the specific feature level change
    is not relevant to the client (E.g. it just adds a new endpoint
    that the client doesn't use).

    **Changes**: New in Zulip 4.0 (feature level 59). */
    zulip_feature_level?: number
    /** Whether the client should fetch a new event queue immediately,
    rather than using a backoff strategy to avoid thundering herds.
    A Zulip development server uses this parameter to reload
    clients immediately. */
    immediate?: boolean
    /** The timestamp at which the server started. */
    server_generation?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm')
    op?: string
    /** Always `"default"`. Present for backwards-compatibility with older
    clients that predate the `update_dict` event style.

    **Deprecated** and will be removed in a future release. */
    property?: string
    /** An object containing the properties that have changed.

    **Changes**: In Zulip 7.0 (feature level 183), the
    `community_topic_editing_limit_seconds` property was removed.
    It was documented as potentially returned as a changed property
    in this event, but in fact it was only ever returned in the
    [`POST /register`](/api/register-queue) response.

    Before Zulip 6.0 (feature level 150), on changing any of
    `allow_message_editing`, `message_content_edit_limit_seconds`, or
    `edit_topic_policy` settings, this object included all the three settings
    irrespective of which of these settings were changed. Now, a separate event
    is sent for each changed setting. */
    data?: {
      /** The [policy](/api/roles-and-permissions#permission-levels)
      for which users can add custom emoji in this organization. */
      add_custom_emoji_policy?: number
      /** Whether this organization is configured to allow users to access
      [message edit history](/help/view-a-messages-edit-history). */
      allow_edit_history?: boolean
      /** Whether this organizations [message edit policy](/help/restrict-message-editing-and-deletion)
      allows editing the content of messages. */
      allow_message_editing?: boolean
      /** Dictionary of 'authentication_method_name': 'boolean' with each
      entry describing whether the authentication name can be used for
      authenticating into the organization. */
      authentication_methods?: {
      }
      /** The [policy](/api/roles-and-permissions#permission-levels)
      for which users can create bot users in this organization. */
      bot_creation_policy?: number
      /** The [policy](/api/roles-and-permissions#permission-levels)
      for which users can create public streams in this organization.

      **Changes**: Before Zulip 5.0 (feature level 102), permission to
      create streams was controlled by the `create_stream_policy` setting. */
      create_public_stream_policy?: number
      /** The [policy](/api/roles-and-permissions#permission-levels)
      for which users can create private streams in this organization.

      **Changes**: Before Zulip 5.0 (feature level 102), permission to
      create streams was controlled by the `create_stream_policy` setting. */
      create_private_stream_policy?: number
      /** The [policy](/api/roles-and-permissions#permission-levels)
      for which users can create web public streams in this organization.

      **Changes**: New in Zulip 5.0 (feature level 103). */
      create_web_public_stream_policy?: number
      /** The default pygments language code to be used for code blocks in this
      organization. If an empty string, no default has been set.

      **Changes**: Prior to Zulip 8.0 (feature level 195), a server bug meant
      that both `null` and an empty string could represent that no default was
      set for this realm setting in the [`POST /register`](/api/register-queue)
      response. The documentation for both that endpoint and this event
      incorrectly stated that the only representation for no default language
      was `null`. This event in fact uses the empty string to indicate that no
      default has been set in all server versions. */
      default_code_block_language?: string
      /** The default language for the organization. */
      default_language?: string
      /** The description of the organization, used on login and registration pages. */
      description?: string
      /** Whether the organization has enabled [weekly digest emails](/help/digest-emails). */
      digest_emails_enabled?: boolean
      /** The day of the week when the organization will send
      its weekly digest email to inactive users. */
      digest_weekday?: number
      /** Whether the organization disallows disposable email
      addresses. */
      disallow_disposable_email_addresses?: boolean
      /** The [policy][permission-level] for which users can edit topics of any message.

      - 1 = Members only
      - 2 = Admins only
      - 3 = [Full members][calc-full-member] only
      - 4 = Moderators only
      - 5 = Everyone
      - 6 = Nobody

      **Changes**: Nobody added as an option in Zulip 7.0 (feature level 159).

      New in Zulip 5.0 (feature level 75), replacing the previous
      `allow_community_topic_editing` boolean.

      [permission-level]: /api/roles-and-permissions#permission-levels
      [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member */
      edit_topic_policy?: number
      /** Whether users are allowed to change their own email address in this
      organization. This is typically disabled for organizations that
      synchronize accounts from LDAP or a similar corporate database. */
      email_changes_disabled?: boolean
      /** Whether [new users joining](/help/restrict-account-creation#configuring-email-domain-restrictions)
      this organization are required to have an email
      address in one of the `realm_domains` configured for the organization. */
      emails_restricted_to_domains?: boolean
      /** Whether web-public streams are enabled in this organization.

      Can only be enabled if the `WEB_PUBLIC_STREAMS_ENABLED`
      [server setting][server-settings] is enabled on the Zulip
      server. See also the `create_web_public_stream_policy` realm
      setting.

      [server-settings]: https://zulip.readthedocs.io/en/stable/production/settings.html

      **Changes**: New in Zulip 5.0 (feature level 109). */
      enable_spectator_access?: boolean
      /** Maximum rating of the GIFs that will be retrieved from GIPHY.

      **Changes**: New in Zulip 4.0 (feature level 55). */
      giphy_rating?: number
      /** String indicating whether the organization's
      [profile icon](/help/create-your-organization-profile) was uploaded
      by a user or is the default. Useful for UI allowing editing the organization's icon.

      - "G" means generated by Gravatar (the default).
      - "U" means uploaded by an organization administrator. */
      icon_source?: string
      /** The URL of the organization's [profile icon](/help/create-your-organization-profile). */
      icon_url?: string
      /** Whether this organization has been configured to enable
      [previews of linked images](/help/allow-image-link-previews). */
      inline_image_preview?: boolean
      /** Whether this organization has been configured to enable
      [previews of linked websites](/help/allow-image-link-previews). */
      inline_url_embed_preview?: boolean
      /** Whether an invitation is required to join this organization. */
      invite_required?: boolean
      /** The [policy](/api/roles-and-permissions#permission-levels)
      for which users can invite other users to join the organization.

      **Changes**: New in Zulip 4.0 (feature level 50) replacing the
      previous `invite_by_admins_only` boolean. */
      invite_to_realm_policy?: number
      /** The [policy](/api/roles-and-permissions#permission-levels)
      for which users can add other users to streams in this organization. */
      invite_to_stream_policy?: number
      /** String indicating whether the organization's
      [profile wide logo](/help/create-your-organization-profile) was uploaded
      by a user or is the default. Useful for UI allowing editing the
      organization's wide logo.

      - "D" means the logo is the default Zulip logo.
      - "U" means uploaded by an organization administrator. */
      logo_source?: string
      /** The URL of the organization's wide logo configured in the
      [organization profile](/help/create-your-organization-profile). */
      logo_url?: string
      /** Whether [topics are required](/help/require-topics) for messages in this organization. */
      mandatory_topics?: boolean
      /** Whether notification emails in this organization are allowed to
      contain Zulip the message content, or simply indicate that a new
      message was sent. */
      message_content_allowed_in_email_notifications?: boolean
      /** Messages sent more than this many seconds ago cannot be deleted
      with this organization's
      [message deletion policy](/help/restrict-message-editing-and-deletion).

      Will not be 0. A `null` value means no limit: messages can be deleted
      regardless of how long ago they were sent.

      **Changes**: No limit was represented using the
      special value `0` before Zulip 5.0 (feature level 100). */
      message_content_delete_limit_seconds?: number
      /** Messages sent more than this many seconds ago cannot be edited
      with this organization's
      [message edit policy](/help/restrict-message-editing-and-deletion).

      **Changes**: No limit was represented using the
      special value `0` before Zulip 6.0 (feature level 138). */
      message_content_edit_limit_seconds?: number
      /** Messages sent more than this many seconds ago cannot be moved within a
      stream to another topic by users who have permission to do so based on this
      organization's [topic edit policy](/help/restrict-moving-messages). This
      setting does not affect moderators and administrators.

      Will not be 0. A `null` value means no limit, so message topics can be
      edited regardless of how long ago they were sent.

      **Changes**: New in Zulip 7.0 (feature level 162). Previously, this time
      limit was always 72 hours for users who were not administrators or
      moderators. */
      move_messages_within_stream_limit_seconds?: number
      /** Messages sent more than this many seconds ago cannot be moved between
      streams by users who have permission to do so based on this organization's
      [message move policy](/help/restrict-moving-messages). This setting does
      not affect moderators and administrators.

      Will not be 0. A `null` value means no limit, so messages can be moved
      regardless of how long ago they were sent.

      **Changes**: New in Zulip 7.0 (feature level 162). Previously, there was
      no time limit for moving messages between streams for users with permission
      to do so. */
      move_messages_between_streams_limit_seconds?: number
      /** The [policy][permission-level] for which users can move messages from
      one stream to another.

      - 1 = Members only
      - 2 = Administrators only
      - 3 = [Full members][calc-full-member] only
      - 4 = Moderators only
      - 6 = Nobody

      **Changes**: Nobody added as an option in Zulip 7.0 (feature level 159).

      New in Zulip 4.0 (feature level 56).

      [permission-level]: /api/roles-and-permissions#permission-levels
      [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member */
      move_messages_between_streams_policy?: number
      /** The name of the organization, used in login pages etc. */
      name?: string
      /** Indicates whether users are
      [allowed to change](/help/restrict-name-and-email-changes) their name
      via the Zulip UI in this organization. Typically disabled
      in organizations syncing this type of account information from
      an external user database like LDAP. */
      name_changes_disabled?: boolean
      /** String indicating whether the organization's dark theme
      [profile wide logo](/help/create-your-organization-profile) was uploaded
      by a user or is the default. Useful for UI allowing editing the
      organization's wide logo.

      - "D" means the logo is the default Zulip logo.
      - "U" means uploaded by an organization administrator. */
      night_logo_source?: string
      /** The URL of the organization's dark theme wide-format logo configured in the
      [organization profile](/help/create-your-organization-profile). */
      night_logo_url?: string
      /** The ID of the stream to which automated messages announcing the
      [creation of new streams][new-stream-announce] are sent.

      Will be `-1` if such automated messages are disabled.

      Since these automated messages are sent by the server, this field is
      primarily relevant to clients containing UI for changing it.

      [new-stream-announce]: /help/configure-notification-bot#new-stream-announcements */
      notifications_stream_id?: number
      /** The [organization type](/help/organization-type)
      for the realm.

      - 0 = Unspecified
      - 10 = Business
      - 20 = Open-source project
      - 30 = Education (non-profit)
      - 35 = Education (for-profit)
      - 40 = Research
      - 50 = Event or conference
      - 60 = Non-profit (registered)
      - 70 = Government
      - 80 = Political group
      - 90 = Community
      - 100 = Personal
      - 1000 = Other

      **Changes**: New in Zulip 6.0 (feature level 128). */
      org_type?: number
      /** The plan type of the organization.

      - 1 = Self-hosted organization (SELF_HOSTED)
      - 2 = Zulip Cloud free plan (LIMITED)
      - 3 = Zulip Cloud Standard plan (STANDARD)
      - 4 = Zulip Cloud Standard plan, sponsored for free (STANDARD_FREE) */
      plan_type?: number
      /** Whether online presence of other users is shown in this
      organization. */
      presence_disabled?: boolean
      /** [Policy](/api/roles-and-permissions#permission-levels)
      for [who can send direct messages](/help/restrict-direct-messages)
      in this organization.

      - 1 = Everyone
      - 2 = Nobody

      **Changes**: New in Zulip 3.0 (feature level 1). */
      private_message_policy?: number
      /** Whether or not this organization is configured to send the standard Zulip
      [welcome emails](/help/disable-welcome-emails) to new users joining the organization. */
      send_welcome_emails?: boolean
      /** The ID of the stream to which automated messages announcing
      that [new users have joined the organization][new-user-announce] are sent.

      Will be `-1` if such automated messages are disabled.

      Since these automated messages are sent by the server, this field is
      primarily relevant to clients containing UI for changing it.

      [new-user-announce]: /help/configure-notification-bot#new-user-announcements */
      signup_notifications_stream_id?: number
      /** The organization's [policy][permission-level] for
      [who can manage user groups][user-group-permissions].

      - 1 = All members can create and edit user groups
      - 2 = Only organization administrators can create and edit user groups
      - 3 = Only [full members][calc-full-member] can create and edit user groups
      - 4 = Only organization administrators and moderators can create and edit user groups

      [user-group-permissions]: /help/user-groups#configure-who-can-create-and-manage-user-groups
      [permission-level]: /api/roles-and-permissions#permission-levels
      [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member */
      user_group_edit_policy?: number
      /** The configured [video call provider](/help/start-a-call) for the
      organization.

      - 0 = None
      - 1 = Jitsi Meet
      - 3 = Zoom
      - 4 = BigBlueButton

      **Changes**: None added as an option in Zulip 3.0 (feature level 1)
      to disable video call UI. */
      video_chat_provider?: number
      /** Members whose accounts have been created at least this many days ago
      will be treated as [full members][calc-full-member]
      for the purpose of settings that restrict access to new members.

      [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member */
      waiting_period_threshold?: number
      /** Whether the organization has given permission to be advertised in the
      Zulip [communities directory](/help/communities-directory).

      **Changes**: New in Zulip 6.0 (feature level 129). */
      want_advertise_in_communities_directory?: boolean
      /** The [policy][permission-level] for who can use wildcard mentions in
      large streams.

      - 1 = Any user can use wildcard mentions in large streams.
      - 2 = Only members can use wildcard mentions in large streams.
      - 3 = Only [full members][calc-full-member] can use wildcard mentions in large streams.
      - 5 = Only organization administrators can use wildcard mentions in large streams.
      - 6 = Nobody can use wildcard mentions in large streams.
      - 7 = Only organization administrators and moderators can use wildcard mentions in large streams.

      All users will receive a warning/reminder when using
      mentions in large streams, even when permitted to do so.

      **Changes**: New in Zulip 4.0 (feature level 33). Moderators option added in
      Zulip 4.0 (feature level 62). Stream administrators option removed in
      Zulip 6.0 (feature level 133).

      [permission-level]: /api/roles-and-permissions#permission-levels
      [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member */
      wildcard_mention_policy?: number
      /** Whether read receipts is enabled in the organization or not.

      If disabled, read receipt data will be unavailable to clients, regardless
      of individual users' personal read receipt settings. See also the
      `send_read_receipts` setting within `realm_user_settings_defaults`.

      **Changes**: New in Zulip 6.0 (feature level 137). */
      enable_read_receipts?: boolean
    }
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'realm_user_settings_defaults')
    op?: string
    /** The name of the property that was changed. */
    property?: string
    /** The new value of the property. */
    value?: (boolean | number | string)
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'drafts')
    op?: string
    /** An array containing objects for the newly created drafts. */
    drafts?: Draft[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'drafts')
    op?: string
    draft?: Draft
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'drafts')
    op?: string
    /** The ID of the draft that was just deleted. */
    draft_id?: number
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'scheduled_messages')
    op?: string
    /** An array of objects containing details of the newly created
    scheduled messages. */
    scheduled_messages?: ScheduledMessage[]
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'scheduled_messages')
    op?: string
    scheduled_message?: ScheduledMessage
  } | {
    id?: EventIdSchema
    type?: (EventTypeSchema & 'scheduled_messages')
    op?: string
    /** The ID of the scheduled message that was deleted. */
    scheduled_message_id?: number
  })[]
  queue_id?: string
}))
export interface DeleteQueueQuery {
  /** The ID of an event queue that was previously registered via
  `POST /api/v1/register` (see [Register a queue](/api/register-queue)).
  */
  queue_id: string
}
export interface GetStreamIdQuery {
  /** The name of the stream to access.
  */
  stream: string
}
export type GetStreamIdResponse = (JsonSuccessBase & SuccessDescription & ({
  stream_id?: number
}))
export type MarkAllAsReadResponse = ((JsonSuccess & SuccessDescription) | (PartiallyCompleted))
export interface MarkStreamAsReadQuery {
  /** The ID of the stream to access.
  */
  stream_id: number
}
export interface MarkTopicAsReadQuery {
  /** The ID of the stream to access.
  */
  stream_id: number
  /** The name of the topic whose messages should be marked as read.
  */
  topic_name: string
}
export type GetAttachmentsResponse = (JsonSuccessBase & SuccessDescription & ({
  attachments?: Attachments[]
  upload_space_used?: number
}))
export type GetDraftsResponse = (JsonSuccessBase & SuccessDescription & ({
  count?: number
  drafts?: Draft[]
}))
export interface CreateDraftsQuery {
  /** A JSON-encoded list of containing new draft objects.
  */
  drafts?: string
}
export type CreateDraftsResponse = (JsonSuccessBase & SuccessDescription & ({
  ids?: number[]
}))
export interface EditDraftQuery {
  /** A JSON-encoded object containing a replacement draft object for this ID.
  */
  draft: string
}
export type GetScheduledMessagesResponse = (JsonSuccessBase & SuccessDescription & ({
  scheduled_messages?: ScheduledMessage[]
}))
export interface CreateScheduledMessageQuery {
  /** The type of scheduled message to be sent. `"direct"` for a direct
  message and `"stream"` for a stream message.

  In Zulip 7.0 (feature level 174), `"direct"` was added as the
  preferred way to indicate the type of a direct message, deprecating
  the original `"private"`. While `"private"` is supported for
  scheduling direct messages, clients are encouraged to use to the
  modern convention because support for `"private"` may eventually
  be removed.
  */
  type: string
  /** The scheduled message's tentative target audience.

  For stream messages, the integer ID of the stream.
  For direct messages, a list containing integer user IDs.
  */
  to: string
  /** The content of the message.

  Clients should use the `max_message_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum message size.
  */
  content: string
  /** The topic of the message. Only required for stream messages
  (`"type": "stream"`), ignored otherwise.

  Clients should use the `max_topic_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum topic length.
  */
  topic?: string
  /** The UNIX timestamp for when the message will be sent,
  in UTC seconds.
  */
  scheduled_delivery_timestamp: number
}
export type CreateScheduledMessageResponse = (JsonSuccessBase & SuccessDescription & ({
  scheduled_message_id?: number
}))
export interface UpdateScheduledMessageQuery {
  /** The type of scheduled message to be sent. `"direct"` for a direct
  message and `"stream"` for a stream message.

  When updating the type of the scheduled message, the `to` parameter
  is required. And, if updating the type of the scheduled message to
  `"stream"`, then the `topic` parameter is also required.

  In Zulip 7.0 (feature level 174), `"direct"` was added as the
  preferred way to indicate the type of a direct message, deprecating
  the original `"private"`. While `"private"` is supported for
  scheduling direct messages, clients are encouraged to use to the
  modern convention because support for `"private"` may eventually
  be removed.
  */
  type?: string
  /** The scheduled message's tentative target audience.

  For stream messages, the integer ID of the stream.
  For direct messages, a list containing integer user IDs.

  Required when updating the `type` of the scheduled message.
  */
  to?: string
  /** The updated content of the scheduled message.

  Clients should use the `max_message_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum message size.
  */
  content?: string
  /** The updated topic of the scheduled message.

  Required when updating the `type` of the scheduled message to
  `"stream"`. Ignored when the existing or updated `type` of the
  scheduled message is `"direct"` (or `"private"`).

  Clients should use the `max_topic_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum topic length.
  */
  topic?: string
  /** The UNIX timestamp for when the message will be sent,
  in UTC seconds.

  Required when updating a scheduled message that the server
  has already tried and failed to send. This state is indicated
  with `"failed": true` in `scheduled_messages` objects; see
  response description at
  [`GET /scheduled_messages`](/api/get-scheduled-messages#response).
  */
  scheduled_delivery_timestamp?: number
}
export interface AddDefaultStreamQuery {
  /** The ID of the target stream.
  */
  stream_id: number
}
export interface RemoveDefaultStreamQuery {
  /** The ID of the target stream.
  */
  stream_id: number
}
export interface GetMessagesQuery {
  /** Integer message ID to anchor fetching of new messages. Supports special
  string values for when the client wants the server to compute the anchor
  to use:

  - `newest`: The most recent message.
  - `oldest`: The oldest message.
  - `first_unread`: The oldest unread message matching the
   query, if any; otherwise, the most recent message.

  **Changes**: String values are new in Zulip 3.0 (feature level 1). The
  `first_unread` functionality was supported in Zulip 2.1.x
  and older by not sending `anchor` and using `use_first_unread_anchor`.

  In Zulip 2.1.x and older, `oldest` can be emulated with
  `"anchor": 0`, and `newest` with `"anchor": 10000000000000000`
  (that specific large value works around a bug in Zulip
  2.1.x and older in the `found_newest` return value).
  */
  anchor?: (string | number)
  /** Whether a message with the specified ID matching the narrow
  should be included.

  **Changes**: New in Zulip 6.0 (feature level 155).
  */
  include_anchor?: boolean
  /** The number of messages with IDs less than the anchor to retrieve.
  */
  num_before: number
  /** The number of messages with IDs greater than the anchor to retrieve.
  */
  num_after: number
  /** The narrow where you want to fetch the messages from. See how to
  [construct a narrow](/api/construct-narrow).

  Note that many narrows, including all that lack a `stream`
  or `streams` operator, search the user's personal message
  history. See [searching shared
  history](/help/search-for-messages#searching-shared-history)
  for details.

  For example, if you would like to fetch messages from all public streams instead
  of only the user's message history, then a specific narrow for
  messages sent to all public streams can be used:
  `{"operator": "streams", "operand": "public"}`.

  Newly created bot users are not usually subscribed to any
  streams, so bots using this API should either be
  subscribed to appropriate streams or use a shared history
  search narrow with this endpoint.

  **Changes**: In Zulip 7.0 (feature level 177), narrows gained support
  for three new filters related to direct messages: `is:dm`, `dm` and
  `dm-including`; replacing and deprecating `is:private`, `pm-with` and
  `group-pm-with` respectively.

  In Zulip 2.1.0, added support for using user/stream IDs when
  constructing narrows for a message's sender, its stream and/or
  its recipient(s).
  */
  narrow?: string
  /** Whether the client supports computing gravatars URLs. If
  enabled, `avatar_url` will be included in the response only
  if there is a Zulip avatar, and will be `null` for users who
  are using gravatar as their avatar. This option
  significantly reduces the compressed size of user data,
  since gravatar URLs are long, random strings and thus do not
  compress well. The `client_gravatar` field is set to `true` if
  clients can compute their own gravatars.

  **Changes**: The default value of this parameter was `false`
  prior to Zulip 5.0 (feature level 92).
  */
  client_gravatar?: boolean
  /** If `true`, message content is returned in the rendered HTML
  format. If `false`, message content is returned in the raw
  Markdown-format text that user entered.
  */
  apply_markdown?: boolean
  /** Legacy way to specify `"anchor": "first_unread"` in Zulip 2.1.x and older.

  Whether to use the (computed by the server) first unread message
  matching the narrow as the `anchor`. Mutually exclusive with `anchor`.

  **Changes**: Deprecated in Zulip 3.0 (feature level 1) and replaced by
  `"anchor": "first_unread"`.
  */
  use_first_unread_anchor?: boolean
}
export type GetMessagesResponse = (JsonSuccessBase & SuccessDescription & ({
  anchor?: number
  found_newest?: boolean
  found_oldest?: boolean
  found_anchor?: boolean
  history_limited?: boolean
  messages?: (MessagesBase & ({
    avatar_url?: unknown
    flags?: string[]
    match_content?: string
    match_subject?: string
  }))[]
}))
export interface SendMessageQuery {
  /** The type of message to be sent.

  `"direct"` for a direct message and `"stream"` for a stream message.

  **Changes**: In Zulip 7.0 (feature level 174), `"direct"` was added as
  the preferred way to request a direct message, deprecating the original
  `"private"`. While `"private"` is still supported for requesting direct
  messages, clients are encouraged to use to the modern convention with
  servers that support it, because support for `"private"` will eventually
  be removed.
  */
  type: string
  /** For stream messages, either the name or integer ID of the stream. For
  direct messages, either a list containing integer user IDs or a list
  containing string Zulip API email addresses.

  **Changes**: Support for using user/stream IDs was added in Zulip 2.0.0.
  */
  to: string
  /** The content of the message.

  Clients should use the `max_message_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum message size.
  */
  content: string
  /** The topic of the message. Only required for stream messages
  (`"type": "stream"`), ignored otherwise.

  Clients should use the `max_topic_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum topic length.

  **Changes**: New in Zulip 2.0.0. Previous Zulip releases encoded
  this as `subject`, which is currently a deprecated alias.
  */
  topic?: string
  /** For clients supporting
  [local echo](https://zulip.readthedocs.io/en/latest/subsystems/sending-messages.html#local-echo),
  the [event queue](/api/register-queue)
  ID for the client. If passed, `local_id` is required. If the message is
  successfully sent, the server will include `local_id` in the `message` event
  that the client with this `queue_id` will receive notifying it of the new message
  via [`GET /events`](/api/get-events). This lets the client know unambiguously
  that it should replace the locally echoed message, rather than adding this new
  message (which would be correct if the user had sent the new message from another
  device).
  */
  queue_id?: string
  /** For clients supporting local echo, a unique string-format identifier
  chosen freely by the client; the server will pass it back to the client without
  inspecting it, as described in the `queue_id` description.
  */
  local_id?: string
}
export type SendMessageResponse = (JsonSuccessBase & SuccessDescription & ({
  id?: number
}))
export type GetMessageHistoryResponse = (JsonSuccessBase & SuccessDescription & ({
  message_history?: {
    /** The topic of the message immediately
    after this edit event. */
    topic?: string
    /** Only present if message's topic was edited.

    The topic of the message immediately
    prior to this edit event. */
    prev_topic?: string
    /** Only present if message's stream was edited.

    The ID of the stream containing the message
    immediately after this edit event.

    **Changes**: New in Zulip 5.0 (feature level 118). */
    stream?: number
    /** Only present if message's stream was edited.

    The ID of the stream containing the message immediately
    prior to this edit event.

    **Changes**: New in Zulip 3.0 (feature level 1). */
    prev_stream?: number
    /** The raw Markdown content of the message
    immediately after this edit event. */
    content?: string
    /** The rendered HTML representation of `content`. */
    rendered_content?: string
    /** Only present if message's content was edited.

    The raw Markdown content of the message immediately
    prior to this edit event. */
    prev_content?: string
    /** Only present if message's content was edited.

    The rendered HTML representation of `prev_content`. */
    prev_rendered_content?: string
    /** The ID of the user that made the edit.

    Will be `null` only for edit history
    events predating March 2017.

    Clients can display edit history events where this
    is `null` as modified by either the sender (for content
    edits) or an unknown user (for topic edits). */
    user_id?: number
    /** Only present if message's content was edited.

    An HTML diff between this version of the message
    and the previous one. */
    content_html_diff?: string
    /** The UNIX timestamp for this edit. */
    timestamp?: number
  }[]
}))
export interface UpdateMessageFlagsQuery {
  /** An array containing the IDs of the target messages.
  */
  messages: string
  /** Whether to `add` the flag or `remove` it.
  */
  op: string
  /** The flag that should be added/removed.
  */
  flag: string
}
export type UpdateMessageFlagsResponse = (JsonSuccessBase & SuccessDescription & ({
  messages?: number[]
}))
export interface UpdateMessageFlagsForNarrowQuery {
  /** Integer message ID to anchor updating of flags. Supports special
  string values for when the client wants the server to compute the anchor
  to use:

  - `newest`: The most recent message.
  - `oldest`: The oldest message.
  - `first_unread`: The oldest unread message matching the
   query, if any; otherwise, the most recent message.
  */
  anchor: (string | number)
  /** Whether a message with the specified ID matching the narrow
  should be included in the update range.
  */
  include_anchor?: boolean
  /** Limit the number of messages preceding the anchor in the
  update range. The server may decrease this to bound
  transaction sizes.
  */
  num_before: number
  /** Limit the number of messages following the anchor in the
  update range. The server may decrease this to bound
  transaction sizes.
  */
  num_after: number
  /** The narrow you want update flags within. See how to
  [construct a narrow](/api/construct-narrow).

  **Changes**: In Zulip 7.0 (feature level 177), narrows gained support
  for three new filters related to direct messages: `is:dm`, `dm` and
  `dm-including`; replacing and deprecating `is:private`, `pm-with` and
  `group-pm-with` respectively.
  */
  narrow: string
  /** Whether to `add` the flag or `remove` it.
  */
  op: string
  /** The flag that should be added/removed. See [available
  flags](/api/update-message-flags#available-flags).
  */
  flag: string
}
export type UpdateMessageFlagsForNarrowResponse = (JsonSuccessBase & SuccessDescription & ({
  processed_count: number
  updated_count: number
  first_processed_id: number
  last_processed_id: number
  found_oldest: boolean
  found_newest: boolean
}))
export interface RenderMessageQuery {
  /** The content of the message.

  Clients should use the `max_message_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum message size.
  */
  content: string
}
export type RenderMessageResponse = (JsonSuccessBase & SuccessDescription & ({
  rendered?: string
}))
export interface AddReactionQuery {
  /** The target emoji's human-readable name.

  To find an emoji's name, hover over a message to reveal
  three icons on the right, then click the smiley face icon.
  Images of available reaction emojis appear. Hover over the
  emoji you want, and note that emoji's text name.
  */
  emoji_name: string
  /** A unique identifier, defining the specific emoji codepoint requested,
  within the namespace of the `reaction_type`.

  For most API clients, you won't need this, but it's important
  for Zulip apps to handle rare corner cases when
  adding/removing votes on an emoji reaction added previously by
  another user.

  If the existing reaction was added when the Zulip server was
  using a previous version of the emoji data mapping between
  Unicode codepoints and human-readable names, sending the
  `emoji_code` in the data for the original reaction allows the
  Zulip server to correctly interpret your upvote as an upvote
  rather than a reaction with a "different" emoji.
  */
  emoji_code?: string
  /** A string indicating the type of emoji. Each emoji `reaction_type`
  has an independent namespace for values of `emoji_code`.

  If an API client is adding/removing a vote on an existing reaction,
  it should pass this parameter using the value the server provided
  for the existing reaction for specificity. Supported values:

  - `unicode_emoji` : In this namespace, `emoji_code` will be a
   dash-separated hex encoding of the sequence of Unicode codepoints
   that define this emoji in the Unicode specification.

  - `realm_emoji` : In this namespace, `emoji_code` will be the ID of
   the uploaded [custom emoji](/help/custom-emoji).

  - `zulip_extra_emoji` : These are special emoji included with Zulip.
   In this namespace, `emoji_code` will be the name of the emoji (e.g.
   "zulip").

  **Changes**: In Zulip 3.0 (feature level 2), this parameter became
  optional for [custom emoji](/help/custom-emoji);
  previously, this endpoint assumed `unicode_emoji` if this
  parameter was not specified.
  */
  reaction_type?: string
}
export interface RemoveReactionQuery {
  /** The target emoji's human-readable name.

  To find an emoji's name, hover over a message to reveal
  three icons on the right, then click the smiley face icon.
  Images of available reaction emojis appear. Hover over the
  emoji you want, and note that emoji's text name.
  */
  emoji_name?: string
  /** A unique identifier, defining the specific emoji codepoint requested,
  within the namespace of the `reaction_type`.

  For most API clients, you won't need this, but it's important
  for Zulip apps to handle rare corner cases when
  adding/removing votes on an emoji reaction added previously by
  another user.

  If the existing reaction was added when the Zulip server was
  using a previous version of the emoji data mapping between
  Unicode codepoints and human-readable names, sending the
  `emoji_code` in the data for the original reaction allows the
  Zulip server to correctly interpret your upvote as an upvote
  rather than a reaction with a "different" emoji.
  */
  emoji_code?: string
  /** A string indicating the type of emoji. Each emoji `reaction_type`
  has an independent namespace for values of `emoji_code`.

  If an API client is adding/removing a vote on an existing reaction,
  it should pass this parameter using the value the server provided
  for the existing reaction for specificity. Supported values:

  - `unicode_emoji` : In this namespace, `emoji_code` will be a
   dash-separated hex encoding of the sequence of Unicode codepoints
   that define this emoji in the Unicode specification.

  - `realm_emoji` : In this namespace, `emoji_code` will be the ID of
   the uploaded [custom emoji](/help/custom-emoji).

  - `zulip_extra_emoji` : These are special emoji included with Zulip.
   In this namespace, `emoji_code` will be the name of the emoji (e.g.
   "zulip").

  **Changes**: In Zulip 3.0 (feature level 2), this parameter became
  optional for [custom emoji](/help/custom-emoji);
  previously, this endpoint assumed `unicode_emoji` if this
  parameter was not specified.
  */
  reaction_type?: string
}
export type GetReadReceiptsResponse = (JsonSuccessBase & SuccessDescription & ({
  user_ids?: number[]
}))
export interface CheckMessagesMatchNarrowQuery {
  /** List of IDs for the messages to check. */
  msg_ids: string
  /** A structure defining the narrow to check against. See how to
  [construct a narrow](/api/construct-narrow).

  **Changes**: In Zulip 7.0 (feature level 177), narrows gained support
  for three new filters related to direct messages: `is:dm`, `dm` and
  `dm-including`; replacing and deprecating `is:private`, `pm-with` and
  `group-pm-with` respectively.
  */
  narrow: string
}
export type CheckMessagesMatchNarrowResponse = (SuccessDescription & JsonSuccessBase & ({
  messages?: {
  }
}))
export interface GetMessageQuery {
  /** If `true`, message content is returned in the rendered HTML
  format. If `false`, message content is returned in the raw
  Markdown-format text that user entered.

  **Changes**: New in Zulip 5.0 (feature level 120).
  */
  apply_markdown?: boolean
}
export type GetMessageResponse = (JsonSuccessBase & SuccessDescription & ({
  raw_content?: string
  message?: (MessagesBase & ({
    avatar_url?: unknown
    flags?: string[]
  }))
}))
export interface UpdateMessageQuery {
  /** The topic to move the message(s) to, to request changing the topic.

  Clients should use the `max_topic_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum topic length

  Should only be sent when changing the topic, and will throw an error
  if the target message is not a stream message.

  **Changes**: New in Zulip 2.0.0. Previous Zulip releases encoded
  this as `subject`, which is currently a deprecated alias.
  */
  topic?: string
  /** Which message(s) should be edited:

  - `"change_later"`: The target message and all following messages.
  - `"change_one"`: Only the target message.
  - `"change_all"`: All messages in this topic.

  Only the default value of `"change_one"` is valid when editing
  only the content of a message.

  This parameter determines both which messages get moved and also whether
  clients that are currently narrowed to the topic containing the message
  should navigate or adjust their compose box recipient to point to the
  post-edit stream/topic.
  */
  propagate_mode?: string
  /** Whether to send an automated message to the old topic to
  notify users where the messages were moved to.

  **Changes**: Before Zulip 6.0 (feature level 152), this parameter
  had a default of `true` and was ignored unless the stream was changed.

  New in Zulip 3.0 (feature level 9).
  */
  send_notification_to_old_thread?: boolean
  /** Whether to send an automated message to the new topic to
  notify users where the messages came from.

  If the move is just [resolving/unresolving a topic](/help/resolve-a-topic),
  this parameter will not trigger an additional notification.

  **Changes**: Before Zulip 6.0 (feature level 152), this parameter
  was ignored unless the stream was changed.

  New in Zulip 3.0 (feature level 9).
  */
  send_notification_to_new_thread?: boolean
  /** The updated content of the target message.

  Clients should use the `max_message_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum message size.

  Note that a message's content and stream cannot be changed at the
  same time, so sending both `content` and `stream_id` parameters will
  throw an error.
  */
  content?: string
  /** The stream ID to move the message(s) to, to request moving
  messages to another stream.

  Should only be sent when changing the stream, and will throw an error
  if the target message is not a stream message.

  Note that a message's content and stream cannot be changed at the
  same time, so sending both `content` and `stream_id` parameters will
  throw an error.

  **Changes**: New in Zulip 3.0 (feature level 1).
  */
  stream_id?: number
}
export type UploadFileResponse = (JsonSuccessBase & SuccessDescription & ({
  uri?: string
}))
export type GetFileTemporaryUrlResponse = (JsonSuccessBase & SuccessDescription & ({
  url?: string
}))
export interface GetUsersQuery {
  /** Whether the client supports computing gravatars URLs. If
  enabled, `avatar_url` will be included in the response only
  if there is a Zulip avatar, and will be `null` for users who
  are using gravatar as their avatar. This option
  significantly reduces the compressed size of user data,
  since gravatar URLs are long, random strings and thus do not
  compress well. The `client_gravatar` field is set to `true` if
  clients can compute their own gravatars.

  **Changes**: The default value of this parameter was `false`
  prior to Zulip 5.0 (feature level 92).
  */
  client_gravatar?: boolean
  /** Whether the client wants [custom profile field](/help/custom-profile-fields)
  data to be included in the response.

  **Changes**: New in Zulip 2.1.0. Previous versions do no offer these
  data via the API.
  */
  include_custom_profile_fields?: boolean
}
export type GetUsersResponse = (JsonSuccessBase & SuccessDescription & ({
  members?: User[]
}))
export interface CreateUserQuery {
  /** The email address of the new user.
  */
  email: string
  /** The password of the new user.
  */
  password: string
  /** The full name of the new user.
  */
  full_name: string
}
export type CreateUserResponse = (JsonSuccessBase & SuccessDescription & ({
  user_id?: number
}))
export type GetUserPresenceResponse = (JsonSuccessBase & SuccessDescription & ({
  presence?: {
  }
}))
export type GetOwnUserResponse = (JsonSuccessBase & SuccessDescription & ({
  avatar_url?: string
  avatar_version?: number
  email?: string
  full_name?: string
  is_admin?: boolean
  is_owner?: boolean
  is_billing_admin?: boolean
  role?: number
  is_guest?: boolean
  is_bot?: boolean
  is_active?: boolean
  timezone?: string
  date_joined?: string
  max_message_id?: number
  user_id?: number
  delivery_email?: string
  profile_data?: profile_data
}))
export type GetAlertWordsResponse = (JsonSuccessBase & SuccessDescription & ({
  alert_words?: string[]
}))
export interface AddAlertWordsQuery {
  /** An array of strings to be added to the user's set of configured
  alert words. Strings already present in the user's set of alert words
  already are ignored.

  Alert words are case insensitive.
  */
  alert_words: string
}
export type AddAlertWordsResponse = (JsonSuccessBase & SuccessDescription & ({
  alert_words?: string[]
}))
export interface RemoveAlertWordsQuery {
  /** An array of strings to be removed from the user's set of configured
  alert words. Strings that are not in the user's set of alert words
  are ignored.
  */
  alert_words: string
}
export type RemoveAlertWordsResponse = (JsonSuccessBase & SuccessDescription & ({
  alert_words?: string[]
}))
export interface UpdateStatusQuery {
  /** The text content of the status message. Sending the empty string
  will clear the user's status.

  **Note**: The limit on the size of the message is 60 characters.
  */
  status_text?: string
  /** Whether the user should be marked as "away".

  **Changes**: Deprecated in Zulip 6.0 (feature level 148);
  starting with that feature level, `away` is a legacy way to
  access the user's `presence_enabled` setting, with
  `away = !presence_enabled`. To be removed in a future release.
  */
  away?: boolean
  /** The name for the emoji to associate with this status.

  **Changes**: New in Zulip 5.0 (feature level 86).
  */
  emoji_name?: string
  /** A unique identifier, defining the specific emoji codepoint requested,
  within the namespace of the `reaction_type`.

  **Changes**: New in Zulip 5.0 (feature level 86).
  */
  emoji_code?: string
  /** A string indicating the type of emoji. Each emoji `reaction_type`
  has an independent namespace for values of `emoji_code`.

  Must be one of the following values:

  - `unicode_emoji` : In this namespace, `emoji_code` will be a
   dash-separated hex encoding of the sequence of Unicode codepoints
   that define this emoji in the Unicode specification.

  - `realm_emoji` : In this namespace, `emoji_code` will be the ID of
   the uploaded [custom emoji](/help/custom-emoji).

  - `zulip_extra_emoji` : These are special emoji included with Zulip.
   In this namespace, `emoji_code` will be the name of the emoji (e.g.
   "zulip").

  **Changes**: New in Zulip 5.0 (feature level 86).
  */
  reaction_type?: string
}
export type GetStreamTopicsResponse = (JsonSuccessBase & SuccessDescription & ({
  topics?: {
    /** The message ID of the last message sent to this topic. */
    max_id?: number
    /** The name of the topic. */
    name?: string
  }[]
}))
export interface GetSubscriptionsQuery {
  /** Whether each returned stream object should include a `subscribers`
  field containing a list of the user IDs of its subscribers.

  (This may be significantly slower in organizations with
  thousands of users subscribed to many streams.)

  **Changes**: New in Zulip 2.1.0.
  */
  include_subscribers?: boolean
}
export type GetSubscriptionsResponse = (JsonSuccessBase & SuccessDescription & ({
  subscriptions: Subscriptions[]
}))
export interface SubscribeQuery {
  /** A list of dictionaries containing the key `name` and value
  specifying the name of the stream to subscribe. If the stream does not
  exist a new stream is created. The description of the stream created can
  be specified by setting the dictionary key `description` with an
  appropriate value.
  */
  subscriptions: string
  /** A list of user IDs (preferred) or Zulip API email
  addresses of the users to be subscribed to or unsubscribed
  from the streams specified in the `subscriptions` parameter. If
  not provided, then the requesting user/bot is subscribed.

  **Changes**: The integer format is new in Zulip 3.0 (feature level 9).
  */
  principals?: string
  /** A boolean specifying whether authorization errors (such as when the
  requesting user is not authorized to access a private stream) should be
  considered fatal or not. When `true`, an authorization error is reported
  as such. When set to `false`, the response will be a 200 and any streams
  where the request encountered an authorization error will be listed
  in the `unauthorized` key.
  */
  authorization_errors_fatal?: boolean
  /** If one of the streams specified did not exist previously and is thus created
  by this call, this determines whether [notification bot](/help/configure-notification-bot)
  will send an announcement about the new stream's creation.
  */
  announce?: boolean
  /** As described above, this endpoint will create a new stream if passed
  a stream name that doesn't already exist. This parameters and the ones
  that follow are used to request an initial configuration of a created
  stream; they are ignored for streams that already exist.

  This parameter determines whether any newly created streams will be
  private streams.
  */
  invite_only?: boolean
  /** This parameter determines whether any newly created streams will be
  web-public streams.

  Note that creating web-public streams requires the
  `WEB_PUBLIC_STREAMS_ENABLED` [server setting][server-settings]
  to be enabled on the Zulip server in question, the organization
  to have enabled the `enable_spectator_access` realm setting, and
  the current use to have permission under the organization's
  `create_web_public_stream_policy` realm setting.

  [server-settings]: https://zulip.readthedocs.io/en/stable/production/settings.html

  **Changes**: New in Zulip 5.0 (feature level 98).
  */
  is_web_public?: boolean
  /** This parameter determines whether any newly created streams will be
  added as [default streams][default-streams] for new users joining
  the organization.

  [default-streams]: /help/set-default-streams-for-new-users

  **Changes**: New in Zulip 8.0 (feature level 200). Previously, default stream status
  could only be changed using the [dedicated API endpoint](/api/add-default-stream).
  */
  is_default_stream?: boolean
  /** Whether the stream's message history should be available to
  newly subscribed members, or users can only access messages
  they actually received while subscribed to the stream.

  Corresponds to the [shared history](/help/stream-permissions)
  option in documentation.
  */
  history_public_to_subscribers?: boolean
  /** [Policy][permission-level] for which users can post messages to the stream.

  - 1 = Any user can post.
  - 2 = Only administrators can post.
  - 3 = Only [full members][calc-full-member] can post.
  - 4 = Only moderators can post.

  **Changes**: New in Zulip 3.0 (feature level 1), replacing the previous
  `is_announcement_only` boolean.

  [permission-level]: /api/roles-and-permissions#permission-levels
  [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member
  */
  stream_post_policy?: number
  /** Number of days that messages sent to this stream will be stored
  before being automatically deleted by the [message retention
  policy](/help/message-retention-policy). Two special string format
  values are supported:

  - `"realm_default"`: Return to the organization-level setting.
  - `"unlimited"`: Retain messages forever.

  **Changes**: Prior to Zulip 5.0 (feature level 91), retaining
  messages forever was encoded using `"forever"` instead of
  `"unlimited"`.

  New in Zulip 3.0 (feature level 17).
  */
  message_retention_days?: (string | number)
  /** ID of the [user group](/api/get-user-groups) whose members are
  allowed to unsubscribe others from the stream. Note that a user
  who is a member of the specified user group must also [have
  access](/help/stream-permissions) to the stream in order to
  unsubscribe others.

  This setting can currently only be set to user groups that are
  system groups, except for the system groups named
  `"role:internet"` and `"role:owners"`.

  **Changes**: Before Zulip 8.0 (feature level 197),
  the `can_remove_subscribers_group` setting
  was named `can_remove_subscribers_group_id`.

  New in Zulip 7.0 (feature level 161).
  */
  can_remove_subscribers_group?: number
}
export type SubscribeResponse = (AddSubscriptionsResponse & SuccessDescription)
export interface UpdateSubscriptionsQuery {
  /** A list of stream names to unsubscribe from.
  */
  delete?: string
  /** A list of objects describing which streams to subscribe to, optionally
  including per-user subscription parameters (e.g. color) and if the
  stream is to be created, its description.
  */
  add?: string
}
export type UpdateSubscriptionsResponse = (JsonSuccessBase & SuccessDescription & ({
  subscribed: {
  }
  already_subscribed: {
  }
  not_removed?: string[]
  removed: string[]
}))
export interface UnsubscribeQuery {
  /** A list of stream names to unsubscribe from. This parameter is called
  `streams` in our Python API.
  */
  subscriptions: string
  /** A list of user IDs (preferred) or Zulip API email
  addresses of the users to be subscribed to or unsubscribed
  from the streams specified in the `subscriptions` parameter. If
  not provided, then the requesting user/bot is subscribed.

  **Changes**: The integer format is new in Zulip 3.0 (feature level 9).
  */
  principals?: string
}
export type UnsubscribeResponse = (JsonSuccessBase & SuccessDescription & ({
  not_removed?: string[]
  removed?: string[]
}))
export interface MuteTopicQuery {
  /** The ID of the stream to access.

  Clients must provide either `stream` or `stream_id` as a parameter
  to this endpoint, but not both.

  **Changes**: New in Zulip 2.0.0.
  */
  stream_id?: number
  /** The name of the stream to access.

  Clients must provide either `stream` or `stream_id` as a parameter
  to this endpoint, but not both. Clients should use `stream_id`
  instead of the `stream` parameter when possible.
  */
  stream?: string
  /** The topic to (un)mute. Note that the request will succeed regardless of
  whether any messages have been sent to the specified topic.
  */
  topic: string
  /** Whether to mute (`add`) or unmute (`remove`) the provided topic.
  */
  op: string
}
export interface UpdateUserTopicQuery {
  /** The ID of the stream to access.
  */
  stream_id: number
  /** The topic for which the personal preferences needs to be updated.
  Note that the request will succeed regardless of whether
  any messages have been sent to the specified topic.
  */
  topic: string
  /** Controls which visibility policy to set.

  - 0 = None. Removes the visibility policy previously set for the topic.
  - 1 = Muted. [Mutes the topic](/help/mute-a-topic) in a stream.
  - 2 = Unmuted. [Unmutes the topic](/help/mute-a-topic) in a muted stream.

  In an unmuted stream, a topic visibility policy of unmuted will have the
  same effect as the "None" visibility policy.
  */
  visibility_policy: number
}
export type GetSubscriptionStatusResponse = (JsonSuccessBase & SuccessDescription & ({
  is_subscribed?: boolean
}))
export type GetCustomEmojiResponse = (JsonSuccessBase & SuccessDescription & ({
  emoji?: {
  }
}))
export type GetPresenceResponse = (JsonSuccessBase & SuccessDescription & ({
  server_timestamp?: unknown
  presences?: {
  }
}))
export type GetCustomProfileFieldsResponse = (JsonSuccessBase & SuccessDescription & ({
  custom_fields?: CustomProfileField[]
}))
export interface ReorderCustomProfileFieldsQuery {
  /** A list of the IDs of all the custom profile fields defined in this
  organization, in the desired new order.
  */
  order: string
}
export interface CreateCustomProfileFieldQuery {
  /** The name of the custom profile field, which will appear both in
  user-facing settings UI for configuring custom profile fields and
  in UI displaying a user's profile.
  */
  name?: string
  /** The help text to be displayed for the custom profile field in user-facing
  settings UI for configuring custom profile fields.
  */
  hint?: string
  /** The field type can be any of the supported custom profile field types. See the
  [custom profile fields documentation](/help/custom-profile-fields)
  for more details on what each type means.

  - **1**: Short text
  - **2**: Long text
  - **3**: List of options
  - **4**: Date picker
  - **5**: Link
  - **6**: Person picker
  - **7**: External account
  - **8**: Pronouns

  **Changes**: Field type `8` added in Zulip 6.0 (feature level 151).
  */
  field_type: number
  /** Field types 3 (List of options) and 7 (External account) support storing
  additional configuration for the field type in the `field_data` attribute.

  For field type 3 (List of options), this attribute is a JSON dictionary
  defining the choices and the order they will be displayed in the
  dropdown UI for individual users to select an option.

  The interface for field type 7 is not yet stabilized.
  */
  field_data?: string
  /** Whether clients should display this profile field in a summary section of a
  user's profile (or in a more easily accessible "small profile").

  At most 2 profile fields may have this property be true in a given
  organization. The "Long text" [profile field types][profile-field-types]
  profile field types cannot be selected to be displayed in profile summaries.

  The "Person picker" profile field is also not supported, but that is likely to
  be temporary.

  [profile-field-types]: /help/custom-profile-fields#profile-field-types

  **Changes**: New in Zulip 6.0 (feature level 146).
  */
  display_in_profile_summary?: boolean
}
export type CreateCustomProfileFieldResponse = (JsonSuccessBase & SuccessDescription & ({
  id?: number
}))
export interface UpdateRealmUserSettingsDefaultsQuery {
  /** This setting has no effect at present. It is reserved for use in controlling
  the default font size in Zulip.
  */
  dense_mode?: boolean
  /** Whether clients should display the [number of starred
  messages](/help/star-a-message#display-the-number-of-starred-messages).
  */
  starred_message_counts?: boolean
  /** Whether to use the [maximum available screen width](/help/enable-full-width-display)
  for the web app's center panel (message feed, recent conversations) on wide screens.
  */
  fluid_layout_width?: boolean
  /** This setting is reserved for use to control variations in Zulip's design
  to help visually impaired users.
  */
  high_contrast_mode?: boolean
  /** Whether or not to mark messages as read when the user scrolls through their
  feed.

  - 1 - Always
  - 2 - Only in conversation views
  - 3 - Never

  **Changes**: New in Zulip 7.0 (feature level 175). Previously, there was no
  way for the user to configure this behavior on the web, and the Zulip web and
  desktop apps behaved like the "Always" setting when marking messages as read.
  */
  web_mark_read_on_scroll_policy?: number
  /** Controls which [color theme](/help/dark-theme) to use.

  - 1 - Automatic
  - 2 - Dark theme
  - 3 - Light theme

  Automatic detection is implementing using the standard `prefers-color-scheme`
  media query.
  */
  color_scheme?: number
  /** A boolean parameter to control whether synchronizing drafts is enabled for
  the user. When synchronization is disabled, all drafts stored in the server
  will be automatically deleted from the server.

  This does not do anything (like sending events) to delete local copies of
  drafts stored in clients.
  */
  enable_drafts_synchronization?: boolean
  /** Whether to [translate emoticons to emoji](/help/configure-emoticon-translations)
  in messages the user sends.
  */
  translate_emoticons?: boolean
  /** Whether to display the names of reacting users on a message.

  When enabled, clients should display the names of reacting users, rather than
  a count, for messages with few total reactions. The ideal cutoff may depend on
  the space available for displaying reactions; the official web application
  displays names when 3 or fewer total reactions are present with this setting
  enabled.

  **Changes**: New in Zulip 6.0 (feature level 125).
  */
  display_emoji_reaction_users?: boolean
  /** The [default view](/help/configure-default-view) used when opening a new
  Zulip web app window or hitting the `Esc` keyboard shortcut repeatedly.

  - "recent_topics" - Recent conversations view
  - "all_messages" - All messages view
  */
  default_view?: string
  /** Whether the escape key navigates to the
  [configured default view](/help/configure-default-view).

  **Changes**: New in Zulip 5.0 (feature level 107).
  */
  escape_navigates_to_default_view?: boolean
  /** Whether the users list on left sidebar in narrow windows.

  This feature is not heavily used and is likely to be reworked.
  */
  left_side_userlist?: boolean
  /** The user's configured [emoji set](/help/emoji-and-emoticons#use-emoticons),
  used to display emoji to the user everywhere they appear in the UI.

  - "google" - Google
  - "twitter" - Twitter
  - "text" - Plain text
  - "google-blob" - Google blobs
  */
  emojiset?: string
  /** Whether to [demote inactive streams](/help/manage-inactive-streams) in the left sidebar.

  - 1 - Automatic
  - 2 - Always
  - 3 - Never
  */
  demote_inactive_streams?: number
  /** The style selected by the user for the right sidebar user list.

  - 1 - Compact
  - 2 - With status
  - 3 - With avatar and status

  **Changes**: New in Zulip 6.0 (feature level 141).
  */
  user_list_style?: number
  /** Enable visual desktop notifications for stream messages.
  */
  enable_stream_desktop_notifications?: boolean
  /** Enable email notifications for stream messages.
  */
  enable_stream_email_notifications?: boolean
  /** Enable mobile notifications for stream messages.
  */
  enable_stream_push_notifications?: boolean
  /** Enable audible desktop notifications for stream messages.
  */
  enable_stream_audible_notifications?: boolean
  /** Notification sound name.
  */
  notification_sound?: string
  /** Enable visual desktop notifications for direct messages and @-mentions.
  */
  enable_desktop_notifications?: boolean
  /** Enable audible desktop notifications for direct messages and
  @-mentions.
  */
  enable_sounds?: boolean
  /** Enable visual desktop notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_desktop_notifications?: boolean
  /** Enable email notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_email_notifications?: boolean
  /** Enable push notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_push_notifications?: boolean
  /** Enable audible desktop notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_audible_notifications?: boolean
  /** The duration (in seconds) for which the server should wait to batch
  email notifications before sending them.
  */
  email_notifications_batching_period_seconds?: number
  /** Enable email notifications for direct messages and @-mentions received
  when the user is offline.
  */
  enable_offline_email_notifications?: boolean
  /** Enable mobile notification for direct messages and @-mentions received
  when the user is offline.
  */
  enable_offline_push_notifications?: boolean
  /** Enable mobile notification for direct messages and @-mentions received
  when the user is online.
  */
  enable_online_push_notifications?: boolean
  /** Enable digest emails when the user is away.
  */
  enable_digest_emails?: boolean
  /** Include the message's content in email notifications for new messages.
  */
  message_content_in_email_notifications?: boolean
  /** Include content of direct messages in desktop notifications.
  */
  pm_content_in_desktop_notifications?: boolean
  /** Whether wildcard mentions (E.g. @**all**) should send notifications
  like a personal mention.
  */
  wildcard_mentions_notify?: boolean
  /** Whether wildcard mentions (e.g., @**all**) in messages sent to followed topics
  should send notifications like a personal mention.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_wildcard_mentions_notify?: boolean
  /** Unread count badge (appears in desktop sidebar and browser tab)

  - 1 - All unreads
  - 2 - Direct messages and mentions
  - 3 - None
  */
  desktop_icon_count_display?: number
  /** Whether to [include organization name in subject of message notification
  emails](/help/email-notifications#include-organization-name-in-subject-line).

  - 1 - Automatic
  - 2 - Always
  - 3 - Never

  **Changes**: New in Zulip 7.0 (feature level 168), replacing the
  previous `realm_name_in_notifications` boolean;
  `true` corresponded to `Always`, and `false` to `Never`.
  */
  realm_name_in_email_notifications_policy?: number
  /** Display the presence status to other users when online.
  */
  presence_enabled?: boolean
  /** Whether pressing Enter in the compose box sends a message
  (or saves a message edit).
  */
  enter_sends?: boolean
  /** Whether time should be [displayed in 24-hour notation](/help/change-the-time-format).

  **Changes**: New in Zulip 5.0 (feature level 99).
  Previously, this default was edited using the
  `default_twenty_four_hour_time` parameter to the `PATCH /realm` endpoint.
  */
  twenty_four_hour_time?: boolean
  /** Whether [typing notifications](/help/typing-notifications) be sent when composing
  direct messages.

  **Changes**: New in Zulip 5.0 (feature level 105).
  */
  send_private_typing_notifications?: boolean
  /** Whether [typing notifications](/help/typing-notifications) be sent when composing
  stream messages.

  **Changes**: New in Zulip 5.0 (feature level 105).
  */
  send_stream_typing_notifications?: boolean
  /** Whether other users are allowed to see whether you've
  read messages.

  **Changes**: New in Zulip 5.0 (feature level 105).
  */
  send_read_receipts?: boolean
  /** The [policy][permission-level] for [which other users][help-email-visibility]
  in this organization can see the user's real email address.

  - 1 = Everyone
  - 2 = Members only
  - 3 = Administrators only
  - 4 = Nobody
  - 5 = Moderators only

  **Changes**: New in Zulip 7.0 (feature level 163), replacing the
  realm-level setting.

  [permission-level]: /api/roles-and-permissions#permission-levels
  [help-email-visibility]: /help/configure-email-visibility
  */
  email_address_visibility?: number
}
export interface UpdateSubscriptionSettingsQuery {
  /** A list of objects that describe the changes that should be applied in
  each subscription. Each object represents a subscription, and must have
  a `stream_id` key that identifies the stream, as well as the `property`
  being modified and its new `value`.
  */
  subscription_data: string
}
export interface GetUserByEmailQuery {
  /** Whether the client supports computing gravatars URLs. If
  enabled, `avatar_url` will be included in the response only
  if there is a Zulip avatar, and will be `null` for users who
  are using gravatar as their avatar. This option
  significantly reduces the compressed size of user data,
  since gravatar URLs are long, random strings and thus do not
  compress well. The `client_gravatar` field is set to `true` if
  clients can compute their own gravatars.

  **Changes**: The default value of this parameter was `false`
  prior to Zulip 5.0 (feature level 92).
  */
  client_gravatar?: boolean
  /** Whether the client wants [custom profile field](/help/custom-profile-fields)
  data to be included in the response.

  **Changes**: New in Zulip 2.1.0. Previous versions do no offer these
  data via the API.
  */
  include_custom_profile_fields?: boolean
}
export type GetUserByEmailResponse = (JsonSuccessBase & SuccessDescription & ({
  user?: User
}))
export interface GetUserQuery {
  /** Whether the client supports computing gravatars URLs. If
  enabled, `avatar_url` will be included in the response only
  if there is a Zulip avatar, and will be `null` for users who
  are using gravatar as their avatar. This option
  significantly reduces the compressed size of user data,
  since gravatar URLs are long, random strings and thus do not
  compress well. The `client_gravatar` field is set to `true` if
  clients can compute their own gravatars.

  **Changes**: The default value of this parameter was `false`
  prior to Zulip 5.0 (feature level 92).
  */
  client_gravatar?: boolean
  /** Whether the client wants [custom profile field](/help/custom-profile-fields)
  data to be included in the response.

  **Changes**: New in Zulip 2.1.0. Previous versions do no offer these
  data via the API.
  */
  include_custom_profile_fields?: boolean
}
export type GetUserResponse = (JsonSuccessBase & SuccessDescription & ({
  user?: User
}))
export interface UpdateUserQuery {
  /** The user's full name.

  **Changes**: Removed unnecessary JSON-encoding of this parameter in
  Zulip 5.0 (feature level 106).
  */
  full_name?: string
  /** New [role](/api/roles-and-permissions) for the user. Roles are encoded as:

  - Organization owner: 100
  - Organization administrator: 200
  - Organization moderator: 300
  - Member: 400
  - Guest: 600

  Only organization owners can add or remove the owner role.

  The owner role cannot be removed from the only organization owner.

  **Changes**: New in Zulip 3.0 (feature level 8), replacing the previous
  pair of `is_admin` and `is_guest` boolean parameters. Organization moderator
  role added in Zulip 4.0 (feature level 60).
  */
  role?: number
  /** A dictionary containing the to be updated custom profile field data for the user.
  */
  profile_data?: string
}
export interface DeactivateUserQuery {
  /** If not `null`, requests that the deactivated user receive
  a notification email about their account deactivation.

  If not `""`, encodes custom text written by the administrator
  to be included in the notification email.

  **Changes**: New in Zulip 5.0 (feature level 135).
  */
  deactivation_notification_comment?: string
}
export type GetLinkifiersResponse = (JsonSuccessBase & SuccessDescription & ({
  linkifiers?: {
    /** The string regex pattern which represents the pattern that
    should be linkified by this linkifier. */
    pattern?: string
    /** The [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html) compliant
    URL template to be used for linkifying matches.

    **Changes**: New in Zulip 7.0 (feature level 176). This replaced `url_format`,
    which contained a URL format string. */
    url_template?: string
    /** The ID of the linkifier. */
    id?: number
  }[]
}))
export interface ReorderLinkifiersQuery {
  /** A list of the IDs of all the linkifiers defined in this
  organization, in the desired new order.
  */
  ordered_linkifier_ids: string
}
export interface AddLinkifierQuery {
  /** The [Python regular
  expression](https://docs.python.org/3/howto/regex.html) that should
  trigger the linkifier.
  */
  pattern: string
  /** The [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html)
  compliant URL template used for the link.
  If you used named groups in `pattern`, you can insert their
  content here with `{name_of_group}`.

  **Changes**: New in Zulip 7.0 (feature level 176). This replaced
  the `url_format_string` parameter, which was a format string in which
  named groups' content could be inserted with `%(name_of_group)s`.
  */
  url_template: string
}
export type AddLinkifierResponse = (JsonSuccessBase & SuccessDescription & ({
  id?: number
}))
export interface UpdateLinkifierQuery {
  /** The [Python regular
  expression](https://docs.python.org/3/howto/regex.html) that should
  trigger the linkifier.
  */
  pattern: string
  /** The [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html)
  compliant URL template used for the link.
  If you used named groups in `pattern`, you can insert their
  content here with `{name_of_group}`.

  **Changes**: New in Zulip 7.0 (feature level 176). This replaced
  the `url_format_string` parameter, which was a format string in which
  named groups' content could be inserted with `%(name_of_group)s`.
  */
  url_template: string
}
export interface AddCodePlaygroundQuery {
  /** The user-visible display name of the playground which can be
  used to pick the target playground, especially when multiple
  playground options exist for that programming language.
  */
  name: string
  /** The name of the Pygments language lexer for that
  programming language.
  */
  pygments_language: string
  /** The [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html)
  compliant URL template for the playground. The template should
  contain exactly one variable named `code`, which determines how the
  extracted code should be substituted in the playground URL.

  **Changes**: New in Zulip 8.0 (feature level 196). This replaced the
  `url_prefix` parameter, which was used to construct URLs by just
  concatenating `url_prefix` and `code`.
  */
  url_template: string
}
export type AddCodePlaygroundResponse = (JsonSuccessBase & SuccessDescription & ({
  id?: number
}))
export interface RegisterQueueQuery {
  /** Set to `true` if you would like the content to be rendered in HTML
  format (otherwise the API will return the raw text that the user
  entered)
  */
  apply_markdown?: boolean
  /** Whether the client supports computing gravatars URLs. If
  enabled, `avatar_url` will be included in the response only
  if there is a Zulip avatar, and will be `null` for users who
  are using gravatar as their avatar. This option
  significantly reduces the compressed size of user data,
  since gravatar URLs are long, random strings and thus do not
  compress well. The `client_gravatar` field is set to `true` if
  clients can compute their own gravatars.

  The default value is `true` for authenticated requests and
  `false` for [unauthenticated
  requests](/help/public-access-option). Passing `true` in
  an unauthenticated request is an error.

  **Changes**: Before Zulip 6.0 (feature level 149), this
  parameter was silently ignored and processed as though it
  were `false` in unauthenticated requests.
  */
  client_gravatar?: boolean
  /** Whether each returned stream object should include a `subscribers`
  field containing a list of the user IDs of its subscribers.

  (This may be significantly slower in organizations with
  thousands of users subscribed to many streams.)

  Passing `true` in an [unauthenticated
  request](/help/public-access-option) is an error.

  **Changes**: Before Zulip 6.0 (feature level 149), this
  parameter was silently ignored and processed as though it
  were `false` in unauthenticated requests.

  New in Zulip 2.1.0.
  */
  include_subscribers?: boolean
  /** Setting this to `true` will make presence dictionaries be keyed by
  user ID instead of Zulip API email.

  **Changes**: New in Zulip 3.0 (Unstable with no feature level yet).
  */
  slim_presence?: boolean
  /** A JSON-encoded array indicating which types of events you're interested
  in. Values that you might find useful include:

  - **message** (messages)
  - **subscription** (changes in your subscriptions)
  - **realm_user** (changes to users in the organization and
   their properties, such as their name).

  If you do not specify this parameter, you will receive all
  events, and have to filter out the events not relevant to
  your client in your client code. For most applications, one
  is only interested in messages, so one specifies:
  `"event_types": ["message"]`

  Event types not supported by the server are ignored, in order to simplify
  the implementation of client apps that support multiple server versions.
  */
  event_types?: string
  /** Whether you would like to request message events from all public
  streams. Useful for workflow bots that you'd like to see all new messages
  sent to public streams. (You can also subscribe the user to private streams).
  */
  all_public_streams?: boolean
  /** Dictionary containing details on features the client supports that are
  relevant to the format of responses sent by the server.

  - `notification_settings_null`: Boolean for whether the
   client can handle the current API with `null` values for
   stream-level notification settings (which means the stream
   is not customized and should inherit the user's global
   notification settings for stream messages).
   <br />
   **Changes**: New in Zulip 2.1.0. In earlier Zulip releases,
   stream-level notification settings were simple booleans.

  - `bulk_message_deletion`: Boolean for whether the client's
   handler for the `delete_message` event type has been
   updated to process the new bulk format (with a
   `message_ids`, rather than a singleton `message_id`).
   Otherwise, the server will send `delete_message` events
   in a loop.
   <br />
   **Changes**: New in Zulip 3.0 (feature level 13). This
   capability is for backwards-compatibility; it will be
   required in a future server release.

  - `user_avatar_url_field_optional`: Boolean for whether the
   client required avatar URLs for all users, or supports
   using `GET /avatar/{user_id}` to access user avatars. If the
   client has this capability, the server may skip sending a
   `avatar_url` field in the `realm_user` at its sole discretion
   to optimize network performance. This is an important optimization
   in organizations with 10,000s of users.
   <br />
   **Changes**: New in Zulip 3.0 (feature level 18).

  - `stream_typing_notifications`: Boolean for whether the client
   supports stream typing notifications.
   <br />
   **Changes**: New in Zulip 4.0 (feature level 58). This capability is
   for backwards-compatibility; it will be required in a
   future server release.

  - `user_settings_object`: Boolean for whether the client supports the modern
   `user_settings` event type. If false, the server will additionally send the
   legacy `update_global_notifications` and `update_display_settings` event
   types.
   <br />
   **Changes**: New in Zulip 5.0 (feature level 89). This capability is for
   backwards-compatibility; it will be removed in a future server release.
   Because the feature level 89 API changes were merged together, clients can
   safely make a request with this client capability and also request all three
   event types (`user_settings`, `update_display_settings`,
   `update_global_notifications`), and get exactly one copy of settings data on
   any server version. Clients can then use the `zulip_feature_level` in the
   `/register` response or the presence/absence of a `user_settings` key to
   determine where to look for the data.

  - `linkifier_url_template`: Boolean for whether the client accepts
   [linkifiers][help-linkifiers] that use [RFC 6570][rfc6570] compliant
   URL templates for linkifying matches. If false or unset, then the
   `realm_linkifiers` array in the `/register` response will be empty
   if present, and no `realm_linkifiers` [events][events-linkifiers]
   will be sent to the client.
   <br />
   **Changes**: New in Zulip 7.0 (feature level 176). This capability
   is for backwards-compatibility.

  [help-linkifiers]: /help/add-a-custom-linkifier
  [rfc6570]: https://www.rfc-editor.org/rfc/rfc6570.html
  [events-linkifiers]: /api/get-events#realm_linkifiers
  */
  client_capabilities?: string
  /** Same as the `event_types` parameter except that the values in
  `fetch_event_types` are used to fetch initial data. If
  `fetch_event_types` is not provided, `event_types` is used and if
  `event_types` is not provided, this parameter defaults to `null`.

  Event types not supported by the server are ignored, in order to simplify
  the implementation of client apps that support multiple server versions.
  */
  fetch_event_types?: string
  /** A JSON-encoded array of arrays of length 2 indicating the
  [narrow filter(s)](/api/construct-narrow) for which you'd
  like to receive events for.

  For example, to receive events for direct messages (including
  group direct messages) received by the user, one can use
  `"narrow": [["is", "dm"]]`.

  Unlike the API for [fetching messages](/api/get-messages),
  this narrow parameter is simply a filter on messages that the
  user receives through their stream subscriptions (or because
  they are a recipient of a direct message).

  This means that a client that requests a `narrow` filter of
  `[["stream", "Denmark"]]` will receive events for new messages
  sent to that stream while the user is subscribed to that
  stream. The client will not receive any message events at all
  if the user is not subscribed to `"Denmark"`.

  Newly created bot users are not usually subscribed to any
  streams, so bots using this API need to be
  [subscribed](/api/subscribe) to any streams whose messages
  you'd like them to process using this endpoint.

  See the `all_public_streams` parameter for how to process all
  public stream messages in an organization.

  Defaults to `[]`.

  **Changes**: In Zulip 7.0 (feature level 177), narrows gained support
  for three new filters related to direct messages: `is:dm`, `dm` and
  `dm-including`; replacing and deprecating `is:private`, `pm-with` and
  `group-pm-with` respectively.
  */
  narrow?: string
}
export type RegisterQueueResponse = (JsonSuccessBase & SuccessDescription & ({
  queue_id?: string
  last_event_id?: number
  zulip_feature_level?: number
  zulip_version?: string
  zulip_merge_base?: string
  alert_words?: string[]
  custom_profile_fields?: CustomProfileField[]
  custom_profile_field_types?: {
  }
  realm_date_created?: number
  demo_organization_scheduled_deletion_date?: number
  drafts?: Draft[]
  hotspots?: Hotspot[]
  max_message_id?: number
  max_stream_name_length?: number
  max_stream_description_length?: number
  max_topic_length?: number
  max_message_length?: number
  server_presence_ping_interval_seconds?: number
  server_presence_offline_threshold_seconds?: number
  scheduled_messages?: ScheduledMessage[]
  muted_topics?: (string | number)[][]
  muted_users?: {
    /** The ID of the muted user. */
    id?: number
    /** An integer UNIX timestamp representing when the user was muted. */
    timestamp?: number
  }[]
  presences?: {
  }
  server_timestamp?: unknown
  realm_domains?: RealmDomain[]
  realm_emoji?: ({
  } | number[])
  realm_linkifiers?: {
    /** The [Python regular expression](https://docs.python.org/3/howto/regex.html)
    pattern which represents the pattern that should be linkified on matching. */
    pattern?: string
    /** The [RFC 6570](https://www.rfc-editor.org/rfc/rfc6570.html) compliant URL
    template with which the pattern matching string should be linkified.

    **Changes**: New in Zulip 7.0 (feature level 176). This replaced `url_format`,
    which contained a URL format string. */
    url_template?: string
    /** The ID of the linkifier. */
    id?: number
  }[]
  realm_filters?: (number | string)[][]
  realm_playgrounds?: RealmPlayground[]
  realm_user_groups?: UserGroup[]
  realm_bots?: Bot[]
  realm_embedded_bots?: {
    /** The name of the bot. */
    name?: string
    config?: Config
  }[]
  realm_incoming_webhook_bots?: {
    /** The name of the bot. */
    name?: string
    config?: Config
  }[]
  recent_private_conversations?: {
    /** The highest message ID of the conversation, intended to support sorting
    the conversations by recency. */
    max_message_id?: number
    /** The list of users other than the current user in the direct message
    conversation. This will be an empty list for direct messages sent to
    oneself. */
    user_ids?: number[]
  }[]
  subscriptions?: Subscriptions[]
  unsubscribed?: Subscriptions[]
  never_subscribed?: (BasicStreamBase & ({
    message_retention_days?: unknown
    first_message_id?: unknown
    stream_weekly_traffic?: number
    subscribers?: number[]
  }))[]
  unread_msgs?: {
    /** The total number of unread messages to display; this includes one-on-one
    and group direct messages, as well as all messages to unmuted topics
    on unmuted streams. */
    count?: number
    /** An array of dictionaries where each entry contains details
    of unread direct messages with a specific user. */
    pms?: {
      /** The user ID of the other participant in this non-group direct
      message conversation. Will be your own user ID for messages
      that you sent to only yourself. */
      other_user_id?: number
      /** Old name for `other_user_id`. Clients should access this
      field in Zulip server versions that do not yet support
      `other_user_id`.

      **Changes**: Deprecated in Zulip 5.0 (feature level 119).
      We expect to provide a next version of the full `unread_msgs`
      API before removing this legacy name. */
      sender_id?: number
      /** The message IDs of the recent unread direct messages sent
      by the other user. */
      message_ids?: number[]
    }[]
    /** An array of dictionaries where each dictionary contains
    details of all unread messages of a single subscribed stream,
    including muted streams.

    **Changes**: Prior to Zulip 5.0 (feature level 90), the
    dictionaries included an additional `sender_ids` key listing
    the set of IDs of users who had sent the unread messages. */
    streams?: {
      /** The topic under which the message was sent. */
      topic?: string
      /** The ID of the stream to which the message was sent. */
      stream_id?: number
      /** The message IDs of the recent unread messages sent in this stream. */
      unread_message_ids?: number[]
    }[]
    /** An array of dictionaries where each entry contains details
    of unread group direct messages with a specific group of users. */
    huddles?: {
      /** A string containing the IDs of all users in the group
      direct message conversation separated by commas; for
      example: `"1,2,3"`. */
      user_ids_string?: string
      /** The message IDs of the recent unread messages which have been sent in
      this group. */
      message_ids?: number[]
    }[]
    /** Array containing the IDs of all messages in which the user has been mentioned.
    For muted streams, wildcard mentions will not be considered for this array. */
    mentions?: number[]
    /** Whether this data set was truncated because the user has too many
    unread messages. When truncation occurs, only the most recent
    `MAX_UNREAD_MESSAGES` (currently 50000) messages will be considered
    when forming this response. When `true`, we recommend that clients
    display a warning, as they are likely to produce erroneous results
    until reloaded with the user having fewer than `MAX_UNREAD_MESSAGES`
    unread messages.

    **Changes**: New in Zulip 4.0 (feature level 44). */
    old_unreads_missing?: boolean
  }
  starred_messages?: number[]
  streams?: BasicStream[]
  realm_default_streams?: DefaultStream[]
  realm_default_stream_groups?: DefaultStreamGroup[]
  stop_words?: string[]
  user_status?: {
  }
  user_settings?: {
    /** Whether time should be [displayed in 24-hour notation](/help/change-the-time-format). */
    twenty_four_hour_time?: boolean
    /** This setting has no effect at present. It is reserved for use in controlling
    the default font size in Zulip. */
    dense_mode?: boolean
    /** Whether or not to mark messages as read when the user scrolls through their
    feed.

    - 1 - Always
    - 2 - Only in conversation views
    - 3 - Never

    **Changes**: New in Zulip 7.0 (feature level 175). Previously, there was no
    way for the user to configure this behavior on the web, and the Zulip web and
    desktop apps behaved like the "Always" setting when marking messages as read. */
    web_mark_read_on_scroll_policy?: number
    /** Whether clients should display the [number of starred
    messages](/help/star-a-message#display-the-number-of-starred-messages). */
    starred_message_counts?: boolean
    /** Whether to use the [maximum available screen width](/help/enable-full-width-display)
    for the web app's center panel (message feed, recent conversations) on wide screens. */
    fluid_layout_width?: boolean
    /** This setting is reserved for use to control variations in Zulip's design
    to help visually impaired users. */
    high_contrast_mode?: boolean
    /** Controls which [color theme](/help/dark-theme) to use.

    - 1 - Automatic
    - 2 - Dark theme
    - 3 - Light theme

    Automatic detection is implementing using the standard `prefers-color-scheme`
    media query. */
    color_scheme?: number
    /** Whether to [translate emoticons to emoji](/help/configure-emoticon-translations)
    in messages the user sends. */
    translate_emoticons?: boolean
    /** Whether to display the names of reacting users on a message.

    When enabled, clients should display the names of reacting
    users, rather than a count, for messages with few total
    reactions. The ideal cutoff may depend on the space
    available for displaying reactions; the official web
    application displays names when 3 or fewer total reactions
    are present with this setting enabled.

    **Changes**: New in Zulip 6.0 (feature level 125). */
    display_emoji_reaction_users?: boolean
    /** What [default language](/help/change-your-language) to use for the account.

    This controls both the Zulip UI as well as email notifications sent to the user.

    The value needs to be a standard language code that the Zulip server has
    translation data for; for example, `"en"` for English or `"de"` for German. */
    default_language?: string
    /** The [default view](/help/configure-default-view) used when opening a new
    Zulip web app window or hitting the `Esc` keyboard shortcut repeatedly.

    - "recent_topics" - Recent conversations view
    - "all_messages" - All messages view */
    default_view?: string
    /** Whether the escape key navigates to the
    [configured default view](/help/configure-default-view).

    **Changes**: New in Zulip 5.0 (feature level 107). */
    escape_navigates_to_default_view?: boolean
    /** Whether the users list on left sidebar in narrow windows.

    This feature is not heavily used and is likely to be reworked. */
    left_side_userlist?: boolean
    /** The user's configured [emoji set](/help/emoji-and-emoticons#use-emoticons),
    used to display emoji to the user everywhere they appear in the UI.

    - "google" - Google modern
    - "google-blob" - Google classic
    - "twitter" - Twitter
    - "text" - Plain text */
    emojiset?: string
    /** Whether to [demote inactive streams](/help/manage-inactive-streams) in the left sidebar.

    - 1 - Automatic
    - 2 - Always
    - 3 - Never */
    demote_inactive_streams?: number
    /** The style selected by the user for the right sidebar user list.

    - 1 - Compact
    - 2 - With status
    - 3 - With avatar and status

    **Changes**: New in Zulip 6.0 (feature level 141). */
    user_list_style?: number
    /** The IANA identifier of the user's [configured time zone](/help/change-your-timezone). */
    timezone?: string
    /** Whether the user setting for [sending on pressing Enter](/help/mastering-the-compose-box#toggle-between-ctrl-enter-and-enter-to-send-a-message)
    in the compose box is enabled. */
    enter_sends?: boolean
    /** A boolean parameter to control whether synchronizing drafts is enabled for
    the user. When synchronization is disabled, all drafts stored in the server
    will be automatically deleted from the server.

    This does not do anything (like sending events) to delete local copies of
    drafts stored in clients. */
    enable_drafts_synchronization?: boolean
    /** Enable visual desktop notifications for stream messages. */
    enable_stream_desktop_notifications?: boolean
    /** Enable email notifications for stream messages. */
    enable_stream_email_notifications?: boolean
    /** Enable mobile notifications for stream messages. */
    enable_stream_push_notifications?: boolean
    /** Enable audible desktop notifications for stream messages. */
    enable_stream_audible_notifications?: boolean
    /** Notification sound name. */
    notification_sound?: string
    /** Enable visual desktop notifications for direct messages and @-mentions. */
    enable_desktop_notifications?: boolean
    /** Enable audible desktop notifications for direct messages and
    @-mentions. */
    enable_sounds?: boolean
    /** Enable visual desktop notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_desktop_notifications?: boolean
    /** Enable email notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_email_notifications?: boolean
    /** Enable push notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_push_notifications?: boolean
    /** Enable audible desktop notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_audible_notifications?: boolean
    /** The duration (in seconds) for which the server should wait to batch
    email notifications before sending them. */
    email_notifications_batching_period_seconds?: number
    /** Enable email notifications for direct messages and @-mentions received
    when the user is offline. */
    enable_offline_email_notifications?: boolean
    /** Enable mobile notification for direct messages and @-mentions received
    when the user is offline. */
    enable_offline_push_notifications?: boolean
    /** Enable mobile notification for direct messages and @-mentions received
    when the user is online. */
    enable_online_push_notifications?: boolean
    /** Enable digest emails when the user is away. */
    enable_digest_emails?: boolean
    /** Enable marketing emails. Has no function outside Zulip Cloud. */
    enable_marketing_emails?: boolean
    /** Enable email notifications for new logins to account. */
    enable_login_emails?: boolean
    /** Include the message's content in email notifications for new messages. */
    message_content_in_email_notifications?: boolean
    /** Include content of direct messages in desktop notifications. */
    pm_content_in_desktop_notifications?: boolean
    /** Whether wildcard mentions (E.g. @**all**) should send notifications
    like a personal mention. */
    wildcard_mentions_notify?: boolean
    /** Whether wildcard mentions (e.g., @**all**) in messages sent to followed topics
    should send notifications like a personal mention.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_wildcard_mentions_notify?: boolean
    /** Unread count badge (appears in desktop sidebar and browser tab)

    - 1 - All unreads
    - 2 - Direct messages and mentions
    - 3 - None */
    desktop_icon_count_display?: number
    /** Whether to [include organization name in subject of message notification
    emails](/help/email-notifications#include-organization-name-in-subject-line).

    - 1 - Automatic
    - 2 - Always
    - 3 - Never

    **Changes**: New in Zulip 7.0 (feature level 168), replacing the
    previous `realm_name_in_notifications` boolean;
    `true` corresponded to `Always`, and `false` to `Never`. */
    realm_name_in_email_notifications_policy?: number
    /** Display the presence status to other users when online. */
    presence_enabled?: boolean
    /** Array containing the names of the notification sound options
    supported by this Zulip server. Only relevant to support UI
    for configuring notification sounds. */
    available_notification_sounds?: string[]
    /** Array of dictionaries where each dictionary describes an emoji set
    supported by this version of the Zulip server.

    Only relevant to clients with configuration UI for choosing an emoji set;
    the currently selected emoji set is available in the `emojiset` key.

    See [PATCH /settings](/api/update-settings) for details on
    the meaning of this setting. */
    emojiset_choices?: {
      /** The key or the name of the emoji set which will be the value
      of `emojiset` if this emoji set is chosen. */
      key?: string
      /** The text describing the emoji set. */
      text?: string
    }[]
    /** Whether the user has chosen to send [typing
    notifications](/help/typing-notifications)
    when composing direct messages. The client should send typing
    notifications for direct messages if and only if this setting is enabled.

    **Changes**: New in Zulip 5.0 (feature level 105). */
    send_private_typing_notifications?: boolean
    /** Whether the user has chosen to send [typing
    notifications](/help/typing-notifications)
    when composing stream messages. The client should send typing
    notifications for stream messages if and only if this setting is enabled.

    **Changes**: New in Zulip 5.0 (feature level 105). */
    send_stream_typing_notifications?: boolean
    /** Whether other users are allowed to see whether you've
    read messages.

    **Changes**: New in Zulip 5.0 (feature level 105). */
    send_read_receipts?: boolean
    email_address_visibility?: EmailAddressVisibility
  }
  user_topics?: {
    /** The ID of the stream to which the topic belongs. */
    stream_id?: number
    /** The name of the topic. */
    topic_name?: string
    /** An integer UNIX timestamp representing when the user-topic
    relationship was changed. */
    last_updated?: number
    /** An integer indicating the user's visibility configuration for
    the topic.

    - 1 = Muted. Used to record [muted topics](/help/mute-a-topic).
    - 2 = Unmuted. Used to record [unmuted topics](/help/mute-a-topic).

    **Changes**: In Zulip 7.0 (feature level 170), added unmuted as
    a visibility policy option. */
    visibility_policy?: number
  }[]
  has_zoom_token?: boolean
  giphy_api_key?: string
  enable_desktop_notifications?: boolean
  enable_digest_emails?: boolean
  enable_login_emails?: boolean
  enable_marketing_emails?: boolean
  email_notifications_batching_period_seconds?: number
  enable_offline_email_notifications?: boolean
  enable_offline_push_notifications?: boolean
  enable_online_push_notifications?: boolean
  enable_sounds?: boolean
  enable_stream_desktop_notifications?: boolean
  enable_stream_email_notifications?: boolean
  enable_stream_push_notifications?: boolean
  enable_stream_audible_notifications?: boolean
  wildcard_mentions_notify?: boolean
  message_content_in_email_notifications?: boolean
  notification_sound?: string
  pm_content_in_desktop_notifications?: boolean
  desktop_icon_count_display?: number
  realm_name_in_email_notifications_policy?: number
  presence_enabled?: boolean
  available_notification_sounds?: string[]
  color_scheme?: number
  default_language?: string
  demote_inactive_streams?: number
  dense_mode?: boolean
  emojiset?: string
  enable_drafts_synchronization?: boolean
  fluid_layout_width?: boolean
  default_view?: string
  high_contrast_mode?: boolean
  left_side_userlist?: boolean
  starred_message_counts?: boolean
  timezone?: string
  translate_emoticons?: boolean
  twenty_four_hour_time?: boolean
  enter_sends?: boolean
  emojiset_choices?: {
    /** The key or the name of the emoji set which will be the value
    of `emojiset` if this emoji set is chosen. */
    key?: string
    /** The text describing the emoji set. */
    text?: string
  }[]
  realm_add_custom_emoji_policy?: number
  realm_allow_edit_history?: boolean
  realm_delete_own_message_policy?: number
  realm_bot_creation_policy?: number
  realm_create_public_stream_policy?: number
  realm_create_private_stream_policy?: number
  realm_create_web_public_stream_policy?: number
  realm_invite_to_stream_policy?: number
  realm_wildcard_mention_policy?: number
  realm_default_language?: string
  realm_description?: string
  realm_digest_emails_enabled?: boolean
  realm_disallow_disposable_email_addresses?: boolean
  realm_email_changes_disabled?: boolean
  realm_invite_required?: boolean
  realm_invite_to_realm_policy?: number
  realm_move_messages_between_streams_policy?: number
  realm_inline_image_preview?: boolean
  realm_inline_url_embed_preview?: boolean
  realm_mandatory_topics?: boolean
  realm_message_retention_days?: number
  realm_name?: string
  realm_name_changes_disabled?: boolean
  realm_avatar_changes_disabled?: boolean
  realm_emails_restricted_to_domains?: boolean
  realm_send_welcome_emails?: boolean
  realm_message_content_allowed_in_email_notifications?: boolean
  realm_enable_spectator_access?: boolean
  realm_want_advertise_in_communities_directory?: boolean
  realm_video_chat_provider?: number
  realm_giphy_rating?: number
  realm_waiting_period_threshold?: number
  realm_digest_weekday?: number
  realm_private_message_policy?: number
  realm_user_group_edit_policy?: number
  realm_default_code_block_language?: string
  realm_message_content_delete_limit_seconds?: number
  realm_authentication_methods?: {
  }
  realm_allow_message_editing?: boolean
  realm_edit_topic_policy?: number
  realm_message_content_edit_limit_seconds?: number
  realm_move_messages_within_stream_limit_seconds?: number
  realm_move_messages_between_streams_limit_seconds?: number
  realm_enable_read_receipts?: boolean
  realm_icon_url?: string
  realm_icon_source?: string
  max_icon_file_size_mib?: number
  realm_logo_url?: string
  realm_logo_source?: string
  realm_night_logo_url?: string
  realm_night_logo_source?: string
  max_logo_file_size_mib?: number
  realm_bot_domain?: string
  realm_uri?: string
  realm_available_video_chat_providers?: {
  }
  realm_presence_disabled?: boolean
  settings_send_digest_emails?: boolean
  realm_is_zephyr_mirror_realm?: boolean
  realm_email_auth_enabled?: boolean
  realm_password_auth_enabled?: boolean
  realm_push_notifications_enabled?: boolean
  realm_upload_quota_mib?: number
  realm_org_type?: number
  realm_plan_type?: number
  zulip_plan_is_not_limited?: boolean
  upgrade_text_for_wide_organization_logo?: string
  realm_default_external_accounts?: {
  }
  jitsi_server_url?: string
  development_environment?: boolean
  server_generation?: number
  password_min_length?: number
  password_min_guesses?: number
  giphy_rating_options?: {
  }
  max_file_upload_size_mib?: number
  max_avatar_file_size_mib?: number
  server_inline_image_preview?: boolean
  server_inline_url_embed_preview?: boolean
  server_avatar_changes_disabled?: boolean
  server_name_changes_disabled?: boolean
  server_needs_upgrade?: boolean
  server_web_public_streams_enabled?: boolean
  server_emoji_data_url?: string
  event_queue_longpoll_timeout_seconds?: number
  realm_notifications_stream_id?: number
  realm_signup_notifications_stream_id?: number
  realm_user_settings_defaults?: {
    /** Whether time should be [displayed in 24-hour notation](/help/change-the-time-format).

    **Changes**: New in Zulip 5.0 (feature level 99).
    This value was previously available as
    `realm_default_twenty_four_hour_time` in
    the top-level response object (only when `realm` was
    present in `fetch_event_types`). */
    twenty_four_hour_time?: boolean
    /** This setting has no effect at present. It is reserved for use in
    controlling the default font size in Zulip. */
    dense_mode?: boolean
    /** Whether or not to mark messages as read when the user scrolls through their
    feed.

    - 1 - Always
    - 2 - Only in conversation views
    - 3 - Never

    **Changes**: New in Zulip 7.0 (feature level 175). Previously, there was no
    way for the user to configure this behavior on the web, and the Zulip web and
    desktop apps behaved like the "Always" setting when marking messages as read. */
    web_mark_read_on_scroll_policy?: number
    /** Whether clients should display the [number of starred
    messages](/help/star-a-message#display-the-number-of-starred-messages). */
    starred_message_counts?: boolean
    /** Whether to use the [maximum available screen width](/help/enable-full-width-display)
    for the web app's center panel (message feed, recent conversations) on wide screens. */
    fluid_layout_width?: boolean
    /** This setting is reserved for use to control variations in Zulip's design
    to help visually impaired users. */
    high_contrast_mode?: boolean
    /** Controls which [color theme](/help/dark-theme) to use.

    - 1 - Automatic
    - 2 - Dark theme
    - 3 - Light theme

    Automatic detection is implementing using the standard `prefers-color-scheme`
    media query. */
    color_scheme?: number
    /** Whether to [translate emoticons to emoji](/help/configure-emoticon-translations)
    in messages the user sends. */
    translate_emoticons?: boolean
    /** Whether to display the names of reacting users on a message.

    When enabled, clients should display the names of reacting
    users, rather than a count, for messages with few total
    reactions. The ideal cutoff may depend on the space
    available for displaying reactions; the official web
    application displays names when 3 or fewer total reactions
    are present with this setting enabled.

    **Changes**: New in Zulip 6.0 (feature level 125). */
    display_emoji_reaction_users?: boolean
    /** What [default language](/help/change-your-language) to use for the account.

    This controls both the Zulip UI as well as email notifications sent to the user.

    The value needs to be a standard language code that the Zulip server has
    translation data for; for example, `"en"` for English or `"de"` for German. */
    default_language?: string
    /** The [default view](/help/configure-default-view) used when opening a new
    Zulip web app window or hitting the `Esc` keyboard shortcut repeatedly.

    - "recent_topics" - Recent conversations view
    - "all_messages" - All messages view */
    default_view?: string
    /** Whether the escape key navigates to the
    [configured default view](/help/configure-default-view).

    **Changes**: New in Zulip 5.0 (feature level 107). */
    escape_navigates_to_default_view?: boolean
    /** Whether the users list on left sidebar in narrow windows.

    This feature is not heavily used and is likely to be reworked. */
    left_side_userlist?: boolean
    /** The user's configured [emoji set](/help/emoji-and-emoticons#use-emoticons),
    used to display emoji to the user everywhere they appear in the UI.

    - "google" - Google modern
    - "google-blob" - Google classic
    - "twitter" - Twitter
    - "text" - Plain text */
    emojiset?: string
    /** Whether to [demote inactive streams](/help/manage-inactive-streams) in the left sidebar.

    - 1 - Automatic
    - 2 - Always
    - 3 - Never */
    demote_inactive_streams?: number
    /** The style selected by the user for the right sidebar user list.

    - 1 - Compact
    - 2 - With status
    - 3 - With avatar and status

    **Changes**: New in Zulip 6.0 (feature level 141). */
    user_list_style?: number
    /** Enable visual desktop notifications for stream messages. */
    enable_stream_desktop_notifications?: boolean
    /** Enable email notifications for stream messages. */
    enable_stream_email_notifications?: boolean
    /** Enable mobile notifications for stream messages. */
    enable_stream_push_notifications?: boolean
    /** Enable audible desktop notifications for stream messages. */
    enable_stream_audible_notifications?: boolean
    /** Notification sound name. */
    notification_sound?: string
    /** Enable visual desktop notifications for direct messages and @-mentions. */
    enable_desktop_notifications?: boolean
    /** Enable audible desktop notifications for direct messages and
    @-mentions. */
    enable_sounds?: boolean
    /** Enable email notifications for direct messages and @-mentions received
    when the user is offline. */
    enable_offline_email_notifications?: boolean
    /** Enable mobile notification for direct messages and @-mentions received
    when the user is offline. */
    enable_offline_push_notifications?: boolean
    /** Enable mobile notification for direct messages and @-mentions received
    when the user is online. */
    enable_online_push_notifications?: boolean
    /** Enable visual desktop notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_desktop_notifications?: boolean
    /** Enable email notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_email_notifications?: boolean
    /** Enable push notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_push_notifications?: boolean
    /** Enable audible desktop notifications for messages sent to followed topics.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_audible_notifications?: boolean
    /** Enable digest emails when the user is away. */
    enable_digest_emails?: boolean
    /** Enable marketing emails. Has no function outside Zulip Cloud. */
    enable_marketing_emails?: boolean
    /** Enable email notifications for new logins to account. */
    enable_login_emails?: boolean
    /** Include the message's content in email notifications for new messages. */
    message_content_in_email_notifications?: boolean
    /** Include content of direct messages in desktop notifications. */
    pm_content_in_desktop_notifications?: boolean
    /** Whether wildcard mentions (E.g. @**all**) should send notifications
    like a personal mention. */
    wildcard_mentions_notify?: boolean
    /** Whether wildcard mentions (e.g., @**all**) in messages sent to followed topics
    should send notifications like a personal mention.

    **Changes**: New in Zulip 8.0 (feature level 189). */
    enable_followed_topic_wildcard_mentions_notify?: boolean
    /** Unread count badge (appears in desktop sidebar and browser tab)

    - 1 - All unreads
    - 2 - Direct messages and mentions
    - 3 - None */
    desktop_icon_count_display?: number
    /** Whether to [include organization name in subject of message notification
    emails](/help/email-notifications#include-organization-name-in-subject-line).

    - 1 - Automatic
    - 2 - Always
    - 3 - Never

    **Changes**: New in Zulip 7.0 (feature level 168), replacing the
    previous `realm_name_in_notifications` boolean;
    `true` corresponded to `Always`, and `false` to `Never`. */
    realm_name_in_email_notifications_policy?: number
    /** Display the presence status to other users when online. */
    presence_enabled?: boolean
    /** Whether the user setting for [sending on pressing Enter](/help/mastering-the-compose-box#toggle-between-ctrl-enter-and-enter-to-send-a-message)
    in the compose box is enabled. */
    enter_sends?: boolean
    /** A boolean parameter to control whether synchronizing drafts is enabled for
    the user. When synchronization is disabled, all drafts stored in the server
    will be automatically deleted from the server.

    This does not do anything (like sending events) to delete local copies of
    drafts stored in clients. */
    enable_drafts_synchronization?: boolean
    /** The duration (in seconds) for which the server should wait to batch
    email notifications before sending them. */
    email_notifications_batching_period_seconds?: number
    /** Array containing the names of the notification sound options
    supported by this Zulip server. Only relevant to support UI
    for configuring notification sounds. */
    available_notification_sounds?: string[]
    /** Array of dictionaries where each dictionary describes an emoji set
    supported by this version of the Zulip server.

    Only relevant to clients with configuration UI for choosing an emoji set;
    the currently selected emoji set is available in the `emojiset` key.

    See [PATCH /settings](/api/update-settings) for details on
    the meaning of this setting. */
    emojiset_choices?: {
      /** The key or the name of the emoji set which will be the value
      of `emojiset` if this emoji set is chosen. */
      key?: string
      /** The text describing the emoji set. */
      text?: string
    }[]
    /** Whether [typing notifications](/help/typing-notifications) be sent when composing
    direct messages.

    **Changes**: New in Zulip 5.0 (feature level 105). */
    send_private_typing_notifications?: boolean
    /** Whether [typing notifications](/help/typing-notifications) be sent when composing
    stream messages.

    **Changes**: New in Zulip 5.0 (feature level 105). */
    send_stream_typing_notifications?: boolean
    /** Whether other users are allowed to see whether you've
    read messages.

    **Changes**: New in Zulip 5.0 (feature level 105). */
    send_read_receipts?: boolean
    email_address_visibility?: EmailAddressVisibility
  }
  realm_users?: User[]
  realm_non_active_users?: User[]
  avatar_source?: string
  avatar_url_medium?: string
  avatar_url?: string
  can_create_streams?: boolean
  can_create_public_streams?: boolean
  can_create_private_streams?: boolean
  can_create_web_public_streams?: boolean
  can_subscribe_other_users?: boolean
  can_invite_others_to_realm?: boolean
  is_admin?: boolean
  is_owner?: boolean
  is_billing_admin?: boolean
  is_moderator?: boolean
  is_guest?: boolean
  user_id?: number
  email?: string
  delivery_email?: string
  full_name?: string
  cross_realm_bots?: (UserBase & ({
    is_system_bot?: boolean
    bot_type?: unknown
    bot_owner_id?: unknown
    avatar_url?: unknown
  }))[]
}))
export type GetServerSettingsResponse = (JsonSuccessBase & ({
  authentication_methods?: {
    /** Whether the user can authenticate using password. */
    password?: boolean
    /** Whether the user can authenticate using development API key. */
    dev?: boolean
    /** Whether the user can authenticate using email. */
    email?: boolean
    /** Whether the user can authenticate using LDAP. */
    ldap?: boolean
    /** Whether the user can authenticate using REMOTE_USER. */
    remoteuser?: boolean
    /** Whether the user can authenticate using their GitHub account. */
    github?: boolean
    /** Whether the user can authenticate using their Azure Active Directory account. */
    azuread?: boolean
    /** Whether the user can authenticate using their GitLab account.

    **Changes**: New in Zulip 3.0 (feature level 1). */
    gitlab?: boolean
    /** Whether the user can authenticate using their Apple account. */
    apple?: boolean
    /** Whether the user can authenticate using their Google account. */
    google?: boolean
    /** Whether the user can authenticate using SAML. */
    saml?: boolean
    /** Whether the user can authenticate using OpenID Connect. */
    'openid connect'?: boolean
  }
  external_authentication_methods?: {
    /** A unique, table, machine-readable name for the authentication method,
    intended to be used by clients with special behavior for specific
    authentication methods to correctly identify the method. */
    name?: string
    /** Display name of the authentication method, to be used in all buttons
    for the authentication method. */
    display_name?: string
    /** URL for an image to be displayed as an icon in all buttons for
    the external authentication method.

    When `null`, no icon should be displayed. */
    display_icon?: string
    /** URL to be used to initiate authentication using this method. */
    login_url?: string
    /** URL to be used to initiate account registration using this method. */
    signup_url?: string
  }[]
  zulip_feature_level?: number
  zulip_version?: string
  zulip_merge_base?: string
  push_notifications_enabled?: boolean
  is_incompatible?: boolean
  email_auth_enabled?: boolean
  require_email_format_usernames?: boolean
  realm_uri?: string
  realm_name?: string
  realm_icon?: string
  realm_description?: string
  realm_web_public_access_enabled?: boolean
}))
export interface UpdateSettingsQuery {
  /** A new display name for the user.
  */
  full_name?: string
  /** Asks the server to initiate a confirmation sequence to change the user's email
  address to the indicated value. The user will need to demonstrate control of the
  new email address by clicking a confirmation link sent to that address.
  */
  email?: string
  /** The user's old Zulip password (or LDAP password, if LDAP authentication is in use).

  Required only when sending the `new_password` parameter.
  */
  old_password?: string
  /** The user's new Zulip password (or LDAP password, if LDAP authentication is in use).

  The `old_password` parameter must be included in the request.
  */
  new_password?: string
  /** Whether time should be [displayed in 24-hour notation](/help/change-the-time-format).

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  twenty_four_hour_time?: boolean
  /** This setting has no effect at present. It is reserved for use in controlling
  the default font size in Zulip.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  dense_mode?: boolean
  /** Whether or not to mark messages as read when the user scrolls through their
  feed.

  - 1 - Always
  - 2 - Only in conversation views
  - 3 - Never

  **Changes**: New in Zulip 7.0 (feature level 175). Previously, there was no
  way for the user to configure this behavior on the web, and the Zulip web and
  desktop apps behaved like the "Always" setting when marking messages as read.
  */
  web_mark_read_on_scroll_policy?: number
  /** Whether clients should display the [number of starred
  messages](/help/star-a-message#display-the-number-of-starred-messages).

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  starred_message_counts?: boolean
  /** Whether to use the [maximum available screen width](/help/enable-full-width-display)
  for the web app's center panel (message feed, recent conversations) on wide screens.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  fluid_layout_width?: boolean
  /** This setting is reserved for use to control variations in Zulip's design
  to help visually impaired users.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  high_contrast_mode?: boolean
  /** Controls which [color theme](/help/dark-theme) to use.

  - 1 - Automatic
  - 2 - Dark theme
  - 3 - Light theme

  Automatic detection is implementing using the standard `prefers-color-scheme`
  media query.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  color_scheme?: number
  /** A boolean parameter to control whether synchronizing drafts is enabled for
  the user. When synchronization is disabled, all drafts stored in the server
  will be automatically deleted from the server.

  This does not do anything (like sending events) to delete local copies of
  drafts stored in clients.

  **Changes**: New in Zulip 5.0 (feature level 87).
  */
  enable_drafts_synchronization?: boolean
  /** Whether to [translate emoticons to emoji](/help/configure-emoticon-translations)
  in messages the user sends.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  translate_emoticons?: boolean
  /** Whether to display the names of reacting users on a message.

  When enabled, clients should display the names of reacting users, rather than
  a count, for messages with few total reactions. The ideal cutoff may depend on
  the space available for displaying reactions; the official web application
  displays names when 3 or fewer total reactions are present with this setting
  enabled.

  **Changes**: New in Zulip 6.0 (feature level 125).
  */
  display_emoji_reaction_users?: boolean
  /** What [default language](/help/change-your-language) to use for the account.

  This controls both the Zulip UI as well as email notifications sent to the user.

  The value needs to be a standard language code that the Zulip server has
  translation data for; for example, `"en"` for English or `"de"` for German.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.

  Unnecessary JSON-encoding of this parameter was removed in Zulip 4.0 (feature level 63).
  */
  default_language?: string
  /** The [default view](/help/configure-default-view) used when opening a new
  Zulip web app window or hitting the `Esc` keyboard shortcut repeatedly.

  - "recent_topics" - Recent conversations view
  - "all_messages" - All messages view

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.

  Unnecessary JSON-encoding of this parameter was removed in Zulip 4.0 (feature level 64).
  */
  default_view?: string
  /** Whether the escape key navigates to the
  [configured default view](/help/configure-default-view).

  **Changes**: New in Zulip 5.0 (feature level 107).
  */
  escape_navigates_to_default_view?: boolean
  /** Whether the users list on left sidebar in narrow windows.

  This feature is not heavily used and is likely to be reworked.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  left_side_userlist?: boolean
  /** The user's configured [emoji set](/help/emoji-and-emoticons#use-emoticons),
  used to display emoji to the user everywhere they appear in the UI.

  - "google" - Google modern
  - "google-blob" - Google classic
  - "twitter" - Twitter
  - "text" - Plain text

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.

  Unnecessary JSON-encoding of this parameter was removed in Zulip 4.0 (feature level 64).
  */
  emojiset?: string
  /** Whether to [demote inactive streams](/help/manage-inactive-streams) in the left sidebar.

  - 1 - Automatic
  - 2 - Always
  - 3 - Never

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.
  */
  demote_inactive_streams?: number
  /** The style selected by the user for the right sidebar user list.

  - 1 - Compact
  - 2 - With status
  - 3 - With avatar and status

  **Changes**: New in Zulip 6.0 (feature level 141).
  */
  user_list_style?: number
  /** The IANA identifier of the user's [configured time zone](/help/change-your-timezone).

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/display` endpoint.

  Unnecessary JSON-encoding of this parameter was removed in Zulip 4.0 (feature level 64).
  */
  timezone?: string
  /** Enable visual desktop notifications for stream messages.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_stream_desktop_notifications?: boolean
  /** Enable email notifications for stream messages.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_stream_email_notifications?: boolean
  /** Enable mobile notifications for stream messages.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_stream_push_notifications?: boolean
  /** Enable audible desktop notifications for stream messages.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_stream_audible_notifications?: boolean
  /** Notification sound name.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.

  Unnecessary JSON-encoding of this parameter was removed in Zulip 4.0 (feature level 63).
  */
  notification_sound?: string
  /** Enable visual desktop notifications for direct messages and @-mentions.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_desktop_notifications?: boolean
  /** Enable audible desktop notifications for direct messages and
  @-mentions.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_sounds?: boolean
  /** The duration (in seconds) for which the server should wait to batch
  email notifications before sending them.

  **Changes**: New in Zulip 5.0 (feature level 82)
  */
  email_notifications_batching_period_seconds?: number
  /** Enable email notifications for direct messages and @-mentions received
  when the user is offline.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_offline_email_notifications?: boolean
  /** Enable mobile notification for direct messages and @-mentions received
  when the user is offline.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_offline_push_notifications?: boolean
  /** Enable mobile notification for direct messages and @-mentions received
  when the user is online.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_online_push_notifications?: boolean
  /** Enable visual desktop notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_desktop_notifications?: boolean
  /** Enable email notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_email_notifications?: boolean
  /** Enable push notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_push_notifications?: boolean
  /** Enable audible desktop notifications for messages sent to followed topics.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_audible_notifications?: boolean
  /** Enable digest emails when the user is away.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_digest_emails?: boolean
  /** Enable marketing emails. Has no function outside Zulip Cloud.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_marketing_emails?: boolean
  /** Enable email notifications for new logins to account.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  enable_login_emails?: boolean
  /** Include the message's content in email notifications for new messages.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  message_content_in_email_notifications?: boolean
  /** Include content of direct messages in desktop notifications.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  pm_content_in_desktop_notifications?: boolean
  /** Whether wildcard mentions (E.g. @**all**) should send notifications
  like a personal mention.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  wildcard_mentions_notify?: boolean
  /** Whether wildcard mentions (e.g., @**all**) in messages sent to followed topics
  should send notifications like a personal mention.

  **Changes**: New in Zulip 8.0 (feature level 189).
  */
  enable_followed_topic_wildcard_mentions_notify?: boolean
  /** Unread count badge (appears in desktop sidebar and browser tab)

  - 1 - All unreads
  - 2 - Direct messages and mentions
  - 3 - None

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  desktop_icon_count_display?: number
  /** Whether to [include organization name in subject of message notification
  emails](/help/email-notifications#include-organization-name-in-subject-line).

  - 1 - Automatic
  - 2 - Always
  - 3 - Never

  **Changes**: New in Zulip 7.0 (feature level 168), replacing the
  previous `realm_name_in_notifications` boolean;
  `true` corresponded to `Always`, and `false` to `Never`.

  Before Zulip 5.0 (feature level 80), the previous `realm_name_in_notifications`
  setting was managed by the `PATCH /settings/notifications` endpoint.
  */
  realm_name_in_email_notifications_policy?: number
  /** Display the presence status to other users when online.

  **Changes**: Before Zulip 5.0 (feature level 80), this setting was managed by
  the `PATCH /settings/notifications` endpoint.
  */
  presence_enabled?: boolean
  /** Whether pressing Enter in the compose box sends a message
  (or saves a message edit).

  **Changes**: Before Zulip 5.0 (feature level 81), this setting was managed by
  the `POST /users/me/enter-sends` endpoint, with the same parameter format.
  */
  enter_sends?: boolean
  /** Whether [typing notifications](/help/typing-notifications) be sent when composing
  direct messages.

  **Changes**: New in Zulip 5.0 (feature level 105).
  */
  send_private_typing_notifications?: boolean
  /** Whether [typing notifications](/help/typing-notifications) be sent when composing
  stream messages.

  **Changes**: New in Zulip 5.0 (feature level 105).
  */
  send_stream_typing_notifications?: boolean
  /** Whether other users are allowed to see whether you've
  read messages.

  **Changes**: New in Zulip 5.0 (feature level 105).
  */
  send_read_receipts?: boolean
  /** The [policy][permission-level] this user has selected for [which other
  users][help-email-visibility] in this organization can see their real
  email address.

  - 1 = Everyone
  - 2 = Members only
  - 3 = Administrators only
  - 4 = Nobody
  - 5 = Moderators only

  **Changes**: New in Zulip 7.0 (feature level 163), replacing the
  realm-level setting.

  [permission-level]: /api/roles-and-permissions#permission-levels
  [help-email-visibility]: /help/configure-email-visibility
  */
  email_address_visibility?: number
}
export type GetSubscribersResponse = (JsonSuccessBase & SuccessDescription & ({
  subscribers?: number[]
}))
export interface GetStreamsQuery {
  /** Include all public streams.
  */
  include_public?: boolean
  /** Include all web-public streams.
  */
  include_web_public?: boolean
  /** Include all streams that the user is subscribed to.
  */
  include_subscribed?: boolean
  /** Include all active streams. The user must have administrative privileges
  to use this parameter.
  */
  include_all_active?: boolean
  /** Include all default streams for the user's realm.
  */
  include_default?: boolean
  /** If the user is a bot, include all streams that the bot's owner is
  subscribed to.
  */
  include_owner_subscribed?: boolean
}
export type GetStreamsResponse = (JsonSuccessBase & SuccessDescription & ({
  streams?: (BasicStreamBase & ({
    message_retention_days: unknown
    first_message_id: unknown
    stream_weekly_traffic: number
    is_default?: boolean
  }))[]
}))
export type GetStreamByIdResponse = (JsonSuccessBase & SuccessDescription & ({
  stream?: BasicStream
}))
export interface UpdateStreamQuery {
  /** The new [description](/help/change-the-stream-description) for
  the stream, in text/markdown format.

  Clients should use the `max_stream_description_length` returned
  by the [`POST /register`](/api/register-queue) endpoint to
  determine the maximum stream description length.

  **Changes**: Removed unnecessary JSON-encoding of this parameter in
  Zulip 4.0 (feature level 64).
  */
  description?: string
  /** The new name for the stream.

  Clients should use the `max_stream_name_length` returned by the
  [`POST /register`](/api/register-queue) endpoint to determine
  the maximum stream name length.

  **Changes**: Removed unnecessary JSON-encoding of this parameter in
  Zulip 4.0 (feature level 64).
  */
  new_name?: string
  /** Change whether the stream is a private stream.
  */
  is_private?: boolean
  /** Whether the stream is limited to announcements.

  **Changes**: Deprecated in Zulip 3.0 (feature level 1). Clients
  should use `stream_post_policy` instead.
  */
  is_announcement_only?: boolean
  /** Change whether the stream is a web-public stream.

  Note that creating web-public streams requires the
  `WEB_PUBLIC_STREAMS_ENABLED` [server setting][server-settings]
  to be enabled on the Zulip server in question, the organization
  to have enabled the `enable_spectator_access` realm setting, and
  the current use to have permission under the organization's
  `create_web_public_stream_policy` realm setting.

  [server-settings]: https://zulip.readthedocs.io/en/stable/production/settings.html

  **Changes**: New in Zulip 5.0 (feature level 98).
  */
  is_web_public?: boolean
  /** Whether the stream's message history should be available to
  newly subscribed members, or users can only access messages
  they actually received while subscribed to the stream.

  Corresponds to the [shared history](/help/stream-permissions)
  option in documentation.

  It's an error for this parameter to be false for a public or
  web-public stream and when is_private is false.

  **Changes**: Before Zulip 6.0 (feature level 136), `history_public_to_subscribers`
  was silently ignored unless the request also contained either `is_private` or
  `is_web_public`.
  */
  history_public_to_subscribers?: boolean
  /** Add or remove the stream as a [default stream][default-stream]
  for new users joining the organization.

  [default-stream]: /help/set-default-streams-for-new-users

  **Changes**: New in Zulip 8.0 (feature level 200). Previously, default stream status
  could only be changed using the [dedicated API endpoint](/api/add-default-stream).
  */
  is_default_stream?: boolean
  /** [Policy][permission-level] for which users can post messages to the stream.

  - 1 = Any user can post.
  - 2 = Only administrators can post.
  - 3 = Only [full members][calc-full-member] can post.
  - 4 = Only moderators can post.

  **Changes**: New in Zulip 3.0 (feature level 1), replacing the previous
  `is_announcement_only` boolean.

  [permission-level]: /api/roles-and-permissions#permission-levels
  [calc-full-member]: /api/roles-and-permissions#determining-if-a-user-is-a-full-member
  */
  stream_post_policy?: number
  /** Number of days that messages sent to this stream will be stored
  before being automatically deleted by the [message retention
  policy](/help/message-retention-policy). Two special string format
  values are supported:

  - `"realm_default"`: Return to the organization-level setting.
  - `"unlimited"`: Retain messages forever.

  **Changes**: Prior to Zulip 5.0 (feature level 91), retaining
  messages forever was encoded using `"forever"` instead of
  `"unlimited"`.

  New in Zulip 3.0 (feature level 17).
  */
  message_retention_days?: (string | number)
  /** ID of the [user group](/api/get-user-groups) whose members are
  allowed to unsubscribe others from the stream. Note that a user
  who is a member of the specified user group must also [have
  access](/help/stream-permissions) to the stream in order to
  unsubscribe others.

  This setting can currently only be set to user groups that are
  system groups, except for the system groups named
  `"role:internet"` and `"role:owners"`.

  **Changes**: Before Zulip 8.0 (feature level 197),
  the `can_remove_subscribers_group` setting
  was named `can_remove_subscribers_group_id`.

  New in Zulip 7.0 (feature level 161).
  */
  can_remove_subscribers_group?: number
}
export interface DeleteTopicQuery {
  /** The name of the topic to delete.
  */
  topic_name: string
}
export type DeleteTopicResponse = ((JsonSuccess & SuccessDescription) | (PartiallyCompleted))
export interface SetTypingStatusQuery {
  /** Type of the message being composed.

  **Changes**: In Zulip 7.0 (feature level 174), `"direct"` was added
  as the preferred way to indicate a direct message is being composed,
  becoming the default value for this parameter and deprecating the
  original `"private"`.

  New in Zulip 4.0 (feature level 58). Previously, typing notifications
  were only for direct messages.
  */
  type?: string
  /** Whether the user has started (`"start"`) or stopped (`"stop"`) typing.
  */
  op: string
  /** For `"direct"` type it is the user IDs of the recipients of the message
  being typed. Send a JSON-encoded list of user IDs. (Use a list even if
  there is only one recipient.)

  For `"stream"` type it is a single element list containing ID of stream in
  which the message is being typed.

  **Changes**: Support for typing notifications for stream messages
  is new in Zulip 4.0 (feature level 58). Previously, typing
  notifications were only for direct messages.

  Before Zulip 2.0.0, this parameter accepted only a JSON-encoded
  list of email addresses. Support for the email address-based format was
  removed in Zulip 3.0 (feature level 11).
  */
  to: string
  /** Topic to which message is being typed. Required for the `"stream"` type.
  Ignored in the case of `"direct"` type.

  **Changes**: New in Zulip 4.0 (feature level 58). Previously, typing
  notifications were only for direct messages.
  */
  topic?: string
}
export interface CreateUserGroupQuery {
  /** The name of the user group.
  */
  name: string
  /** The description of the user group.
  */
  description: string
  /** An array containing the user IDs of the initial members for the
  new user group.
  */
  members: string
  /** ID of the user group whose members are allowed to mention the new
  user group.

  This setting cannot be set to `"role:internet"` and `"role:owners"`
  system groups.

  **Changes**: Before Zulip 8.0 (feature level 198),
  the `can_mention_group` setting was named `can_mention_group_id`.

  New in Zulip 8.0 (feature level 191). Previously, groups
  could be mentioned if and only if they were not system groups.
  */
  can_mention_group?: number
}
export interface UpdateUserGroupMembersQuery {
  /** The list of user IDs to be removed from the user group.
  */
  delete?: string
  /** The list of user IDs to be added to the user group.
  */
  add?: string
}
export interface GetUserGroupMembersQuery {
  /** Whether to consider only the direct members of user group and not members
  of its subgroups. Default is `false`.
  */
  direct_member_only?: boolean
}
export type GetUserGroupMembersResponse = (JsonSuccessBase & SuccessDescription & ({
  members?: number[]
}))
export interface UpdateUserGroupQuery {
  /** The new name of the group.

  **Changes**: Before Zulip 7.0 (feature level 165), this was
  a required field.
  */
  name?: string
  /** The new description of the group.

  **Changes**: Before Zulip 7.0 (feature level 165), this was
  a required field.
  */
  description?: string
  /** ID of the new user group whose members are allowed to mention the
  group.

  This setting cannot be set to `"role:internet"` and `"role:owners"`
  system groups.

  **Changes**: Before Zulip 8.0 (feature level 198),
  the `can_mention_group` setting was named `can_mention_group_id`.

  New in Zulip 8.0 (feature level 191). Previously, groups
  could be mentioned if and only if they were not system groups.
  */
  can_mention_group?: number
}
export type GetUserGroupsResponse = (JsonSuccessBase & SuccessDescription & ({
  user_groups?: {
    /** The human-readable description of the user group. */
    description?: string
    /** The user group's integer ID. */
    id?: number
    /** The integer user IDs of the user group members. */
    members?: number[]
    /** The integer user group IDs of the direct subgroups.

    **Changes**: New in Zulip 6.0 (feature level 131).
    Introduced in feature level 127 as `subgroups`, but
    clients can ignore older events as this feature level
    predates subgroups being fully implemented. */
    direct_subgroup_ids?: number[]
    /** User group name. */
    name?: string
    /** Whether the user group is a system group which cannot be
    modified by users.

    **Changes**: New in Zulip 5.0 (feature level 93). */
    is_system_group?: boolean
    /** ID of the user group whose members are allowed to mention the group.

    **Changes**: Before Zulip 8.0 (feature level 198),
    the `can_mention_group` setting was named `can_mention_group_id`.

    New in Zulip 8.0 (feature level 191). Previously, groups
    could be mentioned if and only if they were not system groups. */
    can_mention_group?: number
  }[]
}))
export interface UpdateUserGroupSubgroupsQuery {
  /** The list of user group IDs to be removed from the user group.
  */
  delete?: string
  /** The list of user group IDs to be added to the user group.
  */
  add?: string
}
export interface GetUserGroupSubgroupsQuery {
  /** Whether to consider only direct subgroups of the user group
  or subgroups of subgroups also.
  */
  direct_subgroup_only?: boolean
}
export type GetUserGroupSubgroupsResponse = (JsonSuccessBase & SuccessDescription & ({
  subgroups?: number[]
}))
export interface GetIsUserGroupMemberQuery {
  /** Whether to consider only the direct members of user group and not members
  of its subgroups. Default is `false`.
  */
  direct_member_only?: boolean
}
export type GetIsUserGroupMemberResponse = (JsonSuccessBase & SuccessDescription & ({
  is_user_group_member?: boolean
}))
export type ZulipOutgoingWebhooksResponse = {
  /** Email of the bot user. */
  bot_email?: string
  /** The full name of the bot user. */
  bot_full_name?: string
  /** The message content, in raw Markdown format (not rendered to HTML). */
  data?: string
  /** What aspect of the message triggered the outgoing webhook notification.
  Possible values include `direct_message` and `mention`.

  **Changes**: In Zulip 8.0 (feature level 201), renamed the trigger
  `private_message` to `direct_message`. */
  trigger?: string
  /** A string of alphanumeric characters that can be used to authenticate the
  webhook request (each bot user uses a fixed token). You can get the token used by a given outgoing webhook bot
  in the `zuliprc` file downloaded when creating the bot. */
  token?: string
  /** A dictionary containing details on the message that triggered the
  outgoing webhook, in the format used by [`GET /messages`](/api/get-messages). */
  message?: (MessagesBase & ({
    avatar_url?: unknown
    rendered_content?: string
  }))
}
export interface CreateBigBlueButtonVideoCallQuery {
  /** Title to use for the BigBlueButton meeting.

  A good choice is something like "{stream_name} meeting".
  */
  meeting_name: string
}
export type CreateBigBlueButtonVideoCallResponse = (JsonSuccessBase & SuccessDescription & ({
  url?: string
}))

Internal.define({
  '/fetch_api_key': {
    POST: 'fetchApiKey',
  },
  '/dev_fetch_api_key': {
    POST: 'devFetchApiKey',
  },
  '/events': {
    GET: 'getEvents',
    DELETE: 'deleteQueue',
  },
  '/get_stream_id': {
    GET: 'getStreamId',
  },
  '/mark_all_as_read': {
    POST: 'markAllAsRead',
  },
  '/mark_stream_as_read': {
    POST: 'markStreamAsRead',
  },
  '/mark_topic_as_read': {
    POST: 'markTopicAsRead',
  },
  '/attachments': {
    GET: 'getAttachments',
  },
  '/attachments/{attachment_id}': {
    DELETE: 'removeAttachment',
  },
  '/drafts': {
    GET: 'getDrafts',
    POST: 'createDrafts',
  },
  '/drafts/{draft_id}': {
    PATCH: 'editDraft',
    DELETE: 'deleteDraft',
  },
  '/scheduled_messages': {
    GET: 'getScheduledMessages',
    POST: 'createScheduledMessage',
  },
  '/scheduled_messages/{scheduled_message_id}': {
    PATCH: 'updateScheduledMessage',
    DELETE: 'deleteScheduledMessage',
  },
  '/default_streams': {
    POST: 'addDefaultStream',
    DELETE: 'removeDefaultStream',
  },
  '/messages': {
    GET: 'getMessages',
    POST: 'sendMessage',
  },
  '/messages/{message_id}/history': {
    GET: 'getMessageHistory',
  },
  '/messages/flags': {
    POST: 'updateMessageFlags',
  },
  '/messages/flags/narrow': {
    POST: 'updateMessageFlagsForNarrow',
  },
  '/messages/render': {
    POST: 'renderMessage',
  },
  '/messages/{message_id}/reactions': {
    POST: 'addReaction',
    DELETE: 'removeReaction',
  },
  '/messages/{message_id}/read_receipts': {
    GET: 'getReadReceipts',
  },
  '/messages/matches_narrow': {
    GET: 'checkMessagesMatchNarrow',
  },
  '/messages/{message_id}': {
    GET: 'getMessage',
    PATCH: 'updateMessage',
    DELETE: 'deleteMessage',
  },
  '/user_uploads': {
    POST: 'uploadFile',
  },
  '/user_uploads/{realm_id_str}/{filename}': {
    GET: 'getFileTemporaryUrl',
  },
  '/users': {
    GET: 'getUsers',
    POST: 'createUser',
  },
  '/users/{user_id}/reactivate': {
    POST: 'reactivateUser',
  },
  '/users/{user_id_or_email}/presence': {
    GET: 'getUserPresence',
  },
  '/users/me': {
    GET: 'getOwnUser',
    DELETE: 'deactivateOwnUser',
  },
  '/users/me/alert_words': {
    GET: 'getAlertWords',
    POST: 'addAlertWords',
    DELETE: 'removeAlertWords',
  },
  '/users/me/status': {
    POST: 'updateStatus',
  },
  '/users/me/{stream_id}/topics': {
    GET: 'getStreamTopics',
  },
  '/users/me/subscriptions': {
    GET: 'getSubscriptions',
    POST: 'subscribe',
    PATCH: 'updateSubscriptions',
    DELETE: 'unsubscribe',
  },
  '/users/me/subscriptions/muted_topics': {
    PATCH: 'muteTopic',
  },
  '/user_topics': {
    POST: 'updateUserTopic',
  },
  '/users/me/muted_users/{muted_user_id}': {
    POST: 'muteUser',
    DELETE: 'unmuteUser',
  },
  '/users/{user_id}/subscriptions/{stream_id}': {
    GET: 'getSubscriptionStatus',
  },
  '/realm/emoji/{emoji_name}': {
    POST: 'uploadCustomEmoji',
    DELETE: 'deactivateCustomEmoji',
  },
  '/realm/emoji': {
    GET: 'getCustomEmoji',
  },
  '/realm/presence': {
    GET: 'getPresence',
  },
  '/realm/profile_fields': {
    GET: 'getCustomProfileFields',
    PATCH: 'reorderCustomProfileFields',
    POST: 'createCustomProfileField',
  },
  '/realm/user_settings_defaults': {
    PATCH: 'updateRealmUserSettingsDefaults',
  },
  '/users/me/subscriptions/properties': {
    POST: 'updateSubscriptionSettings',
  },
  '/users/{email}': {
    GET: 'getUserByEmail',
  },
  '/users/{user_id}': {
    GET: 'getUser',
    PATCH: 'updateUser',
    DELETE: 'deactivateUser',
  },
  '/realm/linkifiers': {
    GET: 'getLinkifiers',
    PATCH: 'reorderLinkifiers',
  },
  '/realm/filters': {
    POST: 'addLinkifier',
  },
  '/realm/filters/{filter_id}': {
    DELETE: 'removeLinkifier',
    PATCH: 'updateLinkifier',
  },
  '/realm/playgrounds': {
    POST: 'addCodePlayground',
  },
  '/realm/playgrounds/{playground_id}': {
    DELETE: 'removeCodePlayground',
  },
  '/register': {
    POST: 'registerQueue',
  },
  '/server_settings': {
    GET: 'getServerSettings',
  },
  '/settings': {
    PATCH: 'updateSettings',
  },
  '/streams/{stream_id}/members': {
    GET: 'getSubscribers',
  },
  '/streams': {
    GET: 'getStreams',
  },
  '/streams/{stream_id}': {
    GET: 'getStreamById',
    DELETE: 'archiveStream',
    PATCH: 'updateStream',
  },
  '/streams/{stream_id}/delete_topic': {
    POST: 'deleteTopic',
  },
  '/typing': {
    POST: 'setTypingStatus',
  },
  '/user_groups/create': {
    POST: 'createUserGroup',
  },
  '/user_groups/{user_group_id}/members': {
    POST: 'updateUserGroupMembers',
    GET: 'getUserGroupMembers',
  },
  '/user_groups/{user_group_id}': {
    PATCH: 'updateUserGroup',
    DELETE: 'removeUserGroup',
  },
  '/user_groups': {
    GET: 'getUserGroups',
  },
  '/user_groups/{user_group_id}/subgroups': {
    POST: 'updateUserGroupSubgroups',
    GET: 'getUserGroupSubgroups',
  },
  '/user_groups/{user_group_id}/members/{user_id}': {
    GET: 'getIsUserGroupMember',
  },
  '/real-time': {
  },
  '/rest-error-handling': {
  },
  '/zulip-outgoing-webhook': {
    POST: 'zulipOutgoingWebhooks',
  },
  '/calls/bigbluebutton/create': {
    GET: 'createBigBlueButtonVideoCall',
  },
})

declare module './internal' {
  interface Internal {
    /** This API endpoint is used by clients such as the Zulip mobile and
    terminal apps to implement password-based authentication. Given the
    user's Zulip login credentials, it returns a Zulip API key that the client
    can use to make requests as the user.

    This endpoint is only useful for Zulip servers/organizations with
    EmailAuthBackend or LDAPAuthBackend enabled.

    The Zulip mobile apps also support SSO/social authentication (GitHub
    auth, Google auth, SAML, etc.) that does not use this endpoint. Instead,
    the mobile apps reuse the web login flow passing the `mobile_flow_otp` in
    a webview, and the credentials are returned to the app (encrypted) via a redirect
    to a `zulip://` URL.

    !!! warn ""

        **Note:** If you signed up using passwordless authentication and
        never had a password, you can [reset your password](/help/change-your-password).

    See the [API keys](/api/api-keys) documentation for more details
    on how to download an API key manually.

    In a [Zulip development environment](https://zulip.readthedocs.io/en/latest/development/overview.html),
    see also [the unauthenticated variant](/api/dev-fetch-api-key). */
    fetchApiKey(query?: FetchApiKeyQuery): Promise<FetchApiKeyResponse>
    /** For easy testing of mobile apps and other clients and against Zulip
    development servers, we support fetching a Zulip API key for any user
    on the development server without authentication (so that they can
    implement analogues of the one-click login process available for Zulip
    development servers on the web).

    !!! warn ""

        **Note:** This endpoint is only available on Zulip development
        servers; for obvious security reasons it will always return an error
        in a Zulip production server. */
    devFetchApiKey(query?: DevFetchApiKeyQuery): Promise<DevFetchApiKeyResponse>
    /** This endpoint allows you to receive new events from
    [a registered event queue](/api/register-queue).

    Long-lived clients should use the
    `event_queue_longpoll_timeout_seconds` property returned by
    `POST /register` as the client-side HTTP request timeout for
    calls to this endpoint. It is guaranteed to be higher than
    heartbeat frequency and should be respected by clients to
    avoid breaking when heartbeat frequency increases. */
    getEvents(query?: GetEventsQuery): Promise<GetEventsResponse>
    /** Delete a previously registered queue. */
    deleteQueue(query?: DeleteQueueQuery): Promise<unknown>
    /** Get the unique ID of a given stream. */
    getStreamId(query?: GetStreamIdQuery): Promise<GetStreamIdResponse>
    /** Marks all of the current user's unread messages as read.

    **Changes**: Before Zulip 6.0 (feature level 153), this
    request did a single atomic operation, which could time out
    with 10,000s of unread messages to mark as read.

    It now marks messages as read in batches, starting with the
    newest messages, so that progress will be made even if the
    request times out.

    If the server's processing is interrupted by a timeout, it
    will return an HTTP 200 success response with result
    "partially_completed". A correct client should repeat the
    request when handling such a response. */
    markAllAsRead(): Promise<MarkAllAsReadResponse>
    /** Mark all the unread messages in a stream as read. */
    markStreamAsRead(query?: MarkStreamAsReadQuery): Promise<unknown>
    /** Mark all the unread messages in a topic as read. */
    markTopicAsRead(query?: MarkTopicAsReadQuery): Promise<unknown>
    /** Fetch metadata on files uploaded by the requesting user. */
    getAttachments(): Promise<GetAttachmentsResponse>
    /** Delete an uploaded file given its attachment ID.

    Note that uploaded files that have been referenced in at least
    one message are automatically deleted once the last message
    containing a link to them is deleted (whether directly or via
    a [message retention policy](/help/message-retention-policy)).

    Uploaded files that are never used in a message are
    automatically deleted a few weeks after being uploaded.

    Attachment IDs can be contained from [GET /attachments](/api/get-attachments). */
    removeAttachment(attachment_id: string): Promise<unknown>
    /** Fetch all drafts for the current user. */
    getDrafts(): Promise<GetDraftsResponse>
    /** Create one or more drafts on the server. These drafts will be automatically
    synchronized to other clients via `drafts` events. */
    createDrafts(query?: CreateDraftsQuery): Promise<CreateDraftsResponse>
    /** Edit a draft on the server. The edit will be automatically
    synchronized to other clients via `drafts` events. */
    editDraft(draft_id: string, query?: EditDraftQuery): Promise<unknown>
    /** Delete a single draft from the server. The deletion will be automatically
    synchronized to other clients via a `drafts` event. */
    deleteDraft(draft_id: string): Promise<unknown>
    /** Fetch all [scheduled messages](/help/schedule-a-message) for
    the current user.

    Scheduled messages are messages the user has scheduled to be
    sent in the future via the send later feature.

    **Changes**: New in Zulip 7.0 (feature level 173). */
    getScheduledMessages(): Promise<GetScheduledMessagesResponse>
    /** Create a new [scheduled message](/help/schedule-a-message).

    **Changes**: In Zulip 7.0 (feature level 184), moved support for
    [editing a scheduled message](/api/update-scheduled-message) to a
    separate API endpoint, which removed the `scheduled_message_id`
    parameter from this endpoint.

    New in Zulip 7.0 (feature level 179). */
    createScheduledMessage(query?: CreateScheduledMessageQuery): Promise<CreateScheduledMessageResponse>
    /** Edit an existing [scheduled message](/help/schedule-a-message).

    **Changes**: New in Zulip 7.0 (feature level 184). */
    updateScheduledMessage(scheduled_message_id: string, query?: UpdateScheduledMessageQuery): Promise<unknown>
    /** Delete, and therefore cancel sending, a previously [scheduled
    message](/help/schedule-a-message).

    **Changes**: New in Zulip 7.0 (feature level 173). */
    deleteScheduledMessage(scheduled_message_id: string): Promise<unknown>
    /** Add a stream to the set of [default streams][default-streams]
    for new users joining the organization.

    [default-streams]: /help/set-default-streams-for-new-users */
    addDefaultStream(query?: AddDefaultStreamQuery): Promise<unknown>
    /** Remove a stream from the set of [default streams][default-streams]
    for new users joining the organization.

    [default-streams]: /help/set-default-streams-for-new-users */
    removeDefaultStream(query?: RemoveDefaultStreamQuery): Promise<unknown>
    /** Fetch user's message history from a Zulip server.

    This endpoint is the primary way to fetch a user's message history
    from a Zulip server. It is useful both for Zulip clients (e.g. the
    web, desktop, mobile, and terminal clients) as well as bots, API
    clients, backup scripts, etc.

    Note that a user's message history does not contain messages sent to
    streams before they [subscribe](/api/subscribe), and newly created
    bot users are not usually subscribed to any streams.

    By specifying a [narrow filter](/api/get-messages#parameter-narrow),
    you can use this endpoint to fetch the messages matching any search
    query that is supported by Zulip's powerful full-text search backend.

    In either case, you specify an `anchor` message (or ask the server to
    calculate the first unread message for you and use that as the
    anchor), as well as a number of messages before and after the anchor
    message. The server returns those messages, sorted by message ID, as
    well as some metadata that makes it easy for a client to determine
    whether there are more messages matching the query that were not
    returned due to the `num_before` and `num_after` limits.

    We recommend setting `num_before` and `num_after` to no more than 1000, to
    avoid generating very large HTTP responses. A maximum of 5000 messages
    can be obtained per request; attempting to exceed this will result in an
    error. */
    getMessages(query?: GetMessagesQuery): Promise<GetMessagesResponse>
    /** Send a [stream message](/help/streams-and-topics) or a
    [direct message](/help/direct-messages). */
    sendMessage(query?: SendMessageQuery): Promise<SendMessageResponse>
    /** Fetch the message edit history of a previously edited message.

    Note that edit history may be disabled in some organizations; see the
    [Zulip Help Center documentation on editing messages][edit-settings].

    [edit-settings]: /help/view-a-messages-edit-history */
    getMessageHistory(message_id: string): Promise<GetMessageHistoryResponse>
    /** Add or remove personal message flags like `read` and `starred`
    on a collection of message IDs.

    See also the endpoint for [updating flags on a range of
    messages within a narrow](/api/update-message-flags-for-narrow).
    For updating the `read` flag on common collections of messages, see also
    the
    [special endpoints for marking message as read in bulk](/api/mark-all-as-read). */
    updateMessageFlags(query?: UpdateMessageFlagsQuery): Promise<UpdateMessageFlagsResponse>
    /** Add or remove personal message flags like `read` and `starred`
    on a range of messages within a narrow.

    See also [the endpoint for updating flags on specific message
    IDs](/api/update-message-flags).

    **Changes**: New in Zulip 6.0 (feature level 155). */
    updateMessageFlagsForNarrow(query?: UpdateMessageFlagsForNarrowQuery): Promise<UpdateMessageFlagsForNarrowResponse>
    /** Render a message to HTML. */
    renderMessage(query?: RenderMessageQuery): Promise<RenderMessageResponse>
    /** Add an [emoji reaction](/help/emoji-reactions) to a message. */
    addReaction(message_id: string, query?: AddReactionQuery): Promise<unknown>
    /** Remove an [emoji reaction](/help/emoji-reactions) from a message. */
    removeReaction(message_id: string, query?: RemoveReactionQuery): Promise<unknown>
    /** Returns a list containing the IDs for all users who have
    marked the message as read (and whose privacy settings allow
    sharing that information).

    The list of users IDs will include any bots who have marked
    the message as read via the API (providing a way for bots to
    indicate whether they have processed a message successfully in
    a way that can be easily inspected in a Zulip client). Bots
    for which this behavior is not desired may disable the
    `send_read_receipts` setting via the API.

    It will never contain the message's sender.

    **Changes**: New in Zulip 6.0 (feature level 137). */
    getReadReceipts(message_id: string): Promise<GetReadReceiptsResponse>
    /** Check whether a set of messages match a [narrow](/api/construct-narrow).

    For many common narrows (e.g. a topic), clients can write an efficient
    client-side check to determine whether a newly arrived message belongs
    in the view.

    This endpoint is designed to allow clients to handle more complex narrows
    for which the client does not (or in the case of full-text search, cannot)
    implement this check.

    The format of the `match_subject` and `match_content` objects is designed
    to match those returned by the [`GET /messages`](/api/get-messages#response)
    endpoint, so that a client can splice these fields into a `message` object
    received from [`GET /events`](/api/get-events#message) and end up with an
    extended message object identical to how a [`GET /messages`](/api/get-messages)
    request for the current narrow would have returned the message. */
    checkMessagesMatchNarrow(query?: CheckMessagesMatchNarrowQuery): Promise<CheckMessagesMatchNarrowResponse>
    /** Given a message ID, return the message object.

    Additionally, a `raw_content` field is included. This field is
    useful for clients that primarily work with HTML-rendered
    messages but might need to occasionally fetch the message's
    raw Markdown (e.g. for [view
    source](/help/view-the-markdown-source-of-a-message) or
    prefilling a message edit textarea).

    **Changes**: Before Zulip 5.0 (feature level 120), this
    endpoint only returned the `raw_content` field. */
    getMessage(message_id: string, query?: GetMessageQuery): Promise<GetMessageResponse>
    /** Edit/update the content, topic, or stream of a message.

    `{msg_id}` in the above URL should be replaced with the ID of the
    message you wish you update.

    You can [resolve topics](/help/resolve-a-topic) by editing the
    topic to `✔ {original_topic}`.

    See [configuring message editing][config-message-editing] for detailed
    documentation on when users are allowed to edit message content and
    [restricting moving messages][restrict-move-messages] for detailed
    documentation on when users are allowed to change a message's topic
    and/or stream.

    The relevant realm settings in the API that are related to the above
    linked documentation on when users are allowed to update messages are:

    - `allow_message_editing`
    - `edit_topic_policy`
    - `move_messages_between_streams_policy`
    - `message_content_edit_limit_seconds`
    - `move_messages_within_stream_limit_seconds`
    - `move_messages_between_streams_limit_seconds`

    More details about these realm settings can be found in the
    [`POST /register`](/api/register-queue) response or in the documentation
    of the [`realm op: update_dict`](/api/get-events#realm-update_dict)
    event in [`GET /events`](/api/get-events).

    **Changes**: Prior to Zulip 7.0 (feature level 172), anyone could add a
    topic to stream messages without a topic, regardless of the organization's
    [topic editing permissions](/help/restrict-moving-messages). As of this
    feature level, messages without topics have the same restrictions for
    topic edits as messages with topics.

    Before Zulip 7.0 (feature level 172), by using the `change_all` value for
    the `propagate_mode` parameter, users could move messages after the
    organization's configured time limits for changing a message's topic or
    stream had passed. As of this feature level, the server will [return an
    error](/api/update-message#response) with `"code":
    "MOVE_MESSAGES_TIME_LIMIT_EXCEEDED"` if users, other than organization
    administrators or moderators, try to move messages after these time
    limits have passed.

    Before Zulip 7.0 (feature level 162), users who were not administrators or
    moderators could only edit topics if the target message was sent within the
    last 3 days. As of this feature level, that time limit is now controlled by
    the realm setting `move_messages_within_stream_limit_seconds`. Also at this
    feature level, a similar time limit for moving messages between streams was
    added, controlled by the realm setting
    `move_messages_between_streams_limit_seconds`. Previously, all users who
    had permission to move messages between streams did not have any time limit
    restrictions when doing so.

    Before Zulip 7.0 (feature level 159), editing streams and topics of messages
    was forbidden if the realm setting for `allow_message_editing` was `false`,
    regardless of an organization's configuration for the realm settings
    `edit_topic_policy` or `move_messages_between_streams_policy`.

    Before Zulip 7.0 (feature level 159), message senders were allowed to edit
    the topic of their messages indefinitely.

    [config-message-editing]: /help/restrict-message-editing-and-deletion
    [restrict-move-messages]: /help/restrict-moving-messages */
    updateMessage(message_id: string, query?: UpdateMessageQuery): Promise<unknown>
    /** Permanently delete a message.

    This API corresponds to the
    [delete a message completely][delete-completely] feature documented in
    the Zulip Help Center.

    [delete-completely]: /help/edit-or-delete-a-message#delete-a-message-completely */
    deleteMessage(message_id: string): Promise<unknown>
    /** Upload a single file and get the corresponding URI.

    Initially, only you will be able to access the link. To share the
    uploaded file, you'll need to [send a message][send-message]
    containing the resulting link. Users who can already access the link
    can reshare it with other users by sending additional Zulip messages
    containing the link.

    [uploaded-files]: /help/manage-your-uploaded-files
    [send-message]: /api/send-message */
    uploadFile(): Promise<UploadFileResponse>
    /** Get a temporary URL for access to the file that doesn't require authentication.

    **Changes**: New in Zulip 3.0 (feature level 1). */
    getFileTemporaryUrl(realm_id_str: string, filename: string): Promise<GetFileTemporaryUrlResponse>
    /** Retrieve details on all users in the organization. Optionally
    includes values of [custom profile fields](/help/custom-profile-fields).

    You can also [fetch details on a single user](/api/get-user). */
    getUsers(query?: GetUsersQuery): Promise<GetUsersResponse>
    /** Create a new user account via the API.

    !!! warn ""

        **Note**: This endpoint is limited to organization administrators
        who additionally have the `can_create_users` permission for the Zulip
        organization. Zulip Cloud users can request the `can_create_users`
        permission for a bot by contacting [Zulip Cloud support][support]
        with an explanation for why it is needed. Self-hosted installations
        can toggle `can_create_users` on an account using the `manage.py
        change_user_role` [management command][management-commands].

    **Changes**: Before Zulip 4.0 (feature level 36), this endpoint was
    available to all organization administrators.

    [support]: /help/contact-support
    [management-commands]: https://zulip.readthedocs.io/en/latest/production/management-commands.html */
    createUser(query?: CreateUserQuery): Promise<CreateUserResponse>
    /** [Reactivates a
    user](https://zulip.com/help/deactivate-or-reactivate-a-user)
    given their user ID. */
    reactivateUser(user_id: string): Promise<unknown>
    /** Get the presence status for a specific user.

    This endpoint is most useful for embedding data about a user's
    presence status in other sites (e.g. an employee directory). Full
    Zulip clients like mobile/desktop apps will want to use the [main
    presence endpoint](/api/get-presence), which returns data for all
    active users in the organization, instead.

    See [Zulip's developer documentation][subsystems-presence]
    for details on the data model for presence in Zulip.

    [subsystems-presence]: https://zulip.readthedocs.io/en/latest/subsystems/presence.html */
    getUserPresence(user_id_or_email: string): Promise<GetUserPresenceResponse>
    /** Get basic data about the user/bot that requests this endpoint. */
    getOwnUser(): Promise<GetOwnUserResponse>
    /** Deactivates the user's account. See also the administrative endpoint for
    [deactivating another user](/api/deactivate-user).

    This endpoint is primarily useful to Zulip clients providing a user settings UI. */
    deactivateOwnUser(): Promise<unknown>
    /** Get all of the user's configured [alert words][alert-words].

    [alert-words]: /help/dm-mention-alert-notifications#alert-words */
    getAlertWords(): Promise<GetAlertWordsResponse>
    /** Add words (or phrases) to the user's set of configured [alert words][alert-words].

    [alert-words]: /help/dm-mention-alert-notifications#alert-words */
    addAlertWords(query?: AddAlertWordsQuery): Promise<AddAlertWordsResponse>
    /** Remove words (or phrases) from the user's set of configured [alert words][alert-words].

    Alert words are case insensitive.

    [alert-words]: /help/dm-mention-alert-notifications#alert-words */
    removeAlertWords(query?: RemoveAlertWordsQuery): Promise<RemoveAlertWordsResponse>
    /** Change your [status](/help/status-and-availability).

    A request to this endpoint will only change the parameters passed.
    For example, passing just `status_text` requests a change in the status
    text, but will leave the status emoji unchanged.

    Clients that wish to set the user's status to a specific value should
    pass all supported parameters.

    **Changes**: In Zulip 5.0 (feature level 86), added support for
    `emoji_name`, `emoji_code`, and `reaction_type` parameters. */
    updateStatus(query?: UpdateStatusQuery): Promise<unknown>
    /** Get all topics the user has access to in a specific stream.

    Note that for private streams with [protected
    history](/help/stream-permissions), the user will only have access to
    topics of messages sent after they [subscribed to](/api/subscribe) the
    stream. Similarly, a user's [bot](/help/bots-and-integrations#bot-type)
    will only have access to messages sent after the bot was subscribed to
    the stream, instead of when the user subscribed. */
    getStreamTopics(stream_id: string): Promise<GetStreamTopicsResponse>
    /** Get all streams that the user is subscribed to. */
    getSubscriptions(query?: GetSubscriptionsQuery): Promise<GetSubscriptionsResponse>
    /** Subscribe one or more users to one or more streams.

    If any of the specified streams do not exist, they are automatically
    created. The initial [stream settings](/api/update-stream) will be determined
    by the optional parameters, like `invite_only`, detailed below.

    Note that the ability to subscribe oneself and/or other users to a specified
    stream depends on the [stream's privacy settings](/help/stream-permissions). */
    subscribe(query?: SubscribeQuery): Promise<SubscribeResponse>
    /** Update which streams you are subscribed to. */
    updateSubscriptions(query?: UpdateSubscriptionsQuery): Promise<UpdateSubscriptionsResponse>
    /** Unsubscribe yourself or other users from one or more streams.

    In addition to managing the current user's subscriptions, this
    endpoint can be used to remove other users from streams. This
    is possible in 3 situations:

    - Organization administrators can remove any user from any
      stream.
    - Users can remove a bot that they own from any stream that
      the user [can access](/help/stream-permissions).
    - Users can unsubscribe any user from a stream if they [have
      access](/help/stream-permissions) to the stream and are a
      member of the [user group](/api/get-user-groups) specified
      by the [`can_remove_subscribers_group`][can-remove-parameter]
      for the stream.

    **Changes**: Before Zulip 8.0 (feature level 197),
    the `can_remove_subscribers_group` setting
    was named `can_remove_subscribers_group_id`.

    Before Zulip 7.0 (feature level 161), the
    `can_remove_subscribers_group_id` for all streams was always
    the system group for organization administrators.

    Before Zulip 6.0 (feature level 145), users had no special
    privileges for managing bots that they own.

    [can-remove-parameter]: /api/subscribe#parameter-can_remove_subscribers_group */
    unsubscribe(query?: UnsubscribeQuery): Promise<UnsubscribeResponse>
    /** [Mute or unmute a topic](/help/mute-a-topic) within a stream that
    the current user is subscribed to.

    **Changes**: Deprecated in Zulip 7.0 (feature level 170). Clients connecting
    to newer servers should use the [POST /user_topics](/api/update-user-topic)
    endpoint, as this endpoint may be removed in a future release.

    Before Zulip 7.0 (feature level 169), this endpoint
    returned an error if asked to mute a topic that was already muted
    or asked to unmute a topic that had not previously been muted. */
    muteTopic(query?: MuteTopicQuery): Promise<unknown>
    /** This endpoint is used to update the personal preferences for a topic,
    such as the topic's visibility policy, which is used to implement
    [mute a topic](/help/mute-a-topic) and related features.

    This endpoint can be used to update the visibility policy for the single
    stream and topic pair indicated by the parameters for a user.

    **Changes**: New in Zulip 7.0 (feature level 170). Previously,
    toggling whether a topic was muted or unmuted was managed by the
    [PATCH /users/me/subscriptions/muted_topics](/api/mute-topic) endpoint. */
    updateUserTopic(query?: UpdateUserTopicQuery): Promise<unknown>
    /** [Mute a user](/help/mute-a-user) from the perspective of the requesting
    user. Messages sent by muted users will be automatically marked as read
    and hidden for the user who muted them.

    Muted users should be implemented by clients as follows:

    - The server will immediately mark all messages sent by the muted
      user as read. This will automatically clear any existing mobile
      push notifications related to the muted user.
    - The server will mark any new messages sent by the muted user as read
      for the requesting user's account, which prevents all email and mobile
      push notifications.
    - Clients should exclude muted users from presence lists or other UI
      for viewing or composing one-on-one direct messages. One-on-one direct
      messages sent by muted users should be hidden everywhere in the Zulip UI.
    - Stream messages and group direct messages sent by the muted
      user should avoid displaying the content and name/avatar,
      but should display that N messages by a muted user were
      hidden (so that it is possible to interpret the messages by
      other users who are talking with the muted user).
    - Group direct message conversations including the muted user
      should display muted users as "Muted user", rather than
      showing their name, in lists of such conversations, along with using
      a blank grey avatar where avatars are displayed.
    - Administrative/settings UI elements for showing "All users that exist
      on this stream or realm", e.g. for organization
      administration or showing stream subscribers, should display
      the user's name as normal.

    **Changes**: New in Zulip 4.0 (feature level 48). */
    muteUser(muted_user_id: string): Promise<unknown>
    /** [Unmute a user](/help/mute-a-user#see-your-list-of-muted-users)
    from the perspective of the requesting user.

    **Changes**: New in Zulip 4.0 (feature level 48). */
    unmuteUser(muted_user_id: string): Promise<unknown>
    /** Check whether a user is subscribed to a stream.

    **Changes**: New in Zulip 3.0 (feature level 11). */
    getSubscriptionStatus(user_id: string, stream_id: string): Promise<GetSubscriptionStatusResponse>
    /** This endpoint is used to upload a custom emoji for use in the user's
    organization. Access to this endpoint depends on the
    [organization's configuration](https://zulip.com/help/only-allow-admins-to-add-emoji). */
    uploadCustomEmoji(emoji_name: string): Promise<unknown>
    /** [Deactivate a custom emoji](/help/custom-emoji#deactivate-custom-emoji) from
    the user's organization.

    Users can only deactivate custom emoji that they added themselves except for
    organization administrators, who can deactivate any custom emoji.

    Note that deactivated emoji will still be visible in old messages, reactions,
    user statuses and stream descriptions.

    **Changes**: Before Zulip 8.0 (feature level 190), this endpoint returned an
    HTTP status code of 400 when the emoji did not exist, instead of 404. */
    deactivateCustomEmoji(emoji_name: string): Promise<unknown>
    /** Get all the custom emoji in the user's organization. */
    getCustomEmoji(): Promise<GetCustomEmojiResponse>
    /** Get the presence information of all the users in an organization.

    See [Zulip's developer documentation][subsystems-presence]
    for details on the data model for presence in Zulip.

    [subsystems-presence]: https://zulip.readthedocs.io/en/latest/subsystems/presence.html */
    getPresence(): Promise<GetPresenceResponse>
    /** Get all the [custom profile fields](/help/custom-profile-fields)
    configured for the user's organization. */
    getCustomProfileFields(): Promise<GetCustomProfileFieldsResponse>
    /** Reorder the custom profile fields in the user's organization.

    Custom profile fields are displayed in Zulip UI widgets in order; this
    endpoint allows administrative settings UI to change the field ordering.

    This endpoint is used to implement the dragging feature described in the
    [custom profile fields documentation](/help/custom-profile-fields). */
    reorderCustomProfileFields(query?: ReorderCustomProfileFieldsQuery): Promise<unknown>
    /** [Create a custom profile field](/help/custom-profile-fields#add-a-custom-profile-field) in the user's organization. */
    createCustomProfileField(query?: CreateCustomProfileFieldQuery): Promise<CreateCustomProfileFieldResponse>
    /** Change the [default values of settings][new-user-defaults] for new users
    joining the organization. Essentially all
    [personal preference settings](/api/update-settings) are supported.

    This feature can be invaluable for customizing Zulip's default
    settings for notifications or UI to be appropriate for how the
    organization is using Zulip. (Note that this only supports
    personal preference settings, like when to send push
    notifications or what emoji set to use, not profile or
    identity settings that naturally should be different for each user).

    Note that this endpoint cannot, at present, be used to modify
    settings for existing users in any way.

    **Changes**: New in Zulip 5.0 (feature level 96). If any parameters
    sent in the request are not supported by this endpoint, an
    [`ignored_parameters_unsupported`][ignored-parameters] array will
    be returned in the JSON success response.

    [new-user-defaults]: /help/configure-default-new-user-settings
    [ignored-parameters]: /api/rest-error-handling#ignored-parameters */
    updateRealmUserSettingsDefaults(query?: UpdateRealmUserSettingsDefaultsQuery): Promise<unknown>
    /** This endpoint is used to update the user's personal settings for the
    streams they are subscribed to, including muting, color, pinning, and
    per-stream notification settings.

    **Changes**: Prior to Zulip 5.0 (feature level 111), response
    object included the `subscription_data` in the the
    request. The endpoint now returns the more ergonomic
    [`ignored_parameters_unsupported`][ignored-parameters] array instead.

    [ignored-parameters]: /api/rest-error-handling#ignored-parameters */
    updateSubscriptionSettings(query?: UpdateSubscriptionSettingsQuery): Promise<unknown>
    /** Fetch details for a single user in the organization given a Zulip
    API email address.

    You can also fetch details on [all users in the organization](/api/get-users)
    or [by user ID](/api/get-user).

    Fetching by user ID is generally recommended when possible,
    as a user might [change their email address](/help/change-your-email-address)
    or change their [email address visibility](/help/configure-email-visibility),
    either of which could change the value of their Zulip API email address.

    **Changes**: New in Zulip Server 4.0 (feature level 39). */
    getUserByEmail(email: string, query?: GetUserByEmailQuery): Promise<GetUserByEmailResponse>
    /** Fetch details for a single user in the organization.

    You can also fetch details on [all users in the organization](/api/get-users)
    or [by a user's Zulip API email](/api/get-user-by-email).

    **Changes**: New in Zulip 3.0 (feature level 1). */
    getUser(user_id: string, query?: GetUserQuery): Promise<GetUserResponse>
    /** Administrative endpoint to update the details of another user in the organization.

    Supports everything an administrator can do to edit details of another
    user's account, including editing full name,
    [role](/help/roles-and-permissions), and [custom profile
    fields](/help/custom-profile-fields). */
    updateUser(user_id: string, query?: UpdateUserQuery): Promise<unknown>
    /** [Deactivates a
    user](https://zulip.com/help/deactivate-or-reactivate-a-user)
    given their user ID. */
    deactivateUser(user_id: string, query?: DeactivateUserQuery): Promise<unknown>
    /** List all of an organization's configured
    [linkifiers](/help/add-a-custom-linkifier), regular
    expression patterns that are automatically linkified when they appear
    in messages and topics.

    **Changes**: New in Zulip 4.0 (feature level 54). On older versions,
    a similar `GET /realm/filters` endpoint was available with each entry in
    a `[pattern, url_format, id]` tuple format. */
    getLinkifiers(): Promise<GetLinkifiersResponse>
    /** Change the order that the regular expression patterns in the organization's
    [linkifiers](/help/add-a-custom-linkifier) are matched in messages and topics.
    Useful when defining linkifiers with overlapping patterns.

    **Changes**: New in Zulip 8.0 (feature level 202). Before this feature level,
    linkifiers were always processed in order by ID, which meant users would
    need to delete and recreate them to reorder the list of linkifiers. */
    reorderLinkifiers(query?: ReorderLinkifiersQuery): Promise<unknown>
    /** Configure [linkifiers](/help/add-a-custom-linkifier),
    regular expression patterns that are automatically linkified when they
    appear in messages and topics. */
    addLinkifier(query?: AddLinkifierQuery): Promise<AddLinkifierResponse>
    /** Remove [linkifiers](/help/add-a-custom-linkifier), regular
    expression patterns that are automatically linkified when they appear
    in messages and topics. */
    removeLinkifier(filter_id: string): Promise<unknown>
    /** Update a [linkifier](/help/add-a-custom-linkifier), regular
    expression patterns that are automatically linkified when they appear
    in messages and topics.

    **Changes**: New in Zulip 4.0 (feature level 57). */
    updateLinkifier(filter_id: string, query?: UpdateLinkifierQuery): Promise<unknown>
    /** Configure [code playgrounds](/help/code-blocks#code-playgrounds) for the organization.

    **Changes**: New in Zulip 4.0 (feature level 49). A parameter encoding bug was
    fixed in Zulip 4.0 (feature level 57). */
    addCodePlayground(query?: AddCodePlaygroundQuery): Promise<AddCodePlaygroundResponse>
    /** Remove a [code playground](/help/code-blocks#code-playgrounds) previously
    configured for an organization.

    **Changes**: New in Zulip 4.0 (feature level 49). */
    removeCodePlayground(playground_id: string): Promise<unknown>
    /** This powerful endpoint can be used to register a Zulip "event queue"
    (subscribed to certain types of "events", or updates to the messages
    and other Zulip data the current user has access to), as well as to
    fetch the current state of that data.

    (`register` also powers the `call_on_each_event` Python API, and is
    intended primarily for complex applications for which the more convenient
    `call_on_each_event` API is insufficient).

    This endpoint returns a `queue_id` and a `last_event_id`; these can be
    used in subsequent calls to the
    ["events" endpoint](/api/get-events) to request events from
    the Zulip server using long-polling.

    The server will queue events for up to 10 minutes of inactivity.
    After 10 minutes, your event queue will be garbage-collected. The
    server will send `heartbeat` events every minute, which makes it easy
    to implement a robust client that does not miss events unless the
    client loses network connectivity with the Zulip server for 10 minutes
    or longer.

    Once the server garbage-collects your event queue, the server will
    [return an error](/api/get-events#bad_event_queue_id-errors)
    with a code of `BAD_EVENT_QUEUE_ID` if you try to fetch events from
    the event queue. Your software will need to handle that error
    condition by re-initializing itself (e.g. this is what triggers your
    browser reloading the Zulip web app when your laptop comes back online
    after being offline for more than 10 minutes).

    When prototyping with this API, we recommend first calling `register`
    with no `event_types` parameter to see all the available data from all
    supported event types. Before using your client in production, you
    should set appropriate `event_types` and `fetch_event_types` filters
    so that your client only requests the data it needs. A few minutes
    doing this often saves 90% of the total bandwidth and other resources
    consumed by a client using this API.

    See the [events system developer documentation][events-system-docs]
    if you need deeper details about how the Zulip event queue system
    works, avoids clients needing to worry about large classes of
    potentially messy races, etc.

    **Changes**: Before Zulip 7.0 (feature level 183), the
    `realm_community_topic_editing_limit_seconds` property
    was returned by the response. It was removed because it
    had not been in use since the realm setting
    `move_messages_within_stream_limit_seconds` was introduced
    in feature level 162.

    In Zulip 7.0 (feature level 163), the realm setting
    `email_address_visibility` was removed. It was replaced by a [user
    setting](/api/update-settings#parameter-email_address_visibility) with
    a [realm user default][user-defaults], with the encoding of different
    values preserved. Clients can support all versions by supporting the
    current API and treating every user as having the realm's
    `email_address_visibility` value.

    [user-defaults]: /api/update-realm-user-settings-defaults#parameter-email_address_visibility
    [events-system-docs]: https://zulip.readthedocs.io/en/latest/subsystems/events-system.html */
    registerQueue(query?: RegisterQueueQuery): Promise<RegisterQueueResponse>
    /** Fetch global settings for a Zulip server.

    **Note:** this endpoint does not require any authentication at all, and you can use it to check:

    - If this is a Zulip server, and if so, what version of Zulip it's running.
    - What a Zulip client (e.g. a mobile app or
      [zulip-terminal](https://github.com/zulip/zulip-terminal/)) needs to
      know in order to display a login prompt for the server (e.g. what
      authentication methods are available). */
    getServerSettings(): Promise<GetServerSettingsResponse>
    /** This endpoint is used to edit the current user's settings.

    **Changes**: Prior to Zulip 5.0 (feature level 80), this
    endpoint only supported the `full_name`, `email`,
    `old_password`, and `new_password` parameters. Notification
    settings were managed by `PATCH /settings/notifications`, and
    all other settings by `PATCH /settings/display`.

    The feature level 80 migration to merge these endpoints did not
    change how request parameters are encoded. However, it did change
    the handling of any invalid parameters present in a request
    (see feature level 78 change below).

    The `/settings/display` and `/settings/notifications`
    endpoints are now deprecated aliases for this endpoint for
    backwards-compatibility, and will be removed once clients have
    migrated to use this endpoint.

    **Changes**: Prior to Zulip 5.0 (feature level 78),
    the `/settings` endpoint indicated which parameters it had
    processed by including in the response object `"key": value`
    entries for values successfully changed by the request. That
    was replaced by the more ergonomic
    [`ignored_parameters_unsupported`][ignored-parameters] array.

    The `/settings/notifications` and `/settings/display` endpoints
    also had this behavior before they became aliases of `/settings`
    in Zulip 5.0 (see feature level 80 change above).

    Before these changes, request parameters that were not supported
    (or were unchanged) were silently ignored.

    [ignored-parameters]: /api/rest-error-handling#ignored-parameters */
    updateSettings(query?: UpdateSettingsQuery): Promise<unknown>
    /** Get all users subscribed to a stream. */
    getSubscribers(stream_id: string): Promise<GetSubscribersResponse>
    /** Get all streams that the user [has access to](/help/stream-permissions). */
    getStreams(query?: GetStreamsQuery): Promise<GetStreamsResponse>
    /** Fetch details for the stream with the ID `stream_id`.

    **Changes**: New in Zulip 6.0 (feature level 132). */
    getStreamById(stream_id: string): Promise<GetStreamByIdResponse>
    /** [Archive the stream](/help/archive-a-stream) with the ID `stream_id`. */
    archiveStream(stream_id: string): Promise<unknown>
    /** Configure the stream with the ID `stream_id`. This endpoint supports
    an organization administrator editing any property of a stream,
    including:

    - Stream [name](/help/rename-a-stream) and [description](/help/change-the-stream-description)
    - Stream [permissions](/help/stream-permissions), including
      [privacy](/help/change-the-privacy-of-a-stream) and [who can
      send](/help/stream-sending-policy).

    Note that an organization administrator's ability to change a
    [private stream's permissions](/help/stream-permissions#private-streams)
    depends on them being subscribed to the stream. */
    updateStream(stream_id: string, query?: UpdateStreamQuery): Promise<unknown>
    /** Delete all messages in a topic.

    Topics are a field on messages (not an independent
    data structure), so deleting all the messages in the topic
    deletes the topic from Zulip.

    **Changes**: As of Zulip 6.0 (feature level 154), in case
    of timeout, a success response with "partially_completed"
    result will now be returned.

    Before Zulip 6.0 (feature level 147), this request did a
    single atomic operation, which could time out for very large
    topics. It now deletes messages in batches, starting with
    the newest messages, so that progress will be made even if
    the request times out. */
    deleteTopic(stream_id: string, query?: DeleteTopicQuery): Promise<DeleteTopicResponse>
    /** Notify other users whether the current user is [typing a message](/help/typing-notifications).

    Clients implementing Zulip's typing notifications protocol should work as follows:

    - Send a request to this endpoint with `"op": "start"` when a user starts typing a message,
      and also every 10 seconds (`TYPING_STARTED_WAIT_PERIOD`) that the user continues to
      actively type or otherwise interact with the compose UI (e.g. interacting with the
      compose box emoji picker).
    - Send a request to this endpoint with `"op": "stop"` when a user pauses using the
      compose UI for at least 5 seconds (`TYPING_STOPPED_WAIT_PERIOD`) or cancels
      the compose action (if it had previously sent a "start" operation for that
      compose action).
    - Start displaying "Sender is typing" for a given conversation when the client
      receives an `"op": "start"` event from the [`GET /events`](/api/get-events#typing-start)
      endpoint.
    - Continue displaying "Sender is typing" until they receive an `"op": "stop"` event
      from the [`GET /events`](/api/get-events#typing-stop) endpoint or
      15 seconds (`TYPING_STARTED_EXPIRY_PERIOD`) have passed without a new `"op": "start"`
      event for that conversation.
    - Support for displaying stream typing notifications was new in Zulip 4.0
      (feature level 58). Clients should indicate they support processing stream typing
      events via the `stream_typing_notifications` value in the `client_capabilities`
      parameter to [`POST /register`](/api/register-queue#parameter-client_capabilities)
      endpoint.

    This protocol is designed to allow the server-side typing notifications implementation
    to be stateless while being resilient; network failures cannot result in a user being
    incorrectly displayed as perpetually typing.

    See
    [the typing notification docs](https://zulip.readthedocs.io/en/latest/subsystems/typing-indicators.html)
    for additional design details on Zulip's typing notifications protocol. */
    setTypingStatus(query?: SetTypingStatusQuery): Promise<unknown>
    /** Create a new [user group](/help/user-groups). */
    createUserGroup(query?: CreateUserGroupQuery): Promise<unknown>
    /** Update the members of a [user group](/help/user-groups). */
    updateUserGroupMembers(user_group_id: string, query?: UpdateUserGroupMembersQuery): Promise<unknown>
    /** Get the members of a [user group](/help/user-groups).

    **Changes**: New in Zulip 6.0 (feature level 127). */
    getUserGroupMembers(user_group_id: string, query?: GetUserGroupMembersQuery): Promise<GetUserGroupMembersResponse>
    /** Update the name or description of a [user group](/help/user-groups). */
    updateUserGroup(user_group_id: string, query?: UpdateUserGroupQuery): Promise<unknown>
    /** Delete a [user group](/help/user-groups). */
    removeUserGroup(user_group_id: string): Promise<unknown>
    /** Fetches all of the user groups in the organization.

    !!! warn ""

        **Note**: This endpoint is only available to [members and
        administrators](/help/roles-and-permissions); bots and guests
        cannot use this endpoint. */
    getUserGroups(): Promise<GetUserGroupsResponse>
    /** Update the subgroups of a [user group](/help/user-groups).

    **Changes**: New in Zulip 6.0 (feature level 127). */
    updateUserGroupSubgroups(user_group_id: string, query?: UpdateUserGroupSubgroupsQuery): Promise<unknown>
    /** Get the subgroups of a [user group](/help/user-groups).

    **Changes**: New in Zulip 6.0 (feature level 127). */
    getUserGroupSubgroups(user_group_id: string, query?: GetUserGroupSubgroupsQuery): Promise<GetUserGroupSubgroupsResponse>
    /** Check whether a user is member of user group.

    **Changes**: New in Zulip 6.0 (feature level 127). */
    getIsUserGroupMember(user_group_id: string, user_id: string, query?: GetIsUserGroupMemberQuery): Promise<GetIsUserGroupMemberResponse>
    /** Outgoing webhooks allow you to build or set up Zulip integrations which are
    notified when certain types of messages are sent in Zulip. */
    zulipOutgoingWebhooks(): Promise<ZulipOutgoingWebhooksResponse>
    /** Create a video call URL for a BigBlueButton video call.
    Requires BigBlueButton to be configured on the Zulip server. */
    createBigBlueButtonVideoCall(query?: CreateBigBlueButtonVideoCallQuery): Promise<CreateBigBlueButtonVideoCallResponse>
  }

}
