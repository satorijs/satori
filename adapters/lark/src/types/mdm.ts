import { CountryRegion, Filter } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 根据主数据编码批量查询国家/地区
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v3/batch_country_region/get
     */
    getMdmBatchCountryRegion(query?: GetMdmBatchCountryRegionQuery): Promise<GetMdmBatchCountryRegionResponse>
    /**
     * 分页批量查询国家/地区
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v3/country_region/list
     */
    listMdmCountryRegion(body: ListMdmCountryRegionRequest, query?: ListMdmCountryRegionQuery): Promise<ListMdmCountryRegionResponse> & AsyncIterableIterator<CountryRegion>
    /**
     * 用户数据维度绑定
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/bind
     */
    bindMdmUserAuthDataRelation(body: BindMdmUserAuthDataRelationRequest, query?: BindMdmUserAuthDataRelationQuery): Promise<void>
    /**
     * 用户数据维度解绑
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/unbind
     */
    unbindMdmUserAuthDataRelation(body: UnbindMdmUserAuthDataRelationRequest, query?: UnbindMdmUserAuthDataRelationQuery): Promise<void>
  }
}

export interface GetMdmBatchCountryRegionQuery {
  /** 需要的查询字段集 */
  fields: string[]
  /** 主数据编码集 */
  ids: string[]
  /** 语言集 */
  languages: string[]
}

export interface GetMdmBatchCountryRegionResponse {
  /** 国家/地区目录列表 */
  data?: CountryRegion[]
}

export interface ListMdmCountryRegionRequest {
  /** filter */
  filter?: Filter
}

export interface ListMdmCountryRegionQuery {
  /** 语言集 */
  languages: string[]
  /** 需要的查询字段集 */
  fields: string[]
  /** 查询页大小 */
  limit?: number
  /** 查询起始位置 */
  offset?: number
  /** 是否返回总数 */
  return_count?: boolean
  page_token?: string
}

export interface ListMdmCountryRegionResponse {
  /** 国家/地区目录列表 */
  data?: CountryRegion[]
  /** 总数 */
  total?: string
  /** 下一次分页参数 */
  next_page_token?: string
}

export interface BindMdmUserAuthDataRelationRequest {
  /** 数据类型编码 */
  root_dimension_type: string
  /** 数据编码列表 */
  sub_dimension_types: string[]
  /** 授权人的lark id */
  authorized_user_ids: string[]
  /** uams系统中应用id */
  uams_app_id: string
}

export interface BindMdmUserAuthDataRelationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UnbindMdmUserAuthDataRelationRequest {
  /** 数据类型编码 */
  root_dimension_type: string
  /** 数据编码列表 */
  sub_dimension_types: string[]
  /** 授权人的lark id */
  authorized_user_ids: string[]
  /** uams系统中应用id */
  uams_app_id: string
}

export interface UnbindMdmUserAuthDataRelationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

Internal.define({
  '/mdm/v3/batch_country_region': {
    GET: 'getMdmBatchCountryRegion',
  },
  '/mdm/v3/country_regions': {
    GET: 'listMdmCountryRegion',
  },
  '/mdm/v1/user_auth_data_relations/bind': {
    POST: 'bindMdmUserAuthDataRelation',
  },
  '/mdm/v1/user_auth_data_relations/unbind': {
    POST: 'unbindMdmUserAuthDataRelation',
  },
})
