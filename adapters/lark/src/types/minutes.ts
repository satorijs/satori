import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    minutes: Minutes.Methods
  }
}

export namespace Minutes {
  export interface Methods {
    minute: Minute.Methods
  }

  export namespace Minute {
    export interface Methods {
      media: Media.Methods
      transcript: Transcript.Methods
      statistics: Statistics.Methods
      /**
       * 获取妙记信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute/get
       */
      get(minute_token: string, query?: GetQuery): Promise<GetResponse>
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetResponse {
      /** 妙记基本信息 */
      minute?: Lark.Minute
    }

    export namespace Media {
      export interface Methods {
        /**
         * 下载妙记音视频文件
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-media/get
         */
        get(minute_token: string): Promise<GetResponse>
      }

      export interface GetResponse {
        /** 妙记音视频文件下载链接 */
        download_url?: string
      }
    }

    export namespace Transcript {
      export interface Methods {
        /**
         * 导出妙记文字记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-transcript/get
         */
        get(minute_token: string, query?: GetQuery): Promise<ArrayBuffer>
      }

      export interface GetQuery {
        /** 是否包含说话人 */
        need_speaker?: boolean
        /** 是否包含时间戳 */
        need_timestamp?: boolean
        /** 导出文件格式 */
        file_format?: string
      }
    }

    export namespace Statistics {
      export interface Methods {
        /**
         * 获取妙记统计数据
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/minutes-v1/minute-statistics/get
         */
        get(minute_token: string, query?: GetQuery): Promise<GetResponse>
      }

      export interface GetQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface GetResponse {
        /** 妙记浏览信息统计 */
        statistics?: Lark.Statictics
      }
    }
  }
}

Internal.define({
  '/minutes/v1/minutes/{minute_token}/media': {
    GET: 'minutes.minute.media.get',
  },
  '/minutes/v1/minutes/{minute_token}/transcript': {
    GET: { name: 'minutes.minute.transcript.get', type: 'binary' },
  },
  '/minutes/v1/minutes/{minute_token}/statistics': {
    GET: 'minutes.minute.statistics.get',
  },
  '/minutes/v1/minutes/{minute_token}': {
    GET: 'minutes.minute.get',
  },
})
