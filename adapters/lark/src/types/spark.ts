import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    spark: Spark.Methods
  }
}

export namespace Spark {
  export interface Methods {
    app: App.Methods
    directory: Directory.Methods
  }

  export namespace App {
    export interface Methods {
      table: Table.Methods
      view: View.Methods
      enum: Enum.Methods
      storage: Storage.Methods
      /**
       * 执行 SQL
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app/sql_commands
       */
      sqlCommands(app_id: string, body: SqlCommandsRequest, query?: SqlCommandsQuery): Promise<SqlCommandsResponse>
    }

    export interface SqlCommandsRequest {
      /** 要执行的 SQL 语句 */
      sql: string
    }

    export interface SqlCommandsQuery {
      /** 访问的 database 环境，默认为 online（线上环境） */
      env?: string
    }

    export interface SqlCommandsResponse {
      /** 如果是 SELECT 命令，返回的是查询结果的 JSON 序列化字符串。如果是其他无返回的命令，如 DELETE 等，result 为空 */
      result: string
    }

    export namespace Table {
      export interface Methods {
        /**
         * 获取数据表列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-table/get_table_list
         */
        getTableList(app_id: string, query?: GetTableListQuery): Paginated<Lark.AppTable>
        /**
         * 获取数据表详细信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-table/get_table_detail
         */
        getTableDetail(app_id: string, table_name: string, query?: GetTableDetailQuery): Promise<GetTableDetailResponse>
        /**
         * 查询数据表数据记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-table/get_table_record_list
         */
        getTableRecordList(app_id: string, table_name: string, query?: GetTableRecordListQuery): Promise<GetTableRecordListResponse>
        /**
         * 向数据表中添加或更新记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-table/post_table_records
         */
        postTableRecords(app_id: string, table_name: string, body: PostTableRecordsRequest, query?: PostTableRecordsQuery): Promise<PostTableRecordsResponse>
        /**
         * 按条件更新数据表中的记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-table/patch_table_records
         */
        patchTableRecords(app_id: string, table_name: string, body: PatchTableRecordsRequest, query?: PatchTableRecordsQuery): Promise<PatchTableRecordsResponse>
        /**
         * 批量更新数据表中的记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-table/batch_update_table_records
         */
        batchUpdateTableRecords(app_id: string, table_name: string, body: BatchUpdateTableRecordsRequest, query?: BatchUpdateTableRecordsQuery): Promise<BatchUpdateTableRecordsResponse>
        /**
         * 删除数据表中的记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-table/delete_table_records
         */
        deleteTableRecords(app_id: string, table_name: string, query?: DeleteTableRecordsQuery): Promise<void>
      }

      export interface GetTableListQuery extends Pagination {
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
      }

      export interface GetTableDetailQuery {
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
      }

      export interface GetTableDetailResponse {
        /** 数据表名，如 student */
        name: string
        /** 数据表描述 */
        description: string
        /** 数据表列 */
        columns: Lark.AppTableColumn[]
      }

      export interface GetTableRecordListQuery extends Pagination {
        /**
         * 返回的列，默认为 *，即返回所有列。
         * 遵循 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#vertical-filtering
         */
        select?: string
        /** 筛选条件，尊许 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#horizontal-filtering */
        filter?: string
        /**
         * 排序条件，如果没指定 asc/desc，默认为 asc，null 值可排在最前或最后。
         * 尊许 PostgREST 语法，详情可查看
         * https://docs.postgrest.org/en/v13/references/api/tables_views.html#ordering
         */
        order?: string
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
        /**
         * 此次调用使用的用户 ID 类型，将使用指定的 ID 来标示某个用户在接口入参和出参中的值。
         * 示例值：`miaoda_user_id`
         * 可选值：
         * - `miaoda_user_id`：标识一个用户在飞书开发套件应用中的身份。示例值：1838493619298330
         * - `open_id`：标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。示例值：ou_bdbbd8f3f919829064b3ffc1b9476105 了解更多：如何获取 Open ID
         * - `union_id`：标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。示例值：on_b1b44199e8f3def4ebda5355409e2033 了解更多：如何获取 Union ID？
         * 默认值：`miaoda_user_id`
         */
        user_identifier_type?: string
      }

      export interface GetTableRecordListResponse {
        /** 是否还有更多项 */
        has_more: boolean
        /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
        page_token: string
        /** 符合条件的记录总数 */
        total: number
        /** 数据记录列表，格式为数组序列化后的 JSONString */
        items: string
      }

      export interface PostTableRecordsRequest {
        /** 要插入的数据记录列表，单次支持最多 500 条 */
        records: string
      }

