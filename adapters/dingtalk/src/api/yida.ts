import { Internal } from '../internal'
// GENERATED CONTENT

export interface GetFormListInAppQuery {
  /** 应用编码。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 表单类型。 */
  formTypes?: string
  /** 每页条目数，默认值100，最大值100。 */
  pageSize?: number
  /** 页码，不传默认为1。 */
  pageNumber?: number
  /** 操作人userId。 */
  userId: string
}

export interface GetFormListInAppResponse {
  success?: unknown
  result?: {
    data?: number
    totalCount?: number
    currentPage?: number
  }
}

export interface GetFieldDefByUuidQuery {
  /** 应用编码。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 表单唯一标识。 */
  formUuid: string
  /** 操作人userId。 */
  userId: string
}

export interface GetFieldDefByUuidResponse {
  success?: unknown
  result?: {
    componentName?: string
    fieldId?: string
    behavior?: string
    label?: number
    props?: number
    children?: string
  }[]
}

export interface ExecuteBatchTaskParams {
  /** 审批动作，目前支持的审批动作如下： */
  outResult: string
  /** 宜搭应用编码。 */
  appType: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 审批意见。 */
  remark?: string
  /** 操作人userId。 */
  userId: string
  /** 批量执行的审批任务列表，数组对象格式，每个元素值包含taskId和formInstId两个子属性。 */
  taskInformationList: string
}

export interface ExecuteBatchTaskResponse {
  failNumber: number
  successNumber: number
  total: number
}

export interface ListOperationLogsParams {
  /** 表单编码。 */
  formUuid: string
  /** 宜搭应用编码。 */
  appType: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 宜搭表单实例Id。 */
  formInstanceIdList?: string[]
  /** 用户userId。 */
  userId: string
}

export interface ListOperationLogsResponse {
  operationLogMap: unknown
}

export interface ListFormRemarksParams {
  /** 表单编码。 */
  formUuid: string
  /** 宜搭应用编码。 */
  appType: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 宜搭表单实例Id。 */
  formInstanceIdList?: string[]
  /** 操作者userId。 */
  userId: string
}

export interface ListFormRemarksResponse {
  formRemarkVoMap?: unknown
}

export interface QueryServiceRecordQuery {
  /** 操作人的userId。 */
  userId: string
  /** 服务类型，目前只有HTTP服务调用。 */
  hookType?: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 本次服务调用的唯一ID，自定义参数。 */
  hookUuid?: string
  /** 被重试的服务调用唯一ID。 */
  sourceUuid?: string
  /** 服务调用地址中包含的部分字符串，用于模糊查询。 */
  requestUrl?: string
  /** 服务调用是否成功。 */
  success?: unknown
  /** 当前页码，从1开始。 */
  pageNumber?: number
  /** 宜搭表单实例Id。 */
  instanceId: string
  /** 查询调用服务的开始时间。 */
  invokeAfterDateGMT?: string
  /** 每页最大条目数，最大值100。 */
  pageSize?: number
  /** 服务调用状态，可选值： */
  invokeStatus?: string
  /** 宜搭应用编码。 */
  appType: string
  /** 查询调用服务的结束时间。 */
  invokeBeforeDateGMT?: string
  /** 宜搭表单编码。 */
  formUuid: string
}

export interface QueryServiceRecordResponse {
  totalCount?: number
  values?: {
    serviceContent?: string
    formUuid?: string
    sourceUuid?: string
    invokeStatus?: string
    invokeUrl?: string
    invokeResult?: string
    invokeParameter?: string
    hookUuid?: string
    formInstanceId?: string
    serviceParameter?: string
    serviceName?: string
    hookType?: string
    invokeSuccess?: string
  }[]
}

export interface BatchRemovalByFormInstanceIdListParams {
  /** 表单编码。 */
  formUuid: string
  /** 宜搭应用编码。 */
  appType: string
  /** 是否需要宜搭服务端异步执行该任务。 */
  asynchronousExecution?: unknown
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 宜搭表单实例Id。 */
  formInstanceIdList: string[]
  /** 员工userId。 */
  userId: string
  /** 是否需要触发表单绑定的校验规则、关联业务规则和第三方服务回调。 */
  executeExpression?: unknown
}

export interface BatchUpdateFormDataByInstanceIdParams {
  /** 是否不触发表单绑定的校验规则、关联业务规则和第三方服务回调。 */
  noExecuteExpression?: unknown
  /** 表单编码。 */
  formUuid: string
  /** 用于更新表单实例的数据。 */
  updateFormDataJson: string
  /** 宜搭应用编码。 */
  appType: string
  /** 是否忽略空值。 */
  ignoreEmpty?: unknown
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 是否使用最新的表单schema版本。 */
  useLatestFormSchemaVersion?: unknown
  /** 是否需要宜搭服务端异步执行该任务。 */
  asynchronousExecution?: unknown
  /** 表单实例Id。 */
  formInstanceIdList: string[]
  /** 用户userId。 */
  userId: string
}

export interface BatchUpdateFormDataByInstanceIdResponse {
  result?: string[]
}

export interface BatchUpdateFormDataByInstanceMapParams {
  /** 是否不触发表单绑定的校验规则、关联业务规则和第三方服务回调。 */
  noExecuteExpression?: unknown
  /** 表单编码。 */
  formUuid: string
  /** 该任务是否需要服务端异步执行。 */
  asynchronousExecution?: unknown
  /** 宜搭应用编码。 */
  appType: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 是否忽略空值。 */
  ignoreEmpty?: unknown
  updateFormDataJsonMap: unknown
  /** 是否使用最新的表单schema版本。 */
  useLatestFormSchemaVersion?: unknown
  /** 用户userId。 */
  userId: string
}

export interface BatchUpdateFormDataByInstanceMapResponse {
  result?: string[]
}

export interface ListApplicationQuery {
  /** 应用过滤条件。 */
  appFilter?: string
  /** 页码数，从1开始。 */
  pageNumber?: number
  /** 钉钉企业的corpId值。 */
  corpId: string
  /** 每页最大条目数，最大值100。 */
  pageSize?: number
  /** 根据应用名称检索时的关键词。 */
  appNameSearchKeyword?: string
  /** 操作人userId。 */
  userId: string
  /** 根据corpId、userId和CorpToken使用md5加密计算生成的字符串。 */
  token: string
}

export interface ListApplicationResponse {
  pageNumber?: number
  totalCount?: number
  data?: {
    creatorUserId?: string
    corpId?: string
    icon?: string
    description?: string
    applicationStatus?: string
    appConfig?: string
    inexistence?: string
    subCorpId?: string
    appType?: string
    name?: string
  }[]
}

export interface BatchSaveFormDataParams {
  /** 是否不触发表单绑定的校验规则、关联业务规则和第三方服务回调。 */
  noExecuteExpression?: unknown
  /** 表单编码。 */
  formUuid: string
  /** 宜搭应用编码。 */
  appType: string
  /** 是否需要宜搭服务端异步执行该任务。 */
  asynchronousExecution?: unknown
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 批量保存多条表单实例数据发生异常时是否跳过异常的表单实例并继续保存下一个表单实例数据。 */
  keepRunningAfterException?: unknown
  /** 用户userId。 */
  userId: string
  /** 表单实例数据。 */
  formDataJsonList: string[]
}

export interface BatchSaveFormDataResponse {
  result?: string[]
}

