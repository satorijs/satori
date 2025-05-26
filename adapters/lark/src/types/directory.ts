import { AbnormalRecord, CollaborationRule, CollaborationRuleEntities, CollaborationTenant, CreateDepartment, CreateEmployee, CreateEmployeeOptions, DeleteEmployeeOptions, Department, DepartmentIdConvertResult, EmployeeEntity, EmployeeIdConvertResult, MultiFilterCondition, PageCondition, PageResponse, ResurrectEmployeeOptions, SetEmployeePreResigned, ShareDepartment, ShareGroup, ShareUser, UpdateDepartment, UpdateEmployee, UpsertUserDepartmentSortInfo } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建员工
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/create
     */
    createDirectoryEmployee(body: CreateDirectoryEmployeeRequest, query?: CreateDirectoryEmployeeQuery): Promise<CreateDirectoryEmployeeResponse>
    /**
     * 更新员工
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/patch
     */
    patchDirectoryEmployee(employee_id: string, body: PatchDirectoryEmployeeRequest, query?: PatchDirectoryEmployeeQuery): Promise<void>
    /**
     * 离职员工
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/delete
     */
    deleteDirectoryEmployee(employee_id: string, body: DeleteDirectoryEmployeeRequest, query?: DeleteDirectoryEmployeeQuery): Promise<void>
    /**
     * 恢复离职员工
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/resurrect
     */
    resurrectDirectoryEmployee(employee_id: string, body: ResurrectDirectoryEmployeeRequest, query?: ResurrectDirectoryEmployeeQuery): Promise<void>
    /**
     * 更新在职员工为待离职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/to_be_resigned
     */
    toBeResignedDirectoryEmployee(employee_id: string, body: ToBeResignedDirectoryEmployeeRequest, query?: ToBeResignedDirectoryEmployeeQuery): Promise<void>
    /**
     * 更新待离职成员为在职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/regular
     */
    regularDirectoryEmployee(employee_id: string, query?: RegularDirectoryEmployeeQuery): Promise<void>
    /**
     * 批量获取员工信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/mget
     */
    mgetDirectoryEmployee(body: MgetDirectoryEmployeeRequest, query?: MgetDirectoryEmployeeQuery): Promise<MgetDirectoryEmployeeResponse>
    /**
     * 批量获取员工列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/filter
     */
    filterDirectoryEmployee(body: FilterDirectoryEmployeeRequest, query?: FilterDirectoryEmployeeQuery): Promise<FilterDirectoryEmployeeResponse>
    /**
     * 搜索员工
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/search
     */
    searchDirectoryEmployee(body: SearchDirectoryEmployeeRequest, query?: SearchDirectoryEmployeeQuery): Promise<SearchDirectoryEmployeeResponse>
    /**
     * 转换员工 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/idconvert
     */
    idconvertDirectoryEmployee(body: IdconvertDirectoryEmployeeRequest, query?: IdconvertDirectoryEmployeeQuery): Promise<IdconvertDirectoryEmployeeResponse>
    /**
     * 创建部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/create
     */
    createDirectoryDepartment(body: CreateDirectoryDepartmentRequest, query?: CreateDirectoryDepartmentQuery): Promise<CreateDirectoryDepartmentResponse>
    /**
     * 更新部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/patch
     */
    patchDirectoryDepartment(department_id: string, body: PatchDirectoryDepartmentRequest, query?: PatchDirectoryDepartmentQuery): Promise<void>
    /**
     * 删除部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/delete
     */
    deleteDirectoryDepartment(department_id: string, query?: DeleteDirectoryDepartmentQuery): Promise<void>
    /**
     * 批量获取部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/mget
     */
    mgetDirectoryDepartment(body: MgetDirectoryDepartmentRequest, query?: MgetDirectoryDepartmentQuery): Promise<MgetDirectoryDepartmentResponse>
    /**
     * 批量获取部门列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/filter
     */
    filterDirectoryDepartment(body: FilterDirectoryDepartmentRequest, query?: FilterDirectoryDepartmentQuery): Promise<FilterDirectoryDepartmentResponse>
    /**
     * 搜索部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/search
     */
    searchDirectoryDepartment(body: SearchDirectoryDepartmentRequest, query?: SearchDirectoryDepartmentQuery): Promise<SearchDirectoryDepartmentResponse>
    /**
     * 转换部门 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/department/idconvert
     */
    idconvertDirectoryDepartment(body: IdconvertDirectoryDepartmentRequest, query?: IdconvertDirectoryDepartmentQuery): Promise<IdconvertDirectoryDepartmentResponse>
    /**
     * 获取关联组织双方共享成员范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collboration_share_entity/list
     */
    listDirectoryCollborationShareEntity(query?: ListDirectoryCollborationShareEntityQuery): Promise<ListDirectoryCollborationShareEntityResponse>
    /**
     * 管理员获取所有关联组织列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_tenant/list
     */
    listDirectoryCollaborationTenant(query?: Pagination): Paginated<CollaborationTenant>
    /**
     * 新增可搜可见规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/create
     */
    createDirectoryCollaborationRule(body: CreateDirectoryCollaborationRuleRequest, query?: CreateDirectoryCollaborationRuleQuery): Promise<CreateDirectoryCollaborationRuleResponse>
    /**
     * 更新可搜可见规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/update
     */
    updateDirectoryCollaborationRule(collaboration_rule_id: string, body: UpdateDirectoryCollaborationRuleRequest, query?: UpdateDirectoryCollaborationRuleQuery): Promise<void>
    /**
     * 查询可搜可见规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/list
     */
    listDirectoryCollaborationRule(query?: ListDirectoryCollaborationRuleQuery): Paginated<CollaborationRule>
    /**
     * 删除可搜可见规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/collaboration_rule/delete
     */
    deleteDirectoryCollaborationRule(collaboration_rule_id: string, query?: DeleteDirectoryCollaborationRuleQuery): Promise<void>
  }
}

