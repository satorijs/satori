import { BatchMessageReadUser, BatchMessageRecallProgress, BatchMessageSendProgress, ChatMenuItem, ChatMenuTree, ChatTab, ChatTopNotice, CreateTag, CreateTagFailReason, Emoji, FailedReason, FollowUp, I18nNames, ListChat, ListMember, ListModerator, Mention, Message, MessageBody, MessageReaction, OpenAppFeedCard, OpenAppFeedCardButtons, OpenFailedUserAppFeedCardItem, Operator, PatchTag, PatchTagFailReason, Pin, ReadUser, RestrictedModeSetting, Sender, TagInfo, TagInfoWithBindVersion, UserOpenAppFeedCardDeleter, UserOpenAppFeedCardUpdater } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 发送消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
     */
    createImMessage(body: CreateImMessageRequest, query?: CreateImMessageQuery): Promise<CreateImMessageResponse>
    /**
     * 回复消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply
     */
    replyImMessage(message_id: string, body: ReplyImMessageRequest): Promise<ReplyImMessageResponse>
    /**
     * 编辑消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/update
     */
    updateImMessage(message_id: string, body: UpdateImMessageRequest): Promise<UpdateImMessageResponse>
    /**
     * 转发消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/forward
     */
    forwardImMessage(message_id: string, body: ForwardImMessageRequest, query?: ForwardImMessageQuery): Promise<ForwardImMessageResponse>
    /**
     * 合并转发消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/merge_forward
     */
    mergeForwardImMessage(body: MergeForwardImMessageRequest, query?: MergeForwardImMessageQuery): Promise<MergeForwardImMessageResponse>
    /**
     * 转发话题
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/thread/forward
     */
    forwardImThread(thread_id: string, body: ForwardImThreadRequest, query?: ForwardImThreadQuery): Promise<ForwardImThreadResponse>
    /**
     * 撤回消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete
     */
    deleteImMessage(message_id: string): Promise<void>
    /**
     * 添加跟随气泡
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/push_follow_up
     */
    pushFollowUpImMessage(message_id: string, body: PushFollowUpImMessageRequest): Promise<void>
    /**
     * 查询消息已读信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/read_users
     */
    readUsersImMessage(message_id: string, query?: ReadUsersImMessageQuery): Paginated<ReadUser>
    /**
     * 获取会话历史消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/list
     */
    listImMessage(query?: ListImMessageQuery): Paginated<Message>
    /**
     * 获取消息中的资源文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get
     */
    getImMessageResource(message_id: string, file_key: string, query?: GetImMessageResourceQuery): Promise<ArrayBuffer>
    /**
     * 获取指定消息的内容
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/get
     */
    getImMessage(message_id: string, query?: GetImMessageQuery): Promise<GetImMessageResponse>
    /**
     * 批量撤回消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/delete
     */
    deleteImBatchMessage(batch_message_id: string): Promise<void>
    /**
     * 查询批量消息推送和阅读人数
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user
     */
    readUserImBatchMessage(batch_message_id: string): Promise<ReadUserImBatchMessageResponse>
    /**
     * 查询批量消息整体进度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/get_progress
     */
    getProgressImBatchMessage(batch_message_id: string): Promise<GetProgressImBatchMessageResponse>
    /**
     * 上传图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create
     */
    createImImage(form: CreateImImageForm): Promise<CreateImImageResponse>
    /**
     * 下载图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/get
     */
    getImImage(image_key: string): Promise<ArrayBuffer>
    /**
     * 上传文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/create
     */
    createImFile(form: CreateImFileForm): Promise<CreateImFileResponse>
    /**
     * 下载文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/get
     */
    getImFile(file_key: string): Promise<ArrayBuffer>
    /**
     * 发送应用内加急
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_app
     */
    urgentAppImMessage(message_id: string, body: UrgentAppImMessageRequest, query?: UrgentAppImMessageQuery): Promise<UrgentAppImMessageResponse>
    /**
     * 发送短信加急
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_sms
     */
    urgentSmsImMessage(message_id: string, body: UrgentSmsImMessageRequest, query?: UrgentSmsImMessageQuery): Promise<UrgentSmsImMessageResponse>
    /**
     * 发送电话加急
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_phone
     */
    urgentPhoneImMessage(message_id: string, body: UrgentPhoneImMessageRequest, query?: UrgentPhoneImMessageQuery): Promise<UrgentPhoneImMessageResponse>
    /**
     * 添加消息表情回复
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/create
     */
    createImMessageReaction(message_id: string, body: CreateImMessageReactionRequest): Promise<CreateImMessageReactionResponse>
    /**
     * 获取消息表情回复
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/list
     */
    listImMessageReaction(message_id: string, query?: ListImMessageReactionQuery): Paginated<MessageReaction>
    /**
     * 删除消息表情回复
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/delete
     */
    deleteImMessageReaction(message_id: string, reaction_id: string): Promise<DeleteImMessageReactionResponse>
    /**
     * Pin 消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/create
     */
    createImPin(body: CreateImPinRequest): Promise<CreateImPinResponse>
    /**
     * 移除 Pin 消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/delete
     */
    deleteImPin(message_id: string): Promise<void>
    /**
     * 获取群内 Pin 消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/list
     */
    listImPin(query?: ListImPinQuery): Paginated<Pin>
    /**
     * 更新应用发送的消息卡片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/patch
     */
    patchImMessage(message_id: string, body: PatchImMessageRequest): Promise<void>
    /**
     * 更新 URL 预览
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/url_preview/batch_update
     */
    batchUpdateImUrlPreview(body: BatchUpdateImUrlPreviewRequest): Promise<void>
    /**
     * 创建群
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/create
     */
    createImChat(body: CreateImChatRequest, query?: CreateImChatQuery): Promise<CreateImChatResponse>
    /**
     * 解散群
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/delete
     */
    deleteImChat(chat_id: string): Promise<void>
    /**
     * 更新群信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/update
     */
    updateImChat(chat_id: string, body: UpdateImChatRequest, query?: UpdateImChatQuery): Promise<void>
    /**
     * 更新群发言权限
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/update
     */
    updateImChatModeration(chat_id: string, body: UpdateImChatModerationRequest, query?: UpdateImChatModerationQuery): Promise<void>
    /**
     * 获取群信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get
     */
    getImChat(chat_id: string, query?: GetImChatQuery): Promise<GetImChatResponse>
    /**
     * 更新群置顶
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/put_top_notice
     */
    putTopNoticeImChatTopNotice(chat_id: string, body: PutTopNoticeImChatTopNoticeRequest): Promise<void>
    /**
     * 撤销群置顶
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/delete_top_notice
     */
    deleteTopNoticeImChatTopNotice(chat_id: string): Promise<void>
    /**
     * 获取用户或机器人所在的群列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/list
     */
    listImChat(query?: ListImChatQuery): Paginated<ListChat>
    /**
     * 搜索对用户或机器人可见的群列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/search
     */
    searchImChat(query?: SearchImChatQuery): Paginated<ListChat>
    /**
     * 获取群成员发言权限
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/get
     */
    getImChatModeration(chat_id: string, query?: GetImChatModerationQuery): Promise<GetImChatModerationResponse>
    /**
     * 获取群分享链接
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/link
     */
    linkImChat(chat_id: string, body: LinkImChatRequest): Promise<LinkImChatResponse>
    /**
     * 指定群管理员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/add_managers
     */
    addManagersImChatManagers(chat_id: string, body: AddManagersImChatManagersRequest, query?: AddManagersImChatManagersQuery): Promise<AddManagersImChatManagersResponse>
    /**
     * 删除群管理员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/delete_managers
     */
    deleteManagersImChatManagers(chat_id: string, body: DeleteManagersImChatManagersRequest, query?: DeleteManagersImChatManagersQuery): Promise<DeleteManagersImChatManagersResponse>
    /**
     * 将用户或机器人拉入群聊
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create
     */
    createImChatMembers(chat_id: string, body: CreateImChatMembersRequest, query?: CreateImChatMembersQuery): Promise<CreateImChatMembersResponse>
    /**
     * 用户或机器人主动加入群聊
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/me_join
     */
    meJoinImChatMembers(chat_id: string): Promise<void>
    /**
     * 将用户或机器人移出群聊
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/delete
     */
    deleteImChatMembers(chat_id: string, body: DeleteImChatMembersRequest, query?: DeleteImChatMembersQuery): Promise<DeleteImChatMembersResponse>
    /**
     * 获取群成员列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/get
     */
    getImChatMembers(chat_id: string, query?: GetImChatMembersQuery): Promise<GetImChatMembersResponse>
    /**
     * 判断用户或机器人是否在群里
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/is_in_chat
     */
    isInChatImChatMembers(chat_id: string): Promise<IsInChatImChatMembersResponse>
    /**
     * 更新群公告信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/patch
     */
    patchImChatAnnouncement(chat_id: string, body: PatchImChatAnnouncementRequest): Promise<void>
    /**
     * 获取群公告信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/get
     */
    getImChatAnnouncement(chat_id: string, query?: GetImChatAnnouncementQuery): Promise<GetImChatAnnouncementResponse>
    /**
     * 添加会话标签页
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/create
     */
    createImChatTab(chat_id: string, body: CreateImChatTabRequest): Promise<CreateImChatTabResponse>
    /**
     * 删除会话标签页
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/delete_tabs
     */
    deleteTabsImChatTab(chat_id: string, body: DeleteTabsImChatTabRequest): Promise<DeleteTabsImChatTabResponse>
    /**
     * 更新会话标签页
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/update_tabs
     */
    updateTabsImChatTab(chat_id: string, body: UpdateTabsImChatTabRequest): Promise<UpdateTabsImChatTabResponse>
    /**
     * 会话标签页排序
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/sort_tabs
     */
    sortTabsImChatTab(chat_id: string, body: SortTabsImChatTabRequest): Promise<SortTabsImChatTabResponse>
    /**
     * 拉取会话标签页
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/list_tabs
     */
    listTabsImChatTab(chat_id: string): Promise<ListTabsImChatTabResponse>
    /**
     * 添加群菜单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/create
     */
    createImChatMenuTree(chat_id: string, body: CreateImChatMenuTreeRequest): Promise<CreateImChatMenuTreeResponse>
    /**
     * 删除群菜单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/delete
     */
    deleteImChatMenuTree(chat_id: string, body: DeleteImChatMenuTreeRequest): Promise<DeleteImChatMenuTreeResponse>
    /**
     * 修改群菜单元信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_item/patch
     */
    patchImChatMenuItem(chat_id: string, menu_item_id: string, body: PatchImChatMenuItemRequest): Promise<PatchImChatMenuItemResponse>
    /**
     * 排序群菜单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/sort
     */
    sortImChatMenuTree(chat_id: string, body: SortImChatMenuTreeRequest): Promise<SortImChatMenuTreeResponse>
    /**
     * 获取群菜单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/get
     */
    getImChatMenuTree(chat_id: string): Promise<GetImChatMenuTreeResponse>
    /**
     * 创建应用消息流卡片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/app_feed_card/create
     */
    createImAppFeedCard(body: CreateImAppFeedCardRequest, query?: CreateImAppFeedCardQuery): Promise<CreateImAppFeedCardResponse>
    /**
     * 更新应用消息流卡片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/app_feed_card-batch/update
     */
    updateImAppFeedCardBatch(body: UpdateImAppFeedCardBatchRequest, query?: UpdateImAppFeedCardBatchQuery): Promise<UpdateImAppFeedCardBatchResponse>
    /**
     * 删除应用消息流卡片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/app_feed_card-batch/delete
     */
    deleteImAppFeedCardBatch(body: DeleteImAppFeedCardBatchRequest, query?: DeleteImAppFeedCardBatchQuery): Promise<DeleteImAppFeedCardBatchResponse>
    /**
     * 机器人单聊即时提醒
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/feed_card/bot_time_sentive
     */
    botTimeSentiveImFeedCard(body: BotTimeSentiveImFeedCardRequest, query?: BotTimeSentiveImFeedCardQuery): Promise<BotTimeSentiveImFeedCardResponse>
    /**
     * 更新消息流卡片按钮
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/chat_button/update
     */
    updateImChatButton(body: UpdateImChatButtonRequest, query?: UpdateImChatButtonQuery): Promise<UpdateImChatButtonResponse>
    /**
     * 即时提醒
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/feed_card/patch
     */
    patchImFeedCard(feed_card_id: string, body: PatchImFeedCardRequest, query?: PatchImFeedCardQuery): Promise<PatchImFeedCardResponse>
    /**
     * 查询实体与标签的绑定关系
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/biz_entity_tag_relation/get
     */
    getImBizEntityTagRelation(query?: GetImBizEntityTagRelationQuery): Promise<GetImBizEntityTagRelationResponse>
    /**
     * 创建标签
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/tag/create
     */
    createImTag(body: CreateImTagRequest): Promise<CreateImTagResponse>
    /**
     * 修改标签
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/tag/patch
     */
    patchImTag(tag_id: string, body: PatchImTagRequest): Promise<PatchImTagResponse>
    /**
     * 绑定标签到群
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/biz_entity_tag_relation/create
     */
    createImBizEntityTagRelation(body: CreateImBizEntityTagRelationRequest): Promise<void>
    /**
     * 解绑标签与群
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/group/im-v2/biz_entity_tag_relation/update
     */
    updateImBizEntityTagRelation(body: UpdateImBizEntityTagRelationRequest): Promise<void>
  }
}

