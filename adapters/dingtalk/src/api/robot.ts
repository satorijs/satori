import { Internal } from '../internal'
// GENERATED CONTENT

export interface GetBotListInGroupParams {
  /** 群ID： */
  openConversationId: string
}

export interface GetBotListInGroupResponse {
  chatbotInstanceVOList?: {
    robotCode?: string
    name?: string
    downloadIconURL?: string
    openRobotType?: number
  }[]
}

export interface RobotMessageFileDownloadParams {
  /** 用户向机器人发送文件消息后，机器人回调给开发者消息中的下载码。 */
  downloadCode: string
  /** 机器人的编码： */
  robotCode: string
}

export interface RobotMessageFileDownloadResponse {
  downloadUrl: string
}

export interface ClearRobotPluginParams {
  /** 机器人的编码，参见[机器人名词表-robotCode](https://open.dingtalk.com/document/orgapp/robot-overview#title-ed9-e7b-epe)内容，获取`robotCode`。 */
  robotCode: string
}

export interface ClearRobotPluginResponse {
  result?: unknown
}

export interface SetRobotPluginParams {
  /** 机器人的编码，参见[机器人名词表-robotCode](https://open.dingtalk.com/document/orgapp/robot-overview#title-ed9-e7b-epe)内容，获取`robotCode`。 */
  robotCode?: string
  /** 插件信息。 */
  pluginInfoList?: object[]
}

export interface SetRobotPluginResponse {
  result?: unknown
}

export interface QueryRobotPluginParams {
  /** 机器人的编码，参见[机器人名词表-robotCode](https://open.dingtalk.com/document/orgapp/robot-overview#title-ed9-e7b-epe)内容，获取`robotCode`。 */
  robotCode: string
}

export interface QueryRobotPluginResponse {
  pluginInfoList?: {
    name?: string
    icon?: string
    pcUrl?: string
    mobileUrl?: string
  }[]
}

export interface OrgGroupRecallParams {
  /** 开放的群ID。 */
  openConversationId: string
  /** 机器人的编码。 */
  robotCode: string
  processQueryKeys: string[]
}

export interface OrgGroupRecallResponse {
  successResult: string[]
  failedResult: unknown
}

export interface OrgGroupQueryParams {
  /** 开放的群id。 */
  openConversationId?: string
  /** 机器人的robotCode。 */
  robotCode?: string
  /** 机器人在群内安装后，群内机器人的webhook属性中中的access_token部分的值。 */
  token?: string
  /** 发送消息返回的加密消息id。 */
  processQueryKey: string
  /** 分页查询每页的数量。 */
  maxResults?: number
  /** 一次查询后返回的加密的分页凭证，首次查询不填。 */
  nextToken?: string
}

export interface OrgGroupQueryResponse {
  sendStatus?: string
  readUserIds?: string[]
  nextToken?: string
  hasMore?: unknown
}

export interface OrgGroupSendParams {
  /** 消息模板参数。 */
  msgParam: string
  /** 消息模板key。 */
  msgKey: string
  /** 群id： */
  openConversationId?: string
  /** 机器人的编码。 */
  robotCode?: string
  /** 机器人在群内安装后，群内机器人的webhook属性中中的`access_token`的参数值。 */
  token?: string
  /** 群聊酷应用编码。 */
  coolAppCode?: string
}

export interface OrgGroupSendResponse {
  processQueryKey: string
}

export interface BatchRecallOTOParams {
  /** 机器人的编码。 */
  robotCode: string
  processQueryKeys: string[]
}

export interface BatchRecallOTOResponse {
  successResult?: string[]
  failedResult?: unknown
}

export interface BatchOTOQueryQuery {
  /** - 企业内部开发-机器人，此处为企业自建应用的appKey。 */
  robotCode: string
  /** 加密的消息id，可通过调用[发送批量单聊信息](https://open.dingtalk.com/document/group/chatbots-send-one-on-one-chat-messages-in-batches)接口获取。 */
  processQueryKey: string
}

export interface BatchOTOQueryResponse {
  sendStatus?: string
  messageReadInfoList?: {
    name: string
    userId: string
    readStatus: string
    readTimestamp: number
  }[]
}

export interface BatchSendOTOParams {
  /** 机器人的编码。 */
  robotCode: string
  /** 用户的userid。 */
  userIds: string[]
  /** 消息的msgKey。 */
  msgKey: string
  /** 消息体。 */
  msgParam: string
}

export interface BatchSendOTOResponse {
  processQueryKey?: string
  invalidStaffIdList?: string[]
  flowControlledStaffIdList?: string[]
}

export interface PrivateChatSendParams {
  /** 消息体。 */
  msgParam: string
  /** 消息类型的key。 */
  msgKey: string
  /** 会话ID。 */
  openConversationId?: string
  /** 机器人编码。 */
  robotCode?: string
  /** 酷应用的code。 */
  coolAppCode?: string
}

export interface PrivateChatSendResponse {
  processQueryKey: string
}

export interface PrivateChatQueryParams {
  /** 人与人单聊开放会话ID： */
  openConversationId?: string
  /** 机器人的编码，参见[机器人名词表-robotCode](https://open.dingtalk.com/document/group/robot-overview)内容，获取`robotCode`。 */
  robotCode?: string
  /** 发送消息返回的加密消息id */
  processQueryKey: string
  /** 分页查询每页的数量 */
  maxResults?: number
  /** 一次查询后返回的加密的分页凭证，首次查询不填 */
  nextToken?: string
}

export interface PrivateChatQueryResponse {
  sendStatus?: string
  readUserIds?: string[]
  nextToken?: string
  hasMore?: unknown
}

