import { Address, ApprovalGroup, ApproverInfo, AssessmentForCreate, AssignedOrganizationWithCode, Bank, BankAccount, BankBranch, BasicInfo, BasicInfoUpdate, Bp, BpRoleOrganization, City, Company, Contract, CostCenter, CostCenterVersion, CountryRegion, CountryRegionSubdivision, CpstGrade, CreateTransferInfo, Currency, CustomField, CustomFieldData, DataengineI18n, Department, DepartmentChange, DepartmentCreate, DepartmentHrbp, DepartmentParents, DepartmentTimeline, DepartmentTree, Dependent, District, Education, EducationInfo, Email, EmergencyContact, Employee, EmployeeJobData, EmployeesAdditionalJob, EmployeesAdditionalJobBatchReqDate, EmployeesAdditionalJobWriteResp, EmployeeType, Employment, EmploymentBp, EmploymentCreate, EmploymentLeaveBalance, Enum, EnumFieldOption, FieldVariableValue, FormFieldVariable, HiberarchyCommon, Hrbp, I18n, IdInfo, Job, JobChange, JobData, JobFamily, JobGrade, JobLevel, Language, LeaveGrantingRecord, LeaveRequest, LeaveType, Location, ManagementScope, NationalId, NationalIdType, Nationality, Object, ObjectFieldData, Offboarding, OffboardingReason, OfferInfo, OfferInfoUpdate, OrganizationOpLog, Person, PersonalProfile, PersonInfo, PersonName, Phone, PhoneNumberAndAreaCode, PreHire, PreHireQuery, ProbationInfo, ProbationInfoForSubmit, ProcessAbstractItem, ProcessCcItem, ProcessCommentInfo, ProcessDoneItem, ProcessFormVariableV2, ProcessLink, ProcessSystemDoneItem, ProcessSystemTodoItem, ProcessTodoItem, ProfileSettingCareer, ProfileSettingDataAttachment, ProfileSettingEmploymentInfo, ProfileSettingPersonalInfo, ResidentTax, RoleAuthorization, SecurityGroup, Subdivision, Subregion, SupportCostCenterItem, TimeZone, TransferInfo, TransferReason, TransferType, WkCalendarDate, WkOption, WorkCalendarDetail, WorkExperience, WorkExperienceInfo, WorkforcePlan, WorkforcePlanDetail, WorkforcePlanDetailRow, WorkingHoursType } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取飞书人事对象列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/list_object_api_name
     */
    listObjectApiNameCorehrV1CustomField(query?: Pagination): Paginated<Object>
    /**
     * 获取自定义字段列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/query
     */
    queryCorehrV1CustomField(query?: QueryCorehrV1CustomFieldQuery): Promise<QueryCorehrV1CustomFieldResponse>
    /**
     * 获取字段详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/get_by_param
     */
    getByParamCorehrV1CustomField(query?: GetByParamCorehrV1CustomFieldQuery): Promise<GetByParamCorehrV1CustomFieldResponse>
    /**
     * 增加字段枚举值选项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/add_enum_option
     */
    addEnumOptionCorehrV1CommonDataMetaData(body: AddEnumOptionCorehrV1CommonDataMetaDataRequest, query?: AddEnumOptionCorehrV1CommonDataMetaDataQuery): Promise<AddEnumOptionCorehrV1CommonDataMetaDataResponse>
    /**
     * 修改字段枚举值选项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-meta_data/edit_enum_option
     */
    editEnumOptionCorehrV1CommonDataMetaData(body: EditEnumOptionCorehrV1CommonDataMetaDataRequest, query?: EditEnumOptionCorehrV1CommonDataMetaDataQuery): Promise<EditEnumOptionCorehrV1CommonDataMetaDataResponse>
    /**
     * 查询国家/地区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search
     */
    searchCorehrV2BasicInfoCountryRegion(body: SearchCorehrV2BasicInfoCountryRegionRequest, query?: Pagination): Paginated<CountryRegion>
    /**
     * 查询省份/主要行政区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search
     */
    searchCorehrV2BasicInfoCountryRegionSubdivision(body: SearchCorehrV2BasicInfoCountryRegionSubdivisionRequest, query?: Pagination): Paginated<CountryRegionSubdivision>
    /**
     * 查询城市信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search
     */
    searchCorehrV2BasicInfoCity(body: SearchCorehrV2BasicInfoCityRequest, query?: Pagination): Paginated<City>
    /**
     * 查询区/县信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-district/search
     */
    searchCorehrV2BasicInfoDistrict(body: SearchCorehrV2BasicInfoDistrictRequest, query?: Pagination): Paginated<District>
    /**
     * 查询国籍信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-nationality/search
     */
    searchCorehrV2BasicInfoNationality(body: SearchCorehrV2BasicInfoNationalityRequest, query?: Pagination): Paginated<Nationality>
    /**
     * 创建国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/create
     */
    createCorehrV1NationalIdType(body: CreateCorehrV1NationalIdTypeRequest, query?: CreateCorehrV1NationalIdTypeQuery): Promise<CreateCorehrV1NationalIdTypeResponse>
    /**
     * 删除国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/delete
     */
    deleteCorehrV1NationalIdType(national_id_type_id: string): Promise<void>
    /**
     * 更新国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/patch
     */
    patchCorehrV1NationalIdType(national_id_type_id: string, body: PatchCorehrV1NationalIdTypeRequest, query?: PatchCorehrV1NationalIdTypeQuery): Promise<PatchCorehrV1NationalIdTypeResponse>
    /**
     * 查询单个国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/get
     */
    getCorehrV1NationalIdType(national_id_type_id: string): Promise<GetCorehrV1NationalIdTypeResponse>
    /**
     * 批量查询国家证件类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/national_id_type/list
     */
    listCorehrV1NationalIdType(query?: ListCorehrV1NationalIdTypeQuery): Paginated<NationalIdType>
    /**
     * 查询银行信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search
     */
    searchCorehrV2BasicInfoBank(body: SearchCorehrV2BasicInfoBankRequest, query?: Pagination): Paginated<Bank>
    /**
     * 查询支行信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank_branch/search
     */
    searchCorehrV2BasicInfoBankBranch(body: SearchCorehrV2BasicInfoBankBranchRequest, query?: Pagination): Paginated<BankBranch>
    /**
     * 查询货币信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-currency/search
     */
    searchCorehrV2BasicInfoCurrency(body: SearchCorehrV2BasicInfoCurrencyRequest, query?: Pagination): Paginated<Currency>
    /**
     * 查询时区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-time_zone/search
     */
    searchCorehrV2BasicInfoTimeZone(body: SearchCorehrV2BasicInfoTimeZoneRequest, query?: Pagination): Paginated<TimeZone>
    /**
     * 查询语言信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-language/search
     */
    searchCorehrV2BasicInfoLanguage(body: SearchCorehrV2BasicInfoLanguageRequest, query?: Pagination): Paginated<Language>
    /**
     * 创建人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/create
     */
    createCorehrV1EmployeeType(body: CreateCorehrV1EmployeeTypeRequest, query?: CreateCorehrV1EmployeeTypeQuery): Promise<CreateCorehrV1EmployeeTypeResponse>
    /**
     * 删除人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/delete
     */
    deleteCorehrV1EmployeeType(employee_type_id: string): Promise<void>
    /**
     * 更新人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/patch
     */
    patchCorehrV1EmployeeType(employee_type_id: string, body: PatchCorehrV1EmployeeTypeRequest, query?: PatchCorehrV1EmployeeTypeQuery): Promise<PatchCorehrV1EmployeeTypeResponse>
    /**
     * 查询单个人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/get
     */
    getCorehrV1EmployeeType(employee_type_id: string): Promise<GetCorehrV1EmployeeTypeResponse>
    /**
     * 批量查询人员类型
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employee_type/list
     */
    listCorehrV1EmployeeType(query?: Pagination): Paginated<EmployeeType>
    /**
     * 创建工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/create
     */
    createCorehrV1WorkingHoursType(body: CreateCorehrV1WorkingHoursTypeRequest, query?: CreateCorehrV1WorkingHoursTypeQuery): Promise<CreateCorehrV1WorkingHoursTypeResponse>
    /**
     * 删除工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/delete
     */
    deleteCorehrV1WorkingHoursType(working_hours_type_id: string): Promise<void>
    /**
     * 更新工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/patch
     */
    patchCorehrV1WorkingHoursType(working_hours_type_id: string, body: PatchCorehrV1WorkingHoursTypeRequest, query?: PatchCorehrV1WorkingHoursTypeQuery): Promise<PatchCorehrV1WorkingHoursTypeResponse>
    /**
     * 查询单个工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/get
     */
    getCorehrV1WorkingHoursType(working_hours_type_id: string): Promise<GetCorehrV1WorkingHoursTypeResponse>
    /**
     * 批量查询工时制度
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/working_hours_type/list
     */
    listCorehrV1WorkingHoursType(query?: Pagination): Paginated<WorkingHoursType>
    /**
     * ID 转换
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/common_data-id/convert
     */
    convertCorehrV1CommonDataId(body: ConvertCorehrV1CommonDataIdRequest, query?: ConvertCorehrV1CommonDataIdQuery): Promise<ConvertCorehrV1CommonDataIdResponse>
    /**
     * 批量查询员工信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get
     */
    batchGetCorehrV2Employee(body: BatchGetCorehrV2EmployeeRequest, query?: BatchGetCorehrV2EmployeeQuery): Promise<BatchGetCorehrV2EmployeeResponse>
    /**
     * 搜索员工信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/search
     */
    searchCorehrV2Employee(body: SearchCorehrV2EmployeeRequest, query?: SearchCorehrV2EmployeeQuery): Paginated<Employee>
    /**
     * 添加人员
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create
     */
    createCorehrV2Employee(body: CreateCorehrV2EmployeeRequest, query?: CreateCorehrV2EmployeeQuery): Promise<CreateCorehrV2EmployeeResponse>
    /**
     * 创建个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/create
     */
    createCorehrV2Person(body: CreateCorehrV2PersonRequest, query?: CreateCorehrV2PersonQuery): Promise<CreateCorehrV2PersonResponse>
    /**
     * 更新个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/patch
     */
    patchCorehrV2Person(person_id: string, body: PatchCorehrV2PersonRequest, query?: PatchCorehrV2PersonQuery): Promise<PatchCorehrV2PersonResponse>
    /**
     * 删除个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/delete
     */
    deleteCorehrV1Person(person_id: string): Promise<void>
    /**
     * 上传文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/upload
     */
    uploadCorehrV1Person(form: UploadCorehrV1PersonForm): Promise<UploadCorehrV1PersonResponse>
    /**
     * 下载文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/file/get
     */
    getCorehrV1File(id: string): Promise<ArrayBuffer>
    /**
     * 创建雇佣信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/create
     */
    createCorehrV1Employment(body: CreateCorehrV1EmploymentRequest, query?: CreateCorehrV1EmploymentQuery): Promise<CreateCorehrV1EmploymentResponse>
    /**
     * 更新雇佣信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/patch
     */
    patchCorehrV1Employment(employment_id: string, body: PatchCorehrV1EmploymentRequest, query?: PatchCorehrV1EmploymentQuery): Promise<PatchCorehrV1EmploymentResponse>
    /**
     * 删除雇佣信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/delete
     */
    deleteCorehrV1Employment(employment_id: string, query?: DeleteCorehrV1EmploymentQuery): Promise<void>
    /**
     * 创建任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/create
     */
    createCorehrV1JobData(body: CreateCorehrV1JobDataRequest, query?: CreateCorehrV1JobDataQuery): Promise<CreateCorehrV1JobDataResponse>
    /**
     * 删除任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/delete
     */
    deleteCorehrV1JobData(job_data_id: string, query?: DeleteCorehrV1JobDataQuery): Promise<void>
    /**
     * 更新任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/patch
     */
    patchCorehrV1JobData(job_data_id: string, body: PatchCorehrV1JobDataRequest, query?: PatchCorehrV1JobDataQuery): Promise<PatchCorehrV1JobDataResponse>
    /**
     * 获取任职信息列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/query
     */
    queryCorehrV2EmployeesJobData(body: QueryCorehrV2EmployeesJobDataRequest, query?: QueryCorehrV2EmployeesJobDataQuery): Paginated<EmployeeJobData>
    /**
     * 批量查询员工任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-job_data/batch_get
     */
    batchGetCorehrV2EmployeesJobData(body: BatchGetCorehrV2EmployeesJobDataRequest, query?: BatchGetCorehrV2EmployeesJobDataQuery): Promise<BatchGetCorehrV2EmployeesJobDataResponse>
    /**
     * 批量查询任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/list
     */
    listCorehrV1JobData(query?: ListCorehrV1JobDataQuery): Paginated<JobData>
    /**
     * 查询单个任职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/get
     */
    getCorehrV1JobData(job_data_id: string, query?: GetCorehrV1JobDataQuery): Promise<GetCorehrV1JobDataResponse>
    /**
     * 创建兼职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/create
     */
    createCorehrV2EmployeesAdditionalJob(body: CreateCorehrV2EmployeesAdditionalJobRequest, query?: CreateCorehrV2EmployeesAdditionalJobQuery): Promise<CreateCorehrV2EmployeesAdditionalJobResponse>
    /**
     * 更新兼职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/patch
     */
    patchCorehrV2EmployeesAdditionalJob(additional_job_id: string, body: PatchCorehrV2EmployeesAdditionalJobRequest, query?: PatchCorehrV2EmployeesAdditionalJobQuery): Promise<PatchCorehrV2EmployeesAdditionalJobResponse>
    /**
     * 删除兼职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/delete
     */
    deleteCorehrV2EmployeesAdditionalJob(additional_job_id: string): Promise<void>
    /**
     * 批量查询兼职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-additional_job/batch
     */
    batchCorehrV2EmployeesAdditionalJob(body: BatchCorehrV2EmployeesAdditionalJobRequest, query?: BatchCorehrV2EmployeesAdditionalJobQuery): Paginated<EmployeesAdditionalJob>
    /**
     * 批量查询部门操作日志
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_operation_logs
     */
    queryOperationLogsCorehrV2Department(body: QueryOperationLogsCorehrV2DepartmentRequest, query?: QueryOperationLogsCorehrV2DepartmentQuery): Promise<QueryOperationLogsCorehrV2DepartmentResponse> & AsyncIterableIterator<OrganizationOpLog>
    /**
     * 创建部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/create
     */
    createCorehrV1Department(body: CreateCorehrV1DepartmentRequest, query?: CreateCorehrV1DepartmentQuery): Promise<CreateCorehrV1DepartmentResponse>
    /**
     * 更新部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/patch
     */
    patchCorehrV2Department(department_id: string, body: PatchCorehrV2DepartmentRequest, query?: PatchCorehrV2DepartmentQuery): Promise<void>
    /**
     * 获取父部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/parents
     */
    parentsCorehrV2Department(body: ParentsCorehrV2DepartmentRequest, query?: ParentsCorehrV2DepartmentQuery): Promise<ParentsCorehrV2DepartmentResponse>
    /**
     * 批量查询部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/batch_get
     */
    batchGetCorehrV2Department(body: BatchGetCorehrV2DepartmentRequest, query?: BatchGetCorehrV2DepartmentQuery): Promise<BatchGetCorehrV2DepartmentResponse>
    /**
     * 查询指定时间范围内当前生效信息发生变更的部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_recent_change
     */
    queryRecentChangeCorehrV2Department(query?: QueryRecentChangeCorehrV2DepartmentQuery): Promise<QueryRecentChangeCorehrV2DepartmentResponse>
    /**
     * 查询指定生效日期的部门基本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_timeline
     */
    queryTimelineCorehrV2Department(body: QueryTimelineCorehrV2DepartmentRequest, query?: QueryTimelineCorehrV2DepartmentQuery): Promise<QueryTimelineCorehrV2DepartmentResponse>
    /**
     * 查询指定生效日期的部门架构树
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/tree
     */
    treeCorehrV2Department(body: TreeCorehrV2DepartmentRequest, query?: TreeCorehrV2DepartmentQuery): Paginated<DepartmentTree>
    /**
     * 批量查询部门版本信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/query_multi_timeline
     */
    queryMultiTimelineCorehrV2Department(body: QueryMultiTimelineCorehrV2DepartmentRequest, query?: QueryMultiTimelineCorehrV2DepartmentQuery): Paginated<DepartmentTimeline>
    /**
     * 搜索部门信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/search
     */
    searchCorehrV2Department(body: SearchCorehrV2DepartmentRequest, query?: SearchCorehrV2DepartmentQuery): Paginated<Department>
    /**
     * 删除部门 V2
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/department/delete
     */
    deleteCorehrV2Department(department_id: string, query?: DeleteCorehrV2DepartmentQuery): Promise<void>
    /**
     * 创建地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/create
     */
    createCorehrV1Location(body: CreateCorehrV1LocationRequest, query?: CreateCorehrV1LocationQuery): Promise<CreateCorehrV1LocationResponse>
    /**
     * 更新地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/patch
     */
    patchCorehrV2Location(location_id: string, body: PatchCorehrV2LocationRequest, query?: PatchCorehrV2LocationQuery): Promise<void>
    /**
     * 查询单个地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/get
     */
    getCorehrV1Location(location_id: string): Promise<GetCorehrV1LocationResponse>
    /**
     * 查询当前生效信息发生变更的地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/query_recent_change
     */
    queryRecentChangeCorehrV2Location(query?: QueryRecentChangeCorehrV2LocationQuery): Promise<QueryRecentChangeCorehrV2LocationResponse>
    /**
     * 通过地点 ID 批量获取地点信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/batch_get
     */
    batchGetCorehrV2Location(body: BatchGetCorehrV2LocationRequest): Promise<BatchGetCorehrV2LocationResponse>
    /**
     * 批量分页查询地点信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/list
     */
    listCorehrV1Location(query?: Pagination): Paginated<Location>
    /**
     * 启用/停用地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location/active
     */
    activeCorehrV2Location(body: ActiveCorehrV2LocationRequest): Promise<void>
    /**
     * 删除地点
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/location/delete
     */
    deleteCorehrV1Location(location_id: string): Promise<void>
    /**
     * 删除地点地址
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/delete
     */
    deleteCorehrV2LocationAddress(location_id: string, address_id: string): Promise<void>
    /**
     * 更新地点地址
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/patch
     */
    patchCorehrV2LocationAddress(location_id: string, address_id: string, body: PatchCorehrV2LocationAddressRequest, query?: PatchCorehrV2LocationAddressQuery): Promise<void>
    /**
     * 添加地点地址
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/location-address/create
     */
    createCorehrV2LocationAddress(location_id: string, body: CreateCorehrV2LocationAddressRequest, query?: CreateCorehrV2LocationAddressQuery): Promise<CreateCorehrV2LocationAddressResponse>
    /**
     * 创建公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/create
     */
    createCorehrV1Company(body: CreateCorehrV1CompanyRequest, query?: CreateCorehrV1CompanyQuery): Promise<CreateCorehrV1CompanyResponse>
    /**
     * 更新公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/patch
     */
    patchCorehrV1Company(company_id: string, body: PatchCorehrV1CompanyRequest, query?: PatchCorehrV1CompanyQuery): Promise<PatchCorehrV1CompanyResponse>
    /**
     * 启用/停用公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/active
     */
    activeCorehrV2Company(body: ActiveCorehrV2CompanyRequest): Promise<void>
    /**
     * 查询单个公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/get
     */
    getCorehrV1Company(company_id: string): Promise<GetCorehrV1CompanyResponse>
    /**
     * 批量查询公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/list
     */
    listCorehrV1Company(query?: Pagination): Paginated<Company>
    /**
     * 查询指定时间范围内当前生效信息发生变更的公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/query_recent_change
     */
    queryRecentChangeCorehrV2Company(query?: QueryRecentChangeCorehrV2CompanyQuery): Promise<QueryRecentChangeCorehrV2CompanyResponse>
    /**
     * 通过公司 ID 批量获取公司信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/company/batch_get
     */
    batchGetCorehrV2Company(body: BatchGetCorehrV2CompanyRequest): Promise<BatchGetCorehrV2CompanyResponse>
    /**
     * 删除公司
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/company/delete
     */
    deleteCorehrV1Company(company_id: string): Promise<void>
    /**
     * 创建成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/create
     */
    createCorehrV2CostCenter(body: CreateCorehrV2CostCenterRequest, query?: CreateCorehrV2CostCenterQuery): Promise<CreateCorehrV2CostCenterResponse>
    /**
     * 启用 / 停用成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/patch
     */
    patchCorehrV2CostCenter(cost_center_id: string, body: PatchCorehrV2CostCenterRequest, query?: PatchCorehrV2CostCenterQuery): Promise<PatchCorehrV2CostCenterResponse>
    /**
     * 查询当前生效信息发生变更的成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/query_recent_change
     */
    queryRecentChangeCorehrV2CostCenter(query?: QueryRecentChangeCorehrV2CostCenterQuery): Promise<QueryRecentChangeCorehrV2CostCenterResponse>
    /**
     * 搜索成本中心信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/search
     */
    searchCorehrV2CostCenter(body: SearchCorehrV2CostCenterRequest, query?: SearchCorehrV2CostCenterQuery): Paginated<CostCenterVersion>
    /**
     * 删除成本中心
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center/delete
     */
    deleteCorehrV2CostCenter(cost_center_id: string, body: DeleteCorehrV2CostCenterRequest): Promise<void>
    /**
     * 创建成本中心版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/create
     */
    createCorehrV2CostCenterVersion(cost_center_id: string, body: CreateCorehrV2CostCenterVersionRequest, query?: CreateCorehrV2CostCenterVersionQuery): Promise<CreateCorehrV2CostCenterVersionResponse>
    /**
     * 更正成本中心版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/patch
     */
    patchCorehrV2CostCenterVersion(cost_center_id: string, version_id: string, body: PatchCorehrV2CostCenterVersionRequest, query?: PatchCorehrV2CostCenterVersionQuery): Promise<PatchCorehrV2CostCenterVersionResponse>
    /**
     * 撤销成本中心版本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/cost_center-version/delete
     */
    deleteCorehrV2CostCenterVersion(cost_center_id: string, version_id: string, body: DeleteCorehrV2CostCenterVersionRequest): Promise<void>
    /**
     * 根据流程 ID 查询组织架构调整记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/get
     */
    getCorehrV2ApprovalGroups(process_id: string, query?: GetCorehrV2ApprovalGroupsQuery): Promise<GetCorehrV2ApprovalGroupsResponse>
    /**
     * 批量查询部门调整内容
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_department_change_list_by_ids
     */
    openQueryDepartmentChangeListByIdsCorehrV2ApprovalGroups(body: OpenQueryDepartmentChangeListByIdsCorehrV2ApprovalGroupsRequest, query?: OpenQueryDepartmentChangeListByIdsCorehrV2ApprovalGroupsQuery): Promise<OpenQueryDepartmentChangeListByIdsCorehrV2ApprovalGroupsResponse>
    /**
     * 批量查询人员调整内容
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approval_groups/open_query_job_change_list_by_ids
     */
    openQueryJobChangeListByIdsCorehrV2ApprovalGroups(body: OpenQueryJobChangeListByIdsCorehrV2ApprovalGroupsRequest, query?: OpenQueryJobChangeListByIdsCorehrV2ApprovalGroupsQuery): Promise<OpenQueryJobChangeListByIdsCorehrV2ApprovalGroupsResponse>
    /**
     * 创建序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/create
     */
    createCorehrV1JobFamily(body: CreateCorehrV1JobFamilyRequest, query?: CreateCorehrV1JobFamilyQuery): Promise<CreateCorehrV1JobFamilyResponse>
    /**
     * 更新序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/patch
     */
    patchCorehrV1JobFamily(job_family_id: string, body: PatchCorehrV1JobFamilyRequest, query?: PatchCorehrV1JobFamilyQuery): Promise<PatchCorehrV1JobFamilyResponse>
    /**
     * 查询单个序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/get
     */
    getCorehrV1JobFamily(job_family_id: string): Promise<GetCorehrV1JobFamilyResponse>
    /**
     * 批量查询序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/list
     */
    listCorehrV1JobFamily(query?: Pagination): Paginated<JobFamily>
    /**
     * 查询当前生效信息发生变更的序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/query_recent_change
     */
    queryRecentChangeCorehrV2JobFamily(query?: QueryRecentChangeCorehrV2JobFamilyQuery): Promise<QueryRecentChangeCorehrV2JobFamilyResponse>
    /**
     * 通过序列 ID 批量获取序列信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_family/batch_get
     */
    batchGetCorehrV2JobFamily(body: BatchGetCorehrV2JobFamilyRequest): Promise<BatchGetCorehrV2JobFamilyResponse>
    /**
     * 删除序列
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_family/delete
     */
    deleteCorehrV1JobFamily(job_family_id: string): Promise<void>
    /**
     * 新建职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/create
     */
    createCorehrV1JobLevel(body: CreateCorehrV1JobLevelRequest, query?: CreateCorehrV1JobLevelQuery): Promise<CreateCorehrV1JobLevelResponse>
    /**
     * 更新单个职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/patch
     */
    patchCorehrV1JobLevel(job_level_id: string, body: PatchCorehrV1JobLevelRequest, query?: PatchCorehrV1JobLevelQuery): Promise<PatchCorehrV1JobLevelResponse>
    /**
     * 查询单个职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/get
     */
    getCorehrV1JobLevel(job_level_id: string): Promise<GetCorehrV1JobLevelResponse>
    /**
     * 批量查询职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/list
     */
    listCorehrV1JobLevel(query?: Pagination): Paginated<JobLevel>
    /**
     * 查询当前生效信息发生变更的职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/query_recent_change
     */
    queryRecentChangeCorehrV2JobLevel(query?: QueryRecentChangeCorehrV2JobLevelQuery): Promise<QueryRecentChangeCorehrV2JobLevelResponse>
    /**
     * 通过职级 ID 批量获取职级信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_level/batch_get
     */
    batchGetCorehrV2JobLevel(body: BatchGetCorehrV2JobLevelRequest): Promise<BatchGetCorehrV2JobLevelResponse>
    /**
     * 删除职级
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_level/delete
     */
    deleteCorehrV1JobLevel(job_level_id: string): Promise<void>
    /**
     * 创建职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/create
     */
    createCorehrV2JobGrade(body: CreateCorehrV2JobGradeRequest, query?: CreateCorehrV2JobGradeQuery): Promise<CreateCorehrV2JobGradeResponse>
    /**
     * 更新职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/patch
     */
    patchCorehrV2JobGrade(job_grade_id: string, body: PatchCorehrV2JobGradeRequest, query?: PatchCorehrV2JobGradeQuery): Promise<void>
    /**
     * 查询职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query
     */
    queryCorehrV2JobGrade(body: QueryCorehrV2JobGradeRequest, query?: Pagination): Paginated<JobGrade>
    /**
     * 查询当前生效信息发生变更的职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/query_recent_change
     */
    queryRecentChangeCorehrV2JobGrade(query?: QueryRecentChangeCorehrV2JobGradeQuery): Promise<QueryRecentChangeCorehrV2JobGradeResponse>
    /**
     * 删除职等
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_grade/delete
     */
    deleteCorehrV2JobGrade(job_grade_id: string): Promise<void>
    /**
     * 创建职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/create
     */
    createCorehrV1Job(body: CreateCorehrV1JobRequest, query?: CreateCorehrV1JobQuery): Promise<CreateCorehrV1JobResponse>
    /**
     * 删除职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/delete
     */
    deleteCorehrV1Job(job_id: string): Promise<void>
    /**
     * 更新职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/patch
     */
    patchCorehrV1Job(job_id: string, body: PatchCorehrV1JobRequest, query?: PatchCorehrV1JobQuery): Promise<PatchCorehrV1JobResponse>
    /**
     * 查询单个职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/get
     */
    getCorehrV2Job(job_id: string): Promise<GetCorehrV2JobResponse>
    /**
     * 批量查询职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job/list
     */
    listCorehrV2Job(query?: ListCorehrV2JobQuery): Paginated<Job>
    /**
     * 撤销入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/withdraw_onboarding
     */
    withdrawOnboardingCorehrV2PreHire(body: WithdrawOnboardingCorehrV2PreHireRequest): Promise<WithdrawOnboardingCorehrV2PreHireResponse>
    /**
     * 恢复入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/restore_flow_instance
     */
    restoreFlowInstanceCorehrV2PreHire(body: RestoreFlowInstanceCorehrV2PreHireRequest): Promise<RestoreFlowInstanceCorehrV2PreHireResponse>
    /**
     * 直接创建待入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/create
     */
    createCorehrV2PreHire(body: CreateCorehrV2PreHireRequest): Promise<CreateCorehrV2PreHireResponse>
    /**
     * 更新待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/patch
     */
    patchCorehrV2PreHire(pre_hire_id: string, body: PatchCorehrV2PreHireRequest): Promise<PatchCorehrV2PreHireResponse>
    /**
     * 删除待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/delete
     */
    deleteCorehrV2PreHire(pre_hire_id: string): Promise<void>
    /**
     * 查询待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/query
     */
    queryCorehrV2PreHire(body: QueryCorehrV2PreHireRequest, query?: QueryCorehrV2PreHireQuery): Paginated<PreHire>
    /**
     * 查询单个待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/get
     */
    getCorehrV1PreHire(pre_hire_id: string): Promise<GetCorehrV1PreHireResponse>
    /**
     * 批量查询待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/list
     */
    listCorehrV1PreHire(query?: ListCorehrV1PreHireQuery): Paginated<PreHireQuery>
    /**
     * 搜索待入职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/search
     */
    searchCorehrV2PreHire(body: SearchCorehrV2PreHireRequest, query?: SearchCorehrV2PreHireQuery): Paginated<PreHire>
    /**
     * 流转入职任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/transit_task
     */
    transitTaskCorehrV2PreHire(pre_hire_id: string, body: TransitTaskCorehrV2PreHireRequest): Promise<TransitTaskCorehrV2PreHireResponse>
    /**
     * 操作员工完成入职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/complete
     */
    completeCorehrV2PreHire(pre_hire_id: string): Promise<CompleteCorehrV2PreHireResponse>
    /**
     * 删除待入职（不推荐）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/delete
     */
    deleteCorehrV1PreHire(pre_hire_id: string): Promise<void>
    /**
     * 更新待入职信息（不推荐）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/pre_hire/patch
     */
    patchCorehrV1PreHire(pre_hire_id: string, body: PatchCorehrV1PreHireRequest, query?: PatchCorehrV1PreHireQuery): Promise<PatchCorehrV1PreHireResponse>
    /**
     * 新增试用期考核信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/create
     */
    createCorehrV2ProbationAssessment(body: CreateCorehrV2ProbationAssessmentRequest, query?: CreateCorehrV2ProbationAssessmentQuery): Promise<CreateCorehrV2ProbationAssessmentResponse>
    /**
     * 启用/停用试用期考核功能
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/enable_disable_assessment
     */
    enableDisableAssessmentCorehrV2Probation(body: EnableDisableAssessmentCorehrV2ProbationRequest): Promise<void>
    /**
     * 更新试用期考核信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/patch
     */
    patchCorehrV2ProbationAssessment(assessment_id: string, body: PatchCorehrV2ProbationAssessmentRequest, query?: PatchCorehrV2ProbationAssessmentQuery): Promise<void>
    /**
     * 搜索试用期信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/search
     */
    searchCorehrV2Probation(body: SearchCorehrV2ProbationRequest, query?: SearchCorehrV2ProbationQuery): Paginated<ProbationInfo>
    /**
     * 删除试用期考核信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation-assessment/delete
     */
    deleteCorehrV2ProbationAssessment(assessment_id: string): Promise<void>
    /**
     * 发起转正
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/submit
     */
    submitCorehrV2Probation(body: SubmitCorehrV2ProbationRequest, query?: SubmitCorehrV2ProbationQuery): Promise<SubmitCorehrV2ProbationResponse>
    /**
     * 撤销转正
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/probation/withdraw
     */
    withdrawCorehrV2Probation(body: WithdrawCorehrV2ProbationRequest, query?: WithdrawCorehrV2ProbationQuery): Promise<void>
    /**
     * 发起员工异动
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/create
     */
    createCorehrV2JobChange(body: CreateCorehrV2JobChangeRequest, query?: CreateCorehrV2JobChangeQuery): Promise<CreateCorehrV2JobChangeResponse>
    /**
     * 获取异动类型列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_type/query
     */
    queryCorehrV1TransferType(query?: QueryCorehrV1TransferTypeQuery): Promise<QueryCorehrV1TransferTypeResponse>
    /**
     * 获取异动原因列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/transfer_reason/query
     */
    queryCorehrV1TransferReason(query?: QueryCorehrV1TransferReasonQuery): Promise<QueryCorehrV1TransferReasonResponse>
    /**
     * 搜索员工异动信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/search
     */
    searchCorehrV2JobChange(body: SearchCorehrV2JobChangeRequest, query?: SearchCorehrV2JobChangeQuery): Paginated<JobChange>
    /**
     * 撤销异动
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/job_change/revoke
     */
    revokeCorehrV2JobChange(job_change_id: string, body: RevokeCorehrV2JobChangeRequest, query?: RevokeCorehrV2JobChangeQuery): Promise<void>
    /**
     * 发起员工异动(不推荐)
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_change/create
     */
    createCorehrV1JobChange(body: CreateCorehrV1JobChangeRequest, query?: CreateCorehrV1JobChangeQuery): Promise<CreateCorehrV1JobChangeResponse>
    /**
     * 查询员工离职原因列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/query
     */
    queryCorehrV1Offboarding(body: QueryCorehrV1OffboardingRequest): Promise<QueryCorehrV1OffboardingResponse>
    /**
     * 操作员工离职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/submit_v2
     */
    submitV2CorehrV2Offboarding(body: SubmitV2CorehrV2OffboardingRequest, query?: SubmitV2CorehrV2OffboardingQuery): Promise<SubmitV2CorehrV2OffboardingResponse>
    /**
     * 编辑离职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/edit
     */
    editCorehrV2Offboarding(body: EditCorehrV2OffboardingRequest, query?: EditCorehrV2OffboardingQuery): Promise<EditCorehrV2OffboardingResponse>
    /**
     * 撤销离职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/offboarding/revoke
     */
    revokeCorehrV2Offboarding(body: RevokeCorehrV2OffboardingRequest, query?: RevokeCorehrV2OffboardingQuery): Promise<void>
    /**
     * 搜索离职信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/search
     */
    searchCorehrV1Offboarding(body: SearchCorehrV1OffboardingRequest, query?: SearchCorehrV1OffboardingQuery): Paginated<Offboarding>
    /**
     * 新建合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/create
     */
    createCorehrV1Contract(body: CreateCorehrV1ContractRequest, query?: CreateCorehrV1ContractQuery): Promise<CreateCorehrV1ContractResponse>
    /**
     * 更新合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/patch
     */
    patchCorehrV1Contract(contract_id: string, body: PatchCorehrV1ContractRequest, query?: PatchCorehrV1ContractQuery): Promise<PatchCorehrV1ContractResponse>
    /**
     * 删除合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/delete
     */
    deleteCorehrV1Contract(contract_id: string): Promise<void>
    /**
     * 查询单个合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/get
     */
    getCorehrV1Contract(contract_id: string): Promise<GetCorehrV1ContractResponse>
    /**
     * 批量查询合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/contract/list
     */
    listCorehrV1Contract(query?: Pagination): Paginated<Contract>
    /**
     * 搜索合同
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/contract/search
     */
    searchCorehrV2Contract(body: SearchCorehrV2ContractRequest, query?: SearchCorehrV2ContractQuery): Paginated<Contract>
    /**
     * 批量创建/更新明细行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchSave
     */
    batchSaveCorehrV2WorkforcePlanDetailRow(body: BatchSaveCorehrV2WorkforcePlanDetailRowRequest): Promise<void>
    /**
     * 批量删除明细行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail_row/batchDelete
     */
    batchDeleteCorehrV2WorkforcePlanDetailRow(body: BatchDeleteCorehrV2WorkforcePlanDetailRowRequest): Promise<void>
    /**
     * 批量创建/更新填报行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchSave
     */
    batchSaveCorehrV2ReportDetailRow(body: BatchSaveCorehrV2ReportDetailRowRequest): Promise<void>
    /**
     * 批量删除填报行
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/report_detail_row/batchDelete
     */
    batchDeleteCorehrV2ReportDetailRow(body: BatchDeleteCorehrV2ReportDetailRowRequest): Promise<void>
    /**
     * 查询编制规划方案
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan/list
     */
    listCorehrV2WorkforcePlan(query?: ListCorehrV2WorkforcePlanQuery): Promise<ListCorehrV2WorkforcePlanResponse>
    /**
     * 查询编制规划明细信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/workforce_plan_detail/batch
     */
    batchCorehrV2WorkforcePlanDetail(body: BatchCorehrV2WorkforcePlanDetailRequest, query?: Pagination): Promise<BatchCorehrV2WorkforcePlanDetailResponse>
    /**
     * 创建假期发放记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/create
     */
    createCorehrV1LeaveGrantingRecord(body: CreateCorehrV1LeaveGrantingRecordRequest, query?: CreateCorehrV1LeaveGrantingRecordQuery): Promise<CreateCorehrV1LeaveGrantingRecordResponse>
    /**
     * 删除假期发放记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave_granting_record/delete
     */
    deleteCorehrV1LeaveGrantingRecord(leave_granting_record_id: string): Promise<void>
    /**
     * 获取假期类型列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_types
     */
    leaveTypesCorehrV1Leave(query?: LeaveTypesCorehrV1LeaveQuery): Paginated<LeaveType, 'leave_type_list'>
    /**
     * 批量查询员工假期余额
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_balances
     */
    leaveBalancesCorehrV1Leave(query?: LeaveBalancesCorehrV1LeaveQuery): Paginated<EmploymentLeaveBalance, 'employment_leave_balance_list'>
    /**
     * 批量查询员工请假记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/leave_request_history
     */
    leaveRequestHistoryCorehrV1Leave(query?: LeaveRequestHistoryCorehrV1LeaveQuery): Paginated<LeaveRequest, 'leave_request_list'>
    /**
     * 获取工作日历
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar
     */
    workCalendarCorehrV1Leave(body: WorkCalendarCorehrV1LeaveRequest): Promise<WorkCalendarCorehrV1LeaveResponse>
    /**
     * 根据适用条件获取工作日历 ID
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/calendar_by_scope
     */
    calendarByScopeCorehrV1Leave(query?: CalendarByScopeCorehrV1LeaveQuery): Promise<CalendarByScopeCorehrV1LeaveResponse>
    /**
     * 获取工作日历日期详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/leave/work_calendar_date
     */
    workCalendarDateCorehrV1Leave(body: WorkCalendarDateCorehrV1LeaveRequest): Promise<WorkCalendarDateCorehrV1LeaveResponse>
    /**
     * 批量查询用户授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/query
     */
    queryCorehrV1Authorization(query?: QueryCorehrV1AuthorizationQuery): Paginated<RoleAuthorization>
    /**
     * 查询单个用户授权
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/get_by_param
     */
    getByParamCorehrV1Authorization(query?: GetByParamCorehrV1AuthorizationQuery): Promise<GetByParamCorehrV1AuthorizationResponse>
    /**
     * 批量获取角色列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/list
     */
    listCorehrV1SecurityGroup(query?: Pagination): Paginated<SecurityGroup>
    /**
     * 为用户授权角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/add_role_assign
     */
    addRoleAssignCorehrV1Authorization(body: AddRoleAssignCorehrV1AuthorizationRequest, query?: AddRoleAssignCorehrV1AuthorizationQuery): Promise<AddRoleAssignCorehrV1AuthorizationResponse>
    /**
     * 更新用户被授权的数据范围
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/update_role_assign
     */
    updateRoleAssignCorehrV1Authorization(body: UpdateRoleAssignCorehrV1AuthorizationRequest, query?: UpdateRoleAssignCorehrV1AuthorizationQuery): Promise<UpdateRoleAssignCorehrV1AuthorizationResponse>
    /**
     * 移除用户被授权的角色
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/authorization/remove_role_assign
     */
    removeRoleAssignCorehrV1Authorization(query?: RemoveRoleAssignCorehrV1AuthorizationQuery): Promise<RemoveRoleAssignCorehrV1AuthorizationResponse>
    /**
     * 查询员工 HRBP / 属地 BP
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employees-bp/batch_get
     */
    batchGetCorehrV2EmployeesBp(body: BatchGetCorehrV2EmployeesBpRequest, query?: BatchGetCorehrV2EmployeesBpQuery): Promise<BatchGetCorehrV2EmployeesBpResponse>
    /**
     * 查询部门 HRBP
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/get_by_department
     */
    getByDepartmentCorehrV2Bp(body: GetByDepartmentCorehrV2BpRequest, query?: GetByDepartmentCorehrV2BpQuery): Promise<GetByDepartmentCorehrV2BpResponse>
    /**
     * 查询部门 / 地点的 HRBP / 属地 BP
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/security_group/query
     */
    queryCorehrV1SecurityGroup(body: QueryCorehrV1SecurityGroupRequest, query?: QueryCorehrV1SecurityGroupQuery): Promise<QueryCorehrV1SecurityGroupResponse>
    /**
     * 获取 HRBP 列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/bp/list
     */
    listCorehrV2Bp(query?: ListCorehrV2BpQuery): Paginated<Bp>
    /**
     * 获取组织类角色授权列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/assigned_user/search
     */
    searchCorehrV1AssignedUser(body: SearchCorehrV1AssignedUserRequest, query?: SearchCorehrV1AssignedUserQuery): Paginated<RoleAuthorization>
    /**
     * 查询流程实例列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/list
     */
    listCorehrV2Process(query?: ListCorehrV2ProcessQuery): Paginated<string, 'process_ids'>
    /**
     * 获取单个流程详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process/get
     */
    getCorehrV2Process(process_id: string, query?: GetCorehrV2ProcessQuery): Promise<GetCorehrV2ProcessResponse>
    /**
     * 获取流程表单数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-form_variable_data/get
     */
    getCorehrV2ProcessFormVariableData(process_id: string, query?: GetCorehrV2ProcessFormVariableDataQuery): Promise<GetCorehrV2ProcessFormVariableDataResponse>
    /**
     * 撤销流程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_revoke/update
     */
    updateCorehrV2ProcessRevoke(process_id: string, body: UpdateCorehrV2ProcessRevokeRequest, query?: UpdateCorehrV2ProcessRevokeQuery): Promise<void>
    /**
     * 撤回流程
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process_withdraw/update
     */
    updateCorehrV2ProcessWithdraw(process_id: string, body: UpdateCorehrV2ProcessWithdrawRequest, query?: UpdateCorehrV2ProcessWithdrawQuery): Promise<void>
    /**
     * 获取指定人员审批任务列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/approver/list
     */
    listCorehrV2Approver(query?: ListCorehrV2ApproverQuery): Paginated<ApproverInfo, 'approver_list'>
    /**
     * 通过/拒绝审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-approver/update
     */
    updateCorehrV2ProcessApprover(process_id: string, approver_id: string, body: UpdateCorehrV2ProcessApproverRequest, query?: UpdateCorehrV2ProcessApproverQuery): Promise<UpdateCorehrV2ProcessApproverResponse>
    /**
     * 加签审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-extra/update
     */
    updateCorehrV2ProcessExtra(process_id: string, body: UpdateCorehrV2ProcessExtraRequest, query?: UpdateCorehrV2ProcessExtraQuery): Promise<void>
    /**
     * 转交审批任务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/process-transfer/update
     */
    updateCorehrV2ProcessTransfer(process_id: string, body: UpdateCorehrV2ProcessTransferRequest, query?: UpdateCorehrV2ProcessTransferQuery): Promise<void>
    /**
     * 获取员工薪资标准
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/compensation_standard/match
     */
    matchCorehrV1CompensationStandard(query?: MatchCorehrV1CompensationStandardQuery): Promise<MatchCorehrV1CompensationStandardResponse>
    /**
     * 获取流程表单数据
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/process-form_variable_data/get
     */
    getCorehrV1ProcessFormVariableData(process_id: string): Promise<GetCorehrV1ProcessFormVariableDataResponse>
    /**
     * 批量查询城市/区域信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/list
     */
    listCorehrV1Subregion(query?: ListCorehrV1SubregionQuery): Paginated<Subregion>
    /**
     * 查询单条城市/区域信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subregion/get
     */
    getCorehrV1Subregion(subregion_id: string): Promise<GetCorehrV1SubregionResponse>
    /**
     * 批量查询省份/行政区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/list
     */
    listCorehrV1Subdivision(query?: ListCorehrV1SubdivisionQuery): Paginated<Subdivision>
    /**
     * 查询单条省份/行政区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/subdivision/get
     */
    getCorehrV1Subdivision(subdivision_id: string): Promise<GetCorehrV1SubdivisionResponse>
    /**
     * 批量查询国家/地区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/list
     */
    listCorehrV1CountryRegion(query?: Pagination): Paginated<CountryRegion>
    /**
     * 查询单条国家/地区信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/country_region/get
     */
    getCorehrV1CountryRegion(country_region_id: string): Promise<GetCorehrV1CountryRegionResponse>
    /**
     * 批量查询货币信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/list
     */
    listCorehrV1Currency(query?: Pagination): Paginated<Currency>
    /**
     * 查询单个货币信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/currency/get
     */
    getCorehrV1Currency(currency_id: string): Promise<GetCorehrV1CurrencyResponse>
    /**
     * 查询单个职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/get
     */
    getCorehrV1Job(job_id: string): Promise<GetCorehrV1JobResponse>
    /**
     * 删除部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/delete
     */
    deleteCorehrV1Department(department_id: string): Promise<void>
    /**
     * 更新部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/patch
     */
    patchCorehrV1Department(department_id: string, body: PatchCorehrV1DepartmentRequest, query?: PatchCorehrV1DepartmentQuery): Promise<PatchCorehrV1DepartmentResponse>
    /**
     * 查询单个部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/get
     */
    getCorehrV1Department(department_id: string, query?: GetCorehrV1DepartmentQuery): Promise<GetCorehrV1DepartmentResponse>
    /**
     * 批量查询职务
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job/list
     */
    listCorehrV1Job(query?: ListCorehrV1JobQuery): Paginated<Job>
    /**
     * 批量查询部门
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/list
     */
    listCorehrV1Department(query?: ListCorehrV1DepartmentQuery): Paginated<Department>
    /**
     * 更新个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/patch
     */
    patchCorehrV1Person(person_id: string, body: PatchCorehrV1PersonRequest, query?: PatchCorehrV1PersonQuery): Promise<PatchCorehrV1PersonResponse>
    /**
     * 创建个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/create
     */
    createCorehrV1Person(body: CreateCorehrV1PersonRequest, query?: CreateCorehrV1PersonQuery): Promise<CreateCorehrV1PersonResponse>
    /**
     * 查询单个个人信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/get
     */
    getCorehrV1Person(person_id: string, query?: GetCorehrV1PersonQuery): Promise<GetCorehrV1PersonResponse>
    /**
     * 操作员工离职
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/submit
     */
    submitCorehrV1Offboarding(body: SubmitCorehrV1OffboardingRequest, query?: SubmitCorehrV1OffboardingQuery): Promise<SubmitCorehrV1OffboardingResponse>
  }
}

