import { Internal } from '../internal'
// GENERATED CONTENT

export interface QueryGlobalInfoQuery {
  /** 用户 userId */
  userId: string
}

export interface QueryGlobalInfoResponse {
  result?: {
    oemEnable?: number
  }
}

export interface BatchUpdateFollowRecordsParams {
  /** 操作人userId。 */
  operatorUserId: string
  /** 更新的跟进记录数据信息。 */
  instanceList: object[]
}

export interface BatchUpdateFollowRecordsResponse {
  results?: {
    success?: number
    errorCode?: string
    errorMsg?: string
    instanceId?: string
  }[]
}

export interface BatchAddFollowRecordsParams {
  /** 操作人userId。 */
  operatorUserId: string
  /** 跟进记录数据字段列表，最大值40。 */
  instanceList: object[]
}

export interface BatchAddFollowRecordsResponse {
  results?: {
    success?: number
    errorCode?: string
    errorMsg?: string
    instanceId?: string
  }[]
}

export interface BatchRemoveFollowRecordsParams {
  /** 操作人userId。 */
  operatorUserId: string
  /** 跟进记录ID。 */
  instanceIds: string[]
}

export interface BatchRemoveFollowRecordsResponse {
  results?: {
    success?: number
    errorCode?: string
    errorMsg?: string
    instanceId?: string
  }[]
}

export interface DeleteCrmCustomObjectDataQuery {
  /** 自定义对象表单code。 */
  formCode: string
}

export interface DeleteCrmCustomObjectDataResponse {
  instanceId: string
}

export interface BatchUpdateContactsParams {
  /** 操作人userId。 */
  operatorUserId: string
  /** 联系人数据列表，最大值10。 */
  relationList: object[]
}

export interface BatchUpdateContactsResponse {
  results?: {
    success?: number
    errorCode?: string
    errorMsg?: string
    relationId?: string
  }[]
}

export interface BatchAddContactsParams {
  /** 操作人userId。 */
  operatorUserId: string
  /** 联系人数据列表，最大值10。 */
  relationList: object[]
}

export interface BatchAddContactsResponse {
  results?: {
    success?: number
    errorCode?: string
    errorMsg?: string
    relationId?: string
  }[]
}

export interface BatchAddRelationDatasParams {
  /** 客户类型。 */
  relationType: string
  /** 操作人userId。 */
  operatorUserId: string
  /** 是否跳过查重，默认不跳过。 */
  skipDuplicateCheck?: unknown
  /** 新增客户关系列表，最大值10。 */
  relationList: object[]
}

export interface BatchAddRelationDatasResponse {
  results?: {
    success?: number
    errorCode?: string
    errorMsg?: string
    relationId?: string
    duplicatedRelationIds?: number
  }[]
}

export interface BatchUpdateRelationDatasParams {
  /** 客户类型。 */
  relationType: string
  /** 操作人userId。 */
  operatorUserId: string
  /** 是否跳过查重，默认不跳过。 */
  skipDuplicateCheck?: unknown
  /** 更新的客户数据列表，最大值10。 */
  relationList: object[]
}

export interface BatchUpdateRelationDatasResponse {
  results?: {
    success?: number
    errorCode?: string
    errorMsg?: string
    relationId?: string
    duplicatedRelationIds?: number
  }[]
}

export interface GetRelationUkSettingQuery {
  /** 客户类型。 */
  relationType: string
}

export interface GetRelationUkSettingResponse {
  result?: {
    fieldId: string
    bizAlias?: string
  }[]
}

export interface CrmCreateGroupParams {
  /** 群名称。 */
  groupName: string
  /** 群主userId。 */
  ownerUserId: string
  /** 群成员userId。 */
  memberUserIds?: string
  /** 关系类型。 */
  relationType: string
}

export interface CrmCreateGroupResponse {
  openConversationId: string
}

export interface GetCrmGroupChatMultiParams {
  /** 客户群openConversationId。 */
  openConversationIds?: string[]
}

