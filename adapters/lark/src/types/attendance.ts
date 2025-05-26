import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    attendance: Attendance.Methods
  }
}

export namespace Attendance {
  export interface Methods {
    shift: Shift.Methods
    userDailyShift: UserDailyShift.Methods
    group: Group.Methods
    userSetting: UserSetting.Methods
    file: File.Methods
    userStatsView: UserStatsView.Methods
    userStatsField: UserStatsField.Methods
    userStatsData: UserStatsData.Methods
    userApproval: UserApproval.Methods
    approvalInfo: ApprovalInfo.Methods
    userTaskRemedy: UserTaskRemedy.Methods
    archiveRule: ArchiveRule.Methods
    userFlow: UserFlow.Methods
    userTask: UserTask.Methods
    leaveEmployExpireRecord: LeaveEmployExpireRecord.Methods
    leaveAccrualRecord: LeaveAccrualRecord.Methods
  }

  export namespace Shift {
    export interface Methods {
      /**
       * 创建班次
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除班次
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/delete
       */
      delete(shift_id: string): Promise<void>
      /**
       * 按 ID 查询班次
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/get
       */
      get(shift_id: string): Promise<GetResponse>
      /**
       * 按名称查询班次
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query
       */
      query(query?: QueryQuery): Promise<QueryResponse>
      /**
       * 查询所有班次
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list
       */
      list(query?: Pagination): Paginated<Lark.Shift, 'shift_list'>
    }

    export interface CreateRequest {
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
      flexible_rule?: Lark.FlexibleRule[]
      /** 不需要打下班卡 */
      no_need_off?: boolean
      /** 打卡规则 */
      punch_time_rule: Lark.PunchTimeRule[]
      /** 晚走晚到规则 */
      late_off_late_on_rule?: Lark.LateOffLateOnRule[]
      /** 休息规则 */
      rest_time_rule?: Lark.RestRule[]
      /** 打卡规则 */
      overtime_rule?: Lark.OvertimeRule[]
      /** 日期类型，【是否弹性打卡 = ture】时，不可设置为“休息日”  可选值：1：工作日 2：休息日     示例值：（默认值）1 */
      day_type?: number
      /** 班外休息规则 */
      overtime_rest_time_rule?: Lark.RestRule[]
      /** 晚到多久记为严重迟到（优先级比原有字段高） */
      late_minutes_as_serious_late?: number
      /** 半天分割规则 */
      shift_middle_time_rule?: Lark.ShiftMiddleTimeRule
      /** 应出勤配置 */
      shift_attendance_time_config?: Lark.ShiftAttendanceTimeConfig
      /** 晚走次日晚到配置规则 */
      late_off_late_on_setting?: Lark.LateOffLateOnSetting
      /** 班次id(更新班次时需要传递) */
      id?: string
      /** 休息弹性设置 */
      rest_time_flexible_configs?: Lark.RestTimeFlexibleConfig[]
    }

    export interface CreateQuery {
      /** 用户 ID 的类型 不提供则用户相关字段无效 */
      employee_type?: 'employee_id' | 'employee_no'
    }

    export interface CreateResponse {
      /** 班次 */
      shift?: Lark.Shift
    }

    export interface GetResponse {
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
      flexible_rule?: Lark.FlexibleRule[]
      /** 不需要打下班卡 */
      no_need_off?: boolean
      /** 打卡规则 */
      punch_time_rule: Lark.PunchTimeRule[]
      /** 晚走晚到规则 */
      late_off_late_on_rule?: Lark.LateOffLateOnRule[]
      /** 休息规则 */
      rest_time_rule?: Lark.RestRule[]
      /** 打卡规则 */
      overtime_rule?: Lark.OvertimeRule[]
      /** 日期类型，【是否弹性打卡 = ture】时，不可设置为“休息日”  可选值：1：工作日 2：休息日     示例值：（默认值）1 */
      day_type?: number
      /** 班外休息规则 */
      overtime_rest_time_rule?: Lark.RestRule[]
      /** 晚到多久记为严重迟到（优先级比原有字段高） */
      late_minutes_as_serious_late?: number
      /** 半天分割规则 */
      shift_middle_time_rule?: Lark.ShiftMiddleTimeRule
      /** 应出勤配置 */
      shift_attendance_time_config?: Lark.ShiftAttendanceTimeConfig
      /** 晚走次日晚到配置规则 */
      late_off_late_on_setting?: Lark.LateOffLateOnSetting
      /** 班次id(更新班次时需要传递) */
      id?: string
      /** 休息弹性设置 */
      rest_time_flexible_configs?: Lark.RestTimeFlexibleConfig[]
    }

