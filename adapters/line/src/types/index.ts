import type {} from './request'
export * from './request'
export * from './internal'
export * from './definition'

// https://github.com/line/line-bot-sdk-nodejs/blob/next/lib/types.ts

/**
 * Request body which is sent by webhook.
 *
 * @see [Request body](https://developers.line.biz/en/reference/messaging-api/#request-body)
 */
export type WebhookRequestBody = {
  /**
   * User ID of a bot that should receive webhook events. The user ID value is a string that matches the regular expression, U[0-9a-f]{32}.
   */
  destination: string

  /**
   * Information about the event
   */
  events: WebhookEvent[]
}

/**
 * JSON objects which contain events generated on the LINE Platform.
 *
 * @see [Webhook event objects](https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects)
 */
export type WebhookEvent =
  | MessageEvent
  | UnsendEvent
  | FollowEvent
  | UnfollowEvent
  | JoinEvent
  | LeaveEvent
  | MemberJoinEvent
  | MemberLeaveEvent

export type EventBase = {
  /**
   * Channel state.
   *
   * `active`: The channel is active. You can send a reply message or push message from the bot server that received this webhook event.
   *
   * `standby`: The channel is waiting. The bot server that received this webhook event shouldn't send any messages.
   */
  mode: 'active' | 'standby'
  /**
   * Time of the event in milliseconds
   */
  timestamp: number
  /**
   * Source user, group, or room object with information about the source of the event.
   */
  source: EventSource
}

export type EventSource = User | Group | Room

export type User = { type: 'user'; userId: string }

export type Group = {
  type: 'group'
  groupId: string
  /**
   * ID of the source user.
   *
   * Only included in [message events](https://developers.line.biz/en/reference/messaging-api/#message-event).
   * Not included if the user has not agreed to the
   * [Official Accounts Terms of Use](https://developers.line.biz/en/docs/messaging-api/user-consent/).
   */
  userId?: string
}

export type Room = {
  type: 'room'
  roomId: string
  /**
   * ID of the source user.
   *
   * Only included in [message events](https://developers.line.biz/en/reference/messaging-api/#message-event).
   * Not included if the user has not agreed to the
   * [Official Accounts Terms of Use](https://developers.line.biz/en/docs/messaging-api/user-consent/).
   */
  userId?: string
}

export type ReplyableEvent = EventBase & { replyToken: string }

/**
 * Webhook event object which contains the sent message.
 *
 * The `message` property contains a message object which corresponds with the
 * message type. You can reply to message events.
 *
 * @see [Message event](https://developers.line.biz/en/reference/messaging-api/#message-event)
 */
export type MessageEvent = {
  type: 'message'
  message: EventMessage
} & ReplyableEvent

/**
 * Event object for when the user unsends a message in a [group](https://developers.line.biz/en/docs/messaging-api/group-chats/#group)
 * or [room](https://developers.line.biz/en/docs/messaging-api/group-chats/#room).
 * [Unsend event](https://developers.line.biz/en/reference/messaging-api/#unsend-event)
 */
export type UnsendEvent = {
  type: 'unsend'
  /**
   * The message ID of the unsent message
   */
  unsend: { messageId: string }
} & EventBase

/**
 * Event object for when your account is added as a friend (or unblocked).
 */
export type FollowEvent = { type: 'follow' } & ReplyableEvent

/**
 * Event object for when your account is blocked.
 */
export type UnfollowEvent = { type: 'unfollow' } & EventBase

/**
 * Event object for when your bot joins a group or room. You can reply to join events.
 *
 * A join event is triggered at different times for groups and rooms.
 *
 * - For groups: A join event is sent when a user invites your bot.
 * - For rooms: A join event is sent when the first event (for example when a
 *     user sends a message or is added to the room) occurs after your bot is
 *     added.
 */
export type JoinEvent = { type: 'join' } & ReplyableEvent

/**
 * Event object for when a user removes your bot from a group or a room.
 */
export type LeaveEvent = { type: 'leave' } & EventBase

/**
 * Event object for when a user joins a [group](https://developers.line.biz/en/docs/messaging-api/group-chats/#group)
 * or [room](https://developers.line.biz/en/docs/messaging-api/group-chats/#room) that the bot is in.
 */
export type MemberJoinEvent = {
  type: 'memberJoined'
  /**
   * User ID of users who joined
   * Array of [source user](https://developers.line.biz/en/reference/messaging-api/#source-user) objects
   */
  joined: { members: User[] }
} & ReplyableEvent

/**
 * Event object for when a user leaves a [group](https://developers.line.biz/en/docs/messaging-api/group-chats/#group)
 * or [room](https://developers.line.biz/en/docs/messaging-api/group-chats/#room) that the bot is in.
 */