export interface SearchFormDataSecondGenerationNoTableFieldParams {
  /** 当前页码，从1开始。 */
  pageNumber?: number
  /** 表单编码。 */
  formUuid: string
  /** 用于检索表单实例数据的检索条件。 */
  searchCondition?: string
  /** 表单实例修改截止时间。 */
  modifiedToTimeGMT?: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 表单实例修改开始时间。 */
  modifiedFromTimeGMT?: string
  /** 每页条目数，最大值100。 */
  pageSize?: number
  /** 用户userId。 */
  userId: string
  /** 宜搭应用编码。 */
  appType: string
  /** 排序规则 */
  orderConfigJson?: string
  /** 表单实例提交人的userId。 */
  originatorId?: string
  /** 表单实例创建截止时间。 */
  createToTimeGMT?: string
  /** 表单实例创建开始时间。 */
  createFromTimeGMT?: string
}

export interface SearchFormDataSecondGenerationNoTableFieldResponse {
  pageNumber?: number
  data?: {
    createTimeGMT?: string
    modifyUser?: number
    sequence?: string
    creatorUserId?: string
    formUuid?: string
    serialNumber?: string
    modifiedTimeGMT?: string
    modifier?: string
    formData?: number
    originator?: number
    formInstanceId?: string
    id?: number
    title?: string
    version?: number
    instanceValue?: string
  }[]
  totalCount?: number
}

export interface CreateOrUpdateFormDataParams {
  /** 是否不要触发表单绑定的校验规则、关联业务规则和第三方服务回调。 */
  noExecuteExpression?: unknown
  /** 表单编码。 */
  formUuid: string
  /** 用于检索表单实例数据的检索条件。 */
  searchCondition: string
  /** 宜搭应用编码。 */
  appType: string
  /** 用于更新或新增表单实例的数据。 */
  formDataJson: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 用户userId。 */
  userId: string
}

export interface CreateOrUpdateFormDataResponse {
  result?: string[]
}

export interface SearchFormDataSecondGenerationParams {
  /** 当前的页码数，从1开始。 */
  pageNumber?: number
  /** 表单编码。 */
  formUuid: string
  /** 用于检索表单实例数据的检索条件。 */
  searchCondition?: string
  /** 修改的截止时间，格式yyyy-MM-dd HH:mm:ss。 */
  modifiedToTimeGMT?: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 修改开始时间，格式yyyy-MM-dd HH:mm:ss。 */
  modifiedFromTimeGMT?: string
  /** 每页最大条目数，最大值100。 */
  pageSize?: number
  /** 用户userId。 */
  userId: string
  /** 宜搭应用编码。 */
  appType: string
  /** 排序规则。 */
  orderConfigJson?: string
  /** 表单提交人的userId。 */
  originatorId?: string
  /** 创建的开始时间，格式yyyy-MM-dd HH:mm:ss。 */
  createToTimeGMT?: string
  /** 创建的开始时间，格式yyyy-MM-dd HH:mm:ss。 */
  createFromTimeGMT?: string
}

export interface SearchFormDataSecondGenerationResponse {
  pageNumber?: number
  data?: {
    createTimeGMT?: string
    modifyUser?: number
    sequence?: string
    creatorUserId?: string
    formUuid?: string
    serialNumber?: string
    modifiedTimeGMT?: string
    modifier?: string
    formData?: number
    originator?: number
    formInstanceId?: string
    id?: number
    title?: string
    version?: number
    instanceValue?: string
  }[]
  totalCount?: number
}

export interface BatchGetFormDataByIdListParams {
  /** 宜搭表单编码。 */
  formUuid: string
  /** 宜搭应用编码。 */
  appType: string
  /** 宜搭应用密钥。 */
  systemToken: string
  /** 宜搭表单实例Id。 */
  formInstanceIdList: string[]
  /** 是否需要宜搭表单组件格式的实例数据。 */
  needFormInstanceValue?: unknown
  /** 用户userId。 */
  userId: string
}

export interface BatchGetFormDataByIdListResponse {
  result?: {
    createTimeGMT?: string
    modifyUser?: number
    sequence?: string
    creatorUserId?: string
    formUuid?: string
    serialNumber?: string
    modifiedTimeGMT?: string
    modifier?: string
    formData?: number
    originator?: number
    formInstanceId?: string
    id?: number
    title?: string
    version?: number
    instanceValue?: string
  }[]
}

export interface GetTaskCopiesQuery {
  /** 应用ID。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 分页大小。 */
  pageSize?: number
  /** 语言，取值： */
  language?: string
  /** 分页页码。 */
  pageNumber?: number
  /** 表单中组件数据模糊搜索。 */
  keyword?: string
  /** 用户userid。 */
  userId: string
  /** 流程code列表。 */
  processCodes?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: number
  /** 创建时间终止值。 */
  createToTimeGMT?: number
}

export interface GetTaskCopiesResponse {
  pageNumber?: number
  totalCount?: number
  data?: {
    actionExecutorId?: number
    processInstanceId?: string
    formUuid?: string
    serialNumber?: string
    processInstanceStatus?: string
    originatorDisplayName?: string
    modifiedTimeGMT?: string
    carbonActivityId?: string
    dataType?: string
    actionExecutorName?: number
    originatorAvatar?: string
    processInstanceStatusText?: string
    processApprovedResultText?: string
    formInstanceId?: string
    title?: string
    version?: number
    instanceValue?: string
    createTimeGMT?: string
    processApprovedResult?: string
    processId?: number
    processName?: string
    processCode?: string
    appType?: string
    dataMap?: number
    currentActivityInstances?: number
    finishTimeGMT?: string
    originatorId?: string
  }[]
}

export interface SearchFormDataIdListParams {
  /** 修改时间终止值。 */
  modifiedToTimeGMT?: string
  /** 应用秘钥。 */
  systemToken: string
  /** 修改时间起始值。 */
  modifiedFromTimeGMT?: string
  /** 语言，取值： */
  language?: string
  /** 根据表单内组件值查询。 */
  searchFieldJson?: string
  /** 用户userid。 */
  userId: string
  /** 根据流程发起人工号查询。 */
  originatorId?: string
  /** 创建时间终止值。 */
  createToTimeGMT?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: string
}

export interface SearchFormDataIdListQuery {
  /** 分页页吗。 */
  pageNumber?: number
  /** 分页大小。 */
  pageSize?: number
}

export interface SearchFormDataIdListResponse {
  totalCount?: number
  pageNumber?: number
  data?: string[]
}

export interface ListTableDataByFormInstanceIdTableIdQuery {
  /** 表单ID。 */
  formUuid: string
  /** 宜搭应用的唯一编码。 */
  appType: string
  /** 需要查找的子表单组件ID。 */
  tableFieldId: string
  /** 分页页码。 */
  pageNumber?: number
  /** 分页大小。 */
  pageSize?: number
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
}

export interface ListTableDataByFormInstanceIdTableIdResponse {
  totalCount?: number
  pageNumber?: number
  data?: object[]
}

export interface GetCorpAccomplishmentTasksQuery {
  /** 分页大小。 */
  pageSize?: number
  /** 语言，取值： */
  language?: string
  /** 分页页码。 */
  pageNumber?: number
  /** 表单中组件数据模糊搜索。 */
  keyword?: string
  /** 应用标识。 */
  appTypes?: string
  /** 流程code。 */
  processCodes?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: number
  /** 创建时间终止值。 */
  createToTimeGMT?: number
  /** 验权token。 */
  token: string
}

export interface GetCorpAccomplishmentTasksResponse {
  totalCount?: number
  pageNumber?: number
  data?: {
    originatorNickName?: string
    processInstanceId?: string
    originatorName?: string
    finishTimeGMT?: string
    activeTimeGMT?: string
    actualActionerId?: string
    originatorEmail?: string
    title?: string
    outResultName?: string
    outResult?: string
    originatorPhoto?: string
    taskType?: string
    originatorNickNameInEnglish?: string
    createTimeGMT?: string
    titleInEnglish?: string
    appType?: string
    originatorNameInEnglish?: string
    originatorId?: string
    taskId?: string
    status?: string
  }[]
}

