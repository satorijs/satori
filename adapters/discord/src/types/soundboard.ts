import { Internal, snowflake, User } from '.'

/** https://discord.com/developers/docs/resources/soundboard#soundboard-sound-object-soundboard-sound-structure */
export interface Soundboard {
  /** the name of this sound */
  name: string
  /** the id of this sound */
  sound_id: snowflake
  /** the volume of this sound, from 0 to 1 */
  volume: number
  /** the id of this sound's custom emoji */
  emoji_id: snowflake | null
  /** the unicode character of this sound's standard emoji */
  emoji_name: string | null
  /** the id of the guild this sound is in */
  guild_id?: snowflake
  /** whether this sound can be used, may be false due to loss of Server Boosts */
  available: boolean
  /** the user who created this sound */
  user?: User
}

export namespace Soundboard {
  /** https://discord.com/developers/docs/resources/soundboard#list-guild-soundboard-sounds-response-structure */
  export interface PackResult {
    /**  */
    items: Soundboard[]
  }
}

/** https://discord.com/developers/docs/resources/soundboard#send-soundboard-sound-json-params */
export interface SendSoundboardSoundParams {
  /** the id of the soundboard sound to play */
  sound_id: snowflake
  /** the id of the guild the soundboard sound is from, required to play sounds from different servers */
  source_guild_id?: snowflake
}

/** https://discord.com/developers/docs/resources/soundboard#create-guild-soundboard-sound-json-params */
export interface CreateGuildSoundboardSoundParams {
  /** name of the soundboard sound (2-32 characters) */
  name: string
  /** the mp3 or ogg sound data, base64 encoded, similar to image data */
  sound: string
  /** the volume of the soundboard sound, from 0 to 1, defaults to 1 */
  volume?: number | null
  /** the id of the custom emoji for the soundboard sound */
  emoji_id?: snowflake | null
  /** the unicode character of a standard emoji for the soundboard sound */
  emoji_name?: string | null
}

/** https://discord.com/developers/docs/resources/soundboard#modify-guild-soundboard-sound-json-params */
export interface ModifyGuildSoundboardSoundParams {
  /** name of the soundboard sound (2-32 characters) */
  name: string
  /** the volume of the soundboard sound, from 0 to 1 */
  volume: number | null
  /** the id of the custom emoji for the soundboard sound */
  emoji_id: snowflake | null
  /** the unicode character of a standard emoji for the soundboard sound */
  emoji_name: string | null
}

declare module './internal' {
  interface Internal {
    /**
     * Send a soundboard sound to a voice channel the user is connected to. Fires a Voice Channel Effect Send Gateway event.
     * @see https://discord.com/developers/docs/resources/soundboard#send-soundboard-sound
     */
    sendSoundboardSound(channel_id: snowflake, params: SendSoundboardSoundParams): Promise<void>
    /**
     * Returns an array of soundboard sound objects that can be used by all users.
     * @see https://discord.com/developers/docs/resources/soundboard#list-default-soundboard-sounds
     */
    listDefaultSoundboardSounds(): Promise<Soundboard[]>
    /**
     * Returns a list of the guild's soundboard sounds. Includes `user` fields if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
     * @see https://discord.com/developers/docs/resources/soundboard#list-guild-soundboard-sounds
     */
    listGuildSoundboardSounds(guild_id: snowflake): Promise<void>
    /**
     * Returns a soundboard sound object for the given sound id. Includes the `user` field if the bot has the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission.
     * @see https://discord.com/developers/docs/resources/soundboard#get-guild-soundboard-sound
     */
    getGuildSoundboardSound(guild_id: snowflake, sound_id: snowflake): Promise<Soundboard>
    /**
     * Create a new soundboard sound for the guild. Requires the `CREATE_GUILD_EXPRESSIONS` permission. Returns the new soundboard sound object on success. Fires a Guild Soundboard Sound Create Gateway event.
     * @see https://discord.com/developers/docs/resources/soundboard#create-guild-soundboard-sound
     */
    createGuildSoundboardSound(guild_id: snowflake, params: CreateGuildSoundboardSoundParams): Promise<Soundboard>
    /**
     * Modify the given soundboard sound. For sounds created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission. For other sounds, requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns the updated soundboard sound object on success. Fires a Guild Soundboard Sound Update Gateway event.
     * @see https://discord.com/developers/docs/resources/soundboard#modify-guild-soundboard-sound
     */
    modifyGuildSoundboardSound(guild_id: snowflake, sound_id: snowflake, params: ModifyGuildSoundboardSoundParams): Promise<Soundboard>
    /**
     * Delete the given soundboard sound. For sounds created by the current user, requires either the `CREATE_GUILD_EXPRESSIONS` or `MANAGE_GUILD_EXPRESSIONS` permission. For other sounds, requires the `MANAGE_GUILD_EXPRESSIONS` permission. Returns `204 No Content` on success. Fires a Guild Soundboard Sound Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/soundboard#delete-guild-soundboard-sound
     */
    deleteGuildSoundboardSound(guild_id: snowflake, sound_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/channels/{channel.id}/send-soundboard-sound': {
    POST: 'sendSoundboardSound',
  },
  '/soundboard-default-sounds': {
    GET: 'listDefaultSoundboardSounds',
  },
  '/guilds/{guild.id}/soundboard-sounds': {
    GET: 'listGuildSoundboardSounds',
    POST: 'createGuildSoundboardSound',
  },
  '/guilds/{guild.id}/soundboard-sounds/{sound.id}': {
    GET: 'getGuildSoundboardSound',
    PATCH: 'modifyGuildSoundboardSound',
    DELETE: 'deleteGuildSoundboardSound',
  },
})
