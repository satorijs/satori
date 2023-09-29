import { Internal } from '../internal'
// GENERATED CONTENT

export interface CreateProjectCustomfieldStatusParams {
  /** 自定义字段ID。 */
  customFieldId?: string
  /** 自定义字段名称(如果提供自定义字段ID 则忽略)。 */
  customFieldName?: string
  /** 自定义字段InstanceId(如果提供自定义字段ID 或者 自定义字段名称 则忽略)。 */
  customFieldInstanceId?: string
  /** 字段值集合。 */
  value: object[]
}

export interface CreateProjectCustomfieldStatusResponse {
  result?: {
    customFieldId?: string
    originalId?: string
    name?: string
    type?: string
    advancedCustomFieldObjectType?: string
    value?: number
  }
}

export interface UpdateTaskContentParams {
  /** 任务标题。 */
  content?: string
}

export interface UpdateTaskContentResponse {
  result?: {
    content?: string
    updated?: string
  }
}

export interface UpdateTaskNoteParams {
  /** 任务备注。 */
  note?: string
}

export interface UpdateTaskNoteResponse {
  result?: {
    note?: string
    updated?: string
  }
}

export interface UpdateTaskInvolvemembersParams {
  /** 参与者用户userId。 */
  involveMembers?: string[]
  /** 参与者用户userId。 */
  addInvolvers?: string[]
  /** 参与者用户userId。 */
  delInvolvers?: string[]
}

export interface UpdateTaskInvolvemembersResponse {
  result?: {
    involveMembers?: number
    updated?: string
  }
}

export interface UpdateTaskExecutorParams {
  /** 执行者用户userId。 */
  executorId?: string
}

export interface UpdateTaskExecutorResponse {
  result?: {
    executorId?: string
    updated?: string
  }
}

export interface UpdateTaskPriorityParams {
  /** 优先级。 */
  priority?: number
}

export interface UpdateTaskPriorityResponse {
  result?: {
    priority?: number
    updated?: string
  }
}

export interface UpdateTaskDueDateParams {
  /** 截止时间，格式：YYYY-MM-DDTHH:mm:ssZ（ISO 8601/RFC 3339）。 */
  dueDate?: string
}

export interface UpdateTaskDueDateResponse {
  result?: {
    dueDate?: string
    updated?: string
  }
}

export interface GetTaskByIdsQuery {
  /** 任务ID集合，多个taskId，使用逗号分隔。 */
  taskId?: string
  /** 父任务ID。 */
  parentTaskId?: string
}

export interface GetTaskByIdsResponse {
  result?: {
    taskId?: string
    content?: string
    note?: string
    projectId?: string
    ancestorIds?: number
    parentTaskId?: string
    taskflowStatusId?: string
    taskListId?: string
    taskStageId?: string
    tagIds?: number
    creatorId?: string
    executorId?: string
    involveMembers?: number
    priority?: number
    storyPoint?: string
    recurrence?: number
    isDone?: number
    isArchived?: number
    visible?: string
    uniqueId?: string
    startDate?: string
    dueDate?: string
    accomplishTime?: string
    created?: string
    updated?: string
    scenarioFieldConfigId?: string
    sprintId?: string
    customFields?: number
  }[]
}

export interface ArchiveTaskResponse {
  result?: {
    updated?: string
  }
}

export interface SearchUserTaskQuery {
  /** 用户的任务角色。 */
  roleTypes: string
  /** tql内容，详情参见[任务筛选TQL](https://open.dingtalk.com/document/orgapp/the-description-of-the-tql-task)使用说明。 */
  tql?: string
  /** 分页标，从上一次请求结果中获取。 */
  nextToken?: string
  /** 每页返回最大数量。 */
  maxResults?: string
}

export interface SearchUserTaskResponse {
  result?: {
    taskId?: string
    content?: string
    note?: string
    projectId?: string
    ancestorIds?: number
    parentTaskId?: string
    taskflowStatusId?: string
    taskListId?: string
    taskStageId?: string
    tagIds?: number
    creatorId?: string
    executorId?: string
    involveMembers?: number
    priority?: number
    storyPoint?: string
    recurrence?: number
    isDone?: number
    isArchived?: number
    visible?: string
    uniqueId?: string
    startDate?: string
    dueDate?: string
    accomplishTime?: string
    created?: string
    updated?: string
    scenarioFieldConfigId?: string
    sprintId?: string
    customFields?: number
  }[]
  requestId?: string
}

export interface SeachTaskStageQuery {
  /** 任务分组ID： */
  taskListId?: string
  /** 任务列表名字。 */
  query?: string
  /** 每页返回最大数量。 */
  maxResults?: number
  /** 分页标，从上一次请求结果中获取。 */
  nextToken?: string
  /** 任务列表 ID 集合。 */
  taskStageIds?: string
}

export interface SeachTaskStageResponse {
  result?: {
    taskStageId?: string
    name?: string
    description?: string
    projectId?: string
    taskListId?: string
    creatorId?: string
    created?: string
    updated?: string
  }[]
  nextToken?: string
}

export interface SearchTaskListQuery {
  /** 模糊任务分组名字。 */
  query?: string
  /** 每页返回最大数量。 */
  maxResults?: number
  /** 分页标，从上一次请求结果中获取。 */
  nextToken?: string
  /** 任务分组ID集合，多个使用英文逗号隔开。 */
  taskListIds?: string
}

