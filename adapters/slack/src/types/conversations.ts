import { Internal, TokenInput } from './internal'
import { Definitions } from './definition'
Internal.define({
  '/conversations.archive': {
    POST: { 'conversationsArchive': true },
  },
  '/conversations.close': {
    POST: { 'conversationsClose': true },
  },
  '/conversations.create': {
    POST: { 'conversationsCreate': true },
  },
  '/conversations.history': {
    GET: { 'conversationsHistory': true },
  },
  '/conversations.info': {
    GET: { 'conversationsInfo': false },
  },
  '/conversations.invite': {
    POST: { 'conversationsInvite': true },
  },
  '/conversations.join': {
    POST: { 'conversationsJoin': true },
  },
  '/conversations.kick': {
    POST: { 'conversationsKick': true },
  },
  '/conversations.leave': {
    POST: { 'conversationsLeave': true },
  },
  '/conversations.list': {
    GET: { 'conversationsList': false },
  },
  '/conversations.mark': {
    POST: { 'conversationsMark': true },
  },
  '/conversations.members': {
    GET: { 'conversationsMembers': false },
  },
  '/conversations.open': {
    POST: { 'conversationsOpen': true },
  },
  '/conversations.rename': {
    POST: { 'conversationsRename': true },
  },
  '/conversations.replies': {
    GET: { 'conversationsReplies': false },
  },
  '/conversations.setPurpose': {
    POST: { 'conversationsSetPurpose': true },
  },
  '/conversations.setTopic': {
    POST: { 'conversationsSetTopic': true },
  },
  '/conversations.unarchive': {
    POST: { 'conversationsUnarchive': true },
  },
})

export namespace Conversations {
  export namespace Params {
    export interface Archive {
      channel?: string
    }
    export interface Close {
      channel?: string
    }
    export interface Create {
      name?: string
      is_private?: boolean
    }
    export interface History {
      channel?: string
      latest?: number
      oldest?: number
      inclusive?: boolean
      limit?: number
      cursor?: string
    }
    export interface Info {
      channel?: string
      include_locale?: boolean
      include_num_members?: boolean
    }
    export interface Invite {
      channel?: string
      users?: string
    }
    export interface Join {
      channel?: string
    }
    export interface Kick {
      channel?: string
      user?: string
    }
    export interface Leave {
      channel?: string
    }
    export interface List {
      exclude_archived?: boolean
      types?: string
      limit?: number
      cursor?: string
    }
    export interface Mark {
      channel?: string
      ts?: number
    }
    export interface Members {
      channel?: string
      limit?: number
      cursor?: string
    }
    export interface Open {
      channel?: string
      users?: string
      return_im?: boolean
    }
    export interface Rename {
      channel?: string
      name?: string
    }
    export interface Replies {
      channel?: string
      ts?: number
      latest?: number
      oldest?: number
      inclusive?: boolean
      limit?: number
      cursor?: string
    }
    export interface SetPurpose {
      channel?: string
      purpose?: string
    }
    export interface SetTopic {
      channel?: string
      topic?: string
    }
    export interface Unarchive {
      channel?: string
    }
  }
}

declare module './internal' {
  interface Internal {

    /**
     * Archives a conversation.
     * @see https://api.slack.com/methods/conversations.archive
     */
    conversationsArchive(token: TokenInput, params: Conversations.Params.Archive): Promise<{
      ok: boolean
    }>

    /**
     * Closes a direct message or multi-person direct message.
     * @see https://api.slack.com/methods/conversations.close
     */
    conversationsClose(token: TokenInput, params: Conversations.Params.Close): Promise<{
      already_closed?: boolean
      no_op?: boolean
      ok: boolean
    }>

    /**
     * Initiates a public or private channel-based conversation
     * @see https://api.slack.com/methods/conversations.create
     */
    conversationsCreate(token: TokenInput, params: Conversations.Params.Create): Promise<{
      channel: Definitions.Conversation
      ok: boolean
    }>

    /**
     * Fetches a conversation's history of messages and events.
     * @see https://api.slack.com/methods/conversations.history
     */
    conversationsHistory(token: TokenInput, params: Conversations.Params.History): Promise<{
      channel_actions_count: number
      channel_actions_ts: number
      has_more: boolean
      messages: Definitions.Message[]
      ok: boolean
      pin_count: number
    }>

