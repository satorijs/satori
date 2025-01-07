import { App, AppDashboard, AppRole, AppRoleBlockRole, AppRoleMember, AppRoleMemberId, AppRoleTableRole, AppTable, AppTableField, AppTableFieldDescription, AppTableFieldForList, AppTableFieldProperty, AppTableForm, AppTableFormField, AppTableFormPatchedField, AppTableRecord, AppTableView, AppTableViewProperty, AppWorkflow, DeleteRecord, DisplayApp, DisplayAppV2, FilterInfo, ReqTable, Sort } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建多维表格
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/create
     */
    createBitableApp(body: CreateBitableAppRequest): Promise<CreateBitableAppResponse>
    /**
     * 复制多维表格
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/copy
     */
    copyBitableApp(app_token: string, body: CopyBitableAppRequest): Promise<CopyBitableAppResponse>
    /**
     * 获取多维表格元数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/get
     */
    getBitableApp(app_token: string): Promise<GetBitableAppResponse>
    /**
     * 更新多维表格元数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update
     */
    updateBitableApp(app_token: string, body: UpdateBitableAppRequest): Promise<UpdateBitableAppResponse>
    /**
     * 新增一个数据表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/create
     */
    createBitableAppTable(app_token: string, body: CreateBitableAppTableRequest): Promise<CreateBitableAppTableResponse>
    /**
     * 新增多个数据表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_create
     */
    batchCreateBitableAppTable(app_token: string, body: BatchCreateBitableAppTableRequest, query?: BatchCreateBitableAppTableQuery): Promise<BatchCreateBitableAppTableResponse>
    /**
     * 更新数据表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/patch
     */
    patchBitableAppTable(app_token: string, table_id: string, body: PatchBitableAppTableRequest): Promise<PatchBitableAppTableResponse>
    /**
     * 列出数据表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/list
     */
    listBitableAppTable(app_token: string, query?: Pagination): Promise<ListBitableAppTableResponse>
    /**
     * 删除一个数据表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/delete
     */
    deleteBitableAppTable(app_token: string, table_id: string): Promise<void>
    /**
     * 删除多个数据表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_delete
     */
    batchDeleteBitableAppTable(app_token: string, body: BatchDeleteBitableAppTableRequest): Promise<void>
    /**
     * 新增视图
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/create
     */
    createBitableAppTableView(app_token: string, table_id: string, body: CreateBitableAppTableViewRequest): Promise<CreateBitableAppTableViewResponse>
    /**
     * 更新视图
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/patch
     */
    patchBitableAppTableView(app_token: string, table_id: string, view_id: string, body: PatchBitableAppTableViewRequest): Promise<PatchBitableAppTableViewResponse>
    /**
     * 列出视图
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/list
     */
    listBitableAppTableView(app_token: string, table_id: string, query?: ListBitableAppTableViewQuery & Pagination): Promise<ListBitableAppTableViewResponse>
    /**
     * 获取视图
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/get
     */
    getBitableAppTableView(app_token: string, table_id: string, view_id: string): Promise<GetBitableAppTableViewResponse>
    /**
     * 删除视图
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/delete
     */
    deleteBitableAppTableView(app_token: string, table_id: string, view_id: string): Promise<void>
    /**
     * 新增记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/create
     */
    createBitableAppTableRecord(app_token: string, table_id: string, body: CreateBitableAppTableRecordRequest, query?: CreateBitableAppTableRecordQuery): Promise<CreateBitableAppTableRecordResponse>
    /**
     * 更新记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/update
     */
    updateBitableAppTableRecord(app_token: string, table_id: string, record_id: string, body: UpdateBitableAppTableRecordRequest, query?: UpdateBitableAppTableRecordQuery): Promise<UpdateBitableAppTableRecordResponse>
    /**
     * 查询记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/search
     */
    searchBitableAppTableRecord(app_token: string, table_id: string, body: SearchBitableAppTableRecordRequest, query?: SearchBitableAppTableRecordQuery & Pagination): Promise<SearchBitableAppTableRecordResponse>
    /**
     * 删除记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/delete
     */
    deleteBitableAppTableRecord(app_token: string, table_id: string, record_id: string): Promise<DeleteBitableAppTableRecordResponse>
    /**
     * 新增多条记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_create
     */
    batchCreateBitableAppTableRecord(app_token: string, table_id: string, body: BatchCreateBitableAppTableRecordRequest, query?: BatchCreateBitableAppTableRecordQuery): Promise<BatchCreateBitableAppTableRecordResponse>
    /**
     * 更新多条记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_update
     */
    batchUpdateBitableAppTableRecord(app_token: string, table_id: string, body: BatchUpdateBitableAppTableRecordRequest, query?: BatchUpdateBitableAppTableRecordQuery): Promise<BatchUpdateBitableAppTableRecordResponse>
    /**
     * 批量获取记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_get
     */
    batchGetBitableAppTableRecord(app_token: string, table_id: string, body: BatchGetBitableAppTableRecordRequest): Promise<BatchGetBitableAppTableRecordResponse>
    /**
     * 删除多条记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_delete
     */
    batchDeleteBitableAppTableRecord(app_token: string, table_id: string, body: BatchDeleteBitableAppTableRecordRequest): Promise<BatchDeleteBitableAppTableRecordResponse>
    /**
     * 新增字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/create
     */
    createBitableAppTableField(app_token: string, table_id: string, body: CreateBitableAppTableFieldRequest, query?: CreateBitableAppTableFieldQuery): Promise<CreateBitableAppTableFieldResponse>
    /**
     * 更新字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/update
     */
    updateBitableAppTableField(app_token: string, table_id: string, field_id: string, body: UpdateBitableAppTableFieldRequest): Promise<UpdateBitableAppTableFieldResponse>
    /**
     * 列出字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/list
     */
    listBitableAppTableField(app_token: string, table_id: string, query?: ListBitableAppTableFieldQuery & Pagination): Promise<ListBitableAppTableFieldResponse>
    /**
     * 删除字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/delete
     */
    deleteBitableAppTableField(app_token: string, table_id: string, field_id: string): Promise<DeleteBitableAppTableFieldResponse>
    /**
     * 复制仪表盘
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/copy
     */
    copyBitableAppDashboard(app_token: string, block_id: string, body: CopyBitableAppDashboardRequest): Promise<CopyBitableAppDashboardResponse>
    /**
     * 列出仪表盘
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/list
     */
    listBitableAppDashboard(app_token: string, query?: Pagination): Promise<Paginated<AppDashboard, 'dashboards'>>
    /**
     * 列出仪表盘
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/list
     */
    listBitableAppDashboardIter(app_token: string): AsyncIterator<AppDashboard>
    /**
     * 更新表单元数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/patch
     */
    patchBitableAppTableForm(app_token: string, table_id: string, form_id: string, body: PatchBitableAppTableFormRequest): Promise<PatchBitableAppTableFormResponse>
    /**
     * 获取表单元数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/get
     */
    getBitableAppTableForm(app_token: string, table_id: string, form_id: string): Promise<GetBitableAppTableFormResponse>
    /**
     * 更新表单问题
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/patch
     */
    patchBitableAppTableFormField(app_token: string, table_id: string, form_id: string, field_id: string, body: PatchBitableAppTableFormFieldRequest): Promise<PatchBitableAppTableFormFieldResponse>
    /**
     * 列出表单问题
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/list
     */
    listBitableAppTableFormField(app_token: string, table_id: string, form_id: string, query?: Pagination): Promise<ListBitableAppTableFormFieldResponse>
    /**
     * 列出自定义角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/list
     */
    listBitableAppRole(app_token: string, query?: Pagination): Promise<ListBitableAppRoleResponse>
    /**
     * 新增自定义角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create
     */
    createBitableAppRole(app_token: string, body: CreateBitableAppRoleRequest): Promise<CreateBitableAppRoleResponse>
    /**
     * 删除自定义角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/delete
     */
    deleteBitableAppRole(app_token: string, role_id: string): Promise<void>
    /**
     * 更新自定义角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/update
     */
    updateBitableAppRole(app_token: string, role_id: string, body: UpdateBitableAppRoleRequest): Promise<UpdateBitableAppRoleResponse>
    /**
     * 批量删除协作者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_delete
     */
    batchDeleteBitableAppRoleMember(app_token: string, role_id: string, body: BatchDeleteBitableAppRoleMemberRequest): Promise<void>
    /**
     * 批量新增协作者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_create
     */
    batchCreateBitableAppRoleMember(app_token: string, role_id: string, body: BatchCreateBitableAppRoleMemberRequest): Promise<void>
    /**
     * 列出协作者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/list
     */
    listBitableAppRoleMember(app_token: string, role_id: string, query?: Pagination): Promise<ListBitableAppRoleMemberResponse>
    /**
     * 新增协作者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/create
     */
    createBitableAppRoleMember(app_token: string, role_id: string, body: CreateBitableAppRoleMemberRequest, query?: CreateBitableAppRoleMemberQuery): Promise<void>
    /**
     * 删除协作者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/delete
     */
    deleteBitableAppRoleMember(app_token: string, role_id: string, member_id: string, query?: DeleteBitableAppRoleMemberQuery): Promise<void>
    /**
     * 列出自动化流程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-workflow/list
     */
    listBitableAppWorkflow(app_token: string, query?: Pagination): Promise<ListBitableAppWorkflowResponse>
    /**
     * 更新自动化流程状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-workflow/update
     */
    updateBitableAppWorkflow(app_token: string, workflow_id: string, body: UpdateBitableAppWorkflowRequest): Promise<void>
    /**
     * 检索记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/get
     */
    getBitableAppTableRecord(app_token: string, table_id: string, record_id: string, query?: GetBitableAppTableRecordQuery): Promise<GetBitableAppTableRecordResponse>
    /**
     * 列出记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/list
     */
    listBitableAppTableRecord(app_token: string, table_id: string, query?: ListBitableAppTableRecordQuery & Pagination): Promise<ListBitableAppTableRecordResponse>
  }
}

