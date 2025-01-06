import { Address, ApprovalGroup, ApproverInfo, AssessmentForCreate, AssignedOrganizationWithCode, Bank, BankAccount, BankBranch, BasicInfo, BasicInfoUpdate, Bp, BpRoleOrganization, City, Company, Contract, CostCenter, CostCenterVersion, CountryRegion, CountryRegionSubdivision, CpstGrade, CreateTransferInfo, Currency, CustomField, CustomFieldData, DataengineI18n, Department, DepartmentChange, DepartmentCreate, DepartmentHrbp, DepartmentParents, DepartmentTimeline, DepartmentTree, Dependent, District, Education, EducationInfo, Email, EmergencyContact, Employee, EmployeeJobData, EmployeeType, EmployeesAdditionalJob, EmployeesAdditionalJobBatchReqDate, EmployeesAdditionalJobWriteResp, Employment, EmploymentBp, EmploymentCreate, EmploymentLeaveBalance, Enum, EnumFieldOption, FieldVariableValue, FormFieldVariable, HiberarchyCommon, Hrbp, I18n, IdInfo, Job, JobChange, JobData, JobFamily, JobGrade, JobLevel, Language, LeaveGrantingRecord, LeaveRequest, LeaveType, Location, ManagementScope, NationalId, NationalIdType, Nationality, Object, ObjectFieldData, Offboarding, OffboardingReason, OfferInfo, OfferInfoUpdate, OrganizationOpLog, Person, PersonInfo, PersonName, PersonalProfile, Phone, PhoneNumberAndAreaCode, PreHire, PreHireQuery, ProbationInfo, ProbationInfoForSubmit, ProcessAbstractItem, ProcessCcItem, ProcessCommentInfo, ProcessDoneItem, ProcessFormVariableV2, ProcessLink, ProcessSystemDoneItem, ProcessSystemTodoItem, ProcessTodoItem, ProfileSettingCareer, ProfileSettingDataAttachment, ProfileSettingEmploymentInfo, ProfileSettingPersonalInfo, ResidentTax, RoleAuthorization, SecurityGroup, Subdivision, Subregion, SupportCostCenterItem, TimeZone, TransferInfo, TransferReason, TransferType, WkCalendarDate, WkOption, WorkCalendarDetail, WorkExperience, WorkExperienceInfo, WorkforcePlan, WorkforcePlanDetail, WorkforcePlanDetailRow, WorkingHoursType } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取飞书人事对象列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/list_object_api_name
     */
    listObjectApiNameCorehrCustomField(query?: ListObjectApiNameCorehrCustomFieldQuery): Promise<Paginated<Object>>
    /**
     * 获取自定义字段列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/query
     */
    queryCorehrCustomField(query?: QueryCorehrCustomFieldQuery): Promise<QueryCorehrCustomFieldResponse>
    /**
     * 获取字段详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param
     */
    getByParamCorehrCustomField(query?: GetByParamCorehrCustomFieldQuery): Promise<GetByParamCorehrCustomFieldResponse>
    /**
     * 增加字段枚举值选项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/add_enum_option
     */
    addEnumOptionCorehrCommonDataMetaData(body: AddEnumOptionCorehrCommonDataMetaDataRequest, query?: AddEnumOptionCorehrCommonDataMetaDataQuery): Promise<AddEnumOptionCorehrCommonDataMetaDataResponse>
    /**
     * 修改字段枚举值选项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/edit_enum_option
     */
    editEnumOptionCorehrCommonDataMetaData(body: EditEnumOptionCorehrCommonDataMetaDataRequest, query?: EditEnumOptionCorehrCommonDataMetaDataQuery): Promise<EditEnumOptionCorehrCommonDataMetaDataResponse>
    /**
     * 查询国家/地区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search
     */
    searchCorehrBasicInfoCountryRegion(body: SearchCorehrBasicInfoCountryRegionRequest, query?: SearchCorehrBasicInfoCountryRegionQuery): Promise<Paginated<CountryRegion>>
    /**
     * 查询省份/主要行政区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search
     */
    searchCorehrBasicInfoCountryRegionSubdivision(body: SearchCorehrBasicInfoCountryRegionSubdivisionRequest, query?: SearchCorehrBasicInfoCountryRegionSubdivisionQuery): Promise<Paginated<CountryRegionSubdivision>>
    /**
     * 查询城市信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search
     */
    searchCorehrBasicInfoCity(body: SearchCorehrBasicInfoCityRequest, query?: SearchCorehrBasicInfoCityQuery): Promise<Paginated<City>>
    /**
     * 查询区/县信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-district/search
     */
    searchCorehrBasicInfoDistrict(body: SearchCorehrBasicInfoDistrictRequest, query?: SearchCorehrBasicInfoDistrictQuery): Promise<Paginated<District>>
    /**
     * 查询国籍信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-nationality/search
     */
    searchCorehrBasicInfoNationality(body: SearchCorehrBasicInfoNationalityRequest, query?: SearchCorehrBasicInfoNationalityQuery): Promise<Paginated<Nationality>>
    /**
     * 创建国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/create
     */
    createCorehrNationalIdType(body: CreateCorehrNationalIdTypeRequest, query?: CreateCorehrNationalIdTypeQuery): Promise<CreateCorehrNationalIdTypeResponse>
    /**
     * 删除国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/delete
     */
    deleteCorehrNationalIdType(national_id_type_id: string): Promise<void>
    /**
     * 更新国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/patch
     */
    patchCorehrNationalIdType(national_id_type_id: string, body: PatchCorehrNationalIdTypeRequest, query?: PatchCorehrNationalIdTypeQuery): Promise<PatchCorehrNationalIdTypeResponse>
    /**
     * 查询单个国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/get
     */
    getCorehrNationalIdType(national_id_type_id: string): Promise<GetCorehrNationalIdTypeResponse>
    /**
     * 批量查询国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/list
     */
    listCorehrNationalIdType(query?: ListCorehrNationalIdTypeQuery): Promise<Paginated<NationalIdType>>
    /**
     * 查询银行信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search
     */
    searchCorehrBasicInfoBank(body: SearchCorehrBasicInfoBankRequest, query?: SearchCorehrBasicInfoBankQuery): Promise<Paginated<Bank>>
    /**
     * 查询支行信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank_branch/search
     */
    searchCorehrBasicInfoBankBranch(body: SearchCorehrBasicInfoBankBranchRequest, query?: SearchCorehrBasicInfoBankBranchQuery): Promise<Paginated<BankBranch>>
    /**
     * 查询货币信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-currency/search
     */
    searchCorehrBasicInfoCurrency(body: SearchCorehrBasicInfoCurrencyRequest, query?: SearchCorehrBasicInfoCurrencyQuery): Promise<Paginated<Currency>>
    /**
     * 查询时区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-time_zone/search
     */
    searchCorehrBasicInfoTimeZone(body: SearchCorehrBasicInfoTimeZoneRequest, query?: SearchCorehrBasicInfoTimeZoneQuery): Promise<Paginated<TimeZone>>
    /**
     * 查询语言信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-language/search
     */
    searchCorehrBasicInfoLanguage(body: SearchCorehrBasicInfoLanguageRequest, query?: SearchCorehrBasicInfoLanguageQuery): Promise<Paginated<Language>>
    /**
     * 创建人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/create
     */
    createCorehrEmployeeType(body: CreateCorehrEmployeeTypeRequest, query?: CreateCorehrEmployeeTypeQuery): Promise<CreateCorehrEmployeeTypeResponse>
    /**
     * 删除人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/delete
     */
    deleteCorehrEmployeeType(employee_type_id: string): Promise<void>
    /**
     * 更新人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/patch
     */
    patchCorehrEmployeeType(employee_type_id: string, body: PatchCorehrEmployeeTypeRequest, query?: PatchCorehrEmployeeTypeQuery): Promise<PatchCorehrEmployeeTypeResponse>
    /**
     * 查询单个人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/get
     */
    getCorehrEmployeeType(employee_type_id: string): Promise<GetCorehrEmployeeTypeResponse>
    /**
     * 批量查询人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list
     */
    listCorehrEmployeeType(query?: ListCorehrEmployeeTypeQuery): Promise<Paginated<EmployeeType>>
    /**
     * 创建工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/create
     */
    createCorehrWorkingHoursType(body: CreateCorehrWorkingHoursTypeRequest, query?: CreateCorehrWorkingHoursTypeQuery): Promise<CreateCorehrWorkingHoursTypeResponse>
    /**
     * 删除工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/delete
     */
    deleteCorehrWorkingHoursType(working_hours_type_id: string): Promise<void>
    /**
     * 更新工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/patch
     */
    patchCorehrWorkingHoursType(working_hours_type_id: string, body: PatchCorehrWorkingHoursTypeRequest, query?: PatchCorehrWorkingHoursTypeQuery): Promise<PatchCorehrWorkingHoursTypeResponse>
    /**
     * 查询单个工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/get
     */
    getCorehrWorkingHoursType(working_hours_type_id: string): Promise<GetCorehrWorkingHoursTypeResponse>
    /**
     * 批量查询工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list
     */
    listCorehrWorkingHoursType(query?: ListCorehrWorkingHoursTypeQuery): Promise<Paginated<WorkingHoursType>>
    /**
     * ID 转换
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-id/convert
     */
    convertCorehrCommonDataId(body: ConvertCorehrCommonDataIdRequest, query?: ConvertCorehrCommonDataIdQuery): Promise<ConvertCorehrCommonDataIdResponse>
    /**
     * 批量查询员工信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get
     */
    batchGetCorehrEmployee(body: BatchGetCorehrEmployeeRequest, query?: BatchGetCorehrEmployeeQuery): Promise<BatchGetCorehrEmployeeResponse>
    /**
     * 搜索员工信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/search
     */
    searchCorehrEmployee(body: SearchCorehrEmployeeRequest, query?: SearchCorehrEmployeeQuery): Promise<Paginated<Employee>>
    /**
     * 添加人员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create
     */
    createCorehrEmployee(body: CreateCorehrEmployeeRequest, query?: CreateCorehrEmployeeQuery): Promise<CreateCorehrEmployeeResponse>
    /**
     * 创建个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/create
     */
    createCorehrPerson(body: CreateCorehrPersonRequest, query?: CreateCorehrPersonQuery): Promise<CreateCorehrPersonResponse>
    /**
     * 更新个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/patch
     */
    patchCorehrPerson(person_id: string, body: PatchCorehrPersonRequest, query?: PatchCorehrPersonQuery): Promise<PatchCorehrPersonResponse>
    /**
     * 删除个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/delete
     */
    deleteCorehrPerson(person_id: string): Promise<void>
    /**
     * 上传文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/upload
     */
    uploadCorehrPerson(form: UploadCorehrPersonForm): Promise<UploadCorehrPersonResponse>
    /**
     * 下载文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/file/get
     */
    getCorehrFile(id: string): Promise<ArrayBuffer>
    /**
     * 创建雇佣信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/create
     */
    createCorehrEmployment(body: CreateCorehrEmploymentRequest, query?: CreateCorehrEmploymentQuery): Promise<CreateCorehrEmploymentResponse>
    /**
     * 更新雇佣信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/patch
     */
    patchCorehrEmployment(employment_id: string, body: PatchCorehrEmploymentRequest, query?: PatchCorehrEmploymentQuery): Promise<PatchCorehrEmploymentResponse>
    /**
     * 删除雇佣信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/delete
     */
    deleteCorehrEmployment(employment_id: string, query?: DeleteCorehrEmploymentQuery): Promise<void>
    /**
     * 创建任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/create
     */
    createCorehrJobData(body: CreateCorehrJobDataRequest, query?: CreateCorehrJobDataQuery): Promise<CreateCorehrJobDataResponse>
    /**
     * 删除任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/delete
     */
    deleteCorehrJobData(job_data_id: string, query?: DeleteCorehrJobDataQuery): Promise<void>
    /**
     * 更新任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/patch
     */
    patchCorehrJobData(job_data_id: string, body: PatchCorehrJobDataRequest, query?: PatchCorehrJobDataQuery): Promise<PatchCorehrJobDataResponse>
    /**
     * 获取任职信息列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/query
     */
    queryCorehrEmployeesJobData(body: QueryCorehrEmployeesJobDataRequest, query?: QueryCorehrEmployeesJobDataQuery): Promise<Paginated<EmployeeJobData>>
    /**
     * 批量查询员工任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/batch_get
     */
    batchGetCorehrEmployeesJobData(body: BatchGetCorehrEmployeesJobDataRequest, query?: BatchGetCorehrEmployeesJobDataQuery): Promise<BatchGetCorehrEmployeesJobDataResponse>
    /**
     * 批量查询任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/list
     */
    listCorehrJobData(query?: ListCorehrJobDataQuery): Promise<Paginated<JobData>>
    /**
     * 查询单个任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/get
     */
    getCorehrJobData(job_data_id: string, query?: GetCorehrJobDataQuery): Promise<GetCorehrJobDataResponse>
    /**
     * 创建兼职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/create
     */
    createCorehrEmployeesAdditionalJob(body: CreateCorehrEmployeesAdditionalJobRequest, query?: CreateCorehrEmployeesAdditionalJobQuery): Promise<CreateCorehrEmployeesAdditionalJobResponse>
    /**
     * 更新兼职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/patch
     */
    patchCorehrEmployeesAdditionalJob(additional_job_id: string, body: PatchCorehrEmployeesAdditionalJobRequest, query?: PatchCorehrEmployeesAdditionalJobQuery): Promise<PatchCorehrEmployeesAdditionalJobResponse>
    /**
     * 删除兼职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/delete
     */
    deleteCorehrEmployeesAdditionalJob(additional_job_id: string): Promise<void>
    /**
     * 批量查询兼职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/batch
     */
    batchCorehrEmployeesAdditionalJob(body: BatchCorehrEmployeesAdditionalJobRequest, query?: BatchCorehrEmployeesAdditionalJobQuery): Promise<Paginated<EmployeesAdditionalJob>>
    /**
     * 批量查询部门操作日志
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_operation_logs
     */
    queryOperationLogsCorehrDepartment(body: QueryOperationLogsCorehrDepartmentRequest, query?: QueryOperationLogsCorehrDepartmentQuery): Promise<QueryOperationLogsCorehrDepartmentResponse>
    /**
     * 创建部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/create
     */
    createCorehrDepartment(body: CreateCorehrDepartmentRequest, query?: CreateCorehrDepartmentQuery): Promise<CreateCorehrDepartmentResponse>
    /**
     * 更新部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/patch
     */
    patchCorehrDepartment(department_id: string, body: PatchCorehrDepartmentRequest, query?: PatchCorehrDepartmentQuery): Promise<void>
    /**
     * 获取父部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/parents
     */
    parentsCorehrDepartment(body: ParentsCorehrDepartmentRequest, query?: ParentsCorehrDepartmentQuery): Promise<ParentsCorehrDepartmentResponse>
    /**
     * 批量查询部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get
     */
    batchGetCorehrDepartment(body: BatchGetCorehrDepartmentRequest, query?: BatchGetCorehrDepartmentQuery): Promise<BatchGetCorehrDepartmentResponse>
    /**
     * 查询指定时间范围内当前生效信息发生变更的部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_recent_change
     */
    queryRecentChangeCorehrDepartment(query?: QueryRecentChangeCorehrDepartmentQuery): Promise<QueryRecentChangeCorehrDepartmentResponse>
    /**
     * 查询指定生效日期的部门基本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_timeline
     */
    queryTimelineCorehrDepartment(body: QueryTimelineCorehrDepartmentRequest, query?: QueryTimelineCorehrDepartmentQuery): Promise<QueryTimelineCorehrDepartmentResponse>
    /**
     * 查询指定生效日期的部门架构树
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/tree
     */
    treeCorehrDepartment(body: TreeCorehrDepartmentRequest, query?: TreeCorehrDepartmentQuery): Promise<Paginated<DepartmentTree>>
    /**
     * 批量查询部门版本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_multi_timeline
     */
    queryMultiTimelineCorehrDepartment(body: QueryMultiTimelineCorehrDepartmentRequest, query?: QueryMultiTimelineCorehrDepartmentQuery): Promise<Paginated<DepartmentTimeline>>
    /**
     * 搜索部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/search
     */
    searchCorehrDepartment(body: SearchCorehrDepartmentRequest, query?: SearchCorehrDepartmentQuery): Promise<Paginated<Department>>
    /**
     * 删除部门 V2
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/delete
     */
    deleteCorehrDepartment(department_id: string, query?: DeleteCorehrDepartmentQuery): Promise<void>
    /**
     * 创建地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/create
     */
    createCorehrLocation(body: CreateCorehrLocationRequest, query?: CreateCorehrLocationQuery): Promise<CreateCorehrLocationResponse>
    /**
     * 更新地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/patch
     */
    patchCorehrLocation(location_id: string, body: PatchCorehrLocationRequest, query?: PatchCorehrLocationQuery): Promise<void>
    /**
     * 查询单个地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/get
     */
    getCorehrLocation(location_id: string): Promise<GetCorehrLocationResponse>
    /**
     * 查询当前生效信息发生变更的地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/query_recent_change
     */
    queryRecentChangeCorehrLocation(query?: QueryRecentChangeCorehrLocationQuery): Promise<QueryRecentChangeCorehrLocationResponse>
    /**
     * 通过地点 ID 批量获取地点信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/batch_get
     */
    batchGetCorehrLocation(body: BatchGetCorehrLocationRequest): Promise<BatchGetCorehrLocationResponse>
    /**
     * 批量分页查询地点信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list
     */
    listCorehrLocation(query?: ListCorehrLocationQuery): Promise<Paginated<Location>>
    /**
     * 启用/停用地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/active
     */
    activeCorehrLocation(body: ActiveCorehrLocationRequest): Promise<void>
    /**
     * 删除地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/delete
     */
    deleteCorehrLocation(location_id: string): Promise<void>
    /**
     * 删除地点地址
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/delete
     */
    deleteCorehrLocationAddress(location_id: string, address_id: string): Promise<void>
    /**
     * 更新地点地址
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/patch
     */
    patchCorehrLocationAddress(location_id: string, address_id: string, body: PatchCorehrLocationAddressRequest, query?: PatchCorehrLocationAddressQuery): Promise<void>
    /**
     * 添加地点地址
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/create
     */
    createCorehrLocationAddress(location_id: string, body: CreateCorehrLocationAddressRequest, query?: CreateCorehrLocationAddressQuery): Promise<CreateCorehrLocationAddressResponse>
    /**
     * 创建公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/create
     */
    createCorehrCompany(body: CreateCorehrCompanyRequest, query?: CreateCorehrCompanyQuery): Promise<CreateCorehrCompanyResponse>
    /**
     * 更新公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/patch
     */
    patchCorehrCompany(company_id: string, body: PatchCorehrCompanyRequest, query?: PatchCorehrCompanyQuery): Promise<PatchCorehrCompanyResponse>
    /**
     * 启用/停用公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/active
     */
    activeCorehrCompany(body: ActiveCorehrCompanyRequest): Promise<void>
    /**
     * 查询单个公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/get
     */
    getCorehrCompany(company_id: string): Promise<GetCorehrCompanyResponse>
    /**
     * 批量查询公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list
     */
    listCorehrCompany(query?: ListCorehrCompanyQuery): Promise<Paginated<Company>>
    /**
     * 查询指定时间范围内当前生效信息发生变更的公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/query_recent_change
     */
    queryRecentChangeCorehrCompany(query?: QueryRecentChangeCorehrCompanyQuery): Promise<QueryRecentChangeCorehrCompanyResponse>
    /**
     * 通过公司 ID 批量获取公司信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/batch_get
     */
    batchGetCorehrCompany(body: BatchGetCorehrCompanyRequest): Promise<BatchGetCorehrCompanyResponse>
    /**
     * 删除公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/delete
     */
    deleteCorehrCompany(company_id: string): Promise<void>
    /**
     * 创建成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/create
     */
    createCorehrCostCenter(body: CreateCorehrCostCenterRequest, query?: CreateCorehrCostCenterQuery): Promise<CreateCorehrCostCenterResponse>
    /**
     * 启用 / 停用成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/patch
     */
    patchCorehrCostCenter(cost_center_id: string, body: PatchCorehrCostCenterRequest, query?: PatchCorehrCostCenterQuery): Promise<PatchCorehrCostCenterResponse>
    /**
     * 查询当前生效信息发生变更的成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/query_recent_change
     */
    queryRecentChangeCorehrCostCenter(query?: QueryRecentChangeCorehrCostCenterQuery): Promise<QueryRecentChangeCorehrCostCenterResponse>
    /**
     * 搜索成本中心信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/search
     */
    searchCorehrCostCenter(body: SearchCorehrCostCenterRequest, query?: SearchCorehrCostCenterQuery): Promise<Paginated<CostCenterVersion>>
    /**
     * 删除成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/delete
     */
    deleteCorehrCostCenter(cost_center_id: string, body: DeleteCorehrCostCenterRequest): Promise<void>
    /**
     * 创建成本中心版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/create
     */
    createCorehrCostCenterVersion(cost_center_id: string, body: CreateCorehrCostCenterVersionRequest, query?: CreateCorehrCostCenterVersionQuery): Promise<CreateCorehrCostCenterVersionResponse>
    /**
     * 更正成本中心版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/patch
     */
    patchCorehrCostCenterVersion(cost_center_id: string, version_id: string, body: PatchCorehrCostCenterVersionRequest, query?: PatchCorehrCostCenterVersionQuery): Promise<PatchCorehrCostCenterVersionResponse>
    /**
     * 撤销成本中心版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/delete
     */
    deleteCorehrCostCenterVersion(cost_center_id: string, version_id: string, body: DeleteCorehrCostCenterVersionRequest): Promise<void>
    /**
     * 根据流程 ID 查询组织架构调整记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/get
     */
    getCorehrApprovalGroups(process_id: string, query?: GetCorehrApprovalGroupsQuery): Promise<GetCorehrApprovalGroupsResponse>
    /**
     * 批量查询部门调整内容
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_department_change_list_by_ids
     */
    openQueryDepartmentChangeListByIdsCorehrApprovalGroups(body: OpenQueryDepartmentChangeListByIdsCorehrApprovalGroupsRequest, query?: OpenQueryDepartmentChangeListByIdsCorehrApprovalGroupsQuery): Promise<OpenQueryDepartmentChangeListByIdsCorehrApprovalGroupsResponse>
    /**
     * 批量查询人员调整内容
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_job_change_list_by_ids
     */
    openQueryJobChangeListByIdsCorehrApprovalGroups(body: OpenQueryJobChangeListByIdsCorehrApprovalGroupsRequest, query?: OpenQueryJobChangeListByIdsCorehrApprovalGroupsQuery): Promise<OpenQueryJobChangeListByIdsCorehrApprovalGroupsResponse>
    /**
     * 创建序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/create
     */
    createCorehrJobFamily(body: CreateCorehrJobFamilyRequest, query?: CreateCorehrJobFamilyQuery): Promise<CreateCorehrJobFamilyResponse>
    /**
     * 更新序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/patch
     */
    patchCorehrJobFamily(job_family_id: string, body: PatchCorehrJobFamilyRequest, query?: PatchCorehrJobFamilyQuery): Promise<PatchCorehrJobFamilyResponse>
    /**
     * 查询单个序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/get
     */
    getCorehrJobFamily(job_family_id: string): Promise<GetCorehrJobFamilyResponse>
    /**
     * 批量查询序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list
     */
    listCorehrJobFamily(query?: ListCorehrJobFamilyQuery): Promise<Paginated<JobFamily>>
    /**
     * 查询当前生效信息发生变更的序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/query_recent_change
     */
    queryRecentChangeCorehrJobFamily(query?: QueryRecentChangeCorehrJobFamilyQuery): Promise<QueryRecentChangeCorehrJobFamilyResponse>
    /**
     * 通过序列 ID 批量获取序列信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/batch_get
     */
    batchGetCorehrJobFamily(body: BatchGetCorehrJobFamilyRequest): Promise<BatchGetCorehrJobFamilyResponse>
    /**
     * 删除序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/delete
     */
    deleteCorehrJobFamily(job_family_id: string): Promise<void>
    /**
     * 新建职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/create
     */
    createCorehrJobLevel(body: CreateCorehrJobLevelRequest, query?: CreateCorehrJobLevelQuery): Promise<CreateCorehrJobLevelResponse>
    /**
     * 更新单个职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/patch
     */
    patchCorehrJobLevel(job_level_id: string, body: PatchCorehrJobLevelRequest, query?: PatchCorehrJobLevelQuery): Promise<PatchCorehrJobLevelResponse>
    /**
     * 查询单个职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/get
     */
    getCorehrJobLevel(job_level_id: string): Promise<GetCorehrJobLevelResponse>
    /**
     * 批量查询职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list
     */
    listCorehrJobLevel(query?: ListCorehrJobLevelQuery): Promise<Paginated<JobLevel>>
    /**
     * 查询当前生效信息发生变更的职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/query_recent_change
     */
    queryRecentChangeCorehrJobLevel(query?: QueryRecentChangeCorehrJobLevelQuery): Promise<QueryRecentChangeCorehrJobLevelResponse>
    /**
     * 通过职级 ID 批量获取职级信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/batch_get
     */
    batchGetCorehrJobLevel(body: BatchGetCorehrJobLevelRequest): Promise<BatchGetCorehrJobLevelResponse>
    /**
     * 删除职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/delete
     */
    deleteCorehrJobLevel(job_level_id: string): Promise<void>
    /**
     * 创建职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/create
     */
    createCorehrJobGrade(body: CreateCorehrJobGradeRequest, query?: CreateCorehrJobGradeQuery): Promise<CreateCorehrJobGradeResponse>
    /**
     * 更新职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/patch
     */
    patchCorehrJobGrade(job_grade_id: string, body: PatchCorehrJobGradeRequest, query?: PatchCorehrJobGradeQuery): Promise<void>
    /**
     * 查询职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query
     */
    queryCorehrJobGrade(body: QueryCorehrJobGradeRequest, query?: QueryCorehrJobGradeQuery): Promise<Paginated<JobGrade>>
    /**
     * 查询当前生效信息发生变更的职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query_recent_change
     */
    queryRecentChangeCorehrJobGrade(query?: QueryRecentChangeCorehrJobGradeQuery): Promise<QueryRecentChangeCorehrJobGradeResponse>
    /**
     * 删除职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/delete
     */
    deleteCorehrJobGrade(job_grade_id: string): Promise<void>
    /**
     * 创建职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/create
     */
    createCorehrJob(body: CreateCorehrJobRequest, query?: CreateCorehrJobQuery): Promise<CreateCorehrJobResponse>
    /**
     * 删除职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/delete
     */
    deleteCorehrJob(job_id: string): Promise<void>
    /**
     * 更新职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/patch
     */
    patchCorehrJob(job_id: string, body: PatchCorehrJobRequest, query?: PatchCorehrJobQuery): Promise<PatchCorehrJobResponse>
    /**
     * 查询单个职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/get
     */
    getCorehrJob(job_id: string): Promise<GetCorehrJobResponse>
    /**
     * 批量查询职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list
     */
    listCorehrJob(query?: ListCorehrJobQuery): Promise<Paginated<Job>>
    /**
     * 撤销入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/withdraw_onboarding
     */
    withdrawOnboardingCorehrPreHire(body: WithdrawOnboardingCorehrPreHireRequest): Promise<WithdrawOnboardingCorehrPreHireResponse>
    /**
     * 恢复入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/restore_flow_instance
     */
    restoreFlowInstanceCorehrPreHire(body: RestoreFlowInstanceCorehrPreHireRequest): Promise<RestoreFlowInstanceCorehrPreHireResponse>
    /**
     * 直接创建待入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/create
     */
    createCorehrPreHire(body: CreateCorehrPreHireRequest): Promise<CreateCorehrPreHireResponse>
    /**
     * 更新待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/patch
     */
    patchCorehrPreHire(pre_hire_id: string, body: PatchCorehrPreHireRequest): Promise<PatchCorehrPreHireResponse>
    /**
     * 删除待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/delete
     */
    deleteCorehrPreHire(pre_hire_id: string): Promise<void>
    /**
     * 查询待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/query
     */
    queryCorehrPreHire(body: QueryCorehrPreHireRequest, query?: QueryCorehrPreHireQuery): Promise<Paginated<PreHire>>
    /**
     * 查询单个待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/get
     */
    getCorehrPreHire(pre_hire_id: string): Promise<GetCorehrPreHireResponse>
    /**
     * 批量查询待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/list
     */
    listCorehrPreHire(query?: ListCorehrPreHireQuery): Promise<Paginated<PreHireQuery>>
    /**
     * 搜索待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/search
     */
    searchCorehrPreHire(body: SearchCorehrPreHireRequest, query?: SearchCorehrPreHireQuery): Promise<Paginated<PreHire>>
    /**
     * 流转入职任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/transit_task
     */
    transitTaskCorehrPreHire(pre_hire_id: string, body: TransitTaskCorehrPreHireRequest): Promise<TransitTaskCorehrPreHireResponse>
    /**
     * 操作员工完成入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/complete
     */
    completeCorehrPreHire(pre_hire_id: string): Promise<CompleteCorehrPreHireResponse>
    /**
     * 删除待入职（不推荐）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/delete
     */
    deleteCorehrPreHire(pre_hire_id: string): Promise<void>
    /**
     * 更新待入职信息（不推荐）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/patch
     */
    patchCorehrPreHire(pre_hire_id: string, body: PatchCorehrPreHireRequest, query?: PatchCorehrPreHireQuery): Promise<PatchCorehrPreHireResponse>
    /**
     * 新增试用期考核信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/create
     */
    createCorehrProbationAssessment(body: CreateCorehrProbationAssessmentRequest, query?: CreateCorehrProbationAssessmentQuery): Promise<CreateCorehrProbationAssessmentResponse>
    /**
     * 启用/停用试用期考核功能
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/enable_disable_assessment
     */
    enableDisableAssessmentCorehrProbation(body: EnableDisableAssessmentCorehrProbationRequest): Promise<void>
    /**
     * 更新试用期考核信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/patch
     */
    patchCorehrProbationAssessment(assessment_id: string, body: PatchCorehrProbationAssessmentRequest, query?: PatchCorehrProbationAssessmentQuery): Promise<void>
    /**
     * 搜索试用期信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/search
     */
    searchCorehrProbation(body: SearchCorehrProbationRequest, query?: SearchCorehrProbationQuery): Promise<Paginated<ProbationInfo>>
    /**
     * 删除试用期考核信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/delete
     */
    deleteCorehrProbationAssessment(assessment_id: string): Promise<void>
    /**
     * 发起转正
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/submit
     */
    submitCorehrProbation(body: SubmitCorehrProbationRequest, query?: SubmitCorehrProbationQuery): Promise<SubmitCorehrProbationResponse>
    /**
     * 撤销转正
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/withdraw
     */
    withdrawCorehrProbation(body: WithdrawCorehrProbationRequest, query?: WithdrawCorehrProbationQuery): Promise<void>
    /**
     * 发起员工异动
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/create
     */
    createCorehrJobChange(body: CreateCorehrJobChangeRequest, query?: CreateCorehrJobChangeQuery): Promise<CreateCorehrJobChangeResponse>
    /**
     * 获取异动类型列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_type/query
     */
    queryCorehrTransferType(query?: QueryCorehrTransferTypeQuery): Promise<QueryCorehrTransferTypeResponse>
    /**
     * 获取异动原因列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_reason/query
     */
    queryCorehrTransferReason(query?: QueryCorehrTransferReasonQuery): Promise<QueryCorehrTransferReasonResponse>
    /**
     * 搜索员工异动信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/search
     */
    searchCorehrJobChange(body: SearchCorehrJobChangeRequest, query?: SearchCorehrJobChangeQuery): Promise<Paginated<JobChange>>
    /**
     * 撤销异动
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/revoke
     */
    revokeCorehrJobChange(job_change_id: string, body: RevokeCorehrJobChangeRequest, query?: RevokeCorehrJobChangeQuery): Promise<void>
    /**
     * 发起员工异动(不推荐)
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_change/create
     */
    createCorehrJobChange(body: CreateCorehrJobChangeRequest, query?: CreateCorehrJobChangeQuery): Promise<CreateCorehrJobChangeResponse>
    /**
     * 查询员工离职原因列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query
     */
    queryCorehrOffboarding(body: QueryCorehrOffboardingRequest): Promise<QueryCorehrOffboardingResponse>
    /**
     * 操作员工离职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/submit_v2
     */
    submitV2CorehrOffboarding(body: SubmitV2CorehrOffboardingRequest, query?: SubmitV2CorehrOffboardingQuery): Promise<SubmitV2CorehrOffboardingResponse>
    /**
     * 编辑离职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/edit
     */
    editCorehrOffboarding(body: EditCorehrOffboardingRequest, query?: EditCorehrOffboardingQuery): Promise<EditCorehrOffboardingResponse>
    /**
     * 撤销离职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/revoke
     */
    revokeCorehrOffboarding(body: RevokeCorehrOffboardingRequest, query?: RevokeCorehrOffboardingQuery): Promise<void>
    /**
     * 搜索离职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/search
     */
    searchCorehrOffboarding(body: SearchCorehrOffboardingRequest, query?: SearchCorehrOffboardingQuery): Promise<Paginated<Offboarding>>
    /**
     * 新建合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/create
     */
    createCorehrContract(body: CreateCorehrContractRequest, query?: CreateCorehrContractQuery): Promise<CreateCorehrContractResponse>
    /**
     * 更新合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/patch
     */
    patchCorehrContract(contract_id: string, body: PatchCorehrContractRequest, query?: PatchCorehrContractQuery): Promise<PatchCorehrContractResponse>
    /**
     * 删除合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/delete
     */
    deleteCorehrContract(contract_id: string): Promise<void>
    /**
     * 查询单个合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/get
     */
    getCorehrContract(contract_id: string): Promise<GetCorehrContractResponse>
    /**
     * 批量查询合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/list
     */
    listCorehrContract(query?: ListCorehrContractQuery): Promise<Paginated<Contract>>
    /**
     * 搜索合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/contract/search
     */
    searchCorehrContract(body: SearchCorehrContractRequest, query?: SearchCorehrContractQuery): Promise<Paginated<Contract>>
    /**
     * 批量创建/更新明细行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchSave
     */
    batchSaveCorehrWorkforcePlanDetailRow(body: BatchSaveCorehrWorkforcePlanDetailRowRequest): Promise<void>
    /**
     * 批量删除明细行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchDelete
     */
    batchDeleteCorehrWorkforcePlanDetailRow(body: BatchDeleteCorehrWorkforcePlanDetailRowRequest): Promise<void>
    /**
     * 批量创建/更新填报行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchSave
     */
    batchSaveCorehrReportDetailRow(body: BatchSaveCorehrReportDetailRowRequest): Promise<void>
    /**
     * 批量删除填报行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchDelete
     */
    batchDeleteCorehrReportDetailRow(body: BatchDeleteCorehrReportDetailRowRequest): Promise<void>
    /**
     * 查询编制规划方案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan/list
     */
    listCorehrWorkforcePlan(query?: ListCorehrWorkforcePlanQuery): Promise<ListCorehrWorkforcePlanResponse>
    /**
     * 查询编制规划明细信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail/batch
     */
    batchCorehrWorkforcePlanDetail(body: BatchCorehrWorkforcePlanDetailRequest, query?: BatchCorehrWorkforcePlanDetailQuery): Promise<BatchCorehrWorkforcePlanDetailResponse>
    /**
     * 创建假期发放记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/create
     */
    createCorehrLeaveGrantingRecord(body: CreateCorehrLeaveGrantingRecordRequest, query?: CreateCorehrLeaveGrantingRecordQuery): Promise<CreateCorehrLeaveGrantingRecordResponse>
    /**
     * 删除假期发放记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/delete
     */
    deleteCorehrLeaveGrantingRecord(leave_granting_record_id: string): Promise<void>
    /**
     * 获取假期类型列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_types
     */
    leaveTypesCorehrLeave(query?: LeaveTypesCorehrLeaveQuery): Promise<Paginated<LeaveType, 'leave_type_list'>>
    /**
     * 批量查询员工假期余额
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_balances
     */
    leaveBalancesCorehrLeave(query?: LeaveBalancesCorehrLeaveQuery): Promise<Paginated<EmploymentLeaveBalance, 'employment_leave_balance_list'>>
    /**
     * 批量查询员工请假记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_request_history
     */
    leaveRequestHistoryCorehrLeave(query?: LeaveRequestHistoryCorehrLeaveQuery): Promise<Paginated<LeaveRequest, 'leave_request_list'>>
    /**
     * 获取工作日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar
     */
    workCalendarCorehrLeave(body: WorkCalendarCorehrLeaveRequest): Promise<WorkCalendarCorehrLeaveResponse>
    /**
     * 根据适用条件获取工作日历 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/calendar_by_scope
     */
    calendarByScopeCorehrLeave(query?: CalendarByScopeCorehrLeaveQuery): Promise<CalendarByScopeCorehrLeaveResponse>
    /**
     * 获取工作日历日期详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar_date
     */
    workCalendarDateCorehrLeave(body: WorkCalendarDateCorehrLeaveRequest): Promise<WorkCalendarDateCorehrLeaveResponse>
    /**
     * 批量查询用户授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/query
     */
    queryCorehrAuthorization(query?: QueryCorehrAuthorizationQuery): Promise<Paginated<RoleAuthorization>>
    /**
     * 查询单个用户授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/get_by_param
     */
    getByParamCorehrAuthorization(query?: GetByParamCorehrAuthorizationQuery): Promise<GetByParamCorehrAuthorizationResponse>
    /**
     * 批量获取角色列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/list
     */
    listCorehrSecurityGroup(query?: ListCorehrSecurityGroupQuery): Promise<Paginated<SecurityGroup>>
    /**
     * 为用户授权角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/add_role_assign
     */
    addRoleAssignCorehrAuthorization(body: AddRoleAssignCorehrAuthorizationRequest, query?: AddRoleAssignCorehrAuthorizationQuery): Promise<AddRoleAssignCorehrAuthorizationResponse>
    /**
     * 更新用户被授权的数据范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/update_role_assign
     */
    updateRoleAssignCorehrAuthorization(body: UpdateRoleAssignCorehrAuthorizationRequest, query?: UpdateRoleAssignCorehrAuthorizationQuery): Promise<UpdateRoleAssignCorehrAuthorizationResponse>
    /**
     * 移除用户被授权的角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/remove_role_assign
     */
    removeRoleAssignCorehrAuthorization(query?: RemoveRoleAssignCorehrAuthorizationQuery): Promise<RemoveRoleAssignCorehrAuthorizationResponse>
    /**
     * 查询员工 HRBP / 属地 BP
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-bp/batch_get
     */
    batchGetCorehrEmployeesBp(body: BatchGetCorehrEmployeesBpRequest, query?: BatchGetCorehrEmployeesBpQuery): Promise<BatchGetCorehrEmployeesBpResponse>
    /**
     * 查询部门 HRBP
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/get_by_department
     */
    getByDepartmentCorehrBp(body: GetByDepartmentCorehrBpRequest, query?: GetByDepartmentCorehrBpQuery): Promise<GetByDepartmentCorehrBpResponse>
    /**
     * 查询部门 / 地点的 HRBP / 属地 BP
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/query
     */
    queryCorehrSecurityGroup(body: QueryCorehrSecurityGroupRequest, query?: QueryCorehrSecurityGroupQuery): Promise<QueryCorehrSecurityGroupResponse>
    /**
     * 获取 HRBP 列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/list
     */
    listCorehrBp(query?: ListCorehrBpQuery): Promise<Paginated<Bp>>
    /**
     * 获取组织类角色授权列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/assigned_user/search
     */
    searchCorehrAssignedUser(body: SearchCorehrAssignedUserRequest, query?: SearchCorehrAssignedUserQuery): Promise<Paginated<RoleAuthorization>>
    /**
     * 查询流程实例列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/list
     */
    listCorehrProcess(query?: ListCorehrProcessQuery): Promise<Paginated<string, 'process_ids'>>
    /**
     * 获取单个流程详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/get
     */
    getCorehrProcess(process_id: string, query?: GetCorehrProcessQuery): Promise<GetCorehrProcessResponse>
    /**
     * 获取流程表单数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-form_variable_data/get
     */
    getCorehrProcessFormVariableData(process_id: string, query?: GetCorehrProcessFormVariableDataQuery): Promise<GetCorehrProcessFormVariableDataResponse>
    /**
     * 撤销流程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_revoke/update
     */
    updateCorehrProcessRevoke(process_id: string, body: UpdateCorehrProcessRevokeRequest, query?: UpdateCorehrProcessRevokeQuery): Promise<void>
    /**
     * 撤回流程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_withdraw/update
     */
    updateCorehrProcessWithdraw(process_id: string, body: UpdateCorehrProcessWithdrawRequest, query?: UpdateCorehrProcessWithdrawQuery): Promise<void>
    /**
     * 获取指定人员审批任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approver/list
     */
    listCorehrApprover(query?: ListCorehrApproverQuery): Promise<Paginated<ApproverInfo, 'approver_list'>>
    /**
     * 通过/拒绝审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-approver/update
     */
    updateCorehrProcessApprover(process_id: string, approver_id: string, body: UpdateCorehrProcessApproverRequest, query?: UpdateCorehrProcessApproverQuery): Promise<UpdateCorehrProcessApproverResponse>
    /**
     * 加签审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-extra/update
     */
    updateCorehrProcessExtra(process_id: string, body: UpdateCorehrProcessExtraRequest, query?: UpdateCorehrProcessExtraQuery): Promise<void>
    /**
     * 转交审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-transfer/update
     */
    updateCorehrProcessTransfer(process_id: string, body: UpdateCorehrProcessTransferRequest, query?: UpdateCorehrProcessTransferQuery): Promise<void>
    /**
     * 获取员工薪资标准
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/compensation_standard/match
     */
    matchCorehrCompensationStandard(query?: MatchCorehrCompensationStandardQuery): Promise<MatchCorehrCompensationStandardResponse>
    /**
     * 获取流程表单数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/process-form_variable_data/get
     */
    getCorehrProcessFormVariableData(process_id: string): Promise<GetCorehrProcessFormVariableDataResponse>
    /**
     * 批量查询城市/区域信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/list
     */
    listCorehrSubregion(query?: ListCorehrSubregionQuery): Promise<Paginated<Subregion>>
    /**
     * 查询单条城市/区域信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/get
     */
    getCorehrSubregion(subregion_id: string): Promise<GetCorehrSubregionResponse>
    /**
     * 批量查询省份/行政区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/list
     */
    listCorehrSubdivision(query?: ListCorehrSubdivisionQuery): Promise<Paginated<Subdivision>>
    /**
     * 查询单条省份/行政区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/get
     */
    getCorehrSubdivision(subdivision_id: string): Promise<GetCorehrSubdivisionResponse>
    /**
     * 批量查询国家/地区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/list
     */
    listCorehrCountryRegion(query?: ListCorehrCountryRegionQuery): Promise<Paginated<CountryRegion>>
    /**
     * 查询单条国家/地区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/get
     */
    getCorehrCountryRegion(country_region_id: string): Promise<GetCorehrCountryRegionResponse>
    /**
     * 批量查询货币信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/list
     */
    listCorehrCurrency(query?: ListCorehrCurrencyQuery): Promise<Paginated<Currency>>
    /**
     * 查询单个货币信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/get
     */
    getCorehrCurrency(currency_id: string): Promise<GetCorehrCurrencyResponse>
    /**
     * 查询单个职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/get
     */
    getCorehrJob(job_id: string): Promise<GetCorehrJobResponse>
    /**
     * 删除部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/delete
     */
    deleteCorehrDepartment(department_id: string): Promise<void>
    /**
     * 更新部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/patch
     */
    patchCorehrDepartment(department_id: string, body: PatchCorehrDepartmentRequest, query?: PatchCorehrDepartmentQuery): Promise<PatchCorehrDepartmentResponse>
    /**
     * 查询单个部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/get
     */
    getCorehrDepartment(department_id: string, query?: GetCorehrDepartmentQuery): Promise<GetCorehrDepartmentResponse>
    /**
     * 批量查询职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/list
     */
    listCorehrJob(query?: ListCorehrJobQuery): Promise<Paginated<Job>>
    /**
     * 批量查询部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/list
     */
    listCorehrDepartment(query?: ListCorehrDepartmentQuery): Promise<Paginated<Department>>
    /**
     * 更新个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/patch
     */
    patchCorehrPerson(person_id: string, body: PatchCorehrPersonRequest, query?: PatchCorehrPersonQuery): Promise<PatchCorehrPersonResponse>
    /**
     * 创建个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/create
     */
    createCorehrPerson(body: CreateCorehrPersonRequest, query?: CreateCorehrPersonQuery): Promise<CreateCorehrPersonResponse>
    /**
     * 查询单个个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/get
     */
    getCorehrPerson(person_id: string, query?: GetCorehrPersonQuery): Promise<GetCorehrPersonResponse>
    /**
     * 操作员工离职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/submit
     */
    submitCorehrOffboarding(body: SubmitCorehrOffboardingRequest, query?: SubmitCorehrOffboardingQuery): Promise<SubmitCorehrOffboardingResponse>
  }
}

