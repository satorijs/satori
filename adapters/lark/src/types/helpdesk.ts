import { AgentSchedule, AgentScheduleUpdateInfo, AgentSkill, AgentSkillRule, Category, CustomizedFieldDisplayItem, Event, Faq, FaqCreateInfo, FaqUpdateInfo, Notification, NotificationChat, NotificationDepartment, NotificationUser, Ticket, TicketCustomizedField, TicketMessage, TicketUser, UserCustomizedField, UserQueryFaqInfo } from '.'
import { Internal, Paginated } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 更新客服信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent/patch
     */
    patchHelpdeskAgent(agent_id: string, body: PatchHelpdeskAgentRequest): Promise<void>
    /**
     * 获取客服邮箱
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent/agent_email
     */
    agentEmailHelpdeskAgent(): Promise<AgentEmailHelpdeskAgentResponse>
    /**
     * 创建客服工作日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_schedule/create
     */
    createHelpdeskAgentSchedule(body: CreateHelpdeskAgentScheduleRequest): Promise<void>
    /**
     * 删除客服工作日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/delete
     */
    deleteHelpdeskAgentSchedules(agent_id: string): Promise<void>
    /**
     * 更新客服工作日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/patch
     */
    patchHelpdeskAgentSchedules(agent_id: string, body: PatchHelpdeskAgentSchedulesRequest): Promise<void>
    /**
     * 查询指定客服工作日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent-schedules/get
     */
    getHelpdeskAgentSchedules(agent_id: string): Promise<GetHelpdeskAgentSchedulesResponse>
    /**
     * 查询全部客服工作日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_schedule/list
     */
    listHelpdeskAgentSchedule(query?: ListHelpdeskAgentScheduleQuery): Promise<ListHelpdeskAgentScheduleResponse>
    /**
     * 创建客服技能
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/create
     */
    createHelpdeskAgentSkill(body: CreateHelpdeskAgentSkillRequest): Promise<CreateHelpdeskAgentSkillResponse>
    /**
     * 删除客服技能
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/delete
     */
    deleteHelpdeskAgentSkill(agent_skill_id: string): Promise<void>
    /**
     * 更新客服技能
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/patch
     */
    patchHelpdeskAgentSkill(agent_skill_id: string, body: PatchHelpdeskAgentSkillRequest): Promise<void>
    /**
     * 查询指定客服技能
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/get
     */
    getHelpdeskAgentSkill(agent_skill_id: string): Promise<GetHelpdeskAgentSkillResponse>
    /**
     * 查询全部客服技能
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill/list
     */
    listHelpdeskAgentSkill(): Promise<ListHelpdeskAgentSkillResponse>
    /**
     * 获取客服技能列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/agent_skill_rule/list
     */
    listHelpdeskAgentSkillRule(): Promise<ListHelpdeskAgentSkillRuleResponse>
    /**
     * 创建服务台对话
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/start_service
     */
    startServiceHelpdeskTicket(body: StartServiceHelpdeskTicketRequest): Promise<StartServiceHelpdeskTicketResponse>
    /**
     * 查询指定工单详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/get
     */
    getHelpdeskTicket(ticket_id: string): Promise<GetHelpdeskTicketResponse>
    /**
     * 更新工单详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/update
     */
    updateHelpdeskTicket(ticket_id: string, body: UpdateHelpdeskTicketRequest): Promise<void>
    /**
     * 查询全部工单详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/list
     */
    listHelpdeskTicket(query?: ListHelpdeskTicketQuery): Promise<ListHelpdeskTicketResponse>
    /**
     * 获取工单内图像
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/ticket_image
     */
    ticketImageHelpdeskTicket(query?: TicketImageHelpdeskTicketQuery): Promise<ArrayBuffer>
    /**
     * 回复用户在工单里的提问
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/answer_user_query
     */
    answerUserQueryHelpdeskTicket(ticket_id: string, body: AnswerUserQueryHelpdeskTicketRequest): Promise<void>
    /**
     * 获取服务台自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/customized_fields
     */
    customizedFieldsHelpdeskTicket(query?: CustomizedFieldsHelpdeskTicketQuery): Promise<CustomizedFieldsHelpdeskTicketResponse>
    /**
     * 发送工单消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/create
     */
    createHelpdeskTicketMessage(ticket_id: string, body: CreateHelpdeskTicketMessageRequest): Promise<CreateHelpdeskTicketMessageResponse>
    /**
     * 获取工单消息详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/list
     */
    listHelpdeskTicketMessage(ticket_id: string, query?: ListHelpdeskTicketMessageQuery): Promise<ListHelpdeskTicketMessageResponse>
    /**
     * 服务台机器人向工单绑定的群内发送消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/bot-message/create
     */
    createHelpdeskBotMessage(body: CreateHelpdeskBotMessageRequest, query?: CreateHelpdeskBotMessageQuery): Promise<CreateHelpdeskBotMessageResponse>
    /**
     * 创建工单自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/create-ticket-customized-field
     */
    createHelpdeskTicketCustomizedField(body: CreateHelpdeskTicketCustomizedFieldRequest): Promise<void>
    /**
     * 删除工单自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/delete
     */
    deleteHelpdeskTicketCustomizedField(ticket_customized_field_id: string): Promise<void>
    /**
     * 更新工单自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/update-ticket-customized-field
     */
    patchHelpdeskTicketCustomizedField(ticket_customized_field_id: string, body: PatchHelpdeskTicketCustomizedFieldRequest): Promise<void>
    /**
     * 获取指定工单自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/get-ticket-customized-field
     */
    getHelpdeskTicketCustomizedField(ticket_customized_field_id: string): Promise<GetHelpdeskTicketCustomizedFieldResponse>
    /**
     * 获取全部工单自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/list-ticket-customized-fields
     */
    listHelpdeskTicketCustomizedField(body: ListHelpdeskTicketCustomizedFieldRequest, query?: Pagination): Promise<Paginated<TicketCustomizedField>>
    /**
     * 获取全部工单自定义字段
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_customized_field/list-ticket-customized-fields
     */
    listHelpdeskTicketCustomizedFieldIter(body: ListHelpdeskTicketCustomizedFieldRequest): AsyncIterator<TicketCustomizedField>
    /**
     * 创建知识库
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/create
     */
    createHelpdeskFaq(body: CreateHelpdeskFaqRequest): Promise<CreateHelpdeskFaqResponse>
    /**
     * 删除知识库
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/delete
     */
    deleteHelpdeskFaq(id: string): Promise<void>
    /**
     * 修改知识库
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/patch
     */
    patchHelpdeskFaq(id: string, body: PatchHelpdeskFaqRequest): Promise<void>
    /**
     * 获取指定知识库详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/get
     */
    getHelpdeskFaq(id: string): Promise<GetHelpdeskFaqResponse>
    /**
     * 获取全部知识库详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/list
     */
    listHelpdeskFaq(query?: ListHelpdeskFaqQuery & Pagination): Promise<ListHelpdeskFaqResponse>
    /**
     * 获取知识库图像
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/faq_image
     */
    faqImageHelpdeskFaq(id: string, image_key: string): Promise<ArrayBuffer>
    /**
     * 搜索知识库
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/search
     */
    searchHelpdeskFaq(query?: SearchHelpdeskFaqQuery & Pagination): Promise<Paginated<Faq>>
    /**
     * 搜索知识库
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/faq/search
     */
    searchHelpdeskFaqIter(query?: SearchHelpdeskFaqQuery): AsyncIterator<Faq>
    /**
     * 创建知识库分类
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/create
     */
    createHelpdeskCategory(body: CreateHelpdeskCategoryRequest): Promise<CreateHelpdeskCategoryResponse>
    /**
     * 获取知识库分类
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/get
     */
    getHelpdeskCategory(id: string): Promise<GetHelpdeskCategoryResponse>
    /**
     * 更新知识库分类详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/patch
     */
    patchHelpdeskCategory(id: string, body: PatchHelpdeskCategoryRequest): Promise<void>
    /**
     * 删除知识库分类详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/delete
     */
    deleteHelpdeskCategory(id: string): Promise<void>
    /**
     * 获取全部知识库分类
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/category/list-categories
     */
    listHelpdeskCategory(query?: ListHelpdeskCategoryQuery): Promise<ListHelpdeskCategoryResponse>
    /**
     * 创建推送
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/create
     */
    createHelpdeskNotification(body: CreateHelpdeskNotificationRequest, query?: CreateHelpdeskNotificationQuery): Promise<CreateHelpdeskNotificationResponse>
    /**
     * 更新推送
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/patch
     */
    patchHelpdeskNotification(notification_id: string, body: PatchHelpdeskNotificationRequest, query?: PatchHelpdeskNotificationQuery): Promise<void>
    /**
     * 查询推送
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/get
     */
    getHelpdeskNotification(notification_id: string, query?: GetHelpdeskNotificationQuery): Promise<GetHelpdeskNotificationResponse>
    /**
     * 预览推送
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/preview
     */
    previewHelpdeskNotification(notification_id: string): Promise<void>
    /**
     * 提交审核
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/submit_approve
     */
    submitApproveHelpdeskNotification(notification_id: string, body: SubmitApproveHelpdeskNotificationRequest): Promise<SubmitApproveHelpdeskNotificationResponse>
    /**
     * 取消审核
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_approve
     */
    cancelApproveHelpdeskNotification(notification_id: string): Promise<void>
    /**
     * 执行推送
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/execute_send
     */
    executeSendHelpdeskNotification(notification_id: string, body: ExecuteSendHelpdeskNotificationRequest): Promise<void>
    /**
     * 取消推送
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/cancel_send
     */
    cancelSendHelpdeskNotification(notification_id: string, body: CancelSendHelpdeskNotificationRequest): Promise<void>
    /**
     * 订阅服务台事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/subscribe
     */
    subscribeHelpdeskEvent(body: SubscribeHelpdeskEventRequest): Promise<void>
    /**
     * 取消订阅服务台事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/unsubscribe
     */
    unsubscribeHelpdeskEvent(body: UnsubscribeHelpdeskEventRequest): Promise<void>
  }
}

