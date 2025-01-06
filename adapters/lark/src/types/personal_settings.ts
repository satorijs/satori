import { Internal } from '../internal'
import { SystemStatus, SystemStatusI18nName, SystemStatusSyncSetting, SystemStatusUserCloseResultEntity, SystemStatusUserOpenParam, SystemStatusUserOpenResultEntity } from '.'

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
    listPersonalSettingsSystemStatus(query?: ListPersonalSettingsSystemStatusQuery): Promise<ListPersonalSettingsSystemStatusResponse>
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
  update_fields: 'TITLE' | 'I18N_TITLE' | 'ICON' | 'COLOR' | 'PRIORITY' | 'SYNC_SETTING'[]
}

export interface ListPersonalSettingsSystemStatusQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
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

export interface ListPersonalSettingsSystemStatusResponse {
  /** 租户系统状态 */
  items?: SystemStatus[]
  /** 分页token */
  page_token?: string
  /** 是否存在更多 */
  has_more?: boolean
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
  '/open-apis/personal_settings/v1/system_statuses': {
    POST: 'createPersonalSettingsSystemStatus',
    GET: 'listPersonalSettingsSystemStatus',
  },
  '/open-apis/personal_settings/v1/system_statuses/{system_status_id}': {
    DELETE: 'deletePersonalSettingsSystemStatus',
    PATCH: 'patchPersonalSettingsSystemStatus',
  },
  '/open-apis/personal_settings/v1/system_statuses/{system_status_id}/batch_open': {
    POST: 'batchOpenPersonalSettingsSystemStatus',
  },
  '/open-apis/personal_settings/v1/system_statuses/{system_status_id}/batch_close': {
    POST: 'batchClosePersonalSettingsSystemStatus',
  },
})
