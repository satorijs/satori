import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    performance: Performance.Methods
  }
}

export namespace Performance {
  export interface Methods {
    semester: Semester.Methods
    activity: Activity.Methods
    additionalInformation: AdditionalInformation.Methods
    additionalInformations: AdditionalInformations.Methods
    userGroupUserRel: UserGroupUserRel.Methods
    reviewee: Reviewee.Methods
    reviewTemplate: ReviewTemplate.Methods
    indicator: Indicator.Methods
    question: Question.Methods
    metricLib: MetricLib.Methods
    metricTemplate: MetricTemplate.Methods
    metricField: MetricField.Methods
    metricTag: MetricTag.Methods
    stageTask: StageTask.Methods
    metricDetail: MetricDetail.Methods
    reviewData: ReviewData.Methods
  }

  export namespace Semester {
    export interface Methods {
      /**
       * 获取周期列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/semester/list
       */
      list(query?: ListQuery): Promise<ListResponse>
    }

    export interface ListQuery {
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

    export interface ListResponse {
      /** 周期meta信息列表 */
      items?: Lark.Semester[]
    }
  }

  export namespace Activity {
    export interface Methods {
      /**
       * 获取项目列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/activity/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** 评估周期 ID 列表，获取指定评估周期的项目 ID，semester_id 可通过【获取周期】接口获得 */
      semester_ids?: string[]
      /** 项目 ID 列表，如果同时传了「semester_ids」，则优先以「activity_ids」进行查询 */
      activity_ids?: string[]
    }

    export interface QueryQuery {
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface QueryResponse {
      /** 绩效评估项目列表。 */
      activities?: Lark.Activity[]
    }
  }

  export namespace AdditionalInformation {
    export interface Methods {
      /**
       * 批量查询补充信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_information/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.AdditionalInformation, 'additional_informations'>
      /**
       * 批量导入补充信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_information/import
       */
      import(body: ImportRequest, query?: ImportQuery): Promise<ImportResponse>
    }

    export interface QueryRequest {
      /** 评估周期 ID 列表，semester_id 可通过【获取周期】接口获得 */
      semester_id: string
      /** 事项 ID 列表，获取指定事项 ID 的信息。以下请求参数中「item_ids」、「external_ids」、「reviewee_user_ids」均为空时，返回该评估周期的所有补充信息。若单次请求中多个请求参数有值，按照【item_ids > external_ids > reviewee_user_ids】的顺序只识别第一个有值的请求参数 */
      item_ids?: string[]
      /** 外部系统的事项 ID 列表，获取对应的飞书绩效事项 ID。「item_ids」参数有值时该参数不生效 */
      external_ids?: string[]
      /** 被评估人 ID 列表，获取周期下被评估人的事项信息。「item_ids」、「external_ids」参数有值时该参数不生效 */
      reviewee_user_ids?: string[]
    }

    export interface QueryQuery extends Pagination {
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface ImportRequest {
      /** 评估周期 ID 列表，semester_id 可通过【获取周期】接口获得 */
      semester_id: string
      /** 补充信息列表，一次最多 1000 个 */
      additional_informations?: Lark.AdditionalInformation[]
      /** 导入记录名称，管理员可在补充信息管理的导入记录中查看。不传则默认为 API 导入。 */
      import_record_name?: string
    }

    export interface ImportQuery {
      /** 根据 client_token 是否一致来判断是否为同一请求 */
      client_token: string
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface ImportResponse {
      /** 导入记录 ID */
      import_record_id?: string
      /** 成功导入后的补充信息列表 */
      additional_informations?: Lark.AdditionalInformation[]
    }
  }

  export namespace AdditionalInformations {
    export interface Methods {
      batch: Batch.Methods
    }

    export namespace Batch {
      export interface Methods {
        /**
         * 批量删除补充信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/additional_informations-batch/delete
         */
        delete(body: DeleteRequest, query?: DeleteQuery): Promise<DeleteResponse>
      }

      export interface DeleteRequest {
        /** 评估周期 ID 列表，semester_id 可通过【获取周期】接口获得 */
        semester_id: string
        /** 补充信息列表，一次最多 100 个 */
        additional_informations: string[]
      }

      export interface DeleteQuery {
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface DeleteResponse {
        /** 被删除的补充信息列表 */
        additional_informations?: string[]
      }
    }
  }

  export namespace UserGroupUserRel {
    export interface Methods {
      /**
       * 更新人员组成员
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/user_group_user_rel/write
       */
      write(body: WriteRequest, query?: WriteQuery): Promise<WriteResponse>
    }

    export const enum WriteRequestScopeVisibleSetting {
      /** 无限制 */
      NotLimit = 0,
      /** 后台管理员不可见 */
      BackendAdminNotVisible = 1,
    }

