import { Internal } from "../internal";
// GENERATED CONTENT

export interface GetMeetingRoomsScheduleParams {
  /** 待查询的会议室roomId列表，建议不超过5个。 */
  roomIds: string[];
  /** 查询开始时间，iso8601格式，例如：2022-07-29T14:55Z。 */
  startTime: string;
  /** 查询结束时间，iso8601格式，例如：2022-07-29T14:55Z。 */
  endTime: string;
}

export interface GetMeetingRoomsScheduleResponse {
  scheduleInformation?: {
    roomId?: string;
    error?: string;
    scheduleItems?: number;
  }[];
}

export interface AddMeetingRoomsParams {
  /** 需要预定的会议室roomId列表，一个日程最多添加5个会议室。 */
  meetingRoomsToAdd: object[];
}

export interface AddMeetingRoomsResponse {
  result?: unknown;
}

export interface RemoveMeetingRoomsParams {
  /** 需要取消预定的会议室信息。 */
  meetingRoomsToRemove?: object[];
}

export interface RemoveMeetingRoomsResponse {
  result?: unknown;
}

export interface UnsubscribeCalendarResponse {
  result?: unknown;
}

export interface DeleteSubscribedCalendarResponse {
  result?: unknown;
}

export interface GetSubscribedCalendarResponse {
  calendarId?: string;
  name?: string;
  description?: string;
  author?: string;
  managers?: string[];
  subscribeScope?: {
    unionIds?: number;
    openConversationIds?: number;
    corpIds?: number;
  };
}

export interface CreateSubscribedCalendarParams {
  /** 订阅日历的名称。 */
  name: string;
  /** 订阅日历的描述，最大长度1024字符。 */
  description?: string;
  /** 订阅日历共同编辑人的unionId。 */
  managers?: string[];
  /** 可订阅该日历的对象。 */
  subscribeScope: unknown;
}

export interface CreateSubscribedCalendarResponse {
  calendarId?: string;
}

export interface SignOutResponse {
  checkOutTime?: number;
}

export interface GetSignOutListQuery {
  /** 查询返回结果数，最大值500。 */
  maxResults: number;
  /** 分页游标。 */
  nextToken?: string;
  /** 签退信息类型。 */
  type: string;
}

export interface GetSignOutListResponse {
  nextToken?: string;
  users?: {
    userId?: string;
    displayName?: string;
    checkOutTime?: number;
  }[];
}

export interface ListAttendeesQuery {
  /** 最大返回记录数，默认值100，最大值500。 */
  maxResults?: number;
  /** 分页游标。 */
  nextToken?: string;
}

export interface ListAttendeesResponse {
  nextToken?: string;
  attendees?: {
    id?: string;
    displayName?: string;
    responseStatus?: string;
    self?: number;
    isOptional?: number;
  }[];
}

export interface SignInResponse {
  checkInTime?: number;
}

export interface ListAclsResponse {
  acls?: {
    privilege?: string;
    aclId?: string;
    scope?: number;
  }[];
}

export interface CreateAclsParams {
  /** 权限信息，取值： */
  privilege: string;
  /** 是否向授权人发消息。 */
  sendMsg: unknown;
  /** 权限范围。 */
  scope: unknown;
}

export interface CreateAclsResponse {
  privilege?: string;
  aclId?: string;
  scope?: {
    scopeType?: string;
    userId?: string;
  };
}

export interface GetSignInListQuery {
  /** 查询返回结果数，最大值500。 */
  maxResults: number;
  /** 分页游标。 */
  nextToken?: string;
  /** 签到信息类型，取值： */
  type: string;
}

export interface GetSignInListResponse {
  nextToken?: string;
  users?: {
    userId?: string;
    displayName?: string;
    checkInTime?: number;
  }[];
}

export interface ListCalendarsResponse {
  response?: {
    calendars: number;
  };
}

export interface GetScheduleParams {
  /** 查询目标用户的unionId，可通过[根据userid获取用户详情](https://developers.dingtalk.com/document/app/query-user-details)接口获取。 */
  userIds: string[];
  /** 查询的开始时间。 */
  startTime: string;
  /** 查询的结束时间。 */
  endTime: string;
}

export interface GetScheduleResponse {
  scheduleInformation?: {
    userId?: string;
    error?: string;
    scheduleItems?: number;
  }[];
}

