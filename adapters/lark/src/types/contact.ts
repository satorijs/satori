import { CustomAttr, Department, DepartmentI18nName, DepartmentLeader, EmployeeTypeEnum, FunctionalRoleMember, FunctionalRoleMemberResult, Group, I18nContent, JobFamily, JobLevel, JobTitle, Memberlist, MemberResult, ResourceAcceptor, Unit, UnitDepartment, User, UserContactInfo, UserCustomAttr, UserDepartmentInfo, UserOrder, WorkCity } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取通讯录授权范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/scope/list
     */
    listContactScope(query?: ListContactScopeQuery): Promise<ListContactScopeResponse>
    /**
     * 创建用户
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create
     */
    createContactUser(body: CreateContactUserRequest, query?: CreateContactUserQuery): Promise<CreateContactUserResponse>
    /**
     * 修改用户部分信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch
     */
    patchContactUser(user_id: string, body: PatchContactUserRequest, query?: PatchContactUserQuery): Promise<PatchContactUserResponse>
    /**
     * 更新用户 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update_user_id
     */
    updateUserIdContactUser(user_id: string, body: UpdateUserIdContactUserRequest, query?: UpdateUserIdContactUserQuery): Promise<void>
    /**
     * 获取单个用户信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get
     */
    getContactUser(user_id: string, query?: GetContactUserQuery): Promise<GetContactUserResponse>
    /**
     * 批量获取用户信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch
     */
    batchContactUser(query?: BatchContactUserQuery): Promise<BatchContactUserResponse>
    /**
     * 获取部门直属用户列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/find_by_department
     */
    findByDepartmentContactUser(query?: FindByDepartmentContactUserQuery): Paginated<User>
    /**
     * 通过手机号或邮箱获取用户 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch_get_id
     */
    batchGetIdContactUser(body: BatchGetIdContactUserRequest, query?: BatchGetIdContactUserQuery): Promise<BatchGetIdContactUserResponse>
    /**
     * 删除用户
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/delete
     */
    deleteContactUser(user_id: string, body: DeleteContactUserRequest, query?: DeleteContactUserQuery): Promise<void>
    /**
     * 恢复已删除用户
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/resurrect
     */
    resurrectContactUser(user_id: string, body: ResurrectContactUserRequest, query?: ResurrectContactUserQuery): Promise<void>
    /**
     * 创建用户组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/create
     */
    createContactGroup(body: CreateContactGroupRequest, query?: CreateContactGroupQuery): Promise<CreateContactGroupResponse>
    /**
     * 更新用户组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/patch
     */
    patchContactGroup(group_id: string, body: PatchContactGroupRequest, query?: PatchContactGroupQuery): Promise<void>
    /**
     * 查询指定用户组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/get
     */
    getContactGroup(group_id: string, query?: GetContactGroupQuery): Promise<GetContactGroupResponse>
    /**
     * 查询用户组列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/simplelist
     */
    simplelistContactGroup(query?: SimplelistContactGroupQuery): Paginated<Group, 'grouplist'>
    /**
     * 查询用户所属用户组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/member_belong
     */
    memberBelongContactGroup(query?: MemberBelongContactGroupQuery): Paginated<string, 'group_list'>
    /**
     * 删除用户组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/delete
     */
    deleteContactGroup(group_id: string): Promise<void>
    /**
     * 获取企业自定义用户字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/custom_attr/list
     */
    listContactCustomAttr(query?: Pagination): Paginated<CustomAttr>
    /**
     * 新增人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/create
     */
    createContactEmployeeTypeEnum(body: CreateContactEmployeeTypeEnumRequest): Promise<CreateContactEmployeeTypeEnumResponse>
    /**
     * 更新人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/update
     */
    updateContactEmployeeTypeEnum(enum_id: string, body: UpdateContactEmployeeTypeEnumRequest): Promise<UpdateContactEmployeeTypeEnumResponse>
    /**
     * 查询人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list
     */
    listContactEmployeeTypeEnum(query?: Pagination): Paginated<EmployeeTypeEnum>
    /**
     * 删除人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/delete
     */
    deleteContactEmployeeTypeEnum(enum_id: string): Promise<void>
    /**
     * 创建部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/create
     */
    createContactDepartment(body: CreateContactDepartmentRequest, query?: CreateContactDepartmentQuery): Promise<CreateContactDepartmentResponse>
    /**
     * 修改部门部分信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/patch
     */
    patchContactDepartment(department_id: string, body: PatchContactDepartmentRequest, query?: PatchContactDepartmentQuery): Promise<PatchContactDepartmentResponse>
    /**
     * 更新部门所有信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update
     */
    updateContactDepartment(department_id: string, body: UpdateContactDepartmentRequest, query?: UpdateContactDepartmentQuery): Promise<UpdateContactDepartmentResponse>
    /**
     * 更新部门 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update_department_id
     */
    updateDepartmentIdContactDepartment(department_id: string, body: UpdateDepartmentIdContactDepartmentRequest, query?: UpdateDepartmentIdContactDepartmentQuery): Promise<void>
    /**
     * 部门群转为普通群
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/unbind_department_chat
     */
    unbindDepartmentChatContactDepartment(body: UnbindDepartmentChatContactDepartmentRequest, query?: UnbindDepartmentChatContactDepartmentQuery): Promise<void>
    /**
     * 获取单个部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/get
     */
    getContactDepartment(department_id: string, query?: GetContactDepartmentQuery): Promise<GetContactDepartmentResponse>
    /**
     * 批量获取部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/batch
     */
    batchContactDepartment(query?: BatchContactDepartmentQuery): Promise<BatchContactDepartmentResponse>
    /**
     * 获取子部门列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/children
     */
    childrenContactDepartment(department_id: string, query?: ChildrenContactDepartmentQuery): Paginated<Department>
    /**
     * 获取父部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent
     */
    parentContactDepartment(query?: ParentContactDepartmentQuery): Paginated<Department>
    /**
     * 搜索部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search
     */
    searchContactDepartment(body: SearchContactDepartmentRequest, query?: SearchContactDepartmentQuery): Paginated<Department>
    /**
     * 删除部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/delete
     */
    deleteContactDepartment(department_id: string, query?: DeleteContactDepartmentQuery): Promise<void>
    /**
     * 创建单位
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/create
     */
    createContactUnit(body: CreateContactUnitRequest): Promise<CreateContactUnitResponse>
    /**
     * 修改单位信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/patch
     */
    patchContactUnit(unit_id: string, body: PatchContactUnitRequest): Promise<void>
    /**
     * 建立部门与单位的绑定关系
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/bind_department
     */
    bindDepartmentContactUnit(body: BindDepartmentContactUnitRequest): Promise<void>
    /**
     * 解除部门与单位的绑定关系
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/unbind_department
     */
    unbindDepartmentContactUnit(body: UnbindDepartmentContactUnitRequest): Promise<void>
    /**
     * 获取单位绑定的部门列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list_department
     */
    listDepartmentContactUnit(query?: ListDepartmentContactUnitQuery): Paginated<UnitDepartment, 'departmentlist'>
    /**
     * 获取单位信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/get
     */
    getContactUnit(unit_id: string): Promise<GetContactUnitResponse>
    /**
     * 获取单位列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list
     */
    listContactUnit(query?: Pagination): Paginated<Unit, 'unitlist'>
    /**
     * 删除单位
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/delete
     */
    deleteContactUnit(unit_id: string): Promise<void>
    /**
     * 添加用户组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/add
     */
    addContactGroupMember(group_id: string, body: AddContactGroupMemberRequest): Promise<void>
    /**
     * 批量添加用户组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_add
     */
    batchAddContactGroupMember(group_id: string, body: BatchAddContactGroupMemberRequest): Promise<BatchAddContactGroupMemberResponse>
    /**
     * 查询用户组成员列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/simplelist
     */
    simplelistContactGroupMember(group_id: string, query?: SimplelistContactGroupMemberQuery): Paginated<Memberlist, 'memberlist'>
    /**
     * 移除用户组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/remove
     */
    removeContactGroupMember(group_id: string, body: RemoveContactGroupMemberRequest): Promise<void>
    /**
     * 批量移除用户组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_remove
     */
    batchRemoveContactGroupMember(group_id: string, body: BatchRemoveContactGroupMemberRequest): Promise<void>
    /**
     * 创建角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/create
     */
    createContactFunctionalRole(body: CreateContactFunctionalRoleRequest): Promise<CreateContactFunctionalRoleResponse>
    /**
     * 修改角色名称
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/update
     */
    updateContactFunctionalRole(role_id: string, body: UpdateContactFunctionalRoleRequest): Promise<void>
    /**
     * 删除角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/delete
     */
    deleteContactFunctionalRole(role_id: string): Promise<void>
    /**
     * 批量添加角色成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_create
     */
    batchCreateContactFunctionalRoleMember(role_id: string, body: BatchCreateContactFunctionalRoleMemberRequest, query?: BatchCreateContactFunctionalRoleMemberQuery): Promise<BatchCreateContactFunctionalRoleMemberResponse>
    /**
     * 批量设置角色成员管理范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/scopes
     */
    scopesContactFunctionalRoleMember(role_id: string, body: ScopesContactFunctionalRoleMemberRequest, query?: ScopesContactFunctionalRoleMemberQuery): Promise<ScopesContactFunctionalRoleMemberResponse>
    /**
     * 查询角色下某个成员的管理范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/get
     */
    getContactFunctionalRoleMember(role_id: string, member_id: string, query?: GetContactFunctionalRoleMemberQuery): Promise<GetContactFunctionalRoleMemberResponse>
    /**
     * 查询角色下的所有成员信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/list
     */
    listContactFunctionalRoleMember(role_id: string, query?: ListContactFunctionalRoleMemberQuery): Paginated<FunctionalRoleMember, 'members'>
    /**
     * 删除角色下的成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_delete
     */
    batchDeleteContactFunctionalRoleMember(role_id: string, body: BatchDeleteContactFunctionalRoleMemberRequest, query?: BatchDeleteContactFunctionalRoleMemberQuery): Promise<BatchDeleteContactFunctionalRoleMemberResponse>
    /**
     * 创建职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/create
     */
    createContactJobLevel(body: CreateContactJobLevelRequest): Promise<CreateContactJobLevelResponse>
    /**
     * 更新职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/update
     */
    updateContactJobLevel(job_level_id: string, body: UpdateContactJobLevelRequest): Promise<UpdateContactJobLevelResponse>
    /**
     * 获取单个职级信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/get
     */
    getContactJobLevel(job_level_id: string): Promise<GetContactJobLevelResponse>
    /**
     * 获取租户职级列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/list
     */
    listContactJobLevel(query?: ListContactJobLevelQuery): Paginated<JobLevel>
    /**
     * 删除职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/delete
     */
    deleteContactJobLevel(job_level_id: string): Promise<void>
    /**
     * 创建序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/create
     */
    createContactJobFamily(body: CreateContactJobFamilyRequest): Promise<CreateContactJobFamilyResponse>
    /**
     * 更新序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/update
     */
    updateContactJobFamily(job_family_id: string, body: UpdateContactJobFamilyRequest): Promise<UpdateContactJobFamilyResponse>
    /**
     * 获取单个序列信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/get
     */
    getContactJobFamily(job_family_id: string): Promise<GetContactJobFamilyResponse>
    /**
     * 获取租户序列列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/list
     */
    listContactJobFamily(query?: ListContactJobFamilyQuery): Paginated<JobFamily>
    /**
     * 删除序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/delete
     */
    deleteContactJobFamily(job_family_id: string): Promise<void>
    /**
     * 获取单个职务信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_title/get
     */
    getContactJobTitle(job_title_id: string): Promise<GetContactJobTitleResponse>
    /**
     * 获取租户职务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_title/list
     */
    listContactJobTitle(query?: Pagination): Paginated<JobTitle>
    /**
     * 获取单个工作城市信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/work_city/get
     */
    getContactWorkCity(work_city_id: string): Promise<GetContactWorkCityResponse>
    /**
     * 获取租户工作城市列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/work_city/list
     */
    listContactWorkCity(query?: Pagination): Paginated<WorkCity>
    /**
     * 获取用户列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/list
     */
    listContactUser(query?: ListContactUserQuery): Paginated<User>
    /**
     * 更新用户所有信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update
     */
    updateContactUser(user_id: string, body: UpdateContactUserRequest, query?: UpdateContactUserQuery): Promise<UpdateContactUserResponse>
    /**
     * 获取部门信息列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/list
     */
    listContactDepartment(query?: ListContactDepartmentQuery): Paginated<Department>
  }
}