export interface CreateImMessageRequest {
  /** 依据receive_id_type的值，填写对应的消息接收者id */
  receive_id: string
  /** 消息类型 包括：text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等，类型定义请参考[发送消息content说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json) */
  msg_type: string
  /** 消息内容，json结构序列化后的字符串。不同msg_type对应不同内容。消息类型 包括：text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等，具体格式说明参考：[发送消息content说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)<b>请求体大小限制</b>：- 文本消息请求体最大不能超过150KB- 卡片及富文本消息请求体最大不能超过30KB */
  content: string
  /** 由开发者生成的唯一字符串序列，用于发送消息请求去重；持有相同uuid的请求1小时内至多成功执行一次 */
  uuid?: string
}

export interface CreateImMessageQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id */
  receive_id_type: 'open_id' | 'user_id' | 'union_id' | 'email' | 'chat_id'
}

export interface CreateImMessageResponse {
  /** 消息id open_message_id */
  message_id?: string
  /** 根消息id open_message_id */
  root_id?: string
  /** 父消息的id open_message_id */
  parent_id?: string
  /** 消息所属的话题 ID */
  thread_id?: string
  /** 消息类型 text post card image等等 */
  msg_type?: string
  /** 消息生成的时间戳(毫秒) */
  create_time?: string
  /** 消息更新的时间戳 */
  update_time?: string
  /** 消息是否被撤回 */
  deleted?: boolean
  /** 消息是否被更新 */
  updated?: boolean
  /** 所属的群 */
  chat_id?: string
  /** 发送者，可以是用户或应用 */
  sender?: Sender
  /** 消息内容,json结构 */
  body?: MessageBody
  /** 被艾特的人或应用的id */
  mentions?: Mention[]
  /** 合并消息的上一层级消息id open_message_id */
  upper_message_id?: string
}