export interface ListEventsQuery {
  /** 日程开始时间的最小值，格式为ISO-8601的date-time格式，可不填。 */
  timeMin?: string;
  /** 日程开始时间的最大值，格式为ISO-8601的date-time格式，可不填。 */
  timeMax?: string;
  /** 是否返回已取消/删除的日程。 */
  showDeleted?: unknown;
  /** 最大返回记录数，最大值100，默认值100。 */
  maxResults?: number;
  /** 每个日程的参与者查询个数，默认100，最大100。 */
  maxAttendees?: number;
  /** 分页游标。 */
  nextToken?: string;
  /** 同步token，用于增量数据同步场景，一个查询条件已经返回全部数据后（如果数据比较多会分页返回，调用方需要连续使用nextToken查询，直到所有分页都查完nextToken返回null之后），会返回一个syncToken，下次带着该token来查询会返回两次查询之间发生变更的增量数据。 */
  syncToken?: string;
}

export interface ListEventsResponse {
  nextToken?: string;
  events?: {
    id?: string;
    summary?: string;
    description?: string;
    start?: number;
    originStart?: number;
    end?: number;
    isAllDay?: number;
    recurrence?: number;
    attendees?: number;
    organizer?: number;
    location?: number;
    seriesMasterId?: string;
    createTime?: string;
    updateTime?: string;
    status?: string;
    onlineMeetingInfo?: number;
    reminders?: number;
    extendedProperties?: number;
    meetingRooms?: number;
    categories?: number;
    richTextDescription?: number;
  }[];
  syncToken?: string;
}

export interface GetEventQuery {
  /** 最大参与人数，默认值100，最大值500。 */
  maxAttendees?: number;
}

