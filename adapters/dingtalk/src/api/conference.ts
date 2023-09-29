import { Internal } from '../internal'
// GENERATED CONTENT

export interface InviteUsersParams {
  /** 操作用户unionId。 */
  unionId?: string
  /** 被邀请人对象。 */
  inviteeList?: object[]
}

export interface InviteUsersResponse {
  success?: unknown
}

export interface FocusParams {
  /** 行为动作： */
  action: string
  /** 被操作用户unionId。 */
  unionId: string
}

export interface FocusResponse {
  success?: unknown
}

export interface CohostsParams {
  /** 行为动作： */
  action: string
  /** 被操作用户对象。 */
  userList: object[]
}

export interface CohostsResponse {
  success?: unknown
}

export interface MuteMembersParams {
  /** 操作类型： */
  action: string
  /** 被操作用户对象。 */
  userList: object[]
}

export interface MuteMembersResponse {
  success?: unknown
}

export interface QueryScheduleConferenceInfoQuery {
  /** 标记当前开始读取的位置，置空表示从头开始 */
  nextToken?: string
  /** 本次读取的最大数据记录数量 */
  maxResults?: number
}

export interface QueryScheduleConferenceInfoResponse {
  totalCount?: number
  nextToken: string
  conferenceList?: {
    conferenceId?: string
    title?: string
    roomCode?: string
    status?: number
    startTime?: number
    endTime?: number
  }[]
}

export interface QueryCloudRecordVideoQuery {
  /** 用户unionId。 */
  unionId: string
}

export interface QueryCloudRecordVideoResponse {
  videoList?: {
    recordId?: string
    unionId?: string
    startTime?: number
    recordType?: number
    duration?: number
    fileSize?: number
    endTime?: number
    mediaId?: string
    regionId?: string
  }[]
}

export interface QueryCloudRecordTextQuery {
  /** 用户unionId。 */
  unionId?: string
  /** 开始时间的千分之一秒，单位毫秒。 */
  startTime?: number
  /** 查询方式： */
  direction?: string
  /** 单词查询条数，最大2000。 */
  maxResults?: number
  /** 分页游标。 */
  nextToken?: number
}

export interface QueryCloudRecordTextResponse {
  hasMore?: unknown
  paragraphList?: {
    nextTtoken?: number
    status?: number
    unionId?: string
    nickName?: string
    recordId?: number
    startTime?: number
    endTime?: number
    paragraph?: string
    sentenceList?: number
  }[]
}

export interface QueryCloudRecordVideoPlayInfoQuery {
  /** 用户unionId。 */
  unionId: string
  /** 媒体文件ID。 */
  mediaId: string
  /** 地域ID。 */
  regionId: string
}

export interface QueryCloudRecordVideoPlayInfoResponse {
  playUrl?: string
  mp4FileUrl?: string
  fileSize?: number
  duration?: number
  status?: number
}

export interface StopCloudRecordParams {
  /** 用户unionId。 */
  unionId: string
}

export interface StopCloudRecordResponse {
  code?: string
}

export interface StopStreamOutParams {
  /** 推流ID，开启视频会议直播推流后生成。 */
  streamId: string
  /** 是否停止所有流，为true时**streamId**参数无效。 */
  stopAllStream: unknown
  /** 用户unionId，可以调用[通过免登码获取用户信息(v2)](https://developers.dingtalk.com/document/app/obtain-the-userid-of-a-user-by-using-the-log-free)接口获取。 */
  unionId: string
}

export interface StopStreamOutResponse {
  code: string
}

export interface StartStreamOutParams {
  /** 用户unionId，可以调用[通过免登码获取用户信息(v2)](https://developers.dingtalk.com/document/app/obtain-the-userid-of-a-user-by-using-the-log-free)接口获取。 */
  unionId: string
  /** 是否需要主持人加入后才允许推流。 */
  needHostJoin: unknown
  /** 推流地址列表，最多10个，需要以rtmp开头。 */
  streamUrlList: string[]
  /** 推流名称。 */
  streamName: string
  /** 布局，取值： */
  mode: string
  /** 小窗位置，取值： */
  smallWindowPosition: string
}

