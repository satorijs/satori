import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    bitable: Bitable.Methods
  }
}

export namespace Bitable {
  export interface Methods {
    app: App.Methods
  }

  export namespace App {
    export interface Methods {
      table: Table.Methods
      dashboard: Dashboard.Methods
      role: Role.Methods
      workflow: Workflow.Methods
      /**
       * 创建多维表格
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 复制多维表格
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/copy
       */
      copy(app_token: string, body: CopyRequest): Promise<CopyResponse>
      /**
       * 获取多维表格元数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/get
       */
      get(app_token: string): Promise<GetResponse>
      /**
       * 更新多维表格元数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update
       */
      update(app_token: string, body: UpdateRequest): Promise<UpdateResponse>
    }

    export interface CreateRequest {
      /** 多维表格App名字 */
      name?: string
      /** 多维表格App归属文件夹 */
      folder_token?: string
      /** 文档时区，说明见：https://bytedance.feishu.cn/docx/YKRndTM7VoyDqpxqqeEcd67MnEf */
      time_zone?: string
    }

    export interface CreateResponse {
      app?: Lark.App
    }

    export interface CopyRequest {
      /** 多维表格 App 名字 */
      name?: string
      /** 多维表格 App 归属文件夹 */
      folder_token?: string
      /** 不复制文档内容，只复制文档结构 */
      without_content?: boolean
      /** 文档时区，说明见：https://bytedance.feishu.cn/docx/YKRndTM7VoyDqpxqqeEcd67MnEf */
      time_zone?: string
    }

    export interface CopyResponse {
      app?: Lark.App
    }

    export interface GetResponse {
      app?: Lark.DisplayApp
    }

    export interface UpdateRequest {
      /** 新的多维表格名字 */
      name?: string
      /** 多维表格是否开启高级权限 */
      is_advanced?: boolean
    }

    export interface UpdateResponse {
      app?: Lark.DisplayAppV2
    }

    export namespace Table {
      export interface Methods {
        view: View.Methods
        record: Record.Methods
        field: Field.Methods
        form: Form.Methods
        /**
         * 新增一个数据表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/create
         */
        create(app_token: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 新增多个数据表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_create
         */
        batchCreate(app_token: string, body: BatchCreateRequest, query?: BatchCreateQuery): Promise<BatchCreateResponse>
        /**
         * 更新数据表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/patch
         */
        patch(app_token: string, table_id: string, body: PatchRequest): Promise<PatchResponse>
        /**
         * 列出数据表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/list
         */
        list(app_token: string, query?: Pagination): Promise<ListResponse> & AsyncIterableIterator<Lark.AppTable>
        /**
         * 删除一个数据表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/delete
         */
        delete(app_token: string, table_id: string): Promise<void>
        /**
         * 删除多个数据表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_delete
         */
        batchDelete(app_token: string, body: BatchDeleteRequest): Promise<void>
      }

      export interface CreateRequest {
        /** 数据表 */
        table?: Lark.ReqTable
      }

      export interface CreateResponse {
        /** 数据表的唯一标识id */
        table_id?: string
        /** 默认表格视图的id，该字段仅在请求参数中填写了default_view_name或fields才会返回 */
        default_view_id?: string
        /** 数据表初始字段的id列表，该字段仅在请求参数中填写了fields才会返回 */
        field_id_list?: string[]
      }

      export interface BatchCreateRequest {
        /** tables */
        tables?: Lark.ReqTable[]
      }

      export interface BatchCreateQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface BatchCreateResponse {
        table_ids?: string[]
      }

      export interface PatchRequest {
        /** 数据表的新名称 */
        name?: string
      }

      export interface PatchResponse {
        /** 数据表的名称 */
        name?: string
      }

      export interface ListResponse {
        /** 是否有下一页数据 */
        has_more?: boolean
        /** 下一页分页的token */
        page_token?: string
        /** 总数 */
        total?: number
        items?: Lark.AppTable[]
      }

      export interface BatchDeleteRequest {
        /** 删除的多条tableid列表 */
        table_ids?: string[]
      }

