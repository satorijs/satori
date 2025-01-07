import { AllowedRollbaclkTaskItemType, AuditLogDetail, AuditLogEsField, Criterion, EnvironmentVariable, EnvironmentVariableFilter, ObjectMeta, RecordGroupByItem, RecordResult, RoleMember, SearchObjectParam, Sort, UserTask } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 查询审计日志列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/audit_log_list
     */
    auditLogListApaasApplicationAuditLog(namespace: string, query?: AuditLogListApaasApplicationAuditLogQuery): Promise<AuditLogListApaasApplicationAuditLogResponse>
    /**
     * 查询审计日志详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/get
     */
    getApaasApplicationAuditLog(namespace: string, query?: GetApaasApplicationAuditLogQuery): Promise<GetApaasApplicationAuditLogResponse>
    /**
     * 批量删除角色成员授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/batch_remove_authorization
     */
    batchRemoveAuthorizationApaasApplicationRoleMember(namespace: string, role_api_name: string, body: BatchRemoveAuthorizationApaasApplicationRoleMemberRequest): Promise<void>
    /**
     * 批量创建角色成员授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/batch_create_authorization
     */
    batchCreateAuthorizationApaasApplicationRoleMember(namespace: string, role_api_name: string, body: BatchCreateAuthorizationApaasApplicationRoleMemberRequest): Promise<void>
    /**
     * 查询角色成员信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/get
     */
    getApaasApplicationRoleMember(namespace: string, role_api_name: string, query?: GetApaasApplicationRoleMemberQuery): Promise<GetApaasApplicationRoleMemberResponse>
    /**
     * 批量删除记录权限用户授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-record_permission-member/batch_remove_authorization
     */
    batchRemoveAuthorizationApaasApplicationRecordPermissionMember(namespace: string, record_permission_api_name: string, body: BatchRemoveAuthorizationApaasApplicationRecordPermissionMemberRequest): Promise<void>
    /**
     * 批量创建记录权限用户授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-record_permission-member/batch_create_authorization
     */
    batchCreateAuthorizationApaasApplicationRecordPermissionMember(namespace: string, record_permission_api_name: string, body: BatchCreateAuthorizationApaasApplicationRecordPermissionMemberRequest): Promise<void>
    /**
     * 执行 OQL
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object/oql_query
     */
    oqlQueryApaasApplicationObject(namespace: string, body: OqlQueryApaasApplicationObjectRequest): Promise<OqlQueryApaasApplicationObjectResponse>
    /**
     * 搜索记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object/search
     */
    searchApaasApplicationObject(namespace: string, body: SearchApaasApplicationObjectRequest): Promise<SearchApaasApplicationObjectResponse>
    /**
     * 获取记录详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/query
     */
    queryApaasApplicationObjectRecord(namespace: string, object_api_name: string, id: string, body: QueryApaasApplicationObjectRecordRequest): Promise<QueryApaasApplicationObjectRecordResponse>
    /**
     * 编辑记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/patch
     */
    patchApaasApplicationObjectRecord(namespace: string, object_api_name: string, id: string, body: PatchApaasApplicationObjectRecordRequest): Promise<void>
    /**
     * 删除记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/delete
     */
    deleteApaasApplicationObjectRecord(namespace: string, object_api_name: string, id: string): Promise<void>
    /**
     * 新建记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/create
     */
    createApaasApplicationObjectRecord(namespace: string, object_api_name: string, body: CreateApaasApplicationObjectRecordRequest): Promise<CreateApaasApplicationObjectRecordResponse>
    /**
     * 批量编辑记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_update
     */
    batchUpdateApaasApplicationObjectRecord(namespace: string, object_api_name: string, body: BatchUpdateApaasApplicationObjectRecordRequest): Promise<BatchUpdateApaasApplicationObjectRecordResponse>
    /**
     * 查询记录列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_query
     */
    batchQueryApaasApplicationObjectRecord(namespace: string, object_api_name: string, body: BatchQueryApaasApplicationObjectRecordRequest): Promise<BatchQueryApaasApplicationObjectRecordResponse>
    /**
     * 批量删除记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_delete
     */
    batchDeleteApaasApplicationObjectRecord(namespace: string, object_api_name: string, body: BatchDeleteApaasApplicationObjectRecordRequest): Promise<BatchDeleteApaasApplicationObjectRecordResponse>
    /**
     * 批量新建记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_create
     */
    batchCreateApaasApplicationObjectRecord(namespace: string, object_api_name: string, body: BatchCreateApaasApplicationObjectRecordRequest): Promise<BatchCreateApaasApplicationObjectRecordResponse>
    /**
     * 执行函数
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-function/invoke
     */
    invokeApaasApplicationFunction(namespace: string, function_api_name: string, body: InvokeApaasApplicationFunctionRequest): Promise<InvokeApaasApplicationFunctionResponse>
    /**
     * 查询环境变量列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-environment_variable/query
     */
    queryApaasApplicationEnvironmentVariable(namespace: string, body: QueryApaasApplicationEnvironmentVariableRequest): Promise<QueryApaasApplicationEnvironmentVariableResponse>
    /**
     * 查询环境变量详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-environment_variable/get
     */
    getApaasApplicationEnvironmentVariable(namespace: string, environment_variable_api_name: string): Promise<GetApaasApplicationEnvironmentVariableResponse>
    /**
     * 发起流程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-flow/execute
     */
    executeApaasApplicationFlow(namespace: string, flow_id: string, body: ExecuteApaasApplicationFlowRequest): Promise<ExecuteApaasApplicationFlowResponse>
    /**
     * 查询人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/query
     */
    queryApaasUserTask(body: QueryApaasUserTaskRequest): Promise<QueryApaasUserTaskResponse>
    /**
     * 同意人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/agree
     */
    agreeApaasApprovalTask(approval_task_id: string, body: AgreeApaasApprovalTaskRequest): Promise<void>
    /**
     * 拒绝人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/reject
     */
    rejectApaasApprovalTask(approval_task_id: string, body: RejectApaasApprovalTaskRequest): Promise<void>
    /**
     * 转交人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/transfer
     */
    transferApaasApprovalTask(approval_task_id: string, body: TransferApaasApprovalTaskRequest): Promise<void>
    /**
     * 人工任务加签
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/add_assignee
     */
    addAssigneeApaasApprovalTask(approval_task_id: string, body: AddAssigneeApaasApprovalTaskRequest): Promise<void>
    /**
     * 抄送人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/cc
     */
    ccApaasUserTask(task_id: string, body: CcApaasUserTaskRequest): Promise<void>
    /**
     * 催办人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/expediting
     */
    expeditingApaasUserTask(task_id: string, body: ExpeditingApaasUserTaskRequest): Promise<void>
    /**
     * 撤销人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_instance/cancel
     */
    cancelApaasApprovalInstance(approval_instance_id: string, body: CancelApaasApprovalInstanceRequest): Promise<void>
    /**
     * 查询人工任务可退回的位置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/rollback_points
     */
    rollbackPointsApaasUserTask(task_id: string, body: RollbackPointsApaasUserTaskRequest): Promise<RollbackPointsApaasUserTaskResponse>
    /**
     * 退回人工任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/rollback
     */
    rollbackApaasUserTask(task_id: string, body: RollbackApaasUserTaskRequest): Promise<void>
    /**
     * 基于人工任务发起群聊
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/chat_group
     */
    chatGroupApaasUserTask(task_id: string, body: ChatGroupApaasUserTaskRequest): Promise<ChatGroupApaasUserTaskResponse>
  }
}

