import { Minute, Statictics } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取妙记统计数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-statistics/get
     */
    getMinutesMinuteStatistics(minute_token: string, query?: GetMinutesMinuteStatisticsQuery): Promise<GetMinutesMinuteStatisticsResponse>
    /**
     * 获取妙记信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute/get
     */
    getMinutesMinute(minute_token: string, query?: GetMinutesMinuteQuery): Promise<GetMinutesMinuteResponse>
  }
}

export interface GetMinutesMinuteStatisticsQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetMinutesMinuteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetMinutesMinuteStatisticsResponse {
  /** 妙记浏览信息统计 */
  statistics?: Statictics
}

export interface GetMinutesMinuteResponse {
  /** 妙记基本信息 */
  minute?: Minute
}

Internal.define({
  '/minutes/v1/minutes/{minute_token}/statistics': {
    GET: 'getMinutesMinuteStatistics',
  },
  '/minutes/v1/minutes/{minute_token}': {
    GET: 'getMinutesMinute',
  },
})