export interface ListContactScopeQuery extends Pagination {
  /** 返回值的用户ID的类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 返回值的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ListContactScopeResponse {
  /** 已授权部门列表，授权范围为全员可见时返回的是当前企业的所有一级部门列表 */
  department_ids?: string[]
  /** 已授权用户列表，应用申请了获取用户user_id 权限时返回；当授权范围为全员可见时返回的是当前企业所有顶级部门用户列表 */
  user_ids?: string[]
  /** 已授权的用户组，授权范围为全员可见时返回的是当前企业所有用户组 */
  group_ids?: string[]
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token */
  page_token?: string
}

export const enum CreateContactUserRequestGender {
  /** 保密 */
  Unkown = 0,
  /** 男 */
  Male = 1,
  /** 女 */
  Female = 2,
  /** 其他 */
  Others = 3,
}

export interface CreateContactUserRequest {
  /** 租户内用户的唯一标识 */
  user_id?: string
  /** 用户名 */
  name: string
  /** 英文名 */
  en_name?: string
  /** 别名 */
  nickname?: string
  /** 邮箱 */
  email?: string
  /** 手机号 */
  mobile: string
  /** 手机号码可见性，true 为可见，false 为不可见，目前默认为 true。不可见时，组织员工将无法查看该员工的手机号码 */
  mobile_visible?: boolean
  /** 性别 */
  gender?: CreateContactUserRequestGender
  /** 头像的文件Key */
  avatar_key?: string
  /** 用户所在的部门 */
  department_ids: string[]
  /** 用户的上级领导 */
  leader_user_id?: string
  /** 城市 */
  city?: string
  /** 国家 */
  country?: string
  /** 工位 */
  work_station?: string
  /** 入职时间 */
  join_time?: number
  /** 工号 */
  employee_no?: string
  /** 员工类型 */
  employee_type: number
  /** 用户排序信息 */
  orders?: UserOrder[]
  /** 自定义属性 */
  custom_attrs?: UserCustomAttr[]
  /** 企业邮箱 */
  enterprise_email?: string
  /** 职务 */
  job_title?: string
  /** 数据驻留地 */
  geo?: string
  /** 职级ID */
  job_level_id?: string
  /** 序列ID */
  job_family_id?: string
  /** 分配给用户的席位ID列表 */
  subscription_ids?: string[]
  /** 虚线上级ID */
  dotted_line_leader_user_ids?: string[]
}

