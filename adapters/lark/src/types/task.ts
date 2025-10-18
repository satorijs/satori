import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    task: Task.Methods
  }
}

export namespace Task {
  export interface Methods {
    subtask: Subtask.Methods
    tasklist: Tasklist.Methods
    comment: Comment.Methods
    attachment: Attachment.Methods
    section: Section.Methods
    customField: CustomField.Methods
    reminder: Reminder.Methods
    follower: Follower.Methods
    collaborator: Collaborator.Methods
    /**
     * 创建任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/create
     */
    create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
    /**
     * 更新任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/patch
     */
    patch(task_guid: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
    /**
     * 获取任务详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/get
     */
    get(task_guid: string, query?: GetQuery): Promise<GetResponse>
    /**
     * 删除任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/delete
     */
    delete(task_guid: string): Promise<void>
    /**
     * 添加任务成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_members
     */
    addMembers(task_guid: string, body: AddMembersRequest, query?: AddMembersQuery): Promise<AddMembersResponse>
    /**
     * 移除任务成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_members
     */
    removeMembers(task_guid: string, body: RemoveMembersRequest, query?: RemoveMembersQuery): Promise<RemoveMembersResponse>
    /**
     * 列取任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/list
     */
    list(query?: ListQuery): Paginated<Lark.Task>
    /**
     * 列取任务所在清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/tasklists
     */
    tasklists(task_guid: string): Promise<TasklistsResponse>
    /**
     * 任务加入清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_tasklist
     */
    addTasklist(task_guid: string, body: AddTasklistRequest, query?: AddTasklistQuery): Promise<AddTasklistResponse>
    /**
     * 任务移出清单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_tasklist
     */
    removeTasklist(task_guid: string, body: RemoveTasklistRequest, query?: RemoveTasklistQuery): Promise<RemoveTasklistResponse>
    /**
     * 添加任务提醒
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_reminders
     */
    addReminders(task_guid: string, body: AddRemindersRequest, query?: AddRemindersQuery): Promise<AddRemindersResponse>
    /**
     * 移除任务提醒
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_reminders
     */
    removeReminders(task_guid: string, body: RemoveRemindersRequest, query?: RemoveRemindersQuery): Promise<RemoveRemindersResponse>
    /**
     * 添加依赖
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/add_dependencies
     */
    addDependencies(task_guid: string, body: AddDependenciesRequest): Promise<AddDependenciesResponse>
    /**
     * 移除依赖
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task/remove_dependencies
     */
    removeDependencies(task_guid: string, body: RemoveDependenciesRequest): Promise<RemoveDependenciesResponse>
    /**
     * 完成任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/complete
     */
    complete(task_id: string): Promise<void>
    /**
     * 取消完成任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/uncomplete
     */
    uncomplete(task_id: string): Promise<void>
    /**
     * 批量删除关注人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_follower
     */
    batchDeleteFollower(task_id: string, body: BatchDeleteFollowerRequest, query?: BatchDeleteFollowerQuery): Promise<BatchDeleteFollowerResponse>
    /**
     * 批量删除执行者
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/batch_delete_collaborator
     */
    batchDeleteCollaborator(task_id: string, body: BatchDeleteCollaboratorRequest, query?: BatchDeleteCollaboratorQuery): Promise<BatchDeleteCollaboratorResponse>
  }

  export interface CreateRequest {
    /** 任务标题 */
    summary: string
    /** 任务描述 */
    description?: string
    /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
    due?: Lark.Due
    /** 任务关联的第三方平台来源信息 */
    origin?: Lark.Origin
    /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
    extra?: string
    /** 任务的完成时刻时间戳(ms) */
    completed_at?: string
    /** 任务成员列表 */
    members?: Lark.Member[]
    /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
    repeat_rule?: string
    /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
    custom_complete?: Lark.CustomComplete
    /** 任务所在清单的信息 */
    tasklists?: Lark.TaskInTasklistInfo[]
    /** 幂等token，如果填写则触发幂等行为。 */
    client_token?: string
    /** 任务的开始时间(ms) */
    start?: Lark.Start
    /** 任务提醒 */
    reminders?: Lark.Reminder[]
    /** 任务完成模式, 1 - 会签任务; 2 - 或签任务 */
    mode?: number
    /** 是否是里程碑任务 */
    is_milestone?: boolean
    /** 自定义字段值 */
    custom_fields?: Lark.InputCustomFieldValue[]
    /** 任务的新版云文档来源 */
    docx_source?: Lark.DocxSource
  }

