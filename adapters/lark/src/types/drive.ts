import { Internal } from '../internal'
import { BaseMember, ExportTask, File, FileComment, FileCommentReply, FileLike, FileStatistics, FileViewRecord, ImportTask, ImportTaskMountPoint, Member, Meta, MetaFailed, PermissionPublic, Property, ReferEntity, ReplyContent, ReplyList, RequestDoc, TmpDownloadUrl, Version } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 获取文件夹中的文件清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list
     */
    listDriveV1File(query?: ListDriveV1FileQuery): Promise<ListDriveV1FileResponse>
    /**
     * 新建文件夹
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_folder
     */
    createFolderDriveV1File(body: CreateFolderDriveV1FileRequest): Promise<CreateFolderDriveV1FileResponse>
    /**
     * 查询异步任务状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check
     */
    taskCheckDriveV1File(query?: TaskCheckDriveV1FileQuery): Promise<TaskCheckDriveV1FileResponse>
    /**
     * 获取文件元数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/meta/batch_query
     */
    batchQueryDriveV1Meta(body: BatchQueryDriveV1MetaRequest, query?: BatchQueryDriveV1MetaQuery): Promise<BatchQueryDriveV1MetaResponse>
    /**
     * 获取文件统计信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-statistics/get
     */
    getDriveV1FileStatistics(file_token: string, query?: GetDriveV1FileStatisticsQuery): Promise<GetDriveV1FileStatisticsResponse>
    /**
     * 获取文件访问记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-view_record/list
     */
    listDriveV1FileViewRecord(file_token: string, query?: ListDriveV1FileViewRecordQuery): Promise<ListDriveV1FileViewRecordResponse>
    /**
     * 复制文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy
     */
    copyDriveV1File(file_token: string, body: CopyDriveV1FileRequest, query?: CopyDriveV1FileQuery): Promise<CopyDriveV1FileResponse>
    /**
     * 移动文件或文件夹
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/move
     */
    moveDriveV1File(file_token: string, body: MoveDriveV1FileRequest): Promise<MoveDriveV1FileResponse>
    /**
     * 删除文件或文件夹
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete
     */
    deleteDriveV1File(file_token: string, query?: DeleteDriveV1FileQuery): Promise<DeleteDriveV1FileResponse>
    /**
     * 创建文件快捷方式
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_shortcut
     */
    createShortcutDriveV1File(body: CreateShortcutDriveV1FileRequest, query?: CreateShortcutDriveV1FileQuery): Promise<CreateShortcutDriveV1FileResponse>
    /**
     * 上传文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all
     */
    uploadAllDriveV1File(form: UploadAllDriveV1FileForm): Promise<UploadAllDriveV1FileResponse>
    /**
     * 分片上传文件-预上传
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare
     */
    uploadPrepareDriveV1File(body: UploadPrepareDriveV1FileRequest): Promise<UploadPrepareDriveV1FileResponse>
    /**
     * 分片上传文件-上传分片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part
     */
    uploadPartDriveV1File(form: UploadPartDriveV1FileForm): Promise<void>
    /**
     * 分片上传文件-完成上传
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish
     */
    uploadFinishDriveV1File(body: UploadFinishDriveV1FileRequest): Promise<UploadFinishDriveV1FileResponse>
    /**
     * 下载文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/download
     */
    downloadDriveV1File(file_token: string): Promise<ArrayBuffer>
    /**
     * 创建导入任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create
     */
    createDriveV1ImportTask(body: CreateDriveV1ImportTaskRequest): Promise<CreateDriveV1ImportTaskResponse>
    /**
     * 查询导入任务结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get
     */
    getDriveV1ImportTask(ticket: string): Promise<GetDriveV1ImportTaskResponse>
    /**
     * 创建导出任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create
     */
    createDriveV1ExportTask(body: CreateDriveV1ExportTaskRequest): Promise<CreateDriveV1ExportTaskResponse>
    /**
     * 查询导出任务结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get
     */
    getDriveV1ExportTask(ticket: string, query?: GetDriveV1ExportTaskQuery): Promise<GetDriveV1ExportTaskResponse>
    /**
     * 下载导出文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download
     */
    downloadDriveV1ExportTask(file_token: string): Promise<ArrayBuffer>
    /**
     * 上传素材
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all
     */
    uploadAllDriveV1Media(form: UploadAllDriveV1MediaForm): Promise<UploadAllDriveV1MediaResponse>
    /**
     * 分片上传素材-预上传
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare
     */
    uploadPrepareDriveV1Media(body: UploadPrepareDriveV1MediaRequest): Promise<UploadPrepareDriveV1MediaResponse>
    /**
     * 分片上传素材-上传分片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part
     */
    uploadPartDriveV1Media(form: UploadPartDriveV1MediaForm): Promise<void>
    /**
     * 分片上传素材-完成上传
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish
     */
    uploadFinishDriveV1Media(body: UploadFinishDriveV1MediaRequest): Promise<UploadFinishDriveV1MediaResponse>
    /**
     * 下载素材
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/download
     */
    downloadDriveV1Media(file_token: string, query?: DownloadDriveV1MediaQuery): Promise<ArrayBuffer>
    /**
     * 获取素材临时下载链接
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/batch_get_tmp_download_url
     */
    batchGetTmpDownloadUrlDriveV1Media(query?: BatchGetTmpDownloadUrlDriveV1MediaQuery): Promise<BatchGetTmpDownloadUrlDriveV1MediaResponse>
    /**
     * 创建文档版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/create
     */
    createDriveV1FileVersion(file_token: string, body: CreateDriveV1FileVersionRequest, query?: CreateDriveV1FileVersionQuery): Promise<CreateDriveV1FileVersionResponse>
    /**
     * 获取文档版本列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/list
     */
    listDriveV1FileVersion(file_token: string, query?: ListDriveV1FileVersionQuery): Promise<ListDriveV1FileVersionResponse>
    /**
     * 获取文档版本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/get
     */
    getDriveV1FileVersion(file_token: string, version_id: string, query?: GetDriveV1FileVersionQuery): Promise<GetDriveV1FileVersionResponse>
    /**
     * 删除文档版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/delete
     */
    deleteDriveV1FileVersion(file_token: string, version_id: string, query?: DeleteDriveV1FileVersionQuery): Promise<void>
    /**
     * 获取云文档的点赞者列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/file-like/list
     */
    listDriveV2FileLike(file_token: string, query?: ListDriveV2FileLikeQuery): Promise<ListDriveV2FileLikeResponse>
    /**
     * 订阅云文档事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/subscribe
     */
    subscribeDriveV1File(file_token: string, query?: SubscribeDriveV1FileQuery): Promise<void>
    /**
     * 查询云文档事件订阅状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/get_subscribe
     */
    getSubscribeDriveV1File(file_token: string, query?: GetSubscribeDriveV1FileQuery): Promise<GetSubscribeDriveV1FileResponse>
    /**
     * 取消云文档事件订阅
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete_subscribe
     */
    deleteSubscribeDriveV1File(file_token: string, query?: DeleteSubscribeDriveV1FileQuery): Promise<void>
    /**
     * 批量增加协作者权限
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/batch_create
     */
    batchCreateDriveV1PermissionMember(token: string, body: BatchCreateDriveV1PermissionMemberRequest, query?: BatchCreateDriveV1PermissionMemberQuery): Promise<BatchCreateDriveV1PermissionMemberResponse>
    /**
     * 转移所有者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/transfer_owner
     */
    transferOwnerDriveV1PermissionMember(token: string, body: TransferOwnerDriveV1PermissionMemberRequest, query?: TransferOwnerDriveV1PermissionMemberQuery): Promise<void>
    /**
     * 判断当前用户是否有某权限
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/auth
     */
    authDriveV1PermissionMember(token: string, query?: AuthDriveV1PermissionMemberQuery): Promise<AuthDriveV1PermissionMemberResponse>
    /**
     * 获取协作者列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/list
     */
    listDriveV1PermissionMember(token: string, query?: ListDriveV1PermissionMemberQuery): Promise<ListDriveV1PermissionMemberResponse>
    /**
     * 增加协作者权限
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create
     */
    createDriveV1PermissionMember(token: string, body: CreateDriveV1PermissionMemberRequest, query?: CreateDriveV1PermissionMemberQuery): Promise<CreateDriveV1PermissionMemberResponse>
    /**
     * 更新协作者权限
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/update
     */
    updateDriveV1PermissionMember(token: string, member_id: string, body: UpdateDriveV1PermissionMemberRequest, query?: UpdateDriveV1PermissionMemberQuery): Promise<UpdateDriveV1PermissionMemberResponse>
    /**
     * 移除协作者权限
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/delete
     */
    deleteDriveV1PermissionMember(token: string, member_id: string, body: DeleteDriveV1PermissionMemberRequest, query?: DeleteDriveV1PermissionMemberQuery): Promise<void>
    /**
     * 开启密码
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/create
     */
    createDriveV1PermissionPublicPassword(token: string, query?: CreateDriveV1PermissionPublicPasswordQuery): Promise<CreateDriveV1PermissionPublicPasswordResponse>
    /**
     * 刷新密码
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/update
     */
    updateDriveV1PermissionPublicPassword(token: string, query?: UpdateDriveV1PermissionPublicPasswordQuery): Promise<UpdateDriveV1PermissionPublicPasswordResponse>
    /**
     * 关闭密码
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/delete
     */
    deleteDriveV1PermissionPublicPassword(token: string, query?: DeleteDriveV1PermissionPublicPasswordQuery): Promise<void>
    /**
     * 获取云文档权限设置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/get
     */
    getDriveV1PermissionPublic(token: string, query?: GetDriveV1PermissionPublicQuery): Promise<GetDriveV1PermissionPublicResponse>
    /**
     * 更新云文档权限设置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/patch
     */
    patchDriveV1PermissionPublic(token: string, body: PatchDriveV1PermissionPublicRequest, query?: PatchDriveV1PermissionPublicQuery): Promise<PatchDriveV1PermissionPublicResponse>
    /**
     * 获取云文档权限设置
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/get
     */
    getDriveV2PermissionPublic(token: string, query?: GetDriveV2PermissionPublicQuery): Promise<GetDriveV2PermissionPublicResponse>
    /**
     * 更新云文档权限设置
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/patch
     */
    patchDriveV2PermissionPublic(token: string, body: PatchDriveV2PermissionPublicRequest, query?: PatchDriveV2PermissionPublicQuery): Promise<PatchDriveV2PermissionPublicResponse>
    /**
     * 获取云文档所有评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/list
     */
    listDriveV1FileComment(file_token: string, query?: ListDriveV1FileCommentQuery): Promise<ListDriveV1FileCommentResponse>
    /**
     * 批量获取评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/batch_query
     */
    batchQueryDriveV1FileComment(file_token: string, body: BatchQueryDriveV1FileCommentRequest, query?: BatchQueryDriveV1FileCommentQuery): Promise<BatchQueryDriveV1FileCommentResponse>
    /**
     * 解决/恢复评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/patch
     */
    patchDriveV1FileComment(file_token: string, comment_id: string, body: PatchDriveV1FileCommentRequest, query?: PatchDriveV1FileCommentQuery): Promise<void>
    /**
     * 添加全文评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/create
     */
    createDriveV1FileComment(file_token: string, body: CreateDriveV1FileCommentRequest, query?: CreateDriveV1FileCommentQuery): Promise<CreateDriveV1FileCommentResponse>
    /**
     * 获取全文评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/get
     */
    getDriveV1FileComment(file_token: string, comment_id: string, query?: GetDriveV1FileCommentQuery): Promise<GetDriveV1FileCommentResponse>
    /**
     * 获取回复信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/list
     */
    listDriveV1FileCommentReply(file_token: string, comment_id: string, query?: ListDriveV1FileCommentReplyQuery): Promise<ListDriveV1FileCommentReplyResponse>
    /**
     * 更新回复的内容
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/update
     */
    updateDriveV1FileCommentReply(file_token: string, comment_id: string, reply_id: string, body: UpdateDriveV1FileCommentReplyRequest, query?: UpdateDriveV1FileCommentReplyQuery): Promise<void>
    /**
     * 删除回复
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/delete
     */
    deleteDriveV1FileCommentReply(file_token: string, comment_id: string, reply_id: string, query?: DeleteDriveV1FileCommentReplyQuery): Promise<void>
    /**
     * 获取订阅状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/get
     */
    getDriveV1FileSubscription(file_token: string, subscription_id: string, body: GetDriveV1FileSubscriptionRequest): Promise<GetDriveV1FileSubscriptionResponse>
    /**
     * 创建订阅
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/create
     */
    createDriveV1FileSubscription(file_token: string, body: CreateDriveV1FileSubscriptionRequest): Promise<CreateDriveV1FileSubscriptionResponse>
    /**
     * 更新订阅状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/patch
     */
    patchDriveV1FileSubscription(file_token: string, subscription_id: string, body: PatchDriveV1FileSubscriptionRequest): Promise<PatchDriveV1FileSubscriptionResponse>
  }
}