    export interface QueryQuery {
      /** 班次名称 */
      shift_name: string
    }

    export interface QueryResponse {
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
      flexible_rule?: Lark.FlexibleRule[]
      /** 不需要打下班卡 */
      no_need_off?: boolean
      /** 打卡规则 */
      punch_time_rule: Lark.PunchTimeRule[]
      /** 晚走晚到规则 */
      late_off_late_on_rule?: Lark.LateOffLateOnRule[]
      /** 休息规则 */
      rest_time_rule?: Lark.RestRule[]
      /** 打卡规则 */
      overtime_rule?: Lark.OvertimeRule[]
      /** 日期类型，【是否弹性打卡 = ture】时，不可设置为“休息日”  可选值：1：工作日 2：休息日     示例值：（默认值）1 */
      day_type?: number
      /** 班外休息规则 */
      overtime_rest_time_rule?: Lark.RestRule[]
      /** 晚到多久记为严重迟到（优先级比原有字段高） */
      late_minutes_as_serious_late?: number
      /** 半天分割规则 */
      shift_middle_time_rule?: Lark.ShiftMiddleTimeRule
      /** 应出勤配置 */
      shift_attendance_time_config?: Lark.ShiftAttendanceTimeConfig
      /** 晚走次日晚到配置规则 */
      late_off_late_on_setting?: Lark.LateOffLateOnSetting
      /** 班次id(更新班次时需要传递) */
      id?: string
      /** 休息弹性设置 */
      rest_time_flexible_configs?: Lark.RestTimeFlexibleConfig[]
    }
  }

  export namespace UserDailyShift {
    export interface Methods {
      /**
       * 创建或修改排班表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create
       */
      batchCreate(body: BatchCreateRequest, query?: BatchCreateQuery): Promise<BatchCreateResponse>
      /**
       * 查询排班表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
      /**
       * 创建或修改临时排班
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create_temp
       */
      batchCreateTemp(body: BatchCreateTempRequest, query?: BatchCreateTempQuery): Promise<BatchCreateTempResponse>
    }

    export interface BatchCreateRequest {
      /** 班表信息列表 */
      user_daily_shifts: Lark.UserDailyShift[]
      /** 操作人uid，如果您未操作[考勤管理后台“API 接入”流程](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines)，则此字段为必填字段 */
      operator_id?: string
    }

    export interface BatchCreateQuery {
      /** 请求体和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface BatchCreateResponse {
      /** 班表信息列表 */
      user_daily_shifts?: Lark.UserDailyShift[]
    }

    export interface QueryRequest {
      /** employee_no 或 employee_id 列表 */
      user_ids: string[]
      /** 查询的起始工作日 */
      check_date_from: number
      /** 查询的结束工作日 */
      check_date_to: number
    }

    export interface QueryQuery {
      /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface QueryResponse {
      /** 班表信息列表 */
      user_daily_shifts?: Lark.UserDailyShift[]
    }

    export interface BatchCreateTempRequest {
      /** 临时班表信息列表（数量限制50以内） */
      user_tmp_daily_shifts: Lark.UserTmpDailyShift[]
      /** 操作人uid */
      operator_id?: string
    }

    export interface BatchCreateTempQuery {
      /** 请求体和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface BatchCreateTempResponse {
      /** 临时班表信息列表 */
      user_tmp_daily_shifts?: Lark.UserTmpDailyShift[]
    }
  }

