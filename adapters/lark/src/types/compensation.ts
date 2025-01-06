import { ArchiveDetail, ChangeReason, Indicator, Item, ItemCategory, PlanDetail } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 批量查询员工薪资档案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query
     */
    queryCompensationArchive(body: QueryCompensationArchiveRequest, query?: QueryCompensationArchiveQuery): Promise<Paginated<ArchiveDetail>>
    /**
     * 批量查询薪资项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item/list
     */
    listCompensationItem(query?: ListCompensationItemQuery): Promise<Paginated<Item>>
    /**
     * 批量查询薪资统计指标
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/indicator/list
     */
    listCompensationIndicator(query?: ListCompensationIndicatorQuery): Promise<Paginated<Indicator>>
    /**
     * 批量获取薪资项分类信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item_category/list
     */
    listCompensationItemCategory(query?: ListCompensationItemCategoryQuery): Promise<Paginated<ItemCategory>>
    /**
     * 批量查询薪资方案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list
     */
    listCompensationPlan(query?: ListCompensationPlanQuery): Promise<Paginated<PlanDetail>>
    /**
     * 批量查询定调薪原因
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/change_reason/list
     */
    listCompensationChangeReason(query?: ListCompensationChangeReasonQuery): Promise<Paginated<ChangeReason>>
  }
}

export interface QueryCompensationArchiveRequest {
  /** 用户ID列表 */
  user_id_list: string[]
  /** 档案Tid列表 */
  tid_list?: string[]
  /** 生效开始时间 */
  effective_start_date?: string
  /** 生效结束时间 */
  effective_end_date?: string
}

export interface QueryCompensationArchiveQuery extends Pagination {
  /** 用户ID类型 */
  user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface ListCompensationItemQuery extends Pagination {
  /** 薪酬项类型（不传则认为查询所有类型薪酬项） */
  item_type?: 'salary' | 'bonus' | 'recurring_payment'
}

export interface ListCompensationIndicatorQuery extends Pagination {
}

export interface ListCompensationItemCategoryQuery extends Pagination {
}

export interface ListCompensationPlanQuery extends Pagination {
}

export interface ListCompensationChangeReasonQuery extends Pagination {
}

Internal.define({
  '/open-apis/compensation/v1/archives/query': {
    POST: 'queryCompensationArchive',
  },
  '/open-apis/compensation/v1/items': {
    GET: 'listCompensationItem',
  },
  '/open-apis/compensation/v1/indicators': {
    GET: 'listCompensationIndicator',
  },
  '/open-apis/compensation/v1/item_categories': {
    GET: 'listCompensationItemCategory',
  },
  '/open-apis/compensation/v1/plans': {
    GET: 'listCompensationPlan',
  },
  '/open-apis/compensation/v1/change_reasons': {
    GET: 'listCompensationChangeReason',
  },
})
