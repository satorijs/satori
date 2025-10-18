import * as Lark from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    base: Base.Methods
  }
}

export namespace Base {
  export interface Methods {
    app: App.Methods
  }

  export namespace App {
    export interface Methods {
      role: Role.Methods
    }

    export namespace Role {
      export interface Methods {
        /**
         * 新增自定义角色
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/create
         */
        create(app_token: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 更新自定义角色
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/update
         */
        update(app_token: string, role_id: string, body: UpdateRequest): Promise<UpdateResponse>
        /**
         * 列出自定义角色
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/advanced-permission/base-v2/app-role/list
         */
        list(app_token: string, query?: Pagination): Promise<ListResponse> & AsyncIterableIterator<Lark.Role>
      }

      export interface CreateRequest {
        /** 自定义权限的名字 */
        role_name: string
        /** 数据表权限 */
        table_roles: Lark.TableRole[]
        /** block权限 */
        block_roles?: Lark.BlockRole[]
        /** base权限 */
        base_rule?: Record<string, number>
      }

      export interface CreateResponse {
        /** 自定义权限 */
        role?: Lark.Role
      }

      export interface UpdateRequest {
        /** 自定义权限的名字 */
        role_name: string
        /** 数据表权限 */
        table_roles: Lark.TableRole[]
        /** block权限 */
        block_roles?: Lark.BlockRole[]
        /** base权限 */
        base_rule?: Record<string, number>
      }

      export interface UpdateResponse {
        /** 自定义角色 */
        role?: Lark.Role
      }

      export interface ListResponse {
        /** 自定义角色列表 */
        items?: Lark.Role[]
        /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
        page_token?: string
        /** 是否还有更多项 */
        has_more?: boolean
        /** 总数 */
        total?: number
      }
    }
  }
}

Internal.define({
  '/base/v2/apps/{app_token}/roles': {
    POST: 'base.app.role.create',
    GET: { name: 'base.app.role.list', pagination: { argIndex: 1 } },
  },
  '/base/v2/apps/{app_token}/roles/{role_id}': {
    PUT: 'base.app.role.update',
  },
})
