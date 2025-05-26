import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    docx: Docx.Methods
  }
}

export namespace Docx {
  export interface Methods {
    chat: Chat.Methods
    document: Document.Methods
  }

  export namespace Chat {
    export interface Methods {
      announcement: Announcement.Methods
    }

    export namespace Announcement {
      export interface Methods {
        block: Block.Methods
        /**
         * 获取群公告基本信息
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement/get
         */
        get(chat_id: string, query?: GetQuery): Promise<GetResponse>
      }

      export interface GetQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface GetResponse {
        /** 当前版本号 */
        revision_id?: number
        /** 群公告生成的时间戳（秒） */
        create_time?: string
        /** 群公告更新的时间戳（秒） */
        update_time?: string
        /** 群公告所有者 ID，ID 值与 owner_id_type 中的ID类型对应 */
        owner_id?: string
        /** 群公告所有者的 ID 类型 */
        owner_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 群公告最新修改者 ID，ID 值与 modifier_id_type 中的ID类型对应 */
        modifier_id?: string
        /** 群公告最新修改者 id 类型 */
        modifier_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 群公告类型 */
        announcement_type?: 'docx' | 'doc'
      }

      export namespace Block {
        export interface Methods {
          children: Children.Methods
          /**
           * 获取群公告所有块
           * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/list
           */
          list(chat_id: string, query?: ListQuery): Paginated<Lark.Block>
          /**
           * 批量更新群公告块的内容
           * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/batch_update
           */
          batchUpdate(chat_id: string, body: BatchUpdateRequest, query?: BatchUpdateQuery): Promise<BatchUpdateResponse>
          /**
           * 获取群公告块的内容
           * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/get
           */
          get(chat_id: string, block_id: string, query?: GetQuery): Promise<GetResponse>
        }

        export interface ListQuery extends Pagination {
          /** 查询的群公告版本，-1 表示群公告最新版本。群公告创建后，版本为 1。若查询的版本为群公告最新版本，则需要持有群公告的阅读权限；若查询的版本为群公告的历史版本，则需要持有群公告的编辑权限。 */
          revision_id?: number
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface BatchUpdateRequest {
          /** 批量更新 Block */
          requests?: Lark.UpdateBlockRequest[]
        }

        export interface BatchUpdateQuery {
          /** 要操作的群公告版本。-1 表示群公告最新版本。群公告创建后，版本为 1。你需确保你已拥有群公告的编辑权限。 */
          revision_id?: number
          /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
          client_token?: string
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface BatchUpdateResponse {
          /** 批量更新的 Block */
          blocks?: Lark.Block[]
          /** 当前更新成功后群公告的版本号 */
          revision_id?: number
          /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
          client_token?: string
        }

        export interface GetQuery {
          /** 查询的群公告版本，-1 表示群公告最新版本。群公告创建后，版本为 1。若查询的版本为群公告最新版本，则需要持有群公告的阅读权限；若查询的版本为群公告的历史版本，则需要持有群公告的更新权限 */
          revision_id?: number
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface GetResponse {
          /** 查询的 Block 的信息 */
          block?: Lark.Block
        }

        export namespace Children {
          export interface Methods {
            /**
             * 在群公告中创建块
             * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/create
             */
            create(chat_id: string, block_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
            /**
             * 获取所有子块
             * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/get
             */
            get(chat_id: string, block_id: string, query?: GetQuery): Paginated<Lark.Block>
            /**
             * 删除群公告中的块
             * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/batch_delete
             */
            batchDelete(chat_id: string, block_id: string, body: BatchDeleteRequest, query?: BatchDeleteQuery): Promise<BatchDeleteResponse>
          }

          export interface CreateRequest {
            /** 添加的孩子列表。 */
            children?: Lark.Block[]
            /** 当前 block 在 children 中的插入位置，起始值为 0，最大值为原 children 长度 */
            index?: number
          }

