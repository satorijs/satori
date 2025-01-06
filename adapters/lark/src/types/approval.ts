import { ApprovalConfig, ApprovalCreateExternal, ApprovalCreateViewers, ApprovalForm, ApprovalNode, ApprovalNodeInfo, ApprovalSetting, ApprovalViewerInfo, CcNode, CcSearchItem, Comment, CommentAtInfo, Count, ExteranlInstanceCheck, ExteranlInstanceCheckResponse, ExternalInstance, ExternalInstanceForm, ExternalInstanceLink, ExternalInstanceTaskNode, ExternalTaskList, I18nResource, InstanceComment, InstanceSearchItem, InstanceTask, InstanceTimeline, NodeApprover, NodeAutoApproval, NodeCc, PreviewNode, Task, TaskSearchItem, TrusteeshipInstanceCacheConfig, TrusteeshipUrls } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建审批定义
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/create
     */
    createApproval(body: CreateApprovalRequest, query?: CreateApprovalQuery): Promise<CreateApprovalResponse>
    /**
     * 查看指定审批定义
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/get
     */
    getApproval(approval_code: string, query?: GetApprovalQuery): Promise<GetApprovalResponse>
    /**
     * 创建审批实例
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create
     */
    createApprovalInstance(body: CreateApprovalInstanceRequest): Promise<CreateApprovalInstanceResponse>
    /**
     * 撤回审批实例
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cancel
     */
    cancelApprovalInstance(body: CancelApprovalInstanceRequest, query?: CancelApprovalInstanceQuery): Promise<void>
    /**
     * 抄送审批实例
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cc
     */
    ccApprovalInstance(body: CcApprovalInstanceRequest, query?: CcApprovalInstanceQuery): Promise<void>
    /**
     * 预览审批流程
     * @see https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-preview
     */
    previewApprovalInstance(body: PreviewApprovalInstanceRequest, query?: PreviewApprovalInstanceQuery): Promise<PreviewApprovalInstanceResponse>
    /**
     * 获取单个审批实例详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/get
     */
    getApprovalInstance(instance_id: string, query?: GetApprovalInstanceQuery): Promise<GetApprovalInstanceResponse>
    /**
     * 批量获取审批实例 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list
     */
    listApprovalInstance(query?: ListApprovalInstanceQuery): Promise<Paginated<string, 'instance_code_list'>>
    /**
     * 同意审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/approve
     */
    approveApprovalTask(body: ApproveApprovalTaskRequest, query?: ApproveApprovalTaskQuery): Promise<void>
    /**
     * 拒绝审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/reject
     */
    rejectApprovalTask(body: RejectApprovalTaskRequest, query?: RejectApprovalTaskQuery): Promise<void>
    /**
     * 转交审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/transfer
     */
    transferApprovalTask(body: TransferApprovalTaskRequest, query?: TransferApprovalTaskQuery): Promise<void>
    /**
     * 退回审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/specified_rollback
     */
    specifiedRollbackApprovalInstance(body: SpecifiedRollbackApprovalInstanceRequest, query?: SpecifiedRollbackApprovalInstanceQuery): Promise<void>
    /**
     * 审批任务加签
     * @see https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-task-addsign
     */
    addSignApprovalInstance(body: AddSignApprovalInstanceRequest): Promise<void>
    /**
     * 重新提交审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/resubmit
     */
    resubmitApprovalTask(body: ResubmitApprovalTaskRequest, query?: ResubmitApprovalTaskQuery): Promise<void>
    /**
     * 创建评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/create
     */
    createApprovalInstanceComment(instance_id: string, body: CreateApprovalInstanceCommentRequest, query?: CreateApprovalInstanceCommentQuery): Promise<CreateApprovalInstanceCommentResponse>
    /**
     * 删除评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/delete
     */
    deleteApprovalInstanceComment(instance_id: string, comment_id: string, query?: DeleteApprovalInstanceCommentQuery): Promise<DeleteApprovalInstanceCommentResponse>
    /**
     * 清空评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/remove
     */
    removeApprovalInstanceComment(instance_id: string, query?: RemoveApprovalInstanceCommentQuery): Promise<RemoveApprovalInstanceCommentResponse>
    /**
     * 获取评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/list
     */
    listApprovalInstanceComment(instance_id: string, query?: ListApprovalInstanceCommentQuery): Promise<ListApprovalInstanceCommentResponse>
    /**
     * 创建三方审批定义
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create
     */
    createApprovalExternalApproval(body: CreateApprovalExternalApprovalRequest, query?: CreateApprovalExternalApprovalQuery): Promise<CreateApprovalExternalApprovalResponse>
    /**
     * 查看指定三方审批定义
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/get
     */
    getApprovalExternalApproval(approval_code: string, query?: GetApprovalExternalApprovalQuery): Promise<GetApprovalExternalApprovalResponse>
    /**
     * 同步三方审批实例
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create
     */
    createApprovalExternalInstance(body: CreateApprovalExternalInstanceRequest): Promise<CreateApprovalExternalInstanceResponse>
    /**
     * 校验三方审批实例
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/check
     */
    checkApprovalExternalInstance(body: CheckApprovalExternalInstanceRequest): Promise<CheckApprovalExternalInstanceResponse>
    /**
     * 获取三方审批任务状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_task/list
     */
    listApprovalExternalTask(body: ListApprovalExternalTaskRequest, query?: ListApprovalExternalTaskQuery): Promise<Paginated<ExternalTaskList, 'data'>>
    /**
     * 查询实例列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/query
     */
    queryApprovalInstance(body: QueryApprovalInstanceRequest, query?: QueryApprovalInstanceQuery): Promise<QueryApprovalInstanceResponse>
    /**
     * 查询抄送列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/search_cc
     */
    searchCcApprovalInstance(body: SearchCcApprovalInstanceRequest, query?: SearchCcApprovalInstanceQuery): Promise<SearchCcApprovalInstanceResponse>
    /**
     * 查询任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/search
     */
    searchApprovalTask(body: SearchApprovalTaskRequest, query?: SearchApprovalTaskQuery): Promise<SearchApprovalTaskResponse>
    /**
     * 查询用户的任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/query
     */
    queryApprovalTask(query?: QueryApprovalTaskQuery): Promise<QueryApprovalTaskResponse>
    /**
     * 订阅审批事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe
     */
    subscribeApproval(approval_code: string): Promise<void>
    /**
     * 取消订阅审批事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe
     */
    unsubscribeApproval(approval_code: string): Promise<void>
  }
}