export interface AuditLogListApaasApplicationAuditLogQuery {
  /** 分页大小 */
  page_size: string
  /** 翻页数量 */
  offset: string
  /** 模糊查询 */
  quick_query?: string
  /** 查询时间范围：开始时间 */
  from: string
  /** 查询时间范围：结束时间 */
  to: string
  /** 日志类型：10001-企业管理日志，10003-应用管理日志，10002-登录日志 */
  log_type: string
  /** 日志查询：筛选能力 */
  filter?: string
  /** 日志列表：选择展示行信息，例如["opTime","appName","eventName","clientIP","operator","status"] */
  columns?: string[]
  /** 查询排序字段：可选项为操作时间（opTime） */
  sort_by?: string
  /** 查询排序：按时间从小到大使用 asc */
  sort_order?: string
  /** 应用类型，0为apaas类型，1为aily类型 */
  app_type?: string
}

export interface GetApaasApplicationAuditLogQuery {
  /** 审计日志ID信息 */
  log_id: string
}

export interface BatchRemoveAuthorizationApaasApplicationRoleMemberRequest {
  /** 需要删除的用户 ID 列表 */
  user_ids?: string[]
  /** 需要删除的部门 ID 列表 */
  department_ids?: string[]
}

export interface BatchCreateAuthorizationApaasApplicationRoleMemberRequest {
  /** 需要新增的用户 ID 列表 */
  user_ids?: string[]
  /** 需要新增的部门 ID 列表 */
  department_ids?: string[]
}