export interface PatchHelpdeskAgentRequest {
  /** agent status */
  status?: number
}

export interface CreateHelpdeskAgentScheduleRequest {
  /** 新客服日程 */
  agent_schedules?: AgentScheduleUpdateInfo[]
}

export interface PatchHelpdeskAgentSchedulesRequest {
  /** 工作日程列表 */
  agent_schedule?: AgentScheduleUpdateInfo
}

export interface ListHelpdeskAgentScheduleQuery {
  /** 筛选条件, 1 - online客服, 2 - offline(手动)客服, 3 - off duty(下班)客服, 4 - 移除客服 */
  status: number[]
}

export interface CreateHelpdeskAgentSkillRequest {
  /** 技能名 */
  name?: string
  /** 技能rules */
  rules?: AgentSkillRule[]
  /** 客服 ids */
  agent_ids?: string[]
}

export interface PatchHelpdeskAgentSkillRequest {
  /** 更新技能 */
  agent_skill?: AgentSkill
}

export interface StartServiceHelpdeskTicketRequest {
  /** 是否直接进入人工(若appointed_agents填写了，该值为必填) */
  human_service?: boolean
  /** 客服 open ids (获取方式参考[获取单个用户信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get))，human_service需要为true */
  appointed_agents?: string[]
  /** 用户 open id,(获取方式参考[获取单个用户信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/get)) */
  open_id: string
  /** 工单来源自定义信息，长度限制1024字符，如设置，[获取工单详情](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/get)会返回此信息 */
  customized_info?: string
}

