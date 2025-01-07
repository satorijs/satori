import { ApprovalInfo, ArchiveField, ArchiveReportData, ArchiveReportMeta, File, FlexibleRule, FreePunchCfg, Group, GroupMeta, LangText, LateOffLateOnRule, LateOffLateOnSetting, LeaveAccrualRecord, LeaveEmployExpireRecord, LeaveNeedPunchCfg, Location, Machine, MemberStatusChange, OvertimeClockCfg, OvertimeRule, PunchMember, PunchSpecialDateShift, PunchTimeRule, RestRule, RestTimeFlexibleConfig, Shift, ShiftAttendanceTimeConfig, ShiftMiddleTimeRule, UserAllowedRemedy, UserApproval, UserBase, UserDailyShift, UserFlow, UserSetting, UserStatsData, UserStatsField, UserStatsView, UserTask, UserTaskRemedy, UserTmpDailyShift } from '.'
import { Internal, Paginated } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建班次
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create
     */
    createAttendanceShift(body: CreateAttendanceShiftRequest, query?: CreateAttendanceShiftQuery): Promise<CreateAttendanceShiftResponse>
    /**
     * 删除班次
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/delete
     */
    deleteAttendanceShift(shift_id: string): Promise<void>
    /**
     * 按 ID 查询班次
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/get
     */
    getAttendanceShift(shift_id: string): Promise<GetAttendanceShiftResponse>
    /**
     * 按名称查询班次
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query
     */
    queryAttendanceShift(query?: QueryAttendanceShiftQuery): Promise<QueryAttendanceShiftResponse>
    /**
     * 查询所有班次
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list
     */
    listAttendanceShift(query?: Pagination): Promise<Paginated<Shift, 'shift_list'>>
    /**
     * 查询所有班次
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list
     */
    listAttendanceShiftIter(): AsyncIterator<Shift>
    /**
     * 创建或修改排班表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create
     */
    batchCreateAttendanceUserDailyShift(body: BatchCreateAttendanceUserDailyShiftRequest, query?: BatchCreateAttendanceUserDailyShiftQuery): Promise<BatchCreateAttendanceUserDailyShiftResponse>
    /**
     * 查询排班表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/query
     */
    queryAttendanceUserDailyShift(body: QueryAttendanceUserDailyShiftRequest, query?: QueryAttendanceUserDailyShiftQuery): Promise<QueryAttendanceUserDailyShiftResponse>
    /**
     * 创建或修改临时排班
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create_temp
     */
    batchCreateTempAttendanceUserDailyShift(body: BatchCreateTempAttendanceUserDailyShiftRequest, query?: BatchCreateTempAttendanceUserDailyShiftQuery): Promise<BatchCreateTempAttendanceUserDailyShiftResponse>
    /**
     * 查询考勤组下所有成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list_user
     */
    listUserAttendanceGroup(group_id: string, query?: ListUserAttendanceGroupQuery & Pagination): Promise<Paginated<UserBase, 'users'>>
    /**
     * 查询考勤组下所有成员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list_user
     */
    listUserAttendanceGroupIter(group_id: string, query?: ListUserAttendanceGroupQuery): AsyncIterator<UserBase>
    /**
     * 创建或修改考勤组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create
     */
    createAttendanceGroup(body: CreateAttendanceGroupRequest, query?: CreateAttendanceGroupQuery): Promise<CreateAttendanceGroupResponse>
    /**
     * 删除考勤组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/delete
     */
    deleteAttendanceGroup(group_id: string): Promise<void>
    /**
     * 按 ID 查询考勤组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/get
     */
    getAttendanceGroup(group_id: string, query?: GetAttendanceGroupQuery): Promise<GetAttendanceGroupResponse>
    /**
     * 按名称查询考勤组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search
     */
    searchAttendanceGroup(body: SearchAttendanceGroupRequest): Promise<SearchAttendanceGroupResponse>
    /**
     * 查询所有考勤组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list
     */
    listAttendanceGroup(query?: Pagination): Promise<Paginated<GroupMeta, 'group_list'>>
    /**
     * 查询所有考勤组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list
     */
    listAttendanceGroupIter(): AsyncIterator<GroupMeta>
    /**
     * 修改用户人脸识别信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/modify
     */
    modifyAttendanceUserSetting(body: ModifyAttendanceUserSettingRequest, query?: ModifyAttendanceUserSettingQuery): Promise<ModifyAttendanceUserSettingResponse>
    /**
     * 批量查询用户人脸识别信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/query
     */
    queryAttendanceUserSetting(body: QueryAttendanceUserSettingRequest, query?: QueryAttendanceUserSettingQuery): Promise<QueryAttendanceUserSettingResponse>
    /**
     * 上传用户人脸识别照片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload
     */
    uploadAttendanceFile(form: UploadAttendanceFileForm, query?: UploadAttendanceFileQuery): Promise<UploadAttendanceFileResponse>
    /**
     * 下载用户人脸识别照片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/download
     */
    downloadAttendanceFile(file_id: string): Promise<ArrayBuffer>
    /**
     * 更新统计设置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/update
     */
    updateAttendanceUserStatsView(user_stats_view_id: string, body: UpdateAttendanceUserStatsViewRequest, query?: UpdateAttendanceUserStatsViewQuery): Promise<UpdateAttendanceUserStatsViewResponse>
    /**
     * 查询统计表头
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_field/query
     */
    queryAttendanceUserStatsField(body: QueryAttendanceUserStatsFieldRequest, query?: QueryAttendanceUserStatsFieldQuery): Promise<QueryAttendanceUserStatsFieldResponse>
    /**
     * 查询统计设置
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query
     */
    queryAttendanceUserStatsView(body: QueryAttendanceUserStatsViewRequest, query?: QueryAttendanceUserStatsViewQuery): Promise<QueryAttendanceUserStatsViewResponse>
    /**
     * 查询统计数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_data/query
     */
    queryAttendanceUserStatsData(body: QueryAttendanceUserStatsDataRequest, query?: QueryAttendanceUserStatsDataQuery): Promise<QueryAttendanceUserStatsDataResponse>
    /**
     * 获取审批通过数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query
     */
    queryAttendanceUserApproval(body: QueryAttendanceUserApprovalRequest, query?: QueryAttendanceUserApprovalQuery): Promise<QueryAttendanceUserApprovalResponse>
    /**
     * 写入审批结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create
     */
    createAttendanceUserApproval(body: CreateAttendanceUserApprovalRequest, query?: CreateAttendanceUserApprovalQuery): Promise<CreateAttendanceUserApprovalResponse>
    /**
     * 通知审批状态更新
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process
     */
    processAttendanceApprovalInfo(body: ProcessAttendanceApprovalInfoRequest): Promise<ProcessAttendanceApprovalInfoResponse>
    /**
     * 通知补卡审批发起
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create
     */
    createAttendanceUserTaskRemedy(body: CreateAttendanceUserTaskRemedyRequest, query?: CreateAttendanceUserTaskRemedyQuery): Promise<CreateAttendanceUserTaskRemedyResponse>
    /**
     * 获取可补卡时间
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query_user_allowed_remedys
     */
    queryUserAllowedRemedysAttendanceUserTaskRemedy(body: QueryUserAllowedRemedysAttendanceUserTaskRemedyRequest, query?: QueryUserAllowedRemedysAttendanceUserTaskRemedyQuery): Promise<QueryUserAllowedRemedysAttendanceUserTaskRemedyResponse>
    /**
     * 获取补卡记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query
     */
    queryAttendanceUserTaskRemedy(body: QueryAttendanceUserTaskRemedyRequest, query?: QueryAttendanceUserTaskRemedyQuery): Promise<QueryAttendanceUserTaskRemedyResponse>
    /**
     * 查询归档报表表头
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/user_stats_fields_query
     */
    userStatsFieldsQueryAttendanceArchiveRule(body: UserStatsFieldsQueryAttendanceArchiveRuleRequest, query?: UserStatsFieldsQueryAttendanceArchiveRuleQuery): Promise<UserStatsFieldsQueryAttendanceArchiveRuleResponse>
    /**
     * 写入归档报表结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/upload_report
     */
    uploadReportAttendanceArchiveRule(body: UploadReportAttendanceArchiveRuleRequest, query?: UploadReportAttendanceArchiveRuleQuery): Promise<UploadReportAttendanceArchiveRuleResponse>
    /**
     * 删除归档报表行数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/del_report
     */
    delReportAttendanceArchiveRule(body: DelReportAttendanceArchiveRuleRequest, query?: DelReportAttendanceArchiveRuleQuery): Promise<void>
    /**
     * 查询所有归档规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/list
     */
    listAttendanceArchiveRule(query?: Pagination): Promise<Paginated<ArchiveReportMeta>>
    /**
     * 查询所有归档规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/list
     */
    listAttendanceArchiveRuleIter(): AsyncIterator<ArchiveReportMeta>
    /**
     * 导入打卡流水
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create
     */
    batchCreateAttendanceUserFlow(body: BatchCreateAttendanceUserFlowRequest, query?: BatchCreateAttendanceUserFlowQuery): Promise<BatchCreateAttendanceUserFlowResponse>
    /**
     * 查询打卡流水
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/get
     */
    getAttendanceUserFlow(user_flow_id: string, query?: GetAttendanceUserFlowQuery): Promise<GetAttendanceUserFlowResponse>
    /**
     * 批量查询打卡流水
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query
     */
    queryAttendanceUserFlow(body: QueryAttendanceUserFlowRequest, query?: QueryAttendanceUserFlowQuery): Promise<QueryAttendanceUserFlowResponse>
    /**
     * 查询打卡结果
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query
     */
    queryAttendanceUserTask(body: QueryAttendanceUserTaskRequest, query?: QueryAttendanceUserTaskQuery): Promise<QueryAttendanceUserTaskResponse>
    /**
     * 通过过期时间获取发放记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_employ_expire_record/get
     */
    getAttendanceLeaveEmployExpireRecord(leave_id: string, body: GetAttendanceLeaveEmployExpireRecordRequest, query?: GetAttendanceLeaveEmployExpireRecordQuery): Promise<GetAttendanceLeaveEmployExpireRecordResponse>
    /**
     * 修改发放记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_accrual_record/patch
     */
    patchAttendanceLeaveAccrualRecord(leave_id: string, body: PatchAttendanceLeaveAccrualRecordRequest, query?: PatchAttendanceLeaveAccrualRecordQuery): Promise<PatchAttendanceLeaveAccrualRecordResponse>
  }
}