  export namespace Group {
    export interface Methods {
      /**
       * 查询考勤组下所有成员
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list_user
       */
      listUser(group_id: string, query?: ListUserQuery): Paginated<Lark.UserBase, 'users'>
      /**
       * 创建或修改考勤组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除考勤组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/delete
       */
      delete(group_id: string): Promise<void>
      /**
       * 按 ID 查询考勤组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/get
       */
      get(group_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 按名称查询考勤组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search
       */
      search(body: SearchRequest): Promise<SearchResponse>
      /**
       * 查询所有考勤组
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list
       */
      list(query?: Pagination): Paginated<Lark.GroupMeta, 'group_list'>
    }

    export interface ListUserQuery extends Pagination {
      /** 用户 ID 的类型 */
      employee_type: string
      /** 部门 ID 的类型 */
      dept_type: string
      /** 打卡类型 */
      member_clock_type: number
    }

    export interface CreateRequest {
      /** 6921319402260496386 */
      group: Lark.Group
      /** 操作人uid，如果您未操作[考勤管理后台“API 接入”流程](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/attendance-development-guidelines)，则此字段为必填字段 */
      operator_id?: string
    }

    export interface CreateQuery {
      /** 用户 ID 的类型 */
      employee_type: 'employee_id' | 'employee_no'
      /** 部门 ID 的类型 */
      dept_type: 'open_id'
    }

    export interface CreateResponse {
      group?: Lark.Group
    }

    export interface GetQuery {
      /** 用户 ID 的类型 */
      employee_type: 'employee_id' | 'employee_no'
      /** 部门 ID 的类型 */
      dept_type: 'open_id'
    }

    export interface GetResponse {
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
      machines?: Lark.Machine[]
      /** GPS打卡的地址范围 */
      gps_range?: number
      /** GPS打卡的地址信息 */
      locations?: Lark.Location[]
      /** 考勤类型 0：固定考勤  2：排班考勤， 3：自由班次 */
      group_type: number
      /** 固定班次必需填 */
      punch_day_shift_ids: string[]
      free_punch_cfg?: Lark.FreePunchCfg
      /** 国家日历 id，（0：不根据国家日历休息, 1：中国，2：美国，3：日本，4：印度，5：新加坡），默认 1 */
      calendar_id: number
      /** 强制需要打卡的日期 */
      need_punch_special_days?: Lark.PunchSpecialDateShift[]
      /** 强制不需要打卡的日期 */
      no_need_punch_special_days?: Lark.PunchSpecialDateShift[]
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
      member_status_change?: Lark.MemberStatusChange
      /** 请假离岗或返岗是否需打卡 */
      leave_need_punch?: boolean
      /** 请假离岗或返岗打卡规则 */
      leave_need_punch_cfg?: Lark.LeaveNeedPunchCfg
      /** 外出期间是否需打卡 */
      go_out_need_punch?: number
      /** 外出期间打卡规则 */
      go_out_need_punch_cfg?: Lark.LeaveNeedPunchCfg
      /** 出差期间是否需打卡 */
      travel_need_punch?: number
      /** 出差期间打卡规则 */
      travel_need_punch_cfg?: Lark.LeaveNeedPunchCfg
      /** 需要打卡的人员配置（新） */
      need_punch_members?: Lark.PunchMember[]
      /** 无需打卡的人员配置（新） */
      no_need_punch_members?: Lark.PunchMember[]
      /** 是否直接保存可以自动变更的冲突规则 */
      save_auto_changes?: boolean
      /** 人员异动开关（人员组织架构变更后是否允许自动调整到该考勤组） */
      org_change_auto_adjust?: boolean
      /** 默认出勤的部门id列表 */
      bind_default_dept_ids?: string[]
      /** 默认出勤的用户ID列表 */
      bind_default_user_ids?: string[]
      /** 加班打卡规则 */
      overtime_clock_cfg?: Lark.OvertimeClockCfg
      /** 节假日id，（如果考勤组使用了自定义节假日，请用此参数传入节假日id） */
      new_calendar_id?: string
      /** 定位不准时是否允许申请打卡 */
      allow_apply_punch?: boolean
    }

