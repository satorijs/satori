import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    corehr: Corehr.Methods
  }
}

export namespace Corehr {
  export interface Methods {
    customField: CustomField.Methods
    commonData: CommonData.Methods
    enum: Enum.Methods
    basicInfo: BasicInfo.Methods
    nationalIdType: NationalIdType.Methods
    employeeType: EmployeeType.Methods
    workingHoursType: WorkingHoursType.Methods
    employee: Employee.Methods
    person: Person.Methods
    file: File.Methods
    employment: Employment.Methods
    jobData: JobData.Methods
    employees: Employees.Methods
    defaultCostCenter: DefaultCostCenter.Methods
    costAllocation: CostAllocation.Methods
    department: Department.Methods
    location: Location.Methods
    company: Company.Methods
    costCenter: CostCenter.Methods
    customOrg: CustomOrg.Methods
    draft: Draft.Methods
    approvalGroups: ApprovalGroups.Methods
    jobFamily: JobFamily.Methods
    jobLevel: JobLevel.Methods
    jobGrade: JobGrade.Methods
    pathway: Pathway.Methods
    job: Job.Methods
    position: Position.Methods
    preHire: PreHire.Methods
    probation: Probation.Methods
    jobChange: JobChange.Methods
    transferType: TransferType.Methods
    transferReason: TransferReason.Methods
    offboarding: Offboarding.Methods
    signatureFile: SignatureFile.Methods
    signatureNode: SignatureNode.Methods
    signatureTemplate: SignatureTemplate.Methods
    signatureTemplateInfoWithThumbnail: SignatureTemplateInfoWithThumbnail.Methods
    contract: Contract.Methods
    workforcePlanDetailRow: WorkforcePlanDetailRow.Methods
    reportDetailRow: ReportDetailRow.Methods
    workforcePlan: WorkforcePlan.Methods
    workforcePlanDetail: WorkforcePlanDetail.Methods
    leaveGrantingRecord: LeaveGrantingRecord.Methods
    leave: Leave.Methods
    authorization: Authorization.Methods
    securityGroup: SecurityGroup.Methods
    bp: Bp.Methods
    assignedUser: AssignedUser.Methods
    process: Process.Methods
    processRevoke: ProcessRevoke.Methods
    processWithdraw: ProcessWithdraw.Methods
    approver: Approver.Methods
    compensationStandard: CompensationStandard.Methods
    subregion: Subregion.Methods
    subdivision: Subdivision.Methods
    countryRegion: CountryRegion.Methods
    currency: Currency.Methods
  }

  export namespace CustomField {
    export interface Methods {
      /**
       * 获取飞书人事对象列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/list_object_api_name
       */
      listObjectApiName(query?: Pagination): Paginated<Lark.Object>
      /**
       * 获取自定义字段列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/query
       */
      query(query?: QueryQuery): Promise<QueryResponse>
      /**
       * 获取字段详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param
       */
      getByParam(query?: GetByParamQuery): Promise<GetByParamResponse>
    }

    export interface QueryQuery {
      /**
       * 所属对象 apiname，支持一个或多个
       * 当前数量限制为 20 个
       */
      object_api_name_list: string[]
    }

    export interface QueryResponse {
      /** 自定义字段列表 */
      items?: Lark.CustomField[]
    }

    export interface GetByParamQuery {
      /** 所属对象 apiname */
      object_api_name: string
      /** 自定义字段 apiname */
      custom_api_name: string
    }

    export interface GetByParamResponse {
      /** 自定义字段详情 */
      data?: Lark.CustomField
    }
  }

  export namespace CommonData {
    export interface Methods {
      metaData: MetaData.Methods
      id: Id.Methods
    }

    export namespace MetaData {
      export interface Methods {
        /**
         * 增加字段枚举值选项
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/add_enum_option
         */
        addEnumOption(body: AddEnumOptionRequest, query?: AddEnumOptionQuery): Promise<AddEnumOptionResponse>
        /**
         * 修改字段枚举值选项
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/edit_enum_option
         */
        editEnumOption(body: EditEnumOptionRequest, query?: EditEnumOptionQuery): Promise<EditEnumOptionResponse>
      }

      export interface AddEnumOptionRequest {
        /** 所属对象 API name，可通过[获取飞书人事对象列表](https://open.feishu.cn/document/server-docs/corehr-v1/basic-infomation/custom_field/list_object_api_name)接口中返回的 `object_api_name` 字段获取 */
        object_api_name: string
        /** 枚举字段 API name，可通过[获取自定义字段列表](https://open.feishu.cn/document/server-docs/corehr-v1/basic-infomation/custom_field/query)接口中返回的 `custom_api_name` 字段获取 */
        enum_field_api_name: string
        /** 新增枚举选项列表 */
        enum_field_options: Lark.EnumFieldOption[]
      }

      export interface AddEnumOptionQuery {
        /** 根据 client_token 是否一致来判断是否为同一请求 */
        client_token?: string
      }

      export interface AddEnumOptionResponse {
        /** 枚举字段 API name */
        enum_field_api_name?: string
        /** 枚举全部选项列表 */
        enum_field_options?: Lark.EnumFieldOption[]
      }

      export interface EditEnumOptionRequest {
        /** 所属对象 API name，可通过[获取飞书人事对象列表](https://open.feishu.cn/document/server-docs/corehr-v1/basic-infomation/custom_field/list_object_api_name)接口中返回的 `object_api_name` 字段获取 */
        object_api_name: string
        /** 枚举字段 API name，可通过[获取自定义字段列表](https://open.feishu.cn/document/server-docs/corehr-v1/basic-infomation/custom_field/query)接口中返回的 `custom_api_name` 字段获取 */
        enum_field_api_name: string
        /** 枚举选项 */
        enum_field_option: Lark.EnumFieldOption
      }

      export interface EditEnumOptionQuery {
        /** 根据 client_token 是否一致来判断是否为同一请求 */
        client_token?: string
      }

      export interface EditEnumOptionResponse {
        /** 枚举字段 API name */
        enum_field_api_name?: string
        /** 枚举全部选项列表 */
        enum_field_options?: Lark.EnumFieldOption[]
      }
    }

    export namespace Id {
      export interface Methods {
        /**
         * ID 转换
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-id/convert
         */
        convert(body: ConvertRequest, query?: ConvertQuery): Promise<ConvertResponse>
      }

      export interface ConvertRequest {
        /** ID 列表（最多传入 100 个 ID，ID 长度限制 50 个字符） */
        ids: string[]
      }

      export const enum ConvertQueryIdTransformType {
        /** 飞书人事 -> 飞书通讯录 */
        CoreHR2Feishu = 1,
        /** 飞书通讯录 -> 飞书人事 */
        Feishu2CoreHR = 2,
        /** people admin -> 飞书人事 */
        Admin2Feishu = 3,
        /** people admin -> 飞书通讯录 */
        Admin2CoreHR = 4,
      }

      export interface ConvertQuery {
        /** ID 转换类型 */
        id_transform_type: ConvertQueryIdTransformType
        /** 要转换的ID类型 */
        id_type: 'user_id' | 'department_id' | 'job_level_id' | 'job_family_id' | 'employee_type_id'
        /** 用户 ID 类型 */
        feishu_user_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 此次调用中使用的部门 ID 类型 */
        feishu_department_id_type?: 'open_department_id' | 'department_id'
      }

      export interface ConvertResponse {
        /** ID 信息列表 */
        items?: Lark.IdInfo[]
      }
    }
  }

  export namespace Enum {
    export interface Methods {
      /**
       * 查询枚举信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/enum/search
       */
      search(body: SearchRequest): Promise<SearchResponse>
    }

    export interface SearchRequest {
      /** 枚举apiname列表 */
      enum_apiname_lists?: string[]
    }

    export interface SearchResponse {
      /** 查询的枚举信息 */
      enums?: Lark.Enums[]
    }
  }

  export namespace BasicInfo {
    export interface Methods {
      countryRegion: CountryRegion.Methods
      countryRegionSubdivision: CountryRegionSubdivision.Methods
      city: City.Methods
      district: District.Methods
      nationality: Nationality.Methods
      bank: Bank.Methods
      bankBranch: BankBranch.Methods
      currency: Currency.Methods
      timeZone: TimeZone.Methods
      language: Language.Methods
    }

    export namespace CountryRegion {
      export interface Methods {
        /**
         * 查询国家/地区信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.CountryRegion>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 国家/地区 ID 列表，可从[批量查询地点](https://open.feishu.cn/document/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.country_region_id`、[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.country_region_id` 等字段中获取 */
        country_region_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }

    export namespace CountryRegionSubdivision {
      export interface Methods {
        /**
         * 查询省份/主要行政区信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.CountryRegionSubdivision>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Effective = 1,
        /** 失效 */
        Expiration = 0,
      }

      export interface SearchRequest {
        /** 国家/地区 ID 列表，可通过【查询国家/地区信息】接口获取 */
        country_region_id_list?: string[]
        /** 省份/行政区 ID 列表 */
        country_region_subdivision_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }

    export namespace City {
      export interface Methods {
        /**
         * 查询城市信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.City>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 省份/主要行政区 ID 列表，可通过[查询省份/主要行政区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search)接口列举，或从[批量查询地点](https://open.feishu.cn/document/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.region_id`、[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.region_id` 等字段中获取 */
        country_region_subdivision_id_list?: string[]
        /** 城市 ID 列表，可从[批量查询地点](https://open.feishu.cn/document/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.city_id_v2`、[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.city_id_v2` 等字段中获取 */
        city_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }

    export namespace District {
      export interface Methods {
        /**
         * 查询区/县信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-district/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.District>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 所属城市 ID 列表，可通过[查询城市信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search)接口列举，或从[批量查询地点](https://open.feishu.cn/document/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.city_v2_id`、[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.city_v2_id` 等字段中获取 */
        city_id_list?: string[]
        /** 区/县 ID 列表，可从[批量查询地点](https://open.feishu.cn/document/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.district_id_v2`、[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.district_id_v2` 等字段中获取 */
        district_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }

    export namespace Nationality {
      export interface Methods {
        /**
         * 查询国籍信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-nationality/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.Nationality>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 国籍 ID 列表，可从[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)接口返回的 `person_info.nationality_id_v2` 等字段中获取 */
        nationality_id_list?: string[]
        /** 国家/地区 ID 列表，可通过[查询国家/地区信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口列举 */
        country_region_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }

    export namespace Bank {
      export interface Methods {
        /**
         * 查询银行信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.Bank>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Enabled = 1,
        /** 失效 */
        Disabled = 0,
      }

      export interface SearchRequest {
        /** 银行 ID 列表，可通过[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)、[批量查询员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_id_v2` 字段获取 */
        bank_id_list?: string[]
        /** 银行名称列表，支持对银行名称精确搜索 */
        bank_name_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
        /** 最早更新时间 */
        update_start_time?: string
        /** 最晚更新时间 */
        update_end_time?: string
      }
    }

    export namespace BankBranch {
      export interface Methods {
        /**
         * 查询支行信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank_branch/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.BankBranch>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 银行 ID 列表，可通过[查询银行信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search)列举，或从[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)、[批量查询员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_id_v2` 字段中获取 */
        bank_id_list?: string[]
        /** 支行 ID 列表，可通过[搜索员工信息](https://open.feishu.cn/document/server-docs/corehr-v1/employee/search)、[批量查询员工信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_branch_id_v2` 字段获取 */
        bank_branch_id_list?: string[]
        /** 支行名称列表，支持对支行名称精确搜索 */
        bank_branch_name_list?: string[]
        /** 金融分支机构编码（联行号）列表，支持对金融分支机构编码精确搜索 */
        code_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
        /** 最早更新时间 */
        update_start_time?: string
        /** 最晚更新时间 */
        update_end_time?: string
      }
    }

    export namespace Currency {
      export interface Methods {
        /**
         * 查询货币信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-currency/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.Currency>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 货币 ID 列表，可通过[批量查询薪资方案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list)、[批量查询员工薪资档案](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query)等接口返回的 `currency_id` 字段获取 */
        currency_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }

    export namespace TimeZone {
      export interface Methods {
        /**
         * 查询时区信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-time_zone/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.TimeZone>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 时区 ID 列表 */
        time_zone_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }

    export namespace Language {
      export interface Methods {
        /**
         * 查询语言信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-language/search
         */
        search(body: SearchRequest, query?: Pagination): Paginated<Lark.Language>
      }

      export const enum SearchRequestStatus {
        /** 生效 */
        Active = 1,
        /** 失效 */
        Inactive = 0,
      }

      export interface SearchRequest {
        /** 语言 ID 列表 */
        language_id_list?: string[]
        /** 状态列表 */
        status_list?: SearchRequestStatus[]
      }
    }
  }

  export namespace NationalIdType {
    export interface Methods {
      /**
       * 创建国家证件类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除国家证件类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/delete
       */
      delete(national_id_type_id: string): Promise<void>
      /**
       * 更新国家证件类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/patch
       */
      patch(national_id_type_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 查询单个国家证件类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/get
       */
      get(national_id_type_id: string): Promise<GetResponse>
      /**
       * 批量查询国家证件类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/list
       */
      list(query?: ListQuery): Paginated<Lark.NationalIdType>
    }

    export interface CreateRequest {
      /** 国家 / 地区 */
      country_region_id: string
      /** 名称 */
      name: Lark.I18n[]
      /** 启用 */
      active: boolean
      /** 校验规则 */
      validation_rule: string
      /** 校验规则描述 */
      validation_rule_description?: Lark.I18n[]
      /** 编码 */
      code: string
      /** 证件类型 */
      identification_type: Lark.Enum
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      national_id_type?: Lark.NationalIdType
    }

    export interface PatchRequest {
      /** 国家 / 地区 */
      country_region_id?: string
      /** 名称 */
      name?: Lark.I18n[]
      /** 启用 */
      active?: boolean
      /** 校验规则 */
      validation_rule?: string
      /** 校验规则描述 */
      validation_rule_description?: Lark.I18n[]
      /** 编码 */
      code?: string
      /** 证件类型 */
      identification_type?: Lark.Enum
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      national_id_type?: Lark.NationalIdType
    }

    export interface GetResponse {
      /** 国家证件类型信息 */
      national_id_type?: Lark.NationalIdType
    }

    export interface ListQuery extends Pagination {
      /** 证件类型 */
      identification_type?: string
      /** 证件类型编码 */
      code?: string
      /** 国家地区ID */
      country_region_id?: string
    }
  }

  export namespace EmployeeType {
    export interface Methods {
      /**
       * 创建人员类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除人员类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/delete
       */
      delete(employee_type_id: string): Promise<void>
      /**
       * 更新人员类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/patch
       */
      patch(employee_type_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 查询单个人员类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/get
       */
      get(employee_type_id: string): Promise<GetResponse>
      /**
       * 批量查询人员类型
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list
       */
      list(query?: Pagination): Paginated<Lark.EmployeeType>
    }

    export interface CreateRequest {
      /** 名称 */
      name: Lark.I18n[]
      /** 默认雇员类型 */
      default_employee_type: boolean
      /** 启用 */
      active: boolean
      /** 编码 */
      code?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      employee_type?: Lark.EmployeeType
    }

    export interface PatchRequest {
      /** 名称 */
      name?: Lark.I18n[]
      /** 默认雇员类型 */
      default_employee_type?: boolean
      /** 启用 */
      active?: boolean
      /** 编码 */
      code?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      employee_type?: Lark.EmployeeType
    }

    export interface GetResponse {
      /** 雇员类型 */
      employee_type?: Lark.EmployeeType
    }
  }

  export namespace WorkingHoursType {
    export interface Methods {
      /**
       * 创建工时制度
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除工时制度
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/delete
       */
      delete(working_hours_type_id: string): Promise<void>
      /**
       * 更新工时制度
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/patch
       */
      patch(working_hours_type_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 查询单个工时制度
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/get
       */
      get(working_hours_type_id: string): Promise<GetResponse>
      /**
       * 批量查询工时制度
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list
       */
      list(query?: Pagination): Paginated<Lark.WorkingHoursType>
    }

    export interface CreateRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      name: Lark.I18n[]
      /** 国家/地区 */
      country_region_id_list?: string[]
      /** 职务默认值 */
      default_for_job: boolean
      /** 启用 */
      active: boolean
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      working_hours_type?: Lark.WorkingHoursType
    }

    export interface PatchRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      name?: Lark.I18n[]
      /** 国家/地区 */
      country_region_id_list?: string[]
      /** 职务默认值 */
      default_for_job?: boolean
      /** 启用 */
      active?: boolean
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      working_hours_type?: Lark.WorkingHoursType
    }

    export interface GetResponse {
      /** 工时制度信息 */
      working_hours_type?: Lark.WorkingHoursType
    }
  }

  export namespace Employee {
    export interface Methods {
      /**
       * 批量查询员工信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get
       */
      batchGet(body: BatchGetRequest, query?: BatchGetQuery): Promise<BatchGetResponse>
      /**
       * 搜索员工信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.Employee>
      /**
       * 添加人员
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
    }

    export interface BatchGetRequest {
      /** 返回数据的字段列表，填写方式：为空时默认仅返回 ID */
      fields?: string[]
      /** 雇佣 ID 列表 */
      employment_ids?: string[]
      /** 个人信息 ID 列表，employment_ids参数有值时该参数不生效 */
      person_ids?: string[]
      /** 主工作邮箱列表 */
      work_emails?: string[]
    }

    export interface BatchGetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface BatchGetResponse {
      /** 查询的雇佣信息 */
      items?: Lark.Employee[]
    }

    export interface SearchRequest {
      /** 返回数据的字段列表，填写方式：为空时默认仅返回 ID */
      fields?: string[]
      /** 雇佣 ID 列表 */
      employment_id_list?: string[]
      /** 工号列表 */
      employee_number_list?: string[]
      /** 邮箱，精确匹配查询 */
      work_email?: string
      /** 个人电话，精确匹配查询 */
      phone_number?: string
      /** 搜索关键字，支持对邮箱、工号和姓名的模糊匹配 */
      key_word?: string
      /** 雇佣状态 */
      employment_status?: 'hired' | 'terminated'
      /** 人员类型 ID */
      employee_type_id?: string
      /** 部门 ID，根据员工主职的直接部门查询，可以通过【查询部门】API 获取 部门 ID */
      department_id_list?: string[]
      /** 直接上级的雇佣 ID，根据员工主职的直接上级查询 */
      direct_manager_id_list?: string[]
      /** 虚线上级的雇佣 ID，根据员工主职的虚线上级查询 */
      dotted_line_manager_id_list?: string[]
      /** 转正式员工日期-搜索范围开始 */
      regular_employee_start_date_start?: string
      /** 转正式员工日期-搜索范围结束 */
      regular_employee_start_date_end?: string
      /** 入职日期-搜索范围开始，需要与搜索范围结束一同使用 */
      effective_time_start?: string
      /** 入职日期-搜索范围结束 */
      effective_time_end?: string
      /** 工作地点 ID 列表，查询属于该工作地点及下级工作地点的员工 */
      work_location_id_list_include_sub?: string[]
      /** 常用英文全名精确搜索 */
      preferred_english_full_name_list?: string[]
      /** 常用本地全名精确搜索 */
      preferred_local_full_name_list?: string[]
      /** 居民身份证件号码精确搜索 */
      national_id_number_list?: string[]
      /** 个人电话列表，精确匹配查询 */
      phone_number_list?: string[]
      /** 工作邮箱地址列表，精确匹配查询 */
      email_address_list?: string[]
      /** 部门 ID 列表，查询属于该部门及下级部门的员工 */
      department_id_list_include_sub?: string[]
      /** 其他国籍ID列表，精准匹配查询 */
      additional_national_id_number_list?: string[]
      /** 公民身份类型列表，精确匹配查询 */
      citizenship_status_list?: string[]
      /**
       * 成本中心 ID 列表
       * - 可通过 [【搜索成本中心信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/search) 获取
       */
      cost_center_id_list?: string[]
      /**
       * 任职公司 ID 列表
       * - [【批量查询公司】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取
       */
      service_company_list?: string[]
      /**
       * 任职公司 ID 列表（含下级）
       * - [【批量查询公司】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取
       */
      service_company_list_include_sub?: string[]
      /**
       * 序列 ID 列表
       * - [【批量查询序列】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取
       */
      job_family_id_list?: string[]
      /**
       * 序列 ID 列表（含下级）
       * - [【批量查询序列】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取
       */
      job_family_id_list_include_sub?: string[]
      /**
       * 职级 ID 列表
       * - 可通过[【批量查询职级】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取
       * - 需要有字段读取权限
       */
      job_level_id_list?: string[]
      /**
       * 职等 ID 列表
       * - 可通过[【查询职等】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query)获取
       * - 需要有字段读取权限
       */
      job_grade_id_list?: string[]
      /**
       * 职务 ID 列表
       * - 可通过[【批量查询职务】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取
       * - 需要有字段读取权限
       */
      job_id_list?: string[]
      /**
       * 岗位 ID 列表
       * - 功能灰度中，如有需求请联系[技术支持](https://applink.feishu.cn/TLJpeNdW)
       * - 需要有字段读取权限
       */
      position_id_list?: string[]
      /**
       * 岗位 ID 列表（含下级）
       * - 功能灰度中，如有需求请联系[技术支持](https://applink.feishu.cn/TLJpeNdW)
       * - 需要有字段读取权限
       */
      position_id_list_include_sub?: string[]
      /**
       * 工时制度 ID 列表
       * - 可通过[【批量查询工时制度】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取
       * - 需要有字段读取权限
       */
      working_hours_type_id_list?: string[]
      /**
       * 国籍 ID 列表
       * - 可通过[【查询国籍信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-nationality/search)获取
       * - 需要有字段读取权限
       */
      nationality_id_list?: string[]
      /**
       * 员工所属薪资组 ID 列表
       * - 可通过 [【获取薪资组基本信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list) 获取
       * - 需要有字段读取权限
       */
      pay_group_id_list?: string[]
      /**
       * 员工所属外派薪资组 ID 列表
       * - 可通过 [【获取薪资组基本信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list) 获取
       * - 需要有字段读取权限
       */
      assignment_pay_group_id_list?: string[]
      /**
       * 员工当前合同类型列表
       * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)查询
       * - object_api_name：contract
       * - custom_api_name：contract_type
       * - 需要有字段读取权限
       */
      contract_type_list?: string[]
      /**
       * 员工当前所属薪资方案 ID 列表
       * - 可通过[【批量查询薪资方案】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list)获取
       * - 需要有字段读取权限
       */
      archive_cpst_plan_id_list?: string[]
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface CreateRequest {
      /** 个人信息 */
      personal_info?: Lark.ProfileSettingPersonalInfo
      /** 工作信息 */
      employment_info?: Lark.ProfileSettingEmploymentInfo
      /** 履历信息 */
      career?: Lark.ProfileSettingCareer
      /** 资料附件 */
      data_attachment?: Lark.ProfileSettingDataAttachment
    }

