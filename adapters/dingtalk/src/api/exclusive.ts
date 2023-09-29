import { Internal } from '../internal'
// GENERATED CONTENT

export interface QueryUserBehaviorParams {
  /** 用户行为： */
  type: number
  /** 端类型： */
  platform: number
  /** 开始时间，时间戳，单位毫秒。 */
  startTime?: number
  /** 结束时间，时间戳，单位毫秒。 */
  endTime?: number
  /** 分页大小。 */
  pageSize: number
  /** 起始页。 */
  pageNumber: number
  /** 用户userId信息，可调用[获取部门用户userId列表](https://open.dingtalk.com/document/orgapp/query-the-list-of-department-userids)接口获取userId。 */
  userId?: string
}

export interface QueryUserBehaviorResponse {
  data?: {
    userName?: string
    time?: number
    type?: number
    pictureUrl?: string
    platform?: number
    scene?: string
    userId?: string
  }[]
  totalCnt?: number
  dataCnt?: number
}

export interface GetPublicDevicesQuery {
  /** 系统： */
  platform?: string
  /** 注册或申请的开始时间，单位毫秒。 */
  startTime?: number
  /** 注册或申请截止时间，单位毫秒。 */
  endTime?: number
  /** 单页返回的数据条数。 */
  pageSize?: number
  /** 页码。 */
  pageNumber?: number
  /** 设备标题。 */
  title?: string
  /** 设备mac地址。 */
  macAddress?: string
}

export interface GetPublicDevicesResponse {
  totalCnt?: number
  dataCnt?: number
  data?: {
    gmtCreate?: number
    gmtModified?: number
    title?: string
    macAddress?: string
    platform?: string
    deviceScopeType?: number
    deviceStaffs?: number
    deviceDepts?: number
    deviceRoles?: number
  }[]
}

export interface SendPhoneDingParams {
  /** 接收DING消息的用户userId列表，最大值20。 */
  userids: string[]
  /** 消息内容。 */
  content: string
}

export interface SendPhoneDingResponse {
  success?: unknown
}

export interface QueryPartnerInfoResponse {
  partnerDeptList?: {
    title: string
    value: string
    memberCount: number
    partnerNum?: string
    partnerLabelModelLevel1?: number
  }[]
  partnerLabelList?: {
    id?: number
    name?: string
  }[]
  userId?: string
}

export interface GetConfBaseInfoByLogicalIdQuery {
  /** 会议逻辑ID。 */
  logicalConferenceId: string
}

export interface GetConfBaseInfoByLogicalIdResponse {
  conferenceId?: string
  title?: string
  startTime?: number
  logicalConferenceId?: string
  unionId?: string
  nickname?: string
}

export interface CreateTrustedDeviceBatchParams {
  /** 员工userid，为0时表示这个设备为公共设备 */
  userId: string
  /** 操作端。 */
  platform: string
  /** 设备的Mac地址。 */
  macAddressList: string[]
}

export interface CreateTrustedDeviceBatchResponse {
  result?: unknown
}

export interface ListAuditLogQuery {
  /** 操作日志起始时间，UNIX时间戳，单位毫秒。 */
  startDate: number
  /** 操作日志截止时间，UNIX时间戳，单位毫秒。 */
  endDate: number
  /** 每页最大条目数，最大值500。 */
  pageSize: number
  /** 操作记录生成时间，UNIX时间戳，单位毫秒，作为分页偏移量。 */
  nextGmtCreate?: number
  /** 操作记录文件id，作为分页偏移量。 */
  nextBizId?: number
}

export interface ListAuditLogResponse {
  list?: {
    operatorName?: string
    platform?: number
    platformView?: string
    status?: number
    action?: number
    actionView?: string
    resource?: string
    gmtCreate?: number
    userId?: string
    ipAddress?: string
    orgName?: string
    receiverName?: string
    receiverTypeView?: string
    receiverType?: number
    resourceExtension?: string
    resourceSize?: number
    targetSpaceId?: number
    realName?: string
    bizId?: string
    operateModuleView?: string
    operateModule?: number
    gmtModified?: number
    docMemberList?: number
    docReceiverList?: number
    workSpaceName?: string
    workSpacePcUrl?: string
    workSpaceMobileUrl?: string
    docPcUrl?: string
    docMobileUrl?: string
    workSpaceId?: number
  }[]
}

