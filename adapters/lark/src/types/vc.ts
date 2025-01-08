import { Alert, ApprovalConfig, Device, DisableInformConfig, Meeting, MeetingInfo, MeetingInviteStatus, MeetingParticipantResult, MeetingRecording, MeetingUser, Participant, ParticipantQuality, RecordingPermissionObject, Report, ReportTopUser, Reserve, ReserveAdminConfig, ReserveCorrectionCheckInfo, ReserveFormConfig, ReserveMeetingSetting, ReserveScopeConfig, Room, RoomConfig, RoomDigitalSignage, RoomLevel, RoomMeetingReservation, RoomStatus, ScopeConfig, TimeConfig } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 预约会议
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/apply
     */
    applyVcReserve(body: ApplyVcReserveRequest, query?: ApplyVcReserveQuery): Promise<ApplyVcReserveResponse>
    /**
     * 删除预约
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/delete
     */
    deleteVcReserve(reserve_id: string): Promise<void>
    /**
     * 更新预约
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/update
     */
    updateVcReserve(reserve_id: string, body: UpdateVcReserveRequest, query?: UpdateVcReserveQuery): Promise<UpdateVcReserveResponse>
    /**
     * 获取预约
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get
     */
    getVcReserve(reserve_id: string, query?: GetVcReserveQuery): Promise<GetVcReserveResponse>
    /**
     * 获取活跃会议
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve/get_active_meeting
     */
    getActiveMeetingVcReserve(reserve_id: string, query?: GetActiveMeetingVcReserveQuery): Promise<GetActiveMeetingVcReserveResponse>
    /**
     * 邀请参会人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/invite
     */
    inviteVcMeeting(meeting_id: string, body: InviteVcMeetingRequest, query?: InviteVcMeetingQuery): Promise<InviteVcMeetingResponse>
    /**
     * 移除参会人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/kickout
     */
    kickoutVcMeeting(meeting_id: string, body: KickoutVcMeetingRequest, query?: KickoutVcMeetingQuery): Promise<KickoutVcMeetingResponse>
    /**
     * 设置主持人
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/set_host
     */
    setHostVcMeeting(meeting_id: string, body: SetHostVcMeetingRequest, query?: SetHostVcMeetingQuery): Promise<SetHostVcMeetingResponse>
    /**
     * 结束会议
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/end
     */
    endVcMeeting(meeting_id: string): Promise<void>
    /**
     * 获取会议详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/get
     */
    getVcMeeting(meeting_id: string, query?: GetVcMeetingQuery): Promise<GetVcMeetingResponse>
    /**
     * 获取与会议号关联的会议列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/list_by_no
     */
    listByNoVcMeeting(query?: ListByNoVcMeetingQuery): Paginated<Meeting, 'meeting_briefs'>
    /**
     * 开始录制
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/start
     */
    startVcMeetingRecording(meeting_id: string, body: StartVcMeetingRecordingRequest): Promise<void>
    /**
     * 停止录制
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/stop
     */
    stopVcMeetingRecording(meeting_id: string): Promise<void>
    /**
     * 获取录制文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/get
     */
    getVcMeetingRecording(meeting_id: string): Promise<GetVcMeetingRecordingResponse>
    /**
     * 授权录制文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-recording/set_permission
     */
    setPermissionVcMeetingRecording(meeting_id: string, body: SetPermissionVcMeetingRecordingRequest, query?: SetPermissionVcMeetingRecordingQuery): Promise<void>
    /**
     * 获取会议报告
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_daily
     */
    getDailyVcReport(query?: GetDailyVcReportQuery): Promise<GetDailyVcReportResponse>
    /**
     * 获取 Top 用户列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/report/get_top_user
     */
    getTopUserVcReport(query?: GetTopUserVcReportQuery): Promise<GetTopUserVcReportResponse>
    /**
     * 导出会议明细
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/meeting_list
     */
    meetingListVcExport(body: MeetingListVcExportRequest, query?: MeetingListVcExportQuery): Promise<MeetingListVcExportResponse>
    /**
     * 导出参会人明细
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/participant_list
     */
    participantListVcExport(body: ParticipantListVcExportRequest, query?: ParticipantListVcExportQuery): Promise<ParticipantListVcExportResponse>
    /**
     * 导出参会人会议质量数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/participant_quality_list
     */
    participantQualityListVcExport(body: ParticipantQualityListVcExportRequest, query?: ParticipantQualityListVcExportQuery): Promise<ParticipantQualityListVcExportResponse>
    /**
     * 导出会议室预定数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/resource_reservation_list
     */
    resourceReservationListVcExport(body: ResourceReservationListVcExportRequest): Promise<ResourceReservationListVcExportResponse>
    /**
     * 查询导出任务结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/get
     */
    getVcExport(task_id: string): Promise<GetVcExportResponse>
    /**
     * 下载导出文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/export/download
     */
    downloadVcExport(query?: DownloadVcExportQuery): Promise<ArrayBuffer>
    /**
     * 创建会议室层级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/create
     */
    createVcRoomLevel(body: CreateVcRoomLevelRequest): Promise<CreateVcRoomLevelResponse>
    /**
     * 删除会议室层级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/del
     */
    delVcRoomLevel(body: DelVcRoomLevelRequest): Promise<void>
    /**
     * 更新会议室层级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/patch
     */
    patchVcRoomLevel(room_level_id: string, body: PatchVcRoomLevelRequest): Promise<void>
    /**
     * 查询会议室层级详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/get
     */
    getVcRoomLevel(room_level_id: string): Promise<GetVcRoomLevelResponse>
    /**
     * 批量查询会议室层级详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/mget
     */
    mgetVcRoomLevel(body: MgetVcRoomLevelRequest): Promise<MgetVcRoomLevelResponse>
    /**
     * 查询会议室层级列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/list
     */
    listVcRoomLevel(query?: ListVcRoomLevelQuery): Paginated<RoomLevel>
    /**
     * 搜索会议室层级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_level/search
     */
    searchVcRoomLevel(query?: SearchVcRoomLevelQuery): Promise<SearchVcRoomLevelResponse>
    /**
     * 创建会议室
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/create
     */
    createVcRoom(body: CreateVcRoomRequest, query?: CreateVcRoomQuery): Promise<CreateVcRoomResponse>
    /**
     * 删除会议室
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/delete
     */
    deleteVcRoom(room_id: string): Promise<void>
    /**
     * 更新会议室
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/patch
     */
    patchVcRoom(room_id: string, body: PatchVcRoomRequest, query?: PatchVcRoomQuery): Promise<void>
    /**
     * 查询会议室详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/get
     */
    getVcRoom(room_id: string, query?: GetVcRoomQuery): Promise<GetVcRoomResponse>
    /**
     * 批量查询会议室详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/mget
     */
    mgetVcRoom(body: MgetVcRoomRequest, query?: MgetVcRoomQuery): Promise<MgetVcRoomResponse>
    /**
     * 查询会议室列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/list
     */
    listVcRoom(query?: ListVcRoomQuery): Paginated<Room, 'rooms'>
    /**
     * 搜索会议室
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/search
     */
    searchVcRoom(body: SearchVcRoomRequest, query?: SearchVcRoomQuery): Paginated<Room, 'rooms'>
    /**
     * 查询会议室配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/scope_config/get
     */
    getVcScopeConfig(query?: GetVcScopeConfigQuery): Promise<GetVcScopeConfigResponse>
    /**
     * 设置会议室配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/scope_config/create
     */
    createVcScopeConfig(body: CreateVcScopeConfigRequest, query?: CreateVcScopeConfigQuery): Promise<void>
    /**
     * 查询会议室预定限制
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config/reserve_scope
     */
    reserveScopeVcReserveConfig(query?: ReserveScopeVcReserveConfigQuery): Promise<ReserveScopeVcReserveConfigResponse>
    /**
     * 更新会议室预定限制
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config/patch
     */
    patchVcReserveConfig(reserve_config_id: string, body: PatchVcReserveConfigRequest, query?: PatchVcReserveConfigQuery): Promise<void>
    /**
     * 查询会议室预定表单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-form/get
     */
    getVcReserveConfigForm(reserve_config_id: string, query?: GetVcReserveConfigFormQuery): Promise<GetVcReserveConfigFormResponse>
    /**
     * 更新会议室预定表单
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-form/patch
     */
    patchVcReserveConfigForm(reserve_config_id: string, body: PatchVcReserveConfigFormRequest, query?: PatchVcReserveConfigFormQuery): Promise<void>
    /**
     * 查询会议室预定管理员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-admin/get
     */
    getVcReserveConfigAdmin(reserve_config_id: string, query?: GetVcReserveConfigAdminQuery): Promise<GetVcReserveConfigAdminResponse>
    /**
     * 更新会议室预定管理员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-admin/patch
     */
    patchVcReserveConfigAdmin(reserve_config_id: string, body: PatchVcReserveConfigAdminRequest, query?: PatchVcReserveConfigAdminQuery): Promise<void>
    /**
     * 查询禁用状态变更通知
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-disable_inform/get
     */
    getVcReserveConfigDisableInform(reserve_config_id: string, query?: GetVcReserveConfigDisableInformQuery): Promise<GetVcReserveConfigDisableInformResponse>
    /**
     * 更新禁用状态变更通知
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/reserve_config-disable_inform/patch
     */
    patchVcReserveConfigDisableInform(reserve_config_id: string, body: PatchVcReserveConfigDisableInformRequest, query?: PatchVcReserveConfigDisableInformQuery): Promise<void>
    /**
     * 查询会议明细
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting_list/get
     */
    getVcMeetingList(query?: GetVcMeetingListQuery): Paginated<MeetingInfo, 'meeting_list'>
    /**
     * 查询参会人明细
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/participant_list/get
     */
    getVcParticipantList(query?: GetVcParticipantListQuery): Paginated<Participant, 'participants'>
    /**
     * 查询参会人会议质量数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/participant_quality_list/get
     */
    getVcParticipantQualityList(query?: GetVcParticipantQualityListQuery): Paginated<ParticipantQuality, 'participant_quality_list'>
    /**
     * 查询会议室预定数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/resource_reservation_list/get
     */
    getVcResourceReservationList(query?: GetVcResourceReservationListQuery): Paginated<RoomMeetingReservation, 'room_reservation_list'>
    /**
     * 获取告警记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/alert/list
     */
    listVcAlert(query?: ListVcAlertQuery): Paginated<Alert>
    /**
     * 创建签到板部署码
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set_checkboard_access_code
     */
    setCheckboardAccessCodeVcRoomConfig(body: SetCheckboardAccessCodeVcRoomConfigRequest): Promise<SetCheckboardAccessCodeVcRoomConfigResponse>
    /**
     * 创建会议室部署码
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set_room_access_code
     */
    setRoomAccessCodeVcRoomConfig(body: SetRoomAccessCodeVcRoomConfigRequest): Promise<SetRoomAccessCodeVcRoomConfigResponse>
    /**
     * 查询会议室配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/query
     */
    queryVcRoomConfig(query?: QueryVcRoomConfigQuery): Promise<QueryVcRoomConfigResponse>
    /**
     * 设置会议室配置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room_config/set
     */
    setVcRoomConfig(body: SetVcRoomConfigRequest, query?: SetVcRoomConfigQuery): Promise<void>
  }
}

