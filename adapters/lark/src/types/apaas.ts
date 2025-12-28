import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    apaas: Apaas.Methods
  }
}

export namespace Apaas {
  export interface Methods {
    app: App.Methods
    seatAssignment: SeatAssignment.Methods
    seatActivity: SeatActivity.Methods
    application: Application.Methods
    userTask: UserTask.Methods
    approvalTask: ApprovalTask.Methods
    approvalInstance: ApprovalInstance.Methods
    workspace: Workspace.Methods
  }

  export namespace App {
    export interface Methods {
      /**
       * 查看应用基本信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/app/list
       */
      list(query?: Pagination): Paginated<Lark.App>
    }
  }

  export namespace SeatAssignment {
    export interface Methods {
      /**
       * 查询席位分配详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/seat_assignment/list
       */
      list(query?: ListQuery): Paginated<Lark.SeatAssignment>
    }

    export interface ListQuery extends Pagination {
      /** 席位类型，枚举值：1.平台席位 2. 应用访问席位 */
      seat_type: 'per_user' | 'per_user_per_app'
    }
  }

  export namespace SeatActivity {
    export interface Methods {
      /**
       * 查询席位活跃详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/seat_activity/list
       */
      list(query?: ListQuery): Paginated<Lark.SeatActivity>
    }

    export interface ListQuery extends Pagination {
      /** 席位类型，枚举值：1. 平台席位2. 应用席位 */
      seat_type: 'per_user' | 'per_user_per_app'
    }
  }

  export namespace Application {
    export interface Methods {
      auditLog: AuditLog.Methods
      recordPermission: RecordPermission.Methods
      role: Role.Methods
      object: Object.Methods
      function: Function.Methods
      environmentVariable: EnvironmentVariable.Methods
      flow: Flow.Methods
    }

    export namespace AuditLog {
      export interface Methods {
        /**
         * 查询审计日志列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/audit_log_list
         */
        auditLogList(namespace: string, query?: AuditLogListQuery): Promise<AuditLogListResponse>
        /**
         * 查询审计日志详情
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/get
         */
        get(namespace: string, query?: GetQuery): Promise<GetResponse>
        /**
         * 查询数据变更日志列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/data_change_logs_list
         */
        dataChangeLogsList(namespace: string, query?: DataChangeLogsListQuery): Promise<DataChangeLogsListResponse>
        /**
         * 查询数据变更日志详情
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-audit_log/data_change_log_detail
         */
        dataChangeLogDetail(namespace: string, query?: DataChangeLogDetailQuery): Promise<DataChangeLogDetailResponse>
      }

      export interface AuditLogListQuery {
        /** 分页大小 */
        page_size: string
        /** 翻页数量 */
        offset: string
        /** 模糊查询 */
        quick_query?: string
        /** 查询时间范围：开始时间 */
        from: string
        /** 查询时间范围：结束时间 */
        to: string
        /** 日志类型：10001-企业管理日志，10003-应用管理日志，10002-登录日志 */
        log_type: string
        /** 日志查询：筛选能力 */
        filter?: string
        /** 日志列表：选择展示行信息，例如["opTime","appName","eventName","clientIP","operator","status"] */
        columns?: string[]
        /** 查询排序字段：可选项为操作时间（opTime） */
        sort_by?: string
        /** 查询排序：按时间从小到大使用 asc */
        sort_order?: string
        /** 应用类型，0为apaas类型，1为aily类型 */
        app_type?: string
      }

      export interface AuditLogListResponse {
        /** 审计日志查询结果列表详情信息 */
        items?: Lark.AuditLogEsField[]
        /** 审计日志查询总条数 */
        total?: string
      }

      export interface GetQuery {
        /** 审计日志ID信息 */
        log_id: string
      }

      export interface GetResponse {
        /** 审计日志详情信息 */
        data?: Lark.AuditLogDetail
      }

      export interface DataChangeLogsListQuery {
        /** 模糊查询 */
        quick_query?: string
        /** 分页大小 */
        page_size: string
        /** 翻页数量 */
        offset: string
        /** 查询时间范围：开始时间 */
        from?: string
        /** 查询时间范围：结束时间 */
        to?: string
        /** 日志类型：10007-数据变更日志 */
        log_type: string
        /** 日志查询：筛选能力 */
        filter?: string
        /** 日志列表：选择展示行信息，例如["opTime","appName","eventName","clientIP","operator","status"] */
        columns?: string[]
        /** 查询排序字段：可选项为操作时间（opTime） */
        sort_by?: string
        /** 查询排序：按时间从小到大使用 asc */
        sort_order?: string
        /** 应用类型，0为apaas类型，1为aily类型 */
        app_type?: string
      }