      export interface PostTableRecordsQuery {
        /** UPSERT 时使用，指定列，多列英文逗号拼接 */
        columns?: string
        /**
         * UPSERT 时使用，指定使用哪一个或多个具有唯一约束的字段作为冲突判断依据，默认为表主键。
         * 假设 user_products 表有一个由 user_id 和 product_id 组成的复合唯一约束
         */
        on_conflict?: string
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
        /**
         * 此次调用使用的用户 ID 类型，将使用指定的 ID 来标示某个用户在接口入参和出参中的值。
         * 示例值：`miaoda_user_id`
         * 可选值：
         * - `miaoda_user_id`：标识一个用户在飞书开发套件应用中的身份。示例值：1838493619298330
         * - `open_id`：标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。示例值：ou_bdbbd8f3f919829064b3ffc1b9476105 了解更多：如何获取 Open ID
         * - `union_id`：标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。示例值：on_b1b44199e8f3def4ebda5355409e2033 了解更多：如何获取 Union ID？
         * 默认值：`miaoda_user_id`
         */
        user_identifier_type?: string
      }

      export interface PostTableRecordsResponse {
        /** 按照记录顺序创建或更新的记录 ID 列表 */
        record_ids: Lark.Uuid[]
      }

      export interface PatchTableRecordsRequest {
        /** 要更新的数据记录信息 */
        record: string
      }

      export interface PatchTableRecordsQuery {
        /** 筛选条件，尊许 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#horizontal-filtering */
        filter: string
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
        /**
         * 此次调用使用的用户 ID 类型，将使用指定的 ID 来标示某个用户在接口入参和出参中的值。
         * 示例值：`miaoda_user_id`
         * 可选值：
         * - `miaoda_user_id`：标识一个用户在飞书开发套件应用中的身份。示例值：1838493619298330
         * - `open_id`：标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。示例值：ou_bdbbd8f3f919829064b3ffc1b9476105 了解更多：如何获取 Open ID
         * - `union_id`：标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。示例值：on_b1b44199e8f3def4ebda5355409e2033 了解更多：如何获取 Union ID？
         * 默认值：`miaoda_user_id`
         */
        user_identifier_type?: string
      }

      export interface PatchTableRecordsResponse {
        /** 更新的记录唯一ID列表 */
        record_ids: Lark.Uuid[]
      }

      export interface BatchUpdateTableRecordsRequest {
        /** 要更新的数据记录列表，单次支持最多 500条，每行 record 都必须包含主键 _id，且不同行要更新的字段需保持一致 */
        records: string
      }

      export interface BatchUpdateTableRecordsQuery {
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
        /**
         * 此次调用使用的用户 ID 类型，将使用指定的 ID 来标示某个用户在接口入参和出参中的值。
         * 示例值：`miaoda_user_id`
         * 可选值：
         * - `miaoda_user_id`：标识一个用户在飞书开发套件应用中的身份。示例值：1838493619298330
         * - `open_id`：标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。示例值：ou_bdbbd8f3f919829064b3ffc1b9476105 了解更多：如何获取 Open ID
         * - `union_id`：标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。示例值：on_b1b44199e8f3def4ebda5355409e2033 了解更多：如何获取 Union ID？
         * 默认值：`miaoda_user_id`
         */
        user_identifier_type?: string
      }

      export interface BatchUpdateTableRecordsResponse {
        /** 更新的记录唯一ID列表 */
        record_ids: Lark.Uuid[]
      }

      export interface DeleteTableRecordsQuery {
        /**
         * 筛选条件，尊许 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#horizontal-filtering
         * 此处用法和查询数据记录一致
         */
        filter: string
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
      }
    }

    export namespace View {
      export interface Methods {
        /**
         * 查询视图数据记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-view/get_view_record_list
         */
        getViewRecordList(app_id: string, view_name: string, query?: GetViewRecordListQuery): Promise<GetViewRecordListResponse>
      }

      export interface GetViewRecordListQuery extends Pagination {
        /**
         * 返回的列，默认为 *，即返回所有列。
         * 遵循 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#vertical-filtering
         */
        select?: string
        /** 筛选条件，尊许 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#horizontal-filtering */
        filter?: string
        /**
         * 排序条件，如果没指定 asc/desc，默认为 asc，null 值可排在最前或最后。
         * 尊许 PostgREST 语法，详情可查看
         * https://docs.postgrest.org/en/v13/references/api/tables_views.html#ordering
         */
        order?: string
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
        /**
         * 此次调用使用的用户 ID 类型，将使用指定的 ID 来标示某个用户在接口入参和出参中的值。
         * 示例值：`miaoda_user_id`
         * 可选值：
         * - `miaoda_user_id`：标识一个用户在飞书开发套件应用中的身份。示例值：1838493619298330
         * - `open_id`：标识一个用户在某个应用中的身份。同一个用户在不同应用中的 Open ID 不同。示例值：ou_bdbbd8f3f919829064b3ffc1b9476105 了解更多：如何获取 Open ID
         * - `union_id`：标识一个用户在某个应用开发商下的身份。同一用户在同一开发商下的应用中的 Union ID 是相同的，在不同开发商下的应用中的 Union ID 是不同的。通过 Union ID，应用开发商可以把同个用户在多个应用中的身份关联起来。示例值：on_b1b44199e8f3def4ebda5355409e2033 了解更多：如何获取 Union ID？
         * 默认值：`miaoda_user_id`
         */
        user_identifier_type?: string
      }

