import { Internal } from '../internal'
import { AdminDeptStat, AdminUserStat, AuditInfo, Badge, Grant, I18n, Password, RuleDetail } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 重置用户的企业邮箱密码
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/password/reset
     */
    resetAdminPassword(body: ResetAdminPasswordRequest, query?: ResetAdminPasswordQuery): Promise<void>
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
    createAdminBadge(body: CreateAdminBadgeRequest): Promise<CreateAdminBadgeResponse>
    /**
     * 修改勋章信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/update
     */
    updateAdminBadge(badge_id: string, body: UpdateAdminBadgeRequest): Promise<UpdateAdminBadgeResponse>
    /**
     * 上传勋章图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge_image/create
     */
    createAdminBadgeImage(form: CreateAdminBadgeImageForm): Promise<CreateAdminBadgeImageResponse>
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
    createAdminBadgeGrant(badge_id: string, body: CreateAdminBadgeGrantRequest, query?: CreateAdminBadgeGrantQuery): Promise<CreateAdminBadgeGrantResponse>
    /**
     * 删除授予名单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/delete
     */
    deleteAdminBadgeGrant(badge_id: string, grant_id: string): Promise<void>
    /**
     * 修改授予名单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/update
     */
    updateAdminBadgeGrant(badge_id: string, grant_id: string, body: UpdateAdminBadgeGrantRequest, query?: UpdateAdminBadgeGrantQuery): Promise<UpdateAdminBadgeGrantResponse>
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
     * 获取行为审计日志数据
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uQjM5YjL0ITO24CNykjN/audit_log/audit_data_get
     */
    listAdminAuditInfo(query?: ListAdminAuditInfoQuery): Promise<ListAdminAuditInfoResponse>
  }
}

export interface ResetAdminPasswordRequest {
  /** 需要重置的密码参数，不少于8个字符，字母、数字和符号，至少三选二 */
  password: Password
  /** 待修改密码的用户ID，只针对邮箱登录凭证与企业邮箱(包括别名)相等的用户生效 */
  user_id: string
}

export interface ResetAdminPasswordQuery {
  /** 用户ID类型 */
  user_id_type: 'open_id' | 'union_id' | 'user_id'
}

export interface ListAdminAdminDeptStatQuery {
  /** 部门ID类型 */
  department_id_type: 'department_id' | 'open_department_id'
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
  /** 跨域访问的geo */
  target_geo?: string
  /** 是否返回分产品版本数据 */
  with_product_version?: boolean
}

export interface ListAdminAdminUserStatQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 部门ID类型 */
  department_id_type?: 'department_id' | 'open_department_id'
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
  /** 跨域访问的geo */
  target_geo?: string
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
  i18n_name?: I18n
  /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
  i18n_explanation?: I18n
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
  i18n_name?: I18n
  /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
  i18n_explanation?: I18n
}

export interface CreateAdminBadgeImageForm {
  /** 勋章图片的文件，仅支持 PNG 格式，320 x 320 像素，大小不超过 1024 KB。 */
  image_file: Blob
  /** 图片的类型 */
  image_type: 1 | 2
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
  grant_type: 0 | 1
  /** 授予名单的生效时间对应的时区，用于检查RuleDetail的时间戳的取值是否规范，取值范围为TZ database name */
  time_zone: string
  /** 规则详情 */
  rule_detail: RuleDetail
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
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface UpdateAdminBadgeGrantRequest {
  /** 授予名单名称，最多100个字符。 */
  name: string
  /** 勋章下唯一的授予事项 */
  grant_type: 0 | 1
  /** 授予名单的生效时间对应的时区，用于检查RuleDetail的时间戳的取值是否规范，取值范围为TZ database name */
  time_zone: string
  /** 规则详情 */
  rule_detail: RuleDetail
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
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ListAdminBadgeGrantQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 授予名单名称，精确匹配。 */
  name?: string
}

export interface GetAdminBadgeGrantQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 此次调用中使用的部门ID的类型。 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface ListAdminAuditInfoQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 日志时间范围: 结束时间. 格式: 秒级时间戳. 默认值: 此刻 */
  latest?: number
  /** 日志时间范围: 起始时间. 格式: 秒级时间戳. 默认值:  30日前此刻 */
  oldest?: number
  /** 事件名称 */
  event_name?: string
  /** 过滤操作者: 操作者类型. 与 operator_value 配合使用 */
  operator_type?: 'user' | 'bot'
  /** 过滤操作者: 操作者ID. 与 operator_type 配合使用 */
  operator_value?: string
  /** 过滤模块 */
  event_module?: number
  /** 下一页分页的token */
  page_token?: string
  /** 分页参数 */
  page_size?: number
  /** 过滤用户类型. 仅当 operator_type=user 时生效 */
  user_type?: 0 | 1 | 2
  /** 过滤操作对象: 操作对象类型. 与object_value配合使用 */
  object_type?: number
  /** 过滤操作对象: 操作对象ID. 与object_type配合使用 */
  object_value?: string
  /** 增强过滤操作对象: 操作对象ID，支持云文档侧泛token过滤。会覆盖object_type和object_value查询条件 */
  ext_filter_object_by_ccm_token?: string
}

export interface ListAdminAdminDeptStatResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 部门统计值 */
  items?: AdminDeptStat[]
}

export interface ListAdminAdminUserStatResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 数据报表 */
  items?: AdminUserStat[]
}

export interface CreateAdminBadgeResponse {
  /** 勋章的信息 */
  badge?: Badge
}

export interface UpdateAdminBadgeResponse {
  /** 勋章信息 */
  badge?: Badge
}

export interface CreateAdminBadgeImageResponse {
  /** 图片的key */
  image_key?: string
}

export interface ListAdminBadgeResponse {
  /** 勋章列表 */
  badges?: Badge[]
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 是否已经遍历完，表示本次页面请求已经拿到所有列表数据 */
  has_more?: boolean
}

export interface GetAdminBadgeResponse {
  /** 勋章信息 */
  badge?: Badge
}

export interface CreateAdminBadgeGrantResponse {
  /** 授予名单的信息 */
  grant?: Grant
}

export interface UpdateAdminBadgeGrantResponse {
  /** 授予名单 */
  grant?: Grant
}

export interface ListAdminBadgeGrantResponse {
  /** 授予名单列表 */
  grants?: Grant[]
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 是否已经遍历完，表示本次页面请求已经拿到所有列表数据 */
  has_more?: boolean
}

export interface GetAdminBadgeGrantResponse {
  /** 授予名单信息 */
  grant?: Grant
}

export interface ListAdminAuditInfoResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
  /** 返回的具体数据内容 */
  items?: AuditInfo[]
}

Internal.define({
  '/open-apis/admin/v1/password/reset': {
    POST: 'resetAdminPassword',
  },
  '/open-apis/admin/v1/admin_dept_stats': {
    GET: 'listAdminAdminDeptStat',
  },
  '/open-apis/admin/v1/admin_user_stats': {
    GET: 'listAdminAdminUserStat',
  },
  '/open-apis/admin/v1/badges': {
    POST: 'createAdminBadge',
    GET: 'listAdminBadge',
  },
  '/open-apis/admin/v1/badges/{badge_id}': {
    PUT: 'updateAdminBadge',
    GET: 'getAdminBadge',
  },
  '/open-apis/admin/v1/badge_images': {
    POST: { name: 'createAdminBadgeImage', multipart: true },
  },
  '/open-apis/admin/v1/badges/{badge_id}/grants': {
    POST: 'createAdminBadgeGrant',
    GET: 'listAdminBadgeGrant',
  },
  '/open-apis/admin/v1/badges/{badge_id}/grants/{grant_id}': {
    DELETE: 'deleteAdminBadgeGrant',
    PUT: 'updateAdminBadgeGrant',
    GET: 'getAdminBadgeGrant',
  },
  '/open-apis/admin/v1/audit_infos': {
    GET: 'listAdminAuditInfo',
  },
})