export interface BanOrOpenGroupWordsParams {
  /** 群ID，获取方式如下 */
  openConverationId: string
  /** 操作类型。 */
  banWordsType: number
}

export interface BanOrOpenGroupWordsResponse {
  code?: string
  cause?: string
}

export interface GetSignedDetailByPageQuery {
  /** 页码，首次传1。 */
  pageNumber: number
  /** 签署状态。 */
  signStatus: number
  /** 每页数量，最大值2000。 */
  pageSize: number
}

export interface GetSignedDetailByPageResponse {
  auditSignedDetailDTOList?: {
    name?: string
    staffId?: string
    title?: string
    phone?: string
    email?: string
    deptName?: string
    roles?: string
  }[]
  currentPage?: number
  pageSize?: number
  total?: number
}

export interface PublishFileChangeNoticeParams {
  /** 钉盘文件ID。可以调用[查询文件列表](https://open.dingtalk.com/document/orgapp-server/obtain-the-file-list)接口获取。 */
  fileId: string
  /** 钉盘空间ID，可调用[获取空间列表](https://open.dingtalk.com/document/orgapp-server/queries-a-space-list)接口获取。 */
  spaceId: string
  /** 操作人的unionId，可通过以下两种方式获取： */
  operatorUnionId: string
  /** 操作类型，取值： */
  operateType?: string
}

export interface SendAppDingParams {
  /** 接收DING消息的用户userid列表。 */
  userids: string[]
  /** 消息内容。 */
  content: string
}

export interface GetPartnerTypeByParentIdResponse {
  data: {
    typeId: number
    typeName: string
    labelId: string
  }[]
}

export interface SetDeptPartnerTypeAndNumParams {
  /** 部门ID。 */
  deptId: string
  /** 伙伴编码。 */
  partnerNum?: string
  /** 伙伴类型ID。 */
  labelIds?: string[]
}

export interface GetAllLabelableDeptsResponse {
  data: {
    deptId: string
    superDeptId: string
    deptName: string
    memberCount: number
    partnerNum: string
    partnerLabelVOLevel1: number
    partnerLabelVOLevel2: number
    partnerLabelVOLevel3: number
    partnerLabelVOLevel4: number
    partnerLabelVOLevel5: number
  }[]
}

