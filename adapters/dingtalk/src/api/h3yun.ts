import { Internal } from '../internal'
// GENERATED CONTENT

export interface GetUploadUrlQuery {
  /** 表单编码。 */
  schemaCode: string
  /** 业务数据实例ID。 */
  bizObjectId: string
  /** 文件上传至目标控件的字段名。 */
  fieldName: string
  /** 是否覆盖，取值： */
  isOverwrite: unknown
}

export interface GetUploadUrlResponse {
  code: string
  message: string
  data?: {
    uploadUrl?: string
  }
}

export interface QueryAppFunctionNodesQuery {
  /** 应用编码。 */
  appCode: string
}

export interface QueryAppFunctionNodesResponse {
  code: string
  message: string
  data?: {
    schemaCode?: string
    appCode?: string
    parentCode?: string
    displayName?: string
    nodeVisibleType?: string
    nodeType?: string
    state?: string
    sortKey?: number
    isSystem?: number
  }[]
}

export interface CreateProcessesInstanceParams {
  /** 流程表单编码。 */
  schemaCode: string
  /** 业务数据实例ID。 */
  bizObjectId: string
  /** 操作者的ID。 */
  opUserId: string
}

export interface CreateProcessesInstanceResponse {
  code: string
  message: string
  data?: {
    processInstanceId?: string
  }
}

export interface DeleteProcessesInstanceQuery {
  /** 流程实例ID。可以调用[查询流程实例](https://open.dingtalk.com/document/orgapp-server/query-flow-instances)接口获取。 */
  processInstanceId: string
  /** 删除成功后，是否需要更新业务表单关联的流程实例ID。 */
  isAutoUpdateBizObject: unknown
}

export interface DeleteProcessesInstanceResponse {
  code: string
  message: string
}

export interface LoadBizFieldsQuery {
  /** 表单编码。 */
  schemaCode: string
}

export interface LoadBizFieldsResponse {
  code: string
  message: string
  data?: {
    schemaCode?: string
    formName?: string
    fields?: number
    childForms?: number
  }
}

export interface QueryProcessesWorkItemsQuery {
  /** 流程实例ID。 */
  processInstanceId: string
}

export interface QueryProcessesWorkItemsResponse {
  code: string
  message: string
  data?: {
    workItemId?: string
    workItemType?: string
    processInstanceId?: string
    appCode?: string
    schemaCode?: string
    bizObjectId?: string
    processVersion?: string
    activityCode?: string
    activityName?: string
    displayName?: string
    state?: string
    isFinish?: number
    receiveTimeGMT?: string
    startTimeGMT?: string
    finishTimeGMT?: string
    comment?: string
    isApproval?: number
    participant?: number
    finisher?: number
    receiptor?: number
  }[]
}

export interface BatchInsertBizObjectParams {
  /** 表单编码。 */
  schemaCode: string
  /** 操作用户ID。 */
  opUserId: string
  /** 待新增的业对象json数组。JSON数组的key只可以调用[获取表单对象结构](https://open.dingtalk.com/document/orgapp-server/gets-the-form-object-structure)接口获取。 */
  bizObjectJsonArray: string[]
  /** 是否是草稿，取值： */
  isDraft: unknown
}

export interface BatchInsertBizObjectResponse {
  code: string
  message: string
  data?: {
    bizObjectIds?: number
    processIds?: number
    failedDatas?: number
    failedMessages?: number
  }
}

export interface DeleteBizObjectQuery {
  /** 表单编码。 */
  schemaCode: string
  /** 业务数据ID。 */
  bizObjectId: string
}

export interface DeleteBizObjectResponse {
  code: string
  message: string
}

export interface CancelProcessInstanceParams {
  /** 流程实例ID。可以调用[查询流程实例](https://open.dingtalk.com/document/orgapp-server/query-flow-instances)接口获取。 */
  processInstanceId: string
}

export interface CancelProcessInstanceResponse {
  code: string
  message: string
}

export interface CreateBizObjectParams {
  /** 表单编码。 */
  schemaCode: string
  /** 操作用户ID。 */
  opUserId: string
  /** json格式的业务数据。JSON数组的key只可以调用[获取表单对象结构](https://open.dingtalk.com/document/orgapp-server/gets-the-form-object-structure)接口获取。 */
  bizObjectJson: string
  /** 是否是草稿，取值： */
  isDraft: unknown
}

export interface CreateBizObjectResponse {
  code: string
  message: string
  data?: {
    schemaCode?: string
    formUsageType?: string
    bizObjectId?: string
    processInstanceId?: string
  }
}

export interface QueryProcessesInstanceQuery {
  /** 流程表单编码。 */
  schemaCode: string
  /** 业务数据ID。 */
  bizObjectId: string
}

