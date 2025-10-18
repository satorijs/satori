import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    admin: Admin.Methods
  }
}

export namespace Admin {
  export interface Methods {
    password: Password.Methods
    adminDeptStat: AdminDeptStat.Methods
    adminUserStat: AdminUserStat.Methods
    badge: Badge.Methods
    badgeImage: BadgeImage.Methods
    auditInfo: AuditInfo.Methods
  }

  export namespace Password {
    export interface Methods {
      /**
       * 重置用户的企业邮箱密码
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/password/reset
       */
      reset(body: ResetRequest, query?: ResetQuery): Promise<void>
    }

    export interface ResetRequest {
      /** 需要重置的密码参数，不少于8个字符，字母、数字和符号，至少三选二 */
      password: Lark.Password
      /** 待修改密码的用户ID，只针对邮箱登录凭证与企业邮箱(包括别名)相等的用户生效 */
      user_id: string
    }

    export interface ResetQuery {
      /** 用户ID类型 */
      user_id_type: 'open_id' | 'union_id' | 'user_id'
    }
  }

  export namespace AdminDeptStat {
    export interface Methods {
      /**
       * 获取部门维度的用户活跃和功能使用数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_dept_stat/list
       */
      list(query?: ListQuery): Paginated<Lark.AdminDeptStat>
    }

    export interface ListQuery extends Pagination {
      /** 部门ID类型 */
      department_id_type: 'department_id' | 'open_department_id'
      /** 起始日期（包含），格式是YYYY-mm-dd */
      start_date: string
      /** 终止日期（包含），格式是YYYY-mm-dd，起止日期之间相差不能超过91天（包含91天） */
      end_date: string
      /** 部门的 ID，取决于department_id_type，仅支持根部门及其下前4级子部门 */
      department_id: string
      /** 是否包含子部门，如果该值为false，则只查出本部门直属用户活跃和功能使用数据；如果该值为true，则查出该部门以及其子部门（子部门层级最多不超过根部门下的前4级）的用户活跃和功能使用数据 */
      contains_child_dept: boolean
      /** 跨域访问的geo */
      target_geo?: string
      /** 是否返回分产品版本数据 */
      with_product_version?: boolean
    }
  }

  export namespace AdminUserStat {
    export interface Methods {
      /**
       * 获取用户维度的用户活跃和功能使用数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_user_stat/list
       */
      list(query?: ListQuery): Paginated<Lark.AdminUserStat>
    }

