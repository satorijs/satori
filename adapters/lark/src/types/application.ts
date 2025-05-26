import { AppCollaborator, AppContactsRangeIdList, Application, ApplicationAppContactsRange, ApplicationAppUsage, ApplicationAppVersion, ApplicationDepartmentAppUsage, ApplicationFeedback, ApplicationVisibilityDepartmentWhiteBlackInfo, ApplicationVisibilityGroupWhiteBlackInfo, ApplicationVisibilityUserWhiteBlackInfo, AppRecommendRule, AppVisibilityIdList, ClientBadgeNum, Scope } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 转移应用所有者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-owner/update
     */
    updateApplicationApplicationOwner(app_id: string, body: UpdateApplicationApplicationOwnerRequest, query?: UpdateApplicationApplicationOwnerQuery): Promise<void>
    /**
     * 更新应用协作者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-collaborators/update
     */
    updateApplicationApplicationCollaborators(app_id: string, body: UpdateApplicationApplicationCollaboratorsRequest, query?: UpdateApplicationApplicationCollaboratorsQuery): Promise<void>
    /**
     * 获取应用协作者列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-collaborators/get
     */
    getApplicationApplicationCollaborators(app_id: string, query?: GetApplicationApplicationCollaboratorsQuery): Promise<GetApplicationApplicationCollaboratorsResponse>
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
    listApplicationApplicationAppVersion(app_id: string, query?: ListApplicationApplicationAppVersionQuery): Paginated<ApplicationAppVersion>
    /**
     * 获取应用版本中开发者申请的通讯录权限范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/contacts_range_suggest
     */
    contactsRangeSuggestApplicationApplicationAppVersion(app_id: string, version_id: string, query?: ContactsRangeSuggestApplicationApplicationAppVersionQuery): Promise<ContactsRangeSuggestApplicationApplicationAppVersionResponse>
    /**
     * 向管理员申请授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/scope/apply
     */
    applyApplicationScope(): Promise<void>
    /**
     * 查询租户授权状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/scope/list
     */
    listApplicationScope(): Promise<ListApplicationScopeResponse>
    /**
     * 获取企业安装的应用
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/list
     */
    listApplication(query?: ListApplicationQuery): Promise<ListApplicationResponse> & AsyncIterableIterator<Application>
    /**
     * 查看待审核的应用列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/underauditlist
     */
    underauditlistApplication(query?: UnderauditlistApplicationQuery): Paginated<Application>
    /**
     * 更新应用审核状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/patch
     */
    patchApplicationApplicationAppVersion(app_id: string, version_id: string, body: PatchApplicationApplicationAppVersionRequest, query?: PatchApplicationApplicationAppVersionQuery): Promise<void>
    /**
     * 更新应用分组信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/patch
     */
    patchApplication(app_id: string, body: PatchApplicationRequest, query?: PatchApplicationQuery): Promise<void>
    /**
     * 获取应用通讯录权限范围配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration
     */
    contactsRangeConfigurationApplication(app_id: string, query?: ContactsRangeConfigurationApplicationQuery): Promise<ContactsRangeConfigurationApplicationResponse>
    /**
     * 更新应用通讯录权限范围配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-contacts_range/patch
     */
    patchApplicationApplicationContactsRange(app_id: string, body: PatchApplicationApplicationContactsRangeRequest, query?: PatchApplicationApplicationContactsRangeQuery): Promise<void>
    /**
     * 查询用户或部门是否在应用的可用或禁用名单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-visibility/check_white_black_list
     */
    checkWhiteBlackListApplicationApplicationVisibility(app_id: string, body: CheckWhiteBlackListApplicationApplicationVisibilityRequest, query?: CheckWhiteBlackListApplicationApplicationVisibilityQuery): Promise<CheckWhiteBlackListApplicationApplicationVisibilityResponse>
    /**
     * 更新应用可用范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-visibility/patch
     */
    patchApplicationApplicationVisibility(app_id: string, body: PatchApplicationApplicationVisibilityRequest, query?: PatchApplicationApplicationVisibilityQuery): Promise<void>
    /**
     * 启停用应用
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-management/update
     */
    updateApplicationApplicationManagement(app_id: string, body: UpdateApplicationApplicationManagementRequest): Promise<void>
    /**
     * 获取多部门应用使用概览
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/department_overview
     */
    departmentOverviewApplicationApplicationAppUsage(app_id: string, body: DepartmentOverviewApplicationApplicationAppUsageRequest, query?: DepartmentOverviewApplicationApplicationAppUsageQuery): Paginated<ApplicationDepartmentAppUsage>
    /**
     * 获取消息推送概览
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/message_push_overview
     */
    messagePushOverviewApplicationApplicationAppUsage(app_id: string, body: MessagePushOverviewApplicationApplicationAppUsageRequest, query?: MessagePushOverviewApplicationApplicationAppUsageQuery): Promise<MessagePushOverviewApplicationApplicationAppUsageResponse>
    /**
     * 获取应用使用概览
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/overview
     */
    overviewApplicationApplicationAppUsage(app_id: string, body: OverviewApplicationApplicationAppUsageRequest, query?: OverviewApplicationApplicationAppUsageQuery): Promise<OverviewApplicationApplicationAppUsageResponse>
    /**
     * 更新应用反馈
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/patch
     */
    patchApplicationApplicationFeedback(app_id: string, feedback_id: string, query?: PatchApplicationApplicationFeedbackQuery): Promise<void>
    /**
     * 获取应用反馈列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/list
     */
    listApplicationApplicationFeedback(app_id: string, query?: ListApplicationApplicationFeedbackQuery): Paginated<ApplicationFeedback, 'feedback_list'>
    /**
     * 更新应用红点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_badge/set
     */
    setApplicationAppBadge(body: SetApplicationAppBadgeRequest, query?: SetApplicationAppBadgeQuery): Promise<void>
    /**
     * 获取用户自定义常用的应用
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v5/application/favourite
     */
    favouriteApplication(query?: FavouriteApplicationQuery): Promise<FavouriteApplicationResponse> & AsyncIterableIterator<Application>
    /**
     * 获取管理员推荐的应用
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v5/application/recommend
     */
    recommendApplication(query?: RecommendApplicationQuery): Promise<RecommendApplicationResponse> & AsyncIterableIterator<Application>
    /**
     * 获取当前设置的推荐规则列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_recommend_rule/list
     */
    listApplicationAppRecommendRule(query?: ListApplicationAppRecommendRuleQuery): Paginated<AppRecommendRule, 'rules'>
  }
}

