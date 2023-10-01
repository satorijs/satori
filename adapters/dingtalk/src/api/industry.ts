import { Internal } from '../internal'
// GENERATED CONTENT

export interface CampusGetCampusQuery {
  /** 园区项目的部门ID。 */
  campusDeptId: number
}

export interface CampusGetCampusResponse {
  campusName?: string
  campusCorpId?: string
  campusDeptId?: number
  belongProjectGroupId?: string
  telephone?: string
  description?: string
  area?: unknown
  country?: string
  provId?: number
  cityId?: number
  countyId?: number
  address?: string
  location?: string
  capacity?: string
  orderStartTime?: number
  orderEndTime?: number
  orderInfo?: string
  extend?: string
}

export interface CampusGetCampusGroupQuery {
  /** 项目组ID。 */
  groupId: number
}

export interface CampusGetCampusGroupResponse {
  projectGroupName?: string
  extend?: string
}

export interface CampusCreateCampusParams {
  /** 园区项目的名称。 */
  campusName: string
  /** 归属的项目组ID。 */
  belongProjectGroupId?: number
  /** 联系电话。 */
  telephone?: string
  /** 园区项目的描述。 */
  description?: string
  /** 园区项目面积。 */
  area?: unknown
  /** 园区所在国家。 */
  country?: string
  /** 园区所在省行政编码。 */
  provId?: number
  /** 园区所在市行政编码。 */
  cityId?: number
  /** 园区所在区/县行政编码。 */
  countyId?: number
  /** 园区所在详细地址信息。 */
  address?: string
  /** 园区容量。 */
  capacity?: number
  /** 项目订购开始时间戳，单位毫秒。 */
  orderStartTime?: number
  /** 项目订购结束时间戳，单位毫秒。 */
  orderEndTime?: number
  /** 订单信息。 */
  orderInfo?: string
  /** 扩展字段。 */
  extend?: string
  /** 创建人的unionId。 */
  creatorUnionId: string
  /** 经纬度，格式为：经度,维度。 */
  location?: string
}

export interface CampusCreateCampusResponse {
  campusCorpId?: string
  campusDeptId?: string
}

export interface CampusCreateCampusGroupParams {
  /** 项目组名称。 */
  name: string
  /** 扩展信息。 */
  extend?: string
}

export interface CampusCreateCampusGroupResponse {
  groupId?: number
}

export interface CampusDeleteCampusGroupQuery {
  /** 项目组ID。 */
  campusProjectGroupId: number
}

export interface CampusDeleteCampusGroupResponse {
  success?: unknown
}

// funcName: isOldApi
Internal.define({
  '/industry/campuses/projectInfos': { GET: { campusGetCampus: false } },
  '/industry/campuses/projects/groupInfos': {
    GET: { campusGetCampusGroup: false },
  },
  '/industry/campuses/projects': { POST: { campusCreateCampus: false } },
  '/industry/campuses/projects/groups': {
    POST: { campusCreateCampusGroup: false },
    DELETE: { campusDeleteCampusGroup: false },
  },
})

declare module '../internal' {
  interface Internal {
    /**
     * 查询园区项目详情
     * @see https://open.dingtalk.com/document/isvapp/query-a-project-in-a-specified-campus
     */
    campusGetCampus(
      query: CampusGetCampusQuery,
    ): Promise<CampusGetCampusResponse>
    /**
     * 查询项目组信息
     * @see https://open.dingtalk.com/document/isvapp/query-a-project-group-in-the-specified-park
     */
    campusGetCampusGroup(
      query: CampusGetCampusGroupQuery,
    ): Promise<CampusGetCampusGroupResponse>
    /**
     * 创建园区项目
     * @see https://open.dingtalk.com/document/isvapp/create-a-campus-project
     */
    campusCreateCampus(
      params: CampusCreateCampusParams,
    ): Promise<CampusCreateCampusResponse>
    /**
     * 创建项目组
     * @see https://open.dingtalk.com/document/isvapp/create-a-project-group
     */
    campusCreateCampusGroup(
      params: CampusCreateCampusGroupParams,
    ): Promise<CampusCreateCampusGroupResponse>
    /**
     * 删除项目组
     * @see https://open.dingtalk.com/document/isvapp/delete-a-project-group
     */
    campusDeleteCampusGroup(
      query: CampusDeleteCampusGroupQuery,
    ): Promise<CampusDeleteCampusGroupResponse>
  }
}
