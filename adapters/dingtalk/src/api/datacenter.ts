import { Internal } from '../internal'
// GENERATED CONTENT

export interface QueryGeneralDataServiceQuery {
  /** 开始日期，例如：20220901。 */
  startDate: string
  /** 服务编码，在创建数据服务后获取。 */
  serviceId: string
  /** 结束日期，例如：20220901。 */
  endDate: string
  /** 部门ID，非部门维度接口不需要传。 */
  deptId?: string
  /** 员工userId。 */
  userId: string
  /** 每页大小，不填默认为10，最大为50。 */
  pageSize?: number
  /** 分页页码，从1开始，不填默认为1。 */
  pageNumber?: number
}

export interface QueryGeneralDataServiceResponse {
  dataList?: object[]
  metaList?: {
    fieldName: string
    fieldDesc: string
    fieldType: string
    fieldId: string
  }[]
}

export interface QueryOnlineUserStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryOnlineUserStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryActiveUserStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryActiveUserStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryEmployeeTypeStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryEmployeeTypeStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryCircleStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryCircleStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QuerySingleMessageStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QuerySingleMessageStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryGroupMessageStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryGroupMessageStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryDingSendStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryDingSendStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryDingReciveStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryDingReciveStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryVedioMeetingStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryVedioMeetingStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryTelMeetingStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryTelMeetingStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryGroupLiveStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryGroupLiveStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryRedEnvelopeSendStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryRedEnvelopeSendStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryRedEnvelopeReciveStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryRedEnvelopeReciveStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryBlackboardStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryBlackboardStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryTodoStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryTodoStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryHealthStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryHealthStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryDocumentStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryDocumentStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryCheckinStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryCheckinStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryApprovalStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryApprovalStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryReportStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryReportStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryAttendanceStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryAttendanceStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryDriveStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryDriveStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryMailStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryMailStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryCalendarStatisticalDataQuery {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDate: string
}

export interface QueryCalendarStatisticalDataResponse {
  dataList?: object[]
  metaList?: {
    kpiId: string
    kpiName: string
    unit: string
    kpiCaliber: string
    period: string
  }[]
}

export interface QueryDigitalDistrictOrgInfoParams {
  /** 查询时间，日期格式为yyyyMMdd。 */
  statDates: string[]
  /** 数字区县组织corpId列表。 */
  corpIds: string[]
}

export interface QueryDigitalDistrictOrgInfoResponse {
  arguments?: string[]
  result?: string
}

