import { Internal, snowflake, User } from '.'

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface Emoji {
  /** emoji id */
  id?: snowflake
  /** emoji name */
  name?: string
  /** roles allowed to use this emoji */
  roles?: snowflake[]
  /** user that created this emoji */
  user?: User
  /** whether this emoji must be wrapped in colons */
  require_colons?: boolean
  /** whether this emoji is managed */
  managed?: boolean
  /** whether this emoji is animated */
  animated?: boolean
  /** whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean
}

export namespace Emoji {
  export namespace Event {
    /** https://discord.com/developers/docs/topics/gateway-events#guild-emojis-update-guild-emojis-update-event-fields */
    export interface Update {
      /** id of the guild */
      guild_id: snowflake
      /** array of emojis */
      emojis: Emoji[]
    }
  }

  /** https://discord.com/developers/docs/resources/emoji#create-guild-emoji-json-params */
  export interface CreateParams extends ModifyParams {
    /** the 128x128 emoji image */
    image: string
  }

  /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji-json-params */
  export interface ModifyParams {
    /** name of the emoji */
    name?: string
    /** array of snowflakes roles allowed to use this emoji */
    roles?: snowflake[]
  }
}

declare module './gateway' {
  interface GatewayEvents {
    /** guild emojis were updated */
    GUILD_EMOJIS_UPDATE: Emoji.Event.Update
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns a list of emoji objects for the given guild.
     * @see https://discord.com/developers/docs/resources/emoji#list-guild-emojis
     */
    listGuildEmojis(guild_id: snowflake): Promise<Emoji[]>
    /**
     * Returns an emoji object for the given guild and emoji IDs.
     * @see https://discord.com/developers/docs/resources/emoji#get-guild-emoji
     */
    getGuildEmoji(guild_id: snowflake, emoji_id: snowflake): Promise<Emoji>
    /**
     * Create a new emoji for the guild. Requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns the new emoji object on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    createGuildEmoji(guild_id: snowflake, options: Emoji.CreateParams): Promise<Emoji>
    /**
     * Modify the given emoji. Requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns the updated emoji object on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
     */
    modifyGuildEmoji(guild_id: snowflake, emoji_id: snowflake, options: Emoji.ModifyParams): Promise<Emoji>
    /**
     * Delete the given emoji. Requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns 204 No Content on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#delete-guild-emoji
     */
    deleteGuildEmoji(guild_id: snowflake, emoji_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/guilds/{guild.id}/emojis': {
    GET: 'listGuildEmojis',
    POST: 'createGuildEmoji',
  },
  '/guilds/{guild.id}/emojis/{emoji.id}': {
    GET: 'getGuildEmoji',
    PATCH: 'modifyGuildEmoji',
    DELETE: 'deleteGuildEmoji',
  },
})