    export interface WriteRequest {
      /** 分组id key */
      group_id?: string
      /** 人员组查看人员名单可见性配置 */
      scope_visible_setting?: WriteRequestScopeVisibleSetting
      /** 人员列表 */
      user_ids?: string[]
    }

    export interface WriteQuery {
      /** 根据 client_token 是否一致来判断是否为同一请求 */
      client_token: string
      /** 用户ID类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface WriteResponse {
      /** 写入员工范围响应 */
      data?: Lark.WriteUserGroupScopeData
    }
  }

  export namespace Reviewee {
    export interface Methods {
      /**
       * 获取被评估人信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/reviewee/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** 周期 ID，1 次只允许查询 1 个周期，semester_id 可通过【获取周期】接口获得 */
      semester_id: string
      /** 用户 ID，类型需要与查询参数中的user_id_type保持一致。不传则默认返回该周期所有被评估人的信息。 */
      user_ids?: string[]
      /** 项目 ID 列表，查询指定的项目下的被评估人数据 */
      activity_ids?: string[]
    }

    export interface QueryQuery extends Pagination {
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface QueryResponse {
      /** 周期ID */
      semester_id?: string
      /** 被评估人列表 */
      reviewees?: Lark.Reviewee[]
      /** 是否还有更多项 */
      has_more?: boolean
      /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
      page_token?: string
    }
  }

  export namespace ReviewTemplate {
    export interface Methods {
      /**
       * 获取评估模板配置
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/review_template/query
       */
      query(body: QueryRequest, query?: Pagination): Paginated<Lark.ReviewTemplate, 'review_templates'>
    }

    export interface QueryRequest {
      /** 评估模板 ID 列表，获取指定评估模板的配置数据。如果不传则返回所有 */
      review_template_ids?: string[]
    }
  }

  export namespace Indicator {
    export interface Methods {
      /**
       * 获取评估项列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/indicator/query
       */
      query(body: QueryRequest, query?: Pagination): Paginated<Lark.Indicator, 'indicators'>
    }

    export interface QueryRequest {
      /** 评估项 ID 列表，获取指定评估项的配置数据 */
      indicator_ids?: string[]
    }
  }

  export namespace Question {
    export interface Methods {
      /**
       * 获取标签填写题配置
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/question/query
       */
      query(body: QueryRequest, query?: Pagination): Paginated<Lark.Question, 'tag_based_questions'>
    }

    export interface QueryRequest {
      /** 标签填写题 ID 列表，获取指定标签填写题的配置数据。如果不传则返回所有 */
      tag_based_question_ids?: string[]
    }
  }

  export namespace MetricLib {
    export interface Methods {
      /**
       * 获取指标列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_lib/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.MetricInLibrary>
    }

    export interface QueryRequest {
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

    export interface QueryQuery extends Pagination {
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace MetricTemplate {
    export interface Methods {
      /**
       * 获取指标模板列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_template/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.MetricTemplate>
    }

    export interface QueryRequest {
      /** 指标模板 ID 列表，metrics_template_id 可以通过指标模板的后台配置详情页的 url 获取，也可通过本接口的返回值获取。不填写则默认返回所有指标模板 */
      metrics_template_ids?: string[]
      /** 状态 */
      status?: 'to_be_configured' | 'to_be_activated' | 'enabled' | 'disabled'
    }

    export interface QueryQuery extends Pagination {
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace MetricField {
    export interface Methods {
      /**
       * 获取指标字段列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_field/query
       */
      query(body: QueryRequest): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** 指标的字段 ID，不传则默认获取全部字段信息 */
      field_ids?: string[]
    }

    export interface QueryResponse {
      /** 指标字段信息 */
      items?: Lark.MetricField[]
    }
  }

  export namespace MetricTag {
    export interface Methods {
      /**
       * 获取指标标签列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_tag/list
       */
      list(query?: ListQuery): Paginated<Lark.MetricTag>
    }

    export interface ListQuery extends Pagination {
      /** 指标标签 ID 列表 */
      tag_ids?: string[]
    }
  }

  export namespace StageTask {
    export interface Methods {
      /**
       * 获取周期任务（指定用户）
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_user_list
       */
      findByUserList(body: FindByUserListRequest, query?: FindByUserListQuery): Promise<FindByUserListResponse>
      /**
       * 获取周期任务（全部用户）
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v1/stage_task/find_by_page
       */
      findByPage(body: FindByPageRequest, query?: FindByPageQuery): Promise<FindByPageResponse>
    }

    export interface FindByUserListRequest {
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