export interface ListDriveV1FileQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 文件夹的token（若不填写该参数或填写空字符串，则默认获取用户云空间下的清单，且不支持分页） */
  folder_token?: string
  /** 排序规则 */
  order_by?: 'EditedTime' | 'CreatedTime'
  /** 升序降序 */
  direction?: 'ASC' | 'DESC'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateFolderDriveV1FileRequest {
  /** 文件夹名称 */
  name: string
  /** 父文件夹token */
  folder_token: string
}

export interface TaskCheckDriveV1FileQuery {
  /** 文件相关异步任务id */
  task_id: string
}

export interface BatchQueryDriveV1MetaRequest {
  /** 请求文档,  一次不超过200个 */
  request_docs: RequestDoc[]
  /** 是否获取文档链接 */
  with_url?: boolean
}

export interface BatchQueryDriveV1MetaQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetDriveV1FileStatisticsQuery {
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'mindnote' | 'bitable' | 'wiki' | 'file' | 'docx'
}

export interface ListDriveV1FileViewRecordQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 文档类型 */
  file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'mindnote' | 'wiki' | 'file'
  /** 此次调用中使用的访问者 ID 的类型 */
  viewer_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CopyDriveV1FileRequest {
  /** 被复制文件的新名称 */
  name: string
  /** 被复制文件的类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
  type?: 'file' | 'doc' | 'sheet' | 'bitable' | 'docx' | 'mindnote' | 'slides'
  /** 文件被复制到的目标文件夹token */
  folder_token: string
  /** 用户自定义请求附加参数，用于实现特殊的复制语义 */
  extra?: Property[]
}

