export type GetWebhookEndpointResponse = {
  endpoint: string
  active: boolean
}

export type SetWebhookEndpointRequest = {
  endpoint: string
}

export type TestWebhookEndpointRequest = {
  endpoint?: string
}

export type TestWebhookEndpointResponse = {
  success?: boolean
  timestamp: string
  statusCode: number
  reason: string
  detail: string
}

export type GetMessageContentTranscodingResponse = {
  status: string
}

export type ReplyMessageRequest = {
  replyToken: string
  messages: Message[]
  notificationDisabled?: NotificationDisabled
}

export type PushMessageRequest = {
  to: string
  messages: Message[]
  notificationDisabled?: NotificationDisabled
  customAggregationUnits?: string[]
}

export type NotificationDisabled = boolean

export type MulticastRequest = {
  messages: Message[]
  to: string[]
  notificationDisabled?: NotificationDisabled
  customAggregationUnits?: string[]
}

export type NarrowcastRequest = {
  messages: Message[]
  recipient?: Recipient
  filter?: Filter
  limit?: Limit
  notificationDisabled?: NotificationDisabled
}

export type BaseRecipient = {
  type?: string
}

export type Recipient = OperatorRecipient | AudienceRecipient | RedeliveryRecipient
export type OperatorRecipient = BaseRecipient & { type: 'operator' } & {
  and?: Recipient[]
  or?: Recipient[]
  not?: Recipient
}

export type AudienceRecipient = BaseRecipient & { type: 'audience' } & {
  audienceGroupId?: number
}

export type RedeliveryRecipient = BaseRecipient & { type: 'redelivery' } & {
  requestId?: string
}

export type Filter = {
  demographic?: DemographicFilter
}

export type BaseDemographicFilter = {
  type?: string
}

export type DemographicFilter =
  | AgeDemographicFilter
  | AppTypeDemographicFilter
  | AreaDemographicFilter
  | GenderDemographicFilter
  | OperatorDemographicFilter
  | SubscriptionPeriodDemographicFilter

export type AgeDemographicFilter = BaseDemographicFilter & { type: 'age' } & {
  gte?: AgeDemographic
  lt?: AgeDemographic
}

export type AgeDemographic = string

export type AppTypeDemographicFilter = BaseDemographicFilter & { type: 'appType' } & {
  oneOf?: AppTypeDemographic[]
}

export type AppTypeDemographic = string

export type AreaDemographicFilter = BaseDemographicFilter & { type: 'area' } & {
  oneOf?: AreaDemographic[]
}

export type AreaDemographic = string

export type GenderDemographicFilter = BaseDemographicFilter & { type: 'gender' } & {
  oneOf?: GenderDemographic[]
}

export type GenderDemographic = string

export type OperatorDemographicFilter = BaseDemographicFilter & { type: 'operator' } & {
  and?: DemographicFilter[]
  or?: DemographicFilter[]
  not?: DemographicFilter
}

export type SubscriptionPeriodDemographicFilter = BaseDemographicFilter & { type: 'subscriptionPeriod' } & {
  gte?: SubscriptionPeriodDemographic
  lt?: SubscriptionPeriodDemographic
}

export type SubscriptionPeriodDemographic = string

export type Limit = {
  max?: number
  upToRemainingQuota?: boolean
}

export type NarrowcastProgressResponse = {
  phase: string
  successCount?: number
  failureCount?: number
  targetCount?: number
  failedDescription?: string
  errorCode?: number
  acceptedTime: string
  completedTime?: string
}

export type BroadcastRequest = {
  messages: Message[]
  notificationDisabled?: NotificationDisabled
}

export type MessageQuotaResponse = {
  type: QuotaType
  value?: number
}

export type QuotaType = string

export type QuotaConsumptionResponse = {
  totalUsage: number
}

export type NumberOfMessagesResponse = {
  status: string
  success?: number
}

export type ValidateMessageRequest = {
  messages: Message[]
}

export type GetAggregationUnitUsageResponse = {
  numOfCustomAggregationUnits: number
}

export type GetAggregationUnitNameListResponse = {
  customAggregationUnits: string[]
  next?: string
}

export type UserProfileResponse = {
  displayName: string
  userId: string
  pictureUrl?: string
  statusMessage?: string
  language?: string
}

export type GetFollowersResponse = {
  userIds: string[]
  next?: string
}

export type BotInfoResponse = {
  userId: string
  basicId: string
  premiumId?: string
  displayName: string
  pictureUrl?: string
  chatMode: string
  markAsReadMode: string
}

export type GroupUserProfileResponse = {
  displayName: string
  userId: string
  pictureUrl?: string
}

export type RoomUserProfileResponse = {
  displayName: string
  userId: string
  pictureUrl?: string
}

export type MembersIdsResponse = {
  memberIds: string[]
  next?: string
}

export type GroupSummaryResponse = {
  groupId: string
  groupName: string
  pictureUrl?: string
}

export type GroupMemberCountResponse = {
  count: number
}

export type RoomMemberCountResponse = {
  count: number
}