export interface CreateContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型。不同 ID 的说明参见[部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 用于幂等判断是否为同一请求，避免重复创建。字符串类型，自行生成。 */
  client_token?: string
}

export interface CreateContactUserResponse {
  user?: User
}

export const enum PatchContactUserRequestGender {
  /** 保密 */
  Unkown = 0,
  /** 男 */
  Male = 1,
  /** 女 */
  Female = 2,
  /** 其他 */
  Others = 3,
}

export interface PatchContactUserRequest {
  /** 用户名称 */
  name?: string
  /** 英文名 */
  en_name?: string
  /** 别名 */
  nickname?: string
  /** 邮箱 */
  email?: string
  /** 用户手机号 */
  mobile?: string
  /** 手机号码可见性，true 为可见，false 为不可见，目前默认为 true。不可见时，组织员工将无法查看该员工的手机号码 */
  mobile_visible?: boolean
  /** 性别 */
  gender?: PatchContactUserRequestGender
  /** 头像的文件Key */
  avatar_key?: string
  /** 用户所在部门ID */
  department_ids?: string[]
  /** 用户直属上级 */
  leader_user_id?: string
  /** 城市 */
  city?: string
  /** 国家 */
  country?: string
  /** 工位 */
  work_station?: string
  /** 入职时间 */
  join_time?: number
  /** 工号 */
  employee_no?: string
  /** 员工类型 */
  employee_type?: number
  /** 用户排序信息 */
  orders?: UserOrder[]
  /** 自定义属性 */
  custom_attrs?: UserCustomAttr[]
  /** 企业邮箱 */
  enterprise_email?: string
  /** 职务 */
  job_title?: string
  /** 是否冻结用户 */
  is_frozen?: boolean
  /** 职级ID */
  job_level_id?: string
  /** 序列ID */
  job_family_id?: string
  /** 分配给用户的席位ID列表 */
  subscription_ids?: string[]
  /** 虚线上级ID */
  dotted_line_leader_user_ids?: string[]
}

