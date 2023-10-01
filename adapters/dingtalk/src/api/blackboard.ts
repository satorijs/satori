import { Internal } from '../internal'
// GENERATED CONTENT

export interface QueryBlackboardSpaceQuery {
  /** 操作人userId。 */
  operationUserId: string
}

export interface QueryBlackboardSpaceResponse {
  spaceId?: string
}

// funcName: isOldApi
Internal.define({
  '/blackboard/spaces': { GET: { queryBlackboardSpace: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 获取公告钉盘空间信息
     * @see https://open.dingtalk.com/document/app/obtain-bulletin-nail-disk-space-information
     */
    queryBlackboardSpace(
      query: QueryBlackboardSpaceQuery,
    ): Promise<QueryBlackboardSpaceResponse>
  }
}
