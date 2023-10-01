import { Internal } from '../internal'
// GENERATED CONTENT

export interface OapiServiceGetCorpTokenParams {
  /** 授权方corpid */
  auth_corpid?: string
}

export interface OapiServiceGetCorpTokenResponse {
  /** 授权方（企业）corp_access_token超时时间 */
  expires_in?: unknown
  /** 授权方（企业）corp_access_token */
  access_token?: string
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiSsoGettokenQuery {
  /** 企业Id */
  corpid?: string
  /** 这里必须填写专属的SSOSecret */
  corpsecret?: string
}

export interface OapiSsoGettokenResponse {
  /** 获取到的凭证 */
  access_token?: string
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
}

export interface OapiGetJsapiTicketResponse {
  /** 票据过期时间 */
  expires_in?: unknown
  /** 用于JS API的临时票据 */
  ticket?: string
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiGettokenQuery {
  /** 应用的唯一标识key */
  appkey?: string
  /** 应用的密钥 */
  appsecret?: string
}

export interface OapiGettokenResponse {
  /** access_token */
  access_token?: string
  /** expires_in */
  expires_in?: unknown
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiV2UserGetuserinfoParams {
  /** 免登授权码 */
  code: string
}

export interface OapiV2UserGetuserinfoResponse {
  /** 错误码, 0代表成功，其它代表失败。 */
  errcode?: unknown
  /** 错误信息。 */
  errmsg?: string
  /** 返回结果 */
  result?: {
    userid?: string
    device_id?: string
    sys?: number
    sys_level?: number
    unionid?: string
    associated_unionid?: string
    name?: string
  }
}

export interface OapiSnsGetuserinfoBycodeParams {
  /** 登录的临时授权码 */
  tmp_auth_code?: string
}

export interface OapiSnsGetuserinfoBycodeResponse {
  /** user_info */
  user_info?: {
    nick?: string
    unionid?: string
    openid?: string
    main_org_auth_high_level?: number
  }
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiSsoGetuserinfoQuery {
  /** 再次强调，此token不同于一般的accesstoken，需要调用获取微应用管理员免登需要的AccessToken */
  code?: string
  /** 通过Oauth认证给URL带上的CODE */
  access_token?: string
}

export interface OapiSsoGetuserinfoResponse {
  /** user_info */
  user_info?: {
    avatar?: string
    email?: string
    name?: string
    userid?: string
  }
  /** corp_info */
  corp_info?: {
    corp_name?: string
    corpid?: string
  }
  /** is_sys */
  is_sys?: unknown
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
}

export interface OapiServiceGetAuthInfoParams {
  /** 套件key */
  suite_key?: string
  /** 授权方corpid */
  auth_corpid?: string
}

export interface OapiServiceGetAuthInfoResponse {
  /** auth_info */
  auth_info?: {
    agent?: number
  }
  /** auth_user_info */
  auth_user_info?: {
    userId?: string
  }
  /** auth_corp_info */
  auth_corp_info?: {
    corpid?: string
    invite_code?: string
    industry?: string
    corp_name?: string
    license_code?: string
    auth_channel?: string
    auth_channel_type?: string
    is_authenticated?: number
    auth_level?: number
    invite_url?: string
    corp_logo_url?: string
    belong_corp_id?: string
    unifiedSocialCredit?: string
    full_corp_name?: string
  }
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
  /** channel_auth_info */
  channel_auth_info?: {
    channelAgent?: number
  }
}

export interface OapiV2UserUpdateParams {
  /** 员工id，长度最大64个字符。员工在当前企业内的唯一标识。如果不传，服务器将自动生成一个userid。创建后不可修改，企业内必须唯一。 */
  userid: string
  /** 员工名称，长度最大80个字符。 */
  name?: string
  /** 手机号码，企业内必须唯一，不可重复。如果是国际号码，请使用+xx-xxxxxx的格式 */
  mobile?: string
  /** 是否号码隐藏。隐藏手机号后，手机号在个人资料页隐藏，但仍可对其发DING、发起钉钉免费商务电话。 */
  hide_mobile?: unknown
  /** 分机号，长度最大50个字符。企业内必须唯一，不可重复 */
  telephone?: string
  /** 员工工号，长度最大50个字符。 */
  job_number?: string
  /** 职位，长度最大200个字符。 */
  title?: string
  /** 员工邮箱，长度最大50个字符。企业内必须唯一，不可重复。 */
  email?: string
  /** 员工的企业邮箱，长度最大100个字符。员工的企业邮箱已开通，才能增加此字段。 */
  org_email?: string
  /** 办公地点，长度最大100个字符。 */
  work_place?: string
  /** 备注，长度最大2000个字符。 */
  remark?: string
  /** 所属部门id列表 */
  dept_id_list?: number[]
  /** 员工在对应的部门中的排序。 */
  dept_order_list?: object[]
  /** 员工在对应的部门中的职位。 */
  dept_title_list?: object[]
  /** 扩展属性，长度最大2000个字符。可以设置多种属性（手机上最多显示10个扩展属性，具体显示哪些属性，请到OA管理后台->设置->通讯录信息设置和OA管理后台->设置->手机端显示信息设置）。 该字段的值支持链接类型填写，同时链接支持变量通配符自动替换，目前支持通配符有：userid，corpid。示例： [工位地址](http://www.dingtalk.com?userid=#userid#&corpid=#corpid#) */
  extension?: unknown
  /** 是否高管模式。开启后，手机号码对所有员工隐藏。普通员工无法对其发DING、发起钉钉免费商务电话。高管之间不受影响。 */
  senior_mode?: unknown
  /** 入职时间，Unix时间戳，单位ms。 */
  hired_date?: unknown
  /** 语言 */
  language?: string
  /** 重置专属帐号密码 */
  init_password?: string
  /** 修改专属帐号登录名 */
  loginId?: string
  /** 部门内任职 */
  dept_position_list?: object[]
  /** 企业邮箱类型（profession：标准版，base：基础版） */
  org_email_type?: string
  /** 强制更新的字段，支持清空指定的字段，使用逗号分隔。目前支持字段：manager_userid */
  force_update_fields?: string[]
  /** 直属主管 */
  manager_userid?: string
  /** 专属帐号手机号 */
  exclusive_mobile?: string
  /** 手机号验证状态 */
  exclusive_mobile_verify_status?: string
  /** 修改本组织专属帐号时可指定昵称 */
  nickname?: string
  /** 修改本组织专属帐号时可指定头像MediaId。只支持参考jpg/png，生成方法 https://open.dingtalk.com/document/app/upload-media-files */
  avatarMediaId?: string
  /** 自定义字段更新模式，0-覆盖方式  1-追加方式  (默认是覆盖) */
  ext_attrs_update_mode?: unknown
  /** 更新自定义字段列表 */
  ext_attrs?: object[]
  /** 自定义性别字段 */
  gender?: string
}

export interface OapiV2UserUpdateResponse {
  /** 错误码。0代表成功。 */
  errcode?: unknown
  /** 错误信息。 */
  errmsg?: string
}

export interface OapiV2UserCreateParams {
  /** 员工id，长度最大64个字符。员工在当前企业内的唯一标识。 */
  userid?: string
  /** 员工名称，长度最大80个字符。 */
  name: string
  /** 手机号码，企业内必须唯一，不可重复。如果是国际号码，请使用+xx-xxxxxx的格式 */
  mobile?: string
  /** 是否号码隐藏。隐藏手机号后，手机号在个人资料页隐藏，但仍可对其发DING、发起钉钉免费商务电话。 */
  hide_mobile?: unknown
  /** 分机号，长度最大50个字符。企业内必须唯一，不可重复 */
  telephone?: string
  /** 员工工号，长度最大50个字符。 */
  job_number?: string
  /** 职位，长度最大200个字符。 */
  title?: string
  /** 员工邮箱，长度最大50个字符。企业内必须唯一，不可重复。 */
  email?: string
  /** 员工的企业邮箱，长度最大100个字符。员工的企业邮箱已开通，才能增加此字段。 */
  org_email?: string
  /** 办公地点，长度最大100个字符。 */
  work_place?: string
  /** 备注，长度最大2000个字符。 */
  remark?: string
  /** 所属部门id列表 */
  dept_id_list?: number[]
  /** 员工在对应的部门中的排序。 */
  dept_order_list?: object[]
  /** 员工在对应的部门中的职位。 */
  dept_title_list?: object[]
  /** 扩展属性，长度最大2000个字符。可以设置多种属性（手机上最多显示10个扩展属性，具体显示哪些属性，请到OA管理后台->设置->通讯录信息设置和OA管理后台->设置->手机端显示信息设置）。 该字段的值支持链接类型填写，同时链接支持变量通配符自动替换，目前支持通配符有：userid，corpid。示例： [工位地址](http://www.dingtalk.com?userid=#userid#&corpid=#corpid#) */
  extension?: unknown
  /** 是否高管模式。开启后，手机号码对所有员工隐藏。普通员工无法对其发DING、发起钉钉免费商务电话。高管之间不受影响。 */
  senior_mode?: unknown
  /** 入职时间，Unix时间戳，单位ms。 */
  hired_date?: unknown
  /** 登录邮箱 */
  login_email?: string
  /** 是否专属帐号（true时，不能指定loginEmail或mobile） */
  exclusive_account?: unknown
  /** 专属帐号类型：sso： 企业自建专属帐号；dingtalk：钉钉自建专属帐号。 */
  exclusive_account_type?: string
  /** 钉钉专属帐号登录名 */
  login_id?: string
  /** 钉钉专属帐号初始密码 */
  init_password?: string
  /** 部门内任职 */
  dept_position_list?: object[]
  /** 企业邮箱类型（profession：标准版，base：基础版） */
  org_email_type?: string
  /** 直属主管 */
  manager_userid?: string
  /** 专属帐号手机号 */
  exclusive_mobile?: string
  /** 专属帐号手机号验证状态 */
  exclusive_mobile_verify_status?: string
  /** 需要添加的专属帐号所属corpid */
  outer_exclusive_corpid?: string
  /** 需要添加的专属帐号所属userid */
  outer_exclusive_userid?: string
  /** 创建本组织专属帐号时可指定头像MediaId。只支持参考jpg/png，生成方法 https://open.dingtalk.com/document/app/upload-media-files */
  avatarMediaId?: string
  /** 创建本组织专属帐号时可指定昵称 */
  nickname?: string
  /** 自定义字段更新模式，0-覆盖方式 1-追加方式 (默认是覆盖) */
  ext_attrs_update_mode?: unknown
  /** 自定义字段列表 */
  ext_attrs?: object[]
  /** 自定义性别字段 */
  gender?: string
}

export interface OapiV2UserCreateResponse {
  /** 错误码。0代表成功。 */
  errcode?: unknown
  /** 错误信息。 */
  errmsg?: string
  /** 返回结果 */
  result?: {
    userid?: string
    unionId?: string
  }
}

export interface OapiOrgUnionTrunkGetResponse {
  /** OpenOrgUnion */
  result?: {
    org_name?: string
    corpid?: string
  }[]
  /** 是否成功 */
  success?: unknown
  /** 错误code */
  errcode?: unknown
  /** 错误msg */
  errmsg?: string
}

export interface OapiSmartworkHrmRosterMetaGetParams {
  /** 微应用在企业的AgentId */
  agentid: unknown
}

export interface OapiSmartworkHrmRosterMetaGetResponse {
  /** 花名册分组定义 */
  result?: {
    group_name?: string
    group_id?: string
    field_meta_info_list?: number
    detail?: number
  }[]
  /** 服务调用成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartworkHrmEmployeeV2ListParams {
  /** 员工id列表 */
  userid_list: string[]
  /** 需要获取的花名册字段信息(不传值时，企业调用获取全部字段，ISV调用获取所有有权限字段。查询字段越少，RT越低，建议按需查询) */
  field_filter_list?: string[]
  /** 微应用在企业的agentId */
  agentid: unknown
}

export interface OapiSmartworkHrmEmployeeV2ListResponse {
  /** 返回结果 */
  result?: {
    corp_id?: string
    field_data_list?: number
    userid?: string
    unionid?: string
  }[]
  /** 调用是否成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartworkHrmEmployeeV2UpdateParams {
  /** 微应用在企业的AgentId */
  agentid: unknown
  /** 编辑花名册入参 */
  param: unknown
}

export interface OapiSmartworkHrmEmployeeV2UpdateResponse {
  /** 调用是否成功 */
  result?: unknown
  /** 调用结果 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartworkHrmEmployeeFieldGrouplistParams {
  /** 微应用在企业的AgentId，不需要自定义字段可不传 */
  agentid?: unknown
}

export interface OapiSmartworkHrmEmployeeFieldGrouplistResponse {
  /** 错误描述 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标记 */
  success?: unknown
  /** 结果集 */
  result?: {
    group_id?: string
    has_detail?: number
    field_list?: number
  }[]
}

export interface OapiSmartworkHrmEmployeeUpdateParams {
  /** 添加待入职入参 */
  param: unknown
  /** 微应用在企业的AgentId */
  agentid: unknown
}

export interface OapiSmartworkHrmEmployeeUpdateResponse {
  /** 业务处理是否成功 */
  result?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 调用结果 */
  success?: unknown
}

export interface OapiSmartworkHrmEmployeeQueryonjobParams {
  /** 在职员工子状态筛选。2，试用期；3，正式；5，待离职；-1，无状态 */
  status_list: number[]
  /** 分页起始值，默认0开始 */
  offset: unknown
  /** 分页大小，最大50 */
  size: unknown
}

export interface OapiSmartworkHrmEmployeeQueryonjobResponse {
  /** 分页结果 */
  result?: {
    data_list?: number
    next_cursor?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 调用结果 */
  success?: unknown
}

export interface OapiSmartworkHrmEmployeeQuerypreentryParams {
  /** 分页起始值，默认0开始 */
  offset: unknown
  /** 分页大小，最大50 */
  size: unknown
}

export interface OapiSmartworkHrmEmployeeQuerypreentryResponse {
  /** 分页结果 */
  result?: {
    next_cursor?: number
    data_list?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 调用结果 */
  success?: unknown
}

export interface OapiSmartworkHrmEmployeeAddpreentryParams {
  /** 添加待入职入参 */
  param: unknown
}

export interface OapiSmartworkHrmEmployeeAddpreentryResponse {
  /** 员工id */
  userid?: string
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 调用结果 */
  success?: unknown
}

export interface OapiSmartworkHrmEmployeeListParams {
  /** 员工id列表 */
  userid_list: string[]
  /** 需要获取的花名册字段信息 */
  field_filter_list?: string[]
  /** 微应用在企业的agentId */
  agentid?: unknown
}

export interface OapiSmartworkHrmEmployeeListResponse {
  /** 返回结果 */
  result?: {
    userid?: string
    field_list?: number
    partner?: number
  }[]
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 调用是否成功 */
  success?: unknown
}

export interface OapiReportTemplateGetbynameParams {
  /** 员工id */
  userid: string
  /** 模板名称 */
  template_name: string
}

export interface OapiReportTemplateGetbynameResponse {
  /** result */
  result?: {
    default_receivers?: number
    name?: string
    id?: string
    fields?: number
    user_name?: string
    userid?: string
    default_received_convs?: number
  }
  /** 系统自动生成 */
  errcode?: unknown
  /** 系统自动生成 */
  errmsg?: string
}

export interface OapiReportCreateParams {
  /** 创建日志的参数对象 */
  create_report_param: unknown
}

export interface OapiReportCreateResponse {
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
  /** result */
  result?: string
}

export interface OapiReportSavecontentParams {
  /** 保存日志的参数对象 */
  create_report_param: unknown
}

export interface OapiReportSavecontentResponse {
  /** result */
  result?: string
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
}

export interface OapiReportSimplelistParams {
  /** 查询起始时间 */
  start_time: unknown
  /** 查询截止时间 */
  end_time: unknown
  /** 要查询的模板名称 */
  template_name?: string
  /** 员工的userid */
  userid?: string
  /** 查询游标，初始传入0，后续从上一次的返回值中获取 */
  cursor: unknown
  /** 每页数据量 */
  size: unknown
}

export interface OapiReportSimplelistResponse {
  /** result */
  result?: {
    data_list?: number
    size?: number
    next_cursor?: number
    has_more?: number
  }
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
}

export interface OapiReportStatisticsListbytypeParams {
  /** 日志id */
  report_id: string
  /** 查询类型 0:已读人员列表 1:评论人员列表 2:点赞人员列表 */
  type: unknown
  /** 分页查询的游标，最开始传0，后续传返回参数中的next_cursor值，默认值为0 */
  offset?: unknown
  /** 分页参数，每页大小，最多传100，默认值为100 */
  size?: unknown
}

export interface OapiReportStatisticsListbytypeResponse {
  /** 成功 */
  success?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 统计结果 */
  result?: {
    next_cursor?: number
    has_more?: number
    userid_list?: number
  }
}

export interface OapiReportReceiverListParams {
  /** 日志id */
  report_id: string
  /** 分页查询的游标，最开始传0，后续传返回参数中next_cursor的值，默认值为0 */
  offset?: unknown
  /** 分页参数，每页大小，最多传100，默认值为100 */
  size?: unknown
}

export interface OapiReportReceiverListResponse {
  /** 统计结果 */
  result?: {
    has_more?: number
    next_cursor?: number
    userid_list?: number
  }
  /** 错误吗 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 成功 */
  success?: unknown
}

export interface OapiReportCommentListParams {
  /** 日志id */
  report_id: string
  /** 分页查询的游标，最开始传0，后续传返回参数中的next_cursor值，默认值为0 */
  offset?: unknown
  /** 分页参数，每页大小，最多传20，默认值为20 */
  size?: unknown
}

export interface OapiReportCommentListResponse {
  /** 统计结果 */
  result?: {
    comments?: number
    has_more?: number
    next_cursor?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 成功 */
  success?: unknown
}

export interface OapiReportStatisticsParams {
  /** 日志id */
  report_id: string
}

export interface OapiReportStatisticsResponse {
  /** 统计结果 */
  result?: {
    read_num?: number
    comment_num?: number
    comment_user_num?: number
    like_num?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 是否成功 */
  success?: unknown
}

export interface OapiReportGetunreadcountParams {
  /** 员工id */
  userid?: string
}

export interface OapiReportGetunreadcountResponse {
  /** 员工日志未读数 */
  count?: unknown
  /** errorMsg */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
}

export interface OapiReportListParams {
  /** 查询的日志创建的开始时间 */
  start_time: unknown
  /** 查询的日志创建的结束时间 */
  end_time: unknown
  /** 要查询的模板名称 */
  template_name?: string
  /** 员工的userid */
  userid?: string
  /** 查询游标，初始传入0，后续从上一次的返回值中获取 */
  cursor: unknown
  /** 每页数据量 */
  size: unknown
  /** 查询的日志修改的开始时间 */
  modified_start_time?: unknown
  /** 查询的日志修改的结束时间 */
  modified_end_time?: unknown
}

export interface OapiReportListResponse {
  /** result */
  result?: {
    data_list?: number
    size?: number
    next_cursor?: number
    has_more?: number
  }
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
}

export interface OapiReportTemplateListbyuseridParams {
  /** 员工userId, 不传递表示获取所有日志模板 */
  userid?: string
  /** 分页游标，从0开始。根据返回结果里的next_cursor是否为空来判断是否还有下一页，且再次调用时offset设置成next_cursor的值 */
  offset?: unknown
  /** 分页大小，最大可设置成100 */
  size?: unknown
}

export interface OapiReportTemplateListbyuseridResponse {
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** result */
  result?: {
    template_list?: number
    next_cursor?: number
  }
}

export interface OapiCheckinRecordGetParams {
  /** 需要查询的用户列表 */
  userid_list: string[]
  /** 起始时间,单位毫秒 */
  start_time: unknown
  /** 截止时间，单位毫秒。如果是取1个人的数据，时间范围最大到10天，如果是取多个人的数据，时间范围最大1天。 */
  end_time: unknown
  /** 分页查询的游标，最开始可以传0 */
  cursor: unknown
  /** 分页查询的每页大小，最大100 */
  size: unknown
}

export interface OapiCheckinRecordGetResponse {
  /** result */
  result?: {
    next_cursor?: number
    page_list?: number
  }
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
}

export interface OapiCheckinRecordQuery {
  /** 部门id（1 表示根部门） */
  department_id?: string
  /** 开始时间，精确到毫秒，注意字段的位数 例：1520956800000 */
  end_time?: unknown
  /** 结束时间，精确到毫秒，注意字段的位数 例：1520956800000（默认为当前时间） */
  start_time?: unknown
  /** 支持分页查询，与size 参数同时设置时才生效，此参数代表偏移量，从0 开始 */
  offset?: unknown
  /** 支持分页查询，与offset 参数同时设置时才生效，此参数代表分页大小，最大100 */
  size?: unknown
  /** 排序，asc 为正序，desc 为倒序 */
  order?: string
}

export interface OapiCheckinRecordResponse {
  /** data */
  data?: {
    name?: string
    userId?: string
    avatar?: string
    timestamp?: number
    place?: string
    detailPlace?: string
    remark?: string
    imageList?: number
    latitude?: string
    longitude?: string
  }[]
  /** 对返回码的文本描述内容 */
  errmsg?: string
  /** 返回码 */
  errcode?: unknown
}

export interface OapiBlackboardCategoryListParams {
  /** 操作人userId(必须是公告管理员) */
  operation_userid: string
}

export interface OapiBlackboardCategoryListResponse {
  /** 出参，success为true时，该值不为空，否则值为空 */
  result?: {
    id?: string
    name?: string
  }[]
  /** 本次调用是否成功，该值为false时，根据errcode和errMsg排查失败原因 */
  success?: unknown
  /** 请求失败返回错误码 */
  errcode?: unknown
  /** 请求失败返回错误信息 */
  errmsg?: string
}

export interface OapiBlackboardUpdateParams {
  /** 请求入参 */
  update_request?: unknown
}

export interface OapiBlackboardUpdateResponse {
  /** success为true时，该值不为空，否则值为空 */
  result?: unknown
  /** 本次调用是否成功，该值为false时，根据errcode和errMsg排查失败原因 */
  success?: unknown
  /** 请求失败返回的错误码 */
  errcode?: unknown
  /** 请求失败返回的错误信息 */
  errmsg?: string
}

export interface OapiBlackboardDeleteParams {
  /** 公告id,可以通过https://oapi.dingtalk.com/blackboard/listids获取有效值 */
  blackboard_id: string
  /** 操作人userId(必须是公告管理员) */
  operation_userid: string
}

export interface OapiBlackboardDeleteResponse {
  /** success为true时，该值不为空，否则值为空 */
  result?: unknown
  /** 本次调用是否成功，该值为false时，根据errcode和errMsg排查失败原因 */
  success?: unknown
  /** 请求失败返回的错误码 */
  errcode?: unknown
  /** 请求失败返回的错误信息 */
  errmsg?: string
}

export interface OapiBlackboardGetParams {
  /** 公告id */
  blackboard_id: string
  /** 操作人userId */
  operation_userid: string
}

export interface OapiBlackboardGetResponse {
  /** 出参，success为true时，该值不为空，否则值为空 */
  result?: {
    id?: string
    author?: string
    title?: string
    content?: string
    category_id?: string
    private_level?: number
    depname_list?: number
    username_list?: number
    gmt_create?: string
    gmt_modified?: string
    read_count?: number
    unread_count?: number
    coverpic_url?: string
    user_list?: number
    deptList?: number
    senderStaffId?: string
  }
  /** 本次调用是否成功，该值为false时，根据errcode和errMsg排查失败原因 */
  success?: unknown
  /** 请求失败返回错误码，0代表无错误 */
  errcode?: unknown
  /** 请求失败返回错误信息 */
  errmsg?: string
}

export interface OapiBlackboardListidsParams {
  /** 请求入参 */
  query_request?: unknown
}

export interface OapiBlackboardListidsResponse {
  /** success为true时，返回公告id列表。否则值为空 */
  result?: string[]
  /** 本次调用是否成功，该值为false时，根据errcode和errMsg排查失败原因 */
  success?: unknown
  /** 请求失败的错误码 */
  errcode?: unknown
  /** 请求失败的错误原因 */
  errmsg?: string
}

export interface OapiBlackboardCreateParams {
  /** 请求入参 */
  create_request: unknown
}

export interface OapiBlackboardCreateResponse {
  /** success为true时，该值不为空，否则值为空 */
  result?: unknown
  /** 本次调用是否成功，该值为false时，根据errcode和errMsg排查失败原因 */
  success?: unknown
  /** 请求失败返回的错误码 */
  errcode?: unknown
  /** 请求失败返回的错误信息 */
  errmsg?: string
}

export interface OapiBlackboardListtoptenParams {
  /** 用户id */
  userid: string
  /** 公告分类id */
  categoryId?: string
}

export interface OapiBlackboardListtoptenResponse {
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
  /** result */
  blackboard_list?: {
    gmt_create?: string
    title?: string
    url?: string
    categoryId?: string
    id?: string
    categoryName?: string
    privateLevel?: number
    isPushTop?: number
  }[]
}

export interface OapiHealthStepinfoGetuserstatusParams {
  /** 用户id */
  userid: string
}

export interface OapiHealthStepinfoGetuserstatusResponse {
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
  /** true表示开启，false表示未开启 */
  status?: unknown
}

export interface OapiHealthStepinfoListbyuseridParams {
  /** 员工userid列表，最多传50个 */
  userids: string[]
  /** 时间，注意时间格式是YYMMDD */
  stat_date: string
}

export interface OapiHealthStepinfoListbyuseridResponse {
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
  /** 步数列表 */
  stepinfo_list?: {
    stat_date?: number
    step_count?: number
    userid?: string
  }[]
}

export interface OapiHealthStepinfoListParams {
  /** 0表示取用户步数，1表示取部门步数 */
  type: unknown
  /** 可以传入用户userid或者部门id */
  object_id: string
  /** 时间列表，注意时间格式是YYYYMMDD */
  stat_dates: string[]
}

export interface OapiHealthStepinfoListResponse {
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
  /** 步数列表 */
  stepinfo_list?: {
    stat_date?: number
    step_count?: number
  }[]
}

export interface OapiMicroappListByUseridQuery {
  /** 员工userid */
  userid?: string
}

export interface OapiMicroappListByUseridResponse {
  /** 返回码 */
  errcode?: unknown
  /** 对返回码的文本描述内容 */
  errmsg?: string
  /** appList */
  appList?: {
    agentId?: number
    name?: string
    appIcon?: string
    appDesc?: string
    isSelf?: number
    appStatus?: number
    homepageLink?: string
    pcHomepageLink?: string
    ompLink?: string
  }[]
}

export interface OapiMicroappListResponse {
  /** appList */
  appList?: {
    name?: string
    agentId?: number
    appIcon?: string
    appDesc?: string
    isSelf?: number
    appStatus?: number
    ompLink?: string
    homepageLink?: string
    pcHomepageLink?: string
    appId?: number
  }[]
  /** 对返回码的文本描述内容 */
  errmsg?: string
  /** 返回码 */
  errcode?: unknown
}

export interface OapiMicroappDeleteParams {
  /** 微应用实例化id，企业只能删除自建微应用 */
  agentId?: unknown
}

export interface OapiMicroappDeleteResponse {
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiMicroappSetVisibleScopesParams {
  /** 设置可见的员工id列表，格式为JSON数组 */
  userVisibleScopes?: string[]
  /** 设置可见的部门id列表，格式为JSON数组 */
  deptVisibleScopes?: number[]
  /** 是否仅限管理员可见，true代表仅限管理员可见 */
  isHidden?: unknown
  /** 微应用实例化id */
  agentId?: unknown
}

export interface OapiMicroappSetVisibleScopesResponse {
  /** 返回码 */
  errmsg?: string
  /** 对返回码的文本描述内容 */
  errcode?: unknown
}

export interface OapiMicroappVisibleScopesParams {
  /** 微应用实例化id */
  agentId?: unknown
}

export interface OapiMicroappVisibleScopesResponse {
  /** 微应用的可见用户id列表，格式为JSON数组 */
  userVisibleScopes?: string[]
  /** 微应用的可见部门id列表，格式为JSON数组 */
  deptVisibleScopes?: number[]
  /** 是否仅限管理员可见 */
  isHidden?: unknown
  /** 对返回码的文本描述内容 */
  errmsg?: string
  /** 返回码 */
  errcode?: unknown
}

export interface OapiAsrVoiceTranslateParams {
  /** media_id，获取方式见https://ding-doc.dingtalk.com/doc#/serverapi2/bcmg0i */
  media_id: string
}

export interface OapiAsrVoiceTranslateResponse {
  /** errorMsg */
  errmsg?: string
  /** dingOpenErrcode */
  errcode?: unknown
  /** result */
  result?: string
}

export interface OapiAiMtTranslateParams {
  /** 翻译源文字符串 */
  query: string
  /** 翻译源语言类型 */
  source_language: string
  /** 翻译目标语言类型 */
  target_language: string
}

export interface OapiAiMtTranslateResponse {
  /** 翻译结果字符串 */
  result?: string
  /** 成功为0 */
  errcode?: unknown
  /** 成功 */
  errmsg?: string
}

export interface OapiOcrStructuredRecognizeParams {
  /** 识别图片类型, 身份证idcard，营业执照增值税发票invoice，营业执照blicense，银行卡bank_card，车牌car_no，机动车发票car_invoice，驾驶证driving_license，行驶证vehicle_license，火车票train_ticket，定额发票quota_invoice，出租车发票taxi_ticket，机票行程单air_itinerary */
  type: string
  /** 识别图片地址 */
  image_url: string
}

export interface OapiOcrStructuredRecognizeResponse {
  /** 错误码 */
  errcode?: unknown
  /** 错误描述 */
  errmsg?: string
  /** 识别结果 */
  result?: {
    height?: number
    width?: number
    angle?: number
    data?: string
    original_height?: number
    original_width?: number
  }
}

export interface OapiImChatScencegroupMessageSendV2Params {
  /** 接收消息的群的openConversationId */
  target_open_conversation_id: string
  /** 模板ID */
  msg_template_id: string
  /** 消息模板内容替换参数-普通文本类型 */
  msg_param_map?: unknown
  /** 消息模板内容替换参数-多媒体类型 */
  msg_media_id_param_map?: unknown
  /** 消息接收人 userId 列表 （不设置任何接收人则全部可见） */
  receiver_user_ids?: string[]
  /** 消息接收人 unionId 列表（不设置任何接收人则全部可见） */
  receiver_union_ids?: string[]
  /** 消息接收人手机号列表（不设置任何接收人则全部可见） */
  receiver_mobiles?: string[]
  /** @人的手机号列表 */
  at_mobiles?: string[]
  /** 是否@所有人 */
  is_at_all?: unknown
  /** 用于发送卡片的机器人编码，与场景群模板中的机器人编码保持一致 */
  robot_code?: string
  /** @人的员工id列表 */
  at_users?: string[]
  /** @人的unionId列表 */
  at_union_ids?: string[]
}

export interface OapiImChatScencegroupMessageSendV2Response {
  /** 成功 */
  succ?: unknown
  /** 统一错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 开发消息ID */
  open_msg_id?: string
}

export interface OapiImChatScenegroupTemplateCloseParams {
  /** 群主userid */
  owner_user_id: string
  /** 群模板ID */
  template_id: string
  /** 启用模式 */
  apply_mode?: unknown
  /** 加密cid,必填 */
  open_conversation_id: string
}

export interface OapiImChatScenegroupTemplateCloseResponse {
  /** 是否成功 */
  success?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
}

export interface OapiImChatScenegroupTemplateApplyParams {
  /** 群主userid */
  owner_user_id: string
  /** 启用模式 */
  apply_mode?: unknown
  /** 群模板ID */
  template_id: string
  /** 加密cid,必填 */
  open_conversation_id: string
}

export interface OapiImChatScenegroupTemplateApplyResponse {
  /** 是否成功 */
  success?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
}

export interface OapiImChatScencegroupInteractivecardCallbackRegisterParams {
  /** 回调地址 */
  callback_url: string
  /** 加密密钥用于校验来源 */
  api_secret?: string
  /** callback地址的路由Key，一个key仅可映射一个callbackUrl，不传值企业内部应用默认为orgId，企业三方应用默认为SuiteKey */
  callbackRouteKey?: string
  /** 是否强制覆盖更新 */
  forceUpdate?: unknown
}

export interface OapiImChatScencegroupInteractivecardCallbackRegisterResponse {
  /** 业务返回结果 */
  result?: {
    apiSecret?: string
    callbackUrl?: string
  }
  /** 成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiImChatScenegroupCreateParams {
  /** 群主userid */
  owner_user_id: string
  /** 群成员useridlist */
  user_ids?: string[]
  /** 建群去重的业务id */
  uuid?: string
  /** 群头像mediaId */
  icon?: string
  /** @all 权限，0-默认，所有人，1-仅群主可@all */
  mention_all_authority?: unknown
  /** 新成员是否可查看聊天历史消息，0-默认，否，1-是 */
  show_history_type?: unknown
  /** 入群验证，0：不入群验证（默认） 1：入群验证 */
  validation_type?: unknown
  /** 群可搜索，0-默认，不可搜索，1-可搜索 */
  searchable?: unknown
  /** 群禁言，0-默认，不禁言，1-全员禁言 */
  chat_banned_type?: unknown
  /** 管理类型，0-默认，所有人可管理，1-仅群主可管理 */
  management_type?: unknown
  /** 群名称 */
  title: string
  /** 群模板id */
  template_id: string
  /** 群管理员useridlist */
  subadmin_ids?: string[]
  /** 仅群主和管理员可在群内发DING  0-不开启，1-开启 */
  only_admin_can_ding?: unknown
  /** 群会议 若开启，群内任意成员可发起视频和语音会议 0-不开启，1-开启 */
  all_members_can_create_mcs_conf?: unknown
  /** 群日历 若开启，群内容非好友/同事的成员可相互发起钉钉日程 0-不开启，1-开启 */
  all_members_can_create_calendar?: unknown
  /** 禁止发送群邮件 若开启，群内成员不可再对本群发送群邮件 0-不开启，1-开启 */
  group_email_disabled?: unknown
  /** 仅群主和管理员可置顶群消息 0-不开启，1-开启 */
  only_admin_can_set_msg_top?: unknown
  /** 禁止群成员私聊 若开启，普通群成员之间不能够加好友、单聊，且部分功能使用受限（管理员与非管理员之间不受影响）0-不开启，1-开启 */
  add_friend_forbidden?: unknown
  /** 群直播 若开启，群内任意成员可发起群直播 0-不开启，1-开启 */
  group_live_switch?: unknown
  /** 禁止非管理员向管理员发起单聊 若开启，非管理员不能向管理员发起单聊 0-不开启，1-开启 */
  members_to_admin_chat?: unknown
}

export interface OapiImChatScenegroupCreateResponse {
  /** 返回结果 */
  result?: {
    open_conversation_id?: string
    chat_id?: string
  }
  /** 是否成功 */
  success?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
}

export interface OapiImChatScenegroupMemberAddParams {
  /** 开放群id */
  open_conversation_id: string
  /** 成员userid */
  user_ids?: string[]
  /** 客户联系人staffIds */
  contact_staff_ids?: string[]
}

export interface OapiImChatScenegroupMemberAddResponse {
  /** 是否成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiImChatScenegroupMemberGetParams {
  /** 分页游标 */
  cursor: string
  /** 分页的pagesize */
  size: unknown
  /** 开放群id */
  open_conversation_id: string
}

export interface OapiImChatScenegroupMemberGetResponse {
  /** 返回结果 */
  result?: {
    member_user_ids?: number
    next_cursor?: string
    has_more?: number
    member_contact_staff_ids?: number
    union_ids?: number
    staff_id_nick_map?: number
    union_id_nick_map?: number
  }
  /** 请求是否成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiImChatScenegroupUpdateParams {
  /** 群主userid */
  owner_user_id?: string
  /** 群头像mediaId */
  icon?: string
  /** @all 权限，0-默认，所有人，1-仅群主可@all */
  mention_all_authority?: unknown
  /** 新成员是否可查看聊天历史消息，0-默认，否，1-是 */
  show_history_type?: unknown
  /** 入群验证，0：不入群验证（默认） 1：入群验证 */
  validation_type?: unknown
  /** 群可搜索，0-默认，不可搜索，1-可搜索 */
  searchable?: unknown
  /** 群禁言，0-默认，不禁言，1-全员禁言 */
  chat_banned_type?: unknown
  /** 管理类型，0-默认，所有人可管理，1-仅群主可管理 */
  management_type?: unknown
  /** 群名称 */
  title?: string
  /** 群id */
  open_conversation_id: string
  /** 仅群主和管理员可在群内发DING  0-不开启，1-开启 */
  only_admin_can_ding?: unknown
  /** 群会议 若开启，群内任意成员可发起视频和语音会议 0-不开启，1-开启 */
  all_members_can_create_mcs_conf?: unknown
  /** 群日历 若开启，群内容非好友/同事的成员可相互发起钉钉日程 0-不开启，1-开启 */
  all_members_can_create_calendar?: unknown
  /** 禁止发送群邮件 若开启，群内成员不可再对本群发送群邮件 0-不开启，1-开启 */
  group_email_disabled?: unknown
  /** 仅群主和管理员可置顶群消息 0-不开启，1-开启 */
  only_admin_can_set_msg_top?: unknown
  /** 禁止群成员私聊 若开启，普通群成员之间不能够加好友、单聊，且部分功能使用受限（管理员与非管理员之间不受影响）0-不开启，1-开启 */
  add_friend_forbidden?: unknown
  /** 群直播 若开启，群内任意成员可发起群直播 0-不开启，1-开启 */
  group_live_switch?: unknown
  /** 禁止非管理员向管理员发起单聊 若开启，非管理员不能向管理员发起单聊 0-不开启，1-开启 */
  members_to_admin_chat?: unknown
  /** 自定义群插件是否需要群主和管理员审批0-不需要审批，1-需要审批 */
  plugin_customize_verify?: unknown
}

export interface OapiImChatScenegroupUpdateResponse {
  /** 返回结果 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiImChatScenegroupMemberDeleteParams {
  /** 开放群id */
  open_conversation_id: string
  /** 员工userid */
  user_ids?: string[]
  /** 客户联系人staffId */
  contact_staff_ids?: string[]
}

export interface OapiImChatScenegroupMemberDeleteResponse {
  /** 请求是否成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiImChatScenegroupGetParams {
  /** 群id */
  open_conversation_id: string
}

export interface OapiImChatScenegroupGetResponse {
  /** 返回结果 */
  result?: {
    icon?: string
    management_options?: number
    title?: string
    template_id?: string
    open_conversation_id?: string
    sub_admin_staff_ids?: number
    owner_staff_id?: string
    group_url?: string
    member_amount?: number
    scene_data?: string
  }
  /** 是否成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiRobotSendParams {
  /** 消息类型 */
  msgtype: string
  /** text类型 */
  text?: unknown
  /** 被@人的手机号 */
  at?: unknown
  /** 消息类型，此时固定为:link */
  link?: unknown
  /** 此消息类型为固定markdown */
  markdown?: unknown
  /** 此消息类型为固定actionCard */
  actionCard?: unknown
  /** 此消息类型为固定feedCard */
  feedCard?: unknown
}

export interface OapiRobotSendResponse {
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiAlitripBtripInvoiceSettingRuleParams {
  /** 入参 */
  request: unknown
}

export interface OapiAlitripBtripInvoiceSettingRuleResponse {
  /** 操作是否成功 */
  success?: unknown
  /** 返回值 */
  module?: {
    add_num?: number
    remove_num?: number
  }
  /** 状态码 */
  errcode?: unknown
  /** 结果信息 */
  errmsg?: string
}

export interface OapiAlitripBtripInvoiceSettingAddParams {
  /** 入参 */
  rq: unknown
}

export interface OapiAlitripBtripInvoiceSettingAddResponse {
  /** 是否成功 */
  success?: unknown
  /** 状态码 */
  errcode?: unknown
  /** 结果信息 */
  errmsg?: string
  /** 结果值 */
  module?: unknown
}

export interface OapiAlitripBtripProjectDeleteParams {
  /** 企业id */
  corpid: string
  /** 第三方项目ID */
  third_part_id: string
}

export interface OapiAlitripBtripProjectDeleteResponse {
  /** 错误码 */
  errcode?: unknown
  /** 操作结果 */
  success?: unknown
  /** 结果 */
  module?: unknown
  /** 异常信息 */
  errmsg?: string
}

export interface OapiAlitripBtripProjectModifyParams {
  /** 入参 */
  request: unknown
}

export interface OapiAlitripBtripProjectModifyResponse {
  /** 是否操作成功 */
  success?: unknown
  /** 是否操作成功 */
  module?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripProjectAddParams {
  /** 入参 */
  request: unknown
}

export interface OapiAlitripBtripProjectAddResponse {
  /** 是否操作成功 */
  success?: unknown
  /** 结果 */
  module?: string
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripInvoiceSettingDeleteParams {
  /** 入参 */
  request?: unknown
}

export interface OapiAlitripBtripInvoiceSettingDeleteResponse {
  /** 是否成功 */
  success?: unknown
  /** 值 */
  module?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripInvoiceSettingModifyParams {
  /** 入参 */
  request?: unknown
}

export interface OapiAlitripBtripInvoiceSettingModifyResponse {
  /** 是否成功 */
  success?: unknown
  /** 返回值 */
  module?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripPriceQueryParams {
  /** 请求入参 */
  req: unknown
}

export interface OapiAlitripBtripPriceQueryResponse {
  /** 接口返回 */
  result?: {
    success?: number
    module?: number
    errcode?: number
    errmsg?: string
  }
}

export interface OapiAlitripBtripTrainCitySuggestParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripTrainCitySuggestResponse {
  /** 结果对象 */
  result?: {
    cities?: number
  }
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiAlitripBtripMonthbillUrlGetParams {
  /** 请求对象 */
  request: unknown
}

export interface OapiAlitripBtripMonthbillUrlGetResponse {
  /** 成功标识 */
  success?: unknown
  /** 结果对象 */
  module?: {
    start_date?: string
    end_date?: string
    url?: string
  }[]
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripAddressGetParams {
  /** 请求对象 */
  request?: unknown
}

export interface OapiAlitripBtripAddressGetResponse {
  /** 成功标识 */
  success?: unknown
  /** 结果对象 */
  result?: {
    url?: string
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripApprovalModifyParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripApprovalModifyResponse {
  /** 成功标识 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 结果对象 */
  module?: {
    apply_id?: number
    thirdpart_apply_id?: string
  }
}

export interface OapiAlitripBtripFlightCitySuggestParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripFlightCitySuggestResponse {
  /** 结果对象 */
  result?: {
    cities?: number
    nearby?: number
  }
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiAlitripBtripVehicleOrderSearchParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripVehicleOrderSearchResponse {
  /** 返回码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 成功标识 */
  success?: unknown
  /** 订单列表 */
  vehicle_order_list?: {
    id?: number
    gmt_create?: string
    gmt_modified?: string
    passenger_name?: string
    corpid?: string
    corp_name?: string
    user_name?: string
    userid?: string
    dept_name?: string
    deptid?: string
    apply_show_id?: string
    apply_id?: number
    real_from_city_name?: string
    real_to_city_name?: string
    from_address?: string
    to_address?: string
    from_city_name?: string
    to_city_name?: string
    memo?: string
    order_status?: number
    car_level?: string
    car_info?: string
    estimate_price?: string
    publish_time?: string
    taken_time?: string
    driver_confirm_time?: string
    cancel_time?: string
    travel_distance?: string
    pay_time?: string
    service_type?: number
    business_category?: string
    cost_center_id?: number
    cost_center_number?: string
    cost_center_name?: string
    invoice_id?: number
    invoice_title?: string
    project_code?: string
    project_title?: string
    price_info_list?: number
    thirdpart_itinerary_id?: string
    user_affiliate_list?: number
    user_confirm?: number
    provider?: number
    real_from_address?: string
    real_to_address?: string
    thirdpart_apply_id?: string
    btrip_title?: string
    is_special?: number
    special_types?: number
    project_id?: number
    third_part_project_id?: string
  }[]
  /** 分页信息 */
  page_info?: {
    page?: number
    page_size?: number
    total_number?: number
  }
}

export interface OapiAlitripBtripCostCenterQueryParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripCostCenterQueryResponse {
  /** 成功标识 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 成本中心列表 */
  cost_center_list?: {
    id?: number
    corpid?: string
    title?: string
    number?: string
    thirdpart_id?: string
    scope?: number
    alipay_no?: string
    entity_list?: number
  }[]
}

export interface OapiAlitripBtripApprovalUpdateParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripApprovalUpdateResponse {
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiAlitripBtripCostCenterNewParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripCostCenterNewResponse {
  /** 成本中心对象 */
  result?: {
    id?: number
  }
  /** 成功标识 */
  success?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
}

export interface OapiAlitripBtripCostCenterModifyParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripCostCenterModifyResponse {
  /** 成功标识 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripCostCenterDeleteParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripCostCenterDeleteResponse {
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiAlitripBtripCostCenterEntitySetParams {
  /** 请求对象 */
  rq?: unknown
}

export interface OapiAlitripBtripCostCenterEntitySetResponse {
  /** 成本标识 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 结果对象 */
  result?: {
    add_num?: number
    remove_num?: number
    selected_user_num?: number
  }
}

export interface OapiAlitripBtripHotelOrderSearchParams {
  /** rq */
  rq: unknown
}

export interface OapiAlitripBtripHotelOrderSearchResponse {
  /** 成功标识 */
  success?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 酒店订单列表 */
  module?: {
    id?: number
    gmt_create?: string
    gmt_modified?: string
    corpid?: string
    corp_name?: string
    userid?: string
    user_name?: string
    deptid?: string
    dept_name?: string
    apply_id?: number
    contact_name?: string
    city?: string
    hotel_name?: string
    check_in?: string
    check_out?: string
    room_type?: string
    room_num?: number
    night?: number
    guest?: string
    order_type_desc?: string
    order_status_desc?: string
    cost_center?: number
    invoice?: number
    price_info_list?: number
    thirdpart_itinerary_id?: string
    order_status?: number
    order_type?: number
    user_affiliate_list?: number
    thirdpart_apply_id?: string
    btrip_title?: string
    project_id?: number
    project_code?: string
    project_title?: string
    thirdpart_Project_Id?: string
    hotel_support_vat_invoice_type?: number
  }[]
  /** 分页相关信息 */
  page_info?: {
    page?: number
    page_size?: number
    total_number?: number
  }
}

export interface OapiAlitripBtripTrainOrderSearchParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripTrainOrderSearchResponse {
  /** 成功标识 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** module */
  train_order_list?: {
    id?: number
    gmt_create?: string
    gmt_modified?: string
    corpid?: string
    corp_name?: string
    userid?: string
    user_name?: string
    deptid?: string
    dept_name?: string
    apply_id?: number
    contact_name?: string
    dep_station?: string
    arr_station?: string
    dep_time?: string
    arr_time?: string
    train_number?: string
    train_type?: string
    seat_type?: string
    run_time?: string
    ticket_no_12306?: string
    dep_city?: string
    arr_city?: string
    rider_name?: string
    ticket_count?: number
    status?: number
    invoice?: number
    cost_center?: number
    price_info_list?: number
    thirdpart_itinerary_id?: string
    user_affiliate_list?: number
    thirdpart_apply_id?: string
    btrip_title?: string
    project_id?: number
    project_code?: string
    project_title?: string
    third_part_project_id?: string
  }[]
  /** 分页相关信息 */
  page_info?: {
    page?: number
    page_size?: number
    total_number?: number
  }
}

export interface OapiAlitripBtripFlightOrderSearchParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripFlightOrderSearchResponse {
  /** 成功标识 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 机票列表 */
  flight_order_list?: {
    id?: number
    gmt_modified?: string
    userid?: string
    corp_name?: string
    corpid?: string
    gmt_create?: string
    user_name?: string
    deptid?: string
    dept_name?: string
    apply_id?: string
    contact_name?: string
    dep_city?: string
    arr_city?: string
    dep_date?: string
    ret_date?: string
    trip_type?: number
    passenger_count?: number
    cabin_class?: string
    status?: number
    discount?: string
    flight_no?: string
    passenger_name?: string
    dep_airport?: string
    arr_airport?: string
    invoice?: number
    cost_center?: number
    price_info_list?: number
    insureInfo_list?: number
    thirdpart_itinerary_id?: string
    user_affiliate_list?: number
    thirdpart_apply_id?: string
    btrip_title?: string
    project_id?: number
    project_code?: string
    project_title?: string
    third_part_project_id?: string
  }[]
  /** 分页相关信息 */
  page_info?: {
    page?: number
    page_size?: number
    total_number?: number
  }
}

export interface OapiAlitripBtripInvoiceSearchParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripInvoiceSearchResponse {
  /** 发票列表 */
  invoice?: {
    id?: number
    title?: string
    third_part_invoice_id?: string
  }[]
  /** 成功标识 */
  success?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
}

export interface OapiAlitripBtripCostCenterTransferParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripCostCenterTransferResponse {
  /** 成功标识 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiAlitripBtripApplyGetParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripApplyGetResponse {
  /** 审批单对象 */
  module?: {
    id?: number
    apply_show_id?: string
    gmt_create?: string
    gmt_modified?: string
    thirdpart_id?: string
    corpid?: string
    corp_name?: string
    userid?: string
    user_name?: string
    deptid?: string
    trip_day?: number
    dept_name?: string
    trip_cause?: string
    trip_title?: string
    status?: number
    status_desc?: string
    itinerary_list?: number
    traveler_list?: number
    approver_list?: number
    type?: number
    union_no?: string
    external_traveler_list?: number
  }
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiAlitripBtripApplySearchParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripApplySearchResponse {
  /** 审批单列表 */
  module?: {
    id?: number
    apply_show_id?: string
    gmt_create?: string
    gmt_modified?: string
    thirdpart_id?: string
    corpid?: string
    userid?: string
    deptid?: string
    corp_name?: string
    user_name?: string
    dept_name?: string
    trip_day?: number
    trip_cause?: string
    trip_title?: string
    status?: number
    status_desc?: string
    itinerary_list?: number
    traveler_list?: number
    approver_list?: number
    flow_code?: string
    type?: number
    union_no?: string
    external_traveler_list?: number
  }[]
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiAlitripBtripApprovalNewParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripApprovalNewResponse {
  /** 结果对象 */
  module?: {
    thirdpart_apply_id?: string
    apply_id?: number
  }
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiAlitripBtripCostCenterEntityDeleteParams {
  /** 请求对象 */
  rq: unknown
}

export interface OapiAlitripBtripCostCenterEntityDeleteResponse {
  /** 结果对象 */
  result?: {
    selected_user_num?: number
    remove_num?: number
  }
  /** 错误信息 */
  errmsg?: string
  /** 错误码 */
  errcode?: unknown
  /** 成功标识 */
  success?: unknown
}

export interface OapiWorkspaceAuditlogListParams {
  /** 操作日志起始时间，unix时间戳，单位ms */
  start_date: unknown
  /** 操作日志截止时间，unix时间戳，单位ms */
  end_date: unknown
  /** 操作列表长度，最大500 */
  page_size: unknown
  /** 操作记录生成时间，作为分页偏移量，分页查询时必传，unix时间戳，单位ms */
  load_more_gmt_create?: unknown
  /** 操作记录文件id，作为分页偏移量，与load_more_gmt_create一起使用，返回记录的biz_id为load_more_biz_id且gmt_create为load_more_gmt_create之后的操作列表，分页查询获取下一页时，传最后一条记录的biz_id和gmt_create。 */
  load_more_bizId?: unknown
}

export interface OapiWorkspaceAuditlogListResponse {
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
  /** 返回值 */
  result?: {
    log_list?: number
  }
}

export interface OapiEduCertGetParams {
  /** 学校人员id */
  userid: string
}

export interface OapiEduCertGetResponse {
  /** 请求是否成功 */
  success?: unknown
  /** 返回结果值 */
  result?: {
    current_cert_level?: number
    cert_datas?: number
    practical_task_data?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误消息 */
  errmsg?: string
}

export interface OapiEduUserListParams {
  /** 最大30条，最小1条 */
  page_size: unknown
  /** 页码，从1开始 */
  page_no: unknown
  /** 家校人员身份 */
  role: string
  /** 班级id */
  class_id: unknown
}

export interface OapiEduUserListResponse {
  /** 结果值 */
  result?: {
    has_more?: number
    details?: number
  }
  /** 是否成功 */
  success?: unknown
  /** 错误码，只有当success为false时才有效 */
  errcode?: unknown
  /** 错误信息，只有当success为false时才有效 */
  errmsg?: string
}

export interface OapiSmartdeviceDeviceQuerybyidParams {
  /** 设备查询对象 */
  device_query_vo: unknown
}

export interface OapiSmartdeviceDeviceQuerybyidResponse {
  /** 返回结果 */
  result?: {
    device_mac?: string
    corp_id?: string
    nick?: string
    device_id?: string
    device_name?: string
    pk?: string
    userid?: string
    ext?: string
    sn?: string
  }
  /** 是否成功 */
  success?: unknown
  /** 错误代码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartdeviceDeviceQuerylistParams {
  /** 列表查询对象 */
  page_query_vo: unknown
}

export interface OapiSmartdeviceDeviceQuerylistResponse {
  /** 返回结果 */
  result?: {
    next_cursor?: number
    has_more?: number
    list?: number
  }
  /** 是否成功 */
  success?: unknown
  /** 错误代码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartdeviceDeviceQueryParams {
  /** 设备查询对象 */
  device_query_vo?: unknown
}

export interface OapiSmartdeviceDeviceQueryResponse {
  /** 返回结果 */
  result?: {
    device_mac?: string
    corp_id?: string
    nick?: string
    device_id?: string
    device_name?: string
    pk?: string
    userid?: string
    ext?: string
    sn?: string
  }
  /** 是否成功 */
  success?: unknown
  /** 错误代码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartdeviceDeviceUpdatenickParams {
  /** 昵称修改参数 */
  device_nick_modify_vo?: unknown
}

export interface OapiSmartdeviceDeviceUpdatenickResponse {
  /** 是否成功 */
  success?: unknown
  /** 错误代码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartdeviceDeviceUnbindParams {
  /** 解绑参数 */
  device_unbind_vo?: unknown
}

export interface OapiSmartdeviceDeviceUnbindResponse {
  /** 是否成功 */
  success?: unknown
  /** 错误代码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiSmartdeviceExternalBindParams {
  /** 设备请求信息 */
  device_bind_req_vo: unknown
}

export interface OapiSmartdeviceExternalBindResponse {
  /** 返回结果 */
  result?: {
    device_id?: string
  }
  /** 是否成功 */
  success?: unknown
  /** 错误代码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataContactDeleteParams {
  /** 操作人用户ID */
  operator_userid: string
  /** 联系人实例ID */
  data_id: string
}

export interface OapiCrmObjectdataContactDeleteResponse {
  /** 删除结果 */
  result?: {
    instance_id?: string
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataCustomobjectCreateParams {
  /** 自定义对象数据 */
  instance: unknown
}

export interface OapiCrmObjectdataCustomobjectCreateResponse {
  /** 结果 */
  result?: {
    instance_id?: string
  }
  /** 执行结果 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataCustomobjectUpdateParams {
  /** 自定义对象数据 */
  instance: unknown
}

export interface OapiCrmObjectdataCustomobjectUpdateResponse {
  /** 结果 */
  result?: {
    instance_id?: string
  }
  /** 执行结果 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataListParams {
  /** 操作人用户ID */
  current_operator_userid?: string
  /** 数据ID列表 */
  data_id_list: string[]
  /** 表单名称 */
  name: string
}

export interface OapiCrmObjectdataListResponse {
  /** 实例数据 */
  result_list?: {
    creator_nick?: string
    gmt_modified?: string
    creator_userid?: string
    instance_id?: string
    data?: number
    extend_data?: number
    gmt_create?: string
    object_type?: string
    permission?: number
    proc_out_result?: string
    proc_inst_status?: string
  }[]
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataQueryParams {
  /** 用户ID */
  current_operator_userid?: string
  /** 分页游标 */
  cursor?: string
  /** 分页大小 */
  page_size: unknown
  /** 表单code */
  name: string
  /** 查询条件 */
  query_dsl?: string
}

export interface OapiCrmObjectdataQueryResponse {
  /** 分页结果 */
  result?: {
    next_cursor?: string
    values?: number
    has_more?: number
    page_size?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectmetaDescribeParams {
  /** 目标名称 */
  name: string
}

export interface OapiCrmObjectmetaDescribeResponse {
  /** result */
  result?: {
    name?: string
    customized?: number
    fields?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataContactQueryParams {
  /** 用户ID */
  current_operator_userid?: string
  /** 分页游标 */
  cursor?: string
  /** 分页大小 */
  page_size: unknown
  /** 服务商组织 id，自建应用可以传入 */
  provider_corpid?: string
  /** 查询条件 */
  query_dsl?: string
}

export interface OapiCrmObjectdataContactQueryResponse {
  /** 分页结果 */
  result?: {
    next_cursor?: string
    values?: number
    has_more?: number
    page_size?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataFollowrecordListParams {
  /** 操作人用户ID */
  current_operator_userid?: string
  /** 数据ID列表 */
  data_id_list: string[]
}

export interface OapiCrmObjectdataFollowrecordListResponse {
  /** 实例数据 */
  result_list?: {
    creator_nick?: string
    gmt_modified?: string
    creator_userid?: string
    instance_id?: string
    data?: number
    extend_data?: number
    gmt_create?: string
    object_type?: string
    permission?: number
    proc_inst_status?: string
    proc_out_result?: string
  }[]
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataFollowrecordQueryParams {
  /** 用户ID */
  current_operator_userid?: string
  /** 分页游标 */
  cursor?: string
  /** 分页大小 */
  page_size: unknown
  /** 查询条件 */
  query_dsl?: string
}

export interface OapiCrmObjectdataFollowrecordQueryResponse {
  /** 分页结果 */
  result?: {
    next_cursor?: string
    values?: number
    has_more?: number
    page_size?: number
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectdataContactListParams {
  /** 操作人用户ID */
  current_operator_userid?: string
  /** 数据ID列表 */
  data_id_list: string[]
  /** 自建应用时传入定制服务商ID */
  provider_corpid?: string
}

export interface OapiCrmObjectdataContactListResponse {
  /** 实例数据 */
  result_list?: {
    creator_nick?: string
    gmt_modified?: string
    creator_userid?: string
    instance_id?: string
    data?: number
    extend_data?: number
    gmt_create?: string
    object_type?: string
    permission?: number
    proc_inst_status?: string
    proc_out_result?: string
  }[]
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectmetaContactDescribeResponse {
  /** result */
  result?: {
    name?: string
    customized?: number
    fields?: number
    status?: string
    code?: string
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCrmObjectmetaFollowrecordDescribeResponse {
  /** result */
  result?: {
    name?: string
    customized?: number
    fields?: number
    status?: string
    code?: string
  }
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiCspaceAddToSingleChatParams {
  /** 文件名(需包含含扩展名),需要utf-8 urlEncode */
  file_name?: string
  /** 调用钉盘上传文件接口得到的mediaid,需要utf-8 urlEncode */
  media_id?: string
  /** 文件发送者微应用的agentId */
  userid?: string
  /** 文件接收人的userid */
  agent_id?: string
}

export interface OapiCspaceAddToSingleChatResponse {
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiCspaceGrantCustomSpaceQuery {
  /** ISV调用时传入，授权访问指定微应用的自定义空间 */
  agent_id?: string
  /** 企业调用时传入，授权访问该domain的自定义空间 */
  domain?: string
  /** 权限类型，目前支持上传和下载，上传请传add，下载请传download */
  type?: string
  /** 企业用户userid */
  userid?: string
  /** 授权访问的路径，如授权访问所有文件传“/”，授权访问/doc文件夹传“/doc/” 需要utf-8 urlEncode */
  path?: string
  /** 授权访问的文件id列表，id之间用英文逗号隔开，如“fileId1,fileId2” */
  fileids?: string
  /** 权限有效时间，有效范围为0~3600秒，超出此范围或不传默认为30秒 */
  duration?: unknown
}

export interface OapiCspaceGrantCustomSpaceResponse {
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiCspaceGetCustomSpaceQuery {
  /** 企业调用时传入，需要为10个字节以内的字符串，仅可包含字母和数字，大小写不敏感 */
  domain?: string
  /** ISV调用时传入，微应用agentId */
  agent_id?: string
}

export interface OapiCspaceGetCustomSpaceResponse {
  /** spaceid */
  spaceid?: string
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiCspaceAddQuery {
  /** 微应用的agentId */
  agent_id?: string
  /** 如果是微应用，code值为微应用免登授权码,如果是服务窗应用，code值为服务窗免登授权码。code为临时授权码，只能消费一次，下次请求需要重新获取新的code。 */
  code?: string
  /** 调用钉盘上传文件接口得到的mediaid, 需要utf-8 urlEncode */
  media_id?: string
  /** 调用云盘选择控件后获取的用户钉盘空间ID */
  folder_id?: string
  /** 调用云盘选择控件后获取的用户钉盘文件夹ID */
  space_id?: string
  /** 上传文件的名称，不能包含非法字符，需要utf-8 urlEncode */
  name?: string
  /** 遇到同名文件是否覆盖，若不覆盖，则会自动重命名本次新增的文件，默认为false */
  overwrite?: unknown
}

export interface OapiCspaceAddResponse {
  /** dentry */
  dentry?: string
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiChatSubadminUpdateParams {
  /** 群会话id */
  chatid: string
  /** 群成员id */
  userids: string[]
  /** 设置2添加为管理员，设置3删除该管理员 */
  role: unknown
}

export interface OapiChatSubadminUpdateResponse {
  /** 是否调用成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiChatQrcodeGetParams {
  /** 会话id（逐步淘汰推荐使用openConversationId) */
  chatid?: string
  /** 分享二维码用户id */
  userid: string
  /** 开放群id（与会话id 二选一） */
  openConversationId?: string
}

export interface OapiChatQrcodeGetResponse {
  /** 返回入群的链接 */
  result?: string
  /** 是否调用成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiChatMemberFriendswitchUpdateParams {
  /** 会话Id */
  chatid: string
  /** true开启禁止开关，false关闭禁止开关 */
  is_prohibit: unknown
}

export interface OapiChatMemberFriendswitchUpdateResponse {
  /** 是否设置成功 */
  success?: unknown
  /** 错误码 */
  errcode?: unknown
  /** 错误信息 */
  errmsg?: string
}

export interface OapiChatUpdategroupnickParams {
  /** 用户userid */
  userid: string
  /** chatid */
  chatid: string
  /** 群昵称 */
  group_nick: string
}

export interface OapiChatUpdategroupnickResponse {
  /** dingOpenErrcode */
  errcode?: unknown
  /** errorMsg */
  errmsg?: string
  /** success */
  success?: unknown
}

export interface OapiChatUpdateParams {
  /** 群会话id */
  chatid?: string
  /** 群名称 */
  name?: string
  /** 群主的userId */
  owner?: string
  /** 群主类型，emp：企业员工，ext：外部联系人 */
  ownerType?: string
  /** 添加成员列表 */
  add_useridlist?: string[]
  /** 删除成员列表 */
  del_useridlist?: string[]
  /** 添加外部联系人成员列表 */
  add_extidlist?: string[]
  /** 删除外部联系人成员列表 */
  del_extidlist?: string[]
  /** 群头像mediaId */
  icon?: string
  /** 是否禁言 */
  isBan?: unknown
  /** 群可搜索，0-默认，不可搜索，1-可搜索 */
  searchable?: unknown
  /** 入群验证，0：不入群验证（默认） 1：入群验证 */
  validationType?: unknown
  /** @all 权限，0-默认，所有人，1-仅群主可@all */
  mentionAllAuthority?: unknown
  /** 管理类型，0-默认，所有人可管理，1-仅群主可管理 */
  managementType?: unknown
  /** 群禁言，0-默认，不禁言，1-全员禁言 */
  chatBannedType?: unknown
  /** 新成员可查看聊天历史 0否 1是 */
  showHistoryType?: unknown
}

export interface OapiChatUpdateResponse {
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiChatCreateParams {
  /** 群名称 */
  name?: string
  /** 群主的userId */
  owner?: string
  /** 群成员userId列表 */
  useridlist?: string[]
  /** 新成员可查看100条聊天历史消息的类型，1：可查看，默认或0：不可查看 */
  showHistoryType?: unknown
  /** 群可搜索，0-默认，不可搜索，1-可搜索 */
  searchable?: unknown
  /** 入群验证，0：不入群验证（默认） 1：入群验证 */
  validationType?: unknown
  /** @all 权限，0-默认，所有人，1-仅群主可@all */
  mentionAllAuthority?: unknown
  /** 管理类型，0-默认，所有人可管理，1-仅群主可管理 */
  managementType?: unknown
  /** 群禁言，0-默认，不禁言，1-全员禁言 */
  chatBannedType?: unknown
}

export interface OapiChatCreateResponse {
  /** conversationTag */
  conversationTag?: unknown
  /** openConversationId */
  openConversationId?: string
  /** chatid */
  chatid?: string
  /** errmsg */
  errmsg?: string
  /** errcode */
  errcode?: unknown
}

export interface OapiChatGetQuery {
  /** 群会话的id */
  chatid?: string
}

export interface OapiChatGetResponse {
  /** errcode */
  errcode?: unknown
  /** errmsg */
  errmsg?: string
  /** chat_info */
  chat_info?: {
    name?: string
    owner?: string
    useridlist?: number
    extidlist?: number
    agentidlist?: number
    conversationTag?: number
    chatBannedType?: number
    searchable?: number
    validationType?: number
    mentionAllAuthority?: number
    managementType?: number
    showHistoryType?: number
    icon?: string
    status?: number
  }
}

export interface OapiSmartbotMsgPushParams {
  /** 消息体，具体见文档 */
  msg: unknown
  /** 接收者的用户userid列表 */
  user_id_list?: string[]
  /** 接收者的会话chatid列表 */
  chat_id_list?: string[]
  /** 是否发送给企业全部用户，”true“则忽略用户列表和会话列表 */
  to_all_user?: unknown
}

export interface OapiSmartbotMsgPushResponse {
  /** 创建的异步发送任务id */
  task_id?: string
  /** 错误码 */
  errcode?: unknown
  /** errorMsg */
  errmsg?: string
}

// funcName: isOldApi
Internal.define({
  '/service/get_corp_token': { POST: { oapiServiceGetCorpToken: true } },
  '/sso/gettoken': { GET: { oapiSsoGettoken: true } },
  '/get_jsapi_ticket': { GET: { oapiGetJsapiTicket: true } },
  '/gettoken': { GET: { oapiGettoken: true } },
  '/v2/user/getuserinfo': { POST: { oapiV2UserGetuserinfo: true } },
  '/sns/getuserinfo_bycode': { POST: { oapiSnsGetuserinfoBycode: true } },
  '/sso/getuserinfo': { GET: { oapiSsoGetuserinfo: true } },
  '/service/get_auth_info': { POST: { oapiServiceGetAuthInfo: true } },
  '/v2/user/update': { POST: { oapiV2UserUpdate: true } },
  '/v2/user/create': { POST: { oapiV2UserCreate: true } },
  '/org/union/trunk/get': { POST: { oapiOrgUnionTrunkGet: true } },
  '/smartwork/hrm/roster/meta/get': {
    POST: { oapiSmartworkHrmRosterMetaGet: true },
  },
  '/smartwork/hrm/employee/v2/list': {
    POST: { oapiSmartworkHrmEmployeeV2List: true },
  },
  '/smartwork/hrm/employee/v2/update': {
    POST: { oapiSmartworkHrmEmployeeV2Update: true },
  },
  '/smartwork/hrm/employee/field/grouplist': {
    POST: { oapiSmartworkHrmEmployeeFieldGrouplist: true },
  },
  '/smartwork/hrm/employee/update': {
    POST: { oapiSmartworkHrmEmployeeUpdate: true },
  },
  '/smartwork/hrm/employee/queryonjob': {
    POST: { oapiSmartworkHrmEmployeeQueryonjob: true },
  },
  '/smartwork/hrm/employee/querypreentry': {
    POST: { oapiSmartworkHrmEmployeeQuerypreentry: true },
  },
  '/smartwork/hrm/employee/addpreentry': {
    POST: { oapiSmartworkHrmEmployeeAddpreentry: true },
  },
  '/smartwork/hrm/employee/list': {
    POST: { oapiSmartworkHrmEmployeeList: true },
  },
  '/report/template/getbyname': { POST: { oapiReportTemplateGetbyname: true } },
  '/report/create': { POST: { oapiReportCreate: true } },
  '/report/savecontent': { POST: { oapiReportSavecontent: true } },
  '/report/simplelist': { POST: { oapiReportSimplelist: true } },
  '/report/statistics/listbytype': {
    POST: { oapiReportStatisticsListbytype: true },
  },
  '/report/receiver/list': { POST: { oapiReportReceiverList: true } },
  '/report/comment/list': { POST: { oapiReportCommentList: true } },
  '/report/statistics': { POST: { oapiReportStatistics: true } },
  '/report/getunreadcount': { POST: { oapiReportGetunreadcount: true } },
  '/report/list': { POST: { oapiReportList: true } },
  '/report/template/listbyuserid': {
    POST: { oapiReportTemplateListbyuserid: true },
  },
  '/checkin/record/get': { POST: { oapiCheckinRecordGet: true } },
  '/checkin/record': { GET: { oapiCheckinRecord: true } },
  '/blackboard/category/list': { POST: { oapiBlackboardCategoryList: true } },
  '/blackboard/update': { POST: { oapiBlackboardUpdate: true } },
  '/blackboard/delete': { POST: { oapiBlackboardDelete: true } },
  '/blackboard/get': { POST: { oapiBlackboardGet: true } },
  '/blackboard/listids': { POST: { oapiBlackboardListids: true } },
  '/blackboard/create': { POST: { oapiBlackboardCreate: true } },
  '/blackboard/listtopten': { POST: { oapiBlackboardListtopten: true } },
  '/health/stepinfo/getuserstatus': {
    POST: { oapiHealthStepinfoGetuserstatus: true },
  },
  '/health/stepinfo/listbyuserid': {
    POST: { oapiHealthStepinfoListbyuserid: true },
  },
  '/health/stepinfo/list': { POST: { oapiHealthStepinfoList: true } },
  '/microapp/list_by_userid': { GET: { oapiMicroappListByUserid: true } },
  '/microapp/list': { POST: { oapiMicroappList: true } },
  '/microapp/delete': { POST: { oapiMicroappDelete: true } },
  '/microapp/set_visible_scopes': {
    POST: { oapiMicroappSetVisibleScopes: true },
  },
  '/microapp/visible_scopes': { POST: { oapiMicroappVisibleScopes: true } },
  '/asr/voice/translate': { POST: { oapiAsrVoiceTranslate: true } },
  '/ai/mt/translate': { POST: { oapiAiMtTranslate: true } },
  '/ocr/structured/recognize': { POST: { oapiOcrStructuredRecognize: true } },
  '/im/chat/scencegroup/message/send_v2': {
    POST: { oapiImChatScencegroupMessageSendV2: true },
  },
  '/im/chat/scenegroup/template/close': {
    POST: { oapiImChatScenegroupTemplateClose: true },
  },
  '/im/chat/scenegroup/template/apply': {
    POST: { oapiImChatScenegroupTemplateApply: true },
  },
  '/im/chat/scencegroup/interactivecard/callback/register': {
    POST: { oapiImChatScencegroupInteractivecardCallbackRegister: true },
  },
  '/im/chat/scenegroup/create': { POST: { oapiImChatScenegroupCreate: true } },
  '/im/chat/scenegroup/member/add': {
    POST: { oapiImChatScenegroupMemberAdd: true },
  },
  '/im/chat/scenegroup/member/get': {
    POST: { oapiImChatScenegroupMemberGet: true },
  },
  '/im/chat/scenegroup/update': { POST: { oapiImChatScenegroupUpdate: true } },
  '/im/chat/scenegroup/member/delete': {
    POST: { oapiImChatScenegroupMemberDelete: true },
  },
  '/im/chat/scenegroup/get': { POST: { oapiImChatScenegroupGet: true } },
  '/robot/send': { POST: { oapiRobotSend: true } },
  '/alitrip/btrip/invoice/setting/rule': {
    POST: { oapiAlitripBtripInvoiceSettingRule: true },
  },
  '/alitrip/btrip/invoice/setting/add': {
    POST: { oapiAlitripBtripInvoiceSettingAdd: true },
  },
  '/alitrip/btrip/project/delete': {
    POST: { oapiAlitripBtripProjectDelete: true },
  },
  '/alitrip/btrip/project/modify': {
    POST: { oapiAlitripBtripProjectModify: true },
  },
  '/alitrip/btrip/project/add': { POST: { oapiAlitripBtripProjectAdd: true } },
  '/alitrip/btrip/invoice/setting/delete': {
    POST: { oapiAlitripBtripInvoiceSettingDelete: true },
  },
  '/alitrip/btrip/invoice/setting/modify': {
    POST: { oapiAlitripBtripInvoiceSettingModify: true },
  },
  '/alitrip/btrip/price/query': { POST: { oapiAlitripBtripPriceQuery: true } },
  '/alitrip/btrip/train/city/suggest': {
    POST: { oapiAlitripBtripTrainCitySuggest: true },
  },
  '/alitrip/btrip/monthbill/url/get': {
    POST: { oapiAlitripBtripMonthbillUrlGet: true },
  },
  '/alitrip/btrip/address/get': { POST: { oapiAlitripBtripAddressGet: true } },
  '/alitrip/btrip/approval/modify': {
    POST: { oapiAlitripBtripApprovalModify: true },
  },
  '/alitrip/btrip/flight/city/suggest': {
    POST: { oapiAlitripBtripFlightCitySuggest: true },
  },
  '/alitrip/btrip/vehicle/order/search': {
    POST: { oapiAlitripBtripVehicleOrderSearch: true },
  },
  '/alitrip/btrip/cost/center/query': {
    POST: { oapiAlitripBtripCostCenterQuery: true },
  },
  '/alitrip/btrip/approval/update': {
    POST: { oapiAlitripBtripApprovalUpdate: true },
  },
  '/alitrip/btrip/cost/center/new': {
    POST: { oapiAlitripBtripCostCenterNew: true },
  },
  '/alitrip/btrip/cost/center/modify': {
    POST: { oapiAlitripBtripCostCenterModify: true },
  },
  '/alitrip/btrip/cost/center/delete': {
    POST: { oapiAlitripBtripCostCenterDelete: true },
  },
  '/alitrip/btrip/cost/center/entity/set': {
    POST: { oapiAlitripBtripCostCenterEntitySet: true },
  },
  '/alitrip/btrip/hotel/order/search': {
    POST: { oapiAlitripBtripHotelOrderSearch: true },
  },
  '/alitrip/btrip/train/order/search': {
    POST: { oapiAlitripBtripTrainOrderSearch: true },
  },
  '/alitrip/btrip/flight/order/search': {
    POST: { oapiAlitripBtripFlightOrderSearch: true },
  },
  '/alitrip/btrip/invoice/search': {
    POST: { oapiAlitripBtripInvoiceSearch: true },
  },
  '/alitrip/btrip/cost/center/transfer': {
    POST: { oapiAlitripBtripCostCenterTransfer: true },
  },
  '/alitrip/btrip/apply/get': { POST: { oapiAlitripBtripApplyGet: true } },
  '/alitrip/btrip/apply/search': {
    POST: { oapiAlitripBtripApplySearch: true },
  },
  '/alitrip/btrip/approval/new': {
    POST: { oapiAlitripBtripApprovalNew: true },
  },
  '/alitrip/btrip/cost/center/entity/delete': {
    POST: { oapiAlitripBtripCostCenterEntityDelete: true },
  },
  '/workspace/auditlog/list': { POST: { oapiWorkspaceAuditlogList: true } },
  '/edu/cert/get': { POST: { oapiEduCertGet: true } },
  '/edu/user/list': { POST: { oapiEduUserList: true } },
  '/smartdevice/device/querybyid': {
    POST: { oapiSmartdeviceDeviceQuerybyid: true },
  },
  '/smartdevice/device/querylist': {
    POST: { oapiSmartdeviceDeviceQuerylist: true },
  },
  '/smartdevice/device/query': { POST: { oapiSmartdeviceDeviceQuery: true } },
  '/smartdevice/device/updatenick': {
    POST: { oapiSmartdeviceDeviceUpdatenick: true },
  },
  '/smartdevice/device/unbind': { POST: { oapiSmartdeviceDeviceUnbind: true } },
  '/smartdevice/external/bind': { POST: { oapiSmartdeviceExternalBind: true } },
  '/crm/objectdata/contact/delete': {
    POST: { oapiCrmObjectdataContactDelete: true },
  },
  '/crm/objectdata/customobject/create': {
    POST: { oapiCrmObjectdataCustomobjectCreate: true },
  },
  '/crm/objectdata/customobject/update': {
    POST: { oapiCrmObjectdataCustomobjectUpdate: true },
  },
  '/crm/objectdata/list': { POST: { oapiCrmObjectdataList: true } },
  '/crm/objectdata/query': { POST: { oapiCrmObjectdataQuery: true } },
  '/crm/objectmeta/describe': { POST: { oapiCrmObjectmetaDescribe: true } },
  '/crm/objectdata/contact/query': {
    POST: { oapiCrmObjectdataContactQuery: true },
  },
  '/crm/objectdata/followrecord/list': {
    POST: { oapiCrmObjectdataFollowrecordList: true },
  },
  '/crm/objectdata/followrecord/query': {
    POST: { oapiCrmObjectdataFollowrecordQuery: true },
  },
  '/crm/objectdata/contact/list': {
    POST: { oapiCrmObjectdataContactList: true },
  },
  '/crm/objectmeta/contact/describe': {
    POST: { oapiCrmObjectmetaContactDescribe: true },
  },
  '/crm/objectmeta/followrecord/describe': {
    POST: { oapiCrmObjectmetaFollowrecordDescribe: true },
  },
  '/cspace/add_to_single_chat': { POST: { oapiCspaceAddToSingleChat: true } },
  '/cspace/grant_custom_space': { GET: { oapiCspaceGrantCustomSpace: true } },
  '/cspace/get_custom_space': { GET: { oapiCspaceGetCustomSpace: true } },
  '/cspace/add': { GET: { oapiCspaceAdd: true } },
  '/chat/subadmin/update': { POST: { oapiChatSubadminUpdate: true } },
  '/chat/qrcode/get': { POST: { oapiChatQrcodeGet: true } },
  '/chat/member/friendswitch/update': {
    POST: { oapiChatMemberFriendswitchUpdate: true },
  },
  '/chat/updategroupnick': { POST: { oapiChatUpdategroupnick: true } },
  '/chat/update': { POST: { oapiChatUpdate: true } },
  '/chat/create': { POST: { oapiChatCreate: true } },
  '/chat/get': { GET: { oapiChatGet: true } },
  '/smartbot/msg/push': { POST: { oapiSmartbotMsgPush: true } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 该接口用于获取企业授权凭证
     * @see https://open.dingtalk.com/document/isvapp/obtains-the-enterprise-authorized-credential
     */
    oapiServiceGetCorpToken(
      params: OapiServiceGetCorpTokenParams,
    ): Promise<OapiServiceGetCorpTokenResponse>
    /**
     * 获取应用后台免登的access_token
     * @see https://open.dingtalk.com/document/isvapp/obtain-the-ssotoken-for-micro-application-background-logon-free
     */
    oapiSsoGettoken(
      query: OapiSsoGettokenQuery,
    ): Promise<OapiSsoGettokenResponse>
    /**
     * 获取jsapi ticket
     * @see https://open.dingtalk.com/document/isvapp/obtain-jsapi_ticket
     */
    oapiGetJsapiTicket(): Promise<OapiGetJsapiTicketResponse>
    /**
     * 获取企业内部应用的access_token
     * @see https://open.dingtalk.com/document/orgapp/obtain-orgapp-token
     */
    oapiGettoken(query: OapiGettokenQuery): Promise<OapiGettokenResponse>
    /**
     * 通过免登码获取用户userid
     * @see https://open.dingtalk.com/document/isvapp/obtain-the-userid-of-a-user-by-using-the-log-free
     */
    oapiV2UserGetuserinfo(
      params: OapiV2UserGetuserinfoParams,
    ): Promise<OapiV2UserGetuserinfoResponse>
    /**
     * 该接口用于获取授权用户信息
     * @see https://open.dingtalk.com/document/isvapp-server/obtain-the-user-information-based-on-the-sns-temporary-authorization
     */
    oapiSnsGetuserinfoBycode(
      params: OapiSnsGetuserinfoBycodeParams,
    ): Promise<OapiSnsGetuserinfoBycodeResponse>
    /**
     * 获取应用管理后台免登的用户信息
     * @see https://open.dingtalk.com/document/isvapp/exchange-code-for-the-identity-information-of-a-microapplication-administrator
     */
    oapiSsoGetuserinfo(
      query: OapiSsoGetuserinfoQuery,
    ): Promise<OapiSsoGetuserinfoResponse>
    /**
     * 获取企业授权信息
     * @see https://open.dingtalk.com/document/isvapp/obtains-the-basic-information-of-an-enterprise
     */
    oapiServiceGetAuthInfo(
      params: OapiServiceGetAuthInfoParams,
    ): Promise<OapiServiceGetAuthInfoResponse>
    /**
     * 用户信息更新
     * @see https://open.dingtalk.com/document/orgapp/update-dedicated-accounts-information
     */
    oapiV2UserUpdate(
      params: OapiV2UserUpdateParams,
    ): Promise<OapiV2UserUpdateResponse>
    /**
     * 用户信息创建
     * @see https://open.dingtalk.com/document/orgapp/user-information-creation
     */
    oapiV2UserCreate(
      params: OapiV2UserCreateParams,
    ): Promise<OapiV2UserCreateResponse>
    /**
     * 获取主干组织列表
     * @see https://open.dingtalk.com/document/isvapp/obtain-backbone-organization-list
     */
    oapiOrgUnionTrunkGet(): Promise<OapiOrgUnionTrunkGetResponse>
    /**
     * 获取员工花名册的元数据定义（包括花名册分组、字段定义）
     * @see https://open.dingtalk.com/document/isvapp/intelligent-personnel-roster-metadata-query
     */
    oapiSmartworkHrmRosterMetaGet(
      params: OapiSmartworkHrmRosterMetaGetParams,
    ): Promise<OapiSmartworkHrmRosterMetaGetResponse>
    /**
     * 获取员工花名册指定字段的信息，支持明细分组字段
     * @see https://open.dingtalk.com/document/orgapp/intelligent-personnel-obtain-employee-roster-information
     */
    oapiSmartworkHrmEmployeeV2List(
      params: OapiSmartworkHrmEmployeeV2ListParams,
    ): Promise<OapiSmartworkHrmEmployeeV2ListResponse>
    /**
     * 智能人事更新员工档案信息,支持明细分组
     * @see https://open.dingtalk.com/document/isvapp/intelligent-personnel-update-employee-file-information
     */
    oapiSmartworkHrmEmployeeV2Update(
      params: OapiSmartworkHrmEmployeeV2UpdateParams,
    ): Promise<OapiSmartworkHrmEmployeeV2UpdateResponse>
    /**
     * 提供给ISV查询花名册的员工档案信息中有权限的字段列表
     * @see https://open.dingtalk.com/document/isvapp/get-roster-field-group-details
     */
    oapiSmartworkHrmEmployeeFieldGrouplist(
      params: OapiSmartworkHrmEmployeeFieldGrouplistParams,
    ): Promise<OapiSmartworkHrmEmployeeFieldGrouplistResponse>
    /**
     * 智能人事更新员工档案员工信息
     * @see https://open.dingtalk.com/document/isvapp-server/update-employee-roster
     */
    oapiSmartworkHrmEmployeeUpdate(
      params: OapiSmartworkHrmEmployeeUpdateParams,
    ): Promise<OapiSmartworkHrmEmployeeUpdateResponse>
    /**
     * 智能人事业务，提供企业/ISV按在职状态分页查询公司在职员工id列表
     * @see https://open.dingtalk.com/document/isvapp/intelligent-personnel-query-the-list-of-on-the-job-employees-of-the
     */
    oapiSmartworkHrmEmployeeQueryonjob(
      params: OapiSmartworkHrmEmployeeQueryonjobParams,
    ): Promise<OapiSmartworkHrmEmployeeQueryonjobResponse>
    /**
     * 智能人事业务，企业/ISV分页查询公司待入职员工id列表
     * @see https://open.dingtalk.com/document/isvapp/intelligent-personnel-query-the-list-of-employees-to-be-hired
     */
    oapiSmartworkHrmEmployeeQuerypreentry(
      params: OapiSmartworkHrmEmployeeQuerypreentryParams,
    ): Promise<OapiSmartworkHrmEmployeeQuerypreentryResponse>
    /**
     * 智能人事添加待入职员工信息
     * @see https://open.dingtalk.com/document/isvapp/add-employees-to-be-hired-through-intelligent-personnel
     */
    oapiSmartworkHrmEmployeeAddpreentry(
      params: OapiSmartworkHrmEmployeeAddpreentryParams,
    ): Promise<OapiSmartworkHrmEmployeeAddpreentryResponse>
    /**
     * 智能人事业务，企业/ISV根据员工id批量访问员工花名册信息
     * @see https://open.dingtalk.com/document/isvapp-server/obtaining-employee-roster-field-information
     */
    oapiSmartworkHrmEmployeeList(
      params: OapiSmartworkHrmEmployeeListParams,
    ): Promise<OapiSmartworkHrmEmployeeListResponse>
    /**
     * 企业可以根据模板名称获取模板详情
     * @see https://open.dingtalk.com/document/isvapp/query-template-details
     */
    oapiReportTemplateGetbyname(
      params: OapiReportTemplateGetbynameParams,
    ): Promise<OapiReportTemplateGetbynameResponse>
    /**
     * 提供企业员工创建日志的接口
     * @see https://open.dingtalk.com/document/isvapp/create-a-log
     */
    oapiReportCreate(
      params: OapiReportCreateParams,
    ): Promise<OapiReportCreateResponse>
    /**
     * 第三方系统会调用这个接口保存日志内容，后续在写日志页面再拉取此内容。
     * @see https://open.dingtalk.com/document/isvapp/save-custom-log-content
     */
    oapiReportSavecontent(
      params: OapiReportSavecontentParams,
    ): Promise<OapiReportSavecontentResponse>
    /**
     * 企业可以根据员工userid或者日志模板名称，分页获取员工一段时间范围内在【日志】微应用发送的日志概要信息
     * @see https://open.dingtalk.com/document/orgapp/view-log-summary-data
     */
    oapiReportSimplelist(
      params: OapiReportSimplelistParams,
    ): Promise<OapiReportSimplelistResponse>
    /**
     * 分页获取日志相关人员列表，包括已读人员列表、评论人员列表、点赞人员列表
     * @see https://open.dingtalk.com/document/orgapp/obtains-a-list-of-log-related-personnel-by-type
     */
    oapiReportStatisticsListbytype(
      params: OapiReportStatisticsListbytypeParams,
    ): Promise<OapiReportStatisticsListbytypeResponse>
    /**
     * 获取日志的分享人员列表
     * @see https://open.dingtalk.com/document/orgapp/queries-log-sharing-personnel
     */
    oapiReportReceiverList(
      params: OapiReportReceiverListParams,
    ): Promise<OapiReportReceiverListResponse>
    /**
     * 分页获取评论详情，包括评论人userid、评论内容、评论时间
     * @see https://open.dingtalk.com/document/orgapp/queries-log-comment-details
     */
    oapiReportCommentList(
      params: OapiReportCommentListParams,
    ): Promise<OapiReportCommentListResponse>
    /**
     * 获取日志统计数据
     * @see https://open.dingtalk.com/document/orgapp/query-log-statistics
     */
    oapiReportStatistics(
      params: OapiReportStatisticsParams,
    ): Promise<OapiReportStatisticsResponse>
    /**
     * 查询企业员工的日志未读数
     * @see https://open.dingtalk.com/document/orgapp/querying-the-employee-s-log-is-not-reading
     */
    oapiReportGetunreadcount(
      params: OapiReportGetunreadcountParams,
    ): Promise<OapiReportGetunreadcountResponse>
    /**
     * 企业可以根据员工userid或者日志模板名称，分页获取员工一段时间范围内在【日志】微应用发送和修改的日志详细信息
     * @see https://open.dingtalk.com/document/isvapp/obtains-a-list-of-the-logs-that-are-sent-by
     */
    oapiReportList(
      params: OapiReportListParams,
    ): Promise<OapiReportListResponse>
    /**
     * 根据用户userId获取当前企业下可见的日志模板列表
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-list-of-visible-log-templates-based-on-the
     */
    oapiReportTemplateListbyuserid(
      params: OapiReportTemplateListbyuseridParams,
    ): Promise<OapiReportTemplateListbyuseridResponse>
    /**
     * 查询多个用户一段时间范围内的签到记录，只给企业调用，ISV无法调用。
     * @see https://open.dingtalk.com/document/isvapp/obtain-the-check-in-records-of-multiple-users
     */
    oapiCheckinRecordGet(
      params: OapiCheckinRecordGetParams,
    ): Promise<OapiCheckinRecordGetResponse>
    /**
     * 该接口用于获取部门用户签到记录
     * @see https://open.dingtalk.com/document/orgapp/get-check-in-data
     */
    oapiCheckinRecord(
      query: OapiCheckinRecordQuery,
    ): Promise<OapiCheckinRecordResponse>
    /**
     * 获取企业公告未删除分类列表
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-list-of-categories-not-deleted-for-enterprise-announcements
     */
    oapiBlackboardCategoryList(
      params: OapiBlackboardCategoryListParams,
    ): Promise<OapiBlackboardCategoryListResponse>
    /**
     * 根据公告id修改企业公告，只有以下身份可以修改：1、主管理员2、公告子管理员并且是待修改公告的创建者
     * @see https://open.dingtalk.com/document/orgapp/modify-the-announcement-according-to-the-announcement-id
     */
    oapiBlackboardUpdate(
      params: OapiBlackboardUpdateParams,
    ): Promise<OapiBlackboardUpdateResponse>
    /**
     * 根据公告id删除企业公告，只有以下身份可以删除1、主管理员2、公告子管理员并且是待删除公告创建者
     * @see https://open.dingtalk.com/document/orgapp/delete-announcements-based-on-the-announcement-id
     */
    oapiBlackboardDelete(
      params: OapiBlackboardDeleteParams,
    ): Promise<OapiBlackboardDeleteResponse>
    /**
     * 根据公告ID获取企业未删除公告详情，只有以下身份可以查看：
     * 1、保密公告
     * 1.1 公告管理员
     * 1.2 公告的接收人
     * 2、非保密公告
     * 2.1 企业内的人都可见
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-details-of-a-bulletin-that-is-not-deleted
     */
    oapiBlackboardGet(
      params: OapiBlackboardGetParams,
    ): Promise<OapiBlackboardGetResponse>
    /**
     * 通过接口可以获取到企业未删除的钉钉公告id列表
     * @see https://open.dingtalk.com/document/orgapp/obtains-the-id-list-of-announcements-that-are-not-deleted
     */
    oapiBlackboardListids(
      params: OapiBlackboardListidsParams,
    ): Promise<OapiBlackboardListidsResponse>
    /**
     * 管理员可以通过该接口创建钉钉企业公告
     * @see https://open.dingtalk.com/document/orgapp/create-an-enterprise-announcement
     */
    oapiBlackboardCreate(
      params: OapiBlackboardCreateParams,
    ): Promise<OapiBlackboardCreateResponse>
    /**
     * 列出用户当前有权限看到的10条公告，可用于在企业自定义工作首页进行公告轮播展示
     * @see https://open.dingtalk.com/document/orgapp/list-the-user-s-announcement-list
     */
    oapiBlackboardListtopten(
      params: OapiBlackboardListtoptenParams,
    ): Promise<OapiBlackboardListtoptenResponse>
    /**
     * 查询用户是否参与企业步数排行榜
     * @see https://open.dingtalk.com/document/isvapp/check-whether-dingtalk-is-enabled
     */
    oapiHealthStepinfoGetuserstatus(
      params: OapiHealthStepinfoGetuserstatusParams,
    ): Promise<OapiHealthStepinfoGetuserstatusResponse>
    /**
     * 批量获取钉钉运动数据
     * @see https://open.dingtalk.com/document/orgapp/queries-the-number-of-dingtalk-movement-steps-of-multiple-users
     */
    oapiHealthStepinfoListbyuserid(
      params: OapiHealthStepinfoListbyuseridParams,
    ): Promise<OapiHealthStepinfoListbyuseridResponse>
    /**
     * 查询企业用户或部门每天的钉钉运动步数，最多可以查询31天的数据
     * @see https://open.dingtalk.com/document/orgapp/queries-individual-or-department-dingtalk-exercise-steps
     */
    oapiHealthStepinfoList(
      params: OapiHealthStepinfoListParams,
    ): Promise<OapiHealthStepinfoListResponse>
    /**
     * 该接口用于获取员工可见的应用列表
     * @see https://open.dingtalk.com/document/orgapp-server/list-the-microapplications-visible-to-employees
     */
    oapiMicroappListByUserid(
      query: OapiMicroappListByUseridQuery,
    ): Promise<OapiMicroappListByUseridResponse>
    /**
     * 列出微应用
     * @see https://open.dingtalk.com/document/orgapp-server/manager-microapplications-api-permission
     */
    oapiMicroappList(): Promise<OapiMicroappListResponse>
    /**
     * 删除微应用
     * @see https://open.dingtalk.com/document/orgapp-server/delete-an-h5-microapplication
     */
    oapiMicroappDelete(
      params: OapiMicroappDeleteParams,
    ): Promise<OapiMicroappDeleteResponse>
    /**
     * 该接口用于设置应用的可见范围
     * @see https://open.dingtalk.com/document/orgapp-server/set-the-visible-range-of-the-microapplication
     */
    oapiMicroappSetVisibleScopes(
      params: OapiMicroappSetVisibleScopesParams,
    ): Promise<OapiMicroappSetVisibleScopesResponse>
    /**
     * 获取应用的可见范围
     * @see https://open.dingtalk.com/document/orgapp-server/gets-the-microapplication-visible-range-set-by-the-enterprise
     */
    oapiMicroappVisibleScopes(
      params: OapiMicroappVisibleScopesParams,
    ): Promise<OapiMicroappVisibleScopesResponse>
    /**
     * 用户使用音频 media_id 或 url 进行请求，服务通过回调的方式通知用户翻译结果
     * @see https://open.dingtalk.com/document/isvapp/asr-short-sentence-recognition
     */
    oapiAsrVoiceTranslate(
      params: OapiAsrVoiceTranslateParams,
    ): Promise<OapiAsrVoiceTranslateResponse>
    /**
     * 输入一段文本，得到翻译指定语言后的译文，支持多种语言的互译
     * @see https://open.dingtalk.com/document/isvapp/dingtalk-translation
     */
    oapiAiMtTranslate(
      params: OapiAiMtTranslateParams,
    ): Promise<OapiAiMtTranslateResponse>
    /**
     * OCR文字识别
     * @see https://open.dingtalk.com/document/isvapp/structured-image-recognition-api
     */
    oapiOcrStructuredRecognize(
      params: OapiOcrStructuredRecognizeParams,
    ): Promise<OapiOcrStructuredRecognizeResponse>
    /**
     * 场开放场景下，基于群模板定义的机器人向群内发消息
     * @see https://open.dingtalk.com/document/isvapp/send-group-helper-message
     */
    oapiImChatScencegroupMessageSendV2(
      params: OapiImChatScencegroupMessageSendV2Params,
    ): Promise<OapiImChatScencegroupMessageSendV2Response>
    /**
     * 根据定义的模板id，创建自定义场景群
     * @see https://open.dingtalk.com/document/isvapp/deactivate-group-template
     */
    oapiImChatScenegroupTemplateClose(
      params: OapiImChatScenegroupTemplateCloseParams,
    ): Promise<OapiImChatScenegroupTemplateCloseResponse>
    /**
     * 根据传入的模板id，启用群会话群模板功能
     * @see https://open.dingtalk.com/document/isvapp/enable-group-template
     */
    oapiImChatScenegroupTemplateApply(
      params: OapiImChatScenegroupTemplateApplyParams,
    ): Promise<OapiImChatScenegroupTemplateApplyResponse>
    /**
     * 注册互动卡片回调地址
     * @see https://open.dingtalk.com/document/orgapp/registration-card-interaction-callback-address-1
     */
    oapiImChatScencegroupInteractivecardCallbackRegister(
      params: OapiImChatScencegroupInteractivecardCallbackRegisterParams,
    ): Promise<OapiImChatScencegroupInteractivecardCallbackRegisterResponse>
    /**
     * 根据定义的模板id，创建自定义场景群
     * @see https://open.dingtalk.com/document/isvapp/create-group
     */
    oapiImChatScenegroupCreate(
      params: OapiImChatScenegroupCreateParams,
    ): Promise<OapiImChatScenegroupCreateResponse>
    /**
     * 新增场景群成员
     * @see https://open.dingtalk.com/document/isvapp/add-group-members-1
     */
    oapiImChatScenegroupMemberAdd(
      params: OapiImChatScenegroupMemberAddParams,
    ): Promise<OapiImChatScenegroupMemberAddResponse>
    /**
     * 获取场景群成员
     * @see https://open.dingtalk.com/document/group/obtains-scene-members
     */
    oapiImChatScenegroupMemberGet(
      params: OapiImChatScenegroupMemberGetParams,
    ): Promise<OapiImChatScenegroupMemberGetResponse>
    /**
     * 根据传入的群id，更新群相关内容
     * @see https://open.dingtalk.com/document/isvapp/update-group
     */
    oapiImChatScenegroupUpdate(
      params: OapiImChatScenegroupUpdateParams,
    ): Promise<OapiImChatScenegroupUpdateResponse>
    /**
     * 删除场景群成员
     * @see https://open.dingtalk.com/document/isvapp/delete-group-members
     */
    oapiImChatScenegroupMemberDelete(
      params: OapiImChatScenegroupMemberDeleteParams,
    ): Promise<OapiImChatScenegroupMemberDeleteResponse>
    /**
     * 根据群id，获取群的基本信息
     * @see https://open.dingtalk.com/document/isvapp/querying-group-information
     */
    oapiImChatScenegroupGet(
      params: OapiImChatScenegroupGetParams,
    ): Promise<OapiImChatScenegroupGetResponse>
    /**
     * 自定义机器人发送消息
     * @see https://open.dingtalk.com/document/isvapp/custom-bot-access-send-message
     */
    oapiRobotSend(params: OapiRobotSendParams): Promise<OapiRobotSendResponse>
    /**
     * 配置发票适用人群
     * @see https://open.dingtalk.com/document/isvapp/configure-invoice-users
     */
    oapiAlitripBtripInvoiceSettingRule(
      params: OapiAlitripBtripInvoiceSettingRuleParams,
    ): Promise<OapiAlitripBtripInvoiceSettingRuleResponse>
    /**
     * 新增发票配置
     * @see https://open.dingtalk.com/document/isvapp/new-invoice-configuration
     */
    oapiAlitripBtripInvoiceSettingAdd(
      params: OapiAlitripBtripInvoiceSettingAddParams,
    ): Promise<OapiAlitripBtripInvoiceSettingAddResponse>
    /**
     * 删除项目
     * @see https://open.dingtalk.com/document/isvapp/delete-a-project
     */
    oapiAlitripBtripProjectDelete(
      params: OapiAlitripBtripProjectDeleteParams,
    ): Promise<OapiAlitripBtripProjectDeleteResponse>
    /**
     * 项目变更
     * @see https://open.dingtalk.com/document/isvapp/project-change
     */
    oapiAlitripBtripProjectModify(
      params: OapiAlitripBtripProjectModifyParams,
    ): Promise<OapiAlitripBtripProjectModifyResponse>
    /**
     * 添加项目
     * @see https://open.dingtalk.com/document/isvapp/add-a-project
     */
    oapiAlitripBtripProjectAdd(
      params: OapiAlitripBtripProjectAddParams,
    ): Promise<OapiAlitripBtripProjectAddResponse>
    /**
     * 删除发票配置
     * @see https://open.dingtalk.com/document/isvapp/delete-invoice-configuration
     */
    oapiAlitripBtripInvoiceSettingDelete(
      params: OapiAlitripBtripInvoiceSettingDeleteParams,
    ): Promise<OapiAlitripBtripInvoiceSettingDeleteResponse>
    /**
     * 修改发票配置
     * @see https://open.dingtalk.com/document/isvapp/modify-invoice-configuration
     */
    oapiAlitripBtripInvoiceSettingModify(
      params: OapiAlitripBtripInvoiceSettingModifyParams,
    ): Promise<OapiAlitripBtripInvoiceSettingModifyResponse>
    /**
     * 查询预估价
     * @see https://open.dingtalk.com/document/isvapp/query-estimated-price
     */
    oapiAlitripBtripPriceQuery(
      params: OapiAlitripBtripPriceQueryParams,
    ): Promise<OapiAlitripBtripPriceQueryResponse>
    /**
     * 火车票城市搜索
     * @see https://open.dingtalk.com/document/isvapp/train-ticket-city-search
     */
    oapiAlitripBtripTrainCitySuggest(
      params: OapiAlitripBtripTrainCitySuggestParams,
    ): Promise<OapiAlitripBtripTrainCitySuggestResponse>
    /**
     * 获取月对账结算数据
     * @see https://open.dingtalk.com/document/isvapp/obtain-monthly-reconciliation-settlement-data
     */
    oapiAlitripBtripMonthbillUrlGet(
      params: OapiAlitripBtripMonthbillUrlGetParams,
    ): Promise<OapiAlitripBtripMonthbillUrlGetResponse>
    /**
     * 获取商旅访问地址
     * @see https://open.dingtalk.com/document/isvapp/obtain-business-travel-access-addresses
     */
    oapiAlitripBtripAddressGet(
      params: OapiAlitripBtripAddressGetParams,
    ): Promise<OapiAlitripBtripAddressGetResponse>
    /**
     * 修改申请单
     * @see https://open.dingtalk.com/document/isvapp/user-modify-approval-form
     */
    oapiAlitripBtripApprovalModify(
      params: OapiAlitripBtripApprovalModifyParams,
    ): Promise<OapiAlitripBtripApprovalModifyResponse>
    /**
     * 机票城市搜索
     * @see https://open.dingtalk.com/document/isvapp/air-ticket-city-search
     */
    oapiAlitripBtripFlightCitySuggest(
      params: OapiAlitripBtripFlightCitySuggestParams,
    ): Promise<OapiAlitripBtripFlightCitySuggestResponse>
    /**
     * 获取用车订单数据
     * @see https://open.dingtalk.com/document/isvapp/vehicle-order-query-interface
     */
    oapiAlitripBtripVehicleOrderSearch(
      params: OapiAlitripBtripVehicleOrderSearchParams,
    ): Promise<OapiAlitripBtripVehicleOrderSearchResponse>
    /**
     * 查询成本中心
     * @see https://open.dingtalk.com/document/isvapp/query-cost-center
     */
    oapiAlitripBtripCostCenterQuery(
      params: OapiAlitripBtripCostCenterQueryParams,
    ): Promise<OapiAlitripBtripCostCenterQueryResponse>
    /**
     * 更新申请单状态
     * @see https://open.dingtalk.com/document/isvapp/update-approval-form
     */
    oapiAlitripBtripApprovalUpdate(
      params: OapiAlitripBtripApprovalUpdateParams,
    ): Promise<OapiAlitripBtripApprovalUpdateResponse>
    /**
     * 新建成本中心
     * @see https://open.dingtalk.com/document/isvapp/new-cost-center
     */
    oapiAlitripBtripCostCenterNew(
      params: OapiAlitripBtripCostCenterNewParams,
    ): Promise<OapiAlitripBtripCostCenterNewResponse>
    /**
     * 修改成本中心基本信息
     * @see https://open.dingtalk.com/document/isvapp/modify-basic-cost-center-information
     */
    oapiAlitripBtripCostCenterModify(
      params: OapiAlitripBtripCostCenterModifyParams,
    ): Promise<OapiAlitripBtripCostCenterModifyResponse>
    /**
     * 删除成本中心
     * @see https://open.dingtalk.com/document/isvapp/delete-cost-center
     */
    oapiAlitripBtripCostCenterDelete(
      params: OapiAlitripBtripCostCenterDeleteParams,
    ): Promise<OapiAlitripBtripCostCenterDeleteResponse>
    /**
     * 设置成本中心人员信息
     * @see https://open.dingtalk.com/document/isvapp/set-up-cost-center-personnel-information
     */
    oapiAlitripBtripCostCenterEntitySet(
      params: OapiAlitripBtripCostCenterEntitySetParams,
    ): Promise<OapiAlitripBtripCostCenterEntitySetResponse>
    /**
     * 企业获取商旅酒店订单数据
     * @see https://open.dingtalk.com/document/isvapp/obtains-the-order-data-of-enterprise-hotels
     */
    oapiAlitripBtripHotelOrderSearch(
      params: OapiAlitripBtripHotelOrderSearchParams,
    ): Promise<OapiAlitripBtripHotelOrderSearchResponse>
    /**
     * 获取企业火车票订单数据
     * @see https://open.dingtalk.com/document/isvapp/obtains-the-enterprise-train-ticket-order-data
     */
    oapiAlitripBtripTrainOrderSearch(
      params: OapiAlitripBtripTrainOrderSearchParams,
    ): Promise<OapiAlitripBtripTrainOrderSearchResponse>
    /**
     * 获取企业机票订单数据
     * @see https://open.dingtalk.com/document/isvapp/obtains-enterprise-ticket-order-data
     */
    oapiAlitripBtripFlightOrderSearch(
      params: OapiAlitripBtripFlightOrderSearchParams,
    ): Promise<OapiAlitripBtripFlightOrderSearchResponse>
    /**
     * 查询可用发票列表
     * @see https://open.dingtalk.com/document/isvapp/query-available-invoices
     */
    oapiAlitripBtripInvoiceSearch(
      params: OapiAlitripBtripInvoiceSearchParams,
    ): Promise<OapiAlitripBtripInvoiceSearchResponse>
    /**
     * 商旅成本中心转换为外部成本中心
     * @see https://open.dingtalk.com/document/isvapp/business-travel-cost-center-converted-to-external-cost-center
     */
    oapiAlitripBtripCostCenterTransfer(
      params: OapiAlitripBtripCostCenterTransferParams,
    ): Promise<OapiAlitripBtripCostCenterTransferResponse>
    /**
     * 获取申请单详情
     * @see https://open.dingtalk.com/document/isvapp/obtains-the-detailed-data-of-a-single-request
     */
    oapiAlitripBtripApplyGet(
      params: OapiAlitripBtripApplyGetParams,
    ): Promise<OapiAlitripBtripApplyGetResponse>
    /**
     * 获取申请单列表
     * @see https://open.dingtalk.com/document/isvapp/search-enterprise-approval-form-data
     */
    oapiAlitripBtripApplySearch(
      params: OapiAlitripBtripApplySearchParams,
    ): Promise<OapiAlitripBtripApplySearchResponse>
    /**
     * 用户新建审批单
     * @see https://open.dingtalk.com/document/isvapp/user-new-approval-form
     */
    oapiAlitripBtripApprovalNew(
      params: OapiAlitripBtripApprovalNewParams,
    ): Promise<OapiAlitripBtripApprovalNewResponse>
    /**
     * 删除成本中心人员信息
     * @see https://open.dingtalk.com/document/isvapp/delete-cost-center-personnel-information
     */
    oapiAlitripBtripCostCenterEntityDelete(
      params: OapiAlitripBtripCostCenterEntityDeleteParams,
    ): Promise<OapiAlitripBtripCostCenterEntityDeleteResponse>
    /**
     * 获取钉钉项目空间任务中文件的操作日志列表
     * @see https://open.dingtalk.com/document/orgapp/query-file-operation-logs-of-a-project
     */
    oapiWorkspaceAuditlogList(
      params: OapiWorkspaceAuditlogListParams,
    ): Promise<OapiWorkspaceAuditlogListResponse>
    /**
     * 查询当前用户的数字化考试情况，是否获取了证书
     * @see https://open.dingtalk.com/document/isvapp/obtain-digital-certificate
     */
    oapiEduCertGet(
      params: OapiEduCertGetParams,
    ): Promise<OapiEduCertGetResponse>
    /**
     * 获取家校用户身份列表
     * @see https://open.dingtalk.com/document/isvapp/obtains-a-list-of-home-school-user-identities
     */
    oapiEduUserList(
      params: OapiEduUserListParams,
    ): Promise<OapiEduUserListResponse>
    /**
     * 查询企业下的智能硬件设备详情
     * @see https://open.dingtalk.com/document/isvapp/the-smart-hardware-can-query-details-based-on-the-device
     */
    oapiSmartdeviceDeviceQuerybyid(
      params: OapiSmartdeviceDeviceQuerybyidParams,
    ): Promise<OapiSmartdeviceDeviceQuerybyidResponse>
    /**
     * 查询企业下的智能硬件设备列表
     * @see https://open.dingtalk.com/document/isvapp/intelligent-hardware-list-query
     */
    oapiSmartdeviceDeviceQuerylist(
      params: OapiSmartdeviceDeviceQuerylistParams,
    ): Promise<OapiSmartdeviceDeviceQuerylistResponse>
    /**
     * 查询企业下的智能硬件设备详情
     * @see https://open.dingtalk.com/document/isvapp/intelligent-hardware-device-query
     */
    oapiSmartdeviceDeviceQuery(
      params: OapiSmartdeviceDeviceQueryParams,
    ): Promise<OapiSmartdeviceDeviceQueryResponse>
    /**
     * 解除企业下的智能硬件设备绑定
     * @see https://open.dingtalk.com/document/isvapp/intelligent-hardware-device-nickname-modification
     */
    oapiSmartdeviceDeviceUpdatenick(
      params: OapiSmartdeviceDeviceUpdatenickParams,
    ): Promise<OapiSmartdeviceDeviceUpdatenickResponse>
    /**
     * 解除企业下的智能硬件设备绑定
     * @see https://open.dingtalk.com/document/isvapp/unbind-a-smart-hardware-device
     */
    oapiSmartdeviceDeviceUnbind(
      params: OapiSmartdeviceDeviceUnbindParams,
    ): Promise<OapiSmartdeviceDeviceUnbindResponse>
    /**
     * 智能设备接入钉钉时，需要和组织建立绑定关系，此接口用于创建绑定关系。
     * @see https://open.dingtalk.com/document/isvapp/establishing-a-binding-relationship-between-intelligent-hardware-and-cloud
     */
    oapiSmartdeviceExternalBind(
      params: OapiSmartdeviceExternalBindParams,
    ): Promise<OapiSmartdeviceExternalBindResponse>
    /**
     * 删除当前组织CRM指定联系人的接口
     * @see https://open.dingtalk.com/document/orgapp/delete-crm-contact
     */
    oapiCrmObjectdataContactDelete(
      params: OapiCrmObjectdataContactDeleteParams,
    ): Promise<OapiCrmObjectdataContactDeleteResponse>
    /**
     * 创建CRM自定义对象数据
     * @see https://open.dingtalk.com/document/orgapp/dingtalk-paas-master-create-custom-crm-object-data
     */
    oapiCrmObjectdataCustomobjectCreate(
      params: OapiCrmObjectdataCustomobjectCreateParams,
    ): Promise<OapiCrmObjectdataCustomobjectCreateResponse>
    /**
     * 钉钉PaaS主数据-更新CRM自定义对象数据
     * @see https://open.dingtalk.com/document/orgapp/crm-master-data-opens-interface-for-updating-custom-object-data
     */
    oapiCrmObjectdataCustomobjectUpdate(
      params: OapiCrmObjectdataCustomobjectUpdateParams,
    ): Promise<OapiCrmObjectdataCustomobjectUpdateResponse>
    /**
     * 根据实例ID列表批量获取CRM自定义表单数据，最多可一次获取200条数据
     * @see https://open.dingtalk.com/document/orgapp/retrieves-custom-crm-forms-from-the-id-list
     */
    oapiCrmObjectdataList(
      params: OapiCrmObjectdataListParams,
    ): Promise<OapiCrmObjectdataListResponse>
    /**
     * 获取CRM自定义对象数据，最多可一次获取200条数据
     * @see https://open.dingtalk.com/document/orgapp/retrieve-custom-crm-object-data
     */
    oapiCrmObjectdataQuery(
      params: OapiCrmObjectdataQueryParams,
    ): Promise<OapiCrmObjectdataQueryResponse>
    /**
     * 获取自定义对象的元数据
     * @see https://open.dingtalk.com/document/orgapp/get-metadata-description-of-crm-custom-object
     */
    oapiCrmObjectmetaDescribe(
      params: OapiCrmObjectmetaDescribeParams,
    ): Promise<OapiCrmObjectmetaDescribeResponse>
    /**
     * 根据指定查询条件批量获取联系人数据，最多可一次获取200条数据
     * @see https://open.dingtalk.com/document/isvapp/query-contact-data
     */
    oapiCrmObjectdataContactQuery(
      params: OapiCrmObjectdataContactQueryParams,
    ): Promise<OapiCrmObjectdataContactQueryResponse>
    /**
     * 根据实例ID列表批量获取跟进记录数据，最多可一次获取200条数据
     * @see https://open.dingtalk.com/document/orgapp/dingtalk-the-primary-data-of-apsara-stack-agility-paas-allows-you
     */
    oapiCrmObjectdataFollowrecordList(
      params: OapiCrmObjectdataFollowrecordListParams,
    ): Promise<OapiCrmObjectdataFollowrecordListResponse>
    /**
     * 根据指定查询条件批量获取跟进记录数据，最多可一次获取200条数据
     * @see https://open.dingtalk.com/document/orgapp/query-and-dingtalk-data-of-track-records-in-apsara-stack
     */
    oapiCrmObjectdataFollowrecordQuery(
      params: OapiCrmObjectdataFollowrecordQueryParams,
    ): Promise<OapiCrmObjectdataFollowrecordQueryResponse>
    /**
     * 按照ID列表批量获取联系人数据
     * @see https://open.dingtalk.com/document/orgapp/retrieves-contact-data-in-batches-based-on-the-id-list
     */
    oapiCrmObjectdataContactList(
      params: OapiCrmObjectdataContactListParams,
    ): Promise<OapiCrmObjectdataContactListResponse>
    /**
     * 获取联系人对象的元数据
     * @see https://open.dingtalk.com/document/isvapp/get-metadata-for-a-contact
     */
    oapiCrmObjectmetaContactDescribe(): Promise<OapiCrmObjectmetaContactDescribeResponse>
    /**
     * 获取跟进记录对象的元数据
     * @see https://open.dingtalk.com/document/isvapp/get-the-metadata-of-the-follow-up-record-object
     */
    oapiCrmObjectmetaFollowrecordDescribe(): Promise<OapiCrmObjectmetaFollowrecordDescribeResponse>
    /**
     * 发送文件给指定用户
     * @see https://open.dingtalk.com/document/isvapp-server/sends-a-file-to-a-specified-user
     */
    oapiCspaceAddToSingleChat(
      params: OapiCspaceAddToSingleChatParams,
    ): Promise<OapiCspaceAddToSingleChatResponse>
    /**
     * 授权用户访问企业下的自定义空间
     * @see https://open.dingtalk.com/document/isvapp-server/authorize-a-user-to-access-a-custom-workspace-of-an
     */
    oapiCspaceGrantCustomSpace(
      query: OapiCspaceGrantCustomSpaceQuery,
    ): Promise<OapiCspaceGrantCustomSpaceResponse>
    /**
     * 获取企业下的自定义空间
     * @see https://open.dingtalk.com/document/isvapp-server/obtain-user-space-under-the-enterprise
     */
    oapiCspaceGetCustomSpace(
      query: OapiCspaceGetCustomSpaceQuery,
    ): Promise<OapiCspaceGetCustomSpaceResponse>
    /**
     * 新增文件到用户钉盘
     * @see https://open.dingtalk.com/document/isvapp-server/add-file-to-user-s-dingtalk-disk
     */
    oapiCspaceAdd(query: OapiCspaceAddQuery): Promise<OapiCspaceAddResponse>
    /**
     * 增加和删除群管理员接口
     * @see https://open.dingtalk.com/document/orgapp/set-chat-admin
     */
    oapiChatSubadminUpdate(
      params: OapiChatSubadminUpdateParams,
    ): Promise<OapiChatSubadminUpdateResponse>
    /**
     * 获取群入群二维码邀请链接
     * @see https://open.dingtalk.com/document/orgapp/obtain-a-qr-code-link
     */
    oapiChatQrcodeGet(
      params: OapiChatQrcodeGetParams,
    ): Promise<OapiChatQrcodeGetResponse>
    /**
     * 设置群成员之间是否可以添加好友和私聊的开关
     * @see https://open.dingtalk.com/document/orgapp/set-private-chat
     */
    oapiChatMemberFriendswitchUpdate(
      params: OapiChatMemberFriendswitchUpdateParams,
    ): Promise<OapiChatMemberFriendswitchUpdateResponse>
    /**
     * 设置群成员的群昵称
     * @see https://open.dingtalk.com/document/orgapp/set-a-group-nickname
     */
    oapiChatUpdategroupnick(
      params: OapiChatUpdategroupnickParams,
    ): Promise<OapiChatUpdategroupnickResponse>
    /**
     * 修改群会话
     * @see https://open.dingtalk.com/document/orgapp/modify-a-group-session
     */
    oapiChatUpdate(
      params: OapiChatUpdateParams,
    ): Promise<OapiChatUpdateResponse>
    /**
     * 该接口用于创建会话
     * @see https://open.dingtalk.com/document/orgapp/create-group-session
     */
    oapiChatCreate(
      params: OapiChatCreateParams,
    ): Promise<OapiChatCreateResponse>
    /**
     * 获取群会话
     * @see https://open.dingtalk.com/document/orgapp/obtain-a-group-session
     */
    oapiChatGet(query: OapiChatGetQuery): Promise<OapiChatGetResponse>
    /**
     * 通过工作助理机器人给企业员工发送消息
     * @see https://open.dingtalk.com/document/orgapp/the-message-pushing-interface-of-the-assistant
     */
    oapiSmartbotMsgPush(
      params: OapiSmartbotMsgPushParams,
    ): Promise<OapiSmartbotMsgPushResponse>
  }
}