export interface ReplyImMessageRequest {
  /** 消息内容 json 格式，格式说明参考: [发送消息content说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json) */
  content: string
  /** 消息类型，包括：text、post、image、file、audio、media、sticker、interactive、share_card、share_user */
  msg_type: string
  /** 是否以话题形式回复；若群聊已经是话题模式，则自动回复该条消息所在的话题 */
  reply_in_thread?: boolean
  /** 由开发者生成的唯一字符串序列，用于回复消息请求去重；持有相同uuid的请求1小时内至多成功执行一次 */
  uuid?: string
}

export interface ReplyImMessageResponse {
  /** 消息id open_message_id */
  message_id?: string
  /** 根消息id open_message_id */
  root_id?: string
  /** 父消息的id open_message_id */
  parent_id?: string
  /** 消息所属的话题 ID */
  thread_id?: string
  /** 消息类型 text post card image等等 */
  msg_type?: string
  /** 消息生成的时间戳(毫秒) */
  create_time?: string
  /** 消息更新的时间戳 */
  update_time?: string
  /** 消息是否被撤回 */
  deleted?: boolean
  /** 消息是否被更新 */
  updated?: boolean
  /** 所属的群 */
  chat_id?: string
  /** 发送者，可以是用户或应用 */
  sender?: Sender
  /** 消息内容,json结构 */
  body?: MessageBody
  /** 被艾特的人或应用的id */
  mentions?: Mention[]
  /** 合并消息的上一层级消息id open_message_id */
  upper_message_id?: string
}

export interface UpdateImMessageRequest {
  /** 消息的类型，仅支持文本(text)和富文本(post)类型 */
  msg_type: string
  /** 消息内容，JSON 格式 */
  content: string
}

export interface UpdateImMessageResponse {
  /** 消息id open_message_id */
  message_id?: string
  /** 根消息id open_message_id */
  root_id?: string
  /** 父消息的id open_message_id */
  parent_id?: string
  /** 消息所属的话题 ID */
  thread_id?: string
  /** 消息类型 text post card image等等 */
  msg_type?: string
  /** 消息生成的时间戳(毫秒) */
  create_time?: string
  /** 消息更新的时间戳 */
  update_time?: string
  /** 消息是否被撤回 */
  deleted?: boolean
  /** 消息是否被更新 */
  updated?: boolean
  /** 所属的群 */
  chat_id?: string
  /** 发送者，可以是用户或应用 */
  sender?: Sender
  /** 消息内容,json结构 */
  body?: MessageBody
  /** 被艾特的人或应用的id */
  mentions?: Mention[]
  /** 合并消息的上一层级消息id open_message_id */
  upper_message_id?: string
}

export interface ForwardImMessageRequest {
  /** 依据receive_id_type的值，填写对应的转发目标的ID */
  receive_id: string
}

export interface ForwardImMessageQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id */
  receive_id_type: 'open_id' | 'user_id' | 'union_id' | 'email' | 'chat_id' | 'thread_id'
  /** 由开发者生成的唯一字符串序列，用于转发消息请求去重；持有相同uuid的请求在1小时内向同一个目标的转发只可成功一次。 */
  uuid?: string
}

export interface ForwardImMessageResponse {
  /** 消息id open_message_id */
  message_id?: string
  /** 根消息id open_message_id */
  root_id?: string
  /** 父消息的id open_message_id */
  parent_id?: string
  /** 消息所属的话题 ID */
  thread_id?: string
  /** 消息类型 text post card image等等 */
  msg_type?: string
  /** 消息生成的时间戳(毫秒) */
  create_time?: string
  /** 消息更新的时间戳 */
  update_time?: string
  /** 消息是否被撤回 */
  deleted?: boolean
  /** 消息是否被更新 */
  updated?: boolean
  /** 所属的群 */
  chat_id?: string
  /** 发送者，可以是用户或应用 */
  sender?: Sender
  /** 消息内容,json结构 */
  body?: MessageBody
  /** 被艾特的人或应用的id */
  mentions?: Mention[]
  /** 合并消息的上一层级消息id open_message_id */
  upper_message_id?: string
}

export interface MergeForwardImMessageRequest {
  /** 依据receive_id_type的值，填写对应的转发目标的ID */
  receive_id: string
  /** 要转发的消息ID列表 */
  message_id_list: string[]
}

