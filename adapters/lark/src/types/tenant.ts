import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    tenant: Tenant.Methods
  }
}

export namespace Tenant {
  export interface Methods {
    productAssignInfo: ProductAssignInfo.Methods
    /**
     * 获取企业信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant/query
     */
    query(): Promise<QueryResponse>
  }

  export interface QueryResponse {
    /** 企业信息 */
    tenant?: Lark.Tenant
  }

  export namespace ProductAssignInfo {
    export interface Methods {
      /**
       * 获取企业席位信息接口
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/tenant-v2/tenant-product_assign_info/query
       */
      query(): Promise<QueryResponse>
    }

    export interface QueryResponse {
      /** 租户待分配席位列表 */
      assign_info_list?: Lark.TenantAssignInfo[]
    }
  }
}

Internal.define({
  '/tenant/v2/tenant/assign_info_list/query': {
    GET: 'tenant.productAssignInfo.query',
  },
  '/tenant/v2/tenant/query': {
    GET: 'tenant.query',
  },
})