export interface CreateAttendanceShiftRequest {
  /** 班次名称 */
  shift_name: string
  /** 打卡次数 */
  punch_times: number
  /** 排班组子负责人id列表 */
  sub_shift_leader_ids?: string[]
  /** 是否弹性打卡 */
  is_flexible?: boolean
  /** 弹性打卡时间，设置【上班最多可晚到】与【下班最多可早走】时间，如果不设置flexible_rule则生效 */
  flexible_minutes?: number
  /** 弹性打卡时间设置 */
  flexible_rule?: FlexibleRule[]
  /** 不需要打下班卡 */
  no_need_off?: boolean
  /** 打卡规则 */
  punch_time_rule: PunchTimeRule[]
  /** 晚走晚到规则 */
  late_off_late_on_rule?: LateOffLateOnRule[]
  /** 休息规则 */
  rest_time_rule?: RestRule[]
  /** 打卡规则 */
  overtime_rule?: OvertimeRule[]
  /** 日期类型，【是否弹性打卡 = ture】时，不可设置为“休息日”  可选值：1：工作日 2：休息日     示例值：（默认值）1 */
  day_type?: number
  /** 班外休息规则 */
  overtime_rest_time_rule?: RestRule[]
  /** 晚到多久记为严重迟到（优先级比原有字段高） */
  late_minutes_as_serious_late?: number
  /** 半天分割规则 */
  shift_middle_time_rule?: ShiftMiddleTimeRule
  /** 应出勤配置 */
  shift_attendance_time_config?: ShiftAttendanceTimeConfig
  /** 晚走次日晚到配置规则 */
  late_off_late_on_setting?: LateOffLateOnSetting
  /** 班次id(更新班次时需要传递) */
  id?: string
  /** 休息弹性设置 */
  rest_time_flexible_configs?: RestTimeFlexibleConfig[]
}