export interface PatchContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface PatchContactUserResponse {
  user?: User
}

export interface UpdateUserIdContactUserRequest {
  /** 自定义新用户ID */
  new_user_id: string
}

export interface UpdateUserIdContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型不同 ID 的说明 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetContactUserResponse {
  user?: User
}

export interface BatchContactUserQuery {
  /** 要查询的用户ID列表 */
  user_ids: string[]
  /** 指定请求中用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 指定查询结果中用户关联的部门ID类型 */
  department_id_type?: 'open_department_id' | 'department_id'
}

export interface BatchContactUserResponse {
  /** 查询到的用户信息，其中异常的用户ID不返回结果。 */
  items?: User[]
}

export interface FindByDepartmentContactUserQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型部门ID类型的区别参见[部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 填写该字段表示获取该部门下用户，必填。根部门的部门ID为0。ID值与查询参数中的department_id_type 对应。不同 ID 的说明与department_id的获取方式参见 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id: string
}

export interface BatchGetIdContactUserRequest {
  /** 要查询的用户邮箱，最多 50 条。注意，emails与mobiles相互独立，每条用户邮箱返回对应的用户ID。本接口返回的用户ID数量为emails数量与mobiles数量的和。 */
  emails?: string[]
  /** 要查询的用户手机号，最多 50 条。注意1. emails与mobiles相互独立，每条用户手机号返回对应的用户ID。2.  非中国大陆地区的手机号需要添加以 “+” 开头的国家 / 地区代码。 */
  mobiles?: string[]
  /** 查询结果包含离职员工，可查询离职用户的ID */
  include_resigned?: boolean
}

export interface BatchGetIdContactUserQuery {
  /** 返回的用户ID的类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface BatchGetIdContactUserResponse {
  /** 手机号或者邮箱对应的用户id信息 */
  user_list?: UserContactInfo[]
}

export interface DeleteContactUserRequest {
  /** 部门群接收者。被删除用户为部门群群主时，转让群主给指定接收者，不指定接收者则默认转让给群内第一个入群的人 */
  department_chat_acceptor_user_id?: string
  /** 外部群接收者。被删除用户为外部群群主时，转让群主给指定接收者，不指定接收者则默认转让给群内与被删除用户在同一组织的第一个入群的人，如果组织内只有该用户在群里，则解散外部群 */
  external_chat_acceptor_user_id?: string
  /** 文档接收者。用户被删除时，其拥有的文档转让给接收者。不指定接收者则默认转让给直属上级，如果无直属上级则将文档资源保留在该用户名下。 */
  docs_acceptor_user_id?: string
  /** 日程接收者。用户被删除时，其拥有的日程转让给接收者，不指定接收者则默认转让给直属上级，如果无直属上级则直接删除日程资源。 */
  calendar_acceptor_user_id?: string
  /** 应用接受者。用户被删除时，其创建的应用转让给接收者，不指定接收者则默认转让给直属上级。如果无直属上级则保留应用在该用户名下，但该用户无法登录开发者后台进行应用管理，管理员可以在管理后台手动转移应用给其他人。 */
  application_acceptor_user_id?: string
  /** 妙记接收者。用户被删除时，其拥有的妙记资源转让给接收者。如果不指定接收者，则默认转让给直属上级。如果无直属上级则将妙记保留在该用户名下。 */
  minutes_acceptor_user_id?: string
  /** 飞书问卷接收者。用户被删除时，其拥有的飞书问卷资源转让给接收者，不指定接收者则默认转让给直属上级，如果无直属上级则直接删除飞书问卷资源。 */
  survey_acceptor_user_id?: string
  /** 用户邮件资源处理方式。用户被删除时，根据传递的操作指令对其拥有的邮件资源做对应处理。未传递指令时默认将邮件资源转让给直属上级，如果无直属上级则保留邮件资源在该用户名下。 */
  email_acceptor?: ResourceAcceptor
  /** 用户集成平台资源接收者 */
  anycross_acceptor_user_id?: string
}

export interface DeleteContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ResurrectContactUserRequest {
  /** 指定恢复后用户所在部门 */
  departments?: UserDepartmentInfo[]
  /** 指定恢复后分配的席位 */
  subscription_ids?: string[]
}

export interface ResurrectContactUserQuery {
  /** 用户id类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 部门id类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export const enum CreateContactGroupRequestType {
  /** 普通用户组 */
  Assign = 1,
  /** 动态用户组 */
  Dynamic = 2,
}

export interface CreateContactGroupRequest {
  /** 用户组的名字，企业内唯一，最大长度：100 字符 */
  name: string
  /** 用户组描述 */
  description?: string
  /** 用户组的类型。默认为1表示普通用户组 */
  type?: CreateContactGroupRequestType
  /** 自定义用户组ID，可在创建时自定义，不自定义则由系统自动生成，已创建用户组不允许修改 group_id 。自定义group_id数据校验规则：最大长度：64 字符校验规则：数字、大小写字母的组合，不能包含空格 */
  group_id?: string
}

export interface CreateContactGroupQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
}

export interface CreateContactGroupResponse {
  /** 用户组ID */
  group_id: string
}

export interface PatchContactGroupRequest {
  /** 用户组的名字，企业内唯一，最大长度：100 字符 */
  name?: string
  /** 用户组描述信息最大长度：500 字 */
  description?: string
}

export interface PatchContactGroupQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetContactGroupQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
}

export interface GetContactGroupResponse {
  /** 用户组详情 */
  group: Group
}

export const enum SimplelistContactGroupQueryType {
  /** 普通用户组 */
  Assign = 1,
  /** 动态用户组 */
  Dynamic = 2,
}