          export interface CreateQuery {
            /** 要操作的群公告版本。-1 表示群公告最新版本。群公告创建后，版本为 1。你需确保你已拥有群公告的编辑权限 */
            revision_id?: number
            /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
            client_token?: string
            /** 此次调用中使用的用户ID的类型 */
            user_id_type?: 'user_id' | 'union_id' | 'open_id'
          }

          export interface CreateResponse {
            /** 所添加的孩子的 Block 信息 */
            children?: Lark.Block[]
            /** 当前 Block Children 创建成功后群公告的版本号 */
            revision_id?: number
            /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
            client_token?: string
          }

          export interface GetQuery extends Pagination {
            /** 查询的群公告版本，-1 表示群公告最新版本。群公告创建后，版本为 1。若查询的版本为群公告最新版本，则需要持有群公告的阅读权限；若查询的版本为群公告的历史版本，则需要持有群公告的更新权限。 */
            revision_id?: number
            /** 此次调用中使用的用户ID的类型 */
            user_id_type?: 'user_id' | 'union_id' | 'open_id'
          }

          export interface BatchDeleteRequest {
            /** 删除的起始索引（操作区间左闭右开） */
            start_index: number
            /** 删除的末尾索引（操作区间左闭右开） */
            end_index: number
          }

          export interface BatchDeleteQuery {
            /** 要操作的群公告版本。-1 表示群公告最新版本。群公告创建后，版本为 1。你需确保你已拥有群公告的编辑权限 */
            revision_id?: number
            /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
            client_token?: string
          }

          export interface BatchDeleteResponse {
            /** 当前删除操作成功后群公告的版本号 */
            revision_id?: number
            /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
            client_token?: string
          }
        }
      }
    }
  }

  export namespace Document {
    export interface Methods {
      block: Block.Methods
      /**
       * 创建文档
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 获取文档基本信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/get
       */
      get(document_id: string): Promise<GetResponse>
      /**
       * 获取文档纯文本内容
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/raw_content
       */
      rawContent(document_id: string, query?: RawContentQuery): Promise<RawContentResponse>
    }

    export interface CreateRequest {
      /** 文件夹 token，获取方式见云文档接口快速入门；空表示根目录，tenant_access_token应用权限仅允许操作应用创建的目录 */
      folder_token?: string
      /** 文档标题，只支持纯文本 */
      title?: string
    }

    export interface CreateResponse {
      /** 新建文档的文档信息 */
      document?: Lark.Document
    }

    export interface GetResponse {
      /** 文档信息 */
      document?: Lark.Document
    }

    export const enum RawContentQueryLang {
      /** 中文 */
      ZH = 0,
      /** 英文 */
      EN = 1,
      /** 日文 */
      JP = 2,
    }

    export interface RawContentQuery {
      /** 语言（用于 MentionUser 语言的选取） */
      lang?: RawContentQueryLang
    }

    export interface RawContentResponse {
      /** 文档纯文本 */
      content?: string
    }

    export namespace Block {
      export interface Methods {
        children: Children.Methods
        descendant: Descendant.Methods
        /**
         * 获取文档所有块
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/list
         */
        list(document_id: string, query?: ListQuery): Paginated<Lark.Block>
        /**
         * 更新块的内容
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/patch
         */
        patch(document_id: string, block_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
        /**
         * 获取块的内容
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/get
         */
        get(document_id: string, block_id: string, query?: GetQuery): Promise<GetResponse>
        /**
         * 批量更新块的内容
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/batch_update
         */
        batchUpdate(document_id: string, body: BatchUpdateRequest, query?: BatchUpdateQuery): Promise<BatchUpdateResponse>
      }