export interface GetApaasApplicationRoleMemberQuery {
  /** 是否需要公式的展示名称，便于前端展示 */
  need_display_name?: boolean
  /** 是否使用 APIID字段作为出入参，默认值为 false */
  use_api_id?: boolean
}

export interface BatchRemoveAuthorizationApaasApplicationRecordPermissionMemberRequest {
  /** 需要删除的用户 ID 列表 */
  user_ids?: string[]
}

export interface BatchCreateAuthorizationApaasApplicationRecordPermissionMemberRequest {
  /** 需要新增的用户 ID 列表 */
  user_ids?: string[]
}

export interface OqlQueryApaasApplicationObjectRequest {
  /** 待执行的 OQL 语句（关于支持的关键词及操作符，详见查看） */
  query: string
  /** 用于指定 OQL 语句中匿名参数的具体值 */
  args?: string
  /** 用于指定 OQL 语句中具名参数的具体值 */
  named_args?: string
}

export interface SearchApaasApplicationObjectRequest {
  /** 搜索词 */
  q?: string
  /** 搜索对象范围 */
  search_objects?: SearchObjectParam[]
  /** 分页参数，第一次搜索时为空，需要分页查询时使用 SearchRecordsResponse 中的结果 */
  page_token?: string
  /** 返回数量，默认为50，最大不超过2000 */
  page_size?: string
  /** 返回元数据枚举值 */
  metadata?: 'Label' | 'SearchLayout'
}

export interface QueryApaasApplicationObjectRecordRequest {
  /** 需要获取的字段，使用字段唯一标识符进行查询，关联字段可使用 . 进行下钻 */
  select?: string[]
}

export interface PatchApaasApplicationObjectRecordRequest {
  /** 创建对象使用的数据，键为字段 API 名称，值为字段值，格式可参考字段值格式 */
  record: string
}

export interface CreateApaasApplicationObjectRecordRequest {
  /** 创建对象使用的数据，键为字段 API 名称，值为字段值，格式可参考字段值格式 */
  record: string
}

export interface BatchUpdateApaasApplicationObjectRecordRequest {
  /** 记录详情列表，格式为 List<Map<string, ANY>>，操作记录数上限为 500 条 */
  records: string
}