export interface GetFormComponentDefinitionListQuery {
  /** 应用秘钥。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 版本。 */
  version?: number
}

export interface GetFormComponentDefinitionListResponse {
  result?: {
    label?: string
    componentName?: string
    fieldId?: string
    parentId?: string
  }[]
}

export interface GetInstanceIdListParams {
  /** 表单ID。 */
  formUuid: string
  /** 修改时间终止值。 */
  modifiedToTimeGMT?: string
  /** 应用秘钥。 */
  systemToken: string
  /** 修改时间起始值。 */
  modifiedFromTimeGMT?: string
  /** 语言，取值： */
  language?: string
  /** 根据表单内组件值查询。 */
  searchFieldJson?: string
  /** 用户userid。 */
  userId: string
  /** 实例状态。 */
  instanceStatus?: string
  /** 流程审批结果。 */
  approvedResult?: string
  /** 应用编码。 */
  appType: string
  /** 根据流程发起人工号查询。 */
  originatorId?: string
  /** 创建时间终止值。 */
  createToTimeGMT?: string
  /** 任务ID。 */
  taskId?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: string
}

export interface GetInstanceIdListQuery {
  /** 分页大小。 */
  pageSize?: number
  /** 分页页码。 */
  pageNumber?: number
}

export interface GetInstanceIdListResponse {
  totalCount?: number
  pageNumber?: number
  data?: string[]
}

export interface GetInstancesByIdListQuery {
  /** 应用ID。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 流程实例ID列表，多个流程实例ID之间使用英文逗号分隔。 */
  processInstanceIds: string
}

export interface GetInstancesByIdListResponse {
  result?: {
    actionExecutor?: number
    processInstanceId?: string
    formUuid?: string
    processCode?: string
    title?: string
    instanceStatus?: string
    approvedResult?: string
    originator?: number
    data?: number
  }[]
}

export interface GetMeCorpSubmissionQuery {
  /** 组织的corpId。 */
  corpId: string
  /** 分页大小。 */
  pageSize?: number
  /** 语言，取值： */
  language?: string
  /** 分页页码。 */
  pageNumber?: number
  /** 表单中组件数据模糊搜索。 */
  keyword?: string
  /** 应用标识。 */
  appTypes?: string
  /** 流程code。 */
  processCodes?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: number
  /** 创建时间终止值。 */
  createToTimeGMT?: number
  /** 验权token。 */
  token: string
}

export interface GetMeCorpSubmissionResponse {
  totalCount?: number
  pageNumber?: number
  data?: {
    actionerName?: number
    processInstanceId?: string
    modifiedTimeGMT?: string
    finishTimeGMT?: string
    formUuid?: string
    processInstanceStatus?: string
    originatorDisplayName?: string
    dataType?: string
    originatorAvatar?: string
    processInstanceStatusText?: string
    actioner?: number
    processApprovedResultText?: string
    formInstanceId?: string
    title?: string
    version?: number
    instanceValue?: string
    processApprovedResult?: string
    createTimeGMT?: string
    processId?: number
    processName?: string
    processCode?: string
    appType?: string
    actionerId?: number
    dataMap?: number
    currentActivityInstances?: number
    originatorId?: string
  }[]
}

export interface GetProcessDefinitionQuery {
  /** 组织的corpId。 */
  corpId?: string
  /** 组ID。 */
  groupId?: string
  /** 应用ID。 */
  appType?: string
  /** 订单号。 */
  orderNumber?: string
  /** 应用的秘钥。 */
  systemType?: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken?: string
  /** 名称空间。 */
  nameSpace?: string
  /** 语言，取值： */
  language?: string
  /** 用户的userid。 */
  userId?: string
}

export interface GetProcessDefinitionResponse {
  outResult?: string
  processInstanceId?: string
  variables?: unknown
  formUuid?: string
  processId?: string
  owners?: {
    userInfo?: string
    tbWang?: string
    orderNumber?: string
    departmentDescription?: string
    displayName?: string
    masterDataDepartments?: number
    displayEnName?: string
    userId?: string
    personalPhoto?: string
    status?: string
  }[]
  originator?: {
    userInfo?: string
    tbWang?: string
    orderNumber?: string
    departmentDescription?: string
    displayName?: string
    masterDataDepartments?: number
    displayEnName?: string
    userId?: string
    personalPhoto?: string
    status?: string
  }
  title?: string
  tasks?: {
    actionerId?: string
    activity?: number
    taskId?: number
    status?: string
  }[]
  status?: string
}

export interface GetCorpTasksQuery {
  /** 组织corpId。 */
  corpId: string
  /** 分页大小。 */
  pageSize?: number
  /** 语言，取值： */
  language?: string
  /** 分页页码。 */
  pageNumber?: number
  /** 表单中组件数据模糊搜索。 */
  keyword?: string
  /** 应用标识列表。 */
  appTypes?: string
  /** 流程code列表。 */
  processCodes?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: number
  /** 创建时间终止值。 */
  createToTimeGMT?: number
  /** 用户的userid。 */
  userId: string
  /** 验权token。 */
  token: string
}

export interface GetCorpTasksResponse {
  totalCount?: number
  pageNumber?: number
  data?: {
    originatorNickName?: string
    processInstanceId?: string
    originatorName?: string
    finishTimeGMT?: string
    activeTimeGMT?: string
    actualActionerId?: string
    originatorEmail?: string
    title?: string
    outResultName?: string
    outResult?: string
    originatorPhoto?: string
    taskType?: string
    originatorNickNameEn?: string
    createTimeGMT?: string
    titleInEnglish?: string
    appType?: string
    originatorNameInEnglish?: string
    originatorId?: string
    taskId?: string
    status?: string
  }[]
}

export interface GetNotifyMeQuery {
  /** 组织的corpId。 */
  corpId: string
  /** 验权token。 */
  token: string
  /** 分页页码。 */
  pageNumber?: number
  /** 分页大小。 */
  pageSize?: number
  /** 语言，取值： */
  language?: string
  /** 表单中组件数据模糊搜索。 */
  keyword?: string
  /** 应用标识列表。 */
  appTypes?: string
  /** 流程code列表。 */
  processCodes?: string
  /** 流程创建时间起始值。 */
  instanceCreateFromTimeGMT?: number
  /** 流程创建时间终止值。 */
  instanceCreateToTimeGMT?: number
  /** 创建时间起始值。 */
  createFromTimeGMT?: number
  /** 创建时间终止值。 */
  createToTimeGMT?: number
}

export interface GetNotifyMeResponse {
  totalCount?: number
  pageNumber?: number
  data?: {
    createTimeGMT?: string
    activityId?: string
    creatorUserId?: string
    corpId?: string
    titleInEnglish?: string
    modifiedTimeGMT?: string
    appType?: string
    processCode?: string
    mobileUrl?: string
    formInstanceId?: string
    instStatus?: string
    title?: string
    url?: string
  }[]
}

export interface GetActivityButtonListQuery {
  /** 应用秘钥。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
}

export interface GetActivityButtonListResponse {
  result?: {
    aliasInEnglish?: string
    aliasInChinese?: string
  }[]
}

export interface GetApplicationAuthorizationServicePlatformResourceQuery {
  /** 实例ID。 */
  instanceId?: string
  /** 访问秘钥。 */
  accessKey?: string
  /** 调用者的unionId。 */
  callerUid?: string
}