export interface StartStreamOutResponse {
  successStreamMap?: unknown
  failStreamMap?: unknown
}

export interface StartCloudRecordParams {
  /** 用户unionId。 */
  unionId: string
  /** 小窗位置，取值： */
  smallWindowPosition?: string
  /** 布局，取值： */
  mode?: string
}

export interface StartCloudRecordResponse {
  code?: string
}

export interface QueryConferenceInfoBatchParams {
  /** 会议ID列表。 */
  conferenceIdList: string[]
}

export interface QueryConferenceInfoBatchResponse {
  infos?: {
    conferenceId?: string
    title?: string
    startTime?: number
    status?: number
    mediaStatus?: number
    userList?: number
  }[]
}

export interface CloseVideoConferenceQuery {
  /** 员工在当前开发者企业账号范围内的唯一标识。 */
  unionId: string
}

export interface CloseVideoConferenceResponse {
  code: number
  cause?: string
}

export interface CreateVideoConferenceParams {
  /** 会议发起人的unionId。 */
  userId: string
  /** 会议主题，最多不能超20个中文。 */
  confTitle: string
  /** 邀请参会人员unionId列表。 */
  inviteUserIds?: string[]
  /** 是否邀请主叫。 */
  inviteCaller?: unknown
}

export interface CreateVideoConferenceResponse {
  conferenceId: string
  conferencePassword?: string
  hostPassword?: string
  externalLinkUrl?: string
  phoneNumbers?: string[]
  roomCode?: string
}

export interface QueryConferenceMembersQuery {
  /** 分页游标。 */
  nextToken?: string
  /** 每页最大条目数，默认值300，无最大值限制。 */
  maxResults?: number
}

export interface QueryConferenceMembersResponse {
  memberModels?: {
    unionId?: string
    conferenceId?: string
    userNick?: string
    joinTime?: number
    leaveTime?: number
    duration?: number
    host?: number
    attendStatus?: number
    outerOrgMember?: number
    pstnJoin?: number
    coHost?: number
  }[]
  nextToken?: string
  totalCount?: number
}

export interface QueryConferenceInfoResponse {
  confInfo?: {
    activeNum?: number
    attendNum?: number
    confDuration?: number
    conferenceId?: string
    creatorId?: string
    creatorNick?: string
    externalLinkUrl?: string
    invitedNum?: number
    startTime?: number
    status?: number
    title?: string
    roomCode?: string
    endTime?: number
  }
}

export interface CancelScheduleConferenceParams {
  /** 预约会议id： */
  scheduleConferenceId: string
  /** 预约会议创建者unionId。 */
  creatorUnionId: string
}

export interface CancelScheduleConferenceResponse {
  success?: unknown
}

export interface QueryScheduleConferenceQuery {
  /** 请求者unionId。 */
  requestUnionId: string
}

export interface QueryScheduleConferenceResponse {
  requestId?: string
  scheduleConferenceId?: string
  title?: string
  startTime?: number
  endTime?: number
  roomCode?: string
  url?: string
  phones?: string[]
}

export interface UpdateScheduleConferenceParams {
  /** 预约会议创建者unionId。 */
  creatorUnionId: string
  /** 预约会议id： */
  scheduleConferenceId: string
  /** 预约会议标题。 */
  title: string
  /** 预约会议开始时间，毫秒级UTC时间戳。 */
  startTime: number
  /** 预约会议结束时间，毫秒级UTC时间戳。 */
  endTime: number
}

export interface UpdateScheduleConferenceResponse {
  success?: unknown
}

export interface CreateScheduleConferenceParams {
  /** 创建者unionId。 */
  creatorUnionId: string
  /** 预约会议标题。 */
  title: string
  /** 预约会议开始时间，毫秒级UTC时间戳。 */
  startTime: number
  /** 预约会议结束时间，毫秒级UTC时间戳。 */
  endTime: number
}

export interface CreateScheduleConferenceResponse {
  requestId?: string
  scheduleConferenceId?: string
  roomCode?: string
  url?: string
  phones?: string[]
}