export interface CreateBitableAppRequest {
  /** 多维表格App名字 */
  name?: string
  /** 多维表格App归属文件夹 */
  folder_token?: string
  /** 文档时区，说明见：https://bytedance.feishu.cn/docx/YKRndTM7VoyDqpxqqeEcd67MnEf */
  time_zone?: string
}

export interface CopyBitableAppRequest {
  /** 多维表格 App 名字 */
  name?: string
  /** 多维表格 App 归属文件夹 */
  folder_token?: string
  /** 不复制文档内容，只复制文档结构 */
  without_content?: boolean
  /** 文档时区，说明见：https://bytedance.feishu.cn/docx/YKRndTM7VoyDqpxqqeEcd67MnEf */
  time_zone?: string
}

export interface UpdateBitableAppRequest {
  /** 新的多维表格名字 */
  name?: string
  /** 多维表格是否开启高级权限 */
  is_advanced?: boolean
}

export interface CreateBitableAppTableRequest {
  /** 数据表 */
  table?: ReqTable
}

export interface BatchCreateBitableAppTableRequest {
  /** tables */
  tables?: ReqTable[]
}

export interface BatchCreateBitableAppTableQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface PatchBitableAppTableRequest {
  /** 数据表的新名称 */
  name?: string
}

export interface BatchDeleteBitableAppTableRequest {
  /** 删除的多条tableid列表 */
  table_ids?: string[]
}

