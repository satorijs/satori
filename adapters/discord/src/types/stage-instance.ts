import { integer, Internal, snowflake } from '.'

/** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure */
export interface StageInstance {
  /** The id of this Stage instance */
  id: snowflake
  /** The guild id of the associated Stage channel */
  guild_id: snowflake
  /** The id of the associated Stage channel */
  channel_id: snowflake
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** The privacy level of the Stage instance */
  privacy_level: integer
  /** Whether or not Stage Discovery is disabled (deprecated) */
  discoverable_disabled: boolean
  /** The id of the scheduled event for this Stage instance */
  guild_scheduled_event_id: snowflake | null
}

export namespace StageInstance {
  /** https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level */
  export enum PrivacyLevel {
    /** The Stage instance is visible publicly. (deprecated) */
    PUBLIC = 1,
    /** The Stage instance is visible to only guild members. */
    GUILD_ONLY = 2,
  }
}

/** https://discord.com/developers/docs/resources/stage-instance#create-stage-instance-json-params */
export interface CreateStageInstanceParams {
  /** The id of the Stage channel */
  channel_id: snowflake
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
  /** The privacy level of the Stage instance (default GUILD_ONLY) */
  privacy_level?: integer
  /** Notify @everyone that a Stage instance has started */
  send_start_notification?: boolean
  /** The guild scheduled event associated with this Stage instance */
  guild_scheduled_event_id?: snowflake
}

/** https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance-json-params */
export interface ModifyStageInstanceParams {
  /** The privacy level of the Stage instance */
  privacy_level?: integer
}

declare module './internal' {
  interface Internal {
    /**
     * Creates a new Stage instance associated to a Stage channel. Returns that Stage instance. Fires a Stage Instance Create Gateway event.
     * @see https://discord.com/developers/docs/resources/stage-instance#create-stage-instance
     */
    createStageInstance(params: CreateStageInstanceParams): Promise<void>
    /**
     * Gets the stage instance associated with the Stage channel, if it exists.
     * @see https://discord.com/developers/docs/resources/stage-instance#get-stage-instance
     */
    getStageInstance(channel_id: snowflake): Promise<void>
    /**
     * Updates fields of an existing Stage instance. Returns the updated Stage instance. Fires a Stage Instance Update Gateway event.
     * @see https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance
     */
    modifyStageInstance(channel_id: snowflake, params: ModifyStageInstanceParams): Promise<StageInstance>
    /**
     * Deletes the Stage instance. Returns `204 No Content`. Fires a Stage Instance Delete Gateway event.
     * @see https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance
     */
    deleteStageInstance(channel_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/stage-instances': {
    POST: 'createStageInstance',
  },
  '/stage-instances/{channel.id}': {
    GET: 'getStageInstance',
    PATCH: 'modifyStageInstance',
    DELETE: 'deleteStageInstance',
  },
})