export interface CreateAttendanceShiftQuery {
  /** 用户 ID 的类型 不提供则用户相关字段无效 */
  employee_type?: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceShiftQuery {
  /** 班次名称 */
  shift_name: string
}

export interface BatchCreateAttendanceUserDailyShiftRequest {
  /** 班表信息列表 */
  user_daily_shifts: UserDailyShift[]
  /** 操作人uid，如果您未操作[考勤管理后台“API 接入”流程](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines)，则此字段为必填字段 */
  operator_id?: string
}

export interface BatchCreateAttendanceUserDailyShiftQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserDailyShiftRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始工作日 */
  check_date_from: number
  /** 查询的结束工作日 */
  check_date_to: number
}

export interface QueryAttendanceUserDailyShiftQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface BatchCreateTempAttendanceUserDailyShiftRequest {
  /** 临时班表信息列表（数量限制50以内） */
  user_tmp_daily_shifts: UserTmpDailyShift[]
  /** 操作人uid */
  operator_id?: string
}

export interface BatchCreateTempAttendanceUserDailyShiftQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface ListUserAttendanceGroupQuery {
  /** 用户 ID 的类型 */
  employee_type: string
  /** 部门 ID 的类型 */
  dept_type: string
  /** 打卡类型 */
  member_clock_type: number
}

export interface CreateAttendanceGroupRequest {
  /** 6921319402260496386 */
  group: Group
  /** 操作人uid，如果您未操作[考勤管理后台“API 接入”流程](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines)，则此字段为必填字段 */
  operator_id?: string
}

export interface CreateAttendanceGroupQuery {
  /** 用户 ID 的类型 */
  employee_type: 'employee_id' | 'employee_no'
  /** 部门 ID 的类型 */
  dept_type: 'open_id'
}

export interface GetAttendanceGroupQuery {
  /** 用户 ID 的类型 */
  employee_type: 'employee_id' | 'employee_no'
  /** 部门 ID 的类型 */
  dept_type: 'open_id'
}

export interface SearchAttendanceGroupRequest {
  /** 考勤组名称 */
  group_name: string
}

export interface ModifyAttendanceUserSettingRequest {
  /** 用户设置 */
  user_setting?: UserSetting
}

export interface ModifyAttendanceUserSettingQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserSettingRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
}

export interface QueryAttendanceUserSettingQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface UploadAttendanceFileForm {
  /** 文件内容 */
  file?: Blob
}

export interface UploadAttendanceFileQuery {
  /** 带后缀的文件名 */
  file_name: string
}

export interface UpdateAttendanceUserStatsViewRequest {
  /** 统计设置 */
  view: UserStatsView
}

export interface UpdateAttendanceUserStatsViewQuery {
  /** 员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserStatsFieldRequest {
  /** 语言类型 */
  locale: 'en' | 'ja' | 'zh'
  /** 统计类型 */
  stats_type: 'daily' | 'month'
  /** 开始时间 */
  start_date: number
  /** 结束时间（时间间隔不超过 40 天） */
  end_date: number
}

export interface QueryAttendanceUserStatsFieldQuery {
  /** 响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserStatsViewRequest {
  /** 语言类型 */
  locale: 'en' | 'ja' | 'zh'
  /** 统计类型 */
  stats_type: 'daily' | 'month'
  /** 查询用户id，同【查询统计数据】、【更新统计设置】user_id */
  user_id?: string
}

export interface QueryAttendanceUserStatsViewQuery {
  /** 响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserStatsDataRequest {
  /** 语言类型 */
  locale: 'en' | 'ja' | 'zh'
  /** 统计类型 */
  stats_type: 'daily' | 'month'
  /** 开始时间 */
  start_date: number
  /** 结束时间（时间间隔不超过 40 天） */
  end_date: number
  /** 查询的用户 ID 列表（用户数量不超过 200） */
  user_ids?: string[]
  /** 是否需要历史数据 */
  need_history?: boolean
  /** 只展示当前考勤组 */
  current_group_only?: boolean
  /** 查询用户id，同【更新统计设置】、【查询统计设置】user_id */
  user_id?: string
}

export interface QueryAttendanceUserStatsDataQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserApprovalRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始工作日 */
  check_date_from: number
  /** 查询的结束工作日，与 check_date_from 的时间间隔不超过 30 天 */
  check_date_to: number
  /** 查询依据的时间类型（不填默认依据PeriodTime） */
  check_date_type?: 'PeriodTime' | 'CreateTime' | 'UpdateTime'
  /** 查询状态（不填默认查询已通过状态） */
  status?: 0 | 1 | 2 | 3 | 4
  /** 查询的起始时间，精确到秒的时间戳 */
  check_time_from?: string
  /** 查询的结束时间，精确到秒的时间戳 */
  check_time_to?: string
}

export interface QueryAttendanceUserApprovalQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no' | 'open_id'
}

export interface CreateAttendanceUserApprovalRequest {
  /** 审批信息 */
  user_approval?: UserApproval
}

export interface CreateAttendanceUserApprovalQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no' | 'open_id'
}

export interface ProcessAttendanceApprovalInfoRequest {
  /** 审批实例 ID，获取方式：1）[获取审批通过数据](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query) 2）[写入审批结果](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create) 3）[通知补卡审批发起（补卡情况下）](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create) */
  approval_id: string
  /** 审批类型，leave：请假，out：外出，overtime：加班，trip：出差，remedy：补卡 */
  approval_type: string
  /** 审批状态，1：不通过，2：通过，4：撤销 */
  status: number
}

export interface CreateAttendanceUserTaskRemedyRequest {
  /** 用户工号 */
  user_id: string
  /** 补卡日期 */
  remedy_date: number
  /** 第几次上下班，可能值0，1，2 */
  punch_no: number
  /** 上班/下班，1是上班，2是下班 */
  work_type: number
  /** 补卡时间 */
  remedy_time: string
  /** 补卡原因 */
  reason: string
  /** 补卡时间戳，精确到秒的时间戳 */
  time?: string
}

export interface CreateAttendanceUserTaskRemedyQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryUserAllowedRemedysAttendanceUserTaskRemedyRequest {
  /** 用户 ID */
  user_id: string
  /** 补卡日期 */
  remedy_date: number
}

export interface QueryUserAllowedRemedysAttendanceUserTaskRemedyQuery {
  /** 请求体和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserTaskRemedyRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始时间，精确到秒的时间戳 */
  check_time_from: string
  /** 查询的结束时间，精确到秒的时间戳 */
  check_time_to: string
  /** 查询依据的时间类型（不填默认依据PeriodTime） */
  check_date_type?: 'PeriodTime' | 'CreateTime' | 'UpdateTime'
  /** 查询状态（不填默认查询已通过状态） */
  status?: 0 | 1 | 2 | 3 | 4
}

export interface QueryAttendanceUserTaskRemedyQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface UserStatsFieldsQueryAttendanceArchiveRuleRequest {
  /** 语言类型 */
  locale?: string
  /** 月份 */
  month: string
  /** 归档规则id */
  archive_rule_id: string
  /** 操作者id */
  operator_id: string
}

export interface UserStatsFieldsQueryAttendanceArchiveRuleQuery {
  /** 用户 ID 的类型 */
  employee_type: string
}

export interface UploadReportAttendanceArchiveRuleRequest {
  /** 月份 */
  month: string
  /** 操作者ID */
  operator_id: string
  /** 归档报表内容(不超过50个) */
  archive_report_datas?: ArchiveReportData[]
  /** 归档规则id */
  archive_rule_id: string
}

export interface UploadReportAttendanceArchiveRuleQuery {
  /** 用户 ID 的类型 */
  employee_type: string
}

export interface DelReportAttendanceArchiveRuleRequest {
  /** 月份 */
  month: string
  /** 操作者ID */
  operator_id: string
  /** 归档规则id */
  archive_rule_id: string
  /** 用户id */
  user_ids?: string[]
}

export interface DelReportAttendanceArchiveRuleQuery {
  /** 员工工号类型 */
  employee_type: string
}

export interface BatchCreateAttendanceUserFlowRequest {
  /** 打卡流水记录列表 */
  flow_records: UserFlow[]
}

export interface BatchCreateAttendanceUserFlowQuery {
  /** 请求体和响应体中的 user_id 和 creator_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface GetAttendanceUserFlowQuery {
  /** 响应体中的 user_id 和 creator_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
}

export interface QueryAttendanceUserFlowRequest {
  /** employee_no 或 employee_id 列表，长度不超过 50 */
  user_ids: string[]
  /** 查询的起始时间，时间戳 */
  check_time_from: string
  /** 查询的结束时间，时间戳 */
  check_time_to: string
}

export interface QueryAttendanceUserFlowQuery {
  /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
  /** 由于新入职用户可以复用已离职用户的employee_no/employee_id。如果true，返回employee_no/employee_id对应的所有在职+离职用户数据；如果false，只返回employee_no/employee_id对应的在职或最近一个离职用户数据 */
  include_terminated_user?: boolean
}

export interface QueryAttendanceUserTaskRequest {
  /** employee_no 或 employee_id 列表 */
  user_ids: string[]
  /** 查询的起始工作日 */
  check_date_from: number
  /** 查询的结束工作日 */
  check_date_to: number
  /** 是否需要加班班段打卡结果 */
  need_overtime_result?: boolean
}