      export interface DataChangeLogsListResponse {
        /** 数据变更日志查询结果列表详情信息 */
        items?: Lark.AuditLogEsField[]
        /** 数据变更日志查询总条数 */
        total?: string
      }

      export interface DataChangeLogDetailQuery {
        /** 数据变更日志ID信息 */
        log_id: string
      }

      export interface DataChangeLogDetailResponse {
        /** 数据变更日志详情信息 */
        data?: Lark.AuditLogDetail
      }
    }

    export namespace RecordPermission {
      export interface Methods {
        member: Member.Methods
      }

      export namespace Member {
        export interface Methods {
          /**
           * 批量删除记录权限用户授权
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-record_permission-member/batch_remove_authorization
           */
          batchRemoveAuthorization(namespace: string, record_permission_api_name: string, body: BatchRemoveAuthorizationRequest): Promise<void>
          /**
           * 批量创建记录权限用户授权
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-record_permission-member/batch_create_authorization
           */
          batchCreateAuthorization(namespace: string, record_permission_api_name: string, body: BatchCreateAuthorizationRequest): Promise<void>
        }

        export interface BatchRemoveAuthorizationRequest {
          /** 需要删除的用户 ID 列表 */
          user_ids?: string[]
        }

        export interface BatchCreateAuthorizationRequest {
          /** 需要新增的用户 ID 列表 */
          user_ids?: string[]
        }
      }
    }

    export namespace Role {
      export interface Methods {
        member: Member.Methods
      }

      export namespace Member {
        export interface Methods {
          /**
           * 批量删除角色成员授权
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/batch_remove_authorization
           */
          batchRemoveAuthorization(namespace: string, role_api_name: string, body: BatchRemoveAuthorizationRequest): Promise<void>
          /**
           * 批量创建角色成员授权
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/batch_create_authorization
           */
          batchCreateAuthorization(namespace: string, role_api_name: string, body: BatchCreateAuthorizationRequest): Promise<void>
          /**
           * 查询角色成员信息
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-role-member/get
           */
          get(namespace: string, role_api_name: string, query?: GetQuery): Promise<GetResponse>
        }

        export interface BatchRemoveAuthorizationRequest {
          /** 需要删除的用户 ID 列表 */
          user_ids?: string[]
          /** 需要删除的部门 ID 列表 */
          department_ids?: string[]
        }

        export interface BatchCreateAuthorizationRequest {
          /** 需要新增的用户 ID 列表 */
          user_ids?: string[]
          /** 需要新增的部门 ID 列表 */
          department_ids?: string[]
        }

        export interface GetQuery {
          /** 是否需要公式的展示名称，便于前端展示 */
          need_display_name?: boolean
          /** 是否使用 APIID字段作为出入参，默认值为 false */
          use_api_id?: boolean
        }

        export interface GetResponse {
          /** 角色成员 */
          role_member?: Lark.RoleMember
        }
      }
    }

    export namespace Object {
      export interface Methods {
        record: Record.Methods
        /**
         * 执行 OQL
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object/oql_query
         */
        oqlQuery(namespace: string, body: OqlQueryRequest): Promise<OqlQueryResponse>
        /**
         * 搜索记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object/search
         */
        search(namespace: string, body: SearchRequest): Promise<SearchResponse>
      }

      export interface OqlQueryRequest {
        /** 待执行的 OQL 语句（关于支持的关键词及操作符，详见查看） */
        query: string
        /** 用于指定 OQL 语句中匿名参数的具体值 */
        args?: string
        /** 用于指定 OQL 语句中具名参数的具体值 */
        named_args?: string
      }

      export interface OqlQueryResponse {
        /** 每一列的标题 */
        columns: string[]
        /** 每一行的值，以「key-value」的形式返回 */
        rows: string
      }

      export interface SearchRequest {
        /** 搜索词 */
        q?: string
        /** 搜索对象范围 */
        search_objects?: Lark.SearchObjectParam[]
        /** 分页参数，第一次搜索时为空，需要分页查询时使用 SearchRecordsResponse 中的结果 */
        page_token?: string
        /** 返回数量，默认为50，最大不超过2000 */
        page_size?: string
        /** 返回元数据枚举值 */
        metadata?: 'Label' | 'SearchLayout'
      }

