import { Internal } from "../internal";
// GENERATED CONTENT

export interface QuerySceneGroupTemplateRobotQuery {
  /** 机器人的编码。 */
  robotCode?: string;
  /** 群会话ID。 */
  openConversationId?: string;
}

export interface QuerySceneGroupTemplateRobotResponse {
  success?: unknown;
  result?: {
    userId?: string;
    unionId?: string;
  };
}

export interface BatchQueryGroupMemberParams {
  /** 开放群ID。 */
  openConversationId: string;
  /** 群应用编码。 */
  coolAppCode?: string;
  /** 本次读取的最大数据记录数量（该入参传入值小于钉钉阈值时返回全部）。 */
  maxResults: number;
  /** 标记当前开始读取的位置，置空表示从头开始。 */
  nextToken?: string;
}

export interface BatchQueryGroupMemberResponse {
  success?: unknown;
  memberUserIds?: string[];
  hasMore?: unknown;
  nextToken?: string;
}

export interface QueryGroupMuteStatusQuery {
  /** 群成员userId。 */
  userId: string;
  /** 开放的会话ID，可通过[创建场景群](https://open.dingtalk.com/document/group/create-a-scene-group-v2)接口获取。 */
  openConversationId: string;
}

export interface QueryGroupMuteStatusResponse {
  groupMuteMode: unknown;
  userMuteResult: {
    userMuteMode: number;
    muteStartTime: number;
    muteEndTime: number;
  };
}

export interface UpdateMemberBanWordsParams {
  /** 群成员id列表。 */
  userIdList: string[];
  /** 开放群id，可通过[创建场景群](https://open.dingtalk.com/document/group/create-a-scene-group-v2)接口获取。 */
  openConversationId: string;
  /** 禁言状态： */
  muteStatus: number;
  /** 禁言持续时长，单位：毫秒。 */
  muteDuration: number;
}

export interface GetSceneGroupInfoParams {
  /** 群ID： */
  openConversationId: string;
  /** 群聊酷应用编码： */
  coolAppCode?: string;
}

export interface GetSceneGroupInfoResponse {
  success?: unknown;
  openConversationId?: string;
  templateId?: string;
  title?: string;
  ownerUserId?: string;
  icon?: string;
  groupUrl?: string;
  status?: number;
}

export interface UpdateGroupSubAdminParams {
  /** 场景群群ID。 */
  openConversationId: string;
  /** 用户userid列表。 */
  userIds: string[];
  /** 群成员类型： */
  role: number;
}

export interface UpdateGroupSubAdminResponse {
  success: unknown;
}

export interface UpdateMemberGroupNickParams {
  /** 场景群群ID，可以调用[创建场景群](https://developers.dingtalk.com/document/chatgroup/create-a-scene-group-v2)接口获取。 */
  openConversationId: string;
  /** 用户的userid。 */
  userId: string;
  /** 用户群昵称。 */
  groupNick: string;
}

export interface UpdateMemberGroupNickResponse {
  success?: unknown;
}

export interface SendTemplateInteractiveCardParams {
  /** 卡片内容模板ID，响应模板目前有： */
  cardTemplateId: string;
  /** 接收卡片的加密群ID，特指多人群会话（非单聊）。 */
  openConversationId?: string;
  /** 单聊会话接收者json字符串。 */
  singleChatReceiver?: string;
  /** 唯一标识一张卡片的外部ID。 */
  outTrackId: string;
  /** 机器人代码。 */
  robotCode: string;
  /** 可控制卡片回调的URL。 */
  callbackUrl?: string;
  /** 卡片模板，文本内容参数、 */
  cardData: string;
  /** 互动卡片发送选项。 */
  sendOptions?: unknown;
}

export interface SendTemplateInteractiveCardResponse {
  processQueryKey?: string;
}

export interface UpdateInteractiveCardParams {
  /** 唯一标示卡片的外部编码 */
  outTrackId?: string;
  /** 卡片数据 */
  cardData?: unknown;
  /** 卡片用户私有差异部分数据（如卡片不同人显示不同按钮；key：用户userId；value：用户数据变量） */
  privateData?: unknown;
  userIdType?: number;
  cardOptions?: unknown;
}

export interface UpdateInteractiveCardResponse {
  success?: string;
}