export interface ListObjectApiNameCorehrCustomFieldQuery extends Pagination {
}

export interface QueryCorehrCustomFieldQuery {
  /** 所属对象 apiname，支持一个或多个当前数量限制为 20 个 */
  object_api_name_list: string[]
}

export interface GetByParamCorehrCustomFieldQuery {
  /** 所属对象 apiname */
  object_api_name: string
  /** 自定义字段 apiname */
  custom_api_name: string
}

export interface AddEnumOptionCorehrCommonDataMetaDataRequest {
  /** 所属对象 API name，可通过[获取飞书人事对象列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/list_object_api_name)接口中返回的 `object_api_name` 字段获取 */
  object_api_name: string
  /** 枚举字段 API name，可通过[获取自定义字段列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/query)接口中返回的 `custom_api_name` 字段获取 */
  enum_field_api_name: string
  /** 新增枚举选项列表 */
  enum_field_options: EnumFieldOption[]
}

export interface AddEnumOptionCorehrCommonDataMetaDataQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface EditEnumOptionCorehrCommonDataMetaDataRequest {
  /** 所属对象 API name，可通过[获取飞书人事对象列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/list_object_api_name)接口中返回的 `object_api_name` 字段获取 */
  object_api_name: string
  /** 枚举字段 API name，可通过[获取自定义字段列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/query)接口中返回的 `custom_api_name` 字段获取 */
  enum_field_api_name: string
  /** 枚举选项 */
  enum_field_option: EnumFieldOption
}

