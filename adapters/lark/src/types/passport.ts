import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    passport: Passport.Methods
  }
}

export namespace Passport {
  export interface Methods {
    session: Session.Methods
  }

  export namespace Session {
    export interface Methods {
      /**
       * 批量获取脱敏的用户登录信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
      /**
       * 退出登录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/logout
       */
      logout(body: LogoutRequest, query?: LogoutQuery): Promise<void>
    }

    export interface QueryRequest {
      /** 用户 ID */
      user_ids?: string[]
    }

    export interface QueryQuery {
      /** 用户id类型 */
      user_id_type?: 'open_id' | 'union_id' | 'user_id'
    }

    export interface QueryResponse {
      /** session信息 */
      mask_sessions?: Lark.MaskSession[]
    }

    export const enum LogoutRequestLogoutType {
      /** UserID */
      UserID = 1,
      /** IdpCredentialID */
      IdpCredentialID = 2,
      /** Session 标识符 */
      SessionUUID = 3,
    }

    export interface LogoutRequest {
      /** idp 侧的唯一标识 */
      idp_credential_id?: string
      /** 登出的方式 */
      logout_type: LogoutRequestLogoutType
      /** 登出的客户端类型，默认全部登出，1-桌面端，2-网页端，3-安卓移动端，4-Apple移动端 5-服务端 6-旧版小程序端 8-其他移动端 */
      terminal_type?: number[]
      /** user_id */
      user_id?: string
      /** 登出原因 */
      logout_reason?: number
      /** 需要精确登出的 session 标识符 */
      sid?: string
    }

    export interface LogoutQuery {
      /** user_id_type */
      user_id_type?: 'open_id' | 'union_id' | 'user_id'
    }
  }
}

Internal.define({
  '/passport/v1/sessions/query': {
    POST: 'passport.session.query',
  },
  '/passport/v1/sessions/logout': {
    POST: 'passport.session.logout',
  },
})
