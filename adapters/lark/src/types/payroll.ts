import { AcctItem, CostAllocationPlan, CostAllocationReportData, Datasource, DatasourceRecord, DatasourceRecordFieldFilter, I18nContent, Paygroup, PaymentActivity, PaymentActivityDetail, PaymentDetail } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 查询发薪活动明细列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity_detail/list
     */
    listPayrollPaymentActivityDetail(query?: ListPayrollPaymentActivityDetailQuery): Promise<ListPayrollPaymentActivityDetailResponse>
    /**
     * 批量查询发薪明细
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_detail/query
     */
    queryPayrollPaymentDetail(body: QueryPayrollPaymentDetailRequest): Promise<QueryPayrollPaymentDetailResponse>
    /**
     * 封存发薪活动
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity/archive
     */
    archivePayrollPaymentActivity(body: ArchivePayrollPaymentActivityRequest): Promise<void>
    /**
     * 查询发薪活动列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity/list
     */
    listPayrollPaymentActivity(query?: ListPayrollPaymentActivityQuery): Paginated<PaymentActivity, 'payment_activitys'>
    /**
     * 创建 / 更新外部算薪数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource_record/save
     */
    savePayrollDatasourceRecord(body: SavePayrollDatasourceRecordRequest): Promise<SavePayrollDatasourceRecordResponse>
    /**
     * 批量查询外部算薪数据记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource_record/query
     */
    queryPayrollDatasourceRecord(body: QueryPayrollDatasourceRecordRequest, query?: Pagination): Paginated<DatasourceRecord, 'records'>
    /**
     * 获取外部数据源配置信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource/list
     */
    listPayrollDatasource(query?: Pagination): Paginated<Datasource, 'datasources'>
    /**
     * 批量查询算薪项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/acct_item/list
     */
    listPayrollAcctItem(query?: Pagination): Paginated<AcctItem>
    /**
     * 查询成本分摊报表汇总数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_report/list
     */
    listPayrollCostAllocationReport(query?: ListPayrollCostAllocationReportQuery): Promise<ListPayrollCostAllocationReportResponse>
    /**
     * 批量查询成本分摊方案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_plan/list
     */
    listPayrollCostAllocationPlan(query?: ListPayrollCostAllocationPlanQuery): Paginated<CostAllocationPlan>
    /**
     * 获取薪资组基本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list
     */
    listPayrollPaygroup(query?: Pagination): Paginated<Paygroup>
  }
}

export interface ListPayrollPaymentActivityDetailQuery {
  /** 页码，第一页从 1 开始 */
  page_index: number
  /** 每页大小，范围为：[1, 100] */
  page_size: number
  /** 发薪活动唯一标识 */
  activity_id: string
  /** 是否需要查询算薪明细的分段信息，如果不传该参数或传 false ，那么只返回发薪活动明细数据；如果该参数传了 true，那么同时返回发薪明细对应的算薪明细分段数据。 */
  include_segment_data?: boolean
  /** 算薪项 ID 列表。当前参数传空时，接口会返回发薪明细中所有的算薪项；当前参数不为空时，接口只返回发薪明细中与 acct_item_ids 存在交集的算薪项。 */
  acct_item_ids?: string[]
}

export interface ListPayrollPaymentActivityDetailResponse {
  /** 发薪明细列表 */
  payment_activity_details?: PaymentActivityDetail[]
  /** 发薪明细总数 */
  total?: number
}

export interface QueryPayrollPaymentDetailRequest {
  /** 页码，第一页从 1 开始 */
  page_index: number
  /** 每页大小，范围为：[1, 100] */
  page_size: number
  /** 算薪项 ID 列表。当前参数传空时，接口会返回发薪明细中所有的算薪项；当前参数不为空时，接口只返回发薪明细中与 acct_item_ids 存在交集的算薪项。 */
  acct_item_ids?: string[]
  /** 员工的飞书人事雇佣 ID 列表。 */
  employee_ids: string[]
  /** 发薪日开始时间，格式：YYYY-MM-dd，[pay_period_start_date, pay_period_end_date] 是一个左闭右闭区间。 */
  pay_period_start_date?: string
  /** 发薪日结束时间，格式：YYYY-MM-dd，[pay_period_start_date, pay_period_end_date] 是一个左闭右闭区间，pay_period_start_date 不得晚于 pay_period_end_date ，且 [pay_period_start_date, pay_period_end_date] 最大间隔为 12 个月。 */
  pay_period_end_date?: string
  /** 发薪活动 ID 列表 */
  activity_ids?: string[]
  /** 是否需要查询算薪明细的分段信息，如果不传该参数或传 false ，那么只返回发薪活动明细数据；如果该参数传了 true，那么同时返回发薪明细对应的算薪明细分段数据。 */
  include_segment_data?: boolean
}