export interface QueryCorehrV1CustomFieldQuery {
  /** 所属对象 apiname，支持一个或多个当前数量限制为 20 个 */
  object_api_name_list: string[]
}

export interface QueryCorehrV1CustomFieldResponse {
  /** 自定义字段列表 */
  items?: CustomField[]
}

export interface GetByParamCorehrV1CustomFieldQuery {
  /** 所属对象 apiname */
  object_api_name: string
  /** 自定义字段 apiname */
  custom_api_name: string
}

export interface GetByParamCorehrV1CustomFieldResponse {
  /** 自定义字段详情 */
  data?: CustomField
}

export interface AddEnumOptionCorehrV1CommonDataMetaDataRequest {
  /** 所属对象 API name，可通过[获取飞书人事对象列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/list_object_api_name)接口中返回的 `object_api_name` 字段获取 */
  object_api_name: string
  /** 枚举字段 API name，可通过[获取自定义字段列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/query)接口中返回的 `custom_api_name` 字段获取 */
  enum_field_api_name: string
  /** 新增枚举选项列表 */
  enum_field_options: EnumFieldOption[]
}

export interface AddEnumOptionCorehrV1CommonDataMetaDataQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface AddEnumOptionCorehrV1CommonDataMetaDataResponse {
  /** 枚举字段 API name */
  enum_field_api_name?: string
  /** 枚举全部选项列表 */
  enum_field_options?: EnumFieldOption[]
}