  export interface CreateQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface CreateResponse {
    /** 产生的任务 */
    task?: Lark.Task
  }

  export interface PatchRequest {
    /** 要更新的任务数据，只需要写明要更新的字段 */
    task?: Lark.InputTask
    /** 要更新的字段名称。支持summary, description, due, start, completed_at, extra, repeat_rule, custom_complete, mode, is_milestone, custom_fields。 */
    update_fields: string[]
  }

  export interface PatchQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface PatchResponse {
    /** 更新后的任务 */
    task?: Lark.Task
  }

  export interface GetQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface GetResponse {
    /** 获得的任务实体 */
    task?: Lark.Task
  }

  export interface AddMembersRequest {
    /** 要添加的members列表 */
    members: Lark.Member[]
    /** 幂等token，如果提供则实现幂等行为 */
    client_token?: string
  }

  export interface AddMembersQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface AddMembersResponse {
    /** 更新完成后的任务实体数据 */
    task?: Lark.Task
  }

  export interface RemoveMembersRequest {
    /** 要移除的member列表 */
    members: Lark.Member[]
  }

  export interface RemoveMembersQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface RemoveMembersResponse {
    /** 移除成员后的任务数据 */
    task?: Lark.Task
  }

  export interface ListQuery extends Pagination {
    /** 是否按任务完成进行过滤。不填写表示不过滤。 */
    completed?: boolean
    /** 查询任务的范围 */
    type?: string
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface TasklistsResponse {
    /** 任务所在清单的摘要信息 */
    tasklists?: Lark.TaskInTasklistInfo[]
  }

  export interface AddTasklistRequest {
    /** 要添加到的清单的全局唯一ID */
    tasklist_guid: string
    /** 要添加到清单的自定义分组全局唯一ID，如不填写表示添加到默认分组 */
    section_guid?: string
  }

  export interface AddTasklistQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface AddTasklistResponse {
    /** 添加后的任务详情 */
    task?: Lark.Task
  }

  export interface RemoveTasklistRequest {
    /** 要移除的清单的全局唯一ID */
    tasklist_guid: string
  }

  export interface RemoveTasklistQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface RemoveTasklistResponse {
    /** 添加后的任务详情 */
    task?: Lark.Task
  }

  export interface AddRemindersRequest {
    /** 要添加的reminder的列表 */
    reminders: Lark.Reminder[]
  }

  export interface AddRemindersQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface AddRemindersResponse {
    /** 更新完成后的任务实体 */
    task?: Lark.Task
  }

  export interface RemoveRemindersRequest {
    /** 要移除的reminder的id列表 */
    reminder_ids: string[]
  }

  export interface RemoveRemindersQuery {
    /** 表示user的ID的类型，支持open_id, user_id, union_id */
    user_id_type?: string
  }

  export interface RemoveRemindersResponse {
    /** 移除提醒后的任务详情 */
    task?: Lark.Task
  }

  export interface AddDependenciesRequest {
    /** 要添加的依赖 */
    dependencies?: Lark.TaskDependency[]
  }

  export interface AddDependenciesResponse {
    /** 被添加后任务的所有依赖 */
    dependencies?: Lark.TaskDependency[]
  }

  export interface RemoveDependenciesRequest {
    /** 要移除的依赖 */
    dependencies: Lark.TaskDependency[]
  }

  export interface RemoveDependenciesResponse {
    /** 移除之后的任务GUID */
    dependencies?: Lark.TaskDependency[]
  }

  export interface BatchDeleteFollowerRequest {
    /** 要添加为关注人的user_id */
    id_list?: string[]
  }

  export interface BatchDeleteFollowerQuery {
    /** 此次调用中使用的用户ID的类型 */
    user_id_type?: 'user_id' | 'union_id' | 'open_id'
  }

  export interface BatchDeleteFollowerResponse {
    /** 实际删除的关注人用户ID列表 */
    followers?: string[]
  }

  export interface BatchDeleteCollaboratorRequest {
    /** 协作人的用户ID列表 */
    id_list?: string[]
  }