export interface SimplelistContactGroupQuery extends Pagination {
  /** 用户组类型 */
  type?: SimplelistContactGroupQueryType
}

export const enum MemberBelongContactGroupQueryGroupType {
  /** 普通用户组 */
  Assign = 1,
  /** 动态用户组 */
  Dynamic = 2,
}

export interface MemberBelongContactGroupQuery extends Pagination {
  /** 成员ID */
  member_id: string
  /** 成员ID类型 */
  member_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 欲获取的用户组类型 */
  group_type?: MemberBelongContactGroupQueryGroupType
}

export const enum CreateContactEmployeeTypeEnumRequestEnumType {
  /** 内置类型 */
  Defualt = 1,
  /** 自定义 */
  Custom = 2,
}

export const enum CreateContactEmployeeTypeEnumRequestEnumStatus {
  /** 激活 */
  Active = 1,
  /** 未激活 */
  Inactive = 2,
}

export interface CreateContactEmployeeTypeEnumRequest {
  /** 枚举内容 */
  content: string
  /** 类型 */
  enum_type: CreateContactEmployeeTypeEnumRequestEnumType
  /** 类型 */
  enum_status: CreateContactEmployeeTypeEnumRequestEnumStatus
  /** i18n定义 */
  i18n_content?: I18nContent[]
}

export interface CreateContactEmployeeTypeEnumResponse {
  /** 创建人员类型接口 */
  employee_type_enum?: EmployeeTypeEnum
}

export const enum UpdateContactEmployeeTypeEnumRequestEnumType {
  /** 内置类型 */
  Defualt = 1,
  /** 自定义 */
  Custom = 2,
}

export const enum UpdateContactEmployeeTypeEnumRequestEnumStatus {
  /** 激活 */
  Active = 1,
  /** 未激活 */
  Inactive = 2,
}

export interface UpdateContactEmployeeTypeEnumRequest {
  /** 枚举内容 */
  content: string
  /** 类型 */
  enum_type: UpdateContactEmployeeTypeEnumRequestEnumType
  /** 类型 */
  enum_status: UpdateContactEmployeeTypeEnumRequestEnumStatus
  /** i18n定义 */
  i18n_content?: I18nContent[]
}

export interface UpdateContactEmployeeTypeEnumResponse {
  employee_type_enum?: EmployeeTypeEnum
}

export interface CreateContactDepartmentRequest {
  /** 部门名称 */
  name: string
  /** 国际化的部门名称 */
  i18n_name?: DepartmentI18nName
  /** 父部门的ID */
  parent_department_id: string
  /** 本部门的自定义部门ID */
  department_id?: string
  /** 部门主管用户ID */
  leader_user_id?: string
  /** 部门的排序 */
  order?: string
  /** 是否创建部门群，默认不创建 */
  create_group_chat?: boolean
  /** 部门负责人 */
  leaders?: DepartmentLeader[]
  /** 部门群雇员类型限制 */
  group_chat_employee_types?: number[]
  /** 部门HRBP */
  department_hrbps?: string[]
}

export interface CreateContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型不同 ID 的说明参见[部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 用于幂等判断是否为同一请求，避免重复创建。字符串类型，自行生成。 */
  client_token?: string
}

export interface CreateContactDepartmentResponse {
  department?: Department
}

export interface PatchContactDepartmentRequest {
  /** 部门名 */
  name?: string
  /** 国际化的部门名称 */
  i18n_name?: DepartmentI18nName
  /** 父部门ID */
  parent_department_id?: string
  /** leaderID */
  leader_user_id?: string
  /** 部门的排序 */
  order?: string
  /** 是否创建部门群，默认不创建 */
  create_group_chat?: boolean
  /** 部门负责人 */
  leaders?: DepartmentLeader[]
  /** 部门群雇员类型限制 */
  group_chat_employee_types?: number[]
  /** 部门HRBP */
  department_hrbps?: string[]
}

export interface PatchContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface PatchContactDepartmentResponse {
  department?: Department
}

export interface UpdateContactDepartmentRequest {
  /** 部门名称 */
  name: string
  /** 国际化的部门名称 */
  i18n_name?: DepartmentI18nName
  /** 父部门ID */
  parent_department_id: string
  /** LeaderID */
  leader_user_id?: string
  /** 部门的排序 */
  order?: string
  /** 是否创建部门群，默认不创建 */
  create_group_chat?: boolean
  /** 部门负责人 */
  leaders?: DepartmentLeader[]
  /** 部门群雇员类型限制 */
  group_chat_employee_types?: number[]
}

export interface UpdateContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface UpdateContactDepartmentResponse {
  department?: Department
}

export interface UpdateDepartmentIdContactDepartmentRequest {
  /** 本部门的自定义部门新ID */
  new_department_id: string
}

export interface UpdateDepartmentIdContactDepartmentQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface UnbindDepartmentChatContactDepartmentRequest {
  /** 部门ID */
  department_id: string
}

export interface UnbindDepartmentChatContactDepartmentQuery {
  /** 此次调用中使用的部门ID的类型，默认为"open_department_id" */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型不同 ID 的说明 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetContactDepartmentResponse {
  department?: Department
}

export interface BatchContactDepartmentQuery {
  /** 查询的部门ID列表，类型需要与department_id_type对应 */
  department_ids: string[]
  /** 说明请求中department_id_list参数所使用的部门ID类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 指定调用结果中包含用户（如部门leader）关联的用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface BatchContactDepartmentResponse {
  /** 查询到的部门信息，其中异常的部门ID不返回结果。 */
  items?: Department[]
}

export interface ChildrenContactDepartmentQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型不同 ID 的说明与department_id的获取方式参见 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 是否递归获取子部门 */
  fetch_child?: boolean
}

