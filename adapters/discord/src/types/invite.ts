import { Application, Channel, Guild, GuildScheduledEvent, Internal, Permission, User, integer, snowflake, timestamp } from '.'

/** https://discord.com/developers/docs/resources/invite#invite-object-invite-structure */
export interface Invite {
  /** the type of invite */
  type: Invite.Type
  /** the invite code (unique ID) */
  code: string
  /** the guild this invite is for */
  guild?: Partial<Guild>
  /** the channel this invite is for */
  channel: Partial<Channel> | null
  /** the user who created the invite */
  inviter?: User
  /** the type of target for this voice channel invite */
  target_type?: Invite.TargetType
  /** the user whose stream to display for this voice channel stream invite */
  target_user?: User
  /** the embedded application to open for this voice channel embedded application invite */
  target_application?: Partial<Application>
  /** approximate count of online members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true` */
  approximate_presence_count?: integer
  /** approximate count of total members, returned from the `GET /invites/<code>` endpoint when `with_counts` is `true` */
  approximate_member_count?: integer
  /** the expiration date of this invite */
  expires_at: timestamp | null
  /** guild scheduled event data, only included if `guild_scheduled_event_id` contains a valid guild scheduled event id */
  guild_scheduled_event?: GuildScheduledEvent
  /** guild invite flags for guild invites */
  flags?: integer
  /** the roles assigned to the user upon accepting the invite. */
  roles?: Partial<Permission>[]
}

export namespace Invite {
  /** https://discord.com/developers/docs/resources/invite#invite-object-invite-types */
  export enum Type {
    GUILD = 0,
    GROUP_DM = 1,
    FRIEND = 2,
  }

  /** https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types */
  export enum TargetType {
    STREAM = 1,
    EMBEDDED_APPLICATION = 2,
  }

  /** https://discord.com/developers/docs/resources/invite#invite-object-guild-invite-flags */
  export enum GuildInviteFlag {
    /** this invite is a guest invite for a voice channel */
    IS_GUEST_INVITE = 1 << 0,
  }

  /** https://discord.com/developers/docs/resources/invite#invite-metadata-object-invite-metadata-structure */
  export interface Metadata {
    /** number of times this invite has been used */
    uses: integer
    /** max number of times this invite can be used */
    max_uses: integer
    /** duration (in seconds) after which the invite expires */
    max_age: integer
    /** whether this invite only grants temporary membership */
    temporary: boolean
    /** when this invite was created */
    created_at: timestamp
  }

  /** https://discord.com/developers/docs/resources/invite#invite-stage-instance-object-invite-stage-instance-structure */
  export interface StageInstance {
    /** the members speaking in the Stage */
    members: Partial<Guild.Member>[]
    /** the number of users in the Stage */
    participant_count: integer
    /** the number of users speaking in the Stage */
    speaker_count: integer
    /** the topic of the Stage instance (1-120 characters) */
    topic: string
  }
}

/** https://discord.com/developers/docs/resources/invite#get-invite-query-string-params */
export interface GetInviteParams {
  /** whether the invite should contain approximate member counts */
  with_counts?: Boolean
  /** the guild scheduled event to include with the invite */
  guild_scheduled_event_id?: snowflake
}

/** https://discord.com/developers/docs/resources/invite#update-target-users-form-params */
export interface UpdateTargetUsersParams {
  /** a csv file with a single column of user IDs for all the users able to accept this invite */
  target_users_file: any
}

declare module './internal' {
  interface Internal {
    /**
     * Returns an invite object for the given code.
     * @see https://discord.com/developers/docs/resources/invite#get-invite
     */
    getInvite(invite_code: snowflake, params: GetInviteParams): Promise<void>
    /**
     * Delete an invite. Requires the `MANAGE_CHANNELS` permission on the channel this invite belongs to, or `MANAGE_GUILD` to remove any invite across the guild. Returns an invite object on success. Fires an Invite Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/invite#delete-invite
     */
    deleteInvite(invite_code: snowflake): Promise<void>
    /**
     * Gets the users allowed to see and accept this invite. Response is a CSV file with the header `user_id` and each user ID from the original file passed to invite create on its own line. Requires the caller to be the inviter, or have `MANAGE_GUILD` permission, or have `VIEW_AUDIT_LOG` permission.
     * @see https://discord.com/developers/docs/resources/invite#get-target-users
     */
    getTargetUsers(invite_code: snowflake): Promise<void>
    /**
     * Updates the users allowed to see and accept this invite. Uploading a file with invalid user IDs will result in a 400 with the invalid IDs described. Requires the caller to be the inviter or have the `MANAGE_GUILD` permission.
     * @see https://discord.com/developers/docs/resources/invite#update-target-users
     */
    updateTargetUsers(invite_code: snowflake, params: UpdateTargetUsersParams): Promise<void>
    /**
     * Processing target users from a CSV when creating or updating an invite is done asynchronously. This endpoint allows you to check the status of that job. Requires the caller to be the inviter, or have `MANAGE_GUILD` permission, or have `VIEW_AUDIT_LOG` permission.
     * @see https://discord.com/developers/docs/resources/invite#get-target-users-job-status
     */
    getTargetUsersJobStatus(invite_code: snowflake): Promise<void>
  }
}

Internal.define({
  '/invites/{invite.code}': {
    GET: 'getInvite',
    DELETE: 'deleteInvite',
  },
  '/invites/{invite.code}/target-users': {
    GET: 'getTargetUsers',
    PUT: 'updateTargetUsers',
  },
  '/invites/{invite.code}/target-users/job-status': {
    GET: 'getTargetUsersJobStatus',
  },
})