    export interface SearchRequest {
      /** 考勤组名称 */
      group_name: string
    }

    export interface SearchResponse {
      /** 考勤组列表 */
      group_list?: Lark.GroupMeta[]
    }
  }

  export namespace UserSetting {
    export interface Methods {
      /**
       * 修改用户人脸识别信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/modify
       */
      modify(body: ModifyRequest, query?: ModifyQuery): Promise<ModifyResponse>
      /**
       * 批量查询用户人脸识别信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface ModifyRequest {
      /** 用户设置 */
      user_setting?: Lark.UserSetting
    }

    export interface ModifyQuery {
      /** 请求体和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface ModifyResponse {
      /** 用户设置 */
      user_setting?: Lark.UserSetting
    }

    export interface QueryRequest {
      /** employee_no 或 employee_id 列表 */
      user_ids: string[]
    }

    export interface QueryQuery {
      /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface QueryResponse {
      /** 用户设置信息列表 */
      user_settings?: Lark.UserSetting[]
    }
  }

  export namespace File {
    export interface Methods {
      /**
       * 上传用户人脸识别照片
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload
       */
      upload(form: UploadForm, query?: UploadQuery): Promise<UploadResponse>
      /**
       * 下载用户人脸识别照片
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/download
       */
      download(file_id: string): Promise<ArrayBuffer>
    }

    export interface UploadForm {
      /** 文件内容 */
      file?: Blob
    }

    export interface UploadQuery {
      /** 带后缀的文件名 */
      file_name: string
    }

    export interface UploadResponse {
      file?: Lark.File
    }
  }

  export namespace UserStatsView {
    export interface Methods {
      /**
       * 更新统计设置
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/update
       */
      update(user_stats_view_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
      /**
       * 查询统计设置
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface UpdateRequest {
      /** 统计设置 */
      view: Lark.UserStatsView
    }

    export interface UpdateQuery {
      /** 员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface UpdateResponse {
      /** 视图 */
      view?: Lark.UserStatsView
    }

    export interface QueryRequest {
      /** 语言类型 */
      locale: 'en' | 'ja' | 'zh'
      /** 统计类型 */
      stats_type: 'daily' | 'month'
      /** 查询用户id，同【查询统计数据】、【更新统计设置】user_id */
      user_id?: string
    }

    export interface QueryQuery {
      /** 响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface QueryResponse {
      view?: Lark.UserStatsView
    }
  }

  export namespace UserStatsField {
    export interface Methods {
      /**
       * 查询统计表头
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_field/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** 语言类型 */
      locale: 'en' | 'ja' | 'zh'
      /** 统计类型 */
      stats_type: 'daily' | 'month'
      /** 开始时间 */
      start_date: number
      /** 结束时间（时间间隔不超过 40 天） */
      end_date: number
    }

    export interface QueryQuery {
      /** 响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface QueryResponse {
      user_stats_field?: Lark.UserStatsField
    }
  }

  export namespace UserStatsData {
    export interface Methods {
      /**
       * 查询统计数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_data/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
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

    export interface QueryQuery {
      /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface QueryResponse {
      /** 用户统计数据 */
      user_datas?: Lark.UserStatsData[]
      /** 无权限获取的用户列表 */
      invalid_user_list?: string[]
    }
  }

  export namespace UserApproval {
    export interface Methods {
      /**
       * 获取审批数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
      /**
       * 写入审批结果
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
    }

    export const enum QueryRequestStatus {
      /** 待审批 */
      Todo = 0,
      /** 审批未通过 */
      Rejected = 1,
      /** 审批通过 */
      Approved = 2,
      /** 审批已取消 */
      Canceled = 3,
      /** 已撤回 */
      Reverted = 4,
    }

