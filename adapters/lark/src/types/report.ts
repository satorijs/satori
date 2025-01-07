import { Rule, Task } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 查询规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule/query
     */
    queryReportRule(query?: QueryReportRuleQuery): Promise<QueryReportRuleResponse>
    /**
     * 移除规则看板
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule-view/remove
     */
    removeReportRuleView(rule_id: string, body: RemoveReportRuleViewRequest, query?: RemoveReportRuleViewQuery): Promise<void>
    /**
     * 查询任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/task/query
     */
    queryReportTask(body: QueryReportTaskRequest, query?: QueryReportTaskQuery): Paginated<Task>
  }
}

export interface QueryReportRuleQuery {
  /** 规则名称 */
  rule_name: string
  /** 是否包括已删除，默认未删除 */
  include_deleted?: 0 | 1
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface RemoveReportRuleViewRequest {
  /** 列表为空删除规则下全用户视图，列表不为空删除指定用户视图，大小限制200。 */
  user_ids?: string[]
}

export interface RemoveReportRuleViewQuery {
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface QueryReportTaskRequest {
  /** 提交开始时间时间戳 */
  commit_start_time: number
  /** 提交结束时间时间戳 */
  commit_end_time: number
  /** 汇报规则ID */
  rule_id?: string
  /** 用户ID */
  user_id?: string
  /** 分页标识符 */
  page_token: string
  /** 单次分页返回的条数 */
  page_size: number
}

export interface QueryReportTaskQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface QueryReportRuleResponse {
  /** 规则列表 */
  rules?: Rule[]
}

Internal.define({
  '/report/v1/rules/query': {
    GET: 'queryReportRule',
  },
  '/report/v1/rules/{rule_id}/views/remove': {
    POST: 'removeReportRuleView',
  },
  '/report/v1/tasks/query': {
    POST: 'queryReportTask',
  },
})
