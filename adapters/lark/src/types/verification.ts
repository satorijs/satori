import { Internal } from '../internal'
import { Verification } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 获取认证信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/verification-v1/verification/get
     */
    getVerification(): Promise<GetVerificationResponse>
  }
}

export interface GetVerificationResponse {
  /** 认证信息 */
  verification?: Verification
}

Internal.define({
  '/open-apis/verification/v1/verification': {
    GET: 'getVerification',
  },
})
