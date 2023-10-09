export type GetWebhookEndpointResponse = {
  /** Webhook URL */
  endpoint: string;
  /** Webhook usage status. Send a webhook event from the LINE Platform to the webhook URL only if enabled.

  `true`: Webhook usage is enabled.
  `false`: Webhook usage is disabled. */
  active: boolean;
}
export type SetWebhookEndpointRequest = {
  /** A valid webhook URL. */
  endpoint: string;
}
export type TestWebhookEndpointRequest = {
  /** A webhook URL to be validated. */
  endpoint?: string;
}
export type TestWebhookEndpointResponse = {
  /** Result of the communication from the LINE platform to the webhook URL. */
  success?: boolean;
  /** Time of the event in milliseconds. Even in the case of a redelivered webhook, it represents the time the event occurred, not the time it was redelivered. */
  timestamp: string;
  /** The HTTP status code. If the webhook response isn't received, the status code is set to zero or a negative number. */
  statusCode: number;
  /** Reason for the response. */
  reason: string;
  /** Details of the response. */
  detail: string;
}
/** Transcoding response */
export type GetMessageContentTranscodingResponse = {
  /** The preparation status. One of:

  `processing`: Preparing to get content.
  `succeeded`: Ready to get the content. You can get the content sent by users.
  `failed`: Failed to prepare to get the content. */
  status: string;
}
export type ReplyMessageRequest = {
  /** replyToken received via webhook. */
  replyToken: string;
  /** List of messages. */
  messages: Message[];
  notificationDisabled?: NotificationDisabled;
}
export type ReplyMessageResponse = {
  /** Array of sent messages. */
  sentMessages: SentMessage[];
}
export type SentMessage = {
  /** ID of the sent message. */
  id: string;
  /** Quote token of the message. Only included when a message object that can be specified as a quote target was sent as a push or reply message. */
  quoteToken?: string;
}
export type PushMessageRequest = {
  /** ID of the receiver. */
  to: string;
  /** List of Message objects. */
  messages: Message[];
  notificationDisabled?: NotificationDisabled;
  /** List of aggregation unit name. Case-sensitive.
  This functions can only be used by corporate users who have submitted the required applications. */
  customAggregationUnits?: string[];
}
/** `true`: The user doesn’t receive a push notification when a message is sent.
`false`: The user receives a push notification when the message is sent (unless they have disabled push notifications in LINE and/or their device).
The default value is false. */
export type NotificationDisabled = boolean
export type PushMessageResponse = {
  /** Array of sent messages. */
  sentMessages: SentMessage[];
}
export type MulticastRequest = {
  /** Messages to send */
  messages: Message[];
  /** Array of user IDs. Use userId values which are returned in webhook event objects. Do not use LINE IDs found on LINE. */
  to: string[];
  notificationDisabled?: NotificationDisabled;
  /** Name of aggregation unit. Case-sensitive. */
  customAggregationUnits?: string[];
}
export type MulticastResponse = {
}
export type NarrowcastRequest = {
  /** List of Message objects. */
  messages: Message[];
  recipient?: Recipient;
  filter?: Filter;
  limit?: Limit;
  notificationDisabled?: NotificationDisabled;
}
export type NarrowcastResponse = {
}
/** Recipient */
export type BaseRecipient = {
  /** Type of recipient */
  type?: string;
}
export type Recipient = OperatorRecipient | AudienceRecipient | RedeliveryRecipient
export type OperatorRecipient = (BaseRecipient & {
  type: "operator"
} & ({
  and?: Recipient[]
  or?: Recipient[]
  not?: Recipient
}))
export type AudienceRecipient = (BaseRecipient & {
  type: "audience"
} & ({
  audienceGroupId?: number
}))
export type RedeliveryRecipient = (BaseRecipient & {
  type: "redelivery"
} & ({
  requestId?: string
}))
/** Filter for narrowcast */
export type Filter = {
  demographic?: DemographicFilter;
}
/** Demographic filter */
export type BaseDemographicFilter = {
  /** Type of demographic filter */
  type?: string;
}
export type DemographicFilter = AgeDemographicFilter | AppTypeDemographicFilter | AreaDemographicFilter | GenderDemographicFilter | OperatorDemographicFilter | SubscriptionPeriodDemographicFilter
export type AgeDemographicFilter = (BaseDemographicFilter & {
  type: "age"
} & ({
  gte?: AgeDemographic
  lt?: AgeDemographic
}))
export type AgeDemographic = string
export type AppTypeDemographicFilter = (BaseDemographicFilter & {
  type: "appType"
} & ({
  oneOf?: AppTypeDemographic[]
}))
export type AppTypeDemographic = string
export type AreaDemographicFilter = (BaseDemographicFilter & {
  type: "area"
} & ({
  oneOf?: AreaDemographic[]
}))
export type AreaDemographic = string
export type GenderDemographicFilter = (BaseDemographicFilter & {
  type: "gender"
} & ({
  oneOf?: GenderDemographic[]
}))
export type GenderDemographic = string
export type OperatorDemographicFilter = (BaseDemographicFilter & {
  type: "operator"
} & ({
  and?: DemographicFilter[]
  or?: DemographicFilter[]
  not?: DemographicFilter
}))
export type SubscriptionPeriodDemographicFilter = (BaseDemographicFilter & {
  type: "subscriptionPeriod"
} & ({
  gte?: SubscriptionPeriodDemographic
  lt?: SubscriptionPeriodDemographic
}))
export type SubscriptionPeriodDemographic = string
/** Limit of the Narrowcast */
export type Limit = {
  /** The maximum number of narrowcast messages to send.
  Use this parameter to limit the number of narrowcast messages sent.
  The recipients will be chosen at random. */
  max?: number;
  /** If true, the message will be sent within the maximum number of deliverable messages. The default value is `false`.

  Targets will be selected at random. */
  upToRemainingQuota?: boolean;
}
export type NarrowcastProgressResponse = {
  /** The current status. One of:

  `waiting`: Messages are not yet ready to be sent. They are currently being filtered or processed in some way.
  `sending`: Messages are currently being sent.
  `succeeded`: Messages were sent successfully. This may not mean the messages were successfully received.
  `failed`: Messages failed to be sent. Use the failedDescription property to find the cause of the failure. */
  phase: string;
  /** The number of users who successfully received the message. */
  successCount?: number;
  /** The number of users who failed to send the message. */
  failureCount?: number;
  /** The number of intended recipients of the message. */
  targetCount?: number;
  /** The reason the message failed to be sent. This is only included with a `phase` property value of `failed`. */
  failedDescription?: string;
  /** Error summary. This is only included with a phase property value of failed.
  One of:

  `1`: An internal error occurred.
  `2`: An error occurred because there weren't enough recipients.
  `3`: A conflict error of requests occurs because a request that has already been accepted is retried. */
  errorCode?: number;
  /** Narrowcast message request accepted time in milliseconds.

  Format: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)
  Timezone: UTC */
  acceptedTime: string;
  /** Processing of narrowcast message request completion time in milliseconds. Returned when the phase property is succeeded or failed.

  Format: ISO 8601 (e.g. 2020-12-03T10:15:30.121Z)
  Timezone: UTC */
  completedTime?: string;
}
export type BroadcastRequest = {
  /** List of Message objects. */
  messages: Message[];
  notificationDisabled?: NotificationDisabled;
}
export type BroadcastResponse = {
}
export type MessageQuotaResponse = {
  type: QuotaType;
  /** The target limit for sending messages in the current month. This property is returned when the `type` property has a value of `limited`. */
  value?: number;
}
/** One of the following values to indicate whether a target limit is set or not. */
export type QuotaType = string
export type QuotaConsumptionResponse = {
  /** The number of sent messages in the current month */
  totalUsage: number;
}
export type NumberOfMessagesResponse = {
  /** Aggregation process status. One of:

  `ready`: The number of messages can be obtained.
  `unready`: We haven't finished calculating the number of sent messages for the specified in date. For example, this property is returned when the delivery date or a future date is specified. Calculation usually takes about a day.
  `unavailable_for_privacy`: The total number of messages on the specified day is less than 20.
  `out_of_service`: The specified date is earlier than the date on which we first started calculating sent messages (March 31, 2018). */
  status: string;
  /** The number of messages delivered using the phone number on the date specified in `date`.
  The response has this property only when the value of `status` is `ready`. */
  success?: number;
}
export type ValidateMessageRequest = {
  /** Array of message objects to validate */
  messages: Message[];
}
export type GetAggregationUnitUsageResponse = {
  /** Number of aggregation units used this month. */
  numOfCustomAggregationUnits: number;
}
export type GetAggregationUnitNameListResponse = {
  /** An array of strings indicating the names of aggregation units used this month. */
  customAggregationUnits: string[];
  /** A continuation token to get the next array of unit names.
  Returned only when there are remaining aggregation units that weren't returned in customAggregationUnits in the original request. */
  next?: string;
}
export type UserProfileResponse = {
  /** User's display name */
  displayName: string;
  /** User ID */
  userId: string;
  /** Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image. */
  pictureUrl?: string;
  /** User's status message. Not included in the response if the user doesn't have a status message. */
  statusMessage?: string;
  /** User's language, as a BCP 47 language tag. Not included in the response if the user hasn't yet consented to the LINE Privacy Policy. */
  language?: string;
}
export type GetFollowersResponse = {
  /** An array of strings indicating user IDs of users that have added the LINE Official Account as a friend.
  Only users of LINE for iOS and LINE for Android are included in `userIds`. */
  userIds: string[];
  /** A continuation token to get the next array of user IDs.
  Returned only when there are remaining user IDs that weren't returned in `userIds` in the original request.
  The number of user IDs in the `userIds` element doesn't have to reach the maximum number specified by `limit` for the `next` property to be included in the response. */
  next?: string;
}
export type BotInfoResponse = {
  /** Bot's user ID */
  userId: string;
  /** Bot's basic ID */
  basicId: string;
  /** Bot's premium ID. Not included in the response if the premium ID isn't set. */
  premiumId?: string;
  /** Bot's display name */
  displayName: string;
  /** Profile image URL. `https` image URL. Not included in the response if the bot doesn't have a profile image. */
  pictureUrl?: string;
  /** Chat settings set in the LINE Official Account Manager. One of:

  `chat`: Chat is set to "On".
  `bot`: Chat is set to "Off". */
  chatMode: string;
  /** Automatic read setting for messages. If the chat is set to "Off", auto is returned. If the chat is set to "On", manual is returned.

  `auto`: Auto read setting is enabled.
  `manual`: Auto read setting is disabled. */
  markAsReadMode: string;
}
export type GroupUserProfileResponse = {
  /** User's display name */
  displayName: string;
  /** User ID */
  userId: string;
  /** Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image. */
  pictureUrl?: string;
}
export type RoomUserProfileResponse = {
  /** User's display name */
  displayName: string;
  /** User ID */
  userId: string;
  /** Profile image URL. `https` image URL. Not included in the response if the user doesn't have a profile image. */
  pictureUrl?: string;
}
export type MembersIdsResponse = {
  /** List of user IDs of members in the group chat. Only users of LINE for iOS and LINE for Android are included in `memberIds`. */
  memberIds: string[];
  /** A continuation token to get the next array of user IDs of the members in the group chat.
  Returned only when there are remaining user IDs that were not returned in `memberIds` in the original request. */
  next?: string;
}
export type GroupSummaryResponse = {
  /** Group ID */
  groupId: string;
  /** Group name */
  groupName: string;
  /** Group icon URL. Not included in the response if the user doesn't set a group profile icon. */
  pictureUrl?: string;
}
export type GroupMemberCountResponse = {
  /** The count of members in the group chat. The number returned excludes the LINE Official Account. */
  count: number;
}
export type RoomMemberCountResponse = {
  /** The count of members in the multi-person chat. The number returned excludes the LINE Official Account. */
  count: number;
}
export type RichMenuRequest = {
  size?: RichMenuSize;
  /** `true` to display the rich menu by default. Otherwise, `false`. */
  selected?: boolean;
  /** Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users. */
  name?: string;
  /** Text displayed in the chat bar */
  chatBarText?: string;
  /** Array of area objects which define the coordinates and size of tappable areas */
  areas?: RichMenuArea[];
}
/** Rich menu size */
export type RichMenuSize = {
  /** width */
  width?: number;
  /** height */
  height?: number;
}
/** Rich menu area */
export type RichMenuArea = {
  bounds?: RichMenuBounds;
  action?: Action;
}
/** Rich menu bounds */
export type RichMenuBounds = {
  /** Horizontal position relative to the top-left corner of the area. */
  x?: number;
  /** Vertical position relative to the top-left corner of the area. */
  y?: number;
  /** Width of the area. */
  width?: number;
  /** Height of the area. */
  height?: number;
}
export type RichMenuIdResponse = {
  /** Rich menu ID */
  richMenuId: string;
}
export type RichMenuResponse = {
  /** ID of a rich menu */
  richMenuId: string;
  size: RichMenuSize;
  /** `true` to display the rich menu by default. Otherwise, `false`. */
  selected: boolean;
  /** Name of the rich menu. This value can be used to help manage your rich menus and is not displayed to users. */
  name: string;
  /** Text displayed in the chat bar */
  chatBarText: string;
  /** Array of area objects which define the coordinates and size of tappable areas */
  areas: RichMenuArea[];
}
export type RichMenuListResponse = {
  /** Rich menus */
  richmenus: RichMenuResponse[];
}
export type CreateRichMenuAliasRequest = {
  /** Rich menu alias ID, which can be any ID, unique for each channel. */
  richMenuAliasId: string;
  /** The rich menu ID to be associated with the rich menu alias. */
  richMenuId: string;
}
export type RichMenuAliasResponse = {
  /** Rich menu alias ID. */
  richMenuAliasId: string;
  /** The rich menu ID associated with the rich menu alias. */
  richMenuId: string;
}
export type UpdateRichMenuAliasRequest = {
  /** The rich menu ID to be associated with the rich menu alias. */
  richMenuId: string;
}
export type RichMenuAliasListResponse = {
  /** Rich menu aliases. */
  aliases: RichMenuAliasResponse[];
}
export type RichMenuBulkLinkRequest = {
  /** ID of a rich menu */
  richMenuId: string;
  /** Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE. */
  userIds: string[];
}
export type RichMenuBulkUnlinkRequest = {
  /** Array of user IDs. Found in the `source` object of webhook event objects. Do not use the LINE ID used in LINE. */
  userIds: string[];
}
export type RichMenuBatchRequest = {
  /** Array of Rich menu operation object... */
  operations: RichMenuBatchOperation[];
  /** Key for retry. Key value is a string matching the regular expression pattern */
  resumeRequestKey?: string;
}
/** Rich menu operation object represents the batch operation to the rich menu linked to the user. */
export type BaseRichMenuBatchOperation = {
  /** The type of operation to the rich menu linked to the user. One of link, unlink, or unlinkAll. */
  type: string;
}
export type RichMenuBatchOperation = RichMenuBatchLinkOperation | RichMenuBatchUnlinkOperation | RichMenuBatchUnlinkAllOperation
/** Replace the rich menu with the rich menu specified in the `to` property for all users linked to the rich menu specified in the `from` property. */
export type RichMenuBatchLinkOperation = (BaseRichMenuBatchOperation & {
  type: "link"
} & ({
  from?: string
  to?: string
}))
/** Unlink the rich menu for all users linked to the rich menu specified in the `from` property. */
export type RichMenuBatchUnlinkOperation = (BaseRichMenuBatchOperation & {
  type: "unlink"
} & ({
  from?: string
}))
/** Unlink the rich menu from all users linked to the rich menu. */
export type RichMenuBatchUnlinkAllOperation = (BaseRichMenuBatchOperation & {
  type: "unlinkAll"
})
export type RichMenuBatchProgressResponse = {
  phase: RichMenuBatchProgressPhase;
  /** The accepted time in milliseconds of the request of batch control the rich menu.

  Format: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)
  Timezone: UTC */
  acceptedTime: string;
  /** The completed time in milliseconds of rich menu batch control. Returned when the phase property is succeeded or failed.

  Format: ISO 8601 (e.g. 2023-06-08T10:15:30.121Z)
  Timezone: UTC */
  completedTime?: string;
}
/** The current status. One of:

`ongoing`: Rich menu batch control is in progress.
`succeeded`: Rich menu batch control is complete.
`failed`: Rich menu batch control failed.
          This means that the rich menu for one or more users couldn't be controlled.
          There may also be users whose operations have been successfully completed. */