export interface EditEnumOptionCorehrCommonDataMetaDataQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface SearchCorehrBasicInfoCountryRegionRequest {
  /** 国家/地区 ID 列表，可从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.country_region_id`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.country_region_id` 等字段中获取 */
  country_region_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoCountryRegionQuery extends Pagination {
}

export interface SearchCorehrBasicInfoCountryRegionSubdivisionRequest {
  /** 国家/地区 ID 列表，可通过【查询国家/地区信息】接口获取 */
  country_region_id_list?: string[]
  /** 省份/行政区 ID 列表 */
  country_region_subdivision_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoCountryRegionSubdivisionQuery extends Pagination {
}

export interface SearchCorehrBasicInfoCityRequest {
  /** 省份/主要行政区 ID 列表，可通过[查询省份/主要行政区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search)接口列举，或从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.region_id`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.region_id` 等字段中获取 */
  country_region_subdivision_id_list?: string[]
  /** 城市 ID 列表，可从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.city_id_v2`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.city_id_v2` 等字段中获取 */
  city_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoCityQuery extends Pagination {
}

export interface SearchCorehrBasicInfoDistrictRequest {
  /** 所属城市 ID 列表，可通过[查询城市信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search)接口列举，或从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.city_v2_id`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.city_v2_id` 等字段中获取 */
  city_id_list?: string[]
  /** 区/县 ID 列表，可从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.district_id_v2`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.district_id_v2` 等字段中获取 */
  district_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoDistrictQuery extends Pagination {
}

export interface SearchCorehrBasicInfoNationalityRequest {
  /** 国籍 ID 列表，可从[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.nationality_id_v2` 等字段中获取 */
  nationality_id_list?: string[]
  /** 国家/地区 ID 列表，可通过[查询国家/地区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口列举 */
  country_region_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoNationalityQuery extends Pagination {
}

export interface CreateCorehrNationalIdTypeRequest {
  /** 国家 / 地区 */
  country_region_id: string
  /** 名称 */
  name: I18n[]
  /** 启用 */
  active: boolean
  /** 校验规则 */
  validation_rule: string
  /** 校验规则描述 */
  validation_rule_description?: I18n[]
  /** 编码 */
  code: string
  /** 证件类型 */
  identification_type: Enum
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface CreateCorehrNationalIdTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrNationalIdTypeRequest {
  /** 国家 / 地区 */
  country_region_id?: string
  /** 名称 */
  name?: I18n[]
  /** 启用 */
  active?: boolean
  /** 校验规则 */
  validation_rule?: string
  /** 校验规则描述 */
  validation_rule_description?: I18n[]
  /** 编码 */
  code?: string
  /** 证件类型 */
  identification_type?: Enum
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface PatchCorehrNationalIdTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ListCorehrNationalIdTypeQuery extends Pagination {
  /** 证件类型 */
  identification_type?: string
  /** 证件类型编码 */
  code?: string
  /** 国家地区ID */
  country_region_id?: string
}

export interface SearchCorehrBasicInfoBankRequest {
  /** 银行 ID 列表，可通过[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)、[批量查询员工信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_id_v2` 字段获取 */
  bank_id_list?: string[]
  /** 银行名称列表，支持对银行名称精确搜索 */
  bank_name_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
  /** 最早更新时间 */
  update_start_time?: string
  /** 最晚更新时间 */
  update_end_time?: string
}

export interface SearchCorehrBasicInfoBankQuery extends Pagination {
}

export interface SearchCorehrBasicInfoBankBranchRequest {
  /** 银行 ID 列表，可通过[查询银行信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search)列举，或从[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)、[批量查询员工信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_id_v2` 字段中获取 */
  bank_id_list?: string[]
  /** 支行 ID 列表，可通过[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)、[批量查询员工信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_branch_id_v2` 字段获取 */
  bank_branch_id_list?: string[]
  /** 支行名称列表，支持对支行名称精确搜索 */
  bank_branch_name_list?: string[]
  /** 金融分支机构编码（联行号）列表，支持对金融分支机构编码精确搜索 */
  code_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
  /** 最早更新时间 */
  update_start_time?: string
  /** 最晚更新时间 */
  update_end_time?: string
}

export interface SearchCorehrBasicInfoBankBranchQuery extends Pagination {
}

export interface SearchCorehrBasicInfoCurrencyRequest {
  /** 货币 ID 列表，可通过[批量查询薪资方案](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list)、[批量查询员工薪资档案](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query)等接口返回的 `currency_id` 字段获取 */
  currency_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoCurrencyQuery extends Pagination {
}

export interface SearchCorehrBasicInfoTimeZoneRequest {
  /** 时区 ID 列表 */
  time_zone_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoTimeZoneQuery extends Pagination {
}

export interface SearchCorehrBasicInfoLanguageRequest {
  /** 语言 ID 列表 */
  language_id_list?: string[]
  /** 状态列表 */
  status_list?: 1 | 0[]
}

export interface SearchCorehrBasicInfoLanguageQuery extends Pagination {
}

export interface CreateCorehrEmployeeTypeRequest {
  /** 名称 */
  name: I18n[]
  /** 默认雇员类型 */
  default_employee_type: boolean
  /** 启用 */
  active: boolean
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface CreateCorehrEmployeeTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrEmployeeTypeRequest {
  /** 名称 */
  name?: I18n[]
  /** 默认雇员类型 */
  default_employee_type?: boolean
  /** 启用 */
  active?: boolean
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface PatchCorehrEmployeeTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ListCorehrEmployeeTypeQuery extends Pagination {
}

export interface CreateCorehrWorkingHoursTypeRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name: I18n[]
  /** 国家/地区 */
  country_region_id_list?: string[]
  /** 职务默认值 */
  default_for_job: boolean
  /** 启用 */
  active: boolean
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface CreateCorehrWorkingHoursTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrWorkingHoursTypeRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name?: I18n[]
  /** 国家/地区 */
  country_region_id_list?: string[]
  /** 职务默认值 */
  default_for_job?: boolean
  /** 启用 */
  active?: boolean
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface PatchCorehrWorkingHoursTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ListCorehrWorkingHoursTypeQuery extends Pagination {
}

export interface ConvertCorehrCommonDataIdRequest {
  /** ID 列表（最多传入 100 个 ID，ID 长度限制 50 个字符） */
  ids: string[]
}

export interface ConvertCorehrCommonDataIdQuery {
  /** ID 转换类型 */
  id_transform_type: 1 | 2 | 3 | 4
  /** 要转换的ID类型 */
  id_type: 'user_id' | 'department_id' | 'job_level_id' | 'job_family_id' | 'employee_type_id'
  /** 用户 ID 类型 */
  feishu_user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 类型 */
  feishu_department_id_type?: 'open_department_id' | 'department_id'
}

export interface BatchGetCorehrEmployeeRequest {
  /** 返回数据的字段列表，填写方式：为空时默认仅返回 ID */
  fields?: string[]
  /** 雇佣 ID 列表 */
  employment_ids?: string[]
  /** 个人信息 ID 列表，employment_ids参数有值时该参数不生效 */
  person_ids?: string[]
  /** 主工作邮箱列表 */
  work_emails?: string[]
}

export interface BatchGetCorehrEmployeeQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface SearchCorehrEmployeeRequest {
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
  /** 成本中心 ID 列表- 可通过 [【搜索成本中心信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/search) 获取 */
  cost_center_id_list?: string[]
  /** 任职公司 ID 列表- [【批量查询公司】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取 */
  service_company_list?: string[]
  /** 任职公司 ID 列表（含下级）- [【批量查询公司】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取 */
  service_company_list_include_sub?: string[]
  /** 序列 ID 列表 - [【批量查询序列】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取 */
  job_family_id_list?: string[]
  /** 序列 ID 列表（含下级） - [【批量查询序列】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取 */
  job_family_id_list_include_sub?: string[]
  /** 职级 ID 列表- 可通过[【批量查询职级】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取- 需要有字段读取权限 */
  job_level_id_list?: string[]
  /** 职等 ID 列表- 可通过[【查询职等】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query)获取- 需要有字段读取权限 */
  job_grade_id_list?: string[]
  /** 职务 ID 列表- 可通过[【批量查询职务】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取- 需要有字段读取权限 */
  job_id_list?: string[]
  /** 岗位 ID 列表 - 功能灰度中，如有需求请联系[技术支持](https://applink.feishu.cn/TLJpeNdW) - 需要有字段读取权限 */
  position_id_list?: string[]
  /** 岗位 ID 列表（含下级） - 功能灰度中，如有需求请联系[技术支持](https://applink.feishu.cn/TLJpeNdW) - 需要有字段读取权限 */
  position_id_list_include_sub?: string[]
  /** 工时制度 ID 列表- 可通过[【批量查询工时制度】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取- 需要有字段读取权限 */
  working_hours_type_id_list?: string[]
  /** 国籍 ID 列表- 可通过[【查询国籍信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-nationality/search)获取- 需要有字段读取权限 */
  nationality_id_list?: string[]
  /** 员工所属薪资组 ID 列表 - 可通过 [【获取薪资组基本信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list) 获取 - 需要有字段读取权限 */
  pay_group_id_list?: string[]
  /** 员工所属外派薪资组 ID 列表- 可通过 [【获取薪资组基本信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/payroll-v1/paygroup/list) 获取- 需要有字段读取权限 */
  assignment_pay_group_id_list?: string[]
  /** 员工当前合同类型列表- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)查询  - object_api_name：contract  - custom_api_name：contract_type- 需要有字段读取权限 */
  contract_type_list?: string[]
  /** 员工当前所属薪资方案 ID 列表- 可通过[【批量查询薪资方案】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list)获取- 需要有字段读取权限 */
  archive_cpst_plan_id_list?: string[]
}

export interface SearchCorehrEmployeeQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrEmployeeRequest {
  /** 个人信息 */
  personal_info?: ProfileSettingPersonalInfo
  /** 工作信息 */
  employment_info?: ProfileSettingEmploymentInfo
  /** 履历信息 */
  career?: ProfileSettingCareer
  /** 资料附件 */
  data_attachment?: ProfileSettingDataAttachment
}

export interface CreateCorehrEmployeeQuery {
  /** 幂等标识，服务端会忽略client_token重复的请求 */
  client_token?: string
  /** 是否为离职重聘：false: 否，系统直接标为非离职重聘人员，不再做重复判断"true: 是，要求rehire_employment_id */
  rehire?: boolean
  /** 离职重聘员工雇佣ID, rehire */
  rehire_employment_id?: string
  /** 是否强制提交，超编等场景需要用户确认影响才能提交 */
  force_submit?: boolean
  /** 是否忽略工时制度自动生成规则 */
  ignore_working_hours_type_rule?: boolean
}

export interface CreateCorehrPersonRequest {
  /** 姓名列表 */
  name_list: PersonName[]
  /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
  gender?: Enum
  /** 出生日期 */
  date_of_birth?: string
  /** 国籍 ID，可通过【查询国籍信息】接口查询 */
  nationality_id_v2?: string
  /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
  race?: Enum
  /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
  marital_status?: Enum
  /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
  phone_list?: Phone[]
  /** 地址列表 */
  address_list?: Address[]
  /** 邮箱列表 */
  email_list?: Email[]
  /** 工作经历列表 */
  work_experience_list?: WorkExperienceInfo[]
  /** 教育经历列表 */
  education_list?: Education[]
  /** 银行账户 */
  bank_account_list?: BankAccount[]
  /** 证件 */
  national_id_list?: NationalId[]
  /** 家庭成员列表 */
  dependent_list?: Dependent[]
  /** 紧急联系人列表 */
  emergency_contact_list?: EmergencyContact[]
  /** 参加工作日期 */
  date_entered_workforce?: string
  /** 头像资源的 ID */
  profile_image_id?: string
  /** 个人资料附件 */
  personal_profile?: PersonalProfile[]
  /** 籍贯 ID */
  native_region?: string
  /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
  hukou_type?: Enum
  /** 户口所在地 */
  hukou_location?: string
  /** 政治面貌，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：political_affiliation - object_api_name：person_info_chn */
  political_affiliations?: Enum[]
  /** 人才 ID */
  talent_id?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
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
  resident_taxes?: ResidentTax[]
  /** 首次入境日期 */
  first_entry_time?: string
  /** 预计离境日期 */
  leave_time?: string
}

export interface CreateCorehrPersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrPersonRequest {
  /** 姓名列表 */
  name_list?: PersonName[]
  /** -| 性别，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：gender - object_api_name：person */
  gender?: Enum
  /** 出生日期 */
  date_of_birth?: string
  /** 国籍 ID，可通过【查询国籍信息】接口查询 */
  nationality_id_v2?: string
  /** -| 民族 / 种族，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：ethnicity_race - object_api_name：person */
  race?: Enum
  /** -| 婚姻状况，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：marital_status - object_api_name：person */
  marital_status?: Enum
  /** 电话列表，只有当满足下面所有条件时，电话在个人信息页才可见 */
  phone_list?: Phone[]
  /** 地址列表 */
  address_list?: Address[]
  /** 邮箱列表 */
  email_list?: Email[]
  /** 工作经历列表 */
  work_experience_list?: WorkExperienceInfo[]
  /** 教育经历列表 */
  education_list?: Education[]
  /** 银行账户 */
  bank_account_list?: BankAccount[]
  /** 证件 */
  national_id_list?: NationalId[]
  /** 家庭成员列表 */
  dependent_list?: Dependent[]
  /** 紧急联系人列表 */
  emergency_contact_list?: EmergencyContact[]
  /** 参加工作日期 */
  date_entered_workforce?: string
  /** 头像资源的 ID */
  profile_image_id?: string
  /** 个人资料附件 */
  personal_profile?: PersonalProfile[]
  /** 籍贯 ID */
  native_region?: string
  /** 户口类型，枚举值可通过文档【飞书人事枚举常量】户口类型（hukou_type）枚举定义部分获得 */
  hukou_type?: Enum
  /** 户口所在地 */
  hukou_location?: string
  /** 政治面貌，枚举值可查询【获取字段详情】接口获取，按如下参数查询即可： - custom_api_name：political_affiliation - object_api_name：person_info_chn */
  political_affiliations?: Enum[]
  /** 人才 ID */
  talent_id?: string
  /** 自定义字段 */
  custom_fields?: CustomFieldData[]
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
  resident_taxes?: ResidentTax[]
  /** 首次入境日期 */
  first_entry_time?: string
  /** 预计离境日期 */
  leave_time?: string
}

export interface PatchCorehrPersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 根据no_need_query判断更新后是否做查询请求并返回个人信息 */
  no_need_query?: boolean
}

export interface UploadCorehrPersonForm {
  /** 文件二进制内容 */
  file_content: Blob
  /** 文件名称 */
  file_name: string
}

export interface CreateCorehrEmploymentRequest {
  /** 资历起算日期 */
  seniority_date?: string
  /** 员工编号 */
  employee_number?: string
  /** 入职日期 */
  effective_time: string
  /** 离职日期 */
  expiration_time?: string
  /** 雇佣类型 */
  employment_type: Enum
  /** 人员信息，引用Person的ID */
  person_id: string
  /** 是否是主雇佣信息 */
  primary_employment: boolean
  /** 雇员状态 */
  employment_status: Enum
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 工作邮箱列表 */
  work_email_list?: Email[]
  /** 离职原因 */
  reason_for_offboarding?: Enum
  /** 招聘应用 ID */
  ats_application_id?: string
  /** 是否离职重聘 */
  rehire?: Enum
  /** 历史雇佣信息 ID */
  rehire_employment_id?: string
}

export interface CreateCorehrEmploymentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrEmploymentRequest {
  /** 资历起算日期 */
  seniority_date?: string
  /** 员工编号 */
  employee_number?: string
  /** 雇佣类型 */
  employment_type?: Enum
  /** 人员信息，引用Person的ID */
  person_id?: string
  /** 是否是主雇佣信息 */
  primary_employment?: boolean
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 工作邮箱列表 */
  work_email_list?: Email[]
  /** 离职原因 */
  reason_for_offboarding?: Enum
  /** 招聘应用 ID */
  ats_application_id?: string
}

export interface PatchCorehrEmploymentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface DeleteCorehrEmploymentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrJobDataRequest {
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
  assignment_start_reason: Enum
  /** 试用期结束日期 */
  probation_expected_end_date?: string
  /** 实线主管 */
  direct_manager_id?: string
  /** 虚线主管 */
  dotted_line_manager_id_list?: string[]
  /** 第二实线主管 */
  second_direct_manager_id?: string
  /** 成本中心分摊信息 */
  cost_center_rate?: SupportCostCenterItem[]
  /** 排班类型 */
  work_shift?: Enum
  /** 薪资类型 */
  compensation_type?: Enum
  /** 任职公司 */
  service_company?: string
}

export interface CreateCorehrJobDataQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface DeleteCorehrJobDataQuery {
  /** 需要删除的任职记录版本 ID */
  version_id?: string
}

export interface PatchCorehrJobDataRequest {
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
  assignment_start_reason?: Enum
  /** 试用期结束日期 */
  probation_expected_end_date?: string
  /** 实线主管 */
  direct_manager_id?: string
  /** 虚线主管 */
  dotted_line_manager_id_list?: string[]
  /** 第二实线主管 */
  second_direct_manager_id?: string
  /** 成本中心分摊信息 */
  cost_center_rate?: SupportCostCenterItem[]
  /** 排班类型 */
  work_shift?: Enum
  /** 薪资类型 */
  compensation_type?: Enum
  /** 任职公司 */
  service_company?: string
}

export interface PatchCorehrJobDataQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
  /** 是否强校验。值为 true 时，会对入参进行业务校验，并产生异动记录、发送异动事件。- 默认值：false- 仅在新增任职版本时生效，当 version_id 不为空时该字段不生效 */
  strict_verify?: string
}

export interface QueryCorehrEmployeesJobDataRequest {
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
  /** 是否仅查询主职- true：仅返回 primary_job_data 为 true 的任职记录- false：仅返回 primary_job_data 为 false 的任职记录- 不传：返回全部 */
  primary_job_data?: boolean
  /** 任职原因- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：job_data  - custom_api_name：assignment_start_reason */
  assignment_start_reasons?: string[]
}

export interface QueryCorehrEmployeesJobDataQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface BatchGetCorehrEmployeesJobDataRequest {
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
  /** 是否仅查询主职- true：仅返回 primary_job_data 为 true 的任职记录- false：仅返回 primary_job_data 为 false 的任职记录- 不传：返回全部 */
  primary_job_data?: boolean
  /** 任职原因- 可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：  - object_api_name：job_data  - custom_api_name：assignment_start_reason */
  assignment_start_reasons?: string[]
}

export interface BatchGetCorehrEmployeesJobDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface ListCorehrJobDataQuery extends Pagination {
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

export interface GetCorehrJobDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrEmployeesAdditionalJobRequest {
  /** 人员类型 ID，可通过[【批量查询人员类型】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list)获取 */
  employee_type_id: string
  /** 工时制度 ID，可通过[【批量查询工时制度】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取详细信息 */
  working_hours_type_id?: string
  /** 工作地点 ID，可通过[【批量查询地点】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list)获取详细信息 */
  work_location_id?: string
  /** 部门 ID，可通过[【批量查询部门】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get)获取详细信息；类型与department_id_type一致 */
  department_id: string
  /** 职务 ID，可通过[【批量查询职务】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取详细信息 */
  job_id?: string
  /** 职级 ID，可通过[【批量查询职级】](/ssl:ttdoc//uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取详细信息 */
  job_level_id?: string
  /** 序列 ID，可通过[【批量查询序列】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取详细信息 */
  job_family_id?: string
  /** 雇佣 ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  employment_id: string
  /** 兼职开始日期 */
  start_date: string
  /** 兼职结束日期，不可清空 */
  end_date?: string
  /** 直属上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  direct_manager_id?: string
  /** 虚线上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  dotted_line_manager_id?: string
  /** 排班类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "work_shift" */
  work_shift?: Enum
  /** 薪资类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "compensation_type" */
  compensation_type?: Enum
  /** 任职公司，可通过[【批量查询公司】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取详细信息 */
  service_company?: string
  /** 周工作时长【0~168】 */
  weekly_working_hours?: string
  /** 工作日历ID，可通过[【查询工作日历】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取详细信息 */
  work_calendar_id?: string
  /** 岗位 ID */
  position_id?: string
  /** 人员子类型 ID */
  employee_subtype_id?: string
}

export interface CreateCorehrEmployeesAdditionalJobQuery {
  /** 操作的唯一标识，用于幂等校验。请求成功时，重复的client_token不会再创建、变更数据。 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface PatchCorehrEmployeesAdditionalJobRequest {
  /** 人员类型 ID，可通过[【批量查询人员类型】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list)获取 */
  employee_type_id?: string
  /** 工时制度 ID，可通过[【批量查询工时制度】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list)获取详细信息 */
  working_hours_type_id?: string
  /** 工作地点 ID，可通过[【批量查询地点】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list)获取详细信息 */
  work_location_id?: string
  /** 部门 ID，可通过[【批量查询部门】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get)获取详细信息；类型与department_id_type一致 */
  department_id?: string
  /** 职务 ID，可通过[【批量查询职务】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list)获取详细信息 */
  job_id?: string
  /** 职级 ID，可通过[【批量查询职级】](/ssl:ttdoc//uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list)获取详细信息 */
  job_level_id?: string
  /** 序列 ID，可通过[【批量查询序列】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list)获取详细信息 */
  job_family_id?: string
  /** 兼职开始日期 */
  start_date?: string
  /** 兼职结束日期，不可清空 */
  end_date?: string
  /** 直属上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  direct_manager_id?: string
  /** 虚线上级的雇佣ID，可通过[【批量查询员工信息】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)获取详细信息；类型与user_id_type一致 */
  dotted_line_manager_id?: string
  /** 排班类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "work_shift" */
  work_shift?: Enum
  /** 薪资类型，可通过[【获取字段详情】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param)接口查询，查询参数如下：- object_api_name = "job_data"- custom_api_name = "compensation_type" */
  compensation_type?: Enum
  /** 任职公司，可通过[【批量查询公司】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list)获取详细信息 */
  service_company?: string
  /** 周工作时长【0~168】 */
  weekly_working_hours?: string
  /** 工作日历ID，可通过[【查询工作日历】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar)获取详细信息 */
  work_calendar_id?: string
  /** 岗位 ID */
  position_id?: string
  /** 人员子类型 ID */
  employee_subtype_id?: string
}

export interface PatchCorehrEmployeesAdditionalJobQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface BatchCorehrEmployeesAdditionalJobRequest {
  /** 雇佣 ID */
  employment_ids?: string[]
  /** 兼职 ID */
  additional_job_ids?: string[]
  /** 开始日期 */
  start_date?: EmployeesAdditionalJobBatchReqDate
  /** 结束日期 */
  end_date?: EmployeesAdditionalJobBatchReqDate
  /** 查看数据日期，默认当天 */
  data_date?: string
  /** 仅查询 【data_date】日期生效中的 */
  is_effective?: boolean
}

export interface BatchCorehrEmployeesAdditionalJobQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryOperationLogsCorehrDepartmentRequest {
  /** 部门ID列表 */
  department_ids: string[]
  /** 查询的起始操作日期，格式 "YYYY-MM-DD"，不带时分秒，包含start_date传入的时间，系统会以start_date的00:00:00为开始时间进行查询 */
  start_date: string
  /** 查询的截止操作日期，格式 "YYYY-MM-DD"，不带时分秒，包含end_date传入的时间，系统会以end_date的23:59:59为截止时间进行查询。查询截止日期应大于起始日期，起止日期跨度最大为366天 */
  end_date: string
}

export interface QueryOperationLogsCorehrDepartmentQuery extends Pagination {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrDepartmentRequest {
  /** 子类型 */
  sub_type?: Enum
  /** 部门负责人 */
  manager?: string
  /** 是否保密 */
  is_confidential?: boolean
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: HiberarchyCommon
  /** 生效时间 */
  effective_time: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 成本中心id */
  cost_center_id?: string
  /** 是否使用职务 */
  staffing_model?: Enum
}

export interface CreateCorehrDepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface PatchCorehrDepartmentRequest {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 子类型 */
  sub_type?: Enum
  /** 部门负责人 */
  manager?: string
  /** 是否保密 */
  is_confidential?: boolean
  /** 层级关系，内层字段见实体 */
  hiberarchy_common?: HiberarchyCommon
  /** 生效时间 */
  effective_time: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 成本中心id */
  cost_center_id?: string
  /** 是否使用职务 */
  staffing_model?: Enum
}

export interface PatchCorehrDepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface ParentsCorehrDepartmentRequest {
  /** 部门 ID 列表，一次性最多传入 100 个部门 ID */
  department_id_list: string[]
}

export interface ParentsCorehrDepartmentQuery {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface BatchGetCorehrDepartmentRequest {
  /** 部门 ID 列表 */
  department_id_list?: string[]
  /** 返回数据的字段列表 */
  fields?: string[]
  /** 部门名称精确匹配，最多传100个 */
  department_name_list?: string[]
}

export interface BatchGetCorehrDepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryRecentChangeCorehrDepartmentQuery extends Pagination {
  /** 查询的开始时间，格式 "yyyy-MM-dd"，不带时分秒，包含 start_date 传入的时间, 系统会以 start_date 的 00:00:00 查询。 */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd"，不带时分秒， 查询日期小于 end_data + 1 天的 00:00:00。 */
  end_date: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryTimelineCorehrDepartmentRequest {
  /** 部门 ID 列表 */
  department_ids: string[]
  /** 生效日期 */
  effective_date: string
  /** 返回数据的字段列表，可选["department_name", "code", "active", "parent_department_id", "manager", "description", "effective_date"] */
  fields?: string[]
}

export interface QueryTimelineCorehrDepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface TreeCorehrDepartmentRequest {
  /** 部门 ID，默认根部门 */
  department_id?: string
  /** 是否包含失效部门，默认false */
  need_inactive?: boolean
  /** 生效日期，格式yyyy-mm-dd，默认当前日期 */
  effective_date?: string
}

export interface TreeCorehrDepartmentQuery extends Pagination {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryMultiTimelineCorehrDepartmentRequest {
  /** 部门 ID 列表 */
  department_ids: string[]
  /** 生效日期开始(包含) */
  effective_date_start?: string
  /** 生效日期结束(包含) */
  effective_date_end?: string
  /** 返回数据的字段列表，可选["department_name", "code", "active", "parent_department_id", "manager", "description", "effective_date"], 以及自定义字段field_name */
  fields?: string[]
}

export interface QueryMultiTimelineCorehrDepartmentQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface SearchCorehrDepartmentRequest {
  /** 是否启用 */
  active?: boolean
  /** 当通过上级部门 ID 查询时，填写 true 返回所有子部门，填写 false 只返回直接下级部门 */
  get_all_children?: boolean
  /** manager ID 列表**字段权限要求：按照部门负责人搜索 (corehr:department.manager.search:read)** */
  manager_list?: string[]
  /** 部门 ID 列表 */
  department_id_list?: string[]
  /** 部门名称列表，需精确匹配 */
  name_list?: string[]
  /** 上级部门 ID ，可查询直接下级部门**字段权限要求：按照上级部门搜索 (corehr:department.organize.search:read) ** */
  parent_department_id?: string
  /** 部门 code 列表 */
  code_list?: string[]
  /** 返回数据的字段列表 */
  fields?: string[]
}

export interface SearchCorehrDepartmentQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface DeleteCorehrDepartmentQuery {
  /** 此次删除中所使用的部门ID类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrLocationRequest {
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: HiberarchyCommon
  /** 地点用途 */
  location_usage_list?: Enum[]
  /** 地址 */
  address?: Address[]
  /** 工时制度 */
  working_hours_type_id?: string
  /** 生效时间 */
  effective_time: string
  /** 区域设置 */
  locale?: Enum
  /** 时区 */
  time_zone_id?: string
  /** 默认显示语言 */
  display_language_id?: string
}

export interface CreateCorehrLocationQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrLocationRequest {
  /** 上级地点 ID */
  parent_id?: string
  /** 地点名称 */
  names?: I18n[]
  /** 是否启用 */
  active?: boolean
  /** 生效时间 */
  effective_time: string
  /** 地点编码 */
  code?: string
  /** 地点描述 */
  descriptions?: I18n[]
  /** 地点用途 */
  location_usages?: Enum[]
  /** 工时制度 ID */
  working_hours_type_id?: string
  /** 区域设置 */
  locale?: Enum
  /** 时区 ID */
  time_zone_id?: string
  /** 默认显示语言 ID */
  display_language_id?: string
}

export interface PatchCorehrLocationQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface QueryRecentChangeCorehrLocationQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface BatchGetCorehrLocationRequest {
  /** 地点 ID 列表 */
  location_ids: string[]
}

export interface ListCorehrLocationQuery extends Pagination {
}

export interface ActiveCorehrLocationRequest {
  /** 地点 ID */
  location_id: string
  /** 生效时间 */
  effective_time: string
  /** 启用停用状态 */
  active: boolean
  /** 操作原因 */
  operation_reason: string
}

export interface PatchCorehrLocationAddressRequest {
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
  address_types?: Enum[]
  /** 是否主要地址 */
  is_primary?: boolean
  /** 是否公开地址 */
  is_public?: boolean
}

export interface PatchCorehrLocationAddressQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrLocationAddressRequest {
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
  address_types?: Enum[]
  /** 是否主要地址 */
  is_primary?: boolean
  /** 是否公开地址 */
  is_public?: boolean
}

export interface CreateCorehrLocationAddressQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrCompanyRequest {
  /** 层级关系，内层字段见实体 */
  hiberarchy_common: HiberarchyCommon
  /** 性质 */
  type?: Enum
  /** 行业 */
  industry_list?: Enum[]
  /** 法定代表人 */
  legal_representative?: I18n[]
  /** 邮编 */
  post_code?: string
  /** 纳税人识别号 */
  tax_payer_id?: string
  /** confidential */
  confidential?: boolean
  /** 主体类型 */
  sub_type_list?: Enum[]
  /** 是否为分公司 */
  branch_company?: boolean
  /** 主要负责人 */
  primary_manager?: I18n[]
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 默认币种 */
  currency?: Currency
  /** 电话 */
  phone?: PhoneNumberAndAreaCode
  /** 传真 */
  fax?: PhoneNumberAndAreaCode
  /** 注册地址详细信息 */
  registered_office_address_info?: Address
  /** 办公地址详细信息 */
  office_address_info?: Address
}

export interface CreateCorehrCompanyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrCompanyRequest {
  /** 层级关系，内层字段见实体 */
  hiberarchy_common?: HiberarchyCommon
  /** 性质 */
  type?: Enum
  /** 行业 */
  industry_list?: Enum[]
  /** 法定代表人 */
  legal_representative?: I18n[]
  /** 邮编 */
  post_code?: string
  /** 纳税人识别号 */
  tax_payer_id?: string
  /** confidential */
  confidential?: boolean
  /** 主体类型 */
  sub_type_list?: Enum[]
  /** 是否为分公司 */
  branch_company?: boolean
  /** 主要负责人 */
  primary_manager?: I18n[]
  /** 默认币种 */
  currency?: Currency
  /** 电话 */
  phone?: PhoneNumberAndAreaCode
  /** 传真 */
  fax?: PhoneNumberAndAreaCode
  /** 注册地址详细信息 */
  registered_office_address_info?: Address
  /** 办公地址详细信息 */
  office_address_info?: Address
}

export interface PatchCorehrCompanyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ActiveCorehrCompanyRequest {
  /** 公司ID */
  company_id: string
  /** 生效时间 */
  effective_time: string
  /** 启用停用状态 */
  active: boolean
  /** 操作原因 */
  operation_reason: string
}

export interface ListCorehrCompanyQuery extends Pagination {
}

export interface QueryRecentChangeCorehrCompanyQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface BatchGetCorehrCompanyRequest {
  /** 公司 ID 列表 */
  company_ids: string[]
}

export interface CreateCorehrCostCenterRequest {
  /** 成本中心名称 */
  name: I18n[]
  /** 编码 */
  code?: string
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: I18n[]
  /** 生效时间 */
  effective_time: string
}

export interface CreateCorehrCostCenterQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface PatchCorehrCostCenterRequest {
  /** 生效时间 */
  effective_time: string
  /** 启用停用状态 */
  active: boolean
  /** 操作原因 */
  operation_reason: string
}

export interface PatchCorehrCostCenterQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface QueryRecentChangeCorehrCostCenterQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface SearchCorehrCostCenterRequest {
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

export interface SearchCorehrCostCenterQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface DeleteCorehrCostCenterRequest {
  /** 操作原因 */
  operation_reason: string
}

export interface CreateCorehrCostCenterVersionRequest {
  /** 成本中心名称 */
  name: I18n[]
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: I18n[]
  /** 生效时间 */
  effective_time: string
  /** 操作原因 */
  operation_reason: string
}

export interface CreateCorehrCostCenterVersionQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface PatchCorehrCostCenterVersionRequest {
  /** 成本中心名称 */
  name?: I18n[]
  /** 上级成本中心ID */
  parent_cost_center_id?: string
  /** 成本中心负责人ID 列表，可通过雇佣信息接口查询获得 */
  managers?: string[]
  /** 成本中心描述 */
  description?: I18n[]
  /** 生效时间 */
  effective_time: string
  /** 操作原因 */
  operation_reason: string
}

export interface PatchCorehrCostCenterVersionQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface DeleteCorehrCostCenterVersionRequest {
  /** 操作原因 */
  operation_reason: string
}

export interface GetCorehrApprovalGroupsQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface OpenQueryDepartmentChangeListByIdsCorehrApprovalGroupsRequest {
  /** 部门调整记录 ID List */
  department_change_ids?: string[]
  /** 是否返回部门全路径 */
  need_department_path?: boolean
}

export interface OpenQueryDepartmentChangeListByIdsCorehrApprovalGroupsQuery {
  /** 组织架构调整流程 ID */
  process_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface OpenQueryJobChangeListByIdsCorehrApprovalGroupsRequest {
  /** 人员异动记录 ID List */
  job_change_ids?: string[]
  /** 是否返回部门全路径 */
  need_department_path?: boolean
}

export interface OpenQueryJobChangeListByIdsCorehrApprovalGroupsQuery {
  /** 组织架构调整流程 ID */
  process_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrJobFamilyRequest {
  /** 名称 */
  name: I18n[]
  /** 启用 */
  active: boolean
  /** 上级序列 */
  parent_id?: string
  /** 生效时间 */
  effective_time: string
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface CreateCorehrJobFamilyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrJobFamilyRequest {
  /** 名称 */
  name?: I18n[]
  /** 启用 */
  active?: boolean
  /** 上级序列 */
  parent_id?: string
  /** 生效时间 */
  effective_time?: string
  /** 编码 */
  code?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface PatchCorehrJobFamilyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ListCorehrJobFamilyQuery extends Pagination {
}

export interface QueryRecentChangeCorehrJobFamilyQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface BatchGetCorehrJobFamilyRequest {
  /** 序列 ID 列表 */
  job_family_ids: string[]
}

export interface CreateCorehrJobLevelRequest {
  /** 职级数值 */
  level_order: number
  /** 编码 */
  code?: string
  /** 名称 */
  name: I18n[]
  /** 描述 */
  description?: I18n[]
  /** 启用 */
  active: boolean
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 职等 ID 列表 */
  job_grade?: string[]
}

export interface CreateCorehrJobLevelQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrJobLevelRequest {
  /** 职级数值 */
  level_order?: number
  /** 编码 */
  code?: string
  /** 名称 */
  name?: I18n[]
  /** 描述 */
  description?: I18n[]
  /** 启用 */
  active?: boolean
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 职等 ID 列表 */
  job_grade?: string[]
}

export interface PatchCorehrJobLevelQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ListCorehrJobLevelQuery extends Pagination {
}

export interface QueryRecentChangeCorehrJobLevelQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface BatchGetCorehrJobLevelRequest {
  /** 职级 ID 列表 */
  job_level_ids: string[]
}

export interface CreateCorehrJobGradeRequest {
  /** 职等数值 */
  grade_order: number
  /** 编码 */
  code?: string
  /** 名称 */
  names: I18n[]
  /** 描述 */
  descriptions?: I18n[]
}

export interface CreateCorehrJobGradeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrJobGradeRequest {
  /** 职等数值 */
  grade_order?: number
  /** 编码 */
  code?: string
  /** 名称 */
  names?: I18n[]
  /** 描述 */
  descriptions?: I18n[]
  /** 启用 */
  active?: boolean
}

export interface PatchCorehrJobGradeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface QueryCorehrJobGradeRequest {
  /** 职等ID列表 */
  ids?: string[]
  /** 职等code列表 */
  codes?: string[]
  /** 是否启用 */
  active?: boolean
}

export interface QueryCorehrJobGradeQuery extends Pagination {
}

export interface QueryRecentChangeCorehrJobGradeQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface CreateCorehrJobRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name: I18n[]
  /** 描述 */
  description?: I18n[]
  /** 启用 */
  active: boolean
  /** 职务头衔 */
  job_title?: I18n[]
  /** 序列 */
  job_family_id_list?: string[]
  /** 职级 */
  job_level_id_list?: string[]
  /** 工时制度，引用WorkingHoursType的ID */
  working_hours_type_id?: string
  /** 生效时间 */
  effective_time: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface CreateCorehrJobQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrJobRequest {
  /** 编码 */
  code?: string
  /** 名称 */
  name?: I18n[]
  /** 描述 */
  description?: I18n[]
  /** 启用 */
  active?: boolean
  /** 职务头衔 */
  job_title?: I18n[]
  /** 序列 */
  job_family_id_list?: string[]
  /** 职级 */
  job_level_id_list?: string[]
  /** 工时制度，引用WorkingHoursType的ID */
  working_hours_type_id?: string
  /** 生效时间 */
  effective_time?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
}

export interface PatchCorehrJobQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ListCorehrJobQuery extends Pagination {
  /** 名称 */
  name?: string
  /** 语言 */
  query_language?: string
}

export interface WithdrawOnboardingCorehrPreHireRequest {
  /** 待入职ID，可从待入职列表接口获取 */
  pre_hire_id: string
  /** 撤销原因 */
  withdraw_reason: string
}

export interface RestoreFlowInstanceCorehrPreHireRequest {
  /** 待入职ID，可从待入职列表接口获取 */
  pre_hire_id: string
  /** 是否强制占编；true为强制占编；false为非强制占编 */
  confirm_workforce?: boolean
}

export interface CreateCorehrPreHireRequest {
  /** 个人信息 */
  basic_info: BasicInfo
  /** 职位信息 */
  offer_info: OfferInfo
  /** 教育经历 */
  education_info?: EducationInfo[]
  /** 工作经历 */
  work_experience?: WorkExperience[]
  /** 招聘应用ID */
  ats_application_id?: string
  /** 外部业务唯一编码 */
  out_biz_id?: string
}

export interface PatchCorehrPreHireRequest {
  /** 更新个人（person）信息 */
  basic_info_update?: BasicInfoUpdate
  /** 更新待入职（prehire）信息 */
  offer_info_update?: OfferInfoUpdate
  /** 指定需要更新的系统字段，只支持最多下钻一层，格式如下： - basic_info_update字段：basic_info_update.name（对name整体进行覆盖更新）；basic_info_update.emails（对邮箱整体进行更新） - offer_info_update字段：offer_info_update.onboarding_method - 招聘ID：ats_application_id */
  standard_update_fields?: string[]
  /** 指定需要更新的PreHire对象上的自定义字段，格式如下： - custom_field1__c */
  custom_update_fields?: string[]
  /** 指定需要更新的Person对象上的自定义字段，格式如下： - custom_field1__c */
  person_custom_update_fields?: string[]
}

export interface QueryCorehrPreHireRequest {
  /** 待入职人员 ID 列表；如果该字段非空，则不按照page_size、page_token分页方式查询 */
  pre_hire_ids?: string[]
  /** 返回数据的字段列表，填写方式：- 为空时只返回 pre_hire_id- 不为空时按照传入的字段返回数据，格式如下：    - person_info 字段：person_info.gender，person_info.age    - employment_info 字段：employment_info.department    - onboarding_info 字段：onboarding_info.onboarding_date    - probation_info 字段：probation_info.probation_period    - contract_info 字段：contract_info.contract_type- 如果要返回所有下级，只用传上级结构体名称，例如 person_info- 返回数据越多，查询接口性能越慢，请按需填写返回字段 */
  fields?: string[]
}

export interface QueryCorehrPreHireQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface ListCorehrPreHireQuery extends Pagination {
  /** 待入职ID列表 */
  pre_hire_ids?: string[]
}

export interface SearchCorehrPreHireRequest {
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
  /** 返回数据的字段列表，填写方式：- 为空时只返回 pre_hire_id- 不为空时按照传入的字段返回数据，格式如下：    - person_info 字段：person_info.gender，person_info.age    - employment_info 字段：employment_info.department    - onboarding_info 字段：onboarding_info.onboarding_date    - probation_info 字段：probation_info.probation_period    - contract_info 字段：contract_info.contract_type- 如果要返回所有下级，只用传上级结构体名称，例如 person_info- 返回数据越多，查询接口性能越慢，请按需填写返回字段 */
  fields?: string[]
}

export interface SearchCorehrPreHireQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface TransitTaskCorehrPreHireRequest {
  /** 系统预置的职位信息和个人信息任务的task_id分别为1和2，自定义任务的task_id是一串UUID */
  task_id: string
}

export interface PatchCorehrPreHireRequest {
  /** 招聘系统的候选人 ID */
  ats_application_id?: string
  /** 入职日期 */
  hire_date?: string
  /** 雇佣类型 */
  employee_type?: Enum
  /** 人员编号 */
  worker_id?: string
  /** 雇佣类型 */
  employee_type_id?: string
  /** 引用Person ID */
  person_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 成本中心分摊信息 */
  cost_center_rate?: SupportCostCenterItem[]
  /** 入职状态 */
  onboarding_status: Enum
}

export interface PatchCorehrPreHireQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrProbationAssessmentRequest {
  /** 试用期人员的雇佣 ID */
  employment_id: string
  /** 试用期考核结果列表 */
  assessments: AssessmentForCreate[]
}

export interface CreateCorehrProbationAssessmentQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface EnableDisableAssessmentCorehrProbationRequest {
  /** 启用 / 停用状态。启用后可在试用期管理页面中可见试用期考核相关的字段。 */
  active: boolean
  /** 试用期考核系统入口链接，当启用功能时该字段必填。 */
  app_url?: string
}

export interface PatchCorehrProbationAssessmentRequest {
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

export interface PatchCorehrProbationAssessmentQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface SearchCorehrProbationRequest {
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

export interface SearchCorehrProbationQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface SubmitCorehrProbationRequest {
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
  custom_fields?: CustomFieldData[]
}

export interface SubmitCorehrProbationQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface WithdrawCorehrProbationRequest {
  /** 试用期人员的雇佣 ID */
  employment_id: string
}

export interface WithdrawCorehrProbationQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrJobChangeRequest {
  /** 异动方式 */
  transfer_mode: 1 | 2
  /** 雇员id */
  employment_id: string
  /** 异动类型唯一标识 */
  transfer_type_unique_identifier: string
  /** 异动流程ID */
  flow_id?: string
  /** 生效日期 */
  effective_date: string
  /** 异动详细信息 */
  transfer_info: CreateTransferInfo
  /** 异动记录标识符 */
  transfer_key?: string
  /** 异动发起人 ID */
  initiator_id?: string
  /** 异动原因唯一标识 */
  transfer_reason_unique_identifier?: string
}

export interface CreateCorehrJobChangeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryCorehrTransferTypeQuery {
  /** 异动类型状态 */
  active?: boolean
  /** 异动类型唯一标识，多条时最多数量为10 */
  transfer_type_unique_identifier?: string[]
}

export interface QueryCorehrTransferReasonQuery {
  /** 异动原因状态 */
  active?: boolean
  /** 异动原因唯一标识，多条时最多数量为10 */
  transfer_reason_unique_identifier?: string[]
}

export interface SearchCorehrJobChangeRequest {
  /** 雇员 ID 列表 */
  employment_ids?: string[]
  /** 异动记录 ID 列表 */
  job_change_ids?: string[]
  /** 异动状态，多个状态之间为「或」的关系 */
  statuses?: 'Approving' | 'Approved' | 'Transformed' | 'Rejected' | 'Cancelled' | 'NoNeedApproval'[]
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

export interface SearchCorehrJobChangeQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface RevokeCorehrJobChangeRequest {
  /** 操作人id */
  operator_id: string
}

export interface RevokeCorehrJobChangeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
}

export interface CreateCorehrJobChangeRequest {
  /** 异动方式 */
  transfer_mode: 1 | 2
  /** 雇员id */
  employment_id: string
  /** 异动类型唯一标识 */
  transfer_type_unique_identifier: string
  /** 异动流程ID */
  flow_id?: string
  /** 生效日期 */
  effective_date: string
  /** 异动详细信息 */
  transfer_info: TransferInfo
  /** 异动记录标识符 */
  transfer_key?: string
  /** 异动发起人 ID */
  initiator_id?: string
}

export interface CreateCorehrJobChangeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryCorehrOffboardingRequest {
  /** 是否启用 */
  active?: boolean
  /** 离职原因唯一标识列表，用于过滤，最大20个 */
  offboarding_reason_unique_identifier?: string[]
}

export interface SubmitV2CorehrOffboardingRequest {
  /** 离职方式 */
  offboarding_mode: 1 | 2
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
  custom_fields?: ObjectFieldData[]
  /** 离职是否保留飞书账号 */
  retain_account?: boolean
  /** 编制随人员一起调整 */
  is_transfer_with_workforce?: boolean
}

export interface SubmitV2CorehrOffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface EditCorehrOffboardingRequest {
  /** 离职记录 ID */
  offboarding_id: string
  /** 操作人雇佣 ID（employment_id），为空默认为系统操作。 */
  operator_id?: string
  /** 编辑字段数据信息 */
  update_data: ObjectFieldData[]
}

export interface EditCorehrOffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface RevokeCorehrOffboardingRequest {
  /** 离职记录 ID */
  offboarding_id: string
  /** 操作人雇佣 ID（employment_id），为空默认为系统操作。 */
  operator_id?: string
}

export interface RevokeCorehrOffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface SearchCorehrOffboardingRequest {
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
  statuses?: 'Approving' | 'Approved' | 'Offboarded' | 'Rejected' | 'Withdrawn' | 'NoNeedApproval'[]
  /** 离职原因列表 , 可以通过【查询员工离职原因列表】接口获取 ，查询时不返回下级原因相关的离职信息 */
  reasons?: string[]
  /** 离职原因（员工）列表 , 可以通过【查询员工离职原因列表】接口获取，查询时不返回下级原因相关的离职信息 */
  employee_reasons?: string[]
}

export interface SearchCorehrOffboardingQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrContractRequest {
  /** 合同开始日期 */
  effective_time: string
  /** 实际结束日期 */
  expiration_time?: string
  /** 雇员ID */
  employment_id: string
  /** 合同类型 */
  contract_type: Enum
  /** 甲方, 引用Company的ID */
  first_party_company_id: string
  /** Person ID */
  person_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 期限类型 */
  duration_type?: Enum
  /** 合同结束日期 */
  contract_end_date?: string
  /** 合同编号 */
  contract_number?: string
  /** 签订类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（signing_type）枚举定义部分获得 */
  signing_type?: Enum
}

export interface CreateCorehrContractQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrContractRequest {
  /** 合同开始日期 */
  effective_time?: string
  /** 实际结束日期 */
  expiration_time?: string
  /** 雇员ID */
  employment_id?: string
  /** 合同类型 */
  contract_type?: Enum
  /** 甲方, 引用Company的ID */
  first_party_company_id?: string
  /** Person ID */
  person_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 期限类型 */
  duration_type?: Enum
  /** 合同结束日期 */
  contract_end_date?: string
  /** 合同编号 */
  contract_number?: string
  /** 签订类型，枚举值可通过文档【飞书人事枚举常量】合同期限类型（signing_type）枚举定义部分获得 */
  signing_type?: Enum
}

export interface PatchCorehrContractQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface ListCorehrContractQuery extends Pagination {
}

export interface SearchCorehrContractRequest {
  /** 雇佣 ID 列表 */
  employment_id_list?: string[]
  /** 合同ID列表 */
  contract_id_list?: string[]
}

export interface SearchCorehrContractQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface BatchSaveCorehrWorkforcePlanDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 编制规划的多个明细行 */
  items: WorkforcePlanDetailRow[]
}

export interface BatchDeleteCorehrWorkforcePlanDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 编制规划的多个明细行 */
  items: WorkforcePlanDetailRow[]
}

export interface BatchSaveCorehrReportDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 集中填报id */
  centralized_reporting_project_id: string
  /** 集中填报的一些填报行 */
  items: WorkforcePlanDetailRow[]
}

export interface BatchDeleteCorehrReportDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 集中填报id */
  centralized_reporting_project_id: string
  /** 集中填报的一些填报行 */
  items: WorkforcePlanDetailRow[]
}

export interface ListCorehrWorkforcePlanQuery {
  /** 是否获取所有编制规划方案，true 所有编制规划方案列表，false 为仅获取当前生效的编制规划方案，默认为 false示例值：false */
  get_all_plan?: boolean
  /** 是否只获取已启用的方案，true 获取已启用编制规划方案，false 获取所有编制规划方案，默认为 true示例值：true */
  active?: boolean
}

export interface BatchCorehrWorkforcePlanDetailRequest {
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

export interface BatchCorehrWorkforcePlanDetailQuery extends Pagination {
}

export interface CreateCorehrLeaveGrantingRecordRequest {
  /** 假期类型 ID，枚举值可通过【获取假期类型列表】接口获取（若假期类型下存在假期子类，此处仅支持传入假期子类的 ID） */
  leave_type_id: string
  /** 员工 ID */
  employment_id: string
  /** 授予数量 */
  granting_quantity: string
  /** 授予时长单位可选值有：- 1: 天- 2: 小时 */
  granting_unit: number
  /** 生效时间 */
  effective_date: string
  /** 失效时间 */
  expiration_date?: string
  /** 是否参与折算 */
  section_type?: number
  /** 授予原因 */
  reason: I18n[]
  /** 自定义外部 ID，可用于避免数据重复写入（不能超过 64 字符） */
  external_id?: string
}

export interface CreateCorehrLeaveGrantingRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface LeaveTypesCorehrLeaveQuery extends Pagination {
  /** 假期类型状态（不传则为全部）可选值有：- 1：已启用- 2：已停用 */
  status?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface LeaveBalancesCorehrLeaveQuery extends Pagination {
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

export interface LeaveRequestHistoryCorehrLeaveQuery extends Pagination {
  /** 员工 ID 列表，最大 100 个（不传则默认查询全部员工） */
  employment_id_list?: string[]
  /** 休假发起人 ID 列表，最大 100 个 */
  initiator_id_list?: string[]
  /** 请假记录的状态可选值有：- 1：已通过- 2：审批中- 3：审批中（更正）- 4：审批中（取消休假）- 5：审批中（返岗）- 6：已返岗- 7：已拒绝- 8：已取消- 9：已撤回 */
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

export interface WorkCalendarCorehrLeaveRequest {
  /** 工作日历ID列表 */
  wk_calendar_ids: string[]
  /** 工作日历ID大于 */
  wk_calendar_id_gt?: string
  /** 分页、排序等选项 */
  wk_option?: WkOption
  /** 是否只返回启用的工作日历，不填默认true */
  only_enable?: boolean
}

export interface CalendarByScopeCorehrLeaveQuery {
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

export interface WorkCalendarDateCorehrLeaveRequest {
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

export interface QueryCorehrAuthorizationQuery extends Pagination {
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

export interface GetByParamCorehrAuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface ListCorehrSecurityGroupQuery extends Pagination {
}

export interface AddRoleAssignCorehrAuthorizationRequest {
  /** 授权 */
  assigned_organization_items: AssignedOrganizationWithCode[][]
}

export interface AddRoleAssignCorehrAuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 角色 ID */
  role_id: string
}

export interface UpdateRoleAssignCorehrAuthorizationRequest {
  /** 授权 */
  assigned_organization_items: AssignedOrganizationWithCode[][]
}

export interface UpdateRoleAssignCorehrAuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 角色 ID */
  role_id: string
}

export interface RemoveRoleAssignCorehrAuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 角色 ID */
  role_id: string
}

export interface BatchGetCorehrEmployeesBpRequest {
  /** 员工雇佣 ID */
  employment_ids: string[]
  /** 是否获取全部 BP，true 为获取员工所在部门及来自上级部门的全部 HRBP 和属地 BP，false 为仅获取员工的直属 HRBP 和属地 BP（当员工所在部门、属地无 BP 时，会上钻找到最近的 BP），默认为 false */
  get_all?: boolean
}

export interface BatchGetCorehrEmployeesBpQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface GetByDepartmentCorehrBpRequest {
  /** 部门 ID */
  department_id: string
}

export interface GetByDepartmentCorehrBpQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryCorehrSecurityGroupRequest {
  /** 角色列表，一次最多支持查询 50 个 */
  item_list: BpRoleOrganization[]
  /** 授权时间大于 */
  updated_at_gte?: string
  /** 授权时间小于 */
  updated_at_lte?: string
}

export interface QueryCorehrSecurityGroupQuery {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface ListCorehrBpQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface SearchCorehrAssignedUserRequest {
  /** 角色 ID，仅支持组织类角色， 角色 ID 可通过【批量获取角色列表】接口获取 */
  role_id: string
  /** 管理范围信息 */
  management_scope_list: ManagementScope[]
  /** 查找方式可选值有：- 1：只查找指定 部门/工作地点/公司/社保城市，如无授权信息则返回为空- 2：当指定的 部门/工作地点/公司/社保城市 无授权信息，向上查找第一个授权记录并直接返回 */
  search_method: string
  /** 页码标识，获取第一页传空，每次查询会返回下一页的page_token */
  page_token?: string
  /** 每页获取记录数量，最大100 */
  page_size: string
}

export interface SearchCorehrAssignedUserQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface ListCorehrProcessQuery extends Pagination {
  /** 查询流程状态列表。 */
  statuses?: number[]
  /** 查询开始时间（unix毫秒时间戳），闭区间，开始时间和结束时间跨度不能超过31天 */
  modify_time_from: string
  /** 1. 任务查询结束时间，闭区间 2. 单位：ms。从1970年1月1日(UTC/GMT的午夜) 开始经过的毫秒数 3. 注意：开始时间和结束时间跨度不能超过31天 4. 示例值：1719549169735 */
  modify_time_to: string
  /** 流程定义ID */
  flow_definition_id?: string
}

export interface GetCorehrProcessQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface GetCorehrProcessFormVariableDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface UpdateCorehrProcessRevokeRequest {
  /** 按照指定的用户ID类型传递对应的用户ID。 */
  user_id?: string
  /** 原因 */
  reason?: string
  /** true-系统身份操作 */
  system_user?: boolean
}

export interface UpdateCorehrProcessRevokeQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface UpdateCorehrProcessWithdrawRequest {
  /** 按照指定的用户ID类型传递对应的用户ID。 */
  user_id?: string
  /** 原因 */
  reason?: string
  /** true-系统身份操作 */
  system_user?: boolean
}

export interface UpdateCorehrProcessWithdrawQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface ListCorehrApproverQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 按user_id_type类型传递。如果system_approval为false，则必填。否则非必填。 */
  user_id: string
  /** 任务状态 */
  approver_status?: -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 12 | 14 | 16
}

export interface UpdateCorehrProcessApproverRequest {
  /** 将审批任务修改为同意/拒绝 */
  status: 2 | 3
  /** 按user_id_type类型传递。如果system_approval为false，则必填。否则非必填。 */
  user_id?: string
  /** true - 使用系统身份审批 */
  system_approval?: boolean
  /** 通过原因，长度限制为500 */
  reason?: string
  /** 表单数据 */
  field_values_v2?: ProcessFormVariableV2[]
}

export interface UpdateCorehrProcessApproverQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface UpdateCorehrProcessExtraRequest {
  /** 操作人，当system_user为true时，可以不传值 */
  operator?: string
  /** 流程节点id，与approver_id二选一传入，都传以node_id为准 */
  node_id?: string
  /** 审批任务id，与node_id二选一传入，都传以node_id为准 */
  approver_id?: string
  /** 加签方式 */
  extra_type: 0 | 1 | 2
  /** 多人加签时的审批方式 */
  approval_type?: 0 | 1
  /** 加签人员id列表 */
  extra_user_ids: string[]
  /** 备注 */
  remark?: string
  /** true-以系统身份操作 */
  system_user?: boolean
}

export interface UpdateCorehrProcessExtraQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface UpdateCorehrProcessTransferRequest {
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

export interface UpdateCorehrProcessTransferQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface MatchCorehrCompensationStandardQuery {
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

export interface ListCorehrSubregionQuery extends Pagination {
  /** 省份/行政区id，填写后只查询该省份/行政区下的城市/区域 */
  subdivision_id?: string
}

export interface ListCorehrSubdivisionQuery extends Pagination {
  /** 国家/地区id，填写后只查询该国家/地区下的省份/行政区 */
  country_region_id?: string
}

export interface ListCorehrCountryRegionQuery extends Pagination {
}

export interface ListCorehrCurrencyQuery extends Pagination {
}

export interface PatchCorehrDepartmentRequest {
  /** 实体在CoreHR内部的唯一键 */
  id?: string
  /** 子类型 */
  sub_type?: Enum
  /** 部门负责人 */
  manager?: string
  /** 是否保密 */
  is_confidential?: boolean
  /** 层级关系，内层字段见实体 */
  hiberarchy_common?: HiberarchyCommon
  /** 生效时间 */
  effective_time: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 成本中心id */
  cost_center_id?: string
  /** 是否使用职务 */
  staffing_model?: Enum
}

export interface PatchCorehrDepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface GetCorehrDepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface ListCorehrJobQuery extends Pagination {
  /** 名称 */
  name?: string
  /** 语言 */
  query_language?: string
}

export interface ListCorehrDepartmentQuery extends Pagination {
  /** 部门ID列表 */
  department_id_list?: string[]
  /** 部门名称列表，需精确匹配 */
  name_list?: string[]
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface PatchCorehrPersonRequest {
  /** 姓名 */
  name_list?: PersonName[]
  /** 性别 */
  gender?: Enum
  /** 出生日期 */
  date_of_birth?: string
  /** 国籍 ID，该字段已作废，请使用 nationality_id_v2 字段 */
  nationality_id?: string
  /** 民族 / 种族 */
  race?: Enum
  /** 婚姻状况 */
  marital_status?: Enum
  /** 电话 */
  phone_list?: Phone[]
  /** 地址 */
  address_list?: Address[]
  /** 邮件 */
  email_list?: Email[]
  /** 工作履历 */
  work_experience_list?: WorkExperience[]
  /** 教育经历 */
  education_list?: Education[]
  /** 银行账号 */
  bank_account_list?: BankAccount[]
  /** 证件号码 */
  national_id_list?: NationalId[]
  /** 亲属 */
  dependent_list?: Dependent[]
  /** 紧急联系人 */
  emergency_contact_list?: EmergencyContact[]
  /** 进入工作地的日期 */
  date_entered_workforce?: string
  /** 头像资源的id */
  profile_image_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 纳税身份信息 */
  resident_tax_id_list?: string[]
  /** 年龄 */
  age?: number
  /** 个人资料 */
  personal_profile?: PersonalProfile[]
}

export interface PatchCorehrPersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrPersonRequest {
  /** 姓名 */
  name_list: PersonName[]
  /** 性别 */
  gender?: Enum
  /** 出生日期 */
  date_of_birth?: string
  /** 国籍 ID，该字段已作废，请使用 nationality_id_v2 字段 */
  nationality_id?: string
  /** 民族 / 种族 */
  race?: Enum
  /** 婚姻状况 */
  marital_status?: Enum
  /** 电话 */
  phone_list?: Phone[]
  /** 地址 */
  address_list?: Address[]
  /** 邮件 */
  email_list?: Email[]
  /** 工作履历 */
  work_experience_list?: WorkExperience[]
  /** 教育经历 */
  education_list?: Education[]
  /** 银行账号 */
  bank_account_list?: BankAccount[]
  /** 证件号码 */
  national_id_list?: NationalId[]
  /** 亲属 */
  dependent_list?: Dependent[]
  /** 紧急联系人 */
  emergency_contact_list?: EmergencyContact[]
  /** 进入工作地的日期 */
  date_entered_workforce?: string
  /** 头像资源的id */
  profile_image_id?: string
  /** 自定义字段 */
  custom_fields?: ObjectFieldData[]
  /** 纳税身份信息 */
  resident_tax_id_list?: string[]
  /** 年龄 */
  age?: number
  /** 个人资料 */
  personal_profile?: PersonalProfile[]
}

export interface CreateCorehrPersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface GetCorehrPersonQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'people_employee_id'
}

export interface SubmitCorehrOffboardingRequest {
  /** 离职方式 */
  offboarding_mode: 1
  /** 雇员 id */
  employment_id: string
  /** 离职日期 */
  offboarding_date: string
  /** 离职原因，可通过接口[【查询员工离职原因列表】](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query)获取 */
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
  custom_fields?: ObjectFieldData[]
}

export interface SubmitCorehrOffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface QueryCorehrCustomFieldResponse {
  /** 自定义字段列表 */
  items?: CustomField[]
}

export interface GetByParamCorehrCustomFieldResponse {
  /** 自定义字段详情 */
  data?: CustomField
}

export interface AddEnumOptionCorehrCommonDataMetaDataResponse {
  /** 枚举字段 API name */
  enum_field_api_name?: string
  /** 枚举全部选项列表 */
  enum_field_options?: EnumFieldOption[]
}

export interface EditEnumOptionCorehrCommonDataMetaDataResponse {
  /** 枚举字段 API name */
  enum_field_api_name?: string
  /** 枚举全部选项列表 */
  enum_field_options?: EnumFieldOption[]
}

export interface CreateCorehrNationalIdTypeResponse {
  national_id_type?: NationalIdType
}

export interface PatchCorehrNationalIdTypeResponse {
  national_id_type?: NationalIdType
}

export interface GetCorehrNationalIdTypeResponse {
  /** 国家证件类型信息 */
  national_id_type?: NationalIdType
}

export interface CreateCorehrEmployeeTypeResponse {
  employee_type?: EmployeeType
}

export interface PatchCorehrEmployeeTypeResponse {
  employee_type?: EmployeeType
}

export interface GetCorehrEmployeeTypeResponse {
  /** 雇员类型 */
  employee_type?: EmployeeType
}

export interface CreateCorehrWorkingHoursTypeResponse {
  working_hours_type?: WorkingHoursType
}

export interface PatchCorehrWorkingHoursTypeResponse {
  working_hours_type?: WorkingHoursType
}

export interface GetCorehrWorkingHoursTypeResponse {
  /** 工时制度信息 */
  working_hours_type?: WorkingHoursType
}

export interface ConvertCorehrCommonDataIdResponse {
  /** ID 信息列表 */
  items?: IdInfo[]
}

export interface BatchGetCorehrEmployeeResponse {
  /** 查询的雇佣信息 */
  items?: Employee[]
}

export interface CreateCorehrEmployeeResponse {
  /** 雇佣信息 ID */
  employment_id?: string
  /** 合同 ID */
  contract_id?: string
  /** 任职信息 ID */
  job_data_id?: string
}

export interface CreateCorehrPersonResponse {
  person?: PersonInfo
}

export interface PatchCorehrPersonResponse {
  person?: PersonInfo
}

export interface UploadCorehrPersonResponse {
  /** 上传文件ID */
  id?: string
}

export interface CreateCorehrEmploymentResponse {
  employment?: EmploymentCreate
}

export interface PatchCorehrEmploymentResponse {
  employment?: Employment
}

export interface CreateCorehrJobDataResponse {
  job_data?: JobData
}

export interface PatchCorehrJobDataResponse {
  job_data?: JobData
}

export interface BatchGetCorehrEmployeesJobDataResponse {
  /** 查询的雇佣信息 */
  items?: EmployeeJobData[]
}

export interface GetCorehrJobDataResponse {
  /** 任职信息 */
  job_data?: JobData
}

export interface CreateCorehrEmployeesAdditionalJobResponse {
  additional_job?: EmployeesAdditionalJobWriteResp
}

export interface PatchCorehrEmployeesAdditionalJobResponse {
  additional_job?: EmployeesAdditionalJobWriteResp
}

export interface QueryOperationLogsCorehrDepartmentResponse {
  /** 操作日志列表 */
  op_logs?: OrganizationOpLog[]
  /** 下一页token */
  next_page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface CreateCorehrDepartmentResponse {
  department?: DepartmentCreate
}

export interface ParentsCorehrDepartmentResponse {
  /** 父部门查询结果 */
  items?: DepartmentParents[]
}

export interface BatchGetCorehrDepartmentResponse {
  /** 查询的部门信息 */
  items?: Department[]
}

export interface QueryRecentChangeCorehrDepartmentResponse {
  /** 部门 ID 列表 */
  department_ids?: string[]
  /** 目标查询时间范围内被删除的部门列表 */
  deleted_department_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface QueryTimelineCorehrDepartmentResponse {
  /** 部门信息 */
  items?: DepartmentTimeline[]
}

export interface CreateCorehrLocationResponse {
  location?: Location
}

export interface GetCorehrLocationResponse {
  /** 地点信息 */
  location?: Location
}

export interface QueryRecentChangeCorehrLocationResponse {
  /** 地点 ID 列表 */
  location_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的地点 ID 列表 */
  deleted_location_ids?: string[]
}

export interface BatchGetCorehrLocationResponse {
  /** 查询的地点信息 */
  items?: Location[]
}

export interface CreateCorehrLocationAddressResponse {
  /** 地址 ID */
  address_id?: string
}

export interface CreateCorehrCompanyResponse {
  company?: Company
}

export interface PatchCorehrCompanyResponse {
  company?: Company
}

export interface GetCorehrCompanyResponse {
  /** 公司信息 */
  company?: Company
}

export interface QueryRecentChangeCorehrCompanyResponse {
  /** 公司 ID 列表 */
  company_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的公司 ID 列表 */
  deleted_company_ids?: string[]
}

export interface BatchGetCorehrCompanyResponse {
  /** 查询的公司信息 */
  items?: Company[]
}

export interface CreateCorehrCostCenterResponse {
  cost_center?: CostCenter
}

export interface PatchCorehrCostCenterResponse {
  cost_center?: CostCenter
}

export interface QueryRecentChangeCorehrCostCenterResponse {
  /** 成本中心 ID 列表 */
  cost_center_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的成本中心 ID 列表 */
  deleted_cost_center_ids?: string[]
}

export interface CreateCorehrCostCenterVersionResponse {
  version?: CostCenterVersion
}

export interface PatchCorehrCostCenterVersionResponse {
  version?: CostCenterVersion
}

export interface GetCorehrApprovalGroupsResponse {
  /** 组织架构调整流程信息 */
  approval_group?: ApprovalGroup
}

export interface OpenQueryDepartmentChangeListByIdsCorehrApprovalGroupsResponse {
  /** 部门调整记录信息列表 */
  department_changes?: DepartmentChange[]
}

export interface OpenQueryJobChangeListByIdsCorehrApprovalGroupsResponse {
  /** 人员异动记录信息列表 */
  job_changes?: JobChange[]
}

export interface CreateCorehrJobFamilyResponse {
  job_family?: JobFamily
}

export interface PatchCorehrJobFamilyResponse {
  job_family?: JobFamily
}

export interface GetCorehrJobFamilyResponse {
  /** 职务序列信息 */
  job_family?: JobFamily
}

export interface QueryRecentChangeCorehrJobFamilyResponse {
  /** 序列 ID 列表 */
  job_family_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的序列 ID 列表 */
  deleted_job_family_ids?: string[]
}

export interface BatchGetCorehrJobFamilyResponse {
  /** 查询的序列信息 */
  items?: JobFamily[]
}

export interface CreateCorehrJobLevelResponse {
  job_level?: JobLevel
}

export interface PatchCorehrJobLevelResponse {
  job_level?: JobLevel
}

export interface GetCorehrJobLevelResponse {
  /** 职务级别信息 */
  job_level?: JobLevel
}

export interface QueryRecentChangeCorehrJobLevelResponse {
  /** 职级 ID 列表 */
  job_level_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的职级 ID 列表 */
  deleted_job_level_ids?: string[]
}

export interface BatchGetCorehrJobLevelResponse {
  /** 查询的职级信息 */
  items?: JobLevel[]
}

export interface CreateCorehrJobGradeResponse {
  /** 职等ID */
  grade_id?: string
}

export interface QueryRecentChangeCorehrJobGradeResponse {
  /** 职等 ID 列表 */
  job_grade_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的职等 ID 列表 */
  deleted_job_grade_ids?: string[]
}

export interface CreateCorehrJobResponse {
  job?: Job
}

export interface PatchCorehrJobResponse {
  job?: Job
}

export interface GetCorehrJobResponse {
  /** 职务信息 */
  job?: Job
}

export interface WithdrawOnboardingCorehrPreHireResponse {
  /** 是否成功撤销入职 */
  success?: boolean
}

export interface RestoreFlowInstanceCorehrPreHireResponse {
  /** 是否成功恢复入职 */
  success?: boolean
}

export interface CreateCorehrPreHireResponse {
  /** 待入职 ID */
  pre_hire_id?: string
}

export interface PatchCorehrPreHireResponse {
  /** 待入职ID */
  pre_hire_id?: string
}

export interface GetCorehrPreHireResponse {
  /** 待入职信息 */
  pre_hire?: PreHire
}

export interface TransitTaskCorehrPreHireResponse {
  /** 是否成功流转任务 */
  success?: boolean
}

export interface CompleteCorehrPreHireResponse {
  /** 是否成功完成入职 */
  success?: boolean
}

export interface PatchCorehrPreHireResponse {
  pre_hire?: PreHire
}

export interface CreateCorehrProbationAssessmentResponse {
  /** 创建的试用期考核记录 ID 列表，有序返回 */
  assessment_ids?: string[]
}

export interface SubmitCorehrProbationResponse {
  /** 试用期信息 */
  probation_info?: ProbationInfoForSubmit
}

export interface CreateCorehrJobChangeResponse {
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
  transfer_info?: TransferInfo
  /** 是否调整薪酬 */
  is_adjust_salary?: boolean
  /** 异动自定义字段 */
  custom_fields?: CustomFieldData[]
}

export interface QueryCorehrTransferTypeResponse {
  /** 异动类型列表 */
  items?: TransferType[]
}

export interface QueryCorehrTransferReasonResponse {
  /** 异动原因列表 */
  items?: TransferReason[]
}

export interface CreateCorehrJobChangeResponse {
  /** 异动记录 id */
  job_change_id?: string
  /** 雇员 id */
  employment_id?: string
  /** 异动状态 */
  status?: 0 | 1 | 2 | 3 | 4 | 5
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
  transfer_info?: TransferInfo
}

export interface QueryCorehrOffboardingResponse {
  /** 离职原因列表 */
  items?: OffboardingReason[]
}

export interface SubmitV2CorehrOffboardingResponse {
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

export interface EditCorehrOffboardingResponse {
  /** 编辑字段数据信息 */
  data: ObjectFieldData[]
}

export interface CreateCorehrContractResponse {
  contract?: Contract
}

export interface PatchCorehrContractResponse {
  contract?: Contract
}

export interface GetCorehrContractResponse {
  /** 合同信息 */
  contract?: Contract
}

export interface ListCorehrWorkforcePlanResponse {
  /** 方案列表 */
  items?: WorkforcePlan[]
  /** 方案总数 */
  total?: number
}

export interface BatchCorehrWorkforcePlanDetailResponse {
  /** 编制规划方案 ID */
  workforce_plan_id?: string
  /** 集中填报项目 ID */
  centralized_reporting_project_id?: string
  /** 编制规划明细信息 */
  items?: WorkforcePlanDetail[]
  /** 分页标识 */
  page_token?: string
  /** 是否还有更多项 */
  has_more?: boolean
}

export interface CreateCorehrLeaveGrantingRecordResponse {
  /** 假期授予记录 */
  leave_granting_record?: LeaveGrantingRecord
}

export interface WorkCalendarCorehrLeaveResponse {
  /** 工作日历列表 */
  work_calendars?: WorkCalendarDetail[]
  /** 入参count=true，则返回符合条件的工作日历总数 */
  count?: number
}

export interface CalendarByScopeCorehrLeaveResponse {
  /** 工作日历id */
  calendar_wk_id?: string
}

export interface WorkCalendarDateCorehrLeaveResponse {
  /** 日期类型列表 */
  calendar_dates?: WkCalendarDate[]
}

export interface GetByParamCorehrAuthorizationResponse {
  /** 角色授权信息 */
  role_authorization?: RoleAuthorization
}

export interface AddRoleAssignCorehrAuthorizationResponse {
  /** 授权id */
  assign_id?: string
}

export interface UpdateRoleAssignCorehrAuthorizationResponse {
  /** 授权id */
  assign_id?: string
}

export interface RemoveRoleAssignCorehrAuthorizationResponse {
  /** 授权id */
  assign_id?: string
}

export interface BatchGetCorehrEmployeesBpResponse {
  /** 员工直属 BP 信息，当员工所在部门、属地无 BP 时，会上钻找到最近的 BP */
  employment_direct_bps?: EmploymentBp[]
  /** 员工全部 BP 信息 */
  employment_all_bps?: EmploymentBp[]
}

export interface GetByDepartmentCorehrBpResponse {
  /** 部门 HRBP 信息，依次为部门及各层级上级部门 */
  items?: DepartmentHrbp[]
}

export interface QueryCorehrSecurityGroupResponse {
  /** HRBP/属地 BP 信息 */
  hrbp_list?: Hrbp[]
}

export interface GetCorehrProcessResponse {
  /** 流程实例ID */
  process_id?: string
  /** 流程状态 */
  status?: 1 | 2 | 4 | 8 | 9
  /** 业务类型ID */
  flow_template_id?: string
  /** 业务类型名称 */
  flow_template_name?: DataengineI18n
  /** 流程定义ID */
  flow_definition_id?: string
  /** 流程定义名称 */
  flow_definition_name?: DataengineI18n
  /** 流程发起人ID */
  initiator_id?: string
  /** 流程发起人姓名 */
  initiator_name?: DataengineI18n
  /** 流程发起时间，Unix毫秒时间戳 */
  create_time?: string
  /** 流程结束时间，Unix毫秒时间戳 */
  complete_time?: string
  /** 发起单据地址 */
  start_links?: ProcessLink
  /** 流程摘要，会随着流程流转发生变化 */
  abstracts?: ProcessAbstractItem[]
  /** 待办列表 */
  todos?: ProcessTodoItem[]
  /** 抄送列表 */
  cc_list?: ProcessCcItem[]
  /** 已办列表 */
  done_list?: ProcessDoneItem[]
  /** 普通流程或撤销流程等 */
  properties?: 1 | 2 | 3
  /** 系统待办列表 */
  system_todos?: ProcessSystemTodoItem[]
  /** 系统已办列表 */
  system_done_list?: ProcessSystemDoneItem[]
  /** 评论列表 */
  comment_infos?: ProcessCommentInfo[]
  /** 更正流程原流程ID */
  original_process_id?: string
  /** 是否最新的「已完成」的更正流程 */
  is_last_completed_correct_process?: boolean
}

export interface GetCorehrProcessFormVariableDataResponse {
  /** 表单数据 */
  field_variable_values?: FieldVariableValue[]
  /** 流程实例id */
  process_id?: string
}

export interface UpdateCorehrProcessApproverResponse {
  /** 错误码，非 0 表示失败 */
  code: number
  /** 错误描述 */
  msg?: string
}

export interface MatchCorehrCompensationStandardResponse {
  /** 薪资标准表ID */
  standard_id?: string
  /** 薪资等级 */
  grade?: CpstGrade
  /** 生效时间 */
  effective_time?: string
}

export interface GetCorehrProcessFormVariableDataResponse {
  /** 流程变量 */
  field_variable_values?: FormFieldVariable[]
}

export interface GetCorehrSubregionResponse {
  /** 城市/区域信息 */
  subregion?: Subregion
}

export interface GetCorehrSubdivisionResponse {
  /** 国家/地址信息 */
  subdivision?: Subdivision
}

export interface GetCorehrCountryRegionResponse {
  /** 国家/地址信息 */
  country_region?: CountryRegion
}

export interface GetCorehrCurrencyResponse {
  /** 货币信息 */
  currency?: Currency
}

export interface GetCorehrJobResponse {
  /** 职务信息 */
  job?: Job
}

export interface PatchCorehrDepartmentResponse {
  department?: Department
}

export interface GetCorehrDepartmentResponse {
  /** 部门信息 */
  department?: Department
}

export interface PatchCorehrPersonResponse {
  person?: Person
}

export interface CreateCorehrPersonResponse {
  person?: Person
}

export interface GetCorehrPersonResponse {
  /** 个人信息 */
  person?: Person
}

export interface SubmitCorehrOffboardingResponse {
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

Internal.define({
  '/open-apis/corehr/v1/custom_fields/list_object_api_name': {
    GET: 'listObjectApiNameCorehrCustomField',
  },
  '/open-apis/corehr/v1/custom_fields/query': {
    GET: 'queryCorehrCustomField',
  },
  '/open-apis/corehr/v1/custom_fields/get_by_param': {
    GET: 'getByParamCorehrCustomField',
  },
  '/open-apis/corehr/v1/common_data/meta_data/add_enum_option': {
    POST: 'addEnumOptionCorehrCommonDataMetaData',
  },
  '/open-apis/corehr/v1/common_data/meta_data/edit_enum_option': {
    POST: 'editEnumOptionCorehrCommonDataMetaData',
  },
  '/open-apis/corehr/v2/basic_info/country_regions/search': {
    POST: 'searchCorehrBasicInfoCountryRegion',
  },
  '/open-apis/corehr/v2/basic_info/country_region_subdivisions/search': {
    POST: 'searchCorehrBasicInfoCountryRegionSubdivision',
  },
  '/open-apis/corehr/v2/basic_info/cities/search': {
    POST: 'searchCorehrBasicInfoCity',
  },
  '/open-apis/corehr/v2/basic_info/districts/search': {
    POST: 'searchCorehrBasicInfoDistrict',
  },
  '/open-apis/corehr/v2/basic_info/nationalities/search': {
    POST: 'searchCorehrBasicInfoNationality',
  },
  '/open-apis/corehr/v1/national_id_types': {
    POST: 'createCorehrNationalIdType',
    GET: 'listCorehrNationalIdType',
  },
  '/open-apis/corehr/v1/national_id_types/{national_id_type_id}': {
    DELETE: 'deleteCorehrNationalIdType',
    PATCH: 'patchCorehrNationalIdType',
    GET: 'getCorehrNationalIdType',
  },
  '/open-apis/corehr/v2/basic_info/banks/search': {
    POST: 'searchCorehrBasicInfoBank',
  },
  '/open-apis/corehr/v2/basic_info/bank_branchs/search': {
    POST: 'searchCorehrBasicInfoBankBranch',
  },
  '/open-apis/corehr/v2/basic_info/currencies/search': {
    POST: 'searchCorehrBasicInfoCurrency',
  },
  '/open-apis/corehr/v2/basic_info/time_zones/search': {
    POST: 'searchCorehrBasicInfoTimeZone',
  },
  '/open-apis/corehr/v2/basic_info/languages/search': {
    POST: 'searchCorehrBasicInfoLanguage',
  },
  '/open-apis/corehr/v1/employee_types': {
    POST: 'createCorehrEmployeeType',
    GET: 'listCorehrEmployeeType',
  },
  '/open-apis/corehr/v1/employee_types/{employee_type_id}': {
    DELETE: 'deleteCorehrEmployeeType',
    PATCH: 'patchCorehrEmployeeType',
    GET: 'getCorehrEmployeeType',
  },
  '/open-apis/corehr/v1/working_hours_types': {
    POST: 'createCorehrWorkingHoursType',
    GET: 'listCorehrWorkingHoursType',
  },
  '/open-apis/corehr/v1/working_hours_types/{working_hours_type_id}': {
    DELETE: 'deleteCorehrWorkingHoursType',
    PATCH: 'patchCorehrWorkingHoursType',
    GET: 'getCorehrWorkingHoursType',
  },
  '/open-apis/corehr/v1/common_data/id/convert': {
    POST: 'convertCorehrCommonDataId',
  },
  '/open-apis/corehr/v2/employees/batch_get': {
    POST: 'batchGetCorehrEmployee',
  },
  '/open-apis/corehr/v2/employees/search': {
    POST: 'searchCorehrEmployee',
  },
  '/open-apis/corehr/v2/employees': {
    POST: 'createCorehrEmployee',
  },
  '/open-apis/corehr/v2/persons': {
    POST: 'createCorehrPerson',
  },
  '/open-apis/corehr/v2/persons/{person_id}': {
    PATCH: 'patchCorehrPerson',
  },
  '/open-apis/corehr/v1/persons/{person_id}': {
    DELETE: 'deleteCorehrPerson',
    PATCH: 'patchCorehrPerson',
    GET: 'getCorehrPerson',
  },
  '/open-apis/corehr/v1/persons/upload': {
    POST: { name: 'uploadCorehrPerson', multipart: true },
  },
  '/open-apis/corehr/v1/files/{id}': {
    GET: { name: 'getCorehrFile', type: 'binary' },
  },
  '/open-apis/corehr/v1/employments': {
    POST: 'createCorehrEmployment',
  },
  '/open-apis/corehr/v1/employments/{employment_id}': {
    PATCH: 'patchCorehrEmployment',
    DELETE: 'deleteCorehrEmployment',
  },
  '/open-apis/corehr/v1/job_datas': {
    POST: 'createCorehrJobData',
    GET: 'listCorehrJobData',
  },
  '/open-apis/corehr/v1/job_datas/{job_data_id}': {
    DELETE: 'deleteCorehrJobData',
    PATCH: 'patchCorehrJobData',
    GET: 'getCorehrJobData',
  },
  '/open-apis/corehr/v2/employees/job_datas/query': {
    POST: 'queryCorehrEmployeesJobData',
  },
  '/open-apis/corehr/v2/employees/job_datas/batch_get': {
    POST: 'batchGetCorehrEmployeesJobData',
  },
  '/open-apis/corehr/v2/employees/additional_jobs': {
    POST: 'createCorehrEmployeesAdditionalJob',
  },
  '/open-apis/corehr/v2/employees/additional_jobs/{additional_job_id}': {
    PATCH: 'patchCorehrEmployeesAdditionalJob',
    DELETE: 'deleteCorehrEmployeesAdditionalJob',
  },
  '/open-apis/corehr/v2/employees/additional_jobs/batch': {
    POST: 'batchCorehrEmployeesAdditionalJob',
  },
  '/open-apis/corehr/v2/departments/query_operation_logs': {
    POST: 'queryOperationLogsCorehrDepartment',
  },
  '/open-apis/corehr/v1/departments': {
    POST: 'createCorehrDepartment',
    GET: 'listCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/{department_id}': {
    PATCH: 'patchCorehrDepartment',
    DELETE: 'deleteCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/parents': {
    POST: 'parentsCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/batch_get': {
    POST: 'batchGetCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/query_recent_change': {
    GET: 'queryRecentChangeCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/query_timeline': {
    POST: 'queryTimelineCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/tree': {
    POST: 'treeCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/query_multi_timeline': {
    POST: 'queryMultiTimelineCorehrDepartment',
  },
  '/open-apis/corehr/v2/departments/search': {
    POST: 'searchCorehrDepartment',
  },
  '/open-apis/corehr/v1/locations': {
    POST: 'createCorehrLocation',
    GET: 'listCorehrLocation',
  },
  '/open-apis/corehr/v2/locations/{location_id}': {
    PATCH: 'patchCorehrLocation',
  },
  '/open-apis/corehr/v1/locations/{location_id}': {
    GET: 'getCorehrLocation',
    DELETE: 'deleteCorehrLocation',
  },
  '/open-apis/corehr/v2/locations/query_recent_change': {
    GET: 'queryRecentChangeCorehrLocation',
  },
  '/open-apis/corehr/v2/locations/batch_get': {
    POST: 'batchGetCorehrLocation',
  },
  '/open-apis/corehr/v2/locations/active': {
    POST: 'activeCorehrLocation',
  },
  '/open-apis/corehr/v2/locations/{location_id}/addresses/{address_id}': {
    DELETE: 'deleteCorehrLocationAddress',
    PATCH: 'patchCorehrLocationAddress',
  },
  '/open-apis/corehr/v2/locations/{location_id}/addresses': {
    POST: 'createCorehrLocationAddress',
  },
  '/open-apis/corehr/v1/companies': {
    POST: 'createCorehrCompany',
    GET: 'listCorehrCompany',
  },
  '/open-apis/corehr/v1/companies/{company_id}': {
    PATCH: 'patchCorehrCompany',
    GET: 'getCorehrCompany',
    DELETE: 'deleteCorehrCompany',
  },
  '/open-apis/corehr/v2/companies/active': {
    POST: 'activeCorehrCompany',
  },
  '/open-apis/corehr/v2/companies/query_recent_change': {
    GET: 'queryRecentChangeCorehrCompany',
  },
  '/open-apis/corehr/v2/companies/batch_get': {
    POST: 'batchGetCorehrCompany',
  },
  '/open-apis/corehr/v2/cost_centers': {
    POST: 'createCorehrCostCenter',
  },
  '/open-apis/corehr/v2/cost_centers/{cost_center_id}': {
    PATCH: 'patchCorehrCostCenter',
    DELETE: 'deleteCorehrCostCenter',
  },
  '/open-apis/corehr/v2/cost_centers/query_recent_change': {
    GET: 'queryRecentChangeCorehrCostCenter',
  },
  '/open-apis/corehr/v2/cost_centers/search': {
    POST: 'searchCorehrCostCenter',
  },
  '/open-apis/corehr/v2/cost_centers/{cost_center_id}/versions': {
    POST: 'createCorehrCostCenterVersion',
  },
  '/open-apis/corehr/v2/cost_centers/{cost_center_id}/versions/{version_id}': {
    PATCH: 'patchCorehrCostCenterVersion',
    DELETE: 'deleteCorehrCostCenterVersion',
  },
  '/open-apis/corehr/v2/approval_groups/{process_id}': {
    GET: 'getCorehrApprovalGroups',
  },
  '/open-apis/corehr/v2/approval_groups/open_query_department_change_list_by_ids': {
    POST: 'openQueryDepartmentChangeListByIdsCorehrApprovalGroups',
  },
  '/open-apis/corehr/v2/approval_groups/open_query_job_change_list_by_ids': {
    POST: 'openQueryJobChangeListByIdsCorehrApprovalGroups',
  },
  '/open-apis/corehr/v1/job_families': {
    POST: 'createCorehrJobFamily',
    GET: 'listCorehrJobFamily',
  },
  '/open-apis/corehr/v1/job_families/{job_family_id}': {
    PATCH: 'patchCorehrJobFamily',
    GET: 'getCorehrJobFamily',
    DELETE: 'deleteCorehrJobFamily',
  },
  '/open-apis/corehr/v2/job_families/query_recent_change': {
    GET: 'queryRecentChangeCorehrJobFamily',
  },
  '/open-apis/corehr/v2/job_families/batch_get': {
    POST: 'batchGetCorehrJobFamily',
  },
  '/open-apis/corehr/v1/job_levels': {
    POST: 'createCorehrJobLevel',
    GET: 'listCorehrJobLevel',
  },
  '/open-apis/corehr/v1/job_levels/{job_level_id}': {
    PATCH: 'patchCorehrJobLevel',
    GET: 'getCorehrJobLevel',
    DELETE: 'deleteCorehrJobLevel',
  },
  '/open-apis/corehr/v2/job_levels/query_recent_change': {
    GET: 'queryRecentChangeCorehrJobLevel',
  },
  '/open-apis/corehr/v2/job_levels/batch_get': {
    POST: 'batchGetCorehrJobLevel',
  },
  '/open-apis/corehr/v2/job_grades': {
    POST: 'createCorehrJobGrade',
  },
  '/open-apis/corehr/v2/job_grades/{job_grade_id}': {
    PATCH: 'patchCorehrJobGrade',
    DELETE: 'deleteCorehrJobGrade',
  },
  '/open-apis/corehr/v2/job_grades/query': {
    POST: 'queryCorehrJobGrade',
  },
  '/open-apis/corehr/v2/job_grades/query_recent_change': {
    GET: 'queryRecentChangeCorehrJobGrade',
  },
  '/open-apis/corehr/v1/jobs': {
    POST: 'createCorehrJob',
    GET: 'listCorehrJob',
  },
  '/open-apis/corehr/v1/jobs/{job_id}': {
    DELETE: 'deleteCorehrJob',
    PATCH: 'patchCorehrJob',
    GET: 'getCorehrJob',
  },
  '/open-apis/corehr/v2/jobs/{job_id}': {
    GET: 'getCorehrJob',
  },
  '/open-apis/corehr/v2/jobs': {
    GET: 'listCorehrJob',
  },
  '/open-apis/corehr/v2/pre_hires/withdraw_onboarding': {
    POST: 'withdrawOnboardingCorehrPreHire',
  },
  '/open-apis/corehr/v2/pre_hires/restore_flow_instance': {
    POST: 'restoreFlowInstanceCorehrPreHire',
  },
  '/open-apis/corehr/v2/pre_hires': {
    POST: 'createCorehrPreHire',
  },
  '/open-apis/corehr/v2/pre_hires/{pre_hire_id}': {
    PATCH: 'patchCorehrPreHire',
    DELETE: 'deleteCorehrPreHire',
  },
  '/open-apis/corehr/v2/pre_hires/query': {
    POST: 'queryCorehrPreHire',
  },
  '/open-apis/corehr/v1/pre_hires/{pre_hire_id}': {
    GET: 'getCorehrPreHire',
    DELETE: 'deleteCorehrPreHire',
    PATCH: 'patchCorehrPreHire',
  },
  '/open-apis/corehr/v1/pre_hires': {
    GET: 'listCorehrPreHire',
  },
  '/open-apis/corehr/v2/pre_hires/search': {
    POST: 'searchCorehrPreHire',
  },
  '/open-apis/corehr/v2/pre_hires/{pre_hire_id}/transit_task': {
    POST: 'transitTaskCorehrPreHire',
  },
  '/open-apis/corehr/v2/pre_hires/{pre_hire_id}/complete': {
    POST: 'completeCorehrPreHire',
  },
  '/open-apis/corehr/v2/probation/assessments': {
    POST: 'createCorehrProbationAssessment',
  },
  '/open-apis/corehr/v2/probation/enable_disable_assessment': {
    POST: 'enableDisableAssessmentCorehrProbation',
  },
  '/open-apis/corehr/v2/probation/assessments/{assessment_id}': {
    PATCH: 'patchCorehrProbationAssessment',
    DELETE: 'deleteCorehrProbationAssessment',
  },
  '/open-apis/corehr/v2/probation/search': {
    POST: 'searchCorehrProbation',
  },
  '/open-apis/corehr/v2/probation/submit': {
    POST: 'submitCorehrProbation',
  },
  '/open-apis/corehr/v2/probation/withdraw': {
    POST: 'withdrawCorehrProbation',
  },
  '/open-apis/corehr/v2/job_changes': {
    POST: 'createCorehrJobChange',
  },
  '/open-apis/corehr/v1/transfer_types/query': {
    GET: 'queryCorehrTransferType',
  },
  '/open-apis/corehr/v1/transfer_reasons/query': {
    GET: 'queryCorehrTransferReason',
  },
  '/open-apis/corehr/v2/job_changes/search': {
    POST: 'searchCorehrJobChange',
  },
  '/open-apis/corehr/v2/job_changes/{job_change_id}/revoke': {
    POST: 'revokeCorehrJobChange',
  },
  '/open-apis/corehr/v1/job_changes': {
    POST: 'createCorehrJobChange',
  },
  '/open-apis/corehr/v1/offboardings/query': {
    POST: 'queryCorehrOffboarding',
  },
  '/open-apis/corehr/v2/offboardings/submit_v2': {
    POST: 'submitV2CorehrOffboarding',
  },
  '/open-apis/corehr/v2/offboardings/edit': {
    POST: 'editCorehrOffboarding',
  },
  '/open-apis/corehr/v2/offboardings/revoke': {
    POST: 'revokeCorehrOffboarding',
  },
  '/open-apis/corehr/v1/offboardings/search': {
    POST: 'searchCorehrOffboarding',
  },
  '/open-apis/corehr/v1/contracts': {
    POST: 'createCorehrContract',
    GET: 'listCorehrContract',
  },
  '/open-apis/corehr/v1/contracts/{contract_id}': {
    PATCH: 'patchCorehrContract',
    DELETE: 'deleteCorehrContract',
    GET: 'getCorehrContract',
  },
  '/open-apis/corehr/v2/contracts/search': {
    POST: 'searchCorehrContract',
  },
  '/open-apis/corehr/v2/workforce_plan_detail_row/batchSave': {
    POST: 'batchSaveCorehrWorkforcePlanDetailRow',
  },
  '/open-apis/corehr/v2/workforce_plan_detail_row/batchDelete': {
    POST: 'batchDeleteCorehrWorkforcePlanDetailRow',
  },
  '/open-apis/corehr/v2/report_detail_row/batchSave': {
    POST: 'batchSaveCorehrReportDetailRow',
  },
  '/open-apis/corehr/v2/report_detail_row/batchDelete': {
    POST: 'batchDeleteCorehrReportDetailRow',
  },
  '/open-apis/corehr/v2/workforce_plans': {
    GET: 'listCorehrWorkforcePlan',
  },
  '/open-apis/corehr/v2/workforce_plan_details/batch': {
    POST: 'batchCorehrWorkforcePlanDetail',
  },
  '/open-apis/corehr/v1/leave_granting_records': {
    POST: 'createCorehrLeaveGrantingRecord',
  },
  '/open-apis/corehr/v1/leave_granting_records/{leave_granting_record_id}': {
    DELETE: 'deleteCorehrLeaveGrantingRecord',
  },
  '/open-apis/corehr/v1/leaves/leave_types': {
    GET: 'leaveTypesCorehrLeave',
  },
  '/open-apis/corehr/v1/leaves/leave_balances': {
    GET: 'leaveBalancesCorehrLeave',
  },
  '/open-apis/corehr/v1/leaves/leave_request_history': {
    GET: 'leaveRequestHistoryCorehrLeave',
  },
  '/open-apis/corehr/v1/leaves/work_calendar': {
    POST: 'workCalendarCorehrLeave',
  },
  '/open-apis/corehr/v1/leaves/calendar_by_scope': {
    GET: 'calendarByScopeCorehrLeave',
  },
  '/open-apis/corehr/v1/leaves/work_calendar_date': {
    POST: 'workCalendarDateCorehrLeave',
  },
  '/open-apis/corehr/v1/authorizations/query': {
    GET: 'queryCorehrAuthorization',
  },
  '/open-apis/corehr/v1/authorizations/get_by_param': {
    GET: 'getByParamCorehrAuthorization',
  },
  '/open-apis/corehr/v1/security_groups': {
    GET: 'listCorehrSecurityGroup',
  },
  '/open-apis/corehr/v1/authorizations/add_role_assign': {
    POST: 'addRoleAssignCorehrAuthorization',
  },
  '/open-apis/corehr/v1/authorizations/update_role_assign': {
    POST: 'updateRoleAssignCorehrAuthorization',
  },
  '/open-apis/corehr/v1/authorizations/remove_role_assign': {
    POST: 'removeRoleAssignCorehrAuthorization',
  },
  '/open-apis/corehr/v2/employees/bps/batch_get': {
    POST: 'batchGetCorehrEmployeesBp',
  },
  '/open-apis/corehr/v2/bps/get_by_department': {
    POST: 'getByDepartmentCorehrBp',
  },
  '/open-apis/corehr/v1/security_groups/query': {
    POST: 'queryCorehrSecurityGroup',
  },
  '/open-apis/corehr/v2/bps': {
    GET: 'listCorehrBp',
  },
  '/open-apis/corehr/v1/assigned_users/search': {
    POST: 'searchCorehrAssignedUser',
  },
  '/open-apis/corehr/v2/processes': {
    GET: 'listCorehrProcess',
  },
  '/open-apis/corehr/v2/processes/{process_id}': {
    GET: 'getCorehrProcess',
  },
  '/open-apis/corehr/v2/processes/{process_id}/form_variable_data': {
    GET: 'getCorehrProcessFormVariableData',
  },
  '/open-apis/corehr/v2/process_revoke/{process_id}': {
    PUT: 'updateCorehrProcessRevoke',
  },
  '/open-apis/corehr/v2/process_withdraw/{process_id}': {
    PUT: 'updateCorehrProcessWithdraw',
  },
  '/open-apis/corehr/v2/approvers': {
    GET: 'listCorehrApprover',
  },
  '/open-apis/corehr/v2/processes/{process_id}/approvers/{approver_id}': {
    PUT: 'updateCorehrProcessApprover',
  },
  '/open-apis/corehr/v2/processes/{process_id}/extra': {
    PUT: 'updateCorehrProcessExtra',
  },
  '/open-apis/corehr/v2/processes/{process_id}/transfer': {
    PUT: 'updateCorehrProcessTransfer',
  },
  '/open-apis/corehr/v1/compensation_standards/match': {
    GET: 'matchCorehrCompensationStandard',
  },
  '/open-apis/corehr/v1/processes/{process_id}/form_variable_data': {
    GET: 'getCorehrProcessFormVariableData',
  },
  '/open-apis/corehr/v1/subregions': {
    GET: 'listCorehrSubregion',
  },
  '/open-apis/corehr/v1/subregions/{subregion_id}': {
    GET: 'getCorehrSubregion',
  },
  '/open-apis/corehr/v1/subdivisions': {
    GET: 'listCorehrSubdivision',
  },
  '/open-apis/corehr/v1/subdivisions/{subdivision_id}': {
    GET: 'getCorehrSubdivision',
  },
  '/open-apis/corehr/v1/country_regions': {
    GET: 'listCorehrCountryRegion',
  },
  '/open-apis/corehr/v1/country_regions/{country_region_id}': {
    GET: 'getCorehrCountryRegion',
  },
  '/open-apis/corehr/v1/currencies': {
    GET: 'listCorehrCurrency',
  },
  '/open-apis/corehr/v1/currencies/{currency_id}': {
    GET: 'getCorehrCurrency',
  },
  '/open-apis/corehr/v1/departments/{department_id}': {
    DELETE: 'deleteCorehrDepartment',
    PATCH: 'patchCorehrDepartment',
    GET: 'getCorehrDepartment',
  },
  '/open-apis/corehr/v1/persons': {
    POST: 'createCorehrPerson',
  },
  '/open-apis/corehr/v1/offboardings/submit': {
    POST: 'submitCorehrOffboarding',
  },
})
