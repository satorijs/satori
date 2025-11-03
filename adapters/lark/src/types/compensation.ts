import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    compensation: Compensation.Methods
  }
}

export namespace Compensation {
  export interface Methods {
    archive: Archive.Methods
    item: Item.Methods
    indicator: Indicator.Methods
    itemCategory: ItemCategory.Methods
    plan: Plan.Methods
    changeReason: ChangeReason.Methods
    socialInsurance: SocialInsurance.Methods
    socialPlan: SocialPlan.Methods
    socialArchiveAdjustRecord: SocialArchiveAdjustRecord.Methods
    socialArchive: SocialArchive.Methods
    lumpSumPayment: LumpSumPayment.Methods
    recurringPayment: RecurringPayment.Methods
  }

  export namespace Archive {
    export interface Methods {
      /**
       * 创建薪资档案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 批量查询员工薪资档案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.ArchiveDetail>
    }

    export interface CreateRequest {
      /** 外部幂等id，表示操作的唯一标识，避免重复发起，格式为标准的UUIDV4, */
      unique_id: string
      /** 操作人ID，具体类型由入参中的 user_id_type 指定，选择应用身份鉴权时，该参数不能为空 */
      operator_id?: string
      /** 员工id，具体类型由入参中的 user_id_type 指定 */
      user_id: string
      /** 生效时间，日期格式 */
      effective_time: string
      /** 币种ID，获取来源https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-currency/search?appId=cli_a63f5fc01866100c */
      currency_id: string
      /** 薪资方案ID，获取来源：https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list */
      plan_id: string
      /** 薪资方案TID，获取来源：https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list */
      plan_tid: string
      /** 调薪原因ID，获取来源：https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/change_reason/list */
      change_reason_id: string
      /** 薪资项值集合 */
      item_value_lists: Lark.ArchiveItemValue[]
      /** 调薪说明 */
      description?: string
      /** 更正说明，当员工在当天存在调薪记录时，该字段即为更正调薪的说明 */
      edit_remark?: string
    }

    export interface CreateQuery {
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface CreateResponse {
      /** 定调薪任务创建的唯一ID */
      unique_id?: string
      /** 薪档案的TID */
      archive_tid?: string
    }

    export interface QueryRequest {
      /** 用户ID列表 */
      user_id_list: string[]
      /** 档案Tid列表 */
      tid_list?: string[]
      /** 生效开始时间 */
      effective_start_date?: string
      /** 生效结束时间 */
      effective_end_date?: string
    }

    export interface QueryQuery extends Pagination {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }
  }

  export namespace Item {
    export interface Methods {
      /**
       * 批量查询薪资项
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item/list
       */
      list(query?: ListQuery): Paginated<Lark.Item>
    }

    export interface ListQuery extends Pagination {
      /** 薪酬项类型（不传则认为查询所有类型薪酬项） */
      item_type?: 'salary' | 'bonus' | 'recurring_payment'
    }
  }

  export namespace Indicator {
    export interface Methods {
      /**
       * 批量查询薪资统计指标
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/indicator/list
       */
      list(query?: Pagination): Paginated<Lark.Indicator>
    }
  }

  export namespace ItemCategory {
    export interface Methods {
      /**
       * 批量获取薪资项分类信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item_category/list
       */
      list(query?: Pagination): Paginated<Lark.ItemCategory>
    }
  }

  export namespace Plan {
    export interface Methods {
      /**
       * 批量查询薪资方案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list
       */
      list(query?: Pagination): Paginated<Lark.PlanDetail>
    }
  }

  export namespace ChangeReason {
    export interface Methods {
      /**
       * 批量查询定调薪原因
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/change_reason/list
       */
      list(query?: Pagination): Paginated<Lark.ChangeReason>
    }
  }

  export namespace SocialInsurance {
    export interface Methods {
      /**
       * 获取险种配置列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/social_insurance/list
       */
      list(): Promise<ListResponse>
    }

    export interface ListResponse {
      /** 险种列表 */
      items?: Lark.SocialInsurance[]
    }
  }

  export namespace SocialPlan {
    export interface Methods {
      /**
       * 根据方案ID和生效日期批量查询参保方案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/social_plan/query
       */
      query(body: QueryRequest): Promise<QueryResponse>
      /**
       * 根据生效日期分页查询参保方案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/social_plan/list
       */
      list(query?: ListQuery): Paginated<Lark.SocialPlan, 'plans'>
    }

    export interface QueryRequest {
      /** 参保方案ID列表，最大200 */
      plan_ids: string[]
      /** 生效日期，查询在该日期生效的参保方案数据 */
      effective_date: string
    }

