import { Account, Agency, AgencyAccount, AgencyProtection, AgencySupplier, Application, ApplicationDetailInfo, ApplicationOffer, Attachment, AttachmentInfo, BackgroundCheckOrder, BonusAmount, CheckFailedAccountInfo, CombinedJobObjectValueMap, CombinedJobResultDefaultJobPost, CommonFilter, CommonSchema, CompositeTalentAwardInfo, CompositeTalentBasicInfo, CompositeTalentCareerInfo, CompositeTalentCustomizedData, CompositeTalentEducationInfo, CompositeTalentInternshipInfo, CompositeTalentLanguageInfo, CompositeTalentProjectInfo, CompositeTalentSnsInfo, CompositeTalentWorksInfo, DiInfo, EcoAccountCustomFieldData, EcoBackgroundCheckCustomFieldData, EcoBackgroundCheckPackageAdditionalItem, EcoBackgroundCheckPackageData, EcoBackgroundCheckReportFile, EcoExamLoginInfo, EcoExamPaperData, EcoExamResultDetail, EcoExamResultReport, Employee, EmployeeConversionInfo, EmployeeOverboardInfo, Evaluation, EvaluationTask, ExamMarkingTask, ExternalApplication, ExternalBackgroundCheck, ExternalInterview, ExternalInterviewAssessment, ExternalInterviewAssessmentDimension, ExternalOffer, I18n, InternOfferOffboardingInfo, InternOfferOnboardingInfo, Interview, InterviewAppointmentConfig, InterviewExtend, InterviewFeedbackForm, InterviewRecord, InterviewRegistrationSchema, InterviewRoundType, InterviewTask, Interviewer, Job, JobConfigInterviewRoundConf, JobConfigResult, JobConfigRoundType, JobDetail, JobFunction, JobManager, JobProcesses, JobRecruiter2, JobRequirementCustomizedData, JobRequirementDto, JobRequirementSchema, JobRequirementUpdateOption, JobSchema, JobTypeInfo, Location, LocationDto, MentionEntity, Minutes, Mobile, Note, Offer, OfferApplyForm, OfferApplyFormInfo, OfferBasicInfo, OfferCustomFieldConfig, OfferCustomizedInfo, OfferListInfo, OfferSalaryInfo, OfferSchemaDetail, PortalJobPost, Questionnaire, Referral, ReferralInfo, RegistrationBasicInfo, RegistrationSchema, RegistrationSchemaInfo, ResumeSource, Role, RoleDetail, Subject, Talent, TalentBatchInfo, TalentBlock, TalentCombinedAwardInfo, TalentCombinedBasicInfo, TalentCombinedCareerInfo, TalentCombinedEducationInfo, TalentCombinedLanguageInfo, TalentCombinedProjectInfo, TalentCombinedSnsInfo, TalentCombinedWorkInfo, TalentCustomizedDataObjectValue, TalentExternalInfo, TalentFolder, TalentFolderForList, TalentInterview, TalentInterviewRegistrationSimple, TalentNote, TalentOperationLog, TalentPool, TalentResumeAttachment, TalentResumeSource, TalentSelfEvaluation, TalentSimilar, TalentTag, TargetMajorInfo, TerminationReason, Test, Todo, TradeDetail, TripartiteAgreementInfo, UserRole, Website, WebsiteChannelInfo, WebsiteDeliveryAttachmentIndentification, WebsiteDeliveryDto, WebsiteDeliveryResume, WebsiteJobPost, WebsiteUser } from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 查询地点列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/location/query
     */
    queryHireLocation(body: QueryHireLocationRequest, query?: QueryHireLocationQuery): Promise<Paginated<LocationDto>>
    /**
     * 获取地址列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/location/list
     */
    listHireLocation(query?: ListHireLocationQuery): Promise<Paginated<Location>>
    /**
     * 获取角色详情
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/role/get
     */
    getHireRole(role_id: string): Promise<GetHireRoleResponse>
    /**
     * 获取角色列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/role/list
     */
    listHireRole(query?: ListHireRoleQuery): Promise<Paginated<Role>>
    /**
     * 获取用户角色列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/user_role/list
     */
    listHireUserRole(query?: ListHireUserRoleQuery): Promise<Paginated<UserRole>>
    /**
     * 新建职位
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_create
     */
    combinedCreateHireJob(body: CombinedCreateHireJobRequest, query?: CombinedCreateHireJobQuery): Promise<CombinedCreateHireJobResponse>
    /**
     * 更新职位
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_update
     */
    combinedUpdateHireJob(job_id: string, body: CombinedUpdateHireJobRequest, query?: CombinedUpdateHireJobQuery): Promise<CombinedUpdateHireJobResponse>
    /**
     * 更新职位设置
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/update_config
     */
    updateConfigHireJob(job_id: string, body: UpdateConfigHireJobRequest, query?: UpdateConfigHireJobQuery): Promise<UpdateConfigHireJobResponse>
    /**
     * 更新职位相关人员
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/batch_update
     */
    batchUpdateHireJobManager(job_id: string, body: BatchUpdateHireJobManagerRequest, query?: BatchUpdateHireJobManagerQuery): Promise<BatchUpdateHireJobManagerResponse>
    /**
     * 获取职位详情
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get_detail
     */
    getDetailHireJob(job_id: string, query?: GetDetailHireJobQuery): Promise<GetDetailHireJobResponse>
    /**
     * 获取职位信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get
     */
    getHireJob(job_id: string, query?: GetHireJobQuery): Promise<GetHireJobResponse>
    /**
     * 获取职位上的招聘人员信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/recruiter
     */
    recruiterHireJob(job_id: string, query?: RecruiterHireJobQuery): Promise<RecruiterHireJobResponse>
    /**
     * 获取职位设置
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/config
     */
    configHireJob(job_id: string, query?: ConfigHireJobQuery): Promise<ConfigHireJobResponse>
    /**
     * 获取职位列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/list
     */
    listHireJob(query?: ListHireJobQuery): Promise<Paginated<Job>>
    /**
     * 关闭职位
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/close
     */
    closeHireJob(job_id: string): Promise<void>
    /**
     * 重启职位
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/open
     */
    openHireJob(job_id: string, body: OpenHireJobRequest): Promise<void>
    /**
     * 获取职位模板
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_schema/list
     */
    listHireJobSchema(query?: ListHireJobSchemaQuery): Promise<Paginated<JobSchema>>
    /**
     * 发布职位广告
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/advertisement/publish
     */
    publishHireAdvertisement(advertisement_id: string, body: PublishHireAdvertisementRequest): Promise<void>
    /**
     * 获取职位广告发布记录
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_publish_record/search
     */
    searchHireJobPublishRecord(body: SearchHireJobPublishRecordRequest, query?: SearchHireJobPublishRecordQuery): Promise<Paginated<WebsiteJobPost>>
    /**
     * 获取职能分类列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_function/list
     */
    listHireJobFunction(query?: ListHireJobFunctionQuery): Promise<Paginated<JobFunction>>
    /**
     * 获取职位类别列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_type/list
     */
    listHireJobType(query?: ListHireJobTypeQuery): Promise<Paginated<JobTypeInfo>>
    /**
     * 创建招聘需求
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/create
     */
    createHireJobRequirement(body: CreateHireJobRequirementRequest, query?: CreateHireJobRequirementQuery): Promise<CreateHireJobRequirementResponse>
    /**
     * 更新招聘需求
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/update
     */
    updateHireJobRequirement(job_requirement_id: string, body: UpdateHireJobRequirementRequest, query?: UpdateHireJobRequirementQuery): Promise<void>
    /**
     * 获取招聘需求信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list_by_id
     */
    listByIdHireJobRequirement(body: ListByIdHireJobRequirementRequest, query?: ListByIdHireJobRequirementQuery): Promise<ListByIdHireJobRequirementResponse>
    /**
     * 获取招聘需求列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list
     */
    listHireJobRequirement(query?: ListHireJobRequirementQuery): Promise<Paginated<JobRequirementDto>>
    /**
     * 删除招聘需求
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/delete
     */
    deleteHireJobRequirement(job_requirement_id: string): Promise<void>
    /**
     * 获取招聘需求模板列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement_schema/list
     */
    listHireJobRequirementSchema(query?: ListHireJobRequirementSchemaQuery): Promise<Paginated<JobRequirementSchema>>
    /**
     * 获取招聘流程信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_process/list
     */
    listHireJobProcess(query?: ListHireJobProcessQuery): Promise<Paginated<JobProcesses>>
    /**
     * 获取项目列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/subject/list
     */
    listHireSubject(query?: ListHireSubjectQuery): Promise<Paginated<Subject>>
    /**
     * 获取人才标签信息列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_tag/list
     */
    listHireTalentTag(query?: ListHireTalentTagQuery): Promise<Paginated<TalentTag>>
    /**
     * 获取信息登记表列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/registration_schema/list
     */
    listHireRegistrationSchema(query?: ListHireRegistrationSchemaQuery): Promise<Paginated<RegistrationSchema>>
    /**
     * 获取面试评价表列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_feedback_form/list
     */
    listHireInterviewFeedbackForm(query?: ListHireInterviewFeedbackFormQuery): Promise<Paginated<InterviewFeedbackForm>>
    /**
     * 获取面试轮次类型列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_round_type/list
     */
    listHireInterviewRoundType(query?: ListHireInterviewRoundTypeQuery): Promise<ListHireInterviewRoundTypeResponse>
    /**
     * 获取面试登记表列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_registration_schema/list
     */
    listHireInterviewRegistrationSchema(query?: ListHireInterviewRegistrationSchemaQuery): Promise<Paginated<InterviewRegistrationSchema>>
    /**
     * 查询面试官信息列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interviewer/list
     */
    listHireInterviewer(query?: ListHireInterviewerQuery): Promise<Paginated<Interviewer>>
    /**
     * 更新面试官信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interviewer/patch
     */
    patchHireInterviewer(interviewer_id: string, body: PatchHireInterviewerRequest, query?: PatchHireInterviewerQuery): Promise<PatchHireInterviewerResponse>
    /**
     * 更新 Offer 申请表自定义字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_custom_field/update
     */
    updateHireOfferCustomField(offer_custom_field_id: string, body: UpdateHireOfferCustomFieldRequest): Promise<void>
    /**
     * 获取 Offer 申请表信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_application_form/get
     */
    getHireOfferApplicationForm(offer_application_form_id: string): Promise<GetHireOfferApplicationFormResponse>
    /**
     * 获取 Offer 申请表列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_application_form/list
     */
    listHireOfferApplicationForm(query?: ListHireOfferApplicationFormQuery): Promise<Paginated<OfferApplyForm>>
    /**
     * 查询人才内推信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/search
     */
    searchHireReferral(body: SearchHireReferralRequest, query?: SearchHireReferralQuery): Promise<SearchHireReferralResponse>
    /**
     * 获取内推官网下职位广告列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/list
     */
    listHireReferralWebsiteJobPost(query?: ListHireReferralWebsiteJobPostQuery): Promise<Paginated<PortalJobPost>>
    /**
     * 获取内推官网下职位广告详情
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/get
     */
    getHireReferralWebsiteJobPost(job_post_id: string, query?: GetHireReferralWebsiteJobPostQuery): Promise<GetHireReferralWebsiteJobPostResponse>
    /**
     * 获取内推信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/get_by_application
     */
    getByApplicationHireReferral(query?: GetByApplicationHireReferralQuery): Promise<GetByApplicationHireReferralResponse>
    /**
     * 新建招聘官网推广渠道
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/create
     */
    createHireWebsiteChannel(website_id: string, body: CreateHireWebsiteChannelRequest): Promise<CreateHireWebsiteChannelResponse>
    /**
     * 删除招聘官网推广渠道
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/delete
     */
    deleteHireWebsiteChannel(website_id: string, channel_id: string): Promise<void>
    /**
     * 更新招聘官网推广渠道
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/update
     */
    updateHireWebsiteChannel(website_id: string, channel_id: string, body: UpdateHireWebsiteChannelRequest): Promise<UpdateHireWebsiteChannelResponse>
    /**
     * 获取招聘官网推广渠道列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/list
     */
    listHireWebsiteChannel(website_id: string, query?: ListHireWebsiteChannelQuery): Promise<Paginated<WebsiteChannelInfo, 'website_channel_list'>>
    /**
     * 新建招聘官网用户
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-site_user/create
     */
    createHireWebsiteSiteUser(website_id: string, body: CreateHireWebsiteSiteUserRequest): Promise<CreateHireWebsiteSiteUserResponse>
    /**
     * 获取招聘官网下职位广告详情
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/get
     */
    getHireWebsiteJobPost(website_id: string, job_post_id: string, query?: GetHireWebsiteJobPostQuery): Promise<GetHireWebsiteJobPostResponse>
    /**
     * 搜索招聘官网下的职位广告列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/search
     */
    searchHireWebsiteJobPost(website_id: string, body: SearchHireWebsiteJobPostRequest, query?: SearchHireWebsiteJobPostQuery): Promise<Paginated<WebsiteJobPost>>
    /**
     * 获取招聘官网下的职位广告列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/list
     */
    listHireWebsiteJobPost(website_id: string, query?: ListHireWebsiteJobPostQuery): Promise<Paginated<WebsiteJobPost>>
    /**
     * 新建招聘官网投递
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery/create_by_resume
     */
    createByResumeHireWebsiteDelivery(website_id: string, body: CreateByResumeHireWebsiteDeliveryRequest, query?: CreateByResumeHireWebsiteDeliveryQuery): Promise<CreateByResumeHireWebsiteDeliveryResponse>
    /**
     * 根据简历附件创建招聘官网投递任务
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery/create_by_attachment
     */
    createByAttachmentHireWebsiteDelivery(website_id: string, body: CreateByAttachmentHireWebsiteDeliveryRequest): Promise<CreateByAttachmentHireWebsiteDeliveryResponse>
    /**
     * 获取招聘官网投递任务结果
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery_task/get
     */
    getHireWebsiteDeliveryTask(website_id: string, delivery_task_id: string): Promise<GetHireWebsiteDeliveryTaskResponse>
    /**
     * 获取招聘官网列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website/list
     */
    listHireWebsite(query?: ListHireWebsiteQuery): Promise<Paginated<Website>>
    /**
     * 设置猎头保护期
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/protect
     */
    protectHireAgency(body: ProtectHireAgencyRequest, query?: ProtectHireAgencyQuery): Promise<void>
    /**
     * 获取猎头供应商信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/get
     */
    getHireAgency(agency_id: string, query?: GetHireAgencyQuery): Promise<GetHireAgencyResponse>
    /**
     * 查询猎头保护期信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/protect_search
     */
    protectSearchHireAgency(body: ProtectSearchHireAgencyRequest): Promise<ProtectSearchHireAgencyResponse>
    /**
     * 查询猎头供应商信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/query
     */
    queryHireAgency(query?: QueryHireAgencyQuery): Promise<QueryHireAgencyResponse>
    /**
     * 查询猎头供应商下猎头列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/get_agency_account
     */
    getAgencyAccountHireAgency(body: GetAgencyAccountHireAgencyRequest, query?: GetAgencyAccountHireAgencyQuery): Promise<Paginated<AgencyAccount>>
    /**
     * 搜索猎头供应商列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/batch_query
     */
    batchQueryHireAgency(body: BatchQueryHireAgencyRequest, query?: BatchQueryHireAgencyQuery): Promise<Paginated<AgencySupplier>>
    /**
     * 禁用/取消禁用猎头
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/operate_agency_account
     */
    operateAgencyAccountHireAgency(body: OperateAgencyAccountHireAgencyRequest): Promise<void>
    /**
     * 创建人才外部信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent-external_info/create
     */
    createHireTalentExternalInfo(talent_id: string, body: CreateHireTalentExternalInfoRequest): Promise<CreateHireTalentExternalInfoResponse>
    /**
     * 更新人才外部信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent-external_info/update
     */
    updateHireTalentExternalInfo(talent_id: string, body: UpdateHireTalentExternalInfoRequest): Promise<UpdateHireTalentExternalInfoResponse>
    /**
     * 创建外部投递
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/create
     */
    createHireExternalApplication(body: CreateHireExternalApplicationRequest): Promise<CreateHireExternalApplicationResponse>
    /**
     * 更新外部投递
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/update
     */
    updateHireExternalApplication(external_application_id: string, body: UpdateHireExternalApplicationRequest): Promise<UpdateHireExternalApplicationResponse>
    /**
     * 查询外部投递列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/list
     */
    listHireExternalApplication(query?: ListHireExternalApplicationQuery): Promise<Paginated<ExternalApplication>>
    /**
     * 删除外部投递
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/delete
     */
    deleteHireExternalApplication(external_application_id: string, query?: DeleteHireExternalApplicationQuery): Promise<DeleteHireExternalApplicationResponse>
    /**
     * 创建外部面试
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/create
     */
    createHireExternalInterview(body: CreateHireExternalInterviewRequest): Promise<CreateHireExternalInterviewResponse>
    /**
     * 更新外部面试
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/update
     */
    updateHireExternalInterview(external_interview_id: string, body: UpdateHireExternalInterviewRequest): Promise<UpdateHireExternalInterviewResponse>
    /**
     * 查询外部面试列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/batch_query
     */
    batchQueryHireExternalInterview(body: BatchQueryHireExternalInterviewRequest, query?: BatchQueryHireExternalInterviewQuery): Promise<Paginated<ExternalInterview>>
    /**
     * 删除外部面试
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/delete
     */
    deleteHireExternalInterview(external_interview_id: string): Promise<void>
    /**
     * 创建外部面评
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/create
     */
    createHireExternalInterviewAssessment(body: CreateHireExternalInterviewAssessmentRequest): Promise<CreateHireExternalInterviewAssessmentResponse>
    /**
     * 更新外部面评
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/patch
     */
    patchHireExternalInterviewAssessment(external_interview_assessment_id: string, body: PatchHireExternalInterviewAssessmentRequest): Promise<PatchHireExternalInterviewAssessmentResponse>
    /**
     * 创建外部 Offer
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/create
     */
    createHireExternalOffer(body: CreateHireExternalOfferRequest): Promise<CreateHireExternalOfferResponse>
    /**
     * 更新外部 Offer
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/update
     */
    updateHireExternalOffer(external_offer_id: string, body: UpdateHireExternalOfferRequest): Promise<UpdateHireExternalOfferResponse>
    /**
     * 查询外部 Offer 列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/batch_query
     */
    batchQueryHireExternalOffer(body: BatchQueryHireExternalOfferRequest, query?: BatchQueryHireExternalOfferQuery): Promise<Paginated<ExternalOffer>>
    /**
     * 删除外部 Offer
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/delete
     */
    deleteHireExternalOffer(external_offer_id: string): Promise<void>
    /**
     * 创建外部背调
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/create
     */
    createHireExternalBackgroundCheck(body: CreateHireExternalBackgroundCheckRequest): Promise<CreateHireExternalBackgroundCheckResponse>
    /**
     * 更新外部背调
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/update
     */
    updateHireExternalBackgroundCheck(external_background_check_id: string, body: UpdateHireExternalBackgroundCheckRequest): Promise<UpdateHireExternalBackgroundCheckResponse>
    /**
     * 查询外部背调列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/batch_query
     */
    batchQueryHireExternalBackgroundCheck(body: BatchQueryHireExternalBackgroundCheckRequest, query?: BatchQueryHireExternalBackgroundCheckQuery): Promise<Paginated<ExternalBackgroundCheck>>
    /**
     * 删除外部背调
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/delete
     */
    deleteHireExternalBackgroundCheck(external_background_check_id: string): Promise<void>
    /**
     * 导入外部内推奖励
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_referral_reward/create
     */
    createHireExternalReferralReward(body: CreateHireExternalReferralRewardRequest, query?: CreateHireExternalReferralRewardQuery): Promise<CreateHireExternalReferralRewardResponse>
    /**
     * 删除外部内推奖励
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_referral_reward/delete
     */
    deleteHireExternalReferralReward(external_referral_reward_id: string): Promise<void>
    /**
     * 批量加入/移除人才库中人才
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/batch_change_talent_pool
     */
    batchChangeTalentPoolHireTalentPool(talent_pool_id: string, body: BatchChangeTalentPoolHireTalentPoolRequest): Promise<void>
    /**
     * 获取人才库列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/search
     */
    searchHireTalentPool(query?: SearchHireTalentPoolQuery): Promise<Paginated<TalentPool>>
    /**
     * 将人才加入人才库
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/move_talent
     */
    moveTalentHireTalentPool(talent_pool_id: string, body: MoveTalentHireTalentPoolRequest): Promise<MoveTalentHireTalentPoolResponse>
    /**
     * 操作人才标签
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/tag
     */
    tagHireTalent(talent_id: string, body: TagHireTalentRequest): Promise<void>
    /**
     * 创建人才
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/combined_create
     */
    combinedCreateHireTalent(body: CombinedCreateHireTalentRequest, query?: CombinedCreateHireTalentQuery): Promise<CombinedCreateHireTalentResponse>
    /**
     * 更新人才
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/combined_update
     */
    combinedUpdateHireTalent(body: CombinedUpdateHireTalentRequest, query?: CombinedUpdateHireTalentQuery): Promise<CombinedUpdateHireTalentResponse>
    /**
     * 将人才加入指定文件夹
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/add_to_folder
     */
    addToFolderHireTalent(body: AddToFolderHireTalentRequest): Promise<AddToFolderHireTalentResponse>
    /**
     * 将人才从指定文件夹移除
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/remove_to_folder
     */
    removeToFolderHireTalent(body: RemoveToFolderHireTalentRequest): Promise<RemoveToFolderHireTalentResponse>
    /**
     * 获取人才文件夹列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_folder/list
     */
    listHireTalentFolder(query?: ListHireTalentFolderQuery): Promise<Paginated<TalentFolderForList>>
    /**
     * 批量获取人才ID
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/batch_get_id
     */
    batchGetIdHireTalent(body: BatchGetIdHireTalentRequest): Promise<BatchGetIdHireTalentResponse>
    /**
     * 获取人才列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/list
     */
    listHireTalent(query?: ListHireTalentQuery): Promise<Paginated<Talent>>
    /**
     * 获取人才字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query
     */
    queryHireTalentObject(): Promise<QueryHireTalentObjectResponse>
    /**
     * 获取人才信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/get
     */
    getHireTalent(talent_id: string, query?: GetHireTalentQuery): Promise<GetHireTalentResponse>
    /**
     * 获取人才详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/talent/get
     */
    getHireTalent(talent_id: string, query?: GetHireTalentQuery): Promise<GetHireTalentResponse>
    /**
     * 更新人才在职状态
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/onboard_status
     */
    onboardStatusHireTalent(talent_id: string, body: OnboardStatusHireTalentRequest): Promise<void>
    /**
     * 加入/移除屏蔽名单
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_blocklist/change_talent_block
     */
    changeTalentBlockHireTalentBlocklist(body: ChangeTalentBlockHireTalentBlocklistRequest): Promise<void>
    /**
     * 获取投递详情
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get_detail
     */
    getDetailHireApplication(application_id: string, query?: GetDetailHireApplicationQuery): Promise<GetDetailHireApplicationResponse>
    /**
     * 恢复投递
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/recover
     */
    recoverHireApplication(application_id: string): Promise<void>
    /**
     * 创建投递
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/create
     */
    createHireApplication(body: CreateHireApplicationRequest, query?: CreateHireApplicationQuery): Promise<CreateHireApplicationResponse>
    /**
     * 终止投递
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/terminate
     */
    terminateHireApplication(application_id: string, body: TerminateHireApplicationRequest): Promise<void>
    /**
     * 转移投递阶段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_stage
     */
    transferStageHireApplication(application_id: string, body: TransferStageHireApplicationRequest): Promise<void>
    /**
     * 获取终止投递原因
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/termination_reason/list
     */
    listHireTerminationReason(query?: ListHireTerminationReasonQuery): Promise<Paginated<TerminationReason>>
    /**
     * 获取投递信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get
     */
    getHireApplication(application_id: string, query?: GetHireApplicationQuery): Promise<GetHireApplicationResponse>
    /**
     * 获取投递列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/list
     */
    listHireApplication(query?: ListHireApplicationQuery): Promise<Paginated<string>>
    /**
     * 获取申请表附加信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/diversity_inclusion/search
     */
    searchHireDiversityInclusion(body: SearchHireDiversityInclusionRequest): Promise<SearchHireDiversityInclusionResponse>
    /**
     * 获取简历评估信息列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation/list
     */
    listHireEvaluation(query?: ListHireEvaluationQuery): Promise<Paginated<Evaluation>>
    /**
     * 添加笔试结果
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/exam/create
     */
    createHireExam(body: CreateHireExamRequest, query?: CreateHireExamQuery): Promise<CreateHireExamResponse>
    /**
     * 获取笔试列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/test/search
     */
    searchHireTest(body: SearchHireTestRequest, query?: SearchHireTestQuery): Promise<Paginated<Test>>
    /**
     * 获取面试信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/list
     */
    listHireInterview(query?: ListHireInterviewQuery): Promise<Paginated<InterviewExtend>>
    /**
     * 获取人才面试信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/get_by_talent
     */
    getByTalentHireInterview(query?: GetByTalentHireInterviewQuery): Promise<GetByTalentHireInterviewResponse>
    /**
     * 获取面试评价详细信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_record/get
     */
    getHireInterviewRecord(interview_record_id: string, query?: GetHireInterviewRecordQuery): Promise<GetHireInterviewRecordResponse>
    /**
     * 获取面试评价详细信息（新版）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/interview_record/get
     */
    getHireInterviewRecord(interview_record_id: string, query?: GetHireInterviewRecordQuery): Promise<GetHireInterviewRecordResponse>
    /**
     * 批量获取面试评价详细信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_record/list
     */
    listHireInterviewRecord(query?: ListHireInterviewRecordQuery): Promise<Paginated<InterviewRecord>>
    /**
     * 批量获取面试评价详细信息（新版）
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/interview_record/list
     */
    listHireInterviewRecord(query?: ListHireInterviewRecordQuery): Promise<Paginated<InterviewRecord>>
    /**
     * 获取面试记录附件
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_record-attachment/get
     */
    getHireInterviewRecordAttachment(query?: GetHireInterviewRecordAttachmentQuery): Promise<GetHireInterviewRecordAttachmentResponse>
    /**
     * 获取面试速记明细
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/minutes/get
     */
    getHireMinutes(query?: GetHireMinutesQuery): Promise<GetHireMinutesResponse>
    /**
     * 获取面试满意度问卷列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/questionnaire/list
     */
    listHireQuestionnaire(query?: ListHireQuestionnaireQuery): Promise<Paginated<Questionnaire>>
    /**
     * 创建 Offer
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/create
     */
    createHireOffer(body: CreateHireOfferRequest, query?: CreateHireOfferQuery): Promise<CreateHireOfferResponse>
    /**
     * 更新 Offer 信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/update
     */
    updateHireOffer(offer_id: string, body: UpdateHireOfferRequest, query?: UpdateHireOfferQuery): Promise<UpdateHireOfferResponse>
    /**
     * 获取 Offer 信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/offer
     */
    offerHireApplication(application_id: string, query?: OfferHireApplicationQuery): Promise<OfferHireApplicationResponse>
    /**
     * 获取 Offer 详情
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/get
     */
    getHireOffer(offer_id: string, query?: GetHireOfferQuery): Promise<GetHireOfferResponse>
    /**
     * 获取 Offer 列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/list
     */
    listHireOffer(query?: ListHireOfferQuery): Promise<Paginated<OfferListInfo>>
    /**
     * 更新 Offer 状态
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/offer_status
     */
    offerStatusHireOffer(offer_id: string, body: OfferStatusHireOfferRequest): Promise<void>
    /**
     * 更新实习 Offer 入/离职状态
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/intern_offer_status
     */
    internOfferStatusHireOffer(offer_id: string, body: InternOfferStatusHireOfferRequest): Promise<InternOfferStatusHireOfferResponse>
    /**
     * 获取背调信息列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/background_check_order/list
     */
    listHireBackgroundCheckOrder(query?: ListHireBackgroundCheckOrderQuery): Promise<Paginated<BackgroundCheckOrder>>
    /**
     * 创建三方协议
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/create
     */
    createHireTripartiteAgreement(body: CreateHireTripartiteAgreementRequest): Promise<CreateHireTripartiteAgreementResponse>
    /**
     * 获取三方协议
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/list
     */
    listHireTripartiteAgreement(query?: ListHireTripartiteAgreementQuery): Promise<Paginated<TripartiteAgreementInfo>>
    /**
     * 更新三方协议
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/update
     */
    updateHireTripartiteAgreement(tripartite_agreement_id: string, body: UpdateHireTripartiteAgreementRequest): Promise<UpdateHireTripartiteAgreementResponse>
    /**
     * 删除三方协议
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/delete
     */
    deleteHireTripartiteAgreement(tripartite_agreement_id: string): Promise<void>
    /**
     * 更新 e-HR 导入任务结果
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/ehr_import_task/patch
     */
    patchHireEhrImportTask(ehr_import_task_id: string, body: PatchHireEhrImportTaskRequest): Promise<void>
    /**
     * 操作候选人入职
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_onboard
     */
    transferOnboardHireApplication(application_id: string, body: TransferOnboardHireApplicationRequest, query?: TransferOnboardHireApplicationQuery): Promise<TransferOnboardHireApplicationResponse>
    /**
     * 更新员工状态
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/patch
     */
    patchHireEmployee(employee_id: string, body: PatchHireEmployeeRequest, query?: PatchHireEmployeeQuery): Promise<PatchHireEmployeeResponse>
    /**
     * 通过投递 ID 获取入职信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get_by_application
     */
    getByApplicationHireEmployee(query?: GetByApplicationHireEmployeeQuery): Promise<GetByApplicationHireEmployeeResponse>
    /**
     * 通过员工 ID 获取入职信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get
     */
    getHireEmployee(employee_id: string, query?: GetHireEmployeeQuery): Promise<GetHireEmployeeResponse>
    /**
     * 批量获取待办事项
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/todo/list
     */
    listHireTodo(query?: ListHireTodoQuery): Promise<Paginated<Todo>>
    /**
     * 获取简历评估任务列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation_task/list
     */
    listHireEvaluationTask(query?: ListHireEvaluationTaskQuery): Promise<Paginated<EvaluationTask>>
    /**
     * 获取笔试阅卷任务列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/exam_marking_task/list
     */
    listHireExamMarkingTask(query?: ListHireExamMarkingTaskQuery): Promise<Paginated<ExamMarkingTask>>
    /**
     * 获取面试任务列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_task/list
     */
    listHireInterviewTask(query?: ListHireInterviewTaskQuery): Promise<Paginated<InterviewTask>>
    /**
     * 创建备注
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/create
     */
    createHireNote(body: CreateHireNoteRequest, query?: CreateHireNoteQuery): Promise<CreateHireNoteResponse>
    /**
     * 更新备注
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/patch
     */
    patchHireNote(note_id: string, body: PatchHireNoteRequest, query?: PatchHireNoteQuery): Promise<PatchHireNoteResponse>
    /**
     * 获取备注
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/get
     */
    getHireNote(note_id: string, query?: GetHireNoteQuery): Promise<GetHireNoteResponse>
    /**
     * 获取备注列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/list
     */
    listHireNote(query?: ListHireNoteQuery): Promise<Paginated<Note>>
    /**
     * 删除备注
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/delete
     */
    deleteHireNote(note_id: string): Promise<void>
    /**
     * 获取简历来源列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/resume_source/list
     */
    listHireResumeSource(query?: ListHireResumeSourceQuery): Promise<Paginated<ResumeSource>>
    /**
     * 创建账号自定义字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/create
     */
    createHireEcoAccountCustomField(body: CreateHireEcoAccountCustomFieldRequest): Promise<void>
    /**
     * 更新账号自定义字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_update
     */
    batchUpdateHireEcoAccountCustomField(body: BatchUpdateHireEcoAccountCustomFieldRequest): Promise<void>
    /**
     * 删除账号自定义字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_delete
     */
    batchDeleteHireEcoAccountCustomField(body: BatchDeleteHireEcoAccountCustomFieldRequest): Promise<void>
    /**
     * 创建背调自定义字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/create
     */
    createHireEcoBackgroundCheckCustomField(body: CreateHireEcoBackgroundCheckCustomFieldRequest): Promise<void>
    /**
     * 更新背调自定义字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_update
     */
    batchUpdateHireEcoBackgroundCheckCustomField(body: BatchUpdateHireEcoBackgroundCheckCustomFieldRequest): Promise<void>
    /**
     * 删除背调自定义字段
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_delete
     */
    batchDeleteHireEcoBackgroundCheckCustomField(body: BatchDeleteHireEcoBackgroundCheckCustomFieldRequest): Promise<void>
    /**
     * 创建背调套餐和附加调查项
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/create
     */
    createHireEcoBackgroundCheckPackage(body: CreateHireEcoBackgroundCheckPackageRequest): Promise<void>
    /**
     * 更新背调套餐和附加调查项
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_update
     */
    batchUpdateHireEcoBackgroundCheckPackage(body: BatchUpdateHireEcoBackgroundCheckPackageRequest): Promise<void>
    /**
     * 删除背调套餐和附加调查项
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_delete
     */
    batchDeleteHireEcoBackgroundCheckPackage(body: BatchDeleteHireEcoBackgroundCheckPackageRequest): Promise<void>
    /**
     * 更新背调订单进度
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_progress
     */
    updateProgressHireEcoBackgroundCheck(body: UpdateProgressHireEcoBackgroundCheckRequest): Promise<void>
    /**
     * 回传背调订单的最终结果
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_result
     */
    updateResultHireEcoBackgroundCheck(body: UpdateResultHireEcoBackgroundCheckRequest): Promise<void>
    /**
     * 终止背调订单
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/cancel
     */
    cancelHireEcoBackgroundCheck(body: CancelHireEcoBackgroundCheckRequest): Promise<void>
    /**
     * 创建试卷列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/create
     */
    createHireEcoExamPaper(body: CreateHireEcoExamPaperRequest): Promise<void>
    /**
     * 更新试卷列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_update
     */
    batchUpdateHireEcoExamPaper(body: BatchUpdateHireEcoExamPaperRequest): Promise<void>
    /**
     * 删除试卷列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_delete
     */
    batchDeleteHireEcoExamPaper(body: BatchDeleteHireEcoExamPaperRequest): Promise<void>
    /**
     * 回传笔试安排结果
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/login_info
     */
    loginInfoHireEcoExam(exam_id: string, body: LoginInfoHireEcoExamRequest): Promise<void>
    /**
     * 回传笔试结果
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/update_result
     */
    updateResultHireEcoExam(exam_id: string, body: UpdateResultHireEcoExamRequest): Promise<void>
    /**
     * 启用内推账户
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/enable
     */
    enableHireReferralAccount(body: EnableHireReferralAccountRequest, query?: EnableHireReferralAccountQuery): Promise<EnableHireReferralAccountResponse>
    /**
     * 查询内推账户
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/get_account_assets
     */
    getAccountAssetsHireReferralAccount(query?: GetAccountAssetsHireReferralAccountQuery): Promise<GetAccountAssetsHireReferralAccountResponse>
    /**
     * 注册内推账户
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/create
     */
    createHireReferralAccount(body: CreateHireReferralAccountRequest, query?: CreateHireReferralAccountQuery): Promise<CreateHireReferralAccountResponse>
    /**
     * 停用内推账户
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/deactivate
     */
    deactivateHireReferralAccount(referral_account_id: string, query?: DeactivateHireReferralAccountQuery): Promise<DeactivateHireReferralAccountResponse>
    /**
     * 全额提取内推账户余额
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/withdraw
     */
    withdrawHireReferralAccount(referral_account_id: string, body: WithdrawHireReferralAccountRequest): Promise<WithdrawHireReferralAccountResponse>
    /**
     * 内推账户提现数据对账
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/reconciliation
     */
    reconciliationHireReferralAccount(body: ReconciliationHireReferralAccountRequest): Promise<ReconciliationHireReferralAccountResponse>
    /**
     * 创建附件
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uIDN1YjLyQTN24iM0UjN/create_attachment
     */
    createHireAttachment(): Promise<CreateHireAttachmentResponse>
    /**
     * 获取附件信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/get
     */
    getHireAttachment(attachment_id: string, query?: GetHireAttachmentQuery): Promise<GetHireAttachmentResponse>
    /**
     * 获取附件 PDF 格式下载链接
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/preview
     */
    previewHireAttachment(attachment_id: string): Promise<PreviewHireAttachmentResponse>
    /**
     * 获取面试记录列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application-interview/list
     */
    listHireApplicationInterview(application_id: string, query?: ListHireApplicationInterviewQuery): Promise<Paginated<Interview>>
    /**
     * 查询人才操作记录
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/talent_operation_log/search
     */
    searchHireTalentOperationLog(body: SearchHireTalentOperationLogRequest, query?: SearchHireTalentOperationLogQuery): Promise<Paginated<TalentOperationLog>>
    /**
     * 获取职位上的招聘人员信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/get
     */
    getHireJobManager(job_id: string, manager_id: string, query?: GetHireJobManagerQuery): Promise<GetHireJobManagerResponse>
    /**
     * 获取 Offer 申请表详细信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_schema/get
     */
    getHireOfferSchema(offer_schema_id: string): Promise<GetHireOfferSchemaResponse>
  }
}