export interface BatchQueryApaasApplicationObjectRecordRequest {
  /** 需要获取的字段，使用字段唯一标识符进行查询，关联字段可使用「.」进行下钻 */
  select: string[]
  /** 筛选条件，通过 JSON 格式指定条件 */
  filter?: Criterion
  /** 排序参数，通过 JSON 格式指定条件。其中， field 为参与排序字段，direction 为排序方向，多个条件按其在数组中的顺序生效。 */
  order_by?: Sort[]
  /** 聚合参数，通过 JSON 格式指定条件。其中， field 为参与聚合的字段。 */
  group_by?: RecordGroupByItem[]
  /** 分页的 Token 值，由服务端生成，可从 Response 中的 next_page_token 参数中获取。注意：第一页需填写空字符串 ""，且不能与 OFFSET 一起使用。 */
  page_token?: string
  /** 是否使用 page_token 功能。为 True 时将使用 page_token 的值作为起始位置查询记录，并且会在 Response 中返回 next_page_token 。默认为 False 。 */
  use_page_token?: boolean
  /** 期望服务端返回的记录条数，上限 500 条。不填则取默认值，默认值为 500。 */
  page_size?: number
  /** 返回记录的偏移量，默认为 0 ，即从查询到的第一条记录开始返回。offset 较大时查询性能较差，可能引起接口响应超时，拉取全部记录时建议使用 ID 游标分页，具体见 ID 游标分页说明 */
  offset?: number
  /** 是否返回符合条件的记录总数（Total）。默认为 False，不返回记录总数。 */
  need_total_count?: boolean
}

export interface BatchDeleteApaasApplicationObjectRecordRequest {
  /** 记录 ID 列表，操作记录数上限为 500 */
  ids: string[]
}

export interface BatchCreateApaasApplicationObjectRecordRequest {
  /** 记录详情列表，格式为 List<Map<string, ANY>>，操作记录数上限为 500 条 */
  records: string
}

export interface InvokeApaasApplicationFunctionRequest {
  /** 函数输入参数（JSON 序列化后的字符串） */
  params?: string
}

export interface QueryApaasApplicationEnvironmentVariableRequest {
  /** 过滤条件 */
  filter?: EnvironmentVariableFilter
  /** 限制的条数，默认为 500，不可超过 500 */
  limit?: number
  /** 返回记录的偏移量，默认为 0，即从查询到的第一个记录开始返回 */
  offset?: number
}

export interface ExecuteApaasApplicationFlowRequest {
  /** 是否异步执行 */
  is_async?: boolean
  /** 幂等信息 */
  idempotent_key?: string
  /** 循环信息 */
  loop_masks?: string[]
  /** 流程入参 */
  params?: string
  /** 操作人 */
  operator: string
}

export interface QueryApaasUserTaskRequest {
  /** 类型 */
  type?: string
  /** 来源 */
  source?: string
  /** 获取条数 */
  limit?: string
  /** 起始位置 */
  offset?: string
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
  /** 流程apiid列表 */
  api_ids?: string[]
  /** kunlunUserID */
  kunlun_user_id: string
}

export interface AgreeApaasApprovalTaskRequest {
  /** 操作人id */
  user_id: string
  /** 审批意见 */
  opinion?: string
}

export interface RejectApaasApprovalTaskRequest {
  /** 操作用户id */
  user_id: string
  /** 审批意见 */
  opinion?: string
}

export interface TransferApaasApprovalTaskRequest {
  /** 操作人id */
  user_id: string
  /** 原审批人id */
  from_user_ids?: string[]
  /** 新审批人id */
  to_user_ids?: string[]
  /** 审批意见 */
  opinion?: string
}

export interface AddAssigneeApaasApprovalTaskRequest {
  /** 操作人id */
  user_id: string
  /** 审批人列表 */
  approvers?: string[]
  /** 加签类型 */
  add_assignee_type?: string
  /** 加签原因 */
  opinion?: string
}

export interface CcApaasUserTaskRequest {
  /** 抄送人的kunlunID列表 */
  cc_user_ids: string[]
  /** 操作人kunlunUserID */
  operator_user_id: string
}

export interface ExpeditingApaasUserTaskRequest {
  /** 操作人kunlunUserID */
  operator_user_id: string
  /** 催办人的kunlunID列表 */
  expediting_user_ids: string[]
  /** 催办理由 */
  opinion?: string
}

export interface CancelApaasApprovalInstanceRequest {
  /** 操作用户id */
  user_id: string
  /** 撤销原因 */
  opinion: string
}