    export interface CreateQuery {
      /** 幂等标识，服务端会忽略client_token重复的请求 */
      client_token?: string
      /**
       * 是否为离职重聘：
       * false: 否，系统直接标为非离职重聘人员，不再做重复判断"
       * true: 是，要求rehire_employment_id
       */
      rehire?: boolean
      /** 离职重聘员工雇佣ID, rehire */
      rehire_employment_id?: string
      /** 是否强制提交，超编等场景需要用户确认影响才能提交 */
      force_submit?: boolean
      /** 是否忽略工时制度自动生成规则 */
      ignore_working_hours_type_rule?: boolean
    }

    export interface CreateResponse {
      /** 雇佣信息 ID */
      employment_id?: string
      /** 合同 ID */
      contract_id?: string
      /** 任职信息 ID */
      job_data_id?: string
    }
  }

  export namespace Person {
    export interface Methods {
      /**
       * 创建个人信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新个人信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/patch
       */
      patch(person_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 删除个人信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/delete
       */
      delete(person_id: string): Promise<void>
      /**
       * 上传文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/upload
       */
      upload(form: UploadForm): Promise<UploadResponse>
      /**
       * 查询单个个人信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/get
       */
      get(person_id: string, query?: GetQuery): Promise<GetResponse>
    }

    export interface CreateRequest {
      /** 姓名列表 */
      name_list: Lark.PersonName[]
      /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
      gender?: Lark.Enum
      /** 出生日期 */
      date_of_birth?: string
      /** 国籍 ID，可通过【查询国籍信息】接口查询 */
      nationality_id_v2?: string
      /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
      race?: Lark.Enum
      /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
      marital_status?: Lark.Enum
      /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
      phone_list?: Lark.Phone[]
      /** 地址列表 */
      address_list?: Lark.Address[]
      /** 邮箱列表 */
      email_list?: Lark.Email[]
      /** 工作经历列表 */
      work_experience_list?: Lark.WorkExperienceInfo[]
      /** 教育经历列表 */
      education_list?: Lark.Education[]
      /** 银行账户 */
      bank_account_list?: Lark.BankAccount[]
      /** 证件 */
      national_id_list?: Lark.NationalId[]
      /** 家庭成员列表 */
      dependent_list?: Lark.Dependent[]
      /** 紧急联系人列表 */
      emergency_contact_list?: Lark.EmergencyContact[]
      /** 参加工作日期 */
      date_entered_workforce?: string
      /** 头像资源的 ID */
      profile_image_id?: string
      /** 个人资料附件 */
      personal_profile?: Lark.PersonalProfile[]
      /** 籍贯 ID */
      native_region?: string
      /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
      hukou_type?: Lark.Enum
      /** 户口所在地 */
      hukou_location?: string
      /** 政治面貌，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：political_affiliation - object_api_name：person_info_chn */
      political_affiliations?: Lark.Enum[]
      /** 人才 ID */
      talent_id?: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
      /** 出生国家/地区 */
      born_country_region?: string
      /** 是否残疾 */
      is_disabled?: boolean
      /** 残疾证号 */
      disable_card_number?: string
      /** 是否烈属 */
      is_martyr_family?: boolean
      /** 烈属证号 */
      martyr_card_number?: string
      /** 是否孤老 */
      is_old_alone?: boolean
      /** 居民身份信息 */
      resident_taxes?: Lark.ResidentTax[]
      /** 首次入境日期 */
      first_entry_time?: string
      /** 预计离境日期 */
      leave_time?: string
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      person?: Lark.PersonInfo
    }

    export interface PatchRequest {
      /** 姓名列表 */
      name_list?: Lark.PersonName[]
      /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
      gender?: Lark.Enum
      /** 出生日期 */
      date_of_birth?: string
      /** 国籍 ID，可通过【查询国籍信息】接口查询 */
      nationality_id_v2?: string
      /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
      race?: Lark.Enum
      /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
      marital_status?: Lark.Enum
      /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
      phone_list?: Lark.Phone[]
      /** 地址列表 */
      address_list?: Lark.Address[]
      /** 邮箱列表 */
      email_list?: Lark.Email[]
      /** 工作经历列表 */
      work_experience_list?: Lark.WorkExperienceInfo[]
      /** 教育经历列表 */
      education_list?: Lark.Education[]
      /** 银行账户 */
      bank_account_list?: Lark.BankAccount[]
      /** 证件 */
      national_id_list?: Lark.NationalId[]
      /** 家庭成员列表 */
      dependent_list?: Lark.Dependent[]
      /** 紧急联系人列表 */
      emergency_contact_list?: Lark.EmergencyContact[]
      /** 参加工作日期 */
      date_entered_workforce?: string
      /** 头像资源的 ID */
      profile_image_id?: string
      /** 个人资料附件 */
      personal_profile?: Lark.PersonalProfile[]
      /** 籍贯 ID */
      native_region?: string
      /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
      hukou_type?: Lark.Enum
      /** 户口所在地 */
      hukou_location?: string
      /** 政治面貌，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：political_affiliation - object_api_name：person_info_chn */
      political_affiliations?: Lark.Enum[]
      /** 人才 ID */
      talent_id?: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
      /** 出生国家/地区 */
      born_country_region?: string
      /** 是否残疾 */
      is_disabled?: boolean
      /** 残疾证号 */
      disable_card_number?: string
      /** 是否烈属 */
      is_martyr_family?: boolean
      /** 烈属证号 */
      martyr_card_number?: string
      /** 是否孤老 */
      is_old_alone?: boolean
      /** 居民身份信息 */
      resident_taxes?: Lark.ResidentTax[]
      /** 首次入境日期 */
      first_entry_time?: string
      /** 预计离境日期 */
      leave_time?: string
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 根据no_need_query判断更新后是否做查询请求并返回个人信息 */
      no_need_query?: boolean
    }

    export interface PatchResponse {
      person?: Lark.PersonInfo
    }

    export interface UploadForm {
      /** 文件二进制内容 */
      file_content: Blob
      /** 文件名称 */
      file_name: string
    }

    export interface UploadResponse {
      /** 上传文件ID */
      id?: string
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'people_employee_id'
    }

    export interface GetResponse {
      /** 个人信息 */
      person?: Lark.Person
    }
  }

  export namespace File {
    export interface Methods {
      /**
       * 下载文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/file/get
       */
      get(id: string): Promise<ArrayBuffer>
    }
  }

  export namespace Employment {
    export interface Methods {
      /**
       * 创建雇佣信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新雇佣信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/patch
       */
      patch(employment_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 删除雇佣信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/delete
       */
      delete(employment_id: string, query?: DeleteQuery): Promise<void>
    }

    export interface CreateRequest {
      /** 资历起算日期 */
      seniority_date?: string
      /** 员工编号 */
      employee_number?: string
      /** 入职日期 */
      effective_time: string
      /** 离职日期 */
      expiration_time?: string
      /** 雇佣类型 */
      employment_type: Lark.Enum
      /** 人员信息，引用Person的ID */
      person_id: string
      /** 是否是主雇佣信息 */
      primary_employment: boolean
      /** 雇员状态 */
      employment_status: Lark.Enum
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 工作邮箱列表 */
      work_email_list?: Lark.Email[]
      /** 离职原因 */
      reason_for_offboarding?: Lark.Enum
      /** 招聘应用 ID */
      ats_application_id?: string
      /** 是否离职重聘 */
      rehire?: Lark.Enum
      /** 历史雇佣信息 ID */
      rehire_employment_id?: string
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      employment?: Lark.EmploymentCreate
    }

    export interface PatchRequest {
      /** 资历起算日期 */
      seniority_date?: string
      /** 员工编号 */
      employee_number?: string
      /** 雇佣类型 */
      employment_type?: Lark.Enum
      /** 人员信息，引用Person的ID */
      person_id?: string
      /** 是否是主雇佣信息 */
      primary_employment?: boolean
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 工作邮箱列表 */
      work_email_list?: Lark.Email[]
      /** 离职原因 */
      reason_for_offboarding?: Lark.Enum
      /** 招聘应用 ID */
      ats_application_id?: string
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface PatchResponse {
      employment?: Lark.Employment
    }

    export interface DeleteQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }
  }

  export namespace JobData {
    export interface Methods {
      /**
       * 创建任职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除任职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/delete
       */
      delete(job_data_id: string, query?: DeleteQuery): Promise<void>
      /**
       * 更新任职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/patch
       */
      patch(job_data_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 批量查询任职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/list
       */
      list(query?: ListQuery): Paginated<Lark.JobData>
      /**
       * 查询单个任职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/get
       */
      get(job_data_id: string, query?: GetQuery): Promise<GetResponse>
    }

    export interface CreateRequest {
      /** 级别 */
      job_level_id?: string
      /** 职等ID */
      job_grade_id?: string
      /** 雇员类型 */
      employee_type_id: string
      /** 工时制度 */
      working_hours_type_id?: string
      /** 工作地点 */
      work_location_id?: string
      /** 部门 */
      department_id: string
      /** 职务 */
      job_id?: string
      /** 试用期开始日期 */
      probation_start_date?: string
      /** 试用期 */
      probation_end_date?: string
      /** 主任职 */
      primary_job_data: boolean
      /** Employment ID */
      employment_id: string
      /** 生效时间 */
      effective_time: string
      /** 失效时间 */
      expiration_time?: string
      /** 职务分类 ID */
      job_family_id?: string
      /** 任职原因 */
      assignment_start_reason: Lark.Enum
      /** 试用期结束日期 */
      probation_expected_end_date?: string
      /** 实线主管 */
      direct_manager_id?: string
      /** 虚线主管 */
      dotted_line_manager_id_list?: string[]
      /** 第二实线主管 */
      second_direct_manager_id?: string
      /** 成本中心分摊信息 */
      cost_center_rate?: Lark.SupportCostCenterItem[]
      /** 排班类型 */
      work_shift?: Lark.Enum
      /** 薪资类型 */
      compensation_type?: Lark.Enum
      /** 任职公司 */
      service_company?: string
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface CreateResponse {
      job_data?: Lark.JobData
    }

    export interface DeleteQuery {
      /** 需要删除的任职记录版本 ID */
      version_id?: string
    }

    export interface PatchRequest {
      /** 任职记录版本 ID */
      version_id?: string
      /** 级别 */
      job_level_id?: string
      /** 职等ID */
      job_grade_id?: string
      /** 雇员类型 */
      employee_type_id?: string
      /** 工时制度 */
      working_hours_type_id?: string
      /** 工作地点 */
      work_location_id?: string
      /** 部门 */
      department_id?: string
      /** 职务 */
      job_id?: string
      /** 试用期开始日期 */
      probation_start_date?: string
      /** 试用期 */
      probation_end_date?: string
      /** 主任职 */
      primary_job_data?: boolean
      /** 生效时间 */
      effective_time?: string
      /** 失效时间 */
      expiration_time?: string
      /** 职务分类 ID */
      job_family_id?: string
      /** 任职原因 */
      assignment_start_reason?: Lark.Enum
      /** 试用期结束日期 */
      probation_expected_end_date?: string
      /** 实线主管 */
      direct_manager_id?: string
      /** 虚线主管 */
      dotted_line_manager_id_list?: string[]
      /** 第二实线主管 */
      second_direct_manager_id?: string
      /** 成本中心分摊信息 */
      cost_center_rate?: Lark.SupportCostCenterItem[]
      /** 排班类型 */
      work_shift?: Lark.Enum
      /** 薪资类型 */
      compensation_type?: Lark.Enum
      /** 任职公司 */
      service_company?: string
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      /**
       * 是否强校验。值为 true 时，会对入参进行业务校验，并产生异动记录、发送异动事件。
       * - 默认值：false
       * - 仅在新增任职版本时生效，当 version_id 不为空时该字段不生效
       */
      strict_verify?: string
    }

    export interface PatchResponse {
      job_data?: Lark.JobData
    }

    export interface ListQuery extends Pagination {
      /** 雇佣 ID */
      employment_id?: string
      /** 任职信息 ID 列表，最大 100 个（不传则默认查询全部任职信息） */
      job_data_id_list?: string[]
      /** 部门 ID */
      department_id?: string
      /** 职务 ID */
      job_id?: string
      /** 是否获取所有任职记录，true 为获取员工所有版本的任职记录，false 为仅获取当前生效的任职记录，默认为 false */
      get_all_version?: boolean
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface GetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface GetResponse {
      /** 任职信息 */
      job_data?: Lark.JobData
    }
  }

  export namespace Employees {
    export interface Methods {
      jobData: JobData.Methods
      internationalAssignment: InternationalAssignment.Methods
      additionalJob: AdditionalJob.Methods
      bp: Bp.Methods
    }

    export namespace JobData {
      export interface Methods {
        /**
         * 获取任职信息列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/query
         */
        query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.EmployeeJobData>
        /**
         * 批量查询员工任职信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/batch_get
         */
        batchGet(body: BatchGetRequest, query?: BatchGetQuery): Promise<BatchGetResponse>
      }

      export interface QueryRequest {
        /** 是否获取所有任职记录，true 为获取员工所有版本的任职记录，false 为仅获取当前生效的任职记录，默认为 false */
        get_all_version?: boolean
        /** 查看数据日期 */
        data_date?: string
        /** 生效日期 - 搜索范围开始 */
        effective_date_start?: string
        /** 生效日期 - 搜索范围结束 */
        effective_date_end?: string
        /** 部门 ID */
        department_id?: string
        /** 员工雇佣 ID 列表 */
        employment_ids?: string[]
        /**
         * 是否仅查询主职
         * - true：仅返回 primary_job_data 为 true 的任职记录
         * - false：仅返回 primary_job_data 为 false 的任职记录
         * - 不传：返回全部
         */
        primary_job_data?: boolean
        /**
         * 任职原因
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：assignment_start_reason
         */
        assignment_start_reasons?: string[]
      }

      export interface QueryQuery extends Pagination {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface BatchGetRequest {
        /** 员工雇佣 ID 列表 */
        employment_ids: string[]
        /** 是否获取所有任职记录，true 为获取员工所有版本的任职记录，false 为仅获取当前生效的任职记录，默认为 false */
        get_all_version?: boolean
        /** 生效日期 - 搜索范围开始 */
        effective_date_start?: string
        /** 生效日期 - 搜索范围结束 */
        effective_date_end?: string
        /** 查看数据日期，默认为今天 */
        data_date?: string
        /**
         * 是否仅查询主职
         * - true：仅返回 primary_job_data 为 true 的任职记录
         * - false：仅返回 primary_job_data 为 false 的任职记录
         * - 不传：返回全部
         */
        primary_job_data?: boolean
        /**
         * 任职原因
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：assignment_start_reason
         */
        assignment_start_reasons?: string[]
      }

      export interface BatchGetQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface BatchGetResponse {
        /** 查询的雇佣信息 */
        items?: Lark.EmployeeJobData[]
      }
    }

    export namespace InternationalAssignment {
      export interface Methods {
        /**
         * 创建外派信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/create
         */
        create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 更新外派信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/patch
         */
        patch(international_assignment_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
        /**
         * 批量查询外派信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/list
         */
        list(query?: ListQuery): Promise<ListResponse>
        /**
         * 删除外派信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-international_assignment/delete
         */
        delete(international_assignment_id: string): Promise<void>
      }

      export interface CreateRequest {
        /**
         * 外派工作地点 ID
         * - 可通过[【批量查询地点】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list)获取
         */
        work_location_id: string
        /**
         * 外派任职公司 ID
         * - 可通过[【批量查询公司】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取
         */
        service_company?: string
        /**
         * 排班类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：work_shift
         */
        work_shift?: string
        /**
         * 周工作时长
         * - 限制两位小数
         */
        weekly_working_hours_v2?: number
        /**
         * 工时制度ID
         * -  可通过[【批量查询工时制度】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取
         */
        working_hours_type_id?: string
        /**
         * 人员类型ID
         * - 可通过[【批量查询人员类型】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list)获取
         */
        employee_type_id?: string
        /**
         * 部门 ID
         * - 可通过[【批量查询部门】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get)获取
         * - 类型与 department_id_type 一致
         */
        department_id?: string
        /**
         * 职务 ID
         * - 可通过[【批量查询职务】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取
         */
        job_id?: string
        /**
         * 序列 ID
         * - 可通过[【批量查询序列】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取
         */
        job_family_id?: string
        /**
         * 职级 ID
         * - 可通过[【批量查询职级】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取
         */
        job_level_id?: string
        /**
         * 职等 ID
         * - 可通过[【查询职等】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query)获取
         */
        job_grade_id?: string
        /**
         * 薪资类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：compensation_type
         */
        compensation_type?: string
        /**
         * 直属上级雇佣 ID
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取
         * - 类型与 user_id_type 一致
         */
        direct_manager_id?: string
        /**
         * 虚线上级雇佣 ID
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取
         * - 类型与 user_id_type 一致
         */
        dotted_line_manager_id?: string
        /**
         * 工作日历 ID
         * - 可通过[【查询工作日历】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取
         */
        work_calendar_id?: string
        /**
         * 岗位 ID
         * - 功能灰度中，请联系[技术支持](https://applink.feishu.cn/TLJpeNdW)
         */
        position_id?: string
        /**
         * 雇佣 ID
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取
         * - 类型与 user_id_type 一致
         */
        employment_id: string
        /**
         * 自定义字段
         * - 请参考[【自定义字段说明】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom-fields-guide)
         */
        custom_fields?: Lark.ObjectFieldData[]
        /** 外派原因说明 */
        international_assignment_reason?: string
        /** 备注 */
        description?: string
        /**
         * 预计结束日期
         * - 格式：yyyy-mm-dd
         */
        international_assignment_expected_end_date?: string
        /**
         * 外派类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：international_assignment
         * - custom_api_name：international_assignment_type
         */
        international_assignment_type: string
        /**
         * 开始日期
         * - 格式：yyyy-mm-dd
         */
        effective_time: string
        /**
         * 结束日期
         * - 格式：yyyy-mm-dd
         */
        expiration_time?: string
      }

      export interface CreateQuery {
        /** 幂等标识，服务端会忽略 client_token 重复的请求 */
        client_token?: string
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface CreateResponse {
        /** 外派信息 */
        international_assignment?: Lark.EmployeesInternationalAssignmentResp
      }

      export interface PatchRequest {
        /**
         * 外派工作地点 ID
         * - 可通过[【批量查询地点】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list)获取
         */
        work_location_id?: string
        /**
         * 外派任职公司 ID
         * - 可通过[【批量查询公司】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取
         */
        service_company?: string
        /**
         * 排班类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：work_shift
         */
        work_shift?: string
        /**
         * 周工作时长
         * - 限制两位小数
         */
        weekly_working_hours_v2?: number
        /**
         * 工时制度ID
         * -  可通过[【批量查询工时制度】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取
         */
        working_hours_type_id?: string
        /**
         * 人员类型ID
         * - 可通过[【批量查询人员类型】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list)获取
         */
        employee_type_id?: string
        /**
         * 部门 ID
         * - 可通过[【批量查询部门】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get)获取
         * - 类型与 department_id_type 一致
         */
        department_id?: string
        /**
         * 职务 ID
         * - 可通过[【批量查询职务】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取
         */
        job_id?: string
        /**
         * 序列 ID
         * - 可通过[【批量查询序列】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取
         */
        job_family_id?: string
        /**
         * 职级 ID
         * - 可通过[【批量查询职级】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取
         */
        job_level_id?: string
        /**
         * 职等 ID
         * - 可通过[【查询职等】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query)获取
         */
        job_grade_id?: string
        /**
         * 薪资类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：compensation_type
         */
        compensation_type?: string
        /**
         * 直属上级雇佣 ID
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取
         * - 类型与 user_id_type 一致
         */
        direct_manager_id?: string
        /**
         * 虚线上级雇佣 ID
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取
         * - 类型与 user_id_type 一致
         */
        dotted_line_manager_id?: string
        /**
         * 工作日历 ID
         * - 可通过[【查询工作日历】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取
         */
        work_calendar_id?: string
        /**
         * 岗位 ID
         * - 功能灰度中，请联系[技术支持](https://applink.feishu.cn/TLJpeNdW)
         */
        position_id?: string
        /**
         * 自定义字段
         * - 请参考[【自定义字段说明】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom-fields-guide)
         */
        custom_fields?: Lark.ObjectFieldData[]
        /** 外派原因说明 */
        international_assignment_reason?: string
        /** 备注 */
        description?: string
        /**
         * 预计结束日期
         * - 格式：yyyy-mm-dd
         */
        international_assignment_expected_end_date?: string
        /**
         * 外派类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：international_assignment
         * - custom_api_name：international_assignment_type
         */
        international_assignment_type?: string
        /**
         * 开始日期
         * - 格式：yyyy-mm-dd
         */
        effective_time?: string
        /**
         * 结束日期
         * - 格式：yyyy-mm-dd
         */
        expiration_time?: string
      }

      export interface PatchQuery {
        /** 幂等标识，服务端会忽略client_token重复的请求 */
        client_token?: string
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface PatchResponse {
        /** 外派信息 */
        international_assignment?: Lark.EmployeesInternationalAssignmentResp
      }