export type MemberLeaveEvent = {
  type: 'memberLeft'
  /**
   * User ID of users who left
   * Array of [source user](https://developers.line.biz/en/reference/messaging-api/#source-user) objects
   */
  left: { members: User[] }
} & EventBase

export type EventMessage =
  | TextEventMessage
  | ImageEventMessage
  | VideoEventMessage
  | AudioEventMessage
  | LocationEventMessage
  | FileEventMessage
  | StickerEventMessage

export type EventMessageBase = { id: string }

/**
 * Message object which contains the text sent from the source.
 */
export type TextEventMessage = {
  type: 'text'
  text: string
  /**
   * Sendable LINE emojis
   */
  emojis?: {
    index: number
    length: number
    productId: string
    emojiId: string
  }[]
  /**
   * Object containing the contents of the mentioned user.
   */
  mention?: {
    /**
     * Mentioned user information.
     * Max: 20 mentions
     */
    mentionees: {
      /**
       * Index position of the user mention for a character in `text`,
       * with the first character being at position 0.
       */
      index: number
      /**
       * The length of the text of the mentioned user. For a mention `@example`,
       * 8 is the length.
       */
      length: number
      /**
       * Mentioned target.
       *
       * - `user`: User.
       * - `all`: Entire group.
       */
      type: 'user' | 'all'
      /**
       * User ID of the mentioned user. Only included if mention.mentions[].type is user
       * and the user consents to the LINE Official Account obtaining their user profile information.
       */
      userId?: string
    }[]
  }
} & EventMessageBase

export type ContentProvider<WithPreview extends boolean = true> =
  | {
      /**
       * The content is provided by LINE.
       *
       * The data itself can be retrieved from the content API.
       */
      type: 'line'
    }
  | {
      /**
       * The content is provided by a provider other than LINE
       */
      type: 'external'
      /**
       * URL of the content. Only included when contentProvider.type is external.
       */
      originalContentUrl: string
      /**
       * URL of the content preview. Only included when contentProvider.type is external.
       *
       * For contents without preview (e.g. audio), it's undefined.
       */
      previewImageUrl: WithPreview extends true ? string : undefined
    }

/**
 * Message object which contains the image content sent from the source.
 * The binary image data can be retrieved using Client#getMessageContent.
 */
export type ImageEventMessage = {
  type: 'image'
  contentProvider: ContentProvider
  /**
   * Object containing the number of images sent simultaneously.
   */
  imageSet?: {
    /**
     * Image set ID. Only included when multiple images are sent simultaneously.
     */
    id: string
    /**
     * An index starting from 1, indicating the image number in a set of images sent simultaneously.
     * Only included when multiple images are sent simultaneously.
     * However, it won't be included if the sender is using LINE 11.15 or earlier for Android.
     */
    index: number
    /**
     * The total number of images sent simultaneously.
     * If two images are sent simultaneously, the number is 2.
     * Only included when multiple images are sent simultaneously.
     * However, it won't be included if the sender is using LINE 11.15 or earlier for Android.
     */
    total: number
  }
} & EventMessageBase

/**
 * Message object which contains the video content sent from the source.
 * The binary video data can be retrieved using Client#getMessageContent.
 */
export type VideoEventMessage = {
  type: 'video'
  contentProvider: ContentProvider
} & EventMessageBase

/**
 * Message object which contains the audio content sent from the source.
 * The binary audio data can be retrieved using Client#getMessageContent.
 */
export type AudioEventMessage = {
  type: 'audio'
  duration: number
  contentProvider: ContentProvider<false>
} & EventMessageBase

/**
 * Message object which contains the file sent from the source.
 * The binary data can be retrieved using Client#getMessageContent.
 */
export type FileEventMessage = {
  type: 'file'
  fileName: string
  fileSize: string
} & EventMessageBase

/**
 * Message object which contains the location data sent from the source.
 */
export type LocationEventMessage = {
  type: 'location'
  title: string
  address: string
  latitude: number
  longitude: number
} & EventMessageBase

/**
 * Message object which contains the sticker data sent from the source.
 * For a list of basic LINE stickers and sticker IDs, see
 * [sticker list](https://developers.line.biz/media/messaging-api/sticker_list.pdf).
 */
export type StickerEventMessage = {
  type: 'sticker'
  packageId: string
  stickerId: string
  stickerResourceType:
    | 'STATIC'
    | 'ANIMATION'
    | 'SOUND'
    | 'ANIMATION_SOUND'
    | 'POPUP'
    | 'POPUP_SOUND'
    | 'CUSTOM'
    | 'MESSAGE'
  keywords: string[]
  /**
   * Any text entered by the user. This property is only included for message stickers.
   * Max character limit: 100
   */
  text?: string
} & EventMessageBase