      export interface SearchResponse {
        /** 搜索结果列表 */
        records?: string
        /** 是否还有更多数据 */
        has_more?: boolean
        /** 分页标记，当 HasMore 为 true 时，会同时返回新的 NextPageToken */
        next_page_token?: string
        /** 对象信息 */
        objects?: Lark.ObjectMeta[]
      }

      export namespace Record {
        export interface Methods {
          /**
           * 获取记录详情
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/query
           */
          query(namespace: string, object_api_name: string, id: string, body: QueryRequest): Promise<QueryResponse>
          /**
           * 编辑记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/patch
           */
          patch(namespace: string, object_api_name: string, id: string, body: PatchRequest): Promise<void>
          /**
           * 删除记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/delete
           */
          delete(namespace: string, object_api_name: string, id: string): Promise<void>
          /**
           * 新建记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/create
           */
          create(namespace: string, object_api_name: string, body: CreateRequest): Promise<CreateResponse>
          /**
           * 批量编辑记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_update
           */
          batchUpdate(namespace: string, object_api_name: string, body: BatchUpdateRequest): Promise<BatchUpdateResponse>
          /**
           * 查询记录列表
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_query
           */
          batchQuery(namespace: string, object_api_name: string, body: BatchQueryRequest): Promise<BatchQueryResponse>
          /**
           * 批量删除记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_delete
           */
          batchDelete(namespace: string, object_api_name: string, body: BatchDeleteRequest): Promise<BatchDeleteResponse>
          /**
           * 批量新建记录
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-object-record/batch_create
           */
          batchCreate(namespace: string, object_api_name: string, body: BatchCreateRequest): Promise<BatchCreateResponse>
        }

        export interface QueryRequest {
          /** 需要获取的字段，使用字段唯一标识符进行查询，关联字段可使用 . 进行下钻 */
          select?: string[]
        }

        export interface QueryResponse {
          /** 记录详情,格式为 Map<string, ANY> */
          item: string
        }

        export interface PatchRequest {
          /** 创建对象使用的数据，键为字段 API 名称，值为字段值，格式可参考字段值格式 */
          record: string
        }

        export interface CreateRequest {
          /** 创建对象使用的数据，键为字段 API 名称，值为字段值，格式可参考字段值格式 */
          record: string
        }

        export interface CreateResponse {
          /** 记录 ID */
          id?: string
        }

        export interface BatchUpdateRequest {
          /** 记录详情列表，格式为 List<Map<string, ANY>>，操作记录数上限为 500 条 */
          records: string
        }

        export interface BatchUpdateResponse {
          /** 处理结果 */
          items?: Lark.RecordResult[]
        }

        export interface BatchQueryRequest {
          /** 需要获取的字段，使用字段唯一标识符进行查询，关联字段可使用「.」进行下钻 */
          select: string[]
          /** 筛选条件，通过 JSON 格式指定条件 */
          filter?: Lark.Criterion
          /** 排序参数，通过 JSON 格式指定条件。其中， field 为参与排序字段，direction 为排序方向，多个条件按其在数组中的顺序生效。 */
          order_by?: Lark.Sort[]
          /** 聚合参数，通过 JSON 格式指定条件。其中， field 为参与聚合的字段。 */
          group_by?: Lark.RecordGroupByItem[]
          /** 分页的 Token 值，由服务端生成，可从 Response 中的 next_page_token 参数中获取。注意：第一页需填写空字符串 ""，且不能与 OFFSET 一起使用。 */
          page_token?: string
          /** 是否使用 page_token 功能。为 True 时将使用 page_token 的值作为起始位置查询记录，并且会在 Response 中返回 next_page_token 。默认为 False 。 */
          use_page_token?: boolean
          /** 期望服务端返回的记录条数，上限 500 条。不填则取默认值，默认值为 500。 */
          page_size?: number
          /** 返回记录的偏移量，默认为 0 ，即从查询到的第一条记录开始返回。offset 较大时查询性能较差，可能引起接口响应超时，拉取全部记录时建议使用 ID 游标分页，具体见 ID 游标分页说明 */
          offset?: number
          /** 是否返回符合条件的记录总数（Total）。默认为 False，不返回记录总数。 */
          need_total_count?: boolean
        }

