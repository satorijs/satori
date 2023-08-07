import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/users.conversations': {
    GET: { 'usersConversations': false },
  },
  '/users.deletePhoto': {
    POST: { 'usersDeletePhoto': false },
  },
  '/users.getPresence': {
    GET: { 'usersGetPresence': false },
  },
  '/users.identity': {
    GET: { 'usersIdentity': false },
  },
  '/users.info': {
    GET: { 'usersInfo': false },
  },
  '/users.list': {
    GET: { 'usersList': false },
  },
  '/users.lookupByEmail': {
    GET: { 'usersLookupByEmail': false },
  },
  '/users.profile.get': {
    GET: { 'usersProfileGet': false },
  },
  '/users.profile.set': {
    POST: { 'usersProfileSet': true },
  },
  '/users.setActive': {
    POST: { 'usersSetActive': true },
  },
  '/users.setPhoto': {
    POST: { 'usersSetPhoto': false },
  },
  '/users.setPresence': {
    POST: { 'usersSetPresence': true },
  },
})

export namespace Users {
  export namespace Params {
    export interface Conversations {
      user?: string
      types?: string
      exclude_archived?: boolean
      limit?: number
      cursor?: string
    }
    export interface DeletePhoto {
    }
    export interface GetPresence {
      user?: string
    }
    export interface Identity {
    }
    export interface Info {
      include_locale?: boolean
      user?: string
    }
    export interface List {
      limit?: number
      cursor?: string
      include_locale?: boolean
    }
    export interface LookupByEmail {
      email: string
    }
    export interface ProfileGet {
      include_labels?: boolean
      user?: string
    }
    export interface ProfileSet {
      name?: string
      profile?: string
      user?: string
      value?: string
    }
    export interface SetActive {
    }
    export interface SetPhoto {
      crop_w?: string
      crop_x?: string
      crop_y?: string
      image?: string
    }
    export interface SetPresence {
      presence: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * List conversations the calling user may access.
     * @see https://api.slack.com/methods/users.conversations
     */
    usersConversations(token: TokenInput, params: Users.Params.Conversations): Promise<{
      channels: Definitions.Conversation[]
      ok: boolean
      response_metadata?: {
        next_cursor: string
      }
    }>

    /**
     * Delete the user profile photo
     * @see https://api.slack.com/methods/users.deletePhoto
     */
    usersDeletePhoto(token: TokenInput): Promise<{
      ok: boolean
    }>

    /**
     * Gets user presence information.
     * @see https://api.slack.com/methods/users.getPresence
     */
    usersGetPresence(token: TokenInput, params: Users.Params.GetPresence): Promise<{
      auto_away?: boolean
      connection_count?: number
      last_activity?: number
      manual_away?: boolean
      ok: boolean
      online?: boolean
      presence: string
    }>

    /**
     * Get a user's identity.
     * @see https://api.slack.com/methods/users.identity
     */
    usersIdentity(token: TokenInput): Promise<unknown>

    /**
     * Gets information about a user.
     * @see https://api.slack.com/methods/users.info
     */
    usersInfo(token: TokenInput, params: Users.Params.Info): Promise<{
      ok: boolean
      user: Definitions.User
    }>

    /**
     * Lists all users in a Slack team.
     * @see https://api.slack.com/methods/users.list
     */
    usersList(token: TokenInput, params: Users.Params.List): Promise<{
      cache_ts: number
      members: Definitions.User[]
      ok: boolean
      response_metadata?: Definitions.ResponseMetadata
    }>

    /**
     * Find a user with an email address.
     * @see https://api.slack.com/methods/users.lookupByEmail
     */
    usersLookupByEmail(token: TokenInput, params: Users.Params.LookupByEmail): Promise<{
      ok: boolean
      user: Definitions.User
    }>

    /**
     * Retrieves a user's profile information.
     * @see https://api.slack.com/methods/users.profile.get
     */
    usersProfileGet(token: TokenInput, params: Users.Params.ProfileGet): Promise<{
      ok: boolean
      profile: Definitions.UserProfile
    }>

    /**
     * Set the profile information for a user.
     * @see https://api.slack.com/methods/users.profile.set
     */
    usersProfileSet(token: TokenInput, params: Users.Params.ProfileSet): Promise<{
      email_pending?: string
      ok: boolean
      profile: Definitions.UserProfile
      username: string
    }>

    /**
     * Marked a user as active. Deprecated and non-functional.
     * @see https://api.slack.com/methods/users.setActive
     */
    usersSetActive(token: TokenInput): Promise<{
      ok: boolean
    }>

    /**
     * Set the user profile photo
     * @see https://api.slack.com/methods/users.setPhoto
     */
    usersSetPhoto(token: TokenInput, params: Users.Params.SetPhoto): Promise<{
      ok: boolean
      profile: {
        avatar_hash: string
        image_1024: string
        image_192: string
        image_24: string
        image_32: string
        image_48: string
        image_512: string
        image_72: string
        image_original: string
      }
    }>

    /**
     * Manually sets user presence.
     * @see https://api.slack.com/methods/users.setPresence
     */
    usersSetPresence(token: TokenInput, params: Users.Params.SetPresence): Promise<{
      ok: boolean
    }>

  }
}