    export interface FindByUserListQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface FindByUserListResponse {
      /** 周期基础信息 */
      base?: Lark.SemesterBaseInfo
      /** 周期环节信息列表 */
      items?: Lark.StageTask[]
    }

    export interface FindByPageRequest {
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

    export interface FindByPageQuery {
      /** 调用结果中用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface FindByPageResponse {
      /** 周期基础信息 */
      base?: Lark.SemesterBaseInfo
      /** 周期环节信息列表 */
      items?: Lark.StageTask[]
      /** 是否有下一页数据 */
      has_more?: boolean
      /** 下一页分页的token */
      page_token?: string
    }
  }

  export namespace MetricDetail {
    export interface Methods {
      /**
       * 获取被评估人关键指标结果
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_detail/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
      /**
       * 录入被评估人关键指标数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/metric_detail/import
       */
      import(body: ImportRequest, query?: ImportQuery): Promise<ImportResponse>
    }

    export interface QueryRequest {
      /** 周期 ID，1 次只允许查询 1 个周期，semester_id 可通过【获取周期】接口获得 */
      semester_id: string
      /** 被评估人 ID 列表。如果不传则返回该周期所有参与的被评估人的关键指标详情 */
      reviewee_user_ids: string[]
    }

    export interface QueryQuery {
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface QueryResponse {
      /** 周期ID */
      semester_id?: string
      /** 指标明细列表 */
      reviewee_metrics?: Lark.RevieweeMetric[]
    }

    export interface ImportRequest {
      /** 周期 ID，semester_id 可通过【获取周期】接口获得 */
      semester_id: string
      /** 录入记录名称，数据源录入人在录入记录页面可以查看该记录名称。如果不传则默认为「API 录入」 */
      import_record_name?: string
      /** 指标明细列表，一次最多50个 */
      imported_metrics: Lark.ImportedMetric[]
    }

    export interface ImportQuery {
      /** 根据 client_token 是否一致来判断是否为同一请求 */
      client_token: string
      /** 用户ID类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface ImportResponse {
      /** 成功时返回导入记录 ID，失败时则为 null */
      import_record_id?: string
    }
  }

  export namespace ReviewData {
    export interface Methods {
      /**
       * 获取绩效详情数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/performance-v2/review_data/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
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

    export interface QueryQuery {
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface QueryResponse {
      /** 评估数据列表 */
      datas?: Lark.ReviewProfile[]
    }
  }
}

Internal.define({
  '/performance/v1/semesters': {
    GET: 'performance.semester.list',
  },
  '/performance/v2/activity/query': {
    POST: 'performance.activity.query',
  },
  '/performance/v2/additional_informations/query': {
    POST: { name: 'performance.additionalInformation.query', pagination: { argIndex: 1, itemsKey: 'additional_informations' } },
  },
  '/performance/v2/additional_informations/import': {
    POST: 'performance.additionalInformation.import',
  },
  '/performance/v2/additional_informations/batch': {
    DELETE: 'performance.additionalInformations.batch.delete',
  },
  '/performance/v2/user_group_user_rels/write': {
    POST: 'performance.userGroupUserRel.write',
  },
  '/performance/v2/reviewees/query': {
    POST: 'performance.reviewee.query',
  },
  '/performance/v2/review_templates/query': {
    POST: { name: 'performance.reviewTemplate.query', pagination: { argIndex: 1, itemsKey: 'review_templates' } },
  },
  '/performance/v2/indicators/query': {
    POST: { name: 'performance.indicator.query', pagination: { argIndex: 1, itemsKey: 'indicators' } },
  },
  '/performance/v2/questions/query': {
    POST: { name: 'performance.question.query', pagination: { argIndex: 1, itemsKey: 'tag_based_questions' } },
  },
  '/performance/v2/metric_libs/query': {
    POST: { name: 'performance.metricLib.query', pagination: { argIndex: 1 } },
  },
  '/performance/v2/metric_templates/query': {
    POST: { name: 'performance.metricTemplate.query', pagination: { argIndex: 1 } },
  },
  '/performance/v2/metric_fields/query': {
    POST: 'performance.metricField.query',
  },
  '/performance/v2/metric_tags': {
    GET: { name: 'performance.metricTag.list', pagination: { argIndex: 0 } },
  },
  '/performance/v1/stage_tasks/find_by_user_list': {
    POST: 'performance.stageTask.findByUserList',
  },
  '/performance/v1/stage_tasks/find_by_page': {
    POST: 'performance.stageTask.findByPage',
  },
  '/performance/v2/metric_details/query': {
    POST: 'performance.metricDetail.query',
  },
  '/performance/v2/metric_details/import': {
    POST: 'performance.metricDetail.import',
  },
  '/performance/v2/review_datas/query': {
    POST: 'performance.reviewData.query',
  },
})