export interface MergeForwardImMessageQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id */
  receive_id_type: 'open_id' | 'user_id' | 'union_id' | 'email' | 'chat_id' | 'thread_id'
  /** 由开发者生成的唯一字符串序列，用于转发消息请求去重；持有相同uuid的请求在1小时内向同一个目标的转发只可成功一次。 */
  uuid?: string
}

export interface MergeForwardImMessageResponse {
  /** 合并转发生成的新消息 */
  message?: Message
  /** 无效的消息ID列表 */
  invalid_message_id_list?: string[]
}

export interface ForwardImThreadRequest {
  /** 依据receive_id_type的值，填写对应的转发目标的ID */
  receive_id: string
}

export interface ForwardImThreadQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id/thread_id */
  receive_id_type: 'open_id' | 'user_id' | 'union_id' | 'email' | 'chat_id' | 'thread_id'
  /** 由开发者生成的唯一字符串序列，用于转发消息请求去重；持有相同uuid的请求在1小时内向同一个目标的转发只可成功一次。 */
  uuid?: string
}

export interface ForwardImThreadResponse {
  /** 消息id open_message_id */
  message_id?: string
  /** 根消息id open_message_id */
  root_id?: string
  /** 父消息的id open_message_id */
  parent_id?: string
  /** 消息所属的话题 ID */
  thread_id?: string
  /** 消息类型 text post card image等等 */
  msg_type?: string
  /** 消息生成的时间戳(毫秒) */
  create_time?: string
  /** 消息更新的时间戳 */
  update_time?: string
  /** 消息是否被撤回 */
  deleted?: boolean
  /** 消息是否被更新 */
  updated?: boolean
  /** 所属的群 */
  chat_id?: string
  /** 发送者，可以是用户或应用 */
  sender?: Sender
  /** 消息内容,json结构 */
  body?: MessageBody
  /** 被艾特的人或应用的id */
  mentions?: Mention[]
  /** 合并消息的上一层级消息id open_message_id */
  upper_message_id?: string
}

export interface PushFollowUpImMessageRequest {
  /** follow up列表 */
  follow_ups: FollowUp[]
}

export interface ReadUsersImMessageQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: 'user_id' | 'union_id' | 'open_id'
}

export interface ListImMessageQuery extends Pagination {
  /** 容器类型 ，目前可选值仅有"chat"，包含单聊（p2p）和群聊（group） */
  container_id_type: string
  /** 容器的id，即chat的id，详情参见[群ID 说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description) */
  container_id: string
  /** 历史信息的起始时间（秒级时间戳） */
  start_time?: string
  /** 历史信息的结束时间（秒级时间戳） */
  end_time?: string
  /** 消息排序方式 */
  sort_type?: 'ByCreateTimeAsc' | 'ByCreateTimeDesc'
}

export interface GetImMessageResourceQuery {
  /** 资源类型，可选"image, file“； image对应消息中的 图片，富文本消息中的图片。  file对应消息中的 文件、音频、视频、（表情包除外） */
  type: string
}

export interface GetImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetImMessageResponse {
  /** message[] */
  items?: Message[]
}

export interface ReadUserImBatchMessageResponse {
  read_user?: BatchMessageReadUser
}

export interface GetProgressImBatchMessageResponse {
  /** 消息发送进度 */
  batch_message_send_progress?: BatchMessageSendProgress
  /** 消息撤回进度 */
  batch_message_recall_progress?: BatchMessageRecallProgress
}

export interface CreateImImageForm {
  /** 图片类型 */
  image_type: 'message' | 'avatar'
  /** 图片内容 **注意：** 上传的图片大小不能超过10MB */
  image: Blob
}

export interface CreateImImageResponse {
  /** 图片的key */
  image_key?: string
}

export interface CreateImFileForm {
  /** 文件类型 */
  file_type: 'opus' | 'mp4' | 'pdf' | 'doc' | 'xls' | 'ppt' | 'stream'
  /** 带后缀的文件名 */
  file_name: string
  /** 文件的时长（视频，音频），单位:毫秒。不填充时无法显示具体时长。 */
  duration?: number
  /** 文件内容 */
  file: Blob
}

export interface CreateImFileResponse {
  /** 文件的key */
  file_key?: string
}

export interface UrgentAppImMessageRequest {
  /** 该字段标识目标用户的id类型 */
  user_id_list: string[]
}

export interface UrgentAppImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: 'user_id' | 'union_id' | 'open_id'
}

export interface UrgentAppImMessageResponse {
  /** 无效的用户id */
  invalid_user_id_list: string[]
}

export interface UrgentSmsImMessageRequest {
  /** 该字段标识目标用户的id类型 */
  user_id_list: string[]
}

export interface UrgentSmsImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: 'user_id' | 'union_id' | 'open_id'
}

export interface UrgentSmsImMessageResponse {
  /** 无效的用户id */
  invalid_user_id_list: string[]
}

export interface UrgentPhoneImMessageRequest {
  /** 该字段标识目标用户的id类型 */
  user_id_list: string[]
}

export interface UrgentPhoneImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: 'user_id' | 'union_id' | 'open_id'
}

export interface UrgentPhoneImMessageResponse {
  /** 无效的用户id */
  invalid_user_id_list: string[]
}

export interface CreateImMessageReactionRequest {
  /** reaction资源类型 */
  reaction_type: Emoji
}

export interface CreateImMessageReactionResponse {
  /** reaction资源ID */
  reaction_id?: string
  /** 添加reaction的操作人 */
  operator?: Operator
  /** reaction动作的的unix timestamp(单位:ms) */
  action_time?: string
  /** reaction资源类型 */
  reaction_type?: Emoji
}

export interface ListImMessageReactionQuery extends Pagination {
  /** 待查询消息reaction的类型[emoji类型列举](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/emojis-introduce)。- 不传入该参数，表示拉取所有类型reaction */
  reaction_type?: string
  /** 当操作人为用户时返回用户ID的类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface DeleteImMessageReactionResponse {
  /** reaction资源ID */
  reaction_id?: string
  /** 添加reaction的操作人 */
  operator?: Operator
  /** reaction动作的的unix timestamp(单位:ms) */
  action_time?: string
  /** reaction资源类型 */
  reaction_type?: Emoji
}

export interface CreateImPinRequest {
  /** 待Pin的消息ID */
  message_id: string
}

export interface CreateImPinResponse {
  pin?: Pin
}

export interface ListImPinQuery extends Pagination {
  /** 待获取Pin消息的Chat ID */
  chat_id: string
  /** Pin信息的起始时间（毫秒级时间戳） */
  start_time?: string
  /** Pin信息的结束时间（毫秒级时间戳） */
  end_time?: string
}