export interface GetCrmGroupChatMultiResponse {
  result?: {
    openConversationId?: string
    openGroupSetId?: string
    ownerUserId?: string
    ownerUserName?: string
    name?: string
    memberCount?: number
    gmtCreate?: number
    iconUrl?: string
  }[]
}

export interface GetCrmGroupChatSingleQuery {
  /** 客户群openConversationId。 */
  openConversationId: string
}

export interface GetCrmGroupChatSingleResponse {
  openConversationId?: string
  openGroupSetId?: string
  ownerUserId?: string
  ownerUserName?: string
  name?: string
  memberCount?: number
  gmtCreate?: number
  iconUrl?: string
}

export interface QueryRelationDatasByTargetIdQuery {
  /** 关系类型。 */
  relationType: string
}

export interface QueryRelationDatasByTargetIdResponse {
  relations: {
    relationId: string
    relationType: string
    bizDataList: number
    openConversationIds: number
  }[]
}

export interface QueryCrmGroupChatsQuery {
  /** 关系类型。 */
  relationType: string
  /** 分页游标。 */
  nextToken?: string
  /** 每页最大条目数，最大值100。 */
  maxResults: number
  /** 查询DSL语法。 */
  queryDsl?: string
}

export interface QueryCrmGroupChatsResponse {
  resultList?: {
    openConversationId: string
    openGroupSetId?: string
    ownerUserId: string
    ownerUserName: string
    name: string
    memberCount: number
    gmtCreate: number
  }[]
  hasMore: unknown
  nextToken?: string
  totalCount?: number
}

export interface CrmUpdateGroupSetParams {
  /** 群组openGroupSetId，调用[查询客户群组列表](https://open.dingtalk.com/document/orgapp-server/query-groups)接口获取。 */
  openGroupSetId: string
  /** 群组名。 */
  name?: string
  /** 单个群的人数上限。 */
  memberQuota?: number
  /** 群主userId。 */
  ownerUserId?: string
  /** 群管理员userId列表，多个用逗号隔开，裂变出的新群会自动设置这些userId为群管理员。 */
  managerUserIds?: string
  /** 群公告文本。 */
  notice?: string
  /** 群公告是否置顶。 */
  noticeToped?: number
  /** 群模板Id。 */
  templateId?: string
  /** 新成员入群后收到的欢迎语。 */
  welcome?: string
}

export interface ListGroupSetQuery {
  /** 分页游标。 */
  nextToken?: string
  /** 每页条目数，最大值10。 */
  maxResults?: number
  /** 查询DSL。 */
  queryDsl?: string
  /** 关系类型。 */
  relationType: string
}

export interface ListGroupSetResponse {
  hasMore?: unknown
  nextToken?: string
  resultList: {
    name?: string
    openGroupSetId?: string
    relationType?: string
    memberQuota?: number
    memberCount?: number
    templateId?: string
    ownerUserId?: string
    managerUserIds?: string
    notice?: string
    noticeToped?: number
    owner: number
    manager: number
    lastOpenConversationId: string
    gmtCreate?: string
    gmtModified?: string
    groupChatCount?: number
  }[]
  totalCount?: number
}

export interface CreateGroupSetParams {
  /** 群组名。 */
  name: string
  /** 群主userId。 */
  ownerUserId: string
  /** 创建人userId。 */
  creatorUserId: string
  /** 群模板Id。 */
  templateId?: string
  /** 单个群的人数上限，最大值900。 */
  memberQuota?: number
  /** 群管理员userId列表，多个用逗号隔开。 */
  managerUserIds?: string
  /** 群公告文本。 */
  notice?: string
  /** 群公告是否置顶。 */
  noticeToped?: number
  /** 关系类型。 */
  relationType: string
  /** 新成员入群后收到的欢迎语。 */
  welcome?: string
}

export interface CreateGroupSetResponse {
  name?: string
  openGroupSetId?: string
  relationType?: string
  memberQuota?: number
  memberCount?: number
  templateId?: string
  ownerUserId?: string
  managerUserIds?: string
  notice?: string
  noticeToped?: number
  owner: {
    name?: string
    userId?: string
  }
  manager: {
    name?: string
    userId?: string
  }[]
  lastOpenConversationId: string
  gmtCreate?: string
  gmtModified?: string
  inviteLink?: string
}