export interface CreateApprovalRequest {
  /** 审批名称的国际化文案 Key，以 @i18n@ 开头，长度不得少于 9 个字符 */
  approval_name: string
  /** 传空表示新建 */
  approval_code?: string
  /** 审批描述的国际化文案 Key，以 @i18n@ 开头，长度不得少于 9 个字符 */
  description?: string
  /** viewers 字段指定了哪些人能从审批应用的前台发起该审批。  当 view_type 为 USER，需要填写viewer_user_id；  当       view_type 为DEPARTMENT，需要填写viewer_department_id；  当 view_type 为TENANT或NONE时，viewer_user_id和viewer_department_id无需填写 */
  viewers: ApprovalCreateViewers[]
  /** 审批定义表单内容，json 数组 */
  form: ApprovalForm
  /** 审批定义节点，需要将开始节点作为 list 第一个元素，结束节点作为最后一个元素 */
  node_list: ApprovalNode[]
  /** 审批定义其他设置 */
  settings?: ApprovalSetting
  /** 审批定义配置项，用于配置对应审批定义是否可以由用户在审批后台进行修改 */
  config?: ApprovalConfig
  /** 审批图标枚举，详见下方说明，默认为 0 */
  icon?: number
  /** 国际化文案 */
  i18n_resources: I18nResource[]
  /** 流程负责人 */
  process_manager_ids?: string[]
}