export interface QueryHireLocationRequest {
  /** 地址码列表,最大长度不超过100 */
  code_list?: string[]
  /** 地址类型 */
  location_type: 1 | 2 | 3 | 4
}

export interface QueryHireLocationQuery extends Pagination {
}

export interface ListHireLocationQuery extends Pagination {
  /** 地址类型 */
  usage: 'position_location' | 'interview_location' | 'store_location'
}

export interface ListHireRoleQuery extends Pagination {
}

export interface ListHireUserRoleQuery extends Pagination {
  /** 用户 ID */
  user_id?: string
  /** 角色 ID */
  role_id?: string
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CombinedCreateHireJobRequest {
  /** 职位编号，可传入职位的「职位编号」、「职位 ID」或者「职位序号」，将以传入的参数作为职位编号，以便双方系统的数据映射 */
  code?: string
  /** 工作年限 */
  experience?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** 到期日期，请使用 */
  expiry_time?: number
  /** 自定义字段 */
  customized_data_list?: CombinedJobObjectValueMap[]
  /** 最低职级，枚举通过接口「获取职级列表」获取 */
  min_level_id?: string
  /** 最低薪资 */
  min_salary?: number
  /** 职位名称 */
  title: string
  /** 职位负责人，仅一位，可通过用户相关接口获取用户 id */
  job_managers: JobManager
  /** 招聘流程，枚举通过接口「获取招聘流程信息」获取 */
  job_process_id: string
  /** 职位流程类型 */
  process_type: 1 | 2
  /** 项目，枚举通过「获取项目列表」获取 */
  subject_id?: string
  /** 职能分类，通过「获取职能分类」获取 */
  job_function_id?: string
  /** 部门，枚举通过接口「获取部门信息列表」获取 */
  department_id: string
  /** 招聘数量 */
  head_count?: number
  /** 是否长期有效 */
  is_never_expired: boolean
  /** 最高薪资 */
  max_salary?: number
  /** 职位要求 */
  requirement?: string
  /** 职位描述 */
  description?: string
  /** 职位亮点 */
  highlight_list?: string[]
  /** 职位类别 */
  job_type_id: string
  /** 最高职级，枚举通过接口「获取职级列表」获取 */
  max_level_id?: string
  /** 雇佣类型 */
  recruitment_type_id: string
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 序列 */
  job_category_id?: string
  /** 工作地点，枚举通过接口「获取地址列表」获取，选择地点用途为「职位地址」 */
  address_id_list?: string[]
  /** 职位属性，1是实体职位，2是虚拟职位 */
  job_attribute?: 1 | 2
  /** 到期日期的毫秒时间戳 */
  expiry_timestamp?: string
  /** 面试登记表ID */
  interview_registration_schema_id?: string
  /** 入职登记表ID */
  onboard_registration_schema_id?: string
  /** 目标专业ID List */
  target_major_id_list?: string[]
  /** 官网申请表ID */
  portal_website_apply_form_schema_id?: string
}

export interface CombinedCreateHireJobQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
}

