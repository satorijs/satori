import { Tenant, TenantAssignInfo } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取企业席位信息接口
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant-product_assign_info/query
     */
    queryTenantTenantProductAssignInfo(): Promise<QueryTenantTenantProductAssignInfoResponse>
    /**
     * 获取企业信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant/query
     */
    queryTenant(): Promise<QueryTenantResponse>
  }
}

export interface QueryTenantTenantProductAssignInfoResponse {
  /** 租户待分配席位列表 */
  assign_info_list?: TenantAssignInfo[]
}

export interface QueryTenantResponse {
  /** 企业信息 */
  tenant?: Tenant
}

Internal.define({
  '/open-apis/tenant/v2/tenant/assign_info_list/query': {
    GET: 'queryTenantTenantProductAssignInfo',
  },
  '/open-apis/tenant/v2/tenant/query': {
    GET: 'queryTenant',
  },
})