export interface UpdateHelpdeskTicketRequest {
  /** new status, 1: 已创建, 2: 处理中, 3: 排队中, 5: 待定, 50: 机器人关闭工单, 51: 关闭工单 */
  status?: number
  /** 新标签名 */
  tag_names?: string[]
  /** 新评论 */
  comment?: string
  /** 自定义字段 */
  customized_fields?: CustomizedFieldDisplayItem[]
  /** ticket stage */
  ticket_type?: number
  /** 工单是否解决，1: 未解决, 2: 已解决 */
  solved?: number
  /** 工单来源渠道ID */
  channel?: number
}

export interface ListHelpdeskTicketQuery {
  /** 搜索条件：工单ID */
  ticket_id?: string
  /** 搜索条件: 客服id */
  agent_id?: string
  /** 搜索条件: 关单客服id */
  closed_by_id?: string
  /** 搜索条件: 工单类型 1:bot 2:人工 */
  type?: number
  /** 搜索条件: 工单渠道 */
  channel?: number
  /** 搜索条件: 工单是否解决 1:没解决 2:已解决 */
  solved?: number
  /** 搜索条件: 工单评分 */
  score?: number
  /** 搜索条件: 工单状态列表 */
  status_list?: number[]
  /** 搜索条件: 用户名称 */
  guest_name?: string
  /** 搜索条件: 用户id */
  guest_id?: string
  /** 搜索条件: 用户标签列表 */
  tags?: string[]
  /** 页数, 从1开始, 默认为1 */
  page?: number
  /** 当前页大小，最大为200， 默认为20。分页查询最多累计返回一万条数据，超过一万条请更改查询条件，推荐通过时间查询。 */
  page_size?: number
  /** 搜索条件: 工单创建起始时间 ms (也需要填上create_time_end)，相当于>=create_time_start */
  create_time_start?: number
  /** 搜索条件: 工单创建结束时间 ms (也需要填上create_time_start)，相当于<=create_time_end */
  create_time_end?: number
  /** 搜索条件: 工单修改起始时间 ms (也需要填上update_time_end) */
  update_time_start?: number
  /** 搜索条件: 工单修改结束时间 ms(也需要填上update_time_start) */
  update_time_end?: number
}

