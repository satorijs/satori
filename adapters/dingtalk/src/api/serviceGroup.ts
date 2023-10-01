import { Internal } from '../internal'
// GENERATED CONTENT

export interface AddMemberToServiceGroupParams {
  /** 开放团队ID。如下图所示，查看**ID信息**内的**团队ID**值。 */
  openTeamId: string
  /** 服务群openConversionId，调用[创建场景服务群](https://open.dingtalk.com/document/orgapp-server/create-a-scenario-service-group)接口获取openConversationId参数值。 */
  openConversationId: string
  /** 待添加员工在钉钉组织内的的userId列表，最大值100。 */
  userIds: string[]
}

export interface AddMemberToServiceGroupResponse {
  success?: unknown
}

export interface SendMsgByTaskParams {
  /** 团队ID。 */
  openTeamId: string
  /** 群发任务名称。 */
  taskName: string
  /** 群发内容。 */
  messageContent: unknown
  /** 查询条件。 */
  queryGroup: unknown
  /** 发送配置。 */
  sendConfig: unknown
}

export interface SendMsgByTaskResponse {
  openBatchTaskId?: string
}

export interface UpgradeNormalGroupParams {
  /** 升级的目标群组ID。 */
  openGroupSetId?: string
  /** 升级的目标群模板ID。 */
  templateId?: string
  /** 群ID。 */
  openConversationId: string
  /** 升级的目标团队ID。 */
  openTeamId?: string
}

export interface UpgradeCloudGroupParams {
  /** 群ID。 */
  openConversationId: string
  /** 升级的目标群模板ID。 */
  templateId?: string
  /** 升级的目标群组ID。 */
  openGroupSetId?: string
  /** 智能云客服租户ID。 */
  ccsInstanceId: string
  /** 升级的目标团队ID。 */
  openTeamId?: string
}

export interface QueryActiveUsersQuery {
  /** 开放团队ID。 */
  openTeamId?: string
  /** 群ID。 */
  openConversationId: string
  /** 活跃度排名topN，如top5，最多支持top100 */
  topN?: number
}

export interface QueryActiveUsersResponse {
  activeUserInfos: {
    unionId: string
    nickName: string
    actionIndexL7d: number
    actionIndexL14d: number
    actionIndexL30d: number
    activeScore: number
    ranking: number
  }[]
}

export interface SendServiceGroupMessageParams {
  /** 开放群ID。 */
  targetOpenConversationId: string
  /** 标题。 */
  title: string
  /** 消息内容。 */
  content: string
  /** 是否 at所有人 */
  isAtAll?: unknown
  /** 被@人的手机号列表。 */
  atMobiles?: string[]
  /** 被@人的dingtalkId列表。 */
  atDingtalkIds?: string[]
  /** 被@人的unionId列表。 */
  atUnionIds?: string[]
  /** 手机号接收者列表。 */
  receiverMobiles?: string[]
  /** dingtalkId接收者列表。 */
  receiverDingtalkIds?: string[]
  /** unionId接收者列表。 */
  receiverUnionIds?: string[]
  /** 消息类型，取值。 */
  messageType: string
  /** 排列方式。 */
  btnOrientation?: string
  /** actionCard按钮。 */
  btns?: object[]
  /** 消息内容是否含有链接。 */
  hasContentLinks?: unknown
}

export interface SendServiceGroupMessageResponse {
  openMsgTaskId: string
}

export interface ServiceGroupCreateGroupParams {
  /** 业务关联ID，自定义参数值。 */
  groupBizId?: string
  /** 开放团队ID。 */
  openTeamId: string
  /** 开放群组ID。 */
  openGroupSetId: string
  /** 群名称。 */
  groupName: string
  /** 群主员工userid。 */
  ownerStaffId: string
  /** 群成员员工ID列表，最大值20。 */
  memberStaffIds?: string[]
  /** 群标签。 */
  groupTagNames?: string[]
}

export interface ServiceGroupCreateGroupResponse {
  openConversationId: string
  groupUrl: string
}

export interface ServiceGroupUpdateGroupSetParams {
  /** 开放团队ID。 */
  openTeamId?: string
  /** 开放群ID，可调用[创建服务群](https://open.dingtalk.com/document/orgapp-server/create-a-scenario-service-group)接口获取openConversationId参数值。 */
  openConversationId?: string
  /** 开放群组ID。 */
  openGroupSetId?: string
}

export interface ServiceGroupUpdateGroupSetResponse {
  success?: unknown
}

// funcName: isOldApi
Internal.define({
  '/serviceGroup/groups/members': { POST: { addMemberToServiceGroup: false } },
  '/serviceGroup/messages/tasks/send': { POST: { sendMsgByTask: false } },
  '/serviceGroup/normalGroups/upgrade': { POST: { upgradeNormalGroup: false } },
  '/serviceGroup/cloudGroups/upgrade': { POST: { upgradeCloudGroup: false } },
  '/serviceGroup/groups/queryActiveUsers': { GET: { queryActiveUsers: false } },
  '/serviceGroup/messages/send': { POST: { sendServiceGroupMessage: false } },
  '/serviceGroup/groups': { POST: { serviceGroupCreateGroup: false } },
  '/serviceGroup/groups/configurations': {
    PUT: { serviceGroupUpdateGroupSet: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 添加服务群成员
     * @see https://open.dingtalk.com/document/orgapp/add-service-group-members
     */
    addMemberToServiceGroup(
      params: AddMemberToServiceGroupParams,
    ): Promise<AddMemberToServiceGroupResponse>
    /**
     * 服务群发任务
     * @see https://open.dingtalk.com/document/orgapp/service-group-sending-task-interface
     */
    sendMsgByTask(params: SendMsgByTaskParams): Promise<SendMsgByTaskResponse>
    /**
     * 升级普通群为服务群
     * @see https://open.dingtalk.com/document/orgapp/a-dingtalk-group-is-upgraded-to-one-of-the-intelligent
     */
    upgradeNormalGroup(params: UpgradeNormalGroupParams): Promise<void>
    /**
     * 升级云客服服务群为钉钉智能服务群
     * @see https://open.dingtalk.com/document/orgapp/upgraded-the-cloud-customer-service-group-to-the-dingtalk-intelligent
     */
    upgradeCloudGroup(params: UpgradeCloudGroupParams): Promise<void>
    /**
     * 查询服务群活跃成员
     * @see https://open.dingtalk.com/document/orgapp/queries-active-service-users
     */
    queryActiveUsers(
      query: QueryActiveUsersQuery,
    ): Promise<QueryActiveUsersResponse>
    /**
     * 服务群发消息
     * @see https://open.dingtalk.com/document/orgapp/service-group-message-sending-interface
     */
    sendServiceGroupMessage(
      params: SendServiceGroupMessageParams,
    ): Promise<SendServiceGroupMessageResponse>
    /**
     * 创建服务群
     * @see https://open.dingtalk.com/document/orgapp/create-a-scenario-service-group
     */
    serviceGroupCreateGroup(
      params: ServiceGroupCreateGroupParams,
    ): Promise<ServiceGroupCreateGroupResponse>
    /**
     * 更换服务群所在的群分组
     * @see https://open.dingtalk.com/document/isvapp/modify-a-service-group
     */
    serviceGroupUpdateGroupSet(
      params: ServiceGroupUpdateGroupSetParams,
    ): Promise<ServiceGroupUpdateGroupSetResponse>
  }
}
