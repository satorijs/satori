import { Internal } from '../internal'
import { Block, BlockIdRelation, DeleteGridColumnRequest, DeleteTableColumnsRequest, DeleteTableRowsRequest, Document, InsertGridColumnRequest, InsertTableColumnRequest, InsertTableRowRequest, MergeTableCellsRequest, ReplaceFileRequest, ReplaceImageRequest, UnmergeTableCellsRequest, UpdateBlockRequest, UpdateGridColumnWidthRatioRequest, UpdateTablePropertyRequest, UpdateTaskRequest, UpdateTextElementsRequest, UpdateTextRequest, UpdateTextStyleRequest } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 获取群公告基本信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement/get
     */
    getDocxChatAnnouncement(chat_id: string, query?: GetDocxChatAnnouncementQuery): Promise<GetDocxChatAnnouncementResponse>
    /**
     * 获取群公告所有块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/list
     */
    listDocxChatAnnouncementBlock(chat_id: string, query?: ListDocxChatAnnouncementBlockQuery): Promise<ListDocxChatAnnouncementBlockResponse>
    /**
     * 在群公告中创建块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/create
     */
    createDocxChatAnnouncementBlockChildren(chat_id: string, block_id: string, body: CreateDocxChatAnnouncementBlockChildrenRequest, query?: CreateDocxChatAnnouncementBlockChildrenQuery): Promise<CreateDocxChatAnnouncementBlockChildrenResponse>
    /**
     * 批量更新群公告块的内容
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/batch_update
     */
    batchUpdateDocxChatAnnouncementBlock(chat_id: string, body: BatchUpdateDocxChatAnnouncementBlockRequest, query?: BatchUpdateDocxChatAnnouncementBlockQuery): Promise<BatchUpdateDocxChatAnnouncementBlockResponse>
    /**
     * 获取群公告块的内容
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block/get
     */
    getDocxChatAnnouncementBlock(chat_id: string, block_id: string, query?: GetDocxChatAnnouncementBlockQuery): Promise<GetDocxChatAnnouncementBlockResponse>
    /**
     * 获取所有子块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/get
     */
    getDocxChatAnnouncementBlockChildren(chat_id: string, block_id: string, query?: GetDocxChatAnnouncementBlockChildrenQuery): Promise<GetDocxChatAnnouncementBlockChildrenResponse>
    /**
     * 删除群公告中的块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/chat-announcement-block-children/batch_delete
     */
    batchDeleteDocxChatAnnouncementBlockChildren(chat_id: string, block_id: string, body: BatchDeleteDocxChatAnnouncementBlockChildrenRequest, query?: BatchDeleteDocxChatAnnouncementBlockChildrenQuery): Promise<BatchDeleteDocxChatAnnouncementBlockChildrenResponse>
    /**
     * 创建文档
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/create
     */
    createDocxDocument(body: CreateDocxDocumentRequest): Promise<CreateDocxDocumentResponse>
    /**
     * 获取文档基本信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/get
     */
    getDocxDocument(document_id: string): Promise<GetDocxDocumentResponse>
    /**
     * 获取文档纯文本内容
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document/raw_content
     */
    rawContentDocxDocument(document_id: string, query?: RawContentDocxDocumentQuery): Promise<RawContentDocxDocumentResponse>
    /**
     * 获取文档所有块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/list
     */
    listDocxDocumentBlock(document_id: string, query?: ListDocxDocumentBlockQuery): Promise<ListDocxDocumentBlockResponse>
    /**
     * 创建块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/create
     */
    createDocxDocumentBlockChildren(document_id: string, block_id: string, body: CreateDocxDocumentBlockChildrenRequest, query?: CreateDocxDocumentBlockChildrenQuery): Promise<CreateDocxDocumentBlockChildrenResponse>
    /**
     * 创建嵌套块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-descendant/create
     */
    createDocxDocumentBlockDescendant(document_id: string, block_id: string, body: CreateDocxDocumentBlockDescendantRequest, query?: CreateDocxDocumentBlockDescendantQuery): Promise<CreateDocxDocumentBlockDescendantResponse>
    /**
     * 更新块的内容
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/patch
     */
    patchDocxDocumentBlock(document_id: string, block_id: string, body: PatchDocxDocumentBlockRequest, query?: PatchDocxDocumentBlockQuery): Promise<PatchDocxDocumentBlockResponse>
    /**
     * 获取块的内容
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/get
     */
    getDocxDocumentBlock(document_id: string, block_id: string, query?: GetDocxDocumentBlockQuery): Promise<GetDocxDocumentBlockResponse>
    /**
     * 批量更新块的内容
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block/batch_update
     */
    batchUpdateDocxDocumentBlock(document_id: string, body: BatchUpdateDocxDocumentBlockRequest, query?: BatchUpdateDocxDocumentBlockQuery): Promise<BatchUpdateDocxDocumentBlockResponse>
    /**
     * 获取所有子块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/get
     */
    getDocxDocumentBlockChildren(document_id: string, block_id: string, query?: GetDocxDocumentBlockChildrenQuery): Promise<GetDocxDocumentBlockChildrenResponse>
    /**
     * 删除块
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/document-docx/docx-v1/document-block-children/batch_delete
     */
    batchDeleteDocxDocumentBlockChildren(document_id: string, block_id: string, body: BatchDeleteDocxDocumentBlockChildrenRequest, query?: BatchDeleteDocxDocumentBlockChildrenQuery): Promise<BatchDeleteDocxDocumentBlockChildrenResponse>
  }
}

export interface GetDocxChatAnnouncementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListDocxChatAnnouncementBlockQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 查询的群公告版本，-1 表示群公告最新版本。群公告创建后，版本为 1。若查询的版本为群公告最新版本，则需要持有群公告的阅读权限；若查询的版本为群公告的历史版本，则需要持有群公告的编辑权限。 */
  revision_id?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateDocxChatAnnouncementBlockChildrenRequest {
  /** 添加的孩子列表。 */
  children?: Block[]
  /** 当前 block 在 children 中的插入位置，起始值为 0，最大值为原 children 长度 */
  index?: number
}

export interface CreateDocxChatAnnouncementBlockChildrenQuery {
  /** 要操作的群公告版本。-1 表示群公告最新版本。群公告创建后，版本为 1。你需确保你已拥有群公告的编辑权限 */
  revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchUpdateDocxChatAnnouncementBlockRequest {
  /** 批量更新 Block */
  requests?: UpdateBlockRequest[]
}

export interface BatchUpdateDocxChatAnnouncementBlockQuery {
  /** 要操作的群公告版本。-1 表示群公告最新版本。群公告创建后，版本为 1。你需确保你已拥有群公告的编辑权限。 */
  revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetDocxChatAnnouncementBlockQuery {
  /** 查询的群公告版本，-1 表示群公告最新版本。群公告创建后，版本为 1。若查询的版本为群公告最新版本，则需要持有群公告的阅读权限；若查询的版本为群公告的历史版本，则需要持有群公告的更新权限 */
  revision_id?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetDocxChatAnnouncementBlockChildrenQuery {
  /** 查询的群公告版本，-1 表示群公告最新版本。群公告创建后，版本为 1。若查询的版本为群公告最新版本，则需要持有群公告的阅读权限；若查询的版本为群公告的历史版本，则需要持有群公告的更新权限。 */
  revision_id?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchDeleteDocxChatAnnouncementBlockChildrenRequest {
  /** 删除的起始索引（操作区间左闭右开） */
  start_index: number
  /** 删除的末尾索引（操作区间左闭右开） */
  end_index: number
}

export interface BatchDeleteDocxChatAnnouncementBlockChildrenQuery {
  /** 要操作的群公告版本。-1 表示群公告最新版本。群公告创建后，版本为 1。你需确保你已拥有群公告的编辑权限 */
  revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
}

export interface CreateDocxDocumentRequest {
  /** 文件夹 token，获取方式见云文档接口快速入门；空表示根目录，tenant_access_token应用权限仅允许操作应用创建的目录 */
  folder_token?: string
  /** 文档标题，只支持纯文本 */
  title?: string
}

export interface RawContentDocxDocumentQuery {
  /** 语言（用于 MentionUser 语言的选取） */
  lang?: 0 | 1 | 2
}

export interface ListDocxDocumentBlockQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 查询的文档版本，-1表示文档最新版本。若此时查询的版本为文档最新版本，则需要持有文档的阅读权限；若此时查询的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateDocxDocumentBlockChildrenRequest {
  /** 添加的孩子列表。 */
  children?: Block[]
  /** 当前 block 在 children 中的插入位置，起始值为 0，最大值为原 children 长度 */
  index?: number
}

export interface CreateDocxDocumentBlockChildrenQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateDocxDocumentBlockDescendantRequest {
  /** 添加的孩子 BlockID 列表 */
  children_id: string[]
  /** 当前 Block 在 Children 中的插入位置，起始值为 0，最大值为原 Children 长度 */
  index?: number
  /** 添加的子孙列表，包括孩子 */
  descendants: Block[]
}

export interface CreateDocxDocumentBlockDescendantQuery {
  /** 操作的文档版本，-1 表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface PatchDocxDocumentBlockRequest {
  /** 更新文本元素请求 */
  update_text_elements?: UpdateTextElementsRequest
  /** 更新文本样式请求 */
  update_text_style?: UpdateTextStyleRequest
  /** 更新表格属性请求 */
  update_table_property?: UpdateTablePropertyRequest
  /** 表格插入新行请求 */
  insert_table_row?: InsertTableRowRequest
  /** 表格插入新列请求 */
  insert_table_column?: InsertTableColumnRequest
  /** 表格批量删除行请求 */
  delete_table_rows?: DeleteTableRowsRequest
  /** 表格批量删除列请求 */
  delete_table_columns?: DeleteTableColumnsRequest
  /** 表格合并单元格请求 */
  merge_table_cells?: MergeTableCellsRequest
  /** 表格取消单元格合并状态请求 */
  unmerge_table_cells?: UnmergeTableCellsRequest
  /** 分栏插入新的分栏列请求 */
  insert_grid_column?: InsertGridColumnRequest
  /** 分栏删除列请求 */
  delete_grid_column?: DeleteGridColumnRequest
  /** 更新分栏列宽比例请求 */
  update_grid_column_width_ratio?: UpdateGridColumnWidthRatioRequest
  /** 替换图片请求 */
  replace_image?: ReplaceImageRequest
  /** 替换附件请求 */
  replace_file?: ReplaceFileRequest
  /** 更新文本元素及样式请求 */
  update_text?: UpdateTextRequest
  /** 更新任务 Block 请求 */
  update_task?: UpdateTaskRequest
}

export interface PatchDocxDocumentBlockQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetDocxDocumentBlockQuery {
  /** 查询的文档版本，-1表示文档最新版本。若此时查询的版本为文档最新版本，则需要持有文档的阅读权限；若此时查询的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchUpdateDocxDocumentBlockRequest {
  /** 批量更新 Block */
  requests: UpdateBlockRequest[]
}

export interface BatchUpdateDocxDocumentBlockQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetDocxDocumentBlockChildrenQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 分页大小 */
  page_size?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchDeleteDocxDocumentBlockChildrenRequest {
  /** 删除的起始索引（操作区间左闭右开） */
  start_index: number
  /** 删除的末尾索引（操作区间左闭右开） */
  end_index: number
}

export interface BatchDeleteDocxDocumentBlockChildrenQuery {
  /** 操作的文档版本，-1表示文档最新版本。若此时操作的版本为文档最新版本，则需要持有文档的阅读权限；若此时操作的版本为文档的历史版本，则需要持有文档的编辑权限。 */
  document_revision_id?: number
  /** 操作的唯一标识，与接口返回值的 client_token 相对应，用于幂等的进行更新操作。此值为空表示将发起一次新的请求，此值非空表示幂等的进行更新操作。 */
  client_token?: string
}

export interface GetDocxChatAnnouncementResponse {
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

export interface ListDocxChatAnnouncementBlockResponse {
  /** 群公告的 Block 信息 */
  items?: Block[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}

export interface CreateDocxChatAnnouncementBlockChildrenResponse {
  /** 所添加的孩子的 Block 信息 */
  children?: Block[]
  /** 当前 Block Children 创建成功后群公告的版本号 */
  revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token?: string
}

export interface BatchUpdateDocxChatAnnouncementBlockResponse {
  /** 批量更新的 Block */
  blocks?: Block[]
  /** 当前更新成功后群公告的版本号 */
  revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token?: string
}

export interface GetDocxChatAnnouncementBlockResponse {
  /** 查询的 Block 的信息 */
  block?: Block
}

export interface GetDocxChatAnnouncementBlockChildrenResponse {
  /** Block 的 Children 列表 */
  items?: Block[]
  /** 下一个分页的分页标记 */
  page_token?: string
  /** 是否还有下一个分页 */
  has_more?: boolean
}

export interface BatchDeleteDocxChatAnnouncementBlockChildrenResponse {
  /** 当前删除操作成功后群公告的版本号 */
  revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token?: string
}

export interface CreateDocxDocumentResponse {
  /** 新建文档的文档信息 */
  document?: Document
}

export interface GetDocxDocumentResponse {
  /** 文档信息 */
  document?: Document
}

export interface RawContentDocxDocumentResponse {
  /** 文档纯文本 */
  content?: string
}

export interface ListDocxDocumentBlockResponse {
  /** 文档的 Block 信息 */
  items?: Block[]
  /** 下一个分页的分页标记 */
  page_token?: string
  /** 是否还有下一个分页 */
  has_more?: boolean
}

export interface CreateDocxDocumentBlockChildrenResponse {
  /** 所添加的孩子的 Block 信息 */
  children?: Block[]
  /** 当前 block children 创建成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}

export interface CreateDocxDocumentBlockDescendantResponse {
  /** 所添加的孩子的 Block 信息 */
  children?: Block[]
  /** 当前提交的 Block 创建成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token?: string
  /** 传入的临时 BlockID 与真实 BlockID 映射关系 */
  block_id_relations?: BlockIdRelation[]
}

export interface PatchDocxDocumentBlockResponse {
  /** 更新后的 block 信息 */
  block?: Block
  /** 当前更新成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}

export interface GetDocxDocumentBlockResponse {
  /** 查询的 Block 的信息 */
  block?: Block
}

export interface BatchUpdateDocxDocumentBlockResponse {
  /** 批量更新的 Block */
  blocks?: Block[]
  /** 当前更新成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}

export interface GetDocxDocumentBlockChildrenResponse {
  /** block 的 children 列表 */
  items?: Block[]
  /** 下一个分页的分页标记 */
  page_token?: string
  /** 是否还有下一个分页 */
  has_more?: boolean
}

export interface BatchDeleteDocxDocumentBlockChildrenResponse {
  /** 当前删除操作成功后文档的版本号 */
  document_revision_id?: number
  /** 操作的唯一标识，更新请求中使用此值表示幂等的进行此次更新 */
  client_token: string
}

Internal.define({
  '/open-apis/docx/v1/chats/{chat_id}/announcement': {
    GET: 'getDocxChatAnnouncement',
  },
  '/open-apis/docx/v1/chats/{chat_id}/announcement/blocks': {
    GET: 'listDocxChatAnnouncementBlock',
  },
  '/open-apis/docx/v1/chats/{chat_id}/announcement/blocks/{block_id}/children': {
    POST: 'createDocxChatAnnouncementBlockChildren',
    GET: 'getDocxChatAnnouncementBlockChildren',
  },
  '/open-apis/docx/v1/chats/{chat_id}/announcement/blocks/batch_update': {
    PATCH: 'batchUpdateDocxChatAnnouncementBlock',
  },
  '/open-apis/docx/v1/chats/{chat_id}/announcement/blocks/{block_id}': {
    GET: 'getDocxChatAnnouncementBlock',
  },
  '/open-apis/docx/v1/chats/{chat_id}/announcement/blocks/{block_id}/children/batch_delete': {
    DELETE: 'batchDeleteDocxChatAnnouncementBlockChildren',
  },
  '/open-apis/docx/v1/documents': {
    POST: 'createDocxDocument',
  },
  '/open-apis/docx/v1/documents/{document_id}': {
    GET: 'getDocxDocument',
  },
  '/open-apis/docx/v1/documents/{document_id}/raw_content': {
    GET: 'rawContentDocxDocument',
  },
  '/open-apis/docx/v1/documents/{document_id}/blocks': {
    GET: 'listDocxDocumentBlock',
  },
  '/open-apis/docx/v1/documents/{document_id}/blocks/{block_id}/children': {
    POST: 'createDocxDocumentBlockChildren',
    GET: 'getDocxDocumentBlockChildren',
  },
  '/open-apis/docx/v1/documents/{document_id}/blocks/{block_id}/descendant': {
    POST: 'createDocxDocumentBlockDescendant',
  },
  '/open-apis/docx/v1/documents/{document_id}/blocks/{block_id}': {
    PATCH: 'patchDocxDocumentBlock',
    GET: 'getDocxDocumentBlock',
  },
  '/open-apis/docx/v1/documents/{document_id}/blocks/batch_update': {
    PATCH: 'batchUpdateDocxDocumentBlock',
  },
  '/open-apis/docx/v1/documents/{document_id}/blocks/{block_id}/children/batch_delete': {
    DELETE: 'batchDeleteDocxDocumentBlockChildren',
  },
})
