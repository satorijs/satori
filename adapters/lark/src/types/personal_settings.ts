import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    personalSettings: PersonalSettings.Methods
  }
}

export namespace PersonalSettings {
  export interface Methods {
    systemStatus: SystemStatus.Methods
  }

  export namespace SystemStatus {
    export interface Methods {
      /**
       * 创建系统状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 删除系统状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/delete
       */
      delete(system_status_id: string): Promise<void>
      /**
       * 修改系统状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/patch
       */
      patch(system_status_id: string, body: PatchRequest): Promise<PatchResponse>
      /**
       * 获取系统状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/list
       */
      list(query?: Pagination): Paginated<Lark.SystemStatus>
      /**
       * 批量开启系统状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_open
       */
      batchOpen(system_status_id: string, body: BatchOpenRequest, query?: BatchOpenQuery): Promise<BatchOpenResponse>
      /**
       * 批量关闭系统状态
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/personal_settings-v1/system_status/batch_close
       */
      batchClose(system_status_id: string, body: BatchCloseRequest, query?: BatchCloseQuery): Promise<BatchCloseResponse>
    }

    export interface CreateRequest {
      /** 系统状态名称，名称字符数要在1到20范围内。 */
      title: string
      /** 系统状态国际化名称，名称字符数要在1到20范围内。 */
      i18n_title?: Lark.SystemStatusI18nName
      /** 图标 */
      icon_key: 'GeneralDoNotDisturb' | 'GeneralInMeetingBusy' | 'Coffee' | 'GeneralBusinessTrip' | 'GeneralWorkFromHome' | 'StatusEnjoyLife' | 'GeneralTravellingCar' | 'StatusBus' | 'StatusInFlight' | 'Typing' | 'EatingFood' | 'SICK' | 'GeneralSun' | 'GeneralMoonRest' | 'StatusReading' | 'Status_PrivateMessage' | 'StatusFlashOfInspiration' | 'GeneralVacation'
      /** 颜色 */
      color?: 'BLUE' | 'GRAY' | 'INDIGO' | 'WATHET' | 'GREEN' | 'TURQUOISE' | 'YELLOW' | 'LIME' | 'RED' | 'ORANGE' | 'PURPLE' | 'VIOLET' | 'CARMINE'
      /** 优先级，数值越小，客户端展示的优先级越高。不同系统状态的优先级不能一样。 */
      priority?: number
      /** 同步设置 */
      sync_setting?: Lark.SystemStatusSyncSetting
    }

    export interface CreateResponse {
      /** 系统状态 */
      system_status?: Lark.SystemStatus
    }

    export interface PatchRequest {
      /** 系统状态 */
      system_status: Lark.SystemStatus
      /** 需要更新的字段 */
      update_fields: ('TITLE' | 'I18N_TITLE' | 'ICON' | 'COLOR' | 'PRIORITY' | 'SYNC_SETTING')[]
    }

    export interface PatchResponse {
      /** 系统状态 */
      system_status?: Lark.SystemStatus
    }

    export interface BatchOpenRequest {
      /** 开启列表 */
      user_list: Lark.SystemStatusUserOpenParam[]
    }

    export interface BatchOpenQuery {
      /** 用户id类型 open_id/user_id/union_id */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface BatchOpenResponse {
      /** 开启结果 */
      result_list: Lark.SystemStatusUserOpenResultEntity[]
    }

    export interface BatchCloseRequest {
      /** 成员列表 */
      user_list: string[]
    }

    export interface BatchCloseQuery {
      /** 用户id类型 open_id/user_id/union_id */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface BatchCloseResponse {
      /** 关闭结果 */
      result_list: Lark.SystemStatusUserCloseResultEntity[]
    }
  }
}

Internal.define({
  '/personal_settings/v1/system_statuses': {
    POST: 'personalSettings.systemStatus.create',
    GET: { name: 'personalSettings.systemStatus.list', pagination: { argIndex: 0 } },
  },
  '/personal_settings/v1/system_statuses/{system_status_id}': {
    DELETE: 'personalSettings.systemStatus.delete',
    PATCH: 'personalSettings.systemStatus.patch',
  },
  '/personal_settings/v1/system_statuses/{system_status_id}/batch_open': {
    POST: 'personalSettings.systemStatus.batchOpen',
  },
  '/personal_settings/v1/system_statuses/{system_status_id}/batch_close': {
    POST: 'personalSettings.systemStatus.batchClose',
  },
})