        export interface BatchQueryResponse {
          /** 符合条件的记录列表 */
          items: string
          /** 符合条件的记录数 */
          total?: number
          /** 下一页的起始位置 Token ，访问至末尾时不返回 */
          next_page_token?: string
          /** 是否还有数据 */
          has_more?: boolean
        }

        export interface BatchDeleteRequest {
          /** 记录 ID 列表，操作记录数上限为 500 */
          ids: string[]
        }

        export interface BatchDeleteResponse {
          /** 处理结果 */
          items?: Lark.RecordResult[]
        }

        export interface BatchCreateRequest {
          /** 记录详情列表，格式为 List<Map<string, ANY>>，操作记录数上限为 500 条 */
          records: string
        }

        export interface BatchCreateResponse {
          /** 处理结果 */
          items?: Lark.RecordResult[]
        }
      }
    }

    export namespace Function {
      export interface Methods {
        /**
         * 执行函数
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-function/invoke
         */
        invoke(namespace: string, function_api_name: string, body: InvokeRequest): Promise<InvokeResponse>
      }

      export interface InvokeRequest {
        /** 函数输入参数（JSON 序列化后的字符串） */
        params?: string
      }

      export interface InvokeResponse {
        /** 函数执行的返回结果（JSON 序列化后的字符串） */
        result?: string
      }
    }

    export namespace EnvironmentVariable {
      export interface Methods {
        /**
         * 查询环境变量列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-environment_variable/query
         */
        query(namespace: string, body: QueryRequest): Promise<QueryResponse>
        /**
         * 查询环境变量详情
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-environment_variable/get
         */
        get(namespace: string, environment_variable_api_name: string): Promise<GetResponse>
      }

      export interface QueryRequest {
        /** 过滤条件 */
        filter?: Lark.EnvironmentVariableFilter
        /** 限制的条数，默认为 500，不可超过 500 */
        limit?: number
        /** 返回记录的偏移量，默认为 0，即从查询到的第一个记录开始返回 */
        offset?: number
      }

      export interface QueryResponse {
        /** 环境变量列表 */
        items?: Lark.EnvironmentVariable[]
        /** 符合查询条件的环境变量的总数 */
        total: number
      }

      export interface GetResponse {
        /** 环境变量详情 */
        item?: Lark.EnvironmentVariable
      }
    }

    export namespace Flow {
      export interface Methods {
        /**
         * 发起流程
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/application-flow/execute
         */
        execute(namespace: string, flow_id: string, body: ExecuteRequest): Promise<ExecuteResponse>
      }

      export interface ExecuteRequest {
        /** 是否异步执行 */
        is_async?: boolean
        /** 幂等信息 */
        idempotent_key?: string
        /** 循环信息 */
        loop_masks?: string[]
        /** 流程入参 */
        params?: string
        /** 操作人 */
        operator: string
      }

      export interface ExecuteResponse {
        /** 状态 */
        status?: string
        /** 输出参数 */
        out_params?: string
        /** 执行id */
        execution_id?: string
        /** 错误信息 */
        error_msg?: string
        /** code */
        code?: string
      }
    }
  }

  export namespace UserTask {
    export interface Methods {
      /**
       * 查询人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/query
       */
      query(body: QueryRequest): Promise<QueryResponse>
      /**
       * 抄送人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/cc
       */
      cc(task_id: string, body: CcRequest): Promise<void>
      /**
       * 催办人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/expediting
       */
      expediting(task_id: string, body: ExpeditingRequest): Promise<void>
      /**
       * 查询人工任务可退回的位置
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/rollback_points
       */
      rollbackPoints(task_id: string, body: RollbackPointsRequest): Promise<RollbackPointsResponse>
      /**
       * 退回人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/rollback
       */
      rollback(task_id: string, body: RollbackRequest): Promise<void>
      /**
       * 基于人工任务发起群聊
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/user_task/chat_group
       */
      chatGroup(task_id: string, body: ChatGroupRequest): Promise<ChatGroupResponse>
    }

    export interface QueryRequest {
      /** 类型 */
      type?: string
      /** 来源 */
      source?: string
      /** 获取条数 */
      limit?: string
      /** 起始位置 */
      offset?: string
      /** 开始时间 */
      start_time?: string
      /** 结束时间 */
      end_time?: string
      /** 流程apiid列表 */
      api_ids?: string[]
      /** kunlunUserID */
      kunlun_user_id: string
    }

