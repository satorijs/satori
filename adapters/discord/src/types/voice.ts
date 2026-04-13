import { Internal, snowflake, timestamp } from '.'

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface Voice {
  /** the guild id this voice state is for */
  guild_id?: snowflake
  /** the channel id this user is connected to */
  channel_id: snowflake | null
  /** the user id this voice state is for */
  user_id: snowflake
  /** the guild member this voice state is for */
  member?: GuildMember
  /** the session id for this voice state */
  session_id: string
  /** whether this user is deafened by the server */
  deaf: boolean
  /** whether this user is muted by the server */
  mute: boolean
  /** whether this user is locally deafened */
  self_deaf: boolean
  /** whether this user is locally muted */
  self_mute: boolean
  /** whether this user is streaming using "Go Live" */
  self_stream?: boolean
  /** whether this user's camera is enabled */
  self_video: boolean
  /** whether this user's permission to speak is denied */
  suppress: boolean
  /** the time at which the user requested to speak */
  request_to_speak_timestamp: timestamp | null
}

export namespace Voice {
  /** https://discord.com/developers/docs/resources/voice#voice-region-object-voice-region-structure */
  export interface Region {
    /** unique ID for the region */
    id: string
    /** name of the region */
    name: string
    /** true for a single server that is closest to the current user's client */
    optimal: boolean
    /** whether this is a deprecated voice region (avoid switching to these) */
    deprecated: boolean
    /** whether this is a custom voice region (used for events/etc) */
    custom: boolean
  }

  export namespace Params {
    /** https://discord.com/developers/docs/resources/voice#modify-current-user-voice-state-json-params */
    export interface Modify {
      /** the id of the channel the user is currently in */
      channel_id?: snowflake
      /** toggles the user's suppress state */
      suppress?: boolean
      /** sets the user's request to speak */
      request_to_speak_timestamp?: timestamp | null
    }

    /** https://discord.com/developers/docs/resources/voice#modify-user-voice-state-json-params */
    export interface Modify {
      /** the id of the channel the user is currently in */
      channel_id?: snowflake
      /** toggles the user's suppress state */
      suppress?: boolean
    }

  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns an array of voice region objects that can be used when setting a voice or stage channel's `rtc_region`.
     * @see https://discord.com/developers/docs/resources/voice#list-voice-regions
     */
    listVoiceRegions(): Promise<VoiceRegion[]>
    /**
     * Returns the current user's voice state in the guild.
     * @see https://discord.com/developers/docs/resources/voice#get-current-user-voice-state
     */
    getCurrentUserVoiceState(guild_id: snowflake): Promise<void>
    /**
     * Returns the specified user's voice state in the guild.
     * @see https://discord.com/developers/docs/resources/voice#get-user-voice-state
     */
    getUserVoiceState(guild_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Updates the current user's voice state. Returns `204 No Content` on success. Fires a Voice State Update Gateway event.
     * @see https://discord.com/developers/docs/resources/voice#modify-current-user-voice-state
     */
    modifyCurrentUserVoiceState(guild_id: snowflake, params: Voice.Params.Modify): Promise<void>
    /**
     * Updates another user's voice state. Returns `204 No Content` on success. Fires a Voice State Update Gateway event.
     * @see https://discord.com/developers/docs/resources/voice#modify-user-voice-state
     */
    modifyUserVoiceState(guild_id: snowflake, user_id: snowflake, params: Voice.Params.Modify): Promise<void>
  }
}

Internal.define({
  '/voice/regions': {
    GET: 'listVoiceRegions',
  },
  '/guilds/{guild.id}/voice-states/@me': {
    GET: 'getCurrentUserVoiceState',
    PATCH: 'modifyCurrentUserVoiceState',
  },
  '/guilds/{guild.id}/voice-states/{user.id}': {
    GET: 'getUserVoiceState',
    PATCH: 'modifyUserVoiceState',
  },
})
