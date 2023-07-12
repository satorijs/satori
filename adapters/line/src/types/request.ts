export type GetWebhookEndpointResponse = {
  endpoint: string
  active: boolean
}

export type SetWebhookEndpointRequest = {
  endpoint: string
}

export type TestWebhookEndpointRequest = {
  endpoint: string
}

export type TestWebhookEndpointResponse = {
  success: boolean
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
  messages: unknown[]
  notificationDisabled: unknown
}

export type PushMessageRequest = {
  to: string
  messages: unknown[]
  notificationDisabled: unknown
  customAggregationUnits: string[]
}

export type MulticastRequest = {
  messages: unknown[]
  to: string[]
  notificationDisabled: unknown
  customAggregationUnits: string[]
}

export type NarrowcastRequest = {
  messages: unknown[]
  recipient: unknown
  filter: unknown
  limit: unknown
  notificationDisabled: unknown
}

export type NarrowcastProgressResponse = {
  phase: string
  successCount: number
  failureCount: number
  targetCount: number
  failedDescription: string
  errorCode: number
  acceptedTime: string
  completedTime: string
}

export type BroadcastRequest = {
  messages: unknown[]
  notificationDisabled: unknown
}

export type MessageQuotaResponse = {
  type: unknown
  value: number
}

export type QuotaConsumptionResponse = {
  totalUsage: number
}

export type NumberOfMessagesResponse = {
  status: string
  success: number
}

export type ValidateMessageRequest = {
  messages: unknown[]
}

export type GetAggregationUnitUsageResponse = {
  numOfCustomAggregationUnits: number
}

export type GetAggregationUnitNameListResponse = {
  customAggregationUnits: string[]
  next: string
}

export type UserProfileResponse = {
  displayName: string
  userId: string
  pictureUrl: string
  statusMessage: string
  language: string
}

export type GetFollowersResponse = {
  userIds: string[]
  next: string
}

export type BotInfoResponse = {
  userId: string
  basicId: string
  premiumId: string
  displayName: string
  pictureUrl: string
  chatMode: string
  markAsReadMode: string
}

export type GroupUserProfileResponse = {
  displayName: string
  userId: string
  pictureUrl: string
}

export type RoomUserProfileResponse = {
  displayName: string
  userId: string
  pictureUrl: string
}

export type MembersIdsResponse = {
  memberIds: string[]
  next: string
}

export type GroupSummaryResponse = {
  groupId: string
  groupName: string
  pictureUrl: string
}

export type GroupMemberCountResponse = {
  count: number
}

export type RoomMemberCountResponse = {
  count: number
}

export type RichMenuRequest = {
  size: unknown
  selected: boolean
  name: string
  chatBarText: string
  areas: unknown[]
}

export type RichMenuIdResponse = {
  richMenuId: string
}

export type RichMenuResponse = {
  richMenuId: string
  size: unknown
  selected: boolean
  name: string
  chatBarText: string
  areas: unknown[]
}

export type RichMenuListResponse = {
  richmenus: unknown[]
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
  aliases: unknown[]
}

export type RichMenuBulkLinkRequest = {
  richMenuId: string
  userIds: string[]
}

export type RichMenuBulkUnlinkRequest = {
  userIds: string[]
}

export type RichMenuBatchRequest = {
  operations: unknown[]
  resumeRequestKey: string
}

export type RichMenuBatchProgressResponse = {
  phase: unknown
  acceptedTime: string
  completedTime: string
}

export type IssueLinkTokenResponse = {
  linkToken: string
}

export type MarkMessagesAsReadRequest = {
  chat: unknown
}

export type PnpMessagesRequest = {
  messages: unknown[]
  to: string
  notificationDisabled: unknown
}

export type AudienceMatchMessagesRequest = {
  messages: unknown[]
  to: string[]
  notificationDisabled: unknown
}

export type ErrorResponse = {
  message: string
  details: unknown[]
}

declare module './internal' {
  interface Internal {

    /**
     * Get webhook endpoint information
     * @see https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information
     */
    getWebhookEndpoint(): Promise<GetWebhookEndpointResponse>

    /**
     * Set webhook endpoint URL
     * @see https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url
     */
    setWebhookEndpoint(): Promise<unknown>

    /**
     * Test webhook endpoint
     * @see https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint
     */
    testWebhookEndpoint(): Promise<TestWebhookEndpointResponse>

    /**
     * Download image, video, and audio data sent from users.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-content
     */
    getMessageContent(messageId: string): Promise<unknown>

    /**
     * Get a preview image of the image or video
     * @see https://developers.line.biz/en/reference/messaging-api/#get-image-or-video-preview
     */
    getMessageContentPreview(messageId: string): Promise<unknown>

    /**
     * Verify the preparation status of a video or audio for getting
     * @see https://developers.line.biz/en/reference/messaging-api/#verify-video-or-audio-preparation-status
     */
    getMessageContentTranscodingByMessageId(messageId: string): Promise<GetMessageContentTranscodingResponse>

