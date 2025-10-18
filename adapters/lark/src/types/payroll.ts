import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    payroll: Payroll.Methods
  }
}

export namespace Payroll {
  export interface Methods {
    paymentActivityDetail: PaymentActivityDetail.Methods
    paymentDetail: PaymentDetail.Methods
    paymentActivity: PaymentActivity.Methods
    datasourceRecord: DatasourceRecord.Methods
    datasource: Datasource.Methods
    acctItem: AcctItem.Methods
    costAllocationReport: CostAllocationReport.Methods
    costAllocationPlan: CostAllocationPlan.Methods
    paygroup: Paygroup.Methods
  }

  export namespace PaymentActivityDetail {
    export interface Methods {
      /**
       * 查询发薪活动明细列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity_detail/list
       */
      list(query?: ListQuery): Promise<ListResponse>
    }

    export interface ListQuery {
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

    export interface ListResponse {
      /** 发薪明细列表 */
      payment_activity_details?: Lark.PaymentActivityDetail[]
      /** 发薪明细总数 */
      total?: number
    }
  }

  export namespace PaymentDetail {
    export interface Methods {
      /**
       * 批量查询发薪明细
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_detail/query
       */
      query(body: QueryRequest): Promise<QueryResponse>
    }

    export interface QueryRequest {
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

    export interface QueryResponse {
      /** 发薪明细列表 */
      payment_details?: Lark.PaymentDetail[]
      /** 发薪明细总数 */
      total?: number
    }
  }

  export namespace PaymentActivity {
    export interface Methods {
      /**
       * 封存发薪活动
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity/archive
       */
      archive(body: ArchiveRequest): Promise<void>
      /**
       * 查询发薪活动列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/payment_activity/list
       */
      list(query?: ListQuery): Paginated<Lark.PaymentActivity, 'payment_activitys'>
    }

    export interface ArchiveRequest {
      /** 发薪活动ID */
      activity_id: string
    }

    export interface ListQuery extends Pagination {
      /** 发薪日开始时间，格式：YYYY-MM-dd，[pay_period_start_date, pay_period_end_date] 是一个左闭右闭区间。 */
      pay_period_start_date: string
      /** 发薪日结束时间，格式：YYYY-MM-dd，[pay_period_start_date, pay_period_end_date] 是一个左闭右闭区间。 */
      pay_period_end_date: string
      /** 发薪活动审批状态列表，其中：100-待确认发薪名单；150-待提交审批；200-审批中；300-审批被拒绝；350-审批被撤回；360-审批被撤销；375-审批通过；400-已封存。 */
      statuses?: number[]
    }
  }

  export namespace DatasourceRecord {
    export interface Methods {
      /**
       * 创建 / 更新外部算薪数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource_record/save
       */
      save(body: SaveRequest): Promise<SaveResponse>
      /**
       * 批量查询外部算薪数据记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource_record/query
       */
      query(body: QueryRequest, query?: Pagination): Paginated<Lark.DatasourceRecord, 'records'>
    }

    export interface SaveRequest {
      /** 数据源code */
      source_code: string
      /** 需保存的记录列表 */
      records: Lark.DatasourceRecord[]
    }

    export interface SaveResponse {
      /** 更新的记录条数 */
      affect_counts: string
    }

    export interface QueryRequest {
      /** 数据源编码 */
      source_code: string
      /** 指定查询的数据源字段。如不传，默认返回所有数据源字段 */
      selected_fields?: string[]
      /** 查询过滤器列表，多个过滤器之间为And关系。本期员工月维度汇总类型数据源，只支持employment_id、payroll_period fieldKey的查询，其中payroll_period必传 */
      field_filters?: Lark.DatasourceRecordFieldFilter[]
    }
  }

  export namespace Datasource {
    export interface Methods {
      /**
       * 获取外部数据源配置信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/datasource/list
       */
      list(query?: Pagination): Paginated<Lark.Datasource, 'datasources'>
    }
  }

  export namespace AcctItem {
    export interface Methods {
      /**
       * 批量查询算薪项
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/acct_item/list
       */
      list(query?: Pagination): Paginated<Lark.AcctItem>
    }
  }

  export namespace CostAllocationReport {
    export interface Methods {
      /**
       * 查询成本分摊报表汇总数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_report/list
       */
      list(query?: ListQuery): Promise<ListResponse>
    }

    export const enum ListQueryReportType {
      /** 默认 */
      Default = 0,
      /** 计提 */
      Accrued = 1,
      /** 实发 */
      Paid = 2,
    }

    export interface ListQuery extends Pagination {
      /** 成本分摊方案ID */
      cost_allocation_plan_id: string
      /** 期间 */
      pay_period: string
      /** 报表类型 */
      report_type: ListQueryReportType
    }

    export interface ListResponse {
      /** 期间 */
      pay_period?: string
      /** 下一页开始 */
      page_token?: string
      /** 是否还有更多数据 */
      has_more?: boolean
      /** 报表名称 */
      cost_allocation_report_names?: Lark.I18nContent[]
      /** 汇总数据 */
      cost_allocation_report_datas?: Lark.CostAllocationReportData[]
    }
  }

  export namespace CostAllocationPlan {
    export interface Methods {
      /**
       * 批量查询成本分摊方案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_plan/list
       */
      list(query?: ListQuery): Paginated<Lark.CostAllocationPlan>
    }

    export interface ListQuery extends Pagination {
      /** 期间 */
      pay_period: string
    }
  }

  export namespace Paygroup {
    export interface Methods {
      /**
       * 获取薪资组基本信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list
       */
      list(query?: Pagination): Paginated<Lark.Paygroup>
    }
  }
}

Internal.define({
  '/payroll/v1/payment_activity_details': {
    GET: 'payroll.paymentActivityDetail.list',
  },
  '/payroll/v1/payment_detail/query': {
    POST: 'payroll.paymentDetail.query',
  },
  '/payroll/v1/payment_activitys/archive': {
    POST: 'payroll.paymentActivity.archive',
  },
  '/payroll/v1/payment_activitys': {
    GET: { name: 'payroll.paymentActivity.list', pagination: { argIndex: 0, itemsKey: 'payment_activitys' } },
  },
  '/payroll/v1/datasource_records/save': {
    POST: 'payroll.datasourceRecord.save',
  },
  '/payroll/v1/datasource_records/query': {
    POST: { name: 'payroll.datasourceRecord.query', pagination: { argIndex: 1, itemsKey: 'records' } },
  },
  '/payroll/v1/datasources': {
    GET: { name: 'payroll.datasource.list', pagination: { argIndex: 0, itemsKey: 'datasources' } },
  },
  '/payroll/v1/acct_items': {
    GET: { name: 'payroll.acctItem.list', pagination: { argIndex: 0 } },
  },
  '/payroll/v1/cost_allocation_reports': {
    GET: 'payroll.costAllocationReport.list',
  },
  '/payroll/v1/cost_allocation_plans': {
    GET: { name: 'payroll.costAllocationPlan.list', pagination: { argIndex: 0 } },
  },
  '/payroll/v1/paygroups': {
    GET: { name: 'payroll.paygroup.list', pagination: { argIndex: 0 } },
  },
})