    export interface QueryRequest {
      /** employee_no 或 employee_id 列表 */
      user_ids: string[]
      /** 查询的起始工作日 */
      check_date_from: number
      /** 查询的结束工作日，与 check_date_from 的时间间隔不超过 30 天 */
      check_date_to: number
      /** 查询依据的时间类型（不填默认依据PeriodTime） */
      check_date_type?: 'PeriodTime' | 'CreateTime' | 'UpdateTime'
      /** 查询状态（不填默认查询已通过状态） */
      status?: QueryRequestStatus
      /** 查询的起始时间，精确到秒的时间戳 */
      check_time_from?: string
      /** 查询的结束时间，精确到秒的时间戳 */
      check_time_to?: string
    }

    export interface QueryQuery {
      /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no' | 'open_id'
    }

    export interface QueryResponse {
      /** 审批结果列表 */
      user_approvals?: Lark.UserApproval[]
    }

    export interface CreateRequest {
      /** 审批信息 */
      user_approval?: Lark.UserApproval
    }

    export interface CreateQuery {
      /** 请求体和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no' | 'open_id'
    }

    export interface CreateResponse {
      /** 审批信息 */
      user_approval?: Lark.UserApproval
    }
  }

  export namespace ApprovalInfo {
    export interface Methods {
      /**
       * 通知审批状态更新
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process
       */
      process(body: ProcessRequest): Promise<ProcessResponse>
    }

    export interface ProcessRequest {
      /** 审批实例 ID，获取方式：1）[获取审批通过数据](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query) 2）[写入审批结果](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create) 3）[通知补卡审批发起（补卡情况下）](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create) */
      approval_id: string
      /** 审批类型，leave：请假，out：外出，overtime：加班，trip：出差，remedy：补卡 */
      approval_type: string
      /** 审批状态，1：不通过，2：通过，4：撤销 */
      status: number
    }

    export interface ProcessResponse {
      /** 审批信息 */
      approval_info?: Lark.ApprovalInfo
    }
  }

  export namespace UserTaskRemedy {
    export interface Methods {
      /**
       * 通知补卡审批发起
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 获取可补卡时间
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query_user_allowed_remedys
       */
      queryUserAllowedRemedys(body: QueryUserAllowedRemedysRequest, query?: QueryUserAllowedRemedysQuery): Promise<QueryUserAllowedRemedysResponse>
      /**
       * 获取补卡记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface CreateRequest {
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

    export interface CreateQuery {
      /** 请求体和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface CreateResponse {
      /** 补卡审批信息 */
      user_remedy?: Lark.UserTaskRemedy
    }

    export interface QueryUserAllowedRemedysRequest {
      /** 用户 ID */
      user_id: string
      /** 补卡日期 */
      remedy_date: number
    }

    export interface QueryUserAllowedRemedysQuery {
      /** 请求体和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface QueryUserAllowedRemedysResponse {
      /** 用户可补卡时间 */
      user_allowed_remedys?: Lark.UserAllowedRemedy[]
    }

    export const enum QueryRequestStatus {
      /** 待审批 */
      Pending = 0,
      /** 未通过 */
      Rejected = 1,
      /** 已通过 */
      Pass = 2,
      /** 已取消 */
      Cancel = 3,
      /** 已撤回 */
      Withdraw = 4,
    }

    export interface QueryRequest {
      /** employee_no 或 employee_id 列表 */
      user_ids: string[]
      /** 查询的起始时间，精确到秒的时间戳 */
      check_time_from: string
      /** 查询的结束时间，精确到秒的时间戳 */
      check_time_to: string
      /** 查询依据的时间类型（不填默认依据PeriodTime） */
      check_date_type?: 'PeriodTime' | 'CreateTime' | 'UpdateTime'
      /** 查询状态（不填默认查询已通过状态） */
      status?: QueryRequestStatus
    }

    export interface QueryQuery {
      /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface QueryResponse {
      /** 补卡记录列表 */
      user_remedys?: Lark.UserTaskRemedy[]
    }
  }

