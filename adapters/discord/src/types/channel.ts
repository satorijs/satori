import { Internal, User, integer, snowflake, timestamp } from '.'

/** https://discord.com/developers/docs/resources/channel#channel-object-channel-structure */
export interface Channel {
  /** the id of this channel */
  id: snowflake
  /** the type of channel */
  type: Channel.Type
  /** the id of the guild (may be missing for some channel objects received over gateway guild dispatches) */
  guild_id?: snowflake
  /** sorting position of the channel (channels with the same position are sorted by id) */
  position?: integer
  /** explicit permission overwrites for members and roles */
  permission_overwrites?: Overwrite[]
  /** the name of the channel (1-100 characters) */
  name?: string | null
  /** the channel topic (0-4096 characters for `GUILD_FORUM` and `GUILD_MEDIA` channels, 0-1024 characters for all others) */
  topic?: string | null
  /** whether the channel is age-restricted */
  nsfw?: boolean
  /** the id of the last message sent in this channel (or thread for `GUILD_FORUM` or `GUILD_MEDIA` channels) (may not point to an existing or valid message or thread) */
  last_message_id?: snowflake | null
  /** the bitrate (in bits per second) of the voice channel */
  bitrate?: integer
  /** the user limit of the voice channel */
  user_limit?: integer
  /** amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission `BYPASS_SLOWMODE`, are unaffected */
  rate_limit_per_user?: integer
  /** the recipients of the DM */
  recipients?: User[]
  /** icon hash of the group DM */
  icon?: string | null
  /** id of the creator of the group DM or thread */
  owner_id?: snowflake
  /** application id of the group DM creator if it is bot-created */
  application_id?: snowflake
  /** for group DM channels: whether the channel is managed by an application via the `gdm.join` OAuth2 scope */
  managed?: boolean
  /** for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created */
  parent_id?: snowflake | null
  /** when the last pinned message was pinned. This may be `null` in events such as `GUILD_CREATE` when a message is not pinned. */
  last_pin_timestamp?: timestamp | null
  /** voice region id for the voice channel, automatic when set to null */
  rtc_region?: string | null
  /** the camera video quality mode of the voice channel, 1 when not present */
  video_quality_mode?: integer
  /** number of messages (not including the initial message or deleted messages) in a thread. */
  message_count?: integer
  /** an approximate count of users in a thread, stops counting at 50 */
  member_count?: integer
  /** thread-specific fields not needed by other channels */
  thread_metadata?: AThreadMetadata
  /** thread member object for the current user, if they have joined the thread, only included on certain API endpoints */
  member?: AThreadMember
  /** default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080 */
  default_auto_archive_duration?: integer
  /** computed permissions for the invoking user in the channel, including overwrites, only included when part of the `resolved` data received on an interaction. This does not include implicit permissions, which may need to be checked separately */
  permissions?: string
  /** channel flags combined as a bitfield */
  flags?: integer
  /** number of messages ever sent in a thread, it's similar to `message_count` on message creation, but will not decrement the number when a message is deleted */
  total_message_sent?: integer
  /** the set of tags that can be used in a `GUILD_FORUM` or a `GUILD_MEDIA` channel */
  available_tags?: Tag[]
  /** the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel */
  applied_tags?: Snowflakes[]
  /** the emoji to show in the add reaction button on a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel */
  default_reaction_emoji?: DefaultReaction | null
  /** the initial `rate_limit_per_user` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. */
  default_thread_rate_limit_per_user?: integer
  /** the default sort order type used to order posts in `GUILD_FORUM` and `GUILD_MEDIA` channels. Defaults to `null`, which indicates a preferred sort order hasn't been set by a channel admin */
  default_sort_order?: Channel.SortOrderType | null
  /** the default forum layout view used to display posts in `GUILD_FORUM` channels. Defaults to `0`, which indicates a layout view has not been set by a channel admin */
  default_forum_layout?: integer
}

export namespace Channel {
  /** https://discord.com/developers/docs/resources/channel#channel-object-channel-types */
  export enum Type {
    /** a text channel within a server */
    GUILD_TEXT = 0,
    /** a direct message between users */
    DM = 1,
    /** a voice channel within a server */
    GUILD_VOICE = 2,
    /** a direct message between multiple users */
    GROUP_DM = 3,
    /** an organizational category that contains up to 50 channels */
    GUILD_CATEGORY = 4,
    /** a channel that users can follow and crosspost into their own server (formerly news channels) */
    GUILD_ANNOUNCEMENT = 5,
    /** a temporary sub-channel within a GUILD_ANNOUNCEMENT channel */
    ANNOUNCEMENT_THREAD = 10,
    /** a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel */
    PUBLIC_THREAD = 11,
    /** a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission */
    PRIVATE_THREAD = 12,
    /** a voice channel for hosting events with an audience */
    GUILD_STAGE_VOICE = 13,
    /** the channel in a hub containing the listed servers */
    GUILD_DIRECTORY = 14,
    /** Channel that can only contain threads */
    GUILD_FORUM = 15,
    /** Channel that can only contain threads, similar to `GUILD_FORUM` channels */
    GUILD_MEDIA = 16,
  }