export interface SearchTaskListResponse {
  result?: {
    taskListId?: string
    title?: string
    description?: string
    projectId?: string
    creatorId?: string
    created?: string
    updated?: string
  }[]
  nextToken?: string
}

export interface SearchTaskFlowQuery {
  /** 模糊查询工作流名字。 */
  query?: string
  /** 每页返回最大数量。 */
  maxResults?: number
  /** 分页标，从上一次请求结果中获取。 */
  nextToken?: string
  /** 工作流ID集合。 */
  taskflowIds?: string
}

export interface SearchTaskFlowResponse {
  result?: {
    taskflowId?: string
    name?: string
    boundToObjectId?: string
    boundToObjectType?: string
    creatorId?: string
    isDeleted?: number
    created?: string
    updated?: string
  }[]
}

export interface GetProjectStatusListResponse {
  result?: {
    projectId?: string
    name?: string
    content?: string
    degree?: string
    creatorId?: string
    created?: string
  }[]
}

export interface DeleteProjectMemberParams {
  /** 用户userId。 */
  userIds: string[]
}

export interface DeleteProjectMemberResponse {
  result?: string[]
}

export interface GetProjectMemebersQuery {
  /** 用户ID。 */
  userIds?: string
  /** 项目角色ID。 */
  projectRoleId?: string
  /** 每页返回最大数量。默认10，最大300。 */
  maxResults?: number
  /** 跳过的数据数量。 */
  skip?: number
}

export interface GetProjectMemebersResponse {
  result?: {
    memberId?: string
    userId?: string
    role?: number
    roleIds?: number
  }[]
}

export interface QueryProjectQuery {
  /** 项目ID集合： */
  projectIds?: string
  /** 项目名字(模糊匹配)。 */
  name?: string
  /** 分页大小。每页返回最大数量。 */
  maxResults?: number
  /** 分页标。供分页使用，下一页token，从当前页结果中获取。 */
  nextToken?: string
  /** 原始项目ID。 */
  sourceId?: string
}

export interface QueryProjectResponse {
  result?: {
    projectId?: string
    name?: string
    logo?: string
    description?: string
    organizationId?: string
    visibility?: string
    isTemplate?: number
    creatorId?: string
    isArchived?: number
    isSuspended?: number
    uniqueIdPrefix?: string
    created?: string
    updated?: string
    startDate?: string
    endDate?: string
    customFields?: number
  }[]
  nextToken?: string
  requestId?: string
}

export interface SearchTaskflowStatusQuery {
  /** 模糊查询工作流状态名字。 */
  query?: string
  /** 每页返回最大数量。 */
  maxResults?: number
  /** 分页标，从上一次请求结果中获取。 */
  nextToken?: string
  /** 工作流ID集合。 */
  tfIds?: string
  /** 工作流状态ID集合。 */
  tfsIds?: string
}

export interface SearchTaskflowStatusResponse {
  result?: {
    taskflowStatusId?: string
    name?: string
    pos?: number
    taskflowId?: string
    rejectStatusIds?: number
    kind?: string
    creatorId?: string
    isDeleted?: number
    created?: string
    updated?: string
    isTaskflowstatusruleexector?: number
  }[]
}

export interface UpdateTaskTaskflowstatusParams {
  /** 任务状态ID。 */
  taskflowStatusId?: string
  taskflowStatusUpdateNote?: string
}

export interface UpdateTaskTaskflowstatusResponse {
  result?: {
    updated?: string
  }
}

export interface UpdateTaskStartdateParams {
  /** 任务开始时间，格式：YYYY-MM-DDTHH:mm:ssZ（ISO 8601/RFC 3339）。 */
  startDate?: string
}

export interface UpdateTaskStartdateResponse {
  result?: {
    startDate?: string
    updated?: string
  }
}

export interface CreateProjectParams {
  /** 项目名称。 */
  name?: string
}

export interface CreateProjectResponse {
  result?: {
    projectId?: string
    name?: string
    creatorId?: string
    logo?: string
    visibility?: string
    uniqueIdPrefix?: string
    created?: string
    updated?: string
    isArchived?: number
    isSuspended?: number
    normalType?: string
    rootCollectionId?: string
    sourceId?: string
    defaultCollectionId?: string
    isTemplate?: number
    customFields?: number
  }
}

export interface GetUserJoinedProjectQuery {
  /** 分页大小。 */
  maxResults?: number
  /** 分页标。 */
  nextToken?: string
}

export interface GetUserJoinedProjectResponse {
  result?: string[]
  nextToken?: string
}

export interface ArchiveProjectResponse {
  result?: {
    isArchived?: number
    updated?: string
  }
}

export interface UnSuspendProjectResponse {
  result?: {
    updated?: string
  }
}

export interface SuspendProjectResponse {
  result?: {
    updated?: string
  }
}

export interface QueryTaskOfProjectQuery {
  /** 分页游标。 */
  nextToken?: string
  /** 每页返回最大数量。默认10，最大500。 */
  maxResults?: number
  /** 查询条件。 */
  query?: string
}