  export namespace ArchiveRule {
    export interface Methods {
      /**
       * 查询归档报表表头
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/user_stats_fields_query
       */
      userStatsFieldsQuery(body: UserStatsFieldsQueryRequest, query?: UserStatsFieldsQueryQuery): Promise<UserStatsFieldsQueryResponse>
      /**
       * 写入归档报表结果
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/upload_report
       */
      uploadReport(body: UploadReportRequest, query?: UploadReportQuery): Promise<UploadReportResponse>
      /**
       * 删除归档报表行数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/del_report
       */
      delReport(body: DelReportRequest, query?: DelReportQuery): Promise<void>
      /**
       * 查询所有归档规则
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/archive_rule/list
       */
      list(query?: Pagination): Paginated<Lark.ArchiveReportMeta>
    }

    export interface UserStatsFieldsQueryRequest {
      /** 语言类型 */
      locale?: string
      /** 月份 */
      month: string
      /** 归档规则id */
      archive_rule_id: string
      /** 操作者id */
      operator_id: string
    }

    export interface UserStatsFieldsQueryQuery {
      /** 用户 ID 的类型 */
      employee_type: string
    }

    export interface UserStatsFieldsQueryResponse {
      /** 统计数据表头 */
      archive_report_fields?: Lark.ArchiveField[]
    }

    export interface UploadReportRequest {
      /** 月份 */
      month: string
      /** 操作者ID */
      operator_id: string
      /** 归档报表内容(不超过50个) */
      archive_report_datas?: Lark.ArchiveReportData[]
      /** 归档规则id */
      archive_rule_id: string
    }

    export interface UploadReportQuery {
      /** 用户 ID 的类型 */
      employee_type: string
    }

    export interface UploadReportResponse {
      /** 无效的code */
      invalid_code?: string[]
      /** 无效的member_id */
      invalid_member_id?: string[]
    }

    export interface DelReportRequest {
      /** 月份 */
      month: string
      /** 操作者ID */
      operator_id: string
      /** 归档规则id */
      archive_rule_id: string
      /** 用户id */
      user_ids?: string[]
    }

    export interface DelReportQuery {
      /** 员工工号类型 */
      employee_type: string
    }
  }

  export namespace UserFlow {
    export interface Methods {
      /**
       * 导入打卡流水
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create
       */
      batchCreate(body: BatchCreateRequest, query?: BatchCreateQuery): Promise<BatchCreateResponse>
      /**
       * 查询打卡流水
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/get
       */
      get(user_flow_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 批量查询打卡流水
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
      /**
       * 删除打卡流水
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_del
       */
      batchDel(body: BatchDelRequest): Promise<BatchDelResponse>
    }

    export interface BatchCreateRequest {
      /** 打卡流水记录列表 */
      flow_records: Lark.UserFlow[]
    }

    export interface BatchCreateQuery {
      /** 请求体和响应体中的 user_id 和 creator_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export interface BatchCreateResponse {
      /** 打卡流水记录列表 */
      flow_records?: Lark.UserFlow[]
    }

    export interface GetQuery {
      /** 响应体中的 user_id 和 creator_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
    }

    export const enum GetResponseType {
      /** 用户自己打卡 */
      Self = 0,
      /** 管理员修改 */
      ManagerModification = 1,
      /** 用户补卡 */
      Remedy = 2,
      /** 系统自动生成 */
      System = 3,
      /** 下班免打卡 */
      Free = 4,
      /** 考勤机 */
      Machine = 5,
      /** 极速打卡 */
      Quick = 6,
      /** 考勤开放平台导入 */
      Import = 7,
    }

    export interface GetResponse {
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
      type?: GetResponseType
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

    export interface QueryRequest {
      /** employee_no 或 employee_id 列表，长度不超过 50 */
      user_ids: string[]
      /** 查询的起始时间，时间戳 */
      check_time_from: string
      /** 查询的结束时间，时间戳 */
      check_time_to: string
    }

