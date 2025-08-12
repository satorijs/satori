import { Internal } from '../internal'

/**
 * 获取授权码
 * 获取授权码链接示例
 */
export interface AccountBotOauthParams {
  /** 客户端ID */
  client_id: string;
  /** 回调地址 */
  redirect_uri: string;
  /** 授权码类型 不可更改 */
  response_type: string;
  /** 申请的权限 多个权限以空格分隔 */
  scope: string;
}

declare module '../internal' {
  interface Internal {
    getAccountBotOauth: (data: AccountBotOauthParams) => Promise<void>
  }
}
Internal.define({
  '/account/bot_oauth': {
    GET: 'getAccountBotOauth',
  },
})