export interface TicketImageHelpdeskTicketQuery {
  /** 工单ID */
  ticket_id: string
  /** 消息ID[查询消息ID](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket-message/list) */
  msg_id: string
  /** index，当消息类型为post时，需指定图片index，index从0开始。当消息类型为img时，无需index */
  index?: number
}

export interface AnswerUserQueryHelpdeskTicketRequest {
  /** 事件ID,可从订阅事件中提取 */
  event_id: string
  /** faq结果列表 */
  faqs?: UserQueryFaqInfo[]
}

export interface CustomizedFieldsHelpdeskTicketQuery {
  /** visible only */
  visible_only?: boolean
}

export interface CreateHelpdeskTicketMessageRequest {
  /** 消息类型；text：纯文本；post：富文本 */
  msg_type: string
  /** - 纯文本，参考[发送文本消息](/ssl:ttdoc/ukTMukTMukTM/uUjNz4SN2MjL1YzM)中的content；- 富文本，参考[发送富文本消息](/ssl:ttdoc/ukTMukTMukTM/uMDMxEjLzATMx4yMwETM)中的content */
  content: string
}

export interface ListHelpdeskTicketMessageQuery {
  /** 起始时间 */
  time_start?: number
  /** 结束时间 */
  time_end?: number
  /** 页数ID */
  page?: number
  /** 消息数量，最大200，默认20 */
  page_size?: number
}

export interface CreateHelpdeskBotMessageRequest {
  /** 消息类型 */
  msg_type: 'text' | 'post' | 'image' | 'interactive'
  /** 消息内容 */
  content: string
  /** 接收消息用户id */
  receiver_id: string
  /** 接收消息方式，chat(服务台专属服务群)或user(服务台机器人私聊)。若选择专属服务群，用户有正在处理的工单将会发送失败。默认以chat方式发送。 */
  receive_type?: 'chat' | 'user'
}

export interface CreateHelpdeskBotMessageQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateHelpdeskTicketCustomizedFieldRequest {
  /** help desk id */
  helpdesk_id: string
  /** key name */
  key_name: string
  /** display name */
  display_name: string
  /** the position of ticket customized field in the page */
  position: string
  /** type of the field */
  field_type: string
  /** description of the field */
  description: string
  /** if the field is visible */
  visible: boolean
  /** if the field is editable */
  editable: boolean
  /** if the field is required */
  required: boolean
  /** if the dropdown field supports multi-select */
  dropdown_allow_multiple?: boolean
}

