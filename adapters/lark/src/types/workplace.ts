import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    workplace: Workplace.Methods
  }
}

export namespace Workplace {
  export interface Methods {
    workplaceAccessData: WorkplaceAccessData.Methods
    customWorkplaceAccessData: CustomWorkplaceAccessData.Methods
    workplaceBlockAccessData: WorkplaceBlockAccessData.Methods
  }

  export namespace WorkplaceAccessData {
    export interface Methods {
      /**
       * 获取工作台访问数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_access_data/search
       */
      search(query?: SearchQuery): Paginated<Lark.WorkplaceAccessData>
    }

    export interface SearchQuery extends Pagination {
      /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
      from_date: string
      /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
      to_date: string
    }
  }

  export namespace CustomWorkplaceAccessData {
    export interface Methods {
      /**
       * 获取定制工作台访问数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/custom_workplace_access_data/search
       */
      search(query?: SearchQuery): Paginated<Lark.CustomWorkplaceAccessData>
    }

    export interface SearchQuery extends Pagination {
      /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
      from_date: string
      /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
      to_date: string
      /** 定制化工作台id.非必填,不填的时候,返回所有定制化工作台数据。 */
      custom_workplace_id?: string
    }
  }

  export namespace WorkplaceBlockAccessData {
    export interface Methods {
      /**
       * 获取定制工作台小组件访问数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_block_access_data/search
       */
      search(query?: SearchQuery): Paginated<Lark.BlockAccessData>
    }

    export interface SearchQuery extends Pagination {
      /** 数据检索开始时间，精确到日。格式yyyy-MM-dd。 */
      from_date: string
      /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
      to_date: string
      /** 小组件id */
      block_id?: string
    }
  }
}

Internal.define({
  '/workplace/v1/workplace_access_data/search': {
    POST: { name: 'workplace.workplaceAccessData.search', pagination: { argIndex: 0 } },
  },
  '/workplace/v1/custom_workplace_access_data/search': {
    POST: { name: 'workplace.customWorkplaceAccessData.search', pagination: { argIndex: 0 } },
  },
  '/workplace/v1/workplace_block_access_data/search': {
    POST: { name: 'workplace.workplaceBlockAccessData.search', pagination: { argIndex: 0 } },
  },
})