    export interface QueryResponse {
      /** 方案列表 */
      plans?: Lark.SocialPlan[]
    }

    export interface ListQuery extends Pagination {
      /** 生效日期，查询在该日期生效的参保方案数据 */
      effective_date: string
      /** 社保方案/公积金方案 */
      insurance_type?: 'social_insurance' | 'provident_fund'
    }
  }

  export namespace SocialArchiveAdjustRecord {
    export interface Methods {
      /**
       * 通过员工ID批量获取社保增减员记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/social_archive_adjust_record/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** lark_user_id列表，用户ID列表，获取方式可参考查询参数中的「user_id_type」字段。最大200个。 */
      user_id_list: string[]
      /** 增减员类型, increase: 增员; attrtion: 减员 */
      record_type: 'increase' | 'attrition'
    }

    export interface QueryQuery {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface QueryResponse {
      /** 待增/减员记录 */
      records?: Lark.SocialArchiveAdjustRecord[]
    }
  }

  export namespace SocialArchive {
    export interface Methods {
      /**
       * 批量获取员工参保档案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/social_archive/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** lark_user_id列表，用户ID列表，获取方式可参考查询参数中的「user_id_type」字段。最大200个。 */
      user_id_list: string[]
      /** 生效日志，查询在该日期生效的社保档案 */
      effective_date: string
    }

    export interface QueryQuery {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface QueryResponse {
      /** 参保档案列表 */
      archives: Lark.SocialArchive[]
    }
  }

  export namespace LumpSumPayment {
    export interface Methods {
      /**
       * 批量创建一次性支付记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/lump_sum_payment/batch_create
       */
      batchCreate(body: BatchCreateRequest, query?: BatchCreateQuery): Promise<BatchCreateResponse>
      /**
       * 批量更正一次性支付记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/lump_sum_payment/batch_update
       */
      batchUpdate(body: BatchUpdateRequest): Promise<BatchUpdateResponse>
      /**
       * 查询一次性支付授予记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/lump_sum_payment/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.LumpSumPayment, 'records'>
      /**
       * 查询一次性支付授予明细
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/lump_sum_payment/query_detail
       */
      queryDetail(body: QueryDetailRequest, query?: QueryDetailQuery): Paginated<Lark.LumpSumPaymentDetail, 'records'>
      /**
       * 批量删除一次性支付记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/lump_sum_payment/batch_remove
       */
      batchRemove(body: BatchRemoveRequest): Promise<BatchRemoveResponse>
    }

    export interface BatchCreateRequest {
      /** 要创建的一次性支付信息 */
      records?: Lark.LumpSumPaymentForCreate[]
    }

    export interface BatchCreateQuery {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchCreateResponse {
      /** 每条记录的操作结果。对于创建成功的记录，会返回创建后的一次性支付记录id */
      operate_results?: Lark.LumpSumPaymentOperateResult[]
    }

    export interface BatchUpdateRequest {
      /** 要更正的一次性支付记录列表 */
      records?: Lark.LumpSumPaymentForUpdate[]
    }

    export interface BatchUpdateResponse {
      /** 每条记录的操作结果 */
      operate_results?: Lark.LumpSumPaymentOperateResult[]
    }

    export interface QueryRequest {
      /** id属于 */
      ids?: string[]
      /** unique_id属于 */
      unique_ids?: string[]
      /** 员工id属于 */
      user_ids?: string[]
      /** 薪酬项id属于 */
      item_ids?: string[]
      /** 创建时间大于等于（东八区） */
      create_time_gte?: string
      /** 创建时间小于等于（东八区） */
      create_time_lte?: string
      /** 更新时间大于等于（东八区） */
      modify_time_gte?: string
      /** 更新时间小于等于（东八区） */
      modify_time_lte?: string
      /** 合同主体id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/company/list 接口进行查询） */
      company_ids?: string[]
      /** 任职公司id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/company/list 接口进行查询） */
      service_company_ids?: string[]
      /** 部门id属于（可通过 https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get 接口进行查询） */
      department_ids?: string[]
      /** 序列id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/job-management/job_family/list 接口进行查询） */
      job_family_ids?: string[]
      /** 职级id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/job-management/job_level/list 接口进行查询） */
      job_level_ids?: string[]
      /** 工作地点id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/location/list 接口进行查询） */
      work_location_ids?: string[]
      /** 员工类型id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/basic-infomation/employee_type/list 接口进行查询） */
      employee_type_ids?: string[]
      /** 入职日期大于等于 */
      onboard_date_gte?: string
      /** 入职日期小于等于 */
      onboard_date_lte?: string
      /** 离职日期大于等于 */
      offboard_date_gte?: string
      /** 离职日期小于等于 */
      offboard_date_lte?: string
    }