export interface ApplyVcReserveRequest {
  /** 预约到期时间（unix时间，单位sec），多人会议必填 */
  end_time?: string
  /** 指定会议归属人，使用tenant_access_token时生效且必传，使用user_access_token时不生效，必须指定为同租户下的合法lark用户 */
  owner_id?: string
  /** 会议设置 */
  meeting_settings: ReserveMeetingSetting
}

export interface ApplyVcReserveQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ApplyVcReserveResponse {
  reserve?: Reserve
  reserve_correction_check_info?: ReserveCorrectionCheckInfo
}

export interface UpdateVcReserveRequest {
  /** 预约到期时间（unix时间，单位sec） */
  end_time?: string
  /** 会议设置 */
  meeting_settings?: ReserveMeetingSetting
}

export interface UpdateVcReserveQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateVcReserveResponse {
  reserve?: Reserve
  reserve_correction_check_info?: ReserveCorrectionCheckInfo
}

export interface GetVcReserveQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcReserveResponse {
  reserve?: Reserve
}

export interface GetActiveMeetingVcReserveQuery {
  /** 是否需要参会人列表，默认为false */
  with_participants?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetActiveMeetingVcReserveResponse {
  meeting?: Meeting
}

export interface InviteVcMeetingRequest {
  /** 被邀请的用户列表 */
  invitees: MeetingUser[]
}

export interface InviteVcMeetingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface InviteVcMeetingResponse {
  /** 邀请结果 */
  invite_results?: MeetingInviteStatus[]
}

export interface KickoutVcMeetingRequest {
  /** 需踢出的用户列表 */
  kickout_users: MeetingUser[]
}

export interface KickoutVcMeetingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface KickoutVcMeetingResponse {
  /** 踢出结果 */
  kickout_results?: MeetingParticipantResult[]
}

export interface SetHostVcMeetingRequest {
  /** 将要设置的主持人 */
  host_user: MeetingUser
  /** 当前主持人（CAS并发安全：如果和会中当前主持人不符则会设置失败，可使用返回的最新数据重新设置） */
  old_host_user?: MeetingUser
}

export interface SetHostVcMeetingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SetHostVcMeetingResponse {
  /** 会中当前主持人 */
  host_user?: MeetingUser
}

export interface GetVcMeetingQuery {
  /** 是否需要参会人列表 */
  with_participants?: boolean
  /** 是否需要会中使用能力统计（仅限tenant_access_token） */
  with_meeting_ability?: boolean
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcMeetingResponse {
  meeting?: Meeting
}

export interface ListByNoVcMeetingQuery extends Pagination {
  /** 9位会议号 */
  meeting_no: string
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
}

export interface StartVcMeetingRecordingRequest {
  /** 录制文件时间显示使用的时区[-12,12] */
  timezone?: number
}

export interface GetVcMeetingRecordingResponse {
  recording?: MeetingRecording
}

export const enum SetPermissionVcMeetingRecordingRequestActionType {
  /** 授权 */
  Authorize = 0,
  /** 取消授权 */
  Revoke = 1,
}

export interface SetPermissionVcMeetingRecordingRequest {
  /** 授权对象列表 */
  permission_objects: RecordingPermissionObject[]
  /** 授权或者取消授权，默认授权 */
  action_type?: SetPermissionVcMeetingRecordingRequestActionType
}

export interface SetPermissionVcMeetingRecordingQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export const enum GetDailyVcReportQueryUnit {
  /** 中国大陆 */
  CN = 0,
  /** 美国 */
  VA = 1,
  /** 新加坡 */
  SG = 2,
  /** 日本 */
  JP = 3,
}

export interface GetDailyVcReportQuery {
  /** 开始时间（unix时间，单位sec） */
  start_time: string
  /** 结束时间（unix时间，单位sec） */
  end_time: string
  /** 数据驻留地 */
  unit?: GetDailyVcReportQueryUnit
}

export interface GetDailyVcReportResponse {
  /** 会议报告 */
  meeting_report?: Report
}

export const enum GetTopUserVcReportQueryOrderBy {
  /** 会议数量 */
  MeetingCount = 1,
  /** 会议时长 */
  MeetingDuration = 2,
}

export const enum GetTopUserVcReportQueryUnit {
  /** 中国大陆 */
  CN = 0,
  /** 美国 */
  VA = 1,
  /** 新加坡 */
  SG = 2,
  /** 日本 */
  JP = 3,
}

export interface GetTopUserVcReportQuery {
  /** 开始时间（unix时间，单位sec） */
  start_time: string
  /** 结束时间（unix时间，单位sec） */
  end_time: string
  /** 取前多少位 */
  limit: number
  /** 排序依据（降序） */
  order_by: GetTopUserVcReportQueryOrderBy
  /** 数据驻留地 */
  unit?: GetTopUserVcReportQueryUnit
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetTopUserVcReportResponse {
  /** top用户列表 */
  top_user_report?: ReportTopUser[]
}

export const enum MeetingListVcExportRequestMeetingStatus {
  /** 进行中 */
  Ongoing = 1,
  /** 已结束 */
  Past = 2,
  /** 待召开 */
  Future = 3,
}

export const enum MeetingListVcExportRequestMeetingType {
  /** 全部类型（默认） */
  All = 1,
  /** 视频会议 */
  Meeting = 2,
  /** 本地投屏 */
  ShareScreen = 3,
}

export interface MeetingListVcExportRequest {
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 会议状态（不传默认为已结束会议） */
  meeting_status?: MeetingListVcExportRequestMeetingStatus
  /** 按9位会议号筛选（最多一个筛选条件） */
  meeting_no?: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
  /** 按会议类型筛选（最多一个筛选条件） */
  meeting_type?: MeetingListVcExportRequestMeetingType
}

export interface MeetingListVcExportQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface MeetingListVcExportResponse {
  /** 任务id */
  task_id?: string
}

export const enum ParticipantListVcExportRequestMeetingStatus {
  /** 进行中 */
  Ongoing = 1,
  /** 已结束 */
  Past = 2,
  /** 待召开 */
  Future = 3,
}

export interface ParticipantListVcExportRequest {
  /** 会议开始时间（unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec） */
  meeting_end_time: string
  /** 会议状态（不传默认为已结束会议） */
  meeting_status?: ParticipantListVcExportRequestMeetingStatus
  /** 9位会议号 */
  meeting_no: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
}

export interface ParticipantListVcExportQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ParticipantListVcExportResponse {
  /** 任务id */
  task_id?: string
}

export interface ParticipantQualityListVcExportRequest {
  /** 会议开始时间（unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec） */
  meeting_end_time: string
  /** 9位会议号 */
  meeting_no: string
  /** 参会人入会时间（unix时间，单位sec） */
  join_time: string
  /** 参会人为Lark用户时填入 */
  user_id?: string
  /** 参会人为Rooms时填入 */
  room_id?: string
}

export interface ParticipantQualityListVcExportQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ParticipantQualityListVcExportResponse {
  /** 任务id */
  task_id?: string
}

export interface ResourceReservationListVcExportRequest {
  /** 层级id */
  room_level_id: string
  /** 是否展示会议主题 */
  need_topic?: boolean
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 待筛选的会议室id列表 */
  room_ids?: string[]
  /** 若为true表示导出room_ids范围外的会议室，默认为false */
  is_exclude?: boolean
}

export interface ResourceReservationListVcExportResponse {
  /** 任务id */
  task_id?: string
}

export const enum GetVcExportResponseStatus {
  /** 处理中 */
  InProgress = 1,
  /** 失败 */
  Failed = 2,
  /** 完成 */
  Done = 3,
}

export interface GetVcExportResponse {
  /** 任务状态 */
  status: GetVcExportResponseStatus
  /** 文件下载地址 */
  url?: string
  /** 文件token */
  file_token?: string
  /** 失败信息 */
  fail_msg?: string
}

export interface DownloadVcExportQuery {
  /** 文档token */
  file_token: string
}

export interface CreateVcRoomLevelRequest {
  /** 层级名称 */
  name: string
  /** 父层级ID */
  parent_id: string
  /** 自定义层级ID */
  custom_group_id?: string
}

export interface CreateVcRoomLevelResponse {
  room_level?: RoomLevel
}

export interface DelVcRoomLevelRequest {
  /** 层级ID */
  room_level_id: string
  /** 是否删除所有子层级 */
  delete_child?: boolean
}

export interface PatchVcRoomLevelRequest {
  /** 层级名称 */
  name: string
  /** 父层级ID */
  parent_id: string
  /** 自定义层级ID */
  custom_group_id?: string
}

export interface GetVcRoomLevelResponse {
  room_level?: RoomLevel
}

export interface MgetVcRoomLevelRequest {
  /** 层级id列表 */
  level_ids: string[]
}

export interface MgetVcRoomLevelResponse {
  /** 层级列表 */
  items?: RoomLevel[]
}

export interface ListVcRoomLevelQuery extends Pagination {
  /** 层级ID，不传则返回该租户下第一层级列表 */
  room_level_id?: string
}

export interface SearchVcRoomLevelQuery {
  /** 用于查询指定会议室的租户自定义会议室ID */
  custom_level_ids: string
}

export interface SearchVcRoomLevelResponse {
  /** 层级id列表 */
  level_ids?: string[]
}

export interface CreateVcRoomRequest {
  /** 会议室名称 */
  name: string
  /** 会议室能容纳的人数 */
  capacity: number
  /** 会议室的相关描述 */
  description?: string
  /** 自定义的会议室ID */
  custom_room_id?: string
  /** 层级ID */
  room_level_id: string
  /** 会议室状态 */
  room_status?: RoomStatus
  /** 设施信息列表 */
  device?: Device[]
}

export interface CreateVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateVcRoomResponse {
  room?: Room
}

export interface PatchVcRoomRequest {
  /** 会议室名称 */
  name?: string
  /** 会议室能容纳的人数 */
  capacity?: number
  /** 会议室的相关描述 */
  description?: string
  /** 自定义的会议室ID */
  custom_room_id?: string
  /** 层级ID */
  room_level_id?: string
  /** 会议室状态 */
  room_status?: RoomStatus
  /** 设施信息列表 */
  device?: Device[]
}

export interface PatchVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcRoomResponse {
  room?: Room
}

export interface MgetVcRoomRequest {
  /** 会议室id列表 */
  room_ids: string[]
}

export interface MgetVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface MgetVcRoomResponse {
  /** 会议室列表 */
  items?: Room[]
}

export interface ListVcRoomQuery extends Pagination {
  /** 层级ID，不传则返回该租户下的所有会议室 */
  room_level_id?: string
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface SearchVcRoomRequest {
  /** 用于查询指定会议室的租户自定义会议室ID列表，优先使用该字段进行查询 */
  custom_room_ids?: string[]
  /** 会议室搜索关键词（当custom_room_ids为空时，使用该字段进行查询） */
  keyword?: string
  /** 在该会议室层级下进行搜索 */
  room_level_id?: string
  /** 搜索会议室是否包括层级名称 */
  search_level_name?: boolean
  /** 分页大小，该值默认为10，最大为100 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
}

export interface SearchVcRoomQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export const enum GetVcScopeConfigQueryScopeType {
  /** 会议室层级 */
  RoomLevel = 1,
  /** 会议室 */
  Room = 2,
}

export interface GetVcScopeConfigQuery {
  /** 查询节点范围 */
  scope_type: GetVcScopeConfigQueryScopeType
  /** 查询节点ID：如果scope_type为1，则为层级ID，如果scope_type为2，则为会议室ID */
  scope_id: string
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcScopeConfigResponse {
  /** 当前节点的配置，根据层级顺序从底向上进行合并计算后的结果；如果当前节点某个值已配置，则取该节点的值，否则会从该节点的父层级节点获取，如果父节点依然未配置，则继续向上递归获取；若所有节点均未配置，则该值返回为空 */
  current_config?: ScopeConfig
  /** 所有节点的原始配置，按照层级顺序从底向上返回；如果某节点某个值未配置，则该值返回为空 */
  origin_configs?: ScopeConfig[]
}

export const enum CreateVcScopeConfigRequestScopeType {
  /** 会议室层级 */
  RoomLevel = 1,
  /** 会议室 */
  Room = 2,
}

export interface CreateVcScopeConfigRequest {
  /** 查询节点范围 */
  scope_type: CreateVcScopeConfigRequestScopeType
  /** 查询节点ID：如果scope_type为1，则为层级ID，如果scope_type为2，则为会议室ID */
  scope_id: string
  /** 节点配置 */
  scope_config?: RoomConfig
}

export interface CreateVcScopeConfigQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ReserveScopeVcReserveConfigQuery {
  /** 会议室或层级id */
  scope_id: string
  /** 1代表层级，2代表会议室 */
  scope_type: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ReserveScopeVcReserveConfigResponse {
  /** 预定审批设置 */
  approve_config?: ApprovalConfig
  /** 预定时间设置 */
  time_config?: TimeConfig
  /** 预定范围设置 */
  reserve_scope_config?: ReserveScopeConfig
}

export interface PatchVcReserveConfigRequest {
  /** 1代表层级，2代表会议室 */
  scope_type: string
  /** 预定审批设置 */
  approval_config?: ApprovalConfig
  /** 预定时间设置 */
  time_config?: TimeConfig
  /** 预定范围设置 */
  reserve_scope_config?: ReserveScopeConfig
}

export interface PatchVcReserveConfigQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcReserveConfigFormQuery {
  /** 1代表层级，2代表会议室 */
  scope_type: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcReserveConfigFormResponse {
  /** 预定表单 */
  reserve_form_config: ReserveFormConfig
}

export interface PatchVcReserveConfigFormRequest {
  /** 1代表层级，2代表会议室 */
  scope_type: number
  /** 预定表单设置 */
  reserve_form_config: ReserveFormConfig
}

export interface PatchVcReserveConfigFormQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcReserveConfigAdminQuery {
  /** 会议室或层级 */
  scope_type: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcReserveConfigAdminResponse {
  /** 预定管理员/部门 */
  reserve_admin_config: ReserveAdminConfig
}

export interface PatchVcReserveConfigAdminRequest {
  /** 1代表层级，2代表会议室 */
  scope_type: number
  /** 预定管理员或部门 */
  reserve_admin_config: ReserveAdminConfig
}

export interface PatchVcReserveConfigAdminQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcReserveConfigDisableInformQuery {
  /** 1表示层级，2表示会议室 */
  scope_type: number
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcReserveConfigDisableInformResponse {
  /** 会议室禁用通知配置 */
  disable_inform?: DisableInformConfig
}

export interface PatchVcReserveConfigDisableInformRequest {
  /** 1表示会议室层级，2表示会议室 */
  scope_type: number
  /** 禁用通知配置 */
  disable_inform: DisableInformConfig
}

export interface PatchVcReserveConfigDisableInformQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export const enum GetVcMeetingListQueryMeetingStatus {
  /** 进行中 */
  Ongoing = 1,
  /** 已结束 */
  Past = 2,
  /** 待召开 */
  Future = 3,
}

export const enum GetVcMeetingListQueryMeetingType {
  /** 全部类型（默认） */
  All = 1,
  /** 视频会议 */
  Meeting = 2,
  /** 本地投屏 */
  ShareScreen = 3,
}

export interface GetVcMeetingListQuery extends Pagination {
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 会议状态 */
  meeting_status?: GetVcMeetingListQueryMeetingStatus
  /** 按9位会议号筛选（最多一个筛选条件） */
  meeting_no?: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
  /** 按会议类型筛选（最多一个筛选条件） */
  meeting_type?: GetVcMeetingListQueryMeetingType
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export const enum GetVcParticipantListQueryMeetingStatus {
  /** 进行中 */
  Ongoing = 1,
  /** 已结束 */
  Past = 2,
  /** 待召开 */
  Future = 3,
}

export interface GetVcParticipantListQuery extends Pagination {
  /** 会议开始时间（需要精确到一分钟，unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec；对于进行中会议则传0） */
  meeting_end_time: string
  /** 会议状态（不传默认为已结束会议） */
  meeting_status?: GetVcParticipantListQueryMeetingStatus
  /** 9位会议号 */
  meeting_no: string
  /** 按参会Lark用户筛选（最多一个筛选条件） */
  user_id?: string
  /** 按参会Rooms筛选（最多一个筛选条件） */
  room_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcParticipantQualityListQuery extends Pagination {
  /** 会议开始时间（需要精确到一分钟，unix时间，单位sec） */
  meeting_start_time: string
  /** 会议结束时间（unix时间，单位sec） */
  meeting_end_time: string
  /** 9位会议号 */
  meeting_no: string
  /** 参会人入会时间（unix时间，单位sec） */
  join_time: string
  /** 参会人为Lark用户时填入 */
  user_id?: string
  /** 参会人为Rooms时填入 */
  room_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetVcResourceReservationListQuery extends Pagination {
  /** 层级id */
  room_level_id: string
  /** 是否展示会议主题 */
  need_topic?: boolean
  /** 查询开始时间（unix时间，单位sec） */
  start_time: string
  /** 查询结束时间（unix时间，单位sec） */
  end_time: string
  /** 待筛选的会议室id列表 */
  room_ids: string[]
  /** 若为true表示导出room_ids范围外的会议室，默认为false */
  is_exclude?: boolean
}

export const enum ListVcAlertQueryQueryType {
  /** 会议室 */
  Room = 1,
  /** erc */
  Erc = 2,
  /** SIP会议室系统 */
  Sip = 3,
}

export interface ListVcAlertQuery extends Pagination {
  /** 开始时间（unix时间，单位sec） */
  start_time: string
  /** 结束时间（unix时间，单位sec） */
  end_time: string
  /** 查询对象类型 */
  query_type?: ListVcAlertQueryQueryType
  /** 查询对象ID */
  query_value?: string
}

export const enum SetCheckboardAccessCodeVcRoomConfigRequestScope {
  /** 租户 */
  Tenant = 1,
  /** 国家/地区 */
  CountryDistrict = 2,
  /** 城市 */
  City = 3,
  /** 建筑 */
  Building = 4,
  /** 楼层 */
  Floor = 5,
  /** 会议室 */
  Room = 6,
}

export const enum SetCheckboardAccessCodeVcRoomConfigRequestValidDay {
  /** 1天 */
  Day = 1,
  /** 7天 */
  Week = 7,
  /** 30天 */
  Month = 30,
}

export interface SetCheckboardAccessCodeVcRoomConfigRequest {
  /** 设置节点范围 */
  scope: SetCheckboardAccessCodeVcRoomConfigRequestScope
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 有效天数 */
  valid_day: SetCheckboardAccessCodeVcRoomConfigRequestValidDay
}

export interface SetCheckboardAccessCodeVcRoomConfigResponse {
  /** 部署访问码 */
  access_code?: string
}

export const enum SetRoomAccessCodeVcRoomConfigRequestScope {
  /** 租户 */
  Tenant = 1,
  /** 国家/地区 */
  CountryDistrict = 2,
  /** 城市 */
  City = 3,
  /** 建筑 */
  Building = 4,
  /** 楼层 */
  Floor = 5,
  /** 会议室 */
  Room = 6,
}

export const enum SetRoomAccessCodeVcRoomConfigRequestValidDay {
  /** 1天 */
  Day = 1,
  /** 7天 */
  Week = 7,
  /** 30天 */
  Month = 30,
}

export interface SetRoomAccessCodeVcRoomConfigRequest {
  /** 设置节点范围 */
  scope: SetRoomAccessCodeVcRoomConfigRequestScope
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 有效天数 */
  valid_day: SetRoomAccessCodeVcRoomConfigRequestValidDay
}

export interface SetRoomAccessCodeVcRoomConfigResponse {
  /** 部署访问码 */
  access_code?: string
}

export const enum QueryVcRoomConfigQueryScope {
  /** 租户 */
  Tenant = 1,
  /** 国家/地区 */
  CountryDistrict = 2,
  /** 城市 */
  City = 3,
  /** 建筑 */
  Building = 4,
  /** 楼层 */
  Floor = 5,
  /** 会议室 */
  Room = 6,
}

export interface QueryVcRoomConfigQuery {
  /** 查询节点范围 */
  scope: QueryVcRoomConfigQueryScope
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface QueryVcRoomConfigResponse {
  /** 飞书会议室背景图 */
  room_background?: string
  /** 飞书签到板背景图 */
  display_background?: string
  /** 飞书会议室数字标牌 */
  digital_signage?: RoomDigitalSignage
  /** 飞书投屏盒子数字标牌 */
  room_box_digital_signage?: RoomDigitalSignage
  /** 会议室状态 */
  room_status?: RoomStatus
}

export const enum SetVcRoomConfigRequestScope {
  /** 租户 */
  Tenant = 1,
  /** 国家/地区 */
  CountryDistrict = 2,
  /** 城市 */
  City = 3,
  /** 建筑 */
  Building = 4,
  /** 楼层 */
  Floor = 5,
  /** 会议室 */
  Room = 6,
}

export interface SetVcRoomConfigRequest {
  /** 设置节点范围 */
  scope: SetVcRoomConfigRequestScope
  /** 国家/地区ID scope为2，3时需要此参数 */
  country_id?: string
  /** 城市ID scope为3时需要此参数 */
  district_id?: string
  /** 建筑ID scope为4，5时需要此参数 */
  building_id?: string
  /** 楼层 scope为5时需要此参数 */
  floor_name?: string
  /** 会议室ID scope为6时需要此参数 */
  room_id?: string
  /** 会议室设置 */
  room_config: RoomConfig
}

export interface SetVcRoomConfigQuery {
  /** 此次调用中使用的用户ID的类型，默认使用open_id可不填 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

Internal.define({
  '/vc/v1/reserves/apply': {
    POST: 'applyVcReserve',
  },
  '/vc/v1/reserves/{reserve_id}': {
    DELETE: 'deleteVcReserve',
    PUT: 'updateVcReserve',
    GET: 'getVcReserve',
  },
  '/vc/v1/reserves/{reserve_id}/get_active_meeting': {
    GET: 'getActiveMeetingVcReserve',
  },
  '/vc/v1/meetings/{meeting_id}/invite': {
    PATCH: 'inviteVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}/kickout': {
    POST: 'kickoutVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}/set_host': {
    PATCH: 'setHostVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}/end': {
    PATCH: 'endVcMeeting',
  },
  '/vc/v1/meetings/{meeting_id}': {
    GET: 'getVcMeeting',
  },
  '/vc/v1/meetings/list_by_no': {
    GET: { name: 'listByNoVcMeeting', pagination: { argIndex: 0, itemsKey: 'meeting_briefs' } },
  },
  '/vc/v1/meetings/{meeting_id}/recording/start': {
    PATCH: 'startVcMeetingRecording',
  },
  '/vc/v1/meetings/{meeting_id}/recording/stop': {
    PATCH: 'stopVcMeetingRecording',
  },
  '/vc/v1/meetings/{meeting_id}/recording': {
    GET: 'getVcMeetingRecording',
  },
  '/vc/v1/meetings/{meeting_id}/recording/set_permission': {
    PATCH: 'setPermissionVcMeetingRecording',
  },
  '/vc/v1/reports/get_daily': {
    GET: 'getDailyVcReport',
  },
  '/vc/v1/reports/get_top_user': {
    GET: 'getTopUserVcReport',
  },
  '/vc/v1/exports/meeting_list': {
    POST: 'meetingListVcExport',
  },
  '/vc/v1/exports/participant_list': {
    POST: 'participantListVcExport',
  },
  '/vc/v1/exports/participant_quality_list': {
    POST: 'participantQualityListVcExport',
  },
  '/vc/v1/exports/resource_reservation_list': {
    POST: 'resourceReservationListVcExport',
  },
  '/vc/v1/exports/{task_id}': {
    GET: 'getVcExport',
  },
  '/vc/v1/exports/download': {
    GET: { name: 'downloadVcExport', type: 'binary' },
  },
  '/vc/v1/room_levels': {
    POST: 'createVcRoomLevel',
    GET: { name: 'listVcRoomLevel', pagination: { argIndex: 0 } },
  },
  '/vc/v1/room_levels/del': {
    POST: 'delVcRoomLevel',
  },
  '/vc/v1/room_levels/{room_level_id}': {
    PATCH: 'patchVcRoomLevel',
    GET: 'getVcRoomLevel',
  },
  '/vc/v1/room_levels/mget': {
    POST: 'mgetVcRoomLevel',
  },
  '/vc/v1/room_levels/search': {
    GET: 'searchVcRoomLevel',
  },
  '/vc/v1/rooms': {
    POST: 'createVcRoom',
    GET: { name: 'listVcRoom', pagination: { argIndex: 0, itemsKey: 'rooms' } },
  },
  '/vc/v1/rooms/{room_id}': {
    DELETE: 'deleteVcRoom',
    PATCH: 'patchVcRoom',
    GET: 'getVcRoom',
  },
  '/vc/v1/rooms/mget': {
    POST: 'mgetVcRoom',
  },
  '/vc/v1/rooms/search': {
    POST: 'searchVcRoom',
  },
  '/vc/v1/scope_config': {
    GET: 'getVcScopeConfig',
    POST: 'createVcScopeConfig',
  },
  '/vc/v1/reserve_configs/reserve_scope': {
    GET: 'reserveScopeVcReserveConfig',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}': {
    PATCH: 'patchVcReserveConfig',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}/form': {
    GET: 'getVcReserveConfigForm',
    PATCH: 'patchVcReserveConfigForm',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}/admin': {
    GET: 'getVcReserveConfigAdmin',
    PATCH: 'patchVcReserveConfigAdmin',
  },
  '/vc/v1/reserve_configs/{reserve_config_id}/disable_inform': {
    GET: 'getVcReserveConfigDisableInform',
    PATCH: 'patchVcReserveConfigDisableInform',
  },
  '/vc/v1/meeting_list': {
    GET: { name: 'getVcMeetingList', pagination: { argIndex: 0, itemsKey: 'meeting_list' } },
  },
  '/vc/v1/participant_list': {
    GET: { name: 'getVcParticipantList', pagination: { argIndex: 0, itemsKey: 'participants' } },
  },
  '/vc/v1/participant_quality_list': {
    GET: { name: 'getVcParticipantQualityList', pagination: { argIndex: 0, itemsKey: 'participant_quality_list' } },
  },
  '/vc/v1/resource_reservation_list': {
    GET: { name: 'getVcResourceReservationList', pagination: { argIndex: 0, itemsKey: 'room_reservation_list' } },
  },
  '/vc/v1/alerts': {
    GET: { name: 'listVcAlert', pagination: { argIndex: 0 } },
  },
  '/vc/v1/room_configs/set_checkboard_access_code': {
    POST: 'setCheckboardAccessCodeVcRoomConfig',
  },
  '/vc/v1/room_configs/set_room_access_code': {
    POST: 'setRoomAccessCodeVcRoomConfig',
  },
  '/vc/v1/room_configs/query': {
    GET: 'queryVcRoomConfig',
  },
  '/vc/v1/room_configs/set': {
    POST: 'setVcRoomConfig',
  },
})