export interface CopyDriveV1FileQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface MoveDriveV1FileRequest {
  /** 文件类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
  type?: 'file' | 'docx' | 'bitable' | 'doc' | 'sheet' | 'mindnote' | 'folder' | 'slides'
  /** 目标文件夹token */
  folder_token?: string
}

export interface DeleteDriveV1FileQuery {
  /** 被删除文件的类型 */
  type: 'file' | 'docx' | 'bitable' | 'folder' | 'doc' | 'sheet' | 'mindnote' | 'shortcut' | 'slides'
}

export interface CreateShortcutDriveV1FileRequest {
  /** 创建快捷方式的目标父文件夹 token */
  parent_token: string
  /** 快捷方式映射到的文档和文件列表信息 */
  refer_entity: ReferEntity
}

export interface CreateShortcutDriveV1FileQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UploadAllDriveV1FileForm {
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

export interface UploadPrepareDriveV1FileRequest {
  /** 文件名 */
  file_name: string
  /** 上传点类型 */
  parent_type: 'explorer'
  /** 文件夹的token */
  parent_node: string
  /** 文件大小 */
  size: number
}

export interface UploadPartDriveV1FileForm {
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

export interface UploadFinishDriveV1FileRequest {
  /** 分片上传事务ID */
  upload_id: string
  /** 分片数量 */
  block_num: number
}

export interface CreateDriveV1ImportTaskRequest {
  /** 导入文件格式后缀 */
  file_extension: string
  /** 导入的文件 Token */
  file_token: string
  /** 导入目标云文档类型，支持的类型 新版文档：docx；电子表格：sheet；多维表格：bitable */
  type: string
  /** 目标云文档的标题，若为空，则使用导入文件的名字 */
  file_name?: string
  /** 挂载点 */
  point: ImportTaskMountPoint
}

export interface CreateDriveV1ExportTaskRequest {
  /** 导出文件扩展名 */
  file_extension: 'docx' | 'pdf' | 'xlsx' | 'csv'
  /** 导出文档 Token */
  token: string
  /** 导出文档类型 */
  type: 'doc' | 'sheet' | 'bitable' | 'docx'
  /** 导出子表 ID，仅当将 sheet/bitable 导出为 csv 时使用 */
  sub_id?: string
}

export interface GetDriveV1ExportTaskQuery {
  /** 导出文档的 token */
  token: string
}

export interface UploadAllDriveV1MediaForm {
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

export interface UploadPrepareDriveV1MediaRequest {
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

export interface UploadPartDriveV1MediaForm {
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

export interface UploadFinishDriveV1MediaRequest {
  /** 分片上传事务ID */
  upload_id: string
  /** 分片数量 */
  block_num: number
}

export interface DownloadDriveV1MediaQuery {
  /** 扩展信息 */
  extra?: string
}

export interface BatchGetTmpDownloadUrlDriveV1MediaQuery {
  /** 文件标识符列表 */
  file_tokens: string[]
  /** 拓展信息(可选) */
  extra?: string
}

export interface CreateDriveV1FileVersionRequest {
  /** 版本文档标题，最大长度 1024 个Unicode 码点。通常情况下，一个英文或中文字符对应一个码点，但是某些特殊符号可能会对应多个码点。例如，家庭组合「👨‍👩‍👧」这个表情符号对应5个码点。 */
  name?: string
  /** 版本文档类型 */
  obj_type?: 'docx' | 'sheet'
}

export interface CreateDriveV1FileVersionQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListDriveV1FileVersionQuery {
  /** 分页大小 */
  page_size: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 原文档类型 */
  obj_type: 'docx' | 'sheet'
  /** 用户id类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface GetDriveV1FileVersionQuery {
  /** 文档类型 */
  obj_type: 'docx' | 'sheet'
  /** 用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface DeleteDriveV1FileVersionQuery {
  /** 文档类型 */
  obj_type: 'docx' | 'sheet'
  /** 用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface ListDriveV2FileLikeQuery {
  /** 文件类型，如果该值为空或者与文件实际类型不匹配，接口会返回失败。 */
  file_type: 'doc' | 'docx' | 'file'
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SubscribeDriveV1FileQuery {
  /** 文档类型 */
  file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'folder'
  /** 事件类型 */
  event_type?: string
}

export interface GetSubscribeDriveV1FileQuery {
  /** 文档类型 */
  file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'file' | 'folder'
  /** 事件类型 */
  event_type?: string
}

export interface DeleteSubscribeDriveV1FileQuery {
  /** 文档类型 */
  file_type: 'doc' | 'docx' | 'sheet' | 'bitable' | 'file' | 'folder'
  /** 事件类型 */
  event_type?: string
}

export interface BatchCreateDriveV1PermissionMemberRequest {
  /** 协作者列表 */
  members: BaseMember[]
}

export interface BatchCreateDriveV1PermissionMemberQuery {
  /** 文件的类型 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'folder' | 'mindnote' | 'minutes' | 'slides'
  /** 添加权限后是否通知对方 */
  need_notification?: boolean
}

export interface TransferOwnerDriveV1PermissionMemberRequest {
  /** 文档拥有者的ID类型 */
  member_type: 'email' | 'openid' | 'userid'
  /** 文档拥有者的ID，与文档拥有者的ID类型需要对应 */
  member_id: string
}

export interface TransferOwnerDriveV1PermissionMemberQuery {
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

export interface AuthDriveV1PermissionMemberQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
  /** 需要判断的权限 */
  action: 'view' | 'edit' | 'share' | 'comment' | 'export' | 'copy' | 'print' | 'manage_public'
}

export interface ListDriveV1PermissionMemberQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
  /** 指定返回的协作者字段信息，如无指定则默认不返回**可选值有：** - `name`：协作者名- `type`：协作者类型- `avatar`：头像- `external_label`：外部标签**注意：** - 你可以使用特殊值`*`指定返回目前支持的所有字段- 你可以使用`,`分隔若干个你想指定返回的字段，如：`name,avatar`- 按需指定返回字段接口性能更好 */
  fields?: string
  /** 协作者的权限角色类型 */
  perm_type?: 'container' | 'single_page'
}

export interface CreateDriveV1PermissionMemberRequest {
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

export interface CreateDriveV1PermissionMemberQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'folder' | 'mindnote' | 'minutes' | 'slides'
  /** 添加权限后是否通知对方 */
  need_notification?: boolean
}

export interface UpdateDriveV1PermissionMemberRequest {
  /** 协作者ID类型 */
  member_type: 'email' | 'openid' | 'unionid' | 'openchat' | 'opendepartmentid' | 'userid' | 'groupid' | 'wikispaceid'
  /** 协作者的权限角色 */
  perm: 'view' | 'edit' | 'full_access'
  /** 协作者的权限角色类型 */
  perm_type?: 'container' | 'single_page'
  /** 协作者类型 */
  type?: 'user' | 'chat' | 'department' | 'group' | 'wiki_space_member' | 'wiki_space_viewer' | 'wiki_space_editor'
}

export interface UpdateDriveV1PermissionMemberQuery {
  /** 更新权限后是否通知对方**注意：** 使用`tenant_access_token`访问不支持该参数 */
  need_notification?: boolean
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface DeleteDriveV1PermissionMemberRequest {
  /** 协作者类型 */
  type?: 'user' | 'chat' | 'department' | 'group' | 'wiki_space_member' | 'wiki_space_viewer' | 'wiki_space_editor'
  /** 协作者的权限角色类型 */
  perm_type?: 'container' | 'single_page'
}

export interface DeleteDriveV1PermissionMemberQuery {
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'folder' | 'mindnote' | 'minutes' | 'slides'
  /** 权限成员类型，放于query参数中，如：`?member_type=openid` */
  member_type: 'email' | 'openid' | 'openchat' | 'opendepartmentid' | 'userid' | 'unionid' | 'groupid' | 'wikispaceid'
}

export interface CreateDriveV1PermissionPublicPasswordQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface UpdateDriveV1PermissionPublicPasswordQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface DeleteDriveV1PermissionPublicPasswordQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface GetDriveV1PermissionPublicQuery {
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface PatchDriveV1PermissionPublicRequest {
  /** 允许内容被分享到组织外 */
  external_access?: boolean
  /** 谁可以复制内容、创建副本、打印、下载 */
  security_entity?: 'anyone_can_view' | 'anyone_can_edit' | 'only_full_access'
  /** 谁可以评论 */
  comment_entity?: 'anyone_can_view' | 'anyone_can_edit'
  /** 谁可以添加和管理协作者 */
  share_entity?: 'anyone' | 'same_tenant' | 'only_full_access'
  /** 链接分享设置 */
  link_share_entity?: 'tenant_readable' | 'tenant_editable' | 'anyone_readable' | 'anyone_editable' | 'closed'
  /** 允许非「可管理权限」的人分享到组织外 */
  invite_external?: boolean
}

export interface PatchDriveV1PermissionPublicQuery {
  /** 文件类型，放于query参数中，如：`?type=doc` */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface GetDriveV2PermissionPublicQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface PatchDriveV2PermissionPublicRequest {
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

export interface PatchDriveV2PermissionPublicQuery {
  /** 文件类型，需要与文件的 token 相匹配 */
  type: 'doc' | 'sheet' | 'file' | 'wiki' | 'bitable' | 'docx' | 'mindnote' | 'minutes' | 'slides'
}

export interface ListDriveV1FileCommentQuery {
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'file' | 'docx'
  /** 是否全文评论 */
  is_whole?: boolean
  /** 是否已解决（可选） */
  is_solved?: boolean
  /** 评论分页参数 */
  page_token?: string
  /** 获取满足 commen_id > page_token 的评论数量 */
  page_size?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchQueryDriveV1FileCommentRequest {
  /** 需要获取数据的评论id */
  comment_ids: string[]
}

export interface BatchQueryDriveV1FileCommentQuery {
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'file' | 'docx'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface PatchDriveV1FileCommentRequest {
  /** 评论解决标志 */
  is_solved: boolean
}

export interface PatchDriveV1FileCommentQuery {
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'file' | 'docx'
}

export interface CreateDriveV1FileCommentRequest {
  /** 评论里的回复列表 */
  reply_list?: ReplyList
}

export interface CreateDriveV1FileCommentQuery {
  /** 文档类型 */
  file_type: 'doc' | 'docx'
  /** 此次调用中使用的用户 ID 的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetDriveV1FileCommentQuery {
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'file' | 'docx'
  /** 此次调用中使用的用户 ID 的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListDriveV1FileCommentReplyQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'file' | 'docx'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateDriveV1FileCommentReplyRequest {
  /** 回复内容 */
  content: ReplyContent
}

export interface UpdateDriveV1FileCommentReplyQuery {
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'file' | 'docx'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteDriveV1FileCommentReplyQuery {
  /** 文档类型 */
  file_type: 'doc' | 'sheet' | 'file' | 'docx'
}

export interface GetDriveV1FileSubscriptionRequest {
  /** 文档类型 */
  file_type: 'doc' | 'docx' | 'wiki'
}

export interface CreateDriveV1FileSubscriptionRequest {
  /** 订阅关系ID */
  subscription_id?: string
  /** 订阅类型 */
  subscription_type: 'comment_update'
  /** 是否订阅 */
  is_subcribe?: boolean
  /** 文档类型 */
  file_type: 'doc' | 'docx' | 'wiki'
}

export interface PatchDriveV1FileSubscriptionRequest {
  /** 是否订阅 */
  is_subscribe: boolean
  /** 文档类型 */
  file_type: 'doc' | 'docx' | 'wiki'
}

export interface ListDriveV1FileResponse {
  /** 文档详细信息 */
  files?: File[]
  /** 下一页分页参数 */
  next_page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface CreateFolderDriveV1FileResponse {
  /** 新创建的文件夹 Token */
  token?: string
  /** 创建文件夹的访问 URL */
  url?: string
}

export interface TaskCheckDriveV1FileResponse {
  /** 异步任务的执行状态 */
  status?: string
}

export interface BatchQueryDriveV1MetaResponse {
  metas: Meta[]
  failed_list?: MetaFailed[]
}

export interface GetDriveV1FileStatisticsResponse {
  /** 文档token */
  file_token?: string
  /** 文档类型 */
  file_type?: string
  /** 文档统计信息 */
  statistics?: FileStatistics
}

export interface ListDriveV1FileViewRecordResponse {
  /** 访问记录列表 */
  items?: FileViewRecord[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}

export interface CopyDriveV1FileResponse {
  /** 复制后的文件资源 */
  file?: File
}

export interface MoveDriveV1FileResponse {
  /** 异步任务id，移动文件夹时返回 */
  task_id?: string
}

export interface DeleteDriveV1FileResponse {
  /** 异步任务id，删除文件夹时返回 */
  task_id?: string
}

export interface CreateShortcutDriveV1FileResponse {
  /** 返回创建成功的shortcut节点 */
  succ_shortcut_node?: File
}

export interface UploadAllDriveV1FileResponse {
  file_token?: string
}

export interface UploadPrepareDriveV1FileResponse {
  /** 分片上传事务ID */
  upload_id?: string
  /** 分片大小策略 */
  block_size?: number
  /** 分片数量 */
  block_num?: number
}

export interface UploadFinishDriveV1FileResponse {
  file_token?: string
}

export interface CreateDriveV1ImportTaskResponse {
  /** 导入任务ID */
  ticket?: string
}

export interface GetDriveV1ImportTaskResponse {
  /** 导入任务 */
  result?: ImportTask
}

export interface CreateDriveV1ExportTaskResponse {
  /** 导出任务ID */
  ticket?: string
}

export interface GetDriveV1ExportTaskResponse {
  /** 导出结果 */
  result?: ExportTask
}

export interface UploadAllDriveV1MediaResponse {
  file_token?: string
}

export interface UploadPrepareDriveV1MediaResponse {
  /** 分片上传事务ID */
  upload_id?: string
  /** 分片大小策略 */
  block_size?: number
  /** 分片数量 */
  block_num?: number
}

export interface UploadFinishDriveV1MediaResponse {
  file_token?: string
}

export interface BatchGetTmpDownloadUrlDriveV1MediaResponse {
  /** 临时下载列表 */
  tmp_download_urls?: TmpDownloadUrl[]
}

export interface CreateDriveV1FileVersionResponse {
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

export interface ListDriveV1FileVersionResponse {
  /** 版本文档列表 */
  items?: Version[]
  /** 下一页请求token */
  page_token?: string
  /** 是否有下一页数据 */
  has_more?: boolean
}

export interface GetDriveV1FileVersionResponse {
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

export interface ListDriveV2FileLikeResponse {
  /** 文件的点赞者列表 */
  items?: FileLike[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多点赞记录 */
  has_more?: boolean
}

export interface GetSubscribeDriveV1FileResponse {
  /** 是否有订阅，取值 true 表示已订阅；false 表示未订阅 */
  is_subscribe?: boolean
}

export interface BatchCreateDriveV1PermissionMemberResponse {
  /** 协作者列表 */
  members?: BaseMember[]
}

export interface AuthDriveV1PermissionMemberResponse {
  /** 是否有权限 */
  auth_result: boolean
}

export interface ListDriveV1PermissionMemberResponse {
  /** 返回的列表数据 */
  items?: Member[]
}

export interface CreateDriveV1PermissionMemberResponse {
  /** 本次添加权限的用户信息 */
  member?: BaseMember
}

export interface UpdateDriveV1PermissionMemberResponse {
  /** 本次更新权限的用户信息 */
  member?: BaseMember
}

export interface CreateDriveV1PermissionPublicPasswordResponse {
  /** 密码 */
  password?: string
}

export interface UpdateDriveV1PermissionPublicPasswordResponse {
  /** 密码 */
  password?: string
}

export interface GetDriveV1PermissionPublicResponse {
  /** 返回的文档公共设置 */
  permission_public?: PermissionPublic
}

export interface PatchDriveV1PermissionPublicResponse {
  /** 本次更新后的文档公共设置 */
  permission_public?: PermissionPublic
}

export interface GetDriveV2PermissionPublicResponse {
  /** 返回的文档公共设置 */
  permission_public?: PermissionPublic
}

export interface PatchDriveV2PermissionPublicResponse {
  /** 本次更新后文档公共设置 */
  permission_public?: PermissionPublic
}

export interface ListDriveV1FileCommentResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下一页分页的 Token */
  page_token?: string
  items?: FileComment[]
}

export interface BatchQueryDriveV1FileCommentResponse {
  /** 评论的相关信息、回复的信息、回复分页的信息 */
  items?: FileComment[]
}

export interface CreateDriveV1FileCommentResponse {
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
  reply_list?: ReplyList
}

export interface GetDriveV1FileCommentResponse {
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
  reply_list?: ReplyList
}

export interface ListDriveV1FileCommentReplyResponse {
  items?: FileCommentReply[]
  page_token?: string
  has_more: boolean
}

export interface GetDriveV1FileSubscriptionResponse {
  /** 订阅关系ID */
  subscription_id: string
  /** 订阅类型 */
  subscription_type?: 'comment_update'
  /** 是否订阅 */
  is_subcribe?: boolean
  /** 文档类型 */
  file_type?: 'doc' | 'docx' | 'wiki'
}

export interface CreateDriveV1FileSubscriptionResponse {
  /** 订阅关系ID */
  subscription_id?: string
  /** 订阅类型 */
  subscription_type?: 'comment_update'
  /** 是否订阅 */
  is_subcribe?: boolean
  /** 文档类型 */
  file_type?: 'doc' | 'docx' | 'wiki'
}

export interface PatchDriveV1FileSubscriptionResponse {
  /** 订阅关系ID */
  subscription_id?: string
  /** 订阅类型 */
  subscription_type?: 'comment_update'
  /** 是否订阅 */
  is_subcribe?: boolean
  /** 文档类型 */
  file_type?: 'doc' | 'docx' | 'wiki'
}

Internal.define({
  '/open-apis/drive/v1/files': {
    GET: 'listDriveV1File',
  },
  '/open-apis/drive/v1/files/create_folder': {
    POST: 'createFolderDriveV1File',
  },
  '/open-apis/drive/v1/files/task_check': {
    GET: 'taskCheckDriveV1File',
  },
  '/open-apis/drive/v1/metas/batch_query': {
    POST: 'batchQueryDriveV1Meta',
  },
  '/open-apis/drive/v1/files/{file_token}/statistics': {
    GET: 'getDriveV1FileStatistics',
  },
  '/open-apis/drive/v1/files/{file_token}/view_records': {
    GET: 'listDriveV1FileViewRecord',
  },
  '/open-apis/drive/v1/files/{file_token}/copy': {
    POST: 'copyDriveV1File',
  },
  '/open-apis/drive/v1/files/{file_token}/move': {
    POST: 'moveDriveV1File',
  },
  '/open-apis/drive/v1/files/{file_token}': {
    DELETE: 'deleteDriveV1File',
  },
  '/open-apis/drive/v1/files/create_shortcut': {
    POST: 'createShortcutDriveV1File',
  },
  '/open-apis/drive/v1/files/upload_all': {
    POST: { name: 'uploadAllDriveV1File', multipart: true },
  },
  '/open-apis/drive/v1/files/upload_prepare': {
    POST: 'uploadPrepareDriveV1File',
  },
  '/open-apis/drive/v1/files/upload_part': {
    POST: { name: 'uploadPartDriveV1File', multipart: true },
  },
  '/open-apis/drive/v1/files/upload_finish': {
    POST: 'uploadFinishDriveV1File',
  },
  '/open-apis/drive/v1/files/{file_token}/download': {
    GET: { name: 'downloadDriveV1File', type: 'binary' },
  },
  '/open-apis/drive/v1/import_tasks': {
    POST: 'createDriveV1ImportTask',
  },
  '/open-apis/drive/v1/import_tasks/{ticket}': {
    GET: 'getDriveV1ImportTask',
  },
  '/open-apis/drive/v1/export_tasks': {
    POST: 'createDriveV1ExportTask',
  },
  '/open-apis/drive/v1/export_tasks/{ticket}': {
    GET: 'getDriveV1ExportTask',
  },
  '/open-apis/drive/v1/export_tasks/file/{file_token}/download': {
    GET: { name: 'downloadDriveV1ExportTask', type: 'binary' },
  },
  '/open-apis/drive/v1/medias/upload_all': {
    POST: { name: 'uploadAllDriveV1Media', multipart: true },
  },
  '/open-apis/drive/v1/medias/upload_prepare': {
    POST: 'uploadPrepareDriveV1Media',
  },
  '/open-apis/drive/v1/medias/upload_part': {
    POST: { name: 'uploadPartDriveV1Media', multipart: true },
  },
  '/open-apis/drive/v1/medias/upload_finish': {
    POST: 'uploadFinishDriveV1Media',
  },
  '/open-apis/drive/v1/medias/{file_token}/download': {
    GET: { name: 'downloadDriveV1Media', type: 'binary' },
  },
  '/open-apis/drive/v1/medias/batch_get_tmp_download_url': {
    GET: 'batchGetTmpDownloadUrlDriveV1Media',
  },
  '/open-apis/drive/v1/files/{file_token}/versions': {
    POST: 'createDriveV1FileVersion',
    GET: 'listDriveV1FileVersion',
  },
  '/open-apis/drive/v1/files/{file_token}/versions/{version_id}': {
    GET: 'getDriveV1FileVersion',
    DELETE: 'deleteDriveV1FileVersion',
  },
  '/open-apis/drive/v2/files/{file_token}/likes': {
    GET: 'listDriveV2FileLike',
  },
  '/open-apis/drive/v1/files/{file_token}/subscribe': {
    POST: 'subscribeDriveV1File',
  },
  '/open-apis/drive/v1/files/{file_token}/get_subscribe': {
    GET: 'getSubscribeDriveV1File',
  },
  '/open-apis/drive/v1/files/{file_token}/delete_subscribe': {
    DELETE: 'deleteSubscribeDriveV1File',
  },
  '/open-apis/drive/v1/permissions/{token}/members/batch_create': {
    POST: 'batchCreateDriveV1PermissionMember',
  },
  '/open-apis/drive/v1/permissions/{token}/members/transfer_owner': {
    POST: 'transferOwnerDriveV1PermissionMember',
  },
  '/open-apis/drive/v1/permissions/{token}/members/auth': {
    GET: 'authDriveV1PermissionMember',
  },
  '/open-apis/drive/v1/permissions/{token}/members': {
    GET: 'listDriveV1PermissionMember',
    POST: 'createDriveV1PermissionMember',
  },
  '/open-apis/drive/v1/permissions/{token}/members/{member_id}': {
    PUT: 'updateDriveV1PermissionMember',
    DELETE: 'deleteDriveV1PermissionMember',
  },
  '/open-apis/drive/v1/permissions/{token}/public/password': {
    POST: 'createDriveV1PermissionPublicPassword',
    PUT: 'updateDriveV1PermissionPublicPassword',
    DELETE: 'deleteDriveV1PermissionPublicPassword',
  },
  '/open-apis/drive/v1/permissions/{token}/public': {
    GET: 'getDriveV1PermissionPublic',
    PATCH: 'patchDriveV1PermissionPublic',
  },
  '/open-apis/drive/v2/permissions/{token}/public': {
    GET: 'getDriveV2PermissionPublic',
    PATCH: 'patchDriveV2PermissionPublic',
  },
  '/open-apis/drive/v1/files/{file_token}/comments': {
    GET: 'listDriveV1FileComment',
    POST: 'createDriveV1FileComment',
  },
  '/open-apis/drive/v1/files/{file_token}/comments/batch_query': {
    POST: 'batchQueryDriveV1FileComment',
  },
  '/open-apis/drive/v1/files/{file_token}/comments/{comment_id}': {
    PATCH: 'patchDriveV1FileComment',
    GET: 'getDriveV1FileComment',
  },
  '/open-apis/drive/v1/files/{file_token}/comments/{comment_id}/replies': {
    GET: 'listDriveV1FileCommentReply',
  },
  '/open-apis/drive/v1/files/{file_token}/comments/{comment_id}/replies/{reply_id}': {
    PUT: 'updateDriveV1FileCommentReply',
    DELETE: 'deleteDriveV1FileCommentReply',
  },
  '/open-apis/drive/v1/files/{file_token}/subscriptions/{subscription_id}': {
    GET: 'getDriveV1FileSubscription',
    PATCH: 'patchDriveV1FileSubscription',
  },
  '/open-apis/drive/v1/files/{file_token}/subscriptions': {
    POST: 'createDriveV1FileSubscription',
  },
})
