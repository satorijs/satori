import { Emoji, integer, Internal, snowflake, timestamp, User } from '.'

/** https://discord.com/developers/docs/resources/poll#poll-object-poll-object-structure */
export interface Poll {
  /** The question of the poll. Only `text` is supported. */
  question: Poll.Media
  /** Each of the answers available in the poll. */
  answers: Poll.Answer[]
  /** The time when the poll ends. */
  expiry: timestamp | null
  /** Whether a user can select multiple answers */
  allow_multiselect: boolean
  /** The layout type of the poll */
  layout_type: integer
  /** The results of the poll */
  results?: Poll.Results
}

export namespace Poll {
  /** https://discord.com/developers/docs/resources/poll#poll-create-request-object-poll-create-request-object-structure */
  export interface CreateRequest {
    /** The question of the poll. Only `text` is supported. */
    question: Poll.Media
    /** Each of the answers available in the poll, up to 10 */
    answers: Poll.Answer[]
    /** Number of hours the poll should be open for, up to 32 days. Defaults to 24 */
    duration?: integer
    /** Whether a user can select multiple answers. Defaults to false */
    allow_multiselect?: boolean
    /** The layout type of the poll. Defaults to... DEFAULT! */
    layout_type?: integer
  }

  /** https://discord.com/developers/docs/resources/poll#poll-media-object-poll-media-object-structure */
  export interface Media {
    /** The emoji of the field */
    emoji?: Partial<Emoji>
  }

  /** https://discord.com/developers/docs/resources/poll#poll-answer-object-poll-answer-object-structure */
  export interface Answer {
    /** The ID of the answer */
    answer_id: integer
    /** The data of the answer */
    poll_media: Poll.Media
  }

  /** https://discord.com/developers/docs/resources/poll#poll-results-object-poll-results-object-structure */
  export interface Results {
    /** Whether the votes have been precisely counted */
    is_finalized: boolean
    /** The counts for each answer */
    answer_counts: Poll.AnswerCount[]
  }

  /** https://discord.com/developers/docs/resources/poll#poll-results-object-poll-answer-count-object-structure */
  export interface AnswerCount {
    /** The `answer_id` */
    id: integer
    /** The number of votes for this answer */
    count: integer
    /** Whether the current user voted for this answer */
    me_voted: boolean
  }

  /** https://discord.com/developers/docs/resources/poll#get-answer-voters-response-body */
  export interface PackResult {
    /** Users who voted for this answer */
    users: User[]
  }
}

/** https://discord.com/developers/docs/resources/poll#get-answer-voters-query-string-params */
export interface GetAnswerVotersParams {
  /** Get users after this user ID */
  after?: snowflake
  /** Max number of users to return (1-100) */
  limit?: integer
}

declare module './internal' {
  interface Internal {
    /**
     * Get a list of users that voted for this specific answer.
     * @see https://discord.com/developers/docs/resources/poll#get-answer-voters
     */
    getAnswerVoters(channel_id: snowflake, message_id: snowflake, params: GetAnswerVotersParams): Promise<void>
    /**
     * Immediately ends the poll. You cannot end polls from other users.
     * @see https://discord.com/developers/docs/resources/poll#end-poll
     */
    endPoll(channel_id: snowflake, message_id: snowflake): Promise<void>
  }
}

Internal.define({
  '/channels/{channel.id}/polls/{message.id}/answers/{answer_id}': {
    GET: 'getAnswerVoters',
  },
  '/channels/{channel.id}/polls/{message.id}/expire': {
    POST: 'endPoll',
  },
})
