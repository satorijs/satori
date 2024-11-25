import { BaseResponse, Internal } from './internal'
import { Lark } from '.'

export type Pagination<T> = T & { page_size?: number; page_token?: string }

export type Paginated<T, ItemsKey extends string = 'items'> = {
  [K in ItemsKey]: T;
} & {
  has_more: boolean
  page_token: string
}

declare module './internal' {
  interface Internal {
    /**
    * 获取事件出口 IP
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-v1/outbound_ip/list
    */
    listEventOutboundIp(query?: ListEventOutboundIpQuery): Promise<ListEventOutboundIpResponse>
    /**
    * 自建应用获取 tenant_access_token
    * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
    */
    tenantAccessTokenInternalAuth(params: TenantAccessTokenInternalAuthRequest): Promise<TenantAccessTokenInternalAuthResponse>
    /**
    * 自建应用获取 app_access_token
    * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal
    */
    appAccessTokenInternalAuth(params: AppAccessTokenInternalAuthRequest): Promise<AppAccessTokenInternalAuthResponse>
    /**
    * 商店应用获取 app_access_token
    * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token
    */
    appAccessTokenAuth(params: AppAccessTokenAuthRequest): Promise<AppAccessTokenAuthResponse>
    /**
    * 商店应用获取 tenant_access_token
    * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token
    */
    tenantAccessTokenAuth(params: TenantAccessTokenAuthRequest): Promise<TenantAccessTokenAuthResponse>
    /**
    * 获取 user_access_token
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/oidc-access_token/create
    */
    createAuthenOidcAccessToken(params: CreateAuthenOidcAccessTokenRequest): Promise<CreateAuthenOidcAccessTokenResponse>
    /**
    * 刷新 user_access_token
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/oidc-refresh_access_token/create
    */
    createAuthenOidcRefreshAccessToken(params: CreateAuthenOidcRefreshAccessTokenRequest): Promise<CreateAuthenOidcRefreshAccessTokenResponse>
    /**
    * 重新获取 app_ticket
    * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_ticket_resend
    */
    appTicketResendAuth(params: AppTicketResendAuthRequest): Promise<BaseResponse>
    /**
    * 获取登录用户信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/user_info/get
    */
    getAuthenUserInfo(): Promise<GetAuthenUserInfoResponse>
    /**
    * 批量获取脱敏的用户登录信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/query
    */
    queryPassportSession(params: QueryPassportSessionRequest, query?: QueryPassportSessionQuery): Promise<QueryPassportSessionResponse>
    /**
    * 获取通讯录授权范围
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/scope/list
    */
    listContactScope(query?: ListContactScopeQuery): Promise<ListContactScopeResponse>
    /**
    * 创建用户
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/create
    */
    createContactUser(params: CreateContactUserRequest, query?: CreateContactUserQuery): Promise<CreateContactUserResponse>
    /**
    * 删除用户
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/delete
    */
    deleteContactUser(user_id: string, params: DeleteContactUserRequest, query?: DeleteContactUserQuery): Promise<BaseResponse>
    /**
    * 恢复已删除用户
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/resurrect
    */
    resurrectContactUser(user_id: string, params: ResurrectContactUserRequest, query?: ResurrectContactUserQuery): Promise<BaseResponse>
    /**
    * 修改用户部分信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/patch
    */
    patchContactUser(user_id: string, params: PatchContactUserRequest, query?: PatchContactUserQuery): Promise<PatchContactUserResponse>
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
    findByDepartmentContactUser(query?: FindByDepartmentContactUserQuery): Promise<FindByDepartmentContactUserResponse>
    /**
    * 通过手机号或邮箱获取用户 ID
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/batch_get_id
    */
    batchGetIdContactUser(params: BatchGetIdContactUserRequest, query?: BatchGetIdContactUserQuery): Promise<BatchGetIdContactUserResponse>
    /**
    * 更新用户ID
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update_user_id
    */
    updateUserIdContactUser(user_id: string, params: UpdateUserIdContactUserRequest, query?: UpdateUserIdContactUserQuery): Promise<BaseResponse>
    /**
    * 创建用户组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/create
    */
    createContactGroup(params: CreateContactGroupRequest, query?: CreateContactGroupQuery): Promise<CreateContactGroupResponse>
    /**
    * 删除用户组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/delete
    */
    deleteContactGroup(group_id: string): Promise<BaseResponse>
    /**
    * 更新用户组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/patch
    */
    patchContactGroup(group_id: string, params: PatchContactGroupRequest, query?: PatchContactGroupQuery): Promise<BaseResponse>
    /**
    * 查询指定用户组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/get
    */
    getContactGroup(group_id: string, query?: GetContactGroupQuery): Promise<GetContactGroupResponse>
    /**
    * 查询用户组列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/simplelist
    */
    simplelistContactGroup(query?: SimplelistContactGroupQuery): Promise<SimplelistContactGroupResponse>
    /**
    * 查询用户所属用户组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group/member_belong
    */
    memberBelongContactGroup(query?: MemberBelongContactGroupQuery): Promise<MemberBelongContactGroupResponse>
    /**
    * 获取企业自定义用户字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/custom_attr/list
    */
    listContactCustomAttr(query?: ListContactCustomAttrQuery): Promise<ListContactCustomAttrResponse>
    /**
    * 新增人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/create
    */
    createContactEmployeeTypeEnum(params: CreateContactEmployeeTypeEnumRequest): Promise<CreateContactEmployeeTypeEnumResponse>
    /**
    * 删除人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/delete
    */
    deleteContactEmployeeTypeEnum(enum_id: string): Promise<BaseResponse>
    /**
    * 更新人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/update
    */
    updateContactEmployeeTypeEnum(enum_id: string, params: UpdateContactEmployeeTypeEnumRequest): Promise<UpdateContactEmployeeTypeEnumResponse>
    /**
    * 查询人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/list
    */
    listContactEmployeeTypeEnum(query?: ListContactEmployeeTypeEnumQuery): Promise<ListContactEmployeeTypeEnumResponse>
    /**
    * 创建部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/create
    */
    createContactDepartment(params: CreateContactDepartmentRequest, query?: CreateContactDepartmentQuery): Promise<CreateContactDepartmentResponse>
    /**
    * 删除部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/delete
    */
    deleteContactDepartment(department_id: string, query?: DeleteContactDepartmentQuery): Promise<BaseResponse>
    /**
    * 修改部门部分信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/patch
    */
    patchContactDepartment(department_id: string, params: PatchContactDepartmentRequest, query?: PatchContactDepartmentQuery): Promise<PatchContactDepartmentResponse>
    /**
    * 更新部门所有信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update
    */
    updateContactDepartment(department_id: string, params: UpdateContactDepartmentRequest, query?: UpdateContactDepartmentQuery): Promise<UpdateContactDepartmentResponse>
    /**
    * 部门群转为普通群
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/unbind_department_chat
    */
    unbindDepartmentChatContactDepartment(params: UnbindDepartmentChatContactDepartmentRequest, query?: UnbindDepartmentChatContactDepartmentQuery): Promise<BaseResponse>
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
    childrenContactDepartment(department_id: string, query?: ChildrenContactDepartmentQuery): Promise<ChildrenContactDepartmentResponse>
    /**
    * 获取父部门信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/parent
    */
    parentContactDepartment(query?: ParentContactDepartmentQuery): Promise<ParentContactDepartmentResponse>
    /**
    * 搜索部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/search
    */
    searchContactDepartment(params: SearchContactDepartmentRequest, query?: SearchContactDepartmentQuery): Promise<SearchContactDepartmentResponse>
    /**
    * 更新部门ID
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update_department_id
    */
    updateDepartmentIdContactDepartment(department_id: string, params: UpdateDepartmentIdContactDepartmentRequest, query?: UpdateDepartmentIdContactDepartmentQuery): Promise<BaseResponse>
    /**
    * 创建单位
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/create
    */
    createContactUnit(params: CreateContactUnitRequest): Promise<CreateContactUnitResponse>
    /**
    * 删除单位
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/delete
    */
    deleteContactUnit(unit_id: string): Promise<BaseResponse>
    /**
    * 修改单位信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/patch
    */
    patchContactUnit(unit_id: string, params: PatchContactUnitRequest): Promise<BaseResponse>
    /**
    * 建立部门与单位的绑定关系
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/bind_department
    */
    bindDepartmentContactUnit(params: BindDepartmentContactUnitRequest): Promise<BaseResponse>
    /**
    * 解除部门与单位的绑定关系
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/unbind_department
    */
    unbindDepartmentContactUnit(params: UnbindDepartmentContactUnitRequest): Promise<BaseResponse>
    /**
    * 获取单位绑定的部门列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list_department
    */
    listDepartmentContactUnit(query?: ListDepartmentContactUnitQuery): Promise<ListDepartmentContactUnitResponse>
    /**
    * 获取单位信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/get
    */
    getContactUnit(unit_id: string): Promise<GetContactUnitResponse>
    /**
    * 获取单位列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/unit/list
    */
    listContactUnit(query?: ListContactUnitQuery): Promise<ListContactUnitResponse>
    /**
    * 添加用户组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/add
    */
    addContactGroupMember(group_id: string, params: AddContactGroupMemberRequest): Promise<BaseResponse>
    /**
    * 批量添加用户组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_add
    */
    batchAddContactGroupMember(group_id: string, params: BatchAddContactGroupMemberRequest): Promise<BatchAddContactGroupMemberResponse>
    /**
    * 移除用户组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/remove
    */
    removeContactGroupMember(group_id: string, params: RemoveContactGroupMemberRequest): Promise<BaseResponse>
    /**
    * 批量移除用户组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/batch_remove
    */
    batchRemoveContactGroupMember(group_id: string, params: BatchRemoveContactGroupMemberRequest): Promise<BaseResponse>
    /**
    * 查询用户组成员列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/group-member/simplelist
    */
    simplelistContactGroupMember(group_id: string, query?: SimplelistContactGroupMemberQuery): Promise<SimplelistContactGroupMemberResponse>
    /**
    * 创建角色
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/create
    */
    createContactFunctionalRole(params: CreateContactFunctionalRoleRequest): Promise<CreateContactFunctionalRoleResponse>
    /**
    * 删除角色
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/delete
    */
    deleteContactFunctionalRole(role_id: string): Promise<BaseResponse>
    /**
    * 修改角色名称
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role/update
    */
    updateContactFunctionalRole(role_id: string, params: UpdateContactFunctionalRoleRequest): Promise<BaseResponse>
    /**
    * 批量添加角色成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_create
    */
    batchCreateContactFunctionalRoleMember(role_id: string, params: BatchCreateContactFunctionalRoleMemberRequest, query?: BatchCreateContactFunctionalRoleMemberQuery): Promise<BatchCreateContactFunctionalRoleMemberResponse>
    /**
    * 删除角色下的成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/batch_delete
    */
    batchDeleteContactFunctionalRoleMember(role_id: string, params: BatchDeleteContactFunctionalRoleMemberRequest, query?: BatchDeleteContactFunctionalRoleMemberQuery): Promise<BatchDeleteContactFunctionalRoleMemberResponse>
    /**
    * 批量设置角色成员管理范围
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/scopes
    */
    scopesContactFunctionalRoleMember(role_id: string, params: ScopesContactFunctionalRoleMemberRequest, query?: ScopesContactFunctionalRoleMemberQuery): Promise<ScopesContactFunctionalRoleMemberResponse>
    /**
    * 查询角色下某个成员的管理范围
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/get
    */
    getContactFunctionalRoleMember(role_id: string, member_id: string, query?: GetContactFunctionalRoleMemberQuery): Promise<GetContactFunctionalRoleMemberResponse>
    /**
    * 查询角色下的所有成员信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/functional_role-member/list
    */
    listContactFunctionalRoleMember(role_id: string, query?: ListContactFunctionalRoleMemberQuery): Promise<ListContactFunctionalRoleMemberResponse>
    /**
    * 创建职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/create
    */
    createContactJobLevel(params: CreateContactJobLevelRequest): Promise<CreateContactJobLevelResponse>
    /**
    * 删除职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/delete
    */
    deleteContactJobLevel(job_level_id: string): Promise<BaseResponse>
    /**
    * 更新职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/update
    */
    updateContactJobLevel(job_level_id: string, params: UpdateContactJobLevelRequest): Promise<UpdateContactJobLevelResponse>
    /**
    * 获取单个职级信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/get
    */
    getContactJobLevel(job_level_id: string): Promise<GetContactJobLevelResponse>
    /**
    * 获取租户职级列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_level/list
    */
    listContactJobLevel(query?: ListContactJobLevelQuery): Promise<ListContactJobLevelResponse>
    /**
    * 创建序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/create
    */
    createContactJobFamily(params: CreateContactJobFamilyRequest): Promise<CreateContactJobFamilyResponse>
    /**
    * 删除序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/delete
    */
    deleteContactJobFamily(job_family_id: string): Promise<BaseResponse>
    /**
    * 更新序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/update
    */
    updateContactJobFamily(job_family_id: string, params: UpdateContactJobFamilyRequest): Promise<UpdateContactJobFamilyResponse>
    /**
    * 获取单个序列信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/get
    */
    getContactJobFamily(job_family_id: string): Promise<GetContactJobFamilyResponse>
    /**
    * 获取租户序列列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_family/list
    */
    listContactJobFamily(query?: ListContactJobFamilyQuery): Promise<ListContactJobFamilyResponse>
    /**
    * 获取单个职务信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_title/get
    */
    getContactJobTitle(job_title_id: string): Promise<GetContactJobTitleResponse>
    /**
    * 获取租户职务列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/job_title/list
    */
    listContactJobTitle(query?: ListContactJobTitleQuery): Promise<ListContactJobTitleResponse>
    /**
    * 获取单个工作城市信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/work_city/get
    */
    getContactWorkCity(work_city_id: string): Promise<GetContactWorkCityResponse>
    /**
    * 获取租户工作城市列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/work_city/list
    */
    listContactWorkCity(query?: ListContactWorkCityQuery): Promise<ListContactWorkCityResponse>
    /**
    * 发送消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
    */
    createImMessage(params: CreateImMessageRequest, query?: CreateImMessageQuery): Promise<CreateImMessageResponse>
    /**
    * 回复消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply
    */
    replyImMessage(message_id: string, params: ReplyImMessageRequest): Promise<ReplyImMessageResponse>
    /**
    * 编辑消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/update
    */
    updateImMessage(message_id: string, params: UpdateImMessageRequest): Promise<UpdateImMessageResponse>
    /**
    * 撤回消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete
    */
    deleteImMessage(message_id: string): Promise<BaseResponse>
    /**
    * 转发消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/forward
    */
    forwardImMessage(message_id: string, params: ForwardImMessageRequest, query?: ForwardImMessageQuery): Promise<ForwardImMessageResponse>
    /**
    * 合并转发消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/merge_forward
    */
    mergeForwardImMessage(params: MergeForwardImMessageRequest, query?: MergeForwardImMessageQuery): Promise<MergeForwardImMessageResponse>
    /**
    * 转发话题
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/thread/forward
    */
    forwardImThread(thread_id: string, params: ForwardImThreadRequest, query?: ForwardImThreadQuery): Promise<ForwardImThreadResponse>
    /**
    * 查询消息已读信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/read_users
    */
    readUsersImMessage(message_id: string, query?: ReadUsersImMessageQuery): Promise<ReadUsersImMessageResponse>
    /**
    * 获取会话历史消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/list
    */
    listImMessage(query?: ListImMessageQuery): Promise<ListImMessageResponse>
    /**
    * 获取消息中的资源文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-resource/get
    */
    getImMessageResource(message_id: string, file_key: string, query?: GetImMessageResourceQuery): Promise<Buffer>
    /**
    * 获取指定消息的内容
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/get
    */
    getImMessage(message_id: string): Promise<GetImMessageResponse>
    /**
    * 发送应用内加急
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_app
    */
    urgentAppImMessage(message_id: string, params: UrgentAppImMessageRequest, query?: UrgentAppImMessageQuery): Promise<UrgentAppImMessageResponse>
    /**
    * 发送短信加急
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_sms
    */
    urgentSmsImMessage(message_id: string, params: UrgentSmsImMessageRequest, query?: UrgentSmsImMessageQuery): Promise<UrgentSmsImMessageResponse>
    /**
    * 发送电话加急
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/urgent_phone
    */
    urgentPhoneImMessage(message_id: string, params: UrgentPhoneImMessageRequest, query?: UrgentPhoneImMessageQuery): Promise<UrgentPhoneImMessageResponse>
    /**
    * 批量撤回消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/delete
    */
    deleteImBatchMessage(batch_message_id: string): Promise<BaseResponse>
    /**
    * 查询批量消息推送和阅读人数
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/read_user
    */
    readUserImBatchMessage(batch_message_id: string): Promise<ReadUserImBatchMessageResponse>
    /**
    * 查询批量消息整体进度
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/batch_message/get_progress
    */
    getProgressImBatchMessage(batch_message_id: string): Promise<GetProgressImBatchMessageResponse>
    /**
    * 上传图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create
    */
    createImImage(form: FormData): Promise<CreateImImageResponse>
    /**
    * 下载图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/get
    */
    getImImage(image_key: string): Promise<Buffer>
    /**
    * 上传文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/create
    */
    createImFile(form: FormData): Promise<CreateImFileResponse>
    /**
    * 下载文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/file/get
    */
    getImFile(file_key: string): Promise<Buffer>
    /**
    * 更新应用发送的消息卡片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/patch
    */
    patchImMessage(message_id: string, params: PatchImMessageRequest): Promise<BaseResponse>
    /**
    * 添加消息表情回复
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/create
    */
    createImMessageReaction(message_id: string, params: CreateImMessageReactionRequest): Promise<CreateImMessageReactionResponse>
    /**
    * 删除消息表情回复
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/delete
    */
    deleteImMessageReaction(message_id: string, reaction_id: string): Promise<DeleteImMessageReactionResponse>
    /**
    * 获取消息表情回复
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/list
    */
    listImMessageReaction(message_id: string, query?: ListImMessageReactionQuery): Promise<ListImMessageReactionResponse>
    /**
    * Pin 消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/create
    */
    createImPin(params: CreateImPinRequest): Promise<CreateImPinResponse>
    /**
    * 移除 Pin 消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/delete
    */
    deleteImPin(message_id: string): Promise<BaseResponse>
    /**
    * 获取群内 Pin 消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/pin/list
    */
    listImPin(query?: ListImPinQuery): Promise<ListImPinResponse>
    /**
    * 创建群
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/create
    */
    createImChat(params: CreateImChatRequest, query?: CreateImChatQuery): Promise<CreateImChatResponse>
    /**
    * 解散群
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/delete
    */
    deleteImChat(chat_id: string): Promise<BaseResponse>
    /**
    * 更新群信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/update
    */
    updateImChat(chat_id: string, params: UpdateImChatRequest, query?: UpdateImChatQuery): Promise<BaseResponse>
    /**
    * 更新群发言权限
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/update
    */
    updateImChatModeration(chat_id: string, params: UpdateImChatModerationRequest, query?: UpdateImChatModerationQuery): Promise<BaseResponse>
    /**
    * 获取群信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/get
    */
    getImChat(chat_id: string, query?: GetImChatQuery): Promise<GetImChatResponse>
    /**
    * 更新群置顶
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/put_top_notice
    */
    putTopNoticeImChatTopNotice(chat_id: string, params: PutTopNoticeImChatTopNoticeRequest): Promise<BaseResponse>
    /**
    * 撤销群置顶
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-top_notice/delete_top_notice
    */
    deleteTopNoticeImChatTopNotice(chat_id: string): Promise<BaseResponse>
    /**
    * 获取用户或机器人所在的群列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/list
    */
    listImChat(query?: ListImChatQuery): Promise<ListImChatResponse>
    /**
    * 搜索对用户或机器人可见的群列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/search
    */
    searchImChat(query?: SearchImChatQuery): Promise<SearchImChatResponse>
    /**
    * 获取群成员发言权限
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-moderation/get
    */
    getImChatModeration(chat_id: string, query?: GetImChatModerationQuery): Promise<GetImChatModerationResponse>
    /**
    * 获取群分享链接
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/link
    */
    linkImChat(chat_id: string, params: LinkImChatRequest): Promise<LinkImChatResponse>
    /**
    * 指定群管理员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/add_managers
    */
    addManagersImChatManagers(chat_id: string, params: AddManagersImChatManagersRequest, query?: AddManagersImChatManagersQuery): Promise<AddManagersImChatManagersResponse>
    /**
    * 删除群管理员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-managers/delete_managers
    */
    deleteManagersImChatManagers(chat_id: string, params: DeleteManagersImChatManagersRequest, query?: DeleteManagersImChatManagersQuery): Promise<DeleteManagersImChatManagersResponse>
    /**
    * 将用户或机器人拉入群聊
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/create
    */
    createImChatMembers(chat_id: string, params: CreateImChatMembersRequest, query?: CreateImChatMembersQuery): Promise<CreateImChatMembersResponse>
    /**
    * 用户或机器人主动加入群聊
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/me_join
    */
    meJoinImChatMembers(chat_id: string): Promise<BaseResponse>
    /**
    * 将用户或机器人移出群聊
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/delete
    */
    deleteImChatMembers(chat_id: string, params: DeleteImChatMembersRequest, query?: DeleteImChatMembersQuery): Promise<DeleteImChatMembersResponse>
    /**
    * 获取群成员列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/get
    */
    getImChatMembers(chat_id: string, query?: GetImChatMembersQuery): Promise<GetImChatMembersResponse>
    /**
    * 判断用户或机器人是否在群里
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-members/is_in_chat
    */
    isInChatImChatMembers(chat_id: string): Promise<IsInChatImChatMembersResponse>
    /**
    * 更新群公告信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/patch
    */
    patchImChatAnnouncement(chat_id: string, params: PatchImChatAnnouncementRequest): Promise<BaseResponse>
    /**
    * 获取群公告信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-announcement/get
    */
    getImChatAnnouncement(chat_id: string, query?: GetImChatAnnouncementQuery): Promise<GetImChatAnnouncementResponse>
    /**
    * 添加会话标签页
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/create
    */
    createImChatTab(chat_id: string, params: CreateImChatTabRequest): Promise<CreateImChatTabResponse>
    /**
    * 删除会话标签页
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/delete_tabs
    */
    deleteTabsImChatTab(chat_id: string, params: DeleteTabsImChatTabRequest): Promise<DeleteTabsImChatTabResponse>
    /**
    * 更新会话标签页
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/update_tabs
    */
    updateTabsImChatTab(chat_id: string, params: UpdateTabsImChatTabRequest): Promise<UpdateTabsImChatTabResponse>
    /**
    * 会话标签页排序
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/sort_tabs
    */
    sortTabsImChatTab(chat_id: string, params: SortTabsImChatTabRequest): Promise<SortTabsImChatTabResponse>
    /**
    * 拉取会话标签页
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-tab/list_tabs
    */
    listTabsImChatTab(chat_id: string): Promise<ListTabsImChatTabResponse>
    /**
    * 添加群菜单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/create
    */
    createImChatMenuTree(chat_id: string, params: CreateImChatMenuTreeRequest): Promise<CreateImChatMenuTreeResponse>
    /**
    * 删除群菜单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/delete
    */
    deleteImChatMenuTree(chat_id: string, params: DeleteImChatMenuTreeRequest): Promise<DeleteImChatMenuTreeResponse>
    /**
    * 修改群菜单元信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_item/patch
    */
    patchImChatMenuItem(chat_id: string, menu_item_id: string, params: PatchImChatMenuItemRequest): Promise<PatchImChatMenuItemResponse>
    /**
    * 排序群菜单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/sort
    */
    sortImChatMenuTree(chat_id: string, params: SortImChatMenuTreeRequest): Promise<SortImChatMenuTreeResponse>
    /**
    * 获取群菜单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-menu_tree/get
    */
    getImChatMenuTree(chat_id: string): Promise<GetImChatMenuTreeResponse>
    /**
    * 获取文件夹下的清单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list
    */
    listDrivev1File(query?: ListDrivev1FileQuery): Promise<ListDrivev1FileResponse>
    /**
    * 新建文件夹
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_folder
    */
    createFolderDrivev1File(params: CreateFolderDrivev1FileRequest): Promise<CreateFolderDrivev1FileResponse>
    /**
    * 获取文档元数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/meta/batch_query
    */
    batchQueryDrivev1Meta(params: BatchQueryDrivev1MetaRequest, query?: BatchQueryDrivev1MetaQuery): Promise<BatchQueryDrivev1MetaResponse>
    /**
    * 获取文档统计信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-statistics/get
    */
    getDrivev1FileStatistics(file_token: string, query?: GetDrivev1FileStatisticsQuery): Promise<GetDrivev1FileStatisticsResponse>
    /**
    * 复制文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy
    */
    copyDrivev1File(file_token: string, params: CopyDrivev1FileRequest, query?: CopyDrivev1FileQuery): Promise<CopyDrivev1FileResponse>
    /**
    * 移动文件/文件夹
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/move
    */
    moveDrivev1File(file_token: string, params: MoveDrivev1FileRequest): Promise<MoveDrivev1FileResponse>
    /**
    * 删除文件/文件夹
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete
    */
    deleteDrivev1File(file_token: string, query?: DeleteDrivev1FileQuery): Promise<DeleteDrivev1FileResponse>
    /**
    * 创建文件快捷方式
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_shortcut
    */
    createShortcutDrivev1File(params: CreateShortcutDrivev1FileRequest, query?: CreateShortcutDrivev1FileQuery): Promise<CreateShortcutDrivev1FileResponse>
    /**
    * 查询异步任务状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check
    */
    taskCheckDrivev1File(query?: TaskCheckDrivev1FileQuery): Promise<TaskCheckDrivev1FileResponse>
    /**
    * 上传素材
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all
    */
    uploadAllDrivev1Media(form: FormData): Promise<UploadAllDrivev1MediaResponse>
    /**
    * 下载素材
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/download
    */
    downloadDrivev1Media(file_token: string, query?: DownloadDrivev1MediaQuery): Promise<Buffer>
    /**
    * 获取素材临时下载链接
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/batch_get_tmp_download_url
    */
    batchGetTmpDownloadUrlDrivev1Media(query?: BatchGetTmpDownloadUrlDrivev1MediaQuery): Promise<BatchGetTmpDownloadUrlDrivev1MediaResponse>
    /**
    * 分片上传素材（预上传）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare
    */
    uploadPrepareDrivev1Media(params: UploadPrepareDrivev1MediaRequest): Promise<UploadPrepareDrivev1MediaResponse>
    /**
    * 分片上传素材（上传分片）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part
    */
    uploadPartDrivev1Media(form: FormData): Promise<BaseResponse>
    /**
    * 分片上传素材（完成上传）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish
    */
    uploadFinishDrivev1Media(params: UploadFinishDrivev1MediaRequest): Promise<UploadFinishDrivev1MediaResponse>
    /**
    * 订阅云文档事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/subscribe
    */
    subscribeDrivev1File(file_token: string, query?: SubscribeDrivev1FileQuery): Promise<BaseResponse>
    /**
    * 取消云文档事件订阅
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete_subscribe
    */
    deleteSubscribeDrivev1File(file_token: string, query?: DeleteSubscribeDrivev1FileQuery): Promise<BaseResponse>
    /**
    * 查询云文档事件订阅状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/get_subscribe
    */
    getSubscribeDrivev1File(file_token: string, query?: GetSubscribeDrivev1FileQuery): Promise<BaseResponse>
    /**
    * 上传文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all
    */
    uploadAllDrivev1File(form: FormData): Promise<UploadAllDrivev1FileResponse>
    /**
    * 分片上传文件（预上传）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare
    */
    uploadPrepareDrivev1File(params: UploadPrepareDrivev1FileRequest): Promise<UploadPrepareDrivev1FileResponse>
    /**
    * 分片上传文件（上传分片）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part
    */
    uploadPartDrivev1File(form: FormData): Promise<BaseResponse>
    /**
    * 分片上传文件（完成上传）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish
    */
    uploadFinishDrivev1File(params: UploadFinishDrivev1FileRequest): Promise<UploadFinishDrivev1FileResponse>
    /**
    * 下载文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/download
    */
    downloadDrivev1File(file_token: string): Promise<Buffer>
    /**
    * 创建导入任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create
    */
    createDrivev1ImportTask(params: CreateDrivev1ImportTaskRequest): Promise<CreateDrivev1ImportTaskResponse>
    /**
    * 查询导入任务结果
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get
    */
    getDrivev1ImportTask(ticket: string): Promise<GetDrivev1ImportTaskResponse>
    /**
    * 创建导出任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create
    */
    createDrivev1ExportTask(params: CreateDrivev1ExportTaskRequest): Promise<CreateDrivev1ExportTaskResponse>
    /**
    * 查询导出任务结果
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get
    */
    getDrivev1ExportTask(ticket: string, query?: GetDrivev1ExportTaskQuery): Promise<GetDrivev1ExportTaskResponse>
    /**
    * 获取文档访问记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-view_record/list
    */
    listDrivev1FileViewRecord(file_token: string, query?: ListDrivev1FileViewRecordQuery): Promise<ListDrivev1FileViewRecordResponse>
    /**
    * 创建文档版本
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/create
    */
    createDrivev1FileVersion(file_token: string, params: CreateDrivev1FileVersionRequest, query?: CreateDrivev1FileVersionQuery): Promise<CreateDrivev1FileVersionResponse>
    /**
    * 删除文档版本
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/delete
    */
    deleteDrivev1FileVersion(file_token: string, version_id: string, query?: DeleteDrivev1FileVersionQuery): Promise<BaseResponse>
    /**
    * 获取文档版本
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/get
    */
    getDrivev1FileVersion(file_token: string, version_id: string, query?: GetDrivev1FileVersionQuery): Promise<GetDrivev1FileVersionResponse>
    /**
    * 获取文档版本列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/list
    */
    listDrivev1FileVersion(file_token: string, query?: ListDrivev1FileVersionQuery): Promise<ListDrivev1FileVersionResponse>
    /**
    * 转移所有者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/transfer_owner
    */
    transferOwnerDrivev1PermissionMember(token: string, params: TransferOwnerDrivev1PermissionMemberRequest, query?: TransferOwnerDrivev1PermissionMemberQuery): Promise<BaseResponse>
    /**
    * 判断当前用户是否有某权限
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/auth
    */
    authDrivev1PermissionMember(token: string, query?: AuthDrivev1PermissionMemberQuery): Promise<AuthDrivev1PermissionMemberResponse>
    /**
    * 获取协作者列表（新版本）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/list
    */
    listDrivev1PermissionMember(token: string, query?: ListDrivev1PermissionMemberQuery): Promise<ListDrivev1PermissionMemberResponse>
    /**
    * 增加协作者权限
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create
    */
    createDrivev1PermissionMember(token: string, params: CreateDrivev1PermissionMemberRequest, query?: CreateDrivev1PermissionMemberQuery): Promise<CreateDrivev1PermissionMemberResponse>
    /**
    * 更新协作者权限
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/update
    */
    updateDrivev1PermissionMember(token: string, member_id: string, params: UpdateDrivev1PermissionMemberRequest, query?: UpdateDrivev1PermissionMemberQuery): Promise<UpdateDrivev1PermissionMemberResponse>
    /**
    * 移除协作者权限
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/delete
    */
    deleteDrivev1PermissionMember(token: string, member_id: string, query?: DeleteDrivev1PermissionMemberQuery): Promise<BaseResponse>
    /**
    * 开启密码
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/create
    */
    createDrivev1PermissionPublicPassword(token: string, query?: CreateDrivev1PermissionPublicPasswordQuery): Promise<CreateDrivev1PermissionPublicPasswordResponse>
    /**
    * 刷新密码
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/update
    */
    updateDrivev1PermissionPublicPassword(token: string, query?: UpdateDrivev1PermissionPublicPasswordQuery): Promise<UpdateDrivev1PermissionPublicPasswordResponse>
    /**
    * 关闭密码
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/delete
    */
    deleteDrivev1PermissionPublicPassword(token: string, query?: DeleteDrivev1PermissionPublicPasswordQuery): Promise<BaseResponse>
    /**
    * 获取云文档权限设置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/get
    */
    getDrivev1PermissionPublic(token: string, query?: GetDrivev1PermissionPublicQuery): Promise<GetDrivev1PermissionPublicResponse>
    /**
    * 更新云文档权限设置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/patch
    */
    patchDrivev1PermissionPublic(token: string, params: PatchDrivev1PermissionPublicRequest, query?: PatchDrivev1PermissionPublicQuery): Promise<PatchDrivev1PermissionPublicResponse>
    /**
    * 获取云文档权限设置
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/get
    */
    getDrivev2PermissionPublic(token: string, query?: GetDrivev2PermissionPublicQuery): Promise<GetDrivev2PermissionPublicResponse>
    /**
    * 更新云文档权限设置
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/patch
    */
    patchDrivev2PermissionPublic(token: string, params: PatchDrivev2PermissionPublicRequest, query?: PatchDrivev2PermissionPublicQuery): Promise<PatchDrivev2PermissionPublicResponse>
    /**
    * 获取云文档所有评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/list
    */
    listDrivev1FileComment(file_token: string, query?: ListDrivev1FileCommentQuery): Promise<ListDrivev1FileCommentResponse>
    /**
    * 批量获取评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/batch_query
    */
    batchQueryDrivev1FileComment(file_token: string, params: BatchQueryDrivev1FileCommentRequest, query?: BatchQueryDrivev1FileCommentQuery): Promise<BatchQueryDrivev1FileCommentResponse>
    /**
    * 解决/恢复评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/patch
    */
    patchDrivev1FileComment(file_token: string, comment_id: string, params: PatchDrivev1FileCommentRequest, query?: PatchDrivev1FileCommentQuery): Promise<BaseResponse>
    /**
    * 添加全文评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/create
    */
    createDrivev1FileComment(file_token: string, params: CreateDrivev1FileCommentRequest, query?: CreateDrivev1FileCommentQuery): Promise<CreateDrivev1FileCommentResponse>
    /**
    * 获取全文评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/get
    */
    getDrivev1FileComment(file_token: string, comment_id: string, query?: GetDrivev1FileCommentQuery): Promise<GetDrivev1FileCommentResponse>
    /**
    * 获取回复信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/list
    */
    listDrivev1FileCommentReply(file_token: string, comment_id: string, query?: ListDrivev1FileCommentReplyQuery): Promise<ListDrivev1FileCommentReplyResponse>
    /**
    * 更新回复的内容
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/update
    */
    updateDrivev1FileCommentReply(file_token: string, comment_id: string, reply_id: string, params: UpdateDrivev1FileCommentReplyRequest, query?: UpdateDrivev1FileCommentReplyQuery): Promise<BaseResponse>
    /**
    * 删除回复
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/delete
    */
    deleteDrivev1FileCommentReply(file_token: string, comment_id: string, reply_id: string, query?: DeleteDrivev1FileCommentReplyQuery): Promise<BaseResponse>
    /**
    * 获取文档基本信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/get
    */
    getDocxDocument(document_id: string): Promise<GetDocxDocumentResponse>
    /**
    * 获取文档纯文本内容
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/raw_content
    */
    rawContentDocxDocument(document_id: string, query?: RawContentDocxDocumentQuery): Promise<RawContentDocxDocumentResponse>
    /**
    * 获取文档所有块
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/list
    */
    listDocxDocumentBlock(document_id: string, query?: ListDocxDocumentBlockQuery): Promise<ListDocxDocumentBlockResponse>
    /**
    * 创建文档
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/create
    */
    createDocxDocument(params: CreateDocxDocumentRequest): Promise<CreateDocxDocumentResponse>
    /**
    * 获取块的内容
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/get
    */
    getDocxDocumentBlock(document_id: string, block_id: string, query?: GetDocxDocumentBlockQuery): Promise<GetDocxDocumentBlockResponse>
    /**
    * 获取所有子块
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/get
    */
    getDocxDocumentBlockChildren(document_id: string, block_id: string, query?: GetDocxDocumentBlockChildrenQuery): Promise<GetDocxDocumentBlockChildrenResponse>
    /**
    * 创建块
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/create
    */
    createDocxDocumentBlockChildren(document_id: string, block_id: string, params: CreateDocxDocumentBlockChildrenRequest, query?: CreateDocxDocumentBlockChildrenQuery): Promise<CreateDocxDocumentBlockChildrenResponse>
    /**
    * 更新块的内容
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/patch
    */
    patchDocxDocumentBlock(document_id: string, block_id: string, params: PatchDocxDocumentBlockRequest, query?: PatchDocxDocumentBlockQuery): Promise<PatchDocxDocumentBlockResponse>
    /**
    * 批量更新块的内容
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/batch_update
    */
    batchUpdateDocxDocumentBlock(document_id: string, params: BatchUpdateDocxDocumentBlockRequest, query?: BatchUpdateDocxDocumentBlockQuery): Promise<BatchUpdateDocxDocumentBlockResponse>
    /**
    * 删除块
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/batch_delete
    */
    batchDeleteDocxDocumentBlockChildren(document_id: string, block_id: string, params: BatchDeleteDocxDocumentBlockChildrenRequest, query?: BatchDeleteDocxDocumentBlockChildrenQuery): Promise<BatchDeleteDocxDocumentBlockChildrenResponse>
    /**
    * 获取所有节点
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/board-v1/whiteboard-node/list
    */
    listBoardWhiteboardNode(whiteboard_id: string): Promise<ListBoardWhiteboardNodeResponse>
    /**
    * 修改电子表格属性
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/patch
    */
    patchSheetsSpreadsheet(spreadsheet_token: string, params: PatchSheetsSpreadsheetRequest): Promise<BaseResponse>
    /**
    * 获取电子表格信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/get
    */
    getSheetsSpreadsheet(spreadsheet_token: string, query?: GetSheetsSpreadsheetQuery): Promise<GetSheetsSpreadsheetResponse>
    /**
    * 创建表格
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet/create
    */
    createSheetsSpreadsheet(params: CreateSheetsSpreadsheetRequest): Promise<CreateSheetsSpreadsheetResponse>
    /**
    * 查询工作表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/get
    */
    getSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string): Promise<GetSheetsSpreadsheetSheetResponse>
    /**
    * 获取工作表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/query
    */
    querySheetsSpreadsheetSheet(spreadsheet_token: string): Promise<QuerySheetsSpreadsheetSheetResponse>
    /**
    * 移动行列
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/move_dimension
    */
    moveDimensionSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string, params: MoveDimensionSheetsSpreadsheetSheetRequest): Promise<BaseResponse>
    /**
    * 查找单元格
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/find
    */
    findSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string, params: FindSheetsSpreadsheetSheetRequest): Promise<FindSheetsSpreadsheetSheetResponse>
    /**
    * 替换单元格
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet/replace
    */
    replaceSheetsSpreadsheetSheet(spreadsheet_token: string, sheet_id: string, params: ReplaceSheetsSpreadsheetSheetRequest): Promise<ReplaceSheetsSpreadsheetSheetResponse>
    /**
    * 获取筛选
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/get
    */
    getSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string): Promise<GetSheetsSpreadsheetSheetFilterResponse>
    /**
    * 创建筛选
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/create
    */
    createSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string, params: CreateSheetsSpreadsheetSheetFilterRequest): Promise<BaseResponse>
    /**
    * 更新筛选
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/update
    */
    updateSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string, params: UpdateSheetsSpreadsheetSheetFilterRequest): Promise<BaseResponse>
    /**
    * 删除筛选
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter/delete
    */
    deleteSheetsSpreadsheetSheetFilter(spreadsheet_token: string, sheet_id: string): Promise<BaseResponse>
    /**
    * 获取筛选视图
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/get
    */
    getSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, filter_view_id: string): Promise<GetSheetsSpreadsheetSheetFilterViewResponse>
    /**
    * 查询筛选视图
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/query
    */
    querySheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string): Promise<QuerySheetsSpreadsheetSheetFilterViewResponse>
    /**
    * 创建筛选视图
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/create
    */
    createSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, params: CreateSheetsSpreadsheetSheetFilterViewRequest): Promise<CreateSheetsSpreadsheetSheetFilterViewResponse>
    /**
    * 更新筛选视图
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/patch
    */
    patchSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, filter_view_id: string, params: PatchSheetsSpreadsheetSheetFilterViewRequest): Promise<PatchSheetsSpreadsheetSheetFilterViewResponse>
    /**
    * 删除筛选视图
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view/delete
    */
    deleteSheetsSpreadsheetSheetFilterView(spreadsheet_token: string, sheet_id: string, filter_view_id: string): Promise<BaseResponse>
    /**
    * 获取筛选条件
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/get
    */
    getSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, condition_id: string): Promise<GetSheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
    * 查询筛选条件
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/query
    */
    querySheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string): Promise<QuerySheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
    * 创建筛选条件
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/create
    */
    createSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, params: CreateSheetsSpreadsheetSheetFilterViewConditionRequest): Promise<CreateSheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
    * 更新筛选条件
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/update
    */
    updateSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, condition_id: string, params: UpdateSheetsSpreadsheetSheetFilterViewConditionRequest): Promise<UpdateSheetsSpreadsheetSheetFilterViewConditionResponse>
    /**
    * 删除筛选条件
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-filter_view-condition/delete
    */
    deleteSheetsSpreadsheetSheetFilterViewCondition(spreadsheet_token: string, sheet_id: string, filter_view_id: string, condition_id: string): Promise<BaseResponse>
    /**
    * 获取浮动图片
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/get
    */
    getSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, float_image_id: string): Promise<GetSheetsSpreadsheetSheetFloatImageResponse>
    /**
    * 查询浮动图片
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/query
    */
    querySheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string): Promise<QuerySheetsSpreadsheetSheetFloatImageResponse>
    /**
    * 创建浮动图片
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/create
    */
    createSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, params: CreateSheetsSpreadsheetSheetFloatImageRequest): Promise<CreateSheetsSpreadsheetSheetFloatImageResponse>
    /**
    * 更新浮动图片
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/patch
    */
    patchSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, float_image_id: string, params: PatchSheetsSpreadsheetSheetFloatImageRequest): Promise<PatchSheetsSpreadsheetSheetFloatImageResponse>
    /**
    * 删除浮动图片
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/sheets-v3/spreadsheet-sheet-float_image/delete
    */
    deleteSheetsSpreadsheetSheetFloatImage(spreadsheet_token: string, sheet_id: string, float_image_id: string): Promise<BaseResponse>
    /**
    * 复制多维表格
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/copy
    */
    copyBitableApp(app_token: string, params: CopyBitableAppRequest): Promise<CopyBitableAppResponse>
    /**
    * 创建多维表格
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/create
    */
    createBitableApp(params: CreateBitableAppRequest): Promise<CreateBitableAppResponse>
    /**
    * 获取多维表格元数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/get
    */
    getBitableApp(app_token: string): Promise<GetBitableAppResponse>
    /**
    * 更新多维表格元数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update
    */
    updateBitableApp(app_token: string, params: UpdateBitableAppRequest): Promise<UpdateBitableAppResponse>
    /**
    * 新增一个数据表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/create
    */
    createBitableAppTable(app_token: string, params: CreateBitableAppTableRequest): Promise<CreateBitableAppTableResponse>
    /**
    * 新增多个数据表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_create
    */
    batchCreateBitableAppTable(app_token: string, params: BatchCreateBitableAppTableRequest, query?: BatchCreateBitableAppTableQuery): Promise<BatchCreateBitableAppTableResponse>
    /**
    * 删除一个数据表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/delete
    */
    deleteBitableAppTable(app_token: string, table_id: string): Promise<BaseResponse>
    /**
    * 删除多个数据表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_delete
    */
    batchDeleteBitableAppTable(app_token: string, params: BatchDeleteBitableAppTableRequest): Promise<BaseResponse>
    /**
    * 更新数据表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/patch
    */
    patchBitableAppTable(app_token: string, table_id: string, params: PatchBitableAppTableRequest): Promise<PatchBitableAppTableResponse>
    /**
    * 列出数据表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/list
    */
    listBitableAppTable(app_token: string, query?: ListBitableAppTableQuery): Promise<ListBitableAppTableResponse>
    /**
    * 复制仪表盘
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/copy
    */
    copyBitableAppDashboard(app_token: string, block_id: string, params: CopyBitableAppDashboardRequest): Promise<CopyBitableAppDashboardResponse>
    /**
    * 列出仪表盘
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/list
    */
    listBitableAppDashboard(app_token: string, query?: ListBitableAppDashboardQuery): Promise<ListBitableAppDashboardResponse>
    /**
    * 更新视图
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/patch
    */
    patchBitableAppTableView(app_token: string, table_id: string, view_id: string, params: PatchBitableAppTableViewRequest): Promise<PatchBitableAppTableViewResponse>
    /**
    * 检索视图
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/get
    */
    getBitableAppTableView(app_token: string, table_id: string, view_id: string): Promise<GetBitableAppTableViewResponse>
    /**
    * 列出视图
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/list
    */
    listBitableAppTableView(app_token: string, table_id: string, query?: ListBitableAppTableViewQuery): Promise<ListBitableAppTableViewResponse>
    /**
    * 新增视图
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/create
    */
    createBitableAppTableView(app_token: string, table_id: string, params: CreateBitableAppTableViewRequest): Promise<CreateBitableAppTableViewResponse>
    /**
    * 删除视图
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/delete
    */
    deleteBitableAppTableView(app_token: string, table_id: string, view_id: string): Promise<BaseResponse>
    /**
    * 更新表单元数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/patch
    */
    patchBitableAppTableForm(app_token: string, table_id: string, form_id: string, params: PatchBitableAppTableFormRequest): Promise<PatchBitableAppTableFormResponse>
    /**
    * 获取表单元数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/get
    */
    getBitableAppTableForm(app_token: string, table_id: string, form_id: string): Promise<GetBitableAppTableFormResponse>
    /**
    * 更新表单问题
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/patch
    */
    patchBitableAppTableFormField(app_token: string, table_id: string, form_id: string, field_id: string, params: PatchBitableAppTableFormFieldRequest): Promise<PatchBitableAppTableFormFieldResponse>
    /**
    * 列出表单问题
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/list
    */
    listBitableAppTableFormField(app_token: string, table_id: string, form_id: string, query?: ListBitableAppTableFormFieldQuery): Promise<ListBitableAppTableFormFieldResponse>
    /**
    * 检索记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/get
    */
    getBitableAppTableRecord(app_token: string, table_id: string, record_id: string, query?: GetBitableAppTableRecordQuery): Promise<GetBitableAppTableRecordResponse>
    /**
    * 查询记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/search
    */
    searchBitableAppTableRecord(app_token: string, table_id: string, params: SearchBitableAppTableRecordRequest, query?: SearchBitableAppTableRecordQuery): Promise<SearchBitableAppTableRecordResponse>
    /**
    * 新增记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/create
    */
    createBitableAppTableRecord(app_token: string, table_id: string, params: CreateBitableAppTableRecordRequest, query?: CreateBitableAppTableRecordQuery): Promise<CreateBitableAppTableRecordResponse>
    /**
    * 更新记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/update
    */
    updateBitableAppTableRecord(app_token: string, table_id: string, record_id: string, params: UpdateBitableAppTableRecordRequest, query?: UpdateBitableAppTableRecordQuery): Promise<UpdateBitableAppTableRecordResponse>
    /**
    * 删除记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/delete
    */
    deleteBitableAppTableRecord(app_token: string, table_id: string, record_id: string): Promise<DeleteBitableAppTableRecordResponse>
    /**
    * 新增多条记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_create
    */
    batchCreateBitableAppTableRecord(app_token: string, table_id: string, params: BatchCreateBitableAppTableRecordRequest, query?: BatchCreateBitableAppTableRecordQuery): Promise<BatchCreateBitableAppTableRecordResponse>
    /**
    * 更新多条记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_update
    */
    batchUpdateBitableAppTableRecord(app_token: string, table_id: string, params: BatchUpdateBitableAppTableRecordRequest, query?: BatchUpdateBitableAppTableRecordQuery): Promise<BatchUpdateBitableAppTableRecordResponse>
    /**
    * 删除多条记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_delete
    */
    batchDeleteBitableAppTableRecord(app_token: string, table_id: string, params: BatchDeleteBitableAppTableRecordRequest): Promise<BatchDeleteBitableAppTableRecordResponse>
    /**
    * 列出字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/list
    */
    listBitableAppTableField(app_token: string, table_id: string, query?: ListBitableAppTableFieldQuery): Promise<ListBitableAppTableFieldResponse>
    /**
    * 新增字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/create
    */
    createBitableAppTableField(app_token: string, table_id: string, params: CreateBitableAppTableFieldRequest, query?: CreateBitableAppTableFieldQuery): Promise<CreateBitableAppTableFieldResponse>
    /**
    * 更新字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/update
    */
    updateBitableAppTableField(app_token: string, table_id: string, field_id: string, params: UpdateBitableAppTableFieldRequest): Promise<UpdateBitableAppTableFieldResponse>
    /**
    * 删除字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/delete
    */
    deleteBitableAppTableField(app_token: string, table_id: string, field_id: string): Promise<DeleteBitableAppTableFieldResponse>
    /**
    * 列出自定义角色
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/list
    */
    listBitableAppRole(app_token: string, query?: ListBitableAppRoleQuery): Promise<ListBitableAppRoleResponse>
    /**
    * 新增自定义角色
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create
    */
    createBitableAppRole(app_token: string, params: CreateBitableAppRoleRequest): Promise<CreateBitableAppRoleResponse>
    /**
    * 删除自定义角色
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/delete
    */
    deleteBitableAppRole(app_token: string, role_id: string): Promise<BaseResponse>
    /**
    * 更新自定义角色
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/update
    */
    updateBitableAppRole(app_token: string, role_id: string, params: UpdateBitableAppRoleRequest): Promise<UpdateBitableAppRoleResponse>
    /**
    * 批量删除协作者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_delete
    */
    batchDeleteBitableAppRoleMember(app_token: string, role_id: string, params: BatchDeleteBitableAppRoleMemberRequest): Promise<BaseResponse>
    /**
    * 批量新增协作者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_create
    */
    batchCreateBitableAppRoleMember(app_token: string, role_id: string, params: BatchCreateBitableAppRoleMemberRequest): Promise<BaseResponse>
    /**
    * 列出协作者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/list
    */
    listBitableAppRoleMember(app_token: string, role_id: string, query?: ListBitableAppRoleMemberQuery): Promise<ListBitableAppRoleMemberResponse>
    /**
    * 新增协作者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/create
    */
    createBitableAppRoleMember(app_token: string, role_id: string, params: CreateBitableAppRoleMemberRequest, query?: CreateBitableAppRoleMemberQuery): Promise<BaseResponse>
    /**
    * 删除协作者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/delete
    */
    deleteBitableAppRoleMember(app_token: string, role_id: string, member_id: string, query?: DeleteBitableAppRoleMemberQuery): Promise<BaseResponse>
    /**
    * 获取知识空间列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/list
    */
    listWikiSpace(query?: ListWikiSpaceQuery): Promise<ListWikiSpaceResponse>
    /**
    * 获取知识空间信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get
    */
    getWikiSpace(space_id: string): Promise<GetWikiSpaceResponse>
    /**
    * 创建知识空间
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/create
    */
    createWikiSpace(params: CreateWikiSpaceRequest): Promise<CreateWikiSpaceResponse>
    /**
    * 添加知识空间成员
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/create
    */
    createWikiSpaceMember(space_id: string, params: CreateWikiSpaceMemberRequest, query?: CreateWikiSpaceMemberQuery): Promise<CreateWikiSpaceMemberResponse>
    /**
    * 删除知识空间成员
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/delete
    */
    deleteWikiSpaceMember(space_id: string, member_id: string, params: DeleteWikiSpaceMemberRequest): Promise<DeleteWikiSpaceMemberResponse>
    /**
    * 更新知识空间设置
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-setting/update
    */
    updateWikiSpaceSetting(space_id: string, params: UpdateWikiSpaceSettingRequest): Promise<UpdateWikiSpaceSettingResponse>
    /**
    * 创建知识空间节点
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/create
    */
    createWikiSpaceNode(space_id: string, params: CreateWikiSpaceNodeRequest): Promise<CreateWikiSpaceNodeResponse>
    /**
    * 获取知识空间节点信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get_node
    */
    getNodeWikiSpace(query?: GetNodeWikiSpaceQuery): Promise<GetNodeWikiSpaceResponse>
    /**
    * 获取知识空间子节点列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/list
    */
    listWikiSpaceNode(space_id: string, query?: ListWikiSpaceNodeQuery): Promise<ListWikiSpaceNodeResponse>
    /**
    * 移动知识空间节点
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move
    */
    moveWikiSpaceNode(space_id: string, node_token: string, params: MoveWikiSpaceNodeRequest): Promise<MoveWikiSpaceNodeResponse>
    /**
    * 更新知识空间节点标题
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/update_title
    */
    updateTitleWikiSpaceNode(space_id: string, node_token: string, params: UpdateTitleWikiSpaceNodeRequest): Promise<BaseResponse>
    /**
    * 创建知识空间节点副本
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/copy
    */
    copyWikiSpaceNode(space_id: string, node_token: string, params: CopyWikiSpaceNodeRequest): Promise<CopyWikiSpaceNodeResponse>
    /**
    * 移动云空间文档至知识空间
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move_docs_to_wiki
    */
    moveDocsToWikiWikiSpaceNode(space_id: string, params: MoveDocsToWikiWikiSpaceNodeRequest): Promise<MoveDocsToWikiWikiSpaceNodeResponse>
    /**
    * 获取任务结果
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get
    */
    getWikiTask(task_id: string, query?: GetWikiTaskQuery): Promise<GetWikiTaskResponse>
    /**
    * 搜索 Wiki
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uEzN0YjLxcDN24SM3QjN/search_wiki
    */
    searchWikiNode(params: SearchWikiNodeRequest, query?: SearchWikiNodeQuery): Promise<SearchWikiNodeResponse>
    /**
    * 获取订阅状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/get
    */
    getDrivev1FileSubscription(file_token: string, subscription_id: string, params: GetDrivev1FileSubscriptionRequest): Promise<GetDrivev1FileSubscriptionResponse>
    /**
    * 创建订阅
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/create
    */
    createDrivev1FileSubscription(file_token: string, params: CreateDrivev1FileSubscriptionRequest): Promise<CreateDrivev1FileSubscriptionResponse>
    /**
    * 更新订阅状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/patch
    */
    patchDrivev1FileSubscription(file_token: string, subscription_id: string, params: PatchDrivev1FileSubscriptionRequest): Promise<PatchDrivev1FileSubscriptionResponse>
    /**
    * 创建共享日历
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/create
    */
    createCalendar(params: CreateCalendarRequest): Promise<CreateCalendarResponse>
    /**
    * 删除共享日历
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/delete
    */
    deleteCalendar(calendar_id: string): Promise<BaseResponse>
    /**
    * 查询主日历信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary
    */
    primaryCalendar(query?: PrimaryCalendarQuery): Promise<PrimaryCalendarResponse>
    /**
    * 查询日历信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get
    */
    getCalendar(calendar_id: string): Promise<GetCalendarResponse>
    /**
    * 查询主日历日程忙闲信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/freebusy/list
    */
    listCalendarFreebusy(params: ListCalendarFreebusyRequest, query?: ListCalendarFreebusyQuery): Promise<ListCalendarFreebusyResponse>
    /**
    * 查询日历列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list
    */
    listCalendar(query?: ListCalendarQuery): Promise<ListCalendarResponse>
    /**
    * 更新日历信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/patch
    */
    patchCalendar(calendar_id: string, params: PatchCalendarRequest): Promise<PatchCalendarResponse>
    /**
    * 搜索日历
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/search
    */
    searchCalendar(params: SearchCalendarRequest, query?: SearchCalendarQuery): Promise<SearchCalendarResponse>
    /**
    * 订阅日历
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscribe
    */
    subscribeCalendar(calendar_id: string): Promise<SubscribeCalendarResponse>
    /**
    * 取消订阅日历
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscribe
    */
    unsubscribeCalendar(calendar_id: string): Promise<BaseResponse>
    /**
    * 订阅日历变更事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscription
    */
    subscriptionCalendar(): Promise<BaseResponse>
    /**
    * 取消订阅日历变更事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscription
    */
    unsubscriptionCalendar(): Promise<BaseResponse>
    /**
    * 创建访问控制
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/create
    */
    createCalendarCalendarAcl(calendar_id: string, params: CreateCalendarCalendarAclRequest, query?: CreateCalendarCalendarAclQuery): Promise<CreateCalendarCalendarAclResponse>
    /**
    * 删除访问控制
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/delete
    */
    deleteCalendarCalendarAcl(calendar_id: string, acl_id: string): Promise<BaseResponse>
    /**
    * 获取访问控制列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list
    */
    listCalendarCalendarAcl(calendar_id: string, query?: ListCalendarCalendarAclQuery): Promise<ListCalendarCalendarAclResponse>
    /**
    * 订阅日历访问控制变更事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/subscription
    */
    subscriptionCalendarCalendarAcl(calendar_id: string): Promise<BaseResponse>
    /**
    * 取消订阅日历访问控制变更事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/unsubscription
    */
    unsubscriptionCalendarCalendarAcl(calendar_id: string): Promise<BaseResponse>
    /**
    * 创建日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/create
    */
    createCalendarCalendarEvent(calendar_id: string, params: CreateCalendarCalendarEventRequest, query?: CreateCalendarCalendarEventQuery): Promise<CreateCalendarCalendarEventResponse>
    /**
    * 删除日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/delete
    */
    deleteCalendarCalendarEvent(calendar_id: string, event_id: string, query?: DeleteCalendarCalendarEventQuery): Promise<BaseResponse>
    /**
    * 更新日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/patch
    */
    patchCalendarCalendarEvent(calendar_id: string, event_id: string, params: PatchCalendarCalendarEventRequest, query?: PatchCalendarCalendarEventQuery): Promise<PatchCalendarCalendarEventResponse>
    /**
    * 获取日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get
    */
    getCalendarCalendarEvent(calendar_id: string, event_id: string, query?: GetCalendarCalendarEventQuery): Promise<GetCalendarCalendarEventResponse>
    /**
    * 获取日程列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list
    */
    listCalendarCalendarEvent(calendar_id: string, query?: ListCalendarCalendarEventQuery): Promise<ListCalendarCalendarEventResponse>
    /**
    * 搜索日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/search
    */
    searchCalendarCalendarEvent(calendar_id: string, params: SearchCalendarCalendarEventRequest, query?: SearchCalendarCalendarEventQuery): Promise<SearchCalendarCalendarEventResponse>
    /**
    * 订阅日程变更事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription
    */
    subscriptionCalendarCalendarEvent(calendar_id: string): Promise<BaseResponse>
    /**
    * 取消订阅日程变更事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/unsubscription
    */
    unsubscriptionCalendarCalendarEvent(calendar_id: string): Promise<BaseResponse>
    /**
    * 回复日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/reply
    */
    replyCalendarCalendarEvent(calendar_id: string, event_id: string, params: ReplyCalendarCalendarEventRequest): Promise<BaseResponse>
    /**
    * 获取重复日程实例
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instances
    */
    instancesCalendarCalendarEvent(calendar_id: string, event_id: string, query?: InstancesCalendarCalendarEventQuery): Promise<InstancesCalendarCalendarEventResponse>
    /**
    * 查询日程视图
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instance_view
    */
    instanceViewCalendarCalendarEvent(calendar_id: string, query?: InstanceViewCalendarCalendarEventQuery): Promise<InstanceViewCalendarCalendarEventResponse>
    /**
    * 创建会议群
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/create
    */
    createCalendarCalendarEventMeetingChat(calendar_id: string, event_id: string): Promise<CreateCalendarCalendarEventMeetingChatResponse>
    /**
    * 解绑会议群
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/delete
    */
    deleteCalendarCalendarEventMeetingChat(calendar_id: string, event_id: string, query?: DeleteCalendarCalendarEventMeetingChatQuery): Promise<BaseResponse>
    /**
    * 创建请假日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/create
    */
    createCalendarTimeoffEvent(params: CreateCalendarTimeoffEventRequest, query?: CreateCalendarTimeoffEventQuery): Promise<CreateCalendarTimeoffEventResponse>
    /**
    * 删除请假日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/delete
    */
    deleteCalendarTimeoffEvent(timeoff_event_id: string): Promise<BaseResponse>
    /**
    * 添加日程参与人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create
    */
    createCalendarCalendarEventAttendee(calendar_id: string, event_id: string, params: CreateCalendarCalendarEventAttendeeRequest, query?: CreateCalendarCalendarEventAttendeeQuery): Promise<CreateCalendarCalendarEventAttendeeResponse>
    /**
    * 删除日程参与人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/batch_delete
    */
    batchDeleteCalendarCalendarEventAttendee(calendar_id: string, event_id: string, params: BatchDeleteCalendarCalendarEventAttendeeRequest, query?: BatchDeleteCalendarCalendarEventAttendeeQuery): Promise<BaseResponse>
    /**
    * 获取日程参与人列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list
    */
    listCalendarCalendarEventAttendee(calendar_id: string, event_id: string, query?: ListCalendarCalendarEventAttendeeQuery): Promise<ListCalendarCalendarEventAttendeeResponse>
    /**
    * 获取日程参与群成员列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list
    */
    listCalendarCalendarEventAttendeeChatMember(calendar_id: string, event_id: string, attendee_id: string, query?: ListCalendarCalendarEventAttendeeChatMemberQuery): Promise<ListCalendarCalendarEventAttendeeChatMemberResponse>
    /**
    * 生成 CalDAV 配置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/setting/generate_caldav_conf
    */
    generateCaldavConfCalendarSetting(params: GenerateCaldavConfCalendarSettingRequest): Promise<GenerateCaldavConfCalendarSettingResponse>
    /**
    * 将 Exchange 账户绑定到飞书账户
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/create
    */
    createCalendarExchangeBinding(params: CreateCalendarExchangeBindingRequest, query?: CreateCalendarExchangeBindingQuery): Promise<CreateCalendarExchangeBindingResponse>
    /**
    * 解除 Exchange 账户绑定
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/delete
    */
    deleteCalendarExchangeBinding(exchange_binding_id: string): Promise<BaseResponse>
    /**
    * 查询 Exchange 账户的绑定状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/get
    */
    getCalendarExchangeBinding(exchange_binding_id: string, query?: GetCalendarExchangeBindingQuery): Promise<GetCalendarExchangeBindingResponse>
    /**
    * 预约会议
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/apply
    */
    applyVcReserve(params: ApplyVcReserveRequest, query?: ApplyVcReserveQuery): Promise<ApplyVcReserveResponse>
    /**
    * 删除预约
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/delete
    */
    deleteVcReserve(reserve_id: string): Promise<BaseResponse>
    /**
    * 更新预约
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/update
    */
    updateVcReserve(reserve_id: string, params: UpdateVcReserveRequest, query?: UpdateVcReserveQuery): Promise<UpdateVcReserveResponse>
    /**
    * 获取预约
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get
    */
    getVcReserve(reserve_id: string, query?: GetVcReserveQuery): Promise<GetVcReserveResponse>
    /**
    * 获取活跃会议
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get_active_meeting
    */
    getActiveMeetingVcReserve(reserve_id: string, query?: GetActiveMeetingVcReserveQuery): Promise<GetActiveMeetingVcReserveResponse>
    /**
    * 邀请参会人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/invite
    */
    inviteVcMeeting(meeting_id: string, params: InviteVcMeetingRequest, query?: InviteVcMeetingQuery): Promise<InviteVcMeetingResponse>
    /**
    * 移除参会人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/kickout
    */
    kickoutVcMeeting(meeting_id: string, params: KickoutVcMeetingRequest, query?: KickoutVcMeetingQuery): Promise<KickoutVcMeetingResponse>
    /**
    * 设置主持人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/set_host
    */
    setHostVcMeeting(meeting_id: string, params: SetHostVcMeetingRequest, query?: SetHostVcMeetingQuery): Promise<SetHostVcMeetingResponse>
    /**
    * 结束会议
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/end
    */
    endVcMeeting(meeting_id: string): Promise<BaseResponse>
    /**
    * 获取会议详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/get
    */
    getVcMeeting(meeting_id: string, query?: GetVcMeetingQuery): Promise<GetVcMeetingResponse>
    /**
    * 获取与会议号关联的会议列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/list_by_no
    */
    listByNoVcMeeting(query?: ListByNoVcMeetingQuery): Promise<ListByNoVcMeetingResponse>
    /**
    * 开始录制
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/start
    */
    startVcMeetingRecording(meeting_id: string, params: StartVcMeetingRecordingRequest): Promise<BaseResponse>
    /**
    * 停止录制
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/stop
    */
    stopVcMeetingRecording(meeting_id: string): Promise<BaseResponse>
    /**
    * 获取录制文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/get
    */
    getVcMeetingRecording(meeting_id: string): Promise<GetVcMeetingRecordingResponse>
    /**
    * 授权录制文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/set_permission
    */
    setPermissionVcMeetingRecording(meeting_id: string, params: SetPermissionVcMeetingRecordingRequest, query?: SetPermissionVcMeetingRecordingQuery): Promise<BaseResponse>
    /**
    * 获取会议报告
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_daily
    */
    getDailyVcReport(query?: GetDailyVcReportQuery): Promise<GetDailyVcReportResponse>
    /**
    * 获取 Top 用户列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_top_user
    */
    getTopUserVcReport(query?: GetTopUserVcReportQuery): Promise<GetTopUserVcReportResponse>
    /**
    * 导出会议明细
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/meeting_list
    */
    meetingListVcExport(params: MeetingListVcExportRequest, query?: MeetingListVcExportQuery): Promise<MeetingListVcExportResponse>
    /**
    * 导出参会人明细
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/participant_list
    */
    participantListVcExport(params: ParticipantListVcExportRequest, query?: ParticipantListVcExportQuery): Promise<ParticipantListVcExportResponse>
    /**
    * 导出参会人会议质量数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/participant_quality_list
    */
    participantQualityListVcExport(params: ParticipantQualityListVcExportRequest, query?: ParticipantQualityListVcExportQuery): Promise<ParticipantQualityListVcExportResponse>
    /**
    * 导出会议室预定数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/resource_reservation_list
    */
    resourceReservationListVcExport(params: ResourceReservationListVcExportRequest): Promise<ResourceReservationListVcExportResponse>
    /**
    * 查询导出任务结果
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/get
    */
    getVcExport(task_id: string): Promise<GetVcExportResponse>
    /**
    * 下载导出文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/download
    */
    downloadVcExport(query?: DownloadVcExportQuery): Promise<Buffer>
    /**
    * 创建会议室层级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/create
    */
    createVcRoomLevel(params: CreateVcRoomLevelRequest): Promise<CreateVcRoomLevelResponse>
    /**
    * 删除会议室层级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/del
    */
    delVcRoomLevel(params: DelVcRoomLevelRequest): Promise<BaseResponse>
    /**
    * 更新会议室层级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/patch
    */
    patchVcRoomLevel(room_level_id: string, params: PatchVcRoomLevelRequest): Promise<BaseResponse>
    /**
    * 查询会议室层级详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/get
    */
    getVcRoomLevel(room_level_id: string): Promise<GetVcRoomLevelResponse>
    /**
    * 批量查询会议室层级详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/mget
    */
    mgetVcRoomLevel(params: MgetVcRoomLevelRequest): Promise<MgetVcRoomLevelResponse>
    /**
    * 查询会议室层级列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/list
    */
    listVcRoomLevel(query?: ListVcRoomLevelQuery): Promise<ListVcRoomLevelResponse>
    /**
    * 搜索会议室层级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/search
    */
    searchVcRoomLevel(query?: SearchVcRoomLevelQuery): Promise<SearchVcRoomLevelResponse>
    /**
    * 创建会议室
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/create
    */
    createVcRoom(params: CreateVcRoomRequest, query?: CreateVcRoomQuery): Promise<CreateVcRoomResponse>
    /**
    * 删除会议室
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/delete
    */
    deleteVcRoom(room_id: string): Promise<BaseResponse>
    /**
    * 更新会议室
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/patch
    */
    patchVcRoom(room_id: string, params: PatchVcRoomRequest, query?: PatchVcRoomQuery): Promise<BaseResponse>
    /**
    * 查询会议室详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/get
    */
    getVcRoom(room_id: string, query?: GetVcRoomQuery): Promise<GetVcRoomResponse>
    /**
    * 批量查询会议室详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/mget
    */
    mgetVcRoom(params: MgetVcRoomRequest, query?: MgetVcRoomQuery): Promise<MgetVcRoomResponse>
    /**
    * 查询会议室列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/list
    */
    listVcRoom(query?: ListVcRoomQuery): Promise<ListVcRoomResponse>
    /**
    * 搜索会议室
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/search
    */
    searchVcRoom(params: SearchVcRoomRequest, query?: SearchVcRoomQuery): Promise<SearchVcRoomResponse>
    /**
    * 查询会议室配置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/scope_config/get
    */
    getVcScopeConfig(query?: GetVcScopeConfigQuery): Promise<GetVcScopeConfigResponse>
    /**
    * 设置会议室配置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/scope_config/create
    */
    createVcScopeConfig(params: CreateVcScopeConfigRequest, query?: CreateVcScopeConfigQuery): Promise<BaseResponse>
    /**
    * 查询会议室预定限制
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config/reserve_scope
    */
    reserveScopeVcReserveConfig(query?: ReserveScopeVcReserveConfigQuery): Promise<ReserveScopeVcReserveConfigResponse>
    /**
    * 更新会议室预定限制
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config/patch
    */
    patchVcReserveConfig(reserve_config_id: string, params: PatchVcReserveConfigRequest, query?: PatchVcReserveConfigQuery): Promise<BaseResponse>
    /**
    * 查询会议室预定表单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-form/get
    */
    getVcReserveConfigForm(reserve_config_id: string, query?: GetVcReserveConfigFormQuery): Promise<GetVcReserveConfigFormResponse>
    /**
    * 更新会议室预定表单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-form/patch
    */
    patchVcReserveConfigForm(reserve_config_id: string, params: PatchVcReserveConfigFormRequest, query?: PatchVcReserveConfigFormQuery): Promise<BaseResponse>
    /**
    * 查询会议室预定管理员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-admin/get
    */
    getVcReserveConfigAdmin(reserve_config_id: string, query?: GetVcReserveConfigAdminQuery): Promise<GetVcReserveConfigAdminResponse>
    /**
    * 更新会议室预定管理员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-admin/patch
    */
    patchVcReserveConfigAdmin(reserve_config_id: string, params: PatchVcReserveConfigAdminRequest, query?: PatchVcReserveConfigAdminQuery): Promise<BaseResponse>
    /**
    * 查询禁用状态变更通知
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-disable_inform/get
    */
    getVcReserveConfigDisableInform(reserve_config_id: string, query?: GetVcReserveConfigDisableInformQuery): Promise<GetVcReserveConfigDisableInformResponse>
    /**
    * 更新禁用状态变更通知
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-disable_inform/patch
    */
    patchVcReserveConfigDisableInform(reserve_config_id: string, params: PatchVcReserveConfigDisableInformRequest, query?: PatchVcReserveConfigDisableInformQuery): Promise<BaseResponse>
    /**
    * 查询会议明细
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting_list/get
    */
    getVcMeetingList(query?: GetVcMeetingListQuery): Promise<GetVcMeetingListResponse>
    /**
    * 查询参会人明细
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/participant_list/get
    */
    getVcParticipantList(query?: GetVcParticipantListQuery): Promise<GetVcParticipantListResponse>
    /**
    * 查询参会人会议质量数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/participant_quality_list/get
    */
    getVcParticipantQualityList(query?: GetVcParticipantQualityListQuery): Promise<GetVcParticipantQualityListResponse>
    /**
    * 查询会议室预定数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/resource_reservation_list/get
    */
    getVcResourceReservationList(query?: GetVcResourceReservationListQuery): Promise<GetVcResourceReservationListResponse>
    /**
    * 获取告警记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/alert/list
    */
    listVcAlert(query?: ListVcAlertQuery): Promise<ListVcAlertResponse>
    /**
    * 创建班次
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create
    */
    createAttendanceShift(params: CreateAttendanceShiftRequest): Promise<CreateAttendanceShiftResponse>
    /**
    * 删除班次
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/delete
    */
    deleteAttendanceShift(shift_id: string): Promise<BaseResponse>
    /**
    * 按 ID 查询班次
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/get
    */
    getAttendanceShift(shift_id: string): Promise<GetAttendanceShiftResponse>
    /**
    * 按名称查询班次
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query
    */
    queryAttendanceShift(query?: QueryAttendanceShiftQuery): Promise<QueryAttendanceShiftResponse>
    /**
    * 查询所有班次
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list
    */
    listAttendanceShift(query?: ListAttendanceShiftQuery): Promise<ListAttendanceShiftResponse>
    /**
    * 创建或修改考勤组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create
    */
    createAttendanceGroup(params: CreateAttendanceGroupRequest, query?: CreateAttendanceGroupQuery): Promise<CreateAttendanceGroupResponse>
    /**
    * 删除考勤组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/delete
    */
    deleteAttendanceGroup(group_id: string): Promise<BaseResponse>
    /**
    * 按 ID 查询考勤组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/get
    */
    getAttendanceGroup(group_id: string, query?: GetAttendanceGroupQuery): Promise<GetAttendanceGroupResponse>
    /**
    * 按名称查询考勤组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search
    */
    searchAttendanceGroup(params: SearchAttendanceGroupRequest): Promise<SearchAttendanceGroupResponse>
    /**
    * 查询所有考勤组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list
    */
    listAttendanceGroup(query?: ListAttendanceGroupQuery): Promise<ListAttendanceGroupResponse>
    /**
    * 创建或修改排班表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create
    */
    batchCreateAttendanceUserDailyShift(params: BatchCreateAttendanceUserDailyShiftRequest, query?: BatchCreateAttendanceUserDailyShiftQuery): Promise<BatchCreateAttendanceUserDailyShiftResponse>
    /**
    * 查询排班表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/query
    */
    queryAttendanceUserDailyShift(params: QueryAttendanceUserDailyShiftRequest, query?: QueryAttendanceUserDailyShiftQuery): Promise<QueryAttendanceUserDailyShiftResponse>
    /**
    * 更新统计设置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/update
    */
    updateAttendanceUserStatsView(user_stats_view_id: string, params: UpdateAttendanceUserStatsViewRequest, query?: UpdateAttendanceUserStatsViewQuery): Promise<UpdateAttendanceUserStatsViewResponse>
    /**
    * 查询统计表头
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_field/query
    */
    queryAttendanceUserStatsField(params: QueryAttendanceUserStatsFieldRequest, query?: QueryAttendanceUserStatsFieldQuery): Promise<QueryAttendanceUserStatsFieldResponse>
    /**
    * 查询统计设置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query
    */
    queryAttendanceUserStatsView(params: QueryAttendanceUserStatsViewRequest, query?: QueryAttendanceUserStatsViewQuery): Promise<QueryAttendanceUserStatsViewResponse>
    /**
    * 查询统计数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_data/query
    */
    queryAttendanceUserStatsData(params: QueryAttendanceUserStatsDataRequest, query?: QueryAttendanceUserStatsDataQuery): Promise<QueryAttendanceUserStatsDataResponse>
    /**
    * 获取审批通过数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query
    */
    queryAttendanceUserApproval(params: QueryAttendanceUserApprovalRequest, query?: QueryAttendanceUserApprovalQuery): Promise<QueryAttendanceUserApprovalResponse>
    /**
    * 写入审批结果
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create
    */
    createAttendanceUserApproval(params: CreateAttendanceUserApprovalRequest, query?: CreateAttendanceUserApprovalQuery): Promise<CreateAttendanceUserApprovalResponse>
    /**
    * 通知审批状态更新
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process
    */
    processAttendanceApprovalInfo(params: ProcessAttendanceApprovalInfoRequest): Promise<ProcessAttendanceApprovalInfoResponse>
    /**
    * 通知补卡审批发起
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create
    */
    createAttendanceUserTaskRemedy(params: CreateAttendanceUserTaskRemedyRequest, query?: CreateAttendanceUserTaskRemedyQuery): Promise<CreateAttendanceUserTaskRemedyResponse>
    /**
    * 获取可补卡时间
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query_user_allowed_remedys
    */
    queryUserAllowedRemedysAttendanceUserTaskRemedy(params: QueryUserAllowedRemedysAttendanceUserTaskRemedyRequest, query?: QueryUserAllowedRemedysAttendanceUserTaskRemedyQuery): Promise<QueryUserAllowedRemedysAttendanceUserTaskRemedyResponse>
    /**
    * 获取补卡记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query
    */
    queryAttendanceUserTaskRemedy(params: QueryAttendanceUserTaskRemedyRequest, query?: QueryAttendanceUserTaskRemedyQuery): Promise<QueryAttendanceUserTaskRemedyResponse>
    /**
    * 导入打卡流水
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create
    */
    batchCreateAttendanceUserFlow(params: BatchCreateAttendanceUserFlowRequest, query?: BatchCreateAttendanceUserFlowQuery): Promise<BatchCreateAttendanceUserFlowResponse>
    /**
    * 查询打卡流水
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/get
    */
    getAttendanceUserFlow(user_flow_id: string, query?: GetAttendanceUserFlowQuery): Promise<GetAttendanceUserFlowResponse>
    /**
    * 批量查询打卡流水
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query
    */
    queryAttendanceUserFlow(params: QueryAttendanceUserFlowRequest, query?: QueryAttendanceUserFlowQuery): Promise<QueryAttendanceUserFlowResponse>
    /**
    * 查询打卡结果
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query
    */
    queryAttendanceUserTask(params: QueryAttendanceUserTaskRequest, query?: QueryAttendanceUserTaskQuery): Promise<QueryAttendanceUserTaskResponse>
    /**
    * 修改用户人脸识别信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/modify
    */
    modifyAttendanceUserSetting(params: ModifyAttendanceUserSettingRequest, query?: ModifyAttendanceUserSettingQuery): Promise<ModifyAttendanceUserSettingResponse>
    /**
    * 批量查询用户人脸识别信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/query
    */
    queryAttendanceUserSetting(params: QueryAttendanceUserSettingRequest, query?: QueryAttendanceUserSettingQuery): Promise<QueryAttendanceUserSettingResponse>
    /**
    * 上传用户人脸识别照片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload
    */
    uploadAttendanceFile(form: FormData, query?: UploadAttendanceFileQuery): Promise<UploadAttendanceFileResponse>
    /**
    * 下载用户人脸识别照片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/download
    */
    downloadAttendanceFile(file_id: string): Promise<Buffer>
    /**
    * 通过过期时间获取发放记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_employ_expire_record/get
    */
    getAttendanceLeaveEmployExpireRecord(leave_id: string, params: GetAttendanceLeaveEmployExpireRecordRequest, query?: GetAttendanceLeaveEmployExpireRecordQuery): Promise<GetAttendanceLeaveEmployExpireRecordResponse>
    /**
    * 修改发放记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_accrual_record/patch
    */
    patchAttendanceLeaveAccrualRecord(leave_id: string, params: PatchAttendanceLeaveAccrualRecordRequest, query?: PatchAttendanceLeaveAccrualRecordQuery): Promise<PatchAttendanceLeaveAccrualRecordResponse>
    /**
    * 创建审批定义
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/create
    */
    createApproval(params: CreateApprovalRequest, query?: CreateApprovalQuery): Promise<CreateApprovalResponse>
    /**
    * 创建审批实例
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create
    */
    createApprovalInstance(params: CreateApprovalInstanceRequest): Promise<CreateApprovalInstanceResponse>
    /**
    * 撤回审批实例
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cancel
    */
    cancelApprovalInstance(params: CancelApprovalInstanceRequest, query?: CancelApprovalInstanceQuery): Promise<BaseResponse>
    /**
    * 抄送审批实例
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cc
    */
    ccApprovalInstance(params: CcApprovalInstanceRequest, query?: CcApprovalInstanceQuery): Promise<BaseResponse>
    /**
    * 预览审批流程
    * @see https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-preview
    */
    previewApprovalInstance(params: PreviewApprovalInstanceRequest, query?: PreviewApprovalInstanceQuery): Promise<PreviewApprovalInstanceResponse>
    /**
    * 获取单个审批实例详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/get
    */
    getApprovalInstance(instance_id: string, query?: GetApprovalInstanceQuery): Promise<GetApprovalInstanceResponse>
    /**
    * 批量获取审批实例 ID
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list
    */
    listApprovalInstance(query?: ListApprovalInstanceQuery): Promise<ListApprovalInstanceResponse>
    /**
    * 同意审批任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/approve
    */
    approveApprovalTask(params: ApproveApprovalTaskRequest, query?: ApproveApprovalTaskQuery): Promise<BaseResponse>
    /**
    * 拒绝审批任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/reject
    */
    rejectApprovalTask(params: RejectApprovalTaskRequest, query?: RejectApprovalTaskQuery): Promise<BaseResponse>
    /**
    * 转交审批任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/transfer
    */
    transferApprovalTask(params: TransferApprovalTaskRequest, query?: TransferApprovalTaskQuery): Promise<BaseResponse>
    /**
    * 退回审批任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/specified_rollback
    */
    specifiedRollbackApprovalInstance(params: SpecifiedRollbackApprovalInstanceRequest, query?: SpecifiedRollbackApprovalInstanceQuery): Promise<BaseResponse>
    /**
    * 审批任务加签
    * @see https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-task-addsign
    */
    addSignApprovalInstance(params: AddSignApprovalInstanceRequest): Promise<BaseResponse>
    /**
    * 重新提交审批任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/resubmit
    */
    resubmitApprovalTask(params: ResubmitApprovalTaskRequest, query?: ResubmitApprovalTaskQuery): Promise<BaseResponse>
    /**
    * 创建评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/create
    */
    createApprovalInstanceComment(instance_id: string, params: CreateApprovalInstanceCommentRequest, query?: CreateApprovalInstanceCommentQuery): Promise<CreateApprovalInstanceCommentResponse>
    /**
    * 删除评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/delete
    */
    deleteApprovalInstanceComment(instance_id: string, comment_id: string, query?: DeleteApprovalInstanceCommentQuery): Promise<DeleteApprovalInstanceCommentResponse>
    /**
    * 清空评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/remove
    */
    removeApprovalInstanceComment(instance_id: string, query?: RemoveApprovalInstanceCommentQuery): Promise<RemoveApprovalInstanceCommentResponse>
    /**
    * 获取评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/list
    */
    listApprovalInstanceComment(instance_id: string, query?: ListApprovalInstanceCommentQuery): Promise<ListApprovalInstanceCommentResponse>
    /**
    * 创建三方审批定义
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create
    */
    createApprovalExternalApproval(params: CreateApprovalExternalApprovalRequest, query?: CreateApprovalExternalApprovalQuery): Promise<CreateApprovalExternalApprovalResponse>
    /**
    * 查看指定三方审批定义
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/get
    */
    getApprovalExternalApproval(approval_code: string, query?: GetApprovalExternalApprovalQuery): Promise<GetApprovalExternalApprovalResponse>
    /**
    * 同步三方审批实例
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create
    */
    createApprovalExternalInstance(params: CreateApprovalExternalInstanceRequest): Promise<CreateApprovalExternalInstanceResponse>
    /**
    * 校验三方审批实例
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/check
    */
    checkApprovalExternalInstance(params: CheckApprovalExternalInstanceRequest): Promise<CheckApprovalExternalInstanceResponse>
    /**
    * 获取三方审批任务状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_task/list
    */
    listApprovalExternalTask(params: ListApprovalExternalTaskRequest, query?: ListApprovalExternalTaskQuery): Promise<ListApprovalExternalTaskResponse>
    /**
    * 查询实例列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/query
    */
    queryApprovalInstance(params: QueryApprovalInstanceRequest, query?: QueryApprovalInstanceQuery): Promise<QueryApprovalInstanceResponse>
    /**
    * 查询抄送列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/search_cc
    */
    searchCcApprovalInstance(params: SearchCcApprovalInstanceRequest, query?: SearchCcApprovalInstanceQuery): Promise<SearchCcApprovalInstanceResponse>
    /**
    * 查询任务列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/search
    */
    searchApprovalTask(params: SearchApprovalTaskRequest, query?: SearchApprovalTaskQuery): Promise<SearchApprovalTaskResponse>
    /**
    * 查询用户的任务列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/query
    */
    queryApprovalTask(query?: QueryApprovalTaskQuery): Promise<QueryApprovalTaskResponse>
    /**
    * 订阅审批事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe
    */
    subscribeApproval(approval_code: string): Promise<BaseResponse>
    /**
    * 取消订阅审批事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe
    */
    unsubscribeApproval(approval_code: string): Promise<BaseResponse>
    /**
    * 更新客服信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent/patch
    */
    patchHelpdeskAgent(agent_id: string, params: PatchHelpdeskAgentRequest): Promise<BaseResponse>
    /**
    * 获取客服邮箱
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent/agent_email
    */
    agentEmailHelpdeskAgent(): Promise<AgentEmailHelpdeskAgentResponse>
    /**
    * 创建客服工作日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_schedule/create
    */
    createHelpdeskAgentSchedule(params: CreateHelpdeskAgentScheduleRequest): Promise<BaseResponse>
    /**
    * 删除客服工作日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/delete
    */
    deleteHelpdeskAgentSchedules(agent_id: string): Promise<BaseResponse>
    /**
    * 更新客服工作日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/patch
    */
    patchHelpdeskAgentSchedules(agent_id: string, params: PatchHelpdeskAgentSchedulesRequest): Promise<BaseResponse>
    /**
    * 查询指定客服工作日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/get
    */
    getHelpdeskAgentSchedules(agent_id: string): Promise<GetHelpdeskAgentSchedulesResponse>
    /**
    * 查询全部客服工作日程
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_schedule/list
    */
    listHelpdeskAgentSchedule(query?: ListHelpdeskAgentScheduleQuery): Promise<ListHelpdeskAgentScheduleResponse>
    /**
    * 创建客服技能
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/create
    */
    createHelpdeskAgentSkill(params: CreateHelpdeskAgentSkillRequest): Promise<CreateHelpdeskAgentSkillResponse>
    /**
    * 删除客服技能
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/delete
    */
    deleteHelpdeskAgentSkill(agent_skill_id: string): Promise<BaseResponse>
    /**
    * 更新客服技能
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/patch
    */
    patchHelpdeskAgentSkill(agent_skill_id: string, params: PatchHelpdeskAgentSkillRequest): Promise<BaseResponse>
    /**
    * 查询指定客服技能
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/get
    */
    getHelpdeskAgentSkill(agent_skill_id: string): Promise<GetHelpdeskAgentSkillResponse>
    /**
    * 查询全部客服技能
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/list
    */
    listHelpdeskAgentSkill(): Promise<ListHelpdeskAgentSkillResponse>
    /**
    * 获取客服技能列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill_rule/list
    */
    listHelpdeskAgentSkillRule(): Promise<ListHelpdeskAgentSkillRuleResponse>
    /**
    * 创建服务台对话
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/start_service
    */
    startServiceHelpdeskTicket(params: StartServiceHelpdeskTicketRequest): Promise<StartServiceHelpdeskTicketResponse>
    /**
    * 查询指定工单详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/get
    */
    getHelpdeskTicket(ticket_id: string): Promise<GetHelpdeskTicketResponse>
    /**
    * 更新工单详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/update
    */
    updateHelpdeskTicket(ticket_id: string, params: UpdateHelpdeskTicketRequest): Promise<BaseResponse>
    /**
    * 查询全部工单详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/list
    */
    listHelpdeskTicket(query?: ListHelpdeskTicketQuery): Promise<ListHelpdeskTicketResponse>
    /**
    * 获取工单内图像
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/ticket_image
    */
    ticketImageHelpdeskTicket(query?: TicketImageHelpdeskTicketQuery): Promise<Buffer>
    /**
    * 回复用户在工单里的提问
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/answer_user_query
    */
    answerUserQueryHelpdeskTicket(ticket_id: string, params: AnswerUserQueryHelpdeskTicketRequest): Promise<BaseResponse>
    /**
    * 获取服务台自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/customized_fields
    */
    customizedFieldsHelpdeskTicket(query?: CustomizedFieldsHelpdeskTicketQuery): Promise<CustomizedFieldsHelpdeskTicketResponse>
    /**
    * 发送工单消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/create
    */
    createHelpdeskTicketMessage(ticket_id: string, params: CreateHelpdeskTicketMessageRequest): Promise<CreateHelpdeskTicketMessageResponse>
    /**
    * 获取工单消息详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/list
    */
    listHelpdeskTicketMessage(ticket_id: string, query?: ListHelpdeskTicketMessageQuery): Promise<ListHelpdeskTicketMessageResponse>
    /**
    * 服务台机器人向工单绑定的群内发送消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/bot-message/create
    */
    createHelpdeskBotMessage(params: CreateHelpdeskBotMessageRequest, query?: CreateHelpdeskBotMessageQuery): Promise<CreateHelpdeskBotMessageResponse>
    /**
    * 创建工单自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/create-ticket-customized-field
    */
    createHelpdeskTicketCustomizedField(params: CreateHelpdeskTicketCustomizedFieldRequest): Promise<BaseResponse>
    /**
    * 删除工单自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/delete
    */
    deleteHelpdeskTicketCustomizedField(ticket_customized_field_id: string): Promise<BaseResponse>
    /**
    * 更新工单自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/update-ticket-customized-field
    */
    patchHelpdeskTicketCustomizedField(ticket_customized_field_id: string, params: PatchHelpdeskTicketCustomizedFieldRequest): Promise<BaseResponse>
    /**
    * 获取指定工单自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/get-ticket-customized-field
    */
    getHelpdeskTicketCustomizedField(ticket_customized_field_id: string): Promise<GetHelpdeskTicketCustomizedFieldResponse>
    /**
    * 获取全部工单自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/list-ticket-customized-fields
    */
    listHelpdeskTicketCustomizedField(params: ListHelpdeskTicketCustomizedFieldRequest, query?: ListHelpdeskTicketCustomizedFieldQuery): Promise<ListHelpdeskTicketCustomizedFieldResponse>
    /**
    * 创建知识库
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/create
    */
    createHelpdeskFaq(params: CreateHelpdeskFaqRequest): Promise<CreateHelpdeskFaqResponse>
    /**
    * 删除知识库
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/delete
    */
    deleteHelpdeskFaq(id: string): Promise<BaseResponse>
    /**
    * 修改知识库
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/patch
    */
    patchHelpdeskFaq(id: string, params: PatchHelpdeskFaqRequest): Promise<BaseResponse>
    /**
    * 获取指定知识库详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/get
    */
    getHelpdeskFaq(id: string): Promise<GetHelpdeskFaqResponse>
    /**
    * 获取全部知识库详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/list
    */
    listHelpdeskFaq(query?: ListHelpdeskFaqQuery): Promise<ListHelpdeskFaqResponse>
    /**
    * 获取知识库图像
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/faq_image
    */
    faqImageHelpdeskFaq(id: string, image_key: string): Promise<Buffer>
    /**
    * 搜索知识库
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/search
    */
    searchHelpdeskFaq(query?: SearchHelpdeskFaqQuery): Promise<SearchHelpdeskFaqResponse>
    /**
    * 创建知识库分类
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/create
    */
    createHelpdeskCategory(params: CreateHelpdeskCategoryRequest): Promise<CreateHelpdeskCategoryResponse>
    /**
    * 获取知识库分类
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/get
    */
    getHelpdeskCategory(id: string): Promise<GetHelpdeskCategoryResponse>
    /**
    * 更新知识库分类详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/patch
    */
    patchHelpdeskCategory(id: string, params: PatchHelpdeskCategoryRequest): Promise<BaseResponse>
    /**
    * 删除知识库分类详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/delete
    */
    deleteHelpdeskCategory(id: string): Promise<BaseResponse>
    /**
    * 获取全部知识库分类
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/list-categories
    */
    listHelpdeskCategory(query?: ListHelpdeskCategoryQuery): Promise<ListHelpdeskCategoryResponse>
    /**
    * 创建推送
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/create
    */
    createHelpdeskNotification(params: CreateHelpdeskNotificationRequest, query?: CreateHelpdeskNotificationQuery): Promise<CreateHelpdeskNotificationResponse>
    /**
    * 更新推送
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/patch
    */
    patchHelpdeskNotification(notification_id: string, params: PatchHelpdeskNotificationRequest, query?: PatchHelpdeskNotificationQuery): Promise<BaseResponse>
    /**
    * 查询推送
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/get
    */
    getHelpdeskNotification(notification_id: string, query?: GetHelpdeskNotificationQuery): Promise<GetHelpdeskNotificationResponse>
    /**
    * 预览推送
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/preview
    */
    previewHelpdeskNotification(notification_id: string): Promise<BaseResponse>
    /**
    * 提交审核
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/submit_approve
    */
    submitApproveHelpdeskNotification(notification_id: string, params: SubmitApproveHelpdeskNotificationRequest): Promise<SubmitApproveHelpdeskNotificationResponse>
    /**
    * 取消审核
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_approve
    */
    cancelApproveHelpdeskNotification(notification_id: string): Promise<BaseResponse>
    /**
    * 执行推送
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/execute_send
    */
    executeSendHelpdeskNotification(notification_id: string, params: ExecuteSendHelpdeskNotificationRequest): Promise<BaseResponse>
    /**
    * 取消推送
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_send
    */
    cancelSendHelpdeskNotification(notification_id: string, params: CancelSendHelpdeskNotificationRequest): Promise<BaseResponse>
    /**
    * 订阅服务台事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/subscribe
    */
    subscribeHelpdeskEvent(params: SubscribeHelpdeskEventRequest): Promise<BaseResponse>
    /**
    * 取消订阅服务台事件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/unsubscribe
    */
    unsubscribeHelpdeskEvent(params: UnsubscribeHelpdeskEventRequest): Promise<BaseResponse>
    /**
    * 创建任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/create
    */
    createTaskv1(params: CreateTaskv1Request, query?: CreateTaskv1Query): Promise<CreateTaskv1Response>
    /**
    * 删除任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/delete
    */
    deleteTaskv1(task_id: string): Promise<BaseResponse>
    /**
    * 更新任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/patch
    */
    patchTaskv1(task_id: string, params: PatchTaskv1Request, query?: PatchTaskv1Query): Promise<PatchTaskv1Response>
    /**
    * 完成任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/complete
    */
    completeTaskv1(task_id: string): Promise<BaseResponse>
    /**
    * 取消完成任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/uncomplete
    */
    uncompleteTaskv1(task_id: string): Promise<BaseResponse>
    /**
    * 查询指定任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/get
    */
    getTaskv1(task_id: string, query?: GetTaskv1Query): Promise<GetTaskv1Response>
    /**
    * 查询所有任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/list
    */
    listTaskv1(query?: ListTaskv1Query): Promise<ListTaskv1Response>
    /**
    * 新增提醒时间
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/create
    */
    createTaskv1TaskReminder(task_id: string, params: CreateTaskv1TaskReminderRequest): Promise<CreateTaskv1TaskReminderResponse>
    /**
    * 删除提醒时间
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/delete
    */
    deleteTaskv1TaskReminder(task_id: string, reminder_id: string): Promise<BaseResponse>
    /**
    * 查询提醒时间列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list
    */
    listTaskv1TaskReminder(task_id: string, query?: ListTaskv1TaskReminderQuery): Promise<ListTaskv1TaskReminderResponse>
    /**
    * 创建评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/create
    */
    createTaskv1TaskComment(task_id: string, params: CreateTaskv1TaskCommentRequest, query?: CreateTaskv1TaskCommentQuery): Promise<CreateTaskv1TaskCommentResponse>
    /**
    * 删除评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/delete
    */
    deleteTaskv1TaskComment(task_id: string, comment_id: string): Promise<BaseResponse>
    /**
    * 更新评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/update
    */
    updateTaskv1TaskComment(task_id: string, comment_id: string, params: UpdateTaskv1TaskCommentRequest, query?: UpdateTaskv1TaskCommentQuery): Promise<UpdateTaskv1TaskCommentResponse>
    /**
    * 获取评论详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/get
    */
    getTaskv1TaskComment(task_id: string, comment_id: string, query?: GetTaskv1TaskCommentQuery): Promise<GetTaskv1TaskCommentResponse>
    /**
    * 获取评论列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/list
    */
    listTaskv1TaskComment(task_id: string, query?: ListTaskv1TaskCommentQuery): Promise<ListTaskv1TaskCommentResponse>
    /**
    * 新增关注人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/create
    */
    createTaskv1TaskFollower(task_id: string, params: CreateTaskv1TaskFollowerRequest, query?: CreateTaskv1TaskFollowerQuery): Promise<CreateTaskv1TaskFollowerResponse>
    /**
    * 删除指定关注人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/delete
    */
    deleteTaskv1TaskFollower(task_id: string, follower_id: string, query?: DeleteTaskv1TaskFollowerQuery): Promise<BaseResponse>
    /**
    * 批量删除关注人
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_follower
    */
    batchDeleteFollowerTaskv1(task_id: string, params: BatchDeleteFollowerTaskv1Request, query?: BatchDeleteFollowerTaskv1Query): Promise<BatchDeleteFollowerTaskv1Response>
    /**
    * 获取关注人列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list
    */
    listTaskv1TaskFollower(task_id: string, query?: ListTaskv1TaskFollowerQuery): Promise<ListTaskv1TaskFollowerResponse>
    /**
    * 新增执行者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/create
    */
    createTaskv1TaskCollaborator(task_id: string, params: CreateTaskv1TaskCollaboratorRequest, query?: CreateTaskv1TaskCollaboratorQuery): Promise<CreateTaskv1TaskCollaboratorResponse>
    /**
    * 删除指定执行者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/delete
    */
    deleteTaskv1TaskCollaborator(task_id: string, collaborator_id: string, query?: DeleteTaskv1TaskCollaboratorQuery): Promise<BaseResponse>
    /**
    * 批量删除执行者
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_collaborator
    */
    batchDeleteCollaboratorTaskv1(task_id: string, params: BatchDeleteCollaboratorTaskv1Request, query?: BatchDeleteCollaboratorTaskv1Query): Promise<BatchDeleteCollaboratorTaskv1Response>
    /**
    * 获取执行者列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list
    */
    listTaskv1TaskCollaborator(task_id: string, query?: ListTaskv1TaskCollaboratorQuery): Promise<ListTaskv1TaskCollaboratorResponse>
    /**
    * 创建任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/create
    */
    createTaskv2(params: CreateTaskv2Request, query?: CreateTaskv2Query): Promise<CreateTaskv2Response>
    /**
    * 获取任务详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/get
    */
    getTaskv2(task_guid: string, query?: GetTaskv2Query): Promise<GetTaskv2Response>
    /**
    * 更新任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/patch
    */
    patchTaskv2(task_guid: string, params: PatchTaskv2Request, query?: PatchTaskv2Query): Promise<PatchTaskv2Response>
    /**
    * 删除任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/delete
    */
    deleteTaskv2(task_guid: string): Promise<BaseResponse>
    /**
    * 添加任务成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_members
    */
    addMembersTaskv2(task_guid: string, params: AddMembersTaskv2Request, query?: AddMembersTaskv2Query): Promise<AddMembersTaskv2Response>
    /**
    * 移除任务成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_members
    */
    removeMembersTaskv2(task_guid: string, params: RemoveMembersTaskv2Request, query?: RemoveMembersTaskv2Query): Promise<RemoveMembersTaskv2Response>
    /**
    * 列取任务列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/list
    */
    listTaskv2(query?: ListTaskv2Query): Promise<ListTaskv2Response>
    /**
    * 列取任务所在清单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/tasklists
    */
    tasklistsTaskv2(task_guid: string): Promise<TasklistsTaskv2Response>
    /**
    * 任务加入清单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_tasklist
    */
    addTasklistTaskv2(task_guid: string, params: AddTasklistTaskv2Request, query?: AddTasklistTaskv2Query): Promise<AddTasklistTaskv2Response>
    /**
    * 任务移出清单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_tasklist
    */
    removeTasklistTaskv2(task_guid: string, params: RemoveTasklistTaskv2Request, query?: RemoveTasklistTaskv2Query): Promise<RemoveTasklistTaskv2Response>
    /**
    * 添加任务提醒
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_reminders
    */
    addRemindersTaskv2(task_guid: string, params: AddRemindersTaskv2Request, query?: AddRemindersTaskv2Query): Promise<AddRemindersTaskv2Response>
    /**
    * 移除任务提醒
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_reminders
    */
    removeRemindersTaskv2(task_guid: string, params: RemoveRemindersTaskv2Request, query?: RemoveRemindersTaskv2Query): Promise<RemoveRemindersTaskv2Response>
    /**
    * 添加依赖
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_dependencies
    */
    addDependenciesTaskv2(task_guid: string, params: AddDependenciesTaskv2Request): Promise<AddDependenciesTaskv2Response>
    /**
    * 移除依赖
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_dependencies
    */
    removeDependenciesTaskv2(task_guid: string, params: RemoveDependenciesTaskv2Request): Promise<RemoveDependenciesTaskv2Response>
    /**
    * 创建子任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/create
    */
    createTaskv2TaskSubtask(task_guid: string, params: CreateTaskv2TaskSubtaskRequest, query?: CreateTaskv2TaskSubtaskQuery): Promise<CreateTaskv2TaskSubtaskResponse>
    /**
    * 获取任务的子任务列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/list
    */
    listTaskv2TaskSubtask(task_guid: string, query?: ListTaskv2TaskSubtaskQuery): Promise<ListTaskv2TaskSubtaskResponse>
    /**
    * 创建清单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/create
    */
    createTaskv2Tasklist(params: CreateTaskv2TasklistRequest, query?: CreateTaskv2TasklistQuery): Promise<CreateTaskv2TasklistResponse>
    /**
    * 获取清单详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/get
    */
    getTaskv2Tasklist(tasklist_guid: string, query?: GetTaskv2TasklistQuery): Promise<GetTaskv2TasklistResponse>
    /**
    * 更新清单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/patch
    */
    patchTaskv2Tasklist(tasklist_guid: string, params: PatchTaskv2TasklistRequest, query?: PatchTaskv2TasklistQuery): Promise<PatchTaskv2TasklistResponse>
    /**
    * 删除清单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/delete
    */
    deleteTaskv2Tasklist(tasklist_guid: string): Promise<BaseResponse>
    /**
    * 添加清单成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/add_members
    */
    addMembersTaskv2Tasklist(tasklist_guid: string, params: AddMembersTaskv2TasklistRequest, query?: AddMembersTaskv2TasklistQuery): Promise<AddMembersTaskv2TasklistResponse>
    /**
    * 移除清单成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/remove_members
    */
    removeMembersTaskv2Tasklist(tasklist_guid: string, params: RemoveMembersTaskv2TasklistRequest, query?: RemoveMembersTaskv2TasklistQuery): Promise<RemoveMembersTaskv2TasklistResponse>
    /**
    * 获取清单任务列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/tasks
    */
    tasksTaskv2Tasklist(tasklist_guid: string, query?: TasksTaskv2TasklistQuery): Promise<TasksTaskv2TasklistResponse>
    /**
    * 获取清单列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/list
    */
    listTaskv2Tasklist(query?: ListTaskv2TasklistQuery): Promise<ListTaskv2TasklistResponse>
    /**
    * 创建动态订阅
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/create
    */
    createTaskv2TasklistActivitySubscription(tasklist_guid: string, params: CreateTaskv2TasklistActivitySubscriptionRequest, query?: CreateTaskv2TasklistActivitySubscriptionQuery): Promise<CreateTaskv2TasklistActivitySubscriptionResponse>
    /**
    * 获取动态订阅
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/get
    */
    getTaskv2TasklistActivitySubscription(tasklist_guid: string, activity_subscription_guid: string, query?: GetTaskv2TasklistActivitySubscriptionQuery): Promise<GetTaskv2TasklistActivitySubscriptionResponse>
    /**
    * 列取动态订阅
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/list
    */
    listTaskv2TasklistActivitySubscription(tasklist_guid: string, query?: ListTaskv2TasklistActivitySubscriptionQuery): Promise<ListTaskv2TasklistActivitySubscriptionResponse>
    /**
    * 更新动态订阅
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/patch
    */
    patchTaskv2TasklistActivitySubscription(tasklist_guid: string, activity_subscription_guid: string, params: PatchTaskv2TasklistActivitySubscriptionRequest, query?: PatchTaskv2TasklistActivitySubscriptionQuery): Promise<PatchTaskv2TasklistActivitySubscriptionResponse>
    /**
    * 删除动态订阅
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/delete
    */
    deleteTaskv2TasklistActivitySubscription(tasklist_guid: string, activity_subscription_guid: string): Promise<BaseResponse>
    /**
    * 创建评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/create
    */
    createTaskv2Comment(params: CreateTaskv2CommentRequest, query?: CreateTaskv2CommentQuery): Promise<CreateTaskv2CommentResponse>
    /**
    * 获取评论详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/get
    */
    getTaskv2Comment(comment_id: string, query?: GetTaskv2CommentQuery): Promise<GetTaskv2CommentResponse>
    /**
    * 更新评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/patch
    */
    patchTaskv2Comment(comment_id: string, params: PatchTaskv2CommentRequest, query?: PatchTaskv2CommentQuery): Promise<PatchTaskv2CommentResponse>
    /**
    * 删除评论
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/delete
    */
    deleteTaskv2Comment(comment_id: string): Promise<BaseResponse>
    /**
    * 获取评论列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/list
    */
    listTaskv2Comment(query?: ListTaskv2CommentQuery): Promise<ListTaskv2CommentResponse>
    /**
    * 上传附件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/upload
    */
    uploadTaskv2Attachment(form: FormData, query?: UploadTaskv2AttachmentQuery): Promise<UploadTaskv2AttachmentResponse>
    /**
    * 列取附件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/list
    */
    listTaskv2Attachment(query?: ListTaskv2AttachmentQuery): Promise<ListTaskv2AttachmentResponse>
    /**
    * 获取附件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/get
    */
    getTaskv2Attachment(attachment_guid: string, query?: GetTaskv2AttachmentQuery): Promise<GetTaskv2AttachmentResponse>
    /**
    * 删除附件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/delete
    */
    deleteTaskv2Attachment(attachment_guid: string): Promise<BaseResponse>
    /**
    * 创建自定义分组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/create
    */
    createTaskv2Section(params: CreateTaskv2SectionRequest, query?: CreateTaskv2SectionQuery): Promise<CreateTaskv2SectionResponse>
    /**
    * 获取自定义分组详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/get
    */
    getTaskv2Section(section_guid: string, query?: GetTaskv2SectionQuery): Promise<GetTaskv2SectionResponse>
    /**
    * 更新自定义分组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/patch
    */
    patchTaskv2Section(section_guid: string, params: PatchTaskv2SectionRequest, query?: PatchTaskv2SectionQuery): Promise<PatchTaskv2SectionResponse>
    /**
    * 删除自定义分组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/delete
    */
    deleteTaskv2Section(section_guid: string): Promise<BaseResponse>
    /**
    * 获取自定义分组列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/list
    */
    listTaskv2Section(query?: ListTaskv2SectionQuery): Promise<ListTaskv2SectionResponse>
    /**
    * 获取自定义分组任务列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/tasks
    */
    tasksTaskv2Section(section_guid: string, query?: TasksTaskv2SectionQuery): Promise<TasksTaskv2SectionResponse>
    /**
    * 创建自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/create
    */
    createTaskv2CustomField(params: CreateTaskv2CustomFieldRequest, query?: CreateTaskv2CustomFieldQuery): Promise<CreateTaskv2CustomFieldResponse>
    /**
    * 获取自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/get
    */
    getTaskv2CustomField(custom_field_guid: string, query?: GetTaskv2CustomFieldQuery): Promise<GetTaskv2CustomFieldResponse>
    /**
    * 更新自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/patch
    */
    patchTaskv2CustomField(custom_field_guid: string, params: PatchTaskv2CustomFieldRequest, query?: PatchTaskv2CustomFieldQuery): Promise<PatchTaskv2CustomFieldResponse>
    /**
    * 列取自定义字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/list
    */
    listTaskv2CustomField(query?: ListTaskv2CustomFieldQuery): Promise<ListTaskv2CustomFieldResponse>
    /**
    * 将自定义字段加入资源
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/add
    */
    addTaskv2CustomField(custom_field_guid: string, params: AddTaskv2CustomFieldRequest): Promise<BaseResponse>
    /**
    * 将自定义字段移出资源
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/remove
    */
    removeTaskv2CustomField(custom_field_guid: string, params: RemoveTaskv2CustomFieldRequest): Promise<BaseResponse>
    /**
    * 创建自定义任务选项
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/create
    */
    createTaskv2CustomFieldOption(custom_field_guid: string, params: CreateTaskv2CustomFieldOptionRequest): Promise<CreateTaskv2CustomFieldOptionResponse>
    /**
    * 更新自定义字段选项
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/patch
    */
    patchTaskv2CustomFieldOption(custom_field_guid: string, option_guid: string, params: PatchTaskv2CustomFieldOptionRequest): Promise<PatchTaskv2CustomFieldOptionResponse>
    /**
    * 创建邮件组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/create
    */
    createMailMailgroup(params: CreateMailMailgroupRequest): Promise<CreateMailMailgroupResponse>
    /**
    * 删除邮件组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/delete
    */
    deleteMailMailgroup(mailgroup_id: string): Promise<BaseResponse>
    /**
    * 修改邮件组部分信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/patch
    */
    patchMailMailgroup(mailgroup_id: string, params: PatchMailMailgroupRequest): Promise<PatchMailMailgroupResponse>
    /**
    * 修改邮件组全部信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/update
    */
    updateMailMailgroup(mailgroup_id: string, params: UpdateMailMailgroupRequest): Promise<UpdateMailMailgroupResponse>
    /**
    * 查询指定邮件组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/get
    */
    getMailMailgroup(mailgroup_id: string): Promise<GetMailMailgroupResponse>
    /**
    * 批量获取邮件组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup/list
    */
    listMailMailgroup(query?: ListMailMailgroupQuery): Promise<ListMailMailgroupResponse>
    /**
    * 批量创建邮件组管理员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_create
    */
    batchCreateMailMailgroupManager(mailgroup_id: string, params: BatchCreateMailMailgroupManagerRequest, query?: BatchCreateMailMailgroupManagerQuery): Promise<BaseResponse>
    /**
    * 批量删除邮件组管理员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/batch_delete
    */
    batchDeleteMailMailgroupManager(mailgroup_id: string, params: BatchDeleteMailMailgroupManagerRequest, query?: BatchDeleteMailMailgroupManagerQuery): Promise<BaseResponse>
    /**
    * 批量获取邮件组管理员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-manager/list
    */
    listMailMailgroupManager(mailgroup_id: string, query?: ListMailMailgroupManagerQuery): Promise<ListMailMailgroupManagerResponse>
    /**
    * 创建邮件组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/create
    */
    createMailMailgroupMember(mailgroup_id: string, params: CreateMailMailgroupMemberRequest, query?: CreateMailMailgroupMemberQuery): Promise<CreateMailMailgroupMemberResponse>
    /**
    * 删除邮件组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/delete
    */
    deleteMailMailgroupMember(mailgroup_id: string, member_id: string): Promise<BaseResponse>
    /**
    * 查询指定邮件组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/get
    */
    getMailMailgroupMember(mailgroup_id: string, member_id: string, query?: GetMailMailgroupMemberQuery): Promise<GetMailMailgroupMemberResponse>
    /**
    * 获取所有邮件组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/list
    */
    listMailMailgroupMember(mailgroup_id: string, query?: ListMailMailgroupMemberQuery): Promise<ListMailMailgroupMemberResponse>
    /**
    * 批量创建邮件组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/batch_create
    */
    batchCreateMailMailgroupMember(mailgroup_id: string, params: BatchCreateMailMailgroupMemberRequest, query?: BatchCreateMailMailgroupMemberQuery): Promise<BatchCreateMailMailgroupMemberResponse>
    /**
    * 批量删除邮件组成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-member/batch_delete
    */
    batchDeleteMailMailgroupMember(mailgroup_id: string, params: BatchDeleteMailMailgroupMemberRequest): Promise<BaseResponse>
    /**
    * 创建邮件组别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/create
    */
    createMailMailgroupAlias(mailgroup_id: string, params: CreateMailMailgroupAliasRequest): Promise<CreateMailMailgroupAliasResponse>
    /**
    * 删除邮件组别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/delete
    */
    deleteMailMailgroupAlias(mailgroup_id: string, alias_id: string): Promise<BaseResponse>
    /**
    * 获取邮件组所有别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-alias/list
    */
    listMailMailgroupAlias(mailgroup_id: string): Promise<ListMailMailgroupAliasResponse>
    /**
    * 创建邮件组权限成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/create
    */
    createMailMailgroupPermissionMember(mailgroup_id: string, params: CreateMailMailgroupPermissionMemberRequest, query?: CreateMailMailgroupPermissionMemberQuery): Promise<CreateMailMailgroupPermissionMemberResponse>
    /**
    * 删除邮件组权限成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/delete
    */
    deleteMailMailgroupPermissionMember(mailgroup_id: string, permission_member_id: string): Promise<BaseResponse>
    /**
    * 获取邮件组权限成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/get
    */
    getMailMailgroupPermissionMember(mailgroup_id: string, permission_member_id: string, query?: GetMailMailgroupPermissionMemberQuery): Promise<GetMailMailgroupPermissionMemberResponse>
    /**
    * 批量获取邮件组权限成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/list
    */
    listMailMailgroupPermissionMember(mailgroup_id: string, query?: ListMailMailgroupPermissionMemberQuery): Promise<ListMailMailgroupPermissionMemberResponse>
    /**
    * 批量创建邮件组权限成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/batch_create
    */
    batchCreateMailMailgroupPermissionMember(mailgroup_id: string, params: BatchCreateMailMailgroupPermissionMemberRequest, query?: BatchCreateMailMailgroupPermissionMemberQuery): Promise<BatchCreateMailMailgroupPermissionMemberResponse>
    /**
    * 批量删除邮件组权限成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/mailgroup-permission_member/batch_delete
    */
    batchDeleteMailMailgroupPermissionMember(mailgroup_id: string, params: BatchDeleteMailMailgroupPermissionMemberRequest): Promise<BaseResponse>
    /**
    * 创建公共邮箱
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/create
    */
    createMailPublicMailbox(params: CreateMailPublicMailboxRequest): Promise<CreateMailPublicMailboxResponse>
    /**
    * 修改公共邮箱部分信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/patch
    */
    patchMailPublicMailbox(public_mailbox_id: string, params: PatchMailPublicMailboxRequest): Promise<PatchMailPublicMailboxResponse>
    /**
    * 修改公共邮箱全部信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/update
    */
    updateMailPublicMailbox(public_mailbox_id: string, params: UpdateMailPublicMailboxRequest): Promise<UpdateMailPublicMailboxResponse>
    /**
    * 查询指定公共邮箱
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/get
    */
    getMailPublicMailbox(public_mailbox_id: string): Promise<GetMailPublicMailboxResponse>
    /**
    * 查询所有公共邮箱
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/list
    */
    listMailPublicMailbox(query?: ListMailPublicMailboxQuery): Promise<ListMailPublicMailboxResponse>
    /**
    * 永久删除公共邮箱
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox/delete
    */
    deleteMailPublicMailbox(public_mailbox_id: string): Promise<BaseResponse>
    /**
    * 添加公共邮箱成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/create
    */
    createMailPublicMailboxMember(public_mailbox_id: string, params: CreateMailPublicMailboxMemberRequest, query?: CreateMailPublicMailboxMemberQuery): Promise<CreateMailPublicMailboxMemberResponse>
    /**
    * 删除公共邮箱单个成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/delete
    */
    deleteMailPublicMailboxMember(public_mailbox_id: string, member_id: string): Promise<BaseResponse>
    /**
    * 删除公共邮箱所有成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/clear
    */
    clearMailPublicMailboxMember(public_mailbox_id: string): Promise<BaseResponse>
    /**
    * 查询指定公共邮箱成员信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/get
    */
    getMailPublicMailboxMember(public_mailbox_id: string, member_id: string, query?: GetMailPublicMailboxMemberQuery): Promise<GetMailPublicMailboxMemberResponse>
    /**
    * 查询所有公共邮箱成员信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/list
    */
    listMailPublicMailboxMember(public_mailbox_id: string, query?: ListMailPublicMailboxMemberQuery): Promise<ListMailPublicMailboxMemberResponse>
    /**
    * 批量添加公共邮箱成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/batch_create
    */
    batchCreateMailPublicMailboxMember(public_mailbox_id: string, params: BatchCreateMailPublicMailboxMemberRequest, query?: BatchCreateMailPublicMailboxMemberQuery): Promise<BatchCreateMailPublicMailboxMemberResponse>
    /**
    * 批量删除公共邮箱成员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-member/batch_delete
    */
    batchDeleteMailPublicMailboxMember(public_mailbox_id: string, params: BatchDeleteMailPublicMailboxMemberRequest): Promise<BaseResponse>
    /**
    * 创建公共邮箱别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/create
    */
    createMailPublicMailboxAlias(public_mailbox_id: string, params: CreateMailPublicMailboxAliasRequest): Promise<CreateMailPublicMailboxAliasResponse>
    /**
    * 删除公共邮箱别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/delete
    */
    deleteMailPublicMailboxAlias(public_mailbox_id: string, alias_id: string): Promise<BaseResponse>
    /**
    * 查询公共邮箱的所有别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/public_mailbox-alias/list
    */
    listMailPublicMailboxAlias(public_mailbox_id: string): Promise<ListMailPublicMailboxAliasResponse>
    /**
    * 从回收站删除用户邮箱地址
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox/delete
    */
    deleteMailUserMailbox(user_mailbox_id: string, query?: DeleteMailUserMailboxQuery): Promise<BaseResponse>
    /**
    * 创建用户邮箱别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/create
    */
    createMailUserMailboxAlias(user_mailbox_id: string, params: CreateMailUserMailboxAliasRequest): Promise<CreateMailUserMailboxAliasResponse>
    /**
    * 删除用户邮箱别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/delete
    */
    deleteMailUserMailboxAlias(user_mailbox_id: string, alias_id: string): Promise<BaseResponse>
    /**
    * 获取用户邮箱所有别名
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user_mailbox-alias/list
    */
    listMailUserMailboxAlias(user_mailbox_id: string, query?: ListMailUserMailboxAliasQuery): Promise<ListMailUserMailboxAliasResponse>
    /**
    * 查询邮箱地址状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/mail-v1/user/query
    */
    queryMailUser(params: QueryMailUserRequest): Promise<QueryMailUserResponse>
    /**
    * 获取应用信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/get
    */
    getApplication(app_id: string, query?: GetApplicationQuery): Promise<GetApplicationResponse>
    /**
    * 获取应用版本信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/get
    */
    getApplicationApplicationAppVersion(app_id: string, version_id: string, query?: GetApplicationApplicationAppVersionQuery): Promise<GetApplicationApplicationAppVersionResponse>
    /**
    * 获取应用版本列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/list
    */
    listApplicationApplicationAppVersion(app_id: string, query?: ListApplicationApplicationAppVersionQuery): Promise<ListApplicationApplicationAppVersionResponse>
    /**
    * 获取应用版本中开发者申请的通讯录权限范围
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/contacts_range_suggest
    */
    contactsRangeSuggestApplicationApplicationAppVersion(app_id: string, version_id: string, query?: ContactsRangeSuggestApplicationApplicationAppVersionQuery): Promise<ContactsRangeSuggestApplicationApplicationAppVersionResponse>
    /**
    * 查看待审核的应用列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/underauditlist
    */
    underauditlistApplication(query?: UnderauditlistApplicationQuery): Promise<UnderauditlistApplicationResponse>
    /**
    * 更新应用审核状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/patch
    */
    patchApplicationApplicationAppVersion(app_id: string, version_id: string, params: PatchApplicationApplicationAppVersionRequest, query?: PatchApplicationApplicationAppVersionQuery): Promise<BaseResponse>
    /**
    * 更新应用分组信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/patch
    */
    patchApplication(app_id: string, params: PatchApplicationRequest, query?: PatchApplicationQuery): Promise<BaseResponse>
    /**
    * 获取应用通讯录权限范围配置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration
    */
    contactsRangeConfigurationApplication(app_id: string, query?: ContactsRangeConfigurationApplicationQuery): Promise<ContactsRangeConfigurationApplicationResponse>
    /**
    * 更新应用通讯录权限范围配置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-contacts_range/patch
    */
    patchApplicationApplicationContactsRange(app_id: string, params: PatchApplicationApplicationContactsRangeRequest, query?: PatchApplicationApplicationContactsRangeQuery): Promise<BaseResponse>
    /**
    * 查询用户或部门是否在应用的可用或禁用名单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-visibility/check_white_black_list
    */
    checkWhiteBlackListApplicationApplicationVisibility(app_id: string, params: CheckWhiteBlackListApplicationApplicationVisibilityRequest, query?: CheckWhiteBlackListApplicationApplicationVisibilityQuery): Promise<CheckWhiteBlackListApplicationApplicationVisibilityResponse>
    /**
    * 更新应用可用范围
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-visibility/patch
    */
    patchApplicationApplicationVisibility(app_id: string, params: PatchApplicationApplicationVisibilityRequest, query?: PatchApplicationApplicationVisibilityQuery): Promise<BaseResponse>
    /**
    * 启停用应用
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-management/update
    */
    updateApplicationApplicationManagement(app_id: string, params: UpdateApplicationApplicationManagementRequest): Promise<BaseResponse>
    /**
    * 获取多部门应用使用概览
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/department_overview
    */
    departmentOverviewApplicationApplicationAppUsage(app_id: string, params: DepartmentOverviewApplicationApplicationAppUsageRequest, query?: DepartmentOverviewApplicationApplicationAppUsageQuery): Promise<DepartmentOverviewApplicationApplicationAppUsageResponse>
    /**
    * 获取应用使用概览
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/overview
    */
    overviewApplicationApplicationAppUsage(app_id: string, params: OverviewApplicationApplicationAppUsageRequest, query?: OverviewApplicationApplicationAppUsageQuery): Promise<OverviewApplicationApplicationAppUsageResponse>
    /**
    * 更新应用反馈
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/patch
    */
    patchApplicationApplicationFeedback(app_id: string, feedback_id: string, query?: PatchApplicationApplicationFeedbackQuery): Promise<BaseResponse>
    /**
    * 获取应用反馈列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/list
    */
    listApplicationApplicationFeedback(app_id: string, query?: ListApplicationApplicationFeedbackQuery): Promise<ListApplicationApplicationFeedbackResponse>
    /**
    * 更新应用红点
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_badge/set
    */
    setApplicationAppBadge(params: SetApplicationAppBadgeRequest, query?: SetApplicationAppBadgeQuery): Promise<BaseResponse>
    /**
    * 获取企业席位信息接口
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant-product_assign_info/query
    */
    queryTenantTenantProductAssignInfo(): Promise<QueryTenantTenantProductAssignInfoResponse>
    /**
    * 获取企业信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant/query
    */
    queryTenant(): Promise<QueryTenantResponse>
    /**
    * 获取认证信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/verification-v1/verification/get
    */
    getVerification(): Promise<GetVerificationResponse>
    /**
    * 创建系统状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/create
    */
    createPersonalSettingsSystemStatus(params: CreatePersonalSettingsSystemStatusRequest): Promise<CreatePersonalSettingsSystemStatusResponse>
    /**
    * 删除系统状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/delete
    */
    deletePersonalSettingsSystemStatus(system_status_id: string): Promise<BaseResponse>
    /**
    * 修改系统状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/patch
    */
    patchPersonalSettingsSystemStatus(system_status_id: string, params: PatchPersonalSettingsSystemStatusRequest): Promise<PatchPersonalSettingsSystemStatusResponse>
    /**
    * 获取系统状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/list
    */
    listPersonalSettingsSystemStatus(query?: ListPersonalSettingsSystemStatusQuery): Promise<ListPersonalSettingsSystemStatusResponse>
    /**
    * 批量开启系统状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_open
    */
    batchOpenPersonalSettingsSystemStatus(system_status_id: string, params: BatchOpenPersonalSettingsSystemStatusRequest, query?: BatchOpenPersonalSettingsSystemStatusQuery): Promise<BatchOpenPersonalSettingsSystemStatusResponse>
    /**
    * 批量关闭系统状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_close
    */
    batchClosePersonalSettingsSystemStatus(system_status_id: string, params: BatchClosePersonalSettingsSystemStatusRequest, query?: BatchClosePersonalSettingsSystemStatusQuery): Promise<BatchClosePersonalSettingsSystemStatusResponse>
    /**
    * 搜索消息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/message/create
    */
    createSearchMessage(params: CreateSearchMessageRequest, query?: CreateSearchMessageQuery): Promise<CreateSearchMessageResponse>
    /**
    * 搜索应用
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/app/create
    */
    createSearchApp(params: CreateSearchAppRequest, query?: CreateSearchAppQuery): Promise<CreateSearchAppResponse>
    /**
    * 创建数据源
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/create
    */
    createSearchDataSource(params: CreateSearchDataSourceRequest): Promise<CreateSearchDataSourceResponse>
    /**
    * 删除数据源
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/delete
    */
    deleteSearchDataSource(data_source_id: string): Promise<BaseResponse>
    /**
    * 修改数据源
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/patch
    */
    patchSearchDataSource(data_source_id: string, params: PatchSearchDataSourceRequest): Promise<PatchSearchDataSourceResponse>
    /**
    * 获取数据源
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/get
    */
    getSearchDataSource(data_source_id: string): Promise<GetSearchDataSourceResponse>
    /**
    * 批量获取数据源
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/list
    */
    listSearchDataSource(query?: ListSearchDataSourceQuery): Promise<ListSearchDataSourceResponse>
    /**
    * 为指定数据项创建索引
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/create
    */
    createSearchDataSourceItem(data_source_id: string, params: CreateSearchDataSourceItemRequest): Promise<BaseResponse>
    /**
    * 删除数据项
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/delete
    */
    deleteSearchDataSourceItem(data_source_id: string, item_id: string): Promise<BaseResponse>
    /**
    * 查询指定数据项
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/get
    */
    getSearchDataSourceItem(data_source_id: string, item_id: string): Promise<GetSearchDataSourceItemResponse>
    /**
    * 创建数据范式
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/create
    */
    createSearchSchema(params: CreateSearchSchemaRequest, query?: CreateSearchSchemaQuery): Promise<CreateSearchSchemaResponse>
    /**
    * 删除数据范式
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/delete
    */
    deleteSearchSchema(schema_id: string): Promise<BaseResponse>
    /**
    * 修改数据范式
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/patch
    */
    patchSearchSchema(schema_id: string, params: PatchSearchSchemaRequest): Promise<PatchSearchSchemaResponse>
    /**
    * 获取数据范式
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/get
    */
    getSearchSchema(schema_id: string): Promise<GetSearchSchemaResponse>
    /**
    * 识别文件中的简历信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/resume/parse
    */
    parseDocumentAiResume(form: FormData): Promise<ParseDocumentAiResumeResponse>
    /**
    * 识别文件中的机动车发票
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/vehicle_invoice/recognize
    */
    recognizeDocumentAiVehicleInvoice(form: FormData): Promise<RecognizeDocumentAiVehicleInvoiceResponse>
    /**
    * 识别文件中的健康证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/health_certificate/recognize
    */
    recognizeDocumentAiHealthCertificate(form: FormData): Promise<RecognizeDocumentAiHealthCertificateResponse>
    /**
    * 识别文件中的港澳居民来往内地通行证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/hkm_mainland_travel_permit/recognize
    */
    recognizeDocumentAiHkmMainlandTravelPermit(form: FormData): Promise<RecognizeDocumentAiHkmMainlandTravelPermitResponse>
    /**
    * 识别文件中的台湾居民来往大陆通行证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/tw_mainland_travel_permit/recognize
    */
    recognizeDocumentAiTwMainlandTravelPermit(form: FormData): Promise<RecognizeDocumentAiTwMainlandTravelPermitResponse>
    /**
    * 识别文件中的中国护照
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/chinese_passport/recognize
    */
    recognizeDocumentAiChinesePassport(form: FormData): Promise<RecognizeDocumentAiChinesePassportResponse>
    /**
    * 识别文件中的银行卡
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/bank_card/recognize
    */
    recognizeDocumentAiBankCard(form: FormData): Promise<RecognizeDocumentAiBankCardResponse>
    /**
    * 识别文件中的行驶证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/vehicle_license/recognize
    */
    recognizeDocumentAiVehicleLicense(form: FormData): Promise<RecognizeDocumentAiVehicleLicenseResponse>
    /**
    * 识别文件中的火车票
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/train_invoice/recognize
    */
    recognizeDocumentAiTrainInvoice(form: FormData): Promise<RecognizeDocumentAiTrainInvoiceResponse>
    /**
    * 识别文件中的出租车发票
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/taxi_invoice/recognize
    */
    recognizeDocumentAiTaxiInvoice(form: FormData): Promise<RecognizeDocumentAiTaxiInvoiceResponse>
    /**
    * 识别文件中的身份证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/id_card/recognize
    */
    recognizeDocumentAiIdCard(form: FormData): Promise<RecognizeDocumentAiIdCardResponse>
    /**
    * 识别文件中的食品生产许可证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/food_produce_license/recognize
    */
    recognizeDocumentAiFoodProduceLicense(form: FormData): Promise<RecognizeDocumentAiFoodProduceLicenseResponse>
    /**
    * 识别文件中的食品经营许可证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/food_manage_license/recognize
    */
    recognizeDocumentAiFoodManageLicense(form: FormData): Promise<RecognizeDocumentAiFoodManageLicenseResponse>
    /**
    * 识别文件中的驾驶证
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/driving_license/recognize
    */
    recognizeDocumentAiDrivingLicense(form: FormData): Promise<RecognizeDocumentAiDrivingLicenseResponse>
    /**
    * 识别文件中的增值税发票
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/vat_invoice/recognize
    */
    recognizeDocumentAiVatInvoice(form: FormData): Promise<RecognizeDocumentAiVatInvoiceResponse>
    /**
    * 识别文件中的营业执照
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/business_license/recognize
    */
    recognizeDocumentAiBusinessLicense(form: FormData): Promise<RecognizeDocumentAiBusinessLicenseResponse>
    /**
    * 提取文件中的合同字段
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/contract/field_extraction
    */
    fieldExtractionDocumentAiContract(form: FormData): Promise<FieldExtractionDocumentAiContractResponse>
    /**
    * 识别文件中的名片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/document_ai-v1/business_card/recognize
    */
    recognizeDocumentAiBusinessCard(form: FormData): Promise<RecognizeDocumentAiBusinessCardResponse>
    /**
    * 识别图片中的文字
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/optical_char_recognition-v1/image/basic_recognize
    */
    basicRecognizeOpticalCharRecognitionImage(params: BasicRecognizeOpticalCharRecognitionImageRequest): Promise<BasicRecognizeOpticalCharRecognitionImageResponse>
    /**
    * 识别语音文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/file_recognize
    */
    fileRecognizeSpeechToTextSpeech(params: FileRecognizeSpeechToTextSpeechRequest): Promise<FileRecognizeSpeechToTextSpeechResponse>
    /**
    * 识别流式语音
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/stream_recognize
    */
    streamRecognizeSpeechToTextSpeech(params: StreamRecognizeSpeechToTextSpeechRequest): Promise<StreamRecognizeSpeechToTextSpeechResponse>
    /**
    * 识别文本语种
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/detect
    */
    detectTranslationText(params: DetectTranslationTextRequest): Promise<DetectTranslationTextResponse>
    /**
    * 翻译文本
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/translate
    */
    translateTranslationText(params: TranslateTranslationTextRequest): Promise<TranslateTranslationTextResponse>
    /**
    * 同意人工任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/agree
    */
    agreeApaasApprovalTask(approval_task_id: string, params: AgreeApaasApprovalTaskRequest): Promise<BaseResponse>
    /**
    * 拒绝人工任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/reject
    */
    rejectApaasApprovalTask(approval_task_id: string, params: RejectApaasApprovalTaskRequest): Promise<BaseResponse>
    /**
    * 转交人工任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/transfer
    */
    transferApaasApprovalTask(approval_task_id: string, params: TransferApaasApprovalTaskRequest): Promise<BaseResponse>
    /**
    * 人工任务加签
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/add_assignee
    */
    addAssigneeApaasApprovalTask(approval_task_id: string, params: AddAssigneeApaasApprovalTaskRequest): Promise<BaseResponse>
    /**
    * 重置用户的企业邮箱密码
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/password/reset
    */
    resetAdminPassword(params: ResetAdminPasswordRequest, query?: ResetAdminPasswordQuery): Promise<BaseResponse>
    /**
    * 获取部门维度的用户活跃和功能使用数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_dept_stat/list
    */
    listAdminAdminDeptStat(query?: ListAdminAdminDeptStatQuery): Promise<ListAdminAdminDeptStatResponse>
    /**
    * 获取用户维度的用户活跃和功能使用数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_user_stat/list
    */
    listAdminAdminUserStat(query?: ListAdminAdminUserStatQuery): Promise<ListAdminAdminUserStatResponse>
    /**
    * 创建勋章
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/create
    */
    createAdminBadge(params: CreateAdminBadgeRequest): Promise<CreateAdminBadgeResponse>
    /**
    * 修改勋章信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/update
    */
    updateAdminBadge(badge_id: string, params: UpdateAdminBadgeRequest): Promise<UpdateAdminBadgeResponse>
    /**
    * 上传勋章图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge_image/create
    */
    createAdminBadgeImage(form: FormData): Promise<CreateAdminBadgeImageResponse>
    /**
    * 获取勋章列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/list
    */
    listAdminBadge(query?: ListAdminBadgeQuery): Promise<ListAdminBadgeResponse>
    /**
    * 获取勋章详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/get
    */
    getAdminBadge(badge_id: string): Promise<GetAdminBadgeResponse>
    /**
    * 创建授予名单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/create
    */
    createAdminBadgeGrant(badge_id: string, params: CreateAdminBadgeGrantRequest, query?: CreateAdminBadgeGrantQuery): Promise<CreateAdminBadgeGrantResponse>
    /**
    * 删除授予名单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/delete
    */
    deleteAdminBadgeGrant(badge_id: string, grant_id: string): Promise<BaseResponse>
    /**
    * 修改授予名单
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/update
    */
    updateAdminBadgeGrant(badge_id: string, grant_id: string, params: UpdateAdminBadgeGrantRequest, query?: UpdateAdminBadgeGrantQuery): Promise<UpdateAdminBadgeGrantResponse>
    /**
    * 获取授予名单列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/list
    */
    listAdminBadgeGrant(badge_id: string, query?: ListAdminBadgeGrantQuery): Promise<ListAdminBadgeGrantResponse>
    /**
    * 获取授予名单详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/get
    */
    getAdminBadgeGrant(badge_id: string, grant_id: string, query?: GetAdminBadgeGrantQuery): Promise<GetAdminBadgeGrantResponse>
    /**
    * 批量获取员工花名册信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list
    */
    listEhrEmployee(query?: ListEhrEmployeeQuery): Promise<ListEhrEmployeeResponse>
    /**
    * 下载人员的附件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/attachment/get
    */
    getEhrAttachment(token: string): Promise<Buffer>
    /**
    * 查询国籍信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-nationality/search
    */
    searchCorehrBasicInfoNationality(params: SearchCorehrBasicInfoNationalityRequest, query?: SearchCorehrBasicInfoNationalityQuery): Promise<SearchCorehrBasicInfoNationalityResponse>
    /**
    * 查询银行信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search
    */
    searchCorehrBasicInfoBank(params: SearchCorehrBasicInfoBankRequest, query?: SearchCorehrBasicInfoBankQuery): Promise<SearchCorehrBasicInfoBankResponse>
    /**
    * 查询支行信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank_branch/search
    */
    searchCorehrBasicInfoBankBranch(params: SearchCorehrBasicInfoBankBranchRequest, query?: SearchCorehrBasicInfoBankBranchQuery): Promise<SearchCorehrBasicInfoBankBranchResponse>
    /**
    * 获取字段详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param
    */
    getByParamCorehrCustomField(query?: GetByParamCorehrCustomFieldQuery): Promise<GetByParamCorehrCustomFieldResponse>
    /**
    * 获取自定义字段列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/query
    */
    queryCorehrCustomField(query?: QueryCorehrCustomFieldQuery): Promise<QueryCorehrCustomFieldResponse>
    /**
    * 获取飞书人事对象列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/list_object_api_name
    */
    listObjectApiNameCorehrCustomField(query?: ListObjectApiNameCorehrCustomFieldQuery): Promise<ListObjectApiNameCorehrCustomFieldResponse>
    /**
    * 查询国家/地区信息v2
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search
    */
    searchCorehrBasicInfoCountryRegion(params: SearchCorehrBasicInfoCountryRegionRequest, query?: SearchCorehrBasicInfoCountryRegionQuery): Promise<SearchCorehrBasicInfoCountryRegionResponse>
    /**
    * 查询省份/行政区信息v2
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search
    */
    searchCorehrBasicInfoCountryRegionSubdivision(params: SearchCorehrBasicInfoCountryRegionSubdivisionRequest, query?: SearchCorehrBasicInfoCountryRegionSubdivisionQuery): Promise<SearchCorehrBasicInfoCountryRegionSubdivisionResponse>
    /**
    * 查询城市信息v2
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search
    */
    searchCorehrBasicInfoCity(params: SearchCorehrBasicInfoCityRequest, query?: SearchCorehrBasicInfoCityQuery): Promise<SearchCorehrBasicInfoCityResponse>
    /**
    * 查询区/县信息v2
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-district/search
    */
    searchCorehrBasicInfoDistrict(params: SearchCorehrBasicInfoDistrictRequest, query?: SearchCorehrBasicInfoDistrictQuery): Promise<SearchCorehrBasicInfoDistrictResponse>
    /**
    * 创建人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/create
    */
    createCorehrEmployeeType(params: CreateCorehrEmployeeTypeRequest, query?: CreateCorehrEmployeeTypeQuery): Promise<CreateCorehrEmployeeTypeResponse>
    /**
    * 删除人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/delete
    */
    deleteCorehrEmployeeType(employee_type_id: string): Promise<BaseResponse>
    /**
    * 更新人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/patch
    */
    patchCorehrEmployeeType(employee_type_id: string, params: PatchCorehrEmployeeTypeRequest, query?: PatchCorehrEmployeeTypeQuery): Promise<PatchCorehrEmployeeTypeResponse>
    /**
    * 查询单个人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/get
    */
    getCorehrEmployeeType(employee_type_id: string): Promise<GetCorehrEmployeeTypeResponse>
    /**
    * 批量查询人员类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list
    */
    listCorehrEmployeeType(query?: ListCorehrEmployeeTypeQuery): Promise<ListCorehrEmployeeTypeResponse>
    /**
    * 创建国家证件类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/create
    */
    createCorehrNationalIdType(params: CreateCorehrNationalIdTypeRequest, query?: CreateCorehrNationalIdTypeQuery): Promise<CreateCorehrNationalIdTypeResponse>
    /**
    * 删除国家证件类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/delete
    */
    deleteCorehrNationalIdType(national_id_type_id: string): Promise<BaseResponse>
    /**
    * 更新国家证件类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/patch
    */
    patchCorehrNationalIdType(national_id_type_id: string, params: PatchCorehrNationalIdTypeRequest, query?: PatchCorehrNationalIdTypeQuery): Promise<PatchCorehrNationalIdTypeResponse>
    /**
    * 查询单个国家证件类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/get
    */
    getCorehrNationalIdType(national_id_type_id: string): Promise<GetCorehrNationalIdTypeResponse>
    /**
    * 批量查询国家证件类型
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/list
    */
    listCorehrNationalIdType(query?: ListCorehrNationalIdTypeQuery): Promise<ListCorehrNationalIdTypeResponse>
    /**
    * 创建工时制度
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/create
    */
    createCorehrWorkingHoursType(params: CreateCorehrWorkingHoursTypeRequest, query?: CreateCorehrWorkingHoursTypeQuery): Promise<CreateCorehrWorkingHoursTypeResponse>
    /**
    * 删除工时制度
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/delete
    */
    deleteCorehrWorkingHoursType(working_hours_type_id: string): Promise<BaseResponse>
    /**
    * 更新工时制度
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/patch
    */
    patchCorehrWorkingHoursType(working_hours_type_id: string, params: PatchCorehrWorkingHoursTypeRequest, query?: PatchCorehrWorkingHoursTypeQuery): Promise<PatchCorehrWorkingHoursTypeResponse>
    /**
    * 查询单个工时制度
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/get
    */
    getCorehrWorkingHoursType(working_hours_type_id: string): Promise<GetCorehrWorkingHoursTypeResponse>
    /**
    * 批量查询工时制度
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list
    */
    listCorehrWorkingHoursType(query?: ListCorehrWorkingHoursTypeQuery): Promise<ListCorehrWorkingHoursTypeResponse>
    /**
    * 查询货币信息v2
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-currency/search
    */
    searchCorehrBasicInfoCurrency(params: SearchCorehrBasicInfoCurrencyRequest, query?: SearchCorehrBasicInfoCurrencyQuery): Promise<SearchCorehrBasicInfoCurrencyResponse>
    /**
    * 批量查询员工信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get
    */
    batchGetCorehrEmployee(params: BatchGetCorehrEmployeeRequest, query?: BatchGetCorehrEmployeeQuery): Promise<BatchGetCorehrEmployeeResponse>
    /**
    * 搜索员工信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/search
    */
    searchCorehrEmployee(params: SearchCorehrEmployeeRequest, query?: SearchCorehrEmployeeQuery): Promise<SearchCorehrEmployeeResponse>
    /**
    * 创建雇佣信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/create
    */
    createCorehrEmployment(params: CreateCorehrEmploymentRequest, query?: CreateCorehrEmploymentQuery): Promise<CreateCorehrEmploymentResponse>
    /**
    * 更新雇佣信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/patch
    */
    patchCorehrEmployment(employment_id: string, params: PatchCorehrEmploymentRequest, query?: PatchCorehrEmploymentQuery): Promise<PatchCorehrEmploymentResponse>
    /**
    * 删除雇佣信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/delete
    */
    deleteCorehrEmployment(employment_id: string, query?: DeleteCorehrEmploymentQuery): Promise<BaseResponse>
    /**
    * 创建个人信息（V2）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/create
    */
    createCorehrPerson(params: CreateCorehrPersonRequest, query?: CreateCorehrPersonQuery): Promise<CreateCorehrPersonResponse>
    /**
    * 更新个人信息（V2）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/patch
    */
    patchCorehrPerson(person_id: string, params: PatchCorehrPersonRequest, query?: PatchCorehrPersonQuery): Promise<PatchCorehrPersonResponse>
    /**
    * 删除个人信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/delete
    */
    deleteCorehrPerson(person_id: string): Promise<BaseResponse>
    /**
    * 上传文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/upload
    */
    uploadCorehrPerson(form: FormData): Promise<UploadCorehrPersonResponse>
    /**
    * 下载文件
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/file/get
    */
    getCorehrFile(id: string): Promise<Buffer>
    /**
    * 创建任职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/create
    */
    createCorehrJobData(params: CreateCorehrJobDataRequest, query?: CreateCorehrJobDataQuery): Promise<CreateCorehrJobDataResponse>
    /**
    * 删除任职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/delete
    */
    deleteCorehrJobData(job_data_id: string): Promise<BaseResponse>
    /**
    * 更新任职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/patch
    */
    patchCorehrJobData(job_data_id: string, params: PatchCorehrJobDataRequest, query?: PatchCorehrJobDataQuery): Promise<PatchCorehrJobDataResponse>
    /**
    * 查询单个任职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/get
    */
    getCorehrJobData(job_data_id: string, query?: GetCorehrJobDataQuery): Promise<GetCorehrJobDataResponse>
    /**
    * 获取任职信息列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/query
    */
    queryCorehrEmployeesJobData(params: QueryCorehrEmployeesJobDataRequest, query?: QueryCorehrEmployeesJobDataQuery): Promise<QueryCorehrEmployeesJobDataResponse>
    /**
    * 批量查询员工任职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/batch_get
    */
    batchGetCorehrEmployeesJobData(params: BatchGetCorehrEmployeesJobDataRequest, query?: BatchGetCorehrEmployeesJobDataQuery): Promise<BatchGetCorehrEmployeesJobDataResponse>
    /**
    * 批量查询任职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/list
    */
    listCorehrJobData(query?: ListCorehrJobDataQuery): Promise<ListCorehrJobDataResponse>
    /**
    * 获取父部门信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/parents
    */
    parentsCorehrDepartment(params: ParentsCorehrDepartmentRequest, query?: ParentsCorehrDepartmentQuery): Promise<ParentsCorehrDepartmentResponse>
    /**
    * 搜索部门信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/search
    */
    searchCorehrDepartment(params: SearchCorehrDepartmentRequest, query?: SearchCorehrDepartmentQuery): Promise<SearchCorehrDepartmentResponse>
    /**
    * 创建部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/create
    */
    createCorehrDepartment(params: CreateCorehrDepartmentRequest, query?: CreateCorehrDepartmentQuery): Promise<CreateCorehrDepartmentResponse>
    /**
    * 更新部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/patch
    */
    patchCorehrDepartment(department_id: string, params: PatchCorehrDepartmentRequest, query?: PatchCorehrDepartmentQuery): Promise<PatchCorehrDepartmentResponse>
    /**
    * 删除部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/delete
    */
    deleteCorehrDepartment(department_id: string): Promise<BaseResponse>
    /**
    * 查询单个部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/get
    */
    getCorehrDepartment(department_id: string, query?: GetCorehrDepartmentQuery): Promise<GetCorehrDepartmentResponse>
    /**
    * 批量查询部门（ V2）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get
    */
    batchGetCorehrDepartment(params: BatchGetCorehrDepartmentRequest, query?: BatchGetCorehrDepartmentQuery): Promise<BatchGetCorehrDepartmentResponse>
    /**
    * 批量查询部门
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/list
    */
    listCorehrDepartment(query?: ListCorehrDepartmentQuery): Promise<ListCorehrDepartmentResponse>
    /**
    * 通过地点 ID 批量获取地点信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/batch_get
    */
    batchGetCorehrLocation(params: BatchGetCorehrLocationRequest): Promise<BatchGetCorehrLocationResponse>
    /**
    * 创建地点
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/create
    */
    createCorehrLocation(params: CreateCorehrLocationRequest, query?: CreateCorehrLocationQuery): Promise<CreateCorehrLocationResponse>
    /**
    * 删除地点
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/delete
    */
    deleteCorehrLocation(location_id: string): Promise<BaseResponse>
    /**
    * 查询单个地点
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/get
    */
    getCorehrLocation(location_id: string): Promise<GetCorehrLocationResponse>
    /**
    * 批量查询地点
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list
    */
    listCorehrLocation(query?: ListCorehrLocationQuery): Promise<ListCorehrLocationResponse>
    /**
    * 查询单个公司
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/get
    */
    getCorehrCompany(company_id: string): Promise<GetCorehrCompanyResponse>
    /**
    * 批量查询公司
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list
    */
    listCorehrCompany(query?: ListCorehrCompanyQuery): Promise<ListCorehrCompanyResponse>
    /**
    * 通过公司 ID 批量获取公司信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/batch_get
    */
    batchGetCorehrCompany(params: BatchGetCorehrCompanyRequest): Promise<BatchGetCorehrCompanyResponse>
    /**
    * 创建公司
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/create
    */
    createCorehrCompany(params: CreateCorehrCompanyRequest, query?: CreateCorehrCompanyQuery): Promise<CreateCorehrCompanyResponse>
    /**
    * 更新公司
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/patch
    */
    patchCorehrCompany(company_id: string, params: PatchCorehrCompanyRequest, query?: PatchCorehrCompanyQuery): Promise<PatchCorehrCompanyResponse>
    /**
    * 删除公司
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/delete
    */
    deleteCorehrCompany(company_id: string): Promise<BaseResponse>
    /**
    * 创建成本中心
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/create
    */
    createCorehrCostCenter(params: CreateCorehrCostCenterRequest, query?: CreateCorehrCostCenterQuery): Promise<CreateCorehrCostCenterResponse>
    /**
    * 启用 / 停用成本中心
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/patch
    */
    patchCorehrCostCenter(cost_center_id: string, params: PatchCorehrCostCenterRequest, query?: PatchCorehrCostCenterQuery): Promise<PatchCorehrCostCenterResponse>
    /**
    * 删除成本中心
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/delete
    */
    deleteCorehrCostCenter(cost_center_id: string, params: DeleteCorehrCostCenterRequest): Promise<BaseResponse>
    /**
    * 搜索成本中心信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/search
    */
    searchCorehrCostCenter(params: SearchCorehrCostCenterRequest, query?: SearchCorehrCostCenterQuery): Promise<SearchCorehrCostCenterResponse>
    /**
    * 创建成本中心版本
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/create
    */
    createCorehrCostCenterVersion(cost_center_id: string, params: CreateCorehrCostCenterVersionRequest, query?: CreateCorehrCostCenterVersionQuery): Promise<CreateCorehrCostCenterVersionResponse>
    /**
    * 更新成本中心版本
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/patch
    */
    patchCorehrCostCenterVersion(cost_center_id: string, version_id: string, params: PatchCorehrCostCenterVersionRequest, query?: PatchCorehrCostCenterVersionQuery): Promise<PatchCorehrCostCenterVersionResponse>
    /**
    * 删除成本中心版本
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/delete
    */
    deleteCorehrCostCenterVersion(cost_center_id: string, version_id: string, params: DeleteCorehrCostCenterVersionRequest): Promise<BaseResponse>
    /**
    * 通过职级 ID 批量获取职级信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/batch_get
    */
    batchGetCorehrJobLevel(params: BatchGetCorehrJobLevelRequest): Promise<BatchGetCorehrJobLevelResponse>
    /**
    * 创建职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/create
    */
    createCorehrJobLevel(params: CreateCorehrJobLevelRequest, query?: CreateCorehrJobLevelQuery): Promise<CreateCorehrJobLevelResponse>
    /**
    * 删除职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/delete
    */
    deleteCorehrJobLevel(job_level_id: string): Promise<BaseResponse>
    /**
    * 更新职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/patch
    */
    patchCorehrJobLevel(job_level_id: string, params: PatchCorehrJobLevelRequest, query?: PatchCorehrJobLevelQuery): Promise<PatchCorehrJobLevelResponse>
    /**
    * 查询单个职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/get
    */
    getCorehrJobLevel(job_level_id: string): Promise<GetCorehrJobLevelResponse>
    /**
    * 批量查询职级
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list
    */
    listCorehrJobLevel(query?: ListCorehrJobLevelQuery): Promise<ListCorehrJobLevelResponse>
    /**
    * 通过序列 ID 批量获取序列信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/batch_get
    */
    batchGetCorehrJobFamily(params: BatchGetCorehrJobFamilyRequest): Promise<BatchGetCorehrJobFamilyResponse>
    /**
    * 创建序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/create
    */
    createCorehrJobFamily(params: CreateCorehrJobFamilyRequest, query?: CreateCorehrJobFamilyQuery): Promise<CreateCorehrJobFamilyResponse>
    /**
    * 删除序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/delete
    */
    deleteCorehrJobFamily(job_family_id: string): Promise<BaseResponse>
    /**
    * 更新序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/patch
    */
    patchCorehrJobFamily(job_family_id: string, params: PatchCorehrJobFamilyRequest, query?: PatchCorehrJobFamilyQuery): Promise<PatchCorehrJobFamilyResponse>
    /**
    * 查询单个序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/get
    */
    getCorehrJobFamily(job_family_id: string): Promise<GetCorehrJobFamilyResponse>
    /**
    * 批量查询序列
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list
    */
    listCorehrJobFamily(query?: ListCorehrJobFamilyQuery): Promise<ListCorehrJobFamilyResponse>
    /**
    * 创建职务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/create
    */
    createCorehrJob(params: CreateCorehrJobRequest, query?: CreateCorehrJobQuery): Promise<CreateCorehrJobResponse>
    /**
    * 删除职务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/delete
    */
    deleteCorehrJob(job_id: string): Promise<BaseResponse>
    /**
    * 更新职务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/patch
    */
    patchCorehrJob(job_id: string, params: PatchCorehrJobRequest, query?: PatchCorehrJobQuery): Promise<PatchCorehrJobResponse>
    /**
    * 查询单个职务（V2）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/get
    */
    getCorehrJob(job_id: string): Promise<GetCorehrJobResponse>
    /**
    * 批量查询职务（V2)
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list
    */
    listCorehrJob(query?: ListCorehrJobQuery): Promise<ListCorehrJobResponse>
    /**
    * 查询单个职务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/get
    */
    getCorehrJob(job_id: string): Promise<GetCorehrJobResponse>
    /**
    * 批量查询职务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/list
    */
    listCorehrJob(query?: ListCorehrJobQuery): Promise<ListCorehrJobResponse>
    /**
    * 创建待入职人员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/create
    */
    createCorehrPreHire(params: CreateCorehrPreHireRequest): Promise<CreateCorehrPreHireResponse>
    /**
    * 更新待入职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/patch
    */
    patchCorehrPreHire(pre_hire_id: string, params: PatchCorehrPreHireRequest, query?: PatchCorehrPreHireQuery): Promise<PatchCorehrPreHireResponse>
    /**
    * 删除待入职人员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/delete
    */
    deleteCorehrPreHire(pre_hire_id: string): Promise<BaseResponse>
    /**
    * 查询单个待入职人员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/get
    */
    getCorehrPreHire(pre_hire_id: string): Promise<GetCorehrPreHireResponse>
    /**
    * 批量查询待入职人员
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/list
    */
    listCorehrPreHire(query?: ListCorehrPreHireQuery): Promise<ListCorehrPreHireResponse>
    /**
    * 搜索合同
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/contract/search
    */
    searchCorehrContract(params: SearchCorehrContractRequest, query?: SearchCorehrContractQuery): Promise<SearchCorehrContractResponse>
    /**
    * 创建合同
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/create
    */
    createCorehrContract(params: CreateCorehrContractRequest, query?: CreateCorehrContractQuery): Promise<CreateCorehrContractResponse>
    /**
    * 删除合同
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/delete
    */
    deleteCorehrContract(contract_id: string): Promise<BaseResponse>
    /**
    * 更新合同
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/patch
    */
    patchCorehrContract(contract_id: string, params: PatchCorehrContractRequest, query?: PatchCorehrContractQuery): Promise<PatchCorehrContractResponse>
    /**
    * 查询单个合同
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/get
    */
    getCorehrContract(contract_id: string): Promise<GetCorehrContractResponse>
    /**
    * 批量查询合同
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/list
    */
    listCorehrContract(query?: ListCorehrContractQuery): Promise<ListCorehrContractResponse>
    /**
    * 搜索试用期信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/search
    */
    searchCorehrProbation(params: SearchCorehrProbationRequest, query?: SearchCorehrProbationQuery): Promise<SearchCorehrProbationResponse>
    /**
    * 启用/停用试用期考核功能
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/enable_disable_assessment
    */
    enableDisableAssessmentCorehrProbation(params: EnableDisableAssessmentCorehrProbationRequest): Promise<BaseResponse>
    /**
    * 新增试用期考核信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/create
    */
    createCorehrProbationAssessment(params: CreateCorehrProbationAssessmentRequest, query?: CreateCorehrProbationAssessmentQuery): Promise<CreateCorehrProbationAssessmentResponse>
    /**
    * 更新试用期考核信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/patch
    */
    patchCorehrProbationAssessment(assessment_id: string, params: PatchCorehrProbationAssessmentRequest, query?: PatchCorehrProbationAssessmentQuery): Promise<BaseResponse>
    /**
    * 删除试用期考核信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/delete
    */
    deleteCorehrProbationAssessment(assessment_id: string): Promise<BaseResponse>
    /**
    * 获取异动原因列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_reason/query
    */
    queryCorehrTransferReason(query?: QueryCorehrTransferReasonQuery): Promise<QueryCorehrTransferReasonResponse>
    /**
    * 获取异动类型列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_type/query
    */
    queryCorehrTransferType(query?: QueryCorehrTransferTypeQuery): Promise<QueryCorehrTransferTypeResponse>
    /**
    * 发起员工异动
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_change/create
    */
    createCorehrJobChange(params: CreateCorehrJobChangeRequest, query?: CreateCorehrJobChangeQuery): Promise<CreateCorehrJobChangeResponse>
    /**
    * 搜索员工异动信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/search
    */
    searchCorehrJobChange(params: SearchCorehrJobChangeRequest, query?: SearchCorehrJobChangeQuery): Promise<SearchCorehrJobChangeResponse>
    /**
    * 查询员工离职原因列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query
    */
    queryCorehrOffboarding(params: QueryCorehrOffboardingRequest): Promise<QueryCorehrOffboardingResponse>
    /**
    * 操作员工离职
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/submit
    */
    submitCorehrOffboarding(params: SubmitCorehrOffboardingRequest, query?: SubmitCorehrOffboardingQuery): Promise<SubmitCorehrOffboardingResponse>
    /**
    * 搜索离职信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/search
    */
    searchCorehrOffboarding(params: SearchCorehrOffboardingRequest, query?: SearchCorehrOffboardingQuery): Promise<SearchCorehrOffboardingResponse>
    /**
    * 创建假期发放记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/create
    */
    createCorehrLeaveGrantingRecord(params: CreateCorehrLeaveGrantingRecordRequest, query?: CreateCorehrLeaveGrantingRecordQuery): Promise<CreateCorehrLeaveGrantingRecordResponse>
    /**
    * 删除假期发放记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/delete
    */
    deleteCorehrLeaveGrantingRecord(leave_granting_record_id: string): Promise<BaseResponse>
    /**
    * 获取假期类型列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_types
    */
    leaveTypesCorehrLeave(query?: LeaveTypesCorehrLeaveQuery): Promise<LeaveTypesCorehrLeaveResponse>
    /**
    * 批量查询员工假期余额
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_balances
    */
    leaveBalancesCorehrLeave(query?: LeaveBalancesCorehrLeaveQuery): Promise<LeaveBalancesCorehrLeaveResponse>
    /**
    * 批量查询员工请假记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_request_history
    */
    leaveRequestHistoryCorehrLeave(query?: LeaveRequestHistoryCorehrLeaveQuery): Promise<LeaveRequestHistoryCorehrLeaveResponse>
    /**
    * 查询员工 HRBP / 属地 BP
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-bp/batch_get
    */
    batchGetCorehrEmployeesBp(params: BatchGetCorehrEmployeesBpRequest, query?: BatchGetCorehrEmployeesBpQuery): Promise<BatchGetCorehrEmployeesBpResponse>
    /**
    * 查询部门 HRBP
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/get_by_department
    */
    getByDepartmentCorehrBp(params: GetByDepartmentCorehrBpRequest, query?: GetByDepartmentCorehrBpQuery): Promise<GetByDepartmentCorehrBpResponse>
    /**
    * 获取 HRBP 列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/list
    */
    listCorehrBp(query?: ListCorehrBpQuery): Promise<ListCorehrBpResponse>
    /**
    * 查询部门 / 地点的 HRBP / 属地 BP
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/query
    */
    queryCorehrSecurityGroup(params: QueryCorehrSecurityGroupRequest, query?: QueryCorehrSecurityGroupQuery): Promise<QueryCorehrSecurityGroupResponse>
    /**
    * 获取组织类角色授权列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/assigned_user/search
    */
    searchCorehrAssignedUser(params: SearchCorehrAssignedUserRequest, query?: SearchCorehrAssignedUserQuery): Promise<SearchCorehrAssignedUserResponse>
    /**
    * 批量获取角色列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/list
    */
    listCorehrSecurityGroup(query?: ListCorehrSecurityGroupQuery): Promise<ListCorehrSecurityGroupResponse>
    /**
    * 查询流程实例列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/list
    */
    listCorehrProcess(query?: ListCorehrProcessQuery): Promise<ListCorehrProcessResponse>
    /**
    * 获取单个流程详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/get
    */
    getCorehrProcess(process_id: string, query?: GetCorehrProcessQuery): Promise<GetCorehrProcessResponse>
    /**
    * 获取流程表单数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/process-form_variable_data/get
    */
    getCorehrProcessFormVariableData(process_id: string): Promise<GetCorehrProcessFormVariableDataResponse>
    /**
    * 获取员工薪资标准
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/compensation_standard/match
    */
    matchCorehrCompensationStandard(query?: MatchCorehrCompensationStandardQuery): Promise<MatchCorehrCompensationStandardResponse>
    /**
    * 新建职位
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_create
    */
    combinedCreateHireJob(params: CombinedCreateHireJobRequest, query?: CombinedCreateHireJobQuery): Promise<CombinedCreateHireJobResponse>
    /**
    * 获取职位信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get
    */
    getHireJob(job_id: string, query?: GetHireJobQuery): Promise<GetHireJobResponse>
    /**
    * 获取职位设置
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/config
    */
    configHireJob(job_id: string, query?: ConfigHireJobQuery): Promise<ConfigHireJobResponse>
    /**
    * 获取职位列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/list
    */
    listHireJob(query?: ListHireJobQuery): Promise<ListHireJobResponse>
    /**
    * 更新职位
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_update
    */
    combinedUpdateHireJob(job_id: string, params: CombinedUpdateHireJobRequest, query?: CombinedUpdateHireJobQuery): Promise<CombinedUpdateHireJobResponse>
    /**
    * 更新职位设置
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/update_config
    */
    updateConfigHireJob(job_id: string, params: UpdateConfigHireJobRequest, query?: UpdateConfigHireJobQuery): Promise<UpdateConfigHireJobResponse>
    /**
    * 获取职位类别列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_type/list
    */
    listHireJobType(query?: ListHireJobTypeQuery): Promise<ListHireJobTypeResponse>
    /**
    * 获取职位上的招聘人员信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/recruiter
    */
    recruiterHireJob(job_id: string, query?: RecruiterHireJobQuery): Promise<RecruiterHireJobResponse>
    /**
    * 创建招聘需求
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/create
    */
    createHireJobRequirement(params: CreateHireJobRequirementRequest, query?: CreateHireJobRequirementQuery): Promise<CreateHireJobRequirementResponse>
    /**
    * 获取招聘需求列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list
    */
    listHireJobRequirement(query?: ListHireJobRequirementQuery): Promise<ListHireJobRequirementResponse>
    /**
    * 更新招聘需求
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/update
    */
    updateHireJobRequirement(job_requirement_id: string, params: UpdateHireJobRequirementRequest, query?: UpdateHireJobRequirementQuery): Promise<BaseResponse>
    /**
    * 删除招聘需求
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/delete
    */
    deleteHireJobRequirement(job_requirement_id: string): Promise<BaseResponse>
    /**
    * 获取招聘需求模板
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement_schema/list
    */
    listHireJobRequirementSchema(query?: ListHireJobRequirementSchemaQuery): Promise<ListHireJobRequirementSchemaResponse>
    /**
    * 获取招聘流程信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_process/list
    */
    listHireJobProcess(query?: ListHireJobProcessQuery): Promise<ListHireJobProcessResponse>
    /**
    * 获取信息登记表模板列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/registration_schema/list
    */
    listHireRegistrationSchema(query?: ListHireRegistrationSchemaQuery): Promise<ListHireRegistrationSchemaResponse>
    /**
    * 获取内推官网下的职位列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/list
    */
    listHireReferralWebsiteJobPost(query?: ListHireReferralWebsiteJobPostQuery): Promise<ListHireReferralWebsiteJobPostResponse>
    /**
    * 获取内推官网下职位广告详情
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/get
    */
    getHireReferralWebsiteJobPost(job_post_id: string, query?: GetHireReferralWebsiteJobPostQuery): Promise<GetHireReferralWebsiteJobPostResponse>
    /**
    * 获取内推信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/get_by_application
    */
    getByApplicationHireReferral(query?: GetByApplicationHireReferralQuery): Promise<GetByApplicationHireReferralResponse>
    /**
    * 创建外部投递
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/create
    */
    createHireExternalApplication(params: CreateHireExternalApplicationRequest): Promise<CreateHireExternalApplicationResponse>
    /**
    * 更新外部投递
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/update
    */
    updateHireExternalApplication(external_application_id: string, params: UpdateHireExternalApplicationRequest): Promise<UpdateHireExternalApplicationResponse>
    /**
    * 删除外部投递
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/delete
    */
    deleteHireExternalApplication(external_application_id: string, query?: DeleteHireExternalApplicationQuery): Promise<DeleteHireExternalApplicationResponse>
    /**
    * 创建外部面试
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/create
    */
    createHireExternalInterview(params: CreateHireExternalInterviewRequest): Promise<CreateHireExternalInterviewResponse>
    /**
    * 创建外部面评
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/create
    */
    createHireExternalInterviewAssessment(params: CreateHireExternalInterviewAssessmentRequest): Promise<CreateHireExternalInterviewAssessmentResponse>
    /**
    * 创建外部背调
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/create
    */
    createHireExternalBackgroundCheck(params: CreateHireExternalBackgroundCheckRequest): Promise<CreateHireExternalBackgroundCheckResponse>
    /**
    * 将人才加入指定文件夹
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/add_to_folder
    */
    addToFolderHireTalent(params: AddToFolderHireTalentRequest): Promise<AddToFolderHireTalentResponse>
    /**
    * 获取人才文件夹信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_folder/list
    */
    listHireTalentFolder(query?: ListHireTalentFolderQuery): Promise<ListHireTalentFolderResponse>
    /**
    * 通过手机号或邮箱获取人才 ID
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/batch_get_id
    */
    batchGetIdHireTalent(params: BatchGetIdHireTalentRequest): Promise<BatchGetIdHireTalentResponse>
    /**
    * 获取人才列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/list
    */
    listHireTalent(query?: ListHireTalentQuery): Promise<ListHireTalentResponse>
    /**
    * 获取人才字段
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query
    */
    queryHireTalentObject(): Promise<QueryHireTalentObjectResponse>
    /**
    * 获取人才信息 V1
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/get
    */
    getHireTalent(talent_id: string, query?: GetHireTalentQuery): Promise<GetHireTalentResponse>
    /**
    * 创建投递
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/create
    */
    createHireApplication(params: CreateHireApplicationRequest): Promise<CreateHireApplicationResponse>
    /**
    * 终止投递
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/terminate
    */
    terminateHireApplication(application_id: string, params: TerminateHireApplicationRequest): Promise<BaseResponse>
    /**
    * 获取投递信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get
    */
    getHireApplication(application_id: string): Promise<GetHireApplicationResponse>
    /**
    * 获取投递列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/list
    */
    listHireApplication(query?: ListHireApplicationQuery): Promise<ListHireApplicationResponse>
    /**
    * 获取简历评估信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation/list
    */
    listHireEvaluation(query?: ListHireEvaluationQuery): Promise<ListHireEvaluationResponse>
    /**
    * 获取面试满意度问卷列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/questionnaire/list
    */
    listHireQuestionnaire(query?: ListHireQuestionnaireQuery): Promise<ListHireQuestionnaireResponse>
    /**
    * 获取面试信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/list
    */
    listHireInterview(query?: ListHireInterviewQuery): Promise<ListHireInterviewResponse>
    /**
    * 创建 Offer
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/create
    */
    createHireOffer(params: CreateHireOfferRequest, query?: CreateHireOfferQuery): Promise<CreateHireOfferResponse>
    /**
    * 更新 Offer 信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/update
    */
    updateHireOffer(offer_id: string, params: UpdateHireOfferRequest, query?: UpdateHireOfferQuery): Promise<BaseResponse>
    /**
    * 获取 Offer 信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/offer
    */
    offerHireApplication(application_id: string, query?: OfferHireApplicationQuery): Promise<OfferHireApplicationResponse>
    /**
    * 获取 Offer 详情
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/get
    */
    getHireOffer(offer_id: string, query?: GetHireOfferQuery): Promise<GetHireOfferResponse>
    /**
    * 获取 Offer 列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/list
    */
    listHireOffer(query?: ListHireOfferQuery): Promise<ListHireOfferResponse>
    /**
    * 更新 Offer 状态
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/offer_status
    */
    offerStatusHireOffer(offer_id: string, params: OfferStatusHireOfferRequest): Promise<BaseResponse>
    /**
    * 更新实习 Offer 入/离职状态
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/intern_offer_status
    */
    internOfferStatusHireOffer(offer_id: string, params: InternOfferStatusHireOfferRequest): Promise<InternOfferStatusHireOfferResponse>
    /**
    * 更新 e-HR 导入任务结果
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/ehr_import_task/patch
    */
    patchHireEhrImportTask(ehr_import_task_id: string, params: PatchHireEhrImportTaskRequest): Promise<BaseResponse>
    /**
    * 操作候选人入职
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_onboard
    */
    transferOnboardHireApplication(application_id: string, params: TransferOnboardHireApplicationRequest, query?: TransferOnboardHireApplicationQuery): Promise<TransferOnboardHireApplicationResponse>
    /**
    * 更新入职状态
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/patch
    */
    patchHireEmployee(employee_id: string, params: PatchHireEmployeeRequest, query?: PatchHireEmployeeQuery): Promise<PatchHireEmployeeResponse>
    /**
    * 通过投递 ID 获取入职信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get_by_application
    */
    getByApplicationHireEmployee(query?: GetByApplicationHireEmployeeQuery): Promise<GetByApplicationHireEmployeeResponse>
    /**
    * 通过员工 ID 获取入职信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get
    */
    getHireEmployee(employee_id: string, query?: GetHireEmployeeQuery): Promise<GetHireEmployeeResponse>
    /**
    * 创建备注
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/create
    */
    createHireNote(params: CreateHireNoteRequest, query?: CreateHireNoteQuery): Promise<CreateHireNoteResponse>
    /**
    * 更新备注
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/patch
    */
    patchHireNote(note_id: string, params: PatchHireNoteRequest, query?: PatchHireNoteQuery): Promise<PatchHireNoteResponse>
    /**
    * 获取备注
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/get
    */
    getHireNote(note_id: string, query?: GetHireNoteQuery): Promise<GetHireNoteResponse>
    /**
    * 获取备注列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/list
    */
    listHireNote(query?: ListHireNoteQuery): Promise<ListHireNoteResponse>
    /**
    * 获取简历来源列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/resume_source/list
    */
    listHireResumeSource(query?: ListHireResumeSourceQuery): Promise<ListHireResumeSourceResponse>
    /**
    * 创建账号自定义字段
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/create
    */
    createHireEcoAccountCustomField(params: CreateHireEcoAccountCustomFieldRequest): Promise<BaseResponse>
    /**
    * 更新账号自定义字段
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_update
    */
    batchUpdateHireEcoAccountCustomField(params: BatchUpdateHireEcoAccountCustomFieldRequest): Promise<BaseResponse>
    /**
    * 删除账号自定义字段
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_delete
    */
    batchDeleteHireEcoAccountCustomField(params: BatchDeleteHireEcoAccountCustomFieldRequest): Promise<BaseResponse>
    /**
    * 推送背调自定义字段
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/create
    */
    createHireEcoBackgroundCheckCustomField(params: CreateHireEcoBackgroundCheckCustomFieldRequest): Promise<BaseResponse>
    /**
    * 更新背调自定义字段
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_update
    */
    batchUpdateHireEcoBackgroundCheckCustomField(params: BatchUpdateHireEcoBackgroundCheckCustomFieldRequest): Promise<BaseResponse>
    /**
    * 删除背调自定义字段
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_delete
    */
    batchDeleteHireEcoBackgroundCheckCustomField(params: BatchDeleteHireEcoBackgroundCheckCustomFieldRequest): Promise<BaseResponse>
    /**
    * 创建背调套餐和附加调查项
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/create
    */
    createHireEcoBackgroundCheckPackage(params: CreateHireEcoBackgroundCheckPackageRequest): Promise<BaseResponse>
    /**
    * 更新背调套餐和附加调查项
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_update
    */
    batchUpdateHireEcoBackgroundCheckPackage(params: BatchUpdateHireEcoBackgroundCheckPackageRequest): Promise<BaseResponse>
    /**
    * 删除背调套餐和附加调查项
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_delete
    */
    batchDeleteHireEcoBackgroundCheckPackage(params: BatchDeleteHireEcoBackgroundCheckPackageRequest): Promise<BaseResponse>
    /**
    * 更新背调订单进度
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_progress
    */
    updateProgressHireEcoBackgroundCheck(params: UpdateProgressHireEcoBackgroundCheckRequest): Promise<BaseResponse>
    /**
    * 回传背调订单的最终结果
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_result
    */
    updateResultHireEcoBackgroundCheck(params: UpdateResultHireEcoBackgroundCheckRequest): Promise<BaseResponse>
    /**
    * 终止背调订单
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/cancel
    */
    cancelHireEcoBackgroundCheck(params: CancelHireEcoBackgroundCheckRequest): Promise<BaseResponse>
    /**
    * 推送试卷列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/create
    */
    createHireEcoExamPaper(params: CreateHireEcoExamPaperRequest): Promise<BaseResponse>
    /**
    * 更新试卷
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_update
    */
    batchUpdateHireEcoExamPaper(params: BatchUpdateHireEcoExamPaperRequest): Promise<BaseResponse>
    /**
    * 删除试卷
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_delete
    */
    batchDeleteHireEcoExamPaper(params: BatchDeleteHireEcoExamPaperRequest): Promise<BaseResponse>
    /**
    * 回传笔试安排结果
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/login_info
    */
    loginInfoHireEcoExam(exam_id: string, params: LoginInfoHireEcoExamRequest): Promise<BaseResponse>
    /**
    * 回传笔试结果
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/update_result
    */
    updateResultHireEcoExam(exam_id: string, params: UpdateResultHireEcoExamRequest): Promise<BaseResponse>
    /**
    * 注册外部系统内推账户
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/create
    */
    createHireReferralAccount(params: CreateHireReferralAccountRequest): Promise<CreateHireReferralAccountResponse>
    /**
    * 停用外部系统内推账户
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/deactivate
    */
    deactivateHireReferralAccount(referral_account_id: string): Promise<DeactivateHireReferralAccountResponse>
    /**
    * 全额提取内推账号余额
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/withdraw
    */
    withdrawHireReferralAccount(referral_account_id: string, params: WithdrawHireReferralAccountRequest): Promise<WithdrawHireReferralAccountResponse>
    /**
    * 内推账号提现对账接口
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/reconciliation
    */
    reconciliationHireReferralAccount(params: ReconciliationHireReferralAccountRequest): Promise<ReconciliationHireReferralAccountResponse>
    /**
    * 获取附件信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/get
    */
    getHireAttachment(attachment_id: string, query?: GetHireAttachmentQuery): Promise<GetHireAttachmentResponse>
    /**
    * 获取附件预览信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/preview
    */
    previewHireAttachment(attachment_id: string): Promise<PreviewHireAttachmentResponse>
    /**
    * 创建 OKR 周期
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/create
    */
    createOkrPeriod(params: CreateOkrPeriodRequest): Promise<CreateOkrPeriodResponse>
    /**
    * 修改 OKR 周期状态
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/patch
    */
    patchOkrPeriod(period_id: string, params: PatchOkrPeriodRequest): Promise<PatchOkrPeriodResponse>
    /**
    * 获取 OKR 周期列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/list
    */
    listOkrPeriod(query?: ListOkrPeriodQuery): Promise<ListOkrPeriodResponse>
    /**
    * 获取 OKR 周期规则
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period_rule/list
    */
    listOkrPeriodRule(): Promise<ListOkrPeriodRuleResponse>
    /**
    * 获取用户的 OKR 列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/user-okr/list
    */
    listOkrUserOkr(user_id: string, query?: ListOkrUserOkrQuery): Promise<ListOkrUserOkrResponse>
    /**
    * 批量获取 OKR
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/okr/batch_get
    */
    batchGetOkr(query?: BatchGetOkrQuery): Promise<BatchGetOkrResponse>
    /**
    * 创建 OKR 进展记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/create
    */
    createOkrProgressRecord(params: CreateOkrProgressRecordRequest, query?: CreateOkrProgressRecordQuery): Promise<CreateOkrProgressRecordResponse>
    /**
    * 删除 OKR 进展记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/delete
    */
    deleteOkrProgressRecord(progress_id: string): Promise<BaseResponse>
    /**
    * 更新 OKR 进展记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/update
    */
    updateOkrProgressRecord(progress_id: string, params: UpdateOkrProgressRecordRequest, query?: UpdateOkrProgressRecordQuery): Promise<UpdateOkrProgressRecordResponse>
    /**
    * 获取 OKR 进展记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/get
    */
    getOkrProgressRecord(progress_id: string, query?: GetOkrProgressRecordQuery): Promise<GetOkrProgressRecordResponse>
    /**
    * 上传进展记录图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/image/upload
    */
    uploadOkrImage(form: FormData): Promise<UploadOkrImageResponse>
    /**
    * 录入身份信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/human_authentication-v1/identity/create
    */
    createHumanAuthenticationIdentity(params: CreateHumanAuthenticationIdentityRequest, query?: CreateHumanAuthenticationIdentityQuery): Promise<CreateHumanAuthenticationIdentityResponse>
    /**
    * 删除访客
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/visitor/delete
    */
    deleteAcsVisitor(visitor_id: string, query?: DeleteAcsVisitorQuery): Promise<BaseResponse>
    /**
    * 添加访客
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/visitor/create
    */
    createAcsVisitor(params: CreateAcsVisitorRequest, query?: CreateAcsVisitorQuery): Promise<CreateAcsVisitorResponse>
    /**
    * 设备绑定权限组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/device_bind
    */
    deviceBindAcsRuleExternal(params: DeviceBindAcsRuleExternalRequest): Promise<BaseResponse>
    /**
    * 获取权限组信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/get
    */
    getAcsRuleExternal(query?: GetAcsRuleExternalQuery): Promise<GetAcsRuleExternalResponse>
    /**
    * 删除权限组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/delete
    */
    deleteAcsRuleExternal(query?: DeleteAcsRuleExternalQuery): Promise<BaseResponse>
    /**
    * 创建或更新权限组
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/create
    */
    createAcsRuleExternal(params: CreateAcsRuleExternalRequest, query?: CreateAcsRuleExternalQuery): Promise<CreateAcsRuleExternalResponse>
    /**
    * 修改用户部分信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/patch
    */
    patchAcsUser(user_id: string, params: PatchAcsUserRequest, query?: PatchAcsUserQuery): Promise<BaseResponse>
    /**
    * 获取单个用户信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/get
    */
    getAcsUser(user_id: string, query?: GetAcsUserQuery): Promise<GetAcsUserResponse>
    /**
    * 获取用户列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/list
    */
    listAcsUser(query?: ListAcsUserQuery): Promise<ListAcsUserResponse>
    /**
    * 上传人脸图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/update
    */
    updateAcsUserFace(user_id: string, form: FormData, query?: UpdateAcsUserFaceQuery): Promise<BaseResponse>
    /**
    * 下载人脸图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/get
    */
    getAcsUserFace(user_id: string, query?: GetAcsUserFaceQuery): Promise<Buffer>
    /**
    * 获取门禁设备列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/device/list
    */
    listAcsDevice(): Promise<ListAcsDeviceResponse>
    /**
    * 获取门禁记录列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record/list
    */
    listAcsAccessRecord(query?: ListAcsAccessRecordQuery): Promise<ListAcsAccessRecordResponse>
    /**
    * 下载开门时的人脸识别图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record-access_photo/get
    */
    getAcsAccessRecordAccessPhoto(access_record_id: string): Promise<Buffer>
    /**
    * 获取周期
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/semester/list
    */
    listPerformanceSemester(query?: ListPerformanceSemesterQuery): Promise<ListPerformanceSemesterResponse>
    /**
    * 获取周期任务（指定用户）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_user_list
    */
    findByUserListPerformanceStageTask(params: FindByUserListPerformanceStageTaskRequest, query?: FindByUserListPerformanceStageTaskQuery): Promise<FindByUserListPerformanceStageTaskResponse>
    /**
    * 获取周期任务（全部用户）
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_page
    */
    findByPagePerformanceStageTask(params: FindByPagePerformanceStageTaskRequest, query?: FindByPagePerformanceStageTaskQuery): Promise<FindByPagePerformanceStageTaskResponse>
    /**
    * 获取绩效结果
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/review_data/query
    */
    queryPerformanceReviewData(params: QueryPerformanceReviewDataRequest, query?: QueryPerformanceReviewDataQuery): Promise<QueryPerformanceReviewDataResponse>
    /**
    * 创建草稿
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/draft/create
    */
    createLingoDraft(params: CreateLingoDraftRequest, query?: CreateLingoDraftQuery): Promise<CreateLingoDraftResponse>
    /**
    * 更新草稿
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/draft/update
    */
    updateLingoDraft(draft_id: string, params: UpdateLingoDraftRequest, query?: UpdateLingoDraftQuery): Promise<UpdateLingoDraftResponse>
    /**
    * 创建免审词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/create
    */
    createLingoEntity(params: CreateLingoEntityRequest, query?: CreateLingoEntityQuery): Promise<CreateLingoEntityResponse>
    /**
    * 更新免审词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/update
    */
    updateLingoEntity(entity_id: string, params: UpdateLingoEntityRequest, query?: UpdateLingoEntityQuery): Promise<UpdateLingoEntityResponse>
    /**
    * 删除免审词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/delete
    */
    deleteLingoEntity(entity_id: string, query?: DeleteLingoEntityQuery): Promise<BaseResponse>
    /**
    * 获取词条详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/get
    */
    getLingoEntity(entity_id: string, query?: GetLingoEntityQuery): Promise<GetLingoEntityResponse>
    /**
    * 获取词条列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/list
    */
    listLingoEntity(query?: ListLingoEntityQuery): Promise<ListLingoEntityResponse>
    /**
    * 精准搜索词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/match
    */
    matchLingoEntity(params: MatchLingoEntityRequest, query?: MatchLingoEntityQuery): Promise<MatchLingoEntityResponse>
    /**
    * 模糊搜索词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/search
    */
    searchLingoEntity(params: SearchLingoEntityRequest, query?: SearchLingoEntityQuery): Promise<SearchLingoEntityResponse>
    /**
    * 词条高亮
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/highlight
    */
    highlightLingoEntity(params: HighlightLingoEntityRequest): Promise<HighlightLingoEntityResponse>
    /**
    * 获取词典分类
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/classification/list
    */
    listLingoClassification(query?: ListLingoClassificationQuery): Promise<ListLingoClassificationResponse>
    /**
    * 获取词库列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/repo/list
    */
    listLingoRepo(): Promise<ListLingoRepoResponse>
    /**
    * 上传图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/file/upload
    */
    uploadLingoFile(form: FormData): Promise<UploadLingoFileResponse>
    /**
    * 下载图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/file/download
    */
    downloadLingoFile(file_token: string): Promise<Buffer>
    /**
    * 获取OpenAPI审计日志数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v1/openapi_log/list_data
    */
    listDataSecurityAndComplianceOpenapiLog(params: ListDataSecurityAndComplianceOpenapiLogRequest): Promise<ListDataSecurityAndComplianceOpenapiLogResponse>
    /**
    * 获取行为审计日志数据
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uQjM5YjL0ITO24CNykjN/audit_log/audit_data_get
    */
    listAdminAuditInfo(query?: ListAdminAuditInfoQuery): Promise<ListAdminAuditInfoResponse>
    /**
    * 获取妙记统计数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-statistics/get
    */
    getMinutesMinuteStatistics(minute_token: string, query?: GetMinutesMinuteStatisticsQuery): Promise<GetMinutesMinuteStatisticsResponse>
    /**
    * 获取妙记信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute/get
    */
    getMinutesMinute(minute_token: string, query?: GetMinutesMinuteQuery): Promise<GetMinutesMinuteResponse>
    /**
    * 获取工作台访问数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_access_data/search
    */
    searchWorkplaceWorkplaceAccessData(query?: SearchWorkplaceWorkplaceAccessDataQuery): Promise<SearchWorkplaceWorkplaceAccessDataResponse>
    /**
    * 获取定制工作台访问数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/custom_workplace_access_data/search
    */
    searchWorkplaceCustomWorkplaceAccessData(query?: SearchWorkplaceCustomWorkplaceAccessDataQuery): Promise<SearchWorkplaceCustomWorkplaceAccessDataResponse>
    /**
    * 获取定制工作台小组件访问数据
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_block_access_data/search
    */
    searchWorkplaceWorkplaceBlockAccessData(query?: SearchWorkplaceWorkplaceBlockAccessDataQuery): Promise<SearchWorkplaceWorkplaceBlockAccessDataResponse>
    /**
    * 获取用户自定义常用的应用
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v5/application/favourite
    */
    favouriteApplication(query?: FavouriteApplicationQuery): Promise<FavouriteApplicationResponse>
    /**
    * 获取管理员推荐的应用
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v5/application/recommend
    */
    recommendApplication(query?: RecommendApplicationQuery): Promise<RecommendApplicationResponse>
    /**
    * 获取当前设置的推荐规则列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_recommend_rule/list
    */
    listApplicationAppRecommendRule(query?: ListApplicationAppRecommendRuleQuery): Promise<ListApplicationAppRecommendRuleResponse>
    /**
    * 用户数据维度绑定
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/bind
    */
    bindMdmUserAuthDataRelation(params: BindMdmUserAuthDataRelationRequest, query?: BindMdmUserAuthDataRelationQuery): Promise<BaseResponse>
    /**
    * 用户数据维度解绑
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/unbind
    */
    unbindMdmUserAuthDataRelation(params: UnbindMdmUserAuthDataRelationRequest, query?: UnbindMdmUserAuthDataRelationQuery): Promise<BaseResponse>
    /**
    * 查询规则
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule/query
    */
    queryReportRule(query?: QueryReportRuleQuery): Promise<QueryReportRuleResponse>
    /**
    * 移除规则看板
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule-view/remove
    */
    removeReportRuleView(rule_id: string, params: RemoveReportRuleViewRequest, query?: RemoveReportRuleViewQuery): Promise<BaseResponse>
    /**
    * 查询任务
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/task/query
    */
    queryReportTask(params: QueryReportTaskRequest, query?: QueryReportTaskQuery): Promise<QueryReportTaskResponse>
    /**
    * 获取 user_access_token
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/access_token/create
    */
    createAuthenAccessToken(params: CreateAuthenAccessTokenRequest): Promise<CreateAuthenAccessTokenResponse>
    /**
    * 刷新 user_access_token
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/refresh_access_token/create
    */
    createAuthenRefreshAccessToken(params: CreateAuthenRefreshAccessTokenRequest): Promise<CreateAuthenRefreshAccessTokenResponse>
    /**
    * 创建草稿
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/create
    */
    createBaikeDraft(params: CreateBaikeDraftRequest, query?: CreateBaikeDraftQuery): Promise<CreateBaikeDraftResponse>
    /**
    * 更新草稿
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/update
    */
    updateBaikeDraft(draft_id: string, params: UpdateBaikeDraftRequest, query?: UpdateBaikeDraftQuery): Promise<UpdateBaikeDraftResponse>
    /**
    * 创建免审词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/create
    */
    createBaikeEntity(params: CreateBaikeEntityRequest, query?: CreateBaikeEntityQuery): Promise<CreateBaikeEntityResponse>
    /**
    * 更新免审词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/update
    */
    updateBaikeEntity(entity_id: string, params: UpdateBaikeEntityRequest, query?: UpdateBaikeEntityQuery): Promise<UpdateBaikeEntityResponse>
    /**
    * 获取词条详情
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/get
    */
    getBaikeEntity(entity_id: string, query?: GetBaikeEntityQuery): Promise<GetBaikeEntityResponse>
    /**
    * 获取词条列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/list
    */
    listBaikeEntity(query?: ListBaikeEntityQuery): Promise<ListBaikeEntityResponse>
    /**
    * 精准搜索词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/match
    */
    matchBaikeEntity(params: MatchBaikeEntityRequest): Promise<MatchBaikeEntityResponse>
    /**
    * 模糊搜索词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/search
    */
    searchBaikeEntity(params: SearchBaikeEntityRequest, query?: SearchBaikeEntityQuery): Promise<SearchBaikeEntityResponse>
    /**
    * 词条高亮
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/highlight
    */
    highlightBaikeEntity(params: HighlightBaikeEntityRequest): Promise<HighlightBaikeEntityResponse>
    /**
    * 提取潜在的词条
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/extract
    */
    extractBaikeEntity(params: ExtractBaikeEntityRequest): Promise<ExtractBaikeEntityResponse>
    /**
    * 获取词典分类
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/classification/list
    */
    listBaikeClassification(query?: ListBaikeClassificationQuery): Promise<ListBaikeClassificationResponse>
    /**
    * 上传图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/upload
    */
    uploadBaikeFile(form: FormData): Promise<UploadBaikeFileResponse>
    /**
    * 下载图片
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/download
    */
    downloadBaikeFile(file_token: string): Promise<Buffer>
    /**
    * 获取用户列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/list
    */
    listContactUser(query?: ListContactUserQuery): Promise<ListContactUserResponse>
    /**
    * 更新用户所有信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/update
    */
    updateContactUser(user_id: string, params: UpdateContactUserRequest, query?: UpdateContactUserQuery): Promise<UpdateContactUserResponse>
    /**
    * 获取部门信息列表
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/list
    */
    listContactDepartment(query?: ListContactDepartmentQuery): Promise<ListContactDepartmentResponse>
    /**
    * 列出记录
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/list
    */
    listBitableAppTableRecord(app_token: string, table_id: string, query?: ListBitableAppTableRecordQuery): Promise<ListBitableAppTableRecordResponse>
    /**
    * 获取面试记录列表
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application-interview/list
    */
    listHireApplicationInterview(application_id: string, query?: ListHireApplicationInterviewQuery): Promise<ListHireApplicationInterviewResponse>
    /**
    * 获取职位上的招聘人员信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/get
    */
    getHireJobManager(job_id: string, manager_id: string, query?: GetHireJobManagerQuery): Promise<GetHireJobManagerResponse>
    /**
    * 获取 Offer 申请表详细信息
    * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_schema/get
    */
    getHireOfferSchema(offer_schema_id: string): Promise<GetHireOfferSchemaResponse>
    /**
    * 批量查询城市/区域信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/list
    */
    listCorehrSubregion(query?: ListCorehrSubregionQuery): Promise<ListCorehrSubregionResponse>
    /**
    * 查询单条城市/区域信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/get
    */
    getCorehrSubregion(subregion_id: string): Promise<GetCorehrSubregionResponse>
    /**
    * 批量查询省份/行政区信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/list
    */
    listCorehrSubdivision(query?: ListCorehrSubdivisionQuery): Promise<ListCorehrSubdivisionResponse>
    /**
    * 查询单条省份/行政区信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/get
    */
    getCorehrSubdivision(subdivision_id: string): Promise<GetCorehrSubdivisionResponse>
    /**
    * 批量查询国家/地区信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/list
    */
    listCorehrCountryRegion(query?: ListCorehrCountryRegionQuery): Promise<ListCorehrCountryRegionResponse>
    /**
    * 查询单条国家/地区信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/get
    */
    getCorehrCountryRegion(country_region_id: string): Promise<GetCorehrCountryRegionResponse>
    /**
    * 批量查询货币信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/list
    */
    listCorehrCurrency(query?: ListCorehrCurrencyQuery): Promise<ListCorehrCurrencyResponse>
    /**
    * 查询单个货币信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/get
    */
    getCorehrCurrency(currency_id: string): Promise<GetCorehrCurrencyResponse>
    /**
    * 查询单个个人信息
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/get
    */
    getCorehrPerson(person_id: string, query?: GetCorehrPersonQuery): Promise<GetCorehrPersonResponse>
    /**
    * 创建签到板部署码
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set_checkboard_access_code
    */
    setCheckboardAccessCodeVcRoomConfig(params: SetCheckboardAccessCodeVcRoomConfigRequest): Promise<SetCheckboardAccessCodeVcRoomConfigResponse>
    /**
    * 创建会议室部署码
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set_room_access_code
    */
    setRoomAccessCodeVcRoomConfig(params: SetRoomAccessCodeVcRoomConfigRequest): Promise<SetRoomAccessCodeVcRoomConfigResponse>
    /**
    * 查询会议室配置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/query
    */
    queryVcRoomConfig(query?: QueryVcRoomConfigQuery): Promise<QueryVcRoomConfigResponse>
    /**
    * 设置会议室配置
    * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set
    */
    setVcRoomConfig(params: SetVcRoomConfigRequest, query?: SetVcRoomConfigQuery): Promise<BaseResponse>

  }
}

declare module '.' {
  export namespace Lark {
    export type TokenInfo = {
      /** user_access_token，用于获取用户资源和访问某些open api */
      access_token: string
      /** 刷新用户 `access_token` 时使用的 token */
      refresh_token?: string
      /** token 类型，固定值 */
      token_type: string
      /** `access_token`的有效期，单位: 秒，一般是两个小时左右，需要以返回结果为准 */
      expires_in?: number
      /** `refresh_token` 的有效期，单位: 秒，一般是30天左右，需要以返回结果为准 */
      refresh_expires_in?: number
      /** 用户授予app的权限全集 */
      scope?: string
    }
    export type UserInfo = {
      /** 用户姓名 */
      name?: string
      /** 用户英文名称 */
      en_name?: string
      /** 用户头像 */
      avatar_url?: string
      /** 用户头像 72x72 */
      avatar_thumb?: string
      /** 用户头像 240x240 */
      avatar_middle?: string
      /** 用户头像 640x640 */
      avatar_big?: string
      /** 用户在应用内的唯一标识 */
      open_id?: string
      /** 用户统一ID */
      union_id?: string
      /** 用户邮箱 */
      email?: string
      /** 企业邮箱，请先确保已在管理后台启用飞书邮箱服务 */
      enterprise_email?: string
      /** 用户 user_id */
      user_id?: string
      /** 用户手机号 */
      mobile?: string
      /** 当前企业标识 */
      tenant_key?: string
      /** 用户工号 */
      employee_no?: string
    }
    export type MaskSession = {
      /** 创建时间 */
      create_time?: string
      /** 客户端类型 */
      terminal_type?: number
      /** 用户ID */
      user_id?: string
    }
    export type UserOrder = {
      /** 排序信息对应的部门ID */
      department_id?: string
      /** 用户在部门内的排序 */
      user_order?: number
      /** 用户的部门间的排序 */
      department_order?: number
      /** 是否为用户主部门 */
      is_primary_dept?: boolean
    }
    export type CustomAttrGenericUser = {
      /** 用户id */
      id: string
      /** 用户类型 1 User 2 Bot 11 Mail */
      type: number
    }
    export type UserCustomAttrValue = {
      /** 属性文本 */
      text?: string
      /** URL */
      url?: string
      /** PC上的URL */
      pc_url?: string
      /** 选项id，自定义选项和图片此项必填 */
      option_id?: string
      /** 用户信息 */
      generic_user?: Lark.CustomAttrGenericUser
    }
    export type UserCustomAttr = {
      /** 自定义属性类型 */
      type?: string
      /** 自定义属性ID */
      id?: string
      /** 自定义属性取值 */
      value?: Lark.UserCustomAttrValue
    }
    export type AvatarInfo = {
      /** 72*72像素头像链接 */
      avatar_72?: string
      /** 240*240像素头像链接 */
      avatar_240?: string
      /** 640*640像素头像链接 */
      avatar_640?: string
      /** 原始头像链接 */
      avatar_origin?: string
    }
    export type UserStatus = {
      /** 是否冻结 */
      is_frozen?: boolean
      /** 是否离职 */
      is_resigned?: boolean
      /** 是否激活 */
      is_activated?: boolean
      /** 是否主动退出，主动退出一段时间后用户会自动转为已离职 */
      is_exited?: boolean
      /** 是否未加入，需要用户自主确认才能加入团队 */
      is_unjoin?: boolean
    }
    export type User = {
      /** 用户的union_id */
      union_id?: string
      /** 租户内用户的唯一标识 */
      user_id?: string
      /** 用户的open_id */
      open_id?: string
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
      gender?: number
      /** 头像的文件Key */
      avatar_key?: string
      /** 用户头像信息 */
      avatar?: Lark.AvatarInfo
      /** 用户状态 */
      status?: Lark.UserStatus
      /** 用户所属部门的ID列表 */
      department_ids?: string[]
      /** 用户的直接主管的用户ID */
      leader_user_id?: string
      /** 城市 */
      city?: string
      /** 国家 */
      country?: string
      /** 工位 */
      work_station?: string
      /** 入职时间 */
      join_time?: number
      /** 是否是租户超级管理员 */
      is_tenant_manager?: boolean
      /** 工号 */
      employee_no?: string
      /** 员工类型 */
      employee_type?: number
      /** 用户排序信息 */
      orders?: Lark.UserOrder[]
      /** 自定义属性 */
      custom_attrs?: Lark.UserCustomAttr[]
      /** 企业邮箱 */
      enterprise_email?: string
      /** 职务 */
      job_title?: string
      /** 是否冻结用户 */
      is_frozen?: boolean
      /** 数据驻留地 */
      geo?: string
      /** 职级ID */
      job_level_id?: string
      /** 序列ID */
      job_family_id?: string
      /** 虚线上级ID */
      dotted_line_leader_user_ids?: string[]
    }
    export type ResourceAcceptor = {
      /** 资源处理类型 */
      processing_type: string
      /** 转移资源时，资源接收者 */
      acceptor_user_id?: string
    }
    export type UserDepartmentInfo = {
      /** 对应的部门ID */
      department_id: string
      /** 用户在部门内的排序 */
      user_order?: number
      /** 用户的部门间的排序 */
      department_order?: number
    }
    export type ProductI18nName = {
      /** 席位中文名 */
      zh_cn?: string
      /** 席位日文名 */
      ja_jp?: string
      /** 席位英文名 */
      en_us?: string
    }
    export type UserAssignInfo = {
      /** 席位id */
      subscription_id?: string
      /** license_plan_key */
      license_plan_key?: string
      /** 席位名称 */
      product_name?: string
      /** 国际化名称 */
      i18n_name?: Lark.ProductI18nName
      /** 席位起始时间 */
      start_time?: string
      /** 席位结束时间 */
      end_time?: string
    }
    export type DepartmentI18nName = {
      /** 部门的中文名 */
      zh_cn?: string
      /** 部门的日文名 */
      ja_jp?: string
      /** 部门的英文名 */
      en_us?: string
    }
    export type DepartmentPathName = {
      /** 部门名 */
      name?: string
      /** 部门国际化名 */
      i18n_name?: Lark.DepartmentI18nName
    }
    export type DepartmentPath = {
      /** 部门路径IDs */
      department_ids?: string[]
      /** 部门路径名字 */
      department_path_name?: Lark.DepartmentPathName
    }
    export type DepartmentDetail = {
      /** 部门ID */
      department_id?: string
      /** 部门名 */
      department_name?: Lark.DepartmentPathName
      /** 部门路径 */
      department_path?: Lark.DepartmentPath
    }
    export type UserContactInfo = {
      /** 用户id，值为user_id_type所指定的类型。如果查询的手机号、邮箱不存在，或者无权限查看对应的用户，则此项为空。 */
      user_id?: string
      /** 手机号 */
      mobile?: string
      /** 邮箱 */
      email?: string
    }
    export type Group = {
      /** 用户组ID */
      id: string
      /** 用户组名字 */
      name: string
      /** 用户组描述 */
      description?: string
      /** 用户组成员中用户的数量 */
      member_user_count?: number
      /** 用户组成员中部门的数量 */
      member_department_count?: number
      /** 用户组的类型 */
      type?: number
    }
    export type CustomAttrOption = {
      /** 枚举类型选项id */
      id: string
      /** 枚举选项值 */
      value: string
      /** 名称 */
      name?: string
    }
    export type CustomAttrOptions = {
      /** 默认选项id */
      default_option_id?: string
      /** 选项类型 */
      option_type: string
      /** 选项列表 */
      options: Lark.CustomAttrOption[]
    }
    export type I18nContent = {
      /** 语言 */
      locale?: string
      /** i18n内容 */
      value?: string
    }
    export type CustomAttr = {
      /** 自定义字段id */
      id: string
      /** 自定义字段类型 */
      type: string
      /** 选项定义，当type为ENUMERATION或者PICTURE_ENUM时此项有值，列举所有可选项 */
      options?: Lark.CustomAttrOptions
      /** 多语言名称 */
      i18n_name?: Lark.I18nContent[]
    }
    export type EmployeeTypeEnum = {
      /** 枚举值id */
      enum_id?: string
      /** 枚举值 */
      enum_value?: string
      /** 枚举内容 */
      content: string
      /** 类型 */
      enum_type: number
      /** 类型 */
      enum_status: number
      /** i18n定义 */
      i18n_content?: Lark.I18nContent[]
    }
    export type DepartmentLeader = {
      /** 负责人类型 */
      leaderType: number
      /** 负责人ID */
      leaderID: string
    }
    export type DepartmentStatus = {
      /** 是否被删除 */
      is_deleted?: boolean
    }
    export type Department = {
      /** 部门名称 */
      name: string
      /** 国际化的部门名称 */
      i18n_name?: Lark.DepartmentI18nName
      /** 父部门的部门ID */
      parent_department_id: string
      /** 本部门的自定义部门ID */
      department_id?: string
      /** 部门的open_id */
      open_department_id?: string
      /** 部门主管用户ID */
      leader_user_id?: string
      /** 部门群ID */
      chat_id?: string
      /** 部门的排序 */
      order?: string
      /** 部门单位自定义ID列表，当前只支持一个 */
      unit_ids?: string[]
      /** 部门下用户的个数 */
      member_count?: number
      /** 部门状态 */
      status?: Lark.DepartmentStatus
      /** 部门负责人 */
      leaders?: Lark.DepartmentLeader[]
      /** 部门群雇员类型限制 */
      group_chat_employee_types?: number[]
      /** 部门HRBP */
      department_hrbps?: string[]
      /** 部门下主属用户的个数 */
      primary_member_count?: number
    }
    export type UnitDepartment = {
      /** 单位ID */
      unit_id: string
      /** 部门ID */
      department_id: string
    }
    export type Unit = {
      /** 单位的自定义ID */
      unit_id: string
      /** 单位的名字 */
      name: string
      /** 单位的类型 */
      unit_type: string
    }
    export type Memberlist = {
      /** 成员ID */
      member_id: string
      /** 用户组成员的类型，目前取值为 user。未来将支持department */
      member_type: string
      /** 成员ID类别，仅请求参数中有效 */
      member_id_type?: string
    }
    export type MemberResult = {
      /** 成员ID */
      member_id: string
      /** 结果响应码，0表示成功 */
      code: number
    }
    export type FunctionalRoleMemberResult = {
      /** 用户ID */
      user_id: string
      /** 成员处理结果 */
      reason: number
    }
    export type FunctionalRoleMember = {
      /** 成员ID */
      user_id?: string
      /** 管理范围的类型 */
      scope_type?: string
      /** 表示该角色成员的管理范围，scope_type为“指定范围”时，返回该值 */
      department_ids?: string[]
    }
    export type JobLevel = {
      /** 职级名称 */
      name?: string
      /** 职级描述 */
      description?: string
      /** 职级的排序，可填入自然数100-100000的数值，系统按照数值大小从小到大排序。不填写该字段时，默认新增排序在当前职级列表中最后位（最大值） */
      order?: number
      /** 是否启用 */
      status?: boolean
      /** 职级ID */
      job_level_id?: string
      /** 多语言名称 */
      i18n_name?: Lark.I18nContent[]
      /** 多语言描述 */
      i18n_description?: Lark.I18nContent[]
    }
    export type JobFamily = {
      /** 序列名称。1-100字符，支持中、英文及符号 */
      name?: string
      /** 序列描述，描述序列详情信息 */
      description?: string
      /** 上级序列ID。需是该租户的序列ID列表中的值，对应唯一的序列名称。 */
      parent_job_family_id?: string
      /** 是否启用 */
      status?: boolean
      /** 多语言序列名称 */
      i18n_name?: Lark.I18nContent[]
      /** 多语言描述 */
      i18n_description?: Lark.I18nContent[]
      /** 职级序列ID */
      job_family_id?: string
    }
    export type JobTitle = {
      /** 职务ID */
      job_title_id?: string
      /** 职务名称。1-100字符，支持中、英文及符号 */
      name?: string
      /** 多语言职务名称 */
      i18n_name?: Lark.I18nContent[]
      /** 是否启用 */
      status?: boolean
    }
    export type WorkCity = {
      /** 工作城市ID */
      work_city_id?: string
      /** 工作城市名称。1-100字符，支持中、英文及符号 */
      name?: string
      /** 多语言工作城市 */
      i18n_name?: Lark.I18nContent[]
      /** 是否启用 */
      status?: boolean
    }
    export type Sender = {
      /** 该字段标识发送者的id */
      id: string
      /** 该字段标识发送者的id类型 */
      id_type: string
      /** 该字段标识发送者的类型 */
      sender_type: string
      /** tenant key */
      tenant_key?: string
    }
    export type MessageBody = {
      /** 消息jsonContent */
      content: string
    }
    export type Mention = {
      /** mention key */
      key: string
      /** 用户open id */
      id: string
      /** id 可以是open_id，user_id或者union_id */
      id_type: string
      /** 被at用户的姓名 */
      name: string
      /** tenant key */
      tenant_key?: string
    }
    export type Message = {
      /** 消息id open_message_id */
      message_id?: string
      /** 根消息id open_message_id */
      root_id?: string
      /** 父消息的id open_message_id */
      parent_id?: string
      /** 消息类型 text post card image等等 */
      msg_type?: string
      /** 消息生成的时间戳(毫秒) */
      create_time?: string
      /** 消息更新的时间戳 */
      update_time?: string
      /** 消息是否被撤回 */
      deleted?: boolean
      /** 消息是否被更新 */
      updated?: boolean
      /** 所属的群 */
      chat_id?: string
      /** 发送者，可以是用户或应用 */
      sender?: Lark.Sender
      /** 消息内容,json结构 */
      body?: Lark.MessageBody
      /** 被艾特的人或应用的id */
      mentions?: Lark.Mention[]
      /** 合并消息的上一层级消息id open_message_id */
      upper_message_id?: string
    }
    export type ReadUser = {
      /** 用户id类型 */
      user_id_type: string
      /** 用户id */
      user_id: string
      /** 阅读时间 */
      timestamp: string
      /** tenant key */
      tenant_key?: string
    }
    export type BatchMessageReadUser = {
      /** 已读人数 */
      read_count: string
      /** 总人数 */
      total_count: string
    }
    export type BatchMessageSendProgress = {
      /** 批量请求中有效的userid数量(包含机器人不可见用户) */
      valid_user_ids_count?: number
      /** 已经成功给用户发送成功的消息数量 */
      success_user_ids_count?: number
      /** 已读信息用户数量 */
      read_user_ids_count?: number
    }
    export type BatchMessageRecallProgress = {
      /** 该条批量消息是否被执行过撤回操作 */
      recall?: boolean
      /** 已经成功撤回的消息数量 */
      recall_count?: number
    }
    export type Emoji = {
      /** emoji类型 */
      emoji_type: string
    }
    export type Operator = {
      /** 操作人ID */
      operator_id: string
      /** 操作人身份，用户或应用 */
      operator_type: string
    }
    export type MessageReaction = {
      /** reaction资源ID */
      reaction_id?: string
      /** 添加reaction的操作人 */
      operator?: Lark.Operator
      /** reaction动作的的unix timestamp(单位:ms) */
      action_time?: string
      /** reaction资源类型 */
      reaction_type?: Lark.Emoji
    }
    export type Pin = {
      /** Pin的消息ID */
      message_id: string
      /** Pin消息所在的群聊ID */
      chat_id?: string
      /** Pin的操作人ID */
      operator_id?: string
      /** Pin的操作人ID类型 */
      operator_id_type?: string
      /** Pin的创建时间（毫秒级时间戳） */
      create_time?: string
    }
    export type I18nNames = {
      /** 中文名 */
      zh_cn?: string
      /** 英文名 */
      en_us?: string
      /** 日文名 */
      ja_jp?: string
    }
    export type RestrictedModeSetting = {
      /** 防泄密模式是否开启 */
      status?: boolean
      /** 允许截屏录屏 */
      screenshot_has_permission_setting?: string
      /** 允许下载消息中图片、视频和文件 */
      download_has_permission_setting?: string
      /** 允许复制和转发消息 */
      message_has_permission_setting?: string
    }
    export type ChatTopNotice = {
      /** 置顶的类型 */
      action_type?: string
      /** 消息ID */
      message_id?: string
    }
    export type ListChat = {
      /** 群组ID */
      chat_id?: string
      /** 群头像URL */
      avatar?: string
      /** 群名称 */
      name?: string
      /** 群描述 */
      description?: string
      /** 群主ID */
      owner_id?: string
      /** 群主ID类型 */
      owner_id_type?: string
      /** 是否是外部群 */
      external?: boolean
      /** tenant key */
      tenant_key?: string
    }
    export type ListModerator = {
      /** 可发言用户 ID 类型 */
      user_id_type?: string
      /** 可发言用户 ID */
      user_id?: string
      /** tenant key */
      tenant_key?: string
    }
    export type ListMember = {
      /** member id类型 */
      member_id_type?: string
      /** member id */
      member_id?: string
      /** 名字 */
      name?: string
      /** tenant key */
      tenant_key?: string
    }
    export type ChatTabContent = {
      /** URL类型 */
      url?: string
      /** Doc链接 */
      doc?: string
      /** 会议纪要 */
      meeting_minute?: string
    }
    export type ChatTabConfig = {
      /** 群Tab图标 */
      icon_key?: string
      /** 群tab是否App内嵌打开 */
      is_built_in?: boolean
    }
    export type ChatTab = {
      /** Tab名称 */
      tab_name?: string
      /** Tab类型 */
      tab_type: string
      /** Tab内容 */
      tab_content?: Lark.ChatTabContent
      /** Tab的配置 */
      tab_config?: Lark.ChatTabConfig
    }
    export type ChatMenuItemRedirectLink = {
      common_url?: string
      ios_url?: string
      android_url?: string
      pc_url?: string
      web_url?: string
    }
    export type ChatMenuItem = {
      /** 菜单类型 */
      action_type: string
      /** 跳转链接 */
      redirect_link?: Lark.ChatMenuItemRedirectLink
      /** image_key */
      image_key?: string
      /** 名称 */
      name: string
      /** 国际化名称，一级菜单名称字符数要在1到8范围内，二级菜单名称字符数要在1到24范围内。<br><br>**注意：**<br>1中文=2英文=2其他语言字符=2字符 */
      i18n_names?: Lark.I18nNames
    }
    export type ChatMenuSecondLevel = {
      /** 二级菜单信息 */
      chat_menu_item?: Lark.ChatMenuItem
    }
    export type ChatMenuTopLevel = {
      /** 一级菜单信息 */
      chat_menu_item: Lark.ChatMenuItem
      /** 二级菜单列表 */
      children?: Lark.ChatMenuSecondLevel[]
    }
    export type ChatMenuTree = {
      /** 一级菜单列表 */
      chat_menu_top_levels: Lark.ChatMenuTopLevel[]
    }
    export type ShortcutInfo = {
      /** 快捷方式指向的原文件类型 */
      target_type: string
      /** 快捷方式指向的原文件token */
      target_token: string
    }
    export type File = {
      /** 文件标识符 */
      token: string
      /** 文件名 */
      name: string
      /** 文件类型 */
      type: string
      /** 父文件夹标识 */
      parent_token?: string
      /** 在浏览器中查看的链接 */
      url?: string
      /** 快捷方式文件信息 */
      shortcut_info?: Lark.ShortcutInfo
      /** 文件创建时间 */
      created_time?: string
      /** 文件最近修改时间 */
      modified_time?: string
      /** 文件所有者 */
      owner_id?: string
    }
    export type RequestDoc = {
      /** 文件的 token，获取方式见[概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction) */
      doc_token: string
      /** 文件类型 */
      doc_type: string
    }
    export type Meta = {
      /** 文件token */
      doc_token: string
      /** 文件类型 */
      doc_type: string
      /** 标题 */
      title: string
      /** 文件所有者 */
      owner_id: string
      /** 创建时间（Unix时间戳） */
      create_time: string
      /** 最后编辑者 */
      latest_modify_user: string
      /** 最后编辑时间（Unix时间戳） */
      latest_modify_time: string
      /** 文档链接 */
      url: string
      /** 文档密级标签名称 */
      sec_label_name?: string
    }
    export type MetaFailed = {
      /** 获取元数据失败的文档token */
      token: string
      /** 获取元数据失败的错误码 */
      code: number
    }
    export type FileStatistics = {
      /** 文档历史访问人数，同一人多次访问按一次计算。 */
      uv?: number
      /** 文档历史访问次数，同一人多次访问按多次计算。（注：同一人相邻两次访问间隔在半小时内视为一次访问） */
      pv?: number
      /** 文档历史点赞总数 */
      like_count?: number
      /** 时间戳（秒） */
      timestamp?: number
    }
    export type Property = {
      /** 自定义属性键对象 */
      key: string
      /** 自定义属性值对象 */
      value: string
    }
    export type ReferEntity = {
      /** 快捷方式指向的文档token */
      refer_token: string
      /** 快捷方式指向的文档类型 */
      refer_type: string
    }
    export type TmpDownloadUrl = {
      /** 文件标识符 */
      file_token: string
      /** 文件临时下载链接 */
      tmp_download_url: string
    }
    export type ImportTaskMountPoint = {
      /** 挂载类型 */
      mount_type: number
      /** 挂载位置,对于mount_type=1, 云空间目录token，空表示根目录 */
      mount_key: string
    }
    export type ImportTask = {
      /** 任务ID */
      ticket?: string
      /** 导入目标云文档格式 */
      type: string
      /** 任务状态 */
      job_status?: number
      /** 任务失败原因 */
      job_error_msg?: string
      /** 导入云文档Token */
      token?: string
      /** 导入云文档URL */
      url?: string
      /** 任务成功后的提示信息 */
      extra?: string[]
    }
    export type ExportTask = {
      /** 导出文件扩展名 */
      file_extension: string
      /** 导出文档类型 */
      type: string
      /** 导出文件名 */
      file_name?: string
      /** 导出文件 drive token */
      file_token?: string
      /** 导出文件大小 */
      file_size?: number
      /** 任务失败原因 */
      job_error_msg?: string
      /** 任务状态 */
      job_status?: number
    }
    export type FileViewRecord = {
      /** 访问者 ID */
      viewer_id?: string
      /** 访问者名称 */
      name?: string
      /** 访问者头像 URL */
      avatar_url?: string
      /** 最近访问时间，秒级时间戳 */
      last_view_time?: string
    }
    export type Version = {
      /** 版本文档标题 */
      name?: string
      /** 版本文档版本号 */
      version?: string
      /** 源文档token */
      parent_token?: string
      /** 版本文档所有者id */
      owner_id?: string
      /** 版本文档创建者id */
      creator_id?: string
      /** 版本文档创建时间 */
      create_time?: string
      /** 版本文档更新时间 */
      update_time?: string
      /** 版本文档状态 */
      status?: string
      /** 版本文档类型 */
      obj_type?: string
      /** 源文档类型 */
      parent_type?: string
    }
    export type Member = {
      /** 协作者ID类型 */
      member_type: string
      /** 协作者ID，与协作者ID类型需要对应 */
      member_id: string
      /** 需要增加的权限角色 */
      perm: string
      /** 协作者的类型 */
      type?: string
      /** 协作者的名字 */
      name?: string
      /** 协作者的头像 */
      avatar?: string
      /** 协作者的外部标签 */
      external_label?: boolean
    }
    export type BaseMember = {
      /** 协作者ID类型 */
      member_type: string
      /** 协作者ID，与协作者ID类型需要对应 */
      member_id: string
      /** 需要增加的权限角色 */
      perm: string
    }
    export type PermissionPublic = {
      /** 允许内容被分享到组织外 */
      external_access?: boolean
      /** 谁可以复制内容、创建副本、打印、下载 */
      security_entity?: string
      /** 谁可以评论 */
      comment_entity?: string
      /** 谁可以添加和管理协作者 */
      share_entity?: string
      /** 链接分享设置 */
      link_share_entity?: string
      /** 允许非「可管理权限」的人分享到组织外（仅share_entity=“same_tenant”时有效） */
      invite_external?: boolean
      /** 节点是否已加锁 */
      lock_switch?: boolean
    }
    export type TextRun = {
      /** 回复 普通文本 */
      text: string
    }
    export type DocsLink = {
      /** 回复 at云文档 */
      url: string
    }
    export type Person = {
      /** 回复 at联系人 */
      user_id: string
    }
    export type ReplyElement = {
      /** 回复的内容元素 */
      type: string
      /** 文本内容 */
      text_run?: Lark.TextRun
      /** 文本内容 */
      docs_link?: Lark.DocsLink
      /** 文本内容 */
      person?: Lark.Person
    }
    export type ReplyContent = {
      /** 回复的内容 */
      elements: Lark.ReplyElement[]
    }
    export type ReplyExtra = {
      image_list?: string[]
    }
    export type FileCommentReply = {
      /** 回复ID */
      reply_id?: string
      /** 用户ID */
      user_id?: string
      /** 创建时间 */
      create_time?: number
      /** 更新时间 */
      update_time?: number
      /** 回复内容 */
      content: Lark.ReplyContent
      /** 回复的其他内容，图片token等 */
      extra?: Lark.ReplyExtra
    }
    export type ReplyList = {
      replies: Lark.FileCommentReply[]
    }
    export type FileComment = {
      /** 评论ID */
      comment_id?: string
      /** 用户ID */
      user_id?: string
      /** 创建时间 */
      create_time?: number
      /** 更新时间 */
      update_time?: number
      /** 是否已解决 */
      is_solved?: boolean
      /** 解决评论时间 */
      solved_time?: number
      /** 解决评论者的用户ID */
      solver_user_id?: string
      /** 是否有更多回复 */
      has_more?: boolean
      /** 回复分页标记 */
      page_token?: string
      /** 是否是全文评论 */
      is_whole?: boolean
      /** 如果是局部评论，引用字段 */
      quote?: string
      /** 评论里的回复列表 */
      reply_list?: Lark.ReplyList
    }
    export type Document = {
      /** 文档唯一标识 */
      document_id?: string
      /** 文档版本 ID */
      revision_id?: number
      /** 文档标题 */
      title?: string
    }
    export type TextStyle = {
      /** 对齐方式 */
      align?: number
      /** todo 的完成状态 */
      done?: boolean
      /** 文本的折叠状态 */
      folded?: boolean
      /** 代码块语言 */
      language?: number
      /** 代码块是否自动换行 */
      wrap?: boolean
    }
    export type Link = {
      /** 超链接指向的 url (需要 url_encode) */
      url: string
    }
    export type TextElementStyle = {
      /** 加粗 */
      bold?: boolean
      /** 斜体 */
      italic?: boolean
      /** 删除线 */
      strikethrough?: boolean
      /** 下划线 */
      underline?: boolean
      /** inline 代码 */
      inline_code?: boolean
      /** 背景色 */
      background_color?: number
      /** 字体颜色 */
      text_color?: number
      /** 链接 */
      link?: Lark.Link
      /** 评论 id 列表 */
      comment_ids?: string[]
    }
    export type MentionUser = {
      /** 用户 OpenID */
      user_id: string
      /** 文本局部样式 */
      text_element_style?: Lark.TextElementStyle
    }
    export type MentionDoc = {
      /** 云文档 token */
      token: string
      /** 云文档类型 */
      obj_type: number
      /** 云文档链接（需要 url_encode) */
      url: string
      /** 文档标题，只读属性 */
      title?: string
      /** 文本局部样式 */
      text_element_style?: Lark.TextElementStyle
    }
    export type Reminder = {
      /** 创建者用户 ID */
      create_user_id: string
      /** 是否通知 */
      is_notify?: boolean
      /** 是日期还是整点小时 */
      is_whole_day?: boolean
      /** 事件发生的时间（毫秒级事件戳） */
      expire_time: string
      /** 触发通知的时间（毫秒级时间戳） */
      notify_time: string
      /** 文本局部样式 */
      text_element_style?: Lark.TextElementStyle
    }
    export type InlineFile = {
      /** 附件 token */
      file_token?: string
      /** 当前文档中该附件所处的 block 的 id */
      source_block_id?: string
      /** 文本局部样式 */
      text_element_style?: Lark.TextElementStyle
    }
    export type UndefinedElement = {

    }
    export type InlineBlock = {
      /** 关联的内联状态的 block 的 block_id */
      block_id: string
      /** 文本局部样式 */
      text_element_style?: Lark.TextElementStyle
    }
    export type Equation = {
      /** 符合 KaTeX 语法的公式内容，语法规则请参考：https://katex.org/docs/supported.html */
      content: string
      /** 文本局部样式 */
      text_element_style?: Lark.TextElementStyle
    }
    export type TextElement = {
      /** 文字 */
      text_run?: Lark.TextRun
      /** @用户 */
      mention_user?: Lark.MentionUser
      /** @文档 */
      mention_doc?: Lark.MentionDoc
      /** 日期提醒 */
      reminder?: Lark.Reminder
      /** 内联附件 */
      file?: Lark.InlineFile
      /** 未支持的 TextElement */
      undefined?: Lark.UndefinedElement
      /** 内联 block */
      inline_block?: Lark.InlineBlock
      /** 公式 */
      equation?: Lark.Equation
    }
    export type Text = {
      /** 文本样式 */
      style?: Lark.TextStyle
      /** 文本元素 */
      elements: Lark.TextElement[]
    }
    export type Bitable = {
      /** 多维表格文档 Token。格式为 {BitableToken}_{TableID}，其中 BitableToken 是一篇多维表格的唯一标识，TableID 是一张数据表的唯一标识，使用时请注意拆分。 */
      token?: string
    }
    export type Callout = {
      background_color?: number
      border_color?: number
      text_color?: number
      /** 高亮块图标 */
      emoji_id?: string
    }
    export type ChatCard = {
      /** 群聊天会话 ID */
      chat_id: string
      /** 对齐方式 */
      align?: number
    }
    export type Diagram = {
      /** 绘图类型 */
      diagram_type?: number
    }
    export type Divider = {

    }
    export type Grid = {
      /** 分栏列数量 */
      column_size: number
    }
    export type GridColumn = {
      /** 当前分栏列占整个分栏的比例 */
      width_ratio?: number
    }
    export type IframeComponent = {
      /** iframe 类型 */
      iframe_type?: number
      /** iframe 目标 url（需要进行 url_encode） */
      url: string
    }
    export type Iframe = {
      /** iframe 的组成元素 */
      component: Lark.IframeComponent
    }
    export type Image = {
      /** 宽度，单位 px */
      width?: number
      /** 高度，单位 px */
      height?: number
      /** 图片 Token */
      token?: string
      /** 对齐方式 */
      align?: number
    }
    export type Isv = {
      /** 团队互动应用唯一ID */
      component_id?: string
      /** 团队互动应用类型，比如信息收集"blk_5f992038c64240015d280958" */
      component_type_id?: string
    }
    export type AddOns = {
      /** 团队互动应用唯一ID */
      component_id?: string
      /** 团队互动应用类型，比如问答互动"blk_636a0a6657db8001c8df5488" */
      component_type_id: string
      /** 文档小组件内容数据，JSON 字符串 */
      record?: string
    }
    export type Mindnote = {
      /** 思维导图 token */
      token?: string
    }
    export type Sheet = {
      /** 电子表格文档 Token。格式为 {SpreadsheetToken}_{SheetID}，其中 SpreadsheetToken 是一篇电子表格的唯一标识，SheetID 是一张工作表的唯一标识，使用时请注意拆分。 */
      token?: string
    }
    export type TableMergeInfo = {
      /** 从当前行索引起被合并的连续行数 */
      row_span?: number
      /** 从当前列索引起被合并的连续列数 */
      col_span?: number
    }
    export type TableProperty = {
      /** 行数 */
      row_size: number
      /** 列数 */
      column_size: number
      /** 列宽，单位px */
      column_width?: number[]
      /** 单元格合并信息 */
      merge_info?: Lark.TableMergeInfo[]
      /** 设置首行为标题行 */
      header_row?: boolean
      /** 设置首列为标题列 */
      header_column?: boolean
    }
    export type Table = {
      /** 单元格数组，数组元素为 Table Cell Block 的 ID */
      cells?: string[]
      /** 表格属性 */
      property: Lark.TableProperty
    }
    export type TableCell = {

    }
    export type View = {
      /** 视图类型 */
      view_type?: number
    }
    export type Undefined = {

    }
    export type QuoteContainer = {

    }
    export type Task = {
      /** 任务 ID，查询具体任务详情见 https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/create */
      task_id: string
    }
    export type OkrVisibleSetting = {
      /** 进展编辑区域是否可见 */
      progress_fill_area_visible?: boolean
      /** 状态是否可见 */
      progress_status_visible?: boolean
      /** 分数是否可见 */
      score_visible?: boolean
    }
    export type Okr = {
      /** OKR ID */
      okr_id?: string
      /** 周期的状态 */
      period_display_status?: string
      /** 周期名 - 中文 */
      period_name_zh?: string
      /** 周期名 - 英文 */
      period_name_en?: string
      /** OKR 所属的用户 ID */
      user_id?: string
      /** 可见性设置 */
      visible_setting?: Lark.OkrVisibleSetting
    }
    export type OkrProgressRate = {
      /** 状态模式 */
      mode?: string
      /** 当前进度 */
      current?: number
      /** 当前进度百分比，simple mode 下使用 */
      percent?: number
      /** 进展状态 */
      progress_status?: string
      /** 进度起始值，advanced模式使用 */
      start?: number
      /** 状态类型 */
      status_type?: string
      /** 进度目标值，advanced模式使用 */
      target?: number
    }
    export type OkrObjective = {
      /** objective ID */
      objective_id?: string
      /** 是否设置过私密权限 */
      confidential?: boolean
      /** objective 的位置编号，对应 Block 中 O1、O2 的 1、2 */
      position?: number
      /** 打分信息 */
      score?: number
      /** OKR Block 中是否展示该 objective */
      visible?: boolean
      /** objective 的权重 */
      weight?: number
      /** 进展信息 */
      progress_rate?: Lark.OkrProgressRate
      /** objective 的文本内容 */
      content?: Lark.Text
    }
    export type OkrKeyResult = {
      /** key result 的 ID */
      kr_id?: string
      /** 是否设置过私密权限 */
      confidential?: boolean
      /** key result 的位置编号，对应 Block 中 KR1、KR2 的 1、2。 */
      position?: number
      /** 打分信息 */
      score?: number
      /** OKR Block 中此 key result 是否可见 */
      visible?: boolean
      /** key result 的权重 */
      weight?: number
      /** 进展信息 */
      progress_rate?: Lark.OkrProgressRate
      /** key result 的文本内容 */
      content?: Lark.Text
    }
    export type OkrProgress = {

    }
    export type JiraIssue = {
      /** Jira issue ID */
      id?: string
      /** Jira issue key */
      key?: string
    }
    export type WikiCatalog = {
      /** 知识库 token */
      wiki_token?: string
    }
    export type Block = {
      /** Block 唯一标识 */
      block_id?: string
      /** block 的父亲 id */
      parent_id?: string
      /** block 的孩子 id 列表 */
      children?: string[]
      /** block 类型 */
      block_type: number
      /** 文档 Block */
      page?: Lark.Text
      /** 文本 Block */
      text?: Lark.Text
      /** 一级标题 Block */
      heading1?: Lark.Text
      /** 二级标题 Block */
      heading2?: Lark.Text
      /** 三级标题 Block */
      heading3?: Lark.Text
      /** 四级标题 Block */
      heading4?: Lark.Text
      /** 五级标题 Block */
      heading5?: Lark.Text
      /** 六级标题 Block */
      heading6?: Lark.Text
      /** 七级标题 Block */
      heading7?: Lark.Text
      /** 八级标题 Block */
      heading8?: Lark.Text
      /** 九级标题 Block */
      heading9?: Lark.Text
      /** 无序列表 Block */
      bullet?: Lark.Text
      /** 有序列表 Block */
      ordered?: Lark.Text
      /** 代码块 Block */
      code?: Lark.Text
      /** 引用 Block */
      quote?: Lark.Text
      /** 公式 Block */
      equation?: Lark.Text
      /** 任务 Block */
      todo?: Lark.Text
      /** 多维表格 Block */
      bitable?: Lark.Bitable
      /** 高亮块 Block */
      callout?: Lark.Callout
      /** 群聊卡片 Block */
      chat_card?: Lark.ChatCard
      /** 流程图/UML Block */
      diagram?: Lark.Diagram
      /** 分割线 Block */
      divider?: Lark.Divider
      /** 文件 Block */
      file?: Lark.File
      /** 分栏 Block */
      grid?: Lark.Grid
      /** 分栏列 Block */
      grid_column?: Lark.GridColumn
      /** 内嵌 Block */
      iframe?: Lark.Iframe
      /** 图片 Block */
      image?: Lark.Image
      /** 三方 Block */
      isv?: Lark.Isv
      /** Add-ons */
      add_ons?: Lark.AddOns
      /** 思维笔记 Block */
      mindnote?: Lark.Mindnote
      /** 电子表格 Block */
      sheet?: Lark.Sheet
      /** 表格 Block */
      table?: Lark.Table
      /** 单元格 Block */
      table_cell?: Lark.TableCell
      /** 视图 Block */
      view?: Lark.View
      /** 未支持 Block */
      undefined?: Lark.Undefined
      /** 引用容器 Block */
      quote_container?: Lark.QuoteContainer
      /** 任务 Block */
      task?: Lark.Task
      /** OKR Block */
      okr?: Lark.Okr
      /** OKR Objective */
      okr_objective?: Lark.OkrObjective
      /** OKR Key Result */
      okr_key_result?: Lark.OkrKeyResult
      /** OKR 进展信息 */
      okr_progress?: Lark.OkrProgress
      /** 评论 id 列表 */
      comment_ids?: string[]
      /** Jira Issue */
      jira_issue?: Lark.JiraIssue
      /** Wiki 子目录 Block */
      wiki_catalog?: Lark.WikiCatalog
    }
    export type ObjectiveIdWithKrId = {
      /** okr 中 objective 的 ID */
      objective_id?: string
      /** key result 的 ID 列表，此值为空时插入当前 objective 下的所有 key result */
      kr_ids?: string[]
    }
    export type UpdateTextElementsRequest = {
      /** 更新的文本元素列表，单次更新中 reminder 上限 30 个，mention_doc 上限 50 个，mention_user 上限 100 个 */
      elements: Lark.TextElement[]
    }
    export type UpdateTextStyleRequest = {
      style: Lark.TextStyle
      /** 应更新的字段，必须至少指定一个字段。例如，要调整 Block 对齐方式，请设置 fields 为 [1]。 */
      fields: number[]
    }
    export type UpdateTablePropertyRequest = {
      /** 表格列宽 */
      column_width?: number
      /** 需要修改列宽的表格列的索引（修改表格列宽时必填） */
      column_index?: number
      /** 设置首行为标题行 */
      header_row?: boolean
      /** 设置首列为标题列 */
      header_column?: boolean
    }
    export type InsertTableRowRequest = {
      /** 插入的行在表格中的索引。（-1表示在表格末尾插入一行） */
      row_index: number
    }
    export type InsertTableColumnRequest = {
      /** 插入的列在表格中的索引。（-1表示在表格末尾插入一列） */
      column_index: number
    }
    export type DeleteTableRowsRequest = {
      /** 行开始索引（区间左闭右开） */
      row_start_index: number
      /** 行结束索引（区间左闭右开） */
      row_end_index: number
    }
    export type DeleteTableColumnsRequest = {
      /** 列开始索引（区间左闭右开） */
      column_start_index: number
      /** 列结束索引（区间左闭右开） */
      column_end_index: number
    }
    export type MergeTableCellsRequest = {
      /** 行起始索引（区间左闭右开） */
      row_start_index: number
      /** 行结束索引（区间左闭右开） */
      row_end_index: number
      /** 列起始索引（区间左闭右开） */
      column_start_index: number
      /** 列结束索引（区间左闭右开） */
      column_end_index: number
    }
    export type UnmergeTableCellsRequest = {
      /** table 行索引 */
      row_index: number
      /** table 列索引 */
      column_index: number
    }
    export type InsertGridColumnRequest = {
      /** 插入列索引，从 1 开始，如 1 表示在第一列后插入，注意不允许传 0（-1表示在最后一列后插入） */
      column_index: number
    }
    export type DeleteGridColumnRequest = {
      /** 删除列索引，从 0 开始，如 0 表示删除第一列（-1表示删除最后一列） */
      column_index: number
    }
    export type UpdateGridColumnWidthRatioRequest = {
      /** 更新列宽比例时，需要传入所有列宽占比 */
      width_ratios: number[]
    }
    export type ReplaceImageRequest = {
      /** 图片 token */
      token: string
      /** 图片宽度，单位 px */
      width?: number
      /** 图片高度，单位 px */
      height?: number
      /** 对齐方式 */
      align?: number
    }
    export type ReplaceFileRequest = {
      /** 附件 token */
      token: string
    }
    export type UpdateTextRequest = {
      /** 更新的文本元素列表，单次更新中 reminder 上限 30 个，mention_doc 上限 50 个，mention_user 上限 100 个 */
      elements: Lark.TextElement[]
      /** 更新的文本样式 */
      style: Lark.TextStyle
      /** 文本样式中应更新的字段，必须至少指定一个字段。例如，要调整 Block 对齐方式，请设置 fields 为 [1]。 */
      fields: number[]
    }
    export type UpdateBlockRequest = {
      /** 更新文本元素请求 */
      update_text_elements?: Lark.UpdateTextElementsRequest
      /** 更新文本样式请求 */
      update_text_style?: Lark.UpdateTextStyleRequest
      /** 更新表格属性请求 */
      update_table_property?: Lark.UpdateTablePropertyRequest
      /** 表格插入新行请求 */
      insert_table_row?: Lark.InsertTableRowRequest
      /** 表格插入新列请求 */
      insert_table_column?: Lark.InsertTableColumnRequest
      /** 表格批量删除行请求 */
      delete_table_rows?: Lark.DeleteTableRowsRequest
      /** 表格批量删除列请求 */
      delete_table_columns?: Lark.DeleteTableColumnsRequest
      /** 表格合并单元格请求 */
      merge_table_cells?: Lark.MergeTableCellsRequest
      /** 表格取消单元格合并状态请求 */
      unmerge_table_cells?: Lark.UnmergeTableCellsRequest
      /** 分栏插入新的分栏列请求 */
      insert_grid_column?: Lark.InsertGridColumnRequest
      /** 分栏删除列请求 */
      delete_grid_column?: Lark.DeleteGridColumnRequest
      /** 更新分栏列宽比例请求 */
      update_grid_column_width_ratio?: Lark.UpdateGridColumnWidthRatioRequest
      /** 替换图片请求 */
      replace_image?: Lark.ReplaceImageRequest
      /** 替换附件请求 */
      replace_file?: Lark.ReplaceFileRequest
      /** Block 唯一标识 */
      block_id?: string
      /** 更新文本元素及样式请求 */
      update_text?: Lark.UpdateTextRequest
    }
    export type Style = {
      /** 填充透明度 */
      fill_opacity?: number
      /** 边框样式 */
      border_style?: string
      /** 边框宽度 */
      border_width?: string
      /** 边框透明度 */
      border_opacity?: number
      /** 水平翻折 */
      h_flip?: boolean
      /** 垂直翻折 */
      v_flip?: boolean
    }
    export type CompositeShape = {
      /** 基础图形的具体类型 */
      type: string
    }
    export type ConnectorAttachedObject = {
      /** 连接图形的 id */
      id?: string
    }
    export type ConnectorCaption = {
      /** 文本 */
      data?: Lark.Text[]
    }
    export type Connector = {
      /** 连线连接的起点图形 */
      start_object?: Lark.ConnectorAttachedObject
      /** 连线连接的终点图形 */
      end_object?: Lark.ConnectorAttachedObject
      /** 连线文本 */
      captions?: Lark.ConnectorCaption
    }
    export type Section = {
      /** 分区标题 */
      title?: string
    }
    export type TableMeta = {
      /** 行数 */
      row_num: number
      /** 列数 */
      col_num: number
    }
    export type TableCellMergeInfo = {
      /** 从当前行索引起被合并的连续行数 */
      row_span: number
      /** 从当前列索引起被合并的连续列数 */
      col_span: number
    }
    export type MindMap = {
      /** 思维导图父节点 id ，为空表示是思维导图的根节点 */
      parent_id?: string
    }
    export type WhiteboardNode = {
      /** 节点 id */
      id: string
      /** 节点图形类型，目前创建节点仅支持创建图片、文本、基础图形等类型，读取到不支持创建的图形时只返回一些基础信息，如 id、type、text、style 等 */
      type: string
      /** 父节点 id */
      parent_id?: string
      /** 子节点 */
      children?: string[]
      /** 图形相对画布的 x 轴位置信息（存在父容器时为相对父容器的坐标，父容器为组合图形 group 时，坐标是穿透的），单位为 px */
      x?: number
      /** 图形相对画布的 y 轴位置信息（存在父容器时为相对父容器的坐标，父容器为组合图形 group 时，坐标是穿透的），单位为 px */
      y?: number
      /** 图形旋转角度 */
      angle?: number
      /** 图形宽度，单位为 px */
      width?: number
      /** 图形高度，单位为 px */
      height?: number
      /** 图形内文字 */
      text?: Lark.Text
      /** 图形样式 */
      style?: Lark.Style
      /** 图片 */
      image?: Lark.Image
      /** 基础图形属性 */
      composite_shape?: Lark.CompositeShape
      /** 连线属性 */
      connector?: Lark.Connector
      /** 分区属性 */
      section?: Lark.Section
      /** 表格属性 */
      table?: Lark.Table
      /** 思维导图属性 */
      mind_map?: Lark.MindMap
    }
    export type GetSpreadsheet = {
      /** 电子表格标题 */
      title?: string
      /** 电子表格owner */
      owner_id?: string
      /** 电子表格token */
      token?: string
      /** 电子表格url */
      url?: string
    }
    export type Spreadsheet = {
      /** 表格标题 */
      title?: string
      /** 文件夹token */
      folder_token?: string
      /** 表格 URL */
      url?: string
      /** 表格token */
      spreadsheet_token?: string
    }
    export type GridProperties = {
      /** 冻结的行数量 */
      frozen_row_count?: number
      /** 冻结的列数量 */
      frozen_column_count?: number
      /** 工作表的行数 */
      row_count?: number
      /** 工作表的列数量 */
      column_count?: number
    }
    export type MergeRange = {
      /** 起始行 */
      start_row_index?: number
      /** 结束行 */
      end_row_index?: number
      /** 起始列 */
      start_column_index?: number
      /** 结束列 */
      end_column_index?: number
    }
    export type Dimension = {
      /** 操作行还是列，取值：ROWS、COLUMNS */
      major_dimension?: string
      /** 起始行或者列号 */
      start_index?: number
      /** 结束行或者列号 */
      end_index?: number
    }
    export type FindCondition = {
      /** 查找范围 */
      range: string
      /** 大小写是否敏感 */
      match_case?: boolean
      /** 是否匹配整个单元格 */
      match_entire_cell?: boolean
      /** 是否为正则匹配 */
      search_by_regex?: boolean
      /** 是否搜索公式内容 */
      include_formulas?: boolean
    }
    export type FindReplaceResult = {
      /** 符合查找条件的单元格数组，不包含公式，例如["A1", "A2"...] */
      matched_cells?: string[]
      /** 符合查找条件的含有公式的单元格数组，例如["B3", "H7"...] */
      matched_formula_cells?: string[]
      /** 符合查找条件的总行数 */
      rows_count?: number
    }
    export type Condition = {
      /** 筛选类型 */
      filter_type: string
      /** 比较类型 */
      compare_type?: string
      /** 筛选参数 */
      expected: string[]
    }
    export type FilterInfo = {
      /** 设置了筛选条件的列 */
      col: string
      /** 筛选条件 */
      conditions: Lark.Condition[]
    }
    export type SheetFilterInfo = {
      /** 筛选应用范围 */
      range: string
      /** 筛选出来的行 */
      filtered_out_rows: number[]
      /** sheet的筛选条件 */
      filter_infos: Lark.FilterInfo[]
    }
    export type FilterView = {
      /** 筛选视图 id */
      filter_view_id?: string
      /** 筛选视图名字 */
      filter_view_name?: string
      /** 筛选视图的筛选范围 */
      range?: string
    }
    export type FilterViewCondition = {
      /** 设置筛选条件的列，使用字母号 */
      condition_id?: string
      /** 筛选类型 */
      filter_type?: string
      /** 比较类型 */
      compare_type?: string
      /** 筛选参数 */
      expected?: string[]
    }
    export type FloatImage = {
      /** 浮动图片 id */
      float_image_id?: string
      /** 浮动图片 token，需要先上传图片到表格获得此 token 之后再进行浮动图片的操作 */
      float_image_token?: string
      /** 浮动图片的左上角单元格定位，只支持一个单元格 */
      range?: string
      /** 浮动图片的宽度，大于等于 20px */
      width?: number
      /** 浮动图片的高度，大于等于 20px */
      height?: number
      /** 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移，大于等于0且小于所在单元格的宽度 */
      offset_x?: number
      /** 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移，大于等于0且小于所在单元格的高度 */
      offset_y?: number
    }
    export type App = {
      /** 多维表格 app token */
      app_token?: string
      /** 多维表格 App 名字 */
      name?: string
      /** 多维表格 App 归属文件夹 */
      folder_token?: string
      /** 多维表格 App URL */
      url?: string
    }
    export type DisplayApp = {
      /** 多维表格 app token */
      app_token?: string
      /** 多维表格 App 名字 */
      name?: string
      /** 多维表格 App 版本号 */
      revision?: number
      /** 多维表格是否已开启高级权限 */
      is_advanced?: boolean
    }
    export type DisplayAppV2 = {
      /** 多维表格 app token */
      app_token?: string
      /** 多维表格 App 名字 */
      name?: string
      /** 多维表格是否已开启高级权限 */
      is_advanced?: boolean
    }
    export type AppTableFieldPropertyOption = {
      /** 选项名 */
      name?: string
      /** 选项id */
      id?: string
      /** 选项颜色 */
      color?: number
    }
    export type AppFieldPropertyAutoSerialOptions = {
      /** 自动编号的可选规则项类型 */
      type: string
      /** 与类型相对应的取值 */
      value: string
    }
    export type AppFieldPropertyAutoSerial = {
      /** 自动编号类型 */
      type: string
      /** 自动编号规则列表 */
      options?: Lark.AppFieldPropertyAutoSerialOptions[]
    }
    export type AppFieldPropertyLocation = {
      /** 地理位置输入限制 */
      input_type: string
    }
    export type AllowedEditModes = {
      /** 是否允许手动录入 */
      manual?: boolean
      /** 是否允许移动端录入 */
      scan?: boolean
    }
    export type Rating = {
      /** 评分字段的符号展示 */
      symbol?: string
    }
    export type AppTableFieldProperty = {
      /** 单选、多选字段的选项信息 */
      options?: Lark.AppTableFieldPropertyOption[]
      /** 数字、公式字段的显示格式 */
      formatter?: string
      /** 日期、创建时间、最后更新时间字段的显示格式 */
      date_formatter?: string
      /** 日期字段中新纪录自动填写创建时间 */
      auto_fill?: boolean
      /** 人员、群组字段中允许添加多个成员，单向关联、双向关联中允许添加多个记录 */
      multiple?: boolean
      /** 单向关联、双向关联字段中关联的数据表的id */
      table_id?: string
      /** 单向关联、双向关联字段中关联的数据表的名字 */
      table_name?: string
      /** 双向关联字段中关联的数据表中对应的双向关联字段的名字 */
      back_field_name?: string
      /** 自动编号类型 */
      auto_serial?: Lark.AppFieldPropertyAutoSerial
      /** 地理位置输入方式 */
      location?: Lark.AppFieldPropertyLocation
      /** 公式字段的表达式 */
      formula_expression?: string
      /** 字段支持的编辑模式 */
      allowed_edit_modes?: Lark.AllowedEditModes
      /** 进度、评分等字段的数据范围最小值 */
      min?: number
      /** 进度、评分等字段的数据范围最大值 */
      max?: number
      /** 进度等字段是否支持自定义范围 */
      range_customize?: boolean
      /** 货币币种 */
      currency_code?: string
      /** 评分字段的相关设置 */
      rating?: Lark.Rating
    }
    export type AppTableFieldDescription = {
      /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述 */
      disable_sync?: boolean
      /** 字段描述内容，支持换行
      */
      text?: string
    }
    export type AppTableCreateHeader = {
      /** 字段名 */
      field_name: string
      /** 字段类型 */
      type: number
      /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
      ui_type?: string
      /** 字段属性 */
      property?: Lark.AppTableFieldProperty
      /** 字段的描述 */
      description?: Lark.AppTableFieldDescription
    }
    export type ReqTable = {
      /** 数据表 名字 */
      name?: string
      /** 默认表格视图的名称 */
      default_view_name?: string
      /** 允许设置数据表的初始字段,默认第一个字段为索引列 */
      fields?: Lark.AppTableCreateHeader[]
    }
    export type AppTable = {
      /** 表格Id */
      table_id?: string
      /** 数据表 版本号 */
      revision?: number
      /** 数据表 名字 */
      name?: string
    }
    export type AppDashboard = {
      /** 仪表盘 ID */
      block_id: string
      /** 仪表盘名字 */
      name: string
    }
    export type AppTableViewPropertyFilterInfoCondition = {
      /** 用于过滤的字段唯一ID */
      field_id: string
      /** 过滤操作的类型 */
      operator: string
      /** 筛选值 */
      value?: string
    }
    export type AppTableViewPropertyFilterInfo = {
      /** 多个筛选条件的关系 */
      conjunction: string
      /** 筛选条件 */
      conditions: Lark.AppTableViewPropertyFilterInfoCondition[]
    }
    export type AppTableViewPropertyHierarchyConfig = {
      /** 层级结构的关联列id */
      field_id?: string
    }
    export type AppTableViewProperty = {
      /** 过滤条件 */
      filter_info?: Lark.AppTableViewPropertyFilterInfo
      /** 隐藏字段ID列表 */
      hidden_fields?: string[]
      /** 表格视图层级结构设置 */
      hierarchy_config?: Lark.AppTableViewPropertyHierarchyConfig
    }
    export type AppTableView = {
      /** 视图Id */
      view_id?: string
      /** 视图名字 */
      view_name?: string
      /** 视图类型 */
      view_type?: string
      /** 视图属性 */
      property?: Lark.AppTableViewProperty
    }
    export type AppTableForm = {
      /** 表单名称 */
      name?: string
      /** 表单描述 */
      description?: string
      /** 是否开启共享 */
      shared?: boolean
      /** 分享 URL */
      shared_url?: string
      /** 分享范围限制 */
      shared_limit?: string
      /** 填写次数限制一次 */
      submit_limit_once?: boolean
    }
    export type AppTableFormPatchedField = {
      /** 上一个表单问题 ID */
      pre_field_id?: string
      /** 表单问题 */
      title?: string
      /** 问题描述 */
      description?: string
      /** 是否必填 */
      required?: boolean
      /** 是否可见 */
      visible?: boolean
    }
    export type AppTableFormField = {
      /** 表单问题 ID */
      field_id?: string
      /** 表单问题 */
      title?: string
      /** 问题描述 */
      description?: string
      /** 是否必填 */
      required?: boolean
      /** 是否可见 */
      visible?: boolean
    }
    export type AppTableRecord = {
      /** 记录字段 */
      fields: unknown
      /** 记录Id */
      record_id?: string
      /** 创建人 */
      created_by?: Lark.Person
      /** 创建时间 */
      created_time?: number
      /** 修改人 */
      last_modified_by?: Lark.Person
      /** 最近更新时间 */
      last_modified_time?: number
    }
    export type Sort = {
      /** 字段名称 */
      field_name?: string
      /** 是否倒序排序 */
      desc?: boolean
    }
    export type DeleteRecord = {
      /** 是否成功删除 */
      deleted?: boolean
      /** 删除的记录id */
      record_id?: string
    }
    export type AppTableFieldForList = {
      /** 字段名 */
      field_name: string
      /** 字段类型 */
      type: number
      /** 字段属性 */
      property?: Lark.AppTableFieldProperty
      /** 字段的描述, text_field_as_array为false时值为字符串，为true则是对象数组 */
      description?: unknown
      /** 是否是索引列 */
      is_primary?: boolean
      /** 字段Id */
      field_id?: string
      /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
      ui_type?: string
      /** 是否是隐藏字段 */
      is_hidden?: boolean
    }
    export type AppTableField = {
      /** 字段名 */
      field_name: string
      /** 字段类型 */
      type: number
      /** 字段属性 */
      property?: Lark.AppTableFieldProperty
      /** 字段的描述 */
      description?: Lark.AppTableFieldDescription
      /** 是否是索引列 */
      is_primary?: boolean
      /** 字段Id */
      field_id?: string
      /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
      ui_type?: string
      /** 是否是隐藏字段 */
      is_hidden?: boolean
    }
    export type AppRoleTableRoleRecRuleCondition = {
      /** 字段名 */
      field_name: string
      /** 运算符 */
      operator?: string
      /** 单选或多选字段的选项id */
      value?: string[]
      /** 字段类型 */
      field_type?: number
    }
    export type AppRoleTableRoleRecRule = {
      /** 记录筛选条件 */
      conditions: Lark.AppRoleTableRoleRecRuleCondition[]
      /** 多个筛选条件的关系 */
      conjunction?: string
      /** 其他记录权限，仅在table_perm为2时有效 */
      other_perm?: number
    }
    export type AppRoleTableRole = {
      /** 数据表权限 */
      table_perm: number
      /** 数据表名 */
      table_name?: string
      /** 数据表ID */
      table_id?: string
      /** 记录筛选条件，在table_perm为1或2时有意义，用于指定可编辑或可阅读某些记录 */
      rec_rule?: Lark.AppRoleTableRoleRecRule
      /** 字段权限，仅在table_perm为2时有意义，设置字段可编辑或可阅读 */
      field_perm?: unknown
      /** 新增记录权限，仅在table_perm为2时有意义，用于设置记录是否可以新增 */
      allow_add_record?: boolean
      /** 删除记录权限，仅在table_perm为2时有意义，用于设置记录是否可以删除 */
      allow_delete_record?: boolean
    }
    export type AppRoleBlockRole = {
      block_id: string
      /** Block类型 */
      block_type?: string
      /** Block权限 */
      block_perm: number
    }
    export type AppRole = {
      /** 自定义权限的名字 */
      role_name: string
      /** 自定义权限的id */
      role_id?: string
      /** 数据表权限 */
      table_roles: Lark.AppRoleTableRole[]
      /** block权限 */
      block_roles?: Lark.AppRoleBlockRole[]
    }
    export type AppRoleMemberId = {
      /** 协作者 ID 类型 */
      type?: string
      /** 协作者 ID */
      id: string
    }
    export type AppRoleMember = {
      /** 用户的open_id */
      open_id?: string
      /** 用户的union_id */
      union_id?: string
      /** 用户的user_id */
      user_id?: string
      /** 群聊的chat_id */
      chat_id?: string
      /** 部门的department_id */
      department_id?: string
      /** 部门的open_department_id */
      open_department_id?: string
      /** 协作者名字 */
      member_name?: string
      /** 协作者英文名 */
      member_en_name?: string
      /** 协作者类型 */
      member_type?: string
    }
    export type Space = {
      /** 知识空间名称 */
      name?: string
      /** 知识空间描述 */
      description?: string
      /** 知识空间id */
      space_id?: string
      /** 表示知识空间类型（团队空间 或 个人空间） */
      space_type?: string
      /** 表示知识空间可见性（公开空间 或 私有空间） */
      visibility?: string
    }
    export type Setting = {
      /** 谁可以创建空间的一级页面： "admin_and_member" = 管理员和成员 "admin"  - 仅管理员 */
      create_setting?: string
      /** 可阅读用户可否创建副本/打印/导出/复制： "allow" - 允许 "not_allow" - 不允许 */
      security_setting?: string
      /** 可阅读用户可否评论： "allow" - 允许 "not_allow" - 不允许 */
      comment_setting?: string
    }
    export type Node = {
      /** 知识空间id，[获取方式](/ssl:ttdoc/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview) */
      space_id?: string
      /** 节点token，[获取方式](/ssl:ttdoc/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview) */
      node_token?: string
      /** 对应文档类型的token，可根据 obj_type 判断属于哪种文档类型。 */
      obj_token?: string
      /** 文档类型，对于快捷方式，该字段是对应的实体的obj_type。 */
      obj_type: string
      /** 父节点 token。若当前节点为一级节点，父节点 token 为空。 */
      parent_node_token?: string
      /** 节点类型 */
      node_type: string
      /** 快捷方式对应的实体node_token，当节点为快捷方式时，该值不为空。 */
      origin_node_token?: string
      /** 快捷方式对应的实体所在的spaceid */
      origin_space_id?: string
      /** 是否有子节点 */
      has_child?: boolean
      /** 文档标题 */
      title?: string
      /** 文档创建时间 */
      obj_create_time?: string
      /** 文档最近编辑时间 */
      obj_edit_time?: string
      /** 节点创建时间 */
      node_create_time?: string
      /** 节点创建者 */
      creator?: string
      /** 节点所有者 */
      owner?: string
    }
    export type MoveResult = {
      /** 移动完成的节点信息 */
      node: Lark.Node
      /** 节点移动状态码 */
      status: number
      /** 节点移动状态信息 */
      status_msg: string
    }
    export type TaskResult = {
      /** 任务id */
      task_id: string
      /** MoveDocsToWiki任务结果 */
      move_result?: Lark.MoveResult[]
    }
    export type FileSubscription = {
      /** 订阅关系ID */
      subscription_id?: string
      /** 是否订阅 */
      subscription_type?: string
      /** 是否订阅 */
      is_subcribe?: boolean
      /** 文档类型 */
      file_type: string
    }
    export type Calendar = {
      /** 日历OpenId */
      calendar_id: string
      /** 日历标题 */
      summary?: string
      /** 日历描述 */
      description?: string
      permissions?: string
      /** 日历颜色，颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效 */
      color?: number
      /** 日历类型 */
      type?: string
      /** 日历备注名，修改或添加后仅对当前身份生效 */
      summary_alias?: string
      /** 对于当前身份，日历是否已经被标记为删除 */
      is_deleted?: boolean
      /** 当前日历是否是第三方数据；三方日历及日程只支持读，不支持写入 */
      is_third_party?: boolean
      /** 当前身份对于该日历的访问权限 */
      role?: string
    }
    export type UserCalendar = {
      /** 日历实体信息 */
      calendar?: Lark.Calendar
      /** 日历的创建者user ID */
      user_id?: string
    }
    export type Freebusy = {
      /** 忙闲信息开始时间，RFC3339 date_time格式 */
      start_time: string
      /** 忙闲信息结束时间，RFC3339 date_time格式 */
      end_time: string
    }
    export type AclScope = {
      /** 权限类型，当type为User时，值为open_id/user_id/union_id */
      type: string
      /** 用户ID */
      user_id?: string
    }
    export type CalendarAcl = {
      /** acl资源ID */
      acl_id: string
      /** 对日历的访问权限 */
      role: string
      /** 权限范围 */
      scope: Lark.AclScope
    }
    export type TimeInfo = {
      /** 仅全天日程使用该字段，如2018-09-01。需满足 RFC3339 格式。不能与 time_stamp 同时指定 */
      date?: string
      /** 秒级时间戳，如1602504000(表示2020/10/12 20:0:00 +8时区) */
      timestamp?: string
      /** 时区名称，使用IANA Time Zone Database标准，如Asia/Shanghai；全天日程时区固定为UTC，非全天日程时区默认为Asia/Shanghai */
      timezone?: string
    }
    export type MeetingSettings = {
      /** 设置会议 owner */
      owner_id?: string
      /** 设置入会范围 */
      join_meeting_permission?: string
      /** 指定主持人 */
      assign_hosts?: string[]
      /** 设置自动录制 */
      auto_record?: boolean
      /** 开启等候室 */
      open_lobby?: boolean
      /** 允许日程参与者发起会议 */
      allow_attendees_start?: boolean
    }
    export type Vchat = {
      /** 视频会议类型 */
      vc_type?: string
      /** 第三方视频会议icon类型 */
      icon_type?: string
      /** 第三方视频会议文案，可以为空，为空展示默认文案 */
      description?: string
      /** 视频会议URL */
      meeting_url?: string
      /** VC视频会议的会前设置 */
      meeting_settings?: Lark.MeetingSettings
    }
    export type EventLocation = {
      /** 地点名称 */
      name?: string
      /** 地点地址 */
      address?: string
      /** 地点坐标纬度信息，对于国内的地点，采用GCJ-02标准，海外地点采用WGS84标准 */
      latitude?: number
      /** 地点坐标经度信息，对于国内的地点，采用GCJ-02标准，海外地点采用WGS84标准 */
      longitude?: number
    }
    export type Schema = {
      /** UI项名称 TODO文档 */
      ui_name?: string
      /** UI项自定义状态 */
      ui_status?: string
      /** 按钮点击后跳转的链接 */
      app_link?: string
    }
    export type CalendarEvent = {
      /** 日程ID */
      event_id: string
      /** 日程组织者日历ID */
      organizer_calendar_id?: string
      /** 日程标题 */
      summary?: string
      /** 日程描述 */
      description?: string
      /** 是否发送通知消息 */
      need_notification?: boolean
      /** 日程开始时间 */
      start_time: Lark.TimeInfo
      /** 日程结束时间 */
      end_time: Lark.TimeInfo
      /** 视频会议信息，仅当日程至少有一位attendee时生效 */
      vchat?: Lark.Vchat
      /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
      visibility?: string
      /** 参与人权限 */
      attendee_ability?: string
      /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
      free_busy_status?: string
      /** 日程地点 */
      location?: Lark.EventLocation
      /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
      color?: number
      /** 日程提醒列表 */
      reminders?: Lark.Reminder[]
      /** 重复日程的重复性规则 */
      recurrence?: string
      /** 日程状态 */
      status?: string
      /** 日程是否是一个重复日程的例外日程 */
      is_exception?: boolean
      /** 例外日程的原重复日程的event_id */
      recurring_event_id?: string
      /** 日程的创建时间戳 */
      create_time?: string
      /** 日程自定义信息 */
      schemas?: Lark.Schema[]
    }
    export type EventSearchFilter = {
      /** 搜索过滤项，日程搜索区间的开始时间，被搜索日程的事件必须与搜索区间有交集 */
      start_time?: Lark.TimeInfo
      /** 搜索过滤项，日程搜索区间的结束时间，被搜索日程的事件必须与搜索区间有交集 */
      end_time?: Lark.TimeInfo
      /** 搜索过滤项，参与人的用户ID列表，被搜索日程中必须包含至少一个其中的参与人 */
      user_ids?: string[]
      /** 搜索过滤项，会议室ID列表，被搜索日程中必须包含至少一个其中的会议室 */
      room_ids?: string[]
      /** 搜索过滤项，群ID列表，被搜索日程的参与人中必须包含至少一个其中的群 */
      chat_ids?: string[]
    }
    export type Instance = {
      /** 日程实例ID */
      event_id: string
      /** 日程主题 */
      summary?: string
      /** 日程描述 */
      description?: string
      /** 开始时间 */
      start_time?: Lark.TimeInfo
      /** 结束时间 */
      end_time?: Lark.TimeInfo
      /** 日程状态 */
      status?: string
      /** 是否是例外日程实例 */
      is_exception?: boolean
      /** 日程的app_link,跳转到具体的某个日程 */
      app_link?: string
      /** 日程地点 */
      location?: Lark.EventLocation
    }
    export type EventOrganizer = {
      /** 日程组织者user ID */
      user_id?: string
      /** 日程组织者姓名 */
      display_name?: string
    }
    export type AttendeeChatMember = {
      /** 参与人RSVP状态 */
      rsvp_status?: string
      /** 参与人是否为「可选参加」 */
      is_optional?: boolean
      /** 参与人名称 */
      display_name?: string
      /** 参与人是否为日程组织者 */
      is_organizer?: boolean
      /** 参与人是否为外部参与人 */
      is_external?: boolean
    }
    export type CustomizationOption = {
      /** the option unique key */
      option_key?: string
      /** should be filled if the option is others option */
      others_content?: string
    }
    export type CalendarAttendeeResourceCustomization = {
      /** the unique key of customization option */
      index_key: string
      /** should be filled when the type of customization is input */
      input_content?: string
      options?: Lark.CustomizationOption[]
    }
    export type CalendarEventAttendee = {
      /** 参与人类型，仅当新建参与人时可设置类型<br>
      type为User时，值为open_id/user_id/union_id<br>
      type为Chat时，值为open_chat_id<br>
      type为Resource时，值为open_room_id<br>
      type为ThirdParty时，值为third_party_email；不支持通过API新建该类型参与人 */
      type?: string
      /** 参与人ID */
      attendee_id?: string
      /** 参与人RSVP状态 */
      rsvp_status?: string
      /** 参与人是否为「可选参加」，无法编辑群参与人的此字段 */
      is_optional?: boolean
      /** 参与人是否为日程组织者 */
      is_organizer?: boolean
      /** 参与人是否为外部参与人；外部参与人不支持编辑 */
      is_external?: boolean
      /** 参与人名称 */
      display_name?: string
      /** 群中的群成员，当type为Chat时有效；群成员不支持编辑 */
      chat_members?: Lark.AttendeeChatMember[]
      /** 参与人的用户id，依赖于user_id_type返回对应的取值，当is_external为true时，此字段只会返回open_id或者union_id */
      user_id?: string
      /** chat类型参与人的群组chat_id */
      chat_id?: string
      /** resource类型参与人的会议室room_id */
      room_id?: string
      /** third_party类型参与人的邮箱 */
      third_party_email?: string
      /** bot身份操作时，为预定的会议室指定实际预定人 */
      operate_id?: string
      /** 会议室的个性化配置 */
      resource_customization?: Lark.CalendarAttendeeResourceCustomization[]
      /** 会议室审批原因 */
      approval_reason?: string
    }
    export type TimeoffEvent = {
      /** 休假申请的唯一标识id */
      timeoff_event_id: string
      /** 用户的user id */
      user_id: string
      /** 休假人的时区 */
      timezone: string
      /** 休假开始时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，且与end_time对应，不符合将返回错误 */
      start_time: string
      /** 休假结束时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，与start_time对应，不符合将返回错误 */
      end_time: string
      /** 休假日程标题，可自定义例如："请假中(全天) / 1-Day Time Off"，"请假中(半天) / 0.5-Day Time Off"，"长期休假中 / Leave of Absence"，"请假中" */
      title?: string
      /** 休假日程描述，可自定义,例如：
      "若拒绝或删除此日程，飞书中相应的“请假”标签将自动消失，而请假系统中的休假申请不会被撤销。

      If the event is rejected or deleted, corresponding "On Leave" tag in Feishu will disappear, while the leave request in the time off system will not be revoked." */
      description?: string
    }
    export type CalendarEventAttendeeId = {
      /** 参与人类型，仅当新建参与人时可设置类型<br>
      type为User时，值为open_id/user_id/union_id<br>
      type为Chat时，值为open_chat_id<br>
      type为Resource时，值为open_room_id<br>
      type为ThirdParty时，值为third_party_email；不支持通过API新建该类型参与人 */
      type?: string
      /** 参与人的用户id，依赖于user_id_type返回对应的取值，当is_external为true时，此字段只会返回open_id或者union_id */
      user_id?: string
      /** chat类型参与人的群组chat_id */
      chat_id?: string
      /** resource类型参与人的会议室room_id */
      room_id?: string
      /** third_party类型参与人的邮箱 */
      third_party_email?: string
    }
    export type CalendarEventAttendeeChatMember = {
      /** 参与人RSVP状态 */
      rsvp_status?: string
      /** 参与人是否为「可选参加」 */
      is_optional?: boolean
      /** 参与人名称 */
      display_name?: string
      /** 用户open_id */
      open_id?: string
      /** 参与人是否为日程组织者 */
      is_organizer?: boolean
      /** 参与人是否为外部参与人 */
      is_external?: boolean
    }
    export type ExchangeBinding = {
      /** admin账户 */
      admin_account?: string
      /** 用户绑定的Exchange账户 */
      exchange_account?: string
      /** Exchange账户绑定user唯一标识id */
      user_id?: string
      /** Exchange账户同步状态 */
      status?: string
      /** exchange绑定唯一标识id */
      exchange_binding_id: string
    }
    export type ReservePermissionChecker = {
      /** 检查字段类型 */
      check_field: number
      /** 检查方式 */
      check_mode: number
      /** 检查字段列表 */
      check_list: string[]
    }
    export type ReserveActionPermission = {
      /** 权限项 */
      permission: number
      /** 权限检查器列表，权限检查器之间为"逻辑或"的关系（即 有一个为true则拥有该权限） */
      permission_checkers: Lark.ReservePermissionChecker[]
    }
    export type PstnSipInfo = {
      /** 给pstn/sip用户设置的临时昵称 */
      nickname?: string
      /** pstn/sip主机号 */
      main_address: string
    }
    export type ReserveCallee = {
      /** 用户ID */
      id?: string
      /** 用户类型 */
      user_type: number
      /** pstn/sip信息 */
      pstn_sip_info?: Lark.PstnSipInfo
    }
    export type ReserveCallSetting = {
      /** 被呼叫的用户 */
      callee: Lark.ReserveCallee
    }
    export type ReserveAssignHost = {
      /** 用户类型，仅支持设置同租户下的 Lark 用户 */
      user_type?: number
      /** 用户ID */
      id?: string
    }
    export type ReserveMeetingSetting = {
      /** 会议主题 */
      topic?: string
      /** 会议权限配置列表，如果存在相同的权限配置项则它们之间为"逻辑或"的关系（即 有一个为true则拥有该权限） */
      action_permissions?: Lark.ReserveActionPermission[]
      /** 会议初始类型 */
      meeting_initial_type?: number
      /** 1v1呼叫相关参数 */
      call_setting?: Lark.ReserveCallSetting
      /** 使用飞书视频会议时，是否开启自动录制，默认false */
      auto_record?: boolean
      /** 指定主持人列表 */
      assign_host_list?: Lark.ReserveAssignHost[]
    }
    export type Reserve = {
      /** 预约ID */
      id?: string
      /** 9位会议号 */
      meeting_no?: string
      /** 会议链接 */
      url?: string
      /** APPLink用于唤起飞书APP入会。"{?}"为占位符，用于配置入会参数，使用时需替换具体值：0表示关闭，1表示打开。preview为入会前的设置页，mic为麦克风，speaker为扬声器，camera为摄像头 */
      app_link?: string
      /** 直播链接 */
      live_link?: string
      /** 预约到期时间（unix时间，单位sec） */
      end_time?: string
    }
    export type ReserveCorrectionCheckInfo = {
      /** 指定主持人无效id列表 */
      invalid_host_id_list?: string[]
    }
    export type MeetingUser = {
      /** 用户ID */
      id?: string
      /** 用户类型 */
      user_type?: number
    }
    export type MeetingParticipant = {
      /** 用户ID */
      id?: string
      /** 首次入会时间，秒级Unix时间戳 */
      first_join_time?: string
      /** 最终离会时间，秒级Unix时间戳 */
      final_leave_time?: string
      /** 累计在会中时间，时间单位：秒 */
      in_meeting_duration?: string
      /** 用户类型 */
      user_type?: number
      /** 是否为主持人 */
      is_host?: boolean
      /** 是否为联席主持人 */
      is_cohost?: boolean
      /** 是否为外部参会人 */
      is_external?: boolean
      /** 参会人状态 */
      status?: number
    }
    export type MeetingAbility = {
      /** 是否使用视频 */
      use_video?: boolean
      /** 是否使用音频 */
      use_audio?: boolean
      /** 是否使用共享屏幕 */
      use_share_screen?: boolean
      /** 是否使用妙享（magic share） */
      use_follow_screen?: boolean
      /** 是否使用录制 */
      use_recording?: boolean
      /** 是否使用PSTN */
      use_pstn?: boolean
    }
    export type Meeting = {
      /** 会议ID */
      id?: string
      /** 会议主题 */
      topic?: string
      /** 会议链接 */
      url?: string
      /** 会议号 */
      meeting_no?: string
      /** 会议创建时间（unix时间，单位sec） */
      create_time?: string
      /** 会议开始时间（unix时间，单位sec） */
      start_time?: string
      /** 会议结束时间（unix时间，单位sec） */
      end_time?: string
      /** 主持人 */
      host_user?: Lark.MeetingUser
      /** 会议状态 */
      status?: number
      /** 峰值参会人数 */
      participant_count?: string
      /** 累计参会人数 */
      participant_count_accumulated?: string
      /** 参会人列表 */
      participants?: Lark.MeetingParticipant[]
      /** 会中使用的能力 */
      ability?: Lark.MeetingAbility
    }
    export type MeetingInviteStatus = {
      /** 用户ID */
      id?: string
      /** 用户类型 */
      user_type?: number
      /** 邀请结果 */
      status?: number
    }
    export type MeetingParticipantResult = {
      /** 用户ID */
      id?: string
      /** 用户类型 */
      user_type?: number
      /** 结果 */
      result?: number
    }
    export type MeetingRecording = {
      /** 录制文件URL */
      url?: string
      /** 录制总时长（单位msec） */
      duration?: string
    }
    export type RecordingPermissionObject = {
      /** 授权对象ID */
      id?: string
      /** 授权对象类型 */
      type: number
      /** 授予权限 */
      permission: number
    }
    export type ReportMeetingDaily = {
      /** 日期（unix时间，单位sec） */
      date?: string
      /** 会议数量 */
      meeting_count?: string
      /** 会议时长（单位sec） */
      meeting_duration?: string
      /** 参会人数 */
      participant_count?: string
    }
    export type Report = {
      /** 总会议数量 */
      total_meeting_count?: string
      /** 总会议时长（单位sec） */
      total_meeting_duration?: string
      /** 总参会人数 */
      total_participant_count?: string
      /** 每日会议报告列表 */
      daily_report?: Lark.ReportMeetingDaily[]
    }
    export type ReportTopUser = {
      /** 用户ID */
      id?: string
      /** 用户名 */
      name?: string
      /** 用户类型 */
      user_type?: number
      /** 会议数量 */
      meeting_count?: string
      /** 会议时长（单位sec） */
      meeting_duration?: string
    }
    export type RoomLevel = {
      /** 层级ID */
      room_level_id?: string
      /** 层级名称 */
      name?: string
      /** 父层级ID */
      parent_id?: string
      /** 层级路径 */
      path?: string[]
      /** 是否有子层级 */
      has_child?: boolean
      /** 自定义层级id */
      custom_group_id?: string
    }
    export type RoomStatus = {
      /** 是否启用会议室 */
      status: boolean
      /** 会议室未来状态为启用或禁用 */
      schedule_status?: boolean
      /** 禁用开始时间（unix时间，单位sec） */
      disable_start_time?: string
      /** 禁用结束时间（unix时间，单位sec，数值0表示永久禁用） */
      disable_end_time?: string
      /** 禁用原因 */
      disable_reason?: string
      /** 联系人列表，id类型由user_id_type参数决定 */
      contact_ids?: string[]
      /** 是否在禁用时发送通知给预定了该会议室的员工 */
      disable_notice?: boolean
      /** 是否在恢复启用时发送通知给预定了该会议室的员工 */
      resume_notice?: boolean
    }
    export type Device = {
      /** 设施名称 */
      name: string
    }
    export type Room = {
      /** 会议室ID */
      room_id?: string
      /** 会议室名称 */
      name?: string
      /** 会议室能容纳的人数 */
      capacity?: number
      /** 会议室的相关描述 */
      description?: string
      /** 会议室的展示ID */
      display_id?: string
      /** 自定义的会议室ID */
      custom_room_id?: string
      /** 层级ID */
      room_level_id?: string
      /** 层级路径 */
      path?: string[]
      /** 会议室状态 */
      room_status?: Lark.RoomStatus
      /** 设施信息列表 */
      device?: Lark.Device[]
    }
    export type RoomDigitalSignageMaterial = {
      /** 素材ID */
      id?: string
      /** 素材名称 */
      name?: string
      /** 素材类型 */
      material_type?: number
      /** 素材url */
      url?: string
      /** 播放时长（单位sec） */
      duration?: number
      /** 素材封面url */
      cover?: string
      /** 素材文件md5 */
      md5?: string
      /** 素材文件vid */
      vid?: string
      /** 素材文件大小（单位byte） */
      size?: string
    }
    export type RoomDigitalSignage = {
      /** 是否覆盖子层级及会议室 */
      if_cover_child_scope?: boolean
      /** 是否开启数字标牌功能 */
      enable?: boolean
      /** 是否静音播放 */
      mute?: boolean
      /** 日程会议开始前n分钟结束播放 */
      start_display?: number
      /** 会议结束后n分钟开始播放 */
      stop_display?: number
      /** 素材列表 */
      materials?: Lark.RoomDigitalSignageMaterial[]
    }
    export type RoomConfig = {
      /** 飞书会议室背景图 */
      room_background?: string
      /** 飞书签到板背景图 */
      display_background?: string
      /** 飞书会议室数字标牌 */
      digital_signage?: Lark.RoomDigitalSignage
      /** 飞书投屏盒子数字标牌 */
      room_box_digital_signage?: Lark.RoomDigitalSignage
      /** 会议室状态 */
      room_status?: Lark.RoomStatus
    }
    export type ScopeConfig = {
      /** 查询节点范围 */
      scope_type: number
      /** 查询节点ID：如果scope_type为1，则为层级ID，如果scope_type为2，则为会议室ID */
      scope_id: string
      /** 节点配置 */
      scope_config?: Lark.RoomConfig
    }
    export type SubscribeUser = {
      /** 预订人id */
      user_id: string
    }
    export type ApprovalConfig = {
      /** 预定审批开关，0关闭，1打开 */
      approval_switch?: number
      /** 预定审批条件，0所有预定需要审批，1满足条件需审批 */
      approval_condition?: number
      /** 超过 meeting_duration小时需要审批 */
      meeting_duration?: number
      /** 审批人列表 */
      approvers?: Lark.SubscribeUser[]
    }
    export type TimeConfig = {
      /** 是否覆盖子层级及会议室 */
      if_cover_child_scope?: boolean
      /** 预定时间开关，0关闭，1开启 */
      time_switch: number
      /** 最早可提前#{days_in_advance}天预定会议室，以天为单位 */
      days_in_advance?: number
      /** 开放当天可于#{opening_hour} 开始预定，以秒为单位 */
      opening_hour?: string
      /** 每日可预定时间范围开始时间，以秒为单位 */
      start_time?: string
      /** 每日可预定时间范围结束时间，以秒为单位 */
      end_time?: string
      /** 单次可预定时长上限,以小时为单位 */
      max_duration?: number
    }
    export type SubscribeDepartment = {
      /** 预定部门id */
      department_id: string
    }
    export type ReserveScopeConfig = {
      /** 是否覆盖子层级及会议室 */
      if_cover_child_scope?: boolean
      /** 可预定成员范围，0部分成员，1全部成员 */
      allow_all_users?: number
      /** 可预定成员列表 */
      allow_users?: Lark.SubscribeUser[]
      /** 可预定部门列表 */
      allow_depts?: Lark.SubscribeDepartment[]
    }
    export type ReserveFormConfig = {
      /** 是否覆盖子层级及会议室 */
      if_cover_child_scope?: boolean
      /** 预定表单开关 */
      reserve_form: boolean
      /** 通知人列表 */
      notified_users?: Lark.SubscribeUser[]
      /** 最晚于会议开始前 notified_time收到通知(单位:分/时/天) */
      notified_time?: number
      /** 时间单位,1为分钟;2为小时;3为天，默认为天 */
      time_unit?: number
    }
    export type ReserveAdminConfig = {
      /** 预定管理部门 */
      depts?: Lark.SubscribeDepartment[]
      /** 预定管理用户 */
      users?: Lark.SubscribeUser[]
    }
    export type DisableInformConfig = {
      /** 是否覆盖子层级及会议室 */
      if_cover_child_scope?: boolean
      /** 禁用状态变更通知开关 */
      if_inform: boolean
      /** 通知成员列表 */
      informed_users?: Lark.SubscribeUser[]
      /** 通知部门列表 */
      informed_depts?: Lark.SubscribeDepartment[]
    }
    export type MeetingInfo = {
      /** 9位会议号 */
      meeting_id?: string
      /** 会议主题 */
      meeting_topic?: string
      /** 组织者 */
      organizer?: string
      /** 部门 */
      department?: string
      /** 用户ID */
      user_id?: string
      /** 工号 */
      employee_id?: string
      /** 邮箱 */
      email?: string
      /** 手机 */
      mobile?: string
      /** 会议开始时间 */
      meeting_start_time?: string
      /** 会议结束时间 */
      meeting_end_time?: string
      /** 会议持续时间 */
      meeting_duration?: string
      /** 参会人数 */
      number_of_participants?: string
      /** 音频 */
      audio?: boolean
      /** 视频 */
      video?: boolean
      /** 共享 */
      sharing?: boolean
      /** 录制 */
      recording?: boolean
      /** 电话 */
      telephone?: boolean
    }
    export type Participant = {
      /** 参会者 */
      participant_name?: string
      /** 部门 */
      department?: string
      /** 用户ID */
      user_id?: string
      /** 工号 */
      employee_id?: string
      /** 电话 */
      phone?: string
      /** 邮箱 */
      email?: string
      /** 设备 */
      device?: string
      /** 客户端版本 */
      app_version?: string
      /** 公网IP */
      public_ip?: string
      /** 内网IP */
      internal_ip?: string
      /** 代理服务 */
      use_rtc_proxy?: boolean
      /** 位置 */
      location?: string
      /** 网络类型 */
      network_type?: string
      /** 连接类型 */
      protocol?: string
      /** 麦克风 */
      microphone?: string
      /** 扬声器 */
      speaker?: string
      /** 摄像头 */
      camera?: string
      /** 音频 */
      audio?: boolean
      /** 视频 */
      video?: boolean
      /** 共享 */
      sharing?: boolean
      /** 入会时间 */
      join_time?: string
      /** 离会时间 */
      leave_time?: string
      /** 参会时长 */
      time_in_meeting?: string
      /** 离会原因 */
      leave_reason?: string
    }
    export type QualityNetwork = {
      /** 时间 */
      time?: string
      /** 网络延迟 */
      network_delay?: string
      /** 码率（接收） */
      bitrate_received?: string
      /** 丢包 - 平均（接收） */
      packet_loss_avg_received?: string
      /** 丢包 - 最大（接收） */
      packet_loss_max_received?: string
      /** 码率（发送） */
      bitrate_sent?: string
      /** 丢包 - 平均（发送） */
      packet_loss_avg_sent?: string
      /** 丢包 - 最大（发送） */
      packet_loss_max_sent?: string
    }
    export type QualityAudio = {
      /** 时间 */
      time?: string
      /** 麦克风采集音量 */
      mic_input_volume?: string
      /** 扬声器播放音量 */
      speaker_volume?: string
      /** 码率（接收） */
      bitrate_received?: string
      /** 延迟（接收） */
      latency_received?: string
      /** 抖动（接收） */
      jitter_received?: string
      /** 码率（发送） */
      bitrate_sent?: string
      /** 延迟（发送） */
      latency_sent?: string
      /** 抖动（发送） */
      jitter_sent?: string
    }
    export type QualityVideoSharing = {
      /** 时间 */
      time?: string
      /** 码率（接收） */
      bitrate_received?: string
      /** 延迟（接收） */
      latency_received?: string
      /** 抖动（接收） */
      jitter_received?: string
      /** 最大分辨率（接收） */
      maximum_resolution_received?: string
      /** 帧率（接收） */
      framerate_received?: string
      /** 码率（发送） */
      bitrate_sent?: string
      /** 延迟（发送） */
      latency_sent?: string
      /** 抖动（发送） */
      jitter_sent?: string
      /** 最大分辨率（发送） */
      maximum_resolution_sent?: string
      /** 帧率（发送） */
      framerate_sent?: string
    }
    export type QualityCpuUsage = {
      /** 时间 */
      time?: string
      /** 客户端平均 CPU 占用 */
      client_avg_cpu_usage?: string
      /** 客户端最大 CPU 占用 */
      client_max_cpu_usage?: string
      /** 系统平均 CPU 占用 */
      system_avg_cpu_usage?: string
      /** 系统最大 CPU 占用 */
      system_max_cpu_usage?: string
    }
    export type ParticipantQuality = {
      /** 网络 */
      network?: Lark.QualityNetwork
      /** 音频 */
      audio?: Lark.QualityAudio
      /** 视频 */
      video?: Lark.QualityVideoSharing
      /** 共享屏幕 */
      screen_sharing?: Lark.QualityVideoSharing
      /** Cpu使用量 */
      cpu_usage?: Lark.QualityCpuUsage
    }
    export type RoomMeetingReservation = {
      /** 会议室ID */
      room_id?: string
      /** 会议室名称 */
      room_name?: string
      /** 会议标题 */
      event_title?: string
      /** 预定人 */
      reserver?: string
      /** 预定人所属部门 */
      department_of_reserver?: string
      /** 邀约人数 */
      guests_number?: string
      /** 接受人数 */
      accepted_number?: string
      /** 会议开始时间 */
      event_start_time?: string
      /** 会议结束时间 */
      event_end_time?: string
      /** 会议时长 */
      event_duration?: string
      /** 会议室预定状态 */
      reservation_status?: string
      /** 签到设备 */
      check_in_device?: string
      /** 会议室签到状态 */
      room_check_in_status?: string
      /** 会议室签到时间 */
      check_in_time?: string
      /** 是否提前释放 */
      is_release_early?: string
      /** 释放人 */
      releasing_person?: string
      /** 释放时间 */
      releasing_time?: string
    }
    export type Contact = {
      contact_type?: number
      /** 联系人名 */
      contact_name?: string
    }
    export type Alert = {
      /** 告警ID */
      alert_id?: string
      /** 触发告警规则的会议室/服务器具体的名称 */
      resource_scope?: string
      /** 触发告警规则的监控对象 */
      monitor_target?: number
      /** 告警规则的规则描述 */
      alert_strategy?: string
      /** 告警通知发生时间（unix时间，单位sec） */
      alert_time?: string
      /** 告警等级：严重/警告/提醒 */
      alert_level?: number
      /** 告警联系人 */
      contacts?: Lark.Contact[]
      /** 通知方式 */
      notifyMethods?: number[]
      /** 规则名称 */
      alertRule?: string
      /** 处理时间 */
      process_time?: string
      /** 恢复时间 */
      recover_time?: string
      /** 处理状态：待处理/处理中/已恢复 */
      process_status?: number
    }
    export type FlexibleRule = {
      /** 下班最多可早走（上班早到几分钟，下班可早走几分钟） */
      flexible_early_minutes: number
      /** 上班最多可晚到（上班晚到几分钟，下班须晚走几分钟） */
      flexible_late_minutes: number
    }
    export type PunchTimeRule = {
      /** 上班时间 */
      on_time: string
      /** 下班时间 */
      off_time: string
      /** 晚到多久记为迟到 */
      late_minutes_as_late: number
      /** 晚到多久记为缺卡 */
      late_minutes_as_lack: number
      /** 最早多久可打上班卡 */
      on_advance_minutes: number
      /** 早退多久记为早退 */
      early_minutes_as_early: number
      /** 早退多久记为缺卡 */
      early_minutes_as_lack: number
      /** 最晚多久可打下班卡 */
      off_delay_minutes: number
      /** 晚到多久记为严重迟到 */
      late_minutes_as_serious_late?: number
    }
    export type LateOffLateOnRule = {
      /** 晚走多久 */
      late_off_minutes: number
      /** 晚到多久 */
      late_on_minutes: number
    }
    export type RestRule = {
      /** 休息开始 */
      rest_begin_time: string
      /** 休息结束 */
      rest_end_time: string
    }
    export type OvertimeRule = {
      /** 上班时间 */
      on_overtime: string
      /** 下班时间 */
      off_overtime: string
    }
    export type Shift = {
      /** 班次Id */
      shift_id: string
      /** 班次名称 */
      shift_name: string
      /** 打卡次数 */
      punch_times: number
      /** 排班组子负责人id列表 */
      sub_shift_leader_ids?: string[]
      /** 是否弹性打卡 */
      is_flexible?: boolean
      /** 弹性打卡时间，设置【上班最多可晚到】与【下班最多可早走】时间，如果不设置flexible_rule则生效 */
      flexible_minutes?: number
      /** 弹性打卡时间设置 */
      flexible_rule?: Lark.FlexibleRule[]
      /** 不需要打下班卡 */
      no_need_off?: boolean
      /** 打卡规则 */
      punch_time_rule: Lark.PunchTimeRule[]
      /** 晚走晚到规则 */
      late_off_late_on_rule?: Lark.LateOffLateOnRule[]
      /** 休息规则 */
      rest_time_rule?: Lark.RestRule[]
      /** 打卡规则 */
      overtime_rule?: Lark.OvertimeRule[]
      /** 是否允许在非打卡时段申请打卡 */
      allow_punch_approval?: boolean
    }
    export type Machine = {
      /** 考勤机序列号 */
      machine_sn: string
      /** 考勤机名称 */
      machine_name: string
    }
    export type Location = {
      /** 地址名称 */
      location_name: string
      /** 地址类型，GPS地址，1；WiFi的Mac地址，2；IP地址。8 */
      location_type: number
      /** 地址维度 */
      latitude?: number
      /** 地址经度 */
      longitude?: number
      /** WiFi名称 */
      ssid?: string
      /** WiFi的Mac地址 */
      bssid?: string
      /** 地图类型，1：高德， 2：谷歌 */
      map_type?: number
      /** 地址名称 */
      address?: string
      /** IP地址 */
      ip?: string
      /** 额外信息，例如运营商信息 */
      feature?: string
      /** 距离范围 */
      gps_range?: number
    }
    export type FreePunchCfg = {
      /** 自由打卡开始时间 */
      free_start_time: string
      /** 自由打卡结束时间 */
      free_end_time: string
      /** 打卡的时间，一共7位，每一位代表一天，周一到周日，0是不上班，1是上班 */
      punch_day: number
      /** 工作日不打卡即为缺卡 */
      work_day_no_punch_as_lack?: boolean
      /** 工作日出勤是否需满足时长要求 */
      work_hours_demand?: boolean
      /** 每日工作时长（分钟),范围[0,1440] */
      work_hours?: number
    }
    export type PunchSpecialDateShift = {
      /** 打卡日期 */
      punch_day: number
      /** 班次 ID */
      shift_id: string
    }
    export type MemberStatusChange = {
      /** 是否入职日上班无需打卡 */
      onboarding_on_no_need_punch?: boolean
      /** 是否入职日下班无需打卡 */
      onboarding_off_no_need_punch?: boolean
      /** 是否离职日上班无需打卡 */
      offboarding_on_no_need_punch?: boolean
      /** 是否离职日下班无需打卡 */
      offboarding_off_no_need_punch?: boolean
    }
    export type LeaveNeedPunchCfg = {
      /** 晚到超过多久记为迟到 */
      late_minutes_as_late?: number
      /** 晚到超过多久记为缺卡 */
      late_minutes_as_lack?: number
      /** 早走超过多久记为早退 */
      early_minutes_as_early?: number
      /** 早走超过多久记为缺卡 */
      early_minutes_as_lack?: number
    }
    export type ScopeValue = {
      /** 标识Key */
      key?: string
      /** 名称 */
      name?: string
    }
    export type ScopeGroup = {
      /** 类型： 1: 部门 2：人员 3:国家地区 4:员工类型 5:工作城市 6:职级 7:序列 8:职务（企业版）9:工时制度（企业版） 100:自定义字段（企业版） */
      scope_value_type?: number
      /** 范围类型（是否包含） */
      operation_type?: number
      /** 如果是人员/部门类型 不需要使用该字段 */
      right?: Lark.ScopeValue[]
      /** 部门/人员id列表（具体类型根据scope_value_type判断） */
      member_ids?: string[]
      /** 企业版自定义字段唯一键 ID, 需要从飞书人事那边获取 */
      custom_field_ID?: string
      /** 企业版自定义字段对象类型  "employment":主数据对象，员工雇佣信息 , "person":主数据对象，个人 */
      custom_field_obj_type?: string
    }
    export type PunchMember = {
      /** 圈人方式：0 无 1全部 2自定义 */
      rule_scope_type?: number
      /** 圈人规则列表 */
      scope_group_list?: Lark.ScopeGroup
    }
    export type GroupMeta = {
      /** 考勤组id */
      group_id: string
      /** 考勤组名称 */
      group_name: string
    }
    export type UserDailyShift = {
      /** 考勤组ID */
      group_id: string
      /** 班次ID */
      shift_id: string
      /** 月份 */
      month: number
      /** 用户工号 */
      user_id: string
      /** 日期 */
      day_no: number
    }
    export type ChildItem = {
      /** 二级表头code */
      code: string
      /** 值 */
      value: string
    }
    export type Item = {
      /** 用户统计设置一级项 */
      code: string
      /** 用户统计设置二级项 */
      child_items?: Lark.ChildItem[]
    }
    export type UserStatsView = {
      /** 视图id */
      view_id: string
      /** 视图类型 */
      stats_type: string
      /** 用户id */
      user_id: string
      /** 用户设置字段 */
      items?: Lark.Item[]
    }
    export type ChildField = {
      /** 统计数据子字段code */
      code: string
      /** 统计数据子字段名称 */
      title: string
      /** 时间单位 */
      time_unit?: string
    }
    export type Field = {
      /** 统计数据父字段code */
      code: string
      /** 统计数据父字段名称 */
      title: string
      /** 统计数据子字段 */
      child_fields?: Lark.ChildField[]
    }
    export type UserStatsField = {
      /** 视图类型 */
      stats_type: string
      /** 用户id */
      user_id: string
      /** 字段名称 */
      fields: Lark.Field[]
    }
    export type UserStatsDataFeature = {
      /** 统计数据列附加属性的名称 */
      key: string
      /** 统计数据列附加属性的值 */
      value: string
    }
    export type UserStatsDataCell = {
      /** code */
      code: string
      /** value */
      value: string
      /** 属性 */
      features?: Lark.UserStatsDataFeature[]
      /** title */
      title?: string
    }
    export type UserStatsData = {
      /** 用户姓名 */
      name: string
      /** 用户id */
      user_id: string
      /** 用户的统计数据 */
      datas?: Lark.UserStatsDataCell[]
    }
    export type UserOut = {
      /** 审批实例id */
      approval_id?: string
      /** 外出类型唯一ID，代表一种假期类型，长度小于14 */
      uniq_id: string
      /** 外出时长单位。可用值：1：上半天；2：下半天；3：全天；4：小时。 */
      unit: number
      /** 外出时长（单位秒） */
      interval: number
      /** 开始时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      start_time: string
      /** 结束时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      end_time: string
      /** 外出多语言展示，格式为map，key为["ch"、"en"、"ja"]，其中ch代表中文，en 代表英文、ja代表日文 */
      i18n_names: Lark.I18nNames
      /** 默认语言类型，由于飞书客户端支持中、英、日三种语言，如果用户切换语言时，假期名称没有对应语言的名称，会使用默认语言的名称 */
      default_locale: string
      /** 外出理由 */
      reason: string
      /** 审批通过时间 */
      approve_pass_time?: string
      /** 审批申请时间 */
      approve_apply_time?: string
    }
    export type UserLeave = {
      /** 审批实例id */
      approval_id?: string
      /** 假期类型唯一ID，代表一种假期类型，长度小于14 */
      uniq_id?: string
      /** 假期时长单位。可用值：1：天；2：小时；3：半天；4：半小时。 */
      unit: number
      /** 假期时长（单位秒） */
      interval: number
      /** 开始时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      start_time: string
      /** 结束时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      end_time: string
      /** 假期多语言展示，格式为map，key为["ch"、"en"、"ja"]，其中ch代表中文，en 代表英文、ja代表日文 */
      i18n_names: Lark.I18nNames
      /** 默认语言类型，由于飞书客户端支持中、英、日三种语言，如果用户切换语言时，假期名称没有对应语言的名称，会使用默认语言的名称 */
      default_locale: string
      /** 请假理由 */
      reason: string
      /** 审批通过时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      approve_pass_time?: string
      /** 审批申请时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      approve_apply_time?: string
    }
    export type UserOvertimeWork = {
      /** 审批实例id */
      approval_id?: string
      /** 加班时长 */
      duration: number
      /** 加班时长单位。可用值：1：天；2：小时。 */
      unit: number
      /** 加班类型 */
      category: number
      /** 加班规则类型 */
      type: number
      /** 开始时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      start_time: string
      /** 结束时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      end_time: string
    }
    export type UserTrip = {
      /** 审批实例id */
      approval_id?: string
      /** 开始时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      start_time: string
      /** 结束时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      end_time: string
      /** 出差理由 */
      reason: string
      /** 审批通过时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      approve_pass_time: string
      /** 审批申请时间，时间格式为 yyyy-MM-dd HH:mm:ss */
      approve_apply_time: string
    }
    export type UserApproval = {
      /** 审批用户工号 */
      user_id: string
      /** 审批作用日期 */
      date: string
      /** 外出的信息 */
      outs?: Lark.UserOut[]
      /** 请假的信息 */
      leaves?: Lark.UserLeave[]
      /** 加班的信息 */
      overtime_works?: Lark.UserOvertimeWork[]
      /** 出差 */
      trips?: Lark.UserTrip[]
      /** 计算时间所用的时区信息，为空是0时区 */
      time_zone?: string
    }
    export type ApprovalInfo = {
      /** 审批实例id */
      approval_id: string
      /** 审批类型，remedy为补卡 */
      approval_type: string
      /** 审批状态，1为不通过，2为通过，4为撤销 */
      status: number
    }
    export type UserTaskRemedy = {
      /** 用户工号 */
      user_id: string
      /** 补卡日期 */
      remedy_date: number
      /** 第几次上下班，可能值0，1，2 */
      punch_no: number
      /** 上班/下班，1是上班，2是下班 */
      work_type: number
      /** 审批id */
      approval_id?: string
      /** 补卡时间 */
      remedy_time: string
      /** 补卡状态 */
      status?: number
      /** 补卡原因 */
      reason: string
      /** 补卡时间戳，精确到秒的时间戳 */
      time?: string
      /** 补卡时考勤组时区 */
      time_zone?: string
      /** 补卡发起时间，精确到秒的时间戳 */
      create_time?: string
      /** 补卡状态更新时间，精确到秒的时间戳 */
      update_time?: string
    }
    export type UserAllowedRemedy = {
      /** 用户id */
      user_id: string
      /** 补卡日期 */
      remedy_date: number
      /** 是否为自由班次 */
      is_free_punch?: boolean
      /** 第几次上下班，可能值0，1，2 */
      punch_no?: number
      /** 上班/下班，1是上班，2是下班 */
      work_type?: number
      /** 打卡状态，可用值：Early（早退），Late（迟到），Lack（缺卡） */
      punch_status?: string
      /** 正常应打卡时间 */
      normal_punch_time?: string
      /** 可选补卡时间的最小值 */
      remedy_start_time?: string
      /** 可选补卡时间的最大值 */
      remedy_end_time?: string
    }
    export type UserFlow = {
      /** 用户工号 */
      user_id: string
      /** 记录创建者的工号 */
      creator_id: string
      /** 打卡位置名称信息 */
      location_name: string
      /** 打卡时间，精确到秒的时间戳 */
      check_time: string
      /** 打卡备注 */
      comment: string
      /** 打卡记录ID */
      record_id?: string
      /** 打卡wifi ssid */
      ssid?: string
      /** 打卡wifi MAC地址 */
      bssid?: string
      /** 是否为外勤打卡 */
      is_field?: boolean
      /** 是否为wifi打卡 */
      is_wifi?: boolean
      /** 记录生成方式 */
      type?: number
      /** 打卡照片列表 */
      photo_urls?: string[]
      /** 打卡结果 */
      check_result?: string
    }
    export type UserTask = {
      /** 打卡记录ID */
      result_id: string
      /** 用户工号 */
      user_id: string
      /** 用户姓名 */
      employee_name: string
      /** 日期 */
      day: number
      /** 考勤组ID */
      group_id: string
      /** 班次ID */
      shift_id: string
      /** 用户考勤记录 */
      records: Lark.TaskResult[]
    }
    export type UserSetting = {
      /** 用户id */
      user_id: string
      /** 人脸Key */
      face_key: string
      /** 人脸照片更新时间 */
      face_key_update_time?: string
    }
    export type LangText = {
      /** 语言码 */
      lang: string
      /** 语言码对应的文本 */
      value: string
    }
    export type LeaveEmployExpireRecord = {
      /** record id */
      id: string
      /** 员工ID */
      employment_id: string
      /** 假期类型ID */
      leave_type_id: string
      /** 授予余额数量 */
      granting_quantity: string
      /** 授予数量 扣减完后的授予数量 */
      left_granting_quantity: string
      /** 授予单位，1表示天，2表示小时 */
      granting_unit: number
      /** 生效日期，格式"2020-01-01" */
      effective_date: string
      /** 失效日期，格式"2020-01-01" */
      expiration_date: string
      /** 授予原因 */
      reason: Lark.LangText[]
      /** 是否已经被外部系统更改过 */
      is_update_by_external: boolean
      /** 授予来源 */
      accrual_source: number
      /** 假期子类型id */
      leave_sub_type_id: string
    }
    export type LeaveAccrualRecord = {
      /** 授予记录唯一ID */
      id: string
      /** 员工ID */
      employment_id: string
      /** 假期类型ID */
      leave_type_id: string
      /** 授予数量 */
      granting_quantity: string
      /** 授予单位，1表示天，2表示小时 */
      granting_unit: number
      /** 生效日期，格式"2020-01-01" */
      effective_date: string
      /** 失效日期，格式"2020-01-01" */
      expiration_date: string
      /** 授予来源，1：系统授予；2：手动授予；3：外部系统授予 */
      granted_by: number
      /** 授予原因 */
      reason: Lark.LangText[]
      /** 授予记录的创建时间，unix时间戳 */
      created_at: string
      /** 授予记录的创建人的ID */
      created_by: string
      /** 授予记录的更新时间，unix时间戳 */
      updated_at: string
      /** 授予记录的更新人的ID */
      updated_by: string
    }
    export type ApprovalCreateViewers = {
      /** 可见人类型，如果 viewer_type 是 TENANT 和 NONE,  viewer_user_id， viewer_department_id可不填 */
      viewer_type?: string
      /** 当 viewer_type 是 USER，根据user_id_type填写用户id */
      viewer_user_id?: string
      /** 当 view_type 为DEPARTMENT，根据department_id_type填写部门id */
      viewer_department_id?: string
    }
    export type ApprovalForm = {
      /** 审批定义表单内容，json 数组 */
      form_content: string
      /** 控件之间数据条件约束表达式 */
      widget_relation?: string
    }
    export type ApprovalApproverCcer = {
      /** 审批节点上的审批人，1.当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时，需要在 level 中填写对应的级数，例如：由下往上三级主管审批，level = 3；2.当 type 为 Personal 时，需要根据x_user_id填写user_id，用于指定用户；3.当 approver 为 Free 发起人自选时，不需要指定 user_id ；ccer不支持 Free 发起人自选 */
      type: string
      /** 用户id，根据user_id_type填写 */
      user_id?: string
      /** 审批级数，当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时，需要在 level 中填写对应的级数，例如：由下往上三级主管审批，level = 3 */
      level?: string
    }
    export type FieldGroup = {
      /** 可写权限的表单项的 id列表 */
      writable: string[]
      /** 可读权限的表单项的 id列表 */
      readable: string[]
    }
    export type ApproverRange = {
      /** 审批人类型 */
      type?: string
      /** 审批人id */
      id_list?: string[]
    }
    export type ApprovalNode = {
      /** 节点 ID，开始节点的 ID 为 START，结束节点的 ID 为 END，开始和结束节点不需要指定 name、node_type 以及 approver */
      id: string
      /** 节点名称的国际化文案 Key，以 @i18n@ 开头，长度不得少于 9 个字符 */
      name?: string
      /** 审批类型枚举,当 node_type 为依次审批时，审批人必须为『发起人自选』 */
      node_type?: string
      /** 审批人列表 */
      approver?: Lark.ApprovalApproverCcer[]
      /** 抄送人列表 */
      ccer?: Lark.ApprovalApproverCcer[]
      /** 表单项的控件权限 */
      privilege_field?: Lark.FieldGroup
      /** 自选审批人是否允许多选 */
      approver_chosen_multi?: boolean
      /** 自选审批人选择范围 */
      approver_chosen_range?: Lark.ApproverRange[]
      /** 审批人为提交人时的操作 */
      starter_assignee?: string
    }
    export type ApprovalSetting = {
      /** 审批实例通过后允许撤回的时间，以秒为单位，默认 31 天，0 为不可撤回 */
      revert_interval?: number
      /** 是否支持审批通过第一个节点后撤回，默认为1，0为不支持 */
      revert_option?: number
      /** 拒绝设置 */
      reject_option?: number
      /** 快捷审批配置项，开启后可在卡片上直接审批。默认值1为启用， 0为禁用 */
      quick_approval_option?: number
    }
    export type I18nResourceText = {
      key: string
      value: string
    }
    export type I18nResource = {
      /** 语言可选值有： zh-CN：中文 en-US：英文 ja-JP：日文 */
      locale: string
      /** 文案 key, value, i18n key 以 @i18n@ 开头； 该字段主要用于做国际化，语序用户同时传多个语言的文案，审批中心会根据用户当前的语音环境使用对应的文案，如果没有传用户当前的语音环境文案，则会使用默认的语言文案。 */
      texts: Lark.I18nResourceText[]
      /** 是否默认语言，默认语言需要包含所有key，非默认语言如果key不存在会使用默认语言代替 */
      is_default: boolean
    }
    export type NodeApprover = {
      /** node id 或 custom node id */
      key?: string
      /** 通过 查看审批定义 获取 value: 审批人列表 */
      value?: string[]
    }
    export type NodeCc = {
      /** node id 或 custom node id */
      key?: string
      /** 通过 查看审批定义 获取 value: 审批人列表 */
      value?: string[]
    }
    export type PreviewNode = {
      /** 节点id */
      node_id?: string
      /** 节点名称 */
      node_name?: string
      /** 节点类型 “AND":会签  “OR”:或签 */
      node_type?: string
      /** 节点描述 */
      comments?: string[]
      /** 租户节点id */
      custom_node_id?: string
      /** 审批人id列表 */
      user_id_list?: string[]
      /** 节点结束抄送人id列表 */
      end_cc_id_list?: string[]
      /** 审批人是否为空 */
      is_empty_logic?: boolean
      /** 是否是发起人自选类型 */
      is_approver_type_free?: boolean
      /** 是否包含抄送人自选类型 */
      has_cc_type_free?: boolean
    }
    export type InstanceTask = {
      /** task id */
      id: string
      /** 审批人的用户id，自动通过、自动拒绝 时为空 */
      user_id: string
      /** 审批人 open id */
      open_id?: string
      status: string
      /** task 所属节点 id */
      node_id?: string
      /** task 所属节点名称 */
      node_name?: string
      /** task 所属节点自定义 id, 如果没设置自定义 id, 则不返回该字段 */
      custom_node_id?: string
      /** 审批方式 */
      type?: string
      /** task 开始时间 */
      start_time: string
      /** task 完成时间, 未完成为 0 */
      end_time?: string
    }
    export type InstanceComment = {
      /** 评论 id */
      id: string
      /** 发表评论用户 */
      user_id: string
      /** 发表评论用户 open id */
      open_id: string
      /** 评论内容 */
      comment: string
      /** 1564590532967 */
      create_time: string
      /** 评论附件 */
      files?: Lark.File[]
    }
    export type InstanceCcUser = {
      /** 抄送人 user id */
      user_id?: string
      /** 审批实例内抄送唯一标识 */
      cc_id?: string
      /** 抄送人 open id */
      open_id?: string
    }
    export type InstanceTimeline = {
      /** 动态类型，不同类型 ext 内的 user_id_list 含义不一样 */
      type: string
      /** 发生时间 */
      create_time: string
      /** 动态产生用户 */
      user_id?: string
      /** 动态产生用户 open id */
      open_id?: string
      /** 被抄送人列表 */
      user_id_list?: string[]
      /** 被抄送人列表 */
      open_id_list?: string[]
      /** 产生动态关联的task_id */
      task_id?: string
      /** 理由 */
      comment?: string
      /** 抄送人列表 */
      cc_user_list?: Lark.InstanceCcUser[]
      /** 动态其他信息，json格式，目前包括 user_id_list, user_id，open_id_list，open_id */
      ext: string
      /** 产生task的节点key */
      node_key?: string
      /** 审批附件 */
      files?: Lark.File[]
    }
    export type CommentAtInfo = {
      /** 被艾特人的ID */
      user_id: string
      /** 被艾特人的姓名 */
      name: string
      /** 被艾特人在评论中的位置，从0开始 */
      offset: string
    }
    export type CommentReply = {
      /** 评论ID */
      id: string
      /** 评论内容 */
      content: string
      /** 评论创建时间 */
      create_time?: string
      /** 评论更新时间 */
      update_time?: string
      /** 是否删除，0:未删除，1:已删除 */
      is_delete: number
      /** 评论中艾特人信息 */
      at_info_list?: Lark.CommentAtInfo[]
      /** 评论创建人 */
      commentator: string
      /** 附加字段 */
      extra?: string
    }
    export type Comment = {
      /** 评论ID */
      id: string
      /** 评论内容 */
      content: string
      /** 评论创建时间 */
      create_time: string
      /** 评论更新时间 */
      update_time: string
      /** 是否删除，0:未删除，1:已删除 */
      is_delete: number
      /** 评论的回复 */
      replies?: Lark.CommentReply[]
      /** 评论中艾特人信息 */
      at_info_list?: Lark.CommentAtInfo[]
      /** 评论创建人 */
      commentator: string
      /** 附加字段 */
      extra?: string
    }
    export type ApprovalCreateExternal = {
      /** 列表中用于提示审批来自哪里，i18n key， 注意不需要“来自”前缀，审批中心会拼上前缀 */
      biz_name?: string
      /** 审批定义业务类别 */
      biz_type?: string
      /** 移动端发起链接，如果设置了该链接，则会在移动端审批发起页展示该审批，用户点击后会跳转到该链接进行发起； 如果不填，则在mobile端不显示该审批 */
      create_link_mobile?: string
      /** PC端发起链接，如果设置了该链接，则会在PC端审批发起页展示该审批，用户点击后会跳转到该链接进行发起； 如果不填，则在PC端不显示该审批； */
      create_link_pc?: string
      /** 审批实例、审批任务、审批抄送是否要在PC端展示，如果为 true，则PC端列表会展示该定义下的实例信息，否则，不展示 */
      support_pc?: boolean
      /** 审批实例、审批任务、审批抄送是否要在移动端展示，如果为 true，则移动端列表会展示该定义下的实例信息，否则，不展示； support_pc和support_mobile不可都为false，否则不展示 */
      support_mobile?: boolean
      /** 是否支持批量已读 */
      support_batch_read?: boolean
      /** 是否支持标注可读 */
      enable_mark_readed?: boolean
      /** 是否支持快速操作 */
      enable_quick_operate?: boolean
      /** 三方系统的操作回调 url，【待审批】列表的任务审批人点同意或拒绝操作后，审批中心调用该地址通知三方系统，回调地址相关信息可参见：https://open.feishu.cn/document/ukTMukTMukTM/ukjNyYjL5YjM24SO2IjN/quick-approval-callback */
      action_callback_url?: string
      /** 回调时带的 token， 用于业务系统验证请求来自审批,具体参考 https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM */
      action_callback_token?: string
      /** 请求参数加密密钥，如果配置了该参数，则会对请求参数进行加密，业务需要对请求进行解密，加解密算法参考 https://open.feishu.cn/document/ukTMukTMukTM/uADM4QjLwADO04CMwgDN */
      action_callback_key?: string
      /** 是否支持批量审批 */
      allow_batch_operate?: boolean
      /** 审批流程数据是否不纳入效率统计 */
      exclude_efficiency_statistics?: boolean
    }
    export type ExternalInstanceLink = {
      /** pc 端的跳转链接，当用户使用飞书 pc 端时，使用该字段进行跳转 */
      pc_link: string
      /** 移动端 跳转链接，当用户使用飞书 移动端时，使用该字段进行跳转 */
      mobile_link?: string
    }
    export type ExternalInstanceForm = {
      /** 表单字段名称 */
      name?: string
      /** 表单值 */
      value?: string
    }
    export type ActionConfig = {
      /** 操作类型，每个任务都可以配置2个操作，会展示审批列表中，当用户操作时，回调请求会带上该字段，表示用户进行了同意操作还是拒绝操作。APPROVE - 同意 REJECT - 拒绝 {KEY} - 任意字符串，如果使用任意字符串，则需要提供 action_name */
      action_type: string
      /** 操作名称，i18n key 用于前台展示，如果 action_type 不是 APPROVAL和REJECT，则必须提供该字段，用于展示特定的操作名称 */
      action_name?: string
      /** 是否需要意见, 如果为true,则用户操作时，会跳转到 意见填写页面 */
      is_need_reason?: boolean
      /** 审批意见是否必填 */
      is_reason_required?: boolean
      /** 意见是否支持上传附件 */
      is_need_attachment?: boolean
    }
    export type ExternalInstanceTaskNode = {
      /** 审批实例内的唯一标识，用于更新审批任务时定位数据 */
      task_id: string
      /** 审批人 user_id，该任务会出现在审批人的【待审批】或【已审批】列表中 */
      user_id?: string
      /** 审批人 open id，和 user id 二选一 */
      open_id?: string
      /** 审批任务名称 */
      title?: string
      /** 【待审批】或【已审批】中使用的跳转链接，用于跳转回三方系统pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
      links: Lark.ExternalInstanceLink
      /** 任务状态 */
      status: string
      /** 扩展 json */
      extra?: string
      /** 任务创建时间，Unix 毫秒时间戳 */
      create_time: string
      /** 任务完成时间：未结束的审批为 0，Unix 毫秒时间戳 */
      end_time: string
      /** task最近更新时间，用于推送数据版本控制； 更新策略同 instance 中的 update_time */
      update_time?: string
      /** 操作上下文，当用户操作时，回调请求中带上该参数，用于传递该任务的上下文数据 */
      action_context?: string
      /** 任务级别操作配置,快捷审批目前支持移动端操作 */
      action_configs?: Lark.ActionConfig[]
      /** 列表页打开审批任务的方式 */
      display_method?: string
      /** 三方任务支持不纳入效率统计 */
      exclude_statistics?: boolean
      /** 节点id */
      node_id?: string
      /** 节点名称，示例：i18n@name。需要在i18n_resources中传该名称对应的国际化文案 */
      node_name?: string
    }
    export type CcNode = {
      /** 审批实例内唯一标识 */
      cc_id: string
      /** 抄送人 employee id */
      user_id?: string
      /** 抄送人 open id，和user id 二选一 */
      open_id?: string
      /** 跳转链接，用于【抄送我的】列表中的跳转pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
      links: Lark.ExternalInstanceLink
      /** 阅读状态，空值表示不支持已读未读： */
      read_status: string
      /** 扩展 json */
      extra?: string
      /** 抄送任务名称 */
      title?: string
      /** 抄送发起时间，Unix 毫秒时间戳 */
      create_time: string
      /** 抄送最近更新时间，用于推送数据版本控制更新策略同 instance 的update_time */
      update_time: string
      /** 列表页打开审批任务的方式 */
      display_method?: string
    }
    export type TrusteeshipUrls = {
      /** 获取表单schema相关数据的url地址 */
      form_detail_url?: string
      /** 表示获取审批操作区数据的url地址 */
      action_definition_url?: string
      /** 获取审批记录相关数据的url地址 */
      approval_node_url?: string
      /** 进行审批操作时回调的url地址 */
      action_callback_url?: string
      /** 获取托管动态数据URL,使用该接口时必须要保证历史托管单据的数据中都同步了该接口地址,如果历史单据中没有该接口需要重新同步历史托管单据的数据来更新该URL */
      pull_business_data_url?: string
    }
    export type TrusteeshipInstanceCacheConfig = {
      /** 托管预缓存策略 */
      form_policy?: string
      /** 表单是否随国际化改变 */
      form_vary_with_locale?: boolean
      /** 当前使用的表单版本号，保证表单改变后，版本号增加，实际值为int64整数 */
      form_version?: string
    }
    export type ExternalInstance = {
      /** 审批定义 code， 创建审批定义返回的值，表示该实例属于哪个流程；该字段会影响到列表中该实例的标题，标题取自对应定义的 name 字段 */
      approval_code: string
      /** 审批实例状态 */
      status: string
      /** 审批实例扩展 JSON */
      extra?: string
      /** 审批实例唯一标识，用户自定义，需确保证租户、应用下唯一 */
      instance_id: string
      /** 审批实例链接集合 ，用于【已发起】列表的跳转，跳转回三方系统； pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
      links: Lark.ExternalInstanceLink
      /** 审批展示名称，如果填写了该字段，则审批列表中的审批名称使用该字段，如果不填该字段，则审批名称使用审批定义的名称 */
      title?: string
      /** 用户提交审批时填写的表单数据，用于所有审批列表中展示。可传多个值，但审批中心pc展示前2个,移动端展示前3个,长度不超过2048字符 */
      form?: Lark.ExternalInstanceForm[]
      /** 审批发起人 user_id，发起人可在【已发起】列表中看到所有已发起的审批; 在【待审批】，【已审批】【抄送我】列表中，该字段展示审批是谁发起的。审批发起人 open id，和 user id 二选一。 */
      user_id?: string
      /** 审批发起人 用户名，如果发起人不是真实的用户（例如是某个部门），没有 user_id，则可以使用该字段传名称 */
      user_name?: string
      /** 审批发起人 open id，和 user id 二选一 */
      open_id?: string
      /** 发起人部门，用于列表中展示发起人所属部门。不传则不展示。如果用户没加入任何部门，传 ""，将展示租户名称传 department_name 展示部门名称 */
      department_id?: string
      /** 审批发起人 部门，如果发起人不是真实的用户（例如是某个部门），没有 department_id，则可以使用该字段传名称 */
      department_name?: string
      /** 审批发起时间，Unix毫秒时间戳 */
      start_time: string
      /** 审批实例结束时间：未结束的审批为 0，Unix毫秒时间戳 */
      end_time: string
      /** 审批实例最近更新时间；用于推送数据版本控制如果 update_mode 值为 UPDATE，则只有传过来的 update_time 有变化时（变大），才会更新审批中心中的审批实例信息。使用该字段主要用来避免并发时老的数据更新了新的数据 */
      update_time: string
      /** 列表页打开审批实例的方式 */
      display_method?: string
      /** 更新方式， 当 update_mode=REPLACE时，每次都以当前推送的数据为最终数据，会删掉审批中心中多余的任务、抄送数据（不在这次推送的数据中）; 当 update_mode=UPDATE时，则不会删除审批中心的数据，而只是进行新增和更新实例、任务数据 */
      update_mode?: string
      /** 任务列表 */
      task_list?: Lark.ExternalInstanceTaskNode[]
      /** 抄送列表 */
      cc_list?: Lark.CcNode[]
      /** 国际化文案 */
      i18n_resources: Lark.I18nResource[]
      /** 单据托管认证token，托管回调会附带此token，帮助业务方认证 */
      trusteeship_url_token?: string
      /** 用户的类型，会影响请求参数用户标识域的选择，包括加签操作回传的目标用户， 目前仅支持 "user_id" */
      trusteeship_user_id_type?: string
      /** 单据托管回调接入方的接口的URL地址 */
      trusteeship_urls?: Lark.TrusteeshipUrls
      /** 托管预缓存策略 */
      trusteeship_cache_config?: Lark.TrusteeshipInstanceCacheConfig
    }
    export type ExternalInstanceTask = {
      /** 任务 id */
      task_id: string
      /** 任务最近更新时间 */
      update_time: string
    }
    export type ExteranlInstanceCheck = {
      /** 审批实例 id */
      instance_id: string
      /** 审批实例最近更新时间 */
      update_time: string
      /** 任务信息 */
      tasks: Lark.ExternalInstanceTask[]
    }
    export type ExteranlInstanceCheckResponse = {
      /** 审批实例 id */
      instance_id: string
      /** 任务最近更新时间 */
      update_time?: string
      /** 任务信息 */
      tasks?: Lark.ExternalInstanceTask[]
    }
    export type ExternalTaskItem = {
      /** 审批任务 ID */
      id: string
      /** 审批任务状态 */
      status: string
      /** 审批任务最后更新时间，单位 毫秒 */
      update_time: string
    }
    export type ExternalTaskList = {
      /** 审批实例 ID */
      instance_id: string
      /** 审批的id */
      approval_id: string
      /** 审批对应的 approval_code */
      approval_code: string
      /** 审批实例当前的状态 */
      status: string
      /** 审批实例最后更新时间，单位 毫秒 */
      update_time: string
      /** 审批实例下的审批任务 */
      tasks?: Lark.ExternalTaskItem[]
    }
    export type InstanceSearchApprovalExternal = {
      /** 是否支持批量读 */
      batch_cc_read?: boolean
    }
    export type InstanceSearchApproval = {
      /** 审批定义 code */
      code?: string
      /** 审批定义名称 */
      name?: string
      /** 是否为第三方审批 */
      is_external?: boolean
      /** 第三方审批信息 */
      external?: Lark.InstanceSearchApprovalExternal
      /** 审批定义Id */
      approval_id?: string
      /** 审批定义图标信息 */
      icon?: string
    }
    export type InstanceSearchGroup = {
      /** 审批定义分组外部 id */
      external_id?: string
      /** 审批定义分组名称 */
      name?: string
    }
    export type InstanceSearchLink = {
      /** 审批实例 pc 端链接 */
      pc_link?: string
      /** 审批实例移动端链接 */
      mobile_link?: string
    }
    export type InstanceSearchNode = {
      /** 审批实例 code */
      code?: string
      /** 审批实例外部 id */
      external_id?: string
      /** 审批实例发起人 id */
      user_id?: string
      /** 审批实例开始时间 */
      start_time?: string
      /** 审批实例结束时间 */
      end_time?: string
      /** 审批实例状态 */
      status?: string
      /** 审批实例名称（只有第三方审批有） */
      title?: string
      /** 审批实例扩展字段，string型json */
      extra?: string
      /** 审批流水号 */
      serial_id?: string
      /** 审批实例链接（只有第三方审批有） */
      link?: Lark.InstanceSearchLink
    }
    export type InstanceSearchItem = {
      /** 审批定义 */
      approval?: Lark.InstanceSearchApproval
      /** 审批定义分组 */
      group?: Lark.InstanceSearchGroup
      /** 审批实例信息 */
      instance?: Lark.InstanceSearchNode
    }
    export type CcSearchNode = {
      /** 审批实例发起人 id */
      user_id?: string
      /** 审批实例开始时间 */
      create_time?: string
      /** 审批实例状态 */
      read_status?: string
      /** 审批实例名称（只有第三方审批有） */
      title?: string
      /** 审批实例扩展字段，string型json */
      extra?: string
      /** 审批实例链接（只有第三方审批有） */
      link?: Lark.InstanceSearchLink
    }
    export type CcSearchItem = {
      /** 审批定义 */
      approval?: Lark.InstanceSearchApproval
      /** 审批定义分组 */
      group?: Lark.InstanceSearchGroup
      /** 审批实例信息 */
      instance?: Lark.InstanceSearchNode
      /** 审批任务 */
      cc?: Lark.CcSearchNode
    }
    export type TaskSearchNode = {
      /** 审批任务发起人 id */
      user_id?: string
      /** 审批任务开始时间 */
      start_time?: string
      /** 审批任务结束时间 */
      end_time?: string
      /** 审批任务状态 */
      status?: string
      /** 审批实例名称（只有第三方审批有） */
      title?: string
      /** 审批任务扩展字段，string型json */
      extra?: string
      /** 审批任务链接（只有第三方审批有） */
      link?: Lark.InstanceSearchLink
      /** 任务id */
      task_id?: string
      /** 审批任务更新时间 */
      update_time?: string
      /** 三方审批扩展 ID */
      task_external_id?: string
    }
    export type TaskSearchItem = {
      /** 审批定义 */
      approval?: Lark.InstanceSearchApproval
      /** 审批定义分组 */
      group?: Lark.InstanceSearchGroup
      /** 审批实例信息 */
      instance?: Lark.InstanceSearchNode
      /** 审批任务 */
      task?: Lark.TaskSearchNode
    }
    export type TaskUrls = {
      /** 帮助服务台 URL */
      helpdesk?: string
      /** 移动端 URL */
      mobile?: string
      /** PC 端 URL */
      pc?: string
    }
    export type WeekdaySchedule = {
      /** 开始时间, format 00:00 - 23:59 */
      start_time?: string
      /** 结束时间, format 00:00 - 23:59 */
      end_time?: string
      /** 星期几, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday, 9 - Everday, 10 - Weekday, 11 - Weekend */
      weekday?: number
    }
    export type AgentScheduleUpdateInfo = {
      /** agent id */
      agent_id?: string
      /** schedule listing */
      schedule?: Lark.WeekdaySchedule[]
      /** skill ids */
      agent_skill_ids?: string[]
    }
    export type AgentUser = {
      /** user id */
      id?: string
      /** user avartal url */
      avatar_url?: string
      /** user name */
      name?: string
      /** user email */
      email?: string
      /** user department */
      department?: string
      /** company */
      company_name?: string
    }
    export type AgentSkillLessInfo = {
      /** skill id */
      id?: string
      /** name of agent skill */
      name?: string
      /** is default group type */
      is_default?: boolean
    }
    export type AgentSchedule = {
      /** status of agent */
      status?: number
      /** agent info */
      agent?: Lark.AgentUser
      /** day schedule */
      schedule?: Lark.WeekdaySchedule[]
      /** agent skills */
      agent_skills?: Lark.AgentSkillLessInfo[]
    }
    export type AgentSkillRule = {
      /** attribute id */
      id?: string
      /** selected operator, 2 for GreaterEqual, 3 for LessEqual, 4 for RangeValue, 5 for In, 6 for NotIn, 7 for MultiSelectExcludeAll, 8 for MultiSelectContainAny, 9 for ContainAny, 10 for ExcludeAll, 11 for ContainAll, 12 for MultiSelectContainAll */
      selected_operator?: number
      /** operand value based on selected_operator */
      operand?: string
      /** 1 for FAQ, 2 for Ticket, 3 for User, 4 for PreInquiryForm */
      category?: number
    }
    export type AgentSkill = {
      /** name of agent skill */
      name?: string
      /** rules for group */
      rules?: Lark.AgentSkillRule[]
      /** agent ids in this group */
      agent_ids?: string[]
    }
    export type Agent = {
      /** user id */
      id?: string
      /** user avatar url */
      avatar_url?: string
      /** user name */
      name?: string
    }
    export type TicketUser = {
      /** user id */
      id?: string
      /** user avartal url */
      avatar_url?: string
      /** user name */
      name?: string
      /** user email */
      email?: string
      /** user department */
      department?: string
      /** 城市 */
      city?: string
      /** 国家代号(CountryCode)，参考：http://www.mamicode.com/info-detail-2186501.html */
      country?: string
    }
    export type Comments = {
      /** 备注 */
      content?: string
      /** 备注时间，单位毫秒 */
      created_at?: number
      /** 备注ID */
      id?: number
      /** 备注人头像 */
      user_avatar_url?: string
      /** 备注人姓名 */
      user_name?: string
      /** 备注人ID */
      user_id?: number
    }
    export type I18n = {
      /** 中文描述 */
      zh_cn?: string
      /** 英文描述 */
      en_us?: string
      /** 日文描述 */
      ja_jp?: string
    }
    export type CustomizedFieldDisplayItem = {
      /** id */
      id?: string
      /** value */
      value?: string
      /** key name */
      key_name?: string
      /** display name */
      display_name?: string
      /** position */
      position?: number
      /** required */
      required?: boolean
      /** editable */
      editable?: boolean
    }
    export type Ticket = {
      /** ticket id */
      ticket_id: string
      /** helpdesk id */
      helpdesk_id?: string
      /** guest of this ticket */
      guest?: Lark.TicketUser
      /** 备注 */
      comments?: Lark.Comments
      /** ticket type */
      ticket_type?: number
      /** ticket status */
      status?: number
      /** ticket score */
      score?: number
      /** the time when the ticket is created */
      created_at?: unknown
      /** the time when the ticket is updated */
      updated_at?: unknown
      /** the time when the ticket is closed */
      closed_at?: unknown
      /** 不满意原因 */
      dissatisfaction_reason?: Lark.I18n
      /** agents of this ticket */
      agents?: Lark.TicketUser[]
      /** the ticket channel */
      channel?: number
      /** if ticket is solved */
      solve?: number
      /** closed user of this ticket */
      closed_by?: Lark.TicketUser
      /** collaborators of this ticket */
      collaborators?: Lark.TicketUser[]
      /** ticket customized fields */
      customized_fields?: Lark.CustomizedFieldDisplayItem[]
      /** 客服服务时长，客服最后一次回复时间距离客服进入时间间隔，单位秒 */
      agent_service_duration?: number
      /** 客服首次回复时间距离客服进入时间的间隔，单位秒 */
      agent_first_response_duration?: unknown
      /** 机器人服务时间：客服进入时间距离工单创建时间的间隔，单位秒 */
      bot_service_duration?: unknown
      /** 客服解决时长，关单时间距离客服进入时间的间隔，单位秒 */
      agent_resolution_time?: unknown
      /** 工单实际处理时间：从客服进入到关单，单位秒 */
      actual_processing_time?: unknown
      /** 客服进入时间，单位毫秒 */
      agent_entry_time?: unknown
      /** 客服首次回复时间，单位毫秒 */
      agent_first_response_time?: unknown
      /** 客服最后回复时间，单位毫秒 */
      agent_last_response_time?: unknown
      /** 主责客服 */
      agent_owner?: Lark.TicketUser
    }
    export type UserQueryFaqInfo = {
      /** faq id */
      id?: string
      /** faq match score */
      score?: number
    }
    export type UserCustomizedField = {
      /** user customized field id */
      user_customized_field_id?: string
      /** user customized field id, for backward compatibility */
      id?: string
      /** help desk id */
      helpdesk_id?: string
      /** key name */
      key_name?: string
      /** display name */
      display_name?: string
      /** the position of user customized field in the page */
      position?: string
      /** type of the field */
      field_type?: string
      /** description of the field */
      description?: string
      /** if the field is visible */
      visible?: boolean
      /** if the field is editable */
      editable?: boolean
      /** if the field is required */
      required?: boolean
      /** the time when the field is created */
      created_at?: string
      /** the time when the field is updated */
      updated_at?: string
    }
    export type TicketCustomizedField = {
      /** ticket customized field id */
      ticket_customized_field_id: string
      /** help desk id */
      helpdesk_id: string
      /** key name */
      key_name: string
      /** display name */
      display_name: string
      /** the position of ticket customized field in the page */
      position: string
      /** type of the field */
      field_type: string
      /** description of the field */
      description: string
      /** if the field is visible */
      visible: boolean
      /** if the field is editable */
      editable: boolean
      /** if the field is required */
      required: boolean
      /** the time when the field is created */
      created_at?: string
      /** the time when the field is updated */
      updated_at?: string
      /** the user who created the ticket customized field */
      created_by?: Lark.TicketUser
      /** the user who recently updated the ticket customized field */
      updated_by?: Lark.TicketUser
      /** if the dropdown field supports multi-select */
      dropdown_allow_multiple?: boolean
    }
    export type TicketMessage = {
      /** message id in helpdesk */
      id?: string
      /** open message id */
      message_id?: string
      /** message type, text is the only supported type */
      message_type: string
      /** create time */
      created_at?: number
      /** message content */
      content: string
      /** user name */
      user_name?: string
      /** avatar url */
      avatar_url?: string
      /** user id */
      user_id?: string
    }
    export type FaqUpdateInfo = {
      /** faq category id */
      category_id?: string
      /** faq question */
      question: string
      /** faq answer */
      answer?: string
      /** faq answer in richtext */
      answer_richtext?: string
      /** faq tags */
      tags?: string[]
    }
    export type Richtext = {
      /** 内容 */
      content?: string
      /** 类型 */
      type?: string
    }
    export type Category = {
      /** category id */
      category_id: string
      /** category id, for backward compatibility */
      id: string
      /** category name */
      name: string
      /** parent category id, if any */
      parent_id: string
      /** helpdesk id */
      helpdesk_id: string
      /** category language */
      language?: string
    }
    export type Faq = {
      /** faq id */
      faq_id?: string
      /** faq id, for backward compatibility */
      id?: string
      /** helpdesk id */
      helpdesk_id?: string
      /** faq question */
      question?: string
      /** faq answer in plain text format */
      answer?: string
      /** faq answer in richtext format, if any */
      answer_richtext?: Lark.Richtext[]
      /** create time */
      create_time?: number
      /** update time */
      update_time?: number
      /** list of categories that faq belongs to */
      categories?: Lark.Category[]
      /** faq tags */
      tags?: string[]
      /** expire time */
      expire_time?: number
      /** update user */
      update_user?: Lark.TicketUser
      /** create user */
      create_user?: Lark.TicketUser
    }
    export type NotificationUser = {
      /** 用户id */
      user_id?: string
      /** 头像地址 */
      avatar_url?: string
      /** 用户名称 */
      name?: string
    }
    export type NotificationDepartment = {
      /** 部门ID */
      department_id?: string
      /** 部门名称 */
      name?: string
    }
    export type NotificationChat = {
      /** 会话ID */
      chat_id?: string
      /** 会话名称 */
      name?: string
    }
    export type Notification = {
      /** 唯一ID */
      id?: string
      /** 任务名称 */
      job_name?: string
      /** 0(草稿)、1(等待审批)、 2(审批未通过)、3(正在发送中)、4(发送完成)、5(等待设置发送时间)、6(取消发送)、7(新人入职执行发送)、8(等待倒计时发送) */
      status?: number
      /** 创建人 */
      create_user?: Lark.NotificationUser
      /** 创建时间（毫秒时间戳） */
      created_at?: string
      /** 更新用户 */
      update_user?: Lark.NotificationUser
      /** 更新时间（毫秒时间戳） */
      updated_at?: string
      /** 目标推送用户 */
      target_user_count?: number
      /** 已推送用户总数 */
      sent_user_count?: number
      /** 已读用户总数 */
      read_user_count?: number
      /** 推送任务触发时间（毫秒时间戳） */
      send_at?: string
      /** 推送内容，详见：https://open.feishu.cn/tool/cardbuilder?from=howtoguide */
      push_content?: string
      /** 0（定时推送：push_scope不能等于3） 1（新人入职推送：push_scope必须等于1或者3；new_staff_scope_type不能为空） */
      push_type?: number
      /** 推送范围（服务台私信） 0：组织内全部成员（user_list和department_list必须为空） 1：不推送任何成员（user_list和department_list必须为空，chat_list不可为空） 2：推送到部分成员（user_list或department_list不能为空） 3：入职新人 以上四种状态，chat_list都相对独立，只有在推送范围为1时，必须需要设置chat_list */
      push_scope_type?: number
      /** 新人入职范围类型（push_type为1时生效） 0：组织内所有新人 1：组织内特定的部门（new_staff_scope_department_list 字段不能为空） */
      new_staff_scope_type?: number
      /** 新人入职生效部门列表 */
      new_staff_scope_department_list?: Lark.NotificationDepartment[]
      /** push推送到成员列表 */
      user_list?: Lark.NotificationUser[]
      /** push推送到的部门信息列表 */
      department_list?: Lark.NotificationDepartment[]
      /** push推送到的会话列表(群) */
      chat_list?: Lark.NotificationChat[]
      /** 预留扩展字段 */
      ext?: string
    }
    export type Event = {
      /** event type */
      type: string
      /** event subtype */
      subtype: string
    }
    export type Due = {
      /** 截止时间的时间戳（单位为秒） */
      time?: string
      /** 截止时间对应的时区，完整的时区名称列表可参考：https://docs.aws.amazon.com/zh_cn/redshift/latest/dg/time-zone-names.html */
      timezone?: string
      /** 标记任务是否为全天任务（全天任务的截止时间为当天 UTC 时间的 0 点） */
      is_all_day?: boolean
    }
    export type Href = {
      /** 具体链接地址 */
      url?: string
      /** 链接对应的标题 */
      title?: string
    }
    export type Origin = {
      /** 任务导入来源的名称，用于在任务中心详情页展示。请提供一个字典，多种语言名称映射。支持的各地区语言名：it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn */
      platform_i18n_name: string
      /** 任务关联的来源平台详情页链接 */
      href?: Lark.Href
    }
    export type Follower = {
      /** 任务关注者 ID */
      id?: string
      /** 要添加为关注人的user_id */
      id_list?: string[]
    }
    export type Collaborator = {
      /** 任务协作者的 ID */
      id?: string
      /** 协作人的用户ID列表 */
      id_list?: string[]
    }
    export type I18nText = {
      /** 英文 */
      en_us?: string
      /** 中文 */
      zh_cn?: string
      /** 中文（香港地区） */
      zh_hk?: string
      /** 中文（台湾地区） */
      zh_tw?: string
      /** 日语 */
      ja_jp?: string
      /** 法语 */
      fr_fr?: string
      /** 意大利语 */
      it_it?: string
      /** 德语 */
      de_de?: string
      /** 俄语 */
      ru_ru?: string
      /** 泰语 */
      th_th?: string
      /** 西班牙语 */
      es_es?: string
      /** 韩语 */
      ko_kr?: string
    }
    export type CustomCompleteItem = {
      /** 自定义完成的跳转url */
      href?: string
      /** 自定义完成的弹出提示为 */
      tip?: Lark.I18nText
    }
    export type CustomComplete = {
      /** pc客户端自定义完成配置（含mac和windows） */
      pc?: Lark.CustomCompleteItem
      /** ios端的自定义完成配置 */
      ios?: Lark.CustomCompleteItem
      /** android端的自定义完成配置 */
      android?: Lark.CustomCompleteItem
    }
    export type TaskInTasklistInfo = {
      /** 任务所在清单的guid */
      tasklist_guid?: string
      /** 任务所在清单的自定义分组guid */
      section_guid?: string
    }
    export type Start = {
      /** 开始时间/日期的时间戳，距1970-01-01 00:00:00的毫秒数。如果开始时间是一个日期，需要把日期转换成时间戳，并设置 is_all_day=true */
      timestamp?: string
      /** 是否开始于一个日期。如果设为true，timestamp中只有日期的部分会被解析和存储。 */
      is_all_day?: boolean
    }
    export type InputCustomFieldValue = {
      /** 自定义字段guid */
      guid: string
      /** 数字类型的自定义字段值，填写一个合法数字的字符串表示，空字符串表示设为空。 */
      number_value?: string
      /** 人员类型的自定义字段值。可以设置1个或多个用户的id（遵循member格式，只支持user类型）。当字段设为只不能多选时只能输入一个值。设为空数组表示设为空。 */
      member_value?: Lark.Member[]
      /** 日期类型自定义字段值，可以输入一个表示日期的以毫秒为单位的字符串。设为空字符串表示设为空。 */
      datetime_value?: string
      /** 单选类型字段值，填写一个字段选项的option_guid。设置为空字符串表示设为空。 */
      single_select_value?: string
      /** 多选类型字段值，可以填写一个或多个本字段的option_guid。设为空数组表示设为空。 */
      multi_select_value?: string[]
    }
    export type Resource = {
      /** 资源类型 */
      type?: string
      /** 资源ID */
      id?: string
    }
    export type Attachment = {
      /** 附件guid */
      guid?: string
      /** 附件在云文档系统中的token */
      file_token?: string
      /** 附件名 */
      name?: string
      /** 附件的字节大小 */
      size?: number
      /** 附件归属的资源 */
      resource?: Lark.Resource
      /** 附件上传者 */
      uploader?: Lark.Member
      /** 是否是封面图 */
      is_cover?: boolean
      /** 上传时间戳(ms) */
      uploaded_at?: string
    }
    export type CustomFieldValue = {
      /** 字段GUID */
      guid?: string
      /** 自定义字段类型，支持"member", "datetime", "number", "single_select", "multi_select"五种类型 */
      type?: string
      /** 数字类型的自定义字段值，填写一个合法数字的字符串表示，空字符串表示设为空。 */
      number_value?: string
      /** 日期类型自定义字段值。可以输入一个表示日期的以毫秒为单位的字符串。设为空字符串表示设为空。 */
      datetime_value?: string
      /** 人员类型的自定义字段值，可以设置1个或多个用户的id（遵循member格式，只支持user类型）。当该字段的设置为“不能多选”时只能输入一个值。设为空数组表示设为空。 */
      member_value?: Lark.Member[]
      /** 单选类型字段值，填写一个字段选项的option_guid。设置为空字符串表示设为空。 */
      single_select_value?: string
      /** 多选类型字段值，可以填写一个或多个本字段的option_guid。设为空数组表示设为空。 */
      multi_select_value?: string[]
      /** 自定义字段名 */
      name?: string
    }
    export type InputTask = {
      /** 任务标题 */
      summary?: string
      /** 任务描述 */
      description?: string
      /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
      due?: Lark.Due
      /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
      extra?: string
      /** 任务的完成时刻时间戳(ms) */
      completed_at?: string
      /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
      repeat_rule?: string
      /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
      custom_complete?: Lark.CustomComplete
      /** 任务的开始时间(ms) */
      start?: Lark.Start
      /** 任务的完成模式。1 - 会签任务；2 - 或签任务 */
      mode?: number
      /** 是否是里程碑任务 */
      is_milestone?: boolean
      /** 自定义字段值 */
      custom_fields?: Lark.InputCustomFieldValue[]
    }
    export type TaskDependency = {
      /** 依赖类型 */
      type: string
      /** 依赖任务的GUID */
      task_guid: string
    }
    export type Tasklist = {
      /** 清单的全局唯一ID */
      guid?: string
      /** 清单名 */
      name?: string
      /** 清单创建者 */
      creator?: Lark.Member
      /** 清单负责人 */
      owner?: Lark.Member
      /** 清单协作人 */
      members?: Lark.Member[]
      /** 该清单分享的applink */
      url?: string
      /** 清单创建时间戳(ms) */
      created_at?: string
      /** 清单最后一次更新时间戳（ms) */
      updated_at?: string
    }
    export type InputTasklist = {
      /** 清单名称 */
      name?: string
      /** 清单所有者 */
      owner?: Lark.Member
    }
    export type TaskSummary = {
      /** 任务GUID */
      guid?: string
      /** 任务的标题 */
      summary?: string
      /** 任务完成的时间戳(ms)，为0表示未完成 */
      completed_at?: string
      /** 任务开始时间 */
      start?: Lark.Start
      /** 任务截止时间 */
      due?: Lark.Due
      /** 任务成员列表 */
      members?: Lark.Member[]
      /** 子任务的个数 */
      subtask_count?: number
    }
    export type TasklistActivitySubscription = {
      /** 订阅guid */
      guid?: string
      /** 订阅名称 */
      name?: string
      /** 订阅者 */
      subscribers?: Lark.Member[]
      /** 要订阅的清单动态类型 */
      include_keys?: number[]
      /** 该订阅是否为停用 */
      disabled?: boolean
    }
    export type InputComment = {
      /** 评论内容 */
      content?: string
    }
    export type TasklistSummary = {
      /** 清单的全局唯一ID */
      guid?: string
      /** 清单名字 */
      name?: string
    }
    export type InputSection = {
      /** 自定义分组名 */
      name?: string
      /** 要将新分组插入到自定义分分组的前面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
      insert_before?: string
      /** 要将新分组插入到自定义分分组的后面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
      insert_after?: string
    }
    export type SectionSummary = {
      /** 自定义分组的全局唯一ID */
      guid?: string
      /** 自定义分组的名称 */
      name?: string
      /** 是否是默认分组 */
      is_default?: boolean
    }
    export type NumberSetting = {
      /** 数字展示的格式 */
      format?: string
      /** 自定义符号。只有`format`设为custom时才会生效。 */
      custom_symbol?: string
      /** 自定义符号显示的位置。 */
      custom_symbol_position?: string
      /** 分隔符样式 */
      separator?: string
      /** 保留小数位数。输入的数字值的小数位数如果比该设置多，多余的位数将被四舍五入后舍弃。如果`format`为"percentage"，表示变为百分数之后的小数位数。 */
      decimal_count?: number
    }
    export type MemberSetting = {
      /** 是否支持多选 */
      multi?: boolean
    }
    export type DatetimeSetting = {
      /** 日期显示格式 */
      format?: string
    }
    export type Option = {
      /** 选项名称，不能为空，最大50个字符 */
      name: string
      /** 选项的颜色索引值，可以是0～54中的一个数字。如果不填写则会随机选一个。 */
      color_index?: number
      /** 选项是否隐藏。隐藏后的选项在界面不可见，也不可以再通过openapi将字段值设为该选项。 */
      is_hidden?: boolean
    }
    export type SelectSetting = {
      /** 单选选项 */
      options?: Lark.Option[]
    }
    export type TextSetting = {

    }
    export type CustomField = {
      /** 自定义字段的GUID */
      guid?: string
      /** 自定义字段名称 */
      name?: string
      /** 自定义字段类型 */
      type?: string
      /** 数字类型的字段设置 */
      number_setting?: Lark.NumberSetting
      /** 人员类型的字段设置 */
      member_setting?: Lark.MemberSetting
      /** 时间日期类型的字段设置 */
      datetime_setting?: Lark.DatetimeSetting
      /** 单选类型的字段设置 */
      single_select_setting?: Lark.SelectSetting
      /** 多选类型的字段设置 */
      multi_select_setting?: Lark.SelectSetting
      /** 创建人 */
      creator?: Lark.Member
      /** 自定义字段创建的时间戳(ms) */
      created_at?: string
      /** 自定义字段的更新时间戳(ms) */
      updated_at?: string
      /** 文本字段配置 */
      text_setting?: Lark.TextSetting
    }
    export type InputCustomField = {
      /** 字段名称 */
      name?: string
      /** 数字类型的字段设置 */
      number_setting?: Lark.NumberSetting
      /** 人员类型的字段设置 */
      member_setting?: Lark.MemberSetting
      /** 时间日期类型的字段设置 */
      datetime_setting?: Lark.DatetimeSetting
      /** 单选设置 */
      single_select_setting?: Lark.SelectSetting
      /** 多选设置 */
      multi_select_setting?: Lark.SelectSetting
      /** 文本类型 */
      text_setting?: Lark.TextSetting
    }
    export type InputOption = {
      /** 选项名称 */
      name?: string
      /** 颜色索引值，支持0～54中的一个数字。如果不填写，则会随机选一个。 */
      color_index?: number
      /** 要放到某个option之前的option_guid */
      insert_before?: string
      /** 要放到某个option之后的option_guid */
      insert_after?: string
      /** 是否隐藏 */
      is_hidden?: boolean
    }
    export type Mailgroup = {
      /** The unique ID of a mail group */
      mailgroup_id?: string
      /** The mail group's email address */
      email?: string
      /** The mail group's display name */
      name?: string
      /** The mail group's description */
      description?: string
      /** The number of mail group's direct members */
      direct_members_count?: string
      /** Value is true if this mail group has external member */
      include_external_member?: boolean
      /** Value is true if all company members are in this mail group */
      include_all_company_member?: boolean
      /** Who can send mail to this mail group. Possible values are:
      - ANYONE: Any Internet user can send mail to this mail group
      - ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group
      - ALL_GROUP_MEMBERS: Any group member can send mail to this mail group
      - CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
      who_can_send_mail?: string
    }
    export type MailgroupManager = {
      /** 管理员用户ID */
      user_id?: string
    }
    export type MailgroupMember = {
      /** The unique ID of a member in this mail group */
      member_id?: string
      /** The member's email address. Value is valid when type is one of USER/EXTERNAL_USER/MAIL_GROUP/PUBLIC_MAILBOX/OTHER_MEMBER */
      email?: string
      /** The member's user id. Value is valid when type is USER */
      user_id?: string
      /** The member's department id. Value is valid when type is DEPARTMENT */
      department_id?: string
      /** The type of member. Possible values are:
      - USER: internal user in the team
      - DEPARTMENT: member is a department
      - COMPANY: member is the company
      - EXTERNAL_USER: internet user outside the organization
      - MAIL_GROUP: member is another mail group
      - PUBLIC_MAILBOX: member is a public mailbox
      - OTHER_MEMBER: other internal member */
      type?: string
    }
    export type EmailAlias = {
      /** 主邮箱地址 */
      primary_email?: string
      /** 邮箱别名 */
      email_alias?: string
    }
    export type MailgroupPermissionMember = {
      /** The unique ID of a member in this permission group */
      permission_member_id?: string
      /** The member's user id. Value is valid when type is USER */
      user_id?: string
      /** The member's department id. Value is valid when type is DEPARTMENT */
      department_id?: string
      /** The member's email address. Value is valid when type is MAIL_GROUP/PUBLIC_MAILBOX */
      email?: string
      /** The type of member. Possible values are:
      - USER: internal user in the team
      - DEPARTMENT: member is a department */
      type?: string
    }
    export type PublicMailbox = {
      /** The unique ID of a public mailbox */
      public_mailbox_id?: string
      /** The public mailbox's email address */
      email?: string
      /** The public mailbox's display name */
      name?: string
    }
    export type PublicMailboxMember = {
      /** The unique ID of a member in this public mailbox */
      member_id?: string
      /** The member's user id. Value is valid when type is USER */
      user_id?: string
      /** The type of member. Possible values are:
      - USER: internal user in the team */
      type?: string
    }
    export type AppScope = {
      /** 应用权限 */
      scope: string
      /** 应用权限的国际化描述 */
      description?: string
      /** 权限等级描述 */
      level?: number
    }
    export type AppI18nInfo = {
      /** 国际化语言的 key */
      i18n_key: string
      /** 应用国际化名称 */
      name?: string
      /** 应用国际化描述（副标题） */
      description?: string
      /** 帮助国际化文档链接 */
      help_use?: string
    }
    export type ApplicationOwner = {
      /** 应用所有者类型 */
      type: number
      /** 应用所有者ID */
      owner_id?: string
      /** 应用开发商名称(仅商店应用返回) */
      name?: string
      /** 应用开发商服务台链接(仅商店应用返回) */
      help_desk?: string
      /** 应用开发商的邮箱(仅商店应用返回) */
      email?: string
      /** 应用开发商的手机号(仅商店应用返回) */
      phone?: string
    }
    export type Application = {
      /** 应用的 id */
      app_id: string
      /** 应用创建者（所有者） */
      creator_id?: string
      /** 应用状态 */
      status?: number
      /** 应用类型 */
      scene_type?: number
      /** 付费类型 */
      payment_type?: number
      /** 安全设置中的重定向 URL */
      redirect_urls?: string[]
      /** 发布在线上的应用版本 */
      online_version_id?: string
      /** 在审核中的版本号信息，若没有则为空 */
      unaudit_version_id?: string
      /** 应用默认名称，如果没有对应语言下的名称，则返回默认语言下的名称 */
      app_name?: string
      /** 应用图标链接 */
      avatar_url?: string
      /** 应用默认描述 */
      description?: string
      /** 应用权限列表 */
      scopes?: Lark.AppScope[]
      /** 后台主页地址 */
      back_home_url?: string
      /** 应用的国际化信息列表 */
      i18n?: Lark.AppI18nInfo[]
      /** 应用主语言 */
      primary_language?: string
      /** 应用分类的国际化描述 */
      common_categories?: string[]
      /** 应用的所有者信息 */
      owner?: Lark.ApplicationOwner
    }
    export type Gadget = {
      /** pc 支持的小程序模式，bit 位表示 */
      enable_pc_mode?: number
      /** schema url 列表 */
      schema_urls?: string[]
      /** pc 端是否使用小程序版本 */
      pc_use_mobile_pkg?: boolean
      /** pc 的小程序版本号 */
      pc_version?: string
      /** 移动端小程序版本号 */
      mobile_version?: string
      /** 移动端兼容的最低飞书版本 */
      mobile_min_lark_version?: string
      /** pc 端兼容的最低飞书版本 */
      pc_min_lark_version?: string
    }
    export type WebApp = {
      /** pc 端 url */
      pc_url?: string
      /** 移动端 url */
      mobile_url?: string
    }
    export type Bot = {
      /** 消息卡片回调地址 */
      card_request_url?: string
    }
    export type WorkplaceWidget = {
      /** 最低兼容 lark 版本号 */
      min_lark_version?: string
    }
    export type NavigateMeta = {
      /** 主导航小程序版本号 */
      version?: string
      /** 默认图片 url */
      image_url?: string
      /** 选中态图片 url */
      hover_image_url?: string
    }
    export type Navigate = {
      /** pc 端主导航信息 */
      pc?: Lark.NavigateMeta
      /** 移动端主导航信息 */
      mobile?: Lark.NavigateMeta
    }
    export type CloudDocI18nInfo = {
      /** 国际化语言的 key */
      i18n_key: string
      /** 云文档国际化名称 */
      name?: string
      /** 云文档国际化读权限说明 */
      read_description?: string
      /** 云文档国际化写权限说明 */
      write_description?: string
    }
    export type CloudDoc = {
      /** 云空间重定向 url */
      space_url?: string
      /** 国际化信息 */
      i18n?: Lark.CloudDocI18nInfo[]
      /** 图标链接 */
      icon_url?: string
      /** 云文档支持模式 */
      mode?: number
    }
    export type BlockI18nInfo = {
      /** 国际化语言的 key */
      i18n_key?: string
      /** 名称 */
      name?: string
    }
    export type DocsBlock = {
      /** BlockTypeID */
      block_type_id?: string
      /** block 的国际化信息 */
      i18n?: Lark.BlockI18nInfo[]
      /** 移动端 icon 链接 */
      mobile_icon_url?: string
      /** pc 端口 icon 链接 */
      pc_icon_url?: string
    }
    export type MessageActionI18nInfo = {
      /** 国际化语言的 key */
      i18n_key?: string
      /** 国际化名称 */
      name?: string
    }
    export type MessageAction = {
      /** pc 端链接 */
      pc_app_link?: string
      /** 移动端链接 */
      mobile_app_link?: string
      /** 国际化信息 */
      i18n?: Lark.MessageActionI18nInfo[]
    }
    export type PlusMenu = {
      /** pc 端链接 */
      pc_app_link?: string
      /** 移动端链接 */
      mobile_app_link?: string
    }
    export type AppAbility = {
      /** 小程序能力 */
      gadget?: Lark.Gadget
      /** 网页能力 */
      web_app?: Lark.WebApp
      /** 机器人能力 */
      bot?: Lark.Bot
      /** 小组件能力 */
      workplace_widgets?: Lark.WorkplaceWidget[]
      /** 主导航小程序 */
      navigate?: Lark.Navigate
      /** 云文档应用 */
      cloud_doc?: Lark.CloudDoc
      /** 云文档小组件 */
      docs_blocks?: Lark.DocsBlock[]
      /** 消息快捷操作 */
      message_action?: Lark.MessageAction
      /** 加号菜单 */
      plus_menu?: Lark.PlusMenu
    }
    export type AppVisibleList = {
      /** 可见性成员 open_id 列表 */
      open_ids?: string[]
      /** 可见性部门的 id 列表 */
      department_ids?: string[]
      /** 可见性成员 group_id 列表 */
      group_ids?: string[]
    }
    export type AppVisibility = {
      /** 是否全员可见 */
      is_all?: boolean
      /** 可见名单 */
      visible_list?: Lark.AppVisibleList
      /** 不可见名单 */
      invisible_list?: Lark.AppVisibleList
    }
    export type AppVersionRemark = {
      /** 备注说明 */
      remark?: string
      /** 更新说明 */
      update_remark?: string
      /** 可见性名单 */
      visibility?: Lark.AppVisibility
    }
    export type ApplicationAppVersion = {
      /** 应用 id */
      app_id: string
      /** 开发者填入的应用版本 ID */
      version?: string
      /** 唯一标识应用版本的 ID */
      version_id: string
      /** 应用默认名称 */
      app_name?: string
      /** 应用头像 url */
      avatar_url?: string
      /** 应用默认描述 */
      description?: string
      /** 应用权限列表 */
      scopes?: Lark.AppScope[]
      /** 后台主页地址 */
      back_home_url?: string
      /** 应用的国际化信息列表 */
      i18n?: Lark.AppI18nInfo[]
      /** 应用分类的国际化描述 */
      common_categories?: string[]
      /** 应用已订阅开放平台事件列表 */
      events?: string[]
      /** 版本状态 */
      status?: number
      /** 版本创建时间（单位：s） */
      create_time?: string
      /** 版本发布时间（单位：s） */
      publish_time?: string
      /** 当前版本下应用开启的能力 */
      ability?: Lark.AppAbility
      /** 跟随应用版本的信息 */
      remark?: Lark.AppVersionRemark
    }
    export type ApplicationAppContactsRange = {
      /** 通讯录可见性类型 */
      contacts_scope_type?: string
      /** 可用名单 */
      visible_list?: Lark.AppVisibleList
    }
    export type AppContactsRangeIdList = {
      /** 成员id列表 */
      user_ids?: string[]
      /** 部门id列表 */
      department_ids?: string[]
      /** 用户组列表 */
      group_ids?: string[]
    }
    export type ApplicationVisibilityUserWhiteBlackInfo = {
      /** 用户ID */
      user_id?: string
      /** 是否在白名单中 */
      in_white_list?: boolean
      /** 是否在黑名单中 */
      in_black_list?: boolean
      /** 是否在付费名单中 */
      in_paid_list?: boolean
    }
    export type ApplicationVisibilityDepartmentWhiteBlackInfo = {
      /** 部门ID */
      department_id?: string
      /** 是否在白名单中 */
      in_white_list?: boolean
      /** 是否在黑名单中 */
      in_black_list?: boolean
    }
    export type ApplicationVisibilityGroupWhiteBlackInfo = {
      /** 用户组ID */
      group_id?: string
      /** 是否在白名单中 */
      in_white_list?: boolean
      /** 是否在黑名单中 */
      in_black_list?: boolean
    }
    export type AppVisibilityIdList = {
      /** 成员id列表(open_id/union_id/user_id) */
      user_ids?: string[]
      /** 部门id列表(自定义部门id/open_department_id) */
      department_ids?: string[]
      /** 用户组id */
      group_ids?: string[]
    }
    export type ApplicationAppUsage = {
      /** 指标名称 */
      metric_name: string
      /** 指标值 */
      metric_value: number
    }
    export type ApplicationDepartmentAppUsage = {
      /** 租户内部门的唯一标识，ID值与查询参数中的department_id_type 对应。 */
      department_id?: string
      /** 应用整体使用情况。指标名称， uv：活跃用户数， total_users：累计用户数， new_users：新增用户数。 */
      app?: Lark.ApplicationAppUsage[]
      /** 小程序使用情况，没有小程序形态时为null。 */
      gadget?: Lark.ApplicationAppUsage[]
      /** 网页应用使用情况，没有网页应用形态时为null */
      webapp?: Lark.ApplicationAppUsage[]
      /** 机器人使用情况，没有机器人形态时为null */
      bot?: Lark.ApplicationAppUsage[]
    }
    export type ApplicationFeedback = {
      /** 应用反馈 ID，应用反馈记录唯一标识 */
      feedback_id: string
      /** 被反馈应用ID */
      app_id: string
      /** 反馈提交时间，格式为yyyy-mm-dd hh:mm:ss */
      feedback_time: string
      /** 反馈用户的租户名， 查询 isv 应用时反馈数据时返回 */
      tenant_name?: string
      /** 反馈类型 */
      feedback_type: number
      /** 反馈处理状态 */
      status: number
      /** 故障类型：1: 黑屏 2: 白屏 3: 无法打开小程序  4: 卡顿 5: 小程序闪退 6: 页面加载慢 7: 死机 8: 其他异常） 只在故障反馈时返回 */
      fault_type?: number[]
      /** 故障时间，格式为yyyy-mm-dd hh:mm:ss */
      fault_time?: string
      /** 反馈来源：1： 小程序 2：网页应用 3：机器人 4：webSDK */
      source?: number
      /** 用户联系方式，只有用户填写联系方式后返回 */
      contact?: string
      /** 反馈处理时间，格式为yyyy-mm-dd hh:mm:ss */
      update_time?: string
      /** 反馈问题描述 */
      description: string
      /** 反馈用户id，租户内用户的唯一标识 ，ID值与查询参数中的user_id_type对应，应用为 isv 应用时不返回 */
      user_id?: string
      /** 操作者id，租户内用户的唯一标识， ID值与查询参数中的user_id_type 对应 反馈未被处理时该值为 nil */
      operator_id?: string
      /** 反馈图片url列表，url 过期时间三天 */
      images?: string[]
      /** 反馈页面路径 */
      feedback_path?: string
    }
    export type ClientBadgeNum = {
      /** h5能力的badge数量 */
      web_app?: number
      /** 小程序能力的badge数量 */
      gadget?: number
    }
    export type TenantAssignInfo = {
      /** 席位id */
      subscription_id?: string
      /** license_plan_key */
      license_plan_key?: string
      /** 商业化产品名称 */
      product_name?: string
      /** 国际化名称 */
      i18n_name?: Lark.ProductI18nName
      /** 席位总数 */
      total_seats?: string
      /** 已分配席位数 */
      assigned_seats?: string
      /** 席位起始时间 */
      start_time?: string
      /** 席位结束时间 */
      end_time?: string
    }
    export type Avatar = {
      /** 企业头像 */
      avatar_origin?: string
      /** 企业头像 72x72 */
      avatar_72?: string
      /** 企业头像 240x240 */
      avatar_240?: string
      /** 企业头像 640x640 */
      avatar_640?: string
    }
    export type Tenant = {
      /** 企业名称 */
      name: string
      /** 企业编号 */
      display_id: string
      /** 个人版/团队版标志 */
      tenant_tag: number
      /** 企业标识 */
      tenant_key: string
      /** 企业头像 */
      avatar: Lark.Avatar
    }
    export type Verification = {
      /** 企业主体名称 */
      name: string
      /** 企业是否完成认证； true 表示已经完成认证，false 表示未认证 */
      has_verification: boolean
    }
    export type SystemStatusI18nName = {
      /** 中文名 */
      zh_cn?: string
      /** 英文名 */
      en_us?: string
      /** 日文名 */
      ja_jp?: string
    }
    export type SystemStatusSyncI18nName = {
      /** 中文名 */
      zh_cn?: string
      /** 英文名 */
      en_us?: string
      /** 日文名 */
      ja_jp?: string
    }
    export type SystemStatusSyncI18nExplain = {
      /** 中文名 */
      zh_cn?: string
      /** 英文名 */
      en_us?: string
      /** 日文名 */
      ja_jp?: string
    }
    export type SystemStatusSyncSetting = {
      /** 是否默认开启 */
      is_open_by_default?: boolean
      /** 同步设置名称，名称字符数要在1到30范围内。 */
      title?: string
      /** 同步设置国际化名称，名称字符数要在1到30范围内。 */
      i18n_title?: Lark.SystemStatusSyncI18nName
      /** 同步设置解释文案，解释字符数要在1到60范围内。 */
      explain?: string
      /** 同步设置国际化解释文案，解释字符数要在1到60范围内。 */
      i18n_explain?: Lark.SystemStatusSyncI18nExplain
    }
    export type SystemStatus = {
      /** 系统状态ID */
      system_status_id?: string
      /** 系统状态名称，名称字符数要在1到20范围内。 */
      title: string
      /** 系统状态国际化名称，名称字符数要在1到20范围内。 */
      i18n_title?: Lark.SystemStatusI18nName
      /** 图标 */
      icon_key: string
      /** 颜色 */
      color?: string
      /** 优先级，数值越小，客户端展示的优先级越高。不同系统状态的优先级不能一样。 */
      priority?: number
      /** 同步设置 */
      sync_setting?: Lark.SystemStatusSyncSetting
    }
    export type SystemStatusUserOpenParam = {
      /** 用户ID */
      user_id: string
      /** 结束时间，传入的应为秒单位的时间戳，距当前的时间跨度不能超过365天。 */
      end_time: string
    }
    export type SystemStatusUserOpenResultEntity = {
      /** 用户ID */
      user_id: string
      /** 结束时间，传入的应为秒单位的时间戳，距当前的时间跨度不能超过365天。 */
      end_time: string
      /** 开启结果 */
      result?: string
    }
    export type SystemStatusUserCloseResultEntity = {
      /** 用户ID */
      user_id?: string
      /** 关闭结果 */
      result?: string
    }
    export type I18nMeta = {
      /** 国际化字段：中文 */
      zh_cn?: string
      /** 国际化字段：英文 */
      en_us?: string
      /** 国际化字段：日文 */
      ja_jp?: string
    }
    export type DataSource = {
      /** 数据源的唯一标识 */
      id?: string
      /** data_source的展示名称 */
      name: string
      /** 数据源状态，0-已上线，1-未上线 */
      state?: number
      /** 对于数据源的描述 */
      description?: string
      /** 创建时间，采用 Unix 时间戳 */
      create_time?: string
      /** 更新时间，采用 Unix 时间戳 */
      update_time?: string
      /** 是否超限 */
      is_exceed_quota?: boolean
      /** 数据源在 search tab 上的展示图标路径 */
      icon_url?: string
      /** 数据源采用的展示模版名称 */
      template?: string
      /** 描述哪些字段可以被搜索 */
      searchable_fields?: string[]
      /** 数据源的国际化展示名称 */
      i18n_name?: Lark.I18nMeta
      /** 数据源的国际化描述 */
      i18n_description?: Lark.I18nMeta
      /** 数据源关联的 schema 标识 */
      schema_id?: string
      /** datasource对应的开放平台应用id */
      app_id?: string
    }
    export type Acl = {
      /** 权限类型，优先级：Deny > Allow */
      access?: string
      /** 设置的权限值，依赖 type 描述 */
      value?: string
      /** 权限值类型 */
      type?: string
    }
    export type ItemMetadata = {
      /** 数据项标题 */
      title: string
      /** 搜索命中的跳转地址 */
      source_url: string
      /** 数据项的创建时间，采用 Unix 时间戳 */
      create_time?: number
      /** 数据项的更新时间，采用 Unix 时间戳 */
      update_time?: number
      /** 移动端搜索命中的跳转地址。如果您PC端和移动端有不同的跳转地址，可以在这里写入移动端专用的url，我们会在搜索时为您选择合适的地址 */
      source_url_mobile?: string
    }
    export type ItemContent = {
      /** 内容的格式 */
      format?: string
      /** 全文数据 */
      content_data?: string
    }
    export type SchemaSortOptions = {
      /** 排序的优先级，可选范围为 0~4，0为最高优先级。如果优先级相同，则随机进行排序。默认为0 */
      priority?: number
      /** 排序的顺序。默认为 desc */
      order?: string
    }
    export type SchemaTagOptions = {
      /** tag 对应的枚举值名称 */
      name: string
      /** 标签对应的颜色 */
      color: string
      /** 标签中展示的文本 */
      text: string
    }
    export type SchemaUserIdsOption = {
      /** 用户身份类型 */
      id_type: string
    }
    export type SchemaTypeDefinitions = {
      /** 标签类型的定义 */
      tag?: Lark.SchemaTagOptions[]
      /** 用户身份标识 */
      user_ids?: Lark.SchemaUserIdsOption
    }
    export type SchemaSearchOptions = {
      /** 是否支持语义切词召回。默认不支持（推荐使用在长文本的场景） */
      enable_semantic_match?: boolean
      /** 是否支持精确匹配。默认不支持（推荐使用在短文本、需要精确查找的场景） */
      enable_exact_match?: boolean
      /** 是否支持前缀匹配（短文本的默认的分词/召回策略。前缀长度为 1-12） */
      enable_prefix_match?: boolean
      /** 是否支持数据后缀匹配。默认不支持（推荐使用在短文本、有数字后缀查找的场景。后缀长度为3-12） */
      enable_number_suffix_match?: boolean
      /** 是否支持驼峰英文匹配。默认不支持（推荐使用在短文本，且包含驼峰形式英文的查找场景） */
      enable_camel_match?: boolean
    }
    export type SchemaPredefineEnumStruct = {
      /** 枚举值的标识。在多枚举值定义中保持唯一 */
      name: string
      /** 枚举值展示文案 */
      text: string
    }
    export type SchemaFilterOptions = {
      /** 筛选器展示名称 */
      display_name: string
      /** 筛选器展示名称国际化字段 */
      i18n_display_name?: Lark.I18nMeta
      /** 指明该筛选器支持单选或多选，默认单选 */
      option_mode?: string
      /** 关联的综合筛选器。只有 filter_type 为"user"和"time"时可以关联。"user" -> "from"；"time" -> "date"。 */
      associated_smart_filter?: string
      /** 筛选器类型 */
      filter_type?: string
      /** 预定义的展示枚举值。在 filter_type 为 "predefine_enum" 时必须填写 */
      predefine_enum_values?: Lark.SchemaPredefineEnumStruct[]
      /** 是否开启客户端筛选器 */
      enable_client_filter?: boolean
    }
    export type SchemaProperty = {
      /** 属性名 */
      name: string
      /** 属性类型 */
      type: string
      /** 该属性是否可用作搜索，默认为 false */
      is_searchable?: boolean
      /** 该属性是否可用作搜索结果排序，默认为 false。如果为 true，需要再配置 sortOptions */
      is_sortable?: boolean
      /** 该属性是否可用作返回字段，为 false 时，该字段不会被召回和展示。默认为 false */
      is_returnable?: boolean
      /** 属性排序的可选配置，当 is_sortable 为 true 时，该字段为必填字段 */
      sort_options?: Lark.SchemaSortOptions
      /** 相关类型数据的定义和约束 */
      type_definitions?: Lark.SchemaTypeDefinitions
      /** 属性搜索的可选配置，当 is_searchable 为 true 时，该字段为必填参数 */
      search_options?: Lark.SchemaSearchOptions
      /** 该属性是否可用作返回字段，为 false 时，该字段不会被筛选。默认为 false */
      is_filterable?: boolean
      /** 属性筛选的可选配置，当 is_searchable 为 true 时，该字段为必填参数 */
      filter_options?: Lark.SchemaFilterOptions
    }
    export type SchemaDisplayFieldMapping = {
      /** 展示字段名称，与 card_key 有关，每个模版能展示的字段不同。该字段不能重复 */
      display_field: string
      /** 数据字段的名称。需要确保该字段对应在 schema 属性定义中的 is_returnable 为 true，否则无法展示。需要使用 ${xxx} 的规则来描述 */
      data_field: string
    }
    export type SchemaDisplay = {
      /** 搜索数据的展示卡片 */
      card_key: string
      /** 数据字段名称和展示字段名称的映射关系。如果没有设置，则只会展示 与展示字段名称同名的 数据字段 */
      fields_mapping?: Lark.SchemaDisplayFieldMapping[]
    }
    export type ResumeEducation = {
      /** 学校名称 */
      school?: string
      /** 开始时间,格式：YYYY-MM-DD */
      start_date?: string
      /** 开始时间,格式：YYYY-MM-DD,跟start_date值一样 */
      start_time?: string
      /** 结束时间,格式：YYYY-MM-DD */
      end_date?: string
      /** 结束时间,格式：YYYY-MM-DD 或 “至今”，当值为“至今”时，end_date=="",值为其他时，end_date==end_time */
      end_time?: string
      /** 专业 */
      major?: string
      /** 学历——小学、初中、中职、高中、专科、本科、硕士、博士、其他 */
      degree?: string
      /** 学历对应ID */
      qualification?: number
    }
    export type ResumeCareer = {
      /** 公司名称 */
      company?: string
      /** 开始时间,格式：YYYY-MM-DD */
      start_date?: string
      /** 始时间,格式：YYYY-MM-DD,跟start_date值一样 */
      start_time?: string
      /** 结束时间,格式：YYYY-MM-DD */
      end_date?: string
      /** 结束时间,格式：YYYY-MM-DD 或 “至今”，当值为“至今”时，end_date=="",值为其他时，end_date==end_time */
      end_time?: string
      /** 职位 */
      title?: string
      /** 工作类型 */
      type?: number
      /** 工作类型——'实习'、'全职' */
      type_str?: string
      /** 工作描述 */
      job_description?: string
    }
    export type ResumeProject = {
      /** 项目名称 */
      name?: string
      /** 项目岗位 */
      title?: string
      /** 开始时间,格式：YYYY-MM-DD */
      start_date?: string
      /** 开始时间,格式：YYYY-MM-DD,跟start_date值一样 */
      start_time?: string
      /** 结束时间,格式：YYYY-MM-DD */
      end_date?: string
      /** 结束时间,格式：YYYY-MM-DD 或 “至今”，当值为“至今”时，end_date=="",值 */
      end_time?: string
      /** 项目描述 */
      description?: string
    }
    export type ResumeLanguage = {
      /** 语言等级 */
      level?: number
      /** 语言描述 */
      description?: string
    }
    export type ResumeAward = {
      /** 奖项 */
      award?: string
      /** 获奖时间，格式：YYYY */
      date?: string
      /** 描述 */
      description?: string
    }
    export type ResumeCertificate = {
      /** 证书名称 */
      name?: string
      /** 描述 */
      desc?: string
    }
    export type ResumeCompetition = {
      /** 竞赛名称 */
      name?: string
      /** 描述 */
      desc?: string
    }
    export type Resume = {
      /** 文件标识ID，依据文件内容自动生成 */
      file_md5?: string
      /** 文本内容，当接口返回成功时，该字段才存在 */
      content?: string
      /** 经过排序后的文本内容，当接口返回成功时，该字段才存在 */
      new_content?: string
      /** 名称 */
      name?: string
      /** 邮箱 */
      email?: string
      /** 手机号码 */
      mobile?: string
      /** 手机号码是否虚拟号码 */
      mobile_is_virtual?: boolean
      /** 手机号码国家编码 */
      country_code?: string
      /** 教育经历 */
      educations?: Lark.ResumeEducation[]
      /** 职业经历 */
      careers?: Lark.ResumeCareer[]
      /** 项目经历 */
      projects?: Lark.ResumeProject[]
      /** 工作年限，为空表示工作年限未知，数字单位为年，整数 */
      work_year?: number
      /** 生日，格式YYYY-MM-DD */
      date_of_birth?: string
      /** 性别 */
      gender?: number
      /** 希望获得的职位列表 */
      willing_positions?: string[]
      /** 当前工作地点(城市) */
      current_location?: string
      /** 希望工作地点列表 */
      willing_locations?: string[]
      /** 家乡(城市) */
      home_location?: string
      /** 语言 */
      languages?: Lark.ResumeLanguage[]
      /** 获奖 */
      awards?: Lark.ResumeAward[]
      /** 证书 */
      certificates?: Lark.ResumeCertificate[]
      /** 竞赛 */
      competitions?: Lark.ResumeCompetition[]
      /** 自我评价 */
      self_evaluation?: string
      /** 链接列表 */
      urls?: string[]
      /** 社交链接 */
      social_links?: string[]
    }
    export type VehicleInvoiceEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type VehicleInvoice = {
      /** 识别出的实体类型 */
      entities?: Lark.VehicleInvoiceEntity[]
    }
    export type HealthCertificateEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type HealthCertificate = {
      /** 识别出的实体类型 */
      entities?: Lark.HealthCertificateEntity[]
    }
    export type HkmMainlandTravelPermitEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type HkmMainlandTravelPermit = {
      /** 识别出的实体类型 */
      entities?: Lark.HkmMainlandTravelPermitEntity[]
    }
    export type TwMainlandTravelPermitEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type TwMainlandTravelPermit = {
      /** 识别出的实体类型 */
      entities?: Lark.TwMainlandTravelPermitEntity[]
    }
    export type ChinesePassportEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type ChinesePassport = {
      /** 识别出的实体类型 */
      entities?: Lark.ChinesePassportEntity[]
    }
    export type BankCardEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type BankCard = {
      /** 识别出的实体类型 */
      entities?: Lark.BankCardEntity[]
    }
    export type VehicleEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type VehicleLicense = {
      /** 识别出的实体类型 */
      entities?: Lark.VehicleEntity[]
    }
    export type TrainEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type TrainInvoice = {
      /** 识别出的实体列表 */
      entities?: Lark.TrainEntity[]
    }
    export type TaxiEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type TaxiInvoice = {
      /** 识别出的实体类型 */
      entities?: Lark.TaxiEntity[]
    }
    export type IdEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type IdCard = {
      /** 识别的实体列表 */
      entities?: Lark.IdEntity[]
      /** 正反面，1为身份证-姓名页，0为身份证-国徽页 */
      side?: number
      /** 四角坐标[x0,y0,x1,y1,x2,y2,x3,y3] */
      conners?: number[]
    }
    export type FoodProduceEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type FoodProduceLicense = {
      /** 识别出的实体列表 */
      entities?: Lark.FoodProduceEntity[]
    }
    export type FoodManageEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type FoodManageLicense = {
      /** 识别出的实体列表 */
      entities?: Lark.FoodManageEntity[]
    }
    export type DrivingEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type DrvingLicense = {
      /** 识别出的实体类型 */
      entities?: Lark.DrivingEntity[]
    }
    export type VatEntity = {
      /** 识别的实体类型 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type VatInvoice = {
      /** 识别出的实体列表 */
      entities?: Lark.VatEntity[]
    }
    export type BusinessEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type BusinessLicense = {
      /** 识别出的实体类型 */
      entities?: Lark.BusinessEntity[]
    }
    export type ExtractPrice = {
      /** 交易金额 */
      contract_price?: number
      /** 从原文中抽取的交易金额 */
      contract_price_original?: string
      /** 原文中描述交易金额的文字 */
      text?: string
    }
    export type ExtractTerm = {
      /** 合同持续时长 */
      initial_time?: string
      /** 持续时长单位 */
      initial_unit?: string
    }
    export type ExtractTime = {
      /** 开始时间 */
      time_start?: string
      /** 结束时间 */
      time_end?: string
      /** 原文中抽取出的开始时间 */
      original_time_start?: string
      /** 原文中抽取出的结束时间 */
      original_time_end?: string
      /** 原文中关于开始时间的描述 */
      text_start?: string
      /** 原文中关于结束时间的描述 */
      text_end?: string
      /** 合同持续时长 */
      initial_term?: Lark.ExtractTerm
      /** 原文中关于持续时间的描述 */
      text_initial_term?: string
    }
    export type ExtractCopy = {
      /** 盖章份数 */
      copy_num?: number
      /** 从原文中抽取的盖章份数 */
      original_copy?: string
      /** 盖章文件类型 */
      key?: string
      /** 原文有关盖章份数的描述 */
      text?: string
    }
    export type ExtractCurrency = {
      /** 币种名称 */
      currency_name?: string
      /** 币种符号 */
      currency_text?: string
    }
    export type BodyEntity = {
      /** 地址 */
      address?: string
      /** 联系人 */
      contacts?: string
      /** 邮箱 */
      email?: string
      /** 电话 */
      phone?: string
      /** ID */
      id_number?: string
      /** 法人代表 */
      legal_representative?: string
      /** 当事人 */
      party?: string
    }
    export type BodyInfo = {
      /** 主体类型 */
      body_type?: string
      /** 值 */
      value?: Lark.BodyEntity
    }
    export type BankEntity = {
      /** 账户名 */
      account_name?: string
      /** 银行名称 */
      bank_name?: string
      /** 账户ID */
      account_number?: string
      /** 电话 */
      phone?: string
      /** 联系人 */
      contacts?: string
      /** 传真号码 */
      tax_number?: string
      /** 联系地址 */
      address?: string
      /** id号 */
      id_number?: string
      /** 邮箱 */
      email?: string
    }
    export type BankInfo = {
      /** 甲乙方信息类型 */
      bank_type?: string
      /** 值 */
      value?: Lark.BankEntity
    }
    export type RecognizedEntity = {
      /** 识别的字段种类 */
      type?: string
      /** 识别出字段的文本信息 */
      value?: string
    }
    export type RecognizedEntities = {
      /** 识别的实体列表 */
      entities?: Lark.RecognizedEntity[]
    }
    export type Speech = {
      /** 语音资源 */
      speech?: string
    }
    export type FileConfig = {
      /** 仅包含字母数字和下划线的 16 位字符串作为文件的标识，用户生成 */
      file_id: string
      /** 语音格式，目前仅支持：pcm */
      format: string
      /** 引擎类型，目前仅支持：16k_auto 中英混合 */
      engine_type: string
    }
    export type StreamConfig = {
      /** 仅包含字母数字和下划线的 16 位字符串作为同一数据流的标识，用户生成 */
      stream_id: string
      /** 数据流分片的序号，序号从 0 开始，每次请求递增 1 */
      sequence_id: number
      /** 数据流标记：1 首包，2 正常结束，等待结果返回，3 中断数据流不返回最终结果 */
      action: number
      /** 语音格式，目前仅支持：pcm */
      format: string
      /** 引擎类型，目前仅支持：16k_auto 中英混合 */
      engine_type: string
    }
    export type Term = {
      /** 原文 */
      from: string
      /** 译文 */
      to: string
    }
    export type Password = {
      /** 企业邮箱密码 */
      ent_email_password: string
    }
    export type AdminDeptStat = {
      /** 日期 */
      date?: string
      /** 部门ID */
      department_id?: string
      /** 部门名 */
      department_name?: string
      /** 部门路径 */
      department_path?: string
      /** 部门总人数 */
      total_user_num?: number
      /** 激活人数 */
      active_user_num?: number
      /** 激活率 */
      active_user_rate?: string
      /** 活跃人数 */
      suite_dau?: number
      /** 活跃率 */
      suite_active_rate?: string
      /** 新用户数 */
      new_user_num?: number
      /** 新激活数 */
      new_active_num?: number
      /** 离职人数 */
      resign_user_num?: number
      /** 消息活跃人数 */
      im_dau?: number
      /** 发送消息人数 */
      send_messenger_user_num?: number
      /** 发送消息数 */
      send_messenger_num?: number
      /** 人均发送消息数 */
      avg_send_messenger_num?: string
      /** 云文档活跃人数 */
      docs_dau?: number
      /** 创建文件人数 */
      create_docs_user_num?: number
      /** 创建文件数 */
      create_docs_num?: number
      /** 人均创建文件数 */
      avg_create_docs_num?: string
      /** 日历活跃人数 */
      cal_dau?: number
      /** 创建日程人数 */
      create_cal_user_num?: number
      /** 创建日程数 */
      create_cal_num?: number
      /** 人均创建日程数 */
      avg_create_cal_num?: string
      /** 音视频会议活跃人数 */
      vc_dau?: number
      /** 会议时长（分钟） */
      vc_duration?: number
      /** 人均会议时长（分钟） */
      avg_vc_duration?: string
      /** 人均飞书使用时长（分钟） */
      avg_duration?: string
      /** 任务活跃人数 */
      task_dau?: number
      /** 创建任务人数 */
      create_task_user_num?: number
      /** 创建任务数 */
      create_task_num?: number
      /** 人均创建任务数 */
      avg_create_task_num?: string
      /** 邮件总发件量 */
      email_send_count?: string
      /** 邮件总收件量 */
      email_receive_count?: string
      /** 对外发件数 */
      email_send_ext_count?: string
      /** 来自外部收件数 */
      email_receive_ext_count?: string
      /** 对内发件数 */
      email_send_in_count?: string
      /** 来自内部收件数 */
      email_receive_in_count?: string
    }
    export type AdminUserStat = {
      /** 日期 */
      date?: string
      /** 用户ID */
      user_id?: string
      /** 用户名 */
      user_name?: string
      /** 部门名 */
      department_name?: string
      /** 部门路径 */
      department_path?: string
      /** 添加时间 */
      create_time?: string
      /** 用户激活状态 */
      user_active_flag?: number
      /** 激活时间 */
      register_time?: string
      /** 用户活跃状态 */
      suite_active_flag?: number
      /** 最近活跃时间 */
      last_active_time?: string
      /** 用户消息活跃状态 */
      im_active_flag?: number
      /** 发送消息数 */
      send_messenger_num?: number
      /** 用户云文档活跃状态 */
      docs_active_flag?: number
      /** 创建文件数 */
      create_docs_num?: number
      /** 用户日历活跃状态 */
      cal_active_flag?: number
      /** 创建日程数 */
      create_cal_num?: number
      /** 用户音视频会议活跃状态 */
      vc_active_flag?: number
      /** 会议时长 */
      vc_duration?: number
      /** 活跃设备 */
      active_os?: string
      /** 创建任务数 */
      create_task_num?: number
      /** 会议数 */
      vc_num?: number
      /** 飞书的应用类型名称 */
      app_package_type?: string
      /** 操作系统名称 */
      os_name?: string
      /** 邮件总发件量 */
      email_send_count?: string
      /** 邮件总收件量 */
      email_receive_count?: string
      /** 对外发件数 */
      email_send_ext_count?: string
      /** 来自外部收件数 */
      email_receive_ext_count?: string
      /** 对内发件数 */
      email_send_in_count?: string
      /** 来自内部收件数 */
      email_receive_in_count?: string
    }
    export type Badge = {
      /** 租户内勋章的唯一标识，该值由系统随机生成。 */
      id?: string
      /** 租户内唯一的勋章名称，最多30个字符。 */
      name: string
      /** 勋章的描述文案，最多100个字符。 */
      explanation?: string
      /** 企业勋章的详情图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
      detail_image: string
      /** 企业勋章的头像挂饰图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
      show_image: string
      /** 勋章的多语言名称，同name字段限制，最多30个字符。 */
      i18n_name?: Lark.I18n
      /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
      i18n_explanation?: Lark.I18n
    }
    export type RuleDetail = {
      /** 开始生效的时间戳。1.手动设置有效期类型勋章，配置有效期限需要配置该字段；2.时间戳必须是所在时区当天的零点时间戳，如时区为Asia/Shanghai时区时的1649606400 */
      effective_time?: string
      /** 结束生效的时间戳。1.手动设置有效期类型勋章，配置有效期限需要配置该字段；2.最大值：不得超过effective_time+100 年；3.非永久有效：时间戳必须是所在时区当天的23:59:59时间戳，如时区为Asia/Shanghai时区时的1649692799；4.永久有效：传值为0即可 */
      expiration_time?: string
      /** 入职周年日。根据入职时间发放类型勋章，需要配置该字段。 */
      anniversary?: number
      /** 有效期限。根据入职时间发放类型勋章，需要配置该字段。 */
      effective_period?: number
    }
    export type Grant = {
      /** 租户内授予名单的唯一标识，该值由系统随机生成。 */
      id?: string
      /** 企业勋章的唯一ID */
      badge_id?: string
      /** 授予名单名称，最多100个字符。 */
      name: string
      /** 勋章下唯一的授予事项 */
      grant_type: number
      /** 授予名单的生效时间对应的时区，用于检查RuleDetail的时间戳的取值是否规范，取值范围为TZ database name */
      time_zone: string
      /** 规则详情 */
      rule_detail: Lark.RuleDetail
      /** 是否授予给全员。1.为false时，需要关联1~500个用户群体。2.为true时，不可关联用户、用户组、部门。 */
      is_grant_all: boolean
      /** 授予的用户ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
      user_ids?: string[]
      /** 授予的部门ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
      department_ids?: string[]
      /** 授予的用户组ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
      group_ids?: string[]
    }
    export type Manager = {
      user_id?: string
      name?: string
      en_name?: string
    }
    export type Job = {
      id?: unknown
      name?: string
    }
    export type WorkLocation = {
      id?: unknown
      name?: string
    }
    export type NativeRegion = {
      iso_code?: string
      name?: string
    }
    export type ContractCompany = {
      id?: unknown
      name?: string
    }
    export type EmergencyContact = {
      name?: string
      relationship?: number
      mobile?: string
    }
    export type Education = {
      level?: number
      school?: string
      major?: string
      degree?: number
      start?: string
      end?: string
    }
    export type WorkExperience = {
      company?: string
      department?: string
      job?: string
      start?: string
      end?: string
      description?: string
    }
    export type SystemFields = {
      /** 中文姓名 */
      name?: string
      /** 英文姓名 */
      en_name?: string
      /** 邮箱 */
      email?: string
      /** 手机号码 */
      mobile?: string
      /** 部门id */
      department_id?: string
      /** 上级 */
      manager?: Lark.Manager
      /** 职位 */
      job?: Lark.Job
      /** 职级 */
      job_level?: Lark.JobLevel
      /** 工作地点 */
      work_location?: Lark.WorkLocation
      /** 性别 */
      gender?: number
      /** 生日 */
      birthday?: string
      /** 籍贯 */
      native_region?: Lark.NativeRegion
      /** 民族 */
      ethnicity?: number
      /** 婚姻状况 */
      marital_status?: number
      /** 政治面貌 */
      political_status?: number
      /** 参加工作日期 */
      entered_workforce_date?: string
      /** 证件类型 */
      id_type?: number
      /** 证件号 */
      id_number?: string
      /** 户口类型 */
      hukou_type?: number
      /** 户口所在地 */
      hukou_location?: string
      /** 银行卡号 */
      bank_account_number?: string
      /** 开户行 */
      bank_name?: string
      /** 社保账号 */
      social_security_account?: string
      /** 公积金账号 */
      provident_fund_account?: string
      /** 工号 */
      employee_no?: string
      /** 雇员类型 */
      employee_type?: number
      /** 员工状态 */
      status?: number
      /** 入职日期 */
      hire_date?: string
      /** 试用期（月） */
      probation_months?: number
      /** 转正日期 */
      conversion_date?: string
      /** 转正申请 */
      application?: number
      /** 转正状态 */
      application_status?: number
      /** 离职日期 */
      last_day?: string
      /** 离职类型 */
      departure_type?: number
      /** 离职原因 */
      departure_reason?: number
      /** 离职备注 */
      departure_notes?: string
      /** 合同公司 */
      contract_company?: Lark.ContractCompany
      /** 合同类型 */
      contract_type?: number
      /** 合同开始日期 */
      contract_start_date?: string
      /** 合同到期日期 */
      contract_expiration_date?: string
      /** 劳动合同签订次数 */
      contract_sign_times?: number
      /** 个人邮箱 */
      personal_email?: string
      /** 家庭地址 */
      family_address?: string
      /** 主要紧急联系人 */
      primary_emergency_contact?: Lark.EmergencyContact
      /** 紧急联系人 */
      emergency_contact?: Lark.EmergencyContact[]
      /** 最高学历 */
      highest_level_of_edu?: Lark.Education
      /** 教育经历 */
      education?: Lark.Education[]
      /** 前工作经历 */
      former_work_exp?: Lark.WorkExperience
      /** 工作经历 */
      work_exp?: Lark.WorkExperience[]
      /** 身份证照片（人像面） */
      id_photo_po_side?: Lark.Attachment[]
      /** 身份证照片（国徽面） */
      id_photo_em_side?: Lark.Attachment[]
      /** 证件照 */
      id_photo?: Lark.Attachment[]
      /** 学位证书 */
      diploma_photo?: Lark.Attachment[]
      /** 毕业证书 */
      graduation_cert?: Lark.Attachment[]
      /** 奖励证明 */
      cert_of_merit?: Lark.Attachment[]
      /** 离职证明 */
      offboarding_file?: Lark.Attachment[]
      /** 取消入职原因 */
      cancel_onboarding_reason?: number
      /** 取消入职备注 */
      cancel_onboarding_notes?: string
      /** 入职登记表状态 */
      employee_form_status?: number
      /** 创建时间 */
      create_time?: unknown
      /** 更新时间 */
      update_time?: unknown
    }
    export type CustomFields = {
      key?: string
      label?: string
      type?: string
      /** 根据type不同，结构不同，不同type对应的数据结构在type的枚举值中有描述 */
      value?: string
    }
    export type Employee = {
      /** user_id转换 */
      user_id?: string
      /** 系统字段 */
      system_fields?: Lark.SystemFields
      /** 自定义字段 */
      custom_fields?: Lark.CustomFields[]
    }
    export type Nationality = {
      /** 国籍 ID（对应其他查询结果的 nationality_id_v2 字段） */
      nationality_id?: string
      /** 名称 */
      name?: Lark.I18n[]
      /** 二字码 */
      alpha_2_code?: string
      /** 三字码 */
      alpha_3_code?: string
      /** 数字代码 */
      numeric_code?: number
      /** 国家 / 地区 ID ，可通过【查询单条国家/地区信息】 接口查询 */
      country_region_id?: string
      /** 状态 */
      status?: number
    }
    export type Bank = {
      /** 银行 ID */
      bank_id?: string
      /** 银行名称 */
      bank_name?: Lark.I18n[]
      /** 总行代码 */
      bank_code?: string
      /** 国家 / 地区 ID ，可通过【查询单条国家/地区信息】 接口查询 */
      country_region_id?: string
      /** 状态 */
      status?: number
    }
    export type BankBranch = {
      /** 支行 ID */
      bank_branch_id?: string
      /** 支行名称 */
      bank_branch_name?: Lark.I18n[]
      /** 所属银行 ID，可通过【查询银行信息】接口查询 */
      bank_id?: string
      /** 金融分支机构编码 */
      code?: string
      /** 银行代码 */
      swift_code?: string
      /** 状态 */
      status?: number
    }
    export type Name = {
      /** 中文 */
      zh_cn?: string
      /** 英文 */
      en_us?: string
    }
    export type TextFieldSetting = {
      /** 是否多语言 */
      is_multilingual?: boolean
      /** 是否多行 */
      is_multiline?: boolean
      /** 最大长度 */
      max_length: number
      /** 是否是URL类型 */
      is_url_type?: boolean
    }
    export type NumberFieldSetting = {
      /** 数字类型 */
      number_field_type?: number
      /** 小数部分位数（浮点数整数部分和小数部分分别最大30位） */
      decimal_places?: number
      /** 四舍五入规则 */
      round_type?: number
      /** 整数+小数总位数 */
      decimal_total_places?: number
    }
    export type CommonSchemaOption = {
      /** 选项 api_name */
      api_name?: string
      /** 选项名称 */
      name?: Lark.Name
      /** 选项描述 */
      description?: Lark.Name
    }
    export type EnumFieldSetting = {
      /** 枚举选项信息 */
      enum_field_option_list?: Lark.CommonSchemaOption[]
      /** 是否为多选 */
      is_multiple?: boolean
    }
    export type LookupFieldSetting = {
      /** 查找字段对应的对象 apiname，可通过【获取自定义字段列表】接口获取这个对象中定义的自定义字段 */
      lookup_obj_api_name?: string
      /** 是否为多值 */
      is_multiple?: boolean
    }
    export type DateTimeFieldSetting = {
      /** 时间类型 */
      date_time_type?: number
    }
    export type AttachmentFieldSetting = {
      /** 是否支持多个文件 */
      is_multiple?: boolean
      /** 文件类型 */
      file_type?: number
    }
    export type ImageFieldSetting = {
      /** 图片类型 */
      image_type?: number
      /** 显示样式 */
      display_style?: number
    }
    export type CommonSchemaConfig = {
      /** 文本配置信息 */
      text_field_setting?: Lark.TextFieldSetting
      /** 数字配置信息 */
      number_field_setting?: Lark.NumberFieldSetting
      /** 枚举配置信息 */
      enum_field_setting?: Lark.EnumFieldSetting
      /** 查找字段配置信息 */
      lookup_field_setting?: Lark.LookupFieldSetting
      /** 日期时间配置信息 */
      date_time_field_setting?: Lark.DateTimeFieldSetting
      /** 附件配置信息 */
      attachment_field_setting?: Lark.AttachmentFieldSetting
      /** 图片配置信息 */
      image_field_setting?: Lark.ImageFieldSetting
    }
    export type Object = {
      /** 对象 apiname */
      object_api_name?: string
      /** 对象名称 */
      name?: Lark.Name
      /** 是否启用 */
      is_open?: boolean
      /** 创建时间 */
      create_time?: string
      /** 更新时间 */
      update_time?: string
    }
    export type CountryRegion = {
      /** 国家/地区 ID */
      country_region_id?: string
      /** 国家/地区名称 */
      name?: Lark.I18n[]
      /** 国家/地区全称 */
      full_name?: Lark.I18n[]
      /** 国家地区二字码 */
      alpha_2_code?: string
      /** 国家地区三字码 */
      alpha_3_code?: string
      /** 国际电话区号 */
      global_code?: string
      /** 状态 */
      status?: number
    }
    export type Enum = {
      /** 枚举值 */
      enum_name: string
      /** 枚举多语展示 */
      display?: Lark.I18n[]
    }
    export type CountryRegionSubdivision = {
      /** 省份/行政区 ID */
      country_region_subdivision_id?: string
      /** 省份/行政区名称 */
      name?: Lark.I18n[]
      /** 所属国家/地区 ID，详细信息可通过【查询国家/地区信息】接口查询获得 */
      country_region_id?: string
      /** 行政区类型，枚举值可通过文档【飞书人事枚举常量】行政区类型（subdivision_type）枚举定义部分获得 */
      subdivision_type?: Lark.Enum
      /** 省份/行政区三字码 */
      iso_code?: string
      /** 状态 */
      status?: number
    }
    export type City = {
      /** 城市 ID */
      city_id?: string
      /** 城市名称 */
      name?: Lark.I18n[]
      /** 所属国家/地区 ID，详细信息可通过【查询国家/地区信息】接口查询获得 */
      country_region_subdivision_id?: string
      /** 城市三字码 */
      code?: string
      /** 状态 */
      status?: number
    }
    export type District = {
      /** 区/县 ID */
      district_id?: string
      /** 名称 */
      name?: Lark.I18n[]
      /** 所属城市 ID */
      city_id?: string
      /** 状态 */
      status?: number
    }
    export type ObjectFieldData = {
      /** 字段名 */
      field_name: string
      /** 字段值，是json转义后的字符串，根据元数据定义不同，字段格式不同(123, 123.23, true, [\"id1\",\"id2\], 2006-01-02 15:04:05]) */
      value: string
    }
    export type EmployeeType = {
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 名称 */
      name: Lark.I18n[]
      /** 默认雇员类型 */
      default_employee_type: boolean
      /** 启用 */
      active: boolean
      /** 编码 */
      code?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }
    export type NationalIdType = {
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 国家 / 地区 */
      country_region_id: string
      /** 名称 */
      name: Lark.I18n[]
      /** 启用 */
      active: boolean
      /** 校验规则 */
      validation_rule: string
      /** 校验规则描述 */
      validation_rule_description?: Lark.I18n[]
      /** 编码 */
      code: string
      /** 证件类型 */
      identification_type: Lark.Enum
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }
    export type WorkingHoursType = {
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 编码 */
      code?: string
      /** 名称 */
      name: Lark.I18n[]
      /** 国家/地区 */
      country_region_id_list?: string[]
      /** 职务默认值 */
      default_for_job: boolean
      /** 启用 */
      active: boolean
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }
    export type Currency = {
      /** 货币 ID */
      currency_id?: string
      /** 货币所属国家/地区 ID，详细信息可通过【查询国家/地区信息】接口查询获得 */
      country_region_id?: string
      /** 货币名称 */
      currency_name?: Lark.I18n[]
      /** 数字代码 */
      numeric_code?: number
      /** 三位字母代码 */
      currency_alpha_3_code?: string
      /** 状态 */
      status?: number
    }
    export type CustomName = {
      /** 中文 */
      zh_cn?: string
      /** 英文 */
      en_us?: string
    }
    export type CustomFieldData = {
      /** 自定义字段 apiname，即自定义字段的唯一标识 */
      custom_api_name: string
      /** 自定义字段名称 */
      name?: Lark.CustomName
      /** 自定义字段类型 */
      type?: number
      /** 字段值，是 json 转义后的字符串，根据元数据定义不同，字段格式不同（如 123, 123.23, "true", ["id1","id2"], "2006-01-02 15:04:05"） */
      value: string
    }
    export type WorkEmail = {
      /** 邮箱地址 */
      email: string
      /** 邮箱用途，枚举值可通过文档【飞书人事枚举常量】邮箱用途（email_usage）枚举定义获得 */
      email_usage?: Lark.Enum
    }
    export type JobDataCostCenter = {
      /** 成本中心 ID，可以通过【查询单个成本中心信息】接口获取对应的成本中心信息 */
      cost_center_id?: string
      /** 分摊比例 */
      rate?: number
    }
    export type PersonName = {
      /** 姓 - 本地文字 */
      local_primary?: string
      /** 名 - 本地文字 */
      local_first_name?: string
      /** 国家 / 地区 */
      country_region_id: string
      /** 姓名类型 */
      name_type: Lark.Enum
      /** 名 - 第二本地文字 */
      local_first_name_2?: string
      /** 姓 - 第二本地文字 */
      local_primary_2?: string
      /** 补充姓名类型 */
      additional_name_type?: Lark.Enum
      /** 名 */
      first_name?: string
      /** 全名 */
      full_name?: string
      /** 姓氏称谓 */
      hereditary?: string
      /** 自定义姓名（未传入时，姓名将默认根据所属国家 / 地区规则对相关姓、名字段拼接） */
      custom_name?: string
      /** 本地文字的自定义姓名（未传入时，本地文字的姓名将默认根据所属国家 / 地区规则对本地文字的相关姓、名字段拼接） */
      custom_local_name?: string
      /** 中间名 */
      middle_name?: string
      /** 姓 */
      name_primary?: string
      /** 第二姓氏 */
      secondary?: string
      /** 尊称 */
      social?: Lark.Enum
      /** 婚后姓氏 */
      tertiary?: string
      /** 头衔 */
      title?: Lark.Enum
      /** 本地中间名 */
      local_middle_name?: string
      /** 第二姓氏 - 本地文字 */
      local_secondary?: string
      /** 展示姓名（本地和西方文字） */
      display_name_local_and_western_script?: string
      /** 展示姓名（本地文字） */
      display_name_local_script?: string
      /** 展示姓名（西方文字） */
      display_name_western_script?: string
    }
    export type Phone = {
      /** 国家区号 */
      international_area_code?: Lark.Enum
      /** 电话号码 */
      phone_number: string
      /** 完整电话号码 */
      formatted_phone_number?: string
      /** 设备类型 */
      device_type?: Lark.Enum
      /** 电话用途 */
      phone_usage?: Lark.Enum
      /** 主要电话 */
      is_primary?: boolean
      /** 公开电话 */
      is_public?: boolean
    }
    export type Address = {
      /** 完整地址（本地文字） */
      full_address_local_script?: string
      /** 完整地址（西方文字） */
      full_address_western_script?: string
      /** 地址 ID */
      address_id?: string
      /** 国家 / 地区 */
      country_region_id: string
      /** 主要行政区 */
      region_id?: string
      /** 城市 */
      city_id_v2?: string
      /** 区/县 */
      district_id_v2?: string
      /** 地址行 1（非拉丁语系的本地文字） */
      local_address_line1?: string
      /** 地址行 2（非拉丁语系的本地文字） */
      local_address_line2?: string
      /** 地址行 3（非拉丁语系的本地文字） */
      local_address_line3?: string
      /** 地址行 4（非拉丁语系的本地文字） */
      local_address_line4?: string
      /** 地址行 5（非拉丁语系的本地文字） */
      local_address_line5?: string
      /** 地址行 6（非拉丁语系的本地文字） */
      local_address_line6?: string
      /** 地址行 7（非拉丁语系的本地文字） */
      local_address_line7?: string
      /** 地址行 8（非拉丁语系的本地文字） */
      local_address_line8?: string
      /** 地址行 9（非拉丁语系的本地文字） */
      local_address_line9?: string
      /** 邮政编码 */
      postal_code?: string
      /** 地址类型 */
      address_type_list: Lark.Enum[]
      /** 主要地址 */
      is_primary: boolean
      /** 公开地址 */
      is_public: boolean
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }
    export type Email = {
      /** 邮箱地址 */
      email: string
      /** 是否为主要邮箱 */
      is_primary?: boolean
      /** 是否为公开邮箱 */
      is_public?: boolean
      /** 邮箱用途，枚举值可通过文档【飞书人事枚举常量】邮箱用途（email_usage）枚举定义获得 */
      email_usage?: Lark.Enum
    }
    export type WorkExperienceInfo = {
      /** 公司 / 组织 */
      company_organization?: Lark.I18n[]
      /** 部门 */
      department?: Lark.I18n[]
      /** 岗位 */
      job?: Lark.I18n[]
      /** 工作描述 */
      description?: Lark.I18n[]
      /** 开始日期 */
      start_date?: string
      /** 结束日期 */
      end_date?: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }
    export type BankAccount = {
      /** 银行名称 */
      bank_name?: string
      /** 银行账号 */
      bank_account_number: string
      /** 开户人姓名 */
      account_holder: string
      /** 支行名称 */
      branch_name?: string
      /** 银行 ID，详细信息可通过【查询银行信息】接口查询获得 */
      bank_id_v2?: string
      /** 支行 ID，要求必须为填入银行的支行，详细信息可通过【查询支行信息】接口查询获得 */
      branch_id_v2?: string
      /** 国家/地区 ID，详细信息可通过【查询国家/地区信息】接口查询获得 */
      country_region_id?: string
      /** 银行卡用途，枚举值可通过文档【飞书人事枚举常量】银行卡用途（Bank Account Usage）枚举定义部分获得 */
      bank_account_usage?: Lark.Enum[]
      /** 银行卡类型，枚举值可通过文档【飞书人事枚举常量】银行卡类型（Bank Account Type）枚举定义部分获得 */
      bank_account_type?: Lark.Enum
      /** 货币id */
      currency_id?: string
      /** 国际银行账号 */
      IBAN?: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }
    export type NationalId = {
      /** 国家证件类型 */
      national_id_type_id: string
      /** 证件号码 */
      national_id_number: string
      /** 证件签发日期 */
      issue_date?: string
      /** 证件到期日期 */
      expiration_date?: string
      /** 国家 / 地区 */
      country_region_id: string
      /** 证件签发机构 */
      issued_by?: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }
    export type Dependent = {
      /** 姓名 */
      name?: Lark.PersonName
      /** 关系 */
      relationship: Lark.Enum
      /** 性别 */
      gender?: Lark.Enum
      /** 生日 */
      date_of_birth?: string
      /** 国籍 ID，可通过【查询国籍信息】接口查询 */
      nationality_id_v2?: string
      /** 证件号码 */
      national_id_list?: Lark.NationalId[]
      /** 配偶工作状态 */
      spouses_working_status?: Lark.Enum
      /** 包含家属医疗保险 */
      is_this_person_covered_by_health_insurance?: boolean
      /** 允许家属抵扣税款 */
      is_this_person_allowed_for_tax_deduction?: boolean
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
      /** 家庭成员姓名 */
      dependent_name?: string
      /** 工作单位 */
      employer?: string
      /** 岗位 */
      job?: string
      /** 电话 */
      phone?: Lark.Phone
      /** 联系地址 */
      address?: Lark.Address
      /** 出生证明 */
      birth_certificate_of_child?: Lark.File[]
    }
    export type PersonalProfile = {
      /** 资料类型 */
      personal_profile_type?: Lark.Enum
      /** 上传文件列表 */
      files?: Lark.File[]
    }
    export type ResidentTax = {
      /** 年度 */
      year_resident_tax: string
      /** -| 居民身份，枚举值 api_name 可通过【获取字段详情】接口查询，查询参数如下： - object_api_name = "resident_tax" - custom_api_name = "resident_status" */
      resident_status?: Lark.Enum
      /** 国家/地区，可通过【查询国家/地区信息】 接口查询 */
      tax_country_region_id?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }
    export type PersonInfo = {
      /** 个人信息 ID */
      person_id?: string
      /** 个人电话 */
      phone_number?: string
      /** 法定姓名 */
      legal_name?: string
      /** 常用名 */
      preferred_name?: string
      /** 常用本地全名 */
      preferred_local_full_name?: string
      /** 常用英文全名 */
      preferred_english_full_name?: string
      /** 姓名列表 */
      name_list?: Lark.PersonName[]
      /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
      gender?: Lark.Enum
      /** 出生日期 */
      date_of_birth?: string
      /** 国籍 ID，可通过【查询国籍信息】接口查询 */
      nationality_id_v2?: string
      /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
      race?: Lark.Enum
      /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
      marital_status?: Lark.Enum
      /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
      phone_list?: Lark.Phone[]
      /** 地址列表 */
      address_list?: Lark.Address[]
      /** 邮箱列表 */
      email_list?: Lark.Email[]
      /** 工作经历列表 */
      work_experience_list?: Lark.WorkExperienceInfo[]
      /** 教育经历列表 */
      education_list?: Lark.Education[]
      /** 银行账户 */
      bank_account_list?: Lark.BankAccount[]
      /** 证件 */
      national_id_list?: Lark.NationalId[]
      /** 家庭成员列表 */
      dependent_list?: Lark.Dependent[]
      /** 紧急联系人列表 */
      emergency_contact_list?: Lark.EmergencyContact[]
      /** 参加工作日期 */
      date_entered_workforce?: string
      /** 工龄 */
      working_years?: number
      /** 头像资源的 ID */
      profile_image_id?: string
      /** 邮箱地址 */
      email_address?: string
      /** 年龄 */
      age?: number
      /** 最高学历教育经历 */
      highest_level_of_education?: Lark.Education
      /** 最高学位教育经历 */
      highest_degree_of_education?: Lark.Education
      /** 个人资料附件 */
      personal_profile?: Lark.PersonalProfile[]
      /** 籍贯 ID */
      native_region?: string
      /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
      hukou_type?: Lark.Enum
      /** 户口所在地 */
      hukou_location?: string
      /** 人才 ID */
      talent_id?: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
      /** 居民身份证件号码 */
      national_id_number?: string
      /** 家庭地址 */
      family_address?: string
      /** 出生国家/地区 */
      born_country_region?: string
      /** 是否残疾 */
      is_disabled?: boolean
      /** 残疾证号 */
      disable_card_number?: string
      /** 是否烈属 */
      is_martyr_family?: boolean
      /** 烈属证号 */
      martyr_card_number?: string
      /** 是否孤老 */
      is_old_alone?: boolean
      /** 居民身份信息 */
      resident_taxes?: Lark.ResidentTax[]
      /** 首次入境日期 */
      first_entry_time?: string
      /** 预计离境日期 */
      leave_time?: string
    }
    export type BasicDepartment = {
      /** 部门 ID */
      id?: string
      /** 部门名称 */
      department_name?: Lark.I18n[]
    }
    export type BasicPersonInfo = {
      /** 个人信息 ID */
      person_id?: string
      /** 常用名 */
      preferred_name?: string
      /** 常用本地全名 */
      preferred_local_full_name?: string
      /** 常用英文全名 */
      preferred_english_full_name?: string
    }
    export type BasicEmployee = {
      /** 雇佣 ID */
      employment_id?: string
      /** 工号 */
      employee_number?: string
      /** 邮箱地址 */
      email_address?: string
      /** 基本个人信息 */
      person_info?: Lark.BasicPersonInfo
    }
    export type EmploymentCreate = {
      /** 待入职 ID */
      prehire_id?: string
      /** 人员类型 */
      employee_type_id?: string
      /** 司龄 */
      tenure?: string
      /** 部门 ID，枚举值及详细信息可通过【批量查询部门】接口查询获得 */
      department_id?: string
      /** 职级 ID，枚举值及详细信息可通过【批量查询职务级别】接口查询获得 */
      job_level_id?: string
      /** 工作地点 ID，枚举值及详细信息可通过【批量查询地点】接口查询获得 */
      work_location_id?: string
      /** 职务序列 ID，枚举值及详细信息可通过【批量查询职务序列】接口查询获得 */
      job_family_id?: string
      /** 职务 ID，枚举值及详细信息可通过【批量查询职务】接口查询获得 */
      job_id?: string
      /** 法人主体 ID，枚举值及详细信息可通过【批量查询公司】接口查询获得 */
      company_id?: string
      /** 工时制度 ID，枚举值及详细信息可通过【批量查询工时制度】接口查询获得 */
      working_hours_type_id?: string
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 资历起算日期 */
      seniority_date?: string
      /** 员工编号 */
      employee_number?: string
      /** 入职日期 */
      effective_time: string
      /** 离职日期 */
      expiration_time?: string
      /** 雇佣类型 */
      employment_type: Lark.Enum
      /** 人员信息，引用Person的ID */
      person_id: string
      /** 试用期时长 */
      probation_period?: number
      /** 是否在试用期中 */
      on_probation?: string
      /** 试用期结束日期 */
      probation_end_date?: string
      /** 是否是主雇佣信息 */
      primary_employment: boolean
      /** 雇员状态 */
      employment_status?: Lark.Enum
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 工作邮箱列表 */
      work_email_list?: Lark.Email[]
      /** 邮箱 */
      email_address?: string
      /** 离职原因 */
      reason_for_offboarding?: Lark.Enum
      /** 成本中心列表 */
      cost_center_list?: Lark.JobDataCostCenter[]
      /** 招聘应用 ID */
      ats_application_id?: string
      /** 是否离职重聘 */
      rehire?: Lark.Enum
      /** 历史雇佣信息 ID */
      rehire_employment_id?: string
    }
    export type Employment = {
      /** 待入职 ID */
      prehire_id?: string
      /** 人员类型 */
      employee_type_id?: string
      /** 司龄 */
      tenure?: string
      /** 部门 ID，枚举值及详细信息可通过【批量查询部门】接口查询获得 */
      department_id?: string
      /** 职级 ID，枚举值及详细信息可通过【批量查询职务级别】接口查询获得 */
      job_level_id?: string
      /** 工作地点 ID，枚举值及详细信息可通过【批量查询地点】接口查询获得 */
      work_location_id?: string
      /** 职务序列 ID，枚举值及详细信息可通过【批量查询职务序列】接口查询获得 */
      job_family_id?: string
      /** 职务 ID，枚举值及详细信息可通过【批量查询职务】接口查询获得 */
      job_id?: string
      /** 法人主体 ID，枚举值及详细信息可通过【批量查询公司】接口查询获得 */
      company_id?: string
      /** 工时制度 ID，枚举值及详细信息可通过【批量查询工时制度】接口查询获得 */
      working_hours_type_id?: string
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 资历起算日期 */
      seniority_date?: string
      /** 员工编号 */
      employee_number?: string
      /** 入职日期 */
      effective_time: string
      /** 离职日期 */
      expiration_time?: string
      /** 雇佣类型 */
      employment_type: Lark.Enum
      /** 人员信息，引用Person的ID */
      person_id: string
      /** 试用期时长 */
      probation_period?: number
      /** 是否在试用期中 */
      on_probation?: string
      /** 试用期结束日期 */
      probation_end_date?: string
      /** 是否是主雇佣信息 */
      primary_employment: boolean
      /** 雇员状态 */
      employment_status?: Lark.Enum
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 工作邮箱列表 */
      work_email_list?: Lark.Email[]
      /** 邮箱 */
      email_address?: string
      /** 离职原因 */
      reason_for_offboarding?: Lark.Enum
      /** 成本中心列表 */
      cost_center_list?: Lark.JobDataCostCenter[]
      /** 招聘应用 ID */
      ats_application_id?: string
    }
    export type SupportCostCenterItem = {
      /** 支持的成本中心id */
      cost_center_id?: string
      /** 分摊比例 */
      rate?: number
    }
    export type JobData = {
      /** 实体在 CoreHR 内部的唯一键 */
      id?: string
      /** 级别 */
      job_level_id?: string
      /** 雇员类型 */
      employee_type_id: string
      /** 工时制度 */
      working_hours_type_id?: string
      /** 工作地点 */
      work_location_id?: string
      /** 部门 */
      department_id?: string
      /** 职务 */
      job_id?: string
      /** 试用期开始日期 */
      probation_start_date?: string
      /** 试用期 */
      probation_end_date?: string
      /** 主任职 */
      primary_job_data: boolean
      /** Employment ID */
      employment_id: string
      /** 生效时间 */
      effective_time: string
      /** 失效时间 */
      expiration_time?: string
      /** 职务分类 ID */
      job_family_id?: string
      /** 任职原因 */
      assignment_start_reason?: Lark.Enum
      /** 试用期结束日期 */
      probation_expected_end_date?: string
      /** 周工作时长 */
      weekly_working_hours?: number
      /** 实线主管 */
      direct_manager_id?: string
      /** 虚线主管 */
      dotted_line_manager_id_list?: string[]
      /** 第二实线主管 */
      second_direct_manager_id?: string
      /** 成本中心分摊信息 */
      cost_center_rate?: Lark.SupportCostCenterItem[]
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }
    export type BasicJobData = {
      /** 任职信息 ID */
      job_data_id?: string
      /** 雇佣 ID */
      employment_id?: string
    }
    export type EmployeeJobData = {
      /** Employment ID */
      employment_id: string
      /** 实体在 CoreHR 内部的唯一键 */
      job_datas?: Lark.JobData[]
    }
    export type DepartmentParentInfo = {
      /** 部门 ID */
      department_id?: string
      /** 部门名称 */
      department_name?: Lark.I18n[]
      /** 上级部门 ID */
      parent_department_id?: string
      /** 是否启用 */
      active?: boolean
      /** 是否根部门 */
      is_root?: boolean
    }
    export type DepartmentParents = {
      /** 部门 ID */
      department_id?: string
      /** 父部门列表，部门按照至底向上的顺序返回 */
      parent_department_list?: Lark.DepartmentParentInfo[]
    }
    export type HiberarchyCommon = {
      /** 上级组织 */
      parent_id?: string
      /** 名称 */
      name: Lark.I18n[]
      /** 启用 */
      active: boolean
      /** 编码 */
      code?: string
      /** 描述 */
      description?: Lark.I18n[]
    }
    export type DepartmentCreate = {
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 子类型 */
      sub_type?: Lark.Enum
      /** 部门负责人 */
      manager?: string
      /** 是否保密 */
      is_confidential?: boolean
      /** 层级关系，内层字段见实体 */
      hiberarchy_common: Lark.HiberarchyCommon
      /** 生效时间 */
      effective_time: string
      /** 失效时间 */
      expiration_time?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 成本中心id */
      cost_center_id?: string
    }
    export type Company = {
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 层级关系，内层字段见实体 */
      hiberarchy_common: Lark.HiberarchyCommon
      /** 性质 */
      type?: Lark.Enum
      /** 行业 */
      industry_list?: Lark.Enum[]
      /** 法定代表人 */
      legal_representative?: Lark.I18n[]
      /** 邮编 */
      post_code?: string
      /** 纳税人识别号 */
      tax_payer_id?: string
      /** confidential */
      confidential?: boolean
      /** 主体类型 */
      sub_type_list?: Lark.Enum[]
      /** 是否为分公司 */
      branch_company?: boolean
      /** 主要负责人 */
      primary_manager?: Lark.I18n[]
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }
    export type PhoneNumberAndAreaCode = {
      /** 区号 */
      area_code: Lark.Enum
      /** 号码 */
      phone_number: string
    }
    export type CostCenter = {
      /** 成本中心ID */
      cost_center_id?: string
      /** 成本中心名称 */
      name: Lark.I18n[]
      /** 编码 */
      code?: string
      /** 上级成本中心ID */
      parent_cost_center_id?: string
      /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
      managers?: string[]
      /** 成本中心描述 */
      description?: Lark.I18n[]
      /** 生效时间 */
      effective_time: string
      /** 过期时间 */
      expiration_time?: string
      /** 当前实体是否启用 */
      active?: boolean
    }
    export type CostCenterVersion = {
      /** 成本中心ID */
      cost_center_id?: string
      /** 成本中心版本ID */
      version_id?: string
      /** 成本中心名称 */
      name: Lark.I18n[]
      /** 编码 */
      code?: string
      /** 上级成本中心ID */
      parent_cost_center_id?: string
      /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
      managers?: string[]
      /** 成本中心描述 */
      description?: Lark.I18n[]
      /** 生效时间 */
      effective_time: string
      /** 过期时间 */
      expiration_time?: string
      /** 当前实体是否启用 */
      active?: boolean
    }
    export type BasicInfo = {
      /** 描述 */
      name?: Lark.Name
      /** 手机号 */
      phone_number?: string
      /** 区号 */
      international_area_code?: string
      /** 个人邮箱 */
      email?: string
      /** 生日 */
      date_of_birth?: string
      /** 证件号 */
      personal_id_number?: string
      /** 参加工作日期 */
      date_entered_workforce?: string
      /** 性别 */
      gender_id?: string
      /** 国籍 */
      nationality_id?: string
      /** 家庭地址 */
      home_address?: string
      /** 人员编号 */
      worker_id?: string
    }
    export type OfferInfo = {
      /** Offer id */
      offer_id?: string
      /** Offer hr id */
      offer_hr_id?: string
      /** 部门 id */
      department_id?: string
      /** 直属领导id */
      direct_leader_id?: string
      /** 职务id */
      job_id?: string
      /** 序列id */
      job_family_id?: string
      /** 级别id */
      job_level_id?: string
      /** 职务头衔id */
      job_title?: string
      /** 试用期开始日期 */
      probation_start_date?: string
      /** 试用期结束日期 */
      probation_end_date?: string
      /** 合同开始日期 */
      contract_start_date?: string
      /** 合同结束日期 */
      contract_end_date?: string
      /** 入职日期 */
      onboarding_date?: string
      /** 入职地点id */
      onboarding_location_id?: string
      /** 办公地点id */
      office_location_id?: string
      /** 招聘来源id */
      recruitment_type_id?: string
      /** 试用期时长 */
      probation_period?: string
      /** 人员类型id */
      employee_type_id?: string
      /** 雇佣类型id */
      employment_type_id?: string
      /** 工作邮箱 */
      work_email?: string
      /** 期限类型id */
      duration_type_id?: string
      /** 签订类型id */
      signing_type_id?: string
      /** 入职方式 */
      entry_mode?: string
      /** 社保城市id */
      social_security_city_id?: string
      /** 合同类型 */
      contract_type?: string
      /** 公司 */
      company?: string
      /** 成本中心分摊信息 */
      cost_center_rate?: Lark.JobDataCostCenter[]
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }
    export type EducationInfo = {
      /** 学校名称 */
      school_name?: string
      /** 学历 */
      education?: string
      /** 开始时间 */
      start_time?: string
      /** 结束时间 */
      end_time?: string
      /** 专业 */
      field_of_study?: string
    }
    export type PreHire = {
      /** 招聘系统的候选人 ID */
      ats_application_id?: string
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 入职日期 */
      hire_date?: string
      /** 雇佣类型 */
      employee_type: Lark.Enum
      /** 人员编号 */
      worker_id?: string
      /** 雇佣类型 */
      employee_type_id: string
      /** 引用Person ID */
      person_id: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 成本中心分摊信息 */
      cost_center_rate?: Lark.SupportCostCenterItem[]
      /** 入职状态 */
      onboarding_status: Lark.Enum
    }
    export type PreHireQuery = {
      /** 招聘系统的候选人 ID */
      ats_application_id?: string
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 入职日期 */
      hire_date?: string
      /** 雇佣类型 */
      employee_type: Lark.Enum
      /** 人员编号 */
      worker_id?: string
      /** 雇佣类型 */
      employee_type_id: string
      /** 引用Person ID */
      person_id: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 入职状态 */
      onboarding_status: Lark.Enum
      /** 成本中心分摊信息 */
      cost_center_rate?: Lark.SupportCostCenterItem[]
      /** 工作邮箱 */
      work_email_list?: Lark.Email[]
      /** 部门ID */
      department_id?: string
    }
    export type Contract = {
      /** 合同ID */
      id?: string
      /** 合同开始日期 */
      effective_time?: string
      /** 合同结束日期 */
      contract_end_date?: string
      /** 实际结束日期 */
      expiration_time?: string
      /** 雇佣 ID */
      employment_id?: string
      /** 合同类型，枚举值可通过文档【飞书人事枚举常量】合同类型（contract_type）枚举定义部分获得 */
      contract_type?: Lark.Enum
      /** 合同主体, 引用Company的ID，枚举值及详细信息可通过【批量查询公司】接口查询获得 */
      first_party_company_id?: string
      /** Person ID，枚举值及详细信息可通过【批量查询个人信息】接口查询获得 */
      person_id?: string
      /** 期限类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（duration_type）枚举定义部分获得 */
      duration_type?: Lark.Enum
      /** 合同编号 */
      contract_number?: string
      /** 签订类型，枚举值可通过文档【飞书人事枚举常量】签订类型（signing_type）枚举定义部分获得 */
      signing_type?: Lark.Enum
    }
    export type Assessment = {
      /** 考核结果 ID */
      assessment_id?: string
      /** 考核状态 */
      assessment_status?: Lark.Enum
      /** 试用期考核结果 */
      assessment_result?: Lark.Enum
      /** 考核得分 */
      assessment_score?: number
      /** 试用期考核等级 */
      assessment_grade?: Lark.Enum
      /** 考核评语 */
      assessment_comment?: string
      /** 考核结果页面超链接 */
      assessment_detail?: string
      /** 是否为最终考核结果 */
      is_final_asssessment?: boolean
    }
    export type ProbationInfo = {
      /** 雇佣 ID */
      employment_id?: string
      /** 试用期信息 ID */
      probation_id?: string
      /** 试用期开始日期 */
      probation_start_date?: string
      /** 试用期预计结束日期 */
      probation_expected_end_date?: string
      /** 试用期实际结束日期 */
      actual_probation_end_date?: string
      /** 转正发起日期 */
      initiating_time?: string
      /** 发起方 */
      submission_type?: Lark.Enum
      /** 转正发起人的雇佣 ID，当系统发起转正时该字段为空 */
      initiator_id?: string
      /** 试用期状态 */
      probation_status?: Lark.Enum
      /** 员工自评 */
      self_review?: string
      /** 备注 */
      notes?: string
      /** 流程实例 ID */
      process_id?: string
      /** 是否通过 BPM 转正 */
      converted_via_bpm?: boolean
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
      /** 试用期考核最终状态 */
      final_assessment_status?: Lark.Enum
      /** 试用期考核最终结果 */
      final_assessment_result?: Lark.Enum
      /** 试用期考核最终得分 */
      final_assessment_score?: number
      /** 试用期考核最终等级 */
      final_assessment_grade?: Lark.Enum
      /** 试用期考核最终评语 */
      final_assessment_comment?: string
      /** 最终考核结果页面超链接 */
      final_assessment_detail?: string
      /** 试用期考核结果列表 */
      assessments?: Lark.Assessment[]
    }
    export type AssessmentForCreate = {
      /** 考核状态 */
      assessment_status: string
      /** 试用期考核结果 */
      assessment_result?: string
      /** 考核得分 */
      assessment_score?: number
      /** 试用期考核等级 */
      assessment_grade?: string
      /** 考核评语 */
      assessment_comment?: string
      /** 考核结果页面超链接 */
      assessment_detail?: string
      /** 是否为最终考核结果 */
      is_final_asssessment: boolean
    }
    export type TransferReason = {
      /** 异动原因唯一标识 */
      transfer_reason_unique_identifier?: string
      /** 内容 */
      name?: Lark.I18n[]
      /** active */
      active?: boolean
      /** 上级异动原因唯一标识 */
      parent_transfer_reason_unique_identifier?: string
      /** 创建时间 */
      created_time?: string
      /** 更新时间 */
      updated_time?: string
    }
    export type TransferType = {
      /** 异动类型唯一标识 */
      transfer_type_unique_identifier?: string
      /** 异动类型名称 */
      name?: Lark.I18n[]
      /** 异动类型状态 */
      active?: boolean
      /** 关联流程唯一标识符 */
      flow_id?: string
      /** 关联流程名称 */
      flow_name?: Lark.I18n[]
      /** 创建时间 */
      created_time?: string
      /** 更新时间 */
      updated_time?: string
    }
    export type TransferInfo = {
      /** 备注 */
      remark?: string
      /** offer信息 */
      offer_info?: string
      /** 是否撤销虚线上级 */
      target_dotted_manager_clean?: boolean
      /** 是否有试用期 */
      probation_exist?: boolean
      /** 原部门 */
      original_department?: string
      /** 新部门 */
      target_department?: string
      /** 原工作地点 */
      original_work_location?: string
      /** 新工作地点 */
      target_work_location?: string
      /** 原直属上级 */
      original_direct_manager?: string
      /** 新直属上级 */
      target_direct_manager?: string
      /** 原虚线上级 */
      original_dotted_manager?: string
      /** 新虚线上级 */
      target_dotted_manager?: string
      /** 原职务 */
      original_job?: string
      /** 新职务 */
      target_job?: string
      /** 原序列 */
      original_job_family?: string
      /** 新序列 */
      target_job_family?: string
      /** 原级别 */
      original_job_level?: string
      /** 新级别 */
      target_job_level?: string
      /** 原人员类型 */
      original_workforce_type?: string
      /** 新人员类型 */
      target_workforce_type?: string
      /** 原公司 */
      original_company?: string
      /** 新公司 */
      target_company?: string
      /** 原合同编号 */
      original_contract_number?: string
      /** 新合同编号 */
      target_contract_number?: string
      /** 原合同类型 */
      original_contract_type?: string
      /** 新合同类型 */
      target_contract_type?: string
      /** 原期限类型 */
      original_duration_type?: string
      /** 新期限类型 */
      target_duration_type?: string
      /** 原签订类型 */
      original_signing_type?: string
      /** 新签订类型 */
      target_signing_type?: string
      /** 原合同开始日期 */
      original_contract_start_date?: string
      /** 新合同开始日期 */
      target_contract_start_date?: string
      /** 原合同结束日期 */
      original_contract_end_date?: string
      /** 新合同结束日期 */
      target_contract_end_date?: string
      /** 原工时制度 */
      original_working_hours_type?: string
      /** 新工时制度 */
      target_working_hours_type?: string
      /** 原工作日历 */
      original_working_calendar?: string
      /** 新工作日历 */
      target_working_calendar?: string
      /** 原试用期预计结束日期 */
      original_probation_end_date?: string
      /** 新试用期预计结束日期 */
      target_probation_end_date?: string
      /** 原周工作时长 */
      original_weekly_working_hours?: string
      /** 新周工作时长 */
      target_weekly_working_hours?: string
      /** 原排班 */
      original_work_shift?: string
      /** 新排班 */
      target_work_shift?: string
      /** 原成本中心分摊信息 */
      original_cost_center_rate?: Lark.SupportCostCenterItem[]
      /** 新成本中心分摊信息 */
      target_cost_center_rate?: Lark.SupportCostCenterItem[]
    }
    export type JobChange = {
      /** 异动记录 id */
      job_change_id?: string
      /** 雇员 id */
      employment_id?: string
      /** 异动状态 */
      status?: string
      /** 异动类型 */
      transfer_type_unique_identifier?: string
      /** 异动原因 */
      transfer_reason_unique_identifier?: string
      /** 异动流程 id */
      process_id?: string
      /** 生效时间 */
      effective_date?: string
      /** 创建时间 */
      created_time?: string
      /** 异动详细信息 */
      transfer_info?: Lark.TransferInfo
    }
    export type OffboardingReason = {
      /** 离职原因唯一标识 */
      offboarding_reason_unique_identifier?: string
      /** 名称 */
      name?: Lark.I18n[]
      /** 是否启用 */
      active?: boolean
      /** 当前离职原因的父级原因唯一标识 */
      parent_offboarding_reason_unique_identifier?: string
      /** 创建时间 */
      created_time?: string
      /** 更新时间 */
      updated_time?: string
    }
    export type ApplicationInfo = {
      /** 离职审批发起人的雇佣 ID */
      apply_initiator_id?: string
      /** 离职申请流程发起时间 */
      apply_initiating_time?: string
      /** 离职申请流程结束时间 */
      apply_finish_time?: string
      /** 流程 ID */
      process_id?: string
    }
    export type OffboardingInfo = {
      /** 离职员工的雇佣 ID */
      employment_id?: string
      /** 员工的 hrbp 列表，所有的 hrbp */
      hrbp_id?: string[]
      /** 期望离职日期 */
      expected_offboarding_date?: string
      /** 离职日期 */
      offboarding_date?: string
      /** 离职原因 */
      reason?: Lark.Enum
      /** 离职原因说明 */
      reason_explanation?: string
      /** 离职原因（员工） */
      employee_reason?: Lark.Enum
      /** 离职原因说明（员工） */
      employee_reason_explanation?: string
      /** 是否加入离职屏蔽名单 */
      add_block_list?: string
      /** 屏蔽原因 */
      block_reason?: Lark.Enum
      /** 屏蔽原因说明 */
      block_reason_explanation?: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }
    export type OffboardingChecklist = {
      /** 离职办理状态 */
      checklist_status?: string
      /** 离职流转开始时间 */
      checklist_start_time?: string
      /** 离职流转结束时间 */
      checklist_finish_time?: string
      /** 离职流转流程实例 ID */
      checklist_process_id?: string
    }
    export type Offboarding = {
      /** 离职发起类型，包括： */
      initiating_type?: string
      /** 离职状态 */
      status?: string
      /** 离职审批信息 */
      application_info?: Lark.ApplicationInfo
      /** 员工离职信息 */
      offboarding_info?: Lark.OffboardingInfo
      /** 离职办理流程信息 */
      offboarding_checklist?: Lark.OffboardingChecklist
    }
    export type LeaveGrantingRecord = {
      /** 假期授予记录 ID */
      id: string
      /** 员工 ID */
      employment_id: string
      /** 假期类型 ID */
      leave_type_id: string
      /** 授予数量 */
      granting_quantity: string
      /** 授予时长单位 */
      granting_unit: number
      /** 生效时间 */
      effective_date: string
      /** 失效时间（根据休假规则自动计算） */
      expiration_date: string
      /** 授予来源 */
      granted_by: number
      /** 授予原因 */
      reason: Lark.I18n[]
      /** 授予记录的创建时间，毫秒级unix时间戳 */
      created_at: string
      /** 授予记录的创建人，值为创建人的员工 ID */
      created_by: string
      /** 授予记录的更新时间 */
      updated_at: string
      /** 授予记录的更新人，值为更新人的员工 ID */
      updated_by: string
    }
    export type LeaveSubtype = {
      /** 假期子类ID */
      leave_type_id: string
      /** 假期子类名称 */
      leave_type_name: Lark.I18n[]
    }
    export type LeaveType = {
      /** 假期类型ID */
      leave_type_id: string
      /** 假期类型名称 */
      leave_type_name: Lark.I18n[]
      /** 假期类型状态 */
      status: number
      /** 假期子类列表 */
      leave_subtype_list?: Lark.LeaveSubtype[]
      /** 假期类型的创建时间 */
      created_at: string
      /** 假期类型的创建人，值为创建人的员工 ID */
      created_by: string
      /** 假期类型的更新时间 */
      updated_at: string
      /** 假期类型的更新人，值为更新人的员工 ID */
      updated_by: string
    }
    export type LeaveBalance = {
      /** 假期类型ID */
      leave_type_id: string
      /** 假期类型名称 */
      leave_type_name: Lark.I18n[]
      /** 结转的历史周期授予时长 */
      historical_cycles_left?: string
      /** 本周期授予时长 */
      this_cycle_total?: string
      /** 本周期已休时长 */
      this_cycle_taken: string
      /** 假期余额 */
      leave_balance: string
      /** 假期时长的单位 */
      leave_duration_unit: number
    }
    export type EmploymentLeaveBalance = {
      /** 雇佣信息ID */
      employment_id: string
      /** 员工姓名 */
      employment_name: Lark.I18n[]
      /** 余额查看日期 */
      as_of_date: string
      /** 假期余额列表 */
      leave_balance_list: Lark.LeaveBalance[]
    }
    export type LeaveRequestDetail = {
      /** 请假记录id */
      leave_request_id: string
      /** 假期发生日期 */
      leave_date: string
      /** 假期时长 */
      leave_duration: string
      /** 假期时长单位，1：天，2：小时 */
      leave_duration_unit: number
      /** 是否影响算薪，1：不参与算薪计算, 非对应的日期类型或者无对应的假期计划，2：影响算薪，3：不影响算薪 */
      paid_type: number
    }
    export type LeaveRequest = {
      /** 请假记录ID */
      leave_request_id: string
      /** 雇佣信息ID */
      employment_id: string
      /** 员工姓名 */
      employment_name: Lark.I18n[]
      /** 假期类型ID */
      leave_type_id: string
      /** 假期类型名称 */
      leave_type_name: Lark.I18n[]
      /** 假期开始时间 */
      start_time: string
      /** 假期结束时间 */
      end_time: string
      /** 假期时长 */
      leave_duration: string
      /** 假期时长的单位 */
      leave_duration_unit: number
      /** 请假记录的状态 */
      leave_request_status: number
      /** 数据来源 */
      grant_source: string
      /** 返岗时间 */
      return_time: string
      /** 发起时间 */
      submitted_at: string
      /** 发起人 */
      submitted_by: string
      /** 备注 */
      notes: string
      /** 审批通过日期 */
      approval_date?: string
      /** 是否带薪 */
      is_deducted?: boolean
      /** 请假详情 */
      details?: Lark.LeaveRequestDetail[]
      /** 假期类型枚举 */
      leave_type_code?: string
      /** 实际结束日期 */
      actual_end_date?: string
      /** 预估结束日期 */
      estimated_end_date?: string
      /** 时区 */
      time_zone?: string
    }
    export type EmploymentBp = {
      /** 员工雇佣 ID */
      employment_id?: string
      /** 员工直属 HRBP 雇佣 ID，若员工是部门负责人，且同部门 HRBP 在权限中配置了 HRBP 不可见部门负责人，则在结果中不会出现该 HRBP */
      hrbp_ids?: string[]
      /** 员工直属属地 BP 雇佣 ID */
      location_bp_ids?: string[]
    }
    export type DepartmentHrbp = {
      /** 部门 ID */
      department_id?: string
      /** 部门 HRBP 雇佣 ID */
      hrbp_ids?: string[]
    }
    export type Bp = {
      /** 部门 ID */
      department_id?: string
      /** 部门 HRBP 的雇佣 ID，不包括上级部门的 HRBP */
      hrbp_id?: string
    }
    export type BpRoleOrganization = {
      /** 角色类型的唯一标识 */
      role_key: string
      /** 部门 id */
      department_id: string
      /** 工作地点 id */
      work_location_id?: string
    }
    export type Hrbp = {
      /** HRBP/属地 BP 的雇员ID */
      employment_id_list: string[]
      /** 部门 id */
      department_id?: string
      /** 工作地点 id */
      work_location_id?: string
    }
    export type ManagementScope = {
      /** 管理维度 */
      management_dimension: string
      /** 被授权管理维度对象ID */
      obj_id: string
    }
    export type RoleAuthorization = {
      /** 雇员 ID */
      employment_id: string
      /** 实际授权管理范围 */
      management_scope_list?: Lark.ManagementScope[]
    }
    export type SecurityGroup = {
      /** 角色ID */
      id: string
      /** 角色code */
      code: string
      /** 角色名称 */
      name?: Lark.Name
      /** 状态 */
      active_status: number
      /** 角色描述 */
      description?: Lark.Name
      /** 更新时间 */
      update_time: string
    }
    export type DataengineI18n = {
      /** 中文值 */
      zh_cn?: string
      /** 英文值 */
      en_us?: string
    }
    export type ProcessLink = {
      /** web端单据详情页地址 */
      web_link?: string
      /** 飞书pc端单据详情页地址 */
      pc_link?: string
      /** 飞书移动端单据详情页地址 */
      mobile_link?: string
    }
    export type ProcessAbstractItem = {
      /** 摘要标题 */
      name?: Lark.DataengineI18n
      /** 摘要值 */
      value?: Lark.DataengineI18n
    }
    export type ProcessTodoItem = {
      /** 单据ID */
      approver_id?: string
      /** 单据类型 */
      type?: number
      /** 单据地址 */
      links?: Lark.ProcessLink
      /** 操作人ID */
      operator_id?: string
      /** 操作人姓名 */
      operator_name?: Lark.DataengineI18n
      /** 节点名称 */
      node_name?: Lark.DataengineI18n
      /** 创建时间，Unix毫秒时间戳 */
      create_time?: string
      /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
      node_definition_id?: string
    }
    export type ProcessCcItem = {
      /** 单据ID */
      approver_id?: string
      /** 单据地址 */
      links?: Lark.ProcessLink
      /** 抄送人ID */
      operator_id?: string
      /** 抄送人姓名 */
      operator_name?: Lark.DataengineI18n
      /** 节点名称 */
      node_name?: Lark.DataengineI18n
      /** 抄送时间，Unix毫秒时间戳 */
      create_time?: string
      /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
      node_definition_id?: string
    }
    export type ProcessDoneItem = {
      /** 单据ID */
      approver_id?: string
      /** 单据类型 */
      type?: number
      /** 单据状态 */
      status?: number
      /** 单据地址 */
      links?: Lark.ProcessLink
      /** 操作人ID */
      operator_id?: string
      /** 操作人姓名 */
      operator_name?: Lark.DataengineI18n
      /** 节点名称 */
      node_name?: Lark.DataengineI18n
      /** 创建时间，Unix毫秒时间戳 */
      create_time?: string
      /** 完成时间，Unix毫秒时间戳 */
      complete_time?: string
      /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
      node_definition_id?: string
    }
    export type BpmDataengineI18n = {
      /** i18n类型字段，中文值 */
      zh_cn?: string
      /** i18n类型字段，英文值 */
      en_us?: string
    }
    export type FormFieldVariableTextValue = {
      /** 文本类型变量的值 */
      value?: string
    }
    export type FormFieldVariableNumberValue = {
      /** 数值类型变量的值 */
      value?: string
    }
    export type FormFieldVariableDateValue = {
      /** 日期变量的值，从1970起的天数 */
      value?: number
    }
    export type FormFieldVariableEmploymentValue = {
      /** employmentID */
      value?: string
      /** 员工ID 如3158117 */
      user_id?: string
    }
    export type FormFieldVariableDatetimeValue = {
      /** 毫秒的时间戳 */
      value?: number
      /** 时区 */
      zone?: string
    }
    export type FormFieldVariableEnumValue = {
      /** 枚举值 */
      value?: string
      /** 枚举的名称 */
      name?: Lark.BpmDataengineI18n
      /** 枚举的描述 */
      desc?: Lark.BpmDataengineI18n
    }
    export type FormFieldVariableNullValue = {

    }
    export type FormFieldVariableBoolValue = {
      /** 布尔变量的值 */
      value?: boolean
    }
    export type FormFieldVariableDepartmentValue = {
      /** 部门ID */
      value?: string
    }
    export type FormFieldVariableFileValue = {
      /** 文件源类型（1BPM; 2主数据） */
      source_type?: number
      /** 文件id */
      file_id?: string
      /** 文件名称 */
      file_name?: string
      /** 文件长度 */
      length?: number
      /** mime type */
      mime_type?: string
    }
    export type FormFieldVariableI18nValue = {
      /** i18n值 */
      value?: Lark.BpmDataengineI18n
    }
    export type FormFieldVariableObjectValue = {
      /** 对象ID */
      value?: string
      /** 主数据apiName */
      wk_api_name?: string
    }
    export type FormFieldVariableListObject = {
      /** 文本变量对象 */
      text_value?: Lark.FormFieldVariableTextValue
      /** 数值变量对象 */
      number_value?: Lark.FormFieldVariableNumberValue
      /** 日期变量对象 */
      date_value?: Lark.FormFieldVariableDateValue
      /** 员工变量对象 */
      employment_value?: Lark.FormFieldVariableEmploymentValue
      /** 日期时间变量对象 */
      date_time_value?: Lark.FormFieldVariableDatetimeValue
      /** 枚举变量对象 */
      enum_value?: Lark.FormFieldVariableEnumValue
      /** 空变量对象 */
      null_value?: Lark.FormFieldVariableNullValue
      /** 布尔变量对象 */
      bool_value?: Lark.FormFieldVariableBoolValue
      /** 部门变量对象 */
      department_value?: Lark.FormFieldVariableDepartmentValue
      /** 文件变量对象 */
      file_value?: Lark.FormFieldVariableFileValue
      /** i18n变量对象 */
      i18n_value?: Lark.FormFieldVariableI18nValue
      /** 对象变量 */
      object_value?: Lark.FormFieldVariableObjectValue
    }
    export type FormFieldVariableListValue = {
      /** 列表值 */
      values?: Lark.FormFieldVariableListObject[]
    }
    export type FormVariableValueInfo = {
      /** 文本变量对象 */
      text_value?: Lark.FormFieldVariableTextValue
      /** 数值变量对象 */
      number_value?: Lark.FormFieldVariableNumberValue
      /** 日期变量对象 */
      date_value?: Lark.FormFieldVariableDateValue
      /** 员工变量对象 */
      employment_value?: Lark.FormFieldVariableEmploymentValue
      /** 日期时间变量对象 */
      date_time_value?: Lark.FormFieldVariableDatetimeValue
      /** 枚举变量对象 */
      enum_value?: Lark.FormFieldVariableEnumValue
      /** 空变量对象 */
      null_value?: Lark.FormFieldVariableNullValue
      /** 布尔变量对象 */
      bool_value?: Lark.FormFieldVariableBoolValue
      /** 部门变量对象 */
      department_value?: Lark.FormFieldVariableDepartmentValue
      /** 文件变量对象 */
      file_value?: Lark.FormFieldVariableFileValue
      /** i18n变量对象 */
      i18n_value?: Lark.FormFieldVariableI18nValue
      /** 对象变量 */
      object_value?: Lark.FormFieldVariableObjectValue
      /** 列表对象 */
      list_value?: Lark.FormFieldVariableListValue
    }
    export type FormFieldVariable = {
      /** 变量api名称 */
      variable_api_name?: string
      /** 变量名称的i18n描述 */
      variable_name?: Lark.BpmDataengineI18n
      /** 变量值的对象 */
      variable_value?: Lark.FormVariableValueInfo
    }
    export type ReferenceObject = {
      /** cpst_item(项目)、 cpst_indicator(指标) */
      api_name?: string
      /** 值列表 例如部门ID */
      id?: string
    }
    export type CpstStandardType = {
      /** 薪资标准类型 */
      api_name?: string
    }
    export type CpstBandWidth = {
      /** 上限 */
      upper_limit?: string
      /** 下限 */
      lower_limit?: string
    }
    export type CpstGradeStandardValue = {
      /** 薪资标准的关联对象，项目或者指标 */
      reference_object?: Lark.ReferenceObject
      /** 薪资标准类型 */
      standard_type?: Lark.CpstStandardType
      /** 上下限 */
      band_width?: Lark.CpstBandWidth
      /** 标准值 */
      standard_value?: string
    }
    export type CpstI18n = {
      /** 中文 */
      zh_cn?: string
      /** 英文 */
      en_us?: string
    }
    export type CpstCurrency = {
      /** 币种ID */
      currency_id?: string
      /** 币种code */
      code?: string
      /** 币种名称 */
      name?: Lark.CpstI18n
    }
    export type CpstGrade = {
      /** 薪资等级ID */
      grade_id?: string
      /** 薪资等级时间轴ID */
      grade_tid?: string
      /** 带宽上下限和标准值 */
      grade_standard_value?: Lark.CpstGradeStandardValue
      /** 币种 */
      currency?: Lark.CpstCurrency
      /** 薪资标准描述 */
      description?: Lark.CpstI18n
    }
    export type CpstMatchItem = {
      /** 薪资标准表ID */
      standard_id?: string
      /** 薪资等级 */
      grade?: Lark.CpstGrade
      /** 生效时间 */
      effective_time?: string
    }
    export type CombinedJobObjectValueMap = {
      /** 结构 ID */
      object_id?: string
      /** 结构值 */
      value?: string
    }
    export type JobManager = {
      /** 职位ID */
      id?: string
      /** 招聘负责人ID */
      recruiter_id: string
      /** 用人经理ID列表 */
      hiring_manager_id_list: string[]
      /** 协助人ID列表 */
      assistant_id_list?: string[]
    }
    export type CombinedJobResultDefaultJobPost = {
      /** 默认职位广告的 ID，用以发布至招聘渠道的内容 */
      id?: string
    }
    export type JobRecruitmentType = {
      /** 雇佣类型 ID */
      id?: string
      /** 雇佣类型中文名称 */
      zh_name?: string
      /** 雇佣类型英文名称 */
      en_name?: string
      /** 雇佣类型启用状态 */
      active_status?: number
    }
    export type JobDepartment = {
      /** 部门 ID */
      id?: string
      /** 部门中文名称 */
      zh_name?: string
      /** 部门英文名称 */
      en_name?: string
    }
    export type JobCity = {
      /** 工作地点城市代码 */
      city_code?: string
      /** 工作地点中文名称 */
      zh_name?: string
      /** 工作地点英文名称 */
      en_name?: string
    }
    export type JobHighlight = {
      /** 职位亮点 ID */
      id?: string
      /** 职位亮点中文名称 */
      zh_name?: string
      /** 职位亮点英文名称 */
      en_name?: string
    }
    export type JobCategory = {
      /** 职位序列 ID */
      id?: string
      /** 职位序列中文名称 */
      zh_name?: string
      /** 职位序列英文名称 */
      en_name?: string
      /** 职位序列启用状态 */
      active_status?: number
    }
    export type JobType = {
      /** 职位类别 ID */
      id?: string
      /** 职位类别中文名称 */
      zh_name?: string
      /** 职位类别英文名称 */
      en_name?: string
    }
    export type JobCustomizedOption = {
      /** 选项 ID */
      key?: string
      /** 选项名称 */
      name?: Lark.I18n
    }
    export type JobCustomizedTimeRange = {
      /** 开始时间 */
      start_time?: string
      /** 结束时间 */
      end_time?: string
    }
    export type JobCustomizedValue = {
      /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
      content?: string
      /** 当字段类型为单选时，从此字段取值 */
      option?: Lark.JobCustomizedOption
      /** 当字段类型为多选时，从此字段取值 */
      option_list?: Lark.JobCustomizedOption[]
      /** 当字段类型为时间段时，从此字段取值 */
      time_range?: Lark.JobCustomizedTimeRange
      /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是毫秒级时间戳 */
      time?: string
      /** 当字段类型为数字时，从此字段取值 */
      number?: string
    }
    export type JobCustomizedData = {
      /** 自定义字段 ID */
      object_id?: string
      /** 字段名称 */
      name?: Lark.I18n
      /** 字段类型 */
      object_type?: number
      /** 自定义字段值 */
      value?: Lark.JobCustomizedValue
    }
    export type IdNameObject = {
      /** ID */
      id?: string
      /** 名称 */
      name?: Lark.I18n
    }
    export type CodeNameObject = {
      /** 编码 */
      code?: string
      /** 名称 */
      name?: Lark.I18n
    }
    export type TargetMajorInfo = {
      /** 目标专业ID */
      id?: string
      /** 目标专业中文名称 */
      zh_name?: string
      /** 目标专业英文名称 */
      en_name?: string
    }
    export type RegistrationSchemaInfo = {
      /** 信息登记表ID */
      schema_id?: string
      /** 信息登记表名称 */
      name?: string
    }
    export type CombinedJobResult = {
      /** 职位广告 */
      default_job_post?: Lark.CombinedJobResultDefaultJobPost
      /** 职位 */
      job?: Lark.Job
      /** 职位负责人 */
      job_manager?: Lark.JobManager
      /** 面试登记表 */
      interview_registration_schema_info?: Lark.RegistrationSchemaInfo
      /** 入职登记表 */
      onboard_registration_schema_info?: Lark.RegistrationSchemaInfo
      /** 目标专业 */
      target_major_list?: Lark.TargetMajorInfo[]
    }
    export type JobConfigInterviewRound = {
      /** 面试官列表 */
      interviewer_list?: Lark.IdNameObject[]
      /** 面试轮次 */
      round?: number
    }
    export type RegistrationInfo = {
      /** 面试登记表ID */
      schema_id?: string
      /** 面试登记表名称 */
      name?: string
    }
    export type JobConfigRoundTypeResult = {
      /** 面试轮次类型 */
      assessment_round?: Lark.IdNameObject
      /** 面试评价表 */
      assessment_template?: Lark.IdNameObject
    }
    export type InterviewAppointmentConfigContent = {
      /** 面试类型 */
      interview_type?: number
      /** 时区 */
      talent_timezone_code?: string
      /** 联系人id */
      contact_user_id?: string
      /** 联系人电话 */
      contact_mobile?: string
      /** 联系人邮箱 */
      contact_email?: string
      /** 地址id */
      address_id?: string
      /** 视频面试类型 */
      video_type?: number
      /** 抄送人id lsit */
      cc?: string[]
      /** 备注 */
      remark?: string
      /** 面试通知模板 */
      interview_notification_template_id?: string
      /** 预约通知模板 */
      appointment_notification_template_id?: string
      /** 取消面试通知 */
      cancel_interview_notification_template_id?: string
    }
    export type InterviewAppointmentConfig = {
      /** 是否开启面试官安排面试 */
      enable_interview_appointment_by_interviewer?: boolean
      /** 配置详情 */
      config?: Lark.InterviewAppointmentConfigContent
    }
    export type JobConfigResult = {
      /** Offer 申请表，含 ID+name */
      offer_apply_schema?: Lark.IdNameObject
      /** Offer 审批流，含 ID+name */
      offer_process_conf?: Lark.IdNameObject
      /** 建议评估人，可多位 */
      recommended_evaluator_list?: Lark.IdNameObject[]
      /** 面试评价表，含 ID+name */
      assessment_template?: Lark.IdNameObject
      /** 职位 ID */
      id?: string
      /** 建议面试官列表，可多位 */
      interview_round_list?: Lark.JobConfigInterviewRound[]
      /** 招聘需求，含 ID+name */
      job_requirement_list?: Lark.IdNameObject[]
      /** 面试登记表 */
      interview_registration?: Lark.RegistrationInfo
      /** 入职登记表 */
      onboard_registration?: Lark.RegistrationInfo
      /** 面试轮次类型列表 */
      interview_round_type_list?: Lark.JobConfigRoundTypeResult[]
      /** 关联职位列表 */
      related_job_list?: Lark.IdNameObject[]
      /** 职位属性，1是实体职位，2是虚拟职位 */
      job_attribute?: number
      /** 面试官安排面试配置 */
      interview_appointment_config?: Lark.InterviewAppointmentConfig
    }
    export type JobConfigInterviewRoundConf = {
      /** 建议面试官 ID 列表 */
      interviewer_id_list?: string[]
      /** 面试轮次 */
      round?: number
    }
    export type JobConfigRoundType = {
      /** 面试轮次类型 ID */
      round_biz_id?: string
      /** 面试评价表 ID */
      assessment_template_biz_id?: string
    }
    export type JobTypeInfo = {
      /** 职位类别ID */
      id: string
      /** 职位类别名称 */
      name: Lark.I18n
      /** 父级职位类别ID */
      parent_id?: string
    }
    export type JobRecruiter2 = {
      /** 职位ID */
      id?: string
      /** 招聘负责人ID */
      recruiter_id?: string
      /** 用人经理ID列表 */
      hiring_manager_id_list?: string[]
      /** 协助人ID列表 */
      assistant_id_list?: string[]
    }
    export type JobRequirementCustomizedData = {
      /** 自定义字段 ID */
      object_id?: string
      /** 自定义字段 value，1. 对于自定义字段，若字段类型为单行文本/多行文本，传值格式为"这是一个文本"；2. 若字段类型为单选，传值内容为选项的 ID，格式为"6890840516938696974"；3. 若字段类型为多选，传值内容为选项的ID 列表，格式为"[\"6890840516938696974\", \"6890840516938696975\" ]"；4. 若字段类型为时间段，传值格式为"[\"1609430400000\", \"1612108800000\" ]"，单位是毫米级时间戳；5. 若字段类型为年份选择，传值格式为"1609430400000"，单位是毫秒级时间戳；6. 若字段类型为月份选择，传值格式为"1625068800000"，单位是毫秒级时间戳；7. 若字段类型为数字，传值格式为"1"; */
      value?: string
    }
    export type JobRequirementCustomizedOption = {
      /** 选项 ID */
      key?: string
      /** 选项名称 */
      name?: Lark.I18n
    }
    export type JobRequirementCustomizedTimeRange = {
      /** 开始时间，毫秒级时间戳 */
      start_time?: string
      /** 结束时间，毫秒级时间戳 */
      end_time?: string
    }
    export type JobRequirementCustomizedValue = {
      /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
      content?: string
      /** 当字段类型为单选时，从此字段取值 */
      option?: Lark.JobRequirementCustomizedOption
      /** 当字段类型为多选时，从此字段取值 */
      option_list?: Lark.JobRequirementCustomizedOption[]
      /** 当字段类型为时间段时，从此字段取值 */
      time_range?: Lark.JobRequirementCustomizedTimeRange
      /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是毫秒级时间戳 */
      time?: string
      /** 当字段类型为数字时，从此字段取值 */
      number?: string
    }
    export type JobRequirementCustomizedDataDto = {
      /** 自定义字段 ID */
      object_id?: string
      /** 字段名称 */
      name?: Lark.I18n
      /** 字段类型 */
      object_type?: number
      /** 自定义字段值 */
      value?: Lark.JobRequirementCustomizedValue
    }
    export type JobRequirementDto = {
      /** 招聘需求 ID */
      id?: string
      /** 招聘需求编号 */
      short_code?: string
      /** 需求名称 */
      name?: string
      /** 需求状态 */
      display_progress?: number
      /** 需求人数 */
      head_count?: number
      /** 职位性质 */
      recruitment_type?: Lark.IdNameObject
      /** 最高职级 */
      max_level?: Lark.IdNameObject
      /** 最低职级 */
      min_level?: Lark.IdNameObject
      /** 职位序列 */
      sequence?: Lark.IdNameObject
      /** 需求类型 */
      category?: number
      /** 需求部门 */
      department?: Lark.IdNameObject
      /** 需求负责人 */
      recruiter_list?: Lark.IdNameObject[]
      /** 需求用人经理 */
      jr_hiring_managers?: Lark.IdNameObject[]
      /** 直属上级 */
      direct_leader_list?: Lark.IdNameObject[]
      /** 开始日期，毫秒级时间戳 */
      start_time?: string
      /** 预计完成日期，毫秒级时间戳 */
      deadline?: string
      /** 招聘优先级 */
      priority?: number
      /** 学历要求 */
      required_degree?: number
      /** 最高薪资 */
      max_salary?: string
      /** 最低薪资 */
      min_salary?: string
      /** 工作地点 */
      address?: Lark.IdNameObject
      /** 需求描述 */
      description?: string
      /** 自定义字段 */
      customized_data_list?: Lark.JobRequirementCustomizedDataDto[]
      /** 关联职位 ID */
      job_id_list?: string[]
    }
    export type CommonSchemaSetting = {
      /** 字段类型 */
      object_type?: number
      /** 配置信息 */
      config?: Lark.CommonSchemaConfig
    }
    export type CommonSchemaChild = {
      /** 字段 ID */
      id?: string
      /** 字段名称 */
      name?: Lark.I18n
      /** 字段描述 */
      description?: Lark.I18n
      /** 字段信息 */
      setting?: Lark.CommonSchemaSetting
      /** 所属模块 ID */
      parent_id?: string
      /** 是否是自定义字段 */
      is_customized?: boolean
      /** 是否必填 */
      is_required?: boolean
      /** 是否启用 */
      active_status?: number
    }
    export type CommonSchema = {
      /** 模块 ID */
      id?: string
      /** 模块名称 */
      name?: Lark.I18n
      /** 模块描述 */
      description?: Lark.I18n
      /** 模块信息 */
      setting?: Lark.CommonSchemaSetting
      /** 是否是自定义模块 */
      is_customized?: boolean
      /** 是否必填 */
      is_required?: boolean
      /** 是否启用 */
      active_status?: number
      /** 字段列表 */
      children_list?: Lark.CommonSchemaChild[]
    }
    export type JobRequirementSchema = {
      /** 模板 ID */
      id?: string
      /** 国际化模板名称 */
      name?: Lark.I18n
      /** 模板字段 */
      object_list?: Lark.CommonSchema[]
    }
    export type JobProcessesStage = {
      /** ID */
      id?: string
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
      /** 1=筛选型, 2=评估型, 3=笔试型, 4=面试型, 5=Offer型, 6=待入职, 7=已入职, 8=其它类型, 255=系统默认，后端模型中并没有该字段，仅用于前端显示, */
      type?: number
    }
    export type JobProcesses = {
      /** ID */
      id?: string
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
      /** 类型 1=社招流程, 2=校招流程, */
      type?: number
      /** 阶段列表, 内部按用户设置顺序排列 */
      stage_list?: Lark.JobProcessesStage[]
    }
    export type RegistrationSchema = {
      /** 信息登记表模板 ID */
      id?: string
      /** 信息登记表模板名称 */
      name?: string
      /** 登记表适用场景 */
      scenarios?: number[]
      /** 模块列表 */
      objects?: Lark.CommonSchema[]
    }
    export type CommonAddress = {
      /** ID */
      id?: string
      /** 名称 */
      name?: Lark.I18n
      /** 区域信息 */
      district?: Lark.CodeNameObject
      /** 城市信息 */
      city?: Lark.CodeNameObject
      /** 省信息 */
      state?: Lark.CodeNameObject
      /** 国家信息 */
      country?: Lark.CodeNameObject
    }
    export type WebsiteJobPostCustomizedOption = {
      /** 选项 ID */
      key?: string
      /** 选项名称 */
      name?: Lark.I18n
    }
    export type WebsiteJobPostCustomizedTimeRange = {
      /** 开始时间 */
      start_time?: string
      /** 结束时间 */
      end_time?: string
    }
    export type WebsiteJobPostCustomizedValue = {
      /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
      content?: string
      /** 当字段类型为单选时，从此字段取值 */
      option?: Lark.WebsiteJobPostCustomizedOption
      /** 当字段类型为多选时，从此字段取值 */
      option_list?: Lark.WebsiteJobPostCustomizedOption[]
      /** 当字段类型为时间段时，从此字段取值 */
      time_range?: Lark.WebsiteJobPostCustomizedTimeRange
      /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是毫秒级时间戳 */
      time?: string
      /** 当字段类型为数字时，从此字段取值 */
      number?: string
    }
    export type WebsiteJobPostCustomizedData = {
      /** 自定义字段 ID */
      object_id?: string
      /** 字段名称 */
      name?: Lark.I18n
      /** 字段类型 */
      object_type?: number
      /** 自定义字段值 */
      value?: Lark.WebsiteJobPostCustomizedValue
    }
    export type PortalJobPost = {
      /** 职位广告 ID */
      id?: string
      /** 标题 */
      title?: string
      /** 职位 ID */
      job_id?: string
      /** 职位编码 */
      job_code?: string
      /** 职位过期时间，「null」代表「长期有效」 */
      job_expire_time?: string
      /** 职位状态 */
      job_active_status?: number
      /** 职位流程类型 */
      job_process_type?: number
      /** 职位雇佣类型 */
      job_recruitment_type?: Lark.IdNameObject
      /** 职位部门 */
      job_department?: Lark.IdNameObject
      /** 职位类型 */
      job_type?: Lark.IdNameObject
      /** 职位地址 */
      address?: Lark.CommonAddress
      /** 月薪范围-最低薪资 */
      min_salary?: string
      /** 月薪范围-最高薪资 */
      max_salary?: string
      /** 学历要求 */
      required_degree?: number
      /** 经验 */
      experience?: number
      /** 数量 */
      headcount?: number
      /** 职位亮点 */
      high_light_list?: Lark.IdNameObject[]
      /** 职位描述 */
      description?: string
      /** 职位要求 */
      requirement?: string
      /** 创建人 */
      creator?: Lark.IdNameObject
      /** 创建时间 */
      create_time?: string
      /** 修改时间 */
      modify_time?: string
      /** 自定义字段 */
      customized_data_list?: Lark.WebsiteJobPostCustomizedData[]
      /** 职位广告地址列表 */
      address_list?: Lark.CommonAddress[]
    }
    export type Referral = {
      /** 内推的 ID */
      id: string
      /** 投递 ID */
      application_id: string
      /** 创建时间（ms） */
      create_time: number
      /** 内推人的 ID */
      referral_user_id: string
      /** 内推人信息 */
      referral_user?: Lark.IdNameObject
    }
    export type ExternalApplication = {
      /** 外部投递 ID */
      id?: string
      /** 职位招聘类型 */
      job_recruitment_type?: number
      /** 职位名称 */
      job_title?: string
      /** 简历来源 */
      resume_source?: string
      /** 阶段 */
      stage?: string
      /** 人才 ID */
      talent_id: string
      /** 终止原因 */
      termination_reason?: string
      /** 投递类型 */
      delivery_type?: number
      /** 更新时间 */
      modify_time?: number
      /** 终止类型 */
      termination_type?: string
    }
    export type ExternalInterview = {
      /** 外部投递 ID */
      external_application_id: string
      /** 外部面试 ID */
      id?: string
      /** 参与状态 */
      participate_status?: number
      /** 开始时间 */
      begin_time?: number
      /** 结束时间 */
      end_time?: number
    }
    export type ExternalInterviewAssessmentDimension = {
      /** 打分题分数（当题目类型为「打分题」时使用） */
      score?: number
      /** 单选选项（当题目类型为「单选题」时使用） */
      option?: string
      /** 多选选项（当题目类型为「多选题」时使用） */
      options?: string[]
      /** 描述内容（当题目类型为「描述题」时使用） */
      content?: string
      /** 题目类型 */
      assessment_type?: number
      /** 题目标题 */
      title?: string
      /** 题目描述 */
      description?: string
    }
    export type ExternalInterviewAssessment = {
      /** 外部面评 ID */
      id?: string
      /** 面试官姓名 */
      username?: string
      /** 面试结果 */
      conclusion?: number
      /** 评价维度列表 */
      assessment_dimension_list?: Lark.ExternalInterviewAssessmentDimension[]
      /** 综合记录 */
      content?: string
      /** 外部面试 ID */
      external_interview_id: string
    }
    export type ExternalBackgroundCheckAttachment = {
      /** 附件 ID */
      id?: string
      /** 附件名字 */
      name?: string
      /** 附件大小 */
      size?: number
    }
    export type ExternalBackgroundCheck = {
      /** 外部背调 ID */
      id?: string
      /** 外部投递 ID */
      external_application_id: string
      /** 背调日期 */
      date?: number
      /** 背调名字 */
      name?: string
      /** 背调结果 */
      result?: string
      /** 背调附件ID列表 */
      attachment_id_list?: string[]
      /** 背调附件 */
      attachment_list?: Lark.ExternalBackgroundCheckAttachment[]
    }
    export type TalentFolder = {
      /** 名字 */
      name: string
      /** 文件夹ID */
      folder_id?: string
      /** 所有者ID */
      owner_id?: string
    }
    export type TalentBatchInfo = {
      /** 人才 ID */
      talent_id?: string
      /** 手机国家区号 */
      mobile_code?: string
      /** 手机号 */
      mobile_number?: string
      /** 邮箱 */
      email?: string
      /** 证件类型，可参考招聘枚举常量 IdentificationType 枚举定义 */
      identification_type?: number
      /** 证件号 */
      identification_number?: string
    }
    export type TalentNationality = {
      /** 国家编码 */
      nationality_code?: string
      /** 中文名 */
      zh_name?: string
      /** 英文名 */
      en_name?: string
    }
    export type TalentCityInfo = {
      /** 城市码 */
      city_code?: string
      /** 中文名 */
      zh_name?: string
      /** 英文名 */
      en_name?: string
    }
    export type TalentBasicInfo = {
      /** 名字 */
      name: string
      /** 手机 */
      mobile?: string
      /** 手机国家区号 */
      mobile_code?: string
      /** 手机国家代码 */
      mobile_country_code?: string
      /** 邮箱 */
      email?: string
      /** 工作年限 */
      experience_years?: number
      /** 年龄 */
      age?: number
      /** 国籍 */
      nationality?: Lark.TalentNationality
      /** 性别 */
      gender?: number
      /** 所在地点 */
      current_city?: Lark.TalentCityInfo
      /** 家乡 */
      hometown_city?: Lark.TalentCityInfo
      /** 意向地点 */
      preferred_city_list?: Lark.TalentCityInfo[]
      /** 证件类型 */
      identification_type?: number
      /** 证件号 */
      identification_number?: string
      /** 生日 */
      birthday?: number
      /** 创建人 */
      creator_id?: string
      /** 婚姻状况 */
      marital_status?: number
      /** 家庭住址 */
      current_home_address?: string
      /** 修改时间 */
      modify_time?: string
    }
    export type TalentEducationInfo = {
      /** ID */
      id?: string
      /** 学位 */
      degree?: number
      /** 学校 */
      school?: string
      /** 专业 */
      field_of_study?: string
      /** 开始时间 */
      start_time?: string
      /** 结束时间（历史字段） ,如果是至今传值 -1，传输「至今」投递进入系统后可正常查看字段，但进入编辑态后需要修改为一个具体时间 */
      end_time?: string
      /** 结束时间-新，无「至今」传值。建议使用此字段，避免模糊的毕业时间影响候选人筛选 */
      end_time_v2?: string
      /** 学历类型 */
      education_type?: number
      /** 成绩排名 */
      academic_ranking?: number
      /** 教育经历标签 */
      tag_list?: number[]
    }
    export type TalentCareerInfo = {
      /** ID */
      id?: string
      /** 公司名称 */
      company?: string
      /** 职位名称 */
      title?: string
      /** 描述 */
      desc?: string
      /** 开始时间 */
      start_time?: string
      /** 结束时间 */
      end_time?: string
      /** 经历类型 */
      career_type?: number
      /** 工作经历标签 */
      tag_list?: number[]
    }
    export type TalentProjectInfo = {
      /** ID */
      id?: string
      /** 项目名称 */
      name?: string
      /** 项目角色 */
      role?: string
      /** 项目链接 */
      link?: string
      /** 描述 */
      desc?: string
      /** 开始时间 */
      start_time?: string
      /** 结束时间 */
      end_time?: string
    }
    export type TalentWorksInfo = {
      /** ID */
      id?: string
      /** 作品链接 */
      link?: string
      /** 描述 */
      desc?: string
      /** 作品附件名称，若需获取作品附件预览信息可调用「获取附件预览信息」接口 */
      name?: string
    }
    export type TalentAwardInfo = {
      /** ID */
      id?: string
      /** 获奖名称 */
      title?: string
      /** 获奖时间 */
      award_time?: string
      /** 描述 */
      desc?: string
    }
    export type TalentLanguageInfo = {
      /** ID */
      id?: string
      /** 语言 */
      language?: number
      /** 精通程度 */
      proficiency?: number
    }
    export type TalentSnsInfo = {
      /** ID */
      id?: string
      /** SNS名称 */
      sns_type?: number
      /** URL/ID */
      link?: string
    }
    export type TalentResumeSource = {
      /** ID */
      id?: string
      /** 中文名 */
      zh_name?: string
      /** 英文名 */
      en_name?: string
    }
    export type TalentInterviewRegistrationSimple = {
      /** ID */
      id?: string
      /** 创建时间 */
      registration_time?: number
    }
    export type Talent = {
      /** 人才ID */
      id?: string
      /** 是否在猎头保护期 */
      is_in_agency_period?: boolean
      /** 是否已入职 */
      is_onboarded?: boolean
      /** 基础信息 */
      basic_info?: Lark.TalentBasicInfo
      /** 教育经历 */
      education_list?: Lark.TalentEducationInfo[]
      /** 工作经历 */
      career_list?: Lark.TalentCareerInfo[]
      /** 项目经历 */
      project_list?: Lark.TalentProjectInfo[]
      /** 作品 */
      works_list?: Lark.TalentWorksInfo[]
      /** 获奖 */
      award_list?: Lark.TalentAwardInfo[]
      /** 语言能力 */
      language_list?: Lark.TalentLanguageInfo[]
      /** 社交账号 */
      sns_list?: Lark.TalentSnsInfo[]
      /** 简历来源 */
      resume_source_list?: Lark.TalentResumeSource[]
      /** 面试登记表 */
      interview_registration_list?: Lark.TalentInterviewRegistrationSimple[]
      /** 简历附件id列表（按照简历创建时间降序） */
      resume_attachment_id_list?: string[]
      /** 最高学历 */
      top_degree?: number
      /** 第一学历 */
      first_degree?: number
    }
    export type TalentCustomizedOption = {
      /** 选项 ID */
      key?: string
      /** 选项名称 */
      name?: Lark.I18n
    }
    export type TalentCustomizedTimeRange = {
      /** 开始时间 */
      start_time?: string
      /** 结束时间，当值为至今时，返回「-」 */
      end_time?: string
    }
    export type TalentCustomizedAttachment = {
      /** 附件 ID */
      file_id?: string
      /** 附件名称 */
      file_name?: string
      /** 附件类型 */
      content_type?: string
      /** 附件大小 */
      file_size?: number
    }
    export type TalentCustomizedValue = {
      /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
      content?: string
      /** 当字段类型为单选时，从此字段取值 */
      option?: Lark.TalentCustomizedOption
      /** 当字段类型为多选时，从此字段取值 */
      option_list?: Lark.TalentCustomizedOption[]
      /** 当字段类型为时间段时，从此字段取值 */
      time_range?: Lark.TalentCustomizedTimeRange
      /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是秒级时间戳 */
      time?: string
      /** 当字段类型为数字时，从此字段取值 */
      number?: string
      /** 当字段类型为附件时，从此字段取值 */
      customized_attachment?: Lark.TalentCustomizedAttachment[]
    }
    export type TalentCustomizedDataChild = {
      /** 自定义字段 ID */
      object_id?: string
      /** 字段名称 */
      name?: Lark.I18n
      /** 字段类型 */
      object_type?: number
      /** 自定义字段值 */
      value?: Lark.TalentCustomizedValue
    }
    export type RegistrationBasicInfo = {
      /** ID */
      id?: string
      /** 创建时间 */
      registration_time?: number
      /** 下载链接 */
      download_url?: string
      /** 登记表场景 */
      scenario?: number
    }
    export type TalentCustomizedData = {
      /** 模块 ID */
      object_id?: string
      /** 模块名称 */
      name?: Lark.I18n
      /** 类型 */
      object_type?: number
      /** 模块下的字段 */
      children?: Lark.TalentCustomizedDataChild[]
    }
    export type ApplicationStageInfo = {
      /** 阶段id */
      id?: string
      /** 阶段中文名字 */
      zh_name?: string
      /** 英文名 */
      en_name?: string
      /** 阶段类型 */
      type?: number
    }
    export type ApplicationResumeSource = {
      /** 投递来源 ID */
      id?: string
      /** 投递来源名称 */
      name?: Lark.I18n
      /** 投递来源类型 */
      resume_source_type?: number
    }
    export type ApplicationWebsiteChannel = {
      /** 官网推广渠道 ID */
      channel_id?: string
      /** 官网推广渠道名称 */
      channel_name?: Lark.I18n
    }
    export type ApplicationWebsiteResumeSource = {
      /** 官网站点 ID */
      website_id?: string
      /** 官网站点名称 */
      website_name?: Lark.I18n
      /** 推广渠道来源 */
      channel?: Lark.ApplicationWebsiteChannel
    }
    export type ApplicationStageTime = {
      /** 阶段 ID */
      stage_id?: string
      /** 最近一次进入该阶段的时间 */
      enter_time?: string
      /** 最后一次离开时间，如当前在该阶段，则为空 */
      exit_time?: string
    }
    export type Evaluation = {
      /** 评估 ID */
      id?: string
      /** 投递 ID */
      application_id?: string
      /** 投递阶段 */
      stage_id?: string
      /** 创建人user_id */
      creator_id?: string
      /** 评估人user_id */
      evaluator_id?: string
      /** 提交状态 */
      commit_status?: number
      /** 评估结论 */
      conclusion?: number
      /** 评估详情 */
      content?: string
      /** 创建时间 */
      create_time?: string
      /** 最近更新时间 */
      update_time?: string
    }
    export type SelectOptionResult = {
      /** 选项 ID */
      option_id?: string
      /** 选项中文名称 */
      option_name?: string
      /** 选项英文名称 */
      option_en_name?: string
      /** 选项中文描述 */
      option_desc?: string
      /** 选项英文描述 */
      option_en_desc?: string
      /** 是否选择 */
      is_selected?: boolean
    }
    export type FiveStartScoringResult = {
      /** 最高分中文描述 */
      highest_score_desc?: string
      /** 最高分英文描述 */
      highest_score_en_desc?: string
      /** 最低分中文描述 */
      lowest_score_desc?: string
      /** 最低分英文描述 */
      lowest_score_en_desc?: string
      /** 评分分数 */
      score_result?: number
    }
    export type Question = {
      /** 题目 ID */
      question_id?: string
      /** 题目中文名称 */
      question_name?: string
      /** 题目英文名称 */
      question_en_name?: string
      /** 题目中文描述 */
      question_desc?: string
      /** 题目英文描述 */
      question_en_desc?: string
      /** 题目类型 */
      question_type?: number
      /** 是否必填 */
      is_required?: boolean
      /** 选项题回答列表（单选题及多选题） */
      select_option_result_list?: Lark.SelectOptionResult[]
      /** 评分题回答 */
      five_start_scoring_result?: Lark.FiveStartScoringResult
      /** 描述题回答 */
      description_result?: string
    }
    export type Questionnaire = {
      /** 问卷 ID */
      questionnaire_id?: string
      /** 投递 ID */
      application_id?: string
      /** 面试 ID */
      interview_id?: string
      /** 问卷版本 */
      version?: number
      /** 题目列表 */
      questions?: Lark.Question[]
      /** 是否完成作答 */
      has_answers?: boolean
      /** 更新时间 */
      update_time?: string
    }
    export type InterviewScore = {
      /** 面试得分 ID */
      id?: string
      /** 分数级别 */
      level?: number
      /** 中文名称 */
      zh_name?: string
      /** 中文描述 */
      zh_description?: string
      /** 英文名称 */
      en_name?: string
      /** 英文描述 */
      en_description?: string
    }
    export type InterviewRecord = {
      /** 面试记录 ID */
      id?: string
      /** 面试官用户 ID */
      user_id?: string
      /** 面试记录内容 */
      content?: string
      /** 提交状态 */
      commit_status?: number
      /** 面试结论 */
      conclusion?: number
      /** 面试得分 */
      interview_score?: Lark.InterviewScore
      /** 面试官信息 */
      interviewer?: Lark.IdNameObject
    }
    export type InterviewAddress = {
      /** 地址 ID */
      id?: string
      /** 地址名称 */
      name?: Lark.I18n
      /** 区域 */
      district?: Lark.CodeNameObject
      /** 城市 */
      city?: Lark.CodeNameObject
      /** 省 */
      state?: Lark.CodeNameObject
      /** 国家 */
      country?: Lark.CodeNameObject
    }
    export type InterviewMeetingRoom = {
      /** 会议室 ID */
      room_id?: string
      /** 会议室名称 */
      room_name?: string
      /** 建筑名称 */
      building_name?: string
      /** 会议室预定状态 */
      reserved_status?: number
      /** 楼层 */
      floor_name?: string
    }
    export type InterviewExtend = {
      /** 面试 ID */
      id?: string
      /** 面试开始时间（ms） */
      begin_time?: number
      /** 面试结束时间（ms） */
      end_time?: number
      /** 面试轮次（从0开始计数） */
      round?: number
      /** 面试记录信息 */
      interview_record_list?: Lark.InterviewRecord[]
      /** 面试评价提交时间 */
      feedback_submit_time?: number
      /** 面试关联的投递阶段 */
      stage_id?: string
      /** 投递 ID */
      application_id?: string
      /** 阶段信息 */
      stage?: Lark.IdNameObject
      /** 创建人 */
      creator?: Lark.IdNameObject
      /** 创建时间（ms） */
      biz_create_time?: number
      /** 最近更新时间（ms） */
      biz_modify_time?: number
      /** 面试状态 */
      interview_round_summary?: number
      /** 面试安排 ID */
      interview_arrangement_id?: string
      /** 面试类型 */
      interview_type?: number
      /** 候选人时区 */
      talent_time_zone?: Lark.CodeNameObject
      /** 面试联系人 */
      contact_user?: Lark.IdNameObject
      /** 面试联系人电话 */
      contact_mobile?: string
      /** 备注 */
      remark?: string
      /** 面试地点 */
      address?: Lark.InterviewAddress
      /** 视频面试工具 */
      video_type?: number
      /** 当安排类型为集中面试时，此值表示集中面试的安排状态 */
      arrangement_status?: number
      /** 安排类型 */
      arrangement_type?: number
      /** 安排方式（是否使用自助约面） */
      arrangement_appointment_kind?: number
      /** 面试会议室 */
      meeting_room_list?: Lark.InterviewMeetingRoom[]
      /** 面试轮次类型 */
      interview_round_type?: Lark.IdNameObject
    }
    export type OfferBasicInfo = {
      /** 部门 ID */
      department_id: string
      /** 直属上级 ID */
      leader_user_id: string
      /** 职务 ID */
      employment_job_id?: string
      /** 人员类型 ID */
      employee_type_id?: string
      /** 职位序列 ID */
      job_family_id?: string
      /** 职位级别 ID */
      job_level_id?: string
      /** 试用期 */
      probation_month?: number
      /** 合同期 */
      contract_year?: number
      /** 预计入职日期 */
      expected_onboard_date?: string
      /** 入职地点 ID */
      onboard_address_id?: string
      /** 办公地点 ID */
      work_address_id?: string
      /** Offer负责人 ID */
      owner_user_id: string
      /** Offer 推荐语 */
      recommended_words?: string
      /** 招聘需求 ID */
      job_requirement_id?: string
      /** 招聘流程类型 ID */
      job_process_type_id?: number
      /** 附件ID列表 */
      attachment_id_list?: string[]
      /** 附件描述 */
      attachment_description?: string
      /** Offer操作人 ID */
      operator_user_id: string
    }
    export type OfferSalaryInfo = {
      /** 币种 */
      currency?: string
      /** 基本薪资 */
      basic_salary?: string
      /** 试用期百分比 */
      probation_salary_percentage?: string
      /** 年终奖月数 */
      award_salary_multiple?: string
      /** 期权股数 */
      option_shares?: string
      /** 季度奖金额 */
      quarterly_bonus?: string
      /** 半年奖金额 */
      half_year_bonus?: string
    }
    export type OfferCustomizedInfo = {
      /** 自定义字段 ID */
      id?: string
      /** 自定义字段信息 */
      value?: string
    }
    export type BaseBilingualWithId = {
      /** ID */
      id?: string
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
    }
    export type BaseDistrict = {
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
      /** 编码 */
      code?: string
      /** 地址类型 1=COUNTRY, 2=STATE, 3=CITY, 4=DISTRICT, 5=ADDRESS, */
      location_type?: number
    }
    export type BaseCity = {
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
      /** 编码 */
      code?: string
      /** 地址类型 1=COUNTRY, 2=STATE, 3=CITY, 4=DISTRICT, 5=ADDRESS, */
      location_type?: number
    }
    export type BaseCountry = {
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
      /** 编码 */
      code?: string
      /** 地址类型 1=COUNTRY, 2=STATE, 3=CITY, 4=DISTRICT, 5=ADDRESS, */
      location_type?: number
    }
    export type BaseAddress = {
      /** ID */
      id?: string
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
      /** 区域信息 */
      district?: Lark.BaseDistrict
      /** 城市信息 */
      city?: Lark.BaseCity
      /** 省信息 */
      state?: Lark.BaseCity
      /** 国家信息 */
      country?: Lark.BaseCountry
    }
    export type ApplicationOfferCustomValue = {
      /** 自定义字段ID */
      object_id?: string
      /** 自定义字段Value */
      customize_value?: string
    }
    export type ApplicationOfferBasicInfo = {
      /** Offer类型 1=Social, 2=Campus, 3=Intern, 4=InternTransfer */
      offer_type?: number
      /** 备注 */
      remark?: string
      /** Offer过期时间 */
      expire_time?: number
      /** Offer 负责人 ID */
      owner_user_id?: string
      /** Offer 创建人 ID */
      creator_user_id?: string
      /** Offer 人员类型 */
      employee_type?: Lark.BaseBilingualWithId
      /** 创建时间 */
      create_time?: string
      /** 直属上级 ID */
      leader_user_id?: string
      /** 入职日期 */
      onboard_date?: string
      /** 入职部门 */
      department_id?: string
      /** 试用期, 比如试用期6个月 */
      probation_month?: number
      /** 合同期, 比如3年 */
      contract_year?: number
      /** 雇员类型 */
      recruitment_type?: Lark.BaseBilingualWithId
      /** 序列 */
      sequence?: Lark.BaseBilingualWithId
      /** 级别 */
      level?: Lark.BaseBilingualWithId
      /** 入职地点 */
      onboard_address?: Lark.BaseAddress
      /** 工作地点 */
      work_address?: Lark.BaseAddress
      /** 自定义字段的value信息 */
      customize_info_list?: Lark.ApplicationOfferCustomValue[]
    }
    export type ApplicationOfferSalaryPlan = {
      /** 币种 */
      currency?: string
      /** 基本薪资, 注意是json */
      basic_salary?: string
      /** 试用期百分比 */
      probation_salary_percentage?: string
      /** 年终奖月数 */
      award_salary_multiple?: string
      /** 期权股数 */
      option_shares?: string
      /** 季度奖金额 */
      quarterly_bonus?: string
      /** 半年奖金额 */
      half_year_bonus?: string
      /** 年度现金总额(数量，非公式) */
      total_annual_cash?: string
      /** 自定义字段的value信息 */
      customize_info_list?: Lark.ApplicationOfferCustomValue[]
    }
    export type OfferJobInfo = {
      /** Offer 职位 ID */
      job_id?: string
      /** Offer 职位名称 */
      job_name?: string
    }
    export type ApplicationOffer = {
      /** Offer id */
      id?: string
      /** 投递id */
      application_id?: string
      /** 基础信息 */
      basic_info?: Lark.ApplicationOfferBasicInfo
      /** 薪酬计划 */
      salary_plan?: Lark.ApplicationOfferSalaryPlan
      /** 当前offer使用的schema */
      schema_id?: string
      /** Offer状态 */
      offer_status?: number
      /** 职位信息 */
      job_info?: Lark.OfferJobInfo
    }
    export type Offer = {
      /** Offer ID */
      id?: string
      /** 投递 ID */
      application_id?: string
      /** 基础信息 */
      basic_info?: Lark.ApplicationOfferBasicInfo
      /** 薪酬计划 */
      salary_plan?: Lark.ApplicationOfferSalaryPlan
      /** 当前 Offer 使用的 Schema */
      schema_id?: string
      /** Offer 状态 */
      offer_status?: number
      /** Offer 类型 */
      offer_type?: number
      /** 职位信息 */
      job_info?: Lark.OfferJobInfo
    }
    export type OfferListInfo = {
      /** Offer ID */
      id?: string
      /** Offer 职位 */
      job_info?: Lark.OfferJobInfo
      /** 创建时间 */
      create_time?: string
      /** Offer 状态 */
      offer_status?: number
      /** Offer 类型 */
      offer_type?: number
      /** Offer 人员类型 */
      employee_type?: Lark.BaseBilingualWithId
      /** Offer 投递 ID */
      application_id?: string
    }
    export type InternOfferOnboardingInfo = {
      /** 实际入职日期 */
      actual_onboarding_date: string
    }
    export type InternOfferOffboardingInfo = {
      /** 实际离职日期（实际离职日期需晚于实际入职日期） */
      actual_offboarding_date: string
      /** 备注 */
      notes?: string
    }
    export type InternOfferStatus = {
      /** Offer ID */
      offer_id?: string
      /** 更新入/离职状态的操作 */
      operation: string
      /** 入职表单信息（当 operation 为 confirm_onboarding 时，该字段必填） */
      onboarding_info?: Lark.InternOfferOnboardingInfo
      /** 离职表单信息（当 operation 为 offboard 时，该字段必填） */
      offboarding_info?: Lark.InternOfferOffboardingInfo
    }
    export type EmployeeConversionInfo = {
      /** 实际转正日期 */
      actual_conversion_time?: number
    }
    export type EmployeeOverboardInfo = {
      /** 实际离职日期 */
      actual_overboard_time?: number
      /** 离职原因 */
      overboard_note?: string
    }
    export type Note = {
      /** ID备注 */
      id?: string
      /** 人才ID */
      talent_id: string
      /** 投递ID */
      application_id?: string
      /** 是否私密 */
      is_private?: boolean
      /** 创建时间 */
      create_time?: number
      /** 更新时间 */
      modify_time?: number
      /** 创建人ID */
      creator_id?: string
      /** 内容 */
      content: string
    }
    export type ResumeSource = {
      /** 来源id */
      id?: string
      /** 中文名 */
      zh_name?: string
      /** 英文名 */
      en_name?: string
      /** 启用状态 */
      active_status?: number
      /** 来源类型 */
      resume_source_type?: number
    }
    export type EcoAccountCustomFieldData = {
      /** 自定义字段的标识，同一 scope 内须唯一 */
      key: string
      /** 自定义字段的名称，用户在添加账号表单看到的控件标题 */
      name: Lark.I18n
      /** 是否必填 */
      is_required: boolean
      /** 自定义字段的描述，用户在添加账号表单看到的 place holder */
      description?: Lark.I18n
    }
    export type EcoBackgroundCheckCustomFieldDataOption = {
      /** 选项的 key */
      key: string
      /** 选项的名称 */
      name: Lark.I18n
    }
    export type EcoBackgroundCheckCustomFieldData = {
      /** 自定义字段类型 */
      type: string
      /** 自定义字段的标识，在同一账号内唯一 */
      key: string
      /** 自定义字段的名称，用户在安排背调表单看到的控件标题 */
      name: Lark.I18n
      /** 是否必填 */
      is_required: boolean
      /** 自定义字段的描述，如果是输入控件，为用户在安排背调表单看到的 placeholder 或 提示文字 */
      description?: Lark.I18n
      /** type 为 select 或 multiselect 时必填，单选或多选的选项 */
      options?: Lark.EcoBackgroundCheckCustomFieldDataOption[]
    }
    export type EcoBackgroundCheckPackageData = {
      /** 套餐 ID */
      id: string
      /** 背调名称 */
      name: string
      /** 套餐描述 */
      description?: string
    }
    export type EcoBackgroundCheckPackageAdditionalItem = {
      /** 附件调查项 ID */
      id: string
      /** 附加调查项名称 */
      name: string
      /** 附加调查项描述 */
      description?: string
    }
    export type EcoBackgroundCheckReportFile = {
      /** 报告名称 */
      report_name: string
      /** 报告地址；报告地址类型为空或为1时需为可下载 pdf 的链接；为2时为预览型链接 */
      report_url: string
      /** 报告地址类型；枚举值 1 或为空时为可下载的 pdf 链接，2 为预览型链接 */
      report_url_type?: number
    }
    export type EcoExamPaperData = {
      /** 试卷 ID */
      id: string
      /** 试卷名称 */
      name: string
      /** 考试时长（分钟） */
      duration?: number
      /** 试卷题目数量 */
      question_count?: number
      /** 开始时间，留空或不传表示不限制开始时间 */
      start_time?: string
      /** 结束时间，留空或不传表示不限制结束时间 */
      end_time?: string
    }
    export type EcoExamLoginInfo = {
      /** 笔试链接 */
      exam_url: string
      /** 用户名 */
      username?: string
      /** 密码 */
      password?: string
    }
    export type EcoExamResultReport = {
      /** 报告名称 */
      name: string
      /** 报告链接 */
      url: string
      /** 作答完成时间(毫秒时间戳) */
      answer_time?: string
    }
    export type EcoExamResultDetail = {
      /** 评价 ID */
      id?: string
      /** 评价名称 */
      name: string
      /** 评价结果 */
      result: string
    }
    export type Mobile = {
      /** 国家代码 */
      code?: string
      /** 手机号码 */
      number?: string
    }
    export type BonusAmount = {
      /** 积分奖励 */
      point_bonus?: number
    }
    export type Assets = {
      /** 已确认的奖励 */
      confirmed_bonus?: Lark.BonusAmount
    }
    export type Account = {
      /** 账户ID */
      account_id: string
      /** 账户资产 */
      assets?: Lark.Assets
      /** 账号状态 */
      status?: number
    }
    export type TradeDetail = {
      /** 账户ID */
      account_id: string
      /** 时间段内该账户在积分商城的实际充值金额 */
      total_recharge_reward_info?: Lark.BonusAmount
    }
    export type CheckFailedAccountInfo = {
      /** 账户ID */
      account_id?: string
      /** 招聘系统内的提取金额 */
      total_withdraw_reward_info?: Lark.BonusAmount
      /** 商城实际充值金额 */
      total_recharge_reward_info?: Lark.BonusAmount
    }
    export type Period = {
      /** id */
      id?: string
      /** 中文名称 */
      zh_name?: string
      /** 英文名称 */
      en_name?: string
      /** 状态 */
      status?: number
      /** 周期开始时间 */
      period_start_time?: string
      /** 周期结束时间 */
      period_end_time?: string
    }
    export type PeriodRule = {
      /** 周期规则 */
      period_rule_id?: string
      /** 周期类型. year: 年度周期. month: 月份周期 */
      type?: string
      /** 周期长度（月) */
      length?: number
      /** 周期长度（月) */
      first_month?: number
    }
    export type OkrObjectiveProgressRate = {
      /** Objective 进度百分比 >= 0 */
      percent?: number
      /** Objective 进度状态 */
      status?: string
    }
    export type ProgressRecordSimplify = {
      /** OKR 进展ID */
      id?: string
    }
    export type OkrObjectiveAlignedObjectiveOwner = {
      /** 用户的 open_id */
      open_id?: string
      /** 用户的 user_id */
      user_id?: string
    }
    export type OkrObjectiveKr = {
      /** Key Result ID */
      id?: string
      /** KeyResult 内容 */
      content?: string
      /** KeyResult打分（0 - 100） */
      score?: number
      /** KeyResult的权重（0 - 100）（废弃） */
      weight?: number
      /** KeyResult的权重（0 - 100） */
      kr_weight?: number
      /** KR进度 */
      progress_rate?: Lark.OkrObjectiveProgressRate
      /** 该KR的进度列表 */
      progress_record_list?: Lark.ProgressRecordSimplify[]
      /** 最后一次进度百分比更新时间 毫秒 */
      progress_rate_percent_last_updated_time?: string
      /** 最后一次状态更新时间 毫秒 */
      progress_rate_status_last_updated_time?: string
      /** 最后一次在侧边栏新增或者编辑进展的时间 毫秒 */
      progress_record_last_updated_time?: string
      /** 最后一次编辑进展记录/备注的时间 毫秒 */
      progress_report_last_updated_time?: string
      /** 最后一次打分更新时间 毫秒 */
      score_last_updated_time?: string
      /** 截止时间 毫秒 */
      deadline?: string
      /** 该Objective提到的人员列表 */
      mentioned_user_list?: Lark.OkrObjectiveAlignedObjectiveOwner[]
    }
    export type OkrObjectiveAlignedObjective = {
      /** Objective的ID */
      id?: string
      /** OKR的ID */
      okr_id?: string
      /** 该Objective的Owner */
      owner?: Lark.OkrObjectiveAlignedObjectiveOwner
    }
    export type OkrBatch = {
      /** id */
      id?: string
      /** OKR的访问权限 */
      permission?: number
      /** period_id */
      period_id?: string
      /** 名称 */
      name?: string
      /** Objective列表 */
      objective_list?: Lark.OkrObjective[]
      /** OKR确认状态 */
      confirm_status?: number
    }
    export type ContentList = {
      /** 列表类型 */
      type?: string
      /** 列表的缩进级别，支持指定一行的缩进 除代码块以外的列表都支持设置缩进，支持 1-16 级缩进，取值范围：[1,16] */
      indentLevel?: number
      /** 用于指定列表的行号，仅对有序列表和代码块生效 如果为有序列表设置了缩进，行号可能会显示为字母或者罗马数字 */
      number?: number
    }
    export type ContentParagraphStyle = {
      /** 有序列表/无序列表/任务列表 */
      list?: Lark.ContentList
    }
    export type ContentColor = {
      /** 红 取值范围[0,255] */
      red?: number
      /** 绿 取值范围[0,255] */
      green?: number
      /** 蓝 取值范围[0,255] */
      blue?: number
      /** 透明度 取值范围[0,1] */
      alpha?: number
    }
    export type ContentLink = {
      /** 链接地址 */
      url?: string
    }
    export type ContentTextStyle = {
      /** 是否加粗 */
      bold?: boolean
      /** 是否删除 */
      strikeThrough?: boolean
      /** 背景颜色 */
      backColor?: Lark.ContentColor
      /** 字体颜色 */
      textColor?: Lark.ContentColor
      /** 链接地址 */
      link?: Lark.ContentLink
    }
    export type ContentTextRun = {
      /** 具体的文本内容 */
      text?: string
      /** 文本内容的样式，支持 BIUS、颜色等 */
      style?: Lark.ContentTextStyle
    }
    export type ContentDocsLink = {
      /** 链接地址 */
      url?: string
      /** 链接文案 */
      title?: string
    }
    export type ContentPerson = {
      /** 员工的OpenID */
      openId?: string
    }
    export type ContentParagraphElement = {
      /** 元素类型 */
      type?: string
      /** 文本 */
      textRun?: Lark.ContentTextRun
      /** 文档链接，可以根据链接自动识别为标题 */
      docsLink?: Lark.ContentDocsLink
      /** 艾特用户 */
      person?: Lark.ContentPerson
    }
    export type ContentParagraph = {
      /** 段落样式 */
      style?: Lark.ContentParagraphStyle
      /** 段落元素组成一个段落 */
      elements?: Lark.ContentParagraphElement[]
    }
    export type ContentImageItem = {
      /** 图片 token，比如boxcnOj88GDkmWGm2zsTyCBqoLb，不支持编辑 */
      fileToken?: string
      /** 图片链接 */
      src?: string
      /** 图片宽，单位px */
      width?: number
      /** 图片高，单位px */
      height?: number
    }
    export type ContentGallery = {
      /** 图片元素 */
      imageList?: Lark.ContentImageItem[]
    }
    export type ContentBlockElement = {
      /** 文档元素类型 */
      type?: string
      /** 文本段落 */
      paragraph?: Lark.ContentParagraph
      /** 图片 */
      gallery?: Lark.ContentGallery
    }
    export type ContentBlock = {
      /** 文档结构是按行排列的，每行内容是一个 Block */
      blocks?: Lark.ContentBlockElement[]
    }
    export type ProgressRecord = {
      /** OKR 进展ID */
      progress_id?: string
      /** 进展更新时间 毫秒 */
      modify_time?: string
      /** 进展 对应的 Content 详细内容 */
      content?: Lark.ContentBlock
    }
    export type ImageInfo = {
      /** 图片token */
      file_token?: string
      /** 图片下载链接 */
      url?: string
    }
    export type UserExternal = {
      /** 用户类型 */
      user_type: number
      /** 用户id */
      user_id?: string
      /** 用户名称 */
      user_name?: string
      /** 电话号码 */
      phone_num?: string
      /** 部门id */
      department_id?: string
    }
    export type DeviceExternal = {
      /** 设备id */
      id?: string
      /** 设备名称 */
      name?: string
    }
    export type OpeningTimeValidDayExternal = {
      /** 权限开始时间 */
      start_day: number
      /** 权限结束时间 */
      end_day: number
    }
    export type OpeningTimePeriodExternal = {
      /** 起始时间 */
      start_hhmm: number
      /** 结束时间 */
      end_hhmm: number
    }
    export type OpeningTimeExternal = {
      /** 有效日期 */
      valid_day?: Lark.OpeningTimeValidDayExternal
      /** 有效星期 */
      weekdays?: number[]
      /** 有效时间 */
      day_times?: Lark.OpeningTimePeriodExternal[]
    }
    export type Rule = {
      /** 权限组id */
      id?: string
      /** 权限组名称 */
      name?: string
      /** 权限组包含的设备 */
      devices?: Lark.DeviceExternal[]
      /** 权限组包含的员工个数 */
      user_count?: string
      /** 权限组包含的员工列表 */
      users?: Lark.UserExternal[]
      /** 权限组包含的访客个数 */
      visitor_count?: string
      /** 权限组包含的访客列表 */
      visitors?: Lark.UserExternal[]
      /** 是否通知人员录入 */
      remind_face?: boolean
      /** 开门时间段 */
      opening_time?: Lark.OpeningTimeExternal
      /** 是否为临时权限组 */
      is_temp?: boolean
    }
    export type Feature = {
      /** 卡号 */
      card?: number
    }
    export type AccessRecord = {
      /** 门禁记录 ID */
      access_record_id?: string
      /** 门禁记录所属用户 ID */
      user_id?: string
      /** 门禁设备 ID */
      device_id?: string
      /** 是否是打卡 */
      is_clock_in?: boolean
      /** 访问时间，单位秒 */
      access_time?: string
      /** 识别方式 */
      access_type?: string
      /** 识别相关数据，根据 access_type 不同，取值不同 */
      access_data?: string
      /** 是否开门 */
      is_door_open?: boolean
    }
    export type Semester = {
      /** 绩效评估周期 ID */
      id?: string
      /** 绩效评估周期 名称 */
      name?: Lark.I18n
      /** 绩效评估周期 开始时间 */
      start_time?: string
      /** 绩效评估周期 结束时间 */
      end_time?: string
      /** 绩效评估周期 创建时间 */
      create_time?: string
    }
    export type SemesterBaseInfo = {
      /** 周期ID */
      semester_id?: string
      /** 周期名称 */
      semester_name?: Lark.I18n
      /** 开始时间 */
      start_time?: string
      /** 结束时间 */
      end_time?: string
    }
    export type StageTaskStatusNum = {
      /** 支持的ID */
      task_option_id?: number
      /** 对Stage分类聚合 */
      stage_num?: number
    }
    export type StageTaskInfo = {
      /** 环节ID */
      stage_id?: string
      /** 环节名称 */
      name?: Lark.I18n
      /** 环节截止时间 */
      deadline?: string
      /** 环节任务数量 */
      need_todo_count?: number
      /** 环节跳转链接 */
      jump_url?: string
      /** 环节任务状态 */
      stage_task_status?: string
      /** 归属分类ID */
      task_option_id?: number
    }
    export type StageTask = {
      /** 用户ID */
      user_id?: string
      /** 状态数量列表 */
      stage_num_lists?: Lark.StageTaskStatusNum[]
      /** 任务信息列表 */
      stage_task_info_lists?: Lark.StageTaskInfo[]
    }
    export type Activity = {
      /** 绩效评估项目 ID */
      id?: string
      /** 绩效评估项目 名称 */
      name?: Lark.I18n
      /** 绩效评估周期 ID */
      semester_id?: string
    }
    export type IndicatorOption = {
      /** 等级 ID */
      id?: string
      /** 等级名称 */
      name?: Lark.I18n
      /** 等级代号 */
      label?: string
    }
    export type Indicator = {
      /** 评估项 ID */
      id?: string
      /** 评估项 名称 */
      name?: Lark.I18n
      /** 评估项 等级列表 */
      options?: Lark.IndicatorOption[]
    }
    export type Template = {
      /** 评估模板 ID */
      id?: string
      /** 评估模板名称 */
      name?: Lark.I18n
      /** 评估模板环节 */
      stage?: string
    }
    export type ReviewDetail = {
      /** 评估模板 ID */
      template_id?: string
      /** 评估内容 ID */
      unit_id?: string
      /** 评估控件 ID */
      field_id?: string
      /** 评估人 ID */
      reviewer_user_id?: Lark.User
      /** 最后提交时间 */
      submit_time?: string
      /** 评估项 ID */
      indicator_id?: string
      /** 评估项结果等级 ID */
      option_id?: string
      /** 评分型评估项填写内容 */
      score?: string
      /** 填写项填写内容 */
      text?: string
    }
    export type ReviewStage = {
      /** 环节类型 */
      stage_type?: string
      /** 环节状态 */
      progress?: number
      /** 环节填写内容 */
      data?: Lark.ReviewDetail[]
    }
    export type ReviewProfile = {
      /** 被评估人 ID */
      user_id?: Lark.User
      /** 绩效评估周期 ID */
      semester_id?: string
      /** 绩效评估项目 ID */
      activity_id?: string
      /** 本周期内各环节内容 */
      stages?: Lark.ReviewStage[]
    }
    export type ReviewData = {
      /** 绩效评估周期列表 */
      semesters?: Lark.Semester[]
      /** 绩效评估项目列表 */
      activities?: Lark.Activity[]
      /** 评估项列表 */
      indicators?: Lark.Indicator[]
      /** 评估模板列表 */
      templates?: Lark.Template[]
      /** 评估内容列表 */
      units?: Lark.Unit[]
      /** 填写项列表 */
      fields?: Lark.Field[]
      /** 评估数据列表 */
      datas?: Lark.ReviewProfile[]
    }
    export type DisplayStatus = {
      /** 是否允许在 IM 和 Doc 等场景进行高亮提示 */
      allow_highlight: boolean
      /** 是否允许在飞书中被搜索到 */
      allow_search: boolean
    }
    export type Referer = {
      /** 数据 id */
      id: string
      /** 标题 */
      title?: string
    }
    export type Abbreviation = {
      /** 相关其他词条 id */
      id?: string
    }
    export type Classification = {
      /** 唯一分类 ID */
      id: string
      /** 父级分类的 ID */
      father_id?: string
    }
    export type BaikeImage = {
      /** 通过文件接口上传后的图片 token */
      token: string
    }
    export type RelatedMeta = {
      /** 关联用户信息 */
      users?: Lark.Referer[]
      /** 关联群组信息 */
      chats?: Lark.Referer[]
      /** 关联文档信息 */
      docs?: Lark.Referer[]
      /** 关联值班者信息 */
      oncalls?: Lark.Referer[]
      /** 关联链接信息 */
      links?: Lark.Referer[]
      /** 相关词条信息 */
      abbreviations?: Lark.Abbreviation[]
      /** 所属分类信息（不支持传入一级分类。词条不可同时属于同一个一级分类下的多个二级分类，一级分类下的二级分类互斥） */
      classifications?: Lark.Classification[]
      /** 上传的相关图片 */
      images?: Lark.BaikeImage[]
    }
    export type OuterInfo = {
      /** 数据提供方（不能包含中横线 "-"） */
      provider: string
      /** 唯一标识，可用来和其他平台的内容进行绑定。需保证和百科词条唯一对应（不能包含中横线 "-"） */
      outer_id: string
    }
    export type I18nEntryDesc = {
      /** 语言类型 */
      language: number
      /** 纯文本释义 */
      description?: string
      /** 富文本描述 */
      rich_text?: string
    }
    export type Statistics = {
      /** 点赞数量 */
      like_count: number
      /** 点踩数量 */
      dislike_count: number
    }
    export type Entity = {
      /** 实体词 Id */
      id?: string
      /** 词条名 */
      main_keys: Lark.Term[]
      /** 别名 */
      aliases?: Lark.Term[]
      /** 详情描述 */
      description?: string
      /** 创建者 */
      creator?: string
      /** 词条创建时间（秒级时间戳） */
      create_time?: string
      /** 最近一次更新者 */
      updater?: string
      /** 最近一次更新词条时间（秒级时间戳） */
      update_time?: string
      /** 相关数据 */
      related_meta?: Lark.RelatedMeta
      /** 统计数据 */
      statistics?: Lark.Statistics
      /** 外部 id 关联数据 */
      outer_info?: Lark.OuterInfo
      /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
      rich_text?: string
      /** 词条的创建来源，1：用户主动创建，2：批量导入，3：官方词，4：OpenAPI 创建 */
      source?: number
      /** 国际化的词条释义 */
      i18n_descs?: Lark.I18nEntryDesc[]
    }
    export type Draft = {
      /** 草稿 Id */
      draft_id?: string
      /** 实体词 */
      entity?: Lark.Entity
    }
    export type MatchInfo = {
      /** 实体词 id */
      entity_id?: string
      /** 匹配中的字段 */
      type?: number
    }
    export type ClassificationFilter = {
      /** 需要获取的分类 */
      include?: string[]
      /** 需要排除的分类 */
      exclude?: string[]
    }
    export type Span = {
      /** 偏移量开始位置，从 0 开始计数（编码格式采用 utf-8） */
      start: number
      /** 偏移量结束位置，从 0 开始计数（编码格式采用 utf-8） */
      end: number
    }
    export type Phrase = {
      /** 文本中切分出的百科词条名称 */
      name: string
      /** 实体词 id 列表 */
      entity_ids: string[]
      /** 实体词所在位置 */
      span: Lark.Span
    }
    export type I18nClsName = {
      /** 语言类型 */
      language: number
      /** 分类名 */
      name: string
    }
    export type Repo = {
      /** 词库 id */
      id: string
      /** 词库名 */
      name: string
    }
    export type OpenapiLogDetail = {
      /** http请求路径 */
      path?: string
      /** http请求方法 */
      method?: string
      /** http查询参数 */
      query_param?: string
      /** http请求体 */
      payload?: string
      /** http状态码 */
      status_code?: number
      /** http响应体，仅返回code，msg，error信息等 */
      response?: string
    }
    export type OpenapiLog = {
      /** openapi日志唯一标识 */
      id: string
      /** 飞书开放平台定义的API */
      api_key: string
      /** 日志产生的时间，以秒为单位的时间戳 */
      event_time?: number
      /** 在开发者后台——凭证与基础信息页面查看的app_id（cli_xxxxx） */
      app_id?: string
      /** 发起调用api的ip地址 */
      ip?: string
      /** openapi调用日志详情 */
      log_detail?: Lark.OpenapiLogDetail
    }
    export type AuditObjectDetail = {
      /** 克隆来源 */
      clone_source?: string
      /** 其他文本 */
      text_detail?: string
      /** 文件名称 */
      file_name?: string
      /** 第三方APPID */
      third_party_appID?: string
      /** 文件或文件夹数量 */
      contain_file_num?: number
      /** 链接分享设置 */
      permission_setting_type?: string
      /** 是否开启外部访问设置 */
      permission_external_access_Type?: boolean
      /** 分享设置 */
      permission_share_type?: string
      /** file上传业务来源 */
      file_service_source?: string
      /** 下载OKR时的内容范围 */
      okr_download_content?: string
      /** 容器类型，标识是否wiki */
      container_type?: string
      /** 容器id，wiki标识字段 */
      container_id?: string
      /** 截屏、录制的开始页面 */
      current_page?: string
    }
    export type AuditObjectEntity = {
      /** 操作对象类型 */
      object_type?: string
      /** 操作对象值，可能存在department_id、user_id等，需要进行lark_id的转换 */
      object_value?: string
      /** 操作对象名称，如会话名、文档名等 */
      object_name?: string
      /** 操作对象的所有者 */
      object_owner?: string
      /** object 详情 */
      object_detail?: Lark.AuditObjectDetail
    }
    export type AuditRecipientDetail = {
      /** 修改权限协作者 */
      permission_action_type?: string
    }
    export type AuditRecipientEntity = {
      /** 接收者对象类型 */
      recipient_type?: string
      /** 接收者对象值，可能存在department_id、user_id等，需要进行lark_id的转换 */
      recipient_value?: string
      /** recipient 详情 */
      recipient_detail?: Lark.AuditRecipientDetail
    }
    export type AuditIosContext = {
      /** UDID */
      udid?: string
      /** 设备ID */
      did?: string
      /** app的版本 */
      app_ver?: string
      /** SecSDK版本 */
      ver?: string
      /** 系统类型及版本 */
      os?: string
      /** 系统时区 */
      STZone?: string
      /** 当前语言 */
      ML?: string
      /** 是否越狱 */
      sjd?: string
      /** 代理ip */
      proxyip?: string
      /** wifi ip */
      wifip?: string
      /** GPS经纬度 */
      location?: string
      /** 当前设备活跃ip */
      active_ip?: string
      /** 当前设备活跃ip对应网卡类型 */
      active_ip_detail?: string
      /** 基站信息 */
      cell_base_station?: string
      /** 公网ip */
      IP?: string
    }
    export type AuditPcContext = {
      /** UDID */
      udid?: string
      /** 设备ID */
      did?: string
      /** app的版本 */
      app_ver?: string
      /** SecSDK版本 */
      ver?: string
      /** 客户端类型 */
      os?: string
      /** wifi ip */
      wifip?: string
      /** 设备区域 */
      region?: string
      /** 公网ip */
      IP?: string
    }
    export type AuditWebContext = {
      /** UA信息 */
      user_agent?: string
      /** 本机IP */
      IP?: string
    }
    export type AuditAndroidContext = {
      /** UDID */
      udid?: string
      /** 设备ID */
      did?: string
      /** app的版本 */
      app_ver?: string
      /** SecSDK版本 */
      ver?: string
      /** 设备语言 */
      region?: string
      /** 安卓版本号 */
      id_i?: string
      /** 安卓版本 */
      id_r?: string
      /** Brand */
      hw_brand?: string
      /** 制造商 */
      hw_manuf?: string
      /** wifi ip */
      wifip?: string
      /** 路由IP */
      route_iip?: string
      /** 路由网关IP */
      route_gip?: string
      /** 表示当前是否root */
      env_su?: string
      /** 手机系统时区 */
      env_tz?: string
      /** 手机系统语言 */
      env_ml?: string
      /** GPS经纬度 */
      location?: string
      /** 当前设备活跃ip */
      active_ip?: string
      /** 当前设备活跃ip对应网卡类型 */
      active_ip_detail?: string
      /** 基站信息 */
      cell_base_station?: string
      /** 公网ip */
      IP?: string
    }
    export type AuditContext = {
      /** 终端类型 */
      terminal_type?: number
      /** ios的环境信息 */
      ios_context?: Lark.AuditIosContext
      /** pc的环境信息 */
      pc_context?: Lark.AuditPcContext
      /** web的环境信息 */
      web_context?: Lark.AuditWebContext
      /** android的环境信息 */
      android_context?: Lark.AuditAndroidContext
    }
    export type AuditEventExtend = {
      /** 评论类型 */
      comment_type?: string
      /** app信息 */
      app_detail?: string
      /** 是否两步验证 */
      two_step_validation?: boolean
      /** 登录方式 */
      login_method?: string
      /** 创建新的{x}人会议/通话 */
      new_people_num_in_video?: number
      /** 将{x}名外部用户加入/退出通话 */
      external_people_num_in_video?: number
      /** 将{x}名外部用户加入/退出群组 */
      external_people_num_in_chat?: number
      /** 创建{x}人数的群组 */
      join_group?: number
      /** 解散{x}人数的群组 */
      quit_group?: number
      /** 分享文档给{x}名外部用户 */
      external_people_num_in_doc_share?: number
    }
    export type ApiAuditDrawerInfo = {
      /** key信息 */
      info_key?: string
      /** val值 */
      info_val?: string
      /** key对应的i18nkey */
      key_i18n_key?: string
      /** val类型 */
      val_type?: string
      /** val对应的i18nkey */
      val_i18n_key?: string
    }
    export type ApiAuditCommonDrawers = {
      /** 扩展字段信息 */
      common_draw_info_list?: Lark.ApiAuditDrawerInfo[]
    }
    export type AuditDetail = {
      /** mac地址 */
      mc?: string
      /** 设备模型 */
      device_model?: string
      /** 操作系统 */
      os?: string
      /** ip属地 */
      city?: string
    }
    export type AuditInfo = {
      /** 事件id */
      event_id?: string
      /** 唯一id */
      unique_id?: string
      /** 事件名称 */
      event_name: string
      /** 用户所属部门的ID列表 */
      department_ids?: string[]
      /** 模块 */
      event_module: number
      /** 操作人类型 */
      operator_type?: number
      /** 操作人id */
      operator_value?: string
      /** 操作对象列表 */
      objects?: Lark.AuditObjectEntity[]
      /** 接收者对象列表 */
      recipients?: Lark.AuditRecipientEntity[]
      /** 事件时间 */
      event_time?: number
      /** ip信息 */
      ip?: string
      /** 第三方isvID */
      operator_app?: string
      /** 环境信息 */
      audit_context?: Lark.AuditContext
      /** 事件级别的扩展 */
      extend?: Lark.AuditEventExtend
      /** 第三方isv名称 */
      operator_app_name?: string
      /** 扩展字段信息 */
      common_drawers?: Lark.ApiAuditCommonDrawers
      /** 日志扩展信息 */
      audit_detail?: Lark.AuditDetail
    }
    export type UserViewDetail = {
      /** 用户ID */
      user_id?: string
      /** 用户的最近查看时间timestamp（ms级别） */
      view_time?: string
    }
    export type Statictics = {
      /** 用户浏览数 */
      user_view_count?: string
      /** 页面浏览数量 */
      page_view_count?: string
      /** 用户浏览列表 */
      user_view_list?: Lark.UserViewDetail[]
    }
    export type Minute = {
      /** 妙记token */
      token?: string
      /** 所有者ID */
      owner_id?: string
      /** 妙记创建时间timestamp（ms级别） */
      create_time?: string
      /** 妙记标题 */
      title?: string
      /** 妙记封面链接 */
      cover?: string
      /** 妙记时长（ms级别） */
      duration?: string
      /** 妙记链接 */
      url?: string
    }
    export type AccessData = {
      /** 访问次数 */
      pv?: number
      /** 访问用户数(去重) */
      uv?: number
    }
    export type WorkplaceAccessData = {
      /** 时间,精确到天,格式yyyy-MM-dd */
      date?: string
      /** 全部工作台的访问数据 */
      all_workplace?: Lark.AccessData
      /** 默认工作台的访问数据 */
      default_workplace?: Lark.AccessData
    }
    export type I18nName = {
      /** ISO 639-1的语言代码。比如zh表示中文。 */
      language?: string
      /** 名字 */
      name?: string
    }
    export type CustomWorkplaceAccessData = {
      /** 定制工作台ID */
      custom_workplace_id?: string
      /** 访问数据 */
      access_data?: Lark.AccessData
      /** 时间,精确到天,格式yyyy-MM-dd */
      date?: string
      /** 定制工作台多语言名字。 */
      custom_workplace_name?: Lark.I18nName[]
    }
    export type BlockAccessData = {
      /** 时间,精确到天,格式yyyy-MM-dd */
      date?: string
      /** 小组件id */
      block_id?: string
      /** block访问数据信息。 */
      access_data?: Lark.AccessData
    }
    export type OpenMethod = {
      /** applink类型 */
      type?: string
      /** applink链接 */
      applink?: string
    }
    export type AppRecommendRuleVisibilityInfo = {
      /** 是否全员可见 */
      is_all?: boolean
      /** 可见部门 ID 列表 */
      department_ids?: string[]
      /** 可见用户 ID 列表 */
      user_ids?: string[]
      /** 可见用户组 ID 列表 */
      group_ids?: string[]
    }
    export type AppRecommendRuleItemInfoI18nName = {
      /** 应用项的简体中文名称 */
      zh_cn?: string
      /** 应用项的繁体中文（中国香港）名称 */
      zh_hk?: string
      /** 应用项的繁体中文（中国台湾）名称 */
      zh_tw?: string
      /** 应用项的英文名称 */
      en_us?: string
      /** 应用项的日文名称 */
      ja_jp?: string
    }
    export type AppRecommendRuleItemInfo = {
      /** 推荐应用项 ID */
      item_id?: string
      /** 推荐应用项类型 */
      item_type?: string
      /** 推荐应用项名称 */
      name?: string
      /** 推荐应用项描述 */
      description?: string
      /** 链接类型应用项的跳转链接（应用类型该字段为空） */
      link_url?: string
      /** 应用类型应用项的 app id（链接类型该字段为空） */
      client_id?: string
      /** 应用项图标链接 */
      icon_url?: string
      /** 链接类型应用项的默认展示语种（应用类型该字段为空） */
      default_locale?: string
      /** 应用项的多语种名称 */
      i18n_name?: Lark.AppRecommendRuleItemInfoI18nName
    }
    export type AppRecommendRule = {
      /** 推荐规则 ID */
      id?: string
      /** 推荐规则名称 */
      name?: string
      /** 推荐规则启用状态 */
      status?: string
      /** 推荐规则可见性信息 */
      visibility_info?: Lark.AppRecommendRuleVisibilityInfo
      /** 不可移除推荐应用项列表 */
      recommend_item_infos?: Lark.AppRecommendRuleItemInfo[]
      /** 可移除推荐应用项列表 */
      distributed_recommend_item_infos?: Lark.AppRecommendRuleItemInfo[]
    }
    export type FormField = {
      /** 字段名称 */
      name?: string
      /** 字段类型 */
      type?: string
    }
    export type FormContent = {
      /** 表单字段ID */
      field_id?: string
      /** 表单字段名称 */
      field_name?: string
      /** 表单字段值 */
      field_value?: string
    }
    export type UserAccessTokenInfo = {
      /** user_access_token，用于获取用户资源 */
      access_token?: string
      /** token 类型 */
      token_type?: string
      /** `access_token`的有效期，单位: 秒 */
      expires_in?: number
      /** 用户姓名 */
      name?: string
      /** 用户英文名称 */
      en_name?: string
      /** 用户头像 */
      avatar_url?: string
      /** 用户头像 72x72 */
      avatar_thumb?: string
      /** 用户头像 240x240 */
      avatar_middle?: string
      /** 用户头像 640x640 */
      avatar_big?: string
      /** 用户在应用内的唯一标识 */
      open_id?: string
      /** 用户统一ID */
      union_id?: string
      /** 用户邮箱 */
      email?: string
      /** 企业邮箱，请先确保已在管理后台启用飞书邮箱服务 */
      enterprise_email?: string
      /** 用户 user_id */
      user_id?: string
      /** 用户手机号 */
      mobile?: string
      /** 当前企业标识 */
      tenant_key?: string
      /** `refresh_token` 的有效期，单位: 秒 */
      refresh_expires_in?: number
      /** 刷新用户 `access_token` 时使用的 token */
      refresh_token?: string
      /** 用户当前登录态session的唯一标识，为空则不返回 */
      sid?: string
    }
    export type EntityWord = {
      /** 抽取出的词条名 */
      name: string
      /** 词条可能的推荐别名 */
      aliases?: string[]
    }
    export type InterviewDimensionScore = {
      /** 选项ID */
      id?: string
      /** 选项名称 */
      name?: Lark.I18n
    }
    export type InterviewDimensionAssessment = {
      /** 题目评价 ID */
      id?: string
      /** 题目名称 */
      name?: Lark.I18n
      /** 当题目类型为描述题时，从此取值 */
      content?: string
      /** 题目 ID */
      dimension_id?: string
      /** 当题目类型为单选题时，从此取值 */
      dimension_score?: Lark.InterviewDimensionScore
      /** 当题目类型为多选题时，从此取值 */
      dimension_score_list?: Lark.InterviewDimensionScore[]
      /** 题目类型 */
      dimension_type?: number
    }
    export type Interview = {
      /** 面试id */
      id?: string
      /** 面试开始时间（ms） */
      begin_time?: number
      /** 面试结束时间（ms） */
      end_time?: number
      /** 面试轮次（从0开始计数） */
      round?: number
      /** 面试关联的投递阶段 */
      stage_id?: string
      /** 面试官记录列表 */
      interview_record_list?: Lark.InterviewRecord[]
    }
    export type OfferSchemaName = {
      /** 中文名 */
      zh_cn?: string
      /** 英文名 */
      en_us?: string
    }
    export type OfferSchemaDetailOption = {
      /** 名字 */
      name?: Lark.OfferSchemaName
      /** 选项序号 */
      index?: number
      /** 选项当前是否启用 */
      active_status?: number
    }
    export type OfferSchemaDetail = {
      /** 字段ID */
      id?: string
      /** 字段名称 */
      name?: Lark.OfferSchemaName
      /** 字段类型, text=单行文本, long_text=多行文本, select=单选, multi_select=多选, date_select=日期, number=数字 */
      type?: string
      /** 字段是否为自定义 */
      is_customized?: boolean
      /** 单选/多选可选择字段的选项值 */
      option_list?: Lark.OfferSchemaDetailOption[]
    }
    export type OfferSchema = {
      /** offer申请表ID */
      id?: string
      /** offer申请表使用场景 */
      scenario?: number
      /** 申请表版本 */
      version?: number
      /** 字段对象信息 */
      object_list?: Lark.OfferSchemaDetail[]
    }
    export type Subregion = {
      /** 城市/区域id */
      id: string
      /** 城市/区域名称 */
      name: Lark.I18n[]
      /** 所属省份/行政区id，详细信息可通过【查询省份/行政区信息】接口查询获得 */
      subdivision_id: string
      /** 上级城市/区域区id */
      superior_subregion_id?: string
    }
    export type Subdivision = {
      /** 省份/行政区id */
      id: string
      /** 省份/行政区名称 */
      name: Lark.I18n[]
      /** 所属国家/地区id，详细信息可通过【查询国家/地区信息】接口查询获得 */
      country_region_id: string
      /** 行政区类型，枚举值可通过文档【飞书人事枚举常量】行政区类型（subdivision_type）枚举定义部分获得 */
      subdivision_type: Lark.Enum
    }

  }
}

export interface ListEventOutboundIpQuery {
  /** 分页大小，默认10，取值范围 10-50 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface TenantAccessTokenInternalAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
}
export interface AppAccessTokenInternalAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
}
export interface AppAccessTokenAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
  /** 平台定时推送给应用的临时凭证，通过事件监听机制获得 */
  app_ticket: string
}
export interface TenantAccessTokenAuthRequest {
  /** 应用唯一标识，创建应用 */
  app_access_token: string
  /** 应用秘钥，创建应用后获得 */
  tenant_key: string
}
export interface CreateAuthenOidcAccessTokenRequest {
  /** 授权类型，**固定值** */
  grant_type: string
  /** 登录预授权码 */
  code: string
}
export interface CreateAuthenOidcRefreshAccessTokenRequest {
  /** 授权类型，**固定值**： */
  grant_type: string
  /** 刷新 `user_access_token` 需要的凭证<br>获取user_access_token`接口和本接口均返回 `refresh_token`，**每次请求，请注意使用最新获取到的`refresh_token`** */
  refresh_token: string
}
export interface AppTicketResendAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
}
export interface QueryPassportSessionRequest {
  /** 用户 ID */
  user_ids?: string[]
}
export interface QueryPassportSessionQuery {
  user_id_type?: string
}
export interface ListContactScopeQuery {
  /** 返回值的用户ID的类型 */
  user_id_type?: string
  /** 返回值的部门ID的类型 */
  department_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小，返回值所有列表长度之和不超过这个值 */
  page_size?: number
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
  gender?: number
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
  orders?: Lark.UserOrder[]
  /** 自定义属性 */
  custom_attrs?: Lark.UserCustomAttr[]
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
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型。

  不同 ID 的说明参见[部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: string
  /** 用于幂等判断是否为同一请求，避免重复创建。字符串类型，自行生成。 */
  client_token?: string
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
  email_acceptor?: Lark.ResourceAcceptor
}
export interface DeleteContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ResurrectContactUserRequest {
  /** 指定恢复后用户所在部门 */
  departments?: Lark.UserDepartmentInfo[]
  /** 指定恢复后分配的席位 */
  subscription_ids?: string[]
}
export interface ResurrectContactUserQuery {
  /** 用户id类型 */
  user_id_type?: string
  /** 部门id类型 */
  department_id_type?: string
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
  gender?: number
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
  orders?: Lark.UserOrder[]
  /** 自定义属性 */
  custom_attrs?: Lark.UserCustomAttr[]
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
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface GetContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型

  不同 ID 的说明 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: string
}
export interface BatchContactUserQuery {
  /** 要查询的用户ID列表 */
  user_ids: string[]
  /** 指定请求中用户ID类型 */
  user_id_type?: string
  /** 指定查询结果中用户关联的部门ID类型 */
  department_id_type?: string
}
export interface FindByDepartmentContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型

  部门ID类型的区别参见[部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: string
  /** 填写该字段表示获取该部门下用户，必填。根部门的部门ID为0。

  ID值与查询参数中的department_id_type 对应。

  不同 ID 的说明与department_id的获取方式参见 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id: string
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
}
export interface BatchGetIdContactUserRequest {
  /** 要查询的用户邮箱，最多 50 条。

  注意，emails与mobiles相互独立，每条用户邮箱返回对应的用户ID。

  本接口返回的用户ID数量为emails数量与mobiles数量的和。 */
  emails?: string[]
  /** 要查询的用户手机号，最多 50 条。

  注意
  1. emails与mobiles相互独立，每条用户手机号返回对应的用户ID。
  2.  非中国大陆地区的手机号需要添加以 “+” 开头的国家 / 地区代码。 */
  mobiles?: string[]
}
export interface BatchGetIdContactUserQuery {
  /** 返回的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateUserIdContactUserRequest {
  /** 自定义新用户ID */
  new_user_id: string
}
export interface UpdateUserIdContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateContactGroupRequest {
  /** 用户组的名字，企业内唯一，最大长度：100 字符 */
  name: string
  /** 用户组描述 */
  description?: string
  /** 用户组的类型。默认为1表示普通用户组 */
  type?: number
  /** 自定义用户组ID，可在创建时自定义，不自定义则由系统自动生成，已创建用户组不允许修改 group_id 。

  自定义group_id数据校验规则：

  最大长度：64 字符

  校验规则：数字、大小写字母的组合，不能包含空格 */
  group_id?: string
}
export interface CreateContactGroupQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface PatchContactGroupRequest {
  /** 用户组的名字，企业内唯一，最大长度：100 字符 */
  name?: string
  /** 用户组描述信息
  最大长度：500 字 */
  description?: string
}
export interface PatchContactGroupQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface GetContactGroupQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface SimplelistContactGroupQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户组类型 */
  type?: number
}
export interface MemberBelongContactGroupQuery {
  /** 成员ID */
  member_id: string
  /** 成员ID类型 */
  member_id_type?: string
  /** 欲获取的用户组类型 */
  group_type?: number
  /** 分页查询大小 */
  page_size?: number
  /** 分页查询Token */
  page_token?: string
}
export interface ListContactCustomAttrQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateContactEmployeeTypeEnumRequest {
  /** 枚举内容 */
  content: string
  /** 类型 */
  enum_type: number
  /** 类型 */
  enum_status: number
  /** i18n定义 */
  i18n_content?: Lark.I18nContent[]
}
export interface UpdateContactEmployeeTypeEnumRequest {
  /** 枚举内容 */
  content: string
  /** 类型 */
  enum_type: number
  /** 类型 */
  enum_status: number
  /** i18n定义 */
  i18n_content?: Lark.I18nContent[]
}
export interface ListContactEmployeeTypeEnumQuery {
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CreateContactDepartmentRequest {
  /** 部门名称 */
  name: string
  /** 国际化的部门名称 */
  i18n_name?: Lark.DepartmentI18nName
  /** 父部门的ID */
  parent_department_id: string
  /** 本部门的自定义部门ID */
  department_id?: string
  /** 部门主管用户ID */
  leader_user_id?: string
  /** 部门的排序 */
  order?: string
  /** 部门单位自定义ID列表，当前只支持一个 */
  unit_ids?: string[]
  /** 是否创建部门群，默认不创建 */
  create_group_chat?: boolean
  /** 部门负责人 */
  leaders?: Lark.DepartmentLeader[]
  /** 部门群雇员类型限制 */
  group_chat_employee_types?: number[]
  /** 部门HRBP */
  department_hrbps?: string[]
}
export interface CreateContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型

  不同 ID 的说明参见[部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: string
  /** 用于幂等判断是否为同一请求，避免重复创建。字符串类型，自行生成。 */
  client_token?: string
}
export interface DeleteContactDepartmentQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface PatchContactDepartmentRequest {
  /** 部门名 */
  name?: string
  /** 国际化的部门名称 */
  i18n_name?: Lark.DepartmentI18nName
  /** 父部门ID */
  parent_department_id?: string
  /** leaderID */
  leader_user_id?: string
  /** 部门的排序 */
  order?: string
  /** 部门单位自定义ID列表，当前只支持一个 */
  unit_ids?: string[]
  /** 是否创建部门群，默认不创建 */
  create_group_chat?: boolean
  /** 部门负责人 */
  leaders?: Lark.DepartmentLeader[]
  /** 部门群雇员类型限制 */
  group_chat_employee_types?: number[]
  /** 部门HRBP */
  department_hrbps?: string[]
}
export interface PatchContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface UpdateContactDepartmentRequest {
  /** 部门名称 */
  name: string
  /** 国际化的部门名称 */
  i18n_name?: Lark.DepartmentI18nName
  /** 父部门ID */
  parent_department_id: string
  /** LeaderID */
  leader_user_id?: string
  /** 部门的排序 */
  order?: string
  /** 部门单位自定义ID列表，当前只支持一个 */
  unit_ids?: string[]
  /** 是否创建部门群，默认不创建 */
  create_group_chat?: boolean
  /** 部门负责人 */
  leaders?: Lark.DepartmentLeader[]
  /** 部门群雇员类型限制 */
  group_chat_employee_types?: number[]
}
export interface UpdateContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface UnbindDepartmentChatContactDepartmentRequest {
  /** 部门ID */
  department_id: string
}
export interface UnbindDepartmentChatContactDepartmentQuery {
  /** 此次调用中使用的部门ID的类型，默认为"open_department_id" */
  department_id_type?: string
}
export interface GetContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型

  不同 ID 的说明 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: string
}
export interface BatchContactDepartmentQuery {
  /** 查询的部门ID列表，类型需要与department_id_type对应 */
  department_ids: string[]
  /** 说明请求中department_id_list参数所使用的部门ID类型 */
  department_id_type?: string
  /** 指定调用结果中包含用户（如部门leader）关联的用户ID类型 */
  user_id_type?: string
}
export interface ChildrenContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型

  不同 ID 的说明与department_id的获取方式参见 [部门ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview#23857fe0) */
  department_id_type?: string
  /** 是否递归获取子部门 */
  fetch_child?: boolean
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
}
export interface ParentContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 部门ID */
  department_id: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface SearchContactDepartmentRequest {
  /** 搜索关键词，匹配字段为部门名称（不支持匹配部门国际化名称） */
  query: string
}
export interface SearchContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface UpdateDepartmentIdContactDepartmentRequest {
  /** 本部门的自定义部门新ID */
  new_department_id: string
}
export interface UpdateDepartmentIdContactDepartmentQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface CreateContactUnitRequest {
  /** 单位自定义ID。不带默认自动生成。1-64字节范围大小，需为数字字母 */
  unit_id?: string
  /** 单位的名字，长度范围为1-100个字 */
  name: string
  /** 单位类型，长度范围为1-100个字，创建后不可修改 */
  unit_type: string
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
  department_id_type?: string
}
export interface UnbindDepartmentContactUnitRequest {
  /** 单位ID */
  unit_id: string
  /** 预解除关联的部门ID */
  department_id: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface ListDepartmentContactUnitQuery {
  /** 单位ID */
  unit_id: string
  /** 此次调用中预获取的部门ID的类型 */
  department_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface ListContactUnitQuery {
  /** 分页大小，默认50，取值范围 1-100 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface AddContactGroupMemberRequest {
  /** 用户组成员的类型，取值为 user */
  member_type: string
  /** 当member_type =user时候，member_id_type表示user_id_type，枚举值为open_id, union_id, user_id */
  member_id_type: string
  /** 添加的成员ID */
  member_id: string
}
export interface BatchAddContactGroupMemberRequest {
  /** 待添加成员 */
  members?: Lark.Memberlist[]
}
export interface RemoveContactGroupMemberRequest {
  /** 用户组成员的类型，取值为 user */
  member_type: string
  /** 操作移除的用户组成员ID */
  member_id: string
  /** 当member_type =user时候，member_id_type表示user_id_type，枚举值为open_id, union_id, user_id */
  member_id_type: string
}
export interface BatchRemoveContactGroupMemberRequest {
  /** 待移除成员 */
  members: Lark.Memberlist[]
}
export interface SimplelistContactGroupMemberQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 欲获取成员ID类型。
  当member_type=user时候，member_id_type表示user_id_type，枚举值open_id, union_id和user_id。
  当member_type=department时候，member_id_type表示department_id_type，枚举值open_id和department_id。 */
  member_id_type?: string
  /** 欲获取的用户组成员类型。 */
  member_type?: string
}
export interface CreateContactFunctionalRoleRequest {
  /** 角色名称，在单租户下唯一 */
  role_name: string
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
  user_id_type?: string
}
export interface BatchDeleteContactFunctionalRoleMemberRequest {
  /** 角色删除的角色成员列表（一批用户的UserID列表) */
  members?: string[]
}
export interface BatchDeleteContactFunctionalRoleMemberQuery {
  /** 成员ID类型 */
  user_id_type?: string
}
export interface ScopesContactFunctionalRoleMemberRequest {
  /** 角色修改的角色成员列表（一批用户的UserID列表) */
  members: string[]
  /** 角色内用户的管理范围 */
  departments: string[]
}
export interface ScopesContactFunctionalRoleMemberQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface GetContactFunctionalRoleMemberQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface ListContactFunctionalRoleMemberQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
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
  i18n_name?: Lark.I18nContent[]
  /** 多语言描述 */
  i18n_description?: Lark.I18nContent[]
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
  i18n_name?: Lark.I18nContent[]
  /** 多语言描述 */
  i18n_description?: Lark.I18nContent[]
}
export interface ListContactJobLevelQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
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
  i18n_name?: Lark.I18nContent[]
  /** 多语言描述 */
  i18n_description?: Lark.I18nContent[]
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
  i18n_name?: Lark.I18nContent[]
  /** 多语言描述 */
  i18n_description?: Lark.I18nContent[]
}
export interface ListContactJobFamilyQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 序列名称,传入该字段时，可查询指定序列名称对应的序列信息 */
  name?: string
}
export interface ListContactJobTitleQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface ListContactWorkCityQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateImMessageRequest {
  /** 依据receive_id_type的值，填写对应的消息接收者id */
  receive_id: string
  /** 消息类型 包括：text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等，类型定义请参考[发送消息content说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json) */
  msg_type: string
  /** 消息内容，json结构序列化后的字符串。不同msg_type对应不同内容。消息类型 包括：text、post、image、file、audio、media、sticker、interactive、share_chat、share_user等，具体格式说明参考：[发送消息content说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)

  <b>请求体大小限制</b>：
  - 文本消息请求体最大不能超过150KB
  - 卡片及富文本消息请求体最大不能超过30KB */
  content: string
  /** 由开发者生成的唯一字符串序列，用于发送消息请求去重；持有相同uuid的请求1小时内至多成功执行一次 */
  uuid?: string
}
export interface CreateImMessageQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id */
  receive_id_type: string
}
export interface ReplyImMessageRequest {
  /** 消息内容 json 格式，格式说明参考: [发送消息content说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json) */
  content: string
  /** 消息类型，包括：text、post、image、file、audio、media、sticker、interactive、share_card、share_user */
  msg_type: string
  /** 是否以话题形式回复。取值为 true 时将以话题形式回复。注意：如果要回复的消息已经是话题形式的消息，则默认以话题形式进行回复。 */
  reply_in_thread?: boolean
  /** 由开发者生成的唯一字符串序列，用于回复消息请求去重；持有相同uuid的请求1小时内至多成功执行一次 */
  uuid?: string
}
export interface UpdateImMessageRequest {
  /** 消息的类型，仅支持文本(text)和富文本(post)类型 */
  msg_type: string
  /** 消息内容 JSON 格式 */
  content: string
}
export interface ForwardImMessageRequest {
  /** 依据receive_id_type的值，填写对应的转发目标的ID */
  receive_id: string
}
export interface ForwardImMessageQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id */
  receive_id_type: string
  /** 由开发者生成的唯一字符串序列，用于转发消息请求去重；持有相同uuid的请求在1小时内向同一个目标的转发只可成功一次。 */
  uuid?: string
}
export interface MergeForwardImMessageRequest {
  /** 依据receive_id_type的值，填写对应的转发目标的ID */
  receive_id: string
  /** 要转发的消息ID列表 */
  message_id_list: string[]
}
export interface MergeForwardImMessageQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id */
  receive_id_type: string
  /** 由开发者生成的唯一字符串序列，用于转发消息请求去重；持有相同uuid的请求在1小时内向同一个目标的转发只可成功一次。 */
  uuid?: string
}
export interface ForwardImThreadRequest {
  /** 依据receive_id_type的值，填写对应的转发目标的ID */
  receive_id: string
}
export interface ForwardImThreadQuery {
  /** 消息接收者id类型 open_id/user_id/union_id/email/chat_id/thread_id */
  receive_id_type: string
  /** 由开发者生成的唯一字符串序列，用于转发消息请求去重；持有相同uuid的请求在1小时内向同一个目标的转发只可成功一次。 */
  uuid?: string
}
export interface ReadUsersImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: string
  /** 此次调用中使用的分页的大小 */
  page_size?: number
  /** 下一页分页的token */
  page_token?: string
}
export interface ListImMessageQuery {
  /** 容器类型 ，目前可选值仅有"chat"，包含单聊（p2p）和群聊（group） */
  container_id_type: string
  /** 容器的id，即chat的id，详情参见[群ID 说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-id-description) */
  container_id: string
  /** 历史信息的起始时间（秒级时间戳） */
  start_time?: string
  /** 历史信息的结束时间（秒级时间戳） */
  end_time?: string
  /** 消息排序方式 */
  sort_type?: string
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
}
export interface GetImMessageResourceQuery {
  /** 资源类型，可选"image, file“； image对应消息中的 图片，富文本消息中的图片。  file对应消息中的 文件、音频、视频、（表情包除外） */
  type: string
}
export interface UrgentAppImMessageRequest {
  /** 该字段标识目标用户的id类型 */
  user_id_list: string[]
}
export interface UrgentAppImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: string
}
export interface UrgentSmsImMessageRequest {
  /** 该字段标识目标用户的id类型 */
  user_id_list: string[]
}
export interface UrgentSmsImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: string
}
export interface UrgentPhoneImMessageRequest {
  /** 该字段标识目标用户的id类型 */
  user_id_list: string[]
}
export interface UrgentPhoneImMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: string
}
export interface PatchImMessageRequest {
  /** 消息内容 json 格式，[发送消息 content 说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json)，参考文档中的卡片格式 */
  content: string
}
export interface CreateImMessageReactionRequest {
  /** reaction资源类型 */
  reaction_type: Lark.Emoji
}
export interface ListImMessageReactionQuery {
  /** 待查询消息reaction的类型[emoji类型列举](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/emojis-introduce)。

  - 不传入该参数，表示拉取所有类型reaction */
  reaction_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时，会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
  /** 当操作人为用户时返回用户ID的类型 */
  user_id_type?: string
}
export interface CreateImPinRequest {
  /** 待Pin的消息ID */
  message_id: string
}
export interface ListImPinQuery {
  /** 待获取Pin消息的Chat ID */
  chat_id: string
  /** Pin信息的起始时间（毫秒级时间戳） */
  start_time?: string
  /** Pin信息的结束时间（毫秒级时间戳） */
  end_time?: string
  /** 此次调用中使用的分页的大小 */
  page_size?: number
  /** 下一页分页的token */
  page_token?: string
}
export interface CreateImChatRequest {
  /** 群头像对应的 Image Key，可通过[上传图片](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create)获取（注意：上传图片的 ==image_type== 需要指定为 ==avatar==） */
  avatar?: string
  /** 群名称

  **注意：** 公开群名称的长度不得少于2个字符 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: Lark.I18nNames
  /** 创建群时指定的群主，不填时指定建群的机器人为群主。

  群主 ID，ID值与查询参数中的 user_id_type 对应。

  不同 ID 的说明参见 [用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  owner_id?: string
  /** 创建群时邀请的群成员，id 类型为 user_id_type */
  user_id_list?: string[]
  /** 创建群时邀请的群机器人

  **注意：** 拉机器人入群请使用 ==app_id== */
  bot_id_list?: string[]
  /** 群模式

  **可选值有**：
  - `group`：群组 */
  chat_mode?: string
  /** 群类型

  **可选值有**：
  - `private`：私有群
  - `public`：公开群 */
  chat_type?: string
  /** 入群消息可见性

  **可选值有**：
  - `only_owner`：仅群主和管理员可见
  - `all_members`：所有成员可见
  - `not_anyone`：任何人均不可见 */
  join_message_visibility?: string
  /** 退群消息可见性

  **可选值有**：
  - `only_owner`：仅群主和管理员可见
  - `all_members`：所有成员可见
  - `not_anyone`：任何人均不可见 */
  leave_message_visibility?: string
  /** 加群审批

  **可选值有**：
  - `no_approval_required`：无需审批
  - `approval_required`：需要审批 */
  membership_approval?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: Lark.RestrictedModeSetting
  /** 谁可以加急 */
  urgent_setting?: string
  /** 谁可以发起视频会议 */
  video_conference_setting?: string
  /** 谁可以编辑群信息 */
  edit_permission?: string
}
export interface CreateImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 如果选择了设置群主为指定用户，可以选择是否同时设置创建此群的机器人为管理员，此标志位用于标记是否设置创建群的机器人为管理员 */
  set_bot_manager?: boolean
  /** 由开发者生成的唯一字符串序列，用于创建群组请求去重；持有相同uuid的请求10小时内只可成功创建1个群聊 */
  uuid?: string
}
export interface UpdateImChatRequest {
  /** 群头像对应的 Image Key，可通过[上传图片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create)获取（注意：上传图片的 ==image_type== 需要指定为 ==avatar==） */
  avatar?: string
  /** 群名称 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: Lark.I18nNames
  /** 加 user/bot 入群权限(all_members/only_owner) */
  add_member_permission?: string
  /** 群分享权限(allowed/not_allowed) */
  share_card_permission?: string
  /** at 所有人权限(all_members/only_owner) */
  at_all_permission?: string
  /** 群编辑权限(all_members/only_owner) */
  edit_permission?: string
  /** 新群主 ID */
  owner_id?: string
  /** 入群消息可见性(only_owner/all_members/not_anyone) */
  join_message_visibility?: string
  /** 出群消息可见性(only_owner/all_members/not_anyone) */
  leave_message_visibility?: string
  /** 加群审批(no_approval_required/approval_required) */
  membership_approval?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: Lark.RestrictedModeSetting
  /** 群类型 */
  chat_type?: string
  /** 谁可以加急 */
  urgent_setting?: string
  /** 谁可以发起视频会议 */
  video_conference_setting?: string
}
export interface UpdateImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateImChatModerationRequest {
  /** 群发言模式（all_members/only_owner/moderator_list，其中 moderator_list 表示部分用户可发言的模式） */
  moderation_setting?: string
  /** 选择部分用户可发言模式时，添加的可发言用户列表（自动过滤不在群内的用户） */
  moderator_added_list?: string[]
  /** 选择部分用户可发言模式时，移除的可发言用户列表（自动过滤不在群内的用户） */
  moderator_removed_list?: string[]
}
export interface UpdateImChatModerationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PutTopNoticeImChatTopNoticeRequest {
  /** 要进行发布的群置顶 */
  chat_top_notice: Lark.ChatTopNotice[]
}
export interface ListImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 群组排序方式 */
  sort_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface SearchImChatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 关键词。注意：如果query为空值将返回空的结果 */
  query?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface GetImChatModerationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface LinkImChatRequest {
  /** 群分享链接有效时长，可选值week、year、permanently，分别表示7天、1年以及永久有效 */
  validity_period?: string
}
export interface AddManagersImChatManagersRequest {
  /** 要增加的 manager_id */
  manager_ids?: string[]
}
export interface AddManagersImChatManagersQuery {
  /** 群成员 id 类型 open_id/user_id/union_id/app_id */
  member_id_type?: string
}
export interface DeleteManagersImChatManagersRequest {
  /** 要删除的 manager_id */
  manager_ids?: string[]
}
export interface DeleteManagersImChatManagersQuery {
  /** 群成员 id 类型 open_id/user_id/union_id/app_id */
  member_id_type?: string
}
export interface CreateImChatMembersRequest {
  /** 成员列表

  <b>注意：</b>每次请求，最多拉50个用户或者5个机器人，并且群组最多容纳15个机器人 */
  id_list?: string[]
}
export interface CreateImChatMembersQuery {
  /** 进群成员 id 类型 open_id/user_id/union_id/app_id

  <b>注意：</b>拉机器人入群请使用 ==app_id== */
  member_id_type?: string
  /** 出现不可用ID后的处理方式 0/1/2 */
  succeed_type?: number
}
export interface DeleteImChatMembersRequest {
  /** 成员列表 */
  id_list?: string[]
}
export interface DeleteImChatMembersQuery {
  /** 出群成员 id 类型 open_id/user_id/union_id/app_id */
  member_id_type?: string
}
export interface GetImChatMembersQuery {
  /** 群成员 用户 ID 类型，详情参见 [用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  member_id_type?: string
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface PatchImChatAnnouncementRequest {
  /** 文档当前版本号 int64 类型，get 接口会返回 */
  revision: string
  /** 修改文档请求的序列化字段

  更新公告信息的格式和更新[云文档](/ssl:ttdoc/ukTMukTMukTM/uYDM2YjL2AjN24iNwYjN)格式相同 */
  requests?: string[]
}
export interface GetImChatAnnouncementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateImChatTabRequest {
  /** 会话标签页 */
  chat_tabs: Lark.ChatTab[]
}
export interface DeleteTabsImChatTabRequest {
  /** 会话标签页id列表 */
  tab_ids: string[]
}
export interface UpdateTabsImChatTabRequest {
  /** 会话标签页 */
  chat_tabs?: Lark.ChatTab[]
}
export interface SortTabsImChatTabRequest {
  /** 会话标签页ID列表 */
  tab_ids?: string[]
}
export interface CreateImChatMenuTreeRequest {
  /** 要向群内追加的菜单 */
  menu_tree: Lark.ChatMenuTree
}
export interface DeleteImChatMenuTreeRequest {
  /** 要删除的一级菜单ID列表 */
  chat_menu_top_level_ids: string[]
}
export interface PatchImChatMenuItemRequest {
  /** 修改的字段 */
  update_fields: string[]
  /** 元信息 */
  chat_menu_item: Lark.ChatMenuItem
}
export interface SortImChatMenuTreeRequest {
  /** 一级菜单id列表 */
  chat_menu_top_level_ids: string[]
}
export interface ListDrivev1FileQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 文件夹的token（若不填写该参数或填写空字符串，则默认获取用户云空间下的清单，且不支持分页） */
  folder_token?: string
  /** 排序规则 */
  order_by?: string
  /** 升序降序 */
  direction?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateFolderDrivev1FileRequest {
  /** 文件夹名称 */
  name: string
  /** 父文件夹token */
  folder_token: string
}
export interface BatchQueryDrivev1MetaRequest {
  /** 请求文档,  一次不超过200个 */
  request_docs: Lark.RequestDoc[]
  /** 是否获取文档链接 */
  with_url?: boolean
}
export interface BatchQueryDrivev1MetaQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetDrivev1FileStatisticsQuery {
  /** 文档类型 */
  file_type: string
}
export interface CopyDrivev1FileRequest {
  /** 被复制文件的新名称 */
  name: string
  /** 被复制文件的类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
  type?: string
  /** 文件被复制到的目标文件夹token */
  folder_token: string
  /** 用户自定义请求附加参数，用于实现特殊的复制语义 */
  extra?: Lark.Property[]
}
export interface CopyDrivev1FileQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface MoveDrivev1FileRequest {
  /** 文件类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
  type?: string
  /** 目标文件夹token */
  folder_token?: string
}
export interface DeleteDrivev1FileQuery {
  /** 被删除文件的类型 */
  type: string
}
export interface CreateShortcutDrivev1FileRequest {
  /** 创建快捷方式的目标父文件夹 token */
  parent_token: string
  /** 快捷方式映射到的文档和文件列表信息 */
  refer_entity: Lark.ReferEntity
}
export interface CreateShortcutDrivev1FileQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface TaskCheckDrivev1FileQuery {
  /** 文件相关异步任务id */
  task_id: string
}
export interface DownloadDrivev1MediaQuery {
  /** 扩展信息 */
  extra?: string
}
export interface BatchGetTmpDownloadUrlDrivev1MediaQuery {
  /** 文件标识符列表 */
  file_tokens: string[]
  /** 拓展信息(可选) */
  extra?: string
}
export interface UploadPrepareDrivev1MediaRequest {
  /** 文件名 */
  file_name: string
  /** 上传点类型 */
  parent_type: string
  /** 上传点的标识符 */
  parent_node: string
  /** 文件大小 */
  size: number
  /** 扩展信息(可选) */
  extra?: string
}
export interface UploadFinishDrivev1MediaRequest {
  /** 分片上传事务ID */
  upload_id: string
  /** 分片数量 */
  block_num: number
}
export interface SubscribeDrivev1FileQuery {
  /** 文档类型 */
  file_type: string
}
export interface DeleteSubscribeDrivev1FileQuery {
  /** 文档类型 */
  file_type: string
}
export interface GetSubscribeDrivev1FileQuery {
  /** 文档类型 */
  file_type: string
}
export interface UploadPrepareDrivev1FileRequest {
  /** 文件名 */
  file_name: string
  /** 上传点类型 */
  parent_type: string
  /** 文件夹的token */
  parent_node: string
  /** 文件大小 */
  size: number
}
export interface UploadFinishDrivev1FileRequest {
  /** 分片上传事务ID */
  upload_id: string
  /** 分片数量 */
  block_num: number
}
export interface CreateDrivev1ImportTaskRequest {
  /** 导入文件格式后缀 */
  file_extension: string
  /** 导入文件Drive FileToken */
  file_token: string
  /** 导入目标云文档格式 */
  type: string
  /** 导入目标云文档文件名 ，若为空使用Drive文件名 */
  file_name?: string
  /** 挂载点 */
  point: Lark.ImportTaskMountPoint
}
export interface CreateDrivev1ExportTaskRequest {
  /** 导出文件扩展名 */
  file_extension: string
  /** 导出文档 token */
  token: string
  /** 导出文档类型 */
  type: string
  /** 导出子表ID，仅当将 sheet/bitable 导出为 csv 时使用 */
  sub_id?: string
}
export interface GetDrivev1ExportTaskQuery {
  /** 导出文档的 token */
  token: string
}
export interface ListDrivev1FileViewRecordQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 文档类型 */
  file_type: string
  /** 此次调用中使用的访问者 ID 的类型 */
  viewer_id_type?: string
}
export interface CreateDrivev1FileVersionRequest {
  /** 版本文档标题 */
  name?: string
  /** 版本文档版本号 */
  version?: string
  /** 源文档token */
  parent_token?: string
  /** 版本文档所有者id */
  owner_id?: string
  /** 版本文档创建者id */
  creator_id?: string
  /** 版本文档创建时间 */
  create_time?: string
  /** 版本文档更新时间 */
  update_time?: string
  /** 版本文档状态 */
  status?: string
  /** 版本文档类型 */
  obj_type?: string
  /** 源文档类型 */
  parent_type?: string
}
export interface CreateDrivev1FileVersionQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteDrivev1FileVersionQuery {
  /** 文档类型 */
  obj_type: string
  /** 用户ID类型 */
  user_id_type?: string
}
export interface GetDrivev1FileVersionQuery {
  /** 文档类型 */
  obj_type: string
  /** 用户ID类型 */
  user_id_type?: string
}
export interface ListDrivev1FileVersionQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 原文档类型 */
  obj_type: string
  /** 用户id类型 */
  user_id_type?: string
}
export interface TransferOwnerDrivev1PermissionMemberRequest {
  /** 文档拥有者的ID类型 */
  member_type: string
  /** 文档拥有者的ID，与文档拥有者的ID类型需要对应 */
  member_id: string
}
export interface TransferOwnerDrivev1PermissionMemberQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
  /** 是否需要通知新 Owner */
  need_notification?: boolean
  /** 转移后是否需要移除原 Owner 的权限 */
  remove_old_owner?: boolean
  /** 仅当内容不在共享文件夹中，此参数才会生效。如果设为false，系统会将该内容移至新所有者的个人空间根文件夹。如果设为 true，则留在原位置。 */
  stay_put?: boolean
}
export interface AuthDrivev1PermissionMemberQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
  /** 需要判断的权限 */
  action: string
}
export interface ListDrivev1PermissionMemberQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
  /** 指定返回的协作者字段信息，如无指定则默认不返回

  **可选值有：**
  - `name`：协作者名
  - `type`：协作者类型
  - `avatar`：头像
  - `external_label`：外部标签

  **注意：**
  - 你可以使用特殊值`*`指定返回目前支持的所有字段
  - 你可以使用`,`分隔若干个你想指定返回的字段，如：`name,avatar`
  - 按需指定返回字段接口性能更好 */
  fields?: string
}
export interface CreateDrivev1PermissionMemberRequest {
  /** 协作者ID类型 */
  member_type: string
  /** 协作者ID，与协作者ID类型需要对应 */
  member_id: string
  /** 需要增加的权限角色 */
  perm: string
}
export interface CreateDrivev1PermissionMemberQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
  /** 添加权限后是否通知对方 */
  need_notification?: boolean
}
export interface UpdateDrivev1PermissionMemberRequest {
  /** 协作者ID类型 */
  member_type: string
  /** 需要增加的权限角色 */
  perm: string
}
export interface UpdateDrivev1PermissionMemberQuery {
  /** 更新权限后是否通知对方

  **注意：** 使用`tenant_access_token`访问不支持该参数 */
  need_notification?: boolean
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: string
}
export interface DeleteDrivev1PermissionMemberQuery {
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: string
  /** 权限成员类型，放于query参数中，如：`?member_type=openid` */
  member_type: string
}
export interface CreateDrivev1PermissionPublicPasswordQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
}
export interface UpdateDrivev1PermissionPublicPasswordQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
}
export interface DeleteDrivev1PermissionPublicPasswordQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
}
export interface GetDrivev1PermissionPublicQuery {
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: string
}
export interface PatchDrivev1PermissionPublicRequest {
  /** 允许内容被分享到组织外 */
  external_access?: boolean
  /** 谁可以复制内容、创建副本、打印、下载 */
  security_entity?: string
  /** 谁可以评论 */
  comment_entity?: string
  /** 谁可以添加和管理协作者 */
  share_entity?: string
  /** 链接分享设置 */
  link_share_entity?: string
  /** 允许非「可管理权限」的人分享到组织外 */
  invite_external?: boolean
}
export interface PatchDrivev1PermissionPublicQuery {
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: string
}
export interface GetDrivev2PermissionPublicQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
}
export interface PatchDrivev2PermissionPublicRequest {
  /** 允许内容被分享到组织外 */
  external_access_entity?: string
  /** 谁可以创建副本、打印、下载 */
  security_entity?: string
  /** 谁可以评论 */
  comment_entity?: string
  /** 谁可以添加和管理协作者-组织维度 */
  share_entity?: string
  /** 谁可以添加和管理协作者-协作者维度 */
  manage_collaborator_entity?: string
  /** 链接分享设置 */
  link_share_entity?: string
  /** 谁可以复制内容 */
  copy_entity?: string
}
export interface PatchDrivev2PermissionPublicQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: string
}
export interface ListDrivev1FileCommentQuery {
  /** 文档类型 */
  file_type: string
  /** 是否全文评论 */
  is_whole?: boolean
  /** 是否已解决（可选） */
  is_solved?: boolean
  /** 评论分页参数 */
  page_token?: string
  /** 获取满足 commen_id > page_token 的评论数量 */
  page_size?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchQueryDrivev1FileCommentRequest {
  /** 需要获取数据的评论id */
  comment_ids: string[]
}
export interface BatchQueryDrivev1FileCommentQuery {
  /** 文档类型 */
  file_type: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchDrivev1FileCommentRequest {
  /** 评论解决标志 */
  is_solved: boolean
}
export interface PatchDrivev1FileCommentQuery {
  /** 文档类型 */
  file_type: string
}
export interface CreateDrivev1FileCommentRequest {
  /** 评论ID */
  comment_id?: string
  /** 用户ID */
  user_id?: string
  /** 创建时间 */
  create_time?: number
  /** 更新时间 */
  update_time?: number
  /** 是否已解决 */
  is_solved?: boolean
  /** 解决评论时间 */
  solved_time?: number
  /** 解决评论者的用户ID */
  solver_user_id?: string
  /** 是否有更多回复 */
  has_more?: boolean
  /** 回复分页标记 */
  page_token?: string
  /** 是否是全文评论 */
  is_whole?: boolean
  /** 如果是局部评论，引用字段 */
  quote?: string
  /** 评论里的回复列表 */
  reply_list?: Lark.ReplyList
}
export interface CreateDrivev1FileCommentQuery {
  /** 文档类型 */
  file_type: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetDrivev1FileCommentQuery {
  /** 文档类型 */
  file_type: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListDrivev1FileCommentReplyQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 文档类型 */
  file_type: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateDrivev1FileCommentReplyRequest {
  /** 回复内容 */
  content: Lark.ReplyContent
}
export interface UpdateDrivev1FileCommentReplyQuery {
  /** 文档类型 */
  file_type: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteDrivev1FileCommentReplyQuery {
  /** 文档类型 */
  file_type: string
}
export interface RawContentDocxDocumentQuery {
  /** 语言（用于 MentionUser 语言的选取） */
  lang?: number
}
export interface ListDocxDocumentBlockQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 查询的文档版本，-1表示文档最新版本。若此时查询的版本为文档最新版本，则需要持有文档的阅读权限；若此时查询的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateDocxDocumentRequest {
  /** 文件夹 token，获取方式见云文档接口快速入门；空表示根目录，tenant_access_token应用权限仅允许操作应用创建的目录 */
  folder_token?: string
  /** 文档标题，只支持纯文本 */
  title?: string
}
export interface GetDocxDocumentBlockQuery {
  /** 查询的文档版本，-1表示文档最新版本。若此时查询的版本为文档最新版本，则需要持有文档的阅读权限；若此时查询的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetDocxDocumentBlockChildrenQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateDocxDocumentBlockChildrenRequest {
  /** 添加的孩子列表。 */
  children?: Lark.Block[]
  /** 当前 block 在 children 中的插入位置，起始值为 0，最大值为原 children 长度 */
  index?: number
}
export interface CreateDocxDocumentBlockChildrenQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchDocxDocumentBlockRequest {
  /** 更新文本元素请求 */
  update_text_elements?: Lark.UpdateTextElementsRequest
  /** 更新文本样式请求 */
  update_text_style?: Lark.UpdateTextStyleRequest
  /** 更新表格属性请求 */
  update_table_property?: Lark.UpdateTablePropertyRequest
  /** 表格插入新行请求 */
  insert_table_row?: Lark.InsertTableRowRequest
  /** 表格插入新列请求 */
  insert_table_column?: Lark.InsertTableColumnRequest
  /** 表格批量删除行请求 */
  delete_table_rows?: Lark.DeleteTableRowsRequest
  /** 表格批量删除列请求 */
  delete_table_columns?: Lark.DeleteTableColumnsRequest
  /** 表格合并单元格请求 */
  merge_table_cells?: Lark.MergeTableCellsRequest
  /** 表格取消单元格合并状态请求 */
  unmerge_table_cells?: Lark.UnmergeTableCellsRequest
  /** 分栏插入新的分栏列请求 */
  insert_grid_column?: Lark.InsertGridColumnRequest
  /** 分栏删除列请求 */
  delete_grid_column?: Lark.DeleteGridColumnRequest
  /** 更新分栏列宽比例请求 */
  update_grid_column_width_ratio?: Lark.UpdateGridColumnWidthRatioRequest
  /** 替换图片请求 */
  replace_image?: Lark.ReplaceImageRequest
  /** 替换附件请求 */
  replace_file?: Lark.ReplaceFileRequest
  /** 更新文本元素及样式请求 */
  update_text?: Lark.UpdateTextRequest
}
export interface PatchDocxDocumentBlockQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchUpdateDocxDocumentBlockRequest {
  /** 批量更新 Block */
  requests: Lark.UpdateBlockRequest[]
}
export interface BatchUpdateDocxDocumentBlockQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteDocxDocumentBlockChildrenRequest {
  /** 删除的起始索引（操作区间左闭右开） */
  start_index: number
  /** 删除的末尾索引（操作区间左闭右开） */
  end_index: number
}
export interface BatchDeleteDocxDocumentBlockChildrenQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
}
export interface PatchSheetsSpreadsheetRequest {
  /** 表格标题 */
  title?: string
}
export interface GetSheetsSpreadsheetQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateSheetsSpreadsheetRequest {
  /** 表格标题 */
  title?: string
  /** 文件夹token */
  folder_token?: string
}
export interface MoveDimensionSheetsSpreadsheetSheetRequest {
  /** 移动源位置参数 */
  source?: Lark.Dimension
  /** 移动的目标位置行或者列号 */
  destination_index?: number
}
export interface FindSheetsSpreadsheetSheetRequest {
  /** 查找条件 */
  find_condition: Lark.FindCondition
  /** 查找的字符串 */
  find: string
}
export interface ReplaceSheetsSpreadsheetSheetRequest {
  /** 查找条件 */
  find_condition: Lark.FindCondition
  /** 查找的字符串 */
  find: string
  /** 替换的字符串 */
  replacement: string
}
export interface CreateSheetsSpreadsheetSheetFilterRequest {
  /** 筛选应用范围 */
  range: string
  /** 设置筛选条件的列 */
  col: string
  /** 筛选的条件 */
  condition: Lark.Condition
}
export interface UpdateSheetsSpreadsheetSheetFilterRequest {
  /** 更新筛选条件的列 */
  col: string
  /** 筛选条件 */
  condition: Lark.Condition
}
export interface CreateSheetsSpreadsheetSheetFilterViewRequest {
  /** 筛选视图 id */
  filter_view_id?: string
  /** 筛选视图名字 */
  filter_view_name?: string
  /** 筛选视图的筛选范围 */
  range?: string
}
export interface PatchSheetsSpreadsheetSheetFilterViewRequest {
  /** 筛选视图名字 */
  filter_view_name?: string
  /** 筛选视图的筛选范围 */
  range?: string
}
export interface CreateSheetsSpreadsheetSheetFilterViewConditionRequest {
  /** 设置筛选条件的列，使用字母号 */
  condition_id?: string
  /** 筛选类型 */
  filter_type?: string
  /** 比较类型 */
  compare_type?: string
  /** 筛选参数 */
  expected?: string[]
}
export interface UpdateSheetsSpreadsheetSheetFilterViewConditionRequest {
  /** 筛选类型 */
  filter_type?: string
  /** 比较类型 */
  compare_type?: string
  /** 筛选参数 */
  expected?: string[]
}
export interface CreateSheetsSpreadsheetSheetFloatImageRequest {
  /** 浮动图片 id */
  float_image_id?: string
  /** 浮动图片 token，需要先上传图片到表格获得此 token 之后再进行浮动图片的操作 */
  float_image_token?: string
  /** 浮动图片的左上角单元格定位，只支持一个单元格 */
  range?: string
  /** 浮动图片的宽度，大于等于 20px */
  width?: number
  /** 浮动图片的高度，大于等于 20px */
  height?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移，大于等于0且小于所在单元格的宽度 */
  offset_x?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移，大于等于0且小于所在单元格的高度 */
  offset_y?: number
}
export interface PatchSheetsSpreadsheetSheetFloatImageRequest {
  /** 浮动图片 token，需要先上传图片到表格获得此 token 之后再进行浮动图片的操作 */
  float_image_token?: string
  /** 浮动图片的左上角单元格定位，只支持一个单元格 */
  range?: string
  /** 浮动图片的宽度，大于等于 20px */
  width?: number
  /** 浮动图片的高度，大于等于 20px */
  height?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的横向偏移，大于等于0且小于所在单元格的宽度 */
  offset_x?: number
  /** 浮动图片左上角所在位置相对于所在单元格左上角的纵向偏移，大于等于0且小于所在单元格的高度 */
  offset_y?: number
}
export interface CopyBitableAppRequest {
  /** 多维表格 App 名字 */
  name?: string
  /** 多维表格 App 归属文件夹 */
  folder_token?: string
  /** 不复制文档内容，只复制文档结构 */
  without_content?: boolean
}
export interface CreateBitableAppRequest {
  /** 多维表格App名字 */
  name?: string
  /** 多维表格App归属文件夹 */
  folder_token?: string
}
export interface UpdateBitableAppRequest {
  /** 新的多维表格名字 */
  name?: string
  /** 多维表格是否开启高级权限 */
  is_advanced?: boolean
}
export interface CreateBitableAppTableRequest {
  /** 数据表 */
  table?: Lark.ReqTable
}
export interface BatchCreateBitableAppTableRequest {
  /** tables */
  tables?: Lark.ReqTable[]
}
export interface BatchCreateBitableAppTableQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteBitableAppTableRequest {
  /** 删除的多条tableid列表 */
  table_ids?: string[]
}
export interface PatchBitableAppTableRequest {
  /** 数据表的新名称 */
  name?: string
}
export interface ListBitableAppTableQuery {
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CopyBitableAppDashboardRequest {
  /** 仪表盘名称 */
  name: string
}
export interface ListBitableAppDashboardQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface PatchBitableAppTableViewRequest {
  /** 视图名称 */
  view_name?: string
  /** 视图属性 */
  property?: Lark.AppTableViewProperty
}
export interface ListBitableAppTableViewQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateBitableAppTableViewRequest {
  /** 视图名字 */
  view_name: string
  /** 视图类型 */
  view_type?: string
}
export interface PatchBitableAppTableFormRequest {
  /** 表单名称 */
  name?: string
  /** 表单描述 */
  description?: string
  /** 是否开启共享 */
  shared?: boolean
  /** 分享范围限制 */
  shared_limit?: string
  /** 填写次数限制一次 */
  submit_limit_once?: boolean
}
export interface PatchBitableAppTableFormFieldRequest {
  /** 上一个表单问题 ID */
  pre_field_id?: string
  /** 表单问题 */
  title?: string
  /** 问题描述 */
  description?: string
  /** 是否必填 */
  required?: boolean
  /** 是否可见 */
  visible?: boolean
}
export interface ListBitableAppTableFormFieldQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface GetBitableAppTableRecordQuery {
  /** 控制多行文本字段数据的返回格式, true 表示以数组形式返回 */
  text_field_as_array?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 控制公式、查找引用是否显示完整的原样返回结果 */
  display_formula_ref?: boolean
  /** 控制是否返回该记录的链接 */
  with_shared_url?: boolean
  /** 控制是否返回自动计算的字段，例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`，true 表示返回 */
  automatic_fields?: boolean
}
export interface SearchBitableAppTableRecordRequest {
  /** 视图Id,指定视图id则按照视图的筛选排序结果返回数据 */
  view_id?: string
  /** 指定要返回的字段 */
  field_names?: string[]
  /** 排序条件 */
  sort?: Lark.Sort[]
  /** 筛选条件 */
  filter?: Lark.FilterInfo
  /** 控制是否返回自动计算的字段, true 表示返回 */
  automatic_fields?: boolean
}
export interface SearchBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CreateBitableAppTableRecordRequest {
  /** 记录字段 */
  fields: unknown
}
export interface CreateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
}
export interface UpdateBitableAppTableRecordRequest {
  /** 记录字段 */
  fields: unknown
}
export interface UpdateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchCreateBitableAppTableRecordRequest {
  /** 记录 */
  records: Lark.AppTableRecord[]
}
export interface BatchCreateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
}
export interface BatchUpdateBitableAppTableRecordRequest {
  /** 记录 */
  records: Lark.AppTableRecord[]
}
export interface BatchUpdateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteBitableAppTableRecordRequest {
  /** 删除的多条记录id列表 */
  records: string[]
}
export interface ListBitableAppTableFieldQuery {
  /** 视图 ID */
  view_id?: string
  /** 控制字段描述（多行文本格式）数据的返回格式, true 表示以数组富文本形式返回 */
  text_field_as_array?: boolean
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CreateBitableAppTableFieldRequest {
  /** 字段名 */
  field_name: string
  /** 字段类型 */
  type: number
  /** 字段属性 */
  property?: Lark.AppTableFieldProperty
  /** 字段的描述 */
  description?: Lark.AppTableFieldDescription
  /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: string
}
export interface CreateBitableAppTableFieldQuery {
  /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
}
export interface UpdateBitableAppTableFieldRequest {
  /** 字段名 */
  field_name: string
  /** 字段类型 */
  type: number
  /** 字段属性 */
  property?: Lark.AppTableFieldProperty
  /** 字段的描述 */
  description?: Lark.AppTableFieldDescription
  /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: string
}
export interface ListBitableAppRoleQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateBitableAppRoleRequest {
  /** 自定义权限的名字 */
  role_name: string
  /** 数据表权限 */
  table_roles: Lark.AppRoleTableRole[]
  /** block权限 */
  block_roles?: Lark.AppRoleBlockRole[]
}
export interface UpdateBitableAppRoleRequest {
  /** 自定义权限的名字 */
  role_name: string
  /** 数据表权限 */
  table_roles: Lark.AppRoleTableRole[]
  /** block权限 */
  block_roles?: Lark.AppRoleBlockRole[]
}
export interface BatchDeleteBitableAppRoleMemberRequest {
  /** 协作者列表 */
  member_list: Lark.AppRoleMemberId[]
}
export interface BatchCreateBitableAppRoleMemberRequest {
  /** 协作者列表 */
  member_list: Lark.AppRoleMemberId[]
}
export interface ListBitableAppRoleMemberQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateBitableAppRoleMemberRequest {
  /** 协作者id */
  member_id: string
}
export interface CreateBitableAppRoleMemberQuery {
  /** 协作者id类型，与请求体中的member_id要对应 */
  member_id_type?: string
}
export interface DeleteBitableAppRoleMemberQuery {
  /** 协作者id类型，与请求体中的member_id要对应 */
  member_id_type?: string
}
export interface ListWikiSpaceQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateWikiSpaceRequest {
  /** 知识空间名称 */
  name?: string
  /** 知识空间描述 */
  description?: string
}
export interface CreateWikiSpaceMemberRequest {
  /** 用户id类型： “email” - 邮箱地址 “openid” - 开放平台id “openchat” - 群id “userid” - 用户id “departmentid” - 部门id */
  member_type: string
  /** 用户id */
  member_id: string
  /** 角色:“admin” - 管理员 “member” - 成员 */
  member_role: string
}
export interface CreateWikiSpaceMemberQuery {
  /** 添加权限后是否通知对方 */
  need_notification?: boolean
}
export interface DeleteWikiSpaceMemberRequest {
  /** 用户id类型： “email” - 邮箱地址 “openid” - 开放平台id “openchat” - 群id “userid” - 用户id “departmentid” - 部门id */
  member_type: string
  /** 角色:“admin” - 管理员 “member” - 成员 */
  member_role: string
}
export interface UpdateWikiSpaceSettingRequest {
  /** 谁可以创建空间的一级页面： "admin_and_member" = 管理员和成员 "admin"  - 仅管理员 */
  create_setting?: string
  /** 可阅读用户可否创建副本/打印/导出/复制： "allow" - 允许 "not_allow" - 不允许 */
  security_setting?: string
  /** 可阅读用户可否评论： "allow" - 允许 "not_allow" - 不允许 */
  comment_setting?: string
}
export interface CreateWikiSpaceNodeRequest {
  /** 文档类型，对于快捷方式，该字段是对应的实体的obj_type。 */
  obj_type: string
  /** 父节点 token。若当前节点为一级节点，父节点 token 为空。 */
  parent_node_token?: string
  /** 节点类型 */
  node_type: string
  /** 快捷方式对应的实体node_token，当节点为快捷方式时，该值不为空。 */
  origin_node_token?: string
  /** 文档标题 */
  title?: string
}
export interface GetNodeWikiSpaceQuery {
  /** 文档的wiki token */
  token: string
  /** 文档类型 */
  obj_type?: string
}
export interface ListWikiSpaceNodeQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 父节点token */
  parent_node_token?: string
}
export interface MoveWikiSpaceNodeRequest {
  /** 移动到的父节点token */
  target_parent_token?: string
  /** 移动到的知识空间ID */
  target_space_id?: string
}
export interface UpdateTitleWikiSpaceNodeRequest {
  /** 节点新标题 */
  title: string
}
export interface CopyWikiSpaceNodeRequest {
  /** 目标父节点token */
  target_parent_token?: string
  /** 目标知识空间id */
  target_space_id?: string
  /** 复制后的新标题。如果填空，则新标题为空。如果不填，则使用原节点标题。 */
  title?: string
}
export interface MoveDocsToWikiWikiSpaceNodeRequest {
  /** 节点的父亲token */
  parent_wiki_token?: string
  /** 文档类型 */
  obj_type: string
  /** 文档token */
  obj_token: string
  /** 没有权限时，是否申请迁入文档 */
  apply?: boolean
}
export interface GetWikiTaskQuery {
  /** 任务类型 */
  task_type: string
}
export interface SearchWikiNodeRequest {
  /** 搜索关键词 */
  query: string
  /** 文档所属的知识空间ID，为空搜索所有 wiki */
  space_id?: string
  /** wiki token，不为空搜索该节点及其所有子节点，为空搜索所有 wiki（根据 space_id 选择 space） */
  node_id?: string
}
export interface SearchWikiNodeQuery {
  page_token?: string
  page_size?: number
}
export interface GetDrivev1FileSubscriptionRequest {
  /** 订阅关系ID */
  subscription_id?: string
  /** 是否订阅 */
  subscription_type?: string
  /** 是否订阅 */
  is_subcribe?: boolean
  /** 文档类型 */
  file_type: string
}
export interface CreateDrivev1FileSubscriptionRequest {
  /** 订阅关系ID */
  subscription_id?: string
  /** 订阅类型 */
  subscription_type: string
  /** 是否订阅 */
  is_subcribe?: boolean
  /** 文档类型 */
  file_type: string
}
export interface PatchDrivev1FileSubscriptionRequest {
  /** 是否订阅 */
  is_subscribe: boolean
  /** 文档类型 */
  file_type: string
}
export interface CreateCalendarRequest {
  /** 日历标题 */
  summary?: string
  /** 日历描述 */
  description?: string
  permissions?: string
  /** 日历颜色，颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效 */
  color?: number
  /** 日历备注名，修改或添加后仅对当前身份生效 */
  summary_alias?: string
}
export interface PrimaryCalendarQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListCalendarFreebusyRequest {
  /** 查询时段开始时间，需要url编码 */
  time_min: string
  /** 查询时段结束时间，需要url编码 */
  time_max: string
  /** 用户user_id，输入时与 room_id 二选一。参见[用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  user_id?: string
  /** 会议室room_id，输入时与 user_id 二选一 */
  room_id?: string
}
export interface ListCalendarFreebusyQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListCalendarQuery {
  /** 一次请求要求返回最大数量，默认500，取值范围为[50. 1000] */
  page_size?: number
  /** 上次请求Response返回的分页标记，首次请求时为空 */
  page_token?: string
  /** 上次请求Response返回的增量同步标记，分页请求未结束时为空 */
  sync_token?: string
}
export interface PatchCalendarRequest {
  /** 日历标题 */
  summary?: string
  /** 日历描述 */
  description?: string
  permissions?: string
  /** 日历颜色，颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效 */
  color?: number
  /** 日历备注名，修改或添加后仅对当前身份生效 */
  summary_alias?: string
}
export interface SearchCalendarRequest {
  /** 搜索关键字 */
  query: string
}
export interface SearchCalendarQuery {
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CreateCalendarCalendarAclRequest {
  /** 对日历的访问权限 */
  role: string
  /** 权限范围 */
  scope: Lark.AclScope
}
export interface CreateCalendarCalendarAclQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListCalendarCalendarAclQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CreateCalendarCalendarEventRequest {
  /** 日程标题 */
  summary?: string
  /** 日程描述 */
  description?: string
  /** 是否发送通知消息 */
  need_notification?: boolean
  /** 日程开始时间 */
  start_time: Lark.TimeInfo
  /** 日程结束时间 */
  end_time: Lark.TimeInfo
  /** 视频会议信息，仅当日程至少有一位attendee时生效 */
  vchat?: Lark.Vchat
  /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  visibility?: string
  /** 参与人权限 */
  attendee_ability?: string
  /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  free_busy_status?: string
  /** 日程地点 */
  location?: Lark.EventLocation
  /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
  color?: number
  /** 日程提醒列表 */
  reminders?: Lark.Reminder[]
  /** 重复日程的重复性规则 */
  recurrence?: string
  /** 日程自定义信息 */
  schemas?: Lark.Schema[]
}
export interface CreateCalendarCalendarEventQuery {
  /** 幂等唯一key */
  idempotency_key?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteCalendarCalendarEventQuery {
  /** 删除日程是否给日程参与人发送bot通知，默认为true */
  need_notification?: boolean
}
export interface PatchCalendarCalendarEventRequest {
  /** 日程标题 */
  summary?: string
  /** 日程描述 */
  description?: string
  /** 是否发送通知消息 */
  need_notification?: boolean
  /** 日程开始时间 */
  start_time?: Lark.TimeInfo
  /** 日程结束时间 */
  end_time?: Lark.TimeInfo
  /** 视频会议信息，仅当日程至少有一位attendee时生效 */
  vchat?: Lark.Vchat
  /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  visibility?: string
  /** 参与人权限 */
  attendee_ability?: string
  /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  free_busy_status?: string
  /** 日程地点 */
  location?: Lark.EventLocation
  /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
  color?: number
  /** 日程提醒列表 */
  reminders?: Lark.Reminder[]
  /** 重复日程的重复性规则 */
  recurrence?: string
  /** 日程自定义信息 */
  schemas?: Lark.Schema[]
}
export interface PatchCalendarCalendarEventQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetCalendarCalendarEventQuery {
  /** 是否需要返回会前设置 */
  need_meeting_settings?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListCalendarCalendarEventQuery {
  /** 一次请求要求返回最大数量，默认500，取值范围为[50, 1000] */
  page_size?: number
  /** 拉取anchor_time之后的日程，为timestamp */
  anchor_time?: string
  /** 上次请求Response返回的分页标记，首次请求时为空 */
  page_token?: string
  /** 上次请求Response返回的增量同步标记，分页请求未结束时为空 */
  sync_token?: string
  /** 日程开始Unix时间戳，单位为秒 */
  start_time?: string
  /** 日程结束Unix时间戳，单位为秒 */
  end_time?: string
}
export interface SearchCalendarCalendarEventRequest {
  /** 搜索关键字 */
  query: string
  /** 搜索过滤器 */
  filter?: Lark.EventSearchFilter
}
export interface SearchCalendarCalendarEventQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface ReplyCalendarCalendarEventRequest {
  /** rsvp状态 */
  rsvp_status: string
}
export interface InstancesCalendarCalendarEventQuery {
  /** 日程实例开始Unix时间戳，单位为秒,日程的end_time的下限（不包含） */
  start_time: string
  /** 日程实例结束Unix时间戳，单位为秒,日程的start_time上限（不包含） */
  end_time: string
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface InstanceViewCalendarCalendarEventQuery {
  /** 日程开始Unix时间戳，单位为秒 */
  start_time: string
  /** 日程结束Unix时间戳，单位为秒 */
  end_time: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteCalendarCalendarEventMeetingChatQuery {
  /** 会议群ID */
  meeting_chat_id: string
}
export interface CreateCalendarTimeoffEventRequest {
  /** 用户的user id */
  user_id: string
  /** 休假人的时区 */
  timezone: string
  /** 休假开始时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，且与end_time对应，不符合将返回错误 */
  start_time: string
  /** 休假结束时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，与start_time对应，不符合将返回错误 */
  end_time: string
  /** 休假日程标题，可自定义例如："请假中(全天) / 1-Day Time Off"，"请假中(半天) / 0.5-Day Time Off"，"长期休假中 / Leave of Absence"，"请假中" */
  title?: string
  /** 休假日程描述，可自定义,例如：
  "若拒绝或删除此日程，飞书中相应的“请假”标签将自动消失，而请假系统中的休假申请不会被撤销。

  If the event is rejected or deleted, corresponding "On Leave" tag in Feishu will disappear, while the leave request in the time off system will not be revoked." */
  description?: string
}
export interface CreateCalendarTimeoffEventQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateCalendarCalendarEventAttendeeRequest {
  /** 新增参与人列表；<br>
  - 单次请求会议室的数量限制为100。 */
  attendees?: Lark.CalendarEventAttendee[]
  /** 是否给参与人发送bot通知 默认为true */
  need_notification?: boolean
  /** 使用管理员身份访问时要修改的实例(仅用于重复日程修改其中的一个实例，非重复日程无需填此字段) */
  instance_start_time_admin?: string
  /** 是否启用管理员身份(需先在管理后台设置某人为会议室管理员) */
  is_enable_admin?: boolean
  /** 是否添加会议室operate_id标识的用户到参与人 */
  add_operator_to_attendee?: boolean
}
export interface CreateCalendarCalendarEventAttendeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteCalendarCalendarEventAttendeeRequest {
  /** 要移除的参与人 ID 列表。参见[参与人ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/introduction#4998889c) */
  attendee_ids?: string[]
  /** 需要删除的参与人类型实体ID，作为attendee_ids字段的补充。 */
  delete_ids?: Lark.CalendarEventAttendeeId[]
  /** 删除日程参与人时是否要给参与人发送bot通知，默认为true */
  need_notification?: boolean
  /** 使用管理员身份访问时要修改的实例 */
  instance_start_time_admin?: string
  /** 是否启用管理员身份(需先在管理后台设置某人为会议室管理员) */
  is_enable_admin?: boolean
}
export interface BatchDeleteCalendarCalendarEventAttendeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListCalendarCalendarEventAttendeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 是否需要会议室表单信息 */
  need_resource_customization?: boolean
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface ListCalendarCalendarEventAttendeeChatMemberQuery {
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GenerateCaldavConfCalendarSettingRequest {
  /** 需要同步日历的设备名，在日历中展示用来管理密码 */
  device_name?: string
}
export interface CreateCalendarExchangeBindingRequest {
  /** admin账户 */
  admin_account?: string
  /** 用户绑定的Exchange账户 */
  exchange_account?: string
  /** Exchange账户绑定user唯一标识id */
  user_id?: string
}
export interface CreateCalendarExchangeBindingQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetCalendarExchangeBindingQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ApplyVcReserveRequest {
  /** 预约到期时间（unix时间，单位sec），多人会议必填 */
  end_time?: string
  /** 指定会议归属人，使用tenant_access_token时生效且必传，使用user_access_token时不生效，必须指定为同租户下的合法lark用户 */
  owner_id?: string
  /** 会议设置 */
  meeting_settings: Lark.ReserveMeetingSetting
}
export interface ApplyVcReserveQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface UpdateVcReserveRequest {
  /** 预约到期时间（unix时间，单位sec） */
  end_time?: string
  /** 会议设置 */
  meeting_settings?: Lark.ReserveMeetingSetting
}
export interface UpdateVcReserveQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface GetVcReserveQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetActiveMeetingVcReserveQuery {
  /** 是否需要参会人列表，默认为false */
  with_participants?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface InviteVcMeetingRequest {
  /** 被邀请的用户列表 */
  invitees: Lark.MeetingUser[]
}
export interface InviteVcMeetingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface KickoutVcMeetingRequest {
  /** 需踢出的用户列表 */
  kickout_users: Lark.MeetingUser[]
}
export interface KickoutVcMeetingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface SetHostVcMeetingRequest {
  /** 将要设置的主持人 */
  host_user: Lark.MeetingUser
  /** 当前主持人（CAS并发安全：如果和会中当前主持人不符则会设置失败，可使用返回的最新数据重新设置） */
  old_host_user?: Lark.MeetingUser
}
export interface SetHostVcMeetingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface GetVcMeetingQuery {
  /** 是否需要参会人列表 */
  with_participants?: boolean
  /** 是否需要会中使用能力统计（仅限tenant_access_token） */
  with_meeting_ability?: boolean
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface ListByNoVcMeetingQuery {
  /** 9位会议号 */
  meeting_no: string
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface StartVcMeetingRecordingRequest {
  /** 录制文件时间显示使用的时区[-12,12] */
  timezone?: number
}
export interface SetPermissionVcMeetingRecordingRequest {
  /** 授权对象列表 */
  permission_objects: Lark.RecordingPermissionObject[]
  /** 授权或者取消授权，默认授权 */
  action_type?: number
}
export interface SetPermissionVcMeetingRecordingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface GetDailyVcReportQuery {
  /** 开始时间（unix时间，单位sec） */
  start_time: string
  /** 结束时间（unix时间，单位sec） */
  end_time: string
}
export interface GetTopUserVcReportQuery {
  /** 开始时间（unix时间，单位sec） */
  start_time: string
  /** 结束时间（unix时间，单位sec） */
  end_time: string
  /** 取前多少位 */
  limit: number
  /** 排序依据（降序） */
  order_by: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface MeetingListVcExportRequest {
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 按9位会议号筛选（最多一个筛选条件） */
  meeting_no?: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
}
export interface MeetingListVcExportQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface ParticipantListVcExportRequest {
  /** 会议开始时间（unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec） */
  meeting_end_time: string
  /** 9位会议号 */
  meeting_no: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
}
export interface ParticipantListVcExportQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface ParticipantQualityListVcExportRequest {
  /** 会议开始时间（unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec） */
  meeting_end_time: string
  /** 9位会议号 */
  meeting_no: string
  /** 参会人入会时间（unix时间，单位sec） */
  join_time: string
  /** 参会人为Lark用户时填入 */
  user_id?: string
  /** 参会人为Rooms时填入 */
  room_id?: string
}
export interface ParticipantQualityListVcExportQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface ResourceReservationListVcExportRequest {
  /** 层级id */
  room_level_id: string
  /** 是否展示会议主题 */
  need_topic?: boolean
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 待筛选的会议室id列表 */
  room_ids?: string[]
  /** 若为true表示导出room_ids范围外的会议室，默认为false */
  is_exclude?: boolean
}
export interface DownloadVcExportQuery {
  /** 文档token */
  file_token: string
}
export interface CreateVcRoomLevelRequest {
  /** 层级名称 */
  name: string
  /** 父层级ID */
  parent_id: string
  /** 自定义层级ID */
  custom_group_id?: string
}
export interface DelVcRoomLevelRequest {
  /** 层级ID */
  room_level_id: string
  /** 是否删除所有子层级 */
  delete_child?: boolean
}
export interface PatchVcRoomLevelRequest {
  /** 层级名称 */
  name: string
  /** 父层级ID */
  parent_id: string
  /** 自定义层级ID */
  custom_group_id?: string
}
export interface MgetVcRoomLevelRequest {
  /** 层级id列表 */
  level_ids: string[]
}
export interface ListVcRoomLevelQuery {
  /** 层级ID，不传则返回该租户下第一层级列表 */
  room_level_id?: string
  /** 分页尺寸大小 */
  page_size?: number
  /** 分页标记,第一次请求不填,表示从头开始遍历.下次遍历可采用该 page_token获取查询结果 */
  page_token?: string
}
export interface SearchVcRoomLevelQuery {
  /** 用于查询指定会议室的租户自定义会议室ID */
  custom_level_ids: string
}
export interface CreateVcRoomRequest {
  /** 会议室名称 */
  name: string
  /** 会议室能容纳的人数 */
  capacity: number
  /** 会议室的相关描述 */
  description?: string
  /** 自定义的会议室ID */
  custom_room_id?: string
  /** 层级ID */
  room_level_id: string
  /** 会议室状态 */
  room_status?: Lark.RoomStatus
  /** 设施信息列表 */
  device?: Lark.Device[]
}
export interface CreateVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface PatchVcRoomRequest {
  /** 会议室名称 */
  name?: string
  /** 会议室能容纳的人数 */
  capacity?: number
  /** 会议室的相关描述 */
  description?: string
  /** 自定义的会议室ID */
  custom_room_id?: string
  /** 层级ID */
  room_level_id?: string
  /** 会议室状态 */
  room_status?: Lark.RoomStatus
  /** 设施信息列表 */
  device?: Lark.Device[]
}
export interface PatchVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface GetVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface MgetVcRoomRequest {
  /** 会议室id列表 */
  room_ids: string[]
}
export interface MgetVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface ListVcRoomQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 层级ID，不传则返回该租户下的所有会议室 */
  room_level_id?: string
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface SearchVcRoomRequest {
  /** 用于查询指定会议室的租户自定义会议室ID列表，优先使用该字段进行查询 */
  custom_room_ids?: string[]
  /** 会议室搜索关键词（当custom_room_ids为空时，使用该字段进行查询） */
  keyword?: string
  /** 在该会议室层级下进行搜索 */
  room_level_id?: string
  /** 搜索会议室是否包括层级名称 */
  search_level_name?: boolean
  /** 分页大小，该值默认为10，最大为100 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface SearchVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface GetVcScopeConfigQuery {
  /** 查询节点范围 */
  scope_type: number
  /** 查询节点ID：如果scope_type为1，则为层级ID，如果scope_type为2，则为会议室ID */
  scope_id: string
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface CreateVcScopeConfigRequest {
  /** 查询节点范围 */
  scope_type: number
  /** 查询节点ID：如果scope_type为1，则为层级ID，如果scope_type为2，则为会议室ID */
  scope_id: string
  /** 节点配置 */
  scope_config?: Lark.RoomConfig
}
export interface CreateVcScopeConfigQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface ReserveScopeVcReserveConfigQuery {
  /** 会议室或层级id */
  scope_id: string
  /** 1代表层级，2代表会议室 */
  scope_type: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchVcReserveConfigRequest {
  /** 1代表层级，2代表会议室 */
  scope_type: string
  /** 预定审批设置 */
  approval_config?: Lark.ApprovalConfig
  /** 预定时间设置 */
  time_config?: Lark.TimeConfig
  /** 预定范围设置 */
  reserve_scope_config?: Lark.ReserveScopeConfig
}
export interface PatchVcReserveConfigQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetVcReserveConfigFormQuery {
  /** 1代表层级，2代表会议室 */
  scope_type: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchVcReserveConfigFormRequest {
  /** 1代表层级，2代表会议室 */
  scope_type: number
  /** 预定表单设置 */
  reserve_form_config: Lark.ReserveFormConfig
}
export interface PatchVcReserveConfigFormQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetVcReserveConfigAdminQuery {
  /** 会议室或层级 */
  scope_type: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchVcReserveConfigAdminRequest {
  /** 1代表层级，2代表会议室 */
  scope_type: number
  /** 预定管理员或部门 */
  reserve_admin_config: Lark.ReserveAdminConfig
}
export interface PatchVcReserveConfigAdminQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetVcReserveConfigDisableInformQuery {
  /** 1表示层级，2表示会议室 */
  scope_type: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchVcReserveConfigDisableInformRequest {
  /** 1表示会议室层级，2表示会议室 */
  scope_type: number
  /** 禁用通知配置 */
  disable_inform: Lark.DisableInformConfig
}
export interface PatchVcReserveConfigDisableInformQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetVcMeetingListQuery {
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 按9位会议号筛选（最多一个筛选条件） */
  meeting_no?: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
  /** 分页尺寸大小 */
  page_size?: number
  /** 分页标记,第一次请求不填,表示从头开始遍历.下次遍历可采用该 page_token获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetVcParticipantListQuery {
  /** 会议开始时间（需要精确到一分钟，unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec） */
  meeting_end_time: string
  /** 9位会议号 */
  meeting_no: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
  /** 分页尺寸大小 */
  page_size?: number
  /** 分页标记,第一次请求不填,表示从头开始遍历.下次遍历可采用该 page_token获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetVcParticipantQualityListQuery {
  /** 会议开始时间（需要精确到一分钟，unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec） */
  meeting_end_time: string
  /** 9位会议号 */
  meeting_no: string
  /** 参会人入会时间（unix时间，单位sec） */
  join_time: string
  /** 参会人为Lark用户时填入 */
  user_id?: string
  /** 参会人为Rooms时填入 */
  room_id?: string
  /** 分页尺寸大小 */
  page_size?: number
  /** 分页标记,第一次请求不填,表示从头开始遍历.下次遍历可采用该 page_token获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetVcResourceReservationListQuery {
  /** 层级id */
  room_level_id: string
  /** 是否展示会议主题 */
  need_topic?: boolean
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 待筛选的会议室id列表 */
  room_ids: string[]
  /** 若为true表示导出room_ids范围外的会议室，默认为false */
  is_exclude?: boolean
  /** 分页尺寸大小 */
  page_size?: number
  /** 分页标记,第一次请求不填,表示从头开始遍历.下次遍历可采用该 page_token获取查询结果 */
  page_token?: string
}
export interface ListVcAlertQuery {
  /** 开始时间（unix时间，单位sec） */
  start_time: string
  /** 结束时间（unix时间，单位sec） */
  end_time: string
  /** 查询对象类型 */
  query_type?: number
  /** 查询对象ID */
  query_value?: string
  /** 请求期望返回的告警记录数量，不足则返回全部，该值默认为 100，最大为 1000 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateAttendanceShiftRequest {
  /** 班次名称 */
  shift_name: string
  /** 打卡次数 */
  punch_times: number
  /** 排班组子负责人id列表 */
  sub_shift_leader_ids?: string[]
  /** 是否弹性打卡 */
  is_flexible?: boolean
  /** 弹性打卡时间，设置【上班最多可晚到】与【下班最多可早走】时间，如果不设置flexible_rule则生效 */
  flexible_minutes?: number
  /** 弹性打卡时间设置 */
  flexible_rule?: Lark.FlexibleRule[]
  /** 不需要打下班卡 */
  no_need_off?: boolean
  /** 打卡规则 */
  punch_time_rule: Lark.PunchTimeRule[]
  /** 晚走晚到规则 */
  late_off_late_on_rule?: Lark.LateOffLateOnRule[]
  /** 休息规则 */
  rest_time_rule?: Lark.RestRule[]
  /** 打卡规则 */
  overtime_rule?: Lark.OvertimeRule[]
  /** 是否允许在非打卡时段申请打卡 */
  allow_punch_approval?: boolean
}
export interface QueryAttendanceShiftQuery {
  /** 班次名称 */
  shift_name: string
}
export interface ListAttendanceShiftQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateAttendanceGroupRequest {
  /** 6921319402260496386 */
  group: Lark.Group
  /** 操作人uid，如果您未操作[考勤管理后台“API 接入”流程](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines)，则此字段为必填字段 */
  operator_id?: string
}
export interface CreateAttendanceGroupQuery {
  /** 用户 ID 的类型 */
  employee_type: string
  /** 部门 ID 的类型 */
  dept_type: string
}
export interface GetAttendanceGroupQuery {
  /** 用户 ID 的类型 */
  employee_type: string
  /** 部门 ID 的类型 */
  dept_type: string
}
export interface SearchAttendanceGroupRequest {
  /** 考勤组名称 */
  group_name: string
}
export interface ListAttendanceGroupQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface BatchCreateAttendanceUserDailyShiftRequest {
  /** 班表信息列表 */
  user_daily_shifts: Lark.UserDailyShift[]
  /** 操作人uid，如果您未操作[考勤管理后台“API 接入”流程](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines)，则此字段为必填字段 */
  operator_id?: string
}
export interface BatchCreateAttendanceUserDailyShiftQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserDailyShiftRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始工作日 */
  check_date_from: number
  /** 查询的结束工作日 */
  check_date_to: number
}
export interface QueryAttendanceUserDailyShiftQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface UpdateAttendanceUserStatsViewRequest {
  /** 统计设置 */
  view: Lark.UserStatsView
}
export interface UpdateAttendanceUserStatsViewQuery {
  /** 员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserStatsFieldRequest {
  /** 语言类型 */
  locale: string
  /** 统计类型 */
  stats_type: string
  /** 开始时间 */
  start_date: number
  /** 结束时间（时间间隔不超过 40 天） */
  end_date: number
}
export interface QueryAttendanceUserStatsFieldQuery {
  /** 响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserStatsViewRequest {
  /** 语言类型 */
  locale: string
  /** 统计类型 */
  stats_type: string
  /** 查询用户id，同【查询统计数据】、【更新统计设置】user_id */
  user_id?: string
}
export interface QueryAttendanceUserStatsViewQuery {
  /** 响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserStatsDataRequest {
  /** 语言类型 */
  locale: string
  /** 统计类型 */
  stats_type: string
  /** 开始时间 */
  start_date: number
  /** 结束时间
  （时间间隔不超过 40 天） */
  end_date: number
  /** 查询的用户 ID 列表
  （用户数量不超过 200） */
  user_ids?: string[]
  /** 是否需要历史数据 */
  need_history?: boolean
  /** 只展示当前考勤组 */
  current_group_only?: boolean
  /** 查询用户id，同【更新统计设置】、【查询统计设置】user_id */
  user_id?: string
}
export interface QueryAttendanceUserStatsDataQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserApprovalRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始工作日 */
  check_date_from: number
  /** 查询的结束工作日，与 check_date_from 的时间间隔不超过 30 天 */
  check_date_to: number
  /** 查询依据的时间类型（不填默认依据PeriodTime） */
  check_date_type?: string
  /** 查询状态（不填默认查询已通过状态） */
  status?: number
  /** 查询的起始时间，精确到秒的时间戳 */
  check_time_from?: string
  /** 查询的结束时间，精确到秒的时间戳 */
  check_time_to?: string
}
export interface QueryAttendanceUserApprovalQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface CreateAttendanceUserApprovalRequest {
  /** 审批信息 */
  user_approval?: Lark.UserApproval
}
export interface CreateAttendanceUserApprovalQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface ProcessAttendanceApprovalInfoRequest {
  /** 审批实例 ID，获取方式：1）[获取审批通过数据](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query) 2）[写入审批结果](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create) 3）[通知补卡审批发起（补卡情况下）](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create) */
  approval_id: string
  /** 审批类型，leave：请假，out：外出，overtime：加班，trip：出差，remedy：补卡 */
  approval_type: string
  /** 审批状态，1：不通过，2：通过，4：撤销 */
  status: number
}
export interface CreateAttendanceUserTaskRemedyRequest {
  /** 用户工号 */
  user_id: string
  /** 补卡日期 */
  remedy_date: number
  /** 第几次上下班，可能值0，1，2 */
  punch_no: number
  /** 上班/下班，1是上班，2是下班 */
  work_type: number
  /** 补卡时间 */
  remedy_time: string
  /** 补卡原因 */
  reason: string
  /** 补卡时间戳，精确到秒的时间戳 */
  time?: string
}
export interface CreateAttendanceUserTaskRemedyQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface QueryUserAllowedRemedysAttendanceUserTaskRemedyRequest {
  /** 用户 ID */
  user_id: string
  /** 补卡日期 */
  remedy_date: number
}
export interface QueryUserAllowedRemedysAttendanceUserTaskRemedyQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserTaskRemedyRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始时间，精确到秒的时间戳 */
  check_time_from: string
  /** 查询的结束时间，精确到秒的时间戳 */
  check_time_to: string
  /** 查询依据的时间类型（不填默认依据PeriodTime） */
  check_date_type?: string
  /** 查询状态（不填默认查询已通过状态） */
  status?: number
}
export interface QueryAttendanceUserTaskRemedyQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface BatchCreateAttendanceUserFlowRequest {
  /** 打卡流水记录列表 */
  flow_records: Lark.UserFlow[]
}
export interface BatchCreateAttendanceUserFlowQuery {
  /** 请求体和响应体中的 user_id 和 creator_id 的员工工号类型 */
  employee_type: string
}
export interface GetAttendanceUserFlowQuery {
  /** 响应体中的 user_id 和 creator_id 的员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserFlowRequest {
  /** employee_no 或 employee_id 列表，长度不超过 50 */
  user_ids: string[]
  /** 查询的起始时间，时间戳 */
  check_time_from: string
  /** 查询的结束时间，时间戳 */
  check_time_to: string
}
export interface QueryAttendanceUserFlowQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: string
  /** 由于新入职用户可以复用已离职用户的employee_no/employee_id。如果true，返回employee_no/employee_id对应的所有在职+离职用户数据；如果false，只返回employee_no/employee_id对应的在职或最近一个离职用户数据 */
  include_terminated_user?: boolean
}
export interface QueryAttendanceUserTaskRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始工作日 */
  check_date_from: number
  /** 查询的结束工作日 */
  check_date_to: number
  /** 是否需要加班班段打卡结果 */
  need_overtime_result?: boolean
}
export interface QueryAttendanceUserTaskQuery {
  /** 员工工号类型 */
  employee_type: string
  /** 是否忽略无效和没有权限的用户。如果 true，则返回有效用户的信息，并告知无效和没有权限的用户信息；如果 false，且 user_ids 中存在无效或没有权限的用户，则返回错误 */
  ignore_invalid_users?: boolean
  /** 由于新入职员工可以复用已离职员工的 employee_no/employee_id，如果 true，则返回 employee_no/employee_id 对应的所有在职 + 离职员工的数据；如果 false，则只返回 employee_no/employee_id 对应的在职或最近一个离职员工的数据 */
  include_terminated_user?: boolean
}
export interface ModifyAttendanceUserSettingRequest {
  /** 用户设置 */
  user_setting?: Lark.UserSetting
}
export interface ModifyAttendanceUserSettingQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface QueryAttendanceUserSettingRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
}
export interface QueryAttendanceUserSettingQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: string
}
export interface UploadAttendanceFileQuery {
  /** 带后缀的文件名 */
  file_name: string
}
export interface GetAttendanceLeaveEmployExpireRecordRequest {
  /** 员工ID */
  employment_id: string
  /** 假期类型ID */
  leave_type_id: string
  /** 失效最早日期  2023-04-10 格式 */
  start_expiration_date: string
  /** 失效最晚日期 2023-05-10 格式 */
  end_expiration_date: string
  /** 时间偏移，东八区：480    8*60， 如果没有这个参数，默认东八区 */
  time_offset?: number
}
export interface GetAttendanceLeaveEmployExpireRecordQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface PatchAttendanceLeaveAccrualRecordRequest {
  /** 授予记录的唯一ID */
  leave_granting_record_id: string
  /** 员工ID */
  employment_id: string
  /** 假期类型ID */
  leave_type_id: string
  /** 修改授予记录原因 */
  reason: Lark.LangText[]
  /** 时间偏移，东八区：480    8*60 */
  time_offset?: number
  /** 失效日期，格式"2020-01-01" */
  expiration_date?: string
  /** 修改source 余额 */
  quantity?: string
}
export interface PatchAttendanceLeaveAccrualRecordQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface CreateApprovalRequest {
  /** 审批名称的国际化文案 Key，以 @i18n@ 开头，长度不得少于 9 个字符 */
  approval_name: string
  /** 传空表示新建 */
  approval_code?: string
  /** 审批描述的国际化文案 Key，以 @i18n@ 开头，长度不得少于 9 个字符 */
  description?: string
  /** viewers 字段指定了哪些人能从审批应用的前台发起该审批。  当 view_type 为 USER，需要填写viewer_user_id；  当       view_type 为DEPARTMENT，需要填写viewer_department_id；  当 view_type 为TENANT或NONE时，viewer_user_id和viewer_department_id无需填写 */
  viewers: Lark.ApprovalCreateViewers[]
  /** 审批定义表单内容，json 数组 */
  form: Lark.ApprovalForm
  /** 审批定义节点，需要将开始节点作为 list 第一个元素，结束节点作为最后一个元素 */
  node_list: Lark.ApprovalNode[]
  /** 审批定义其他设置 */
  settings?: Lark.ApprovalSetting
  /** 审批定义配置项，用于配置对应审批定义是否可以由用户在审批后台进行修改 */
  config?: Lark.ApprovalConfig
  /** 审批图标枚举，详见下方说明，默认为 0 */
  icon?: number
  /** 国际化文案 */
  i18n_resources: Lark.I18nResource[]
  /** 流程负责人 */
  process_manager_ids?: string[]
}
export interface CreateApprovalQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateApprovalInstanceRequest {
  /** 审批定义 code */
  approval_code: string
  /** 发起审批用户 */
  user_id?: string
  /** 发起审批用户 open id, 如果传了 user_id 则优先使用 user_id */
  open_id?: string
  /** 发起审批用户部门id，如果用户只属于一个部门，可以不填。如果属于多个部门，默认会选择部门列表第一个部门 */
  department_id?: string
  /** json 数组，控件值 */
  form: string
  /** 如果有发起人自选节点，则需要填写对应节点的审批人 */
  node_approver_user_id_list?: Lark.NodeApprover[]
  /** 审批人发起人自选 open id，与上述node_approver_user_id_list字段取并集 */
  node_approver_open_id_list?: Lark.NodeApprover[]
  /** 如果有发起人自选节点，则可填写对应节点的抄送人，单个节点最多选择20位抄送人 */
  node_cc_user_id_list?: Lark.NodeCc[]
  /** 抄送人发起人自选 open id 单个节点最多选择20位抄送人 */
  node_cc_open_id_list?: Lark.NodeCc[]
  /** 审批实例 uuid，用于幂等操作, 每个租户下面的唯一key，同一个 uuid 只能用于创建一个审批实例，如果冲突，返回错误码 60012 ，格式建议为 XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX，不区分大小写 */
  uuid?: string
  /** 可配置是否可以再次提交 */
  allow_resubmit?: boolean
  /** 可配置是否可以重新提交 */
  allow_submit_again?: boolean
  /** 配置bot是否取消通知结果 */
  cancel_bot_notification?: string
  /** 配置是否可以禁止撤销 */
  forbid_revoke?: boolean
  /** 国际化文案 */
  i18n_resources?: Lark.I18nResource[]
  /** 审批展示名称，如果填写了该字段，则审批列表中的审批名称使用该字段，如果不填该字段，则审批名称使用审批定义的名称 */
  title?: string
  /** 详情页title展示模式 */
  title_display_method?: number
}
export interface CancelApprovalInstanceRequest {
  /** 审批定义Code */
  approval_code: string
  /** 审批实例Code */
  instance_code: string
  /** 操作用户, 根据user_id_type填写 */
  user_id: string
}
export interface CancelApprovalInstanceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CcApprovalInstanceRequest {
  /** 审批定义 code */
  approval_code: string
  /** 审批实例 code */
  instance_code: string
  /** 根据user_id_type填写发起抄送的人的用户id */
  user_id: string
  /** 根据user_id_type填写被抄送人的 用户id 列表 */
  cc_user_ids: string[]
  /** 抄送留言 */
  comment?: string
}
export interface CcApprovalInstanceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PreviewApprovalInstanceRequest {
  /** 用户id */
  user_id: string
  /** 审批定义code */
  approval_code?: string
  /** 部门id */
  department_id?: string
  /** 表单数据 */
  form?: string
  /** 审批实例code */
  instance_code?: string
  /** 语言类型 */
  locale?: string
  /** 任务id */
  task_id?: string
}
export interface PreviewApprovalInstanceQuery {
  /** open_id(ou_开头)，union_id(on_开头)，user_id(字符串)。user_id_type不填默认为open_id */
  user_id_type?: string
}
export interface GetApprovalInstanceQuery {
  /** 语言 */
  locale?: string
  /** 发起审批用户id，仅自建应用可返回 */
  user_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListApprovalInstanceQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 审批定义唯一标识 */
  approval_code: string
  /** 审批实例创建时间区间（毫秒） */
  start_time: string
  /** 审批实例创建时间区间（毫秒） */
  end_time: string
}
export interface ApproveApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
  /** json 数组，控件值 */
  form?: string
}
export interface ApproveApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface RejectApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
  /** json 数组，控件值 */
  form?: string
}
export interface RejectApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface TransferApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 根据user_id_type填写被转交人唯一 ID */
  transfer_user_id: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
}
export interface TransferApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface SpecifiedRollbackApprovalInstanceRequest {
  /** 用户ID */
  user_id: string
  /** 回退的任务ID */
  task_id: string
  /** 退回原因 */
  reason?: string
  /** 扩展字段 */
  extra?: string
  /** 退回到节点列表 */
  task_def_key_list: string[]
}
export interface SpecifiedRollbackApprovalInstanceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface AddSignApprovalInstanceRequest {
  /** 操作用户id */
  user_id: string
  /** 审批定义code */
  approval_code: string
  /** 审批实例code */
  instance_code: string
  /** 任务id */
  task_id: string
  /** 意见 */
  comment?: string
  /** 被加签人id */
  add_sign_user_ids: string[]
  /** 1/2/3分别代表前加签/后加签/并加签 */
  add_sign_type: number
  /** 仅在前加签、后加签时需要填写，1/2 分别代表或签/会签 */
  approval_method?: number
}
export interface ResubmitApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
  /** json 数组，控件值 */
  form: string
}
export interface ResubmitApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateApprovalInstanceCommentRequest {
  /** 评论内容，包含艾特人、附件等 */
  content?: string
  /** 评论中艾特人信息 */
  at_info_list?: Lark.CommentAtInfo[]
  /** 父评论ID，如果是回复评论，需要传 */
  parent_comment_id?: string
  /** 评论ID，如果是编辑、删除一条评论，需要传 */
  comment_id?: string
  /** disable_bot=true只同步数据，不触发bot */
  disable_bot?: boolean
  /** 附加字段 */
  extra?: string
}
export interface CreateApprovalInstanceCommentQuery {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: string
  /** 用户ID */
  user_id: string
}
export interface DeleteApprovalInstanceCommentQuery {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: string
  /** 根据user_id_type填写用户ID */
  user_id: string
}
export interface RemoveApprovalInstanceCommentQuery {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: string
  /** 根据user_id_type填写用户ID */
  user_id?: string
}
export interface ListApprovalInstanceCommentQuery {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: string
  /** 用户ID */
  user_id: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CreateApprovalExternalApprovalRequest {
  /** 审批定义名称，创建审批定义返回的值，表示该实例属于哪个流程；该字段会影响到列表中该实例的标题，标题取自对应定义的 name 字段。 */
  approval_name: string
  /** 审批定义 code，用户自定义，定义的唯一标识，如果不存在该 code，则创建，否则更新 */
  approval_code: string
  /** 审批定义所属审批分组，用户自定义； 如果group_code当前不存在，则会新建审批分组； 如果group_code已经存在，则会使用group_name更新审批分组名称 */
  group_code: string
  /** 分组名称，值的格式是 i18n key，文案放在 i18n_resource； 如果是 group_code 当前不存在，则该 group_name 必填，否则，如果填写了则会更新分组名称，不填则不更新分组名称； 审批发起页 审批定义的分组名称来自该字段 */
  group_name?: string
  /** 审批定义的说明，值的格式是 i18n key，文案放在 i18n_resource； 审批发起页 审批定义的说明内容来自该字段 */
  description?: string
  /** 三方审批相关 */
  external: Lark.ApprovalCreateExternal
  /** 可见人列表，可通知配置多个可见人，只有在配置的范围内用户可以在审批发起也看到该审批，默认不传，则是任何人不可见 */
  viewers?: Lark.ApprovalCreateViewers[]
  /** 国际化文案 */
  i18n_resources?: Lark.I18nResource[]
  /** 根据user_id_type填写流程管理员id */
  managers?: string[]
}
export interface CreateApprovalExternalApprovalQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetApprovalExternalApprovalQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateApprovalExternalInstanceRequest {
  /** 审批定义 code， 创建审批定义返回的值，表示该实例属于哪个流程；该字段会影响到列表中该实例的标题，标题取自对应定义的 name 字段 */
  approval_code: string
  /** 审批实例状态 */
  status: string
  /** 审批实例扩展 JSON */
  extra?: string
  /** 审批实例唯一标识，用户自定义，需确保证租户、应用下唯一 */
  instance_id: string
  /** 审批实例链接集合 ，用于【已发起】列表的跳转，跳转回三方系统； pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
  links: Lark.ExternalInstanceLink
  /** 审批展示名称，如果填写了该字段，则审批列表中的审批名称使用该字段，如果不填该字段，则审批名称使用审批定义的名称 */
  title?: string
  /** 用户提交审批时填写的表单数据，用于所有审批列表中展示。可传多个值，但审批中心pc展示前2个,移动端展示前3个,长度不超过2048字符 */
  form?: Lark.ExternalInstanceForm[]
  /** 审批发起人 user_id，发起人可在【已发起】列表中看到所有已发起的审批; 在【待审批】，【已审批】【抄送我】列表中，该字段展示审批是谁发起的。审批发起人 open id，和 user id 二选一。 */
  user_id?: string
  /** 审批发起人 用户名，如果发起人不是真实的用户（例如是某个部门），没有 user_id，则可以使用该字段传名称 */
  user_name?: string
  /** 审批发起人 open id，和 user id 二选一 */
  open_id?: string
  /** 发起人部门，用于列表中展示发起人所属部门。不传则不展示。如果用户没加入任何部门，传 ""，将展示租户名称传 department_name 展示部门名称 */
  department_id?: string
  /** 审批发起人 部门，如果发起人不是真实的用户（例如是某个部门），没有 department_id，则可以使用该字段传名称 */
  department_name?: string
  /** 审批发起时间，Unix毫秒时间戳 */
  start_time: string
  /** 审批实例结束时间：未结束的审批为 0，Unix毫秒时间戳 */
  end_time: string
  /** 审批实例最近更新时间；用于推送数据版本控制如果 update_mode 值为 UPDATE，则只有传过来的 update_time 有变化时（变大），才会更新审批中心中的审批实例信息。使用该字段主要用来避免并发时老的数据更新了新的数据 */
  update_time: string
  /** 列表页打开审批实例的方式 */
  display_method?: string
  /** 更新方式， 当 update_mode=REPLACE时，每次都以当前推送的数据为最终数据，会删掉审批中心中多余的任务、抄送数据（不在这次推送的数据中）; 当 update_mode=UPDATE时，则不会删除审批中心的数据，而只是进行新增和更新实例、任务数据 */
  update_mode?: string
  /** 任务列表 */
  task_list?: Lark.ExternalInstanceTaskNode[]
  /** 抄送列表 */
  cc_list?: Lark.CcNode[]
  /** 国际化文案 */
  i18n_resources: Lark.I18nResource[]
  /** 单据托管认证token，托管回调会附带此token，帮助业务方认证 */
  trusteeship_url_token?: string
  /** 用户的类型，会影响请求参数用户标识域的选择，包括加签操作回传的目标用户， 目前仅支持 "user_id" */
  trusteeship_user_id_type?: string
  /** 单据托管回调接入方的接口的URL地址 */
  trusteeship_urls?: Lark.TrusteeshipUrls
  /** 托管预缓存策略 */
  trusteeship_cache_config?: Lark.TrusteeshipInstanceCacheConfig
}
export interface CheckApprovalExternalInstanceRequest {
  /** 校验的实例信息 */
  instances: Lark.ExteranlInstanceCheck[]
}
export interface ListApprovalExternalTaskRequest {
  /** 审批定义 Code，用于指定只获取这些定义下的数据 */
  approval_codes?: string[]
  /** 审批实例 ID, 用于指定只获取这些实例下的数据，最多支持 20 个 */
  instance_ids?: string[]
  /** 审批人 user_id，用于指定只获取这些用户的数据 */
  user_ids?: string[]
  /** 审批任务状态，用于指定获取该状态下的数据 */
  status?: string
}
export interface ListApprovalExternalTaskQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface QueryApprovalInstanceRequest {
  /** 根据x_user_type填写用户 id */
  user_id?: string
  /** 审批定义 code */
  approval_code?: string
  /** 审批实例 code */
  instance_code?: string
  /** 审批实例第三方 id 注：和 approval_code 取并集 */
  instance_external_id?: string
  /** 审批定义分组第三方 id 注：和 instance_code 取并集 */
  group_external_id?: string
  /** 审批实例标题（只有第三方审批有） */
  instance_title?: string
  /** 审批实例状态，注：若不在集合中，报错 */
  instance_status?: string
  /** 实例查询开始时间（unix毫秒时间戳） */
  instance_start_time_from?: string
  /** 实例查询结束时间 (unix毫秒时间戳) */
  instance_start_time_to?: string
  /** 地区 */
  locale?: string
}
export interface QueryApprovalInstanceQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface SearchCcApprovalInstanceRequest {
  /** 根据x_user_type填写用户 id */
  user_id?: string
  /** 审批定义 code */
  approval_code?: string
  /** 审批实例 code */
  instance_code?: string
  /** 审批实例第三方 id 注：和 approval_code 取并集 */
  instance_external_id?: string
  /** 审批定义分组第三方 id 注：和 instance_code 取并集 */
  group_external_id?: string
  /** 审批实例标题（只有第三方审批有） */
  cc_title?: string
  /** 审批抄送状态，注：若不在集合中，报错 */
  read_status?: string
  /** 实例查询开始时间（unix毫秒时间戳） */
  cc_create_time_from?: string
  /** 实例查询结束时间 (unix毫秒时间戳) */
  cc_create_time_to?: string
  /** 地区 */
  locale?: string
}
export interface SearchCcApprovalInstanceQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface SearchApprovalTaskRequest {
  /** 根据x_user_type填写用户 id */
  user_id?: string
  /** 审批定义 code */
  approval_code?: string
  /** 审批实例 code */
  instance_code?: string
  /** 审批实例第三方 id 注：和 approval_code 取并集 */
  instance_external_id?: string
  /** 审批定义分组第三方 id 注：和 instance_code 取并集 */
  group_external_id?: string
  /** 审批任务标题（只有第三方审批有） */
  task_title?: string
  /** 审批任务状态，注：若不设置，查询全部状态 若不在集合中，报错 */
  task_status?: string
  /** 任务查询开始时间（unix毫秒时间戳） */
  task_start_time_from?: string
  /** 任务查询结束时间 (unix毫秒时间戳) */
  task_start_time_to?: string
  /** 地区 */
  locale?: string
  /** 可选择task_status中的多个状态，当填写此参数时，task_status失效 */
  task_status_list?: string[]
  /** 按时间排序 */
  order?: number
}
export interface SearchApprovalTaskQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface QueryApprovalTaskQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 需要查询的 User ID */
  user_id: string
  /** 需要查询的任务分组主题，如「待办」、「已办」等 */
  topic: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchHelpdeskAgentRequest {
  /** agent status */
  status?: number
}
export interface CreateHelpdeskAgentScheduleRequest {
  /** 新客服日程 */
  agent_schedules?: Lark.AgentScheduleUpdateInfo[]
}
export interface PatchHelpdeskAgentSchedulesRequest {
  /** 工作日程列表 */
  agent_schedule?: Lark.AgentScheduleUpdateInfo
}
export interface ListHelpdeskAgentScheduleQuery {
  /** 筛选条件, 1 - online客服, 2 - offline(手动)客服, 3 - off duty(下班)客服, 4 - 移除客服 */
  status: number[]
}
export interface CreateHelpdeskAgentSkillRequest {
  /** 技能名 */
  name?: string
  /** 技能rules */
  rules?: Lark.AgentSkillRule[]
  /** 客服 ids */
  agent_ids?: string[]
}
export interface PatchHelpdeskAgentSkillRequest {
  /** 更新技能 */
  agent_skill?: Lark.AgentSkill
}
export interface StartServiceHelpdeskTicketRequest {
  /** 是否直接进入人工(若appointed_agents填写了，该值为必填) */
  human_service?: boolean
  /** 客服 open ids (获取方式参考[获取单个用户信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get))，human_service需要为true */
  appointed_agents?: string[]
  /** 用户 open id,(获取方式参考[获取单个用户信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get)) */
  open_id: string
  /** 工单来源自定义信息，长度限制1024字符，如设置，[获取工单详情](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/get)会返回此信息 */
  customized_info?: string
}
export interface UpdateHelpdeskTicketRequest {
  /** new status, 1: 已创建, 2: 处理中, 3: 排队中, 5: 待定, 50: 机器人关闭工单, 51: 关闭工单 */
  status?: number
  /** 新标签名 */
  tag_names?: string[]
  /** 新评论 */
  comment?: string
  /** 自定义字段 */
  customized_fields?: Lark.CustomizedFieldDisplayItem[]
  /** ticket stage */
  ticket_type?: number
  /** 工单是否解决，1: 未解决, 2: 已解决 */
  solved?: number
  /** 工单来源渠道ID */
  channel?: number
}
export interface ListHelpdeskTicketQuery {
  /** 搜索条件：工单ID */
  ticket_id?: string
  /** 搜索条件: 客服id */
  agent_id?: string
  /** 搜索条件: 关单客服id */
  closed_by_id?: string
  /** 搜索条件: 工单类型 1:bot 2:人工 */
  type?: number
  /** 搜索条件: 工单渠道 */
  channel?: number
  /** 搜索条件: 工单是否解决 1:没解决 2:已解决 */
  solved?: number
  /** 搜索条件: 工单评分 */
  score?: number
  /** 搜索条件: 工单状态列表 */
  status_list?: number[]
  /** 搜索条件: 用户名称 */
  guest_name?: string
  /** 搜索条件: 用户id */
  guest_id?: string
  /** 搜索条件: 用户标签列表 */
  tags?: string[]
  /** 页数, 从1开始, 默认为1 */
  page?: number
  /** 当前页大小，最大为200， 默认为20。分页查询最多累计返回一万条数据，超过一万条请更改查询条件，推荐通过时间查询。 */
  page_size?: number
  /** 搜索条件: 工单创建起始时间 ms (也需要填上create_time_end)，相当于>=create_time_start */
  create_time_start?: number
  /** 搜索条件: 工单创建结束时间 ms (也需要填上create_time_start)，相当于<=create_time_end */
  create_time_end?: number
  /** 搜索条件: 工单修改起始时间 ms (也需要填上update_time_end) */
  update_time_start?: number
  /** 搜索条件: 工单修改结束时间 ms(也需要填上update_time_start) */
  update_time_end?: number
}
export interface TicketImageHelpdeskTicketQuery {
  /** 工单ID */
  ticket_id: string
  /** 消息ID

  [查询消息ID](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/list) */
  msg_id: string
  /** index，当消息类型为post时，需指定图片index，index从0开始。当消息类型为img时，无需index */
  index?: number
}
export interface AnswerUserQueryHelpdeskTicketRequest {
  /** 事件ID,可从订阅事件中提取 */
  event_id: string
  /** faq结果列表 */
  faqs?: Lark.UserQueryFaqInfo[]
}
export interface CustomizedFieldsHelpdeskTicketQuery {
  /** visible only */
  visible_only?: boolean
}
export interface CreateHelpdeskTicketMessageRequest {
  /** 消息类型；text：纯文本；post：富文本 */
  msg_type: string
  /** - 纯文本，参考[发送文本消息](/ssl:ttdoc/ukTMukTMukTM/uUjNz4SN2MjL1YzM)中的content；
  - 富文本，参考[发送富文本消息](/ssl:ttdoc/ukTMukTMukTM/uMDMxEjLzATMx4yMwETM)中的content */
  content: string
}
export interface ListHelpdeskTicketMessageQuery {
  /** 起始时间 */
  time_start?: number
  /** 结束时间 */
  time_end?: number
  /** 页数ID */
  page?: number
  /** 消息数量，最大200，默认20 */
  page_size?: number
}
export interface CreateHelpdeskBotMessageRequest {
  /** 消息类型 */
  msg_type: string
  /** 消息内容 */
  content: string
  /** 接收消息用户id */
  receiver_id: string
  /** 接收消息方式，chat(服务台专属服务群)或user(服务台机器人私聊)。若选择专属服务群，用户有正在处理的工单将会发送失败。默认以chat方式发送。 */
  receive_type?: string
}
export interface CreateHelpdeskBotMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateHelpdeskTicketCustomizedFieldRequest {
  /** help desk id */
  helpdesk_id: string
  /** key name */
  key_name: string
  /** display name */
  display_name: string
  /** the position of ticket customized field in the page */
  position: string
  /** type of the field */
  field_type: string
  /** description of the field */
  description: string
  /** if the field is visible */
  visible: boolean
  /** if the field is editable */
  editable: boolean
  /** if the field is required */
  required: boolean
  /** if the dropdown field supports multi-select */
  dropdown_allow_multiple?: boolean
}
export interface PatchHelpdeskTicketCustomizedFieldRequest {
  /** display name */
  display_name?: string
  /** the position of ticket customized field in the page */
  position?: string
  /** description of the field */
  description?: string
  /** if the field is visible */
  visible?: boolean
  /** if the field is required */
  required?: boolean
}
export interface ListHelpdeskTicketCustomizedFieldRequest {
  /** 是否可见 */
  visible?: boolean
}
export interface ListHelpdeskTicketCustomizedFieldQuery {
  page_token?: string
  page_size?: number
}
export interface CreateHelpdeskFaqRequest {
  /** 知识库详情 */
  faq?: Lark.FaqUpdateInfo
}
export interface PatchHelpdeskFaqRequest {
  /** 修改的知识库内容 */
  faq?: Lark.FaqUpdateInfo
}
export interface ListHelpdeskFaqQuery {
  /** 知识库分类ID */
  category_id?: string
  /** 搜索条件: 知识库状态 1:在线 0:删除，可恢复 2：删除，不可恢复 */
  status?: string
  /** 搜索条件: 关键词，匹配问题标题，问题关键字，用户姓名 */
  search?: string
  page_token?: string
  page_size?: number
}
export interface SearchHelpdeskFaqQuery {
  /** 搜索query
  ，query内容如果不是英文，包含中文空格等有两种编码策略：1. url编码 2. base64编码，同时加上base64=true参数 */
  query: string
  /** 是否转换为base64,输入true表示是，不填写表示否，中文需要转换为base64 */
  base64?: string
  page_token?: string
  page_size?: number
}
export interface CreateHelpdeskCategoryRequest {
  /** category name */
  name: string
  /** parent category id, if any */
  parent_id: string
  /** category language */
  language?: string
}
export interface PatchHelpdeskCategoryRequest {
  /** category name */
  name?: string
  /** parent category id, if any */
  parent_id?: string
}
export interface ListHelpdeskCategoryQuery {
  /** 知识库分类语言 */
  lang?: string
  /** 排序键。1: 根据知识库分类更新时间排序 */
  order_by?: number
  /** 顺序。true: 正序；false：反序 */
  asc?: boolean
}
export interface CreateHelpdeskNotificationRequest {
  /** 唯一ID */
  id?: string
  /** 任务名称 */
  job_name?: string
  /** 0(草稿)、1(等待审批)、 2(审批未通过)、3(正在发送中)、4(发送完成)、5(等待设置发送时间)、6(取消发送)、7(新人入职执行发送)、8(等待倒计时发送) */
  status?: number
  /** 创建人 */
  create_user?: Lark.NotificationUser
  /** 创建时间（毫秒时间戳） */
  created_at?: string
  /** 更新用户 */
  update_user?: Lark.NotificationUser
  /** 更新时间（毫秒时间戳） */
  updated_at?: string
  /** 目标推送用户 */
  target_user_count?: number
  /** 已推送用户总数 */
  sent_user_count?: number
  /** 已读用户总数 */
  read_user_count?: number
  /** 推送任务触发时间（毫秒时间戳） */
  send_at?: string
  /** 推送内容，详见：https://open.feishu.cn/tool/cardbuilder?from=howtoguide */
  push_content?: string
  /** 0（定时推送：push_scope不能等于3） 1（新人入职推送：push_scope必须等于1或者3；new_staff_scope_type不能为空） */
  push_type?: number
  /** 推送范围（服务台私信） 0：组织内全部成员（user_list和department_list必须为空） 1：不推送任何成员（user_list和department_list必须为空，chat_list不可为空） 2：推送到部分成员（user_list或department_list不能为空） 3：入职新人 以上四种状态，chat_list都相对独立，只有在推送范围为1时，必须需要设置chat_list */
  push_scope_type?: number
  /** 新人入职范围类型（push_type为1时生效） 0：组织内所有新人 1：组织内特定的部门（new_staff_scope_department_list 字段不能为空） */
  new_staff_scope_type?: number
  /** 新人入职生效部门列表 */
  new_staff_scope_department_list?: Lark.NotificationDepartment[]
  /** push推送到成员列表 */
  user_list?: Lark.NotificationUser[]
  /** push推送到的部门信息列表 */
  department_list?: Lark.NotificationDepartment[]
  /** push推送到的会话列表(群) */
  chat_list?: Lark.NotificationChat[]
  /** 预留扩展字段 */
  ext?: string
}
export interface CreateHelpdeskNotificationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchHelpdeskNotificationRequest {
  /** 唯一ID */
  id?: string
  /** 任务名称 */
  job_name?: string
  /** 0(草稿)、1(等待审批)、 2(审批未通过)、3(正在发送中)、4(发送完成)、5(等待设置发送时间)、6(取消发送)、7(新人入职执行发送)、8(等待倒计时发送) */
  status?: number
  /** 创建人 */
  create_user?: Lark.NotificationUser
  /** 创建时间（毫秒时间戳） */
  created_at?: string
  /** 更新用户 */
  update_user?: Lark.NotificationUser
  /** 更新时间（毫秒时间戳） */
  updated_at?: string
  /** 目标推送用户 */
  target_user_count?: number
  /** 已推送用户总数 */
  sent_user_count?: number
  /** 已读用户总数 */
  read_user_count?: number
  /** 推送任务触发时间（毫秒时间戳） */
  send_at?: string
  /** 推送内容，详见：https://open.feishu.cn/tool/cardbuilder?from=howtoguide */
  push_content?: string
  /** 0（定时推送：push_scope不能等于3） 1（新人入职推送：push_scope必须等于1或者3；new_staff_scope_type不能为空） */
  push_type?: number
  /** 推送范围（服务台私信） 0：组织内全部成员（user_list和department_list必须为空） 1：不推送任何成员（user_list和department_list必须为空，chat_list不可为空） 2：推送到部分成员（user_list或department_list不能为空） 3：入职新人 以上四种状态，chat_list都相对独立，只有在推送范围为1时，必须需要设置chat_list */
  push_scope_type?: number
  /** 新人入职范围类型（push_type为1时生效） 0：组织内所有新人 1：组织内特定的部门（new_staff_scope_department_list 字段不能为空） */
  new_staff_scope_type?: number
  /** 新人入职生效部门列表 */
  new_staff_scope_department_list?: Lark.NotificationDepartment[]
  /** push推送到成员列表 */
  user_list?: Lark.NotificationUser[]
  /** push推送到的部门信息列表 */
  department_list?: Lark.NotificationDepartment[]
  /** push推送到的会话列表(群) */
  chat_list?: Lark.NotificationChat[]
  /** 预留扩展字段 */
  ext?: string
}
export interface PatchHelpdeskNotificationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetHelpdeskNotificationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface SubmitApproveHelpdeskNotificationRequest {
  /** 提交审批理由 */
  reason: string
}
export interface ExecuteSendHelpdeskNotificationRequest {
  /** 发送时间戳(毫秒) */
  send_at: string
}
export interface CancelSendHelpdeskNotificationRequest {
  /** 是否召回已发送的消息,新人入职消息同样适用 */
  is_recall: boolean
}
export interface SubscribeHelpdeskEventRequest {
  /** 可订阅的事件列表 */
  events: Lark.Event[]
}
export interface UnsubscribeHelpdeskEventRequest {
  /** event list to unsubscribe */
  events: Lark.Event[]
}
export interface CreateTaskv1Request {
  /** 任务标题。创建任务时，如果没有标题填充，将其视为无主题的任务。 */
  summary?: string
  /** 任务备注 */
  description?: string
  /** 接入方可以自定义的附属信息二进制格式，采用 base64 编码，解析方式由接入方自己决定 */
  extra?: string
  /** 任务的截止时间设置 */
  due?: Lark.Due
  /** 任务关联的第三方平台来源信息 */
  origin: Lark.Origin
  /** 此字段用于控制该任务在任务中心是否可编辑，默认为false，若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息 */
  can_edit?: boolean
  /** 此字段用于存储第三方需透传到端上的自定义数据，Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip），pc、ios、android三端均可自定义，其中tip字段的key为语言类型，value为提示信息，可自行增加或减少语言类型，支持的各地区语言名：it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip，href和tip同时不为空时只跳转不提示。链接和提示信息可自定义，其余的key需按举例中的结构传递 */
  custom?: string
  /** 创建任务时添加的执行者用户id列表 */
  collaborator_ids?: string[]
  /** 创建任务时添加的关注者用户id列表 */
  follower_ids?: string[]
  /** 重复任务重复规则 */
  repeat_rule?: string
  /** 富文本任务标题。创建任务时，如果没有标题填充，将其视为无主题的任务。 */
  rich_summary?: string
  /** 富文本任务备注 */
  rich_description?: string
}
export interface CreateTaskv1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchTaskv1Request {
  /** 被更新的任务实体基础信息 */
  task: Lark.Task
  /** 指定需要更新的字段（目前可选更新的字段为：summary, description, due, extra），否则服务端将不知道更新哪些字段 */
  update_fields: string[]
}
export interface PatchTaskv1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetTaskv1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListTaskv1Query {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 范围查询任务时，查询的起始时间。不填时默认起始时间为第一个任务的创建时间。 */
  start_create_time?: string
  /** 范围查询任务时，查询的结束时间。不填时默认结束时间为最后一个任务的创建时间。 */
  end_create_time?: string
  /** 可用于查询时过滤任务完成状态。true表示只返回已完成的任务，false表示只返回未完成的任务。不填时表示同时返回两种完成状态的任务。 */
  task_completed?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateTaskv1TaskReminderRequest {
  /** 相对于截止时间的提醒时间（如提前 30 分钟，截止时间后 30 分钟，则为 -30） */
  relative_fire_minute: number
}
export interface ListTaskv1TaskReminderQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateTaskv1TaskCommentRequest {
  /** 评论内容 */
  content?: string
  /** 评论的父ID，创建评论时若不为空则为某条评论的回复，若为空则不是回复 */
  parent_id?: string
  /** 评论创建的时间戳，单位为毫秒，用于展示，创建时不用填写 */
  create_milli_time?: string
  /** 富文本评论内容 */
  rich_content?: string
}
export interface CreateTaskv1TaskCommentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateTaskv1TaskCommentRequest {
  /** 新的评论内容 */
  content?: string
  /** 新的富文本评论内容（优先使用） */
  rich_content?: string
}
export interface UpdateTaskv1TaskCommentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetTaskv1TaskCommentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListTaskv1TaskCommentQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token获取查询结果 */
  page_token?: string
  /** 评论排序标记，可按照评论时间从小到大查询，或者评论时间从大到小查询，不填默认按照从小到大 */
  list_direction?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateTaskv1TaskFollowerRequest {
  /** 任务关注者 ID */
  id?: string
  /** 要添加为关注人的user_id */
  id_list?: string[]
}
export interface CreateTaskv1TaskFollowerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteTaskv1TaskFollowerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteFollowerTaskv1Request {
  /** 要添加为关注人的user_id */
  id_list?: string[]
}
export interface BatchDeleteFollowerTaskv1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListTaskv1TaskFollowerQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateTaskv1TaskCollaboratorRequest {
  /** 任务协作者的 ID */
  id?: string
  /** 协作人的用户ID列表 */
  id_list?: string[]
}
export interface CreateTaskv1TaskCollaboratorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteTaskv1TaskCollaboratorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteCollaboratorTaskv1Request {
  /** 协作人的用户ID列表 */
  id_list?: string[]
}
export interface BatchDeleteCollaboratorTaskv1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListTaskv1TaskCollaboratorQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateTaskv2Request {
  /** 任务标题 */
  summary: string
  /** 任务描述 */
  description?: string
  /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
  due?: Lark.Due
  /** 任务关联的第三方平台来源信息 */
  origin?: Lark.Origin
  /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
  extra?: string
  /** 任务的完成时刻时间戳(ms) */
  completed_at?: string
  /** 任务成员列表 */
  members?: Lark.Member[]
  /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
  repeat_rule?: string
  /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
  custom_complete?: Lark.CustomComplete
  /** 任务所在清单的信息 */
  tasklists?: Lark.TaskInTasklistInfo[]
  /** 幂等token，如果填写则触发幂等行为。 */
  client_token?: string
  /** 任务的开始时间(ms) */
  start?: Lark.Start
  /** 任务提醒 */
  reminders?: Lark.Reminder[]
  /** 任务完成模式, 1 - 会签任务; 2 - 或签任务 */
  mode?: number
  /** 是否是里程碑任务 */
  is_milestone?: boolean
  /** 自定义字段值 */
  custom_fields?: Lark.InputCustomFieldValue[]
}
export interface CreateTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface GetTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface PatchTaskv2Request {
  /** 要更新的任务数据，只需要写明要更新的字段 */
  task?: Lark.InputTask
  /** 要更新的字段名称。支持summary, description, due, start, completed_at, extra, repeat_rule, custom_complete, mode, is_milestone, custom_fields。 */
  update_fields: string[]
}
export interface PatchTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface AddMembersTaskv2Request {
  /** 要添加的members列表 */
  members: Lark.Member[]
  /** 幂等token，如果提供则实现幂等行为 */
  client_token?: string
}
export interface AddMembersTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface RemoveMembersTaskv2Request {
  /** 要移除的member列表 */
  members: Lark.Member[]
}
export interface RemoveMembersTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface ListTaskv2Query {
  /** 每页的任务数量 */
  page_size?: number
  /** 分页标记。第一次请求不填该参数，表示从头开始查询；查询结果若还有更多数据时会同时返回新的 page_token。使用page_token重新调用本接口可以获取下一页数据。 */
  page_token?: string
  /** 是否按任务完成进行过滤。不填写表示不过滤。 */
  completed?: boolean
  /** 查询任务的范围 */
  type?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface AddTasklistTaskv2Request {
  /** 要添加到的清单的全局唯一ID */
  tasklist_guid: string
  /** 要添加到清单的自定义分组全局唯一ID，如不填写表示添加到默认分组 */
  section_guid?: string
}
export interface AddTasklistTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface RemoveTasklistTaskv2Request {
  /** 要移除的清单的全局唯一ID */
  tasklist_guid: string
}
export interface RemoveTasklistTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface AddRemindersTaskv2Request {
  /** 要添加的reminder的列表 */
  reminders: Lark.Reminder[]
}
export interface AddRemindersTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface RemoveRemindersTaskv2Request {
  /** 要移除的reminder的id列表 */
  reminder_ids: string[]
}
export interface RemoveRemindersTaskv2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface AddDependenciesTaskv2Request {
  /** 要添加的依赖 */
  dependencies?: Lark.TaskDependency[]
}
export interface RemoveDependenciesTaskv2Request {
  /** 要移除的依赖 */
  dependencies: Lark.TaskDependency[]
}
export interface CreateTaskv2TaskSubtaskRequest {
  /** 任务标题 */
  summary: string
  /** 任务描述 */
  description?: string
  /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
  due?: Lark.Due
  /** 任务关联的第三方平台来源信息 */
  origin?: Lark.Origin
  /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
  extra?: string
  /** 任务的完成时刻时间戳(ms) */
  completed_at?: string
  /** 任务成员列表 */
  members?: Lark.Member[]
  /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
  repeat_rule?: string
  /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
  custom_complete?: Lark.CustomComplete
  /** 任务所在清单的信息 */
  tasklists?: Lark.TaskInTasklistInfo[]
  /** 幂等token，如果填写则触发幂等行为。 */
  client_token?: string
  /** 任务的开始时间(ms) */
  start?: Lark.Start
  /** 任务提醒 */
  reminders?: Lark.Reminder[]
  /** 任务完成模式, 1 - 会签任务; 2 - 或签任务 */
  mode?: number
  /** 是否是里程碑任务 */
  is_milestone?: boolean
  /** 自定义字段值 */
  custom_fields?: Lark.InputCustomFieldValue[]
}
export interface CreateTaskv2TaskSubtaskQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface ListTaskv2TaskSubtaskQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface CreateTaskv2TasklistRequest {
  /** 清单名称 */
  name: string
  /** 清单的成员列表 */
  members?: Lark.Member[]
}
export interface CreateTaskv2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface GetTaskv2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface PatchTaskv2TasklistRequest {
  /** 要更新清单的数据 */
  tasklist: Lark.InputTasklist
  /** 要更新的字段名，只支持更新"owner", "name"两个字段 */
  update_fields: string[]
  /** 该字段表示如果更新了新的负责人，则将原负责人设为指定的协作人角色。仅在update_fields包含owner字段时生效。根据清单的角色设计方式，不允许提前为清单的负责人添加其他角色，但负责人更新后，原有负责人会无法访问该清单。该字段可以帮助避免原负责人彻底退出清单。 */
  origin_owner_to_role?: string
}
export interface PatchTaskv2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface AddMembersTaskv2TasklistRequest {
  /** 要添加的成员列表 */
  members: Lark.Member[]
}
export interface AddMembersTaskv2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface RemoveMembersTaskv2TasklistRequest {
  /** 要移除的member列表 */
  members: Lark.Member[]
}
export interface RemoveMembersTaskv2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface TasksTaskv2TasklistQuery {
  /** 每页返回的任务数量 */
  page_size?: number
  /** 分页标记。第一次请求不填该参数，表示从头开始查询；查询结果若还有更多数据时会同时返回新的 page_token。使用page_token重新调用本接口可以获取下一页数据。 */
  page_token?: string
  /** 只查看特定完成状态的任务，不填写表示不按完成状态过滤 */
  completed?: boolean
  /** 任务创建的起始时间戳（ms），闭区间，不填写默认为首个任务的创建时间戳 */
  created_from?: string
  /** 任务创建的结束时间戳（ms），闭区间，不填写默认为最后创建任务的创建时间戳 */
  created_to?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface ListTaskv2TasklistQuery {
  /** 每页返回的清单数量 */
  page_size?: number
  /** 分页标记。第一次请求不填该参数，表示从头开始查询；查询结果若还有更多数据时会同时返回新的 page_token。使用page_token重新调用本接口可以获取下一页数据。 */
  page_token?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface CreateTaskv2TasklistActivitySubscriptionRequest {
  /** 订阅名称 */
  name: string
  /** 订阅者列表 */
  subscribers: Lark.Member[]
  /** 订阅的事件key列表 */
  include_keys: number[]
  /** 该订阅是否为停用 */
  disabled?: boolean
}
export interface CreateTaskv2TasklistActivitySubscriptionQuery {
  /** 用户ID类型 */
  user_id_type?: string
}
export interface GetTaskv2TasklistActivitySubscriptionQuery {
  /** 用户ID类型 */
  user_id_type?: string
}
export interface ListTaskv2TasklistActivitySubscriptionQuery {
  /** 返回结果的最大数量 */
  limit?: number
  /** 用户ID类型 */
  user_id_type?: string
}
export interface PatchTaskv2TasklistActivitySubscriptionRequest {
  /** 要更新的订阅数据 */
  activity_subscription: Lark.TasklistActivitySubscription
  /** 要更新的字段 */
  update_fields: string[]
}
export interface PatchTaskv2TasklistActivitySubscriptionQuery {
  /** 用户ID类型 */
  user_id_type?: string
}
export interface CreateTaskv2CommentRequest {
  /** 评论内容 */
  content: string
  /** 回复给评论的id */
  reply_to_comment_id?: string
  /** 评论归属的资源类型 */
  resource_type?: string
  /** 评论归属的资源ID */
  resource_id?: string
}
export interface CreateTaskv2CommentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface GetTaskv2CommentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface PatchTaskv2CommentRequest {
  /** 要更新的评论数据，支持更新content, md_content */
  comment: Lark.InputComment
  /** 要更新的字段 */
  update_fields: string[]
}
export interface PatchTaskv2CommentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface ListTaskv2CommentQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 要获取评论列表的资源类型 */
  resource_type?: string
  /** 要获取评论的资源ID。例如要获取任务的评论列表，此处应该填写任务全局唯一ID */
  resource_id: string
  /** 返回数据的排序方式 */
  direction?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface UploadTaskv2AttachmentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface ListTaskv2AttachmentQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 附件归属的资源类型 */
  resource_type?: string
  /** 附件归属资源的id，配合resource_type使用。例如希望获取任务的附件，需要设置 resource_type为task， resource_id为任务的全局唯一ID */
  resource_id: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface GetTaskv2AttachmentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface CreateTaskv2SectionRequest {
  /** 自定义分组名称 */
  name: string
  /** 自定义分组归属的资源类型，支持"tasklist"或者"my_tasks" */
  resource_type: string
  /** 自定义分组要归属的资源id */
  resource_id?: string
  /** 要将新分组插入到自定义分分组的前面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
  insert_before?: string
  /** 要将新分组插入到自定义分分组的后面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
  insert_after?: string
}
export interface CreateTaskv2SectionQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface GetTaskv2SectionQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface PatchTaskv2SectionRequest {
  /** 要更新的自定义分组的数据，仅支持name, insert_after, insert_before */
  section: Lark.InputSection
  /** 要更新的字段名 */
  update_fields: string[]
}
export interface PatchTaskv2SectionQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface ListTaskv2SectionQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 自定义分组所属的资源类型。支持"my_tasks"(我负责的）和"tasklist"（清单）。当使用"tasklist"时，需要用resource_id提供清单GUID。 */
  resource_type: string
  /** 如`resource_type`为"tasklist"，这里需要填写要列取自定义分组的清单的GUID。 */
  resource_id?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface TasksTaskv2SectionQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记 */
  page_token?: string
  /** 按照任务状态过滤，如果不填写则表示不按完成状态过滤 */
  completed?: boolean
  /** 按照创建时间筛选的起始时间戳（ms)，如不填写则为首个任务的创建时刻 */
  created_from?: string
  /** 按照创建时间筛选的起始时间戳（ms)，如不填写则为最后任务的创建时刻 */
  created_to?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface CreateTaskv2CustomFieldRequest {
  /** 自定义字段要归属的资源类型，支持"tasklist" */
  resource_type: string
  /** 自定义字段要归属的资源ID，可以填写清单的tasklist_guid */
  resource_id: string
  /** 字段名称 */
  name: string
  /** 自定义字段类型，支持"number", "datetime", "member", "single_select", "multi_select" */
  type: string
  /** 数字类型的字段设置 */
  number_setting?: Lark.NumberSetting
  /** 人员类型的字段设置 */
  member_setting?: Lark.MemberSetting
  /** 时间日期类型的字段设置 */
  datetime_setting?: Lark.DatetimeSetting
  /** 单选设置 */
  single_select_setting?: Lark.SelectSetting
  /** 多选设置 */
  multi_select_setting?: Lark.SelectSetting
  /** 文本类型 */
  text_setting?: Lark.TextSetting
}
export interface CreateTaskv2CustomFieldQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface GetTaskv2CustomFieldQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}
export interface PatchTaskv2CustomFieldRequest {
  /** 要修改的自定义字段数据 */
  custom_field?: Lark.InputCustomField
  /** 要修改的自定义字段类型，支持name, member_setting, number_setting, datetime_setting, single_select_setting, multi_select_setting */
  update_fields?: string[]
}
export interface PatchTaskv2CustomFieldQuery {
  /** 用户ID格式 */
  user_id_type?: string
}
export interface ListTaskv2CustomFieldQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户ID格式，支持open_id, user_id, union_id */
  user_id_type?: string
  /** 资源类型，如提供表示仅查询特定资源下的自定义字段。目前只支持tasklist。 */
  resource_type?: string
  /** 要查询自定义字段的归属resource_id */
  resource_id?: string
}
export interface AddTaskv2CustomFieldRequest {
  /** 要将自定义字段添加到一个资源的资源类型。目前只支持tasklist */
  resource_type: string
  /** 要将自定义字段添加到的资源id，目前只支持tasklist_guid */
  resource_id: string
}
export interface RemoveTaskv2CustomFieldRequest {
  /** 要从某个资源移除自定义字段的资源类型，目前只支持清单"tasklist"。 */
  resource_type: string
  /** 要从某个资源移除自定义字段的资源id，`resource_type`为"tasklist"时，需填写清单的GUID */
  resource_id: string
}
export interface CreateTaskv2CustomFieldOptionRequest {
  /** 选项名 */
  name: string
  /** 颜色索引值，支持0～54中的一个数字。如果不填写，则会随机选一个。 */
  color_index?: number
  /** 要放到某个option之前的option_guid */
  insert_before?: string
  /** 要放到某个option之后的option_guid */
  insert_after?: string
  /** 是否隐藏 */
  is_hidden?: boolean
}
export interface PatchTaskv2CustomFieldOptionRequest {
  /** 要更新的option数据 */
  option?: Lark.InputOption
  /** 要更新的字段名，支持name,color,is_hidden,insert_before,insert_after */
  update_fields?: string[]
}
export interface CreateMailMailgroupRequest {
  /** The mail group's email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** Who can send mail to this mail group. Possible values are:
  - ANYONE: Any Internet user can send mail to this mail group
  - ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group
  - ALL_GROUP_MEMBERS: Any group member can send mail to this mail group
  - CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: string
}
export interface PatchMailMailgroupRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** Who can send mail to this mail group. Possible values are:
  - ANYONE: Any Internet user can send mail to this mail group
  - ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group
  - ALL_GROUP_MEMBERS: Any group member can send mail to this mail group
  - CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: string
}
export interface UpdateMailMailgroupRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The mail group's display name */
  name?: string
  /** The mail group's description */
  description?: string
  /** Who can send mail to this mail group. Possible values are:
  - ANYONE: Any Internet user can send mail to this mail group
  - ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group
  - ALL_GROUP_MEMBERS: Any group member can send mail to this mail group
  - CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: string
}
export interface ListMailMailgroupQuery {
  /** 邮件组管理员用户ID，用于获取该用户有管理权限的邮件组 */
  manager_user_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface BatchCreateMailMailgroupManagerRequest {
  /** 邮件组管理员列表 */
  mailgroup_manager_list?: Lark.MailgroupManager[]
}
export interface BatchCreateMailMailgroupManagerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteMailMailgroupManagerRequest {
  /** 邮件组管理员列表 */
  mailgroup_manager_list?: Lark.MailgroupManager[]
}
export interface BatchDeleteMailMailgroupManagerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListMailMailgroupManagerQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateMailMailgroupMemberRequest {
  /** The member's email address. Value is valid when type is one of USER/EXTERNAL_USER/MAIL_GROUP/PUBLIC_MAILBOX/OTHER_MEMBER */
  email?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The type of member. Possible values are:
  - USER: internal user in the team
  - DEPARTMENT: member is a department
  - COMPANY: member is the company
  - EXTERNAL_USER: internet user outside the organization
  - MAIL_GROUP: member is another mail group
  - PUBLIC_MAILBOX: member is a public mailbox
  - OTHER_MEMBER: other internal member */
  type?: string
}
export interface CreateMailMailgroupMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface GetMailMailgroupMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface ListMailMailgroupMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface BatchCreateMailMailgroupMemberRequest {
  /** 本次添加的邮件组成员列表 */
  items?: Lark.MailgroupMember[]
}
export interface BatchCreateMailMailgroupMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface BatchDeleteMailMailgroupMemberRequest {
  /** 本次调用删除的成员ID列表 */
  member_id_list?: string[]
}
export interface CreateMailMailgroupAliasRequest {
  /** 邮箱别名 */
  email_alias?: string
}
export interface CreateMailMailgroupPermissionMemberRequest {
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The member's email address. Value is valid when type is MAIL_GROUP/PUBLIC_MAILBOX */
  email?: string
  /** The type of member. Possible values are:
  - USER: internal user in the team
  - DEPARTMENT: member is a department */
  type?: string
}
export interface CreateMailMailgroupPermissionMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface GetMailMailgroupPermissionMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface ListMailMailgroupPermissionMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface BatchCreateMailMailgroupPermissionMemberRequest {
  /** 本次添加的邮件组权限成员列表 */
  items?: Lark.MailgroupPermissionMember[]
}
export interface BatchCreateMailMailgroupPermissionMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface BatchDeleteMailMailgroupPermissionMemberRequest {
  /** 本次调用删除的权限成员ID列表 */
  permission_member_id_list: string[]
}
export interface CreateMailPublicMailboxRequest {
  /** The public mailbox's email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
}
export interface PatchMailPublicMailboxRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
}
export interface UpdateMailPublicMailboxRequest {
  /** The public mailbox's new primary email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
}
export interface ListMailPublicMailboxQuery {
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface CreateMailPublicMailboxMemberRequest {
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The type of member. Possible values are:
  - USER: internal user in the team */
  type?: string
}
export interface CreateMailPublicMailboxMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetMailPublicMailboxMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListMailPublicMailboxMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface BatchCreateMailPublicMailboxMemberRequest {
  /** 本次调用添加的公共邮箱成员列表 */
  items: Lark.PublicMailboxMember[]
}
export interface BatchCreateMailPublicMailboxMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BatchDeleteMailPublicMailboxMemberRequest {
  /** 本次调用删除的公共邮箱成员ID列表 */
  member_id_list: string[]
}
export interface CreateMailPublicMailboxAliasRequest {
  /** 邮箱别名 */
  email_alias?: string
}
export interface DeleteMailUserMailboxQuery {
  /** 用于接受转移的邮箱地址 */
  transfer_mailbox?: string
}
export interface CreateMailUserMailboxAliasRequest {
  /** 邮箱别名 */
  email_alias?: string
}
export interface ListMailUserMailboxAliasQuery {
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface QueryMailUserRequest {
  /** 需要查询的邮箱地址列表 */
  email_list: string[]
}
export interface GetApplicationQuery {
  /** 指定获取应用在该语言下的信息 */
  lang: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetApplicationApplicationAppVersionQuery {
  /** 应用信息的语言版本 */
  lang: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListApplicationApplicationAppVersionQuery {
  /** 应用信息的语言版本 */
  lang: string
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 0：按照时间倒序 1：按照时间正序 */
  order?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ContactsRangeSuggestApplicationApplicationAppVersionQuery {
  /** 返回值的部门ID的类型 */
  department_id_type?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UnderauditlistApplicationQuery {
  /** 指定返回的语言 */
  lang: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchApplicationApplicationAppVersionRequest {
  /** 版本状态 */
  status?: number
}
export interface PatchApplicationApplicationAppVersionQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: string
  /** 操作者的 open_id */
  operator_id: string
  /** 当修改版本状态为被驳回时，这一项必填 */
  reject_reason?: string
}
export interface PatchApplicationRequest {
  /** 应用分类的国际化描述 */
  common_categories?: string[]
}
export interface PatchApplicationQuery {
  /** 指定返回的语言 */
  lang: string
}
export interface ContactsRangeConfigurationApplicationQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 返回值的部门ID的类型 */
  department_id_type?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchApplicationApplicationContactsRangeRequest {
  /** 更新范围方式 */
  contacts_range_type: string
  /** 可见范围新增列表 */
  add_visible_list?: Lark.AppContactsRangeIdList
  /** 删除可用名单 */
  del_visible_list?: Lark.AppContactsRangeIdList
}
export interface PatchApplicationApplicationContactsRangeQuery {
  /** 成员id类型 */
  user_id_type?: string
  /** 部门id 类型 */
  department_id_type?: string
}
export interface CheckWhiteBlackListApplicationApplicationVisibilityRequest {
  /** 用户ID列表 */
  user_ids?: string[]
  /** 部门ID列表 */
  department_ids?: string[]
  /** 用户组ID列表 */
  group_ids?: string[]
}
export interface CheckWhiteBlackListApplicationApplicationVisibilityQuery {
  /** 此次请求传参中的user_id的类型 */
  user_id_type?: string
  /** 此次请求传参中的department_id的类型 */
  department_id_type?: string
}
export interface PatchApplicationApplicationVisibilityRequest {
  /** 添加可用人员名单 */
  add_visible_list?: Lark.AppVisibilityIdList
  /** 删除可用人员名单 */
  del_visible_list?: Lark.AppVisibilityIdList
  /** 添加禁用人员名单 */
  add_invisible_list?: Lark.AppVisibilityIdList
  /** 删除禁用人员名单 */
  del_invisible_list?: Lark.AppVisibilityIdList
  /** 是否全员可见,false:否;true:是;不填:继续当前状态不改变.如果可见范围为全员后添加的可用人员则无效,禁用人员仍然有效 */
  is_visible_to_all?: boolean
}
export interface PatchApplicationApplicationVisibilityQuery {
  /** 部门id 类型 */
  department_id_type?: string
  /** open_id 类型 */
  user_id_type?: string
}
export interface UpdateApplicationApplicationManagementRequest {
  /** 启用/停用应用 */
  enable?: boolean
}
export interface DepartmentOverviewApplicationApplicationAppUsageRequest {
  /** 查询日期，格式为yyyy-mm-dd，若cycle_type为1，date可以为任何自然日；若cycle_type为2，则输入的date必须为周一； 若cycle_type为3，则输入的date必须为每月1号 */
  date: string
  /** 活跃周期的统计类型 */
  cycle_type: number
  /** 查询的部门id，获取方法可参考[部门ID概述](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
  -  若部门id为空，则返回当前租户的使用数据；若填写部门id，则返回当前部门的使用数据（包含子部门的用户） 以及多级子部门的使用数据。
  -  若路径参数中department_id_type为空或者为open_department_id，则此处应该填写部门的 open_department_id；若路径参数中department_id_type为department_id，则此处应该填写部门的 department_id。
  - 若不填写则返回整个租户的数据 */
  department_id?: string
  /** 是否需要查询部门下多层子部门的数据。未设置或为0时，仅查询department_id对应的部门。设置为n时，查询department_id及其n级子部门的数据。仅在department_id参数传递时有效，最大值为4。 */
  recursion?: number
  /** 分页大小，取值范围 1~20 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；当返回的has_more为true时，会返回新的page_token，再次调用接口，传入这个page_token，将获得下一页数据。 */
  page_token?: string
}
export interface DepartmentOverviewApplicationApplicationAppUsageQuery {
  /** 调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface OverviewApplicationApplicationAppUsageRequest {
  /** 查询日期，格式为yyyy-mm-dd，若cycle_type为1，date可以为任何自然日；若cycle_type为2，则输入的date必须为周一； 若cycle_type为3，则输入的date必须为每月1号 */
  date: string
  /** 活跃周期的统计类型 */
  cycle_type: number
  /** 查询的部门id，获取方法可参考[部门ID概述](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)
  -  若部门id为空，则返回当前租户的使用数据；若填写部门id，则返回当前部门的使用数据（包含子部门的用户）；
  -  若路径参数中department_id_type为空或者为open_department_id，则此处应该填写部门的 open_department_id；若路径参数中department_id_type为department_id，则此处应该填写部门的 department_id。 */
  department_id?: string
  /** 能力类型，按能力类型进行筛选，返回对应能力的活跃数据 */
  ability: string
}
export interface OverviewApplicationApplicationAppUsageQuery {
  /** 调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface PatchApplicationApplicationFeedbackQuery {
  user_id_type?: string
  /** 反馈处理状态 */
  status: number
  /** 反馈处理人员id，租户内用户的唯一标识， ID值与查询参数中的user_id_type 对应 */
  operator_id: string
}
export interface ListApplicationApplicationFeedbackQuery {
  /** 查询的起始日期，格式为yyyy-mm-dd。不填则默认为当前日期减去180天。 */
  from_date?: string
  /** 查询的结束日期，格式为yyyy-mm-dd。不填默认为当前日期。
  只能查询 180 天内的数据。 */
  to_date?: string
  /** 反馈类型，不填写则表示查询所有反馈类型。 */
  feedback_type?: number
  /** 反馈处理状态，不填写则表示查询所有处理类型。 */
  status?: number
  user_id_type?: string
  /** 分页拉取反馈列表起始位置标示，不填表示从头开始 */
  page_token?: string
  /** 本次拉取反馈列表最大个数 */
  page_size?: number
}
export interface SetApplicationAppBadgeRequest {
  /** 用户ID */
  user_id: string
  /** badge数据版本号 */
  version: string
  /** badge extra 信息 */
  extra?: string
  /** pc端badge数量 */
  pc?: Lark.ClientBadgeNum
  /** 移动端badge数量 */
  mobile?: Lark.ClientBadgeNum
}
export interface SetApplicationAppBadgeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreatePersonalSettingsSystemStatusRequest {
  /** 系统状态名称，名称字符数要在1到20范围内。 */
  title: string
  /** 系统状态国际化名称，名称字符数要在1到20范围内。 */
  i18n_title?: Lark.SystemStatusI18nName
  /** 图标 */
  icon_key: string
  /** 颜色 */
  color?: string
  /** 优先级，数值越小，客户端展示的优先级越高。不同系统状态的优先级不能一样。 */
  priority?: number
  /** 同步设置 */
  sync_setting?: Lark.SystemStatusSyncSetting
}
export interface PatchPersonalSettingsSystemStatusRequest {
  /** 系统状态 */
  system_status: Lark.SystemStatus
  /** 需要更新的字段 */
  update_fields: string[]
}
export interface ListPersonalSettingsSystemStatusQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface BatchOpenPersonalSettingsSystemStatusRequest {
  /** 开启列表 */
  user_list: Lark.SystemStatusUserOpenParam[]
}
export interface BatchOpenPersonalSettingsSystemStatusQuery {
  /** 用户id类型 open_id/user_id/union_id */
  user_id_type?: string
}
export interface BatchClosePersonalSettingsSystemStatusRequest {
  /** 成员列表 */
  user_list: string[]
}
export interface BatchClosePersonalSettingsSystemStatusQuery {
  /** 用户id类型 open_id/user_id/union_id */
  user_id_type?: string
}
export interface CreateSearchMessageRequest {
  /** 搜索关键词 */
  query: string
  /** 消息来自user_id列表 */
  from_ids?: string[]
  /** 消息所在chat_id列表 */
  chat_ids?: string[]
  /** 消息类型(file/image/media) */
  message_type?: string
  /** at用户user_id列表 */
  at_chatter_ids?: string[]
  /** 消息来自类型(bot/user) */
  from_type?: string
  /** 会话类型(group_chat/p2p_chat) */
  chat_type?: string
  /** 消息发送起始时间 */
  start_time?: string
  /** 消息发送结束时间 */
  end_time?: string
}
export interface CreateSearchMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页大小 */
  page_size?: number
  /** 分页token */
  page_token?: string
}
export interface CreateSearchAppRequest {
  /** 搜索关键词 */
  query: string
}
export interface CreateSearchAppQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 分页大小 */
  page_size?: number
  /** 分页token */
  page_token?: string
}
export interface CreateSearchDataSourceRequest {
  /** data_source的展示名称 */
  name: string
  /** 数据源状态，0-已上线，1-未上线 */
  state?: number
  /** 对于数据源的描述 */
  description?: string
  /** 数据源在 search tab 上的展示图标路径 */
  icon_url?: string
  /** 数据源采用的展示模版名称 */
  template?: string
  /** 描述哪些字段可以被搜索 */
  searchable_fields?: string[]
  /** 数据源的国际化展示名称 */
  i18n_name?: Lark.I18nMeta
  /** 数据源的国际化描述 */
  i18n_description?: Lark.I18nMeta
  /** 数据源关联的 schema 标识 */
  schema_id?: string
  /** datasource对应的开放平台应用id */
  app_id?: string
}
export interface PatchSearchDataSourceRequest {
  /** 数据源的展示名称 */
  name?: string
  /** 数据源状态，0-已上线，1-未上线 */
  state?: number
  /** 对于数据源的描述 */
  description?: string
  /** 数据源在 search tab 上的展示图标路径 */
  icon_url?: string
  /** 数据源名称多语言配置，json格式，key为语言locale，value为对应文案，例如{"zh_cn":"测试数据源", "en_us":"Test DataSource"} */
  i18n_name?: Lark.I18nMeta
  /** 数据源描述多语言配置，json格式，key为语言locale，value为对应文案，例如{"zh_cn":"搜索测试数据源相关数据", "en_us":"Search data from Test DataSource"} */
  i18n_description?: Lark.I18nMeta
}
export interface ListSearchDataSourceQuery {
  /** 回包数据格式，0-全量数据；1-摘要数据。

  **注**：摘要数据仅包含"id"，"name"，"state"。 */
  view?: number
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateSearchDataSourceItemRequest {
  /** item 在 datasource 中的唯一标识，只接受英文字母、数字和下划线 */
  id: string
  /** item 的访问权限控制 */
  acl: Lark.Acl[]
  /** item 的元信息 */
  metadata: Lark.ItemMetadata
  /** 结构化数据 */
  structured_data: string
  /** 非结构化数据，如文档文本 */
  content?: Lark.ItemContent
}
export interface CreateSearchSchemaRequest {
  /** 数据范式的属性定义 */
  properties: Lark.SchemaProperty[]
  /** 数据展示相关配置 */
  display: Lark.SchemaDisplay
  /** 用户自定义数据范式的唯一标识 */
  schema_id: string
}
export interface CreateSearchSchemaQuery {
  /** 是否只用来校验合法性 */
  validate_only?: boolean
}
export interface PatchSearchSchemaRequest {
  /** 数据展示相关配置 */
  display?: Lark.SchemaDisplay
}
export interface BasicRecognizeOpticalCharRecognitionImageRequest {
  /** base64 后的图片数据 */
  image?: string
}
export interface FileRecognizeSpeechToTextSpeechRequest {
  /** 语音资源 */
  speech: Lark.Speech
  /** 配置属性 */
  config: Lark.FileConfig
}
export interface StreamRecognizeSpeechToTextSpeechRequest {
  /** 语音资源 */
  speech: Lark.Speech
  /** 配置属性 */
  config: Lark.StreamConfig
}
export interface DetectTranslationTextRequest {
  /** 需要被识别语种的文本 */
  text: string
}
export interface TranslateTranslationTextRequest {
  /** 源语言 */
  source_language: string
  /** 源文本 */
  text: string
  /** 目标语言 */
  target_language: string
  /** 请求级术语表，携带术语，仅在本次翻译中生效（最多能携带 128个术语词） */
  glossary?: Lark.Term[]
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
export interface ResetAdminPasswordRequest {
  /** 需要重置的密码参数，不少于8个字符，字母、数字和符号，至少三选二 */
  password: Lark.Password
  /** 待修改密码的用户ID，只针对邮箱登录凭证与企业邮箱(包括别名)相等的用户生效 */
  user_id: string
}
export interface ResetAdminPasswordQuery {
  /** 用户ID类型 */
  user_id_type: string
}
export interface ListAdminAdminDeptStatQuery {
  /** 部门ID类型 */
  department_id_type: string
  /** 起始日期（包含），格式是YYYY-mm-dd */
  start_date: string
  /** 终止日期（包含），格式是YYYY-mm-dd，起止日期之间相差不能超过91天（包含91天） */
  end_date: string
  /** 部门的 ID，取决于department_id_type，仅支持根部门及其下前4级子部门 */
  department_id: string
  /** 是否包含子部门，如果该值为false，则只查出本部门直属用户活跃和功能使用数据；如果该值为true，则查出该部门以及其子部门（子部门层级最多不超过根部门下的前4级）的用户活跃和功能使用数据 */
  contains_child_dept: boolean
  /** 分页大小，默认是10 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；当返回的has_more为true时，会返回新的page_token，再次调用接口，传入这个page_token，将获得下一页数据 */
  page_token?: string
}
export interface ListAdminAdminUserStatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 部门ID类型 */
  department_id_type?: string
  /** 起始日期（包含），格式是YYYY-mm-dd */
  start_date: string
  /** 终止日期（包含），格式是YYYY-mm-dd。起止日期之间相差不能超过31天（包含31天） */
  end_date: string
  /** 部门的 ID，取决于department_id_type */
  department_id?: string
  /** 用户的open_id，user_id或者union_id，取决于user_id_type */
  user_id?: string
  /** 分页大小，默认是10 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；当返回的has_more为true时，会返回新的page_token，再次调用接口，传入这个page_token，将获得下一页数据 */
  page_token?: string
}
export interface CreateAdminBadgeRequest {
  /** 租户内唯一的勋章名称，最多30个字符。 */
  name: string
  /** 勋章的描述文案，最多100个字符。 */
  explanation?: string
  /** 企业勋章的详情图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
  detail_image: string
  /** 企业勋章的头像挂饰图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
  show_image: string
  /** 勋章的多语言名称，同name字段限制，最多30个字符。 */
  i18n_name?: Lark.I18n
  /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
  i18n_explanation?: Lark.I18n
}
export interface UpdateAdminBadgeRequest {
  /** 租户内唯一的勋章名称，最多30个字符。 */
  name: string
  /** 勋章的描述文案，最多100个字符。 */
  explanation?: string
  /** 企业勋章的详情图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
  detail_image: string
  /** 企业勋章的头像挂饰图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
  show_image: string
  /** 勋章的多语言名称，同name字段限制，最多30个字符。 */
  i18n_name?: Lark.I18n
  /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
  i18n_explanation?: Lark.I18n
}
export interface ListAdminBadgeQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 租户内唯一的勋章名称，精确匹配。 */
  name?: string
}
export interface CreateAdminBadgeGrantRequest {
  /** 授予名单名称，最多100个字符。 */
  name: string
  /** 勋章下唯一的授予事项 */
  grant_type: number
  /** 授予名单的生效时间对应的时区，用于检查RuleDetail的时间戳的取值是否规范，取值范围为TZ database name */
  time_zone: string
  /** 规则详情 */
  rule_detail: Lark.RuleDetail
  /** 是否授予给全员。1.为false时，需要关联1~500个用户群体。2.为true时，不可关联用户、用户组、部门。 */
  is_grant_all: boolean
  /** 授予的用户ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
  user_ids?: string[]
  /** 授予的部门ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
  department_ids?: string[]
  /** 授予的用户组ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
  group_ids?: string[]
}
export interface CreateAdminBadgeGrantQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: string
}
export interface UpdateAdminBadgeGrantRequest {
  /** 授予名单名称，最多100个字符。 */
  name: string
  /** 勋章下唯一的授予事项 */
  grant_type: number
  /** 授予名单的生效时间对应的时区，用于检查RuleDetail的时间戳的取值是否规范，取值范围为TZ database name */
  time_zone: string
  /** 规则详情 */
  rule_detail: Lark.RuleDetail
  /** 是否授予给全员。1.为false时，需要关联1~500个用户群体。2.为true时，不可关联用户、用户组、部门。 */
  is_grant_all: boolean
  /** 授予的用户ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
  user_ids?: string[]
  /** 授予的部门ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
  department_ids?: string[]
  /** 授予的用户组ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
  group_ids?: string[]
}
export interface UpdateAdminBadgeGrantQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: string
}
export interface ListAdminBadgeGrantQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: string
  /** 授予名单名称，精确匹配。 */
  name?: string
}
export interface GetAdminBadgeGrantQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: string
}
export interface ListEhrEmployeeQuery {
  /** 返回数据类型 */
  view?: string
  /** 员工状态，不传代表查询所有员工状态

  实际在职 = 2&4

  可同时查询多个状态的记录，如 status=2&status=4 */
  status?: number[]
  /** 雇员类型，不传代表查询所有雇员类型 */
  type?: number[]
  /** 查询开始时间（创建时间 &gt;= 此时间） */
  start_time?: string
  /** 查询结束时间（创建时间 &lt;= 此时间） */
  end_time?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** user_id、open_id 或 union_id，默认为 open_id。

  如果传入的值不是 open_id，需要一并传入 user_id_type 参数。

  可一次查询多个 id 的用户，例如：user_ids=ou_8ebd4f35d7101ffdeb4771d7c8ec517e&user_ids=ou_7abc4f35d7101ffdeb4771dabcde

  [用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  user_ids?: string[]
  /** 分页标记，第一次请求可以不填，表示从头开始遍历；分页查询返回结果has_more 为 true 时会同时返回新的 page_token, 下次遍历可使用该返回的 page_token 获取更多信息。 */
  page_token?: string
  /** 分页大小，取值范围 1~100，默认 10 */
  page_size?: number
}
export interface SearchCorehrBasicInfoNationalityRequest {
  /** 国籍 ID 列表 */
  nationality_id_list?: string[]
  /** 国家 / 地区 ID 列表 */
  country_region_id_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoNationalityQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface SearchCorehrBasicInfoBankRequest {
  /** 银行 ID 列表，与「银行名称列表」查询条件至少填写一项 */
  bank_id_list?: string[]
  /** 银行名称列表，支持对银行名称精确搜索 */
  bank_name_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoBankQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface SearchCorehrBasicInfoBankBranchRequest {
  /** 银行 ID 列表，与「支行 ID 列表」、「支行名称列表」至少填写一项 */
  bank_id_list?: string[]
  /** 支行 ID 列表 */
  bank_branch_id_list?: string[]
  /** 支行名称列表，支持对支行名称精确搜索 */
  bank_branch_name_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoBankBranchQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface GetByParamCorehrCustomFieldQuery {
  /** 自定义字段 apiname */
  custom_api_name: string
  /** 所属对象 apiname */
  object_api_name: string
}
export interface QueryCorehrCustomFieldQuery {
  /** 所属对象 apiname，支持一个或多个

  当前数量限制为 20 个 */
  object_api_name_list: string[]
}
export interface ListObjectApiNameCorehrCustomFieldQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface SearchCorehrBasicInfoCountryRegionRequest {
  /** 国家/地区 ID 列表 */
  country_region_id_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoCountryRegionQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface SearchCorehrBasicInfoCountryRegionSubdivisionRequest {
  /** 国家/地区 ID 列表，可通过【查询国家/地区信息】接口获取 */
  country_region_id_list?: string[]
  /** 省份/行政区 ID 列表 */
  country_region_subdivision_id_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoCountryRegionSubdivisionQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface SearchCorehrBasicInfoCityRequest {
  /** 省份/行政区 ID 列表，可通过【查询省份/行政区信息】接口获取 */
  country_region_subdivision_id_list?: string[]
  /** 城市 ID 列表 */
  city_id_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoCityQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface SearchCorehrBasicInfoDistrictRequest {
  /** 所属城市 ID 列表，详细信息可通过【查询城市信息】接口查询获得 */
  city_id_list?: string[]
  /** 区/县 ID 列表 */
  district_id_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoDistrictQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateCorehrEmployeeTypeRequest {
  /** 名称 */
  name: Lark.I18n[]
  /** 默认雇员类型 */
  default_employee_type: boolean
  /** 启用 */
  active: boolean
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrEmployeeTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrEmployeeTypeRequest {
  /** 名称 */
  name?: Lark.I18n[]
  /** 默认雇员类型 */
  default_employee_type?: boolean
  /** 启用 */
  active?: boolean
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface PatchCorehrEmployeeTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrEmployeeTypeQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface CreateCorehrNationalIdTypeRequest {
  /** 国家 / 地区 */
  country_region_id: string
  /** 名称 */
  name: Lark.I18n[]
  /** 启用 */
  active: boolean
  /** 校验规则 */
  validation_rule: string
  /** 校验规则描述 */
  validation_rule_description?: Lark.I18n[]
  /** 编码 */
  code: string
  /** 证件类型 */
  identification_type: Lark.Enum
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrNationalIdTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrNationalIdTypeRequest {
  /** 国家 / 地区 */
  country_region_id?: string
  /** 名称 */
  name?: Lark.I18n[]
  /** 启用 */
  active?: boolean
  /** 校验规则 */
  validation_rule?: string
  /** 校验规则描述 */
  validation_rule_description?: Lark.I18n[]
  /** 编码 */
  code?: string
  /** 证件类型 */
  identification_type?: Lark.Enum
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface PatchCorehrNationalIdTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrNationalIdTypeQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 证件类型 */
  identification_type?: string
  /** 证件类型编码 */
  code?: string
  /** 国家地区ID */
  country_region_id?: string
}
export interface CreateCorehrWorkingHoursTypeRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name: Lark.I18n[]
  /** 国家/地区 */
  country_region_id_list?: string[]
  /** 职务默认值 */
  default_for_job: boolean
  /** 启用 */
  active: boolean
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrWorkingHoursTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrWorkingHoursTypeRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name?: Lark.I18n[]
  /** 国家/地区 */
  country_region_id_list?: string[]
  /** 职务默认值 */
  default_for_job?: boolean
  /** 启用 */
  active?: boolean
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface PatchCorehrWorkingHoursTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrWorkingHoursTypeQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface SearchCorehrBasicInfoCurrencyRequest {
  /** 货币 ID 列表 */
  currency_id_list?: string[]
  /** 状态列表 */
  status_list?: number[]
}
export interface SearchCorehrBasicInfoCurrencyQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface BatchGetCorehrEmployeeRequest {
  /** 返回数据的字段列表，填写方式：为空时默认仅返回 ID */
  fields?: string[]
  /** 雇佣 ID 列表 */
  employment_ids?: string[]
  /** 个人信息 ID 列表，employment_ids参数有值时该参数不生效 */
  person_ids?: string[]
  /** 主工作邮箱列表 */
  work_emails?: string[]
}
export interface BatchGetCorehrEmployeeQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface SearchCorehrEmployeeRequest {
  /** 返回数据的字段列表，填写方式：为空时默认仅返回 ID */
  fields?: string[]
  /** 雇佣 ID 列表 */
  employment_id_list?: string[]
  /** 工号列表 */
  employee_number_list?: string[]
  /** 邮箱，精确匹配查询 */
  work_email?: string
  /** 个人电话，精确匹配查询 */
  phone_number?: string
  /** 搜索关键字，支持对邮箱、工号和姓名的模糊匹配 */
  key_word?: string
  /** 雇佣状态 */
  employment_status?: string
  /** 人员类型 ID */
  employee_type_id?: string
  /** 部门 ID，根据员工主职的直接部门查询，可以通过【查询部门】API 获取 部门 ID */
  department_id_list?: string[]
  /** 直接上级的雇佣 ID，根据员工主职的直接上级查询 */
  direct_manager_id_list?: string[]
  /** 虚线上级的雇佣 ID，根据员工主职的虚线上级查询 */
  dotted_line_manager_id_list?: string[]
  /** 转正式员工日期-搜索范围开始 */
  regular_employee_start_date_start?: string
  /** 转正式员工日期-搜索范围结束 */
  regular_employee_start_date_end?: string
  /** 入职日期-搜索范围开始，需要与搜索范围结束一同使用 */
  effective_time_start?: string
  /** 入职日期-搜索范围结束 */
  effective_time_end?: string
  /** 工作地点 ID 列表，查询属于该工作地点及下级工作地点的员工 */
  work_location_id_list_include_sub?: string[]
  /** 常用英文全名精确搜索 */
  preferred_english_full_name_list?: string[]
  /** 常用本地全名精确搜索 */
  preferred_local_full_name_list?: string[]
  /** 居民身份证件号码精确搜索 */
  national_id_number_list?: string[]
  /** 个人电话列表，精确匹配查询 */
  phone_number_list?: string[]
  /** 工作邮箱地址列表，精确匹配查询 */
  email_address_list?: string[]
  /** 部门 ID 列表，查询属于该部门及下级部门的员工 */
  department_id_list_include_sub?: string[]
}
export interface SearchCorehrEmployeeQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface CreateCorehrEmploymentRequest {
  /** 资历起算日期 */
  seniority_date?: string
  /** 员工编号 */
  employee_number?: string
  /** 入职日期 */
  effective_time: string
  /** 离职日期 */
  expiration_time?: string
  /** 雇佣类型 */
  employment_type: Lark.Enum
  /** 人员信息，引用Person的ID */
  person_id: string
  /** 是否是主雇佣信息 */
  primary_employment: boolean
  /** 雇员状态 */
  employment_status?: Lark.Enum
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 工作邮箱列表 */
  work_email_list?: Lark.Email[]
  /** 离职原因 */
  reason_for_offboarding?: Lark.Enum
  /** 招聘应用 ID */
  ats_application_id?: string
  /** 是否离职重聘 */
  rehire?: Lark.Enum
  /** 历史雇佣信息 ID */
  rehire_employment_id?: string
}
export interface CreateCorehrEmploymentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrEmploymentRequest {
  /** 资历起算日期 */
  seniority_date?: string
  /** 员工编号 */
  employee_number?: string
  /** 雇佣类型 */
  employment_type?: Lark.Enum
  /** 人员信息，引用Person的ID */
  person_id?: string
  /** 是否是主雇佣信息 */
  primary_employment?: boolean
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 工作邮箱列表 */
  work_email_list?: Lark.Email[]
  /** 离职原因 */
  reason_for_offboarding?: Lark.Enum
  /** 招聘应用 ID */
  ats_application_id?: string
}
export interface PatchCorehrEmploymentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface DeleteCorehrEmploymentQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface CreateCorehrPersonRequest {
  /** 姓名列表 */
  name_list?: Lark.PersonName[]
  /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
  gender?: Lark.Enum
  /** 出生日期 */
  date_of_birth?: string
  /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
  race?: Lark.Enum
  /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
  marital_status?: Lark.Enum
  /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
  phone_list?: Lark.Phone[]
  /** 地址列表 */
  address_list?: Lark.Address[]
  /** 邮箱列表 */
  email_list?: Lark.Email[]
  /** 工作经历列表 */
  work_experience_list?: Lark.WorkExperienceInfo[]
  /** 教育经历列表 */
  education_list?: Lark.Education[]
  /** 银行账户 */
  bank_account_list?: Lark.BankAccount[]
  /** 证件 */
  national_id_list?: Lark.NationalId[]
  /** 家庭成员列表 */
  dependent_list?: Lark.Dependent[]
  /** 紧急联系人列表 */
  emergency_contact_list?: Lark.EmergencyContact[]
  /** 参加工作日期 */
  date_entered_workforce?: string
  /** 头像资源的 ID */
  profile_image_id?: string
  /** 年龄 */
  age?: number
  /** 个人资料附件 */
  personal_profile?: Lark.PersonalProfile[]
  /** 籍贯 ID */
  native_region?: string
  /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
  hukou_type?: Lark.Enum
  /** 户口所在地 */
  hukou_location?: string
  /** 人才 ID */
  talent_id?: string
  /** 自定义字段 */
  custom_fields?: Lark.CustomFieldData[]
  /** 出生国家/地区 */
  born_country_region?: string
  /** 是否残疾 */
  is_disabled?: boolean
  /** 残疾证号 */
  disable_card_number?: string
  /** 是否烈属 */
  is_martyr_family?: boolean
  /** 烈属证号 */
  martyr_card_number?: string
  /** 是否孤老 */
  is_old_alone?: boolean
  /** 居民身份信息 */
  resident_taxes?: Lark.ResidentTax[]
  /** 首次入境日期 */
  first_entry_time?: string
  /** 预计离境日期 */
  leave_time?: string
}
export interface CreateCorehrPersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrPersonRequest {
  /** 姓名列表 */
  name_list?: Lark.PersonName[]
  /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
  gender?: Lark.Enum
  /** 出生日期 */
  date_of_birth?: string
  /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
  race?: Lark.Enum
  /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
  marital_status?: Lark.Enum
  /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
  phone_list?: Lark.Phone[]
  /** 地址列表 */
  address_list?: Lark.Address[]
  /** 邮箱列表 */
  email_list?: Lark.Email[]
  /** 工作经历列表 */
  work_experience_list?: Lark.WorkExperienceInfo[]
  /** 教育经历列表 */
  education_list?: Lark.Education[]
  /** 银行账户 */
  bank_account_list?: Lark.BankAccount[]
  /** 证件 */
  national_id_list?: Lark.NationalId[]
  /** 家庭成员列表 */
  dependent_list?: Lark.Dependent[]
  /** 紧急联系人列表 */
  emergency_contact_list?: Lark.EmergencyContact[]
  /** 参加工作日期 */
  date_entered_workforce?: string
  /** 头像资源的 ID */
  profile_image_id?: string
  /** 年龄 */
  age?: number
  /** 个人资料附件 */
  personal_profile?: Lark.PersonalProfile[]
  /** 籍贯 ID */
  native_region?: string
  /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
  hukou_type?: Lark.Enum
  /** 户口所在地 */
  hukou_location?: string
  /** 人才 ID */
  talent_id?: string
  /** 自定义字段 */
  custom_fields?: Lark.CustomFieldData[]
  /** 出生国家/地区 */
  born_country_region?: string
  /** 是否残疾 */
  is_disabled?: boolean
  /** 残疾证号 */
  disable_card_number?: string
  /** 是否烈属 */
  is_martyr_family?: boolean
  /** 烈属证号 */
  martyr_card_number?: string
  /** 是否孤老 */
  is_old_alone?: boolean
  /** 居民身份信息 */
  resident_taxes?: Lark.ResidentTax[]
  /** 首次入境日期 */
  first_entry_time?: string
  /** 预计离境日期 */
  leave_time?: string
}
export interface PatchCorehrPersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface CreateCorehrJobDataRequest {
  /** 级别 */
  job_level_id?: string
  /** 雇员类型 */
  employee_type_id: string
  /** 工时制度 */
  working_hours_type_id?: string
  /** 工作地点 */
  work_location_id?: string
  /** 部门 */
  department_id?: string
  /** 职务 */
  job_id?: string
  /** 试用期开始日期 */
  probation_start_date?: string
  /** 试用期 */
  probation_end_date?: string
  /** 主任职 */
  primary_job_data: boolean
  /** Employment ID */
  employment_id: string
  /** 生效时间 */
  effective_time: string
  /** 失效时间 */
  expiration_time?: string
  /** 职务分类 ID */
  job_family_id?: string
  /** 任职原因 */
  assignment_start_reason: Lark.Enum
  /** 试用期结束日期 */
  probation_expected_end_date?: string
  /** 实线主管 */
  direct_manager_id?: string
  /** 虚线主管 */
  dotted_line_manager_id_list?: string[]
  /** 第二实线主管 */
  second_direct_manager_id?: string
  /** 成本中心分摊信息 */
  cost_center_rate?: Lark.SupportCostCenterItem[]
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrJobDataQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface PatchCorehrJobDataRequest {
  /** 级别 */
  job_level_id?: string
  /** 雇员类型 */
  employee_type_id?: string
  /** 工时制度 */
  working_hours_type_id?: string
  /** 工作地点 */
  work_location_id?: string
  /** 部门 */
  department_id?: string
  /** 职务 */
  job_id?: string
  /** 试用期开始日期 */
  probation_start_date?: string
  /** 试用期 */
  probation_end_date?: string
  /** 主任职 */
  primary_job_data?: boolean
  /** Employment ID */
  employment_id?: string
  /** 生效时间 */
  effective_time?: string
  /** 失效时间 */
  expiration_time?: string
  /** 职务分类 ID */
  job_family_id?: string
  /** 任职原因 */
  assignment_start_reason?: Lark.Enum
  /** 试用期结束日期 */
  probation_expected_end_date?: string
  /** 实线主管 */
  direct_manager_id?: string
  /** 虚线主管 */
  dotted_line_manager_id_list?: string[]
  /** 第二实线主管 */
  second_direct_manager_id?: string
  /** 成本中心分摊信息 */
  cost_center_rate?: Lark.SupportCostCenterItem[]
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface PatchCorehrJobDataQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface GetCorehrJobDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface QueryCorehrEmployeesJobDataRequest {
  /** 是否获取所有任职记录，true 为获取员工所有版本的任职记录，false 为仅获取当前生效的任职记录，默认为 false */
  get_all_version?: boolean
  /** 查看数据日期 */
  data_date?: string
  /** 生效日期 - 搜索范围开始 */
  effective_date_start?: string
  /** 生效日期 - 搜索范围结束 */
  effective_date_end?: string
}
export interface QueryCorehrEmployeesJobDataQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface BatchGetCorehrEmployeesJobDataRequest {
  /** 员工雇佣 ID 列表 */
  employment_ids: string[]
  /** 是否获取所有任职记录，true 为获取员工所有版本的任职记录，false 为仅获取当前生效的任职记录，默认为 false */
  get_all_version?: boolean
  /** 生效日期 - 搜索范围开始 */
  effective_date_start?: string
  /** 生效日期 - 搜索范围结束 */
  effective_date_end?: string
  /** 查看数据日期，默认为今天 */
  data_date?: string
}
export interface BatchGetCorehrEmployeesJobDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface ListCorehrJobDataQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 雇佣 ID */
  employment_id?: string
  /** 任职信息 ID 列表，最大 100 个（不传则默认查询全部任职信息） */
  job_data_id_list?: string[]
  /** 部门 ID */
  department_id?: string
  /** 职务 ID */
  job_id?: string
  /** 是否获取所有任职记录，true 为获取员工所有版本的任职记录，false 为仅获取当前生效的任职记录，默认为 false */
  get_all_version?: boolean
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface ParentsCorehrDepartmentRequest {
  /** 部门 ID 列表，一次性最多传入 100 个部门 ID */
  department_id_list: string[]
}
export interface ParentsCorehrDepartmentQuery {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface SearchCorehrDepartmentRequest {
  /** manager ID 列表
  **字段权限要求：按照部门负责人搜索 (corehr:department.manager.search:read)** */
  manager_list?: string[]
  /** 部门 ID 列表 */
  department_id_list?: string[]
  /** 部门名称列表，需精确匹配 */
  name_list?: string[]
  /** 上级部门 ID ，可查询直接下级部门
  **字段权限要求：按照上级部门搜索 (corehr:department.organize.search:read) ** */
  parent_department_id?: string
  /** 部门 code 列表 */
  code_list?: string[]
  /** 返回数据的字段列表 */
  fields?: string[]
}
export interface SearchCorehrDepartmentQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface CreateCorehrDepartmentRequest {
  /** 子类型 */
  sub_type?: Lark.Enum
  /** 部门负责人 */
  manager?: string
  /** 是否保密 */
  is_confidential?: boolean
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: Lark.HiberarchyCommon
  /** 生效时间 */
  effective_time: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 成本中心id */
  cost_center_id?: string
}
export interface CreateCorehrDepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface PatchCorehrDepartmentRequest {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 子类型 */
  sub_type?: Lark.Enum
  /** 部门负责人 */
  manager?: string
  /** 是否保密 */
  is_confidential?: boolean
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: Lark.HiberarchyCommon
  /** 生效时间 */
  effective_time: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 成本中心id */
  cost_center_id?: string
}
export interface PatchCorehrDepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface GetCorehrDepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface BatchGetCorehrDepartmentRequest {
  /** 部门 ID 列表 */
  department_id_list?: string[]
  /** 返回数据的字段列表 */
  fields?: string[]
  /** 部门名称精确匹配，最多传100个 */
  department_name_list?: string[]
}
export interface BatchGetCorehrDepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface ListCorehrDepartmentQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 部门ID列表 */
  department_id_list?: string[]
  /** 部门名称列表，需精确匹配 */
  name_list?: string[]
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface BatchGetCorehrLocationRequest {
  /** 地点 ID 列表 */
  location_ids: string[]
}
export interface CreateCorehrLocationRequest {
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: Lark.HiberarchyCommon
  /** 地点用途 */
  location_usage_list?: Lark.Enum[]
  /** 地址 */
  address?: Lark.Address[]
  /** 工时制度 */
  working_hours_type_id?: string
  /** 生效时间 */
  effective_time: string
  /** 区域设置 */
  locale?: Lark.Enum
  /** 时区 */
  time_zone_id?: string
  /** 默认显示语言 */
  display_language_id?: string
}
export interface CreateCorehrLocationQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrLocationQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface ListCorehrCompanyQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface BatchGetCorehrCompanyRequest {
  /** 公司 ID 列表 */
  company_ids: string[]
}
export interface CreateCorehrCompanyRequest {
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: Lark.HiberarchyCommon
  /** 性质 */
  type?: Lark.Enum
  /** 行业 */
  industry_list?: Lark.Enum[]
  /** 法定代表人 */
  legal_representative?: Lark.I18n[]
  /** 邮编 */
  post_code?: string
  /** 纳税人识别号 */
  tax_payer_id?: string
  /** confidential */
  confidential?: boolean
  /** 主体类型 */
  sub_type_list?: Lark.Enum[]
  /** 是否为分公司 */
  branch_company?: boolean
  /** 主要负责人 */
  primary_manager?: Lark.I18n[]
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrCompanyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrCompanyRequest {
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: Lark.HiberarchyCommon
  /** 性质 */
  type?: Lark.Enum
  /** 行业 */
  industry_list?: Lark.Enum[]
  /** 法定代表人 */
  legal_representative?: Lark.I18n[]
  /** 邮编 */
  post_code?: string
  /** 纳税人识别号 */
  tax_payer_id?: string
  /** confidential */
  confidential?: boolean
  /** 主体类型 */
  sub_type_list?: Lark.Enum[]
  /** 是否为分公司 */
  branch_company?: boolean
  /** 主要负责人 */
  primary_manager?: Lark.I18n[]
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 默认币种 */
  currency?: Lark.Currency
  /** 电话 */
  phone?: Lark.PhoneNumberAndAreaCode
  /** 传真 */
  fax?: Lark.PhoneNumberAndAreaCode
}
export interface PatchCorehrCompanyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface CreateCorehrCostCenterRequest {
  /** 成本中心名称 */
  name: Lark.I18n[]
  /** 编码 */
  code?: string
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: Lark.I18n[]
  /** 生效时间 */
  effective_time: string
}
export interface CreateCorehrCostCenterQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface PatchCorehrCostCenterRequest {
  /** 生效时间 */
  effective_time: string
  /** 启用停用状态 */
  active: boolean
  /** 操作原因 */
  operation_reason: string
}
export interface PatchCorehrCostCenterQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface DeleteCorehrCostCenterRequest {
  /** 操作原因 */
  operation_reason: string
}
export interface SearchCorehrCostCenterRequest {
  /** 成本中心ID 列表 */
  cost_center_id_list?: string[]
  /** 成长中心名称列表，精确匹配 */
  name_list?: string[]
  /** 成本中心编码 */
  code?: string
  /** 上级成本中心ID，可用于查询直接下级成本中心 */
  parent_cost_center_id?: string
  /** 是否获取所有陈本中心版本 */
  get_all_version?: boolean
}
export interface SearchCorehrCostCenterQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface CreateCorehrCostCenterVersionRequest {
  /** 成本中心名称 */
  name: Lark.I18n[]
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: Lark.I18n[]
  /** 生效时间 */
  effective_time: string
  /** 操作原因 */
  operation_reason: string
}
export interface CreateCorehrCostCenterVersionQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface PatchCorehrCostCenterVersionRequest {
  /** 成本中心名称 */
  name: Lark.I18n[]
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: Lark.I18n[]
  /** 生效时间 */
  effective_time: string
  /** 操作原因 */
  operation_reason: string
}
export interface PatchCorehrCostCenterVersionQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface DeleteCorehrCostCenterVersionRequest {
  /** 操作原因 */
  operation_reason: string
}
export interface BatchGetCorehrJobLevelRequest {
  /** 职级 ID 列表 */
  job_level_ids: string[]
}
export interface CreateCorehrJobLevelRequest {
  /** 职级数值 */
  level_order: number
  /** 编码 */
  code?: string
  /** 名称 */
  name: Lark.I18n[]
  /** 描述 */
  description?: Lark.I18n[]
  /** 启用 */
  active: boolean
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrJobLevelQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrJobLevelRequest {
  /** 职级数值 */
  level_order?: number
  /** 编码 */
  code?: string
  /** 名称 */
  name?: Lark.I18n[]
  /** 描述 */
  description?: Lark.I18n[]
  /** 启用 */
  active?: boolean
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface PatchCorehrJobLevelQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrJobLevelQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface BatchGetCorehrJobFamilyRequest {
  /** 序列 ID 列表 */
  job_family_ids: string[]
}
export interface CreateCorehrJobFamilyRequest {
  /** 名称 */
  name: Lark.I18n[]
  /** 启用 */
  active: boolean
  /** 上级序列 */
  parent_id?: string
  /** 生效时间 */
  effective_time: string
  /** 失效时间 */
  expiration_time?: string
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrJobFamilyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrJobFamilyRequest {
  /** 名称 */
  name?: Lark.I18n[]
  /** 启用 */
  active?: boolean
  /** 上级序列 */
  parent_id?: string
  /** 生效时间 */
  effective_time?: string
  /** 失效时间 */
  expiration_time?: string
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface PatchCorehrJobFamilyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrJobFamilyQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface CreateCorehrJobRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name: Lark.I18n[]
  /** 描述 */
  description?: Lark.I18n[]
  /** 启用 */
  active: boolean
  /** 职务头衔 */
  job_title?: Lark.I18n[]
  /** 序列 */
  job_family_id_list?: string[]
  /** 职级 */
  job_level_id_list?: string[]
  /** 工时制度，引用WorkingHoursType的ID */
  working_hours_type_id?: string
  /** 生效时间 */
  effective_time: string
  /** 失效时间 */
  expiration_time?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface CreateCorehrJobQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrJobRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name?: Lark.I18n[]
  /** 描述 */
  description?: Lark.I18n[]
  /** 启用 */
  active?: boolean
  /** 职务头衔 */
  job_title?: Lark.I18n[]
  /** 序列 */
  job_family_id_list?: string[]
  /** 职级 */
  job_level_id_list?: string[]
  /** 工时制度，引用WorkingHoursType的ID */
  working_hours_type_id?: string
  /** 生效时间 */
  effective_time?: string
  /** 失效时间 */
  expiration_time?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface PatchCorehrJobQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrJobQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 名称 */
  name?: string
  /** 语言 */
  query_language?: string
}
export interface ListCorehrJobQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 名称 */
  name?: string
  /** 语言 */
  query_language?: string
}
export interface CreateCorehrPreHireRequest {
  /** 个人信息 */
  basic_info: Lark.BasicInfo
  /** 职位信息 */
  offer_info: Lark.OfferInfo
  /** 教育经历 */
  education_info?: Lark.EducationInfo[]
  /** 工作经历 */
  work_experience?: Lark.WorkExperience[]
  /** 招聘应用ID */
  ats_application_id?: string
}
export interface PatchCorehrPreHireRequest {
  /** 招聘系统的候选人 ID */
  ats_application_id?: string
  /** 入职日期 */
  hire_date?: string
  /** 雇佣类型 */
  employee_type?: Lark.Enum
  /** 人员编号 */
  worker_id?: string
  /** 雇佣类型 */
  employee_type_id?: string
  /** 引用Person ID */
  person_id?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 成本中心分摊信息 */
  cost_center_rate?: Lark.SupportCostCenterItem[]
  /** 入职状态 */
  onboarding_status: Lark.Enum
}
export interface PatchCorehrPreHireQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrPreHireQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 待入职ID列表 */
  pre_hire_ids?: string[]
}
export interface SearchCorehrContractRequest {
  /** 雇佣 ID 列表 */
  employment_id_list?: string[]
  /** 合同ID列表 */
  contract_id_list?: string[]
}
export interface SearchCorehrContractQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface CreateCorehrContractRequest {
  /** 合同开始日期 */
  effective_time: string
  /** 实际结束日期 */
  expiration_time?: string
  /** 雇员ID */
  employment_id: string
  /** 合同类型 */
  contract_type: Lark.Enum
  /** 甲方, 引用Company的ID */
  first_party_company_id: string
  /** Person ID */
  person_id?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 期限类型 */
  duration_type?: Lark.Enum
  /** 合同结束日期 */
  contract_end_date?: string
  /** 合同编号 */
  contract_number?: string
  /** 签订类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（signing_type）枚举定义部分获得 */
  signing_type?: Lark.Enum
}
export interface CreateCorehrContractQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface PatchCorehrContractRequest {
  /** 合同开始日期 */
  effective_time?: string
  /** 实际结束日期 */
  expiration_time?: string
  /** 雇员ID */
  employment_id?: string
  /** 合同类型 */
  contract_type?: Lark.Enum
  /** 甲方, 引用Company的ID */
  first_party_company_id?: string
  /** Person ID */
  person_id?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
  /** 期限类型 */
  duration_type?: Lark.Enum
  /** 合同结束日期 */
  contract_end_date?: string
  /** 合同编号 */
  contract_number?: string
  /** 签订类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（signing_type）枚举定义部分获得 */
  signing_type?: Lark.Enum
}
export interface PatchCorehrContractQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface ListCorehrContractQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface SearchCorehrProbationRequest {
  /** 雇佣 ID 列表 */
  employment_ids?: string[]
  /** 部门 ID 列表 */
  department_ids?: string[]
  /** 试用期开始日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
  probation_start_date_start?: string
  /** 试用期开始日期 - 搜索范围结束 */
  probation_start_date_end?: string
  /** 试用期预计结束日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
  probation_expected_end_date_start?: string
  /** 试用期预计结束日期 - 搜索范围结束 */
  probation_expected_end_date_end?: string
  /** 试用期实际结束日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
  actual_probation_end_date_start?: string
  /** 试用期实际结束日期 - 搜索范围结束 */
  actual_probation_end_date_end?: string
  /** 转正发起日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
  initiating_time_start?: string
  /** 转正发起日期 - 搜索范围结束 */
  initiating_time_end?: string
  /** 试用期状态 */
  probation_status?: string
  /** 试用期最终考核结果 */
  final_assessment_result?: string
  /** 试用期最终考核等级 */
  final_assessment_grade?: string
}
export interface SearchCorehrProbationQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface EnableDisableAssessmentCorehrProbationRequest {
  /** 启用 / 停用状态。启用后可在试用期管理页面中可见试用期考核相关的字段。 */
  active: boolean
  /** 试用期考核系统入口链接，当启用功能时该字段必填。 */
  app_url?: string
}
export interface CreateCorehrProbationAssessmentRequest {
  /** 试用期人员的雇佣 ID */
  employment_id: string
  /** 试用期考核结果列表 */
  assessments: Lark.AssessmentForCreate[]
}
export interface CreateCorehrProbationAssessmentQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface PatchCorehrProbationAssessmentRequest {
  /** 考核状态 */
  assessment_status: string
  /** 试用期考核结果 */
  assessment_result?: string
  /** 考核得分 */
  assessment_score?: number
  /** 试用期考核等级 */
  assessment_grade?: string
  /** 考核评语 */
  assessment_comment?: string
  /** 考核结果页面超链接 */
  assessment_detail?: string
  /** 是否为最终考核结果 */
  is_final_asssessment: boolean
}
export interface PatchCorehrProbationAssessmentQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}
export interface QueryCorehrTransferReasonQuery {
  /** 异动原因状态 */
  active?: boolean
  /** 异动原因唯一标识，多条时最多数量为10 */
  transfer_reason_unique_identifier?: string[]
}
export interface QueryCorehrTransferTypeQuery {
  /** 异动类型状态 */
  active?: boolean
  /** 异动类型唯一标识，多条时最多数量为10 */
  transfer_type_unique_identifier?: string[]
}
export interface CreateCorehrJobChangeRequest {
  /** 异动方式 */
  transfer_mode: number
  /** 雇员id */
  employment_id: string
  /** 异动类型唯一标识 */
  transfer_type_unique_identifier: string
  /** 异动流程ID */
  flow_id?: string
  /** 生效日期 */
  effective_date: string
  /** 异动详细信息 */
  transfer_info: Lark.TransferInfo
  /** 异动记录标识符 */
  transfer_key?: string
  /** 异动发起人 ID */
  initiator_id?: string
}
export interface CreateCorehrJobChangeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface SearchCorehrJobChangeRequest {
  /** 雇员 ID 列表 */
  employment_ids?: string[]
  /** 异动记录 ID 列表 */
  job_change_ids?: string[]
  /** 异动状态，多个状态之间为「或」的关系 */
  statuses?: string[]
}
export interface SearchCorehrJobChangeQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface QueryCorehrOffboardingRequest {
  /** 是否启用 */
  active?: boolean
  /** 离职原因唯一标识列表，用于过滤，最大20个 */
  offboarding_reason_unique_identifier?: string[]
}
export interface SubmitCorehrOffboardingRequest {
  /** 离职方式 */
  offboarding_mode: number
  /** 雇员 id */
  employment_id: string
  /** 离职日期 */
  offboarding_date: string
  /** 离职原因，可通过接口
  [【查询员工离职原因列表】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query)获取 */
  offboarding_reason_unique_identifier: string
  /** 离职原因说明，长度限制6000 */
  offboarding_reason_explanation?: string
  /** 操作发起人 ID（employment_id），为空默认为系统发起。注意：只有操作发起人可以撤销流程 */
  initiator_id?: string
  /** 是否加入离职屏蔽名单 */
  add_block_list?: boolean
  /** 屏蔽原因 */
  block_reason?: string
  /** 屏蔽原因说明 */
  block_reason_explanation?: string
  /** 自定义字段 */
  custom_fields?: Lark.ObjectFieldData[]
}
export interface SubmitCorehrOffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface SearchCorehrOffboardingRequest {
  /** 雇佣 ID 列表，为空默认查询所有离职人员 */
  employment_ids?: string[]
  /** 离职审批发起时间-搜索范围开始，需要与搜索范围结束一同使用 */
  apply_initiating_time_start?: string
  /** 离职审批发起时间 - 搜索范围结束 */
  apply_initiating_time_end?: string
  /** 期望离职日期-搜索范围开始，需要与搜索范围结束一同使用 */
  expected_offboarding_date_start?: string
  /** 期望离职日期 - 搜索范围结束 */
  expected_offboarding_date_end?: string
  /** 离职日期-搜索范围开始，需要与搜索范围结束一同使用 */
  offboarding_date_start?: string
  /** 离职日期 - 搜索范围结束 */
  offboarding_date_end?: string
  /** 离职状态，多个状态之间为「或」的关系 */
  statuses?: string[]
  /** 离职原因列表 , 可以通过【查询员工离职原因列表】接口获取 ，查询时不返回下级原因相关的离职信息 */
  reasons?: string[]
  /** 离职原因（员工）列表 , 可以通过【查询员工离职原因列表】接口获取，查询时不返回下级原因相关的离职信息 */
  employee_reasons?: string[]
}
export interface SearchCorehrOffboardingQuery {
  /** 分页大小，最大 100 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface CreateCorehrLeaveGrantingRecordRequest {
  /** 假期类型 ID，枚举值可通过【获取假期类型列表】接口获取（若假期类型下存在假期子类，此处仅支持传入假期子类的 ID） */
  leave_type_id: string
  /** 员工 ID */
  employment_id: string
  /** 授予数量 */
  granting_quantity: string
  /** 授予时长单位

  可选值有：

  - 1: 天
  - 2: 小时 */
  granting_unit: number
  /** 生效时间 */
  effective_date: string
  /** 失效时间 */
  expiration_date?: string
  /** 授予原因 */
  reason: Lark.I18n[]
  /** 自定义外部 ID，可用于避免数据重复写入（不能超过 64 字符） */
  external_id?: string
}
export interface CreateCorehrLeaveGrantingRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface LeaveTypesCorehrLeaveQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 假期类型状态（不传则为全部）

  可选值有：

  - 1：已启用

  - 2：已停用 */
  status?: string
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface LeaveBalancesCorehrLeaveQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大20 */
  page_size: string
  /** 查询截止日期，即截止到某天余额数据的日期（不传则默认为当天） */
  as_of_date?: string
  /** 员工 ID 列表，最大 100 个（不传则默认查询全部员工） */
  employment_id_list?: string[]
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 查询时区 */
  time_zone?: string
}
export interface LeaveRequestHistoryCorehrLeaveQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 员工 ID 列表，最大 100 个（不传则默认查询全部员工） */
  employment_id_list?: string[]
  /** 休假发起人 ID 列表，最大 100 个 */
  initiator_id_list?: string[]
  /** 请假记录的状态

  可选值有：

  - 1：已通过

  - 2：审批中

  - 3：审批中（更正）

  - 4：审批中（取消休假）

  - 5：审批中（返岗）

  - 6：已返岗

  - 7：已拒绝

  - 8：已取消

  - 9：已撤回 */
  leave_request_status?: string[]
  /** 假期类型 ID 列表，枚举值可通过【获取假期类型列表】接口获取 */
  leave_type_id_list?: string[]
  /** 休假开始时间晚于等于的日期 */
  leave_start_date_min?: string
  /** 休假开始时间早于等于的日期 */
  leave_start_date_max?: string
  /** 休假结束时间晚于等于的日期 */
  leave_end_date_min?: string
  /** 休假结束时间早于等于的日期 */
  leave_end_date_max?: string
  /** 休假发起时间晚于等于的日期 */
  leave_submit_date_min?: string
  /** 休假发起时间早于等于的日期 */
  leave_submit_date_max?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 请假记录更新时间晚于等于的时间 */
  leave_update_time_min?: string
  /** 请假记录更新时间早于等于的时间 */
  leave_update_time_max?: string
  /** 是否返回请假详情，若为true，将在每条请假记录的details字段返回请假详情 */
  return_detail?: boolean
  /** 指定过滤长/短假类型，0表示不过滤，1表示仅获取短假，2表示仅获取长假, 默认0 */
  leave_term_type?: number
  /** 请假记录所在时区 */
  time_zone?: string
}
export interface BatchGetCorehrEmployeesBpRequest {
  /** 员工雇佣 ID */
  employment_ids: string[]
  /** 是否获取全部 BP，true 为获取员工所在部门及来自上级部门的全部 HRBP 和属地 BP，false 为仅获取员工的直属 HRBP 和属地 BP（当员工所在部门、属地无 BP 时，会上钻找到最近的 BP），默认为 false */
  get_all?: boolean
}
export interface BatchGetCorehrEmployeesBpQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface GetByDepartmentCorehrBpRequest {
  /** 部门 ID */
  department_id: string
}
export interface GetByDepartmentCorehrBpQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface ListCorehrBpQuery {
  /** 分页大小，最大 500 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface QueryCorehrSecurityGroupRequest {
  /** 角色列表，一次最多支持查询 50 个 */
  item_list: Lark.BpRoleOrganization[]
}
export interface QueryCorehrSecurityGroupQuery {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
}
export interface SearchCorehrAssignedUserRequest {
  /** 角色 ID，仅支持组织类角色， 角色 ID 可通过【批量获取角色列表】接口获取 */
  role_id: string
  /** 管理范围信息 */
  management_scope_list: Lark.ManagementScope[]
  /** 查找方式

  可选值有：
  - 1：只查找指定 部门/工作地点/公司/社保城市，如无授权信息则返回为空
  - 2：当指定的 部门/工作地点/公司/社保城市 无授权信息，向上查找第一个授权记录并直接返回 */
  search_method: string
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface SearchCorehrAssignedUserQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface ListCorehrSecurityGroupQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface ListCorehrProcessQuery {
  /** 任务查询结束时间 (unix毫秒时间戳)，闭区间，开始时间和结束时间跨度不能超过31天 */
  modify_time_to: string
  /** 查询状态列表 */
  statuses?: number[]
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size: number
  /** 查询开始时间（unix毫秒时间戳），闭区间，开始时间和结束时间跨度不能超过31天 */
  modify_time_from: string
  /** 流程定义ID */
  flow_definition_id?: string
}
export interface GetCorehrProcessQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface MatchCorehrCompensationStandardQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: string
  /** 雇员ID */
  employment_id: string
  /** 薪资标准的关联对象，项目或者指标 */
  reference_object_api?: string
  /** 薪资标准关联对象ID */
  reference_object_id: string
  /** 部门ID */
  department_id?: string
  /** 工作地点ID */
  work_location_id?: string
  /** 公司ID */
  company_id?: string
  /** 职务序列ID */
  job_family_id?: string
  /** 职级ID */
  job_level_id?: string
  /** 人员类型ID */
  employee_type_id?: string
  /** 招聘类型 */
  recruitment_type?: string
  /** 定调薪原因ID */
  cpst_change_reason_id?: string
  /** 薪资方案ID */
  cpst_plan_id?: string
  /** 薪级薪等ID */
  cpst_salary_level_id?: string
  /** 生效时间 */
  effective_time?: string
}
export interface CombinedCreateHireJobRequest {
  /** 职位编号，可传入职位的「职位编号」、「职位 ID」或者「职位序号」，将以传入的参数作为职位编号，以便双方系统的数据映射 */
  code?: string
  /** 工作年限 */
  experience?: number
  /** 到期日期，请使用 */
  expiry_time?: number
  /** 自定义字段 */
  customized_data_list?: Lark.CombinedJobObjectValueMap[]
  /** 最低职级，枚举通过接口「获取职级列表」获取 */
  min_level_id?: string
  /** 最低薪资 */
  min_salary?: number
  /** 职位名称 */
  title: string
  /** 职位负责人，仅一位，可通过用户相关接口获取用户 id */
  job_managers: Lark.JobManager
  /** 招聘流程，枚举通过接口「获取招聘流程信息」获取 */
  job_process_id: string
  /** 职位流程类型 */
  process_type: number
  /** 项目，枚举通过「获取项目列表」获取 */
  subject_id?: string
  /** 职能分类，通过「获取职能分类」获取 */
  job_function_id?: string
  /** 部门，枚举通过接口「获取部门信息列表」获取 */
  department_id: string
  /** 招聘数量 */
  head_count?: number
  /** 是否长期有效 */
  is_never_expired: boolean
  /** 最高薪资 */
  max_salary?: number
  /** 职位要求 */
  requirement?: string
  /** 职位描述 */
  description?: string
  /** 职位亮点 */
  highlight_list?: string[]
  /** 职位类别 */
  job_type_id: string
  /** 最高职级，枚举通过接口「获取职级列表」获取 */
  max_level_id?: string
  /** 雇佣类型 */
  recruitment_type_id: string
  /** 学历要求 */
  required_degree?: number
  /** 序列 */
  job_category_id?: string
  /** 工作地点，枚举通过接口「获取地址列表」获取，选择地点用途为「职位地址」 */
  address_id_list?: string[]
  /** 职位属性，1是实体职位，2是虚拟职位 */
  job_attribute?: number
  /** 到期日期的毫秒时间戳 */
  expiry_timestamp?: string
  /** 面试登记表ID */
  interview_registration_schema_id?: string
  /** 入职登记表ID */
  onboard_registration_schema_id?: string
  /** 目标专业ID List */
  target_major_id_list?: string[]
}
export interface CombinedCreateHireJobQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface GetHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface ConfigHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListHireJobQuery {
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
  /** 分页大小, 不能超过 20 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: string
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: string
}
export interface CombinedUpdateHireJobRequest {
  /** 职位 ID */
  id?: string
  /** 工作年限 */
  experience?: number
  /** 到期日期，请使用 */
  expiry_time?: number
  /** 自定义字段 */
  customized_data_list?: Lark.CombinedJobObjectValueMap[]
  /** 最低职级，枚举通过接口「获取职级列表」获取 */
  min_level_id?: string
  /** 最低薪资 */
  min_salary?: number
  /** 职位名称 */
  title?: string
  /** 职位负责人，仅一位，可通过用户相关接口获取用户 id */
  job_managers?: Lark.JobManager
  /** 招聘流程，枚举通过接口「获取招聘流程信息」获取 */
  job_process_id?: string
  /** 项目，枚举通过「获取项目列表」获取 */
  subject_id?: string
  /** 职能分类，通过「获取职能分类」获取 */
  job_function_id?: string
  /** 部门，枚举通过接口「获取部门信息列表」获取 */
  department_id?: string
  /** 招聘数量 */
  head_count?: number
  /** 是否长期有效 */
  is_never_expired: boolean
  /** 最高薪资 */
  max_salary?: number
  /** 职位要求 */
  requirement?: string
  /** 职位描述 */
  description?: string
  /** 职位亮点 */
  highlight_list?: string[]
  /** 职位类别 */
  job_type_id: string
  /** 最高职级，枚举通过接口「获取职级列表」获取 */
  max_level_id?: string
  /** 学历要求 */
  required_degree?: number
  /** 序列 */
  job_category_id?: string
  /** 工作地点，枚举通过接口「获取地址列表」获取，选择地点用途为「职位地址」 */
  address_id_list?: string[]
  /** 职位属性，1是实体职位，2是虚拟职位 */
  job_attribute?: number
  /** 到期日期的毫秒时间戳 */
  expiry_timestamp?: string
  /** 目标专业ID List */
  target_major_id_list?: string[]
}
export interface CombinedUpdateHireJobQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface UpdateConfigHireJobRequest {
  /** Offer 申请表，枚举通过接口「获取 Offer 申请表列表」获取 */
  offer_apply_schema_id?: string
  /** Offer 审批流，枚举通过接口「获取 Offer 审批流列表」获取 */
  offer_process_conf?: string
  /** 建议评估人 ID 列表 */
  recommended_evaluator_id_list?: string[]
  /** 更新选项，传入要更新的配置项 */
  update_option_list: number[]
  /** 面试评价表，枚举通过接口「获取面试评价表列表」获取 */
  assessment_template_biz_id?: string
  /** 建议面试官列表 */
  interview_round_conf_list?: Lark.JobConfigInterviewRoundConf[]
  /** 关联招聘需求，支持关联多个，枚举通过接口「获取招聘需求」获取 */
  jr_id_list?: string[]
  /** 面试登记表ID，当在飞书招聘「设置 - 信息登记表使用设置 - 面试登记表使用方式」中选择「HR 按职位选择登记表」时，该字段为必填；否则该字段不生效。 */
  interview_registration_schema_id?: string
  /** 入职登记表ID，当在飞书招聘「设置 - 信息登记表使用设置 - 入职登记表使用方式」中选择「HR 按职位选择登记表」时，该字段为必填；否则该字段不生效。 */
  onboard_registration_schema_id?: string
  /** 面试轮次类型 ID 列表 */
  interview_round_type_conf_list?: Lark.JobConfigRoundType[]
  /** 关联职位列表，如职位为实体职位则关联虚拟职位id，如职位为虚拟职位则关联实体职位id */
  related_job_id_list?: string[]
  /** 面试官安排面试配置 */
  interview_appointment_config?: Lark.InterviewAppointmentConfig
}
export interface UpdateConfigHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListHireJobTypeQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface RecruiterHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateHireJobRequirementRequest {
  /** 招聘需求编号 */
  short_code: string
  /** 需求名称 */
  name: string
  /** 需求状态 */
  display_progress: number
  /** 需求人数 */
  head_count: number
  /** 职位性质 ID */
  recruitment_type_id: string
  /** 最高职级 ID */
  max_level_id?: string
  /** 最低职级 ID */
  min_level_id?: string
  /** 职位序列 ID */
  sequence_id?: string
  /** 需求类型 */
  category?: number
  /** 需求部门 ID */
  department_id?: string
  /** 需求负责人 ID 列表 */
  recruiter_id_list?: string[]
  /** 需求用人经理 ID 列表 */
  jr_hiring_manager_id_list?: string[]
  /** 直属上级 ID */
  direct_leader_id_list?: string[]
  /** 开始日期，毫秒级时间戳 */
  start_time?: string
  /** 预计完成日期，毫秒级时间戳 */
  deadline?: string
  /** 招聘优先级 */
  priority?: number
  /** 学历要求 */
  required_degree?: number
  /** 最高薪资 */
  max_salary?: string
  /** 最低薪资 */
  min_salary?: string
  /** 工作地点 ID */
  address_id?: string
  /** 需求描述 */
  description?: string
  /** 自定义字段 */
  customized_data_list?: Lark.JobRequirementCustomizedData[]
}
export interface CreateHireJobRequirementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface ListHireJobRequirementQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size?: number
  /** 职位ID */
  job_id?: string
  /** 起始创建时间，传入毫秒级时间戳 */
  create_time_begin?: string
  /** 截止创建时间，传入毫秒级时间戳 */
  create_time_end?: string
  /** 起始更新时间，传入毫秒级时间戳 */
  update_time_begin?: string
  /** 截止更新时间，传入毫秒级时间戳 */
  update_time_end?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface UpdateHireJobRequirementRequest {
  /** 需求名称 */
  name: string
  /** 需求状态 */
  display_progress: number
  /** 需求人数 */
  head_count: number
  /** 职位性质 ID */
  recruitment_type_id: string
  /** 最高职级 ID */
  max_level_id?: string
  /** 最低职级 ID */
  min_level_id?: string
  /** 职位序列 ID */
  sequence_id?: string
  /** 需求类型 */
  category?: number
  /** 需求部门 ID */
  department_id?: string
  /** 需求负责人 ID 列表 */
  recruiter_id_list?: string[]
  /** 需求用人经理 ID 列表 */
  jr_hiring_manager_id_list?: string[]
  /** 直属上级 ID */
  direct_leader_id_list?: string[]
  /** 开始日期，毫秒级时间戳 */
  start_time?: string
  /** 预计完成日期，毫秒级时间戳 */
  deadline?: string
  /** 招聘优先级 */
  priority?: number
  /** 学历要求 */
  required_degree?: number
  /** 最高薪资 */
  max_salary?: string
  /** 最低薪资 */
  min_salary?: string
  /** 工作地点 ID */
  address_id?: string
  /** 需求描述 */
  description?: string
  /** 自定义字段 */
  customized_data_list?: Lark.JobRequirementCustomizedData[]
}
export interface UpdateHireJobRequirementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface ListHireJobRequirementSchemaQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size?: number
}
export interface ListHireJobProcessQuery {
  /** 分页大小, 不能超过 100 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface ListHireRegistrationSchemaQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 登记表适用场景；不填表示获取全部类型信息登记表 */
  scenario?: number
}
export interface ListHireReferralWebsiteJobPostQuery {
  /** 招聘流程类型 */
  process_type?: number
  /** 下一页页码 */
  page_token?: string
  /** 每页获取记录数量，最大10 */
  page_size?: number
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface GetHireReferralWebsiteJobPostQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface GetByApplicationHireReferralQuery {
  /** 投递的 ID */
  application_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateHireExternalApplicationRequest {
  /** 外部系统背调主键 （仅用于幂等） */
  external_id?: string
  /** 职位招聘类型 */
  job_recruitment_type?: number
  /** 职位名称 */
  job_title?: string
  /** 简历来源 */
  resume_source?: string
  /** 阶段 */
  stage?: string
  /** 人才 ID */
  talent_id: string
  /** 终止原因 */
  termination_reason?: string
  /** 投递类型 */
  delivery_type?: number
  /** 更新时间 */
  modify_time?: number
  /** 终止类型 */
  termination_type?: string
}
export interface UpdateHireExternalApplicationRequest {
  /** 外部系统背调主键 （仅用于幂等） */
  external_id?: string
  /** 职位招聘类型 */
  job_recruitment_type?: number
  /** 职位名称 */
  job_title?: string
  /** 简历来源 */
  resume_source?: string
  /** 阶段 */
  stage?: string
  /** 人才 ID */
  talent_id: string
  /** 终止原因 */
  termination_reason?: string
  /** 投递类型 */
  delivery_type?: number
  /** 更新时间 */
  modify_time?: number
  /** 终止类型 */
  termination_type?: string
}
export interface DeleteHireExternalApplicationQuery {
  /** 人才ID */
  talent_id?: string
}
export interface CreateHireExternalInterviewRequest {
  /** 外部系统面试主键 （仅用于幂等） */
  external_id?: string
  /** 外部投递 ID */
  external_application_id: string
  /** 参与状态 */
  participate_status?: number
  /** 开始时间 */
  begin_time?: number
  /** 结束时间 */
  end_time?: number
}
export interface CreateHireExternalInterviewAssessmentRequest {
  /** 外部系统面评主键（仅用于幂等） */
  external_id?: string
  /** 面试官姓名 */
  username?: string
  /** 面试结果 */
  conclusion?: number
  /** 评价维度列表 */
  assessment_dimension_list?: Lark.ExternalInterviewAssessmentDimension[]
  /** 综合记录 */
  content?: string
  /** 外部面试 ID */
  external_interview_id: string
}
export interface CreateHireExternalBackgroundCheckRequest {
  /** 外部系统背调主键 （仅用于幂等） */
  external_id?: string
  /** 外部投递 ID */
  external_application_id: string
  /** 背调日期 */
  date?: number
  /** 背调名字 */
  name?: string
  /** 背调结果 */
  result?: string
  /** 背调附件ID列表 */
  attachment_id_list?: string[]
}
export interface AddToFolderHireTalentRequest {
  /** 人才 ID 列表 */
  talent_id_list?: string[]
  /** 文件夹 ID */
  folder_id?: string
}
export interface ListHireTalentFolderQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size?: number
  /** 用户ID类型 */
  user_id_type?: string
}
export interface BatchGetIdHireTalentRequest {
  /** 手机国家区号，默认值：86，即中国大陆地区 */
  mobile_code?: string
  /** 手机号，区号均采用 mobile_code 参数的值，最多 100 个 */
  mobile_number_list?: string[]
  /** 邮箱信息列表，最多 100 个 */
  email_list?: string[]
  /** 证件类型，可参考招聘枚举常量文档下的 IdentificationType 枚举定义 */
  identification_type?: number
  /** 证件号 */
  identification_number_list?: string[]
}
export interface ListHireTalentQuery {
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
  /** 分页大小, 不能超过 20 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 请求控制参数 */
  query_option?: string
}
export interface GetHireTalentQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
}
export interface CreateHireApplicationRequest {
  /** 人才ID */
  talent_id: string
  /** 职位ID */
  job_id: string
  /** 简历来源 ID，可通过「获取简历来源」接口查询。若简历来源类型属于「员工转岗」或「实习生转正」，人才需处于已入职状态。 */
  resume_source_id?: string
  /** 意向投递城市列表，可从「获取职位信息」返回的工作地点列表获取 */
  application_preferred_city_code_list?: string[]
}
export interface TerminateHireApplicationRequest {
  /** 终止原因的类型 */
  termination_type: number
  /** 终止的具体原因的id列表 */
  termination_reason_list?: string[]
  /** 终止备注 */
  termination_reason_note?: string
}
export interface ListHireApplicationQuery {
  /** 按流程过滤，招聘流程 ID，枚举值通过接口「获取招聘流程信息」接口获取 */
  process_id?: string
  /** 按招聘阶段过滤，招聘阶段 ID，枚举值通过「获取招聘流程信息」接口获取 */
  stage_id?: string
  /** 按人才过滤 */
  talent_id?: string
  /** 按活跃状态筛选 1=活跃投递, 2=非活跃投递, 3=全部 */
  active_status?: string
  /** 职位 ID */
  job_id?: string
  /** 查询游标, 由上一页结果返回, 第一页不传 */
  page_token?: string
  /** 每页限制, 每页最大不超过100 */
  page_size?: number
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
}
export interface ListHireEvaluationQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size?: number
  /** 投递 ID */
  application_id?: string
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
  /** 用户ID类型 */
  user_id_type?: string
}
export interface ListHireQuestionnaireQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size?: number
  /** 投递 ID */
  application_id?: string
  /** 面试 ID */
  interview_id?: string
  /** 最早更新时间 */
  update_start_time?: string
  /** 最晚更新时间 */
  update_end_time?: string
}
export interface ListHireInterviewQuery {
  /** 分页大小，不能超过 100 */
  page_size?: number
  /** 查询游标, 由上一页结果返回, 第一页不传 */
  page_token?: string
  /** 投递 ID */
  application_id?: string
  /** 面试 ID */
  interview_id?: string
  /** 最早开始时间，格式为时间戳 */
  start_time?: string
  /** 最晚开始时间，格式为时间戳 */
  end_time?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateHireOfferRequest {
  /** 投递 ID */
  application_id: string
  /** 模板 ID */
  schema_id: string
  /** Offer 类型 */
  offer_type?: number
  /** Offer 基本信息 */
  basic_info: Lark.OfferBasicInfo
  /** Offer 薪资信息 */
  salary_info?: Lark.OfferSalaryInfo
  /** 自定义信息 */
  customized_info_list?: Lark.OfferCustomizedInfo[]
}
export interface CreateHireOfferQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface UpdateHireOfferRequest {
  /** 模板 ID */
  schema_id: string
  /** Offer 基本信息 */
  basic_info: Lark.OfferBasicInfo
  /** Offer 薪资信息 */
  salary_info?: Lark.OfferSalaryInfo
  /** 自定义信息 */
  customized_info_list?: Lark.OfferCustomizedInfo[]
}
export interface UpdateHireOfferQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface OfferHireApplicationQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface GetHireOfferQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface ListHireOfferQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size?: number
  /** 人才 ID */
  talent_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface OfferStatusHireOfferRequest {
  /** offer状态 */
  offer_status: number
  /** offer 失效时间，当反馈状态是「offer已发出」时为必填项 */
  expiration_date?: string
  /** 终止原因列表，当反馈状态是「候选人已拒绝」时为必填项；最多传入50个 */
  termination_reason_id_list?: string[]
  /** 终止备注 */
  termination_reason_note?: string
}
export interface InternOfferStatusHireOfferRequest {
  /** 更新入/离职状态的操作 */
  operation: string
  /** 入职表单信息（当 operation 为 confirm_onboarding 时，该字段必填） */
  onboarding_info?: Lark.InternOfferOnboardingInfo
  /** 离职表单信息（当 operation 为 offboard 时，该字段必填） */
  offboarding_info?: Lark.InternOfferOffboardingInfo
}
export interface PatchHireEhrImportTaskRequest {
  /** 失败原因 */
  fail_reason?: string
  /** 跳转链接 */
  redirect_url?: string
  /** 状态 */
  state: number
}
export interface TransferOnboardHireApplicationRequest {
  /** 实际入职时间 */
  actual_onboard_time?: number
  /** 预期转正时间 */
  expected_conversion_time?: number
  /** 招聘需求 ID */
  job_requirement_id?: string
  /** 操作人 UserID */
  operator_id?: string
  /** 候选人办公地点 ID ，枚举可通过接口「获取地址列表」获取，将用于候选人内推奖规则判断 */
  onboard_city_code?: string
  /** 候选人入职部门 ID ，枚举可通过接口「获取部门信息列表」获取，将用于候选人内推奖规则判断 */
  department?: string
  /** 候选人直属上级 UserID ，将用于候选人内推奖规则判断 */
  leader?: string
  /** 候选人序列 ID ，枚举可通过接口「获取职务分类列表」获取，将用于候选人内推奖规则判断 */
  sequence?: string
  /** 候选人职级 ID ，枚举可通过接口「获取职级列表」获取，将用于候选人内推奖规则判断 */
  level?: string
  /** 候选人入职人员类型 ID，可通过接口人力资源管理平台「获取员工类型列表」获取，将用于候选人内推奖规则判断 */
  employee_type?: string
}
export interface TransferOnboardHireApplicationQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface PatchHireEmployeeRequest {
  /** 修改状态操作 */
  operation: number
  conversion_info?: Lark.EmployeeConversionInfo
  overboard_info?: Lark.EmployeeOverboardInfo
}
export interface PatchHireEmployeeQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface GetByApplicationHireEmployeeQuery {
  /** 投递ID */
  application_id: string
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface GetHireEmployeeQuery {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: string
}
export interface CreateHireNoteRequest {
  /** 人才ID */
  talent_id: string
  /** 投递ID */
  application_id?: string
  /** 创建人ID */
  creator_id?: string
  /** 内容 */
  content: string
  /** 备注私密属性（默认为公开） */
  privacy?: number
}
export interface CreateHireNoteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchHireNoteRequest {
  /** 备注内容 */
  content: string
}
export interface PatchHireNoteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetHireNoteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListHireNoteQuery {
  /** 每页限制, 每页最大不超过100 */
  page_size?: number
  /** 查询游标, 由上一页结果返回, 第一页不传 */
  page_token?: string
  /** 人才ID */
  talent_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListHireResumeSourceQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface CreateHireEcoAccountCustomFieldRequest {
  /** 适用范围 */
  scope: number
  /** 自定义字段列表 */
  custom_field_list: Lark.EcoAccountCustomFieldData[]
}
export interface BatchUpdateHireEcoAccountCustomFieldRequest {
  /** 适用范围 */
  scope: number
  /** 自定义字段列表 */
  custom_field_list: Lark.EcoAccountCustomFieldData[]
}
export interface BatchDeleteHireEcoAccountCustomFieldRequest {
  /** 适用范围 */
  scope?: number
  /** 要删除的自定义字段的 key 列表 */
  custom_field_key_list?: string[]
}
export interface CreateHireEcoBackgroundCheckCustomFieldRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 自定义字段列表 */
  custom_field_list: Lark.EcoBackgroundCheckCustomFieldData[]
}
export interface BatchUpdateHireEcoBackgroundCheckCustomFieldRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 自定义字段列表 */
  custom_field_list: Lark.EcoBackgroundCheckCustomFieldData[]
}
export interface BatchDeleteHireEcoBackgroundCheckCustomFieldRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
}
export interface CreateHireEcoBackgroundCheckPackageRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 背调套餐列表 */
  package_list: Lark.EcoBackgroundCheckPackageData[]
  /** 附加调查项列表 */
  additional_item_list?: Lark.EcoBackgroundCheckPackageAdditionalItem[]
}
export interface BatchUpdateHireEcoBackgroundCheckPackageRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 背调套餐列表 */
  package_list: Lark.EcoBackgroundCheckPackageData[]
  /** 附加调查项列表 */
  additional_item_list?: Lark.EcoBackgroundCheckPackageAdditionalItem[]
}
export interface BatchDeleteHireEcoBackgroundCheckPackageRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 要删除的套餐 ID 列表，删除套餐不影响已安排的背调 */
  package_id_list?: string[]
  /** 要删除的附加调查项 ID 列表，删除附加调查项不影响已安排的背调 */
  additional_item_id_list?: string[]
}
export interface UpdateProgressHireEcoBackgroundCheckRequest {
  /** 背调 ID，招聘侧的 ID */
  background_check_id: string
  /** 阶段 ID，同一背调订单此 ID 不能重复 */
  stage_id: string
  /** 背调阶段英文名称 */
  stage_en_name?: string
  /** 背调阶段名称 */
  stage_name: string
  /** 进入到此背调阶段的时间 */
  stage_time: string
  /** 阶段性背调结果 */
  result?: string
  /** 报告列表 */
  report_file_list?: Lark.EcoBackgroundCheckReportFile[]
}
export interface UpdateResultHireEcoBackgroundCheckRequest {
  /** 背调 ID */
  background_check_id: string
  /** 背调结果 */
  result: string
  /** 背调结果时间 */
  result_time: string
  /** 报告列表 */
  report_file_list?: Lark.EcoBackgroundCheckReportFile[]
}
export interface CancelHireEcoBackgroundCheckRequest {
  /** 背调 ID */
  background_check_id: string
}
export interface CreateHireEcoExamPaperRequest {
  /** 账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 试卷列表 */
  paper_list: Lark.EcoExamPaperData[]
}
export interface BatchUpdateHireEcoExamPaperRequest {
  /** 账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 试卷列表 */
  paper_list: Lark.EcoExamPaperData[]
}
export interface BatchDeleteHireEcoExamPaperRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 试卷 ID 列表 */
  paper_id_list: string[]
}
export interface LoginInfoHireEcoExamRequest {
  /** 状态码，0-成功 非零-错误码 */
  result?: number
  /** 成功或失败的描述信息 */
  msg?: string
  /** 笔试作答信息 */
  exam_login_info: Lark.EcoExamLoginInfo
}
export interface UpdateResultHireEcoExamRequest {
  /** 笔试结果 */
  result: string
  /** 笔试结果时间 */
  result_time?: string
  /** 报告列表 */
  report_list?: Lark.EcoExamResultReport[]
  /** 详细评价结果 */
  detail_list?: Lark.EcoExamResultDetail[]
}
export interface CreateHireReferralAccountRequest {
  /** 电话 */
  mobile?: Lark.Mobile
  /** 邮箱 */
  email?: string
}
export interface WithdrawHireReferralAccountRequest {
  /** 请求提现的奖励类型 */
  withdraw_bonus_type?: number[]
  /** 提现单ID，请求时由请求方提供，后续关于本次提现操作的交互都以此提现单ID为标识进行，需要保证唯一,用于保证提现的幂等性，传入重复ID会返回对应提现单提取的金额明细 */
  external_order_id?: string
}
export interface ReconciliationHireReferralAccountRequest {
  /** 按时间范围进行对账时 时间段的起始交易时间 */
  start_trans_time?: string
  /** 按时间范围进行对账时 时间段的截止交易时间 */
  end_trans_time?: string
  /** 交易信息 */
  trade_details?: Lark.TradeDetail[]
}
export interface GetHireAttachmentQuery {
  /** 附件类型 */
  type?: number
}
export interface CreateOkrPeriodRequest {
  /** 周期规则 id */
  period_rule_id: string
  /** 周期起始年月 */
  start_month: string
}
export interface PatchOkrPeriodRequest {
  /** 周期显示状态 */
  status: number
}
export interface ListOkrPeriodQuery {
  /** 分页标志page_token */
  page_token?: string
  /** 分页大小，默认10 */
  page_size?: number
}
export interface ListOkrUserOkrQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 请求列表的偏移，offset>=0 */
  offset: string
  /** 列表长度，0-10 */
  limit: string
  /** 请求OKR的语言版本（比如@的人名），lang=en_us/zh_cn */
  lang?: string
  /** period_id列表，最多10个 */
  period_ids?: string[]
}
export interface BatchGetOkrQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** OKR ID 列表，最多10个 */
  okr_ids: string[]
  /** 请求OKR的语言版本（比如@的人名），lang=en_us/zh_cn，请求 Query中 */
  lang?: string
}
export interface CreateOkrProgressRecordRequest {
  /** 进展来源 */
  source_title: string
  /** 进展来源链接 */
  source_url: string
  /** 目标id，与target_type对应 */
  target_id: string
  /** 目标类型 */
  target_type: number
  /** 进展详情 富文本格式 */
  content: Lark.ContentBlock
  /** pc进展来源链接 */
  source_url_pc?: string
  /** mobile进展来源链接 */
  source_url_mobile?: string
}
export interface CreateOkrProgressRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateOkrProgressRecordRequest {
  /** 进展详情 富文本格式 */
  content: Lark.ContentBlock
}
export interface UpdateOkrProgressRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetOkrProgressRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateHumanAuthenticationIdentityRequest {
  /** 姓名 */
  identity_name: string
  /** 身份证号 */
  identity_code: string
  /** 手机号 */
  mobile?: string
}
export interface CreateHumanAuthenticationIdentityQuery {
  /** 用户的唯一标识（使用的ID类型见下一参数描述，不同ID类型的区别和获取，参考文档：[如何获得 User ID、Open ID 和 Union ID？](/ssl:ttdoc/home/user-identity-introduction/how-to-get)） */
  user_id: string
  /** 用户ID类型 open_id/user_id/union_id */
  user_id_type?: string
}
export interface DeleteAcsVisitorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateAcsVisitorRequest {
  /** 访客信息 */
  user: Lark.UserExternal
}
export interface CreateAcsVisitorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeviceBindAcsRuleExternalRequest {
  /** 设备id */
  device_id: string
  /** 权限组id列表 */
  rule_ids: string[]
}
export interface GetAcsRuleExternalQuery {
  /** 设备id */
  device_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteAcsRuleExternalQuery {
  /** 权限组id */
  rule_id: string
}
export interface CreateAcsRuleExternalRequest {
  /** 权限组信息 */
  rule: Lark.Rule
}
export interface CreateAcsRuleExternalQuery {
  /** 权限组id-为空创建,不为空则更新 */
  rule_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface PatchAcsUserRequest {
  /** 用户特征 */
  feature?: Lark.Feature
}
export interface PatchAcsUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetAcsUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListAcsUserQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateAcsUserFaceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetAcsUserFaceQuery {
  /** 裁剪图 */
  is_cropped?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListAcsAccessRecordQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 记录开始时间，单位秒 */
  from: number
  /** 记录结束时间，单位秒，
  时间跨度不能超过30天 */
  to: number
  /** 门禁设备 ID */
  device_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListPerformanceSemesterQuery {
  /** 周期开始时间 */
  start_time?: string
  /** 周期结束时间 */
  end_time?: string
}
export interface FindByUserListPerformanceStageTaskRequest {
  /** 周期ID，可以通过「查询周期」接口获得 */
  semester_id: string
  /** 用户ID列表 */
  user_id_lists: string[]
  /** 任务分类(不传默认包含所有) */
  task_option_lists?: number[]
  /** 查询晚于当前时间截止的环节 */
  after_time?: string
  /** 查询早于当前时间截止的环节 */
  before_time?: string
}
export interface FindByUserListPerformanceStageTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface FindByPagePerformanceStageTaskRequest {
  /** 周期ID，可以通过「查询周期」接口获得 */
  semester_id: string
  /** 任务分类(不传默认包含所有) */
  task_option_lists?: number[]
  /** 查询晚于当前时间截止的环节 */
  after_time?: string
  /** 查询早于当前时间截止的环节 */
  before_time?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface FindByPagePerformanceStageTaskQuery {
  /** 调用结果中用户ID的类型 */
  user_id_type?: string
}
export interface QueryPerformanceReviewDataRequest {
  /** 查询范围的开始日期，毫秒级时间戳，开始日期不能晚于截止日期 */
  start_time: string
  /** 查询范围的截止日期，毫秒级时间戳，截止日期不能早于开始日期 */
  end_time: string
  /** 评估环节类型，目前仅支持上级评估环节和结果沟通环节（不传默认包含所有的环节）

  **可选值有**：
  - `leader_review`：上级评估环节
  - `communication_and_open_result`：结果沟通环节 */
  stage_types: string[]
  /** 评估环节状态（不传默认包含所有的状态）

  **可选值有**：
  - `0`：未开始，任务的开始时间未到达
  - `1`：待完成，任务的开始时间到达而截止时间未到达，且任务未完成
  - `2`：已截止，任务的截止时间已到达，且任务未完成
  - `3`：已完成，任务已完成 */
  stage_progress?: number[]
  /** 评估周期 ID 列表，semester_id 是一个评估周期的唯一标识，可以通过「我的评估」页面 url 获取，也可通过本接口的返回值获取 */
  semester_id_list?: string[]
  /** 被评估人 ID 列表 */
  reviewee_user_id_list: string[]
  /** 环节更新时间晚于，可筛选出在此时间之后，有内容提交的环节数据 */
  updated_later_than?: string
}
export interface QueryPerformanceReviewDataQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateLingoDraftRequest {
  /** 实体词 Id */
  id?: string
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: Lark.OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
  /** 国际化的词条释义 */
  i18n_descs?: Lark.I18nEntryDesc[]
}
export interface CreateLingoDraftQuery {
  /** 词库ID */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateLingoDraftRequest {
  /** 实体词 Id */
  id?: string
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
  /** 国际化的词条释义 */
  i18n_descs?: Lark.I18nEntryDesc[]
}
export interface UpdateLingoDraftQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateLingoEntityRequest {
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: Lark.OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
  /** 国际化的词条释义 */
  i18n_descs?: Lark.I18nEntryDesc[]
}
export interface CreateLingoEntityQuery {
  /** 词库 ID */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateLingoEntityRequest {
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: Lark.OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
  /** 国际化的词条释义 */
  i18n_descs?: Lark.I18nEntryDesc[]
}
export interface UpdateLingoEntityQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface DeleteLingoEntityQuery {
  /** 数据提供方（使用时需要将路径中的词条 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  provider?: string
  /** 外部唯一 id（使用时需要将路径中的词条 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  outer_id?: string
}
export interface GetLingoEntityQuery {
  /** 数据提供方（使用时需要将路径中的实体词 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  provider?: string
  /** 外部唯一 id（使用时需要将路径中的实体词 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  outer_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListLingoEntityQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 数据提供方【可用来过滤数据】 */
  provider?: string
  /** 词库 id */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface MatchLingoEntityRequest {
  /** 实体词主关键词、全称、别名全匹配 */
  word: string
}
export interface MatchLingoEntityQuery {
  /** 词库ID */
  repo_id?: string
}
export interface SearchLingoEntityRequest {
  /** 搜索关键词 */
  query?: string
  /** 分类筛选 */
  classification_filter?: Lark.ClassificationFilter
  /** 词条的创建来源，1：用户主动创建，2：批量导入，3：官方词，4：OpenAPI 创建 */
  sources?: number[]
  /** 创建者 */
  creators?: string[]
}
export interface SearchLingoEntityQuery {
  /** 每页返回的词条量 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 词库ID */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface HighlightLingoEntityRequest {
  /** 需要被识别实体词内容的一句话（不要超过1000字） */
  text: string
}
export interface ListLingoClassificationQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 词库ID */
  repo_id?: string
}
export interface ListDataSecurityAndComplianceOpenapiLogRequest {
  /** 飞书开放平台定义的API */
  api_keys?: string[]
  /** 以秒为单位的起始时间戳 */
  start_time?: number
  /** 以秒为单位的终止时间戳 */
  end_time?: number
  /** 在开发者后台——凭证与基础信息页面查看的app_id（cli_xxx），指调用openapi的应用 */
  app_id?: string
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；当返回的has_more为true时，会返回新的page_token，再次调用接口，传入这个page_token，将获得下一页数据 */
  page_token?: string
}
export interface ListAdminAuditInfoQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 起始时间戳 */
  latest?: number
  /** 终止时间戳 */
  oldest?: number
  /** 事件名称 */
  event_name?: string
  /** 操作者类型 */
  operator_type?: string
  /** 操作者值 */
  operator_value?: string
  /** 模块 */
  event_module?: number
  /** 下一页分页的token */
  page_token?: string
  /** 分页参数 */
  page_size?: number
}
export interface GetMinutesMinuteStatisticsQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetMinutesMinuteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface SearchWorkplaceWorkplaceAccessDataQuery {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 分页大小，最小为 1，最大为 200，默认为 20。 */
  page_size: number
  /** 用于标记当前请求的分页标记，将返回以当前分页标记开始，往后 page_size 个元素。第一次访问接口的时候不需要传。 */
  page_token?: string
}
export interface SearchWorkplaceCustomWorkplaceAccessDataQuery {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 分页大小，最小为 1，最大为 200，默认为 20。 */
  page_size: number
  /** 用于标记当前请求的分页标记，将返回以当前分页标记开始，往后 page_size 个元素。第一次访问接口的时候不需要传。 */
  page_token?: string
  /** 定制化工作台id.非必填,不填的时候,返回所有定制化工作台数据。 */
  custom_workplace_id?: string
}
export interface SearchWorkplaceWorkplaceBlockAccessDataQuery {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd。 */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 分页大小，最小为 1，最大为 200，默认为 20。 */
  page_size: number
  /** 用于标记当前请求的分页标记，将返回以当前分页标记开始，往后 page_size 个元素。第一次访问接口的时候不需要传。 */
  page_token?: string
  /** 小组件id */
  block_id?: string
}
export interface FavouriteApplicationQuery {
  /** 应用信息的语言版本 */
  language?: string
  /** 分页标记,不填表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 单页需求最大个数（最大 100），不传默认10个 */
  page_size?: number
}
export interface RecommendApplicationQuery {
  /** 应用信息的语言版本 */
  language?: string
  /** 推荐应用类型，默认为用户不可移除的推荐应用列表 */
  recommend_type?: string
  /** 分页标记,不填表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 单页需求最大个数（最大 100），不传默认10个 */
  page_size?: number
}
export interface ListApplicationAppRecommendRuleQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface BindMdmUserAuthDataRelationRequest {
  /** 数据类型编码 */
  root_dimension_type: string
  /** 数据编码列表 */
  sub_dimension_types: string[]
  /** 授权人的lark id */
  authorized_user_ids: string[]
  /** uams系统中应用id */
  uams_app_id: string
}
export interface BindMdmUserAuthDataRelationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UnbindMdmUserAuthDataRelationRequest {
  /** 数据类型编码 */
  root_dimension_type: string
  /** 数据编码列表 */
  sub_dimension_types: string[]
  /** 授权人的lark id */
  authorized_user_ids: string[]
  /** uams系统中应用id */
  uams_app_id: string
}
export interface UnbindMdmUserAuthDataRelationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface QueryReportRuleQuery {
  /** 规则名称 */
  rule_name: string
  /** 是否包括已删除，默认未删除 */
  include_deleted?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface RemoveReportRuleViewRequest {
  /** 列表为空删除规则下全用户视图，列表不为空删除指定用户视图，大小限制200。 */
  user_ids?: string[]
}
export interface RemoveReportRuleViewQuery {
  user_id_type?: string
}
export interface QueryReportTaskRequest {
  /** 提交开始时间时间戳 */
  commit_start_time: number
  /** 提交结束时间时间戳 */
  commit_end_time: number
  /** 汇报规则ID */
  rule_id?: string
  /** 用户ID */
  user_id?: string
  /** 分页标识符 */
  page_token: string
  /** 单次分页返回的条数 */
  page_size: number
}
export interface QueryReportTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateAuthenAccessTokenRequest {
  /** 授权类型，**固定值** */
  grant_type: string
  /** 登录预授权码，调用[获取登录预授权码](https://open.feishu.cn/document/ukTMukTMukTM/ukzN4UjL5cDO14SO3gTN)接口获取 */
  code: string
}
export interface CreateAuthenRefreshAccessTokenRequest {
  /** 授权类型，**固定值**： */
  grant_type: string
  /** 刷新 `user_access_token` 需要的凭证<br>获取user_access_token`接口和本接口均返回 `refresh_token`，**每次请求，请注意使用最新获取到的`refresh_token`** */
  refresh_token: string
}
export interface CreateBaikeDraftRequest {
  /** 实体词 Id */
  id?: string
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: Lark.OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}
export interface CreateBaikeDraftQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateBaikeDraftRequest {
  /** 实体词 Id */
  id?: string
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}
export interface UpdateBaikeDraftQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface CreateBaikeEntityRequest {
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: Lark.OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}
export interface CreateBaikeEntityQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface UpdateBaikeEntityRequest {
  /** 词条名 */
  main_keys: Lark.Term[]
  /** 别名 */
  aliases?: Lark.Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: Lark.RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: Lark.OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}
export interface UpdateBaikeEntityQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetBaikeEntityQuery {
  /** 外部系统 */
  provider?: string
  /** 词条在外部系统中对应的唯一 ID */
  outer_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListBaikeEntityQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 相关外部系统【可用来过滤词条数据】 */
  provider?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface MatchBaikeEntityRequest {
  /** 搜索关键词，将与词条名、别名进行精准匹配 */
  word: string
}
export interface SearchBaikeEntityRequest {
  /** 搜索关键词 */
  query?: string
  /** 分类筛选 */
  classification_filter?: Lark.ClassificationFilter
  /** 词条的创建来源，1：用户主动创建，2：批量导入，3：官方词，4：OpenAPI 创建 */
  sources?: number[]
  /** 创建者 */
  creators?: string[]
}
export interface SearchBaikeEntityQuery {
  /** 每页返回的词条量 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface HighlightBaikeEntityRequest {
  /** 需要识别百科词条的内容（不超过1000字） */
  text: string
}
export interface ExtractBaikeEntityRequest {
  /** 需要被提取百科实体词的文本（不会过滤租户已成为百科词条的内容） */
  text?: string
}
export interface ListBaikeClassificationQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}
export interface ListContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 填写该字段表示获取部门下所有用户，选填。 */
  department_id?: string
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
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
  gender?: number
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
  orders?: Lark.UserOrder[]
  /** 自定义属性 */
  custom_attrs?: Lark.UserCustomAttr[]
  /** 企业邮箱 */
  enterprise_email?: string
  /** 职务 */
  job_title?: string
  /** 是否冻结用户 */
  is_frozen?: boolean
}
export interface UpdateContactUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
}
export interface ListContactDepartmentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: string
  /** 父部门的ID，填上获取部门下所有子部门，此处填写的 ID 必须是 department_id_type 指定的 ID。 */
  parent_department_id?: string
  /** 是否递归获取子部门 */
  fetch_child?: boolean
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
}
export interface ListBitableAppTableRecordQuery {
  /** 视图 id

  注意：如 filter 或 sort 有值，view_id 会被忽略。 */
  view_id?: string
  /** 筛选参数

  注意：

  1.筛选记录的表达式不超过2000个字符。

  2.不支持对“人员”以及“关联字段”的属性进行过滤筛选，如人员的 OpenID。

  3.仅支持字段在页面展示字符值进行筛选。

  详细请参考[记录筛选开发指南](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/filter) */
  filter?: string
  /** 排序参数

  注意：

  1.表达式需要不超过1000字符。

  2.不支持对带“公式”和“关联字段”的表的使用。

  3.使用引号将字段名称和顺序逆序连接起来。 */
  sort?: string
  /** 字段名称 */
  field_names?: string
  /** 控制多行文本字段数据的返回格式，true 表示以数组形式返回。

  注意：

  1.多行文本中如果有超链接部分，则会返回链接的 URL。

  2.目前可以返回多行文本中 URL 类型为多维表格链接、飞书 doc、飞书 sheet的URL类型以及@人员的数据结构。 */
  text_field_as_array?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
  /** 控制公式、查找引用是否显示完整的原样返回结果 */
  display_formula_ref?: boolean
  /** 控制是否返回自动计算的字段，例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`，true 表示返回 */
  automatic_fields?: boolean
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
}
export interface ListHireApplicationInterviewQuery {
  /** 分页大小，不能超过 50 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface GetHireJobManagerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface ListCorehrSubregionQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 省份/行政区id，填写后只查询该省份/行政区下的城市/区域 */
  subdivision_id?: string
}
export interface ListCorehrSubdivisionQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
  /** 国家/地区id，填写后只查询该国家/地区下的省份/行政区 */
  country_region_id?: string
}
export interface ListCorehrCountryRegionQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface ListCorehrCurrencyQuery {
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}
export interface GetCorehrPersonQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: string
}
export interface SetCheckboardAccessCodeVcRoomConfigRequest {
  /** 设置节点范围 */
  scope: number
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 有效天数 */
  valid_day: number
}
export interface SetRoomAccessCodeVcRoomConfigRequest {
  /** 设置节点范围 */
  scope: number
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 有效天数 */
  valid_day: number
}
export interface QueryVcRoomConfigQuery {
  /** 查询节点范围 */
  scope: number
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}
export interface SetVcRoomConfigRequest {
  /** 设置节点范围 */
  scope: number
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 会议室设置 */
  room_config: Lark.RoomConfig
}
export interface SetVcRoomConfigQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: string
}

export interface ListEventOutboundIpResponse extends Paginated<string[], 'ip_list'> {}
export interface TenantAccessTokenInternalAuthResponse extends BaseResponse {
  /** 访问 token */
  tenant_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}
export interface AppAccessTokenInternalAuthResponse extends BaseResponse {
  /** 访问 token */
  app_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}
export interface AppAccessTokenAuthResponse extends BaseResponse {
  /** 访问 token */
  app_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}
export interface TenantAccessTokenAuthResponse extends BaseResponse {
  /** 访问 token */
  tenant_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}
export interface CreateAuthenOidcAccessTokenResponse extends Lark.TokenInfo {}
export interface CreateAuthenOidcRefreshAccessTokenResponse extends Lark.TokenInfo {}
export interface GetAuthenUserInfoResponse extends Lark.UserInfo {}
export interface QueryPassportSessionResponse {
  mask_sessions?: Lark.MaskSession[]
}
export interface ListContactScopeResponse extends Paginated<string[], 'department_ids'> {}
export interface CreateContactUserResponse {
  user?: Lark.User
}
export interface PatchContactUserResponse {
  user?: Lark.User
}
export interface GetContactUserResponse {
  user?: Lark.User
}
export interface BatchContactUserResponse {
  /** 查询到的用户信息，其中异常的用户ID不返回结果。 */
  items?: Lark.User[]
}
export interface FindByDepartmentContactUserResponse extends Paginated<Lark.User[], 'items'> {}
export interface BatchGetIdContactUserResponse {
  /** 手机号或者邮箱对应的用户id信息 */
  user_list?: Lark.UserContactInfo[]
}
export interface CreateContactGroupResponse {
  /** 用户组ID */
  group_id: string
}
export interface GetContactGroupResponse {
  /** 用户组详情 */
  group: Lark.Group
}
export interface SimplelistContactGroupResponse extends Paginated<Lark.Group[], 'grouplist'> {}
export interface MemberBelongContactGroupResponse {
  /** 用户组ID列表 */
  group_list?: string[]
  /** 分页查询Token */
  page_token?: string
  /** 是否有更多结果 */
  has_more?: boolean
}
export interface ListContactCustomAttrResponse extends Paginated<Lark.CustomAttr[], 'items'> {}
export interface CreateContactEmployeeTypeEnumResponse {
  /** 创建人员类型接口 */
  employee_type_enum?: Lark.EmployeeTypeEnum
}
export interface UpdateContactEmployeeTypeEnumResponse {
  employee_type_enum?: Lark.EmployeeTypeEnum
}
export interface ListContactEmployeeTypeEnumResponse extends Paginated<Lark.EmployeeTypeEnum[], 'items'> {}
export interface CreateContactDepartmentResponse {
  department?: Lark.Department
}
export interface PatchContactDepartmentResponse {
  department?: Lark.Department
}
export interface UpdateContactDepartmentResponse {
  department?: Lark.Department
}
export interface GetContactDepartmentResponse {
  department?: Lark.Department
}
export interface BatchContactDepartmentResponse {
  /** 查询到的部门信息，其中异常的部门ID不返回结果。 */
  items?: Lark.Department[]
}
export interface ChildrenContactDepartmentResponse extends Paginated<Lark.Department[], 'items'> {}
export interface ParentContactDepartmentResponse extends Paginated<Lark.Department[], 'items'> {}
export interface SearchContactDepartmentResponse extends Paginated<Lark.Department[], 'items'> {}
export interface CreateContactUnitResponse {
  /** 单位的自定义ID */
  unit_id: string
}
export interface ListDepartmentContactUnitResponse {
  /** 单位绑定的部门列表 */
  departmentlist: Lark.UnitDepartment[]
  /** 是否还有分页数据 */
  has_more: boolean
  /** 下次分页请求标记 */
  page_token: string
}
export interface GetContactUnitResponse {
  /** 单位信息 */
  unit: Lark.Unit
}
export interface ListContactUnitResponse {
  /** 单位列表 */
  unitlist: Lark.Unit[]
  /** 是否还有分页数据 */
  has_more: boolean
  /** 分页下次调用的page_token值 */
  page_token: string
}
export interface BatchAddContactGroupMemberResponse {
  /** 成员添加操作结果 */
  results?: Lark.MemberResult[]
}
export interface SimplelistContactGroupMemberResponse {
  /** 成员列表 */
  memberlist: Lark.Memberlist[]
  /** 下次分页获取的page_token */
  page_token: string
  /** 是否还需要分页获取 */
  has_more: boolean
}
export interface CreateContactFunctionalRoleResponse {
  /** 角色ID，在单租户下唯一 */
  role_id: string
}
export interface BatchCreateContactFunctionalRoleMemberResponse {
  /** 批量新增角色成员结果集 */
  results?: Lark.FunctionalRoleMemberResult[]
}
export interface BatchDeleteContactFunctionalRoleMemberResponse {
  /** 批量新增角色成员结果集 */
  result?: Lark.FunctionalRoleMemberResult[]
}
export interface ScopesContactFunctionalRoleMemberResponse {
  /** 批量更新角色成员管理范围结果集 */
  results?: Lark.FunctionalRoleMemberResult[]
}
export interface GetContactFunctionalRoleMemberResponse {
  /** 成员的管理范围 */
  member?: Lark.FunctionalRoleMember
}
export interface ListContactFunctionalRoleMemberResponse extends Paginated<Lark.FunctionalRoleMember[], 'members'> {}
export interface CreateContactJobLevelResponse {
  /** 职级信息 */
  job_level?: Lark.JobLevel
}
export interface UpdateContactJobLevelResponse {
  /** 职级信息 */
  job_level?: Lark.JobLevel
}
export interface GetContactJobLevelResponse {
  /** 职级信息 */
  job_level?: Lark.JobLevel
}
export interface ListContactJobLevelResponse extends Paginated<Lark.JobLevel[], 'items'> {}
export interface CreateContactJobFamilyResponse {
  /** 序列信息 */
  job_family?: Lark.JobFamily
}
export interface UpdateContactJobFamilyResponse {
  /** 更新后的序列信息 */
  job_family?: Lark.JobFamily
}
export interface GetContactJobFamilyResponse {
  /** 序列信息 */
  job_family?: Lark.JobFamily
}
export interface ListContactJobFamilyResponse extends Paginated<Lark.JobFamily[], 'items'> {}
export interface GetContactJobTitleResponse {
  /** 职务信息 */
  job_title?: Lark.JobTitle
}
export interface ListContactJobTitleResponse extends Paginated<Lark.JobTitle[], 'items'> {}
export interface GetContactWorkCityResponse {
  /** 工作城市信息 */
  work_city?: Lark.WorkCity
}
export interface ListContactWorkCityResponse extends Paginated<Lark.WorkCity[], 'items'> {}
export interface CreateImMessageResponse extends Lark.Message {}
export interface ReplyImMessageResponse extends Lark.Message {}
export interface UpdateImMessageResponse extends Lark.Message {}
export interface ForwardImMessageResponse extends Lark.Message {}
export interface MergeForwardImMessageResponse {
  /** 合并转发生成的新消息 */
  message?: Lark.Message
  /** 无效的消息ID列表 */
  invalid_message_id_list?: string[]
}
export interface ForwardImThreadResponse extends Lark.Message {}
export interface ReadUsersImMessageResponse {
  /** read_user[] */
  items?: Lark.ReadUser[]
  /** 是否还有下一页 */
  has_more: boolean
  /** 下一页分页的token */
  page_token?: string
}
export interface ListImMessageResponse extends Paginated<Lark.Message[], 'items'> {}
export interface GetImMessageResponse {
  /** message[] */
  items?: Lark.Message[]
}
export interface UrgentAppImMessageResponse {
  /** 无效的用户id */
  invalid_user_id_list: string[]
}
export interface UrgentSmsImMessageResponse {
  /** 无效的用户id */
  invalid_user_id_list: string[]
}
export interface UrgentPhoneImMessageResponse {
  /** 无效的用户id */
  invalid_user_id_list: string[]
}
export interface ReadUserImBatchMessageResponse {
  read_user?: Lark.BatchMessageReadUser
}
export interface GetProgressImBatchMessageResponse {
  /** 消息发送进度 */
  batch_message_send_progress?: Lark.BatchMessageSendProgress
  /** 消息撤回进度 */
  batch_message_recall_progress?: Lark.BatchMessageRecallProgress
}
export interface CreateImImageResponse {
  /** 图片的key */
  image_key?: string
}
export interface CreateImFileResponse {
  /** 文件的key */
  file_key?: string
}
export interface CreateImMessageReactionResponse extends Lark.MessageReaction {}
export interface DeleteImMessageReactionResponse extends Lark.MessageReaction {}
export interface ListImMessageReactionResponse extends Paginated<Lark.MessageReaction[], 'items'> {}
export interface CreateImPinResponse {
  pin?: Lark.Pin
}
export interface ListImPinResponse extends Paginated<Lark.Pin[], 'items'> {}
export interface CreateImChatResponse {
  /** 群ID */
  chat_id?: string
  /** 群头像URL */
  avatar?: string
  /** 群名称 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: Lark.I18nNames
  /** 群主 ID */
  owner_id?: string
  /** 群主 ID 类型 */
  owner_id_type?: string
  /** 谁可以加急 */
  urgent_setting?: string
  /** 谁可以发起视频会议 */
  video_conference_setting?: string
  /** 加user/bot入群权限(all_members/only_owner) */
  add_member_permission?: string
  /** 群分享权限(allowed/not_allowed) */
  share_card_permission?: string
  /** at所有人权限(all_members/only_owner) */
  at_all_permission?: string
  /** 群编辑权限(all_members/only_owner) */
  edit_permission?: string
  /** 群模式 */
  chat_mode?: string
  /** 群类型 */
  chat_type?: string
  /** 优先级最高的一个群tag */
  chat_tag?: string
  /** 是否是外部群 */
  external?: boolean
  /** tenant key */
  tenant_key?: string
  /** 入群消息可见性 */
  join_message_visibility?: string
  /** 出群消息可见性 */
  leave_message_visibility?: string
  /** 加群审批 */
  membership_approval?: string
  /** 发言权限 */
  moderation_permission?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: Lark.RestrictedModeSetting
}
export interface GetImChatResponse {
  /** 群头像URL */
  avatar?: string
  /** 群名称 */
  name?: string
  /** 群描述 */
  description?: string
  /** 群国际化名称 */
  i18n_names?: Lark.I18nNames
  /** 加user/bot入群权限(all_members/only_owner) */
  add_member_permission?: string
  /** 群分享权限(allowed/not_allowed) */
  share_card_permission?: string
  /** at所有人权限(all_members/only_owner) */
  at_all_permission?: string
  /** 群编辑权限(all_members/only_owner) */
  edit_permission?: string
  /** 群主ID的类型(open_id/user_id/union_id) */
  owner_id_type?: string
  /** 群主ID */
  owner_id?: string
  /** 用户管理员列表 */
  user_manager_id_list?: string[]
  /** 机器人管理员列表 */
  bot_manager_id_list?: string[]
  /** 群模式 */
  chat_mode?: string
  /** 群类型 */
  chat_type?: string
  /** 优先级最高的一个群tag */
  chat_tag?: string
  /** 入群消息可见性 */
  join_message_visibility?: string
  /** 出群消息可见性 */
  leave_message_visibility?: string
  /** 加群审批 */
  membership_approval?: string
  /** 发言权限 */
  moderation_permission?: string
  /** 是否是外部群 */
  external?: boolean
  /** tenant key */
  tenant_key?: string
  /** 群成员人数 */
  user_count?: string
  /** 群机器人数 */
  bot_count?: string
  /** 防泄密模式设置 */
  restricted_mode_setting?: Lark.RestrictedModeSetting
  /** 谁可以加急 */
  urgent_setting?: string
  /** 谁可以发起视频会议 */
  video_conference_setting?: string
}
export interface ListImChatResponse extends Paginated<Lark.ListChat[], 'items'> {}
export interface SearchImChatResponse extends Paginated<Lark.ListChat[], 'items'> {}
export interface GetImChatModerationResponse extends Paginated<Lark.ListModerator[], 'items'> {}
export interface LinkImChatResponse {
  /** 群分享链接 */
  share_link?: string
  /** 分享链接过期时间戳（秒级） */
  expire_time?: string
  /** 分享链接是否永久有效 */
  is_permanent?: boolean
}
export interface AddManagersImChatManagersResponse {
  /** 群目前的管理员id */
  chat_managers?: string[]
  /** 群目前的管理员bot id */
  chat_bot_managers?: string[]
}
export interface DeleteManagersImChatManagersResponse {
  /** 群目前的管理员id */
  chat_managers?: string[]
  /** 群目前的管理员bot id */
  chat_bot_managers?: string[]
}
export interface CreateImChatMembersResponse {
  /** ID无效的成员列表 */
  invalid_id_list?: string[]
  /** ID不存在的成员列表 */
  not_existed_id_list?: string[]
  /** 等待群主或管理员审批的成员ID列表 */
  pending_approval_id_list?: string[]
}
export interface DeleteImChatMembersResponse {
  /** 无效成员列表 */
  invalid_id_list?: string[]
}
export interface GetImChatMembersResponse extends Paginated<Lark.ListMember[], 'items'> {}
export interface IsInChatImChatMembersResponse {
  /** 用户或者机器人是否在群中 */
  is_in_chat?: boolean
}
export interface GetImChatAnnouncementResponse {
  /** CCM 文档序列化信息 */
  content?: string
  /** 文档当前版本号 纯数字 */
  revision?: string
  /** 文档生成的时间戳（秒） */
  create_time?: string
  /** 消息更新的时间戳（秒） */
  update_time?: string
  /** 文档所有者id类型， open_id/user_id/union_id/app_id */
  owner_id_type?: string
  /** 文档所有者id */
  owner_id?: string
  /** 文档最新修改者id类型， open_id/user_id/union_id/app_id */
  modifier_id_type?: string
  /** 文档最新修改者id */
  modifier_id?: string
}
export interface CreateImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: Lark.ChatTab[]
}
export interface DeleteTabsImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: Lark.ChatTab[]
}
export interface UpdateTabsImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: Lark.ChatTab[]
}
export interface SortTabsImChatTabResponse {
  /** 群标签列表 */
  chat_tabs?: Lark.ChatTab[]
}
export interface ListTabsImChatTabResponse {
  /** 会话标签页 */
  chat_tabs?: Lark.ChatTab[]
}
export interface CreateImChatMenuTreeResponse {
  /** 追加后群内现有菜单 */
  menu_tree?: Lark.ChatMenuTree
}
export interface DeleteImChatMenuTreeResponse {
  /** 群内现有菜单 */
  menu_tree?: Lark.ChatMenuTree
}
export interface PatchImChatMenuItemResponse {
  chat_menu_item?: Lark.ChatMenuItem
}
export interface SortImChatMenuTreeResponse {
  /** 排序后群内菜单 */
  menu_tree?: Lark.ChatMenuTree
}
export interface GetImChatMenuTreeResponse {
  /** 群内所有菜单 */
  menu_tree?: Lark.ChatMenuTree
}
export interface ListDrivev1FileResponse extends Paginated<Lark.File[], 'files'> {}
export interface CreateFolderDrivev1FileResponse {
  /** 创建文件夹的token */
  token?: string
  /** 创建文件夹的访问url */
  url?: string
}
export interface BatchQueryDrivev1MetaResponse {
  metas: Lark.Meta[]
  failed_list?: Lark.MetaFailed[]
}
export interface GetDrivev1FileStatisticsResponse {
  /** 文档token */
  file_token?: string
  /** 文档类型 */
  file_type?: string
  /** 文档统计信息 */
  statistics?: Lark.FileStatistics
}
export interface CopyDrivev1FileResponse {
  /** 复制后的文件资源 */
  file?: Lark.File
}
export interface MoveDrivev1FileResponse {
  /** 异步任务id，移动文件夹时返回 */
  task_id?: string
}
export interface DeleteDrivev1FileResponse {
  /** 异步任务id，删除文件夹时返回 */
  task_id?: string
}
export interface CreateShortcutDrivev1FileResponse {
  /** 返回创建成功的shortcut节点 */
  succ_shortcut_node?: Lark.File
}
export interface TaskCheckDrivev1FileResponse {
  /** 异步任务的执行状态 */
  status?: string
}
export interface UploadAllDrivev1MediaResponse {
  file_token?: string
}
export interface BatchGetTmpDownloadUrlDrivev1MediaResponse {
  /** 临时下载列表 */
  tmp_download_urls?: Lark.TmpDownloadUrl[]
}
export interface UploadPrepareDrivev1MediaResponse {
  /** 分片上传事务ID */
  upload_id?: string
  /** 分片大小策略 */
  block_size?: number
  /** 分片数量 */
  block_num?: number
}
export interface UploadFinishDrivev1MediaResponse {
  file_token?: string
}
export interface UploadAllDrivev1FileResponse {
  file_token?: string
}
export interface UploadPrepareDrivev1FileResponse {
  /** 分片上传事务ID */
  upload_id?: string
  /** 分片大小策略 */
  block_size?: number
  /** 分片数量 */
  block_num?: number
}
export interface UploadFinishDrivev1FileResponse {
  file_token?: string
}
export interface CreateDrivev1ImportTaskResponse {
  /** 导入任务ID */
  ticket?: string
}
export interface GetDrivev1ImportTaskResponse {
  result?: Lark.ImportTask
}
export interface CreateDrivev1ExportTaskResponse {
  /** 导出任务ID */
  ticket?: string
}
export interface GetDrivev1ExportTaskResponse {
  /** 导出结果 */
  result?: Lark.ExportTask
}
export interface ListDrivev1FileViewRecordResponse extends Paginated<Lark.FileViewRecord[], 'items'> {}
export interface CreateDrivev1FileVersionResponse extends Lark.Version {}
export interface GetDrivev1FileVersionResponse extends Lark.Version {}
export interface ListDrivev1FileVersionResponse extends Paginated<Lark.Version[], 'items'> {}
export interface AuthDrivev1PermissionMemberResponse {
  /** 是否有权限 */
  auth_result: boolean
}
export interface ListDrivev1PermissionMemberResponse {
  /** 返回的列表数据 */
  items?: Lark.Member[]
}
export interface CreateDrivev1PermissionMemberResponse {
  /** 本次添加权限的用户信息 */
  member?: Lark.BaseMember
}
export interface UpdateDrivev1PermissionMemberResponse {
  /** 本次更新权限的用户信息 */
  member?: Lark.BaseMember
}
export interface CreateDrivev1PermissionPublicPasswordResponse {
  /** 密码 */
  password?: string
}
export interface UpdateDrivev1PermissionPublicPasswordResponse {
  /** 密码 */
  password?: string
}
export interface GetDrivev1PermissionPublicResponse {
  /** 返回的文档公共设置 */
  permission_public?: Lark.PermissionPublic
}
export interface PatchDrivev1PermissionPublicResponse {
  /** 本次更新后的文档公共设置 */
  permission_public?: Lark.PermissionPublic
}
export interface GetDrivev2PermissionPublicResponse {
  /** 返回的文档公共设置 */
  permission_public?: Lark.PermissionPublic
}
export interface PatchDrivev2PermissionPublicResponse {
  /** 本次更新后文档公共设置 */
  permission_public?: Lark.PermissionPublic
}
export interface ListDrivev1FileCommentResponse extends Paginated<Lark.FileComment[], 'items'> {}
export interface BatchQueryDrivev1FileCommentResponse {
  /** 评论的相关信息、回复的信息、回复分页的信息 */
  items?: Lark.FileComment[]
}
export interface CreateDrivev1FileCommentResponse extends Lark.FileComment {}
export interface GetDrivev1FileCommentResponse extends Lark.FileComment {}
export interface ListDrivev1FileCommentReplyResponse extends Paginated<Lark.FileCommentReply[], 'items'> {}
export interface GetDocxDocumentResponse {
  /** 文档信息 */
  document?: Lark.Document
}
export interface RawContentDocxDocumentResponse {
  /** 文档纯文本 */
  content?: string
}
export interface ListDocxDocumentBlockResponse extends Paginated<Lark.Block[], 'items'> {}
export interface CreateDocxDocumentResponse {
  /** 新建文档的文档信息 */
  document?: Lark.Document
}
export interface GetDocxDocumentBlockResponse {
  /** 查询的 Block 的信息 */
  block?: Lark.Block
}
export interface GetDocxDocumentBlockChildrenResponse extends Paginated<Lark.Block[], 'items'> {}
export interface CreateDocxDocumentBlockChildrenResponse {
  /** 所添加的孩子的 Block 信息 */
  children?: Lark.Block[]
  /** 当前 block children 创建成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}
export interface PatchDocxDocumentBlockResponse {
  /** 更新后的 block 信息 */
  block?: Lark.Block
  /** 当前更新成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}
export interface BatchUpdateDocxDocumentBlockResponse {
  /** 批量更新的 Block */
  blocks?: Lark.Block[]
  /** 当前更新成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}
export interface BatchDeleteDocxDocumentBlockChildrenResponse {
  /** 当前删除操作成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}
export interface ListBoardWhiteboardNodeResponse {
  /** 查询结果 */
  nodes?: Lark.WhiteboardNode[]
}
export interface GetSheetsSpreadsheetResponse {
  spreadsheet?: Lark.GetSpreadsheet
}
export interface CreateSheetsSpreadsheetResponse {
  /** 表格信息 */
  spreadsheet?: Lark.Spreadsheet
}
export interface GetSheetsSpreadsheetSheetResponse {
  sheet?: Lark.Sheet
}
export interface QuerySheetsSpreadsheetSheetResponse {
  /** 工作表信息 */
  sheets?: Lark.Sheet[]
}
export interface FindSheetsSpreadsheetSheetResponse {
  /** 查找返回符合条件的信息 */
  find_result?: Lark.FindReplaceResult
}
export interface ReplaceSheetsSpreadsheetSheetResponse {
  /** 符合查找条件并替换的单元格信息 */
  replace_result?: Lark.FindReplaceResult
}
export interface GetSheetsSpreadsheetSheetFilterResponse {
  sheet_filter_info?: Lark.SheetFilterInfo
}
export interface GetSheetsSpreadsheetSheetFilterViewResponse {
  /** 筛选视图信息，包括 id、name、range */
  filter_view?: Lark.FilterView
}
export interface QuerySheetsSpreadsheetSheetFilterViewResponse {
  /** 子表的所有筛选视图信息，id、name、range */
  items?: Lark.FilterView[]
}
export interface CreateSheetsSpreadsheetSheetFilterViewResponse {
  /** 创建的筛选视图的 id 、name、range */
  filter_view?: Lark.FilterView
}
export interface PatchSheetsSpreadsheetSheetFilterViewResponse {
  /** 更新后的筛选视图的 id 、name、range */
  filter_view?: Lark.FilterView
}
export interface GetSheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 筛选的条件 */
  condition?: Lark.FilterViewCondition
}
export interface QuerySheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 筛选视图设置的所有筛选条件 */
  items?: Lark.FilterViewCondition[]
}
export interface CreateSheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 创建的筛选条件 */
  condition?: Lark.FilterViewCondition
}
export interface UpdateSheetsSpreadsheetSheetFilterViewConditionResponse {
  /** 更新后的筛选条件 */
  condition?: Lark.FilterViewCondition
}
export interface GetSheetsSpreadsheetSheetFloatImageResponse {
  float_image?: Lark.FloatImage
}
export interface QuerySheetsSpreadsheetSheetFloatImageResponse {
  /** 子表的所有浮动图片信息 */
  items?: Lark.FloatImage[]
}
export interface CreateSheetsSpreadsheetSheetFloatImageResponse {
  float_image?: Lark.FloatImage
}
export interface PatchSheetsSpreadsheetSheetFloatImageResponse {
  float_image?: Lark.FloatImage
}
export interface CopyBitableAppResponse {
  app?: Lark.App
}
export interface CreateBitableAppResponse {
  app?: Lark.App
}
export interface GetBitableAppResponse {
  app?: Lark.DisplayApp
}
export interface UpdateBitableAppResponse {
  app?: Lark.DisplayAppV2
}
export interface CreateBitableAppTableResponse {
  /** 数据表的唯一标识id */
  table_id?: string
  /** 默认表格视图的id，该字段仅在请求参数中填写了default_view_name或fields才会返回 */
  default_view_id?: string
  /** 数据表初始字段的id列表，该字段仅在请求参数中填写了fields才会返回 */
  field_id_list?: string[]
}
export interface BatchCreateBitableAppTableResponse {
  table_ids?: string[]
}
export interface PatchBitableAppTableResponse {
  /** 数据表的名称 */
  name?: string
}
export interface ListBitableAppTableResponse extends Paginated<Lark.AppTable[], 'items'> {}
export interface CopyBitableAppDashboardResponse {
  /** 多维表格 block_id */
  block_id?: string
  /** block 名称 */
  name?: string
}
export interface ListBitableAppDashboardResponse extends Paginated<Lark.AppDashboard[], 'dashboards'> {}
export interface PatchBitableAppTableViewResponse {
  view?: Lark.AppTableView
}
export interface GetBitableAppTableViewResponse {
  view?: Lark.AppTableView
}
export interface ListBitableAppTableViewResponse extends Paginated<Lark.AppTableView[], 'items'> {}
export interface CreateBitableAppTableViewResponse {
  view?: Lark.AppTableView
}
export interface PatchBitableAppTableFormResponse {
  /** 表单元数据信息 */
  form: Lark.AppTableForm
}
export interface GetBitableAppTableFormResponse {
  /** 表单元数据信息 */
  form: Lark.AppTableForm
}
export interface PatchBitableAppTableFormFieldResponse {
  /** 更新后的field值 */
  field?: Lark.AppTableFormPatchedField
}
export interface ListBitableAppTableFormFieldResponse extends Paginated<Lark.AppTableFormField[], 'items'> {}
export interface GetBitableAppTableRecordResponse {
  record?: Lark.AppTableRecord
}
export interface SearchBitableAppTableRecordResponse extends Paginated<Lark.AppTableRecord[], 'items'> {}
export interface CreateBitableAppTableRecordResponse {
  record?: Lark.AppTableRecord
}
export interface UpdateBitableAppTableRecordResponse {
  record?: Lark.AppTableRecord
}
export interface DeleteBitableAppTableRecordResponse extends Lark.DeleteRecord {}
export interface BatchCreateBitableAppTableRecordResponse {
  /** 本次请求新增的记录列表 */
  records?: Lark.AppTableRecord[]
}
export interface BatchUpdateBitableAppTableRecordResponse {
  /** 更新后的记录 */
  records?: Lark.AppTableRecord[]
}
export interface BatchDeleteBitableAppTableRecordResponse {
  /** 记录删除结果 */
  records?: Lark.DeleteRecord[]
}
export interface ListBitableAppTableFieldResponse extends Paginated<Lark.AppTableFieldForList[], 'items'> {}
export interface CreateBitableAppTableFieldResponse {
  field?: Lark.AppTableField
}
export interface UpdateBitableAppTableFieldResponse {
  field?: Lark.AppTableField
}
export interface DeleteBitableAppTableFieldResponse {
  /** 字段唯一标识id */
  field_id?: string
  /** 是否已删除 */
  deleted?: boolean
}
export interface ListBitableAppRoleResponse extends Paginated<Lark.AppRole[], 'items'> {}
export interface CreateBitableAppRoleResponse {
  role?: Lark.AppRole
}
export interface UpdateBitableAppRoleResponse {
  role?: Lark.AppRole
}
export interface ListBitableAppRoleMemberResponse extends Paginated<Lark.AppRoleMember[], 'items'> {}
export interface ListWikiSpaceResponse extends Paginated<Lark.Space[], 'items'> {}
export interface GetWikiSpaceResponse {
  space?: Lark.Space
}
export interface CreateWikiSpaceResponse {
  space?: Lark.Space
}
export interface CreateWikiSpaceMemberResponse {
  member?: Lark.Member
}
export interface DeleteWikiSpaceMemberResponse {
  /** 成员信息 */
  member: Lark.Member
}
export interface UpdateWikiSpaceSettingResponse {
  setting?: Lark.Setting
}
export interface CreateWikiSpaceNodeResponse {
  node?: Lark.Node
}
export interface GetNodeWikiSpaceResponse {
  /** 节点信息 */
  node?: Lark.Node
}
export interface ListWikiSpaceNodeResponse extends Paginated<Lark.Node[], 'items'> {}
export interface MoveWikiSpaceNodeResponse {
  /** 移动后的节点信息 */
  node?: Lark.Node
}
export interface CopyWikiSpaceNodeResponse {
  /** copy后的节点 */
  node: Lark.Node
}
export interface MoveDocsToWikiWikiSpaceNodeResponse {
  /** 移动后的知识库token */
  wiki_token?: string
  /** 任务id */
  task_id?: string
  /** 是否提交了文档迁入申请 */
  applied?: boolean
}
export interface GetWikiTaskResponse {
  /** 任务结果 */
  task: Lark.TaskResult
}
export interface SearchWikiNodeResponse extends Paginated<Lark.Node[], 'items'> {}
export interface GetDrivev1FileSubscriptionResponse {
  /** 文档订阅信息 */
  subscription?: Lark.FileSubscription
}
export interface CreateDrivev1FileSubscriptionResponse {
  /** 本次增加的文档订阅信息 */
  subscription?: Lark.FileSubscription
}
export interface PatchDrivev1FileSubscriptionResponse {
  /** 本次修改的文档订阅信息 */
  subscription?: Lark.FileSubscription
}
export interface CreateCalendarResponse {
  calendar?: Lark.Calendar
}
export interface PrimaryCalendarResponse {
  /** 主日历列表 */
  calendars?: Lark.UserCalendar[]
}
export interface GetCalendarResponse extends Lark.Calendar {}
export interface ListCalendarFreebusyResponse {
  /** 日历上请求时间区间内的忙闲信息 */
  freebusy_list?: Lark.Freebusy[]
}
export interface ListCalendarResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下次请求需要带上的分页标记，90 天有效期 */
  page_token?: string
  /** 下次请求需要带上的增量同步标记，90 天有效期 */
  sync_token?: string
  /** 分页加载的日历数据列表 */
  calendar_list?: Lark.Calendar[]
}
export interface PatchCalendarResponse {
  calendar?: Lark.Calendar
}
export interface SearchCalendarResponse extends Paginated<Lark.Calendar[], 'items'> {}
export interface SubscribeCalendarResponse {
  calendar?: Lark.Calendar
}
export interface CreateCalendarCalendarAclResponse extends Lark.CalendarAcl {}
export interface ListCalendarCalendarAclResponse extends Paginated<Lark.CalendarAcl[], 'acls'> {}
export interface CreateCalendarCalendarEventResponse {
  event?: Lark.CalendarEvent
}
export interface PatchCalendarCalendarEventResponse {
  event?: Lark.CalendarEvent
}
export interface GetCalendarCalendarEventResponse {
  event?: Lark.CalendarEvent
}
export interface ListCalendarCalendarEventResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下次请求需要带上的分页标记，90 天有效期 */
  page_token?: string
  /** 下次请求需要带上的增量同步标记，90 天有效期 */
  sync_token?: string
  /** 日程列表 */
  items?: Lark.CalendarEvent[]
}
export interface SearchCalendarCalendarEventResponse extends Paginated<Lark.CalendarEvent[], 'items'> {}
export interface InstancesCalendarCalendarEventResponse {
  /** instances实例 */
  items?: Lark.Instance[]
  page_token?: string
  has_more?: boolean
}
export interface InstanceViewCalendarCalendarEventResponse {
  /** 日程instance列表 */
  items?: Lark.Instance[]
}
export interface CreateCalendarCalendarEventMeetingChatResponse {
  /** 会议群ID */
  meeting_chat_id?: string
  /** 群分享链接 */
  applink?: string
}
export interface CreateCalendarTimeoffEventResponse extends Lark.TimeoffEvent {}
export interface CreateCalendarCalendarEventAttendeeResponse {
  /** 被添加的参与人列表 */
  attendees?: Lark.CalendarEventAttendee[]
}
export interface ListCalendarCalendarEventAttendeeResponse extends Paginated<Lark.CalendarEventAttendee[], 'items'> {}
export interface ListCalendarCalendarEventAttendeeChatMemberResponse extends Paginated<Lark.CalendarEventAttendeeChatMember[], 'items'> {}
export interface GenerateCaldavConfCalendarSettingResponse {
  /** caldav密码 */
  password?: string
  /** caldav用户名 */
  user_name?: string
  /** 服务器地址 */
  server_address?: string
  /** 设备名 */
  device_name?: string
}
export interface CreateCalendarExchangeBindingResponse extends Lark.ExchangeBinding {}
export interface GetCalendarExchangeBindingResponse extends Lark.ExchangeBinding {}
export interface ApplyVcReserveResponse {
  reserve?: Lark.Reserve
  reserve_correction_check_info?: Lark.ReserveCorrectionCheckInfo
}
export interface UpdateVcReserveResponse {
  reserve?: Lark.Reserve
  reserve_correction_check_info?: Lark.ReserveCorrectionCheckInfo
}
export interface GetVcReserveResponse {
  reserve?: Lark.Reserve
}
export interface GetActiveMeetingVcReserveResponse {
  meeting?: Lark.Meeting
}
export interface InviteVcMeetingResponse {
  /** 邀请结果 */
  invite_results?: Lark.MeetingInviteStatus[]
}
export interface KickoutVcMeetingResponse {
  /** 踢出结果 */
  kickout_results?: Lark.MeetingParticipantResult[]
}
export interface SetHostVcMeetingResponse {
  /** 会中当前主持人 */
  host_user?: Lark.MeetingUser
}
export interface GetVcMeetingResponse {
  meeting?: Lark.Meeting
}
export interface ListByNoVcMeetingResponse extends Paginated<Lark.Meeting[], 'meeting_briefs'> {}
export interface GetVcMeetingRecordingResponse {
  recording?: Lark.MeetingRecording
}
export interface GetDailyVcReportResponse {
  /** 会议报告 */
  meeting_report?: Lark.Report
}
export interface GetTopUserVcReportResponse {
  /** top用户列表 */
  top_user_report?: Lark.ReportTopUser[]
}
export interface MeetingListVcExportResponse {
  /** 任务id */
  task_id?: string
}
export interface ParticipantListVcExportResponse {
  /** 任务id */
  task_id?: string
}
export interface ParticipantQualityListVcExportResponse {
  /** 任务id */
  task_id?: string
}
export interface ResourceReservationListVcExportResponse {
  /** 任务id */
  task_id?: string
}
export interface GetVcExportResponse {
  /** 任务状态 */
  status: number
  /** 文件下载地址 */
  url?: string
  /** 文件token */
  file_token?: string
  /** 失败信息 */
  fail_msg?: string
}
export interface CreateVcRoomLevelResponse {
  room_level?: Lark.RoomLevel
}
export interface GetVcRoomLevelResponse {
  room_level?: Lark.RoomLevel
}
export interface MgetVcRoomLevelResponse {
  items?: Lark.RoomLevel[]
}
export interface ListVcRoomLevelResponse extends Paginated<Lark.RoomLevel[], 'items'> {}
export interface SearchVcRoomLevelResponse {
  /** 层级id列表 */
  level_ids?: string[]
}
export interface CreateVcRoomResponse {
  room?: Lark.Room
}
export interface GetVcRoomResponse {
  room?: Lark.Room
}
export interface MgetVcRoomResponse {
  items?: Lark.Room[]
}
export interface ListVcRoomResponse extends Paginated<Lark.Room[], 'rooms'> {}
export interface SearchVcRoomResponse {
  /** 会议室列表 */
  rooms?: Lark.Room[]
  /** 下一页分页的token，下次请求时传入 */
  page_token?: string
  /** 是否还有数据 */
  has_more?: boolean
}
export interface GetVcScopeConfigResponse {
  /** 当前节点的配置，根据层级顺序从底向上进行合并计算后的结果；如果当前节点某个值已配置，则取该节点的值，否则会从该节点的父层级节点获取，如果父节点依然未配置，则继续向上递归获取；若所有节点均未配置，则该值返回为空 */
  current_config?: Lark.ScopeConfig
  /** 所有节点的原始配置，按照层级顺序从底向上返回；如果某节点某个值未配置，则该值返回为空 */
  origin_configs?: Lark.ScopeConfig[]
}
export interface ReserveScopeVcReserveConfigResponse {
  /** 预定审批设置 */
  approve_config?: Lark.ApprovalConfig
  /** 预定时间设置 */
  time_config?: Lark.TimeConfig
  /** 预定范围设置 */
  reserve_scope_config?: Lark.ReserveScopeConfig
}
export interface GetVcReserveConfigFormResponse {
  /** 预定表单 */
  reserve_form_config: Lark.ReserveFormConfig
}
export interface GetVcReserveConfigAdminResponse {
  /** 预定管理员/部门 */
  reserve_admin_config: Lark.ReserveAdminConfig
}
export interface GetVcReserveConfigDisableInformResponse {
  /** 会议室禁用通知配置 */
  disable_inform?: Lark.DisableInformConfig
}
export interface GetVcMeetingListResponse extends Paginated<Lark.MeetingInfo[], 'meeting_list'> {}
export interface GetVcParticipantListResponse extends Paginated<Lark.Participant[], 'participants'> {}
export interface GetVcParticipantQualityListResponse extends Paginated<Lark.ParticipantQuality[], 'participant_quality_list'> {}
export interface GetVcResourceReservationListResponse extends Paginated<Lark.RoomMeetingReservation[], 'room_reservation_list'> {}
export interface ListVcAlertResponse extends Paginated<Lark.Alert[], 'items'> {}
export interface CreateAttendanceShiftResponse {
  /** 班次 */
  shift?: Lark.Shift
}
export interface GetAttendanceShiftResponse extends Lark.Shift {}
export interface QueryAttendanceShiftResponse extends Lark.Shift {}
export interface ListAttendanceShiftResponse extends Paginated<Lark.Shift[], 'shift_list'> {}
export interface CreateAttendanceGroupResponse {
  group?: Lark.Group
}
export interface GetAttendanceGroupResponse extends Lark.Group {}
export interface SearchAttendanceGroupResponse {
  /** 考勤组列表 */
  group_list?: Lark.GroupMeta[]
}
export interface ListAttendanceGroupResponse extends Paginated<Lark.GroupMeta[], 'group_list'> {}
export interface BatchCreateAttendanceUserDailyShiftResponse {
  /** 班表信息列表 */
  user_daily_shifts?: Lark.UserDailyShift[]
}
export interface QueryAttendanceUserDailyShiftResponse {
  /** 班表信息列表 */
  user_daily_shifts?: Lark.UserDailyShift[]
}
export interface UpdateAttendanceUserStatsViewResponse {
  /** 视图 */
  view?: Lark.UserStatsView
}
export interface QueryAttendanceUserStatsFieldResponse {
  user_stats_field?: Lark.UserStatsField
}
export interface QueryAttendanceUserStatsViewResponse {
  view?: Lark.UserStatsView
}
export interface QueryAttendanceUserStatsDataResponse {
  /** 用户统计数据 */
  user_datas?: Lark.UserStatsData[]
  /** 无权限获取的用户列表 */
  invalid_user_list?: string[]
}
export interface QueryAttendanceUserApprovalResponse {
  /** 审批结果列表 */
  user_approvals?: Lark.UserApproval[]
}
export interface CreateAttendanceUserApprovalResponse {
  /** 审批信息 */
  user_approval?: Lark.UserApproval
}
export interface ProcessAttendanceApprovalInfoResponse {
  /** 审批信息 */
  approval_info?: Lark.ApprovalInfo
}
export interface CreateAttendanceUserTaskRemedyResponse {
  /** 补卡审批信息 */
  user_remedy?: Lark.UserTaskRemedy
}
export interface QueryUserAllowedRemedysAttendanceUserTaskRemedyResponse {
  /** 用户可补卡时间 */
  user_allowed_remedys?: Lark.UserAllowedRemedy[]
}
export interface QueryAttendanceUserTaskRemedyResponse {
  /** 补卡记录列表 */
  user_remedys?: Lark.UserTaskRemedy[]
}
export interface BatchCreateAttendanceUserFlowResponse {
  /** 打卡流水记录列表 */
  flow_records?: Lark.UserFlow[]
}
export interface GetAttendanceUserFlowResponse extends Lark.UserFlow {}
export interface QueryAttendanceUserFlowResponse {
  /** 打卡记录列表 */
  user_flow_results?: Lark.UserFlow[]
}
export interface QueryAttendanceUserTaskResponse {
  /** 打卡任务列表 */
  user_task_results?: Lark.UserTask[]
  /** 无效用户工号列表 */
  invalid_user_ids?: string[]
  /** 没有权限用户工号列表 */
  unauthorized_user_ids?: string[]
}
export interface ModifyAttendanceUserSettingResponse {
  /** 用户设置 */
  user_setting?: Lark.UserSetting
}
export interface QueryAttendanceUserSettingResponse {
  /** 用户设置信息列表 */
  user_settings?: Lark.UserSetting[]
}
export interface UploadAttendanceFileResponse {
  file?: Lark.File
}
export interface GetAttendanceLeaveEmployExpireRecordResponse {
  /** 员工过期日期的授予记录 */
  records: Lark.LeaveEmployExpireRecord[]
}
export interface PatchAttendanceLeaveAccrualRecordResponse {
  /** 员工过期日期的授予记录 */
  record: Lark.LeaveAccrualRecord
}
export interface CreateApprovalResponse {
  /** 审批定义 Code */
  approval_code?: string
  /** 审批定义 id */
  approval_id?: string
}
export interface CreateApprovalInstanceResponse {
  /** 审批实例 Code */
  instance_code: string
}
export interface PreviewApprovalInstanceResponse {
  /** 预览节点信息 */
  preview_nodes?: Lark.PreviewNode[]
}
export interface GetApprovalInstanceResponse {
  /** 审批名称 */
  approval_name: string
  /** 审批创建时间 */
  start_time?: string
  /** 审批完成时间，未完成为 0 */
  end_time: string
  /** 发起审批用户 */
  user_id: string
  /** 发起审批用户 open id */
  open_id: string
  /** 审批单编号 */
  serial_number: string
  /** 发起审批用户所在部门 */
  department_id: string
  /** 审批实例状态 */
  status: string
  /** 用户的唯一标识id */
  uuid: string
  /** json字符串，控件值 */
  form: string
  /** 审批任务列表 */
  task_list: Lark.InstanceTask[]
  /** 评论列表 */
  comment_list: Lark.InstanceComment[]
  /** 审批动态 */
  timeline: Lark.InstanceTimeline[]
  /** 修改的原实例 code,仅在查询修改实例时显示该字段 */
  modified_instance_code?: string
  /** 撤销的原实例 code,仅在查询撤销实例时显示该字段 */
  reverted_instance_code?: string
  /** 审批定义 Code */
  approval_code: string
  /** 单据是否被撤销 */
  reverted?: boolean
  /** 审批实例 Code */
  instance_code: string
}
export interface ListApprovalInstanceResponse extends Paginated<string[], 'instance_code_list'> {}
export interface CreateApprovalInstanceCommentResponse {
  /** 保存成功的comment_id */
  comment_id: string
}
export interface DeleteApprovalInstanceCommentResponse {
  /** 删除的评论ID */
  comment_id?: string
}
export interface RemoveApprovalInstanceCommentResponse {
  /** 审批实例code */
  instance_id?: string
  /** 租户自定义审批实例ID */
  external_id?: string
}
export interface ListApprovalInstanceCommentResponse extends Paginated<Lark.Comment[], 'comments'> {}
export interface CreateApprovalExternalApprovalResponse {
  /** 审批定义 code，用户自定义，定义的唯一标识 */
  approval_code: string
}
export interface GetApprovalExternalApprovalResponse {
  /** 审批定义名称 */
  approval_name: string
  /** 审批定义code */
  approval_code: string
  /** 审批定义所属分组 */
  group_code: string
  /** 分组名称 */
  group_name?: string
  /** 审批定义的说明 */
  description?: string
  /** 三方审批定义相关 */
  external?: Lark.ApprovalCreateExternal
  /** 可见人列表 */
  viewers?: Lark.ApprovalCreateViewers[]
  /** 国际化文案 */
  i18n_resources?: Lark.I18nResource[]
  /** 流程管理员 */
  managers?: string[]
}
export interface CreateApprovalExternalInstanceResponse {
  /** 同步的实例数据 */
  data?: Lark.ExternalInstance
}
export interface CheckApprovalExternalInstanceResponse {
  /** 更新时间不一致的实例信息 */
  diff_instances?: Lark.ExteranlInstanceCheckResponse[]
}
export interface ListApprovalExternalTaskResponse extends Paginated<Lark.ExternalTaskList[], 'data'> {}
export interface QueryApprovalInstanceResponse extends Paginated<Lark.InstanceSearchItem[], 'instance_list'> {}
export interface SearchCcApprovalInstanceResponse {
  /** 查询返回条数 */
  count?: number
  /** 审批实例列表 */
  cc_list?: Lark.CcSearchItem[]
  /** 翻页 Token */
  page_token?: string
  /** 是否有更多任务可供拉取 */
  has_more?: boolean
}
export interface SearchApprovalTaskResponse {
  /** 查询返回条数 */
  count?: number
  /** 审批任务列表 */
  task_list?: Lark.TaskSearchItem[]
  /** 翻页 Token */
  page_token?: string
  /** 是否有更多任务可供拉取 */
  has_more?: boolean
}
export interface QueryApprovalTaskResponse extends Paginated<Lark.Task[], 'tasks'> {}
export interface AgentEmailHelpdeskAgentResponse {
  /** agent emails */
  agents?: string
}
export interface GetHelpdeskAgentSchedulesResponse {
  /** schedules of an agent */
  agent_schedule?: Lark.AgentSchedule
}
export interface ListHelpdeskAgentScheduleResponse {
  /** schedule of all agent */
  agent_schedules?: Lark.AgentSchedule[]
}
export interface CreateHelpdeskAgentSkillResponse {
  agent_skill_id?: string
}
export interface GetHelpdeskAgentSkillResponse {
  /** agent skill */
  agent_skill?: Lark.AgentSkill
}
export interface ListHelpdeskAgentSkillResponse {
  /** list of agent groups */
  agent_skills?: Lark.AgentSkill[]
}
export interface ListHelpdeskAgentSkillRuleResponse {
  /** all rules for agent skill */
  rules?: Lark.AgentSkillRule[]
}
export interface StartServiceHelpdeskTicketResponse {
  /** chat id */
  chat_id: string
}
export interface GetHelpdeskTicketResponse {
  /** ticket detail */
  ticket?: Lark.Ticket
}
export interface ListHelpdeskTicketResponse {
  /** the total count */
  total?: number
  tickets?: Lark.Ticket[]
}
export interface CustomizedFieldsHelpdeskTicketResponse {
  /** user customized fields */
  user_customized_fields?: Lark.UserCustomizedField[]
  /** ticket customized fields */
  ticket_customized_fields?: Lark.TicketCustomizedField[]
}
export interface CreateHelpdeskTicketMessageResponse {
  /** chat消息open ID */
  message_id?: string
}
export interface ListHelpdeskTicketMessageResponse {
  /** list of ticket messages */
  messages?: Lark.TicketMessage[]
  /** total number of messages */
  total?: number
}
export interface CreateHelpdeskBotMessageResponse {
  message_id?: string
}
export interface GetHelpdeskTicketCustomizedFieldResponse extends Lark.TicketCustomizedField {}
export interface ListHelpdeskTicketCustomizedFieldResponse extends Paginated<Lark.TicketCustomizedField[], 'items'> {}
export interface CreateHelpdeskFaqResponse {
  /** faq detail */
  faq?: Lark.Faq
}
export interface GetHelpdeskFaqResponse {
  /** faq detail */
  faq?: Lark.Faq
}
export interface ListHelpdeskFaqResponse extends Paginated<Lark.Faq[], 'items'> {}
export interface SearchHelpdeskFaqResponse extends Paginated<Lark.Faq[], 'items'> {}
export interface CreateHelpdeskCategoryResponse {
  /** category */
  category?: Lark.Category
}
export interface GetHelpdeskCategoryResponse extends Lark.Category {}
export interface ListHelpdeskCategoryResponse {
  /** list of categories */
  categories?: Lark.Category[]
}
export interface CreateHelpdeskNotificationResponse {
  /** 创建成功后的唯一id */
  notification_id?: string
  /** 当前状态 */
  status?: number
}
export interface GetHelpdeskNotificationResponse {
  /** push任务详情 */
  notification?: Lark.Notification
  /** 审批链接 */
  approval_app_link?: string
}
export interface SubmitApproveHelpdeskNotificationResponse {
  /** 是否有权限创建或者管理审批流程 （有两种情况会导致没有权限： 1：用户没有安装服务台小程序，需要在https://app.feishu.cn/app/cli_9f9f8825d53b900d或者https://ftest.feishu.cn/admin/appCenter/manage/cli_9f9f8825d53b900d?lang=zh-CN 安装小程序 2：用户安装的服务台小程序版本过低） */
  has_access?: boolean
}
export interface CreateTaskv1Response {
  /** 返回创建好的任务 */
  task?: Lark.Task
}
export interface PatchTaskv1Response {
  /** 返回修改后的任务详情 */
  task?: Lark.Task
}
export interface GetTaskv1Response {
  /** 返回任务资源详情 */
  task?: Lark.Task
}
export interface ListTaskv1Response extends Paginated<Lark.Task[], 'items'> {}
export interface CreateTaskv1TaskReminderResponse {
  /** 返回创建成功的提醒时间 */
  reminder?: Lark.Reminder
}
export interface ListTaskv1TaskReminderResponse extends Paginated<Lark.Reminder[], 'items'> {}
export interface CreateTaskv1TaskCommentResponse {
  /** 返回创建好的任务评论 */
  comment?: Lark.Comment
}
export interface UpdateTaskv1TaskCommentResponse {
  /** 返回修改后的任务评论详情 */
  comment?: Lark.Comment
}
export interface GetTaskv1TaskCommentResponse {
  /** 返回新的任务评论详情 */
  comment?: Lark.Comment
}
export interface ListTaskv1TaskCommentResponse extends Paginated<Lark.Comment[], 'items'> {}
export interface CreateTaskv1TaskFollowerResponse {
  /** 创建后的任务关注者 */
  follower: Lark.Follower
}
export interface BatchDeleteFollowerTaskv1Response {
  /** 实际删除的关注人用户ID列表 */
  followers?: string[]
}
export interface ListTaskv1TaskFollowerResponse extends Paginated<Lark.Follower[], 'items'> {}
export interface CreateTaskv1TaskCollaboratorResponse {
  /** 返回创建成功后的任务协作者 */
  collaborator: Lark.Collaborator
}
export interface BatchDeleteCollaboratorTaskv1Response {
  /** 实际删除的执行人用户ID列表 */
  collaborators?: string[]
}
export interface ListTaskv1TaskCollaboratorResponse extends Paginated<Lark.Collaborator[], 'items'> {}
export interface CreateTaskv2Response {
  /** 产生的任务 */
  task?: Lark.Task
}
export interface GetTaskv2Response {
  /** 获得的任务实体 */
  task?: Lark.Task
}
export interface PatchTaskv2Response {
  /** 更新后的任务 */
  task?: Lark.Task
}
export interface AddMembersTaskv2Response {
  /** 更新完成后的任务实体数据 */
  task?: Lark.Task
}
export interface RemoveMembersTaskv2Response {
  /** 移除成员后的任务数据 */
  task?: Lark.Task
}
export interface ListTaskv2Response extends Paginated<Lark.Task[], 'items'> {}
export interface TasklistsTaskv2Response {
  /** 任务所在清单的摘要信息 */
  tasklists?: Lark.TaskInTasklistInfo[]
}
export interface AddTasklistTaskv2Response {
  /** 添加后的任务详情 */
  task?: Lark.Task
}
export interface RemoveTasklistTaskv2Response {
  /** 添加后的任务详情 */
  task?: Lark.Task
}
export interface AddRemindersTaskv2Response {
  /** 更新完成后的任务实体 */
  task?: Lark.Task
}
export interface RemoveRemindersTaskv2Response {
  /** 移除后任务的提醒列表 */
  task?: Lark.Task
}
export interface AddDependenciesTaskv2Response {
  /** 被添加后任务的所有依赖 */
  dependencies?: Lark.TaskDependency[]
}
export interface RemoveDependenciesTaskv2Response {
  /** 移除之后的任务GUID */
  dependencies?: Lark.TaskDependency[]
}
export interface CreateTaskv2TaskSubtaskResponse {
  /** 创建的任务 */
  subtask?: Lark.Task
}
export interface ListTaskv2TaskSubtaskResponse extends Paginated<Lark.Task[], 'items'> {}
export interface CreateTaskv2TasklistResponse {
  /** 创建的清单数据 */
  tasklist?: Lark.Tasklist
}
export interface GetTaskv2TasklistResponse {
  /** 清单详情 */
  tasklist?: Lark.Tasklist
}
export interface PatchTaskv2TasklistResponse {
  /** 修改后的任务清单 */
  tasklist?: Lark.Tasklist
}
export interface AddMembersTaskv2TasklistResponse {
  /** 完成更新后的清单实体 */
  tasklist?: Lark.Tasklist
}
export interface RemoveMembersTaskv2TasklistResponse {
  /** 修改完成后的清单实体 */
  tasklist?: Lark.Tasklist
}
export interface TasksTaskv2TasklistResponse {
  /** 任务摘要数据 */
  items?: Lark.TaskSummary[]
  /** 用于获取下一页的分页标记，最后一页时发返回空 */
  page_token?: string
  /** 是否有更多数据 */
  has_more?: boolean
}
export interface ListTaskv2TasklistResponse extends Paginated<Lark.Tasklist[], 'items'> {}
export interface CreateTaskv2TasklistActivitySubscriptionResponse {
  /** 清单动态订阅 */
  activity_subscription?: Lark.TasklistActivitySubscription
}
export interface GetTaskv2TasklistActivitySubscriptionResponse {
  /** 订阅详情 */
  activity_subscription?: Lark.TasklistActivitySubscription
}
export interface ListTaskv2TasklistActivitySubscriptionResponse {
  /** 清单的动态订阅数据 */
  items?: Lark.TasklistActivitySubscription[]
}
export interface PatchTaskv2TasklistActivitySubscriptionResponse {
  /** 更新后的订阅 */
  activity_subscription?: Lark.TasklistActivitySubscription
}
export interface CreateTaskv2CommentResponse {
  /** 创建的评论详情 */
  comment?: Lark.Comment
}
export interface GetTaskv2CommentResponse {
  /** 评论详情 */
  comment?: Lark.Comment
}
export interface PatchTaskv2CommentResponse {
  /** 更新后的评论 */
  comment?: Lark.Comment
}
export interface ListTaskv2CommentResponse extends Paginated<Lark.Comment[], 'items'> {}
export interface UploadTaskv2AttachmentResponse {
  /** 上传的附件列表 */
  items?: Lark.Attachment[]
}
export interface ListTaskv2AttachmentResponse extends Paginated<Lark.Attachment[], 'items'> {}
export interface GetTaskv2AttachmentResponse {
  /** 附件详情 */
  attachment?: Lark.Attachment
}
export interface CreateTaskv2SectionResponse {
  /** 创建的自定义分组数据 */
  section?: Lark.Section
}
export interface GetTaskv2SectionResponse {
  /** 获取的自定义分组详情 */
  section?: Lark.Section
}
export interface PatchTaskv2SectionResponse {
  /** 更新后的自定义分组 */
  section?: Lark.Section
}
export interface ListTaskv2SectionResponse extends Paginated<Lark.SectionSummary[], 'items'> {}
export interface TasksTaskv2SectionResponse extends Paginated<Lark.TaskSummary[], 'items'> {}
export interface CreateTaskv2CustomFieldResponse {
  /** 创建的自定义字段 */
  custom_field?: Lark.CustomField
}
export interface GetTaskv2CustomFieldResponse {
  /** 获取的自定义字段数据 */
  custom_field?: Lark.CustomField
}
export interface PatchTaskv2CustomFieldResponse {
  /** 修改后的自定义字段设置 */
  custom_field?: Lark.CustomField
}
export interface ListTaskv2CustomFieldResponse extends Paginated<Lark.CustomField[], 'items'> {}
export interface CreateTaskv2CustomFieldOptionResponse {
  /** 创建的选项 */
  option?: Lark.Option
}
export interface PatchTaskv2CustomFieldOptionResponse {
  /** 更新后的option数据 */
  option?: Lark.Option
}
export interface CreateMailMailgroupResponse extends Lark.Mailgroup {}
export interface PatchMailMailgroupResponse extends Lark.Mailgroup {}
export interface UpdateMailMailgroupResponse extends Lark.Mailgroup {}
export interface GetMailMailgroupResponse extends Lark.Mailgroup {}
export interface ListMailMailgroupResponse extends Paginated<Lark.Mailgroup[], 'items'> {}
export interface ListMailMailgroupManagerResponse extends Paginated<Lark.MailgroupManager[], 'items'> {}
export interface CreateMailMailgroupMemberResponse extends Lark.MailgroupMember {}
export interface GetMailMailgroupMemberResponse extends Lark.MailgroupMember {}
export interface ListMailMailgroupMemberResponse extends Paginated<Lark.MailgroupMember[], 'items'> {}
export interface BatchCreateMailMailgroupMemberResponse {
  /** 添加成功后的邮件组成员信息列表 */
  items?: Lark.MailgroupMember[]
}
export interface CreateMailMailgroupAliasResponse {
  /** 邮件组别名 */
  mailgroup_alias?: Lark.EmailAlias
}
export interface ListMailMailgroupAliasResponse {
  /** 邮件组别名 */
  items?: Lark.EmailAlias[]
}
export interface CreateMailMailgroupPermissionMemberResponse extends Lark.MailgroupPermissionMember {}
export interface GetMailMailgroupPermissionMemberResponse extends Lark.MailgroupPermissionMember {}
export interface ListMailMailgroupPermissionMemberResponse extends Paginated<Lark.MailgroupPermissionMember[], 'items'> {}
export interface BatchCreateMailMailgroupPermissionMemberResponse {
  /** 添加成功后的邮件组权限成员信息列表 */
  items?: Lark.MailgroupPermissionMember[]
}
export interface CreateMailPublicMailboxResponse extends Lark.PublicMailbox {}
export interface PatchMailPublicMailboxResponse extends Lark.PublicMailbox {}
export interface UpdateMailPublicMailboxResponse extends Lark.PublicMailbox {}
export interface GetMailPublicMailboxResponse extends Lark.PublicMailbox {}
export interface ListMailPublicMailboxResponse extends Paginated<Lark.PublicMailbox[], 'items'> {}
export interface CreateMailPublicMailboxMemberResponse extends Lark.PublicMailboxMember {}
export interface GetMailPublicMailboxMemberResponse extends Lark.PublicMailboxMember {}
export interface ListMailPublicMailboxMemberResponse extends Paginated<Lark.PublicMailboxMember[], 'items'> {}
export interface BatchCreateMailPublicMailboxMemberResponse {
  /** 添加成功后的公共邮箱成员信息列表 */
  items?: Lark.PublicMailboxMember[]
}
export interface CreateMailPublicMailboxAliasResponse {
  /** 公共邮箱别名 */
  public_mailbox_alias?: Lark.EmailAlias
}
export interface ListMailPublicMailboxAliasResponse {
  /** 公共邮箱别名 */
  items?: Lark.EmailAlias[]
}
export interface CreateMailUserMailboxAliasResponse {
  /** 用户邮箱别名 */
  user_mailbox_alias?: Lark.EmailAlias
}
export interface ListMailUserMailboxAliasResponse extends Paginated<Lark.EmailAlias[], 'items'> {}
export interface QueryMailUserResponse {
  /** 邮箱地址返回 */
  user_list?: Lark.User[]
}
export interface GetApplicationResponse {
  /** 应用数据 */
  app?: Lark.Application
}
export interface GetApplicationApplicationAppVersionResponse {
  app_version?: Lark.ApplicationAppVersion
}
export interface ListApplicationApplicationAppVersionResponse extends Paginated<Lark.ApplicationAppVersion[], 'items'> {}
export interface ContactsRangeSuggestApplicationApplicationAppVersionResponse {
  contacts_range?: Lark.ApplicationAppContactsRange
}
export interface UnderauditlistApplicationResponse extends Paginated<Lark.Application[], 'items'> {}
export interface ContactsRangeConfigurationApplicationResponse {
  contacts_range?: Lark.ApplicationAppContactsRange
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
}
export interface CheckWhiteBlackListApplicationApplicationVisibilityResponse {
  /** 用户可见性信息列表 */
  user_visibility_list?: Lark.ApplicationVisibilityUserWhiteBlackInfo[]
  /** 部门可见性信息列表 */
  department_visibility_list?: Lark.ApplicationVisibilityDepartmentWhiteBlackInfo[]
  /** 用户组可见性信息列表 */
  group_visibility_list?: Lark.ApplicationVisibilityGroupWhiteBlackInfo[]
}
export interface DepartmentOverviewApplicationApplicationAppUsageResponse {
  /** 分页查询时返回，代表是否还有更多数据 */
  has_more?: boolean
  /** 分页标记，下一页分页的token */
  page_token?: string
  /** 部门内员工使用应用的概览数据 */
  items?: Lark.ApplicationDepartmentAppUsage[]
}
export interface OverviewApplicationApplicationAppUsageResponse {
  /** 员工使用应用概览数据 */
  items?: Lark.ApplicationAppUsage[]
}
export interface ListApplicationApplicationFeedbackResponse {
  /** 应用的反馈列表 */
  feedback_list?: Lark.ApplicationFeedback[]
  /** 是否还有更多用户反馈列表，true：是，false：否 */
  has_more: boolean
  /** 拉取下一页应用反馈列表时使用的 page_token */
  page_token?: string
}
export interface QueryTenantTenantProductAssignInfoResponse {
  /** 租户待分配席位列表 */
  assign_info_list?: Lark.TenantAssignInfo[]
}
export interface QueryTenantResponse {
  /** 企业信息 */
  tenant?: Lark.Tenant
}
export interface GetVerificationResponse {
  verification?: Lark.Verification
}
export interface CreatePersonalSettingsSystemStatusResponse {
  /** 系统状态 */
  system_status?: Lark.SystemStatus
}
export interface PatchPersonalSettingsSystemStatusResponse {
  /** 系统状态 */
  system_status?: Lark.SystemStatus
}
export interface ListPersonalSettingsSystemStatusResponse extends Paginated<Lark.SystemStatus[], 'items'> {}
export interface BatchOpenPersonalSettingsSystemStatusResponse {
  /** 开启结果 */
  result_list: Lark.SystemStatusUserOpenResultEntity[]
}
export interface BatchClosePersonalSettingsSystemStatusResponse {
  /** 关闭结果 */
  result_list: Lark.SystemStatusUserCloseResultEntity[]
}
export interface CreateSearchMessageResponse {
  /** 消息id列表 */
  items?: string[]
  /** 翻页 token，传入返回下一页，首页不需要传入 */
  page_token?: string
  /** 是否还有下一页 */
  has_more?: boolean
}
export interface CreateSearchAppResponse {
  /** app_id列表 */
  items?: string[]
  /** 翻页 token，传入返回下一页，首页不需要传入 */
  page_token?: string
  /** 是否还有下一页 */
  has_more?: boolean
}
export interface CreateSearchDataSourceResponse {
  /** 数据源实例 */
  data_source?: Lark.DataSource
}
export interface PatchSearchDataSourceResponse {
  /** 数据源 */
  data_source?: Lark.DataSource
}
export interface GetSearchDataSourceResponse {
  /** 数据源实例 */
  data_source?: Lark.DataSource
}
export interface ListSearchDataSourceResponse extends Paginated<Lark.DataSource[], 'items'> {}
export interface GetSearchDataSourceItemResponse {
  /** 数据项实例 */
  item: Lark.Item
}
export interface CreateSearchSchemaResponse {
  /** 数据范式实例 */
  schema?: Lark.Schema
}
export interface PatchSearchSchemaResponse {
  /** 数据范式实例 */
  schema?: Lark.Schema
}
export interface GetSearchSchemaResponse {
  /** 数据范式 */
  schema?: Lark.Schema
}
export interface ParseDocumentAiResumeResponse {
  /** 简历信息 */
  resumes?: Lark.Resume[]
}
export interface RecognizeDocumentAiVehicleInvoiceResponse {
  /** 机动车发票信息 */
  vehicle_invoice?: Lark.VehicleInvoice
}
export interface RecognizeDocumentAiHealthCertificateResponse {
  /** 健康证信息 */
  health_certificate?: Lark.HealthCertificate
}
export interface RecognizeDocumentAiHkmMainlandTravelPermitResponse {
  /** 港澳居民来往内地通行证信息 */
  hkm_mainland_travel_permit?: Lark.HkmMainlandTravelPermit
}
export interface RecognizeDocumentAiTwMainlandTravelPermitResponse {
  /** 台湾居民来往大陆通行证信息 */
  tw_mainland_travel_permit?: Lark.TwMainlandTravelPermit
}
export interface RecognizeDocumentAiChinesePassportResponse {
  /** 中国护照信息 */
  chinese_passport?: Lark.ChinesePassport
}
export interface RecognizeDocumentAiBankCardResponse {
  /** 银行卡信息 */
  bank_card?: Lark.BankCard
}
export interface RecognizeDocumentAiVehicleLicenseResponse {
  /** 行驶证信息 */
  vehicle_license?: Lark.VehicleLicense
}
export interface RecognizeDocumentAiTrainInvoiceResponse {
  /** 火车票信息 */
  train_invoices?: Lark.TrainInvoice[]
}
export interface RecognizeDocumentAiTaxiInvoiceResponse {
  /** 出租车票信息 */
  taxi_invoices?: Lark.TaxiInvoice[]
}
export interface RecognizeDocumentAiIdCardResponse {
  /** 身份证信息 */
  id_card?: Lark.IdCard
}
export interface RecognizeDocumentAiFoodProduceLicenseResponse {
  /** 食品生产许可证信息 */
  food_produce_license?: Lark.FoodProduceLicense
}
export interface RecognizeDocumentAiFoodManageLicenseResponse {
  /** 食品经营许可证信息 */
  food_manage_license?: Lark.FoodManageLicense
}
export interface RecognizeDocumentAiDrivingLicenseResponse {
  /** 驾驶证信息 */
  driving_license?: Lark.DrvingLicense
}
export interface RecognizeDocumentAiVatInvoiceResponse {
  /** 增值税发票信息 */
  vat_invoices?: Lark.VatInvoice[]
}
export interface RecognizeDocumentAiBusinessLicenseResponse {
  /** 营业执照信息 */
  business_license?: Lark.BusinessLicense
}
export interface FieldExtractionDocumentAiContractResponse {
  /** 文件的唯一id */
  file_id?: string
  /** 总交易金额 */
  price?: Lark.ExtractPrice
  /** 期限相关信息，包括开始日期、结束日期、有效时长 */
  time?: Lark.ExtractTime
  /** 盖章份数 */
  copy?: Lark.ExtractCopy
  /** 币种 */
  currency?: Lark.ExtractCurrency
  /** 合同标题 */
  header?: string
  /** 主体信息 */
  body_info?: Lark.BodyInfo[]
  /** 银行信息 */
  bank_info?: Lark.BankInfo[]
}
export interface RecognizeDocumentAiBusinessCardResponse {
  /** 名片信息 */
  business_cards?: Lark.RecognizedEntities[]
}
export interface BasicRecognizeOpticalCharRecognitionImageResponse {
  /** 按区域识别，返回文本列表 */
  text_list: string[]
}
export interface FileRecognizeSpeechToTextSpeechResponse {
  /** 语音识别后的文本信息 */
  recognition_text: string
}
export interface StreamRecognizeSpeechToTextSpeechResponse {
  /** 16 位 String 随机串作为同一数据流的标识 */
  stream_id: string
  /** 数据流分片的序号，序号从 0 开始，每次请求递增 1 */
  sequence_id: number
  /** 语音流识别后的文本信息 */
  recognition_text: string
}
export interface DetectTranslationTextResponse {
  /** 识别的文本语种，返回符合 ISO 693-1 标准 */
  language: string
}
export interface TranslateTranslationTextResponse {
  /** 翻译后的文本 */
  text: string
}
export interface ListAdminAdminDeptStatResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  items?: Lark.AdminDeptStat[]
}
export interface ListAdminAdminUserStatResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  items?: Lark.AdminUserStat[]
}
export interface CreateAdminBadgeResponse {
  /** 勋章的信息 */
  badge?: Lark.Badge
}
export interface UpdateAdminBadgeResponse {
  /** 勋章信息 */
  badge?: Lark.Badge
}
export interface CreateAdminBadgeImageResponse {
  /** 图片的key */
  image_key?: string
}
export interface ListAdminBadgeResponse extends Paginated<Lark.Badge[], 'badges'> {}
export interface GetAdminBadgeResponse {
  /** 勋章信息 */
  badge?: Lark.Badge
}
export interface CreateAdminBadgeGrantResponse {
  /** 授予名单的信息 */
  grant?: Lark.Grant
}
export interface UpdateAdminBadgeGrantResponse {
  /** 授予名单 */
  grant?: Lark.Grant
}
export interface ListAdminBadgeGrantResponse extends Paginated<Lark.Grant[], 'grants'> {}
export interface GetAdminBadgeGrantResponse {
  /** 授予名单信息 */
  grant?: Lark.Grant
}
export interface ListEhrEmployeeResponse extends Paginated<Lark.Employee[], 'items'> {}
export interface SearchCorehrBasicInfoNationalityResponse extends Paginated<Lark.Nationality[], 'items'> {}
export interface SearchCorehrBasicInfoBankResponse extends Paginated<Lark.Bank[], 'items'> {}
export interface SearchCorehrBasicInfoBankBranchResponse extends Paginated<Lark.BankBranch[], 'items'> {}
export interface GetByParamCorehrCustomFieldResponse {
  /** 自定义字段详情 */
  data?: Lark.CustomField
}
export interface QueryCorehrCustomFieldResponse {
  /** 自定义字段列表 */
  items?: Lark.CustomField[]
}
export interface ListObjectApiNameCorehrCustomFieldResponse {
  /** 对象列表 */
  items?: Lark.Object[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface SearchCorehrBasicInfoCountryRegionResponse extends Paginated<Lark.CountryRegion[], 'items'> {}
export interface SearchCorehrBasicInfoCountryRegionSubdivisionResponse extends Paginated<Lark.CountryRegionSubdivision[], 'items'> {}
export interface SearchCorehrBasicInfoCityResponse extends Paginated<Lark.City[], 'items'> {}
export interface SearchCorehrBasicInfoDistrictResponse extends Paginated<Lark.District[], 'items'> {}
export interface CreateCorehrEmployeeTypeResponse {
  employee_type?: Lark.EmployeeType
}
export interface PatchCorehrEmployeeTypeResponse {
  employee_type?: Lark.EmployeeType
}
export interface GetCorehrEmployeeTypeResponse {
  /** 雇员类型 */
  employee_type?: Lark.EmployeeType
}
export interface ListCorehrEmployeeTypeResponse {
  /** 查询的雇员类型信息 */
  items?: Lark.EmployeeType[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface CreateCorehrNationalIdTypeResponse {
  national_id_type?: Lark.NationalIdType
}
export interface PatchCorehrNationalIdTypeResponse {
  national_id_type?: Lark.NationalIdType
}
export interface GetCorehrNationalIdTypeResponse {
  /** 国家证件类型信息 */
  national_id_type?: Lark.NationalIdType
}
export interface ListCorehrNationalIdTypeResponse {
  /** 查询的国家证件类型信息 */
  items?: Lark.NationalIdType[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface CreateCorehrWorkingHoursTypeResponse {
  working_hours_type?: Lark.WorkingHoursType
}
export interface PatchCorehrWorkingHoursTypeResponse {
  working_hours_type?: Lark.WorkingHoursType
}
export interface GetCorehrWorkingHoursTypeResponse {
  /** 工时制度信息 */
  working_hours_type?: Lark.WorkingHoursType
}
export interface ListCorehrWorkingHoursTypeResponse {
  /** 查询的工时制度信息 */
  items?: Lark.WorkingHoursType[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface SearchCorehrBasicInfoCurrencyResponse extends Paginated<Lark.Currency[], 'items'> {}
export interface BatchGetCorehrEmployeeResponse {
  /** 查询的雇佣信息 */
  items?: Lark.Employee[]
}
export interface SearchCorehrEmployeeResponse extends Paginated<Lark.Employee[], 'items'> {}
export interface CreateCorehrEmploymentResponse {
  employment?: Lark.EmploymentCreate
}
export interface PatchCorehrEmploymentResponse {
  employment?: Lark.Employment
}
export interface CreateCorehrPersonResponse {
  person?: Lark.PersonInfo
}
export interface PatchCorehrPersonResponse {
  person?: Lark.PersonInfo
}
export interface UploadCorehrPersonResponse {
  /** 上传文件ID */
  id?: string
}
export interface CreateCorehrJobDataResponse {
  job_data?: Lark.JobData
}
export interface PatchCorehrJobDataResponse {
  job_data?: Lark.JobData
}
export interface GetCorehrJobDataResponse {
  /** 任职信息 */
  job_data?: Lark.JobData
}
export interface QueryCorehrEmployeesJobDataResponse {
  /** 任职信息 */
  items?: Lark.EmployeeJobData[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}
export interface BatchGetCorehrEmployeesJobDataResponse {
  /** 查询的雇佣信息 */
  items?: Lark.EmployeeJobData[]
}
export interface ListCorehrJobDataResponse {
  /** 查询的任职信息 */
  items?: Lark.JobData[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface ParentsCorehrDepartmentResponse extends Paginated<Lark.DepartmentParents[], 'items'> {}
export interface SearchCorehrDepartmentResponse extends Paginated<Lark.Department[], 'items'> {}
export interface CreateCorehrDepartmentResponse {
  department?: Lark.DepartmentCreate
}
export interface PatchCorehrDepartmentResponse {
  department?: Lark.Department
}
export interface GetCorehrDepartmentResponse {
  /** 部门信息 */
  department?: Lark.Department
}
export interface BatchGetCorehrDepartmentResponse {
  /** 查询的部门信息 */
  items?: Lark.Department[]
}
export interface ListCorehrDepartmentResponse {
  /** 查询的部门信息 */
  items?: Lark.Department[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface BatchGetCorehrLocationResponse {
  /** 查询的地点信息 */
  items?: Lark.Location[]
}
export interface CreateCorehrLocationResponse {
  location?: Lark.Location
}
export interface GetCorehrLocationResponse {
  /** 地点信息 */
  location?: Lark.Location
}
export interface ListCorehrLocationResponse {
  /** 查询的地点信息 */
  items?: Lark.Location[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface GetCorehrCompanyResponse {
  /** 公司信息 */
  company?: Lark.Company
}
export interface ListCorehrCompanyResponse {
  /** 查询的公司信息 */
  items?: Lark.Company[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface BatchGetCorehrCompanyResponse {
  /** 查询的公司信息 */
  items?: Lark.Company[]
}
export interface CreateCorehrCompanyResponse {
  company?: Lark.Company
}
export interface PatchCorehrCompanyResponse {
  company?: Lark.Company
}
export interface CreateCorehrCostCenterResponse {
  cost_center?: Lark.CostCenter
}
export interface PatchCorehrCostCenterResponse {
  cost_center?: Lark.CostCenter
}
export interface SearchCorehrCostCenterResponse {
  /** 成本中心信息 */
  items?: Lark.CostCenterVersion[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}
export interface CreateCorehrCostCenterVersionResponse {
  version?: Lark.CostCenterVersion
}
export interface PatchCorehrCostCenterVersionResponse {
  version?: Lark.CostCenterVersion
}
export interface BatchGetCorehrJobLevelResponse {
  /** 查询的职级信息 */
  items?: Lark.JobLevel[]
}
export interface CreateCorehrJobLevelResponse {
  job_level?: Lark.JobLevel
}
export interface PatchCorehrJobLevelResponse {
  job_level?: Lark.JobLevel
}
export interface GetCorehrJobLevelResponse {
  /** 职务级别信息 */
  job_level?: Lark.JobLevel
}
export interface ListCorehrJobLevelResponse {
  /** 查询的职务级别信息 */
  items?: Lark.JobLevel[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface BatchGetCorehrJobFamilyResponse {
  /** 查询的序列信息 */
  items?: Lark.JobFamily[]
}
export interface CreateCorehrJobFamilyResponse {
  job_family?: Lark.JobFamily
}
export interface PatchCorehrJobFamilyResponse {
  job_family?: Lark.JobFamily
}
export interface GetCorehrJobFamilyResponse {
  /** 职务序列信息 */
  job_family?: Lark.JobFamily
}
export interface ListCorehrJobFamilyResponse {
  /** 查询的职务序列信息 */
  items?: Lark.JobFamily[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface CreateCorehrJobResponse {
  job?: Lark.Job
}
export interface PatchCorehrJobResponse {
  job?: Lark.Job
}
export interface GetCorehrJobResponse {
  /** 职务信息 */
  job?: Lark.Job
}
export interface ListCorehrJobResponse {
  /** 查询的职务信息 */
  items?: Lark.Job[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface GetCorehrJobResponse {
  /** 职务信息 */
  job?: Lark.Job
}
export interface ListCorehrJobResponse {
  /** 查询的职务信息 */
  items?: Lark.Job[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface CreateCorehrPreHireResponse {
  /** 待入职 ID */
  pre_hire_id?: string
}
export interface PatchCorehrPreHireResponse {
  pre_hire?: Lark.PreHire
}
export interface GetCorehrPreHireResponse {
  /** 待入职信息 */
  pre_hire?: Lark.PreHire
}
export interface ListCorehrPreHireResponse {
  /** 查询的待入职信息 */
  items?: Lark.PreHireQuery[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface SearchCorehrContractResponse extends Paginated<Lark.Contract[], 'items'> {}
export interface CreateCorehrContractResponse {
  contract?: Lark.Contract
}
export interface PatchCorehrContractResponse {
  contract?: Lark.Contract
}
export interface GetCorehrContractResponse {
  /** 合同信息 */
  contract?: Lark.Contract
}
export interface ListCorehrContractResponse {
  /** 查询的合同信息 */
  items?: Lark.Contract[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface SearchCorehrProbationResponse extends Paginated<Lark.ProbationInfo[], 'items'> {}
export interface CreateCorehrProbationAssessmentResponse {
  /** 创建的试用期考核记录 ID 列表，有序返回 */
  assessment_ids?: string[]
}
export interface QueryCorehrTransferReasonResponse {
  /** 异动原因列表 */
  items?: Lark.TransferReason[]
}
export interface QueryCorehrTransferTypeResponse {
  /** 异动类型列表 */
  items?: Lark.TransferType[]
}
export interface CreateCorehrJobChangeResponse extends Lark.JobChange {}
export interface SearchCorehrJobChangeResponse extends Paginated<Lark.JobChange[], 'items'> {}
export interface QueryCorehrOffboardingResponse {
  /** 离职原因列表 */
  items?: Lark.OffboardingReason[]
}
export interface SubmitCorehrOffboardingResponse {
  /** 离职记录 id */
  offboarding_id?: string
  /** 雇员 id */
  employment_id?: string
  /** 离职原因 */
  offboarding_reason_unique_identifier?: string
  /** 离职日期 */
  offboarding_date?: string
  /** 离职原因说明 */
  offboarding_reason_explanation?: string
  /** 是否加入离职屏蔽名单 */
  add_block_list?: boolean
  /** 屏蔽原因 */
  block_reason?: string
  /** 屏蔽原因说明 */
  block_reason_explanation?: string
  /** 创建时间 */
  created_time?: string
}
export interface SearchCorehrOffboardingResponse extends Paginated<Lark.Offboarding[], 'items'> {}
export interface CreateCorehrLeaveGrantingRecordResponse {
  /** 假期授予记录 */
  leave_granting_record?: Lark.LeaveGrantingRecord
}
export interface LeaveTypesCorehrLeaveResponse {
  /** 假期类型列表 */
  leave_type_list?: Lark.LeaveType[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface LeaveBalancesCorehrLeaveResponse {
  /** 员工假期余额信息列表 */
  employment_leave_balance_list?: Lark.EmploymentLeaveBalance[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface LeaveRequestHistoryCorehrLeaveResponse {
  /** 请假记录信息列表 */
  leave_request_list?: Lark.LeaveRequest[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface BatchGetCorehrEmployeesBpResponse {
  /** 员工直属 BP 信息，当员工所在部门、属地无 BP 时，会上钻找到最近的 BP */
  employment_direct_bps?: Lark.EmploymentBp[]
  /** 员工全部 BP 信息 */
  employment_all_bps?: Lark.EmploymentBp[]
}
export interface GetByDepartmentCorehrBpResponse {
  /** 部门 HRBP 信息，依次为部门及各层级上级部门 */
  items?: Lark.DepartmentHrbp[]
}
export interface ListCorehrBpResponse extends Paginated<Lark.Bp[], 'items'> {}
export interface QueryCorehrSecurityGroupResponse {
  /** HRBP/属地 BP 信息 */
  hrbp_list?: Lark.Hrbp[]
}
export interface SearchCorehrAssignedUserResponse {
  /** 用户授权信息 */
  items?: Lark.RoleAuthorization[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface ListCorehrSecurityGroupResponse {
  /** 查询的用户角色信息 */
  items?: Lark.SecurityGroup[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface ListCorehrProcessResponse extends Paginated<string[], 'process_ids'> {}
export interface GetCorehrProcessResponse {
  /** 流程实例ID */
  process_id?: string
  /** 流程状态 */
  status?: number
  /** 业务类型ID */
  flow_template_id?: string
  /** 业务类型名称 */
  flow_template_name?: Lark.DataengineI18n
  /** 流程定义ID */
  flow_definition_id?: string
  /** 流程定义名称 */
  flow_definition_name?: Lark.DataengineI18n
  /** 流程发起人ID */
  initiator_id?: string
  /** 流程发起人姓名 */
  initiator_name?: Lark.DataengineI18n
  /** 流程发起时间，Unix毫秒时间戳 */
  create_time?: string
  /** 流程结束时间，Unix毫秒时间戳 */
  complete_time?: string
  /** 发起单据地址 */
  start_links?: Lark.ProcessLink
  /** 流程摘要，会随着流程流转发生变化 */
  abstracts?: Lark.ProcessAbstractItem[]
  /** 待办列表 */
  todos?: Lark.ProcessTodoItem[]
  /** 抄送列表 */
  cc_list?: Lark.ProcessCcItem[]
  /** 已办列表 */
  done_list?: Lark.ProcessDoneItem[]
}
export interface GetCorehrProcessFormVariableDataResponse {
  /** 流程变量 */
  field_variable_values?: Lark.FormFieldVariable[]
}
export interface MatchCorehrCompensationStandardResponse extends Lark.CpstMatchItem {}
export interface CombinedCreateHireJobResponse extends Lark.CombinedJobResult {}
export interface GetHireJobResponse {
  /** 职位数据 */
  job?: Lark.Job
}
export interface ConfigHireJobResponse {
  job_config?: Lark.JobConfigResult
}
export interface ListHireJobResponse {
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 列表 */
  items?: Lark.Job[]
}
export interface CombinedUpdateHireJobResponse extends Lark.CombinedJobResult {}
export interface UpdateConfigHireJobResponse {
  job_config?: Lark.JobConfigResult
}
export interface ListHireJobTypeResponse extends Paginated<Lark.JobTypeInfo[], 'items'> {}
export interface RecruiterHireJobResponse {
  /** 职位负责人 */
  info?: Lark.JobRecruiter2
}
export interface CreateHireJobRequirementResponse {
  job_requirement?: Lark.JobRequirementDto
}
export interface ListHireJobRequirementResponse {
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
  /** 查询的招聘需求信息 */
  items?: Lark.JobRequirementDto[]
}
export interface ListHireJobRequirementSchemaResponse {
  /** 列表 */
  items?: Lark.JobRequirementSchema[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface ListHireJobProcessResponse {
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 列表 */
  items?: Lark.JobProcesses[]
}
export interface ListHireRegistrationSchemaResponse extends Paginated<Lark.RegistrationSchema[], 'items'> {}
export interface ListHireReferralWebsiteJobPostResponse extends Paginated<Lark.PortalJobPost[], 'items'> {}
export interface GetHireReferralWebsiteJobPostResponse {
  job_post?: Lark.PortalJobPost
}
export interface GetByApplicationHireReferralResponse {
  /** 内推信息 */
  referral?: Lark.Referral
}
export interface CreateHireExternalApplicationResponse {
  external_application?: Lark.ExternalApplication
}
export interface UpdateHireExternalApplicationResponse {
  external_application?: Lark.ExternalApplication
}
export interface DeleteHireExternalApplicationResponse {
  external_application?: Lark.ExternalApplication
}
export interface CreateHireExternalInterviewResponse {
  external_interview?: Lark.ExternalInterview
}
export interface CreateHireExternalInterviewAssessmentResponse {
  external_interview_assessment?: Lark.ExternalInterviewAssessment
}
export interface CreateHireExternalBackgroundCheckResponse {
  external_background_check?: Lark.ExternalBackgroundCheck
}
export interface AddToFolderHireTalentResponse {
  /** 人才 ID 列表 */
  talent_id_list?: string[]
  /** 文件夹 ID */
  folder_id?: string
}
export interface ListHireTalentFolderResponse extends Paginated<Lark.TalentFolder[], 'items'> {}
export interface BatchGetIdHireTalentResponse {
  /** 人才信息列表 */
  talent_list?: Lark.TalentBatchInfo[]
}
export interface ListHireTalentResponse {
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 列表 */
  items?: Lark.Talent[]
}
export interface QueryHireTalentObjectResponse {
  items?: Lark.CommonSchema[]
}
export interface GetHireTalentResponse {
  /** 人才信息 */
  talent?: Lark.Talent
}
export interface CreateHireApplicationResponse {
  /** 投递ID */
  id?: string
}
export interface GetHireApplicationResponse {
  /** 投递数据 */
  application?: Lark.Application
}
export interface ListHireApplicationResponse {
  /** 投递数据列表 */
  items?: string[]
  /** 游标, 翻下一页数据时使用 */
  page_token?: string
  /** 是否还有下一页数据 */
  has_more?: boolean
}
export interface ListHireEvaluationResponse extends Paginated<Lark.Evaluation[], 'items'> {}
export interface ListHireQuestionnaireResponse {
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
  /** 满意度评价列表 */
  items?: Lark.Questionnaire[]
}
export interface ListHireInterviewResponse {
  /** 面试列表 */
  items?: Lark.InterviewExtend[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface CreateHireOfferResponse extends Lark.OfferInfo {}
export interface OfferHireApplicationResponse {
  offer?: Lark.ApplicationOffer
}
export interface GetHireOfferResponse {
  /** Offer 详情 */
  offer?: Lark.Offer
}
export interface ListHireOfferResponse {
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
  /** Offer 列表 */
  items?: Lark.OfferListInfo[]
}
export interface InternOfferStatusHireOfferResponse extends Lark.InternOfferStatus {}
export interface TransferOnboardHireApplicationResponse {
  /** employee */
  employee?: Lark.Employee
}
export interface PatchHireEmployeeResponse {
  /** 员工信息 */
  employee?: Lark.Employee
}
export interface GetByApplicationHireEmployeeResponse {
  /** 员工信息 */
  employee?: Lark.Employee
}
export interface GetHireEmployeeResponse {
  /** 员工信息 */
  employee?: Lark.Employee
}
export interface CreateHireNoteResponse {
  note?: Lark.Note
}
export interface PatchHireNoteResponse {
  /** 备注数据 */
  note?: Lark.Note
}
export interface GetHireNoteResponse {
  /** 备注数据 */
  note?: Lark.Note
}
export interface ListHireNoteResponse {
  /** 备注数据列表 */
  items?: Lark.Note[]
  /** 是否还有下一页数据 */
  has_more?: boolean
  /** 游标, 翻下一页数据时使用 */
  page_token?: string
}
export interface ListHireResumeSourceResponse extends Paginated<Lark.ResumeSource[], 'items'> {}
export interface CreateHireReferralAccountResponse {
  /** 账号信息 */
  account?: Lark.Account
}
export interface DeactivateHireReferralAccountResponse {
  /** 账号信息 */
  account?: Lark.Account
}
export interface WithdrawHireReferralAccountResponse {
  /** 请求时传入的提现单ID */
  external_order_id?: string
  /** 交易时间戳，需要保存，用于统一交易时间，方便对账 */
  trans_time?: string
  /** 本次提现金额明细 */
  withdrawal_details?: Lark.BonusAmount
}
export interface ReconciliationHireReferralAccountResponse {
  /** 核对失败的信息 */
  check_failed_list?: Lark.CheckFailedAccountInfo[]
}
export interface GetHireAttachmentResponse {
  /** 附件信息 */
  attachment?: Lark.Attachment
}
export interface PreviewHireAttachmentResponse {
  /** 预览链接 */
  url: string
}
export interface CreateOkrPeriodResponse {
  /** 周期id */
  period_id?: string
  /** 周期起始年月 */
  start_month?: string
  /** 周期结束年月 */
  end_month?: string
}
export interface PatchOkrPeriodResponse {
  /** 周期规则id */
  period_id?: string
  /** 周期显示状态 */
  status?: number
}
export interface ListOkrPeriodResponse {
  /** 分页标志 */
  page_token?: string
  /** 是否有更多 */
  has_more?: boolean
  /** 数据项 */
  items?: Lark.Period[]
}
export interface ListOkrPeriodRuleResponse {
  /** 指标库列表 */
  period_rules?: Lark.PeriodRule[]
}
export interface ListOkrUserOkrResponse {
  /** OKR周期总数 */
  total?: number
  /** OKR 列表 */
  okr_list?: Lark.OkrBatch[]
}
export interface BatchGetOkrResponse {
  /** OKR 列表 */
  okr_list?: Lark.OkrBatch[]
}
export interface CreateOkrProgressRecordResponse extends Lark.ProgressRecord {}
export interface UpdateOkrProgressRecordResponse extends Lark.ProgressRecord {}
export interface GetOkrProgressRecordResponse extends Lark.ProgressRecord {}
export interface UploadOkrImageResponse extends Lark.ImageInfo {}
export interface CreateHumanAuthenticationIdentityResponse {
  /** uid of user bind authentication */
  verify_uid: string
}
export interface CreateAcsVisitorResponse {
  /** 访客的id */
  visitor_id: string
}
export interface GetAcsRuleExternalResponse {
  /** 设备权限组信息 */
  rules: Lark.Rule[]
}
export interface CreateAcsRuleExternalResponse {
  /** 权限组id */
  rule_id: string
}
export interface GetAcsUserResponse {
  /** 门禁用户信息 */
  user?: Lark.User
}
export interface ListAcsUserResponse extends Paginated<Lark.User[], 'items'> {}
export interface ListAcsDeviceResponse {
  items?: Lark.Device[]
}
export interface ListAcsAccessRecordResponse extends Paginated<Lark.AccessRecord[], 'items'> {}
export interface ListPerformanceSemesterResponse {
  /** 周期meta信息列表 */
  items?: Lark.Semester[]
}
export interface FindByUserListPerformanceStageTaskResponse {
  /** 周期基础信息 */
  base?: Lark.SemesterBaseInfo
  /** 周期环节信息列表 */
  items?: Lark.StageTask[]
}
export interface FindByPagePerformanceStageTaskResponse {
  /** 周期基础信息 */
  base?: Lark.SemesterBaseInfo
  /** 周期环节信息列表 */
  items?: Lark.StageTask[]
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
}
export interface QueryPerformanceReviewDataResponse extends Lark.ReviewData {}
export interface CreateLingoDraftResponse {
  draft?: Lark.Draft
}
export interface UpdateLingoDraftResponse {
  draft?: Lark.Draft
}
export interface CreateLingoEntityResponse {
  entity?: Lark.Entity
}
export interface UpdateLingoEntityResponse {
  entity?: Lark.Entity
}
export interface GetLingoEntityResponse {
  /** 实体词 */
  entity?: Lark.Entity
}
export interface ListLingoEntityResponse extends Paginated<Lark.Entity[], 'entities'> {}
export interface MatchLingoEntityResponse {
  /** 匹配结果 */
  results?: Lark.MatchInfo[]
}
export interface SearchLingoEntityResponse extends Paginated<Lark.Entity[], 'entities'> {}
export interface HighlightLingoEntityResponse {
  /** 返回识别到的实体词信息 */
  phrases?: Lark.Phrase[]
}
export interface ListLingoClassificationResponse extends Paginated<Lark.Classification[], 'items'> {}
export interface ListLingoRepoResponse {
  /** 词库列表 */
  items?: Lark.Repo[]
}
export interface UploadLingoFileResponse {
  /** 文件 token */
  file_token?: string
}
export interface ListDataSecurityAndComplianceOpenapiLogResponse {
  /** openapi日志列表 */
  items?: Lark.OpenapiLog[]
  /** 分页标记 */
  page_token?: string
  /** 是否有更多数据 */
  has_more?: boolean
}
export interface ListAdminAuditInfoResponse extends Paginated<Lark.AuditInfo[], 'items'> {}
export interface GetMinutesMinuteStatisticsResponse {
  /** 妙记浏览信息统计 */
  statistics?: Lark.Statictics
}
export interface GetMinutesMinuteResponse {
  /** 妙记基本信息 */
  minute?: Lark.Minute
}
export interface SearchWorkplaceWorkplaceAccessDataResponse {
  /** 工作台访问数据 */
  items?: Lark.WorkplaceAccessData[]
  /** 是否还有下一页数据 */
  has_more?: boolean
  /** 分页标记，存在下一页时返回。 */
  page_token?: string
}
export interface SearchWorkplaceCustomWorkplaceAccessDataResponse {
  /** 定制工作台访问数据 */
  items?: Lark.CustomWorkplaceAccessData[]
  /** 是否还有下一页数据 */
  has_more?: boolean
  /** 分页标记，存在下一页时返回 */
  page_token?: string
}
export interface SearchWorkplaceWorkplaceBlockAccessDataResponse {
  /** 工作台中block的访问数据 */
  items?: Lark.BlockAccessData[]
  /** 是否还有下一页数据 */
  has_more?: boolean
  /** 分页标记，存在下一页时返回 */
  page_token?: string
}
export interface FavouriteApplicationResponse extends Paginated<Lark.Application[], 'app_list'> {}
export interface RecommendApplicationResponse extends Paginated<Lark.Application[], 'app_list'> {}
export interface ListApplicationAppRecommendRuleResponse extends Paginated<Lark.AppRecommendRule[], 'rules'> {}
export interface QueryReportRuleResponse {
  /** 规则列表 */
  rules?: Lark.Rule[]
}
export interface QueryReportTaskResponse {
  /** 任务列表 */
  items?: Lark.Task[]
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
}
export interface CreateAuthenAccessTokenResponse extends Lark.UserAccessTokenInfo {}
export interface CreateAuthenRefreshAccessTokenResponse extends Lark.UserAccessTokenInfo {}
export interface CreateBaikeDraftResponse {
  draft?: Lark.Draft
}
export interface UpdateBaikeDraftResponse {
  draft?: Lark.Draft
}
export interface CreateBaikeEntityResponse {
  entity?: Lark.Entity
}
export interface UpdateBaikeEntityResponse {
  entity?: Lark.Entity
}
export interface GetBaikeEntityResponse {
  /** 实体词 */
  entity?: Lark.Entity
}
export interface ListBaikeEntityResponse extends Paginated<Lark.Entity[], 'entities'> {}
export interface MatchBaikeEntityResponse {
  /** 匹配结果 */
  results?: Lark.MatchInfo[]
}
export interface SearchBaikeEntityResponse extends Paginated<Lark.Entity[], 'entities'> {}
export interface HighlightBaikeEntityResponse {
  /** 返回识别到的实体词信息 */
  phrases?: Lark.Phrase[]
}
export interface ExtractBaikeEntityResponse {
  /** 文本中可能的成为百科词条的实体词 */
  entity_word: Lark.EntityWord[]
}
export interface ListBaikeClassificationResponse extends Paginated<Lark.Classification[], 'items'> {}
export interface UploadBaikeFileResponse {
  /** 文件 token */
  file_token?: string
}
export interface ListContactUserResponse extends Paginated<Lark.User[], 'items'> {}
export interface UpdateContactUserResponse {
  user?: Lark.User
}
export interface ListContactDepartmentResponse extends Paginated<Lark.Department[], 'items'> {}
export interface ListBitableAppTableRecordResponse extends Paginated<Lark.AppTableRecord[], 'items'> {}
export interface ListHireApplicationInterviewResponse {
  /** 分页标志 */
  page_token?: string
  /** 是否有更多 */
  has_more?: boolean
  /** 面试列表 */
  items?: Lark.Interview[]
}
export interface GetHireJobManagerResponse {
  /** 职位负责人 */
  info?: Lark.JobManager
}
export interface GetHireOfferSchemaResponse extends Lark.OfferSchema {}
export interface ListCorehrSubregionResponse {
  /** 城市/区域信息 */
  items?: Lark.Subregion[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface GetCorehrSubregionResponse {
  /** 城市/区域信息 */
  subregion?: Lark.Subregion
}
export interface ListCorehrSubdivisionResponse {
  /** 省份/行政区信息 */
  items?: Lark.Subdivision[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface GetCorehrSubdivisionResponse {
  /** 国家/地址信息 */
  subdivision?: Lark.Subdivision
}
export interface ListCorehrCountryRegionResponse {
  /** 国家/地址信息 */
  items?: Lark.CountryRegion[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface GetCorehrCountryRegionResponse {
  /** 国家/地址信息 */
  country_region?: Lark.CountryRegion
}
export interface ListCorehrCurrencyResponse {
  /** 货币信息 */
  items?: Lark.Currency[]
  /** 是否有下一页 */
  has_more?: boolean
  /** 下一页页码 */
  page_token?: string
}
export interface GetCorehrCurrencyResponse {
  /** 货币信息 */
  currency?: Lark.Currency
}
export interface GetCorehrPersonResponse {
  /** 个人信息 */
  person?: Lark.Person
}
export interface SetCheckboardAccessCodeVcRoomConfigResponse {
  /** 部署访问码 */
  access_code?: string
}
export interface SetRoomAccessCodeVcRoomConfigResponse {
  /** 部署访问码 */
  access_code?: string
}
export interface QueryVcRoomConfigResponse extends Lark.RoomConfig {}

Internal.define({
  '/auth/v3/tenant_access_token/internal': {
    POST: 'tenantAccessTokenInternalAuth',
  },
  '/auth/v3/app_access_token/internal': {
    POST: 'appAccessTokenInternalAuth',
  },
  '/auth/v3/app_access_token': {
    POST: 'appAccessTokenAuth',
  },
  '/auth/v3/tenant_access_token': {
    POST: 'tenantAccessTokenAuth',
  },
  '/auth/v3/app_ticket/resend': {
    POST: 'appTicketResendAuth',
  },
}, false)

Internal.define({
  '/event/v1/outbound_ip': {
    GET: 'listEventOutboundIp',
  },
  '/authen/v1/oidc/access_token': {
    POST: 'createAuthenOidcAccessToken',
  },
  '/authen/v1/oidc/refresh_access_token': {
    POST: 'createAuthenOidcRefreshAccessToken',
  },
  '/authen/v1/user_info': {
    GET: 'getAuthenUserInfo',
  },
  '/passport/v1/sessions/query': {
    POST: 'queryPassportSession',
  },
  '/contact/v3/scopes': {
    GET: 'listContactScope',
  },
  '/contact/v3/users': {
    POST: 'createContactUser',
    GET: 'listContactUser',
  },
  '/contact/v3/users/{user_id}': {
    DELETE: 'deleteContactUser',
    PATCH: 'patchContactUser',
    GET: 'getContactUser',
    PUT: 'updateContactUser',
  },
  '/contact/v3/users/{user_id}/resurrect': {
    POST: 'resurrectContactUser',
  },
  '/contact/v3/users/batch': {
    GET: 'batchContactUser',
  },
  '/contact/v3/users/find_by_department': {
    GET: 'findByDepartmentContactUser',
  },
  '/contact/v3/users/batch_get_id': {
    POST: 'batchGetIdContactUser',
  },
  '/contact/v3/users/{user_id}/update_user_id': {
    PATCH: 'updateUserIdContactUser',
  },
  '/contact/v3/group': {
    POST: 'createContactGroup',
  },
  '/contact/v3/group/{group_id}': {
    DELETE: 'deleteContactGroup',
    PATCH: 'patchContactGroup',
    GET: 'getContactGroup',
  },
  '/contact/v3/group/simplelist': {
    GET: 'simplelistContactGroup',
  },
  '/contact/v3/group/member_belong': {
    GET: 'memberBelongContactGroup',
  },
  '/contact/v3/custom_attrs': {
    GET: 'listContactCustomAttr',
  },
  '/contact/v3/employee_type_enums': {
    POST: 'createContactEmployeeTypeEnum',
    GET: 'listContactEmployeeTypeEnum',
  },
  '/contact/v3/employee_type_enums/{enum_id}': {
    DELETE: 'deleteContactEmployeeTypeEnum',
    PUT: 'updateContactEmployeeTypeEnum',
  },
  '/contact/v3/departments': {
    POST: 'createContactDepartment',
    GET: 'listContactDepartment',
  },
  '/contact/v3/departments/{department_id}': {
    DELETE: 'deleteContactDepartment',
    PATCH: 'patchContactDepartment',
    PUT: 'updateContactDepartment',
    GET: 'getContactDepartment',
  },
  '/contact/v3/departments/unbind_department_chat': {
    POST: 'unbindDepartmentChatContactDepartment',
  },
  '/contact/v3/departments/batch': {
    GET: 'batchContactDepartment',
  },
  '/contact/v3/departments/{department_id}/children': {
    GET: 'childrenContactDepartment',
  },
  '/contact/v3/departments/parent': {
    GET: 'parentContactDepartment',
  },
  '/contact/v3/departments/search': {
    POST: 'searchContactDepartment',
  },
  '/contact/v3/departments/{department_id}/update_department_id': {
    PATCH: 'updateDepartmentIdContactDepartment',
  },
  '/contact/v3/unit': {
    POST: 'createContactUnit',
    GET: 'listContactUnit',
  },
  '/contact/v3/unit/{unit_id}': {
    DELETE: 'deleteContactUnit',
    PATCH: 'patchContactUnit',
    GET: 'getContactUnit',
  },
  '/contact/v3/unit/bind_department': {
    POST: 'bindDepartmentContactUnit',
  },
  '/contact/v3/unit/unbind_department': {
    POST: 'unbindDepartmentContactUnit',
  },
  '/contact/v3/unit/list_department': {
    GET: 'listDepartmentContactUnit',
  },
  '/contact/v3/group/{group_id}/member/add': {
    POST: 'addContactGroupMember',
  },
  '/contact/v3/group/{group_id}/member/batch_add': {
    POST: 'batchAddContactGroupMember',
  },
  '/contact/v3/group/{group_id}/member/remove': {
    POST: 'removeContactGroupMember',
  },
  '/contact/v3/group/{group_id}/member/batch_remove': {
    POST: 'batchRemoveContactGroupMember',
  },
  '/contact/v3/group/{group_id}/member/simplelist': {
    GET: 'simplelistContactGroupMember',
  },
  '/contact/v3/functional_roles': {
    POST: 'createContactFunctionalRole',
  },
  '/contact/v3/functional_roles/{role_id}': {
    DELETE: 'deleteContactFunctionalRole',
    PUT: 'updateContactFunctionalRole',
  },
  '/contact/v3/functional_roles/{role_id}/members/batch_create': {
    POST: 'batchCreateContactFunctionalRoleMember',
  },
  '/contact/v3/functional_roles/{role_id}/members/batch_delete': {
    PATCH: 'batchDeleteContactFunctionalRoleMember',
  },
  '/contact/v3/functional_roles/{role_id}/members/scopes': {
    PATCH: 'scopesContactFunctionalRoleMember',
  },
  '/contact/v3/functional_roles/{role_id}/members/{member_id}': {
    GET: 'getContactFunctionalRoleMember',
  },
  '/contact/v3/functional_roles/{role_id}/members': {
    GET: 'listContactFunctionalRoleMember',
  },
  '/contact/v3/job_levels': {
    POST: 'createContactJobLevel',
    GET: 'listContactJobLevel',
  },
  '/contact/v3/job_levels/{job_level_id}': {
    DELETE: 'deleteContactJobLevel',
    PUT: 'updateContactJobLevel',
    GET: 'getContactJobLevel',
  },
  '/contact/v3/job_families': {
    POST: 'createContactJobFamily',
    GET: 'listContactJobFamily',
  },
  '/contact/v3/job_families/{job_family_id}': {
    DELETE: 'deleteContactJobFamily',
    PUT: 'updateContactJobFamily',
    GET: 'getContactJobFamily',
  },
  '/contact/v3/job_titles/{job_title_id}': {
    GET: 'getContactJobTitle',
  },
  '/contact/v3/job_titles': {
    GET: 'listContactJobTitle',
  },
  '/contact/v3/work_cities/{work_city_id}': {
    GET: 'getContactWorkCity',
  },
  '/contact/v3/work_cities': {
    GET: 'listContactWorkCity',
  },
  '/im/v1/messages': {
    POST: 'createImMessage',
    GET: 'listImMessage',
  },
  '/im/v1/messages/{message_id}/reply': {
    POST: 'replyImMessage',
  },
  '/im/v1/messages/{message_id}': {
    PUT: 'updateImMessage',
    DELETE: 'deleteImMessage',
    GET: 'getImMessage',
    PATCH: 'patchImMessage',
  },
  '/im/v1/messages/{message_id}/forward': {
    POST: 'forwardImMessage',
  },
  '/im/v1/messages/merge_forward': {
    POST: 'mergeForwardImMessage',
  },
  '/im/v1/threads/{thread_id}/forward': {
    POST: 'forwardImThread',
  },
  '/im/v1/messages/{message_id}/read_users': {
    GET: 'readUsersImMessage',
  },
  '/im/v1/messages/{message_id}/resources/{file_key}': {
    GET: 'getImMessageResource',
  },
  '/im/v1/messages/{message_id}/urgent_app': {
    PATCH: 'urgentAppImMessage',
  },
  '/im/v1/messages/{message_id}/urgent_sms': {
    PATCH: 'urgentSmsImMessage',
  },
  '/im/v1/messages/{message_id}/urgent_phone': {
    PATCH: 'urgentPhoneImMessage',
  },
  '/im/v1/batch_messages/{batch_message_id}': {
    DELETE: 'deleteImBatchMessage',
  },
  '/im/v1/batch_messages/{batch_message_id}/read_user': {
    GET: 'readUserImBatchMessage',
  },
  '/im/v1/batch_messages/{batch_message_id}/get_progress': {
    GET: 'getProgressImBatchMessage',
  },
  '/im/v1/images': {
    POST: 'createImImage',
  },
  '/im/v1/images/{image_key}': {
    GET: 'getImImage',
  },
  '/im/v1/files': {
    POST: 'createImFile',
  },
  '/im/v1/files/{file_key}': {
    GET: 'getImFile',
  },
  '/im/v1/messages/{message_id}/reactions': {
    POST: 'createImMessageReaction',
    GET: 'listImMessageReaction',
  },
  '/im/v1/messages/{message_id}/reactions/{reaction_id}': {
    DELETE: 'deleteImMessageReaction',
  },
  '/im/v1/pins': {
    POST: 'createImPin',
    GET: 'listImPin',
  },
  '/im/v1/pins/{message_id}': {
    DELETE: 'deleteImPin',
  },
  '/im/v1/chats': {
    POST: 'createImChat',
    GET: 'listImChat',
  },
  '/im/v1/chats/{chat_id}': {
    DELETE: 'deleteImChat',
    PUT: 'updateImChat',
    GET: 'getImChat',
  },
  '/im/v1/chats/{chat_id}/moderation': {
    PUT: 'updateImChatModeration',
    GET: 'getImChatModeration',
  },
  '/im/v1/chats/{chat_id}/top_notice/put_top_notice': {
    POST: 'putTopNoticeImChatTopNotice',
  },
  '/im/v1/chats/{chat_id}/top_notice/delete_top_notice': {
    POST: 'deleteTopNoticeImChatTopNotice',
  },
  '/im/v1/chats/search': {
    GET: 'searchImChat',
  },
  '/im/v1/chats/{chat_id}/link': {
    POST: 'linkImChat',
  },
  '/im/v1/chats/{chat_id}/managers/add_managers': {
    POST: 'addManagersImChatManagers',
  },
  '/im/v1/chats/{chat_id}/managers/delete_managers': {
    POST: 'deleteManagersImChatManagers',
  },
  '/im/v1/chats/{chat_id}/members': {
    POST: 'createImChatMembers',
    DELETE: 'deleteImChatMembers',
    GET: 'getImChatMembers',
  },
  '/im/v1/chats/{chat_id}/members/me_join': {
    PATCH: 'meJoinImChatMembers',
  },
  '/im/v1/chats/{chat_id}/members/is_in_chat': {
    GET: 'isInChatImChatMembers',
  },
  '/im/v1/chats/{chat_id}/announcement': {
    PATCH: 'patchImChatAnnouncement',
    GET: 'getImChatAnnouncement',
  },
  '/im/v1/chats/{chat_id}/chat_tabs': {
    POST: 'createImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/delete_tabs': {
    DELETE: 'deleteTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/update_tabs': {
    POST: 'updateTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/sort_tabs': {
    POST: 'sortTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/chat_tabs/list_tabs': {
    GET: 'listTabsImChatTab',
  },
  '/im/v1/chats/{chat_id}/menu_tree': {
    POST: 'createImChatMenuTree',
    DELETE: 'deleteImChatMenuTree',
    GET: 'getImChatMenuTree',
  },
  '/im/v1/chats/{chat_id}/menu_items/{menu_item_id}': {
    PATCH: 'patchImChatMenuItem',
  },
  '/im/v1/chats/{chat_id}/menu_tree/sort': {
    POST: 'sortImChatMenuTree',
  },
  '/drive/v1/files': {
    GET: 'listDrivev1File',
  },
  '/drive/v1/files/create_folder': {
    POST: 'createFolderDrivev1File',
  },
  '/drive/v1/metas/batch_query': {
    POST: 'batchQueryDrivev1Meta',
  },
  '/drive/v1/files/{file_token}/statistics': {
    GET: 'getDrivev1FileStatistics',
  },
  '/drive/v1/files/{file_token}/copy': {
    POST: 'copyDrivev1File',
  },
  '/drive/v1/files/{file_token}/move': {
    POST: 'moveDrivev1File',
  },
  '/drive/v1/files/{file_token}': {
    DELETE: 'deleteDrivev1File',
  },
  '/drive/v1/files/create_shortcut': {
    POST: 'createShortcutDrivev1File',
  },
  '/drive/v1/files/task_check': {
    GET: 'taskCheckDrivev1File',
  },
  '/drive/v1/medias/upload_all': {
    POST: 'uploadAllDrivev1Media',
  },
  '/drive/v1/medias/{file_token}/download': {
    GET: 'downloadDrivev1Media',
  },
  '/drive/v1/medias/batch_get_tmp_download_url': {
    GET: 'batchGetTmpDownloadUrlDrivev1Media',
  },
  '/drive/v1/medias/upload_prepare': {
    POST: 'uploadPrepareDrivev1Media',
  },
  '/drive/v1/medias/upload_part': {
    POST: 'uploadPartDrivev1Media',
  },
  '/drive/v1/medias/upload_finish': {
    POST: 'uploadFinishDrivev1Media',
  },
  '/drive/v1/files/{file_token}/subscribe': {
    POST: 'subscribeDrivev1File',
  },
  '/drive/v1/files/{file_token}/delete_subscribe': {
    DELETE: 'deleteSubscribeDrivev1File',
  },
  '/drive/v1/files/{file_token}/get_subscribe': {
    GET: 'getSubscribeDrivev1File',
  },
  '/drive/v1/files/upload_all': {
    POST: 'uploadAllDrivev1File',
  },
  '/drive/v1/files/upload_prepare': {
    POST: 'uploadPrepareDrivev1File',
  },
  '/drive/v1/files/upload_part': {
    POST: 'uploadPartDrivev1File',
  },
  '/drive/v1/files/upload_finish': {
    POST: 'uploadFinishDrivev1File',
  },
  '/drive/v1/files/{file_token}/download': {
    GET: 'downloadDrivev1File',
  },
  '/drive/v1/import_tasks': {
    POST: 'createDrivev1ImportTask',
  },
  '/drive/v1/import_tasks/{ticket}': {
    GET: 'getDrivev1ImportTask',
  },
  '/drive/v1/export_tasks': {
    POST: 'createDrivev1ExportTask',
  },
  '/drive/v1/export_tasks/{ticket}': {
    GET: 'getDrivev1ExportTask',
  },
  '/drive/v1/export_tasks/file/{file_token}/download': {
    GET: 'downloadDrivev1ExportTask',
  },
  '/drive/v1/files/{file_token}/view_records': {
    GET: 'listDrivev1FileViewRecord',
  },
  '/drive/v1/files/{file_token}/versions': {
    POST: 'createDrivev1FileVersion',
    GET: 'listDrivev1FileVersion',
  },
  '/drive/v1/files/{file_token}/versions/{version_id}': {
    DELETE: 'deleteDrivev1FileVersion',
    GET: 'getDrivev1FileVersion',
  },
  '/drive/v1/permissions/{token}/members/transfer_owner': {
    POST: 'transferOwnerDrivev1PermissionMember',
  },
  '/drive/v1/permissions/{token}/members/auth': {
    GET: 'authDrivev1PermissionMember',
  },
  '/drive/v1/permissions/{token}/members': {
    GET: 'listDrivev1PermissionMember',
    POST: 'createDrivev1PermissionMember',
  },
  '/drive/v1/permissions/{token}/members/{member_id}': {
    PUT: 'updateDrivev1PermissionMember',
    DELETE: 'deleteDrivev1PermissionMember',
  },
  '/drive/v1/permissions/{token}/public/password': {
    POST: 'createDrivev1PermissionPublicPassword',
    PUT: 'updateDrivev1PermissionPublicPassword',
    DELETE: 'deleteDrivev1PermissionPublicPassword',
  },
  '/drive/v1/permissions/{token}/public': {
    GET: 'getDrivev1PermissionPublic',
    PATCH: 'patchDrivev1PermissionPublic',
  },
  '/drive/v2/permissions/{token}/public': {
    GET: 'getDrivev2PermissionPublic',
    PATCH: 'patchDrivev2PermissionPublic',
  },
  '/drive/v1/files/{file_token}/comments': {
    GET: 'listDrivev1FileComment',
    POST: 'createDrivev1FileComment',
  },
  '/drive/v1/files/{file_token}/comments/batch_query': {
    POST: 'batchQueryDrivev1FileComment',
  },
  '/drive/v1/files/{file_token}/comments/{comment_id}': {
    PATCH: 'patchDrivev1FileComment',
    GET: 'getDrivev1FileComment',
  },
  '/drive/v1/files/{file_token}/comments/{comment_id}/replies': {
    GET: 'listDrivev1FileCommentReply',
  },
  '/drive/v1/files/{file_token}/comments/{comment_id}/replies/{reply_id}': {
    PUT: 'updateDrivev1FileCommentReply',
    DELETE: 'deleteDrivev1FileCommentReply',
  },
  '/docx/v1/documents/{document_id}': {
    GET: 'getDocxDocument',
  },
  '/docx/v1/documents/{document_id}/raw_content': {
    GET: 'rawContentDocxDocument',
  },
  '/docx/v1/documents/{document_id}/blocks': {
    GET: 'listDocxDocumentBlock',
  },
  '/docx/v1/documents': {
    POST: 'createDocxDocument',
  },
  '/docx/v1/documents/{document_id}/blocks/{block_id}': {
    GET: 'getDocxDocumentBlock',
    PATCH: 'patchDocxDocumentBlock',
  },
  '/docx/v1/documents/{document_id}/blocks/{block_id}/children': {
    GET: 'getDocxDocumentBlockChildren',
    POST: 'createDocxDocumentBlockChildren',
  },
  '/docx/v1/documents/{document_id}/blocks/batch_update': {
    PATCH: 'batchUpdateDocxDocumentBlock',
  },
  '/docx/v1/documents/{document_id}/blocks/{block_id}/children/batch_delete': {
    DELETE: 'batchDeleteDocxDocumentBlockChildren',
  },
  '/board/v1/whiteboards/{whiteboard_id}/nodes': {
    GET: 'listBoardWhiteboardNode',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}': {
    PATCH: 'patchSheetsSpreadsheet',
    GET: 'getSheetsSpreadsheet',
  },
  '/sheets/v3/spreadsheets': {
    POST: 'createSheetsSpreadsheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}': {
    GET: 'getSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/query': {
    GET: 'querySheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/move_dimension': {
    POST: 'moveDimensionSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/find': {
    POST: 'findSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/replace': {
    POST: 'replaceSheetsSpreadsheetSheet',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter': {
    GET: 'getSheetsSpreadsheetSheetFilter',
    POST: 'createSheetsSpreadsheetSheetFilter',
    PUT: 'updateSheetsSpreadsheetSheetFilter',
    DELETE: 'deleteSheetsSpreadsheetSheetFilter',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}': {
    GET: 'getSheetsSpreadsheetSheetFilterView',
    PATCH: 'patchSheetsSpreadsheetSheetFilterView',
    DELETE: 'deleteSheetsSpreadsheetSheetFilterView',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/query': {
    GET: 'querySheetsSpreadsheetSheetFilterView',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views': {
    POST: 'createSheetsSpreadsheetSheetFilterView',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}/conditions/{condition_id}': {
    GET: 'getSheetsSpreadsheetSheetFilterViewCondition',
    PUT: 'updateSheetsSpreadsheetSheetFilterViewCondition',
    DELETE: 'deleteSheetsSpreadsheetSheetFilterViewCondition',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}/conditions/query': {
    GET: 'querySheetsSpreadsheetSheetFilterViewCondition',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/filter_views/{filter_view_id}/conditions': {
    POST: 'createSheetsSpreadsheetSheetFilterViewCondition',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/float_images/{float_image_id}': {
    GET: 'getSheetsSpreadsheetSheetFloatImage',
    PATCH: 'patchSheetsSpreadsheetSheetFloatImage',
    DELETE: 'deleteSheetsSpreadsheetSheetFloatImage',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/float_images/query': {
    GET: 'querySheetsSpreadsheetSheetFloatImage',
  },
  '/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/{sheet_id}/float_images': {
    POST: 'createSheetsSpreadsheetSheetFloatImage',
  },
  '/bitable/v1/apps/{app_token}/copy': {
    POST: 'copyBitableApp',
  },
  '/bitable/v1/apps': {
    POST: 'createBitableApp',
  },
  '/bitable/v1/apps/{app_token}': {
    GET: 'getBitableApp',
    PUT: 'updateBitableApp',
  },
  '/bitable/v1/apps/{app_token}/tables': {
    POST: 'createBitableAppTable',
    GET: 'listBitableAppTable',
  },
  '/bitable/v1/apps/{app_token}/tables/batch_create': {
    POST: 'batchCreateBitableAppTable',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}': {
    DELETE: 'deleteBitableAppTable',
    PATCH: 'patchBitableAppTable',
  },
  '/bitable/v1/apps/{app_token}/tables/batch_delete': {
    POST: 'batchDeleteBitableAppTable',
  },
  '/bitable/v1/apps/{app_token}/dashboards/{block_id}/copy': {
    POST: 'copyBitableAppDashboard',
  },
  '/bitable/v1/apps/{app_token}/dashboards': {
    GET: 'listBitableAppDashboard',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/views/{view_id}': {
    PATCH: 'patchBitableAppTableView',
    GET: 'getBitableAppTableView',
    DELETE: 'deleteBitableAppTableView',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/views': {
    GET: 'listBitableAppTableView',
    POST: 'createBitableAppTableView',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}': {
    PATCH: 'patchBitableAppTableForm',
    GET: 'getBitableAppTableForm',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}/fields/{field_id}': {
    PATCH: 'patchBitableAppTableFormField',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}/fields': {
    GET: 'listBitableAppTableFormField',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/{record_id}': {
    GET: 'getBitableAppTableRecord',
    PUT: 'updateBitableAppTableRecord',
    DELETE: 'deleteBitableAppTableRecord',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/search': {
    POST: 'searchBitableAppTableRecord',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records': {
    POST: 'createBitableAppTableRecord',
    GET: 'listBitableAppTableRecord',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_create': {
    POST: 'batchCreateBitableAppTableRecord',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_update': {
    POST: 'batchUpdateBitableAppTableRecord',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_delete': {
    POST: 'batchDeleteBitableAppTableRecord',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/fields': {
    GET: 'listBitableAppTableField',
    POST: 'createBitableAppTableField',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/fields/{field_id}': {
    PUT: 'updateBitableAppTableField',
    DELETE: 'deleteBitableAppTableField',
  },
  '/bitable/v1/apps/{app_token}/roles': {
    GET: 'listBitableAppRole',
    POST: 'createBitableAppRole',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}': {
    DELETE: 'deleteBitableAppRole',
    PUT: 'updateBitableAppRole',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members/batch_delete': {
    POST: 'batchDeleteBitableAppRoleMember',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members/batch_create': {
    POST: 'batchCreateBitableAppRoleMember',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members': {
    GET: 'listBitableAppRoleMember',
    POST: 'createBitableAppRoleMember',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members/{member_id}': {
    DELETE: 'deleteBitableAppRoleMember',
  },
  '/wiki/v2/spaces': {
    GET: 'listWikiSpace',
    POST: 'createWikiSpace',
  },
  '/wiki/v2/spaces/{space_id}': {
    GET: 'getWikiSpace',
  },
  '/wiki/v2/spaces/{space_id}/members': {
    POST: 'createWikiSpaceMember',
  },
  '/wiki/v2/spaces/{space_id}/members/{member_id}': {
    DELETE: 'deleteWikiSpaceMember',
  },
  '/wiki/v2/spaces/{space_id}/setting': {
    PUT: 'updateWikiSpaceSetting',
  },
  '/wiki/v2/spaces/{space_id}/nodes': {
    POST: 'createWikiSpaceNode',
    GET: 'listWikiSpaceNode',
  },
  '/wiki/v2/spaces/get_node': {
    GET: 'getNodeWikiSpace',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/move': {
    POST: 'moveWikiSpaceNode',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/update_title': {
    POST: 'updateTitleWikiSpaceNode',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/copy': {
    POST: 'copyWikiSpaceNode',
  },
  '/wiki/v2/spaces/{space_id}/nodes/move_docs_to_wiki': {
    POST: 'moveDocsToWikiWikiSpaceNode',
  },
  '/wiki/v2/tasks/{task_id}': {
    GET: 'getWikiTask',
  },
  '/wiki/v1/nodes/search': {
    POST: 'searchWikiNode',
  },
  '/drive/v1/files/{file_token}/subscriptions/{subscription_id}': {
    GET: 'getDrivev1FileSubscription',
    PATCH: 'patchDrivev1FileSubscription',
  },
  '/drive/v1/files/{file_token}/subscriptions': {
    POST: 'createDrivev1FileSubscription',
  },
  '/calendar/v4/calendars': {
    POST: 'createCalendar',
    GET: 'listCalendar',
  },
  '/calendar/v4/calendars/{calendar_id}': {
    DELETE: 'deleteCalendar',
    GET: 'getCalendar',
    PATCH: 'patchCalendar',
  },
  '/calendar/v4/calendars/primary': {
    POST: 'primaryCalendar',
  },
  '/calendar/v4/freebusy/list': {
    POST: 'listCalendarFreebusy',
  },
  '/calendar/v4/calendars/search': {
    POST: 'searchCalendar',
  },
  '/calendar/v4/calendars/{calendar_id}/subscribe': {
    POST: 'subscribeCalendar',
  },
  '/calendar/v4/calendars/{calendar_id}/unsubscribe': {
    POST: 'unsubscribeCalendar',
  },
  '/calendar/v4/calendars/subscription': {
    POST: 'subscriptionCalendar',
  },
  '/calendar/v4/calendars/unsubscription': {
    POST: 'unsubscriptionCalendar',
  },
  '/calendar/v4/calendars/{calendar_id}/acls': {
    POST: 'createCalendarCalendarAcl',
    GET: 'listCalendarCalendarAcl',
  },
  '/calendar/v4/calendars/{calendar_id}/acls/{acl_id}': {
    DELETE: 'deleteCalendarCalendarAcl',
  },
  '/calendar/v4/calendars/{calendar_id}/acls/subscription': {
    POST: 'subscriptionCalendarCalendarAcl',
  },
  '/calendar/v4/calendars/{calendar_id}/acls/unsubscription': {
    POST: 'unsubscriptionCalendarCalendarAcl',
  },
  '/calendar/v4/calendars/{calendar_id}/events': {
    POST: 'createCalendarCalendarEvent',
    GET: 'listCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}': {
    DELETE: 'deleteCalendarCalendarEvent',
    PATCH: 'patchCalendarCalendarEvent',
    GET: 'getCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/search': {
    POST: 'searchCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/subscription': {
    POST: 'subscriptionCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/unsubscription': {
    POST: 'unsubscriptionCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/reply': {
    POST: 'replyCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/instances': {
    GET: 'instancesCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/instance_view': {
    GET: 'instanceViewCalendarCalendarEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/meeting_chat': {
    POST: 'createCalendarCalendarEventMeetingChat',
    DELETE: 'deleteCalendarCalendarEventMeetingChat',
  },
  '/calendar/v4/timeoff_events': {
    POST: 'createCalendarTimeoffEvent',
  },
  '/calendar/v4/timeoff_events/{timeoff_event_id}': {
    DELETE: 'deleteCalendarTimeoffEvent',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees': {
    POST: 'createCalendarCalendarEventAttendee',
    GET: 'listCalendarCalendarEventAttendee',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees/batch_delete': {
    POST: 'batchDeleteCalendarCalendarEventAttendee',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees/{attendee_id}/chat_members': {
    GET: 'listCalendarCalendarEventAttendeeChatMember',
  },
  '/calendar/v4/settings/generate_caldav_conf': {
    POST: 'generateCaldavConfCalendarSetting',
  },
  '/calendar/v4/exchange_bindings': {
    POST: 'createCalendarExchangeBinding',
  },
  '/calendar/v4/exchange_bindings/{exchange_binding_id}': {
    DELETE: 'deleteCalendarExchangeBinding',
    GET: 'getCalendarExchangeBinding',
  },
  '/vc/v1/reserves/apply': {
    POST: 'applyVcReserve',
  },
  '/vc/v1/reserves/{reserve_id}': {
    DELETE: 'deleteVcReserve',
    PUT: 'updateVcReserve',
    GET: 'getVcReserve',
  },
  '/vc/v1/reserves/{reserve_id}/get_active_meeting': {
    GET: 'getActiveMeetingVcReserve',
  },
  '/vc/v1/meetings/{meeting_id}/invite': {
    PATCH: 'inviteVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}/kickout': {
    POST: 'kickoutVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}/set_host': {
    PATCH: 'setHostVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}/end': {
    PATCH: 'endVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}': {
    GET: 'getVcMeeting',
  },
  '/vc/v1/meetings/list_by_no': {
    GET: 'listByNoVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}/recording/start': {
    PATCH: 'startVcMeetingRecording',
  },
  '/vc/v1/meetings/{meeting_id}/recording/stop': {
    PATCH: 'stopVcMeetingRecording',
  },
  '/vc/v1/meetings/{meeting_id}/recording': {
    GET: 'getVcMeetingRecording',
  },
  '/vc/v1/meetings/{meeting_id}/recording/set_permission': {
    PATCH: 'setPermissionVcMeetingRecording',
  },
  '/vc/v1/reports/get_daily': {
    GET: 'getDailyVcReport',
  },
  '/vc/v1/reports/get_top_user': {
    GET: 'getTopUserVcReport',
  },
  '/vc/v1/exports/meeting_list': {
    POST: 'meetingListVcExport',
  },
  '/vc/v1/exports/participant_list': {
    POST: 'participantListVcExport',
  },
  '/vc/v1/exports/participant_quality_list': {
    POST: 'participantQualityListVcExport',
  },
  '/vc/v1/exports/resource_reservation_list': {
    POST: 'resourceReservationListVcExport',
  },
  '/vc/v1/exports/{task_id}': {
    GET: 'getVcExport',
  },
  '/vc/v1/exports/download': {
    GET: 'downloadVcExport',
  },
  '/vc/v1/room_levels': {
    POST: 'createVcRoomLevel',
    GET: 'listVcRoomLevel',
  },
  '/vc/v1/room_levels/del': {
    POST: 'delVcRoomLevel',
  },
  '/vc/v1/room_levels/{room_level_id}': {
    PATCH: 'patchVcRoomLevel',
    GET: 'getVcRoomLevel',
  },
  '/vc/v1/room_levels/mget': {
    POST: 'mgetVcRoomLevel',
  },
  '/vc/v1/room_levels/search': {
    GET: 'searchVcRoomLevel',
  },
  '/vc/v1/rooms': {
    POST: 'createVcRoom',
    GET: 'listVcRoom',
  },
  '/vc/v1/rooms/{room_id}': {
    DELETE: 'deleteVcRoom',
    PATCH: 'patchVcRoom',
    GET: 'getVcRoom',
  },
  '/vc/v1/rooms/mget': {
    POST: 'mgetVcRoom',
  },
  '/vc/v1/rooms/search': {
    POST: 'searchVcRoom',
  },
  '/vc/v1/scope_config': {
    GET: 'getVcScopeConfig',
    POST: 'createVcScopeConfig',
  },
  '/vc/v1/reserve_configs/reserve_scope': {
    GET: 'reserveScopeVcReserveConfig',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}': {
    PATCH: 'patchVcReserveConfig',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}/form': {
    GET: 'getVcReserveConfigForm',
    PATCH: 'patchVcReserveConfigForm',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}/admin': {
    GET: 'getVcReserveConfigAdmin',
    PATCH: 'patchVcReserveConfigAdmin',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}/disable_inform': {
    GET: 'getVcReserveConfigDisableInform',
    PATCH: 'patchVcReserveConfigDisableInform',
  },
  '/vc/v1/meeting_list': {
    GET: 'getVcMeetingList',
  },
  '/vc/v1/participant_list': {
    GET: 'getVcParticipantList',
  },
  '/vc/v1/participant_quality_list': {
    GET: 'getVcParticipantQualityList',
  },
  '/vc/v1/resource_reservation_list': {
    GET: 'getVcResourceReservationList',
  },
  '/vc/v1/alerts': {
    GET: 'listVcAlert',
  },
  '/attendance/v1/shifts': {
    POST: 'createAttendanceShift',
    GET: 'listAttendanceShift',
  },
  '/attendance/v1/shifts/{shift_id}': {
    DELETE: 'deleteAttendanceShift',
    GET: 'getAttendanceShift',
  },
  '/attendance/v1/shifts/query': {
    POST: 'queryAttendanceShift',
  },
  '/attendance/v1/groups': {
    POST: 'createAttendanceGroup',
    GET: 'listAttendanceGroup',
  },
  '/attendance/v1/groups/{group_id}': {
    DELETE: 'deleteAttendanceGroup',
    GET: 'getAttendanceGroup',
  },
  '/attendance/v1/groups/search': {
    POST: 'searchAttendanceGroup',
  },
  '/attendance/v1/user_daily_shifts/batch_create': {
    POST: 'batchCreateAttendanceUserDailyShift',
  },
  '/attendance/v1/user_daily_shifts/query': {
    POST: 'queryAttendanceUserDailyShift',
  },
  '/attendance/v1/user_stats_views/{user_stats_view_id}': {
    PUT: 'updateAttendanceUserStatsView',
  },
  '/attendance/v1/user_stats_fields/query': {
    POST: 'queryAttendanceUserStatsField',
  },
  '/attendance/v1/user_stats_views/query': {
    POST: 'queryAttendanceUserStatsView',
  },
  '/attendance/v1/user_stats_datas/query': {
    POST: 'queryAttendanceUserStatsData',
  },
  '/attendance/v1/user_approvals/query': {
    POST: 'queryAttendanceUserApproval',
  },
  '/attendance/v1/user_approvals': {
    POST: 'createAttendanceUserApproval',
  },
  '/attendance/v1/approval_infos/process': {
    POST: 'processAttendanceApprovalInfo',
  },
  '/attendance/v1/user_task_remedys': {
    POST: 'createAttendanceUserTaskRemedy',
  },
  '/attendance/v1/user_task_remedys/query_user_allowed_remedys': {
    POST: 'queryUserAllowedRemedysAttendanceUserTaskRemedy',
  },
  '/attendance/v1/user_task_remedys/query': {
    POST: 'queryAttendanceUserTaskRemedy',
  },
  '/attendance/v1/user_flows/batch_create': {
    POST: 'batchCreateAttendanceUserFlow',
  },
  '/attendance/v1/user_flows/{user_flow_id}': {
    GET: 'getAttendanceUserFlow',
  },
  '/attendance/v1/user_flows/query': {
    POST: 'queryAttendanceUserFlow',
  },
  '/attendance/v1/user_tasks/query': {
    POST: 'queryAttendanceUserTask',
  },
  '/attendance/v1/user_settings/modify': {
    POST: 'modifyAttendanceUserSetting',
  },
  '/attendance/v1/user_settings/query': {
    GET: 'queryAttendanceUserSetting',
  },
  '/attendance/v1/files/upload': {
    POST: 'uploadAttendanceFile',
  },
  '/attendance/v1/files/{file_id}/download': {
    GET: 'downloadAttendanceFile',
  },
  '/attendance/v1/leave_employ_expire_records/{leave_id}': {
    GET: 'getAttendanceLeaveEmployExpireRecord',
  },
  '/attendance/v1/leave_accrual_record/{leave_id}': {
    PATCH: 'patchAttendanceLeaveAccrualRecord',
  },
  '/approval/v4/approvals': {
    POST: 'createApproval',
  },
  '/approval/v4/approvals/{approval_code}': {
    GET: 'getApproval',
  },
  '/approval/v4/instances': {
    POST: 'createApprovalInstance',
    GET: 'listApprovalInstance',
  },
  '/approval/v4/instances/cancel': {
    POST: 'cancelApprovalInstance',
  },
  '/approval/v4/instances/cc': {
    POST: 'ccApprovalInstance',
  },
  '/approval/v4/instances/preview': {
    POST: 'previewApprovalInstance',
  },
  '/approval/v4/instances/{instance_id}': {
    GET: 'getApprovalInstance',
  },
  '/approval/v4/tasks/approve': {
    POST: 'approveApprovalTask',
  },
  '/approval/v4/tasks/reject': {
    POST: 'rejectApprovalTask',
  },
  '/approval/v4/tasks/transfer': {
    POST: 'transferApprovalTask',
  },
  '/approval/v4/instances/specified_rollback': {
    POST: 'specifiedRollbackApprovalInstance',
  },
  '/approval/v4/instances/add_sign': {
    POST: 'addSignApprovalInstance',
  },
  '/approval/v4/tasks/resubmit': {
    POST: 'resubmitApprovalTask',
  },
  '/approval/v4/instances/{instance_id}/comments': {
    POST: 'createApprovalInstanceComment',
    GET: 'listApprovalInstanceComment',
  },
  '/approval/v4/instances/{instance_id}/comments/{comment_id}': {
    DELETE: 'deleteApprovalInstanceComment',
  },
  '/approval/v4/instances/{instance_id}/comments/remove': {
    POST: 'removeApprovalInstanceComment',
  },
  '/approval/v4/external_approvals': {
    POST: 'createApprovalExternalApproval',
  },
  '/approval/v4/external_approvals/{approval_code}': {
    GET: 'getApprovalExternalApproval',
  },
  '/approval/v4/external_instances': {
    POST: 'createApprovalExternalInstance',
  },
  '/approval/v4/external_instances/check': {
    POST: 'checkApprovalExternalInstance',
  },
  '/approval/v4/external_tasks': {
    GET: 'listApprovalExternalTask',
  },
  '/approval/v4/instances/query': {
    POST: 'queryApprovalInstance',
  },
  '/approval/v4/instances/search_cc': {
    POST: 'searchCcApprovalInstance',
  },
  '/approval/v4/tasks/search': {
    POST: 'searchApprovalTask',
  },
  '/approval/v4/tasks/query': {
    GET: 'queryApprovalTask',
  },
  '/approval/v4/approvals/{approval_code}/subscribe': {
    POST: 'subscribeApproval',
  },
  '/approval/v4/approvals/{approval_code}/unsubscribe': {
    POST: 'unsubscribeApproval',
  },
  '/helpdesk/v1/agents/{agent_id}': {
    PATCH: 'patchHelpdeskAgent',
  },
  '/helpdesk/v1/agent_emails': {
    GET: 'agentEmailHelpdeskAgent',
  },
  '/helpdesk/v1/agent_schedules': {
    POST: 'createHelpdeskAgentSchedule',
    GET: 'listHelpdeskAgentSchedule',
  },
  '/helpdesk/v1/agents/{agent_id}/schedules': {
    DELETE: 'deleteHelpdeskAgentSchedules',
    PATCH: 'patchHelpdeskAgentSchedules',
    GET: 'getHelpdeskAgentSchedules',
  },
  '/helpdesk/v1/agent_skills': {
    POST: 'createHelpdeskAgentSkill',
    GET: 'listHelpdeskAgentSkill',
  },
  '/helpdesk/v1/agent_skills/{agent_skill_id}': {
    DELETE: 'deleteHelpdeskAgentSkill',
    PATCH: 'patchHelpdeskAgentSkill',
    GET: 'getHelpdeskAgentSkill',
  },
  '/helpdesk/v1/agent_skill_rules': {
    GET: 'listHelpdeskAgentSkillRule',
  },
  '/helpdesk/v1/start_service': {
    POST: 'startServiceHelpdeskTicket',
  },
  '/helpdesk/v1/tickets/{ticket_id}': {
    GET: 'getHelpdeskTicket',
    PUT: 'updateHelpdeskTicket',
  },
  '/helpdesk/v1/tickets': {
    GET: 'listHelpdeskTicket',
  },
  '/helpdesk/v1/ticket_images': {
    GET: 'ticketImageHelpdeskTicket',
  },
  '/helpdesk/v1/tickets/{ticket_id}/answer_user_query': {
    POST: 'answerUserQueryHelpdeskTicket',
  },
  '/helpdesk/v1/customized_fields': {
    GET: 'customizedFieldsHelpdeskTicket',
  },
  '/helpdesk/v1/tickets/{ticket_id}/messages': {
    POST: 'createHelpdeskTicketMessage',
    GET: 'listHelpdeskTicketMessage',
  },
  '/helpdesk/v1/message': {
    POST: 'createHelpdeskBotMessage',
  },
  '/helpdesk/v1/ticket_customized_fields': {
    POST: 'createHelpdeskTicketCustomizedField',
    GET: 'listHelpdeskTicketCustomizedField',
  },
  '/helpdesk/v1/ticket_customized_fields/{ticket_customized_field_id}': {
    DELETE: 'deleteHelpdeskTicketCustomizedField',
    PATCH: 'patchHelpdeskTicketCustomizedField',
    GET: 'getHelpdeskTicketCustomizedField',
  },
  '/helpdesk/v1/faqs': {
    POST: 'createHelpdeskFaq',
    GET: 'listHelpdeskFaq',
  },
  '/helpdesk/v1/faqs/{id}': {
    DELETE: 'deleteHelpdeskFaq',
    PATCH: 'patchHelpdeskFaq',
    GET: 'getHelpdeskFaq',
  },
  '/helpdesk/v1/faqs/{id}/image/{image_key}': {
    GET: 'faqImageHelpdeskFaq',
  },
  '/helpdesk/v1/faqs/search': {
    GET: 'searchHelpdeskFaq',
  },
  '/helpdesk/v1/categories': {
    POST: 'createHelpdeskCategory',
    GET: 'listHelpdeskCategory',
  },
  '/helpdesk/v1/categories/{id}': {
    GET: 'getHelpdeskCategory',
    PATCH: 'patchHelpdeskCategory',
    DELETE: 'deleteHelpdeskCategory',
  },
  '/helpdesk/v1/notifications': {
    POST: 'createHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}': {
    PATCH: 'patchHelpdeskNotification',
    GET: 'getHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/preview': {
    POST: 'previewHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/submit_approve': {
    POST: 'submitApproveHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/cancel_approve': {
    POST: 'cancelApproveHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/execute_send': {
    POST: 'executeSendHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/cancel_send': {
    POST: 'cancelSendHelpdeskNotification',
  },
  '/helpdesk/v1/events/subscribe': {
    POST: 'subscribeHelpdeskEvent',
  },
  '/helpdesk/v1/events/unsubscribe': {
    POST: 'unsubscribeHelpdeskEvent',
  },
  '/task/v1/tasks': {
    POST: 'createTaskv1',
    GET: 'listTaskv1',
  },
  '/task/v1/tasks/{task_id}': {
    DELETE: 'deleteTaskv1',
    PATCH: 'patchTaskv1',
    GET: 'getTaskv1',
  },
  '/task/v1/tasks/{task_id}/complete': {
    POST: 'completeTaskv1',
  },
  '/task/v1/tasks/{task_id}/uncomplete': {
    POST: 'uncompleteTaskv1',
  },
  '/task/v1/tasks/{task_id}/reminders': {
    POST: 'createTaskv1TaskReminder',
    GET: 'listTaskv1TaskReminder',
  },
  '/task/v1/tasks/{task_id}/reminders/{reminder_id}': {
    DELETE: 'deleteTaskv1TaskReminder',
  },
  '/task/v1/tasks/{task_id}/comments': {
    POST: 'createTaskv1TaskComment',
    GET: 'listTaskv1TaskComment',
  },
  '/task/v1/tasks/{task_id}/comments/{comment_id}': {
    DELETE: 'deleteTaskv1TaskComment',
    PUT: 'updateTaskv1TaskComment',
    GET: 'getTaskv1TaskComment',
  },
  '/task/v1/tasks/{task_id}/followers': {
    POST: 'createTaskv1TaskFollower',
    GET: 'listTaskv1TaskFollower',
  },
  '/task/v1/tasks/{task_id}/followers/{follower_id}': {
    DELETE: 'deleteTaskv1TaskFollower',
  },
  '/task/v1/tasks/{task_id}/batch_delete_follower': {
    POST: 'batchDeleteFollowerTaskv1',
  },
  '/task/v1/tasks/{task_id}/collaborators': {
    POST: 'createTaskv1TaskCollaborator',
    GET: 'listTaskv1TaskCollaborator',
  },
  '/task/v1/tasks/{task_id}/collaborators/{collaborator_id}': {
    DELETE: 'deleteTaskv1TaskCollaborator',
  },
  '/task/v1/tasks/{task_id}/batch_delete_collaborator': {
    POST: 'batchDeleteCollaboratorTaskv1',
  },
  '/task/v2/tasks': {
    POST: 'createTaskv2',
    GET: 'listTaskv2',
  },
  '/task/v2/tasks/{task_guid}': {
    GET: 'getTaskv2',
    PATCH: 'patchTaskv2',
    DELETE: 'deleteTaskv2',
  },
  '/task/v2/tasks/{task_guid}/add_members': {
    POST: 'addMembersTaskv2',
  },
  '/task/v2/tasks/{task_guid}/remove_members': {
    POST: 'removeMembersTaskv2',
  },
  '/task/v2/tasks/{task_guid}/tasklists': {
    GET: 'tasklistsTaskv2',
  },
  '/task/v2/tasks/{task_guid}/add_tasklist': {
    POST: 'addTasklistTaskv2',
  },
  '/task/v2/tasks/{task_guid}/remove_tasklist': {
    POST: 'removeTasklistTaskv2',
  },
  '/task/v2/tasks/{task_guid}/add_reminders': {
    POST: 'addRemindersTaskv2',
  },
  '/task/v2/tasks/{task_guid}/remove_reminders': {
    POST: 'removeRemindersTaskv2',
  },
  '/task/v2/tasks/{task_guid}/add_dependencies': {
    POST: 'addDependenciesTaskv2',
  },
  '/task/v2/tasks/{task_guid}/remove_dependencies': {
    POST: 'removeDependenciesTaskv2',
  },
  '/task/v2/tasks/{task_guid}/subtasks': {
    POST: 'createTaskv2TaskSubtask',
    GET: 'listTaskv2TaskSubtask',
  },
  '/task/v2/tasklists': {
    POST: 'createTaskv2Tasklist',
    GET: 'listTaskv2Tasklist',
  },
  '/task/v2/tasklists/{tasklist_guid}': {
    GET: 'getTaskv2Tasklist',
    PATCH: 'patchTaskv2Tasklist',
    DELETE: 'deleteTaskv2Tasklist',
  },
  '/task/v2/tasklists/{tasklist_guid}/add_members': {
    POST: 'addMembersTaskv2Tasklist',
  },
  '/task/v2/tasklists/{tasklist_guid}/remove_members': {
    POST: 'removeMembersTaskv2Tasklist',
  },
  '/task/v2/tasklists/{tasklist_guid}/tasks': {
    GET: 'tasksTaskv2Tasklist',
  },
  '/task/v2/tasklists/{tasklist_guid}/activity_subscriptions': {
    POST: 'createTaskv2TasklistActivitySubscription',
    GET: 'listTaskv2TasklistActivitySubscription',
  },
  '/task/v2/tasklists/{tasklist_guid}/activity_subscriptions/{activity_subscription_guid}': {
    GET: 'getTaskv2TasklistActivitySubscription',
    PATCH: 'patchTaskv2TasklistActivitySubscription',
    DELETE: 'deleteTaskv2TasklistActivitySubscription',
  },
  '/task/v2/comments': {
    POST: 'createTaskv2Comment',
    GET: 'listTaskv2Comment',
  },
  '/task/v2/comments/{comment_id}': {
    GET: 'getTaskv2Comment',
    PATCH: 'patchTaskv2Comment',
    DELETE: 'deleteTaskv2Comment',
  },
  '/task/v2/attachments/upload': {
    POST: 'uploadTaskv2Attachment',
  },
  '/task/v2/attachments': {
    GET: 'listTaskv2Attachment',
  },
  '/task/v2/attachments/{attachment_guid}': {
    GET: 'getTaskv2Attachment',
    DELETE: 'deleteTaskv2Attachment',
  },
  '/task/v2/sections': {
    POST: 'createTaskv2Section',
    GET: 'listTaskv2Section',
  },
  '/task/v2/sections/{section_guid}': {
    GET: 'getTaskv2Section',
    PATCH: 'patchTaskv2Section',
    DELETE: 'deleteTaskv2Section',
  },
  '/task/v2/sections/{section_guid}/tasks': {
    GET: 'tasksTaskv2Section',
  },
  '/task/v2/custom_fields': {
    POST: 'createTaskv2CustomField',
    GET: 'listTaskv2CustomField',
  },
  '/task/v2/custom_fields/{custom_field_guid}': {
    GET: 'getTaskv2CustomField',
    PATCH: 'patchTaskv2CustomField',
  },
  '/task/v2/custom_fields/{custom_field_guid}/add': {
    POST: 'addTaskv2CustomField',
  },
  '/task/v2/custom_fields/{custom_field_guid}/remove': {
    POST: 'removeTaskv2CustomField',
  },
  '/task/v2/custom_fields/{custom_field_guid}/options': {
    POST: 'createTaskv2CustomFieldOption',
  },
  '/task/v2/custom_fields/{custom_field_guid}/options/{option_guid}': {
    PATCH: 'patchTaskv2CustomFieldOption',
  },
  '/mail/v1/mailgroups': {
    POST: 'createMailMailgroup',
    GET: 'listMailMailgroup',
  },
  '/mail/v1/mailgroups/{mailgroup_id}': {
    DELETE: 'deleteMailMailgroup',
    PATCH: 'patchMailMailgroup',
    PUT: 'updateMailMailgroup',
    GET: 'getMailMailgroup',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/managers/batch_create': {
    POST: 'batchCreateMailMailgroupManager',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/managers/batch_delete': {
    POST: 'batchDeleteMailMailgroupManager',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/managers': {
    GET: 'listMailMailgroupManager',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members': {
    POST: 'createMailMailgroupMember',
    GET: 'listMailMailgroupMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members/{member_id}': {
    DELETE: 'deleteMailMailgroupMember',
    GET: 'getMailMailgroupMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members/batch_create': {
    POST: 'batchCreateMailMailgroupMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/members/batch_delete': {
    DELETE: 'batchDeleteMailMailgroupMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/aliases': {
    POST: 'createMailMailgroupAlias',
    GET: 'listMailMailgroupAlias',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/aliases/{alias_id}': {
    DELETE: 'deleteMailMailgroupAlias',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members': {
    POST: 'createMailMailgroupPermissionMember',
    GET: 'listMailMailgroupPermissionMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members/{permission_member_id}': {
    DELETE: 'deleteMailMailgroupPermissionMember',
    GET: 'getMailMailgroupPermissionMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members/batch_create': {
    POST: 'batchCreateMailMailgroupPermissionMember',
  },
  '/mail/v1/mailgroups/{mailgroup_id}/permission_members/batch_delete': {
    DELETE: 'batchDeleteMailMailgroupPermissionMember',
  },
  '/mail/v1/public_mailboxes': {
    POST: 'createMailPublicMailbox',
    GET: 'listMailPublicMailbox',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}': {
    PATCH: 'patchMailPublicMailbox',
    PUT: 'updateMailPublicMailbox',
    GET: 'getMailPublicMailbox',
    DELETE: 'deleteMailPublicMailbox',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members': {
    POST: 'createMailPublicMailboxMember',
    GET: 'listMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/{member_id}': {
    DELETE: 'deleteMailPublicMailboxMember',
    GET: 'getMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/clear': {
    POST: 'clearMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/batch_create': {
    POST: 'batchCreateMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/members/batch_delete': {
    DELETE: 'batchDeleteMailPublicMailboxMember',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/aliases': {
    POST: 'createMailPublicMailboxAlias',
    GET: 'listMailPublicMailboxAlias',
  },
  '/mail/v1/public_mailboxes/{public_mailbox_id}/aliases/{alias_id}': {
    DELETE: 'deleteMailPublicMailboxAlias',
  },
  '/mail/v1/user_mailboxes/{user_mailbox_id}': {
    DELETE: 'deleteMailUserMailbox',
  },
  '/mail/v1/user_mailboxes/{user_mailbox_id}/aliases': {
    POST: 'createMailUserMailboxAlias',
    GET: 'listMailUserMailboxAlias',
  },
  '/mail/v1/user_mailboxes/{user_mailbox_id}/aliases/{alias_id}': {
    DELETE: 'deleteMailUserMailboxAlias',
  },
  '/mail/v1/users/query': {
    POST: 'queryMailUser',
  },
  '/application/v6/applications/{app_id}': {
    GET: 'getApplication',
    PATCH: 'patchApplication',
  },
  '/application/v6/applications/{app_id}/app_versions/{version_id}': {
    GET: 'getApplicationApplicationAppVersion',
    PATCH: 'patchApplicationApplicationAppVersion',
  },
  '/application/v6/applications/{app_id}/app_versions': {
    GET: 'listApplicationApplicationAppVersion',
  },
  '/application/v6/applications/{app_id}/app_versions/{version_id}/contacts_range_suggest': {
    GET: 'contactsRangeSuggestApplicationApplicationAppVersion',
  },
  '/application/v6/applications/underauditlist': {
    GET: 'underauditlistApplication',
  },
  '/application/v6/applications/{app_id}/contacts_range_configuration': {
    GET: 'contactsRangeConfigurationApplication',
  },
  '/application/v6/applications/{app_id}/contacts_range': {
    PATCH: 'patchApplicationApplicationContactsRange',
  },
  '/application/v6/applications/{app_id}/visibility/check_white_black_list': {
    POST: 'checkWhiteBlackListApplicationApplicationVisibility',
  },
  '/application/v6/applications/{app_id}/visibility': {
    PATCH: 'patchApplicationApplicationVisibility',
  },
  '/application/v6/applications/{app_id}/management': {
    PUT: 'updateApplicationApplicationManagement',
  },
  '/application/v6/applications/{app_id}/app_usage/department_overview': {
    POST: 'departmentOverviewApplicationApplicationAppUsage',
  },
  '/application/v6/applications/{app_id}/app_usage/overview': {
    POST: 'overviewApplicationApplicationAppUsage',
  },
  '/application/v6/applications/{app_id}/feedbacks/{feedback_id}': {
    PATCH: 'patchApplicationApplicationFeedback',
  },
  '/application/v6/applications/{app_id}/feedbacks': {
    GET: 'listApplicationApplicationFeedback',
  },
  '/application/v6/app_badge/set': {
    POST: 'setApplicationAppBadge',
  },
  '/tenant/v2/tenant/assign_info_list/query': {
    GET: 'queryTenantTenantProductAssignInfo',
  },
  '/tenant/v2/tenant/query': {
    GET: 'queryTenant',
  },
  '/verification/v1/verification': {
    GET: 'getVerification',
  },
  '/personal_settings/v1/system_statuses': {
    POST: 'createPersonalSettingsSystemStatus',
    GET: 'listPersonalSettingsSystemStatus',
  },
  '/personal_settings/v1/system_statuses/{system_status_id}': {
    DELETE: 'deletePersonalSettingsSystemStatus',
    PATCH: 'patchPersonalSettingsSystemStatus',
  },
  '/personal_settings/v1/system_statuses/{system_status_id}/batch_open': {
    POST: 'batchOpenPersonalSettingsSystemStatus',
  },
  '/personal_settings/v1/system_statuses/{system_status_id}/batch_close': {
    POST: 'batchClosePersonalSettingsSystemStatus',
  },
  '/search/v2/message': {
    POST: 'createSearchMessage',
  },
  '/search/v2/app': {
    POST: 'createSearchApp',
  },
  '/search/v2/data_sources': {
    POST: 'createSearchDataSource',
    GET: 'listSearchDataSource',
  },
  '/search/v2/data_sources/{data_source_id}': {
    DELETE: 'deleteSearchDataSource',
    PATCH: 'patchSearchDataSource',
    GET: 'getSearchDataSource',
  },
  '/search/v2/data_sources/{data_source_id}/items': {
    POST: 'createSearchDataSourceItem',
  },
  '/search/v2/data_sources/{data_source_id}/items/{item_id}': {
    DELETE: 'deleteSearchDataSourceItem',
    GET: 'getSearchDataSourceItem',
  },
  '/search/v2/schemas': {
    POST: 'createSearchSchema',
  },
  '/search/v2/schemas/{schema_id}': {
    DELETE: 'deleteSearchSchema',
    PATCH: 'patchSearchSchema',
    GET: 'getSearchSchema',
  },
  '/document_ai/v1/resume/parse': {
    POST: 'parseDocumentAiResume',
  },
  '/document_ai/v1/vehicle_invoice/recognize': {
    POST: 'recognizeDocumentAiVehicleInvoice',
  },
  '/document_ai/v1/health_certificate/recognize': {
    POST: 'recognizeDocumentAiHealthCertificate',
  },
  '/document_ai/v1/hkm_mainland_travel_permit/recognize': {
    POST: 'recognizeDocumentAiHkmMainlandTravelPermit',
  },
  '/document_ai/v1/tw_mainland_travel_permit/recognize': {
    POST: 'recognizeDocumentAiTwMainlandTravelPermit',
  },
  '/document_ai/v1/chinese_passport/recognize': {
    POST: 'recognizeDocumentAiChinesePassport',
  },
  '/document_ai/v1/bank_card/recognize': {
    POST: 'recognizeDocumentAiBankCard',
  },
  '/document_ai/v1/vehicle_license/recognize': {
    POST: 'recognizeDocumentAiVehicleLicense',
  },
  '/document_ai/v1/train_invoice/recognize': {
    POST: 'recognizeDocumentAiTrainInvoice',
  },
  '/document_ai/v1/taxi_invoice/recognize': {
    POST: 'recognizeDocumentAiTaxiInvoice',
  },
  '/document_ai/v1/id_card/recognize': {
    POST: 'recognizeDocumentAiIdCard',
  },
  '/document_ai/v1/food_produce_license/recognize': {
    POST: 'recognizeDocumentAiFoodProduceLicense',
  },
  '/document_ai/v1/food_manage_license/recognize': {
    POST: 'recognizeDocumentAiFoodManageLicense',
  },
  '/document_ai/v1/driving_license/recognize': {
    POST: 'recognizeDocumentAiDrivingLicense',
  },
  '/document_ai/v1/vat_invoice/recognize': {
    POST: 'recognizeDocumentAiVatInvoice',
  },
  '/document_ai/v1/business_license/recognize': {
    POST: 'recognizeDocumentAiBusinessLicense',
  },
  '/document_ai/v1/contract/field_extraction': {
    POST: 'fieldExtractionDocumentAiContract',
  },
  '/document_ai/v1/business_card/recognize': {
    POST: 'recognizeDocumentAiBusinessCard',
  },
  '/optical_char_recognition/v1/image/basic_recognize': {
    POST: 'basicRecognizeOpticalCharRecognitionImage',
  },
  '/speech_to_text/v1/speech/file_recognize': {
    POST: 'fileRecognizeSpeechToTextSpeech',
  },
  '/speech_to_text/v1/speech/stream_recognize': {
    POST: 'streamRecognizeSpeechToTextSpeech',
  },
  '/translation/v1/text/detect': {
    POST: 'detectTranslationText',
  },
  '/translation/v1/text/translate': {
    POST: 'translateTranslationText',
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
  '/admin/v1/password/reset': {
    POST: 'resetAdminPassword',
  },
  '/admin/v1/admin_dept_stats': {
    GET: 'listAdminAdminDeptStat',
  },
  '/admin/v1/admin_user_stats': {
    GET: 'listAdminAdminUserStat',
  },
  '/admin/v1/badges': {
    POST: 'createAdminBadge',
    GET: 'listAdminBadge',
  },
  '/admin/v1/badges/{badge_id}': {
    PUT: 'updateAdminBadge',
    GET: 'getAdminBadge',
  },
  '/admin/v1/badge_images': {
    POST: 'createAdminBadgeImage',
  },
  '/admin/v1/badges/{badge_id}/grants': {
    POST: 'createAdminBadgeGrant',
    GET: 'listAdminBadgeGrant',
  },
  '/admin/v1/badges/{badge_id}/grants/{grant_id}': {
    DELETE: 'deleteAdminBadgeGrant',
    PUT: 'updateAdminBadgeGrant',
    GET: 'getAdminBadgeGrant',
  },
  '/ehr/v1/employees': {
    GET: 'listEhrEmployee',
  },
  '/ehr/v1/attachments/{token}': {
    GET: 'getEhrAttachment',
  },
  '/corehr/v2/basic_info/nationalities/search': {
    POST: 'searchCorehrBasicInfoNationality',
  },
  '/corehr/v2/basic_info/banks/search': {
    POST: 'searchCorehrBasicInfoBank',
  },
  '/corehr/v2/basic_info/bank_branchs/search': {
    POST: 'searchCorehrBasicInfoBankBranch',
  },
  '/corehr/v1/custom_fields/get_by_param': {
    GET: 'getByParamCorehrCustomField',
  },
  '/corehr/v1/custom_fields/query': {
    GET: 'queryCorehrCustomField',
  },
  '/corehr/v1/custom_fields/list_object_api_name': {
    GET: 'listObjectApiNameCorehrCustomField',
  },
  '/corehr/v2/basic_info/country_regions/search': {
    POST: 'searchCorehrBasicInfoCountryRegion',
  },
  '/corehr/v2/basic_info/country_region_subdivisions/search': {
    POST: 'searchCorehrBasicInfoCountryRegionSubdivision',
  },
  '/corehr/v2/basic_info/cities/search': {
    POST: 'searchCorehrBasicInfoCity',
  },
  '/corehr/v2/basic_info/districts/search': {
    POST: 'searchCorehrBasicInfoDistrict',
  },
  '/corehr/v1/employee_types': {
    POST: 'createCorehrEmployeeType',
    GET: 'listCorehrEmployeeType',
  },
  '/corehr/v1/employee_types/{employee_type_id}': {
    DELETE: 'deleteCorehrEmployeeType',
    PATCH: 'patchCorehrEmployeeType',
    GET: 'getCorehrEmployeeType',
  },
  '/corehr/v1/national_id_types': {
    POST: 'createCorehrNationalIdType',
    GET: 'listCorehrNationalIdType',
  },
  '/corehr/v1/national_id_types/{national_id_type_id}': {
    DELETE: 'deleteCorehrNationalIdType',
    PATCH: 'patchCorehrNationalIdType',
    GET: 'getCorehrNationalIdType',
  },
  '/corehr/v1/working_hours_types': {
    POST: 'createCorehrWorkingHoursType',
    GET: 'listCorehrWorkingHoursType',
  },
  '/corehr/v1/working_hours_types/{working_hours_type_id}': {
    DELETE: 'deleteCorehrWorkingHoursType',
    PATCH: 'patchCorehrWorkingHoursType',
    GET: 'getCorehrWorkingHoursType',
  },
  '/corehr/v2/basic_info/currencies/search': {
    POST: 'searchCorehrBasicInfoCurrency',
  },
  '/corehr/v2/employees/batch_get': {
    POST: 'batchGetCorehrEmployee',
  },
  '/corehr/v2/employees/search': {
    POST: 'searchCorehrEmployee',
  },
  '/corehr/v1/employments': {
    POST: 'createCorehrEmployment',
  },
  '/corehr/v1/employments/{employment_id}': {
    PATCH: 'patchCorehrEmployment',
    DELETE: 'deleteCorehrEmployment',
  },
  '/corehr/v2/persons': {
    POST: 'createCorehrPerson',
  },
  '/corehr/v2/persons/{person_id}': {
    PATCH: 'patchCorehrPerson',
  },
  '/corehr/v1/persons/{person_id}': {
    DELETE: 'deleteCorehrPerson',
    GET: 'getCorehrPerson',
  },
  '/corehr/v1/persons/upload': {
    POST: 'uploadCorehrPerson',
  },
  '/corehr/v1/files/{id}': {
    GET: 'getCorehrFile',
  },
  '/corehr/v1/job_datas': {
    POST: 'createCorehrJobData',
    GET: 'listCorehrJobData',
  },
  '/corehr/v1/job_datas/{job_data_id}': {
    DELETE: 'deleteCorehrJobData',
    PATCH: 'patchCorehrJobData',
    GET: 'getCorehrJobData',
  },
  '/corehr/v2/employees/job_datas/query': {
    POST: 'queryCorehrEmployeesJobData',
  },
  '/corehr/v2/employees/job_datas/batch_get': {
    POST: 'batchGetCorehrEmployeesJobData',
  },
  '/corehr/v2/departments/parents': {
    POST: 'parentsCorehrDepartment',
  },
  '/corehr/v2/departments/search': {
    POST: 'searchCorehrDepartment',
  },
  '/corehr/v1/departments': {
    POST: 'createCorehrDepartment',
    GET: 'listCorehrDepartment',
  },
  '/corehr/v1/departments/{department_id}': {
    PATCH: 'patchCorehrDepartment',
    DELETE: 'deleteCorehrDepartment',
    GET: 'getCorehrDepartment',
  },
  '/corehr/v2/departments/batch_get': {
    POST: 'batchGetCorehrDepartment',
  },
  '/corehr/v2/locations/batch_get': {
    POST: 'batchGetCorehrLocation',
  },
  '/corehr/v1/locations': {
    POST: 'createCorehrLocation',
    GET: 'listCorehrLocation',
  },
  '/corehr/v1/locations/{location_id}': {
    DELETE: 'deleteCorehrLocation',
    GET: 'getCorehrLocation',
  },
  '/corehr/v1/companies/{company_id}': {
    GET: 'getCorehrCompany',
    PATCH: 'patchCorehrCompany',
    DELETE: 'deleteCorehrCompany',
  },
  '/corehr/v1/companies': {
    GET: 'listCorehrCompany',
    POST: 'createCorehrCompany',
  },
  '/corehr/v2/companies/batch_get': {
    POST: 'batchGetCorehrCompany',
  },
  '/corehr/v2/cost_centers': {
    POST: 'createCorehrCostCenter',
  },
  '/corehr/v2/cost_centers/{cost_center_id}': {
    PATCH: 'patchCorehrCostCenter',
    DELETE: 'deleteCorehrCostCenter',
  },
  '/corehr/v2/cost_centers/search': {
    POST: 'searchCorehrCostCenter',
  },
  '/corehr/v2/cost_centers/{cost_center_id}/versions': {
    POST: 'createCorehrCostCenterVersion',
  },
  '/corehr/v2/cost_centers/{cost_center_id}/versions/{version_id}': {
    PATCH: 'patchCorehrCostCenterVersion',
    DELETE: 'deleteCorehrCostCenterVersion',
  },
  '/corehr/v2/job_levels/batch_get': {
    POST: 'batchGetCorehrJobLevel',
  },
  '/corehr/v1/job_levels': {
    POST: 'createCorehrJobLevel',
    GET: 'listCorehrJobLevel',
  },
  '/corehr/v1/job_levels/{job_level_id}': {
    DELETE: 'deleteCorehrJobLevel',
    PATCH: 'patchCorehrJobLevel',
    GET: 'getCorehrJobLevel',
  },
  '/corehr/v2/job_families/batch_get': {
    POST: 'batchGetCorehrJobFamily',
  },
  '/corehr/v1/job_families': {
    POST: 'createCorehrJobFamily',
    GET: 'listCorehrJobFamily',
  },
  '/corehr/v1/job_families/{job_family_id}': {
    DELETE: 'deleteCorehrJobFamily',
    PATCH: 'patchCorehrJobFamily',
    GET: 'getCorehrJobFamily',
  },
  '/corehr/v1/jobs': {
    POST: 'createCorehrJob',
    GET: 'listCorehrJob',
  },
  '/corehr/v1/jobs/{job_id}': {
    DELETE: 'deleteCorehrJob',
    PATCH: 'patchCorehrJob',
    GET: 'getCorehrJob',
  },
  '/corehr/v2/jobs/{job_id}': {
    GET: 'getCorehrJob',
  },
  '/corehr/v2/jobs': {
    GET: 'listCorehrJob',
  },
  '/corehr/v2/pre_hires': {
    POST: 'createCorehrPreHire',
  },
  '/corehr/v1/pre_hires/{pre_hire_id}': {
    PATCH: 'patchCorehrPreHire',
    DELETE: 'deleteCorehrPreHire',
    GET: 'getCorehrPreHire',
  },
  '/corehr/v1/pre_hires': {
    GET: 'listCorehrPreHire',
  },
  '/corehr/v2/contracts/search': {
    POST: 'searchCorehrContract',
  },
  '/corehr/v1/contracts': {
    POST: 'createCorehrContract',
    GET: 'listCorehrContract',
  },
  '/corehr/v1/contracts/{contract_id}': {
    DELETE: 'deleteCorehrContract',
    PATCH: 'patchCorehrContract',
    GET: 'getCorehrContract',
  },
  '/corehr/v2/probation/search': {
    POST: 'searchCorehrProbation',
  },
  '/corehr/v2/probation/enable_disable_assessment': {
    POST: 'enableDisableAssessmentCorehrProbation',
  },
  '/corehr/v2/probation/assessments': {
    POST: 'createCorehrProbationAssessment',
  },
  '/corehr/v2/probation/assessments/{assessment_id}': {
    PATCH: 'patchCorehrProbationAssessment',
    DELETE: 'deleteCorehrProbationAssessment',
  },
  '/corehr/v1/transfer_reasons/query': {
    GET: 'queryCorehrTransferReason',
  },
  '/corehr/v1/transfer_types/query': {
    GET: 'queryCorehrTransferType',
  },
  '/corehr/v1/job_changes': {
    POST: 'createCorehrJobChange',
  },
  '/corehr/v2/job_changes/search': {
    POST: 'searchCorehrJobChange',
  },
  '/corehr/v1/offboardings/query': {
    POST: 'queryCorehrOffboarding',
  },
  '/corehr/v1/offboardings/submit': {
    POST: 'submitCorehrOffboarding',
  },
  '/corehr/v1/offboardings/search': {
    POST: 'searchCorehrOffboarding',
  },
  '/corehr/v1/leave_granting_records': {
    POST: 'createCorehrLeaveGrantingRecord',
  },
  '/corehr/v1/leave_granting_records/{leave_granting_record_id}': {
    DELETE: 'deleteCorehrLeaveGrantingRecord',
  },
  '/corehr/v1/leaves/leave_types': {
    GET: 'leaveTypesCorehrLeave',
  },
  '/corehr/v1/leaves/leave_balances': {
    GET: 'leaveBalancesCorehrLeave',
  },
  '/corehr/v1/leaves/leave_request_history': {
    GET: 'leaveRequestHistoryCorehrLeave',
  },
  '/corehr/v2/employees/bps/batch_get': {
    POST: 'batchGetCorehrEmployeesBp',
  },
  '/corehr/v2/bps/get_by_department': {
    POST: 'getByDepartmentCorehrBp',
  },
  '/corehr/v2/bps': {
    GET: 'listCorehrBp',
  },
  '/corehr/v1/security_groups/query': {
    POST: 'queryCorehrSecurityGroup',
  },
  '/corehr/v1/assigned_users/search': {
    POST: 'searchCorehrAssignedUser',
  },
  '/corehr/v1/security_groups': {
    GET: 'listCorehrSecurityGroup',
  },
  '/corehr/v2/processes': {
    GET: 'listCorehrProcess',
  },
  '/corehr/v2/processes/{process_id}': {
    GET: 'getCorehrProcess',
  },
  '/corehr/v1/processes/{process_id}/form_variable_data': {
    GET: 'getCorehrProcessFormVariableData',
  },
  '/corehr/v1/compensation_standards/match': {
    GET: 'matchCorehrCompensationStandard',
  },
  '/hire/v1/jobs/combined_create': {
    POST: 'combinedCreateHireJob',
  },
  '/hire/v1/jobs/{job_id}': {
    GET: 'getHireJob',
  },
  '/hire/v1/jobs/{job_id}/config': {
    GET: 'configHireJob',
  },
  '/hire/v1/jobs': {
    GET: 'listHireJob',
  },
  '/hire/v1/jobs/{job_id}/combined_update': {
    POST: 'combinedUpdateHireJob',
  },
  '/hire/v1/jobs/{job_id}/update_config': {
    POST: 'updateConfigHireJob',
  },
  '/hire/v1/job_types': {
    GET: 'listHireJobType',
  },
  '/hire/v1/jobs/{job_id}/recruiter': {
    GET: 'recruiterHireJob',
  },
  '/hire/v1/job_requirements': {
    POST: 'createHireJobRequirement',
    GET: 'listHireJobRequirement',
  },
  '/hire/v1/job_requirements/search': {
    POST: 'listByIdHireJobRequirement',
  },
  '/hire/v1/job_requirements/{job_requirement_id}': {
    PUT: 'updateHireJobRequirement',
    DELETE: 'deleteHireJobRequirement',
  },
  '/hire/v1/job_requirement_schemas': {
    GET: 'listHireJobRequirementSchema',
  },
  '/hire/v1/job_processes': {
    GET: 'listHireJobProcess',
  },
  '/hire/v1/registration_schemas': {
    GET: 'listHireRegistrationSchema',
  },
  '/hire/v1/referral_websites/job_posts': {
    GET: 'listHireReferralWebsiteJobPost',
  },
  '/hire/v1/referral_websites/job_posts/{job_post_id}': {
    GET: 'getHireReferralWebsiteJobPost',
  },
  '/hire/v1/referrals/get_by_application': {
    GET: 'getByApplicationHireReferral',
  },
  '/hire/v1/external_applications': {
    POST: 'createHireExternalApplication',
  },
  '/hire/v1/external_applications/{external_application_id}': {
    PUT: 'updateHireExternalApplication',
    DELETE: 'deleteHireExternalApplication',
  },
  '/hire/v1/external_interviews': {
    POST: 'createHireExternalInterview',
  },
  '/hire/v1/external_interview_assessments': {
    POST: 'createHireExternalInterviewAssessment',
  },
  '/hire/v1/external_background_checks': {
    POST: 'createHireExternalBackgroundCheck',
  },
  '/hire/v1/talents/add_to_folder': {
    POST: 'addToFolderHireTalent',
  },
  '/hire/v1/talent_folders': {
    GET: 'listHireTalentFolder',
  },
  '/hire/v1/talents/batch_get_id': {
    POST: 'batchGetIdHireTalent',
  },
  '/hire/v1/talents': {
    GET: 'listHireTalent',
  },
  '/hire/v1/talent_objects/query': {
    GET: 'queryHireTalentObject',
  },
  '/hire/v1/talents/{talent_id}': {
    GET: 'getHireTalent',
  },
  '/hire/v1/applications': {
    POST: 'createHireApplication',
    GET: 'listHireApplication',
  },
  '/hire/v1/applications/{application_id}/terminate': {
    POST: 'terminateHireApplication',
  },
  '/hire/v1/applications/{application_id}': {
    GET: 'getHireApplication',
  },
  '/hire/v1/evaluations': {
    GET: 'listHireEvaluation',
  },
  '/hire/v1/questionnaires': {
    GET: 'listHireQuestionnaire',
  },
  '/hire/v1/interviews': {
    GET: 'listHireInterview',
  },
  '/hire/v1/offers': {
    POST: 'createHireOffer',
    GET: 'listHireOffer',
  },
  '/hire/v1/offers/{offer_id}': {
    PUT: 'updateHireOffer',
    GET: 'getHireOffer',
  },
  '/hire/v1/applications/{application_id}/offer': {
    GET: 'offerHireApplication',
  },
  '/hire/v1/offers/{offer_id}/offer_status': {
    PATCH: 'offerStatusHireOffer',
  },
  '/hire/v1/offers/{offer_id}/intern_offer_status': {
    POST: 'internOfferStatusHireOffer',
  },
  '/hire/v1/ehr_import_tasks/{ehr_import_task_id}': {
    PATCH: 'patchHireEhrImportTask',
  },
  '/hire/v1/applications/{application_id}/transfer_onboard': {
    POST: 'transferOnboardHireApplication',
  },
  '/hire/v1/employees/{employee_id}': {
    PATCH: 'patchHireEmployee',
    GET: 'getHireEmployee',
  },
  '/hire/v1/employees/get_by_application': {
    GET: 'getByApplicationHireEmployee',
  },
  '/hire/v1/notes': {
    POST: 'createHireNote',
    GET: 'listHireNote',
  },
  '/hire/v1/notes/{note_id}': {
    PATCH: 'patchHireNote',
    GET: 'getHireNote',
  },
  '/hire/v1/resume_sources': {
    GET: 'listHireResumeSource',
  },
  '/hire/v1/eco_account_custom_fields': {
    POST: 'createHireEcoAccountCustomField',
  },
  '/hire/v1/eco_account_custom_fields/batch_update': {
    PATCH: 'batchUpdateHireEcoAccountCustomField',
  },
  '/hire/v1/eco_account_custom_fields/batch_delete': {
    POST: 'batchDeleteHireEcoAccountCustomField',
  },
  '/hire/v1/eco_background_check_custom_fields': {
    POST: 'createHireEcoBackgroundCheckCustomField',
  },
  '/hire/v1/eco_background_check_custom_fields/batch_update': {
    PATCH: 'batchUpdateHireEcoBackgroundCheckCustomField',
  },
  '/hire/v1/eco_background_check_custom_fields/batch_delete': {
    POST: 'batchDeleteHireEcoBackgroundCheckCustomField',
  },
  '/hire/v1/eco_background_check_packages': {
    POST: 'createHireEcoBackgroundCheckPackage',
  },
  '/hire/v1/eco_background_check_packages/batch_update': {
    PATCH: 'batchUpdateHireEcoBackgroundCheckPackage',
  },
  '/hire/v1/eco_background_check_packages/batch_delete': {
    POST: 'batchDeleteHireEcoBackgroundCheckPackage',
  },
  '/hire/v1/eco_background_checks/update_progress': {
    POST: 'updateProgressHireEcoBackgroundCheck',
  },
  '/hire/v1/eco_background_checks/update_result': {
    POST: 'updateResultHireEcoBackgroundCheck',
  },
  '/hire/v1/eco_background_checks/cancel': {
    POST: 'cancelHireEcoBackgroundCheck',
  },
  '/hire/v1/eco_exam_papers': {
    POST: 'createHireEcoExamPaper',
  },
  '/hire/v1/eco_exam_papers/batch_update': {
    PATCH: 'batchUpdateHireEcoExamPaper',
  },
  '/hire/v1/eco_exam_papers/batch_delete': {
    POST: 'batchDeleteHireEcoExamPaper',
  },
  '/hire/v1/eco_exams/{exam_id}/login_info': {
    POST: 'loginInfoHireEcoExam',
  },
  '/hire/v1/eco_exams/{exam_id}/update_result': {
    POST: 'updateResultHireEcoExam',
  },
  '/hire/v1/referral_account': {
    POST: 'createHireReferralAccount',
  },
  '/hire/v1/referral_account/{referral_account_id}/deactivate': {
    POST: 'deactivateHireReferralAccount',
  },
  '/hire/v1/referral_account/{referral_account_id}/withdraw': {
    POST: 'withdrawHireReferralAccount',
  },
  '/hire/v1/referral_account/reconciliation': {
    POST: 'reconciliationHireReferralAccount',
  },
  '/hire/v1/attachments/{attachment_id}': {
    GET: 'getHireAttachment',
  },
  '/hire/v1/attachments/{attachment_id}/preview': {
    GET: 'previewHireAttachment',
  },
  '/okr/v1/periods': {
    POST: 'createOkrPeriod',
    GET: 'listOkrPeriod',
  },
  '/okr/v1/periods/{period_id}': {
    PATCH: 'patchOkrPeriod',
  },
  '/okr/v1/period_rules': {
    GET: 'listOkrPeriodRule',
  },
  '/okr/v1/users/{user_id}/okrs': {
    GET: 'listOkrUserOkr',
  },
  '/okr/v1/okrs/batch_get': {
    GET: 'batchGetOkr',
  },
  '/okr/v1/progress_records': {
    POST: 'createOkrProgressRecord',
  },
  '/okr/v1/progress_records/{progress_id}': {
    DELETE: 'deleteOkrProgressRecord',
    PUT: 'updateOkrProgressRecord',
    GET: 'getOkrProgressRecord',
  },
  '/okr/v1/images/upload': {
    POST: 'uploadOkrImage',
  },
  '/human_authentication/v1/identities': {
    POST: 'createHumanAuthenticationIdentity',
  },
  '/acs/v1/visitors/{visitor_id}': {
    DELETE: 'deleteAcsVisitor',
  },
  '/acs/v1/visitors': {
    POST: 'createAcsVisitor',
  },
  '/acs/v1/rule_external/device_bind': {
    POST: 'deviceBindAcsRuleExternal',
  },
  '/acs/v1/rule_external': {
    GET: 'getAcsRuleExternal',
    DELETE: 'deleteAcsRuleExternal',
    POST: 'createAcsRuleExternal',
  },
  '/acs/v1/users/{user_id}': {
    PATCH: 'patchAcsUser',
    GET: 'getAcsUser',
  },
  '/acs/v1/users': {
    GET: 'listAcsUser',
  },
  '/acs/v1/users/{user_id}/face': {
    PUT: 'updateAcsUserFace',
    GET: 'getAcsUserFace',
  },
  '/acs/v1/devices': {
    GET: 'listAcsDevice',
  },
  '/acs/v1/access_records': {
    GET: 'listAcsAccessRecord',
  },
  '/acs/v1/access_records/{access_record_id}/access_photo': {
    GET: 'getAcsAccessRecordAccessPhoto',
  },
  '/performance/v1/semesters': {
    GET: 'listPerformanceSemester',
  },
  '/performance/v1/stage_tasks/find_by_user_list': {
    POST: 'findByUserListPerformanceStageTask',
  },
  '/performance/v1/stage_tasks/find_by_page': {
    POST: 'findByPagePerformanceStageTask',
  },
  '/performance/v1/review_datas/query': {
    POST: 'queryPerformanceReviewData',
  },
  '/lingo/v1/drafts': {
    POST: 'createLingoDraft',
  },
  '/lingo/v1/drafts/{draft_id}': {
    PUT: 'updateLingoDraft',
  },
  '/lingo/v1/entities': {
    POST: 'createLingoEntity',
    GET: 'listLingoEntity',
  },
  '/lingo/v1/entities/{entity_id}': {
    PUT: 'updateLingoEntity',
    DELETE: 'deleteLingoEntity',
    GET: 'getLingoEntity',
  },
  '/lingo/v1/entities/match': {
    POST: 'matchLingoEntity',
  },
  '/lingo/v1/entities/search': {
    POST: 'searchLingoEntity',
  },
  '/lingo/v1/entities/highlight': {
    POST: 'highlightLingoEntity',
  },
  '/lingo/v1/classifications': {
    GET: 'listLingoClassification',
  },
  '/lingo/v1/repos': {
    GET: 'listLingoRepo',
  },
  '/lingo/v1/files/upload': {
    POST: 'uploadLingoFile',
  },
  '/lingo/v1/files/{file_token}/download': {
    GET: 'downloadLingoFile',
  },
  '/security_and_compliance/v1/openapi_logs/list_data': {
    POST: 'listDataSecurityAndComplianceOpenapiLog',
  },
  '/admin/v1/audit_infos': {
    GET: 'listAdminAuditInfo',
  },
  '/minutes/v1/minutes/{minute_token}/statistics': {
    GET: 'getMinutesMinuteStatistics',
  },
  '/minutes/v1/minutes/{minute_token}': {
    GET: 'getMinutesMinute',
  },
  '/workplace/v1/workplace_access_data/search': {
    POST: 'searchWorkplaceWorkplaceAccessData',
  },
  '/workplace/v1/custom_workplace_access_data/search': {
    POST: 'searchWorkplaceCustomWorkplaceAccessData',
  },
  '/workplace/v1/workplace_block_access_data/search': {
    POST: 'searchWorkplaceWorkplaceBlockAccessData',
  },
  '/application/v5/applications/favourite': {
    GET: 'favouriteApplication',
  },
  '/application/v5/applications/recommend': {
    GET: 'recommendApplication',
  },
  '/application/v6/app_recommend_rules': {
    GET: 'listApplicationAppRecommendRule',
  },
  '/mdm/v1/user_auth_data_relations/bind': {
    POST: 'bindMdmUserAuthDataRelation',
  },
  '/mdm/v1/user_auth_data_relations/unbind': {
    POST: 'unbindMdmUserAuthDataRelation',
  },
  '/report/v1/rules/query': {
    GET: 'queryReportRule',
  },
  '/report/v1/rules/{rule_id}/views/remove': {
    POST: 'removeReportRuleView',
  },
  '/report/v1/tasks/query': {
    POST: 'queryReportTask',
  },
  '/authen/v1/access_token': {
    POST: 'createAuthenAccessToken',
  },
  '/authen/v1/refresh_access_token': {
    POST: 'createAuthenRefreshAccessToken',
  },
  '/baike/v1/drafts': {
    POST: 'createBaikeDraft',
  },
  '/baike/v1/drafts/{draft_id}': {
    PUT: 'updateBaikeDraft',
  },
  '/baike/v1/entities': {
    POST: 'createBaikeEntity',
    GET: 'listBaikeEntity',
  },
  '/baike/v1/entities/{entity_id}': {
    PUT: 'updateBaikeEntity',
    GET: 'getBaikeEntity',
  },
  '/baike/v1/entities/match': {
    POST: 'matchBaikeEntity',
  },
  '/baike/v1/entities/search': {
    POST: 'searchBaikeEntity',
  },
  '/baike/v1/entities/highlight': {
    POST: 'highlightBaikeEntity',
  },
  '/baike/v1/entities/extract': {
    POST: 'extractBaikeEntity',
  },
  '/baike/v1/classifications': {
    GET: 'listBaikeClassification',
  },
  '/baike/v1/files/upload': {
    POST: 'uploadBaikeFile',
  },
  '/baike/v1/files/{file_token}/download': {
    GET: 'downloadBaikeFile',
  },
  '/hire/v1/applications/{application_id}/interviews': {
    GET: 'listHireApplicationInterview',
  },
  '/hire/v1/jobs/{job_id}/managers/{manager_id}': {
    GET: 'getHireJobManager',
  },
  '/hire/v1/offer_schemas/{offer_schema_id}': {
    GET: 'getHireOfferSchema',
  },
  '/corehr/v1/subregions': {
    GET: 'listCorehrSubregion',
  },
  '/corehr/v1/subregions/{subregion_id}': {
    GET: 'getCorehrSubregion',
  },
  '/corehr/v1/subdivisions': {
    GET: 'listCorehrSubdivision',
  },
  '/corehr/v1/subdivisions/{subdivision_id}': {
    GET: 'getCorehrSubdivision',
  },
  '/corehr/v1/country_regions': {
    GET: 'listCorehrCountryRegion',
  },
  '/corehr/v1/country_regions/{country_region_id}': {
    GET: 'getCorehrCountryRegion',
  },
  '/corehr/v1/currencies': {
    GET: 'listCorehrCurrency',
  },
  '/corehr/v1/currencies/{currency_id}': {
    GET: 'getCorehrCurrency',
  },
  '/vc/v1/room_configs/set_checkboard_access_code': {
    POST: 'setCheckboardAccessCodeVcRoomConfig',
  },
  '/vc/v1/room_configs/set_room_access_code': {
    POST: 'setRoomAccessCodeVcRoomConfig',
  },
  '/vc/v1/room_configs/query': {
    GET: 'queryVcRoomConfig',
  },
  '/vc/v1/room_configs/set': {
    POST: 'setVcRoomConfig',
  },
})