    export interface QueryResponse {
      /** 总任务条数 */
      count?: string
      /** 任务信息 */
      tasks?: Lark.UserTask[]
    }

    export interface CcRequest {
      /** 抄送人的kunlunID列表 */
      cc_user_ids: string[]
      /** 操作人kunlunUserID */
      operator_user_id: string
    }

    export interface ExpeditingRequest {
      /** 操作人kunlunUserID */
      operator_user_id: string
      /** 催办人的kunlunID列表 */
      expediting_user_ids: string[]
      /** 催办理由 */
      opinion?: string
    }

    export interface RollbackPointsRequest {
      /** 操作人kunlunUserID */
      operator_user_id: string
    }

    export interface RollbackPointsResponse {
      /** 任务列表 */
      tasks?: Lark.AllowedRollbaclkTaskItemType[]
    }

    export interface RollbackRequest {
      /** 操作人kunlunUserID */
      operator_user_id: string
      /** 退回到的任务ID */
      to_task_id: string
      /** 退回原因 */
      opinion: string
    }

    export interface ChatGroupRequest {
      /** 操作人kunlunUserID */
      operator_user_id: string
      /** 要邀请进群用户ID列表 */
      invite_user_ids?: string[]
      /** 要拉入的群ID，为空则新建群 */
      chat_id?: string
      /** 要加入的群名称，当chat_id为空时用该名称创建群聊 */
      chat_name?: string
    }

    export interface ChatGroupResponse {
      /** 创建的群聊ID */
      chat_id?: string
    }
  }

  export namespace ApprovalTask {
    export interface Methods {
      /**
       * 同意人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/agree
       */
      agree(approval_task_id: string, body: AgreeRequest): Promise<void>
      /**
       * 拒绝人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/reject
       */
      reject(approval_task_id: string, body: RejectRequest): Promise<void>
      /**
       * 转交人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/transfer
       */
      transfer(approval_task_id: string, body: TransferRequest): Promise<void>
      /**
       * 人工任务加签
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_task/add_assignee
       */
      addAssignee(approval_task_id: string, body: AddAssigneeRequest): Promise<void>
    }

    export interface AgreeRequest {
      /** 操作人id */
      user_id: string
      /** 审批意见 */
      opinion?: string
    }

    export interface RejectRequest {
      /** 操作用户id */
      user_id: string
      /** 审批意见 */
      opinion?: string
    }

    export interface TransferRequest {
      /** 操作人id */
      user_id: string
      /** 原审批人id */
      from_user_ids?: string[]
      /** 新审批人id */
      to_user_ids?: string[]
      /** 审批意见 */
      opinion?: string
    }

    export interface AddAssigneeRequest {
      /** 操作人id */
      user_id: string
      /** 审批人列表 */
      approvers?: string[]
      /** 加签类型 */
      add_assignee_type?: string
      /** 加签原因 */
      opinion?: string
    }
  }

  export namespace ApprovalInstance {
    export interface Methods {
      /**
       * 撤销人工任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/approval_instance/cancel
       */
      cancel(approval_instance_id: string, body: CancelRequest): Promise<void>
    }

    export interface CancelRequest {
      /** 操作用户id */
      user_id: string
      /** 撤销原因 */
      opinion: string
    }
  }

  export namespace Workspace {
    export interface Methods {
      table: Table.Methods
      view: View.Methods
      /**
       * 执行SQL
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/workspace/sql_commands
       */
      sqlCommands(workspace_id: string, body: SqlCommandsRequest): Promise<SqlCommandsResponse>
    }

    export interface SqlCommandsRequest {
      /** 要执行的 SQL 语句 */
      sql: string
    }

    export interface SqlCommandsResponse {
      /** 如果是 SELECT 命令，返回的是查询结果的 JSON 序列化字符串。如果是其他无返回的命令，如 DELETE 等，result 为空。 */
      result: string
    }

