import { Internal } from '../internal'
// GENERATED CONTENT

export interface ListMaintainInfoParams {
  /** 页码，从1开始。 */
  pageNumber?: number
  /** 页面大小，最大值20。 */
  pageSize?: number
  /** 设备uuIi列表，最大值10。 */
  deviceUuid?: string[]
}

export interface ListMaintainInfoResponse {
  totalCount?: number
  success?: unknown
  result?: {
    gmtCreate?: string
    deviceCode?: string
    deviceName?: string
    remark?: string
    maintenanceStaff?: number
    processState?: number
    handleTime?: string
  }[]
}

export interface ListInspectInfoParams {
  /** 当前页码，从1开始。 */
  pageNumber?: number
  /** 当页大小，最大值20。 */
  pageSize?: number
  /** 设备uuIi列表，最大值10。 */
  deviceUuid?: string[]
  /** 类型。 */
  type?: string
}

export interface ListInspectInfoResponse {
  totalCount?: number
  success?: unknown
  result?: {
    deviceName?: string
    deviceCode?: string
    type?: string
    status?: number
    repairStatus?: number
    maintenanceStaff?: number
    handleTime?: string
    remark?: string
    name?: string
    gmtCreate?: string
  }[]
}

export interface ListActivateDevicesQuery {
  /** 设备型号。 */
  deviceTypeId?: string
  /** 当前页码，从1开始。 */
  pageNumber?: number
  /** 分组标识。 */
  groupId?: string
  /** 每页大小，最大值50。 */
  pageSize?: number
  /** 设备编号。 */
  deviceCode?: string
  /** 设备分类。 */
  deviceCategory?: number
}

export interface ListActivateDevicesResponse {
  totalCount?: number
  success?: unknown
  result?: {
    bizExt?: string
    deviceCallbackUrl?: string
    deviceCode?: string
    deviceDetailUrl?: string
    deviceName?: string
    groupUuid?: string
    icon?: string
    introduction?: string
    typeUuid?: string
    uuid?: string
    deviceCategory?: number
  }[]
}

export interface RegisterAndActivateDeviceBatchParams {
  /** 设备信息。 */
  registerAndActivateVOS?: object[]
}

export interface RegisterAndActivateDeviceBatchResponse {
  successItems?: {
    errorCode?: string
    errorMsg?: string
    result?: number
    success?: number
  }[]
  success?: unknown
  failItems?: {
    errorCode?: string
    errorMsg?: string
    result?: number
    success?: number
  }[]
}

export interface RegisterAndActivateDeviceParams {
  /** 设备号。 */
  deviceCode: string
  /** 设备名称。 */
  deviceName: string
  /** 设备的简介。 */
  introduction?: string
  /** 设备型号。 */
  typeUuid?: string
  /** 设备管理员的userId列表。 */
  userIds?: string[]
  /** 角色标识。 */
  roleUuid?: string
  /** 设备详情链接，最大长度2048字符。 */
  deviceDetailUrl?: string
  /** 设备回调链接，最大长度2048字符。 */
  deviceCallbackUrl?: string
  /** 设备分类。 */
  deviceCategory?: number
}

export interface RegisterAndActivateDeviceResponse {
  success?: unknown
  result: {
    deviceCode: string
    deviceUuid: string
    deviceName: string
    introduction: string
    typeUuid: string
    roleUuid: string
    deviceDetailUrl: string
    userIds: number
    deviceCategory?: number
  }
}

// funcName: isOldApi
Internal.define({
  '/devicemng/customers/devices/maintainInfos/query': {
    POST: { listMaintainInfo: false },
  },
  '/devicemng/customers/devices/inspectInfos/query': {
    POST: { listInspectInfo: false },
  },
  '/devicemng/customers/devices/activations/infos': {
    GET: { listActivateDevices: false },
  },
  '/devicemng/customers/devices/registrationActivations/batch': {
    POST: { registerAndActivateDeviceBatch: false },
  },
  '/devicemng/customers/devices/registerAndActivate': {
    POST: { registerAndActivateDevice: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 获取报修信息
     * @see https://open.dingtalk.com/document/isvapp/obtain-the-repair-report-record
     */
    listMaintainInfo(
      params: ListMaintainInfoParams,
    ): Promise<ListMaintainInfoResponse>
    /**
     * 获取巡检、保养记录
     * @see https://open.dingtalk.com/document/isvapp/obtain-inspection-and-maintenance-records
     */
    listInspectInfo(
      params: ListInspectInfoParams,
    ): Promise<ListInspectInfoResponse>
    /**
     * 查询激活的设备信息
     * @see https://open.dingtalk.com/document/isvapp/query-information-about-a-registered-device
     */
    listActivateDevices(
      query: ListActivateDevicesQuery,
    ): Promise<ListActivateDevicesResponse>
    /**
     * 批量注册与激活设备
     * @see https://open.dingtalk.com/document/isvapp/register-and-activate-devices-in-batches
     */
    registerAndActivateDeviceBatch(
      params: RegisterAndActivateDeviceBatchParams,
    ): Promise<RegisterAndActivateDeviceBatchResponse>
    /**
     * 注册与激活设备
     * @see https://open.dingtalk.com/document/isvapp/register-the-device-to-the-dingtalk
     */
    registerAndActivateDevice(
      params: RegisterAndActivateDeviceParams,
    ): Promise<RegisterAndActivateDeviceResponse>
  }
}