export interface QueryAttendanceUserTaskQuery {
  /** 员工工号类型 */
  employee_type: 'employee_id' | 'employee_no'
  /** 是否忽略无效和没有权限的用户。如果 true，则返回有效用户的信息，并告知无效和没有权限的用户信息；如果 false，且 user_ids 中存在无效或没有权限的用户，则返回错误 */
  ignore_invalid_users?: boolean
  /** 由于新入职员工可以复用已离职员工的 employee_no/employee_id，如果 true，则返回 employee_no/employee_id 对应的所有在职 + 离职员工的数据；如果 false，则只返回 employee_no/employee_id 对应的在职或最近一个离职员工的数据 */
  include_terminated_user?: boolean
}

export interface GetAttendanceLeaveEmployExpireRecordRequest {
  /** 员工ID */
  employment_id: string
  /** 假期类型ID */
  leave_type_id: string
  /** 失效最早日期  2023-04-10 格式 */
  start_expiration_date: string
  /** 失效最晚日期 2023-05-10 格式 */
  end_expiration_date: string
  /** 时间偏移，东八区：480    8*60， 如果没有这个参数，默认东八区 */
  time_offset?: number
}

export interface GetAttendanceLeaveEmployExpireRecordQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'people_corehr_id' | 'union_id' | 'user_id'
}

export interface PatchAttendanceLeaveAccrualRecordRequest {
  /** 授予记录的唯一ID */
  leave_granting_record_id: string
  /** 员工ID */
  employment_id: string
  /** 假期类型ID */
  leave_type_id: string
  /** 修改授予记录原因 */
  reason: LangText[]
  /** 时间偏移，东八区：480    8*60 */
  time_offset?: number
  /** 失效日期，格式"2020-01-01" */
  expiration_date?: string
  /** 修改source 余额 */
  quantity?: string
  /** 是否参与清算 */
  section_type?: number
}

export interface PatchAttendanceLeaveAccrualRecordQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'people_corehr_id' | 'union_id' | 'user_id'
}

export interface CreateAttendanceShiftResponse {
  /** 班次 */
  shift?: Shift
}

export interface GetAttendanceShiftResponse {
  /** 班次Id */
  shift_id: string
  /** 班次名称 */
  shift_name: string
  /** 打卡次数 */
  punch_times: number
  /** 排班组子负责人id列表 */
  sub_shift_leader_ids?: string[]
  /** 是否弹性打卡 */
  is_flexible?: boolean
  /** 弹性打卡时间，设置【上班最多可晚到】与【下班最多可早走】时间，如果不设置flexible_rule则生效 */
  flexible_minutes?: number
  /** 弹性打卡时间设置 */
  flexible_rule?: FlexibleRule[]
  /** 不需要打下班卡 */
  no_need_off?: boolean
  /** 打卡规则 */
  punch_time_rule: PunchTimeRule[]
  /** 晚走晚到规则 */
  late_off_late_on_rule?: LateOffLateOnRule[]
  /** 休息规则 */
  rest_time_rule?: RestRule[]
  /** 打卡规则 */
  overtime_rule?: OvertimeRule[]
  /** 日期类型，【是否弹性打卡 = ture】时，不可设置为“休息日”  可选值：1：工作日 2：休息日     示例值：（默认值）1 */
  day_type?: number
  /** 班外休息规则 */
  overtime_rest_time_rule?: RestRule[]
  /** 晚到多久记为严重迟到（优先级比原有字段高） */
  late_minutes_as_serious_late?: number
  /** 半天分割规则 */
  shift_middle_time_rule?: ShiftMiddleTimeRule
  /** 应出勤配置 */
  shift_attendance_time_config?: ShiftAttendanceTimeConfig
  /** 晚走次日晚到配置规则 */
  late_off_late_on_setting?: LateOffLateOnSetting
  /** 班次id(更新班次时需要传递) */
  id?: string
  /** 休息弹性设置 */
  rest_time_flexible_configs?: RestTimeFlexibleConfig[]
}

export interface QueryAttendanceShiftResponse {
  /** 班次Id */
  shift_id: string
  /** 班次名称 */
  shift_name: string
  /** 打卡次数 */
  punch_times: number
  /** 排班组子负责人id列表 */
  sub_shift_leader_ids?: string[]
  /** 是否弹性打卡 */
  is_flexible?: boolean
  /** 弹性打卡时间，设置【上班最多可晚到】与【下班最多可早走】时间，如果不设置flexible_rule则生效 */
  flexible_minutes?: number
  /** 弹性打卡时间设置 */
  flexible_rule?: FlexibleRule[]
  /** 不需要打下班卡 */
  no_need_off?: boolean
  /** 打卡规则 */
  punch_time_rule: PunchTimeRule[]
  /** 晚走晚到规则 */
  late_off_late_on_rule?: LateOffLateOnRule[]
  /** 休息规则 */
  rest_time_rule?: RestRule[]
  /** 打卡规则 */
  overtime_rule?: OvertimeRule[]
  /** 日期类型，【是否弹性打卡 = ture】时，不可设置为“休息日”  可选值：1：工作日 2：休息日     示例值：（默认值）1 */
  day_type?: number
  /** 班外休息规则 */
  overtime_rest_time_rule?: RestRule[]
  /** 晚到多久记为严重迟到（优先级比原有字段高） */
  late_minutes_as_serious_late?: number
  /** 半天分割规则 */
  shift_middle_time_rule?: ShiftMiddleTimeRule
  /** 应出勤配置 */
  shift_attendance_time_config?: ShiftAttendanceTimeConfig
  /** 晚走次日晚到配置规则 */
  late_off_late_on_setting?: LateOffLateOnSetting
  /** 班次id(更新班次时需要传递) */
  id?: string
  /** 休息弹性设置 */
  rest_time_flexible_configs?: RestTimeFlexibleConfig[]
}

