import { Attachment, Collaborator, Comment, CustomComplete, CustomField, DatetimeSetting, DocxSource, Due, Follower, InputComment, InputCustomField, InputCustomFieldValue, InputOption, InputSection, InputTask, InputTasklist, Member, MemberSetting, NumberSetting, Option, Origin, Reminder, Section, SectionSummary, SelectSetting, Start, Task, TaskDependency, TaskInTasklistInfo, TaskSummary, Tasklist, TasklistActivitySubscription, TextSetting } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/create
     */
    createTaskV2(body: CreateTaskV2Request, query?: CreateTaskV2Query): Promise<CreateTaskV2Response>
    /**
     * 获取任务详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/get
     */
    getTaskV2(task_guid: string, query?: GetTaskV2Query): Promise<GetTaskV2Response>
    /**
     * 更新任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/patch
     */
    patchTaskV2(task_guid: string, body: PatchTaskV2Request, query?: PatchTaskV2Query): Promise<PatchTaskV2Response>
    /**
     * 删除任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/delete
     */
    deleteTaskV2(task_guid: string): Promise<void>
    /**
     * 添加任务成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_members
     */
    addMembersTaskV2(task_guid: string, body: AddMembersTaskV2Request, query?: AddMembersTaskV2Query): Promise<AddMembersTaskV2Response>
    /**
     * 移除任务成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_members
     */
    removeMembersTaskV2(task_guid: string, body: RemoveMembersTaskV2Request, query?: RemoveMembersTaskV2Query): Promise<RemoveMembersTaskV2Response>
    /**
     * 列取任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/list
     */
    listTaskV2(query?: ListTaskV2Query & Pagination): Promise<Paginated<Task>>
    /**
     * 列取任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/list
     */
    listTaskV2Iter(query?: ListTaskV2Query): AsyncIterator<Task>
    /**
     * 列取任务所在清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/tasklists
     */
    tasklistsTaskV2(task_guid: string): Promise<TasklistsTaskV2Response>
    /**
     * 任务加入清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_tasklist
     */
    addTasklistTaskV2(task_guid: string, body: AddTasklistTaskV2Request, query?: AddTasklistTaskV2Query): Promise<AddTasklistTaskV2Response>
    /**
     * 任务移出清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_tasklist
     */
    removeTasklistTaskV2(task_guid: string, body: RemoveTasklistTaskV2Request, query?: RemoveTasklistTaskV2Query): Promise<RemoveTasklistTaskV2Response>
    /**
     * 添加任务提醒
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_reminders
     */
    addRemindersTaskV2(task_guid: string, body: AddRemindersTaskV2Request, query?: AddRemindersTaskV2Query): Promise<AddRemindersTaskV2Response>
    /**
     * 移除任务提醒
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_reminders
     */
    removeRemindersTaskV2(task_guid: string, body: RemoveRemindersTaskV2Request, query?: RemoveRemindersTaskV2Query): Promise<RemoveRemindersTaskV2Response>
    /**
     * 添加依赖
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_dependencies
     */
    addDependenciesTaskV2(task_guid: string, body: AddDependenciesTaskV2Request): Promise<AddDependenciesTaskV2Response>
    /**
     * 移除依赖
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_dependencies
     */
    removeDependenciesTaskV2(task_guid: string, body: RemoveDependenciesTaskV2Request): Promise<RemoveDependenciesTaskV2Response>
    /**
     * 创建子任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/create
     */
    createTaskV2TaskSubtask(task_guid: string, body: CreateTaskV2TaskSubtaskRequest, query?: CreateTaskV2TaskSubtaskQuery): Promise<CreateTaskV2TaskSubtaskResponse>
    /**
     * 获取任务的子任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/list
     */
    listTaskV2TaskSubtask(task_guid: string, query?: ListTaskV2TaskSubtaskQuery & Pagination): Promise<Paginated<Task>>
    /**
     * 获取任务的子任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/list
     */
    listTaskV2TaskSubtaskIter(task_guid: string, query?: ListTaskV2TaskSubtaskQuery): AsyncIterator<Task>
    /**
     * 创建清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/create
     */
    createTaskV2Tasklist(body: CreateTaskV2TasklistRequest, query?: CreateTaskV2TasklistQuery): Promise<CreateTaskV2TasklistResponse>
    /**
     * 获取清单详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/get
     */
    getTaskV2Tasklist(tasklist_guid: string, query?: GetTaskV2TasklistQuery): Promise<GetTaskV2TasklistResponse>
    /**
     * 更新清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/patch
     */
    patchTaskV2Tasklist(tasklist_guid: string, body: PatchTaskV2TasklistRequest, query?: PatchTaskV2TasklistQuery): Promise<PatchTaskV2TasklistResponse>
    /**
     * 删除清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/delete
     */
    deleteTaskV2Tasklist(tasklist_guid: string): Promise<void>
    /**
     * 添加清单成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/add_members
     */
    addMembersTaskV2Tasklist(tasklist_guid: string, body: AddMembersTaskV2TasklistRequest, query?: AddMembersTaskV2TasklistQuery): Promise<AddMembersTaskV2TasklistResponse>
    /**
     * 移除清单成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/remove_members
     */
    removeMembersTaskV2Tasklist(tasklist_guid: string, body: RemoveMembersTaskV2TasklistRequest, query?: RemoveMembersTaskV2TasklistQuery): Promise<RemoveMembersTaskV2TasklistResponse>
    /**
     * 获取清单任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/tasks
     */
    tasksTaskV2Tasklist(tasklist_guid: string, query?: TasksTaskV2TasklistQuery & Pagination): Promise<Paginated<TaskSummary>>
    /**
     * 获取清单任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/tasks
     */
    tasksTaskV2TasklistIter(tasklist_guid: string, query?: TasksTaskV2TasklistQuery): AsyncIterator<TaskSummary>
    /**
     * 获取清单列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/list
     */
    listTaskV2Tasklist(query?: ListTaskV2TasklistQuery & Pagination): Promise<Paginated<Tasklist>>
    /**
     * 获取清单列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/list
     */
    listTaskV2TasklistIter(query?: ListTaskV2TasklistQuery): AsyncIterator<Tasklist>
    /**
     * 创建动态订阅
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/create
     */
    createTaskV2TasklistActivitySubscription(tasklist_guid: string, body: CreateTaskV2TasklistActivitySubscriptionRequest, query?: CreateTaskV2TasklistActivitySubscriptionQuery): Promise<CreateTaskV2TasklistActivitySubscriptionResponse>
    /**
     * 获取动态订阅
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/get
     */
    getTaskV2TasklistActivitySubscription(tasklist_guid: string, activity_subscription_guid: string, query?: GetTaskV2TasklistActivitySubscriptionQuery): Promise<GetTaskV2TasklistActivitySubscriptionResponse>
    /**
     * 列取动态订阅
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/list
     */
    listTaskV2TasklistActivitySubscription(tasklist_guid: string, query?: ListTaskV2TasklistActivitySubscriptionQuery): Promise<ListTaskV2TasklistActivitySubscriptionResponse>
    /**
     * 更新动态订阅
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/patch
     */
    patchTaskV2TasklistActivitySubscription(tasklist_guid: string, activity_subscription_guid: string, body: PatchTaskV2TasklistActivitySubscriptionRequest, query?: PatchTaskV2TasklistActivitySubscriptionQuery): Promise<PatchTaskV2TasklistActivitySubscriptionResponse>
    /**
     * 删除动态订阅
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/delete
     */
    deleteTaskV2TasklistActivitySubscription(tasklist_guid: string, activity_subscription_guid: string): Promise<void>
    /**
     * 创建评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/create
     */
    createTaskV2Comment(body: CreateTaskV2CommentRequest, query?: CreateTaskV2CommentQuery): Promise<CreateTaskV2CommentResponse>
    /**
     * 获取评论详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/get
     */
    getTaskV2Comment(comment_id: string, query?: GetTaskV2CommentQuery): Promise<GetTaskV2CommentResponse>
    /**
     * 更新评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/patch
     */
    patchTaskV2Comment(comment_id: string, body: PatchTaskV2CommentRequest, query?: PatchTaskV2CommentQuery): Promise<PatchTaskV2CommentResponse>
    /**
     * 删除评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/delete
     */
    deleteTaskV2Comment(comment_id: string): Promise<void>
    /**
     * 获取评论列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/list
     */
    listTaskV2Comment(query?: ListTaskV2CommentQuery & Pagination): Promise<Paginated<Comment>>
    /**
     * 获取评论列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/list
     */
    listTaskV2CommentIter(query?: ListTaskV2CommentQuery): AsyncIterator<Comment>
    /**
     * 上传附件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/upload
     */
    uploadTaskV2Attachment(form: UploadTaskV2AttachmentForm, query?: UploadTaskV2AttachmentQuery): Promise<UploadTaskV2AttachmentResponse>
    /**
     * 列取附件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/list
     */
    listTaskV2Attachment(query?: ListTaskV2AttachmentQuery & Pagination): Promise<Paginated<Attachment>>
    /**
     * 列取附件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/list
     */
    listTaskV2AttachmentIter(query?: ListTaskV2AttachmentQuery): AsyncIterator<Attachment>
    /**
     * 获取附件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/get
     */
    getTaskV2Attachment(attachment_guid: string, query?: GetTaskV2AttachmentQuery): Promise<GetTaskV2AttachmentResponse>
    /**
     * 删除附件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/delete
     */
    deleteTaskV2Attachment(attachment_guid: string): Promise<void>
    /**
     * 创建自定义分组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/create
     */
    createTaskV2Section(body: CreateTaskV2SectionRequest, query?: CreateTaskV2SectionQuery): Promise<CreateTaskV2SectionResponse>
    /**
     * 获取自定义分组详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/get
     */
    getTaskV2Section(section_guid: string, query?: GetTaskV2SectionQuery): Promise<GetTaskV2SectionResponse>
    /**
     * 更新自定义分组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/patch
     */
    patchTaskV2Section(section_guid: string, body: PatchTaskV2SectionRequest, query?: PatchTaskV2SectionQuery): Promise<PatchTaskV2SectionResponse>
    /**
     * 删除自定义分组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/delete
     */
    deleteTaskV2Section(section_guid: string): Promise<void>
    /**
     * 获取自定义分组列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/list
     */
    listTaskV2Section(query?: ListTaskV2SectionQuery & Pagination): Promise<Paginated<SectionSummary>>
    /**
     * 获取自定义分组列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/list
     */
    listTaskV2SectionIter(query?: ListTaskV2SectionQuery): AsyncIterator<SectionSummary>
    /**
     * 获取自定义分组任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/tasks
     */
    tasksTaskV2Section(section_guid: string, query?: TasksTaskV2SectionQuery & Pagination): Promise<Paginated<TaskSummary>>
    /**
     * 获取自定义分组任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/tasks
     */
    tasksTaskV2SectionIter(section_guid: string, query?: TasksTaskV2SectionQuery): AsyncIterator<TaskSummary>
    /**
     * 创建自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/create
     */
    createTaskV2CustomField(body: CreateTaskV2CustomFieldRequest, query?: CreateTaskV2CustomFieldQuery): Promise<CreateTaskV2CustomFieldResponse>
    /**
     * 获取自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/get
     */
    getTaskV2CustomField(custom_field_guid: string, query?: GetTaskV2CustomFieldQuery): Promise<GetTaskV2CustomFieldResponse>
    /**
     * 更新自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/patch
     */
    patchTaskV2CustomField(custom_field_guid: string, body: PatchTaskV2CustomFieldRequest, query?: PatchTaskV2CustomFieldQuery): Promise<PatchTaskV2CustomFieldResponse>
    /**
     * 列取自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/list
     */
    listTaskV2CustomField(query?: ListTaskV2CustomFieldQuery & Pagination): Promise<Paginated<CustomField>>
    /**
     * 列取自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/list
     */
    listTaskV2CustomFieldIter(query?: ListTaskV2CustomFieldQuery): AsyncIterator<CustomField>
    /**
     * 将自定义字段加入资源
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/add
     */
    addTaskV2CustomField(custom_field_guid: string, body: AddTaskV2CustomFieldRequest): Promise<void>
    /**
     * 将自定义字段移出资源
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/remove
     */
    removeTaskV2CustomField(custom_field_guid: string, body: RemoveTaskV2CustomFieldRequest): Promise<void>
    /**
     * 创建自定义任务选项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/create
     */
    createTaskV2CustomFieldOption(custom_field_guid: string, body: CreateTaskV2CustomFieldOptionRequest): Promise<CreateTaskV2CustomFieldOptionResponse>
    /**
     * 更新自定义字段选项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/patch
     */
    patchTaskV2CustomFieldOption(custom_field_guid: string, option_guid: string, body: PatchTaskV2CustomFieldOptionRequest): Promise<PatchTaskV2CustomFieldOptionResponse>
    /**
     * 创建任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/create
     */
    createTaskV1(body: CreateTaskV1Request, query?: CreateTaskV1Query): Promise<CreateTaskV1Response>
    /**
     * 删除任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/delete
     */
    deleteTaskV1(task_id: string): Promise<void>
    /**
     * 更新任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/patch
     */
    patchTaskV1(task_id: string, body: PatchTaskV1Request, query?: PatchTaskV1Query): Promise<PatchTaskV1Response>
    /**
     * 完成任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/complete
     */
    completeTaskV1(task_id: string): Promise<void>
    /**
     * 取消完成任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/uncomplete
     */
    uncompleteTaskV1(task_id: string): Promise<void>
    /**
     * 查询指定任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/get
     */
    getTaskV1(task_id: string, query?: GetTaskV1Query): Promise<GetTaskV1Response>
    /**
     * 查询所有任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/list
     */
    listTaskV1(query?: ListTaskV1Query & Pagination): Promise<Paginated<Task>>
    /**
     * 查询所有任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/list
     */
    listTaskV1Iter(query?: ListTaskV1Query): AsyncIterator<Task>
    /**
     * 新增提醒时间
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/create
     */
    createTaskV1TaskReminder(task_id: string, body: CreateTaskV1TaskReminderRequest): Promise<CreateTaskV1TaskReminderResponse>
    /**
     * 删除提醒时间
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/delete
     */
    deleteTaskV1TaskReminder(task_id: string, reminder_id: string): Promise<void>
    /**
     * 查询提醒时间列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list
     */
    listTaskV1TaskReminder(task_id: string, query?: Pagination): Promise<Paginated<Reminder>>
    /**
     * 查询提醒时间列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list
     */
    listTaskV1TaskReminderIter(task_id: string): AsyncIterator<Reminder>
    /**
     * 创建评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/create
     */
    createTaskV1TaskComment(task_id: string, body: CreateTaskV1TaskCommentRequest, query?: CreateTaskV1TaskCommentQuery): Promise<CreateTaskV1TaskCommentResponse>
    /**
     * 删除评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/delete
     */
    deleteTaskV1TaskComment(task_id: string, comment_id: string): Promise<void>
    /**
     * 更新评论
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/update
     */
    updateTaskV1TaskComment(task_id: string, comment_id: string, body: UpdateTaskV1TaskCommentRequest, query?: UpdateTaskV1TaskCommentQuery): Promise<UpdateTaskV1TaskCommentResponse>
    /**
     * 获取评论详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/get
     */
    getTaskV1TaskComment(task_id: string, comment_id: string, query?: GetTaskV1TaskCommentQuery): Promise<GetTaskV1TaskCommentResponse>
    /**
     * 获取评论列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/list
     */
    listTaskV1TaskComment(task_id: string, query?: ListTaskV1TaskCommentQuery & Pagination): Promise<Paginated<Comment>>
    /**
     * 获取评论列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/list
     */
    listTaskV1TaskCommentIter(task_id: string, query?: ListTaskV1TaskCommentQuery): AsyncIterator<Comment>
    /**
     * 新增关注人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/create
     */
    createTaskV1TaskFollower(task_id: string, body: CreateTaskV1TaskFollowerRequest, query?: CreateTaskV1TaskFollowerQuery): Promise<CreateTaskV1TaskFollowerResponse>
    /**
     * 删除指定关注人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/delete
     */
    deleteTaskV1TaskFollower(task_id: string, follower_id: string, query?: DeleteTaskV1TaskFollowerQuery): Promise<void>
    /**
     * 批量删除关注人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_follower
     */
    batchDeleteFollowerTaskV1(task_id: string, body: BatchDeleteFollowerTaskV1Request, query?: BatchDeleteFollowerTaskV1Query): Promise<BatchDeleteFollowerTaskV1Response>
    /**
     * 获取关注人列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list
     */
    listTaskV1TaskFollower(task_id: string, query?: ListTaskV1TaskFollowerQuery & Pagination): Promise<Paginated<Follower>>
    /**
     * 获取关注人列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list
     */
    listTaskV1TaskFollowerIter(task_id: string, query?: ListTaskV1TaskFollowerQuery): AsyncIterator<Follower>
    /**
     * 新增执行者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/create
     */
    createTaskV1TaskCollaborator(task_id: string, body: CreateTaskV1TaskCollaboratorRequest, query?: CreateTaskV1TaskCollaboratorQuery): Promise<CreateTaskV1TaskCollaboratorResponse>
    /**
     * 删除指定执行者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/delete
     */
    deleteTaskV1TaskCollaborator(task_id: string, collaborator_id: string, query?: DeleteTaskV1TaskCollaboratorQuery): Promise<void>
    /**
     * 批量删除执行者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_collaborator
     */
    batchDeleteCollaboratorTaskV1(task_id: string, body: BatchDeleteCollaboratorTaskV1Request, query?: BatchDeleteCollaboratorTaskV1Query): Promise<BatchDeleteCollaboratorTaskV1Response>
    /**
     * 获取执行者列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list
     */
    listTaskV1TaskCollaborator(task_id: string, query?: ListTaskV1TaskCollaboratorQuery & Pagination): Promise<Paginated<Collaborator>>
    /**
     * 获取执行者列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list
     */
    listTaskV1TaskCollaboratorIter(task_id: string, query?: ListTaskV1TaskCollaboratorQuery): AsyncIterator<Collaborator>
  }
}

