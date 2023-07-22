import { Internal } from "../internal";
// GENERATED CONTENT

export interface AddRecentUserAppListParams {
  /** 组织CorpId */
  corpId: string;
  /** 最近使用应用列表 */
  usedAppDetailList: object[];
  /** 员工staffId */
  userId: string;
}

export interface AddRecentUserAppListResponse {
  result: unknown;
}

export interface GetPluginRuleCheckInfoQuery {
  /** 插件的appId。 */
  miniAppId?: string;
}

export interface GetPluginRuleCheckInfoResponse {
  packCode?: string;
  pluginRuleCheckDetail?: string;
}

export interface GetPluginPermissionPointQuery {
  /** 插件ID。 */
  miniAppId?: string;
}

export interface GetPluginPermissionPointResponse {
  permissionPointList?: string[];
}

// funcName: isOldApi
Internal.define({
  "/workbench/components/recentUsed/batch": {
    POST: { addRecentUserAppList: false },
  },
  "/workbench/plugins/validationRules": {
    GET: { getPluginRuleCheckInfo: false },
  },
  "/workbench/plugins/permissions": {
    GET: { getPluginPermissionPoint: false },
  },
});
declare module "../internal" {
  interface Internal {
    /**
     * 批量添加最近使用记录
     * @see https://developers.dingtalk.com/document/app/add-recently-used-apps-in-bulk
     */
    addRecentUserAppList(
      params: AddRecentUserAppListParams,
    ): Promise<AddRecentUserAppListResponse>;
    /**
     * 获取插件的校验规则
     * @see https://developers.dingtalk.com/document/dashboard/you-can-call-this-operation-to-obtain-the-information-about
     */
    getPluginRuleCheckInfo(
      query: GetPluginRuleCheckInfoQuery,
    ): Promise<GetPluginRuleCheckInfoResponse>;
    /**
     * 获取工作台插件的权限点
     * @see https://developers.dingtalk.com/document/dashboard/obtain-the-permissions-of-the-workbench-plug-in
     */
    getPluginPermissionPoint(
      query: GetPluginPermissionPointQuery,
    ): Promise<GetPluginPermissionPointResponse>;
  }
}