export interface CreateDirectoryEmployeeRequest {
  /** 创建员工对象 */
  employee: CreateEmployee
  /** 接口拓展选项 */
  options?: CreateEmployeeOptions
}

export interface CreateDirectoryEmployeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'employee_id' | 'union_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface CreateDirectoryEmployeeResponse {
  /** 员工ID */
  employee_id?: string
}

export interface PatchDirectoryEmployeeRequest {
  /** 更新员工对象 */
  employee: UpdateEmployee
}

export interface PatchDirectoryEmployeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
  /** 部门ID类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface DeleteDirectoryEmployeeRequest {
  /** 接口拓展选项 */
  options?: DeleteEmployeeOptions
}

export interface DeleteDirectoryEmployeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'employee_id' | 'union_id'
}

export interface ResurrectDirectoryEmployeeRequest {
  /** 部门信息 */
  employee_order_in_departments?: UpsertUserDepartmentSortInfo[]
  /** 选项 */
  options?: ResurrectEmployeeOptions
}

export interface ResurrectDirectoryEmployeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'employee_id' | 'union_id'
  /** 部门ID类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ToBeResignedDirectoryEmployeeRequest {
  /** 在职员工流转到待离职 */
  employee: SetEmployeePreResigned
}

export interface ToBeResignedDirectoryEmployeeQuery {
  /** 员工ID类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
  /** 部门ID类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface RegularDirectoryEmployeeQuery {
  /** 员工ID类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
  /** 部门ID类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface MgetDirectoryEmployeeRequest {
  /** 员工id */
  employee_ids: string[]
  /** 字段枚举 */
  required_fields: string[]
}

export interface MgetDirectoryEmployeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'employee_id' | 'union_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface MgetDirectoryEmployeeResponse {
  /** 员工信息 */
  employees?: EmployeeEntity[]
  /** 字段异常信息 */
  abnormals?: AbnormalRecord[]
}

export interface FilterDirectoryEmployeeRequest {
  /** 查询条件 */
  filter: MultiFilterCondition
  /** 需要查询的字段列表。将按照传递的字段列表返回有权限的行、列数据。不传则不会返回任何字段 */
  required_fields: string[]
  /** 分页参数 */
  page_request: PageCondition
}

export interface FilterDirectoryEmployeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface FilterDirectoryEmployeeResponse {
  /** 员工信息 */
  employees?: EmployeeEntity[]
  /** 分页结果 */
  page_response?: PageResponse
  /** 异常信息 */
  abnormals?: AbnormalRecord[]
}