      export interface ListQuery extends Pagination {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
        /**
         * 雇佣ID
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息
         * - 类型必须与 user_id_type 一致
         */
        employment_ids?: string[]
        /** 外派 ID */
        international_assignment_ids?: string[]
        /**
         * 外派开始日期
         * - 范围筛选，格式：yyyy-mm-dd~yyyy-mm-dd
         */
        effective_time?: string
        /**
         * 外派结束日期
         * - 范围筛选，格式：yyyy-mm-dd~yyyy-mm-dd
         */
        expiration_time?: string
        /**
         * 雇佣状态
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：employment
         * - custom_api_name：employment_status
         */
        employment_status_list?: string[]
        /**
         * 外派工作地点
         * - 可通过[【批量查询地点】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list)获取
         * - 需要以下权限点之一：
         * - [读取外派地点](corehr:employment.international_assignment.work_location:read)
         * - [读写外派地点](corehr:employment.international_assignment.work_location:write)
         */
        work_location_id_list?: string[]
        /**
         * 外派部门
         * - 可通过[【批量查询部门】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get)获取
         * - 类型与 department_id_type 一致
         */
        department_id_list?: string[]
        /**
         * 外派直属上级
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取
         * - 类型与 user_id_type 一致
         */
        direct_manager_id_list?: string[]
        /**
         * 外派虚线上级
         * - 可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取
         * - 类型与 user_id_type 一致
         */
        dotted_line_manager_id_list?: string[]
        /**
         * 外派岗位
         * - 功能灰度中，请联系[技术支持](https://applink.feishu.cn/TLJpeNdW)
         * - 需要以下权限点之一：
         * - [读取外派岗位](corehr:employment.international_assignment.position:read)
         * - [读写外派岗位](corehr:employment.international_assignment.position:write)
         */
        position_id_list?: string[]
        /**
         * 外派职务
         * - 可通过[【批量查询职务】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取
         * - 需要以下权限点之一：
         * - [读取外派职务](corehr:employment.international_assignment.job:read)
         * - [读写外派职务](corehr:employment.international_assignment.job:write)
         */
        job_id_list?: string[]
        /**
         * 外派序列
         * - 可通过[【批量查询序列】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取
         */
        job_family_id_list?: string[]
        /**
         * 外派职级
         * - 可通过[【批量查询职级】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取
         * - 需要以下权限点之一：
         * - [读取外派职级](corehr:employment.international_assignment.job_level:read)
         * - [读写外派职级](corehr:employment.international_assignment.job_level:write)
         */
        job_level_id_list?: string[]
        /**
         * 外派职等
         * - 可通过[【查询职等】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query)获取
         * - 需要以下权限点之一：
         * - [读取外派职等](corehr:employment.international_assignment.job_grade:read)
         * - [读写外派职等](corehr:employment.international_assignment.job_grade:write)
         */
        job_grade_id_list?: string[]
        /**
         * 外派工时制度
         * - 可通过[【批量查询工时制度】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取
         * - 需要以下权限点之一：
         * - [读取外派工时制度](corehr:employment.international_assignment.working_hours_type:read)
         * - [读写外派工时制度](corehr:employment.international_assignment.working_hours_type:write)
         */
        working_hours_type_id_list?: string[]
        /**
         * 外派任职公司
         * - 可通过[【批量查询公司】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取
         * - 需要以下权限点之一：
         * - [读取外派公司](corehr:employment.international_assignment.service_company:read)
         * - [读写外派公司](corehr:employment.international_assignment.service_company:write)
         */
        service_company_list?: string[]
        /**
         * 外派周工作时长
         * - 限制两位小数
         * - 需要以下权限点之一：
         * - [读取外派周工作时长](corehr:employment.international_assignment.weekly_working_hours:read)
         * - [读写外派周工作时长](corehr:employment.international_assignment.weekly_working_hours:write)
         */
        weekly_working_hours_v2?: number
        /**
         * 外派排班类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：work_shift
         * - 需要以下权限点之一：
         * - [读取外派排班类型](corehr:employment.international_assignment.work_shift:read)
         * - [读写外派排班类型](corehr:employment.international_assignment.work_shift:write)
         */
        work_shift_list?: string[]
        /**
         * 外派薪资类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：job_data
         * - custom_api_name：compensation_type
         * - 需要以下权限点之一：
         * - [读取外派薪资类型](corehr:employment.international_assignment.compensation_type:read)
         * - [读写外派薪资类型](corehr:employment.international_assignment.compensation_type:write)
         */
        compensation_type_list?: string[]
        /**
         * 外派预计结束日期
         * - 范围筛选，格式：yyyy-mm-dd~yyyy-mm-dd
         */
        international_assignment_expected_end_date?: string
        /**
         * 外派状态
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：international_assignment
         * - custom_api_name：international_assignment_status
         */
        international_assignment_status_list?: string[]
        /**
         * 外派类型
         * - 可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name：international_assignment
         * - custom_api_name：international_assignment_type
         */
        international_assignment_type_list?: string[]
        /**
         * 外派工作日历
         * - 可通过[【查询工作日历】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取详细信息
         * - 需要以下权限点之一：
         * - [读取外派工作日历](corehr:employment.international_assignment.work_calendar:read)
         * - [读写外派工作日历](corehr:employment.international_assignment.work_calendar:write)
         */
        work_calendar_id_list?: string[]
      }

      export interface ListResponse {
        /** 外派信息 */
        items?: Lark.EmployeesInternationalAssignment[]
        /** 无权限的雇佣ID - 在指定雇佣ID查询时请检查该参数 - 类型与 user_id_type 一致 */
        no_authority_ids?: string[]
        /** 翻页 */
        page_token?: string
        /** 是否有更多项 */
        has_more?: boolean
      }
    }

    export namespace AdditionalJob {
      export interface Methods {
        /**
         * 创建兼职
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/create
         */
        create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 更新兼职
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/patch
         */
        patch(additional_job_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
        /**
         * 删除兼职
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/delete
         */
        delete(additional_job_id: string): Promise<void>
        /**
         * 批量查询兼职信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/batch
         */
        batch(body: BatchRequest, query?: BatchQuery): Paginated<Lark.EmployeesAdditionalJob>
      }

      export interface CreateRequest {
        /** 人员类型 ID，可通过[【批量查询人员类型】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list)获取 */
        employee_type_id: string
        /** 工时制度 ID，可通过[【批量查询工时制度】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取详细信息 */
        working_hours_type_id?: string
        /** 工作地点 ID，可通过[【批量查询地点】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list)获取详细信息 */
        work_location_id?: string
        /** 部门 ID，可通过[【批量查询部门】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get)获取详细信息；类型与department_id_type一致 */
        department_id: string
        /** 职务 ID，可通过[【批量查询职务】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取详细信息 */
        job_id?: string
        /** 职级 ID，可通过[【批量查询职级】](https://open.feishu.cn/document//uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取详细信息 */
        job_level_id?: string
        /** 序列 ID，可通过[【批量查询序列】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取详细信息 */
        job_family_id?: string
        /** 雇佣 ID，可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
        employment_id: string
        /** 兼职开始日期 */
        start_date: string
        /** 兼职结束日期，不可清空 */
        end_date?: string
        /** 直属上级的雇佣ID，可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
        direct_manager_id?: string
        /** 虚线上级的雇佣ID，可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
        dotted_line_manager_id?: string
        /**
         * 排班类型，可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name = "job_data"
         * - custom_api_name = "work_shift"
         */
        work_shift?: Lark.Enum
        /**
         * 薪资类型，可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name = "job_data"
         * - custom_api_name = "compensation_type"
         */
        compensation_type?: Lark.Enum
        /** 任职公司，可通过[【批量查询公司】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取详细信息 */
        service_company?: string
        /** 周工作时长【0~168】 */
        weekly_working_hours?: string
        /** 工作日历ID，可通过[【查询工作日历】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取详细信息 */
        work_calendar_id?: string
        /** 岗位 ID */
        position_id?: string
        /** 人员子类型 ID */
        employee_subtype_id?: string
      }

      export interface CreateQuery {
        /** 操作的唯一标识，用于幂等校验。请求成功时，重复的client_token不会再创建、变更数据。 */
        client_token?: string
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface CreateResponse {
        additional_job?: Lark.EmployeesAdditionalJobWriteResp
      }

      export interface PatchRequest {
        /** 人员类型 ID，可通过[【批量查询人员类型】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list)获取 */
        employee_type_id?: string
        /** 工时制度 ID，可通过[【批量查询工时制度】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取详细信息 */
        working_hours_type_id?: string
        /** 工作地点 ID，可通过[【批量查询地点】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list)获取详细信息 */
        work_location_id?: string
        /** 部门 ID，可通过[【批量查询部门】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get)获取详细信息；类型与department_id_type一致 */
        department_id?: string
        /** 职务 ID，可通过[【批量查询职务】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取详细信息 */
        job_id?: string
        /** 职级 ID，可通过[【批量查询职级】](https://open.feishu.cn/document//uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取详细信息 */
        job_level_id?: string
        /** 序列 ID，可通过[【批量查询序列】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取详细信息 */
        job_family_id?: string
        /** 兼职开始日期 */
        start_date?: string
        /** 兼职结束日期，不可清空 */
        end_date?: string
        /** 直属上级的雇佣ID，可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
        direct_manager_id?: string
        /** 虚线上级的雇佣ID，可通过[【批量查询员工信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
        dotted_line_manager_id?: string
        /**
         * 排班类型，可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name = "job_data"
         * - custom_api_name = "work_shift"
         */
        work_shift?: Lark.Enum
        /**
         * 薪资类型，可通过[【获取字段详情】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：
         * - object_api_name = "job_data"
         * - custom_api_name = "compensation_type"
         */
        compensation_type?: Lark.Enum
        /** 任职公司，可通过[【批量查询公司】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取详细信息 */
        service_company?: string
        /** 周工作时长【0~168】 */
        weekly_working_hours?: string
        /** 工作日历ID，可通过[【查询工作日历】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取详细信息 */
        work_calendar_id?: string
        /** 岗位 ID */
        position_id?: string
        /** 人员子类型 ID */
        employee_subtype_id?: string
      }

      export interface PatchQuery {
        /** 根据 client_token 是否一致来判断是否为同一请求 */
        client_token?: string
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface PatchResponse {
        additional_job?: Lark.EmployeesAdditionalJobWriteResp
      }

      export interface BatchRequest {
        /** 雇佣 ID */
        employment_ids?: string[]
        /** 兼职 ID */
        additional_job_ids?: string[]
        /** 开始日期 */
        start_date?: Lark.EmployeesAdditionalJobBatchReqDate
        /** 结束日期 */
        end_date?: Lark.EmployeesAdditionalJobBatchReqDate
        /** 查看数据日期，默认当天 */
        data_date?: string
        /** 仅查询 【data_date】日期生效中的 */
        is_effective?: boolean
      }

      export interface BatchQuery extends Pagination {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }
    }

    export namespace Bp {
      export interface Methods {
        /**
         * 查询员工 HRBP / 属地 BP
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-bp/batch_get
         */
        batchGet(body: BatchGetRequest, query?: BatchGetQuery): Promise<BatchGetResponse>
      }

      export interface BatchGetRequest {
        /** 员工雇佣 ID */
        employment_ids: string[]
        /** 是否获取全部 BP，true 为获取员工所在部门及来自上级部门的全部 HRBP 和属地 BP，false 为仅获取员工的直属 HRBP 和属地 BP（当员工所在部门、属地无 BP 时，会上钻找到最近的 BP），默认为 false */
        get_all?: boolean
      }

      export interface BatchGetQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      }

      export interface BatchGetResponse {
        /** 员工直属 BP 信息，当员工所在部门、属地无 BP 时，会上钻找到最近的 BP */
        employment_direct_bps?: Lark.EmploymentBp[]
        /** 员工全部 BP 信息 */
        employment_all_bps?: Lark.EmploymentBp[]
      }
    }
  }

  export namespace DefaultCostCenter {
    export interface Methods {
      /**
       * 更新默认成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/update_version
       */
      updateVersion(body: UpdateVersionRequest, query?: UpdateVersionQuery): Promise<void>
      /**
       * 删除默认成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/remove_version
       */
      removeVersion(body: RemoveVersionRequest, query?: RemoveVersionQuery): Promise<void>
      /**
       * 添加默认成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/create_version
       */
      createVersion(body: CreateVersionRequest, query?: CreateVersionQuery): Promise<CreateVersionResponse>
      /**
       * 查询默认成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/default_cost_center/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Promise<BatchQueryResponse>
    }

    export interface UpdateVersionRequest {
      /** 员工雇佣 ID */
      employment_id: string
      /** 成本中心信息 */
      default_cost_center?: Lark.EmploymentDefaultCostCenter
    }

    export interface UpdateVersionQuery {
      /** 幂等标识，服务端会忽略client_token重复的请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface RemoveVersionRequest {
      /** 员工雇佣 ID */
      employment_id: string
      /** 成本中心信息 */
      default_cost_center?: Lark.EmploymentDefaultCostCenter
    }

    export interface RemoveVersionQuery {
      /** 幂等标识，服务端会忽略client_token重复的请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface CreateVersionRequest {
      /** 员工雇佣 ID */
      employment_id: string
      /** 成本中心信息 */
      default_cost_center?: Lark.EmploymentDefaultCostCenter
    }

    export interface CreateVersionQuery {
      /** 幂等标识，服务端会忽略client_token重复的请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface CreateVersionResponse {
      /** 默认成本中心id */
      wk_id?: string
      /** 默认成本中心版本id */
      wk_tid?: string
    }

    export interface BatchQueryRequest {
      /** 员工雇佣 ID 列表 */
      employment_ids: string[]
    }

    export interface BatchQueryQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchQueryResponse {
      /** 员工成本中心列表 */
      items?: Lark.EmployeeDefaultCostCenter[]
    }
  }

  export namespace CostAllocation {
    export interface Methods {
      /**
       * 更新成本分摊
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/update_version
       */
      updateVersion(body: UpdateVersionRequest, query?: UpdateVersionQuery): Promise<void>
      /**
       * 删除成本分摊
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/remove_version
       */
      removeVersion(body: RemoveVersionRequest, query?: RemoveVersionQuery): Promise<void>
      /**
       * 创建成本分摊
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/create_version
       */
      createVersion(body: CreateVersionRequest, query?: CreateVersionQuery): Promise<CreateVersionResponse>
      /**
       * 查询成本分摊
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_allocation/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Promise<BatchQueryResponse>
    }

    export interface UpdateVersionRequest {
      /** 员工雇佣 ID */
      employment_id: string
      /** 成本分摊 */
      cost_allocation?: Lark.EmploymentCostAllocation
    }

    export interface UpdateVersionQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface RemoveVersionRequest {
      /** 员工ID */
      employment_id: string
      /** 成本分摊 */
      cost_allocation?: Lark.EmploymentCostAllocation
    }

    export interface RemoveVersionQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateVersionRequest {
      /** 员工雇佣 ID */
      employment_id: string
      /** 成本分摊 */
      cost_allocation?: Lark.EmploymentCostAllocation
    }

    export interface CreateVersionQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateVersionResponse {
      /** 成本分摊ID */
      cost_allocation_id?: string
    }

    export interface BatchQueryRequest {
      /** 员工ID列表 */
      employment_ids: string[]
    }

    export interface BatchQueryQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchQueryResponse {
      /** 查询到的成本分摊信息 */
      items?: Lark.EmployeeCostAllocation[]
    }
  }