    export namespace Table {
      export interface Methods {
        /**
         * 查询数据表数据记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/workspace-table/records_get
         */
        recordsGet(workspace_id: string, table_name: string, query?: RecordsGetQuery): Promise<RecordsGetResponse>
        /**
         * 向数据表中添加或更新记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/workspace-table/records_post
         */
        recordsPost(workspace_id: string, table_name: string, body: RecordsPostRequest, query?: RecordsPostQuery): Promise<RecordsPostResponse>
        /**
         * 按条件更新数据表中的记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/workspace-table/records_patch
         */
        recordsPatch(workspace_id: string, table_name: string, body: RecordsPatchRequest, query?: RecordsPatchQuery): Promise<RecordsPatchResponse>
        /**
         * 批量更新数据表中的记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/workspace-table/records_batch_update
         */
        recordsBatchUpdate(workspace_id: string, table_name: string, body: RecordsBatchUpdateRequest): Promise<RecordsBatchUpdateResponse>
        /**
         * 删除数据表中的记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/workspace-table/records_delete
         */
        recordsDelete(workspace_id: string, table_name: string, query?: RecordsDeleteQuery): Promise<void>
      }

      export interface RecordsGetQuery extends Pagination {
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
      }

      export interface RecordsGetResponse {
        /** 是否还有更多项 */
        has_more: boolean
        /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
        page_token: string
        /** 符合条件的记录总数 */
        total: number
        /** 数据记录列表，格式为数组序列化后的 JSONString */
        items: string
      }

      export interface RecordsPostRequest {
        /** 要插入的数据记录列表，单次支持最多 500 条 */
        records: string
      }

      export interface RecordsPostQuery {
        /** UPSERT 时使用，指定列，多列英文逗号拼接 */
        columns?: string
        /**
         * UPSERT 时使用，指定使用哪一个或多个具有唯一约束的字段作为冲突判断依据，默认为表主键。
         * 假设 user_products 表有一个由 user_id 和 product_id 组成的复合唯一约束。
         */
        on_conflict?: string
      }

      export interface RecordsPostResponse {
        /** 按照记录顺序创建或更新的记录 ID 列表 */
        record_ids: Lark.Uuid[]
      }

      export interface RecordsPatchRequest {
        /** 要更新的数据记录信息 */
        record: string
      }

      export interface RecordsPatchQuery {
        /** 筛选条件，尊许 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#horizontal-filtering */
        filter: string
      }

      export interface RecordsPatchResponse {
        /** 更新的记录唯一ID列表 */
        record_ids: Lark.Uuid[]
      }

      export interface RecordsBatchUpdateRequest {
        /** 要更新的数据记录列表，单次支持最多 500条，每行 record 都必须包含主键 _id，且不同行要更新的字段需保持一致 */
        records: string
      }

      export interface RecordsBatchUpdateResponse {
        /** 更新的记录唯一ID列表 */
        record_ids: Lark.Uuid[]
      }

      export interface RecordsDeleteQuery {
        /**
         * 筛选条件，尊许 PostgREST 语法，详情可查看 https://docs.postgrest.org/en/v13/references/api/tables_views.html#horizontal-filtering
         * 此处用法和查询数据记录一致
         */
        filter: string
      }
    }

    export namespace View {
      export interface Methods {
        /**
         * 查询视图数据记录
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/apaas-v1/workspace-view/views_get
         */
        viewsGet(workspace_id: string, view_name: string, query?: ViewsGetQuery): Promise<ViewsGetResponse>
      }

      export interface ViewsGetQuery extends Pagination {
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
      }