export interface RollbackPointsApaasUserTaskRequest {
  /** 操作人kunlunUserID */
  operator_user_id: string
}

export interface RollbackApaasUserTaskRequest {
  /** 操作人kunlunUserID */
  operator_user_id: string
  /** 退回到的任务ID */
  to_task_id: string
  /** 退回原因 */
  opinion: string
}

export interface ChatGroupApaasUserTaskRequest {
  /** 操作人kunlunUserID */
  operator_user_id: string
  /** 要邀请进群用户ID列表 */
  invite_user_ids?: string[]
  /** 要拉入的群ID，为空则新建群 */
  chat_id?: string
  /** 要加入的群名称，当chat_id为空时用该名称创建群聊 */
  chat_name?: string
}

export interface AuditLogListApaasApplicationAuditLogResponse {
  /** 审计日志查询结果列表详情信息 */
  items?: AuditLogEsField[]
  /** 审计日志查询总条数 */
  total?: string
}

export interface GetApaasApplicationAuditLogResponse {
  /** 审计日志详情信息 */
  data?: AuditLogDetail
}

export interface GetApaasApplicationRoleMemberResponse {
  /** 角色成员 */
  role_member?: RoleMember
}

export interface OqlQueryApaasApplicationObjectResponse {
  /** 每一列的标题 */
  columns: string[]
  /** 每一行的值，以「key-value」的形式返回 */
  rows: string
}

export interface SearchApaasApplicationObjectResponse {
  /** 搜索结果列表 */
  records?: string
  /** 是否还有更多数据 */
  has_more?: boolean
  /** 分页标记，当 HasMore 为 true 时，会同时返回新的 NextPageToken */
  next_page_token?: string
  /** 对象信息 */
  objects?: ObjectMeta[]
}

export interface QueryApaasApplicationObjectRecordResponse {
  /** 记录详情,格式为 Map<string, ANY> */
  item: string
}

export interface CreateApaasApplicationObjectRecordResponse {
  /** 记录 ID */
  id?: string
}

export interface BatchUpdateApaasApplicationObjectRecordResponse {
  /** 处理结果 */
  items?: RecordResult[]
}

export interface BatchQueryApaasApplicationObjectRecordResponse {
  /** 符合条件的记录列表 */
  items: string
  /** 符合条件的记录数 */
  total?: number
  /** 下一页的起始位置 Token ，访问至末尾时不返回 */
  next_page_token?: string
  /** 是否还有数据 */
  has_more?: boolean
}

export interface BatchDeleteApaasApplicationObjectRecordResponse {
  /** 处理结果 */
  items?: RecordResult[]
}

export interface BatchCreateApaasApplicationObjectRecordResponse {
  /** 处理结果 */
  items?: RecordResult[]
}

export interface InvokeApaasApplicationFunctionResponse {
  /** 函数执行的返回结果（JSON 序列化后的字符串） */
  result?: string
}

export interface QueryApaasApplicationEnvironmentVariableResponse {
  /** 环境变量列表 */
  items?: EnvironmentVariable[]
  /** 符合查询条件的环境变量的总数 */
  total: number
}

export interface GetApaasApplicationEnvironmentVariableResponse {
  /** 环境变量详情 */
  item?: EnvironmentVariable
}

export interface ExecuteApaasApplicationFlowResponse {
  /** 状态 */
  status?: string
  /** 输出参数 */
  out_params?: string
  /** 执行id */
  execution_id?: string
  /** 错误信息 */
  error_msg?: string
  /** code */
  code?: string
}

export interface QueryApaasUserTaskResponse {
  /** 总任务条数 */
  count?: string
  /** 任务信息 */
  tasks?: UserTask[]
}

export interface RollbackPointsApaasUserTaskResponse {
  /** 任务列表 */
  tasks?: AllowedRollbaclkTaskItemType[]
}

export interface ChatGroupApaasUserTaskResponse {
  /** 创建的群聊ID */
  chat_id?: string
}