export type RichMenuRequest = {
  size?: RichMenuSize
  selected?: boolean
  name?: string
  chatBarText?: string
  areas?: RichMenuArea[]
}

export type RichMenuSize = {
  width?: number
  height?: number
}

export type RichMenuArea = {
  bounds?: RichMenuBounds
  action?: Action
}

export type RichMenuBounds = {
  x?: number
  y?: number
  width?: number
  height?: number
}

export type RichMenuIdResponse = {
  richMenuId: string
}

export type RichMenuResponse = {
  richMenuId: string
  size: RichMenuSize
  selected: boolean
  name: string
  chatBarText: string
  areas: RichMenuArea[]
}

export type RichMenuListResponse = {
  richmenus: RichMenuResponse[]
}

export type CreateRichMenuAliasRequest = {
  richMenuAliasId: string
  richMenuId: string
}

export type RichMenuAliasResponse = {
  richMenuAliasId: string
  richMenuId: string
}

export type UpdateRichMenuAliasRequest = {
  richMenuId: string
}

export type RichMenuAliasListResponse = {
  aliases: RichMenuAliasResponse[]
}

export type RichMenuBulkLinkRequest = {
  richMenuId: string
  userIds: string[]
}

export type RichMenuBulkUnlinkRequest = {
  userIds: string[]
}

export type RichMenuBatchRequest = {
  operations: RichMenuBatchOperation[]
  resumeRequestKey?: string
}

export type BaseRichMenuBatchOperation = {
  type: string
}

export type RichMenuBatchOperation = RichMenuBatchLinkOperation | RichMenuBatchUnlinkOperation | RichMenuBatchUnlinkAllOperation
export type RichMenuBatchLinkOperation = BaseRichMenuBatchOperation & { type: 'link' } & {
  from?: string
  to?: string
}

export type RichMenuBatchUnlinkOperation = BaseRichMenuBatchOperation & { type: 'unlink' } & {
  from?: string
}

export type RichMenuBatchUnlinkAllOperation = BaseRichMenuBatchOperation

export type RichMenuBatchProgressResponse = {
  phase: RichMenuBatchProgressPhase
  acceptedTime: string
  completedTime?: string
}

export type RichMenuBatchProgressPhase = string

export type IssueLinkTokenResponse = {
  linkToken: string
}

export type MarkMessagesAsReadRequest = {
  chat: ChatReference
}

export type ChatReference = {
  userId: string
}

export type PnpMessagesRequest = {
  messages: Message[]
  to: string
  notificationDisabled?: NotificationDisabled
}

export type AudienceMatchMessagesRequest = {
  messages: Message[]
  to: string[]
  notificationDisabled?: NotificationDisabled
}

export type BaseMessage = {
  type: string
  quickReply?: QuickReply
  sender?: Sender
}

export type Message =
  | TextMessage
  | StickerMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | LocationMessage
  | ImagemapMessage
  | TemplateMessage
  | FlexMessage

export type QuickReply = {
  items?: QuickReplyItem[]
}

export type QuickReplyItem = {
  imageUrl?: string
  action?: Action
  type?: string
}

export type Sender = {
  name?: string
  iconUrl?: string
}

export type TextMessage = BaseMessage & { type: 'text' } & {
  text?: string
  emojis?: Emoji[]
}

export type Emoji = {
  index?: number
  productId?: string
  emojiId?: string
}

export type StickerMessage = BaseMessage & { type: 'sticker' } & {
  packageId?: string
  stickerId?: string
}

export type ImageMessage = BaseMessage & { type: 'image' } & {
  originalContentUrl?: string
  previewImageUrl?: string
}

export type VideoMessage = BaseMessage & { type: 'video' } & {
  originalContentUrl?: string
  previewImageUrl?: string
  trackingId?: string
}

export type AudioMessage = BaseMessage & { type: 'audio' } & {
  originalContentUrl?: string
  duration?: number
}

export type LocationMessage = BaseMessage & { type: 'location' } & {
  title?: string
  address?: string
  latitude?: unknown
  longitude?: unknown
}

export type ImagemapMessage = BaseMessage & { type: 'imagemap' } & {
  baseUrl?: string
  altText?: string
  baseSize?: ImagemapBaseSize
  actions?: ImagemapAction[]
  video?: ImagemapVideo
}

export type ImagemapBaseSize = {
  height?: number
  width?: number
}

export type BaseImagemapAction = {
  type: string
  area?: ImagemapArea
}

export type ImagemapAction = MessageImagemapAction | URIImagemapAction

export type MessageImagemapAction = BaseImagemapAction & { type: 'message' } & {
  text?: string
  label?: string
}

export type URIImagemapAction = BaseImagemapAction & { type: 'uri' } & {
  linkUri?: string
  label?: string
}

export type ImagemapArea = {
  x?: number
  y?: number
  width?: number
  height?: number
}

export type ImagemapVideo = {
  originalContentUrl?: string
  previewImageUrl?: string
  area?: ImagemapArea
  externalLink?: ImagemapExternalLink
}

export type ImagemapExternalLink = {
  linkUri?: string
  label?: string
}