export interface BatchCreateAttendanceUserDailyShiftResponse {
  /** 班表信息列表 */
  user_daily_shifts?: UserDailyShift[]
}

export interface QueryAttendanceUserDailyShiftResponse {
  /** 班表信息列表 */
  user_daily_shifts?: UserDailyShift[]
}

export interface BatchCreateTempAttendanceUserDailyShiftResponse {
  /** 临时班表信息列表 */
  user_tmp_daily_shifts?: UserTmpDailyShift[]
}

export interface CreateAttendanceGroupResponse {
  group?: Group
}

export interface GetAttendanceGroupResponse {
  /** 考勤组的Id， 需要从获取用户打卡结果信息的接口中获取groupId，修改考勤组时必填 */
  group_id?: string
  /** 考勤组名称 */
  group_name: string
  /** 考勤组时区 */
  time_zone: string
  /** 参加考勤的部门id列表 */
  bind_dept_ids?: string[]
  /** 无需考勤的部门id列表 */
  except_dept_ids?: string[]
  /** 参加考勤的人员id列表 */
  bind_user_ids?: string[]
  /** 参加考勤的人员id列表 */
  except_user_ids?: string[]
  /** 考勤组主负责人id列表 */
  group_leader_ids: string[]
  /** 考勤组子负责人id列表 */
  sub_group_leader_ids?: string[]
  /** 是否允许外勤打卡 */
  allow_out_punch?: boolean
  /** 外勤打卡需审批，先审批后打卡（需要允许外勤打卡才能设置生效） */
  out_punch_need_approval?: boolean
  /** 外勤打卡需审批，先打卡后审批（需要允许外勤打卡才能设置生效） */
  out_punch_need_post_approval?: boolean
  /** 外勤打卡需填写备注（需要允许外勤打卡才能设置生效） */
  out_punch_need_remark?: boolean
  /** 外勤打卡需拍照（需要允许外勤打卡才能设置生效） */
  out_punch_need_photo?: boolean
  /** 外勤打卡允许员工隐藏详细地址（需要允许外勤打卡才能设置生效） */
  out_punch_allowed_hide_addr?: boolean
  /** 外勤打卡允许微调地址（需要允许外勤打卡才能设置生效） */
  out_punch_allowed_adjust_addr?: boolean
  /** 微调范围，默认为 50 米 */
  adjust_range?: number
  /** 是否允许pc打卡 */
  allow_pc_punch?: boolean
  /** 是否允许补卡 */
  allow_remedy?: boolean
  /** 补卡次数是否限制（需要允许补卡才能设置生效） */
  remedy_limit?: boolean
  /** 补卡次数（需要允许补卡才能设置生效） */
  remedy_limit_count?: number
  /** 补卡时间是否限制（需要允许补卡才能设置生效） */
  remedy_date_limit?: boolean
  /** 补卡时间,几天内可以发起补卡（需要允许补卡才能设置生效） */
  remedy_date_num?: number
  /** 允许缺卡补卡（需要允许补卡才能设置生效） */
  allow_remedy_type_lack?: boolean
  /** 允许迟到补卡（需要允许补卡才能设置生效） */
  allow_remedy_type_late?: boolean
  /** 允许早退补卡（需要允许补卡才能设置生效） */
  allow_remedy_type_early?: boolean
  /** 允许正常补卡（需要允许补卡才能设置生效） */
  allow_remedy_type_normal?: boolean
  /** 是否展示累计时长 */
  show_cumulative_time?: boolean
  /** 是否展示加班时长 */
  show_over_time?: boolean
  /** 是否隐藏员工打卡详情 */
  hide_staff_punch_time?: boolean
  /** 是否开启人脸打卡 */
  face_punch?: boolean
  /** 人脸打卡规则， 1：每次打卡均需人脸识别 2：疑似需要 */
  face_punch_cfg?: number
  /** 人脸打卡规则， false：开启活体验证 true：0动作验证，仅在 face_punch_cfg = 1 时有效 */
  face_live_need_action?: boolean
  /** 脸识别失败时允许普通拍照打卡 */
  face_downgrade?: boolean
  /** 是否允许替换基准图片 */
  replace_basic_pic?: boolean
  /** 考勤机信息 */
  machines?: Machine[]
  /** GPS打卡的地址范围 */
  gps_range?: number
  /** GPS打卡的地址信息 */
  locations?: Location[]
  /** 考勤类型 0：固定考勤  2：排班考勤， 3：自由班次 */
  group_type: number
  /** 固定班次必需填 */
  punch_day_shift_ids: string[]
  free_punch_cfg?: FreePunchCfg
  /** 国家日历 id，（0：不根据国家日历休息, 1：中国，2：美国，3：日本，4：印度，5：新加坡），默认 1 */
  calendar_id: number
  /** 强制需要打卡的日期 */
  need_punch_special_days?: PunchSpecialDateShift[]
  /** 强制不需要打卡的日期 */
  no_need_punch_special_days?: PunchSpecialDateShift[]
  /** 自由班次下工作日不打卡是否记为缺卡 */
  work_day_no_punch_as_lack?: boolean
  /** 补卡周期类型 */
  remedy_period_type?: number
  /** 补卡自定义周期起始日期 */
  remedy_period_custom_date?: number
  /** 打卡类型，位运算。1:GPS打卡；2:wifi打卡；4:考勤机打卡；8:IP打卡 */
  punch_type?: number
  /** 生效时间，精确到秒的时间戳 */
  effect_time?: string
  /** 固定班次生效时间，精确到秒的时间戳 */
  fixshift_effect_time?: string
  /** 参加考勤的人员、部门变动生效时间，精确到秒的时间戳 */
  member_effect_time?: string
  /** 休息日打卡需审批 */
  rest_clockIn_need_approval?: boolean
  /** 每次打卡均需拍照 */
  clockIn_need_photo?: boolean
  /** 人员异动打卡设置 */
  member_status_change?: MemberStatusChange
  /** 请假离岗或返岗是否需打卡 */
  leave_need_punch?: boolean
  /** 请假离岗或返岗打卡规则 */
  leave_need_punch_cfg?: LeaveNeedPunchCfg
  /** 外出期间是否需打卡 */
  go_out_need_punch?: number
  /** 外出期间打卡规则 */
  go_out_need_punch_cfg?: LeaveNeedPunchCfg
  /** 出差期间是否需打卡 */
  travel_need_punch?: number
  /** 出差期间打卡规则 */
  travel_need_punch_cfg?: LeaveNeedPunchCfg
  /** 需要打卡的人员配置（新） */
  need_punch_members?: PunchMember[]
  /** 无需打卡的人员配置（新） */
  no_need_punch_members?: PunchMember[]
  /** 是否直接保存可以自动变更的冲突规则 */
  save_auto_changes?: boolean
  /** 人员异动开关（人员组织架构变更后是否允许自动调整到该考勤组） */
  org_change_auto_adjust?: boolean
  /** 默认出勤的部门id列表 */
  bind_default_dept_ids?: string[]
  /** 默认出勤的用户ID列表 */
  bind_default_user_ids?: string[]
  /** 加班打卡规则 */
  overtime_clock_cfg?: OvertimeClockCfg
  /** 节假日id，（如果考勤组使用了自定义节假日，请用此参数传入节假日id） */
  new_calendar_id?: string
  /** 定位不准时是否允许申请打卡 */
  allow_apply_punch?: boolean
}

