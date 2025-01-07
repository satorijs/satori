import { AclScope, Attachment, Calendar, CalendarAcl, CalendarEvent, CalendarEventAttendee, CalendarEventAttendeeChatMember, CalendarEventAttendeeId, EventLocation, EventSearchFilter, Freebusy, Instance, Reminder, Schema, TimeInfo, UserCalendar, Vchat } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建共享日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/create
     */
    createCalendar(body: CreateCalendarRequest): Promise<CreateCalendarResponse>
    /**
     * 删除共享日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/delete
     */
    deleteCalendar(calendar_id: string): Promise<void>
    /**
     * 查询主日历信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary
     */
    primaryCalendar(query?: PrimaryCalendarQuery): Promise<PrimaryCalendarResponse>
    /**
     * 查询日历信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get
     */
    getCalendar(calendar_id: string): Promise<GetCalendarResponse>
    /**
     * 查询主日历日程忙闲信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/freebusy/list
     */
    listCalendarFreebusy(body: ListCalendarFreebusyRequest, query?: ListCalendarFreebusyQuery): Promise<ListCalendarFreebusyResponse>
    /**
     * 查询日历列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list
     */
    listCalendar(query?: ListCalendarQuery & Pagination): Promise<ListCalendarResponse>
    /**
     * 更新日历信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/patch
     */
    patchCalendar(calendar_id: string, body: PatchCalendarRequest): Promise<PatchCalendarResponse>
    /**
     * 搜索日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/search
     */
    searchCalendar(body: SearchCalendarRequest, query?: Pagination): Promise<SearchCalendarResponse>
    /**
     * 订阅日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscribe
     */
    subscribeCalendar(calendar_id: string): Promise<SubscribeCalendarResponse>
    /**
     * 取消订阅日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscribe
     */
    unsubscribeCalendar(calendar_id: string): Promise<void>
    /**
     * 订阅日历变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscription
     */
    subscriptionCalendar(): Promise<void>
    /**
     * 取消订阅日历变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscription
     */
    unsubscriptionCalendar(): Promise<void>
    /**
     * 创建访问控制
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/create
     */
    createCalendarCalendarAcl(calendar_id: string, body: CreateCalendarCalendarAclRequest, query?: CreateCalendarCalendarAclQuery): Promise<CreateCalendarCalendarAclResponse>
    /**
     * 删除访问控制
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/delete
     */
    deleteCalendarCalendarAcl(calendar_id: string, acl_id: string): Promise<void>
    /**
     * 获取访问控制列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list
     */
    listCalendarCalendarAcl(calendar_id: string, query?: ListCalendarCalendarAclQuery & Pagination): Promise<Paginated<CalendarAcl, 'acls'>>
    /**
     * 获取访问控制列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list
     */
    listCalendarCalendarAclIter(calendar_id: string, query?: ListCalendarCalendarAclQuery): AsyncIterator<CalendarAcl>
    /**
     * 订阅日历访问控制变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/subscription
     */
    subscriptionCalendarCalendarAcl(calendar_id: string): Promise<void>
    /**
     * 取消订阅日历访问控制变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/unsubscription
     */
    unsubscriptionCalendarCalendarAcl(calendar_id: string): Promise<void>
    /**
     * 创建日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/create
     */
    createCalendarCalendarEvent(calendar_id: string, body: CreateCalendarCalendarEventRequest, query?: CreateCalendarCalendarEventQuery): Promise<CreateCalendarCalendarEventResponse>
    /**
     * 删除日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/delete
     */
    deleteCalendarCalendarEvent(calendar_id: string, event_id: string, query?: DeleteCalendarCalendarEventQuery): Promise<void>
    /**
     * 更新日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/patch
     */
    patchCalendarCalendarEvent(calendar_id: string, event_id: string, body: PatchCalendarCalendarEventRequest, query?: PatchCalendarCalendarEventQuery): Promise<PatchCalendarCalendarEventResponse>
    /**
     * 获取日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get
     */
    getCalendarCalendarEvent(calendar_id: string, event_id: string, query?: GetCalendarCalendarEventQuery): Promise<GetCalendarCalendarEventResponse>
    /**
     * 获取日程列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list
     */
    listCalendarCalendarEvent(calendar_id: string, query?: ListCalendarCalendarEventQuery & Pagination): Promise<ListCalendarCalendarEventResponse>
    /**
     * 搜索日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/search
     */
    searchCalendarCalendarEvent(calendar_id: string, body: SearchCalendarCalendarEventRequest, query?: SearchCalendarCalendarEventQuery & Pagination): Promise<SearchCalendarCalendarEventResponse>
    /**
     * 订阅日程变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription
     */
    subscriptionCalendarCalendarEvent(calendar_id: string): Promise<void>
    /**
     * 取消订阅日程变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/unsubscription
     */
    unsubscriptionCalendarCalendarEvent(calendar_id: string): Promise<void>
    /**
     * 回复日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/reply
     */
    replyCalendarCalendarEvent(calendar_id: string, event_id: string, body: ReplyCalendarCalendarEventRequest): Promise<void>
    /**
     * 获取重复日程实例
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instances
     */
    instancesCalendarCalendarEvent(calendar_id: string, event_id: string, query?: InstancesCalendarCalendarEventQuery & Pagination): Promise<Paginated<Instance>>
    /**
     * 获取重复日程实例
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instances
     */
    instancesCalendarCalendarEventIter(calendar_id: string, event_id: string, query?: InstancesCalendarCalendarEventQuery): AsyncIterator<Instance>
    /**
     * 查询日程视图
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instance_view
     */
    instanceViewCalendarCalendarEvent(calendar_id: string, query?: InstanceViewCalendarCalendarEventQuery): Promise<InstanceViewCalendarCalendarEventResponse>
    /**
     * 创建会议群
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/create
     */
    createCalendarCalendarEventMeetingChat(calendar_id: string, event_id: string): Promise<CreateCalendarCalendarEventMeetingChatResponse>
    /**
     * 解绑会议群
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/delete
     */
    deleteCalendarCalendarEventMeetingChat(calendar_id: string, event_id: string, query?: DeleteCalendarCalendarEventMeetingChatQuery): Promise<void>
    /**
     * 创建会议纪要
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_minute/create
     */
    createCalendarCalendarEventMeetingMinute(calendar_id: string, event_id: string): Promise<CreateCalendarCalendarEventMeetingMinuteResponse>
    /**
     * 创建请假日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/create
     */
    createCalendarTimeoffEvent(body: CreateCalendarTimeoffEventRequest, query?: CreateCalendarTimeoffEventQuery): Promise<CreateCalendarTimeoffEventResponse>
    /**
     * 删除请假日程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/delete
     */
    deleteCalendarTimeoffEvent(timeoff_event_id: string): Promise<void>
    /**
     * 添加日程参与人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create
     */
    createCalendarCalendarEventAttendee(calendar_id: string, event_id: string, body: CreateCalendarCalendarEventAttendeeRequest, query?: CreateCalendarCalendarEventAttendeeQuery): Promise<CreateCalendarCalendarEventAttendeeResponse>
    /**
     * 删除日程参与人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/batch_delete
     */
    batchDeleteCalendarCalendarEventAttendee(calendar_id: string, event_id: string, body: BatchDeleteCalendarCalendarEventAttendeeRequest, query?: BatchDeleteCalendarCalendarEventAttendeeQuery): Promise<void>
    /**
     * 获取日程参与人列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list
     */
    listCalendarCalendarEventAttendee(calendar_id: string, event_id: string, query?: ListCalendarCalendarEventAttendeeQuery & Pagination): Promise<Paginated<CalendarEventAttendee>>
    /**
     * 获取日程参与人列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list
     */
    listCalendarCalendarEventAttendeeIter(calendar_id: string, event_id: string, query?: ListCalendarCalendarEventAttendeeQuery): AsyncIterator<CalendarEventAttendee>
    /**
     * 获取日程参与群成员列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list
     */
    listCalendarCalendarEventAttendeeChatMember(calendar_id: string, event_id: string, attendee_id: string, query?: ListCalendarCalendarEventAttendeeChatMemberQuery & Pagination): Promise<Paginated<CalendarEventAttendeeChatMember>>
    /**
     * 获取日程参与群成员列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list
     */
    listCalendarCalendarEventAttendeeChatMemberIter(calendar_id: string, event_id: string, attendee_id: string, query?: ListCalendarCalendarEventAttendeeChatMemberQuery): AsyncIterator<CalendarEventAttendeeChatMember>
    /**
     * 生成 CalDAV 配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/setting/generate_caldav_conf
     */
    generateCaldavConfCalendarSetting(body: GenerateCaldavConfCalendarSettingRequest): Promise<GenerateCaldavConfCalendarSettingResponse>
    /**
     * 将 Exchange 账户绑定到飞书账户
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/create
     */
    createCalendarExchangeBinding(body: CreateCalendarExchangeBindingRequest, query?: CreateCalendarExchangeBindingQuery): Promise<CreateCalendarExchangeBindingResponse>
    /**
     * 解除 Exchange 账户绑定
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/delete
     */
    deleteCalendarExchangeBinding(exchange_binding_id: string): Promise<void>
    /**
     * 查询 Exchange 账户的绑定状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/get
     */
    getCalendarExchangeBinding(exchange_binding_id: string, query?: GetCalendarExchangeBindingQuery): Promise<GetCalendarExchangeBindingResponse>
  }
}

