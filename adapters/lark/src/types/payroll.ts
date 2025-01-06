import { Internal } from '../internal'
import { AcctItem, CostAllocationPlan, CostAllocationReportData, I18nContent, Paygroup } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 批量查询算薪项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/acct_item/list
     */
    listPayrollAcctItem(query?: ListPayrollAcctItemQuery): Promise<ListPayrollAcctItemResponse>
    /**
     * 查询成本分摊报表汇总数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_report/list
     */
    listPayrollCostAllocationReport(query?: ListPayrollCostAllocationReportQuery): Promise<ListPayrollCostAllocationReportResponse>
    /**
     * 批量查询成本分摊方案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_plan/list
     */
    listPayrollCostAllocationPlan(query?: ListPayrollCostAllocationPlanQuery): Promise<ListPayrollCostAllocationPlanResponse>
    /**
     * 获取薪资组基本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list
     */
    listPayrollPaygroup(query?: ListPayrollPaygroupQuery): Promise<ListPayrollPaygroupResponse>
  }
}

export interface ListPayrollAcctItemQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface ListPayrollCostAllocationReportQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 成本分摊方案ID */
  cost_allocation_plan_id: string
  /** 期间 */
  pay_period: string
  /** 报表类型 */
  report_type: 0 | 1 | 2
}

export interface ListPayrollCostAllocationPlanQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 期间 */
  pay_period: string
}

export interface ListPayrollPaygroupQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface ListPayrollAcctItemResponse {
  /** 算薪项列表 */
  items?: AcctItem[]
  /** 下一页开始 */
  page_token?: string
  /** 是否还有更多数据 */
  has_more?: boolean
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

export interface ListPayrollCostAllocationPlanResponse {
  /** 方案 */
  items?: CostAllocationPlan[]
  /** 下一页开始 */
  page_token?: string
  /** 是否还有更多数据 */
  has_more?: boolean
}

export interface ListPayrollPaygroupResponse {
  /** 薪资组列表 */
  items?: Paygroup[]
  /** 分页标识符 */
  page_token?: string
  /** 是否还有更多数据 */
  has_more?: boolean
}

Internal.define({
  '/open-apis/payroll/v1/acct_items': {
    GET: 'listPayrollAcctItem',
  },
  '/open-apis/payroll/v1/cost_allocation_reports': {
    GET: 'listPayrollCostAllocationReport',
  },
  '/open-apis/payroll/v1/cost_allocation_plans': {
    GET: 'listPayrollCostAllocationPlan',
  },
  '/open-apis/payroll/v1/paygroups': {
    GET: 'listPayrollPaygroup',
  },
})
