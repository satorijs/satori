import { Internal } from '../internal'
// GENERATED CONTENT

export interface CreateJsapiTicketResponse {
  jsapiTicket?: string
  expireIn?: number
}

export interface GetSsoAccessTokenParams {
  /** 企业的corpId。 */
  corpid: string
  /** sso密钥，可以在[开发者后台](https://open-dev.dingtalk.com/fe/old#/corpAuthInfo)**基本信息**—**开发信息**（****旧版****）页面查看。 */
  ssoSecret: string
}

export interface GetSsoAccessTokenResponse {
  accessToken?: string
  expireIn?: number
}

export interface GetPersonalAuthRuleResponse {
  result?: {
    resource: string
    authItems: number
  }[]
}

export interface GetAccessTokenParams {
  /** 已创建的企业内部应用的AppKey。 */
  appKey: string
  /** 已创建的企业内部应用的AppSecret。 */
  appSecret?: string
}

export interface GetAccessTokenResponse {
  accessToken?: string
  expireIn?: number
}

export interface GetCorpAccessTokenParams {
  /** 已创建的第三方企业应用的SuiteKey。 */
  suiteKey: string
  /** 已创建的第三方企业应用的SuiteSecret。 */
  suiteSecret: string
  /** 授权企业的CorpId。 */
  authCorpId: string
  /** 钉钉推送的suiteTicket。 */
  suiteTicket: string
}

export interface GetCorpAccessTokenResponse {
  accessToken?: string
  expireIn?: number
}

export interface GetUserTokenParams {
  /** 应用id。可使用扫码登录应用或者第三方个人小程序的appId。 */
  clientId: string
  /** 应用密钥。 */
  clientSecret?: string
  /** OAuth 2.0 临时授权码。 */
  code?: string
  /** OAuth2.0刷新令牌，从返回结果里面获取。 */
  refreshToken?: string
  /** - 如果使用授权码换token，传authorization\_code。 */
  grantType?: string
}

export interface GetUserTokenResponse {
  accessToken?: string
  refreshToken?: string
  expireIn?: number
  corpId?: string
}

export interface GetSsoUserInfoQuery {
  /** 临时授权码，管理员在钉钉管理后台，跳转到应用管理页面时，该授权码会附带在URL中。 */
  code: string
}

export interface GetSsoUserInfoResponse {
  corpId: string
  corpName: string
  userId: string
  email: string
  userName: string
  avatar: string
  isAdmin: unknown
}

// funcName: isOldApi
Internal.define({
  '/oauth2/jsapiTickets': { POST: { createJsapiTicket: false } },
  '/oauth2/ssoAccessToken': { POST: { getSsoAccessToken: false } },
  '/oauth2/authRules/user': { GET: { getPersonalAuthRule: false } },
  '/oauth2/accessToken': { POST: { getAccessToken: false } },
  '/oauth2/corpAccessToken': { POST: { getCorpAccessToken: false } },
  '/oauth2/userAccessToken': { POST: { getUserToken: false } },
  '/oauth2/ssoUserInfo': { GET: { getSsoUserInfo: false } },
})
declare module '../internal' {
  interface Internal {
    /**
     * 生成jsapi ticket
     * @see https://developers.dingtalk.com/document/isvapp/create-a-jsapi-ticket
     */
    createJsapiTicket(): Promise<CreateJsapiTicketResponse>
    /**
     * 生成微应用管理后台accessToken
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-access_token-of-the-micro-application-background-without-log-on
     */
    getSsoAccessToken(
      params: GetSsoAccessTokenParams,
    ): Promise<GetSsoAccessTokenResponse>
    /**
     * 查询个人授权记录
     * @see https://developers.dingtalk.com/document/isvapp/query-individual-authorization-records
     */
    getPersonalAuthRule(): Promise<GetPersonalAuthRuleResponse>
    /**
     * 获取企业accessToken(企业内部应用)
     * @see https://developers.dingtalk.com/document/orgapp/obtain-the-access_token-of-an-internal-app
     */
    getAccessToken(
      params: GetAccessTokenParams,
    ): Promise<GetAccessTokenResponse>
    /**
     * 获取企业accessToken(应用商店应用)
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-access_token-of-the-authorized-enterprise
     */
    getCorpAccessToken(
      params: GetCorpAccessTokenParams,
    ): Promise<GetCorpAccessTokenResponse>
    /**
     * 获取用户token
     * @see https://developers.dingtalk.com/document/isvapp/obtain-user-token
     */
    getUserToken(params: GetUserTokenParams): Promise<GetUserTokenResponse>
    /**
     * 查询微应用后台免登的用户信息
     * @see https://developers.dingtalk.com/document/isvapp/obtains-the-identity-of-an-application-administrator
     */
    getSsoUserInfo(query: GetSsoUserInfoQuery): Promise<GetSsoUserInfoResponse>
  }
}
