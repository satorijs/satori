import { Internal } from '../internal'
// GENERATED CONTENT

export interface GetFormInstanceQuery {
  /** 填表类型。 */
  bizType?: number
}

export interface GetFormInstanceResponse {
  success?: unknown
  result?: {
    createTime?: string
    modifyTime?: string
    formCode?: string
    title?: string
    creator?: string
    forms?: number
  }
}

export interface ListFormInstancesQuery {
  /** 填表类型。 */
  bizType?: number
  /** 时间，格式要求为yyyy-MM-dd。 */
  actionDate?: string
  /** 分页游标。 */
  nextToken: number
  /** 每页最大条目数，最大值100。 */
  maxResults: number
}

export interface ListFormInstancesResponse {
  success?: unknown
  result?: {
    hasMore?: number
    nextToken?: number
    list?: number
  }
}

export interface ListFormSchemasByCreatorQuery {
  /** 每页最大条目数，最大值200。 */
  maxResults: number
  /** 填表类型。 */
  bizType?: number
  /** 填表创建人userid。 */
  creator?: string
  /** 分页游标。 */
  nextToken: number
}

export interface ListFormSchemasByCreatorResponse {
  success?: unknown
  result?: {
    hasMore?: number
    nextToken?: number
    list?: number
  }
}

// funcName: isOldApi
Internal.define({
  '/swform/instances/{formInstanceId}': { GET: { getFormInstance: false } },
  '/swform/forms/{formCode}/instances': { GET: { listFormInstances: false } },
  '/swform/users/forms': { GET: { listFormSchemasByCreator: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 获取单条填表实例详情
     * @see https://open.dingtalk.com/document/isvapp/obtains-the-instance-details-of-a-single-fill-table
     */
    getFormInstance(
      formInstanceId: string,
      query: GetFormInstanceQuery,
    ): Promise<GetFormInstanceResponse>
    /**
     * 获取填表实例列表
     * @see https://open.dingtalk.com/document/isvapp/obtain-the-table-filling-instance-list-data
     */
    listFormInstances(
      formCode: string,
      query: ListFormInstancesQuery,
    ): Promise<ListFormInstancesResponse>
    /**
     * 获取用户创建的填表模板列表
     * @see https://open.dingtalk.com/document/isvapp/new-obtains-the-template-that-a-user-creates
     */
    listFormSchemasByCreator(
      query: ListFormSchemasByCreatorQuery,
    ): Promise<ListFormSchemasByCreatorResponse>
  }
}