      export namespace View {
        export interface Methods {
          /**
           * 新增视图
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/create
           */
          create(app_token: string, table_id: string, body: CreateRequest): Promise<CreateResponse>
          /**
           * 更新视图
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/patch
           */
          patch(app_token: string, table_id: string, view_id: string, body: PatchRequest): Promise<PatchResponse>
          /**
           * 列出视图
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/list
           */
          list(app_token: string, table_id: string, query?: ListQuery): Promise<ListResponse> & AsyncIterableIterator<Lark.AppTableView>
          /**
           * 获取视图
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/get
           */
          get(app_token: string, table_id: string, view_id: string): Promise<GetResponse>
          /**
           * 删除视图
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/delete
           */
          delete(app_token: string, table_id: string, view_id: string): Promise<void>
        }

        export interface CreateRequest {
          /** 视图名字 */
          view_name: string
          /** 视图类型 */
          view_type?: 'grid' | 'kanban' | 'gallery' | 'gantt' | 'form'
        }

        export interface CreateResponse {
          view?: Lark.AppTableView
        }

        export interface PatchRequest {
          /** 视图名称 */
          view_name?: string
          /** 视图属性 */
          property?: Lark.AppTableViewProperty
        }

        export interface PatchResponse {
          view?: Lark.AppTableView
        }

        export interface ListQuery extends Pagination {
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface ListResponse {
          /** 视图列表 */
          items?: Lark.AppTableView[]
          /** 下一页分页的token */
          page_token?: string
          /** 是否有下一页数据 */
          has_more?: boolean
          /** 总数 */
          total?: number
        }

        export interface GetResponse {
          view?: Lark.AppTableView
        }
      }