export interface GetEventResponse {
  id?: string;
  summary?: string;
  description?: string;
  status: string;
  start?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  originStart?: {
    dateTime?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  isAllDay?: unknown;
  recurrence?: {
    pattern?: number;
    range?: number;
  };
  attendees?: {
    id?: string;
    displayName?: string;
    responseStatus?: string;
    self?: number;
    isOptional?: number;
  }[];
  organizer?: {
    id?: string;
    displayName?: string;
    responseStatus?: string;
    self?: number;
  };
  location?: {
    displayName?: string;
    meetingRooms?: number;
  };
  seriesMasterId?: string;
  createTime?: string;
  updateTime?: string;
  reminders?: {
    method?: string;
    minutes?: string;
  }[];
  onlineMeetingInfo?: {
    type?: string;
    conferenceId?: string;
    url?: string;
    extraInfo?: number;
  };
  extendedProperties?: {
    sharedProperties?: number;
  };
  meetingRooms?: {
    roomId?: string;
    responseStatus?: string;
    displayName?: string;
  }[];
  categories?: {
    displayName?: string;
  }[];
  richTextDescription?: {
    text?: string;
  };
}

export interface AddAttendeeParams {
  /** 参与人信息。 */
  attendeesToAdd: object[];
}

export interface RemoveAttendeeParams {
  /** 日程参与人列表。 */
  attendeesToRemove?: object[];
}

export interface CreateEventParams {
  /** 日程标题，最大不超过2048个字符。 */
  summary: string;
  /** 日程描述，最大不超过5000个字符。 */
  description?: string;
  /** 日程开始时间。 */
  start: unknown;
  /** 日程结束时间。 */
  end?: unknown;
  /** 是否全天日程。 */
  isAllDay?: unknown;
  /** 日程循环规则。 */
  recurrence?: unknown;
  /** 日程参与人列表，最多支持500个参与人。 */
  attendees?: object[];
  /** 日程地点。 */
  location?: unknown;
  /** 日程提醒，可以添加多个，如果不传默认提醒时间为： */
  reminders?: object[];
  /** 创建日程同时创建线上会议。 */
  onlineMeetingInfo?: unknown;
  /** JSON格式的扩展能力开关，选填，具体属性定义如下： */
  extra?: unknown;
}

export interface CreateEventResponse {
  id?: string;
  summary?: string;
  description?: string;
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  isAllDay?: unknown;
  recurrence?: {
    pattern?: number;
    range?: number;
  };
  attendees?: {
    id?: string;
    displayName?: string;
    responseStatus?: string;
    self?: number;
    isOptional?: number;
  }[];
  organizer?: {
    id?: string;
    displayName?: string;
    responseStatus?: string;
    self?: number;
  };
  location?: {
    displayName?: string;
  };
  reminders?: {
    method?: string;
    minutes?: string;
  }[];
  createTime?: string;
  updateTime?: string;
  onlineMeetingInfo?: {
    type?: string;
    conferenceId?: string;
    url?: string;
    extraInfo?: number;
  };
  uiConfigs?: {
    uiName?: string;
    uiStatus?: string;
  }[];
  richTextDescription?: {
    text?: string;
  };
}

export interface ListEventsViewQuery {
  /** 查询开始时间，格式为ISO-8601的date-time格式。 */
  timeMin?: string;
  /** 查询截止时间，格式为ISO-8601的date-time格式。 */
  timeMax?: string;
  /** 最大返回记录数，最大值100，默认值100。 */
  maxResults?: number;
  /** 每个日程的参与者查询个数，默认100，最大100。如果参会人数超过100人，需要拉取全部参会人请使用 */
  maxAttendees?: number;
  /** 分页游标。 */
  nextToken?: string;
}

export interface ListEventsViewResponse {
  nextToken?: string;
  events?: {
    id?: string;
    summary?: string;
    description?: string;
    start?: number;
    originStart?: number;
    end?: number;
    isAllDay?: number;
    recurrence?: number;
    attendees?: number;
    organizer?: number;
    location?: number;
    seriesMasterId?: string;
    createTime?: string;
    updateTime?: string;
    status?: string;
    extendedProperties?: number;
    onlineMeetingInfo?: number;
    categories?: number;
    richTextDescription?: number;
    meetingRooms?: number;
  }[];
}

export interface RespondEventParams {
  /** 响应状态： */
  responseStatus: string;
}

export interface PatchEventParams {
  /** 日程标题。 */
  summary?: string;
  /** 日程ID。 */
  id: string;
  /** 日程描述。 */
  description?: string;
  /** 日程开始时间。 */
  start?: unknown;
  /** 日程结束时间。 */
  end?: unknown;
  /** 是否全天日程。 */
  isAllDay?: unknown;
  /** 日程循环规则。 */
  recurrence?: unknown;
  /** 参会人。 */
  attendees?: object[];
  /** 日程地点。 */
  location?: unknown;
  /** JSON格式的扩展能力开关，选填，具体属性定义如下。 */
  extra?: unknown;
  /** 单个日程提醒记录。 */
  reminders?: object[];
  /** 视频会议。 */
  onlineMeetingInfo?: unknown;
}

export interface PatchEventResponse {
  id?: string;
  summary?: string;
  description?: string;
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  isAllDay?: unknown;
  recurrence?: {
    pattern?: number;
    range?: number;
  };
  attendees?: {
    id?: string;
    displayName?: string;
    responseStatus?: string;
    self?: number;
    isOptional?: number;
  }[];
  organizer?: {
    id?: string;
    displayName?: string;
    responseStatus?: string;
    self?: number;
  };
  location?: {
    displayName?: string;
    meetingRooms?: number;
  };
  reminders?: {
    method?: string;
    minutes?: string;
  }[];
  createTime?: string;
  updateTime?: string;
  onlineMeetingInfo?: {
    type?: string;
    conferenceId?: string;
    url?: string;
  };
  richTextDescription?: {
    text?: string;
  };
  uiConfigs?: {
    uiName: string;
    uiStatus: string;
  }[];
}

// funcName: isOldApi
Internal.define({
  "/calendar/users/{userId}/meetingRooms/schedules/query": {
    POST: { getMeetingRoomsSchedule: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}/meetingRooms":
    { POST: { addMeetingRooms: false } },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}/meetingRooms/batchRemove":
    { POST: { removeMeetingRooms: false } },
  "/calendar/users/{userId}/calendars/{calendarId}/unsubscribe": {
    POST: { unsubscribeCalendar: false },
  },
  "/calendar/users/{userId}/subscribedCalendars/{calendarId}": {
    DELETE: { deleteSubscribedCalendar: false },
    GET: { getSubscribedCalendar: false },
  },
  "/calendar/users/{userId}/subscribedCalendars": {
    POST: { createSubscribedCalendar: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}/signOut": {
    POST: { signOut: false },
    GET: { getSignOutList: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/subscribe": {
    POST: { subscribeCalendar: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}/attendees":
    { GET: { listAttendees: false }, POST: { addAttendee: false } },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}/signin": {
    POST: { signIn: false },
    GET: { getSignInList: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/acls": {
    GET: { listAcls: false },
    POST: { createAcls: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/acls/{aclId}": {
    DELETE: { deleteAcl: false },
  },
  "/calendar/users/{userId}/calendars": { GET: { listCalendars: false } },
  "/calendar/users/{userId}/querySchedule": { POST: { getSchedule: false } },
  "/calendar/users/{userId}/calendars/{calendarId}/events": {
    GET: { listEvents: false },
    POST: { createEvent: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}": {
    GET: { getEvent: false },
    DELETE: { deleteEvent: false },
    PUT: { patchEvent: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}/attendees/batchRemove":
    { POST: { removeAttendee: false } },
  "/calendar/users/{userId}/calendars/{calendarId}/eventsview": {
    GET: { listEventsView: false },
  },
  "/calendar/users/{userId}/calendars/{calendarId}/events/{eventId}/respond": {
    POST: { respondEvent: false },
  },
});
declare module "../internal" {
  interface Internal {
    /**
     * 查询会议室忙闲
     * @see https://developers.dingtalk.com/document/isvapp/queries-free-and-busy-meeting-room-information
     */
    getMeetingRoomsSchedule(
      userId: string,
      params: GetMeetingRoomsScheduleParams,
    ): Promise<GetMeetingRoomsScheduleResponse>;
    /**
     * 添加会议室
     * @see https://developers.dingtalk.com/document/app/add-a-meeting-room
     */
    addMeetingRooms(
      userId: string,
      calendarId: string,
      eventId: string,
      params: AddMeetingRoomsParams,
    ): Promise<AddMeetingRoomsResponse>;
    /**
     * 删除会议室
     * @see https://developers.dingtalk.com/document/isvapp/cancel-a-meeting-room-reservation
     */
    removeMeetingRooms(
      userId: string,
      calendarId: string,
      eventId: string,
      params: RemoveMeetingRoomsParams,
    ): Promise<RemoveMeetingRoomsResponse>;
    /**
     * 取消订阅公共日历
     * @see https://developers.dingtalk.com/document/orgapp/unsubscribe-from-a-public-calendar
     */
    unsubscribeCalendar(
      userId: string,
      calendarId: string,
    ): Promise<UnsubscribeCalendarResponse>;
    /**
     * 删除订阅日历
     * @see https://developers.dingtalk.com/document/isvapp/delete-subscription-calendar
     */
    deleteSubscribedCalendar(
      userId: string,
      calendarId: string,
    ): Promise<DeleteSubscribedCalendarResponse>;
    /**
     * 查询单个订阅日历详情
     * @see https://developers.dingtalk.com/document/isvapp/query-a-single-subscription-calendar
     */
    getSubscribedCalendar(
      userId: string,
      calendarId: string,
    ): Promise<GetSubscribedCalendarResponse>;
    /**
     * 创建订阅日历
     * @see https://developers.dingtalk.com/document/isvapp/create-subscription-calendar
     */
    createSubscribedCalendar(
      userId: string,
      params: CreateSubscribedCalendarParams,
    ): Promise<CreateSubscribedCalendarResponse>;
    /**
     * 针对单个日程进行签退
     * @see https://developers.dingtalk.com/document/isvapp/sign-off-for-a-single-schedule
     */
    signOut(
      userId: string,
      calendarId: string,
      eventId: string,
    ): Promise<SignOutResponse>;
    /**
     * 查看单个日程的签退详情
     * @see https://developers.dingtalk.com/document/isvapp/view-the-billing-details-of-a-single-schedule
     */
    getSignOutList(
      userId: string,
      calendarId: string,
      eventId: string,
      query: GetSignOutListQuery,
    ): Promise<GetSignOutListResponse>;
    /**
     * 订阅公共日历
     * @see https://developers.dingtalk.com/document/orgapp/subscribe-to-a-public-calendar
     */
    subscribeCalendar(userId: string, calendarId: string): Promise<void>;
    /**
     * 获取日程参与者
     * @see https://developers.dingtalk.com/document/isvapp/query-schedule-participants
     */
    listAttendees(
      userId: string,
      calendarId: string,
      eventId: string,
      query: ListAttendeesQuery,
    ): Promise<ListAttendeesResponse>;
    /**
     * 针对单个日程进行签到
     * @see https://developers.dingtalk.com/document/orgapp-server/sign-in-for-a-single-schedule
     */
    signIn(
      userId: string,
      calendarId: string,
      eventId: string,
    ): Promise<SignInResponse>;
    /**
     * 获取访问控制列表
     * @see https://developers.dingtalk.com/document/personalapp/get-access-control-list
     */
    listAcls(userId: string, calendarId: string): Promise<ListAclsResponse>;
    /**
     * 删除访问控制
     * @see https://developers.dingtalk.com/document/personalapp/delete-access-control
     */
    deleteAcl(userId: string, calendarId: string, aclId: string): Promise<void>;
    /**
     * 创建访问控制
     * @see https://developers.dingtalk.com/document/personalapp/create-access-control
     */
    createAcls(
      userId: string,
      calendarId: string,
      params: CreateAclsParams,
    ): Promise<CreateAclsResponse>;
    /**
     * 查看单个日程的签到详情
     * @see https://developers.dingtalk.com/document/isvapp/view-the-check-in-details-of-a-single-schedule
     */
    getSignInList(
      userId: string,
      calendarId: string,
      eventId: string,
      query: GetSignInListQuery,
    ): Promise<GetSignInListResponse>;
    /**
     * 查询日历
     * @see https://developers.dingtalk.com/document/isvapp/query-the-calendar
     */
    listCalendars(userId: string): Promise<ListCalendarsResponse>;
    /**
     * 获取用户忙闲信息
     * @see https://developers.dingtalk.com/document/isvapp/free-schedule
     */
    getSchedule(
      userId: string,
      params: GetScheduleParams,
    ): Promise<GetScheduleResponse>;
    /**
     * 查询日程列表
     * @see https://developers.dingtalk.com/document/personalapp/query-an-event-list-1
     */
    listEvents(
      userId: string,
      calendarId: string,
      query: ListEventsQuery,
    ): Promise<ListEventsResponse>;
    /**
     * 查询日程列表
     * @see https://developers.dingtalk.com/document/personalapp/query-a-single-schedule
     */
    getEvent(
      userId: string,
      calendarId: string,
      eventId: string,
      query: GetEventQuery,
    ): Promise<GetEventResponse>;
    /**
     * 新增日程参与人
     * @see https://developers.dingtalk.com/document/isvapp/add-schedule-participant
     */
    addAttendee(
      userId: string,
      calendarId: string,
      eventId: string,
      params: AddAttendeeParams,
    ): Promise<void>;
    /**
     * 删除日程参与人
     * @see https://developers.dingtalk.com/document/isvapp/delete-schedule-participant
     */
    removeAttendee(
      userId: string,
      calendarId: string,
      eventId: string,
      params: RemoveAttendeeParams,
    ): Promise<void>;
    /**
     * 删除指定日程
     * @see https://developers.dingtalk.com/document/isvapp/delete-schedule
     */
    deleteEvent(
      userId: string,
      calendarId: string,
      eventId: string,
    ): Promise<void>;
    /**
     * 创建日程
     * @see https://developers.dingtalk.com/document/personalapp/create-schedule
     */
    createEvent(
      userId: string,
      calendarId: string,
      params: CreateEventParams,
    ): Promise<CreateEventResponse>;
    /**
     * 查询日程视图列表以查看闲忙，展开循环日程
     * @see https://developers.dingtalk.com/document/personalapp/query-schedule-view-1
     */
    listEventsView(
      userId: string,
      calendarId: string,
      query: ListEventsViewQuery,
    ): Promise<ListEventsViewResponse>;
    /**
     * 回复日程邀请
     * @see https://developers.dingtalk.com/document/isvapp/participants-respond-to-schedule-invitations
     */
    respondEvent(
      userId: string,
      calendarId: string,
      eventId: string,
      params: RespondEventParams,
    ): Promise<void>;
    /**
     * 修改日程
     * @see https://developers.dingtalk.com/document/personalapp/modify-schedule
     */
    patchEvent(
      userId: string,
      calendarId: string,
      eventId: string,
      params: PatchEventParams,
    ): Promise<PatchEventResponse>;
  }
}