    export interface QueryQuery {
      /** 请求体中的 user_ids 和响应体中的 user_id 的员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
      /** 由于新入职用户可以复用已离职用户的employee_no/employee_id。如果true，返回employee_no/employee_id对应的所有在职+离职用户数据；如果false，只返回employee_no/employee_id对应的在职或最近一个离职用户数据 */
      include_terminated_user?: boolean
    }

    export interface QueryResponse {
      /** 打卡记录列表 */
      user_flow_results?: Lark.UserFlow[]
    }

    export interface BatchDelRequest {
      /** 流水记录ID */
      record_ids: string[]
    }

    export interface BatchDelResponse {
      /** 删除成功的流水记录ID列表 */
      success_record_ids?: string[]
      /** 删除失败的流水记录ID列表 */
      fail_record_ids?: string[]
    }
  }

  export namespace UserTask {
    export interface Methods {
      /**
       * 查询打卡结果
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** employee_no 或 employee_id 列表 */
      user_ids: string[]
      /** 查询的起始工作日 */
      check_date_from: number
      /** 查询的结束工作日 */
      check_date_to: number
      /** 是否需要加班班段打卡结果 */
      need_overtime_result?: boolean
    }

    export interface QueryQuery {
      /** 员工工号类型 */
      employee_type: 'employee_id' | 'employee_no'
      /** 是否忽略无效和没有权限的用户。如果 true，则返回有效用户的信息，并告知无效和没有权限的用户信息；如果 false，且 user_ids 中存在无效或没有权限的用户，则返回错误 */
      ignore_invalid_users?: boolean
      /** 由于新入职员工可以复用已离职员工的 employee_no/employee_id，如果 true，则返回 employee_no/employee_id 对应的所有在职 + 离职员工的数据；如果 false，则只返回 employee_no/employee_id 对应的在职或最近一个离职员工的数据 */
      include_terminated_user?: boolean
    }

    export interface QueryResponse {
      /** 打卡任务列表 */
      user_task_results?: Lark.UserTask[]
      /** 无效用户工号列表 */
      invalid_user_ids?: string[]
      /** 没有权限用户工号列表 */
      unauthorized_user_ids?: string[]
    }
  }

  export namespace LeaveEmployExpireRecord {
    export interface Methods {
      /**
       * 通过过期时间获取发放记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_employ_expire_record/get
       */
      get(leave_id: string, body: GetRequest, query?: GetQuery): Promise<GetResponse>
    }

    export interface GetRequest {
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

    export interface GetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'open_id' | 'people_corehr_id' | 'union_id' | 'user_id'
    }

    export interface GetResponse {
      /** 员工过期日期的授予记录 */
      records: Lark.LeaveEmployExpireRecord[]
    }
  }

  export namespace LeaveAccrualRecord {
    export interface Methods {
      /**
       * 修改发放记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/leave_accrual_record/patch
       */
      patch(leave_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
    }

    export interface PatchRequest {
      /** 授予记录的唯一ID */
      leave_granting_record_id: string
      /** 员工ID */
      employment_id: string
      /** 假期类型ID */
      leave_type_id: string
      /** 修改授予记录原因 */
      reason: Lark.LangText[]
      /** 时间偏移，东八区：480    8*60 */
      time_offset?: number
      /** 失效日期，格式"2020-01-01" */
      expiration_date?: string
      /** 修改source 余额 */
      quantity?: string
      /** 是否参与清算 */
      section_type?: number
    }

    export interface PatchQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'open_id' | 'people_corehr_id' | 'union_id' | 'user_id'
    }