export interface QueryTaskOfProjectResponse {
  totalCount: number
  nextToken: string
  result?: {
    taskId?: string
    content?: string
    involveMembers?: number
    projectId?: string
    executorId?: string
    creatorId?: string
    isDeleted?: number
    labels?: number
    created?: string
    updated?: string
    scenariofieldconfigId?: string
    customfields?: number
    note?: string
    startDate?: string
    dueDate?: string
    priority?: number
    taskflowstatusId?: string
    isDone?: number
    isArchived?: number
    visible?: string
    tagIds?: number
    stageId?: string
    sprintId?: string
    accomplished?: string
    storyPoint?: number
    progress?: number
    ancestorIds?: number
  }[]
}

export interface CreateWorkTimeParams {
  /** 任务执行者userId。 */
  executorId: string
  /** 对象ID，传项目任务ID。 */
  objectId: string
  /** 对象类型，固定值为task，表示项目任务。 */
  objectType: string
  /** 工时提交人员的userId。 */
  submitterId: string
  /** 当startDate和endDate指定的时间跨天时，添加的工时时长是否连续。 */
  isDuration: unknown
  /** 添加实际工时的日期是否包含假期。 */
  includesHolidays: unknown
  /** 添加实际工时的开始日期。 */
  startDate: string
  /** 结束时间。 */
  endDate: string
  /** 实际工时时长，单位毫秒，1小时即为3600000。 */
  workTime: number
}

export interface CreateWorkTimeQuery {
  /** 接口校验类型，固定值：organization。 */
  tenantType: string
}

export interface CreateWorkTimeResponse {
  result?: {
    ok?: number
    message?: string
    body?: number
  }
}

export interface CreatePlanTimeParams {
  /** 目标任务的执行者userId。 */
  executorId: string
  /** 对象ID，传项目任务ID。 */
  objectId: string
  /** 对象类型，固定值为task，表示项目任务。 */
  objectType: string
  /** 当startDate和endDate指定的时间跨天时，添加的工时时长是否连续。 */
  isDuration: unknown
  /** 添加计划工时的日期是否包含假期。 */
  includesHolidays: unknown
  /** 工时提交人员的userId。 */
  submitterId: string
  /** 开始时间。 */
  startDate: string
  /** 结束时间。 */
  endDate: string
  /** 计划工时时长，单位毫秒，1小时即为3600000。 */
  planTime: number
}

export interface CreatePlanTimeQuery {
  /** 接口校验类型，目前为固定值：organization。 */
  tenantType: string
}

export interface CreatePlanTimeResponse {
  result?: {
    ok?: number
    message?: string
    body?: number
  }
}

export interface UpdateCustomfieldValueParams {
  /** 自定义字段名。 */
  customFieldName?: string
  /** 自定义对象值。 */
  value: object[]
  /** 自定义字段id。 */
  customFieldId?: string
}

export interface UpdateCustomfieldValueResponse {
  result?: {
    customFields?: number
  }
}

export interface GetTbUserIdByStaffIdQuery {
  /** 操作者userId。 */
  optUserId: string
  /** 需要被查询的用户userId。 */
  userId: string
}

export interface GetTbUserIdByStaffIdResponse {
  result: {
    tbUserId: string
  }
}

export interface GetTbOrgIdByDingOrgIdQuery {
  /** 操作者userId。 */
  optUserId: string
}

export interface GetTbOrgIdByDingOrgIdResponse {
  result: {
    tbOrganizationId: string
  }
}

export interface UpdateProjectGroupParams {
  /** 将项目添加到的目标项目分组Id列表，最大值5。 */
  addProjectGroupIds?: string[]
  /** 移除该项目的项目分组Id列表，最大值5。 */
  delProjectGroupIds?: string[]
}

export interface UpdateProjectGroupResponse {
  result?: {
    ok?: number
  }
}

export interface AddProjectMemberParams {
  /** 被添加的用户userId列表，建议一次不超过10个。 */
  userIds: string[]
}

export interface AddProjectMemberResponse {
  result?: {
    nickname?: string
    joined?: string
  }[]
}

export interface CreateProjectByTemplateParams {
  /** 项目名字。 */
  name: string
  /** 模板Id。 */
  templateId: string
}

export interface CreateProjectByTemplateResponse {
  result?: {
    id?: string
    name?: string
    created?: string
    logo?: string
  }
}

export interface GetProjectGroupQuery {
  /** 查看者userId，即查询该员工可见的项目分组。 */
  viewerId?: string
  /** 分页大小。从1开始，默认值10，最大值1000。 */
  pageSize?: number
}

export interface GetProjectGroupResponse {
  result?: {
    id?: string
    visible?: string
    name?: string
    created?: string
    updated?: string
  }[]
}

export interface SearchProjectTemplateQuery {
  /** 项目模板名称关键词。 */
  keyword?: string
}

export interface SearchProjectTemplateResponse {
  result?: {
    id?: string
    description?: string
    visible?: string
    isDemo?: number
    isDeleted?: number
    name?: string
    logo?: string
    created?: string
    updated?: string
  }[]
}

export interface CreateTaskObjectLinkParams {
  /** 关联内容信息。 */
  linkedData?: unknown
}

export interface CreateTaskObjectLinkResponse {
  result?: {
    created?: string
    objectLinkId?: string
  }
}