export interface GetApplicationAuthorizationServicePlatformResourceResponse {
  appTotalAmount?: number
  instanceId?: string
  instanceTotalAmount?: number
  instanceUsageAmount?: number
  accountUsageAmount?: number
  accountTotalAmount?: number
  pluginUsageAmount?: number
  attachmentTotalAmount?: number
  attachmentUsageAmount?: number
}

export interface UpdateInstanceParams {
  /** 流程实例ID。 */
  processInstanceId: string
  /** 应用ID。 */
  appType: string
  /** 更新的表单数据。 */
  updateFormDataJson: string
  /** 应用秘钥。 */
  systemToken: string
  /** 语言，取值： */
  language?: string
  /** 用户的userid。 */
  userId: string
}

export interface DeleteInstanceQuery {
  /** 应用标识。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 流程实例ID。 */
  processInstanceId: string
}

export interface GetOperationRecordsQuery {
  /** 应用ID。 */
  appType: string
  /** 应用秘钥。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 流程实例ID。 */
  processInstanceId: string
}

export interface GetOperationRecordsResponse {
  result?: {
    processInstanceId?: string
    showName?: string
    operatorNickName?: string
    activeTimeGMT?: string
    operateTimeGMT?: string
    operateType?: string
    operatorStatus?: string
    remark?: string
    taskHoldTimeGMT?: number
    type?: string
    operatorName?: string
    operatorUserId?: string
    activityId?: string
    taskType?: string
    taskExecuteType?: string
    size?: number
    operatorDisplayName?: string
    files?: string
    action?: string
    actionExit?: string
    dataId?: number
    taskId?: string
    digitalSign?: string
    operatorPhotoUrl?: string
  }[]
}

export interface TerminateInstanceQuery {
  /** 应用ID。 */
  appType: string
  /** 应用秘钥。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 流程实例ID。 */
  processInstanceId: string
}

export interface ExecuteTaskParams {
  /** 审批结果。 */
  outResult: string
  /** 是否不执行校验和关联操作，取值： */
  noExecuteExpressions?: string
  /** 应用ID。 */
  appType: string
  /** 更新的表单值。 */
  formDataJson?: string
  /** 应用秘钥。 */
  systemToken: string
  /** 语言，取值： */
  language?: string
  /** 审批意见。 */
  remark: string
  /** 实例ID。 */
  processInstanceId: string
  /** 用户的userid。 */
  userId: string
  /** 任务ID。 */
  taskId: number
  /** 电子签名地址。 */
  digitalSignUrl?: string
}

export interface ExecutePlatformTaskParams {
  /** 审批结果，取值： */
  outResult: string
  /** 是否不执行校验和关联操作，取值： */
  noExecuteExpressions?: string
  /** 应用ID。 */
  appType: string
  /** 更新的表单数据。 */
  formDataJson?: string
  /** 应用秘钥。 */
  systemToken: string
  /** 语言，取值： */
  language?: string
  /** 审批意见。 */
  remark: string
  /** 流程实例ID。 */
  processInstanceId: string
  /** 用户的userid。 */
  userId: string
}

export interface RedirectTaskParams {
  /** 流程实例ID。 */
  processInstanceId: string
  /** 是否应用管理员进行转交，取值： */
  byManager?: string
  /** 应用ID。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 语言，取值： */
  language?: string
  /** 审批意见。 */
  remark: string
  /** 新的任务处理人工号。 */
  nowActionExecutorId: string
  /** 处理人的userid。 */
  userId: string
  /** 任务ID。 */
  taskId: number
}

export interface GetOpenUrlQuery {
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 宜搭附件地址。 */
  fileUrl: string
  /** 临时地址失效时间，单位毫秒。 */
  timeout?: number
}

export interface GetOpenUrlResponse {
  result?: string
}

export interface SaveFormRemarkParams {
  /** 应用ID。 */
  appType: string
  /** 应用秘钥。 */
  systemToken: string
  /** 对评论进行回复。 */
  replyId?: number
  /** 语言，取值： */
  language?: string
  /** 实例ID。 */
  formInstanceId: string
  /** 评论人的的useid。 */
  userId: string
  /** 被@的用户userid，将评论内容通过钉钉发给指定用户。 */
  atUserId?: string
  /** 评论内容。 */
  content: string
}

export interface SaveFormRemarkResponse {
  result?: number
}

export interface ListNavigationByFormTypeQuery {
  /** 应用ID。 */
  appType: string
  /** 应用秘钥。 */
  systemToken: string
  /** 评论人的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 页面类型，取值： */
  formType: string
}

export interface ListNavigationByFormTypeResponse {
  result?: {
    title?: number
    processCode?: string
    formUuid?: string
  }[]
}

export interface ValidateOrderBuyQuery {
  /** 访问秘钥。 */
  accessKey?: string
  /** 调用者unionId。 */
  callerUid?: string
}

export interface ValidateOrderBuyResponse {
  message?: string
  status?: number
}

export interface GetRunningTasksQuery {
  /** 流程实例ID。 */
  processInstanceId?: string
  /** 应用ID。 */
  appType?: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken?: string
  /** 语言，取值： */
  language?: string
  /** 用户的userid。 */
  userId?: string
}

export interface GetRunningTasksResponse {
  result?: {
    createTimeGMT?: string
    activityId?: string
    processInstanceId?: string
    taskType?: string
    titleInEnglish?: string
    activeTimeGMT?: string
    actualActionerId?: string
    originatorId?: string
    finishTimeGMT?: string
    title?: string
    taskId?: string
    status?: string
  }[]
}

export interface GetActivityListQuery {
  /** 流程编码。 */
  processCode?: string
  /** 应用ID。 */
  appType?: string
  /** 应用的秘钥。 */
  systemToken?: string
  /** 语言，取值： */
  language?: string
  /** 用户userid。 */
  userId?: string
}

export interface GetActivityListResponse {
  result?: {
    activityName?: string
    activityNameInEnglish?: string
    activityId?: string
  }[]
}

export interface ExecuteCustomApiQuery {
  /** 数据。 */
  data: string
  /** 应用ID。 */
  appType: string
  /** 应用秘钥。 */
  systemToken: string
  /** 语言，取值： */
  language?: string
  /** 服务ID。 */
  serviceId: string
  /** 用户的userid。 */
  userId: string
}

export interface ExecuteCustomApiResponse {
  result?: string
}

export interface SearchActivationCodeQuery {
  /** 访问秘钥。 */
  accessKey?: string
  /** 调用者unionId。 */
  callerUid: string
}

export interface SearchActivationCodeResponse {
  instanceId?: string
  activationCode?: string
  authType?: string
  expireTimeGMT?: string
  status?: number
}

export interface GetSaleUserInfoByUserIdQuery {
  /** 组织ID。 */
  corpId: string
  /** 名称空间。 */
  namespace: string
  /** 用户的userid。 */
  userId: string
}

export interface GetSaleUserInfoByUserIdResponse {
  userName?: string
  userId?: string
  accountId?: number
  corpList?: {
    namespace?: string
    corpId?: string
    corpName?: string
  }[]
}

export interface GetCorpLevelByAccountIdQuery {
  /** 账户ID。 */
  accountId?: string
}

export interface GetCorpLevelByAccountIdResponse {
  result?: string
}

export interface UpdateStatusParams {
  /** 导入序列。 */
  importSequence?: string
  /** 错误行列表。 */
  errorLines?: number[]
  /** 应用ID。 */
  appType?: string
  /** 应用秘钥。 */
  systemToken?: string
  /** 语言，取值： */
  language?: string
  /** 用户的userid。 */
  userId?: string
  /** 状态。 */
  status?: string
}

