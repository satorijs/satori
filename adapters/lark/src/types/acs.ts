import { Internal } from '../internal'
import { AccessRecord, Device, Feature, Rule, User, UserExternal } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 修改用户部分信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/patch
     */
    patchAcsUser(user_id: string, body: PatchAcsUserRequest, query?: PatchAcsUserQuery): Promise<void>
    /**
     * 获取单个用户信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/get
     */
    getAcsUser(user_id: string, query?: GetAcsUserQuery): Promise<GetAcsUserResponse>
    /**
     * 获取用户列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/list
     */
    listAcsUser(query?: ListAcsUserQuery): Promise<ListAcsUserResponse>
    /**
     * 上传人脸图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/update
     */
    updateAcsUserFace(user_id: string, form: UpdateAcsUserFaceForm, query?: UpdateAcsUserFaceQuery): Promise<void>
    /**
     * 下载人脸图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user-face/get
     */
    getAcsUserFace(user_id: string, query?: GetAcsUserFaceQuery): Promise<ArrayBuffer>
    /**
     * 设备绑定权限组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/device_bind
     */
    deviceBindAcsRuleExternal(body: DeviceBindAcsRuleExternalRequest): Promise<void>
    /**
     * 获取权限组信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/get
     */
    getAcsRuleExternal(query?: GetAcsRuleExternalQuery): Promise<GetAcsRuleExternalResponse>
    /**
     * 删除权限组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/delete
     */
    deleteAcsRuleExternal(query?: DeleteAcsRuleExternalQuery): Promise<void>
    /**
     * 创建或更新权限组
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/rule_external/create
     */
    createAcsRuleExternal(body: CreateAcsRuleExternalRequest, query?: CreateAcsRuleExternalQuery): Promise<CreateAcsRuleExternalResponse>
    /**
     * 删除访客
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/visitor/delete
     */
    deleteAcsVisitor(visitor_id: string, query?: DeleteAcsVisitorQuery): Promise<void>
    /**
     * 添加访客
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/visitor/create
     */
    createAcsVisitor(body: CreateAcsVisitorRequest, query?: CreateAcsVisitorQuery): Promise<CreateAcsVisitorResponse>
    /**
     * 获取门禁设备列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/device/list
     */
    listAcsDevice(): Promise<ListAcsDeviceResponse>
    /**
     * 获取门禁记录列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record/list
     */
    listAcsAccessRecord(query?: ListAcsAccessRecordQuery): Promise<ListAcsAccessRecordResponse>
    /**
     * 下载开门时的人脸识别图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record-access_photo/get
     */
    getAcsAccessRecordAccessPhoto(access_record_id: string): Promise<ArrayBuffer>
  }
}

export interface PatchAcsUserRequest {
  /** 用户特征 */
  feature?: Feature
}

export interface PatchAcsUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetAcsUserQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListAcsUserQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateAcsUserFaceForm {
  /** 人脸图片内容 */
  files: Blob
  /** 文件类型,可选的类型有jpg,png */
  file_type: string
  /** 带后缀的文件名 */
  file_name: string
}

export interface UpdateAcsUserFaceQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetAcsUserFaceQuery {
  /** 裁剪图 */
  is_cropped?: boolean
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeviceBindAcsRuleExternalRequest {
  /** 设备id */
  device_id: string
  /** 权限组id列表 */
  rule_ids: string[]
}

export interface GetAcsRuleExternalQuery {
  /** 设备id */
  device_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteAcsRuleExternalQuery {
  /** 权限组id */
  rule_id: string
}

export interface CreateAcsRuleExternalRequest {
  /** 权限组信息 */
  rule: Rule
}

export interface CreateAcsRuleExternalQuery {
  /** 权限组id-为空创建,不为空则更新 */
  rule_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteAcsVisitorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateAcsVisitorRequest {
  /** 访客信息 */
  user: UserExternal
}

export interface CreateAcsVisitorQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListAcsAccessRecordQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 记录开始时间，单位秒 */
  from: number
  /** 记录结束时间，单位秒，时间跨度不能超过30天 */
  to: number
  /** 门禁设备 ID */
  device_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetAcsUserResponse {
  /** 门禁用户信息 */
  user?: User
}

export interface ListAcsUserResponse {
  items?: User[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}

export interface GetAcsRuleExternalResponse {
  /** 设备权限组信息 */
  rules: Rule[]
}

export interface CreateAcsRuleExternalResponse {
  /** 权限组id */
  rule_id: string
}

export interface CreateAcsVisitorResponse {
  /** 访客的id */
  visitor_id: string
}

export interface ListAcsDeviceResponse {
  items?: Device[]
}

export interface ListAcsAccessRecordResponse {
  items?: AccessRecord[]
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}

Internal.define({
  '/open-apis/acs/v1/users/{user_id}': {
    PATCH: 'patchAcsUser',
    GET: 'getAcsUser',
  },
  '/open-apis/acs/v1/users': {
    GET: 'listAcsUser',
  },
  '/open-apis/acs/v1/users/{user_id}/face': {
    PUT: { name: 'updateAcsUserFace', multipart: true },
    GET: { name: 'getAcsUserFace', type: 'binary' },
  },
  '/open-apis/acs/v1/rule_external/device_bind': {
    POST: 'deviceBindAcsRuleExternal',
  },
  '/open-apis/acs/v1/rule_external': {
    GET: 'getAcsRuleExternal',
    DELETE: 'deleteAcsRuleExternal',
    POST: 'createAcsRuleExternal',
  },
  '/open-apis/acs/v1/visitors/{visitor_id}': {
    DELETE: 'deleteAcsVisitor',
  },
  '/open-apis/acs/v1/visitors': {
    POST: 'createAcsVisitor',
  },
  '/open-apis/acs/v1/devices': {
    GET: 'listAcsDevice',
  },
  '/open-apis/acs/v1/access_records': {
    GET: 'listAcsAccessRecord',
  },
  '/open-apis/acs/v1/access_records/{access_record_id}/access_photo': {
    GET: { name: 'getAcsAccessRecordAccessPhoto', type: 'binary' },
  },
})
