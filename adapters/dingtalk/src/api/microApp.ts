import { Internal } from '../internal'
// GENERATED CONTENT

export interface RollbackInnerAppVersionParams {
  /** 小程序版本id，用于唯一标识小程序版本信息。可通过调用服务端API-[获取企业内部小程序历史版本列表](https://open.dingtalk.com/document/orgapp/obtain-the-list-of-historical-versions-of-enterprise-internal-applets)接口，获取返回参数中`appVersionId`字段值。 */
  appVersionId: number
  /** 操作人的unionId。可调用[查询用户详情](https://open.dingtalk.com/document/orgapp/query-user-details)接口获取`unionId`参数值。 */
  opUnionId: string
}

export interface RollbackInnerAppVersionResponse {
  result?: unknown
}

export interface PublishInnerAppVersionParams {
  appVersionId: number
  /** 操作人的unionId。 */
  opUnionId: string
  /** 小程序发布类型，取值： */
  publishType?: string
  /** 是否支持PC端打开小程序，取值： */
  miniAppOnPc?: unknown
}

export interface PublishInnerAppVersionResponse {
  result?: unknown
}

export interface PageInnerAppHistoryVersionQuery {
  /** 当前页。 */
  pageNumber: number
  /** 本次读取的最大数据记录数量。 */
  pageSize: number
}

export interface PageInnerAppHistoryVersionResponse {
  totalCount?: number
  miniAppVersionList?: {
    appVersionId: number
    miniAppId?: string
    appVersion: string
    appVersionType: number
    miniAppOnPc: number
    createTime: string
    modifyTime: string
  }[]
}

export interface ListInnerAppVersionResponse {
  appVersionList?: {
    appVersionId: number
    miniAppId: string
    appVersion: string
    appVersionType: number
    miniAppOnPc?: number
    createTime: string
    modifyTime: string
    entranceLink?: string
  }[]
}

export interface ListAllInnerAppsResponse {
  appList?: {
    agentId: number
    name?: string
    desc?: string
    icon?: string
    homepageLink?: string
    pcHomepageLink?: string
    ompLink?: string
    appId: number
    appStatus: number
    developType: number
  }[]
}

export interface GetMicroAppScopeResponse {
  result?: {
    userIds: number
    deptIds: number
    roleIds: number
    onlyAdminVisible: number
  }
}

export interface SetMicroAppScopeParams {
  /** 增加的可使用用户userId列表，最大长度100。 */
  addUserIds?: string[]
  /** 删除的可使用用户userId列表，最大长度100。 */
  delUserIds?: string[]
  /** 增加的可使用部门ID列表，最大长度100。 */
  addDeptIds?: number[]
  /** 删除的可使用部门ID列表，最大长度100。 */
  delDeptIds?: number[]
  /** 用户角色ID， */
  addRoleIds?: number[]
  /** 删除的可使用角色列表，通过[获取角色列表](https://open.dingtalk.com/document/orgapp-server/obtains-a-list-of-enterprise-roles)接口获取，最大长度100。 */
  delRoleIds?: number[]
  /** 是否仅管理员可使用。 */
  onlyAdminVisible?: unknown
}

export interface SetMicroAppScopeResponse {
  result?: unknown
}

export interface ListUserVilebleAppResponse {
  appList?: {
    agentId: number
    name?: string
    desc?: string
    icon?: string
    homepageLink?: string
    pcHomepageLink?: string
    ompLink?: string
    appId: number
    appStatus: number
    developType: number
  }[]
}

export interface ListAllAppResponse {
  appList?: {
    agentId: number
    name?: string
    desc?: string
    icon?: string
    homepageLink?: string
    pcHomepageLink?: string
    ompLink?: string
    appId: number
    appStatus: number
    developType: number
  }[]
}

export interface DeleteInnerAppQuery {
  /** 操作人的unionId，可调用[查询用户详情](https://open.dingtalk.com/document/orgapp/query-user-details)接口获取unionid参数值。 */
  opUnionId: string
}

export interface DeleteInnerAppResponse {
  result?: unknown
}

export interface UpdateInnerAppParams {
  /** 操作更新的员工unionId，可调用[查询用户信息](https://open.dingtalk.com/document/orgapp/query-user-details)接口获取unionid参数值。 */
  opUnionId: string
  /** 应用名称，名称可以由中文、数字以及字母组成，长度范围要求2-20个字符。 */
  name?: string
  /** 应用描述，最大长度200个字符。 */
  desc?: string
  /** 应用图标，可调用[上传媒体文件](https://open.dingtalk.com/document/orgapp/upload-media-files)接口获取media_id参数值。 */
  icon?: string
  /** 应用首页地址，请输入http或https开头的网址链接。 */
  homepageLink?: string
  /** 应用PC端地址，请输入http或https开头的链接。 */
  pcHomepageLink?: string
  /** 应用管理后台地址，输入http或https开头的链接。 */
  ompLink?: string
  /** 服务器出口ip白名单，支持带一个*号通配符的IP格式。 */
  ipWhiteList?: string[]
}

export interface UpdateInnerAppResponse {
  result?: unknown
}