Internal.define({
  '/apaas/v1/applications/{namespace}/audit_log/audit_log_list': {
    GET: 'auditLogListApaasApplicationAuditLog',
  },
  '/apaas/v1/applications/{namespace}/audit_log': {
    GET: 'getApaasApplicationAuditLog',
  },
  '/apaas/v1/applications/{namespace}/roles/{role_api_name}/member/batch_remove_authorization': {
    POST: 'batchRemoveAuthorizationApaasApplicationRoleMember',
  },
  '/apaas/v1/applications/{namespace}/roles/{role_api_name}/member/batch_create_authorization': {
    POST: 'batchCreateAuthorizationApaasApplicationRoleMember',
  },
  '/apaas/v1/applications/{namespace}/roles/{role_api_name}/member': {
    GET: 'getApaasApplicationRoleMember',
  },
  '/apaas/v1/applications/{namespace}/record_permissions/{record_permission_api_name}/member/batch_remove_authorization': {
    POST: 'batchRemoveAuthorizationApaasApplicationRecordPermissionMember',
  },
  '/apaas/v1/applications/{namespace}/record_permissions/{record_permission_api_name}/member/batch_create_authorization': {
    POST: 'batchCreateAuthorizationApaasApplicationRecordPermissionMember',
  },
  '/apaas/v1/applications/{namespace}/objects/oql_query': {
    POST: 'oqlQueryApaasApplicationObject',
  },
  '/apaas/v1/applications/{namespace}/objects/search': {
    POST: 'searchApaasApplicationObject',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/{id}/query': {
    POST: 'queryApaasApplicationObjectRecord',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/{id}': {
    PATCH: 'patchApaasApplicationObjectRecord',
    DELETE: 'deleteApaasApplicationObjectRecord',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records': {
    POST: 'createApaasApplicationObjectRecord',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_update': {
    PATCH: 'batchUpdateApaasApplicationObjectRecord',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_query': {
    POST: 'batchQueryApaasApplicationObjectRecord',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_delete': {
    DELETE: 'batchDeleteApaasApplicationObjectRecord',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_create': {
    POST: 'batchCreateApaasApplicationObjectRecord',
  },
  '/apaas/v1/applications/{namespace}/functions/{function_api_name}/invoke': {
    POST: 'invokeApaasApplicationFunction',
  },
  '/apaas/v1/applications/{namespace}/environment_variables/query': {
    POST: 'queryApaasApplicationEnvironmentVariable',
  },
  '/apaas/v1/applications/{namespace}/environment_variables/{environment_variable_api_name}': {
    GET: 'getApaasApplicationEnvironmentVariable',
  },
  '/apaas/v1/applications/{namespace}/flows/{flow_id}/execute': {
    POST: 'executeApaasApplicationFlow',
  },
  '/apaas/v1/user_task/query': {
    POST: 'queryApaasUserTask',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/agree': {
    POST: 'agreeApaasApprovalTask',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/reject': {
    POST: 'rejectApaasApprovalTask',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/transfer': {
    POST: 'transferApaasApprovalTask',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/add_assignee': {
    POST: 'addAssigneeApaasApprovalTask',
  },
  '/apaas/v1/user_tasks/{task_id}/cc': {
    POST: 'ccApaasUserTask',
  },
  '/apaas/v1/user_tasks/{task_id}/expediting': {
    POST: 'expeditingApaasUserTask',
  },
  '/apaas/v1/approval_instances/{approval_instance_id}/cancel': {
    POST: 'cancelApaasApprovalInstance',
  },
  '/apaas/v1/user_tasks/{task_id}/rollback_points': {
    POST: 'rollbackPointsApaasUserTask',
  },
  '/apaas/v1/user_tasks/{task_id}/rollback': {
    POST: 'rollbackApaasUserTask',
  },
  '/apaas/v1/user_tasks/{task_id}/chat_group': {
    POST: 'chatGroupApaasUserTask',
  },
})
