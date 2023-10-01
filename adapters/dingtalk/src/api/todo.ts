import { Internal } from '../internal'
// GENERATED CONTENT

export interface QueryOrgTodoTasksParams {
  /** 分页游标。 */
  nextToken?: string
  /** 待办完成状态。 */
  isDone?: unknown
}

export interface QueryOrgTodoTasksResponse {
  nextToken?: string
  todoCards?: {
    taskId?: string
    subject?: string
    dueTime?: number
    detailUrl?: number
    todoCardView?: number
    priority?: number
    createdTime?: number
    modifiedTime?: number
    todoStatus?: string
    creatorId?: string
    sourceId?: string
    category?: string
    bizTag?: string
    originalSource?: number
    isDone?: number
    orgInfo?: number
  }[]
  totalCount?: number
}

export interface UpdateTodoTaskExecutorStatusParams {
  /** 执行者状态列表，id需传用户的unionId。 */
  executorStatusList?: object[]
}

export interface UpdateTodoTaskExecutorStatusQuery {
  /** 当前操作者的用户的unionId。 */
  operatorId?: string
}

export interface UpdateTodoTaskExecutorStatusResponse {
  result?: unknown
}

export interface CreateTodoTaskParams {
  /** 业务系统侧的唯一标识ID，即业务ID。 */
  sourceId?: string
  /** 待办标题，最大长度1024。 */
  subject: string
  /** 创建者的unionId。 */
  creatorId?: string
  /** 待办备注描述，最大长度4096。 */
  description?: string
  /** 截止时间，Unix时间戳，单位毫秒。 */
  dueTime?: number
  /** 执行者的unionId，最大数量1000。 */
  executorIds?: string[]
  /** 参与者的unionId，最大数量1000。 */
  participantIds?: string[]
  /** 详情页url跳转地址。 */
  detailUrl?: unknown
  /** 待办卡片内容区表单自定义字段列表 */
  contentFieldList?: object[]
  /** 生成的待办是否仅展示在执行者的待办列表中。 */
  isOnlyShowExecutor?: unknown
  /** 优先级，取值： */
  priority?: number
  /** 待办通知配置。 */
  notifyConfigs?: unknown
  /** 二级分类。 */
  bizCategoryId?: string
  /** 编辑 */
  actionList?: object[]
}

export interface CreateTodoTaskQuery {
  /** 当前操作者用户的unionId。 */
  operatorId?: string
}

export interface CreateTodoTaskResponse {
  id: string
  subject: string
  description?: string
  startTime?: number
  dueTime?: number
  finishTime?: number
  done?: unknown
  executorIds?: string[]
  participantIds?: string[]
  detailUrl?: {
    pcUrl?: string
    appUrl?: string
  }
  source?: string
  sourceId?: string
  createdTime: number
  modifiedTime?: number
  creatorId: string
  modifierId?: string
  tenantId?: string
  tenantType?: string
  bizTag?: string
  requestId?: string
  cardTypeId?: string
  contentFieldList?: {
    fieldKey?: string
    fieldValue?: string
  }[]
  isOnlyShowExecutor?: unknown
  priority?: number
  sourceTitle?: string
  notifyConfigs?: {
    singleChat?: string
    dingNotify?: string
  }
}

export interface UpdateTodoTaskParams {
  /** 待办标题，最大长度1024。 */
  subject?: string
  /** 待办描述，最大长度4096。 */
  description?: string
  /** 截止时间，Unix时间戳，单位毫秒。 */
  dueTime?: number
  /** 完成状态。 */
  done?: unknown
  /** 执行者的unionId列表，最大数量1000。 */
  executorIds?: string[]
  /** 参与者的unionId列表，最大数量1000。 */
  participantIds?: string[]
}

export interface UpdateTodoTaskQuery {
  /** 当前操作者的unionId。 */
  operatorId?: string
}

export interface UpdateTodoTaskResponse {
  result?: unknown
}

export interface DeleteTodoTaskQuery {
  /** 当前操作者的用户的unionId。 */
  operatorId?: string
}

export interface DeleteTodoTaskResponse {
  result?: unknown
  requestId?: string
}

// funcName: isOldApi
Internal.define({
  '/todo/users/{unionId}/org/tasks/query': {
    POST: { queryOrgTodoTasks: false },
  },
  '/todo/users/{unionId}/tasks/{taskId}/executorStatus': {
    PUT: { updateTodoTaskExecutorStatus: false },
  },
  '/todo/users/{unionId}/tasks': { POST: { createTodoTask: false } },
  '/todo/users/{unionId}/tasks/{taskId}': {
    PUT: { updateTodoTask: false },
    DELETE: { deleteTodoTask: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 查询企业下用户待办列表
     * @see https://open.dingtalk.com/document/isvapp/query-the-to-do-list-of-enterprise-users
     */
    queryOrgTodoTasks(
      unionId: string,
      params: QueryOrgTodoTasksParams,
    ): Promise<QueryOrgTodoTasksResponse>
    /**
     * 更新钉钉待办执行者状态
     * @see https://open.dingtalk.com/document/isvapp/update-dingtalk-to-do-status
     */
    updateTodoTaskExecutorStatus(
      unionId: string,
      taskId: string,
      query: UpdateTodoTaskExecutorStatusQuery,
      params: UpdateTodoTaskExecutorStatusParams,
    ): Promise<UpdateTodoTaskExecutorStatusResponse>
    /**
     * 创建待办
     * @see https://open.dingtalk.com/document/isvapp/add-dingtalk-to-do-task
     */
    createTodoTask(
      unionId: string,
      query: CreateTodoTaskQuery,
      params: CreateTodoTaskParams,
    ): Promise<CreateTodoTaskResponse>
    /**
     * 更新钉钉待办任务
     * @see https://open.dingtalk.com/document/isvapp/updates-dingtalk-to-do-tasks
     */
    updateTodoTask(
      unionId: string,
      taskId: string,
      query: UpdateTodoTaskQuery,
      params: UpdateTodoTaskParams,
    ): Promise<UpdateTodoTaskResponse>
    /**
     * 删除钉钉待办任务
     * @see https://open.dingtalk.com/document/isvapp/delete-dingtalk-to-do-tasks
     */
    deleteTodoTask(
      unionId: string,
      taskId: string,
      query: DeleteTodoTaskQuery,
    ): Promise<DeleteTodoTaskResponse>
  }
}