export type TemplateMessage = BaseMessage & { type: 'template' } & {
  altText?: string
  template?: Template
}

export type BaseTemplate = {
  type: string
}

export type Template = ButtonsTemplate | ConfirmTemplate | CarouselTemplate | ImageCarouselTemplate
export type ButtonsTemplate = BaseTemplate & { type: 'buttons' } & {
  thumbnailImageUrl?: string
  imageAspectRatio?: string
  imageSize?: string
  imageBackgroundColor?: string
  title?: string
  text?: string
  defaultAction?: Action
  actions?: Action[]
}

export type ConfirmTemplate = BaseTemplate & { type: 'confirm' } & {
  text?: string
  actions?: Action[]
}

export type CarouselTemplate = BaseTemplate & { type: 'carousel' } & {
  columns?: CarouselColumn[]
  imageAspectRatio?: string
  imageSize?: string
}

export type CarouselColumn = {
  thumbnailImageUrl?: string
  imageBackgroundColor?: string
  title?: string
  text?: string
  defaultAction?: Action
  actions?: Action[]
}

export type ImageCarouselTemplate = BaseTemplate & { type: 'image_carousel' } & {
  columns?: ImageCarouselColumn[]
}

export type ImageCarouselColumn = {
  imageUrl?: string
  action?: Action
}

export type FlexMessage = BaseMessage & { type: 'flex' } & {
  altText?: string
  contents?: FlexContainer
}

export type BaseFlexContainer = {
  type: string
}

export type FlexContainer = FlexBubble | FlexCarousel
export type FlexBubble = BaseFlexContainer & { type: 'bubble' } & {
  direction?: string
  styles?: FlexBubbleStyles
  header?: FlexBox
  hero?: FlexComponent
  body?: FlexBox
  footer?: FlexBox
  size?: string
  action?: Action
}

export type FlexCarousel = BaseFlexContainer & { type: 'carousel' } & {
  contents?: FlexBubble[]
}

export type FlexBubbleStyles = {
  header?: FlexBlockStyle
  hero?: FlexBlockStyle
  body?: FlexBlockStyle
  footer?: FlexBlockStyle
}

export type FlexBlockStyle = {
  backgroundColor?: string
  separator?: boolean
  separatorColor?: string
}

export type BaseFlexComponent = {
  type: string
}

export type FlexComponent = FlexBox | FlexButton | FlexImage | FlexVideo | FlexIcon | FlexText | FlexSpan | FlexSeparator | FlexFiller
export type FlexBox = BaseFlexComponent & { type: 'box' } & unknown

export type FlexButton = BaseFlexComponent & { type: 'button' } & {
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
}

export type FlexImage = BaseFlexComponent & { type: 'image' } & {
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
}

export type FlexVideo = BaseFlexComponent & { type: 'video' } & {
  url?: string
  previewUrl?: string
  altContent?: FlexComponent
  aspectRatio?: string
  action?: Action
}

export type FlexIcon = BaseFlexComponent & { type: 'icon' } & {
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
}

export type FlexText = BaseFlexComponent & { type: 'text' } & {
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
}

export type FlexSpan = BaseFlexComponent & { type: 'span' } & {
  text?: string
  size?: string
  color?: string
  weight?: string
  style?: string
  decoration?: string
}

export type FlexSeparator = BaseFlexComponent & { type: 'separator' } & {
  margin?: string
  color?: string
}

export type FlexFiller = BaseFlexComponent & { type: 'filler' } & {
  flex?: number
}

export type BaseFlexBoxBackground = {
  type: string
}

export type FlexBoxBackground = FlexBoxLinearGradient
export type FlexBoxLinearGradient = BaseFlexBoxBackground & { type: 'linearGradient' } & {
  angle?: string
  startColor?: string
  endColor?: string
  centerColor?: string
  centerPosition?: string
}

export type BaseAction = {
  type?: string
  label?: string
}

export type Action = CameraAction | CameraRollAction | DatetimePickerAction | LocationAction | MessageAction | PostbackAction | RichMenuSwitchAction | URIAction
export type CameraAction = BaseAction

export type CameraRollAction = BaseAction

export type DatetimePickerAction = BaseAction & { type: 'datetimepicker' } & {
  data?: string
  mode?: string
  initial?: string
  max?: string
  min?: string
}

export type LocationAction = BaseAction

export type MessageAction = BaseAction & { type: 'message' } & {
  text?: string
}

export type PostbackAction = BaseAction & { type: 'postback' } & {
  data?: string
  displayText?: string
  text?: string
  inputOption?: string
  fillInText?: string
}

export type RichMenuSwitchAction = BaseAction & { type: 'richmenuswitch' } & {
  data?: string
  richMenuAliasId?: string
}

export type URIAction = BaseAction & { type: 'uri' } & {
  uri?: string
  altUri?: AltUri
}

export type AltUri = {
  desktop?: string
}

export type ErrorResponse = {
  message: string
  details?: ErrorDetail[]
}

export type ErrorDetail = {
  message?: string
  property?: string
}
