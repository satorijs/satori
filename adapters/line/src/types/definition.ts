export namespace Definitions {
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
    messages: Definitions.Message[]
    notificationDisabled?: Definitions.NotificationDisabled
  }

  export type PushMessageRequest = {
    to: string
    messages: Definitions.Message[]
    notificationDisabled?: Definitions.NotificationDisabled
    customAggregationUnits?: string[]
  }

  export type NotificationDisabled = boolean

  export type MulticastRequest = {
    messages: Definitions.Message[]
    to: string[]
    notificationDisabled?: Definitions.NotificationDisabled
    customAggregationUnits?: string[]
  }

  export type NarrowcastRequest = {
    messages: Definitions.Message[]
    recipient?: Definitions.Recipient
    filter?: Definitions.Filter
    limit?: Definitions.Limit
    notificationDisabled?: Definitions.NotificationDisabled
  }

  export type BaseRecipient = {
    type?: string
  }

  export type Recipient = OperatorRecipient | AudienceRecipient | RedeliveryRecipient
  export type OperatorRecipient = Definitions.BaseRecipient & { type: 'operator' } & {
    and?: Definitions.Recipient[]
    or?: Definitions.Recipient[]
    not?: Definitions.Recipient
  }

  export type AudienceRecipient = Definitions.BaseRecipient & { type: 'audience' } & {
    audienceGroupId?: number
  }

  export type RedeliveryRecipient = Definitions.BaseRecipient & { type: 'redelivery' } & {
    requestId?: string
  }

  export type Filter = {
    demographic?: Definitions.DemographicFilter
  }

  export type BaseDemographicFilter = {
    type?: string
  }

  export type DemographicFilter = AgeDemographicFilter | AppTypeDemographicFilter | AreaDemographicFilter | GenderDemographicFilter | OperatorDemographicFilter | SubscriptionPeriodDemographicFilter
  export type AgeDemographicFilter = Definitions.BaseDemographicFilter & { type: 'age' } & {
    gte?: Definitions.AgeDemographic
    lt?: Definitions.AgeDemographic
  }

  export type AgeDemographic = string

  export type AppTypeDemographicFilter = Definitions.BaseDemographicFilter & { type: 'appType' } & {
    oneOf?: Definitions.AppTypeDemographic[]
  }

  export type AppTypeDemographic = string

  export type AreaDemographicFilter = Definitions.BaseDemographicFilter & { type: 'area' } & {
    oneOf?: Definitions.AreaDemographic[]
  }

  export type AreaDemographic = string

  export type GenderDemographicFilter = Definitions.BaseDemographicFilter & { type: 'gender' } & {
    oneOf?: Definitions.GenderDemographic[]
  }

  export type GenderDemographic = string

  export type OperatorDemographicFilter = Definitions.BaseDemographicFilter & { type: 'operator' } & {
    and?: Definitions.DemographicFilter[]
    or?: Definitions.DemographicFilter[]
    not?: Definitions.DemographicFilter
  }

  export type SubscriptionPeriodDemographicFilter = Definitions.BaseDemographicFilter & { type: 'subscriptionPeriod' } & {
    gte?: Definitions.SubscriptionPeriodDemographic
    lt?: Definitions.SubscriptionPeriodDemographic
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
    messages: Definitions.Message[]
    notificationDisabled?: Definitions.NotificationDisabled
  }

  export type MessageQuotaResponse = {
    type: Definitions.QuotaType
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
    messages: Definitions.Message[]
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
    size?: Definitions.RichMenuSize
    selected?: boolean
    name?: string
    chatBarText?: string
    areas?: Definitions.RichMenuArea[]
  }

  export type RichMenuSize = {
    width?: number
    height?: number
  }

  export type RichMenuArea = {
    bounds?: Definitions.RichMenuBounds
    action?: Definitions.Action
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
    size: Definitions.RichMenuSize
    selected: boolean
    name: string
    chatBarText: string
    areas: Definitions.RichMenuArea[]
  }

  export type RichMenuListResponse = {
    richmenus: Definitions.RichMenuResponse[]
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
    aliases: Definitions.RichMenuAliasResponse[]
  }

  export type RichMenuBulkLinkRequest = {
    richMenuId: string
    userIds: string[]
  }

  export type RichMenuBulkUnlinkRequest = {
    userIds: string[]
  }

  export type RichMenuBatchRequest = {
    operations: Definitions.RichMenuBatchOperation[]
    resumeRequestKey?: string
  }

  export type BaseRichMenuBatchOperation = {
    type: string
  }

  export type RichMenuBatchOperation = RichMenuBatchLinkOperation | RichMenuBatchUnlinkOperation | RichMenuBatchUnlinkAllOperation
  export type RichMenuBatchLinkOperation = Definitions.BaseRichMenuBatchOperation & { type: 'link' } & {
    from?: string
    to?: string
  }

  export type RichMenuBatchUnlinkOperation = Definitions.BaseRichMenuBatchOperation & { type: 'unlink' } & {
    from?: string
  }

  export type RichMenuBatchUnlinkAllOperation = Definitions.BaseRichMenuBatchOperation

  export type RichMenuBatchProgressResponse = {
    phase: Definitions.RichMenuBatchProgressPhase
    acceptedTime: string
    completedTime?: string
  }

  export type RichMenuBatchProgressPhase = string

  export type IssueLinkTokenResponse = {
    linkToken: string
  }

  export type MarkMessagesAsReadRequest = {
    chat: Definitions.ChatReference
  }

  export type ChatReference = {
    userId: string
  }

  export type PnpMessagesRequest = {
    messages: Definitions.Message[]
    to: string
    notificationDisabled?: Definitions.NotificationDisabled
  }

  export type AudienceMatchMessagesRequest = {
    messages: Definitions.Message[]
    to: string[]
    notificationDisabled?: Definitions.NotificationDisabled
  }

  export type BaseMessage = {
    type: string
    quickReply?: Definitions.QuickReply
    sender?: Definitions.Sender
  }

  export type Message = TextMessage | StickerMessage | ImageMessage | VideoMessage | AudioMessage | LocationMessage | ImagemapMessage | TemplateMessage | FlexMessage
  export type QuickReply = {
    items?: Definitions.QuickReplyItem[]
  }

  export type QuickReplyItem = {
    imageUrl?: string
    action?: Definitions.Action
    type?: string
  }

  export type Sender = {
    name?: string
    iconUrl?: string
  }

  export type TextMessage = Definitions.BaseMessage & { type: 'text' } & {
    text?: string
    emojis?: Definitions.Emoji[]
  }

  export type Emoji = {
    index?: number
    productId?: string
    emojiId?: string
  }

  export type StickerMessage = Definitions.BaseMessage & { type: 'sticker' } & {
    packageId?: string
    stickerId?: string
  }

  export type ImageMessage = Definitions.BaseMessage & { type: 'image' } & {
    originalContentUrl?: string
    previewImageUrl?: string
  }

  export type VideoMessage = Definitions.BaseMessage & { type: 'video' } & {
    originalContentUrl?: string
    previewImageUrl?: string
    trackingId?: string
  }

  export type AudioMessage = Definitions.BaseMessage & { type: 'audio' } & {
    originalContentUrl?: string
    duration?: number
  }

  export type LocationMessage = Definitions.BaseMessage & { type: 'location' } & {
    title?: string
    address?: string
    latitude?: unknown
    longitude?: unknown
  }

  export type ImagemapMessage = Definitions.BaseMessage & { type: 'imagemap' } & {
    baseUrl?: string
    altText?: string
    baseSize?: Definitions.ImagemapBaseSize
    actions?: Definitions.ImagemapAction[]
    video?: Definitions.ImagemapVideo
  }

  export type ImagemapBaseSize = {
    height?: number
    width?: number
  }

  export type BaseImagemapAction = {
    type: string
    area?: Definitions.ImagemapArea
  }

  export type ImagemapAction = MessageImagemapAction | URIImagemapAction
  export type MessageImagemapAction = Definitions.BaseImagemapAction & { type: 'message' } & {
    text?: string
    label?: string
  }

  export type URIImagemapAction = Definitions.BaseImagemapAction & { type: 'uri' } & {
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
    area?: Definitions.ImagemapArea
    externalLink?: Definitions.ImagemapExternalLink
  }

  export type ImagemapExternalLink = {
    linkUri?: string
    label?: string
  }

  export type TemplateMessage = Definitions.BaseMessage & { type: 'template' } & {
    altText?: string
    template?: Definitions.Template
  }

  export type BaseTemplate = {
    type: string
  }

  export type Template = ButtonsTemplate | ConfirmTemplate | CarouselTemplate | ImageCarouselTemplate
  export type ButtonsTemplate = Definitions.BaseTemplate & { type: 'buttons' } & {
    thumbnailImageUrl?: string
    imageAspectRatio?: string
    imageSize?: string
    imageBackgroundColor?: string
    title?: string
    text?: string
    defaultAction?: Definitions.Action
    actions?: Definitions.Action[]
  }

  export type ConfirmTemplate = Definitions.BaseTemplate & { type: 'confirm' } & {
    text?: string
    actions?: Definitions.Action[]
  }

  export type CarouselTemplate = Definitions.BaseTemplate & { type: 'carousel' } & {
    columns?: Definitions.CarouselColumn[]
    imageAspectRatio?: string
    imageSize?: string
  }

  export type CarouselColumn = {
    thumbnailImageUrl?: string
    imageBackgroundColor?: string
    title?: string
    text?: string
    defaultAction?: Definitions.Action
    actions?: Definitions.Action[]
  }

  export type ImageCarouselTemplate = Definitions.BaseTemplate & { type: 'image_carousel' } & {
    columns?: Definitions.ImageCarouselColumn[]
  }

  export type ImageCarouselColumn = {
    imageUrl?: string
    action?: Definitions.Action
  }

  export type FlexMessage = Definitions.BaseMessage & { type: 'flex' } & {
    altText?: string
    contents?: Definitions.FlexContainer
  }

  export type BaseFlexContainer = {
    type: string
  }

  export type FlexContainer = FlexBubble | FlexCarousel
  export type FlexBubble = Definitions.BaseFlexContainer & { type: 'bubble' } & {
    direction?: string
    styles?: Definitions.FlexBubbleStyles
    header?: Definitions.FlexBox
    hero?: Definitions.FlexComponent
    body?: Definitions.FlexBox
    footer?: Definitions.FlexBox
    size?: string
    action?: Definitions.Action
  }

  export type FlexCarousel = Definitions.BaseFlexContainer & { type: 'carousel' } & {
    contents?: Definitions.FlexBubble[]
  }

  export type FlexBubbleStyles = {
    header?: Definitions.FlexBlockStyle
    hero?: Definitions.FlexBlockStyle
    body?: Definitions.FlexBlockStyle
    footer?: Definitions.FlexBlockStyle
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
  export type FlexBox = Definitions.BaseFlexComponent & { type: 'box' } & unknown

  export type FlexButton = Definitions.BaseFlexComponent & { type: 'button' } & {
    flex?: number
    color?: string
    style?: string
    action?: Definitions.Action
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

  export type FlexImage = Definitions.BaseFlexComponent & { type: 'image' } & {
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
    action?: Definitions.Action
    animated?: boolean
  }

  export type FlexVideo = Definitions.BaseFlexComponent & { type: 'video' } & {
    url?: string
    previewUrl?: string
    altContent?: Definitions.FlexComponent
    aspectRatio?: string
    action?: Definitions.Action
  }

  export type FlexIcon = Definitions.BaseFlexComponent & { type: 'icon' } & {
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

  export type FlexText = Definitions.BaseFlexComponent & { type: 'text' } & {
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
    action?: Definitions.Action
    maxLines?: number
    contents?: Definitions.FlexSpan[]
    adjustMode?: string
    scaling?: boolean
  }

  export type FlexSpan = Definitions.BaseFlexComponent & { type: 'span' } & {
    text?: string
    size?: string
    color?: string
    weight?: string
    style?: string
    decoration?: string
  }

  export type FlexSeparator = Definitions.BaseFlexComponent & { type: 'separator' } & {
    margin?: string
    color?: string
  }

  export type FlexFiller = Definitions.BaseFlexComponent & { type: 'filler' } & {
    flex?: number
  }

  export type BaseFlexBoxBackground = {
    type: string
  }

  export type FlexBoxBackground = FlexBoxLinearGradient
  export type FlexBoxLinearGradient = Definitions.BaseFlexBoxBackground & { type: 'linearGradient' } & {
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
  export type CameraAction = Definitions.BaseAction

  export type CameraRollAction = Definitions.BaseAction

  export type DatetimePickerAction = Definitions.BaseAction & { type: 'datetimepicker' } & {
    data?: string
    mode?: string
    initial?: string
    max?: string
    min?: string
  }

  export type LocationAction = Definitions.BaseAction

  export type MessageAction = Definitions.BaseAction & { type: 'message' } & {
    text?: string
  }

  export type PostbackAction = Definitions.BaseAction & { type: 'postback' } & {
    data?: string
    displayText?: string
    text?: string
    inputOption?: string
    fillInText?: string
  }

  export type RichMenuSwitchAction = Definitions.BaseAction & { type: 'richmenuswitch' } & {
    data?: string
    richMenuAliasId?: string
  }

  export type URIAction = Definitions.BaseAction & { type: 'uri' } & {
    uri?: string
    altUri?: Definitions.AltUri
  }

  export type AltUri = {
    desktop?: string
  }

  export type ErrorResponse = {
    message: string
    details?: Definitions.ErrorDetail[]
  }

  export type ErrorDetail = {
    message?: string
    property?: string
  }

}
