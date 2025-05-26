import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    drive: Drive.Methods
  }
}

export namespace Drive {
  export interface Methods {
    file: File.Methods
    meta: Meta.Methods
    importTask: ImportTask.Methods
    exportTask: ExportTask.Methods
    media: Media.Methods
    permission: Permission.Methods
  }

  export namespace File {
    export interface Methods {
      statistics: Statistics.Methods
      viewRecord: ViewRecord.Methods
      version: Version.Methods
      like: Like.Methods
      comment: Comment.Methods
      subscription: Subscription.Methods
      /**
       * 获取文件夹中的文件清单
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list
       */
      list(query?: ListQuery): Promise<ListResponse> & AsyncIterableIterator<Lark.File>
      /**
       * 新建文件夹
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_folder
       */
      createFolder(body: CreateFolderRequest): Promise<CreateFolderResponse>
      /**
       * 查询异步任务状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check
       */
      taskCheck(query?: TaskCheckQuery): Promise<TaskCheckResponse>
      /**
       * 复制文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy
       */
      copy(file_token: string, body: CopyRequest, query?: CopyQuery): Promise<CopyResponse>
      /**
       * 移动文件或文件夹
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/move
       */
      move(file_token: string, body: MoveRequest): Promise<MoveResponse>
      /**
       * 删除文件或文件夹
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete
       */
      delete(file_token: string, query?: DeleteQuery): Promise<DeleteResponse>
      /**
       * 创建文件快捷方式
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_shortcut
       */
      createShortcut(body: CreateShortcutRequest, query?: CreateShortcutQuery): Promise<CreateShortcutResponse>
      /**
       * 上传文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all
       */
      uploadAll(form: UploadAllForm): Promise<UploadAllResponse>
      /**
       * 分片上传文件-预上传
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare
       */
      uploadPrepare(body: UploadPrepareRequest): Promise<UploadPrepareResponse>
      /**
       * 分片上传文件-上传分片
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part
       */
      uploadPart(form: UploadPartForm): Promise<void>
      /**
       * 分片上传文件-完成上传
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish
       */
      uploadFinish(body: UploadFinishRequest): Promise<UploadFinishResponse>
      /**
       * 下载文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/download
       */
      download(file_token: string): Promise<ArrayBuffer>
      /**
       * 订阅云文档事件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/subscribe
       */
      subscribe(file_token: string, query?: SubscribeQuery): Promise<void>
      /**
       * 查询云文档事件订阅状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/get_subscribe
       */
      getSubscribe(file_token: string, query?: GetSubscribeQuery): Promise<GetSubscribeResponse>
      /**
       * 取消云文档事件订阅
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete_subscribe
       */
      deleteSubscribe(file_token: string, query?: DeleteSubscribeQuery): Promise<void>
    }

    export interface ListQuery extends Pagination {
      /** 文件夹的token（若不填写该参数或填写空字符串，则默认获取用户云空间下的清单，且不支持分页） */
      folder_token?: string
      /** 排序规则 */
      order_by?: 'EditedTime' | 'CreatedTime'
      /** 升序降序 */
      direction?: 'ASC' | 'DESC'
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface ListResponse {
      /** 文档详细信息 */
      files?: Lark.File[]
      /** 下一页分页参数 */
      next_page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
    }

    export interface CreateFolderRequest {
      /** 文件夹名称 */
      name: string
      /** 父文件夹token */
      folder_token: string
    }

    export interface CreateFolderResponse {
      /** 新创建的文件夹 Token */
      token?: string
      /** 创建文件夹的访问 URL */
      url?: string
    }

    export interface TaskCheckQuery {
      /** 文件相关异步任务id */
      task_id: string
    }

    export interface TaskCheckResponse {
      /** 异步任务的执行状态 */
      status?: string
    }

    export interface CopyRequest {
      /** 被复制文件的新名称 */
      name: string
      /** 被复制文件的类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
      type?: 'file' | 'doc' | 'sheet' | 'bitable' | 'docx' | 'mindnote' | 'slides'
      /** 文件被复制到的目标文件夹token */
      folder_token: string
      /** 用户自定义请求附加参数，用于实现特殊的复制语义 */
      extra?: Lark.Property[]
    }

    export interface CopyQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CopyResponse {
      /** 复制后的文件资源 */
      file?: Lark.File
    }

    export interface MoveRequest {
      /** 文件类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
      type?: 'file' | 'docx' | 'bitable' | 'doc' | 'sheet' | 'mindnote' | 'folder' | 'slides'
      /** 目标文件夹token */
      folder_token?: string
    }

    export interface MoveResponse {
      /** 异步任务id，移动文件夹时返回 */
      task_id?: string
    }

    export interface DeleteQuery {
      /** 被删除文件的类型 */
      type: 'file' | 'docx' | 'bitable' | 'folder' | 'doc' | 'sheet' | 'mindnote' | 'shortcut' | 'slides'
    }

    export interface DeleteResponse {
      /** 异步任务id，删除文件夹时返回 */
      task_id?: string
    }