export interface CreateCalendarRequest {
  /** 日历标题 */
  summary?: string
  /** 日历描述 */
  description?: string
  /** 权限 */
  permissions?: 'private' | 'show_only_free_busy' | 'public'
  /** 日历颜色，颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效 */
  color?: number
  /** 日历备注名，修改或添加后仅对当前身份生效 */
  summary_alias?: string
}

export interface PrimaryCalendarQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListCalendarFreebusyRequest {
  /** 查询时段开始时间，需要url编码 */
  time_min: string
  /** 查询时段结束时间，需要url编码 */
  time_max: string
  /** 用户user_id，输入时与 room_id 二选一。参见[用户相关的 ID 概念](/ssl:ttdoc/home/user-identity-introduction/introduction) */
  user_id?: string
  /** 会议室room_id，输入时与 user_id 二选一 */
  room_id?: string
  /** 是否包含绑定的三方日历中的日程，不传默认为true，即包含。 */
  include_external_calendar?: boolean
  /** 是否包含标记为空闲的日程，不传默认为true，即包含。 */
  only_busy?: boolean
}

export interface ListCalendarFreebusyQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListCalendarQuery {
  /** 上次请求Response返回的增量同步标记，分页请求未结束时为空 */
  sync_token?: string
}

export interface PatchCalendarRequest {
  /** 标题 */
  summary?: string
  /** 日历描述 */
  description?: string
  /** 权限 */
  permissions?: 'private' | 'show_only_free_busy' | 'public'
  /** 日历颜色，颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效 */
  color?: number
  /** 日历备注名，修改或添加后仅对当前身份生效 */
  summary_alias?: string
}

