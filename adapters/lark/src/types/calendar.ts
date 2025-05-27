import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    calendar: Calendar.Methods
  }
}

export namespace Calendar {
  export interface Methods {
    freebusy: Freebusy.Methods
    acl: Acl.Methods
    event: Event.Methods
    timeoffEvent: TimeoffEvent.Methods
    setting: Setting.Methods
    exchangeBinding: ExchangeBinding.Methods
    /**
     * 创建共享日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/create
     */
    create(body: CreateRequest): Promise<CreateResponse>
    /**
     * 删除共享日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/delete
     */
    delete(calendar_id: string): Promise<void>
    /**
     * 查询主日历信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary
     */
    primary(query?: PrimaryQuery): Promise<PrimaryResponse>
    /**
     * 查询日历信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get
     */
    get(calendar_id: string): Promise<GetResponse>
    /**
     * 查询日历列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list
     */
    list(query?: ListQuery): Promise<ListResponse>
    /**
     * 更新日历信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/patch
     */
    patch(calendar_id: string, body: PatchRequest): Promise<PatchResponse>
    /**
     * 搜索日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/search
     */
    search(body: SearchRequest, query?: Pagination): Promise<SearchResponse> & AsyncIterableIterator<Lark.Calendar>
    /**
     * 订阅日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscribe
     */
    subscribe(calendar_id: string): Promise<SubscribeResponse>
    /**
     * 取消订阅日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscribe
     */
    unsubscribe(calendar_id: string): Promise<void>
    /**
     * 订阅日历变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/subscription
     */
    subscription(): Promise<void>
    /**
     * 取消订阅日历变更事件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/unsubscription
     */
    unsubscription(): Promise<void>
  }

  export interface CreateRequest {
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

  export interface CreateResponse {
    /** 日历信息 */
    calendar?: Lark.Calendar
  }

  export interface PrimaryQuery {
    /** 此次调用中使用的用户ID的类型 */
    user_id_type?: 'user_id' | 'union_id' | 'open_id'
  }

  export interface PrimaryResponse {
    /** 主日历列表 */
    calendars?: Lark.UserCalendar[]
  }

  export interface GetResponse {
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

  export interface ListQuery extends Pagination {
    /** 上次请求Response返回的增量同步标记，分页请求未结束时为空 */
    sync_token?: string
  }

  export interface ListResponse {
    /** 是否有下一页数据 */
    has_more?: boolean
    /** 下次请求需要带上的分页标记，90 天有效期 */
    page_token?: string
    /** 下次请求需要带上的增量同步标记，90 天有效期 */
    sync_token?: string
    /** 分页加载的日历数据列表 */
    calendar_list?: Lark.Calendar[]
  }

  export interface PatchRequest {
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

  export interface PatchResponse {
    /** 日历信息 */
    calendar?: Lark.Calendar
  }

  export interface SearchRequest {
    /** 搜索关键字 */
    query: string
  }

  export interface SearchResponse {
    /** 搜索命中的日历列表 */
    items?: Lark.Calendar[]
    /** 下次请求需要带上的分页标记 */
    page_token?: string
  }

  export interface SubscribeResponse {
    /** 日历信息 */
    calendar?: Lark.Calendar
  }

  export namespace Freebusy {
    export interface Methods {
      /**
       * 查询主日历日程忙闲信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/freebusy/list
       */
      list(body: ListRequest, query?: ListQuery): Promise<ListResponse>
    }

    export interface ListRequest {
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

    export interface ListQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface ListResponse {
      /** 日历上请求时间区间内的忙闲信息 */
      freebusy_list?: Lark.Freebusy[]
    }
  }