      export interface ListQuery extends Pagination {
        /** 查询的文档版本，-1表示文档最新版本。若此时查询的版本为文档最新版本，则需要持有文档的阅读权限；若此时查询的版本为文档的历史版本，则需要持有文档的编辑权限。 */
        document_revision_id?: number
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface PatchRequest {
        /** 更新文本元素请求 */
        update_text_elements?: Lark.UpdateTextElementsRequest
        /** 更新文本样式请求 */
        update_text_style?: Lark.UpdateTextStyleRequest
        /** 更新表格属性请求 */
        update_table_property?: Lark.UpdateTablePropertyRequest
        /** 表格插入新行请求 */
        insert_table_row?: Lark.InsertTableRowRequest
        /** 表格插入新列请求 */
        insert_table_column?: Lark.InsertTableColumnRequest
        /** 表格批量删除行请求 */
        delete_table_rows?: Lark.DeleteTableRowsRequest
        /** 表格批量删除列请求 */
        delete_table_columns?: Lark.DeleteTableColumnsRequest
        /** 表格合并单元格请求 */
        merge_table_cells?: Lark.MergeTableCellsRequest
        /** 表格取消单元格合并状态请求 */
        unmerge_table_cells?: Lark.UnmergeTableCellsRequest
        /** 分栏插入新的分栏列请求 */
        insert_grid_column?: Lark.InsertGridColumnRequest
        /** 分栏删除列请求 */
        delete_grid_column?: Lark.DeleteGridColumnRequest
        /** 更新分栏列宽比例请求 */
        update_grid_column_width_ratio?: Lark.UpdateGridColumnWidthRatioRequest
        /** 替换图片请求 */
        replace_image?: Lark.ReplaceImageRequest
        /** 替换附件请求 */
        replace_file?: Lark.ReplaceFileRequest
        /** 更新文本元素及样式请求 */
        update_text?: Lark.UpdateTextRequest
        /** 更新任务 Block 请求 */
        update_task?: Lark.UpdateTaskRequest
      }

      export interface PatchQuery {
        /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
        document_revision_id?: number
        /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
        client_token?: string
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface PatchResponse {
        /** 更新后的 block 信息 */
        block?: Lark.Block
        /** 当前更新成功后文档的版本号 */
        document_revision_id?: number
        /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
        client_token: string
      }

      export interface GetQuery {
        /** 查询的文档版本，-1表示文档最新版本。若此时查询的版本为文档最新版本，则需要持有文档的阅读权限；若此时查询的版本为文档的历史版本，则需要持有文档的编辑权限。 */
        document_revision_id?: number
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface GetResponse {
        /** 查询的 Block 的信息 */
        block?: Lark.Block
      }

      export interface BatchUpdateRequest {
        /** 批量更新 Block */
        requests: Lark.UpdateBlockRequest[]
      }

      export interface BatchUpdateQuery {
        /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
        document_revision_id?: number
        /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
        client_token?: string
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface BatchUpdateResponse {
        /** 批量更新的 Block */
        blocks?: Lark.Block[]
        /** 当前更新成功后文档的版本号 */
        document_revision_id?: number
        /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
        client_token: string
      }

      export namespace Children {
        export interface Methods {
          /**
           * 创建块
           * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/create
           */
          create(document_id: string, block_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
          /**
           * 获取所有子块
           * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/get
           */
          get(document_id: string, block_id: string, query?: GetQuery): Paginated<Lark.Block>
          /**
           * 删除块
           * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/batch_delete
           */
          batchDelete(document_id: string, block_id: string, body: BatchDeleteRequest, query?: BatchDeleteQuery): Promise<BatchDeleteResponse>
        }

        export interface CreateRequest {
          /** 添加的孩子列表。 */
          children?: Lark.Block[]
          /** 当前 block 在 children 中的插入位置，起始值为 0，最大值为原 children 长度 */
          index?: number
        }

        export interface CreateQuery {
          /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
          document_revision_id?: number
          /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
          client_token?: string
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface CreateResponse {
          /** 所添加的孩子的 Block 信息 */
          children?: Lark.Block[]
          /** 当前 block children 创建成功后文档的版本号 */
          document_revision_id?: number
          /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
          client_token: string
        }