    export interface ListQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 部门ID类型 */
      department_id_type?: 'department_id' | 'open_department_id'
      /** 起始日期（包含），格式是YYYY-mm-dd */
      start_date: string
      /** 终止日期（包含），格式是YYYY-mm-dd。起止日期之间相差不能超过31天（包含31天） */
      end_date: string
      /** 部门的 ID，取决于department_id_type */
      department_id?: string
      /** 用户的open_id，user_id或者union_id，取决于user_id_type */
      user_id?: string
      /** 跨域访问的geo */
      target_geo?: string
    }
  }

  export namespace Badge {
    export interface Methods {
      grant: Grant.Methods
      /**
       * 创建勋章
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 修改勋章信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/update
       */
      update(badge_id: string, body: UpdateRequest): Promise<UpdateResponse>
      /**
       * 获取勋章列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/list
       */
      list(query?: ListQuery): Paginated<Lark.Badge, 'badges'>
      /**
       * 获取勋章详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/get
       */
      get(badge_id: string): Promise<GetResponse>
    }

    export interface CreateRequest {
      /** 租户内唯一的勋章名称，最多30个字符。 */
      name: string
      /** 勋章的描述文案，最多100个字符。 */
      explanation?: string
      /** 企业勋章的详情图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
      detail_image: string
      /** 企业勋章的头像挂饰图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
      show_image: string
      /** 勋章的多语言名称，同name字段限制，最多30个字符。 */
      i18n_name?: Lark.I18n
      /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
      i18n_explanation?: Lark.I18n
    }

    export interface CreateResponse {
      /** 勋章的信息 */
      badge?: Lark.Badge
    }

    export interface UpdateRequest {
      /** 租户内唯一的勋章名称，最多30个字符。 */
      name: string
      /** 勋章的描述文案，最多100个字符。 */
      explanation?: string
      /** 企业勋章的详情图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
      detail_image: string
      /** 企业勋章的头像挂饰图Key。1.权限校验：非本租户上传的图片key，不能直接使用；2.时效校验：创建勋章，或者修改勋章图片key时，需使用1h内上传的图片key。 */
      show_image: string
      /** 勋章的多语言名称，同name字段限制，最多30个字符。 */
      i18n_name?: Lark.I18n
      /** 勋章的多语言描述文案，同explanation字段限制，最多100个字符。 */
      i18n_explanation?: Lark.I18n
    }

    export interface UpdateResponse {
      /** 勋章信息 */
      badge?: Lark.Badge
    }

    export interface ListQuery extends Pagination {
      /** 租户内唯一的勋章名称，精确匹配。 */
      name?: string
    }

    export interface GetResponse {
      /** 勋章信息 */
      badge?: Lark.Badge
    }

    export namespace Grant {
      export interface Methods {
        /**
         * 创建授予名单
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/create
         */
        create(badge_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 删除授予名单
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/delete
         */
        delete(badge_id: string, grant_id: string): Promise<void>
        /**
         * 修改授予名单
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/update
         */
        update(badge_id: string, grant_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
        /**
         * 获取授予名单列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/list
         */
        list(badge_id: string, query?: ListQuery): Paginated<Lark.Grant, 'grants'>
        /**
         * 获取授予名单详情
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/get
         */
        get(badge_id: string, grant_id: string, query?: GetQuery): Promise<GetResponse>
      }

      export const enum CreateRequestGrantType {
        /** 手动选择有效期 */
        Manual = 0,
        /** 匹配系统入职时间 */
        JoinTime = 1,
      }

      export interface CreateRequest {
        /** 授予名单名称，最多100个字符。 */
        name: string
        /** 勋章下唯一的授予事项 */
        grant_type: CreateRequestGrantType
        /** 授予名单的生效时间对应的时区，用于检查RuleDetail的时间戳的取值是否规范，取值范围为TZ database name */
        time_zone: string
        /** 规则详情 */
        rule_detail: Lark.RuleDetail
        /** 是否授予给全员。1.为false时，需要关联1~500个用户群体。2.为true时，不可关联用户、用户组、部门。 */
        is_grant_all: boolean
        /** 授予的用户ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
        user_ids?: string[]
        /** 授予的部门ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
        department_ids?: string[]
        /** 授予的用户组ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
        group_ids?: string[]
      }

      export interface CreateQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
        /** 此次调用中使用的部门ID的类型。 */
        department_id_type?: 'department_id' | 'open_department_id'
      }

      export interface CreateResponse {
        /** 授予名单的信息 */
        grant?: Lark.Grant
      }

      export const enum UpdateRequestGrantType {
        /** 手动选择有效期 */
        Manual = 0,
        /** 匹配系统入职时间 */
        JoinTime = 1,
      }

      export interface UpdateRequest {
        /** 授予名单名称，最多100个字符。 */
        name: string
        /** 勋章下唯一的授予事项 */
        grant_type: UpdateRequestGrantType
        /** 授予名单的生效时间对应的时区，用于检查RuleDetail的时间戳的取值是否规范，取值范围为TZ database name */
        time_zone: string
        /** 规则详情 */
        rule_detail: Lark.RuleDetail
        /** 是否授予给全员。1.为false时，需要关联1~500个用户群体。2.为true时，不可关联用户、用户组、部门。 */
        is_grant_all: boolean
        /** 授予的用户ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
        user_ids?: string[]
        /** 授予的部门ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
        department_ids?: string[]
        /** 授予的用户组ID列表，授予名单列表接口返回结果中不返回该字段，只在详情接口返回 */
        group_ids?: string[]
      }

      export interface UpdateQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
        /** 此次调用中使用的部门ID的类型。 */
        department_id_type?: 'department_id' | 'open_department_id'
      }

      export interface UpdateResponse {
        /** 授予名单 */
        grant?: Lark.Grant
      }

      export interface ListQuery extends Pagination {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
        /** 此次调用中使用的部门ID的类型。 */
        department_id_type?: 'department_id' | 'open_department_id'
        /** 授予名单名称，精确匹配。 */
        name?: string
      }

      export interface GetQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id'
        /** 此次调用中使用的部门ID的类型。 */
        department_id_type?: 'department_id' | 'open_department_id'
      }

      export interface GetResponse {
        /** 授予名单信息 */
        grant?: Lark.Grant
      }
    }
  }

  export namespace BadgeImage {
    export interface Methods {
      /**
       * 上传勋章图片
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge_image/create
       */
      create(form: CreateForm): Promise<CreateResponse>
    }

    export const enum CreateFormImageType {
      /** 勋章详情图 */
      Detail = 1,
      /** 勋章挂饰图 */
      Show = 2,
    }

    export interface CreateForm {
      /** 勋章图片的文件，仅支持 PNG 格式，320 x 320 像素，大小不超过 1024 KB。 */
      image_file: Blob
      /** 图片的类型 */
      image_type: CreateFormImageType
    }

    export interface CreateResponse {
      /** 图片的key */
      image_key?: string
    }
  }

  export namespace AuditInfo {
    export interface Methods {
      /**
       * 获取行为审计日志数据
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uQjM5YjL0ITO24CNykjN/audit_log/audit_data_get
       */
      list(query?: ListQuery): Paginated<Lark.AuditInfo>
    }

    export const enum ListQueryUserType {
      /** 互联网上的任何人 */
      All = 0,
      /** 组织内成员 */
      NormalUser = 1,
      /** 组织外成员 */
      ExternalUser = 2,
    }

    export interface ListQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 日志时间范围: 结束时间. 格式: 秒级时间戳. 默认值: 此刻 */
      latest?: number
      /** 日志时间范围: 起始时间. 格式: 秒级时间戳. 默认值:  30日前此刻 */
      oldest?: number
      /** 事件名称 */
      event_name?: string
      /** 过滤操作者: 操作者类型. 与 operator_value 配合使用 */
      operator_type?: 'user' | 'bot'
      /** 过滤操作者: 操作者ID. 与 operator_type 配合使用 */
      operator_value?: string
      /** 过滤模块 */
      event_module?: number
      /** 过滤用户类型. 仅当 operator_type=user 时生效 */
      user_type?: ListQueryUserType
      /** 过滤操作对象: 操作对象类型. 与object_value配合使用 */
      object_type?: number
      /** 过滤操作对象: 操作对象ID. 与object_type配合使用 */
      object_value?: string
      /** 增强过滤操作对象: 操作对象ID，支持云文档侧泛token过滤。会覆盖object_type和object_value查询条件 */
      ext_filter_object_by_ccm_token?: string
    }
  }
}