  export namespace Department {
    export interface Methods {
      /**
       * 批量查询部门操作日志
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_operation_logs
       */
      queryOperationLogs(body: QueryOperationLogsRequest, query?: QueryOperationLogsQuery): Promise<QueryOperationLogsResponse> & AsyncIterableIterator<Lark.OrganizationOpLog>
      /**
       * 创建部门
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新部门
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/patch
       */
      patch(department_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
      /**
       * 获取父部门信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/parents
       */
      parents(body: ParentsRequest, query?: ParentsQuery): Promise<ParentsResponse>
      /**
       * 批量查询部门
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get
       */
      batchGet(body: BatchGetRequest, query?: BatchGetQuery): Promise<BatchGetResponse>
      /**
       * 查询生效信息变更部门
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 查询指定生效日期的部门基本信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_timeline
       */
      queryTimeline(body: QueryTimelineRequest, query?: QueryTimelineQuery): Promise<QueryTimelineResponse>
      /**
       * 查询指定生效日期的部门架构树
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/tree
       */
      tree(body: TreeRequest, query?: TreeQuery): Paginated<Lark.DepartmentTree>
      /**
       * 批量查询部门版本信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_multi_timeline
       */
      queryMultiTimeline(body: QueryMultiTimelineRequest, query?: QueryMultiTimelineQuery): Paginated<Lark.DepartmentTimeline>
      /**
       * 搜索部门信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.Department>
      /**
       * 删除部门 V2
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/delete
       */
      delete(department_id: string, query?: DeleteQuery): Promise<void>
      /**
       * 查询单个部门
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/get
       */
      get(department_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 批量查询部门
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/list
       */
      list(query?: ListQuery): Paginated<Lark.Department>
    }

    export interface QueryOperationLogsRequest {
      /** 部门ID列表 */
      department_ids: string[]
      /** 查询的起始操作日期，格式 "YYYY-MM-DD"，不带时分秒，包含start_date传入的时间，系统会以start_date的00:00:00为开始时间进行查询 */
      start_date: string
      /** 查询的截止操作日期，格式 "YYYY-MM-DD"，不带时分秒，包含end_date传入的时间，系统会以end_date的23:59:59为截止时间进行查询。查询截止日期应大于起始日期，起止日期跨度最大为366天 */
      end_date: string
    }

    export interface QueryOperationLogsQuery extends Pagination {
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface QueryOperationLogsResponse {
      /** 操作日志列表 */
      op_logs?: Lark.OrganizationOpLog[]
      /** 下一页token */
      next_page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
    }

    export interface CreateRequest {
      /** 子类型 */
      sub_type?: Lark.Enum
      /** 部门负责人 */
      manager?: string
      /** 是否保密 */
      is_confidential?: boolean
      /** 层级关系，内层字段见实体 */
      hiberarchy_common: Lark.HiberarchyCommon
      /** 生效时间 */
      effective_time: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 成本中心id */
      cost_center_id?: string
      /** 是否使用职务 */
      staffing_model?: Lark.Enum
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface CreateResponse {
      department?: Lark.DepartmentCreate
    }

    export interface PatchRequest {
      /** 实体在CoreHR内部的唯一键 */
      id?: string
      /** 子类型 */
      sub_type?: Lark.Enum
      /** 部门负责人 */
      manager?: string
      /** 是否保密 */
      is_confidential?: boolean
      /** 层级关系，内层字段见实体 */
      hiberarchy_common?: Lark.HiberarchyCommon
      /** 生效时间 */
      effective_time: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 成本中心id */
      cost_center_id?: string
      /** 是否使用职务 */
      staffing_model?: Lark.Enum
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface ParentsRequest {
      /** 部门 ID 列表，一次性最多传入 100 个部门 ID */
      department_id_list: string[]
    }

    export interface ParentsQuery {
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface ParentsResponse {
      /** 父部门查询结果 */
      items?: Lark.DepartmentParents[]
    }

    export interface BatchGetRequest {
      /** 部门 ID 列表 */
      department_id_list?: string[]
      /** 返回数据的字段列表 */
      fields?: string[]
      /** 部门名称精确匹配，最多传100个 */
      department_name_list?: string[]
    }

    export interface BatchGetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface BatchGetResponse {
      /** 查询的部门信息 */
      items?: Lark.Department[]
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，格式 "yyyy-MM-dd"，不带时分秒，包含 start_date 传入的时间, 系统会以 start_date 的 00:00:00 查询。 */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd"，不带时分秒， 查询日期小于 end_data + 1 天的 00:00:00。 */
      end_date: string
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface QueryRecentChangeResponse {
      /** 部门 ID 列表 */
      department_ids?: string[]
      /** 目标查询时间范围内被删除的部门列表 */
      deleted_department_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
    }

    export interface QueryTimelineRequest {
      /** 部门 ID 列表 */
      department_ids: string[]
      /** 生效日期 */
      effective_date: string
      /** 返回数据的字段列表，可选["department_name", "code", "active", "parent_department_id", "manager", "description", "effective_date"] */
      fields?: string[]
    }

    export interface QueryTimelineQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface QueryTimelineResponse {
      /** 部门信息 */
      items?: Lark.DepartmentTimeline[]
    }

    export interface TreeRequest {
      /** 部门 ID，默认根部门 */
      department_id?: string
      /** 是否包含失效部门，默认false */
      need_inactive?: boolean
      /** 生效日期，格式yyyy-mm-dd，默认当前日期 */
      effective_date?: string
    }

    export interface TreeQuery extends Pagination {
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface QueryMultiTimelineRequest {
      /** 部门 ID 列表 */
      department_ids: string[]
      /** 生效日期开始(包含) */
      effective_date_start?: string
      /** 生效日期结束(包含) */
      effective_date_end?: string
      /** 返回数据的字段列表，可选["department_name", "code", "active", "parent_department_id", "manager", "description", "effective_date"], 以及自定义字段field_name */
      fields?: string[]
    }

    export interface QueryMultiTimelineQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface SearchRequest {
      /** 是否启用 */
      active?: boolean
      /** 当通过上级部门 ID 查询时，填写 true 返回所有子部门，填写 false 只返回直接下级部门 */
      get_all_children?: boolean
      /**
       * manager ID 列表
       * **字段权限要求：按照部门负责人搜索 (corehr:department.manager.search:read)**
       */
      manager_list?: string[]
      /** 部门 ID 列表 */
      department_id_list?: string[]
      /** 部门名称列表，需精确匹配 */
      name_list?: string[]
      /**
       * 上级部门 ID ，可查询直接下级部门
       * **字段权限要求：按照上级部门搜索 (corehr:department.organize.search:read) **
       */
      parent_department_id?: string
      /** 部门 code 列表 */
      code_list?: string[]
      /** 返回数据的字段列表 */
      fields?: string[]
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface DeleteQuery {
      /** 此次删除中所使用的部门ID类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface GetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface GetResponse {
      /** 部门信息 */
      department?: Lark.Department
    }

    export interface ListQuery extends Pagination {
      /** 部门ID列表 */
      department_id_list?: string[]
      /** 部门名称列表，需精确匹配 */
      name_list?: string[]
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }
  }

  export namespace Location {
    export interface Methods {
      address: Address.Methods
      /**
       * 创建地点
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新地点
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/patch
       */
      patch(location_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
      /**
       * 查询单个地点
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/get
       */
      get(location_id: string): Promise<GetResponse>
      /**
       * 查询当前生效信息发生变更的地点
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 通过地点 ID 批量获取地点信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/batch_get
       */
      batchGet(body: BatchGetRequest): Promise<BatchGetResponse>
      /**
       * 批量分页查询地点信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list
       */
      list(query?: Pagination): Paginated<Lark.Location>
      /**
       * 启用/停用地点
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/active
       */
      active(body: ActiveRequest): Promise<void>
      /**
       * 删除地点
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/delete
       */
      delete(location_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 层级关系，内层字段见实体 */
      hiberarchy_common: Lark.HiberarchyCommon
      /** 地点用途 */
      location_usage_list?: Lark.Enum[]
      /** 地址 */
      address?: Lark.Address[]
      /** 工时制度 */
      working_hours_type_id?: string
      /** 生效时间 */
      effective_time: string
      /** 区域设置 */
      locale?: Lark.Enum
      /** 时区 */
      time_zone_id?: string
      /** 默认显示语言 */
      display_language_id?: string
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      location?: Lark.Location
    }

    export interface PatchRequest {
      /** 上级地点 ID */
      parent_id?: string
      /** 地点名称 */
      names?: Lark.I18n[]
      /** 是否启用 */
      active?: boolean
      /** 生效时间 */
      effective_time: string
      /** 地点编码 */
      code?: string
      /** 地点描述 */
      descriptions?: Lark.I18n[]
      /** 地点用途 */
      location_usages?: Lark.Enum[]
      /** 工时制度 ID */
      working_hours_type_id?: string
      /** 区域设置 */
      locale?: Lark.Enum
      /** 时区 ID */
      time_zone_id?: string
      /** 默认显示语言 ID */
      display_language_id?: string
    }

    export interface PatchQuery {
      /** 根据 client_token 是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface GetResponse {
      /** 地点信息 */
      location?: Lark.Location
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 地点 ID 列表 */
      location_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的地点 ID 列表 */
      deleted_location_ids?: string[]
    }

    export interface BatchGetRequest {
      /** 地点 ID 列表 */
      location_ids: string[]
    }

    export interface BatchGetResponse {
      /** 查询的地点信息 */
      items?: Lark.Location[]
    }

    export interface ActiveRequest {
      /** 地点 ID */
      location_id: string
      /** 生效时间 */
      effective_time: string
      /** 启用停用状态 */
      active: boolean
      /** 操作原因 */
      operation_reason: string
    }

    export namespace Address {
      export interface Methods {
        /**
         * 删除地点地址
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/delete
         */
        delete(location_id: string, address_id: string): Promise<void>
        /**
         * 更新地点地址
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/patch
         */
        patch(location_id: string, address_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
        /**
         * 添加地点地址
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/create
         */
        create(location_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      }

      export interface PatchRequest {
        /** 国家 / 地区 */
        country_region_id?: string
        /** 主要行政区 */
        region_id?: string
        /** 城市 */
        city_id?: string
        /** 区 / 县 */
        distinct_id?: string
        /** 地址行 1（非拉丁语系的本地文字） */
        local_address_line1?: string
        /** 地址行 2（非拉丁语系的本地文字） */
        local_address_line2?: string
        /** 地址行 3（非拉丁语系的本地文字） */
        local_address_line3?: string
        /** 地址行 4（非拉丁语系的本地文字） */
        local_address_line4?: string
        /** 地址行 5（非拉丁语系的本地文字） */
        local_address_line5?: string
        /** 地址行 6（非拉丁语系的本地文字） */
        local_address_line6?: string
        /** 地址行 7（非拉丁语系的本地文字） */
        local_address_line7?: string
        /** 地址行 8（非拉丁语系的本地文字） */
        local_address_line8?: string
        /** 地址行 9（非拉丁语系的本地文字） */
        local_address_line9?: string
        /** 邮政编码 */
        postal_code?: string
        /** 地址类型，枚举值及详细信息可通过【枚举常量介绍】查询获得 */
        address_types?: Lark.Enum[]
        /** 是否主要地址 */
        is_primary?: boolean
        /** 是否公开地址 */
        is_public?: boolean
      }

      export interface PatchQuery {
        /** 根据 client_token 是否一致来判断是否为同一请求 */
        client_token?: string
      }

      export interface CreateRequest {
        /** 国家 / 地区 */
        country_region_id: string
        /** 主要行政区 */
        region_id: string
        /** 城市 */
        city_id: string
        /** 区 / 县 */
        distinct_id: string
        /** 地址行 1（非拉丁语系的本地文字） */
        local_address_line1?: string
        /** 地址行 2（非拉丁语系的本地文字） */
        local_address_line2?: string
        /** 地址行 3（非拉丁语系的本地文字） */
        local_address_line3?: string
        /** 地址行 4（非拉丁语系的本地文字） */
        local_address_line4?: string
        /** 地址行 5（非拉丁语系的本地文字） */
        local_address_line5?: string
        /** 地址行 6（非拉丁语系的本地文字） */
        local_address_line6?: string
        /** 地址行 7（非拉丁语系的本地文字） */
        local_address_line7?: string
        /** 地址行 8（非拉丁语系的本地文字） */
        local_address_line8?: string
        /** 地址行 9（非拉丁语系的本地文字） */
        local_address_line9?: string
        /** 邮政编码 */
        postal_code?: string
        /** 地址类型，枚举值及详细信息可通过【枚举常量介绍】查询获得 */
        address_types?: Lark.Enum[]
        /** 是否主要地址 */
        is_primary?: boolean
        /** 是否公开地址 */
        is_public?: boolean
      }

      export interface CreateQuery {
        /** 根据 client_token 是否一致来判断是否为同一请求 */
        client_token?: string
      }

      export interface CreateResponse {
        /** 地址 ID */
        address_id?: string
      }
    }
  }

  export namespace Company {
    export interface Methods {
      /**
       * 创建公司
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新公司
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/patch
       */
      patch(company_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 启用/停用公司
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/active
       */
      active(body: ActiveRequest): Promise<void>
      /**
       * 查询单个公司
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/get
       */
      get(company_id: string): Promise<GetResponse>
      /**
       * 批量查询公司
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list
       */
      list(query?: Pagination): Paginated<Lark.Company>
      /**
       * 查询当前生效信息变更公司
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 通过公司 ID 批量获取公司信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/batch_get
       */
      batchGet(body: BatchGetRequest): Promise<BatchGetResponse>
      /**
       * 删除公司
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/delete
       */
      delete(company_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 层级关系，内层字段见实体 */
      hiberarchy_common: Lark.HiberarchyCommon
      /** 性质 */
      type?: Lark.Enum
      /** 行业 */
      industry_list?: Lark.Enum[]
      /** 法定代表人 */
      legal_representative?: Lark.I18n[]
      /** 邮编 */
      post_code?: string
      /** 纳税人识别号 */
      tax_payer_id?: string
      /** confidential */
      confidential?: boolean
      /** 主体类型 */
      sub_type_list?: Lark.Enum[]
      /** 是否为分公司 */
      branch_company?: boolean
      /** 主要负责人 */
      primary_manager?: Lark.I18n[]
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 默认币种 */
      currency?: Lark.Currency
      /** 电话 */
      phone?: Lark.PhoneNumberAndAreaCode
      /** 传真 */
      fax?: Lark.PhoneNumberAndAreaCode
      /** 注册地址详细信息 */
      registered_office_address_info?: Lark.Address
      /** 办公地址详细信息 */
      office_address_info?: Lark.Address
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      company?: Lark.Company
    }

    export interface PatchRequest {
      /** 层级关系，内层字段见实体 */
      hiberarchy_common?: Lark.HiberarchyCommon
      /** 性质 */
      type?: Lark.Enum
      /** 行业 */
      industry_list?: Lark.Enum[]
      /** 法定代表人 */
      legal_representative?: Lark.I18n[]
      /** 邮编 */
      post_code?: string
      /** 纳税人识别号 */
      tax_payer_id?: string
      /** confidential */
      confidential?: boolean
      /** 主体类型 */
      sub_type_list?: Lark.Enum[]
      /** 是否为分公司 */
      branch_company?: boolean
      /** 主要负责人 */
      primary_manager?: Lark.I18n[]
      /** 默认币种 */
      currency?: Lark.Currency
      /** 电话 */
      phone?: Lark.PhoneNumberAndAreaCode
      /** 传真 */
      fax?: Lark.PhoneNumberAndAreaCode
      /** 注册地址详细信息 */
      registered_office_address_info?: Lark.Address
      /** 办公地址详细信息 */
      office_address_info?: Lark.Address
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      company?: Lark.Company
    }

    export interface ActiveRequest {
      /** 公司ID */
      company_id: string
      /** 生效时间 */
      effective_time: string
      /** 启用停用状态 */
      active: boolean
      /** 操作原因 */
      operation_reason: string
    }

    export interface GetResponse {
      /** 公司信息 */
      company?: Lark.Company
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 公司 ID 列表 */
      company_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的公司 ID 列表 */
      deleted_company_ids?: string[]
    }

    export interface BatchGetRequest {
      /** 公司 ID 列表 */
      company_ids: string[]
    }

    export interface BatchGetResponse {
      /** 查询的公司信息 */
      items?: Lark.Company[]
    }
  }

  export namespace CostCenter {
    export interface Methods {
      version: Version.Methods
      /**
       * 创建成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 启用 / 停用成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/patch
       */
      patch(cost_center_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 查询当前生效信息发生变更的成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 搜索成本中心信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.CostCenterVersion>
      /**
       * 删除成本中心
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/delete
       */
      delete(cost_center_id: string, body: DeleteRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 成本中心名称 */
      name: Lark.I18n[]
      /** 编码 */
      code?: string
      /** 上级成本中心ID */
      parent_cost_center_id?: string
      /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
      managers?: string[]
      /** 成本中心描述 */
      description?: Lark.I18n[]
      /** 生效时间 */
      effective_time: string
    }

    export interface CreateQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface CreateResponse {
      cost_center?: Lark.CostCenter
    }

    export interface PatchRequest {
      /** 生效时间 */
      effective_time: string
      /** 启用停用状态 */
      active: boolean
      /** 操作原因 */
      operation_reason: string
    }

    export interface PatchQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface PatchResponse {
      cost_center?: Lark.CostCenter
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 成本中心 ID 列表 */
      cost_center_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的成本中心 ID 列表 */
      deleted_cost_center_ids?: string[]
    }

    export interface SearchRequest {
      /** 成本中心ID 列表 */
      cost_center_id_list?: string[]
      /** 成长中心名称列表，精确匹配 */
      name_list?: string[]
      /** 成本中心编码 */
      code?: string
      /** 上级成本中心ID，可用于查询直接下级成本中心 */
      parent_cost_center_id?: string
      /** 是否获取所有陈本中心版本 */
      get_all_version?: boolean
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface DeleteRequest {
      /** 操作原因 */
      operation_reason: string
    }

    export namespace Version {
      export interface Methods {
        /**
         * 创建成本中心版本
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/create
         */
        create(cost_center_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 更正成本中心版本
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/patch
         */
        patch(cost_center_id: string, version_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
        /**
         * 撤销成本中心版本
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/delete
         */
        delete(cost_center_id: string, version_id: string, body: DeleteRequest): Promise<void>
      }

      export interface CreateRequest {
        /** 成本中心名称 */
        name: Lark.I18n[]
        /** 上级成本中心ID */
        parent_cost_center_id?: string
        /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
        managers?: string[]
        /** 成本中心描述 */
        description?: Lark.I18n[]
        /** 生效时间 */
        effective_time: string
        /** 操作原因 */
        operation_reason: string
      }

      export interface CreateQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      }

      export interface CreateResponse {
        version?: Lark.CostCenterVersion
      }

      export interface PatchRequest {
        /** 成本中心名称 */
        name?: Lark.I18n[]
        /** 上级成本中心ID */
        parent_cost_center_id?: string
        /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
        managers?: string[]
        /** 成本中心描述 */
        description?: Lark.I18n[]
        /** 生效时间 */
        effective_time: string
        /** 操作原因 */
        operation_reason: string
      }

      export interface PatchQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      }

      export interface PatchResponse {
        version?: Lark.CostCenterVersion
      }

      export interface DeleteRequest {
        /** 操作原因 */
        operation_reason: string
      }
    }
  }

  export namespace CustomOrg {
    export interface Methods {
      /**
       * 创建自定义组织
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新自定义组织信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/patch
       */
      patch(org_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
      /**
       * 更新自定义组织的匹配规则
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/update_rule
       */
      updateRule(body: UpdateRuleRequest): Promise<void>
      /**
       * 启用/停用自定义组织
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/active
       */
      active(body: ActiveRequest): Promise<void>
      /**
       * 查询自定义组织信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.CustomOrg>
      /**
       * 查询当前生效信息变更的自定义组织
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 删除自定义组织
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/custom_org/delete_org
       */
      deleteOrg(body: DeleteOrgRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 组织类型编码 */
      object_api_name: string
      /** 组织名称 */
      names: Lark.I18n[]
      /** 编码 */
      code?: string
      /** 上级组织 ID */
      parent_id?: string
      /** 负责人ID 列表 */
      manager_ids?: string[]
      /** 描述 */
      description?: Lark.I18n[]
      /** 生效时间 */
      effective_time: string
      /** 组织角色 */
      org_roles?: Lark.OrgRoleUpdate[]
      /** 匹配规则组 ，组间并集 */
      match_rule_groups?: Lark.MatchRules[]
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
    }

    export interface CreateResponse {
      /** 组织ID */
      org_id?: string
    }

    export interface PatchRequest {
      /** 组织类型编码 */
      object_api_name: string
      /** 组织名称 */
      names?: Lark.I18n[]
      /** 组织编码 */
      code?: string
      /** 上级组织 ID */
      parent_id?: string
      /** 负责人ID 列表 */
      manager_ids?: string[]
      /** 描述 */
      description?: Lark.I18n[]
      /** 生效时间 */
      effective_time: string
      /** 组织角色 */
      org_roles?: Lark.OrgRoleUpdate[]
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface UpdateRuleRequest {
      /** 组织类型编码 */
      object_api_name: string
      /** 组织ID */
      org_id: string
      /** 匹配规则组，组间并集 */
      match_rule_groups?: Lark.MatchRules[]
    }

    export interface ActiveRequest {
      /** 组织ID */
      org_id: string
      /** 组织类型编码 */
      object_api_name: string
      /** 启用停用状态 */
      active: boolean
      /** 生效时间 */
      effective_time: string
    }

    export interface QueryRequest {
      /** 组织类型编码 */
      object_api_name: string
      /** 返回基础数据的字段列表 */
      org_fields?: string[]
      /** 返回org_role数据的字段列表 */
      org_role_fields?: string[]
      /** 组织ID列表 */
      org_ids?: string[]
      /** 组织编码 */
      code?: string
      /** 上级组织ID */
      parent_id?: string
      /** 是否启用 */
      active?: boolean
      /** 是否返回匹配规则 */
      need_match_rule?: boolean
    }

    export interface QueryQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 组织类型编码，可在「飞书人事-设置-组织设置」中相应的自定义组织目录下查看 */
      object_api_name: string
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 自定义组织 ID 列表 */
      custom_org_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的自定义组织 ID 列表 */
      deleted_custom_org_ids?: string[]
    }

    export interface DeleteOrgRequest {
      /** 组织ID */
      org_id: string
      /** 组织类型编码 */
      object_api_name: string
    }
  }

  export namespace Draft {
    export interface Methods {
      /**
       * 根据组织架构调整 ID 查询发起的流程信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/draft/get
       */
      get(draft_id: string, query?: GetQuery): Promise<GetResponse>
    }

    export interface GetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface GetResponse {
      /** 组织架构调整 ID */
      draft_id?: string
      /** 组织架构调整状态 */
      draft_status?: '0' | '1' | '2' | '3'
      /** 组织架构调整流程信息列表 */
      process_infos?: Lark.ProcessInfo[]
    }
  }

  export namespace ApprovalGroups {
    export interface Methods {
      /**
       * 批量查询岗位调整内容
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_position_change_list_by_ids
       */
      openQueryPositionChangeListByIds(body: OpenQueryPositionChangeListByIdsRequest, query?: OpenQueryPositionChangeListByIdsQuery): Promise<OpenQueryPositionChangeListByIdsResponse>
      /**
       * 根据流程 ID 查询组织架构调整记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/get
       */
      get(process_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 批量查询部门调整内容
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_department_change_list_by_ids
       */
      openQueryDepartmentChangeListByIds(body: OpenQueryDepartmentChangeListByIdsRequest, query?: OpenQueryDepartmentChangeListByIdsQuery): Promise<OpenQueryDepartmentChangeListByIdsResponse>
      /**
       * 批量查询人员调整内容
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_job_change_list_by_ids
       */
      openQueryJobChangeListByIds(body: OpenQueryJobChangeListByIdsRequest, query?: OpenQueryJobChangeListByIdsQuery): Promise<OpenQueryJobChangeListByIdsResponse>
    }

    export interface OpenQueryPositionChangeListByIdsRequest {
      /** 岗位调整记录 ID List */
      position_change_ids?: string[]
      /** 是否返回部门全路径 */
      need_department_path?: boolean
    }

    export interface OpenQueryPositionChangeListByIdsQuery {
      /** 组织架构调整流程 ID */
      process_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface OpenQueryPositionChangeListByIdsResponse {
      /** 岗位调整记录信息列表 */
      position_changes?: Lark.PositionChange[]
    }

    export interface GetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface GetResponse {
      /** 组织架构调整流程信息 */
      approval_group?: Lark.ApprovalGroup
    }

    export interface OpenQueryDepartmentChangeListByIdsRequest {
      /** 部门调整记录 ID List */
      department_change_ids?: string[]
      /** 是否返回部门全路径 */
      need_department_path?: boolean
    }

    export interface OpenQueryDepartmentChangeListByIdsQuery {
      /** 组织架构调整流程 ID */
      process_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface OpenQueryDepartmentChangeListByIdsResponse {
      /** 部门调整记录信息列表 */
      department_changes?: Lark.DepartmentChange[]
    }

    export interface OpenQueryJobChangeListByIdsRequest {
      /** 人员异动记录 ID List */
      job_change_ids?: string[]
      /** 是否返回部门全路径 */
      need_department_path?: boolean
    }

    export interface OpenQueryJobChangeListByIdsQuery {
      /** 组织架构调整流程 ID */
      process_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface OpenQueryJobChangeListByIdsResponse {
      /** 人员异动记录信息列表 */
      job_changes?: Lark.JobChange[]
    }
  }

  export namespace JobFamily {
    export interface Methods {
      /**
       * 创建序列
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新序列
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/patch
       */
      patch(job_family_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 查询单个序列
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/get
       */
      get(job_family_id: string): Promise<GetResponse>
      /**
       * 批量查询序列
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list
       */
      list(query?: Pagination): Paginated<Lark.JobFamily>
      /**
       * 查询当前生效信息发生变更的序列
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 根据条件批量获取序列信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/batch_get
       */
      batchGet(body: BatchGetRequest): Promise<BatchGetResponse>
      /**
       * 查询指定时间范围序列版本
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/query_multi_timeline
       */
      queryMultiTimeline(body: QueryMultiTimelineRequest): Promise<QueryMultiTimelineResponse>
      /**
       * 删除序列
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/delete
       */
      delete(job_family_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 名称 */
      name: Lark.I18n[]
      /** 启用 */
      active: boolean
      /** 上级序列 */
      parent_id?: string
      /** 生效时间 */
      effective_time: string
      /** 编码 */
      code?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      job_family?: Lark.JobFamily
    }

    export interface PatchRequest {
      /** 名称 */
      name?: Lark.I18n[]
      /** 启用 */
      active?: boolean
      /** 上级序列 */
      parent_id?: string
      /** 生效时间 */
      effective_time?: string
      /** 编码 */
      code?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      job_family?: Lark.JobFamily
    }

    export interface GetResponse {
      /** 职务序列信息 */
      job_family?: Lark.JobFamily
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 序列 ID 列表 */
      job_family_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的序列 ID 列表 */
      deleted_job_family_ids?: string[]
    }

    export interface BatchGetRequest {
      /** 序列 ID 列表 */
      job_family_ids: string[]
    }

    export interface BatchGetResponse {
      /** 查询的序列信息 */
      items?: Lark.JobFamily[]
    }

    export interface QueryMultiTimelineRequest {
      /** 序列 ID 列表 */
      job_family_ids: string[]
      /** 查询开始时间（包含） */
      start_date?: string
      /** 查询结束时间(包含) */
      end_date?: string
      /** 返回数据的字段列表，可选["job_family_name", "code", "active", "parent_job_family_id", "description", "effective_date"] */
      fields?: string[]
    }

    export interface QueryMultiTimelineResponse {
      /** 序列信息 */
      items?: Lark.JobFamilyTimeline[]
    }
  }

  export namespace JobLevel {
    export interface Methods {
      /**
       * 新建职级
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新单个职级
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/patch
       */
      patch(job_level_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 查询单个职级
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/get
       */
      get(job_level_id: string): Promise<GetResponse>
      /**
       * 批量查询职级
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list
       */
      list(query?: Pagination): Paginated<Lark.JobLevel>
      /**
       * 查询当前生效信息发生变更的职级
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 根据条件批量获取职级信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/batch_get
       */
      batchGet(body: BatchGetRequest): Promise<BatchGetResponse>
      /**
       * 删除职级
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/delete
       */
      delete(job_level_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 职级数值 */
      level_order: number
      /** 编码 */
      code?: string
      /** 名称 */
      name: Lark.I18n[]
      /** 描述 */
      description?: Lark.I18n[]
      /** 启用 */
      active: boolean
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 职等 ID 列表 */
      job_grade?: string[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      job_level?: Lark.JobLevel
    }

    export interface PatchRequest {
      /** 职级数值 */
      level_order?: number
      /** 编码 */
      code?: string
      /** 名称 */
      name?: Lark.I18n[]
      /** 描述 */
      description?: Lark.I18n[]
      /** 启用 */
      active?: boolean
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 职等 ID 列表 */
      job_grade?: string[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      job_level?: Lark.JobLevel
    }

    export interface GetResponse {
      /** 职务级别信息 */
      job_level?: Lark.JobLevel
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 职级 ID 列表 */
      job_level_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的职级 ID 列表 */
      deleted_job_level_ids?: string[]
    }

    export interface BatchGetRequest {
      /** 职级 ID 列表 */
      job_level_ids: string[]
    }

    export interface BatchGetResponse {
      /** 查询的职级信息 */
      items?: Lark.JobLevel[]
    }
  }

  export namespace JobGrade {
    export interface Methods {
      /**
       * 创建职等
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新职等
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/patch
       */
      patch(job_grade_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
      /**
       * 查询职等
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query
       */
      query(body: QueryRequest, query?: Pagination): Paginated<Lark.JobGrade>
      /**
       * 查询当前生效信息发生变更的职等
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 删除职等
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/delete
       */
      delete(job_grade_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 职等数值 */
      grade_order: number
      /** 编码 */
      code?: string
      /** 名称 */
      names: Lark.I18n[]
      /** 描述 */
      descriptions?: Lark.I18n[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      /** 职等ID */
      grade_id?: string
    }

    export interface PatchRequest {
      /** 职等数值 */
      grade_order?: number
      /** 编码 */
      code?: string
      /** 名称 */
      names?: Lark.I18n[]
      /** 描述 */
      descriptions?: Lark.I18n[]
      /** 启用 */
      active?: boolean
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface QueryRequest {
      /** 职等ID列表 */
      ids?: string[]
      /** 职等code列表 */
      codes?: string[]
      /** 是否启用 */
      active?: boolean
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 职等 ID 列表 */
      job_grade_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的职等 ID 列表 */
      deleted_job_grade_ids?: string[]
    }
  }

  export namespace Pathway {
    export interface Methods {
      /**
       * 创建通道
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pathway/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新通道
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pathway/patch
       */
      patch(pathway_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
      /**
       * 删除通道
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pathway/delete
       */
      delete(pathway_id: string): Promise<void>
      /**
       * 启停用通道
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pathway/active
       */
      active(body: ActiveRequest): Promise<void>
      /**
       * 获取通道信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pathway/batch_get
       */
      batchGet(body: BatchGetRequest): Promise<BatchGetResponse>
    }

    export interface CreateRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      names: Lark.I18n[]
      /** 描述 */
      descriptions?: Lark.I18n[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      /** 通道ID */
      pathway_id?: string
    }

    export interface PatchRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      names?: Lark.I18n[]
      /** 描述 */
      descriptions?: Lark.I18n[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface ActiveRequest {
      /** 通道ID */
      pathway_id: string
      /** 启用停用状态 */
      active: boolean
    }

    export interface BatchGetRequest {
      /** 通道 ID 列表 */
      pathway_ids: string[]
    }

    export interface BatchGetResponse {
      /** 查询的通道信息 */
      items?: Lark.Pathway[]
    }
  }

  export namespace Job {
    export interface Methods {
      /**
       * 创建职务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除职务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/delete
       */
      delete(job_id: string): Promise<void>
      /**
       * 更新职务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/patch
       */
      patch(job_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 查询单个职务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/get
       */
      get(job_id: string): Promise<GetResponse>
      /**
       * 批量查询职务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list
       */
      list(query?: ListQuery): Paginated<Lark.Job>
      /**
       * 根据条件批量获取职务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/batch_get
       */
      batchGet(body: BatchGetRequest, query?: BatchGetQuery): Promise<BatchGetResponse>
      /**
       * 查询指定时间范围职务版本
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/query_multi_timeline
       */
      queryMultiTimeline(body: QueryMultiTimelineRequest): Promise<QueryMultiTimelineResponse>
      /**
       * 查询当前生效信息发生变更的职务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
    }

    export interface CreateRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      name: Lark.I18n[]
      /** 描述 */
      description?: Lark.I18n[]
      /** 启用 */
      active: boolean
      /** 职务头衔 */
      job_title?: Lark.I18n[]
      /** 序列 */
      job_family_id_list?: string[]
      /** 职级 */
      job_level_id_list?: string[]
      /** 工时制度，引用WorkingHoursType的ID */
      working_hours_type_id?: string
      /** 生效时间 */
      effective_time: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      job?: Lark.Job
    }

    export interface PatchRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      name?: Lark.I18n[]
      /** 描述 */
      description?: Lark.I18n[]
      /** 启用 */
      active?: boolean
      /** 职务头衔 */
      job_title?: Lark.I18n[]
      /** 序列 */
      job_family_id_list?: string[]
      /** 职级 */
      job_level_id_list?: string[]
      /** 工时制度，引用WorkingHoursType的ID */
      working_hours_type_id?: string
      /** 生效时间 */
      effective_time?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      job?: Lark.Job
    }

    export interface GetResponse {
      /** 职务信息 */
      job?: Lark.Job
    }

    export interface ListQuery extends Pagination {
      /** 名称 */
      name?: string
      /** 语言 */
      query_language?: string
    }

    export interface BatchGetRequest {
      /** 职务 ID 列表 */
      job_ids?: string[]
      /** 职务 Code 列表 */
      job_codes?: string[]
      /** 返回数据的字段列表 */
      fields?: string[]
    }

    export interface BatchGetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface BatchGetResponse {
      /** 查询的职务信息 */
      items?: Lark.Job[]
    }

    export interface QueryMultiTimelineRequest {
      /** 职务 ID 列表 */
      job_ids: string[]
      /** 查询开始时间（包含） */
      start_date?: string
      /** 查询结束时间(包含) */
      end_date?: string
      /** 返回数据的字段列表，可选["job_name", "code", "active", "parent_job", "description", "effective_date", "expiration_date"] */
      fields?: string[]
    }

    export interface QueryMultiTimelineResponse {
      /** 职务信息 */
      items?: Lark.JobTimeline[]
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 职务 ID 列表 */
      job_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的职务 ID 列表 */
      deleted_job_ids?: string[]
    }
  }

  export namespace Position {
    export interface Methods {
      /**
       * 创建岗位信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/position/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新岗位信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/position/patch
       */
      patch(position_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
      /**
       * 查询岗位信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/position/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.Position>
      /**
       * 查询指定时范围内当前版本信息发生变更的岗位
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/position/query_recent_change
       */
      queryRecentChange(query?: QueryRecentChangeQuery): Promise<QueryRecentChangeResponse>
      /**
       * 启停用岗位
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/position/active
       */
      active(body: ActiveRequest): Promise<void>
      /**
       * 删除岗位
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/position/del_position
       */
      delPosition(body: DelPositionRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      names: Lark.I18n[]
      /** 描述 */
      descriptions?: Lark.I18n[]
      /** 序列 */
      job_family_ids?: string[]
      /** 成本中心 */
      cost_center_id?: string
      /** 职务 */
      job_id: string
      /** 职级 */
      job_level_ids?: string[]
      /** 人员类型 */
      employee_type_ids?: string[]
      /** 职等 */
      job_grade_ids?: string[]
      /** 工作地点 */
      work_location_ids?: string[]
      /** 工时制度 */
      working_hours_type_id?: string
      /** 部门 */
      department_id: string
      /** 直属上级岗位 */
      direct_leader_id?: string
      /** 虚线上级岗位 */
      dotted_line_leader_id?: string
      /** 是否关键岗位 */
      is_key_position?: boolean
      /** 生效日期 */
      effective_time: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface CreateResponse {
      /** 岗位ID */
      position_id?: string
    }

    export interface PatchRequest {
      /** 编码 */
      code?: string
      /** 名称 */
      names?: Lark.I18n[]
      /** 描述 */
      descriptions?: Lark.I18n[]
      /** 序列 */
      job_family_ids?: string[]
      /** 成本中心 */
      cost_center_id?: string
      /** 职务 */
      job_id?: string
      /** 职级 */
      job_level_ids?: string[]
      /** 人员类型 */
      employee_type_ids?: string[]
      /** 职等 */
      job_grade_ids?: string[]
      /** 工作地点 */
      work_location_ids?: string[]
      /** 工时制度 */
      working_hours_type_id?: string
      /** 部门 */
      department_id?: string
      /** 直属上级岗位 */
      direct_leader_id?: string
      /** 虚线上级岗位 */
      dotted_line_leader_id?: string
      /** 是否关键岗位 */
      is_key_position?: boolean
      /** 生效日期 */
      effective_time: string
      /** 自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface QueryRequest {
      /** 部门 ID 列表 */
      department_ids?: string[]
      /** 生效日期 */
      effective_time?: string
      /** 启停用状态 */
      active?: boolean
      /** 返回数据的字段列表 */
      fields?: string[]
      /** 岗位 ID 列表 */
      position_ids?: string[]
      /** 岗位 Code 列表 */
      position_codes?: string[]
    }

    export interface QueryQuery extends Pagination {
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface QueryRecentChangeQuery extends Pagination {
      /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
      start_date: string
      /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
      end_date: string
    }

    export interface QueryRecentChangeResponse {
      /** 岗位 ID 列表 */
      position_ids?: string[]
      /** 下一页页码 */
      page_token?: string
      /** 是否有下一页 */
      has_more?: boolean
      /** 删除的岗位 ID 列表 */
      deleted_position_ids?: string[]
    }

    export interface ActiveRequest {
      /** 岗位ID */
      position_id: string
      /** 启用停用状态 */
      active: boolean
      /** 生效时间 */
      effective_time: string
    }

    export interface DelPositionRequest {
      /** 岗位ID */
      position_id: string
    }
  }

  export namespace PreHire {
    export interface Methods {
      /**
       * 撤销入职
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/withdraw_onboarding
       */
      withdrawOnboarding(body: WithdrawOnboardingRequest): Promise<WithdrawOnboardingResponse>
      /**
       * 恢复入职
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/restore_flow_instance
       */
      restoreFlowInstance(body: RestoreFlowInstanceRequest): Promise<RestoreFlowInstanceResponse>
      /**
       * 直接创建待入职
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新待入职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/patch
       */
      patch(pre_hire_id: string, body: PatchRequest): Promise<PatchResponse>
      /**
       * 删除待入职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/delete
       */
      delete(pre_hire_id: string): Promise<void>
      /**
       * 查询待入职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.PreHire>
      /**
       * 搜索待入职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.PreHire>
      /**
       * 流转入职任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/transit_task
       */
      transitTask(pre_hire_id: string, body: TransitTaskRequest): Promise<TransitTaskResponse>
      /**
       * 流转入职任务
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/transform_onboarding_task
       */
      transformOnboardingTask(body: TransformOnboardingTaskRequest): Promise<TransformOnboardingTaskResponse>
      /**
       * 操作员工完成入职
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/complete
       */
      complete(pre_hire_id: string): Promise<CompleteResponse>
      /**
       * 查询单个待入职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/get
       */
      get(pre_hire_id: string): Promise<GetResponse>
      /**
       * 批量查询待入职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/list
       */
      list(query?: ListQuery): Paginated<Lark.PreHireQuery>
    }

    export interface WithdrawOnboardingRequest {
      /** 待入职ID，可从待入职列表接口获取 */
      pre_hire_id: string
      /** 撤销原因 */
      withdraw_reason: string
    }

    export interface WithdrawOnboardingResponse {
      /** 是否成功撤销入职 */
      success?: boolean
    }

    export interface RestoreFlowInstanceRequest {
      /** 待入职ID，可从待入职列表接口获取 */
      pre_hire_id: string
      /** 是否强制占编；true为强制占编；false为非强制占编 */
      confirm_workforce?: boolean
    }

    export interface RestoreFlowInstanceResponse {
      /** 是否成功恢复入职 */
      success?: boolean
    }

    export interface CreateRequest {
      /** 个人信息 */
      basic_info: Lark.BasicInfo
      /** 职位信息 */
      offer_info: Lark.OfferInfo
      /** 教育经历 */
      education_info?: Lark.EducationInfo[]
      /** 工作经历 */
      work_experience?: Lark.WorkExperience[]
      /** 招聘应用ID */
      ats_application_id?: string
      /** 外部业务唯一编码 */
      out_biz_id?: string
    }

    export interface CreateResponse {
      /** 待入职 ID */
      pre_hire_id?: string
    }

    export interface PatchRequest {
      /** 更新个人（person）信息 */
      basic_info_update?: Lark.BasicInfoUpdate
      /** 更新待入职（prehire）信息 */
      offer_info_update?: Lark.OfferInfoUpdate
      /**
       * 指定需要更新的系统字段，只支持最多下钻一层，格式如下：
       * - basic_info_update字段：basic_info_update.name（对name整体进行覆盖更新）；basic_info_update.emails（对邮箱整体进行更新）
       * - offer_info_update字段：offer_info_update.onboarding_method
       * - 招聘ID：ats_application_id
       */
      standard_update_fields?: string[]
      /**
       * 指定需要更新的PreHire对象上的自定义字段，格式如下：
       * - custom_field1__c
       */
      custom_update_fields?: string[]
      /**
       * 指定需要更新的Person对象上的自定义字段，格式如下：
       * - custom_field1__c
       */
      person_custom_update_fields?: string[]
    }

    export interface PatchResponse {
      /** 待入职ID */
      pre_hire_id?: string
    }

    export interface QueryRequest {
      /** 待入职人员 ID 列表；如果该字段非空，则不按照page_size、page_token分页方式查询 */
      pre_hire_ids?: string[]
      /**
       * 返回数据的字段列表，填写方式：
       * - 为空时只返回 pre_hire_id
       * - 不为空时按照传入的字段返回数据，格式如下：
       * - person_info 字段：person_info.gender，person_info.age
       * - employment_info 字段：employment_info.department
       * - onboarding_info 字段：onboarding_info.onboarding_date
       * - probation_info 字段：probation_info.probation_period
       * - contract_info 字段：contract_info.contract_type
       * - 如果要返回所有下级，只用传上级结构体名称，例如 person_info
       * - 返回数据越多，查询接口性能越慢，请按需填写返回字段
       */
      fields?: string[]
    }

    export interface QueryQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface SearchRequest {
      /** 待入职人员工号列表 */
      worker_ids?: string[]
      /** 待入职人员 ID 列表 */
      pre_hire_ids?: string[]
      /** 个人信息 ID 列表 */
      person_ids?: string[]
      /** 入职日期-搜索范围开始，需要与搜索范围结束一同使用 */
      onboarding_date_start?: string
      /** 入职日期-搜索范围结束 */
      onboarding_date_end?: string
      /** 待入职数据更新时间-搜索范围开始，需要与搜索范围结束一同使用 */
      updated_date_start?: string
      /** 待入职数据更新时间-搜索范围结束，需要与搜索范围结束一同使用 */
      updated_date_end?: string
      /** 入职地点 ID 列表 */
      onboarding_location_ids?: string[]
      /** 入职状态 */
      onboarding_status?: 'preboarding' | 'deleted' | 'day_one' | 'withdrawn' | 'completed'
      /** 部门 ID 列表 */
      department_ids?: string[]
      /** 直接上级的雇佣 ID 列表 */
      direct_manager_ids?: string[]
      /** 人员类型 ID 列表 */
      employee_type_ids?: string[]
      /** 人员子类型 ID 列表 */
      employee_subtype_ids?: string[]
      /** 序列 ID 列表 */
      job_family_ids?: string[]
      /** 搜索关键字，支持对常用名模糊搜索 + 工号精确搜索 */
      key_word?: string
      /** 是否离职重聘 */
      rehire?: 'to_be_confirmed' | 'no' | 'yes'
      /**
       * 返回数据的字段列表，填写方式：
       * - 为空时只返回 pre_hire_id
       * - 不为空时按照传入的字段返回数据，格式如下：
       * - person_info 字段：person_info.gender，person_info.age
       * - employment_info 字段：employment_info.department
       * - onboarding_info 字段：onboarding_info.onboarding_date
       * - probation_info 字段：probation_info.probation_period
       * - contract_info 字段：contract_info.contract_type
       * - 如果要返回所有下级，只用传上级结构体名称，例如 person_info
       * - 返回数据越多，查询接口性能越慢，请按需填写返回字段
       */
      fields?: string[]
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface TransitTaskRequest {
      /** 系统预置的职位信息和个人信息任务的task_id分别为1和2，自定义任务的task_id是一串UUID */
      task_id: string
    }

    export interface TransitTaskResponse {
      /** 是否成功流转任务 */
      success?: boolean
    }

    export interface TransformOnboardingTaskRequest {
      /** 待入职ID，可从待入职列表接口获取 */
      pre_hire_id: string
      /** 任务的标识ID,入职系统的任务分为预置任务和自定义任务，预置任务的task_code是系统写死的，如职位信息任务的task_code为1，自定义任务的task_code为一串UUID。待入职人员任务的task_code可以通过查询待入职接口获取 */
      task_code: string
      /** 流转类型，描述对任务做何种流转，manual_start_task表示手动开启任务，submit_task表示提交任务，review_task表示审批任务 */
      transform_type: string
      /** 审批结果，approve表示通过，reject表示拒绝，当审批任务时，该字段需要传值，否则报错 */
      review_decision?: string
      /** 审批原因，审批任务时，如果审批通过，审批原因可以不填；如果审批拒绝，审批原因必填 */
      reason?: string
    }

    export interface TransformOnboardingTaskResponse {
      /** 是否成功流转任务 */
      success?: boolean
    }

    export interface CompleteResponse {
      /** 是否成功完成入职 */
      success?: boolean
    }

    export interface GetResponse {
      /** 待入职信息 */
      pre_hire?: Lark.PreHire
    }

    export interface ListQuery extends Pagination {
      /** 待入职ID列表 */
      pre_hire_ids?: string[]
    }
  }

  export namespace Probation {
    export interface Methods {
      assessment: Assessment.Methods
      /**
       * 启用/停用试用期考核功能
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/enable_disable_assessment
       */
      enableDisableAssessment(body: EnableDisableAssessmentRequest): Promise<void>
      /**
       * 搜索试用期信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.ProbationInfo>
      /**
       * 发起转正
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/submit
       */
      submit(body: SubmitRequest, query?: SubmitQuery): Promise<SubmitResponse>
      /**
       * 撤销转正
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/withdraw
       */
      withdraw(body: WithdrawRequest, query?: WithdrawQuery): Promise<void>
    }

    export interface EnableDisableAssessmentRequest {
      /** 启用 / 停用状态。启用后可在试用期管理页面中可见试用期考核相关的字段。 */
      active: boolean
      /** 试用期考核系统入口链接，当启用功能时该字段必填。 */
      app_url?: string
    }

    export interface SearchRequest {
      /** 雇佣 ID 列表 */
      employment_ids?: string[]
      /** 部门 ID 列表 */
      department_ids?: string[]
      /** 试用期开始日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
      probation_start_date_start?: string
      /** 试用期开始日期 - 搜索范围结束 */
      probation_start_date_end?: string
      /** 试用期预计结束日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
      probation_expected_end_date_start?: string
      /** 试用期预计结束日期 - 搜索范围结束 */
      probation_expected_end_date_end?: string
      /** 试用期实际结束日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
      actual_probation_end_date_start?: string
      /** 试用期实际结束日期 - 搜索范围结束 */
      actual_probation_end_date_end?: string
      /** 转正发起日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
      initiating_time_start?: string
      /** 转正发起日期 - 搜索范围结束 */
      initiating_time_end?: string
      /** 试用期状态 */
      probation_status?: 'pending' | 'rejected' | 'waiting' | 'approved' | 'converted' | 'offboarded'
      /** 试用期最终考核结果 */
      final_assessment_result?: 'approved' | 'rejected'
      /** 试用期最终考核等级 */
      final_assessment_grade?: string
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface SubmitRequest {
      /** 试用期人员的雇佣 ID */
      employment_id: string
      /** 转正方式 */
      conversion_mode: 1 | 2
      /** 实际结束日期，如果为空则默认填入试用期预计结束日期，填入日期需满足：试用期开始时间 <= 实际结束日期 <= 试用期预计结束日期 */
      actual_probation_end_date?: string
      /** 发起方 */
      submission_type: 'self_submission' | 'system' | 'hr_submission'
      /** 发起人 ID，当发起方为 HR 时填写，为其他发起方时该字段会自动计算 */
      initiator_id?: string
      /** 备注，当为直接转正时必填 */
      notes?: string
      /** 员工自评 */
      self_review?: string
      /** 自定义字段（试用期中如果有附件自定义字段，当前不支持使用「上传文件」接口写入） */
      custom_fields?: Lark.CustomFieldData[]
    }

    export interface SubmitQuery {
      /** 根据 client_token 是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface SubmitResponse {
      /** 试用期信息 */
      probation_info?: Lark.ProbationInfoForSubmit
    }

    export interface WithdrawRequest {
      /** 试用期人员的雇佣 ID */
      employment_id: string
    }

    export interface WithdrawQuery {
      /** 根据 client_token 是否一致来判断是否为同一请求 */
      client_token?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export namespace Assessment {
      export interface Methods {
        /**
         * 新增试用期考核信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/create
         */
        create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 更新试用期考核信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/patch
         */
        patch(assessment_id: string, body: PatchRequest, query?: PatchQuery): Promise<void>
        /**
         * 删除试用期考核信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/delete
         */
        delete(assessment_id: string): Promise<void>
      }

      export interface CreateRequest {
        /** 试用期人员的雇佣 ID */
        employment_id: string
        /** 试用期考核结果列表 */
        assessments: Lark.AssessmentForCreate[]
      }

      export interface CreateQuery {
        /** 根据 client_token 是否一致来判断是否为同一请求 */
        client_token?: string
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      }

      export interface CreateResponse {
        /** 创建的试用期考核记录 ID 列表，有序返回 */
        assessment_ids?: string[]
      }

      export interface PatchRequest {
        /** 考核状态 */
        assessment_status: 'not_started' | 'in_process' | 'completed' | 'no_need'
        /** 试用期考核结果 */
        assessment_result?: 'approved' | 'rejected'
        /** 考核得分 */
        assessment_score?: number
        /** 试用期考核等级 */
        assessment_grade?: string
        /** 考核评语 */
        assessment_comment?: string
        /** 考核结果页面超链接 */
        assessment_detail?: string
        /** 是否为最终考核结果 */
        is_final_asssessment: boolean
      }

      export interface PatchQuery {
        /** 根据 client_token 是否一致来判断是否为同一请求 */
        client_token?: string
      }
    }
  }

  export namespace JobChange {
    export interface Methods {
      /**
       * 发起员工异动
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 搜索员工异动信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.JobChange>
      /**
       * 撤销异动
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/revoke
       */
      revoke(job_change_id: string, body: RevokeRequest, query?: RevokeQuery): Promise<void>
    }

    export const enum CreateRequestTransferMode {
      /** 直接异动 */
      Type1 = 1,
      /** 发起异动 */
      Type2 = 2,
    }

    export interface CreateRequest {
      /** 异动方式 */
      transfer_mode: CreateRequestTransferMode
      /** 雇员id */
      employment_id: string
      /** 异动类型唯一标识 */
      transfer_type_unique_identifier: string
      /** 异动流程ID */
      flow_id?: string
      /** 生效日期 */
      effective_date: string
      /** 异动详细信息 */
      transfer_info: Lark.CreateTransferInfo
      /** 异动记录标识符 */
      transfer_key?: string
      /** 异动发起人 ID */
      initiator_id?: string
      /** 异动原因唯一标识 */
      transfer_reason_unique_identifier?: string
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface CreateResponse {
      /** 异动记录 id */
      job_change_id?: string
      /** 雇员 id */
      employment_id?: string
      /** 异动状态 */
      status?: 'Approving' | 'Approved' | 'Transformed' | 'Rejected' | 'Cancelled' | 'NoNeedApproval'
      /** 异动类型 */
      transfer_type_unique_identifier?: string
      /** 异动原因 */
      transfer_reason_unique_identifier?: string
      /** 异动流程 id */
      process_id?: string
      /** 生效时间 */
      effective_date?: string
      /** 创建时间 */
      created_time?: string
      /** 异动详细信息 */
      transfer_info?: Lark.TransferInfo
      /** 是否调整薪酬 */
      is_adjust_salary?: boolean
      /** 异动自定义字段 */
      custom_fields?: Lark.CustomFieldData[]
    }

    export interface SearchRequest {
      /** 雇员 ID 列表 */
      employment_ids?: string[]
      /** 异动记录 ID 列表 */
      job_change_ids?: string[]
      /** 异动状态，多个状态之间为「或」的关系 */
      statuses?: ('Approving' | 'Approved' | 'Transformed' | 'Rejected' | 'Cancelled' | 'NoNeedApproval')[]
      /** 异动生效日期 - 搜索范围开始，需要与搜索范围结束一同使用 */
      effective_date_start?: string
      /** 异动生效日期 - 搜索范围结束 */
      effective_date_end?: string
      /** 异动更新时间 - 搜索范围开始，需要与搜索范围结束一同使用 */
      updated_time_start?: string
      /** 异动更新时间 - 搜索范围结束 */
      updated_time_end?: string
      /** 新部门 ID 列表 */
      target_department_ids?: string[]
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface RevokeRequest {
      /** 操作人id */
      operator_id: string
    }

    export interface RevokeQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
    }
  }

  export namespace TransferType {
    export interface Methods {
      /**
       * 获取异动类型列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_type/query
       */
      query(query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryQuery {
      /** 异动类型状态 */
      active?: boolean
      /** 异动类型唯一标识，多条时最多数量为10 */
      transfer_type_unique_identifier?: string[]
    }

    export interface QueryResponse {
      /** 异动类型列表 */
      items?: Lark.TransferType[]
    }
  }

  export namespace TransferReason {
    export interface Methods {
      /**
       * 获取异动原因列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_reason/query
       */
      query(query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryQuery {
      /** 异动原因状态 */
      active?: boolean
      /** 异动原因唯一标识，多条时最多数量为10 */
      transfer_reason_unique_identifier?: string[]
    }

    export interface QueryResponse {
      /** 异动原因列表 */
      items?: Lark.TransferReason[]
    }
  }

  export namespace Offboarding {
    export interface Methods {
      /**
       * 查询员工离职原因列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query
       */
      query(body: QueryRequest): Promise<QueryResponse>
      /**
       * 操作员工离职
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/submit_v2
       */
      submitV2(body: SubmitV2Request, query?: SubmitV2Query): Promise<SubmitV2Response>
      /**
       * 编辑离职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/edit
       */
      edit(body: EditRequest, query?: EditQuery): Promise<EditResponse>
      /**
       * 撤销离职
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/revoke
       */
      revoke(body: RevokeRequest, query?: RevokeQuery): Promise<void>
      /**
       * 搜索离职信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.Offboarding>
      /**
       * 操作员工离职
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/submit
       */
      submit(body: SubmitRequest, query?: SubmitQuery): Promise<SubmitResponse>
    }

    export interface QueryRequest {
      /** 是否启用 */
      active?: boolean
      /** 离职原因唯一标识列表，用于过滤，最大20个 */
      offboarding_reason_unique_identifier?: string[]
    }

    export interface QueryResponse {
      /** 离职原因列表 */
      items?: Lark.OffboardingReason[]
    }

    export const enum SubmitV2RequestOffboardingMode {
      /** 直接离职 */
      TerminationOfDismissal = 1,
      /** 发起离职审批 */
      OffboardingWithProcess = 2,
    }

    export interface SubmitV2Request {
      /** 离职方式 */
      offboarding_mode: SubmitV2RequestOffboardingMode
      /** 雇员 id */
      employment_id: string
      /** 离职日期 */
      offboarding_date: string
      /** 离职原因 */
      offboarding_reason_unique_identifier: string
      /** 离职原因说明 */
      offboarding_reason_explanation?: string
      /** 操作发起人 ID（employment_id），为空默认为系统发起。注意：只有操作发起人可以撤销流程 */
      initiator_id?: string
      /** 是否加入离职屏蔽名单 */
      add_block_list?: boolean
      /** 屏蔽原因 */
      block_reason?: string
      /** 屏蔽原因说明 */
      block_reason_explanation?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 离职是否保留飞书账号 */
      retain_account?: boolean
      /** 编制随人员一起调整 */
      is_transfer_with_workforce?: boolean
    }

    export interface SubmitV2Query {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface SubmitV2Response {
      /** 离职记录 id */
      offboarding_id?: string
      /** 雇员 id */
      employment_id?: string
      /** 离职原因 */
      offboarding_reason_unique_identifier?: string
      /** 离职日期 */
      offboarding_date?: string
      /** 离职原因说明 */
      offboarding_reason_explanation?: string
      /** 是否加入离职屏蔽名单 */
      add_block_list?: boolean
      /** 屏蔽原因 */
      block_reason?: string
      /** 屏蔽原因说明 */
      block_reason_explanation?: string
      /** 创建时间 */
      created_time?: string
      /** 离职是否保留飞书账号 */
      retain_account?: boolean
      /** 编制随人员一起调整 */
      is_transfer_with_workforce?: boolean
    }

    export interface EditRequest {
      /** 离职记录 ID */
      offboarding_id: string
      /** 操作人雇佣 ID（employment_id），为空默认为系统操作。 */
      operator_id?: string
      /** 编辑字段数据信息 */
      update_data: Lark.ObjectFieldData[]
    }

    export interface EditQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface EditResponse {
      /** 编辑字段数据信息 */
      data: Lark.ObjectFieldData[]
    }

    export interface RevokeRequest {
      /** 离职记录 ID */
      offboarding_id: string
      /** 操作人雇佣 ID（employment_id），为空默认为系统操作。 */
      operator_id?: string
    }

    export interface RevokeQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface SearchRequest {
      /** 雇佣 ID 列表，为空默认查询所有离职人员 */
      employment_ids?: string[]
      /** 离职审批发起时间-搜索范围开始，需要与搜索范围结束一同使用 */
      apply_initiating_time_start?: string
      /** 离职审批发起时间 - 搜索范围结束 */
      apply_initiating_time_end?: string
      /** 离职审批结束时间 - 搜索范围开始，需要与搜索范围结束一同使用 */
      apply_finished_time_start?: string
      /** 离职审批结束时间 - 搜索范围结束 */
      apply_finished_time_end?: string
      /** 期望离职日期-搜索范围开始，需要与搜索范围结束一同使用 */
      expected_offboarding_date_start?: string
      /** 期望离职日期 - 搜索范围结束 */
      expected_offboarding_date_end?: string
      /** 离职日期-搜索范围开始，需要与搜索范围结束一同使用 */
      offboarding_date_start?: string
      /** 离职日期 - 搜索范围结束 */
      offboarding_date_end?: string
      /** 离职状态，多个状态之间为「或」的关系 */
      statuses?: ('Approving' | 'Approved' | 'Offboarded' | 'Rejected' | 'Withdrawn' | 'NoNeedApproval')[]
      /** 离职原因列表 , 可以通过【查询员工离职原因列表】接口获取 ，查询时不返回下级原因相关的离职信息 */
      reasons?: string[]
      /** 离职原因（员工）列表 , 可以通过【查询员工离职原因列表】接口获取，查询时不返回下级原因相关的离职信息 */
      employee_reasons?: string[]
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export const enum SubmitRequestOffboardingMode {
      /** 直接离职 */
      TerminationOfDismissal = 1,
    }

    export interface SubmitRequest {
      /** 离职方式 */
      offboarding_mode: SubmitRequestOffboardingMode
      /** 雇员 id */
      employment_id: string
      /** 离职日期 */
      offboarding_date: string
      /**
       * 离职原因，可通过接口
       * [【查询员工离职原因列表】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query)获取
       */
      offboarding_reason_unique_identifier: string
      /** 离职原因说明，长度限制6000 */
      offboarding_reason_explanation?: string
      /** 操作发起人 ID（employment_id），为空默认为系统发起。注意：只有操作发起人可以撤销流程 */
      initiator_id?: string
      /** 是否加入离职屏蔽名单 */
      add_block_list?: boolean
      /** 屏蔽原因 */
      block_reason?: string
      /** 屏蔽原因说明 */
      block_reason_explanation?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
    }

    export interface SubmitQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface SubmitResponse {
      /** 离职记录 id */
      offboarding_id?: string
      /** 雇员 id */
      employment_id?: string
      /** 离职原因 */
      offboarding_reason_unique_identifier?: string
      /** 离职日期 */
      offboarding_date?: string
      /** 离职原因说明 */
      offboarding_reason_explanation?: string
      /** 是否加入离职屏蔽名单 */
      add_block_list?: boolean
      /** 屏蔽原因 */
      block_reason?: string
      /** 屏蔽原因说明 */
      block_reason_explanation?: string
      /** 创建时间 */
      created_time?: string
    }
  }

  export namespace SignatureFile {
    export interface Methods {
      /**
       * 终止电子签文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_file/terminate
       */
      terminate(body: TerminateRequest, query?: TerminateQuery): Promise<TerminateResponse>
      /**
       * 获取电子签文件列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_file/list
       */
      list(query?: ListQuery): Paginated<Lark.SignatureFile>
      /**
       * 查询电子签文件详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_file/query
       */
      query(body: QueryRequest, query?: QueryQuery): Paginated<Lark.SignatureFile>
      /**
       * 根据流程获取电子签文件信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_file/list_by_biz_id
       */
      listByBizId(query?: ListByBizIdQuery): Promise<ListByBizIdResponse>
      /**
       * 下载电子签文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_file/download
       */
      download(signature_file_id: string): Promise<ArrayBuffer>
    }

    export interface TerminateRequest {
      /** 欲终止的电子签文件id列表 */
      ids: string[]
      /** 操作人ID */
      operator: string
      /** 终止原因 */
      terminate_reason: string
    }

    export interface TerminateQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface TerminateResponse {
      /** 欲终止的文件总数量 */
      total_count?: number
      /** 成功总数量 */
      success_count?: number
      /** 失败总数量 */
      fail_count?: number
      /** 终止成功的文件id列表 */
      success_file_id_list?: string[]
      /** 终止失败的文件id和对应的原因列表 */
      fail_file_id_and_reasons?: Lark.TerminateSignatureFailIdAndReason[]
    }

    export interface ListQuery extends Pagination {
      /** 电子签文件id */
      signature_file_id?: string
      /** 电子签文件状态状态，多个状态之间为「或」的关系 */
      states?: string
      /** 更新时间早于等于某个时间点，按照东八区时区 */
      update_time_start?: string
      /** 更新时间晚于等于某个时间点，按照东八区时区 */
      update_time_end?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 根据电子签模板id列表筛选电子签文件,返回的电子签文件使用的模板id在该list中 */
      template_ids?: string
    }

    export interface QueryRequest {
      /** 电子签文件状态状态列表，多个状态之间为「或」的关系 */
      states?: string[]
      /** 电子签模板ID列表，返回的电子签文件使用的模板id在该list中 */
      template_ids?: string[]
    }

    export interface QueryQuery extends Pagination {
      /** 电子签文件id */
      signature_file_id?: string
      /** 更新时间早于等于某个时间点，按照东八区时区 */
      update_time_start?: string
      /** 更新时间晚于等于某个时间点，按照东八区时区 */
      update_time_end?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface ListByBizIdQuery {
      /** 业务自定义流程ID */
      biz_process_id: string
      /** 业务类型，开放平台平应用可以传递"OpenAPI" */
      biz_type: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 是否需要签署链接 */
      select_sign_url?: boolean
    }

    export interface ListByBizIdResponse {
      /** 返回的流程关联的电子签文件列表 */
      signature_files?: Lark.SignatureFile[]
      /** 批量签署链接 */
      batch_sign_url?: string
    }
  }

  export namespace SignatureNode {
    export interface Methods {
      /**
       * 获取文件签署节点信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_node/list_by_file_id
       */
      listByFileId(query?: ListByFileIdQuery): Promise<ListByFileIdResponse>
    }

    export interface ListByFileIdQuery {
      /** 电子签文件id */
      file_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface ListByFileIdResponse {
      /** 返回的电子签节点列表 */
      signature_nodes?: Lark.SignatureNode[]
    }
  }

  export namespace SignatureTemplate {
    export interface Methods {
      /**
       * 获取电子签模板内容
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_template/search
       */
      search(query?: SearchQuery): Promise<SearchResponse>
    }

    export interface SearchQuery {
      /** 电子签模板ids,用英文逗号分隔;如果不传 则返回所有模版信息（字节线上几百条） */
      template_ids?: string
      /** 是否需要自定义字段,如-自定义签署方、合同变更前后公司等 */
      select_custom_field?: boolean
    }

    export interface SearchResponse {
      /** 返回的电子签模板list */
      signature_templates?: Lark.SignatureTemplate[]
    }
  }

  export namespace SignatureTemplateInfoWithThumbnail {
    export interface Methods {
      /**
       * 获取电子签模板列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/signature_template_info_with_thumbnail/list
       */
      list(query?: ListQuery): Promise<ListResponse> & AsyncIterableIterator<Lark.SignatureTemplateInfoWithThumbnail>
    }

    export interface ListQuery extends Pagination {
      /** 模版名 */
      name?: string
      /** 模板类别;多个类别之间使用英文,分隔 */
      category_apiname?: string
      /** 模板用途;多个用途之间使用英文,分隔 */
      usage_apiname?: string
      /** 是否停用 */
      active?: boolean
      /** 是否需要模板适用区域信息;默认false，不会返回region_info信息 */
      need_region_info?: boolean
      /** 电子签适用范围 */
      applicability_apinames?: string[]
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface ListResponse {
      /** 电子签模板缩略图列表 */
      items?: Lark.SignatureTemplateInfoWithThumbnail[]
      /** 查询偏移量；下次查询可以从page_token开始查询 */
      page_token?: number
      /** 数据总数 */
      count?: number
    }
  }

  export namespace Contract {
    export interface Methods {
      /**
       * 新建合同
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新合同
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/patch
       */
      patch(contract_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 删除合同
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/delete
       */
      delete(contract_id: string): Promise<void>
      /**
       * 查询单个合同
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/get
       */
      get(contract_id: string): Promise<GetResponse>
      /**
       * 批量查询合同
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/list
       */
      list(query?: Pagination): Paginated<Lark.Contract>
      /**
       * 搜索合同
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/contract/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.Contract>
    }

    export interface CreateRequest {
      /** 合同开始日期 */
      effective_time: string
      /** 实际结束日期 */
      expiration_time?: string
      /** 雇员ID */
      employment_id: string
      /** 合同类型 */
      contract_type: Lark.Enum
      /** 甲方, 引用Company的ID */
      first_party_company_id: string
      /** Person ID */
      person_id?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 期限类型 */
      duration_type?: Lark.Enum
      /** 合同结束日期 */
      contract_end_date?: string
      /** 合同编号 */
      contract_number?: string
      /** 签订类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（signing_type）枚举定义部分获得 */
      signing_type?: Lark.Enum
    }

    export interface CreateQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface CreateResponse {
      contract?: Lark.Contract
    }

    export interface PatchRequest {
      /** 合同开始日期 */
      effective_time?: string
      /** 实际结束日期 */
      expiration_time?: string
      /** 雇员ID */
      employment_id?: string
      /** 合同类型 */
      contract_type?: Lark.Enum
      /** 甲方, 引用Company的ID */
      first_party_company_id?: string
      /** Person ID */
      person_id?: string
      /** 自定义字段 */
      custom_fields?: Lark.ObjectFieldData[]
      /** 期限类型 */
      duration_type?: Lark.Enum
      /** 合同结束日期 */
      contract_end_date?: string
      /** 合同编号 */
      contract_number?: string
      /** 签订类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（signing_type）枚举定义部分获得 */
      signing_type?: Lark.Enum
    }

    export interface PatchQuery {
      /** 根据client_token是否一致来判断是否为同一请求 */
      client_token?: string
    }

    export interface PatchResponse {
      contract?: Lark.Contract
    }

    export interface GetResponse {
      /** 合同信息 */
      contract?: Lark.Contract
    }

    export interface SearchRequest {
      /** 雇佣 ID 列表 */
      employment_id_list?: string[]
      /** 合同ID列表 */
      contract_id_list?: string[]
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }
  }

  export namespace WorkforcePlanDetailRow {
    export interface Methods {
      /**
       * 批量创建/更新明细行
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchSave
       */
      batchSave(body: BatchSaveRequest): Promise<void>
      /**
       * 批量删除明细行
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchDelete
       */
      batchDelete(body: BatchDeleteRequest): Promise<void>
    }

    export interface BatchSaveRequest {
      /** 编制规划id */
      workforce_plan_id: string
      /** 编制规划的多个明细行 */
      items: Lark.WorkforcePlanDetailRow[]
    }

    export interface BatchDeleteRequest {
      /** 编制规划id */
      workforce_plan_id: string
      /** 编制规划的多个明细行 */
      items: Lark.WorkforcePlanDetailRow[]
    }
  }

  export namespace ReportDetailRow {
    export interface Methods {
      /**
       * 批量创建/更新填报行
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchSave
       */
      batchSave(body: BatchSaveRequest): Promise<void>
      /**
       * 批量删除填报行
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchDelete
       */
      batchDelete(body: BatchDeleteRequest): Promise<void>
    }

    export interface BatchSaveRequest {
      /** 编制规划id */
      workforce_plan_id: string
      /** 集中填报id */
      centralized_reporting_project_id: string
      /** 集中填报的一些填报行 */
      items: Lark.WorkforcePlanDetailRow[]
    }

    export interface BatchDeleteRequest {
      /** 编制规划id */
      workforce_plan_id: string
      /** 集中填报id */
      centralized_reporting_project_id: string
      /** 集中填报的一些填报行 */
      items: Lark.WorkforcePlanDetailRow[]
    }
  }

  export namespace WorkforcePlan {
    export interface Methods {
      /**
       * 查询编制规划方案
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan/list
       */
      list(query?: ListQuery): Promise<ListResponse>
    }

    export interface ListQuery {
      /** 是否获取所有编制规划方案，true 所有编制规划方案列表，false 为仅获取当前生效的编制规划方案，默认为 false示例值：false */
      get_all_plan?: boolean
      /** 是否只获取已启用的方案，true 获取已启用编制规划方案，false 获取所有编制规划方案，默认为 true示例值：true */
      active?: boolean
    }

    export interface ListResponse {
      /** 方案列表 */
      items?: Lark.WorkforcePlan[]
      /** 方案总数 */
      total?: number
    }
  }

  export namespace WorkforcePlanDetail {
    export interface Methods {
      /**
       * 查询编制规划明细信息（不支持自定义组织）
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail/batch
       */
      batch(body: BatchRequest, query?: Pagination): Promise<BatchResponse>
      /**
       * 查询编制规划明细信息（支持自定义组织）
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail/batch_v2
       */
      batchV2(body: BatchV2Request, query?: Pagination): Promise<BatchV2Response>
    }

    export interface BatchRequest {
      /** 编制规划方案ID，ID及详细信息可通过获取编制规划方案列表接口查询获得。查询编制规划明细信息时，编制规划方案ID必填，是否为集中填报项目设置为false，不填写集中填报项目ID（是否填写不影响返回结果） */
      workforce_plan_id?: string
      /** 是否为集中填报项目。如果租户未使用集中填报功能，将此参数置空即可。如果查询集中填报明细，将此参数设置为true。 */
      is_centralized_reporting_project?: boolean
      /** 编制规划集中填报项目ID，ID可通过访问集中填报页面，从URL中提取report_id参数。如果租户未使用集中填报功能，将此参数置空即可。查询集中填报信息时，集中填报项目ID必填，是否为集中填报项目设置为true，不填写编制规划方案ID（是否填写不影响返回结果） */
      centralized_reporting_project_id?: string
      /** 部门 ID 列表，枚举值及详细信息可通过查询单个部门接口查询获得 */
      department_ids?: string[]
      /** 人员类型 ID 列表，枚举值及详细信息可通过查询单个人员类型接口查询获得 */
      employee_type_ids?: string[]
      /** 工作地点 ID 列表，枚举值及详细信息可通过查询单个地点接口查询获得 */
      work_location_ids?: string[]
      /** 序列 ID 列表，枚举值及详细信息可通过查询单个序列接口查询获得 */
      job_family_ids?: string[]
      /** 职级 ID 列表，枚举值及详细信息可通过查询单个职级接口查询获得 */
      job_level_ids?: string[]
      /** 职务 ID 列表，枚举值及详细信息可通过查询单个职务接口查询获得 */
      job_ids?: string[]
      /** 成本中心 ID 列表，可以通过搜索成本中心信息接口获取对应的成本中心信息 */
      cost_center_ids?: string[]
    }

    export interface BatchResponse {
      /** 编制规划方案 ID */
      workforce_plan_id?: string
      /** 集中填报项目 ID */
      centralized_reporting_project_id?: string
      /** 编制规划明细信息 */
      items?: Lark.WorkforcePlanDetail[]
      /** 分页标识 */
      page_token?: string
      /** 是否还有更多项 */
      has_more?: boolean
    }

    export interface BatchV2Request {
      /** 编制规划方案ID，ID及详细信息可通过获取编制规划方案列表接口查询获得。查询编制规划明细信息时，编制规划方案ID必填，是否为集中填报项目设置为false，不填写集中填报项目ID（是否填写不影响返回结果） */
      workforce_plan_id?: string
      /** 是否为集中填报项目。如果租户未使用集中填报功能，将此参数置空即可。如果查询集中填报明细，将此参数设置为true。 */
      is_centralized_reporting_project?: boolean
      /** 编制规划集中填报项目ID，ID可通过访问集中填报页面，从URL中提取report_id参数。如果租户未使用集中填报功能，将此参数置空即可。查询集中填报信息时，集中填报项目ID必填，是否为集中填报项目设置为true，不填写编制规划方案ID（是否填写不影响返回结果） */
      centralized_reporting_project_id?: string
      /** 维度筛选 */
      dimension_id_in_datas?: Lark.DimensionIdInData[]
      /** 是否包含缺维度的明细行数据，true为包含缺维度明细行数据，false为仅获取所有维度都有值的明细行数据，默认为 false */
      include_missing_dimension_rows?: boolean
      /** 是否过滤在职、预增/预减人员、编制数、预估在职人数都为0的明细行，true为过滤在职、预增/预减人员、编制数、预估在职人数都为0的明细行，false为不过滤在职、预增/预减人员、编制数、预估在职人数都为0的明细行，默认为 false */
      filter_all_zero_value_rows?: boolean
    }

    export interface BatchV2Response {
      /** 编制规划方案 ID */
      workforce_plan_id?: string
      /** 集中填报项目 ID */
      centralized_reporting_project_id?: string
      /** 编制规划明细信息 */
      items?: Lark.WorkforcePlanDetailV2[]
      /** 分页标识 */
      page_token?: string
      /** 是否还有更多项 */
      has_more?: boolean
    }
  }

  export namespace LeaveGrantingRecord {
    export interface Methods {
      /**
       * 创建假期发放记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除假期发放记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/delete
       */
      delete(leave_granting_record_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 假期类型 ID，枚举值可通过【获取假期类型列表】接口获取（若假期类型下存在假期子类，此处仅支持传入假期子类的 ID） */
      leave_type_id: string
      /** 员工 ID */
      employment_id: string
      /** 授予数量 */
      granting_quantity: string
      /**
       * 授予时长单位
       * 可选值有：
       * - 1: 天
       * - 2: 小时
       */
      granting_unit: number
      /** 生效时间 */
      effective_date: string
      /** 失效时间 */
      expiration_date?: string
      /** 是否参与折算 */
      section_type?: number
      /** 授予原因 */
      reason: Lark.I18n[]
      /** 自定义外部 ID，可用于避免数据重复写入（不能超过 64 字符） */
      external_id?: string
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface CreateResponse {
      /** 假期授予记录 */
      leave_granting_record?: Lark.LeaveGrantingRecord
    }
  }

  export namespace Leave {
    export interface Methods {
      /**
       * 获取假期类型列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_types
       */
      leaveTypes(query?: LeaveTypesQuery): Paginated<Lark.LeaveType, 'leave_type_list'>
      /**
       * 批量查询员工假期余额
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_balances
       */
      leaveBalances(query?: LeaveBalancesQuery): Paginated<Lark.EmploymentLeaveBalance, 'employment_leave_balance_list'>
      /**
       * 批量查询员工请假记录
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_request_history
       */
      leaveRequestHistory(query?: LeaveRequestHistoryQuery): Paginated<Lark.LeaveRequest, 'leave_request_list'>
      /**
       * 获取工作日历
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar
       */
      workCalendar(body: WorkCalendarRequest): Promise<WorkCalendarResponse>
      /**
       * 根据适用条件获取工作日历 ID
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/calendar_by_scope
       */
      calendarByScope(query?: CalendarByScopeQuery): Promise<CalendarByScopeResponse>
      /**
       * 获取工作日历日期详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar_date
       */
      workCalendarDate(body: WorkCalendarDateRequest): Promise<WorkCalendarDateResponse>
    }

    export interface LeaveTypesQuery extends Pagination {
      /**
       * 假期类型状态（不传则为全部）
       * 可选值有：
       * - 1：已启用
       * - 2：已停用
       */
      status?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface LeaveBalancesQuery extends Pagination {
      /** 查询截止日期，即截止到某天余额数据的日期（不传则默认为当天） */
      as_of_date?: string
      /** 员工 ID 列表，最大 100 个（不传则默认查询全部员工） */
      employment_id_list?: string[]
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 查询时区 */
      time_zone?: string
      /** 是否获取离职折算字段 */
      include_offboard?: boolean
    }

    export interface LeaveRequestHistoryQuery extends Pagination {
      /** 员工 ID 列表，最大 100 个（不传则默认查询全部员工） */
      employment_id_list?: string[]
      /** 休假发起人 ID 列表，最大 100 个 */
      initiator_id_list?: string[]
      /**
       * 请假记录的状态
       * 可选值有：
       * - 1：已通过
       * - 2：审批中
       * - 3：审批中（更正）
       * - 4：审批中（取消休假）
       * - 5：审批中（返岗）
       * - 6：已返岗
       * - 7：已拒绝
       * - 8：已取消
       * - 9：已撤回
       */
      leave_request_status?: string[]
      /** 假期类型 ID 列表，枚举值可通过【获取假期类型列表】接口获取 */
      leave_type_id_list?: string[]
      /** 休假开始时间晚于等于的日期 */
      leave_start_date_min?: string
      /** 休假开始时间早于等于的日期 */
      leave_start_date_max?: string
      /** 休假结束时间晚于等于的日期 */
      leave_end_date_min?: string
      /** 休假结束时间早于等于的日期 */
      leave_end_date_max?: string
      /** 休假发起时间晚于等于的日期 */
      leave_submit_date_min?: string
      /** 休假发起时间早于等于的日期 */
      leave_submit_date_max?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 请假记录更新时间晚于等于的时间 */
      leave_update_time_min?: string
      /** 请假记录更新时间早于等于的时间 */
      leave_update_time_max?: string
      /** 是否返回请假详情，若为true，将在每条请假记录的details字段返回请假详情 */
      return_detail?: boolean
      /** 指定过滤长/短假类型，0表示不过滤，1表示仅获取短假，2表示仅获取长假, 默认0 */
      leave_term_type?: number
      /** 请假记录所在时区 */
      time_zone?: string
      /** 请假记录数据源，1表示中国大陆休假，2表示海外休假，不传或0表示不过滤 */
      data_source?: number
      /** 请假记录DB更新时间晚于等于的时间 */
      db_update_time_min?: string
      /** 请假记录DB更新时间早于等于的时间 */
      db_update_time_max?: string
      /** WorkDay专用 是否返回0值的请假记录，若为true，将返回0值的请假记录 */
      wd_need_amount_zero_records?: boolean
      /** WorkDay专用 是否拒绝和取消的请假记录，若为true，将返回拒绝和取消的请假记录 */
      wd_need_denied_and_canceled_record?: boolean
      /** WorkDay专用 扣薪类型, 1不参与算薪 2影响算薪 3不影响算薪 */
      wd_paid_type?: number
    }

    export interface WorkCalendarRequest {
      /** 工作日历ID列表 */
      wk_calendar_ids: string[]
      /** 工作日历ID大于 */
      wk_calendar_id_gt?: string
      /** 分页、排序等选项 */
      wk_option?: Lark.WkOption
      /** 是否只返回启用的工作日历，不填默认true */
      only_enable?: boolean
    }

    export interface WorkCalendarResponse {
      /** 工作日历列表 */
      work_calendars?: Lark.WorkCalendarDetail[]
      /** 入参count=true，则返回符合条件的工作日历总数 */
      count?: number
    }

    export interface CalendarByScopeQuery {
      /** 用户所属部门的ID列表 */
      wk_department_id?: string
      /** 国家/地区 ID */
      wk_country_region_id?: string
      /** 人员类型 */
      wk_employee_type_id?: string
      /** 工作地点 */
      wk_work_location_id?: string
      /** 工时制度 */
      wk_working_hours_type_id?: string
      /** 职务序列 */
      wk_job_family_id?: string
      /** 公司 ID */
      wk_company_id?: string
    }

    export interface CalendarByScopeResponse {
      /** 工作日历id */
      calendar_wk_id?: string
    }

    export interface WorkCalendarDateRequest {
      /** 工作日历WKID列表，最多100 */
      wk_calendar_ids: string[]
      /** 日期，格式："2006-01-02"，最多50个 */
      dates?: string[]
      /** 日期范围-开始日期，格式："2006-01-02" */
      begin_date?: string
      /** 日期范围-结束日期(含)，格式："2006-01-02" */
      end_date?: string
      /** 分页 */
      offset?: number
      /** 分页大小 */
      limit?: number
      /** 日期id，与其他筛选参数互斥，传了该参数，其他筛选参数不起效 */
      ids?: string[]
    }

    export interface WorkCalendarDateResponse {
      /** 日期类型列表 */
      calendar_dates?: Lark.WkCalendarDate[]
    }
  }

  export namespace Authorization {
    export interface Methods {
      /**
       * 批量查询用户授权
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/query
       */
      query(query?: QueryQuery): Paginated<Lark.RoleAuthorization>
      /**
       * 查询单个用户授权
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/get_by_param
       */
      getByParam(query?: GetByParamQuery): Promise<GetByParamResponse>
      /**
       * 为用户授权角色
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/add_role_assign
       */
      addRoleAssign(body: AddRoleAssignRequest, query?: AddRoleAssignQuery): Promise<AddRoleAssignResponse>
      /**
       * 更新用户被授权的数据范围
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/update_role_assign
       */
      updateRoleAssign(body: UpdateRoleAssignRequest, query?: UpdateRoleAssignQuery): Promise<UpdateRoleAssignResponse>
      /**
       * 移除用户被授权的角色
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/remove_role_assign
       */
      removeRoleAssign(query?: RemoveRoleAssignQuery): Promise<RemoveRoleAssignResponse>
    }

    export interface QueryQuery extends Pagination {
      /** 员工ID列表，最大100个（不传则默认查询全部员工） */
      employment_id_list?: string[]
      /** 角色 ID 列表，最大 100 个 */
      role_id_list?: string[]
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 授权时间大于 */
      updated_at_gte?: string
      /** 授权时间小于 */
      updated_at_lte?: string
    }

    export interface GetByParamQuery {
      /** 雇员 ID */
      employment_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export interface GetByParamResponse {
      /** 角色授权信息 */
      role_authorization?: Lark.RoleAuthorization
    }

    export interface AddRoleAssignRequest {
      /** 授权 */
      assigned_organization_items: Lark.AssignedOrganizationWithCode[][]
    }

    export interface AddRoleAssignQuery {
      /** 雇员 ID */
      employment_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 角色 ID */
      role_id: string
    }

    export interface AddRoleAssignResponse {
      /** 授权id */
      assign_id?: string
    }

    export interface UpdateRoleAssignRequest {
      /** 授权 */
      assigned_organization_items: Lark.AssignedOrganizationWithCode[][]
    }

    export interface UpdateRoleAssignQuery {
      /** 雇员 ID */
      employment_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 角色 ID */
      role_id: string
    }

    export interface UpdateRoleAssignResponse {
      /** 授权id */
      assign_id?: string
    }

    export interface RemoveRoleAssignQuery {
      /** 雇员 ID */
      employment_id: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 角色 ID */
      role_id: string
    }

    export interface RemoveRoleAssignResponse {
      /** 授权id */
      assign_id?: string
    }
  }

  export namespace SecurityGroup {
    export interface Methods {
      /**
       * 批量获取角色列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/list
       */
      list(query?: Pagination): Paginated<Lark.SecurityGroup>
      /**
       * 查询部门 / 地点的 HRBP / 属地 BP
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/query
       */
      query(body: QueryRequest, query?: QueryQuery): Promise<QueryResponse>
    }

    export interface QueryRequest {
      /** 角色列表，一次最多支持查询 50 个 */
      item_list: Lark.BpRoleOrganization[]
      /** 授权时间大于 */
      updated_at_gte?: string
      /** 授权时间小于 */
      updated_at_lte?: string
    }

    export interface QueryQuery {
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface QueryResponse {
      /** HRBP/属地 BP 信息 */
      hrbp_list?: Lark.Hrbp[]
    }
  }

  export namespace Bp {
    export interface Methods {
      /**
       * 查询部门 HRBP
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/get_by_department
       */
      getByDepartment(body: GetByDepartmentRequest, query?: GetByDepartmentQuery): Promise<GetByDepartmentResponse>
      /**
       * 获取 HRBP 列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/list
       */
      list(query?: ListQuery): Paginated<Lark.Bp>
    }

    export interface GetByDepartmentRequest {
      /** 部门 ID */
      department_id: string
    }

    export interface GetByDepartmentQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }

    export interface GetByDepartmentResponse {
      /** 部门 HRBP 信息，依次为部门及各层级上级部门 */
      items?: Lark.DepartmentHrbp[]
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
    }
  }

  export namespace AssignedUser {
    export interface Methods {
      /**
       * 获取组织类角色授权列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/assigned_user/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.RoleAuthorization>
    }

    export interface SearchRequest {
      /** 角色 ID，仅支持组织类角色， 角色 ID 可通过【批量获取角色列表】接口获取 */
      role_id: string
      /** 管理范围信息 */
      management_scope_list: Lark.ManagementScope[]
      /**
       * 查找方式
       * 可选值有：
       * - 1：只查找指定 部门/工作地点/公司/社保城市，如无授权信息则返回为空
       * - 2：当指定的 部门/工作地点/公司/社保城市 无授权信息，向上查找第一个授权记录并直接返回
       */
      search_method: string
      /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
      page_token?: string
      /** 每页获取记录数量，最大100 */
      page_size: string
    }

    export interface SearchQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }
  }

  export namespace Process {
    export interface Methods {
      formVariableData: FormVariableData.Methods
      approver: Approver.Methods
      extra: Extra.Methods
      transfer: Transfer.Methods
      /**
       * 查询流程实例列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/list
       */
      list(query?: ListQuery): Paginated<string, 'process_ids'>
      /**
       * 获取单个流程详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/get
       */
      get(process_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取流程数据
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/flow_variable_data
       */
      flowVariableData(process_id: string, query?: FlowVariableDataQuery): Promise<FlowVariableDataResponse>
    }

    export interface ListQuery extends Pagination {
      /** 查询流程状态列表。 */
      statuses?: number[]
      /** 查询开始时间（unix毫秒时间戳），闭区间，开始时间和结束时间跨度不能超过31天 */
      modify_time_from: string
      /** 1. 任务查询结束时间，闭区间 2. 单位：ms。从1970年1月1日(UTC/GMT的午夜) 开始经过的毫秒数 3. 注意：开始时间和结束时间跨度不能超过31天 4. 示例值：1719549169735 */
      modify_time_to: string
      /** 流程定义ID */
      flow_definition_id?: string
    }

    export interface GetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
    }

    export const enum GetResponseStatus {
      /** 进行中 */
      Running = 1,
      /** 拒绝 */
      Reject = 2,
      /** 撤回 */
      Withdraw = 4,
      /** 撤销 */
      Revoke = 8,
      /** 已完成 */
      Complete = 9,
    }

    export const enum GetResponseProperties {
      /** 普通流程 */
      Common = 1,
      /** 撤销流程 */
      CheXiao = 2,
      /** 更正流程 */
      Correct = 3,
    }

    export interface GetResponse {
      /** 流程实例ID */
      process_id?: string
      /** 流程状态 */
      status?: GetResponseStatus
      /** 业务类型ID */
      flow_template_id?: string
      /** 业务类型名称 */
      flow_template_name?: Lark.DataengineI18n
      /** 流程定义ID */
      flow_definition_id?: string
      /** 流程定义名称 */
      flow_definition_name?: Lark.DataengineI18n
      /** 流程发起人ID */
      initiator_id?: string
      /** 流程发起人姓名 */
      initiator_name?: Lark.DataengineI18n
      /** 流程发起时间，Unix毫秒时间戳 */
      create_time?: string
      /** 流程结束时间，Unix毫秒时间戳 */
      complete_time?: string
      /** 发起单据地址 */
      start_links?: Lark.ProcessLink
      /** 流程摘要，会随着流程流转发生变化 */
      abstracts?: Lark.ProcessAbstractItem[]
      /** 待办列表 */
      todos?: Lark.ProcessTodoItem[]
      /** 抄送列表 */
      cc_list?: Lark.ProcessCcItem[]
      /** 已办列表 */
      done_list?: Lark.ProcessDoneItem[]
      /** 普通流程或撤销流程等 */
      properties?: GetResponseProperties
      /** 系统待办列表 */
      system_todos?: Lark.ProcessSystemTodoItem[]
      /** 系统已办列表 */
      system_done_list?: Lark.ProcessSystemDoneItem[]
      /** 评论列表 */
      comment_infos?: Lark.ProcessCommentInfo[]
      /** 更正流程原流程ID */
      original_process_id?: string
      /** 是否最新的「已完成」的更正流程 */
      is_last_completed_correct_process?: boolean
    }

    export interface FlowVariableDataQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      /** 需要查询变量key */
      variable_keys?: string[]
    }

    export interface FlowVariableDataResponse {
      /** 流程数据 */
      field_variable_values?: Lark.FieldVariableValue[]
      /** 流程实例id */
      process_id?: string
    }

    export namespace FormVariableData {
      export interface Methods {
        /**
         * 获取流程表单数据
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-form_variable_data/get
         */
        get(process_id: string, query?: GetQuery): Promise<GetResponse>
      }

      export interface GetQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface GetResponse {
        /** 表单数据 */
        field_variable_values?: Lark.FieldVariableValue[]
        /** 流程实例id */
        process_id?: string
      }
    }

    export namespace Approver {
      export interface Methods {
        /**
         * 通过/拒绝审批任务
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-approver/update
         */
        update(process_id: string, approver_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
      }

      export const enum UpdateRequestStatus {
        /** 拒绝 */
        Approved = 2,
        /** 通过 */
        Rejected = 3,
      }

      export interface UpdateRequest {
        /** 将审批任务修改为同意/拒绝 */
        status: UpdateRequestStatus
        /** 按user_id_type类型传递。如果system_approval为false，则必填。否则非必填。 */
        user_id?: string
        /** true - 使用系统身份审批 */
        system_approval?: boolean
        /** 通过原因，长度限制为500 */
        reason?: string
        /** 表单数据 */
        field_values_v2?: Lark.ProcessFormVariableV2[]
      }

      export interface UpdateQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
        /** 此次调用中使用的部门 ID 类型 */
        department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      }

      export interface UpdateResponse {
        /** 错误码，非 0 表示失败 */
        code: number
        /** 错误描述 */
        msg?: string
      }
    }

    export namespace Extra {
      export interface Methods {
        /**
         * 加签审批任务
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-extra/update
         */
        update(process_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<void>
      }

      export const enum UpdateRequestExtraType {
        /** 前加签 */
        PreExtra = 0,
        /** 并加签 */
        CurrentExtra = 1,
        /** 后加签 */
        PostExtra = 2,
      }

      export const enum UpdateRequestApprovalType {
        /** 或签 */
        OR = 0,
        /** 会签 */
        AND = 1,
      }

      export interface UpdateRequest {
        /** 操作人，当system_user为true时，可以不传值 */
        operator?: string
        /** 流程节点id，与approver_id二选一传入，都传以node_id为准 */
        node_id?: string
        /** 审批任务id，与node_id二选一传入，都传以node_id为准 */
        approver_id?: string
        /** 加签方式 */
        extra_type: UpdateRequestExtraType
        /** 多人加签时的审批方式 */
        approval_type?: UpdateRequestApprovalType
        /** 加签人员id列表 */
        extra_user_ids: string[]
        /** 备注 */
        remark?: string
        /** true-以系统身份操作 */
        system_user?: boolean
      }

      export interface UpdateQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
      }
    }

    export namespace Transfer {
      export interface Methods {
        /**
         * 转交审批任务
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-transfer/update
         */
        update(process_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<void>
      }

      export interface UpdateRequest {
        /** 操作人，当system_user为true，可不传值 */
        operator?: string
        /** 被转交人id */
        to_user_id: string
        /** 待转交审批任务id列表 */
        approver_ids: string[]
        /** 备注 */
        remark?: string
        /** true-以系统身份操作 */
        system_user?: boolean
      }

      export interface UpdateQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
      }
    }
  }

  export namespace ProcessRevoke {
    export interface Methods {
      /**
       * 撤销流程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_revoke/update
       */
      update(process_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<void>
    }

    export interface UpdateRequest {
      /** 按照指定的用户ID类型传递对应的用户ID。 */
      user_id?: string
      /** 原因 */
      reason?: string
      /** true-系统身份操作 */
      system_user?: boolean
    }

    export interface UpdateQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
    }
  }

  export namespace ProcessWithdraw {
    export interface Methods {
      /**
       * 撤回流程
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_withdraw/update
       */
      update(process_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<void>
    }

    export interface UpdateRequest {
      /** 按照指定的用户ID类型传递对应的用户ID。 */
      user_id?: string
      /** 原因 */
      reason?: string
      /** true-系统身份操作 */
      system_user?: boolean
    }

    export interface UpdateQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
    }
  }

  export namespace Approver {
    export interface Methods {
      /**
       * 获取指定人员审批任务列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approver/list
       */
      list(query?: ListQuery): Paginated<Lark.ApproverInfo, 'approver_list'>
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 按user_id_type类型传递。如果system_approval为false，则必填。否则非必填。 */
      user_id: string
      /** 任务状态 */
      approver_status?: -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 12 | 14 | 16
    }
  }

  export namespace CompensationStandard {
    export interface Methods {
      /**
       * 获取员工薪资标准
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/compensation_standard/match
       */
      match(query?: MatchQuery): Promise<MatchResponse>
    }

    export interface MatchQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
      /** 此次调用中使用的部门 ID 类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
      /** 雇员ID */
      employment_id: string
      /** 薪资标准的关联对象，项目或者指标 */
      reference_object_api?: 'cpst_item' | 'cpst_indicator'
      /** 薪资标准关联对象ID */
      reference_object_id: string
      /** 部门ID */
      department_id?: string
      /** 工作地点ID */
      work_location_id?: string
      /** 公司ID */
      company_id?: string
      /** 职务序列ID */
      job_family_id?: string
      /** 职级ID */
      job_level_id?: string
      /** 人员类型ID */
      employee_type_id?: string
      /** 招聘类型 */
      recruitment_type?: 'experienced_professionals' | 'recent_graduates' | 'routine_intern'
      /** 定调薪原因ID */
      cpst_change_reason_id?: string
      /** 薪资方案ID */
      cpst_plan_id?: string
      /** 薪级薪等ID */
      cpst_salary_level_id?: string
      /** 生效时间 */
      effective_time?: string
    }

    export interface MatchResponse {
      /** 薪资标准表ID */
      standard_id?: string
      /** 薪资等级 */
      grade?: Lark.CpstGrade
      /** 生效时间 */
      effective_time?: string
    }
  }

  export namespace Subregion {
    export interface Methods {
      /**
       * 批量查询城市/区域信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/list
       */
      list(query?: ListQuery): Paginated<Lark.Subregion>
      /**
       * 查询单条城市/区域信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/get
       */
      get(subregion_id: string): Promise<GetResponse>
    }

    export interface ListQuery extends Pagination {
      /** 省份/行政区id，填写后只查询该省份/行政区下的城市/区域 */
      subdivision_id?: string
    }

    export interface GetResponse {
      /** 城市/区域信息 */
      subregion?: Lark.Subregion
    }
  }

  export namespace Subdivision {
    export interface Methods {
      /**
       * 批量查询省份/行政区信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/list
       */
      list(query?: ListQuery): Paginated<Lark.Subdivision>
      /**
       * 查询单条省份/行政区信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/get
       */
      get(subdivision_id: string): Promise<GetResponse>
    }

    export interface ListQuery extends Pagination {
      /** 国家/地区id，填写后只查询该国家/地区下的省份/行政区 */
      country_region_id?: string
    }

    export interface GetResponse {
      /** 国家/地址信息 */
      subdivision?: Lark.Subdivision
    }
  }

  export namespace CountryRegion {
    export interface Methods {
      /**
       * 批量查询国家/地区信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/list
       */
      list(query?: Pagination): Paginated<Lark.CountryRegion>
      /**
       * 查询单条国家/地区信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/get
       */
      get(country_region_id: string): Promise<GetResponse>
    }

    export interface GetResponse {
      /** 国家/地址信息 */
      country_region?: Lark.CountryRegion
    }
  }

  export namespace Currency {
    export interface Methods {
      /**
       * 批量查询货币信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/list
       */
      list(query?: Pagination): Paginated<Lark.Currency>
      /**
       * 查询单个货币信息
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/get
       */
      get(currency_id: string): Promise<GetResponse>
    }

    export interface GetResponse {
      /** 货币信息 */
      currency?: Lark.Currency
    }
  }
}

Internal.define({
  '/corehr/v1/custom_fields/list_object_api_name': {
    GET: { name: 'corehr.customField.listObjectApiName', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/custom_fields/query': {
    GET: 'corehr.customField.query',
  },
  '/corehr/v1/custom_fields/get_by_param': {
    GET: 'corehr.customField.getByParam',
  },
  '/corehr/v1/common_data/meta_data/add_enum_option': {
    POST: 'corehr.commonData.metaData.addEnumOption',
  },
  '/corehr/v1/common_data/meta_data/edit_enum_option': {
    POST: 'corehr.commonData.metaData.editEnumOption',
  },
  '/corehr/v2/enums/search': {
    POST: 'corehr.enum.search',
  },
  '/corehr/v2/basic_info/country_regions/search': {
    POST: { name: 'corehr.basicInfo.countryRegion.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/country_region_subdivisions/search': {
    POST: { name: 'corehr.basicInfo.countryRegionSubdivision.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/cities/search': {
    POST: { name: 'corehr.basicInfo.city.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/districts/search': {
    POST: { name: 'corehr.basicInfo.district.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/nationalities/search': {
    POST: { name: 'corehr.basicInfo.nationality.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/national_id_types': {
    POST: 'corehr.nationalIdType.create',
    GET: { name: 'corehr.nationalIdType.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/national_id_types/{national_id_type_id}': {
    DELETE: 'corehr.nationalIdType.delete',
    PATCH: 'corehr.nationalIdType.patch',
    GET: 'corehr.nationalIdType.get',
  },
  '/corehr/v2/basic_info/banks/search': {
    POST: { name: 'corehr.basicInfo.bank.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/bank_branchs/search': {
    POST: { name: 'corehr.basicInfo.bankBranch.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/currencies/search': {
    POST: { name: 'corehr.basicInfo.currency.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/time_zones/search': {
    POST: { name: 'corehr.basicInfo.timeZone.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/languages/search': {
    POST: { name: 'corehr.basicInfo.language.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/employee_types': {
    POST: 'corehr.employeeType.create',
    GET: { name: 'corehr.employeeType.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/employee_types/{employee_type_id}': {
    DELETE: 'corehr.employeeType.delete',
    PATCH: 'corehr.employeeType.patch',
    GET: 'corehr.employeeType.get',
  },
  '/corehr/v1/working_hours_types': {
    POST: 'corehr.workingHoursType.create',
    GET: { name: 'corehr.workingHoursType.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/working_hours_types/{working_hours_type_id}': {
    DELETE: 'corehr.workingHoursType.delete',
    PATCH: 'corehr.workingHoursType.patch',
    GET: 'corehr.workingHoursType.get',
  },
  '/corehr/v1/common_data/id/convert': {
    POST: 'corehr.commonData.id.convert',
  },
  '/corehr/v2/employees/batch_get': {
    POST: 'corehr.employee.batchGet',
  },
  '/corehr/v2/employees/search': {
    POST: { name: 'corehr.employee.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/employees': {
    POST: 'corehr.employee.create',
  },
  '/corehr/v2/persons': {
    POST: 'corehr.person.create',
  },
  '/corehr/v2/persons/{person_id}': {
    PATCH: 'corehr.person.patch',
  },
  '/corehr/v1/persons/{person_id}': {
    DELETE: 'corehr.person.delete',
    GET: 'corehr.person.get',
  },
  '/corehr/v1/persons/upload': {
    POST: { name: 'corehr.person.upload', multipart: true },
  },
  '/corehr/v1/files/{id}': {
    GET: { name: 'corehr.file.get', type: 'binary' },
  },
  '/corehr/v1/employments': {
    POST: 'corehr.employment.create',
  },
  '/corehr/v1/employments/{employment_id}': {
    PATCH: 'corehr.employment.patch',
    DELETE: 'corehr.employment.delete',
  },
  '/corehr/v1/job_datas': {
    POST: 'corehr.jobData.create',
    GET: { name: 'corehr.jobData.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/job_datas/{job_data_id}': {
    DELETE: 'corehr.jobData.delete',
    PATCH: 'corehr.jobData.patch',
    GET: 'corehr.jobData.get',
  },
  '/corehr/v2/employees/job_datas/query': {
    POST: { name: 'corehr.employees.jobData.query', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/employees/job_datas/batch_get': {
    POST: 'corehr.employees.jobData.batchGet',
  },
  '/corehr/v2/employees/international_assignments': {
    POST: 'corehr.employees.internationalAssignment.create',
    GET: 'corehr.employees.internationalAssignment.list',
  },
  '/corehr/v2/employees/international_assignments/{international_assignment_id}': {
    PATCH: 'corehr.employees.internationalAssignment.patch',
    DELETE: 'corehr.employees.internationalAssignment.delete',
  },
  '/corehr/v2/employees/additional_jobs': {
    POST: 'corehr.employees.additionalJob.create',
  },
  '/corehr/v2/employees/additional_jobs/{additional_job_id}': {
    PATCH: 'corehr.employees.additionalJob.patch',
    DELETE: 'corehr.employees.additionalJob.delete',
  },
  '/corehr/v2/employees/additional_jobs/batch': {
    POST: { name: 'corehr.employees.additionalJob.batch', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/default_cost_centers/update_version': {
    POST: 'corehr.defaultCostCenter.updateVersion',
  },
  '/corehr/v2/default_cost_centers/remove_version': {
    POST: 'corehr.defaultCostCenter.removeVersion',
  },
  '/corehr/v2/default_cost_centers/create_version': {
    POST: 'corehr.defaultCostCenter.createVersion',
  },
  '/corehr/v2/default_cost_centers/batch_query': {
    POST: 'corehr.defaultCostCenter.batchQuery',
  },
  '/corehr/v2/cost_allocations/update_version': {
    POST: 'corehr.costAllocation.updateVersion',
  },
  '/corehr/v2/cost_allocations/remove_version': {
    POST: 'corehr.costAllocation.removeVersion',
  },
  '/corehr/v2/cost_allocations/create_version': {
    POST: 'corehr.costAllocation.createVersion',
  },
  '/corehr/v2/cost_allocations/batch_query': {
    POST: 'corehr.costAllocation.batchQuery',
  },
  '/corehr/v2/departments/query_operation_logs': {
    POST: { name: 'corehr.department.queryOperationLogs', pagination: { argIndex: 1, itemsKey: 'op_logs', tokenKey: 'next_page_token' } },
  },
  '/corehr/v1/departments': {
    POST: 'corehr.department.create',
    GET: { name: 'corehr.department.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/departments/{department_id}': {
    PATCH: 'corehr.department.patch',
    DELETE: 'corehr.department.delete',
  },
  '/corehr/v2/departments/parents': {
    POST: 'corehr.department.parents',
  },
  '/corehr/v2/departments/batch_get': {
    POST: 'corehr.department.batchGet',
  },
  '/corehr/v2/departments/query_recent_change': {
    GET: 'corehr.department.queryRecentChange',
  },
  '/corehr/v2/departments/query_timeline': {
    POST: 'corehr.department.queryTimeline',
  },
  '/corehr/v2/departments/tree': {
    POST: { name: 'corehr.department.tree', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/departments/query_multi_timeline': {
    POST: { name: 'corehr.department.queryMultiTimeline', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/departments/search': {
    POST: { name: 'corehr.department.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/locations': {
    POST: 'corehr.location.create',
    GET: { name: 'corehr.location.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/locations/{location_id}': {
    PATCH: 'corehr.location.patch',
  },
  '/corehr/v1/locations/{location_id}': {
    GET: 'corehr.location.get',
    DELETE: 'corehr.location.delete',
  },
  '/corehr/v2/locations/query_recent_change': {
    GET: 'corehr.location.queryRecentChange',
  },
  '/corehr/v2/locations/batch_get': {
    POST: 'corehr.location.batchGet',
  },
  '/corehr/v2/locations/active': {
    POST: 'corehr.location.active',
  },
  '/corehr/v2/locations/{location_id}/addresses/{address_id}': {
    DELETE: 'corehr.location.address.delete',
    PATCH: 'corehr.location.address.patch',
  },
  '/corehr/v2/locations/{location_id}/addresses': {
    POST: 'corehr.location.address.create',
  },
  '/corehr/v1/companies': {
    POST: 'corehr.company.create',
    GET: { name: 'corehr.company.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/companies/{company_id}': {
    PATCH: 'corehr.company.patch',
    GET: 'corehr.company.get',
    DELETE: 'corehr.company.delete',
  },
  '/corehr/v2/companies/active': {
    POST: 'corehr.company.active',
  },
  '/corehr/v2/companies/query_recent_change': {
    GET: 'corehr.company.queryRecentChange',
  },
  '/corehr/v2/companies/batch_get': {
    POST: 'corehr.company.batchGet',
  },
  '/corehr/v2/cost_centers': {
    POST: 'corehr.costCenter.create',
  },
  '/corehr/v2/cost_centers/{cost_center_id}': {
    PATCH: 'corehr.costCenter.patch',
    DELETE: 'corehr.costCenter.delete',
  },
  '/corehr/v2/cost_centers/query_recent_change': {
    GET: 'corehr.costCenter.queryRecentChange',
  },
  '/corehr/v2/cost_centers/search': {
    POST: { name: 'corehr.costCenter.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/cost_centers/{cost_center_id}/versions': {
    POST: 'corehr.costCenter.version.create',
  },
  '/corehr/v2/cost_centers/{cost_center_id}/versions/{version_id}': {
    PATCH: 'corehr.costCenter.version.patch',
    DELETE: 'corehr.costCenter.version.delete',
  },
  '/corehr/v2/custom_orgs': {
    POST: 'corehr.customOrg.create',
  },
  '/corehr/v2/custom_orgs/{org_id}': {
    PATCH: 'corehr.customOrg.patch',
  },
  '/corehr/v2/custom_orgs/update_rule': {
    POST: 'corehr.customOrg.updateRule',
  },
  '/corehr/v2/custom_orgs/active': {
    POST: 'corehr.customOrg.active',
  },
  '/corehr/v2/custom_orgs/query': {
    POST: { name: 'corehr.customOrg.query', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/custom_orgs/query_recent_change': {
    GET: 'corehr.customOrg.queryRecentChange',
  },
  '/corehr/v2/custom_orgs/delete_org': {
    POST: 'corehr.customOrg.deleteOrg',
  },
  '/corehr/v2/drafts/{draft_id}': {
    GET: 'corehr.draft.get',
  },
  '/corehr/v2/approval_groups/open_query_position_change_list_by_ids': {
    POST: 'corehr.approvalGroups.openQueryPositionChangeListByIds',
  },
  '/corehr/v2/approval_groups/{process_id}': {
    GET: 'corehr.approvalGroups.get',
  },
  '/corehr/v2/approval_groups/open_query_department_change_list_by_ids': {
    POST: 'corehr.approvalGroups.openQueryDepartmentChangeListByIds',
  },
  '/corehr/v2/approval_groups/open_query_job_change_list_by_ids': {
    POST: 'corehr.approvalGroups.openQueryJobChangeListByIds',
  },
  '/corehr/v1/job_families': {
    POST: 'corehr.jobFamily.create',
    GET: { name: 'corehr.jobFamily.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/job_families/{job_family_id}': {
    PATCH: 'corehr.jobFamily.patch',
    GET: 'corehr.jobFamily.get',
    DELETE: 'corehr.jobFamily.delete',
  },
  '/corehr/v2/job_families/query_recent_change': {
    GET: 'corehr.jobFamily.queryRecentChange',
  },
  '/corehr/v2/job_families/batch_get': {
    POST: 'corehr.jobFamily.batchGet',
  },
  '/corehr/v2/job_families/query_multi_timeline': {
    POST: 'corehr.jobFamily.queryMultiTimeline',
  },
  '/corehr/v1/job_levels': {
    POST: 'corehr.jobLevel.create',
    GET: { name: 'corehr.jobLevel.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/job_levels/{job_level_id}': {
    PATCH: 'corehr.jobLevel.patch',
    GET: 'corehr.jobLevel.get',
    DELETE: 'corehr.jobLevel.delete',
  },
  '/corehr/v2/job_levels/query_recent_change': {
    GET: 'corehr.jobLevel.queryRecentChange',
  },
  '/corehr/v2/job_levels/batch_get': {
    POST: 'corehr.jobLevel.batchGet',
  },
  '/corehr/v2/job_grades': {
    POST: 'corehr.jobGrade.create',
  },
  '/corehr/v2/job_grades/{job_grade_id}': {
    PATCH: 'corehr.jobGrade.patch',
    DELETE: 'corehr.jobGrade.delete',
  },
  '/corehr/v2/job_grades/query': {
    POST: { name: 'corehr.jobGrade.query', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/job_grades/query_recent_change': {
    GET: 'corehr.jobGrade.queryRecentChange',
  },
  '/corehr/v2/pathways': {
    POST: 'corehr.pathway.create',
  },
  '/corehr/v2/pathways/{pathway_id}': {
    PATCH: 'corehr.pathway.patch',
    DELETE: 'corehr.pathway.delete',
  },
  '/corehr/v2/pathways/active': {
    POST: 'corehr.pathway.active',
  },
  '/corehr/v2/pathways/batch_get': {
    POST: 'corehr.pathway.batchGet',
  },
  '/corehr/v1/jobs': {
    POST: 'corehr.job.create',
  },
  '/corehr/v1/jobs/{job_id}': {
    DELETE: 'corehr.job.delete',
    PATCH: 'corehr.job.patch',
  },
  '/corehr/v2/jobs/{job_id}': {
    GET: 'corehr.job.get',
  },
  '/corehr/v2/jobs': {
    GET: { name: 'corehr.job.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/jobs/batch_get': {
    POST: 'corehr.job.batchGet',
  },
  '/corehr/v2/jobs/query_multi_timeline': {
    POST: 'corehr.job.queryMultiTimeline',
  },
  '/corehr/v2/jobs/query_recent_change': {
    GET: 'corehr.job.queryRecentChange',
  },
  '/corehr/v2/positions': {
    POST: 'corehr.position.create',
  },
  '/corehr/v2/positions/{position_id}': {
    PATCH: 'corehr.position.patch',
  },
  '/corehr/v2/positions/query': {
    POST: { name: 'corehr.position.query', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/positions/query_recent_change': {
    GET: 'corehr.position.queryRecentChange',
  },
  '/corehr/v2/positions/active': {
    POST: 'corehr.position.active',
  },
  '/corehr/v2/positions/del_position': {
    POST: 'corehr.position.delPosition',
  },
  '/corehr/v2/pre_hires/withdraw_onboarding': {
    POST: 'corehr.preHire.withdrawOnboarding',
  },
  '/corehr/v2/pre_hires/restore_flow_instance': {
    POST: 'corehr.preHire.restoreFlowInstance',
  },
  '/corehr/v2/pre_hires': {
    POST: 'corehr.preHire.create',
  },
  '/corehr/v2/pre_hires/{pre_hire_id}': {
    PATCH: 'corehr.preHire.patch',
    DELETE: 'corehr.preHire.delete',
  },
  '/corehr/v2/pre_hires/query': {
    POST: { name: 'corehr.preHire.query', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/pre_hires/search': {
    POST: { name: 'corehr.preHire.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/pre_hires/{pre_hire_id}/transit_task': {
    POST: 'corehr.preHire.transitTask',
  },
  '/corehr/v2/pre_hires/transform_onboarding_task': {
    POST: 'corehr.preHire.transformOnboardingTask',
  },
  '/corehr/v2/pre_hires/{pre_hire_id}/complete': {
    POST: 'corehr.preHire.complete',
  },
  '/corehr/v2/probation/assessments': {
    POST: 'corehr.probation.assessment.create',
  },
  '/corehr/v2/probation/enable_disable_assessment': {
    POST: 'corehr.probation.enableDisableAssessment',
  },
  '/corehr/v2/probation/assessments/{assessment_id}': {
    PATCH: 'corehr.probation.assessment.patch',
    DELETE: 'corehr.probation.assessment.delete',
  },
  '/corehr/v2/probation/search': {
    POST: { name: 'corehr.probation.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/probation/submit': {
    POST: 'corehr.probation.submit',
  },
  '/corehr/v2/probation/withdraw': {
    POST: 'corehr.probation.withdraw',
  },
  '/corehr/v2/job_changes': {
    POST: 'corehr.jobChange.create',
  },
  '/corehr/v1/transfer_types/query': {
    GET: 'corehr.transferType.query',
  },
  '/corehr/v1/transfer_reasons/query': {
    GET: 'corehr.transferReason.query',
  },
  '/corehr/v2/job_changes/search': {
    POST: { name: 'corehr.jobChange.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/job_changes/{job_change_id}/revoke': {
    POST: 'corehr.jobChange.revoke',
  },
  '/corehr/v1/offboardings/query': {
    POST: 'corehr.offboarding.query',
  },
  '/corehr/v2/offboardings/submit_v2': {
    POST: 'corehr.offboarding.submitV2',
  },
  '/corehr/v2/offboardings/edit': {
    POST: 'corehr.offboarding.edit',
  },
  '/corehr/v2/offboardings/revoke': {
    POST: 'corehr.offboarding.revoke',
  },
  '/corehr/v1/offboardings/search': {
    POST: { name: 'corehr.offboarding.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/signature_files/terminate': {
    POST: 'corehr.signatureFile.terminate',
  },
  '/corehr/v2/signature_files': {
    GET: { name: 'corehr.signatureFile.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/signature_files/query': {
    POST: { name: 'corehr.signatureFile.query', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/signature_nodes/list_by_file_id': {
    GET: 'corehr.signatureNode.listByFileId',
  },
  '/corehr/v2/signature_files/list_by_biz_id': {
    GET: 'corehr.signatureFile.listByBizId',
  },
  '/corehr/v2/signature_files/{signature_file_id}/download': {
    POST: { name: 'corehr.signatureFile.download', type: 'binary' },
  },
  '/corehr/v2/signature_templates/search': {
    GET: 'corehr.signatureTemplate.search',
  },
  '/corehr/v2/signature_template_info_with_thumbnails': {
    GET: { name: 'corehr.signatureTemplateInfoWithThumbnail.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/contracts': {
    POST: 'corehr.contract.create',
    GET: { name: 'corehr.contract.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/contracts/{contract_id}': {
    PATCH: 'corehr.contract.patch',
    DELETE: 'corehr.contract.delete',
    GET: 'corehr.contract.get',
  },
  '/corehr/v2/contracts/search': {
    POST: { name: 'corehr.contract.search', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/workforce_plan_detail_row/batchSave': {
    POST: 'corehr.workforcePlanDetailRow.batchSave',
  },
  '/corehr/v2/workforce_plan_detail_row/batchDelete': {
    POST: 'corehr.workforcePlanDetailRow.batchDelete',
  },
  '/corehr/v2/report_detail_row/batchSave': {
    POST: 'corehr.reportDetailRow.batchSave',
  },
  '/corehr/v2/report_detail_row/batchDelete': {
    POST: 'corehr.reportDetailRow.batchDelete',
  },
  '/corehr/v2/workforce_plans': {
    GET: 'corehr.workforcePlan.list',
  },
  '/corehr/v2/workforce_plan_details/batch': {
    POST: 'corehr.workforcePlanDetail.batch',
  },
  '/corehr/v2/workforce_plan_details/batch_v2': {
    POST: 'corehr.workforcePlanDetail.batchV2',
  },
  '/corehr/v1/leave_granting_records': {
    POST: 'corehr.leaveGrantingRecord.create',
  },
  '/corehr/v1/leave_granting_records/{leave_granting_record_id}': {
    DELETE: 'corehr.leaveGrantingRecord.delete',
  },
  '/corehr/v1/leaves/leave_types': {
    GET: { name: 'corehr.leave.leaveTypes', pagination: { argIndex: 0, itemsKey: 'leave_type_list' } },
  },
  '/corehr/v1/leaves/leave_balances': {
    GET: { name: 'corehr.leave.leaveBalances', pagination: { argIndex: 0, itemsKey: 'employment_leave_balance_list' } },
  },
  '/corehr/v1/leaves/leave_request_history': {
    GET: { name: 'corehr.leave.leaveRequestHistory', pagination: { argIndex: 0, itemsKey: 'leave_request_list' } },
  },
  '/corehr/v1/leaves/work_calendar': {
    POST: 'corehr.leave.workCalendar',
  },
  '/corehr/v1/leaves/calendar_by_scope': {
    GET: 'corehr.leave.calendarByScope',
  },
  '/corehr/v1/leaves/work_calendar_date': {
    POST: 'corehr.leave.workCalendarDate',
  },
  '/corehr/v1/authorizations/query': {
    GET: { name: 'corehr.authorization.query', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/authorizations/get_by_param': {
    GET: 'corehr.authorization.getByParam',
  },
  '/corehr/v1/security_groups': {
    GET: { name: 'corehr.securityGroup.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/authorizations/add_role_assign': {
    POST: 'corehr.authorization.addRoleAssign',
  },
  '/corehr/v1/authorizations/update_role_assign': {
    POST: 'corehr.authorization.updateRoleAssign',
  },
  '/corehr/v1/authorizations/remove_role_assign': {
    POST: 'corehr.authorization.removeRoleAssign',
  },
  '/corehr/v2/employees/bps/batch_get': {
    POST: 'corehr.employees.bp.batchGet',
  },
  '/corehr/v2/bps/get_by_department': {
    POST: 'corehr.bp.getByDepartment',
  },
  '/corehr/v1/security_groups/query': {
    POST: 'corehr.securityGroup.query',
  },
  '/corehr/v2/bps': {
    GET: { name: 'corehr.bp.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/assigned_users/search': {
    POST: 'corehr.assignedUser.search',
  },
  '/corehr/v2/processes': {
    GET: { name: 'corehr.process.list', pagination: { argIndex: 0, itemsKey: 'process_ids' } },
  },
  '/corehr/v2/processes/{process_id}': {
    GET: 'corehr.process.get',
  },
  '/corehr/v2/processes/{process_id}/flow_variable_data': {
    GET: 'corehr.process.flowVariableData',
  },
  '/corehr/v2/processes/{process_id}/form_variable_data': {
    GET: 'corehr.process.formVariableData.get',
  },
  '/corehr/v2/process_revoke/{process_id}': {
    PUT: 'corehr.processRevoke.update',
  },
  '/corehr/v2/process_withdraw/{process_id}': {
    PUT: 'corehr.processWithdraw.update',
  },
  '/corehr/v2/approvers': {
    GET: { name: 'corehr.approver.list', pagination: { argIndex: 0, itemsKey: 'approver_list' } },
  },
  '/corehr/v2/processes/{process_id}/approvers/{approver_id}': {
    PUT: 'corehr.process.approver.update',
  },
  '/corehr/v2/processes/{process_id}/extra': {
    PUT: 'corehr.process.extra.update',
  },
  '/corehr/v2/processes/{process_id}/transfer': {
    PUT: 'corehr.process.transfer.update',
  },
  '/corehr/v1/compensation_standards/match': {
    GET: 'corehr.compensationStandard.match',
  },
  '/corehr/v1/pre_hires/{pre_hire_id}': {
    GET: 'corehr.preHire.get',
  },
  '/corehr/v1/pre_hires': {
    GET: { name: 'corehr.preHire.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/subregions': {
    GET: { name: 'corehr.subregion.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/subregions/{subregion_id}': {
    GET: 'corehr.subregion.get',
  },
  '/corehr/v1/subdivisions': {
    GET: { name: 'corehr.subdivision.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/subdivisions/{subdivision_id}': {
    GET: 'corehr.subdivision.get',
  },
  '/corehr/v1/country_regions': {
    GET: { name: 'corehr.countryRegion.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/country_regions/{country_region_id}': {
    GET: 'corehr.countryRegion.get',
  },
  '/corehr/v1/currencies': {
    GET: { name: 'corehr.currency.list', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/currencies/{currency_id}': {
    GET: 'corehr.currency.get',
  },
  '/corehr/v1/departments/{department_id}': {
    GET: 'corehr.department.get',
  },
  '/corehr/v1/offboardings/submit': {
    POST: 'corehr.offboarding.submit',
  },
})