export interface SendInteractiveCardParams {
  /** 互动卡片的消息模板ID： */
  cardTemplateId: string;
  /** 群ID： */
  openConversationId?: string;
  /** 接收人userId列表。 */
  receiverUserIdList?: string[];
  /** 唯一标示卡片的外部编码。 */
  outTrackId: string;
  /** 机器人的编码。 */
  robotCode?: string;
  /** 发送的会话类型： */
  conversationType: number;
  /** 卡片回调时的路由Key，用于查询注册的**callbackUrl**。 */
  callbackRouteKey?: string;
  /** 卡片公有数据。 */
  cardData: unknown;
  /** 卡片私有数据。 */
  privateData?: unknown;
  /** 企业机器人ID，填写企业内部开发-机器人的AppKey。 */
  chatBotId?: string;
  /** 用户ID类型： */
  userIdType?: number;
  /** 消息@人。格式：`{"key":"value"}`。 */
  atOpenIds?: unknown;
  /** 卡片操作。 */
  cardOptions?: unknown;
  /** 是否开启卡片纯拉模式。 */
  pullStrategy?: unknown;
}

export interface SendInteractiveCardResponse {
  success?: unknown;
  result?: {
    processQueryKey: string;
  };
}

export interface UpdateRobotInteractiveCardParams {
  /** 唯一标识一张卡片的外部ID（卡片幂等ID，可用于更新或重复发送同一卡片到多个群会话）【备注：同一个outTrackId重复创建，卡片数据不覆盖更新】 */
  cardBizId: string;
  /** 卡片模板-文本内容参数（卡片json结构体） */
  cardData?: string;
  /** 卡片模板-userId差异用户参数（json结构体） */
  userIdPrivateDataMap?: string;
  /** 卡片模板-userId差异用户参数（json结构体） */
  unionIdPrivateDataMap?: string;
  /** 互动卡片更新选项 */
  updateOptions?: unknown;
}

export interface UpdateRobotInteractiveCardResponse {
  processQueryKey?: string;
}

export interface SendRobotInteractiveCardParams {
  /** 卡片搭建平台模板ID，固定值填写为StandardCard。 */
  cardTemplateId: string;
  /** 接收卡片的加密群ID，特指多人群会话（非单聊）。 */
  openConversationId?: string;
  /** 单聊会话接收者json串。 */
  singleChatReceiver?: string;
  /** 唯一标识一张卡片的外部ID，卡片幂等ID，可用于更新或重复发送同一卡片到多个群会话。 */
  cardBizId: string;
  /** 机器人代码ID。 */
  robotCode: string;
  /** 可控制卡片回调的URL，不填则无需回调。 */
  callbackUrl?: string;
  /** 卡片模板文本内容参数，卡片json结构体。 */
  cardData: string;
  /** 卡片模板userId差异用户参数，json结构体。 */
  userIdPrivateDataMap?: string;
  /** 卡片模板unionId差异用户参数，json结构体。 */
  unionIdPrivateDataMap?: string;
  /** 互动卡片发送选项。 */
  sendOptions?: unknown;
  /** 是否开启卡片纯拉模式。 */
  pullStrategy?: unknown;
}

export interface SendRobotInteractiveCardResponse {
  processQueryKey?: string;
}

export interface ChatIdToOpenConversationIdResponse {
  openConversationId: string;
}

export interface ChatSubAdminUpdateParams {
  /** 开放群ID。可以调用[创建群会话](https://open.dingtalk.com/document/orgapp-server/create-group-session)接口获取openConversationId参数值。 */
  openConversationId: string;
  /** 企业员工userid列表。可以调用[获取用户userid列表](https://open.dingtalk.com/document/orgapp-server/query-the-list-of-department-userids)接口获取userid_list参数值。 */
  userIds: string[];
  /** 设置类型，取值： */
  role: number;
}

export interface ChatSubAdminUpdateResponse {
  success: string;
}

export interface ImCreateGroupParams {
  /** 群名称，长度限制为1～64个字符。例如：客户群。 */
  groupName: string;
  /** 群头像地址，长度限制为1～1024个字符。例如：http://***.png。 */
  groupAvatar?: string;
  /** 群模板Id，来源自钉钉客联工作台，通过群模板可以为群配置群机器人、群工具栏、常用语、欢迎语。长度限制为1～32个字符。例如：8d42****nkld。 */
  groupTemplateId: string;
  /** 群成员信息。 */
  users: object[];
  /** 操作者在业务系统内的唯一标识。 */
  operatorId?: string;
}