    export interface PatchResponse {
      /** 员工过期日期的授予记录 */
      record: Lark.LeaveAccrualRecord
    }
  }
}

Internal.define({
  '/attendance/v1/shifts': {
    POST: 'attendance.shift.create',
    GET: { name: 'attendance.shift.list', pagination: { argIndex: 0, itemsKey: 'shift_list' } },
  },
  '/attendance/v1/shifts/{shift_id}': {
    DELETE: 'attendance.shift.delete',
    GET: 'attendance.shift.get',
  },
  '/attendance/v1/shifts/query': {
    POST: 'attendance.shift.query',
  },
  '/attendance/v1/user_daily_shifts/batch_create': {
    POST: 'attendance.userDailyShift.batchCreate',
  },
  '/attendance/v1/user_daily_shifts/query': {
    POST: 'attendance.userDailyShift.query',
  },
  '/attendance/v1/user_daily_shifts/batch_create_temp': {
    POST: 'attendance.userDailyShift.batchCreateTemp',
  },
  '/attendance/v1/groups/{group_id}/list_user': {
    GET: { name: 'attendance.group.listUser', pagination: { argIndex: 1, itemsKey: 'users' } },
  },
  '/attendance/v1/groups': {
    POST: 'attendance.group.create',
    GET: { name: 'attendance.group.list', pagination: { argIndex: 0, itemsKey: 'group_list' } },
  },
  '/attendance/v1/groups/{group_id}': {
    DELETE: 'attendance.group.delete',
    GET: 'attendance.group.get',
  },
  '/attendance/v1/groups/search': {
    POST: 'attendance.group.search',
  },
  '/attendance/v1/user_settings/modify': {
    POST: 'attendance.userSetting.modify',
  },
  '/attendance/v1/user_settings/query': {
    GET: 'attendance.userSetting.query',
  },
  '/attendance/v1/files/upload': {
    POST: { name: 'attendance.file.upload', multipart: true },
  },
  '/attendance/v1/files/{file_id}/download': {
    GET: { name: 'attendance.file.download', type: 'binary' },
  },
  '/attendance/v1/user_stats_views/{user_stats_view_id}': {
    PUT: 'attendance.userStatsView.update',
  },
  '/attendance/v1/user_stats_fields/query': {
    POST: 'attendance.userStatsField.query',
  },
  '/attendance/v1/user_stats_views/query': {
    POST: 'attendance.userStatsView.query',
  },
  '/attendance/v1/user_stats_datas/query': {
    POST: 'attendance.userStatsData.query',
  },
  '/attendance/v1/user_approvals/query': {
    POST: 'attendance.userApproval.query',
  },
  '/attendance/v1/user_approvals': {
    POST: 'attendance.userApproval.create',
  },
  '/attendance/v1/approval_infos/process': {
    POST: 'attendance.approvalInfo.process',
  },
  '/attendance/v1/user_task_remedys': {
    POST: 'attendance.userTaskRemedy.create',
  },
  '/attendance/v1/user_task_remedys/query_user_allowed_remedys': {
    POST: 'attendance.userTaskRemedy.queryUserAllowedRemedys',
  },
  '/attendance/v1/user_task_remedys/query': {
    POST: 'attendance.userTaskRemedy.query',
  },
  '/attendance/v1/archive_rule/user_stats_fields_query': {
    POST: 'attendance.archiveRule.userStatsFieldsQuery',
  },
  '/attendance/v1/archive_rule/upload_report': {
    POST: 'attendance.archiveRule.uploadReport',
  },
  '/attendance/v1/archive_rule/del_report': {
    POST: 'attendance.archiveRule.delReport',
  },
  '/attendance/v1/archive_rule': {
    GET: { name: 'attendance.archiveRule.list', pagination: { argIndex: 0 } },
  },
  '/attendance/v1/user_flows/batch_create': {
    POST: 'attendance.userFlow.batchCreate',
  },
  '/attendance/v1/user_flows/{user_flow_id}': {
    GET: 'attendance.userFlow.get',
  },
  '/attendance/v1/user_flows/query': {
    POST: 'attendance.userFlow.query',
  },
  '/attendance/v1/user_flows/batch_del': {
    POST: 'attendance.userFlow.batchDel',
  },
  '/attendance/v1/user_tasks/query': {
    POST: 'attendance.userTask.query',
  },
  '/attendance/v1/leave_employ_expire_records/{leave_id}': {
    GET: 'attendance.leaveEmployExpireRecord.get',
  },
  '/attendance/v1/leave_accrual_record/{leave_id}': {
    PATCH: 'attendance.leaveAccrualRecord.patch',
  },
})