  export interface BatchDeleteCollaboratorQuery {
    /** 此次调用中使用的用户ID的类型 */
    user_id_type?: 'user_id' | 'union_id' | 'open_id'
  }

  export interface BatchDeleteCollaboratorResponse {
    /** 实际删除的执行人用户ID列表 */
    collaborators?: string[]
  }

  export namespace Subtask {
    export interface Methods {
      /**
       * 创建子任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/create
       */
      create(task_guid: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 获取任务的子任务列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/task-subtask/list
       */
      list(task_guid: string, query?: ListQuery): Paginated<Lark.Task>
    }

    export interface CreateRequest {
      /** 任务标题 */
      summary: string
      /** 任务描述 */
      description?: string
      /** 任务截止时间戳(ms)，截止时间戳和截止日期选择一个填写。 */
      due?: Lark.Due
      /** 任务关联的第三方平台来源信息 */
      origin?: Lark.Origin
      /** 调用者可以传入的任意附带到任务上的数据。在获取任务详情时会原样返回。 */
      extra?: string
      /** 任务的完成时刻时间戳(ms) */
      completed_at?: string
      /** 任务成员列表 */
      members?: Lark.Member[]
      /** 如果设置，则该任务为“重复任务”。该字段表示了重复任务的重复规则。 */
      repeat_rule?: string
      /** 如果设置，则将任务设计为“自定义完成”。用户在任务中心点击“完成”时，不会直接完成任务，而是跳转到第三方配置好的地址或者现实自定义提示。 */
      custom_complete?: Lark.CustomComplete
      /** 任务所在清单的信息 */
      tasklists?: Lark.TaskInTasklistInfo[]
      /** 幂等token，如果填写则触发幂等行为。 */
      client_token?: string
      /** 任务的开始时间(ms) */
      start?: Lark.Start
      /** 任务提醒 */
      reminders?: Lark.Reminder[]
      /** 任务完成模式, 1 - 会签任务; 2 - 或签任务 */
      mode?: number
      /** 是否是里程碑任务 */
      is_milestone?: boolean
      /** 自定义字段值 */
      custom_fields?: Lark.InputCustomFieldValue[]
      /** 任务的新版云文档来源 */
      docx_source?: Lark.DocxSource
    }

    export interface CreateQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface CreateResponse {
      /** 创建的任务 */
      subtask?: Lark.Task
    }

    export interface ListQuery extends Pagination {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }
  }