export interface ParentContactDepartmentQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 部门ID */
  department_id: string
}

export interface SearchContactDepartmentRequest {
  /** 搜索关键词，匹配字段为部门名称（不支持匹配部门国际化名称） */
  query: string
}

export interface SearchContactDepartmentQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface DeleteContactDepartmentQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface CreateContactUnitRequest {
  /** 单位自定义ID。不带默认自动生成。1-64字节范围大小，需为数字字母 */
  unit_id?: string
  /** 单位的名字，长度范围为1-100个字 */
  name: string
  /** 单位类型，长度范围为1-100个字，创建后不可修改 */
  unit_type: string
}

export interface CreateContactUnitResponse {
  /** 单位的自定义ID */
  unit_id: string
}

export interface PatchContactUnitRequest {
  /** 单位的名字 */
  name?: string
}

export interface BindDepartmentContactUnitRequest {
  /** 单位ID */
  unit_id: string
  /** 单位关联的部门ID */
  department_id: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface UnbindDepartmentContactUnitRequest {
  /** 单位ID */
  unit_id: string
  /** 预解除关联的部门ID */
  department_id: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ListDepartmentContactUnitQuery extends Pagination {
  /** 单位ID */
  unit_id: string
  /** 此次调用中预获取的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetContactUnitResponse {
  /** 单位信息 */
  unit: Unit
}

export interface AddContactGroupMemberRequest {
  /** 用户组成员的类型，取值为 user */
  member_type: 'user'
  /** 当member_type =user时候，member_id_type表示user_id_type，枚举值为open_id, union_id, user_id */
  member_id_type: 'open_id' | 'union_id' | 'user_id'
  /** 添加的成员ID */
  member_id: string
}

export interface BatchAddContactGroupMemberRequest {
  /** 待添加成员 */
  members?: Memberlist[]
}

export interface BatchAddContactGroupMemberResponse {
  /** 成员添加操作结果 */
  results?: MemberResult[]
}

export interface SimplelistContactGroupMemberQuery extends Pagination {
  /** 欲获取成员ID类型。当member_type=user时候，member_id_type表示user_id_type，枚举值open_id, union_id和user_id。当member_type=department时候，member_id_type表示department_id_type，枚举值open_id和department_id。 */
  member_id_type?: 'open_id' | 'union_id' | 'user_id' | 'department_id'
  /** 欲获取的用户组成员类型。 */
  member_type?: 'user' | 'department'
}

export interface RemoveContactGroupMemberRequest {
  /** 用户组成员的类型，取值为 user */
  member_type: 'user'
  /** 操作移除的用户组成员ID */
  member_id: string
  /** 当member_type =user时候，member_id_type表示user_id_type，枚举值为open_id, union_id, user_id */
  member_id_type: 'open_id' | 'union_id' | 'user_id'
}

export interface BatchRemoveContactGroupMemberRequest {
  /** 待移除成员 */
  members: Memberlist[]
}

export interface CreateContactFunctionalRoleRequest {
  /** 角色名称，在单租户下唯一 */
  role_name: string
}

export interface CreateContactFunctionalRoleResponse {
  /** 角色ID，在单租户下唯一 */
  role_id: string
}

export interface UpdateContactFunctionalRoleRequest {
  /** 修改的角色名称，在单租户下唯一 */
  role_name: string
}

export interface BatchCreateContactFunctionalRoleMemberRequest {
  /** 角色添加的角色成员列表（一批用户的UserID列表) */
  members: string[]
}

export interface BatchCreateContactFunctionalRoleMemberQuery {
  /** 成员ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface BatchCreateContactFunctionalRoleMemberResponse {
  /** 批量新增角色成员结果集 */
  results?: FunctionalRoleMemberResult[]
}

export interface ScopesContactFunctionalRoleMemberRequest {
  /** 角色修改的角色成员列表（一批用户的UserID列表) */
  members: string[]
  /** 角色内用户的管理范围 */
  departments: string[]
}

export interface ScopesContactFunctionalRoleMemberQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ScopesContactFunctionalRoleMemberResponse {
  /** 批量更新角色成员管理范围结果集 */
  results?: FunctionalRoleMemberResult[]
}

export interface GetContactFunctionalRoleMemberQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface GetContactFunctionalRoleMemberResponse {
  /** 成员的管理范围 */
  member?: FunctionalRoleMember
}

export interface ListContactFunctionalRoleMemberQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface BatchDeleteContactFunctionalRoleMemberRequest {
  /** 角色删除的角色成员列表（一批用户的UserID列表) */
  members?: string[]
}

export interface BatchDeleteContactFunctionalRoleMemberQuery {
  /** 成员ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface BatchDeleteContactFunctionalRoleMemberResponse {
  /** 批量新增角色成员结果集 */
  result?: FunctionalRoleMemberResult[]
}

export interface CreateContactJobLevelRequest {
  /** 职级名称 */
  name: string
  /** 职级描述 */
  description?: string
  /** 职级的排序，可填入自然数100-100000的数值，系统按照数值大小从小到大排序。不填写该字段时，默认新增排序在当前职级列表中最后位（最大值） */
  order?: number
  /** 是否启用 */
  status: boolean
  /** 多语言名称 */
  i18n_name?: I18nContent[]
  /** 多语言描述 */
  i18n_description?: I18nContent[]
}

export interface CreateContactJobLevelResponse {
  /** 职级信息 */
  job_level?: JobLevel
}

export interface UpdateContactJobLevelRequest {
  /** 职级名称 */
  name?: string
  /** 职级描述 */
  description?: string
  /** 职级的排序，可填入自然数100-100000的数值，系统按照数值大小从小到大排序。不填写该字段时，默认新增排序在当前职级列表中最后位（最大值） */
  order?: number
  /** 是否启用 */
  status?: boolean
  /** 多语言名称 */
  i18n_name?: I18nContent[]
  /** 多语言描述 */
  i18n_description?: I18nContent[]
}

export interface UpdateContactJobLevelResponse {
  /** 职级信息 */
  job_level?: JobLevel
}

export interface GetContactJobLevelResponse {
  /** 职级信息 */
  job_level?: JobLevel
}

export interface ListContactJobLevelQuery extends Pagination {
  /** 传入该字段时，可查询指定职级名称对应的职级信息。 */
  name?: string
}

export interface CreateContactJobFamilyRequest {
  /** 序列名称。1-100字符，支持中、英文及符号 */
  name: string
  /** 序列描述，描述序列详情信息 */
  description?: string
  /** 上级序列ID。需是该租户的序列ID列表中的值，对应唯一的序列名称。 */
  parent_job_family_id?: string
  /** 是否启用 */
  status: boolean
  /** 多语言序列名称 */
  i18n_name?: I18nContent[]
  /** 多语言描述 */
  i18n_description?: I18nContent[]
}

export interface CreateContactJobFamilyResponse {
  /** 序列信息 */
  job_family?: JobFamily
}

export interface UpdateContactJobFamilyRequest {
  /** 序列名称。1-100字符，支持中、英文及符号 */
  name?: string
  /** 序列描述，描述序列详情信息 */
  description?: string
  /** 上级序列ID。需是该租户的序列ID列表中的值，对应唯一的序列名称。 */
  parent_job_family_id?: string
  /** 是否启用 */
  status?: boolean
  /** 多语言序列名称 */
  i18n_name?: I18nContent[]
  /** 多语言描述 */
  i18n_description?: I18nContent[]
}

export interface UpdateContactJobFamilyResponse {
  /** 更新后的序列信息 */
  job_family?: JobFamily
}

export interface GetContactJobFamilyResponse {
  /** 序列信息 */
  job_family?: JobFamily
}

export interface ListContactJobFamilyQuery extends Pagination {
  /** 序列名称,传入该字段时，可查询指定序列名称对应的序列信息 */
  name?: string
}

export interface GetContactJobTitleResponse {
  /** 职务信息 */
  job_title?: JobTitle
}

export interface GetContactWorkCityResponse {
  /** 工作城市信息 */
  work_city?: WorkCity
}

export interface ListContactUserQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 填写该字段表示获取部门下所有用户，选填。 */
  department_id?: string
}

export const enum UpdateContactUserRequestGender {
  /** 保密 */
  Unkown = 0,
  /** 男 */
  Male = 1,
  /** 女 */
  Female = 2,
  /** 其他 */
  Others = 3,
}

export interface UpdateContactUserRequest {
  /** 用户名 */
  name: string
  /** 英文名 */
  en_name?: string
  /** 别名 */
  nickname?: string
  /** 邮箱 */
  email?: string
  /** 手机号 */
  mobile: string
  /** 手机号码可见性，true 为可见，false 为不可见，目前默认为 true。不可见时，组织员工将无法查看该员工的手机号码 */
  mobile_visible?: boolean
  /** 性别 */
  gender?: UpdateContactUserRequestGender
  /** 头像的文件Key */
  avatar_key?: string
  /** 用户所在部门ID */
  department_ids: string[]
  /** 用户直属上级 */
  leader_user_id?: string
  /** 城市 */
  city?: string
  /** 国家 */
  country?: string
  /** 工位 */
  work_station?: string
  /** 入职时间 */
  join_time?: number
  /** 工号 */
  employee_no?: string
  /** 员工类型 */
  employee_type: number
  /** 用户排序信息 */
  orders?: UserOrder[]
  /** 自定义属性 */
  custom_attrs?: UserCustomAttr[]
  /** 企业邮箱 */
  enterprise_email?: string
  /** 职务 */
  job_title?: string
  /** 是否冻结用户 */
  is_frozen?: boolean
}

export interface UpdateContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface UpdateContactUserResponse {
  user?: User
}

export interface ListContactDepartmentQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 父部门的ID，填上获取部门下所有子部门，此处填写的 ID 必须是 department_id_type 指定的 ID。 */
  parent_department_id?: string
  /** 是否递归获取子部门 */
  fetch_child?: boolean
}