export interface QueryPayrollPaymentDetailResponse {
  /** 发薪明细列表 */
  payment_details?: PaymentDetail[]
  /** 发薪明细总数 */
  total?: number
}

export interface ArchivePayrollPaymentActivityRequest {
  /** 发薪活动ID */
  activity_id: string
}

export interface ListPayrollPaymentActivityQuery extends Pagination {
  /** 发薪日开始时间，格式：YYYY-MM-dd，[pay_period_start_date, pay_period_end_date] 是一个左闭右闭区间。 */
  pay_period_start_date: string
  /** 发薪日结束时间，格式：YYYY-MM-dd，[pay_period_start_date, pay_period_end_date] 是一个左闭右闭区间。 */
  pay_period_end_date: string
  /** 发薪活动审批状态列表，其中：100-待确认发薪名单；150-待提交审批；200-审批中；300-审批被拒绝；350-审批被撤回；360-审批被撤销；375-审批通过；400-已封存。 */
  statuses?: number[]
}

export interface SavePayrollDatasourceRecordRequest {
  /** 数据源code */
  source_code: string
  /** 需保存的记录列表 */
  records: DatasourceRecord[]
}

export interface SavePayrollDatasourceRecordResponse {
  /** 更新的记录条数 */
  affect_counts: string
}

export interface QueryPayrollDatasourceRecordRequest {
  /** 数据源编码 */
  source_code: string
  /** 指定查询的数据源字段。如不传，默认返回所有数据源字段 */
  selected_fields?: string[]
  /** 查询过滤器列表，多个过滤器之间为And关系。本期员工月维度汇总类型数据源，只支持employment_id、payroll_period fieldKey的查询，其中payroll_period必传 */
  field_filters?: DatasourceRecordFieldFilter[]
}

export const enum ListPayrollCostAllocationReportQueryReportType {
  /** 默认 */
  Default = 0,
  /** 计提 */
  Accrued = 1,
  /** 实发 */
  Paid = 2,
}

export interface ListPayrollCostAllocationReportQuery extends Pagination {
  /** 成本分摊方案ID */
  cost_allocation_plan_id: string
  /** 期间 */
  pay_period: string
  /** 报表类型 */
  report_type: ListPayrollCostAllocationReportQueryReportType
}

export interface ListPayrollCostAllocationReportResponse {
  /** 期间 */
  pay_period?: string
  /** 下一页开始 */
  page_token?: string
  /** 是否还有更多数据 */
  has_more?: boolean
  /** 报表名称 */
  cost_allocation_report_names?: I18nContent[]
  /** 汇总数据 */
  cost_allocation_report_datas?: CostAllocationReportData[]
}

export interface ListPayrollCostAllocationPlanQuery extends Pagination {
  /** 期间 */
  pay_period: string
}

Internal.define({
  '/payroll/v1/payment_activity_details': {
    GET: 'listPayrollPaymentActivityDetail',
  },
  '/payroll/v1/payment_detail/query': {
    POST: 'queryPayrollPaymentDetail',
  },
  '/payroll/v1/payment_activitys/archive': {
    POST: 'archivePayrollPaymentActivity',
  },
  '/payroll/v1/payment_activitys': {
    GET: { name: 'listPayrollPaymentActivity', pagination: { argIndex: 0, itemsKey: 'payment_activitys' } },
  },
  '/payroll/v1/datasource_records/save': {
    POST: 'savePayrollDatasourceRecord',
  },
  '/payroll/v1/datasource_records/query': {
    POST: { name: 'queryPayrollDatasourceRecord', pagination: { argIndex: 1, itemsKey: 'records' } },
  },
  '/payroll/v1/datasources': {
    GET: { name: 'listPayrollDatasource', pagination: { argIndex: 0, itemsKey: 'datasources' } },
  },
  '/payroll/v1/acct_items': {
    GET: { name: 'listPayrollAcctItem', pagination: { argIndex: 0 } },
  },
  '/payroll/v1/cost_allocation_reports': {
    GET: 'listPayrollCostAllocationReport',
  },
  '/payroll/v1/cost_allocation_plans': {
    GET: { name: 'listPayrollCostAllocationPlan', pagination: { argIndex: 0 } },
  },
  '/payroll/v1/paygroups': {
    GET: { name: 'listPayrollPaygroup', pagination: { argIndex: 0 } },
  },
})