export interface PatchHelpdeskTicketCustomizedFieldRequest {
  /** display name */
  display_name?: string
  /** the position of ticket customized field in the page */
  position?: string
  /** description of the field */
  description?: string
  /** if the field is visible */
  visible?: boolean
  /** if the field is required */
  required?: boolean
}

export interface ListHelpdeskTicketCustomizedFieldRequest {
  /** 是否可见 */
  visible?: boolean
}

export interface CreateHelpdeskFaqRequest {
  /** 知识库详情 */
  faq?: FaqCreateInfo
}

export interface PatchHelpdeskFaqRequest {
  /** 修改的知识库内容 */
  faq?: FaqUpdateInfo
}

export interface ListHelpdeskFaqQuery {
  /** 知识库分类ID */
  category_id?: string
  /** 搜索条件: 知识库状态 1:在线 0:删除，可恢复 2：删除，不可恢复 */
  status?: string
  /** 搜索条件: 关键词，匹配问题标题，问题关键字，用户姓名 */
  search?: string
}

export interface SearchHelpdeskFaqQuery {
  /** 搜索query，query内容如果不是英文，包含中文空格等有两种编码策略：1. url编码 2. base64编码，同时加上base64=true参数 */
  query: string
  /** 是否转换为base64,输入true表示是，不填写表示否，中文需要转换为base64 */
  base64?: string
}

export interface CreateHelpdeskCategoryRequest {
  /** category name */
  name: string
  /** parent category id, if any */
  parent_id: string
  /** category language */
  language?: string
}

export interface PatchHelpdeskCategoryRequest {
  /** category name */
  name?: string
  /** parent category id, if any */
  parent_id?: string
}

export interface ListHelpdeskCategoryQuery {
  /** 知识库分类语言 */
  lang?: string
  /** 排序键。1: 根据知识库分类更新时间排序 */
  order_by?: number
  /** 顺序。true: 正序；false：反序 */
  asc?: boolean
}

export interface CreateHelpdeskNotificationRequest {
  /** 唯一ID */
  id?: string
  /** 任务名称 */
  job_name?: string
  /** 0(草稿)、1(等待审批)、 2(审批未通过)、3(正在发送中)、4(发送完成)、5(等待设置发送时间)、6(取消发送)、7(新人入职执行发送)、8(等待倒计时发送) */
  status?: number
  /** 创建人 */
  create_user?: NotificationUser
  /** 创建时间（毫秒时间戳） */
  created_at?: string
  /** 更新用户 */
  update_user?: NotificationUser
  /** 更新时间（毫秒时间戳） */
  updated_at?: string
  /** 目标推送用户 */
  target_user_count?: number
  /** 已推送用户总数 */
  sent_user_count?: number
  /** 已读用户总数 */
  read_user_count?: number
  /** 推送任务触发时间（毫秒时间戳） */
  send_at?: string
  /** 推送内容，详见：https://open.feishu.cn/tool/cardbuilder?from=howtoguide */
  push_content?: string
  /** 0（定时推送：push_scope不能等于3） 1（新人入职推送：push_scope必须等于1或者3；new_staff_scope_type不能为空） */
  push_type?: number
  /** 推送范围（服务台私信） 0：组织内全部成员（user_list和department_list必须为空） 1：不推送任何成员（user_list和department_list必须为空，chat_list不可为空） 2：推送到部分成员（user_list或department_list不能为空） 3：入职新人 以上四种状态，chat_list都相对独立，只有在推送范围为1时，必须需要设置chat_list */
  push_scope_type?: number
  /** 新人入职范围类型（push_type为1时生效） 0：组织内所有新人 1：组织内特定的部门（new_staff_scope_department_list 字段不能为空） */
  new_staff_scope_type?: number
  /** 新人入职生效部门列表 */
  new_staff_scope_department_list?: NotificationDepartment[]
  /** push推送到成员列表 */
  user_list?: NotificationUser[]
  /** push推送到的部门信息列表 */
  department_list?: NotificationDepartment[]
  /** push推送到的会话列表(群) */
  chat_list?: NotificationChat[]
  /** 预留扩展字段 */
  ext?: string
}

export interface CreateHelpdeskNotificationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface PatchHelpdeskNotificationRequest {
  /** 唯一ID */
  id?: string
  /** 任务名称 */
  job_name?: string
  /** 0(草稿)、1(等待审批)、 2(审批未通过)、3(正在发送中)、4(发送完成)、5(等待设置发送时间)、6(取消发送)、7(新人入职执行发送)、8(等待倒计时发送) */
  status?: number
  /** 创建人 */
  create_user?: NotificationUser
  /** 创建时间（毫秒时间戳） */
  created_at?: string
  /** 更新用户 */
  update_user?: NotificationUser
  /** 更新时间（毫秒时间戳） */
  updated_at?: string
  /** 目标推送用户 */
  target_user_count?: number
  /** 已推送用户总数 */
  sent_user_count?: number
  /** 已读用户总数 */
  read_user_count?: number
  /** 推送任务触发时间（毫秒时间戳） */
  send_at?: string
  /** 推送内容，详见：https://open.feishu.cn/tool/cardbuilder?from=howtoguide */
  push_content?: string
  /** 0（定时推送：push_scope不能等于3） 1（新人入职推送：push_scope必须等于1或者3；new_staff_scope_type不能为空） */
  push_type?: number
  /** 推送范围（服务台私信） 0：组织内全部成员（user_list和department_list必须为空） 1：不推送任何成员（user_list和department_list必须为空，chat_list不可为空） 2：推送到部分成员（user_list或department_list不能为空） 3：入职新人 以上四种状态，chat_list都相对独立，只有在推送范围为1时，必须需要设置chat_list */
  push_scope_type?: number
  /** 新人入职范围类型（push_type为1时生效） 0：组织内所有新人 1：组织内特定的部门（new_staff_scope_department_list 字段不能为空） */
  new_staff_scope_type?: number
  /** 新人入职生效部门列表 */
  new_staff_scope_department_list?: NotificationDepartment[]
  /** push推送到成员列表 */
  user_list?: NotificationUser[]
  /** push推送到的部门信息列表 */
  department_list?: NotificationDepartment[]
  /** push推送到的会话列表(群) */
  chat_list?: NotificationChat[]
  /** 预留扩展字段 */
  ext?: string
}

export interface PatchHelpdeskNotificationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetHelpdeskNotificationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SubmitApproveHelpdeskNotificationRequest {
  /** 提交审批理由 */
  reason: string
}

export interface ExecuteSendHelpdeskNotificationRequest {
  /** 发送时间戳(毫秒) */
  send_at: string
}

export interface CancelSendHelpdeskNotificationRequest {
  /** 是否召回已发送的消息,新人入职消息同样适用 */
  is_recall: boolean
}

export interface SubscribeHelpdeskEventRequest {
  /** 可订阅的事件列表 */
  events: Event[]
}

export interface UnsubscribeHelpdeskEventRequest {
  /** event list to unsubscribe */
  events: Event[]
}

export interface AgentEmailHelpdeskAgentResponse {
  /** agent emails */
  agents?: string
}

export interface GetHelpdeskAgentSchedulesResponse {
  /** schedules of an agent */
  agent_schedule?: AgentSchedule
}

export interface ListHelpdeskAgentScheduleResponse {
  /** schedule of all agent */
  agent_schedules?: AgentSchedule[]
}

export interface CreateHelpdeskAgentSkillResponse {
  agent_skill_id?: string
}

export interface GetHelpdeskAgentSkillResponse {
  /** agent skill */
  agent_skill?: AgentSkill
}

export interface ListHelpdeskAgentSkillResponse {
  /** list of agent groups */
  agent_skills?: AgentSkill[]
}

export interface ListHelpdeskAgentSkillRuleResponse {
  /** all rules for agent skill */
  rules?: AgentSkillRule[]
}

