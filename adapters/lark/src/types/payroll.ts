import { AcctItem, CostAllocationPlan, CostAllocationReportData, I18nContent, Paygroup } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 批量查询算薪项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/acct_item/list
     */
    listPayrollAcctItem(query?: ListPayrollAcctItemQuery): Promise<Paginated<AcctItem>>
    /**
     * 查询成本分摊报表汇总数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_report/list
     */
    listPayrollCostAllocationReport(query?: ListPayrollCostAllocationReportQuery): Promise<ListPayrollCostAllocationReportResponse>
    /**
     * 批量查询成本分摊方案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/cost_allocation_plan/list
     */
    listPayrollCostAllocationPlan(query?: ListPayrollCostAllocationPlanQuery): Promise<Paginated<CostAllocationPlan>>
    /**
     * 获取薪资组基本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list
     */
    listPayrollPaygroup(query?: ListPayrollPaygroupQuery): Promise<Paginated<Paygroup>>
  }
}

export interface ListPayrollAcctItemQuery extends Pagination {
}

export interface ListPayrollCostAllocationReportQuery extends Pagination {
  /** 成本分摊方案ID */
  cost_allocation_plan_id: string
  /** 期间 */
  pay_period: string
  /** 报表类型 */
  report_type: 0 | 1 | 2
}

export interface ListPayrollCostAllocationPlanQuery extends Pagination {
  /** 期间 */
  pay_period: string
}

export interface ListPayrollPaygroupQuery extends Pagination {
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