export interface CreateTaskV2Request {
  /** 任务标题 */
  summary: string
  /** 任务描述 */
  description?: string
  /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
  due?: Due
  /** 任务关联的第三方平台来源信息 */
  origin?: Origin
  /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
  extra?: string
  /** 任务的完成时刻时间戳(ms) */
  completed_at?: string
  /** 任务成员列表 */
  members?: Member[]
  /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
  repeat_rule?: string
  /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
  custom_complete?: CustomComplete
  /** 任务所在清单的信息 */
  tasklists?: TaskInTasklistInfo[]
  /** 幂等token，如果填写则触发幂等行为。 */
  client_token?: string
  /** 任务的开始时间(ms) */
  start?: Start
  /** 任务提醒 */
  reminders?: Reminder[]
  /** 任务完成模式, 1 - 会签任务; 2 - 或签任务 */
  mode?: number
  /** 是否是里程碑任务 */
  is_milestone?: boolean
  /** 自定义字段值 */
  custom_fields?: InputCustomFieldValue[]
  /** 任务的新版云文档来源 */
  docx_source?: DocxSource
}

export interface CreateTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface GetTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface PatchTaskV2Request {
  /** 要更新的任务数据，只需要写明要更新的字段 */
  task?: InputTask
  /** 要更新的字段名称。支持summary, description, due, start, completed_at, extra, repeat_rule, custom_complete, mode, is_milestone, custom_fields。 */
  update_fields: string[]
}