export interface PatchImMessageRequest {
  /** 消息内容 json 格式，[发送消息 content 说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)，参考文档中的卡片格式 */
  content: string
}

export interface BatchUpdateImUrlPreviewRequest {
  /** URL预览的token列表 */
  preview_tokens: string[]
  /** 需要更新URL预览的用户open_id。若不传，则默认更新URL所在会话成员；若用户不在URL所在会话，则无法更新该用户 */
  open_ids?: string[]
}

export interface CreateImChatRequest {
  /** 群头像对应的 Image Key，可通过[上传图片](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create)获取（注意：上传图片的 ==image_type== 需要指定为 ==avatar==） */
  avatar?: string
  /** 群名称 **注意：** 公开群名称的长度不得少于2个字符 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: I18nNames
  /** 创建群时指定的群主，不填时指定建群的机器人为群主。群主 ID，ID值与查询参数中的 user_id_type 对应。不同 ID 的说明参见 [用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  owner_id?: string
  /** 创建群时邀请的群成员，id 类型为 user_id_type */
  user_id_list?: string[]
  /** 创建群时邀请的群机器人 **注意：** 拉机器人入群请使用 ==app_id== */
  bot_id_list?: string[]
  /** 群消息模式 */
  group_message_type?: 'chat' | 'thread'
  /** 群模式**可选值有**：- `group`：群组 */
  chat_mode?: string
  /** 群类型**可选值有**：- `private`：私有群- `public`：公开群 */
  chat_type?: string
  /** 入群消息可见性**可选值有**：- `only_owner`：仅群主和管理员可见- `all_members`：所有成员可见- `not_anyone`：任何人均不可见 */
  join_message_visibility?: string
  /** 退群消息可见性**可选值有**：- `only_owner`：仅群主和管理员可见- `all_members`：所有成员可见- `not_anyone`：任何人均不可见 */
  leave_message_visibility?: string
  /** 加群审批**可选值有**：- `no_approval_required`：无需审批- `approval_required`：需要审批 */
  membership_approval?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: RestrictedModeSetting
  /** 谁可以加急 */
  urgent_setting?: 'only_owner' | 'all_members'
  /** 谁可以发起视频会议 */
  video_conference_setting?: 'only_owner' | 'all_members'
  /** 谁可以编辑群信息 */
  edit_permission?: 'only_owner' | 'all_members'
  /** 隐藏群成员人数设置 */
  hide_member_count_setting?: 'all_members' | 'only_owner'
}

export interface CreateImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 如果选择了设置群主为指定用户，可以选择是否同时设置创建此群的机器人为管理员，此标志位用于标记是否设置创建群的机器人为管理员 */
  set_bot_manager?: boolean
  /** 由开发者生成的唯一字符串序列，用于创建群组请求去重；持有相同uuid的请求10小时内只可成功创建1个群聊 */
  uuid?: string
}

export interface CreateImChatResponse {
  /** 群ID */
  chat_id?: string
  /** 群头像URL */
  avatar?: string
  /** 群名称 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: I18nNames
  /** 群主 ID */
  owner_id?: string
  /** 群主 ID 类型 */
  owner_id_type?: string
  /** 谁可以加急 */
  urgent_setting?: 'only_owner' | 'all_members'
  /** 谁可以发起视频会议 */
  video_conference_setting?: 'only_owner' | 'all_members'
  /** 加user/bot入群权限(all_members/only_owner) */
  add_member_permission?: string
  /** 群分享权限(allowed/not_allowed) */
  share_card_permission?: string
  /** at所有人权限(all_members/only_owner) */
  at_all_permission?: string
  /** 群编辑权限(all_members/only_owner) */
  edit_permission?: string
  /** 群消息模式 */
  group_message_type?: string
  /** 群模式 */
  chat_mode?: string
  /** 群类型 */
  chat_type?: string
  /** 优先级最高的一个群tag */
  chat_tag?: string
  /** 是否是外部群 */
  external?: boolean
  /** tenant key */
  tenant_key?: string
  /** 入群消息可见性 */
  join_message_visibility?: string
  /** 出群消息可见性 */
  leave_message_visibility?: string
  /** 加群审批 */
  membership_approval?: string
  /** 发言权限 */
  moderation_permission?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: RestrictedModeSetting
  /** 隐藏群成员人数设置 */
  hide_member_count_setting?: 'all_members' | 'only_owner'
}

export interface UpdateImChatRequest {
  /** 群头像对应的 Image Key，可通过[上传图片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create)获取（注意：上传图片的 ==image_type== 需要指定为 ==avatar==） */
  avatar?: string
  /** 群名称 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: I18nNames
  /** 加 user/bot 入群权限(all_members/only_owner) */
  add_member_permission?: string
  /** 群分享权限(allowed/not_allowed) */
  share_card_permission?: string
  /** at 所有人权限(all_members/only_owner) */
  at_all_permission?: string
  /** 群编辑权限(all_members/only_owner) */
  edit_permission?: string
  /** 新群主 ID */
  owner_id?: string
  /** 入群消息可见性(only_owner/all_members/not_anyone) */
  join_message_visibility?: string
  /** 出群消息可见性(only_owner/all_members/not_anyone) */
  leave_message_visibility?: string
  /** 加群审批(no_approval_required/approval_required) */
  membership_approval?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: RestrictedModeSetting
  /** 群类型 */
  chat_type?: string
  /** 群消息模式 */
  group_message_type?: 'chat' | 'thread'
  /** 谁可以加急 */
  urgent_setting?: 'only_owner' | 'all_members'
  /** 谁可以发起视频会议 */
  video_conference_setting?: 'only_owner' | 'all_members'
  /** 隐藏群成员人数设置 */
  hide_member_count_setting?: 'all_members' | 'only_owner'
}

export interface UpdateImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateImChatModerationRequest {
  /** 群发言模式（all_members/only_owner/moderator_list，其中 moderator_list 表示部分用户可发言的模式） */
  moderation_setting?: string
  /** 选择部分用户可发言模式时，添加的可发言用户列表（自动过滤不在群内的用户） */
  moderator_added_list?: string[]
  /** 选择部分用户可发言模式时，移除的可发言用户列表（自动过滤不在群内的用户） */
  moderator_removed_list?: string[]
}