Internal.define({
  '/contact/v3/scopes': {
    GET: 'listContactScope',
  },
  '/contact/v3/users': {
    POST: 'createContactUser',
    GET: { name: 'listContactUser', pagination: { argIndex: 0 } },
  },
  '/contact/v3/users/{user_id}': {
    PATCH: 'patchContactUser',
    GET: 'getContactUser',
    DELETE: 'deleteContactUser',
    PUT: 'updateContactUser',
  },
  '/contact/v3/users/{user_id}/update_user_id': {
    PATCH: 'updateUserIdContactUser',
  },
  '/contact/v3/users/batch': {
    GET: 'batchContactUser',
  },
  '/contact/v3/users/find_by_department': {
    GET: { name: 'findByDepartmentContactUser', pagination: { argIndex: 0 } },
  },
  '/contact/v3/users/batch_get_id': {
    POST: 'batchGetIdContactUser',
  },
  '/contact/v3/users/{user_id}/resurrect': {
    POST: 'resurrectContactUser',
  },
  '/contact/v3/group': {
    POST: 'createContactGroup',
  },
  '/contact/v3/group/{group_id}': {
    PATCH: 'patchContactGroup',
    GET: 'getContactGroup',
    DELETE: 'deleteContactGroup',
  },
  '/contact/v3/group/simplelist': {
    GET: { name: 'simplelistContactGroup', pagination: { argIndex: 0, itemsKey: 'grouplist' } },
  },
  '/contact/v3/group/member_belong': {
    GET: { name: 'memberBelongContactGroup', pagination: { argIndex: 0, itemsKey: 'group_list' } },
  },
  '/contact/v3/custom_attrs': {
    GET: { name: 'listContactCustomAttr', pagination: { argIndex: 0 } },
  },
  '/contact/v3/employee_type_enums': {
    POST: 'createContactEmployeeTypeEnum',
    GET: { name: 'listContactEmployeeTypeEnum', pagination: { argIndex: 0 } },
  },
  '/contact/v3/employee_type_enums/{enum_id}': {
    PUT: 'updateContactEmployeeTypeEnum',
    DELETE: 'deleteContactEmployeeTypeEnum',
  },
  '/contact/v3/departments': {
    POST: 'createContactDepartment',
    GET: { name: 'listContactDepartment', pagination: { argIndex: 0 } },
  },
  '/contact/v3/departments/{department_id}': {
    PATCH: 'patchContactDepartment',
    PUT: 'updateContactDepartment',
    GET: 'getContactDepartment',
    DELETE: 'deleteContactDepartment',
  },
  '/contact/v3/departments/{department_id}/update_department_id': {
    PATCH: 'updateDepartmentIdContactDepartment',
  },
  '/contact/v3/departments/unbind_department_chat': {
    POST: 'unbindDepartmentChatContactDepartment',
  },
  '/contact/v3/departments/batch': {
    GET: 'batchContactDepartment',
  },
  '/contact/v3/departments/{department_id}/children': {
    GET: { name: 'childrenContactDepartment', pagination: { argIndex: 1 } },
  },
  '/contact/v3/departments/parent': {
    GET: { name: 'parentContactDepartment', pagination: { argIndex: 0 } },
  },
  '/contact/v3/departments/search': {
    POST: { name: 'searchContactDepartment', pagination: { argIndex: 1 } },
  },
  '/contact/v3/unit': {
    POST: 'createContactUnit',
    GET: { name: 'listContactUnit', pagination: { argIndex: 0, itemsKey: 'unitlist' } },
  },
  '/contact/v3/unit/{unit_id}': {
    PATCH: 'patchContactUnit',
    GET: 'getContactUnit',
    DELETE: 'deleteContactUnit',
  },
  '/contact/v3/unit/bind_department': {
    POST: 'bindDepartmentContactUnit',
  },
  '/contact/v3/unit/unbind_department': {
    POST: 'unbindDepartmentContactUnit',
  },
  '/contact/v3/unit/list_department': {
    GET: { name: 'listDepartmentContactUnit', pagination: { argIndex: 0, itemsKey: 'departmentlist' } },
  },
  '/contact/v3/group/{group_id}/member/add': {
    POST: 'addContactGroupMember',
  },
  '/contact/v3/group/{group_id}/member/batch_add': {
    POST: 'batchAddContactGroupMember',
  },
  '/contact/v3/group/{group_id}/member/simplelist': {
    GET: { name: 'simplelistContactGroupMember', pagination: { argIndex: 1, itemsKey: 'memberlist' } },
  },
  '/contact/v3/group/{group_id}/member/remove': {
    POST: 'removeContactGroupMember',
  },
  '/contact/v3/group/{group_id}/member/batch_remove': {
    POST: 'batchRemoveContactGroupMember',
  },
  '/contact/v3/functional_roles': {
    POST: 'createContactFunctionalRole',
  },
  '/contact/v3/functional_roles/{role_id}': {
    PUT: 'updateContactFunctionalRole',
    DELETE: 'deleteContactFunctionalRole',
  },
  '/contact/v3/functional_roles/{role_id}/members/batch_create': {
    POST: 'batchCreateContactFunctionalRoleMember',
  },
  '/contact/v3/functional_roles/{role_id}/members/scopes': {
    PATCH: 'scopesContactFunctionalRoleMember',
  },
  '/contact/v3/functional_roles/{role_id}/members/{member_id}': {
    GET: 'getContactFunctionalRoleMember',
  },
  '/contact/v3/functional_roles/{role_id}/members': {
    GET: { name: 'listContactFunctionalRoleMember', pagination: { argIndex: 1, itemsKey: 'members' } },
  },
  '/contact/v3/functional_roles/{role_id}/members/batch_delete': {
    PATCH: 'batchDeleteContactFunctionalRoleMember',
  },
  '/contact/v3/job_levels': {
    POST: 'createContactJobLevel',
    GET: { name: 'listContactJobLevel', pagination: { argIndex: 0 } },
  },
  '/contact/v3/job_levels/{job_level_id}': {
    PUT: 'updateContactJobLevel',
    GET: 'getContactJobLevel',
    DELETE: 'deleteContactJobLevel',
  },
  '/contact/v3/job_families': {
    POST: 'createContactJobFamily',
    GET: { name: 'listContactJobFamily', pagination: { argIndex: 0 } },
  },
  '/contact/v3/job_families/{job_family_id}': {
    PUT: 'updateContactJobFamily',
    GET: 'getContactJobFamily',
    DELETE: 'deleteContactJobFamily',
  },
  '/contact/v3/job_titles/{job_title_id}': {
    GET: 'getContactJobTitle',
  },
  '/contact/v3/job_titles': {
    GET: { name: 'listContactJobTitle', pagination: { argIndex: 0 } },
  },
  '/contact/v3/work_cities/{work_city_id}': {
    GET: 'getContactWorkCity',
  },
  '/contact/v3/work_cities': {
    GET: { name: 'listContactWorkCity', pagination: { argIndex: 0 } },
  },
})