export interface ImCreateGroupResponse {
  openConversationId?: string;
  conversationId?: string;
  appUserIds?: string[];
  userIds?: string[];
}

export interface CreateCoupleGroupParams {
  /** 群模板Id，来源自钉钉客联工作台，通过群模板可以为群配置群机器人、群工具栏、常用语、欢迎语。长度限制为1～32个字符。例如：8d42****nkld。 */
  groupTemplateId: string;
  /** 群成员信息。 */
  users?: object[];
  /** 操作者在业务系统内的唯一标识。 */
  operatorId?: string;
}

export interface CreateCoupleGroupResponse {
  openConversationId?: string;
  conversationId?: string;
  appUserIds?: string[];
  userIds?: string[];
}

export interface ChangeGroupOwnerParams {
  /** 群会话openConversationId。 */
  openConversationId: string;
  /** 群主Id。 */
  groupOwnerId: string;
  /** 群主类型，取值： */
  groupOwnerType: number;
}

export interface ChangeGroupOwnerResponse {
  newGroupOwnerId?: string;
  newGroupOwnerType?: number;
}

export interface DismissGroupConversationParams {
  /** 需要被解散的群会话openConversationId。 */
  openConversationId: string;
}

export interface DismissGroupConversationResponse {
  openConversationId?: string;
}

export interface SendRobotMessageParams {
  /** 群会话openConversationId，长度限制为1～32个字符。 */
  openConversationIds: string[];
  /** 机器人robotId（robotCode），指定哪个机器人发送消息，获取来源：在客联应用的机器人管理中获取robotCode。 */
  robotCode?: string;
  /** 消息类型，取值: */
  msgType: string;
  /** 消息体内容，请参考本文消息格式说明。 */
  msgContent: string;
  /** 钉内账号userId，长度限制为1～64个字符，例如：1745****8777。 */
  atDingUserId?: string;
  /** 钉外账号在业务系统内的唯一标志，长度限制为1～64个字符，例如：1107****2120。 */
  atAppUserId?: string;
  /** 是否@群所有人： */
  atAll?: unknown;
}

export interface SendRobotMessageResponse {
  success?: unknown;
}

export interface CreateStoreGroupConversationParams {
  /** 群名称。 */
  groupName: string;
  /** 群头像。 */
  groupAvatar?: string;
  /** 群模板Id。 */
  groupTemplateId: string;
  /** 钉外用户在业务系统内的标识。 */
  appUserId: string;
  /** 外部业务唯一标识（店铺唯一标识）。 */
  businessUniqueKey: string;
  /** 钉内用户userId。 */
  userIds?: string[];
  /** 操作者在业务系统内的唯一标识。 */
  operatorId: string;
}

export interface CreateStoreGroupConversationResponse {
  openConversationId: string;
  conversationId: string;
}

export interface CreateCoupleGroupConversationParams {
  /** 群名称。 */
  groupName: string;
  /** 群头像链接地址。 */
  groupAvatar?: string;
  /** 群模板Id。 */
  groupTemplateId: string;
  /** 群主在业务系统内的标识。 */
  groupOwnerId: string;
  /** 钉外用户在业务系统内的标识。 */
  appUserId: string;
  /** 操作者在业务系统内的唯一标识。 */
  operatorId: string;
}

export interface CreateCoupleGroupConversationResponse {
  openConversationId: string;
  conversationId: string;
}

export interface UpdateGroupNameParams {
  /** 需要修改名称的群会话openConversationId。 */
  openConversationId: string;
  /** 新的群名称。 */
  groupName: string;
}

export interface UpdateGroupNameResponse {
  newGroupName?: string;
}

export interface UpdateGroupAvatarParams {
  /** 需要更新群头像的群会话openConversationId。 */
  openConversationId: string;
  /** 新的群头像地址。 */
  groupAvatar: string;
}

export interface UpdateGroupAvatarResponse {
  newGroupAvatar: string;
}