export interface EditEnumOptionCorehrV1CommonDataMetaDataRequest {
  /** 所属对象 API name，可通过[获取飞书人事对象列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/list_object_api_name)接口中返回的 `object_api_name` 字段获取 */
  object_api_name: string
  /** 枚举字段 API name，可通过[获取自定义字段列表](/ssl:ttdoc/server-docs/corehr-v1/basic-infomation/custom_field/query)接口中返回的 `custom_api_name` 字段获取 */
  enum_field_api_name: string
  /** 枚举选项 */
  enum_field_option: EnumFieldOption
}

export interface EditEnumOptionCorehrV1CommonDataMetaDataQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface EditEnumOptionCorehrV1CommonDataMetaDataResponse {
  /** 枚举字段 API name */
  enum_field_api_name?: string
  /** 枚举全部选项列表 */
  enum_field_options?: EnumFieldOption[]
}

export const enum SearchCorehrV2BasicInfoCountryRegionRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoCountryRegionRequest {
  /** 国家/地区 ID 列表，可从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.country_region_id`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.country_region_id` 等字段中获取 */
  country_region_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoCountryRegionRequestStatus[]
}

export const enum SearchCorehrV2BasicInfoCountryRegionSubdivisionRequestStatus {
  /** 生效 */
  Effective = 1,
  /** 失效 */
  Expiration = 0,
}

