import { Minute, Statictics } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 下载妙记音视频文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-media/get
     */
    getMinutesMinuteMedia(minute_token: string): Promise<GetMinutesMinuteMediaResponse>
    /**
     * 导出妙记文字记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-transcript/get
     */
    getMinutesMinuteTranscript(minute_token: string, query?: GetMinutesMinuteTranscriptQuery): Promise<ArrayBuffer>
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

export interface GetMinutesMinuteMediaResponse {
  /** 妙记音视频文件下载链接 */
  download_url?: string
}

export interface GetMinutesMinuteTranscriptQuery {
  /** 是否包含说话人 */
  need_speaker?: boolean
  /** 是否包含时间戳 */
  need_timestamp?: boolean
  /** 导出文件格式 */
  file_format?: string
}

export interface GetMinutesMinuteStatisticsQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetMinutesMinuteStatisticsResponse {
  /** 妙记浏览信息统计 */
  statistics?: Statictics
}

export interface GetMinutesMinuteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetMinutesMinuteResponse {
  /** 妙记基本信息 */
  minute?: Minute
}

Internal.define({
  '/minutes/v1/minutes/{minute_token}/media': {
    GET: 'getMinutesMinuteMedia',
  },
  '/minutes/v1/minutes/{minute_token}/transcript': {
    GET: { name: 'getMinutesMinuteTranscript', type: 'binary' },
  },
  '/minutes/v1/minutes/{minute_token}/statistics': {
    GET: 'getMinutesMinuteStatistics',
  },
  '/minutes/v1/minutes/{minute_token}': {
    GET: 'getMinutesMinute',
  },
})
