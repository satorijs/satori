import { Internal } from '../internal'
// GENERATED CONTENT

export interface HrmProcessUpdateTerminationInfoParams {
  /** 已离职员工的userId，可调用[获取离职员工列表](https://open.dingtalk.com/document/orgapp/obtain-the-list-of-employees-who-have-left)接口获取离职员工userId。 */
  userId: string
  /** 最后工作日，即离职日期，格式为毫秒值时间戳。 */
  lastWorkDate: number
  /** 离职备注信息。 */
  dismissionMemo: string
}

export interface HrmProcessUpdateTerminationInfoResponse {
  result: unknown
}

export interface HrmProcessRegularParams {
  /** 待转正用户userId。 */
  userId: string
  /** 转正时间，unix时间戳，单位毫秒。 */
  regularDate: number
  /** 备注信息。 */
  remark?: string
  /** 操作用户userId。 */
  operationId: string
}

export interface HrmProcessRegularResponse {
  result: unknown
}

export interface QueryDismissionStaffIdListQuery {
  /** 分页查询的游标。 */
  nextToken?: number
  /** 每页条目数，默认值30，最大值50。 */
  maxResults?: number
}

export interface QueryDismissionStaffIdListResponse {
  nextToken?: number
  hasMore?: unknown
  userIdList?: string[]
}

export interface RosterMetaFieldOptionsUpdateParams {
  /** 花名册分组ID。 */
  groupId: string
  /** 花名册字段标识。 */
  fieldCode: string
  /** 需要修改的选项值列表，最大值20。 */
  labels: string[]
  /** 修改类型。 */
  modifyType: string
}

export interface RosterMetaFieldOptionsUpdateQuery {
  /** 对应应用的agentId值。 */
  appAgentId?: number
}

export interface RosterMetaFieldOptionsUpdateResponse {
  result?: unknown
}

export interface HrmProcessTransferParams {
  /** 被调岗员工userId。 */
  userId: string
  /** 部门ID。 */
  deptIdsAfterTransfer?: number[]
  /** 员工调岗后的人事主部门ID。 */
  mainDeptIdAfterTransfer?: number
  /** 员工调岗后的职位名称，长度最大124字符。 */
  positionNameAfterTransfer?: string
  /** 员工调岗后的职级名称，长度不超过64字符。 */
  positionLevelAfterTransfer?: string
  /** 员工调岗后的职务ID，调用[获取企业职务信息](https://open.dingtalk.com/document/orgapp-server/obtain-enterprise-title-information)接口获取jobId参数值。 */
  jobIdAfterTransfer?: string
  /** 员工调岗后的职位ID。 */
  positionIdAfterTransfer?: string
  /** 员工调岗后的职级ID。 */
  rankIdAfterTransfer?: string
  /** 操作人userId。 */
  operateUserId?: string
}

export interface HrmProcessTransferResponse {
  result?: unknown
}

export interface QueryHrmEmployeeDismissionInfoQuery {
  /** 员工userId列表， 最大长度50。 */
  userIdList: string
}

export interface QueryHrmEmployeeDismissionInfoResponse {
  result?: {
    userId?: string
    lastWorkDay?: number
    deptList?: number
    reasonMemo?: string
    preStatus?: number
    handoverUserId?: string
    status?: number
    mainDeptName?: string
    mainDeptId?: number
    voluntaryReason?: number
    passiveReason?: number
  }[]
}

export interface QueryJobsQuery {
  /** 职务名称。 */
  jobName?: string
  /** 分页游标。 */
  nextToken: number
  /** 每页最大条目数，最大值100。 */
  maxResults: number
}

export interface QueryJobsResponse {
  nextToken?: number
  hasMore?: unknown
  list?: {
    jobId?: string
    jobName?: string
    jobDescription?: string
  }[]
}

export interface QueryJobRanksQuery {
  /** 职级序列ID。 */
  rankCategoryId?: string
  /** 职级编码。 */
  rankCode?: string
  /** 职级名称。 */
  rankName?: string
  /** 分页游标。 */
  nextToken: number
  /** 每页最大条目数，最大值200。 */
  maxResults: number
}

export interface QueryJobRanksResponse {
  nextToken?: number
  hasMore?: unknown
  list?: {
    rankId?: string
    rankCategoryId?: string
    rankCode?: string
    rankName?: string
    minJobGrade?: number
    maxJobGrade?: number
    rankDescription?: string
  }[]
}

