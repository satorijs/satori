import { Internal } from '../internal'
// GENERATED CONTENT

export interface GetAdjustmentsQuery {
  /** 分页起始页。 */
  pageNumber: number
  /** 分页大小。 */
  pageSize: number
}

export interface GetAdjustmentsResponse {
  result?: {
    pageNumber?: number
    totalPage?: number
    items?: number
  }
}

export interface GetSimpleOvertimeSettingQuery {
  /** 分页起始页。 */
  pageNumber: number
  /** 分页大小。 */
  pageSize: number
}

export interface GetSimpleOvertimeSettingResponse {
  result?: {
    pageNumber?: number
    totalPage?: number
    items?: number
  }
}

export interface GetOvertimeSettingParams {
  overtimeSettingIds?: number[]
}

export interface GetOvertimeSettingResponse {
  result: {
    settingId?: number
    name?: string
    default?: number
    durationSettings?: number
    warningSettings?: number
    stepType?: number
    stepValue?: number
    workMinutesPerDay?: number
    overtimeDivisions?: number
    id: number
  }[]
}

// funcName: isOldApi
Internal.define({
  '/attendance/adjustments': { GET: { getAdjustments: false } },
  '/attendance/overtimeSettings': { GET: { getSimpleOvertimeSetting: false } },
  '/attendance/overtimeSettings/query': { POST: { getOvertimeSetting: false } },
})
declare module '../internal' {
  interface Internal {
    /**
     * 获取补卡规则列表
     * @see https://developers.dingtalk.com/document/isvapp/retrieve-a-list-of-replenishment-rules-by-page
     */
    getAdjustments(query: GetAdjustmentsQuery): Promise<GetAdjustmentsResponse>
    /**
     * 加班规则列表
     * @see https://developers.dingtalk.com/document/isvapp/retrieve-a-list-of-overtime-rules-by-page
     */
    getSimpleOvertimeSetting(
      query: GetSimpleOvertimeSettingQuery,
    ): Promise<GetSimpleOvertimeSettingResponse>
    /**
     * 批量获取加班规则设置
     * @see https://developers.dingtalk.com/document/isvapp/batch-retrieve-overtime-rules
     */
    getOvertimeSetting(
      params: GetOvertimeSettingParams,
    ): Promise<GetOvertimeSettingResponse>
  }
}