export interface StartServiceHelpdeskTicketResponse {
  /** chat id */
  chat_id: string
}

export interface GetHelpdeskTicketResponse {
  /** ticket detail */
  ticket?: Ticket
}

export interface ListHelpdeskTicketResponse {
  /** the total count */
  total?: number
  tickets?: Ticket[]
}

export interface CustomizedFieldsHelpdeskTicketResponse {
  /** user customized fields */
  user_customized_fields?: UserCustomizedField[]
  /** ticket customized fields */
  ticket_customized_fields?: TicketCustomizedField[]
}

export interface CreateHelpdeskTicketMessageResponse {
  /** chat消息open ID */
  message_id?: string
}

export interface ListHelpdeskTicketMessageResponse {
  /** list of ticket messages */
  messages?: TicketMessage[]
  /** total number of messages */
  total?: number
}

export interface CreateHelpdeskBotMessageResponse {
  message_id?: string
}

export interface GetHelpdeskTicketCustomizedFieldResponse {
  /** ticket customized field id */
  ticket_customized_field_id: string
  /** help desk id */
  helpdesk_id: string
  /** key name */
  key_name: string
  /** display name */
  display_name: string
  /** the position of ticket customized field in the page */
  position: string
  /** type of the field */
  field_type: string
  /** description of the field */
  description: string
  /** if the field is visible */
  visible: boolean
  /** if the field is editable */
  editable: boolean
  /** if the field is required */
  required: boolean
  /** the time when the field is created */
  created_at?: string
  /** the time when the field is updated */
  updated_at?: string
  /** the user who created the ticket customized field */
  created_by?: TicketUser
  /** the user who recently updated the ticket customized field */
  updated_by?: TicketUser
  /** if the dropdown field supports multi-select */
  dropdown_allow_multiple?: boolean
}

export interface CreateHelpdeskFaqResponse {
  /** faq detail */
  faq?: Faq
}

export interface GetHelpdeskFaqResponse {
  /** faq detail */
  faq?: Faq
}

export interface ListHelpdeskFaqResponse {
  /** if there's next page */
  has_more?: boolean
  /** the next page token */
  page_token?: string
  /** the page size */
  page_size?: number
  /** the total count */
  total?: number
  items?: Faq[]
}

export interface CreateHelpdeskCategoryResponse {
  /** category */
  category?: Category
}

export interface GetHelpdeskCategoryResponse {
  /** category id */
  category_id: string
  /** category id, for backward compatibility */
  id: string
  /** category name */
  name: string
  /** helpdesk id */
  helpdesk_id: string
  /** category language */
  language?: string
}

export interface ListHelpdeskCategoryResponse {
  /** list of categories */
  categories?: Category[]
}

export interface CreateHelpdeskNotificationResponse {
  /** 创建成功后的唯一id */
  notification_id?: string
  /** 当前状态 */
  status?: number
}

export interface GetHelpdeskNotificationResponse {
  /** push任务详情 */
  notification?: Notification
  /** 审批链接 */
  approval_app_link?: string
}

export interface SubmitApproveHelpdeskNotificationResponse {
  /** 是否有权限创建或者管理审批流程 （有两种情况会导致没有权限： 1：用户没有安装服务台小程序，需要在https://app.feishu.cn/app/cli_9f9f8825d53b900d或者https://ftest.feishu.cn/admin/appCenter/manage/cli_9f9f8825d53b900d?lang=zh-CN 安装小程序 2：用户安装的服务台小程序版本过低） */
  has_access?: boolean
}