export interface QueryPositionsParams {
  /** 职位名称。 */
  positionName?: string
  /** 职位类别ID列表。 */
  inCategoryIds?: string[]
  /** 职位ID列表。 */
  inPositionIds?: string[]
  /** 部门ID。 */
  deptId?: number
}

export interface QueryPositionsQuery {
  /** 分页游标。 */
  nextToken: number
  /** 每页最大条目数，最大值200。 */
  maxResults: number
}

export interface QueryPositionsResponse {
  nextToken?: number
  hasMore?: unknown
  list?: {
    positionId?: string
    positionName?: string
    positionCategoryId?: string
    jobId?: string
    positionDes?: string
    rankIdList?: number
    status?: number
  }[]
}

// funcName: isOldApi
Internal.define({
  '/hrm/processes/employees/terminations': {
    PUT: { hrmProcessUpdateTerminationInfo: false },
  },
  '/hrm/processes/regulars/become': { POST: { hrmProcessRegular: false } },
  '/hrm/employees/dismissions': { GET: { queryDismissionStaffIdList: false } },
  '/hrm/rosters/meta/fields/options': {
    PUT: { rosterMetaFieldOptionsUpdate: false },
  },
  '/hrm/processes/transfer': { POST: { hrmProcessTransfer: false } },
  '/hrm/employees/dimissionInfos': {
    GET: { queryHrmEmployeeDismissionInfo: false },
  },
  '/hrm/jobs': { GET: { queryJobs: false } },
  '/hrm/jobRanks': { GET: { queryJobRanks: false } },
  '/hrm/positions/query': { POST: { queryPositions: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 修改员工最后一次离职信息
     * @see https://open.dingtalk.com/document/app/modify-resigned-employee-information
     */
    hrmProcessUpdateTerminationInfo(
      params: HrmProcessUpdateTerminationInfoParams,
    ): Promise<HrmProcessUpdateTerminationInfoResponse>
    /**
     * 智能人事转正接口
     * @see https://open.dingtalk.com/document/orgapp/intelligent-personnel-staff-to-become-regular
     */
    hrmProcessRegular(
      params: HrmProcessRegularParams,
    ): Promise<HrmProcessRegularResponse>
    /**
     * 获取离职员工列表
     * @see https://open.dingtalk.com/document/isvapp/obtain-the-list-of-employees-who-have-left
     */
    queryDismissionStaffIdList(
      query: QueryDismissionStaffIdListQuery,
    ): Promise<QueryDismissionStaffIdListResponse>
    /**
     * 新增或删除花名册选项类型字段的选项
     * @see https://open.dingtalk.com/document/orgapp/intelligent-personnel-roster-field-option-modification
     */
    rosterMetaFieldOptionsUpdate(
      query: RosterMetaFieldOptionsUpdateQuery,
      params: RosterMetaFieldOptionsUpdateParams,
    ): Promise<RosterMetaFieldOptionsUpdateResponse>
    /**
     * 智能人事员工调岗
     * @see https://open.dingtalk.com/document/orgapp/intelligent-personnel-staff-transfer
     */
    hrmProcessTransfer(
      params: HrmProcessTransferParams,
    ): Promise<HrmProcessTransferResponse>
    /**
     * 批量获取员工离职信息
     * @see https://open.dingtalk.com/document/isvapp/obtain-multiple-employee-demission-information-1
     */
    queryHrmEmployeeDismissionInfo(
      query: QueryHrmEmployeeDismissionInfoQuery,
    ): Promise<QueryHrmEmployeeDismissionInfoResponse>
    /**
     * 获取企业职务列表
     * @see https://open.dingtalk.com/document/isvapp/obtains-a-list-of-enterprise-jobs
     */
    queryJobs(query: QueryJobsQuery): Promise<QueryJobsResponse>
    /**
     * 获取企业职级列表
     * @see https://open.dingtalk.com/document/isvapp/obtain-a-list-of-enterprise-ranks
     */
    queryJobRanks(query: QueryJobRanksQuery): Promise<QueryJobRanksResponse>
    /**
     * 获取企业职位列表
     * @see https://open.dingtalk.com/document/isvapp/obtain-a-list-of-enterprise-positions
     */
    queryPositions(
      query: QueryPositionsQuery,
      params: QueryPositionsParams,
    ): Promise<QueryPositionsResponse>
  }
}