  export namespace Tasklist {
    export interface Methods {
      activitySubscription: ActivitySubscription.Methods
      /**
       * 创建清单
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 获取清单详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/get
       */
      get(tasklist_guid: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 更新清单
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/patch
       */
      patch(tasklist_guid: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 删除清单
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/delete
       */
      delete(tasklist_guid: string): Promise<void>
      /**
       * 添加清单成员
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/add_members
       */
      addMembers(tasklist_guid: string, body: AddMembersRequest, query?: AddMembersQuery): Promise<AddMembersResponse>
      /**
       * 移除清单成员
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/remove_members
       */
      removeMembers(tasklist_guid: string, body: RemoveMembersRequest, query?: RemoveMembersQuery): Promise<RemoveMembersResponse>
      /**
       * 获取清单任务列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/tasks
       */
      tasks(tasklist_guid: string, query?: TasksQuery): Paginated<Lark.TaskSummary>
      /**
       * 获取清单列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist/list
       */
      list(query?: ListQuery): Paginated<Lark.Tasklist>
    }

    export interface CreateRequest {
      /** 清单名称 */
      name: string
      /** 清单的成员列表 */
      members?: Lark.Member[]
    }

    export interface CreateQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface CreateResponse {
      /** 创建的清单数据 */
      tasklist?: Lark.Tasklist
    }

    export interface GetQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface GetResponse {
      /** 清单详情 */
      tasklist?: Lark.Tasklist
    }

    export interface PatchRequest {
      /** 要更新清单的数据 */
      tasklist: Lark.InputTasklist
      /** 要更新的字段名，只支持更新"owner", "name"两个字段 */
      update_fields: string[]
      /** 该字段表示如果更新了新的负责人，则将原负责人设为指定的协作人角色。仅在update_fields包含owner字段时生效。根据清单的角色设计方式，不允许提前为清单的负责人添加其他角色，但负责人更新后，原有负责人会无法访问该清单。该字段可以帮助避免原负责人彻底退出清单。 */
      origin_owner_to_role?: 'editor' | 'viewer' | 'none'
    }

    export interface PatchQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface PatchResponse {
      /** 修改后的任务清单 */
      tasklist?: Lark.Tasklist
    }

    export interface AddMembersRequest {
      /** 要添加的成员列表 */
      members: Lark.Member[]
    }

    export interface AddMembersQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface AddMembersResponse {
      /** 完成更新后的清单实体 */
      tasklist?: Lark.Tasklist
    }

    export interface RemoveMembersRequest {
      /** 要移除的member列表 */
      members: Lark.Member[]
    }

    export interface RemoveMembersQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface RemoveMembersResponse {
      /** 修改完成后的清单实体 */
      tasklist?: Lark.Tasklist
    }

    export interface TasksQuery extends Pagination {
      /** 只查看特定完成状态的任务，不填写表示不按完成状态过滤 */
      completed?: boolean
      /** 任务创建的起始时间戳（ms），闭区间，不填写默认为首个任务的创建时间戳 */
      created_from?: string
      /** 任务创建的结束时间戳（ms），闭区间，不填写默认为最后创建任务的创建时间戳 */
      created_to?: string
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface ListQuery extends Pagination {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export namespace ActivitySubscription {
      export interface Methods {
        /**
         * 创建动态订阅
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/create
         */
        create(tasklist_guid: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 获取动态订阅
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/get
         */
        get(tasklist_guid: string, activity_subscription_guid: string, query?: GetQuery): Promise<GetResponse>
        /**
         * 列取动态订阅
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/list
         */
        list(tasklist_guid: string, query?: ListQuery): Promise<ListResponse>
        /**
         * 更新动态订阅
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/patch
         */
        patch(tasklist_guid: string, activity_subscription_guid: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
        /**
         * 删除动态订阅
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/tasklist-activity_subscription/delete
         */
        delete(tasklist_guid: string, activity_subscription_guid: string): Promise<void>
      }

      export interface CreateRequest {
        /** 订阅名称 */
        name: string
        /** 订阅者列表 */
        subscribers: Lark.Member[]
        /** 订阅的事件key列表 */
        include_keys: number[]
        /** 该订阅是否为停用 */
        disabled?: boolean
      }

      export interface CreateQuery {
        /** 用户ID类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
      }

      export interface CreateResponse {
        /** 清单动态订阅 */
        activity_subscription?: Lark.TasklistActivitySubscription
      }

      export interface GetQuery {
        /** 用户ID类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
      }

      export interface GetResponse {
        /** 订阅详情 */
        activity_subscription?: Lark.TasklistActivitySubscription
      }

      export interface ListQuery {
        /** 返回结果的最大数量 */
        limit?: number
        /** 用户ID类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
      }

      export interface ListResponse {
        /** 清单的动态订阅数据 */
        items?: Lark.TasklistActivitySubscription[]
      }

      export interface PatchRequest {
        /** 要更新的订阅数据 */
        activity_subscription: Lark.TasklistActivitySubscription
        /** 要更新的字段 */
        update_fields: ('name' | 'include_keys' | 'subscribers' | 'disabled')[]
      }

      export interface PatchQuery {
        /** 用户ID类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
      }

      export interface PatchResponse {
        /** 更新后的订阅 */
        activity_subscription?: Lark.TasklistActivitySubscription
      }
    }
  }

  export namespace Comment {
    export interface Methods {
      /**
       * 创建评论
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 获取评论详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/get
       */
      get(comment_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 更新评论
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/patch
       */
      patch(comment_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 删除评论
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/delete
       */
      delete(comment_id: string): Promise<void>
      /**
       * 获取评论列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/comment/list
       */
      list(query?: ListQuery): Paginated<Lark.Comment>
      /**
       * 更新评论
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/update
       */
      update(task_id: string, comment_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
    }

    export interface CreateRequest {
      /** 评论内容 */
      content: string
      /** 回复给评论的id */
      reply_to_comment_id?: string
      /** 评论归属的资源类型 */
      resource_type?: string
      /** 评论归属的资源ID */
      resource_id?: string
    }

    export interface CreateQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface CreateResponse {
      /** 创建的评论详情 */
      comment?: Lark.Comment
    }

    export interface GetQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface GetResponse {
      /** 评论详情 */
      comment?: Lark.Comment
    }

    export interface PatchRequest {
      /** 要更新的评论数据，支持更新content, md_content */
      comment: Lark.InputComment
      /** 要更新的字段 */
      update_fields: string[]
    }

    export interface PatchQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface PatchResponse {
      /** 更新后的评论 */
      comment?: Lark.Comment
    }

    export interface ListQuery extends Pagination {
      /** 要获取评论列表的资源类型 */
      resource_type?: string
      /** 要获取评论的资源ID。例如要获取任务的评论列表，此处应该填写任务全局唯一ID */
      resource_id: string
      /** 返回数据的排序方式 */
      direction?: 'asc' | 'desc'
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface UpdateRequest {
      /** 新的评论内容 */
      content?: string
      /** 新的富文本评论内容（优先使用） */
      rich_content?: string
    }

    export interface UpdateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface UpdateResponse {
      /** 返回修改后的任务评论详情 */
      comment?: Lark.Comment
    }
  }

  export namespace Attachment {
    export interface Methods {
      /**
       * 上传附件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/upload
       */
      upload(form: UploadForm, query?: UploadQuery): Promise<UploadResponse>
      /**
       * 列取附件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/list
       */
      list(query?: ListQuery): Paginated<Lark.Attachment>
      /**
       * 获取附件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/get
       */
      get(attachment_guid: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 删除附件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/attachment/delete
       */
      delete(attachment_guid: string): Promise<void>
    }

    export interface UploadForm {
      /** 附件归属资源的类型 */
      resource_type?: string
      /** 附件要归属资源的id。例如，要给任务添加附件，这里要填入任务的全局唯一ID */
      resource_id: string
      /** 要上传的文件 */
      file: Blob
    }

    export interface UploadQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: 'open_id' | 'union_id' | 'user_id'
    }

    export interface UploadResponse {
      /** 上传的附件列表 */
      items?: Lark.Attachment[]
    }

    export interface ListQuery extends Pagination {
      /** 附件归属的资源类型 */
      resource_type?: string
      /** 附件归属资源的id，配合resource_type使用。例如希望获取任务的附件，需要设置 resource_type为task， resource_id为任务的全局唯一ID */
      resource_id: string
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface GetQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface GetResponse {
      /** 附件详情 */
      attachment?: Lark.Attachment
    }
  }

  export namespace Section {
    export interface Methods {
      /**
       * 创建自定义分组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 获取自定义分组详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/get
       */
      get(section_guid: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 更新自定义分组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/patch
       */
      patch(section_guid: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 删除自定义分组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/delete
       */
      delete(section_guid: string): Promise<void>
      /**
       * 获取自定义分组列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/list
       */
      list(query?: ListQuery): Paginated<Lark.SectionSummary>
      /**
       * 获取自定义分组任务列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/section/tasks
       */
      tasks(section_guid: string, query?: TasksQuery): Paginated<Lark.TaskSummary>
    }

    export interface CreateRequest {
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

    export interface CreateQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface CreateResponse {
      /** 创建的自定义分组数据 */
      section?: Lark.Section
    }

    export interface GetQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface GetResponse {
      /** 获取的自定义分组详情 */
      section?: Lark.Section
    }

    export interface PatchRequest {
      /** 要更新的自定义分组的数据，仅支持name, insert_after, insert_before */
      section: Lark.InputSection
      /** 要更新的字段名 */
      update_fields: string[]
    }

    export interface PatchQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface PatchResponse {
      /** 更新后的自定义分组 */
      section?: Lark.Section
    }

    export interface ListQuery extends Pagination {
      /** 自定义分组所属的资源类型。支持"my_tasks"(我负责的）和"tasklist"（清单）。当使用"tasklist"时，需要用resource_id提供清单GUID。 */
      resource_type: string
      /** 如`resource_type`为"tasklist"，这里需要填写要列取自定义分组的清单的GUID。 */
      resource_id?: string
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }

    export interface TasksQuery extends Pagination {
      /** 按照任务状态过滤，如果不填写则表示不按完成状态过滤 */
      completed?: boolean
      /** 按照创建时间筛选的起始时间戳（ms)，如不填写则为首个任务的创建时刻 */
      created_from?: string
      /** 按照创建时间筛选的起始时间戳（ms)，如不填写则为最后任务的创建时刻 */
      created_to?: string
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: string
    }
  }

  export namespace CustomField {
    export interface Methods {
      option: Option.Methods
      /**
       * 创建自定义字段
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 获取自定义字段
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/get
       */
      get(custom_field_guid: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 更新自定义字段
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/patch
       */
      patch(custom_field_guid: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 列取自定义字段
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/list
       */
      list(query?: ListQuery): Paginated<Lark.CustomField>
      /**
       * 将自定义字段加入资源
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/add
       */
      add(custom_field_guid: string, body: AddRequest): Promise<void>
      /**
       * 将自定义字段移出资源
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field/remove
       */
      remove(custom_field_guid: string, body: RemoveRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 自定义字段要归属的资源类型，支持"tasklist" */
      resource_type: string
      /** 自定义字段要归属的资源ID，可以填写清单的tasklist_guid */
      resource_id: string
      /** 字段名称 */
      name: string
      /** 自定义字段类型，支持"number", "datetime", "member", "single_select", "multi_select" */
      type: 'number' | 'datetime' | 'member' | 'single_select' | 'multi_select' | 'text'
      /** 数字类型的字段设置 */
      number_setting?: Lark.NumberSetting
      /** 人员类型的字段设置 */
      member_setting?: Lark.MemberSetting
      /** 时间日期类型的字段设置 */
      datetime_setting?: Lark.DatetimeSetting
      /** 单选设置 */
      single_select_setting?: Lark.SelectSetting
      /** 多选设置 */
      multi_select_setting?: Lark.SelectSetting
      /** 文本类型 */
      text_setting?: Lark.TextSetting
    }

    export interface CreateQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: 'open_id' | 'user_id' | 'union_id'
    }

    export interface CreateResponse {
      /** 创建的自定义字段 */
      custom_field?: Lark.CustomField
    }

    export interface GetQuery {
      /** 表示user的ID的类型，支持open_id, user_id, union_id */
      user_id_type?: 'open_id' | 'user_id' | 'union_id'
    }

    export interface GetResponse {
      /** 获取的自定义字段数据 */
      custom_field?: Lark.CustomField
    }

    export interface PatchRequest {
      /** 要修改的自定义字段数据 */
      custom_field?: Lark.InputCustomField
      /** 要修改的自定义字段类型，支持name, member_setting, number_setting, datetime_setting, single_select_setting, multi_select_setting */
      update_fields?: string[]
    }

    export interface PatchQuery {
      /** 用户ID格式 */
      user_id_type?: 'open_id' | 'union_id' | 'user_id'
    }

    export interface PatchResponse {
      /** 修改后的自定义字段设置 */
      custom_field?: Lark.CustomField
    }

    export interface ListQuery extends Pagination {
      /** 用户ID格式，支持open_id, user_id, union_id */
      user_id_type?: 'open_id' | 'user_id' | 'union_id'
      /** 资源类型，如提供表示仅查询特定资源下的自定义字段。目前只支持tasklist。 */
      resource_type?: string
      /** 要查询自定义字段的归属resource_id */
      resource_id?: string
    }

    export interface AddRequest {
      /** 要将自定义字段添加到一个资源的资源类型。目前只支持tasklist */
      resource_type: string
      /** 要将自定义字段添加到的资源id，目前只支持tasklist_guid */
      resource_id: string
    }

    export interface RemoveRequest {
      /** 要从某个资源移除自定义字段的资源类型，目前只支持清单"tasklist"。 */
      resource_type: string
      /** 要从某个资源移除自定义字段的资源id，`resource_type`为"tasklist"时，需填写清单的GUID */
      resource_id: string
    }

    export namespace Option {
      export interface Methods {
        /**
         * 创建自定义任务选项
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/create
         */
        create(custom_field_guid: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 更新自定义字段选项
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/task-v2/custom_field-option/patch
         */
        patch(custom_field_guid: string, option_guid: string, body: PatchRequest): Promise<PatchResponse>
      }

      export interface CreateRequest {
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

      export interface CreateResponse {
        /** 创建的选项 */
        option?: Lark.Option
      }

      export interface PatchRequest {
        /** 要更新的option数据 */
        option?: Lark.InputOption
        /** 要更新的字段名，支持name,color,is_hidden,insert_before,insert_after */
        update_fields?: string[]
      }

      export interface PatchResponse {
        /** 更新后的option数据 */
        option?: Lark.Option
      }
    }
  }

  export namespace Reminder {
    export interface Methods {
      /**
       * 新增提醒时间
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/create
       */
      create(task_id: string, body: CreateRequest): Promise<CreateResponse>
      /**
       * 删除提醒时间
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/delete
       */
      delete(task_id: string, reminder_id: string): Promise<void>
      /**
       * 查询提醒时间列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-reminder/list
       */
      list(task_id: string, query?: Pagination): Paginated<Lark.Reminder>
    }

    export interface CreateRequest {
      /** 相对于截止时间的提醒时间（如提前 30 分钟，截止时间后 30 分钟，则为 -30） */
      relative_fire_minute: number
    }

    export interface CreateResponse {
      /** 返回创建成功的提醒时间 */
      reminder?: Lark.Reminder
    }
  }

  export namespace Follower {
    export interface Methods {
      /**
       * 新增关注人
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/create
       */
      create(task_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除指定关注人
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/delete
       */
      delete(task_id: string, follower_id: string, query?: DeleteQuery): Promise<void>
      /**
       * 获取关注人列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-follower/list
       */
      list(task_id: string, query?: ListQuery): Paginated<Lark.Follower>
    }

    export interface CreateRequest {
      /** 任务关注者 ID */
      id?: string
      /** 要添加为关注人的user_id */
      id_list?: string[]
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** 创建后的任务关注者 */
      follower: Lark.Follower
    }

    export interface DeleteQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface ListQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }
  }

  export namespace Collaborator {
    export interface Methods {
      /**
       * 新增执行者
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/create
       */
      create(task_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除指定执行者
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/delete
       */
      delete(task_id: string, collaborator_id: string, query?: DeleteQuery): Promise<void>
      /**
       * 获取执行者列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-collaborator/list
       */
      list(task_id: string, query?: ListQuery): Paginated<Lark.Collaborator>
    }

    export interface CreateRequest {
      /** 任务协作者的 ID */
      id?: string
      /** 协作人的用户ID列表 */
      id_list?: string[]
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** 返回创建成功后的任务协作者 */
      collaborator: Lark.Collaborator
    }

    export interface DeleteQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface ListQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }
  }
}

Internal.define({
  '/task/v2/tasks': {
    POST: 'task.create',
    GET: { name: 'task.list', pagination: { argIndex: 0 } },
  },
  '/task/v2/tasks/{task_guid}': {
    PATCH: 'task.patch',
    GET: 'task.get',
    DELETE: 'task.delete',
  },
  '/task/v2/tasks/{task_guid}/add_members': {
    POST: 'task.addMembers',
  },
  '/task/v2/tasks/{task_guid}/remove_members': {
    POST: 'task.removeMembers',
  },
  '/task/v2/tasks/{task_guid}/tasklists': {
    GET: 'task.tasklists',
  },
  '/task/v2/tasks/{task_guid}/add_tasklist': {
    POST: 'task.addTasklist',
  },
  '/task/v2/tasks/{task_guid}/remove_tasklist': {
    POST: 'task.removeTasklist',
  },
  '/task/v2/tasks/{task_guid}/add_reminders': {
    POST: 'task.addReminders',
  },
  '/task/v2/tasks/{task_guid}/remove_reminders': {
    POST: 'task.removeReminders',
  },
  '/task/v2/tasks/{task_guid}/add_dependencies': {
    POST: 'task.addDependencies',
  },
  '/task/v2/tasks/{task_guid}/remove_dependencies': {
    POST: 'task.removeDependencies',
  },
  '/task/v2/tasks/{task_guid}/subtasks': {
    POST: 'task.subtask.create',
    GET: { name: 'task.subtask.list', pagination: { argIndex: 1 } },
  },
  '/task/v2/tasklists': {
    POST: 'task.tasklist.create',
    GET: { name: 'task.tasklist.list', pagination: { argIndex: 0 } },
  },
  '/task/v2/tasklists/{tasklist_guid}': {
    GET: 'task.tasklist.get',
    PATCH: 'task.tasklist.patch',
    DELETE: 'task.tasklist.delete',
  },
  '/task/v2/tasklists/{tasklist_guid}/add_members': {
    POST: 'task.tasklist.addMembers',
  },
  '/task/v2/tasklists/{tasklist_guid}/remove_members': {
    POST: 'task.tasklist.removeMembers',
  },
  '/task/v2/tasklists/{tasklist_guid}/tasks': {
    GET: { name: 'task.tasklist.tasks', pagination: { argIndex: 1 } },
  },
  '/task/v2/tasklists/{tasklist_guid}/activity_subscriptions': {
    POST: 'task.tasklist.activitySubscription.create',
    GET: 'task.tasklist.activitySubscription.list',
  },
  '/task/v2/tasklists/{tasklist_guid}/activity_subscriptions/{activity_subscription_guid}': {
    GET: 'task.tasklist.activitySubscription.get',
    PATCH: 'task.tasklist.activitySubscription.patch',
    DELETE: 'task.tasklist.activitySubscription.delete',
  },
  '/task/v2/comments': {
    POST: 'task.comment.create',
    GET: { name: 'task.comment.list', pagination: { argIndex: 0 } },
  },
  '/task/v2/comments/{comment_id}': {
    GET: 'task.comment.get',
    PATCH: 'task.comment.patch',
    DELETE: 'task.comment.delete',
  },
  '/task/v2/attachments/upload': {
    POST: { name: 'task.attachment.upload', multipart: true },
  },
  '/task/v2/attachments': {
    GET: { name: 'task.attachment.list', pagination: { argIndex: 0 } },
  },
  '/task/v2/attachments/{attachment_guid}': {
    GET: 'task.attachment.get',
    DELETE: 'task.attachment.delete',
  },
  '/task/v2/sections': {
    POST: 'task.section.create',
    GET: { name: 'task.section.list', pagination: { argIndex: 0 } },
  },
  '/task/v2/sections/{section_guid}': {
    GET: 'task.section.get',
    PATCH: 'task.section.patch',
    DELETE: 'task.section.delete',
  },
  '/task/v2/sections/{section_guid}/tasks': {
    GET: { name: 'task.section.tasks', pagination: { argIndex: 1 } },
  },
  '/task/v2/custom_fields': {
    POST: 'task.customField.create',
    GET: { name: 'task.customField.list', pagination: { argIndex: 0 } },
  },
  '/task/v2/custom_fields/{custom_field_guid}': {
    GET: 'task.customField.get',
    PATCH: 'task.customField.patch',
  },
  '/task/v2/custom_fields/{custom_field_guid}/add': {
    POST: 'task.customField.add',
  },
  '/task/v2/custom_fields/{custom_field_guid}/remove': {
    POST: 'task.customField.remove',
  },
  '/task/v2/custom_fields/{custom_field_guid}/options': {
    POST: 'task.customField.option.create',
  },
  '/task/v2/custom_fields/{custom_field_guid}/options/{option_guid}': {
    PATCH: 'task.customField.option.patch',
  },
  '/task/v1/tasks/{task_id}/complete': {
    POST: 'task.complete',
  },
  '/task/v1/tasks/{task_id}/uncomplete': {
    POST: 'task.uncomplete',
  },
  '/task/v1/tasks/{task_id}/reminders': {
    POST: 'task.reminder.create',
    GET: { name: 'task.reminder.list', pagination: { argIndex: 1 } },
  },
  '/task/v1/tasks/{task_id}/reminders/{reminder_id}': {
    DELETE: 'task.reminder.delete',
  },
  '/task/v1/tasks/{task_id}/comments/{comment_id}': {
    PUT: 'task.comment.update',
  },
  '/task/v1/tasks/{task_id}/followers': {
    POST: 'task.follower.create',
    GET: { name: 'task.follower.list', pagination: { argIndex: 1 } },
  },
  '/task/v1/tasks/{task_id}/followers/{follower_id}': {
    DELETE: 'task.follower.delete',
  },
  '/task/v1/tasks/{task_id}/batch_delete_follower': {
    POST: 'task.batchDeleteFollower',
  },
  '/task/v1/tasks/{task_id}/collaborators': {
    POST: 'task.collaborator.create',
    GET: { name: 'task.collaborator.list', pagination: { argIndex: 1 } },
  },
  '/task/v1/tasks/{task_id}/collaborators/{collaborator_id}': {
    DELETE: 'task.collaborator.delete',
  },
  '/task/v1/tasks/{task_id}/batch_delete_collaborator': {
    POST: 'task.batchDeleteCollaborator',
  },
})
