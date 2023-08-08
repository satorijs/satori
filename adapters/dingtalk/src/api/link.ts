import { Internal } from '../internal'
// GENERATED CONTENT

export interface GetUserFollowStatusQuery {
  /** 待查询的服务窗关注者userId。 */
  userId?: string
  /** 待查询的服务窗关注者unionId。 */
  unionId?: string
  /** 服务窗帐号ID，可通过[服务窗帐号信息查询](https://open.dingtalk.com/document/orgapp/queries-the-list-of-services-under-an-enterprise)接口，获取返回参数`accountId`字段值。 */
  accountId?: string
}

export interface GetUserFollowStatusResponse {
  result: {
    status?: string
  }
}

export interface ListAccountResponse {
  result?: {
    accountId?: string
    accountName?: string
  }[]
}

export interface ListFollowerQuery {
  /** 分页游标。 */
  nextToken?: string
  /** 每页最大条目数，最大值100。 */
  maxResults?: number
  /** 服务窗帐号ID，可调用[获取企业下服务窗列表](https://open.dingtalk.com/document/orgapp-server/queries-the-list-of-services-under-an-enterprise)接口获取accountId参数值。 */
  accountId?: string
}

export interface ListFollowerResponse {
  requestId?: string
  result: {
    nextToken?: string
    userList?: number
  }
}

export interface GetFollowerInfoQuery {
  /** 关注服务窗用户的userId，可调用[批量获取关注服务窗用户信息](https://open.dingtalk.com/document/orgapp-server/obtains-the-follower-information-from-the-service-window)获得userId参数值。 */
  userId?: string
  /** 关注服务窗用户的unionId，可通过[查询用户详情](https://open.dingtalk.com/document/orgapp-server/query-user-details)接口获取unionId参数值。 */
  unionId?: string
  /** 服务窗帐号ID，可调用[获取企业下服务窗列表](https://open.dingtalk.com/document/orgapp-server/queries-the-list-of-services-under-an-enterprise)接口获取accountId参数值。 */
  accountId?: string
}

export interface GetFollowerInfoResponse {
  requestId?: string
  result: {
    user?: number
  }
}

// funcName: isOldApi
Internal.define({
  '/link/followers/statuses': { GET: { getUserFollowStatus: false } },
  '/link/accounts': { GET: { listAccount: false } },
  '/link/followers': { GET: { listFollower: false } },
  '/link/followers/infos': { GET: { getFollowerInfo: false } },
})
declare module '../internal' {
  interface Internal {
    /**
     * 获取用户关注状态
     * @see https://developers.dingtalk.com/document/orgapp/obtain-the-attention-status-of-the-user-service-window
     */
    getUserFollowStatus(
      query: GetUserFollowStatusQuery,
    ): Promise<GetUserFollowStatusResponse>
    /**
     * 获取企业下服务窗帐号列表
     * @see https://developers.dingtalk.com/document/orgapp/queries-the-list-of-services-under-an-enterprise
     */
    listAccount(): Promise<ListAccountResponse>
    /**
     * 批量获取关注服务窗用户信息
     * @see https://developers.dingtalk.com/document/orgapp/obtains-the-follower-information-from-the-service-window
     */
    listFollower(query: ListFollowerQuery): Promise<ListFollowerResponse>
    /**
     * 获取服务窗关注人信息
     * @see https://developers.dingtalk.com/document/orgapp/queries-the-follower-information-of-the-service-window
     */
    getFollowerInfo(
      query: GetFollowerInfoQuery,
    ): Promise<GetFollowerInfoResponse>
  }
}