    export interface CreateShortcutRequest {
      /** 创建快捷方式的目标父文件夹 token */
      parent_token: string
      /** 快捷方式映射到的文档和文件列表信息 */
      refer_entity: Lark.ReferEntity
    }

    export interface CreateShortcutQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateShortcutResponse {
      /** 返回创建成功的shortcut节点 */
      succ_shortcut_node?: Lark.File
    }

    export interface UploadAllForm {
      /** 文件名。 */
      file_name: string
      /** 上传点类型。 */
      parent_type: 'explorer'
      /** 文件夹token，获取方式见 [概述](/ssl:ttdoc/ukTMukTMukTM/uUDN04SN0QjL1QDN/files/guide/introduction) */
      parent_node: string
      /** 文件大小（以字节为单位）。 */
      size: number
      /** 文件adler32校验和(可选)。 */
      checksum?: string
      /** 文件二进制内容。 */
      file: Blob
    }

    export interface UploadAllResponse {
      file_token?: string
    }

    export interface UploadPrepareRequest {
      /** 文件名 */
      file_name: string
      /** 上传点类型 */
      parent_type: 'explorer'
      /** 文件夹的token */
      parent_node: string
      /** 文件大小 */
      size: number
    }

    export interface UploadPrepareResponse {
      /** 分片上传事务ID */
      upload_id?: string
      /** 分片大小策略 */
      block_size?: number
      /** 分片数量 */
      block_num?: number
    }

    export interface UploadPartForm {
      /** 分片上传事务ID。 */
      upload_id: string
      /** 块号，从0开始计数。 */
      seq: number
      /** 块大小（以字节为单位）。 */
      size: number
      /** 文件分块adler32校验和(可选)。 */
      checksum?: string
      /** 文件分片二进制内容。 */
      file: Blob
    }

    export interface UploadFinishRequest {
      /** 分片上传事务ID */
      upload_id: string
      /** 分片数量 */
      block_num: number
    }

    export interface UploadFinishResponse {
      file_token?: string
    }

    export interface SubscribeQuery {
      /** 文档类型 */
      file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'folder'
      /** 事件类型 */
      event_type?: string
    }

    export interface GetSubscribeQuery {
      /** 文档类型 */
      file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'file' | 'folder'
      /** 事件类型 */
      event_type?: string
    }

    export interface GetSubscribeResponse {
      /** 是否有订阅，取值 true 表示已订阅；false 表示未订阅 */
      is_subscribe?: boolean
    }

    export interface DeleteSubscribeQuery {
      /** 文档类型 */
      file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'file' | 'folder'
      /** 事件类型 */
      event_type?: string
    }

    export namespace Statistics {
      export interface Methods {
        /**
         * 获取文件统计信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-statistics/get
         */
        get(file_token: string, query?: GetQuery): Promise<GetResponse>
      }

      export interface GetQuery {
        /** 文档类型 */
        file_type: 'doc' | 'sheet' | 'mindnote' | 'bitable' | 'wiki' | 'file' | 'docx'
      }

      export interface GetResponse {
        /** 文档token */
        file_token?: string
        /** 文档类型 */
        file_type?: string
        /** 文档统计信息 */
        statistics?: Lark.FileStatistics
      }
    }

    export namespace ViewRecord {
      export interface Methods {
        /**
         * 获取文件访问记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-view_record/list
         */
        list(file_token: string, query?: ListQuery): Paginated<Lark.FileViewRecord>
      }

      export interface ListQuery extends Pagination {
        /** 文档类型 */
        file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'mindnote' | 'wiki' | 'file'
        /** 此次调用中使用的访问者 ID 的类型 */
        viewer_id_type?: 'user_id' | 'union_id' | 'open_id'
      }
    }

    export namespace Version {
      export interface Methods {
        /**
         * 创建文档版本
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/create
         */
        create(file_token: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 获取文档版本列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/list
         */
        list(file_token: string, query?: ListQuery): Paginated<Lark.Version>
        /**
         * 获取文档版本信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/get
         */
        get(file_token: string, version_id: string, query?: GetQuery): Promise<GetResponse>
        /**
         * 删除文档版本
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/delete
         */
        delete(file_token: string, version_id: string, query?: DeleteQuery): Promise<void>
      }

      export interface CreateRequest {
        /** 版本文档标题，最大长度 1024 个Unicode 码点。通常情况下，一个英文或中文字符对应一个码点，但是某些特殊符号可能会对应多个码点。例如，家庭组合「👨‍👩‍👧」这个表情符号对应5个码点。 */
        name?: string
        /** 版本文档类型 */
        obj_type?: 'docx' | 'sheet'
      }

