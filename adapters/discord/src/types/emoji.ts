import { Internal, User, snowflake } from '.'

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface Emoji {
  /** emoji id */
  id: snowflake | null
  /** emoji name */
  name: String(canBeNullOnlyInReactionEmojiObjects) | null
  /** roles allowed to use this emoji */
  roles?: RoleObjectIds[]
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
  export namespace Params {
    /** https://discord.com/developers/docs/resources/emoji#create-guild-emoji-json-params */
    export interface Create {
      /** name of the emoji */
      name: string
      /** the 128x128 emoji image */
      image: ImageData
      /** roles allowed to use this emoji */
      roles: Snowflakes[]
    }

    /** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji-json-params */
    export interface Modify {
      /** name of the emoji */
      name: string
      /** roles allowed to use this emoji */
      roles: Snowflakes[] | null
    }

    /** https://discord.com/developers/docs/resources/emoji#create-application-emoji-json-params */
    export interface Create {
      /** name of the emoji */
      name: string
      /** the 128x128 emoji image */
      image: ImageData
    }

    /** https://discord.com/developers/docs/resources/emoji#modify-application-emoji-json-params */
    export interface Modify {
      /** name of the emoji */
      name: string
    }

  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns a list of emoji objects for the given guild. Includes `user` fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
     * @see https://discord.com/developers/docs/resources/emoji#list-guild-emojis
     */
    listGuildEmojis(guild_id: snowflake): Promise<ListOfEmoji>
    /**
     * Returns an emoji object for the given guild and emoji IDs. Includes the `user` field if the bot has the `MANAGE_GUILD_EXPRESSIONS` permission, or if the bot created the emoji and has the `CREATE_GUILD_EXPRESSIONS` permission.
     * @see https://discord.com/developers/docs/resources/emoji#get-guild-emoji
     */
    getGuildEmoji(guild_id: snowflake, emoji_id: snowflake): Promise<void>
    /**
     * Create a new emoji for the guild. Requires the `CREATE_GUILD_EXPRESSIONS` permission. Returns the new emoji object on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
     */
    createGuildEmoji(guild_id: snowflake, params: Emoji.Params.Create): Promise<Emoji>
    /**
     * Modify the given emoji. For emojis created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission. For other emojis, requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns the updated emoji object on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
     */
    modifyGuildEmoji(guild_id: snowflake, emoji_id: snowflake, params: Emoji.Params.Modify): Promise<Emoji>
    /**
     * Delete the given emoji. For emojis created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission. For other emojis, requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns `204 No Content` on success. Fires a Guild Emojis Update Gateway event.
     * @see https://discord.com/developers/docs/resources/emoji#delete-guild-emoji
     */
    deleteGuildEmoji(guild_id: snowflake, emoji_id: snowflake): Promise<void>
    /**
     * Returns an object containing a list of emoji objects for the given application under the `items` key. Includes a `user` object for the team member that uploaded the emoji from the app's settings, or for the bot user if uploaded using the API.
     * @see https://discord.com/developers/docs/resources/emoji#list-application-emojis
     */
    listApplicationEmojis(application_id: snowflake): Promise<void>
    /**
     * Returns an emoji object for the given application and emoji IDs. Includes the `user` field.
     * @see https://discord.com/developers/docs/resources/emoji#get-application-emoji
     */
    getApplicationEmoji(application_id: snowflake, emoji_id: snowflake): Promise<void>
    /**
     * Create a new emoji for the application. Returns the new emoji object on success.
     * @see https://discord.com/developers/docs/resources/emoji#create-application-emoji
     */
    createApplicationEmoji(application_id: snowflake, params: Emoji.Params.Create): Promise<Emoji>
    /**
     * Modify the given emoji. Returns the updated emoji object on success.
     * @see https://discord.com/developers/docs/resources/emoji#modify-application-emoji
     */
    modifyApplicationEmoji(application_id: snowflake, emoji_id: snowflake, params: Emoji.Params.Modify): Promise<Emoji>
    /**
     * Delete the given emoji. Returns `204 No Content` on success.
     * @see https://discord.com/developers/docs/resources/emoji#delete-application-emoji
     */
    deleteApplicationEmoji(application_id: snowflake, emoji_id: snowflake): Promise<void>
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
  '/applications/{application.id}/emojis': {
    GET: 'listApplicationEmojis',
    POST: 'createApplicationEmoji',
  },
  '/applications/{application.id}/emojis/{emoji.id}': {
    GET: 'getApplicationEmoji',
    PATCH: 'modifyApplicationEmoji',
    DELETE: 'deleteApplicationEmoji',
  },
})