// funcName: isOldApi
Internal.define({
  '/exclusive/enterpriseSecurities/userBehaviors/screenshots/query': {
    POST: { queryUserBehavior: false },
  },
  '/exclusive/trusts/publicDevices': { GET: { getPublicDevices: false } },
  '/exclusive/phoneDings/send': { POST: { sendPhoneDing: false } },
  '/exclusive/partners/users/{userId}': { GET: { queryPartnerInfo: false } },
  '/exclusive/data/conferences': { GET: { getConfBaseInfoByLogicalId: false } },
  '/exclusive/trusts/devices': { POST: { createTrustedDeviceBatch: false } },
  '/exclusive/fileAuditLogs': { GET: { listAuditLog: false } },
  '/exclusive/enterpriseSecurities/banOrOpenGroupWords': {
    PUT: { banOrOpenGroupWords: false },
  },
  '/exclusive/audits/users': { GET: { getSignedDetailByPage: false } },
  '/exclusive/comments/send': { POST: { publishFileChangeNotice: false } },
  '/exclusive/appDings/send': { POST: { sendAppDing: false } },
  '/exclusive/partnerLabels/{parentId}': {
    GET: { getPartnerTypeByParentId: false },
  },
  '/exclusive/partnerDepartments': {
    POST: { setDeptPartnerTypeAndNum: false },
    GET: { getAllLabelableDepts: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 获取用户截屏操作记录
     * @see https://developers.dingtalk.com/document/app/obtain-anti-screen-capture-operation-records
     */
    queryUserBehavior(
      params: QueryUserBehaviorParams,
    ): Promise<QueryUserBehaviorResponse>
    /**
     * 获取公共设备列表。
     * @see https://developers.dingtalk.com/document/orgapp/query-public-equipment
     */
    getPublicDevices(
      query: GetPublicDevicesQuery,
    ): Promise<GetPublicDevicesResponse>
    /**
     * 通过接口发送电话DING
     * @see https://developers.dingtalk.com/document/orgapp/outgoing-phone-ding
     */
    sendPhoneDing(params: SendPhoneDingParams): Promise<SendPhoneDingResponse>
    /**
     * 根据userId查询人员的标签信息
     * @see https://developers.dingtalk.com/document/isvapp/you-can-call-this-operation-to-retrieve-the-user-tag
     */
    queryPartnerInfo(userId: string): Promise<QueryPartnerInfoResponse>
    /**
     * 根据会议逻辑ID查询会议基本信息
     * @see https://developers.dingtalk.com/document/isvapp/you-can-call-this-operation-to-query-the-basic-information
     */
    getConfBaseInfoByLogicalId(
      query: GetConfBaseInfoByLogicalIdQuery,
    ): Promise<GetConfBaseInfoByLogicalIdResponse>
    /**
     * 批量新增可信设备
     * @see https://developers.dingtalk.com/document/isvapp/add-trusted-devices-in-batches
     */
    createTrustedDeviceBatch(
      params: CreateTrustedDeviceBatchParams,
    ): Promise<CreateTrustedDeviceBatchResponse>
    /**
     * 获取企业文件审计日志
     * @see https://developers.dingtalk.com/document/app/queries-file-audit-logs
     */
    listAuditLog(query: ListAuditLogQuery): Promise<ListAuditLogResponse>
    /**
     * 群禁言或解禁
     * @see https://developers.dingtalk.com/document/isvapp/exclusive-dingtalk-group-ban
     */
    banOrOpenGroupWords(
      params: BanOrOpenGroupWordsParams,
    ): Promise<BanOrOpenGroupWordsResponse>
    /**
     * 获取审计协议签署人员信息
     * @see https://developers.dingtalk.com/document/isvapp/obtains-the-information-about-the-persons-who-sign-the-audit
     */
    getSignedDetailByPage(
      query: GetSignedDetailByPageQuery,
    ): Promise<GetSignedDetailByPageResponse>
    /**
     * 发送文件更改的评论
     * @see https://developers.dingtalk.com/document/isvapp/send-comments-on-file-changes
     */
    publishFileChangeNotice(
      params: PublishFileChangeNoticeParams,
    ): Promise<void>
    /**
     * 通过接口发送应用内DING
     * @see https://developers.dingtalk.com/document/orgapp/send-in-application-ding
     */
    sendAppDing(params: SendAppDingParams): Promise<void>
    /**
     * 伙伴钉根据父标签查询子标签
     * @see https://developers.dingtalk.com/document/isvapp/obtain-child-tags-from-a-parent-tag
     */
    getPartnerTypeByParentId(
      parentId: string,
    ): Promise<GetPartnerTypeByParentIdResponse>
    /**
     * 设置部门伙伴类型和伙伴编码
     * @see https://developers.dingtalk.com/document/isvapp/set-department-partner-type-and-partner-code
     */
    setDeptPartnerTypeAndNum(
      params: SetDeptPartnerTypeAndNumParams,
    ): Promise<void>
    /**
     * 获取可打标部门列表
     * @see https://developers.dingtalk.com/document/isvapp/obtains-a-list-of-departments-that-can-be-marked
     */
    getAllLabelableDepts(): Promise<GetAllLabelableDeptsResponse>
  }
}