export interface CreateApprovalQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetApprovalQuery {
  /** 语言可选值 */
  locale?: 'zh-CN' | 'en-US' | 'ja-JP'
  /** 可选是否返回有数据权限审批流程管理员ID列表 */
  with_admin_id?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateApprovalInstanceRequest {
  /** 审批定义 code */
  approval_code: string
  /** 发起审批用户 */
  user_id?: string
  /** 发起审批用户 open id, 如果传了 user_id 则优先使用 user_id */
  open_id?: string
  /** 发起审批用户部门id，如果用户只属于一个部门，可以不填。如果属于多个部门，默认会选择部门列表第一个部门 */
  department_id?: string
  /** json 数组，控件值 */
  form: string
  /** 如果有发起人自选节点，则需要填写对应节点的审批人 */
  node_approver_user_id_list?: NodeApprover[]
  /** 审批人发起人自选 open id，与上述node_approver_user_id_list字段取并集 */
  node_approver_open_id_list?: NodeApprover[]
  /** 如果有发起人自选节点，则可填写对应节点的抄送人，单个节点最多选择20位抄送人 */
  node_cc_user_id_list?: NodeCc[]
  /** 抄送人发起人自选 open id 单个节点最多选择20位抄送人 */
  node_cc_open_id_list?: NodeCc[]
  /** 审批实例 uuid，用于幂等操作, 每个租户下面的唯一key，同一个 uuid 只能用于创建一个审批实例，如果冲突，返回错误码 60012 ，格式建议为 XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX，不区分大小写 */
  uuid?: string
  /** 可配置是否可以再次提交 */
  allow_resubmit?: boolean
  /** 可配置是否可以重新提交 */
  allow_submit_again?: boolean
  /** 配置bot是否取消通知结果 */
  cancel_bot_notification?: string
  /** 配置是否可以禁止撤销 */
  forbid_revoke?: boolean
  /** 国际化文案 */
  i18n_resources?: I18nResource[]
  /** 审批展示名称，如果填写了该字段，则审批列表中的审批名称使用该字段，如果不填该字段，则审批名称使用审批定义的名称 */
  title?: string
  /** 详情页title展示模式 */
  title_display_method?: 0 | 1
  /** 自动通过节点ID */
  node_auto_approval_list?: NodeAutoApproval[]
}

export interface CancelApprovalInstanceRequest {
  /** 审批定义Code */
  approval_code: string
  /** 审批实例Code */
  instance_code: string
  /** 操作用户, 根据user_id_type填写 */
  user_id: string
}

export interface CancelApprovalInstanceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CcApprovalInstanceRequest {
  /** 审批定义 code */
  approval_code: string
  /** 审批实例 code */
  instance_code: string
  /** 根据user_id_type填写发起抄送的人的用户id */
  user_id: string
  /** 根据user_id_type填写被抄送人的 用户id 列表 */
  cc_user_ids: string[]
  /** 抄送留言 */
  comment?: string
}

export interface CcApprovalInstanceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface PreviewApprovalInstanceRequest {
  /** 用户id */
  user_id: string
  /** 审批定义code */
  approval_code?: string
  /** 部门id */
  department_id?: string
  /** 表单数据 */
  form?: string
  /** 审批实例code */
  instance_code?: string
  /** 语言类型 */
  locale?: string
  /** 任务id */
  task_id?: string
}

export interface PreviewApprovalInstanceQuery {
  /** open_id(ou_开头)，union_id(on_开头)，user_id(字符串)。user_id_type不填默认为open_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
}

export interface GetApprovalInstanceQuery {
  /** 语言 */
  locale?: 'zh-CN' | 'en-US' | 'ja-JP'
  /** 发起审批用户id，仅自建应用可返回 */
  user_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'open_id' | 'union_id'
}

export interface ListApprovalInstanceQuery extends Pagination {
  /** 审批定义唯一标识 */
  approval_code: string
  /** 审批实例创建时间区间（毫秒） */
  start_time: string
  /** 审批实例创建时间区间（毫秒） */
  end_time: string
}

export interface ApproveApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
  /** json 数组，控件值 */
  form?: string
}

export interface ApproveApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface RejectApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
  /** json 数组，控件值 */
  form?: string
}

export interface RejectApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface TransferApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 根据user_id_type填写被转交人唯一 ID */
  transfer_user_id: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
}