export interface GetGroupSetQuery {
  /** 群组openGroupSetId。 */
  openGroupSetId: string
}

export interface GetGroupSetResponse {
  name?: string
  openGroupSetId?: string
  relationType?: string
  memberQuota?: number
  memberCount?: number
  templateId?: string
  ownerUserId?: string
  managerUserIds?: string
  notice?: string
  noticeToped?: number
  owner: {
    name?: string
    userId?: string
  }
  manager: {
    name?: string
    userId?: string
  }[]
  lastOpenConversationId?: string
  gmtCreate?: string
  gmtModified?: string
  groupChatCount?: number
  inviteLink?: string
}

export interface UpdateCrmPersonalCustomerParams {
  /** 客户数据ID。 */
  instanceId: string
  /** 操作人的用户userId。 */
  modifierUserId: string
  /** 操作人的用户昵称。 */
  modifierNick?: string
  /** 客户数据内容，JSON格式字符串。 */
  data: unknown
  /** 扩展数据。 */
  extendData?: unknown
  /** 权限。 */
  permission?: unknown
  /** 关系类型。 */
  relationType?: string
  /** 是否跳过查重字段。 */
  skipDuplicateCheck?: unknown
  /** 取值。 */
  action?: string
}

export interface UpdateCrmPersonalCustomerResponse {
  instanceId: string
}

export interface AddCrmPersonalCustomerParams {
  /** 记录创建人的用户userId。 */
  creatorUserId: string
  /** 记录创建人的昵称。 */
  creatorNick?: string
  /** 客户数据内容，JSON格式字符串。 */
  data: unknown
  /** 扩展数据内容。 */
  extendData?: unknown
  /** 权限。 */
  permission?: unknown
  /** 关系类型。 */
  relationType?: string
  /** 是否跳过查重字段，取值： */
  skipDuplicateCheck?: unknown
  /** 取值： */
  action?: string
}

export interface AddCrmPersonalCustomerResponse {
  instanceId: string
}

export interface DeleteCrmPersonalCustomerQuery {
  /** 关系类型。 */
  relationType?: string
  /** 操作人用户userId。 */
  currentOperatorUserId: string
}

export interface DeleteCrmPersonalCustomerResponse {
  instanceId: string
}

export interface DescribeCrmPersonalCustomerObjectMetaQuery {
  /** 关系类型。 */
  relationType?: string
}

export interface DescribeCrmPersonalCustomerObjectMetaResponse {
  name?: string
  customized?: unknown
  fields?: {
    name?: string
    customized?: number
    label?: string
    type?: string
    nillable?: number
    format?: string
    unit?: string
    selectOptions?: number
    quote?: number
    referenceTo?: string
    referenceFields?: number
    rollUpSummaryFields?: number
  }[]
  status?: string
  code?: string
}

export interface ListCrmPersonalCustomersQuery {
  /** 操作人的用户userId。 */
  currentOperatorUserId?: string
  /** 关系类型。 */
  relationType?: string
}

export interface ListCrmPersonalCustomersResponse {
  result: {
    instanceId: string
    objectType: string
    creatorUserId: string
    creatorNick: string
    data: number
    extendData: number
    permission: number
    appUuid: string
    formCode: string
    procOutResult: string
    procInstStatus: string
    gmtCreate: string
    gmtModified: string
  }[]
}

export interface QueryCrmPersonalCustomerQuery {
  /** 用户userid。 */
  currentOperatorUserId?: string
  /** 关系类型。 */
  relationType?: string
  /** 分页游标，获取下一页时传入上一页返回的nextToken。 */
  nextToken?: string
  /** 每页条数，最大值100。 */
  maxResults: number
  /** 查询条件。 */
  queryDsl?: string
}

export interface QueryCrmPersonalCustomerResponse {
  values?: {
    instanceId: string
    objectType: string
    creatorUserId: string
    creatorNick: string
    data: number
    extendData: number
    permission: number
    procOutResult: string
    procInstStatus: string
    gmtCreate: string
    gmtModified: string
  }[]
  hasMore?: unknown
  nextToken?: string
  maxResults?: number
  totalCount?: number
}