export interface QuerySingleGroupParams {
  /** 群模版Id。 */
  groupTemplateId: string;
  /** 群成员列表，最大值20。 */
  groupMembers: object[];
}

export interface QuerySingleGroupResponse {
  openConversations: {
    openConversationId?: string;
    appUserId: string;
    userId: string;
  }[];
}

export interface QueryGroupMemberQuery {
  /** 群会话openConversationId。 */
  openConversationId: string;
}

export interface QueryGroupMemberResponse {
  openConversationId: string;
  groupMembers: {
    groupMemberId?: string;
    groupMemberName: string;
    groupMemberType: number;
    groupMemberAvatar?: string;
    groupMemberDynamics?: string;
  }[];
}

export interface QueryUnReadMessageParams {
  /** 钉外用户在业务系统内的标识。 */
  appUserId: string;
  /** 群会话openConversationIds列表，最大值100。 */
  openConversationIds?: string[];
}

export interface QueryUnReadMessageResponse {
  unReadCount: number;
  unReadItems?: {
    openConversationId?: string;
    unReadCount?: number;
  }[];
}

export interface SendMessageParams {
  /** 钉外用户在业务系统内的标识，长度限制为1~64个字符。 */
  senderId: string;
  /** 钉内用户userId。 */
  receiverId?: string;
  /** 群会话openConversationId。 */
  openConversationId?: string;
  /** 消息类型，取值： */
  messageType: string;
  /** 消息内容。 */
  message: string;
  /** 渠道信息。 */
  sourceInfos?: unknown;
}

export interface SendMessageResponse {
  requestId: string;
}

export interface RemoveGroupMemberParams {
  /** 群会话openConversationId。 */
  openConversationId: string;
  /** 需要被移除的钉外用户在业务系统内的标识列表。 */
  appUserIds?: string[];
  /** 需要被移除的钉内用户的userId列表。 */
  userIds?: string[];
  /** 操作者在业务系统内的唯一标识。 */
  operatorId: string;
}

export interface RemoveGroupMemberResponse {
  message: string;
}

export interface AddGroupMemberParams {
  /** 群会话openConversationId。 */
  openConversationId: string;
  /** 钉外用户在业务系统内的标识列表。 */
  appUserIds?: string[];
  /** 钉内用户userId。 */
  userIds?: string[];
  /** 操作者在业务系统内的唯一标识。 */
  operatorId: string;
}

export interface AddGroupMemberResponse {
  appUserIds: string[];
  userIds: string[];
}

export interface CreateGroupConversationParams {
  /** 群名称。 */
  groupName: string;
  /** 群头像。 */
  groupAvatar?: string;
  /** 群模板Id。 */
  groupTemplateId: string;
  /** 群主在业务系统内的唯一标识。 */
  groupOwnerId: string;
  /** 群主类型，取值： */
  groupOwnerType?: number;
  /** 钉外用户ID列表。 */
  appUserIds?: string[];
  /** 钉内用户userId列表。 */
  userIds?: string[];
  /** 操作者在业务系统内的唯一标识。 */
  operatorId: string;
}

export interface CreateGroupConversationResponse {
  openConversationId: string;
  conversationId: string;
  appUserIds: string[];
  userIds: string[];
}

export interface SendDingMessageParams {
  /** 消息发送者userId，即钉内用户userId。 */
  senderId: string;
  /** 钉外用户在业务系统内的唯一标识。 */
  receiverId?: string;
  /** 群会话openConversationId。 */
  openConversationId?: string;
  /** 消息类型，取值： */
  messageType: string;
  /** 消息内容。 */
  message: string;
  /** 发送者在钉钉客联应用内的个人授权码。 */
  code: string;
}

export interface SendDingMessageResponse {
  requestId: string;
}

export interface GetConversationUrlParams {
  /** 钉外用户在业务系统内的标识，长度限制为1~64个字符。 */
  appUserId: string;
  /** 钉内用户userId。 */
  userId?: string;
  /** 群会话openConversationId。 */
  openConversationId?: string;
  /** 渠道code。 */
  channelCode: string;
  /** 钉外用户设备信息，用于安全性校验，自定义参数。 */
  sourceCode: string;
}

export interface GetConversationUrlResponse {
  url: string;
}

export interface CreateInterconnectionParams {
  /** 钉内用户与钉外用户关系。 */
  interconnections: object[];
}