export interface CombinedUpdateHireJobRequest {
  /** 职位 ID */
  id?: string
  /** 工作年限 */
  experience?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  /** 到期日期，请使用 */
  expiry_time?: number
  /** 自定义字段 */
  customized_data_list?: CombinedJobObjectValueMap[]
  /** 最低职级，枚举通过接口「获取职级列表」获取 */
  min_level_id?: string
  /** 最低薪资 */
  min_salary?: number
  /** 职位名称 */
  title?: string
  /** 职位负责人，仅一位，可通过用户相关接口获取用户 id */
  job_managers: JobManager
  /** 招聘流程，枚举通过接口「获取招聘流程信息」获取 */
  job_process_id?: string
  /** 项目，枚举通过「获取项目列表」获取 */
  subject_id?: string
  /** 职能分类，通过「获取职能分类」获取 */
  job_function_id?: string
  /** 部门，枚举通过接口「获取部门信息列表」获取 */
  department_id?: string
  /** 招聘数量 */
  head_count?: number
  /** 是否长期有效 */
  is_never_expired: boolean
  /** 最高薪资 */
  max_salary?: number
  /** 职位要求 */
  requirement?: string
  /** 职位描述 */
  description?: string
  /** 职位亮点 */
  highlight_list?: string[]
  /** 职位类别 */
  job_type_id: string
  /** 最高职级，枚举通过接口「获取职级列表」获取 */
  max_level_id?: string
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 序列 */
  job_category_id?: string
  /** 工作地点，枚举通过接口「获取地址列表」获取，选择地点用途为「职位地址」 */
  address_id_list?: string[]
  /** 职位属性，1是实体职位，2是虚拟职位 */
  job_attribute?: 1 | 2
  /** 到期日期的毫秒时间戳 */
  expiry_timestamp?: string
  /** 目标专业ID List */
  target_major_id_list?: string[]
}

export interface CombinedUpdateHireJobQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
}

export interface UpdateConfigHireJobRequest {
  /** Offer 申请表，枚举通过接口「获取 Offer 申请表列表」获取 */
  offer_apply_schema_id?: string
  /** Offer 审批流，枚举通过接口「获取 Offer 审批流列表」获取 */
  offer_process_conf?: string
  /** 建议评估人 ID 列表 */
  recommended_evaluator_id_list?: string[]
  /** 更新选项，传入要更新的配置项 */
  update_option_list: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12[]
  /** 面试评价表，枚举通过接口「获取面试评价表列表」获取 */
  assessment_template_biz_id?: string
  /** 建议面试官列表 */
  interview_round_conf_list?: JobConfigInterviewRoundConf[]
  /** 关联招聘需求，支持关联多个，枚举通过接口「获取招聘需求」获取 */
  jr_id_list?: string[]
  /** 面试登记表ID，当在飞书招聘「设置 - 信息登记表使用设置 - 面试登记表使用方式」中选择「HR 按职位选择登记表」时，该字段为必填；否则该字段不生效。 */
  interview_registration_schema_id?: string
  /** 入职登记表ID，当在飞书招聘「设置 - 信息登记表使用设置 - 入职登记表使用方式」中选择「HR 按职位选择登记表」时，该字段为必填；否则该字段不生效。 */
  onboard_registration_schema_id?: string
  /** 面试轮次类型 ID 列表 */
  interview_round_type_conf_list?: JobConfigRoundType[]
  /** 关联职位列表，如职位为实体职位则关联虚拟职位id，如职位为虚拟职位则关联实体职位id */
  related_job_id_list?: string[]
  /** 面试官安排面试配置 */
  interview_appointment_config?: InterviewAppointmentConfig
  /** 官网申请表ID */
  portal_website_apply_form_schema_id?: string
}

export interface UpdateConfigHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchUpdateHireJobManagerRequest {
  /** 招聘负责人 ID */
  recruiter_id?: string
  /** 招聘协助人 ID */
  assistant_id_list?: string[]
  /** 用人经理 ID */
  hiring_manager_id_list?: string[]
  /** 更新的人员类型，可选值：1=招聘负责人; 2=招聘协助人; 3=用人经理； */
  update_option_list: 1 | 2 | 3[]
  /** 操作者 ID */
  creator_id?: string
}

export interface BatchUpdateHireJobManagerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetDetailHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
}

export interface GetHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
}

export interface RecruiterHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ConfigHireJobQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ListHireJobQuery extends Pagination {
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
}

export interface OpenHireJobRequest {
  /** 到期日期 */
  expiry_time?: number
  /** 是否长期有效 */
  is_never_expired: boolean
}

export interface ListHireJobSchemaQuery extends Pagination {
  /** 职位模板类型 */
  scenario?: 1 | 2
}

export interface PublishHireAdvertisementRequest {
  /** 职位渠道 ID，选择要发布的招聘官网，单次仅可发布 1 个渠道，1. 内推平台提供对应的 id = 3，2. 官网渠道的 ID 通过接口「获取官网列表」获取 */
  job_channel_id?: string
}

export interface SearchHireJobPublishRecordRequest {
  /** 渠道 ID */
  job_channel_id: string
}

export interface SearchHireJobPublishRecordQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
}

export interface ListHireJobFunctionQuery extends Pagination {
}

export interface ListHireJobTypeQuery extends Pagination {
}

