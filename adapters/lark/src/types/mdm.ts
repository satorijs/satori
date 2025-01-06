import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 用户数据维度绑定
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/bind
     */
    bindMdmUserAuthDataRelation(body: BindMdmUserAuthDataRelationRequest, query?: BindMdmUserAuthDataRelationQuery): Promise<void>
    /**
     * 用户数据维度解绑
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mdm-v1/user_auth_data_relation/unbind
     */
    unbindMdmUserAuthDataRelation(body: UnbindMdmUserAuthDataRelationRequest, query?: UnbindMdmUserAuthDataRelationQuery): Promise<void>
  }
}

export interface BindMdmUserAuthDataRelationRequest {
  /** 数据类型编码 */
  root_dimension_type: string
  /** 数据编码列表 */
  sub_dimension_types: string[]
  /** 授权人的lark id */
  authorized_user_ids: string[]
  /** uams系统中应用id */
  uams_app_id: string
}

export interface BindMdmUserAuthDataRelationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UnbindMdmUserAuthDataRelationRequest {
  /** 数据类型编码 */
  root_dimension_type: string
  /** 数据编码列表 */
  sub_dimension_types: string[]
  /** 授权人的lark id */
  authorized_user_ids: string[]
  /** uams系统中应用id */
  uams_app_id: string
}

export interface UnbindMdmUserAuthDataRelationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

Internal.define({
  '/open-apis/mdm/v1/user_auth_data_relations/bind': {
    POST: 'bindMdmUserAuthDataRelation',
  },
  '/open-apis/mdm/v1/user_auth_data_relations/unbind': {
    POST: 'unbindMdmUserAuthDataRelation',
  },
})