    export interface QueryQuery extends Pagination {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface QueryDetailRequest {
      /** id属于 */
      ids?: string[]
      /** 一次性支付记录id */
      record_ids?: string[]
      /** 一次性支付记录unique id */
      record_unique_ids?: string[]
      /** 发放方式 */
      issuance_ways?: ('with_salary' | 'with_cash' | 'with_physical_distribution' | 'with_year_end_bonus')[]
      /** 发放状态 */
      issuance_statuses?: ('to_be_issued' | 'not_issued')[]
      /** 员工id属于 */
      user_ids?: string[]
      /** 薪酬项id属于 */
      item_ids?: string[]
      /** 发放时间大于等于 */
      issuance_date_gte?: string
      /** 发放时间小于等于 */
      issuance_date_lte?: string
      /** 创建时间大于等于（东八区） */
      create_time_gte?: string
      /** 创建时间小于等于（东八区） */
      create_time_lte?: string
      /** 更新时间大于等于（东八区） */
      modify_time_gte?: string
      /** 更新时间小于等于（东八区） */
      modify_time_lte?: string
      /** 合同主体id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/company/list 接口进行查询） */
      company_ids?: string[]
      /** 任职公司id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/company/list 接口进行查询） */
      service_company_ids?: string[]
      /** 部门id属于（可通过 https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get 接口进行查询） */
      department_ids?: string[]
      /** 序列id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/job-management/job_family/list 接口进行查询） */
      job_family_ids?: string[]
      /** 职级id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/job-management/job_level/list 接口进行查询） */
      job_level_ids?: string[]
      /** 工作地点id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/location/list 接口进行查询） */
      work_location_ids?: string[]
      /** 员工类型id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/basic-infomation/employee_type/list 接口进行查询） */
      employee_type_ids?: string[]
      /** 入职日期大于等于 */
      onboard_date_gte?: string
      /** 入职日期小于等于 */
      onboard_date_lte?: string
      /** 离职日期大于等于 */
      offboard_date_gte?: string
      /** 离职日期小于等于 */
      offboard_date_lte?: string
    }

    export interface QueryDetailQuery extends Pagination {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchRemoveRequest {
      /** 要删除的一次性支付记录id */
      record_ids?: string[]
      /** 删除原因 */
      reason?: string
    }

    export interface BatchRemoveResponse {
      /** 每条记录的操作结果 */
      operate_results?: Lark.LumpSumPaymentOperateResult[]
    }
  }

  export namespace RecurringPayment {
    export interface Methods {
      /**
       * 查询经常性支付记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/recurring_payment/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.RecurringPayment, 'records'>
      /**
       * 批量更正经常性支付记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/recurring_payment/batch_update
       */
      batchUpdate(body: BatchUpdateRequest, query?: BatchUpdateQuery): Promise<BatchUpdateResponse>
      /**
       * 批量删除经常性支付记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/recurring_payment/batch_remove
       */
      batchRemove(body: BatchRemoveRequest): Promise<BatchRemoveResponse>
      /**
       * 批量创建经常性支付记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/recurring_payment/batch_create
       */
      batchCreate(body: BatchCreateRequest, query?: BatchCreateQuery): Promise<BatchCreateResponse>
    }

    export interface QueryRequest {
      /** id属于 */
      ids?: string[]
      /** unique_id属于 */
      unique_ids?: string[]
      /** 员工id属于 */
      user_ids?: string[]
      /** 薪酬项id属于 */
      item_ids?: string[]
      /** 发放开始日期大于等于 */
      start_date_gte?: string
      /** 发放开始日期小于等于 */
      start_date_lte?: string
      /** 发放结束日期大于等于 */
      end_date_gte?: string
      /** 发放结束日期小于等于 */
      end_date_lte?: string
      /** 创建时间大于等于（东八区） */
      create_time_gte?: string
      /** 创建时间小于等于（东八区） */
      create_time_lte?: string
      /** 更新时间大于等于（东八区） */
      modify_time_gte?: string
      /** 更新时间小于等于（东八区） */
      modify_time_lte?: string
      /** 合同主体id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/company/list 接口进行查询） */
      company_ids?: string[]
      /** 任职公司id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/company/list 接口进行查询） */
      service_company_ids?: string[]
      /** 部门id属于（可通过 https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get 接口进行查询） */
      department_ids?: string[]
      /** 序列id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/job-management/job_family/list 接口进行查询） */
      job_family_ids?: string[]
      /** 职级id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/job-management/job_level/list 接口进行查询） */
      job_level_ids?: string[]
      /** 工作地点id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/organization-management/location/list 接口进行查询） */
      work_location_ids?: string[]
      /** 员工类型id属于（可通过 https://open.larkoffice.com/document/server-docs/corehr-v1/basic-infomation/employee_type/list 接口进行查询） */
      employee_type_ids?: string[]
      /** 入职日期大于等于 */
      onboard_date_gte?: string
      /** 入职日期小于等于 */
      onboard_date_lte?: string
      /** 离职日期大于等于 */
      offboard_date_gte?: string
      /** 离职日期小于等于 */
      offboard_date_lte?: string
    }

