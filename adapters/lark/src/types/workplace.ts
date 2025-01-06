import { Internal } from '../internal'
import { BlockAccessData, CustomWorkplaceAccessData, WorkplaceAccessData } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 获取工作台访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_access_data/search
     */
    searchWorkplaceWorkplaceAccessData(query?: SearchWorkplaceWorkplaceAccessDataQuery): Promise<SearchWorkplaceWorkplaceAccessDataResponse>
    /**
     * 获取定制工作台访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/custom_workplace_access_data/search
     */
    searchWorkplaceCustomWorkplaceAccessData(query?: SearchWorkplaceCustomWorkplaceAccessDataQuery): Promise<SearchWorkplaceCustomWorkplaceAccessDataResponse>
    /**
     * 获取定制工作台小组件访问数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/workplace-v1/workplace_block_access_data/search
     */
    searchWorkplaceWorkplaceBlockAccessData(query?: SearchWorkplaceWorkplaceBlockAccessDataQuery): Promise<SearchWorkplaceWorkplaceBlockAccessDataResponse>
  }
}

export interface SearchWorkplaceWorkplaceAccessDataQuery {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 分页大小，最小为 1，最大为 200，默认为 20。 */
  page_size: number
  /** 用于标记当前请求的分页标记，将返回以当前分页标记开始，往后 page_size 个元素。第一次访问接口的时候不需要传。 */
  page_token?: string
}

export interface SearchWorkplaceCustomWorkplaceAccessDataQuery {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 分页大小，最小为 1，最大为 200，默认为 20。 */
  page_size: number
  /** 用于标记当前请求的分页标记，将返回以当前分页标记开始，往后 page_size 个元素。第一次访问接口的时候不需要传。 */
  page_token?: string
  /** 定制化工作台id.非必填,不填的时候,返回所有定制化工作台数据。 */
  custom_workplace_id?: string
}

export interface SearchWorkplaceWorkplaceBlockAccessDataQuery {
  /** 数据检索开始时间，精确到日。格式yyyy-MM-dd。 */
  from_date: string
  /** 数据检索结束时间，精确到日。格式yyyy-MM-dd。 */
  to_date: string
  /** 分页大小，最小为 1，最大为 200，默认为 20。 */
  page_size: number
  /** 用于标记当前请求的分页标记，将返回以当前分页标记开始，往后 page_size 个元素。第一次访问接口的时候不需要传。 */
  page_token?: string
  /** 小组件id */
  block_id?: string
}

export interface SearchWorkplaceWorkplaceAccessDataResponse {
  /** 工作台访问数据 */
  items?: WorkplaceAccessData[]
  /** 是否还有下一页数据 */
  has_more?: boolean
  /** 分页标记，存在下一页时返回。 */
  page_token?: string
}

export interface SearchWorkplaceCustomWorkplaceAccessDataResponse {
  /** 定制工作台访问数据 */
  items?: CustomWorkplaceAccessData[]
  /** 是否还有下一页数据 */
  has_more?: boolean
  /** 分页标记，存在下一页时返回 */
  page_token?: string
}

export interface SearchWorkplaceWorkplaceBlockAccessDataResponse {
  /** 工作台中block的访问数据 */
  items?: BlockAccessData[]
  /** 是否还有下一页数据 */
  has_more?: boolean
  /** 分页标记，存在下一页时返回 */
  page_token?: string
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