export interface UpdateApplicationApplicationOwnerRequest {
  /** 新的拥有者用户ID，类型由查询参数中的user_id_type确定 */
  owner_id: string
}

export interface UpdateApplicationApplicationOwnerQuery {
  /** 用户ID类型 */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
}

export interface UpdateApplicationApplicationCollaboratorsRequest {
  /** 添加人员 */
  adds?: AppCollaborator[]
  /** 移除人员 */
  removes?: string[]
}

export interface UpdateApplicationApplicationCollaboratorsQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface GetApplicationApplicationCollaboratorsQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface GetApplicationApplicationCollaboratorsResponse {
  /** 协作者 */
  collaborators?: AppCollaborator[]
}

export interface GetApplicationQuery {
  /** 指定获取应用在该语言下的信息 */
  lang: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetApplicationResponse {
  /** 应用数据 */
  app?: Application
}

export interface GetApplicationApplicationAppVersionQuery {
  /** 应用信息的语言版本 */
  lang: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetApplicationApplicationAppVersionResponse {
  app_version?: ApplicationAppVersion
}

export interface ListApplicationApplicationAppVersionQuery extends Pagination {
  /** 应用信息的语言版本 */
  lang: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 0：按照时间倒序 1：按照时间正序 */
  order?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ContactsRangeSuggestApplicationApplicationAppVersionQuery {
  /** 返回值的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ContactsRangeSuggestApplicationApplicationAppVersionResponse {
  contacts_range?: ApplicationAppContactsRange
}

export interface ListApplicationScopeResponse {
  scopes?: Scope[]
}

export const enum ListApplicationQueryStatus {
  /** 停用 */
  AvailabilityStopped = 0,
  /** 启用 */
  AvailabilityActivated = 1,
  /** 未启用 */
  AvailabilityUnactivated = 2,
}

export const enum ListApplicationQueryPaymentType {
  /** 免费 */
  Free = 0,
  /** 付费 */
  Paid = 1,
}

export const enum ListApplicationQueryOwnerType {
  /** 飞书科技 */
  FeishuTechnology = 0,
  /** 飞书合作伙伴 */
  FeishuThirdParty = 1,
  /** 企业内成员 */
  EnterpriseMember = 2,
}

export interface ListApplicationQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: string
  /** 应用的图标、描述、帮助文档链接是按照应用的主语言返回；其他内容（如应用权限、应用分类）按照该参数设定返回对应的语言。可选值有： zh_cn：中文 en_us：英文 ja_jp：日文  如不填写，则按照应用的主语言返回 */
  lang: string
  /** 不传入代表全部返回。传入则按照这种应用状态返回。应用状态可选值有：0：停用状态1：启用状态 2：未启用状态 */
  status?: ListApplicationQueryStatus
  /** 不传入代表全部返回。传入则按照这种应用状态返回。 付费类型 可选值： 0：免费 1：付费 */
  payment_type?: ListApplicationQueryPaymentType
  /** 不传入代表全部返回。传入则按照这种应用状态返回。所有者类型，可选值： 0：飞书科技 1：飞书合作伙伴 2：企业内成员 */
  owner_type?: ListApplicationQueryOwnerType
}

export interface ListApplicationResponse {
  /** 应用列表 */
  app_list?: Application[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
  /** 应用状态=启用的应用总数 */
  total_count?: number
}

export interface UnderauditlistApplicationQuery extends Pagination {
  /** 指定返回的语言 */
  lang: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export const enum PatchApplicationApplicationAppVersionRequestStatus {
  /** 未知状态 */
  Unknown = 0,
  /** 审核通过 */
  Audited = 1,
  /** 审核拒绝 */
  Reject = 2,
  /** 审核中 */
  UnderAudit = 3,
  /** 未提交审核 */
  Unaudit = 4,
}

export interface PatchApplicationApplicationAppVersionRequest {
  /** 版本状态 */
  status?: PatchApplicationApplicationAppVersionRequestStatus
}

export interface PatchApplicationApplicationAppVersionQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type: 'user_id' | 'union_id' | 'open_id'
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
  lang: 'zh_cn' | 'en_us' | 'ja_jp'
}

export interface ContactsRangeConfigurationApplicationQuery extends Pagination {
  /** 返回值的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ContactsRangeConfigurationApplicationResponse {
  contacts_range?: ApplicationAppContactsRange
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
}

export interface PatchApplicationApplicationContactsRangeRequest {
  /** 更新范围方式 */
  contacts_range_type: 'equal_to_availability' | 'some' | 'all'
  /** 可见范围新增列表 */
  add_visible_list?: AppContactsRangeIdList
  /** 删除可用名单 */
  del_visible_list?: AppContactsRangeIdList
}

export interface PatchApplicationApplicationContactsRangeQuery {
  /** 成员id类型 */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
  /** 部门id 类型 */
  department_id_type?: 'open_department_id' | 'department_id'
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
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次请求传参中的department_id的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface CheckWhiteBlackListApplicationApplicationVisibilityResponse {
  /** 用户可见性信息列表 */
  user_visibility_list?: ApplicationVisibilityUserWhiteBlackInfo[]
  /** 部门可见性信息列表 */
  department_visibility_list?: ApplicationVisibilityDepartmentWhiteBlackInfo[]
  /** 用户组可见性信息列表 */
  group_visibility_list?: ApplicationVisibilityGroupWhiteBlackInfo[]
}

export interface PatchApplicationApplicationVisibilityRequest {
  /** 添加可用人员名单 */
  add_visible_list?: AppVisibilityIdList
  /** 删除可用人员名单 */
  del_visible_list?: AppVisibilityIdList
  /** 添加禁用人员名单 */
  add_invisible_list?: AppVisibilityIdList
  /** 删除禁用人员名单 */
  del_invisible_list?: AppVisibilityIdList
  /** 是否全员可见,false:否;true:是;不填:继续当前状态不改变.如果可见范围为全员后添加的可用人员则无效,禁用人员仍然有效 */
  is_visible_to_all?: boolean
}

export interface PatchApplicationApplicationVisibilityQuery {
  /** 部门id 类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** open_id 类型 */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
}

export interface UpdateApplicationApplicationManagementRequest {
  /** 启用/停用应用 */
  enable?: boolean
}

export const enum DepartmentOverviewApplicationApplicationAppUsageRequestCycleType {
  /** 日活 */
  Day = 1,
  /** 周活， date字段应该填自然周周一的日期 */
  Week = 2,
  /** 月活， date字段应该填自然月1号的日期 */
  Month = 3,
}

export interface DepartmentOverviewApplicationApplicationAppUsageRequest {
  /** 查询日期，格式为yyyy-mm-dd，若cycle_type为1，date可以为任何自然日；若cycle_type为2，则输入的date必须为周一； 若cycle_type为3，则输入的date必须为每月1号 */
  date: string
  /** 活跃周期的统计类型 */
  cycle_type: DepartmentOverviewApplicationApplicationAppUsageRequestCycleType
  /** 查询的部门id，获取方法可参考[部门ID概述](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)-  若部门id为空，则返回当前租户的使用数据；若填写部门id，则返回当前部门的使用数据（包含子部门的用户） 以及多级子部门的使用数据。-  若路径参数中department_id_type为空或者为open_department_id，则此处应该填写部门的 open_department_id；若路径参数中department_id_type为department_id，则此处应该填写部门的 department_id。- 若不填写则返回整个租户的数据 */
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
  department_id_type?: 'department_id' | 'open_department_id'
}

export const enum MessagePushOverviewApplicationApplicationAppUsageRequestCycleType {
  /** 日活 */
  Day = 1,
  /** 周活， date字段应该填自然周周一的日期 */
  Week = 2,
  /** 月活， date字段应该填自然月1号的日期 */
  Month = 3,
}

export interface MessagePushOverviewApplicationApplicationAppUsageRequest {
  /** 查询日期，若cycle_type为week，则输入的date必须为周一； 若cycle_type为month，则输入的date必须为每月1号 */
  date: string
  /** 枚举值：day，week，month；week指自然周，返回当前日期所在周的数据；不满一周则从周一到当前日期算。month指自然月，返回当前日期所在月的数据。 */
  cycle_type: MessagePushOverviewApplicationApplicationAppUsageRequestCycleType
  /** 需要查询的部门id，获取方法可参考[部门ID概述](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)-  若部门id为空，则返回当前租户的使用数据；若填写部门id，则返回当前部门的使用数据（包含子部门的用户）； -  若路径参数中department_id_type为空或者为open_department_id，则此处应该填写部门的 open_department_id；若路径参数中department_id_type为department_id，则此处应该填写部门的 department_id。返回当前部门的使用数据； 若不填写，则返回当前租户的使用数据 */
  department_id?: string
}

export interface MessagePushOverviewApplicationApplicationAppUsageQuery {
  /** 调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface MessagePushOverviewApplicationApplicationAppUsageResponse {
  /** 消息推送情况 */
  items?: ApplicationAppUsage[]
}

export const enum OverviewApplicationApplicationAppUsageRequestCycleType {
  /** 日活 */
  Day = 1,
  /** 周活， date字段应该填自然周周一的日期 */
  Week = 2,
  /** 月活， date字段应该填自然月1号的日期 */
  Month = 3,
}

export interface OverviewApplicationApplicationAppUsageRequest {
  /** 查询日期，格式为yyyy-mm-dd，若cycle_type为1，date可以为任何自然日；若cycle_type为2，则输入的date必须为周一； 若cycle_type为3，则输入的date必须为每月1号 */
  date: string
  /** 活跃周期的统计类型 */
  cycle_type: OverviewApplicationApplicationAppUsageRequestCycleType
  /** 查询的部门id，获取方法可参考[部门ID概述](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/field-overview)-  若部门id为空，则返回当前租户的使用数据；若填写部门id，则返回当前部门的使用数据（包含子部门的用户）； -  若路径参数中department_id_type为空或者为open_department_id，则此处应该填写部门的 open_department_id；若路径参数中department_id_type为department_id，则此处应该填写部门的 department_id。 */
  department_id?: string
  /** 能力类型，按能力类型进行筛选，返回对应能力的活跃数据 */
  ability: 'app' | 'mp' | 'h5' | 'bot'
}

export interface OverviewApplicationApplicationAppUsageQuery {
  /** 调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
}

export interface OverviewApplicationApplicationAppUsageResponse {
  /** 员工使用应用概览数据 */
  items?: ApplicationAppUsage[]
}

export const enum PatchApplicationApplicationFeedbackQueryStatus {
  /** 反馈未处理 */
  Unmarked = 0,
  /** 反馈已处理 */
  Marked = 1,
  /** 反馈处理中 */
  Processing = 2,
  /** 反馈已关闭 */
  Closed = 3,
}

export interface PatchApplicationApplicationFeedbackQuery {
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
  /** 反馈处理状态 */
  status: PatchApplicationApplicationFeedbackQueryStatus
  /** 反馈处理人员id，租户内用户的唯一标识， ID值与查询参数中的user_id_type 对应 */
  operator_id: string
}

export const enum ListApplicationApplicationFeedbackQueryFeedbackType {
  /** 故障反馈 */
  Fault = 1,
  /** 产品建议 */
  Advice = 2,
}

export const enum ListApplicationApplicationFeedbackQueryStatus {
  /** 反馈未处理 */
  Unmarked = 0,
  /** 反馈已处理 */
  Marked = 1,
  /** 反馈处理中 */
  Processing = 2,
  /** 反馈已关闭 */
  Closed = 3,
}

export interface ListApplicationApplicationFeedbackQuery extends Pagination {
  /** 查询的起始日期，格式为yyyy-mm-dd。不填则默认为当前日期减去180天。 */
  from_date?: string
  /** 查询的结束日期，格式为yyyy-mm-dd。不填默认为当前日期。只能查询 180 天内的数据。 */
  to_date?: string
  /** 反馈类型，不填写则表示查询所有反馈类型。 */
  feedback_type?: ListApplicationApplicationFeedbackQueryFeedbackType
  /** 反馈处理状态，不填写则表示查询所有处理类型。 */
  status?: ListApplicationApplicationFeedbackQueryStatus
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface SetApplicationAppBadgeRequest {
  /** 用户ID */
  user_id: string
  /** badge数据版本号 */
  version: string
  /** badge extra 信息 */
  extra?: string
  /** pc端badge数量 */
  pc?: ClientBadgeNum
  /** 移动端badge数量 */
  mobile?: ClientBadgeNum
}

export interface SetApplicationAppBadgeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface FavouriteApplicationQuery extends Pagination {
  /** 应用信息的语言版本 */
  language?: 'zh_cn' | 'en_us' | 'ja_jp'
}

export interface FavouriteApplicationResponse {
  /** 分页的token */
  page_token?: string
  /** 总的数量 */
  total_count?: number
  /** 是否有更多数据 */
  has_more?: boolean
  /** 应用数据列表 */
  app_list?: Application[]
}

export interface RecommendApplicationQuery extends Pagination {
  /** 应用信息的语言版本 */
  language?: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 推荐应用类型，默认为用户不可移除的推荐应用列表 */
  recommend_type?: 'user_unremovable' | 'user_removable'
}

export interface RecommendApplicationResponse {
  /** 分页的token */
  page_token?: string
  /** 分页数量 */
  page_size?: number
  /** 总的数量 */
  total_count?: number
  /** 是否有更多数据 */
  has_more?: boolean
  /** 应用数据列表 */
  app_list?: Application[]
}

export interface ListApplicationAppRecommendRuleQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

Internal.define({
  '/application/v6/applications/{app_id}/owner': {
    PUT: 'updateApplicationApplicationOwner',
  },
  '/application/v6/applications/{app_id}/collaborators': {
    PUT: 'updateApplicationApplicationCollaborators',
    GET: 'getApplicationApplicationCollaborators',
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
    GET: { name: 'listApplicationApplicationAppVersion', pagination: { argIndex: 1 } },
  },
  '/application/v6/applications/{app_id}/app_versions/{version_id}/contacts_range_suggest': {
    GET: 'contactsRangeSuggestApplicationApplicationAppVersion',
  },
  '/application/v6/scopes/apply': {
    POST: 'applyApplicationScope',
  },
  '/application/v6/scopes': {
    GET: 'listApplicationScope',
  },
  '/application/v6/applications': {
    GET: { name: 'listApplication', pagination: { argIndex: 0, itemsKey: 'app_list' } },
  },
  '/application/v6/applications/underauditlist': {
    GET: { name: 'underauditlistApplication', pagination: { argIndex: 0 } },
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
  '/application/v6/applications/{app_id}/app_usage/message_push_overview': {
    POST: 'messagePushOverviewApplicationApplicationAppUsage',
  },
  '/application/v6/applications/{app_id}/app_usage/overview': {
    POST: 'overviewApplicationApplicationAppUsage',
  },
  '/application/v6/applications/{app_id}/feedbacks/{feedback_id}': {
    PATCH: 'patchApplicationApplicationFeedback',
  },
  '/application/v6/applications/{app_id}/feedbacks': {
    GET: { name: 'listApplicationApplicationFeedback', pagination: { argIndex: 1, itemsKey: 'feedback_list' } },
  },
  '/application/v6/app_badge/set': {
    POST: 'setApplicationAppBadge',
  },
  '/application/v5/applications/favourite': {
    GET: { name: 'favouriteApplication', pagination: { argIndex: 0, itemsKey: 'app_list' } },
  },
  '/application/v5/applications/recommend': {
    GET: { name: 'recommendApplication', pagination: { argIndex: 0, itemsKey: 'app_list' } },
  },
  '/application/v6/app_recommend_rules': {
    GET: { name: 'listApplicationAppRecommendRule', pagination: { argIndex: 0, itemsKey: 'rules' } },
  },
})