export interface PatchTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface AddMembersTaskV2Request {
  /** 要添加的members列表 */
  members: Member[]
  /** 幂等token，如果提供则实现幂等行为 */
  client_token?: string
}

export interface AddMembersTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface RemoveMembersTaskV2Request {
  /** 要移除的member列表 */
  members: Member[]
}

export interface RemoveMembersTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface ListTaskV2Query {
  /** 是否按任务完成进行过滤。不填写表示不过滤。 */
  completed?: boolean
  /** 查询任务的范围 */
  type?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface AddTasklistTaskV2Request {
  /** 要添加到的清单的全局唯一ID */
  tasklist_guid: string
  /** 要添加到清单的自定义分组全局唯一ID，如不填写表示添加到默认分组 */
  section_guid?: string
}

export interface AddTasklistTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface RemoveTasklistTaskV2Request {
  /** 要移除的清单的全局唯一ID */
  tasklist_guid: string
}

export interface RemoveTasklistTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface AddRemindersTaskV2Request {
  /** 要添加的reminder的列表 */
  reminders: Reminder[]
}

export interface AddRemindersTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface RemoveRemindersTaskV2Request {
  /** 要移除的reminder的id列表 */
  reminder_ids: string[]
}

export interface RemoveRemindersTaskV2Query {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface AddDependenciesTaskV2Request {
  /** 要添加的依赖 */
  dependencies?: TaskDependency[]
}

export interface RemoveDependenciesTaskV2Request {
  /** 要移除的依赖 */
  dependencies: TaskDependency[]
}

export interface CreateTaskV2TaskSubtaskRequest {
  /** 任务标题 */
  summary: string
  /** 任务描述 */
  description?: string
  /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
  due?: Due
  /** 任务关联的第三方平台来源信息 */
  origin?: Origin
  /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
  extra?: string
  /** 任务的完成时刻时间戳(ms) */
  completed_at?: string
  /** 任务成员列表 */
  members?: Member[]
  /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
  repeat_rule?: string
  /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
  custom_complete?: CustomComplete
  /** 任务所在清单的信息 */
  tasklists?: TaskInTasklistInfo[]
  /** 幂等token，如果填写则触发幂等行为。 */
  client_token?: string
  /** 任务的开始时间(ms) */
  start?: Start
  /** 任务提醒 */
  reminders?: Reminder[]
  /** 任务完成模式, 1 - 会签任务; 2 - 或签任务 */
  mode?: number
  /** 是否是里程碑任务 */
  is_milestone?: boolean
  /** 自定义字段值 */
  custom_fields?: InputCustomFieldValue[]
  /** 任务的新版云文档来源 */
  docx_source?: DocxSource
}

export interface CreateTaskV2TaskSubtaskQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface ListTaskV2TaskSubtaskQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface CreateTaskV2TasklistRequest {
  /** 清单名称 */
  name: string
  /** 清单的成员列表 */
  members?: Member[]
}

export interface CreateTaskV2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface GetTaskV2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface PatchTaskV2TasklistRequest {
  /** 要更新清单的数据 */
  tasklist: InputTasklist
  /** 要更新的字段名，只支持更新"owner", "name"两个字段 */
  update_fields: string[]
  /** 该字段表示如果更新了新的负责人，则将原负责人设为指定的协作人角色。仅在update_fields包含owner字段时生效。根据清单的角色设计方式，不允许提前为清单的负责人添加其他角色，但负责人更新后，原有负责人会无法访问该清单。该字段可以帮助避免原负责人彻底退出清单。 */
  origin_owner_to_role?: 'editor' | 'viewer' | 'none'
}

export interface PatchTaskV2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface AddMembersTaskV2TasklistRequest {
  /** 要添加的成员列表 */
  members: Member[]
}

export interface AddMembersTaskV2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface RemoveMembersTaskV2TasklistRequest {
  /** 要移除的member列表 */
  members: Member[]
}

export interface RemoveMembersTaskV2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface TasksTaskV2TasklistQuery {
  /** 只查看特定完成状态的任务，不填写表示不按完成状态过滤 */
  completed?: boolean
  /** 任务创建的起始时间戳（ms），闭区间，不填写默认为首个任务的创建时间戳 */
  created_from?: string
  /** 任务创建的结束时间戳（ms），闭区间，不填写默认为最后创建任务的创建时间戳 */
  created_to?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface ListTaskV2TasklistQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface CreateTaskV2TasklistActivitySubscriptionRequest {
  /** 订阅名称 */
  name: string
  /** 订阅者列表 */
  subscribers: Member[]
  /** 订阅的事件key列表 */
  include_keys: number[]
  /** 该订阅是否为停用 */
  disabled?: boolean
}

export interface CreateTaskV2TasklistActivitySubscriptionQuery {
  /** 用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface GetTaskV2TasklistActivitySubscriptionQuery {
  /** 用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface ListTaskV2TasklistActivitySubscriptionQuery {
  /** 返回结果的最大数量 */
  limit?: number
  /** 用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface PatchTaskV2TasklistActivitySubscriptionRequest {
  /** 要更新的订阅数据 */
  activity_subscription: TasklistActivitySubscription
  /** 要更新的字段 */
  update_fields: 'name' | 'include_keys' | 'subscribers' | 'disabled'[]
}

export interface PatchTaskV2TasklistActivitySubscriptionQuery {
  /** 用户ID类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface CreateTaskV2CommentRequest {
  /** 评论内容 */
  content: string
  /** 回复给评论的id */
  reply_to_comment_id?: string
  /** 评论归属的资源类型 */
  resource_type?: string
  /** 评论归属的资源ID */
  resource_id?: string
}

export interface CreateTaskV2CommentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface GetTaskV2CommentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface PatchTaskV2CommentRequest {
  /** 要更新的评论数据，支持更新content, md_content */
  comment: InputComment
  /** 要更新的字段 */
  update_fields: string[]
}

export interface PatchTaskV2CommentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface ListTaskV2CommentQuery {
  /** 要获取评论列表的资源类型 */
  resource_type?: string
  /** 要获取评论的资源ID。例如要获取任务的评论列表，此处应该填写任务全局唯一ID */
  resource_id: string
  /** 返回数据的排序方式 */
  direction?: 'asc' | 'desc'
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface UploadTaskV2AttachmentForm {
  /** 附件归属资源的类型 */
  resource_type?: string
  /** 附件要归属资源的id。例如，要给任务添加附件，这里要填入任务的全局唯一ID */
  resource_id: string
  /** 要上传的文件 */
  file: Blob
}

export interface UploadTaskV2AttachmentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface ListTaskV2AttachmentQuery {
  /** 附件归属的资源类型 */
  resource_type?: string
  /** 附件归属资源的id，配合resource_type使用。例如希望获取任务的附件，需要设置 resource_type为task， resource_id为任务的全局唯一ID */
  resource_id: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface GetTaskV2AttachmentQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface CreateTaskV2SectionRequest {
  /** 自定义分组名称 */
  name: string
  /** 自定义分组归属的资源类型，支持"tasklist"或者"my_tasks" */
  resource_type: string
  /** 自定义分组要归属的资源id */
  resource_id?: string
  /** 要将新分组插入到自定义分分组的前面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
  insert_before?: string
  /** 要将新分组插入到自定义分分组的后面的目标分组的guid。insert_before/insert_after二选一。也可以都不设置。都不设置时表示将新分组查到对应容器的最前面。 */
  insert_after?: string
}

export interface CreateTaskV2SectionQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface GetTaskV2SectionQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface PatchTaskV2SectionRequest {
  /** 要更新的自定义分组的数据，仅支持name, insert_after, insert_before */
  section: InputSection
  /** 要更新的字段名 */
  update_fields: string[]
}

export interface PatchTaskV2SectionQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface ListTaskV2SectionQuery {
  /** 自定义分组所属的资源类型。支持"my_tasks"(我负责的）和"tasklist"（清单）。当使用"tasklist"时，需要用resource_id提供清单GUID。 */
  resource_type: string
  /** 如`resource_type`为"tasklist"，这里需要填写要列取自定义分组的清单的GUID。 */
  resource_id?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface TasksTaskV2SectionQuery {
  /** 按照任务状态过滤，如果不填写则表示不按完成状态过滤 */
  completed?: boolean
  /** 按照创建时间筛选的起始时间戳（ms)，如不填写则为首个任务的创建时刻 */
  created_from?: string
  /** 按照创建时间筛选的起始时间戳（ms)，如不填写则为最后任务的创建时刻 */
  created_to?: string
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: string
}

export interface CreateTaskV2CustomFieldRequest {
  /** 自定义字段要归属的资源类型，支持"tasklist" */
  resource_type: string
  /** 自定义字段要归属的资源ID，可以填写清单的tasklist_guid */
  resource_id: string
  /** 字段名称 */
  name: string
  /** 自定义字段类型，支持"number", "datetime", "member", "single_select", "multi_select" */
  type: 'number' | 'datetime' | 'member' | 'single_select' | 'multi_select' | 'text'
  /** 数字类型的字段设置 */
  number_setting?: NumberSetting
  /** 人员类型的字段设置 */
  member_setting?: MemberSetting
  /** 时间日期类型的字段设置 */
  datetime_setting?: DatetimeSetting
  /** 单选设置 */
  single_select_setting?: SelectSetting
  /** 多选设置 */
  multi_select_setting?: SelectSetting
  /** 文本类型 */
  text_setting?: TextSetting
}

export interface CreateTaskV2CustomFieldQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
}

export interface GetTaskV2CustomFieldQuery {
  /** 表示user的ID的类型，支持open_id, user_id, union_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
}

export interface PatchTaskV2CustomFieldRequest {
  /** 要修改的自定义字段数据 */
  custom_field?: InputCustomField
  /** 要修改的自定义字段类型，支持name, member_setting, number_setting, datetime_setting, single_select_setting, multi_select_setting */
  update_fields?: string[]
}

export interface PatchTaskV2CustomFieldQuery {
  /** 用户ID格式 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id'
}

export interface ListTaskV2CustomFieldQuery {
  /** 用户ID格式，支持open_id, user_id, union_id */
  user_id_type?: 'open_id' | 'user_id' | 'union_id'
  /** 资源类型，如提供表示仅查询特定资源下的自定义字段。目前只支持tasklist。 */
  resource_type?: string
  /** 要查询自定义字段的归属resource_id */
  resource_id?: string
}

export interface AddTaskV2CustomFieldRequest {
  /** 要将自定义字段添加到一个资源的资源类型。目前只支持tasklist */
  resource_type: string
  /** 要将自定义字段添加到的资源id，目前只支持tasklist_guid */
  resource_id: string
}

export interface RemoveTaskV2CustomFieldRequest {
  /** 要从某个资源移除自定义字段的资源类型，目前只支持清单"tasklist"。 */
  resource_type: string
  /** 要从某个资源移除自定义字段的资源id，`resource_type`为"tasklist"时，需填写清单的GUID */
  resource_id: string
}

export interface CreateTaskV2CustomFieldOptionRequest {
  /** 选项名 */
  name: string
  /** 颜色索引值，支持0～54中的一个数字。如果不填写，则会随机选一个。 */
  color_index?: number
  /** 要放到某个option之前的option_guid */
  insert_before?: string
  /** 要放到某个option之后的option_guid */
  insert_after?: string
  /** 是否隐藏 */
  is_hidden?: boolean
}

export interface PatchTaskV2CustomFieldOptionRequest {
  /** 要更新的option数据 */
  option?: InputOption
  /** 要更新的字段名，支持name,color,is_hidden,insert_before,insert_after */
  update_fields?: string[]
}

export interface CreateTaskV1Request {
  /** 任务标题。创建任务时，如果没有标题填充，将其视为无主题的任务。 */
  summary?: string
  /** 任务备注 */
  description?: string
  /** 接入方可以自定义的附属信息二进制格式，采用 base64 编码，解析方式由接入方自己决定 */
  extra?: string
  /** 任务的截止时间设置 */
  due?: Due
  /** 任务关联的第三方平台来源信息 */
  origin: Origin
  /** 此字段用于控制该任务在任务中心是否可编辑，默认为false，若为true则第三方需考虑是否需要接入事件来接收任务在任务中心的变更信息 */
  can_edit?: boolean
  /** 此字段用于存储第三方需透传到端上的自定义数据，Json格式。取值举例中custom_complete字段存储「完成」按钮的跳转链接（href）或提示信息（tip），pc、ios、android三端均可自定义，其中tip字段的key为语言类型，value为提示信息，可自行增加或减少语言类型，支持的各地区语言名：it_it, th_th, ko_kr, es_es, ja_jp, zh_cn, id_id, zh_hk, pt_br, de_de, fr_fr, zh_tw, ru_ru, en_us, hi_in, vi_vn。href的优先级高于tip，href和tip同时不为空时只跳转不提示。链接和提示信息可自定义，其余的key需按举例中的结构传递 */
  custom?: string
  /** 创建任务时添加的执行者用户id列表 */
  collaborator_ids?: string[]
  /** 创建任务时添加的关注者用户id列表 */
  follower_ids?: string[]
  /** 重复任务重复规则 */
  repeat_rule?: string
  /** 富文本任务标题。创建任务时，如果没有标题填充，将其视为无主题的任务。 */
  rich_summary?: string
  /** 富文本任务备注 */
  rich_description?: string
}

export interface CreateTaskV1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface PatchTaskV1Request {
  /** 被更新的任务实体基础信息 */
  task: Task
  /** 指定需要更新的字段（目前可选更新的字段为：summary, description, due, extra），否则服务端将不知道更新哪些字段 */
  update_fields: string[]
}

export interface PatchTaskV1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetTaskV1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListTaskV1Query {
  /** 范围查询任务时，查询的起始时间。不填时默认起始时间为第一个任务的创建时间。 */
  start_create_time?: string
  /** 范围查询任务时，查询的结束时间。不填时默认结束时间为最后一个任务的创建时间。 */
  end_create_time?: string
  /** 可用于查询时过滤任务完成状态。true表示只返回已完成的任务，false表示只返回未完成的任务。不填时表示同时返回两种完成状态的任务。 */
  task_completed?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateTaskV1TaskReminderRequest {
  /** 相对于截止时间的提醒时间（如提前 30 分钟，截止时间后 30 分钟，则为 -30） */
  relative_fire_minute: number
}

export interface CreateTaskV1TaskCommentRequest {
  /** 评论内容 */
  content?: string
  /** 评论的父ID，创建评论时若不为空则为某条评论的回复，若为空则不是回复 */
  parent_id?: string
  /** 评论创建的时间戳，单位为毫秒，用于展示，创建时不用填写 */
  create_milli_time?: string
  /** 富文本评论内容 */
  rich_content?: string
}

export interface CreateTaskV1TaskCommentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateTaskV1TaskCommentRequest {
  /** 新的评论内容 */
  content?: string
  /** 新的富文本评论内容（优先使用） */
  rich_content?: string
}

export interface UpdateTaskV1TaskCommentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetTaskV1TaskCommentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListTaskV1TaskCommentQuery {
  /** 评论排序标记，可按照评论时间从小到大查询，或者评论时间从大到小查询，不填默认按照从小到大 */
  list_direction?: 0 | 1
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateTaskV1TaskFollowerRequest {
  /** 任务关注者 ID */
  id?: string
  /** 要添加为关注人的user_id */
  id_list?: string[]
}

export interface CreateTaskV1TaskFollowerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteTaskV1TaskFollowerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchDeleteFollowerTaskV1Request {
  /** 要添加为关注人的user_id */
  id_list?: string[]
}

export interface BatchDeleteFollowerTaskV1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListTaskV1TaskFollowerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateTaskV1TaskCollaboratorRequest {
  /** 任务协作者的 ID */
  id?: string
  /** 协作人的用户ID列表 */
  id_list?: string[]
}

export interface CreateTaskV1TaskCollaboratorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteTaskV1TaskCollaboratorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchDeleteCollaboratorTaskV1Request {
  /** 协作人的用户ID列表 */
  id_list?: string[]
}

export interface BatchDeleteCollaboratorTaskV1Query {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListTaskV1TaskCollaboratorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateTaskV2Response {
  /** 产生的任务 */
  task?: Task
}

export interface GetTaskV2Response {
  /** 获得的任务实体 */
  task?: Task
}

export interface PatchTaskV2Response {
  /** 更新后的任务 */
  task?: Task
}

export interface AddMembersTaskV2Response {
  /** 更新完成后的任务实体数据 */
  task?: Task
}

export interface RemoveMembersTaskV2Response {
  /** 移除成员后的任务数据 */
  task?: Task
}

export interface TasklistsTaskV2Response {
  /** 任务所在清单的摘要信息 */
  tasklists?: TaskInTasklistInfo[]
}

export interface AddTasklistTaskV2Response {
  /** 添加后的任务详情 */
  task?: Task
}

export interface RemoveTasklistTaskV2Response {
  /** 添加后的任务详情 */
  task?: Task
}

export interface AddRemindersTaskV2Response {
  /** 更新完成后的任务实体 */
  task?: Task
}

export interface RemoveRemindersTaskV2Response {
  /** 移除提醒后的任务详情 */
  task?: Task
}

export interface AddDependenciesTaskV2Response {
  /** 被添加后任务的所有依赖 */
  dependencies?: TaskDependency[]
}

export interface RemoveDependenciesTaskV2Response {
  /** 移除之后的任务GUID */
  dependencies?: TaskDependency[]
}

export interface CreateTaskV2TaskSubtaskResponse {
  /** 创建的任务 */
  subtask?: Task
}

export interface CreateTaskV2TasklistResponse {
  /** 创建的清单数据 */
  tasklist?: Tasklist
}

export interface GetTaskV2TasklistResponse {
  /** 清单详情 */
  tasklist?: Tasklist
}

export interface PatchTaskV2TasklistResponse {
  /** 修改后的任务清单 */
  tasklist?: Tasklist
}

export interface AddMembersTaskV2TasklistResponse {
  /** 完成更新后的清单实体 */
  tasklist?: Tasklist
}

export interface RemoveMembersTaskV2TasklistResponse {
  /** 修改完成后的清单实体 */
  tasklist?: Tasklist
}

export interface CreateTaskV2TasklistActivitySubscriptionResponse {
  /** 清单动态订阅 */
  activity_subscription?: TasklistActivitySubscription
}

export interface GetTaskV2TasklistActivitySubscriptionResponse {
  /** 订阅详情 */
  activity_subscription?: TasklistActivitySubscription
}

export interface ListTaskV2TasklistActivitySubscriptionResponse {
  /** 清单的动态订阅数据 */
  items?: TasklistActivitySubscription[]
}

export interface PatchTaskV2TasklistActivitySubscriptionResponse {
  /** 更新后的订阅 */
  activity_subscription?: TasklistActivitySubscription
}

export interface CreateTaskV2CommentResponse {
  /** 创建的评论详情 */
  comment?: Comment
}

export interface GetTaskV2CommentResponse {
  /** 评论详情 */
  comment?: Comment
}

export interface PatchTaskV2CommentResponse {
  /** 更新后的评论 */
  comment?: Comment
}

export interface UploadTaskV2AttachmentResponse {
  /** 上传的附件列表 */
  items?: Attachment[]
}

export interface GetTaskV2AttachmentResponse {
  /** 附件详情 */
  attachment?: Attachment
}

export interface CreateTaskV2SectionResponse {
  /** 创建的自定义分组数据 */
  section?: Section
}

export interface GetTaskV2SectionResponse {
  /** 获取的自定义分组详情 */
  section?: Section
}

export interface PatchTaskV2SectionResponse {
  /** 更新后的自定义分组 */
  section?: Section
}

export interface CreateTaskV2CustomFieldResponse {
  /** 创建的自定义字段 */
  custom_field?: CustomField
}

export interface GetTaskV2CustomFieldResponse {
  /** 获取的自定义字段数据 */
  custom_field?: CustomField
}

export interface PatchTaskV2CustomFieldResponse {
  /** 修改后的自定义字段设置 */
  custom_field?: CustomField
}

export interface CreateTaskV2CustomFieldOptionResponse {
  /** 创建的选项 */
  option?: Option
}

export interface PatchTaskV2CustomFieldOptionResponse {
  /** 更新后的option数据 */
  option?: Option
}

export interface CreateTaskV1Response {
  /** 返回创建好的任务 */
  task?: Task
}

export interface PatchTaskV1Response {
  /** 返回修改后的任务详情 */
  task?: Task
}

export interface GetTaskV1Response {
  /** 返回任务资源详情 */
  task?: Task
}

export interface CreateTaskV1TaskReminderResponse {
  /** 返回创建成功的提醒时间 */
  reminder?: Reminder
}

export interface CreateTaskV1TaskCommentResponse {
  /** 返回创建好的任务评论 */
  comment?: Comment
}

export interface UpdateTaskV1TaskCommentResponse {
  /** 返回修改后的任务评论详情 */
  comment?: Comment
}

export interface GetTaskV1TaskCommentResponse {
  /** 返回新的任务评论详情 */
  comment?: Comment
}

export interface CreateTaskV1TaskFollowerResponse {
  /** 创建后的任务关注者 */
  follower: Follower
}

export interface BatchDeleteFollowerTaskV1Response {
  /** 实际删除的关注人用户ID列表 */
  followers?: string[]
}

export interface CreateTaskV1TaskCollaboratorResponse {
  /** 返回创建成功后的任务协作者 */
  collaborator: Collaborator
}

export interface BatchDeleteCollaboratorTaskV1Response {
  /** 实际删除的执行人用户ID列表 */
  collaborators?: string[]
}

Internal.define({
  '/open-apis/task/v2/tasks': {
    POST: 'createTaskV2',
    GET: { name: 'listTaskV2', pagination: { argIndex: 0 } },
  },
  '/open-apis/task/v2/tasks/{task_guid}': {
    GET: 'getTaskV2',
    PATCH: 'patchTaskV2',
    DELETE: 'deleteTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/add_members': {
    POST: 'addMembersTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/remove_members': {
    POST: 'removeMembersTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/tasklists': {
    GET: 'tasklistsTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/add_tasklist': {
    POST: 'addTasklistTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/remove_tasklist': {
    POST: 'removeTasklistTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/add_reminders': {
    POST: 'addRemindersTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/remove_reminders': {
    POST: 'removeRemindersTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/add_dependencies': {
    POST: 'addDependenciesTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/remove_dependencies': {
    POST: 'removeDependenciesTaskV2',
  },
  '/open-apis/task/v2/tasks/{task_guid}/subtasks': {
    POST: 'createTaskV2TaskSubtask',
    GET: { name: 'listTaskV2TaskSubtask', pagination: { argIndex: 1 } },
  },
  '/open-apis/task/v2/tasklists': {
    POST: 'createTaskV2Tasklist',
    GET: { name: 'listTaskV2Tasklist', pagination: { argIndex: 0 } },
  },
  '/open-apis/task/v2/tasklists/{tasklist_guid}': {
    GET: 'getTaskV2Tasklist',
    PATCH: 'patchTaskV2Tasklist',
    DELETE: 'deleteTaskV2Tasklist',
  },
  '/open-apis/task/v2/tasklists/{tasklist_guid}/add_members': {
    POST: 'addMembersTaskV2Tasklist',
  },
  '/open-apis/task/v2/tasklists/{tasklist_guid}/remove_members': {
    POST: 'removeMembersTaskV2Tasklist',
  },
  '/open-apis/task/v2/tasklists/{tasklist_guid}/tasks': {
    GET: { name: 'tasksTaskV2Tasklist', pagination: { argIndex: 1 } },
  },
  '/open-apis/task/v2/tasklists/{tasklist_guid}/activity_subscriptions': {
    POST: 'createTaskV2TasklistActivitySubscription',
    GET: 'listTaskV2TasklistActivitySubscription',
  },
  '/open-apis/task/v2/tasklists/{tasklist_guid}/activity_subscriptions/{activity_subscription_guid}': {
    GET: 'getTaskV2TasklistActivitySubscription',
    PATCH: 'patchTaskV2TasklistActivitySubscription',
    DELETE: 'deleteTaskV2TasklistActivitySubscription',
  },
  '/open-apis/task/v2/comments': {
    POST: 'createTaskV2Comment',
    GET: { name: 'listTaskV2Comment', pagination: { argIndex: 0 } },
  },
  '/open-apis/task/v2/comments/{comment_id}': {
    GET: 'getTaskV2Comment',
    PATCH: 'patchTaskV2Comment',
    DELETE: 'deleteTaskV2Comment',
  },
  '/open-apis/task/v2/attachments/upload': {
    POST: { name: 'uploadTaskV2Attachment', multipart: true },
  },
  '/open-apis/task/v2/attachments': {
    GET: { name: 'listTaskV2Attachment', pagination: { argIndex: 0 } },
  },
  '/open-apis/task/v2/attachments/{attachment_guid}': {
    GET: 'getTaskV2Attachment',
    DELETE: 'deleteTaskV2Attachment',
  },
  '/open-apis/task/v2/sections': {
    POST: 'createTaskV2Section',
    GET: { name: 'listTaskV2Section', pagination: { argIndex: 0 } },
  },
  '/open-apis/task/v2/sections/{section_guid}': {
    GET: 'getTaskV2Section',
    PATCH: 'patchTaskV2Section',
    DELETE: 'deleteTaskV2Section',
  },
  '/open-apis/task/v2/sections/{section_guid}/tasks': {
    GET: { name: 'tasksTaskV2Section', pagination: { argIndex: 1 } },
  },
  '/open-apis/task/v2/custom_fields': {
    POST: 'createTaskV2CustomField',
    GET: { name: 'listTaskV2CustomField', pagination: { argIndex: 0 } },
  },
  '/open-apis/task/v2/custom_fields/{custom_field_guid}': {
    GET: 'getTaskV2CustomField',
    PATCH: 'patchTaskV2CustomField',
  },
  '/open-apis/task/v2/custom_fields/{custom_field_guid}/add': {
    POST: 'addTaskV2CustomField',
  },
  '/open-apis/task/v2/custom_fields/{custom_field_guid}/remove': {
    POST: 'removeTaskV2CustomField',
  },
  '/open-apis/task/v2/custom_fields/{custom_field_guid}/options': {
    POST: 'createTaskV2CustomFieldOption',
  },
  '/open-apis/task/v2/custom_fields/{custom_field_guid}/options/{option_guid}': {
    PATCH: 'patchTaskV2CustomFieldOption',
  },
  '/open-apis/task/v1/tasks': {
    POST: 'createTaskV1',
    GET: { name: 'listTaskV1', pagination: { argIndex: 0 } },
  },
  '/open-apis/task/v1/tasks/{task_id}': {
    DELETE: 'deleteTaskV1',
    PATCH: 'patchTaskV1',
    GET: 'getTaskV1',
  },
  '/open-apis/task/v1/tasks/{task_id}/complete': {
    POST: 'completeTaskV1',
  },
  '/open-apis/task/v1/tasks/{task_id}/uncomplete': {
    POST: 'uncompleteTaskV1',
  },
  '/open-apis/task/v1/tasks/{task_id}/reminders': {
    POST: 'createTaskV1TaskReminder',
    GET: { name: 'listTaskV1TaskReminder', pagination: { argIndex: 1 } },
  },
  '/open-apis/task/v1/tasks/{task_id}/reminders/{reminder_id}': {
    DELETE: 'deleteTaskV1TaskReminder',
  },
  '/open-apis/task/v1/tasks/{task_id}/comments': {
    POST: 'createTaskV1TaskComment',
    GET: { name: 'listTaskV1TaskComment', pagination: { argIndex: 1 } },
  },
  '/open-apis/task/v1/tasks/{task_id}/comments/{comment_id}': {
    DELETE: 'deleteTaskV1TaskComment',
    PUT: 'updateTaskV1TaskComment',
    GET: 'getTaskV1TaskComment',
  },
  '/open-apis/task/v1/tasks/{task_id}/followers': {
    POST: 'createTaskV1TaskFollower',
    GET: { name: 'listTaskV1TaskFollower', pagination: { argIndex: 1 } },
  },
  '/open-apis/task/v1/tasks/{task_id}/followers/{follower_id}': {
    DELETE: 'deleteTaskV1TaskFollower',
  },
  '/open-apis/task/v1/tasks/{task_id}/batch_delete_follower': {
    POST: 'batchDeleteFollowerTaskV1',
  },
  '/open-apis/task/v1/tasks/{task_id}/collaborators': {
    POST: 'createTaskV1TaskCollaborator',
    GET: { name: 'listTaskV1TaskCollaborator', pagination: { argIndex: 1 } },
  },
  '/open-apis/task/v1/tasks/{task_id}/collaborators/{collaborator_id}': {
    DELETE: 'deleteTaskV1TaskCollaborator',
  },
  '/open-apis/task/v1/tasks/{task_id}/batch_delete_collaborator': {
    POST: 'batchDeleteCollaboratorTaskV1',
  },
})