export interface QueryProcessesInstanceResponse {
  code: string
  message: string
  data?: {
    processInstanceId?: string
    dingTalkProcessId?: string
    processDisplayName?: string
    processVersion?: number
    schemaCode?: string
    bizObjectId?: string
    appCode?: string
    state?: string
    originator?: number
    createdTimeGMT?: string
    startTimeGMT?: string
    finishTimeGMT?: string
  }[]
}

export interface UpdateBizObjectParams {
  /** 表单编码。 */
  schemaCode: string
  /** 业务数据ID。 */
  bizObjectId: string
  /** 待修改的json格式业务数据。 */
  bizObjectJson: string
}

export interface UpdateBizObjectResponse {
  code: string
  message: string
}

export interface LoadBizObjectQuery {
  /** 表单编码或流程表单编码。 */
  schemaCode: string
  /** 业务对象实例ID。 */
  bizObjectId: string
}

export interface LoadBizObjectResponse {
  code: string
  message: string
  data?: unknown
}

export interface LoadBizObjectsParams {
  /** 表单编码。 */
  schemaCode: string
  /** 分页页码。 */
  pageNumber: number
  /** 分页页大小，最大值500。 */
  pageSize: number
  /** 需要返回的字段名，仅支持传入主表的字段。 */
  returnFields?: string[]
  /** 排序字段结构列表。 */
  sortByFields?: object[]
  /** json格式的动态条件过滤器。 */
  matcherJson?: string
}

export interface LoadBizObjectsResponse {
  code: string
  message: string
  data?: {
    pageNumber?: number
    pageSize?: number
    totalCount?: number
    bizObjects?: number
  }
}

export interface GetAttachmentTemporaryUrlQuery {
  /** 附件ID。 */
  attachmentId: string
}

export interface GetAttachmentTemporaryUrlResponse {
  code: string
  message: string
  data?: {
    attachmentUrl?: string
  }
}

export interface GetRoleUsersQuery {
  /** 角色ID。 */
  roleId: string
}

export interface GetRoleUsersResponse {
  code: string
  message: string
  data?: {
    userId?: string
    name?: string
    code?: string
    sex?: string
    description?: string
    mobile?: string
    email?: string
    departmentId?: string
    departmentName?: string
    domainType?: string
    partDepartmentIds?: number
    sortKey?: number
  }[]
}

export interface GetRolesResponse {
  code: string
  message: string
  data?: {
    roleGroups?: number
    roles?: number
  }
}

export interface GetUsersQuery {
  /** 部门ID。 */
  departmentId: string
  /** 是否递归获取子级部门下的用户。 */
  isRecursive?: unknown
}

export interface GetUsersResponse {
  code: string
  message: string
  data?: {
    id?: string
    name?: string
    code?: string
    sex?: string
    description?: string
    mobile?: string
    email?: string
    departmentId?: string
    departmentName?: string
    domainType?: string
    partDepartmentIds?: number
    sortKey?: number
  }[]
}

export interface GetAppsParams {
  /** 查询类型，取值： */
  queryType: string
  /** 待查询条件数组。 */
  values?: string[]
}

export interface GetAppsResponse {
  code: string
  message: string
  data?: {
    appCode?: string
    displayName?: string
    appSource?: string
    appState?: string
    solution?: string
  }[]
}

export interface GetOrganizationsQuery {
  /** 部门ID。 */
  departmentId?: string
}

export interface GetOrganizationsResponse {
  code: string
  message: string
  data?: {
    id?: string
    parentId?: string
    name?: string
    code?: string
    unitType?: string
    sortKey?: number
    description?: string
  }[]
}

