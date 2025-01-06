import { Internal } from '../internal'
import { ArchiveDetail, ChangeReason, Indicator, Item, ItemCategory, PlanDetail } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 批量查询员工薪资档案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query
     */
    queryCompensationArchive(body: QueryCompensationArchiveRequest, query?: QueryCompensationArchiveQuery): Promise<QueryCompensationArchiveResponse>
    /**
     * 批量查询薪资项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item/list
     */
    listCompensationItem(query?: ListCompensationItemQuery): Promise<ListCompensationItemResponse>
    /**
     * 批量查询薪资统计指标
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/indicator/list
     */
    listCompensationIndicator(query?: ListCompensationIndicatorQuery): Promise<ListCompensationIndicatorResponse>
    /**
     * 批量获取薪资项分类信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/item_category/list
     */
    listCompensationItemCategory(query?: ListCompensationItemCategoryQuery): Promise<ListCompensationItemCategoryResponse>
    /**
     * 批量查询薪资方案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list
     */
    listCompensationPlan(query?: ListCompensationPlanQuery): Promise<ListCompensationPlanResponse>
    /**
     * 批量查询定调薪原因
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/change_reason/list
     */
    listCompensationChangeReason(query?: ListCompensationChangeReasonQuery): Promise<ListCompensationChangeReasonResponse>
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

export interface QueryCompensationArchiveQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 用户ID类型 */
  user_id_type: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface ListCompensationItemQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 薪酬项类型（不传则认为查询所有类型薪酬项） */
  item_type?: 'salary' | 'bonus' | 'recurring_payment'
}

export interface ListCompensationIndicatorQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface ListCompensationItemCategoryQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface ListCompensationPlanQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface ListCompensationChangeReasonQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface QueryCompensationArchiveResponse {
  /** 档案信息列表 */
  items: ArchiveDetail[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more: boolean
}

export interface ListCompensationItemResponse {
  /** 薪酬项信息列表 */
  items: Item[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more: boolean
}

export interface ListCompensationIndicatorResponse {
  /** 薪资统计指标信息列表 */
  items: Indicator[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}

export interface ListCompensationItemCategoryResponse {
  /** 薪酬项分类信息列表 */
  items?: ItemCategory[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}

export interface ListCompensationPlanResponse {
  /** 薪资方案信息列表 */
  items: PlanDetail[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more: boolean
}

export interface ListCompensationChangeReasonResponse {
  /** 调薪原因信息列表 */
  items: ChangeReason[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more: boolean
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