export interface ValidateOrderUpgradeQuery {
  /** 实例ID。 */
  instanceId?: string
  /** 访问秘钥。 */
  accessKey?: string
  /** 调用者的unionId。 */
  callerUid?: string
}

export interface ValidateOrderUpgradeResponse {
  message?: string
  status?: number
}

export interface ReleaseCommodityQuery {
  /** 实例ID。 */
  instanceId?: string
  /** 访问秘钥。 */
  accessKey?: string
  /** 调用者的unionId。 */
  callerUid?: string
}

export interface ReleaseCommodityResponse {
  message?: string
  success?: unknown
}

export interface ExpireCommodityQuery {
  /** 实例ID。 */
  instanceId?: string
  /** 访问秘钥。 */
  accessKey?: string
  /** 调用者的unionId。 */
  callerUid?: string
}

export interface ExpireCommodityResponse {
  message?: string
  success?: unknown
}

export interface RefundCommodityQuery {
  /** 实例ID。 */
  instanceId?: string
  /** 访问秘钥。 */
  accessKey?: string
  /** 调用者的unionId。 */
  callerUid?: string
}

export interface RefundCommodityResponse {
  message?: string
  success?: unknown
}

export interface SearchEmployeeFieldValuesParams {
  /** 目标组件ID列表，JSON字符串。 */
  targetFieldJson?: string
  /** 表单ID。 */
  formUuid?: string
  /** 应用ID。 */
  appType?: string
  /** 修改时间终止值。 */
  modifiedToTimeGMT?: string
  /** 应用秘钥。 */
  systemToken?: string
  /** 修改时间起始值。 */
  modifiedFromTimeGMT?: string
  /** 语言，取值： */
  language?: string
  /** 根据表单内组件值查询。 */
  searchFieldJson?: string
  /** 根据流程发起人工号查询。 */
  originatorId?: string
  /** 用户的userid。 */
  userId?: string
  /** 创建时间终止值。 */
  createToTimeGMT?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: string
}

export interface SearchEmployeeFieldValuesResponse {
  result?: string
}

export interface DeleteSequenceQuery {
  /** 用户的userid。 */
  userId?: string
  /** 序列。 */
  sequence?: string
  /** 应用秘钥。 */
  systemToken?: string
  /** 语言，取值： */
  language?: string
  /** 应用ID。 */
  appType?: string
}

export interface SaveFormDataParams {
  /** 应用编码。 */
  appType: string
  /** 应用秘钥。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 表单ID。 */
  formUuid: string
  /** 表单数据，示例：```"{\"textField_jcpm6agt\": \"单行\",\"employeeField_jcos0sar\": [\"workno\"]}"``` */
  formDataJson: string
}

export interface SaveFormDataResponse {
  result?: string
}

export interface UpdateFormDataParams {
  /** 应用ID。 */
  appType?: string
  /** 应用秘钥。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 流程实例ID。 */
  formInstanceId: string
  /** 使用最新的表单版本进行更新 */
  useLatestVersion?: unknown
  /** 更新的表单数据，示例：```"{\"textField_jcpm6agt\": \"单行\",\"employeeField_jcos0sar\": [\"workno\"]}"``` */
  updateFormDataJson: string
}

export interface SearchFormDatasParams {
  /** 应用编码。 */
  appType: string
  /** 应用秘钥。在应用数据中获取。 */
  systemToken: string
  /** 用户userid。 */
  userId: string
  /** 语言。取值： */
  language?: string
  /** 表单ID。 */
  formUuid: string
  /** 根据表单内组件值查询，示例值如下： */
  searchFieldJson?: string
  /** 分页参数，当前页。 */
  currentPage?: number
  /** 分页参数，每页显示条数。 */
  pageSize?: number
  /** 根据数据提交人工号查询。 */
  originatorId?: string
  /** 查询创建数据列表的开始时间，格式：`yyyy-MM-dd`。 */
  createFromTimeGMT?: string
  /** 查询创建数据列表的结束时间，格式：`yyyy-MM-dd`。 */
  createToTimeGMT?: string
  /** 查询修改数据列表的开始时间，格式：`yyyy-MM-dd`。 */
  modifiedFromTimeGMT?: string
  /** 查询修改数据列表的结束时间，格式：`yyyy-MM-dd`。 */
  modifiedToTimeGMT?: string
  /** 指定排序字段。 */
  dynamicOrder?: string
}

export interface SearchFormDatasResponse {
  currentPage?: number
  totalCount?: number
  data?: {
    dataId?: number
    formInstanceId?: string
    createdTimeGMT?: string
    modifiedTimeGMT?: string
    formUuid?: string
    modelUuid?: string
    originator?: number
    modifyUser?: number
    formData?: number
    title?: string
    serialNo?: string
    instanceValue?: string
    version?: number
    creatorUserId?: string
    modifierUserId?: string
    sequence?: string
  }[]
}

export interface GetInstancesParams {
  /** 应用ID。 */
  appType: string
  /** 应用密钥。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 表单ID。 */
  formUuid: string
  /**
   * 查询过滤条件，支持2种模式的过滤规则。
   * - 模式1：根据组件值模糊匹配，示例：{"textField_jcr0069m":"danhang","selectField_jcr0069q":"K"}
   * - 模式2: 采用数据管理的查询过滤条件，匹配功能更强大，示例：[{"key":"currentNodeName","value":"步凡","type":"TEXT","operator":"like","componentName":"TextField”}]，详情参考
   */
  searchFieldJson?: string
  /** 根据流程发起人工号查询。 */
  originatorId?: string
  /** 创建时间起始值。 */
  createFromTimeGMT?: string
  /** 创建时间终止值。 */
  createToTimeGMT?: string
  /** 修改时间起始值。 */
  modifiedFromTimeGMT?: string
  /** 修改时间终止值。 */
  modifiedToTimeGMT?: string
  /** 任务ID。 */
  taskId?: string
  /** 实例状态。 */
  instanceStatus?: string
  /** 流程审批结果。 */
  approvedResult?: string
  /** 排序规则，参数值参考[宜搭使用手册](https://www.yuque.com/yida/support/agb8im#CQro8)。 */
  orderConfigJson?: string
}

export interface GetInstancesQuery {
  /** 分页页码。 */
  pageNumber?: number
  /** 分页大小。 */
  pageSize?: number
}

export interface GetInstancesResponse {
  totalCount?: number
  pageNumber?: number
  data?: {
    createTimeGMT?: string
    processInstanceId?: string
    actionExecutor?: number
    approvedResult?: string
    formUuid?: string
    data?: number
    processCode?: string
    modifiedTimeGMT?: string
    originator?: number
    title?: string
    instanceStatus?: string
    version?: number
  }[]
}

export interface DeleteFormDataQuery {
  /** 应用编码。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 表单实例ID。 */
  formInstanceId: string
}

export interface GetInstanceByIdQuery {
  /** 应用ID。 */
  appType: string
  /** 应用秘钥，在应用数据中获取。 */
  systemToken: string
  /** 用户userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
}

export interface GetInstanceByIdResponse {
  createTimeGMT?: string
  processInstanceId?: string
  actionExecutor?: {
    name?: number
    deptName?: string
    userId?: string
    email?: string
  }[]
  approvedResult?: string
  formUuid?: string
  data?: unknown
  modifiedTimeGMT?: string
  processCode?: string
  originator?: {
    name?: number
    deptName?: string
    userId?: string
    email?: string
  }
  title?: string
  instanceStatus?: string
  version?: number
}

export interface StartInstanceParams {
  /** 应用编码。 */
  appType: string
  /** 应用秘钥。在应用数据中获取。 */
  systemToken: string
  /** 用户的userid。 */
  userId: string
  /** 语言，取值： */
  language?: string
  /** 表单唯一编码。 */
  formUuid: string
  /** 表单数据，示例： */
  formDataJson: string
  /** 流程编码。 */
  processCode?: string
  /** 发起人所在部门ID。 */
  departmentId?: string
}

