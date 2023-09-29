import { Internal } from '../internal'
// GENERATED CONTENT

export interface PullDataByPkQuery {
  /** 数据的主键字段值。 */
  primaryKey: string
  /** 同步数据的应用ID，第三方企业应用传应用的appId，企业自建应用传agentId。 */
  appId?: string
}

export interface PullDataByPkResponse {
  dataGmtCreate: number
  dataGmtModified: number
  dataCreateAppType: string
  dataCreateAppId: string
  dataModifiedAppType: string
  dataModifiedAppId: string
  jsonData: string
}

export interface PullDataByPageQuery {
  /** 要拉取的主数据模型id。 */
  dataModelId: string
  /** 用于过滤时间范围的字段，包含数据创建时间(dataGmtCreate)和数据修改时间(dataGmtModified)，如不传则不过滤。 */
  datetimeFilterField?: string
  /** 当配置了datetimeFilterField字段后，数据的时间起点，如果不传则将最早一条数据作为起点。 */
  minDatetime?: number
  /** 当配置了datetimeFilterField字段后，数据的时间终点，如果不传则按最新一条数据作为终点。 */
  maxDatetime?: number
  /** 用于翻页的游标，如果为空则从第一条数据开始查询。 */
  nextToken?: string
  /** 单次获取的最大记录条数，最大限制100条。 */
  maxResults?: number
  /** 同步数据的应用ID，第三方企业应用传应用的appId，企业自建应用传agentId。 */
  appId?: string
}

export interface PullDataByPageResponse {
  list: {
    dataGmtCreate: number
    dataGmtModified: number
    dataCreateAppType: string
    dataCreateAppId: string
    dataModifiedAppType: string
    dataModifiedAppId: string
    jsonData: string
  }[]
  nextToken?: string
  maxResults?: number
}

export interface SyncDataParams {
  /** 支持批量同步数据。 */
  triggerDataList: object[]
  /** 同步数据的应用ID： */
  appId?: string
}

export interface SyncDataResponse {
  list: {
    triggerId: string
    bizPrimaryKey: string
    success: number
    subErrCode: string
    subErrMsg: string
  }[]
}

// funcName: isOldApi
Internal.define({
  '/connector/data/{dataModelId}': { GET: { pullDataByPk: false } },
  '/connector/data': { GET: { pullDataByPage: false } },
  '/connector/triggers/data/sync': { POST: { syncData: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 通过业务主键拉取单条连接器主数据
     * @see https://developers.dingtalk.com/document/connector/pull-a-single-primary-record-based-on-the-business-primary
     */
    pullDataByPk(
      dataModelId: string,
      query: PullDataByPkQuery,
    ): Promise<PullDataByPkResponse>
    /**
     * 分页拉取连接器主数据
     * @see https://developers.dingtalk.com/document/connector/bulk-pull-dingtalk-connector-master-data
     */
    pullDataByPage(query: PullDataByPageQuery): Promise<PullDataByPageResponse>
    /**
     * 同步连接器数据
     * @see https://developers.dingtalk.com/document/connector/dingtalk-connector-data-synchronization-interface
     */
    syncData(params: SyncDataParams): Promise<SyncDataResponse>
  }
}