export interface UpdateImChatModerationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetImChatResponse {
  /** 群头像URL */
  avatar?: string
  /** 群名称 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: I18nNames
  /** 加user/bot入群权限(all_members/only_owner) */
  add_member_permission?: string
  /** 群分享权限(allowed/not_allowed) */
  share_card_permission?: string
  /** at所有人权限(all_members/only_owner) */
  at_all_permission?: string
  /** 群编辑权限(all_members/only_owner) */
  edit_permission?: string
  /** 群主ID的类型(open_id/user_id/union_id) */
  owner_id_type?: string
  /** 群主ID */
  owner_id?: string
  /** 用户管理员列表 */
  user_manager_id_list?: string[]
  /** 机器人管理员列表 */
  bot_manager_id_list?: string[]
  /** 群消息模式 */
  group_message_type?: string
  /** 群模式 */
  chat_mode?: string
  /** 群类型 */
  chat_type?: string
  /** 优先级最高的一个群tag */
  chat_tag?: string
  /** 入群消息可见性 */
  join_message_visibility?: string
  /** 出群消息可见性 */
  leave_message_visibility?: string
  /** 加群审批 */
  membership_approval?: string
  /** 发言权限 */
  moderation_permission?: string
  /** 是否是外部群 */
  external?: boolean
  /** tenant key */
  tenant_key?: string
  /** 群成员人数 */
  user_count?: string
  /** 群机器人数 */
  bot_count?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: RestrictedModeSetting
  /** 谁可以加急 */
  urgent_setting?: 'only_owner' | 'all_members'
  /** 谁可以发起视频会议 */
  video_conference_setting?: 'only_owner' | 'all_members'
  /** 隐藏群成员人数设置 */
  hide_member_count_setting?: 'all_members' | 'only_owner'
  /** 群状态 */
  chat_status?: 'normal' | 'dissolved' | 'dissolved_save'
}

export interface PutTopNoticeImChatTopNoticeRequest {
  /** 要进行发布的群置顶 */
  chat_top_notice: ChatTopNotice[]
}

export interface ListImChatQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 群组排序方式 */
  sort_type?: 'ByCreateTimeAsc' | 'ByActiveTimeDesc'
}

export interface SearchImChatQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 关键词。注意：如果query为空值将返回空的结果 */
  query?: string
}

export interface GetImChatModerationQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetImChatModerationResponse {
  /** 群发言模式 */
  moderation_setting?: string
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
  /** 可发言用户列表 */
  items?: ListModerator[]
}

export interface LinkImChatRequest {
  /** 群分享链接有效时长，可选值week、year、permanently，分别表示7天、1年以及永久有效 */
  validity_period?: 'week' | 'year' | 'permanently'
}

export interface LinkImChatResponse {
  /** 群分享链接 */
  share_link?: string
  /** 分享链接过期时间戳（秒级） */
  expire_time?: string
  /** 分享链接是否永久有效 */
  is_permanent?: boolean
}

export interface AddManagersImChatManagersRequest {
  /** 要增加的 manager_id */
  manager_ids?: string[]
}

export interface AddManagersImChatManagersQuery {
  /** 群成员 id 类型 open_id/user_id/union_id/app_id */
  member_id_type?: 'user_id' | 'union_id' | 'open_id' | 'app_id'
}

export interface AddManagersImChatManagersResponse {
  /** 群目前的管理员id */
  chat_managers?: string[]
  /** 群目前的管理员bot id */
  chat_bot_managers?: string[]
}

export interface DeleteManagersImChatManagersRequest {
  /** 要删除的 manager_id */
  manager_ids?: string[]
}

export interface DeleteManagersImChatManagersQuery {
  /** 群成员 id 类型 open_id/user_id/union_id/app_id */
  member_id_type?: 'user_id' | 'union_id' | 'open_id' | 'app_id'
}

export interface DeleteManagersImChatManagersResponse {
  /** 群目前的管理员id */
  chat_managers?: string[]
  /** 群目前的管理员bot id */
  chat_bot_managers?: string[]
}

export interface CreateImChatMembersRequest {
  /** 成员列表<b>注意：</b>每次请求，最多拉50个用户或者5个机器人，并且群组最多容纳15个机器人 */
  id_list?: string[]
}

export interface CreateImChatMembersQuery {
  /** 进群成员 id 类型 open_id/user_id/union_id/app_id<b>注意：</b>拉机器人入群请使用 ==app_id== */
  member_id_type?: 'user_id' | 'union_id' | 'open_id' | 'app_id'
  /** 出现不可用ID后的处理方式 0/1/2 */
  succeed_type?: 0 | 1 | 2
}

export interface CreateImChatMembersResponse {
  /** ID无效的成员列表 */
  invalid_id_list?: string[]
  /** ID不存在的成员列表 */
  not_existed_id_list?: string[]
  /** 等待群主或管理员审批的成员ID列表 */
  pending_approval_id_list?: string[]
}

export interface DeleteImChatMembersRequest {
  /** 成员列表 */
  id_list?: string[]
}

export interface DeleteImChatMembersQuery {
  /** 出群成员 id 类型 open_id/user_id/union_id/app_id */
  member_id_type?: 'user_id' | 'union_id' | 'open_id' | 'app_id'
}

export interface DeleteImChatMembersResponse {
  /** 无效成员列表 */
  invalid_id_list?: string[]
}

export interface GetImChatMembersQuery extends Pagination {
  /** 群成员 用户 ID 类型，详情参见 [用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  member_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetImChatMembersResponse {
  /** member列表 */
  items?: ListMember[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
  /** 成员总数 */
  member_total?: number
}

export interface IsInChatImChatMembersResponse {
  /** 用户或者机器人是否在群中 */
  is_in_chat?: boolean
}

export interface PatchImChatAnnouncementRequest {
  /** 文档当前版本号 int64 类型，get 接口会返回 */
  revision: string
  /** 修改文档请求的序列化字段更新公告信息的格式和更新[云文档](/ssl:ttdoc/ukTMukTMukTM/uYDM2YjL2AjN24iNwYjN)格式相同 */
  requests?: string[]
}

export interface GetImChatAnnouncementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetImChatAnnouncementResponse {
  /** CCM 文档序列化信息 */
  content?: string
  /** 文档当前版本号 纯数字 */
  revision?: string
  /** 文档生成的时间戳（秒） */
  create_time?: string
  /** 消息更新的时间戳（秒） */
  update_time?: string
  /** 文档所有者id类型， open_id/user_id/union_id/app_id */
  owner_id_type?: 'user_id' | 'union_id' | 'open_id' | 'app_id'
  /** 文档所有者id */
  owner_id?: string
  /** 文档最新修改者id类型， open_id/user_id/union_id/app_id */
  modifier_id_type?: 'user_id' | 'union_id' | 'open_id' | 'app_id'
  /** 文档最新修改者id */
  modifier_id?: string
}

export interface CreateImChatTabRequest {
  /** 会话标签页 */
  chat_tabs: ChatTab[]
}

export interface CreateImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: ChatTab[]
}