export interface SearchCorehrV2BasicInfoCountryRegionSubdivisionRequest {
  /** 国家/地区 ID 列表，可通过【查询国家/地区信息】接口获取 */
  country_region_id_list?: string[]
  /** 省份/行政区 ID 列表 */
  country_region_subdivision_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoCountryRegionSubdivisionRequestStatus[]
}

export const enum SearchCorehrV2BasicInfoCityRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoCityRequest {
  /** 省份/主要行政区 ID 列表，可通过[查询省份/主要行政区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region_subdivision/search)接口列举，或从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.region_id`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.region_id` 等字段中获取 */
  country_region_subdivision_id_list?: string[]
  /** 城市 ID 列表，可从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.city_id_v2`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.city_id_v2` 等字段中获取 */
  city_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoCityRequestStatus[]
}

export const enum SearchCorehrV2BasicInfoDistrictRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoDistrictRequest {
  /** 所属城市 ID 列表，可通过[查询城市信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-city/search)接口列举，或从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.city_v2_id`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.city_v2_id` 等字段中获取 */
  city_id_list?: string[]
  /** 区/县 ID 列表，可从[批量查询地点](/ssl:ttdoc/server-docs/corehr-v1/organization-management/location/list)接口返回的 `location.address.district_id_v2`、[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.address_list.district_id_v2` 等字段中获取 */
  district_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoDistrictRequestStatus[]
}

export const enum SearchCorehrV2BasicInfoNationalityRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoNationalityRequest {
  /** 国籍 ID 列表，可从[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)接口返回的 `person_info.nationality_id_v2` 等字段中获取 */
  nationality_id_list?: string[]
  /** 国家/地区 ID 列表，可通过[查询国家/地区信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-country_region/search)接口列举 */
  country_region_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoNationalityRequestStatus[]
}

