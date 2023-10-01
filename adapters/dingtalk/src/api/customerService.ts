import { Internal } from '../internal'
// GENERATED CONTENT

export interface ExecuteActivityParams {
  /** 会员来源，取diamond配置的值。 */
  sourceId: string
  /** 会员ID。 */
  foreignId: string
  /** 会员名称。 */
  foreignName: string
  /** 动作编码。 */
  activityCode: string
  /** 实例ID。 */
  openInstanceId?: string
  /** 智能客服产品类型： */
  productionType?: number
  /** 工单表单。 */
  properties?: object[]
}

export interface ExecuteActivityResponse {
  taskId?: string
}

export interface PageListActionQuery {
  /** 实例ID。 */
  openInstanceId?: string
  /** 智能客服产品类型： */
  productionType?: number
  /** 查询数据的起始位置，0表示从头开始。 */
  nextToken: string
  /** 查询单页查询的最大条目数，最大值为100。 */
  maxResults: number
}

export interface PageListActionResponse {
  nextCursor?: number
  total?: number
  list?: {
    operatorId?: string
    operator?: string
    operatorRole?: string
    actionCode?: string
    actionContent?: number
  }[]
}

export interface PageListTicketQuery {
  /** 实例ID。 */
  openInstanceId?: string
  /** 智能客服产品类型： */
  productionType?: number
  /** 工单模板ID。 */
  templateId: string
  /** 工单ID。 */
  ticketId?: string
  /** 会员来源，取diamond配置的值。 */
  sourceId?: string
  /** 第三方用户userid。 */
  foreignId?: string
  /** 工单状态。 */
  ticketStatus?: string
  /** 开始时间，时间戳，单位毫秒。 */
  startTime?: number
  /** 结束时间，时间戳，单位毫秒。 */
  endTime?: number
  /** 查询数据的起始位置，0表示从头开始。 */
  nextToken: string
  /** 查询单页查询的最大条目数，最大值为100。 */
  maxResults: number
}

export interface PageListTicketResponse {
  nextCursor?: number
  total?: number
  list?: {
    foreignId?: string
    sourceId?: string
    foreignName?: string
    templateId?: string
    title?: string
    ticketId?: string
    ticketStatus?: string
    openInstanceId?: string
    productionType?: number
    gmtCreate?: string
    gmtModified?: string
    bizDataMap?: number
  }[]
}

export interface CreateTicketParams {
  /** 会员来源，取diamond配置的值。 */
  sourceId: string
  /** 第三方会员ID。 */
  foreignId: string
  /** 第三方会员名称。 */
  foreignName: string
  /** 实例ID。 */
  openInstanceId?: string
  /** 智能客服产品类型： */
  productionType?: number
  /** 自助单ID，钉钉智能客服自助单配置里的值。 */
  templateId: string
  /** 工单标题。 */
  title: string
  /** 表单信息。 */
  properties?: object[]
}

export interface CreateTicketResponse {
  ticketId?: string
}

// funcName: isOldApi
Internal.define({
  '/customerService/tickets/{ticketId}': { PUT: { executeActivity: false } },
  '/customerService/tickets/{ticketId}/actions': {
    GET: { pageListAction: false },
  },
  '/customerService/tickets': {
    GET: { pageListTicket: false },
    POST: { createTicket: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 执行工单活动
     * @see https://open.dingtalk.com/document/isvapp/intelligent-customer-service-execute-work-order-activities
     */
    executeActivity(
      ticketId: string,
      params: ExecuteActivityParams,
    ): Promise<ExecuteActivityResponse>
    /**
     * 查询动作记录
     * @see https://open.dingtalk.com/document/isvapp/intelligent-customer-service-query-action-records
     */
    pageListAction(
      ticketId: string,
      query: PageListActionQuery,
    ): Promise<PageListActionResponse>
    /**
     * 分页查询工单
     * @see https://open.dingtalk.com/document/isvapp/intelligent-customer-service-paging-query-work-order
     */
    pageListTicket(query: PageListTicketQuery): Promise<PageListTicketResponse>
    /**
     * 创建自助单
     * @see https://open.dingtalk.com/document/isvapp/smart-customer-service-create-a-self-service-order
     */
    createTicket(params: CreateTicketParams): Promise<CreateTicketResponse>
  }
}