export interface SearchDirectoryEmployeeRequest {
  /** 搜索关键词。支持员工ID、员工名称、员工手机号、员工邮箱的搜索。其中员工ID、员工手机号支持精确搜索，员工名称、员工邮箱支持模糊搜索，员工名称支持国际化名称的搜索。 */
  query: string
  /** 分页信息 */
  page_request: PageCondition
  /** 需要查询的字段列表。将按照传递的字段列表返回有权限的行、列数据。不传则不会返回任何字段 */
  required_fields: string[]
}

export interface SearchDirectoryEmployeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
}

export interface SearchDirectoryEmployeeResponse {
  /** 员工信息 */
  employees?: EmployeeEntity[]
  /** 分页结果 */
  page_response?: PageResponse
  /** 字段异常信息 */
  abnormals?: AbnormalRecord[]
}

export interface IdconvertDirectoryEmployeeRequest {
  /** 用户ID列表 */
  employee_ids: string[]
}

export interface IdconvertDirectoryEmployeeQuery {
  /** 员工ID类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
}

export interface IdconvertDirectoryEmployeeResponse {
  /** id转换结果列表 */
  id_convert_results?: EmployeeIdConvertResult[]
  /** 异常信息列表 */
  abnormals?: AbnormalRecord[]
}

export interface CreateDirectoryDepartmentRequest {
  /** 创建部门 */
  department: CreateDepartment
}

export interface CreateDirectoryDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface CreateDirectoryDepartmentResponse {
  /** 部门ID */
  department_id?: string
}

export interface PatchDirectoryDepartmentRequest {
  /** 更新部门 */
  department: UpdateDepartment
}

export interface PatchDirectoryDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'union_id' | 'employee_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
}

export interface DeleteDirectoryDepartmentQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface MgetDirectoryDepartmentRequest {
  /** 部门id */
  department_ids: string[]
  /** 字段枚举 */
  required_fields: string[]
}

export interface MgetDirectoryDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'employee_id' | 'union_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface MgetDirectoryDepartmentResponse {
  /** 部门信息 */
  departments?: Department[]
  /** 字段异常信息 */
  abnormals?: AbnormalRecord[]
}

export interface FilterDirectoryDepartmentRequest {
  /** 查询条件 */
  filter: MultiFilterCondition
  /** 需要查询的字段列表。将按照传递的字段列表返回有权限的行、列数据。不传则不会返回任何字段 */
  required_fields: string[]
  /** 分页信息 */
  page_request: PageCondition
}

export interface FilterDirectoryDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'employee_id' | 'union_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
}

export interface FilterDirectoryDepartmentResponse {
  /** 部门信息 */
  departments?: Department[]
  /** 分页结果 */
  page_response?: PageResponse
  /** 异常信息 */
  abnormals?: AbnormalRecord[]
}

export interface SearchDirectoryDepartmentRequest {
  /** 搜索关键词。支持部门名称的搜索 */
  query: string
  /** 分页信息 */
  page_request: PageCondition
  /** 需要查询的字段列表。将按照传递的字段列表返回有权限的行、列数据。不传则不会返回任何字段 */
  required_fields: string[]
}

export interface SearchDirectoryDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  employee_id_type?: 'open_id' | 'employee_id' | 'union_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
}

export interface SearchDirectoryDepartmentResponse {
  /** 部门信息 */
  departments?: Department[]
  /** 分页结果 */
  page_response?: PageResponse
  /** 字段异常信息 */
  abnormals?: AbnormalRecord[]
}

export interface IdconvertDirectoryDepartmentRequest {
  /** 部门ID列表 */
  department_ids: string[]
}

export interface IdconvertDirectoryDepartmentQuery {
  /** 部门ID类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface IdconvertDirectoryDepartmentResponse {
  /** id转换结果列表 */
  id_convert_results?: DepartmentIdConvertResult[]
  /** 异常信息列表 */
  abnormals?: AbnormalRecord[]
}