  /** https://discord.com/developers/docs/resources/channel#channel-object-channel-flags */
  export enum Flag {
    /** this thread is pinned to the top of its parent `GUILD_FORUM` or `GUILD_MEDIA` channel */
    PINNED = 1 << 1,
    /** whether a tag is required to be specified when creating a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel. Tags are specified in the `applied_tags` field. */
    REQUIRE_TAG = 1 << 4,
    /** when set hides the embedded media download options. Available only for media channels */
    HIDE_MEDIA_DOWNLOAD_OPTIONS = 1 << 15,
  }

  /** https://discord.com/developers/docs/resources/channel#channel-object-sort-order-types */
  export enum SortOrderType {
    /** Sort forum posts by activity */
    LATEST_ACTIVITY = 0,
    /** Sort forum posts by creation time (from most recent to oldest) */
    CREATION_DATE = 1,
  }

  /** https://discord.com/developers/docs/resources/channel#channel-object-forum-layout-types */
  export enum ForumLayoutType {
    /** No default has been set for forum channel */
    NOT_SET = 0,
    /** Display posts as a list */
    LIST_VIEW = 1,
    /** Display posts as a collection of tiles */
    GALLERY_VIEW = 2,
  }

  /** https://discord.com/developers/docs/resources/channel#followed-channel-object-followed-channel-structure */
  export interface FollowedChannel {
    /** source channel id */
    channel_id: snowflake
    /** created target webhook id */
    webhook_id: snowflake
  }

  /** https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure */
  export interface Overwrite {
    /** role or user id */
    id: snowflake
    /** either 0 (role) or 1 (member) */
    type: integer
    /** permission bit set */
    allow: string
    /** permission bit set */
    deny: string
  }

  /** https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure */
  export interface ThreadMetadata {
    /** whether the thread is archived */
    archived: boolean
    /** the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 */
    auto_archive_duration: integer
    /** timestamp when the thread's archive status was last changed, used for calculating recent activity */
    archive_timestamp: timestamp
    /** whether the thread is locked; when a thread is locked, only users with MANAGE_THREADS can unarchive it */
    locked: boolean
    /** whether non-moderators can add other non-moderators to a thread; only available on private threads */
    invitable?: boolean
    /** timestamp when the thread was created; only populated for threads created after 2022-01-09 */
    create_timestamp?: timestamp | null
  }

  /** https://discord.com/developers/docs/resources/channel#thread-member-object-thread-member-structure */
  export interface ThreadMember {
    /** ID of the thread */
    id?: snowflake
    /** ID of the user */
    user_id?: snowflake
    /** Time the user last joined the thread */
    join_timestamp: timestamp
    /** Any user-thread settings, currently only used for notifications */
    flags: integer
    /** Additional information about the user */
    member?: GuildMember
  }

  /** https://discord.com/developers/docs/resources/channel#default-reaction-object-default-reaction-structure */
  export interface DefaultReaction {
    /** the id of a guild's custom emoji */
    emoji_id: snowflake | null
    /** the unicode character of the emoji */
    emoji_name: string | null
  }

  /** https://discord.com/developers/docs/resources/channel#forum-tag-object-forum-tag-structure */
  export interface ForumTag {
    /** the id of the tag */
    id: snowflake
    /** the name of the tag (0-20 characters) */
    name: string
    /** whether this tag can only be added to or removed from threads by a member with the `MANAGE_THREADS` permission */
    moderated: boolean
    /** the id of a guild's custom emoji \* */
    emoji_id: snowflake | null
    /** the unicode character of the emoji \* */
    emoji_name: string | null
  }

  export namespace Params {
    /** https://discord.com/developers/docs/resources/channel#edit-channel-permissions-json-params */
    export interface Modify {
      /** the bitwise value of all allowed permissions (default `"0"`) */
      allow?: String?
      /** the bitwise value of all disallowed permissions (default `"0"`) */
      deny?: String?
      /** 0 for a role or 1 for a member */
      type: integer
    }