      export namespace Record {
        export interface Methods {
          /**
           * 新增记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/create
           */
          create(app_token: string, table_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
          /**
           * 更新记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/update
           */
          update(app_token: string, table_id: string, record_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
          /**
           * 查询记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/search
           */
          search(app_token: string, table_id: string, body: SearchRequest, query?: SearchQuery): Promise<SearchResponse> & AsyncIterableIterator<Lark.AppTableRecord>
          /**
           * 删除记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/delete
           */
          delete(app_token: string, table_id: string, record_id: string): Promise<DeleteResponse>
          /**
           * 新增多条记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_create
           */
          batchCreate(app_token: string, table_id: string, body: BatchCreateRequest, query?: BatchCreateQuery): Promise<BatchCreateResponse>
          /**
           * 更新多条记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_update
           */
          batchUpdate(app_token: string, table_id: string, body: BatchUpdateRequest, query?: BatchUpdateQuery): Promise<BatchUpdateResponse>
          /**
           * 批量获取记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_get
           */
          batchGet(app_token: string, table_id: string, body: BatchGetRequest): Promise<BatchGetResponse>
          /**
           * 删除多条记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_delete
           */
          batchDelete(app_token: string, table_id: string, body: BatchDeleteRequest): Promise<BatchDeleteResponse>
          /**
           * 检索记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/get
           */
          get(app_token: string, table_id: string, record_id: string, query?: GetQuery): Promise<GetResponse>
          /**
           * 列出记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/list
           */
          list(app_token: string, table_id: string, query?: ListQuery): Promise<ListResponse> & AsyncIterableIterator<Lark.AppTableRecord>
        }

        export interface CreateRequest {
          /** 记录字段 */
          fields: Record<string, unknown>
        }

        export interface CreateQuery {
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
          /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
          client_token?: string
          /** 用于控制一致性读写，默认开启检查 */
          ignore_consistency_check?: boolean
        }

        export interface CreateResponse {
          record?: Lark.AppTableRecord
        }

        export interface UpdateRequest {
          /** 记录字段 */
          fields: Record<string, unknown>
        }

        export interface UpdateQuery {
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
          /** 用于控制一致性读写，默认开启检查 */
          ignore_consistency_check?: boolean
        }

        export interface UpdateResponse {
          record?: Lark.AppTableRecord
        }

        export interface SearchRequest {
          /** 视图Id,指定视图id则按照视图的筛选排序结果返回数据 */
          view_id?: string
          /** 指定要返回的字段 */
          field_names?: string[]
          /** 排序条件 */
          sort?: Lark.Sort[]
          /** 筛选条件 */
          filter?: Lark.FilterInfo
          /** 控制是否返回自动计算的字段, true 表示返回 */
          automatic_fields?: boolean
        }

        export interface SearchQuery extends Pagination {
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface SearchResponse {
          /** record 结果 */
          items?: Lark.AppTableRecord[]
          /** 是否有下一页数据 */
          has_more?: boolean
          /** 下一页分页的token */
          page_token?: string
          /** 总数 */
          total?: number
        }

        export interface DeleteResponse {
          /** 是否成功删除 */
          deleted?: boolean
          /** 删除的记录id */
          record_id?: string
        }

        export interface BatchCreateRequest {
          /** 记录 */
          records: Lark.AppTableRecord[]
        }

        export interface BatchCreateQuery {
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
          /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
          client_token?: string
          /** 用于控制一致性读写，默认开启检查 */
          ignore_consistency_check?: boolean
        }

        export interface BatchCreateResponse {
          /** 本次请求新增的记录列表 */
          records?: Lark.AppTableRecord[]
        }

        export interface BatchUpdateRequest {
          /** 记录 */
          records: Lark.AppTableRecord[]
        }

        export interface BatchUpdateQuery {
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
          /** 用于控制一致性读写，默认开启检查 */
          ignore_consistency_check?: boolean
        }

        export interface BatchUpdateResponse {
          /** 更新后的记录 */
          records?: Lark.AppTableRecord[]
        }

        export interface BatchGetRequest {
          /** 记录 id 列表 */
          record_ids: string[]
          /** 此次调用中使用的用户 id 的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
          /** 控制是否返回记录的分享链接，true 表示返回分享链接 */
          with_shared_url?: boolean
          /** 控制是否返回自动计算的字段，true 表示返回 */
          automatic_fields?: boolean
        }

        export interface BatchGetResponse {
          /** 记录列表 */
          records?: Lark.AppTableRecord[]
          /** 禁止访问的记录列表(针对开启了高级权限的文档) */
          forbidden_record_ids?: string[]
          /** 不存在的记录列表 */
          absent_record_ids?: string[]
        }

        export interface BatchDeleteRequest {
          /** 删除的多条记录id列表 */
          records: string[]
        }

        export interface BatchDeleteResponse {
          /** 记录删除结果 */
          records?: Lark.DeleteRecord[]
        }

        export interface GetQuery {
          /** 控制多行文本字段数据的返回格式, true 表示以数组形式返回 */
          text_field_as_array?: boolean
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
          /** 控制公式、查找引用是否显示完整的原样返回结果 */
          display_formula_ref?: boolean
          /** 控制是否返回该记录的链接 */
          with_shared_url?: boolean
          /** 控制是否返回自动计算的字段，例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`，true 表示返回 */
          automatic_fields?: boolean
        }

        export interface GetResponse {
          record?: Lark.AppTableRecord
        }

        export interface ListQuery extends Pagination {
          /** 视图 id注意：如 filter 或 sort 有值，view_id 会被忽略。 */
          view_id?: string
          /** 筛选参数注意：1.筛选记录的表达式不超过2000个字符。2.不支持对“人员”以及“关联字段”的属性进行过滤筛选，如人员的 OpenID。3.仅支持字段在页面展示字符值进行筛选。详细请参考[记录筛选开发指南](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/filter) */
          filter?: string
          /** 排序参数注意：1.表达式需要不超过1000字符。2.不支持对带“公式”和“关联字段”的表的使用。3.使用引号将字段名称和顺序逆序连接起来。 */
          sort?: string
          /** 字段名称 */
          field_names?: string
          /** 控制多行文本字段数据的返回格式，true 表示以数组形式返回。注意：1.多行文本中如果有超链接部分，则会返回链接的 URL。2.目前可以返回多行文本中 URL 类型为多维表格链接、飞书 doc、飞书 sheet的URL类型以及@人员的数据结构。 */
          text_field_as_array?: boolean
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
          /** 控制公式、查找引用是否显示完整的原样返回结果 */
          display_formula_ref?: boolean
          /** 控制是否返回自动计算的字段，例如 `created_by`/`created_time`/`last_modified_by`/`last_modified_time`，true 表示返回 */
          automatic_fields?: boolean
        }

        export interface ListResponse {
          /** 是否有下一页数据 */
          has_more?: boolean
          /** 下一页分页的token */
          page_token?: string
          /** 总数 */
          total?: number
          items?: Lark.AppTableRecord[]
        }
      }

      export namespace Field {
        export interface Methods {
          /**
           * 新增字段
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/create
           */
          create(app_token: string, table_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
          /**
           * 更新字段
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/update
           */
          update(app_token: string, table_id: string, field_id: string, body: UpdateRequest): Promise<UpdateResponse>
          /**
           * 列出字段
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/list
           */
          list(app_token: string, table_id: string, query?: ListQuery): Promise<ListResponse> & AsyncIterableIterator<Lark.AppTableFieldForList>
          /**
           * 删除字段
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/delete
           */
          delete(app_token: string, table_id: string, field_id: string): Promise<DeleteResponse>
        }

        export const enum CreateRequestType {
          /** 多行文本（默认值）、条码 */
          Text = 1,
          /** 数字（默认值）、进度、货币、评分 */
          Number = 2,
          /** 单选 */
          SingleSelect = 3,
          /** 多选 */
          MultiSelect = 4,
          /** 日期 */
          DateTime = 5,
          /** 复选框 */
          Checkbox = 7,
          /** 人员 */
          User = 11,
          /** 电话号码 */
          PhoneNumber = 13,
          /** 超链接 */
          Url = 15,
          /** 附件 */
          Attachment = 17,
          /** 单向关联 */
          Link = 18,
          /** 公式 */
          Formula = 20,
          /** 双向关联 */
          DuplexLink = 21,
          /** 地理位置 */
          Location = 22,
          /** 群组 */
          GroupChat = 23,
          /** 创建时间 */
          CreatedTime = 1001,
          /** 最后更新时间 */
          ModifiedTime = 1002,
          /** 创建人 */
          CreatedUser = 1003,
          /** 修改人 */
          ModifiedUser = 1004,
          /** 自动编号 */
          AutoSerial = 1005,
        }

        export interface CreateRequest {
          /** 字段名 */
          field_name: string
          /** 字段类型 */
          type: CreateRequestType
          /** 字段属性 */
          property?: Lark.AppTableFieldProperty
          /** 字段的描述 */
          description?: Lark.AppTableFieldDescription
          /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
          ui_type?: 'Text' | 'Email' | 'Barcode' | 'Number' | 'Progress' | 'Currency' | 'Rating' | 'SingleSelect' | 'MultiSelect' | 'DateTime' | 'Checkbox' | 'User' | 'GroupChat' | 'Phone' | 'Url' | 'Attachment' | 'SingleLink' | 'Formula' | 'DuplexLink' | 'Location' | 'CreatedTime' | 'ModifiedTime' | 'CreatedUser' | 'ModifiedUser' | 'AutoNumber'
        }

        export interface CreateQuery {
          /** 格式为标准的 uuid，操作的唯一标识，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
          client_token?: string
        }

        export interface CreateResponse {
          field?: Lark.AppTableField
        }

        export const enum UpdateRequestType {
          /** 多行文本（默认值）、条码 */
          Text = 1,
          /** 数字（默认值）、进度、货币、评分 */
          Number = 2,
          /** 单选 */
          SingleSelect = 3,
          /** 多选 */
          MultiSelect = 4,
          /** 日期 */
          DateTime = 5,
          /** 复选框 */
          Checkbox = 7,
          /** 人员 */
          User = 11,
          /** 电话号码 */
          PhoneNumber = 13,
          /** 超链接 */
          Url = 15,
          /** 附件 */
          Attachment = 17,
          /** 单向关联 */
          Link = 18,
          /** 公式 */
          Formula = 20,
          /** 双向关联 */
          DuplexLink = 21,
          /** 地理位置 */
          Location = 22,
          /** 群组 */
          GroupChat = 23,
          /** 创建时间 */
          CreatedTime = 1001,
          /** 最后更新时间 */
          ModifiedTime = 1002,
          /** 创建人 */
          CreatedUser = 1003,
          /** 修改人 */
          ModifiedUser = 1004,
          /** 自动编号 */
          AutoSerial = 1005,
        }

        export interface UpdateRequest {
          /** 字段名 */
          field_name: string
          /** 字段类型 */
          type: UpdateRequestType
          /** 字段属性 */
          property?: Lark.AppTableFieldProperty
          /** 字段的描述 */
          description?: Lark.AppTableFieldDescription
          /** 字段在界面上的展示类型，例如进度字段是数字的一种展示形态 */
          ui_type?: 'Text' | 'Email' | 'Barcode' | 'Number' | 'Progress' | 'Currency' | 'Rating' | 'SingleSelect' | 'MultiSelect' | 'DateTime' | 'Checkbox' | 'User' | 'GroupChat' | 'Phone' | 'Url' | 'Attachment' | 'SingleLink' | 'Formula' | 'DuplexLink' | 'Location' | 'CreatedTime' | 'ModifiedTime' | 'CreatedUser' | 'ModifiedUser' | 'AutoNumber'
        }

        export interface UpdateResponse {
          field?: Lark.AppTableField
        }

        export interface ListQuery extends Pagination {
          /** 视图 ID */
          view_id?: string
          /** 控制字段描述（多行文本格式）数据的返回格式, true 表示以数组富文本形式返回 */
          text_field_as_array?: boolean
        }

        export interface ListResponse {
          /** 是否有下一页数据 */
          has_more?: boolean
          /** 下一页分页的token */
          page_token?: string
          /** 总数 */
          total?: number
          /** 字段列表 */
          items?: Lark.AppTableFieldForList[]
        }

        export interface DeleteResponse {
          /** 字段唯一标识id */
          field_id?: string
          /** 是否已删除 */
          deleted?: boolean
        }
      }

      export namespace Form {
        export interface Methods {
          field: Field.Methods
          /**
           * 更新表单元数据
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/patch
           */
          patch(app_token: string, table_id: string, form_id: string, body: PatchRequest): Promise<PatchResponse>
          /**
           * 获取表单元数据
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/get
           */
          get(app_token: string, table_id: string, form_id: string): Promise<GetResponse>
        }

        export interface PatchRequest {
          /** 表单名称 */
          name?: string
          /** 表单描述 */
          description?: string
          /** 是否开启共享 */
          shared?: boolean
          /** 分享范围限制 */
          shared_limit?: 'off' | 'tenant_editable' | 'anyone_editable'
          /** 填写次数限制一次 */
          submit_limit_once?: boolean
        }

        export interface PatchResponse {
          /** 表单元数据信息 */
          form: Lark.AppTableForm
        }

        export interface GetResponse {
          /** 表单元数据信息 */
          form: Lark.AppTableForm
        }

        export namespace Field {
          export interface Methods {
            /**
             * 更新表单问题
             * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/patch
             */
            patch(app_token: string, table_id: string, form_id: string, field_id: string, body: PatchRequest): Promise<PatchResponse>
            /**
             * 列出表单问题
             * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/list
             */
            list(app_token: string, table_id: string, form_id: string, query?: Pagination): Promise<ListResponse> & AsyncIterableIterator<Lark.AppTableFormField>
          }

          export interface PatchRequest {
            /** 上一个表单问题 ID */
            pre_field_id?: string
            /** 表单问题 */
            title?: string
            /** 问题描述 */
            description?: string
            /** 是否必填 */
            required?: boolean
            /** 是否可见 */
            visible?: boolean
          }

          export interface PatchResponse {
            /** 更新后的field值 */
            field?: Lark.AppTableFormPatchedField
          }

          export interface ListResponse {
            /** 表单内的字段列表 */
            items: Lark.AppTableFormField[]
            /** 下一页分页的token */
            page_token: string
            /** 是否有下一页 */
            has_more: boolean
            /** 总数 */
            total: number
          }
        }
      }
    }

    export namespace Dashboard {
      export interface Methods {
        /**
         * 复制仪表盘
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/copy
         */
        copy(app_token: string, block_id: string, body: CopyRequest): Promise<CopyResponse>
        /**
         * 列出仪表盘
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/list
         */
        list(app_token: string, query?: Pagination): Paginated<Lark.AppDashboard, 'dashboards'>
      }

      export interface CopyRequest {
        /** 仪表盘名称 */
        name: string
      }

      export interface CopyResponse {
        /** 多维表格 block_id */
        block_id?: string
        /** block 名称 */
        name?: string
      }
    }

    export namespace Role {
      export interface Methods {
        member: Member.Methods
        /**
         * 删除自定义角色
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/delete
         */
        delete(app_token: string, role_id: string): Promise<void>
        /**
         * 新增自定义角色
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create
         */
        create(app_token: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 列出自定义角色
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/list
         */
        list(app_token: string, query?: Pagination): Promise<ListResponse> & AsyncIterableIterator<Lark.AppRole>
        /**
         * 更新自定义角色
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/update
         */
        update(app_token: string, role_id: string, body: UpdateRequest): Promise<UpdateResponse>
      }

      export interface CreateRequest {
        /** 自定义权限的名字 */
        role_name: string
        /** 数据表权限 */
        table_roles: Lark.AppRoleTableRole[]
        /** block权限 */
        block_roles?: Lark.AppRoleBlockRole[]
      }

      export interface CreateResponse {
        role?: Lark.AppRole
      }

      export interface ListResponse {
        /** 角色列表 */
        items?: Lark.AppRole[]
        /** 下一页分页的token */
        page_token?: string
        /** 是否有下一页数据 */
        has_more?: boolean
        /** 总数 */
        total?: number
      }

      export interface UpdateRequest {
        /** 自定义权限的名字 */
        role_name: string
        /** 数据表权限 */
        table_roles: Lark.AppRoleTableRole[]
        /** block权限 */
        block_roles?: Lark.AppRoleBlockRole[]
      }

      export interface UpdateResponse {
        role?: Lark.AppRole
      }

      export namespace Member {
        export interface Methods {
          /**
           * 新增协作者
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/create
           */
          create(app_token: string, role_id: string, body: CreateRequest, query?: CreateQuery): Promise<void>
          /**
           * 批量新增协作者
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_create
           */
          batchCreate(app_token: string, role_id: string, body: BatchCreateRequest): Promise<void>
          /**
           * 列出协作者
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/list
           */
          list(app_token: string, role_id: string, query?: Pagination): Promise<ListResponse> & AsyncIterableIterator<Lark.AppRoleMember>
          /**
           * 删除协作者
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/delete
           */
          delete(app_token: string, role_id: string, member_id: string, query?: DeleteQuery): Promise<void>
          /**
           * 批量删除协作者
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_delete
           */
          batchDelete(app_token: string, role_id: string, body: BatchDeleteRequest): Promise<void>
        }

        export interface CreateRequest {
          /** 协作者id */
          member_id: string
        }

        export interface CreateQuery {
          /** 协作者id类型，与请求体中的member_id要对应 */
          member_id_type?: 'open_id' | 'union_id' | 'user_id' | 'chat_id' | 'department_id' | 'open_department_id'
        }

        export interface BatchCreateRequest {
          /** 协作者列表 */
          member_list: Lark.AppRoleMemberId[]
        }

        export interface ListResponse {
          /** 协作者列表 */
          items?: Lark.AppRoleMember[]
          /** 是否有下一页数据 */
          has_more?: boolean
          /** 下一页分页的token */
          page_token?: string
          /** 总数 */
          total?: number
        }

        export interface DeleteQuery {
          /** 协作者id类型，与请求体中的member_id要对应 */
          member_id_type?: 'open_id' | 'union_id' | 'user_id' | 'chat_id' | 'department_id' | 'open_department_id'
        }

        export interface BatchDeleteRequest {
          /** 协作者列表 */
          member_list: Lark.AppRoleMemberId[]
        }
      }
    }

    export namespace Workflow {
      export interface Methods {
        /**
         * 列出自动化流程
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-workflow/list
         */
        list(app_token: string, query?: Pagination): Promise<ListResponse>
        /**
         * 更新自动化流程状态
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-workflow/update
         */
        update(app_token: string, workflow_id: string, body: UpdateRequest): Promise<void>
      }

      export interface ListResponse {
        /** 自动化工作流信息 */
        workflows: Lark.AppWorkflow[]
      }

      export interface UpdateRequest {
        /** 自动化状态 */
        status: string
      }
    }
  }
}

Internal.define({
  '/bitable/v1/apps': {
    POST: 'bitable.app.create',
  },
  '/bitable/v1/apps/{app_token}/copy': {
    POST: 'bitable.app.copy',
  },
  '/bitable/v1/apps/{app_token}': {
    GET: 'bitable.app.get',
    PUT: 'bitable.app.update',
  },
  '/bitable/v1/apps/{app_token}/tables': {
    POST: 'bitable.app.table.create',
    GET: { name: 'bitable.app.table.list', pagination: { argIndex: 1 } },
  },
  '/bitable/v1/apps/{app_token}/tables/batch_create': {
    POST: 'bitable.app.table.batchCreate',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}': {
    PATCH: 'bitable.app.table.patch',
    DELETE: 'bitable.app.table.delete',
  },
  '/bitable/v1/apps/{app_token}/tables/batch_delete': {
    POST: 'bitable.app.table.batchDelete',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/views': {
    POST: 'bitable.app.table.view.create',
    GET: { name: 'bitable.app.table.view.list', pagination: { argIndex: 2 } },
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/views/{view_id}': {
    PATCH: 'bitable.app.table.view.patch',
    GET: 'bitable.app.table.view.get',
    DELETE: 'bitable.app.table.view.delete',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records': {
    POST: 'bitable.app.table.record.create',
    GET: { name: 'bitable.app.table.record.list', pagination: { argIndex: 2 } },
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/{record_id}': {
    PUT: 'bitable.app.table.record.update',
    DELETE: 'bitable.app.table.record.delete',
    GET: 'bitable.app.table.record.get',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/search': {
    POST: { name: 'bitable.app.table.record.search', pagination: { argIndex: 3 } },
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_create': {
    POST: 'bitable.app.table.record.batchCreate',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_update': {
    POST: 'bitable.app.table.record.batchUpdate',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_get': {
    POST: 'bitable.app.table.record.batchGet',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/records/batch_delete': {
    POST: 'bitable.app.table.record.batchDelete',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/fields': {
    POST: 'bitable.app.table.field.create',
    GET: { name: 'bitable.app.table.field.list', pagination: { argIndex: 2 } },
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/fields/{field_id}': {
    PUT: 'bitable.app.table.field.update',
    DELETE: 'bitable.app.table.field.delete',
  },
  '/bitable/v1/apps/{app_token}/dashboards/{block_id}/copy': {
    POST: 'bitable.app.dashboard.copy',
  },
  '/bitable/v1/apps/{app_token}/dashboards': {
    GET: { name: 'bitable.app.dashboard.list', pagination: { argIndex: 1, itemsKey: 'dashboards' } },
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}': {
    PATCH: 'bitable.app.table.form.patch',
    GET: 'bitable.app.table.form.get',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}/fields/{field_id}': {
    PATCH: 'bitable.app.table.form.field.patch',
  },
  '/bitable/v1/apps/{app_token}/tables/{table_id}/forms/{form_id}/fields': {
    GET: { name: 'bitable.app.table.form.field.list', pagination: { argIndex: 3 } },
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}': {
    DELETE: 'bitable.app.role.delete',
    PUT: 'bitable.app.role.update',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members': {
    POST: 'bitable.app.role.member.create',
    GET: { name: 'bitable.app.role.member.list', pagination: { argIndex: 2 } },
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members/batch_create': {
    POST: 'bitable.app.role.member.batchCreate',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members/{member_id}': {
    DELETE: 'bitable.app.role.member.delete',
  },
  '/bitable/v1/apps/{app_token}/roles/{role_id}/members/batch_delete': {
    POST: 'bitable.app.role.member.batchDelete',
  },
  '/bitable/v1/apps/{app_token}/workflows': {
    GET: 'bitable.app.workflow.list',
  },
  '/bitable/v1/apps/{app_token}/workflows/{workflow_id}': {
    PUT: 'bitable.app.workflow.update',
  },
  '/bitable/v1/apps/{app_token}/roles': {
    POST: 'bitable.app.role.create',
    GET: { name: 'bitable.app.role.list', pagination: { argIndex: 1 } },
  },
})