export type RichMenuBatchProgressPhase = string
export type IssueLinkTokenResponse = {
  /** Link token.
  Link tokens are valid for 10 minutes and can only be used once. */
  linkToken: string;
}
export type MarkMessagesAsReadRequest = {
  chat: ChatReference;
}
/** Chat reference */
export type ChatReference = {
  /** The target user ID */
  userId: string;
}
export type PnpMessagesRequest = {
  /** Message to be sent. */
  messages: Message[];
  /** Message destination. Specify a phone number that has been normalized to E.164 format and hashed with SHA256. */
  to: string;
  notificationDisabled?: NotificationDisabled;
}
export type AudienceMatchMessagesRequest = {
  /** Destination of the message (A value obtained by hashing the telephone number, which is another value normalized to E.164 format, with SHA256). */
  messages: Message[];
  /** Message to send. */
  to: string[];
  notificationDisabled?: NotificationDisabled;
}
export type BaseMessage = {
  /** Type of message */
  type: string;
  quickReply?: QuickReply;
  sender?: Sender;
}
export type Message = TextMessage | StickerMessage | ImageMessage | VideoMessage | AudioMessage | LocationMessage | ImagemapMessage | TemplateMessage | FlexMessage
/** Quick reply */
export type QuickReply = {
  /** Quick reply button objects. */
  items?: QuickReplyItem[];
}
export type QuickReplyItem = {
  /** URL of the icon that is displayed at the beginning of the button */
  imageUrl?: string;
  action?: Action;
  /** `action` */
  type?: string;
}
/** Change icon and display name */
export type Sender = {
  /** Display name. Certain words such as `LINE` may not be used. */
  name?: string;
  /** URL of the image to display as an icon when sending a message */
  iconUrl?: string;
}
export type TextMessage = (BaseMessage & {
  type: "text"
} & ({
  text?: string
  emojis?: Emoji[]
  quoteToken?: string
}))
export type Emoji = {
  index?: number;
  productId?: string;
  emojiId?: string;
}
export type StickerMessage = (BaseMessage & {
  type: "sticker"
} & ({
  packageId?: string
  stickerId?: string
  quoteToken?: string
}))
export type ImageMessage = (BaseMessage & {
  type: "image"
} & ({
  originalContentUrl?: string
  previewImageUrl?: string
}))
export type VideoMessage = (BaseMessage & {
  type: "video"
} & ({
  originalContentUrl?: string
  previewImageUrl?: string
  trackingId?: string
}))
export type AudioMessage = (BaseMessage & {
  type: "audio"
} & ({
  originalContentUrl?: string
  duration?: number
}))
export type LocationMessage = (BaseMessage & {
  type: "location"
} & ({
  title?: string
  address?: string
  latitude?: unknown
  longitude?: unknown
}))
export type ImagemapMessage = (BaseMessage & {
  type: "imagemap"
} & ({
  baseUrl?: string
  altText?: string
  baseSize?: ImagemapBaseSize
  actions?: ImagemapAction[]
  video?: ImagemapVideo
}))
export type ImagemapBaseSize = {
  height?: number;
  width?: number;
}
export type BaseImagemapAction = {
  type: string;
  area?: ImagemapArea;
}
export type ImagemapAction = MessageImagemapAction | URIImagemapAction
export type MessageImagemapAction = (BaseImagemapAction & {
  type: "message"
} & ({
  text?: string
  label?: string
}))
export type URIImagemapAction = (BaseImagemapAction & {
  type: "uri"
} & ({
  linkUri?: string
  label?: string
}))
export type ImagemapArea = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
export type ImagemapVideo = {
  originalContentUrl?: string;
  previewImageUrl?: string;
  area?: ImagemapArea;
  externalLink?: ImagemapExternalLink;
}
export type ImagemapExternalLink = {
  linkUri?: string;
  label?: string;
}
export type TemplateMessage = (BaseMessage & {
  type: "template"
} & ({
  altText?: string
  template?: Template
}))
export type BaseTemplate = {
  type: string;
}
export type Template = ButtonsTemplate | ConfirmTemplate | CarouselTemplate | ImageCarouselTemplate
export type ButtonsTemplate = (BaseTemplate & {
  type: "buttons"
} & ({
  thumbnailImageUrl?: string
  imageAspectRatio?: string
  imageSize?: string
  imageBackgroundColor?: string
  title?: string
  text?: string
  defaultAction?: Action
  actions?: Action[]
}))
export type ConfirmTemplate = (BaseTemplate & {
  type: "confirm"
} & ({
  text?: string
  actions?: Action[]
}))
export type CarouselTemplate = (BaseTemplate & {
  type: "carousel"
} & ({
  columns?: CarouselColumn[]
  imageAspectRatio?: string
  imageSize?: string
}))
/** Column object for carousel template. */
export type CarouselColumn = {
  thumbnailImageUrl?: string;
  imageBackgroundColor?: string;
  title?: string;
  text?: string;
  defaultAction?: Action;
  actions?: Action[];
}
export type ImageCarouselTemplate = (BaseTemplate & {
  type: "image_carousel"
} & ({
  columns?: ImageCarouselColumn[]
}))
export type ImageCarouselColumn = {
  imageUrl?: string;
  action?: Action;
}
export type FlexMessage = (BaseMessage & {
  type: "flex"
} & ({
  altText?: string
  contents?: FlexContainer
}))
export type BaseFlexContainer = {
  type: string;
}
export type FlexContainer = FlexBubble | FlexCarousel
export type FlexBubble = (BaseFlexContainer & {
  type: "bubble"
} & ({
  direction?: string
  styles?: FlexBubbleStyles
  header?: FlexBox
  hero?: FlexComponent
  body?: FlexBox
  footer?: FlexBox
  size?: string
  action?: Action
}))
export type FlexCarousel = (BaseFlexContainer & {
  type: "carousel"
} & ({
  contents?: FlexBubble[]
}))
export type FlexBubbleStyles = {
  header?: FlexBlockStyle;
  hero?: FlexBlockStyle;
  body?: FlexBlockStyle;
  footer?: FlexBlockStyle;
}
export type FlexBlockStyle = {
  backgroundColor?: string;
  separator?: boolean;
  separatorColor?: string;
}
export type BaseFlexComponent = {
  type: string;
}
export type FlexComponent = FlexBox | FlexButton | FlexImage | FlexVideo | FlexIcon | FlexText | FlexSpan | FlexSeparator | FlexFiller
export type FlexBox = (BaseFlexComponent & {
  type: "box"
} & ({
  layout?: string
  flex?: number
  contents?: FlexComponent[]
  spacing?: string
  margin?: string
  position?: string
  offsetTop?: string
  offsetBottom?: string
  offsetStart?: string
  offsetEnd?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  cornerRadius?: string
  width?: string
  maxWidth?: string
  height?: string
  maxHeight?: string
  paddingAll?: string
  paddingTop?: string
  paddingBottom?: string
  paddingStart?: string
  paddingEnd?: string
  action?: Action
  justifyContent?: string
  alignItems?: string
  background?: FlexBoxBackground
}))
export type FlexButton = (BaseFlexComponent & {
  type: "button"
} & ({
  flex?: number
  color?: string
  style?: string
  action?: Action
  gravity?: string
  margin?: string
  position?: string
  offsetTop?: string
  offsetBottom?: string
  offsetStart?: string
  offsetEnd?: string
  height?: string
  adjustMode?: string
  scaling?: boolean
}))
export type FlexImage = (BaseFlexComponent & {
  type: "image"
} & ({
  url?: string
  flex?: number
  margin?: string
  position?: string
  offsetTop?: string
  offsetBottom?: string
  offsetStart?: string
  offsetEnd?: string
  align?: string
  gravity?: string
  size?: string
  aspectRatio?: string
  aspectMode?: string
  backgroundColor?: string
  action?: Action
  animated?: boolean
}))
export type FlexVideo = (BaseFlexComponent & {
  type: "video"
} & ({
  url?: string
  previewUrl?: string
  altContent?: FlexComponent
  aspectRatio?: string
  action?: Action
}))
export type FlexIcon = (BaseFlexComponent & {
  type: "icon"
} & ({
  url?: string
  size?: string
  aspectRatio?: string
  margin?: string
  position?: string
  offsetTop?: string
  offsetBottom?: string
  offsetStart?: string
  offsetEnd?: string
  scaling?: boolean
}))
export type FlexText = (BaseFlexComponent & {
  type: "text"
} & ({
  flex?: number
  text?: string
  size?: string
  align?: string
  gravity?: string
  color?: string
  weight?: string
  style?: string
  decoration?: string
  wrap?: boolean
  lineSpacing?: string
  margin?: string
  position?: string
  offsetTop?: string
  offsetBottom?: string
  offsetStart?: string
  offsetEnd?: string
  action?: Action
  maxLines?: number
  contents?: FlexSpan[]
  adjustMode?: string
  scaling?: boolean
}))
export type FlexSpan = (BaseFlexComponent & {
  type: "span"
} & ({
  text?: string
  size?: string
  color?: string
  weight?: string
  style?: string
  decoration?: string
}))
export type FlexSeparator = (BaseFlexComponent & {
  type: "separator"
} & ({
  margin?: string
  color?: string
}))
export type FlexFiller = (BaseFlexComponent & {
  type: "filler"
} & ({
  flex?: number
}))
export type BaseFlexBoxBackground = {
  type: string;
}
export type FlexBoxBackground = FlexBoxLinearGradient
export type FlexBoxLinearGradient = (BaseFlexBoxBackground & {
  type: "linearGradient"
} & ({
  angle?: string
  startColor?: string
  endColor?: string
  centerColor?: string
  centerPosition?: string
}))
/** Action */
export type BaseAction = {
  /** Type of action */
  type?: string;
  /** Label for the action. */
  label?: string;
}
export type Action = CameraAction | CameraRollAction | DatetimePickerAction | LocationAction | MessageAction | PostbackAction | RichMenuSwitchAction | URIAction
export type CameraAction = (BaseAction & {
  type: "camera"
})
export type CameraRollAction = (BaseAction & {
  type: "cameraRoll"
})
export type DatetimePickerAction = (BaseAction & {
  type: "datetimepicker"
} & ({
  data?: string
  mode?: string
  initial?: string
  max?: string
  min?: string
}))
export type LocationAction = (BaseAction & {
  type: "location"
})
export type MessageAction = (BaseAction & {
  type: "message"
} & ({
  text?: string
}))
export type PostbackAction = (BaseAction & {
  type: "postback"
} & ({
  data?: string
  displayText?: string
  text?: string
  inputOption?: string
  fillInText?: string
}))
export type RichMenuSwitchAction = (BaseAction & {
  type: "richmenuswitch"
} & ({
  data?: string
  richMenuAliasId?: string
}))
export type URIAction = (BaseAction & {
  type: "uri"
} & ({
  uri?: string
  altUri?: AltUri
}))
export type AltUri = {
  desktop?: string;
}
export type ErrorResponse = {
  /** Message containing information about the error. */
  message: string;
  /** An array of error details. If the array is empty, this property will not be included in the response. */
  details?: ErrorDetail[];
  /** Array of sent messages. */
  sentMessages?: SentMessage[];
}
export type ErrorDetail = {
  /** Details of the error. Not included in the response under certain situations. */
  message?: string;
  /** Location of where the error occurred. Returns the JSON field name or query parameter name of the request. Not included in the response under certain situations. */
  property?: string;
}
export interface GetNarrowcastProgressQuery {
  /** The narrowcast message's request ID. Each Messaging API request has a request ID. */
  requestId: string
}
export interface GetNumberOfSentReplyMessagesQuery {
  /** Date the messages were sent

  Format: `yyyyMMdd` (e.g. `20191231`)
  Timezone: UTC+9 */
  date: string
}
export interface GetNumberOfSentPushMessagesQuery {
  /** Date the messages were sent

  Format: `yyyyMMdd` (e.g. `20191231`)
  Timezone: UTC+9 */
  date: string
}
export interface GetNumberOfSentMulticastMessagesQuery {
  /** Date the messages were sent

  Format: `yyyyMMdd` (e.g. `20191231`)
  Timezone: UTC+9 */
  date: string
}
export interface GetNumberOfSentBroadcastMessagesQuery {
  /** Date the messages were sent

  Format: yyyyMMdd (e.g. 20191231)
  Timezone: UTC+9 */
  date: string
}
export interface GetAggregationUnitNameListQuery {
  /** The maximum number of aggregation units you can get per request. */
  limit?: string
  /** Value of the continuation token found in the next property of the JSON object returned in the response.
  If you can't get all the aggregation units in one request, include this parameter to get the remaining array. */
  start?: string
}
export interface GetFollowersQuery {
  /** Value of the continuation token found in the next property of the JSON object returned in the response.
  Include this parameter to get the next array of user IDs. */
  start?: string
  /** The maximum number of user IDs to retrieve in a single request. */
  limit?: number
}
export interface GetGroupMembersIdsQuery {
  /** Value of the continuation token found in the `next` property of the JSON object returned in the response.
  Include this parameter to get the next array of user IDs for the members of the group. */
  start?: string
}
export interface GetRoomMembersIdsQuery {
  /** Value of the continuation token found in the `next` property of the JSON object returned in the response.
  Include this parameter to get the next array of user IDs for the members of the group. */
  start?: string
}
export interface GetRichMenuBatchProgressQuery {
  /** A request ID used to batch control the rich menu linked to the user. Each Messaging API request has a request ID. */
  requestId: string
}
export interface GetPNPMessageStatisticsQuery {
  /** Date the message was sent

  Format: `yyyyMMdd` (Example:`20211231`)
  Time zone: UTC+9 */
  date: string
}
export interface GetAdPhoneMessageStatisticsQuery {
  /** Date the message was sent

  Format: `yyyyMMdd` (e.g. `20190831`)
  Time Zone: UTC+9 */
  date: string
}