export interface CreateBitableAppTableViewRequest {
  /** 视图名字 */
  view_name: string
  /** 视图类型 */
  view_type?: 'grid' | 'kanban' | 'gallery' | 'gantt' | 'form'
}

export interface PatchBitableAppTableViewRequest {
  /** 视图名称 */
  view_name?: string
  /** 视图属性 */
  property?: AppTableViewProperty
}

export interface ListBitableAppTableViewQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateBitableAppTableRecordRequest {
  /** 记录字段 */
  fields: unknown
}

export interface CreateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 用于控制一致性读写，默认开启检查 */
  ignore_consistency_check?: boolean
}

export interface UpdateBitableAppTableRecordRequest {
  /** 记录字段 */
  fields: unknown
}

export interface UpdateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 用于控制一致性读写，默认开启检查 */
  ignore_consistency_check?: boolean
}

export interface SearchBitableAppTableRecordRequest {
  /** 视图Id,指定视图id则按照视图的筛选排序结果返回数据 */
  view_id?: string
  /** 指定要返回的字段 */
  field_names?: string[]
  /** 排序条件 */
  sort?: Sort[]
  /** 筛选条件 */
  filter?: FilterInfo
  /** 控制是否返回自动计算的字段, true 表示返回 */
  automatic_fields?: boolean
}