export interface CreateHireJobRequirementRequest {
  /** 招聘需求编号 */
  short_code: string
  /** 需求名称 */
  name: string
  /** 需求状态 */
  display_progress: 1 | 2 | 3 | 4 | 5 | 6
  /** 需求人数 */
  head_count: number
  /** 职位性质 ID */
  recruitment_type_id?: string
  /** 人员类型 */
  employee_type_id?: string
  /** 最高职级 ID */
  max_level_id?: string
  /** 最低职级 ID */
  min_level_id?: string
  /** 职位序列 ID */
  sequence_id?: string
  /** 需求类型 */
  category?: 1 | 2
  /** 需求部门 ID */
  department_id?: string
  /** 需求负责人 ID 列表 */
  recruiter_id_list?: string[]
  /** 需求用人经理 ID 列表 */
  jr_hiring_manager_id_list?: string[]
  /** 直属上级 ID */
  direct_leader_id_list?: string[]
  /** 开始日期，毫秒级时间戳 */
  start_time?: string
  /** 预计完成日期，毫秒级时间戳 */
  deadline?: string
  /** 招聘优先级 */
  priority?: 1 | 2 | 3
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 最高薪资 */
  max_salary?: string
  /** 最低薪资 */
  min_salary?: string
  /** 工作地点 ID */
  address_id?: string
  /** 需求描述 */
  description?: string
  /** 自定义字段 */
  customized_data_list?: JobRequirementCustomizedData[]
  /** 支持的招聘类型列表 */
  process_type?: 1 | 2
  /** 招聘需求中的职位类别 */
  job_type_id?: string
  /** 关联的职位 ID 列表 */
  job_id_list?: string[]
  /** 职务 ID */
  employment_job_id?: string
  /** 岗位 ID */
  position_id?: string
}

export interface CreateHireJobRequirementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface UpdateHireJobRequirementRequest {
  /** 需求名称 */
  name: string
  /** 需求状态 */
  display_progress: 1 | 2 | 3 | 4 | 5 | 6
  /** 需求人数 */
  head_count: number
  /** 职位性质 ID */
  recruitment_type_id?: string
  /** 人员类型 */
  employee_type_id?: string
  /** 最高职级 ID */
  max_level_id?: string
  /** 最低职级 ID */
  min_level_id?: string
  /** 职位序列 ID */
  sequence_id?: string
  /** 需求类型 */
  category?: 1 | 2
  /** 需求部门 ID */
  department_id?: string
  /** 需求负责人 ID 列表 */
  recruiter_id_list?: string[]
  /** 需求用人经理 ID 列表 */
  jr_hiring_manager_id_list?: string[]
  /** 直属上级 ID */
  direct_leader_id_list?: string[]
  /** 开始日期，毫秒级时间戳 */
  start_time?: string
  /** 预计完成日期，毫秒级时间戳 */
  deadline?: string
  /** 招聘优先级 */
  priority?: 1 | 2 | 3
  /** 学历要求 */
  required_degree?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 20
  /** 最高薪资 */
  max_salary?: string
  /** 最低薪资 */
  min_salary?: string
  /** 工作地点 ID */
  address_id?: string
  /** 需求描述 */
  description?: string
  /** 自定义字段 */
  customized_data_list?: JobRequirementCustomizedData[]
  /** 支持的招聘类型列表 */
  process_type?: 1 | 2
  /** 招聘需求中的职位类别 */
  job_type_id?: string
  /** 关联的职位 ID 列表 */
  job_id_list?: string[]
  /** 职务 ID */
  employment_job_id?: string
  /** 岗位 ID */
  position_id?: string
  /** 招聘需求修改确认控制 */
  update_option?: JobRequirementUpdateOption
}

export interface UpdateHireJobRequirementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface ListByIdHireJobRequirementRequest {
  /** 招聘需求ID列表 */
  id_list?: string[]
}

export interface ListByIdHireJobRequirementQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface ListHireJobRequirementQuery extends Pagination {
  /** 职位ID */
  job_id?: string
  /** 起始创建时间，传入毫秒级时间戳 */
  create_time_begin?: string
  /** 截止创建时间，传入毫秒级时间戳 */
  create_time_end?: string
  /** 起始更新时间，传入毫秒级时间戳 */
  update_time_begin?: string
  /** 截止更新时间，传入毫秒级时间戳 */
  update_time_end?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface ListHireJobRequirementSchemaQuery extends Pagination {
}

export interface ListHireJobProcessQuery extends Pagination {
}

export interface ListHireSubjectQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 项目ID列表 */
  subject_ids?: string[]
}

export interface ListHireTalentTagQuery extends Pagination {
  /** 搜索关键词 */
  keyword?: string
  /** ID 列表 */
  id_list?: string[]
  /** 标签类型 */
  type?: 1 | 2
  /** 包含停用 */
  include_inactive?: boolean
}

export interface ListHireRegistrationSchemaQuery extends Pagination {
  /** 登记表适用场景；不填表示获取全部类型信息登记表 */
  scenario?: 5 | 6 | 14
}

export interface ListHireInterviewFeedbackFormQuery extends Pagination {
  /** 面试评价表ID列表, 如果使用此字段则会忽略其他参数 */
  interview_feedback_form_ids?: string[]
}

export interface ListHireInterviewRoundTypeQuery {
  /** 职位流程类型 */
  process_type?: 1 | 2
}

export interface ListHireInterviewRegistrationSchemaQuery extends Pagination {
}

export interface ListHireInterviewerQuery extends Pagination {
  /** 面试官userID列表 */
  user_ids?: string[]
  /** 认证状态 */
  verify_status?: 1 | 2
  /** 最早更新时间，毫秒时间戳 */
  earliest_update_time?: string
  /** 最晚更新时间，毫秒时间戳 */
  latest_update_time?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface PatchHireInterviewerRequest {
  /** 面试官信息 */
  interviewer: Interviewer
}

export interface PatchHireInterviewerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateHireOfferCustomFieldRequest {
  /** 自定义字段名称 */
  name: I18n
  /** 配置信息 */
  config?: OfferCustomFieldConfig
}

export interface ListHireOfferApplicationFormQuery extends Pagination {
}

export interface SearchHireReferralRequest {
  /** 人才id */
  talent_id: string
  /** 投递起始时间，若不填，默认为全部，但最多返回200条 */
  start_time?: string
  /** 投递终止时间，若不填，默认为全部，但最多返回200条 */
  end_time?: string
}

export interface SearchHireReferralQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListHireReferralWebsiteJobPostQuery extends Pagination {
  /** 招聘流程类型 */
  process_type?: 1 | 2
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
}

export interface GetHireReferralWebsiteJobPostQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
}

export interface GetByApplicationHireReferralQuery {
  /** 投递的 ID */
  application_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface CreateHireWebsiteChannelRequest {
  /** 推广渠道名称 */
  channel_name: string
}

export interface UpdateHireWebsiteChannelRequest {
  /** 推广渠道名称 */
  channel_name: string
}

export interface ListHireWebsiteChannelQuery extends Pagination {
}

export interface CreateHireWebsiteSiteUserRequest {
  /** 姓名 */
  name?: string
  /** 邮箱 */
  email?: string
  /** 外部用户 ID */
  external_id: string
  /** 电话，请和区号对应的国家码一并提供 */
  mobile?: string
  /** 国家码，请和电话一并提供，可从「获取地址码」查询 */
  mobile_country_code?: string
}

export interface GetHireWebsiteJobPostQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
}

export interface SearchHireWebsiteJobPostRequest {
  /** 职位类型列表 */
  job_type_id_list?: string[]
  /** 职位城市列表 */
  city_code_list?: string[]
  /** 职能分类列表 */
  job_function_id_list?: string[]
  /** 职位项目列表 */
  subject_id_list?: string[]
  /** 关键字 */
  keyword?: string
  /** 最早更新时间,毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间,毫秒级时间戳 */
  update_end_time?: string
  /** 最早创建时间,毫秒级时间戳 */
  create_start_time?: string
  /** 最晚创建时间,毫秒级时间戳 */
  create_end_time?: string
}

export interface SearchHireWebsiteJobPostQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
}

export interface ListHireWebsiteJobPostQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 最早更新时间,毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间,毫秒级时间戳 */
  update_end_time?: string
  /** 最早创建时间,毫秒级时间戳 */
  create_start_time?: string
  /** 最晚创建时间,毫秒级时间戳 */
  create_end_time?: string
}

export interface CreateByResumeHireWebsiteDeliveryRequest {
  /** 职位广告 ID */
  job_post_id: string
  /** 人才信息 */
  resume: WebsiteDeliveryResume
  /** 官网用户 ID */
  user_id: string
  /** 意向投递城市列表，可从「获取职位信息」返回的工作地点列表获取 */
  application_preferred_city_code_list?: string[]
  /** 官网推广渠道 ID */
  channel_id?: string
}

export interface CreateByResumeHireWebsiteDeliveryQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateByAttachmentHireWebsiteDeliveryRequest {
  /** 职位广告 ID */
  job_post_id: string
  /** 官网用户 ID */
  user_id: string
  /** 简历文件 ID，使用「创建附件」生成 */
  resume_file_id: string
  /** 官网推广渠道 ID */
  channel_id?: string
  /** 意向投递城市列表，可从「获取职位信息」返回的工作地点列表获取 */
  application_preferred_city_code_list?: string[]
  /** 电话国际区号，可从「获取地址码」查询（当该参数值与简历附件中的相关值不一致时，将以该参数值为准） */
  mobile_country_code?: string
  /** 电话号码（当该参数值与简历附件中的相关值不一致时，将以该参数值为准） */
  mobile?: string
  /** 邮箱（当该参数值与简历附件中的相关值不一致时，将以该参数值为准） */
  email?: string
  /** 身份证件号码（当该参数值与简历附件中的相关值不一致时，将以该参数值为准） */
  identification?: WebsiteDeliveryAttachmentIndentification
}

export interface ListHireWebsiteQuery extends Pagination {
}

export interface ProtectHireAgencyRequest {
  /** 人才ID */
  talent_id: string
  /** 供应商ID */
  supplier_id: string
  /** 猎头顾问ID */
  consultant_id: string
  /** 保护期创建时间 */
  protect_create_time: number
  /** 保护期过期时间 */
  protect_expire_time: number
  /** 推荐语 */
  comment?: string
  /** 当前薪资 */
  current_salary?: string
  /** 预期薪资 */
  expected_salary?: string
}

export interface ProtectHireAgencyQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface GetHireAgencyQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ProtectSearchHireAgencyRequest {
  /** 人才id */
  talent_id: string
}

export interface QueryHireAgencyQuery {
  /** 猎头供应商名称 */
  name: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetAgencyAccountHireAgencyRequest {
  /** 猎头供应商 ID */
  supplier_id: string
  /** 猎头状态 */
  status?: 0 | 1 | 2
  /** 角色 */
  role?: 0 | 1
}

export interface GetAgencyAccountHireAgencyQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'union_id' | 'open_id'
}

export interface BatchQueryHireAgencyRequest {
  /** 猎头供应商 ID 列表，当传递此值，以此值为准，其余查询字段失效 */
  agency_supplier_id_list?: string[]
  /** 搜索关键字，可传入名称或邮箱 */
  keyword?: string
  /** 筛选项，相同的 Key 仅可传一次 */
  filter_list?: CommonFilter[]
}

export interface BatchQueryHireAgencyQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface OperateAgencyAccountHireAgencyRequest {
  /** 操作类型 */
  option: 1 | 2
  /** 猎头 ID */
  id: string
  /** 禁用原因，仅当禁用操作时，必填 */
  reason?: string
}

export interface CreateHireTalentExternalInfoRequest {
  /** 人才在外部系统创建时间 */
  external_create_time: string
}

export interface UpdateHireTalentExternalInfoRequest {
  /** 人才在外部系统创建时间 */
  external_create_time: string
}

export interface CreateHireExternalApplicationRequest {
  /** 外部系统背调主键 （仅用于幂等） */
  external_id?: string
  /** 职位招聘类型 */
  job_recruitment_type?: 1 | 2
  /** 职位名称 */
  job_title?: string
  /** 简历来源 */
  resume_source?: string
  /** 阶段 */
  stage?: string
  /** 人才 ID */
  talent_id: string
  /** 终止原因 */
  termination_reason?: string
  /** 投递类型 */
  delivery_type?: 1 | 2 | 3 | 4
  /** 更新时间，招聘系统内用作投递在外部系统终止时间 */
  modify_time?: number
  /** 投递在外部系统创建时间 */
  create_time?: number
  /** 终止类型 */
  termination_type?: string
}

export interface UpdateHireExternalApplicationRequest {
  /** 职位招聘类型 */
  job_recruitment_type?: 1 | 2
  /** 职位名称 */
  job_title?: string
  /** 简历来源 */
  resume_source?: string
  /** 阶段 */
  stage?: string
  /** 终止原因 */
  termination_reason?: string
  /** 投递类型 */
  delivery_type?: 1 | 2 | 3 | 4
  /** 更新时间，招聘系统内用作投递在外部系统终止时间 */
  modify_time?: number
  /** 投递在外部系统创建时间 */
  create_time?: number
  /** 终止类型 */
  termination_type?: string
}

export interface ListHireExternalApplicationQuery extends Pagination {
  /** 人才ID */
  talent_id: string
}

export interface DeleteHireExternalApplicationQuery {
  /** 人才ID */
  talent_id?: string
}

export interface CreateHireExternalInterviewRequest {
  /** 外部系统面试主键 （仅用于幂等） */
  external_id?: string
  /** 外部投递 ID */
  external_application_id: string
  /** 参与状态 */
  participate_status?: 1 | 2 | 3
  /** 开始时间 */
  begin_time?: number
  /** 结束时间 */
  end_time?: number
  /** 面试评价列表 */
  interview_assessments?: ExternalInterviewAssessment[]
}

export interface UpdateHireExternalInterviewRequest {
  /** 外部投递 ID */
  external_application_id: string
  /** 参与状态 */
  participate_status?: 1 | 2 | 3
  /** 开始时间 */
  begin_time?: number
  /** 结束时间 */
  end_time?: number
  /** 面试评价列表 */
  interview_assessments?: ExternalInterviewAssessment[]
}

export interface BatchQueryHireExternalInterviewRequest {
  /** 外部面试 ID列表,当传递此值时,以此值为准 */
  external_interview_id_list?: string[]
}

export interface BatchQueryHireExternalInterviewQuery extends Pagination {
  /** 外部投递 ID */
  external_application_id?: string
}

export interface CreateHireExternalInterviewAssessmentRequest {
  /** 外部系统面评主键（仅用于幂等） */
  external_id?: string
  /** 面试官姓名 */
  username?: string
  /** 面试结果 */
  conclusion?: 1 | 2 | 3
  /** 评价维度列表 */
  assessment_dimension_list?: ExternalInterviewAssessmentDimension[]
  /** 综合记录 */
  content?: string
  /** 外部面试 ID */
  external_interview_id?: string
}

export interface PatchHireExternalInterviewAssessmentRequest {
  /** 面试官姓名 */
  username?: string
  /** 面试结果 */
  conclusion?: 1 | 2 | 3
  /** 评价维度列表 */
  assessment_dimension_list?: ExternalInterviewAssessmentDimension[]
  /** 综合记录 */
  content?: string
}

