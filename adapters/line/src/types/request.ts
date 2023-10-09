import * as Line from './definition'

declare module './internal' {
  interface Internal {
    /**
     * Get webhook endpoint information
     * @see https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information
     */
    getWebhookEndpoint(): Promise<Line.GetWebhookEndpointResponse>
    /**
     * Set webhook endpoint URL
     * @see https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url
     */
    setWebhookEndpoint(body: Line.SetWebhookEndpointRequest): Promise<unknown>
    /**
     * Test webhook endpoint
     * @see https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint
     */
    testWebhookEndpoint(body: Line.TestWebhookEndpointRequest): Promise<Line.TestWebhookEndpointResponse>
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
    getMessageContentTranscodingByMessageId(messageId: string): Promise<Line.GetMessageContentTranscodingResponse>
    /**
     * Send reply message
     * @see https://developers.line.biz/en/reference/messaging-api/#send-reply-message
     */
    replyMessage(body: Line.ReplyMessageRequest): Promise<Line.ReplyMessageResponse>
    /**
     * Sends a message to a user, group chat, or multi-person chat at any time.
     * @see https://developers.line.biz/en/reference/messaging-api/#send-push-message
     */
    pushMessage(body: Line.PushMessageRequest): Promise<Line.PushMessageResponse>
    /**
     * An API that efficiently sends the same message to multiple user IDs. You can't send messages to group chats or multi-person chats.
     * @see https://developers.line.biz/en/reference/messaging-api/#send-multicast-message
     */
    multicast(body: Line.MulticastRequest): Promise<Line.MulticastResponse>
    /**
     * Gets the status of a narrowcast message.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-narrowcast-progress-status
     */
    getNarrowcastProgress(query?: Line.GetNarrowcastProgressQuery): Promise<Line.NarrowcastProgressResponse>
    /**
     * Sends a message to multiple users at any time.
     * @see https://developers.line.biz/en/reference/messaging-api/#send-broadcast-message
     */
    broadcast(body: Line.BroadcastRequest): Promise<Line.BroadcastResponse>
    /**
     * Gets the target limit for sending messages in the current month. The total number of the free messages and the additional messages is returned.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-quota
     */
    getMessageQuota(): Promise<Line.MessageQuotaResponse>
    /**
     * Gets the number of messages sent in the current month.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-consumption
     */
    getMessageQuotaConsumption(): Promise<Line.QuotaConsumptionResponse>
    /**
     * Get number of sent reply messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-reply-messages
     */
    getNumberOfSentReplyMessages(query?: Line.GetNumberOfSentReplyMessagesQuery): Promise<Line.NumberOfMessagesResponse>
    /**
     * Get number of sent push messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-push-messages
     */
    getNumberOfSentPushMessages(query?: Line.GetNumberOfSentPushMessagesQuery): Promise<Line.NumberOfMessagesResponse>
    /**
     * Get number of sent multicast messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-multicast-messages
     */
    getNumberOfSentMulticastMessages(query?: Line.GetNumberOfSentMulticastMessagesQuery): Promise<Line.NumberOfMessagesResponse>
    /**
     * Get number of sent broadcast messages
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-broadcast-messages
     */
    getNumberOfSentBroadcastMessages(query?: Line.GetNumberOfSentBroadcastMessagesQuery): Promise<Line.NumberOfMessagesResponse>
    /**
     * Validate message objects of a reply message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-reply-message
     */
    validateReply(body: Line.ValidateMessageRequest): Promise<unknown>
    /**
     * Validate message objects of a push message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-push-message
     */
    validatePush(body: Line.ValidateMessageRequest): Promise<unknown>
    /**
     * Validate message objects of a multicast message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-multicast-message
     */
    validateMulticast(body: Line.ValidateMessageRequest): Promise<unknown>
    /**
     * Validate message objects of a narrowcast message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-narrowcast-message
     */
    validateNarrowcast(body: Line.ValidateMessageRequest): Promise<unknown>
    /**
     * Validate message objects of a broadcast message
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-message-objects-of-broadcast-message
     */
    validateBroadcast(body: Line.ValidateMessageRequest): Promise<unknown>
    /**
     * Get number of units used this month
     * @see https://developers.line.biz/en/reference/messaging-api/#get-number-of-units-used-this-month
     */
    getAggregationUnitUsage(): Promise<Line.GetAggregationUnitUsageResponse>
    /**
     * Get name list of units used this month
     * @see https://developers.line.biz/en/reference/messaging-api/#get-name-list-of-units-used-this-month
     */
    getAggregationUnitNameList(query?: Line.GetAggregationUnitNameListQuery): Promise<Line.GetAggregationUnitNameListResponse>
    /**
     * Get profile
     * @see https://developers.line.biz/en/reference/messaging-api/#get-profile
     */
    getProfile(userId: string): Promise<Line.UserProfileResponse>
    /**
     * Get a list of users who added your LINE Official Account as a friend
     * @see https://developers.line.biz/en/reference/messaging-api/#get-follower-ids
     */
    getFollowers(query?: Line.GetFollowersQuery): Promise<Line.GetFollowersResponse>
    /**
     * Get bot info
     * @see https://developers.line.biz/en/reference/messaging-api/#get-bot-info
     */
    getBotInfo(): Promise<Line.BotInfoResponse>
    /**
     * Get group chat member profile
     * @see https://developers.line.biz/en/reference/messaging-api/#get-group-member-profile
     */
    getGroupMemberProfile(groupId: string, userId: string): Promise<Line.GroupUserProfileResponse>
    /**
     * Get multi-person chat member profile
     * @see https://developers.line.biz/en/reference/messaging-api/#get-room-member-profile
     */
    getRoomMemberProfile(roomId: string, userId: string): Promise<Line.RoomUserProfileResponse>
    /**
     * Get group chat member user IDs
     * @see https://developers.line.biz/en/reference/messaging-api/#get-group-member-user-ids
     */
    getGroupMembersIds(groupId: string, query?: Line.GetGroupMembersIdsQuery): Promise<Line.MembersIdsResponse>
    /**
     * Get multi-person chat member user IDs
     * @see https://developers.line.biz/en/reference/messaging-api/#get-room-member-user-ids
     */
    getRoomMembersIds(roomId: string, query?: Line.GetRoomMembersIdsQuery): Promise<Line.MembersIdsResponse>
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
    getGroupSummary(groupId: string): Promise<Line.GroupSummaryResponse>
    /**
     * Get number of users in a group chat
     * @see https://developers.line.biz/en/reference/messaging-api/#get-members-group-count
     */
    getGroupMemberCount(groupId: string): Promise<Line.GroupMemberCountResponse>
    /**
     * Get number of users in a multi-person chat
     * @see https://developers.line.biz/en/reference/messaging-api/#get-members-room-count
     */
    getRoomMemberCount(roomId: string): Promise<Line.RoomMemberCountResponse>
    /**
     * Create rich menu
     * @see https://developers.line.biz/en/reference/messaging-api/#create-rich-menu
     */
    createRichMenu(body: Line.RichMenuRequest): Promise<Line.RichMenuIdResponse>
    /**
     * Validate rich menu object
     * @see https://developers.line.biz/en/reference/messaging-api/#validate-rich-menu-object
     */
    validateRichMenuObject(body: Line.RichMenuRequest): Promise<unknown>
    /**
     * Download rich menu image.
     * @see https://developers.line.biz/en/reference/messaging-api/#download-rich-menu-image
     */
    getRichMenuImage(richMenuId: string): Promise<unknown>
    /**
     * Upload rich menu image
     * @see https://developers.line.biz/en/reference/messaging-api/#upload-rich-menu-image
     */
    setRichMenuImage(richMenuId: string, body: any): Promise<unknown>
    /**
     * Gets a rich menu via a rich menu ID.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu
     */
    getRichMenu(): Promise<Line.RichMenuResponse>
    /**
     * Deletes a rich menu.
     * @see https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu
     */
    deleteRichMenu(): Promise<unknown>
    /**
     * Get rich menu list
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-list
     */
    getRichMenuList(): Promise<Line.RichMenuListResponse>
    /**
     * Set default rich menu
     * @see https://developers.line.biz/en/reference/messaging-api/#set-default-rich-menu
     */
    setDefaultRichMenu(richMenuId: string): Promise<unknown>
    /**
     * Gets the ID of the default rich menu set with the Messaging API.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-default-rich-menu-id
     */
    getDefaultRichMenuId(): Promise<Line.RichMenuIdResponse>
    /**
     * Cancel default rich menu
     * @see https://developers.line.biz/en/reference/messaging-api/#cancel-default-rich-menu
     */
    cancelDefaultRichMenu(): Promise<unknown>
    /**
     * Create rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#create-rich-menu-alias
     */
    createRichMenuAlias(body: Line.CreateRichMenuAliasRequest): Promise<unknown>
    /**
     * Get rich menu alias information
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-by-id
     */
    getRichMenuAlias(richMenuAliasId: string): Promise<Line.RichMenuAliasResponse>
    /**
     * Update rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#update-rich-menu-alias
     */
    updateRichMenuAlias(richMenuAliasId: string, body: Line.UpdateRichMenuAliasRequest): Promise<unknown>
    /**
     * Delete rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu-alias
     */
    deleteRichMenuAlias(richMenuAliasId: string): Promise<unknown>
    /**
     * Get list of rich menu alias
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-alias-list
     */
    getRichMenuAliasList(): Promise<Line.RichMenuAliasListResponse>
    /**
     * Get rich menu ID of user
     * @see https://developers.line.biz/en/reference/messaging-api/#get-rich-menu-id-of-user
     */
    getRichMenuIdOfUser(): Promise<Line.RichMenuIdResponse>
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
    validateRichMenuBatchRequest(body: Line.RichMenuBatchRequest): Promise<unknown>
    /**
     * Get the status of Replace or unlink a linked rich menus in batches.
     * @see https://developers.line.biz/en/reference/messaging-api/#get-batch-control-rich-menus-progress-status
     */
    getRichMenuBatchProgress(query?: Line.GetRichMenuBatchProgressQuery): Promise<Line.RichMenuBatchProgressResponse>
    /**
     * Issue link token
     * @see https://developers.line.biz/en/reference/messaging-api/#issue-link-token
     */
    issueLinkToken(userId: string): Promise<Line.IssueLinkTokenResponse>
    /**
     * Mark messages from users as read
     * @see https://developers.line.biz/en/reference/partner-docs/#mark-messages-from-users-as-read
     */
    markMessagesAsRead(body: Line.MarkMessagesAsReadRequest): Promise<unknown>
    /**
     * Send LINE notification message
     * @see https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message
     */
    pushMessagesByPhone(body: Line.PnpMessagesRequest): Promise<unknown>
    /**
     * Send a message using phone number
     * @see https://developers.line.biz/en/reference/partner-docs/#phone-audience-match
     */
    audienceMatch(body: Line.AudienceMatchMessagesRequest): Promise<unknown>
    /**
     * Get number of sent LINE notification messages
     * @see https://developers.line.biz/en/reference/partner-docs/#get-number-of-sent-line-notification-messages
     */
    getPNPMessageStatistics(query?: Line.GetPNPMessageStatisticsQuery): Promise<Line.NumberOfMessagesResponse>
    /**
     * Get result of message delivery using phone number
     * @see https://developers.line.biz/en/reference/partner-docs/#get-phone-audience-match
     */
    getAdPhoneMessageStatistics(query?: Line.GetAdPhoneMessageStatisticsQuery): Promise<Line.NumberOfMessagesResponse>
  }
}
