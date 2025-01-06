import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 自建应用获取 tenant_access_token
     * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
     */
    tenantAccessTokenInternalAuth(body: TenantAccessTokenInternalAuthRequest): Promise<TenantAccessTokenInternalAuthResponse>
    /**
     * 自建应用获取 app_access_token
     * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal
     */
    appAccessTokenInternalAuth(body: AppAccessTokenInternalAuthRequest): Promise<AppAccessTokenInternalAuthResponse>
    /**
     * 重新获取 app_ticket
     * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_ticket_resend
     */
    appTicketResendAuth(body: AppTicketResendAuthRequest): Promise<void>
    /**
     * 商店应用获取 app_access_token
     * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token
     */
    appAccessTokenAuth(body: AppAccessTokenAuthRequest): Promise<AppAccessTokenAuthResponse>
    /**
     * 商店应用获取 tenant_access_token
     * @see https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token
     */
    tenantAccessTokenAuth(body: TenantAccessTokenAuthRequest): Promise<TenantAccessTokenAuthResponse>
  }
}

export interface TenantAccessTokenInternalAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
}

export interface AppAccessTokenInternalAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
}

export interface AppTicketResendAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
}

export interface AppAccessTokenAuthRequest {
  /** 应用唯一标识，创建应用后获得 */
  app_id: string
  /** 应用秘钥，创建应用后获得 */
  app_secret: string
  /** 平台定时推送给应用的临时凭证，通过事件监听机制获得 */
  app_ticket: string
}

export interface TenantAccessTokenAuthRequest {
  /** 应用唯一标识，创建应用 */
  app_access_token: string
  /** 应用秘钥，创建应用后获得 */
  tenant_key: string
}

export interface TenantAccessTokenInternalAuthResponse extends BaseResponse {
  code?: number
  msg?: string
  /** 访问 token */
  tenant_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}

export interface AppAccessTokenInternalAuthResponse extends BaseResponse {
  code?: number
  msg?: string
  /** 访问 token */
  app_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}

export interface AppAccessTokenAuthResponse extends BaseResponse {
  code?: number
  msg?: string
  /** 访问 token */
  app_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}

export interface TenantAccessTokenAuthResponse extends BaseResponse {
  code?: number
  msg?: string
  /** 访问 token */
  tenant_access_token?: string
  /** app_access_token 过期时间 */
  expire?: number
}

Internal.define({
  '/open-apis/auth/v3/tenant_access_token/internal': {
    POST: { name: 'tenantAccessTokenInternalAuth', type: 'raw-json' },
  },
  '/open-apis/auth/v3/app_access_token/internal': {
    POST: { name: 'appAccessTokenInternalAuth', type: 'raw-json' },
  },
  '/open-apis/auth/v3/app_ticket/resend': {
    POST: 'appTicketResendAuth',
  },
  '/open-apis/auth/v3/app_access_token': {
    POST: { name: 'appAccessTokenAuth', type: 'raw-json' },
  },
  '/open-apis/auth/v3/tenant_access_token': {
    POST: { name: 'tenantAccessTokenAuth', type: 'raw-json' },
  },
})