export interface SearchAttendanceGroupResponse {
  /** 考勤组列表 */
  group_list?: GroupMeta[]
}

export interface ModifyAttendanceUserSettingResponse {
  /** 用户设置 */
  user_setting?: UserSetting
}

export interface QueryAttendanceUserSettingResponse {
  /** 用户设置信息列表 */
  user_settings?: UserSetting[]
}

export interface UploadAttendanceFileResponse {
  file?: File
}

export interface UpdateAttendanceUserStatsViewResponse {
  /** 视图 */
  view?: UserStatsView
}

export interface QueryAttendanceUserStatsFieldResponse {
  user_stats_field?: UserStatsField
}

export interface QueryAttendanceUserStatsViewResponse {
  view?: UserStatsView
}

export interface QueryAttendanceUserStatsDataResponse {
  /** 用户统计数据 */
  user_datas?: UserStatsData[]
  /** 无权限获取的用户列表 */
  invalid_user_list?: string[]
}

export interface QueryAttendanceUserApprovalResponse {
  /** 审批结果列表 */
  user_approvals?: UserApproval[]
}

export interface CreateAttendanceUserApprovalResponse {
  /** 审批信息 */
  user_approval?: UserApproval
}

export interface ProcessAttendanceApprovalInfoResponse {
  /** 审批信息 */
  approval_info?: ApprovalInfo
}

export interface CreateAttendanceUserTaskRemedyResponse {
  /** 补卡审批信息 */
  user_remedy?: UserTaskRemedy
}

export interface QueryUserAllowedRemedysAttendanceUserTaskRemedyResponse {
  /** 用户可补卡时间 */
  user_allowed_remedys?: UserAllowedRemedy[]
}

export interface QueryAttendanceUserTaskRemedyResponse {
  /** 补卡记录列表 */
  user_remedys?: UserTaskRemedy[]
}

export interface UserStatsFieldsQueryAttendanceArchiveRuleResponse {
  /** 统计数据表头 */
  archive_report_fields?: ArchiveField[]
}

export interface UploadReportAttendanceArchiveRuleResponse {
  /** 无效的code */
  invalid_code?: string[]
  /** 无效的member_id */
  invalid_member_id?: string[]
}

export interface BatchCreateAttendanceUserFlowResponse {
  /** 打卡流水记录列表 */
  flow_records?: UserFlow[]
}

export interface GetAttendanceUserFlowResponse {
  /** 用户工号 */
  user_id: string
  /** 记录创建者的工号 */
  creator_id: string
  /** 打卡位置名称信息 */
  location_name: string
  /** 打卡时间，精确到秒的时间戳 */
  check_time: string
  /** 打卡备注 */
  comment: string
  /** 打卡记录ID */
  record_id?: string
  /** 打卡wifi ssid */
  ssid?: string
  /** 打卡wifi MAC地址 */
  bssid?: string
  /** 是否为外勤打卡 */
  is_field?: boolean
  /** 是否为wifi打卡 */
  is_wifi?: boolean
  /** 记录生成方式 */
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  /** 打卡照片列表 */
  photo_urls?: string[]
  /** 打卡设备ID */
  device_id?: string
  /** 打卡结果 */
  check_result?: 'NoNeedCheck' | 'SystemCheck' | 'Normal' | 'Early' | 'Late' | 'SeriousLate' | 'Lack' | 'Invalid' | 'None' | 'Todo'
  /** 用户导入的外部打卡记录ID */
  external_id?: string
  /** 唯一幂等键 */
  idempotent_id?: string
}

