import { integer, Internal, snowflake } from '.'

// https://github.com/microsoft/TypeScript/issues/37783
/** https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags */
export const Permission = {
  /** Allows creation of instant invites */
  CREATE_INSTANT_INVITE: 1n << 0n,
  /** Allows kicking members */
  KICK_MEMBERS: 1n << 1n,
  /** Allows banning members */
  BAN_MEMBERS: 1n << 2n,
  /** Allows all permissions and bypasses channel permission overwrites */
  ADMINISTRATOR: 1n << 3n,
  /** Allows management and editing of channels */
  MANAGE_CHANNELS: 1n << 4n,
  /** Allows management and editing of the guild */
  MANAGE_GUILD: 1n << 5n,
  /** Allows for the addition of reactions to messages */
  ADD_REACTIONS: 1n << 6n,
  /** Allows for viewing of audit logs */
  VIEW_AUDIT_LOG: 1n << 7n,
  /** Allows for using priority speaker in a voice channel */
  PRIORITY_SPEAKER: 1n << 8n,
  /** Allows the user to go live */
  STREAM: 1n << 9n,
  /** Allows guild members to view a channel, which includes reading messages in text channels */
  VIEW_CHANNEL: 1n << 10n,
  /** Allows for sending messages in a channel (does not allow sending messages in threads) */
  SEND_MESSAGES: 1n << 11n,
  /** Allows for sending of /tts messages */
  SEND_TTS_MESSAGES: 1n << 12n,
  /** Allows for deletion of other users messages */
  MANAGE_MESSAGES: 1n << 13n,
  /** Links sent by users with this permission will be auto-embedded */
  EMBED_LINKS: 1n << 14n,
  /** Allows for uploading images and files */
  ATTACH_FILES: 1n << 15n,
  /** Allows for reading of message history */
  READ_MESSAGE_HISTORY: 1n << 16n,
  /** Allows for using the @everyone tag to notify all users in a channel, and the @here tag to notify all online users in a channel */
  MENTION_EVERYONE: 1n << 17n,
  /** Allows the usage of custom emojis from other servers */
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  /** Allows for viewing guild insights */
  VIEW_GUILD_INSIGHTS: 1n << 19n,
  /** Allows for joining of a voice channel */
  CONNECT: 1n << 20n,
  /** Allows for speaking in a voice channel */
  SPEAK: 1n << 21n,
  /** Allows for muting members in a voice channel */
  MUTE_MEMBERS: 1n << 22n,
  /** Allows for deafening of members in a voice channel */
  DEAFEN_MEMBERS: 1n << 23n,
  /** Allows for moving of members between voice channels */
  MOVE_MEMBERS: 1n << 24n,
  /** Allows for using voice-activity-detection in a voice channel */
  USE_VAD: 1n << 25n,
  /** Allows for modification of own nickname */
  CHANGE_NICKNAME: 1n << 26n,
  /** Allows for modification of other users nicknames */
  MANAGE_NICKNAMES: 1n << 27n,
  /** Allows management and editing of roles */
  MANAGE_ROLES: 1n << 28n,
  /** Allows management and editing of webhooks */
  MANAGE_WEBHOOKS: 1n << 29n,
  /** Allows management and editing of emojis and stickers */
  MANAGE_EMOJIS_AND_STICKERS: 1n << 30n,
  /** Allows members to use application commands, including slash commands and context menu commands. */
  USE_APPLICATION_COMMANDS: 1n << 31n,
  /** Allows for requesting to speak in stage channels. (This permission is under active development and may be changed or removed.) */
  REQUEST_TO_SPEAK: 1n << 32n,
  /** Allows for deleting and archiving threads, and viewing all private threads */
  MANAGE_THREADS: 1n << 34n,
  /** Allows for creating threads */
  CREATE_PUBLIC_THREADS: 1n << 35n,
  /** Allows for creating private threads */
  CREATE_PRIVATE_THREADS: 1n << 36n,
  /** Allows the usage of custom stickers from other servers */
  USE_EXTERNAL_STICKERS: 1n << 37n,
  /** Allows for sending messages in threads */
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
  /** Allows for launching activities (applications with the EMBEDDED flag) in a voice channel */
  START_EMBEDDED_ACTIVITIES: 1n << 39n,
  /** Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels */
  MODERATE_MEMBERS: 1n << 40n,
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-structure */
export interface Role {
  /** role id */
  id: snowflake
  /** role name */
  name: string
  /** integer representation of hexadecimal color code */
  color: integer
  /** if this role is pinned in the user listing */
  hoist: boolean
  /** role icon hash */
  icon?: string
  /** role unicode emoji */
  unicode_emoji?: string
  /** position of this role */
  position: integer
  /** permission bit set */
  permissions: string
  /** whether this role is managed by an integration */
  managed: boolean
  /** whether this role is mentionable */
  mentionable: boolean
  /** the tags this role has */
  tags?: RoleTags
}

export namespace Role {
  export namespace Params {
    /** https://discord.com/developers/docs/resources/guild#create-guild-role-json-params */
    export interface Create {
      /** name of the role */
      name?: string
      /** bitwise value of the enabled/disabled permissions */
      permissions?: string
      /** RGB color value */
      color?: integer
      /** whether the role should be displayed separately in the sidebar */
      hoist?: boolean
      /** the role's icon image (if the guild has the ROLE_ICONS feature) */
      icon?: string
      /** the role's unicode emoji as a standard emoji (if the guild has the ROLE_ICONS feature) */
      unicode_emoji?: string
      /** whether the role should be mentionable */
      mentionable?: boolean
    }

    /** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions-json-params */
    export interface ModifyPositions {
      /** role */
      id: snowflake
      /** sorting position of the role */
      position?: integer
    }

    /** https://discord.com/developers/docs/resources/guild#modify-guild-role-json-params */
    export interface Modify {
      /** name of the role */
      name?: string
      /** bitwise value of the enabled/disabled permissions */
      permissions?: string
      /** RGB color value */
      color?: integer
      /** whether the role should be displayed separately in the sidebar */
      hoist?: boolean
      /** the role's icon image (if the guild has the ROLE_ICONS feature) */
      icon?: string
      /** the role's unicode emoji as a standard emoji (if the guild has the ROLE_ICONS feature) */
      unicode_emoji?: string
      /** whether the role should be mentionable */
      mentionable?: boolean
    }
  }
}

/** https://discord.com/developers/docs/topics/permissions#role-object-role-tags-structure */
export interface RoleTags {
  /** the id of the bot this role belongs to */
  bot_id?: snowflake
  /** the id of the integration this role belongs to */
  integration_id?: snowflake
  /** whether this is the guild's premium subscriber role */
  premium_subscriber?: null
  /** the id of this role's subscription sku and listing */
  subscription_listing_id?: snowflake
  /** whether this role is available for purchase */
  available_for_purchase?: null
  /** whether this role is a guild's linked role */
  guild_connections?: null
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-role-create-guild-role-create-event-fields */
export interface GuildRoleCreateEvent {
  /** the id of the guild */
  guild_id: snowflake
  /** the role created */
  role: Role
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-role-update-guild-role-update-event-fields */
export interface GuildRoleUpdateEvent {
  /** the id of the guild */
  guild_id: snowflake
  /** the role updated */
  role: Role
}

/** https://discord.com/developers/docs/topics/gateway-events#guild-role-delete-guild-role-delete-event-fields */
export interface GuildRoleDeleteEvent {
  /** id of the guild */
  guild_id: snowflake
  /** id of the role */
  role_id: snowflake
}

declare module './gateway' {
  interface GatewayEvents {
    /** guild role was created */
    GUILD_ROLE_CREATE: GuildRoleCreateEvent
    /** guild role was updated */
    GUILD_ROLE_UPDATE: GuildRoleUpdateEvent
    /** guild role was deleted */
    GUILD_ROLE_DELETE: GuildRoleDeleteEvent
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns a list of role objects for the guild.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-roles
     */
    getGuildRoles(guild_id: snowflake): Promise<Role[]>
    /**
     * Create a new role for the guild. Requires the MANAGE_ROLES permission. Returns the new role object on success. Fires a Guild Role Create Gateway event. All JSON params are optional.
     * @see https://discord.com/developers/docs/resources/guild#create-guild-role
     */
    createGuildRole(guild_id: snowflake, param: Role.Params.Create): Promise<Role>
    /**
     * Modify the positions of a set of role objects for the guild. Requires the MANAGE_ROLES permission. Returns a list of all of the guild's role objects on success. Fires multiple Guild Role Update Gateway events.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role-positions
     */
    modifyGuildRolePositions(guild_id: snowflake, param: Role.Params.ModifyPositions): Promise<Role[]>
    /**
     * Returns a role object for the specified role.
     * @see https://discord.com/developers/docs/resources/guild#get-guild-role
     */
    getGuildRole(guild_id: snowflake, role_id: snowflake): Promise<Role>
    /**
     * Modify a guild role. Requires the MANAGE_ROLES permission. Returns the updated role on success. Fires a Guild Role Update Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#modify-guild-role
     */
    modifyGuildRole(guild_id: snowflake, role_id: snowflake, param: Role.Params.Modify): Promise<Role>
    /**
     * Delete a guild role. Requires the MANAGE_ROLES permission. Returns a 204 empty response on success. Fires a Guild Role Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
     */
    deleteGuildRole(guild_id: snowflake, role_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/guilds/{guild.id}/roles': {
    GET: 'getGuildRoles',
    POST: 'createGuildRole',
    PATCH: 'modifyGuildRolePositions',
  },
  '/guilds/{guild.id}/roles/{role.id}': {
    GET: 'getGuildRole',
    PATCH: 'modifyGuildRole',
    DELETE: 'deleteGuildRole',
  },
})