export interface SearchCalendarRequest {
  /** 搜索关键字 */
  query: string
}

export interface CreateCalendarCalendarAclRequest {
  /** 对日历的访问权限 */
  role: 'unknown' | 'free_busy_reader' | 'reader' | 'writer' | 'owner'
  /** 权限范围 */
  scope: AclScope
}

export interface CreateCalendarCalendarAclQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListCalendarCalendarAclQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateCalendarCalendarEventRequest {
  /** 日程标题 */
  summary?: string
  /** 日程描述 */
  description?: string
  /** 是否发送通知消息 */
  need_notification?: boolean
  /** 日程开始时间 */
  start_time: TimeInfo
  /** 日程结束时间 */
  end_time: TimeInfo
  /** 视频会议信息，仅当日程至少有一位attendee时生效 */
  vchat?: Vchat
  /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  visibility?: 'default' | 'public' | 'private'
  /** 参与人权限 */
  attendee_ability?: 'none' | 'can_see_others' | 'can_invite_others' | 'can_modify_event'
  /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  free_busy_status?: 'busy' | 'free'
  /** 日程地点 */
  location?: EventLocation
  /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
  color?: number
  /** 日程提醒列表 */
  reminders?: Reminder[]
  /** 重复日程的重复性规则 */
  recurrence?: string
  /** 日程自定义信息 */
  schemas?: Schema[]
  /** 日程附件 */
  attachments?: Attachment[]
}