    export interface QueryQuery extends Pagination {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchUpdateRequest {
      /** 需更正的经常性支付记录 */
      records?: Lark.RecurringPaymentForUpdate[]
    }

    export interface BatchUpdateQuery {
      /** 用户ID类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchUpdateResponse {
      /** 每条记录的操作结果 */
      operate_results?: Lark.RecurringPaymentOperateResult[]
    }

    export interface BatchRemoveRequest {
      /** 需要删除的记录ID */
      record_ids: string[]
      /** 原因 */
      reason?: string
    }

    export interface BatchRemoveResponse {
      /** 每条记录的操作结果 */
      operate_results?: Lark.RecurringPaymentOperateResult[]
    }

    export interface BatchCreateRequest {
      /** 要创建的经常性支付记录 */
      records?: Lark.RecurringPaymentForCreate[]
    }

    export interface BatchCreateQuery {
      /** 用户ID类型 */
      user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchCreateResponse {
      /** 每条记录的操作结果。对于创建成功的记录，会返回创建后的经常性支付记录id */
      operate_results?: Lark.RecurringPaymentOperateResult[]
    }
  }
}

Internal.define({
  '/compensation/v1/archives': {
    POST: 'compensation.archive.create',
  },
  '/compensation/v1/archives/query': {
    POST: { name: 'compensation.archive.query', pagination: { argIndex: 1 } },
  },
  '/compensation/v1/items': {
    GET: { name: 'compensation.item.list', pagination: { argIndex: 0 } },
  },
  '/compensation/v1/indicators': {
    GET: { name: 'compensation.indicator.list', pagination: { argIndex: 0 } },
  },
  '/compensation/v1/item_categories': {
    GET: { name: 'compensation.itemCategory.list', pagination: { argIndex: 0 } },
  },
  '/compensation/v1/plans': {
    GET: { name: 'compensation.plan.list', pagination: { argIndex: 0 } },
  },
  '/compensation/v1/change_reasons': {
    GET: { name: 'compensation.changeReason.list', pagination: { argIndex: 0 } },
  },
  '/compensation/v1/social_insurances': {
    GET: 'compensation.socialInsurance.list',
  },
  '/compensation/v1/social_plans/query': {
    POST: 'compensation.socialPlan.query',
  },
  '/compensation/v1/social_plans': {
    GET: { name: 'compensation.socialPlan.list', pagination: { argIndex: 0, itemsKey: 'plans' } },
  },
  '/compensation/v1/social_archive_adjust_record/query': {
    POST: 'compensation.socialArchiveAdjustRecord.query',
  },
  '/compensation/v1/social_archive/query': {
    POST: 'compensation.socialArchive.query',
  },
  '/compensation/v1/lump_sum_payment/batch_create': {
    POST: 'compensation.lumpSumPayment.batchCreate',
  },
  '/compensation/v1/lump_sum_payment/batch_update': {
    POST: 'compensation.lumpSumPayment.batchUpdate',
  },
  '/compensation/v1/lump_sum_payment/query': {
    POST: { name: 'compensation.lumpSumPayment.query', pagination: { argIndex: 1, itemsKey: 'records' } },
  },
  '/compensation/v1/lump_sum_payment/query_detail': {
    POST: { name: 'compensation.lumpSumPayment.queryDetail', pagination: { argIndex: 1, itemsKey: 'records' } },
  },
  '/compensation/v1/lump_sum_payment/batch_remove': {
    POST: 'compensation.lumpSumPayment.batchRemove',
  },
  '/compensation/v1/recurring_payment/query': {
    POST: { name: 'compensation.recurringPayment.query', pagination: { argIndex: 1, itemsKey: 'records' } },
  },
  '/compensation/v1/recurring_payment/batch_update': {
    POST: 'compensation.recurringPayment.batchUpdate',
  },
  '/compensation/v1/recurring_payment/batch_remove': {
    POST: 'compensation.recurringPayment.batchRemove',
  },
  '/compensation/v1/recurring_payment/batch_create': {
    POST: 'compensation.recurringPayment.batchCreate',
  },
})