Internal.define({
  '/admin/v1/password/reset': {
    POST: 'admin.password.reset',
  },
  '/admin/v1/admin_dept_stats': {
    GET: { name: 'admin.adminDeptStat.list', pagination: { argIndex: 0 } },
  },
  '/admin/v1/admin_user_stats': {
    GET: { name: 'admin.adminUserStat.list', pagination: { argIndex: 0 } },
  },
  '/admin/v1/badges': {
    POST: 'admin.badge.create',
    GET: { name: 'admin.badge.list', pagination: { argIndex: 0, itemsKey: 'badges' } },
  },
  '/admin/v1/badges/{badge_id}': {
    PUT: 'admin.badge.update',
    GET: 'admin.badge.get',
  },
  '/admin/v1/badge_images': {
    POST: { name: 'admin.badgeImage.create', multipart: true },
  },
  '/admin/v1/badges/{badge_id}/grants': {
    POST: 'admin.badge.grant.create',
    GET: { name: 'admin.badge.grant.list', pagination: { argIndex: 1, itemsKey: 'grants' } },
  },
  '/admin/v1/badges/{badge_id}/grants/{grant_id}': {
    DELETE: 'admin.badge.grant.delete',
    PUT: 'admin.badge.grant.update',
    GET: 'admin.badge.grant.get',
  },
  '/admin/v1/audit_infos': {
    GET: { name: 'admin.auditInfo.list', pagination: { argIndex: 0 } },
  },
})