export interface SearchBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchCreateBitableAppTableRecordRequest {
  /** 记录 */
  records: AppTableRecord[]
}

export interface BatchCreateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 用于控制一致性读写，默认开启检查 */
  ignore_consistency_check?: boolean
}

export interface BatchUpdateBitableAppTableRecordRequest {
  /** 记录 */
  records: AppTableRecord[]
}

export interface BatchUpdateBitableAppTableRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 用于控制一致性读写，默认开启检查 */
  ignore_consistency_check?: boolean
}

export interface BatchGetBitableAppTableRecordRequest {
  /** 记录 id 列表 */
  record_ids: string[]
  /** 此次调用中使用的用户 id 的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 控制是否返回记录的分享链接，true 表示返回分享链接 */
  with_shared_url?: boolean
  /** 控制是否返回自动计算的字段，true 表示返回 */
  automatic_fields?: boolean
}

export interface BatchDeleteBitableAppTableRecordRequest {
  /** 删除的多条记录id列表 */
  records: string[]
}

export interface CreateBitableAppTableFieldRequest {
  /** 字段名 */
  field_name: string
  /** 字段类型 */
  type: 1 | 2 | 3 | 4 | 5 | 7 | 11 | 13 | 15 | 17 | 18 | 20 | 21 | 22 | 23 | 1001 | 1002 | 1003 | 1004 | 1005
  /** 字段属性 */
  property?: AppTableFieldProperty
  /** 字段的描述 */
  description?: AppTableFieldDescription
  /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: 'Text' | 'Email' | 'Barcode' | 'Number' | 'Progress' | 'Currency' | 'Rating' | 'SingleSelect' | 'MultiSelect' | 'DateTime' | 'Checkbox' | 'User' | 'GroupChat' | 'Phone' | 'Url' | 'Attachment' | 'SingleLink' | 'Formula' | 'DuplexLink' | 'Location' | 'CreatedTime' | 'ModifiedTime' | 'CreatedUser' | 'ModifiedUser' | 'AutoNumber'
}

export interface CreateBitableAppTableFieldQuery {
  /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
}

export interface UpdateBitableAppTableFieldRequest {
  /** 字段名 */
  field_name: string
  /** 字段类型 */
  type: 1 | 2 | 3 | 4 | 5 | 7 | 11 | 13 | 15 | 17 | 18 | 20 | 21 | 22 | 23 | 1001 | 1002 | 1003 | 1004 | 1005
  /** 字段属性 */
  property?: AppTableFieldProperty
  /** 字段的描述 */
  description?: AppTableFieldDescription
  /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: 'Text' | 'Email' | 'Barcode' | 'Number' | 'Progress' | 'Currency' | 'Rating' | 'SingleSelect' | 'MultiSelect' | 'DateTime' | 'Checkbox' | 'User' | 'GroupChat' | 'Phone' | 'Url' | 'Attachment' | 'SingleLink' | 'Formula' | 'DuplexLink' | 'Location' | 'CreatedTime' | 'ModifiedTime' | 'CreatedUser' | 'ModifiedUser' | 'AutoNumber'
}

