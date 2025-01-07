import { Activity, AdditionalInformation, Field, ImportedMetric, Indicator, MetricField, MetricInLibrary, MetricTag, MetricTemplate, Question, Reviewee, RevieweeMetric, ReviewProfile, ReviewTemplate, Semester, SemesterBaseInfo, StageTask, Template, Unit, WriteUserGroupScopeData } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取周期列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/semester/list
     */
    listPerformanceV1Semester(query?: ListPerformanceV1SemesterQuery): Promise<ListPerformanceV1SemesterResponse>
    /**
     * 获取项目列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/activity/query
     */
    queryPerformanceV2Activity(body: QueryPerformanceV2ActivityRequest, query?: QueryPerformanceV2ActivityQuery): Promise<QueryPerformanceV2ActivityResponse>
    /**
     * 批量查询补充信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_information/query
     */
    queryPerformanceV2AdditionalInformation(body: QueryPerformanceV2AdditionalInformationRequest, query?: QueryPerformanceV2AdditionalInformationQuery): Paginated<AdditionalInformation, 'additional_informations'>
    /**
     * 批量导入补充信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_information/import
     */
    importPerformanceV2AdditionalInformation(body: ImportPerformanceV2AdditionalInformationRequest, query?: ImportPerformanceV2AdditionalInformationQuery): Promise<ImportPerformanceV2AdditionalInformationResponse>
    /**
     * 批量删除补充信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_informations-batch/delete
     */
    deletePerformanceV2AdditionalInformationsBatch(body: DeletePerformanceV2AdditionalInformationsBatchRequest, query?: DeletePerformanceV2AdditionalInformationsBatchQuery): Promise<DeletePerformanceV2AdditionalInformationsBatchResponse>
    /**
     * 更新人员组成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/user_group_user_rel/write
     */
    writePerformanceV2UserGroupUserRel(body: WritePerformanceV2UserGroupUserRelRequest, query?: WritePerformanceV2UserGroupUserRelQuery): Promise<WritePerformanceV2UserGroupUserRelResponse>
    /**
     * 获取被评估人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/reviewee/query
     */
    queryPerformanceV2Reviewee(body: QueryPerformanceV2RevieweeRequest, query?: QueryPerformanceV2RevieweeQuery): Promise<QueryPerformanceV2RevieweeResponse>
    /**
     * 获取评估模板配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/review_template/query
     */
    queryPerformanceV2ReviewTemplate(body: QueryPerformanceV2ReviewTemplateRequest, query?: Pagination): Paginated<ReviewTemplate, 'review_templates'>
    /**
     * 获取评估项列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/indicator/query
     */
    queryPerformanceV2Indicator(body: QueryPerformanceV2IndicatorRequest, query?: Pagination): Paginated<Indicator, 'indicators'>
    /**
     * 获取标签填写题配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/question/query
     */
    queryPerformanceV2Question(body: QueryPerformanceV2QuestionRequest, query?: Pagination): Paginated<Question, 'tag_based_questions'>
    /**
     * 获取指标列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_lib/query
     */
    queryPerformanceV2MetricLib(body: QueryPerformanceV2MetricLibRequest, query?: QueryPerformanceV2MetricLibQuery): Paginated<MetricInLibrary>
    /**
     * 获取指标模板列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_template/query
     */
    queryPerformanceV2MetricTemplate(body: QueryPerformanceV2MetricTemplateRequest, query?: QueryPerformanceV2MetricTemplateQuery): Paginated<MetricTemplate>
    /**
     * 获取指标字段列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_field/query
     */
    queryPerformanceV2MetricField(body: QueryPerformanceV2MetricFieldRequest): Promise<QueryPerformanceV2MetricFieldResponse>
    /**
     * 获取指标标签列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_tag/list
     */
    listPerformanceV2MetricTag(query?: ListPerformanceV2MetricTagQuery): Paginated<MetricTag>
    /**
     * 获取周期任务（指定用户）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_user_list
     */
    findByUserListPerformanceV1StageTask(body: FindByUserListPerformanceV1StageTaskRequest, query?: FindByUserListPerformanceV1StageTaskQuery): Promise<FindByUserListPerformanceV1StageTaskResponse>
    /**
     * 获取周期任务（全部用户）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_page
     */
    findByPagePerformanceV1StageTask(body: FindByPagePerformanceV1StageTaskRequest, query?: FindByPagePerformanceV1StageTaskQuery): Promise<FindByPagePerformanceV1StageTaskResponse>
    /**
     * 获取被评估人关键指标结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_detail/query
     */
    queryPerformanceV2MetricDetail(body: QueryPerformanceV2MetricDetailRequest, query?: QueryPerformanceV2MetricDetailQuery): Promise<QueryPerformanceV2MetricDetailResponse>
    /**
     * 录入被评估人关键指标数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_detail/import
     */
    importPerformanceV2MetricDetail(body: ImportPerformanceV2MetricDetailRequest, query?: ImportPerformanceV2MetricDetailQuery): Promise<ImportPerformanceV2MetricDetailResponse>
    /**
     * 获取绩效结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/review_data/query
     */
    queryPerformanceV1ReviewData(body: QueryPerformanceV1ReviewDataRequest, query?: QueryPerformanceV1ReviewDataQuery): Promise<QueryPerformanceV1ReviewDataResponse>
    /**
     * 获取绩效详情数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/review_data/query
     */
    queryPerformanceV2ReviewData(body: QueryPerformanceV2ReviewDataRequest, query?: QueryPerformanceV2ReviewDataQuery): Promise<QueryPerformanceV2ReviewDataResponse>
  }
}