// funcName: isOldApi
Internal.define({
  '/h3yun/attachments/uploadUrls': { GET: { getUploadUrl: false } },
  '/h3yun/apps/functionNodes': { GET: { queryAppFunctionNodes: false } },
  '/h3yun/processes/instances': {
    POST: { createProcessesInstance: false },
    DELETE: { deleteProcessesInstance: false },
    GET: { queryProcessesInstance: false },
  },
  '/h3yun/forms/loadBizFields': { GET: { loadBizFields: false } },
  '/h3yun/processes/workItems': { GET: { queryProcessesWorkItems: false } },
  '/h3yun/forms/instances/batch': { POST: { batchInsertBizObject: false } },
  '/h3yun/forms/instances': {
    DELETE: { deleteBizObject: false },
    POST: { createBizObject: false },
    PUT: { updateBizObject: false },
  },
  '/h3yun/processes/instances/cancel': {
    POST: { cancelProcessInstance: false },
  },
  '/h3yun/forms/instances/loadInstances': { GET: { loadBizObject: false } },
  '/h3yun/forms/instances/search': { POST: { loadBizObjects: false } },
  '/h3yun/attachments/temporaryUrls': {
    GET: { getAttachmentTemporaryUrl: false },
  },
  '/h3yun/roles/roleUsers': { GET: { getRoleUsers: false } },
  '/h3yun/roles': { GET: { getRoles: false } },
  '/h3yun/users': { GET: { getUsers: false } },
  '/h3yun/apps/search': { POST: { getApps: false } },
  '/h3yun/departments': { GET: { getOrganizations: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 获取文件上传地址
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-upload-url-of-a-file-2
     */
    getUploadUrl(query: GetUploadUrlQuery): Promise<GetUploadUrlResponse>
    /**
     * 获取应用功能节点
     * @see https://developers.dingtalk.com/document/isvapp/queries-the-application-feature-nodes
     */
    queryAppFunctionNodes(
      query: QueryAppFunctionNodesQuery,
    ): Promise<QueryAppFunctionNodesResponse>
    /**
     * 创建流程实例
     * @see https://developers.dingtalk.com/document/isvapp/create-a-process-instance
     */
    createProcessesInstance(
      params: CreateProcessesInstanceParams,
    ): Promise<CreateProcessesInstanceResponse>
    /**
     * 删除流程实例数据
     * @see https://developers.dingtalk.com/document/isvapp/delete-process-instance-data
     */
    deleteProcessesInstance(
      query: DeleteProcessesInstanceQuery,
    ): Promise<DeleteProcessesInstanceResponse>
    /**
     * 获取表单对象结构
     * @see https://developers.dingtalk.com/document/isvapp/gets-the-form-object-structure
     */
    loadBizFields(query: LoadBizFieldsQuery): Promise<LoadBizFieldsResponse>
    /**
     * 获取流程实例节点工作项
     * @see https://developers.dingtalk.com/document/isvapp/query-flow-instance-node-work-items
     */
    queryProcessesWorkItems(
      query: QueryProcessesWorkItemsQuery,
    ): Promise<QueryProcessesWorkItemsResponse>
    /**
     * 批量新增表单业务数据
     * @see https://developers.dingtalk.com/document/isvapp/batch-add-form-business-data
     */
    batchInsertBizObject(
      params: BatchInsertBizObjectParams,
    ): Promise<BatchInsertBizObjectResponse>
    /**
     * 删除业务对象
     * @see https://developers.dingtalk.com/document/isvapp/delete-a-business-object
     */
    deleteBizObject(
      query: DeleteBizObjectQuery,
    ): Promise<DeleteBizObjectResponse>
    /**
     * 取消流程实例
     * @see https://developers.dingtalk.com/document/isvapp/cancel-a-process-instance
     */
    cancelProcessInstance(
      params: CancelProcessInstanceParams,
    ): Promise<CancelProcessInstanceResponse>
    /**
     * 创建表单业务数据
     * @see https://developers.dingtalk.com/document/isvapp/create-form-business-data
     */
    createBizObject(
      params: CreateBizObjectParams,
    ): Promise<CreateBizObjectResponse>
    /**
     * 查询流程实例
     * @see https://developers.dingtalk.com/document/isvapp/query-flow-instances
     */
    queryProcessesInstance(
      query: QueryProcessesInstanceQuery,
    ): Promise<QueryProcessesInstanceResponse>
    /**
     * 修改表单业务对象数据
     * @see https://developers.dingtalk.com/document/isvapp/modify-form-business-object-data
     */
    updateBizObject(
      params: UpdateBizObjectParams,
    ): Promise<UpdateBizObjectResponse>
    /**
     * 获取业务实例信息
     * @see https://developers.dingtalk.com/document/isvapp/queries-business-instance-information
     */
    loadBizObject(query: LoadBizObjectQuery): Promise<LoadBizObjectResponse>
    /**
     * 查询表单业务数据列表
     * @see https://developers.dingtalk.com/document/isvapp/querying-form-business-data
     */
    loadBizObjects(
      params: LoadBizObjectsParams,
    ): Promise<LoadBizObjectsResponse>
    /**
     * 获取附件临时免登地址
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-temporary-attachment-free-address
     */
    getAttachmentTemporaryUrl(
      query: GetAttachmentTemporaryUrlQuery,
    ): Promise<GetAttachmentTemporaryUrlResponse>
    /**
     * 获取角色用户数据
     * @see https://developers.dingtalk.com/document/isvapp/obtain-role-data-1
     */
    getRoleUsers(query: GetRoleUsersQuery): Promise<GetRoleUsersResponse>
    /**
     * 获取角色数据
     * @see https://developers.dingtalk.com/document/isvapp/obtain-role-data
     */
    getRoles(): Promise<GetRolesResponse>
    /**
     * 获取用户数据
     * @see https://developers.dingtalk.com/document/isvapp/obtain-user-data
     */
    getUsers(query: GetUsersQuery): Promise<GetUsersResponse>
    /**
     * 获取应用列表
     * @see https://developers.dingtalk.com/document/isvapp/queries-applications
     */
    getApps(params: GetAppsParams): Promise<GetAppsResponse>
    /**
     * 获取组织数据
     * @see https://developers.dingtalk.com/document/isvapp/queries-organization-data
     */
    getOrganizations(
      query: GetOrganizationsQuery,
    ): Promise<GetOrganizationsResponse>
  }
}