export interface QueryAttendanceUserFlowResponse {
  /** 打卡记录列表 */
  user_flow_results?: UserFlow[]
}

export interface QueryAttendanceUserTaskResponse {
  /** 打卡任务列表 */
  user_task_results?: UserTask[]
  /** 无效用户工号列表 */
  invalid_user_ids?: string[]
  /** 没有权限用户工号列表 */
  unauthorized_user_ids?: string[]
}

export interface GetAttendanceLeaveEmployExpireRecordResponse {
  /** 员工过期日期的授予记录 */
  records: LeaveEmployExpireRecord[]
}

export interface PatchAttendanceLeaveAccrualRecordResponse {
  /** 员工过期日期的授予记录 */
  record: LeaveAccrualRecord
}

Internal.define({
  '/attendance/v1/shifts': {
    POST: 'createAttendanceShift',
    GET: { name: 'listAttendanceShift', pagination: { argIndex: 0, itemsKey: 'shift_list' } },
  },
  '/attendance/v1/shifts/{shift_id}': {
    DELETE: 'deleteAttendanceShift',
    GET: 'getAttendanceShift',
  },
  '/attendance/v1/shifts/query': {
    POST: 'queryAttendanceShift',
  },
  '/attendance/v1/user_daily_shifts/batch_create': {
    POST: 'batchCreateAttendanceUserDailyShift',
  },
  '/attendance/v1/user_daily_shifts/query': {
    POST: 'queryAttendanceUserDailyShift',
  },
  '/attendance/v1/user_daily_shifts/batch_create_temp': {
    POST: 'batchCreateTempAttendanceUserDailyShift',
  },
  '/attendance/v1/groups/{group_id}/list_user': {
    GET: { name: 'listUserAttendanceGroup', pagination: { argIndex: 1, itemsKey: 'users' } },
  },
  '/attendance/v1/groups': {
    POST: 'createAttendanceGroup',
    GET: { name: 'listAttendanceGroup', pagination: { argIndex: 0, itemsKey: 'group_list' } },
  },
  '/attendance/v1/groups/{group_id}': {
    DELETE: 'deleteAttendanceGroup',
    GET: 'getAttendanceGroup',
  },
  '/attendance/v1/groups/search': {
    POST: 'searchAttendanceGroup',
  },
  '/attendance/v1/user_settings/modify': {
    POST: 'modifyAttendanceUserSetting',
  },
  '/attendance/v1/user_settings/query': {
    GET: 'queryAttendanceUserSetting',
  },
  '/attendance/v1/files/upload': {
    POST: { name: 'uploadAttendanceFile', multipart: true },
  },
  '/attendance/v1/files/{file_id}/download': {
    GET: { name: 'downloadAttendanceFile', type: 'binary' },
  },
  '/attendance/v1/user_stats_views/{user_stats_view_id}': {
    PUT: 'updateAttendanceUserStatsView',
  },
  '/attendance/v1/user_stats_fields/query': {
    POST: 'queryAttendanceUserStatsField',
  },
  '/attendance/v1/user_stats_views/query': {
    POST: 'queryAttendanceUserStatsView',
  },
  '/attendance/v1/user_stats_datas/query': {
    POST: 'queryAttendanceUserStatsData',
  },
  '/attendance/v1/user_approvals/query': {
    POST: 'queryAttendanceUserApproval',
  },
  '/attendance/v1/user_approvals': {
    POST: 'createAttendanceUserApproval',
  },
  '/attendance/v1/approval_infos/process': {
    POST: 'processAttendanceApprovalInfo',
  },
  '/attendance/v1/user_task_remedys': {
    POST: 'createAttendanceUserTaskRemedy',
  },
  '/attendance/v1/user_task_remedys/query_user_allowed_remedys': {
    POST: 'queryUserAllowedRemedysAttendanceUserTaskRemedy',
  },
  '/attendance/v1/user_task_remedys/query': {
    POST: 'queryAttendanceUserTaskRemedy',
  },
  '/attendance/v1/archive_rule/user_stats_fields_query': {
    POST: 'userStatsFieldsQueryAttendanceArchiveRule',
  },
  '/attendance/v1/archive_rule/upload_report': {
    POST: 'uploadReportAttendanceArchiveRule',
  },
  '/attendance/v1/archive_rule/del_report': {
    POST: 'delReportAttendanceArchiveRule',
  },
  '/attendance/v1/archive_rule': {
    GET: { name: 'listAttendanceArchiveRule', pagination: { argIndex: 0 } },
  },
  '/attendance/v1/user_flows/batch_create': {
    POST: 'batchCreateAttendanceUserFlow',
  },
  '/attendance/v1/user_flows/{user_flow_id}': {
    GET: 'getAttendanceUserFlow',
  },
  '/attendance/v1/user_flows/query': {
    POST: 'queryAttendanceUserFlow',
  },
  '/attendance/v1/user_tasks/query': {
    POST: 'queryAttendanceUserTask',
  },
  '/attendance/v1/leave_employ_expire_records/{leave_id}': {
    GET: 'getAttendanceLeaveEmployExpireRecord',
  },
  '/attendance/v1/leave_accrual_record/{leave_id}': {
    PATCH: 'patchAttendanceLeaveAccrualRecord',
  },
})