export interface CreateInnerAppParams {
  /** 操作人的unionId，该用户必须是拥有**应用管理权限**的管理员，可调用[查询用户详情](https://open.dingtalk.com/document/orgapp/query-user-details)接口获取unionid参数值。 */
  opUnionId: string
  /** 应用名称。 */
  name: string
  /** 应用描述。 */
  desc: string
  /** 应用图标media，调用[上传媒体文件](https://open.dingtalk.com/document/orgapp/upload-media-files)接口获取media_id参数值。 */
  icon?: string
  /** 应用首页地址。 */
  homepageLink?: string
  /** 应用PC端地址。 */
  pcHomepageLink?: string
  /** 应用管理后台地址。 */
  ompLink?: string
  /** 服务器出口IP白名单列表，最大值50。 */
  ipWhiteList?: string[]
  /** 权限类型，目前只支持BASE。 */
  scopeType?: string
  /** 创建的内部应用类型：【默认为0】 */
  developType?: number
}

export interface CreateInnerAppResponse {
  agentId?: number
  appKey?: string
  appSecret?: string
}

// funcName: isOldApi
Internal.define({
  '/microApp/innerMiniApps/{agentId}/versions/rollback': {
    POST: { rollbackInnerAppVersion: false },
  },
  '/microApp/innerMiniApps/{agentId}/versions/publish': {
    POST: { publishInnerAppVersion: false },
  },
  '/microApp/innerMiniApps/{agentId}/historyVersions': {
    GET: { pageInnerAppHistoryVersion: false },
  },
  '/microApp/innerMiniApps/{agentId}/versions': {
    GET: { listInnerAppVersion: false },
  },
  '/microApp/allInnerApps': { GET: { listAllInnerApps: false } },
  '/microApp/apps/{agentId}/scopes': {
    GET: { getMicroAppScope: false },
    POST: { setMicroAppScope: false },
  },
  '/microApp/users/{userId}/apps': { GET: { listUserVilebleApp: false } },
  '/microApp/allApps': { GET: { listAllApp: false } },
  '/microApp/apps/{agentId}': {
    DELETE: { deleteInnerApp: false },
    PUT: { updateInnerApp: false },
  },
  '/microApp/apps': { POST: { createInnerApp: false } },
})
declare module '../internal' {
  interface Internal {
    /**
     * 回滚企业内部小程序版本
     * @see https://developers.dingtalk.com/document/app/rollback-of-enterprise-internal-applet-version
     */
    rollbackInnerAppVersion(
      agentId: number,
      params: RollbackInnerAppVersionParams,
    ): Promise<RollbackInnerAppVersionResponse>
    /**
     * 发布企业内部小程序版本
     * @see https://developers.dingtalk.com/document/orgapp/release-internal-applet-version
     */
    publishInnerAppVersion(
      agentId: number,
      params: PublishInnerAppVersionParams,
    ): Promise<PublishInnerAppVersionResponse>
    /**
     * 获取企业内部小程序历史版本列表
     * @see https://developers.dingtalk.com/document/orgapp/obtain-the-list-of-historical-versions-of-enterprise-internal-applets
     */
    pageInnerAppHistoryVersion(
      agentId: number,
      query: PageInnerAppHistoryVersionQuery,
    ): Promise<PageInnerAppHistoryVersionResponse>
    /**
     * 获取企业内部小程序的版本列表
     * @see https://developers.dingtalk.com/document/orgapp/get-the-version-list-of-the-enterprise-internal-applet
     */
    listInnerAppVersion(agentId: number): Promise<ListInnerAppVersionResponse>
    /**
     * 获取企业所有内部应用列表
     * @see https://developers.dingtalk.com/document/orgapp/get-a-list-of-all-applications-inside-the-enterprise
     */
    listAllInnerApps(): Promise<ListAllInnerAppsResponse>
    /**
     * 获取企业内部应用微应用的可使用范围
     * @see https://developers.dingtalk.com/document/orgapp/obtains-the-application-visible-range
     */
    getMicroAppScope(agentId: number): Promise<GetMicroAppScopeResponse>
    /**
     * 更新企业内部应用微应用的可使用范围
     * @see https://developers.dingtalk.com/document/orgapp/update-the-visible-range-of-micro-applications
     */
    setMicroAppScope(
      agentId: number,
      params: SetMicroAppScopeParams,
    ): Promise<SetMicroAppScopeResponse>
    /**
     * 获取用户可见的企业应用列表
     * @see https://developers.dingtalk.com/document/orgapp/obtains-the-list-of-enterprise-applications-visible-to-a-user
     */
    listUserVilebleApp(userId: string): Promise<ListUserVilebleAppResponse>
    /**
     * 获取企业所有应用列表
     * @see https://developers.dingtalk.com/document/orgapp/obtains-a-list-of-all-enterprise-applications
     */
    listAllApp(): Promise<ListAllAppResponse>
    /**
     * 删除企业内部应用
     * @see https://developers.dingtalk.com/document/app/delete-an-internal-h5-application
     */
    deleteInnerApp(
      agentId: number,
      query: DeleteInnerAppQuery,
    ): Promise<DeleteInnerAppResponse>
    /**
     * 更新企业内部应用
     * @see https://developers.dingtalk.com/document/app/update-internal-h5-applications
     */
    updateInnerApp(
      agentId: number,
      params: UpdateInnerAppParams,
    ): Promise<UpdateInnerAppResponse>
    /**
     * 创建企业内部应用
     * @see https://developers.dingtalk.com/document/app/create-an-h5-application-for-your-enterprise
     */
    createInnerApp(
      params: CreateInnerAppParams,
    ): Promise<CreateInnerAppResponse>
  }
}