      export interface GetViewRecordListResponse {
        /** 是否还有更多项 */
        has_more: boolean
        /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
        page_token: string
        /** 符合条件的记录总数 */
        total: number
        /** 数据记录列表，格式为数组序列化后的 JSONString */
        items: string
      }
    }

    export namespace Enum {
      export interface Methods {
        /**
         * 获取自定义枚举列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-enum/get_enum_list
         */
        getEnumList(app_id: string, query?: GetEnumListQuery): Paginated<Lark.AppEnum>
        /**
         * 获取自定义枚举详细信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-enum/get_enum_detail
         */
        getEnumDetail(app_id: string, enum_name: string, query?: GetEnumDetailQuery): Promise<GetEnumDetailResponse>
      }

      export interface GetEnumListQuery extends Pagination {
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
      }

      export interface GetEnumDetailQuery {
        /** 访问的 database 环境，默认为 online（线上环境） */
        env?: string
      }

      export interface GetEnumDetailResponse {
        /** 枚举名称 */
        name: string
        /** 枚举描述 */
        description: string
        /** 枚举值列表 */
        options: string[]
        /** 创建时间，毫秒时间戳 */
        created_at: string
      }
    }

    export namespace Storage {
      export interface Methods {
        /**
         * 上传文件
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-storage/upload
         */
        upload(app_id: string, form: UploadForm): Promise<UploadResponse>
        /**
         * 下载文件
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/app-storage/download
         */
        download(app_id: string, query?: DownloadQuery): Promise<ArrayBuffer>
      }

      export interface UploadForm {
        /** 文件名称 */
        file_name: string
        /** 文件的十六进制 SHA-256 值，用于文件一致性校验。如果传入此值，服务端会在上传完成后对比接收到文件的 SHA-256 值，如果不一致，会返回上传失败。 */
        check_sum?: string
        /** 文件二进制 */
        file: Blob
      }

      export interface UploadResponse {
        /** 文件 ID */
        file_key: string
        /** 文件 URL，相对路径 */
        file_url: string
        /** 文件名称 */
        file_name: string
        /** 文件大小，单位字节 */
        file_size: number
        /** 文件 MIME 类型 */
        mime_type: string
      }

      export interface DownloadQuery {
        /** 文件 ID，ID 和 URL 不能同时为空，都提供的情况下，使用 file_key */
        file_key?: string
        /** 文件 URL，ID 和 URL 不能同时为空 */
        file_url?: string
      }
    }
  }

  export namespace Directory {
    export interface Methods {
      user: User.Methods
    }

    export namespace User {
      export interface Methods {
        /**
         * 妙搭和飞书用户 ID 转换
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/spark-v1/directory-user/id_convert
         */
        idConvert(body: IdConvertRequest): Promise<IdConvertResponse>
      }

      export interface IdConvertRequest {
        /** ID 转换类型，枚举 */
        id_convert_type: Lark.IdConvertType
        /** 长度最大100 */
        ids?: string[]
      }

      export interface IdConvertResponse {
        /** ID 映射，查询不到或者查询出错的不返回 */
        items?: Lark.IdMapItem[]
      }
    }
  }
}

Internal.define({
  '/spark/v1/apps/{app_id}/tables': {
    GET: { name: 'spark.app.table.getTableList', pagination: { argIndex: 1 } },
  },
  '/spark/v1/apps/{app_id}/tables/{table_name}': {
    GET: 'spark.app.table.getTableDetail',
  },
  '/spark/v1/apps/{app_id}/tables/{table_name}/records': {
    GET: 'spark.app.table.getTableRecordList',
    POST: 'spark.app.table.postTableRecords',
    PATCH: 'spark.app.table.patchTableRecords',
    DELETE: 'spark.app.table.deleteTableRecords',
  },
  '/spark/v1/apps/{app_id}/tables/{table_name}/records_batch_update': {
    PATCH: 'spark.app.table.batchUpdateTableRecords',
  },
  '/spark/v1/apps/{app_id}/views/{view_name}/records': {
    GET: 'spark.app.view.getViewRecordList',
  },
  '/spark/v1/apps/{app_id}/enums': {
    GET: { name: 'spark.app.enum.getEnumList', pagination: { argIndex: 1 } },
  },
  '/spark/v1/apps/{app_id}/enums/{enum_name}': {
    GET: 'spark.app.enum.getEnumDetail',
  },
  '/spark/v1/apps/{app_id}/storage/upload': {
    POST: { name: 'spark.app.storage.upload', multipart: true },
  },
  '/spark/v1/apps/{app_id}/storage': {
    GET: { name: 'spark.app.storage.download', type: 'binary' },
  },
  '/spark/v1/apps/{app_id}/sql_commands': {
    POST: 'spark.app.sqlCommands',
  },
  '/spark/v1/directory/user/id_convert': {
    POST: 'spark.directory.user.idConvert',
  },
})