export interface BatchRecallPrivateChatParams {
  /** 人与人单聊开放会话ID： */
  openConversationId: string
  /** 机器人的编码，参见[机器人名词表-robotCode](https://open.dingtalk.com/document/group/robot-overview)内容，获取`robotCode`。 */
  robotCode: string
  /** 消息id */
  processQueryKeys: string[]
}

export interface BatchRecallPrivateChatResponse {
  successResult: string[]
  failedResult: unknown
}

// funcName: isOldApi
Internal.define({
  '/robot/groups/robots/query': { POST: { getBotListInGroup: false } },
  '/robot/messageFiles/download': { POST: { robotMessageFileDownload: false } },
  '/robot/plugins/clear': { POST: { clearRobotPlugin: false } },
  '/robot/plugins/set': { POST: { setRobotPlugin: false } },
  '/robot/plugins/query': { POST: { queryRobotPlugin: false } },
  '/robot/groupMessages/recall': { POST: { orgGroupRecall: false } },
  '/robot/groupMessages/query': { POST: { orgGroupQuery: false } },
  '/robot/groupMessages/send': { POST: { orgGroupSend: false } },
  '/robot/otoMessages/batchRecall': { POST: { batchRecallOTO: false } },
  '/robot/oToMessages/readStatus': { GET: { batchOTOQuery: false } },
  '/robot/oToMessages/batchSend': { POST: { batchSendOTO: false } },
  '/robot/privateChatMessages/send': { POST: { privateChatSend: false } },
  '/robot/privateChatMessages/query': { POST: { privateChatQuery: false } },
  '/robot/privateChatMessages/batchRecall': {
    POST: { batchRecallPrivateChat: false },
  },
})
declare module '../internal' {
  interface Internal {
    /**
     * 查询群内的机器人列表
     * @see https://developers.dingtalk.com/document/orgapp/obtain-the-list-of-robots-in-the-group
     */
    getBotListInGroup(
      params: GetBotListInGroupParams,
    ): Promise<GetBotListInGroupResponse>
    /**
     * 获取机器人消息中文件下载链接
     * @see https://developers.dingtalk.com/document/isvapp/download-the-file-content-of-the-robot-receiving-message
     */
    robotMessageFileDownload(
      params: RobotMessageFileDownloadParams,
    ): Promise<RobotMessageFileDownloadResponse>
    /**
     * 清空单聊机器人快捷入口
     * @see https://developers.dingtalk.com/document/orgapp/clear-single-chat-robot-quick-entry
     */
    clearRobotPlugin(
      params: ClearRobotPluginParams,
    ): Promise<ClearRobotPluginResponse>
    /**
     * 设置单聊机器人快捷入口
     * @see https://developers.dingtalk.com/document/orgapp/set-robot-quick-entrance
     */
    setRobotPlugin(
      params: SetRobotPluginParams,
    ): Promise<SetRobotPluginResponse>
    /**
     * 查询单聊机器人快捷入口
     * @see https://developers.dingtalk.com/document/orgapp/quick-entrance-of-inquiry-single-chat-robot
     */
    queryRobotPlugin(
      params: QueryRobotPluginParams,
    ): Promise<QueryRobotPluginResponse>
    /**
     * 企业机器人撤回内部群消息
     * @see https://developers.dingtalk.com/document/orgapp/enterprise-chatbot-withdraws-internal-group-messages
     */
    orgGroupRecall(
      params: OrgGroupRecallParams,
    ): Promise<OrgGroupRecallResponse>
    /**
     * 查询企业机器人群聊消息用户已读状态
     * @see https://developers.dingtalk.com/document/orgapp/chatbot-queries-the-read-status-of-a-message
     */
    orgGroupQuery(params: OrgGroupQueryParams): Promise<OrgGroupQueryResponse>
    /**
     * 机器人发送群聊消息
     * @see https://developers.dingtalk.com/document/orgapp/the-robot-sends-a-group-message
     */
    orgGroupSend(params: OrgGroupSendParams): Promise<OrgGroupSendResponse>
    /**
     * 批量撤回人与机器人会话中机器人消息
     * @see https://developers.dingtalk.com/document/orgapp/batch-message-recall-chat
     */
    batchRecallOTO(
      params: BatchRecallOTOParams,
    ): Promise<BatchRecallOTOResponse>
    /**
     * 批量查询人与机器人会话机器人消息是否已读
     * @see https://developers.dingtalk.com/document/orgapp/chatbot-batch-query-the-read-status-of-messages
     */
    batchOTOQuery(query: BatchOTOQueryQuery): Promise<BatchOTOQueryResponse>
    /**
     * 批量发送人与机器人会话中机器人消息
     * @see https://developers.dingtalk.com/document/orgapp/chatbots-send-one-on-one-chat-messages-in-batches
     */
    batchSendOTO(params: BatchSendOTOParams): Promise<BatchSendOTOResponse>
    /**
     * 人与人会话中机器人发送普通消息
     * @see https://developers.dingtalk.com/document/orgapp/the-robot-sends-ordinary-messages-in-a-person-to-person-conversation
     */
    privateChatSend(
      params: PrivateChatSendParams,
    ): Promise<PrivateChatSendResponse>
    /**
     * 查询人与人会话中机器人已读消息
     * @see https://developers.dingtalk.com/document/orgapp/query-the-read-list-of-robot-messages-in-person-to-person-conversations
     */
    privateChatQuery(
      params: PrivateChatQueryParams,
    ): Promise<PrivateChatQueryResponse>
    /**
     * 批量撤回人与人会话中机器人消息
     * @see https://developers.dingtalk.com/document/orgapp/batch-withdrawal-of-single-chat-robot-messages-in-person-to-person-conversations
     */
    batchRecallPrivateChat(
      params: BatchRecallPrivateChatParams,
    ): Promise<BatchRecallPrivateChatResponse>
  }
}