export interface CreateTaskParams {
  /** 项目id。 */
  projectId: string
  /** 任务标题。 */
  content: string
  /** 任务执行者userId。 */
  executorId?: string
  /** 任务截止时间，格式：YYYY-MM-DDTHH:mm:ssZ（ISO 8601/RFC 3339）。 */
  dueDate?: string
  /** 任务备注。 */
  note?: string
  /** 任务优先级。 */
  priority?: number
  /** 自定义业务字段。 */
  customfields?: object[]
  /** 任务列表ID。 */
  stageId?: string
  /** 父任务id。 */
  parentTaskId?: string
  /** 任务类型id，任务类型比如：缺陷、需求。 */
  scenariofieldconfigId?: string
  /** 任务开始时间，iso8601格式，例如：2022-07-29T14:55Z。 */
  startDate?: string
  /** 任务的可见性规则。 */
  visible?: string
}

export interface CreateTaskResponse {
  result?: {
    taskId?: string
    content?: string
    involveMembers?: number
    projectId?: string
    executorId?: string
    creatorId?: string
    created?: string
    updated?: string
    note?: string
    dueDate?: string
    priority?: number
    customfields?: number
  }
}

export interface GetOrganizatioTaskByIdsQuery {
  /** 任务id列表，建议不超过20个，多个任务id之间使用`,`分开。 */
  taskIds: string
}

export interface GetOrganizatioTaskByIdsResponse {
  result?: {
    note?: string
    visible?: string
    executorId?: string
    created?: string
    dueDate?: string
    creatorId?: string
    involveMembers?: number
    priority?: number
    isDone?: number
    content?: string
    labels?: number
    isDeleted?: number
    ancestorIds?: number
    taskId?: string
    updated?: string
    startDate?: string
  }[]
}

export interface UpdateOrganizationTaskPriorityParams {
  /** 自由任务优先级。 */
  priority: number
  /** 是否禁止动态。 */
  disableActivity?: unknown
  /** 是否禁止通知。 */
  disableNotification?: unknown
}

export interface UpdateOrganizationTaskPriorityResponse {
  result?: {
    priority?: number
    updated?: string
  }
}

export interface UpdateOrganizationTaskNoteParams {
  /** 任务备注。 */
  note: string
  /** 是否禁止动态。 */
  disableActivity?: unknown
  /** 是否禁止通知。 */
  disableNotification?: unknown
}

export interface UpdateOrganizationTaskNoteResponse {
  result?: {
    note?: string
    updated?: string
  }
}

export interface UpdateOrganizationTaskInvolveMembersParams {
  /** 所有参与者userId列表，建议参与者总人数不超过20个。 */
  involveMembers?: string[]
  /** 增加的参与者userId列表，建议参与者总人数不超过20个。 */
  addInvolvers?: string[]
  /** 删除的参与者userId列表。 */
  delInvolvers?: string[]
  /** 是否禁止动态。 */
  disableActivity?: unknown
  /** 是否禁止通知。 */
  disableNotification?: unknown
}

export interface UpdateOrganizationTaskInvolveMembersResponse {
  result?: {
    involvers?: number
    updated?: string
  }
}

export interface UpdateOrganizationTaskExecutorParams {
  /** 任务执行者userId。 */
  executorId: string
  /** 是否禁止动态。 */
  disableActivity?: unknown
  /** 是否禁止通知。 */
  disableNotification?: unknown
}

export interface UpdateOrganizationTaskExecutorResponse {
  result?: {
    executorId?: string
    updated?: string
    executor?: number
    involvers?: number
  }
}

export interface UpdateOrganizationTaskDueDateParams {
  /** 任务截止时间，格式：YYYY-MM-DDTHH:mm:ssZ（ISO 8601/RFC 3339）。 */
  dueDate: string
  /** 是否禁止动态。 */
  disableActivity?: unknown
  /** 是否禁止通知。 */
  disableNotification?: unknown
}

export interface UpdateOrganizationTaskDueDateResponse {
  result?: {
    dueDate?: string
    updateTime?: string
  }
}

export interface UpdateOrganizationTaskContentParams {
  /** 任务标题。 */
  content: string
  /** 是否禁止动态。 */
  disableActivity?: unknown
  /** 是否禁止通知。 */
  disableNotification?: unknown
}

export interface UpdateOrganizationTaskContentResponse {
  result?: {
    content?: string
    updated?: string
  }
}

export interface UpdateOrganizationTaskStatusParams {
  /** 自由任务状态。 */
  isDone: unknown
  /** 是否禁止动态。 */
  disableActivity?: unknown
  /** 是否禁止通知。 */
  disableNotification?: unknown
}

export interface UpdateOrganizationTaskStatusResponse {
  result?: {
    isDone?: number
    updateTime?: string
  }
}

export interface GetOrganizationPriorityListResponse {
  result?: {
    color?: string
    name?: string
    priorityId?: string
    priority?: string
  }[]
}

export interface GetOrganizationTaskResponse {
  result?: {
    note?: string
    visible?: string
    executorId?: string
    created?: string
    dueDate?: string
    creatorId?: string
    involveMembers?: number
    priority?: number
    isDone?: number
    content?: string
    labels?: number
    isDeleted?: number
    ancestorIds?: number
    taskId?: string
    updated?: string
    startDate?: string
  }
}

export interface DeleteTaskResponse {
  result?: unknown
}

