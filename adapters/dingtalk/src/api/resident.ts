import { Internal } from '../internal'
// GENERATED CONTENT

export interface AddPointQuery {
  /** 是否查询全员圈积分规则，取值： */
  isCircle: unknown
  /** 加减积分的唯一幂等标志，由调用方自己生成。 */
  uuid: string
  /** 用户userid，可以调用[通过免登码获取用户信息](https://developers.dingtalk.com/document/app/obtain-the-userid-of-a-user-by-using-the-log-free)接口获取。 */
  userId: string
  /** 规则代码。可以为空。 */
  ruleCode?: string
  /** 规则名字。 */
  ruleName: string
  /** 增加积分的时间戳，单位毫秒。 */
  actionTime?: number
  /** 本次增加积分。 */
  score: number
}

export interface PagePointHistoryQuery {
  /** 是否查询全员圈积分记录，否则查询积分管理积分记录，取值： */
  isCircle: unknown
  /** 用户userid。 */
  userId?: string
  /** 分页游标，第一次请求传0，后续取值是上一次调用此API返回的nextToken参数。 */
  nextToken: number
  /** 本次读取的最大数据记录数量，最大值20。 */
  maxResults: number
  /** 起始时间Unix时间戳，单位毫秒。 */
  startTime?: number
  /** 结束时间Unix时间戳（不包含），单位毫秒。 */
  endTime?: number
}

export interface PagePointHistoryResponse {
  pointRecordList: {
    userId: string
    score: number
    createAt: number
    uuid: string
    ruleCode?: string
    ruleName: string
  }[]
  hasMore: unknown
  nextToken: number
  totalCount: number
}

export interface ListPointRulesQuery {
  /** 是否查询全员圈积分规则，否则查询积分管理积分规则，取值： */
  isCircle: unknown
}

export interface ListPointRulesResponse {
  pointRuleList: {
    score: number
    dayLimitTimes: number
    status: number
    ruleCode?: string
    ruleName: string
    extension: string
    groupId: number
    orderId: number
  }[]
}

export interface ListIndustryRoleUsersQuery {
  /** 行业角色编码，有以下取值： */
  tagCode: string
}

export interface ListIndustryRoleUsersResponse {
  userIdList?: string[]
}

export interface ListUserIndustryRolesQuery {
  /** 用户userId。 */
  userId: string
}

export interface ListUserIndustryRolesResponse {
  roleList?: {
    roleId?: number
    roleName?: string
    tagCode?: string
  }[]
}

// funcName: isOldApi
Internal.define({
  '/resident/points': { POST: { addPoint: false } },
  '/resident/points/records': { GET: { pagePointHistory: false } },
  '/resident/points/rules': { GET: { listPointRules: false } },
  '/resident/industryRoles/users': { GET: { listIndustryRoleUsers: false } },
  '/resident/users/industryRoles': { GET: { listUserIndustryRoles: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 增加或减少居民积分
     * @see https://developers.dingtalk.com/document/isvapp/increase-or-decrease-resident-points
     */
    addPoint(query: AddPointQuery): Promise<void>
    /**
     * 查询数字区县居民积分流水
     * @see https://developers.dingtalk.com/document/isvapp/query-the-integral-flow-records-by-page
     */
    pagePointHistory(
      query: PagePointHistoryQuery,
    ): Promise<PagePointHistoryResponse>
    /**
     * 查询组织维度配置的的积分规则
     * @see https://developers.dingtalk.com/document/isvapp/query-all-credit-rules
     */
    listPointRules(query: ListPointRulesQuery): Promise<ListPointRulesResponse>
    /**
     * 获取行业角色下的用户列表
     * @see https://developers.dingtalk.com/document/isvapp/obtains-a-list-of-users-under-an-industry-role
     */
    listIndustryRoleUsers(
      query: ListIndustryRoleUsersQuery,
    ): Promise<ListIndustryRoleUsersResponse>
    /**
     * 获取用户所在的行业角色信息
     * @see https://developers.dingtalk.com/document/isvapp/obtains-information-about-the-industry-role-to-which-the-user
     */
    listUserIndustryRoles(
      query: ListUserIndustryRolesQuery,
    ): Promise<ListUserIndustryRolesResponse>
  }
}