export interface StartInstanceResponse {
  result?: string
}

export interface GetFormDataByIDQuery {
  /** 应用编码。 */
  appType?: string
  /** 应用秘钥。 */
  systemToken?: string
  /** 用户的userid。 */
  userId?: string
  /** 语言，取值： */
  language?: string
}

export interface GetFormDataByIDResponse {
  originator?: {
    userId?: string
    name?: number
    departmentName?: string
    email?: string
  }
  modifiedTimeGMT?: string
  formInstId?: string
  formData?: unknown
}

// funcName: isOldApi
Internal.define({
  '/yida/forms': { GET: { getFormListInApp: false } },
  '/yida/forms/formFields': { GET: { getFieldDefByUuid: false } },
  '/yida/tasks/batches/execute': { POST: { executeBatchTask: false } },
  '/yida/forms/operationsLogs/query': { POST: { listOperationLogs: false } },
  '/yida/forms/remarks/query': { POST: { listFormRemarks: false } },
  '/yida/services/invocationRecords': { GET: { queryServiceRecord: false } },
  '/yida/forms/instances/batchRemove': {
    POST: { batchRemovalByFormInstanceIdList: false },
  },
  '/yida/forms/instances/components': {
    PUT: { batchUpdateFormDataByInstanceId: false },
  },
  '/yida/forms/instances/datas': {
    PUT: { batchUpdateFormDataByInstanceMap: false },
  },
  '/yida/organizations/applications': { GET: { listApplication: false } },
  '/yida/forms/instances/batchSave': { POST: { batchSaveFormData: false } },
  '/yida/forms/instances/advances/query': {
    POST: { searchFormDataSecondGenerationNoTableField: false },
  },
  '/yida/forms/instances/insertOrUpdate': {
    POST: { createOrUpdateFormData: false },
  },
  '/yida/forms/instances/advances/queryAll': {
    POST: { searchFormDataSecondGeneration: false },
  },
  '/yida/forms/instances/ids/query': {
    POST: { batchGetFormDataByIdList: false },
  },
  '/yida/tasks/taskCopies': { GET: { getTaskCopies: false } },
  '/yida/forms/instances/ids/{appType}/{formUuid}': {
    POST: { searchFormDataIdList: false },
  },
  '/yida/forms/innerTables/{formInstanceId}': {
    GET: { listTableDataByFormInstanceIdTableId: false },
  },
  '/yida/tasks/completedTasks/{corpId}/{userId}': {
    GET: { getCorpAccomplishmentTasks: false },
  },
  '/yida/forms/definitions/{appType}/{formUuid}': {
    GET: { getFormComponentDefinitionList: false },
  },
  '/yida/processes/instanceIds': { POST: { getInstanceIdList: false } },
  '/yida/processes/instances/searchWithIds': {
    GET: { getInstancesByIdList: false },
  },
  '/yida/tasks/myCorpSubmission/{userId}': {
    GET: { getMeCorpSubmission: false },
  },
  '/yida/processes/definitions/{processInstanceId}': {
    GET: { getProcessDefinition: false },
  },
  '/yida/corpTasks': { GET: { getCorpTasks: false } },
  '/yida/corpNotifications/{userId}': { GET: { getNotifyMe: false } },
  '/yida/processDefinitions/buttons/{appType}/{processCode}/{activityId}': {
    GET: { getActivityButtonList: false },
  },
  '/yida/authorization/platformResources': {
    GET: { getApplicationAuthorizationServicePlatformResource: false },
  },
  '/yida/processes/instances': {
    PUT: { updateInstance: false },
    DELETE: { deleteInstance: false },
    POST: { getInstances: false },
  },
  '/yida/processes/operationRecords': { GET: { getOperationRecords: false } },
  '/yida/processes/instances/terminate': { PUT: { terminateInstance: false } },
  '/yida/tasks/execute': { POST: { executeTask: false } },
  '/yida/tasks/platformTasks/execute': { POST: { executePlatformTask: false } },
  '/yida/tasks/redirect': { POST: { redirectTask: false } },
  '/yida/apps/temporaryUrls/{appType}': { GET: { getOpenUrl: false } },
  '/yida/forms/remarks': { POST: { saveFormRemark: false } },
  '/yida/apps/navigations': { GET: { listNavigationByFormType: false } },
  '/yida/apps/orderBuy/validate': { GET: { validateOrderBuy: false } },
  '/yida/processes/tasks/getRunningTasks': { GET: { getRunningTasks: false } },
  '/yida/processes/activities': { GET: { getActivityList: false } },
  '/yida/apps/customApi/execute': { POST: { executeCustomApi: false } },
  '/yida/apps/activationCode/information': {
    GET: { searchActivationCode: false },
  },
  '/yida/apps/saleUserInfo': { GET: { getSaleUserInfoByUserId: false } },
  '/yida/apps/corpLevel': { GET: { getCorpLevelByAccountId: false } },
  '/yida/forms/status': { PUT: { updateStatus: false } },
  '/yida/apps/orderUpgrade/validate': { GET: { validateOrderUpgrade: false } },
  '/yida/appAuth/commodities/release': { DELETE: { releaseCommodity: false } },
  '/yida/appAuth/commodities/expire': { PUT: { expireCommodity: false } },
  '/yida/appAuth/commodities/refund': { POST: { refundCommodity: false } },
  '/yida/forms/employeeFields': { POST: { searchEmployeeFieldValues: false } },
  '/yida/forms/deleteSequence': { DELETE: { deleteSequence: false } },
  '/yida/forms/instances': {
    POST: { saveFormData: false },
    PUT: { updateFormData: false },
    DELETE: { deleteFormData: false },
  },
  '/yida/forms/instances/search': { POST: { searchFormDatas: false } },
  '/yida/processes/instancesInfos/{id}': { GET: { getInstanceById: false } },
  '/yida/processes/instances/start': { POST: { startInstance: false } },
  '/yida/forms/instances/{id}': { GET: { getFormDataByID: false } },
})
declare module '../internal' {
  interface Internal {
    /**
     * 获取应用内表单列表信息
     * @see https://developers.dingtalk.com/document/app/depending-on-the-application-id-to-get-the-form-list
     */
    getFormListInApp(
      query: GetFormListInAppQuery,
    ): Promise<GetFormListInAppResponse>
    /**
     * 根据表单ID获取字段信息
     * @see https://developers.dingtalk.com/document/isvapp/get-form-field-information-based-on-form-uuid
     */
    getFieldDefByUuid(
      query: GetFieldDefByUuidQuery,
    ): Promise<GetFieldDefByUuidResponse>
    /**
     * 批量审批
     * @see https://developers.dingtalk.com/document/app/bulk-approval
     */
    executeBatchTask(
      params: ExecuteBatchTaskParams,
    ): Promise<ExecuteBatchTaskResponse>
    /**
     * 查询表单的变更记录
     * @see https://developers.dingtalk.com/document/app/query-the-operation-records-of-a-form
     */
    listOperationLogs(
      params: ListOperationLogsParams,
    ): Promise<ListOperationLogsResponse>
    /**
     * 查询表单实例评论列表
     * @see https://developers.dingtalk.com/document/isvapp/batch-query-of-comments-appropriate-for-form-instances
     */
    listFormRemarks(
      params: ListFormRemarksParams,
    ): Promise<ListFormRemarksResponse>
    /**
     * 查询服务调用记录
     * @see https://developers.dingtalk.com/document/isvapp/execution-records-of-form-service-calls
     */
    queryServiceRecord(
      query: QueryServiceRecordQuery,
    ): Promise<QueryServiceRecordResponse>
    /**
     * 批量删除指定的表单实例
     * @see https://developers.dingtalk.com/document/isvapp/delete-multiple-form-instances
     */
    batchRemovalByFormInstanceIdList(
      params: BatchRemovalByFormInstanceIdListParams,
    ): Promise<void>
    /**
     * 将多条表单实例的指定表单组件更新成指定值
     * @see https://developers.dingtalk.com/document/isvapp/batch-update-of-component-values-in-form-instances
     */
    batchUpdateFormDataByInstanceId(
      params: BatchUpdateFormDataByInstanceIdParams,
    ): Promise<BatchUpdateFormDataByInstanceIdResponse>
    /**
     * 通过表单实例数据批量更新表单实例
     * @see https://developers.dingtalk.com/document/isvapp/batch-update-of-form-instances-through-form-component-data
     */
    batchUpdateFormDataByInstanceMap(
      params: BatchUpdateFormDataByInstanceMapParams,
    ): Promise<BatchUpdateFormDataByInstanceMapResponse>
    /**
     * 获取组织下的宜搭应用列表
     * @see https://developers.dingtalk.com/document/isvapp/query-the-application-list
     */
    listApplication(
      query: ListApplicationQuery,
    ): Promise<ListApplicationResponse>
    /**
     * 批量保存表单实例数据
     * @see https://developers.dingtalk.com/document/isvapp/create-multiple-form-instances
     */
    batchSaveFormData(
      params: BatchSaveFormDataParams,
    ): Promise<BatchSaveFormDataResponse>
    /**
     * 通过高级查询条件查询表单实例数据(不返回子表单组件数据)
     * @see https://developers.dingtalk.com/document/isvapp/obtain-form-instance-data-using-advanced-query-conditions-excluding-subform
     */
    searchFormDataSecondGenerationNoTableField(
      params: SearchFormDataSecondGenerationNoTableFieldParams,
    ): Promise<SearchFormDataSecondGenerationNoTableFieldResponse>
    /**
     * 新增或更新表单实例
     * @see https://developers.dingtalk.com/document/isvapp/add-or-update-form-instances
     */
    createOrUpdateFormData(
      params: CreateOrUpdateFormDataParams,
    ): Promise<CreateOrUpdateFormDataResponse>
    /**
     * 通过高级检索条件查询表单实例
     * @see https://developers.dingtalk.com/document/isvapp/query-form-instances-using-advanced-search-conditions
     */
    searchFormDataSecondGeneration(
      params: SearchFormDataSecondGenerationParams,
    ): Promise<SearchFormDataSecondGenerationResponse>
    /**
     * 批量获取指定表单实例ID列表对应的表单实例数据
     * @see https://developers.dingtalk.com/document/isvapp/obtain-multiple-form-instance-data
     */
    batchGetFormDataByIdList(
      params: BatchGetFormDataByIdListParams,
    ): Promise<BatchGetFormDataByIdListResponse>
    /**
     * 查询抄送我的任务列表（应用维度）
     * @see https://developers.dingtalk.com/document/app/query-copied-my-task-list-application-dimension
     */
    getTaskCopies(query: GetTaskCopiesQuery): Promise<GetTaskCopiesResponse>
    /**
     * 根据条件搜索表单实例 ID 列表
     * @see https://developers.dingtalk.com/document/app/obtain-the-ids-of-multiple-form-instances
     */
    searchFormDataIdList(
      appType: string,
      formUuid: string,
      query: SearchFormDataIdListQuery,
      params: SearchFormDataIdListParams,
    ): Promise<SearchFormDataIdListResponse>
    /**
     * 获取子表单数据
     * @see https://developers.dingtalk.com/document/app/obtain-child-table-component-data
     */
    listTableDataByFormInstanceIdTableId(
      formInstanceId: string,
      query: ListTableDataByFormInstanceIdTableIdQuery,
    ): Promise<ListTableDataByFormInstanceIdTableIdResponse>
    /**
     * 查询已完成任务列表
     * @see https://developers.dingtalk.com/document/app/obtains-the-completed-approval-tasks-in-an-organization
     */
    getCorpAccomplishmentTasks(
      corpId: string,
      userId: string,
      query: GetCorpAccomplishmentTasksQuery,
    ): Promise<GetCorpAccomplishmentTasksResponse>
    /**
     * 获取表单定义
     * @see https://developers.dingtalk.com/document/app/get-a-list-of-form-component-definitions
     */
    getFormComponentDefinitionList(
      appType: string,
      formUuid: string,
      query: GetFormComponentDefinitionListQuery,
    ): Promise<GetFormComponentDefinitionListResponse>
    /**
     * 根据条件搜索流程实例 ID
     * @see https://developers.dingtalk.com/document/app/obtains-a-list-of-instance-ids
     */
    getInstanceIdList(
      query: GetInstanceIdListQuery,
      params: GetInstanceIdListParams,
    ): Promise<GetInstanceIdListResponse>
    /**
     * 根据实例 ID 列表批量获取流程实例详情
     * @see https://developers.dingtalk.com/document/app/queries-multiple-process-instances
     */
    getInstancesByIdList(
      query: GetInstancesByIdListQuery,
    ): Promise<GetInstancesByIdListResponse>
    /**
     * 获取组织内某人提交的任务
     * @see https://developers.dingtalk.com/document/app/obtains-the-tasks-submitted-by-someone-in-an-organization
     */
    getMeCorpSubmission(
      userId: string,
      query: GetMeCorpSubmissionQuery,
    ): Promise<GetMeCorpSubmissionResponse>
    /**
     * 获取流程定义
     * @see https://developers.dingtalk.com/document/isvapp-server/obtain-process-definition
     */
    getProcessDefinition(
      processInstanceId: string,
      query: GetProcessDefinitionQuery,
    ): Promise<GetProcessDefinitionResponse>
    /**
     * 查询待办任务列表
     * @see https://developers.dingtalk.com/document/app/query-tasks-from-the-organization-dimension
     */
    getCorpTasks(query: GetCorpTasksQuery): Promise<GetCorpTasksResponse>
    /**
     * 查询抄送我的任务列表（企业维度）
     * @see https://developers.dingtalk.com/document/app/get-notifications-sent-to-users
     */
    getNotifyMe(
      userId: string,
      query: GetNotifyMeQuery,
    ): Promise<GetNotifyMeResponse>
    /**
     * 获取流程节点按钮列表
     * @see https://developers.dingtalk.com/document/isvapp-server/obtain-a-list-of-process-node-buttons-1
     */
    getActivityButtonList(
      appType: string,
      processCode: string,
      activityId: string,
      query: GetActivityButtonListQuery,
    ): Promise<GetActivityButtonListResponse>
    /**
     * 获取平台服务资源
     * @see https://developers.dingtalk.com/document/isvapp-server/obtain-platform-service-resources
     */
    getApplicationAuthorizationServicePlatformResource(
      query: GetApplicationAuthorizationServicePlatformResourceQuery,
    ): Promise<GetApplicationAuthorizationServicePlatformResourceResponse>
    /**
     * 更新流程实例
     * @see https://developers.dingtalk.com/document/isvapp-server/update-process-instance-1
     */
    updateInstance(params: UpdateInstanceParams): Promise<void>
    /**
     * 删除流程实例
     * @see https://developers.dingtalk.com/document/app/delete-process-instance
     */
    deleteInstance(query: DeleteInstanceQuery): Promise<void>
    /**
     * 获取审批记录
     * @see https://developers.dingtalk.com/document/app/queries-an-approval-record
     */
    getOperationRecords(
      query: GetOperationRecordsQuery,
    ): Promise<GetOperationRecordsResponse>
    /**
     * 终止流程实例
     * @see https://developers.dingtalk.com/document/app/terminate-a-process-instance
     */
    terminateInstance(query: TerminateInstanceQuery): Promise<void>
    /**
     * 执行审批任务
     * @see https://developers.dingtalk.com/document/app/execute-approval-tasks
     */
    executeTask(params: ExecuteTaskParams): Promise<void>
    /**
     * 执行宜搭平台的审批任务
     * @see https://developers.dingtalk.com/document/isvapp-server/execute-appropriate-approval-tasks
     */
    executePlatformTask(params: ExecutePlatformTaskParams): Promise<void>
    /**
     * 执行转交任务
     * @see https://developers.dingtalk.com/document/app/transfer-tasks
     */
    redirectTask(params: RedirectTaskParams): Promise<void>
    /**
     * 附件地址转临时免登地址
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-temporary-free-access-address-of-yixian-accessories
     */
    getOpenUrl(
      appType: string,
      query: GetOpenUrlQuery,
    ): Promise<GetOpenUrlResponse>
    /**
     * 提交表单/流程实例下的评论
     * @see https://developers.dingtalk.com/document/app/submit-comment
     */
    saveFormRemark(
      params: SaveFormRemarkParams,
    ): Promise<SaveFormRemarkResponse>
    /**
     * 获取应用下的页面列表
     * @see https://developers.dingtalk.com/document/isvapp-server/obtains-the-page-list-under-an-application
     */
    listNavigationByFormType(
      query: ListNavigationByFormTypeQuery,
    ): Promise<ListNavigationByFormTypeResponse>
    /**
     * 多渠道新购校验
     * @see https://developers.dingtalk.com/document/isvapp-server/multi-channel-new-purchase-verification
     */
    validateOrderBuy(
      query: ValidateOrderBuyQuery,
    ): Promise<ValidateOrderBuyResponse>
    /**
     * 查询流程运行任务（vpc）
     * @see https://developers.dingtalk.com/document/app/query-process-running-tasks-vpc
     */
    getRunningTasks(
      query: GetRunningTasksQuery,
    ): Promise<GetRunningTasksResponse>
    /**
     * 获取流程设计的节点信息
     * @see https://developers.dingtalk.com/document/isvapp-server/obtain-the-information-about-the-nodes-in-process-design-1
     */
    getActivityList(
      query: GetActivityListQuery,
    ): Promise<GetActivityListResponse>
    /**
     * 执行自定义API
     * @see https://developers.dingtalk.com/document/isvapp-server/run-custom-api
     */
    executeCustomApi(
      query: ExecuteCustomApiQuery,
    ): Promise<ExecuteCustomApiResponse>
    /**
     * 查询激活码
     * @see https://developers.dingtalk.com/document/isvapp-server/query-activation-code
     */
    searchActivationCode(
      query: SearchActivationCodeQuery,
    ): Promise<SearchActivationCodeResponse>
    /**
     * 查询销售用户信息
     * @see https://developers.dingtalk.com/document/isvapp-server/query-sales-user-information
     */
    getSaleUserInfoByUserId(
      query: GetSaleUserInfoByUserIdQuery,
    ): Promise<GetSaleUserInfoByUserIdResponse>
    /**
     * 查询企业级别
     * @see https://developers.dingtalk.com/document/isvapp-server/query-enterprise-level
     */
    getCorpLevelByAccountId(
      query: GetCorpLevelByAccountIdQuery,
    ): Promise<GetCorpLevelByAccountIdResponse>
    /**
     * 更新状态
     * @see https://developers.dingtalk.com/document/isvapp-server/update-status
     */
    updateStatus(params: UpdateStatusParams): Promise<void>
    /**
     * 校验订单的升级
     * @see https://developers.dingtalk.com/document/isvapp-server/verification-order-upgrade
     */
    validateOrderUpgrade(
      query: ValidateOrderUpgradeQuery,
    ): Promise<ValidateOrderUpgradeResponse>
    /**
     * 发布商品
     * @see https://developers.dingtalk.com/document/isvapp-server/release-products
     */
    releaseCommodity(
      query: ReleaseCommodityQuery,
    ): Promise<ReleaseCommodityResponse>
    /**
     * 使商品过期
     * @see https://developers.dingtalk.com/document/isvapp-server/make-goods-expire
     */
    expireCommodity(
      query: ExpireCommodityQuery,
    ): Promise<ExpireCommodityResponse>
    /**
     * 退还商品
     * @see https://developers.dingtalk.com/document/isvapp-server/refund-of-goods
     */
    refundCommodity(
      query: RefundCommodityQuery,
    ): Promise<RefundCommodityResponse>
    /**
     * 搜索表单中指定人员组件的值
     * @see https://developers.dingtalk.com/document/app/gets-the-value-of-the-employee-component
     */
    searchEmployeeFieldValues(
      params: SearchEmployeeFieldValuesParams,
    ): Promise<SearchEmployeeFieldValuesResponse>
    /**
     * 删除序列
     * @see https://developers.dingtalk.com/document/isvapp-server/delete-sequence
     */
    deleteSequence(query: DeleteSequenceQuery): Promise<void>
    /**
     * 新增表单实例
     * @see https://developers.dingtalk.com/document/app/save-form-data
     */
    saveFormData(params: SaveFormDataParams): Promise<SaveFormDataResponse>
    /**
     * 更新表单实例
     * @see https://developers.dingtalk.com/document/orgapp/update-form-data
     */
    updateFormData(params: UpdateFormDataParams): Promise<void>
    /**
     * 根据条件搜索表单实例详情列表,对应原searchFormDatas
     * @see https://developers.dingtalk.com/document/app/querying-form-instance-data
     */
    searchFormDatas(
      params: SearchFormDatasParams,
    ): Promise<SearchFormDatasResponse>
    /**
     * 根据搜索条件获取流程表单实例详情
     * @see https://developers.dingtalk.com/document/app/obtain-process-instance
     */
    getInstances(
      query: GetInstancesQuery,
      params: GetInstancesParams,
    ): Promise<GetInstancesResponse>
    /**
     * 删除表单实例
     * @see https://developers.dingtalk.com/document/app/delete-form-data
     */
    deleteFormData(query: DeleteFormDataQuery): Promise<void>
    /**
     * 根据实例 ID 获取流程实例详情
     * @see https://developers.dingtalk.com/document/app/queries-a-process-instance-based-on-its-id
     */
    getInstanceById(
      id: string,
      query: GetInstanceByIdQuery,
    ): Promise<GetInstanceByIdResponse>
    /**
     * 发起新的流程实例
     * @see https://developers.dingtalk.com/document/app/initiate-the-approval-process
     */
    startInstance(params: StartInstanceParams): Promise<StartInstanceResponse>
    /**
     * 根据表单 ID 查询实例详情
     * @see https://developers.dingtalk.com/document/app/query-form-data
     */
    getFormDataByID(
      id: string,
      query: GetFormDataByIDQuery,
    ): Promise<GetFormDataByIDResponse>
  }
}