export interface CreateOrganizationTaskParams {
  /** 任务标题。 */
  content: string
  /** 任务备注。 */
  note?: string
  /** 自由任务优先级，如下图所示。用户是否有自定义更新优先级，获取该参数方法不同。 */
  priority: number
  /** 参与者userId列表，建议参与者总人数不超过20个。 */
  involveMembers?: string[]
  /** 执行者userId。 */
  executorId?: string
  /** 任务截止日期，格式：YYYY-MM-DDTHH:mm:ssZ（ISO 8601/RFC 3339）。 */
  dueDate?: string
  /** 任务创建日期，格式：YYYY-MM-DDTHH:mm:ssZ（ISO 8601/RFC 3339）。 */
  createTime?: string
  /** 任务可见性。 */
  visible: string
  /** 是否禁止通知。 */
  disableNotification?: unknown
  /** 是否禁止动态。 */
  disableActivity?: unknown
}

export interface CreateOrganizationTaskResponse {
  result?: {
    dueDate?: string
    executor?: number
    id?: string
    visible?: string
    created?: string
    priority?: number
    involvers?: number
    updated?: string
    note?: string
    hasReminder?: number
    creatorId?: string
    content?: string
    attachmentsCount?: number
    isDeleted?: number
    ancestorIds?: number
    creator?: number
    executorId?: string
    involveMembers?: number
    isDone?: string
  }
}