Internal.define({
  '/helpdesk/v1/agents/{agent_id}': {
    PATCH: 'patchHelpdeskAgent',
  },
  '/helpdesk/v1/agent_emails': {
    GET: 'agentEmailHelpdeskAgent',
  },
  '/helpdesk/v1/agent_schedules': {
    POST: 'createHelpdeskAgentSchedule',
    GET: 'listHelpdeskAgentSchedule',
  },
  '/helpdesk/v1/agents/{agent_id}/schedules': {
    DELETE: 'deleteHelpdeskAgentSchedules',
    PATCH: 'patchHelpdeskAgentSchedules',
    GET: 'getHelpdeskAgentSchedules',
  },
  '/helpdesk/v1/agent_skills': {
    POST: 'createHelpdeskAgentSkill',
    GET: 'listHelpdeskAgentSkill',
  },
  '/helpdesk/v1/agent_skills/{agent_skill_id}': {
    DELETE: 'deleteHelpdeskAgentSkill',
    PATCH: 'patchHelpdeskAgentSkill',
    GET: 'getHelpdeskAgentSkill',
  },
  '/helpdesk/v1/agent_skill_rules': {
    GET: 'listHelpdeskAgentSkillRule',
  },
  '/helpdesk/v1/start_service': {
    POST: 'startServiceHelpdeskTicket',
  },
  '/helpdesk/v1/tickets/{ticket_id}': {
    GET: 'getHelpdeskTicket',
    PUT: 'updateHelpdeskTicket',
  },
  '/helpdesk/v1/tickets': {
    GET: 'listHelpdeskTicket',
  },
  '/helpdesk/v1/ticket_images': {
    GET: { name: 'ticketImageHelpdeskTicket', type: 'binary' },
  },
  '/helpdesk/v1/tickets/{ticket_id}/answer_user_query': {
    POST: 'answerUserQueryHelpdeskTicket',
  },
  '/helpdesk/v1/customized_fields': {
    GET: 'customizedFieldsHelpdeskTicket',
  },
  '/helpdesk/v1/tickets/{ticket_id}/messages': {
    POST: 'createHelpdeskTicketMessage',
    GET: 'listHelpdeskTicketMessage',
  },
  '/helpdesk/v1/message': {
    POST: 'createHelpdeskBotMessage',
  },
  '/helpdesk/v1/ticket_customized_fields': {
    POST: 'createHelpdeskTicketCustomizedField',
    GET: { name: 'listHelpdeskTicketCustomizedField', pagination: { argIndex: 1, tokenKey: 'next_page_token' } },
  },
  '/helpdesk/v1/ticket_customized_fields/{ticket_customized_field_id}': {
    DELETE: 'deleteHelpdeskTicketCustomizedField',
    PATCH: 'patchHelpdeskTicketCustomizedField',
    GET: 'getHelpdeskTicketCustomizedField',
  },
  '/helpdesk/v1/faqs': {
    POST: 'createHelpdeskFaq',
    GET: 'listHelpdeskFaq',
  },
  '/helpdesk/v1/faqs/{id}': {
    DELETE: 'deleteHelpdeskFaq',
    PATCH: 'patchHelpdeskFaq',
    GET: 'getHelpdeskFaq',
  },
  '/helpdesk/v1/faqs/{id}/image/{image_key}': {
    GET: { name: 'faqImageHelpdeskFaq', type: 'binary' },
  },
  '/helpdesk/v1/faqs/search': {
    GET: { name: 'searchHelpdeskFaq', pagination: { argIndex: 0 } },
  },
  '/helpdesk/v1/categories': {
    POST: 'createHelpdeskCategory',
    GET: 'listHelpdeskCategory',
  },
  '/helpdesk/v1/categories/{id}': {
    GET: 'getHelpdeskCategory',
    PATCH: 'patchHelpdeskCategory',
    DELETE: 'deleteHelpdeskCategory',
  },
  '/helpdesk/v1/notifications': {
    POST: 'createHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}': {
    PATCH: 'patchHelpdeskNotification',
    GET: 'getHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/preview': {
    POST: 'previewHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/submit_approve': {
    POST: 'submitApproveHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/cancel_approve': {
    POST: 'cancelApproveHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/execute_send': {
    POST: 'executeSendHelpdeskNotification',
  },
  '/helpdesk/v1/notifications/{notification_id}/cancel_send': {
    POST: 'cancelSendHelpdeskNotification',
  },
  '/helpdesk/v1/events/subscribe': {
    POST: 'subscribeHelpdeskEvent',
  },
  '/helpdesk/v1/events/unsubscribe': {
    POST: 'unsubscribeHelpdeskEvent',
  },
})