    /**
     * Send reply message
     * @see https://developers.line.biz/en/reference/messaging-api/#send-reply-message
     */
    replyMessage(): Promise<unknown>

    /**
     * Sends a message to a user, group chat, or multi-person chat at any time.
     * @see https://developers.line.biz/en/reference/messaging-api/#send-push-message
     */
    pushMessage(): Promise<unknown>

    /**
     * An API that efficiently sends the same message to multiple user IDs. You can't send messages to group chats or multi-person chats.
     * @see https://developers.line.biz/en/reference/messaging-api/#send-multicast-message
     */
    multicast(): Promise<unknown>

    /**
     * Gets the status of a narrowcast message.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status
     */
    getNarrowcastProgress(requestId: string): Promise<NarrowcastProgressResponse>

    /**
     * Sends a message to multiple users at any time.
     * @see https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message
     */
    broadcast(): Promise<unknown>

    /**
     * Gets the target limit for sending messages in the current month. The total number of the free messages and the additional messages is returned.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-quota
     */
    getMessageQuota(): Promise<MessageQuotaResponse>

    /**
     * Gets the number of messages sent in the current month.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-consumption
     */
    getMessageQuotaConsumption(): Promise<QuotaConsumptionResponse>

    /**
     * Get number of sent reply messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-reply-messages
     */
    getNumberOfSentReplyMessages(date: string): Promise<NumberOfMessagesResponse>

    /**
     * Get number of sent push messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-push-messages
     */
    getNumberOfSentPushMessages(date: string): Promise<NumberOfMessagesResponse>

    /**
     * Get number of sent multicast messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-multicast-messages
     */
    getNumberOfSentMulticastMessages(date: string): Promise<NumberOfMessagesResponse>

    /**
     * Get number of sent broadcast messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-broadcast-messages
     */
    getNumberOfSentBroadcastMessages(date: string): Promise<NumberOfMessagesResponse>

    /**
     * Validate message objects of a reply message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-reply-message
     */
    validateReply(): Promise<unknown>

    /**
     * Validate message objects of a push message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-push-message
     */
    validatePush(): Promise<unknown>

    /**
     * Validate message objects of a multicast message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-multicast-message
     */
    validateMulticast(): Promise<unknown>

    /**
     * Validate message objects of a narrowcast message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-narrowcast-message
     */
    validateNarrowcast(): Promise<unknown>

    /**
     * Validate message objects of a broadcast message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-broadcast-message
     */
    validateBroadcast(): Promise<unknown>

    /**
     * Get number of units used this month
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month
     */
    getAggregationUnitUsage(): Promise<GetAggregationUnitUsageResponse>

    /**
     * Get name list of units used this month
     * @see https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month
     */
    getAggregationUnitNameList(limit?: string, start?: string): Promise<GetAggregationUnitNameListResponse>

    /**
     * Get profile
     * @see https://developers.line.biz/en/reference/messaging-api/#get-profile
     */
    getProfile(userId: string): Promise<UserProfileResponse>

    /**
     * Get a list of users who added your LINE Official Account as a friend
     * @see https://developers.line.biz/en/reference/messaging-api/#get-follower-ids
     */
    getFollowers(start?: string, limit?: number): Promise<GetFollowersResponse>

    /**
     * Get bot info
     * @see https://developers.line.biz/en/reference/messaging-api/#get-bot-info
     */
    getBotInfo(): Promise<BotInfoResponse>

    /**
     * Get group chat member profile
     * @see https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile
     */
    getGroupMemberProfile(groupId: string, userId: string): Promise<GroupUserProfileResponse>

    /**
     * Get multi-person chat member profile
     * @see https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile
     */
    getRoomMemberProfile(roomId: string, userId: string): Promise<RoomUserProfileResponse>

    /**
     * Get group chat member user IDs
     * @see https://developers.line.biz/en/reference/messaging-api/#get-group-member-user-ids
     */
    getGroupMembersIds(groupId: string, start?: string): Promise<MembersIdsResponse>

    /**
     * Get multi-person chat member user IDs
     * @see https://developers.line.biz/en/reference/messaging-api/#get-room-member-user-ids
     */
    getRoomMembersIds(roomId: string, start?: string): Promise<MembersIdsResponse>

    /**
     * Leave group chat
     * @see https://developers.line.biz/en/reference/messaging-api/#leave-group
     */
    leaveGroup(groupId: string): Promise<unknown>

    /**
     * Leave multi-person chat
     * @see https://developers.line.biz/en/reference/messaging-api/#leave-room
     */
    leaveRoom(roomId: string): Promise<unknown>

    /**
     * Get group chat summary
     * @see https://developers.line.biz/en/reference/messaging-api/#get-group-summary
     */
    getGroupSummary(groupId: string): Promise<GroupSummaryResponse>