export interface CreateHireExternalOfferRequest {
  /** 外部系统 Offer 主键（仅用于幂等） */
  external_id?: string
  /** 外部投递 ID */
  external_application_id: string
  /** Offer 创建时间，毫秒时间戳 */
  biz_create_time?: string
  /** Offer 负责人 */
  owner?: string
  /** Offer 状态 */
  offer_status?: string
  /** Offer详情附件ID列表 */
  attachment_id_list?: string[]
}

export interface UpdateHireExternalOfferRequest {
  /** 外部投递 ID */
  external_application_id: string
  /** Offer 创建时间，毫秒时间戳 */
  biz_create_time?: string
  /** Offer 负责人 */
  owner?: string
  /** Offer 状态 */
  offer_status?: string
  /** Offer详情附件ID列表 */
  attachment_id_list?: string[]
}

export interface BatchQueryHireExternalOfferRequest {
  /** 外部 Offer ID列表,当传递此值时,以此值为准 */
  external_offer_id_list?: string[]
}

export interface BatchQueryHireExternalOfferQuery extends Pagination {
  /** 外部投递 ID */
  external_application_id?: string
}

export interface CreateHireExternalBackgroundCheckRequest {
  /** 外部系统背调主键 （仅用于幂等） */
  external_id?: string
  /** 外部投递 ID */
  external_application_id: string
  /** 背调日期 */
  date?: number
  /** 背调名字 */
  name?: string
  /** 背调结果 */
  result?: string
  /** 背调附件ID列表 */
  attachment_id_list?: string[]
}

export interface UpdateHireExternalBackgroundCheckRequest {
  /** 外部投递 ID */
  external_application_id: string
  /** 背调日期 */
  date?: number
  /** 背调名字 */
  name?: string
  /** 背调结果 */
  result?: string
  /** 背调附件ID列表 */
  attachment_id_list?: string[]
}

export interface BatchQueryHireExternalBackgroundCheckRequest {
  /** 外部背调 ID 列表,当传递此值时,以此值为准 */
  external_background_check_id_list?: string[]
}

export interface BatchQueryHireExternalBackgroundCheckQuery extends Pagination {
  /** 外部投递 ID */
  external_application_id?: string
}

export interface CreateHireExternalReferralRewardRequest {
  /** 内推人ID */
  referral_user_id: string
  /** 奖励创建人，管理员与内推人可见，若不传，则默认为「外部系统」 */
  create_user_id?: string
  /** 奖励确认人，若导入的「内推奖励状态」为「已确认」可传入，若不传，则默认为「外部系统」 */
  confirm_user_id?: string
  /** 奖励发放人，导入奖励状态为「已发放」的奖励传入，若不传，则默认为「外部系统」 */
  pay_user_id?: string
  /** 外部系统奖励唯一id（仅用于幂等） */
  external_id: string
  /** 投递id，和「人才id」二选一 */
  application_id?: string
  /** 人才id，和「投递id」二选一 */
  talent_id?: string
  /** 职位id，当参数包含「人才id」时，可以选填职位id */
  job_id?: string
  /** 奖励原因 */
  reason?: string
  /** 导入的奖励规则类型，将展示在内推奖励明细中，管理员与内推人可见 */
  rule_type: 1 | 2 | 3 | 4 | 5
  /** 奖励数据 */
  bonus: BonusAmount
  /** 导入的内推奖励状态 */
  stage: 1 | 2 | 3
  /** 奖励产生时间，内推奖励触发时间，若未传入，取接口传入时间 */
  create_time?: string
  /** 奖励确认时间，若导入的「内推奖励状态」为「已确认」可传入，若未传入，取接口传入时间 */
  confirm_time?: string
  /** 奖励发放时间，若导入的「内推奖励状态」为「已确认」可传入，若未传入，取接口传入时间 */
  pay_time?: string
  /** 入职时间，管理员与内推人可见，若为「入职奖励」可传入 */
  onboard_time?: string
  /** 入职时间，管理员与内推人可见，若为「入职奖励」可传入 */
  conversion_time?: string
  /** 操作备注，管理员与内推人可见，若为空，将展示为奖励原因 */
  comment?: string
}

export interface CreateHireExternalReferralRewardQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface BatchChangeTalentPoolHireTalentPoolRequest {
  /** 人才 ID 列表 */
  talent_id_list: string[]
  /** 操作类型 */
  option_type: 1 | 2
}

export interface SearchHireTalentPoolQuery extends Pagination {
  /** 人才库ID列表 */
  id_list?: string[]
}

export interface MoveTalentHireTalentPoolRequest {
  /** 人才ID */
  talent_id: string
  /** 操作类型 */
  add_type: 1 | 2
}

export interface TagHireTalentRequest {
  /** 操作类型 */
  operation: 1 | 2
  /** 标签 ID 列表 */
  tag_id_list: string[]
}

export interface CombinedCreateHireTalentRequest {
  /** 简历来源 ID，可通过[获取简历来源列表](/ssl:ttdoc/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query)接口查询 */
  init_source_id?: string
  /** 简历来源 ID */
  resume_source_id?: string
  /** 文件夹 ID 列表 */
  folder_id_list?: string[]
  /** 创建人 ID */
  creator_id?: string
  /** 创建人类型 */
  creator_account_type?: 1 | 3
  /** 简历附件 ID */
  resume_attachment_id?: string
  /** 基础信息 */
  basic_info: TalentCombinedBasicInfo
  /** 教育经历 */
  education_list?: TalentCombinedEducationInfo[]
  /** 工作经历 */
  career_list?: TalentCombinedCareerInfo[]
  /** 项目经历 */
  project_list?: TalentCombinedProjectInfo[]
  /** 作品 */
  works_list?: TalentCombinedWorkInfo[]
  /** 获奖 */
  award_list?: TalentCombinedAwardInfo[]
  /** 语言能力 */
  language_list?: TalentCombinedLanguageInfo[]
  /** 社交账号 */
  sns_list?: TalentCombinedSnsInfo[]
  /** 意向地点 */
  preferred_city_code_list?: string[]
  /** 自我评价 */
  self_evaluation?: TalentSelfEvaluation
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface CombinedCreateHireTalentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface CombinedUpdateHireTalentRequest {
  /** 人才 ID */
  talent_id: string
  /** 简历来源 ID，可通过[获取简历来源列表](/ssl:ttdoc/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query)接口查询 */
  init_source_id?: string
  /** 文件夹 ID 列表 */
  folder_id_list?: string[]
  /** 更新人 ID */
  operator_id?: string
  /** 更新人类型 */
  operator_account_type?: 1 | 3
  /** 简历附件id */
  resume_attachment_id?: string
  /** 基础信息 */
  basic_info: TalentCombinedBasicInfo
  /** 教育经历 */
  education_list?: TalentCombinedEducationInfo[]
  /** 工作经历 */
  career_list?: TalentCombinedCareerInfo[]
  /** 项目经历 */
  project_list?: TalentCombinedProjectInfo[]
  /** 作品 */
  works_list?: TalentCombinedWorkInfo[]
  /** 获奖 */
  award_list?: TalentCombinedAwardInfo[]
  /** 语言能力 */
  language_list?: TalentCombinedLanguageInfo[]
  /** 社交账号 */
  sns_list?: TalentCombinedSnsInfo[]
  /** 偏好城市 */
  preferred_city_code_list?: string[]
  /** 自我评价 */
  self_evaluation?: TalentSelfEvaluation
  /** 自定义模块 */
  customized_data?: TalentCustomizedDataObjectValue[]
}

export interface CombinedUpdateHireTalentQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface AddToFolderHireTalentRequest {
  /** 人才 ID 列表 */
  talent_id_list: string[]
  /** 文件夹 ID */
  folder_id: string
}

export interface RemoveToFolderHireTalentRequest {
  /** 人才 ID 列表 */
  talent_id_list: string[]
  /** 文件夹 ID */
  folder_id: string
}

export interface ListHireTalentFolderQuery extends Pagination {
  /** 用户ID类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface BatchGetIdHireTalentRequest {
  /** 手机国家区号，默认值：86，即中国大陆地区 */
  mobile_code?: string
  /** 手机号，区号均采用 mobile_code 参数的值，最多 100 个 */
  mobile_number_list?: string[]
  /** 邮箱信息列表，最多 100 个 */
  email_list?: string[]
  /** 证件类型，可参考招聘枚举常量文档下的 IdentificationType 枚举定义 */
  identification_type?: number
  /** 证件号 */
  identification_number_list?: string[]
}

export interface ListHireTalentQuery extends Pagination {
  /** 搜索关键词，支持布尔语言（使用 and、or、not 连接关键词） */
  keyword?: string
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
  /** 排序规则 */
  sort_by?: 1 | 2 | 3 | 4
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 请求控制参数 */
  query_option?: 'ignore_empty_error'
}

export interface GetHireTalentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface GetHireTalentQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface OnboardStatusHireTalentRequest {
  /** 操作类型 1:入职 2:离职 */
  operation: 1 | 2
  /** 毫秒时间戳 */
  onboard_time?: string
  /** 毫秒时间戳 */
  overboard_time?: string
}

export interface ChangeTalentBlockHireTalentBlocklistRequest {
  /** 人才 ID */
  talent_id: string
  /** 操作类型 */
  option: 1 | 2
  /** 原因，当执行加入屏蔽名单操作时必填 */
  reason?: string
}

export interface GetDetailHireApplicationQuery {
  /** 此次调用中使用的用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的部门 ID 类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
  /** 请求控制参数，用于控制获取哪些关联实体信息。 */
  options?: 'with_job' | 'with_talent' | 'with_interview' | 'with_offer' | 'with_evaluation' | 'with_employee' | 'with_agency' | 'with_referral' | 'with_portal'[]
}

export interface CreateHireApplicationRequest {
  /** 人才ID */
  talent_id: string
  /** 职位ID */
  job_id: string
  /** 人员ID */
  user_id?: string
  /** 简历来源 ID，可通过「获取简历来源」接口查询。若简历来源类型属于「员工转岗」或「实习生转正」，人才需处于已入职状态。 */
  resume_source_id?: string
  /** 意向投递城市列表，可从「获取职位信息」返回的工作地点列表获取 */
  application_preferred_city_code_list?: string[]
}

export interface CreateHireApplicationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface TerminateHireApplicationRequest {
  /** 终止原因的类型 */
  termination_type: 1 | 22 | 27
  /** 终止的具体原因的id列表 */
  termination_reason_list?: string[]
  /** 终止备注 */
  termination_reason_note?: string
}

export interface TransferStageHireApplicationRequest {
  /** 要转移到的阶段 ID，可通过「获取招聘流程信息」接口获取阶段 ID 枚举 */
  stage_id: string
}

export interface ListHireTerminationReasonQuery extends Pagination {
}

export interface GetHireApplicationQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 请求控制参数，用于控制接口响应逻辑。如需一次查询多个用户ID，可通过将同一参数名多次传递，并且每次传递不同的参数值。 */
  options?: 'get_latest_application_on_chain'[]
}

export interface ListHireApplicationQuery extends Pagination {
  /** 按流程过滤，招聘流程 ID，枚举值通过接口「获取招聘流程信息」接口获取 */
  process_id?: string
  /** 按招聘阶段过滤，招聘阶段 ID，枚举值通过「获取招聘流程信息」接口获取 */
  stage_id?: string
  /** 按人才过滤 */
  talent_id?: string
  /** 按活跃状态筛选 1=活跃投递, 2=非活跃投递, 3=全部 */
  active_status?: string
  /** 职位 ID */
  job_id?: string
  /** 锁定状态 */
  lock_status?: 1 | 2 | 3[]
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
}

export interface SearchHireDiversityInclusionRequest {
  /** 需要查询DI数据的人才ID列表 */
  talent_ids?: string[]
  /** 需要查询DI数据的投递ID列表 */
  application_ids?: string[]
}

export interface ListHireEvaluationQuery extends Pagination {
  /** 投递 ID */
  application_id?: string
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
  /** 用户ID类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface CreateHireExamRequest {
  /** 投递 ID */
  application_id: string
  /** 试卷名称 */
  exam_resource_name: string
  /** 笔试分数 */
  score: number
  /** 报告附件，使用[创建附件](/ssl:ttdoc/ukTMukTMukTM/uIDN1YjLyQTN24iM0UjN/create_attachment)上传，获取附件ID，支持的文件格式：JPG、JPEG、PNG、PDF，不超过 100MB。 */
  uuid?: string
  /** 添加人 ID */
  operator_id: string
}

export interface CreateHireExamQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface SearchHireTestRequest {
  /** 投递 ID 列表，最多 100 个，默认查询全部投递 */
  application_id_list?: string[]
  /** 笔试开始时间晚于等于的时间 */
  test_start_time_min?: string
  /** 笔试开始时间早于等于的时间 */
  test_start_time_max?: string
}