export interface ListBitableAppTableFieldQuery {
  /** 视图 ID */
  view_id?: string
  /** 控制字段描述（多行文本格式）数据的返回格式, true 表示以数组富文本形式返回 */
  text_field_as_array?: boolean
}

export interface CopyBitableAppDashboardRequest {
  /** 仪表盘名称 */
  name: string
}

export interface PatchBitableAppTableFormRequest {
  /** 表单名称 */
  name?: string
  /** 表单描述 */
  description?: string
  /** 是否开启共享 */
  shared?: boolean
  /** 分享范围限制 */
  shared_limit?: 'off' | 'tenant_editable' | 'anyone_editable'
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

export interface CreateBitableAppRoleRequest {
  /** 自定义权限的名字 */
  role_name: string
  /** 数据表权限 */
  table_roles: AppRoleTableRole[]
  /** block权限 */
  block_roles?: AppRoleBlockRole[]
}

export interface UpdateBitableAppRoleRequest {
  /** 自定义权限的名字 */
  role_name: string
  /** 数据表权限 */
  table_roles: AppRoleTableRole[]
  /** block权限 */
  block_roles?: AppRoleBlockRole[]
}

export interface BatchDeleteBitableAppRoleMemberRequest {
  /** 协作者列表 */
  member_list: AppRoleMemberId[]
}

export interface BatchCreateBitableAppRoleMemberRequest {
  /** 协作者列表 */
  member_list: AppRoleMemberId[]
}

export interface CreateBitableAppRoleMemberRequest {
  /** 协作者id */
  member_id: string
}

export interface CreateBitableAppRoleMemberQuery {
  /** 协作者id类型，与请求体中的member_id要对应 */
  member_id_type?: 'open_id' | 'union_id' | 'user_id' | 'chat_id' | 'department_id' | 'open_department_id'
}

export interface DeleteBitableAppRoleMemberQuery {
  /** 协作者id类型，与请求体中的member_id要对应 */
  member_id_type?: 'open_id' | 'union_id' | 'user_id' | 'chat_id' | 'department_id' | 'open_department_id'
}

export interface UpdateBitableAppWorkflowRequest {
  /** 自动化状态 */
  status: string
}

export interface GetBitableAppTableRecordQuery {
  /** 控制多行文本字段数据的返回格式, true 表示以数组形式返回 */
  text_field_as_array?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 控制公式、查找引用是否显示完整的原样返回结果 */
  display_formula_ref?: boolean
  /** 控制是否返回该记录的链接 */
  with_shared_url?: boolean
  /** 控制是否返回自动计算的字段，例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`，true 表示返回 */
  automatic_fields?: boolean
}

export interface ListBitableAppTableRecordQuery {
  /** 视图 id注意：如 filter 或 sort 有值，view_id 会被忽略。 */
  view_id?: string
  /** 筛选参数注意：1.筛选记录的表达式不超过2000个字符。2.不支持对“人员”以及“关联字段”的属性进行过滤筛选，如人员的 OpenID。3.仅支持字段在页面展示字符值进行筛选。详细请参考[记录筛选开发指南](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/filter) */
  filter?: string
  /** 排序参数注意：1.表达式需要不超过1000字符。2.不支持对带“公式”和“关联字段”的表的使用。3.使用引号将字段名称和顺序逆序连接起来。 */
  sort?: string
  /** 字段名称 */
  field_names?: string
  /** 控制多行文本字段数据的返回格式，true 表示以数组形式返回。注意：1.多行文本中如果有超链接部分，则会返回链接的 URL。2.目前可以返回多行文本中 URL 类型为多维表格链接、飞书 doc、飞书 sheet的URL类型以及@人员的数据结构。 */
  text_field_as_array?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 控制公式、查找引用是否显示完整的原样返回结果 */
  display_formula_ref?: boolean
  /** 控制是否返回自动计算的字段，例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`，true 表示返回 */
  automatic_fields?: boolean
}

export interface CreateBitableAppResponse {
  app?: App
}

export interface CopyBitableAppResponse {
  app?: App
}

export interface GetBitableAppResponse {
  app?: DisplayApp
}

export interface UpdateBitableAppResponse {
  app?: DisplayAppV2
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

export interface ListBitableAppTableResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 总数 */
  total?: number
  items?: AppTable[]
}

export interface CreateBitableAppTableViewResponse {
  view?: AppTableView
}

export interface PatchBitableAppTableViewResponse {
  view?: AppTableView
}

export interface ListBitableAppTableViewResponse {
  /** 视图列表 */
  items?: AppTableView[]
  /** 下一页分页的token */
  page_token?: string
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 总数 */
  total?: number
}

export interface GetBitableAppTableViewResponse {
  view?: AppTableView
}

export interface CreateBitableAppTableRecordResponse {
  record?: AppTableRecord
}

export interface UpdateBitableAppTableRecordResponse {
  record?: AppTableRecord
}

export interface SearchBitableAppTableRecordResponse {
  /** record 结果 */
  items?: AppTableRecord[]
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 总数 */
  total?: number
}

export interface DeleteBitableAppTableRecordResponse {
  /** 是否成功删除 */
  deleted?: boolean
  /** 删除的记录id */
  record_id?: string
}

export interface BatchCreateBitableAppTableRecordResponse {
  /** 本次请求新增的记录列表 */
  records?: AppTableRecord[]
}

export interface BatchUpdateBitableAppTableRecordResponse {
  /** 更新后的记录 */
  records?: AppTableRecord[]
}

export interface BatchGetBitableAppTableRecordResponse {
  /** 记录列表 */
  records?: AppTableRecord[]
  /** 禁止访问的记录列表(针对开启了高级权限的文档) */
  forbidden_record_ids?: string[]
  /** 不存在的记录列表 */
  absent_record_ids?: string[]
}

export interface BatchDeleteBitableAppTableRecordResponse {
  /** 记录删除结果 */
  records?: DeleteRecord[]
}

export interface CreateBitableAppTableFieldResponse {
  field?: AppTableField
}

export interface UpdateBitableAppTableFieldResponse {
  field?: AppTableField
}

export interface ListBitableAppTableFieldResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 总数 */
  total?: number
  /** 字段列表 */
  items?: AppTableFieldForList[]
}

