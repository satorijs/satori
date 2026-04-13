import { Internal, integer, snowflake } from '.'

/** https://discord.com/developers/docs/resources/lobby#lobby-object-lobby-structure */
export interface Lobby {
  /** the id of this channel */
  id: snowflake
  /** application that created the lobby */
  application_id: snowflake
  /** dictionary of string key/value pairs. The max total length is 1000. */
  metadata: Dict\<string,String\> | null
  /** members of the lobby */
  members: LobbyMember[]
  /** the guild channel linked to the lobby */
  linked_channel?: Channel
}

export namespace Lobby {
  /** https://discord.com/developers/docs/resources/lobby#lobby-member-object-lobby-member-flags */
  export enum MemberFlag {
    /** user can link a text channel to a lobby */
    CanLinkLobby = 1<<0,
  }

  /** https://discord.com/developers/docs/resources/lobby#lobby-member-object-lobby-member-structure */
  export interface Member {
    /** the id of the user */
    id: snowflake
    /** dictionary of string key/value pairs. The max total length is 1000. */
    metadata?: Dict\<string,String\> | null
    /** lobby member flags combined as a bitfield */
    flags?: integer
  }

}

declare module './internal' {
  interface Internal {
    /**
     * Creates a new lobby, adding any of the specified members to it, if provided.
     * @see https://discord.com/developers/docs/resources/lobby#create-lobby
     */
    createLobby(): Promise<void>
    /**
     * Returns a lobby object for the specified lobby id, if it exists.
     * @see https://discord.com/developers/docs/resources/lobby#get-lobby
     */
    getLobby(lobby_id: snowflake): Promise<Lobby>
    /**
     * Modifies the specified lobby with new values, if provided.
     * @see https://discord.com/developers/docs/resources/lobby#modify-lobby
     */
    modifyLobby(lobby_id: snowflake): Promise<void>
    /**
     * Deletes the specified lobby if it exists.
     * @see https://discord.com/developers/docs/resources/lobby#delete-lobby
     */
    deleteLobby(lobby_id: snowflake): Promise<void>
    /**
     * Adds the provided user to the specified lobby. If called when the user is already a member of the lobby will update fields such as metadata on that user instead.
     * @see https://discord.com/developers/docs/resources/lobby#add-a-member-to-a-lobby
     */
    addAMemberToALobby(lobby_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Removes the provided user from the specified lobby. It is safe to call this even if the user is no longer a member of the lobby, but will fail if the lobby does not exist.
     * @see https://discord.com/developers/docs/resources/lobby#remove-a-member-from-a-lobby
     */
    removeAMemberFromALobby(lobby_id: snowflake, user_id: snowflake): Promise<void>
    /**
     * Removes the current user from the specified lobby. It is safe to call this even if the user is no longer a member of the lobby, but will fail if the lobby does not exist.
     * @see https://discord.com/developers/docs/resources/lobby#leave-lobby
     */
    leaveLobby(lobby_id: snowflake): Promise<void>
    /**
     * Links an existing text channel to a lobby. See Linked Channels for more information.
     * @see https://discord.com/developers/docs/resources/lobby#link-channel-to-lobby
     */
    linkChannelToLobby(lobby_id: snowflake): Promise<void>
    /**
     * Unlinks any currently linked channels from the specified lobby.
     * @see https://discord.com/developers/docs/resources/lobby#unlink-channel-from-lobby
     */
    unlinkChannelFromLobby(lobby_id: snowflake): Promise<void>
    /**
     * Sets the moderation metadata for a lobby message. The metadata is app-scoped and delivered to active
     * @see https://discord.com/developers/docs/resources/lobby#update-lobby-message-moderation-metadata
     */
    updateLobbyMessageModerationMetadata(lobby_id: snowflake, message_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/lobbies': {
    POST: 'createLobby',
  },
  '/lobbies/{lobby.id}': {
    GET: 'getLobby',
    PATCH: 'modifyLobby',
    DELETE: 'deleteLobby',
  },
  '/lobbies/{lobby.id}/members/{user.id}': {
    PUT: 'addAMemberToALobby',
    DELETE: 'removeAMemberFromALobby',
  },
  '/lobbies/{lobby.id}/members/@me': {
    DELETE: 'leaveLobby',
  },
  '/lobbies/{lobby.id}/channel-linking': {
    PATCH: 'unlinkChannelFromLobby',
  },
  '/lobbies/{lobby.id}/messages/{message.id}/moderation-metadata': {
    PUT: 'updateLobbyMessageModerationMetadata',
  },
})