      export interface CreateQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface CreateResponse {
        /** 版本文档标题，最大长度 1024 个Unicode 码点。通常情况下，一个英文或中文字符对应一个码点，但是某些特殊符号可能会对应多个码点。例如，家庭组合「👨‍👩‍👧」这个表情符号对应5个码点。 */
        name?: string
        /** 版本文档版本号 */
        version?: string
        /** 源文档token */
        parent_token?: string
        /** 版本文档所有者id */
        owner_id?: string
        /** 版本文档创建者id */
        creator_id?: string
        /** 版本文档创建时间 */
        create_time?: string
        /** 版本文档更新时间 */
        update_time?: string
        /** 版本文档状态 */
        status?: '0' | '1' | '2'
        /** 版本文档类型 */
        obj_type?: 'docx' | 'sheet'
        /** 源文档类型 */
        parent_type?: 'docx' | 'sheet'
      }

      export interface ListQuery extends Pagination {
        /** 原文档类型 */
        obj_type: 'docx' | 'sheet'
        /** 用户id类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
      }

      export interface GetQuery {
        /** 文档类型 */
        obj_type: 'docx' | 'sheet'
        /** 用户ID类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
      }

      export interface GetResponse {
        /** 版本文档标题，最大长度 1024 个Unicode 码点。通常情况下，一个英文或中文字符对应一个码点，但是某些特殊符号可能会对应多个码点。例如，家庭组合「👨‍👩‍👧」这个表情符号对应5个码点。 */
        name?: string
        /** 版本文档版本号 */
        version?: string
        /** 源文档token */
        parent_token?: string
        /** 版本文档所有者id */
        owner_id?: string
        /** 版本文档创建者id */
        creator_id?: string
        /** 版本文档创建时间 */
        create_time?: string
        /** 版本文档更新时间 */
        update_time?: string
        /** 版本文档状态 */
        status?: '0' | '1' | '2'
        /** 版本文档类型 */
        obj_type?: 'docx' | 'sheet'
        /** 源文档类型 */
        parent_type?: 'docx' | 'sheet'
      }

      export interface DeleteQuery {
        /** 文档类型 */
        obj_type: 'docx' | 'sheet'
        /** 用户ID类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
      }
    }

    export namespace Like {
      export interface Methods {
        /**
         * 获取云文档的点赞者列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/file-like/list
         */
        list(file_token: string, query?: ListQuery): Paginated<Lark.FileLike>
      }