export interface DeleteBitableAppTableFieldResponse {
  /** 字段唯一标识id */
  field_id?: string
  /** 是否已删除 */
  deleted?: boolean
}

export interface CopyBitableAppDashboardResponse {
  /** 多维表格 block_id */
  block_id?: string
  /** block 名称 */
  name?: string
}

export interface PatchBitableAppTableFormResponse {
  /** 表单元数据信息 */
  form: AppTableForm
}

export interface GetBitableAppTableFormResponse {
  /** 表单元数据信息 */
  form: AppTableForm
}

export interface PatchBitableAppTableFormFieldResponse {
  /** 更新后的field值 */
  field?: AppTableFormPatchedField
}

export interface ListBitableAppTableFormFieldResponse {
  /** 表单内的字段列表 */
  items: AppTableFormField[]
  /** 下一页分页的token */
  page_token: string
  /** 是否有下一页 */
  has_more: boolean
  /** 总数 */
  total: number
}

export interface ListBitableAppRoleResponse {
  /** 角色列表 */
  items?: AppRole[]
  /** 下一页分页的token */
  page_token?: string
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 总数 */
  total?: number
}

export interface CreateBitableAppRoleResponse {
  role?: AppRole
}

export interface UpdateBitableAppRoleResponse {
  role?: AppRole
}

export interface ListBitableAppRoleMemberResponse {
  /** 协作者列表 */
  items?: AppRoleMember[]
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 总数 */
  total?: number
}

export interface ListBitableAppWorkflowResponse {
  /** 自动化工作流信息 */
  workflows: AppWorkflow[]
}

export interface GetBitableAppTableRecordResponse {
  record?: AppTableRecord
}

export interface ListBitableAppTableRecordResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 总数 */
  total?: number
  items?: AppTableRecord[]
}

Internal.define({
  '/open-apis/bitable/v1/apps': {
    POST: 'createBitableApp',
  },
  '/open-apis/bitable/v1/apps/{app_token}/copy': {
    POST: 'copyBitableApp',
  },
  '/open-apis/bitable/v1/apps/{app_token}': {
    GET: 'getBitableApp',
    PUT: 'updateBitableApp',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables': {
    POST: 'createBitableAppTable',
    GET: 'listBitableAppTable',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/batch_create': {
    POST: 'batchCreateBitableAppTable',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}': {
    PATCH: 'patchBitableAppTable',
    DELETE: 'deleteBitableAppTable',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/batch_delete': {
    POST: 'batchDeleteBitableAppTable',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/views': {
    POST: 'createBitableAppTableView',
    GET: 'listBitableAppTableView',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/views/{view_id}': {
    PATCH: 'patchBitableAppTableView',
    GET: 'getBitableAppTableView',
    DELETE: 'deleteBitableAppTableView',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records': {
    POST: 'createBitableAppTableRecord',
    GET: 'listBitableAppTableRecord',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records/{record_id}': {
    PUT: 'updateBitableAppTableRecord',
    DELETE: 'deleteBitableAppTableRecord',
    GET: 'getBitableAppTableRecord',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records/search': {
    POST: 'searchBitableAppTableRecord',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_create': {
    POST: 'batchCreateBitableAppTableRecord',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_update': {
    POST: 'batchUpdateBitableAppTableRecord',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_get': {
    POST: 'batchGetBitableAppTableRecord',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_delete': {
    POST: 'batchDeleteBitableAppTableRecord',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/fields': {
    POST: 'createBitableAppTableField',
    GET: 'listBitableAppTableField',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/fields/{field_id}': {
    PUT: 'updateBitableAppTableField',
    DELETE: 'deleteBitableAppTableField',
  },
  '/open-apis/bitable/v1/apps/{app_token}/dashboards/{block_id}/copy': {
    POST: 'copyBitableAppDashboard',
  },
  '/open-apis/bitable/v1/apps/{app_token}/dashboards': {
    GET: { name: 'listBitableAppDashboard', pagination: { argIndex: 1, itemsKey: 'dashboards' } },
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}': {
    PATCH: 'patchBitableAppTableForm',
    GET: 'getBitableAppTableForm',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}/fields/{field_id}': {
    PATCH: 'patchBitableAppTableFormField',
  },
  '/open-apis/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}/fields': {
    GET: 'listBitableAppTableFormField',
  },
  '/open-apis/bitable/v1/apps/{app_token}/roles': {
    GET: 'listBitableAppRole',
    POST: 'createBitableAppRole',
  },
  '/open-apis/bitable/v1/apps/{app_token}/roles/{role_id}': {
    DELETE: 'deleteBitableAppRole',
    PUT: 'updateBitableAppRole',
  },
  '/open-apis/bitable/v1/apps/{app_token}/roles/{role_id}/members/batch_delete': {
    POST: 'batchDeleteBitableAppRoleMember',
  },
  '/open-apis/bitable/v1/apps/{app_token}/roles/{role_id}/members/batch_create': {
    POST: 'batchCreateBitableAppRoleMember',
  },
  '/open-apis/bitable/v1/apps/{app_token}/roles/{role_id}/members': {
    GET: 'listBitableAppRoleMember',
    POST: 'createBitableAppRoleMember',
  },
  '/open-apis/bitable/v1/apps/{app_token}/roles/{role_id}/members/{member_id}': {
    DELETE: 'deleteBitableAppRoleMember',
  },
  '/open-apis/bitable/v1/apps/{app_token}/workflows': {
    GET: 'listBitableAppWorkflow',
  },
  '/open-apis/bitable/v1/apps/{app_token}/workflows/{workflow_id}': {
    PUT: 'updateBitableAppWorkflow',
  },
})
