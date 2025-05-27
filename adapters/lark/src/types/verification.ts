import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    verification: Verification.Methods
  }
}

export namespace Verification {
  export interface Methods {
    /**
     * 获取认证信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/verification-v1/verification/get
     */
    get(): Promise<GetResponse>
  }

  export interface GetResponse {
    /** 认证信息 */
    verification?: Lark.Verification
  }
}

Internal.define({
  '/verification/v1/verification': {
    GET: 'verification.get',
  },
})
