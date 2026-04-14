import { integer, Internal, snowflake, User } from '.'

/** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-structure */
export interface Sticker {
  /** id of the sticker */
  id: snowflake
  /** for standard stickers, id of the pack the sticker is from */
  pack_id?: snowflake
  /** name of the sticker */
  name: string
  /** description of the sticker */
  description: string | null
  /** autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags: string
  /** type of sticker */
  type: Sticker.Type
  /** type of sticker format */
  format_type: Sticker.FormatType
  /** whether this guild sticker can be used, may be false due to loss of Server Boosts */
  available?: boolean
  /** id of the guild that owns this sticker */
  guild_id?: snowflake
  /** the user that uploaded the guild sticker */
  user?: User
  /** the standard sticker's sort order within its pack */
  sort_value?: integer
}

export namespace Sticker {
  /** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types */
  export enum Type {
    /** an official sticker in a pack */
    STANDARD = 1,
    /** a sticker uploaded to a guild for the guild's members */
    GUILD = 2,
  }

  /** https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types */
  export enum FormatType {
    PNG = 1,
    APNG = 2,
    LOTTIE = 3,
    GIF = 4,
  }

  /** https://discord.com/developers/docs/resources/sticker#sticker-item-object-sticker-item-structure */
  export interface Item {
    /** id of the sticker */
    id: snowflake
    /** name of the sticker */
    name: string
    /** type of sticker format */
    format_type: Sticker.FormatType
  }

  /** https://discord.com/developers/docs/resources/sticker#sticker-pack-object-sticker-pack-structure */
  export interface Pack {
    /** id of the sticker pack */
    id: snowflake
    /** the stickers in the pack */
    stickers: Sticker[]
    /** name of the sticker pack */
    name: string
    /** id of the pack's SKU */
    sku_id: snowflake
    /** id of a sticker in the pack which is shown as the pack's icon */
    cover_sticker_id?: snowflake
    /** description of the sticker pack */
    description: string
    /** id of the sticker pack's banner image */
    banner_asset_id?: snowflake
  }

  /** https://discord.com/developers/docs/resources/sticker#list-sticker-packs-response-structure */
  export interface PackResult {
    /**  */
    sticker_packs: Sticker.Pack[]
  }
}

/** https://discord.com/developers/docs/resources/sticker#create-guild-sticker-form-params */
export interface CreateGuildStickerParams {
  /** name of the sticker (2-30 characters) */
  name: string
  /** description of the sticker (empty or 2-100 characters) */
  description: string
  /** autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags: string
  /** the sticker file to upload, must be a PNG, APNG, GIF, or Lottie JSON file, max 512 KiB */
  file: any
}

/** https://discord.com/developers/docs/resources/sticker#modify-guild-sticker-json-params */
export interface ModifyGuildStickerParams {
  /** name of the sticker (2-30 characters) */
  name: string
  /** description of the sticker (2-100 characters) */
  description: string | null
  /** autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags: string
}

declare module './internal' {
  interface Internal {
    /**
     * Returns a sticker object for the given sticker ID.
     * @see https://discord.com/developers/docs/resources/sticker#get-sticker
     */
    getSticker(sticker_id: snowflake): Promise<Sticker>
    /**
     * Returns a list of available sticker packs.
     * @see https://discord.com/developers/docs/resources/sticker#list-sticker-packs
     */
    listStickerPacks(): Promise<void>
    /**
     * Returns a sticker pack object for the given sticker pack ID.
     * @see https://discord.com/developers/docs/resources/sticker#get-sticker-pack
     */
    getStickerPack(pack_id: snowflake): Promise<Sticker.Pack>
    /**
     * Returns an array of sticker objects for the given guild. Includes `user` fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
     * @see https://discord.com/developers/docs/resources/sticker#list-guild-stickers
     */
    listGuildStickers(guild_id: snowflake): Promise<Sticker[]>
    /**
     * Returns a sticker object for the given guild and sticker IDs. Includes the `user` field if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
     * @see https://discord.com/developers/docs/resources/sticker#get-guild-sticker
     */
    getGuildSticker(guild_id: snowflake, sticker_id: snowflake): Promise<Sticker>
    /**
     * Create a new sticker for the guild. Send a `multipart/form-data` body. Requires the `CREATE_GUILD_EXPRESSIONS` permission. Returns the new sticker object on success. Fires a Guild Stickers Update Gateway event.
     * @see https://discord.com/developers/docs/resources/sticker#create-guild-sticker
     */
    createGuildSticker(guild_id: snowflake, params: CreateGuildStickerParams): Promise<Sticker>
    /**
     * Modify the given sticker. For stickers created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission. For other stickers, requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns the updated sticker object on success. Fires a Guild Stickers Update Gateway event.
     * @see https://discord.com/developers/docs/resources/sticker#modify-guild-sticker
     */
    modifyGuildSticker(guild_id: snowflake, sticker_id: snowflake, params: ModifyGuildStickerParams): Promise<Sticker>
    /**
     * Delete the given sticker. For stickers created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission. For other stickers, requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns `204 No Content` on success. Fires a Guild Stickers Update Gateway event.
     * @see https://discord.com/developers/docs/resources/sticker#delete-guild-sticker
     */
    deleteGuildSticker(guild_id: snowflake, sticker_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/stickers/{sticker.id}': {
    GET: 'getSticker',
  },
  '/sticker-packs': {
    GET: 'listStickerPacks',
  },
  '/sticker-packs/{pack.id}': {
    GET: 'getStickerPack',
  },
  '/guilds/{guild.id}/stickers': {
    GET: 'listGuildStickers',
    POST: { name: 'createGuildSticker', multipart: true },
  },
  '/guilds/{guild.id}/stickers/{sticker.id}': {
    GET: 'getGuildSticker',
    PATCH: 'modifyGuildSticker',
    DELETE: 'deleteGuildSticker',
  },
})
