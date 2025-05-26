export * from './acs'
export * from './admin'
export * from './aily'
export * from './apaas'
export * from './application'
export * from './approval'
export * from './attendance'
export * from './auth'
export * from './authen'
export * from './baike'
export * from './base'
export * from './bitable'
export * from './board'
export * from './calendar'
export * from './cardkit'
export * from './compensation'
export * from './contact'
export * from './corehr'
export * from './directory'
export * from './docs'
export * from './document_ai'
export * from './docx'
export * from './drive'
export * from './ehr'
export * from './event'
export * from './helpdesk'
export * from './hire'
export * from './human_authentication'
export * from './im'
export * from './lingo'
export * from './mail'
export * from './mdm'
export * from './minutes'
export * from './moments'
export * from './okr'
export * from './optical_char_recognition'
export * from './passport'
export * from './payroll'
export * from './performance'
export * from './personal_settings'
export * from './report'
export * from './search'
export * from './security_and_compliance'
export * from './sheets'
export * from './speech_to_text'
export * from './task'
export * from './tenant'
export * from './translation'
export * from './trust_party'
export * from './vc'
export * from './verification'
export * from './wiki'
export * from './workplace'

export interface Abbreviation {
  /** 相关其他词条 id */
  id?: string
}

export interface Ability {
  /** 能力项ID */
  id: string
  /** 能力项名称 */
  name?: I18n
  /** 能力项描述 */
  description?: I18n
}

export const enum AbnormalCode {
  /** 成功 */
  SUCCESS = 0,
  /** 没权限 */
  FORBIDDEN = 1000,
}

export interface AbnormalRecord {
  /** 异常ID */
  id?: string
  /** 行级异常 */
  row_error?: AbnormalCode
  /** 列级异常 */
  field_errors?: Record<string, AbnormalCode>
}

export interface Acceptance {
  /** 操作类型 */
  operator_type?: 1 | 2
  /** offer 接受或拒绝的结果 */
  conclusion?: 1 | 2
  /** 备注，如果是拒绝，则展示拒绝原因 */
  memo?: string
  /** 操作的字符串毫秒时间戳 */
  operate_time?: string
}

export interface AccessData {
  /** 访问次数 */
  pv?: number
  /** 访问用户数(去重) */
  uv?: number
}

export interface AccessRecord {
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
  access_type?: 'FA' | 'QRCode' | 'Card' | 'Fp'
  /** 识别相关数据，根据 access_type 不同，取值不同 */
  access_data?: string
  /** 是否开门 */
  is_door_open?: boolean
}

export interface Account {
  /** 账户ID */
  account_id: string
  /** 账户资产 */
  assets?: Assets
  /** 账号状态 */
  status?: 1 | 2
}

export interface AccountingItemValue {
  /** 算薪项数据原始值，当发薪明细的数据来源为「人工导入」时，如果当前算薪项类型为引用类型，那么算薪项原始值可能为空。 */
  original_value?: string
  /** 引用类型算薪项展示值 */
  reference_values?: I18nContent[]
}

export interface AcctItem {
  /** 算薪项ID */
  id?: string
  /** 算薪项名称 */
  i18n_names?: I18nContent[]
  /** 算薪项分类ID */
  category_id?: string
  /** 算薪项数据类型 */
  data_type?: number
  /** 小数位数 */
  decimal_places?: number
  /** 启用状态 */
  active_status?: number
}

export interface Acl {
  /** 权限类型，优先级：Deny > Allow */
  access?: 'allow' | 'deny'
  /** 设置的权限值，依赖 type 描述 */
  value?: string
  /** 权限值类型 */
  type?: 'user_id' | 'open_id' | 'union_id' | 'department_id' | 'open_department_id' | 'group_id' | 'app_group_id' | 'user' | 'group'
}

export interface AclScope {
  /** 权限类型，当type为User时，值为open_id/user_id/union_id */
  type: 'user'
  /** 用户ID */
  user_id?: string
}

export interface ActionConfig {
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

export interface Activity {
  /** 项目 ID */
  id: string
  /** 项目名称 */
  name?: I18n
  /** 项目描述 */
  description?: I18n
  /** 周期 ID */
  semester_id?: string
  /** 项目模式 */
  mode?: 'metric_development' | 'performance_review' | 'metric_development_and_performance_review'
  /** 项目状态 */
  progress?: 'configurable' | 'unable' | 'initiating' | 'enabled' | 'finished'
  /** 项目创建时间，毫秒时间戳 */
  create_time?: string
  /** 项目更新时间，毫秒时间戳 */
  modify_time?: string
  /** 项目创建人 ID */
  create_user_id?: string
  /** 项目更新人 ID */
  modify_user_id?: string
}

export interface AdditionalInformation {
  /** 飞书绩效的事项 ID */
  item_id?: string
  /** 外部系统的事项 ID，没有则返回为空 */
  external_id?: string
  /** 被评估人 ID */
  reviewee_user_id: string
  /** 事项 */
  item: string
  /** 事项时间，格式为文本内容 */
  time: string
  /** 事项详细描述 */
  detailed_description: string
}

export interface AddOns {
  /** 团队互动应用唯一ID */
  component_id?: string
  /** 团队互动应用类型，比如问答互动"blk_636a0a6657db8001c8df5488" */
  component_type_id: string
  /** 文档小组件内容数据，JSON 字符串 */
  record?: string
}

export interface Address {
  /** 地址 ID */
  address_id?: string
  /** 国家 / 地区 */
  country_region_id: string
  /** 主要行政区 */
  region_id?: string
  /** 地址行 1 */
  address_line1?: string
  /** 地址行 2 */
  address_line2?: string
  /** 地址行 3 */
  address_line3?: string
  /** 地址行 4 */
  address_line4?: string
  /** 地址行 5 */
  address_line5?: string
  /** 地址行 6 */
  address_line6?: string
  /** 地址行 7 */
  address_line7?: string
  /** 地址行 8 */
  address_line8?: string
  /** 地址行 9 */
  address_line9?: string
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
  address_type_list: Enum[]
  /** 主要地址 */
  is_primary: boolean
  /** 公开地址 */
  is_public: boolean
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface AddressForUpdate {
  /** 国家 / 地区 */
  country_region_id: string
  /** 主要行政区 */
  region_id?: string
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
  /** 地址类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可：- object_api_name = "address" - custom_api_name = "address_type" */
  address_types: string[]
  /** 主要地址 */
  is_primary: boolean
  /** 公开地址 */
  is_public: boolean
  /** 城市 */
  city_id_v2?: string
  /** 区/县 */
  district_id_v2?: string
}

export interface AdjustmentLogic {
  /** 固定值 */
  fixed?: string
  /** 公式配置 */
  formula?: Formula
}

export interface AdminDeptStat {
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
  /** 大搜搜索活跃人数 */
  search_active_dau?: string
  /** 总搜索次数 */
  total_search_count?: string
  /** 综搜次数 */
  quick_search_count?: string
  /** 垂搜次数 */
  tab_search_count?: string
  /** 产品版本名称 */
  product_version?: string
}

export interface AdminUserStat {
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
  user_active_flag?: 0 | 1
  /** 激活时间 */
  register_time?: string
  /** 用户活跃状态 */
  suite_active_flag?: 0 | 1
  /** 最近活跃时间 */
  last_active_time?: string
  /** 用户消息活跃状态 */
  im_active_flag?: 0 | 1
  /** 发送消息数 */
  send_messenger_num?: number
  /** 用户云文档活跃状态 */
  docs_active_flag?: 0 | 1
  /** 创建文件数 */
  create_docs_num?: number
  /** 用户日历活跃状态 */
  cal_active_flag?: 0 | 1
  /** 创建日程数 */
  create_cal_num?: number
  /** 用户音视频会议活跃状态 */
  vc_active_flag?: 0 | 1
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
  /** 是否使用了大搜 */
  search_active_flag?: number
  /** 总搜索次数 */
  total_search_count?: string
  /** 综搜次数 */
  quick_search_count?: string
  /** 垂搜次数 */
  tab_search_count?: string
}

export interface Agency {
  /** 猎头供应商ID */
  id?: string
  /** 猎头供应商名称 */
  name?: string
  /** 供应商联系人ID */
  contactor_id?: string
  /** 供应商联系人名称 */
  contactor_name?: I18n
}

export interface AgencyAccount {
  /** 猎头 ID */
  id?: string
  /** 禁用原因 */
  reason?: string
  /** 添加时间，毫秒时间戳 */
  create_time?: string
  /** 猎头状态 */
  status?: 0 | 1 | 2
  /** 用户信息 */
  user_info?: AgencyAccountUser
  /** 角色 */
  role?: 0 | 1
}

export interface AgencyAccountUser {
  /** 用户ID */
  user_id?: string
  /** 用户名称 */
  name?: I18n
  /** 用户邮箱 */
  email?: string
  /** 用户手机 */
  mobile?: string
}

export interface AgencyBasicInfo {
  /** 猎头用户名 */
  hunter_user_name?: I18n
  /** 猎头公司名 */
  hunter_company_name?: string
}

export interface AgencyInfo {
  /** 猎头基本信息 */
  basic_info?: AgencyBasicInfo
  /** 猎头评价信息 */
  comment_info?: ReportCustomData[]
  /** 薪酬信息 */
  salary_info?: ReportCustomData[]
}

export interface AgencyProtection {
  /** 保护期类型 */
  protection_type?: 1 | 2
  /** 如保护期类型为职位保护，返回职位保护所在的投递id */
  application_id?: string
  /** 保护期开始时间 */
  start_time?: string
  /** 保护期过期时间 */
  expire_time?: string
  /** 推荐的猎头供应商 ID */
  agency_supplier_id?: string
  /** 推荐的猎头供应商名称 */
  agency_supplier_name?: I18n
  /** 推荐的猎头顾问ID，目前仅作为唯一标识，不可查询具体的人员信息 */
  agency_supplier_user_id?: string
  /** 推荐的猎头顾问名称 */
  agency_supplier_user_name?: I18n
}

export interface AgencySupplier {
  /** 猎头供应商 ID */
  id?: string
  /** 猎头供应商名称 */
  name?: string
  /** 标签列表 */
  label_list?: AgencySupplierLabel[]
  /** 管理员列表 */
  admin_list?: AgencySupplierAdmin[]
  /** 猎头简历保护期 */
  agency_protect_time?: AgencySupplierProtectTime
  /** 合作创建时间，毫秒时间戳 */
  cooperation_create_time?: string
  /** 合作开始时间，毫秒时间戳 */
  cooperation_start_time?: string
  /** 合作终止时间，毫秒时间戳 */
  cooperation_end_time?: string
  /** 合作状态，毫秒时间戳 */
  cooperation_status?: 1 | 2 | 3 | 4
  /** 供应商邮箱 */
  invite_email?: string
  /** 猎头区域 */
  supplier_area?: 1 | 2
  /** 企业自有简历保护期 */
  talent_protect_time?: AgencySupplierTalentProtectTime
}

export interface AgencySupplierAdmin {
  /** 管理员 ID */
  user_id?: string
  /** 管理员名称 */
  name?: I18n
  /** 管理员邮箱 */
  email?: string
}

export interface AgencySupplierLabel {
  /** 标签 ID */
  id?: string
  /** 标签名称 */
  name?: I18n
}

export interface AgencySupplierProtectTime {
  /** 保护时长，单位（天） */
  day?: number
  /** 是否使用统一设置 */
  use_default?: boolean
}

export interface AgencySupplierTalentProtectTime {
  /** 保护时长，单位（天） */
  day?: number
  /** 是否使用统一设置 */
  use_default?: boolean
  /** 是否永久保护 */
  forever?: boolean
}

export type Agenda = unknown

export type AgendaItem = unknown

export type AgendaItemContent = unknown

export interface AgendaItemTitle {
  /** 文本元素 */
  elements: AgendaTitleElement[]
  /** 对齐方式 */
  align?: 1 | 2 | 3
}

export interface AgendaTitleElement {
  /** 文字 */
  text_run?: TextRun
  /** @用户 */
  mention_user?: MentionUser
  /** @文档 */
  mention_doc?: MentionDoc
  /** 日期提醒 */
  reminder?: Reminder
  /** 内联附件 */
  file?: InlineFile
  /** 未支持的 TextElement */
  undefined?: UndefinedElement
  /** 内联 block */
  inline_block?: InlineBlock
  /** 公式 */
  equation?: Equation
}

export interface AgentSchedule {
  /** status of agent */
  status?: number
  /** agent info */
  agent?: AgentUser
  /** day schedule */
  schedule?: WeekdaySchedule[]
  /** agent skills */
  agent_skills?: AgentSkillLessInfo[]
}

export interface AgentScheduleUpdateInfo {
  /** agent id */
  agent_id?: string
  /** schedule listing */
  schedule?: WeekdaySchedule[]
  /** skill ids */
  agent_skill_ids?: string[]
}

export interface AgentSkill {
  /** name of agent skill */
  name?: string
  /** rules for group */
  rules?: AgentSkillRule[]
  /** agent ids in this group */
  agent_ids?: string[]
}

export interface AgentSkillLessInfo {
  /** skill id */
  id?: string
  /** name of agent skill */
  name?: string
  /** is default group type */
  is_default?: boolean
}

export interface AgentSkillRule {
  /** attribute id */
  id?: string
  /** selected operator, 2 for GreaterEqual, 3 for LessEqual, 4 for RangeValue, 5 for In, 6 for NotIn, 7 for MultiSelectExcludeAll, 8 for MultiSelectContainAny, 9 for ContainAny, 10 for ExcludeAll, 11 for ContainAll, 12 for MultiSelectContainAll */
  selected_operator?: number
  /** operand value based on selected_operator */
  operand?: string
  /** 1 for FAQ, 2 for Ticket, 3 for User, 4 for PreInquiryForm */
  category?: number
}

export interface AgentUser {
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

export interface AilyKnowledgeAskProcessData {
  /** 有数据分析时，根据数据生成的图表描述，按markdown语义描述 */
  chart_dsls?: string[]
  /** 召回的知识视图切片的文本数据 */
  chunks?: string[]
  /** 有数据分析时，查询到数据结果，每个元素为 json 序列化后的数据结果 */
  sql_data?: string[]
}

export interface AilyKnowledgeFaq {
  /** 匹配问题 */
  question?: string
  /** 匹配描述 */
  answer?: string
}

export interface AilyKnowledgeMessage {
  /** 消息内容 */
  content?: string
}

export interface AilyMention {
  /** 实体 ID */
  entity_id?: string
  /** 身份提供者 */
  identity_provider?: IdentityProvider
  /** 被@实体在消息体中的占位符 */
  key?: string
  /** 被@实体的名称 */
  name?: string
  /** Aily 账号体系下的 ID */
  aily_id?: string
}

export interface AilyMessage {
  /** 消息 ID */
  id?: string
  /** 会话 ID */
  session_id?: string
  /** 运行 ID */
  run_id?: string
  /** 消息内容类型 */
  content_type?: AilyMessageContentType
  /** 消息内容 */
  content?: string
  /** 消息中包含的文件 */
  files?: AilyMessageFile[]
  /** 引用的消息 ID */
  quote_message_id?: string
  /** 发送者 */
  sender?: AilySender
  /** 被@的实体 */
  mentions?: AilyMention[]
  /** 消息体的纯文本表达 */
  plain_text?: string
  /** 消息的创建时间，毫秒时间戳 */
  created_at?: string
  /** 状态 */
  status?: AilyMessageStatus
}

export const enum AilyMessageContentType {
  /** MDX */
  ContentTypeMDX = 'MDX',
  /** TEXT */
  ContentTypeText = 'TEXT',
  /** GUI 卡片 */
  ContentTypeClip = 'CLIP',
  /** SmartCard */
  ContentTypeSmartCard = 'SmartCard',
  /** JSON */
  ContentTypeJSON = 'JSON',
}

export interface AilyMessageFile {
  /** 文件 ID */
  id?: string
  /** 文件类型，参见 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types */
  mime_type?: string
  /** 文件名 */
  file_name?: string
  /** 其他透传信息 */
  metadata?: string
  /** 文件的创建时间，毫秒时间戳 */
  created_at?: string
  /** 文件预览链接 */
  preview_url?: AilyMessageFilePreview
}

export interface AilyMessageFilePreview {
  /** 文件的 URL */
  url: string
  /** url 过期时间，秒时间戳 */
  expired_at?: string
}

export const enum AilyMessageStatus {
  /** 生成中 */
  MessageStatusInProgress = 'IN_PROGRESS',
  /** 已完成 */
  MessageStatusCompleted = 'COMPLETED',
}

export interface AilySender {
  /** 实体 ID */
  entity_id?: string
  /** 身份提供者 */
  identity_provider?: IdentityProvider
  /** 发送人类型 */
  sender_type?: AilySenderType
  /** Aily 账号体系下的 ID */
  aily_id?: string
}

export const enum AilySenderType {
  /** 用户 */
  SenderTypeUser = 'USER',
  /** 应用 */
  SenderTypeAssistant = 'ASSISTANT',
}

export interface AilySession {
  /** 会话 ID */
  id: string
  /** 会话的创建时间，毫秒时间戳 */
  created_at: string
  /** 会话的上次更新时间，毫秒时间戳 */
  modified_at: string
  /** 会话的创建人 */
  created_by: string
  /** 渠道上下文 */
  channel_context?: string
  /** 其他透传信息 */
  metadata?: string
}

export interface Alert {
  /** 告警ID */
  alert_id?: string
  /** 触发告警规则的会议室/服务器具体的名称 */
  resource_scope?: string
  /** 触发告警规则的监控对象 */
  monitor_target?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 告警规则的规则描述 */
  alert_strategy?: string
  /** 告警通知发生时间（unix时间，单位sec） */
  alert_time?: string
  /** 告警等级：严重/警告/提醒 */
  alert_level?: 0 | 1 | 2
  /** 告警联系人 */
  contacts?: Contact[]
  /** 通知方式 */
  notifyMethods?: (0 | 1)[]
  /** 规则名称 */
  alertRule?: string
  /** 处理时间 */
  process_time?: string
  /** 恢复时间 */
  recover_time?: string
  /** 处理状态：待处理/处理中/已恢复 */
  process_status?: 0 | 1 | 2 | 3 | 4
  /** 告警规则ID */
  alert_rule_id?: string
  /** 触发告警规则的会议室ID，当触发告警规则的是会议室时返回该信息 */
  monitor_target_room_id?: string
  /** 触发告警规则的会议室主机Mac地址，当monitor_target=1时返回该信息 */
  monitor_target_room_mac?: string
}

export interface AllowedEditModes {
  /** 是否允许手动录入 */
  manual?: boolean
  /** 是否允许移动端录入 */
  scan?: boolean
}

export interface AllowedRollbaclkTaskItemType {
  /** 任务ID */
  id?: string
  /** 任务对应的活动名称 */
  activity_label?: I18ns
  /** 是否开始节点 */
  is_start?: boolean
}

export interface ApiAuditCommonDrawers {
  /** 扩展字段信息 */
  common_draw_info_list?: ApiAuditDrawerInfo[]
}

export interface ApiAuditDrawerInfo {
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

export interface App {
  /** 多维表格 app token */
  app_token?: string
  /** 多维表格 App 名字 */
  name?: string
  /** 多维表格 App 归属文件夹 */
  folder_token?: string
  /** 多维表格 App URL */
  url?: string
  /** 默认的表格id */
  default_table_id?: string
  /** 文档时区，说明见：https://bytedance.feishu.cn/docx/YKRndTM7VoyDqpxqqeEcd67MnEf */
  time_zone?: string
}

export interface AppAbility {
  /** 小程序能力 */
  gadget?: Gadget
  /** 网页能力 */
  web_app?: WebApp
  /** 机器人能力 */
  bot?: Bot
  /** 小组件能力 */
  workplace_widgets?: WorkplaceWidget[]
  /** 主导航小程序 */
  navigate?: Navigate
  /** 云文档应用 */
  cloud_doc?: CloudDoc
  /** 云文档小组件 */
  docs_blocks?: DocsBlock[]
  /** 消息快捷操作 */
  message_action?: MessageAction
  /** 加号菜单 */
  plus_menu?: PlusMenu
}

export interface AppCollaborator {
  /** 人员类型 */
  type: 'administrator' | 'developer' | 'operator'
  /** 用户ID */
  user_id: string
}

export interface AppContactsRangeIdList {
  /** 成员id列表 */
  user_ids?: string[]
  /** 部门id列表 */
  department_ids?: string[]
  /** 用户组列表 */
  group_ids?: string[]
}

export interface AppDashboard {
  /** 仪表盘 ID */
  block_id: string
  /** 仪表盘名字 */
  name: string
}

export interface AppFeedNotify {
  /** 是否关闭通知 */
  close_notify?: boolean
  /** 自定义语音播报文本内容 */
  custom_sound_text?: string
  /** 是否播报自定义语音 */
  with_custom_sound?: boolean
}

export interface AppFieldPropertyAutoSerial {
  /** 自动编号类型 */
  type: 'custom' | 'auto_increment_number'
  /** 自动编号规则列表 */
  options?: AppFieldPropertyAutoSerialOptions[]
}

export interface AppFieldPropertyAutoSerialOptions {
  /** 自动编号的可选规则项类型 */
  type: 'system_number' | 'fixed_text' | 'created_time'
  /** 与类型相对应的取值 */
  value: string
}

export interface AppFieldPropertyLocation {
  /** 地理位置输入限制 */
  input_type: 'only_mobile' | 'not_limit'
}

export interface AppI18nInfo {
  /** 国际化语言的 key */
  i18n_key: 'zh_cn' | 'en_us' | 'ja_jp' | 'zh_hk' | 'zh_tw' | 'id_id' | 'ms_my' | 'de_de' | 'es_es' | 'fr_fr' | 'it_it' | 'pt_br' | 'vi_vn' | 'ru_ru' | 'th_th' | 'ko_kr'
  /** 应用国际化名称 */
  name?: string
  /** 应用国际化描述（副标题） */
  description?: string
  /** 帮助国际化文档链接 */
  help_use?: string
}

export interface Application {
  /** 应用的 id */
  app_id: string
  /** 应用创建者（所有者） */
  creator_id?: string
  /** 应用状态 */
  status?: 0 | 1 | 2 | 3
  /** 应用类型 */
  scene_type?: 0 | 1 | 2 | 3
  /** 付费类型 */
  payment_type?: 0 | 1
  /** 应用创建来源(目前仅Base应用返回) */
  create_source?: 'developer_console' | 'base' | 'app_engine' | 'bot_builder' | 'aily' | 'unknown'
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
  scopes?: AppScope[]
  /** 后台主页地址 */
  back_home_url?: string
  /** 应用的国际化信息列表 */
  i18n?: AppI18nInfo[]
  /** 应用主语言 */
  primary_language?: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 应用分类的国际化描述 */
  common_categories?: string[]
  /** 应用的所有者信息 */
  owner?: ApplicationOwner
  /** 移动端默认能力 */
  mobile_default_ability?: 'gadget' | 'web_app' | 'bot'
  /** PC端默认能力 */
  pc_default_ability?: 'gadget' | 'web_app' | 'bot'
}

export interface ApplicationAppContactsRange {
  /** 通讯录可见性类型 */
  contacts_scope_type?: 'equal_to_availability' | 'some' | 'all'
  /** 可用名单 */
  visible_list?: AppVisibleList
}

export interface ApplicationAppUsage {
  /** 指标名称 */
  metric_name: string
  /** 指标值 */
  metric_value: number
}

export interface ApplicationAppVersion {
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
  scopes?: AppScope[]
  /** 后台主页地址 */
  back_home_url?: string
  /** 应用的国际化信息列表 */
  i18n?: AppI18nInfo[]
  /** 应用分类的国际化描述 */
  common_categories?: string[]
  /** 应用已订阅开放平台事件列表 */
  events?: string[]
  /** 版本状态 */
  status?: 0 | 1 | 2 | 3 | 4
  /** 版本创建时间（单位：s） */
  create_time?: string
  /** 版本发布时间（单位：s） */
  publish_time?: string
  /** 当前版本下应用开启的能力 */
  ability?: AppAbility
  /** 跟随应用版本的信息 */
  remark?: AppVersionRemark
  /** 应用已订阅事件详情列表 */
  event_infos?: Event[]
}

export interface ApplicationDepartmentAppUsage {
  /** 租户内部门的唯一标识，ID值与查询参数中的department_id_type 对应。 */
  department_id?: string
  /** 应用整体使用情况。指标名称， uv：活跃用户数， total_users：累计用户数， new_users：新增用户数。 */
  app?: ApplicationAppUsage[]
  /** 小程序使用情况，没有小程序形态时为null。 */
  gadget?: ApplicationAppUsage[]
  /** 网页应用使用情况，没有网页应用形态时为null */
  webapp?: ApplicationAppUsage[]
  /** 机器人使用情况，没有机器人形态时为null */
  bot?: ApplicationAppUsage[]
}

export interface ApplicationDetailBasicInfo {
  /** 投递 ID */
  id?: string
  /** 投递的职位 ID */
  job_id?: string
  /** 投递的人才 ID */
  talent_id?: string
  /** 投递处于的阶段 */
  stage?: ApplicationStageInfo
  /** 投递活跃状态 */
  active_status?: 1 | 2
  /** 投递方式 */
  delivery_type?: 1 | 2
  /** 投递来源信息 */
  resume_source_info?: ApplicationResumeSource
  /** 官网投递来源 */
  website_resume_source?: ApplicationWebsiteResumeSource
  /** 简历附件 ID */
  talent_attachment_resume_id?: string
  /** 投递阶段变更时间列表 */
  stage_time_list?: ApplicationStageTime[]
  /** 投递入职状态 */
  onboard_status?: 1 | 2
  /** 意向投递城市列表 */
  application_preferred_city_list?: CodeNameObject[]
  /** 投递终止原因 */
  termination_reason?: TerminationReasonInfo
  /** 投递创建者 ID，仅当投递创建人为企业内部员工时可获取（如员工手动上传简历 / 加入职位 / 内推），其余情况返回为空（如候选人主动投递） */
  creator_id?: string
  /** 投递所有者 ID */
  owner_id?: string
  /** 投递终止者 ID */
  terminator_id?: string
  /** 创建时间戳（单位：毫秒） */
  create_time?: string
  /** 修改时间戳（单位：毫秒） */
  modify_time?: string
}

export interface ApplicationDetailInfo {
  /** 投递基本信息 */
  basic_info?: ApplicationDetailBasicInfo
  /** 投递职位信息 */
  job?: JobBasicInfo
  /** 投递人才信息 */
  talent?: TalentBasicInfoV2
  /** 投递评估信息 */
  evaluations?: Evaluation[]
  /** 投递面试信息 */
  interview_aggregation?: InterviewAggregation
  /** 投递 Offer 信息 */
  offer?: OfferInfoV2
  /** 投递员工入转离信息 */
  employee?: EmployeeV2
  /** 投递猎头推荐信息 */
  agency?: AgencyInfo
  /** 投递官网信息 */
  portal?: ApplicationDetailPortalInfo
  /** 投递内推信息 */
  referral?: ReferralInfoV2
}

export interface ApplicationDetailPortalInfo {
  /** 校招志愿信息 */
  campus_volunteer_info?: CampusVolumnteerInfo
}

export interface ApplicationFeedback {
  /** 应用反馈 ID，应用反馈记录唯一标识 */
  feedback_id: string
  /** 被反馈应用ID */
  app_id: string
  /** 反馈提交时间，格式为yyyy-mm-dd hh:mm:ss */
  feedback_time: string
  /** 反馈用户的租户名， 查询 isv 应用时反馈数据时返回 */
  tenant_name?: string
  /** 反馈类型 */
  feedback_type: 1 | 2
  /** 反馈处理状态 */
  status: 0 | 1 | 2 | 3
  /** 故障类型：1: 黑屏 2: 白屏 3: 无法打开小程序  4: 卡顿 5: 小程序闪退 6: 页面加载慢 7: 死机 8: 其他异常） 只在故障反馈时返回 */
  fault_type?: number[]
  /** 故障时间，格式为yyyy-mm-dd hh:mm:ss */
  fault_time?: string
  /** 反馈来源：1： 小程序 2：网页应用 3：机器人 4：webSDK */
  source?: 1 | 2 | 3 | 4
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

export interface ApplicationInfo {
  /** 离职审批发起人的雇佣 ID */
  apply_initiator_id?: string
  /** 离职申请流程发起时间 */
  apply_initiating_time?: string
  /** 离职申请流程结束时间 */
  apply_finish_time?: string
  /** 流程 ID */
  process_id?: string
}

export interface ApplicationOffer {
  /** Offer id */
  id?: string
  /** 投递id */
  application_id?: string
  /** 基础信息 */
  basic_info?: ApplicationOfferBasicInfo
  /** 薪酬计划 */
  salary_plan?: ApplicationOfferSalaryPlan
  /** 当前offer使用的schema */
  schema_id?: string
  /** Offer状态 */
  offer_status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  /** 职位信息 */
  job_info?: OfferJobInfo
  /** offer自定义模块列表 */
  customized_module_list?: ApplicationOfferCustomModule[]
  /** 招聘需求 ID */
  job_requirement_id?: string
  /** offer 发送记录列表 */
  offer_send_record_list?: OfferSendRecord[]
}

export interface ApplicationOfferBasicInfo {
  /** Offer类型 1=Social, 2=Campus, 3=Intern, 4=InternTransfer */
  offer_type?: 1 | 2 | 3 | 4
  /** 备注 */
  remark?: string
  /** Offer过期时间 */
  expire_time?: number
  /** Offer 负责人 ID */
  owner_user_id?: string
  /** Offer 创建人 ID */
  creator_user_id?: string
  /** Offer 人员类型 */
  employee_type?: BaseBilingualWithId
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
  /** 合同期(年)，推荐使用「contract_period」，如果Offer申请表中「合同期(年)」字段已停用，则不可使用该字段 */
  contract_year?: number
  /** 合同期（年/月） */
  contract_period?: ContractPeriodInfo
  /** 雇员类型 */
  recruitment_type?: BaseBilingualWithId
  /** 序列 */
  sequence?: BaseBilingualWithId
  /** 级别 */
  level?: BaseBilingualWithId
  /** 入职地点 */
  onboard_address?: BaseAddress
  /** 工作地点 */
  work_address?: BaseAddress
  /** 自定义模块的value信息 */
  customize_info_list?: ApplicationOfferCustomValue[]
  /** 岗位 ID */
  position_id?: string
  /** 入职职位 */
  job_offered?: string
}

export interface ApplicationOfferCustomModule {
  /** 自定义模块ID */
  ID?: string
  /** 自定义模块下字段的值 */
  object_list?: ApplicationOfferCustomValue[]
}

export interface ApplicationOfferCustomValue {
  /** 自定义字段ID */
  object_id?: string
  /** 自定义字段Value */
  customize_value?: string
}

export interface ApplicationOfferSalaryPlan {
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
  customize_info_list?: ApplicationOfferCustomValue[]
}

export interface ApplicationOwner {
  /** 应用所有者类型 */
  type: 0 | 1 | 2
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
  /** 客服账号，仅当商店应用配置了这种联系方式时才会返回 */
  customer_service_account?: string
}

export interface ApplicationResumeSource {
  /** 投递来源 ID */
  id?: string
  /** 投递来源名称 */
  name?: I18n
  /** 投递来源类型 */
  resume_source_type?: 10000 | 10001 | 10002 | 10003 | 10004 | 10005 | 10006 | 10007 | 10008 | 10009
}

export interface ApplicationStageInfo {
  /** 阶段id */
  id?: string
  /** 阶段中文名字 */
  zh_name?: string
  /** 英文名 */
  en_name?: string
  /** 阶段类型 */
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 255
}

export interface ApplicationStageTime {
  /** 阶段 ID */
  stage_id?: string
  /** 最近一次进入该阶段的时间 */
  enter_time?: string
  /** 最后一次离开时间，如当前在该阶段，则为空 */
  exit_time?: string
}

export interface ApplicationVisibilityDepartmentWhiteBlackInfo {
  /** 部门ID */
  department_id?: string
  /** 是否在白名单中 */
  in_white_list?: boolean
  /** 是否在黑名单中 */
  in_black_list?: boolean
}

export interface ApplicationVisibilityGroupWhiteBlackInfo {
  /** 用户组ID */
  group_id?: string
  /** 是否在白名单中 */
  in_white_list?: boolean
  /** 是否在黑名单中 */
  in_black_list?: boolean
}

export interface ApplicationVisibilityUserWhiteBlackInfo {
  /** 用户ID */
  user_id?: string
  /** 是否在白名单中 */
  in_white_list?: boolean
  /** 是否在黑名单中 */
  in_black_list?: boolean
  /** 是否在付费名单中 */
  in_paid_list?: boolean
}

export interface ApplicationWebsiteChannel {
  /** 官网推广渠道 ID */
  channel_id?: string
  /** 官网推广渠道名称 */
  channel_name?: I18n
}

export interface ApplicationWebsiteResumeSource {
  /** 官网站点 ID */
  website_id?: string
  /** 官网站点名称 */
  website_name?: I18n
  /** 推广渠道来源 */
  channel?: ApplicationWebsiteChannel
}

export interface AppRecommendRule {
  /** 推荐规则 ID */
  id?: string
  /** 推荐规则名称 */
  name?: string
  /** 推荐规则启用状态 */
  status?: 'open' | 'closed'
  /** 推荐规则可见性信息 */
  visibility_info?: AppRecommendRuleVisibilityInfo
  /** 不可移除推荐应用项列表 */
  recommend_item_infos?: AppRecommendRuleItemInfo[]
  /** 可移除推荐应用项列表 */
  distributed_recommend_item_infos?: AppRecommendRuleItemInfo[]
}

export interface AppRecommendRuleItemInfo {
  /** 推荐应用项 ID */
  item_id?: string
  /** 推荐应用项类型 */
  item_type?: 'application' | 'link'
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
  default_locale?: 'zh_cn' | 'zh_hk' | 'zh_tw' | 'en_us' | 'ja_jp'
  /** 应用项的多语种名称 */
  i18n_name?: AppRecommendRuleItemInfoI18nName
}

export interface AppRecommendRuleItemInfoI18nName {
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

export interface AppRecommendRuleVisibilityInfo {
  /** 是否全员可见 */
  is_all?: boolean
  /** 可见部门 ID 列表 */
  department_ids?: string[]
  /** 可见用户 ID 列表 */
  user_ids?: string[]
  /** 可见用户组 ID 列表 */
  group_ids?: string[]
}

export interface AppRole {
  /** 自定义权限的名字 */
  role_name: string
  /** 自定义权限的id */
  role_id?: string
  /** 数据表权限 */
  table_roles: AppRoleTableRole[]
  /** block权限 */
  block_roles?: AppRoleBlockRole[]
}

export interface AppRoleBlockRole {
  block_id: string
  /** Block权限 */
  block_perm: 0 | 1
}

export interface AppRoleMember {
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
  member_type?: 'user' | 'chat' | 'department'
}

export interface AppRoleMemberId {
  /** 协作者 ID 类型 */
  type?: 'open_id' | 'union_id' | 'user_id' | 'chat_id' | 'department_id' | 'open_department_id'
  /** 协作者 ID */
  id: string
}

export interface AppRoleTableRole {
  /** 数据表权限 */
  table_perm: 0 | 1 | 2 | 4
  /** 数据表名 */
  table_name?: string
  /** 数据表ID */
  table_id?: string
  /** 记录筛选条件，在table_perm为1或2时有意义，用于指定可编辑或可阅读某些记录 */
  rec_rule?: AppRoleTableRoleRecRule
  /** 字段权限，仅在table_perm为2时有意义，设置字段可编辑或可阅读 */
  field_perm?: Record<string, number>
  /** 新增记录权限，仅在table_perm为2时有意义，用于设置记录是否可以新增 */
  allow_add_record?: boolean
  /** 删除记录权限，仅在table_perm为2时有意义，用于设置记录是否可以删除 */
  allow_delete_record?: boolean
}

export interface AppRoleTableRoleRecRule {
  /** 记录筛选条件 */
  conditions: AppRoleTableRoleRecRuleCondition[]
  /** 多个筛选条件的关系 */
  conjunction?: 'and' | 'or'
  /** 其他记录权限，仅在table_perm为2时有效 */
  other_perm?: 0 | 1
}

export interface AppRoleTableRoleRecRuleCondition {
  /** 字段名 */
  field_name: string
  /** 运算符 */
  operator?: 'is' | 'isNot' | 'contains' | 'doesNotContain' | 'isEmpty' | 'isNotEmpty'
  /** 单选或多选字段的选项id */
  value?: string[]
}

export interface ApprovalApproverCcer {
  /** 审批节点上的审批人，1.当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时，需要在 level 中填写对应的级数，例如：由下往上三级主管审批，level = 3；2.当 type 为 Personal 时，需要根据x_user_id填写user_id，用于指定用户；3.当 approver 为 Free 发起人自选时，不需要指定 user_id ；ccer不支持 Free 发起人自选 */
  type: 'Supervisor' | 'SupervisorTopDown' | 'DepartmentManager' | 'DepartmentManagerTopDown' | 'Personal' | 'Free'
  /** 用户id，根据user_id_type填写 */
  user_id?: string
  /** 审批级数，当 type 为 Supervisor、SupervisorTopDown、DepartmentManager 、DepartmentManagerTopDown 这 4 种时，需要在 level 中填写对应的级数，例如：由下往上三级主管审批，level = 3 */
  level?: string
}

export interface ApprovalConfig {
  /** 预定审批开关，0关闭，1打开 */
  approval_switch?: number
  /** 预定审批条件，0所有预定需要审批，1满足条件需审批 */
  approval_condition?: number
  /** 超过 meeting_duration小时需要审批 */
  meeting_duration?: number
  /** 审批人列表 */
  approvers?: SubscribeUser[]
}

export interface ApprovalCreateExternal {
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

export interface ApprovalCreateViewers {
  /** 可见人类型，如果 viewer_type 是 TENANT 和 NONE,  viewer_user_id， viewer_department_id可不填 */
  viewer_type?: 'TENANT' | 'DEPARTMENT' | 'USER' | 'NONE'
  /** 当 viewer_type 是 USER，根据user_id_type填写用户id */
  viewer_user_id?: string
  /** 当 view_type 为DEPARTMENT，根据department_id_type填写部门id */
  viewer_department_id?: string
}

export interface ApprovalForm {
  /** 审批定义表单内容，json 数组 */
  form_content: string
  /** 控件之间数据条件约束表达式 */
  widget_relation?: string
}

export interface ApprovalGroup {
  /** 组织架构调整审批组 ID */
  approval_group_id?: string
  /** 组织架构调整流程 ID */
  process_id?: string
  /** 组织架构调整流程状态 */
  approval_group_status?: '0' | '1' | '2' | '3' | '4' | '5'
  /** 组织架构调整流程状态V2 */
  approval_group_status_v2?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** 调整主题 */
  topic?: string
  /** 调整原因 */
  adjust_reason?: string
  /** 生效日期 */
  effective_date?: string
  /** 发起人 */
  created_by?: string
  /** 组织架构调整任务 ID */
  draft_id?: string
  /** 组织架构调整任务状态 */
  draft_status?: '0' | '1' | '2' | '3'
  /** 关联的部门调整记录 ID 列表 */
  department_changes?: string[]
  /** 关联的人员调整记录 ID 列表 */
  job_changes?: string[]
  /** 关联的岗位调整记录 ID 列表 */
  position_changes?: string[]
}

export interface ApprovalInfo {
  /** 审批实例id */
  approval_id: string
  /** 审批类型，remedy为补卡 */
  approval_type: 'leave' | 'overtime' | 'trip' | 'out' | 'remedy'
  /** 审批状态，1为不通过，2为通过，4为撤销 */
  status: 0 | 1 | 2 | 3 | 4
}

export interface ApprovalNode {
  /** 节点 ID，开始节点的 ID 为 START，结束节点的 ID 为 END，开始和结束节点不需要指定 name、node_type 以及 approver */
  id: string
  /** 节点名称的国际化文案 Key，以 @i18n@ 开头，长度不得少于 9 个字符 */
  name?: string
  /** 审批类型枚举,当 node_type 为依次审批时，审批人必须为『发起人自选』 */
  node_type?: 'AND' | 'OR' | 'SEQUENTIAL'
  /** 审批人列表 */
  approver?: ApprovalApproverCcer[]
  /** 抄送人列表 */
  ccer?: ApprovalApproverCcer[]
  /** 表单项的控件权限 */
  privilege_field?: FieldGroup
  /** 自选审批人是否允许多选 */
  approver_chosen_multi?: boolean
  /** 自选审批人选择范围 */
  approver_chosen_range?: ApproverRange[]
  /** 审批人为提交人时的操作 */
  starter_assignee?: 'STARTER' | 'AUTO_PASS' | 'SUPERVISOR' | 'DEPARTMENT_MANAGER'
}

export interface ApprovalNodeInfo {
  /** 节点名称 */
  name: string
  /** 是否发起人自选节点 true - 发起审批时需要提交审批人 */
  need_approver: boolean
  /** 节点 ID */
  node_id: string
  /** 节点自定义 ID，如果没有设置则不返回 */
  custom_node_id?: string
  /** 审批方式 */
  node_type: 'AND' | 'OR' | 'SEQUENTIAL' | 'CC_NODE'
  /** 是否支持多选：true-支持，发起、结束节点默认为false */
  approver_chosen_multi: boolean
  /** 自选范围 */
  approver_chosen_range?: ApproverChosenRange[]
  /** 是否签名 */
  require_signature?: boolean
}

export interface ApprovalSetting {
  /** 审批实例通过后允许撤回的时间，以秒为单位，默认 31 天，0 为不可撤回 */
  revert_interval?: number
  /** 是否支持审批通过第一个节点后撤回，默认为1，0为不支持 */
  revert_option?: number
  /** 拒绝设置 */
  reject_option?: 0 | 1
  /** 快捷审批配置项，开启后可在卡片上直接审批。默认值1为启用， 0为禁用 */
  quick_approval_option?: 0 | 1
  /** 流程关闭超时配置，传true就是关闭超时配置 */
  overtime_disable?: boolean
  /** 单据未处理超时时间，单位天 */
  overtime_notice_time?: number
  /** 单据已超时后，自动关闭时间，单位天 */
  overtime_close_time?: number
  /** 单据自动关闭后，可恢复时间，单位天 */
  overtime_recover_time?: number
}

export interface ApprovalViewerInfo {
  /** 可见人类型 */
  type: 'TENANT' | 'DEPARTMENT' | 'USER' | 'ROLE' | 'USER_GROUP' | 'NONE'
  /** 在可见人类型为DEPARTMENT时，id为部门的id ；在可见人类型为USER时，id为用户的id ；在可见人类型为ROLE时，id为角色的id ；在可见人类型为USER_GROUP时，id为用户组的id */
  id?: string
  /** 在可见人类型为USER时，表示可见人用户id */
  user_id?: string
}

export interface ApproverChosenRange {
  /** 指定范围：0-all，1-指定角色，2-指定人员 */
  approver_range_type?: 0 | 1 | 2
  /** 根据上面的type，分别存放角色id与userid，type为0时本字段为空列表 */
  approver_range_ids?: string[]
}

export interface ApproverInfo {
  /** 审批任务id */
  approver_id?: string
  /** 流程id */
  process_id?: string
  /** 任务状态 */
  approver_status?: -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 12 | 14 | 16
}

export interface ApproverRange {
  /** 审批人类型 */
  type?: 'ALL' | 'PERSONAL' | 'ROLE'
  /** 审批人id */
  id_list?: string[]
}

export interface AppScope {
  /** 应用权限 */
  scope: string
  /** 应用权限的国际化描述 */
  description?: string
  /** 权限等级描述 */
  level?: 1 | 2 | 3 | 0
  /** 返回用户身份类型user、应用身份类型tenant。如果两种类型都支持，则同时返回两个。 */
  token_types?: string[]
}

export interface AppTable {
  /** 表格Id */
  table_id?: string
  /** 数据表 版本号 */
  revision?: number
  /** 数据表 名字 */
  name?: string
}

export interface AppTableCreateHeader {
  /** 字段名 */
  field_name: string
  /** 字段类型 */
  type: 1 | 2 | 3 | 4 | 5 | 7 | 11 | 13 | 15 | 17 | 18 | 20 | 21 | 22 | 23 | 1001 | 1002 | 1003 | 1004 | 1005
  /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: 'Text' | 'Barcode' | 'Number' | 'Progress' | 'Currency' | 'Rating' | 'SingleSelect' | 'MultiSelect' | 'DateTime' | 'Checkbox' | 'User' | 'GroupChat' | 'Phone' | 'Url' | 'Attachment' | 'SingleLink' | 'Formula' | 'DuplexLink' | 'Location' | 'CreatedTime' | 'ModifiedTime' | 'CreatedUser' | 'ModifiedUser' | 'AutoNumber'
  /** 字段属性 */
  property?: AppTableFieldProperty
  /** 字段的描述 */
  description?: AppTableFieldDescription
}

export interface AppTableField {
  /** 字段名 */
  field_name: string
  /** 字段类型 */
  type: 1 | 2 | 3 | 4 | 5 | 7 | 11 | 13 | 15 | 17 | 18 | 20 | 21 | 22 | 23 | 1001 | 1002 | 1003 | 1004 | 1005
  /** 字段属性 */
  property?: AppTableFieldProperty
  /** 字段的描述 */
  description?: AppTableFieldDescription
  /** 是否是索引列 */
  is_primary?: boolean
  /** 字段Id */
  field_id?: string
  /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: 'Text' | 'Email' | 'Barcode' | 'Number' | 'Progress' | 'Currency' | 'Rating' | 'SingleSelect' | 'MultiSelect' | 'DateTime' | 'Checkbox' | 'User' | 'GroupChat' | 'Phone' | 'Url' | 'Attachment' | 'SingleLink' | 'Formula' | 'DuplexLink' | 'Location' | 'CreatedTime' | 'ModifiedTime' | 'CreatedUser' | 'ModifiedUser' | 'AutoNumber'
  /** 是否是隐藏字段 */
  is_hidden?: boolean
}

export interface AppTableFieldDescription {
  /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述 */
  disable_sync?: boolean
  /** 字段描述内容，支持换行\n */
  text?: string
}

export interface AppTableFieldForList {
  /** 字段名 */
  field_name: string
  /** 字段类型 */
  type: 1 | 2 | 3 | 4 | 5 | 7 | 11 | 13 | 15 | 17 | 18 | 20 | 21 | 22 | 23 | 1001 | 1002 | 1003 | 1004 | 1005
  /** 字段属性 */
  property?: AppTableFieldProperty
  /** 字段的描述, text_field_as_array为false时值为字符串，为true则是对象数组 */
  description?: unknown
  /** 是否是索引列 */
  is_primary?: boolean
  /** 字段Id */
  field_id?: string
  /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: 'Text' | 'Barcode' | 'Number' | 'Progress' | 'Currency' | 'Rating' | 'SingleSelect' | 'MultiSelect' | 'DateTime' | 'Checkbox' | 'User' | 'GroupChat' | 'Phone' | 'Url' | 'Attachment' | 'SingleLink' | 'Formula' | 'DuplexLink' | 'Location' | 'CreatedTime' | 'ModifiedTime' | 'CreatedUser' | 'ModifiedUser' | 'AutoNumber'
  /** 是否是隐藏字段 */
  is_hidden?: boolean
}

export interface AppTableFieldProperty {
  /** 单选、多选字段的选项信息 */
  options?: AppTableFieldPropertyOption[]
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
  auto_serial?: AppFieldPropertyAutoSerial
  /** 地理位置输入方式 */
  location?: AppFieldPropertyLocation
  /** 公式字段的表达式 */
  formula_expression?: string
  /** 字段支持的编辑模式 */
  allowed_edit_modes?: AllowedEditModes
  /** 进度、评分等字段的数据范围最小值 */
  min?: number
  /** 进度、评分等字段的数据范围最大值 */
  max?: number
  /** 进度等字段是否支持自定义范围 */
  range_customize?: boolean
  /** 货币币种 */
  currency_code?: string
  /** 评分字段的相关设置 */
  rating?: Rating
  /** 公式字段数据类型 */
  type?: AppTableFieldPropertyType
}

export interface AppTableFieldPropertyOption {
  /** 选项名 */
  name?: string
  /** 选项id */
  id?: string
  /** 选项颜色 */
  color?: number
}

export interface AppTableFieldPropertyType {
  /** 公式字段对应的数据类型 */
  data_type: 1 | 2 | 3 | 4 | 5 | 7 | 11 | 13 | 15 | 17 | 18 | 20 | 21 | 22 | 23 | 1001 | 1002 | 1003 | 1004 | 1005
  /** 公式数据属性 */
  ui_property?: AppTableFieldPropertyTypeUiProperty
  /** 公式字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
  ui_type?: 'Number' | 'Progress' | 'Currency' | 'Rating' | 'DateTime'
}

export interface AppTableFieldPropertyTypeUiProperty {
  /** 货币币种 */
  currency_code?: string
  /** 数字、公式字段的显示格式 */
  formatter?: string
  /** 进度等字段是否支持自定义范围 */
  range_customize?: boolean
  /** 进度、评分等字段的数据范围最小值 */
  min?: number
  /** 进度、评分等字段的数据范围最大值 */
  max?: number
  /** 日期、创建时间、最后更新时间字段的显示格式 */
  date_formatter?: string
  /** 评分字段的相关设置 */
  rating?: Rating
}

export interface AppTableForm {
  /** 表单名称 */
  name?: string
  /** 表单描述 */
  description?: string
  /** 是否开启共享 */
  shared?: boolean
  /** 分享 URL */
  shared_url?: string
  /** 分享范围限制 */
  shared_limit?: 'off' | 'tenant_editable' | 'anyone_editable'
  /** 填写次数限制一次 */
  submit_limit_once?: boolean
}

export interface AppTableFormField {
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

export interface AppTableFormPatchedField {
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

export interface AppTableRecord {
  /** 记录字段 */
  fields: Record<string, unknown>
  /** 记录Id */
  record_id?: string
  /** 创建人 */
  created_by?: Person
  /** 创建时间 */
  created_time?: number
  /** 修改人 */
  last_modified_by?: Person
  /** 最近更新时间 */
  last_modified_time?: number
  /** 记录分享链接(批量获取记录接口将返回该字段) */
  shared_url?: string
  /** 记录链接(检索记录接口将返回该字段) */
  record_url?: string
}

export interface AppTableView {
  /** 视图Id */
  view_id?: string
  /** 视图名字 */
  view_name?: string
  /** 视图类型 */
  view_type?: string
}

export interface AppTableViewProperty {
  /** 过滤条件 */
  filter_info?: AppTableViewPropertyFilterInfo
  /** 隐藏字段ID列表 */
  hidden_fields?: string[]
  /** 表格视图层级结构设置 */
  hierarchy_config?: AppTableViewPropertyHierarchyConfig
}

export interface AppTableViewPropertyFilterInfo {
  /** 多个筛选条件的关系 */
  conjunction: 'and' | 'or'
  /** 筛选条件 */
  conditions: AppTableViewPropertyFilterInfoCondition[]
}

export interface AppTableViewPropertyFilterInfoCondition {
  /** 用于过滤的字段唯一ID */
  field_id: string
  /** 过滤操作的类型 */
  operator: 'is' | 'isNot' | 'contains' | 'doesNotContain' | 'isEmpty' | 'isNotEmpty' | 'isGreater' | 'isGreaterEqual' | 'isLess' | 'isLessEqual'
  /** 筛选值 */
  value?: string
}

export interface AppTableViewPropertyHierarchyConfig {
  /** 层级结构的关联列id */
  field_id?: string
}

export interface AppVersionRemark {
  /** 备注说明 */
  remark?: string
  /** 更新说明 */
  update_remark?: string
  /** 可见性名单 */
  visibility?: AppVisibility
}

export interface AppVisibility {
  /** 是否全员可见 */
  is_all?: boolean
  /** 可见名单 */
  visible_list?: AppVisibleList
  /** 不可见名单 */
  invisible_list?: AppVisibleList
}

export interface AppVisibilityIdList {
  /** 成员id列表(open_id/union_id/user_id) */
  user_ids?: string[]
  /** 部门id列表(自定义部门id/open_department_id) */
  department_ids?: string[]
  /** 用户组id */
  group_ids?: string[]
}

export interface AppVisibleList {
  /** 可见性成员 open_id 列表 */
  open_ids?: string[]
  /** 可见性部门的 id 列表 */
  department_ids?: string[]
  /** 可见性成员 group_id 列表 */
  group_ids?: string[]
}

export interface AppWorkflow {
  /** 自动化工作流的id */
  workflow_id: string
  /** 自动化工作流的状态 */
  status?: string
  /** 自动化工作流的名称 */
  title?: string
}

export interface ArchiveDetail {
  /** 员工ID */
  user_id: string
  /** 档案ID */
  id: string
  /** 档案TID */
  tid: string
  /** 关联方案ID，详细信息可以通过[批量查询薪资方案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list)接口查询获得 */
  plan_id: string
  /** 关联方案TID，详细信息可以通过[批量查询薪资方案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list)接口查询获得 */
  plan_tid: string
  /** 档案币种ID，详细信息可以通过[查询货币信息v2](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-currency/search)接口查询获得 */
  currency_id?: string
  /** 调薪原因ID，详细信息可以通过[批量查询定调薪原因](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/change_reason/list)接口查询获得 */
  change_reason_id: string
  /** 调薪说明 */
  change_description: string
  /** 生效时间 */
  effective_date: string
  /** 失效时间 */
  expiration_date?: string
  /** 薪级薪等ID */
  salary_level_id?: string
  /** 档案关联的薪资项 */
  archive_items: ArchiveItem[]
  /** 档案关联的薪资指标 */
  archive_indicators: ArchiveIndicator[]
}

export interface ArchiveField {
  /** 字段编号 */
  code?: string
  /** 字段名称 */
  title?: string
  /** 一级表头名字 */
  upper_titles?: string[]
}

export interface ArchiveFieldData {
  /** 字段编码(查询归档报表表头返回) */
  code: string
  /** 字段结果值 */
  value?: string
}

export interface ArchiveIndicator {
  /** 薪资统计指标ID，详细信息可以通过[批量查询薪资统计指标](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/indicator/list)接口查询获得 */
  indicator_id: string
  /** 档案关联薪资统计指标数值 */
  indicator_result: string
  /** 档案关联薪资统计指标转正后数值 */
  indicator_result_regular?: string
}

export interface ArchiveItem {
  /** 薪酬项ID，详细信息可以通过[批量查询薪资项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item/list)接口查询获得 */
  item_id: string
  /** 档案关联薪酬项数值 */
  item_result: string
  /** 档案关联薪酬项转正后数值 */
  item_result_regular?: string
}

export interface ArchiveReportData {
  /** 用户ID */
  member_id: string
  /** 考勤开始时间 */
  start_time: string
  /** 考勤结束时间 */
  end_time: string
  /** 字段结果(不超过200个) */
  field_datas?: ArchiveFieldData[]
}

export interface ArchiveReportMeta {
  /** 引用报表 ID */
  report_id?: string
  /** 引用报表name */
  report_name?: I18nMap
  /** 归档报表规则id */
  archive_rule_id?: string
  /** 归档报表name */
  archive_rule_name?: I18nMap
}

export interface Assessment {
  /** 考核结果 ID */
  assessment_id?: string
  /** 考核状态 */
  assessment_status?: Enum
  /** 试用期考核结果 */
  assessment_result?: Enum
  /** 考核得分 */
  assessment_score?: number
  /** 试用期考核等级 */
  assessment_grade?: Enum
  /** 考核评语 */
  assessment_comment?: string
  /** 考核结果页面超链接 */
  assessment_detail?: string
  /** 是否为最终考核结果 */
  is_final_asssessment?: boolean
}

export interface AssessmentForCreate {
  /** 考核状态 */
  assessment_status: 'not_started' | 'in_process' | 'completed' | 'no_need'
  /** 试用期考核结果 */
  assessment_result?: 'approved' | 'rejected'
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

export interface Assets {
  /** 已确认的奖励 */
  confirmed_bonus?: BonusAmount
}

export interface AssignedOrganization {
  /** 管理对象key */
  org_key: string
  /** 管理对象名称 */
  org_name?: Name
  /** 管理对象id列表 */
  org_id_list: string[]
}

export interface AssignedOrganizationWithCode {
  /** 管理对象key */
  org_key: string
  /** 管理对象id列表 */
  org_ids?: string[]
  /** 管理对象code列表 */
  org_codes?: string[]
}

export interface Attachment {
  /** 附件token */
  file_token?: string
}

export interface AttachmentDownloadUrlItem {
  /** 附件 id */
  attachment_id?: string
  /** 下载链接 */
  download_url?: string
}

export interface AttachmentInfo {
  /** 附件id */
  id?: string
  /** 附件的url */
  url?: string
  /** 附件文件名 */
  name?: string
  /** 媒体类型/MIME */
  mime?: string
  /** 附件创建时间（单位ms） */
  create_time?: string
}

export interface AuditAndroidContext {
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

export interface AuditContext {
  /** 终端类型 */
  terminal_type?: 0 | 1 | 2 | 3
  /** ios的环境信息 */
  ios_context?: AuditIosContext
  /** pc的环境信息 */
  pc_context?: AuditPcContext
  /** web的环境信息 */
  web_context?: AuditWebContext
  /** android的环境信息 */
  android_context?: AuditAndroidContext
}

export interface AuditDetail {
  /** mac地址 */
  mc?: string
  /** 设备模型 */
  device_model?: string
  /** 操作系统 */
  os?: string
  /** ip属地 */
  city?: string
}

export interface AuditEventExtend {
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

export interface AuditInfo {
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
  operator_type?: 0 | 1
  /** 操作人id */
  operator_value?: string
  /** 操作对象列表 */
  objects?: AuditObjectEntity[]
  /** 接收者对象列表 */
  recipients?: AuditRecipientEntity[]
  /** 事件时间 */
  event_time?: number
  /** ip信息 */
  ip?: string
  /** 第三方isvID */
  operator_app?: string
  /** 环境信息 */
  audit_context?: AuditContext
  /** 事件级别的扩展 */
  extend?: AuditEventExtend
  /** 第三方isv名称 */
  operator_app_name?: string
  /** 扩展字段信息 */
  common_drawers?: ApiAuditCommonDrawers
  /** 日志扩展信息 */
  audit_detail?: AuditDetail
  /** 操作人企业编号 */
  operator_tenant?: string
  /** 操作人详情 */
  operator_detail?: OperatorDetail
}

export interface AuditIosContext {
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

export interface AuditLogDetail {
  /** 审计日志ID */
  log_id?: string
  /** 日志基础信息 */
  basic_info?: BasicInfo
  /** 审计日志操作信息 */
  op_info?: AuditLogOpInfo
  /** 登录类型信息 */
  login_info?: AuditLogLoginInfo
  /** 设备信息 */
  device_info?: AuditLogDeviceInfo
  /** 网络信息 */
  net_info?: AuditLogNetInfo
}

export interface AuditLogDeviceInfo {
  /** 设备ID */
  device_id?: string
  /** web端设备ID */
  web_device_id?: string
  /** 终端类型：13002-PC类型；13003-Web类型 */
  terminal_type?: string
  /** 系统类型：14002-window；14001-未知 */
  os_type?: string
  /** 系统版本 */
  os_version?: string
}

export interface AuditLogEsField {
  /** 审计日志ID */
  log_id?: string
  /** 操作时间 */
  op_time?: string
  /** 日志类型:10000-全部类型;10001-企业管理; 10002-登录日志;10003-应用管理 */
  log_type?: string
  /** 操作人 */
  operator?: LookupWithAvatar
  /** 是否为外部用户,true代表是外部用户 */
  outsider?: boolean
  /** 登录类型:11001-飞书登录;11003-账号密码登录 */
  login_type?: string
  /** 飞书租户ID */
  lark_tenant_id?: string
  /** apaas租户ID */
  apaas_tenant_id?: string
  /** 用户地理信息 */
  user_geo?: string
  /** 客户端IP */
  client_ip?: string
  /** IP位置 */
  ip_loc?: string
  /** IP提供商 */
  ip_provider?: string
  /** 引用页面 */
  referer?: string
  /** 源页面 */
  origin?: string
  /** 路由路径 */
  api_path?: string
  /** 网关路径 */
  full_path?: string
  /** 用户代理 */
  user_agent?: string
  /** 设备ID */
  device_id?: string
  /** web端设备ID */
  web_device_id?: string
  /** 终端类型:13002-PC类型;13003-Web类型 */
  terminal_type?: string
  /** 系统类型:14002-window;14001-未知 */
  os_type?: string
  /** 系统版本 */
  os_version?: string
  /** 功能模块 */
  module?: string
  /** 数据对象 */
  data_object?: string
  /** 审计域:15001-企业管理后台;15002-应用管理后 台;15003-应用开发平台 */
  audit_scope?: string
  /** 租户ID */
  tenant_id?: string
  /** 应用唯一标识 */
  namespace?: string
  /** 环境类型:16001-沙箱环境;16003-线上环境 */
  env_type?: string
  /** 事件类型 */
  op_type?: string
  /** 操作详情内容 */
  op_detail?: I18nText
  /** 操作源:20001-前端;20004-openapi */
  op_source?: string
  /** 操作状态:18001-成功;18002-失败 */
  status?: string
  /** 失败原因 */
  failed_reason_i18n?: I18nText
  /** 数据变化(旧值和新值) */
  data_changes?: string[]
  /** 应用名称 */
  app_name?: I18nText
  /** 应用版本号 */
  keyword_field_app_version?: string
  /** 审计日志事件子模块 */
  keyword_field_functional_sub_module?: string
}

export interface AuditLogLoginInfo {
  /** 登录类型：11001-飞书登录；11003-账号密码登录 */
  login_type?: string
}

export interface AuditLogNetInfo {
  /** 客户端IP */
  client_ip?: string
  /** IP位置 */
  ip_loc?: string
  /** IP提供商 */
  ip_provider?: string
  /** 引用页面 */
  referer?: string
  /** 源页面 */
  origin?: string
  /** 用户代理 */
  user_agent?: string
}

export interface AuditLogOpInfo {
  /** 操作人 */
  operator?: LookupWithAvatar
  /** 是否为外部用户，true代表是外部用户 */
  outsider?: boolean
  /** 操作详情内容 */
  op_detail?: I18nText
  /** 操作状态：18001-成功；18002-失败 */
  status?: string
  /** 失败原因 */
  failed_reason?: string
  /** 多语类型失败原因 */
  failed_reason_i18n?: I18nText
  /** 操作时间 */
  op_time?: string
  /** 数据对象 */
  data_object?: string
  /** 操作源：20001-前端；20004-openapi */
  op_source?: string
  /** 数据变化(旧值和新值) */
  data_changes?: string[]
}

export interface AuditObjectDetail {
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

export interface AuditObjectEntity {
  /** 操作对象类型 */
  object_type?: string
  /** 操作对象值，可能存在department_id、user_id等，需要进行lark_id的转换 */
  object_value?: string
  /** 操作对象名称，如会话名、文档名等 */
  object_name?: string
  /** 操作对象的所有者 */
  object_owner?: string
  /** object 详情 */
  object_detail?: AuditObjectDetail
}

export interface AuditPcContext {
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

export interface AuditRecipientDetail {
  /** 修改权限协作者 */
  permission_action_type?: string
}

export interface AuditRecipientEntity {
  /** 接收者对象类型 */
  recipient_type?: string
  /** 接收者对象值，可能存在department_id、user_id等，需要进行lark_id的转换 */
  recipient_value?: string
  /** recipient 详情 */
  recipient_detail?: AuditRecipientDetail
}

export interface AuditWebContext {
  /** UA信息 */
  user_agent?: string
  /** 本机IP */
  IP?: string
}

export interface Avatar {
  /** 企业头像 */
  avatar_origin?: string
  /** 企业头像 72x72 */
  avatar_72?: string
  /** 企业头像 240x240 */
  avatar_240?: string
  /** 企业头像 640x640 */
  avatar_640?: string
}

export interface AvatarInfo {
  /** 72*72像素头像链接 */
  avatar_72?: string
  /** 240*240像素头像链接 */
  avatar_240?: string
  /** 640*640像素头像链接 */
  avatar_640?: string
  /** 原始头像链接 */
  avatar_origin?: string
}

export interface BackgroundCheckCustomFieldDataValue {
  /** 对应模板字段的Key */
  key?: string
  /** 对应模板字段的value */
  value?: string
}

export interface BackgroundCheckItemInfo {
  /** 附加项的ID */
  id?: string
  /** 附加项的名称 */
  name?: string
}

export interface BackgroundCheckOrder {
  /** 背调 ID */
  order_id?: string
  /** 投递 ID */
  application_id?: string
  /** 背调状态 */
  order_status?: 2 | 3 | 4
  /** 供应商类型 */
  account_third_type?: 1 | 2 | 3 | 127
  /** 背调套餐 */
  package?: string
  /** 背调名称（仅手动录入的背调结果具有） */
  name?: string
  /** 背调报告信息列表 */
  feedback_info_list?: BackgroundCheckOrderFeedbackInfo[]
  /** 进度 */
  process_info_list?: BackgroundCheckOrderProcessInfo[]
  /** 录入时间（仅手动录入的背调结果具有） */
  upload_time?: string
  /** 候选人信息 */
  candidate_info?: UserContactInfo
  /** 背调发起人信息 */
  creator_info?: BackgroundCheckOrderCreator
  /** 背调联系人信息 */
  contactor_info?: UserContactInfo
  /** 背调发起时间 */
  begin_time?: string
  /** 背调结束时间 */
  end_time?: string
  /** 背调结论 */
  conclusion?: string
  /** 供应商信息 */
  provider_info?: ProviderIdNameObject
  /** 自定义字段模板 */
  custom_field_list?: EcoBackgroundCheckCustomFieldData[]
  /** 自定义字段值 */
  custom_data_list?: BackgroundCheckCustomFieldDataValue[]
  /** 背调调查附加项 */
  ext_item_info_list?: BackgroundCheckItemInfo[]
  /** 订单更新时间 */
  update_time?: string
  /** 属地 */
  geo?: 'cn' | 'sg' | 'us' | 'jp'
  /** 国家城市编码 */
  location_code?: string
  /** 备注 */
  remark?: string
}

export interface BackgroundCheckOrderCreator {
  /** 创建人ID */
  user_id?: string
}

export interface BackgroundCheckOrderFeedbackInfo {
  /** 背调报告ID */
  id?: string
  /** 背调信息附件下载链接 */
  attachment_url?: string
  /** 背调信息附件预览链接 */
  report_preview_url?: string
  /** 背调结果：红灯、黄灯、绿灯 */
  result?: string
  /** 报告类型 */
  report_type?: 1 | 2
  /** 创建时间 */
  create_time?: string
  /** 报告名称 */
  report_name?: string
}

export interface BackgroundCheckOrderProcessInfo {
  /** 背调进度 */
  process?: string
  /** 进度更新时间 */
  update_time?: string
  /** 英文背调进度 */
  en_process?: string
}

export interface Badge {
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
  i18n_name?: I18n
  /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
  i18n_explanation?: I18n
}

export interface BaikeImage {
  /** 通过文件接口上传后的图片 token */
  token: string
}

export interface Bank {
  /** 银行 ID */
  bank_id?: string
  /** 银行名称 */
  bank_name?: I18n[]
  /** 总行代码 */
  bank_code?: string
  /** 国家/地区 ID，可通过[查询国家/地区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口查询 */
  country_region_id?: string
  /** 状态 */
  status?: 1 | 0
  /** 创建时间 */
  create_time?: string
  /** 更新时间 */
  update_time?: string
}

export interface BankAccount {
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
  bank_account_usage?: Enum[]
  /** 银行卡类型，枚举值可通过文档【飞书人事枚举常量】银行卡类型（Bank Account Type）枚举定义部分获得 */
  bank_account_type?: Enum
  /** 分配方式，枚举值可通过文档【飞书人事枚举常量】分配方式（Payment Type）枚举定义部分获得 */
  payment_type?: Enum
  /** 分配比例 */
  payment_rate?: string
  /** 分配金额 */
  payment_amount?: string
  /** 分配优先级 */
  priority?: number
  /** 货币id */
  currency_id?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface BankAccountForUpdate {
  /** 银行名称：- 当填入 bank_id 时，自动填入 bank 的名称 - 未填入 bank_id ，取传入的银行名称 */
  bank_name?: string
  /** 支行名称，仅当支行为手动输入时该字段才需要填入 */
  branch_name?: string
  /** 银行账号 */
  bank_account_number: string
  /** 开户人姓名 */
  account_holder: string
  /** 国家/地区 ID，详细信息可通过【查询国家/地区信息】接口查询获得 */
  country_region_id?: string
  /** 银行卡用途，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可：- object_api_name = "bank_account" - custom_api_name = "bank_account_usage" */
  bank_account_usages?: string[]
  /** 银行卡类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可：- object_api_name = "bank_account" - custom_api_name = "bank_account_type" */
  bank_account_type?: string
}

export interface BankBranch {
  /** 支行 ID */
  bank_branch_id?: string
  /** 支行名称 */
  bank_branch_name?: I18n[]
  /** 所属银行 ID，可通过[查询银行信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search)接口查询 */
  bank_id?: string
  /** 金融分支机构编码（联行号） */
  code?: string
  /** SWIFT 银行代码（ISO 9362） */
  swift_code?: string
  /** 状态 */
  status?: 1 | 0
  /** Bank Branch Code（特定国家地区汇款使用的编码，如美国银行的 ABA Number、澳大利亚银行的 BSB Code、英国银行的 Sort Code） */
  bank_branch_code?: string
  /** 注册地址 */
  register_place?: string
  /** 银行地址 */
  bank_address?: string
  /** 创建时间 */
  create_time?: string
  /** 更新时间 */
  update_time?: string
}

export interface BankCard {
  /** 识别出的实体类型 */
  entities?: BankCardEntity[]
}

export interface BankCardEntity {
  /** 识别的字段种类 */
  type?: 'card_number' | 'date_of_expiry'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface BankEntity {
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

export interface BankInfo {
  /** 甲乙方信息类型 */
  bank_type?: 'buy_bank' | 'sell_bank' | 'third_bank' | 'unceratin_bank'
  /** 值 */
  value?: BankEntity
}

export interface BaseAddress {
  /** ID */
  id?: string
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
  /** 区域信息 */
  district?: BaseDistrict
  /** 城市信息 */
  city?: BaseCity
  /** 省信息 */
  state?: BaseCity
  /** 国家信息 */
  country?: BaseCountry
}

export interface BaseAddressV2 {
  /** ID */
  id?: string
  /** 名称 */
  name?: I18n
  /** 区域信息 */
  district?: BaseLocation
  /** 城市信息 */
  city?: BaseLocation
  /** 省信息 */
  state?: BaseLocation
  /** 国家信息 */
  country?: BaseLocation
}

export interface BaseBilingualWithId {
  /** ID */
  id?: string
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
}

export interface BaseCity {
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
  /** 编码 */
  code?: string
  /** 地址类型 1=COUNTRY, 2=STATE, 3=CITY, 4=DISTRICT, 5=ADDRESS, */
  location_type?: 1 | 2 | 3 | 4 | 5
}

export interface BaseCountry {
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
  /** 编码 */
  code?: string
  /** 地址类型 1=COUNTRY, 2=STATE, 3=CITY, 4=DISTRICT, 5=ADDRESS, */
  location_type?: 1 | 2 | 3 | 4 | 5
}

export interface BaseDistrict {
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
  /** 编码 */
  code?: string
  /** 地址类型 1=COUNTRY, 2=STATE, 3=CITY, 4=DISTRICT, 5=ADDRESS, */
  location_type?: number
}

export interface BaseLocation {
  /** 名称 */
  name?: I18n
  /** 编码 */
  code?: string
  /** 地址类型 1=COUNTRY, 2=STATE, 3=CITY, 4=DISTRICT, 5=ADDRESS, */
  location_type?: 1 | 2 | 3 | 4 | 5
}

export interface BaseMember {
  /** 协作者ID类型 */
  member_type: 'email' | 'openid' | 'unionid' | 'openchat' | 'opendepartmentid' | 'userid' | 'groupid' | 'wikispaceid'
  /** 协作者ID，与协作者ID类型需要对应 */
  member_id: string
  /** 协作者的权限角色 */
  perm: 'view' | 'edit' | 'full_access'
  /** 协作者的权限角色类型 */
  perm_type?: 'container' | 'single_page'
  /** 协作者类型 */
  type?: 'user' | 'chat' | 'department' | 'group' | 'wiki_space_member' | 'wiki_space_viewer' | 'wiki_space_editor'
}

export interface BasicDepartmentInfo {
  /** 部门 ID */
  id?: string
  /** 部门名称 */
  name?: I18n
}

export interface BasicInfo {
  /** 日志类型：10000-全部类型；10001-企业管理；10002-登录日志；10003-应用管理 */
  log_type?: string
  /** 审计域：15001-企业管理后台；15002-应用管理后台；15003-应用开发平台 */
  audit_scope?: string
  /** 环境类型：16001-沙箱环境；16003-线上环境 */
  env_type?: string
  /** 应用id */
  app_id?: string
  /** 审计日志功能模块 */
  module?: string
  /** 事件类型 */
  op_type?: string
  /** 应用名称 */
  app_name?: I18nText
}

export interface BasicInfoUpdate {
  /** 姓名,该值是一个list，会全量更新 */
  names?: NameForUpdate[]
  /** 电话,该值是一个list，会全量更新 */
  phones?: PhoneForUpdate[]
  /** 邮箱,该值是一个list，会全量更新 */
  emails?: EmailForUpdate[]
  /** 国籍 */
  nationality_v2_id?: string
  /** 其他国籍 */
  additional_nationality_id_list?: string[]
  /** 纳税身份信息,该值是一个list，会全量更新 */
  resident_tax_list?: ResidentTaxForUpdate[]
  /** 出生国家/地区 */
  born_country_region?: string
  /** 是否残疾 */
  is_disabled?: boolean
  /** 残疾证号 */
  disable_card_number?: string
  /** 是否孤老 */
  is_old_alone?: boolean
  /** 是否烈属 */
  is_martyr_family?: boolean
  /** 烈属证号 */
  martyr_card_number?: string
  /** 家庭成员 */
  dependent_list?: DependentForUpdate[]
  /** 宗教信仰 */
  religion?: string
  /** 银行账号 */
  bank_account_list?: BankAccountForUpdate[]
  /** 证件账号 */
  national_id_list?: NationalIdForUpdate[]
  /** 个人资料 */
  personal_profile_list?: PersonalProfileForUpdate[]
  /** 紧急联系人 */
  emergency_contact_list?: EmergencyContactForUpdate[]
  /** 联系地址 */
  address_list?: AddressForUpdate[]
  /** 婚姻状况 */
  marital_status?: string
  /** 民族 / 种族 */
  ethnicity_race?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 籍贯 */
  native_region?: string
  /** 户口类型 */
  hukou_type?: string
  /** 户口所在地 */
  hukou_location?: string
}

export interface BasicUserInfo {
  /** 用户 ID */
  id?: string
  /** 用户名称 */
  name?: I18n
}

export interface BatchMessageReadUser {
  /** 已读人数 */
  read_count: string
  /** 总人数 */
  total_count: string
}

export interface BatchMessageRecallProgress {
  /** 该条批量消息是否被执行过撤回操作 */
  recall?: boolean
  /** 已经成功撤回的消息数量 */
  recall_count?: number
}

export interface BatchMessageSendProgress {
  /** 批量请求中有效的userid数量(包含机器人不可见用户) */
  valid_user_ids_count?: number
  /** 已经成功给用户发送成功的消息数量 */
  success_user_ids_count?: number
  /** 已读信息用户数量 */
  read_user_ids_count?: number
}

export interface Bitable {
  /** 多维表格文档 Token。格式为 {BitableToken}_{TableID}，其中 BitableToken 是一篇多维表格的唯一标识，TableID 是一张数据表的唯一标识，使用时请注意拆分。 */
  token?: string
}

export interface Block {
  /** Block 唯一标识 */
  block_id?: string
  /** block 的父亲 id */
  parent_id?: string
  /** block 的孩子 id 列表 */
  children?: string[]
  /** block 类型 */
  block_type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 999
  /** 文档 Block */
  page?: Text
  /** 文本 Block */
  text?: Text
  /** 一级标题 Block */
  heading1?: Text
  /** 二级标题 Block */
  heading2?: Text
  /** 三级标题 Block */
  heading3?: Text
  /** 四级标题 Block */
  heading4?: Text
  /** 五级标题 Block */
  heading5?: Text
  /** 六级标题 Block */
  heading6?: Text
  /** 七级标题 Block */
  heading7?: Text
  /** 八级标题 Block */
  heading8?: Text
  /** 九级标题 Block */
  heading9?: Text
  /** 无序列表 Block */
  bullet?: Text
  /** 有序列表 Block */
  ordered?: Text
  /** 代码块 Block */
  code?: Text
  /** 引用 Block */
  quote?: Text
  /** 公式 Block */
  equation?: Text
  /** 任务 Block */
  todo?: Text
  /** 多维表格 Block */
  bitable?: Bitable
  /** 高亮块 Block */
  callout?: Callout
  /** 群聊卡片 Block */
  chat_card?: ChatCard
  /** 流程图/UML Block */
  diagram?: Diagram
  /** 分割线 Block */
  divider?: Divider
  /** 文件 Block */
  file?: File
  /** 分栏 Block */
  grid?: Grid
  /** 分栏列 Block */
  grid_column?: GridColumn
  /** 内嵌 Block */
  iframe?: Iframe
  /** 图片 Block */
  image?: Image
  /** 三方 Block */
  isv?: Isv
  /** Add-ons */
  add_ons?: AddOns
  /** 思维笔记 Block */
  mindnote?: Mindnote
  /** 电子表格 Block */
  sheet?: Sheet
  /** 表格 Block */
  table?: Table
  /** 单元格 Block */
  table_cell?: TableCell
  /** 视图 Block */
  view?: View
  /** 未支持 Block */
  undefined?: Undefined
  /** 引用容器 Block */
  quote_container?: QuoteContainer
  /** 任务 Block */
  task?: Task
  /** OKR Block */
  okr?: Okr
  /** OKR Objective */
  okr_objective?: OkrObjective
  /** OKR Key Result */
  okr_key_result?: OkrKeyResult
  /** OKR 进展信息 */
  okr_progress?: OkrProgress
  /** 评论 id 列表 */
  comment_ids?: string[]
  /** Jira Issue */
  jira_issue?: JiraIssue
  /** Wiki 子目录 Block */
  wiki_catalog?: WikiCatalog
  /** 画板 Block */
  board?: Board
  /** 议程 Block */
  agenda?: Agenda
  /** 议程项 Block */
  agenda_item?: AgendaItem
  /** 议程项标题 Block */
  agenda_item_title?: AgendaItemTitle
  /** 议程项内容 Block */
  agenda_item_content?: AgendaItemContent
  /** 链接预览 Block */
  link_preview?: LinkPreview
}

export interface BlockAccessData {
  /** 时间,精确到天,格式yyyy-MM-dd */
  date?: string
  /** 小组件id */
  block_id?: string
  /** block访问数据信息。 */
  access_data?: AccessData
}

export interface BlockI18nInfo {
  /** 国际化语言的 key */
  i18n_key?: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 名称 */
  name?: string
}

export interface BlockIdRelation {
  /** 用户传入的临时 BlockID */
  temporary_block_id?: string
  /** 真实使用的 BlockID */
  block_id?: string
}

export interface BlockRole {
  /** Block ID */
  block_id: string
  /** Block权限 */
  block_perm: 0 | 1
}

export interface Board {
  /** 画板 token */
  token?: string
  /** 对齐方式 */
  align?: 1 | 2 | 3
  /** 宽度，单位 px；不填时自动适应文档宽度；值超出文档最大宽度时，页面渲染为文档最大宽度 */
  width?: number
  /** 高度，单位 px；不填时自动根据画板内容计算；值超出屏幕两倍高度时，页面渲染为屏幕两倍高度 */
  height?: number
}

export interface BodyEntity {
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

export interface BodyInfo {
  /** 主体类型 */
  body_type?: 'buy' | 'sell' | 'third'
  /** 值 */
  value?: BodyEntity
}

export interface BonusAmount {
  /** 奖励类型 */
  bonus_type: 1 | 2
  /** 积分奖励 */
  point_bonus?: number
  /** 现金奖励 */
  cash?: Cash
}

export interface Bot {
  /** 消息卡片回调地址 */
  card_request_url?: string
}

export interface Bp {
  /** 部门 ID */
  department_id?: string
  /** 部门 HRBP 的雇佣 ID，不包括上级部门的 HRBP */
  hrbp_id?: string
}

export interface BpRoleOrganization {
  /** 角色类型的唯一标识 */
  role_key: string
  /** 部门 id */
  department_id: string
  /** 工作地点 id */
  work_location_id?: string
}

export interface BusinessEntity {
  /** 识别的字段种类 */
  type?: 'certificate_type' | 'unified_social_credit_code' | 'company_name' | 'company_type' | 'domicile' | 'legal_representative' | 'registered_capital' | 'established_time' | 'established_date' | 'business_scope' | 'website' | 'approval_date'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface BusinessLicense {
  /** 识别出的实体类型 */
  entities?: BusinessEntity[]
}

export interface BusinessManagementScope {
  /** 实体 */
  entity?: EntityInfo
  /** 权限分组 */
  permission_groups?: PermissionGroupInfo[]
}

export interface CalculationActivity {
  /** 算薪活动唯一标识 */
  calculation_activity_id?: string
  /** 算薪活动名称 */
  calculation_activity_names?: I18nContent[]
}

export interface Calendar {
  /** 日历OpenId */
  calendar_id: string
  /** 日历标题 */
  summary?: string
  /** 日历描述 */
  description?: string
  /** 权限 */
  permissions?: 'private' | 'show_only_free_busy' | 'public'
  /** 日历颜色，颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效 */
  color?: number
  /** 日历类型 */
  type?: 'unknown' | 'primary' | 'shared' | 'google' | 'resource' | 'exchange'
  /** 日历备注名，修改或添加后仅对当前身份生效 */
  summary_alias?: string
  /** 对于当前身份，日历是否已经被标记为删除 */
  is_deleted?: boolean
  /** 当前日历是否是第三方数据；三方日历及日程只支持读，不支持写入 */
  is_third_party?: boolean
  /** 当前身份对于该日历的访问权限 */
  role?: 'unknown' | 'free_busy_reader' | 'reader' | 'writer' | 'owner'
}

export interface CalendarAcl {
  /** acl资源ID */
  acl_id: string
  /** 对日历的访问权限 */
  role: 'unknown' | 'free_busy_reader' | 'reader' | 'writer' | 'owner'
  /** 权限范围 */
  scope: AclScope
}

export interface CalendarAttendeeResourceCustomization {
  /** the unique key of customization option */
  index_key: string
  /** should be filled when the type of customization is input */
  input_content?: string
  /** 选项 */
  options?: CustomizationOption[]
}

export interface CalendarEvent {
  /** 日程ID */
  event_id: string
  /** 日程组织者日历ID */
  organizer_calendar_id?: string
  /** 日程标题 */
  summary?: string
  /** 日程描述 */
  description?: string
  /** 日程开始时间 */
  start_time: TimeInfo
  /** 日程结束时间 */
  end_time: TimeInfo
  /** 视频会议信息，仅当日程至少有一位attendee时生效 */
  vchat?: Vchat
  /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  visibility?: 'default' | 'public' | 'private'
  /** 参与人权限 */
  attendee_ability?: 'none' | 'can_see_others' | 'can_invite_others' | 'can_modify_event'
  /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  free_busy_status?: 'busy' | 'free'
  /** 日程地点 */
  location?: EventLocation
  /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
  color?: number
  /** 日程提醒列表 */
  reminders?: Reminder[]
  /** 重复日程的重复性规则 */
  recurrence?: string
  /** 日程状态 */
  status?: 'tentative' | 'confirmed' | 'cancelled'
  /** 日程是否是一个重复日程的例外日程 */
  is_exception?: boolean
  /** 例外日程的原重复日程的event_id */
  recurring_event_id?: string
  /** 日程的创建时间戳 */
  create_time?: string
  /** 日程自定义信息 */
  schemas?: Schema[]
  /** 日程组织者信息 */
  event_organizer?: EventOrganizer
  /** 日程的app_link,跳转到具体的某个日程 */
  app_link?: string
  /** 日程附件 */
  attachments?: Attachment[]
}

export interface CalendarEventAttendee {
  /** 参与人类型，仅当新建参与人时可设置类型<br>type为User时，值为open_id/user_id/union_id<br>type为Chat时，值为open_chat_id<br>type为Resource时，值为open_room_id<br>type为ThirdParty时，值为third_party_email；不支持通过API新建该类型参与人 */
  type?: 'user' | 'chat' | 'resource' | 'third_party'
  /** 参与人是否为「可选参加」，无法编辑群参与人的此字段 */
  is_optional?: boolean
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
  resource_customization?: CalendarAttendeeResourceCustomization[]
  /** 会议室审批原因 */
  approval_reason?: string
}

export interface CalendarEventAttendeeChatMember {
  /** 参与人RSVP状态 */
  rsvp_status?: 'needs_action' | 'accept' | 'tentative' | 'decline' | 'removed'
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

export interface CalendarEventAttendeeId {
  /** 参与人类型，仅当新建参与人时可设置类型<br>type为User时，值为open_id/user_id/union_id<br>type为Chat时，值为open_chat_id<br>type为Resource时，值为open_room_id<br>type为ThirdParty时，值为third_party_email；不支持通过API新建该类型参与人 */
  type?: 'user' | 'chat' | 'resource' | 'third_party'
  /** 参与人的用户id，依赖于user_id_type返回对应的取值，当is_external为true时，此字段只会返回open_id或者union_id */
  user_id?: string
  /** chat类型参与人的群组chat_id */
  chat_id?: string
  /** resource类型参与人的会议室room_id */
  room_id?: string
  /** third_party类型参与人的邮箱 */
  third_party_email?: string
}

export interface Callout {
  background_color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  border_color?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  text_color?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 高亮块图标 */
  emoji_id?: string
}

export interface CampusVolumnteerInfo {
  /** 志愿顺序 */
  volunteer_seq?: number
}

export interface Card {
  /** 卡片数据的类型 */
  type: 'card_json'
  /** 卡片数据内容，与卡片数据的类型相对应 */
  data: string
}

export interface Cash {
  /** 币种 */
  currency_type: string
  /** 数额 */
  amount: number
}

export interface Category {
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

export interface CcNode {
  /** 审批实例内唯一标识 */
  cc_id: string
  /** 抄送人 employee id */
  user_id?: string
  /** 抄送人 open id，和user id 二选一 */
  open_id?: string
  /** 跳转链接，用于【抄送我的】列表中的跳转pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
  links: ExternalInstanceLink
  /** 阅读状态，空值表示不支持已读未读： */
  read_status: 'READ' | 'UNREAD'
  /** 扩展 json */
  extra?: string
  /** 抄送任务名称 */
  title?: string
  /** 抄送发起时间，Unix 毫秒时间戳 */
  create_time: string
  /** 抄送最近更新时间，用于推送数据版本控制更新策略同 instance 的update_time */
  update_time: string
  /** 列表页打开审批任务的方式 */
  display_method?: 'BROWSER' | 'SIDEBAR' | 'NORMAL' | 'TRUSTEESHIP'
}

export interface CcSearchItem {
  /** 审批定义 */
  approval?: InstanceSearchApproval
  /** 审批定义分组 */
  group?: InstanceSearchGroup
  /** 审批实例信息 */
  instance?: InstanceSearchNode
  /** 审批任务 */
  cc?: CcSearchNode
}

export interface CcSearchNode {
  /** 审批实例发起人 id */
  user_id?: string
  /** 审批实例开始时间 */
  create_time?: string
  /** 审批实例状态 */
  read_status?: 'read' | 'unread'
  /** 审批实例名称（只有第三方审批有） */
  title?: string
  /** 审批实例扩展字段，string型json */
  extra?: string
  /** 审批实例链接（只有第三方审批有） */
  link?: InstanceSearchLink
}

export interface ChangeFieldPair {
  /** 调整前 */
  origin_value?: CustomFieldData
  /** 调整后 */
  target_value?: CustomFieldData
}

export interface ChangeReason {
  /** 调薪原因ID */
  id: string
  /** 调薪原因名称 */
  name: string
  /** 调薪原因备注 */
  note: string
  /** 启用状态 */
  active_status: 1 | 0
  /** 多语言名称 */
  i18n_names: I18nContent[]
  /** 多语言描述 */
  i18n_notes: I18nContent[]
}

export interface Channel {
  /** 自定义传入的变量 */
  variables?: string
}

export interface ChatCard {
  /** 群聊天会话 ID */
  chat_id: string
  /** 对齐方式 */
  align?: 1 | 2 | 3
}

export interface ChatMenuItem {
  /** 菜单类型 */
  action_type: 'NONE' | 'REDIRECT_LINK'
  /** 跳转链接 */
  redirect_link?: ChatMenuItemRedirectLink
  /** image_key */
  image_key?: string
  /** 名称 */
  name: string
  /** 国际化名称，一级菜单名称字符数要在1到8范围内，二级菜单名称字符数要在1到24范围内。<br><br>**注意：**<br>1中文=2英文=2其他语言字符=2字符 */
  i18n_names?: I18nNames
}

export interface ChatMenuItemRedirectLink {
  common_url?: string
  ios_url?: string
  android_url?: string
  pc_url?: string
  web_url?: string
}

export interface ChatMenuSecondLevel {
  /** 二级菜单信息 */
  chat_menu_item?: ChatMenuItem
}

export interface ChatMenuTopLevel {
  /** 一级菜单信息 */
  chat_menu_item: ChatMenuItem
  /** 二级菜单列表 */
  children?: ChatMenuSecondLevel[]
}

export interface ChatMenuTree {
  /** 一级菜单列表 */
  chat_menu_top_levels: ChatMenuTopLevel[]
}

export interface ChatTab {
  /** Tab名称 */
  tab_name?: string
  /** Tab类型 */
  tab_type: 'message' | 'doc_list' | 'doc' | 'pin' | 'meeting_minute' | 'chat_announcement' | 'url' | 'file' | 'files_resources' | 'images_videos' | 'task'
  /** Tab内容 */
  tab_content?: ChatTabContent
  /** Tab的配置 */
  tab_config?: ChatTabConfig
}

export interface ChatTabConfig {
  /** 群Tab图标 */
  icon_key?: string
  /** 群tab是否App内嵌打开 */
  is_built_in?: boolean
}

export interface ChatTabContent {
  /** URL类型 */
  url?: string
  /** Doc链接 */
  doc?: string
  /** 会议纪要 */
  meeting_minute?: string
  /** 任务 */
  task?: string
}

export interface ChatTopNotice {
  /** 置顶的类型 */
  action_type?: '1' | '2'
  /** 消息ID */
  message_id?: string
}

export interface CheckFailedAccountInfo {
  /** 账户ID */
  account_id?: string
  /** 招聘系统内的提取金额 */
  total_withdraw_reward_info?: BonusAmount
  /** 商城实际充值金额 */
  total_recharge_reward_info?: BonusAmount
}

export interface ChildField {
  /** 统计数据子字段code */
  code: string
  /** 统计数据子字段名称 */
  title: string
  /** 时间单位 */
  time_unit?: string
}

export interface ChildItem {
  /** 二级表头code */
  code: string
  /** 值 */
  value: string
}

export interface ChinesePassport {
  /** 识别出的实体类型 */
  entities?: ChinesePassportEntity[]
}

export interface ChinesePassportEntity {
  /** 识别的字段种类 */
  type?: 'full_name_cn' | 'full_name_en' | 'date_of_birth' | 'date_of_expiry' | 'place_of_issue' | 'passport_number'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface City {
  /** 城市 ID */
  city_id?: string
  /** 城市名称 */
  name?: I18n[]
  /** 所属省份/主要行政区 ID，详细信息可通过[查询省份/主要行政区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search)接口获得 */
  country_region_subdivision_id?: string
  /** 城市三位字母代码 */
  code?: string
  /** 行政区划代码 */
  subregion_code?: string
  /** 状态 */
  status?: 1 | 0
}

export interface Classification {
  /** 唯一分类 ID */
  id: string
  /** 父级分类的 ID */
  father_id?: string
}

export interface ClassificationFilter {
  /** 需要获取的分类 */
  include?: string[]
  /** 需要排除的分类 */
  exclude?: string[]
}

export interface ClientBadgeNum {
  /** h5能力的badge数量 */
  web_app?: number
  /** 小程序能力的badge数量 */
  gadget?: number
}

export interface CloudDoc {
  /** 云空间重定向 url */
  space_url?: string
  /** 国际化信息 */
  i18n?: CloudDocI18nInfo[]
  /** 图标链接 */
  icon_url?: string
  /** 云文档支持模式 */
  mode?: 0 | 1
}

export interface CloudDocI18nInfo {
  /** 国际化语言的 key */
  i18n_key: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 云文档国际化名称 */
  name?: string
  /** 云文档国际化读权限说明 */
  read_description?: string
  /** 云文档国际化写权限说明 */
  write_description?: string
}

export interface CodeNameObject {
  /** 编码 */
  code?: string
  /** 名称 */
  name?: I18n
}

export interface CollaborationDepartment {
  /** 关联组织的部门open id */
  open_department_id?: string
  /** 关联组织的部门id */
  department_id?: string
  /** 关联组织的部门名称 */
  name?: string
  /** 关联组织的的国际化部门名称 */
  i18n_name?: I18nName
  /** 关联组织的部门排序 */
  order?: string
  /** 部门负责人 */
  leaders?: CollaborationDepartmentLeader[]
  /** 父部门ID */
  parent_department_id?: CollaborationDepartmentId
}

export interface CollaborationDepartmentId {
  /** 部门ID */
  department_id?: string
  /** 部门open ID */
  open_department_id?: string
}

export interface CollaborationDepartmentLeader {
  /** 负责人类型 */
  leader_type: 1 | 2
  /** 负责人ID */
  id: CollaborationUserId
}

export interface CollaborationEntity {
  /** 关联组织实体类型 */
  collaboration_entity_type: 'user' | 'department' | 'group'
  /** 部门ID */
  department_id?: string
  /** 部门的open ID */
  open_department_id?: string
  /** 用户ID */
  user_id?: string
  /** 用户的open ID */
  open_user_id?: string
  /** 用户的union_id */
  union_user_id?: string
  /** 部门名称 */
  department_name?: string
  /** 部门的国际化名称 */
  i18n_department_name?: I18nName
  /** 部门顺序 */
  department_order?: string
  /** 对方成员名称 */
  user_name?: string
  /** 对方成员i18n名称 */
  i18n_user_name?: I18nName
  /** 对方租户的成员头像 */
  user_avatar?: AvatarInfo
  /** 用户组ID */
  group_id?: string
  /** 用户组的open ID */
  open_group_id?: string
  /** 对方用户组名称 */
  group_name?: string
  /** 对方用户组i18n名称 */
  i18n_group_name?: I18nName
}

export interface CollaborationRule {
  /** 规则ID */
  rule_id?: string
  /** 实体数量之和需要小于100 */
  subjects?: CollaborationRuleEntities
  /** 是否生效，如果规则主体超出了分享的范围，则is_valid为false，规则主体将不返回 */
  subject_is_valid?: boolean
  /** 实体数量之和需要小于100 */
  objects?: CollaborationRuleEntities
  /** 是否生效，如果规则客体超出了分享的范围，则is_valid为false，规则客体将不返回 */
  object_is_valid?: boolean
}

export interface CollaborationRuleEntities {
  /** user open id */
  open_user_ids?: string[]
  /** department open id，0代表全部成员 */
  open_department_ids?: string[]
  /** group open id */
  open_group_ids?: string[]
}

export interface CollaborationTenant {
  /** 关联租户ID */
  tenant_key?: string
  /** 目标租户的租户名称 */
  tenant_name?: string
  /** 目标租户的租户i18n名称 */
  i18n_tenant_name?: I18nName
  /** 目标租户的租户简称 */
  tenant_short_name?: string
  /** 目标租户的租户i18n简称 */
  i18n_tenant_short_name?: I18nName
  /** 关联时间 */
  connect_time?: number
  /** 标签 */
  tenant_tag?: string
  /** i18n标签 */
  i18n_tenant_tag?: I18nName
  /** 租户icon信息 */
  avatar?: AvatarInfo
  /** 租户品牌 */
  brand?: string
}

export interface CollaborationUser {
  /** 对方关联组织用户的open_id */
  open_id?: string
  /** 对方关联组织用户的id */
  user_id?: string
  /** 对方关联组织用户的union id */
  union_id?: string
  /** 用户的名称 */
  name: string
  /** 关联组织的的国际化用户名称 */
  i18n_name?: I18nName
  /** 用户头像信息 */
  avatar?: AvatarInfo
  /** 手机号 */
  mobile?: string
  /** 用户状态 */
  status?: UserStatus
  /** 用户所属部门的ID列表,deprecate */
  department_ids?: string[]
  /** 用户的直接主管的用户ID,deprecate */
  leader_user_id?: string
  /** 职务 */
  job_title?: string
  /** 自定义属性 */
  custom_attrs?: UserCustomAttr[]
  /** 工号 */
  employee_no?: string
  /** 父部门ID */
  parent_department_ids?: CollaborationDepartmentId[]
  /** 用户的leader */
  leader_id?: CollaborationUserId
}

export interface CollaborationUserId {
  /** 用户ID */
  user_id?: string
  /** 用户open ID */
  open_id?: string
  /** 用户union ID */
  union_id?: string
}

export interface Collaborator {
  /** 任务协作者的 ID */
  id?: string
  /** 协作人的用户ID列表 */
  id_list?: string[]
}

export interface CombinedJobObjectValueMap {
  /** 结构 ID */
  object_id?: string
  /** 结构值 */
  value?: string
}

export interface CombinedJobResultDefaultJobPost {
  /** 默认职位广告的 ID，用以发布至招聘渠道的内容 */
  id?: string
}

export interface Comment {
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
  replies?: CommentReply[]
  /** 评论中艾特人信息 */
  at_info_list?: CommentAtInfo[]
  /** 评论创建人 */
  commentator: string
  /** 附加字段 */
  extra?: string
}

export interface CommentAtInfo {
  /** 被艾特人的ID */
  user_id: string
  /** 被艾特人的姓名 */
  name: string
  /** 被艾特人在评论中的位置，从0开始 */
  offset: string
}

export interface CommentReply {
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
  at_info_list?: CommentAtInfo[]
  /** 评论创建人 */
  commentator: string
  /** 附加字段 */
  extra?: string
}

export interface Comments {
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

export interface CommonAddress {
  /** ID */
  id?: string
  /** 名称 */
  name?: I18n
  /** 区域信息 */
  district?: CodeNameObject
  /** 城市信息 */
  city?: CodeNameObject
  /** 省信息 */
  state?: CodeNameObject
  /** 国家信息 */
  country?: CodeNameObject
}

export interface CommonFilter {
  /** 筛选项 key */
  key: string
  /** 筛选项值类型 */
  value_type: 1 | 2 | 3
  /** 筛选项值列表 */
  value_list?: string[]
  /** 范围筛选 */
  range_filter?: RangeFilter
}

export interface CommonSchema {
  /** 模块 ID */
  id?: string
  /** 模块名称 */
  name?: I18n
  /** 模块描述 */
  description?: I18n
  /** 模块信息 */
  setting?: CommonSchemaSetting
  /** 是否是自定义模块 */
  is_customized?: boolean
  /** 是否必填 */
  is_required?: boolean
  /** 是否启用 */
  active_status?: 1 | 2
  /** 字段列表 */
  children_list?: CommonSchemaChild[]
}

export interface CommonSchemaChild {
  /** 字段 ID */
  id?: string
  /** 字段名称 */
  name?: I18n
  /** 字段描述 */
  description?: I18n
  /** 字段信息 */
  setting?: CommonSchemaSetting
  /** 所属模块 ID */
  parent_id?: string
  /** 是否是自定义字段 */
  is_customized?: boolean
  /** 是否必填 */
  is_required?: boolean
  /** 是否启用 */
  active_status?: 1 | 2
}

export interface CommonSchemaConfig {
  /** 选项信息 */
  options?: CommonSchemaOption[]
}

export interface CommonSchemaOption {
  /** 选项 ID */
  key?: string
  /** 选项名称 */
  name?: I18n
  /** 选项描述 */
  description?: I18n
  /** 是否启用 */
  active_status?: 1 | 2
}

export interface CommonSchemaSetting {
  /** 字段类型 */
  object_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 13
  /** 配置信息 */
  config?: CommonSchemaConfig
}

export interface Company {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: HiberarchyCommon
  /** 性质 */
  type?: Enum
  /** 行业 */
  industry_list?: Enum[]
  /** 法定代表人 */
  legal_representative?: I18n[]
  /** 邮编 */
  post_code?: string
  /** 纳税人识别号 */
  tax_payer_id?: string
  /** confidential */
  confidential?: boolean
  /** 主体类型 */
  sub_type_list?: Enum[]
  /** 是否为分公司 */
  branch_company?: boolean
  /** 主要负责人 */
  primary_manager?: I18n[]
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 默认币种 */
  currency?: Currency
  /** 电话 */
  phone?: PhoneNumberAndAreaCode
  /** 传真 */
  fax?: PhoneNumberAndAreaCode
  /** 完整注册地址 */
  registered_office_address?: I18n[]
  /** 完整办公地址 */
  office_address?: I18n[]
  /** 注册地址详细信息 */
  registered_office_address_info?: Address
  /** 办公地址详细信息 */
  office_address_info?: Address
}

export type CompareOperator = string

export interface CompensationCost {
  /** 成本项值 */
  compensation_cost_value?: string
  /** 成本项名称 */
  i18n_names?: I18nContent[]
}

export interface CompensationCostItem {
  /** 发薪人数 */
  number_of_individuals_for_payment?: number
  /** 成本项数据 */
  compensation_costs?: CompensationCost[]
}

export interface CompositeShape {
  /** 基础图形的具体类型 */
  type: 'round_rect2' | 'ellipse' | 'hexagon' | 'cylinder' | 'parallelogram' | 'trapezoid' | 'triangle' | 'round_rect' | 'step' | 'diamond' | 'rect' | 'star' | 'bubble' | 'pentagon' | 'forward_arrow' | 'document_shape' | 'condition_shape' | 'cloud' | 'cross' | 'step2' | 'predefined_process' | 'delay_shape' | 'off_page_connector' | 'note_shape' | 'data_process' | 'data_store' | 'data_store2' | 'data_store3' | 'star2' | 'star3' | 'star4' | 'actor' | 'brace' | 'condition_shape2' | 'double_arrow' | 'data_flow_round_rect3' | 'rect_bubble' | 'manual_input' | 'flow_chart_round_rect' | 'flow_chart_round_rect2' | 'flow_chart_diamond' | 'flow_chart_parallelogram' | 'flow_chart_cylinder' | 'flow_chart_trapezoid' | 'flow_chart_hexagon' | 'data_flow_round_rect' | 'data_flow_ellipse' | 'backward_arrow' | 'brace_reverse' | 'flow_chart_mq' | 'horiz_cylinder' | 'class_interface' | 'classifier' | 'circular_ring' | 'pie' | 'right_triangle' | 'octagon' | 'state_start' | 'state_end' | 'state_concurrence' | 'component_shape' | 'component_shape2' | 'component_interface' | 'component_required_interface' | 'component_assembly' | 'cube'
}

export interface CompositeTalentAwardInfo {
  /** 名称 */
  award_name?: string
  /** 获奖时间 */
  award_time?: string
  /** 描述 */
  description?: string
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface CompositeTalentBasicInfo {
  /** 名字 */
  name: string
  /** 手机 */
  mobile_number?: string
  /** 手机国家区号 */
  mobile_code?: string
  /** 邮箱 */
  email?: string
  /** 工作年限 */
  experience_years?: number
  /** 年龄 */
  age?: number
  /** 国籍 */
  nationality_code?: string
  /** 性别 */
  gender?: 1 | 2 | 3
  /** 所在地点 */
  current_location_code?: string
  /** 家乡 */
  hometown_location_code?: string
  /** 意向地点 */
  preferred_location_code_list?: string[]
  /** 家庭住址 */
  home_address?: string
  /** 证件类型 */
  identification_type?: 1 | 2 | 3 | 4 | 5 | 6 | 9
  /** 证件号 */
  identification_number?: string
  /** 生日 */
  birthday?: number
  /** 婚姻状况 */
  marital_status?: 1 | 2
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
  /** 户口所在地 */
  hukou_location_code?: string
  /** 人才更新时间 */
  update_time?: string
  /** 人才创建时间 */
  create_time?: string
  /** 人才隐藏状态 */
  confidential?: 1 | 2
}

export interface CompositeTalentCareerInfo {
  /** 公司 */
  company_name?: string
  /** 描述 */
  description?: string
  /** 结束时间 */
  end_time?: string
  /** 开始时间 */
  start_time?: string
  /** 职称 */
  title?: string
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface CompositeTalentCustomizedData {
  /** 模块 ID */
  module_id?: string
  /** 模块名称 */
  name?: I18n
  /** 类型 */
  object_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** 模块下的字段 */
  children?: TalentCustomizedDataChild[]
}

export interface CompositeTalentEducationInfo {
  /** 学位 */
  degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  /** 学校 */
  school_name?: string
  /** 专业 */
  major?: string
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
  /** 学历类型 */
  education_type?: 1 | 2 | 3 | 4 | 5
  /** 成绩排名 */
  academic_ranking?: 5 | 10 | 20 | 30 | 50 | -1
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface CompositeTalentInternshipInfo {
  /** 公司 */
  company_name?: string
  /** 描述 */
  description?: string
  /** 结束时间 */
  end_time?: string
  /** 开始时间 */
  start_time?: string
  /** 职称 */
  title?: string
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface CompositeTalentLanguageInfo {
  /** 语言 */
  language?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25
  /** 熟练程度 */
  proficiency?: 1 | 2 | 3 | 4 | 5
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface CompositeTalentProjectInfo {
  /** 项目名称 */
  project_name?: string
  /** 项目角色 */
  role?: string
  /** 项目链接 */
  link?: string
  /** 描述 */
  description?: string
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface CompositeTalentSnsInfo {
  /** SNS类型 */
  sns_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** SNS链接 */
  link?: string
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface CompositeTalentWorksInfo {
  /** ID */
  id?: string
  /** 链接 */
  link?: string
  /** 描述 */
  description?: string
  /** 自定义字段 */
  customized_data_list?: TalentCustomizedDataChild[]
}

export interface Condition {
  /** 筛选类型 */
  filter_type: string
  /** 比较类型 */
  compare_type?: string
  /** 筛选参数 */
  expected: string[]
}

export interface Connector {
  /** 连线连接的起点图形 */
  start_object?: ConnectorAttachedObject
  /** 连线连接的终点图形 */
  end_object?: ConnectorAttachedObject
  /** 连线文本 */
  captions?: ConnectorCaption
}

export interface ConnectorAttachedObject {
  /** 连接图形的 id */
  id?: string
}

export interface ConnectorCaption {
  /** 文本 */
  data?: Text[]
}

export interface ConnectorParam {
  /** 回调时Request里面的id类型 */
  callback_user_id_type?: 0 | 1 | 2 | 3
  /** 回调时的地址，必须为POST地址 */
  callback_endpoint?: string
}

export interface Contact {
  contact_type?: 1 | 2 | 3
  /** 联系人名 */
  contact_name?: string
}

export interface ContentBlock {
  /** 文档结构是按行排列的，每行内容是一个 Block */
  blocks?: ContentBlockElement[]
}

export interface ContentBlockElement {
  /** 文档元素类型 */
  type?: 'paragraph' | 'gallery'
  /** 文本段落 */
  paragraph?: ContentParagraph
  /** 图片 */
  gallery?: ContentGallery
}

export interface ContentColor {
  /** 红 取值范围[0,255] */
  red?: number
  /** 绿 取值范围[0,255] */
  green?: number
  /** 蓝 取值范围[0,255] */
  blue?: number
  /** 透明度 取值范围[0,1] */
  alpha?: number
}

export interface ContentDocsLink {
  /** 链接地址 */
  url?: string
  /** 链接文案 */
  title?: string
}

export interface ContentGallery {
  /** 图片元素 */
  imageList?: ContentImageItem[]
}

export interface ContentImageItem {
  /** 图片 token，比如boxcnOj88GDkmWGm2zsTyCBqoLb，不支持编辑 */
  fileToken?: string
  /** 图片链接 */
  src?: string
  /** 图片宽，单位px */
  width?: number
  /** 图片高，单位px */
  height?: number
}

export interface ContentLink {
  /** 链接地址 */
  url?: string
}

export interface ContentList {
  /** 列表类型 */
  type?: 'number' | 'bullet' | 'checkBox' | 'checkedBox' | 'indent'
  /** 列表的缩进级别，支持指定一行的缩进 除代码块以外的列表都支持设置缩进，支持 1-16 级缩进，取值范围：[1,16] */
  indentLevel?: number
  /** 用于指定列表的行号，仅对有序列表和代码块生效 如果为有序列表设置了缩进，行号可能会显示为字母或者罗马数字 */
  number?: number
}

export interface ContentParagraph {
  /** 段落样式 */
  style?: ContentParagraphStyle
  /** 段落元素组成一个段落 */
  elements?: ContentParagraphElement[]
}

export interface ContentParagraphElement {
  /** 元素类型 */
  type?: 'textRun' | 'docsLink' | 'person'
  /** 文本 */
  textRun?: ContentTextRun
  /** 文档链接，可以根据链接自动识别为标题 */
  docsLink?: ContentDocsLink
  /** 艾特用户 */
  person?: ContentPerson
}

export interface ContentParagraphStyle {
  /** 有序列表/无序列表/任务列表 */
  list?: ContentList
}

export interface ContentPerson {
  /** 员工的OpenID */
  openId?: string
}

export interface ContentTextRun {
  /** 具体的文本内容 */
  text?: string
  /** 文本内容的样式，支持 BIUS、颜色等 */
  style?: ContentTextStyle
}

export interface ContentTextStyle {
  /** 是否加粗 */
  bold?: boolean
  /** 是否删除 */
  strikeThrough?: boolean
  /** 背景颜色 */
  backColor?: ContentColor
  /** 字体颜色 */
  textColor?: ContentColor
  /** 链接地址 */
  link?: ContentLink
}

export interface Contract {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 合同开始日期 */
  effective_time: string
  /** 实际结束日期 */
  expiration_time?: string
  /** 雇员ID */
  employment_id: string
  /** 合同类型 */
  contract_type: Enum
  /** 甲方, 引用Company的ID */
  first_party_company_id: string
  /** Person ID */
  person_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 期限类型 */
  duration_type?: Enum
  /** 合同结束日期 */
  contract_end_date?: string
  /** 合同编号 */
  contract_number?: string
  /** 签订类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（signing_type）枚举定义部分获得 */
  signing_type?: Enum
  /** 合同协议状态，枚举值可通过文档【飞书人事枚举常量】合同协议状态（contract_status）枚举定义部分获得 */
  contract_status?: Enum
  /** 续签状态，枚举值可通过文档【飞书人事枚举常量】续签状态（renewal_status）枚举定义部分获得 */
  renewal_status?: Enum
  /** 第几次签署 */
  signing_times?: number
}

export interface ContractCompany {
  id?: number
  name?: string
}

export interface ContractPeriodInfo {
  /** 合同周期类型 */
  period_type: 1 | 2
  /** 合同时长 */
  period: number
}

export interface CooperationProject {
  /** 合作项目 ID */
  id?: string
  /** 合作项目的名称 */
  name?: I18n
  /** 项目角色 */
  roles?: CooperationRole[]
}

export interface CooperationRole {
  /** 评估人的项目角色。在未配置项目角色情况下，该字段为空值。 */
  reviewer_role?: CooperationUserRole
  /** 被评估人的项目角色。在未配置项目角色情况下，该字段为空值。 */
  reviewee_role?: CooperationUserRole
}

export interface CooperationUserRole {
  /** 角色 ID */
  role_id?: string
  /** 名称 */
  name?: I18n
}

export interface CostAllocationPlan {
  /** 唯一标识 */
  id?: string
  /** 方案名称 */
  names?: I18nContent[]
  /** 适用国家 */
  applicable_country_region?: string
}

export interface CostAllocationReportData {
  /** 数据维度汇总 */
  data_summary_dimensions?: DataSummaryDimension[]
  /** 成本项数据 */
  compensation_cost_item?: CompensationCostItem
}

export interface CostCenter {
  /** 成本中心ID */
  cost_center_id?: string
  /** 成本中心名称 */
  name: I18n[]
  /** 编码 */
  code?: string
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: I18n[]
  /** 生效时间 */
  effective_time: string
  /** 过期时间 */
  expiration_time?: string
  /** 当前实体是否启用 */
  active?: boolean
}

export interface CostCenterVersion {
  /** 成本中心ID */
  cost_center_id?: string
  /** 成本中心版本ID */
  version_id?: string
  /** 成本中心名称 */
  name: I18n[]
  /** 编码 */
  code?: string
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: I18n[]
  /** 生效时间 */
  effective_time: string
  /** 过期时间 */
  expiration_time?: string
  /** 当前实体是否启用 */
  active?: boolean
}

export interface Count {
  /** 总数，大于等于 1000 个项目时将返回 999 */
  total: number
  /** 还有更多，当大于等于 1000 时将返回 true */
  has_more?: boolean
}

export interface CountryRegion {
  /** 国家/地区 ID */
  country_region_id?: string
  /** 国家/地区名称 */
  name?: I18n[]
  /** 国家/地区全称 */
  full_name?: I18n[]
  /** 国家/地区两位字母编码（ISO 3166-1） */
  alpha_2_code?: string
  /** 国家/地区三位字母编码（ISO 3166-1） */
  alpha_3_code?: string
  /** 国际电话区号 */
  global_code?: string
  /** 状态 */
  status?: 1 | 0
}

export interface CountryRegionSubdivision {
  /** 省份/主要行政区 ID */
  country_region_subdivision_id?: string
  /** 省份/主要行政区名称 */
  name?: I18n[]
  /** 所属国家/地区 ID，详细信息可通过[查询国家/地区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口查询获得 */
  country_region_id?: string
  /** 行政区类型，枚举值可通过飞书人事[枚举常量介绍](/ssl:ttdoc/server-docs/corehr-v1/feishu-people-enum-constant#402ea9a0)文档中行政区类型（subdivision_type）定义部分获得 */
  subdivision_type?: Enum
  /** 省份/主要行政区编码（ISO 3166-2） */
  iso_code?: string
  /** 状态 */
  status?: 1 | 0
}

export interface CpstBandWidth {
  /** 上限 */
  upper_limit?: string
  /** 下限 */
  lower_limit?: string
}

export interface CpstCurrency {
  /** 币种ID */
  currency_id?: string
  /** 币种code */
  code?: string
  /** 币种名称 */
  name?: CpstI18n
}

export interface CpstGrade {
  /** 薪资等级ID */
  grade_id?: string
  /** 薪资等级时间轴ID */
  grade_tid?: string
  /** 带宽上下限和标准值 */
  grade_standard_value?: CpstGradeStandardValue
  /** 币种 */
  currency?: CpstCurrency
  /** 薪资标准描述 */
  description?: CpstI18n
}

export interface CpstGradeStandardValue {
  /** 薪资标准的关联对象，项目或者指标 */
  reference_object?: ReferenceObject
  /** 薪资标准类型 */
  standard_type?: CpstStandardType
  /** 上下限 */
  band_width?: CpstBandWidth
  /** 标准值 */
  standard_value?: string
}

export interface CpstI18n {
  /** 中文 */
  zh_cn?: string
  /** 英文 */
  en_us?: string
}

export interface CpstStandardType {
  /** 薪资标准类型 */
  api_name?: 'standard_value' | 'bandwidth_and_standard_value' | 'bandwidth_upper_and_lower_limit'
}

export interface CreateDepartment {
  /** 标识租户内一个唯一的部门，支持自定义，未自定义时系统自动生成。ID支持修改。详细说明参见 部门ID说明，获取department_id的方式：企业管理员在 管理后台 > 组织架构 > 成员与部门 页面，点击 部门详情，查询部门ID */
  custom_department_id?: string
  /** i18n文本 */
  name?: I18nText
  /** 父部门ID */
  parent_department_id?: string
  /** 部门负责人 */
  leaders?: DepartmentLeader[]
  /** 在上级部门下的排序权重 */
  order_weight?: string
  /** 是否启用 */
  enabled_status?: boolean
  /** 自定义字段 */
  custom_field_values?: CustomFieldValue[]
}

export interface CreateEmpCustomOrg {
  /** 自定义组织ID */
  id: string
  /** 比例 如果是非比例的可不填写 */
  rate?: number
}

export interface CreateEmployee {
  /** 姓名 */
  name?: UpsertName
  /** 员工的联系手机号 */
  mobile?: string
  /** 用户的user_id */
  custom_employee_id?: string
  /** 头像的文件key */
  avatar_key?: string
  /** 员工的联系邮箱 */
  email?: string
  /** 员工的企业邮箱 */
  enterprise_email?: string
  /** 性别 */
  gender?: GenderDirectory
  /** 部门排序 */
  employee_order_in_departments?: UpsertUserDepartmentSortInfo[]
  /** 员工直属上级的user_id */
  leader_id?: string
  /** 员工虚线上级的user_id */
  dotted_line_leader_ids?: string[]
  /** 工作地国家/地区 */
  work_country_or_region?: string
  /** 工作地点 */
  work_place_id?: string
  /** i18n文本 */
  work_station?: I18nText
  /** 工号 */
  job_number?: string
  /** 分机号 */
  extension_number?: string
  /** 入职日期 */
  join_date?: string
  /** 员工类型 */
  employment_type?: EmployeeTypeDirectory
  /** 职务ID */
  job_title_id?: string
  /** 自定义字段 */
  custom_field_values?: CustomFieldValue[]
}

export interface CreateEmployeeOptions {
  /** 用户指定geo/unit */
  geo_name?: string
  /** 席位信息 */
  subscription_ids?: string[]
}

export interface CreateTag {
  /** 标签类型 */
  tag_type: 'tenant'
  /** 标签默认名称 */
  name: string
  /** i18n标签名称集合 */
  i18n_names?: TagI18nName[]
}

export interface CreateTagFailReason {
  /** 名称重复的标签id */
  duplicate_id?: string
}

export interface CreateTransferInfo {
  /** 备注 */
  remark?: string
  /** offer信息 */
  offer_info?: string
  /** 是否撤销虚线上级 */
  target_dotted_manager_clean?: boolean
  /** 是否有试用期 */
  probation_exist?: boolean
  /** 新部门 */
  target_department?: string
  /** 新工作地点 */
  target_work_location?: string
  /** 新直属上级 */
  target_direct_manager?: string
  /** 新虚线上级 */
  target_dotted_manager?: string
  /** 新职务 */
  target_job?: string
  /** 新序列 */
  target_job_family?: string
  /** 新级别 */
  target_job_level?: string
  /** 新人员类型 */
  target_workforce_type?: string
  /** 新人员子类型 */
  target_employee_subtype?: string
  /** 新公司 */
  target_company?: string
  /** 新合同编号 */
  target_contract_number?: string
  /** 新合同类型 */
  target_contract_type?: string
  /** 新期限类型 */
  target_duration_type?: string
  /** 新签订类型 */
  target_signing_type?: string
  /** 新合同开始日期 */
  target_contract_start_date?: string
  /** 新合同结束日期 */
  target_contract_end_date?: string
  /** 新工时制度 */
  target_working_hours_type?: string
  /** 新工作日历 */
  target_working_calendar?: string
  /** 新试用期预计结束日期 */
  target_probation_end_date?: string
  /** 新周工作时长 */
  target_weekly_working_hours?: string
  /** 新排班 */
  target_work_shift?: string
  /** 新成本中心分摊方式 */
  target_cost_center_rates?: JobDataCostCenter[]
  /** 新工作信息 */
  target_employment_change?: TranferEmploymentInfo
  /** 新职等 */
  target_job_grade?: string
  /** 新薪资类型 */
  target_compensation_type?: string
  /** 新任职公司 */
  target_service_company?: string
  /** 新岗位 */
  target_position?: string
  /** 新社保城市 */
  target_social_security_city?: string
  /** 编制随人员一起调整 */
  is_transfer_with_workforce?: boolean
}

export interface Criterion {
  /** 查询条件 */
  conditions?: Condition[]
  /** 逻辑关系 */
  logic_expression?: string
}

export interface Currency {
  /** 货币 ID */
  currency_id?: string
  /** 货币所属国家/地区 ID 列表，详细信息可通过[查询国家/地区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口查询获得 */
  country_region_id_list?: string[]
  /** 货币名称 */
  currency_name?: I18n[]
  /** 数字代码（ISO 4217） */
  numeric_code?: number
  /** 三位字母代码（ISO 4217） */
  currency_alpha_3_code?: string
  /** 状态 */
  status?: 1 | 0
}

export interface CustomAttr {
  /** 自定义字段id */
  id: string
  /** 自定义字段类型 */
  type: string
  /** 选项定义，当type为ENUMERATION或者PICTURE_ENUM时此项有值，列举所有可选项 */
  options?: CustomAttrOptions
  /** 多语言名称 */
  i18n_name?: I18nContent[]
}

export interface CustomAttrGenericUser {
  /** 用户id */
  id: string
  /** 用户类型 1 User 2 Bot 11 Mail */
  type: number
}

export interface CustomAttrOption {
  /** 枚举类型选项id */
  id: string
  /** 枚举选项值 */
  value: string
  /** 名称 */
  name?: string
}

export interface CustomAttrOptions {
  /** 默认选项id */
  default_option_id?: string
  /** 选项类型 */
  option_type: 'TEXT' | 'PICTURE'
  /** 选项列表 */
  options: CustomAttrOption[]
}

export interface CustomComplete {
  /** pc客户端自定义完成配置（含mac和windows） */
  pc?: CustomCompleteItem
  /** ios端的自定义完成配置 */
  ios?: CustomCompleteItem
  /** android端的自定义完成配置 */
  android?: CustomCompleteItem
}

export interface CustomCompleteItem {
  /** 自定义完成的跳转url */
  href?: string
  /** 自定义完成的弹出提示为 */
  tip?: I18nText
}

export interface CustomField {
  /** 自定义字段的GUID */
  guid?: string
  /** 自定义字段名称 */
  name?: string
  /** 自定义字段类型 */
  type?: string
  /** 数字类型的字段设置 */
  number_setting?: NumberSetting
  /** 人员类型的字段设置 */
  member_setting?: MemberSetting
  /** 时间日期类型的字段设置 */
  datetime_setting?: DatetimeSetting
  /** 单选类型的字段设置 */
  single_select_setting?: SelectSetting
  /** 多选类型的字段设置 */
  multi_select_setting?: SelectSetting
  /** 创建人 */
  creator?: Member
  /** 自定义字段创建的时间戳(ms) */
  created_at?: string
  /** 自定义字段的更新时间戳(ms) */
  updated_at?: string
  /** 文本字段配置 */
  text_setting?: TextSetting
}

export interface CustomFieldData {
  /** 自定义字段 apiname，即自定义字段的唯一标识 */
  custom_api_name: string
  /** 字段值，是 json 转义后的字符串，根据元数据定义不同，字段格式不同（如 123, 123.23, "true", ["id1","id2"], "2006-01-02 15:04:05"） */
  value: string
}

export interface CustomFields {
  key?: string
  label?: string
  type?: 'text' | 'date' | 'option' | 'file'
  /** 根据type不同，结构不同，不同type对应的数据结构在type的枚举值中有描述 */
  value?: string
}

export interface CustomFieldValue {
  /** 自定义字段key */
  field_key?: string
  /** 自定义字段类型 */
  field_type?: CustomFieldValueType
  /** i18n文本 */
  text_value?: I18nText
  /** 网页链接字段值 */
  url_value?: UrlValue
  /** 枚举 */
  enum_value?: EnumValue
  /** 人员字段值 */
  user_values?: UserValue[]
}

export const enum CustomFieldValueEnumType {
  /** 文本 */
  CustomFieldValueEnumTypeText = '1',
  /** 图片 */
  CustomFieldValueEnumTypePicture = '2',
}

export const enum CustomFieldValueType {
  /** 多行文本 */
  CustomFieldValueTypeText = '1',
  /** 网页链接 */
  CustomFieldValueTypeUrl = '2',
  /** 枚举选项 */
  CustomFieldValueTypeEnum = '3',
  /** 人员 */
  CustomFieldValueTypeGenericUser = '4',
  /** 多选枚举类型(目前仅支持文本类型) */
  CustomFieldFieldTypeDirectoryMultiEnum = '10',
  /** 人员列表 */
  CustomFieldFieldTypeDirectoryMultiGenericUser = '11',
}

export const enum CustomFieldValueUserType {
  /** 员工 */
  CustomFieldValueUserTypeEmployee = '1',
}

export interface CustomizationOption {
  /** the option unique key */
  option_key?: string
  /** should be filled if the option is others option */
  others_content?: string
}

export interface CustomizedFieldDisplayItem {
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

export interface CustomMetricConfig {
  /** 新增指标默认公式ID,非指标库指标的公式ID使用该值 */
  default_formula_id?: string
  /** 维度允许添加指标下限(包含) */
  least_metrics_size?: number
  /** 添加的指标方式 */
  add_metric_options?: (1 | 2)[]
}

export interface CustomOrg {
  /** 组织类型编码 */
  object_api_name: string
  /** 组织名称 */
  names?: I18n[]
  /** 编码 */
  code?: string
  /** 上级组织 ID */
  parent_id?: string
  /** 负责人ID 列表 */
  manager_ids?: string[]
  /** 描述 */
  description?: I18n[]
  /** 生效时间 */
  effective_time?: string
  /** 组织角色 */
  org_roles?: OrgRole[]
  /** 匹配规则组，组间并集 */
  match_rule_groups?: MatchRules[]
  /** 是否启用 */
  active?: boolean
  /** 组织ID */
  org_id?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface CustomWorkplaceAccessData {
  /** 定制工作台ID */
  custom_workplace_id?: string
  /** 访问数据 */
  access_data?: AccessData
  /** 时间,精确到天,格式yyyy-MM-dd */
  date?: string
  /** 定制工作台多语言名字。 */
  custom_workplace_name?: I18nName[]
}

export interface DataAsset {
  /** 数据知识ID */
  data_asset_id?: string
  /** 数据知识标题 */
  label?: Record<string, string>
  /** 数据知识描述 */
  description?: Record<string, string>
  /** 数据资源类型 */
  data_source_type?: 'excel' | 'pdf' | 'pptx' | 'txt' | 'docx' | 'mysql' | 'postgresql' | 'larkbase' | 'salesforce' | 'fenxiangxiaoke' | 'qianchuan' | 'clickhouse' | 'databricks' | 'servicedesk' | 'larkbiz_wiki' | 'larkbiz_doc' | 'larkbiz_docs' | 'larkbiz_docx' | 'larkbiz_pdf' | 'larkbiz_word' | 'larkbiz_pptx' | 'larkbiz_sheets' | 'larkbiz_base' | 'larkbiz_personalfolder' | 'larkbiz_sharedfolder' | 'object'
  /** 数据连接状态 */
  connect_status?: 'awaiting' | 'syncing' | 'successful' | 'continuously_syncing' | 'partially_successful' | 'failed'
  /** 数据知识分类列表 */
  tags?: DataAssetTag[]
  /** 数据知识项列表 */
  items?: DataAssetItem[]
  /** 连接状态失败信息 */
  connect_failed_reason?: string
  /** 数据连接类型 */
  connect_type?: 'import' | 'direct'
  /** 创建时间，毫秒时间戳 */
  created_time?: string
  /** 更新时间，毫秒时间戳 */
  updated_time?: string
}

export interface DataAssetFile {
  /** 文件token */
  token: string
  /** 文件内容类型 */
  mime_type: string
}

export interface DataAssetImportKnowledgeFile {
  /** 文件标题 */
  title?: string
  /** 上传文件获取到的token。和content二选一，优先使用token。 */
  token?: string
  /** 文件内容。和token二选一，优先使用token。有长度限制，大文件优先使用token方式。 */
  content?: string
  /** 文件内容对应的 MIME 类型，使用token方式必须填写 */
  mime_type?: string
  /** 文件源的URL */
  url?: string
}

export interface DataAssetImportKnowledgeHelpdesk {
  /** 飞书服务台ID */
  helpdesk_id: string
}

export interface DataAssetImportKnowledgeLarkDoc {
  /** 云文档类型 */
  type: 'doc' | 'file' | 'wiki' | 'docx' | 'folder'
  /** 云文档标识 */
  token: string
  /** 是否包含子文档，只有wiki类型的云文档支持 */
  with_sub_docs?: boolean
}

export interface DataAssetImportKnowledgeSetting {
  /** 知识切片配置 */
  chunk_setting?: DataAssetKnowledgeChunkSetting
  /** 知识导入-文件 */
  file?: DataAssetImportKnowledgeFile
  /** 知识导入-飞书云文档 */
  lark_doc?: DataAssetImportKnowledgeLarkDoc
  /** 知识导入-飞书知识空间 */
  lark_wiki_space?: DataAssetImportKnowledgeWiki
  /** 知识导入-飞书服务台 */
  lark_helpdesk?: DataAssetImportKnowledgeHelpdesk
}

export interface DataAssetImportKnowledgeWiki {
  /** 飞书知识空间ID */
  space_id: string
  /** 指定知识空间子节点时使用 */
  sub_docs?: DataAssetImportKnowledgeWikiSubDoc[]
  /** 知识空间URL */
  url?: string
}

export interface DataAssetImportKnowledgeWikiSubDoc {
  /** 云文档类型，只支持wiki中的云文档 */
  type: 'wiki'
  /** 云文档标识 */
  token: string
  /** 云文档链接 */
  url?: string
}

export interface DataAssetItem {
  /** 数据知识项ID */
  data_asset_item_id?: string
  /** 数据知识项标识 */
  api_name?: string
  /** 数据知识项标题 */
  label?: Record<string, string>
  /** 数据知识项描述 */
  description?: Record<string, string>
  /** 数据知识资源 */
  resources?: DataAssetResource[]
}

export interface DataAssetKnowledgeChunkSetting {
  /** 切片规则 */
  rule_type: 'separator' | 'intelligent'
  /** 切片分割符类型 */
  separate_type?: 'paragraph' | 'title'
  /** 分段最大长度（字符），按标识符切片时必须填写 */
  size?: number
  /** 分段重叠字符数，按标识符切片时必须填写，不能超过size的数值 */
  overlap?: number
}

export interface DataAssetResource {
  /** 数据知识资源ID */
  resource_id?: string
  /** 数据知识资源类型 */
  resource_type?: 'dataset' | 'vector'
}

export interface DataAssetTag {
  /** 数据知识分类名称 */
  data_asset_tag_id?: string
  /** 数据知识分类ID */
  name?: string
}

export interface DataengineI18n {
  /** 中文值 */
  zh_cn?: string
  /** 英文值 */
  en_us?: string
}

export interface DataPermission {
  /** 权限点ID */
  id?: string
  /** 权限点名称 */
  name?: I18n
  /** 数据权限状态 */
  select_status?: 0 | 1 | 2
}

export interface Datasource {
  /** 数据源编码 */
  code: string
  /** 数据源名称 */
  i18n_names: I18nContent[]
  /** 启停用状态 */
  active_status: 1 | 2
  /** 数据源字段列表 */
  fields: DatasourceField[]
  /** 数据源描述 */
  i18n_description?: I18nContent[]
  /** 数据期间类型（数据写入维度） */
  data_period_type?: 1 | 2 | 3
}

export const enum DataSource {
  /** 管理后台 */
  FEISHU_ADMIN = 1,
  /** 人事企业版 */
  CORE_HR = 2,
  /** SCIM */
  DIR_SYNC_VISA_SCIM = 3,
}

export interface DatasourceField {
  /** 数据源字段编码 */
  code: string
  /** 数据源字段名称 */
  i18n_names: I18nContent[]
  /** 字段类型 */
  field_type: 1 | 2 | 3 | 4 | 5
  /** 字段启停用状态 */
  active_status: 1 | 2
  /** 数据源字段描述 */
  i18n_description?: I18nContent[]
  /** 保留小数位数。目前只有number、money类型字段需要设置保留小数 */
  decimal_places?: number
}

export interface DatasourceRecord {
  /** 记录的启停用状态 */
  active_status: 1 | 2
  /** 记录的字段值列表 */
  field_values: DatasourceRecordField[]
}

export interface DatasourceRecordField {
  /** 数据源字段编码 */
  field_code: string
  /** 字段值 通过string传输，确保字段的值符合协议。  - money：金额  eg: "12.23"  超过设定精度会被四舍五入，目前只支持人民币¥元 - number：数值 eg: "12.87" 超过设定精度会被四舍五入 - text：文本 eg: "我是一段文本"。文本字符个数不允许超过500，一条记录的文本总的字符个数不允许超过3000. - date：日期 yyyy-MM-dd  eg: "2024-05-09" - percentage：百分比 "10" 代表10%，最多保留两位小数，超过后四舍五入 */
  value: string
  /** 字段类型 */
  field_type?: number
}

export interface DatasourceRecordFieldFilter {
  /** 查询条件的字段编码 */
  field_code: string
  /** 条件值列表 */
  field_values?: string[]
  /** 查询操作符 */
  operator?: 1 | 2
}

export interface DataSummaryDimension {
  /** 层级 */
  dimension_level?: number
  /** 类型 */
  dimension_type?: number
  /** 维度ID，需要再次转换 */
  dimension_value_id?: string
  /** 算薪项汇总维度时，当算薪项是特定枚举值，会使用该字段返回枚举值ID以及枚举值Key */
  enum_dimension?: EnumObject
  /** 维度名称，自定义维度使用 */
  dimension_names?: I18nContent[]
  /** 数据维度表头，自定义维度使用 */
  dimension_titles?: I18nContent[]
}

export interface DatetimeSetting {
  /** 日期显示格式 */
  format?: string
}

export interface DeleteEmployeeOptions {
  /** 资源转移方式 */
  resigned_employee_resource_receiver?: ResignedUserResouceReceiver
}

export interface DeleteGridColumnRequest {
  /** 删除列索引，从 0 开始，如 0 表示删除第一列（-1表示删除最后一列） */
  column_index: number
}

export interface DeleteRecord {
  /** 是否成功删除 */
  deleted?: boolean
  /** 删除的记录id */
  record_id?: string
}

export interface DeleteTableColumnsRequest {
  /** 列开始索引（区间左闭右开） */
  column_start_index: number
  /** 列结束索引（区间左闭右开） */
  column_end_index: number
}

export interface DeleteTableRowsRequest {
  /** 行开始索引（区间左闭右开） */
  row_start_index: number
  /** 行结束索引（区间左闭右开） */
  row_end_index: number
}

export interface Department {
  /** 部门名称 */
  name: string
  /** 国际化的部门名称 */
  i18n_name?: DepartmentI18nName
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
  status?: DepartmentStatus
  /** 部门负责人 */
  leaders?: DepartmentLeader[]
  /** 部门群雇员类型限制 */
  group_chat_employee_types?: number[]
  /** 部门HRBP */
  department_hrbps?: string[]
  /** 部门下主属用户的个数 */
  primary_member_count?: number
}

export interface DepartmentBaseInfo {
  /** 部门ID */
  department_id?: string
  /** i18n文本 */
  department_name?: I18nText
}

export interface DepartmentChange {
  /** 部门调整记录 ID */
  department_change_id?: string
  /** 部门 ID */
  department_id?: string
  /** 调整部门 ID ，调整审批未生效前会返回格式为 td_xxx 的临时 ID */
  draft_department_id?: string
  /** 调整类型 */
  department_change_type?: 'Unknown' | 'Create' | 'Modify' | 'Inactive'
  /** 调整状态 */
  department_change_status?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** 调整详细信息 */
  reorganization_info?: ReorganizationInfo
}

export interface DepartmentCreate {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 子类型 */
  sub_type?: Enum
  /** 部门负责人 */
  manager?: string
  /** 是否保密 */
  is_confidential?: boolean
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: HiberarchyCommon
  /** 生效时间 */
  effective_time: string
  /** 失效时间 */
  expiration_time?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 成本中心id */
  cost_center_id?: string
  /** 是否使用职务 */
  staffing_model?: Enum
}

export interface DepartmentHrbp {
  /** 部门 ID */
  department_id?: string
  /** 部门 HRBP 雇佣 ID */
  hrbp_ids?: string[]
}

export interface DepartmentI18nName {
  /** 部门的中文名 */
  zh_cn?: string
  /** 部门的日文名 */
  ja_jp?: string
  /** 部门的英文名 */
  en_us?: string
}

export interface DepartmentIdConvertResult {
  /** ID */
  id: string
  /** 部门ID */
  department_id?: string
  /** 部门OpenID */
  open_department_id?: string
}

export interface DepartmentLeader {
  /** 负责人类型 */
  leaderType: 1 | 2
  /** 负责人ID */
  leaderID: string
}

export interface DepartmentParentInfo {
  /** 部门 ID */
  department_id?: string
  /** 部门名称 */
  department_name?: I18n[]
  /** 上级部门 ID */
  parent_department_id?: string
  /** 是否启用 */
  active?: boolean
  /** 是否根部门 */
  is_root?: boolean
}

export interface DepartmentParents {
  /** 部门 ID */
  department_id?: string
  /** 父部门列表，部门按照至底向上的顺序返回 */
  parent_department_list?: DepartmentParentInfo[]
}

export interface DepartmentStatus {
  /** 是否被删除 */
  is_deleted?: boolean
}

export interface DepartmentTimeline {
  /** 部门 ID */
  id?: string
  /** 部门版本 ID */
  version_id?: string
  /** 部门名称 */
  names?: I18n[]
  /** 部门类型，枚举值可通过文档【飞书人事枚举常量】部门子类型（department_sub_type）枚举定义部分获得 */
  sub_type?: Enum
  /** 上级部门 ID */
  parent_department_id?: string
  /** 部门负责人雇佣 ID，枚举值及详细信息可通过【查询员工信息】接口查询获得 */
  manager?: string
  /** 编码 */
  code?: string
  /** 生效日期 */
  effective_date?: string
  /** 是否启用 */
  active?: boolean
  /** 描述 */
  descriptions?: I18n[]
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface DepartmentTree {
  /** 部门 ID */
  id?: string
  /** 部门层级 */
  level?: number
  /** 下级部门 ID 列表 */
  children?: string[]
}

export interface Dependent {
  /** 关系 */
  relationship: Enum
  /** 性别 */
  gender?: Enum
  /** 生日 */
  date_of_birth?: string
  /** 国籍 ID，可通过【查询国籍信息】接口查询 */
  nationality_id_v2?: string
  /** 证件号码 */
  national_id_list?: NationalId[]
  /** 配偶工作状态 */
  spouses_working_status?: Enum
  /** 包含家属医疗保险 */
  is_this_person_covered_by_health_insurance?: boolean
  /** 允许家属抵扣税款 */
  is_this_person_allowed_for_tax_deduction?: boolean
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
  /** 家庭成员姓名 */
  dependent_name?: string
  /** 工作单位 */
  employer?: string
  /** 岗位 */
  job?: string
  /** 电话 */
  phone?: Phone
  /** 联系地址 */
  address?: Address
  /** 出生证明 */
  birth_certificate_of_child?: File[]
}

export interface DependentForUpdate {
  /** 关系 */
  relationship: string
  /** 性别 */
  gender?: string
  /** 生日 */
  date_of_birth?: string
  /** 证件号码 */
  national_ids?: NationalIdForUpdate[]
  /** 配偶工作状态 */
  spouses_working_status?: string
  /** 包含家属医疗保险 */
  is_this_person_covered_by_health_insurance?: boolean
  /** 允许家属抵扣税款 */
  is_this_person_allowed_for_tax_deduction?: boolean
  /** 家庭成员姓名 */
  dependent_name?: string
  /** 工作单位 */
  employer?: string
  /** 岗位 */
  job?: string
  /** 电话 */
  phone?: PhoneForUpdate
  /** 联系地址 */
  address?: AddressForUpdate
}

export interface Device {
  /** 设施名称 */
  name: string
}

export interface Diagram {
  /** 绘图类型 */
  diagram_type?: 1 | 2
}

export interface DiData {
  /** 字段值 1. 单选： "1" 2. 多选："["1", "2"]" 3. 月份选择："{"date":"2022-01"}" 4. 年份选择："{"date":"2022"}" 5. 数字："123" 6. 单行文本："xxx " 7. 多行文本："xxx xxxx" 8. 日期范围 "[1688140800000,1688140800000]" */
  value?: string
  /** 字段属性 */
  object_attribute?: ObjectAttribute
}

export interface DiInfo {
  /** DI信息 ID */
  id?: string
  /** 投递ID */
  application_id?: string
  /** 人才ID */
  talent_id?: string
  /** 数据来源 */
  source_type?: 1 | 2 | 3
  /** 创建时间毫秒时间戳 */
  create_time?: string
  /** 更新时间毫秒时间戳 */
  update_time?: string
  /** 多元信息 */
  di_data?: DiData[]
}

export interface Dimension {
  /** 操作行还是列，取值：ROWS、COLUMNS */
  major_dimension?: string
  /** 起始行或者列号 */
  start_index?: number
  /** 结束行或者列号 */
  end_index?: number
}

export interface DimensionAbility {
  /** 能力项ID */
  id?: string
  /** 能力项名称 */
  name?: I18n
  /** 能力项描述 */
  description?: I18n
}

export interface DimensionAssessment {
  /** 对应模版中维度ID */
  interview_feedback_form_dimension_id?: string
  /** 维度名称 */
  dimension_name?: I18n
  /** 维度类型 */
  dimension_type?: 1 | 2 | 3 | 5 | 6 | 7 | 10 | 11 | 12
  /** 维度权重 */
  weight?: number
  /** 当维度类型为描述题时，从此取值 */
  dimension_content?: string
  /** 当维度类型为单选题时，从此取值 */
  dimension_option?: DimensionOption
  /** 当维度类型为多选题时，从此取值 */
  dimension_options?: DimensionOption[]
  /** 当维度评价方式为「打分题(填空)时」，从此取值 */
  dimension_score?: number
  /** 当维度为「职级建议」时，从此取值 */
  recommended_job_level?: RecommendedJobLevel
  /** 维度关联面试题 */
  question_assessments?: QuestionAssessment[]
}

export interface DimensionEntity {
  /** 维度key */
  dimension_key: string
  /** 维度值 */
  dimension_value: string
}

export interface DimensionIdInData {
  /** 维度 key */
  dimension_key?: string
  /** 维度 ids */
  dimension_ids?: string[]
}

export interface DimensionInfo {
  /** 维度id */
  id: string
  /** 维度名称 */
  name?: I18n[]
}

export interface DimensionInfoData {
  /** 维度 key */
  dimension_key?: string
  /** 维度信息 */
  dimension_info?: DimensionInfo
}

export interface DimensionOption {
  /** 选项ID */
  id?: string
  /** 选项名称 */
  name?: I18n
  /** 选项对应的分数 */
  score_val?: number
}

export interface DirectProjectLeaderRecordInfo {
  /** 评估人 ID */
  reviewer_id?: User
  /** 评估人作为直属项目上级所在的项目 */
  cooperation_projects?: CooperationProject[]
}

export interface DisableInformConfig {
  /** 是否覆盖子层级及会议室 */
  if_cover_child_scope?: boolean
  /** 禁用状态变更通知开关 */
  if_inform: boolean
  /** 通知成员列表 */
  informed_users?: SubscribeUser[]
  /** 通知部门列表 */
  informed_depts?: SubscribeDepartment[]
}

export interface DisplayApp {
  /** 多维表格 app token */
  app_token?: string
  /** 多维表格 App 名字 */
  name?: string
  /** 多维表格 App 版本号 */
  revision?: number
  /** 多维表格是否已开启高级权限 */
  is_advanced?: boolean
  /** 文档时区 */
  time_zone?: string
  /** 文档公式字段类型 */
  formula_type?: 1 | 2
  /** 文档高级权限版本 */
  advance_version?: 'v1' | 'v2'
}

export interface DisplayAppV2 {
  /** 多维表格 app token */
  app_token?: string
  /** 多维表格 App 名字 */
  name?: string
  /** 多维表格是否已开启高级权限 */
  is_advanced?: boolean
  /** 文档时区 */
  time_zone?: string
}

export interface District {
  /** 区/县 ID */
  district_id?: string
  /** 名称 */
  name?: I18n[]
  /** 所属城市 ID，详细信息可通过[查询城市信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search)接口获得 */
  city_id?: string
  /** 行政区划代码 */
  subregion_code?: string
  /** 状态 */
  status?: 1 | 0
}

export type Divider = unknown

export interface DocsBlock {
  /** BlockTypeID */
  block_type_id?: string
  /** block 的国际化信息 */
  i18n?: BlockI18nInfo[]
  /** 移动端 icon 链接 */
  mobile_icon_url?: string
  /** pc 端口 icon 链接 */
  pc_icon_url?: string
}

export interface DocsLink {
  /** 回复 at 云文档 */
  url: string
}

export interface Document {
  /** 文档唯一标识 */
  document_id?: string
  /** 文档版本 ID */
  revision_id?: number
  /** 文档标题 */
  title?: string
  /** 文档展示设置 */
  display_setting?: DocumentDisplaySetting
  /** 文档封面 */
  cover?: DocumentCover
}

export interface DocumentCover {
  /** 图片 token */
  token: string
  /** 展示视图在水平方向的偏移比例。其值为距离原图中心的水平方向偏移值 px / 原图宽度 px。 视图在原图中心时，该值为 0； 视图在原图右部分时，该值为正数； 视图在原图左部分时，改值为负数。 */
  offset_ratio_x?: number
  /** 展示视图在垂直方向的偏移比例。其值为距离原图中心的垂直方向偏移值 px / 原图高度 px。 视图在原图中心时，该值为 0； 视图在原图上部分时，该值为正数； 视图在原图下部分时，改值为负数。 */
  offset_ratio_y?: number
}

export interface DocumentDisplaySetting {
  /** 文档信息中是否展示文档作者 */
  show_authors?: boolean
  /** 文档信息中是否展示文档创建时间 */
  show_create_time?: boolean
  /** 文档信息中是否展示文档访问次数 */
  show_pv?: boolean
  /** 文档信息中是否展示文档访问人数 */
  show_uv?: boolean
  /** 文档信息中是否展示点赞总数 */
  show_like_count?: boolean
  /** 文档信息中是否展示评论总数 */
  show_comment_count?: boolean
  /** 文档信息中是否展示关联事项 */
  show_related_matters?: boolean
}

export interface DocxSource {
  /** 任务关联的文档token，要求：如果使用tenant_access_token请求，则请求机器人有文档编辑权限；如果使用user_access_token，则请求用户有文档的编辑权限 */
  token: string
  /** 任务关联的文档block_id，要求block_id存在于token对应文档中、且block_id没有绑定过其他的任务 */
  block_id: string
}

export interface Draft {
  /** 草稿 Id */
  draft_id?: string
  /** 实体词 */
  entity?: Entity
}

export interface DrivingEntity {
  /** 识别的字段种类 */
  type?: 'id_number' | 'name' | 'sex' | 'nationality' | 'address' | 'date_of_birth' | 'date_of_first_issue' | 'class' | 'valid_begin' | 'valid_end' | 'license_issuing_authority' | 'document_id' | 'record' | 'id_photo_location'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface DrvingLicense {
  /** 识别出的实体类型 */
  entities?: DrivingEntity[]
}

export interface Due {
  /** 截止时间/日期的时间戳，距1970-01-01 00:00:00的毫秒数。如果截止时间是一个日期，需要把日期转换成时间戳，并设置 is_all_day=true */
  timestamp?: string
  /** 是否截止到一个日期。如果设为true，timestamp中只有日期的部分会被解析和存储。 */
  is_all_day?: boolean
}

export interface EcoAccountCustomFieldData {
  /** 自定义字段的标识，同一 scope 内须唯一 */
  key: string
  /** 自定义字段的名称，用户在添加账号表单看到的控件标题 */
  name: I18n
  /** 是否必填 */
  is_required: boolean
  /** 自定义字段的描述，用户在添加账号表单看到的 place holder */
  description?: I18n
}

export interface EcoBackgroundCheckCustomFieldData {
  /** 自定义字段类型 */
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'multiselect' | 'date' | 'file' | 'resume'
  /** 自定义字段的标识，在同一账号内唯一 */
  key: string
  /** 自定义字段的名称，用户在安排背调表单看到的控件标题 */
  name: I18n
  /** 是否必填 */
  is_required: boolean
  /** 自定义字段的描述，如果是输入控件，为用户在安排背调表单看到的 placeholder 或 提示文字 */
  description?: I18n
  /** type 为 select 或 multiselect 时必填，单选或多选的选项 */
  options?: EcoBackgroundCheckCustomFieldDataOption[]
}

export interface EcoBackgroundCheckCustomFieldDataOption {
  /** 选项的 key */
  key: string
  /** 选项的名称 */
  name: I18n
}

export interface EcoBackgroundCheckPackageAdditionalItem {
  /** 附件调查项 ID */
  id: string
  /** 附加调查项名称 */
  name: string
  /** 附加调查项描述 */
  description?: string
}

export interface EcoBackgroundCheckPackageData {
  /** 套餐 ID */
  id: string
  /** 背调名称 */
  name: string
  /** 套餐描述 */
  description?: string
}

export interface EcoBackgroundCheckReportFile {
  /** 报告名称 */
  report_name: string
  /** 报告地址；报告地址类型为空或为1时需为可下载 pdf 的链接；为2时为预览型链接 */
  report_url: string
  /** 报告地址类型；枚举值 1 或为空时为可下载的 pdf 链接，2 为预览型链接 */
  report_url_type?: 1 | 2
}

export interface EcoExamLoginInfo {
  /** 笔试链接 */
  exam_url: string
  /** 用户名 */
  username?: string
  /** 密码 */
  password?: string
}

export interface EcoExamPaperData {
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

export interface EcoExamResultDetail {
  /** 评价 ID */
  id?: string
  /** 评价名称 */
  name: string
  /** 评价结果 */
  result: string
}

export interface EcoExamResultReport {
  /** 报告名称 */
  name: string
  /** 报告链接 */
  url: string
  /** 作答完成时间(毫秒时间戳) */
  answer_time?: string
}

export interface Education {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  school?: string
  major?: string
  degree?: 1 | 2 | 3
  start?: string
  end?: string
}

export interface EducationInfo {
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
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export type EeKunlunCommonI18nI18nText = Record<EeKunlunCommonI18nLanguageCode, string>

export type EeKunlunCommonI18nLanguageCode = string

export interface Email {
  /** 邮箱地址 */
  email: string
  /** 是否为主要邮箱 */
  is_primary?: boolean
  /** 是否为公开邮箱 */
  is_public?: boolean
  /** 邮箱用途，枚举值可通过文档【飞书人事枚举常量】邮箱用途（email_usage）枚举定义获得 */
  email_usage?: Enum
}

export interface EmailAlias {
  /** 主邮箱地址 */
  primary_email?: string
  /** 邮箱别名 */
  email_alias?: string
}

export interface EmailForUpdate {
  /** 邮箱地址 */
  email: string
  /** 是否为主要邮箱,若有多个邮箱，只能有一个邮箱的「is_primary」为true */
  is_primary: boolean
  /** 是否为公开邮箱 */
  is_public: boolean
  /** 邮箱用途，枚举值可通过文档【飞书人事枚举常量】邮箱用途（email_usage）枚举定义获得 */
  email_usage: string
}

export interface EmergencyContact {
  name?: string
  relationship?: 1 | 2 | 3 | 4 | 5 | 6
  mobile?: string
}

export interface EmergencyContactForUpdate {
  /** 紧急联系人姓名 */
  legal_name?: string
  /** 紧急联系人与本人亲属关系，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可：- object_api_name = "emergency_contact" - custom_api_name = "relationship" */
  relationship?: string
  /** 电话 */
  phones?: PhoneForUpdate[]
  /** 地址 */
  address?: AddressForUpdate
  /** 邮箱 */
  email?: EmailForUpdate
}

export interface Emoji {
  /** emoji类型 */
  emoji_type: string
}

export interface Employee {
  /** user_id转换 */
  user_id?: string
  /** 系统字段 */
  system_fields?: SystemFields
  /** 自定义字段 */
  custom_fields?: CustomFields[]
}

export const enum EmployeeActiveStatusDirectory {
  /** 未激活 */
  EmployeeActiveStatusDirectoryUnregister = 1,
  /** 激活 */
  EmployeeActiveStatusDirectoryRegister = 2,
  /** 冻结 */
  EmployeeActiveStatusDirectoryFrozen = 3,
  /** 主动退出 */
  EmployeeActiveStatusDirectoryQuit = 4,
  /** 未加入 */
  EmployeeActiveStatusDirectoryUnjoined = 5,
}

export interface EmployeeBaseEntity {
  /** EmployeeID 和UserID一致 */
  employee_id: string
  /** 姓名 */
  name: Name
  /** 手机号 */
  mobile?: string
  /** 登录邮箱 */
  email?: string
  /** 企业邮箱 */
  enterprise_email?: string
  /** 性别 */
  gender?: GenderDirectory
  /** 部门信息 */
  departments?: Department[]
  /** 用户在部门内的排序信息， 第一个部门为主部门 */
  employee_order_in_departments?: UserDepartmentSortInfo[]
  /** 个人签名 */
  description?: string
  /** 用户活跃状态 */
  active_status?: EmployeeActiveStatusDirectory
  /** 是否离职 */
  is_resigned?: boolean
  /** 直属上级ID */
  leader_id?: string
  /** 虚线上级ID */
  dotted_line_leader_ids?: string[]
  /** 是否租户超级管理员 */
  is_primary_admin?: boolean
  /** 企业邮箱别名 */
  enterprise_email_aliases?: string[]
  /** 自定义字段值 */
  custom_field_values?: CustomFieldValue[]
  /** 员工部门全路径节点 本字段不含根部门信息，部门顺序为父部门->当前部门 例如：三级部门为员工当前部门[[DepartmentBaseInfo{1,一级部门},DepartmentBaseInfo{2,二级部门}, DepartmentBaseInfo{3,三级部门}]] */
  department_path_infos?: DepartmentBaseInfo[][]
  /** 离职时间 管理后台进行离职操作的时间，系统自动生成，无法写入 */
  resign_time?: string
  /** 头像url */
  avatar?: ImageLink
  /** 自定义背景图 url */
  background_image?: string
  /** 是否租户普通管理员 */
  is_admin?: boolean
  /** 数据来源 */
  data_source?: DataSource
  /** 员工Geo */
  geo_name?: string
  /** 员工license */
  subscription_ids?: string[]
}

export interface EmployeeConversionInfo {
  /** 实际转正日期 */
  actual_conversion_time?: number
}

export interface EmployeeCostAllocation {
  /** 员工id */
  employment_id?: string
  /** 成本分摊 */
  cost_allocations?: EmploymentCostAllocation[]
}

export interface EmployeeDefaultCostCenter {
  /** 用户id */
  employment_id?: string
  /** 默认成本中心 */
  default_cost_centers?: EmploymentDefaultCostCenter[]
}

export interface EmployeeEntity {
  /** 员工基础信息 */
  base_info?: EmployeeBaseEntity
  /** 员工工作信息 */
  work_info?: EmployeeWorkEntity
}

export interface EmployeeIdConvertResult {
  /** ID */
  id: string
  /** 员工ID */
  employee_id?: string
  /** 员工OpenID */
  open_employee_id?: string
  /** 员工UnionID */
  union_employee_id?: string
}

export interface EmployeeJobData {
  /** Employment ID */
  employment_id: string
  /** 实体在 CoreHR 内部的唯一键 */
  job_datas?: JobData[]
}

export interface EmployeeOverboardInfo {
  /** 实际离职日期 */
  actual_overboard_time?: number
  /** 离职原因 */
  overboard_note?: string
}

export interface EmployeesAdditionalJob {
  /** 兼职记录ID */
  id?: string
  /** 人员类型 ID，可通过[【查询单个人员类型】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/get)获取详细信息 */
  employee_type_id: string
  /** 工时制度 ID，可通过[【查询单个工时制度】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/get)获取详细信息 */
  working_hours_type_id?: string
  /** 工作地点 ID，可通过[【查询单个地点】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/get)获取详细信息 */
  work_location_id?: string
  /** 部门 ID，可通过[【查询单个部门】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/get)获取详细信息；类型与department_id_type一致 */
  department_id: string
  /** 职务 ID，可通过[【查询单个职务】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/get)获取详细信息 */
  job_id?: string
  /** 职级 ID，可通过[【查询单个职级】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/get)获取详细信息 */
  job_level_id?: string
  /** 序列 ID，可通过[【查询单个序列】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/get)获取详细信息 */
  job_family_id?: string
  /** 雇佣 ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  employment_id: string
  /** 兼职开始日期 */
  start_date: string
  /** 兼职结束日期 */
  end_date?: string
  /** 直属上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  direct_manager_id?: string
  /** 虚线上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  dotted_line_manager_id?: string
  /** 排班类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "work_shift" */
  work_shift?: Enum
  /** 薪资类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "compensation_type" */
  compensation_type?: Enum
  /** 任职公司，可通过[【查询单个公司】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/get)获取详细信息 */
  service_company?: string
  /** 周工作时长【0~168】 */
  weekly_working_hours?: string
  /** 工作日历ID，可通过[【查询工作日历】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取详细信息 */
  work_calendar_id?: string
  /** 岗位 ID */
  position_id?: string
  /** 人员子类型 ID */
  employee_subtype_id?: string
}

export interface EmployeesAdditionalJobBatchReqDate {
  /** 开始 */
  start: string
  /** 结束 */
  end: string
}

export interface EmployeesAdditionalJobWriteResp {
  /** 兼职记录ID */
  id?: string
  /** 人员类型 ID，可通过[【查询单个人员类型】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/get)获取详细信息 */
  employee_type_id: string
  /** 工时制度 ID，可通过[【查询单个工时制度】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/get)获取详细信息 */
  working_hours_type_id?: string
  /** 工作地点 ID，可通过[【查询单个地点】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/get)获取详细信息 */
  work_location_id?: string
  /** 部门 ID，可通过[【查询单个部门】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/get)获取详细信息；类型与department_id_type一致 */
  department_id: string
  /** 职务 ID，可通过[【查询单个职务】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/get)获取详细信息 */
  job_id?: string
  /** 职级 ID，可通过[【查询单个职级】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/get)获取详细信息 */
  job_level_id?: string
  /** 序列 ID，可通过[【查询单个序列】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/get)获取详细信息 */
  job_family_id?: string
  /** 雇佣 ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  employment_id: string
  /** 兼职开始日期 */
  start_date: string
  /** 兼职结束日期 */
  end_date?: string
  /** 直属上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  direct_manager_id?: string
  /** 虚线上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  dotted_line_manager_id?: string
  /** 排班类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "work_shift" */
  work_shift?: Enum
  /** 薪资类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "compensation_type" */
  compensation_type?: Enum
  /** 任职公司，可通过[【查询单个公司】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/get)获取详细信息 */
  service_company?: string
  /** 周工作时长【0~168】 */
  weekly_working_hours?: string
  /** 工作日历ID，可通过[【查询工作日历】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取详细信息 */
  work_calendar_id?: string
  /** 岗位 ID */
  position_id?: string
  /** 人员子类型 ID */
  employee_subtype_id?: string
}

export const enum EmployeeStaffStatusDirectory {
  /** 在职 */
  EmployeeStaffStatusDirectoryUnResigned = 1,
  /** 离职 */
  EmployeeStaffStatusDirectoryResigned = 2,
  /** 待入职 */
  EmployeeStaffStatusDirectoryPreEntry = 3,
  /** 取消入职 */
  EmployeeStaffStatusDirectoryCancelledEntry = 4,
  /** 待离职 */
  EmployeeStaffStatusDirectoryPreResigned = 5,
}

export interface EmployeeType {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 名称 */
  name: I18n[]
  /** 默认雇员类型 */
  default_employee_type: boolean
  /** 启用 */
  active: boolean
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export type EmployeeTypeDirectory = number

export interface EmployeeTypeEnum {
  /** 枚举值id */
  enum_id?: string
  /** 枚举值 */
  enum_value?: string
  /** 枚举内容 */
  content: string
  /** 类型 */
  enum_type: 1 | 2
  /** 类型 */
  enum_status: 1 | 2
  /** i18n定义 */
  i18n_content?: I18nContent[]
}

export interface EmployeeV2 {
  /** 员工 ID */
  id?: string
  /** 投递 ID */
  application_id?: string
  /** 入职状态 */
  onboard_status?: 1 | 2
  /** 转正状态 */
  conversion_status?: 1 | 2
  /** 实际入职时间 */
  onboard_time?: string
  /** 预期转正时间 */
  expected_conversion_time?: string
  /** 实际转正时间 */
  actual_conversion_time?: string
  /** 离职时间 */
  overboard_time?: string
  /** 离职原因 */
  overboard_note?: string
  /** 办公地点 */
  onboard_city_code?: string
  /** 入职部门 ID */
  department_id?: string
  /** 直属上级 ID */
  leader_id?: string
  /** 序列 ID */
  sequence_id?: string
  /** 职级 ID */
  level_id?: string
  /** 员工类型 */
  employee_type?: string
  /** 招聘需求ID */
  job_requirement_id?: string
}

export interface EmployeeWorkEntity {
  /** 工作地国家/地区 */
  work_country_or_region?: string
  /** 地点 */
  work_place?: Place
  /** i18n文本 */
  work_station?: I18nText
  /** 工号 */
  job_number?: string
  /** 分机号 */
  extension_number?: string
  /** 入职日期 2007-03-20 */
  join_date?: string
  /** 员工类型 */
  employment_type?: EmployeeTypeDirectory
  /** 员工人事状态 */
  staff_status?: EmployeeStaffStatusDirectory
  /** 职务 */
  job_title?: JobTitle
  /** 职级 */
  job_level?: JobLevel
  /** 序列 */
  job_family?: JobFamily
  /** 离职日期 2007-03-20 */
  resign_date?: string
  /** 离职原因 */
  resign_reason?: ResignReasonDirectory
  /** 离职备注 */
  resign_remark?: string
  /** 离职类型 */
  resign_type?: ResignTypeDirectory
}

export interface Employment {
  /** 待入职ID */
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
  employment_type: Enum
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
  employment_status?: Enum
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 工作邮箱列表 */
  work_email_list?: Email[]
  /** 邮箱 */
  email_address?: string
  /** 离职原因 */
  reason_for_offboarding?: Enum
  /** 成本中心列表 */
  cost_center_list?: JobDataCostCenter[]
  /** 招聘应用 ID */
  ats_application_id?: string
  /** 任职公司 */
  service_company?: string
  /** 薪资类型 */
  compensation_type?: Enum
  /** 排班类型 */
  work_shift?: Enum
}

export interface EmploymentBp {
  /** 员工雇佣 ID */
  employment_id?: string
  /** 员工直属 HRBP 雇佣 ID，若员工是部门负责人，且同部门 HRBP 在权限中配置了 HRBP 不可见部门负责人，则在结果中不会出现该 HRBP */
  hrbp_ids?: string[]
  /** 员工直属属地 BP 雇佣 ID */
  location_bp_ids?: string[]
}

export interface EmploymentCostAllocation {
  /** id */
  wk_id: string
  /** 分摊生效日期 */
  effective_time?: string
  /** 分摊失效日期 */
  expiration_time?: string
  /** 成本分摊 */
  job_data_cost_center_id?: JobDataCostCenter[]
  /** 变更原因 */
  reason?: string
}

export interface EmploymentCreate {
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
  employment_type: Enum
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
  employment_status?: Enum
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 工作邮箱列表 */
  work_email_list?: Email[]
  /** 邮箱 */
  email_address?: string
  /** 离职原因 */
  reason_for_offboarding?: Enum
  /** 成本中心列表 */
  cost_center_list?: JobDataCostCenter[]
  /** 招聘应用 ID */
  ats_application_id?: string
  /** 是否离职重聘 */
  rehire?: Enum
  /** 历史雇佣信息 ID */
  rehire_employment_id?: string
}

export interface EmploymentDefaultCostCenter {
  /** id */
  wk_id: string
  /** id */
  wk_tid: string
  /** 生效日期 */
  effective_time?: string
  /** 成本中心id */
  cost_center_id?: string
  /** 是否继承自岗位/部门的默认成本中心 */
  is_inherit?: boolean
  /** 变更原因 */
  reason?: string
}

export interface EmploymentLeaveBalance {
  /** 雇佣信息ID */
  employment_id: string
  /** 员工姓名 */
  employment_name: I18n[]
  /** 余额查看日期 */
  as_of_date: string
  /** 假期余额列表 */
  leave_balance_list: LeaveBalance[]
}

export interface Entity {
  /** 实体词 Id */
  id?: string
  /** 词条名 */
  main_keys: Term[]
  /** 别名 */
  aliases?: Term[]
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
  related_meta?: RelatedMeta
  /** 统计数据 */
  statistics?: Statistics
  /** 外部 id 关联数据 */
  outer_info?: OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
  /** 词条的创建来源，1：用户主动创建，2：批量导入，3：官方词，4：OpenAPI 创建 */
  source?: number
  /** 国际化的词条释义 */
  i18n_descs?: I18nEntryDesc[]
}

export interface EntityInfo {
  /** 实体code */
  code?: string
  /** 实体名称 */
  name?: I18n
}

export interface EntityWord {
  /** 抽取出的词条名 */
  name: string
  /** 词条可能的推荐别名 */
  aliases?: string[]
}

export interface Enum {
  /** 枚举值 */
  enum_name: string
  /** 枚举多语展示 */
  display?: I18n[]
}

export interface EnumField {
  /** ApiName */
  api_name?: string
  /** 枚举值名 */
  name?: I18n[]
  /** 枚举值描述 */
  description?: I18n[]
  /** 所属枚举常量ApiName */
  enum_api_name?: string
  /** 顺序 */
  order?: number
  /** 状态 */
  status?: 1 | 0
}

export interface EnumFieldOption {
  /** 枚举值选项 API Name，即选项的唯一标识 */
  option_api_name: string
  /** 选项名称（需填写至少一个语种） */
  name: Name
}

export interface EnumObject {
  /** 枚举对象ID */
  enum_value_id?: string
  /** 枚举对象 */
  enum_key?: string
}

export interface Enums {
  /** 枚举名称 */
  enum_apiname?: string
  /** 枚举值 */
  enum_items?: EnumField[]
}

export interface EnumValue {
  /** 选项结果ID */
  enum_ids: string[]
  /** 选项类型 */
  enum_type: CustomFieldValueEnumType
}

export interface EnvironmentVariable {
  /** 环境变量 API 名称 */
  api_name: string
  /** 环境变量的名称 */
  label: Label
  /** 描述 */
  description: string
  /** 返回 json marshal 后的字符串。 isEncrypted 为 「true」时，依然可以获取返回值。 */
  value: string
  /** 是否加密，「type 」取值为 text, float 时才有效 */
  is_encrypted?: boolean
  /** 对象的 API 名称，「type 」取值为 lookup, lookup_multi 时才有效 */
  object_api_name?: string
  /** 对象的名称，「type 」取值为 lookup, lookup_multi 时才有效 */
  object_label?: Label
  /** 「创建时间」，日期时间字段。 使用 Unix 时间戳 */
  created_at?: number
  /** 「更新时间」，日期时间字段。 使用 Unix 时间戳 */
  updated_at: number
  /** 环境变量的类型，可取值范围有：lookup, lookup_multi */
  type?: string
}

export interface EnvironmentVariableFilter {
  /** 模糊查询关键词 */
  quick_query?: string
}

export interface Equation {
  /** 符合 KaTeX 语法的公式内容，语法规则请参考：https://katex.org/docs/supported.html */
  content: string
  /** 文本局部样式 */
  text_element_style?: TextElementStyle
}

export interface Evaluation {
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
  commit_status?: 1 | 2
  /** 评估结论 */
  conclusion?: 1 | 2
  /** 评估详情 */
  content?: string
  /** 创建时间 */
  create_time?: string
  /** 最近更新时间 */
  update_time?: string
}

export interface EvaluationTask {
  /** 评估 ID */
  id?: string
  /** 职位 ID */
  job_id?: string
  /** 人才 ID */
  talent_id?: string
  /** 投递 ID */
  application_id?: string
  /** 任务状态 */
  activity_status?: 1 | 2 | 3
}

export interface Event {
  /** event type */
  type: string
  /** event subtype */
  subtype: string
}

export interface EventLocation {
  /** 地点名称 */
  name?: string
  /** 地点地址 */
  address?: string
  /** 地点坐标纬度信息，对于国内的地点，采用GCJ-02标准，海外地点采用WGS84标准 */
  latitude?: number
  /** 地点坐标经度信息，对于国内的地点，采用GCJ-02标准，海外地点采用WGS84标准 */
  longitude?: number
}

export interface EventOrganizer {
  /** 日程组织者user ID */
  user_id?: string
  /** 日程组织者姓名 */
  display_name?: string
}

export interface EventSearchFilter {
  /** 搜索过滤项，日程搜索区间的开始时间，被搜索日程的事件必须与搜索区间有交集 */
  start_time?: TimeInfo
  /** 搜索过滤项，日程搜索区间的结束时间，被搜索日程的事件必须与搜索区间有交集 */
  end_time?: TimeInfo
  /** 搜索过滤项，参与人的用户ID列表，被搜索日程中必须包含至少一个其中的参与人 */
  user_ids?: string[]
  /** 搜索过滤项，会议室ID列表，被搜索日程中必须包含至少一个其中的会议室 */
  room_ids?: string[]
  /** 搜索过滤项，群ID列表，被搜索日程的参与人中必须包含至少一个其中的群 */
  chat_ids?: string[]
}

export interface ExamMarkingTask {
  /** 笔试 ID */
  id?: string
  /** 职位 ID */
  job_id?: string
  /** 人才 ID */
  talent_id?: string
  /** 投递 ID */
  application_id?: string
  /** 任务状态 */
  activity_status?: 1 | 2
}

export interface ExportTask {
  /** 导出文件扩展名 */
  file_extension: 'docx' | 'pdf' | 'xlsx' | 'csv'
  /** 导出文档类型 */
  type: 'doc' | 'sheet' | 'bitable' | 'docx'
  /** 导出文件名 */
  file_name?: string
  /** 导出文件产物 Token */
  file_token?: string
  /** 导出文件大小 */
  file_size?: number
  /** 任务失败原因 */
  job_error_msg?: string
  /** 任务状态 */
  job_status?: 0 | 1 | 2 | 3 | 107 | 108 | 109 | 110 | 111 | 122 | 123 | 6000
}

export interface Expression {
  /** 字段名 */
  field: string
  /** 运算符 */
  operator: Operator
  /** 字段值 */
  value: Value
}

export interface ExteranlInstanceCheck {
  /** 审批实例 id */
  instance_id: string
  /** 审批实例最近更新时间 */
  update_time: string
  /** 任务信息 */
  tasks: ExternalInstanceTask[]
}

export interface ExteranlInstanceCheckResponse {
  /** 审批实例 id */
  instance_id: string
  /** 任务最近更新时间 */
  update_time?: string
  /** 任务信息 */
  tasks?: ExternalInstanceTask[]
}

export interface ExternalApplication {
  /** 外部投递 ID */
  id?: string
  /** 职位招聘类型 */
  job_recruitment_type?: 1 | 2
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
  delivery_type?: 1 | 2 | 3 | 4
  /** 更新时间，招聘系统内用作投递在外部系统终止时间 */
  modify_time?: number
  /** 投递在外部系统创建时间 */
  create_time?: number
  /** 终止类型 */
  termination_type?: string
}

export interface ExternalBackgroundCheck {
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
  /** 背调附件 */
  attachment_list?: ExternalBackgroundCheckAttachment[]
}

export interface ExternalBackgroundCheckAttachment {
  /** 附件 ID */
  id?: string
  /** 附件名字 */
  name?: string
  /** 附件大小 */
  size?: number
}

export interface ExternalCommonAttachment {
  /** 附件 ID */
  id?: string
  /** 附件名字 */
  name?: string
  /** 附件大小 */
  size?: number
}

export interface ExternalInstance {
  /** 审批定义 code， 创建审批定义返回的值，表示该实例属于哪个流程；该字段会影响到列表中该实例的标题，标题取自对应定义的 name 字段 */
  approval_code: string
  /** 审批实例状态 */
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED' | 'DELETED' | 'HIDDEN' | 'TERMINATED'
  /** 审批实例扩展 JSON */
  extra?: string
  /** 审批实例唯一标识，用户自定义，需确保证租户、应用下唯一 */
  instance_id: string
  /** 审批实例链接集合 ，用于【已发起】列表的跳转，跳转回三方系统； pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
  links: ExternalInstanceLink
  /** 审批展示名称，如果填写了该字段，则审批列表中的审批名称使用该字段，如果不填该字段，则审批名称使用审批定义的名称 */
  title?: string
  /** 用户提交审批时填写的表单数据，用于所有审批列表中展示。可传多个值，但审批中心pc展示前2个,移动端展示前3个,长度不超过2048字符 */
  form?: ExternalInstanceForm[]
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
  display_method?: 'BROWSER' | 'SIDEBAR' | 'NORMAL' | 'TRUSTEESHIP'
  /** 更新方式， 当 update_mode=REPLACE时，每次都以当前推送的数据为最终数据，会删掉审批中心中多余的任务、抄送数据（不在这次推送的数据中）; 当 update_mode=UPDATE时，则不会删除审批中心的数据，而只是进行新增和更新实例、任务数据 */
  update_mode?: 'REPLACE' | 'UPDATE'
  /** 任务列表 */
  task_list?: ExternalInstanceTaskNode[]
  /** 抄送列表 */
  cc_list?: CcNode[]
  /** 国际化文案 */
  i18n_resources: I18nResource[]
  /** 单据托管认证token，托管回调会附带此token，帮助业务方认证 */
  trusteeship_url_token?: string
  /** 用户的类型，会影响请求参数用户标识域的选择，包括加签操作回传的目标用户， 目前仅支持 "user_id" */
  trusteeship_user_id_type?: string
  /** 单据托管回调接入方的接口的URL地址 */
  trusteeship_urls?: TrusteeshipUrls
  /** 托管预缓存策略 */
  trusteeship_cache_config?: TrusteeshipInstanceCacheConfig
  /** 资源所在地区， 内部统计用字段， 不需要填 */
  resource_region?: string
}

export interface ExternalInstanceForm {
  /** 表单字段名称 */
  name?: string
  /** 表单值 */
  value?: string
}

export interface ExternalInstanceLink {
  /** pc 端的跳转链接，当用户使用飞书 pc 端时，使用该字段进行跳转 */
  pc_link: string
  /** 移动端 跳转链接，当用户使用飞书 移动端时，使用该字段进行跳转 */
  mobile_link?: string
}

export interface ExternalInstanceTask {
  /** 任务 id */
  task_id: string
  /** 任务最近更新时间 */
  update_time: string
}

export interface ExternalInstanceTaskNode {
  /** 审批实例内的唯一标识，用于更新审批任务时定位数据 */
  task_id: string
  /** 审批人 user_id，该任务会出现在审批人的【待审批】或【已审批】列表中 */
  user_id?: string
  /** 审批人 open id，和 user id 二选一 */
  open_id?: string
  /** 审批任务名称 */
  title?: string
  /** 【待审批】或【已审批】中使用的跳转链接，用于跳转回三方系统pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
  links: ExternalInstanceLink
  /** 任务状态 */
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'TRANSFERRED' | 'DONE'
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
  action_configs?: ActionConfig[]
  /** 列表页打开审批任务的方式 */
  display_method?: 'BROWSER' | 'SIDEBAR' | 'NORMAL' | 'TRUSTEESHIP'
  /** 三方任务支持不纳入效率统计 */
  exclude_statistics?: boolean
  /** 节点id */
  node_id?: string
  /** 节点名称，示例：i18n@name。需要在i18n_resources中传该名称对应的国际化文案 */
  node_name?: string
  /** 任务生成类型 */
  generate_type?: 'EXTERNAL_CONSIGN' | 'DEFAULT'
}

export interface ExternalInterview {
  /** 外部投递 ID */
  external_application_id: string
  /** 外部面试 ID */
  id?: string
  /** 参与状态 */
  participate_status?: 1 | 2 | 3
  /** 开始时间 */
  begin_time?: number
  /** 结束时间 */
  end_time?: number
  /** 面试评价列表 */
  interview_assessments?: ExternalInterviewAssessment[]
}

export interface ExternalInterviewAssessment {
  /** 面试官姓名 */
  username?: string
  /** 面试结果 */
  conclusion?: 1 | 2 | 3
  /** 评价维度列表 */
  assessment_dimension_list?: ExternalInterviewAssessmentDimension[]
  /** 综合记录 */
  content?: string
}

export interface ExternalInterviewAssessmentDimension {
  /** 打分题分数（当题目类型为「打分题」时使用） */
  score?: number
  /** 单选选项（当题目类型为「单选题」时使用） */
  option?: string
  /** 多选选项（当题目类型为「多选题」时使用） */
  options?: string[]
  /** 描述内容（当题目类型为「描述题」时使用） */
  content?: string
  /** 题目类型 */
  assessment_type?: 1 | 2 | 3 | 4
  /** 题目标题 */
  title?: string
  /** 题目描述 */
  description?: string
}

export interface ExternalOffer {
  /** 外部 Offer ID */
  id?: string
  /** 外部投递 ID */
  external_application_id: string
  /** Offer 创建时间，毫秒时间戳 */
  biz_create_time?: string
  /** Offer 负责人 */
  owner?: string
  /** Offer 状态 */
  offer_status?: string
  /** Offer 附件列表 */
  attachment_list?: ExternalCommonAttachment[]
}

export interface ExternalTaskItem {
  /** 审批任务 ID */
  id: string
  /** 审批任务状态 */
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'TRANSFERRED' | 'DONE'
  /** 审批任务最后更新时间，单位 毫秒 */
  update_time: string
}

export interface ExternalTaskList {
  /** 审批实例 ID */
  instance_id: string
  /** 审批的id */
  approval_id: string
  /** 审批对应的 approval_code */
  approval_code: string
  /** 审批实例当前的状态 */
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED' | 'DELETED' | 'HIDDEN'
  /** 审批实例最后更新时间，单位 毫秒 */
  update_time: string
  /** 审批实例下的审批任务 */
  tasks?: ExternalTaskItem[]
}

export interface ExtractCopy {
  /** 盖章份数 */
  copy_num?: number
  /** 从原文中抽取的盖章份数 */
  original_copy?: string
  /** 盖章文件类型 */
  key?: string
  /** 原文有关盖章份数的描述 */
  text?: string
}

export interface ExtractCurrency {
  /** 币种名称 */
  currency_name?: string
  /** 币种符号 */
  currency_text?: string
}

export interface ExtractPrice {
  /** 交易金额 */
  contract_price?: number
  /** 从原文中抽取的交易金额 */
  contract_price_original?: string
  /** 原文中描述交易金额的文字 */
  text?: string
}

export interface ExtractTerm {
  /** 合同持续时长 */
  initial_time?: string
  /** 持续时长单位 */
  initial_unit?: string
}

export interface ExtractTime {
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
  initial_term?: ExtractTerm
  /** 原文中关于持续时间的描述 */
  text_initial_term?: string
}

export interface FailedReason {
  /** 错误码 */
  error_code?: number
  /** 错误信息 */
  error_message?: string
  /** 用户id */
  user_id?: string
}

export interface Faq {
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
  answer_richtext?: Richtext[]
  /** create time */
  create_time?: number
  /** update time */
  update_time?: number
  /** list of categories that faq belongs to */
  categories?: Category[]
  /** faq tags */
  tags?: string[]
  /** expire time */
  expire_time?: number
  /** update user */
  update_user?: TicketUser
  /** create user */
  create_user?: TicketUser
}

export interface FaqCreateInfo {
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

export interface FaqUpdateInfo {
  /** faq category id */
  category_id?: string
  /** faq question */
  question: string
  /** faq answer */
  answer?: string
  /** faq answer in richtext */
  answer_richtext?: Richtext[]
  /** faq tags */
  tags?: string[]
}

export interface Feature {
  /** 卡号 */
  card?: number
}

export interface Field {
  /** 统计数据父字段code */
  code: string
  /** 统计数据父字段名称 */
  title: string
  /** 统计数据子字段 */
  child_fields?: ChildField[]
}

export interface FieldGroup {
  /** 可写权限的表单项的 id列表 */
  writable: string[]
  /** 可读权限的表单项的 id列表 */
  readable: string[]
}

export type FieldName = string

export interface FieldVariableSubVlaue {
  /** 用于关联list和record类型变量值中的key */
  key?: string
  /** 变量值 */
  value?: FieldVariableValueTo
}

export interface FieldVariableSubVlaueForReview {
  /** 用于关联list和record类型变量值中的key */
  key?: string
  /** 变量值 */
  value?: FieldVariableValueToForReview
}

export interface FieldVariableValue {
  /** 变量唯一标识 */
  variable_api_name?: string
  /** 变量名称 */
  variable_name?: FieldVariableValueI18n
  /** 变量值 */
  variable_value?: FieldVariableValueTo
  /** 在list_values和record_values中引用的变量 */
  sub_values?: FieldVariableSubVlaue[]
}

export interface FieldVariableValueI18n {
  /** 中文值 */
  zh_cn?: string
  /** 英文值 */
  en_us?: string
}

export interface FieldVariableValueTo {
  /** 文本值 */
  text_value?: string
  /** 布尔值 */
  bool_value?: boolean
  /** 数字值 */
  number_value?: string
  /** 枚举值，这里是枚举的id */
  enum_value?: string
  /** 从 1970 开始的天数 */
  date_value?: string
  /** 时间戳，毫秒 */
  date_time_value?: string
  /** 多语字段值 */
  i18n_value?: FieldVariableValueI18n
  /** 对象值，包括对象id和对象类型 */
  object_value?: FieldVariableValueToObject
  /** 用户id，根据user_type选择对应的用户id */
  user_value?: string
  /** 部门id，根据入参选择对应的部门id */
  department_value?: string
  /** 记录类型字段值 */
  record_values?: FieldVariableValueToRecord[]
  /** 员工类型字段值，为用户id，根据入参选择返回的用户id */
  employment_value?: string
  /** 数组类型值，里面包含多个值，每个元素都对应subValues中的数组下标 */
  list_values?: string[]
  /** 文件类型字段值，可通过主数据的文件下载Open API下载 */
  file_value?: FieldVariableValueToFile
}

export interface FieldVariableValueToFile {
  /** 用于主数据文件下载接口的id */
  open_file_id?: string
  /** 文件名称 */
  file_name?: string
  /** 文件大小，单位：Byte */
  length?: string
  /** 文件类型，如`application/pdf` */
  mime_type?: string
}

export interface FieldVariableValueToForReview {
  /** 文本值 */
  text_value?: string
  /** 布尔值 */
  bool_value?: boolean
  /** 数字值 */
  number_value?: string
  /** 枚举值，这里是枚举的id */
  enum_value?: string
  /** 从 1970 开始的天数 */
  date_value?: string
  /** 时间戳，毫秒 */
  date_time_value?: string
  /** 多语字段值 */
  i18n_value?: FieldVariableValueI18n
  /** 对象值，包括对象id和对象类型 */
  object_value?: FieldVariableValueToObject
  /** 部门id，根据入参选择对应的部门id */
  department_value?: string
  /** 员工类型字段值，为用户id，根据入参选择返回的用户id */
  employment_value?: string
  /** 数组类型值，里面包含多个值，每个元素都对应subValues中的key */
  list_values?: string[]
}

export interface FieldVariableValueToObject {
  /** wukong的对象唯一标识 */
  wk_id?: string
  /** wukong的元数据唯一标识 */
  wk_api_name?: string
}

export interface FieldVariableValueToRecord {
  /** 变量唯一标识 */
  variable_api_name?: string
  /** 变量值，对应subValues中的key */
  sub_value_key?: string
}

export interface File {
  /** 附件 Token */
  token?: string
  /** 文件名 */
  name?: string
  /** 视图类型，卡片视图（默认）或预览视图 */
  view_type?: 1 | 2
}

export interface FileComment {
  /** 评论 ID */
  comment_id?: string
  /** 用户 ID */
  user_id?: string
  /** 创建时间 */
  create_time?: number
  /** 更新时间 */
  update_time?: number
  /** 是否已解决 */
  is_solved?: boolean
  /** 解决评论时间 */
  solved_time?: number
  /** 解决评论者的用户 ID */
  solver_user_id?: string
  /** 是否有更多回复 */
  has_more?: boolean
  /** 回复分页标记 */
  page_token?: string
  /** 是否是全文评论 */
  is_whole?: boolean
  /** 局部评论的引用字段 */
  quote?: string
  /** 评论里的回复列表 */
  reply_list?: ReplyList
}

export interface FileCommentReply {
  /** 回复内容 */
  content: ReplyContent
  /** 回复 ID */
  reply_id?: string
  /** 用户 ID */
  user_id?: string
  /** 创建时间 */
  create_time?: number
  /** 更新时间 */
  update_time?: number
  /** 回复的其他内容，图片 Token 等 */
  extra?: ReplyExtra
}

export interface FileConfig {
  /** 仅包含字母数字和下划线的 16 位字符串作为文件的标识，用户生成 */
  file_id: string
  /** 语音格式，目前仅支持：pcm */
  format: string
  /** 引擎类型，目前仅支持：16k_auto 中英混合 */
  engine_type: string
}

export interface FileLike {
  /** 用户 ID */
  user_id?: string
  /** 用户最后点赞时间，秒级时间戳 */
  last_liked_time?: string
  /** 用户名字，用户信息被脱敏时此值不会返回 */
  user_name?: string
  /** 用户英文名字，用户信息被脱敏时此值不会返回 */
  user_en_name?: string
  /** 用户头像，用户信息被脱敏时此值不会返回 */
  user_avatar_url?: string
  /** 用户信息是否脱敏 */
  user_is_desensitized?: boolean
}

export interface FileStatistics {
  /** 文档历史访问人数，同一人多次访问按一次计算。 */
  uv?: number
  /** 文档历史访问次数，同一人多次访问按多次计算。（注：同一人相邻两次访问间隔在半小时内视为一次访问） */
  pv?: number
  /** 文档历史点赞总数 */
  like_count?: number
  /** 时间戳（秒） */
  timestamp?: number
  /** 今日新增文档访问人数 */
  uv_today?: number
  /** 今日新增文档访问次数 */
  pv_today?: number
  /** 今日新增文档点赞数 */
  like_count_today?: number
}

export interface FileViewRecord {
  /** 访问者 ID */
  viewer_id?: string
  /** 访问者名称 */
  name?: string
  /** 访问者头像 URL */
  avatar_url?: string
  /** 最近访问时间，秒级时间戳 */
  last_view_time?: string
}

export interface Filter {
  /** 与、或条件 */
  logic: Logic
  /** 过滤条件 */
  expressions?: Expression[]
}

export interface FilterCondition {
  /** 筛选条件的左值，值为字段的参数名称。具体可填哪些字段请看 https://bytedance.larkoffice.com/wiki/Yyrgw6kLLiGxMIkrEZece1ZvnWg */
  field: FieldName
  /** 比较操作符。可选值有： - equal：等于，支持任何类型的左值 - in：属于任一 */
  operator: CompareOperator
  /** 筛选条件的右值。内容为左值字段类型及操作符组合下，对应的值类型。注意： 1. field为int类型，operator为in时，value应当为list<int>的json字符串   1. 示例值："[11,22]" 2. field为string类型，operator为in时，value应当为json序列化后的json字符串   1. 示例值："[\"正式\",\"实习\"]" 3. field为string类型，operator为eq时，value应当为json序列化后的string   1. 示例值："\正式\"" */
  value: string
}

export interface FilterExpression {
  /** 规则 */
  conditions?: FilterCondition[]
  /** 表达式 */
  expression?: string
}

export interface FilterInfo {
  /** 设置了筛选条件的列 */
  col: string
  /** 筛选条件 */
  conditions: Condition[]
}

export interface FilterView {
  /** 筛选视图 id */
  filter_view_id?: string
  /** 筛选视图名字 */
  filter_view_name?: string
  /** 筛选视图的筛选范围 */
  range?: string
}

export interface FilterViewCondition {
  /** 设置筛选条件的列，使用字母号 */
  condition_id?: string
  /** 筛选类型 */
  filter_type?: string
  /** 比较类型 */
  compare_type?: string
  /** 筛选参数 */
  expected?: string[]
}

export interface FindCondition {
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

export interface FindReplaceResult {
  /** 符合查找条件的单元格数组，不包含公式，例如["A1", "A2"...] */
  matched_cells?: string[]
  /** 符合查找条件的含有公式的单元格数组，例如["B3", "H7"...] */
  matched_formula_cells?: string[]
  /** 符合查找条件的总行数 */
  rows_count?: number
}

export interface FiveStartScoringResult {
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

export interface FlexibleRule {
  /** 下班最多可早走（上班早到几分钟，下班可早走几分钟） */
  flexible_early_minutes: number
  /** 上班最多可晚到（上班晚到几分钟，下班须晚走几分钟） */
  flexible_late_minutes: number
}

export interface FloatImage {
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

export interface Folder {
  /** folder id */
  id?: string
  /** 文件夹名称 */
  name: string
  /** 父文件夹 id，该值为 0 表示根文件夹 */
  parent_folder_id: string
  /** 文件夹类型 */
  folder_type?: 1 | 2
  /** 未读邮件数量 */
  unread_message_count?: number
  /** 未读会话数量 */
  unread_thread_count?: number
}

export interface Follower {
  /** 任务关注者 ID */
  id?: string
  /** 要添加为关注人的user_id */
  id_list?: string[]
}

export interface FollowUp {
  /** 内容 */
  content: string
  /** 多语言内容 */
  i18n_contents?: I18nContent[]
}

export interface FoodManageEntity {
  /** 识别的字段种类 */
  type?: 'validity_period' | 'issuer' | 'issuing_authority' | 'complaints_hotline' | 'license_number' | 'domicile' | 'legal_representative' | 'credit_code' | 'operator' | 'premise' | 'daily_supervisor' | 'daily_supervisory_authorities' | 'main_body' | 'operating_item'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface FoodManageLicense {
  /** 识别出的实体列表 */
  entities?: FoodManageEntity[]
}

export interface FoodProduceEntity {
  /** 识别的字段种类 */
  type?: 'validity_period' | 'issuer' | 'issuing_authority' | 'complaints_hotline' | 'food_category' | 'production_address' | 'license_number' | 'domicile' | 'legal_representative' | 'credit_code' | 'producer' | 'daily_supervisory_authorities' | 'daily_supervisor'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface FoodProduceLicense {
  /** 识别出的实体列表 */
  entities?: FoodProduceEntity[]
}

export interface Formula {
  /** 公式表达式 */
  expr?: string
  /** 公式参数列表 */
  formula_params?: FormulaParam[]
}

export interface FormulaParam {
  /** 引用类型 */
  ref_type?: 1 | 2
  /** 引用类型ID */
  id?: string
}

export interface Freebusy {
  /** 忙闲信息开始时间，RFC3339 date_time格式 */
  start_time: string
  /** 忙闲信息结束时间，RFC3339 date_time格式 */
  end_time: string
}

export interface FreePunchCfg {
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

export interface FunctionalRoleMember {
  /** 成员ID */
  user_id?: string
  /** 管理范围的类型 */
  scope_type?: 'All' | 'Part' | 'None'
  /** 表示该角色成员的管理范围，scope_type为“指定范围”时，返回该值 */
  department_ids?: string[]
}

export interface FunctionalRoleMemberResult {
  /** 用户ID */
  user_id: string
  /** 成员处理结果 */
  reason: 1 | 2 | 3 | 4 | 5 | 6
}

export interface Gadget {
  /** pc 支持的小程序模式，bit 位表示 */
  enable_pc_mode?: 1 | 2 | 4
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

export const enum GenderDirectory {
  /** 未知 */
  GenderDirectoryUnknown = 0,
  /** 男 */
  GenderDirectoryMan = 1,
  /** 女 */
  GenderDirectoryWoman = 2,
  /** 其他 */
  GenderDirectoryOther = 3,
}

export interface GetSpreadsheet {
  /** 电子表格标题 */
  title?: string
  /** 电子表格owner */
  owner_id?: string
  /** 电子表格token */
  token?: string
  /** 电子表格url */
  url?: string
}

export interface Grant {
  /** 租户内授予名单的唯一标识，该值由系统随机生成。 */
  id?: string
  /** 企业勋章的唯一ID */
  badge_id?: string
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

export interface Grid {
  /** 分栏列数量 */
  column_size: number
}

export interface GridColumn {
  /** 当前分栏列占整个分栏的比例 */
  width_ratio?: number
}

export interface Group {
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
  type?: 1 | 2
}

export interface GroupMeta {
  /** 考勤组id */
  group_id: string
  /** 考勤组名称 */
  group_name: string
}

export interface HealthCertificate {
  /** 识别出的实体类型 */
  entities?: HealthCertificateEntity[]
}

export interface HealthCertificateEntity {
  /** 识别的字段种类 */
  type?: 'name' | 'issued_by' | 'date_of_handling' | 'date_of_issue' | 'date_of_medical_examination' | 'valid_date' | 'other_date'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface HiberarchyCommon {
  /** 上级组织 */
  parent_id?: string
  /** 名称 */
  name: I18n[]
  /** 启用 */
  active: boolean
  /** 编码 */
  code?: string
  /** 描述 */
  description?: I18n[]
}

export interface HkmMainlandTravelPermit {
  /** 识别出的实体类型 */
  entities?: HkmMainlandTravelPermitEntity[]
}

export interface HkmMainlandTravelPermitEntity {
  /** 识别的字段种类 */
  type?: 'full_name_cn' | 'full_name_en' | 'date_of_birth' | 'date_of_expiry' | 'card_number'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface Hrbp {
  /** HRBP/属地 BP 的雇员ID */
  employment_id_list: string[]
  /** 部门 id */
  department_id?: string
  /** 工作地点 id */
  work_location_id?: string
}

export interface Href {
  /** 链接对应的地址 */
  url?: string
  /** 链接对应的标题 */
  title?: string
}

export interface I18n {
  /** 中文描述 */
  zh_cn?: string
  /** 英文描述 */
  en_us?: string
  /** 日文描述 */
  ja_jp?: string
}

export interface I18nContent {
  /** 语言 */
  locale?: string
  /** i18n内容 */
  value?: string
}

export interface I18nEntryDesc {
  /** 语言类型 */
  language: 1 | 2 | 3
  /** 纯文本释义 */
  description?: string
  /** 富文本描述 */
  rich_text?: string
}

export interface I18nMap {
  /** 中文名称 */
  zh?: string
  /** 英文名称 */
  en?: string
  /** 日文名称 */
  ja?: string
}

export interface I18nMeta {
  /** 国际化字段：中文 */
  zh_cn?: string
  /** 国际化字段：英文 */
  en_us?: string
  /** 国际化字段：日文 */
  ja_jp?: string
}

export interface I18nName {
  /** 中文名 */
  zh_cn?: string
  /** 日文名 */
  ja_jp?: string
  /** 英文名 */
  en_us?: string
}

export interface I18nNames {
  /** 中文名 */
  zh_cn?: string
  /** 英文名 */
  en_us?: string
  /** 日文名 */
  ja_jp?: string
}

export interface I18nResource {
  /** 语言可选值有： zh-CN：中文 en-US：英文 ja-JP：日文 */
  locale: 'zh-CN' | 'en-US' | 'ja-JP'
  /** 文案 key, value, i18n key 以 @i18n@ 开头； 该字段主要用于做国际化，语序用户同时传多个语言的文案，审批中心会根据用户当前的语音环境使用对应的文案，如果没有传用户当前的语音环境文案，则会使用默认的语言文案。 */
  texts: I18nResourceText[]
  /** 是否默认语言，默认语言需要包含所有key，非默认语言如果key不存在会使用默认语言代替 */
  is_default: boolean
}

export interface I18nResourceText {
  key: string
  value: string
}

export type I18ns = I18n[]

export interface I18nText {
  /** 默认值 */
  default_value: string
  /** 国际化值，key为zh_cn, ja_jp, en_us, value为对应的值 */
  i18n_value?: Record<string, string>
}

export interface IdCard {
  /** 识别的实体列表 */
  entities?: IdEntity[]
  /** 正反面，1为身份证-姓名页，0为身份证-国徽页 */
  side?: number
  /** 四角坐标[x0,y0,x1,y1,x2,y2,x3,y3] */
  conners?: number[]
  /** 人像四角坐标[x0,y0,x1,y1,x2,y2,x3,y3] */
  face_conners?: number[]
}

export interface IdEntity {
  /** 识别的字段种类 */
  type?: 'identity_code' | 'identity_name' | 'address' | 'valid_date_start' | 'valid_date_end' | 'gender' | 'race' | 'issued_by' | 'birth'
  /** 识别出字段的文本信息 */
  value?: string
}

export const enum IdentityProvider {
  /** Aily 账号体系 */
  IdentityProviderAily = 'AILY',
  /** 飞书账号体系 */
  IdentityProviderFeishu = 'FEISHU',
}

export interface IdInfo {
  /** 传入的 ID */
  id?: string
  /** 目标 ID 值 */
  target_id?: string
}

export interface IdNameObject {
  /** 权限点ID */
  id?: string
  /** 权限点名称 */
  name?: I18n
}

export interface Iframe {
  /** iframe 的组成元素 */
  component: IframeComponent
}

export interface IframeComponent {
  /** iframe 类型 */
  iframe_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 99
  /** iframe 目标 url（需要进行 url_encode） */
  url: string
}

export interface Image {
  /** 宽度，单位 px */
  width?: number
  /** 高度，单位 px */
  height?: number
  /** 图片 Token */
  token?: string
  /** 对齐方式 */
  align?: 1 | 2 | 3
}

export interface ImageLink {
  /** 72*72像素头像链接 */
  avatar_72?: string
  /** 240*240像素头像链接 */
  avatar_240?: string
  /** 640*640像素头像链接 */
  avatar_640?: string
  /** 原始头像链接 */
  avatar_origin?: string
}

export interface ImportedMetric {
  /** 被评估人 ID */
  reviewee_user_id: string
  /** 指标 ID，指标的统一标识 */
  metric_id: string
  /** 指标字段信息 */
  fields: ImportedMetricField[]
}

export interface ImportedMetricField {
  /** 指标字段 ID */
  field_id: string
  /** 字段值 */
  field_value?: string
  /** 字段值，当字段为人员信息时必填 */
  field_value_person?: string
}

export interface ImportTask {
  /** 任务 ID */
  ticket?: string
  /** 导入目标云文档类型，支持的类型 新版文档：docx；电子表格：sheet；多维表格：bitable */
  type: string
  /** 任务状态 */
  job_status?: 0 | 1 | 2 | 3 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 108 | 109 | 110 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 129 | 5000 | 7000 | 7001 | 7002
  /** 任务失败原因 */
  job_error_msg?: string
  /** 导入云文档 Token */
  token?: string
  /** 导入云文档 URL */
  url?: string
  /** 任务成功后的提示信息 */
  extra?: string[]
}

export interface ImportTaskMountPoint {
  /** 挂载类型 */
  mount_type: 1
  /** 挂载位置,对于mount_type=1, 云空间目录token，空表示根目录 */
  mount_key: string
}

export interface Indicator {
  /** 薪资统计指标ID */
  id: string
  /** 薪资统计指标名称 */
  name: string
  /** 薪资统计指标数值类型 */
  value_type: 'money' | 'number' | 'percent'
  /** 启用状态 */
  active_status: 1 | 0
  /** 多语言名称 */
  i18n_names: I18nContent[]
}

export interface InlineBlock {
  /** 关联的内联状态的 block 的 block_id */
  block_id: string
  /** 文本局部样式 */
  text_element_style?: TextElementStyle
}

export interface InlineFile {
  /** 附件 token */
  file_token?: string
  /** 当前文档中该附件所处的 block 的 id */
  source_block_id?: string
  /** 文本局部样式 */
  text_element_style?: TextElementStyle
}

export interface InputComment {
  /** 评论内容 */
  content?: string
}

export interface InputCustomField {
  /** 字段名称 */
  name?: string
  /** 数字类型的字段设置 */
  number_setting?: NumberSetting
  /** 人员类型的字段设置 */
  member_setting?: MemberSetting
  /** 时间日期类型的字段设置 */
  datetime_setting?: DatetimeSetting
  /** 单选设置 */
  single_select_setting?: SelectSetting
  /** 多选设置 */
  multi_select_setting?: SelectSetting
  /** 文本类型 */
  text_setting?: TextSetting
}

export interface InputCustomFieldValue {
  /** 自定义字段guid */
  guid: string
  /** 数字类型的自定义字段值，填写一个合法数字的字符串表示，空字符串表示设为空。 */
  number_value?: string
  /** 人员类型的自定义字段值。可以设置1个或多个用户的id（遵循member格式，只支持user类型）。当字段设为只不能多选时只能输入一个值。设为空数组表示设为空。 */
  member_value?: Member[]
  /** 日期类型自定义字段值，可以输入一个表示日期的以毫秒为单位的字符串。设为空字符串表示设为空。 */
  datetime_value?: string
  /** 单选类型字段值，填写一个字段选项的option_guid。设置为空字符串表示设为空。 */
  single_select_value?: string
  /** 多选类型字段值，可以填写一个或多个本字段的option_guid。设为空数组表示设为空。 */
  multi_select_value?: string[]
  /** 文本类型字段值。可以填写最多3000字符。使用空字符串表示设为空。 */
  text_value?: string
}

export interface InputOption {
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

export interface InputSection {
  /** 自定义分组名 */
  name?: string
  /** 要将新分组插入到自定义分分组的前面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
  insert_before?: string
  /** 要将新分组插入到自定义分分组的后面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
  insert_after?: string
}

export interface InputTask {
  /** 任务标题 */
  summary?: string
  /** 任务描述 */
  description?: string
  /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
  due?: Due
  /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
  extra?: string
  /** 任务的完成时刻时间戳(ms) */
  completed_at?: string
  /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
  repeat_rule?: string
  /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
  custom_complete?: CustomComplete
  /** 任务的开始时间(ms) */
  start?: Start
  /** 任务的完成模式。1 - 会签任务；2 - 或签任务 */
  mode?: number
  /** 是否是里程碑任务 */
  is_milestone?: boolean
  /** 自定义字段值 */
  custom_fields?: InputCustomFieldValue[]
}

export interface InputTasklist {
  /** 清单名称 */
  name?: string
  /** 清单所有者 */
  owner?: Member
}

export interface InsertGridColumnRequest {
  /** 插入列索引，从 1 开始，如 1 表示在第一列后插入，注意不允许传 0（-1表示在最后一列后插入） */
  column_index: number
}

export interface InsertTableColumnRequest {
  /** 插入的列在表格中的索引。（-1表示在表格末尾插入一列） */
  column_index: number
}

export interface InsertTableRowRequest {
  /** 插入的行在表格中的索引。（-1表示在表格末尾插入一行） */
  row_index: number
}

export interface Instance {
  /** 日程实例ID */
  event_id: string
  /** 日程主题 */
  summary?: string
  /** 日程描述 */
  description?: string
  /** 开始时间 */
  start_time?: TimeInfo
  /** 结束时间 */
  end_time?: TimeInfo
  /** 日程状态 */
  status?: 'tentative' | 'confirmed' | 'cancelled'
  /** 是否是例外日程实例 */
  is_exception?: boolean
  /** 日程的app_link,跳转到具体的某个日程 */
  app_link?: string
  /** 日程地点 */
  location?: EventLocation
}

export interface InstanceCcUser {
  /** 抄送人 user id */
  user_id?: string
  /** 审批实例内抄送唯一标识 */
  cc_id?: string
  /** 抄送人 open id */
  open_id?: string
}

export interface InstanceComment {
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
  files?: File[]
}

export interface InstanceSearchApproval {
  /** 审批定义 code */
  code?: string
  /** 审批定义名称 */
  name?: string
  /** 是否为第三方审批 */
  is_external?: boolean
  /** 第三方审批信息 */
  external?: InstanceSearchApprovalExternal
  /** 审批定义Id */
  approval_id?: string
  /** 审批定义图标信息 */
  icon?: string
}

export interface InstanceSearchApprovalExternal {
  /** 是否支持批量读 */
  batch_cc_read?: boolean
}

export interface InstanceSearchGroup {
  /** 审批定义分组外部 id */
  external_id?: string
  /** 审批定义分组名称 */
  name?: string
}

export interface InstanceSearchItem {
  /** 审批定义 */
  approval?: InstanceSearchApproval
  /** 审批定义分组 */
  group?: InstanceSearchGroup
  /** 审批实例信息 */
  instance?: InstanceSearchNode
}

export interface InstanceSearchLink {
  /** 审批实例 pc 端链接 */
  pc_link?: string
  /** 审批实例移动端链接 */
  mobile_link?: string
}

export interface InstanceSearchNode {
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
  status?: 'rejected' | 'pending' | 'canceled' | 'deleted' | 'approved'
  /** 审批实例名称（只有第三方审批有） */
  title?: string
  /** 审批实例扩展字段，string型json */
  extra?: string
  /** 审批流水号 */
  serial_id?: string
  /** 审批实例链接（只有第三方审批有） */
  link?: InstanceSearchLink
}

export interface InstanceTask {
  /** task id */
  id: string
  /** 审批人的用户id，自动通过、自动拒绝 时为空 */
  user_id: string
  /** 审批人 open id */
  open_id?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'TRANSFERRED' | 'DONE'
  /** task 所属节点 id */
  node_id?: string
  /** task 所属节点名称 */
  node_name?: string
  /** task 所属节点自定义 id, 如果没设置自定义 id, 则不返回该字段 */
  custom_node_id?: string
  /** 审批方式 */
  type?: 'AND' | 'OR' | 'AUTO_PASS' | 'AUTO_REJECT' | 'SEQUENTIAL'
  /** task 开始时间 */
  start_time: string
  /** task 完成时间, 未完成为 0 */
  end_time?: string
}

export interface InstanceTimeline {
  /** 动态类型，不同类型 ext 内的 user_id_list 含义不一样 */
  type: 'START' | 'PASS' | 'REJECT' | 'AUTO_PASS' | 'AUTO_REJECT' | 'REMOVE_REPEAT' | 'TRANSFER' | 'ADD_APPROVER_BEFORE' | 'ADD_APPROVER' | 'ADD_APPROVER_AFTER' | 'DELETE_APPROVER' | 'ROLLBACK_SELECTED' | 'ROLLBACK' | 'CANCEL' | 'DELETE' | 'CC'
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
  cc_user_list?: InstanceCcUser[]
  /** 动态其他信息，json格式，目前包括 user_id_list, user_id，open_id_list，open_id */
  ext: string
  /** 产生task的节点key */
  node_key?: string
  /** 审批附件 */
  files?: File[]
}

export interface InternOfferOffboardingInfo {
  /** 实际离职日期（实际离职日期需晚于实际入职日期） */
  actual_offboarding_date: string
  /** 备注 */
  notes?: string
}

export interface InternOfferOnboardingInfo {
  /** 实际入职日期 */
  actual_onboarding_date: string
}

export interface Interview {
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
  interview_record_list?: InterviewRecord[]
}

export interface InterviewAddress {
  /** 地址 ID */
  id?: string
  /** 地址名称 */
  name?: I18n
  /** 区域 */
  district?: CodeNameObject
  /** 城市 */
  city?: CodeNameObject
  /** 省 */
  state?: CodeNameObject
  /** 国家 */
  country?: CodeNameObject
}

export interface InterviewAggregation {
  /** 面试信息列表 */
  interviews?: InterviewExtendV2[]
}

export interface InterviewAppointmentConfig {
  /** 是否开启面试官安排面试 */
  enable_interview_appointment_by_interviewer?: boolean
  /** 配置详情 */
  config?: InterviewAppointmentConfigContent
}

export interface InterviewAppointmentConfigContent {
  /** 面试类型 */
  interview_type?: 1 | 2 | 3
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
  video_type?: 1 | 2 | 3 | 4 | 5 | 8 | 9 | 100
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

export interface InterviewAttachment {
  /** 附件 ID */
  file_id?: string
  /** 附件名称 */
  file_name?: string
  /** 附件类型 */
  content_type?: string
  /** 附件创建时间(ms) */
  create_time?: string
}

export interface InterviewDimensionOption {
  /** 选项ID */
  id?: string
  name?: I18n
  description?: I18n
  /** 选项分数值 */
  score_val?: number
}

export interface Interviewer {
  /** 面试官userID */
  user_id?: string
  /** 认证状态 */
  verify_status?: 1 | 2
  /** 面试官标签ID */
  tag_id_list?: string[]
}

export interface InterviewExtend {
  /** 面试 ID */
  id?: string
  /** 面试开始时间（ms） */
  begin_time?: number
  /** 面试结束时间（ms） */
  end_time?: number
  /** 面试轮次（从0开始计数） */
  round?: number
  /** 面试记录信息 */
  interview_record_list?: InterviewRecord[]
  /** 面试评价提交时间 */
  feedback_submit_time?: number
  /** 面试关联的投递阶段 */
  stage_id?: string
  /** 投递 ID */
  application_id?: string
  /** 阶段信息 */
  stage?: IdNameObject
  /** 创建人 */
  creator?: IdNameObject
  /** 创建时间（ms） */
  biz_create_time?: number
  /** 最近更新时间（ms） */
  biz_modify_time?: number
  /** 面试状态 */
  interview_round_summary?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /** 面试安排 ID */
  interview_arrangement_id?: string
  /** 面试类型 */
  interview_type?: 1 | 2 | 3
  /** 候选人时区 */
  talent_time_zone?: CodeNameObject
  /** 面试联系人 */
  contact_user?: IdNameObject
  /** 面试联系人电话 */
  contact_mobile?: string
  /** 备注 */
  remark?: string
  /** 面试地点 */
  address?: InterviewAddress
  /** 视频面试工具 */
  video_type?: 1 | 2 | 3 | 4 | 5 | 8 | 9 | 100
  /** 当安排类型为集中面试时，此值表示集中面试的安排状态 */
  arrangement_status?: 1 | 2 | 3
  /** 安排类型 */
  arrangement_type?: 1 | 2
  /** 安排方式（是否使用自助约面） */
  arrangement_appointment_kind?: 1 | 2
  /** 面试会议室 */
  meeting_room_list?: InterviewMeetingRoom[]
  /** 面试轮次类型 */
  interview_round_type?: IdNameObject
}

export interface InterviewExtendV2 {
  /** 面试 ID */
  id?: string
  /** 面试开始时间（ms） */
  begin_time?: string
  /** 面试结束时间（ms） */
  end_time?: string
  /** 面试轮次（从0开始计数） */
  round?: number
  /** 面试记录信息 */
  interview_record_list?: InterviewRecordV2[]
  /** 面试评价提交时间 */
  feedback_submit_time?: string
  /** 面试关联的投递阶段 */
  stage_id?: string
  /** 投递 ID */
  application_id?: string
  /** 阶段信息 */
  stage?: IdNameObject
  /** 创建人 */
  creator?: IdNameObject
  /** 创建时间戳（单位：毫秒） */
  create_time?: string
  /** 更新时间戳（单位：毫秒） */
  update_time?: string
  /** 面试状态 */
  interview_round_summary?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /** 面试安排 ID */
  interview_arrangement_id?: string
  /** 面试类型 */
  interview_type?: 1 | 2 | 3
  /** 候选人时区 */
  talent_time_zone?: CodeNameObject
  /** 面试联系人 */
  contact_user?: IdNameObject
  /** 面试联系人电话 */
  contact_mobile?: string
  /** 备注 */
  remark?: string
  /** 面试地点 */
  address?: BaseAddressV2
  /** 视频面试工具 */
  video_type?: 1 | 2 | 3 | 4 | 5 | 8 | 9 | 100
  /** 当安排类型为集中面试时，此值表示集中面试的安排状态 */
  arrangement_status?: 1 | 2 | 3 | 4
  /** 安排类型 */
  arrangement_type?: 1 | 2 | 3
  /** 安排方式（是否使用自助约面） */
  arrangement_appointment_kind?: 1 | 2
  /** 面试会议室 */
  meeting_room_list?: InterviewMeetingRoom[]
  /** 面试轮次类型 */
  interview_round_type?: IdNameObject
}

export interface InterviewFeedbackForm {
  /** 面试评价表ID */
  id?: string
  /** 面试评价表版本号 */
  version?: number
  /** 面试评价表名称 */
  name?: I18n
  /** 面试评价表类型 */
  type?: 1 | 2 | 3
  /** 面试评价表打分计算配置（适用于打分评价表） */
  score_calculation_config?: ScoreCalculationConfig
  /** 面试评价表模块列表 */
  modules?: InterviewFeedbackFormModule[]
}

export interface InterviewFeedbackFormDimension {
  /** 模块维度ID */
  id?: string
  /** 维度名称 */
  name?: I18n
  /** 维度描述 */
  description?: I18n
  /** 维度类型 */
  type?: 1 | 2 | 3 | 5 | 6 | 7 | 10 | 11 | 12
  /** 是否启用 */
  enabled?: boolean
  /** 维度顺序 */
  sequence?: number
  /** 是否必选 */
  is_required?: boolean
  /** 维度权重 */
  weight?: number
  /** 评价维度的分数配置（适用于打分题） */
  score_dimension_config?: ScoreDimensionConfig
  /** 选项列表(适用于单选题和多选题) */
  option_items?: InterviewDimensionOption[]
  /** 是否展示「无法判断」选项，仅针对「职级建议」的维度类型 */
  display_not_evident?: boolean
  /** 能力项列表 */
  ability_list?: DimensionAbility[]
}

export interface InterviewFeedbackFormModule {
  /** 面试评价表模块ID */
  id?: string
  /** 模块名称 */
  name?: I18n
  /** 模块描述 */
  description?: I18n
  /** 模块类型 */
  type?: 1 | 2
  /** 模块顺序 */
  sequence?: number
  /** 模块权重 */
  weight?: number
  /** 模块维度列表 */
  dimensions?: InterviewFeedbackFormDimension[]
}

export interface InterviewMeetingRoom {
  /** 会议室 ID */
  room_id?: string
  /** 会议室名称 */
  room_name?: string
  /** 建筑名称 */
  building_name?: string
  /** 会议室预定状态 */
  reserved_status?: 1 | 2 | 3
  /** 楼层 */
  floor_name?: string
}

export interface InterviewRecord {
  /** 面评ID */
  id?: string
  /** 面试官用户 ID */
  user_id?: string
  /** 面试记录内容 */
  content?: string
  /** 提交状态 */
  commit_status?: 1 | 2
  /** 面试结论 */
  conclusion?: 1 | 2 | 3 | 4 | 5
  /** 面试得分 */
  interview_score?: InterviewScore
  /** 面试官信息 */
  interviewer?: IdNameObject
}

export interface InterviewRecordV2 {
  /** 面试评价ID */
  id?: string
  /** 面试评价表ID */
  feedback_form_id?: string
  /** 提交状态 */
  commit_status?: 1 | 2
  /** 面试评价提交时间 */
  submit_time?: string
  /** 面试评价分数 */
  record_score?: RecordScore
  /** 面试官信息 */
  interviewer?: BasicUserInfo
  /** 面试评价附件列表 */
  attachments?: InterviewAttachment[]
  /** 模块评价列表 */
  module_assessments?: ModuleAssessment[]
}

export interface InterviewRegistrationSchema {
  /** 面试登记表模板 ID */
  id?: string
  /** 面试登记表模板名称 */
  name?: string
  /** 是否用作面试登记表 */
  is_used_as_interview?: boolean
  /** 模块列表 */
  object_list?: CommonSchema[]
}

export interface InterviewRoundType {
  /** 面试轮次类型 ID */
  id?: string
  /** 面试轮次类型业务 ID */
  biz_id?: string
  /** 面试轮次类型名称 */
  name?: I18n
  /** 职位流程类型 */
  process_type?: 1 | 2
  /** 启用状态 */
  active_status?: 1 | 2
  /** 面试评价表 */
  interview_assessment_template_info?: InterviewRoundTypeAssessmentTemplate
}

export interface InterviewRoundTypeAssessmentTemplate {
  /** 面试评价表 ID */
  id?: string
  /** 面试评价表业务 ID */
  biz_id?: string
  /** 面试评价表名称 */
  name?: I18n
}

export interface InterviewScore {
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

export interface InterviewTask {
  /** 面试 ID */
  id?: string
  /** 职位 ID */
  job_id?: string
  /** 人才 ID */
  talent_id?: string
  /** 投递 ID */
  application_id?: string
  /** 任务状态 */
  activity_status?: 1 | 2 | 3 | 5
}

export interface InvitedReviewRecordInfo {
  /** 评估人 ID。如果开启了 360 匿名评估，并且是对全部查看者匿名，则不返回该值 */
  reviewer_id?: User
  /** 是否拒绝 */
  is_rejected?: boolean
  /** 360° 评估人拒绝评估的理由，当 360° 评估环节被评估人拒绝时有值 */
  rejected_reason?: string
  /** 360° 评估人的评估尺度标签 */
  distribute_type?: 1 | 2 | 3
  /** 360° 评估人的评估尺度数值 */
  avg_diff?: string
  /** 360° 评估人的与被评估人关系。如果开启了 360 匿名评估，并且是对全部查看者匿名，且配置隐藏描述信息则不返回该值 */
  relationship_with_reviewee?: 'direct_report' | 'skiplevel_report' | 'former_direct_manager' | 'skiplevel_manager' | 'teammate' | 'crossteam_colleague'
  /** 360° 评估人的邀请人类型。如果开启了 360 匿名评估，并且是对全部查看者匿名，且配置隐藏描述信息则不返回该值 */
  invitedby?: 'system_default' | 'reviewee' | 'manager' | 'hrbp_or_others' | 'voluntary'
}

export interface Isv {
  /** 团队互动应用唯一ID */
  component_id?: string
  /** 团队互动应用类型，比如信息收集"blk_5f992038c64240015d280958" */
  component_type_id?: string
}

export interface Item {
  /** 用户统计设置一级项 */
  code: string
  /** 用户统计设置二级项 */
  child_items?: ChildItem[]
}

export interface ItemCategory {
  /** 薪酬项分类ID */
  id: string
  /** 薪酬项分类名称 */
  name: string
  /** 薪酬项多语言分类 */
  i18n_names?: I18nContent[]
}

export interface ItemContent {
  /** 内容的格式 */
  format?: 'html' | 'plaintext'
  /** 全文数据 */
  content_data?: string
}

export interface ItemMetadata {
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

export interface JiraIssue {
  /** Jira issue ID */
  id?: string
  /** Jira issue key */
  key?: string
}

export interface Job {
  id?: number
  name?: string
}

export interface JobBasicInfo {
  /** 职位 ID */
  id?: string
  /** 职位名称 */
  name?: string
  /** 职位编码 */
  code?: string
}

export interface JobChange {
  /** 异动记录 id */
  job_change_id?: string
  /** 雇员 id */
  employment_id?: string
  /** 异动详细信息 */
  transfer_info?: TransferInfo
}

export interface JobConfigDetail {
  /** Offer 申请表，含 ID+name */
  offer_apply_schema?: IdNameObject
  /** Offer 审批流，含 ID+name */
  offer_process_conf?: IdNameObject
  /** 建议评估人，可多位 */
  recommended_evaluator_list?: IdNameObject[]
  /** 面试评价表，含 ID+name */
  assessment_template?: IdNameObject
  /** 建议面试官列表，可多位 */
  interview_round_list?: JobConfigInterviewRound[]
  /** 面试登记表 */
  interview_registration?: RegistrationInfo
  /** 入职登记表 */
  onboard_registration?: RegistrationInfo
  /** 面试轮次类型列表 */
  interview_round_type_list?: JobConfigRoundTypeResult[]
  /** 关联职位列表 */
  related_job_list?: IdNameObject[]
  /** 职位属性，1是实体职位，2是虚拟职位 */
  job_attribute?: number
  /** 面试官安排面试配置 */
  interview_appointment_config?: InterviewAppointmentConfig
  /** 实习Offer 申请表，含 ID+name */
  internship_offer_apply_schema?: IdNameObject
}

export interface JobConfigInterviewRound {
  /** 面试官列表 */
  interviewer_list?: IdNameObject[]
  /** 面试轮次 */
  round?: number
}

export interface JobConfigInterviewRoundConf {
  /** 建议面试官 ID 列表 */
  interviewer_id_list?: string[]
  /** 面试轮次 */
  round?: number
}

export interface JobConfigResult {
  /** Offer 申请表，含 ID+name */
  offer_apply_schema?: IdNameObject
  /** Offer 审批流，含 ID+name */
  offer_process_conf?: IdNameObject
  /** 建议评估人，可多位 */
  recommended_evaluator_list?: IdNameObject[]
  /** 面试评价表，含 ID+name */
  assessment_template?: IdNameObject
  /** 职位 ID */
  id?: string
  /** 建议面试官列表，可多位 */
  interview_round_list?: JobConfigInterviewRound[]
  /** 招聘需求，含 ID+name */
  job_requirement_list?: IdNameObject[]
  /** 面试登记表 */
  interview_registration?: RegistrationInfo
  /** 入职登记表 */
  onboard_registration?: RegistrationInfo
  /** 面试轮次类型列表 */
  interview_round_type_list?: JobConfigRoundTypeResult[]
  /** 关联职位列表 */
  related_job_list?: IdNameObject[]
  /** 职位属性，1是实体职位，2是虚拟职位 */
  job_attribute?: number
  /** 面试官安排面试配置 */
  interview_appointment_config?: InterviewAppointmentConfig
  /** 官网申请表 */
  portal_website_apply_form_schema_info?: RegistrationInfo
}

export interface JobConfigRoundType {
  /** 面试轮次类型 ID */
  round_biz_id?: string
  /** 面试评价表 ID */
  assessment_template_biz_id?: string
}

export interface JobConfigRoundTypeResult {
  /** 面试轮次类型 */
  assessment_round?: IdNameObject
  /** 面试评价表 */
  assessment_template?: IdNameObject
}

export interface JobCustomizedData {
  /** 自定义字段 ID */
  object_id?: string
  /** 字段名称 */
  name?: I18n
  /** 字段类型 */
  object_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** 自定义字段值 */
  value?: JobCustomizedValue
}

export interface JobCustomizedOption {
  /** 选项 ID */
  key?: string
  /** 选项名称 */
  name?: I18n
}

export interface JobCustomizedTimeRange {
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
}

export interface JobCustomizedValue {
  /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
  content?: string
  /** 当字段类型为单选时，从此字段取值 */
  option?: JobCustomizedOption
  /** 当字段类型为多选时，从此字段取值 */
  option_list?: JobCustomizedOption[]
  /** 当字段类型为时间段时，从此字段取值 */
  time_range?: JobCustomizedTimeRange
  /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是毫秒级时间戳 */
  time?: string
  /** 当字段类型为数字时，从此字段取值 */
  number?: string
}

export interface JobData {
  /** 实体在 CoreHR 内部的唯一键 */
  id?: string
  /** 任职记录版本 ID */
  version_id?: string
  /** 级别 */
  job_level_id?: string
  /** 职等ID */
  job_grade_id?: string
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
  assignment_start_reason?: Enum
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
  cost_center_rate?: SupportCostCenterItem[]
  /** 周工作时长v2 */
  weekly_working_hours_v2?: number
  /** 排班类型 */
  work_shift?: Enum
  /** 薪资类型 */
  compensation_type?: Enum
  /** 任职公司 */
  service_company?: string
}

export interface JobDataCostCenter {
  /** 成本中心id，可以通过【查询单个成本中心信息】接口获取对应的成本中心信息 */
  cost_center_id?: string
  /** 分摊比例 */
  rate?: number
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface JobDataCustomOrg {
  /** 生效时间 */
  effective_time: string
  /** 原因 */
  start_reason?: string
  /** 自定义组织列表 */
  custom_org_with_rates: CreateEmpCustomOrg[]
  /** 自定义组织类型 */
  object_api_name: string
}

export interface JobDepartmentSimple {
  /** 部门 ID */
  id?: string
  /** 部门名称 */
  name?: I18n
}

export interface JobDetail {
  /** 职位基本信息 */
  basic_info?: JobDetailBasicInfo
  /** 职位负责人 */
  recruiter?: JobUserInfo
  /** 职位协助人列表 */
  assistant_list?: JobUserInfo[]
  /** 职位用人经理列表 */
  hiring_manager_list?: JobUserInfo[]
  /** 招聘需求列表 */
  job_requirement_list?: JobRequirementSimple[]
  /** 职位地址列表 */
  address_list?: CommonAddress[]
  /** 职位设置 */
  job_config?: JobConfigDetail
  /** 门店列表 */
  storefront_list?: JobStorefront[]
  /** 职位标签列表 */
  tag_list?: JobDetailTag[]
}

export interface JobDetailBasicInfo {
  /** 职位 ID */
  id?: string
  /** 职位名称 */
  title?: string
  /** 职位描述 */
  description?: string
  /** 职位编号 */
  code?: string
  /** 职位要求 */
  requirement?: string
  /** 雇佣类型 */
  recruitment_type?: JobDetailRecruitmentType
  /** 部门 */
  department?: JobDetailDepartment
  /** 最低职级 */
  min_job_level?: JobDetailLevel
  /** 最高职级 */
  max_job_level?: JobDetailLevel
  /** 职位亮点 */
  highlight_list?: JobDetailHighlight[]
  /** 职位序列 */
  job_category?: JobDetailCategory
  /** 职位类别 */
  job_type?: JobDetailType
  /** 启用状态 */
  active_status?: 1 | 2
  /** 创建人ID，若为空则为系统或其他对接系统创建 */
  creator_id?: string
  /** 创建时间, 毫秒级时间戳 */
  create_time?: string
  /** 更新时间，毫秒级时间戳 */
  update_time?: string
  /** 职位流程类型 */
  process_type?: 1 | 2
  /** 职位流程 ID */
  process_id?: string
  /** 职位流程名称 */
  process_name?: I18n
  /** 自定义字段列表 */
  customized_data_list?: JobCustomizedData[]
  /** 职能分类 */
  job_function?: IdNameObject
  /** 职位项目 */
  subject?: IdNameObject
  /** 招聘数量 */
  head_count?: number
  /** 工作年限 */
  experience?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** 到期日期,毫秒级时间戳 */
  expiry_time?: string
  /** 最低薪资，单位:k */
  min_salary?: number
  /** 最高薪资，单位:k */
  max_salary?: number
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 工作地点列表 */
  city_list?: CodeNameObject[]
  /** 职位属性，1是实体职位，2是虚拟职位 */
  job_attribute?: 1 | 2
  /** 目标专业 */
  target_major_list?: JobDetailTargetMajorInfo[]
  /** 标志是否门店职位，1是普通职位，2是门店职位 */
  storefront_mode?: 1 | 2
}

export interface JobDetailCategory {
  /** 职位序列 ID */
  id?: string
  /** 职位序列名称 */
  name?: I18n
  /** 职位序列启用状态 */
  active_status?: 1 | 2
}

export interface JobDetailDepartment {
  /** 部门 ID */
  id?: string
  /** 部门名称 */
  name?: I18n
}

export interface JobDetailHighlight {
  /** 职位亮点 ID */
  id?: string
  /** 职位亮点名称 */
  name?: I18n
}

export interface JobDetailLevel {
  /** 职级 ID */
  id?: string
  /** 职级名称 */
  name?: I18n
  /** 职级启用状态 */
  active_status?: 1 | 2
}

export interface JobDetailRecruitmentType {
  /** 雇佣类型 ID */
  id?: string
  /** 雇佣类型名称 */
  name?: I18n
  /** 雇佣类型启用状态 */
  active_status?: 1 | 2
}

export interface JobDetailTag {
  /** 标签 ID */
  id?: string
  /** 标签名称 */
  name?: I18n
  /** 标签顺序 */
  order?: number
}

export interface JobDetailTargetMajorInfo {
  /** 目标专业ID */
  id?: string
  /** 目标专业名称 */
  name?: I18n
}

export interface JobDetailType {
  /** 职位类别 ID */
  id?: string
  /** 职位类别名称 */
  name?: I18n
}

export interface JobFamily {
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
  /** 职级序列ID */
  job_family_id?: string
}

export interface JobFunction {
  /** 职能分类 ID */
  id?: string
  /** 职能名称 */
  name?: I18n
  /** 启用状态 */
  active_status?: 1 | 2
  /** 父级职能分类 ID */
  parent_id?: string
}

export interface JobGrade {
  /** 职等 ID */
  job_grade_id?: string
  /** 职等数值 */
  grade_order?: number
  /** 编码 */
  code?: string
  /** 名称 */
  names?: I18n[]
  /** 描述 */
  descriptions?: I18n[]
  /** 启用 */
  active?: boolean
}

export interface JobLevel {
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
  i18n_name?: I18nContent[]
  /** 多语言描述 */
  i18n_description?: I18nContent[]
}

export interface JobManager {
  /** 职位ID */
  id?: string
  /** 招聘负责人ID */
  recruiter_id: string
  /** 用人经理ID列表 */
  hiring_manager_id_list: string[]
  /** 协助人ID列表 */
  assistant_id_list?: string[]
}

export interface JobProcesses {
  /** ID */
  id?: string
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
  /** 类型 1=社招流程, 2=校招流程, */
  type?: 1 | 2
  /** 阶段列表, 内部按用户设置顺序排列 */
  stage_list?: JobProcessesStage[]
}

export interface JobProcessesStage {
  /** ID */
  id?: string
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
  /** 1=筛选型, 2=评估型, 3=笔试型, 4=面试型, 5=Offer型, 6=待入职, 7=已入职, 8=其它类型, 255=系统默认，后端模型中并没有该字段，仅用于前端显示, */
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 255
}

export interface JobRecruiter2 {
  /** 职位ID */
  id?: string
  /** 招聘负责人ID */
  recruiter_id?: string
  /** 用人经理ID列表 */
  hiring_manager_id_list?: string[]
  /** 协助人ID列表 */
  assistant_id_list?: string[]
}

export interface JobRequirementCustomizedData {
  /** 自定义字段 ID */
  object_id?: string
  /** 自定义字段 value，1. 对于自定义字段，若字段类型为单行文本/多行文本，传值格式为"这是一个文本"；2. 若字段类型为单选，传值内容为选项的 ID，格式为"6890840516938696974"；3. 若字段类型为多选，传值内容为选项的ID 列表，格式为"[\"6890840516938696974\", \"6890840516938696975\" ]"；4. 若字段类型为时间段，传值格式为"[\"1609430400000\", \"1612108800000\" ]"，单位是毫米级时间戳；5. 若字段类型为年份选择，传值格式为"1609430400000"，单位是毫秒级时间戳；6. 若字段类型为月份选择，传值格式为"1625068800000"，单位是毫秒级时间戳；7. 若字段类型为数字，传值格式为"1"; */
  value?: string
}

export interface JobRequirementCustomizedDataDto {
  /** 自定义字段 ID */
  object_id?: string
  /** 字段名称 */
  name?: I18n
  /** 字段类型 */
  object_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** 自定义字段值 */
  value?: JobRequirementCustomizedValue
}

export interface JobRequirementCustomizedOption {
  /** 选项 ID */
  key?: string
  /** 选项名称 */
  name?: I18n
}

export interface JobRequirementCustomizedTimeRange {
  /** 开始时间，毫秒级时间戳 */
  start_time?: string
  /** 结束时间，毫秒级时间戳 */
  end_time?: string
}

export interface JobRequirementCustomizedValue {
  /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
  content?: string
  /** 当字段类型为单选时，从此字段取值 */
  option?: JobRequirementCustomizedOption
  /** 当字段类型为多选时，从此字段取值 */
  option_list?: JobRequirementCustomizedOption[]
  /** 当字段类型为时间段时，从此字段取值 */
  time_range?: JobRequirementCustomizedTimeRange
  /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是毫秒级时间戳 */
  time?: string
  /** 当字段类型为数字时，从此字段取值 */
  number?: string
}

export interface JobRequirementDto {
  /** 招聘需求 ID */
  id?: string
  /** 招聘需求编号 */
  short_code?: string
  /** 需求名称 */
  name?: string
  /** 需求状态 */
  display_progress?: 1 | 2 | 3 | 4 | 5 | 6
  /** 需求人数 */
  head_count?: number
  /** 职位性质 */
  recruitment_type?: IdNameObject
  /** 人员类型 */
  employee_type?: IdNameObject
  /** 最高职级 */
  max_level?: IdNameObject
  /** 最低职级 */
  min_level?: IdNameObject
  /** 职位序列 */
  sequence?: IdNameObject
  /** 需求类型 */
  category?: 1 | 2
  /** 需求部门 */
  department?: IdNameObject
  /** 需求负责人 */
  recruiter_list?: IdNameObject[]
  /** 需求用人经理 */
  jr_hiring_managers?: IdNameObject[]
  /** 直属上级 */
  direct_leader_list?: IdNameObject[]
  /** 开始日期，毫秒级时间戳 */
  start_time?: string
  /** 预计完成日期，毫秒级时间戳 */
  deadline?: string
  /** 招聘优先级 */
  priority?: 1 | 2 | 3
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 最高薪资 */
  max_salary?: string
  /** 最低薪资 */
  min_salary?: string
  /** 工作地点 */
  address?: IdNameObject
  /** 需求描述 */
  description?: string
  /** 自定义字段 */
  customized_data_list?: JobRequirementCustomizedDataDto[]
  /** 招聘需求支持的招聘类型 */
  process_type?: 1 | 2
  /** 职位类别 */
  job_type?: JobTypeInfo
  /** 创建时间,毫秒级时间戳 */
  create_time?: string
  /** 创建人ID */
  creator_id?: string
  /** 更新时间,毫秒级时间戳 */
  update_time?: string
  /** 职务 ID */
  employment_job_id?: string
  /** 岗位 ID */
  position_id?: string
}

export interface JobRequirementSchema {
  /** 模板 ID */
  id?: string
  /** 国际化模板名称 */
  name?: I18n
  /** 模板字段 */
  object_list?: CommonSchema[]
}

export interface JobRequirementSimple {
  /** 招聘需求 ID */
  id?: string
  /** 招聘需求编号 */
  short_code?: string
  /** 需求名称 */
  name?: string
  /** 需求部门 ID */
  department_id?: string
}

export interface JobRequirementUpdateOption {
  /** 是否需要修改关联的职位 */
  need_update_related_job?: boolean
}

export interface JobSchema {
  /** 职位模板 ID */
  id?: string
  /** 职位模板名称 */
  name?: I18n
  /** 职位模板类型 */
  scenario_type?: 1 | 2
  /** 模块列表 */
  object_list?: CommonSchema[]
}

export interface JobStorefront {
  /** 门店ID */
  id?: string
  /** 门店名称 */
  name?: I18n
  /** 启用状态 */
  active_status?: 1 | 2
  /** 门店部门 */
  department?: JobDepartmentSimple
  /** 门店地址 */
  address?: CommonAddress
  /** 门店负责人 */
  manager?: JobUserInfo
  /** 创建时间，毫秒级时间戳 */
  create_time?: string
  /** 备注 */
  remark?: I18n
}

export interface JobTitle {
  /** 职务ID */
  job_title_id?: string
  /** 职务名称。1-100字符，支持中、英文及符号 */
  name?: string
  /** 多语言职务名称 */
  i18n_name?: I18nContent[]
  /** 是否启用 */
  status?: boolean
}

export interface JobTypeInfo {
  /** 职位类别ID */
  id: string
  /** 职位类别名称 */
  name: I18n
  /** 父级职位类别ID */
  parent_id?: string
}

export interface JobUserInfo {
  /** 人员 ID */
  id?: string
  /** 名称 */
  name?: I18n
}

export interface KeyresultData {
  /** 关键举措 ID */
  keyresult_id: string
  /** 关键举措的评分 */
  score?: string
  /** 该关键举措的填写项内容 */
  text?: string
  /** 富文本格式的填写内容，解析方式见 [editor](https://open.larkoffice.com/document/client-docs/gadget/component-component/basic-component/form/editor#51af2f4f) */
  richtext?: string
}

export interface KvEntity {
  /** 识别的实体类型 */
  type?: string
  /** 识别出字段的文本信息 */
  value?: string
}

export interface Label {
  /** 中文内容 */
  zh_cn: string
  /** 英文内容 */
  en_us: string
}

export interface LangText {
  /** 语言码 */
  lang: string
  /** 语言码对应的文本 */
  value: string
}

export interface Language {
  /** 语言 ID */
  language_id?: string
  /** 语言名称 */
  name?: I18n[]
  /** IETF 编码 */
  ietf_language_tag?: string
  /** 状态 */
  status?: 1 | 0
}

export interface LateOffLateOnRule {
  /** 晚走多久 */
  late_off_minutes: number
  /** 晚到多久 */
  late_on_minutes: number
}

export interface LateOffLateOnSetting {
  /** 当日晚走时间计算规则 */
  late_off_base_on_time_type?: 0 | 1
  /** 次日晚到时间计算规则 */
  late_on_base_on_time_type?: 0 | 1
}

export interface LeaveAccrualRecord {
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
  reason: LangText[]
  /** 授予记录的创建时间，unix时间戳 */
  created_at: string
  /** 授予记录的创建人的ID */
  created_by: string
  /** 授予记录的更新时间，unix时间戳 */
  updated_at: string
  /** 授予记录的更新人的ID */
  updated_by: string
  /** 是否参与折算 */
  section_type?: number
}

export interface LeaveBalance {
  /** 假期类型ID */
  leave_type_id: string
  /** 假期类型名称 */
  leave_type_name: I18n[]
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
  /** 历史结转发放 */
  history_cycle_accrual?: string
  /** 当前周期余额 */
  balance_in_current_cycle?: string
  /** 已休时长 */
  taken?: string
  /** 历史周期已休时长 */
  taken_history_cycle?: string
  /** 余额（离职折算） */
  offboarding_balance?: string
  /** 已休时长（截止当日） */
  taken_current_date?: string
  /** 本周期授予时长（离职折算） */
  offboarding_granted?: string
}

export interface LeaveEmployExpireRecord {
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
  reason: LangText[]
  /** 是否已经被外部系统更改过 */
  is_update_by_external: boolean
  /** 授予来源 */
  accrual_source: 1 | 2 | 3 | 4 | 5 | 6
  /** 假期子类型id */
  leave_sub_type_id: string
  /** 是否参与清算 */
  section_type?: number
}

export interface LeaveGrantingRecord {
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
  reason: I18n[]
  /** 授予记录的创建时间，毫秒级unix时间戳 */
  created_at: string
  /** 授予记录的创建人，值为创建人的员工 ID */
  created_by: string
  /** 授予记录的更新时间 */
  updated_at: string
  /** 授予记录的更新人，值为更新人的员工 ID */
  updated_by: string
  /** 是否参与折算 */
  section_type?: number
}

export interface LeaveNeedPunchCfg {
  /** 晚到超过多久记为迟到 */
  late_minutes_as_late?: number
  /** 晚到超过多久记为缺卡 */
  late_minutes_as_lack?: number
  /** 早走超过多久记为早退 */
  early_minutes_as_early?: number
  /** 早走超过多久记为缺卡 */
  early_minutes_as_lack?: number
}

export interface LeaveProcessInfo {
  /** 流程id */
  process_id: string
  /** 流程状态 */
  process_status: string
  /** 流程发起时间 */
  process_apply_time: string
}

export interface LeaveRequest {
  /** 请假记录ID */
  leave_request_id: string
  /** 雇佣信息ID */
  employment_id: string
  /** 员工姓名 */
  employment_name: I18n[]
  /** 假期类型ID */
  leave_type_id: string
  /** 假期类型名称 */
  leave_type_name: I18n[]
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
  details?: LeaveRequestDetail[]
  /** 假期类型枚举 */
  leave_type_code?: string
  /** 实际结束日期 */
  actual_end_date?: string
  /** 预估结束日期 */
  estimated_end_date?: string
  /** 时区 */
  time_zone?: string
  /** 请假记录数据来源 */
  data_source?: number
  /** 请假申请流程ID */
  leave_process_id?: string[]
  /** 请假更正流程ID */
  leave_correct_process_id?: string[]
  /** 请假取消流程ID */
  leave_cancel_process_id?: string[]
  /** 请假返岗流程ID */
  leave_return_process_id?: string[]
  /** workDay算薪类型 */
  wd_paid_type?: number
  /** 请假更正流程信息 */
  leave_correct_process_info?: LeaveProcessInfo[]
}

export interface LeaveRequestDetail {
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

export interface LeaveSubtype {
  /** 假期子类ID */
  leave_type_id: string
  /** 假期子类名称 */
  leave_type_name: I18n[]
}

export interface LeaveType {
  /** 假期类型ID */
  leave_type_id: string
  /** 假期类型名称 */
  leave_type_name: I18n[]
  /** 假期类型状态 */
  status: number
  /** 假期子类列表 */
  leave_subtype_list?: LeaveSubtype[]
  /** 假期类型的创建时间 */
  created_at: string
  /** 假期类型的创建人，值为创建人的员工 ID */
  created_by: string
  /** 假期类型的更新时间 */
  updated_at: string
  /** 假期类型的更新人，值为更新人的员工 ID */
  updated_by: string
}

export interface Link {
  /** 超链接指向的 url (需要 url_encode) */
  url: string
}

export interface LinkPreview {
  /** 链接类型 */
  url_type: 'MessageLink' | 'Undefined'
}

export interface ListChat {
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
  /** 群状态 */
  chat_status?: 'normal' | 'dissolved' | 'dissolved_save'
}

export interface ListMember {
  /** member id类型 */
  member_id_type?: string
  /** member id */
  member_id?: string
  /** 名字 */
  name?: string
  /** tenant key */
  tenant_key?: string
}

export interface ListModerator {
  /** 可发言用户 ID 类型 */
  user_id_type?: string
  /** 可发言用户 ID */
  user_id?: string
  /** tenant key */
  tenant_key?: string
}

export interface Location {
  /** 地址id */
  location_id?: string
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

export interface LocationCity {
  /** 市地址Code码 */
  city_code?: string
  /** 省份/州地址Code码 */
  state_code?: string
  /** 国家地址Code码 */
  country_code?: string
  /** 市地址名称信息聚合 */
  city_name_info?: LocationNameInfo
}

export interface LocationCountry {
  /** 国家地址Code码 */
  country_code?: string
  /** 国家地址名称信息聚合 */
  country_name_info?: LocationNameInfo
}

export interface LocationDistrict {
  /** 区/县Code码 */
  district_code?: string
  /** 市地址Code码 */
  city_code?: string
  /** 省份/州地址Code码 */
  state_code?: string
  /** 国家地址Code码 */
  country_code?: string
  /** 区/县地址名称信息聚合 */
  district_name_info?: LocationNameInfo
}

export interface LocationDto {
  /** 国家信息列表,仅当 location_type=1 时返回 */
  country?: LocationCountry
  /** 省份/州信息列表,仅当 location_type=2 时返回 */
  state?: LocationState
  /** 市信息列表，仅当 location_type=3 时返回 */
  city?: LocationCity
  /** 区/县信息列表，仅当 location_type=4 时返回 */
  district?: LocationDistrict
}

export interface LocationNameInfo {
  /** 地址中文名 */
  zh_name?: string
  /** 地址英文名 */
  en_name?: string
  /** 地址拼音名 */
  py_name?: string
}

export interface LocationState {
  /** 省份/州地址Code码 */
  state_code?: string
  /** 国家地址Code码 */
  country_code?: string
  /** 省份/州地址名称信息聚合 */
  state_name_info?: LocationNameInfo
}

export type Logic = string

export interface LookupWithAvatar {
  /** 用户ID */
  id?: string
  /** 用户名称 */
  name?: string
  /** 租户ID */
  tenant_id?: string
  /** 用户邮箱 */
  email?: string
}

export interface Machine {
  /** 考勤机序列号 */
  machine_sn: string
  /** 考勤机名称 */
  machine_name: string
}

export interface MailAddress {
  /** 邮件地址 */
  mail_address: string
  /** 名称 */
  name?: string
}

export interface MailContact {
  /** 联系人 id */
  id?: string
  /** 联系人姓名 */
  name: string
  /** 联系人公司 */
  company?: string
  /** 联系人手机号 */
  phone?: string
  /** 联系人邮箱 */
  mail_address?: string
  /** 联系人标签 */
  tag?: string
  /** 联系人备注 */
  remark?: string
  /** 联系人头像 */
  avatar?: string
  /** 联系人职位 */
  position?: string
}

export interface Mailgroup {
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
  /** Who can send mail to this mail group. Possible values are:- ANYONE: Any Internet user can send mail to this mail group- ALL_INTERNAL_USERS: Anyone in the team can send mail to this mail group- ALL_GROUP_MEMBERS: Any group member can send mail to this mail group- CUSTOM_MEMBERS: Only custom members can send mail to this mail group, define in mailgroup.permission_members resoure */
  who_can_send_mail?: 'ANYONE' | 'ALL_INTERNAL_USERS' | 'ALL_GROUP_MEMBERS' | 'CUSTOM_MEMBERS'
}

export interface MailgroupManager {
  /** 管理员用户ID */
  user_id?: string
}

export interface MailgroupMember {
  /** The unique ID of a member in this mail group */
  member_id?: string
  /** The member's email address. Value is valid when type is one of USER/EXTERNAL_USER/MAIL_GROUP/PUBLIC_MAILBOX/OTHER_MEMBER */
  email?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department- COMPANY: member is the company- EXTERNAL_USER: internet user outside the organization- MAIL_GROUP: member is another mail group- PUBLIC_MAILBOX: member is a public mailbox- OTHER_MEMBER: other internal member */
  type?: 'USER' | 'DEPARTMENT' | 'COMPANY' | 'EXTERNAL_USER' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX' | 'OTHER_MEMBER'
}

export interface MailgroupPermissionMember {
  /** The unique ID of a member in this permission group */
  permission_member_id?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The member's department id. Value is valid when type is DEPARTMENT */
  department_id?: string
  /** The member's email address. Value is valid when type is MAIL_GROUP/PUBLIC_MAILBOX */
  email?: string
  /** The type of member. Possible values are:- USER: internal user in the team- DEPARTMENT: member is a department */
  type?: 'USER' | 'DEPARTMENT' | 'MAIL_GROUP' | 'PUBLIC_MAILBOX'
}

export interface ManagementScope {
  /** 管理维度 */
  management_dimension: string
  /** 被授权管理维度对象ID */
  obj_id: string
}

export interface Manager {
  user_id?: string
  name?: string
  en_name?: string
}

export interface MaskSession {
  /** 创建时间 */
  create_time?: string
  /** 客户端类型 */
  terminal_type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8
  /** 用户ID */
  user_id?: string
  /** 需要登出的 session 标识符 */
  sid?: string
}

export interface MatchInfo {
  /** 实体词 id */
  entity_id?: string
  /** 匹配中的字段 */
  type?: 0 | 1 | 2
}

export interface MatchRule {
  /** 左值 */
  left_value: 'department' | 'department_hierarchy' | 'work_location' | 'work_location_hierarchy' | 'cost_center' | 'cost_center_hierarchy' | 'job' | 'job_level' | 'job_family' | 'job_family_hierarchy' | 'employee_type'
  /** 操作符 */
  operator: 'contains' | 'notContains'
  /** 右值 */
  right_values?: string[]
}

export interface MatchRules {
  /** 匹配规则组，组内取交集 */
  match_rules?: MatchRule[]
}

export interface Meeting {
  /** 会议ID */
  id?: string
  /** 会议主题 */
  topic?: string
  /** 会议链接 */
  url?: string
  /** 会议号 */
  meeting_no?: string
  /** 会议密码 */
  password?: string
  /** 会议创建时间（unix时间，单位sec） */
  create_time?: string
  /** 会议开始时间（unix时间，单位sec） */
  start_time?: string
  /** 会议结束时间（unix时间，单位sec） */
  end_time?: string
  /** 主持人 */
  host_user?: MeetingUser
  /** 该会议是否支持互通 */
  meeting_connect?: boolean
  /** 会议状态 */
  status?: 1 | 2 | 3
  /** 峰值参会人数 */
  participant_count?: string
  /** 累计参会人数 */
  participant_count_accumulated?: string
  /** 参会人列表 */
  participants?: MeetingParticipant[]
  /** 会中使用的能力 */
  ability?: MeetingAbility
}

export interface MeetingAbility {
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

export interface MeetingInfo {
  /** 9位会议号 */
  meeting_id?: string
  /** 会议主题 */
  meeting_topic?: string
  /** 会议类型 */
  meeting_type?: 1 | 2 | 3
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
  /** 累计入会设备数 */
  number_of_devices?: string
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
  /** 关联会议室列表 */
  reserved_rooms?: ReservedRoom[]
  /** 是否有关联文档和纪要 */
  has_related_document?: boolean
}

export interface MeetingInviteStatus {
  /** 用户ID */
  id?: string
  /** 用户类型 */
  user_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 邀请结果 */
  status?: 1 | 2
}

export interface MeetingParticipant {
  /** 用户ID */
  id?: string
  /** 首次入会时间，秒级Unix时间戳 */
  first_join_time?: string
  /** 最终离会时间，秒级Unix时间戳 */
  final_leave_time?: string
  /** 累计在会中时间，时间单位：秒 */
  in_meeting_duration?: string
  /** 用户类型 */
  user_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 是否为主持人 */
  is_host?: boolean
  /** 是否为联席主持人 */
  is_cohost?: boolean
  /** 是否为外部参会人 */
  is_external?: boolean
  /** 参会人状态 */
  status?: 1 | 2 | 3 | 4
}

export interface MeetingParticipantResult {
  /** 用户ID */
  id?: string
  /** 用户类型 */
  user_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 结果 */
  result?: 1 | 2
}

export interface MeetingRecording {
  /** 录制文件URL */
  url?: string
  /** 录制总时长（单位msec） */
  duration?: string
}

export interface MeetingSettings {
  /** 设置会议 owner */
  owner_id?: string
  /** 设置入会范围 */
  join_meeting_permission?: 'anyone_can_join' | 'only_organization_employees' | 'only_event_attendees'
  /** 指定主持人 */
  assign_hosts?: string[]
  /** 设置自动录制 */
  auto_record?: boolean
  /** 开启等候室 */
  open_lobby?: boolean
  /** 允许日程参与者发起会议 */
  allow_attendees_start?: boolean
}

export interface MeetingUser {
  /** 用户ID */
  id?: string
  /** 用户类型 */
  user_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

export interface Member {
  /** 知识库协作者 ID 类型 */
  member_type: string
  /** 知识库协作者 ID */
  member_id: string
  /** 知识库协作者角色 */
  member_role: string
  /** 知识库协作者类型 */
  type?: 'user' | 'chat' | 'department'
}

export interface Memberlist {
  /** 成员ID */
  member_id: string
  /** 用户组成员的类型，目前取值为 user。未来将支持department */
  member_type: string
  /** 成员ID类别，仅请求参数中有效 */
  member_id_type?: string
}

export interface MemberResult {
  /** 成员ID */
  member_id: string
  /** 结果响应码，0表示成功 */
  code: number
}

export interface MemberSetting {
  /** 是否支持多选 */
  multi?: boolean
}

export interface MemberStatusChange {
  /** 是否入职日上班无需打卡 */
  onboarding_on_no_need_punch?: boolean
  /** 是否入职日下班无需打卡 */
  onboarding_off_no_need_punch?: boolean
  /** 是否离职日上班无需打卡 */
  offboarding_on_no_need_punch?: boolean
  /** 是否离职日下班无需打卡 */
  offboarding_off_no_need_punch?: boolean
}

export interface Mention {
  /** mention key */
  key: string
  /** 用户或机器人的 id, id 类型与 id_type 一致 */
  id: string
  /** id类型，包括open_id，user_id，union_id 或 app_id */
  id_type: string
  /** 被at用户的姓名 */
  name: string
  /** tenant key */
  tenant_key?: string
}

export interface MentionDoc {
  /** 云文档 token */
  token: string
  /** 云文档类型 */
  obj_type: 1 | 3 | 8 | 11 | 12 | 15 | 16 | 22
  /** 云文档链接（需要 url_encode) */
  url: string
  /** 文档标题，只读属性 */
  title?: string
  /** 文本局部样式 */
  text_element_style?: TextElementStyle
}

export interface MentionEntity {
  /** 被@人在 content 中的偏移量 */
  offset: number
  /** 被@人的 user id */
  user_id: string
}

export interface MentionUser {
  /** 用户 OpenID */
  user_id: string
  /** 文本局部样式 */
  text_element_style?: TextElementStyle
}

export interface MergeTableCellsRequest {
  /** 行起始索引（区间左闭右开） */
  row_start_index: number
  /** 行结束索引（区间左闭右开） */
  row_end_index: number
  /** 列起始索引（区间左闭右开） */
  column_start_index: number
  /** 列结束索引（区间左闭右开） */
  column_end_index: number
}

export interface Message {
  /** 消息id open_message_id */
  message_id?: string
  /** 根消息id open_message_id */
  root_id?: string
  /** 父消息的id open_message_id */
  parent_id?: string
  /** 消息所属的话题 ID */
  thread_id?: string
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
  sender?: Sender
  /** 消息内容,json结构 */
  body?: MessageBody
  /** 被艾特的人或应用的id */
  mentions?: Mention[]
  /** 合并消息的上一层级消息id open_message_id */
  upper_message_id?: string
}

export interface MessageAction {
  /** pc 端链接 */
  pc_app_link?: string
  /** 移动端链接 */
  mobile_app_link?: string
  /** 国际化信息 */
  i18n?: MessageActionI18nInfo[]
}

export interface MessageActionI18nInfo {
  /** 国际化语言的 key */
  i18n_key?: 'zh_cn' | 'en_us' | 'ja_jp'
  /** 国际化名称 */
  name?: string
}

export interface MessageBody {
  /** 消息jsonContent */
  content: string
}

export interface MessageReaction {
  /** reaction资源ID */
  reaction_id?: string
  /** 添加reaction的操作人 */
  operator?: Operator
  /** reaction动作的的unix timestamp(单位:ms) */
  action_time?: string
  /** reaction资源类型 */
  reaction_type?: Emoji
}

export interface Meta {
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

export interface MetaFailed {
  /** 获取元数据失败的文档token */
  token: string
  /** 获取元数据失败的错误码 */
  code: 970002 | 970003 | 970005
}

export interface MetricData {
  /** 指标 ID，可以通过获取指标详情接口获取详细信息 */
  id: string
  /** 指标评分 */
  score?: string
}

export interface MetricDetail {
  /** 指标 ID */
  metric_id?: string
  /** 指标名称，指标在该明细数据中的名称 */
  name?: string
  /** 指标字段信息 */
  fields?: MetricFieldInDetails[]
  /** 指标所属的指标维度 ID */
  dimension_id?: string
  /** 指标维度名称 */
  dimension_name?: I18n
  /** 指标维度的维度权重，如果没有设置则返回为空 */
  dimension_weight?: string
  /** 指标添加来源 */
  add_from?: 'reviewee' | 'admin'
  /** 指标是否引自指标库 */
  is_from_library?: boolean
}

export interface MetricDimension {
  /** 所属人群分组 ID，模板分人群设置指标时，指标维度按照人群分组；未分人群设置时该值为空 */
  group_id?: string
  /** 指标维度 ID */
  metric_dimension_id?: string
  /** 指标维度名称 */
  name?: I18n
  /** 每条指标的评估规则 ID */
  evaluation_rule_id_for_each_metric?: string
  /** 维度权重，如果没有设置则返回为空（备注：和 0 区分） */
  dimension_weight?: string
  /** 维度描述 */
  description?: I18n
  /** 指标评分规则设置 */
  review_rule_option?: 0 | 1
  /** 自定义指标设置 */
  custom_metric_config?: CustomMetricConfig
}

export interface MetricField {
  /** 指标字段信息 */
  field_id?: string
  /** 字段名称 */
  name?: I18n
  /** 字段类型 */
  type?: 'text' | 'number' | 'pencentage' | 'person'
}

export interface MetricFieldInDetails {
  /** 指标字段 ID。 系统预置的指标字段 ID 分别为：指标 1；权重 2；指标单位 3；目标值 4；完成值 5；完成说明 7。更多指标字段详情可通过【获取指标字段详情】接口获取 */
  field_id?: string
  /** 字段值 */
  field_value?: string
  /** 字段值，当字段为人员信息时有值 */
  field_value_person?: User
}

export interface MetricFieldInLibrary {
  /** 指标字段 ID。 系统预置的指标字段 ID 分别为：指标 1；权重 2；指标单位 3；目标值 4；完成值 5；完成说明 7。更多指标字段详情可通过【获取指标字段详情】接口获取 */
  field_id?: string
  /** 字段填写方式设置 */
  input_setting?: 'admin' | 'data_source_inputter' | 'reviewee'
  /** 字段值 */
  field_value?: string
  /** 字段值，当字段为人员信息时有值 */
  field_value_person?: User
}

export interface MetricFieldInTemplate {
  /** 指标字段 ID */
  id?: string
  /** 字段填写方式设置 */
  input_setting?: 'admin' | 'data_source_inputter' | 'reviewee'
  /** 字段值 */
  filed_value?: string
  /** 字段值，当字段为人员信息的时候有值 */
  field_value_person?: User
}

export interface MetricGroup {
  /** 人群分组ID */
  group_id?: string
  /** 名称 */
  name?: string
}

export interface MetricInLibrary {
  /** 指标 ID */
  metric_id?: string
  /** 指标名称 */
  name?: string
  /** 指标类型 ID */
  type_id?: string
  /** 所属的标签 */
  tags?: MetricTag[]
  /** 指标字段信息 */
  fields?: MetricFieldInLibrary[]
  /** 评分设置类型 */
  scoring_setting_type?: 'score_manually' | 'score_by_formula'
  /** 评分公式 */
  scoring_formula?: Formula
  /** 数据源录入人 ID */
  data_source_inputters?: User[]
  /** 可用范围 */
  range_of_availability?: 'admins_and_reviewees' | 'only_admins'
  /** 状态是否为启用 */
  is_active?: boolean
}

export interface MetricInTemplate {
  /** 所属人群分组 ID，模板分人群设置指标时，指标维度按照人群分组；未分人群设置时该值为空 */
  group_id?: string
  /** 指标 ID（备注：指标的统一标识 ID。如果模板存在分组，需要+分组 ID 才能标识到指标模板唯一的指标） */
  metric_id?: string
  /** 指标名称，指标在该模板中的名称 */
  name?: string
  /** 指标类型 ID */
  type_id?: string
  /** 指标字段信息 */
  fields?: MetricFieldInTemplate[]
  /** 指标是否引自指标库 */
  is_from_library?: boolean
  /** 评分设置类型 */
  scoring_setting_type?: 'socre_manually' | 'score_by_formula'
  /** 数据源录入人 */
  data_source_inputters?: User[]
  /** 所属维度ID */
  metric_dimension_id?: string
  /** 指标评估规则配置 */
  review_rule_config?: MetricReviewRuleConfig
}

export interface MetricReviewRuleConfig {
  /** 上限 */
  max?: string
  /** 下限 */
  min?: string
}

export interface MetricTag {
  /** 标签 ID */
  tag_id?: string
  /** 标签名称 */
  tag_name?: I18n
}

export interface MetricTemplate {
  /** 指标模板ID */
  id?: string
  /** 模版名称 */
  name?: I18n
  /** 模板描述 */
  description?: I18n
  /** 状态 */
  status?: 'to_be_configured' | 'to_be_activated' | 'enabled' | 'disabled'
  /** 是否分人群设置指标 */
  is_set_by_group?: boolean
  /** 指标总分计算方式 */
  total_metric_score_method?: 'review_manually' | 'sum' | 'weight' | 'formula'
  /** 指标权重计算方式 */
  metric_weight_method?: 'sum_of_metric_weights_for_each_dimension_equals_1' | 'total_sum_of_all_metric_weight_equals_1'
  /** 指标维度列表 */
  metric_dimensions?: MetricDimension[]
  /** 指标列表 */
  metrics?: MetricInTemplate[]
  /** 人群分组 */
  groups?: MetricGroup[]
}

export interface MindMap {
  /** 思维导图父节点 id ，为空表示是思维导图的根节点 */
  parent_id?: string
}

export interface Mindnote {
  /** 思维导图 token */
  token?: string
}

export interface Minute {
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

export interface Minutes {
  /** 速记语音文本列表 */
  sentences?: Sentence[]
}

export interface Mobile {
  /** 国家代码 */
  code?: string
  /** 手机号码 */
  number?: string
}

export interface ModuleAssessment {
  /** 对应面试评价表中模块 ID */
  interview_feedback_form_module_id?: string
  /** 模块名称 */
  module_name?: I18n
  /** 模块类型 */
  module_type?: 1 | 2
  /** 模块权重 */
  module_weight?: number
  /** 模块打分 */
  module_score?: number
  /** 模块评价 */
  dimension_assessments?: DimensionAssessment[]
}

export interface MoveResult {
  /** 移动完成的节点信息 */
  node: Node
  /** 节点移动状态码 */
  status: number
  /** 节点移动状态信息 */
  status_msg: string
}

export interface MultiFilterCondition {
  /** 比较表达式列表，内容如 base_info.mobile eq "\"+8613000000001\""的比较条件，多个表达式之间的关系为且 */
  conditions: FilterCondition[]
}

export interface Name {
  /** i18n文本 */
  name?: I18nText
  /** 别名 */
  another_name?: string
}

export interface NameForUpdate {
  /** 全名 */
  full_name?: string
  /** 名 */
  first_name?: string
  /** 中间名 */
  middle_name?: string
  /** 姓 */
  name_primary?: string
  /** 名 - 本地文字 */
  local_first_name?: string
  /** 本地中间名 */
  local_middle_name?: string
  /** 姓 - 本地文字 */
  local_primary?: string
  /** 自定义姓名（本地文字） */
  custom_local_name?: string
  /** 自定义姓名（西方文字） */
  custom_western_name?: string
  /** 国家/地区 */
  country_region: string
  /** 姓名类型，枚举值 */
  name_type: string
}

export interface NationalId {
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
  custom_fields?: CustomFieldData[]
}

export interface NationalIdForUpdate {
  /** 国家 / 地区 */
  country_region_id: string
  /** 国家证件类型 */
  national_id_type_id: string
  /** 证件号码 */
  national_id_number: string
  /** 证件签发日期 */
  issue_date?: string
  /** 证件到期日期 */
  expiration_date?: string
  /** 证件签发机构 */
  issued_by?: string
}

export interface NationalIdType {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 国家 / 地区 */
  country_region_id: string
  /** 名称 */
  name: I18n[]
  /** 启用 */
  active: boolean
  /** 校验规则 */
  validation_rule: string
  /** 校验规则描述 */
  validation_rule_description?: I18n[]
  /** 编码 */
  code: string
  /** 证件类型 */
  identification_type: Enum
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface Nationality {
  /** 国籍 ID，对应[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)等接口返回的 `nationality_id_v2` 字段 */
  nationality_id?: string
  /** 名称 */
  name?: I18n[]
  /** 国家/地区两位字母编码（ISO 3166-1） */
  alpha_2_code?: string
  /** 国家/地区三位字母编码（ISO 3166-1） */
  alpha_3_code?: string
  /** 数字代码 */
  numeric_code?: number
  /** 所属国家/地区 ID，详细信息可通过[查询国家/地区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口查询获得 */
  country_region_id?: string
  /** 状态 */
  status?: 1 | 0
}

export interface NativeRegion {
  iso_code?: string
  name?: string
}

export interface Navigate {
  /** pc 端主导航信息 */
  pc?: NavigateMeta
  /** 移动端主导航信息 */
  mobile?: NavigateMeta
}

export interface NavigateMeta {
  /** 主导航小程序版本号 */
  version?: string
  /** 默认图片 url */
  image_url?: string
  /** 选中态图片 url */
  hover_image_url?: string
}

export interface Node {
  /** 知识空间id，[获取方式](/ssl:ttdoc/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview) */
  space_id?: string
  /** 节点token，[获取方式](/ssl:ttdoc/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-overview) */
  node_token?: string
  /** 对应文档类型的token，可根据 obj_type 判断属于哪种文档类型。 */
  obj_token?: string
  /** 文档类型，对于快捷方式，该字段是对应的实体的obj_type。 */
  obj_type: 'doc' | 'sheet' | 'mindnote' | 'bitable' | 'file' | 'docx' | 'slides'
  /** 父节点 token。若当前节点为一级节点，父节点 token 为空。 */
  parent_node_token?: string
  /** 节点类型 */
  node_type: 'origin' | 'shortcut'
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
  /** 文档创建者 */
  creator?: string
  /** 文档所有者 */
  owner?: string
  /** 节点创建者 */
  node_creator?: string
}

export interface NodeApprover {
  /** node id 或 custom node id */
  key?: string
  /** 通过 查看审批定义 获取 value: 审批人列表 */
  value?: string[]
}

export interface NodeAutoApproval {
  /** 节点id的类型 */
  node_id_type?: 'CUSTOM' | 'NON_CUSTOM'
  /** 节点id */
  node_id?: string
}

export interface NodeCc {
  /** node id 或 custom node id */
  key?: string
  /** 通过 查看审批定义 获取 value: 审批人列表 */
  value?: string[]
}

export interface Note {
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

export interface Notification {
  /** 唯一ID */
  id?: string
  /** 任务名称 */
  job_name?: string
  /** 0(草稿)、1(等待审批)、 2(审批未通过)、3(正在发送中)、4(发送完成)、5(等待设置发送时间)、6(取消发送)、7(新人入职执行发送)、8(等待倒计时发送) */
  status?: number
  /** 创建人 */
  create_user?: NotificationUser
  /** 创建时间（毫秒时间戳） */
  created_at?: string
  /** 更新用户 */
  update_user?: NotificationUser
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
  new_staff_scope_department_list?: NotificationDepartment[]
  /** push推送到成员列表 */
  user_list?: NotificationUser[]
  /** push推送到的部门信息列表 */
  department_list?: NotificationDepartment[]
  /** push推送到的会话列表(群) */
  chat_list?: NotificationChat[]
  /** 预留扩展字段 */
  ext?: string
}

export interface NotificationChat {
  /** 会话ID */
  chat_id?: string
  /** 会话名称 */
  name?: string
}

export interface NotificationDepartment {
  /** 部门ID */
  department_id?: string
  /** 部门名称 */
  name?: string
}

export interface NotificationUser {
  /** 用户id */
  user_id?: string
  /** 头像地址 */
  avatar_url?: string
  /** 用户名称 */
  name?: string
}

export interface NumberSetting {
  /** 数字展示的格式 */
  format?: 'normal' | 'percentage' | 'cny' | 'usd' | 'custom'
  /** 自定义符号。只有`format`设为custom时才会生效。 */
  custom_symbol?: string
  /** 自定义符号显示的位置。 */
  custom_symbol_position?: 'left' | 'right'
  /** 分隔符样式 */
  separator?: 'none' | 'thousand'
  /** 保留小数位数。输入的数字值的小数位数如果比该设置多，多余的位数将被四舍五入后舍弃。如果`format`为"percentage"，表示变为百分数之后的小数位数。 */
  decimal_count?: number
}

export interface Object {
  /** 对象 ID */
  id?: number
  /** 对象 API 名称 */
  api_name?: string
  /** 对象名称 */
  label?: EeKunlunCommonI18nI18nText
  /** 对象配置 */
  settings?: ObjectSettings
}

export interface ObjectAttribute {
  /** 字段名称 */
  title?: I18n
  /** 字段描述 */
  description?: I18n
  /** 字段类型 */
  data_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** 字段标签 */
  tags?: number[]
  /** 是否为居民数据 */
  is_fcf_data?: boolean
  /** 是否为多元化数据 */
  is_di_data?: boolean
}

export interface ObjectField {
  /** 字段 id */
  id?: number
  /** API 名称 */
  api_name?: string
  /** 字段类型 */
  type?: string
  /** 字段名称 */
  label?: EeKunlunCommonI18nI18nText
}

export interface ObjectFieldData {
  /** 字段名 */
  field_name: string
  /** 字段值，是json转义后的字符串，根据元数据定义不同，字段格式不同(123, 123.23, true, [\"id1\",\"id2\], 2006-01-02 15:04:05]) */
  value: string
}

export interface ObjectiveData {
  /** 目标 ID */
  objective_id: string
  /** 目标的评分 */
  score?: string
  /** 评估人在该填写项填写的文本 */
  text?: string
  /** 评估的关键举措，当评估内容是对关键举措（KR）评估时有值 */
  keyresult_data?: KeyresultData[]
  /** 富文本格式的填写内容，解析方式见 [editor](https://open.larkoffice.com/document/client-docs/gadget/component-component/basic-component/form/editor#51af2f4f) */
  richtext?: string
}

export interface ObjectMeta {
  /** 对象信息 */
  object?: Object
  /** 字段信息 */
  fields?: ObjectField[]
}

export interface ObjectSearchLayout {
  /** 展示字段 */
  display_fields?: string[]
}

export interface ObjectSettings {
  /** 展示名称 */
  display_name?: string
  /** 允许搜索字段 */
  allow_search_fields?: string[]
  /** 展示字段 */
  search_layout?: ObjectSearchLayout
}

export interface Offboarding {
  /** 离职发起类型，包括： */
  initiating_type?: string
  /** 离职状态 */
  status?: 'Approving' | 'Approved' | 'Offboarded' | 'Rejected' | 'Withdrawn' | 'NoNeedApproval'
  /** 离职审批信息 */
  application_info?: ApplicationInfo
  /** 员工离职信息 */
  offboarding_info?: OffboardingInfo
  /** 离职办理流程信息 */
  offboarding_checklist?: OffboardingChecklist
  /** 离职单据ID */
  offboarding_id?: string
}

export interface OffboardingChecklist {
  /** 离职办理状态 */
  checklist_status?: string
  /** 离职流转开始时间 */
  checklist_start_time?: string
  /** 离职流转结束时间 */
  checklist_finish_time?: string
  /** 离职流转流程实例 ID */
  checklist_process_id?: string
}

export interface OffboardingInfo {
  /** 离职员工的雇佣 ID */
  employment_id?: string
  /** 员工的 hrbp 列表，所有的 hrbp */
  hrbp_id?: string[]
  /** 期望离职日期 */
  expected_offboarding_date?: string
  /** 离职日期 */
  offboarding_date?: string
  /** 离职原因 */
  reason?: Enum
  /** 离职原因说明 */
  reason_explanation?: string
  /** 离职原因（员工） */
  employee_reason?: Enum
  /** 离职原因说明（员工） */
  employee_reason_explanation?: string
  /** 是否加入离职屏蔽名单 */
  add_block_list?: string
  /** 屏蔽原因 */
  block_reason?: Enum
  /** 屏蔽原因说明 */
  block_reason_explanation?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
  /** 离职是否保留飞书账号 */
  retain_account?: boolean
  /** 社保停保年月 */
  social_insurance_end_date?: string
  /** 公积金截止年月 */
  provident_fund_end_date?: string
  /** 是否启动竞业 */
  enforce_noncompete_agreement?: boolean
  /** 竞业合同ID */
  noncompete_agreement_id?: string
  /** 竞业公司ID */
  noncompete_agreement_company?: string
  /** 竞业开始日期 */
  noncompete_agreement_start_date?: string
  /** 竞业结束日期 */
  noncompete_agreement_end_date?: string
  /** 签署方式 */
  sign_type?: Enum
  /** 签署文件ID列表 */
  signature_file?: string
  /** 最后出勤日 */
  last_attendance_date?: string
  /** 是否带编转移 */
  is_transfer_with_workforce?: boolean
}

export interface OffboardingReason {
  /** 离职原因唯一标识 */
  offboarding_reason_unique_identifier?: string
  /** 名称 */
  name?: I18n[]
  /** 是否启用 */
  active?: boolean
  /** 当前离职原因的父级原因唯一标识 */
  parent_offboarding_reason_unique_identifier?: string
  /** 创建时间 */
  created_time?: string
  /** 更新时间 */
  updated_time?: string
}

export interface Offer {
  /** Offer ID */
  id?: string
  /** 投递 ID */
  application_id?: string
  /** 基础信息 */
  basic_info?: ApplicationOfferBasicInfo
  /** 薪酬计划 */
  salary_plan?: ApplicationOfferSalaryPlan
  /** 当前 Offer 使用的 Schema */
  schema_id?: string
  /** Offer 状态 */
  offer_status?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  /** Offer 类型 */
  offer_type?: 1 | 2
  /** 职位信息 */
  job_info?: OfferJobInfo
  /** offer自定义模块列表 */
  customized_module_list?: ApplicationOfferCustomModule[]
  /** 招聘需求 ID */
  job_requirement_id?: string
  /** offer 发送记录列表 */
  offer_send_record_list?: OfferSendRecord[]
}

export interface OfferApplyForm {
  /** ID */
  id?: string
  /** 名称 */
  name?: I18n
  /** 创建时间 */
  create_time?: string
}

export interface OfferApplyFormConfigFormulaInfo {
  /** 公式值 */
  value?: string
  /** 公式结果类型枚举 */
  result?: 1 | 2 | 3
  /** 公式额外描述 */
  extra_map?: OfferApplyFormFormulaExtraMapInfo[]
}

export interface OfferApplyFormConfigOptionInfo {
  /** 选项 ID */
  id?: string
  /** 选项名称 */
  name?: I18n
  /** 选项描述 */
  description?: I18n
}

export interface OfferApplyFormFormulaExtraMapInfo {
  /** object ID */
  key?: string
  /** object 名称 */
  value?: I18n
}

export interface OfferApplyFormInfo {
  /** offer申请表 ID */
  id?: string
  /** offer申请表名称 */
  name?: I18n
  /** schema 信息 */
  schema?: OfferApplyFormSchema
}

export interface OfferApplyFormModuleInfo {
  /** 模块 ID */
  id?: string
  /** 模块名称 */
  name?: I18n
  /** 是否为自定义模块 */
  is_customized?: boolean
  /** 模块状态是否启用 */
  active_status?: 1 | 2
  /** 模块填写提示 */
  hint?: I18n
  /** 字段列表 */
  object_list?: OfferApplyFormObjectInfo[]
}

export interface OfferApplyFormObjectConfigInfo {
  /** 选项信息 */
  options?: OfferApplyFormConfigOptionInfo[]
  /** 公式信息 */
  formula?: OfferApplyFormConfigFormulaInfo
  /** 级联配置信息 */
  object_display_config?: OfferApplyFormObjectDisplayConfigInfo
}

export interface OfferApplyFormObjectDisplayConfigInfo {
  /** 展示条件枚举 */
  display_condition?: 1 | 2
  /** 字段条件配置 */
  pre_object_config_list?: OfferApplyFormPreObjectConfigInfo[]
}

export interface OfferApplyFormObjectInfo {
  /** 字段 ID */
  id?: string
  /** 字段名称 */
  name?: I18n
  /** 字段描述 */
  description?: I18n
  /** 所属模块 ID */
  module_id?: string
  /** 是否为自定义模块 */
  is_customized?: boolean
  /** 是否必填 */
  is_required?: boolean
  /** 是否启用 */
  active_status?: 1 | 2
  /** 是否修改后需审批 */
  need_approve?: boolean
  /** 是否敏感 */
  is_sensitive?: boolean
  /** 字段类型枚举 */
  object_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** 配置信息 */
  config?: OfferApplyFormObjectConfigInfo
}

export interface OfferApplyFormPreObjectConfigInfo {
  /** 字段 ID */
  id?: string
  /** 运算符枚举 */
  operator?: 1 | 2 | 3 | 4
  /** 字段值 */
  value?: string[]
}

export interface OfferApplyFormSchema {
  /** schema ID，用于描述申请表单结构的元数据定义，即对申请表内容的描述 */
  id?: string
  /** 模块列表 */
  module_list?: OfferApplyFormModuleInfo[]
}

export interface OfferAttachmentInfo {
  /** Offer 附件 ID */
  id?: string
  /** Offer 附件名称 */
  name?: string
  /** Offer 附件大小 */
  size?: number
}

export interface OfferBasicInfo {
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
  /** 合同期(年)，推荐使用「contract_period」，如果Offer申请表中「合同期(年)」字段已停用，则不可使用该字段 */
  contract_year?: number
  /** 合同期（年/月） */
  contract_period?: ContractPeriodInfo
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
  /** 岗位 ID */
  position_id?: string
  /** 入职职位 */
  job_offered?: string
}

export interface OfferBasicInfoV2 {
  /** Offer ID */
  id?: string
  /** Offer 状态 */
  offer_status?: 10 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  /** 直属上级 */
  leader?: BasicUserInfo
  /** 人员类型 */
  employee_type?: IdNameObject
  /** 部门 */
  department?: BasicDepartmentInfo
  /** 序列 */
  sequence?: IdNameObject
  /** 级别 */
  level?: IdNameObject
  /** 公司主体 */
  company_main_body?: IdNameObject
  /** 招聘需求 ID */
  job_requirement_id?: string
  /** 试用期（单位：月） */
  probation_month?: number
  /** 合同期（年/月） */
  contract_period?: ContractPeriodInfo
  /** 入职日期 */
  onboard_date?: string
  /** Offer 负责人 */
  owner?: BasicUserInfo
  /** 入职地址 */
  onboard_address?: BaseAddressV2
  /** 工作地址 */
  work_address?: BaseAddressV2
  /** Offer 备注 */
  remark?: string
  /** 附件列表 */
  attachment_list?: OfferAttachmentInfo[]
  /** Offer 自定义字段数据 */
  customize_info_list?: ApplicationOfferCustomValue[]
  /** Offer 创建时间戳（单位：毫秒） */
  create_time?: string
}

export interface OfferCustomFieldConfig {
  /** 选项信息，字段类型为「单选」、「多选」时需配置选项信息 */
  options?: OfferCustomFieldConfigOption[]
}

export interface OfferCustomFieldConfigOption {
  /** 选项名称 */
  name: I18n
}

export interface OfferCustomizedInfo {
  /** 自定义字段 ID */
  id?: string
  /** 自定义字段信息 */
  value?: string
}

export interface OfferEmailInfo {
  /** 抄送人邮件列表 */
  cc_email_list?: string[]
  /** 接收人邮件列表 */
  receiver_email_list?: string[]
  /** 邮件内容 */
  content?: string
}

export interface OfferFile {
  /** 文件 id */
  id?: string
  /** 文件模板 id */
  file_template_id?: string
  /** 文件模板名称 */
  file_template_name?: string
  /** 文件模板类型 id */
  file_template_type_id?: string
  /** 文件模板类型名称 */
  file_template_type_name?: string
}

export interface OfferInfo {
  /** Offer id */
  offer_id?: string
  /** Offer hr id */
  offer_hr_id?: string
  /** 部门 id */
  department_id?: string
  /** 直属领导id */
  direct_leader_id?: string
  /** 虚线上级id */
  dotted_line_manager_id?: string
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
  /** 合同期限时长 */
  duration_period?: number
  /** 合同期限单位 */
  duration_unit?: string
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
  /** 人员子类型id */
  employee_subtype_id?: string
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
  cost_center_rate?: JobDataCostCenter[]
  /** 职等ID */
  job_grade_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 任职公司 */
  service_company?: string
  /** 排班 */
  work_shift?: string
  /** 薪资类型 */
  compensation_type?: string
  /** 工作地点id */
  work_location_id?: string
  /** 入职地址id */
  onboarding_address_id?: string
  /** 办公地址id */
  office_address_id?: string
  /** 岗位id */
  position_id?: string
  /** 工作日历id */
  working_calendar_id?: string
  /** 工时制度 */
  working_hours_type?: string
  /** 薪资组 */
  pay_group_id?: string
  /** 入职流程ID */
  flow_id?: string
  /** 签到日期 */
  check_in_time?: string
  /** 签到方式 */
  check_in_method?: string
  /** 司龄起算日期 */
  seniority_date?: string
  /** 司龄调整信息 */
  seniority_adjust_information_list?: PrehireSeniorityAdjustInformation[]
}

export interface OfferInfoUpdate {
  /** 入职日期 */
  onboarding_date?: string
  /** 招聘应用ID */
  ats_application_id?: string
  /** 入职地点ID，详细信息可通过【批量查询地点】接口获得 */
  onboarding_location_id?: string
  /** 入职地址ID，详细信息可通过【批量查询地址】接口获得 */
  onboarding_address_id?: string
  /** 办公地点ID，详细信息可通过【批量查询地点】接口获得 */
  office_location_id?: string
  /** 办公地址ID，详细信息可通过【批量查询地址】接口获得 */
  office_address_id?: string
  /** 雇佣类型，通过查询枚举集【employment_type】获得枚举apiName */
  employment_type?: string
  /** 入职方式，通过查询枚举集【onboarding_method】获得枚举apiName */
  onboarding_method?: string
  /** 工作邮箱 */
  work_emails?: EmailForUpdate[]
  /** 成本中心分摊信息,只支持商业化租户 */
  cost_center_rates?: JobDataCostCenter[]
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 岗位 ID, */
  position_id?: string
  /** 试用期时长 */
  probation_period?: number
  /** 试用期开始日期 */
  probation_start_date?: string
  /** 试用期结束日期 */
  probation_end_date?: string
  /** 合同开始日期 */
  contract_start_date?: string
  /** 合同结束日期 */
  contract_end_date?: string
  /** 合同类型 */
  contract_type?: string
  /** 期限类型 */
  duration_type_id?: string
  /** 签订类型 */
  signing_type_id?: string
  /** 工号 */
  worker_id?: string
  /** 签到时间 */
  check_in_time?: string
  /** 签到方式 */
  check_in_method?: string
  /** 公司主体 */
  company?: string
  /** 排班 */
  work_shift?: string
  /** 招聘类型 */
  recruitment_type_id?: string
  /** 薪资类型 */
  compensation_type?: string
  /** 薪资组 */
  pay_group_id?: string
  /** offer HR */
  offer_hr_id?: string
  /** 职务 */
  job_id?: string
  /** 序列 */
  job_family_id?: string
  /** 职级 */
  job_level_id?: string
  /** 职等 */
  job_grade_id?: string
  /** 人员类型 */
  employee_type_id?: string
  /** 人员子类型 */
  employee_subtype_id?: string
  /** 直属上级 */
  direct_leader_id?: string
  /** 虚线上级 */
  dotted_line_manager_id?: string
  /** 部门 */
  department_id?: string
  /** 社保城市 */
  social_security_city?: string
  /** 工作城市 */
  work_location_id?: string
  /** 工作日历 */
  working_calendar?: string
  /** 工时制度 */
  working_hours_type?: string
  /** 司龄起算日期 */
  seniority_date?: string
  /** 司龄调整信息 */
  seniority_adjust_information_list?: PrehireSeniorityAdjustInformationUpdate[]
}

export interface OfferInfoV2 {
  /** Offer 基本信息 */
  offer_basic?: OfferBasicInfoV2
  /** Offer 薪酬信息 */
  offer_salary?: OfferSalaryInfoV2
}

export interface OfferJobInfo {
  /** Offer 职位 ID */
  job_id?: string
  /** Offer 职位名称 */
  job_name?: string
}

export interface OfferListInfo {
  /** Offer ID */
  id?: string
  /** Offer 职位 */
  job_info?: OfferJobInfo
  /** 创建时间 */
  create_time?: string
  /** Offer 状态 */
  offer_status?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  /** Offer 类型 */
  offer_type?: 1 | 2
  /** Offer 人员类型 */
  employee_type?: BaseBilingualWithId
  /** Offer 投递 ID */
  application_id?: string
}

export interface OfferSalaryInfo {
  /** 币种 */
  currency: string
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

export interface OfferSalaryInfoV2 {
  /** 薪酬 ID */
  id?: string
  /** 薪酬状态 */
  salary_status?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
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
  /** 年度现金总额 */
  total_annual_cash?: string
  /** 薪酬自定义字段 */
  customize_info_list?: ApplicationOfferCustomValue[]
  /** 薪酬创建时间戳（单位：毫秒） */
  create_time?: string
}

export interface OfferSchemaDetail {
  /** 字段ID */
  id?: string
  /** 字段名称 */
  name?: OfferSchemaName
  /** 字段类型, text=单行文本, long_text=多行文本, select=单选, multi_select=多选, date_select=日期, number=数字 */
  type?: string
  /** 字段是否为自定义 */
  is_customized?: boolean
  /** 单选/多选可选择字段的选项值 */
  option_list?: OfferSchemaDetailOption[]
}

export interface OfferSchemaDetailOption {
  /** 名字 */
  name?: OfferSchemaName
  /** 选项序号 */
  index?: number
  /** 选项当前是否启用 */
  active_status?: 1 | 2
}

export interface OfferSchemaName {
  /** 中文名 */
  zh_cn?: string
  /** 英文名 */
  en_us?: string
}

export interface OfferSendRecord {
  /** offer 发送记录 id */
  offer_send_record_id?: string
  /** 操作人 user id */
  operator_user_id?: string
  /** offer 发送时间 */
  send_time?: string
  /** offer 状态 */
  offer_letter_status?: 1 | 2 | 3 | 4 | 5
  /** offer 邮件信息 */
  email_info?: OfferEmailInfo
  /** 跟进记录 */
  acceptance_list?: Acceptance[]
  /** offer 文件列表 */
  offer_file_list?: OfferFile[]
  /** offer 签署信息 */
  offer_signature_info?: OfferSignatureInfo
}

export interface OfferSignatureInfo {
  /** 电子签信息 id */
  id?: string
  /** 电子签签署状态 */
  signature_status?: 1 | 2 | 3 | 4 | 5
  /** 电子签附件列表 */
  attachment_list?: SignatureAttachment[]
}

export interface Okr {
  /** OKR ID */
  okr_id?: string
  /** 周期的状态 */
  period_display_status?: 'default' | 'normal' | 'invalid' | 'hidden'
  /** 周期名 - 中文 */
  period_name_zh?: string
  /** 周期名 - 英文 */
  period_name_en?: string
  /** OKR 所属的用户 ID */
  user_id?: string
  /** 可见性设置 */
  visible_setting?: OkrVisibleSetting
}

export interface OkrBatch {
  /** id */
  id?: string
  /** OKR的访问权限 */
  permission?: 0 | 1
  /** period_id */
  period_id?: string
  /** 名称 */
  name?: string
  /** Objective列表 */
  objective_list?: OkrObjective[]
  /** OKR确认状态 */
  confirm_status?: 0 | 1 | 2 | 3 | 4
}

export interface OkrKeyResult {
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
  progress_rate?: OkrProgressRate
  /** key result 的文本内容 */
  content?: Text
}

export interface OkrObjective {
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
  progress_rate?: OkrProgressRate
  /** objective 的文本内容 */
  content?: Text
}

export interface OkrObjectiveAlignedObjectiveOwner {
  /** 用户的 open_id */
  open_id?: string
  /** 用户的 user_id */
  user_id?: string
}

export type OkrProgress = unknown

export interface OkrProgressRate {
  /** 状态模式 */
  mode?: 'simple' | 'advanced'
  /** 当前进度 */
  current?: number
  /** 当前进度百分比，simple mode 下使用 */
  percent?: number
  /** 进展状态 */
  progress_status?: 'unset' | 'normal' | 'risk' | 'extended'
  /** 进度起始值，advanced模式使用 */
  start?: number
  /** 状态类型 */
  status_type?: 'default' | 'custom'
  /** 进度目标值，advanced模式使用 */
  target?: number
}

export interface OkrReview {
  /** 复盘的用户 */
  user_id?: OkrObjectiveAlignedObjectiveOwner
  /** 用户对应的OKR复盘列表 */
  review_period_list?: OkrReviewPeriod[]
}

export interface OkrReviewPeriod {
  /** 周期ID */
  period_id?: string
  /** 周期复盘 */
  cycle_review_list?: OkrReviewPeriodUrl[]
  /** 进展报告 */
  progress_report_list?: OkrReviewPeriodUrl[]
}

export interface OkrReviewPeriodUrl {
  /** 文档链接 */
  url?: string
  /** 创建时间 毫秒 */
  create_time?: string
}

export interface OkrVisibleSetting {
  /** 进展编辑区域是否可见 */
  progress_fill_area_visible?: boolean
  /** 状态是否可见 */
  progress_status_visible?: boolean
  /** 分数是否可见 */
  score_visible?: boolean
}

export interface OnboardingTask {
  /** 任务名称 */
  task_name?: string
  /** 任务名称 */
  task_status?: 'initiating' | 'terminated' | 'exception' | 'in_progress' | 'not_started' | 'skipped' | 'uninitialized' | 'failed' | 'in_review' | 'rejected' | 'completed'
  /** 当前操作人雇佣 ID */
  operator_id?: string
  /** 任务code */
  task_code?: string
}

export interface OpenapiLog {
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
  log_detail?: OpenapiLogDetail
}

export interface OpenapiLogDetail {
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

export interface OpenAppFeedCard {
  /** 业务 ID */
  biz_id?: string
  /** 主标题 */
  title?: string
  /** 头像 key */
  avatar_key?: string
  /** 预览信息 */
  preview?: string
  /** 状态标签 */
  status_label?: OpenFeedStatusLabel
  /** 交互按钮 */
  buttons?: OpenAppFeedCardButtons
  /** 跳转链接 */
  link?: OpenAppFeedLink
  /** 即时提醒状态，true-打开，false-关闭 */
  time_sensitive?: boolean
  /** 通知设置，当前可设置通知是否关闭，为空时默认进行通知 */
  notify?: AppFeedNotify
}

export interface OpenAppFeedCardButton {
  /** 跳转 URL */
  multi_url?: OpenAppFeedCardUrl
  /** 交互类型 */
  action_type: 'url_page' | 'webhook'
  /** 文字 */
  text: OpenAppFeedCardText
  /** 按钮类型 */
  button_type?: 'default' | 'primary' | 'success'
  /** action 字典 */
  action_map?: Record<string, string>
}

export interface OpenAppFeedCardButtons {
  /** 按钮组合 */
  buttons: OpenAppFeedCardButton[]
}

export interface OpenAppFeedCardText {
  /** 文本 */
  text: string
}

export interface OpenAppFeedCardUrl {
  /** 默认 URL */
  url?: string
  /** Android 平台 URL */
  android_url?: string
  /** iOS 平台 URL */
  ios_url?: string
  /** PC URL */
  pc_url?: string
}

export interface OpenAppFeedLink {
  /** 链接 */
  link?: string
}

export interface OpenFailedUserAppFeedCardItem {
  /** 业务 ID */
  biz_id: string
  /** 用户 ID */
  user_id: string
  /** 原因 */
  reason?: '0' | '1' | '2' | '3' | '4'
}

export interface OpenFeedStatusLabel {
  /** 标签文字 */
  text: string
  /** 标签类型 */
  type: 'primary' | 'secondary' | 'success' | 'danger'
}

export interface OperationLogEntityField {
  /** 变更字段 */
  field?: string
  /** 旧值 */
  before?: string
  /** 新值 */
  after?: string
}

export interface Operator {
  /** 操作人ID */
  operator_id: string
  /** 操作人身份，用户或应用 */
  operator_type: 'app' | 'user'
}

export interface OperatorDetail {
  /** 操作人名字信息 */
  operator_name: OperatorName
  /** 操作人租户名 */
  tenant_name?: string
}

export interface OperatorName {
  /** 操作人默认名 */
  default_name: string
  /** 操作人 i18n 名字 map */
  i18n_value?: I18n
}

export interface Option {
  /** 选项名称，不能为空，最大50个字符 */
  name: string
  /** 选项的颜色索引值，可以是0～54中的一个数字。如果不填写则会随机选一个。 */
  color_index?: number
  /** 选项是否隐藏。隐藏后的选项在界面不可见，也不可以再通过openapi将字段值设为该选项。 */
  is_hidden?: boolean
}

export interface OrderCondition {
  /** 字段名 */
  field?: string
  /** 排序方式 */
  order_type?: 'asc' | 'desc'
}

export interface OrganizationOpLog {
  /** 业务对象ID */
  object_id?: string
  /** 字段变化列表 */
  changes?: OperationLogEntityField[]
  /** 操作人 */
  operator?: string
  /** 操作类型 */
  operation_type?: number
  /** 操作时间 */
  operation_time?: string
  /** 操作生效时间 */
  effective_time?: string
  /** 操作原因说明 */
  operation_reason?: string
  /** 调整原因列表 */
  change_reasons?: string[]
}

export interface OrgdraftDepartmentId {
  /** 部门 ID ，新建部门审批通过前会返回空值 */
  department_id?: string
  /** 调整部门 ID ，新建部门审批通过前会返回格式为 td_xxx 的临时 ID */
  draft_department_id?: string
}

export interface OrgRole {
  /** 角色key */
  api_name: string
  /** 角色ID */
  security_group_id?: string
  /** 授权员工列表 */
  employment_ids?: string[]
  /** 继承至上级授权员工列表 */
  inherit_employment_ids?: string[]
}

export interface OrgRoleUpdate {
  /** 角色key（ID、key必须填一个） */
  api_name?: string
  /** 角色ID（ID、key必须填一个） */
  security_group_id?: string
  /** 授权员工列表 */
  employment_ids?: string[]
}

export interface OrgTruncation {
  /** 组织名称 */
  org_key?: string
  /** 下钻类型 */
  type?: number
  /** 下钻深度 */
  depth?: number
}

export interface Origin {
  /** 任务导入来源的名称，用于在任务中心详情页展示。需提供多语言版本。 */
  platform_i18n_name?: I18nText
  /** 任务关联的来源平台详情页链接 */
  href?: Href
}

export interface OtherRecRule {
  /** 记录筛选条件 */
  conditions?: RecRuleCondition[]
  /** 多个筛选条件的关系 */
  conjunction?: 'and' | 'or'
}

export interface OuterInfo {
  /** 数据提供方（不能包含中横线 "-"） */
  provider: string
  /** 唯一标识，可用来和其他平台的内容进行绑定。需保证和百科词条唯一对应（不能包含中横线 "-"） */
  outer_id: string
}

export interface OvertimeClockCfg {
  /** 是否允许在非打卡时段申请打卡（仅灰度租户可用） */
  allow_punch_approval?: boolean
  /** 加班开始和结束需打卡(需灰度) */
  need_clock_over_time_start_and_end?: boolean
}

export interface OvertimeRule {
  /** 上班时间 */
  on_overtime: string
  /** 下班时间 */
  off_overtime: string
}

export interface PageCondition {
  /** 本次请求条数 */
  page_size?: number
  /** 顺序分页查询，不能跳页查询，支持深分页，在需要遍历全部数据的场景只能使用该方式。第一次传空字符串或者不传，后面传上一次的返回值中的page_token */
  page_token?: string
}

export interface PageResponse {
  /** 是否还有后续结果 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
}

export interface Participant {
  /** 参会者 */
  participant_name?: string
  /** 部门 */
  department?: string
  /** 用户ID */
  user_id?: string
  /** 会议室ID */
  meeting_room_id?: string
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
  /** 日程响应状态 */
  accept_status?: 1 | 2 | 3 | 4
}

export interface ParticipantQuality {
  /** 网络 */
  network?: QualityNetwork
  /** 音频 */
  audio?: QualityAudio
  /** 视频 */
  video?: QualityVideoSharing
  /** 共享屏幕 */
  screen_sharing?: QualityVideoSharing
  /** Cpu使用量 */
  cpu_usage?: QualityCpuUsage
}

export interface Password {
  /** 企业邮箱密码 */
  ent_email_password: string
}

export interface PatchSchemaProperty {
  /** 属性名 */
  name: string
  /** 属性描述 */
  desc?: string
  /** 问答产品设置，仅在datasource中use_answer为true时生效 */
  answer_option?: SchemaFieldAnswerOption
}

export interface PatchTag {
  /** tagid */
  id?: string
  /** tag name */
  name?: string
  /** i18n名称集合 */
  i18n_names?: TagI18nName[]
}

export interface PatchTagFailReason {
  /** 名称重复的标签id */
  duplicate_id?: string
}

export interface Paygroup {
  /** 薪资组ID */
  pay_group_id: string
  /** 薪资组名称 */
  name: I18n
  /** 薪资组编码 */
  code: string
  /** 薪资组状态 */
  status: 1 | 0
  /** 薪资组所属国家/地区 */
  country_region?: CountryRegion
}

export interface PaymentAccountingItem {
  /** 算薪项唯一标识 */
  id?: string
  /** 算薪项名称 */
  accounting_item_names?: I18nContent[]
  /** 算薪项值 */
  accounting_item_value?: AccountingItemValue
  /** 算薪项分段数据 */
  segment_values?: SegmentValue[]
  /** 算薪项类型，1-文本；2-金额；3-数值；4-百分比；5-日期；6-引用 */
  accounting_item_type?: number
}

export interface PaymentActivity {
  /** 发薪活动唯一标识 */
  activity_id?: string
  /** 发薪活动名称 */
  activity_names?: I18nContent[]
  /** 发薪活动发薪日期 */
  pay_date?: string
  /** 发薪总笔数 */
  total_number_of_payroll?: number
  /** 关联的算薪活动个数 */
  number_of_calculation_activities?: number
  /** 发薪活动关联的算薪活动详情 */
  calculation_activities?: CalculationActivity[]
  /** 发薪活动审批状态，其中：100-待确认发薪名单；150-待提交审批；200-审批中；300-审批被拒绝；350-审批被撤回；360-审批被撤销；375-审批通过；400-已封存。 */
  activity_status?: number
}

export interface PaymentActivityDetail {
  /** 员工的唯一标识 */
  employee_id?: string
  /** 发薪明细详情 */
  payment_details?: PaymentAccountingItem[]
}

export interface PaymentDetail {
  /** 员工的唯一标识 */
  employee_id?: string
  /** 发薪明细所在的发薪活动 ID */
  activity_id?: string
  /** 发薪明细详情 */
  payment_accounting_items?: PaymentAccountingItem[]
}

export interface Period {
  /** id */
  id?: string
  /** 中文名称 */
  zh_name?: string
  /** 英文名称 */
  en_name?: string
  /** 状态 */
  status?: 0 | 1 | 2 | 3
  /** 周期开始时间 */
  period_start_time?: string
  /** 周期结束时间 */
  period_end_time?: string
}

export interface PeriodRule {
  /** 周期规则 */
  period_rule_id?: string
  /** 周期类型. year: 年度周期. month: 月份周期 */
  type?: string
  /** 周期长度（月) */
  length?: number
  /** 周期长度（月) */
  first_month?: number
}

export interface PermissionCollection {
  /** 功能权限 */
  feature_permissions?: IdNameObject[]
  /** 管理权限 */
  management_permissions?: IdNameObject[]
  /** 数据权限 */
  data_permissions?: DataPermission[]
  /** 业务管理范围 */
  business_management_scopes?: BusinessManagementScope[]
}

export interface PermissionDetail {
  /** 角色 */
  role?: SecurityGroup
  /** 指定管理对象列表，如果该值为null，则使用设置数据权限 */
  assigned_organization_list?: AssignedOrganization[][]
  /** 设置数据权限，如果该值为null，则使用指定管理对象列表 */
  grantor_rule_list?: PermissionSecurityGroup[]
  /** 更新时间 */
  update_time?: string
}

export interface PermissionGroupInfo {
  /** 权限点ID列表 */
  permission_ids?: string[]
  /** 管理范围 */
  scope_rule?: PermissionScopeRule
}

export interface PermissionNameInfo {
  /** id */
  id?: string
  /** 名称 */
  name?: string
}

export interface PermissionPublic {
  /** 允许内容被分享到组织外 */
  external_access_entity?: 'open' | 'closed' | 'allow_share_partner_tenant'
  /** 谁可以创建副本、打印、下载 */
  security_entity?: 'anyone_can_view' | 'anyone_can_edit' | 'only_full_access'
  /** 谁可以评论 */
  comment_entity?: 'anyone_can_view' | 'anyone_can_edit'
  /** 谁可以添加和管理协作者-组织维度 */
  share_entity?: 'anyone' | 'same_tenant'
  /** 谁可以添加和管理协作者-协作者维度 */
  manage_collaborator_entity?: 'collaborator_can_view' | 'collaborator_can_edit' | 'collaborator_full_access'
  /** 链接分享设置 */
  link_share_entity?: 'tenant_readable' | 'tenant_editable' | 'partner_tenant_readable' | 'partner_tenant_editable' | 'anyone_readable' | 'anyone_editable' | 'closed'
  /** 谁可以复制内容 */
  copy_entity?: 'anyone_can_view' | 'anyone_can_edit' | 'only_full_access'
  /** 节点是否已加锁，加锁之后不再继承父级页面的权限 */
  lock_switch?: boolean
}

export interface PermissionScopeRule {
  /** 管理范围 */
  rule_type?: 0 | 1 | 2
}

export interface PermissionSecurityGroup {
  /** 管理维度 */
  rule_dimension?: RuleDimension
  /** 管理类型 */
  rule_type?: number
  /** 规则 */
  expression?: FilterExpression
}

export interface Person {
  /** 人员Id */
  id?: string
  /** 中文姓名 */
  name?: string
  /** 英文姓名 */
  en_name?: string
  /** 邮箱 */
  email?: string
  /** 头像链接 */
  avatar_url?: string
}

export interface PersonalProfile {
  /** 资料类型 */
  personal_profile_type?: Enum
  /** 上传文件列表 */
  files?: File[]
}

export interface PersonalProfileForUpdate {
  /** 资料类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可：- object_api_name = "personal_profile" - custom_api_name = "profile_type" */
  personal_profile_type?: string
  /** 资料文件列表 */
  files?: File[]
}

export interface PersonInfo {
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
  name_list?: PersonName[]
  /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
  gender?: Enum
  /** 出生日期 */
  date_of_birth?: string
  /** 国籍 ID，可通过【查询国籍信息】接口查询 */
  nationality_id_v2?: string
  /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
  race?: Enum
  /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
  marital_status?: Enum
  /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
  phone_list?: Phone[]
  /** 地址列表 */
  address_list?: Address[]
  /** 邮箱列表 */
  email_list?: Email[]
  /** 工作经历列表 */
  work_experience_list?: WorkExperienceInfo[]
  /** 教育经历列表 */
  education_list?: Education[]
  /** 银行账户 */
  bank_account_list?: BankAccount[]
  /** 证件 */
  national_id_list?: NationalId[]
  /** 家庭成员列表 */
  dependent_list?: Dependent[]
  /** 紧急联系人列表 */
  emergency_contact_list?: EmergencyContact[]
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
  highest_level_of_education?: Education
  /** 最高学位教育经历 */
  highest_degree_of_education?: Education
  /** 个人资料附件 */
  personal_profile?: PersonalProfile[]
  /** 籍贯 ID */
  native_region?: string
  /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
  hukou_type?: Enum
  /** 户口所在地 */
  hukou_location?: string
  /** 人才 ID */
  talent_id?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
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
  resident_taxes?: ResidentTax[]
  /** 首次入境日期 */
  first_entry_time?: string
  /** 预计离境日期 */
  leave_time?: string
  /** 护照号码 */
  passport_number?: string
}

export interface PersonName {
  /** 姓 - 本地文字 */
  local_primary?: string
  /** 名 - 本地文字 */
  local_first_name?: string
  /** 国家 / 地区- 详细信息可通过[查询国家/地区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口查询获得 */
  country_region_id: string
  /** 姓名类型- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：person_name  - custom_api_name：name_type */
  name_type: Enum
  /** 名 - 第二本地文字 */
  local_first_name_2?: string
  /** 姓 - 第二本地文字 */
  local_primary_2?: string
  /** 补充姓名类型- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：person_name  - custom_api_name：additional_name_type */
  additional_name_type?: Enum
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
  /** 婚后姓氏 */
  tertiary?: string
  /** 尊称- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：person_name  - custom_api_name：social */
  social?: Enum
  /** 头衔- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：person_name  - custom_api_name：title */
  title?: Enum
  /** 本地中间名 */
  local_middle_name?: string
  /** 第二姓氏 - 本地文字 */
  local_secondary?: string
}

export interface Phone {
  /** 国家区号 */
  international_area_code?: Enum
  /** 电话号码 */
  phone_number: string
}

export interface PhoneForUpdate {
  /** 国家区号,枚举值 */
  international_area_code: string
  /** 电话号码 */
  phone_number: string
  /** 设备类型，枚举值 */
  device_type: string
  /** 电话用途,枚举值 */
  phone_usage: string
  /** 主要电话,若有多个电话，只能有一个电话的「is_primary」为true */
  is_primary: boolean
  /** 公开电话 */
  is_public: boolean
}

export interface PhoneNumberAndAreaCode {
  /** 区号 */
  area_code: Enum
  /** 号码 */
  phone_number: string
}

export interface Phrase {
  /** 文本中切分出的百科词条名称 */
  name: string
  /** 实体词 id 列表 */
  entity_ids: string[]
  /** 实体词所在位置 */
  span: Span
}

export interface Pin {
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

export interface Place {
  /** ID */
  place_id: string
  /** i18n文本 */
  place_name?: I18nText
  /** 是否启用 */
  is_enabled?: boolean
  /** i18n文本 */
  description?: I18nText
}

export interface PlanCondition {
  /** 适用范围左值 */
  left_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
  /** 适用范围操作 */
  operator?: 1 | 2
  /** 适用范围右值 */
  right_value?: string[]
}

export interface PlanDetail {
  /** 薪资方案ID */
  id: string
  /** 薪资方案TID */
  tid: string
  /** 薪资方案名称 */
  name: string
  /** 薪资方案描述 */
  description: string
  /** 薪资方案生效时间 */
  effective_date: string
  /** 薪资方案适用范围 */
  plan_scope?: PlanScope
  /** 币种ID */
  currency_id?: string
  /** 开启试用期薪酬状态 */
  probation_salary_status: boolean
  /** 方案关联的薪资项 */
  plan_items: PlanItem[]
  /** 方案关联的薪资统计指标 */
  plan_indicators: PlanIndicator[]
  /** 多语言名称 */
  i18n_names: I18nContent[]
  /** 多语言描述 */
  i18n_descriptions: I18nContent[]
}

export interface PlanIndicator {
  /** 薪资统计指标ID，详细信息可以通过[批量查询薪资统计指标](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/indicator/list)接口查询获得 */
  indicator_id: string
  /** 方案关联薪资统计指标逻辑配置 */
  plan_indicator_logic?: AdjustmentLogic
}

export interface PlanItem {
  /** 定薪方式 */
  adjustment_type?: 'manual' | 'formula' | 'fixed'
  /** 薪酬项ID，详细信息可以通过[批量查询薪资项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item/list)接口查询获得 */
  item_id?: string
  /** 方案关联薪资项逻辑配置 */
  plan_item_logic?: AdjustmentLogic
  /** 试用期薪酬类型 */
  probation_discount_type?: 'percentum' | 'manual_input' | 'none' | 'fixed' | 'formula' | 'not_set'
  /** 试用期薪酬百分比 */
  probation_discount_percentum?: string
}

export interface PlanScope {
  /** 是否全部范围 */
  is_all?: boolean
  /** 方案适用范围条件组 */
  plan_conditions?: PlanCondition[]
}

export interface PlusMenu {
  /** pc 端链接 */
  pc_app_link?: string
  /** 移动端链接 */
  mobile_app_link?: string
}

export interface PortalJobPost {
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
  job_active_status?: 1 | 2
  /** 职位流程类型 */
  job_process_type?: 1 | 2
  /** 职位雇佣类型 */
  job_recruitment_type?: IdNameObject
  /** 职位部门 */
  job_department?: IdNameObject
  /** 职位类型 */
  job_type?: IdNameObject
  /** 最低职级 */
  min_job_level?: IdNameObject
  /** 最高职级 */
  max_job_level?: IdNameObject
  /** 职位地址 */
  address?: CommonAddress
  /** 月薪范围-最低薪资 */
  min_salary?: string
  /** 月薪范围-最高薪资 */
  max_salary?: string
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 经验 */
  experience?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** 数量 */
  headcount?: number
  /** 职位亮点 */
  high_light_list?: IdNameObject[]
  /** 职位描述 */
  description?: string
  /** 职位要求 */
  requirement?: string
  /** 创建人 */
  creator?: IdNameObject
  /** 创建时间 */
  create_time?: string
  /** 修改时间 */
  modify_time?: string
  /** 自定义字段 */
  customized_data_list?: WebsiteJobPostCustomizedData[]
  /** 职能分类 */
  job_function?: IdNameObject
  /** 职位广告地址列表 */
  address_list?: CommonAddress[]
}

export interface Post {
  /** 发帖用户ID */
  user_id?: string
  /** 帖子内容 */
  content: string
  /** 图片的key 列表 */
  image_key_list?: string[]
  /** 媒体文件的 token */
  media_file_token?: string
  /** 评论数 */
  comment_count?: number
  /** 帖子的reaction及其数量 */
  reaction_set?: ReactionSet
  /** 帖子ID */
  id?: string
  /** 帖子创建时间 */
  create_time?: string
  /** 视频封面图片 */
  media_cover_image_key?: string
  /** 帖子所属板块 */
  category_ids?: string[]
  /** 帖子链接 */
  link?: string
  /** 发帖人类型 */
  user_type?: 1 | 2 | 3 | 4
  /** 点踩数量 */
  dislike_count?: number
}

export interface PreHire {
  /** 个人信息 */
  person_info?: PersonInfo
  /** 工作信息 */
  employment_info?: PreHireEmploymentInfo
  /** 入职信息 */
  onboarding_info?: PreHireOnboardingInfo
  /** 试用期信息 */
  probation_info?: PreHireProbationInfo
  /** 合同信息 */
  contract_info?: PreHireContractInfo
  /** 待入职 id */
  pre_hire_id?: string
}

export interface PreHireAbnormalReason {
  /** 异常信息描述 */
  descriptions?: I18n[]
}

export interface PreHireContractInfo {
  /** 合同开始日期 */
  contract_start_date?: string
  /** 合同结束日期 */
  contract_end_date?: string
  /** -| 合同类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - object_api_name = "pre_hire" - custom_api_name = "contract_type" */
  contract_type?: string
  /** -| 期限类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - object_api_name = "pre_hire" - custom_api_name = "duration_type" */
  duration_type?: string
  /** -| 签订类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - object_api_name = "pre_hire" - custom_api_name = "duration_type" */
  signing_type?: string
}

export interface PreHireEmploymentInfo {
  /** 部门 ID ，可以通过【搜索部门信息】接口获取 */
  department_id?: string
  /** 成本中心分摊信息 */
  cost_center_rates?: JobDataCostCenter[]
  /** 办公地点id ，详细信息可通过【批量查询地点】接口获得 */
  office_location_id?: string
  /** 工作地点id ，详细信息可通过【批量查询地点】接口获得 */
  work_location_id?: string
  /** 工位 */
  work_station?: string
  /** 工号 */
  worker_id?: string
  /** -| 薪资类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：compensation_type - object_api_name：pre_hire */
  compensation_type?: Enum
  /** 直属上级雇佣 ID ， 可以通过【搜索员工信息】接口获取 */
  direct_leader_id?: string
  /** 虚线上级雇佣 ID ， 可以通过【搜索员工信息】接口获取 */
  dotted_line_manager_id?: string
  /** 职务 ID ,可以通过【批量查询职务】接口获取 */
  job_id?: string
  /** 序列 ID，可以通过【批量查询职务序列】接口获取 */
  job_family_id?: string
  /** 职级 ID，可以通过【批量查询职务级别】接口获取 */
  job_level_id?: string
  /** 职等 ID */
  job_grade_id?: string
  /** 职务头衔 */
  job_title?: string
  /** 人员类型 ID ，可以通过招聘【批量查询人员类型】接口获取 */
  employee_type_id?: string
  /** 人员子类型 ID */
  employee_subtype_id?: string
  /** -| 雇佣类型， 枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - object_api_name = "pre_hire" - custom_api_name = "employment_type" */
  employment_type?: string
  /** 工作邮箱 */
  work_email?: string
  /** 公司 ID , 详细信息可通过【批量查询公司】接口获得 */
  company_id?: string
  /** 社保城市 ID ，详细信息可通过【批量查询地点】接口获得 */
  social_security_city_id?: string
  /** 是否包含竞业条款 */
  non_compete_covenant?: boolean
  /** 周工作时长（单位：小时） */
  weekly_working_hours?: number
  /** 是否离职重聘 */
  rehire?: 'to_be_confirmed' | 'no' | 'yes'
  /** -| 历史雇佣信息 ID ，雇佣信息详细信息可以通过「查询单个雇佣信息」API 获得，系统会检验当前雇佣信息的合法性，要求： - 雇佣信息为该人员最后一次雇佣记录 - 雇佣信息的雇员状态 = "terminated" - 该人员不存在其他待入职记录 */
  rehire_employment_id?: string
  /** -| 工时制度 ID ，可通过【查询单个工时制度】接口获取 */
  working_hours_type?: string
  /** 周工作时长v2（单位：小时） */
  weekly_working_hours_v2?: number
  /** 办公地址 */
  office_address?: Address
  /** 工作日历 */
  working_calendar_id?: string
  /** 待入职信息 更新时间 */
  updated_at?: string
  /** 是否疑似重聘 */
  suspected_rehiring?: boolean
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
  /** 岗位 ID */
  position_id?: string
  /** 公司主体是否被手动修改 */
  company_manual_updated?: boolean
  /** 薪资组信息 */
  pay_group?: PreHirePayGroupInfo
  /** 是否信息异常 */
  whether_the_information_is_abnormal?: boolean
  /** 异常原因列表 */
  abnormal_reason?: PreHireAbnormalReason[]
  /** 是否有 Offer 薪酬 */
  has_offer_salary?: boolean
  /** 招聘项目 ID */
  recruitment_project_id?: string
  /** -| 排班类型，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：work_shift - object_api_name：pre_hire */
  work_shift?: Enum
  /** 待入职信息 创建时间 */
  created_at?: string
  /** 待入职信息 创建人 */
  created_by?: string
  /** 待入职信息 更新人 */
  updated_by?: string
  /** 司龄起算日期 */
  seniority_date?: string
  /** 背调订单ID */
  background_check_order_id?: string
  /** 背调名称 */
  background_check_order_name?: string
  /** 背调套餐 */
  background_check_order_package_name?: string
  /** 背调结果 */
  background_check_order_result?: string
  /** 背调供应商 */
  background_check_order_supplier_name?: string
  /** 背调账号名称 */
  background_check_order_account_name?: string
  /** 背调开始时间 */
  background_check_order_start_time?: string
  /** 背调完成时间 */
  background_check_order_complete_time?: string
  /** -| 背调状态，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：background_check_order_status - object_api_name：pre_hire */
  background_check_order_status?: Enum
  /** 司龄调整信息 */
  seniority_adjust_information_list?: PrehireSeniorityAdjustInformationQuery[]
}

export interface PreHireOnboardingInfo {
  /** Offer id , 可以通过招聘【获取 Offer 列表】接口获取 */
  offer_id?: string
  /** Offer hr 的 雇佣 ID */
  offer_hr_id?: string
  /** -| 入职方式，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - object_api_name = "pre_hire" - custom_api_name = "onboarding_method" */
  entry_mode?: string
  /** 入职日期 */
  onboarding_date?: string
  /** 招聘投递 ID ，详细信息可以通过招聘【获取投递信息】接口查询获得 */
  ats_application_id?: string
  /** -| 招聘来源 ，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - object_api_name = "pre_hire" - custom_api_name = "recruitment_type" */
  recruitment_type?: string
  /** -| 入职地点id , 详细信息可通过【批量查询地点】接口获得 */
  onboarding_location_id?: string
  /** -| 需要公司办理签证 */
  company_sponsored_visa?: boolean
  /** -| 入职状态 */
  onboarding_status?: 'preboarding' | 'deleted' | 'day_one' | 'withdrawn' | 'completed'
  /** 入职任务列表 */
  onboarding_task_list?: OnboardingTask[]
  /** 入职地址 */
  onboarding_address?: Address
  /** 入职流程 */
  flow_name?: I18n[]
  /** 入职流程 ID */
  flow_id?: string
  /** 签到时间 */
  check_in_time?: string
  /** -| 招聘来源 ，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - object_api_name = "pre_hire" - custom_api_name = "check_in_method" */
  check_in_method?: Enum
}

export interface PreHirePayGroupInfo {
  /** 薪资组名称 */
  name?: I18n[]
  /** 薪资组 ID */
  id?: string
}

export interface PreHireProbationInfo {
  /** 试用期开始日期 */
  probation_start_date?: string
  /** 试用期结束日期 */
  probation_end_date?: string
  /** 试用期时长（单位：天） */
  probation_period?: number
}

export interface PreHireQuery {
  /** 招聘系统的候选人 ID */
  ats_application_id?: string
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 入职日期 */
  hire_date?: string
  /** 雇佣类型 */
  employee_type: Enum
  /** 人员编号 */
  worker_id?: string
  /** 雇佣类型 */
  employee_type_id: string
  /** 引用Person ID */
  person_id: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 入职状态 */
  onboarding_status: Enum
  /** 成本中心分摊信息 */
  cost_center_rate?: SupportCostCenterItem[]
  /** 工作邮箱 */
  work_email_list?: Email[]
  /** 部门ID */
  department_id?: string
}

export interface PrehireSeniorityAdjustInformation {
  /** 调整值- 精确度：两位小数- 单位：年- 自动计算逻辑：如果这个值为空，司龄调整的开始日期和结束日期均不为空，会自动计算出调整值 */
  seniority_adjustment?: number
  /** 调整类型- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：seniority_adjust_information  - custom_api_name：seniority_adjustment_type */
  seniority_adjustment_type: 'decrease' | 'increase'
  /** 司龄调整原因 */
  reasons_for_seniority_adjustment?: string
  /** 开始日期- 格式： yyyy-mm-dd */
  start_date?: string
  /** 结束日期- 格式： yyyy-mm-dd */
  end_date?: string
}

export interface PrehireSeniorityAdjustInformationQuery {
  /** 调整值- 精确度：两位小数- 单位：年 */
  seniority_adjustment?: number
  /** 调整类型- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：seniority_adjust_information  - custom_api_name：seniority_adjustment_type */
  seniority_adjustment_type?: Enum
  /** 司龄调整原因 */
  reasons_for_seniority_adjustment?: string
  /** 开始日期 */
  start_date?: string
  /** 结束日期 */
  end_date?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface PrehireSeniorityAdjustInformationUpdate {
  /** 调整值- 精确度：两位小数- 单位：年- 自动计算逻辑：如果这个值为空，司龄调整的开始日期和结束日期均不为空，会自动计算出调整值 */
  seniority_adjustment?: number
  /** 调整类型- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：seniority_adjust_information  - custom_api_name：seniority_adjustment_type */
  seniority_adjustment_type: 'decrease' | 'increase'
  /** 司龄调整原因 */
  reasons_for_seniority_adjustment?: string
  /** 开始日期- 格式： yyyy-mm-dd */
  start_date?: string
  /** 结束日期- 格式： yyyy-mm-dd */
  end_date?: string
}

export interface PreviewNode {
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

export interface ProbationInfo {
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
  submission_type?: Enum
  /** 转正发起人的雇佣 ID，当系统发起转正时该字段为空 */
  initiator_id?: string
  /** 试用期状态 */
  probation_status?: Enum
  /** 员工自评 */
  self_review?: string
  /** 备注 */
  notes?: string
  /** 流程实例 ID */
  process_id?: string
  /** 是否通过 BPM 转正 */
  converted_via_bpm?: boolean
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
  /** 试用期考核最终状态 */
  final_assessment_status?: Enum
  /** 试用期考核最终结果 */
  final_assessment_result?: Enum
  /** 试用期考核最终得分 */
  final_assessment_score?: number
  /** 试用期考核最终等级 */
  final_assessment_grade?: Enum
  /** 试用期考核最终评语 */
  final_assessment_comment?: string
  /** 最终考核结果页面超链接 */
  final_assessment_detail?: string
  /** 试用期考核结果列表 */
  assessments?: Assessment[]
  /** 试用期延长后的预计结束日期 */
  probation_extend_expected_end_date?: string
  /** 试用期延长时间 */
  extended_probation_period_duration?: number
  /** 试用期延长时间单位 */
  extended_probation_period_unit?: Enum
  /** 试用期结果 */
  probation_outcome?: Enum
}

export interface ProbationInfoForSubmit {
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
  submission_type?: Enum
  /** 转正发起人的雇佣 ID，当系统发起转正时该字段为空 */
  initiator_id?: string
  /** 试用期状态 */
  probation_status?: Enum
  /** 员工自评 */
  self_review?: string
  /** 备注 */
  notes?: string
  /** 流程实例 ID */
  process_id?: string
  /** 是否通过 BPM 转正 */
  converted_via_bpm?: boolean
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
  /** 试用期考核最终状态 */
  final_assessment_status?: Enum
  /** 试用期考核最终结果 */
  final_assessment_result?: Enum
  /** 试用期考核最终得分 */
  final_assessment_score?: number
  /** 试用期考核最终等级 */
  final_assessment_grade?: Enum
  /** 试用期考核最终评语 */
  final_assessment_comment?: string
  /** 最终考核结果页面超链接 */
  final_assessment_detail?: string
}

export interface ProcessAbstractItem {
  /** 摘要标题 */
  name?: DataengineI18n
  /** 摘要值 */
  value?: DataengineI18n
}

export interface ProcessCcItem {
  /** 单据ID */
  approver_id?: string
  /** 单据地址 */
  links?: ProcessLink
  /** 抄送人ID */
  operator_id?: string
  /** 抄送人姓名 */
  operator_name?: DataengineI18n
  /** 节点名称 */
  node_name?: DataengineI18n
  /** 抄送时间，Unix毫秒时间戳 */
  create_time?: string
  /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
  node_definition_id?: string
}

export interface ProcessCommentInfo {
  /** 评论人id */
  commentor_id?: string
  /** 评论人姓名 */
  commentor_name?: DataengineI18n
  /** 评论时间,Unix毫秒时间戳 */
  comment_time?: string
  /** 评论内容 */
  comment_msg?: string
}

export interface ProcessDoneItem {
  /** 单据ID */
  approver_id?: string
  /** 单据类型 */
  type?: 1 | 5
  /** 单据状态 */
  status?: 3 | 2 | 4
  /** 单据地址 */
  links?: ProcessLink
  /** 操作人ID */
  operator_id?: string
  /** 操作人姓名 */
  operator_name?: DataengineI18n
  /** 节点名称 */
  node_name?: DataengineI18n
  /** 创建时间，Unix毫秒时间戳 */
  create_time?: string
  /** 完成时间，Unix毫秒时间戳 */
  complete_time?: string
  /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
  node_definition_id?: string
  /** 审批意见 */
  approval_opinion?: string
}

export interface ProcessFormVariableV2 {
  /** 变量唯一标识 */
  variable_api_name?: string
  /** 变量值 */
  variable_value?: FieldVariableValueToForReview
  /** 在list_values和record_values中引用的变量 */
  sub_values?: FieldVariableSubVlaueForReview[]
}

export interface ProcessLink {
  /** web端单据详情页地址 */
  web_link?: string
  /** 飞书pc端单据详情页地址 */
  pc_link?: string
  /** 飞书移动端单据详情页地址 */
  mobile_link?: string
}

export interface ProcessSystemDoneItem {
  /** 单据ID */
  approver_id?: string
  /** 单据类型 */
  type?: 1 | 5
  /** 单据状态 */
  status?: 3 | 2 | 4
  /** 单据地址 */
  links?: ProcessLink
  /** 操作人姓名 */
  operator_name?: DataengineI18n
  /** 节点名称 */
  node_name?: DataengineI18n
  /** 创建时间，Unix毫秒时间戳 */
  create_time?: string
  /** 完成时间，Unix毫秒时间戳 */
  complete_time?: string
  /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
  node_definition_id?: string
  /** 审批意见 */
  approval_opinion?: string
}

export interface ProcessSystemTodoItem {
  /** 单据ID */
  approver_id?: string
  /** 单据类型 */
  type?: 1 | 5
  /** 单据地址 */
  links?: ProcessLink
  /** 操作人姓名 */
  operator_name?: DataengineI18n
  /** 节点名称 */
  node_name?: DataengineI18n
  /** 创建时间，Unix毫秒时间戳 */
  create_time?: string
  /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
  node_definition_id?: string
}

export interface ProcessTodoItem {
  /** 单据ID */
  approver_id?: string
  /** 单据类型 */
  type?: 1 | 5
  /** 单据地址 */
  links?: ProcessLink
  /** 操作人ID */
  operator_id?: string
  /** 操作人姓名 */
  operator_name?: DataengineI18n
  /** 节点名称 */
  node_name?: DataengineI18n
  /** 创建时间，Unix毫秒时间戳 */
  create_time?: string
  /** 节点定义ID（注：在回退场景，同一个节点会对应多个节点实例） */
  node_definition_id?: string
}

export interface ProductI18nName {
  /** 商业化产品的中文名 */
  zh_cn?: string
  /** 商业化产品的日文名 */
  ja_jp?: string
  /** 商业化产品的英文名 */
  en_us?: string
}

export interface ProfileSettingAddress {
  /** 地址类型，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "address" custom_api_name = "address_type" */
  address_type?: string
  /** 国家 / 地区ID */
  country_region?: string
  /** 主要行政区ID */
  region?: string
  /** 主要行政区往下细分 1 层的行政区 */
  region_subdivision_1?: string
  /** 主要行政区往下细分 2 层的行政区 */
  region_subdivision_2?: string
  /** 城市V2 ID */
  city_v2?: string
  /** 城市（文本） */
  city_text?: string
  /** 城市（仅文本，非拉丁语系的本地文字） */
  local_city_text?: string
  /** 城市往下细分 1 层的行政区 */
  city_subdivision_1?: string
  /** 城市往下细分 2 层的行政区 */
  city_subdivision_2?: string
  /** 区/县V2 ID */
  district_v2?: string
  /** 邮政编码 */
  postal_code?: string
  /** 地址行 1 */
  address_line_1?: string
  /** 地址行 1（非拉丁语系的本地文字） */
  local_address_line_1?: string
  /** 地址行 2 */
  address_line_2?: string
  /** 地址行 2（非拉丁语系的本地文字） */
  local_address_line_2?: string
  /** 地址行 3 */
  address_line_3?: string
  /** 地址行 3（非拉丁语系的本地文字） */
  local_address_line_3?: string
  /** 地址行 4 */
  address_line_4?: string
  /** 地址行 5（非拉丁语系的本地文字） */
  local_address_line_5?: string
  /** 地址行 6 */
  address_line_6?: string
  /** 地址行 6（非拉丁语系的本地文字） */
  local_address_line_6?: string
  /** 地址行 7 */
  address_line_7?: string
  /** 地址行 7（非拉丁语系的本地文字） */
  local_address_line_7?: string
  /** 地址行 8 */
  address_line_8?: string
  /** 地址行 8（非拉丁语系的本地文字） */
  local_address_line_8?: string
  /** 地址行 9 */
  address_line_9?: string
  /** 地址行 9（非拉丁语系的本地文字） */
  local_address_line_9?: string
  /** 地址行 4（非拉丁语系的本地文字） */
  local_address_line_4?: string
  /** 地址行 5 */
  address_line_5?: string
}

export interface ProfileSettingBankAccount {
  /** 国家 / 地区ID */
  country_region?: string
  /** 银行名称 */
  bank_name?: string
  /** 支行名称 */
  branch_name?: string
  /** 开户人姓名 */
  account_holder?: string
  /** 银行账号 */
  bank_account_number?: string
  /** 银行卡用途，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "bank_account" custom_api_name = "bank_account_usage" */
  bank_account_usages?: string[]
  /** 银行卡类型，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "bank_account" custom_api_name = "bank_account_type" */
  bank_account_type?: string
  /** 银行ID */
  bank_id?: string
  /** 银行支行ID */
  branch_id?: string
  /** 分配方式，枚举值 */
  payment_type?: 'percent' | 'amount' | 'balance'
  /** 分配比例，0～100，保留两位小数 */
  payment_rate?: string
  /** 分配金额，保留两位小数 */
  payment_amount?: string
  /** 优先级，不能低于0 */
  priority?: string
}

export interface ProfileSettingCareer {
  /** 教育经历 */
  educations?: ProfileSettingEducation[]
  /** 工作经历 */
  work_experiences?: ProfileSettingWorkExperience[]
  /** 自定义分组 */
  custom_groups?: ProfileSettingCustomGroup[]
}

export interface ProfileSettingCitizenshipStatus {
  /** 国家/地区ID */
  country_region?: string
  /** 公民身份类型 */
  citizenship_status?: string
}

export interface ProfileSettingCostCenter {
  /** 100 */
  id?: string
  /** 分摊比例 */
  rate?: number
}

export interface ProfileSettingCustomField {
  /** 字段名 */
  field_name: string
  /** 字段值, 是 json 转义后的字符串，根据元数据定义不同，字段格式不同。使用方式可参考【操作手册】如何通过 OpenAPI 维护自定义字段 */
  value?: string
}

export interface ProfileSettingCustomGroup {
  /** 分组名 */
  group_name?: string
  /** 分组数据 */
  items?: ProfileSettingCustomGroupItem[]
}

export interface ProfileSettingCustomGroupItem {
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface ProfileSettingDataAttachment {
  /** 资料附件记录 */
  personal_records?: ProfileSettingPersonalRecord[]
  /** 自定义分组 */
  custom_groups?: ProfileSettingCustomGroup[]
}

export interface ProfileSettingDependent {
  /** 姓名 */
  legal_name?: string
  /** 生日 */
  date_of_birth?: string
  /** 关系，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "dependent" custom_api_name ="relationship_with_dependent" */
  relationship_with_dependent?: string
  /** 性别，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "dependent" custom_api_name = "gender" */
  gender?: string
  /** 电话 */
  phone?: ProfileSettingPhone
  /** 岗位 */
  job?: string
  /** 出生证明 */
  child_birth_certificates?: ProfileSettingFile[]
  /** 工作单位 */
  employer?: string
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
  /** 联系地址 */
  address?: ProfileSettingAddress
}

export interface ProfileSettingEducation {
  /** 学校 */
  school?: string
  /** "学校, 枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = ""education"" custom_api_name = ""school_name""" */
  school_enum?: string
  /** 开始日期 */
  start_date?: string
  /** 结束日期 */
  end_date?: string
  /** 学历, 枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "education" custom_api_name = "level_of_education" */
  level_of_education?: string
  /** 专业 */
  field_of_study?: string
  /** 学位,枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "education" custom_api_name = "degree" */
  degree?: string
  /** "专业，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = ""education"" custom_api_name = ""field_of_study_name""" */
  field_of_study_enum?: string
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface ProfileSettingEmergencyContact {
  /** 姓名 */
  legal_name?: string
  /** 关系，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "emergency_contract" custom_api_name = "relationship" */
  relationship?: string
  /** 主要联系人 */
  is_primary?: boolean
  /** 电话 */
  phone?: ProfileSettingPhone
  /** 邮箱 */
  email?: string
  /** 地址 */
  address?: ProfileSettingAddress
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface ProfileSettingEmpContractRecord {
  /** 合同协议编号 */
  contract_number?: string
  /** 合同类型，枚举值可选项 可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "contract" custom_api_name = "contract_type" */
  contract_type?: string
  /** 甲方公司 ID, 引用Company的ID，详细信息可通过【查询单个公司】接口查询获得 */
  first_party?: string
  /** 合同开始日期 */
  effective_time?: string
  /** 期限类型，枚举值可选项 可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "contract" custom_api_name = "duration_type" */
  duration_type?: string
  /** 合同结束日期 */
  contract_end_date?: string
}

export interface ProfileSettingEmploymentBasicInfo {
  /** 员工编号 */
  employee_number?: string
  /** 入职日期 */
  effective_time?: string
  /** 转正式员工日期 */
  regular_employee_start_date?: string
  /** 资历起算日期 */
  seniority_date?: string
  /** 工作邮箱 */
  work_email?: string
  /** 工作电话 */
  phone?: ProfileSettingPhone
  /** 数据驻留地，开通了飞书数据驻留服务的企业，该字段为必填 */
  user_geo?: string
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface ProfileSettingEmploymentInfo {
  /** 基本信息 */
  basic_info?: ProfileSettingEmploymentBasicInfo
  /** 试用期信息 */
  probation_info?: ProfileSettingProbationInfo
  /** 任职记录 */
  employment_record?: ProfileSettingEmploymentRecord
  /** 合同记录 */
  emp_contract_record?: ProfileSettingEmpContractRecord
  /** 自定义分组 */
  custom_groups?: ProfileSettingCustomGroup[]
  /** 自定义组织记录 */
  custom_org_groups?: JobDataCustomOrg[]
  /** 司龄调整信息 */
  seniority_adjust_informations?: SeniorityAdjustInformationEdit[]
}

export interface ProfileSettingEmploymentRecord {
  /** 人员类型 ID */
  employee_type?: string
  /** 部门 ID */
  department?: string
  /** 实线主管雇佣ID */
  direct_manager?: string
  /** 工时制度 ID */
  working_hours_type?: string
  /** 成本中心分摊信息 */
  cost_centers?: ProfileSettingCostCenter[]
  /** 实线主管入职日期 */
  direct_manager_effective_time?: string
  /** 虚线主管雇佣ID */
  dotted_line_manager?: string
  /** 虚线主管入职日期 */
  dotted_line_manager_effective_time?: string
  /** 职务 ID */
  job?: string
  /** 职务序列 ID */
  job_family?: string
  /** 职务级别 ID */
  job_level?: string
  /** 职等 ID */
  job_grade?: string
  /** 工作地点 ID */
  work_location?: string
  /** 周工作时长 */
  weekly_working_hours?: number
  /** 岗位ID */
  position?: string
}

export interface ProfileSettingFile {
  /** 文件ID */
  file_id?: string
  /** 文件MIME类型 */
  mime_type?: string
  /** 文件名 */
  name?: string
  /** 文件大小(KB) */
  size?: string
  /** 文件token */
  token?: string
}

export interface ProfileSettingHukou {
  /** 户口类型，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "person_info_chn" custom_api_name = "hukou_type" */
  hukou_type?: string
  /** 户口所在地 */
  hukou_location?: string
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface ProfileSettingI18n {
  /** 中文 */
  zh_cn?: string
  /** 英文 */
  en_us?: string
}

export interface ProfileSettingName {
  /** 补充姓名类型, 枚举值。可选项可以通过【获取字段详情】接口查询，查询参数如下： - object_api_name = "person_name" - custom_api_name = "additional_name_type" */
  additional_name_type?: string
  /** 国家 / 地区 ID */
  country_region?: string
  /** 全名 */
  full_name?: string
  /** 姓氏称谓 */
  hereditary?: string
  /** 中间名 */
  middle_name?: string
  /** 第二姓氏 */
  secondary?: string
  /** 尊称,枚举值。可选项可以通过【获取字段详情】接口查询，查询参数如下： - object_api_name = "person_name" - custom_api_name = "social" */
  social?: string
  /** 婚后姓氏 */
  tertiary?: string
  /** 名 - 第二本地文字 */
  local_first_name_2?: string
  /** 本地中间名 */
  local_middle_name?: string
  /** 姓 - 本地文字 */
  local_primary?: string
  /** 姓 - 第二本地文字 */
  local_primary_2?: string
  /** 第二姓氏 - 本地文字 */
  local_secondary?: string
  /** 头衔, 枚举值。可选项可以通过【获取字段详情】接口查询，查询参数如下： - object_api_name = "person_name" - custom_api_name = "title" */
  title?: string
  /** 名 - 本地文字 */
  local_first_name?: string
  /** 自定义姓名（本地文字） */
  custom_local_name?: string
  /** 自定义姓名（西方文字） */
  custom_western_name?: string
  /** 名 */
  first_name?: string
  /** 姓 */
  name_primary?: string
}

export interface ProfileSettingNational {
  /** 国家/地区ID */
  country_region?: string
  /** 国家证件类型ID */
  national_id_type?: string
  /** 证件号码 */
  national_id_number?: string
  /** 证件签发日期 */
  issued_date?: string
  /** 证件签发机构 */
  issued_by?: string
  /** 证件到期日期 */
  expiration_date?: string
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface ProfileSettingPersonalBasicInfo {
  /** 法定姓名 */
  legal_name?: ProfileSettingName
  /** 常用姓名 */
  preferred_name?: ProfileSettingName
  /** 性别，枚举值 。可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "person" custom_api_name = "gender" */
  gender?: string
  /** 国籍ID */
  nationality_v2?: string
  /** 民族 / 种族，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "person" custom_api_name = "ethnicity_race" */
  ethnicity_race?: string
  /** 个人电话 */
  phone?: ProfileSettingPhone
  /** 个人邮箱 */
  email?: string
  /** 出生日期 */
  date_of_birth?: string
  /** 婚姻状况，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "person" custom_api_name = "marital_status" */
  marital_status?: string
  /** 是否残疾 */
  is_disabled?: boolean
  /** 残疾证号，is_disabled 为 true 时必填 */
  disable_card_number?: string
  /** 是否为烈属 */
  is_martyr_family?: boolean
  /** 烈属证号，is_martyr_family 为 true 时必填 */
  martyr_card_number?: string
  /** 是否为孤老 */
  is_old_alone?: boolean
  /** 出生国家/地区 */
  born_country_region?: string
  /** 政治面貌，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "person_info_chn" custom_api_name = "political_affiliation" */
  political_affiliation?: string
  /** 籍贯(省份/行政区ID） */
  native_region?: string
  /** 参加工作日期 */
  date_entered_workforce?: string
  /** 首次入境日期 */
  first_entry_time?: string
  /** 预计离境日期 */
  leave_time?: string
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
  /** 其他国籍（地区）ID */
  additional_nationalities?: string[]
}

export interface ProfileSettingPersonalInfo {
  /** 基本信息 */
  personal_basic_info?: ProfileSettingPersonalBasicInfo
  /** 紧急联系人 */
  emergency_contacts?: ProfileSettingEmergencyContact[]
  /** 银行账户 */
  bank_accounts?: ProfileSettingBankAccount[]
  /** 证件 */
  nationals?: ProfileSettingNational[]
  /** 居民身份信息 */
  resident_taxes?: ProfileSettingResidentTax[]
  /** 家庭成员 */
  dependents?: ProfileSettingDependent[]
  /** 户口 */
  hukou?: ProfileSettingHukou
  /** 联系地址 */
  contact_addresses?: ProfileSettingAddress[]
  /** 自定义分组 */
  custom_groups?: ProfileSettingCustomGroup[]
  /** 公民身份列表 */
  citizenship_statuses?: ProfileSettingCitizenshipStatus[]
}

export interface ProfileSettingPersonalRecord {
  /** 资料类型，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "personal_profile" custom_api_name = "profile_type" */
  profile_type?: string
  /** 文件列表 */
  files?: ProfileSettingFile[]
}

export interface ProfileSettingPhone {
  /** 国际电话区号，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "phone" custom_api_name = "international_area_code" */
  international_area_code?: string
  /** 电话号码 */
  phone_number?: string
}

export interface ProfileSettingProbationInfo {
  /** 试用期开始日期 */
  probation_start_date?: string
  /** 试用期预计结束日期 */
  probation_expected_end_date?: string
  /** 试用期实际结束日期 */
  actual_probation_end_date?: string
}

export interface ProfileSettingResidentTax {
  /** 年度 */
  year_resident_tax?: string
  /** 国家 / 地区ID */
  tax_country_region?: string
  /** 居民身份，枚举值。 可选项可通过【获取字段详情】接口查询，查询参数如下： object_api_name = "resident_tax" custom_api_name = "resident_status" */
  resident_status?: string
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface ProfileSettingWorkExperience {
  /** 公司 / 组织 */
  company_organization?: ProfileSettingI18n
  /** 部门 */
  department?: ProfileSettingI18n
  /** 开始日期 */
  start_date?: string
  /** 结束日期 */
  end_date?: string
  /** 岗位 */
  job?: ProfileSettingI18n
  /** 工作描述 */
  description?: ProfileSettingI18n
  /** 自定义字段 */
  custom_fields?: ProfileSettingCustomField[]
}

export interface Property {
  /** 自定义属性键对象 */
  key: string
  /** 自定义属性值对象 */
  value: string
}

export interface ProviderIdNameObject {
  /** 供应商ID */
  provider_id?: string
  /** 供应商名称信息 */
  provider_name?: I18n
}

export interface PstnSipInfo {
  /** 给pstn/sip用户设置的临时昵称 */
  nickname?: string
  /** pstn/sip主机号 */
  main_address: string
}

export interface PublicMailbox {
  /** The unique ID of a public mailbox */
  public_mailbox_id?: string
  /** The public mailbox's email address */
  email?: string
  /** The public mailbox's display name */
  name?: string
  /** 数据驻留地 */
  geo?: string
}

export interface PublicMailboxMember {
  /** The unique ID of a member in this public mailbox */
  member_id?: string
  /** The member's user id. Value is valid when type is USER */
  user_id?: string
  /** The type of member. Possible values are:- USER: internal user in the team */
  type?: 'USER'
}

export interface PunchMember {
  /** 圈人方式：0 无 1全部 2自定义 */
  rule_scope_type?: number
  /** 圈人规则列表 */
  scope_group_list?: ScopeGroup
}

export interface PunchSpecialDateShift {
  /** 打卡日期 */
  punch_day: number
  /** 班次 ID */
  shift_id: string
}

export interface PunchTimeRule {
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
  /** 不需要打上班卡 */
  no_need_on?: boolean
  /** 不需要打下班卡（优先级比原有字段高） */
  no_need_off?: boolean
}

export interface PunchTimeSimpleRule {
  /** 上班时间 */
  on_time: string
  /** 下班时间 */
  off_time: string
}

export interface QualityAudio {
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

export interface QualityCpuUsage {
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

export interface QualityNetwork {
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

export interface QualityVideoSharing {
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

export interface Question {
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
  question_type?: 1 | 2 | 3 | 4
  /** 是否必填 */
  is_required?: boolean
  /** 选项题回答列表（单选题及多选题） */
  select_option_result_list?: SelectOptionResult[]
  /** 评分题回答 */
  five_start_scoring_result?: FiveStartScoringResult
  /** 描述题回答 */
  description_result?: string
}

export interface QuestionAssessment {
  /** 所关联面试题的类型 */
  question_type?: 1 | 2
  /** 关联面试题的名称 */
  title?: I18n
  /** 关联面试题的描述 */
  description?: I18n
  /** 面试者作答内容 */
  content?: string
  /** 能力项列表 */
  abilities?: Ability[]
}

export interface Questionnaire {
  /** 问卷 ID */
  questionnaire_id?: string
  /** 投递 ID */
  application_id?: string
  /** 面试 ID */
  interview_id?: string
  /** 问卷版本 */
  version?: number
  /** 题目列表 */
  questions?: Question[]
  /** 是否完成作答 */
  has_answers?: boolean
  /** 更新时间 */
  update_time?: string
}

export type QuoteContainer = unknown

export interface RangeFilter {
  /** 起始值 */
  from?: string
  /** 终止值 */
  to?: string
}

export interface Rating {
  /** 评分字段的符号展示 */
  symbol?: string
}

export interface ReactionList {
  /** 表情类型 */
  type?: string
  /** 回复该表情的人数 */
  count?: number
}

export interface ReactionSet {
  /** 表情列表 */
  reactions?: ReactionList[]
  /** 全部表情计数 */
  total_count?: number
}

export interface ReadUser {
  /** 用户id类型 */
  user_id_type: string
  /** 用户id */
  user_id: string
  /** 阅读时间 */
  timestamp: string
  /** tenant key */
  tenant_key?: string
}

export interface RecognizedEntities {
  /** 识别的实体列表 */
  entities?: RecognizedEntity[]
}

export interface RecognizedEntity {
  /** 识别的字段种类 */
  type?: 'contact_names' | 'company_names' | 'departments' | 'job_titles' | 'emails' | 'websites' | 'addresses' | 'mobile_phones' | 'work_phones' | 'other_phones' | 'faxes'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface RecommendedJobLevel {
  /** 最低职级建议 */
  lower_limit_job_level_name?: I18n
  /** 最低职级建议 */
  higher_limit_job_level_name?: I18n
}

export interface RecordGroupByItem {
  /** 字段唯一标识 */
  field: string
}

export interface RecordingPermissionObject {
  /** 授权对象ID */
  id?: string
  /** 授权对象类型 */
  type: 1 | 2 | 3 | 4
  /** 授予权限 */
  permission: 1
}

export interface RecordResult {
  /** 是否成功 */
  success: boolean
  /** 记录 ID */
  id?: string
  /** 权限错误时的细分 code */
  errors?: RecordResultError[]
}

export interface RecordResultError {
  /** 错误码 */
  code: string
  /** success */
  message: string
  /** 权限错误时的细分 code */
  sub_code?: string
  /** 权限错误时的涉及的字段 APIID 集合 */
  fields?: string[]
}

export interface RecordScore {
  /** 分数，即面试评价得分，精确到小数点后两位 */
  score?: number
  /** 满分，即面试评价的总分 */
  total_score?: number
}

export interface RecRule {
  /** 记录筛选条件 */
  conditions?: RecRuleCondition[]
  /** 多个筛选条件的关系 */
  conjunction?: 'and' | 'or'
  /** 其他记录权限，仅在table_perm为2时有效 */
  other_perm?: 0 | 1
}

export interface RecRuleCondition {
  /** 字段名 */
  field_name: string
  /** 运算符 */
  operator?: 'is' | 'isNot' | 'contains' | 'doesNotContain' | 'isEmpty' | 'isNotEmpty'
  /** 单选或多选字段的选项id */
  values?: string[]
}

export interface ReferenceObject {
  /** cpst_item(项目)、 cpst_indicator(指标) */
  api_name?: 'cpst_item' | 'cpst_indicator'
  /** 值列表 例如部门ID */
  id?: string
}

export interface ReferEntity {
  /** 快捷方式指向的文档token */
  refer_token: string
  /** 快捷方式指向的文档类型 */
  refer_type: 'file' | 'docx' | 'bitable' | 'doc' | 'sheet' | 'mindnote' | 'slides'
}

export interface Referer {
  /** 数据 id */
  id: string
  /** 标题 */
  title?: string
}

export interface Referral {
  /** 内推的 ID */
  id: string
  /** 投递 ID */
  application_id: string
  /** 创建时间（ms） */
  create_time: number
  /** 内推人的 ID */
  referral_user_id: string
  /** 内推人信息 */
  referral_user?: IdNameObject
}

export interface ReferralBasicInfo {
  /** 内推 ID */
  id?: string
  /** 投递 ID */
  application_id?: string
  /** 内推类型 */
  referral_type?: 1 | 2
  /** 内推人信息 */
  user_info?: BasicUserInfo
  /** 内推创建时间戳（单位：毫秒） */
  create_time?: string
  /** 内推方法 */
  referral_method?: 1 | 2 | 3 | 4 | 5
}

export interface ReferralInfo {
  /** 内推的 ID */
  id?: string
  /** 投递 ID 列表,包含：原始内推的投递 ID、转移到其他职位后的投递 ID、不包含被HR复捞(加入职位）的投递 ID，第一个投递就是原始投递ID */
  application_ids?: string[]
  /** 创建时间（ms） */
  create_time?: string
  /** 内推人信息 */
  referral_user?: IdNameObject
}

export interface ReferralInfoV2 {
  /** 内推基本信息 */
  basic_info?: ReferralBasicInfo
  /** 内推关联推荐信息 */
  recommend_info?: ReferralRecommendInfo
}

export interface ReferralRecommendInfo {
  /** 与内推人关系 */
  relationship?: 0 | 1
  /** 熟悉程度 */
  familiarity?: 0 | 1
  /** 推荐语 */
  comment?: string
  /** 特殊关系 */
  specific_relationship?: SpecificRelationship
  /** 工作能力熟悉程度 */
  work_ability_familiarity?: 1 | 2 | 3 | 4
  /** 匹配度 */
  match_degree?: 1 | 2 | 3 | 4
}

export interface RegionPlace {
  /** 地理等级（国家｜省｜市｜区） */
  region_level?: string
  /** 地理id */
  region_id?: string
}

export interface RegistrationBasicInfo {
  /** ID */
  id?: string
  /** 创建时间 */
  registration_time?: number
  /** 下载链接 */
  download_url?: string
  /** 登记表场景 */
  scenario?: 5 | 6 | 14
}

export interface RegistrationInfo {
  /** 面试登记表ID */
  schema_id?: string
  /** 面试登记表名称 */
  name?: string
}

export interface RegistrationSchema {
  /** 信息登记表模板 ID */
  id?: string
  /** 信息登记表模板名称 */
  name?: string
  /** 登记表适用场景 */
  scenarios?: (5 | 6 | 14)[]
  /** 模块列表 */
  objects?: CommonSchema[]
}

export interface RegistrationSchemaInfo {
  /** 信息登记表ID */
  schema_id?: string
  /** 信息登记表名称 */
  name?: string
}

export interface RelatedMeta {
  /** 关联用户信息 */
  users?: Referer[]
  /** 关联群组信息 */
  chats?: Referer[]
  /** 关联文档信息 */
  docs?: Referer[]
  /** 关联值班者信息 */
  oncalls?: Referer[]
  /** 关联链接信息 */
  links?: Referer[]
  /** 相关词条信息 */
  abbreviations?: Abbreviation[]
  /** 所属分类信息（不支持传入一级分类。词条不可同时属于同一个一级分类下的多个二级分类，一级分类下的二级分类互斥） */
  classifications?: Classification[]
  /** 上传的相关图片 */
  images?: BaikeImage[]
}

export interface Reminder {
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
  text_element_style?: TextElementStyle
}

export interface ReorganizationInfo {
  /** 原部门名称 */
  original_department_names?: I18n[]
  /** 调整后部门名称 */
  target_department_names?: I18n[]
  /** 原部门编码 */
  original_department_code?: string
  /** 调整后部门编码 */
  target_department_code?: string
  /** 原部门类型，枚举值可通过文档【飞书人事枚举常量】部门子类型（department_sub_type）枚举定义部分获得 */
  original_sub_type?: Enum
  /** 调整后部门类型，枚举值可通过文档【飞书人事枚举常量】部门子类型（department_sub_type）枚举定义部分获得 */
  target_sub_type?: Enum
  /** 原部门负责人 */
  original_department_manager?: string
  /** 调整后部门负责人 */
  target_department_manager?: string
  /** 原描述 */
  original_descriptions?: I18n[]
  /** 调整后描述 */
  target_descriptions?: I18n[]
  /** 原默认成本中心 */
  original_cost_center?: CostCenter
  /** 调整后默认成本中心 */
  target_cost_center?: CostCenter
  /** 原是否保密 */
  original_is_confidential?: boolean
  /** 调整后是否保密 */
  target_is_confidential?: boolean
  /** 原岗职模式 */
  original_staffing_mode_option?: Enum
  /** 调整后岗职模式 */
  target_staffing_mode_option?: Enum
  /** 原上级部门 */
  original_parent_department_id?: string
  /** 调整后上级部门 */
  target_parent_department_id?: string
  /** 调整后上级部门 ID ，调整审批未生效前会返回格式为 td_xxx 的临时 ID */
  draft_target_parent_department_id?: string
  /** 原部门全路径 */
  original_department_id_path?: OrgdraftDepartmentId[]
  /** 调整后部门全路径 */
  target_department_id_path?: OrgdraftDepartmentId[]
  /** 自定义字段 */
  custom_fields?: ChangeFieldPair[]
}

export interface ReplaceFileRequest {
  /** 附件 token */
  token: string
}

export interface ReplaceImageRequest {
  /** 图片 token */
  token: string
  /** 图片宽度，单位 px */
  width?: number
  /** 图片高度，单位 px */
  height?: number
  /** 对齐方式 */
  align?: 1 | 2 | 3
}

export interface ReplyContent {
  /** 回复内容的元素列表 */
  elements: ReplyElement[]
}

export interface ReplyElement {
  /** 回复内容的元素类型 */
  type: 'text_run' | 'docs_link' | 'person'
  /** 文本内容 */
  text_run?: TextRun
  /** 云文档链接 */
  docs_link?: DocsLink
  /** 联系人 */
  person?: Person
}

export interface ReplyExtra {
  image_list?: string[]
}

export interface ReplyList {
  /** 回复列表 */
  replies: FileCommentReply[]
}

export interface Repo {
  /** 词库 id */
  id: string
  /** 词库名 */
  name: string
}

export interface Report {
  /** 总会议数量 */
  total_meeting_count?: string
  /** 总会议时长（单位sec） */
  total_meeting_duration?: string
  /** 总参会人数 */
  total_participant_count?: string
  /** 每日会议报告列表 */
  daily_report?: ReportMeetingDaily[]
}

export interface ReportCustomData {
  /** 名称 */
  name?: I18n
  /** 值 */
  value?: I18n
  /** 描述 */
  description?: I18n
}

export interface ReportMeetingDaily {
  /** 日期（unix时间，单位sec） */
  date?: string
  /** 会议数量 */
  meeting_count?: string
  /** 会议时长（单位sec） */
  meeting_duration?: string
  /** 参会人数 */
  participant_count?: string
}

export interface ReportTopUser {
  /** 用户ID */
  id?: string
  /** 用户名 */
  name?: string
  /** 用户类型 */
  user_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 会议数量 */
  meeting_count?: string
  /** 会议时长（单位sec） */
  meeting_duration?: string
}

export interface ReqTable {
  /** 数据表 名字 */
  name?: string
  /** 默认表格视图的名称 */
  default_view_name?: string
  /** 允许设置数据表的初始字段,默认第一个字段为索引列 */
  fields?: AppTableCreateHeader[]
}

export interface RequestDoc {
  /** 文件的 token，获取方式见[概述](https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction) */
  doc_token: string
  /** 文件类型 */
  doc_type: 'doc' | 'sheet' | 'bitable' | 'mindnote' | 'file' | 'wiki' | 'docx' | 'folder' | 'synced_block' | 'slides'
}

export interface Reserve {
  /** 预约ID */
  id?: string
  /** 9位会议号 */
  meeting_no?: string
  /** 会议密码 */
  password?: string
  /** 会议链接 */
  url?: string
  /** APPLink用于唤起飞书APP入会。"{?}"为占位符，用于配置入会参数，使用时需替换具体值：0表示关闭，1表示打开。preview为入会前的设置页，mic为麦克风，speaker为扬声器，camera为摄像头 */
  app_link?: string
  /** 直播链接 */
  live_link?: string
  /** 预约到期时间（unix时间，单位sec） */
  end_time?: string
}

export interface ReserveActionPermission {
  /** 权限项 */
  permission: 1 | 2 | 3
  /** 权限检查器列表，权限检查器之间为"逻辑或"的关系（即 有一个为true则拥有该权限） */
  permission_checkers: ReservePermissionChecker[]
}

export interface ReserveAdminConfig {
  /** 预定管理部门 */
  depts?: SubscribeDepartment[]
  /** 预定管理用户 */
  users?: SubscribeUser[]
}

export interface ReserveAssignHost {
  /** 用户类型，仅支持设置同租户下的 Lark 用户 */
  user_type?: 1
  /** 用户ID */
  id?: string
}

export interface ReserveCallee {
  /** 用户ID */
  id?: string
  /** 用户类型 */
  user_type: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** pstn/sip信息 */
  pstn_sip_info?: PstnSipInfo
}

export interface ReserveCallSetting {
  /** 被呼叫的用户 */
  callee: ReserveCallee
}

export interface ReserveCorrectionCheckInfo {
  /** 指定主持人无效id列表 */
  invalid_host_id_list?: string[]
}

export interface ReservedRoom {
  /** 会议室ID */
  room_id?: string
  /** 会议室名称 */
  room_name?: string
}

export interface ReserveFormConfig {
  /** 是否覆盖子层级及会议室 */
  if_cover_child_scope?: boolean
  /** 预定表单开关 */
  reserve_form: boolean
  /** 通知人列表 */
  notified_users?: SubscribeUser[]
  /** 最晚于会议开始前 notified_time收到通知(单位:分/时/天) */
  notified_time?: number
  /** 时间单位,1为分钟;2为小时;3为天，默认为天 */
  time_unit?: number
}

export interface ReserveMeetingSetting {
  /** 会议主题 */
  topic?: string
  /** 会议权限配置列表，如果存在相同的权限配置项则它们之间为"逻辑或"的关系（即 有一个为true则拥有该权限） */
  action_permissions?: ReserveActionPermission[]
  /** 会议初始类型 */
  meeting_initial_type?: 1 | 2
  /** 该会议是否支持互通，不支持更新（注：该字段内测中） */
  meeting_connect?: boolean
  /** 1v1呼叫相关参数 */
  call_setting?: ReserveCallSetting
  /** 使用飞书视频会议时，是否开启自动录制，默认false */
  auto_record?: boolean
  /** 指定主持人列表 */
  assign_host_list?: ReserveAssignHost[]
  /** 设置会议密码，仅支持 4-9 位数字 */
  password?: string
}

export interface ReservePermissionChecker {
  /** 检查字段类型 */
  check_field: 1 | 2 | 3
  /** 检查方式 */
  check_mode: 1 | 2
  /** 检查字段列表 */
  check_list: string[]
}

export interface ReserveScopeConfig {
  /** 是否覆盖子层级及会议室 */
  if_cover_child_scope?: boolean
  /** 可预定成员范围，0部分成员，1全部成员 */
  allow_all_users?: number
  /** 可预定成员列表 */
  allow_users?: SubscribeUser[]
  /** 可预定部门列表 */
  allow_depts?: SubscribeDepartment[]
}

export interface ResidentTax {
  /** 年度 */
  year_resident_tax: string
  /** -| 居民身份，枚举值 api_name 可通过【获取字段详情】接口查询，查询参数如下： - object_api_name = "resident_tax" - custom_api_name = "resident_status" */
  resident_status?: Enum
  /** 国家/地区，可通过【查询国家/地区信息】 接口查询 */
  tax_country_region_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface ResidentTaxForUpdate {
  /** 国家 / 地区ID */
  tax_country_region?: string
  /** 居民身份 */
  resident_status?: string
  /** 纳税地址 */
  tax_address?: AddressForUpdate
  /** 居民纳税身份说明 */
  resident_status_specification?: string
  /** 年度 */
  year_resident_tax?: string
}

export interface ResignedUserResouceReceiver {
  /** 部门群owner */
  department_chat_acceptor_employee_id?: string
  /** 外部群owner */
  external_chat_acceptor_employee_id?: string
  /** 文档owner */
  docs_acceptor_employee_id?: string
  /** 日历owner */
  calendar_acceptor_employee_id?: string
  /** 开放平台应用owner */
  application_acceptor_employee_id?: string
  /** 服务台owner */
  helpdesk_acceptor_employee_id?: string
  /** 审批owner */
  approval_acceptor_employee_id?: string
  /** 邮件owner */
  email_acceptor_employee_id?: string
  /** 妙记Owner */
  minutes_acceptor_employee_id?: string
  /** 飞书问卷Owner */
  survey_acceptor_employee_id?: string
  /** 集成平台资源Owner */
  anycross_acceptor_employee_id?: string
}

export const enum ResignReasonDirectory {
  /** 置空 */
  ResignReasonDirectoryEmpty = '0',
  /** 薪酬不符合预期 */
  ResignReasonDirectoryNotSatisfiedWithSalary = '1',
  /** 工作时间过长 */
  ResignReasonDirectoryWorkingPressure = '2',
  /** 不满意工作内容 */
  ResignReasonDirectoryNotSatisfiedWithWorkContent = '3',
  /** 不认可上级或管理层 */
  ResignReasonDirectoryLackOfRecognitionOfLeader = '4',
  /** 职业发展机会有限 */
  ResignReasonDirectoryCareerDevelopment = '5',
  /** 对公司文化缺乏认同 */
  ResignReasonDirectoryLackOfRecognitionOfCompanyCulture = '6',
  /** 组织架构调整（主动离职） */
  ResignReasonDirectoryActiveOrganizeBusinessAdjustment = '7',
  /** 合同到期 */
  ResignReasonDirectoryContractNotRenewed = '8',
  /** 跳槽 */
  ResignReasonDirectoryJobHopping = '9',
  /** 转行 */
  ResignReasonDirectoryChangeCareer = '10',
  /** 家庭原因 */
  ResignReasonDirectoryFamily = '11',
  /** 健康状况不佳 */
  ResignReasonDirectoryPoorHealth = '12',
  /** 工作地点原因 */
  ResignReasonDirectoryWorkPlace = '13',
  /** 其他(主动离职) */
  ResignReasonDirectoryActiveResignationOtherReason = '14',
  /** 意外 */
  ResignReasonDirectoryAccident = '15',
  /** 身故 */
  ResignReasonDirectoryDeath = '16',
  /** 解雇 */
  ResignReasonDirectoryFired = '17',
  /** 试用期不通过 */
  ResignReasonDirectoryFailedToPassProbationPeriod = '18',
  /** 工作表现不佳 */
  ResignReasonDirectoryNotUpToTheJob = '19',
  /** 工作产出低 */
  ResignReasonDirectoryLowWorkOutput = '20',
  /** 组织架构调整（被动离职） */
  ResignReasonDirectoryPassiveOrganizeBusinessAdjustment = '21',
  /** 违纪 */
  ResignReasonDirectoryBreachOfCompanyOrdinance = '22',
  /** 违法 */
  ResignReasonDirectoryBreakTheLaw = '23',
  /** 其他（被动离职） */
  ResignReasonDirectoryPassiveResignationOtherReason = '24',
  /** 其他（其他） */
  ResignReasonDirectoryOtherReason = '25',
}

export const enum ResignTypeDirectory {
  /** 置空 */
  ResignTypeDirectoryEmpty = '0',
  /** 主动 */
  ResignTypeDirectoryAcitve = '1',
  /** 被动 */
  ResignTypeDirectoryPassive = '2',
  /** 其他 */
  ResignTypeDirectoryyOther = '3',
}

export interface ResourceAcceptor {
  /** 资源处理类型 */
  processing_type: '1' | '2' | '3'
  /** 转移资源时，资源接收者 */
  acceptor_user_id?: string
}

export interface RestrictedModeSetting {
  /** 防泄密模式是否开启 */
  status?: boolean
  /** 允许截屏录屏 */
  screenshot_has_permission_setting?: 'all_members' | 'not_anyone'
  /** 允许下载消息中图片、视频和文件 */
  download_has_permission_setting?: 'all_members' | 'not_anyone'
  /** 允许复制和转发消息 */
  message_has_permission_setting?: 'all_members' | 'not_anyone'
}

export interface RestRule {
  /** 休息开始 */
  rest_begin_time: string
  /** 休息结束 */
  rest_end_time: string
}

export interface RestTimeFlexibleConfig {
  /** 是否开启休息弹性班次 */
  need_flexible?: boolean
  /** 休息弹性向后弹的分钟数 */
  late_mins?: number
}

export interface Resume {
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
  educations?: ResumeEducation[]
  /** 职业经历 */
  careers?: ResumeCareer[]
  /** 项目经历 */
  projects?: ResumeProject[]
  /** 工作年限，为空表示工作年限未知，数字单位为年，整数 */
  work_year?: number
  /** 生日，格式YYYY-MM-DD */
  date_of_birth?: string
  /** 性别 */
  gender?: 0 | 1 | 2
  /** 希望获得的职位列表 */
  willing_positions?: string[]
  /** 当前工作地点(城市) */
  current_location?: string
  /** 希望工作地点列表 */
  willing_locations?: string[]
  /** 家乡(城市) */
  home_location?: string
  /** 语言 */
  languages?: ResumeLanguage[]
  /** 获奖 */
  awards?: ResumeAward[]
  /** 证书 */
  certificates?: ResumeCertificate[]
  /** 竞赛 */
  competitions?: ResumeCompetition[]
  /** 自我评价 */
  self_evaluation?: string
  /** 链接列表 */
  urls?: string[]
  /** 社交链接 */
  social_links?: string[]
}

export interface ResumeAward {
  /** 奖项 */
  award?: string
  /** 获奖时间，格式：YYYY */
  date?: string
  /** 描述 */
  description?: string
}

export interface ResumeCareer {
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
  type?: 1 | 2
  /** 工作类型——'实习'、'全职' */
  type_str?: string
  /** 工作描述 */
  job_description?: string
}

export interface ResumeCertificate {
  /** 证书名称 */
  name?: string
  /** 描述 */
  desc?: string
}

export interface ResumeCompetition {
  /** 竞赛名称 */
  name?: string
  /** 描述 */
  desc?: string
}

export interface ResumeEducation {
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
  qualification?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

export interface ResumeLanguage {
  /** 语言等级 */
  level?: number
  /** 语言描述 */
  description?: string
}

export interface ResumeProject {
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

export interface ResumeSource {
  /** 来源id */
  id?: string
  /** 中文名 */
  zh_name?: string
  /** 英文名 */
  en_name?: string
  /** 启用状态 */
  active_status?: 1 | 2
  /** 来源类型 */
  resume_source_type?: string
}

export interface ResurrectEmployeeOptions {
  /** License订阅ID */
  subscription_ids?: string[]
}

export interface ReviewDetail {
  /** 评估题 ID，指评估内容中的每个评估项或填写项 */
  field_id: string
  /** 评估人 ID。如果开启了 360 匿名评估，并且是对全部查看者匿名，则不返回该值 */
  reviewer_user_id?: User
  /** 该评估题的最后提交时间 */
  submit_time?: string
  /** 评估项 ID（不包含子评估项），option_id 或 score 有值的时候有值 */
  indicator_id?: string
  /** 评估等级 ID */
  option_id?: string
  /** 评分 */
  score?: string
  /** 填写项填写的文本 */
  text?: string
  /** 标签填写题的 ID */
  tag_based_question_id?: string
  /** 标签填写项的内容 */
  tag_text_item_data?: TagText[]
  /** 绩效系数值 */
  perf_coefficient_value?: string
  /** 子评估项内容 */
  sub_indicator_data?: SubIndicator[]
  /** 评估的目标数据，当评估内容是对目标（O）或关键举措（KR）评估时有值 */
  objective_data?: ObjectiveData[]
  /** 评估的指标，当评估内容是对指标评估时有值 */
  metric_data?: MetricData[]
  /** 终评环节填写内容的来源（仅终评环节的数据有值） */
  leader_review_data_source?: 'review' | 'calibaration' | 'reconsideration'
  /** 工作/总结类型的文本内容 */
  multi_texts?: string[]
  /** 富文本格式的填写内容，解析方式见 [editor](https://open.larkoffice.com/document/client-docs/gadget/component-component/basic-component/form/editor#51af2f4f) */
  richtext?: string
  /** 富文本格式的填写内容，解析方式见 [editor](https://open.larkoffice.com/document/client-docs/gadget/component-component/basic-component/form/editor#51af2f4f) */
  multi_richtexts?: string[]
  /** 该评估题是否是首要评估项 */
  is_principal_review_item?: boolean
}

export interface Reviewee {
  /** 被评估人 ID */
  reviewee_user_id?: User
  /** 被评估人参与的项目 */
  activity_ids?: string[]
  /** 被评估人在该周期的个人绩效详情页链接。如果参与的项目未启动则为空 */
  reviewprofile_url?: string
}

export interface RevieweeMetric {
  /** 被评估人 */
  reviewee_user_id?: User
  /** 被评估人在该周期所属的指标模板 ID */
  metric_template_id?: string
  /** 被评估人在周期下的指标明细数据 */
  metric_details?: MetricDetail
}

export interface ReviewProfile {
  /** 被评估人 ID */
  user_id?: User
  /** 绩效评估周期 ID */
  semester_id?: string
  /** 绩效评估项目 ID */
  activity_id?: string
  /** 被评估人在该周期对应的后台评估模板 ID */
  review_template_id?: string
  /** 本周期内各环节内容 */
  stages?: ReviewStage[]
}

export interface ReviewRecord {
  /** 评估人的环节状态。各类型的环节分别有以下环节状态：  绩效结果查看环节状态 可选值： 0：已开通，绩效结果已开通，未发起复议也无需确认结果 1：待确认，绩效结果已开通但被评估人还未确认结果，确认的截止时间还未到达 2：已截止，绩效结果已开通但被评估人还未确认结果，确认的截止时间已到达 3：已确认，绩效结果已开通，被评估人已确认结果 4：已复议，绩效结果已开通，且被评估人已发起  绩效结果复议环节状态 可选值： 1：待完成，任务未完成 2：已截止，任务的截止时间已到达，且任务未完成 3：已完成，任务已完成  除上述类型外的其他环节类型状态 可选值： 0：未开始，任务的开始时间未到达 1：待完成，任务的开始时间到达而截止时间未到达，且任务未完成 2：已截止，任务的截止时间已到达，且任务未完成 3：已完成，任务已完成 */
  progress?: number
  /** 评估记录中的评估内容明细 */
  units?: ReviewUnit[]
  /** 360 ° 评估记录的信息。如果开启了 360 匿名评估，并且是对全部查看者匿名，则不返回评估人的部分信息 */
  invited_review_record_info?: InvitedReviewRecordInfo
  /** 项目上级评估记录信息 */
  direct_project_leader_record_info?: DirectProjectLeaderRecordInfo
  /** 评估记录 ID */
  record_id?: string
}

export interface ReviewStage {
  /** 环节 ID */
  stage_id?: string
  /** 环节类型 */
  stage_type?: 'summarize_key_outputs' | 'review' | 'communication_and_open_result' | 'view_result' | 'reconsideration' | 'leader_review'
  /** 该环节对应的环节模板的 ID */
  template_id?: string
  /** 评估内容记录。多人评估的环节有多份记录，比如 360 评估环节。如果开启了 360 匿名评估，并且是对全部查看者匿名，则评估记录数低于匿名下限，则不返回 360 评估记录 */
  records?: ReviewRecord[]
  /** 评估型环节的执行人角色 */
  review_stage_role?: 'reviewee' | 'invited_reviewer' | 'solid_line_leader' | 'dotted_line_leader' | 'secondary_solid_line_leader' | 'direct_project_leader' | 'custom_review_role' | 'metric_reviewer'
}

export interface ReviewTemplate {
  /** 环节模板列表 */
  templates?: Template[]
  /** 评估内容列表 */
  units?: Unit[]
  /** 评估模板 ID */
  review_template_id?: string
  /** 评估模板名称 */
  name?: I18n
  /** 评估模板描述 */
  description?: I18n
  /** 状态 */
  status?: string
}

export interface ReviewUnit {
  /** 评估内容 ID */
  unit_id?: string
  /** 是否为不了解。当评估人选不了解时，会返回为 true，其他时候不返回。 */
  is_unknown?: boolean
  /** 评估题列表，指评估内容中的每个题，可能是评估项或者填写项 */
  data?: ReviewDetail[]
}

export interface Richtext {
  /** 内容 */
  content?: string
  /** 类型 */
  type?: string
}

export interface Role {
  /** 自定义权限的名字 */
  role_name: string
  /** 数据表权限 */
  table_roles: TableRole[]
  /** 自定义权限的id */
  role_id?: string
  /** block权限 */
  block_roles?: BlockRole[]
  /** base权限 */
  base_rule?: Record<string, number>
}

export interface RoleAuthorization {
  /** 雇员 ID */
  employment_id: string
  /** 授权列表 */
  permission_detail_list: PermissionDetail[]
}

export interface RoleDetail {
  /** 角色ID */
  id?: string
  /** 角色名称 */
  name?: I18n
  /** 角色描述 */
  description?: I18n
  /** 更新时间 */
  modify_time?: string
  /** 停启用状态 */
  role_status?: 1 | 2
  /** 角色类型 */
  role_type?: 1 | 2 | 5
  /** 适用范围 */
  scope_of_application?: 1 | 2 | 3
  /** 是否在角色上配置业务管理范围 */
  has_business_management_scope?: boolean
  /** 社招权限配置 */
  socail_permission_collection?: PermissionCollection
  /** 校招权限配置 */
  campus_permission_collection?: PermissionCollection
}

export interface RoleMember {
  /** 角色唯一 ID，系统自动生成 */
  role_api_id?: string
  /** 角色 API 名称 */
  role_api_name?: string
  /** 授权用户 ID 列表 */
  users?: string[]
  /** 授权部门 ID 列表 */
  departments?: string[]
  /** 自定义授权用户规则 */
  user_filter?: Criterion
  /** 授权用户姓名列表，入参 need_display_name = true时返回 */
  user_display_infos?: PermissionNameInfo[]
  /** 授权部门名称列表，入参 need_display_name = true时返回 */
  department_display_infos?: PermissionNameInfo[]
  /** 角色成员模式 */
  type?: 'all' | 'custom'
  /** 更新人 ID */
  updated_by?: string
  /** 更新时间 */
  updated_at?: number
}

export interface Room {
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
  room_status?: RoomStatus
  /** 设施信息列表 */
  device?: Device[]
}

export interface RoomConfig {
  /** 飞书会议室背景图 */
  room_background?: string
  /** 飞书签到板背景图 */
  display_background?: string
  /** 飞书会议室数字标牌 */
  digital_signage?: RoomDigitalSignage
  /** 飞书投屏盒子数字标牌 */
  room_box_digital_signage?: RoomDigitalSignage
  /** 会议室状态 */
  room_status?: RoomStatus
}

export interface RoomDigitalSignage {
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
  materials?: RoomDigitalSignageMaterial[]
}

export interface RoomDigitalSignageMaterial {
  /** 素材ID */
  id?: string
  /** 素材名称 */
  name?: string
  /** 素材类型 */
  material_type?: 1 | 2 | 3
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

export interface RoomLevel {
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

export interface RoomMeetingReservation {
  /** 会议室ID */
  room_id?: string
  /** 会议室名称 */
  room_name?: string
  /** 会议标题 */
  event_title?: string
  /** 预定人 */
  reserver?: string
  /** 预定人ID */
  reserver_user_id?: string
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

export interface RoomStatus {
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

export interface Rule {
  /** 规则 id */
  id?: string
  /** 匹配条件 */
  condition: RuleCondition
  /** 匹配命中后的操作 */
  action: RuleAction
  /** 是否终点规则 */
  ignore_the_rest_of_rules: boolean
  /** 规则名称 */
  name: string
  /** 是否启用 */
  is_enable: boolean
}

export interface RuleAction {
  /** 匹配中规则后的操作列表 */
  items: RuleActionItem[]
}

export interface RuleActionItem {
  /** 操作类型 */
  type: 1 | 2 | 3 | 4 | 5 | 8 | 9 | 10 | 11 | 12 | 13
  /** 当 type 为移动到文件夹时，该字段填文件夹的 id */
  input?: string
}

export interface RuleCondition {
  /** 匹配类型 */
  match_type: 1 | 2
  /** 匹配规则列表 */
  items: RuleConditionItem[]
}

export interface RuleConditionItem {
  /** 匹配条件左值 */
  type: 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 10 | 12 | 13 | 14 | 15 | 16
  /** 匹配条件操作符 */
  operator?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10
  /** 匹配条件右值 */
  input?: string
}

export interface RuleDetail {
  /** 开始生效的时间戳。1.手动设置有效期类型勋章，配置有效期限需要配置该字段；2.时间戳必须是所在时区当天的零点时间戳，如时区为Asia/Shanghai时区时的1649606400 */
  effective_time?: string
  /** 结束生效的时间戳。1.手动设置有效期类型勋章，配置有效期限需要配置该字段；2.最大值：不得超过effective_time+100 年；3.非永久有效：时间戳必须是所在时区当天的23:59:59时间戳，如时区为Asia/Shanghai时区时的1649692799；4.永久有效：传值为0即可 */
  expiration_time?: string
  /** 入职周年日。根据入职时间发放类型勋章，需要配置该字段。 */
  anniversary?: number
  /** 有效期限。根据入职时间发放类型勋章，需要配置该字段。 */
  effective_period?: 1 | 2
}

export interface RuleDimension {
  /** 维度的key */
  entity_key?: string
  /** 维度名称 */
  entity_name?: Name
}

export interface Run {
  /** 运行 ID */
  id: string
  /** 运行的创建时间，毫秒时间戳 */
  created_at: string
  /** 应用 ID */
  app_id: string
  /** 会话 ID */
  session_id: string
  /** 状态 */
  status: RunStatus
  /** 开始时间，毫秒时间戳 */
  started_at?: string
  /** 结束时间，毫秒时间戳 */
  ended_at?: string
  /** 失败时的错误信息 */
  error?: RunError
  /** 其他透传信息 */
  metadata?: string
}

export interface RunError {
  /** 错误码 */
  code: string
  /** 错误信息 */
  message: string
}

export const enum RunStatus {
  /** 排队中 */
  RunStatusQueued = 'QUEUED',
  /** 执行中 */
  RunStatusInProgress = 'IN_PROGRESS',
  /** 等待补充消息输入 */
  RunStatusRequiresMessage = 'REQUIRES_MESSAGE',
  /** 已取消 */
  RunStatusCancelled = 'CANCELLED',
  /** 已完成 */
  RunStatusCompleted = 'COMPLETED',
  /** 已失败 */
  RunStatusFailed = 'FAILED',
  /** 已过期 */
  RunStatusExpired = 'EXPIRED',
}

export interface Schema {
  /** UI项名称 TODO文档 */
  ui_name?: string
  /** UI项自定义状态 */
  ui_status?: 'hide' | 'readonly' | 'editable' | 'unknown'
  /** 按钮点击后跳转的链接 */
  app_link?: string
}

export interface SchemaDisplay {
  /** 搜索数据的展示卡片 */
  card_key: 'search_common_card'
  /** 数据字段名称和展示字段名称的映射关系。如果没有设置，则只会展示 与展示字段名称同名的 数据字段 */
  fields_mapping?: SchemaDisplayFieldMapping[]
}

export interface SchemaDisplayFieldMapping {
  /** 展示字段名称，与 card_key 有关，每个模版能展示的字段不同。该字段不能重复 */
  display_field: string
  /** 数据字段的名称。需要确保该字段对应在 schema 属性定义中的 is_returnable 为 true，否则无法展示。需要使用 ${xxx} 的规则来描述 */
  data_field: string
}

export interface SchemaFieldAnswerOption {
  /** 是否用于搜索 */
  is_searchable?: boolean
  /** 是否用于返回 */
  is_returnable?: boolean
}

export interface SchemaFilterOptions {
  /** 筛选器展示名称 */
  display_name: string
  /** 筛选器展示名称国际化字段 */
  i18n_display_name?: I18nMeta
  /** 指明该筛选器支持单选或多选，默认单选 */
  option_mode?: 'single' | 'multiple'
  /** 关联的综合筛选器。只有 filter_type 为"user"和"time"时可以关联。"user" -> "from"；"time" -> "date"。 */
  associated_smart_filter?: 'from' | 'date'
  /** 筛选器类型 */
  filter_type?: 'user' | 'time' | 'searchable' | 'predefine_enum'
  /** 预定义的展示枚举值。在 filter_type 为 "predefine_enum" 时必须填写 */
  predefine_enum_values?: SchemaPredefineEnumStruct[]
  /** 是否开启客户端筛选器 */
  enable_client_filter?: boolean
  /** 可搜筛选器关联的数据源标识 */
  reference_datasource_id?: string
}

export interface SchemaPredefineEnumStruct {
  /** 枚举值的标识。在多枚举值定义中保持唯一 */
  name: string
  /** 枚举值展示文案 */
  text: string
}

export interface SchemaProperty {
  /** 属性名 */
  name: string
  /** 属性类型 */
  type: 'text' | 'int' | 'tag' | 'timestamp' | 'double' | 'tinytext' | 'user_ids'
  /** 该属性是否可用作搜索，默认为 false */
  is_searchable?: boolean
  /** 该属性是否可用作搜索结果排序，默认为 false。如果为 true，需要再配置 sortOptions */
  is_sortable?: boolean
  /** 该属性是否可用作返回字段，为 false 时，该字段不会被召回和展示。默认为 false */
  is_returnable?: boolean
  /** 属性排序的可选配置，当 is_sortable 为 true 时，该字段为必填字段 */
  sort_options?: SchemaSortOptions
  /** 相关类型数据的定义和约束 */
  type_definitions?: SchemaTypeDefinitions
  /** 属性搜索的可选配置，当 is_searchable 为 true 时，该字段为必填参数 */
  search_options?: SchemaSearchOptions
  /** 该属性是否可用作返回字段，为 false 时，该字段不会被筛选。默认为 false */
  is_filterable?: boolean
  /** 属性筛选的可选配置，当 is_searchable 为 true 时，该字段为必填参数 */
  filter_options?: SchemaFilterOptions
  /** 问答产品设置，仅在datasource中enable_answer为true时生效 */
  answer_option?: SchemaFieldAnswerOption
  /** 字段描述 */
  desc?: string
}

export interface SchemaSearchOptions {
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

export interface SchemaSortOptions {
  /** 排序的优先级，可选范围为 0~4，0为最高优先级。如果优先级相同，则随机进行排序。默认为0 */
  priority?: 0 | 1 | 2 | 3 | 4
  /** 排序的顺序。默认为 desc */
  order?: 'asc' | 'desc'
}

export interface SchemaTagOptions {
  /** tag 对应的枚举值名称 */
  name: string
  /** 标签对应的颜色 */
  color: 'red' | 'green' | 'blue' | 'grey' | 'yellow'
  /** 标签中展示的文本 */
  text: string
}

export interface SchemaTypeDefinitions {
  /** 标签类型的定义 */
  tag?: SchemaTagOptions[]
  /** 用户身份标识 */
  user_ids?: SchemaUserIdsOption
}

export interface SchemaUserIdsOption {
  /** 用户身份类型 */
  id_type: 'open_id' | 'union_id' | 'user_id'
}

export interface Scope {
  /** 权限名称，形如 user.phone:readonly */
  scope_name: string
  /** 租户应用权限授予状态 */
  grant_status: 1 | 2
  /** 权限的身份类型，形如 user(用户身份)、tenant(应用身份) */
  scope_type?: 'tenant' | 'user'
}

export interface ScopeConfig {
  /** 查询节点范围 */
  scope_type: 1 | 2
  /** 查询节点ID：如果scope_type为1，则为层级ID，如果scope_type为2，则为会议室ID */
  scope_id: string
  /** 节点配置 */
  scope_config?: RoomConfig
}

export interface ScopeGroup {
  /** 类型： 1: 部门 2：人员 3:国家地区 4:员工类型 5:工作城市 6:职级 7:序列 8:职务（企业版）9:工时制度（企业版） 100:自定义字段（企业版） */
  scope_value_type?: number
  /** 范围类型（是否包含） */
  operation_type?: number
  /** 如果是人员/部门类型 不需要使用该字段 */
  right?: ScopeValue[]
  /** 部门/人员id列表（具体类型根据scope_value_type判断） */
  member_ids?: string[]
  /** 企业版自定义字段唯一键 ID, 需要从飞书人事那边获取 */
  custom_field_ID?: string
  /** 企业版自定义字段对象类型  "employment":主数据对象，员工雇佣信息 , "person":主数据对象，个人 */
  custom_field_obj_type?: string
}

export interface ScopeValue {
  /** 标识Key */
  key?: string
  /** 名称 */
  name?: string
}

export interface ScoreCalculationConfig {
  /** 是否启用 */
  enabled?: boolean
  calculation_mode?: 1 | 2
}

export interface ScoreDimensionConfig {
  /** 分数维度类型 */
  score_dimension_type?: 1 | 2
  /** 分数下限 */
  lower_limit_score?: number
  /** 分数上限 */
  upper_limit_score?: number
}

export interface SearchObjectParam {
  /** 对象 APIName */
  api_name?: string
  /** 搜索字段 SearchFields 列表 */
  search_fields?: string[]
  /** 召回字段 APIID/APIName 列表 */
  select?: string[]
  /** 过滤条件，序列化的结果{"filter": "「标准Criterion」"} */
  filter?: Criterion
  /** 排序条件 */
  order_by?: OrderCondition
}

export interface SeatActivity {
  /** aPaaS 产品用户的 ID */
  user_id?: number
  /** aPaaS 产品应用的 namespace */
  namespace?: string
  /** 席位状态，枚举值：1. in_use 2. released */
  status?: 'in_use' | 'released'
  /** 用户使用席位访问应用且席位验证通过时，记录或更新的时间 */
  active_time?: number
}

export interface SeatAssignment {
  /** aPaaS 产品用户的 ID */
  user_id?: number
  /** aPaaS 产品应用的 namespace */
  namespace?: string
  /** 席位状态，枚举值：1. in_use 2. released */
  status?: 'in_use' | 'released'
}

export interface Section {
  /** 分区标题 */
  title?: string
}

export interface SectionSummary {
  /** 自定义分组的全局唯一ID */
  guid?: string
  /** 自定义分组的名称 */
  name?: string
  /** 是否是默认分组 */
  is_default?: boolean
}

export interface SecurityGroup {
  /** 角色ID */
  id: string
  /** 角色code */
  code: string
  /** 角色名称 */
  name?: Name
  /** 角色描述 */
  description?: Name
  /** 组织管理维度 */
  org_truncation?: OrgTruncation[]
}

export interface SegmentValue {
  /** 分段开始时间-毫秒级时间戳，[start_time, end_time] 是一个左闭右闭区间。 */
  start_time?: string
  /** 分段结束时间-毫秒级时间戳，[start_time, end_time] 是一个左闭右闭区间。 */
  end_time?: string
  /** 引用类型算薪项分段展示值 */
  reference_values?: I18nContent[]
  /** 算薪项分段原始值 */
  original_value?: string
}

export interface SelectOptionResult {
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

export interface SelectSetting {
  /** 单选选项 */
  options?: Option[]
}

export interface Semester {
  /** 绩效评估周期 ID */
  id?: string
  /** 年份 */
  year?: number
  /** 周期类型分组 */
  type_group?: string
  /** 周期类型 */
  type?: string
  /** 绩效评估周期 名称 */
  name?: I18n
  /** 绩效评估周期 状态 */
  progress?: 'initiating' | 'enabled'
  /** 绩效评估周期 开始时间 */
  start_time?: string
  /** 绩效评估周期 结束时间 */
  end_time?: string
  /** 绩效评估周期 创建时间 */
  create_time?: string
  /** 绩效评估周期 更新时间 */
  modify_time?: string
  /** 绩效评估周期 创建人 ID */
  create_user_id?: string
  /** 绩效评估周期 更新人 ID */
  modify_user_id?: string
}

export interface SemesterBaseInfo {
  /** 周期ID */
  semester_id?: string
  /** 周期名称 */
  semester_name?: I18n
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
}

export interface Sender {
  /** 该字段标识发送者的id */
  id: string
  /** 该字段标识发送者的id类型 */
  id_type: string
  /** 该字段标识发送者的类型 */
  sender_type: string
  /** tenant key */
  tenant_key?: string
}

export interface SeniorityAdjustInformationEdit {
  /** 调整类型- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：seniority_adjust_information  - custom_api_name：seniority_adjustment_type */
  seniority_adjustment_type: 'increase' | 'decrease'
  /** 开始日期- 格式： yyyy-mm-dd */
  start_date?: string
  /** 结束日期- 格式： yyyy-mm-dd */
  end_date?: string
  /** 调整原因 */
  reasons_for_seniority_adjustment?: string
  /** 调整值- 精确度：两位小数- 单位：年 */
  seniority_adjustment: number
  /** 自定义字段- 具体支持的对象请参考[【自定义字段说明】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom-fields-guide) */
  custom_fields?: ProfileSettingCustomField[]
}

export interface Sentence {
  /** 速记句子文本 */
  content?: string
  /** 句子开始讲话时的毫秒级时间戳 */
  speak_time?: string
  /** 该句子的说话人用户类型 */
  user_type?: 1 | 2
  /** 该句子的说话人名称 */
  speaker_name?: I18n
}

export interface SetEmployeePreResigned {
  /** 离职日期 */
  resign_date: string
  /** 离职原因 */
  resign_reason: ResignReasonDirectory
  /** 离职类型 */
  resign_type: ResignTypeDirectory
  /** 离职备注 */
  resign_remark?: string
}

export interface Setting {
  /** 谁可以创建空间的一级页面： "admin_and_member" = 管理员和成员 "admin"  - 仅管理员 */
  create_setting?: string
  /** 可阅读用户可否创建副本/打印/导出/复制： "allow" - 允许 "not_allow" - 不允许 */
  security_setting?: string
  /** 可阅读用户可否评论： "allow" - 允许 "not_allow" - 不允许 */
  comment_setting?: string
}

export interface ShareDepartment {
  /** 部门open ID */
  open_department_id?: string
  /** i18n文本 */
  name?: I18nText
}

export interface ShareGroup {
  /** 用户组的open_id */
  open_group_id?: string
  /** i18n文本 */
  name?: I18nText
}

export interface ShareUser {
  /** user open ID */
  open_user_id?: string
  /** i18n文本 */
  name?: I18nText
  /** 用户的头像 */
  avatar?: ImageLink
}

export interface Sheet {
  /** 电子表格文档 Token。格式为 {SpreadsheetToken}_{SheetID}，其中 SpreadsheetToken 是一篇电子表格的唯一标识，SheetID 是一张工作表的唯一标识，使用时请注意拆分。 */
  token?: string
}

export interface SheetFilterInfo {
  /** 筛选应用范围 */
  range: string
  /** 筛选出来的行 */
  filtered_out_rows: number[]
  /** sheet的筛选条件 */
  filter_infos: FilterInfo[]
}

export interface Shift {
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
  flexible_rule?: FlexibleRule[]
  /** 不需要打下班卡 */
  no_need_off?: boolean
  /** 打卡规则 */
  punch_time_rule: PunchTimeRule[]
  /** 晚走晚到规则 */
  late_off_late_on_rule?: LateOffLateOnRule[]
  /** 休息规则 */
  rest_time_rule?: RestRule[]
  /** 打卡规则 */
  overtime_rule?: OvertimeRule[]
  /** 日期类型，【是否弹性打卡 = ture】时，不可设置为“休息日”  可选值：1：工作日 2：休息日     示例值：（默认值）1 */
  day_type?: number
  /** 班外休息规则 */
  overtime_rest_time_rule?: RestRule[]
  /** 晚到多久记为严重迟到（优先级比原有字段高） */
  late_minutes_as_serious_late?: number
  /** 半天分割规则 */
  shift_middle_time_rule?: ShiftMiddleTimeRule
  /** 应出勤配置 */
  shift_attendance_time_config?: ShiftAttendanceTimeConfig
  /** 晚走次日晚到配置规则 */
  late_off_late_on_setting?: LateOffLateOnSetting
  /** 班次id(更新班次时需要传递) */
  id?: string
  /** 休息弹性设置 */
  rest_time_flexible_configs?: RestTimeFlexibleConfig[]
}

export interface ShiftAttendanceTimeConfig {
  /** 应出勤时长 */
  attendance_time?: number
  /** 上半天应出勤时长 */
  on_attendance_time?: number
  /** 下半天应出勤时长 */
  off_attendance_time?: number
}

export interface ShiftMiddleTimeRule {
  /** 半天分割类型 */
  middle_time_type?: 0 | 1 | 2 | 3
  /** 固定分割时间点（middle_time_type 为 3 时有效） */
  fixed_middle_time?: string
}

export interface SignatureAttachment {
  /** 文件 id */
  id?: string
  /** 文件名称 */
  file_name?: string
  /** 文件模板 id */
  file_template_id?: string
  /** 文件模板名称 */
  file_template_name?: string
  /** 文件模板类型 id */
  file_template_type_id?: string
  /** 文件模板类型名称 */
  file_template_type_name?: string
}

export interface Skill {
  /** 技能 ID */
  id?: string
  /** 技能名称 */
  label?: string
  /** 技能描述 */
  description?: string
  /** 用户提问示例 */
  samples?: string[]
  /** 技能入参定义 */
  input_schema?: string
  /** 技能出参定义 */
  output_schema?: string
}

export interface SkillGlobalVariable {
  /** 触发技能的消息文本 */
  query?: string
  /** 触发技能的消息文件 */
  files?: string[]
  /** 渠道信息 */
  channel?: Channel
}

export interface Sort {
  /** 字段名称 */
  field_name?: string
  /** 是否倒序排序 */
  desc?: boolean
}

export interface SortOption {
  /** 排序字段 */
  sort_field?: string
  /** 排序顺序 */
  sort_order?: 0 | 1
  /** 0=中文关键字;1=英文关键字;2=拼音 */
  sort_i18n?: 0 | 1 | 2
  /** 按某个字段的层级深度排序 */
  sort_by_strand_length?: boolean
  /** 是否按照拼音排序 */
  sort_by_pinyin?: boolean
  /** 是否按照枚举类型 value_order 排序 */
  sort_by_enum_value_order?: boolean
}

export interface Space {
  /** 知识空间名称 */
  name?: string
  /** 知识空间描述 */
  description?: string
  /** 知识空间id */
  space_id?: string
  /** 表示知识空间类型（团队空间 或 个人空间） */
  space_type?: 'team' | 'person'
  /** 表示知识空间可见性（公开空间 或 私有空间） */
  visibility?: 'public' | 'private'
  /** 表示知识空间的分享状态 */
  open_sharing?: 'open' | 'closed'
}

export interface Span {
  /** 偏移量开始位置，从 0 开始计数（编码格式采用 utf-8） */
  start: number
  /** 偏移量结束位置，从 0 开始计数（编码格式采用 utf-8） */
  end: number
}

export interface SpecificRelationship {
  /** 与候选人的关系 */
  relation_with_candidate?: 1 | 2 | 3
  /** 附加信息 */
  extra?: string
}

export interface Speech {
  /** 语音资源 */
  speech?: string
}

export interface Spreadsheet {
  /** 表格标题 */
  title?: string
  /** 文件夹token */
  folder_token?: string
  /** 表格 URL */
  url?: string
  /** 表格token */
  spreadsheet_token?: string
}

export interface StageTask {
  /** 用户ID */
  user_id?: string
  /** 状态数量列表 */
  stage_num_lists?: StageTaskStatusNum[]
  /** 任务信息列表 */
  stage_task_info_lists?: StageTaskInfo[]
}

export interface StageTaskInfo {
  /** 环节ID */
  stage_id?: string
  /** 环节名称 */
  name?: I18n
  /** 环节截止时间 */
  deadline?: string
  /** 环节任务数量 */
  need_todo_count?: number
  /** 环节跳转链接 */
  jump_url?: string
  /** 环节任务状态 */
  stage_task_status?: 'need_todo' | 'overdue' | 'all_done' | 'stage_pause'
  /** 归属分类ID */
  task_option_id?: 1 | 2 | 3
  /** 环节已完成任务数量 */
  finished_count?: number
}

export interface StageTaskStatusNum {
  /** 支持的ID */
  task_option_id?: 1 | 2 | 3
  /** 对Stage分类聚合 */
  stage_num?: number
}

export interface Start {
  /** 开始时间/日期的时间戳，距1970-01-01 00:00:00的毫秒数。如果开始时间是一个日期，需要把日期转换成时间戳，并设置 is_all_day=true */
  timestamp?: string
  /** 是否开始于一个日期。如果设为true，timestamp中只有日期的部分会被解析和存储。 */
  is_all_day?: boolean
}

export interface Statictics {
  /** 用户浏览数 */
  user_view_count?: string
  /** 页面浏览数量 */
  page_view_count?: string
  /** 用户浏览列表 */
  user_view_list?: UserViewDetail[]
}

export interface Statistics {
  /** 点赞数量 */
  like_count: number
  /** 点踩数量 */
  dislike_count: number
}

export interface StreamConfig {
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

export interface Style {
  /** 填充透明度 */
  fill_opacity?: number
  /** 边框样式 */
  border_style?: 'solid' | 'none' | 'dash' | 'dot'
  /** 边框宽度 */
  border_width?: 'extra_narrow' | 'narrow' | 'medium' | 'wide'
  /** 边框透明度 */
  border_opacity?: number
  /** 水平翻折 */
  h_flip?: boolean
  /** 垂直翻折 */
  v_flip?: boolean
}

export interface Subdivision {
  /** 省份/行政区id */
  id: string
  /** 省份/行政区名称 */
  name: I18n[]
  /** 所属国家/地区id，详细信息可通过【查询国家/地区信息】接口查询获得 */
  country_region_id: string
  /** 行政区类型，枚举值可通过文档【飞书人事枚举常量】行政区类型（subdivision_type）枚举定义部分获得 */
  subdivision_type: Enum
}

export interface SubIndicator {
  /** 子评估项的 ID */
  field_id: string
  /** 子评估项的评估等级 ID */
  indicator_id?: string
  /** 子评估项的评分 */
  option_id?: string
  /** 子评估项的填写项标题名称 */
  score?: string
  /** 评估人在该子评估项填写的文本 */
  text?: string
  /** 富文本格式的填写内容，解析方式见 [editor](https://open.larkoffice.com/document/client-docs/gadget/component-component/basic-component/form/editor#51af2f4f) */
  richtext?: string
}

export interface Subject {
  /** ID */
  id?: string
  /** 名称 */
  name?: I18n
  /** 创建时间 */
  create_time?: string
  /** 状态 */
  active_status?: 1 | 2
  /** 投递职位数上限 */
  application_limit?: number
  /** 创建人 */
  creator?: IdNameObject
}

export interface Subregion {
  /** 城市/区域id */
  id: string
  /** 城市/区域名称 */
  name: I18n[]
  /** 所属省份/行政区id，详细信息可通过【查询省份/行政区信息】接口查询获得 */
  subdivision_id: string
  /** 上级城市/区域区id */
  superior_subregion_id?: string
}

export interface SubscribeDepartment {
  /** 预定部门id */
  department_id: string
}

export interface SubscribeUser {
  /** 预订人id */
  user_id: string
}

export interface SupportCostCenterItem {
  /** 支持的成本中心id */
  cost_center_id?: string
  /** 分摊比例 */
  rate?: number
}

export interface SystemFields {
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
  manager?: Manager
  /** 职位 */
  job?: Job
  /** 职级 */
  job_level?: JobLevel
  /** 工作地点 */
  work_location?: WorkLocation
  /** 性别 */
  gender?: 1 | 2
  /** 生日 */
  birthday?: string
  /** 籍贯 */
  native_region?: NativeRegion
  /** 民族 */
  ethnicity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57
  /** 婚姻状况 */
  marital_status?: 1 | 2 | 3 | 4
  /** 政治面貌 */
  political_status?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13
  /** 参加工作日期 */
  entered_workforce_date?: string
  /** 证件类型 */
  id_type?: 1 | 2 | 3 | 4 | 5
  /** 证件号 */
  id_number?: string
  /** 户口类型 */
  hukou_type?: 1 | 2 | 3 | 4
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
  employee_type?: 1 | 2 | 3 | 4 | 5
  /** 员工状态 */
  status?: 1 | 2 | 3 | 4 | 5
  /** 入职日期 */
  hire_date?: string
  /** 试用期（月） */
  probation_months?: number
  /** 转正日期 */
  conversion_date?: string
  /** 转正申请 */
  application?: 1 | 2 | 3 | 4
  /** 转正状态 */
  application_status?: 1 | 2 | 3
  /** 离职日期 */
  last_day?: string
  /** 离职类型 */
  departure_type?: 1 | 2 | 3
  /** 离职原因 */
  departure_reason?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26
  /** 离职备注 */
  departure_notes?: string
  /** 合同公司 */
  contract_company?: ContractCompany
  /** 合同类型 */
  contract_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7
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
  primary_emergency_contact?: EmergencyContact
  /** 紧急联系人 */
  emergency_contact?: EmergencyContact[]
  /** 最高学历 */
  highest_level_of_edu?: Education
  /** 教育经历 */
  education?: Education[]
  /** 前工作经历 */
  former_work_exp?: WorkExperience
  /** 工作经历 */
  work_exp?: WorkExperience[]
  /** 身份证照片（人像面） */
  id_photo_po_side?: Attachment[]
  /** 身份证照片（国徽面） */
  id_photo_em_side?: Attachment[]
  /** 证件照 */
  id_photo?: Attachment[]
  /** 学位证书 */
  diploma_photo?: Attachment[]
  /** 毕业证书 */
  graduation_cert?: Attachment[]
  /** 奖励证明 */
  cert_of_merit?: Attachment[]
  /** 离职证明 */
  offboarding_file?: Attachment[]
  /** 取消入职原因 */
  cancel_onboarding_reason?: 1 | 2 | 3 | 4
  /** 取消入职备注 */
  cancel_onboarding_notes?: string
  /** 入职登记表状态 */
  employee_form_status?: 1 | 2 | 3
  /** 创建时间 */
  create_time?: number
  /** 更新时间 */
  update_time?: number
}

export interface SystemStatus {
  /** 系统状态ID */
  system_status_id?: string
  /** 系统状态名称，名称字符数要在1到20范围内。 */
  title: string
  /** 系统状态国际化名称，名称字符数要在1到20范围内。 */
  i18n_title?: SystemStatusI18nName
  /** 图标 */
  icon_key: 'GeneralDoNotDisturb' | 'GeneralInMeetingBusy' | 'Coffee' | 'GeneralBusinessTrip' | 'GeneralWorkFromHome' | 'StatusEnjoyLife' | 'GeneralTravellingCar' | 'StatusBus' | 'StatusInFlight' | 'Typing' | 'EatingFood' | 'SICK' | 'GeneralSun' | 'GeneralMoonRest' | 'StatusReading' | 'Status_PrivateMessage' | 'StatusFlashOfInspiration' | 'GeneralVacation'
  /** 颜色 */
  color?: 'BLUE' | 'GRAY' | 'INDIGO' | 'WATHET' | 'GREEN' | 'TURQUOISE' | 'YELLOW' | 'LIME' | 'RED' | 'ORANGE' | 'PURPLE' | 'VIOLET' | 'CARMINE'
  /** 优先级，数值越小，客户端展示的优先级越高。不同系统状态的优先级不能一样。 */
  priority?: number
  /** 同步设置 */
  sync_setting?: SystemStatusSyncSetting
}

export interface SystemStatusI18nName {
  /** 中文名 */
  zh_cn?: string
  /** 英文名 */
  en_us?: string
  /** 日文名 */
  ja_jp?: string
}

export interface SystemStatusSyncI18nExplain {
  /** 中文名 */
  zh_cn?: string
  /** 英文名 */
  en_us?: string
  /** 日文名 */
  ja_jp?: string
}

export interface SystemStatusSyncI18nName {
  /** 中文名 */
  zh_cn?: string
  /** 英文名 */
  en_us?: string
  /** 日文名 */
  ja_jp?: string
}

export interface SystemStatusSyncSetting {
  /** 是否默认开启 */
  is_open_by_default?: boolean
  /** 同步设置名称，名称字符数要在1到30范围内。 */
  title?: string
  /** 同步设置国际化名称，名称字符数要在1到30范围内。 */
  i18n_title?: SystemStatusSyncI18nName
  /** 同步设置解释文案，解释字符数要在1到60范围内。 */
  explain?: string
  /** 同步设置国际化解释文案，解释字符数要在1到60范围内。 */
  i18n_explain?: SystemStatusSyncI18nExplain
}

export interface SystemStatusUserCloseResultEntity {
  /** 用户ID */
  user_id?: string
  /** 关闭结果 */
  result?: 'success' | 'fail' | 'invisible_user_id' | 'invalid_user_id' | 'resign_user_id'
}

export interface SystemStatusUserOpenParam {
  /** 用户ID */
  user_id: string
  /** 结束时间，传入的应为秒单位的时间戳，距当前的时间跨度不能超过365天。 */
  end_time: string
}

export interface SystemStatusUserOpenResultEntity {
  /** 用户ID */
  user_id: string
  /** 结束时间，传入的应为秒单位的时间戳，距当前的时间跨度不能超过365天。 */
  end_time: string
  /** 开启结果 */
  result?: 'success_show' | 'success_user_close_syn' | 'success_user_in_higher_priority_system_status' | 'fail' | 'invisible_user_id' | 'invalid_user_id' | 'resign_user_id'
}

export interface Table {
  /** 单元格数组，数组元素为 Table Cell Block 的 ID */
  cells?: string[]
  /** 表格属性 */
  property: TableProperty
}

export type TableCell = unknown

export interface TableMergeInfo {
  /** 从当前行索引起被合并的连续行数 */
  row_span?: number
  /** 从当前列索引起被合并的连续列数 */
  col_span?: number
}

export interface TableProperty {
  /** 行数 */
  row_size: number
  /** 列数 */
  column_size: number
  /** 列宽，单位px */
  column_width?: number[]
  /** 单元格合并信息 */
  merge_info?: TableMergeInfo[]
  /** 设置首行为标题行 */
  header_row?: boolean
  /** 设置首列为标题列 */
  header_column?: boolean
}

export interface TableRole {
  /** 数据表权限 */
  table_perm: 0 | 1 | 2 | 4
  /** 数据表名 */
  table_name?: string
  /** 数据表ID */
  table_id?: string
  /** 记录筛选条件，在table_perm为1或2时有意义，用于指定可编辑或可阅读某些记录 */
  rec_rule?: RecRule
  /** 记录筛选条件，在rec_rule.Perm为2时有意义，用于指定剩余可阅读的记录 */
  other_rec_rule?: OtherRecRule
  /** 字段权限，仅在table_perm为2时有意义，设置字段可编辑或可阅读 */
  field_perm?: Record<string, number>
  /** 新增记录权限，仅在table_perm为2时有意义，用于设置记录是否可以新增 */
  allow_add_record?: boolean
  /** 删除记录权限，仅在table_perm为2时有意义，用于设置记录是否可以删除 */
  allow_delete_record?: boolean
  /** 视图权限 */
  view_perm?: 1 | 2
  /** 可读的视图集合，仅在view_perm为1时有意义，未设置表示所有视图可读 */
  view_rules?: Record<string, number>
  /** 可读的视图集合，仅在view_perm为1时有意义，未设置表示所有视图可读 */
  field_action_rules?: Record<string, Record<string, number>>
}

export interface TagI18nName {
  /** 语言 */
  locale: string
  /** 名称 */
  name?: string
}

export interface TagInfo {
  /** id */
  id?: string
  /** 标签类型 */
  tag_type?: string
  /** name */
  name?: string
  /** i18n name */
  i18n_names?: TagI18nName[]
  /** 创建时间 */
  create_time?: string
  /** 更新时间 */
  update_time?: string
}

export interface TagInfoWithBindVersion {
  /** 标签内容 */
  tag_info?: TagInfo
  /** 绑定时间 */
  bind_version?: string
}

export interface TagText {
  /** 标签 ID */
  tag_text_id?: string
  /** 评估人在该标签下填写的文本 */
  tag_text?: string
  /** 富文本格式的填写内容，解析方式见 [editor](https://open.larkoffice.com/document/client-docs/gadget/component-component/basic-component/form/editor#51af2f4f) */
  tag_richtext?: string
}

export interface Talent {
  /** 人才ID */
  id?: string
  /** 是否在猎头保护期 */
  is_in_agency_period?: boolean
  /** 是否已入职 */
  is_onboarded?: boolean
  /** 基础信息 */
  basic_info?: TalentBasicInfo
  /** 教育经历 */
  education_list?: TalentEducationInfo[]
  /** 工作经历 */
  career_list?: TalentCareerInfo[]
  /** 项目经历 */
  project_list?: TalentProjectInfo[]
  /** 作品 */
  works_list?: TalentWorksInfo[]
  /** 获奖 */
  award_list?: TalentAwardInfo[]
  /** 语言能力 */
  language_list?: TalentLanguageInfo[]
  /** 社交账号 */
  sns_list?: TalentSnsInfo[]
  /** 简历来源 */
  resume_source_list?: TalentResumeSource[]
  /** 面试登记表 */
  interview_registration_list?: TalentInterviewRegistrationSimple[]
  /** 简历附件id列表（按照简历创建时间降序） */
  resume_attachment_id_list?: string[]
  /** 最高学历 */
  top_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  /** 第一学历 */
  first_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}

export interface TalentAwardInfo {
  /** ID */
  id?: string
  /** 获奖名称 */
  title?: string
  /** 获奖时间 */
  award_time?: string
  /** 描述 */
  desc?: string
}

export interface TalentBasicInfo {
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
  nationality?: TalentNationality
  /** 性别 */
  gender?: 1 | 2 | 3
  /** 所在地点 */
  current_city?: TalentCityInfo
  /** 家乡 */
  hometown_city?: TalentCityInfo
  /** 意向地点 */
  preferred_city_list?: TalentCityInfo[]
  /** 证件类型 */
  identification_type?: 1 | 2 | 3 | 4 | 5 | 6 | 9
  /** 证件号 */
  identification_number?: string
  /** 生日 */
  birthday?: number
  /** 创建人 */
  creator_id?: string
  /** 婚姻状况 */
  marital_status?: 1 | 2
  /** 家庭住址 */
  current_home_address?: string
  /** 修改时间 */
  modify_time?: string
}

export interface TalentBasicInfoV2 {
  /** 人才 ID */
  id?: string
  /** 人才名字 */
  name?: string
  /** 人才手机国家区号 */
  mobile_code?: string
  /** 人才手机号 */
  mobile_number?: string
  /** 人才邮箱 */
  email?: string
}

export interface TalentBatchInfo {
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
  /** 是否已入职 */
  is_onboarded?: boolean
}

export interface TalentBlock {
  /** 加入黑名单时间，毫秒级时间戳 */
  blocked_time?: string
  /** 黑名单创建者 ID */
  creator_id?: string
  /** 加入黑名单原因 */
  reason?: string
}

export interface TalentCareerInfo {
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
  career_type?: 1 | 2 | 3 | 4
  /** 工作经历标签 */
  tag_list?: (5 | 6 | 14)[]
}

export interface TalentCityInfo {
  /** 城市码 */
  city_code?: string
  /** 中文名 */
  zh_name?: string
  /** 英文名 */
  en_name?: string
}

export interface TalentCombinedAwardInfo {
  /** ID */
  id?: string
  /** 获奖名称 */
  title?: string
  /** 获奖时间 */
  award_time?: string
  /** 描述 */
  desc?: string
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCombinedBasicInfo {
  /** 名字 */
  name: string
  /** 手机号 */
  mobile?: string
  /** 手机国家代码 */
  mobile_country_code?: string
  /** 邮箱 */
  email?: string
  /** 证件信息 */
  identification?: TalentIdentificationInfo
  /** 开始工作时间 */
  start_work_time?: string
  /** 出生日期 */
  birthday?: string
  /** 性别 */
  gender?: 1 | 2 | 3
  /** 国籍编码 */
  nationality_id?: string
  /** 所在地点编码 */
  current_city_code?: string
  /** 家乡编码 */
  hometown_city_code?: string
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCombinedCareerInfo {
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
  career_type?: 1 | 2
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCombinedEducationInfo {
  /** ID */
  id?: string
  /** 学位 */
  degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  /** 学校 */
  school?: string
  /** 专业 */
  field_of_study?: string
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
  /** 学历类型 */
  education_type?: 1 | 2 | 3 | 4 | 5
  /** 成绩排名 */
  academic_ranking?: 5 | 10 | 20 | 30 | 50 | -1
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCombinedLanguageInfo {
  /** ID */
  id?: string
  /** 语言 */
  language?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
  /** 精通程度 */
  proficiency?: 1 | 2 | 3 | 4 | 5
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCombinedProjectInfo {
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
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCombinedSnsInfo {
  /** ID */
  id?: string
  /** SNS名称 */
  sns_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** URL/ID */
  link?: string
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCombinedWorkInfo {
  /** ID */
  id?: string
  /** 作品链接 */
  link?: string
  /** 描述 */
  desc?: string
  /** 附件 ID */
  attachment_id?: string
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentCustomizedAttachment {
  /** 附件 ID */
  file_id?: string
  /** 附件名称 */
  file_name?: string
  /** 附件类型 */
  content_type?: string
  /** 附件大小 */
  file_size?: number
}

export interface TalentCustomizedDataChild {
  /** 自定义字段 ID */
  object_id?: string
  /** 字段名称 */
  name?: I18n
  /** 字段类型 */
  object_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 13
  /** 自定义字段值 */
  value?: TalentCustomizedValue
}

export interface TalentCustomizedDataObjectValue {
  /** 自定义字段 ID */
  object_id?: string
  /** 子字段列表 */
  children?: TalentCustomizedDataObjectValueChild[]
}

export interface TalentCustomizedDataObjectValueChild {
  /** 自定义字段 ID */
  object_id?: string
  /** 自定义字段值 */
  value?: string
}

export interface TalentCustomizedOption {
  /** 选项 ID */
  key?: string
  /** 选项名称 */
  name?: I18n
}

export interface TalentCustomizedTimeRange {
  /** 开始时间，秒级时间戳 */
  start_time?: string
  /** 结束时间，当值为至今时，返回「-」，秒级时间戳 */
  end_time?: string
}

export interface TalentCustomizedValue {
  /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
  content?: string
  /** 当字段类型为单选时，从此字段取值 */
  option?: TalentCustomizedOption
  /** 当字段类型为多选时，从此字段取值 */
  option_list?: TalentCustomizedOption[]
  /** 当字段类型为时间段时，从此字段取值 */
  time_range?: TalentCustomizedTimeRange
  /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是秒级时间戳 */
  time?: string
  /** 当字段类型为数字时，从此字段取值 */
  number?: string
  /** 当字段类型为附件时，从此字段取值 */
  customized_attachment?: TalentCustomizedAttachment[]
}

export interface TalentEducationInfo {
  /** ID */
  id?: string
  /** 学位 */
  degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
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
  education_type?: 1 | 2 | 3 | 4 | 5
  /** 成绩排名 */
  academic_ranking?: 5 | 10 | 20 | 30 | 50 | -1
  /** 教育经历标签 */
  tag_list?: (1 | 2 | 3 | 4)[]
}

export interface TalentExternalInfo {
  /** 人才 ID */
  talent_id?: string
  /** 人才在外部系统的创建时间 */
  external_create_time?: string
}

export interface TalentFolder {
  /** 名称 */
  name?: string
  /** 文件夹 ID */
  folder_id?: string
  /** 所有者 ID */
  owner_id?: string
  /** 文件夹加入时间,毫秒级时间戳 */
  add_time?: string
}

export interface TalentFolderForList {
  /** 文件夹ID */
  folder_id?: string
  /** 名字 */
  folder_name: string
  /** 所有者ID */
  owner_id?: string
}

export interface TalentIdentificationInfo {
  /** 证件类型 */
  identification_type?: 1 | 2 | 3 | 4 | 5 | 6 | 9
  /** 证件号 */
  identification_number?: string
}

export interface TalentInterview {
  /** 投递 ID */
  application_id?: string
  /** 面试列表 */
  interview_list?: InterviewExtend[]
}

export interface TalentInterviewRegistrationSimple {
  /** ID */
  id?: string
  /** 创建时间 */
  registration_time?: number
}

export interface TalentLanguageInfo {
  /** ID */
  id?: string
  /** 语言 */
  language?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25
  /** 精通程度 */
  proficiency?: 1 | 2 | 3 | 4 | 5
}

export interface TalentNationality {
  /** 国家编码 */
  nationality_code?: string
  /** 中文名 */
  zh_name?: string
  /** 英文名 */
  en_name?: string
}

export interface TalentNote {
  /** 备注 ID */
  id?: string
  /** 人才 ID */
  talent_id?: string
  /** 投递 ID */
  application_id?: string
  /** 人才备注创建时间,毫秒级时间戳 */
  create_time?: string
  /** 人才备注更新时间,毫秒级时间戳 */
  update_time?: string
  /** 创建人ID */
  creator_id?: string
  /** 备注内容 */
  content?: string
  /** 备注私密属性 */
  privacy?: 1 | 2
}

export interface TalentOperationLog {
  /** 投递 ID */
  application_id?: string
  /** 候选人 ID */
  talent_id?: string
  /** 操作人 */
  operator?: IdNameObject
  /** 操作类型 */
  operation_type?: number
  /** 操作时间 */
  operation_time?: string
  /** 操作人类型 */
  operator_type?: 1
}

export interface TalentPool {
  /** 人才库ID */
  id?: string
  /** 人才库名称 */
  i18n_name?: I18n
  /** 人才库描述 */
  i18n_description?: I18n
  /** 父级人才库ID */
  parent_id?: string
  /** 是否「仅部分用户可见」 */
  is_private?: 1 | 2
  /** 创建时间，毫秒时间戳 */
  create_time?: string
  /** 修改时间，毫秒时间戳 */
  modify_time?: string
}

export interface TalentProjectInfo {
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

export interface TalentResumeAttachment {
  /** ID */
  id?: string
  /** 附件名 */
  name?: string
  /** 附件MIME类型 */
  mime?: string
  /** 创建时间戳 */
  create_time?: string
}

export interface TalentResumeSource {
  /** ID */
  id?: string
  /** 中文名 */
  zh_name?: string
  /** 英文名 */
  en_name?: string
}

export interface TalentSelfEvaluation {
  /** ID */
  id?: string
  /** 内容 */
  content?: string
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface TalentSimilar {
  /** 是否相似人才 */
  is_similar_talent?: boolean
  /** 相似人才 ID 列表 */
  similar_talent_id_list?: string[]
}

export interface TalentSnsInfo {
  /** ID */
  id?: string
  /** SNS名称 */
  sns_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** URL/ID */
  link?: string
}

export interface TalentTag {
  /** 标签 ID */
  id?: string
  /** 标签名称 */
  name?: I18n
  /** 描述名称 */
  description?: I18n
  /** 标签类型 */
  type?: 1 | 2
  /** 启停用状态 */
  active_status?: 1 | 2
}

export interface TalentWorksInfo {
  /** ID */
  id?: string
  /** 作品链接 */
  link?: string
  /** 描述 */
  desc?: string
  /** 作品附件名称，若需获取作品附件预览信息可调用「获取附件预览信息」接口 */
  name?: string
}

export interface TargetMajorInfo {
  /** 目标专业ID */
  id?: string
  /** 目标专业中文名称 */
  zh_name?: string
  /** 目标专业英文名称 */
  en_name?: string
}

export interface Task {
  /** 任务 ID */
  task_id?: string
  /** 折叠状态 */
  folded?: boolean
}

export interface TaskDependency {
  /** 依赖类型 */
  type: 'prev' | 'next'
  /** 依赖任务的GUID */
  task_guid: string
}

export interface TaskInTasklistInfo {
  /** 任务所在清单的guid */
  tasklist_guid?: string
  /** 任务所在清单的自定义分组guid */
  section_guid?: string
}

export interface Tasklist {
  /** 清单的全局唯一ID */
  guid?: string
  /** 清单名 */
  name?: string
  /** 清单创建者 */
  creator?: Member
  /** 清单负责人 */
  owner?: Member
  /** 清单协作人 */
  members?: Member[]
  /** 该清单分享的applink */
  url?: string
  /** 清单创建时间戳(ms) */
  created_at?: string
  /** 清单最后一次更新时间戳（ms) */
  updated_at?: string
}

export interface TasklistActivitySubscription {
  /** 订阅guid */
  guid?: string
  /** 订阅名称 */
  name?: string
  /** 订阅者 */
  subscribers?: Member[]
  /** 要订阅的清单动态类型 */
  include_keys?: number[]
  /** 该订阅是否为停用 */
  disabled?: boolean
}

export interface TaskResult {
  /** 任务id */
  task_id: string
  /** MoveDocsToWiki任务结果 */
  move_result?: MoveResult[]
}

export interface TaskSearchItem {
  /** 审批定义 */
  approval?: InstanceSearchApproval
  /** 审批定义分组 */
  group?: InstanceSearchGroup
  /** 审批实例信息 */
  instance?: InstanceSearchNode
  /** 审批任务 */
  task?: TaskSearchNode
}

export interface TaskSearchNode {
  /** 审批任务发起人 id */
  user_id?: string
  /** 审批任务开始时间 */
  start_time?: string
  /** 审批任务结束时间 */
  end_time?: string
  /** 审批任务状态 */
  status?: 'rejected' | 'pending' | 'approved' | 'transferred' | 'done' | 'rm_repeat' | 'processed' | 'hidden'
  /** 审批实例名称（只有第三方审批有） */
  title?: string
  /** 审批任务扩展字段，string型json */
  extra?: string
  /** 审批任务链接（只有第三方审批有） */
  link?: InstanceSearchLink
  /** 任务id */
  task_id?: string
  /** 审批任务更新时间 */
  update_time?: string
  /** 三方审批扩展 ID */
  task_external_id?: string
}

export interface TaskSummary {
  /** 任务GUID */
  guid?: string
  /** 任务的标题 */
  summary?: string
  /** 任务完成的时间戳(ms)，为0表示未完成 */
  completed_at?: string
  /** 任务开始时间 */
  start?: Start
  /** 任务截止时间 */
  due?: Due
  /** 任务成员列表 */
  members?: Member[]
  /** 子任务的个数 */
  subtask_count?: number
}

export interface TaxiEntity {
  /** 识别的字段种类 */
  type?: 'car_number' | 'start_time' | 'end_time' | 'distance' | 'start_date' | 'total_amount' | 'invoice_code' | 'invoice_no' | 'price' | 'dispatch_fee' | 'additional_fee' | 'is_sealed' | 'seller_name_in_seal' | 'seller_taxpayer_no_in_seal' | 'title_trial' | 'invoice_special_seal'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface TaxiInvoice {
  /** 识别出的实体类型 */
  entities?: TaxiEntity[]
}

export interface Template {
  /** 环节模板 ID */
  template_id: string
  /** 环节模板对应的环节名称 */
  name?: I18n
  /** 环节类型 */
  stage_type?: string
  /** 环节执行角色 */
  review_stage_role?: string
}

export interface Tenant {
  /** 企业名称 */
  name: string
  /** 企业编号 */
  display_id: string
  /** 个人版/团队版标志 */
  tenant_tag: 0 | 2
  /** 企业标识 */
  tenant_key: string
  /** 企业头像 */
  avatar: Avatar
  /** 企业完整域名。企业域名可用于企业成员访问管理后台、云文档等含URL地址的网页。 */
  domain?: string
}

export interface TenantAssignInfo {
  /** 席位id */
  subscription_id?: string
  /** license_plan_key */
  license_plan_key?: string
  /** 商业化产品名称 */
  product_name?: string
  /** 国际化名称 */
  i18n_name?: ProductI18nName
  /** 席位总数 */
  total_seats?: string
  /** 已分配席位数 */
  assigned_seats?: string
  /** 席位起始时间 */
  start_time?: string
  /** 席位结束时间 */
  end_time?: string
}

export interface Term {
  /** 原文 */
  from: string
  /** 译文 */
  to: string
}

export interface TerminationReason {
  /** 终止原因 ID */
  id?: string
  /** 终止原因名称 */
  name?: I18n
  /** 内推渠道展示文案 */
  referral_name?: I18n
  /** 终止原因类型 */
  termination_type?: 1 | 22 | 27
  /** 是否用于评估 */
  is_used_as_evaluation?: boolean
  /** 状态 */
  active_status?: 1 | 2
}

export interface TerminationReasonChildInfo {
  /** 终止原因 ID */
  id?: string
  /** 终止原因名称 */
  name?: I18n
}

export interface TerminationReasonInfo {
  /** 终止原因 id */
  id?: string
  /** 终止原因名称 */
  name?: I18n
  /** 子级终止原因 */
  children?: TerminationReasonChildInfo[]
}

export interface Test {
  /** 笔试 ID */
  test_id?: string
  /** 投递 ID */
  application_id?: string
  /** 人才 ID */
  talent_id?: string
  /** 职位 ID */
  job_id?: string
  /** 试卷 ID */
  test_paper_id?: string
  /** 试卷名称 */
  test_paper_name?: string
  /** 试卷来源 ID */
  test_paper_source_id?: string
  /** 试卷来源名称 */
  test_paper_source_name?: I18n
  /** 笔试答复状态 */
  reply_status?: 1 | 2 | 3
  /** 笔试状态 */
  test_status?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 笔试时间 */
  test_schedule?: TestSchedule
  /** 笔试作答完成时间 */
  test_complete_time?: string
  /** 笔试报告链接列表 */
  report_url_list?: string[]
  /** 笔试详细成绩 */
  result_detail_list?: TestResultDetail[]
  /** 笔试结果上传时间（手动录入的笔试成绩具有） */
  result_upload_time?: string
  /** 阅卷得分 */
  score?: string
  /** 阅卷结果提交时间（若重复提交，则为最新提交时间） */
  score_submit_time?: string
  /** 阅卷人，值类型由 user_id_type 查询参数决定 */
  reviewer?: string
  /** 阅卷安排时间 */
  review_created_at?: string
  /** 笔试创建时间 */
  created_at?: string
}

export interface TestResultDetail {
  /** 笔试科目 */
  subject?: string
  /** 笔试科目结论 */
  result?: string
}

export interface TestSchedule {
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
}

export interface Text {
  /** 文本样式 */
  style?: TextStyle
  /** 文本元素 */
  elements: TextElement[]
}

export interface TextElement {
  /** 文字 */
  text_run?: TextRun
  /** @用户 */
  mention_user?: MentionUser
  /** @文档 */
  mention_doc?: MentionDoc
  /** 日期提醒 */
  reminder?: Reminder
  /** 内联附件 */
  file?: InlineFile
  /** 未支持的 TextElement */
  undefined?: UndefinedElement
  /** 内联 block */
  inline_block?: InlineBlock
  /** 公式 */
  equation?: Equation
}

export interface TextElementStyle {
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
  background_color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  /** 字体颜色 */
  text_color?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 链接 */
  link?: Link
  /** 评论 id 列表 */
  comment_ids?: string[]
}

export interface TextRun {
  /** 文本内容 */
  content: string
  /** 文本局部样式 */
  text_element_style?: TextElementStyle
}

export type TextSetting = unknown

export interface TextStyle {
  /** 对齐方式 */
  align?: 1 | 2 | 3
  /** todo 的完成状态 */
  done?: boolean
  /** 文本的折叠状态 */
  folded?: boolean
  /** 代码块语言 */
  language?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75
  /** 代码块是否自动换行 */
  wrap?: boolean
  /** 块背景色 */
  background_color?: 'LightGrayBackground' | 'LightRedBackground' | 'LightOrangeBackground' | 'LightYellowBackground' | 'LightGreenBackground' | 'LightBlueBackground' | 'LightPurpleBackground' | 'PaleGrayBackground' | 'DarkGrayBackground' | 'DarkRedBackground' | 'DarkOrangeBackground' | 'DarkYellowBackground' | 'DarkGreenBackground' | 'DarkBlueBackground' | 'DarkPurpleBackground'
  /** 首行缩进级别 */
  indentation_level?: 'NoIndent' | 'OneLevelIndent'
  /** 用于确定有序列表项编号，为具体数值或'auto' */
  sequence?: string
}

export interface Ticket {
  /** ticket id */
  ticket_id: string
  /** helpdesk id */
  helpdesk_id?: string
  /** guest of this ticket */
  guest?: TicketUser
  /** 备注 */
  comments?: Comments
  /** ticket type */
  ticket_type?: number
  /** ticket status */
  status?: number
  /** ticket score */
  score?: number
  /** the time when the ticket is created */
  created_at?: number
  /** the time when the ticket is updated */
  updated_at?: number
  /** the time when the ticket is closed */
  closed_at?: number
  /** 不满意原因 */
  dissatisfaction_reason?: I18n
  /** agents of this ticket */
  agents?: TicketUser[]
  /** the ticket channel */
  channel?: number
  /** if ticket is solved */
  solve?: number
  /** closed user of this ticket */
  closed_by?: TicketUser
  /** collaborators of this ticket */
  collaborators?: TicketUser[]
  /** ticket customized fields */
  customized_fields?: CustomizedFieldDisplayItem[]
  /** 客服服务时长，客服最后一次回复时间距离客服进入时间间隔，单位秒 */
  agent_service_duration?: number
  /** 客服首次回复时间距离客服进入时间的间隔，单位秒 */
  agent_first_response_duration?: number
  /** 机器人服务时间：客服进入时间距离工单创建时间的间隔，单位秒 */
  bot_service_duration?: number
  /** 客服解决时长，关单时间距离客服进入时间的间隔，单位秒 */
  agent_resolution_time?: number
  /** 工单实际处理时间：从客服进入到关单，单位秒 */
  actual_processing_time?: number
  /** 客服进入时间，单位毫秒 */
  agent_entry_time?: number
  /** 客服首次回复时间，单位毫秒 */
  agent_first_response_time?: number
  /** 客服最后回复时间，单位毫秒 */
  agent_last_response_time?: number
  /** 主责客服 */
  agent_owner?: TicketUser
}

export interface TicketCustomizedField {
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
  created_by?: TicketUser
  /** the user who recently updated the ticket customized field */
  updated_by?: TicketUser
  /** if the dropdown field supports multi-select */
  dropdown_allow_multiple?: boolean
}

export interface TicketMessage {
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

export interface TicketUser {
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

export interface TimeConfig {
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

export interface TimeInfo {
  /** 仅全天日程使用该字段，如2018-09-01。需满足 RFC3339 格式。不能与 time_stamp 同时指定 */
  date?: string
  /** 秒级时间戳，如1602504000(表示2020/10/12 20:0:00 +8时区) */
  timestamp?: string
  /** 时区名称，使用IANA Time Zone Database标准，如Asia/Shanghai；全天日程时区固定为UTC，非全天日程时区默认为Asia/Shanghai */
  timezone?: string
}

export interface TimeZone {
  /** 时区 ID */
  time_zone_id?: string
  /** 时区名称 */
  name?: I18n[]
  /** 编码 */
  time_zone_code?: string
  /** UTC 时区偏移量 */
  utc_offset?: string
  /** 状态 */
  status?: 1 | 0
}

export interface TmpDownloadUrl {
  /** 文件标识符 */
  file_token: string
  /** 文件临时下载链接 */
  tmp_download_url: string
}

export interface Todo {
  /** 简历评估待办信息，仅当 type=evaluation 时返回 */
  evaluation?: TodoCommon
  /** Offer 待办信息，仅当 type=offer 时返回 */
  offer?: TodoCommon
  /** 笔试待办信息，仅当 type=exam 时返回 */
  exam?: TodoCommon
  /** 面试待办信息，仅当 type=interview 时返回 */
  interview?: TodoCommon
}

export interface TodoCommon {
  /** 候选人 ID */
  talent_id?: string
  /** 职位 ID */
  job_id?: string
  /** 投递 ID */
  application_id?: string
  /** ID */
  id?: string
}

export interface TradeDetail {
  /** 账户ID */
  account_id: string
  /** 时间段内该账户在积分商城的实际充值金额 */
  total_recharge_reward_info?: BonusAmount
}

export interface TrainEntity {
  /** 识别的字段种类 */
  type?: 'start_station' | 'end_station' | 'train_num' | 'name' | 'seat_num' | 'ticket_num' | 'total_amount' | 'time' | 'price' | 'seat_num' | 'seat_cls' | 'id_num' | 'sale_num' | 'sale_station'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface TrainInvoice {
  /** 识别出的实体列表 */
  entities?: TrainEntity[]
}

export interface TranferEmploymentInfo {
  /** 转正式员工日期 */
  regular_employee_start_date?: string
  /** 司龄起算日期 */
  seniority_date?: string
  /** 员工编号 */
  employee_number?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface TransferInfo {
  /** 原部门 */
  original_department?: string
  /** 新部门 */
  target_department?: string
  /** 新部门，新建部门审批完成前会返回 td_xxx 的临时 ID */
  target_draft_department?: string
  /** 原部门全路径 */
  original_department_id_path?: OrgdraftDepartmentId[]
  /** 新部门全路径 */
  target_department_id_path?: OrgdraftDepartmentId[]
  /** 原直属上级 */
  original_direct_manager?: string
  /** 新直属上级 */
  target_direct_manager?: string
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
  /** 原成本中心分摊方式 */
  original_cost_center_rate?: JobDataCostCenter[]
  /** 新成本中心分摊方式 */
  target_cost_center_rate?: JobDataCostCenter[]
  /** 原职等 */
  original_job_grade?: string
  /** 新职等 */
  target_job_grade?: string
  /** 原岗位 */
  original_position?: string
  /** 新岗位 */
  target_position?: string
  /** 新岗位，新建岗位审批完成前会返回 td_xxx 的临时 ID */
  target_draft_position?: string
  /** 编制随人员一起调整 */
  is_transfer_with_workforce?: boolean
}

export interface TransferReason {
  /** 异动原因唯一标识 */
  transfer_reason_unique_identifier?: string
  /** 内容 */
  name?: I18n[]
  /** active */
  active?: boolean
  /** 上级异动原因唯一标识 */
  parent_transfer_reason_unique_identifier?: string
  /** 创建时间 */
  created_time?: string
  /** 更新时间 */
  updated_time?: string
}

export interface TransferType {
  /** 异动类型唯一标识 */
  transfer_type_unique_identifier?: string
  /** 异动类型名称 */
  name?: I18n[]
  /** 异动类型状态 */
  active?: boolean
  /** 关联流程唯一标识符 */
  flow_id?: string
  /** 关联流程名称 */
  flow_name?: I18n[]
  /** 创建时间 */
  created_time?: string
  /** 更新时间 */
  updated_time?: string
}

export interface TripartiteAgreementInfo {
  /** 三方协议 ID */
  id?: string
  /** 投递ID */
  application_id?: string
  /** 三方协议状态 */
  state?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  /** 三方协议创建时间，毫秒时间戳 */
  create_time?: string
  /** 三方协议修改时间，毫秒时间戳 */
  modify_time?: string
}

export interface TrusteeshipInstanceCacheConfig {
  /** 托管预缓存策略 */
  form_policy?: 'DISABLE' | 'IMMUTABLE' | 'BY_NODE' | 'BY_USER'
  /** 表单是否随国际化改变 */
  form_vary_with_locale?: boolean
  /** 当前使用的表单版本号，保证表单改变后，版本号增加，实际值为int64整数 */
  form_version?: string
}

export interface TrusteeshipUrls {
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

export interface TwMainlandTravelPermit {
  /** 识别出的实体类型 */
  entities?: TwMainlandTravelPermitEntity[]
}

export interface TwMainlandTravelPermitEntity {
  /** 识别的字段种类 */
  type?: 'full_name_cn' | 'full_name_en' | 'date_of_birth' | 'date_of_expiry' | 'card_number'
  /** 识别出字段的文本信息 */
  value?: string
}

export type Undefined = unknown

export type UndefinedElement = unknown

export interface Unit {
  /** 单位的自定义ID */
  unit_id: string
  /** 单位的名字 */
  name: string
  /** 单位的类型 */
  unit_type: string
}

export interface UnitDepartment {
  /** 单位ID */
  unit_id: string
  /** 部门ID */
  department_id: string
}

export interface UnmergeTableCellsRequest {
  /** table 行索引 */
  row_index: number
  /** table 列索引 */
  column_index: number
}

export interface UpdateBlockRequest {
  /** 更新文本元素请求 */
  update_text_elements?: UpdateTextElementsRequest
  /** 更新文本样式请求 */
  update_text_style?: UpdateTextStyleRequest
  /** 更新表格属性请求 */
  update_table_property?: UpdateTablePropertyRequest
  /** 表格插入新行请求 */
  insert_table_row?: InsertTableRowRequest
  /** 表格插入新列请求 */
  insert_table_column?: InsertTableColumnRequest
  /** 表格批量删除行请求 */
  delete_table_rows?: DeleteTableRowsRequest
  /** 表格批量删除列请求 */
  delete_table_columns?: DeleteTableColumnsRequest
  /** 表格合并单元格请求 */
  merge_table_cells?: MergeTableCellsRequest
  /** 表格取消单元格合并状态请求 */
  unmerge_table_cells?: UnmergeTableCellsRequest
  /** 分栏插入新的分栏列请求 */
  insert_grid_column?: InsertGridColumnRequest
  /** 分栏删除列请求 */
  delete_grid_column?: DeleteGridColumnRequest
  /** 更新分栏列宽比例请求 */
  update_grid_column_width_ratio?: UpdateGridColumnWidthRatioRequest
  /** 替换图片请求 */
  replace_image?: ReplaceImageRequest
  /** 替换附件请求 */
  replace_file?: ReplaceFileRequest
  /** Block 唯一标识 */
  block_id?: string
  /** 更新文本元素及样式请求 */
  update_text?: UpdateTextRequest
  /** 更新任务 Block 请求 */
  update_task?: UpdateTaskRequest
}

export interface UpdateDepartment {
  /** 自定义部门ID */
  custom_department_id?: string
  /** i18n文本 */
  name?: I18nText
  /** 父部门ID */
  parent_department_id?: string
  /** 部门负责人 */
  leaders?: DepartmentLeader[]
  /** 在上级部门下的排序权重 */
  order_weight?: string
  /** 是否启用 */
  enabled_status?: boolean
  /** 自定义字段 */
  custom_field_values?: CustomFieldValue[]
}

export interface UpdateEmployee {
  /** 姓名 */
  name?: UpsertName
  /** 员工的联系手机号 */
  mobile?: string
  /** 用户的user_id */
  custom_employee_id?: string
  /** 头像的文件key */
  avatar_key?: string
  /** 员工的联系邮箱 */
  email?: string
  /** 员工的企业邮箱 */
  enterprise_email?: string
  /** 性别 */
  gender?: GenderDirectory
  /** 部门排序 */
  employee_order_in_departments?: UpsertUserDepartmentSortInfo[]
  /** 背景图的key */
  background_image_key?: string
  /** 员工的个性签名 */
  description?: string
  /** 员工直属上级的user_id */
  leader_id?: string
  /** 员工虚线上级的user_id */
  dotted_line_leader_ids?: string[]
  /** 工作地国家/地区 */
  work_country_or_region?: string
  /** 工作地点 */
  work_place_id?: string
  /** i18n文本 */
  work_station?: I18nText
  /** 工号 */
  job_number?: string
  /** 分机号 */
  extension_number?: string
  /** 入职日期 */
  join_date?: string
  /** 员工类型 */
  employment_type?: EmployeeTypeDirectory
  /** 职务ID */
  job_title_id?: string
  /** 职级ID */
  job_level_id?: string
  /** 序列ID */
  job_family_id?: string
  /** 离职日期 */
  resign_date?: string
  /** 离职原因 */
  resign_reason?: ResignReasonDirectory
  /** 离职备注信息 */
  resign_remark?: string
  /** 离职类型 */
  resign_type?: ResignTypeDirectory
  /** 暂停 true， false 恢复暂停 */
  is_frozen?: boolean
  /** 自定义字段 */
  custom_field_values?: CustomFieldValue[]
}

export interface UpdateGridColumnWidthRatioRequest {
  /** 更新列宽比例时，需要传入所有列宽占比 */
  width_ratios: number[]
}

export interface UpdateTablePropertyRequest {
  /** 表格列宽 */
  column_width?: number
  /** 需要修改列宽的表格列的索引（修改表格列宽时必填） */
  column_index?: number
  /** 设置首行为标题行 */
  header_row?: boolean
  /** 设置首列为标题列 */
  header_column?: boolean
}

export interface UpdateTaskRequest {
  /** 任务 ID。该字段仅在首次更新 Task Block 时生效，更新成功后，后续请求中将忽略该字段。 */
  task_id?: string
  /** 折叠状态，字段为空时不更新折叠状态 */
  folded?: boolean
}

export interface UpdateTextElementsRequest {
  /** 更新的文本元素列表，单次更新中 reminder 上限 30 个，mention_doc 上限 50 个，mention_user 上限 100 个 */
  elements: TextElement[]
}

export interface UpdateTextRequest {
  /** 更新的文本元素列表，单次更新中 reminder 上限 30 个，mention_doc 上限 50 个，mention_user 上限 100 个 */
  elements: TextElement[]
  /** 更新的文本样式 */
  style: TextStyle
  /** 文本样式中应更新的字段，必须至少指定一个字段。例如，要调整 Block 对齐方式，请设置 fields 为 [1]。 */
  fields: (1 | 2 | 3 | 4 | 5 | 6 | 7)[]
}

export interface UpdateTextStyleRequest {
  style: TextStyle
  /** 应更新的字段，必须至少指定一个字段。例如，要调整 Block 对齐方式，请设置 fields 为 [1]。 */
  fields: (1 | 2 | 3 | 4 | 5 | 6 | 7)[]
}

export interface UpsertName {
  /** i18n文本 */
  name: I18nText
  /** 别名 */
  another_name?: string
}

export interface UpsertUserDepartmentSortInfo {
  /** 部门id */
  department_id?: string
  /** 用户在部门内的排序权重 */
  order_weight_in_deparment?: string
  /** 用户多个部门间的排序权重 */
  order_weight_among_deparments?: string
  /** 是否为用户的主部门（用户只能有一个主部门，且排序权重应最大，不填则默认使用排序第一的部门作为主部门) */
  is_main_department?: boolean
}

export interface UrlValue {
  /** i18n文本 */
  link_text: I18nText
  /** 移动端网页链接 */
  url: string
  /** 桌面端网页链接 */
  pcurl: string
}

export interface User {
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
  gender?: 0 | 1 | 2 | 3
  /** 头像的文件Key */
  avatar_key?: string
  /** 用户头像信息 */
  avatar?: AvatarInfo
  /** 用户状态 */
  status?: UserStatus
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
  orders?: UserOrder[]
  /** 自定义属性 */
  custom_attrs?: UserCustomAttr[]
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

export interface UserAllowedRemedy {
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

export interface UserApproval {
  /** 审批用户工号 */
  user_id: string
  /** 审批作用日期 */
  date: string
  /** 外出的信息 */
  outs?: UserOut[]
  /** 请假的信息 */
  leaves?: UserLeave[]
  /** 加班的信息 */
  overtime_works?: UserOvertimeWork[]
  /** 出差 */
  trips?: UserTrip[]
  /** 计算时间所用的时区信息，为空是0时区 */
  time_zone?: string
}

export interface UserBase {
  /** 用户 ID */
  user_id?: string
  /** 该用户所属部门 ID 列表 */
  department_ids?: string[]
}

export interface UserBusinessManagementScope {
  /** 实体 */
  entity?: EntityInfo
  /** 管理范围 */
  scope_rule?: PermissionScopeRule
}

export interface UserCalendar {
  /** 日历实体信息 */
  calendar?: Calendar
  /** 日历的创建者user ID */
  user_id?: string
}

export interface UserContactInfo {
  /** 用户id，值为user_id_type所指定的类型。如果查询的手机号、邮箱不存在，或者无权限查看对应的用户，则此项为空。 */
  user_id?: string
  /** 手机号 */
  mobile?: string
  /** 邮箱 */
  email?: string
  /** 用户状态 */
  status?: UserStatus
}

export interface UserCustomAttr {
  /** 自定义属性类型 */
  type?: string
  /** 自定义属性ID */
  id?: string
  /** 自定义属性取值 */
  value?: UserCustomAttrValue
}

export interface UserCustomAttrValue {
  /** 属性文本 */
  text?: string
  /** URL */
  url?: string
  /** PC上的URL */
  pc_url?: string
  /** 选项id，自定义选项和图片此项必填 */
  option_id?: string
  /** 用户信息 */
  generic_user?: CustomAttrGenericUser
}

export interface UserCustomizedField {
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

export interface UserDailyShift {
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
  /** 是否清空班次 (此字段优先于 shift_id，若为true ，shift_id 将失效) */
  is_clear_schedule?: boolean
}

export interface UserDepartmentInfo {
  /** 对应的部门ID */
  department_id: string
  /** 用户在部门内的排序 */
  user_order?: number
  /** 用户的部门间的排序 */
  department_order?: number
}

export interface UserDepartmentSortInfo {
  /** 部门id */
  department_id?: string
  /** 用户在部门内的排序权重 */
  order_weight_in_deparment?: string
  /** 用户多个部门间的排序权重 */
  order_weight_among_deparments?: string
}

export interface UserExternal {
  /** 用户类型 */
  user_type: 1 | 2 | 10 | 11
  /** 用户id */
  user_id?: string
  /** 用户名称 */
  user_name?: string
  /** 电话号码 */
  phone_num?: string
  /** 部门id */
  department_id?: string
}

export interface UserFlow {
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
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 打卡照片列表 */
  photo_urls?: string[]
  /** 打卡设备ID */
  device_id?: string
  /** 打卡结果 */
  check_result?: 'NoNeedCheck' | 'SystemCheck' | 'Normal' | 'Early' | 'Late' | 'SeriousLate' | 'Lack' | 'Invalid' | 'None' | 'Todo'
  /** 用户导入的外部打卡记录ID */
  external_id?: string
  /** 唯一幂等键 */
  idempotent_id?: string
}

export interface UserInfo {
  /** 个人邮箱还是公共邮箱 */
  type: string
  /** 卡片owner的ID，卡片owner为个人邮箱时非空 */
  owner_user_id?: string
  /** 公共邮箱唯一标识 */
  public_mailbox_id?: string
}

export interface UserLeave {
  /** 审批实例id */
  approval_id?: string
  /** 假期类型唯一ID，代表一种假期类型，长度小于14 */
  uniq_id?: string
  /** 假期时长单位。可用值：1：天；2：小时；3：半天；4：半小时。 */
  unit: 1 | 2 | 3 | 4
  /** 假期时长（单位秒） */
  interval: number
  /** 开始时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  start_time: string
  /** 结束时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  end_time: string
  /** 假期多语言展示，格式为map，key为["ch"、"en"、"ja"]，其中ch代表中文，en 代表英文、ja代表日文 */
  i18n_names: I18nNames
  /** 默认语言类型，由于飞书客户端支持中、英、日三种语言，如果用户切换语言时，假期名称没有对应语言的名称，会使用默认语言的名称 */
  default_locale: 'ch' | 'en' | 'ja'
  /** 请假理由 */
  reason: string
  /** 审批通过时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  approve_pass_time?: string
  /** 审批申请时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  approve_apply_time?: string
  /** 唯一幂等键 */
  idempotent_id?: string
}

export interface UserOpenAppFeedCardDeleter {
  /** 业务 ID */
  biz_id: string
  /** 用户 ID */
  user_id: string
}

export interface UserOpenAppFeedCardUpdater {
  /** 应用消息卡片 */
  app_feed_card: OpenAppFeedCard
  /** 用户 id */
  user_id: string
  /** 更新字段列表 */
  update_fields: ('1' | '2' | '3' | '10' | '11' | '12' | '13' | '101' | '102' | '103')[]
}

export interface UserOrder {
  /** 排序信息对应的部门ID */
  department_id?: string
  /** 用户在部门内的排序 */
  user_order?: number
  /** 用户的部门间的排序 */
  department_order?: number
  /** 是否为用户主部门 */
  is_primary_dept?: boolean
}

export interface UserOut {
  /** 审批实例id */
  approval_id?: string
  /** 外出类型唯一ID，代表一种假期类型，长度小于14 */
  uniq_id: string
  /** 外出时长单位。可用值：1：上半天；2：下半天；3：全天；4：小时。 */
  unit: 1 | 2 | 3 | 4
  /** 外出时长（单位秒） */
  interval: number
  /** 开始时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  start_time: string
  /** 结束时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  end_time: string
  /** 外出多语言展示，格式为map，key为["ch"、"en"、"ja"]，其中ch代表中文，en 代表英文、ja代表日文 */
  i18n_names: I18nNames
  /** 默认语言类型，由于飞书客户端支持中、英、日三种语言，如果用户切换语言时，假期名称没有对应语言的名称，会使用默认语言的名称 */
  default_locale: string
  /** 外出理由 */
  reason: string
  /** 审批通过时间 */
  approve_pass_time?: string
  /** 审批申请时间 */
  approve_apply_time?: string
  /** 唯一幂等键 */
  idempotent_id?: string
  /** 更正流程实例 ID */
  correct_process_id?: string[]
  /** 撤销流程实例 ID */
  cancel_process_id?: string[]
  /** 发起流程实例 ID */
  process_id?: string[]
}

export interface UserOvertimeWork {
  /** 审批实例id */
  approval_id?: string
  /** 加班时长 */
  duration: number
  /** 加班时长单位。可用值：1：天；2：小时。 */
  unit: 1 | 2 | 3 | 4
  /** 加班类型 */
  category: 1 | 2 | 3
  /** 加班规则类型 */
  type: 0 | 1 | 2 | 3
  /** 开始时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  start_time: string
  /** 结束时间，时间格式为 yyyy-MM-dd HH:mm:ss */
  end_time: string
  /** 加班事由 */
  reason?: string
  /** 唯一幂等键 */
  idempotent_id?: string
  /** 更正流程实例 ID */
  correct_process_id?: string[]
  /** 撤销流程实例 ID */
  cancel_process_id?: string[]
  /** 发起流程实例 ID */
  process_id?: string[]
}

export interface UserQueryFaqInfo {
  /** faq id */
  id?: string
  /** faq match score */
  score?: number
}

export interface UserRole {
  /** 用户 ID */
  user_id?: string
  /** 角色 ID */
  role_id?: string
  /** 修改时间 */
  modify_time?: string
  /** 角色名称 */
  role_name?: I18n
  /** 角色描述 */
  role_description?: I18n
  /** 业务管理范围 */
  business_management_scopes?: UserBusinessManagementScope[]
}

export interface UserSetting {
  /** 用户id */
  user_id: string
  /** 人脸Key */
  face_key: string
  /** 人脸照片更新时间 */
  face_key_update_time?: string
}

export interface UserStatsData {
  /** 用户姓名 */
  name: string
  /** 用户id */
  user_id: string
  /** 用户的统计数据 */
  datas?: UserStatsDataCell[]
}

export interface UserStatsDataCell {
  /** code */
  code: string
  /** value */
  value: string
  /** 属性 */
  features?: UserStatsDataFeature[]
  /** title */
  title?: string
  /** 时长 */
  duration_num?: UserStatsDataDuration
}

export interface UserStatsDataDuration {
  /** 天 */
  day?: string
  /** 半天 */
  half_day?: string
  /** 小时 */
  hour?: string
  /** 半小时 */
  half_hour?: string
  /** 分钟 */
  minute?: string
}

export interface UserStatsDataFeature {
  /** 统计数据列附加属性的名称 */
  key: string
  /** 统计数据列附加属性的值 */
  value: string
}

export interface UserStatsField {
  /** 视图类型 */
  stats_type: 'daily' | 'month'
  /** 用户id */
  user_id: string
  /** 字段名称 */
  fields: Field[]
}

export interface UserStatsView {
  /** 视图id */
  view_id: string
  /** 视图类型 */
  stats_type: 'daily' | 'month'
  /** 用户id */
  user_id: string
  /** 用户设置字段 */
  items?: Item[]
}

export interface UserStatus {
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

export interface UserTask {
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
  records: TaskResult[]
}

export interface UserTaskRemedy {
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
  status?: 0 | 1 | 2 | 3 | 4
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

export interface UserTmpDailyShift {
  /** 考勤组 ID */
  group_id: string
  /** 用户 ID */
  user_id: string
  /** 日期 */
  date: number
  /** 班次名称 */
  shift_name: string
  /** 打卡规则 */
  punch_time_simple_rules: PunchTimeSimpleRule[]
}

export interface UserTrip {
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
  /** 唯一幂等键 */
  idempotent_id?: string
  /** 更正流程实例 ID */
  correct_process_id?: string[]
  /** 撤销流程实例 ID */
  cancel_process_id?: string[]
  /** 发起流程实例 ID */
  process_id?: string[]
  /** 出发地（只有一个） */
  departure?: RegionPlace
  /** 目的地（可写多个） */
  destinations?: RegionPlace[]
  /** 交通工具（1 飞机，2 火车，3 汽车，4 高铁/动车，5 船，6 其他） */
  transportation?: number[]
  /** 出差类型(1:单程 2:往返) */
  trip_type?: number
  /** 出差备注 */
  remarks?: string
}

export interface UserValue {
  /** 人员ID */
  ids: string[]
  /** 人员类型 */
  user_type: CustomFieldValueUserType
}

export interface UserViewDetail {
  /** 用户ID */
  user_id?: string
  /** 用户的最近查看时间timestamp（ms级别） */
  view_time?: string
}

export interface Value {
  /** 字符串值 */
  string_value?: string
  /** 布尔值 */
  bool_value?: boolean
  /** 整形值 */
  int_value?: string
  /** 字符串列表值 */
  string_list_value?: string[]
  /** 整形列表值 */
  int_list_value?: string[]
}

export interface VatEntity {
  /** 识别的实体类型 */
  type?: 'invoice_name' | 'invoice_code' | 'invoice_no' | 'invoice_date' | 'total_price' | 'total_tax' | 'big_total_price_and_tax' | 'check_code' | 'total_price_and_tax' | 'buyer_name' | 'buyer_taxpayer_no' | 'buyer_address_phone' | 'buyer_account' | 'seller_name' | 'seller_taxpayer_no' | 'seller_address_phone' | 'seller_account' | 'payee' | 'invoice_date' | 'password_area' | 'remarks' | 'reviewer' | 'drawer' | 'is_sealed' | 'seller_name_in_seal' | 'seller_taxpayer_no_in_seal' | 'invoice_special_seal' | 'machine_num'
  /** 识别出字段的文本信息 */
  value?: string
  /** 识别出的票据详细信息 */
  items?: KvEntity[][]
}

export interface VatInvoice {
  /** 识别出的实体列表 */
  entities?: VatEntity[]
}

export interface Vchat {
  /** 视频会议类型 */
  vc_type?: 'vc' | 'third_party' | 'no_meeting' | 'lark_live' | 'unknown'
  /** 第三方视频会议icon类型 */
  icon_type?: 'vc' | 'live' | 'default'
  /** 第三方视频会议文案，可以为空，为空展示默认文案 */
  description?: string
  /** 视频会议URL */
  meeting_url?: string
  /** VC视频会议的会前设置 */
  meeting_settings?: MeetingSettings
}

export interface VehicleEntity {
  /** 识别的字段种类 */
  type?: 'plate_number' | 'vehicle_type' | 'owner' | 'address' | 'use_character' | 'model' | 'vin' | 'engine_number' | 'register_date' | 'issue_date' | 'license_issuing_authority' | 'document_id' | 'approved_passengers_capacity' | 'total_mass' | 'curb_weight' | 'ratified_load_capacity' | 'gabarite' | 'traction_mass' | 'remarks' | 'inspection_record'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface VehicleInvoice {
  /** 识别出的实体类型 */
  entities?: VehicleInvoiceEntity[]
}

export interface VehicleInvoiceEntity {
  /** 识别的字段种类 */
  type?: 'invoice_code' | 'invoice_num' | 'date' | 'print_code' | 'print_num' | 'machine_num' | 'buyer_name' | 'buyer_id' | 'vehicle_type' | 'product_model' | 'certificate_num' | 'engine_num' | 'vin' | 'total_price' | 'total_price_little' | 'saler_name' | 'saler_id' | 'saler_addr' | 'tax_rate' | 'tax' | 'price'
  /** 识别出字段的文本信息 */
  value?: string
}

export interface VehicleLicense {
  /** 识别出的实体类型 */
  entities?: VehicleEntity[]
}

export interface Verification {
  /** 企业主体名称 */
  name: string
  /** 企业是否完成认证； true 表示已经完成认证，false 表示未认证 */
  has_verification: boolean
}

export interface Version {
  /** 版本文档标题，最大长度 1024 个Unicode 码点。通常情况下，一个英文或中文字符对应一个码点，但是某些特殊符号可能会对应多个码点。例如，家庭组合「👨‍👩‍👧」这个表情符号对应5个码点。 */
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
  status?: '0' | '1' | '2'
  /** 版本文档类型 */
  obj_type?: 'docx' | 'sheet'
  /** 源文档类型 */
  parent_type?: 'docx' | 'sheet'
}

export interface View {
  /** 视图类型 */
  view_type?: 1 | 2 | 3
}

export interface WebApp {
  /** pc 端 url */
  pc_url?: string
  /** 移动端 url */
  mobile_url?: string
}

export interface Website {
  /** ID */
  id?: string
  /** 名称 */
  name?: I18n
  /** 流程类型，1-社招，2-校招 */
  process_type_list?: number[]
  /** 职位渠道ID */
  job_channel_id?: string
}

export interface WebsiteChannelInfo {
  /** 推广渠道 ID */
  id?: string
  /** 推广渠道名称 */
  name?: string
  /** 推广渠道链接 */
  link?: string
  /** 推广渠道推广码 */
  code?: string
}

export interface WebsiteDeliveryAttachmentIndentification {
  /** 身份证件类型 */
  identification_type?: 1 | 2 | 3 | 4 | 5 | 6 | 9
  /** 身份证件号 */
  identification_number?: string
}

export interface WebsiteDeliveryAward {
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
  /** 描述 */
  desc?: string
  /** 奖项名称 */
  title?: string
  /** 获奖时间 */
  award_time?: number
}

export interface WebsiteDeliveryBasicInfo {
  /** 国籍，可从「获取地址码」查询 */
  nationality_id?: string
  /** 起始工作时间 */
  start_work_time?: number
  /** 家庭住址 */
  current_home_address?: string
  /** 家乡，可从「获取地址码」查询 */
  hometown_city_code?: string
  /** 电话国际区号，可从「获取地址码」查询 */
  mobile_country_code?: string
  /** 身份证件 */
  identification?: WebsiteDeliveryIdentification
  /** 婚姻状况 */
  marital_status?: 1 | 2
  /** 电话 */
  mobile?: string
  /** 所在城市，可从「获取地址码」查询 */
  current_city_code?: string
  /** 工作年限 */
  experience_years?: number
  /** 性别 */
  gender?: 1 | 2 | 3
  /** 出生日期 */
  birthday?: number
  /** 姓名 */
  name: string
  /** 意向城市，可从「获取地址码」查询 */
  preferred_city_code_list?: string[]
  /** 简历来源，可从「获取简历来源列表」查询 */
  resume_source_id?: string
  /** 年龄 */
  age?: number
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
  /** 邮箱 */
  email?: string
}

export interface WebsiteDeliveryCareer {
  /** 描述 */
  desc?: string
  /** 结束时间, 如果是至今传值 -1 */
  end_time?: number
  /** 开始时间 */
  start_time?: number
  /** 职位名称 */
  title?: string
  /** 公司 */
  company?: string
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
}

export interface WebsiteDeliveryCustomizedData {
  /** 自定义字段 ID */
  object_id?: string
  /** 自定义字段 value，格式见接口说明 */
  value?: string
}

export interface WebsiteDeliveryCustomizedDataParent {
  /** 自定义字段 ID */
  object_id?: string
  /** 模块下的字段 */
  children?: WebsiteDeliveryCustomizedData[]
}

export interface WebsiteDeliveryDto {
  /** 投递 ID */
  application_id?: string
  /** ID */
  id?: string
  /** 职位 ID */
  job_id?: string
  /** 职位广告 ID */
  job_post_id?: string
  /** 官网简历 ID */
  portal_resume_id?: string
  /** 官网用户 ID */
  user_id?: string
  /** 人才 ID */
  talent_id?: string
}

export interface WebsiteDeliveryEducation {
  /** 学历类型 */
  education_type?: 1 | 2 | 3 | 4 | 5
  /** 结束时间 ,如果是「至今」传值 -1，传输「至今」，投递进入系统后可正常查看字段，但进入编辑态后需要修改为一个具体时间 */
  end_time?: number
  /** 结束时间-新，无「至今」传值。建议使用此字段，避免模糊的毕业时间影响候选人筛选 */
  end_time_v2?: number
  /** 专业 */
  field_of_study?: string
  /** 学校 */
  school?: string
  /** 开始时间 */
  start_time?: number
  /** 专业排名 */
  academic_ranking?: 5 | 10 | 20 | 30 | 50 | 51
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
  /** 学位 */
  degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
}

export interface WebsiteDeliveryIdentification {
  /** 身份证件号码 */
  identification_number?: string
  /** 身份证件类型 */
  identification_type?: 1 | 2 | 3 | 4 | 5 | 6 | 9
}

export interface WebsiteDeliveryInternship {
  /** 描述 */
  desc?: string
  /** 结束时间, 如果是至今传值 -1 */
  end_time?: number
  /** 开始时间 */
  start_time?: number
  /** 职位名称 */
  title?: string
  /** 公司 */
  company?: string
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
}

export interface WebsiteDeliveryLanguage {
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
  /** 语言 */
  language?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25
  /** 熟悉程度 */
  proficiency?: 1 | 2 | 3 | 4 | 5
}

export interface WebsiteDeliveryProject {
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
  /** 描述 */
  desc?: string
  /** 结束时间, 如果是至今传值-1 */
  end_time?: number
  /** 项目链接 */
  link?: string
  /** 项目名称 */
  name?: string
  /** 角色 */
  role?: string
  /** 开始时间 */
  start_time?: number
}

export interface WebsiteDeliveryResume {
  /** 实习经历 */
  internship_list?: WebsiteDeliveryInternship[]
  /** 基本信息 */
  basic_info: WebsiteDeliveryBasicInfo
  /** 教育经历 */
  education_list?: WebsiteDeliveryEducation[]
  /** 自我评价 */
  self_evaluation?: WebsiteDeliverySelfEvaluation
  /** 工作经历 */
  career_list?: WebsiteDeliveryCareer[]
  /** 自定义模块 */
  customized_data?: WebsiteDeliveryCustomizedDataParent[]
  /** 简历附件ID，使用「创建附件」生成 */
  resume_attachment_id?: string
  /** 社交账号 */
  sns_list?: WebsiteDeliverySns[]
  /** 作品 */
  works_list?: WebsiteDeliveryWorks[]
  /** 获奖记录 */
  award_list?: WebsiteDeliveryAward[]
  /** 项目经历 */
  project_list?: WebsiteDeliveryProject[]
  /** 语言能力 */
  language_list?: WebsiteDeliveryLanguage[]
}

export interface WebsiteDeliverySelfEvaluation {
  /** 内容 */
  content?: string
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
}

export interface WebsiteDeliverySns {
  /** 社交账号类型 */
  sns_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
  /** 链接 */
  link?: string
}

export interface WebsiteDeliveryWorks {
  /** 作品描述 */
  desc?: string
  /** 作品链接 */
  link?: string
  /** 附件 */
  attachment?: WebsiteDeliveryWorksAttachment
  /** 自定义字段 */
  customized_data?: WebsiteDeliveryCustomizedData[]
}

export interface WebsiteDeliveryWorksAttachment {
  /** 文件ID，使用「创建附件」生成 */
  file_id?: string
}

export interface WebsiteJobPost {
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
  job_active_status?: 1 | 2
  /** 职位流程类型 */
  job_process_type?: 1 | 2
  /** 职位雇佣类型 */
  job_recruitment_type?: IdNameObject
  /** 职位部门 */
  job_department?: IdNameObject
  /** 职位类型 */
  job_type?: IdNameObject
  /** 最低职级 */
  min_job_level?: IdNameObject
  /** 最高职级 */
  max_job_level?: IdNameObject
  /** 职位地址 */
  address?: CommonAddress
  /** 月薪范围-最低薪资 */
  min_salary?: string
  /** 月薪范围-最高薪资 */
  max_salary?: string
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 经验 */
  experience?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** 数量 */
  headcount?: number
  /** 职位亮点 */
  high_light_list?: IdNameObject[]
  /** 职位描述 */
  description?: string
  /** 职位要求 */
  requirement?: string
  /** 创建人 */
  creator?: IdNameObject
  /** 创建时间 */
  create_time?: string
  /** 修改时间 */
  modify_time?: string
  /** 自定义字段 */
  customized_data_list?: WebsiteJobPostCustomizedData[]
  /** 职位广告地址列表 */
  address_list?: CommonAddress[]
  /** 职级序列 */
  job_sequence_info?: IdNameObject
  /** 币种，可参考招聘「枚举常量介绍」 */
  currency?: number
  /** 目标专业 */
  target_major_list?: IdNameObject[]
}

export interface WebsiteJobPostCustomizedData {
  /** 自定义字段 ID */
  object_id?: string
  /** 字段名称 */
  name?: I18n
  /** 字段类型 */
  object_type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /** 自定义字段值 */
  value?: WebsiteJobPostCustomizedValue
}

export interface WebsiteJobPostCustomizedOption {
  /** 选项 ID */
  key?: string
  /** 选项名称 */
  name?: I18n
}

export interface WebsiteJobPostCustomizedTimeRange {
  /** 开始时间 */
  start_time?: string
  /** 结束时间 */
  end_time?: string
}

export interface WebsiteJobPostCustomizedValue {
  /** 当字段类型为单行文本、多行文本、模块、默认字段时，从此字段取值 */
  content?: string
  /** 当字段类型为单选时，从此字段取值 */
  option?: WebsiteJobPostCustomizedOption
  /** 当字段类型为多选时，从此字段取值 */
  option_list?: WebsiteJobPostCustomizedOption[]
  /** 当字段类型为时间段时，从此字段取值 */
  time_range?: WebsiteJobPostCustomizedTimeRange
  /** 当字段类型为日期选择、月份选择、年份选择时，从此字段取值，该字段是毫秒级时间戳 */
  time?: string
  /** 当字段类型为数字时，从此字段取值 */
  number?: string
}

export interface WebsiteUser {
  /** 用户 ID */
  user_id?: string
  /** 姓名 */
  name?: string
  /** 邮箱 */
  email?: string
  /** 外部用户 ID */
  external_id: string
  /** 电话，请和区号对应的国家码一并提供 */
  mobile?: string
  /** 国家码，请和电话一并提供，可从「获取地址码」查询 */
  mobile_country_code?: string
}

export interface WeekdaySchedule {
  /** 开始时间, format 00:00 - 23:59 */
  start_time?: string
  /** 结束时间, format 00:00 - 23:59 */
  end_time?: string
  /** 星期几, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 7 - Sunday, 9 - Everday, 10 - Weekday, 11 - Weekend */
  weekday?: number
}

export interface WhiteboardNode {
  /** 节点 id */
  id: string
  /** 节点图形类型，目前创建节点仅支持创建图片、文本、基础图形等类型，读取到不支持创建的图形时只返回一些基础信息，如 id、type、text、style 等 */
  type: 'image' | 'text_shape' | 'group' | 'composite_shape' | 'svg' | 'connector' | 'table' | 'life_line' | 'activation' | 'section' | 'table_uml' | 'table_er' | 'sticky_note' | 'mind_map' | 'paint'
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
  text?: Text
  /** 图形样式 */
  style?: Style
  /** 图片 */
  image?: Image
  /** 基础图形属性 */
  composite_shape?: CompositeShape
  /** 连线属性 */
  connector?: Connector
  /** 分区属性 */
  section?: Section
  /** 表格属性 */
  table?: Table
  /** 思维导图属性 */
  mind_map?: MindMap
}

export interface WikiCatalog {
  /** 知识库 token */
  wiki_token?: string
}

export interface WkCalendarDate {
  /** 工作日历WKID */
  calendar_id?: string
  /** 日期，格式："2006-01-02" */
  date?: string
  /** 日期类型 */
  date_type?: 'day_off' | 'public_holiday' | 'workday'
  /** 日期id */
  id?: string
}

export interface WkCalendarI18n {
  /** 中文值 */
  zh_cn?: string
  /** 英文值 */
  en_us?: string
}

export interface WkOption {
  /** 是否返回符合条件的工作日历总数 */
  count?: boolean
  /** 分页查询的位移，从0开始 */
  offset?: number
  /** 分页查询 单次查询数量 */
  limit: number
  /** 排序 */
  sort_options?: SortOption[]
}

export interface WorkCalendarDetail {
  /** 工作日历ID */
  calendar_id: string
  /** 工作日历名称 */
  calendar_name?: WkCalendarI18n
  /** 工作日历是否启用 */
  enable: boolean
}

export interface WorkCity {
  /** 工作城市ID */
  work_city_id?: string
  /** 工作城市名称。1-100字符，支持中、英文及符号 */
  name?: string
  /** 多语言工作城市 */
  i18n_name?: I18nContent[]
  /** 是否启用 */
  status?: boolean
}

export interface WorkExperience {
  company?: string
  department?: string
  job?: string
  start?: string
  end?: string
  description?: string
}

export interface WorkExperienceInfo {
  /** 公司 / 组织 */
  company_organization?: I18n[]
  /** 部门 */
  department?: I18n[]
  /** 岗位 */
  job?: I18n[]
  /** 工作描述 */
  description?: I18n[]
  /** 开始日期 */
  start_date?: string
  /** 结束日期 */
  end_date?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface WorkforcePlan {
  /** 编制规划方案 ID */
  workforce_plan_id: string
  /** 编制规划方案名称 */
  workforce_plan_name?: I18n[]
  /** 开始日期 */
  start_date?: string
  /** 结束日期 */
  end_date?: string
  /** 是否启用 */
  active?: boolean
}

export interface WorkforcePlanDetail {
  /** 编制规划明细 ID */
  workforce_plan_detail_id?: string
  /** 部门信息 */
  department?: DimensionInfo
  /** 人员类型信息 */
  employee_type?: DimensionInfo
  /** 工作地点信息 */
  work_location?: DimensionInfo
  /** 序列信息 */
  job_family?: DimensionInfo
  /** 职级信息 */
  job_level?: DimensionInfo
  /** 职务信息 */
  job?: DimensionInfo
  /** 成本中心信息 */
  cost_center?: DimensionInfo
  /** 编制规划值 */
  workforce_plan?: string
  /** 预估在职人数明细 */
  estimated_active_individuals_detail?: WorkforcePlanEaiDetail[]
}

export interface WorkforcePlanDetailRow {
  /** 维度信息 */
  dimensions: DimensionEntity[]
  /** 预估在职人数 */
  eai_details?: WorkforcePlanEaiDetail[]
  /** 编制规划值 */
  plan_value?: string
}

export interface WorkforcePlanDetailV2 {
  /** 编制规划明细 ID */
  workforce_plan_detail_id?: string
  /** 维度信息 */
  dimension_info_datas?: DimensionInfoData[]
  /** 编制规划值 */
  workforce_plan?: string
  /** 在职人数 */
  active_individuals?: string
  /** 预增员数量 */
  individuals_to_be_added?: string
  /** 预减员数量 */
  individuals_to_be_removed?: string
  /** 预估在职人数明细 */
  estimated_active_individuals_details?: WorkforcePlanEaiDetail[]
  /** 多周期的编制规划信息 */
  multi_period_values?: WorkforcePlanMultiPeriodValue[]
  /** 是否为缺维度的明细行，true为缺维度明细行，false为非缺维度明细行 */
  is_missing_dimension?: boolean
  /** 是否在职、预增/预减人员、编制数、预估在职人数都为0的明细行，true代表在职、预增/预减人员、编制数、预估在职人数都为0的明细行，false代表在职、预增/预减人员、编制数、预估在职人数不全为0的明细行 */
  is_all_zero_value?: boolean
}

export interface WorkforcePlanEaiDetail {
  /** 预估月份 */
  date?: string
  /** 预估在职人数 */
  estimated_active_individuals?: string
}

export interface WorkforcePlanMultiPeriodValue {
  /** 周期的最后一天 */
  period_date?: string
  /** 对应周期的编制规划值 */
  workforce_plan?: string
  /** 预增员数量 */
  individuals_to_be_added?: string
  /** 预减员数量 */
  individuals_to_be_removed?: string
}

export interface WorkingHoursType {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 编码 */
  code?: string
  /** 名称 */
  name: I18n[]
  /** 国家/地区 */
  country_region_id_list?: string[]
  /** 职务默认值 */
  default_for_job: boolean
  /** 启用 */
  active: boolean
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface WorkLocation {
  id?: number
  name?: string
}

export interface WorkplaceAccessData {
  /** 时间,精确到天,格式yyyy-MM-dd */
  date?: string
  /** 全部工作台的访问数据 */
  all_workplace?: AccessData
  /** 默认工作台的访问数据 */
  default_workplace?: AccessData
}

export interface WorkplaceWidget {
  /** 最低兼容 lark 版本号 */
  min_lark_version?: string
}

export interface WriteUserGroupScopeData {
  /** 写入成功员工user_id列表 */
  success_user_ids?: string[]
  /** 失败的员工信息列表 */
  fail_user_datas?: WriteUserGroupScopeFailUserData[]
}

export interface WriteUserGroupScopeFailUserData {
  /** 员工user_id */
  user_id?: string
  /** 失败原因枚举 */
  fail_code?: 1
}