export interface CreateCorehrV1NationalIdTypeRequest {
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

export interface CreateCorehrV1NationalIdTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1NationalIdTypeResponse {
  national_id_type?: NationalIdType
}

export interface PatchCorehrV1NationalIdTypeRequest {
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

export interface PatchCorehrV1NationalIdTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1NationalIdTypeResponse {
  national_id_type?: NationalIdType
}

export interface GetCorehrV1NationalIdTypeResponse {
  /** 国家证件类型信息 */
  national_id_type?: NationalIdType
}

export interface ListCorehrV1NationalIdTypeQuery extends Pagination {
  /** 证件类型 */
  identification_type?: string
  /** 证件类型编码 */
  code?: string
  /** 国家地区ID */
  country_region_id?: string
}

export const enum SearchCorehrV2BasicInfoBankRequestStatus {
  /** 生效 */
  Enabled = 1,
  /** 失效 */
  Disabled = 0,
}

export interface SearchCorehrV2BasicInfoBankRequest {
  /** 银行 ID 列表，可通过[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)、[批量查询员工信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_id_v2` 字段获取 */
  bank_id_list?: string[]
  /** 银行名称列表，支持对银行名称精确搜索 */
  bank_name_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoBankRequestStatus[]
  /** 最早更新时间 */
  update_start_time?: string
  /** 最晚更新时间 */
  update_end_time?: string
}

export const enum SearchCorehrV2BasicInfoBankBranchRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoBankBranchRequest {
  /** 银行 ID 列表，可通过[查询银行信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/basic_info-bank/search)列举，或从[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)、[批量查询员工信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_id_v2` 字段中获取 */
  bank_id_list?: string[]
  /** 支行 ID 列表，可通过[搜索员工信息](/ssl:ttdoc/server-docs/corehr-v1/employee/search)、[批量查询员工信息](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/batch_get)等接口返回的 `person_info.bank_account_list.bank_branch_id_v2` 字段获取 */
  bank_branch_id_list?: string[]
  /** 支行名称列表，支持对支行名称精确搜索 */
  bank_branch_name_list?: string[]
  /** 金融分支机构编码（联行号）列表，支持对金融分支机构编码精确搜索 */
  code_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoBankBranchRequestStatus[]
  /** 最早更新时间 */
  update_start_time?: string
  /** 最晚更新时间 */
  update_end_time?: string
}

export const enum SearchCorehrV2BasicInfoCurrencyRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoCurrencyRequest {
  /** 货币 ID 列表，可通过[批量查询薪资方案](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/compensation-v1/plan/list)、[批量查询员工薪资档案](/ssl:ttdoc/uAjLw4CM/ukTMukTMukTM/compensation-v1/archive/query)等接口返回的 `currency_id` 字段获取 */
  currency_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoCurrencyRequestStatus[]
}

export const enum SearchCorehrV2BasicInfoTimeZoneRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoTimeZoneRequest {
  /** 时区 ID 列表 */
  time_zone_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoTimeZoneRequestStatus[]
}

export const enum SearchCorehrV2BasicInfoLanguageRequestStatus {
  /** 生效 */
  Active = 1,
  /** 失效 */
  Inactive = 0,
}

export interface SearchCorehrV2BasicInfoLanguageRequest {
  /** 语言 ID 列表 */
  language_id_list?: string[]
  /** 状态列表 */
  status_list?: SearchCorehrV2BasicInfoLanguageRequestStatus[]
}

export interface CreateCorehrV1EmployeeTypeRequest {
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

export interface CreateCorehrV1EmployeeTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1EmployeeTypeResponse {
  employee_type?: EmployeeType
}

export interface PatchCorehrV1EmployeeTypeRequest {
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

export interface PatchCorehrV1EmployeeTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1EmployeeTypeResponse {
  employee_type?: EmployeeType
}

export interface GetCorehrV1EmployeeTypeResponse {
  /** 雇员类型 */
  employee_type?: EmployeeType
}

export interface CreateCorehrV1WorkingHoursTypeRequest {
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

export interface CreateCorehrV1WorkingHoursTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1WorkingHoursTypeResponse {
  working_hours_type?: WorkingHoursType
}

export interface PatchCorehrV1WorkingHoursTypeRequest {
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

export interface PatchCorehrV1WorkingHoursTypeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1WorkingHoursTypeResponse {
  working_hours_type?: WorkingHoursType
}

export interface GetCorehrV1WorkingHoursTypeResponse {
  /** 工时制度信息 */
  working_hours_type?: WorkingHoursType
}

export interface ConvertCorehrV1CommonDataIdRequest {
  /** ID 列表（最多传入 100 个 ID，ID 长度限制 50 个字符） */
  ids: string[]
}

export const enum ConvertCorehrV1CommonDataIdQueryIdTransformType {
  /** 飞书人事 -> 飞书通讯录 */
  CoreHR2Feishu = 1,
  /** 飞书通讯录 -> 飞书人事 */
  Feishu2CoreHR = 2,
  /** people admin -> 飞书人事 */
  Admin2Feishu = 3,
  /** people admin -> 飞书通讯录 */
  Admin2CoreHR = 4,
}

export interface ConvertCorehrV1CommonDataIdQuery {
  /** ID 转换类型 */
  id_transform_type: ConvertCorehrV1CommonDataIdQueryIdTransformType
  /** 要转换的ID类型 */
  id_type: 'user_id' | 'department_id' | 'job_level_id' | 'job_family_id' | 'employee_type_id'
  /** 用户 ID 类型 */
  feishu_user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 类型 */
  feishu_department_id_type?: 'open_department_id' | 'department_id'
}

export interface ConvertCorehrV1CommonDataIdResponse {
  /** ID 信息列表 */
  items?: IdInfo[]
}

export interface BatchGetCorehrV2EmployeeRequest {
  /** 返回数据的字段列表，填写方式：为空时默认仅返回 ID */
  fields?: string[]
  /** 雇佣 ID 列表 */
  employment_ids?: string[]
  /** 个人信息 ID 列表，employment_ids参数有值时该参数不生效 */
  person_ids?: string[]
  /** 主工作邮箱列表 */
  work_emails?: string[]
}

export interface BatchGetCorehrV2EmployeeQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface BatchGetCorehrV2EmployeeResponse {
  /** 查询的雇佣信息 */
  items?: Employee[]
}

export interface SearchCorehrV2EmployeeRequest {
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

export interface SearchCorehrV2EmployeeQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrV2EmployeeRequest {
  /** 个人信息 */
  personal_info?: ProfileSettingPersonalInfo
  /** 工作信息 */
  employment_info?: ProfileSettingEmploymentInfo
  /** 履历信息 */
  career?: ProfileSettingCareer
  /** 资料附件 */
  data_attachment?: ProfileSettingDataAttachment
}

export interface CreateCorehrV2EmployeeQuery {
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

export interface CreateCorehrV2EmployeeResponse {
  /** 雇佣信息 ID */
  employment_id?: string
  /** 合同 ID */
  contract_id?: string
  /** 任职信息 ID */
  job_data_id?: string
}

export interface CreateCorehrV2PersonRequest {
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

export interface CreateCorehrV2PersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV2PersonResponse {
  person?: PersonInfo
}

export interface PatchCorehrV2PersonRequest {
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

export interface PatchCorehrV2PersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 根据no_need_query判断更新后是否做查询请求并返回个人信息 */
  no_need_query?: boolean
}

export interface PatchCorehrV2PersonResponse {
  person?: PersonInfo
}

export interface UploadCorehrV1PersonForm {
  /** 文件二进制内容 */
  file_content: Blob
  /** 文件名称 */
  file_name: string
}

export interface UploadCorehrV1PersonResponse {
  /** 上传文件ID */
  id?: string
}

export interface CreateCorehrV1EmploymentRequest {
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

export interface CreateCorehrV1EmploymentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1EmploymentResponse {
  employment?: EmploymentCreate
}

export interface PatchCorehrV1EmploymentRequest {
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

export interface PatchCorehrV1EmploymentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface PatchCorehrV1EmploymentResponse {
  employment?: Employment
}

export interface DeleteCorehrV1EmploymentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrV1JobDataRequest {
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

export interface CreateCorehrV1JobDataQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrV1JobDataResponse {
  job_data?: JobData
}

export interface DeleteCorehrV1JobDataQuery {
  /** 需要删除的任职记录版本 ID */
  version_id?: string
}

export interface PatchCorehrV1JobDataRequest {
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

export interface PatchCorehrV1JobDataQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
  /** 是否强校验。值为 true 时，会对入参进行业务校验，并产生异动记录、发送异动事件。- 默认值：false- 仅在新增任职版本时生效，当 version_id 不为空时该字段不生效 */
  strict_verify?: string
}

export interface PatchCorehrV1JobDataResponse {
  job_data?: JobData
}

export interface QueryCorehrV2EmployeesJobDataRequest {
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

export interface QueryCorehrV2EmployeesJobDataQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface BatchGetCorehrV2EmployeesJobDataRequest {
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

export interface BatchGetCorehrV2EmployeesJobDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface BatchGetCorehrV2EmployeesJobDataResponse {
  /** 查询的雇佣信息 */
  items?: EmployeeJobData[]
}

export interface ListCorehrV1JobDataQuery extends Pagination {
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

export interface GetCorehrV1JobDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface GetCorehrV1JobDataResponse {
  /** 任职信息 */
  job_data?: JobData
}

export interface CreateCorehrV2EmployeesAdditionalJobRequest {
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

export interface CreateCorehrV2EmployeesAdditionalJobQuery {
  /** 操作的唯一标识，用于幂等校验。请求成功时，重复的client_token不会再创建、变更数据。 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrV2EmployeesAdditionalJobResponse {
  additional_job?: EmployeesAdditionalJobWriteResp
}

export interface PatchCorehrV2EmployeesAdditionalJobRequest {
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

export interface PatchCorehrV2EmployeesAdditionalJobQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface PatchCorehrV2EmployeesAdditionalJobResponse {
  additional_job?: EmployeesAdditionalJobWriteResp
}

export interface BatchCorehrV2EmployeesAdditionalJobRequest {
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

export interface BatchCorehrV2EmployeesAdditionalJobQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryOperationLogsCorehrV2DepartmentRequest {
  /** 部门ID列表 */
  department_ids: string[]
  /** 查询的起始操作日期，格式 "YYYY-MM-DD"，不带时分秒，包含start_date传入的时间，系统会以start_date的00:00:00为开始时间进行查询 */
  start_date: string
  /** 查询的截止操作日期，格式 "YYYY-MM-DD"，不带时分秒，包含end_date传入的时间，系统会以end_date的23:59:59为截止时间进行查询。查询截止日期应大于起始日期，起止日期跨度最大为366天 */
  end_date: string
}

export interface QueryOperationLogsCorehrV2DepartmentQuery extends Pagination {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryOperationLogsCorehrV2DepartmentResponse {
  /** 操作日志列表 */
  op_logs?: OrganizationOpLog[]
  /** 下一页token */
  next_page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface CreateCorehrV1DepartmentRequest {
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

export interface CreateCorehrV1DepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrV1DepartmentResponse {
  department?: DepartmentCreate
}

export interface PatchCorehrV2DepartmentRequest {
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

export interface PatchCorehrV2DepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface ParentsCorehrV2DepartmentRequest {
  /** 部门 ID 列表，一次性最多传入 100 个部门 ID */
  department_id_list: string[]
}

export interface ParentsCorehrV2DepartmentQuery {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface ParentsCorehrV2DepartmentResponse {
  /** 父部门查询结果 */
  items?: DepartmentParents[]
}

export interface BatchGetCorehrV2DepartmentRequest {
  /** 部门 ID 列表 */
  department_id_list?: string[]
  /** 返回数据的字段列表 */
  fields?: string[]
  /** 部门名称精确匹配，最多传100个 */
  department_name_list?: string[]
}

export interface BatchGetCorehrV2DepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface BatchGetCorehrV2DepartmentResponse {
  /** 查询的部门信息 */
  items?: Department[]
}

export interface QueryRecentChangeCorehrV2DepartmentQuery extends Pagination {
  /** 查询的开始时间，格式 "yyyy-MM-dd"，不带时分秒，包含 start_date 传入的时间, 系统会以 start_date 的 00:00:00 查询。 */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd"，不带时分秒， 查询日期小于 end_data + 1 天的 00:00:00。 */
  end_date: string
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryRecentChangeCorehrV2DepartmentResponse {
  /** 部门 ID 列表 */
  department_ids?: string[]
  /** 目标查询时间范围内被删除的部门列表 */
  deleted_department_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface QueryTimelineCorehrV2DepartmentRequest {
  /** 部门 ID 列表 */
  department_ids: string[]
  /** 生效日期 */
  effective_date: string
  /** 返回数据的字段列表，可选["department_name", "code", "active", "parent_department_id", "manager", "description", "effective_date"] */
  fields?: string[]
}

export interface QueryTimelineCorehrV2DepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryTimelineCorehrV2DepartmentResponse {
  /** 部门信息 */
  items?: DepartmentTimeline[]
}

export interface TreeCorehrV2DepartmentRequest {
  /** 部门 ID，默认根部门 */
  department_id?: string
  /** 是否包含失效部门，默认false */
  need_inactive?: boolean
  /** 生效日期，格式yyyy-mm-dd，默认当前日期 */
  effective_date?: string
}

export interface TreeCorehrV2DepartmentQuery extends Pagination {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryMultiTimelineCorehrV2DepartmentRequest {
  /** 部门 ID 列表 */
  department_ids: string[]
  /** 生效日期开始(包含) */
  effective_date_start?: string
  /** 生效日期结束(包含) */
  effective_date_end?: string
  /** 返回数据的字段列表，可选["department_name", "code", "active", "parent_department_id", "manager", "description", "effective_date"], 以及自定义字段field_name */
  fields?: string[]
}

export interface QueryMultiTimelineCorehrV2DepartmentQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface SearchCorehrV2DepartmentRequest {
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

export interface SearchCorehrV2DepartmentQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface DeleteCorehrV2DepartmentQuery {
  /** 此次删除中所使用的部门ID类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrV1LocationRequest {
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

export interface CreateCorehrV1LocationQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1LocationResponse {
  location?: Location
}

export interface PatchCorehrV2LocationRequest {
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

export interface PatchCorehrV2LocationQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface GetCorehrV1LocationResponse {
  /** 地点信息 */
  location?: Location
}

export interface QueryRecentChangeCorehrV2LocationQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface QueryRecentChangeCorehrV2LocationResponse {
  /** 地点 ID 列表 */
  location_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的地点 ID 列表 */
  deleted_location_ids?: string[]
}

export interface BatchGetCorehrV2LocationRequest {
  /** 地点 ID 列表 */
  location_ids: string[]
}

export interface BatchGetCorehrV2LocationResponse {
  /** 查询的地点信息 */
  items?: Location[]
}

export interface ActiveCorehrV2LocationRequest {
  /** 地点 ID */
  location_id: string
  /** 生效时间 */
  effective_time: string
  /** 启用停用状态 */
  active: boolean
  /** 操作原因 */
  operation_reason: string
}

export interface PatchCorehrV2LocationAddressRequest {
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

export interface PatchCorehrV2LocationAddressQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV2LocationAddressRequest {
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

export interface CreateCorehrV2LocationAddressQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV2LocationAddressResponse {
  /** 地址 ID */
  address_id?: string
}

export interface CreateCorehrV1CompanyRequest {
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

export interface CreateCorehrV1CompanyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1CompanyResponse {
  company?: Company
}

export interface PatchCorehrV1CompanyRequest {
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

export interface PatchCorehrV1CompanyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1CompanyResponse {
  company?: Company
}

export interface ActiveCorehrV2CompanyRequest {
  /** 公司ID */
  company_id: string
  /** 生效时间 */
  effective_time: string
  /** 启用停用状态 */
  active: boolean
  /** 操作原因 */
  operation_reason: string
}

export interface GetCorehrV1CompanyResponse {
  /** 公司信息 */
  company?: Company
}

export interface QueryRecentChangeCorehrV2CompanyQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface QueryRecentChangeCorehrV2CompanyResponse {
  /** 公司 ID 列表 */
  company_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的公司 ID 列表 */
  deleted_company_ids?: string[]
}

export interface BatchGetCorehrV2CompanyRequest {
  /** 公司 ID 列表 */
  company_ids: string[]
}

export interface BatchGetCorehrV2CompanyResponse {
  /** 查询的公司信息 */
  items?: Company[]
}

export interface CreateCorehrV2CostCenterRequest {
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

export interface CreateCorehrV2CostCenterQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrV2CostCenterResponse {
  cost_center?: CostCenter
}

export interface PatchCorehrV2CostCenterRequest {
  /** 生效时间 */
  effective_time: string
  /** 启用停用状态 */
  active: boolean
  /** 操作原因 */
  operation_reason: string
}

export interface PatchCorehrV2CostCenterQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface PatchCorehrV2CostCenterResponse {
  cost_center?: CostCenter
}

export interface QueryRecentChangeCorehrV2CostCenterQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface QueryRecentChangeCorehrV2CostCenterResponse {
  /** 成本中心 ID 列表 */
  cost_center_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的成本中心 ID 列表 */
  deleted_cost_center_ids?: string[]
}

export interface SearchCorehrV2CostCenterRequest {
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

export interface SearchCorehrV2CostCenterQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface DeleteCorehrV2CostCenterRequest {
  /** 操作原因 */
  operation_reason: string
}

export interface CreateCorehrV2CostCenterVersionRequest {
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

export interface CreateCorehrV2CostCenterVersionQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrV2CostCenterVersionResponse {
  version?: CostCenterVersion
}

export interface PatchCorehrV2CostCenterVersionRequest {
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

export interface PatchCorehrV2CostCenterVersionQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface PatchCorehrV2CostCenterVersionResponse {
  version?: CostCenterVersion
}

export interface DeleteCorehrV2CostCenterVersionRequest {
  /** 操作原因 */
  operation_reason: string
}

export interface GetCorehrV2ApprovalGroupsQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface GetCorehrV2ApprovalGroupsResponse {
  /** 组织架构调整流程信息 */
  approval_group?: ApprovalGroup
}

export interface OpenQueryDepartmentChangeListByIdsCorehrV2ApprovalGroupsRequest {
  /** 部门调整记录 ID List */
  department_change_ids?: string[]
  /** 是否返回部门全路径 */
  need_department_path?: boolean
}

export interface OpenQueryDepartmentChangeListByIdsCorehrV2ApprovalGroupsQuery {
  /** 组织架构调整流程 ID */
  process_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface OpenQueryDepartmentChangeListByIdsCorehrV2ApprovalGroupsResponse {
  /** 部门调整记录信息列表 */
  department_changes?: DepartmentChange[]
}

export interface OpenQueryJobChangeListByIdsCorehrV2ApprovalGroupsRequest {
  /** 人员异动记录 ID List */
  job_change_ids?: string[]
  /** 是否返回部门全路径 */
  need_department_path?: boolean
}

export interface OpenQueryJobChangeListByIdsCorehrV2ApprovalGroupsQuery {
  /** 组织架构调整流程 ID */
  process_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface OpenQueryJobChangeListByIdsCorehrV2ApprovalGroupsResponse {
  /** 人员异动记录信息列表 */
  job_changes?: JobChange[]
}

export interface CreateCorehrV1JobFamilyRequest {
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

export interface CreateCorehrV1JobFamilyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1JobFamilyResponse {
  job_family?: JobFamily
}

export interface PatchCorehrV1JobFamilyRequest {
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

export interface PatchCorehrV1JobFamilyQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1JobFamilyResponse {
  job_family?: JobFamily
}

export interface GetCorehrV1JobFamilyResponse {
  /** 职务序列信息 */
  job_family?: JobFamily
}

export interface QueryRecentChangeCorehrV2JobFamilyQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface QueryRecentChangeCorehrV2JobFamilyResponse {
  /** 序列 ID 列表 */
  job_family_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的序列 ID 列表 */
  deleted_job_family_ids?: string[]
}

export interface BatchGetCorehrV2JobFamilyRequest {
  /** 序列 ID 列表 */
  job_family_ids: string[]
}

export interface BatchGetCorehrV2JobFamilyResponse {
  /** 查询的序列信息 */
  items?: JobFamily[]
}

export interface CreateCorehrV1JobLevelRequest {
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

export interface CreateCorehrV1JobLevelQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1JobLevelResponse {
  job_level?: JobLevel
}

export interface PatchCorehrV1JobLevelRequest {
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

export interface PatchCorehrV1JobLevelQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1JobLevelResponse {
  job_level?: JobLevel
}

export interface GetCorehrV1JobLevelResponse {
  /** 职务级别信息 */
  job_level?: JobLevel
}

export interface QueryRecentChangeCorehrV2JobLevelQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface QueryRecentChangeCorehrV2JobLevelResponse {
  /** 职级 ID 列表 */
  job_level_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的职级 ID 列表 */
  deleted_job_level_ids?: string[]
}

export interface BatchGetCorehrV2JobLevelRequest {
  /** 职级 ID 列表 */
  job_level_ids: string[]
}

export interface BatchGetCorehrV2JobLevelResponse {
  /** 查询的职级信息 */
  items?: JobLevel[]
}

export interface CreateCorehrV2JobGradeRequest {
  /** 职等数值 */
  grade_order: number
  /** 编码 */
  code?: string
  /** 名称 */
  names: I18n[]
  /** 描述 */
  descriptions?: I18n[]
}

export interface CreateCorehrV2JobGradeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV2JobGradeResponse {
  /** 职等ID */
  grade_id?: string
}

export interface PatchCorehrV2JobGradeRequest {
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

export interface PatchCorehrV2JobGradeQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface QueryCorehrV2JobGradeRequest {
  /** 职等ID列表 */
  ids?: string[]
  /** 职等code列表 */
  codes?: string[]
  /** 是否启用 */
  active?: boolean
}

export interface QueryRecentChangeCorehrV2JobGradeQuery extends Pagination {
  /** 查询的开始时间，支持"yyyy-MM-dd HH:MM:SS" */
  start_date: string
  /** 查询的结束时间，格式 "yyyy-MM-dd HH:MM:SS" */
  end_date: string
}

export interface QueryRecentChangeCorehrV2JobGradeResponse {
  /** 职等 ID 列表 */
  job_grade_ids?: string[]
  /** 下一页页码 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
  /** 删除的职等 ID 列表 */
  deleted_job_grade_ids?: string[]
}

export interface CreateCorehrV1JobRequest {
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

export interface CreateCorehrV1JobQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1JobResponse {
  job?: Job
}

export interface PatchCorehrV1JobRequest {
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

export interface PatchCorehrV1JobQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1JobResponse {
  job?: Job
}

export interface GetCorehrV2JobResponse {
  /** 职务信息 */
  job?: Job
}

export interface ListCorehrV2JobQuery extends Pagination {
  /** 名称 */
  name?: string
  /** 语言 */
  query_language?: string
}

export interface WithdrawOnboardingCorehrV2PreHireRequest {
  /** 待入职ID，可从待入职列表接口获取 */
  pre_hire_id: string
  /** 撤销原因 */
  withdraw_reason: string
}

export interface WithdrawOnboardingCorehrV2PreHireResponse {
  /** 是否成功撤销入职 */
  success?: boolean
}

export interface RestoreFlowInstanceCorehrV2PreHireRequest {
  /** 待入职ID，可从待入职列表接口获取 */
  pre_hire_id: string
  /** 是否强制占编；true为强制占编；false为非强制占编 */
  confirm_workforce?: boolean
}

export interface RestoreFlowInstanceCorehrV2PreHireResponse {
  /** 是否成功恢复入职 */
  success?: boolean
}

export interface CreateCorehrV2PreHireRequest {
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

export interface CreateCorehrV2PreHireResponse {
  /** 待入职 ID */
  pre_hire_id?: string
}

export interface PatchCorehrV2PreHireRequest {
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

export interface PatchCorehrV2PreHireResponse {
  /** 待入职ID */
  pre_hire_id?: string
}

export interface QueryCorehrV2PreHireRequest {
  /** 待入职人员 ID 列表；如果该字段非空，则不按照page_size、page_token分页方式查询 */
  pre_hire_ids?: string[]
  /** 返回数据的字段列表，填写方式：- 为空时只返回 pre_hire_id- 不为空时按照传入的字段返回数据，格式如下：    - person_info 字段：person_info.gender，person_info.age    - employment_info 字段：employment_info.department    - onboarding_info 字段：onboarding_info.onboarding_date    - probation_info 字段：probation_info.probation_period    - contract_info 字段：contract_info.contract_type- 如果要返回所有下级，只用传上级结构体名称，例如 person_info- 返回数据越多，查询接口性能越慢，请按需填写返回字段 */
  fields?: string[]
}

export interface QueryCorehrV2PreHireQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface GetCorehrV1PreHireResponse {
  /** 待入职信息 */
  pre_hire?: PreHire
}

export interface ListCorehrV1PreHireQuery extends Pagination {
  /** 待入职ID列表 */
  pre_hire_ids?: string[]
}

export interface SearchCorehrV2PreHireRequest {
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

export interface SearchCorehrV2PreHireQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface TransitTaskCorehrV2PreHireRequest {
  /** 系统预置的职位信息和个人信息任务的task_id分别为1和2，自定义任务的task_id是一串UUID */
  task_id: string
}

export interface TransitTaskCorehrV2PreHireResponse {
  /** 是否成功流转任务 */
  success?: boolean
}

export interface CompleteCorehrV2PreHireResponse {
  /** 是否成功完成入职 */
  success?: boolean
}

export interface PatchCorehrV1PreHireRequest {
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

export interface PatchCorehrV1PreHireQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1PreHireResponse {
  pre_hire?: PreHire
}

export interface CreateCorehrV2ProbationAssessmentRequest {
  /** 试用期人员的雇佣 ID */
  employment_id: string
  /** 试用期考核结果列表 */
  assessments: AssessmentForCreate[]
}

export interface CreateCorehrV2ProbationAssessmentQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrV2ProbationAssessmentResponse {
  /** 创建的试用期考核记录 ID 列表，有序返回 */
  assessment_ids?: string[]
}

export interface EnableDisableAssessmentCorehrV2ProbationRequest {
  /** 启用 / 停用状态。启用后可在试用期管理页面中可见试用期考核相关的字段。 */
  active: boolean
  /** 试用期考核系统入口链接，当启用功能时该字段必填。 */
  app_url?: string
}

export interface PatchCorehrV2ProbationAssessmentRequest {
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

export interface PatchCorehrV2ProbationAssessmentQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface SearchCorehrV2ProbationRequest {
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

export interface SearchCorehrV2ProbationQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface SubmitCorehrV2ProbationRequest {
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

export interface SubmitCorehrV2ProbationQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface SubmitCorehrV2ProbationResponse {
  /** 试用期信息 */
  probation_info?: ProbationInfoForSubmit
}

export interface WithdrawCorehrV2ProbationRequest {
  /** 试用期人员的雇佣 ID */
  employment_id: string
}

export interface WithdrawCorehrV2ProbationQuery {
  /** 根据 client_token 是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export const enum CreateCorehrV2JobChangeRequestTransferMode {
  /** 直接异动 */
  Type1 = 1,
  /** 发起异动 */
  Type2 = 2,
}

export interface CreateCorehrV2JobChangeRequest {
  /** 异动方式 */
  transfer_mode: CreateCorehrV2JobChangeRequestTransferMode
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

export interface CreateCorehrV2JobChangeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface CreateCorehrV2JobChangeResponse {
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

export interface QueryCorehrV1TransferTypeQuery {
  /** 异动类型状态 */
  active?: boolean
  /** 异动类型唯一标识，多条时最多数量为10 */
  transfer_type_unique_identifier?: string[]
}

export interface QueryCorehrV1TransferTypeResponse {
  /** 异动类型列表 */
  items?: TransferType[]
}

export interface QueryCorehrV1TransferReasonQuery {
  /** 异动原因状态 */
  active?: boolean
  /** 异动原因唯一标识，多条时最多数量为10 */
  transfer_reason_unique_identifier?: string[]
}

export interface QueryCorehrV1TransferReasonResponse {
  /** 异动原因列表 */
  items?: TransferReason[]
}

export interface SearchCorehrV2JobChangeRequest {
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

export interface SearchCorehrV2JobChangeQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface RevokeCorehrV2JobChangeRequest {
  /** 操作人id */
  operator_id: string
}

export interface RevokeCorehrV2JobChangeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
}

export interface CreateCorehrV1JobChangeRequest {
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

export interface CreateCorehrV1JobChangeQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export const enum CreateCorehrV1JobChangeResponseStatus {
  /** Approving  审批中 */
  Approving = 0,
  /** Approved  审批通过 */
  Approved = 1,
  /** Transformed  已异动 */
  Transformed = 2,
  /** Rejected  已拒绝 */
  Rejected = 3,
  /** Cancelled  已撤销 */
  Cancelled = 4,
  /** NoNeedApproval  无需审批 */
  NoNeedApproval = 5,
}

export interface CreateCorehrV1JobChangeResponse {
  /** 异动记录 id */
  job_change_id?: string
  /** 雇员 id */
  employment_id?: string
  /** 异动状态 */
  status?: CreateCorehrV1JobChangeResponseStatus
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

export interface QueryCorehrV1OffboardingRequest {
  /** 是否启用 */
  active?: boolean
  /** 离职原因唯一标识列表，用于过滤，最大20个 */
  offboarding_reason_unique_identifier?: string[]
}

export interface QueryCorehrV1OffboardingResponse {
  /** 离职原因列表 */
  items?: OffboardingReason[]
}

export const enum SubmitV2CorehrV2OffboardingRequestOffboardingMode {
  /** 直接离职 */
  TerminationOfDismissal = 1,
  /** 发起离职审批 */
  OffboardingWithProcess = 2,
}

export interface SubmitV2CorehrV2OffboardingRequest {
  /** 离职方式 */
  offboarding_mode: SubmitV2CorehrV2OffboardingRequestOffboardingMode
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

export interface SubmitV2CorehrV2OffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface SubmitV2CorehrV2OffboardingResponse {
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

export interface EditCorehrV2OffboardingRequest {
  /** 离职记录 ID */
  offboarding_id: string
  /** 操作人雇佣 ID（employment_id），为空默认为系统操作。 */
  operator_id?: string
  /** 编辑字段数据信息 */
  update_data: ObjectFieldData[]
}

export interface EditCorehrV2OffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface EditCorehrV2OffboardingResponse {
  /** 编辑字段数据信息 */
  data: ObjectFieldData[]
}

export interface RevokeCorehrV2OffboardingRequest {
  /** 离职记录 ID */
  offboarding_id: string
  /** 操作人雇佣 ID（employment_id），为空默认为系统操作。 */
  operator_id?: string
}

export interface RevokeCorehrV2OffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface SearchCorehrV1OffboardingRequest {
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

export interface SearchCorehrV1OffboardingQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrV1ContractRequest {
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

export interface CreateCorehrV1ContractQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1ContractResponse {
  contract?: Contract
}

export interface PatchCorehrV1ContractRequest {
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

export interface PatchCorehrV1ContractQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1ContractResponse {
  contract?: Contract
}

export interface GetCorehrV1ContractResponse {
  /** 合同信息 */
  contract?: Contract
}

export interface SearchCorehrV2ContractRequest {
  /** 雇佣 ID 列表 */
  employment_id_list?: string[]
  /** 合同ID列表 */
  contract_id_list?: string[]
}

export interface SearchCorehrV2ContractQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface BatchSaveCorehrV2WorkforcePlanDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 编制规划的多个明细行 */
  items: WorkforcePlanDetailRow[]
}

export interface BatchDeleteCorehrV2WorkforcePlanDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 编制规划的多个明细行 */
  items: WorkforcePlanDetailRow[]
}

export interface BatchSaveCorehrV2ReportDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 集中填报id */
  centralized_reporting_project_id: string
  /** 集中填报的一些填报行 */
  items: WorkforcePlanDetailRow[]
}

export interface BatchDeleteCorehrV2ReportDetailRowRequest {
  /** 编制规划id */
  workforce_plan_id: string
  /** 集中填报id */
  centralized_reporting_project_id: string
  /** 集中填报的一些填报行 */
  items: WorkforcePlanDetailRow[]
}

export interface ListCorehrV2WorkforcePlanQuery {
  /** 是否获取所有编制规划方案，true 所有编制规划方案列表，false 为仅获取当前生效的编制规划方案，默认为 false示例值：false */
  get_all_plan?: boolean
  /** 是否只获取已启用的方案，true 获取已启用编制规划方案，false 获取所有编制规划方案，默认为 true示例值：true */
  active?: boolean
}

export interface ListCorehrV2WorkforcePlanResponse {
  /** 方案列表 */
  items?: WorkforcePlan[]
  /** 方案总数 */
  total?: number
}

export interface BatchCorehrV2WorkforcePlanDetailRequest {
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

export interface BatchCorehrV2WorkforcePlanDetailResponse {
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

export interface CreateCorehrV1LeaveGrantingRecordRequest {
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

export interface CreateCorehrV1LeaveGrantingRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface CreateCorehrV1LeaveGrantingRecordResponse {
  /** 假期授予记录 */
  leave_granting_record?: LeaveGrantingRecord
}

export interface LeaveTypesCorehrV1LeaveQuery extends Pagination {
  /** 假期类型状态（不传则为全部）可选值有：- 1：已启用- 2：已停用 */
  status?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface LeaveBalancesCorehrV1LeaveQuery extends Pagination {
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

export interface LeaveRequestHistoryCorehrV1LeaveQuery extends Pagination {
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

export interface WorkCalendarCorehrV1LeaveRequest {
  /** 工作日历ID列表 */
  wk_calendar_ids: string[]
  /** 工作日历ID大于 */
  wk_calendar_id_gt?: string
  /** 分页、排序等选项 */
  wk_option?: WkOption
  /** 是否只返回启用的工作日历，不填默认true */
  only_enable?: boolean
}

export interface WorkCalendarCorehrV1LeaveResponse {
  /** 工作日历列表 */
  work_calendars?: WorkCalendarDetail[]
  /** 入参count=true，则返回符合条件的工作日历总数 */
  count?: number
}

export interface CalendarByScopeCorehrV1LeaveQuery {
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

export interface CalendarByScopeCorehrV1LeaveResponse {
  /** 工作日历id */
  calendar_wk_id?: string
}

export interface WorkCalendarDateCorehrV1LeaveRequest {
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

export interface WorkCalendarDateCorehrV1LeaveResponse {
  /** 日期类型列表 */
  calendar_dates?: WkCalendarDate[]
}

export interface QueryCorehrV1AuthorizationQuery extends Pagination {
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

export interface GetByParamCorehrV1AuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface GetByParamCorehrV1AuthorizationResponse {
  /** 角色授权信息 */
  role_authorization?: RoleAuthorization
}

export interface AddRoleAssignCorehrV1AuthorizationRequest {
  /** 授权 */
  assigned_organization_items: AssignedOrganizationWithCode[][]
}

export interface AddRoleAssignCorehrV1AuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 角色 ID */
  role_id: string
}

export interface AddRoleAssignCorehrV1AuthorizationResponse {
  /** 授权id */
  assign_id?: string
}

export interface UpdateRoleAssignCorehrV1AuthorizationRequest {
  /** 授权 */
  assigned_organization_items: AssignedOrganizationWithCode[][]
}

export interface UpdateRoleAssignCorehrV1AuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 角色 ID */
  role_id: string
}

export interface UpdateRoleAssignCorehrV1AuthorizationResponse {
  /** 授权id */
  assign_id?: string
}

export interface RemoveRoleAssignCorehrV1AuthorizationQuery {
  /** 雇员 ID */
  employment_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 角色 ID */
  role_id: string
}

export interface RemoveRoleAssignCorehrV1AuthorizationResponse {
  /** 授权id */
  assign_id?: string
}

export interface BatchGetCorehrV2EmployeesBpRequest {
  /** 员工雇佣 ID */
  employment_ids: string[]
  /** 是否获取全部 BP，true 为获取员工所在部门及来自上级部门的全部 HRBP 和属地 BP，false 为仅获取员工的直属 HRBP 和属地 BP（当员工所在部门、属地无 BP 时，会上钻找到最近的 BP），默认为 false */
  get_all?: boolean
}

export interface BatchGetCorehrV2EmployeesBpQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface BatchGetCorehrV2EmployeesBpResponse {
  /** 员工直属 BP 信息，当员工所在部门、属地无 BP 时，会上钻找到最近的 BP */
  employment_direct_bps?: EmploymentBp[]
  /** 员工全部 BP 信息 */
  employment_all_bps?: EmploymentBp[]
}

export interface GetByDepartmentCorehrV2BpRequest {
  /** 部门 ID */
  department_id: string
}

export interface GetByDepartmentCorehrV2BpQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface GetByDepartmentCorehrV2BpResponse {
  /** 部门 HRBP 信息，依次为部门及各层级上级部门 */
  items?: DepartmentHrbp[]
}

export interface QueryCorehrV1SecurityGroupRequest {
  /** 角色列表，一次最多支持查询 50 个 */
  item_list: BpRoleOrganization[]
  /** 授权时间大于 */
  updated_at_gte?: string
  /** 授权时间小于 */
  updated_at_lte?: string
}

export interface QueryCorehrV1SecurityGroupQuery {
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface QueryCorehrV1SecurityGroupResponse {
  /** HRBP/属地 BP 信息 */
  hrbp_list?: Hrbp[]
}

export interface ListCorehrV2BpQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface SearchCorehrV1AssignedUserRequest {
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

export interface SearchCorehrV1AssignedUserQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface ListCorehrV2ProcessQuery extends Pagination {
  /** 查询流程状态列表。 */
  statuses?: number[]
  /** 查询开始时间（unix毫秒时间戳），闭区间，开始时间和结束时间跨度不能超过31天 */
  modify_time_from: string
  /** 1. 任务查询结束时间，闭区间 2. 单位：ms。从1970年1月1日(UTC/GMT的午夜) 开始经过的毫秒数 3. 注意：开始时间和结束时间跨度不能超过31天 4. 示例值：1719549169735 */
  modify_time_to: string
  /** 流程定义ID */
  flow_definition_id?: string
}

export interface GetCorehrV2ProcessQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export const enum GetCorehrV2ProcessResponseStatus {
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

export const enum GetCorehrV2ProcessResponseProperties {
  /** 普通流程 */
  Common = 1,
  /** 撤销流程 */
  CheXiao = 2,
  /** 更正流程 */
  Correct = 3,
}

export interface GetCorehrV2ProcessResponse {
  /** 流程实例ID */
  process_id?: string
  /** 流程状态 */
  status?: GetCorehrV2ProcessResponseStatus
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
  properties?: GetCorehrV2ProcessResponseProperties
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

export interface GetCorehrV2ProcessFormVariableDataQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface GetCorehrV2ProcessFormVariableDataResponse {
  /** 表单数据 */
  field_variable_values?: FieldVariableValue[]
  /** 流程实例id */
  process_id?: string
}

export interface UpdateCorehrV2ProcessRevokeRequest {
  /** 按照指定的用户ID类型传递对应的用户ID。 */
  user_id?: string
  /** 原因 */
  reason?: string
  /** true-系统身份操作 */
  system_user?: boolean
}

export interface UpdateCorehrV2ProcessRevokeQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface UpdateCorehrV2ProcessWithdrawRequest {
  /** 按照指定的用户ID类型传递对应的用户ID。 */
  user_id?: string
  /** 原因 */
  reason?: string
  /** true-系统身份操作 */
  system_user?: boolean
}

export interface UpdateCorehrV2ProcessWithdrawQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface ListCorehrV2ApproverQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 按user_id_type类型传递。如果system_approval为false，则必填。否则非必填。 */
  user_id: string
  /** 任务状态 */
  approver_status?: -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 12 | 14 | 16
}

export const enum UpdateCorehrV2ProcessApproverRequestStatus {
  /** 拒绝 */
  Approved = 2,
  /** 通过 */
  Rejected = 3,
}

export interface UpdateCorehrV2ProcessApproverRequest {
  /** 将审批任务修改为同意/拒绝 */
  status: UpdateCorehrV2ProcessApproverRequestStatus
  /** 按user_id_type类型传递。如果system_approval为false，则必填。否则非必填。 */
  user_id?: string
  /** true - 使用系统身份审批 */
  system_approval?: boolean
  /** 通过原因，长度限制为500 */
  reason?: string
  /** 表单数据 */
  field_values_v2?: ProcessFormVariableV2[]
}

export interface UpdateCorehrV2ProcessApproverQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface UpdateCorehrV2ProcessApproverResponse {
  /** 错误码，非 0 表示失败 */
  code: number
  /** 错误描述 */
  msg?: string
}

export const enum UpdateCorehrV2ProcessExtraRequestExtraType {
  /** 前加签 */
  PreExtra = 0,
  /** 并加签 */
  CurrentExtra = 1,
  /** 后加签 */
  PostExtra = 2,
}

export const enum UpdateCorehrV2ProcessExtraRequestApprovalType {
  /** 或签 */
  OR = 0,
  /** 会签 */
  AND = 1,
}

export interface UpdateCorehrV2ProcessExtraRequest {
  /** 操作人，当system_user为true时，可以不传值 */
  operator?: string
  /** 流程节点id，与approver_id二选一传入，都传以node_id为准 */
  node_id?: string
  /** 审批任务id，与node_id二选一传入，都传以node_id为准 */
  approver_id?: string
  /** 加签方式 */
  extra_type: UpdateCorehrV2ProcessExtraRequestExtraType
  /** 多人加签时的审批方式 */
  approval_type?: UpdateCorehrV2ProcessExtraRequestApprovalType
  /** 加签人员id列表 */
  extra_user_ids: string[]
  /** 备注 */
  remark?: string
  /** true-以系统身份操作 */
  system_user?: boolean
}

export interface UpdateCorehrV2ProcessExtraQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface UpdateCorehrV2ProcessTransferRequest {
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

export interface UpdateCorehrV2ProcessTransferQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'open_id' | 'union_id' | 'user_id' | 'people_corehr_id'
}

export interface MatchCorehrV1CompensationStandardQuery {
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

export interface MatchCorehrV1CompensationStandardResponse {
  /** 薪资标准表ID */
  standard_id?: string
  /** 薪资等级 */
  grade?: CpstGrade
  /** 生效时间 */
  effective_time?: string
}

export interface GetCorehrV1ProcessFormVariableDataResponse {
  /** 流程变量 */
  field_variable_values?: FormFieldVariable[]
}

export interface ListCorehrV1SubregionQuery extends Pagination {
  /** 省份/行政区id，填写后只查询该省份/行政区下的城市/区域 */
  subdivision_id?: string
}

export interface GetCorehrV1SubregionResponse {
  /** 城市/区域信息 */
  subregion?: Subregion
}

export interface ListCorehrV1SubdivisionQuery extends Pagination {
  /** 国家/地区id，填写后只查询该国家/地区下的省份/行政区 */
  country_region_id?: string
}

export interface GetCorehrV1SubdivisionResponse {
  /** 国家/地址信息 */
  subdivision?: Subdivision
}

export interface GetCorehrV1CountryRegionResponse {
  /** 国家/地址信息 */
  country_region?: CountryRegion
}

export interface GetCorehrV1CurrencyResponse {
  /** 货币信息 */
  currency?: Currency
}

export interface GetCorehrV1JobResponse {
  /** 职务信息 */
  job?: Job
}

export interface PatchCorehrV1DepartmentRequest {
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

export interface PatchCorehrV1DepartmentQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface PatchCorehrV1DepartmentResponse {
  department?: Department
}

export interface GetCorehrV1DepartmentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface GetCorehrV1DepartmentResponse {
  /** 部门信息 */
  department?: Department
}

export interface ListCorehrV1JobQuery extends Pagination {
  /** 名称 */
  name?: string
  /** 语言 */
  query_language?: string
}

export interface ListCorehrV1DepartmentQuery extends Pagination {
  /** 部门ID列表 */
  department_id_list?: string[]
  /** 部门名称列表，需精确匹配 */
  name_list?: string[]
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_corehr_department_id'
}

export interface PatchCorehrV1PersonRequest {
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

export interface PatchCorehrV1PersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface PatchCorehrV1PersonResponse {
  person?: Person
}

export interface CreateCorehrV1PersonRequest {
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

export interface CreateCorehrV1PersonQuery {
  /** 根据client_token是否一致来判断是否为同一请求 */
  client_token?: string
}

export interface CreateCorehrV1PersonResponse {
  person?: Person
}

export interface GetCorehrV1PersonQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'people_employee_id'
}

export interface GetCorehrV1PersonResponse {
  /** 个人信息 */
  person?: Person
}

export const enum SubmitCorehrV1OffboardingRequestOffboardingMode {
  /** 直接离职 */
  TerminationOfDismissal = 1,
}

export interface SubmitCorehrV1OffboardingRequest {
  /** 离职方式 */
  offboarding_mode: SubmitCorehrV1OffboardingRequestOffboardingMode
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

export interface SubmitCorehrV1OffboardingQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_corehr_id'
}

export interface SubmitCorehrV1OffboardingResponse {
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
  '/corehr/v1/custom_fields/list_object_api_name': {
    GET: { name: 'listObjectApiNameCorehrV1CustomField', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/custom_fields/query': {
    GET: 'queryCorehrV1CustomField',
  },
  '/corehr/v1/custom_fields/get_by_param': {
    GET: 'getByParamCorehrV1CustomField',
  },
  '/corehr/v1/common_data/meta_data/add_enum_option': {
    POST: 'addEnumOptionCorehrV1CommonDataMetaData',
  },
  '/corehr/v1/common_data/meta_data/edit_enum_option': {
    POST: 'editEnumOptionCorehrV1CommonDataMetaData',
  },
  '/corehr/v2/basic_info/country_regions/search': {
    POST: { name: 'searchCorehrV2BasicInfoCountryRegion', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/country_region_subdivisions/search': {
    POST: { name: 'searchCorehrV2BasicInfoCountryRegionSubdivision', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/cities/search': {
    POST: { name: 'searchCorehrV2BasicInfoCity', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/districts/search': {
    POST: { name: 'searchCorehrV2BasicInfoDistrict', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/nationalities/search': {
    POST: { name: 'searchCorehrV2BasicInfoNationality', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/national_id_types': {
    POST: 'createCorehrV1NationalIdType',
    GET: { name: 'listCorehrV1NationalIdType', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/national_id_types/{national_id_type_id}': {
    DELETE: 'deleteCorehrV1NationalIdType',
    PATCH: 'patchCorehrV1NationalIdType',
    GET: 'getCorehrV1NationalIdType',
  },
  '/corehr/v2/basic_info/banks/search': {
    POST: { name: 'searchCorehrV2BasicInfoBank', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/bank_branchs/search': {
    POST: { name: 'searchCorehrV2BasicInfoBankBranch', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/currencies/search': {
    POST: { name: 'searchCorehrV2BasicInfoCurrency', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/time_zones/search': {
    POST: { name: 'searchCorehrV2BasicInfoTimeZone', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/basic_info/languages/search': {
    POST: { name: 'searchCorehrV2BasicInfoLanguage', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/employee_types': {
    POST: 'createCorehrV1EmployeeType',
    GET: { name: 'listCorehrV1EmployeeType', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/employee_types/{employee_type_id}': {
    DELETE: 'deleteCorehrV1EmployeeType',
    PATCH: 'patchCorehrV1EmployeeType',
    GET: 'getCorehrV1EmployeeType',
  },
  '/corehr/v1/working_hours_types': {
    POST: 'createCorehrV1WorkingHoursType',
    GET: { name: 'listCorehrV1WorkingHoursType', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/working_hours_types/{working_hours_type_id}': {
    DELETE: 'deleteCorehrV1WorkingHoursType',
    PATCH: 'patchCorehrV1WorkingHoursType',
    GET: 'getCorehrV1WorkingHoursType',
  },
  '/corehr/v1/common_data/id/convert': {
    POST: 'convertCorehrV1CommonDataId',
  },
  '/corehr/v2/employees/batch_get': {
    POST: 'batchGetCorehrV2Employee',
  },
  '/corehr/v2/employees/search': {
    POST: { name: 'searchCorehrV2Employee', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/employees': {
    POST: 'createCorehrV2Employee',
  },
  '/corehr/v2/persons': {
    POST: 'createCorehrV2Person',
  },
  '/corehr/v2/persons/{person_id}': {
    PATCH: 'patchCorehrV2Person',
  },
  '/corehr/v1/persons/{person_id}': {
    DELETE: 'deleteCorehrV1Person',
    PATCH: 'patchCorehrV1Person',
    GET: 'getCorehrV1Person',
  },
  '/corehr/v1/persons/upload': {
    POST: { name: 'uploadCorehrV1Person', multipart: true },
  },
  '/corehr/v1/files/{id}': {
    GET: { name: 'getCorehrV1File', type: 'binary' },
  },
  '/corehr/v1/employments': {
    POST: 'createCorehrV1Employment',
  },
  '/corehr/v1/employments/{employment_id}': {
    PATCH: 'patchCorehrV1Employment',
    DELETE: 'deleteCorehrV1Employment',
  },
  '/corehr/v1/job_datas': {
    POST: 'createCorehrV1JobData',
    GET: { name: 'listCorehrV1JobData', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/job_datas/{job_data_id}': {
    DELETE: 'deleteCorehrV1JobData',
    PATCH: 'patchCorehrV1JobData',
    GET: 'getCorehrV1JobData',
  },
  '/corehr/v2/employees/job_datas/query': {
    POST: { name: 'queryCorehrV2EmployeesJobData', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/employees/job_datas/batch_get': {
    POST: 'batchGetCorehrV2EmployeesJobData',
  },
  '/corehr/v2/employees/additional_jobs': {
    POST: 'createCorehrV2EmployeesAdditionalJob',
  },
  '/corehr/v2/employees/additional_jobs/{additional_job_id}': {
    PATCH: 'patchCorehrV2EmployeesAdditionalJob',
    DELETE: 'deleteCorehrV2EmployeesAdditionalJob',
  },
  '/corehr/v2/employees/additional_jobs/batch': {
    POST: { name: 'batchCorehrV2EmployeesAdditionalJob', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/departments/query_operation_logs': {
    POST: { name: 'queryOperationLogsCorehrV2Department', pagination: { argIndex: 1, itemsKey: 'op_logs', tokenKey: 'next_page_token' } },
  },
  '/corehr/v1/departments': {
    POST: 'createCorehrV1Department',
    GET: { name: 'listCorehrV1Department', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/departments/{department_id}': {
    PATCH: 'patchCorehrV2Department',
    DELETE: 'deleteCorehrV2Department',
  },
  '/corehr/v2/departments/parents': {
    POST: 'parentsCorehrV2Department',
  },
  '/corehr/v2/departments/batch_get': {
    POST: 'batchGetCorehrV2Department',
  },
  '/corehr/v2/departments/query_recent_change': {
    GET: 'queryRecentChangeCorehrV2Department',
  },
  '/corehr/v2/departments/query_timeline': {
    POST: 'queryTimelineCorehrV2Department',
  },
  '/corehr/v2/departments/tree': {
    POST: { name: 'treeCorehrV2Department', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/departments/query_multi_timeline': {
    POST: { name: 'queryMultiTimelineCorehrV2Department', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/departments/search': {
    POST: { name: 'searchCorehrV2Department', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/locations': {
    POST: 'createCorehrV1Location',
    GET: { name: 'listCorehrV1Location', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/locations/{location_id}': {
    PATCH: 'patchCorehrV2Location',
  },
  '/corehr/v1/locations/{location_id}': {
    GET: 'getCorehrV1Location',
    DELETE: 'deleteCorehrV1Location',
  },
  '/corehr/v2/locations/query_recent_change': {
    GET: 'queryRecentChangeCorehrV2Location',
  },
  '/corehr/v2/locations/batch_get': {
    POST: 'batchGetCorehrV2Location',
  },
  '/corehr/v2/locations/active': {
    POST: 'activeCorehrV2Location',
  },
  '/corehr/v2/locations/{location_id}/addresses/{address_id}': {
    DELETE: 'deleteCorehrV2LocationAddress',
    PATCH: 'patchCorehrV2LocationAddress',
  },
  '/corehr/v2/locations/{location_id}/addresses': {
    POST: 'createCorehrV2LocationAddress',
  },
  '/corehr/v1/companies': {
    POST: 'createCorehrV1Company',
    GET: { name: 'listCorehrV1Company', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/companies/{company_id}': {
    PATCH: 'patchCorehrV1Company',
    GET: 'getCorehrV1Company',
    DELETE: 'deleteCorehrV1Company',
  },
  '/corehr/v2/companies/active': {
    POST: 'activeCorehrV2Company',
  },
  '/corehr/v2/companies/query_recent_change': {
    GET: 'queryRecentChangeCorehrV2Company',
  },
  '/corehr/v2/companies/batch_get': {
    POST: 'batchGetCorehrV2Company',
  },
  '/corehr/v2/cost_centers': {
    POST: 'createCorehrV2CostCenter',
  },
  '/corehr/v2/cost_centers/{cost_center_id}': {
    PATCH: 'patchCorehrV2CostCenter',
    DELETE: 'deleteCorehrV2CostCenter',
  },
  '/corehr/v2/cost_centers/query_recent_change': {
    GET: 'queryRecentChangeCorehrV2CostCenter',
  },
  '/corehr/v2/cost_centers/search': {
    POST: { name: 'searchCorehrV2CostCenter', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/cost_centers/{cost_center_id}/versions': {
    POST: 'createCorehrV2CostCenterVersion',
  },
  '/corehr/v2/cost_centers/{cost_center_id}/versions/{version_id}': {
    PATCH: 'patchCorehrV2CostCenterVersion',
    DELETE: 'deleteCorehrV2CostCenterVersion',
  },
  '/corehr/v2/approval_groups/{process_id}': {
    GET: 'getCorehrV2ApprovalGroups',
  },
  '/corehr/v2/approval_groups/open_query_department_change_list_by_ids': {
    POST: 'openQueryDepartmentChangeListByIdsCorehrV2ApprovalGroups',
  },
  '/corehr/v2/approval_groups/open_query_job_change_list_by_ids': {
    POST: 'openQueryJobChangeListByIdsCorehrV2ApprovalGroups',
  },
  '/corehr/v1/job_families': {
    POST: 'createCorehrV1JobFamily',
    GET: { name: 'listCorehrV1JobFamily', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/job_families/{job_family_id}': {
    PATCH: 'patchCorehrV1JobFamily',
    GET: 'getCorehrV1JobFamily',
    DELETE: 'deleteCorehrV1JobFamily',
  },
  '/corehr/v2/job_families/query_recent_change': {
    GET: 'queryRecentChangeCorehrV2JobFamily',
  },
  '/corehr/v2/job_families/batch_get': {
    POST: 'batchGetCorehrV2JobFamily',
  },
  '/corehr/v1/job_levels': {
    POST: 'createCorehrV1JobLevel',
    GET: { name: 'listCorehrV1JobLevel', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/job_levels/{job_level_id}': {
    PATCH: 'patchCorehrV1JobLevel',
    GET: 'getCorehrV1JobLevel',
    DELETE: 'deleteCorehrV1JobLevel',
  },
  '/corehr/v2/job_levels/query_recent_change': {
    GET: 'queryRecentChangeCorehrV2JobLevel',
  },
  '/corehr/v2/job_levels/batch_get': {
    POST: 'batchGetCorehrV2JobLevel',
  },
  '/corehr/v2/job_grades': {
    POST: 'createCorehrV2JobGrade',
  },
  '/corehr/v2/job_grades/{job_grade_id}': {
    PATCH: 'patchCorehrV2JobGrade',
    DELETE: 'deleteCorehrV2JobGrade',
  },
  '/corehr/v2/job_grades/query': {
    POST: { name: 'queryCorehrV2JobGrade', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/job_grades/query_recent_change': {
    GET: 'queryRecentChangeCorehrV2JobGrade',
  },
  '/corehr/v1/jobs': {
    POST: 'createCorehrV1Job',
    GET: { name: 'listCorehrV1Job', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/jobs/{job_id}': {
    DELETE: 'deleteCorehrV1Job',
    PATCH: 'patchCorehrV1Job',
    GET: 'getCorehrV1Job',
  },
  '/corehr/v2/jobs/{job_id}': {
    GET: 'getCorehrV2Job',
  },
  '/corehr/v2/jobs': {
    GET: { name: 'listCorehrV2Job', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/pre_hires/withdraw_onboarding': {
    POST: 'withdrawOnboardingCorehrV2PreHire',
  },
  '/corehr/v2/pre_hires/restore_flow_instance': {
    POST: 'restoreFlowInstanceCorehrV2PreHire',
  },
  '/corehr/v2/pre_hires': {
    POST: 'createCorehrV2PreHire',
  },
  '/corehr/v2/pre_hires/{pre_hire_id}': {
    PATCH: 'patchCorehrV2PreHire',
    DELETE: 'deleteCorehrV2PreHire',
  },
  '/corehr/v2/pre_hires/query': {
    POST: { name: 'queryCorehrV2PreHire', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/pre_hires/{pre_hire_id}': {
    GET: 'getCorehrV1PreHire',
    DELETE: 'deleteCorehrV1PreHire',
    PATCH: 'patchCorehrV1PreHire',
  },
  '/corehr/v1/pre_hires': {
    GET: { name: 'listCorehrV1PreHire', pagination: { argIndex: 0 } },
  },
  '/corehr/v2/pre_hires/search': {
    POST: { name: 'searchCorehrV2PreHire', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/pre_hires/{pre_hire_id}/transit_task': {
    POST: 'transitTaskCorehrV2PreHire',
  },
  '/corehr/v2/pre_hires/{pre_hire_id}/complete': {
    POST: 'completeCorehrV2PreHire',
  },
  '/corehr/v2/probation/assessments': {
    POST: 'createCorehrV2ProbationAssessment',
  },
  '/corehr/v2/probation/enable_disable_assessment': {
    POST: 'enableDisableAssessmentCorehrV2Probation',
  },
  '/corehr/v2/probation/assessments/{assessment_id}': {
    PATCH: 'patchCorehrV2ProbationAssessment',
    DELETE: 'deleteCorehrV2ProbationAssessment',
  },
  '/corehr/v2/probation/search': {
    POST: { name: 'searchCorehrV2Probation', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/probation/submit': {
    POST: 'submitCorehrV2Probation',
  },
  '/corehr/v2/probation/withdraw': {
    POST: 'withdrawCorehrV2Probation',
  },
  '/corehr/v2/job_changes': {
    POST: 'createCorehrV2JobChange',
  },
  '/corehr/v1/transfer_types/query': {
    GET: 'queryCorehrV1TransferType',
  },
  '/corehr/v1/transfer_reasons/query': {
    GET: 'queryCorehrV1TransferReason',
  },
  '/corehr/v2/job_changes/search': {
    POST: { name: 'searchCorehrV2JobChange', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/job_changes/{job_change_id}/revoke': {
    POST: 'revokeCorehrV2JobChange',
  },
  '/corehr/v1/job_changes': {
    POST: 'createCorehrV1JobChange',
  },
  '/corehr/v1/offboardings/query': {
    POST: 'queryCorehrV1Offboarding',
  },
  '/corehr/v2/offboardings/submit_v2': {
    POST: 'submitV2CorehrV2Offboarding',
  },
  '/corehr/v2/offboardings/edit': {
    POST: 'editCorehrV2Offboarding',
  },
  '/corehr/v2/offboardings/revoke': {
    POST: 'revokeCorehrV2Offboarding',
  },
  '/corehr/v1/offboardings/search': {
    POST: { name: 'searchCorehrV1Offboarding', pagination: { argIndex: 1 } },
  },
  '/corehr/v1/contracts': {
    POST: 'createCorehrV1Contract',
    GET: { name: 'listCorehrV1Contract', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/contracts/{contract_id}': {
    PATCH: 'patchCorehrV1Contract',
    DELETE: 'deleteCorehrV1Contract',
    GET: 'getCorehrV1Contract',
  },
  '/corehr/v2/contracts/search': {
    POST: { name: 'searchCorehrV2Contract', pagination: { argIndex: 1 } },
  },
  '/corehr/v2/workforce_plan_detail_row/batchSave': {
    POST: 'batchSaveCorehrV2WorkforcePlanDetailRow',
  },
  '/corehr/v2/workforce_plan_detail_row/batchDelete': {
    POST: 'batchDeleteCorehrV2WorkforcePlanDetailRow',
  },
  '/corehr/v2/report_detail_row/batchSave': {
    POST: 'batchSaveCorehrV2ReportDetailRow',
  },
  '/corehr/v2/report_detail_row/batchDelete': {
    POST: 'batchDeleteCorehrV2ReportDetailRow',
  },
  '/corehr/v2/workforce_plans': {
    GET: 'listCorehrV2WorkforcePlan',
  },
  '/corehr/v2/workforce_plan_details/batch': {
    POST: 'batchCorehrV2WorkforcePlanDetail',
  },
  '/corehr/v1/leave_granting_records': {
    POST: 'createCorehrV1LeaveGrantingRecord',
  },
  '/corehr/v1/leave_granting_records/{leave_granting_record_id}': {
    DELETE: 'deleteCorehrV1LeaveGrantingRecord',
  },
  '/corehr/v1/leaves/leave_types': {
    GET: { name: 'leaveTypesCorehrV1Leave', pagination: { argIndex: 0, itemsKey: 'leave_type_list' } },
  },
  '/corehr/v1/leaves/leave_balances': {
    GET: { name: 'leaveBalancesCorehrV1Leave', pagination: { argIndex: 0, itemsKey: 'employment_leave_balance_list' } },
  },
  '/corehr/v1/leaves/leave_request_history': {
    GET: { name: 'leaveRequestHistoryCorehrV1Leave', pagination: { argIndex: 0, itemsKey: 'leave_request_list' } },
  },
  '/corehr/v1/leaves/work_calendar': {
    POST: 'workCalendarCorehrV1Leave',
  },
  '/corehr/v1/leaves/calendar_by_scope': {
    GET: 'calendarByScopeCorehrV1Leave',
  },
  '/corehr/v1/leaves/work_calendar_date': {
    POST: 'workCalendarDateCorehrV1Leave',
  },
  '/corehr/v1/authorizations/query': {
    GET: { name: 'queryCorehrV1Authorization', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/authorizations/get_by_param': {
    GET: 'getByParamCorehrV1Authorization',
  },
  '/corehr/v1/security_groups': {
    GET: { name: 'listCorehrV1SecurityGroup', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/authorizations/add_role_assign': {
    POST: 'addRoleAssignCorehrV1Authorization',
  },
  '/corehr/v1/authorizations/update_role_assign': {
    POST: 'updateRoleAssignCorehrV1Authorization',
  },
  '/corehr/v1/authorizations/remove_role_assign': {
    POST: 'removeRoleAssignCorehrV1Authorization',
  },
  '/corehr/v2/employees/bps/batch_get': {
    POST: 'batchGetCorehrV2EmployeesBp',
  },
  '/corehr/v2/bps/get_by_department': {
    POST: 'getByDepartmentCorehrV2Bp',
  },
  '/corehr/v1/security_groups/query': {
    POST: 'queryCorehrV1SecurityGroup',
  },
  '/corehr/v2/bps': {
    GET: { name: 'listCorehrV2Bp', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/assigned_users/search': {
    POST: 'searchCorehrV1AssignedUser',
  },
  '/corehr/v2/processes': {
    GET: { name: 'listCorehrV2Process', pagination: { argIndex: 0, itemsKey: 'process_ids' } },
  },
  '/corehr/v2/processes/{process_id}': {
    GET: 'getCorehrV2Process',
  },
  '/corehr/v2/processes/{process_id}/form_variable_data': {
    GET: 'getCorehrV2ProcessFormVariableData',
  },
  '/corehr/v2/process_revoke/{process_id}': {
    PUT: 'updateCorehrV2ProcessRevoke',
  },
  '/corehr/v2/process_withdraw/{process_id}': {
    PUT: 'updateCorehrV2ProcessWithdraw',
  },
  '/corehr/v2/approvers': {
    GET: { name: 'listCorehrV2Approver', pagination: { argIndex: 0, itemsKey: 'approver_list' } },
  },
  '/corehr/v2/processes/{process_id}/approvers/{approver_id}': {
    PUT: 'updateCorehrV2ProcessApprover',
  },
  '/corehr/v2/processes/{process_id}/extra': {
    PUT: 'updateCorehrV2ProcessExtra',
  },
  '/corehr/v2/processes/{process_id}/transfer': {
    PUT: 'updateCorehrV2ProcessTransfer',
  },
  '/corehr/v1/compensation_standards/match': {
    GET: 'matchCorehrV1CompensationStandard',
  },
  '/corehr/v1/processes/{process_id}/form_variable_data': {
    GET: 'getCorehrV1ProcessFormVariableData',
  },
  '/corehr/v1/subregions': {
    GET: { name: 'listCorehrV1Subregion', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/subregions/{subregion_id}': {
    GET: 'getCorehrV1Subregion',
  },
  '/corehr/v1/subdivisions': {
    GET: { name: 'listCorehrV1Subdivision', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/subdivisions/{subdivision_id}': {
    GET: 'getCorehrV1Subdivision',
  },
  '/corehr/v1/country_regions': {
    GET: { name: 'listCorehrV1CountryRegion', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/country_regions/{country_region_id}': {
    GET: 'getCorehrV1CountryRegion',
  },
  '/corehr/v1/currencies': {
    GET: { name: 'listCorehrV1Currency', pagination: { argIndex: 0 } },
  },
  '/corehr/v1/currencies/{currency_id}': {
    GET: 'getCorehrV1Currency',
  },
  '/corehr/v1/departments/{department_id}': {
    DELETE: 'deleteCorehrV1Department',
    PATCH: 'patchCorehrV1Department',
    GET: 'getCorehrV1Department',
  },
  '/corehr/v1/persons': {
    POST: 'createCorehrV1Person',
  },
  '/corehr/v1/offboardings/submit': {
    POST: 'submitCorehrV1Offboarding',
  },
})