  export namespace Acl {
    export interface Methods {
      /**
       * 创建访问控制
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/create
       */
      create(calendar_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除访问控制
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/delete
       */
      delete(calendar_id: string, acl_id: string): Promise<void>
      /**
       * 获取访问控制列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/list
       */
      list(calendar_id: string, query?: ListQuery): Paginated<Lark.CalendarAcl, 'acls'>
      /**
       * 订阅日历访问控制变更事件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/subscription
       */
      subscription(calendar_id: string): Promise<void>
      /**
       * 取消订阅日历访问控制变更事件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/unsubscription
       */
      unsubscription(calendar_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 对日历的访问权限 */
      role: 'unknown' | 'free_busy_reader' | 'reader' | 'writer' | 'owner'
      /** 权限范围 */
      scope: Lark.AclScope
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** acl资源ID */
      acl_id: string
      /** 对日历的访问权限 */
      role: 'unknown' | 'free_busy_reader' | 'reader' | 'writer' | 'owner'
      /** 权限范围 */
      scope: Lark.AclScope
    }

    export interface ListQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }
  }

  export namespace Event {
    export interface Methods {
      meetingChat: MeetingChat.Methods
      meetingMinute: MeetingMinute.Methods
      attendee: Attendee.Methods
      /**
       * 创建日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/create
       */
      create(calendar_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/delete
       */
      delete(calendar_id: string, event_id: string, query?: DeleteQuery): Promise<void>
      /**
       * 更新日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/patch
       */
      patch(calendar_id: string, event_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 获取日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get
       */
      get(calendar_id: string, event_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取日程列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list
       */
      list(calendar_id: string, query?: ListQuery): Promise<ListResponse>
      /**
       * 搜索日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/search
       */
      search(calendar_id: string, body: SearchRequest, query?: SearchQuery): Promise<SearchResponse> & AsyncIterableIterator<Lark.CalendarEvent>
      /**
       * 订阅日程变更事件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription
       */
      subscription(calendar_id: string): Promise<void>
      /**
       * 取消订阅日程变更事件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/unsubscription
       */
      unsubscription(calendar_id: string): Promise<void>
      /**
       * 回复日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/reply
       */
      reply(calendar_id: string, event_id: string, body: ReplyRequest): Promise<void>
      /**
       * 获取重复日程实例
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instances
       */
      instances(calendar_id: string, event_id: string, query?: InstancesQuery): Paginated<Lark.Instance>
      /**
       * 查询日程视图
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/instance_view
       */
      instanceView(calendar_id: string, query?: InstanceViewQuery): Promise<InstanceViewResponse>
    }

    export interface CreateRequest {
      /** 日程标题 */
      summary?: string
      /** 日程描述 */
      description?: string
      /** 是否发送通知消息 */
      need_notification?: boolean
      /** 日程开始时间 */
      start_time: Lark.TimeInfo
      /** 日程结束时间 */
      end_time: Lark.TimeInfo
      /** 视频会议信息，仅当日程至少有一位attendee时生效 */
      vchat?: Lark.Vchat
      /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
      visibility?: 'default' | 'public' | 'private'
      /** 参与人权限 */
      attendee_ability?: 'none' | 'can_see_others' | 'can_invite_others' | 'can_modify_event'
      /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
      free_busy_status?: 'busy' | 'free'
      /** 日程地点 */
      location?: Lark.EventLocation
      /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
      color?: number
      /** 日程提醒列表 */
      reminders?: Lark.Reminder[]
      /** 重复日程的重复性规则 */
      recurrence?: string
      /** 日程自定义信息 */
      schemas?: Lark.Schema[]
      /** 日程附件 */
      attachments?: Lark.Attachment[]
    }

    export interface CreateQuery {
      /** 幂等唯一key */
      idempotency_key?: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** 日程信息 */
      event?: Lark.CalendarEvent
    }

    export interface DeleteQuery {
      /** 删除日程是否给日程参与人发送bot通知，默认为true */
      need_notification?: 'true' | 'false'
    }

    export interface PatchRequest {
      /** 日程标题 */
      summary?: string
      /** 日程描述 */
      description?: string
      /** 是否发送通知消息 */
      need_notification?: boolean
      /** 日程开始时间 */
      start_time?: Lark.TimeInfo
      /** 日程结束时间 */
      end_time?: Lark.TimeInfo
      /** 视频会议信息，仅当日程至少有一位attendee时生效 */
      vchat?: Lark.Vchat
      /** 日程公开范围，新建日程默认为Default；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
      visibility?: 'default' | 'public' | 'private'
      /** 参与人权限 */
      attendee_ability?: 'none' | 'can_see_others' | 'can_invite_others' | 'can_modify_event'
      /** 日程占用的忙闲状态，新建日程默认为Busy；仅新建日程时对所有参与人生效，之后修改该属性仅对当前身份生效 */
      free_busy_status?: 'busy' | 'free'
      /** 日程地点 */
      location?: Lark.EventLocation
      /** 日程颜色，颜色RGB值的int32表示。仅对当前身份生效；客户端展示时会映射到色板上最接近的一种颜色；值为0或-1时默认跟随日历颜色。 */
      color?: number
      /** 日程提醒列表 */
      reminders?: Lark.Reminder[]
      /** 重复日程的重复性规则 */
      recurrence?: string
      /** 日程自定义信息 */
      schemas?: Lark.Schema[]
      /** 日程附件 */
      attachments?: Lark.Attachment[]
    }

    export interface PatchQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface PatchResponse {
      /** 日程信息 */
      event?: Lark.CalendarEvent
    }

    export interface GetQuery {
      /** 是否需要返回会前设置 */
      need_meeting_settings?: boolean
      /** 是否需要返回参与人信息 */
      need_attendee?: boolean
      /** 返回的最大参与人数量 */
      max_attendee_num?: number
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetResponse {
      /** 日程信息 */
      event?: Lark.CalendarEvent
    }

    export interface ListQuery extends Pagination {
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

    export interface ListResponse {
      /** 是否有下一页数据 */
      has_more?: boolean
      /** 下次请求需要带上的分页标记，90 天有效期 */
      page_token?: string
      /** 下次请求需要带上的增量同步标记，90 天有效期 */
      sync_token?: string
      /** 日程列表 */
      items?: Lark.CalendarEvent[]
    }

    export interface SearchRequest {
      /** 搜索关键字 */
      query: string
      /** 搜索过滤器 */
      filter?: Lark.EventSearchFilter
    }

    export interface SearchQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface SearchResponse {
      /** 搜索命中的日程列表 */
      items?: Lark.CalendarEvent[]
      /** 下次请求需要带上的分页标记 */
      page_token?: string
    }

    export interface ReplyRequest {
      /** rsvp-日程状态 */
      rsvp_status: 'accept' | 'decline' | 'tentative'
    }

    export interface InstancesQuery extends Pagination {
      /** 日程实例开始Unix时间戳，单位为秒,日程的end_time的下限（不包含） */
      start_time: string
      /** 日程实例结束Unix时间戳，单位为秒,日程的start_time上限（不包含） */
      end_time: string
    }

    export interface InstanceViewQuery {
      /** 日程开始Unix时间戳，单位为秒 */
      start_time: string
      /** 日程结束Unix时间戳，单位为秒 */
      end_time: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface InstanceViewResponse {
      /** 日程instance列表 */
      items?: Lark.Instance[]
    }

    export namespace MeetingChat {
      export interface Methods {
        /**
         * 创建会议群
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/create
         */
        create(calendar_id: string, event_id: string): Promise<CreateResponse>
        /**
         * 解绑会议群
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_chat/delete
         */
        delete(calendar_id: string, event_id: string, query?: DeleteQuery): Promise<void>
      }

      export interface CreateResponse {
        /** 会议群ID */
        meeting_chat_id?: string
        /** 群分享链接 */
        applink?: string
      }

      export interface DeleteQuery {
        /** 会议群ID */
        meeting_chat_id: string
      }
    }

    export namespace MeetingMinute {
      export interface Methods {
        /**
         * 创建会议纪要
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-meeting_minute/create
         */
        create(calendar_id: string, event_id: string): Promise<CreateResponse>
      }

      export interface CreateResponse {
        /** 文档URL */
        doc_url?: string
      }
    }

    export namespace Attendee {
      export interface Methods {
        chatMember: ChatMember.Methods
        /**
         * 添加日程参与人
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create
         */
        create(calendar_id: string, event_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 删除日程参与人
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/batch_delete
         */
        batchDelete(calendar_id: string, event_id: string, body: BatchDeleteRequest, query?: BatchDeleteQuery): Promise<void>
        /**
         * 获取日程参与人列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/list
         */
        list(calendar_id: string, event_id: string, query?: ListQuery): Paginated<Lark.CalendarEventAttendee>
      }

      export interface CreateRequest {
        /** 新增参与人列表；<br>- 单次请求会议室的数量限制为100。 */
        attendees?: Lark.CalendarEventAttendee[]
        /** 是否给参与人发送bot通知 默认为true */
        need_notification?: boolean
        /** 使用管理员身份访问时要修改的实例(仅用于重复日程修改其中的一个实例，非重复日程无需填此字段) */
        instance_start_time_admin?: string
        /** 是否启用管理员身份(需先在管理后台设置某人为会议室管理员) */
        is_enable_admin?: boolean
        /** 是否添加会议室operate_id标识的用户到参与人 */
        add_operator_to_attendee?: boolean
      }

      export interface CreateQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface CreateResponse {
        /** 被添加的参与人列表 */
        attendees?: Lark.CalendarEventAttendee[]
      }

      export interface BatchDeleteRequest {
        /** 要移除的参与人 ID 列表。参见[参与人ID说明](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/introduction#4998889c) */
        attendee_ids?: string[]
        /** 需要删除的参与人类型实体ID，作为attendee_ids字段的补充。 */
        delete_ids?: Lark.CalendarEventAttendeeId[]
        /** 删除日程参与人时是否要给参与人发送bot通知，默认为true */
        need_notification?: boolean
        /** 使用管理员身份访问时要修改的实例 */
        instance_start_time_admin?: string
        /** 是否启用管理员身份(需先在管理后台设置某人为会议室管理员) */
        is_enable_admin?: boolean
      }

      export interface BatchDeleteQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface ListQuery extends Pagination {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 是否需要会议室表单信息 */
        need_resource_customization?: boolean
      }

      export namespace ChatMember {
        export interface Methods {
          /**
           * 获取日程参与群成员列表
           * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee-chat_member/list
           */
          list(calendar_id: string, event_id: string, attendee_id: string, query?: ListQuery): Paginated<Lark.CalendarEventAttendeeChatMember>
        }

        export interface ListQuery extends Pagination {
          /** 此次调用中使用的用户ID的类型 */
          user_id_type?: 'user_id' | 'union_id' | 'open_id'
        }
      }
    }
  }

  export namespace TimeoffEvent {
    export interface Methods {
      /**
       * 创建请假日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除请假日程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/timeoff_event/delete
       */
      delete(timeoff_event_id: string): Promise<void>
    }

    export interface CreateRequest {
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

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
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
  }

  export namespace Setting {
    export interface Methods {
      /**
       * 生成 CalDAV 配置
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/setting/generate_caldav_conf
       */
      generateCaldavConf(body: GenerateCaldavConfRequest): Promise<GenerateCaldavConfResponse>
    }

    export interface GenerateCaldavConfRequest {
      /** 需要同步日历的设备名，在日历中展示用来管理密码 */
      device_name?: string
    }

    export interface GenerateCaldavConfResponse {
      /** caldav密码 */
      password?: string
      /** caldav用户名 */
      user_name?: string
      /** 服务器地址 */
      server_address?: string
      /** 设备名 */
      device_name?: string
    }
  }

  export namespace ExchangeBinding {
    export interface Methods {
      /**
       * 将 Exchange 账户绑定到飞书账户
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 解除 Exchange 账户绑定
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/delete
       */
      delete(exchange_binding_id: string): Promise<void>
      /**
       * 查询 Exchange 账户的绑定状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/exchange_binding/get
       */
      get(exchange_binding_id: string, query?: GetQuery): Promise<GetResponse>
    }

    export interface CreateRequest {
      /** admin账户 */
      admin_account?: string
      /** 用户绑定的Exchange账户 */
      exchange_account?: string
      /** Exchange账户绑定user唯一标识id */
      user_id?: string
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
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

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetResponse {
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
  }
}

Internal.define({
  '/calendar/v4/calendars': {
    POST: 'calendar.create',
    GET: 'calendar.list',
  },
  '/calendar/v4/calendars/{calendar_id}': {
    DELETE: 'calendar.delete',
    GET: 'calendar.get',
    PATCH: 'calendar.patch',
  },
  '/calendar/v4/calendars/primary': {
    POST: 'calendar.primary',
  },
  '/calendar/v4/freebusy/list': {
    POST: 'calendar.freebusy.list',
  },
  '/calendar/v4/calendars/search': {
    POST: { name: 'calendar.search', pagination: { argIndex: 1 } },
  },
  '/calendar/v4/calendars/{calendar_id}/subscribe': {
    POST: 'calendar.subscribe',
  },
  '/calendar/v4/calendars/{calendar_id}/unsubscribe': {
    POST: 'calendar.unsubscribe',
  },
  '/calendar/v4/calendars/subscription': {
    POST: 'calendar.subscription',
  },
  '/calendar/v4/calendars/unsubscription': {
    POST: 'calendar.unsubscription',
  },
  '/calendar/v4/calendars/{calendar_id}/acls': {
    POST: 'calendar.acl.create',
    GET: { name: 'calendar.acl.list', pagination: { argIndex: 1, itemsKey: 'acls' } },
  },
  '/calendar/v4/calendars/{calendar_id}/acls/{acl_id}': {
    DELETE: 'calendar.acl.delete',
  },
  '/calendar/v4/calendars/{calendar_id}/acls/subscription': {
    POST: 'calendar.acl.subscription',
  },
  '/calendar/v4/calendars/{calendar_id}/acls/unsubscription': {
    POST: 'calendar.acl.unsubscription',
  },
  '/calendar/v4/calendars/{calendar_id}/events': {
    POST: 'calendar.event.create',
    GET: 'calendar.event.list',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}': {
    DELETE: 'calendar.event.delete',
    PATCH: 'calendar.event.patch',
    GET: 'calendar.event.get',
  },
  '/calendar/v4/calendars/{calendar_id}/events/search': {
    POST: { name: 'calendar.event.search', pagination: { argIndex: 2 } },
  },
  '/calendar/v4/calendars/{calendar_id}/events/subscription': {
    POST: 'calendar.event.subscription',
  },
  '/calendar/v4/calendars/{calendar_id}/events/unsubscription': {
    POST: 'calendar.event.unsubscription',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/reply': {
    POST: 'calendar.event.reply',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/instances': {
    GET: { name: 'calendar.event.instances', pagination: { argIndex: 2 } },
  },
  '/calendar/v4/calendars/{calendar_id}/events/instance_view': {
    GET: 'calendar.event.instanceView',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/meeting_chat': {
    POST: 'calendar.event.meetingChat.create',
    DELETE: 'calendar.event.meetingChat.delete',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/meeting_minute': {
    POST: 'calendar.event.meetingMinute.create',
  },
  '/calendar/v4/timeoff_events': {
    POST: 'calendar.timeoffEvent.create',
  },
  '/calendar/v4/timeoff_events/{timeoff_event_id}': {
    DELETE: 'calendar.timeoffEvent.delete',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees': {
    POST: 'calendar.event.attendee.create',
    GET: { name: 'calendar.event.attendee.list', pagination: { argIndex: 2 } },
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees/batch_delete': {
    POST: 'calendar.event.attendee.batchDelete',
  },
  '/calendar/v4/calendars/{calendar_id}/events/{event_id}/attendees/{attendee_id}/chat_members': {
    GET: { name: 'calendar.event.attendee.chatMember.list', pagination: { argIndex: 3 } },
  },
  '/calendar/v4/settings/generate_caldav_conf': {
    POST: 'calendar.setting.generateCaldavConf',
  },
  '/calendar/v4/exchange_bindings': {
    POST: 'calendar.exchangeBinding.create',
  },
  '/calendar/v4/exchange_bindings/{exchange_binding_id}': {
    DELETE: 'calendar.exchangeBinding.delete',
    GET: 'calendar.exchangeBinding.get',
  },
})
