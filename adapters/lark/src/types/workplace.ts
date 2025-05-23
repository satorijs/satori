import { BlockAccessData, CustomWorkplaceAccessData, WorkplaceAccessData } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取工作台访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_access_data/search
     */
    searchWorkplaceWorkplaceAccessData(query?: SearchWorkplaceWorkplaceAccessDataQuery): Paginated<WorkplaceAccessData>
    /**
     * 获取定制工作台访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/custom_workplace_access_data/search
     */
    searchWorkplaceCustomWorkplaceAccessData(query?: SearchWorkplaceCustomWorkplaceAccessDataQuery): Paginated<CustomWorkplaceAccessData>
    /**
     * 获取定制工作台小组件访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_block_access_data/search
     */
    searchWorkplaceWorkplaceBlockAccessData(query?: SearchWorkplaceWorkplaceBlockAccessDataQuery): Paginated<BlockAccessData>
  }
}

export interface SearchWorkplaceWorkplaceAccessDataQuery extends Pagination {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
}

export interface SearchWorkplaceCustomWorkplaceAccessDataQuery extends Pagination {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 定制化工作台id.非必填,不填的时候,返回所有定制化工作台数据。 */
  custom_workplace_id?: string
}

export interface SearchWorkplaceWorkplaceBlockAccessDataQuery extends Pagination {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd。 */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 小组件id */
  block_id?: string
}

Internal.define({
  '/workplace/v1/workplace_access_data/search': {
    POST: { name: 'searchWorkplaceWorkplaceAccessData', pagination: { argIndex: 0 } },
  },
  '/workplace/v1/custom_workplace_access_data/search': {
    POST: { name: 'searchWorkplaceCustomWorkplaceAccessData', pagination: { argIndex: 0 } },
  },
  '/workplace/v1/workplace_block_access_data/search': {
    POST: { name: 'searchWorkplaceWorkplaceBlockAccessData', pagination: { argIndex: 0 } },
  },
})