    /** https://discord.com/developers/docs/resources/channel#create-channel-invite-jsonform-params */
    export interface Create {
      /** duration of invite in seconds before expiry, or 0 for never. between 0 and 604800 (7 days) */
      max_age: integer
      /** max number of uses or 0 for unlimited. between 0 and 100 */
      max_uses: integer
      /** whether this invite only grants temporary membership */
      temporary: boolean
      /** if true, don't try to reuse a similar invite (useful for creating many unique one time use invites) */
      unique: boolean
      /** the type of target for this voice channel invite */
      target_type: integer
      /** the id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel */
      target_user_id: snowflake
      /** the id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag */
      target_application_id: snowflake
      /** a csv file with a single column of user IDs for all the users able to accept this invite */
      target_users_file?: any
      /** JSON-encoded body of non-file params, only for `multipart/form-data` requests. */
      payload_json?: string
      /** the role ID(s) for roles in the guild given to the users that accept this invite */
      role_ids?: Snowflakes[]
    }

    /** https://discord.com/developers/docs/resources/channel#follow-announcement-channel-json-params */
    export interface FollowAnnouncementChannel {
      /** id of target channel */
      webhook_channel_id: snowflake
    }

    /** https://discord.com/developers/docs/resources/channel#group-dm-add-recipient-json-params */
    export interface GroupDmAddRecipient {
      /** access token of a user that has granted your app the `gdm.join` scope */
      access_token: string
      /** nickname of the user being added */
      nick: string
    }

    /** https://discord.com/developers/docs/resources/channel#start-thread-from-message-json-params */
    export interface StartThreadFromMessage {
      /** 1-100 character channel name */
      name: string
      /** the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 */
      auto_archive_duration?: integer
      /** amount of seconds a user has to wait before sending another message (0-21600) */
      rate_limit_per_user?: integer | null
    }

    /** https://discord.com/developers/docs/resources/channel#start-thread-without-message-json-params */
    export interface StartThreadWithoutMessage {
      /** 1-100 character channel name */
      name: string
      /** the thread will stop showing in the channel list after `auto_archive_duration` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 */
      auto_archive_duration?: integer
      /** the type of thread to create */
      type?: integer
      /** whether non-moderators can add other non-moderators to a thread; only available when creating a private thread */
      invitable?: boolean
      /** amount of seconds a user has to wait before sending another message (0-21600) */
      rate_limit_per_user?: integer | null
    }

    /** https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel-jsonform-params */
    export interface StartThreadInForumOrMediaChannel {
      /** 1-100 character channel name */
      name: string
      /** duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
      auto_archive_duration?: integer
      /** amount of seconds a user has to wait before sending another message (0-21600) */
      rate_limit_per_user?: integer | null
      /** contents of the first message in the forum/media thread */
      message: AForumThreadMessageParams
      /** the IDs of the set of tags that have been applied to a thread in a `GUILD_FORUM` or a `GUILD_MEDIA` channel */
      applied_tags?: Snowflakes[]
      /** Contents of the file being sent. See Uploading Files */
      files[n]?: any
      /** JSON-encoded body of non-file params, only for `multipart/form-data` requests. See Uploading Files */
      payload_json?: string
    }

    /** https://discord.com/developers/docs/resources/channel#get-thread-member-query-string-params */
    export interface GetThreadMember {
      /** Whether to include a guild member object for the thread member */
      with_member?: boolean
    }

    /** https://discord.com/developers/docs/resources/channel#list-thread-members-query-string-params */
    export interface ListThreadMembers {
      /** Whether to include a guild member object for each thread member */
      with_member?: boolean
      /** Get thread members after this user ID */
      after?: snowflake
      /** Max number of thread members to return (1-100). Defaults to 100. */
      limit?: integer
    }

    /** https://discord.com/developers/docs/resources/channel#list-public-archived-threads-query-string-params */
    export interface ListPublicArchivedThreads {
      /** returns threads archived before this timestamp */
      before?: timestamp
      /** optional maximum number of threads to return */
      limit?: integer
    }

    /** https://discord.com/developers/docs/resources/channel#list-private-archived-threads-query-string-params */
    export interface ListPrivateArchivedThreads {
      /** returns threads archived before this timestamp */
      before?: timestamp
      /** optional maximum number of threads to return */
      limit?: integer
    }

    /** https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads-query-string-params */
    export interface ListJoinedPrivateArchivedThreads {
      /** returns threads before this id */
      before?: snowflake
      /** optional maximum number of threads to return */
      limit?: integer
    }

  }
}