export interface SearchHireTestQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListHireInterviewQuery extends Pagination {
  /** 投递 ID */
  application_id?: string
  /** 面试 ID */
  interview_id?: string
  /** 最早开始时间，格式为时间戳 */
  start_time?: string
  /** 最晚开始时间，格式为时间戳 */
  end_time?: string
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetByTalentHireInterviewQuery {
  /** 人才 ID */
  talent_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
}

export interface GetHireInterviewRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetHireInterviewRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListHireInterviewRecordQuery extends Pagination {
  /** 面试评价ID列表，使用该筛选项时不会分页 */
  ids?: string[]
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListHireInterviewRecordQuery extends Pagination {
  /** 面试评价ID列表，使用该筛选项时不会分页 */
  ids?: string[]
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetHireInterviewRecordAttachmentQuery {
  /** 投递 ID */
  application_id: string
  /** 面试记录 ID */
  interview_record_id?: string
  /** 面试记录语言 */
  language?: 1 | 2
}

export interface GetHireMinutesQuery extends Pagination {
  /** 面试ID */
  interview_id: string
}

export interface ListHireQuestionnaireQuery extends Pagination {
  /** 投递 ID */
  application_id?: string
  /** 面试 ID */
  interview_id?: string
  /** 最早更新时间 */
  update_start_time?: string
  /** 最晚更新时间 */
  update_end_time?: string
}

export interface CreateHireOfferRequest {
  /** 投递 ID */
  application_id: string
  /** 模板 ID */
  schema_id?: string
  /** Offer 类型 */
  offer_type?: 1 | 2
  /** Offer 基本信息 */
  basic_info: OfferBasicInfo
  /** Offer 薪资信息 */
  salary_info?: OfferSalaryInfo
  /** 自定义信息 */
  customized_info_list?: OfferCustomizedInfo[]
}

export interface CreateHireOfferQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface UpdateHireOfferRequest {
  /** 模板 ID */
  schema_id: string
  /** Offer 基本信息 */
  basic_info: OfferBasicInfo
  /** Offer 薪资信息 */
  salary_info?: OfferSalaryInfo
  /** 自定义信息 */
  customized_info_list?: OfferCustomizedInfo[]
}

export interface UpdateHireOfferQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface OfferHireApplicationQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface GetHireOfferQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface ListHireOfferQuery extends Pagination {
  /** 人才 ID */
  talent_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface OfferStatusHireOfferRequest {
  /** offer状态 */
  offer_status: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  /** offer 失效时间，当反馈状态是「offer已发出」时为必填项 */
  expiration_date?: string
  /** 终止原因列表，当反馈状态是「候选人已拒绝」时为必填项；最多传入50个 */
  termination_reason_id_list?: string[]
  /** 终止备注 */
  termination_reason_note?: string
}

export interface InternOfferStatusHireOfferRequest {
  /** 更新入/离职状态的操作 */
  operation: 'confirm_onboarding' | 'cancel_onboarding' | 'offboard'
  /** 入职表单信息（当 operation 为 confirm_onboarding 时，该字段必填） */
  onboarding_info?: InternOfferOnboardingInfo
  /** 离职表单信息（当 operation 为 offboard 时，该字段必填） */
  offboarding_info?: InternOfferOffboardingInfo
}

export interface ListHireBackgroundCheckOrderQuery extends Pagination {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 投递 ID */
  application_id?: string
  /** 最早更新时间，毫秒级时间戳 */
  update_start_time?: string
  /** 最晚更新时间，毫秒级时间戳 */
  update_end_time?: string
}

export interface CreateHireTripartiteAgreementRequest {
  /** 投递ID */
  application_id: string
  /** 三方协议状态 */
  state: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  /** 三方协议创建时间，毫秒时间戳 */
  create_time: string
}

export interface ListHireTripartiteAgreementQuery extends Pagination {
  /** 投递 ID，必填投递 id 与三方协议 ID 其中之一 */
  application_id?: string
  /** 三方协议 ID，必填投递 id 与三方协议 ID 其中之一 */
  tripartite_agreement_id?: string
}

export interface UpdateHireTripartiteAgreementRequest {
  /** 三方协议状态 */
  state: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  /** 三方协议修改时间戳，不可小于创建时间或者当前修改时间 */
  modify_time: string
}

export interface PatchHireEhrImportTaskRequest {
  /** 失败原因 */
  fail_reason?: string
  /** 跳转链接 */
  redirect_url?: string
  /** 状态 */
  state: 1 | 2
}

export interface TransferOnboardHireApplicationRequest {
  /** 实际入职时间 */
  actual_onboard_time?: number
  /** 预期转正时间 */
  expected_conversion_time?: number
  /** 招聘需求 ID */
  job_requirement_id?: string
  /** 操作人 UserID */
  operator_id?: string
  /** 候选人办公地点 ID ，枚举可通过接口「获取地址列表」获取，将用于候选人内推奖规则判断 */
  onboard_city_code?: string
  /** 候选人入职部门 ID ，枚举可通过接口「获取部门信息列表」获取，将用于候选人内推奖规则判断 */
  department?: string
  /** 候选人直属上级 UserID ，将用于候选人内推奖规则判断 */
  leader?: string
  /** 候选人序列 ID ，枚举可通过接口「获取职务分类列表」获取，将用于候选人内推奖规则判断 */
  sequence?: string
  /** 候选人职级 ID ，枚举可通过接口「获取职级列表」获取，将用于候选人内推奖规则判断 */
  level?: string
  /** 候选人入职人员类型 ID，可通过接口人力资源管理平台「获取员工类型列表」获取，将用于候选人内推奖规则判断 */
  employee_type?: string
}

export interface TransferOnboardHireApplicationQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_admin_department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface PatchHireEmployeeRequest {
  /** 修改状态操作 */
  operation: 1 | 2
  conversion_info?: EmployeeConversionInfo
  overboard_info?: EmployeeOverboardInfo
}

export interface PatchHireEmployeeQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_admin_department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface GetByApplicationHireEmployeeQuery {
  /** 投递ID */
  application_id: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_admin_department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface GetHireEmployeeQuery {
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
  /** 此次调用中使用的部门 ID 的类型 */
  department_id_type?: 'open_department_id' | 'department_id' | 'people_admin_department_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
  /** 此次调用中使用的「序列 ID」的类型 */
  job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
  /** 此次调用中使用的「人员类型 ID」的类型 */
  employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
}

export interface ListHireTodoQuery extends Pagination {
  /** 用户 ID，当 token 为租户 token 时，必须传入该字段，当 token 为用户 token 时，不传该字段 */
  user_id?: string
  /** 用户 ID 类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 待办类型 */
  type: 'evaluation' | 'offer' | 'exam' | 'interview'
}

export interface ListHireEvaluationTaskQuery extends Pagination {
  /** 用户 ID */
  user_id: string
  /** 任务状态 */
  activity_status?: 1 | 2 | 3
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ListHireExamMarkingTaskQuery extends Pagination {
  /** 用户 ID */
  user_id: string
  /** 任务状态 */
  activity_status?: 1 | 2
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ListHireInterviewTaskQuery extends Pagination {
  /** 用户 ID */
  user_id: string
  /** 任务状态 */
  activity_status?: 1 | 2 | 3 | 5
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface CreateHireNoteRequest {
  /** 人才ID */
  talent_id: string
  /** 投递ID */
  application_id?: string
  /** 创建人ID */
  creator_id?: string
  /** 内容 */
  content: string
  /** 备注私密属性（默认为公开） */
  privacy?: 1 | 2
  /** 是否通知被@的用户 */
  notify_mentioned_user?: boolean
  /** 被@用户列表 */
  mention_entity_list?: MentionEntity[]
}

export interface CreateHireNoteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface PatchHireNoteRequest {
  /** 备注内容 */
  content: string
  /** 更新人 ID */
  operator_id?: string
  /** 是否通知被@的用户 */
  notify_mentioned_user?: boolean
  /** 被@用户列表 */
  mention_entity_list?: MentionEntity[]
}

export interface PatchHireNoteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface GetHireNoteQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ListHireNoteQuery extends Pagination {
  /** 人才ID */
  talent_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface ListHireResumeSourceQuery extends Pagination {
}

export interface CreateHireEcoAccountCustomFieldRequest {
  /** 适用范围 */
  scope: 1 | 2
  /** 自定义字段列表 */
  custom_field_list: EcoAccountCustomFieldData[]
}

export interface BatchUpdateHireEcoAccountCustomFieldRequest {
  /** 适用范围 */
  scope: 1 | 2
  /** 自定义字段列表 */
  custom_field_list: EcoAccountCustomFieldData[]
}

export interface BatchDeleteHireEcoAccountCustomFieldRequest {
  /** 适用范围 */
  scope: 1 | 2
  /** 要删除的自定义字段的 key 列表 */
  custom_field_key_list?: string[]
}

export interface CreateHireEcoBackgroundCheckCustomFieldRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 自定义字段列表 */
  custom_field_list: EcoBackgroundCheckCustomFieldData[]
}

export interface BatchUpdateHireEcoBackgroundCheckCustomFieldRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 自定义字段列表 */
  custom_field_list: EcoBackgroundCheckCustomFieldData[]
}

export interface BatchDeleteHireEcoBackgroundCheckCustomFieldRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
}

export interface CreateHireEcoBackgroundCheckPackageRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 背调套餐列表 */
  package_list: EcoBackgroundCheckPackageData[]
  /** 附加调查项列表 */
  additional_item_list?: EcoBackgroundCheckPackageAdditionalItem[]
}

export interface BatchUpdateHireEcoBackgroundCheckPackageRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 背调套餐列表 */
  package_list: EcoBackgroundCheckPackageData[]
  /** 附加调查项列表 */
  additional_item_list?: EcoBackgroundCheckPackageAdditionalItem[]
}

export interface BatchDeleteHireEcoBackgroundCheckPackageRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 要删除的套餐 ID 列表，删除套餐不影响已安排的背调 */
  package_id_list?: string[]
  /** 要删除的附加调查项 ID 列表，删除附加调查项不影响已安排的背调 */
  additional_item_id_list?: string[]
}

export interface UpdateProgressHireEcoBackgroundCheckRequest {
  /** 背调 ID，招聘侧的 ID */
  background_check_id: string
  /** 阶段 ID，同一背调订单此 ID 不能重复 */
  stage_id: string
  /** 背调阶段英文名称 */
  stage_en_name?: string
  /** 背调阶段名称 */
  stage_name: string
  /** 进入到此背调阶段的时间 */
  stage_time: string
  /** 阶段性背调结果 */
  result?: string
  /** 操作人角色，默认值为 1 */
  operator_role?: 1 | 2
  /** 报告列表 */
  report_file_list?: EcoBackgroundCheckReportFile[]
}

export interface UpdateResultHireEcoBackgroundCheckRequest {
  /** 背调 ID */
  background_check_id: string
  /** 背调结果 */
  result: string
  /** 背调结果时间 */
  result_time: string
  /** 操作人角色，默认值为 1 */
  operator_role?: 1 | 2
  /** 报告列表 */
  report_file_list?: EcoBackgroundCheckReportFile[]
}

export interface CancelHireEcoBackgroundCheckRequest {
  /** 背调 ID */
  background_check_id: string
}

export interface CreateHireEcoExamPaperRequest {
  /** 账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 试卷列表 */
  paper_list: EcoExamPaperData[]
}

export interface BatchUpdateHireEcoExamPaperRequest {
  /** 账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 试卷列表 */
  paper_list: EcoExamPaperData[]
}

export interface BatchDeleteHireEcoExamPaperRequest {
  /** 背调账号 ID，可在「账号绑定」事件中获取 */
  account_id: string
  /** 试卷 ID 列表 */
  paper_id_list: string[]
}

export interface LoginInfoHireEcoExamRequest {
  /** 状态码，0-成功 非零-错误码 */
  result?: number
  /** 成功或失败的描述信息 */
  msg?: string
  /** 笔试作答信息 */
  exam_login_info: EcoExamLoginInfo
}

export interface UpdateResultHireEcoExamRequest {
  /** 笔试结果 */
  result: string
  /** 笔试结果时间 */
  result_time?: string
  /** 报告列表 */
  report_list?: EcoExamResultReport[]
  /** 详细评价结果 */
  detail_list?: EcoExamResultDetail[]
}

export interface EnableHireReferralAccountRequest {
  /** 账户 ID */
  referral_account_id?: string
}

export interface EnableHireReferralAccountQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetAccountAssetsHireReferralAccountQuery {
  /** 账户 ID */
  referral_account_id: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateHireReferralAccountRequest {
  /** 电话 */
  mobile?: Mobile
  /** 邮箱 */
  email?: string
}

export interface CreateHireReferralAccountQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeactivateHireReferralAccountQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface WithdrawHireReferralAccountRequest {
  /** 请求提现的奖励类型 */
  withdraw_bonus_type: 1 | 2[]
  /** 提现单ID，请求时由请求方提供，后续关于本次提现操作的交互都以此提现单ID为标识进行，需要保证唯一,用于保证提现的幂等性，传入重复ID会返回对应提现单提取的金额明细 */
  external_order_id: string
}

export interface ReconciliationHireReferralAccountRequest {
  /** 按时间范围进行对账时 时间段的起始交易时间 */
  start_trans_time: string
  /** 按时间范围进行对账时 时间段的截止交易时间 */
  end_trans_time: string
  /** 交易信息 */
  trade_details?: TradeDetail[]
}

export interface GetHireAttachmentQuery {
  /** 附件类型 */
  type?: 1 | 2 | 3
}

export interface ListHireApplicationInterviewQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 此次调用中使用的「职级 ID」的类型 */
  job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
}

export interface SearchHireTalentOperationLogRequest {
  /** 职位 ID 列表 */
  job_id_list?: string[]
  /** 操作人 ID 列表 */
  operator_id_list: string[]
  /** 操作类型 ID 列表 */
  operation_list: number[]
}

export interface SearchHireTalentOperationLogQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetHireJobManagerQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
}

export interface GetHireRoleResponse {
  /** 角色详情 */
  role?: RoleDetail
}

export interface CombinedCreateHireJobResponse {
  /** 职位广告 */
  default_job_post?: CombinedJobResultDefaultJobPost
  /** 职位 */
  job?: Job
  /** 职位负责人 */
  job_manager?: JobManager
  /** 面试登记表 */
  interview_registration_schema_info?: RegistrationSchemaInfo
  /** 入职登记表 */
  onboard_registration_schema_info?: RegistrationSchemaInfo
  /** 目标专业 */
  target_major_list?: TargetMajorInfo[]
  /** 官网申请表 */
  portal_website_apply_form_schema_info?: RegistrationSchemaInfo
}

export interface CombinedUpdateHireJobResponse {
  /** 职位广告 */
  default_job_post?: CombinedJobResultDefaultJobPost
  /** 职位 */
  job?: Job
  /** 职位负责人 */
  job_manager?: JobManager
  /** 官网申请表 */
  portal_website_apply_form_schema_info?: RegistrationSchemaInfo
}

export interface UpdateConfigHireJobResponse {
  job_config?: JobConfigResult
}

export interface BatchUpdateHireJobManagerResponse {
  /** 职位负责人 */
  job_manager?: JobManager
}

export interface GetDetailHireJobResponse {
  /** 职位详情数据 */
  job_detail?: JobDetail
}

export interface GetHireJobResponse {
  /** 职位数据 */
  job?: Job
}

export interface RecruiterHireJobResponse {
  /** 职位负责人 */
  info?: JobRecruiter2
}

export interface ConfigHireJobResponse {
  job_config?: JobConfigResult
}

export interface CreateHireJobRequirementResponse {
  job_requirement?: JobRequirementDto
}

export interface ListByIdHireJobRequirementResponse {
  /** 招聘需求列表 */
  items?: JobRequirementDto[]
}

export interface ListHireInterviewRoundTypeResponse {
  /** 是否启用面试轮次类型 */
  active_status?: 1 | 2
  /** 列表 */
  items?: InterviewRoundType[]
}

export interface PatchHireInterviewerResponse {
  /** 面试官信息 */
  interviewer?: Interviewer
}

export interface GetHireOfferApplicationFormResponse {
  /** Offer 申请表详情 */
  offer_apply_form?: OfferApplyFormInfo
}

export interface SearchHireReferralResponse {
  /** 内推信息列表 */
  items?: ReferralInfo[]
}

export interface GetHireReferralWebsiteJobPostResponse {
  job_post?: PortalJobPost
}

export interface GetByApplicationHireReferralResponse {
  /** 内推信息 */
  referral?: Referral
}

export interface CreateHireWebsiteChannelResponse {
  /** 推广渠道 ID */
  id?: string
  /** 推广渠道名称 */
  name?: string
  /** 推广渠道链接 */
  link?: string
  /** 推广渠道推广码 */
  code?: string
}

export interface UpdateHireWebsiteChannelResponse {
  /** 推广渠道 ID */
  id?: string
  /** 推广渠道名称 */
  name?: string
  /** 推广渠道链接 */
  link?: string
  /** 推广渠道推广码 */
  code?: string
}

export interface CreateHireWebsiteSiteUserResponse {
  site_user?: WebsiteUser
}

export interface GetHireWebsiteJobPostResponse {
  job_post?: WebsiteJobPost
}

export interface CreateByResumeHireWebsiteDeliveryResponse {
  delivery?: WebsiteDeliveryDto
}

export interface CreateByAttachmentHireWebsiteDeliveryResponse {
  /** 异步任务 ID */
  task_id?: string
}

export interface GetHireWebsiteDeliveryTaskResponse {
  /** 任务状态 */
  status?: 0 | 1 | 2 | 3
  /** 官网投递信息 */
  delivery?: WebsiteDeliveryDto
  /** 状态信息，仅 status 为 3 时返回 */
  status_msg?: string
  /** 附加信息，当前返回投递 ID，仅当 status 为 3 且 status_msg 标识为重复投递时，将返回重复投递的 ID */
  extra_info?: string
}

export interface GetHireAgencyResponse {
  /** 数据 */
  agency?: Agency
}

export interface ProtectSearchHireAgencyResponse {
  /** 是否已入职 */
  is_onboarded?: boolean
  /** 是否在猎头保护期内入职 */
  onboarded_in_protection?: boolean
  /** 入职所在保护期 */
  onboarded_protection?: AgencyProtection
  /** 人才保护信息 */
  protection_list?: AgencyProtection[]
}

export interface QueryHireAgencyResponse {
  items?: Agency[]
}

export interface CreateHireTalentExternalInfoResponse {
  /** 人才外部信息 */
  external_info?: TalentExternalInfo
}

export interface UpdateHireTalentExternalInfoResponse {
  /** 人才外部信息 */
  external_info?: TalentExternalInfo
}

export interface CreateHireExternalApplicationResponse {
  external_application?: ExternalApplication
}

export interface UpdateHireExternalApplicationResponse {
  external_application?: ExternalApplication
}

export interface DeleteHireExternalApplicationResponse {
  external_application?: ExternalApplication
}

export interface CreateHireExternalInterviewResponse {
  external_interview?: ExternalInterview
}

export interface UpdateHireExternalInterviewResponse {
  external_interview?: ExternalInterview
}

export interface CreateHireExternalInterviewAssessmentResponse {
  external_interview_assessment?: ExternalInterviewAssessment
}

export interface PatchHireExternalInterviewAssessmentResponse {
  external_interview_assessment?: ExternalInterviewAssessment
}

export interface CreateHireExternalOfferResponse {
  external_offer?: ExternalOffer
}

export interface UpdateHireExternalOfferResponse {
  external_offer?: ExternalOffer
}

export interface CreateHireExternalBackgroundCheckResponse {
  external_background_check?: ExternalBackgroundCheck
}

export interface UpdateHireExternalBackgroundCheckResponse {
  external_background_check?: ExternalBackgroundCheck
}

export interface CreateHireExternalReferralRewardResponse {
  /** 创建的内推奖励的id */
  id?: string
}

export interface MoveTalentHireTalentPoolResponse {
  /** 人才库ID */
  talent_pool_id?: string
  /** 人才ID */
  talent_id?: string
}

export interface CombinedCreateHireTalentResponse {
  /** 人才 ID */
  talent_id?: string
  /** 创建人 ID */
  creator_id?: string
  /** 创建人类型 */
  creator_account_type?: 1 | 3
}

export interface CombinedUpdateHireTalentResponse {
  /** 人才 ID */
  talent_id?: string
  /** 更新人 ID */
  operator_id?: string
  /** 更新人类型 */
  operator_account_type?: 1 | 3
}

export interface AddToFolderHireTalentResponse {
  /** 人才 ID 列表 */
  talent_id_list?: string[]
  /** 文件夹 ID */
  folder_id?: string
}

export interface RemoveToFolderHireTalentResponse {
  /** 人才 ID 列表 */
  talent_id_list?: string[]
  /** 文件夹 ID */
  folder_id?: string
}

export interface BatchGetIdHireTalentResponse {
  /** 人才信息列表 */
  talent_list?: TalentBatchInfo[]
}

export interface QueryHireTalentObjectResponse {
  items?: CommonSchema[]
}

export interface GetHireTalentResponse {
  /** 人才信息 */
  talent?: Talent
}

export interface GetHireTalentResponse {
  /** ID */
  talent_id?: string
  /** 基础信息 */
  basic_info?: CompositeTalentBasicInfo
  /** 教育经历 */
  education_list?: CompositeTalentEducationInfo[]
  /** 工作经历 */
  career_list?: CompositeTalentCareerInfo[]
  /** 项目经历 */
  project_list?: CompositeTalentProjectInfo[]
  /** 作品集 */
  works_list?: CompositeTalentWorksInfo[]
  /** 获奖列表 */
  award_list?: CompositeTalentAwardInfo[]
  /** 语言列表 */
  language_list?: CompositeTalentLanguageInfo[]
  /** SNS列表 */
  sns_list?: CompositeTalentSnsInfo[]
  /** 简历来源 */
  resume_source_list?: TalentResumeSource[]
  /** 实习经历 */
  internship_list?: CompositeTalentInternshipInfo[]
  /** 自定义字段 */
  customized_data_list?: CompositeTalentCustomizedData[]
  /** 简历附件id列表（按照简历创建时间降序）（废弃，请使用resume_attachment_list代替） */
  resume_attachment_id_list?: string[]
  /** 简历附件列表（按照简历创建时间降序） */
  resume_attachment_list?: TalentResumeAttachment[]
  /** 面试登记表 */
  interview_registration_list?: TalentInterviewRegistrationSimple[]
  /** 登记表列表 */
  registration_list?: RegistrationBasicInfo[]
  /** 是否已入职 */
  is_onboarded?: boolean
  /** 是否在猎头保护期 */
  is_in_agency_period?: boolean
  /** 最高学历 参考 DegreeType 枚举 */
  top_degree?: number
  /** 人才已加入的人才库列表 */
  talent_pool_id_list?: string[]
  /** 文件夹列表 */
  talent_folder_ref_list_v2?: TalentFolder[]
  /** 标签列表 */
  tag_list?: TalentTag[]
  /** 相似人才信息 */
  similar_info_v2?: TalentSimilar
  /** 人才黑名单详情 */
  block_info?: TalentBlock
  /** 人才已经加入的人才库列表 */
  talent_pool_ref_list_v2?: TalentPool[]
  /** 备注列表 */
  note_list_v2?: TalentNote[]
}

export interface GetDetailHireApplicationResponse {
  /** 投递详情 */
  application_detail?: ApplicationDetailInfo
}

export interface CreateHireApplicationResponse {
  /** 投递ID */
  id?: string
}

export interface GetHireApplicationResponse {
  /** 投递数据 */
  application?: Application
}

export interface SearchHireDiversityInclusionResponse {
  /** 多元化与包容性信息列表 */
  items?: DiInfo[]
}

export interface CreateHireExamResponse {
  /** 笔试 ID */
  exam_id?: string
  /** 投递 ID */
  application_id?: string
  /** 试卷名称 */
  exam_resource_name?: string
  /** 笔试分数 */
  score?: number
  /** 附件ID */
  uuid?: string
  /** 操作人 ID */
  operator_id?: string
  /** 操作时间 */
  operate_time?: string
}

export interface GetByTalentHireInterviewResponse {
  /** 投递面试列表 */
  items?: TalentInterview[]
}

export interface GetHireInterviewRecordResponse {
  /** 数据 */
  interview_record?: InterviewRecord
}

export interface GetHireInterviewRecordResponse {
  interview_record?: InterviewRecord
}

export interface GetHireInterviewRecordAttachmentResponse {
  /** 附件信息 */
  attachment?: AttachmentInfo
}

export interface GetHireMinutesResponse {
  minutes?: Minutes
  /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
  page_token?: string
  /** 对应面试是否还有更多项 */
  has_more?: boolean
}

export interface CreateHireOfferResponse {
  /** Offer ID */
  offer_id?: string
  /** 投递 ID */
  application_id?: string
  /** 模板 ID */
  schema_id?: string
  /** Offer 类型 */
  offer_type?: 1 | 2
  /** Offer 基本信息 */
  basic_info?: OfferBasicInfo
  /** Offer 薪资信息 */
  salary_info?: OfferSalaryInfo
  /** 自定义信息 */
  customized_info_list?: OfferCustomizedInfo[]
}

export interface UpdateHireOfferResponse {
  /** Offer ID */
  offer_id?: string
  /** 模板 ID */
  schema_id?: string
  /** Offer 基本信息 */
  basic_info?: OfferBasicInfo
  /** Offer 薪资信息 */
  salary_info?: OfferSalaryInfo
  /** 自定义信息 */
  customized_info_list?: OfferCustomizedInfo[]
}

export interface OfferHireApplicationResponse {
  offer?: ApplicationOffer
}

export interface GetHireOfferResponse {
  /** Offer 详情 */
  offer?: Offer
}

export interface InternOfferStatusHireOfferResponse {
  /** Offer ID */
  offer_id?: string
  /** 更新入/离职状态的操作 */
  operation: 'confirm_onboarding' | 'cancel_onboarding' | 'offboard'
  /** 入职表单信息（当 operation 为 confirm_onboarding 时，该字段必填） */
  onboarding_info?: InternOfferOnboardingInfo
  /** 离职表单信息（当 operation 为 offboard 时，该字段必填） */
  offboarding_info?: InternOfferOffboardingInfo
}

export interface CreateHireTripartiteAgreementResponse {
  /** 创建的三方协议的 id */
  id?: string
}

export interface UpdateHireTripartiteAgreementResponse {
  /** 三方协议信息 */
  tripartite_agreement?: TripartiteAgreementInfo
}

export interface TransferOnboardHireApplicationResponse {
  /** employee */
  employee?: Employee
}

export interface PatchHireEmployeeResponse {
  /** 员工信息 */
  employee?: Employee
}

export interface GetByApplicationHireEmployeeResponse {
  /** 员工信息 */
  employee?: Employee
}

export interface GetHireEmployeeResponse {
  /** 员工信息 */
  employee?: Employee
}

export interface CreateHireNoteResponse {
  note?: Note
}

export interface PatchHireNoteResponse {
  /** 备注数据 */
  note?: Note
}

export interface GetHireNoteResponse {
  /** 备注数据 */
  note?: Note
}

export interface EnableHireReferralAccountResponse {
  /** 账号信息 */
  account?: Account
}

export interface GetAccountAssetsHireReferralAccountResponse {
  /** 账户信息 */
  account?: Account
}

export interface CreateHireReferralAccountResponse {
  /** 账号信息 */
  account?: Account
}

export interface DeactivateHireReferralAccountResponse {
  /** 账号信息 */
  account?: Account
}

export interface WithdrawHireReferralAccountResponse {
  /** 请求时传入的提现单ID */
  external_order_id?: string
  /** 交易时间戳，需要保存，用于统一交易时间，方便对账 */
  trans_time?: string
  /** 本次提现金额明细 */
  withdrawal_details?: BonusAmount
}

export interface ReconciliationHireReferralAccountResponse {
  /** 核对失败的信息 */
  check_failed_list?: CheckFailedAccountInfo[]
}

export interface CreateHireAttachmentResponse {
  /** 上传文件的 id */
  id?: string
}

export interface GetHireAttachmentResponse {
  /** 附件信息 */
  attachment?: Attachment
}

export interface PreviewHireAttachmentResponse {
  /** 预览链接 */
  url: string
}

export interface GetHireJobManagerResponse {
  /** 职位负责人 */
  info?: JobManager
}

export interface GetHireOfferSchemaResponse {
  /** offer申请表ID */
  id?: string
  /** offer申请表使用场景 */
  scenario?: 1
  /** 申请表版本 */
  version?: number
  /** 字段对象信息 */
  object_list?: OfferSchemaDetail[]
}

Internal.define({
  '/open-apis/hire/v1/locations/query': {
    POST: 'queryHireLocation',
  },
  '/open-apis/hire/v1/locations': {
    GET: 'listHireLocation',
  },
  '/open-apis/hire/v1/roles/{role_id}': {
    GET: 'getHireRole',
  },
  '/open-apis/hire/v1/roles': {
    GET: 'listHireRole',
  },
  '/open-apis/hire/v1/user_roles': {
    GET: 'listHireUserRole',
  },
  '/open-apis/hire/v1/jobs/combined_create': {
    POST: 'combinedCreateHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}/combined_update': {
    POST: 'combinedUpdateHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}/update_config': {
    POST: 'updateConfigHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}/managers/batch_update': {
    POST: 'batchUpdateHireJobManager',
  },
  '/open-apis/hire/v1/jobs/{job_id}/get_detail': {
    GET: 'getDetailHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}': {
    GET: 'getHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}/recruiter': {
    GET: 'recruiterHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}/config': {
    GET: 'configHireJob',
  },
  '/open-apis/hire/v1/jobs': {
    GET: 'listHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}/close': {
    POST: 'closeHireJob',
  },
  '/open-apis/hire/v1/jobs/{job_id}/open': {
    POST: 'openHireJob',
  },
  '/open-apis/hire/v1/job_schemas': {
    GET: 'listHireJobSchema',
  },
  '/open-apis/hire/v1/advertisements/{advertisement_id}/publish': {
    POST: 'publishHireAdvertisement',
  },
  '/open-apis/hire/v1/job_publish_records/search': {
    POST: 'searchHireJobPublishRecord',
  },
  '/open-apis/hire/v1/job_functions': {
    GET: 'listHireJobFunction',
  },
  '/open-apis/hire/v1/job_types': {
    GET: 'listHireJobType',
  },
  '/open-apis/hire/v1/job_requirements': {
    POST: 'createHireJobRequirement',
    GET: 'listHireJobRequirement',
  },
  '/open-apis/hire/v1/job_requirements/{job_requirement_id}': {
    PUT: 'updateHireJobRequirement',
    DELETE: 'deleteHireJobRequirement',
  },
  '/open-apis/hire/v1/job_requirements/search': {
    POST: 'listByIdHireJobRequirement',
  },
  '/open-apis/hire/v1/job_requirement_schemas': {
    GET: 'listHireJobRequirementSchema',
  },
  '/open-apis/hire/v1/job_processes': {
    GET: 'listHireJobProcess',
  },
  '/open-apis/hire/v1/subjects': {
    GET: 'listHireSubject',
  },
  '/open-apis/hire/v1/talent_tags': {
    GET: 'listHireTalentTag',
  },
  '/open-apis/hire/v1/registration_schemas': {
    GET: 'listHireRegistrationSchema',
  },
  '/open-apis/hire/v1/interview_feedback_forms': {
    GET: 'listHireInterviewFeedbackForm',
  },
  '/open-apis/hire/v1/interview_round_types': {
    GET: 'listHireInterviewRoundType',
  },
  '/open-apis/hire/v1/interview_registration_schemas': {
    GET: 'listHireInterviewRegistrationSchema',
  },
  '/open-apis/hire/v1/interviewers': {
    GET: 'listHireInterviewer',
  },
  '/open-apis/hire/v1/interviewers/{interviewer_id}': {
    PATCH: 'patchHireInterviewer',
  },
  '/open-apis/hire/v1/offer_custom_fields/{offer_custom_field_id}': {
    PUT: 'updateHireOfferCustomField',
  },
  '/open-apis/hire/v1/offer_application_forms/{offer_application_form_id}': {
    GET: 'getHireOfferApplicationForm',
  },
  '/open-apis/hire/v1/offer_application_forms': {
    GET: 'listHireOfferApplicationForm',
  },
  '/open-apis/hire/v1/referrals/search': {
    POST: 'searchHireReferral',
  },
  '/open-apis/hire/v1/referral_websites/job_posts': {
    GET: 'listHireReferralWebsiteJobPost',
  },
  '/open-apis/hire/v1/referral_websites/job_posts/{job_post_id}': {
    GET: 'getHireReferralWebsiteJobPost',
  },
  '/open-apis/hire/v1/referrals/get_by_application': {
    GET: 'getByApplicationHireReferral',
  },
  '/open-apis/hire/v1/websites/{website_id}/channels': {
    POST: 'createHireWebsiteChannel',
    GET: 'listHireWebsiteChannel',
  },
  '/open-apis/hire/v1/websites/{website_id}/channels/{channel_id}': {
    DELETE: 'deleteHireWebsiteChannel',
    PUT: 'updateHireWebsiteChannel',
  },
  '/open-apis/hire/v1/websites/{website_id}/site_users': {
    POST: 'createHireWebsiteSiteUser',
  },
  '/open-apis/hire/v1/websites/{website_id}/job_posts/{job_post_id}': {
    GET: 'getHireWebsiteJobPost',
  },
  '/open-apis/hire/v1/websites/{website_id}/job_posts/search': {
    POST: 'searchHireWebsiteJobPost',
  },
  '/open-apis/hire/v1/websites/{website_id}/job_posts': {
    GET: 'listHireWebsiteJobPost',
  },
  '/open-apis/hire/v1/websites/{website_id}/deliveries/create_by_resume': {
    POST: 'createByResumeHireWebsiteDelivery',
  },
  '/open-apis/hire/v1/websites/{website_id}/deliveries/create_by_attachment': {
    POST: 'createByAttachmentHireWebsiteDelivery',
  },
  '/open-apis/hire/v1/websites/{website_id}/delivery_tasks/{delivery_task_id}': {
    GET: 'getHireWebsiteDeliveryTask',
  },
  '/open-apis/hire/v1/websites': {
    GET: 'listHireWebsite',
  },
  '/open-apis/hire/v1/agencies/protect': {
    POST: 'protectHireAgency',
  },
  '/open-apis/hire/v1/agencies/{agency_id}': {
    GET: 'getHireAgency',
  },
  '/open-apis/hire/v1/agencies/protection_period/search': {
    POST: 'protectSearchHireAgency',
  },
  '/open-apis/hire/v1/agencies/query': {
    GET: 'queryHireAgency',
  },
  '/open-apis/hire/v1/agencies/get_agency_account': {
    POST: 'getAgencyAccountHireAgency',
  },
  '/open-apis/hire/v1/agencies/batch_query': {
    POST: 'batchQueryHireAgency',
  },
  '/open-apis/hire/v1/agencies/operate_agency_account': {
    POST: 'operateAgencyAccountHireAgency',
  },
  '/open-apis/hire/v1/talents/{talent_id}/external_info': {
    POST: 'createHireTalentExternalInfo',
    PUT: 'updateHireTalentExternalInfo',
  },
  '/open-apis/hire/v1/external_applications': {
    POST: 'createHireExternalApplication',
    GET: 'listHireExternalApplication',
  },
  '/open-apis/hire/v1/external_applications/{external_application_id}': {
    PUT: 'updateHireExternalApplication',
    DELETE: 'deleteHireExternalApplication',
  },
  '/open-apis/hire/v1/external_interviews': {
    POST: 'createHireExternalInterview',
  },
  '/open-apis/hire/v1/external_interviews/{external_interview_id}': {
    PUT: 'updateHireExternalInterview',
    DELETE: 'deleteHireExternalInterview',
  },
  '/open-apis/hire/v1/external_interviews/batch_query': {
    POST: 'batchQueryHireExternalInterview',
  },
  '/open-apis/hire/v1/external_interview_assessments': {
    POST: 'createHireExternalInterviewAssessment',
  },
  '/open-apis/hire/v1/external_interview_assessments/{external_interview_assessment_id}': {
    PATCH: 'patchHireExternalInterviewAssessment',
  },
  '/open-apis/hire/v1/external_offers': {
    POST: 'createHireExternalOffer',
  },
  '/open-apis/hire/v1/external_offers/{external_offer_id}': {
    PUT: 'updateHireExternalOffer',
    DELETE: 'deleteHireExternalOffer',
  },
  '/open-apis/hire/v1/external_offers/batch_query': {
    POST: 'batchQueryHireExternalOffer',
  },
  '/open-apis/hire/v1/external_background_checks': {
    POST: 'createHireExternalBackgroundCheck',
  },
  '/open-apis/hire/v1/external_background_checks/{external_background_check_id}': {
    PUT: 'updateHireExternalBackgroundCheck',
    DELETE: 'deleteHireExternalBackgroundCheck',
  },
  '/open-apis/hire/v1/external_background_checks/batch_query': {
    POST: 'batchQueryHireExternalBackgroundCheck',
  },
  '/open-apis/hire/v1/external_referral_rewards': {
    POST: 'createHireExternalReferralReward',
  },
  '/open-apis/hire/v1/external_referral_rewards/{external_referral_reward_id}': {
    DELETE: 'deleteHireExternalReferralReward',
  },
  '/open-apis/hire/v1/talent_pools/{talent_pool_id}/batch_change_talent_pool': {
    POST: 'batchChangeTalentPoolHireTalentPool',
  },
  '/open-apis/hire/v1/talent_pools/': {
    GET: 'searchHireTalentPool',
  },
  '/open-apis/hire/v1/talent_pools/{talent_pool_id}/talent_relationship': {
    POST: 'moveTalentHireTalentPool',
  },
  '/open-apis/hire/v1/talents/{talent_id}/tag': {
    POST: 'tagHireTalent',
  },
  '/open-apis/hire/v1/talents/combined_create': {
    POST: 'combinedCreateHireTalent',
  },
  '/open-apis/hire/v1/talents/combined_update': {
    POST: 'combinedUpdateHireTalent',
  },
  '/open-apis/hire/v1/talents/add_to_folder': {
    POST: 'addToFolderHireTalent',
  },
  '/open-apis/hire/v1/talents/remove_to_folder': {
    POST: 'removeToFolderHireTalent',
  },
  '/open-apis/hire/v1/talent_folders': {
    GET: 'listHireTalentFolder',
  },
  '/open-apis/hire/v1/talents/batch_get_id': {
    POST: 'batchGetIdHireTalent',
  },
  '/open-apis/hire/v1/talents': {
    GET: 'listHireTalent',
  },
  '/open-apis/hire/v1/talent_objects/query': {
    GET: 'queryHireTalentObject',
  },
  '/open-apis/hire/v1/talents/{talent_id}': {
    GET: 'getHireTalent',
  },
  '/open-apis/hire/v2/talents/{talent_id}': {
    GET: 'getHireTalent',
  },
  '/open-apis/hire/v1/talents/{talent_id}/onboard_status': {
    POST: 'onboardStatusHireTalent',
  },
  '/open-apis/hire/v1/talent_blocklist/change_talent_block': {
    POST: 'changeTalentBlockHireTalentBlocklist',
  },
  '/open-apis/hire/v1/applications/{application_id}/get_detail': {
    GET: 'getDetailHireApplication',
  },
  '/open-apis/hire/v1/applications/{application_id}/recover': {
    POST: 'recoverHireApplication',
  },
  '/open-apis/hire/v1/applications': {
    POST: 'createHireApplication',
    GET: 'listHireApplication',
  },
  '/open-apis/hire/v1/applications/{application_id}/terminate': {
    POST: 'terminateHireApplication',
  },
  '/open-apis/hire/v1/applications/{application_id}/transfer_stage': {
    POST: 'transferStageHireApplication',
  },
  '/open-apis/hire/v1/termination_reasons': {
    GET: 'listHireTerminationReason',
  },
  '/open-apis/hire/v1/applications/{application_id}': {
    GET: 'getHireApplication',
  },
  '/open-apis/hire/v1/applications/diversity_inclusions/search': {
    POST: 'searchHireDiversityInclusion',
  },
  '/open-apis/hire/v1/evaluations': {
    GET: 'listHireEvaluation',
  },
  '/open-apis/hire/v1/exams': {
    POST: 'createHireExam',
  },
  '/open-apis/hire/v1/tests/search': {
    POST: 'searchHireTest',
  },
  '/open-apis/hire/v1/interviews': {
    GET: 'listHireInterview',
  },
  '/open-apis/hire/v1/interviews/get_by_talent': {
    GET: 'getByTalentHireInterview',
  },
  '/open-apis/hire/v1/interview_records/{interview_record_id}': {
    GET: 'getHireInterviewRecord',
  },
  '/open-apis/hire/v2/interview_records/{interview_record_id}': {
    GET: 'getHireInterviewRecord',
  },
  '/open-apis/hire/v1/interview_records': {
    GET: 'listHireInterviewRecord',
  },
  '/open-apis/hire/v2/interview_records': {
    GET: 'listHireInterviewRecord',
  },
  '/open-apis/hire/v1/interview_records/attachments': {
    GET: 'getHireInterviewRecordAttachment',
  },
  '/open-apis/hire/v1/minutes': {
    GET: 'getHireMinutes',
  },
  '/open-apis/hire/v1/questionnaires': {
    GET: 'listHireQuestionnaire',
  },
  '/open-apis/hire/v1/offers': {
    POST: 'createHireOffer',
    GET: 'listHireOffer',
  },
  '/open-apis/hire/v1/offers/{offer_id}': {
    PUT: 'updateHireOffer',
    GET: 'getHireOffer',
  },
  '/open-apis/hire/v1/applications/{application_id}/offer': {
    GET: 'offerHireApplication',
  },
  '/open-apis/hire/v1/offers/{offer_id}/offer_status': {
    PATCH: 'offerStatusHireOffer',
  },
  '/open-apis/hire/v1/offers/{offer_id}/intern_offer_status': {
    POST: 'internOfferStatusHireOffer',
  },
  '/open-apis/hire/v1/background_check_orders': {
    GET: 'listHireBackgroundCheckOrder',
  },
  '/open-apis/hire/v1/tripartite_agreements': {
    POST: 'createHireTripartiteAgreement',
    GET: 'listHireTripartiteAgreement',
  },
  '/open-apis/hire/v1/tripartite_agreements/{tripartite_agreement_id}': {
    PUT: 'updateHireTripartiteAgreement',
    DELETE: 'deleteHireTripartiteAgreement',
  },
  '/open-apis/hire/v1/ehr_import_tasks/{ehr_import_task_id}': {
    PATCH: 'patchHireEhrImportTask',
  },
  '/open-apis/hire/v1/applications/{application_id}/transfer_onboard': {
    POST: 'transferOnboardHireApplication',
  },
  '/open-apis/hire/v1/employees/{employee_id}': {
    PATCH: 'patchHireEmployee',
    GET: 'getHireEmployee',
  },
  '/open-apis/hire/v1/employees/get_by_application': {
    GET: 'getByApplicationHireEmployee',
  },
  '/open-apis/hire/v1/todos': {
    GET: 'listHireTodo',
  },
  '/open-apis/hire/v1/evaluation_tasks': {
    GET: 'listHireEvaluationTask',
  },
  '/open-apis/hire/v1/exam_marking_tasks': {
    GET: 'listHireExamMarkingTask',
  },
  '/open-apis/hire/v1/interview_tasks': {
    GET: 'listHireInterviewTask',
  },
  '/open-apis/hire/v1/notes': {
    POST: 'createHireNote',
    GET: 'listHireNote',
  },
  '/open-apis/hire/v1/notes/{note_id}': {
    PATCH: 'patchHireNote',
    GET: 'getHireNote',
    DELETE: 'deleteHireNote',
  },
  '/open-apis/hire/v1/resume_sources': {
    GET: 'listHireResumeSource',
  },
  '/open-apis/hire/v1/eco_account_custom_fields': {
    POST: 'createHireEcoAccountCustomField',
  },
  '/open-apis/hire/v1/eco_account_custom_fields/batch_update': {
    PATCH: 'batchUpdateHireEcoAccountCustomField',
  },
  '/open-apis/hire/v1/eco_account_custom_fields/batch_delete': {
    POST: 'batchDeleteHireEcoAccountCustomField',
  },
  '/open-apis/hire/v1/eco_background_check_custom_fields': {
    POST: 'createHireEcoBackgroundCheckCustomField',
  },
  '/open-apis/hire/v1/eco_background_check_custom_fields/batch_update': {
    PATCH: 'batchUpdateHireEcoBackgroundCheckCustomField',
  },
  '/open-apis/hire/v1/eco_background_check_custom_fields/batch_delete': {
    POST: 'batchDeleteHireEcoBackgroundCheckCustomField',
  },
  '/open-apis/hire/v1/eco_background_check_packages': {
    POST: 'createHireEcoBackgroundCheckPackage',
  },
  '/open-apis/hire/v1/eco_background_check_packages/batch_update': {
    PATCH: 'batchUpdateHireEcoBackgroundCheckPackage',
  },
  '/open-apis/hire/v1/eco_background_check_packages/batch_delete': {
    POST: 'batchDeleteHireEcoBackgroundCheckPackage',
  },
  '/open-apis/hire/v1/eco_background_checks/update_progress': {
    POST: 'updateProgressHireEcoBackgroundCheck',
  },
  '/open-apis/hire/v1/eco_background_checks/update_result': {
    POST: 'updateResultHireEcoBackgroundCheck',
  },
  '/open-apis/hire/v1/eco_background_checks/cancel': {
    POST: 'cancelHireEcoBackgroundCheck',
  },
  '/open-apis/hire/v1/eco_exam_papers': {
    POST: 'createHireEcoExamPaper',
  },
  '/open-apis/hire/v1/eco_exam_papers/batch_update': {
    PATCH: 'batchUpdateHireEcoExamPaper',
  },
  '/open-apis/hire/v1/eco_exam_papers/batch_delete': {
    POST: 'batchDeleteHireEcoExamPaper',
  },
  '/open-apis/hire/v1/eco_exams/{exam_id}/login_info': {
    POST: 'loginInfoHireEcoExam',
  },
  '/open-apis/hire/v1/eco_exams/{exam_id}/update_result': {
    POST: 'updateResultHireEcoExam',
  },
  '/open-apis/hire/v1/referral_account/enable': {
    POST: 'enableHireReferralAccount',
  },
  '/open-apis/hire/v1/referral_account/get_account_assets': {
    GET: 'getAccountAssetsHireReferralAccount',
  },
  '/open-apis/hire/v1/referral_account': {
    POST: 'createHireReferralAccount',
  },
  '/open-apis/hire/v1/referral_account/{referral_account_id}/deactivate': {
    POST: 'deactivateHireReferralAccount',
  },
  '/open-apis/hire/v1/referral_account/{referral_account_id}/withdraw': {
    POST: 'withdrawHireReferralAccount',
  },
  '/open-apis/hire/v1/referral_account/reconciliation': {
    POST: 'reconciliationHireReferralAccount',
  },
  '/open-apis/hire/v1/attachments': {
    POST: 'createHireAttachment',
  },
  '/open-apis/hire/v1/attachments/{attachment_id}': {
    GET: 'getHireAttachment',
  },
  '/open-apis/hire/v1/attachments/{attachment_id}/preview': {
    GET: 'previewHireAttachment',
  },
  '/open-apis/hire/v1/applications/{application_id}/interviews': {
    GET: 'listHireApplicationInterview',
  },
  '/open-apis/hire/v1/talent_operation_logs/search': {
    POST: 'searchHireTalentOperationLog',
  },
  '/open-apis/hire/v1/jobs/{job_id}/managers/{manager_id}': {
    GET: 'getHireJobManager',
  },
  '/open-apis/hire/v1/offer_schemas/{offer_schema_id}': {
    GET: 'getHireOfferSchema',
  },
})
