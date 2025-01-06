import { Internal } from '../internal'
import { MaskSession } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 批量获取脱敏的用户登录信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/query
     */
    queryPassportSession(body: QueryPassportSessionRequest, query?: QueryPassportSessionQuery): Promise<QueryPassportSessionResponse>
    /**
     * 退出登录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/logout
     */
    logoutPassportSession(body: LogoutPassportSessionRequest, query?: LogoutPassportSessionQuery): Promise<void>
  }
}

export interface QueryPassportSessionRequest {
  /** 用户 ID */
  user_ids?: string[]
}

export interface QueryPassportSessionQuery {
  /** 用户id类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface LogoutPassportSessionRequest {
  /** idp 侧的唯一标识 */
  idp_credential_id?: string
  /** 登出的方式 */
  logout_type: 1 | 2 | 3
  /** 登出的客户端类型，默认全部登出，1-桌面端，2-网页端，3-安卓移动端，4-Apple移动端 5-服务端 6-旧版小程序端 8-其他移动端 */
  terminal_type?: number[]
  /** user_id */
  user_id?: string
  /** 登出原因 */
  logout_reason?: number
  /** 需要精确登出的 session 标识符 */
  sid?: string
}

export interface LogoutPassportSessionQuery {
  /** user_id_type */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface QueryPassportSessionResponse {
  /** session信息 */
  mask_sessions?: MaskSession[]
}

Internal.define({
  '/open-apis/passport/v1/sessions/query': {
    POST: 'queryPassportSession',
  },
  '/open-apis/passport/v1/sessions/logout': {
    POST: 'logoutPassportSession',
  },
})