      export interface ViewsGetResponse {
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
  }
}

Internal.define({
  '/apaas/v1/apps': {
    GET: { name: 'apaas.app.list', pagination: { argIndex: 0 } },
  },
  '/apaas/v1/seat_assignments': {
    GET: { name: 'apaas.seatAssignment.list', pagination: { argIndex: 0 } },
  },
  '/apaas/v1/seat_activities': {
    GET: { name: 'apaas.seatActivity.list', pagination: { argIndex: 0 } },
  },
  '/apaas/v1/applications/{namespace}/audit_log/audit_log_list': {
    GET: 'apaas.application.auditLog.auditLogList',
  },
  '/apaas/v1/applications/{namespace}/audit_log': {
    GET: 'apaas.application.auditLog.get',
  },
  '/apaas/v1/applications/{namespace}/audit_log/data_change_logs_list': {
    GET: 'apaas.application.auditLog.dataChangeLogsList',
  },
  '/apaas/v1/applications/{namespace}/audit_log/data_change_log_detail': {
    GET: 'apaas.application.auditLog.dataChangeLogDetail',
  },
  '/apaas/v1/applications/{namespace}/record_permissions/{record_permission_api_name}/member/batch_remove_authorization': {
    POST: 'apaas.application.recordPermission.member.batchRemoveAuthorization',
  },
  '/apaas/v1/applications/{namespace}/record_permissions/{record_permission_api_name}/member/batch_create_authorization': {
    POST: 'apaas.application.recordPermission.member.batchCreateAuthorization',
  },
  '/apaas/v1/applications/{namespace}/roles/{role_api_name}/member/batch_remove_authorization': {
    POST: 'apaas.application.role.member.batchRemoveAuthorization',
  },
  '/apaas/v1/applications/{namespace}/roles/{role_api_name}/member/batch_create_authorization': {
    POST: 'apaas.application.role.member.batchCreateAuthorization',
  },
  '/apaas/v1/applications/{namespace}/roles/{role_api_name}/member': {
    GET: 'apaas.application.role.member.get',
  },
  '/apaas/v1/applications/{namespace}/objects/oql_query': {
    POST: 'apaas.application.object.oqlQuery',
  },
  '/apaas/v1/applications/{namespace}/objects/search': {
    POST: 'apaas.application.object.search',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/{id}/query': {
    POST: 'apaas.application.object.record.query',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/{id}': {
    PATCH: 'apaas.application.object.record.patch',
    DELETE: 'apaas.application.object.record.delete',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records': {
    POST: 'apaas.application.object.record.create',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_update': {
    PATCH: 'apaas.application.object.record.batchUpdate',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_query': {
    POST: 'apaas.application.object.record.batchQuery',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_delete': {
    DELETE: 'apaas.application.object.record.batchDelete',
  },
  '/apaas/v1/applications/{namespace}/objects/{object_api_name}/records/batch_create': {
    POST: 'apaas.application.object.record.batchCreate',
  },
  '/apaas/v1/applications/{namespace}/functions/{function_api_name}/invoke': {
    POST: 'apaas.application.function.invoke',
  },
  '/apaas/v1/applications/{namespace}/environment_variables/query': {
    POST: 'apaas.application.environmentVariable.query',
  },
  '/apaas/v1/applications/{namespace}/environment_variables/{environment_variable_api_name}': {
    GET: 'apaas.application.environmentVariable.get',
  },
  '/apaas/v1/applications/{namespace}/flows/{flow_id}/execute': {
    POST: 'apaas.application.flow.execute',
  },
  '/apaas/v1/user_task/query': {
    POST: 'apaas.userTask.query',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/agree': {
    POST: 'apaas.approvalTask.agree',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/reject': {
    POST: 'apaas.approvalTask.reject',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/transfer': {
    POST: 'apaas.approvalTask.transfer',
  },
  '/apaas/v1/approval_tasks/{approval_task_id}/add_assignee': {
    POST: 'apaas.approvalTask.addAssignee',
  },
  '/apaas/v1/user_tasks/{task_id}/cc': {
    POST: 'apaas.userTask.cc',
  },
  '/apaas/v1/user_tasks/{task_id}/expediting': {
    POST: 'apaas.userTask.expediting',
  },
  '/apaas/v1/approval_instances/{approval_instance_id}/cancel': {
    POST: 'apaas.approvalInstance.cancel',
  },
  '/apaas/v1/user_tasks/{task_id}/rollback_points': {
    POST: 'apaas.userTask.rollbackPoints',
  },
  '/apaas/v1/user_tasks/{task_id}/rollback': {
    POST: 'apaas.userTask.rollback',
  },
  '/apaas/v1/user_tasks/{task_id}/chat_group': {
    POST: 'apaas.userTask.chatGroup',
  },
  '/apaas/v1/workspaces/{workspace_id}/tables/{table_name}/records': {
    GET: 'apaas.workspace.table.recordsGet',
    POST: 'apaas.workspace.table.recordsPost',
    PATCH: 'apaas.workspace.table.recordsPatch',
    DELETE: 'apaas.workspace.table.recordsDelete',
  },
  '/apaas/v1/workspaces/{workspace_id}/tables/{table_name}/records_batch_update': {
    PATCH: 'apaas.workspace.table.recordsBatchUpdate',
  },
  '/apaas/v1/workspaces/{workspace_id}/views/{view_name}/records': {
    GET: 'apaas.workspace.view.viewsGet',
  },
  '/apaas/v1/workspaces/{workspace_id}/sql_commands': {
    POST: 'apaas.workspace.sqlCommands',
  },
})