      export interface ListQuery extends Pagination {
        /** 文件类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
        file_type: 'doc' | 'docx' | 'file'
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }
    }

    export namespace Comment {
      export interface Methods {
        reply: Reply.Methods
        /**
         * 获取云文档所有评论
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/list
         */
        list(file_token: string, query?: ListQuery): Paginated<Lark.FileComment>
        /**
         * 批量获取评论
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/batch_query
         */
        batchQuery(file_token: string, body: BatchQueryRequest, query?: BatchQueryQuery): Promise<BatchQueryResponse>
        /**
         * 解决/恢复评论
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/patch
         */
        patch(file_token: string, comment_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
        /**
         * 添加全文评论
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/create
         */
        create(file_token: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 获取全文评论
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/get
         */
        get(file_token: string, comment_id: string, query?: GetQuery): Promise<GetResponse>
      }

      export interface ListQuery extends Pagination {
        /** 文档类型 */
        file_type: 'doc' | 'sheet' | 'file' | 'docx'
        /** 是否全文评论 */
        is_whole?: boolean
        /** 是否已解决（可选） */
        is_solved?: boolean
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface BatchQueryRequest {
        /** 需要获取数据的评论id */
        comment_ids: string[]
      }

      export interface BatchQueryQuery {
        /** 文档类型 */
        file_type: 'doc' | 'sheet' | 'file' | 'docx'
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface BatchQueryResponse {
        /** 评论的相关信息、回复的信息、回复分页的信息 */
        items?: Lark.FileComment[]
      }

      export interface PatchRequest {
        /** 评论解决标志 */
        is_solved: boolean
      }

      export interface PatchQuery {
        /** 文档类型 */
        file_type: 'doc' | 'sheet' | 'file' | 'docx'
      }

      export interface CreateRequest {
        /** 评论里的回复列表 */
        reply_list?: Lark.ReplyList
      }

      export interface CreateQuery {
        /** 文档类型 */
        file_type: 'doc' | 'docx'
        /** 此次调用中使用的用户 ID 的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface CreateResponse {
        /** 评论 ID */
        comment_id?: string
        /** 用户 ID */
        user_id?: string
        /** 创建时间 */
        create_time?: number
        /** 更新时间 */
        update_time?: number
        /** 是否已解决 */
        is_solved?: boolean
        /** 解决评论时间 */
        solved_time?: number
        /** 解决评论者的用户 ID */
        solver_user_id?: string
        /** 是否有更多回复 */
        has_more?: boolean
        /** 回复分页标记 */
        page_token?: string
        /** 是否是全文评论 */
        is_whole?: boolean
        /** 局部评论的引用字段 */
        quote?: string
        /** 评论里的回复列表 */
        reply_list?: Lark.ReplyList
      }

      export interface GetQuery {
        /** 文档类型 */
        file_type: 'doc' | 'sheet' | 'file' | 'docx'
        /** 此次调用中使用的用户 ID 的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface GetResponse {
        /** 评论 ID */
        comment_id?: string
        /** 用户 ID */
        user_id?: string
        /** 创建时间 */
        create_time?: number
        /** 更新时间 */
        update_time?: number
        /** 是否已解决 */
        is_solved?: boolean
        /** 解决评论时间 */
        solved_time?: number
        /** 解决评论者的用户 ID */
        solver_user_id?: string
        /** 是否有更多回复 */
        has_more?: boolean
        /** 回复分页标记 */
        page_token?: string
        /** 是否是全文评论 */
        is_whole?: boolean
        /** 局部评论的引用字段 */
        quote?: string
        /** 评论里的回复列表 */
        reply_list?: Lark.ReplyList
      }

      export namespace Reply {
        export interface Methods {
          /**
           * 获取回复信息
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/list
           */
          list(file_token: string, comment_id: string, query?: ListQuery): Paginated<Lark.FileCommentReply>
          /**
           * 更新回复的内容
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/update
           */
          update(file_token: string, comment_id: string, reply_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<void>
          /**
           * 删除回复
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/delete
           */
          delete(file_token: string, comment_id: string, reply_id: string, query?: DeleteQuery): Promise<void>
        }

        export interface ListQuery extends Pagination {
          /** 文档类型 */
          file_type: 'doc' | 'sheet' | 'file' | 'docx'
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface UpdateRequest {
          /** 回复内容 */
          content: Lark.ReplyContent
        }

        export interface UpdateQuery {
          /** 文档类型 */
          file_type: 'doc' | 'sheet' | 'file' | 'docx'
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }

        export interface DeleteQuery {
          /** 文档类型 */
          file_type: 'doc' | 'sheet' | 'file' | 'docx'
        }
      }
    }

    export namespace Subscription {
      export interface Methods {
        /**
         * 获取订阅状态
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/get
         */
        get(file_token: string, subscription_id: string, body: GetRequest): Promise<GetResponse>
        /**
         * 创建订阅
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/create
         */
        create(file_token: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 更新订阅状态
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/patch
         */
        patch(file_token: string, subscription_id: string, body: PatchRequest): Promise<PatchResponse>
      }

      export interface GetRequest {
        /** 文档类型 */
        file_type: 'doc' | 'docx' | 'wiki'
      }

      export interface GetResponse {
        /** 订阅关系ID */
        subscription_id: string
        /** 订阅类型 */
        subscription_type?: 'comment_update'
        /** 是否订阅 */
        is_subcribe?: boolean
        /** 文档类型 */
        file_type?: 'doc' | 'docx' | 'wiki'
      }

      export interface CreateRequest {
        /** 订阅关系ID */
        subscription_id?: string
        /** 订阅类型 */
        subscription_type: 'comment_update'
        /** 是否订阅 */
        is_subcribe?: boolean
        /** 文档类型 */
        file_type: 'doc' | 'docx' | 'wiki'
      }

      export interface CreateResponse {
        /** 订阅关系ID */
        subscription_id?: string
        /** 订阅类型 */
        subscription_type?: 'comment_update'
        /** 是否订阅 */
        is_subcribe?: boolean
        /** 文档类型 */
        file_type?: 'doc' | 'docx' | 'wiki'
      }

      export interface PatchRequest {
        /** 是否订阅 */
        is_subscribe: boolean
        /** 文档类型 */
        file_type: 'doc' | 'docx' | 'wiki'
      }

      export interface PatchResponse {
        /** 订阅关系ID */
        subscription_id?: string
        /** 订阅类型 */
        subscription_type?: 'comment_update'
        /** 是否订阅 */
        is_subcribe?: boolean
        /** 文档类型 */
        file_type?: 'doc' | 'docx' | 'wiki'
      }
    }
  }

  export namespace Meta {
    export interface Methods {
      /**
       * 获取文件元数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/meta/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Promise<BatchQueryResponse>
    }

    export interface BatchQueryRequest {
      /** 请求文档,  一次不超过200个 */
      request_docs: Lark.RequestDoc[]
      /** 是否获取文档链接 */
      with_url?: boolean
    }

    export interface BatchQueryQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface BatchQueryResponse {
      metas: Lark.Meta[]
      failed_list?: Lark.MetaFailed[]
    }
  }

  export namespace ImportTask {
    export interface Methods {
      /**
       * 创建导入任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 查询导入任务结果
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get
       */
      get(ticket: string): Promise<GetResponse>
    }

    export interface CreateRequest {
      /** 导入文件格式后缀 */
      file_extension: string
      /** 导入的文件 Token */
      file_token: string
      /** 导入目标云文档类型，支持的类型 新版文档：docx；电子表格：sheet；多维表格：bitable */
      type: string
      /** 目标云文档的标题，若为空，则使用导入文件的名字 */
      file_name?: string
      /** 挂载点 */
      point: Lark.ImportTaskMountPoint
    }

    export interface CreateResponse {
      /** 导入任务ID */
      ticket?: string
    }

    export interface GetResponse {
      /** 导入任务 */
      result?: Lark.ImportTask
    }
  }

  export namespace ExportTask {
    export interface Methods {
      /**
       * 创建导出任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 查询导出任务结果
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get
       */
      get(ticket: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 下载导出文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download
       */
      download(file_token: string): Promise<ArrayBuffer>
    }

    export interface CreateRequest {
      /** 导出文件扩展名 */
      file_extension: 'docx' | 'pdf' | 'xlsx' | 'csv'
      /** 导出文档 Token */
      token: string
      /** 导出文档类型 */
      type: 'doc' | 'sheet' | 'bitable' | 'docx'
      /** 导出子表 ID，仅当将 sheet/bitable 导出为 csv 时使用 */
      sub_id?: string
    }

    export interface CreateResponse {
      /** 导出任务ID */
      ticket?: string
    }

    export interface GetQuery {
      /** 导出文档的 token */
      token: string
    }

    export interface GetResponse {
      /** 导出结果 */
      result?: Lark.ExportTask
    }
  }

  export namespace Media {
    export interface Methods {
      /**
       * 上传素材
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all
       */
      uploadAll(form: UploadAllForm): Promise<UploadAllResponse>
      /**
       * 分片上传素材-预上传
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare
       */
      uploadPrepare(body: UploadPrepareRequest): Promise<UploadPrepareResponse>
      /**
       * 分片上传素材-上传分片
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part
       */
      uploadPart(form: UploadPartForm): Promise<void>
      /**
       * 分片上传素材-完成上传
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish
       */
      uploadFinish(body: UploadFinishRequest): Promise<UploadFinishResponse>
      /**
       * 下载素材
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/download
       */
      download(file_token: string, query?: DownloadQuery): Promise<ArrayBuffer>
      /**
       * 获取素材临时下载链接
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/batch_get_tmp_download_url
       */
      batchGetTmpDownloadUrl(query?: BatchGetTmpDownloadUrlQuery): Promise<BatchGetTmpDownloadUrlResponse>
    }

    export interface UploadAllForm {
      /** 文件名。 */
      file_name: string
      /** 上传点类型。 */
      parent_type: 'doc_image' | 'docx_image' | 'sheet_image' | 'doc_file' | 'docx_file' | 'sheet_file' | 'vc_virtual_background' | 'bitable_image' | 'bitable_file' | 'moments' | 'ccm_import_open' | 'calendar' | 'base_global' | 'lark_ai_media_analysis'
      /** 上传点的token。 */
      parent_node: string
      /** 文件大小（以字节为单位）。 */
      size: number
      /** 文件adler32校验和（可选）。 */
      checksum?: string
      /** 扩展信息(可选)。 */
      extra?: string
      /** 文件二进制内容。 */
      file: Blob
    }

    export interface UploadAllResponse {
      file_token?: string
    }

    export interface UploadPrepareRequest {
      /** 文件名 */
      file_name: string
      /** 上传点类型 */
      parent_type: 'doc_image' | 'docx_image' | 'sheet_image' | 'doc_file' | 'docx_file' | 'sheet_file' | 'vc_virtual_background' | 'bitable_image' | 'bitable_file' | 'moments' | 'ccm_import_open' | 'calendar' | 'base_global' | 'lark_ai_media_analysis'
      /** 文件大小 */
      size: number
      /** 上传点的标识符 */
      parent_node?: string
      /** 扩展信息(可选) */
      extra?: string
    }

    export interface UploadPrepareResponse {
      /** 分片上传事务ID */
      upload_id?: string
      /** 分片大小策略 */
      block_size?: number
      /** 分片数量 */
      block_num?: number
    }

    export interface UploadPartForm {
      /** 分片上传事务ID。 */
      upload_id: string
      /** 块号，从0开始计数。 */
      seq: number
      /** 块大小（以字节为单位）。 */
      size: number
      /** 文件分块adler32校验和(可选)。 */
      checksum?: string
      /** 文件分片二进制内容。 */
      file: Blob
    }

    export interface UploadFinishRequest {
      /** 分片上传事务ID */
      upload_id: string
      /** 分片数量 */
      block_num: number
    }

    export interface UploadFinishResponse {
      file_token?: string
    }

    export interface DownloadQuery {
      /** 扩展信息 */
      extra?: string
    }

    export interface BatchGetTmpDownloadUrlQuery {
      /** 文件标识符列表 */
      file_tokens: string[]
      /** 拓展信息(可选) */
      extra?: string
    }

    export interface BatchGetTmpDownloadUrlResponse {
      /** 临时下载列表 */
      tmp_download_urls?: Lark.TmpDownloadUrl[]
    }
  }

  export namespace Permission {
    export interface Methods {
      member: Member.Methods
      public: Public.Methods
    }

    export namespace Member {
      export interface Methods {
        /**
         * 批量增加协作者权限
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/batch_create
         */
        batchCreate(token: string, body: BatchCreateRequest, query?: BatchCreateQuery): Promise<BatchCreateResponse>
        /**
         * 转移所有者
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/transfer_owner
         */
        transferOwner(token: string, body: TransferOwnerRequest, query?: TransferOwnerQuery): Promise<void>
        /**
         * 判断当前用户是否有某权限
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/auth
         */
        auth(token: string, query?: AuthQuery): Promise<AuthResponse>
        /**
         * 获取协作者列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/list
         */
        list(token: string, query?: ListQuery): Promise<ListResponse>
        /**
         * 增加协作者权限
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create
         */
        create(token: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 更新协作者权限
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/update
         */
        update(token: string, member_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
        /**
         * 移除协作者权限
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/delete
         */
        delete(token: string, member_id: string, body: DeleteRequest, query?: DeleteQuery): Promise<void>
      }

      export interface BatchCreateRequest {
        /** 协作者列表 */
        members: Lark.BaseMember[]
      }

      export interface BatchCreateQuery {
        /** 文件的类型 */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'folder' | 'mindnote' | 'minutes' | 'slides'
        /** 添加权限后是否通知对方 */
        need_notification?: boolean
      }

      export interface BatchCreateResponse {
        /** 协作者列表 */
        members?: Lark.BaseMember[]
      }

      export interface TransferOwnerRequest {
        /** 文档拥有者的ID类型 */
        member_type: 'email' | 'openid' | 'userid'
        /** 文档拥有者的ID，与文档拥有者的ID类型需要对应 */
        member_id: string
      }

      export interface TransferOwnerQuery {
        /** 文件类型，需要与文件的 token 相匹配 */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides' | 'folder'
        /** 是否需要通知新 Owner */
        need_notification?: boolean
        /** 转移后是否需要移除原 Owner 的权限 */
        remove_old_owner?: boolean
        /** 仅当内容不在共享文件夹中，此参数才会生效。如果设为false，系统会将该内容移至新所有者的个人空间根文件夹。如果设为 true，则留在原位置。 */
        stay_put?: boolean
        /** 仅当 remove_old_owner = false 时，此参数才会生效 保留原文件所有者指定的权限角色 */
        old_owner_perm?: string
      }

      export interface AuthQuery {
        /** 文件类型，需要与文件的 token 相匹配 */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
        /** 需要判断的权限 */
        action: 'view' | 'edit' | 'share' | 'comment' | 'export' | 'copy' | 'print' | 'manage_public'
      }

      export interface AuthResponse {
        /** 是否有权限 */
        auth_result: boolean
      }

      export interface ListQuery {
        /** 文件类型，需要与文件的 token 相匹配 */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
        /** 指定返回的协作者字段信息，如无指定则默认不返回**可选值有：** - `name`：协作者名- `type`：协作者类型- `avatar`：头像- `external_label`：外部标签**注意：** - 你可以使用特殊值`*`指定返回目前支持的所有字段- 你可以使用`,`分隔若干个你想指定返回的字段，如：`name,avatar`- 按需指定返回字段接口性能更好 */
        fields?: string
        /** 协作者的权限角色类型 */
        perm_type?: 'container' | 'single_page'
      }

      export interface ListResponse {
        /** 返回的列表数据 */
        items?: Lark.Member[]
      }

      export interface CreateRequest {
        /** 协作者ID类型 */
        member_type: 'email' | 'openid' | 'unionid' | 'openchat' | 'opendepartmentid' | 'userid' | 'groupid' | 'wikispaceid'
        /** 协作者ID，与协作者ID类型需要对应 */
        member_id: string
        /** 协作者的权限角色 */
        perm: 'view' | 'edit' | 'full_access'
        /** 协作者的权限角色类型 */
        perm_type?: 'container' | 'single_page'
        /** 协作者类型 */
        type?: 'user' | 'chat' | 'department' | 'group' | 'wiki_space_member' | 'wiki_space_viewer' | 'wiki_space_editor'
      }

      export interface CreateQuery {
        /** 文件类型，需要与文件的 token 相匹配 */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'folder' | 'mindnote' | 'minutes' | 'slides'
        /** 添加权限后是否通知对方 */
        need_notification?: boolean
      }

      export interface CreateResponse {
        /** 本次添加权限的用户信息 */
        member?: Lark.BaseMember
      }

      export interface UpdateRequest {
        /** 协作者ID类型 */
        member_type: 'email' | 'openid' | 'unionid' | 'openchat' | 'opendepartmentid' | 'userid' | 'groupid' | 'wikispaceid'
        /** 协作者的权限角色 */
        perm: 'view' | 'edit' | 'full_access'
        /** 协作者的权限角色类型 */
        perm_type?: 'container' | 'single_page'
        /** 协作者类型 */
        type?: 'user' | 'chat' | 'department' | 'group' | 'wiki_space_member' | 'wiki_space_viewer' | 'wiki_space_editor'
      }

      export interface UpdateQuery {
        /** 更新权限后是否通知对方**注意：** 使用`tenant_access_token`访问不支持该参数 */
        need_notification?: boolean
        /** 文件类型，放于query参数中，如：`?type=doc` */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
      }

      export interface UpdateResponse {
        /** 本次更新权限的用户信息 */
        member?: Lark.BaseMember
      }

      export interface DeleteRequest {
        /** 协作者类型 */
        type?: 'user' | 'chat' | 'department' | 'group' | 'wiki_space_member' | 'wiki_space_viewer' | 'wiki_space_editor'
        /** 协作者的权限角色类型 */
        perm_type?: 'container' | 'single_page'
      }

      export interface DeleteQuery {
        /** 文件类型，放于query参数中，如：`?type=doc` */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'folder' | 'mindnote' | 'minutes' | 'slides'
        /** 权限成员类型，放于query参数中，如：`?member_type=openid` */
        member_type: 'email' | 'openid' | 'openchat' | 'opendepartmentid' | 'userid' | 'unionid' | 'groupid' | 'wikispaceid'
      }
    }

    export namespace Public {
      export interface Methods {
        password: Password.Methods
        /**
         * 获取云文档权限设置
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/get
         */
        get(token: string, query?: GetQuery): Promise<GetResponse>
        /**
         * 更新云文档权限设置
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/patch
         */
        patch(token: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      }

      export interface GetQuery {
        /** 文件类型，需要与文件的 token 相匹配 */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
      }

      export interface GetResponse {
        /** 返回的文档公共设置 */
        permission_public?: Lark.PermissionPublic
      }

      export interface PatchRequest {
        /** 允许内容被分享到组织外 */
        external_access_entity?: 'open' | 'closed' | 'allow_share_partner_tenant'
        /** 谁可以创建副本、打印、下载 */
        security_entity?: 'anyone_can_view' | 'anyone_can_edit' | 'only_full_access'
        /** 谁可以评论 */
        comment_entity?: 'anyone_can_view' | 'anyone_can_edit'
        /** 谁可以添加和管理协作者-组织维度 */
        share_entity?: 'anyone' | 'same_tenant'
        /** 谁可以添加和管理协作者-协作者维度 */
        manage_collaborator_entity?: 'collaborator_can_view' | 'collaborator_can_edit' | 'collaborator_full_access'
        /** 链接分享设置 */
        link_share_entity?: 'tenant_readable' | 'tenant_editable' | 'partner_tenant_readable' | 'partner_tenant_editable' | 'anyone_readable' | 'anyone_editable' | 'closed'
        /** 谁可以复制内容 */
        copy_entity?: 'anyone_can_view' | 'anyone_can_edit' | 'only_full_access'
      }

      export interface PatchQuery {
        /** 文件类型，需要与文件的 token 相匹配 */
        type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
      }

      export interface PatchResponse {
        /** 本次更新后文档公共设置 */
        permission_public?: Lark.PermissionPublic
      }

      export namespace Password {
        export interface Methods {
          /**
           * 开启密码
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/create
           */
          create(token: string, query?: CreateQuery): Promise<CreateResponse>
          /**
           * 刷新密码
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/update
           */
          update(token: string, query?: UpdateQuery): Promise<UpdateResponse>
          /**
           * 关闭密码
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/delete
           */
          delete(token: string, query?: DeleteQuery): Promise<void>
        }

        export interface CreateQuery {
          /** 文件类型，需要与文件的 token 相匹配 */
          type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
        }

        export interface CreateResponse {
          /** 密码 */
          password?: string
        }

        export interface UpdateQuery {
          /** 文件类型，需要与文件的 token 相匹配 */
          type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
        }

        export interface UpdateResponse {
          /** 密码 */
          password?: string
        }

        export interface DeleteQuery {
          /** 文件类型，需要与文件的 token 相匹配 */
          type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
        }
      }
    }
  }
}

Internal.define({
  '/drive/v1/files': {
    GET: { name: 'drive.file.list', pagination: { argIndex: 0, itemsKey: 'files', tokenKey: 'next_page_token' } },
  },
  '/drive/v1/files/create_folder': {
    POST: 'drive.file.createFolder',
  },
  '/drive/v1/files/task_check': {
    GET: 'drive.file.taskCheck',
  },
  '/drive/v1/metas/batch_query': {
    POST: 'drive.meta.batchQuery',
  },
  '/drive/v1/files/{file_token}/statistics': {
    GET: 'drive.file.statistics.get',
  },
  '/drive/v1/files/{file_token}/view_records': {
    GET: { name: 'drive.file.viewRecord.list', pagination: { argIndex: 1 } },
  },
  '/drive/v1/files/{file_token}/copy': {
    POST: 'drive.file.copy',
  },
  '/drive/v1/files/{file_token}/move': {
    POST: 'drive.file.move',
  },
  '/drive/v1/files/{file_token}': {
    DELETE: 'drive.file.delete',
  },
  '/drive/v1/files/create_shortcut': {
    POST: 'drive.file.createShortcut',
  },
  '/drive/v1/files/upload_all': {
    POST: { name: 'drive.file.uploadAll', multipart: true },
  },
  '/drive/v1/files/upload_prepare': {
    POST: 'drive.file.uploadPrepare',
  },
  '/drive/v1/files/upload_part': {
    POST: { name: 'drive.file.uploadPart', multipart: true },
  },
  '/drive/v1/files/upload_finish': {
    POST: 'drive.file.uploadFinish',
  },
  '/drive/v1/files/{file_token}/download': {
    GET: { name: 'drive.file.download', type: 'binary' },
  },
  '/drive/v1/import_tasks': {
    POST: 'drive.importTask.create',
  },
  '/drive/v1/import_tasks/{ticket}': {
    GET: 'drive.importTask.get',
  },
  '/drive/v1/export_tasks': {
    POST: 'drive.exportTask.create',
  },
  '/drive/v1/export_tasks/{ticket}': {
    GET: 'drive.exportTask.get',
  },
  '/drive/v1/export_tasks/file/{file_token}/download': {
    GET: { name: 'drive.exportTask.download', type: 'binary' },
  },
  '/drive/v1/medias/upload_all': {
    POST: { name: 'drive.media.uploadAll', multipart: true },
  },
  '/drive/v1/medias/upload_prepare': {
    POST: 'drive.media.uploadPrepare',
  },
  '/drive/v1/medias/upload_part': {
    POST: { name: 'drive.media.uploadPart', multipart: true },
  },
  '/drive/v1/medias/upload_finish': {
    POST: 'drive.media.uploadFinish',
  },
  '/drive/v1/medias/{file_token}/download': {
    GET: { name: 'drive.media.download', type: 'binary' },
  },
  '/drive/v1/medias/batch_get_tmp_download_url': {
    GET: 'drive.media.batchGetTmpDownloadUrl',
  },
  '/drive/v1/files/{file_token}/versions': {
    POST: 'drive.file.version.create',
    GET: { name: 'drive.file.version.list', pagination: { argIndex: 1 } },
  },
  '/drive/v1/files/{file_token}/versions/{version_id}': {
    GET: 'drive.file.version.get',
    DELETE: 'drive.file.version.delete',
  },
  '/drive/v2/files/{file_token}/likes': {
    GET: { name: 'drive.file.like.list', pagination: { argIndex: 1 } },
  },
  '/drive/v1/files/{file_token}/subscribe': {
    POST: 'drive.file.subscribe',
  },
  '/drive/v1/files/{file_token}/get_subscribe': {
    GET: 'drive.file.getSubscribe',
  },
  '/drive/v1/files/{file_token}/delete_subscribe': {
    DELETE: 'drive.file.deleteSubscribe',
  },
  '/drive/v1/permissions/{token}/members/batch_create': {
    POST: 'drive.permission.member.batchCreate',
  },
  '/drive/v1/permissions/{token}/members/transfer_owner': {
    POST: 'drive.permission.member.transferOwner',
  },
  '/drive/v1/permissions/{token}/members/auth': {
    GET: 'drive.permission.member.auth',
  },
  '/drive/v1/permissions/{token}/members': {
    GET: 'drive.permission.member.list',
    POST: 'drive.permission.member.create',
  },
  '/drive/v1/permissions/{token}/members/{member_id}': {
    PUT: 'drive.permission.member.update',
    DELETE: 'drive.permission.member.delete',
  },
  '/drive/v1/permissions/{token}/public/password': {
    POST: 'drive.permission.public.password.create',
    PUT: 'drive.permission.public.password.update',
    DELETE: 'drive.permission.public.password.delete',
  },
  '/drive/v2/permissions/{token}/public': {
    GET: 'drive.permission.public.get',
    PATCH: 'drive.permission.public.patch',
  },
  '/drive/v1/files/{file_token}/comments': {
    GET: { name: 'drive.file.comment.list', pagination: { argIndex: 1 } },
    POST: 'drive.file.comment.create',
  },
  '/drive/v1/files/{file_token}/comments/batch_query': {
    POST: 'drive.file.comment.batchQuery',
  },
  '/drive/v1/files/{file_token}/comments/{comment_id}': {
    PATCH: 'drive.file.comment.patch',
    GET: 'drive.file.comment.get',
  },
  '/drive/v1/files/{file_token}/comments/{comment_id}/replies': {
    GET: { name: 'drive.file.comment.reply.list', pagination: { argIndex: 2 } },
  },
  '/drive/v1/files/{file_token}/comments/{comment_id}/replies/{reply_id}': {
    PUT: 'drive.file.comment.reply.update',
    DELETE: 'drive.file.comment.reply.delete',
  },
  '/drive/v1/files/{file_token}/subscriptions/{subscription_id}': {
    GET: 'drive.file.subscription.get',
    PATCH: 'drive.file.subscription.patch',
  },
  '/drive/v1/files/{file_token}/subscriptions': {
    POST: 'drive.file.subscription.create',
  },
})