        export interface GetQuery extends Pagination {
          /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
          document_revision_id?: number
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface BatchDeleteRequest {
          /** 删除的起始索引（操作区间左闭右开） */
          start_index: number
          /** 删除的末尾索引（操作区间左闭右开） */
          end_index: number
        }

        export interface BatchDeleteQuery {
          /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
          document_revision_id?: number
          /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
          client_token?: string
        }

        export interface BatchDeleteResponse {
          /** 当前删除操作成功后文档的版本号 */
          document_revision_id?: number
          /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
          client_token: string
        }
      }

      export namespace Descendant {
        export interface Methods {
          /**
           * 创建嵌套块
           * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-descendant/create
           */
          create(document_id: string, block_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        }

        export interface CreateRequest {
          /** 添加的孩子 BlockID 列表 */
          children_id: string[]
          /** 当前 Block 在 Children 中的插入位置，起始值为 0，最大值为原 Children 长度 */
          index?: number
          /** 添加的子孙列表，包括孩子 */
          descendants: Lark.Block[]
        }

        export interface CreateQuery {
          /** 操作的文档版本，-1 表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限 */
          document_revision_id?: number
          /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作 */
          client_token?: string
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface CreateResponse {
          /** 所添加的孩子的 Block 信息 */
          children?: Lark.Block[]
          /** 当前提交的 Block 创建成功后文档的版本号 */
          document_revision_id?: number
          /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
          client_token?: string
          /** 传入的临时 BlockID 与真实 BlockID 映射关系 */
          block_id_relations?: Lark.BlockIdRelation[]
        }
      }
    }
  }
}

Internal.define({
  '/docx/v1/chats/{chat_id}/announcement': {
    GET: 'docx.chat.announcement.get',
  },
  '/docx/v1/chats/{chat_id}/announcement/blocks': {
    GET: { name: 'docx.chat.announcement.block.list', pagination: { argIndex: 1 } },
  },
  '/docx/v1/chats/{chat_id}/announcement/blocks/{block_id}/children': {
    POST: 'docx.chat.announcement.block.children.create',
    GET: { name: 'docx.chat.announcement.block.children.get', pagination: { argIndex: 2 } },
  },
  '/docx/v1/chats/{chat_id}/announcement/blocks/batch_update': {
    PATCH: 'docx.chat.announcement.block.batchUpdate',
  },
  '/docx/v1/chats/{chat_id}/announcement/blocks/{block_id}': {
    GET: 'docx.chat.announcement.block.get',
  },
  '/docx/v1/chats/{chat_id}/announcement/blocks/{block_id}/children/batch_delete': {
    DELETE: 'docx.chat.announcement.block.children.batchDelete',
  },
  '/docx/v1/documents': {
    POST: 'docx.document.create',
  },
  '/docx/v1/documents/{document_id}': {
    GET: 'docx.document.get',
  },
  '/docx/v1/documents/{document_id}/raw_content': {
    GET: 'docx.document.rawContent',
  },
  '/docx/v1/documents/{document_id}/blocks': {
    GET: { name: 'docx.document.block.list', pagination: { argIndex: 1 } },
  },
  '/docx/v1/documents/{document_id}/blocks/{block_id}/children': {
    POST: 'docx.document.block.children.create',
    GET: { name: 'docx.document.block.children.get', pagination: { argIndex: 2 } },
  },
  '/docx/v1/documents/{document_id}/blocks/{block_id}/descendant': {
    POST: 'docx.document.block.descendant.create',
  },
  '/docx/v1/documents/{document_id}/blocks/{block_id}': {
    PATCH: 'docx.document.block.patch',
    GET: 'docx.document.block.get',
  },
  '/docx/v1/documents/{document_id}/blocks/batch_update': {
    PATCH: 'docx.document.block.batchUpdate',
  },
  '/docx/v1/documents/{document_id}/blocks/{block_id}/children/batch_delete': {
    DELETE: 'docx.document.block.children.batchDelete',
  },
})