    /**
     * Get number of users in a group chat
     * @see https://developers.line.biz/en/reference/messaging-api/#get-members-group-count
     */
    getGroupMemberCount(groupId: string): Promise<GroupMemberCountResponse>

    /**
     * Get number of users in a multi-person chat
     * @see https://developers.line.biz/en/reference/messaging-api/#get-members-room-count
     */
    getRoomMemberCount(roomId: string): Promise<RoomMemberCountResponse>

    /**
     * Create rich menu
     * @see https://developers.line.biz/en/reference/messaging-api/#create-rich-menu
     */
    createRichMenu(): Promise<RichMenuIdResponse>

    /**
     * Validate rich menu object
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-rich-menu-object
     */
    validateRichMenuObject(): Promise<unknown>

    /**
     * Download rich menu image.
     * @see https://developers.line.biz/en/reference/messaging-api/#download-rich-menu-image
     */
    getRichMenuImage(richMenuId: string): Promise<unknown>

    /**
     * Upload rich menu image
     * @see https://developers.line.biz/en/reference/messaging-api/#upload-rich-menu-image
     */
    setRichMenuImage(richMenuId: string): Promise<unknown>

    /**
     * Gets a rich menu via a rich menu ID.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu
     */
    getRichMenu(): Promise<RichMenuResponse>

    /**
     * Deletes a rich menu.
     * @see https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu
     */
    deleteRichMenu(): Promise<unknown>

    /**
     * Get rich menu list
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list
     */
    getRichMenuList(): Promise<RichMenuListResponse>

    /**
     * Set default rich menu
     * @see https://developers.line.biz/en/reference/messaging-api/#set-default-rich-menu
     */
    setDefaultRichMenu(richMenuId: string): Promise<unknown>

    /**
     * Gets the ID of the default rich menu set with the Messaging API.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-default-rich-menu-id
     */
    getDefaultRichMenuId(): Promise<RichMenuIdResponse>

    /**
     * Cancel default rich menu
     * @see https://developers.line.biz/en/reference/messaging-api/#cancel-default-rich-menu
     */
    cancelDefaultRichMenu(): Promise<unknown>

    /**
     * Create rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias
     */
    createRichMenuAlias(): Promise<unknown>

    /**
     * Get rich menu alias information
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-by-id
     */
    getRichMenuAlias(richMenuAliasId: string): Promise<RichMenuAliasResponse>

    /**
     * Update rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias
     */
    updateRichMenuAlias(richMenuAliasId: string): Promise<unknown>

    /**
     * Delete rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu-alias
     */
    deleteRichMenuAlias(richMenuAliasId: string): Promise<unknown>

    /**
     * Get list of rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list
     */
    getRichMenuAliasList(): Promise<RichMenuAliasListResponse>

    /**
     * Get rich menu ID of user
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-id-of-user
     */
    getRichMenuIdOfUser(): Promise<RichMenuIdResponse>

    /**
     * Unlink rich menu from user
     * @see https://developers.line.biz/en/reference/messaging-api/#unlink-rich-menu-from-user
     */
    unlinkRichMenuIdFromUser(): Promise<unknown>

    /**
     * Link rich menu to user.
     * @see https://developers.line.biz/en/reference/messaging-api/#link-rich-menu-to-user
     */
    linkRichMenuIdToUser(userId: string, richMenuId: string): Promise<unknown>

    /**
     * Validate a request body of the Replace or unlink the linked rich menus in batches endpoint.
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-batch-control-rich-menus-request
     */
    validateRichMenuBatchRequest(): Promise<unknown>

    /**
     * Get the status of Replace or unlink a linked rich menus in batches.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status
     */
    getRichMenuBatchProgress(requestId: string): Promise<RichMenuBatchProgressResponse>

    /**
     * Issue link token
     * @see https://developers.line.biz/en/reference/messaging-api/#issue-link-token
     */
    issueLinkToken(userId: string): Promise<IssueLinkTokenResponse>

    /**
     * Mark messages from users as read
     * @see https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read
     */
    markMessagesAsRead(): Promise<unknown>

    /**
     * Send LINE notification message
     * @see https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message
     */
    pushMessagesByPhone(): Promise<unknown>

    /**
     * Send a message using phone number
     * @see https://developers.line.biz/en/reference/partner-docs/#phone-audience-match
     */
    audienceMatch(): Promise<unknown>

    /**
     * Get number of sent LINE notification messages
     * @see https://developers.line.biz/en/reference/partner-docs/#get-number-of-sent-line-notification-messages
     */
    getPNPMessageStatistics(date: string): Promise<NumberOfMessagesResponse>

    /**
     * Get result of message delivery using phone number
     * @see https://developers.line.biz/en/reference/partner-docs/#get-phone-audience-match
     */
    getAdPhoneMessageStatistics(date: string): Promise<NumberOfMessagesResponse>

  }
}
