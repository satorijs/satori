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
  }

  export namespace Archive {
    export interface Methods {
      /**
       * 批量查询员工薪资档案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.ArchiveDetail>
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
}

Internal.define({
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
})