export interface ListDirectoryCollborationShareEntityQuery extends Pagination {
  /** 对方租户的tenant key */
  target_tenant_key: string
  /** 不填写该参数为租户的分享范围，可填写该字段继续下钻查看指定部门下的子部门+成员。填写0分为两种情况，若租户分享的为全员则展示一级部门，否则展示分享的部门+成员。 */
  target_department_id?: string
  /** 获取用户组下的成员，填写该值后忽略target_department_id */
  target_group_id?: string
  /** 是否主体租户分享范围，默认是客体租户的分享范围 */
  is_select_subject?: boolean
}

export interface ListDirectoryCollborationShareEntityResponse {
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分享的部门信息 */
  share_departments?: ShareDepartment[]
  /** 分享的用户组信息 */
  share_groups?: ShareGroup[]
  /** 分享的用户信息 */
  share_users?: ShareUser[]
}

export interface CreateDirectoryCollaborationRuleRequest {
  /** 实体数量之和需要小于100 */
  subjects: CollaborationRuleEntities
  /** 实体数量之和需要小于100 */
  objects: CollaborationRuleEntities
}

export interface CreateDirectoryCollaborationRuleQuery {
  /** 对方租户的tenant key */
  target_tenant_key: string
}

export interface CreateDirectoryCollaborationRuleResponse {
  /** 添加的规则ID */
  add_rule_id?: string
}

export interface UpdateDirectoryCollaborationRuleRequest {
  /** 实体数量之和需要小于100 */
  subjects: CollaborationRuleEntities
  /** 实体数量之和需要小于100 */
  objects: CollaborationRuleEntities
}

export interface UpdateDirectoryCollaborationRuleQuery {
  /** 对方租户的tenant key */
  target_tenant_key: string
}

export interface ListDirectoryCollaborationRuleQuery extends Pagination {
  /** 对方租户的tenant key */
  target_tenant_key: string
}

export interface DeleteDirectoryCollaborationRuleQuery {
  /** 对方租户的tenant key */
  target_tenant_key: string
}

Internal.define({
  '/directory/v1/employees': {
    POST: 'createDirectoryEmployee',
  },
  '/directory/v1/employees/{employee_id}': {
    PATCH: 'patchDirectoryEmployee',
    DELETE: 'deleteDirectoryEmployee',
  },
  '/directory/v1/employees/{employee_id}/resurrect': {
    POST: 'resurrectDirectoryEmployee',
  },
  '/directory/v1/employees/{employee_id}/to_be_resigned': {
    PATCH: 'toBeResignedDirectoryEmployee',
  },
  '/directory/v1/employees/{employee_id}/regular': {
    PATCH: 'regularDirectoryEmployee',
  },
  '/directory/v1/employees/mget': {
    POST: 'mgetDirectoryEmployee',
  },
  '/directory/v1/employees/filter': {
    POST: 'filterDirectoryEmployee',
  },
  '/directory/v1/employees/search': {
    POST: 'searchDirectoryEmployee',
  },
  '/directory/v1/employees/idconvert': {
    POST: 'idconvertDirectoryEmployee',
  },
  '/directory/v1/departments': {
    POST: 'createDirectoryDepartment',
  },
  '/directory/v1/departments/{department_id}': {
    PATCH: 'patchDirectoryDepartment',
    DELETE: 'deleteDirectoryDepartment',
  },
  '/directory/v1/departments/mget': {
    POST: 'mgetDirectoryDepartment',
  },
  '/directory/v1/departments/filter': {
    POST: 'filterDirectoryDepartment',
  },
  '/directory/v1/departments/search': {
    POST: 'searchDirectoryDepartment',
  },
  '/directory/v1/departments/idconvert': {
    POST: 'idconvertDirectoryDepartment',
  },
  '/directory/v1/share_entities': {
    GET: 'listDirectoryCollborationShareEntity',
  },
  '/directory/v1/collaboration_tenants': {
    GET: { name: 'listDirectoryCollaborationTenant', pagination: { argIndex: 0 } },
  },
  '/directory/v1/collaboration_rules': {
    POST: 'createDirectoryCollaborationRule',
    GET: { name: 'listDirectoryCollaborationRule', pagination: { argIndex: 0 } },
  },
  '/directory/v1/collaboration_rules/{collaboration_rule_id}': {
    PUT: 'updateDirectoryCollaborationRule',
    DELETE: 'deleteDirectoryCollaborationRule',
  },
})