export interface DeleteTabsImChatTabRequest {
  /** 会话标签页id列表 */
  tab_ids: string[]
}

export interface DeleteTabsImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: ChatTab[]
}

export interface UpdateTabsImChatTabRequest {
  /** 会话标签页 */
  chat_tabs?: ChatTab[]
}

export interface UpdateTabsImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: ChatTab[]
}

export interface SortTabsImChatTabRequest {
  /** 会话标签页ID列表 */
  tab_ids?: string[]
}

export interface SortTabsImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: ChatTab[]
}

export interface ListTabsImChatTabResponse {
  /** 会话标签页 */
  chat_tabs?: ChatTab[]
}

export interface CreateImChatMenuTreeRequest {
  /** 要向群内追加的菜单 */
  menu_tree: ChatMenuTree
}

export interface CreateImChatMenuTreeResponse {
  /** 追加后群内现有菜单 */
  menu_tree?: ChatMenuTree
}

export interface DeleteImChatMenuTreeRequest {
  /** 要删除的一级菜单ID列表 */
  chat_menu_top_level_ids: string[]
}

export interface DeleteImChatMenuTreeResponse {
  /** 群内现有菜单 */
  menu_tree?: ChatMenuTree
}

export interface PatchImChatMenuItemRequest {
  /** 修改的字段 */
  update_fields: ('ICON' | 'NAME' | 'I18N_NAME' | 'REDIRECT_LINK')[]
  /** 元信息 */
  chat_menu_item: ChatMenuItem
}

export interface PatchImChatMenuItemResponse {
  chat_menu_item?: ChatMenuItem
}

export interface SortImChatMenuTreeRequest {
  /** 一级菜单id列表 */
  chat_menu_top_level_ids: string[]
}

export interface SortImChatMenuTreeResponse {
  /** 排序后群内菜单 */
  menu_tree?: ChatMenuTree
}

export interface GetImChatMenuTreeResponse {
  /** 群内所有菜单 */
  menu_tree?: ChatMenuTree
}

export interface CreateImAppFeedCardRequest {
  /** 应用消息卡片 */
  app_feed_card?: OpenAppFeedCard
  /** 用户 ID */
  user_ids?: string[]
}

export interface CreateImAppFeedCardQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface CreateImAppFeedCardResponse {
  /** 失败的卡片 */
  failed_cards?: OpenFailedUserAppFeedCardItem[]
  /** 卡片业务 ID */
  biz_id?: string
}

export interface UpdateImAppFeedCardBatchRequest {
  /** 应用消息卡片 */
  feed_cards?: UserOpenAppFeedCardUpdater[]
}

export interface UpdateImAppFeedCardBatchQuery {
  /** 此次调用中使用的用户ID的类型 可选值有:     - open_id: 以open_id来识别用户     - user_id: 以user_id来识别用户     - union_id: 以union_id来识别用户 */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
}

export interface UpdateImAppFeedCardBatchResponse {
  /** 失败的卡片 */
  failed_cards?: OpenFailedUserAppFeedCardItem[]
}

export interface DeleteImAppFeedCardBatchRequest {
  /** 应用消息卡片 */
  feed_cards?: UserOpenAppFeedCardDeleter[]
}

export interface DeleteImAppFeedCardBatchQuery {
  /** 此次调用中使用的用户ID的类型 可选值有:     - open_id: 以open_id来识别用户     - user_id: 以user_id来识别用户     - union_id: 以union_id来识别用户 */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
}

export interface DeleteImAppFeedCardBatchResponse {
  /** 失败的卡片 */
  failed_cards?: OpenFailedUserAppFeedCardItem[]
}

export interface BotTimeSentiveImFeedCardRequest {
  /** 临时置顶状态，true-打开，false-关闭 */
  time_sensitive: boolean
  /** 用户id 列表 */
  user_ids: string[]
}

export interface BotTimeSentiveImFeedCardQuery {
  /** 此次调用中使用的用户ID的类型 可选值有:     - open_id: 以open_id来识别用户     - user_id: 以user_id来识别用户     - union_id: 以union_id来识别用户 */
  user_id_type: 'open_id' | 'user_id' | 'union_id'
}

export interface BotTimeSentiveImFeedCardResponse {
  /** 失败原因 */
  failed_user_reasons?: FailedReason[]
}

export interface UpdateImChatButtonRequest {
  /** 用户 ID 列表 */
  user_ids?: string[]
  /** 群 ID */
  chat_id: string
  /** 按钮 */
  buttons?: OpenAppFeedCardButtons
}

export interface UpdateImChatButtonQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface UpdateImChatButtonResponse {
  /** 失败的用户 */
  failed_user_reasons?: FailedReason[]
}

export interface PatchImFeedCardRequest {
  /** 临时置顶状态，true-打开，false-关闭 */
  time_sensitive: boolean
  /** 用户id 列表 */
  user_ids: string[]
}

export interface PatchImFeedCardQuery {
  /** 此次调用中使用的用户ID的类型 可选值有:     - open_id: 以open_id来识别用户     - user_id: 以user_id来识别用户     - union_id: 以union_id来识别用户 */
  user_id_type: 'open_id' | 'user_id' | 'union_id'
}

export interface PatchImFeedCardResponse {
  /** 失败原因 */
  failed_user_reasons?: FailedReason[]
}

export interface GetImBizEntityTagRelationQuery {
  /** 业务类型 */
  tag_biz_type: 'chat'
  /** 业务实体id */
  biz_entity_id: string
}

export interface GetImBizEntityTagRelationResponse {
  /** 标签内容及绑定时间 */
  tag_info_with_bind_versions?: TagInfoWithBindVersion[]
}

export interface CreateImTagRequest {
  /** 创建标签 */
  create_tag: CreateTag
}

export interface CreateImTagResponse {
  /** 创建的tagid */
  id?: string
  /** 创建失败原因 */
  create_tag_fail_reason?: CreateTagFailReason
}

export interface PatchImTagRequest {
  /** 编辑标签 */
  patch_tag?: PatchTag
}

export interface PatchImTagResponse {
  /** 编辑后的taginfo */
  tag_info?: TagInfo
  /** 修改失败原因 */
  patch_tag_fail_reason?: PatchTagFailReason
}

export interface CreateImBizEntityTagRelationRequest {
  /** 业务类型 */
  tag_biz_type: 'chat'
  /** 业务实体id */
  biz_entity_id: string
  /** 标签id */
  tag_ids?: string[]
}

export interface UpdateImBizEntityTagRelationRequest {
  /** 业务类型 */
  tag_biz_type: 'chat'
  /** 业务实体id */
  biz_entity_id: string
  /** 标签id */
  tag_ids?: string[]
}