declare module './internal' {
  interface Internal {
    /**
     * Get a channel by ID. Returns a channel object.  If the channel is a thread, a thread member object is included in the returned result.
     * @see https://discord.com/developers/docs/resources/channel#get-channel
     */
    getChannel(channel_id: snowflake): Promise<Channel>
    /**
     * Update a channel's settings. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters.
     * @see https://discord.com/developers/docs/resources/channel#modify-channel
     */
    modifyChannel(channel_id: snowflake): Promise<void>
    /**
     * Delete a channel, or close a private message. Requires the `MANAGE_CHANNELS` permission for the guild, or `MANAGE_THREADS` if the channel is a thread. Deleting a category does not delete its child channels; they will have their `parent_id` removed and a Channel Update Gateway event will fire for each of them. Returns a channel object on success. Fires a Channel Delete Gateway event (or Thread Delete if the channel was a thread).
     * @see https://discord.com/developers/docs/resources/channel#delete/close-channel
     */
    delete/closeChannel(channel_id: snowflake): Promise<Channel>
    /**
     * Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires the `MANAGE_ROLES` permission. Only permissions your bot has in the guild or parent channel (if applicable) can be allowed/denied (unless your bot has a `MANAGE_ROLES` overwrite in the channel). Returns a 204 empty response on success. Fires a Channel Update Gateway event. For more information about permissions, see permissions.
     * @see https://discord.com/developers/docs/resources/channel#edit-channel-permissions
     */
    editChannelPermissions(channel_id: snowflake, overwrite_id: snowflake, params: Channel.Params.Modify): Promise<void>
    /**
     * Returns a list of invite objects (with invite metadata) for the channel. Only usable for guild channels. Requires the `MANAGE_CHANNELS` permission.
     * @see https://discord.com/developers/docs/resources/channel#get-channel-invites
     */
    getChannelInvites(channel_id: snowflake): Promise<ListOfInvite>
    /**
     * Create a new invite object for the channel. Only usable for guild channels. Requires the `CREATE_INSTANT_INVITE` permission. All JSON parameters for this route are optional, however the request body is not. If you are not sending any fields, you still have to send an empty JSON object (`{}`). Returns an invite object. Fires an Invite Create Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#create-channel-invite
     */
    createChannelInvite(channel_id: snowflake, params: Channel.Params.Create): Promise<void>
    /**
     * Delete a channel permission overwrite for a user or role in a channel. Only usable for guild channels. Requires the `MANAGE_ROLES` permission. Returns a 204 empty response on success. Fires a Channel Update Gateway event. For more information about permissions, see permissions
     * @see https://discord.com/developers/docs/resources/channel#delete-channel-permission
     */
    deleteChannelPermission(channel_id: snowflake, overwrite_id: snowflake): Promise<void>
    /**
     * Follow an Announcement Channel to send messages to a target channel. Requires the `MANAGE_WEBHOOKS` permission in the target channel. Returns a followed channel object. Fires a Webhooks Update Gateway event for the target channel.
     * @see https://discord.com/developers/docs/resources/channel#follow-announcement-channel
     */
    followAnnouncementChannel(channel_id: snowflake, params: Channel.Params.Params): Promise<FollowedChannel>
    /**
     * Post a typing indicator for the specified channel, which expires after 10 seconds. Returns a 204 empty response on success. Fires a Typing Start Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#trigger-typing-indicator
     */
    triggerTypingIndicator(channel_id: snowflake): Promise<void>
    /**
     * Adds a recipient to a Group DM using their access token.
     * @see https://discord.com/developers/docs/resources/channel#group-dm-add-recipient
     */
    groupDmAddRecipient(channel_id: snowflake, user_id: snowflake, params: Channel.Params.Params): Promise<void>
    /**
     * Removes a recipient from a Group DM.
     * @see https://discord.com/developers/docs/resources/channel#group-dm-remove-recipient
     */
    groupDmRemoveRecipient(channel_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Creates a new thread from an existing message. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create and a Message Update Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#start-thread-from-message
     */
    startThreadFromMessage(channel_id: snowflake, message_id: snowflake, params: Channel.Params.Params): Promise<void>
    /**
     * Creates a new thread that is not connected to an existing message. Returns a channel on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#start-thread-without-message
     */
    startThreadWithoutMessage(channel_id: snowflake, params: Channel.Params.Params): Promise<void>
    /**
     * Creates a new thread in a forum or a media channel, and sends a message within the created thread. Returns a channel, with a nested message object, on success, and a 400 BAD REQUEST on invalid parameters. Fires a Thread Create and Message Create Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#start-thread-in-forum-or-media-channel
     */
    startThreadInForumOrMediaChannel(channel_id: snowflake, params: Channel.Params.Params): Promise<Channel,WithANestedMessage>
    /**
     * Adds the current user to a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update and a Thread Create Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#join-thread
     */
    joinThread(channel_id: snowflake): Promise<void>
    /**
     * Adds another member to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response if the member is successfully added or was already a member of the thread. Fires a Thread Members Update Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#add-thread-member
     */
    addThreadMember(channel_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Removes the current user from a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#leave-thread
     */
    leaveThread(channel_id: snowflake): Promise<void>
    /**
     * Removes another member from a thread. Requires the `MANAGE_THREADS` permission, or the creator of the thread if it is a `PRIVATE_THREAD`. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a Thread Members Update Gateway event.
     * @see https://discord.com/developers/docs/resources/channel#remove-thread-member
     */
    removeThreadMember(channel_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Returns a thread member object for the specified user if they are a member of the thread, returns a 404 response otherwise.
     * @see https://discord.com/developers/docs/resources/channel#get-thread-member
     */
    getThreadMember(channel_id: snowflake, user_id: snowflake, params: Channel.Params.Params): Promise<ThreadMember>
    /**
     * <Warning>
     * @see https://discord.com/developers/docs/resources/channel#list-thread-members
     */
    listThreadMembers(channel_id: snowflake, params: Channel.Params.Params): Promise<void>
    /**
     * Returns archived threads in the channel that are public. When called on a `GUILD_TEXT` channel, returns threads of type `PUBLIC_THREAD`. When called on a `GUILD_ANNOUNCEMENT` channel returns threads of type `ANNOUNCEMENT_THREAD`. Threads are ordered by `archive_timestamp`, in descending order. Requires the `READ_MESSAGE_HISTORY` permission.
     * @see https://discord.com/developers/docs/resources/channel#list-public-archived-threads
     */
    listPublicArchivedThreads(channel_id: snowflake, params: Channel.Params.Params): Promise<void>
    /**
     * Returns archived threads in the channel that are of type `PRIVATE_THREAD`. Threads are ordered by `archive_timestamp`, in descending order. Requires both the `READ_MESSAGE_HISTORY` and `MANAGE_THREADS` permissions.
     * @see https://discord.com/developers/docs/resources/channel#list-private-archived-threads
     */
    listPrivateArchivedThreads(channel_id: snowflake, params: Channel.Params.Params): Promise<void>
    /**
     * Returns archived threads in the channel that are of type `PRIVATE_THREAD`, and the user has joined. Threads are ordered by their `id`, in descending order. Requires the `READ_MESSAGE_HISTORY` permission.
     * @see https://discord.com/developers/docs/resources/channel#list-joined-private-archived-threads
     */
    listJoinedPrivateArchivedThreads(channel_id: snowflake, params: Channel.Params.Params): Promise<void>
  }
}

Internal.define({
  '/channels/{channel.id}': {
    GET: 'getChannel',
    PATCH: 'modifyChannel',
    DELETE: 'delete/closeChannel',
  },
  '/channels/{channel.id}/permissions/{overwrite.id}': {
    PUT: 'editChannelPermissions',
    DELETE: 'deleteChannelPermission',
  },
  '/channels/{channel.id}/invites': {
    GET: 'getChannelInvites',
    POST: { name: 'createChannelInvite', multipart: true },
  },
  '/channels/{channel.id}/followers': {
    POST: 'followAnnouncementChannel',
  },
  '/channels/{channel.id}/typing': {
    POST: 'triggerTypingIndicator',
  },
  '/channels/{channel.id}/recipients/{user.id}': {
    PUT: 'groupDmAddRecipient',
    DELETE: 'groupDmRemoveRecipient',
  },
  '/channels/{channel.id}/messages/{message.id}/threads': {
    POST: 'startThreadFromMessage',
  },
  '/channels/{channel.id}/threads': {
    POST: { name: 'startThreadInForumOrMediaChannel', multipart: true },
  },
  '/channels/{channel.id}/thread-members/@me': {
    PUT: 'joinThread',
    DELETE: 'leaveThread',
  },
  '/channels/{channel.id}/thread-members/{user.id}': {
    PUT: 'addThreadMember',
    DELETE: 'removeThreadMember',
    GET: 'getThreadMember',
  },
  '/channels/{channel.id}/thread-members': {
    GET: 'listThreadMembers',
  },
  '/channels/{channel.id}/threads/archived/public': {
    GET: 'listPublicArchivedThreads',
  },
  '/channels/{channel.id}/threads/archived/private': {
    GET: 'listPrivateArchivedThreads',
  },
  '/channels/{channel.id}/users/@me/threads/archived/private': {
    GET: 'listJoinedPrivateArchivedThreads',
  },
})
