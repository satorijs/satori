import { BlockRole, Role, TableRole } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 新增自定义角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/create
     */
    createBaseAppRole(app_token: string, body: CreateBaseAppRoleRequest): Promise<CreateBaseAppRoleResponse>
    /**
     * 更新自定义角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/update
     */
    updateBaseAppRole(app_token: string, role_id: string, body: UpdateBaseAppRoleRequest): Promise<UpdateBaseAppRoleResponse>
    /**
     * 列出自定义角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/list
     */
    listBaseAppRole(app_token: string, query?: Pagination): Promise<ListBaseAppRoleResponse> & AsyncIterableIterator<Role>
  }
}

export interface CreateBaseAppRoleRequest {
  /** 自定义权限的名字 */
  role_name: string
  /** 数据表权限 */
  table_roles: TableRole[]
  /** block权限 */
  block_roles?: BlockRole[]
  /** base权限 */
  base_rule?: Record<string, number>
}

export interface CreateBaseAppRoleResponse {
  /** 自定义权限 */
  role?: Role
}

export interface UpdateBaseAppRoleRequest {
  /** 自定义权限的名字 */
  role_name: string
  /** 数据表权限 */
  table_roles: TableRole[]
  /** block权限 */
  block_roles?: BlockRole[]
  /** base权限 */
  base_rule?: Record<string, number>
}

export interface UpdateBaseAppRoleResponse {
  /** 自定义角色 */
  role?: Role
}

export interface ListBaseAppRoleResponse {
  /** 自定义角色列表 */
  items?: Role[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
  /** 总数 */
  total?: number
}

Internal.define({
  '/base/v2/apps/{app_token}/roles': {
    POST: 'createBaseAppRole',
    GET: { name: 'listBaseAppRole', pagination: { argIndex: 1 } },
  },
  '/base/v2/apps/{app_token}/roles/{role_id}': {
    PUT: 'updateBaseAppRole',
  },
})
