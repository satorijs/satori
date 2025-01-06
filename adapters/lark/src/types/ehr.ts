import { Internal } from '../internal'
import { Employee } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 批量获取员工花名册信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list
     */
    listEhrEmployee(query?: ListEhrEmployeeQuery): Promise<ListEhrEmployeeResponse>
    /**
     * 下载人员的附件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/attachment/get
     */
    getEhrAttachment(token: string): Promise<ArrayBuffer>
  }
}

export interface ListEhrEmployeeQuery {
  /** 返回数据类型 */
  view?: 'basic' | 'full'
  /** 员工状态，不传代表查询所有员工状态实际在职 = 2&4可同时查询多个状态的记录，如 status=2&status=4 */
  status?: 1 | 2 | 3 | 4 | 5[]
  /** 雇员类型，不传代表查询所有雇员类型 */
  type?: 1 | 2 | 3 | 4 | 5[]
  /** 查询开始时间（创建时间 &gt;= 此时间） */
  start_time?: string
  /** 查询结束时间（创建时间 &lt;= 此时间） */
  end_time?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** user_id、open_id 或 union_id，默认为 open_id。如果传入的值不是 open_id，需要一并传入 user_id_type 参数。可一次查询多个 id 的用户，例如：user_ids=ou_8ebd4f35d7101ffdeb4771d7c8ec517e&user_ids=ou_7abc4f35d7101ffdeb4771dabcde[用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  user_ids?: string[]
  /** 分页标记，第一次请求可以不填，表示从头开始遍历；分页查询返回结果has_more 为 true 时会同时返回新的 page_token, 下次遍历可使用该返回的 page_token 获取更多信息。 */
  page_token?: string
  /** 分页大小，取值范围 1~100，默认 10 */
  page_size?: number
}

export interface ListEhrEmployeeResponse {
  items?: Employee[]
  /** 下次请求需要带上的分页标记 */
  page_token?: string
  /** 是否有下一页数据 */
  has_more?: boolean
}

Internal.define({
  '/open-apis/ehr/v1/employees': {
    GET: 'listEhrEmployee',
  },
  '/open-apis/ehr/v1/attachments/{token}': {
    GET: { name: 'getEhrAttachment', type: 'binary' },
  },
})