export interface ListPerformanceV1SemesterQuery {
  /** 周期开始时间 */
  start_time?: string
  /** 周期结束时间 */
  end_time?: string
  /** 年份 */
  year?: number
  /** 周期类型分组 */
  type_group?: 'Annual' | 'Semi-annual' | 'Quarter' | 'Bimonth' | 'Month' | 'Non-standard'
  /** 周期类型 */
  type?: 'Annual' | 'H1' | 'H2' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'January-February' | 'March-April' | 'May-June' | 'July-August' | 'September-October' | 'November-December' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December' | 'Custom'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface QueryPerformanceV2ActivityRequest {
  /** 评估周期 ID 列表，获取指定评估周期的项目 ID，semester_id 可通过【获取周期】接口获得 */
  semester_ids?: string[]
  /** 项目 ID 列表，如果同时传了「semester_ids」，则优先以「activity_ids」进行查询 */
  activity_ids?: string[]
}

export interface QueryPerformanceV2ActivityQuery {
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface QueryPerformanceV2AdditionalInformationRequest {
  /** 评估周期 ID 列表，semester_id 可通过【获取周期】接口获得 */
  semester_id: string
  /** 事项 ID 列表，获取指定事项 ID 的信息。以下请求参数中「item_ids」、「external_ids」、「reviewee_user_ids」均为空时，返回该评估周期的所有补充信息。若单次请求中多个请求参数有值，按照【item_ids > external_ids > reviewee_user_ids】的顺序只识别第一个有值的请求参数 */
  item_ids?: string[]
  /** 外部系统的事项 ID 列表，获取对应的飞书绩效事项 ID。「item_ids」参数有值时该参数不生效 */
  external_ids?: string[]
  /** 被评估人 ID 列表，获取周期下被评估人的事项信息。「item_ids」、「external_ids」参数有值时该参数不生效 */
  reviewee_user_ids?: string[]
}

export interface QueryPerformanceV2AdditionalInformationQuery extends Pagination {
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ImportPerformanceV2AdditionalInformationRequest {
  /** 评估周期 ID 列表，semester_id 可通过【获取周期】接口获得 */
  semester_id: string
  /** 补充信息列表，一次最多 1000 个 */
  additional_informations?: AdditionalInformation[]
  /** 导入记录名称，管理员可在补充信息管理的导入记录中查看。不传则默认为 API 导入。 */
  import_record_name?: string
}

export interface ImportPerformanceV2AdditionalInformationQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token: string
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface DeletePerformanceV2AdditionalInformationsBatchRequest {
  /** 评估周期 ID 列表，semester_id 可通过【获取周期】接口获得 */
  semester_id: string
  /** 补充信息列表，一次最多 100 个 */
  additional_informations: string[]
}

export interface DeletePerformanceV2AdditionalInformationsBatchQuery {
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface WritePerformanceV2UserGroupUserRelRequest {
  /** 分组id key */
  group_id?: string
  /** 人员组查看人员名单可见性配置 */
  scope_visible_setting?: 0 | 1
  /** 人员列表 */
  user_ids?: string[]
}

export interface WritePerformanceV2UserGroupUserRelQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token: string
  /** 用户ID类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface QueryPerformanceV2RevieweeRequest {
  /** 周期 ID，1 次只允许查询 1 个周期，semester_id 可通过【获取周期】接口获得 */
  semester_id: string
  /** 用户 ID，类型需要与查询参数中的user_id_type保持一致。不传则默认返回该周期所有被评估人的信息。 */
  user_ids?: string[]
  /** 项目 ID 列表，查询指定的项目下的被评估人数据 */
  activity_ids?: string[]
}

export interface QueryPerformanceV2RevieweeQuery extends Pagination {
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface QueryPerformanceV2ReviewTemplateRequest {
  /** 评估模板 ID 列表，获取指定评估模板的配置数据。如果不传则返回所有 */
  review_template_ids?: string[]
}

export interface QueryPerformanceV2IndicatorRequest {
  /** 评估项 ID 列表，获取指定评估项的配置数据 */
  indicator_ids?: string[]
}

export interface QueryPerformanceV2QuestionRequest {
  /** 标签填写题 ID 列表，获取指定标签填写题的配置数据。如果不传则返回所有 */
  tag_based_question_ids?: string[]
}

export interface QueryPerformanceV2MetricLibRequest {
  /** 状态是否为启用 */
  is_active?: boolean
  /** 指标所属的标签 ID */
  tag_ids?: string[]
  /** 所属的指标类型 ID */
  type_ids?: string[]
  /** 可用范围 */
  range_of_availability?: 'admins_and_reviewees' | 'only_admins'
  /** 评分设置类型 */
  scoring_setting_type?: 'score_manually' | 'score_by_formula'
}

export interface QueryPerformanceV2MetricLibQuery extends Pagination {
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface QueryPerformanceV2MetricTemplateRequest {
  /** 指标模板 ID 列表，metrics_template_id 可以通过指标模板的后台配置详情页的 url 获取，也可通过本接口的返回值获取。不填写则默认返回所有指标模板 */
  metrics_template_ids?: string[]
  /** 状态 */
  status?: 'to_be_configured' | 'to_be_activated' | 'enabled' | 'disabled'
}

export interface QueryPerformanceV2MetricTemplateQuery extends Pagination {
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface QueryPerformanceV2MetricFieldRequest {
  /** 指标的字段 ID，不传则默认获取全部字段信息 */
  field_ids?: string[]
}

export interface ListPerformanceV2MetricTagQuery extends Pagination {
  /** 指标标签 ID 列表 */
  tag_ids?: string[]
}

export interface FindByUserListPerformanceV1StageTaskRequest {
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

export interface FindByUserListPerformanceV1StageTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface FindByPagePerformanceV1StageTaskRequest {
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

export interface FindByPagePerformanceV1StageTaskQuery {
  /** 调用结果中用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface QueryPerformanceV2MetricDetailRequest {
  /** 周期 ID，1 次只允许查询 1 个周期，semester_id 可通过【获取周期】接口获得 */
  semester_id: string
  /** 被评估人 ID 列表。如果不传则返回该周期所有参与的被评估人的关键指标详情 */
  reviewee_user_ids: string[]
}

export interface QueryPerformanceV2MetricDetailQuery {
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ImportPerformanceV2MetricDetailRequest {
  /** 周期 ID，semester_id 可通过【获取周期】接口获得 */
  semester_id: string
  /** 录入记录名称，数据源录入人在录入记录页面可以查看该记录名称。如果不传则默认为「API 录入」 */
  import_record_name?: string
  /** 指标明细列表，一次最多50个 */
  imported_metrics: ImportedMetric[]
}

export interface ImportPerformanceV2MetricDetailQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token: string
  /** 用户ID类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface QueryPerformanceV1ReviewDataRequest {
  /** 查询范围的开始日期，毫秒级时间戳，开始日期不能晚于截止日期 */
  start_time: string
  /** 查询范围的截止日期，毫秒级时间戳，截止日期不能早于开始日期 */
  end_time: string
  /** 评估环节类型，目前仅支持上级评估环节和结果沟通环节（不传默认包含所有的环节）**可选值有**：- `leader_review`：上级评估环节- `communication_and_open_result`：结果沟通环节 */
  stage_types: ('leader_review' | 'communication_and_open_result' | 'view_result')[]
  /** 评估环节状态（不传默认包含所有的状态）**可选值有**：- `0`：未开始，任务的开始时间未到达- `1`：待完成，任务的开始时间到达而截止时间未到达，且任务未完成- `2`：已截止，任务的截止时间已到达，且任务未完成- `3`：已完成，任务已完成 */
  stage_progress?: (0 | 1 | 2 | 3 | 4)[]
  /** 评估周期 ID 列表，semester_id 是一个评估周期的唯一标识，可以通过「我的评估」页面 url 获取，也可通过本接口的返回值获取 */
  semester_id_list?: string[]
  /** 被评估人 ID 列表 */
  reviewee_user_id_list: string[]
  /** 环节更新时间晚于，可筛选出在此时间之后，有内容提交的环节数据 */
  updated_later_than?: string
}

export interface QueryPerformanceV1ReviewDataQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface QueryPerformanceV2ReviewDataRequest {
  /** 评估周期 ID 列表，semester_id 可通过【获取周期】 */
  semester_ids: string[]
  /** 被评估人 ID 列表 */
  reviewee_user_ids: string[]
  /** 环节类型 */
  stage_types?: ('summarize_key_outputs' | 'review' | 'communication_and_open_result' | 'view_result' | 'reconsideration' | 'leader_review')[]
  /** 评估型环节的执行人角色，不传默认包含所有的执行人角色。当传入的环节类型中有评估型环节时，返回指定执行人角色的评估型环节数据 */
  review_stage_roles?: ('reviewee' | 'invited_reviewer' | 'solid_line_leader' | 'dotted_line_leader' | 'secondary_solid_line_leader' | 'direct_project_leader' | 'custom_review_role' | 'metric_reviewer')[]
  /** 环节 ID，如果同时传了环节 ID 和环节类型，优先返回环节 ID 对应的绩效数据 */
  stage_ids?: string[]
  /** 当要获取的绩效数据的环节类型包含终评环节时，可指定是否需要返回绩效终评数据的具体环节来源。不填则默认不返回 返回的来源枚举值为： 枚举值： review 产生终评结果的评估型环节 calibaration 校准环节 reconsideration 结果复议环节 */
  need_leader_review_data_source?: boolean
  /** 环节更新时间晚于，可筛选出在此时间之后，有内容提交的环节数据 */
  updated_later_than?: string
  /** 环节状态，不传默认包含所有状态。各类型的环节分别有以下环节状态：  绩效结果查看环节状态 可选值： 0：已开通，绩效结果已开通，未发起复议也无需确认结果 1：待确认，绩效结果已开通但被评估人还未确认结果，确认的截止时间还未到达 2：已截止，绩效结果已开通但被评估人还未确认结果，确认的截止时间已到达 3：已确认，绩效结果已开通，被评估人已确认结果 4：已复议，绩效结果已开通，且被评估人已发起  绩效结果复议环节状态 可选值： 1：待完成，任务未完成 2：已截止，任务的截止时间已到达，且任务未完成 3：已完成，任务已完成  除上述类型外的其他环节类型状态 可选值： 0：未开始，任务的开始时间未到达 1：待完成，任务的开始时间到达而截止时间未到达，且任务未完成 2：已截止，任务的截止时间已到达，且任务未完成 3：已完成，任务已完成 */
  stage_progresses?: number[]
}

export interface QueryPerformanceV2ReviewDataQuery {
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ListPerformanceV1SemesterResponse {
  /** 周期meta信息列表 */
  items?: Semester[]
}

export interface QueryPerformanceV2ActivityResponse {
  /** 绩效评估项目列表。 */
  activities?: Activity[]
}

export interface ImportPerformanceV2AdditionalInformationResponse {
  /** 导入记录 ID */
  import_record_id?: string
  /** 成功导入后的补充信息列表 */
  additional_informations?: AdditionalInformation[]
}

export interface DeletePerformanceV2AdditionalInformationsBatchResponse {
  /** 被删除的补充信息列表 */
  additional_informations?: string[]
}

export interface WritePerformanceV2UserGroupUserRelResponse {
  /** 写入员工范围响应 */
  data?: WriteUserGroupScopeData
}

export interface QueryPerformanceV2RevieweeResponse {
  /** 周期ID */
  semester_id?: string
  /** 被评估人列表 */
  reviewees?: Reviewee[]
  /** 是否还有更多项 */
  has_more?: boolean
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
}

export interface QueryPerformanceV2MetricFieldResponse {
  /** 指标字段信息 */
  items?: MetricField[]
}

export interface FindByUserListPerformanceV1StageTaskResponse {
  /** 周期基础信息 */
  base?: SemesterBaseInfo
  /** 周期环节信息列表 */
  items?: StageTask[]
}

export interface FindByPagePerformanceV1StageTaskResponse {
  /** 周期基础信息 */
  base?: SemesterBaseInfo
  /** 周期环节信息列表 */
  items?: StageTask[]
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的token */
  page_token?: string
}

export interface QueryPerformanceV2MetricDetailResponse {
  /** 周期ID */
  semester_id?: string
  /** 指标明细列表 */
  reviewee_metrics?: RevieweeMetric[]
}

export interface ImportPerformanceV2MetricDetailResponse {
  /** 成功时返回导入记录 ID，失败时则为 null */
  import_record_id?: string
}

export interface QueryPerformanceV1ReviewDataResponse {
  /** 绩效评估周期列表 */
  semesters?: Semester[]
  /** 绩效评估项目列表 */
  activities?: Activity[]
  /** 评估项列表 */
  indicators?: Indicator[]
  /** 评估模板列表 */
  templates?: Template[]
  /** 评估内容列表 */
  units?: Unit[]
  /** 填写项列表 */
  fields?: Field[]
  /** 评估数据列表 */
  datas?: ReviewProfile[]
}

export interface QueryPerformanceV2ReviewDataResponse {
  /** 评估数据列表 */
  datas?: ReviewProfile[]
}

Internal.define({
  '/performance/v1/semesters': {
    GET: 'listPerformanceV1Semester',
  },
  '/performance/v2/activity/query': {
    POST: 'queryPerformanceV2Activity',
  },
  '/performance/v2/additional_informations/query': {
    POST: { name: 'queryPerformanceV2AdditionalInformation', pagination: { argIndex: 1, itemsKey: 'additional_informations' } },
  },
  '/performance/v2/additional_informations/import': {
    POST: 'importPerformanceV2AdditionalInformation',
  },
  '/performance/v2/additional_informations/batch': {
    DELETE: 'deletePerformanceV2AdditionalInformationsBatch',
  },
  '/performance/v2/user_group_user_rels/write': {
    POST: 'writePerformanceV2UserGroupUserRel',
  },
  '/performance/v2/reviewees/query': {
    POST: 'queryPerformanceV2Reviewee',
  },
  '/performance/v2/review_templates/query': {
    POST: { name: 'queryPerformanceV2ReviewTemplate', pagination: { argIndex: 1, itemsKey: 'review_templates' } },
  },
  '/performance/v2/indicators/query': {
    POST: { name: 'queryPerformanceV2Indicator', pagination: { argIndex: 1, itemsKey: 'indicators' } },
  },
  '/performance/v2/questions/query': {
    POST: { name: 'queryPerformanceV2Question', pagination: { argIndex: 1, itemsKey: 'tag_based_questions' } },
  },
  '/performance/v2/metric_libs/query': {
    POST: { name: 'queryPerformanceV2MetricLib', pagination: { argIndex: 1 } },
  },
  '/performance/v2/metric_templates/query': {
    POST: { name: 'queryPerformanceV2MetricTemplate', pagination: { argIndex: 1 } },
  },
  '/performance/v2/metric_fields/query': {
    POST: 'queryPerformanceV2MetricField',
  },
  '/performance/v2/metric_tags': {
    GET: { name: 'listPerformanceV2MetricTag', pagination: { argIndex: 0 } },
  },
  '/performance/v1/stage_tasks/find_by_user_list': {
    POST: 'findByUserListPerformanceV1StageTask',
  },
  '/performance/v1/stage_tasks/find_by_page': {
    POST: 'findByPagePerformanceV1StageTask',
  },
  '/performance/v2/metric_details/query': {
    POST: 'queryPerformanceV2MetricDetail',
  },
  '/performance/v2/metric_details/import': {
    POST: 'importPerformanceV2MetricDetail',
  },
  '/performance/v1/review_datas/query': {
    POST: 'queryPerformanceV1ReviewData',
  },
  '/performance/v2/review_datas/query': {
    POST: 'queryPerformanceV2ReviewData',
  },
})