export interface CreateInterconnectionResponse {
  results?: {
    appUserId?: string;
    userId?: string;
    message?: string;
  }[];
}

export interface SendOTOInteractiveCardParams {
  /** 卡片模板ID，可通过[卡片平台](https://open-dev.dingtalk.com/fe/card)创建消息卡片，参见[创建消息模板](https://open.dingtalk.com/document/orgapp/create-message-template)。 */
  cardTemplateId: string;
  /** 会话ID。 */
  openConversationId?: string;
  /** 用户ID列表。 */
  receiverUserIdList?: string[];
  /** 唯一标示卡片的外部编码。 */
  outTrackId: string;
  /** 机器人编码。 */
  robotCode?: string;
  /** 卡片回调时的路由Key，用于查询注册的callbackUrl。 */
  callbackRouteKey?: string;
  /** 卡片模板内容。 */
  cardData: unknown;
  /** 指定用户可见的按钮列表： */
  privateData?: unknown;
  /** 用户ID类型： */
  userIdType?: number;
  /** 消息@人。格式：`{"key":"value"}`。 */
  atOpenIds?: unknown;
  /** 卡片属性。 */
  cardOptions?: unknown;
  /** 是否开启卡片纯拉模式： */
  pullStrategy?: unknown;
}

export interface SendOTOInteractiveCardResponse {
  success?: unknown;
  result?: {
    processQueryKey: string;
  };
}

export interface CloseTopboxParams {
  /** 唯一标识一张卡片的外部ID，最大长度64。 */
  outTrackId: string;
  /** 会话类型： */
  conversationType: number;
  /** 会话id： */
  openConversationId?: string;
  /** 用户userId： */
  userId?: string;
  /** 用户unionId： */
  unoinId?: string;
  /** 机器人编码： */
  robotCode?: string;
  /** 酷应用编码： */
  coolAppCode?: string;
  /** 群模板id： */
  groupTemplateId?: string;
}

export interface CloseTopboxResponse {
  success?: unknown;
}

export interface CreateTopboxParams {
  /** 互动卡片的消息模板ID，详情参见[创建消息模板](https://open.dingtalk.com/document/group/create-message-template)后可获取模板ID。 */
  cardTemplateId: string;
  /** 唯一标识一张卡片的外部ID，最大长度64。 */
  outTrackId: string;
  /** 可控制卡片回调时的路由Key，用于指定特定的callbackUrl，调用[注册互动卡片回调地址](https://open.dingtalk.com/document/group/registration-card-interaction-callback-address-1)接口，获取参数callbackRouteKey。 */
  callbackRouteKey?: string;
  /** 卡片数据。 */
  cardData: unknown;
  /** 卡片模板userId差异用户参数。 */
  userIdPrivateDataMap?: unknown;
  /** 卡片模板unionId差异用户参数。 */
  unionIdPrivateDataMap?: unknown;
  /** 卡片设置项。 */
  cardSettings?: unknown;
  /** 会话类型： */
  conversationType: number;
  /** 会话id： */
  openConversationId?: string;
  /** 用户userId： */
  userId?: string;
  /** 用户unionId： */
  unoinId?: string;
  /** 机器人编码： */
  robotCode?: string;
  /** 酷应用编码： */
  coolAppCode?: string;
  /** 群模板id： */
  groupTemplateId?: string;
  /** 吊顶可见者userId，最多可传100个userId： */
  receiverUserIdList?: string[];
  /** 吊顶可见者unionId，最多可传100个unionId： */
  receiverUnionIdList?: string[];
  /** 吊顶的过期时间，毫秒级时间戳。 */
  expiredTime?: number;
  /** 期望吊顶的端，如果有多个用“｜”分隔。 例如：ios|mac|android|win表示iOS、MAC、安卓和windows端。 */
  platforms?: string;
}

export interface CreateTopboxResponse {
  success?: unknown;
}

