import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    securityAndCompliance: SecurityAndCompliance.Methods
  }
}

export namespace SecurityAndCompliance {
  export interface Methods {
    deviceRecord: DeviceRecord.Methods
    deviceApplyRecord: DeviceApplyRecord.Methods
    openapiLog: OpenapiLog.Methods
  }

  export namespace DeviceRecord {
    export interface Methods {
      /**
       * 获取客户端设备认证信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v2/device_record/mine
       */
      mine(): Promise<MineResponse>
      /**
       * 新增设备
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v2/device_record/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 查询设备信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v2/device_record/list
       */
      list(query?: ListQuery): Paginated<Lark.DeviceRecord>
      /**
       * 获取设备信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v2/device_record/get
       */
      get(device_record_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 更新设备
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v2/device_record/update
       */
      update(device_record_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<void>
      /**
       * 删除设备
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v2/device_record/delete
       */
      delete(device_record_id: string): Promise<void>
    }

    export const enum MineResponseDeviceOwnership {
      /** 未知设备 */
      Unknown = 0,
      /** 个人设备 */
      Personal = 1,
      /** 企业设备 */
      Company = 2,
    }

    export const enum MineResponseDeviceStatus {
      /** 未知状态 */
      Unknown = 0,
      /** 信任设备 */
      Trusted = 1,
      /** 非信任设备 */
      Untrusted = 2,
    }

    export interface MineResponse {
      /** 设备认证编码 */
      device_record_id?: string
      /** 设备归属 */
      device_ownership?: MineResponseDeviceOwnership
      /** 可信状态 */
      device_status?: MineResponseDeviceStatus
    }

    export const enum CreateRequestDeviceSystem {
      /** Windows */
      Windows = 1,
      /** macOS */
      MacOS = 2,
      /** Linux */
      Linux = 3,
      /** Android */
      Android = 4,
      /** iOS */
      IOS = 5,
      /** OpenHarmony */
      OpenHarmony = 6,
    }

    export const enum CreateRequestDeviceOwnership {
      /** 未知设备 */
      Unknown = 0,
      /** 个人设备 */
      Personal = 1,
      /** 企业设备 */
      Company = 2,
    }

    export const enum CreateRequestDeviceStatus {
      /** 未知状态 */
      Unknown = 0,
      /** 信任设备 */
      Trusted = 1,
      /** 非信任设备 */
      Untrusted = 2,
    }

    export interface CreateRequest {
      /** 操作系统 */
      device_system: CreateRequestDeviceSystem
      /** 生产序列号 */
      serial_number?: string
      /** 硬盘序列号 */
      disk_serial_number?: string
      /** 主板UUID */
      uuid?: string
      /** MAC地址 */
      mac_address?: string
      /** Android标识符 */
      android_id?: string
      /** iOS供应商标识符 */
      idfv?: string
      /** Harmony供应商标识符 */
      aaid?: string
      /** 设备归属 */
      device_ownership: CreateRequestDeviceOwnership
      /** 可信状态 */
      device_status: CreateRequestDeviceStatus
      /** 最近登录用户ID */
      latest_user_id?: string
      /** 设备指纹列表 */
      dids?: string[]
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** 设备认证编码 */
      device_record_id?: string
    }

    export const enum ListQueryDeviceOwnership {
      /** 未知设备 */
      Unknown = 0,
      /** 个人设备 */
      Personal = 1,
      /** 企业设备 */
      Company = 2,
    }

    export const enum ListQueryDeviceStatus {
      /** 未知状态 */
      Unknown = 0,
      /** 信任设备 */
      Trusted = 1,
      /** 非信任设备 */
      Untrusted = 2,
    }

    export const enum ListQueryDeviceTerminalType {
      /** 未知 */
      Unknown = 0,
      /** 移动端 */
      Mobile = 1,
      /** 桌面端 */
      PC = 2,
    }

    export const enum ListQueryOs {
      /** 未知 */
      Unknown = 0,
      /** Windows */
      Windows = 1,
      /** macOS */
      MacOS = 2,
      /** Linux */
      Linux = 3,
      /** Android */
      Android = 4,
      /** iOS */
      IOS = 5,
      /** 鸿蒙 */
      OpenHarmony = 6,
    }

    export interface ListQuery extends Pagination {
      /** 设备认证编码 */
      device_record_id?: string
      /** 当前登录用户ID */
      current_user_id?: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'open_id' | 'union_id' | 'user_id'
      /** 设备名称 */
      device_name?: string
      /** 生产序列号 */
      serial_number?: string
      /** 硬盘序列号 */
      disk_serial_number?: string
      /** MAC地址 */
      mac_address?: string
      /** Android标识符 */
      android_id?: string
      /** 主板UUID */
      uuid?: string
      /** iOS供应商标识符 */
      idfv?: string
      /** Harmony供应商标识符 */
      aaid?: string
      /** 设备归属 */
      device_ownership?: ListQueryDeviceOwnership
      /** 可信状态 */
      device_status?: ListQueryDeviceStatus
      /** 设备类型 */
      device_terminal_type?: ListQueryDeviceTerminalType
      /** 设备操作系统 */
      os?: ListQueryOs
      /** 最近登录用户ID */
      latest_user_id?: string
      /** 设备指纹 */
      did?: string
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetResponse {
      /** 设备记录 */
      device_record?: Lark.DeviceRecord
    }

    export const enum UpdateRequestDeviceOwnership {
      /** 未知设备 */
      Unknown = 0,
      /** 个人设备 */
      Personal = 1,
      /** 企业设备 */
      Company = 2,
    }

    export const enum UpdateRequestDeviceStatus {
      /** 未知状态 */
      Unknown = 0,
      /** 信任设备 */
      Trusted = 1,
      /** 非信任设备 */
      Untrusted = 2,
    }

    export interface UpdateRequest {
      /** 设备归属 */
      device_ownership: UpdateRequestDeviceOwnership
      /** 可信状态 */
      device_status: UpdateRequestDeviceStatus
      /** 最近登录用户ID */
      latest_user_id?: string
      /** 设备指纹列表 */
      dids?: string[]
    }

    export interface UpdateQuery {
      /** 版本号 */
      version: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }
  }

  export namespace DeviceApplyRecord {
    export interface Methods {
      /**
       * 审批设备申报
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v2/device_apply_record/update
       */
      update(device_apply_record_id: string, body: UpdateRequest): Promise<void>
    }

    export interface UpdateRequest {
      /** 是否审批通过 */
      is_approved: boolean
    }
  }

  export namespace OpenapiLog {
    export interface Methods {
      /**
       * 获取OpenAPI审计日志数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/security_and_compliance-v1/openapi_log/list_data
       */
      listData(body: ListDataRequest): Paginated<Lark.OpenapiLog>
    }

    export interface ListDataRequest {
      /** 飞书开放平台定义的API */
      api_keys?: string[]
      /** 以秒为单位的起始时间戳 */
      start_time?: number
      /** 以秒为单位的终止时间戳 */
      end_time?: number
      /** 在开发者后台——凭证与基础信息页面查看的app_id（cli_xxx），指调用openapi的应用 */
      app_id?: string
      /** 分页大小 */
      page_size?: number
      /** 分页标记，第一次请求不填，表示从头开始遍历；当返回的has_more为true时，会返回新的page_token，再次调用接口，传入这个page_token，将获得下一页数据 */
      page_token?: string
    }
  }
}

Internal.define({
  '/security_and_compliance/v2/device_records/mine': {
    GET: 'securityAndCompliance.deviceRecord.mine',
  },
  '/security_and_compliance/v2/device_records': {
    POST: 'securityAndCompliance.deviceRecord.create',
    GET: { name: 'securityAndCompliance.deviceRecord.list', pagination: { argIndex: 0 } },
  },
  '/security_and_compliance/v2/device_records/{device_record_id}': {
    GET: 'securityAndCompliance.deviceRecord.get',
    PUT: 'securityAndCompliance.deviceRecord.update',
    DELETE: 'securityAndCompliance.deviceRecord.delete',
  },
  '/security_and_compliance/v2/device_apply_records/{device_apply_record_id}': {
    PUT: 'securityAndCompliance.deviceApplyRecord.update',
  },
  '/security_and_compliance/v1/openapi_logs/list_data': {
    POST: 'securityAndCompliance.openapiLog.listData',
  },
})