Internal.define({
  '/im/v1/messages': {
    POST: 'createImMessage',
    GET: { name: 'listImMessage', pagination: { argIndex: 0 } },
  },
  '/im/v1/messages/{message_id}/reply': {
    POST: 'replyImMessage',
  },
  '/im/v1/messages/{message_id}': {
    PUT: 'updateImMessage',
    DELETE: 'deleteImMessage',
    GET: 'getImMessage',
    PATCH: 'patchImMessage',
  },
  '/im/v1/messages/{message_id}/forward': {
    POST: 'forwardImMessage',
  },
  '/im/v1/messages/merge_forward': {
    POST: 'mergeForwardImMessage',
  },
  '/im/v1/threads/{thread_id}/forward': {
    POST: 'forwardImThread',
  },
  '/im/v1/messages/{message_id}/push_follow_up': {
    POST: 'pushFollowUpImMessage',
  },
  '/im/v1/messages/{message_id}/read_users': {
    GET: { name: 'readUsersImMessage', pagination: { argIndex: 1 } },
  },
  '/im/v1/messages/{message_id}/resources/{file_key}': {
    GET: { name: 'getImMessageResource', type: 'binary' },
  },
  '/im/v1/batch_messages/{batch_message_id}': {
    DELETE: 'deleteImBatchMessage',
  },
  '/im/v1/batch_messages/{batch_message_id}/read_user': {
    GET: 'readUserImBatchMessage',
  },
  '/im/v1/batch_messages/{batch_message_id}/get_progress': {
    GET: 'getProgressImBatchMessage',
  },
  '/im/v1/images': {
    POST: { name: 'createImImage', multipart: true },
  },
  '/im/v1/images/{image_key}': {
    GET: { name: 'getImImage', type: 'binary' },
  },
  '/im/v1/files': {
    POST: { name: 'createImFile', multipart: true },
  },
  '/im/v1/files/{file_key}': {
    GET: { name: 'getImFile', type: 'binary' },
  },
  '/im/v1/messages/{message_id}/urgent_app': {
    PATCH: 'urgentAppImMessage',
  },
  '/im/v1/messages/{message_id}/urgent_sms': {
    PATCH: 'urgentSmsImMessage',
  },
  '/im/v1/messages/{message_id}/urgent_phone': {
    PATCH: 'urgentPhoneImMessage',
  },
  '/im/v1/messages/{message_id}/reactions': {
    POST: 'createImMessageReaction',
    GET: { name: 'listImMessageReaction', pagination: { argIndex: 1 } },
  },
  '/im/v1/messages/{message_id}/reactions/{reaction_id}': {
    DELETE: 'deleteImMessageReaction',
  },
  '/im/v1/pins': {
    POST: 'createImPin',
    GET: { name: 'listImPin', pagination: { argIndex: 0 } },
  },
  '/im/v1/pins/{message_id}': {
    DELETE: 'deleteImPin',
  },
  '/im/v2/url_previews/batch_update': {
    POST: 'batchUpdateImUrlPreview',
  },
  '/im/v1/chats': {
    POST: 'createImChat',
    GET: { name: 'listImChat', pagination: { argIndex: 0 } },
  },
  '/im/v1/chats/{chat_id}': {
    DELETE: 'deleteImChat',
    PUT: 'updateImChat',
    GET: 'getImChat',
  },
  '/im/v1/chats/{chat_id}/moderation': {
    PUT: 'updateImChatModeration',
    GET: 'getImChatModeration',
  },
  '/im/v1/chats/{chat_id}/top_notice/put_top_notice': {
    POST: 'putTopNoticeImChatTopNotice',
  },
  '/im/v1/chats/{chat_id}/top_notice/delete_top_notice': {
    POST: 'deleteTopNoticeImChatTopNotice',
  },
  '/im/v1/chats/search': {
    GET: { name: 'searchImChat', pagination: { argIndex: 0 } },
  },
  '/im/v1/chats/{chat_id}/link': {
    POST: 'linkImChat',
  },
  '/im/v1/chats/{chat_id}/managers/add_managers': {
    POST: 'addManagersImChatManagers',
  },
  '/im/v1/chats/{chat_id}/managers/delete_managers': {
    POST: 'deleteManagersImChatManagers',
  },
  '/im/v1/chats/{chat_id}/members': {
    POST: 'createImChatMembers',
    DELETE: 'deleteImChatMembers',
    GET: 'getImChatMembers',
  },
  '/im/v1/chats/{chat_id}/members/me_join': {
    PATCH: 'meJoinImChatMembers',
  },
  '/im/v1/chats/{chat_id}/members/is_in_chat': {
    GET: 'isInChatImChatMembers',
  },
  '/im/v1/chats/{chat_id}/announcement': {
    PATCH: 'patchImChatAnnouncement',
    GET: 'getImChatAnnouncement',
  },
  '/im/v1/chats/{chat_id}/chat_tabs': {
    POST: 'createImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/delete_tabs': {
    DELETE: 'deleteTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/update_tabs': {
    POST: 'updateTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/sort_tabs': {
    POST: 'sortTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/list_tabs': {
    GET: 'listTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/menu_tree': {
    POST: 'createImChatMenuTree',
    DELETE: 'deleteImChatMenuTree',
    GET: 'getImChatMenuTree',
  },
  '/im/v1/chats/{chat_id}/menu_items/{menu_item_id}': {
    PATCH: 'patchImChatMenuItem',
  },
  '/im/v1/chats/{chat_id}/menu_tree/sort': {
    POST: 'sortImChatMenuTree',
  },
  '/im/v2/app_feed_card': {
    POST: 'createImAppFeedCard',
  },
  '/im/v2/app_feed_card/batch': {
    PUT: 'updateImAppFeedCardBatch',
    DELETE: 'deleteImAppFeedCardBatch',
  },
  '/im/v2/feed_cards/bot_time_sentive': {
    PATCH: 'botTimeSentiveImFeedCard',
  },
  '/im/v2/chat_button': {
    PUT: 'updateImChatButton',
  },
  '/im/v2/feed_cards/{feed_card_id}': {
    PATCH: 'patchImFeedCard',
  },
  '/im/v2/biz_entity_tag_relation': {
    GET: 'getImBizEntityTagRelation',
    POST: 'createImBizEntityTagRelation',
    PUT: 'updateImBizEntityTagRelation',
  },
  '/im/v2/tags': {
    POST: 'createImTag',
  },
  '/im/v2/tags/{tag_id}': {
    PATCH: 'patchImTag',
  },
})