    /**
     * Retrieve information about a conversation.
     * @see https://api.slack.com/methods/conversations.info
     */
    conversationsInfo(token: TokenInput, params: Conversations.Params.Info): Promise<{
      channel: Definitions.Conversation
      ok: boolean
    }>

    /**
     * Invites users to a channel.
     * @see https://api.slack.com/methods/conversations.invite
     */
    conversationsInvite(token: TokenInput, params: Conversations.Params.Invite): Promise<{
      channel: Definitions.Conversation
      ok: boolean
    }>

    /**
     * Joins an existing conversation.
     * @see https://api.slack.com/methods/conversations.join
     */
    conversationsJoin(token: TokenInput, params: Conversations.Params.Join): Promise<{
      channel: Definitions.Conversation
      ok: boolean
      response_metadata?: {
        warnings: string[]
      }
      warning?: string
    }>

    /**
     * Removes a user from a conversation.
     * @see https://api.slack.com/methods/conversations.kick
     */
    conversationsKick(token: TokenInput, params: Conversations.Params.Kick): Promise<{
      ok: boolean
    }>

    /**
     * Leaves a conversation.
     * @see https://api.slack.com/methods/conversations.leave
     */
    conversationsLeave(token: TokenInput, params: Conversations.Params.Leave): Promise<{
      not_in_channel?: boolean
      ok: boolean
    }>

    /**
     * Lists all channels in a Slack team.
     * @see https://api.slack.com/methods/conversations.list
     */
    conversationsList(token: TokenInput, params: Conversations.Params.List): Promise<{
      channels: Definitions.Conversation[]
      ok: boolean
      response_metadata?: {
        next_cursor: string
      }
    }>

    /**
     * Sets the read cursor in a channel.
     * @see https://api.slack.com/methods/conversations.mark
     */
    conversationsMark(token: TokenInput, params: Conversations.Params.Mark): Promise<{
      ok: boolean
    }>

    /**
     * Retrieve members of a conversation.
     * @see https://api.slack.com/methods/conversations.members
     */
    conversationsMembers(token: TokenInput, params: Conversations.Params.Members): Promise<{
      members: string[]
      ok: boolean
      response_metadata: {
        next_cursor: string
      }
    }>

    /**
     * Opens or resumes a direct message or multi-person direct message.
     * @see https://api.slack.com/methods/conversations.open
     */
    conversationsOpen(token: TokenInput, params: Conversations.Params.Open): Promise<{
      already_open?: boolean
      channel: Definitions.Conversation
      no_op?: boolean
      ok: boolean
    }>

    /**
     * Renames a conversation.
     * @see https://api.slack.com/methods/conversations.rename
     */
    conversationsRename(token: TokenInput, params: Conversations.Params.Rename): Promise<{
      channel: Definitions.Conversation
      ok: boolean
    }>

    /**
     * Retrieve a thread of messages posted to a conversation
     * @see https://api.slack.com/methods/conversations.replies
     */
    conversationsReplies(token: TokenInput, params: Conversations.Params.Replies): Promise<{
      has_more?: boolean
      messages: {
        last_read: string
        latest_reply: string
        reply_count: number
        reply_users: string[]
        reply_users_count: number
        source_team: string
        subscribed: boolean
        team: string
        text: string
        thread_ts: string
        ts: string
        type: string
        unread_count: number
        user: string
        user_profile: Definitions.UserProfileShort
        user_team: string
      }[]
      ok: boolean
    }>

    /**
     * Sets the purpose for a conversation.
     * @see https://api.slack.com/methods/conversations.setPurpose
     */
    conversationsSetPurpose(token: TokenInput, params: Conversations.Params.SetPurpose): Promise<{
      channel: Definitions.Conversation
      ok: boolean
    }>

    /**
     * Sets the topic for a conversation.
     * @see https://api.slack.com/methods/conversations.setTopic
     */
    conversationsSetTopic(token: TokenInput, params: Conversations.Params.SetTopic): Promise<{
      channel: Definitions.Conversation
      ok: boolean
    }>

    /**
     * Reverses conversation archival.
     * @see https://api.slack.com/methods/conversations.unarchive
     */
    conversationsUnarchive(token: TokenInput, params: Conversations.Params.Unarchive): Promise<{
      ok: boolean
    }>

  }
}