// funcName: isOldApi
Internal.define({
  '/project/users/{userId}/projects/{projectId}/customfields': {
    PUT: { createProjectCustomfieldStatus: false },
  },
  '/project/users/{userId}/tasks/{taskId}/contents': {
    PUT: { updateTaskContent: false },
  },
  '/project/users/{userId}/tasks/{taskId}/notes': {
    PUT: { updateTaskNote: false },
  },
  '/project/users/{userId}/tasks/{taskId}/involveMembers': {
    PUT: { updateTaskInvolvemembers: false },
  },
  '/project/users/{userId}/tasks/{taskId}/executors': {
    PUT: { updateTaskExecutor: false },
  },
  '/project/users/{userId}/tasks/{taskId}/priorities': {
    PUT: { updateTaskPriority: false },
  },
  '/project/users/{userId}/tasks/{taskId}/dueDates': {
    PUT: { updateTaskDueDate: false },
  },
  '/project/users/{userId}/tasks': {
    GET: { getTaskByIds: false },
    POST: { createTask: false },
  },
  '/project/users/{userId}/tasks/{taskId}/archive': {
    POST: { archiveTask: false },
  },
  '/project/users/{userId}/tasks/search': { POST: { searchUserTask: false } },
  '/project/users/{userId}/projects/{projectId}/taskStages/search': {
    POST: { seachTaskStage: false },
  },
  '/project/users/{userId}/projects/{projectId}/taskLists/search': {
    POST: { searchTaskList: false },
  },
  '/project/users/{userId}/projects/{projectId}/taskflows/search': {
    POST: { searchTaskFlow: false },
  },
  '/project/users/{userId}/projects/{projectId}/statuses': {
    GET: { getProjectStatusList: false },
  },
  '/project/users/{userId}/projects/{projectId}/members/remove': {
    POST: { deleteProjectMember: false },
  },
  '/project/users/{userId}/projects/{projectId}/members': {
    GET: { getProjectMemebers: false },
    POST: { addProjectMember: false },
  },
  '/project/users/{userId}/projects/query': { POST: { queryProject: false } },
  '/project/users/{userId}/projects/{projectId}/taskflowStatuses/search': {
    GET: { searchTaskflowStatus: false },
  },
  '/project/users/{userId}/tasks/{taskId}/taskflowStatuses': {
    PUT: { updateTaskTaskflowstatus: false },
  },
  '/project/users/{userId}/tasks/{taskId}/startDates': {
    PUT: { updateTaskStartdate: false },
  },
  '/project/users/{userId}/projects': { POST: { createProject: false } },
  '/project/users/{userId}/joinProjects': {
    GET: { getUserJoinedProject: false },
  },
  '/project/users/{userId}/projects/{projectId}/archive': {
    POST: { archiveProject: false },
  },
  '/project/users/{userId}/projects/{projectId}/unsuspend': {
    POST: { unSuspendProject: false },
  },
  '/project/users/{userId}/projects/{projectId}/suspend': {
    POST: { suspendProject: false },
  },
  '/project/users/{userId}/projectIds/{projectId}/tasks': {
    GET: { queryTaskOfProject: false },
  },
  '/project/users/{userId}/workTimes': { POST: { createWorkTime: false } },
  '/project/users/{userId}/planTimes': { POST: { createPlanTime: false } },
  '/project/users/{userId}/tasks/{taskId}/customFields': {
    PUT: { updateCustomfieldValue: false },
  },
  '/project/teambition/users': { GET: { getTbUserIdByStaffId: false } },
  '/project/teambition/organizations': {
    GET: { getTbOrgIdByDingOrgId: false },
  },
  '/project/users/{userId}/projects/{projectId}/groups': {
    PUT: { updateProjectGroup: false },
  },
  '/project/users/{userId}/templates/projects': {
    POST: { createProjectByTemplate: false },
  },
  '/project/organizations/users/{userId}/groups': {
    GET: { getProjectGroup: false },
  },
  '/project/organizations/users/{userId}/templates': {
    GET: { searchProjectTemplate: false },
  },
  '/project/users/{userId}/tasks/{taskId}/objectLinks': {
    POST: { createTaskObjectLink: false },
  },
  '/project/organizations/users/{userId}/tasks': {
    GET: { getOrganizatioTaskByIds: false },
    POST: { createOrganizationTask: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}/priorities': {
    PUT: { updateOrganizationTaskPriority: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}/notes': {
    PUT: { updateOrganizationTaskNote: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}/involveMembers': {
    PUT: { updateOrganizationTaskInvolveMembers: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}/executors': {
    PUT: { updateOrganizationTaskExecutor: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}/dueDates': {
    PUT: { updateOrganizationTaskDueDate: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}/contents': {
    PUT: { updateOrganizationTaskContent: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}/states': {
    PUT: { updateOrganizationTaskStatus: false },
  },
  '/project/organizations/users/{userId}/priorities': {
    GET: { getOrganizationPriorityList: false },
  },
  '/project/organizations/users/{userId}/tasks/{taskId}': {
    GET: { getOrganizationTask: false },
  },
  '/project/users/{userId}/tasks/{taskId}': { DELETE: { deleteTask: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 创建或更新项目概览中自定义字段值
     * @see https://developers.dingtalk.com/document/orgapp/create-project-custom-fields
     */
    createProjectCustomfieldStatus(
      userId: string,
      projectId: string,
      params: CreateProjectCustomfieldStatusParams,
    ): Promise<CreateProjectCustomfieldStatusResponse>
    /**
     * 更新任务标题
     * @see https://developers.dingtalk.com/document/orgapp/update-task-content
     */
    updateTaskContent(
      userId: string,
      taskId: string,
      params: UpdateTaskContentParams,
    ): Promise<UpdateTaskContentResponse>
    /**
     * 更新任务备注
     * @see https://developers.dingtalk.com/document/orgapp/update-task-notes
     */
    updateTaskNote(
      userId: string,
      taskId: string,
      params: UpdateTaskNoteParams,
    ): Promise<UpdateTaskNoteResponse>
    /**
     * 更新任务参与者
     * @see https://developers.dingtalk.com/document/orgapp/update-task-participants
     */
    updateTaskInvolvemembers(
      userId: string,
      taskId: string,
      params: UpdateTaskInvolvemembersParams,
    ): Promise<UpdateTaskInvolvemembersResponse>
    /**
     * 更新任务执行者
     * @see https://developers.dingtalk.com/document/orgapp/update-task-performer
     */
    updateTaskExecutor(
      userId: string,
      taskId: string,
      params: UpdateTaskExecutorParams,
    ): Promise<UpdateTaskExecutorResponse>
    /**
     * 更新任务优先级
     * @see https://developers.dingtalk.com/document/orgapp/update-task-priority
     */
    updateTaskPriority(
      userId: string,
      taskId: string,
      params: UpdateTaskPriorityParams,
    ): Promise<UpdateTaskPriorityResponse>
    /**
     * 更新任务截止时间
     * @see https://developers.dingtalk.com/document/orgapp/update-task-deadline
     */
    updateTaskDueDate(
      userId: string,
      taskId: string,
      params: UpdateTaskDueDateParams,
    ): Promise<UpdateTaskDueDateResponse>
    /**
     * 获取任务详情
     * @see https://developers.dingtalk.com/document/orgapp/get-task-details
     */
    getTaskByIds(
      userId: string,
      query: GetTaskByIdsQuery,
    ): Promise<GetTaskByIdsResponse>
    /**
     * 任务迁移至回收站
     * @see https://developers.dingtalk.com/document/orgapp/archive-tasks
     */
    archiveTask(userId: string, taskId: string): Promise<ArchiveTaskResponse>
    /**
     * 查询用户任务列表
     * @see https://developers.dingtalk.com/document/orgapp/querying-user-tasks
     */
    searchUserTask(
      userId: string,
      query: SearchUserTaskQuery,
    ): Promise<SearchUserTaskResponse>
    /**
     * 获取任务列表
     * @see https://developers.dingtalk.com/document/orgapp/get-task-list
     */
    seachTaskStage(
      userId: string,
      projectId: string,
      query: SeachTaskStageQuery,
    ): Promise<SeachTaskStageResponse>
    /**
     * 查询任务分组
     * @see https://developers.dingtalk.com/document/orgapp/query-task-grouping
     */
    searchTaskList(
      userId: string,
      projectId: string,
      query: SearchTaskListQuery,
    ): Promise<SearchTaskListResponse>
    /**
     * 查询任务工作流
     * @see https://developers.dingtalk.com/document/orgapp/query-task-workflow
     */
    searchTaskFlow(
      userId: string,
      projectId: string,
      query: SearchTaskFlowQuery,
    ): Promise<SearchTaskFlowResponse>
    /**
     * 查询项目状态
     * @see https://developers.dingtalk.com/document/orgapp/query-project-status
     */
    getProjectStatusList(
      userId: string,
      projectId: string,
    ): Promise<GetProjectStatusListResponse>
    /**
     * 删除项目成员
     * @see https://developers.dingtalk.com/document/orgapp/delete-project-members
     */
    deleteProjectMember(
      userId: string,
      projectId: string,
      params: DeleteProjectMemberParams,
    ): Promise<DeleteProjectMemberResponse>
    /**
     * 获取项目成员
     * @see https://developers.dingtalk.com/document/orgapp/get-project-members
     */
    getProjectMemebers(
      userId: string,
      projectId: string,
      query: GetProjectMemebersQuery,
    ): Promise<GetProjectMemebersResponse>
    /**
     * 查询项目
     * @see https://developers.dingtalk.com/document/orgapp/query-enterprise-all-projects
     */
    queryProject(
      userId: string,
      query: QueryProjectQuery,
    ): Promise<QueryProjectResponse>
    /**
     * 搜索任务工作流状态
     * @see https://developers.dingtalk.com/document/isvapp/search-task-workflow-status
     */
    searchTaskflowStatus(
      userId: string,
      projectId: string,
      query: SearchTaskflowStatusQuery,
    ): Promise<SearchTaskflowStatusResponse>
    /**
     * 更新任务工作流状态
     * @see https://developers.dingtalk.com/document/isvapp/update-task-workflow-status
     */
    updateTaskTaskflowstatus(
      userId: string,
      taskId: string,
      params: UpdateTaskTaskflowstatusParams,
    ): Promise<UpdateTaskTaskflowstatusResponse>
    /**
     * 更新任务开始时间
     * @see https://developers.dingtalk.com/document/orgapp/update-task-start-time
     */
    updateTaskStartdate(
      userId: string,
      taskId: string,
      params: UpdateTaskStartdateParams,
    ): Promise<UpdateTaskStartdateResponse>
    /**
     * 创建项目
     * @see https://developers.dingtalk.com/document/orgapp/create-project
     */
    createProject(
      userId: string,
      params: CreateProjectParams,
    ): Promise<CreateProjectResponse>
    /**
     * 获取用户加入的项目
     * @see https://developers.dingtalk.com/document/orgapp/get-projects-joined-by-users
     */
    getUserJoinedProject(
      userId: string,
      query: GetUserJoinedProjectQuery,
    ): Promise<GetUserJoinedProjectResponse>
    /**
     * 项目放入回收站
     * @see https://developers.dingtalk.com/document/orgapp/items-in-recycle-bin
     */
    archiveProject(
      userId: string,
      projectId: string,
    ): Promise<ArchiveProjectResponse>
    /**
     * 恢复项目归档
     * @see https://developers.dingtalk.com/document/orgapp/cancel-project-archiving
     */
    unSuspendProject(
      projectId: string,
      userId: string,
    ): Promise<UnSuspendProjectResponse>
    /**
     * 归档项目
     * @see https://developers.dingtalk.com/document/orgapp/archiving-project
     */
    suspendProject(
      projectId: string,
      userId: string,
    ): Promise<SuspendProjectResponse>
    /**
     * 查询项目中的任务
     * @see https://developers.dingtalk.com/document/isvapp/query-tasks-in-a-project
     */
    queryTaskOfProject(
      userId: string,
      projectId: string,
      query: QueryTaskOfProjectQuery,
    ): Promise<QueryTaskOfProjectResponse>
    /**
     * 录入实际工时接口
     * @see https://developers.dingtalk.com/document/isvapp/create-actual-work
     */
    createWorkTime(
      userId: string,
      query: CreateWorkTimeQuery,
      params: CreateWorkTimeParams,
    ): Promise<CreateWorkTimeResponse>
    /**
     * 录入计划工时
     * @see https://developers.dingtalk.com/document/isvapp/create-planned-work
     */
    createPlanTime(
      userId: string,
      query: CreatePlanTimeQuery,
      params: CreatePlanTimeParams,
    ): Promise<CreatePlanTimeResponse>
    /**
     * 更新任务自定义字段的值
     * @see https://developers.dingtalk.com/document/isvapp/update-task-custom-field-value
     */
    updateCustomfieldValue(
      userId: string,
      taskId: string,
      params: UpdateCustomfieldValueParams,
    ): Promise<UpdateCustomfieldValueResponse>
    /**
     * 根据钉钉UserId获取Teambition用户Id
     * @see https://developers.dingtalk.com/document/isvapp/obtain-dingtalk-teambition-user-id-based-on-userid
     */
    getTbUserIdByStaffId(
      query: GetTbUserIdByStaffIdQuery,
    ): Promise<GetTbUserIdByStaffIdResponse>
    /**
     * 获取Teambition企业Id
     * @see https://developers.dingtalk.com/document/isvapp/obtain-the-teambition-enterprise-id
     */
    getTbOrgIdByDingOrgId(
      query: GetTbOrgIdByDingOrgIdQuery,
    ): Promise<GetTbOrgIdByDingOrgIdResponse>
    /**
     * 更新项目的分组
     * @see https://developers.dingtalk.com/document/isvapp/update-project-grouping
     */
    updateProjectGroup(
      userId: string,
      projectId: string,
      params: UpdateProjectGroupParams,
    ): Promise<UpdateProjectGroupResponse>
    /**
     * 增加项目成员
     * @see https://developers.dingtalk.com/document/isvapp/add-project-members
     */
    addProjectMember(
      userId: string,
      projectId: string,
      params: AddProjectMemberParams,
    ): Promise<AddProjectMemberResponse>
    /**
     * 根据项目模板创建项目
     * @see https://developers.dingtalk.com/document/isvapp/create-a-project-from-a-project-template
     */
    createProjectByTemplate(
      userId: string,
      params: CreateProjectByTemplateParams,
    ): Promise<CreateProjectByTemplateResponse>
    /**
     * 查询可见的项目分组
     * @see https://developers.dingtalk.com/document/isvapp/query-available-project-groups
     */
    getProjectGroup(
      userId: string,
      query: GetProjectGroupQuery,
    ): Promise<GetProjectGroupResponse>
    /**
     * 按项目模板名字搜索企业自定义模板
     * @see https://developers.dingtalk.com/document/isvapp/search-for-enterprise-custom-templates-by-project-template-name
     */
    searchProjectTemplate(
      userId: string,
      query: SearchProjectTemplateQuery,
    ): Promise<SearchProjectTemplateResponse>
    /**
     * 创建任务关联对象
     * @see https://developers.dingtalk.com/document/isvapp/create-a-linked-object-associated-with-a-task
     */
    createTaskObjectLink(
      userId: string,
      taskId: string,
      params: CreateTaskObjectLinkParams,
    ): Promise<CreateTaskObjectLinkResponse>
    /**
     * 创建项目任务
     * @see https://developers.dingtalk.com/document/isvapp/create-a-project-task
     */
    createTask(
      userId: string,
      params: CreateTaskParams,
    ): Promise<CreateTaskResponse>
    /**
     * 批量获取任务详情
     * @see https://developers.dingtalk.com/document/isvapp/obtains-details-about-multiple-free-tasks-isv
     */
    getOrganizatioTaskByIds(
      userId: string,
      query: GetOrganizatioTaskByIdsQuery,
    ): Promise<GetOrganizatioTaskByIdsResponse>
    /**
     * 更新自由任务优先级
     * @see https://developers.dingtalk.com/document/isvapp/update-the-priority-of-a-free-migration-job
     */
    updateOrganizationTaskPriority(
      taskId: string,
      userId: string,
      params: UpdateOrganizationTaskPriorityParams,
    ): Promise<UpdateOrganizationTaskPriorityResponse>
    /**
     * 更改自由任务备注
     * @see https://developers.dingtalk.com/document/isvapp/update-free-task-notes-isv
     */
    updateOrganizationTaskNote(
      taskId: string,
      userId: string,
      params: UpdateOrganizationTaskNoteParams,
    ): Promise<UpdateOrganizationTaskNoteResponse>
    /**
     * 更新自由任务参与者
     * @see https://developers.dingtalk.com/document/isvapp/add-or-remove-participants-of-free-tasks
     */
    updateOrganizationTaskInvolveMembers(
      taskId: string,
      userId: string,
      params: UpdateOrganizationTaskInvolveMembersParams,
    ): Promise<UpdateOrganizationTaskInvolveMembersResponse>
    /**
     * 更改自由任务执行者
     * @see https://developers.dingtalk.com/document/isvapp/update-free-task-executor
     */
    updateOrganizationTaskExecutor(
      taskId: string,
      userId: string,
      params: UpdateOrganizationTaskExecutorParams,
    ): Promise<UpdateOrganizationTaskExecutorResponse>
    /**
     * 更新自由任务截止时间
     * @see https://developers.dingtalk.com/document/isvapp/update-free-task-deadline
     */
    updateOrganizationTaskDueDate(
      taskId: string,
      userId: string,
      params: UpdateOrganizationTaskDueDateParams,
    ): Promise<UpdateOrganizationTaskDueDateResponse>
    /**
     * 更改自由任务标题
     * @see https://developers.dingtalk.com/document/isvapp/update-free-task-title
     */
    updateOrganizationTaskContent(
      taskId: string,
      userId: string,
      params: UpdateOrganizationTaskContentParams,
    ): Promise<UpdateOrganizationTaskContentResponse>
    /**
     * 更改自由任务状态
     * @see https://developers.dingtalk.com/document/isvapp/update-free-task-status
     */
    updateOrganizationTaskStatus(
      taskId: string,
      userId: string,
      params: UpdateOrganizationTaskStatusParams,
    ): Promise<UpdateOrganizationTaskStatusResponse>
    /**
     * 获取企业优先级列表
     * @see https://developers.dingtalk.com/document/isvapp/query-a-priority-list-isv
     */
    getOrganizationPriorityList(
      userId: string,
    ): Promise<GetOrganizationPriorityListResponse>
    /**
     * 获取自由任务详情
     * @see https://developers.dingtalk.com/document/isvapp/queries-free-task-details-isv
     */
    getOrganizationTask(
      taskId: string,
      userId: string,
    ): Promise<GetOrganizationTaskResponse>
    /**
     * 删除任务
     * @see https://developers.dingtalk.com/document/orgapp/delete-task
     */
    deleteTask(userId: string, taskId: string): Promise<DeleteTaskResponse>
    /**
     * 创建自由任务
     * @see https://developers.dingtalk.com/document/isvapp/create-a-free-task-isv
     */
    createOrganizationTask(
      userId: string,
      params: CreateOrganizationTaskParams,
    ): Promise<CreateOrganizationTaskResponse>
  }
}
