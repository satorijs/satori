import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取用户信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/user_info/get
     */
    getAuthenUserInfo(): Promise<GetAuthenUserInfoResponse>
    /**
     * 获取 user_access_token
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/oidc-access_token/create
     */
    createAuthenOidcAccessToken(body: CreateAuthenOidcAccessTokenRequest): Promise<CreateAuthenOidcAccessTokenResponse>
    /**
     * 刷新 user_access_token
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/oidc-refresh_access_token/create
     */
    createAuthenOidcRefreshAccessToken(body: CreateAuthenOidcRefreshAccessTokenRequest): Promise<CreateAuthenOidcRefreshAccessTokenResponse>
    /**
     * 获取 user_access_token（v1 版本）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/access_token/create
     */
    createAuthenAccessToken(body: CreateAuthenAccessTokenRequest): Promise<CreateAuthenAccessTokenResponse>
    /**
     * 刷新 user_access_token（v1 版本）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/refresh_access_token/create
     */
    createAuthenRefreshAccessToken(body: CreateAuthenRefreshAccessTokenRequest): Promise<CreateAuthenRefreshAccessTokenResponse>
  }
}

export interface GetAuthenUserInfoResponse {
  /** 用户姓名 */
  name?: string
  /** 用户英文名称 */
  en_name?: string
  /** 用户头像 */
  avatar_url?: string
  /** 用户头像 72x72 */
  avatar_thumb?: string
  /** 用户头像 240x240 */
  avatar_middle?: string
  /** 用户头像 640x640 */
  avatar_big?: string
  /** 用户在应用内的唯一标识 */
  open_id?: string
  /** 用户统一ID */
  union_id?: string
  /** 用户邮箱 */
  email?: string
  /** 企业邮箱，请先确保已在管理后台启用飞书邮箱服务 */
  enterprise_email?: string
  /** 用户 user_id */
  user_id?: string
  /** 用户手机号 */
  mobile?: string
  /** 当前企业标识 */
  tenant_key?: string
  /** 用户工号 */
  employee_no?: string
}

export interface CreateAuthenOidcAccessTokenRequest {
  /** 授权类型，**固定值** */
  grant_type: string
  /** 登录预授权码 */
  code: string
}

export interface CreateAuthenOidcAccessTokenResponse {
  /** user_access_token，用于获取用户资源和访问某些open api */
  access_token: string
  /** 刷新用户 `access_token` 时使用的 token */
  refresh_token?: string
  /** token 类型，固定值 */
  token_type: string
  /** `access_token`的有效期，单位: 秒，一般是两个小时左右，需要以返回结果为准 */
  expires_in?: number
  /** `refresh_token` 的有效期，单位: 秒，一般是30天左右，需要以返回结果为准 */
  refresh_expires_in?: number
  /** 用户授予app的权限全集 */
  scope?: string
}

export interface CreateAuthenOidcRefreshAccessTokenRequest {
  /** 授权类型，**固定值**： */
  grant_type: string
  /** 刷新 `user_access_token` 需要的凭证<br>获取user_access_token`接口和本接口均返回 `refresh_token`，**每次请求，请注意使用最新获取到的`refresh_token`** */
  refresh_token: string
}

export interface CreateAuthenOidcRefreshAccessTokenResponse {
  /** user_access_token，用于获取用户资源和访问某些open api */
  access_token: string
  /** 刷新用户 `access_token` 时使用的 token */
  refresh_token?: string
  /** token 类型，固定值 */
  token_type: string
  /** `access_token`的有效期，单位: 秒，一般是两个小时左右，需要以返回结果为准 */
  expires_in?: number
  /** `refresh_token` 的有效期，单位: 秒，一般是30天左右，需要以返回结果为准 */
  refresh_expires_in?: number
  /** 用户授予app的权限全集 */
  scope?: string
}

export interface CreateAuthenAccessTokenRequest {
  /** 授权类型，**固定值** */
  grant_type: string
  /** 登录预授权码，调用[获取登录预授权码](https://open.feishu.cn/document/ukTMukTMukTM/ukzN4UjL5cDO14SO3gTN)接口获取 */
  code: string
}

export interface CreateAuthenAccessTokenResponse {
  /** user_access_token，用于获取用户资源 */
  access_token?: string
  /** token 类型 */
  token_type?: string
  /** `access_token`的有效期，单位: 秒 */
  expires_in?: number
  /** 用户姓名 */
  name?: string
  /** 用户英文名称 */
  en_name?: string
  /** 用户头像 */
  avatar_url?: string
  /** 用户头像 72x72 */
  avatar_thumb?: string
  /** 用户头像 240x240 */
  avatar_middle?: string
  /** 用户头像 640x640 */
  avatar_big?: string
  /** 用户在应用内的唯一标识 */
  open_id?: string
  /** 用户统一ID */
  union_id?: string
  /** 用户邮箱 */
  email?: string
  /** 企业邮箱，请先确保已在管理后台启用飞书邮箱服务 */
  enterprise_email?: string
  /** 用户 user_id */
  user_id?: string
  /** 用户手机号 */
  mobile?: string
  /** 当前企业标识 */
  tenant_key?: string
  /** `refresh_token` 的有效期，单位: 秒 */
  refresh_expires_in?: number
  /** 刷新用户 `access_token` 时使用的 token */
  refresh_token?: string
  /** 用户当前登录态session的唯一标识，为空则不返回 */
  sid?: string
}

export interface CreateAuthenRefreshAccessTokenRequest {
  /** 授权类型，**固定值**： */
  grant_type: string
  /** 刷新 `user_access_token` 需要的凭证<br>获取user_access_token`接口和本接口均返回 `refresh_token`，**每次请求，请注意使用最新获取到的`refresh_token`** */
  refresh_token: string
}

export interface CreateAuthenRefreshAccessTokenResponse {
  /** user_access_token，用于获取用户资源 */
  access_token?: string
  /** token 类型 */
  token_type?: string
  /** `access_token`的有效期，单位: 秒 */
  expires_in?: number
  /** 用户姓名 */
  name?: string
  /** 用户英文名称 */
  en_name?: string
  /** 用户头像 */
  avatar_url?: string
  /** 用户头像 72x72 */
  avatar_thumb?: string
  /** 用户头像 240x240 */
  avatar_middle?: string
  /** 用户头像 640x640 */
  avatar_big?: string
  /** 用户在应用内的唯一标识 */
  open_id?: string
  /** 用户统一ID */
  union_id?: string
  /** 用户邮箱 */
  email?: string
  /** 企业邮箱，请先确保已在管理后台启用飞书邮箱服务 */
  enterprise_email?: string
  /** 用户 user_id */
  user_id?: string
  /** 用户手机号 */
  mobile?: string
  /** 当前企业标识 */
  tenant_key?: string
  /** `refresh_token` 的有效期，单位: 秒 */
  refresh_expires_in?: number
  /** 刷新用户 `access_token` 时使用的 token */
  refresh_token?: string
  /** 用户当前登录态session的唯一标识，为空则不返回 */
  sid?: string
}

Internal.define({
  '/authen/v1/user_info': {
    GET: 'getAuthenUserInfo',
  },
  '/authen/v1/oidc/access_token': {
    POST: 'createAuthenOidcAccessToken',
  },
  '/authen/v1/oidc/refresh_access_token': {
    POST: 'createAuthenOidcRefreshAccessToken',
  },
  '/authen/v1/access_token': {
    POST: 'createAuthenAccessToken',
  },
  '/authen/v1/refresh_access_token': {
    POST: 'createAuthenRefreshAccessToken',
  },
})