// funcName: isOldApi
Internal.define({
  '/conference/videoConferences/{conferenceId}/users/invite': {
    POST: { inviteUsers: false },
  },
  '/conference/videoConferences/{conferenceId}/focus': {
    POST: { focus: false },
  },
  '/conference/videoConferences/{conferenceId}/coHosts/set': {
    POST: { cohosts: false },
  },
  '/conference/videoConferences/{conferenceId}/members/mute': {
    POST: { muteMembers: false },
  },
  '/conference/videoConferences/scheduleConferences/{scheduleConferenceId}': {
    GET: { queryScheduleConferenceInfo: false },
  },
  '/conference/videoConferences/{conferenceId}/cloudRecords/getVideos': {
    GET: { queryCloudRecordVideo: false },
  },
  '/conference/videoConferences/{conferenceId}/cloudRecords/getTexts': {
    GET: { queryCloudRecordText: false },
  },
  '/conference/videoConferences/{conferenceId}/cloudRecords/videos/getPlayInfos':
    { GET: { queryCloudRecordVideoPlayInfo: false } },
  '/conference/videoConferences/{conferenceId}/cloudRecords/stop': {
    POST: { stopCloudRecord: false },
  },
  '/conference/videoConferences/{conferenceId}/streamOuts/stop': {
    POST: { stopStreamOut: false },
  },
  '/conference/videoConferences/{conferenceId}/streamOuts/start': {
    POST: { startStreamOut: false },
  },
  '/conference/videoConferences/{conferenceId}/cloudRecords/start': {
    POST: { startCloudRecord: false },
  },
  '/conference/videoConferences/query': {
    POST: { queryConferenceInfoBatch: false },
  },
  '/conference/videoConferences/{conferenceId}': {
    DELETE: { closeVideoConference: false },
    GET: { queryConferenceInfo: false },
  },
  '/conference/videoConferences': { POST: { createVideoConference: false } },
  '/conference/videoConferences/{conferenceId}/members': {
    GET: { queryConferenceMembers: false },
  },
  '/conference/scheduleConferences/cancel': {
    POST: { cancelScheduleConference: false },
  },
  '/conference/scheduleConferences/{scheduleConferenceId}/infos': {
    GET: { queryScheduleConference: false },
  },
  '/conference/scheduleConferences': {
    PUT: { updateScheduleConference: false },
    POST: { createScheduleConference: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 邀请其他人员
     * @see https://developers.dingtalk.com/document/orgapp/invite-users-to-join
     */
    inviteUsers(
      conferenceId: string,
      params: InviteUsersParams,
    ): Promise<InviteUsersResponse>
    /**
     * 设置全员看他
     * @see https://developers.dingtalk.com/document/orgapp/set-the-whole-staff-to-see-him
     */
    focus(conferenceId: string, params: FocusParams): Promise<FocusResponse>
    /**
     * 设置联席主持人
     * @see https://developers.dingtalk.com/document/orgapp/set-up-co-hosts
     */
    cohosts(
      conferenceId: string,
      params: CohostsParams,
    ): Promise<CohostsResponse>
    /**
     * 指定人员静音或取消静音
     * @see https://developers.dingtalk.com/document/orgapp/specify-person-to-mute-or-unmute
     */
    muteMembers(
      conferenceId: string,
      params: MuteMembersParams,
    ): Promise<MuteMembersResponse>
    /**
     * 分页获取预约会议历史会议信息，当前仅返回最后一次的会议信息
     * @see https://developers.dingtalk.com/document/orgapp/query-appointment-meeting-history-meeting-information
     */
    queryScheduleConferenceInfo(
      scheduleConferenceId: string,
      query: QueryScheduleConferenceInfoQuery,
    ): Promise<QueryScheduleConferenceInfoResponse>
    /**
     * 查询会议录制的详情信息
     * @see https://developers.dingtalk.com/document/isvapp/query-recording-information
     */
    queryCloudRecordVideo(
      conferenceId: string,
      query: QueryCloudRecordVideoQuery,
    ): Promise<QueryCloudRecordVideoResponse>
    /**
     * 查询会议录制中的文本信息
     * @see https://developers.dingtalk.com/document/isvapp/queries-the-text-information-about-cloud-recording
     */
    queryCloudRecordText(
      conferenceId: string,
      query: QueryCloudRecordTextQuery,
    ): Promise<QueryCloudRecordTextResponse>
    /**
     * 查询会议录制中的视频信息
     * @see https://developers.dingtalk.com/document/isvapp/queries-the-playback-information-about-a-recorded-cloud-video
     */
    queryCloudRecordVideoPlayInfo(
      conferenceId: string,
      query: QueryCloudRecordVideoPlayInfoQuery,
    ): Promise<QueryCloudRecordVideoPlayInfoResponse>
    /**
     * 停止视频会议云录制
     * @see https://developers.dingtalk.com/document/isvapp/video-conferencing-stops-cloud-recording
     */
    stopCloudRecord(
      conferenceId: string,
      params: StopCloudRecordParams,
    ): Promise<StopCloudRecordResponse>
    /**
     * 会议停止直播推流
     * @see https://developers.dingtalk.com/document/orgapp/videoconferencing-stops-live-stream-ingest
     */
    stopStreamOut(
      conferenceId: string,
      params: StopStreamOutParams,
    ): Promise<StopStreamOutResponse>
    /**
     * 会议开始直播推流
     * @see https://developers.dingtalk.com/document/orgapp/video-conference-enables-live-stream-ingest
     */
    startStreamOut(
      conferenceId: string,
      params: StartStreamOutParams,
    ): Promise<StartStreamOutResponse>
    /**
     * 开启视频会议云录制
     * @see https://developers.dingtalk.com/document/isvapp/video-conference-open-cloud-recording
     */
    startCloudRecord(
      conferenceId: string,
      params: StartCloudRecordParams,
    ): Promise<StartCloudRecordResponse>
    /**
     * 批量查询视频会议信息
     * @see https://developers.dingtalk.com/document/isvapp/batch-query-of-video-conference-information
     */
    queryConferenceInfoBatch(
      params: QueryConferenceInfoBatchParams,
    ): Promise<QueryConferenceInfoBatchResponse>
    /**
     * 关闭视频会议
     * @see https://developers.dingtalk.com/document/isvapp/close-audio-video-conferencing
     */
    closeVideoConference(
      conferenceId: string,
      query: CloseVideoConferenceQuery,
    ): Promise<CloseVideoConferenceResponse>
    /**
     * 创建视频会议
     * @see https://developers.dingtalk.com/document/isvapp/create-a-video-conference
     */
    createVideoConference(
      params: CreateVideoConferenceParams,
    ): Promise<CreateVideoConferenceResponse>
    /**
     * 查询视频会议成员
     * @see https://developers.dingtalk.com/document/app/query-video-meeting-member-information
     */
    queryConferenceMembers(
      conferenceId: string,
      query: QueryConferenceMembersQuery,
    ): Promise<QueryConferenceMembersResponse>
    /**
     * 查询视频会议信息
     * @see https://developers.dingtalk.com/document/app/querying-video-conference-information
     */
    queryConferenceInfo(
      conferenceId: string,
    ): Promise<QueryConferenceInfoResponse>
    /**
     * 取消预约会议
     * @see https://developers.dingtalk.com/document/app/cancel-appointment-meeting
     */
    cancelScheduleConference(
      params: CancelScheduleConferenceParams,
    ): Promise<CancelScheduleConferenceResponse>
    /**
     * 查询预约会议信息
     * @see https://developers.dingtalk.com/document/app/query-meeting-reservation
     */
    queryScheduleConference(
      scheduleConferenceId: string,
      query: QueryScheduleConferenceQuery,
    ): Promise<QueryScheduleConferenceResponse>
    /**
     * 更新预约会议
     * @see https://developers.dingtalk.com/document/app/update-appointment-meeting
     */
    updateScheduleConference(
      params: UpdateScheduleConferenceParams,
    ): Promise<UpdateScheduleConferenceResponse>
    /**
     * 创建预约会议
     * @see https://developers.dingtalk.com/document/app/create-appointment-meeting
     */
    createScheduleConference(
      params: CreateScheduleConferenceParams,
    ): Promise<CreateScheduleConferenceResponse>
  }
}
