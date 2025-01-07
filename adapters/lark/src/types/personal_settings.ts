import { SystemStatus, SystemStatusI18nName, SystemStatusSyncSetting, SystemStatusUserCloseResultEntity, SystemStatusUserOpenParam, SystemStatusUserOpenResultEntity } from '.'
import { Internal, Paginated } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建系统状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/create
     */
    createPersonalSettingsSystemStatus(body: CreatePersonalSettingsSystemStatusRequest): Promise<CreatePersonalSettingsSystemStatusResponse>
    /**
     * 删除系统状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/delete
     */
    deletePersonalSettingsSystemStatus(system_status_id: string): Promise<void>
    /**
     * 修改系统状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/patch
     */
    patchPersonalSettingsSystemStatus(system_status_id: string, body: PatchPersonalSettingsSystemStatusRequest): Promise<PatchPersonalSettingsSystemStatusResponse>
    /**
     * 获取系统状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/list
     */
    listPersonalSettingsSystemStatus(query?: Pagination): Promise<Paginated<SystemStatus>>
    /**
     * 获取系统状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/list
     */
    listPersonalSettingsSystemStatusIter(): AsyncIterator<SystemStatus>
    /**
     * 批量开启系统状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_open
     */
    batchOpenPersonalSettingsSystemStatus(system_status_id: string, body: BatchOpenPersonalSettingsSystemStatusRequest, query?: BatchOpenPersonalSettingsSystemStatusQuery): Promise<BatchOpenPersonalSettingsSystemStatusResponse>
    /**
     * 批量关闭系统状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_close
     */
    batchClosePersonalSettingsSystemStatus(system_status_id: string, body: BatchClosePersonalSettingsSystemStatusRequest, query?: BatchClosePersonalSettingsSystemStatusQuery): Promise<BatchClosePersonalSettingsSystemStatusResponse>
  }
}

export interface CreatePersonalSettingsSystemStatusRequest {
  /** 系统状态名称，名称字符数要在1到20范围内。 */
  title: string
  /** 系统状态国际化名称，名称字符数要在1到20范围内。 */
  i18n_title?: SystemStatusI18nName
  /** 图标 */
  icon_key: 'GeneralDoNotDisturb' | 'GeneralInMeetingBusy' | 'Coffee' | 'GeneralBusinessTrip' | 'GeneralWorkFromHome' | 'StatusEnjoyLife' | 'GeneralTravellingCar' | 'StatusBus' | 'StatusInFlight' | 'Typing' | 'EatingFood' | 'SICK' | 'GeneralSun' | 'GeneralMoonRest' | 'StatusReading' | 'Status_PrivateMessage' | 'StatusFlashOfInspiration' | 'GeneralVacation'
  /** 颜色 */
  color?: 'BLUE' | 'GRAY' | 'INDIGO' | 'WATHET' | 'GREEN' | 'TURQUOISE' | 'YELLOW' | 'LIME' | 'RED' | 'ORANGE' | 'PURPLE' | 'VIOLET' | 'CARMINE'
  /** 优先级，数值越小，客户端展示的优先级越高。不同系统状态的优先级不能一样。 */
  priority?: number
  /** 同步设置 */
  sync_setting?: SystemStatusSyncSetting
}

export interface PatchPersonalSettingsSystemStatusRequest {
  /** 系统状态 */
  system_status: SystemStatus
  /** 需要更新的字段 */
  update_fields: ('TITLE' | 'I18N_TITLE' | 'ICON' | 'COLOR' | 'PRIORITY' | 'SYNC_SETTING')[]
}

export interface BatchOpenPersonalSettingsSystemStatusRequest {
  /** 开启列表 */
  user_list: SystemStatusUserOpenParam[]
}

export interface BatchOpenPersonalSettingsSystemStatusQuery {
  /** 用户id类型 open_id/user_id/union_id */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchClosePersonalSettingsSystemStatusRequest {
  /** 成员列表 */
  user_list: string[]
}

export interface BatchClosePersonalSettingsSystemStatusQuery {
  /** 用户id类型 open_id/user_id/union_id */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreatePersonalSettingsSystemStatusResponse {
  /** 系统状态 */
  system_status?: SystemStatus
}

export interface PatchPersonalSettingsSystemStatusResponse {
  /** 系统状态 */
  system_status?: SystemStatus
}

export interface BatchOpenPersonalSettingsSystemStatusResponse {
  /** 开启结果 */
  result_list: SystemStatusUserOpenResultEntity[]
}

export interface BatchClosePersonalSettingsSystemStatusResponse {
  /** 关闭结果 */
  result_list: SystemStatusUserCloseResultEntity[]
}

Internal.define({
  '/personal_settings/v1/system_statuses': {
    POST: 'createPersonalSettingsSystemStatus',
    GET: { name: 'listPersonalSettingsSystemStatus', pagination: { argIndex: 0 } },
  },
  '/personal_settings/v1/system_statuses/{system_status_id}': {
    DELETE: 'deletePersonalSettingsSystemStatus',
    PATCH: 'patchPersonalSettingsSystemStatus',
  },
  '/personal_settings/v1/system_statuses/{system_status_id}/batch_open': {
    POST: 'batchOpenPersonalSettingsSystemStatus',
  },
  '/personal_settings/v1/system_statuses/{system_status_id}/batch_close': {
    POST: 'batchClosePersonalSettingsSystemStatus',
  },
})