export interface TransferApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SpecifiedRollbackApprovalInstanceRequest {
  /** 用户ID */
  user_id: string
  /** 回退的任务ID */
  task_id: string
  /** 退回原因 */
  reason?: string
  /** 扩展字段 */
  extra?: string
  /** 退回到节点列表 */
  task_def_key_list: string[]
}

export interface SpecifiedRollbackApprovalInstanceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface AddSignApprovalInstanceRequest {
  /** 操作用户id */
  user_id: string
  /** 审批定义code */
  approval_code: string
  /** 审批实例code */
  instance_code: string
  /** 任务id */
  task_id: string
  /** 意见 */
  comment?: string
  /** 被加签人id */
  add_sign_user_ids: string[]
  /** 1/2/3分别代表前加签/后加签/并加签 */
  add_sign_type: 1 | 2 | 3
  /** 仅在前加签、后加签时需要填写，1/2 分别代表或签/会签 */
  approval_method?: 1 | 2 | 3
}

export interface ResubmitApprovalTaskRequest {
  /** 审批定义 Code */
  approval_code: string
  /** 审批实例 Code */
  instance_code: string
  /** 根据user_id_type填写操作用户id */
  user_id: string
  /** 意见 */
  comment?: string
  /** 任务 ID， 审批实例详情task_list中id */
  task_id: string
  /** json 数组，控件值 */
  form: string
}

export interface ResubmitApprovalTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateApprovalInstanceCommentRequest {
  /** 评论内容，包含艾特人、附件等 */
  content?: string
  /** 评论中艾特人信息 */
  at_info_list?: CommentAtInfo[]
  /** 父评论ID，如果是回复评论，需要传 */
  parent_comment_id?: string
  /** 评论ID，如果是编辑、删除一条评论，需要传 */
  comment_id?: string
  /** disable_bot=true只同步数据，不触发bot */
  disable_bot?: boolean
  /** 附加字段 */
  extra?: string
}

export interface CreateApprovalInstanceCommentQuery {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
  /** 用户ID */
  user_id: string
}

export interface DeleteApprovalInstanceCommentQuery {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
  /** 根据user_id_type填写用户ID */
  user_id: string
}

export interface RemoveApprovalInstanceCommentQuery {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
  /** 根据user_id_type填写用户ID */
  user_id?: string
}

export interface ListApprovalInstanceCommentQuery extends Pagination {
  /** 用户ID类型，不填默认为open_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
  /** 用户ID */
  user_id: string
}

export interface CreateApprovalExternalApprovalRequest {
  /** 审批定义名称，创建审批定义返回的值，表示该实例属于哪个流程；该字段会影响到列表中该实例的标题，标题取自对应定义的 name 字段。 */
  approval_name: string
  /** 审批定义 code，用户自定义，定义的唯一标识，如果不存在该 code，则创建，否则更新 */
  approval_code: string
  /** 审批定义所属审批分组，用户自定义； 如果group_code当前不存在，则会新建审批分组； 如果group_code已经存在，则会使用group_name更新审批分组名称 */
  group_code: string
  /** 分组名称，值的格式是 i18n key，文案放在 i18n_resource； 如果是 group_code 当前不存在，则该 group_name 必填，否则，如果填写了则会更新分组名称，不填则不更新分组名称； 审批发起页 审批定义的分组名称来自该字段 */
  group_name?: string
  /** 审批定义的说明，值的格式是 i18n key，文案放在 i18n_resource； 审批发起页 审批定义的说明内容来自该字段 */
  description?: string
  /** 三方审批相关 */
  external: ApprovalCreateExternal
  /** 可见人列表，可通知配置多个可见人，只有在配置的范围内用户可以在审批发起也看到该审批，默认不传，则是任何人不可见 */
  viewers?: ApprovalCreateViewers[]
  /** 国际化文案 */
  i18n_resources?: I18nResource[]
  /** 根据user_id_type填写流程管理员id */
  managers?: string[]
}

