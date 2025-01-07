import { Employee } from '.'
import { Internal, Paginated } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 批量获取员工花名册信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list
     */
    listEhrEmployee(query?: ListEhrEmployeeQuery & Pagination): Promise<Paginated<Employee>>
    /**
     * 批量获取员工花名册信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/ehr/ehr-v1/employee/list
     */
    listEhrEmployeeIter(query?: ListEhrEmployeeQuery): AsyncIterator<Employee>
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
  status?: (1 | 2 | 3 | 4 | 5)[]
  /** 雇员类型，不传代表查询所有雇员类型 */
  type?: (1 | 2 | 3 | 4 | 5)[]
  /** 查询开始时间（创建时间 &gt;= 此时间） */
  start_time?: string
  /** 查询结束时间（创建时间 &lt;= 此时间） */
  end_time?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** user_id、open_id 或 union_id，默认为 open_id。如果传入的值不是 open_id，需要一并传入 user_id_type 参数。可一次查询多个 id 的用户，例如：user_ids=ou_8ebd4f35d7101ffdeb4771d7c8ec517e&user_ids=ou_7abc4f35d7101ffdeb4771dabcde[用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  user_ids?: string[]
}

Internal.define({
  '/ehr/v1/employees': {
    GET: { name: 'listEhrEmployee', pagination: { argIndex: 0 } },
  },
  '/ehr/v1/attachments/{token}': {
    GET: { name: 'getEhrAttachment', type: 'binary' },
  },
})