// funcName: isOldApi
Internal.define({
  "/im/sceneGroups/templates/robots": {
    GET: { querySceneGroupTemplateRobot: false },
  },
  "/im/sceneGroups/members/batchQuery": {
    POST: { batchQueryGroupMember: false },
  },
  "/im/sceneGroups/muteSettings": { GET: { queryGroupMuteStatus: false } },
  "/im/sceneGroups/muteMembers/set": { POST: { updateMemberBanWords: false } },
  "/im/sceneGroups/query": { POST: { getSceneGroupInfo: false } },
  "/im/sceneGroups/subAdmins": { PUT: { updateGroupSubAdmin: false } },
  "/im/sceneGroups/members/groupNicks": {
    PUT: { updateMemberGroupNick: false },
  },
  "/im/interactiveCards/templates/send": {
    POST: { sendTemplateInteractiveCard: false },
  },
  "/im/interactiveCards": { PUT: { updateInteractiveCard: false } },
  "/im/interactiveCards/send": { POST: { sendInteractiveCard: false } },
  "/im/robots/interactiveCards": { PUT: { updateRobotInteractiveCard: false } },
  "/im/v1.0/robot/interactiveCards/send": {
    POST: { sendRobotInteractiveCard: false },
  },
  "/im/chat/{chatId}/convertToOpenConversationId": {
    POST: { chatIdToOpenConversationId: false },
  },
  "/im/subAdministrators": { POST: { chatSubAdminUpdate: false } },
  "/im/interconnections/groups": { POST: { createGroupConversation: false } },
  "/im/interconnections/couples/groups": { POST: { createCoupleGroup: false } },
  "/im/interconnections/groups/owners": { PUT: { changeGroupOwner: false } },
  "/im/interconnections/groups/dismiss": {
    POST: { dismissGroupConversation: false },
  },
  "/im/interconnections/robotMessages/send": {
    POST: { sendRobotMessage: false },
  },
  "/im/interconnections/storeGroups": {
    POST: { createStoreGroupConversation: false },
  },
  "/im/interconnections/coupleGroups": {
    POST: { createCoupleGroupConversation: false },
  },
  "/im/interconnections/groups/names": { PUT: { updateGroupName: false } },
  "/im/interconnections/groups/avatars": { PUT: { updateGroupAvatar: false } },
  "/im/interconnections/doubleGroups/query": {
    POST: { querySingleGroup: false },
  },
  "/im/interconnections/conversations/members": {
    GET: { queryGroupMember: false },
  },
  "/im/interconnections/unReadMsgs/query": {
    POST: { queryUnReadMessage: false },
  },
  "/im/interconnections/messages/send": { POST: { sendMessage: false } },
  "/im/interconnections/groups/members/remove": {
    POST: { removeGroupMember: false },
  },
  "/im/interconnections/groups/members": { POST: { addGroupMember: false } },
  "/im/interconnections/dingMessages/send": {
    POST: { sendDingMessage: false },
  },
  "/im/conversations/urls": { POST: { getConversationUrl: false } },
  "/im/interconnections": { POST: { createInterconnection: false } },
  "/im/privateChat/interactiveCards/send": {
    POST: { sendOTOInteractiveCard: false },
  },
  "/im/topBoxes/close": { POST: { closeTopbox: false } },
  "/im/topBoxes": { POST: { createTopbox: false } },
});
declare module "../internal" {
  interface Internal {
    /**
     * 查询群内群模板机器人
     * @see https://developers.dingtalk.com/document/isvapp/query-intra-group-template-robot
     */
    querySceneGroupTemplateRobot(
      query: QuerySceneGroupTemplateRobotQuery,
    ): Promise<QuerySceneGroupTemplateRobotResponse>;
    /**
     * 查询群成员
     * @see https://developers.dingtalk.com/document/orgapp/query-group-members
     */
    batchQueryGroupMember(
      params: BatchQueryGroupMemberParams,
    ): Promise<BatchQueryGroupMemberResponse>;
    /**
     * 查询群禁言状态
     * @see https://developers.dingtalk.com/document/orgapp/query-group-silence-status
     */
    queryGroupMuteStatus(
      query: QueryGroupMuteStatusQuery,
    ): Promise<QueryGroupMuteStatusResponse>;
    /**
     * 设置群成员禁言状态
     * @see https://developers.dingtalk.com/document/orgapp/set-group-members-access-control
     */
    updateMemberBanWords(params: UpdateMemberBanWordsParams): Promise<void>;
    /**
     * 查询群简要信息
     * @see https://developers.dingtalk.com/document/isvapp/query-group-brief-information
     */
    getSceneGroupInfo(
      params: GetSceneGroupInfoParams,
    ): Promise<GetSceneGroupInfoResponse>;
    /**
     * 更新群管理员
     * @see https://developers.dingtalk.com/document/isvapp/update-group-administrator
     */
    updateGroupSubAdmin(
      params: UpdateGroupSubAdminParams,
    ): Promise<UpdateGroupSubAdminResponse>;
    /**
     * 更新群成员的群昵称
     * @see https://developers.dingtalk.com/document/isvapp/update-group-nicknames-for-group-members
     */
    updateMemberGroupNick(
      params: UpdateMemberGroupNickParams,
    ): Promise<UpdateMemberGroupNickResponse>;
    /**
     * 发送模板响应式可交互式卡片
     * @see https://developers.dingtalk.com/document/orgapp/send-lightweight-interactive-cards
     */
    sendTemplateInteractiveCard(
      params: SendTemplateInteractiveCardParams,
    ): Promise<SendTemplateInteractiveCardResponse>;
    /**
     * 更新钉钉互动卡片
     * @see https://developers.dingtalk.com/document/orgapp/update-dingtalk-interactive-cards-1
     */
    updateInteractiveCard(
      params: UpdateInteractiveCardParams,
    ): Promise<UpdateInteractiveCardResponse>;
    /**
     * 发送可交互式动态卡片
     * @see https://developers.dingtalk.com/document/orgapp/send-interactive-dynamic-cards-1
     */
    sendInteractiveCard(
      params: SendInteractiveCardParams,
    ): Promise<SendInteractiveCardResponse>;
    /**
     * 更新机器人发送互动卡片
     * @see https://developers.dingtalk.com/document/orgapp/update-the-robot-to-send-interactive-cards
     */
    updateRobotInteractiveCard(
      params: UpdateRobotInteractiveCardParams,
    ): Promise<UpdateRobotInteractiveCardResponse>;
    /**
     * 机器人发送互动卡片（普通版）
     * @see https://developers.dingtalk.com/document/orgapp/robots-send-interactive-cards
     */
    sendRobotInteractiveCard(
      params: SendRobotInteractiveCardParams,
    ): Promise<SendRobotInteractiveCardResponse>;
    /**
     * 获取群会话的OpenConversationId
     * @see https://developers.dingtalk.com/document/orgapp/obtain-group-openconversationid
     */
    chatIdToOpenConversationId(
      chatId: string,
    ): Promise<ChatIdToOpenConversationIdResponse>;
    /**
     * 设置群管理员
     * @see https://developers.dingtalk.com/document/orgapp/batch-setup-group-administrator
     */
    chatSubAdminUpdate(
      params: ChatSubAdminUpdateParams,
    ): Promise<ChatSubAdminUpdateResponse>;
    /**
     * 创建普通群
     * @see https://developers.dingtalk.com/document/app/create-common-group-new-version
     */
    imCreateGroup(params: ImCreateGroupParams): Promise<ImCreateGroupResponse>;
    /**
     * 创建两人群
     * @see https://developers.dingtalk.com/document/app/creating-two-groups-of-people
     */
    createCoupleGroup(
      params: CreateCoupleGroupParams,
    ): Promise<CreateCoupleGroupResponse>;
    /**
     * 更换群主
     * @see https://developers.dingtalk.com/document/isvapp/change-group-owner
     */
    changeGroupOwner(
      params: ChangeGroupOwnerParams,
    ): Promise<ChangeGroupOwnerResponse>;
    /**
     * 解散互通群
     * @see https://developers.dingtalk.com/document/isvapp/disband-bc-interconnection-group
     */
    dismissGroupConversation(
      params: DismissGroupConversationParams,
    ): Promise<DismissGroupConversationResponse>;
    /**
     * 机器人发送消息
     * @see https://developers.dingtalk.com/document/app/group-robots-send-messages
     */
    sendRobotMessage(
      params: SendRobotMessageParams,
    ): Promise<SendRobotMessageResponse>;
    /**
     * 创建店铺群
     * @see https://developers.dingtalk.com/document/isvapp/create-a-store-group
     */
    createStoreGroupConversation(
      params: CreateStoreGroupConversationParams,
    ): Promise<CreateStoreGroupConversationResponse>;
    /**
     * 创建钉外两人群
     * @see https://developers.dingtalk.com/document/isvapp/create-two-people-outside-the-nail
     */
    createCoupleGroupConversation(
      params: CreateCoupleGroupConversationParams,
    ): Promise<CreateCoupleGroupConversationResponse>;
    /**
     * 修改群名称
     * @see https://developers.dingtalk.com/document/isvapp/modify-the-group-name
     */
    updateGroupName(
      params: UpdateGroupNameParams,
    ): Promise<UpdateGroupNameResponse>;
    /**
     * 修改群头像
     * @see https://developers.dingtalk.com/document/isvapp/modify-the-avatar-of-a-communication-group
     */
    updateGroupAvatar(
      params: UpdateGroupAvatarParams,
    ): Promise<UpdateGroupAvatarResponse>;
    /**
     * 批量查询群信息
     * @see https://developers.dingtalk.com/document/isvapp/batch-query-cross-nail-two-group-list
     */
    querySingleGroup(
      params: QuerySingleGroupParams,
    ): Promise<QuerySingleGroupResponse>;
    /**
     * 查询群成员列表
     * @see https://developers.dingtalk.com/document/isvapp/query-the-group-member-list
     */
    queryGroupMember(
      query: QueryGroupMemberQuery,
    ): Promise<QueryGroupMemberResponse>;
    /**
     * 批量查询未读消息数
     * @see https://developers.dingtalk.com/document/isvapp/query-the-number-of-unread-messages-for-users-outside-of
     */
    queryUnReadMessage(
      params: QueryUnReadMessageParams,
    ): Promise<QueryUnReadMessageResponse>;
    /**
     * 发送ToB消息
     * @see https://developers.dingtalk.com/document/isvapp/a-user-outside-the-dingtalk-sends-a-message-to-the
     */
    sendMessage(params: SendMessageParams): Promise<SendMessageResponse>;
    /**
     * 移除群成员
     * @see https://developers.dingtalk.com/document/isvapp/remove-a-connected-group-member
     */
    removeGroupMember(
      params: RemoveGroupMemberParams,
    ): Promise<RemoveGroupMemberResponse>;
    /**
     * 添加群成员
     * @see https://developers.dingtalk.com/document/isvapp/add-group-members
     */
    addGroupMember(
      params: AddGroupMemberParams,
    ): Promise<AddGroupMemberResponse>;
    /**
     * 创建互通群（支持普通互通群、跨钉两人群）
     * @see https://developers.dingtalk.com/document/isvapp/create-a-common-group-or-cross-nail-group
     */
    createGroupConversation(
      params: CreateGroupConversationParams,
    ): Promise<CreateGroupConversationResponse>;
    /**
     * 发送ToC消息
     * @see https://developers.dingtalk.com/document/isvapp/dingtalk-users-send-messages-to-the-group-or-dingtalk-users
     */
    sendDingMessage(
      params: SendDingMessageParams,
    ): Promise<SendDingMessageResponse>;
    /**
     * 创建ToB会话地址
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-session-address
     */
    getConversationUrl(
      params: GetConversationUrlParams,
    ): Promise<GetConversationUrlResponse>;
    /**
     * 创建钉外账号
     * @see https://developers.dingtalk.com/document/isvapp/create-bc-account-association
     */
    createInterconnection(
      params: CreateInterconnectionParams,
    ): Promise<CreateInterconnectionResponse>;
    /**
     * 人与人会话中机器人发送互动卡片
     * @see https://developers.dingtalk.com/document/orgapp/send-dingtalk-interactive-cards-to-person-to-person-chat-sessions
     */
    sendOTOInteractiveCard(
      params: SendOTOInteractiveCardParams,
    ): Promise<SendOTOInteractiveCardResponse>;
    /**
     * 关闭互动卡片吊顶
     * @see https://developers.dingtalk.com/document/orgapp/close-interactive-card-ceiling
     */
    closeTopbox(params: CloseTopboxParams): Promise<CloseTopboxResponse>;
    /**
     * 创建并开启互动卡片吊顶
     * @see https://developers.dingtalk.com/document/orgapp/create-and-open-an-interactive-card-ceiling
     */
    createTopbox(params: CreateTopboxParams): Promise<CreateTopboxResponse>;
  }
}