export interface CreateApprovalExternalApprovalQuery {
  /** 此次调用中使用的部门ID的类型 */
  department_id_type?: 'department_id' | 'open_department_id'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetApprovalExternalApprovalQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateApprovalExternalInstanceRequest {
  /** 审批定义 code， 创建审批定义返回的值，表示该实例属于哪个流程；该字段会影响到列表中该实例的标题，标题取自对应定义的 name 字段 */
  approval_code: string
  /** 审批实例状态 */
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED' | 'DELETED' | 'HIDDEN' | 'TERMINATED'
  /** 审批实例扩展 JSON */
  extra?: string
  /** 审批实例唯一标识，用户自定义，需确保证租户、应用下唯一 */
  instance_id: string
  /** 审批实例链接集合 ，用于【已发起】列表的跳转，跳转回三方系统； pc_link 和 mobile_link 必须填一个，填写的是哪一端的链接，即会跳转到该链接，不受平台影响 */
  links: ExternalInstanceLink
  /** 审批展示名称，如果填写了该字段，则审批列表中的审批名称使用该字段，如果不填该字段，则审批名称使用审批定义的名称 */
  title?: string
  /** 用户提交审批时填写的表单数据，用于所有审批列表中展示。可传多个值，但审批中心pc展示前2个,移动端展示前3个,长度不超过2048字符 */
  form?: ExternalInstanceForm[]
  /** 审批发起人 user_id，发起人可在【已发起】列表中看到所有已发起的审批; 在【待审批】，【已审批】【抄送我】列表中，该字段展示审批是谁发起的。审批发起人 open id，和 user id 二选一。 */
  user_id?: string
  /** 审批发起人 用户名，如果发起人不是真实的用户（例如是某个部门），没有 user_id，则可以使用该字段传名称 */
  user_name?: string
  /** 审批发起人 open id，和 user id 二选一 */
  open_id?: string
  /** 发起人部门，用于列表中展示发起人所属部门。不传则不展示。如果用户没加入任何部门，传 ""，将展示租户名称传 department_name 展示部门名称 */
  department_id?: string
  /** 审批发起人 部门，如果发起人不是真实的用户（例如是某个部门），没有 department_id，则可以使用该字段传名称 */
  department_name?: string
  /** 审批发起时间，Unix毫秒时间戳 */
  start_time: string
  /** 审批实例结束时间：未结束的审批为 0，Unix毫秒时间戳 */
  end_time: string
  /** 审批实例最近更新时间；用于推送数据版本控制如果 update_mode 值为 UPDATE，则只有传过来的 update_time 有变化时（变大），才会更新审批中心中的审批实例信息。使用该字段主要用来避免并发时老的数据更新了新的数据 */
  update_time: string
  /** 列表页打开审批实例的方式 */
  display_method?: 'BROWSER' | 'SIDEBAR' | 'NORMAL' | 'TRUSTEESHIP'
  /** 更新方式， 当 update_mode=REPLACE时，每次都以当前推送的数据为最终数据，会删掉审批中心中多余的任务、抄送数据（不在这次推送的数据中）; 当 update_mode=UPDATE时，则不会删除审批中心的数据，而只是进行新增和更新实例、任务数据 */
  update_mode?: 'REPLACE' | 'UPDATE'
  /** 任务列表 */
  task_list?: ExternalInstanceTaskNode[]
  /** 抄送列表 */
  cc_list?: CcNode[]
  /** 国际化文案 */
  i18n_resources: I18nResource[]
  /** 单据托管认证token，托管回调会附带此token，帮助业务方认证 */
  trusteeship_url_token?: string
  /** 用户的类型，会影响请求参数用户标识域的选择，包括加签操作回传的目标用户， 目前仅支持 "user_id" */
  trusteeship_user_id_type?: string
  /** 单据托管回调接入方的接口的URL地址 */
  trusteeship_urls?: TrusteeshipUrls
  /** 托管预缓存策略 */
  trusteeship_cache_config?: TrusteeshipInstanceCacheConfig
  /** 资源所在地区， 内部统计用字段， 不需要填 */
  resource_region?: string
}

export interface CheckApprovalExternalInstanceRequest {
  /** 校验的实例信息 */
  instances: ExteranlInstanceCheck[]
}

export interface ListApprovalExternalTaskRequest {
  /** 审批定义 Code，用于指定只获取这些定义下的数据 */
  approval_codes?: string[]
  /** 审批实例 ID, 用于指定只获取这些实例下的数据，最多支持 20 个 */
  instance_ids?: string[]
  /** 审批人 user_id，用于指定只获取这些用户的数据 */
  user_ids?: string[]
  /** 审批任务状态，用于指定获取该状态下的数据 */
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'TRANSFERRED' | 'DONE'
}

export interface ListApprovalExternalTaskQuery extends Pagination {
}

export interface QueryApprovalInstanceRequest {
  /** 根据x_user_type填写用户 id */
  user_id?: string
  /** 审批定义 code */
  approval_code?: string
  /** 审批实例 code */
  instance_code?: string
  /** 审批实例第三方 id 注：和 approval_code 取并集 */
  instance_external_id?: string
  /** 审批定义分组第三方 id 注：和 instance_code 取并集 */
  group_external_id?: string
  /** 审批实例标题（只有第三方审批有） */
  instance_title?: string
  /** 审批实例状态，注：若不在集合中，报错 */
  instance_status?: 'PENDING' | 'RECALL' | 'REJECT' | 'DELETED' | 'APPROVED' | 'ALL'
  /** 实例查询开始时间（unix毫秒时间戳） */
  instance_start_time_from?: string
  /** 实例查询结束时间 (unix毫秒时间戳) */
  instance_start_time_to?: string
  /** 地区 */
  locale?: 'zh-CN' | 'en-US' | 'ja-JP'
}

export interface QueryApprovalInstanceQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SearchCcApprovalInstanceRequest {
  /** 根据x_user_type填写用户 id */
  user_id?: string
  /** 审批定义 code */
  approval_code?: string
  /** 审批实例 code */
  instance_code?: string
  /** 审批实例第三方 id 注：和 approval_code 取并集 */
  instance_external_id?: string
  /** 审批定义分组第三方 id 注：和 instance_code 取并集 */
  group_external_id?: string
  /** 审批实例标题（只有第三方审批有） */
  cc_title?: string
  /** 审批抄送状态，注：若不在集合中，报错 */
  read_status?: 'READ' | 'UNREAD' | 'ALL'
  /** 实例查询开始时间（unix毫秒时间戳） */
  cc_create_time_from?: string
  /** 实例查询结束时间 (unix毫秒时间戳) */
  cc_create_time_to?: string
  /** 地区 */
  locale?: 'zh-CN' | 'en-US' | 'ja-JP'
}

export interface SearchCcApprovalInstanceQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SearchApprovalTaskRequest {
  /** 根据x_user_type填写用户 id */
  user_id?: string
  /** 审批定义 code */
  approval_code?: string
  /** 审批实例 code */
  instance_code?: string
  /** 审批实例第三方 id 注：和 approval_code 取并集 */
  instance_external_id?: string
  /** 审批定义分组第三方 id 注：和 instance_code 取并集 */
  group_external_id?: string
  /** 审批任务标题（只有第三方审批有） */
  task_title?: string
  /** 审批任务状态，注：若不设置，查询全部状态 若不在集合中，报错 */
  task_status?: 'PENDING' | 'REJECTED' | 'APPROVED' | 'TRANSFERRED' | 'DONE' | 'RM_REPEAT' | 'PROCESSED' | 'ALL'
  /** 任务查询开始时间（unix毫秒时间戳） */
  task_start_time_from?: string
  /** 任务查询结束时间 (unix毫秒时间戳) */
  task_start_time_to?: string
  /** 地区 */
  locale?: 'zh-CN' | 'en-US' | 'ja-JP'
  /** 可选择task_status中的多个状态，当填写此参数时，task_status失效 */
  task_status_list?: string[]
  /** 按时间排序 */
  order?: 0 | 1 | 2 | 3
}

export interface SearchApprovalTaskQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface QueryApprovalTaskQuery extends Pagination {
  /** 需要查询的 User ID */
  user_id: string
  /** 需要查询的任务分组主题，如「待办」、「已办」等 */
  topic: '1' | '2' | '3' | '17' | '18'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateApprovalResponse {
  /** 审批定义 Code */
  approval_code?: string
  /** 审批定义 id */
  approval_id?: string
}

export interface GetApprovalResponse {
  /** 审批名称 */
  approval_name: string
  /** 审批定义状态 */
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'UNKNOWN'
  /** 控件信息 */
  form: string
  /** 节点信息 */
  node_list: ApprovalNodeInfo[]
  /** 可见人列表 */
  viewers: ApprovalViewerInfo[]
  /** 有数据管理权限的审批流程管理员ID */
  approval_admin_ids?: string[]
  /** 组件之间值关联关系 */
  form_widget_relation?: string
}

export interface CreateApprovalInstanceResponse {
  /** 审批实例 Code */
  instance_code: string
}

export interface PreviewApprovalInstanceResponse {
  /** 预览节点信息 */
  preview_nodes?: PreviewNode[]
}

export interface GetApprovalInstanceResponse {
  /** 审批名称 */
  approval_name: string
  /** 审批创建时间 */
  start_time?: string
  /** 审批完成时间，未完成为 0 */
  end_time: string
  /** 发起审批用户 */
  user_id: string
  /** 发起审批用户 open id */
  open_id: string
  /** 审批单编号 */
  serial_number: string
  /** 发起审批用户所在部门 */
  department_id: string
  /** 审批实例状态 */
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED' | 'DELETED'
  /** 用户的唯一标识id */
  uuid: string
  /** json字符串，控件值 */
  form: string
  /** 审批任务列表 */
  task_list: InstanceTask[]
  /** 评论列表 */
  comment_list: InstanceComment[]
  /** 审批动态 */
  timeline: InstanceTimeline[]
  /** 修改的原实例 code,仅在查询修改实例时显示该字段 */
  modified_instance_code?: string
  /** 撤销的原实例 code,仅在查询撤销实例时显示该字段 */
  reverted_instance_code?: string
  /** 审批定义 Code */
  approval_code: string
  /** 单据是否被撤销 */
  reverted?: boolean
  /** 审批实例 Code */
  instance_code: string
}

export interface CreateApprovalInstanceCommentResponse {
  /** 保存成功的comment_id */
  comment_id: string
}

export interface DeleteApprovalInstanceCommentResponse {
  /** 删除的评论ID */
  comment_id?: string
}

export interface RemoveApprovalInstanceCommentResponse {
  /** 审批实例code */
  instance_id?: string
  /** 租户自定义审批实例ID */
  external_id?: string
}

export interface ListApprovalInstanceCommentResponse {
  /** 评论数据列表 */
  comments: Comment[]
}

export interface CreateApprovalExternalApprovalResponse {
  /** 审批定义 code，用户自定义，定义的唯一标识 */
  approval_code: string
}

export interface GetApprovalExternalApprovalResponse {
  /** 审批定义名称 */
  approval_name: string
  /** 审批定义code */
  approval_code: string
  /** 审批定义所属分组 */
  group_code: string
  /** 分组名称 */
  group_name?: string
  /** 审批定义的说明 */
  description?: string
  /** 三方审批定义相关 */
  external?: ApprovalCreateExternal
  /** 可见人列表 */
  viewers?: ApprovalCreateViewers[]
  /** 国际化文案 */
  i18n_resources?: I18nResource[]
  /** 流程管理员 */
  managers?: string[]
}

export interface CreateApprovalExternalInstanceResponse {
  /** 同步的实例数据 */
  data?: ExternalInstance
}

export interface CheckApprovalExternalInstanceResponse {
  /** 更新时间不一致的实例信息 */
  diff_instances?: ExteranlInstanceCheckResponse[]
}

export interface QueryApprovalInstanceResponse {
  /** 查询返回条数 */
  count?: number
  /** 审批实例列表 */
  instance_list?: InstanceSearchItem[]
  /** 翻页 Token */
  page_token?: string
  /** 是否有更多任务可供拉取 */
  has_more?: boolean
}

export interface SearchCcApprovalInstanceResponse {
  /** 查询返回条数 */
  count?: number
  /** 审批实例列表 */
  cc_list?: CcSearchItem[]
  /** 翻页 Token */
  page_token?: string
  /** 是否有更多任务可供拉取 */
  has_more?: boolean
}

export interface SearchApprovalTaskResponse {
  /** 查询返回条数 */
  count?: number
  /** 审批任务列表 */
  task_list?: TaskSearchItem[]
  /** 翻页 Token */
  page_token?: string
  /** 是否有更多任务可供拉取 */
  has_more?: boolean
}

export interface QueryApprovalTaskResponse {
  /** 任务列表 */
  tasks: Task[]
  /** 翻页 Token */
  page_token?: string
  /** 是否有更多任务可供拉取 */
  has_more?: boolean
  /** 列表计数，只在分页第一页返回 */
  count?: Count
}

Internal.define({
  '/open-apis/approval/v4/approvals': {
    POST: 'createApproval',
  },
  '/open-apis/approval/v4/approvals/{approval_code}': {
    GET: 'getApproval',
  },
  '/open-apis/approval/v4/instances': {
    POST: 'createApprovalInstance',
    GET: 'listApprovalInstance',
  },
  '/open-apis/approval/v4/instances/cancel': {
    POST: 'cancelApprovalInstance',
  },
  '/open-apis/approval/v4/instances/cc': {
    POST: 'ccApprovalInstance',
  },
  '/open-apis/approval/v4/instances/preview': {
    POST: 'previewApprovalInstance',
  },
  '/open-apis/approval/v4/instances/{instance_id}': {
    GET: 'getApprovalInstance',
  },
  '/open-apis/approval/v4/tasks/approve': {
    POST: 'approveApprovalTask',
  },
  '/open-apis/approval/v4/tasks/reject': {
    POST: 'rejectApprovalTask',
  },
  '/open-apis/approval/v4/tasks/transfer': {
    POST: 'transferApprovalTask',
  },
  '/open-apis/approval/v4/instances/specified_rollback': {
    POST: 'specifiedRollbackApprovalInstance',
  },
  '/open-apis/approval/v4/instances/add_sign': {
    POST: 'addSignApprovalInstance',
  },
  '/open-apis/approval/v4/tasks/resubmit': {
    POST: 'resubmitApprovalTask',
  },
  '/open-apis/approval/v4/instances/{instance_id}/comments': {
    POST: 'createApprovalInstanceComment',
    GET: 'listApprovalInstanceComment',
  },
  '/open-apis/approval/v4/instances/{instance_id}/comments/{comment_id}': {
    DELETE: 'deleteApprovalInstanceComment',
  },
  '/open-apis/approval/v4/instances/{instance_id}/comments/remove': {
    POST: 'removeApprovalInstanceComment',
  },
  '/open-apis/approval/v4/external_approvals': {
    POST: 'createApprovalExternalApproval',
  },
  '/open-apis/approval/v4/external_approvals/{approval_code}': {
    GET: 'getApprovalExternalApproval',
  },
  '/open-apis/approval/v4/external_instances': {
    POST: 'createApprovalExternalInstance',
  },
  '/open-apis/approval/v4/external_instances/check': {
    POST: 'checkApprovalExternalInstance',
  },
  '/open-apis/approval/v4/external_tasks': {
    GET: 'listApprovalExternalTask',
  },
  '/open-apis/approval/v4/instances/query': {
    POST: 'queryApprovalInstance',
  },
  '/open-apis/approval/v4/instances/search_cc': {
    POST: 'searchCcApprovalInstance',
  },
  '/open-apis/approval/v4/tasks/search': {
    POST: 'searchApprovalTask',
  },
  '/open-apis/approval/v4/tasks/query': {
    GET: 'queryApprovalTask',
  },
  '/open-apis/approval/v4/approvals/{approval_code}/subscribe': {
    POST: 'subscribeApproval',
  },
  '/open-apis/approval/v4/approvals/{approval_code}/unsubscribe': {
    POST: 'unsubscribeApproval',
  },
})