export interface QueryAllCustomerParams {
  /** 操作人员的userId。 */
  operatorUserId?: string
  /** 每页条目数，取值范围1~100。 */
  maxResults?: number
  /** 分页游标。 */
  nextToken?: string
  /** 数据类型，不传或者传null时，默认值为**crm_customer**，具体参数如下。 */
  objectType?: string
}

export interface QueryAllCustomerResponse {
  result?: {
    nextToken?: string
    values?: number
    maxResults?: number
  }
}

export interface SendOfficialAccountOTOMessageParams {
  /** 消息详情。 */
  detail: unknown
  /** 可选参数，API调用方标识，仅用于定制调用方场景。 */
  bizId?: string
  /** 服务窗账号id，默认不需要传此参数。 */
  accountId?: string
}

export interface SendOfficialAccountOTOMessageResponse {
  requestId?: string
  result: {
    openPushId: string
  }
}

export interface BatchSendOfficialAccountOTOMessageParams {
  /** 消息详情。 */
  detail: unknown
  /** 服务窗授权的调用方标识，可以为空。 */
  bizId?: string
  /** 账单id。 */
  accountId?: string
}

export interface BatchSendOfficialAccountOTOMessageResponse {
  result?: {
    openPushId: string
  }
  requestId?: string
}

// funcName: isOldApi
Internal.define({
  '/crm/globalInfos': { GET: { queryGlobalInfo: false } },
  '/crm/followRecords/batch': {
    PUT: { batchUpdateFollowRecords: false },
    POST: { batchAddFollowRecords: false },
  },
  '/crm/followRecords/batchRemove': {
    POST: { batchRemoveFollowRecords: false },
  },
  '/crm/customObjectDatas/instances/{instanceId}': {
    DELETE: { deleteCrmCustomObjectData: false },
  },
  '/crm/contacts/batch': {
    PUT: { batchUpdateContacts: false },
    POST: { batchAddContacts: false },
  },
  '/crm/relationDatas/batch': {
    POST: { batchAddRelationDatas: false },
    PUT: { batchUpdateRelationDatas: false },
  },
  '/crm/relationUkSettings': { GET: { getRelationUkSetting: false } },
  '/crm/groups': { POST: { crmCreateGroup: false } },
  '/crm/crmGroupChats/batchQuery': { POST: { getCrmGroupChatMulti: false } },
  '/crm/crmGroupChats/query': { POST: { getCrmGroupChatSingle: false } },
  '/crm/relations/datas/targets/{targetId}': {
    GET: { queryRelationDatasByTargetId: false },
  },
  '/crm/crmGroupChats': { GET: { queryCrmGroupChats: false } },
  '/crm/groupSets/set': { PUT: { crmUpdateGroupSet: false } },
  '/crm/groupSets/lists': { GET: { listGroupSet: false } },
  '/crm/groupSets': {
    POST: { createGroupSet: false },
    GET: { getGroupSet: false },
  },
  '/crm/personalCustomers': {
    PUT: { updateCrmPersonalCustomer: false },
    POST: { addCrmPersonalCustomer: false },
    GET: { queryCrmPersonalCustomer: false },
  },
  '/crm/personalCustomers/{dataId}': {
    DELETE: { deleteCrmPersonalCustomer: false },
  },
  '/crm/personalCustomers/objectMeta': {
    GET: { describeCrmPersonalCustomerObjectMeta: false },
  },
  '/crm/personalCustomers/batchQuery': {
    POST: { listCrmPersonalCustomers: false },
  },
  '/crm/customerInstances': { POST: { queryAllCustomer: false } },
  '/crm/officialAccounts/oToMessages/send': {
    POST: { sendOfficialAccountOTOMessage: false },
  },
  '/crm/officialAccounts/oToMessages/batchSend': {
    POST: { batchSendOfficialAccountOTOMessage: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 营销服融合三方全局信息
     * @see https://open.dingtalk.com/document/isvapp/get-customer-management-global-information
     */
    queryGlobalInfo(
      query: QueryGlobalInfoQuery,
    ): Promise<QueryGlobalInfoResponse>
    /**
     * 批量修改跟进记录
     * @see https://open.dingtalk.com/document/orgapp/batch-update-follow-up-record-data
     */
    batchUpdateFollowRecords(
      params: BatchUpdateFollowRecordsParams,
    ): Promise<BatchUpdateFollowRecordsResponse>
    /**
     * 批量新增跟进记录
     * @see https://open.dingtalk.com/document/orgapp/batch-add-follow-up-record-data
     */
    batchAddFollowRecords(
      params: BatchAddFollowRecordsParams,
    ): Promise<BatchAddFollowRecordsResponse>
    /**
     * 批量删除跟进记录
     * @see https://open.dingtalk.com/document/orgapp/batch-delete-follow-up-record-data
     */
    batchRemoveFollowRecords(
      params: BatchRemoveFollowRecordsParams,
    ): Promise<BatchRemoveFollowRecordsResponse>
    /**
     * 删除CRM自定义对象数据
     * @see https://open.dingtalk.com/document/orgapp/delete-crm-custom-object-data
     */
    deleteCrmCustomObjectData(
      instanceId: string,
      query: DeleteCrmCustomObjectDataQuery,
    ): Promise<DeleteCrmCustomObjectDataResponse>
    /**
     * 批量修改联系人
     * @see https://open.dingtalk.com/document/orgapp/modify-contact-data-in-batches
     */
    batchUpdateContacts(
      params: BatchUpdateContactsParams,
    ): Promise<BatchUpdateContactsResponse>
    /**
     * 批量新增联系人
     * @see https://open.dingtalk.com/document/orgapp/add-contact-data-in-batches
     */
    batchAddContacts(
      params: BatchAddContactsParams,
    ): Promise<BatchAddContactsResponse>
    /**
     * 批量新增关系数据
     * @see https://open.dingtalk.com/document/orgapp/add-multiple-relationship-data-in-batches
     */
    batchAddRelationDatas(
      params: BatchAddRelationDatasParams,
    ): Promise<BatchAddRelationDatasResponse>
    /**
     * 批量修改关系数据
     * @see https://open.dingtalk.com/document/orgapp/update-multiple-relational-data-tables-at-a-time
     */
    batchUpdateRelationDatas(
      params: BatchUpdateRelationDatasParams,
    ): Promise<BatchUpdateRelationDatasResponse>
    /**
     * 获取个人客户或企业客户查重字段
     * @see https://open.dingtalk.com/document/isvapp/obtain-duplicate-check-fields
     */
    getRelationUkSetting(
      query: GetRelationUkSettingQuery,
    ): Promise<GetRelationUkSettingResponse>
    /**
     * 创建客户群
     * @see https://open.dingtalk.com/document/isvapp/create-a-customer-group
     */
    crmCreateGroup(
      params: CrmCreateGroupParams,
    ): Promise<CrmCreateGroupResponse>
    /**
     * 批量查询客户群
     * @see https://open.dingtalk.com/document/isvapp/query-customer-groups-in-batches
     */
    getCrmGroupChatMulti(
      params: GetCrmGroupChatMultiParams,
    ): Promise<GetCrmGroupChatMultiResponse>
    /**
     * 获取单个客户群详情
     * @see https://open.dingtalk.com/document/isvapp/obtain-a-single-customer-group
     */
    getCrmGroupChatSingle(
      query: GetCrmGroupChatSingleQuery,
    ): Promise<GetCrmGroupChatSingleResponse>
    /**
     * 查询客户数据
     * @see https://open.dingtalk.com/document/isvapp/querying-customer-data
     */
    queryRelationDatasByTargetId(
      targetId: string,
      query: QueryRelationDatasByTargetIdQuery,
    ): Promise<QueryRelationDatasByTargetIdResponse>
    /**
     * 查询客户群列表
     * @see https://open.dingtalk.com/document/isvapp/query-a-list-of-customer-groups
     */
    queryCrmGroupChats(
      query: QueryCrmGroupChatsQuery,
    ): Promise<QueryCrmGroupChatsResponse>
    /**
     * 更新客户群组
     * @see https://open.dingtalk.com/document/orgapp/crm-update-group
     */
    crmUpdateGroupSet(params: CrmUpdateGroupSetParams): Promise<void>
    /**
     * 查询客户群组列表
     * @see https://open.dingtalk.com/document/isvapp/query-the-list-of-customer-groups-set
     */
    listGroupSet(query: ListGroupSetQuery): Promise<ListGroupSetResponse>
    /**
     * 创建群组
     * @see https://open.dingtalk.com/document/isvapp/create-a-customer-group-set
     */
    createGroupSet(
      params: CreateGroupSetParams,
    ): Promise<CreateGroupSetResponse>
    /**
     * 获取单个客户群组详情
     * @see https://open.dingtalk.com/document/isvapp/queries-the-details-of-a-single-customer-group
     */
    getGroupSet(query: GetGroupSetQuery): Promise<GetGroupSetResponse>
    /**
     * 更新crm个人客户（或企业客户）
     * @see https://open.dingtalk.com/document/isvapp/update-crm-personal-customers
     */
    updateCrmPersonalCustomer(
      params: UpdateCrmPersonalCustomerParams,
    ): Promise<UpdateCrmPersonalCustomerResponse>
    /**
     * 添加crm个人客户（或企业客户）
     * @see https://open.dingtalk.com/document/orgapp/add-crm-personal-customers
     */
    addCrmPersonalCustomer(
      params: AddCrmPersonalCustomerParams,
    ): Promise<AddCrmPersonalCustomerResponse>
    /**
     * 删除crm个人客户（或企业客户）
     * @see https://open.dingtalk.com/document/orgapp/delete-crm-personal-customer
     */
    deleteCrmPersonalCustomer(
      dataId: string,
      query: DeleteCrmPersonalCustomerQuery,
    ): Promise<DeleteCrmPersonalCustomerResponse>
    /**
     * 获取CRM客户对象的元数据描述
     * @see https://open.dingtalk.com/document/isvapp/get-metadata-description-of-crm-customer-object-1
     */
    describeCrmPersonalCustomerObjectMeta(
      query: DescribeCrmPersonalCustomerObjectMetaQuery,
    ): Promise<DescribeCrmPersonalCustomerObjectMetaResponse>
    /**
     * 批量获取crm个人客户
     * @see https://open.dingtalk.com/document/isvapp/acquire-crm-individual-customers-in-batches
     */
    listCrmPersonalCustomers(
      query: ListCrmPersonalCustomersQuery,
    ): Promise<ListCrmPersonalCustomersResponse>
    /**
     * 根据指定查询条件批量获取客户数据
     * @see https://open.dingtalk.com/document/isvapp/obtains-crm-individual-customers-in-batches-based-on-specified-query
     */
    queryCrmPersonalCustomer(
      query: QueryCrmPersonalCustomerQuery,
    ): Promise<QueryCrmPersonalCustomerResponse>
    /**
     * 获取全量个人或企业客户数据
     * @see https://open.dingtalk.com/document/orgapp/crm-obtains-all-private-sea-customer-data
     */
    queryAllCustomer(
      params: QueryAllCustomerParams,
    ): Promise<QueryAllCustomerResponse>
    /**
     * 服务窗单发接口，指定消息接收人发送
     * @see https://open.dingtalk.com/document/isvapp/sends-a-single-message-from-the-service-window
     */
    sendOfficialAccountOTOMessage(
      params: SendOfficialAccountOTOMessageParams,
    ): Promise<SendOfficialAccountOTOMessageResponse>
    /**
     * 服务窗消息群发
     * @see https://open.dingtalk.com/document/isvapp/batch-sending-of-service-window-messages
     */
    batchSendOfficialAccountOTOMessage(
      params: BatchSendOfficialAccountOTOMessageParams,
    ): Promise<BatchSendOfficialAccountOTOMessageResponse>
  }
}
