import { BlockAccessData, CustomWorkplaceAccessData, WorkplaceAccessData } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取工作台访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_access_data/search
     */
    searchWorkplaceWorkplaceAccessData(query?: SearchWorkplaceWorkplaceAccessDataQuery): Promise<Paginated<WorkplaceAccessData>>
    /**
     * 获取定制工作台访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/custom_workplace_access_data/search
     */
    searchWorkplaceCustomWorkplaceAccessData(query?: SearchWorkplaceCustomWorkplaceAccessDataQuery): Promise<Paginated<CustomWorkplaceAccessData>>
    /**
     * 获取定制工作台小组件访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_block_access_data/search
     */
    searchWorkplaceWorkplaceBlockAccessData(query?: SearchWorkplaceWorkplaceBlockAccessDataQuery): Promise<Paginated<BlockAccessData>>
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
  '/open-apis/workplace/v1/workplace_access_data/search': {
    POST: 'searchWorkplaceWorkplaceAccessData',
  },
  '/open-apis/workplace/v1/custom_workplace_access_data/search': {
    POST: 'searchWorkplaceCustomWorkplaceAccessData',
  },
  '/open-apis/workplace/v1/workplace_block_access_data/search': {
    POST: 'searchWorkplaceWorkplaceBlockAccessData',
  },
})