// funcName: isOldApi
Internal.define({
  '/datacenter/generalDataServices': {
    GET: { queryGeneralDataService: false },
  },
  '/datacenter/onlineUserData': {
    GET: { queryOnlineUserStatisticalData: false },
  },
  '/datacenter/activeUserData': {
    GET: { queryActiveUserStatisticalData: false },
  },
  '/datacenter/employeeTypeData': {
    GET: { queryEmployeeTypeStatisticalData: false },
  },
  '/datacenter/circleData': { GET: { queryCircleStatisticalData: false } },
  '/datacenter/singleMessagerData': {
    GET: { querySingleMessageStatisticalData: false },
  },
  '/datacenter/groupMessageData': {
    GET: { queryGroupMessageStatisticalData: false },
  },
  '/datacenter/dingSendData': { GET: { queryDingSendStatisticalData: false } },
  '/datacenter/dingReciveData': {
    GET: { queryDingReciveStatisticalData: false },
  },
  '/datacenter/vedioMeetingData': {
    GET: { queryVedioMeetingStatisticalData: false },
  },
  '/datacenter/telMeetingData': {
    GET: { queryTelMeetingStatisticalData: false },
  },
  '/datacenter/groupLiveData': {
    GET: { queryGroupLiveStatisticalData: false },
  },
  '/datacenter/redEnvelopeSendData': {
    GET: { queryRedEnvelopeSendStatisticalData: false },
  },
  '/datacenter/redEnvelopeReciveData': {
    GET: { queryRedEnvelopeReciveStatisticalData: false },
  },
  '/datacenter/blackboardData': {
    GET: { queryBlackboardStatisticalData: false },
  },
  '/datacenter/todoUserData': { GET: { queryTodoStatisticalData: false } },
  '/datacenter/healtheUserData': { GET: { queryHealthStatisticalData: false } },
  '/datacenter/documentData': { GET: { queryDocumentStatisticalData: false } },
  '/datacenter/checkinData': { GET: { queryCheckinStatisticalData: false } },
  '/datacenter/approvalData': { GET: { queryApprovalStatisticalData: false } },
  '/datacenter/reportData': { GET: { queryReportStatisticalData: false } },
  '/datacenter/attendanceData': {
    GET: { queryAttendanceStatisticalData: false },
  },
  '/datacenter/driveData': { GET: { queryDriveStatisticalData: false } },
  '/datacenter/mailData': { GET: { queryMailStatisticalData: false } },
  '/datacenter/calendarData': { GET: { queryCalendarStatisticalData: false } },
  '/datacenter/digitalCounty/orgInfos/query': {
    POST: { queryDigitalDistrictOrgInfo: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 数据资产平台数据服务接口
     * @see https://open.dingtalk.com/document/orgapp-server/data-assets-platform-data-services-apis
     */
    queryGeneralDataService(
      query: QueryGeneralDataServiceQuery,
    ): Promise<QueryGeneralDataServiceResponse>
    /**
     * 获取企业用户在线统计数据
     * @see https://open.dingtalk.com/document/orgapp/retrieve-online-statistics-of-enterprise-users
     */
    queryOnlineUserStatisticalData(
      query: QueryOnlineUserStatisticalDataQuery,
    ): Promise<QueryOnlineUserStatisticalDataResponse>
    /**
     * 获取企业用户激活状态统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-statistics-on-user-activation-status
     */
    queryActiveUserStatisticalData(
      query: QueryActiveUserStatisticalDataQuery,
    ): Promise<QueryActiveUserStatisticalDataResponse>
    /**
     * 获取企业员工类型统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-statistics-on-employee-types
     */
    queryEmployeeTypeStatisticalData(
      query: QueryEmployeeTypeStatisticalDataQuery,
    ): Promise<QueryEmployeeTypeStatisticalDataResponse>
    /**
     * 获取企业全员圈统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-statistical-data-of-all-employees-of-an-enterprise
     */
    queryCircleStatisticalData(
      query: QueryCircleStatisticalDataQuery,
    ): Promise<QueryCircleStatisticalDataResponse>
    /**
     * 获取企业单聊统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-the-statistics-on-one-time-enterprise-chats
     */
    querySingleMessageStatisticalData(
      query: QuerySingleMessageStatisticalDataQuery,
    ): Promise<QuerySingleMessageStatisticalDataResponse>
    /**
     * 获取企业群聊统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtain-enterprise-group-chat-statistics
     */
    queryGroupMessageStatisticalData(
      query: QueryGroupMessageStatisticalDataQuery,
    ): Promise<QueryGroupMessageStatisticalDataResponse>
    /**
     * 获取企业DING发送统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtain-sending-statistics-of-an-enterprise-ding
     */
    queryDingSendStatisticalData(
      query: QueryDingSendStatisticalDataQuery,
    ): Promise<QueryDingSendStatisticalDataResponse>
    /**
     * 获取企业DING接收及评论统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtain-statistics-on-receiving-and-comments-of-enterprise-ding
     */
    queryDingReciveStatisticalData(
      query: QueryDingReciveStatisticalDataQuery,
    ): Promise<QueryDingReciveStatisticalDataResponse>
    /**
     * 获取企业视频会议统计数据
     * @see https://open.dingtalk.com/document/orgapp/get-enterprise-video-conference-statistics
     */
    queryVedioMeetingStatisticalData(
      query: QueryVedioMeetingStatisticalDataQuery,
    ): Promise<QueryVedioMeetingStatisticalDataResponse>
    /**
     * 获取企业电话会议统计数据
     * @see https://open.dingtalk.com/document/orgapp/get-enterprise-teleconference-statistics
     */
    queryTelMeetingStatisticalData(
      query: QueryTelMeetingStatisticalDataQuery,
    ): Promise<QueryTelMeetingStatisticalDataResponse>
    /**
     * 获取企业群直播统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-live-stream-statistics-for-an-enterprise-group
     */
    queryGroupLiveStatisticalData(
      query: QueryGroupLiveStatisticalDataQuery,
    ): Promise<QueryGroupLiveStatisticalDataResponse>
    /**
     * 获取企业发送红包统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-statistics-on-red-packets-issued-by-enterprises
     */
    queryRedEnvelopeSendStatisticalData(
      query: QueryRedEnvelopeSendStatisticalDataQuery,
    ): Promise<QueryRedEnvelopeSendStatisticalDataResponse>
    /**
     * 获取企业接收红包统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-the-red-envelope-receiving-statistics-of-an-enterprise
     */
    queryRedEnvelopeReciveStatisticalData(
      query: QueryRedEnvelopeReciveStatisticalDataQuery,
    ): Promise<QueryRedEnvelopeReciveStatisticalDataResponse>
    /**
     * 获取企业公告统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-corporate-announcement-statistics
     */
    queryBlackboardStatisticalData(
      query: QueryBlackboardStatisticalDataQuery,
    ): Promise<QueryBlackboardStatisticalDataResponse>
    /**
     * 获取企业待办统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-to-do-statistics-of-an-enterprise
     */
    queryTodoStatisticalData(
      query: QueryTodoStatisticalDataQuery,
    ): Promise<QueryTodoStatisticalDataResponse>
    /**
     * 获取企业钉钉运动统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-dingtalk-movement-statistics
     */
    queryHealthStatisticalData(
      query: QueryHealthStatisticalDataQuery,
    ): Promise<QueryHealthStatisticalDataResponse>
    /**
     * 获取企业文档统计数据
     * @see https://open.dingtalk.com/document/orgapp/get-enterprise-document-statistics
     */
    queryDocumentStatisticalData(
      query: QueryDocumentStatisticalDataQuery,
    ): Promise<QueryDocumentStatisticalDataResponse>
    /**
     * 获取企业签到统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-enterprise-check-in-statistics
     */
    queryCheckinStatisticalData(
      query: QueryCheckinStatisticalDataQuery,
    ): Promise<QueryCheckinStatisticalDataResponse>
    /**
     * 获取企业审批统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-enterprise-approval-statistics
     */
    queryApprovalStatisticalData(
      query: QueryApprovalStatisticalDataQuery,
    ): Promise<QueryApprovalStatisticalDataResponse>
    /**
     * 获取企业日志统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtain-enterprise-log-statistics
     */
    queryReportStatisticalData(
      query: QueryReportStatisticalDataQuery,
    ): Promise<QueryReportStatisticalDataResponse>
    /**
     * 获取企业考勤统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-enterprise-attendance-statistics
     */
    queryAttendanceStatisticalData(
      query: QueryAttendanceStatisticalDataQuery,
    ): Promise<QueryAttendanceStatisticalDataResponse>
    /**
     * 获取企业钉盘统计数据
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-statistics-on-enterprise-dingtalk-trays
     */
    queryDriveStatisticalData(
      query: QueryDriveStatisticalDataQuery,
    ): Promise<QueryDriveStatisticalDataResponse>
    /**
     * 获取企业邮箱统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-enterprise-email-statistics
     */
    queryMailStatisticalData(
      query: QueryMailStatisticalDataQuery,
    ): Promise<QueryMailStatisticalDataResponse>
    /**
     * 获取企业日程统计数据
     * @see https://open.dingtalk.com/document/orgapp/queries-enterprise-schedule-statistics
     */
    queryCalendarStatisticalData(
      query: QueryCalendarStatisticalDataQuery,
    ): Promise<QueryCalendarStatisticalDataResponse>
    /**
     * 获取数字区县组织信息
     * @see https://open.dingtalk.com/document/orgapp/querydigitaldistrictorginfo-api-reference
     */
    queryDigitalDistrictOrgInfo(
      params: QueryDigitalDistrictOrgInfoParams,
    ): Promise<QueryDigitalDistrictOrgInfoResponse>
  }
}