export interface CreateCalendarCalendarEventQuery {
  /** 幂等唯一key */
  idempotency_key?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteCalendarCalendarEventQuery {
  /** 删除日程是否给日程参与人发送bot通知，默认为true */
  need_notification?: 'true' | 'false'
}

export interface PatchCalendarCalendarEventRequest {
  /** 日程标题 */
  summary?: string
  /** 日程描述 */
  description?: string
  /** 是否发送通知消息 */
  need_notification?: boolean
  /** 日程开始时间 */
  start_time?: TimeInfo
  /** 日程结束时间 */
  end_time?: TimeInfo
  /** 视频会议信息，仅当日程至少有一位attendee时生效 */
  vchat?: Vchat
  /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  visibility?: 'default' | 'public' | 'private'
  /** 参与人权限 */
  attendee_ability?: 'none' | 'can_see_others' | 'can_invite_others' | 'can_modify_event'
  /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
  free_busy_status?: 'busy' | 'free'
  /** 日程地点 */
  location?: EventLocation
  /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
  color?: number
  /** 日程提醒列表 */
  reminders?: Reminder[]
  /** 重复日程的重复性规则 */
  recurrence?: string
  /** 日程自定义信息 */
  schemas?: Schema[]
  /** 日程附件 */
  attachments?: Attachment[]
}

export interface PatchCalendarCalendarEventQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetCalendarCalendarEventQuery {
  /** 是否需要返回会前设置 */
  need_meeting_settings?: boolean
  /** 是否需要返回参与人信息 */
  need_attendee?: boolean
  /** 返回的最大参与人数量 */
  max_attendee_num?: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListCalendarCalendarEventQuery {
  /** 拉取anchor_time之后的日程，为timestamp */
  anchor_time?: string
  /** 上次请求Response返回的增量同步标记，分页请求未结束时为空 */
  sync_token?: string
  /** 日程开始Unix时间戳，单位为秒 */
  start_time?: string
  /** 日程结束Unix时间戳，单位为秒 */
  end_time?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SearchCalendarCalendarEventRequest {
  /** 搜索关键字 */
  query: string
  /** 搜索过滤器 */
  filter?: EventSearchFilter
}

export interface SearchCalendarCalendarEventQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ReplyCalendarCalendarEventRequest {
  /** rsvp-日程状态 */
  rsvp_status: 'accept' | 'decline' | 'tentative'
}

export interface InstancesCalendarCalendarEventQuery {
  /** 日程实例开始Unix时间戳，单位为秒,日程的end_time的下限（不包含） */
  start_time: string
  /** 日程实例结束Unix时间戳，单位为秒,日程的start_time上限（不包含） */
  end_time: string
}

export interface InstanceViewCalendarCalendarEventQuery {
  /** 日程开始Unix时间戳，单位为秒 */
  start_time: string
  /** 日程结束Unix时间戳，单位为秒 */
  end_time: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteCalendarCalendarEventMeetingChatQuery {
  /** 会议群ID */
  meeting_chat_id: string
}

export interface CreateCalendarTimeoffEventRequest {
  /** 用户的user id */
  user_id: string
  /** 休假人的时区 */
  timezone: string
  /** 休假开始时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，且与end_time对应，不符合将返回错误 */
  start_time: string
  /** 休假结束时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，与start_time对应，不符合将返回错误 */
  end_time: string
  /** 休假日程标题，可自定义例如："请假中(全天) / 1-Day Time Off"，"请假中(半天) / 0.5-Day Time Off"，"长期休假中 / Leave of Absence"，"请假中" */
  title?: string
  /** 休假日程描述，可自定义,例如："若拒绝或删除此日程，飞书中相应的“请假”标签将自动消失，而请假系统中的休假申请不会被撤销。If the event is rejected or deleted, corresponding "On Leave" tag in Feishu will disappear, while the leave request in the time off system will not be revoked." */
  description?: string
}

export interface CreateCalendarTimeoffEventQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateCalendarCalendarEventAttendeeRequest {
  /** 新增参与人列表；<br>- 单次请求会议室的数量限制为100。 */
  attendees?: CalendarEventAttendee[]
  /** 是否给参与人发送bot通知 默认为true */
  need_notification?: boolean
  /** 使用管理员身份访问时要修改的实例(仅用于重复日程修改其中的一个实例，非重复日程无需填此字段) */
  instance_start_time_admin?: string
  /** 是否启用管理员身份(需先在管理后台设置某人为会议室管理员) */
  is_enable_admin?: boolean
  /** 是否添加会议室operate_id标识的用户到参与人 */
  add_operator_to_attendee?: boolean
}

export interface CreateCalendarCalendarEventAttendeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchDeleteCalendarCalendarEventAttendeeRequest {
  /** 要移除的参与人 ID 列表。参见[参与人ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/introduction#4998889c) */
  attendee_ids?: string[]
  /** 需要删除的参与人类型实体ID，作为attendee_ids字段的补充。 */
  delete_ids?: CalendarEventAttendeeId[]
  /** 删除日程参与人时是否要给参与人发送bot通知，默认为true */
  need_notification?: boolean
  /** 使用管理员身份访问时要修改的实例 */
  instance_start_time_admin?: string
  /** 是否启用管理员身份(需先在管理后台设置某人为会议室管理员) */
  is_enable_admin?: boolean
}

export interface BatchDeleteCalendarCalendarEventAttendeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListCalendarCalendarEventAttendeeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 是否需要会议室表单信息 */
  need_resource_customization?: boolean
}

export interface ListCalendarCalendarEventAttendeeChatMemberQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GenerateCaldavConfCalendarSettingRequest {
  /** 需要同步日历的设备名，在日历中展示用来管理密码 */
  device_name?: string
}

export interface CreateCalendarExchangeBindingRequest {
  /** admin账户 */
  admin_account?: string
  /** 用户绑定的Exchange账户 */
  exchange_account?: string
  /** Exchange账户绑定user唯一标识id */
  user_id?: string
}

export interface CreateCalendarExchangeBindingQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetCalendarExchangeBindingQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateCalendarResponse {
  /** 日历信息 */
  calendar?: Calendar
}

export interface PrimaryCalendarResponse {
  /** 主日历列表 */
  calendars?: UserCalendar[]
}

export interface GetCalendarResponse {
  /** 日历OpenId */
  calendar_id: string
  /** 日历标题 */
  summary?: string
  /** 日历描述 */
  description?: string
  /** 权限 */
  permissions?: 'private' | 'show_only_free_busy' | 'public'
  /** 日历颜色，颜色RGB值的int32表示。客户端展示时会映射到色板上最接近的一种颜色。仅对当前身份生效 */
  color?: number
  /** 日历类型 */
  type?: 'unknown' | 'primary' | 'shared' | 'google' | 'resource' | 'exchange'
  /** 日历备注名，修改或添加后仅对当前身份生效 */
  summary_alias?: string
  /** 对于当前身份，日历是否已经被标记为删除 */
  is_deleted?: boolean
  /** 当前日历是否是第三方数据；三方日历及日程只支持读，不支持写入 */
  is_third_party?: boolean
  /** 当前身份对于该日历的访问权限 */
  role?: 'unknown' | 'free_busy_reader' | 'reader' | 'writer' | 'owner'
}

export interface ListCalendarFreebusyResponse {
  /** 日历上请求时间区间内的忙闲信息 */
  freebusy_list?: Freebusy[]
}

export interface ListCalendarResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下次请求需要带上的分页标记，90 天有效期 */
  page_token?: string
  /** 下次请求需要带上的增量同步标记，90 天有效期 */
  sync_token?: string
  /** 分页加载的日历数据列表 */
  calendar_list?: Calendar[]
}

export interface PatchCalendarResponse {
  /** 日历信息 */
  calendar?: Calendar
}

export interface SearchCalendarResponse {
  /** 搜索命中的日历列表 */
  items?: Calendar[]
  /** 下次请求需要带上的分页标记 */
  page_token?: string
}

export interface SubscribeCalendarResponse {
  /** 日历信息 */
  calendar?: Calendar
}

export interface CreateCalendarCalendarAclResponse {
  /** acl资源ID */
  acl_id: string
  /** 对日历的访问权限 */
  role: 'unknown' | 'free_busy_reader' | 'reader' | 'writer' | 'owner'
  /** 权限范围 */
  scope: AclScope
}

export interface CreateCalendarCalendarEventResponse {
  /** 日程信息 */
  event?: CalendarEvent
}

export interface PatchCalendarCalendarEventResponse {
  /** 日程信息 */
  event?: CalendarEvent
}

export interface GetCalendarCalendarEventResponse {
  /** 日程信息 */
  event?: CalendarEvent
}

export interface ListCalendarCalendarEventResponse {
  /** 是否有下一页数据 */
  has_more?: boolean
  /** 下次请求需要带上的分页标记，90 天有效期 */
  page_token?: string
  /** 下次请求需要带上的增量同步标记，90 天有效期 */
  sync_token?: string
  /** 日程列表 */
  items?: CalendarEvent[]
}

export interface SearchCalendarCalendarEventResponse {
  /** 搜索命中的日程列表 */
  items?: CalendarEvent[]
  /** 下次请求需要带上的分页标记 */
  page_token?: string
}

export interface InstanceViewCalendarCalendarEventResponse {
  /** 日程instance列表 */
  items?: Instance[]
}

export interface CreateCalendarCalendarEventMeetingChatResponse {
  /** 会议群ID */
  meeting_chat_id?: string
  /** 群分享链接 */
  applink?: string
}

export interface CreateCalendarCalendarEventMeetingMinuteResponse {
  /** 文档URL */
  doc_url?: string
}

export interface CreateCalendarTimeoffEventResponse {
  /** 休假申请的唯一标识id */
  timeoff_event_id: string
  /** 用户的user id */
  user_id: string
  /** 休假人的时区 */
  timezone: string
  /** 休假开始时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，且与end_time对应，不符合将返回错误 */
  start_time: string
  /** 休假结束时间（时间戳）/日期（2021-01-01），为日期时将生成全天日程，与start_time对应，不符合将返回错误 */
  end_time: string
  /** 休假日程标题，可自定义例如："请假中(全天) / 1-Day Time Off"，"请假中(半天) / 0.5-Day Time Off"，"长期休假中 / Leave of Absence"，"请假中" */
  title?: string
  /** 休假日程描述，可自定义,例如："若拒绝或删除此日程，飞书中相应的“请假”标签将自动消失，而请假系统中的休假申请不会被撤销。If the event is rejected or deleted, corresponding "On Leave" tag in Feishu will disappear, while the leave request in the time off system will not be revoked." */
  description?: string
}

export interface CreateCalendarCalendarEventAttendeeResponse {
  /** 被添加的参与人列表 */
  attendees?: CalendarEventAttendee[]
}

export interface GenerateCaldavConfCalendarSettingResponse {
  /** caldav密码 */
  password?: string
  /** caldav用户名 */
  user_name?: string
  /** 服务器地址 */
  server_address?: string
  /** 设备名 */
  device_name?: string
}

export interface CreateCalendarExchangeBindingResponse {
  /** admin账户 */
  admin_account?: string
  /** 用户绑定的Exchange账户 */
  exchange_account?: string
  /** Exchange账户绑定user唯一标识id */
  user_id?: string
  /** Exchange账户同步状态 */
  status?: 'doing' | 'cal_done' | 'timespan_done' | 'done' | 'err'
  /** exchange绑定唯一标识id */
  exchange_binding_id: string
}

export interface GetCalendarExchangeBindingResponse {
  /** admin账户 */
  admin_account?: string
  /** 用户绑定的Exchange账户 */
  exchange_account?: string
  /** Exchange账户绑定user唯一标识id */
  user_id?: string
  /** Exchange账户同步状态 */
  status?: 'doing' | 'cal_done' | 'timespan_done' | 'done' | 'err'
  /** Exchange绑定关系唯一标识ID */
  exchange_binding_id?: string
}

Internal.define({
  '/open-apis/calendar/v4/calendars': {
    POST: 'createCalendar',
    GET: 'listCalendar',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}': {
    DELETE: 'deleteCalendar',
    GET: 'getCalendar',
    PATCH: 'patchCalendar',
  },
  '/open-apis/calendar/v4/calendars/primary': {
    POST: 'primaryCalendar',
  },
  '/open-apis/calendar/v4/freebusy/list': {
    POST: 'listCalendarFreebusy',
  },
  '/open-apis/calendar/v4/calendars/search': {
    POST: 'searchCalendar',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/subscribe': {
    POST: 'subscribeCalendar',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/unsubscribe': {
    POST: 'unsubscribeCalendar',
  },
  '/open-apis/calendar/v4/calendars/subscription': {
    POST: 'subscriptionCalendar',
  },
  '/open-apis/calendar/v4/calendars/unsubscription': {
    POST: 'unsubscriptionCalendar',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/acls': {
    POST: 'createCalendarCalendarAcl',
    GET: { name: 'listCalendarCalendarAcl', pagination: { argIndex: 1, itemsKey: 'acls' } },
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/acls/{acl_id}': {
    DELETE: 'deleteCalendarCalendarAcl',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/acls/subscription': {
    POST: 'subscriptionCalendarCalendarAcl',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/acls/unsubscription': {
    POST: 'unsubscriptionCalendarCalendarAcl',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events': {
    POST: 'createCalendarCalendarEvent',
    GET: 'listCalendarCalendarEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}': {
    DELETE: 'deleteCalendarCalendarEvent',
    PATCH: 'patchCalendarCalendarEvent',
    GET: 'getCalendarCalendarEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/search': {
    POST: 'searchCalendarCalendarEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/subscription': {
    POST: 'subscriptionCalendarCalendarEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/unsubscription': {
    POST: 'unsubscriptionCalendarCalendarEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}/reply': {
    POST: 'replyCalendarCalendarEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}/instances': {
    GET: { name: 'instancesCalendarCalendarEvent', pagination: { argIndex: 2 } },
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/instance_view': {
    GET: 'instanceViewCalendarCalendarEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}/meeting_chat': {
    POST: 'createCalendarCalendarEventMeetingChat',
    DELETE: 'deleteCalendarCalendarEventMeetingChat',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}/meeting_minute': {
    POST: 'createCalendarCalendarEventMeetingMinute',
  },
  '/open-apis/calendar/v4/timeoff_events': {
    POST: 'createCalendarTimeoffEvent',
  },
  '/open-apis/calendar/v4/timeoff_events/{timeoff_event_id}': {
    DELETE: 'deleteCalendarTimeoffEvent',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees': {
    POST: 'createCalendarCalendarEventAttendee',
    GET: { name: 'listCalendarCalendarEventAttendee', pagination: { argIndex: 2 } },
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees/batch_delete': {
    POST: 'batchDeleteCalendarCalendarEventAttendee',
  },
  '/open-apis/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees/{attendee_id}/chat_members': {
    GET: { name: 'listCalendarCalendarEventAttendeeChatMember', pagination: { argIndex: 3 } },
  },
  '/open-apis/calendar/v4/settings/generate_caldav_conf': {
    POST: 'generateCaldavConfCalendarSetting',
  },
  '/open-apis/calendar/v4/exchange_bindings': {
    POST: 'createCalendarExchangeBinding',
  },
  '/open-apis/calendar/v4/exchange_bindings/{exchange_binding_id}': {
    DELETE: 'deleteCalendarExchangeBinding',
    GET: 'getCalendarExchangeBinding',
  },
})
