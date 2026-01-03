import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    hire: Hire.Methods
  }
}

export namespace Hire {
  export interface Methods {
    location: Location.Methods
    role: Role.Methods
    userRole: UserRole.Methods
    job: Job.Methods
    jobSchema: JobSchema.Methods
    advertisement: Advertisement.Methods
    jobPublishRecord: JobPublishRecord.Methods
    jobFunction: JobFunction.Methods
    jobType: JobType.Methods
    jobRequirement: JobRequirement.Methods
    jobRequirementSchema: JobRequirementSchema.Methods
    jobProcess: JobProcess.Methods
    subject: Subject.Methods
    talentTag: TalentTag.Methods
    registrationSchema: RegistrationSchema.Methods
    interviewFeedbackForm: InterviewFeedbackForm.Methods
    interviewRoundType: InterviewRoundType.Methods
    interviewRegistrationSchema: InterviewRegistrationSchema.Methods
    interviewer: Interviewer.Methods
    offerApprovalTemplate: OfferApprovalTemplate.Methods
    offerCustomField: OfferCustomField.Methods
    offerApplicationForm: OfferApplicationForm.Methods
    referral: Referral.Methods
    referralWebsite: ReferralWebsite.Methods
    portalApplySchema: PortalApplySchema.Methods
    website: Website.Methods
    agency: Agency.Methods
    talent: Talent.Methods
    externalApplication: ExternalApplication.Methods
    externalInterview: ExternalInterview.Methods
    externalInterviewAssessment: ExternalInterviewAssessment.Methods
    externalOffer: ExternalOffer.Methods
    externalBackgroundCheck: ExternalBackgroundCheck.Methods
    externalReferralReward: ExternalReferralReward.Methods
    talentPool: TalentPool.Methods
    talentFolder: TalentFolder.Methods
    talentObject: TalentObject.Methods
    talentBlocklist: TalentBlocklist.Methods
    application: Application.Methods
    terminationReason: TerminationReason.Methods
    diversityInclusion: DiversityInclusion.Methods
    evaluation: Evaluation.Methods
    exam: Exam.Methods
    test: Test.Methods
    interview: Interview.Methods
    interviewRecord: InterviewRecord.Methods
    minutes: Minutes.Methods
    questionnaire: Questionnaire.Methods
    offer: Offer.Methods
    backgroundCheckOrder: BackgroundCheckOrder.Methods
    tripartiteAgreement: TripartiteAgreement.Methods
    ehrImportTask: EhrImportTask.Methods
    employee: Employee.Methods
    todo: Todo.Methods
    evaluationTask: EvaluationTask.Methods
    examMarkingTask: ExamMarkingTask.Methods
    interviewTask: InterviewTask.Methods
    note: Note.Methods
    resumeSource: ResumeSource.Methods
    ecoAccountCustomField: EcoAccountCustomField.Methods
    ecoBackgroundCheckCustomField: EcoBackgroundCheckCustomField.Methods
    ecoBackgroundCheckPackage: EcoBackgroundCheckPackage.Methods
    ecoBackgroundCheck: EcoBackgroundCheck.Methods
    ecoExamPaper: EcoExamPaper.Methods
    ecoExam: EcoExam.Methods
    referralAccount: ReferralAccount.Methods
    attachment: Attachment.Methods
    talentOperationLog: TalentOperationLog.Methods
    offerSchema: OfferSchema.Methods
  }

  export namespace Location {
    export interface Methods {
      /**
       * 查询地点列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/location/query
       */
      query(body: QueryRequest, query?: Pagination): Paginated<Lark.LocationDto>
      /**
       * 获取地址列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/location/list
       */
      list(query?: ListQuery): Paginated<Lark.Location>
    }

    export interface QueryRequest {
      /** 地址码列表,最大长度不超过100 */
      code_list?: string[]
      /** 地址类型 */
      location_type: 1 | 2 | 3 | 4
    }

    export interface ListQuery extends Pagination {
      /** 地址类型 */
      usage: 'position_location' | 'interview_location' | 'store_location'
    }
  }

  export namespace Role {
    export interface Methods {
      /**
       * 获取角色详情
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/role/get
       */
      get(role_id: string): Promise<GetResponse>
      /**
       * 获取角色列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/role/list
       */
      list(query?: Pagination): Paginated<Lark.Role>
    }

    export interface GetResponse {
      /** 角色详情 */
      role?: Lark.RoleDetail
    }
  }

  export namespace UserRole {
    export interface Methods {
      /**
       * 获取用户角色列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/user_role/list
       */
      list(query?: ListQuery): Paginated<Lark.UserRole>
    }

    export interface ListQuery extends Pagination {
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
  }

  export namespace Job {
    export interface Methods {
      manager: Manager.Methods
      /**
       * 新建职位
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_create
       */
      combinedCreate(body: CombinedCreateRequest, query?: CombinedCreateQuery): Promise<CombinedCreateResponse>
      /**
       * 更新职位
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_update
       */
      combinedUpdate(job_id: string, body: CombinedUpdateRequest, query?: CombinedUpdateQuery): Promise<CombinedUpdateResponse>
      /**
       * 更新职位设置
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/update_config
       */
      updateConfig(job_id: string, body: UpdateConfigRequest, query?: UpdateConfigQuery): Promise<UpdateConfigResponse>
      /**
       * 获取职位详情
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get_detail
       */
      getDetail(job_id: string, query?: GetDetailQuery): Promise<GetDetailResponse>
      /**
       * 获取职位信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get
       */
      get(job_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取职位上的招聘人员信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/recruiter
       */
      recruiter(job_id: string, query?: RecruiterQuery): Promise<RecruiterResponse>
      /**
       * 获取职位设置
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/config
       */
      config(job_id: string, query?: ConfigQuery): Promise<ConfigResponse>
      /**
       * 获取职位列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/list
       */
      list(query?: ListQuery): Paginated<Lark.Job>
      /**
       * 关闭职位
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/close
       */
      close(job_id: string): Promise<void>
      /**
       * 重启职位
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/open
       */
      open(job_id: string, body: OpenRequest): Promise<void>
    }

    export const enum CombinedCreateRequestExperience {
      /** 不限 */
      NoLimit = 1,
      /** 应届毕业生 */
      Graduate = 2,
      /** 1年以下 */
      UnderOneYear = 3,
      /** 1-3年 */
      OneToThreeYear = 4,
      /** 3-5年 */
      ThreeToFiveYear = 5,
      /** 5-7年 */
      FiveToSevenYear = 6,
      /** 7-10年 */
      SevenToTenYear = 7,
      /** 10年以上 */
      OverTenYear = 8,
    }

    export const enum CombinedCreateRequestProcessType {
      /** 社招 */
      SocialProcess = 1,
      /** 校招 */
      CampusProcess = 2,
    }

    export const enum CombinedCreateRequestRequiredDegree {
      /** 小学及以上 */
      PrimaryEducation = 1,
      /** 初中及以上 */
      JuniorMiddleSchoolEducation = 2,
      /** 专职及以上 */
      Secondary = 3,
      /** 高中及以上 */
      SeniorSchoolGraduates = 4,
      /** 大专及以上 */
      Associate = 5,
      /** 本科及以上 */
      Bachelor = 6,
      /** 硕士及以上 */
      Master = 7,
      /** 博士及以上 */
      Phd = 8,
      /** 不限 */
      NoLimit = 20,
    }

    export const enum CombinedCreateRequestJobAttribute {
      /** 实体职位 */
      Concrete = 1,
      /** 虚拟职位 */
      Virtual = 2,
    }

    export interface CombinedCreateRequest {
      /** 职位编号，可传入职位的「职位编号」、「职位 ID」或者「职位序号」，将以传入的参数作为职位编号，以便双方系统的数据映射 */
      code?: string
      /** 工作年限 */
      experience?: CombinedCreateRequestExperience
      /** 到期日期，请使用 */
      expiry_time?: number
      /** 自定义字段 */
      customized_data_list?: Lark.CombinedJobObjectValueMap[]
      /** 最低职级，枚举通过接口「获取职级列表」获取 */
      min_level_id?: string
      /** 最低薪资 */
      min_salary?: number
      /** 职位名称 */
      title: string
      /** 职位负责人，仅一位，可通过用户相关接口获取用户 id */
      job_managers: Lark.JobManager
      /** 招聘流程，枚举通过接口「获取招聘流程信息」获取 */
      job_process_id: string
      /** 职位流程类型 */
      process_type: CombinedCreateRequestProcessType
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
      required_degree?: CombinedCreateRequestRequiredDegree
      /** 序列 */
      job_category_id?: string
      /** 工作地点，枚举通过接口「获取地址列表」获取，选择地点用途为「职位地址」 */
      address_id_list?: string[]
      /** 职位属性，1是实体职位，2是虚拟职位 */
      job_attribute?: CombinedCreateRequestJobAttribute
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

    export interface CombinedCreateQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 此次调用中使用的部门 ID 的类型 */
      department_id_type?: 'open_department_id' | 'department_id'
      /** 此次调用中使用的「职级 ID」的类型 */
      job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      /** 此次调用中使用的「序列 ID」的类型 */
      job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
    }

    export interface CombinedCreateResponse {
      /** 职位广告 */
      default_job_post?: Lark.CombinedJobResultDefaultJobPost
      /** 职位 */
      job?: Lark.Job
      /** 职位负责人 */
      job_manager?: Lark.JobManager
      /** 面试登记表 */
      interview_registration_schema_info?: Lark.RegistrationSchemaInfo
      /** 入职登记表 */
      onboard_registration_schema_info?: Lark.RegistrationSchemaInfo
      /** 目标专业 */
      target_major_list?: Lark.TargetMajorInfo[]
      /** 官网申请表 */
      portal_website_apply_form_schema_info?: Lark.RegistrationSchemaInfo
    }

    export const enum CombinedUpdateRequestExperience {
      /** 不限 */
      NoLimit = 1,
      /** 应届毕业生 */
      Graduate = 2,
      /** 1年以下 */
      UnderOneYear = 3,
      /** 1-3年 */
      OneToThreeYear = 4,
      /** 3-5年 */
      ThreeToFiveYear = 5,
      /** 5-7年 */
      FiveToSevenYear = 6,
      /** 7-10年 */
      SevenToTenYear = 7,
      /** 10年以上 */
      OverTenYear = 8,
    }

    export const enum CombinedUpdateRequestRequiredDegree {
      /** 小学及以上 */
      PrimaryEducation = 1,
      /** 初中及以上 */
      JuniorMiddleSchoolEducation = 2,
      /** 专职及以上 */
      Secondary = 3,
      /** 高中及以上 */
      SeniorSchoolGraduates = 4,
      /** 大专及以上 */
      Associate = 5,
      /** 本科及以上 */
      Bachelor = 6,
      /** 硕士及以上 */
      Master = 7,
      /** 博士及以上 */
      Phd = 8,
      /** 不限 */
      NoLimit = 20,
    }

    export const enum CombinedUpdateRequestJobAttribute {
      /** 实体职位 */
      Concrete = 1,
      /** 虚拟职位 */
      Virtual = 2,
    }

    export interface CombinedUpdateRequest {
      /** 职位 ID */
      id?: string
      /** 工作年限 */
      experience?: CombinedUpdateRequestExperience
      /** 到期日期，请使用 */
      expiry_time?: number
      /** 自定义字段 */
      customized_data_list?: Lark.CombinedJobObjectValueMap[]
      /** 最低职级，枚举通过接口「获取职级列表」获取 */
      min_level_id?: string
      /** 最低薪资 */
      min_salary?: number
      /** 职位名称 */
      title?: string
      /** 职位负责人，仅一位，可通过用户相关接口获取用户 id */
      job_managers: Lark.JobManager
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
      required_degree?: CombinedUpdateRequestRequiredDegree
      /** 序列 */
      job_category_id?: string
      /** 工作地点，枚举通过接口「获取地址列表」获取，选择地点用途为「职位地址」 */
      address_id_list?: string[]
      /** 职位属性，1是实体职位，2是虚拟职位 */
      job_attribute?: CombinedUpdateRequestJobAttribute
      /** 到期日期的毫秒时间戳 */
      expiry_timestamp?: string
      /** 目标专业ID List */
      target_major_id_list?: string[]
    }

    export interface CombinedUpdateQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 此次调用中使用的部门 ID 的类型 */
      department_id_type?: 'open_department_id' | 'department_id'
      /** 此次调用中使用的「职级 ID」的类型 */
      job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      /** 此次调用中使用的「序列 ID」的类型 */
      job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
    }

    export interface CombinedUpdateResponse {
      /** 职位广告 */
      default_job_post?: Lark.CombinedJobResultDefaultJobPost
      /** 职位 */
      job?: Lark.Job
      /** 职位负责人 */
      job_manager?: Lark.JobManager
      /** 官网申请表 */
      portal_website_apply_form_schema_info?: Lark.RegistrationSchemaInfo
    }

    export interface UpdateConfigRequest {
      /** Offer 申请表，枚举通过接口「获取 Offer 申请表列表」获取 */
      offer_apply_schema_id?: string
      /** Offer 审批流，枚举通过接口「获取 Offer 审批流列表」获取 */
      offer_process_conf?: string
      /** 建议评估人 ID 列表 */
      recommended_evaluator_id_list?: string[]
      /** 更新选项，传入要更新的配置项 */
      update_option_list: (1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | 11 | 12)[]
      /** 面试评价表，枚举通过接口「获取面试评价表列表」获取 */
      assessment_template_biz_id?: string
      /** 建议面试官列表 */
      interview_round_conf_list?: Lark.JobConfigInterviewRoundConf[]
      /** 关联招聘需求，支持关联多个，枚举通过接口「获取招聘需求」获取 */
      jr_id_list?: string[]
      /** 面试登记表ID，当在飞书招聘「设置 - 信息登记表使用设置 - 面试登记表使用方式」中选择「HR 按职位选择登记表」时，该字段为必填；否则该字段不生效。 */
      interview_registration_schema_id?: string
      /** 入职登记表ID，当在飞书招聘「设置 - 信息登记表使用设置 - 入职登记表使用方式」中选择「HR 按职位选择登记表」时，该字段为必填；否则该字段不生效。 */
      onboard_registration_schema_id?: string
      /** 面试轮次类型 ID 列表 */
      interview_round_type_conf_list?: Lark.JobConfigRoundType[]
      /** 关联职位列表，如职位为实体职位则关联虚拟职位id，如职位为虚拟职位则关联实体职位id */
      related_job_id_list?: string[]
      /** 面试官安排面试配置 */
      interview_appointment_config?: Lark.InterviewAppointmentConfig
      /** 官网申请表ID */
      portal_website_apply_form_schema_id?: string
    }

    export interface UpdateConfigQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface UpdateConfigResponse {
      job_config?: Lark.JobConfigResult
    }

    export interface GetDetailQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
      /** 此次调用中使用的部门 ID 的类型 */
      department_id_type?: 'open_department_id' | 'department_id'
      /** 此次调用中使用的「职级 ID」的类型 */
      job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      /** 此次调用中使用的「序列 ID」的类型 */
      job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
    }

    export interface GetDetailResponse {
      /** 职位详情数据 */
      job_detail?: Lark.JobDetail
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
      /** 此次调用中使用的部门 ID 的类型 */
      department_id_type?: 'open_department_id' | 'department_id'
      /** 此次调用中使用的「职级 ID」的类型 */
      job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      /** 此次调用中使用的「序列 ID」的类型 */
      job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
    }

    export interface GetResponse {
      /** 职位数据 */
      job?: Lark.Job
    }

    export interface RecruiterQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface RecruiterResponse {
      /** 职位负责人 */
      info?: Lark.JobRecruiter2
    }

    export interface ConfigQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface ConfigResponse {
      job_config?: Lark.JobConfigResult
    }

    export interface ListQuery extends Pagination {
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

    export interface OpenRequest {
      /** 到期日期 */
      expiry_time?: number
      /** 是否长期有效 */
      is_never_expired: boolean
    }

    export namespace Manager {
      export interface Methods {
        /**
         * 更新职位相关人员
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/batch_update
         */
        batchUpdate(job_id: string, body: BatchUpdateRequest, query?: BatchUpdateQuery): Promise<BatchUpdateResponse>
        /**
         * 获取职位上的招聘人员信息
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/get
         */
        get(job_id: string, manager_id: string, query?: GetQuery): Promise<GetResponse>
      }

      export const enum BatchUpdateRequestUpdateOption {
        /** 招聘负责人 */
        JobManager = 1,
        /** 招聘协助人 */
        Assistant = 2,
        /** 用人经理 */
        HireManager = 3,
      }

      export interface BatchUpdateRequest {
        /** 招聘负责人 ID */
        recruiter_id?: string
        /** 招聘协助人 ID */
        assistant_id_list?: string[]
        /** 用人经理 ID */
        hiring_manager_id_list?: string[]
        /** 更新的人员类型，可选值：1=招聘负责人; 2=招聘协助人; 3=用人经理； */
        update_option_list: BatchUpdateRequestUpdateOption[]
        /** 操作者 ID */
        creator_id?: string
      }

      export interface BatchUpdateQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface BatchUpdateResponse {
        /** 职位负责人 */
        job_manager?: Lark.JobManager
      }

      export interface GetQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
      }

      export interface GetResponse {
        /** 职位负责人 */
        info?: Lark.JobManager
      }
    }
  }

  export namespace JobSchema {
    export interface Methods {
      /**
       * 获取职位模板
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_schema/list
       */
      list(query?: ListQuery): Paginated<Lark.JobSchema>
    }

    export interface ListQuery extends Pagination {
      /** 职位模板类型 */
      scenario?: 1 | 2
    }
  }

  export namespace Advertisement {
    export interface Methods {
      /**
       * 发布职位广告
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/advertisement/publish
       */
      publish(advertisement_id: string, body: PublishRequest): Promise<void>
    }

    export interface PublishRequest {
      /** 职位渠道 ID，选择要发布的招聘官网，单次仅可发布 1 个渠道，1. 内推平台提供对应的 id = 3，2. 官网渠道的 ID 通过接口「获取官网列表」获取 */
      job_channel_id?: string
    }
  }

  export namespace JobPublishRecord {
    export interface Methods {
      /**
       * 获取职位广告发布记录
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_publish_record/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.WebsiteJobPost>
    }

    export interface SearchRequest {
      /** 渠道 ID */
      job_channel_id: string
    }

    export interface SearchQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 此次调用中使用的部门 ID 的类型 */
      department_id_type?: 'open_department_id' | 'department_id'
      /** 此次调用中使用的「职级 ID」的类型 */
      job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      /** 此次调用中使用的「序列 ID」的类型 */
      job_family_id_type?: 'people_admin_job_category_id' | 'job_family_id'
    }
  }

  export namespace JobFunction {
    export interface Methods {
      /**
       * 获取职能分类列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_function/list
       */
      list(query?: Pagination): Paginated<Lark.JobFunction>
    }
  }

  export namespace JobType {
    export interface Methods {
      /**
       * 获取职位类别列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_type/list
       */
      list(query?: Pagination): Paginated<Lark.JobTypeInfo>
    }
  }

  export namespace JobRequirement {
    export interface Methods {
      /**
       * 创建招聘需求
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新招聘需求
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/update
       */
      update(job_requirement_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<void>
      /**
       * 获取招聘需求信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list_by_id
       */
      listById(body: ListByIdRequest, query?: ListByIdQuery): Promise<ListByIdResponse>
      /**
       * 获取招聘需求列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list
       */
      list(query?: ListQuery): Paginated<Lark.JobRequirementDto>
      /**
       * 删除招聘需求
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/delete
       */
      delete(job_requirement_id: string): Promise<void>
    }

    export const enum CreateRequestDisplayProgress {
      /** 待启动 */
      WaitingStart = 1,
      /** 进行中 */
      OnGoing = 2,
      /** 已取消 */
      Canceled = 3,
      /** 已暂停 */
      Suspended = 4,
      /** 已完成 */
      Completed = 5,
      /** 已超期 */
      Expired = 6,
    }

    export const enum CreateRequestCategory {
      /** 新增 */
      Addition = 1,
      /** 替换 */
      Replacement = 2,
    }

    export const enum CreateRequestPriority {
      /** 高 */
      High = 1,
      /** 中 */
      Medium = 2,
      /** 低 */
      Low = 3,
    }

    export const enum CreateRequestRequiredDegree {
      /** 小学及以上 */
      PrimaryEducation = 1,
      /** 初中及以上 */
      JuniorMiddleSchoolEducation = 2,
      /** 专职及以上 */
      Secondary = 3,
      /** 高中及以上 */
      SeniorSchoolGraduates = 4,
      /** 大专及以上 */
      Associate = 5,
      /** 本科及以上 */
      Bachelor = 6,
      /** 硕士及以上 */
      Master = 7,
      /** 博士及以上 */
      Phd = 8,
      /** 不限 */
      NoLimit = 20,
    }

    export const enum CreateRequestProcessType {
      /** 社招 */
      Social = 1,
      /** 校招 */
      Campus = 2,
    }

    export interface CreateRequest {
      /** 招聘需求编号 */
      short_code: string
      /** 需求名称 */
      name: string
      /** 需求状态 */
      display_progress: CreateRequestDisplayProgress
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
      category?: CreateRequestCategory
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
      priority?: CreateRequestPriority
      /** 学历要求 */
      required_degree?: CreateRequestRequiredDegree
      /** 最高薪资 */
      max_salary?: string
      /** 最低薪资 */
      min_salary?: string
      /** 工作地点 ID */
      address_id?: string
      /** 需求描述 */
      description?: string
      /** 自定义字段 */
      customized_data_list?: Lark.JobRequirementCustomizedData[]
      /** 支持的招聘类型列表 */
      process_type?: CreateRequestProcessType
      /** 招聘需求中的职位类别 */
      job_type_id?: string
      /** 关联的职位 ID 列表 */
      job_id_list?: string[]
      /** 职务 ID */
      employment_job_id?: string
      /** 岗位 ID */
      position_id?: string
    }

    export interface CreateQuery {
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

    export interface CreateResponse {
      job_requirement?: Lark.JobRequirementDto
    }

    export const enum UpdateRequestDisplayProgress {
      /** 待启动 */
      WaitingStart = 1,
      /** 进行中 */
      OnGoing = 2,
      /** 已取消 */
      Canceled = 3,
      /** 已暂停 */
      Suspended = 4,
      /** 已完成 */
      Completed = 5,
      /** 已超期 */
      Expired = 6,
    }

    export const enum UpdateRequestCategory {
      /** 新增 */
      Addition = 1,
      /** 替换 */
      Replacement = 2,
    }

    export const enum UpdateRequestPriority {
      /** 高 */
      High = 1,
      /** 中 */
      Medium = 2,
      /** 低 */
      Low = 3,
    }

    export const enum UpdateRequestRequiredDegree {
      /** 小学及以上 */
      PrimaryEducation = 1,
      /** 初中及以上 */
      JuniorMiddleSchoolEducation = 2,
      /** 专职及以上 */
      Secondary = 3,
      /** 高中及以上 */
      SeniorSchoolGraduates = 4,
      /** 大专及以上 */
      Associate = 5,
      /** 本科及以上 */
      Bachelor = 6,
      /** 硕士及以上 */
      Master = 7,
      /** 博士及以上 */
      Phd = 8,
      /** 不限 */
      NoLimit = 20,
    }

    export const enum UpdateRequestProcessType {
      /** 社招 */
      Social = 1,
      /** 校招 */
      Campus = 2,
    }

    export interface UpdateRequest {
      /** 需求名称 */
      name: string
      /** 需求状态 */
      display_progress: UpdateRequestDisplayProgress
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
      category?: UpdateRequestCategory
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
      priority?: UpdateRequestPriority
      /** 学历要求 */
      required_degree?: UpdateRequestRequiredDegree
      /** 最高薪资 */
      max_salary?: string
      /** 最低薪资 */
      min_salary?: string
      /** 工作地点 ID */
      address_id?: string
      /** 需求描述 */
      description?: string
      /** 自定义字段 */
      customized_data_list?: Lark.JobRequirementCustomizedData[]
      /** 支持的招聘类型列表 */
      process_type?: UpdateRequestProcessType
      /** 招聘需求中的职位类别 */
      job_type_id?: string
      /** 关联的职位 ID 列表 */
      job_id_list?: string[]
      /** 职务 ID */
      employment_job_id?: string
      /** 岗位 ID */
      position_id?: string
      /** 招聘需求修改确认控制 */
      update_option?: Lark.JobRequirementUpdateOption
    }

    export interface UpdateQuery {
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

    export interface ListByIdRequest {
      /** 招聘需求ID列表 */
      id_list?: string[]
    }

    export interface ListByIdQuery {
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

    export interface ListByIdResponse {
      /** 招聘需求列表 */
      items?: Lark.JobRequirementDto[]
    }

    export interface ListQuery extends Pagination {
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
  }

  export namespace JobRequirementSchema {
    export interface Methods {
      /**
       * 获取招聘需求模板列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement_schema/list
       */
      list(query?: Pagination): Paginated<Lark.JobRequirementSchema>
    }
  }

  export namespace JobProcess {
    export interface Methods {
      /**
       * 获取招聘流程信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_process/list
       */
      list(query?: Pagination): Paginated<Lark.JobProcesses>
    }
  }

  export namespace Subject {
    export interface Methods {
      /**
       * 获取项目列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/subject/list
       */
      list(query?: ListQuery): Paginated<Lark.Subject>
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 项目ID列表 */
      subject_ids?: string[]
    }
  }

  export namespace TalentTag {
    export interface Methods {
      /**
       * 获取人才标签信息列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_tag/list
       */
      list(query?: ListQuery): Paginated<Lark.TalentTag>
    }

    export interface ListQuery extends Pagination {
      /** 搜索关键词 */
      keyword?: string
      /** ID 列表 */
      id_list?: string[]
      /** 标签类型 */
      type?: 1 | 2
      /** 包含停用 */
      include_inactive?: boolean
    }
  }

  export namespace RegistrationSchema {
    export interface Methods {
      /**
       * 获取信息登记表列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/registration_schema/list
       */
      list(query?: ListQuery): Paginated<Lark.RegistrationSchema>
    }

    export const enum ListQueryScenario {
      /** 面试登记表 */
      InterviewRegistration = 5,
      /** 入职登记表 */
      OnboardRegistration = 6,
      /** 人才信息登记表 */
      InfoUpdateRegistration = 14,
    }

    export interface ListQuery extends Pagination {
      /** 登记表适用场景；不填表示获取全部类型信息登记表 */
      scenario?: ListQueryScenario
    }
  }

  export namespace InterviewFeedbackForm {
    export interface Methods {
      /**
       * 获取面试评价表列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_feedback_form/list
       */
      list(query?: ListQuery): Paginated<Lark.InterviewFeedbackForm>
    }

    export interface ListQuery extends Pagination {
      /** 面试评价表ID列表, 如果使用此字段则会忽略其他参数 */
      interview_feedback_form_ids?: string[]
    }
  }

  export namespace InterviewRoundType {
    export interface Methods {
      /**
       * 获取面试轮次类型列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_round_type/list
       */
      list(query?: ListQuery): Promise<ListResponse>
    }

    export interface ListQuery {
      /** 职位流程类型 */
      process_type?: 1 | 2
    }

    export interface ListResponse {
      /** 是否启用面试轮次类型 */
      active_status?: 1 | 2
      /** 列表 */
      items?: Lark.InterviewRoundType[]
    }
  }

  export namespace InterviewRegistrationSchema {
    export interface Methods {
      /**
       * 获取面试登记表列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_registration_schema/list
       */
      list(query?: Pagination): Paginated<Lark.InterviewRegistrationSchema>
    }
  }

  export namespace Interviewer {
    export interface Methods {
      /**
       * 查询面试官信息列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interviewer/list
       */
      list(query?: ListQuery): Paginated<Lark.Interviewer>
      /**
       * 更新面试官信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interviewer/patch
       */
      patch(interviewer_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
    }

    export const enum ListQueryVerifyStatus {
      NotVarified = 1,
      Varified = 2,
    }

    export interface ListQuery extends Pagination {
      /** 面试官userID列表 */
      user_ids?: string[]
      /** 认证状态 */
      verify_status?: ListQueryVerifyStatus
      /** 最早更新时间，毫秒时间戳 */
      earliest_update_time?: string
      /** 最晚更新时间，毫秒时间戳 */
      latest_update_time?: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface PatchRequest {
      /** 面试官信息 */
      interviewer: Lark.Interviewer
    }

    export interface PatchQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface PatchResponse {
      /** 面试官信息 */
      interviewer?: Lark.Interviewer
    }
  }

  export namespace OfferApprovalTemplate {
    export interface Methods {
      /**
       * 获取 Offer 审批流列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_approval_template/list
       */
      list(query?: ListQuery): Paginated<Lark.OfferApprovalTemplate>
    }

    export interface ListQuery extends Pagination {
      /** 此次调用中使用的部门 ID 的类型 */
      department_id_type?: 'open_department_id' | 'department_id' | 'people_admin_department_id'
    }
  }

  export namespace OfferCustomField {
    export interface Methods {
      /**
       * 更新 Offer 申请表自定义字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_custom_field/update
       */
      update(offer_custom_field_id: string, body: UpdateRequest): Promise<void>
    }

    export interface UpdateRequest {
      /** 自定义字段名称 */
      name: Lark.I18n
      /** 配置信息 */
      config?: Lark.OfferCustomFieldConfig
    }
  }

  export namespace OfferApplicationForm {
    export interface Methods {
      /**
       * 获取 Offer 申请表信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_application_form/get
       */
      get(offer_application_form_id: string): Promise<GetResponse>
      /**
       * 获取 Offer 申请表列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_application_form/list
       */
      list(query?: Pagination): Paginated<Lark.OfferApplyForm>
    }

    export interface GetResponse {
      /** Offer 申请表详情 */
      offer_apply_form?: Lark.OfferApplyFormInfo
    }
  }

  export namespace Referral {
    export interface Methods {
      /**
       * 查询人才内推信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/search
       */
      search(body: SearchRequest, query?: SearchQuery): Promise<SearchResponse>
      /**
       * 获取内推信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/get_by_application
       */
      getByApplication(query?: GetByApplicationQuery): Promise<GetByApplicationResponse>
    }

    export interface SearchRequest {
      /** 人才id */
      talent_id: string
      /** 投递起始时间，若不填，默认为全部，但最多返回200条 */
      start_time?: string
      /** 投递终止时间，若不填，默认为全部，但最多返回200条 */
      end_time?: string
    }

    export interface SearchQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface SearchResponse {
      /** 内推信息列表 */
      items?: Lark.ReferralInfo[]
    }

    export interface GetByApplicationQuery {
      /** 投递的 ID */
      application_id: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface GetByApplicationResponse {
      /** 内推信息 */
      referral?: Lark.Referral
    }
  }

  export namespace ReferralWebsite {
    export interface Methods {
      jobPost: JobPost.Methods
    }

    export namespace JobPost {
      export interface Methods {
        /**
         * 获取内推官网下职位广告列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/list
         */
        list(query?: ListQuery): Paginated<Lark.PortalJobPost>
        /**
         * 获取内推官网下职位广告详情
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_website-job_post/get
         */
        get(job_post_id: string, query?: GetQuery): Promise<GetResponse>
      }

      export const enum ListQueryProcessType {
        /** 社招 */
        SocialProcess = 1,
        /** 校招 */
        CampusProcess = 2,
      }

      export interface ListQuery extends Pagination {
        /** 招聘流程类型 */
        process_type?: ListQueryProcessType
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 此次调用中使用的部门 ID 的类型 */
        department_id_type?: 'open_department_id' | 'department_id'
        /** 此次调用中使用的「职级 ID」的类型 */
        job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      }

      export interface GetQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 此次调用中使用的部门 ID 的类型 */
        department_id_type?: 'open_department_id' | 'department_id'
        /** 此次调用中使用的「职级 ID」的类型 */
        job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      }

      export interface GetResponse {
        job_post?: Lark.PortalJobPost
      }
    }
  }

  export namespace PortalApplySchema {
    export interface Methods {
      /**
       * 获取申请表模板列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/portal_apply_schema/list
       */
      list(query?: Pagination): Paginated<Lark.RegistrationSchema>
    }
  }

  export namespace Website {
    export interface Methods {
      channel: Channel.Methods
      siteUser: SiteUser.Methods
      jobPost: JobPost.Methods
      delivery: Delivery.Methods
      deliveryTask: DeliveryTask.Methods
      /**
       * 获取招聘官网列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website/list
       */
      list(query?: Pagination): Paginated<Lark.Website>
    }

    export namespace Channel {
      export interface Methods {
        /**
         * 新建招聘官网推广渠道
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/create
         */
        create(website_id: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 删除招聘官网推广渠道
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/delete
         */
        delete(website_id: string, channel_id: string): Promise<void>
        /**
         * 更新招聘官网推广渠道
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/update
         */
        update(website_id: string, channel_id: string, body: UpdateRequest): Promise<UpdateResponse>
        /**
         * 获取招聘官网推广渠道列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-channel/list
         */
        list(website_id: string, query?: Pagination): Paginated<Lark.WebsiteChannelInfo, 'website_channel_list'>
      }

      export interface CreateRequest {
        /** 推广渠道名称 */
        channel_name: string
      }

      export interface CreateResponse {
        /** 推广渠道 ID */
        id?: string
        /** 推广渠道名称 */
        name?: string
        /** 推广渠道链接 */
        link?: string
        /** 推广渠道推广码 */
        code?: string
      }

      export interface UpdateRequest {
        /** 推广渠道名称 */
        channel_name: string
      }

      export interface UpdateResponse {
        /** 推广渠道 ID */
        id?: string
        /** 推广渠道名称 */
        name?: string
        /** 推广渠道链接 */
        link?: string
        /** 推广渠道推广码 */
        code?: string
      }
    }

    export namespace SiteUser {
      export interface Methods {
        /**
         * 新建招聘官网用户
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-site_user/create
         */
        create(website_id: string, body: CreateRequest): Promise<CreateResponse>
      }

      export interface CreateRequest {
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

      export interface CreateResponse {
        site_user?: Lark.WebsiteUser
      }
    }

    export namespace JobPost {
      export interface Methods {
        /**
         * 获取招聘官网下职位广告详情
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/get
         */
        get(website_id: string, job_post_id: string, query?: GetQuery): Promise<GetResponse>
        /**
         * 搜索招聘官网下的职位广告列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/search
         */
        search(website_id: string, body: SearchRequest, query?: SearchQuery): Paginated<Lark.WebsiteJobPost>
        /**
         * 获取招聘官网下的职位广告列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-job_post/list
         */
        list(website_id: string, query?: ListQuery): Paginated<Lark.WebsiteJobPost>
      }

      export interface GetQuery {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 此次调用中使用的部门 ID 的类型 */
        department_id_type?: 'open_department_id' | 'department_id'
        /** 此次调用中使用的「职级 ID」的类型 */
        job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      }

      export interface GetResponse {
        job_post?: Lark.WebsiteJobPost
      }

      export interface SearchRequest {
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

      export interface SearchQuery extends Pagination {
        /** 用户 ID 类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
        /** 此次调用中使用的部门 ID 的类型 */
        department_id_type?: 'open_department_id' | 'department_id'
        /** 此次调用中使用的「职级 ID」的类型 */
        job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      }

      export interface ListQuery extends Pagination {
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
    }

    export namespace Delivery {
      export interface Methods {
        /**
         * 新建招聘官网投递
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery/create_by_resume
         */
        createByResume(website_id: string, body: CreateByResumeRequest, query?: CreateByResumeQuery): Promise<CreateByResumeResponse>
        /**
         * 根据简历附件创建招聘官网投递任务
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery/create_by_attachment
         */
        createByAttachment(website_id: string, body: CreateByAttachmentRequest): Promise<CreateByAttachmentResponse>
      }

      export interface CreateByResumeRequest {
        /** 职位广告 ID */
        job_post_id: string
        /** 人才信息 */
        resume: Lark.WebsiteDeliveryResume
        /** 官网用户 ID */
        user_id: string
        /** 意向投递城市列表，可从「获取职位信息」返回的工作地点列表获取 */
        application_preferred_city_code_list?: string[]
        /** 官网推广渠道 ID */
        channel_id?: string
      }

      export interface CreateByResumeQuery {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id'
      }

      export interface CreateByResumeResponse {
        delivery?: Lark.WebsiteDeliveryDto
      }

      export interface CreateByAttachmentRequest {
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
        identification?: Lark.WebsiteDeliveryAttachmentIndentification
      }

      export interface CreateByAttachmentResponse {
        /** 异步任务 ID */
        task_id?: string
      }
    }

    export namespace DeliveryTask {
      export interface Methods {
        /**
         * 获取招聘官网投递任务结果
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/website-delivery_task/get
         */
        get(website_id: string, delivery_task_id: string): Promise<GetResponse>
      }

      export interface GetResponse {
        /** 任务状态 */
        status?: 0 | 1 | 2 | 3
        /** 官网投递信息 */
        delivery?: Lark.WebsiteDeliveryDto
        /** 状态信息，仅 status 为 3 时返回 */
        status_msg?: string
        /** 附加信息，当前返回投递 ID，仅当 status 为 3 且 status_msg 标识为重复投递时，将返回重复投递的 ID */
        extra_info?: string
      }
    }
  }

  export namespace Agency {
    export interface Methods {
      /**
       * 设置猎头保护期
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/protect
       */
      protect(body: ProtectRequest, query?: ProtectQuery): Promise<void>
      /**
       * 获取猎头供应商信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/get
       */
      get(agency_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 查询猎头保护期信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/protect_search
       */
      protectSearch(body: ProtectSearchRequest): Promise<ProtectSearchResponse>
      /**
       * 查询猎头供应商信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/query
       */
      query(query?: QueryQuery): Promise<QueryResponse>
      /**
       * 查询猎头供应商下猎头列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/get_agency_account
       */
      getAgencyAccount(body: GetAgencyAccountRequest, query?: GetAgencyAccountQuery): Paginated<Lark.AgencyAccount>
      /**
       * 搜索猎头供应商列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Paginated<Lark.AgencySupplier>
      /**
       * 禁用/取消禁用猎头
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/agency/operate_agency_account
       */
      operateAgencyAccount(body: OperateAgencyAccountRequest): Promise<void>
    }

    export interface ProtectRequest {
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

    export interface ProtectQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface GetResponse {
      /** 数据 */
      agency?: Lark.Agency
    }

    export interface ProtectSearchRequest {
      /** 人才id */
      talent_id: string
    }

    export interface ProtectSearchResponse {
      /** 是否已入职 */
      is_onboarded?: boolean
      /** 是否在猎头保护期内入职 */
      onboarded_in_protection?: boolean
      /** 入职所在保护期 */
      onboarded_protection?: Lark.AgencyProtection
      /** 人才保护信息 */
      protection_list?: Lark.AgencyProtection[]
    }

    export interface QueryQuery {
      /** 猎头供应商名称 */
      name: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface QueryResponse {
      items?: Lark.Agency[]
    }

    export const enum GetAgencyAccountRequestStatus {
      /** 正常 */
      Normal = 0,
      /** 已禁用 */
      Enabled = 1,
      /** 已被猎头停用 */
      DisabledBySupplier = 2,
    }

    export const enum GetAgencyAccountRequestRole {
      /** 管理员 */
      Manager = 0,
      /** 顾问 */
      Consultant = 1,
    }

    export interface GetAgencyAccountRequest {
      /** 猎头供应商 ID */
      supplier_id: string
      /** 猎头状态 */
      status?: GetAgencyAccountRequestStatus
      /** 角色 */
      role?: GetAgencyAccountRequestRole
    }

    export interface GetAgencyAccountQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'union_id' | 'open_id'
    }

    export interface BatchQueryRequest {
      /** 猎头供应商 ID 列表，当传递此值，以此值为准，其余查询字段失效 */
      agency_supplier_id_list?: string[]
      /** 搜索关键字，可传入名称或邮箱 */
      keyword?: string
      /** 筛选项，相同的 Key 仅可传一次 */
      filter_list?: Lark.CommonFilter[]
    }

    export interface BatchQueryQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export const enum OperateAgencyAccountRequestOption {
      /** 禁用 */
      Add = 1,
      /** 取消禁用 */
      Remove = 2,
    }

    export interface OperateAgencyAccountRequest {
      /** 操作类型 */
      option: OperateAgencyAccountRequestOption
      /** 猎头 ID */
      id: string
      /** 禁用原因，仅当禁用操作时，必填 */
      reason?: string
    }
  }

  export namespace Talent {
    export interface Methods {
      externalInfo: ExternalInfo.Methods
      /**
       * 操作人才标签
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/tag
       */
      tag(talent_id: string, body: TagRequest): Promise<void>
      /**
       * 创建人才
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/combined_create
       */
      combinedCreate(body: CombinedCreateRequest, query?: CombinedCreateQuery): Promise<CombinedCreateResponse>
      /**
       * 更新人才
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/combined_update
       */
      combinedUpdate(body: CombinedUpdateRequest, query?: CombinedUpdateQuery): Promise<CombinedUpdateResponse>
      /**
       * 将人才加入指定文件夹
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/add_to_folder
       */
      addToFolder(body: AddToFolderRequest): Promise<AddToFolderResponse>
      /**
       * 将人才从指定文件夹移除
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/remove_to_folder
       */
      removeToFolder(body: RemoveToFolderRequest): Promise<RemoveToFolderResponse>
      /**
       * 批量获取人才ID
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/batch_get_id
       */
      batchGetId(body: BatchGetIdRequest): Promise<BatchGetIdResponse>
      /**
       * 获取人才列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/list
       */
      list(query?: ListQuery): Paginated<Lark.Talent>
      /**
       * 获取人才详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/talent/get
       */
      get(talent_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 更新人才在职状态
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/onboard_status
       */
      onboardStatus(talent_id: string, body: OnboardStatusRequest): Promise<void>
    }

    export interface TagRequest {
      /** 操作类型 */
      operation: 1 | 2
      /** 标签 ID 列表 */
      tag_id_list: string[]
    }

    export interface CombinedCreateRequest {
      /** 简历来源 ID，可通过[获取简历来源列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query)接口查询 */
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
      basic_info: Lark.TalentCombinedBasicInfo
      /** 教育经历 */
      education_list?: Lark.TalentCombinedEducationInfo[]
      /** 工作经历 */
      career_list?: Lark.TalentCombinedCareerInfo[]
      /** 项目经历 */
      project_list?: Lark.TalentCombinedProjectInfo[]
      /** 作品 */
      works_list?: Lark.TalentCombinedWorkInfo[]
      /** 获奖 */
      award_list?: Lark.TalentCombinedAwardInfo[]
      /** 语言能力 */
      language_list?: Lark.TalentCombinedLanguageInfo[]
      /** 社交账号 */
      sns_list?: Lark.TalentCombinedSnsInfo[]
      /** 意向地点 */
      preferred_city_code_list?: string[]
      /** 自我评价 */
      self_evaluation?: Lark.TalentSelfEvaluation
      /** 自定义模块 */
      customized_data?: Lark.TalentCustomizedDataObjectValue[]
    }

    export interface CombinedCreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface CombinedCreateResponse {
      /** 人才 ID */
      talent_id?: string
      /** 创建人 ID */
      creator_id?: string
      /** 创建人类型 */
      creator_account_type?: 1 | 3
    }

    export interface CombinedUpdateRequest {
      /** 人才 ID */
      talent_id: string
      /** 简历来源 ID，可通过[获取简历来源列表](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query)接口查询 */
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
      basic_info: Lark.TalentCombinedBasicInfo
      /** 教育经历 */
      education_list?: Lark.TalentCombinedEducationInfo[]
      /** 工作经历 */
      career_list?: Lark.TalentCombinedCareerInfo[]
      /** 项目经历 */
      project_list?: Lark.TalentCombinedProjectInfo[]
      /** 作品 */
      works_list?: Lark.TalentCombinedWorkInfo[]
      /** 获奖 */
      award_list?: Lark.TalentCombinedAwardInfo[]
      /** 语言能力 */
      language_list?: Lark.TalentCombinedLanguageInfo[]
      /** 社交账号 */
      sns_list?: Lark.TalentCombinedSnsInfo[]
      /** 偏好城市 */
      preferred_city_code_list?: string[]
      /** 自我评价 */
      self_evaluation?: Lark.TalentSelfEvaluation
      /** 自定义模块 */
      customized_data?: Lark.TalentCustomizedDataObjectValue[]
    }

    export interface CombinedUpdateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface CombinedUpdateResponse {
      /** 人才 ID */
      talent_id?: string
      /** 更新人 ID */
      operator_id?: string
      /** 更新人类型 */
      operator_account_type?: 1 | 3
    }

    export interface AddToFolderRequest {
      /** 人才 ID 列表 */
      talent_id_list: string[]
      /** 文件夹 ID */
      folder_id: string
    }

    export interface AddToFolderResponse {
      /** 人才 ID 列表 */
      talent_id_list?: string[]
      /** 文件夹 ID */
      folder_id?: string
    }

    export interface RemoveToFolderRequest {
      /** 人才 ID 列表 */
      talent_id_list: string[]
      /** 文件夹 ID */
      folder_id: string
    }

    export interface RemoveToFolderResponse {
      /** 人才 ID 列表 */
      talent_id_list?: string[]
      /** 文件夹 ID */
      folder_id?: string
    }

    export interface BatchGetIdRequest {
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

    export interface BatchGetIdResponse {
      /** 人才信息列表 */
      talent_list?: Lark.TalentBatchInfo[]
    }

    export interface ListQuery extends Pagination {
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

    export interface GetQuery {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface GetResponse {
      /** ID */
      talent_id?: string
      /** 基础信息 */
      basic_info?: Lark.CompositeTalentBasicInfo
      /** 教育经历 */
      education_list?: Lark.CompositeTalentEducationInfo[]
      /** 工作经历 */
      career_list?: Lark.CompositeTalentCareerInfo[]
      /** 项目经历 */
      project_list?: Lark.CompositeTalentProjectInfo[]
      /** 作品集 */
      works_list?: Lark.CompositeTalentWorksInfo[]
      /** 获奖列表 */
      award_list?: Lark.CompositeTalentAwardInfo[]
      /** 语言列表 */
      language_list?: Lark.CompositeTalentLanguageInfo[]
      /** SNS列表 */
      sns_list?: Lark.CompositeTalentSnsInfo[]
      /** 简历来源 */
      resume_source_list?: Lark.TalentResumeSource[]
      /** 实习经历 */
      internship_list?: Lark.CompositeTalentInternshipInfo[]
      /** 自定义字段 */
      customized_data_list?: Lark.CompositeTalentCustomizedData[]
      /** 简历附件id列表（按照简历创建时间降序）（废弃，请使用resume_attachment_list代替） */
      resume_attachment_id_list?: string[]
      /** 简历附件列表（按照简历创建时间降序） */
      resume_attachment_list?: Lark.TalentResumeAttachment[]
      /** 面试登记表 */
      interview_registration_list?: Lark.TalentInterviewRegistrationSimple[]
      /** 登记表列表 */
      registration_list?: Lark.RegistrationBasicInfo[]
      /** 是否已入职 */
      is_onboarded?: boolean
      /** 是否在猎头保护期 */
      is_in_agency_period?: boolean
      /** 最高学历 参考 DegreeType 枚举 */
      top_degree?: number
      /** 人才已加入的人才库列表 */
      talent_pool_id_list?: string[]
      /** 文件夹列表 */
      talent_folder_ref_list_v2?: Lark.TalentFolder[]
      /** 标签列表 */
      tag_list?: Lark.TalentTag[]
      /** 相似人才信息 */
      similar_info_v2?: Lark.TalentSimilar
      /** 人才黑名单详情 */
      block_info?: Lark.TalentBlock
      /** 人才已经加入的人才库列表 */
      talent_pool_ref_list_v2?: Lark.TalentPool[]
      /** 备注列表 */
      note_list_v2?: Lark.TalentNote[]
    }

    export const enum OnboardStatusRequestOperation {
      /** 入职 */
      Onboard = 1,
      /** 离职 */
      Overboard = 2,
    }

    export interface OnboardStatusRequest {
      /** 操作类型 1:入职 2:离职 */
      operation: OnboardStatusRequestOperation
      /** 毫秒时间戳 */
      onboard_time?: string
      /** 毫秒时间戳 */
      overboard_time?: string
    }

    export namespace ExternalInfo {
      export interface Methods {
        /**
         * 创建人才外部信息
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent-external_info/create
         */
        create(talent_id: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 更新人才外部信息
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent-external_info/update
         */
        update(talent_id: string, body: UpdateRequest): Promise<UpdateResponse>
      }

      export interface CreateRequest {
        /** 人才在外部系统创建时间 */
        external_create_time: string
      }

      export interface CreateResponse {
        /** 人才外部信息 */
        external_info?: Lark.TalentExternalInfo
      }

      export interface UpdateRequest {
        /** 人才在外部系统创建时间 */
        external_create_time: string
      }

      export interface UpdateResponse {
        /** 人才外部信息 */
        external_info?: Lark.TalentExternalInfo
      }
    }
  }

  export namespace ExternalApplication {
    export interface Methods {
      /**
       * 创建外部投递
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新外部投递
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/update
       */
      update(external_application_id: string, body: UpdateRequest): Promise<UpdateResponse>
      /**
       * 查询外部投递列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/list
       */
      list(query?: ListQuery): Paginated<Lark.ExternalApplication>
      /**
       * 删除外部投递
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/delete
       */
      delete(external_application_id: string, query?: DeleteQuery): Promise<DeleteResponse>
    }

    export const enum CreateRequestJobRecruitmentType {
      /** 社招 */
      SocialRecruitment = 1,
      /** 校招 */
      CampusRecruitment = 2,
    }

    export const enum CreateRequestDeliveryType {
      /** HR 寻访 */
      HRVisit = 1,
      /** 候选人主动投递 */
      CandidateDelivery = 2,
      /** 人才推荐 */
      TalentRecommend = 3,
      /** 其他 */
      Others = 4,
    }

    export interface CreateRequest {
      /** 外部系统背调主键 （仅用于幂等） */
      external_id?: string
      /** 职位招聘类型 */
      job_recruitment_type?: CreateRequestJobRecruitmentType
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
      delivery_type?: CreateRequestDeliveryType
      /** 更新时间，招聘系统内用作投递在外部系统终止时间 */
      modify_time?: number
      /** 投递在外部系统创建时间 */
      create_time?: number
      /** 终止类型 */
      termination_type?: string
    }

    export interface CreateResponse {
      external_application?: Lark.ExternalApplication
    }

    export const enum UpdateRequestJobRecruitmentType {
      /** 社招 */
      SocialRecruitment = 1,
      /** 校招 */
      CampusRecruitment = 2,
    }

    export const enum UpdateRequestDeliveryType {
      /** HR 寻访 */
      HRVisit = 1,
      /** 候选人主动投递 */
      CandidateDelivery = 2,
      /** 人才推荐 */
      TalentRecommend = 3,
      /** 其他 */
      Others = 4,
    }

    export interface UpdateRequest {
      /** 职位招聘类型 */
      job_recruitment_type?: UpdateRequestJobRecruitmentType
      /** 职位名称 */
      job_title?: string
      /** 简历来源 */
      resume_source?: string
      /** 阶段 */
      stage?: string
      /** 终止原因 */
      termination_reason?: string
      /** 投递类型 */
      delivery_type?: UpdateRequestDeliveryType
      /** 更新时间，招聘系统内用作投递在外部系统终止时间 */
      modify_time?: number
      /** 投递在外部系统创建时间 */
      create_time?: number
      /** 终止类型 */
      termination_type?: string
    }

    export interface UpdateResponse {
      external_application?: Lark.ExternalApplication
    }

    export interface ListQuery extends Pagination {
      /** 人才ID */
      talent_id: string
    }

    export interface DeleteQuery {
      /** 人才ID */
      talent_id?: string
    }

    export interface DeleteResponse {
      external_application?: Lark.ExternalApplication
    }
  }

  export namespace ExternalInterview {
    export interface Methods {
      /**
       * 创建外部面试
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新外部面试
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/update
       */
      update(external_interview_id: string, body: UpdateRequest): Promise<UpdateResponse>
      /**
       * 查询外部面试列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Paginated<Lark.ExternalInterview>
      /**
       * 删除外部面试
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/delete
       */
      delete(external_interview_id: string): Promise<void>
    }

    export const enum CreateRequestParticipateStatus {
      /** 未参与 */
      NotStart = 1,
      /** 参与 */
      Participated = 2,
      /** 爽约 */
      NotPaticipated = 3,
    }

    export interface CreateRequest {
      /** 外部系统面试主键 （仅用于幂等） */
      external_id?: string
      /** 外部投递 ID */
      external_application_id: string
      /** 参与状态 */
      participate_status?: CreateRequestParticipateStatus
      /** 开始时间 */
      begin_time?: number
      /** 结束时间 */
      end_time?: number
      /** 面试评价列表 */
      interview_assessments?: Lark.ExternalInterviewAssessment[]
    }

    export interface CreateResponse {
      external_interview?: Lark.ExternalInterview
    }

    export const enum UpdateRequestParticipateStatus {
      /** 未参与 */
      NotStart = 1,
      /** 参与 */
      Participated = 2,
      /** 爽约 */
      NotPaticipated = 3,
    }

    export interface UpdateRequest {
      /** 外部投递 ID */
      external_application_id: string
      /** 参与状态 */
      participate_status?: UpdateRequestParticipateStatus
      /** 开始时间 */
      begin_time?: number
      /** 结束时间 */
      end_time?: number
      /** 面试评价列表 */
      interview_assessments?: Lark.ExternalInterviewAssessment[]
    }

    export interface UpdateResponse {
      external_interview?: Lark.ExternalInterview
    }

    export interface BatchQueryRequest {
      /** 外部面试 ID列表,当传递此值时,以此值为准 */
      external_interview_id_list?: string[]
    }

    export interface BatchQueryQuery extends Pagination {
      /** 外部投递 ID */
      external_application_id?: string
    }
  }

  export namespace ExternalInterviewAssessment {
    export interface Methods {
      /**
       * 创建外部面评
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新外部面评
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/patch
       */
      patch(external_interview_assessment_id: string, body: PatchRequest): Promise<PatchResponse>
    }

    export const enum CreateRequestConclusion {
      /** 不通过 */
      Fail = 1,
      /** 通过 */
      Pass = 2,
      /** 待定 */
      ToBeDetermined = 3,
    }

    export interface CreateRequest {
      /** 外部系统面评主键（仅用于幂等） */
      external_id?: string
      /** 面试官姓名 */
      username?: string
      /** 面试结果 */
      conclusion?: CreateRequestConclusion
      /** 评价维度列表 */
      assessment_dimension_list?: Lark.ExternalInterviewAssessmentDimension[]
      /** 综合记录 */
      content?: string
      /** 外部面试 ID */
      external_interview_id?: string
    }

    export interface CreateResponse {
      external_interview_assessment?: Lark.ExternalInterviewAssessment
    }

    export const enum PatchRequestConclusion {
      /** 不通过 */
      Fail = 1,
      /** 通过 */
      Pass = 2,
      /** 待定 */
      ToBeDetermined = 3,
    }

    export interface PatchRequest {
      /** 面试官姓名 */
      username?: string
      /** 面试结果 */
      conclusion?: PatchRequestConclusion
      /** 评价维度列表 */
      assessment_dimension_list?: Lark.ExternalInterviewAssessmentDimension[]
      /** 综合记录 */
      content?: string
    }

    export interface PatchResponse {
      external_interview_assessment?: Lark.ExternalInterviewAssessment
    }
  }

  export namespace ExternalOffer {
    export interface Methods {
      /**
       * 创建外部 Offer
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新外部 Offer
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/update
       */
      update(external_offer_id: string, body: UpdateRequest): Promise<UpdateResponse>
      /**
       * 查询外部 Offer 列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Paginated<Lark.ExternalOffer>
      /**
       * 删除外部 Offer
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_offer/delete
       */
      delete(external_offer_id: string): Promise<void>
    }

    export interface CreateRequest {
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

    export interface CreateResponse {
      external_offer?: Lark.ExternalOffer
    }

    export interface UpdateRequest {
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

    export interface UpdateResponse {
      external_offer?: Lark.ExternalOffer
    }

    export interface BatchQueryRequest {
      /** 外部 Offer ID列表,当传递此值时,以此值为准 */
      external_offer_id_list?: string[]
    }

    export interface BatchQueryQuery extends Pagination {
      /** 外部投递 ID */
      external_application_id?: string
    }
  }

  export namespace ExternalBackgroundCheck {
    export interface Methods {
      /**
       * 创建外部背调
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新外部背调
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/update
       */
      update(external_background_check_id: string, body: UpdateRequest): Promise<UpdateResponse>
      /**
       * 查询外部背调列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Paginated<Lark.ExternalBackgroundCheck>
      /**
       * 删除外部背调
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/delete
       */
      delete(external_background_check_id: string): Promise<void>
    }

    export interface CreateRequest {
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

    export interface CreateResponse {
      external_background_check?: Lark.ExternalBackgroundCheck
    }

    export interface UpdateRequest {
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

    export interface UpdateResponse {
      external_background_check?: Lark.ExternalBackgroundCheck
    }

    export interface BatchQueryRequest {
      /** 外部背调 ID 列表,当传递此值时,以此值为准 */
      external_background_check_id_list?: string[]
    }

    export interface BatchQueryQuery extends Pagination {
      /** 外部投递 ID */
      external_application_id?: string
    }
  }

  export namespace ExternalReferralReward {
    export interface Methods {
      /**
       * 导入外部内推奖励
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_referral_reward/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 删除外部内推奖励
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_referral_reward/delete
       */
      delete(external_referral_reward_id: string): Promise<void>
    }

    export const enum CreateRequestRuleType {
      /** 入职奖励，候选人入职或转正后产生的奖励 */
      Onboard = 1,
      /** 过程奖励，入职奖励外，若候选人有阶段性进展，则给予内推人对应的奖励 */
      Processe = 2,
      /** 活动奖励，额外奖励，用于支持内推周期性活动 */
      Active = 3,
      /** 开源奖励，若内推候选人首次进入人才库，且在被推荐后一段时间内，入职了规则内的任意职位的奖励 */
      OpenSource = 4,
      /** 其他奖励，以上奖励无法覆盖的奖励 */
      Other = 5,
    }

    export const enum CreateRequestStage {
      /** 待确认 */
      ToBeConfirmed = 1,
      /** 已确认 */
      Confirmed = 2,
      /** 已发放 */
      Paid = 3,
    }

    export interface CreateRequest {
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
      rule_type: CreateRequestRuleType
      /** 奖励数据 */
      bonus: Lark.BonusAmount
      /** 导入的内推奖励状态 */
      stage: CreateRequestStage
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

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** 创建的内推奖励的id */
      id?: string
    }
  }

  export namespace TalentPool {
    export interface Methods {
      /**
       * 批量加入/移除人才库中人才
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/batch_change_talent_pool
       */
      batchChangeTalentPool(talent_pool_id: string, body: BatchChangeTalentPoolRequest): Promise<void>
      /**
       * 获取人才库列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/search
       */
      search(query?: SearchQuery): Paginated<Lark.TalentPool>
      /**
       * 将人才加入人才库
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_pool/move_talent
       */
      moveTalent(talent_pool_id: string, body: MoveTalentRequest): Promise<MoveTalentResponse>
    }

    export const enum BatchChangeTalentPoolRequestOptionType {
      /** 加入人才库操作 */
      Add = 1,
      /** 从指定人才库移除 */
      Remove = 2,
    }

    export interface BatchChangeTalentPoolRequest {
      /** 人才 ID 列表 */
      talent_id_list: string[]
      /** 操作类型 */
      option_type: BatchChangeTalentPoolRequestOptionType
    }

    export interface SearchQuery extends Pagination {
      /** 人才库ID列表 */
      id_list?: string[]
    }

    export const enum MoveTalentRequestAddType {
      /** 仅加入指定人才库 */
      OnlyAdd = 1,
      /** 加入指定人才库并从所有原库移除 */
      AddAndRemoveFromOrigin = 2,
    }

    export interface MoveTalentRequest {
      /** 人才ID */
      talent_id: string
      /** 操作类型 */
      add_type: MoveTalentRequestAddType
    }

    export interface MoveTalentResponse {
      /** 人才库ID */
      talent_pool_id?: string
      /** 人才ID */
      talent_id?: string
    }
  }

  export namespace TalentFolder {
    export interface Methods {
      /**
       * 获取人才文件夹列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_folder/list
       */
      list(query?: ListQuery): Paginated<Lark.TalentFolderForList>
    }

    export interface ListQuery extends Pagination {
      /** 用户ID类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace TalentObject {
    export interface Methods {
      /**
       * 获取人才字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query
       */
      query(): Promise<QueryResponse>
    }

    export interface QueryResponse {
      items?: Lark.CommonSchema[]
    }
  }

  export namespace TalentBlocklist {
    export interface Methods {
      /**
       * 加入/移除屏蔽名单
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_blocklist/change_talent_block
       */
      changeTalentBlock(body: ChangeTalentBlockRequest): Promise<void>
    }

    export const enum ChangeTalentBlockRequestOption {
      /** 加入屏蔽名单操作 */
      Add = 1,
      /** 从屏蔽名单中移除 */
      Remove = 2,
    }

    export interface ChangeTalentBlockRequest {
      /** 人才 ID */
      talent_id: string
      /** 操作类型 */
      option: ChangeTalentBlockRequestOption
      /** 原因，当执行加入屏蔽名单操作时必填 */
      reason?: string
    }
  }

  export namespace Application {
    export interface Methods {
      interview: Interview.Methods
      /**
       * 获取投递详情
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get_detail
       */
      getDetail(application_id: string, query?: GetDetailQuery): Promise<GetDetailResponse>
      /**
       * 恢复投递
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/recover
       */
      recover(application_id: string): Promise<void>
      /**
       * 创建投递
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 终止投递
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/terminate
       */
      terminate(application_id: string, body: TerminateRequest): Promise<void>
      /**
       * 转移投递阶段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_stage
       */
      transferStage(application_id: string, body: TransferStageRequest): Promise<void>
      /**
       * 获取投递信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get
       */
      get(application_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取投递列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/list
       */
      list(query?: ListQuery): Paginated<string>
      /**
       * 获取 Offer 信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/offer
       */
      offer(application_id: string, query?: OfferQuery): Promise<OfferResponse>
      /**
       * 操作候选人入职
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_onboard
       */
      transferOnboard(application_id: string, body: TransferOnboardRequest, query?: TransferOnboardQuery): Promise<TransferOnboardResponse>
      /**
       * 取消候选人入职
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/cancel_onboard
       */
      cancelOnboard(application_id: string, body: CancelOnboardRequest): Promise<void>
    }

    export interface GetDetailQuery {
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
      options?: ('with_job' | 'with_talent' | 'with_interview' | 'with_offer' | 'with_evaluation' | 'with_employee' | 'with_agency' | 'with_referral' | 'with_portal')[]
    }

    export interface GetDetailResponse {
      /** 投递详情 */
      application_detail?: Lark.ApplicationDetailInfo
    }

    export interface CreateRequest {
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

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** 投递ID */
      id?: string
    }

    export interface TerminateRequest {
      /** 终止原因的类型 */
      termination_type: 1 | 22 | 27
      /** 终止的具体原因的id列表 */
      termination_reason_list?: string[]
      /** 终止备注 */
      termination_reason_note?: string
    }

    export interface TransferStageRequest {
      /** 要转移到的阶段 ID，可通过「获取招聘流程信息」接口获取阶段 ID 枚举 */
      stage_id: string
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 请求控制参数，用于控制接口响应逻辑。如需一次查询多个用户ID，可通过将同一参数名多次传递，并且每次传递不同的参数值。 */
      options?: ('get_latest_application_on_chain')[]
    }

    export interface GetResponse {
      /** 投递数据 */
      application?: Lark.Application
    }

    export interface ListQuery extends Pagination {
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
      lock_status?: (1 | 2 | 3)[]
      /** 最早更新时间，毫秒级时间戳 */
      update_start_time?: string
      /** 最晚更新时间，毫秒级时间戳 */
      update_end_time?: string
    }

    export interface OfferQuery {
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

    export interface OfferResponse {
      offer?: Lark.ApplicationOffer
    }

    export interface TransferOnboardRequest {
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

    export interface TransferOnboardQuery {
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

    export interface TransferOnboardResponse {
      /** employee */
      employee?: Lark.Employee
    }

    export interface CancelOnboardRequest {
      /** 终止类型 */
      termination_type: 1 | 22 | 27
      /** 终止原因 ID 列表 */
      termination_reason_id_list?: string[]
      /** 备注 */
      termination_reason_notes?: string
    }

    export namespace Interview {
      export interface Methods {
        /**
         * 获取面试记录列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application-interview/list
         */
        list(application_id: string, query?: ListQuery): Paginated<Lark.Interview>
      }

      export interface ListQuery extends Pagination {
        /** 此次调用中使用的用户ID的类型 */
        user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
        /** 此次调用中使用的「职级 ID」的类型 */
        job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
      }
    }
  }

  export namespace TerminationReason {
    export interface Methods {
      /**
       * 获取终止投递原因
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/termination_reason/list
       */
      list(query?: Pagination): Paginated<Lark.TerminationReason>
    }
  }

  export namespace DiversityInclusion {
    export interface Methods {
      /**
       * 获取申请表附加信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/diversity_inclusion/search
       */
      search(body: SearchRequest): Promise<SearchResponse>
    }

    export interface SearchRequest {
      /** 需要查询DI数据的人才ID列表 */
      talent_ids?: string[]
      /** 需要查询DI数据的投递ID列表 */
      application_ids?: string[]
    }

    export interface SearchResponse {
      /** 多元化与包容性信息列表 */
      items?: Lark.DiInfo[]
    }
  }

  export namespace Evaluation {
    export interface Methods {
      /**
       * 获取简历评估信息列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation/list
       */
      list(query?: ListQuery): Paginated<Lark.Evaluation>
    }

    export interface ListQuery extends Pagination {
      /** 投递 ID */
      application_id?: string
      /** 最早更新时间，毫秒级时间戳 */
      update_start_time?: string
      /** 最晚更新时间，毫秒级时间戳 */
      update_end_time?: string
      /** 用户ID类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace Exam {
    export interface Methods {
      /**
       * 添加笔试结果
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/exam/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
    }

    export interface CreateRequest {
      /** 投递 ID */
      application_id: string
      /** 试卷名称 */
      exam_resource_name: string
      /** 笔试分数 */
      score: number
      /** 报告附件，使用[创建附件](https://open.feishu.cn/document/ukTMukTMukTM/uIDN1YjLyQTN24iM0UjN/create_attachment)上传，获取附件ID，支持的文件格式：JPG、JPEG、PNG、PDF，不超过 100MB。 */
      uuid?: string
      /** 添加人 ID */
      operator_id: string
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface CreateResponse {
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
  }

  export namespace Test {
    export interface Methods {
      /**
       * 获取笔试列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/test/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.Test>
    }

    export interface SearchRequest {
      /** 投递 ID 列表，最多 100 个，默认查询全部投递 */
      application_id_list?: string[]
      /** 笔试开始时间晚于等于的时间 */
      test_start_time_min?: string
      /** 笔试开始时间早于等于的时间 */
      test_start_time_max?: string
    }

    export interface SearchQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }
  }

  export namespace Interview {
    export interface Methods {
      /**
       * 获取面试信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/list
       */
      list(query?: ListQuery): Paginated<Lark.InterviewExtend>
      /**
       * 获取人才面试信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/get_by_talent
       */
      getByTalent(query?: GetByTalentQuery): Promise<GetByTalentResponse>
    }

    export interface ListQuery extends Pagination {
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

    export interface GetByTalentQuery {
      /** 人才 ID */
      talent_id: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
      /** 此次调用中使用的「职级 ID」的类型 */
      job_level_id_type?: 'people_admin_job_level_id' | 'job_level_id'
    }

    export interface GetByTalentResponse {
      /** 投递面试列表 */
      items?: Lark.TalentInterview[]
    }
  }

  export namespace InterviewRecord {
    export interface Methods {
      attachment: Attachment.Methods
      /**
       * 获取面试评价详细信息（新版）
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/interview_record/get
       */
      get(interview_record_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 批量获取面试评价详细信息（新版）
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/hire-v2/interview_record/list
       */
      list(query?: ListQuery): Paginated<Lark.InterviewRecord>
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetResponse {
      interview_record?: Lark.InterviewRecord
    }

    export interface ListQuery extends Pagination {
      /** 面试评价ID列表，使用该筛选项时不会分页 */
      ids?: string[]
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export namespace Attachment {
      export interface Methods {
        /**
         * 获取面试记录附件
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_record-attachment/get
         */
        get(query?: GetQuery): Promise<GetResponse>
      }

      export const enum GetQueryLanguage {
        /** 中文 */
        Zh = 1,
        /** 英文 */
        En = 2,
      }

      export interface GetQuery {
        /** 投递 ID */
        application_id: string
        /** 面试记录 ID */
        interview_record_id?: string
        /** 面试记录语言 */
        language?: GetQueryLanguage
      }

      export interface GetResponse {
        /** 附件信息 */
        attachment?: Lark.AttachmentInfo
      }
    }
  }

  export namespace Minutes {
    export interface Methods {
      /**
       * 获取面试速记明细
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/minutes/get
       */
      get(query?: GetQuery): Promise<GetResponse>
    }

    export interface GetQuery extends Pagination {
      /** 面试ID */
      interview_id: string
    }

    export interface GetResponse {
      minutes?: Lark.Minutes
      /** 分页标记，当 has_more 为 true 时，会同时返回新的 page_token，否则不返回 page_token */
      page_token?: string
      /** 对应面试是否还有更多项 */
      has_more?: boolean
    }
  }

  export namespace Questionnaire {
    export interface Methods {
      /**
       * 获取面试满意度问卷列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/questionnaire/list
       */
      list(query?: ListQuery): Paginated<Lark.Questionnaire>
    }

    export interface ListQuery extends Pagination {
      /** 投递 ID */
      application_id?: string
      /** 面试 ID */
      interview_id?: string
      /** 最早更新时间 */
      update_start_time?: string
      /** 最晚更新时间 */
      update_end_time?: string
    }
  }

  export namespace Offer {
    export interface Methods {
      /**
       * 创建 Offer
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新 Offer 信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/update
       */
      update(offer_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
      /**
       * 获取 Offer 详情
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/get
       */
      get(offer_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取 Offer 列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/list
       */
      list(query?: ListQuery): Paginated<Lark.OfferListInfo>
      /**
       * 更新 Offer 状态
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/offer_status
       */
      offerStatus(offer_id: string, body: OfferStatusRequest): Promise<void>
      /**
       * 更新实习 Offer 入/离职状态
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/intern_offer_status
       */
      internOfferStatus(offer_id: string, body: InternOfferStatusRequest): Promise<InternOfferStatusResponse>
    }

    export interface CreateRequest {
      /** 投递 ID */
      application_id: string
      /** 模板 ID */
      schema_id?: string
      /** Offer 类型 */
      offer_type?: 1 | 2
      /** Offer 基本信息 */
      basic_info: Lark.OfferBasicInfo
      /** Offer 薪资信息 */
      salary_info?: Lark.OfferSalaryInfo
      /** 自定义信息 */
      customized_info_list?: Lark.OfferCustomizedInfo[]
    }

    export interface CreateQuery {
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

    export interface CreateResponse {
      /** Offer ID */
      offer_id?: string
      /** 投递 ID */
      application_id?: string
      /** 模板 ID */
      schema_id?: string
      /** Offer 类型 */
      offer_type?: 1 | 2
      /** Offer 基本信息 */
      basic_info?: Lark.OfferBasicInfo
      /** Offer 薪资信息 */
      salary_info?: Lark.OfferSalaryInfo
      /** 自定义信息 */
      customized_info_list?: Lark.OfferCustomizedInfo[]
    }

    export interface UpdateRequest {
      /** 模板 ID */
      schema_id: string
      /** Offer 基本信息 */
      basic_info: Lark.OfferBasicInfo
      /** Offer 薪资信息 */
      salary_info?: Lark.OfferSalaryInfo
      /** 自定义信息 */
      customized_info_list?: Lark.OfferCustomizedInfo[]
    }

    export interface UpdateQuery {
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

    export interface UpdateResponse {
      /** Offer ID */
      offer_id?: string
      /** 模板 ID */
      schema_id?: string
      /** Offer 基本信息 */
      basic_info?: Lark.OfferBasicInfo
      /** Offer 薪资信息 */
      salary_info?: Lark.OfferSalaryInfo
      /** 自定义信息 */
      customized_info_list?: Lark.OfferCustomizedInfo[]
    }

    export interface GetQuery {
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

    export interface GetResponse {
      /** Offer 详情 */
      offer?: Lark.Offer
    }

    export interface ListQuery extends Pagination {
      /** 人才 ID */
      talent_id: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
      /** 此次调用中使用的「人员类型 ID」的类型 */
      employee_type_id_type?: 'people_admin_employee_type_id' | 'employee_type_enum_id'
    }

    export const enum OfferStatusRequestOfferStatus {
      /** Offer 审批中 */
      Approving = 2,
      /** Offer 审批已撤回 */
      Withdrawn = 3,
      /** Offer 审批通过 */
      Approved = 4,
      /** Offer 审批不通过 */
      Rejected = 5,
      /** Offer 已发出 */
      OfferLetterSent = 6,
      /** Offer 被候选人接受 */
      OfferAccepted = 7,
      /** Offer 被候选人拒绝 */
      OfferRejected = 8,
      /** Offer 已失效 */
      Obsolete = 9,
      /** Offer 已创建 */
      NoApproval = 10,
    }

    export interface OfferStatusRequest {
      /** offer状态 */
      offer_status: OfferStatusRequestOfferStatus
      /** offer 失效时间，当反馈状态是「offer已发出」时为必填项 */
      expiration_date?: string
      /** 终止原因列表，当反馈状态是「候选人已拒绝」时为必填项；最多传入50个 */
      termination_reason_id_list?: string[]
      /** 终止备注 */
      termination_reason_note?: string
    }

    export interface InternOfferStatusRequest {
      /** 更新入/离职状态的操作 */
      operation: 'confirm_onboarding' | 'cancel_onboarding' | 'offboard'
      /** 入职表单信息（当 operation 为 confirm_onboarding 时，该字段必填） */
      onboarding_info?: Lark.InternOfferOnboardingInfo
      /** 离职表单信息（当 operation 为 offboard 时，该字段必填） */
      offboarding_info?: Lark.InternOfferOffboardingInfo
    }

    export interface InternOfferStatusResponse {
      /** Offer ID */
      offer_id?: string
      /** 更新入/离职状态的操作 */
      operation: 'confirm_onboarding' | 'cancel_onboarding' | 'offboard'
      /** 入职表单信息（当 operation 为 confirm_onboarding 时，该字段必填） */
      onboarding_info?: Lark.InternOfferOnboardingInfo
      /** 离职表单信息（当 operation 为 offboard 时，该字段必填） */
      offboarding_info?: Lark.InternOfferOffboardingInfo
    }
  }

  export namespace BackgroundCheckOrder {
    export interface Methods {
      /**
       * 获取背调信息列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/background_check_order/list
       */
      list(query?: ListQuery): Paginated<Lark.BackgroundCheckOrder>
      /**
       * 查询背调信息列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/background_check_order/batch_query
       */
      batchQuery(body: BatchQueryRequest, query?: BatchQueryQuery): Paginated<Lark.BackgroundCheckOrder>
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
      /** 投递 ID */
      application_id?: string
      /** 最早更新时间，毫秒级时间戳 */
      update_start_time?: string
      /** 最晚更新时间，毫秒级时间戳 */
      update_end_time?: string
    }

    export interface BatchQueryRequest {
      /** 背调订单 ID 列表 */
      background_check_order_id_list?: string[]
      /** 最早更新时间,毫秒级时间戳 */
      update_start_time?: string
      /** 最晚更新时间,毫秒级时间戳 */
      update_end_time?: string
      /** 最早创建时间,毫秒级时间戳 */
      begin_start_time?: string
      /** 最晚创建时间,毫秒级时间戳 */
      begin_end_time?: string
      /** 投递 ID */
      application_id?: string
      /** 订单状态 */
      order_status?: '2' | '3' | '4' | '5' | '6' | '8' | '9'
    }

    export interface BatchQueryQuery extends Pagination {
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }
  }

  export namespace TripartiteAgreement {
    export interface Methods {
      /**
       * 创建三方协议
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 获取三方协议
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/list
       */
      list(query?: ListQuery): Paginated<Lark.TripartiteAgreementInfo>
      /**
       * 更新三方协议
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/update
       */
      update(tripartite_agreement_id: string, body: UpdateRequest): Promise<UpdateResponse>
      /**
       * 删除三方协议
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/tripartite_agreement/delete
       */
      delete(tripartite_agreement_id: string): Promise<void>
    }

    export const enum CreateRequestState {
      /** 未开始 */
      NotStarted = 1,
      /** 已申请 */
      Applied = 2,
      /** 学生处理中 */
      StudentProcessing = 3,
      /** 公司处理中 */
      CompanyProcessing = 4,
      /** 学校处理中 */
      SchoolProcessing = 5,
      /** 已终止 */
      Ended = 6,
      /** 已完成 */
      Completed = 7,
      /** 解约处理中 */
      TerminationProcessing = 8,
      /** 已解约 */
      Terminated = 9,
    }

    export interface CreateRequest {
      /** 投递ID */
      application_id: string
      /** 三方协议状态 */
      state: CreateRequestState
      /** 三方协议创建时间，毫秒时间戳 */
      create_time: string
    }

    export interface CreateResponse {
      /** 创建的三方协议的 id */
      id?: string
    }

    export interface ListQuery extends Pagination {
      /** 投递 ID，必填投递 id 与三方协议 ID 其中之一 */
      application_id?: string
      /** 三方协议 ID，必填投递 id 与三方协议 ID 其中之一 */
      tripartite_agreement_id?: string
    }

    export const enum UpdateRequestState {
      /** 未开始 */
      NotStarted = 1,
      /** 已申请 */
      Applied = 2,
      /** 学生处理中 */
      StudentProcessing = 3,
      /** 公司处理中 */
      CompanyProcessing = 4,
      /** 学校处理中 */
      SchoolProcessing = 5,
      /** 已终止 */
      Ended = 6,
      /** 已完成 */
      Completed = 7,
      /** 解约处理中 */
      TerminationProcessing = 8,
      /** 已解约 */
      Terminated = 9,
    }

    export interface UpdateRequest {
      /** 三方协议状态 */
      state: UpdateRequestState
      /** 三方协议修改时间戳，不可小于创建时间或者当前修改时间 */
      modify_time: string
    }

    export interface UpdateResponse {
      /** 三方协议信息 */
      tripartite_agreement?: Lark.TripartiteAgreementInfo
    }
  }

  export namespace EhrImportTask {
    export interface Methods {
      /**
       * 更新 e-HR 导入任务结果
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/ehr_import_task/patch
       */
      patch(ehr_import_task_id: string, body: PatchRequest): Promise<void>
    }

    export interface PatchRequest {
      /** 失败原因 */
      fail_reason?: string
      /** 跳转链接 */
      redirect_url?: string
      /** 状态 */
      state: 1 | 2
    }
  }

  export namespace Employee {
    export interface Methods {
      /**
       * 更新员工状态
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/patch
       */
      patch(employee_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 通过投递 ID 获取入职信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get_by_application
       */
      getByApplication(query?: GetByApplicationQuery): Promise<GetByApplicationResponse>
      /**
       * 通过员工 ID 获取入职信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get
       */
      get(employee_id: string, query?: GetQuery): Promise<GetResponse>
    }

    export const enum PatchRequestOperation {
      /** 转正 */
      Convert = 1,
      /** 离职 */
      Overboard = 2,
    }

    export interface PatchRequest {
      /** 修改状态操作 */
      operation: PatchRequestOperation
      conversion_info?: Lark.EmployeeConversionInfo
      overboard_info?: Lark.EmployeeOverboardInfo
    }

    export interface PatchQuery {
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

    export interface PatchResponse {
      /** 员工信息 */
      employee?: Lark.Employee
    }

    export interface GetByApplicationQuery {
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

    export interface GetByApplicationResponse {
      /** 员工信息 */
      employee?: Lark.Employee
    }

    export interface GetQuery {
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

    export interface GetResponse {
      /** 员工信息 */
      employee?: Lark.Employee
    }
  }

  export namespace Todo {
    export interface Methods {
      /**
       * 批量获取待办事项
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/todo/list
       */
      list(query?: ListQuery): Paginated<Lark.Todo>
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID，当 token 为租户 token 时，必须传入该字段，当 token 为用户 token 时，不传该字段 */
      user_id?: string
      /** 用户 ID 类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
      /** 待办类型 */
      type: 'evaluation' | 'offer' | 'exam' | 'interview'
    }
  }

  export namespace EvaluationTask {
    export interface Methods {
      /**
       * 获取简历评估任务列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation_task/list
       */
      list(query?: ListQuery): Paginated<Lark.EvaluationTask>
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID */
      user_id: string
      /** 任务状态 */
      activity_status?: 1 | 2 | 3
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace ExamMarkingTask {
    export interface Methods {
      /**
       * 获取笔试阅卷任务列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/exam_marking_task/list
       */
      list(query?: ListQuery): Paginated<Lark.ExamMarkingTask>
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID */
      user_id: string
      /** 任务状态 */
      activity_status?: 1 | 2
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace InterviewTask {
    export interface Methods {
      /**
       * 获取面试任务列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview_task/list
       */
      list(query?: ListQuery): Paginated<Lark.InterviewTask>
    }

    export interface ListQuery extends Pagination {
      /** 用户 ID */
      user_id: string
      /** 任务状态 */
      activity_status?: 1 | 2 | 3 | 5
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace Note {
    export interface Methods {
      /**
       * 创建备注
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新备注
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/patch
       */
      patch(note_id: string, body: PatchRequest, query?: PatchQuery): Promise<PatchResponse>
      /**
       * 获取备注
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/get
       */
      get(note_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取备注列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/list
       */
      list(query?: ListQuery): Paginated<Lark.Note>
      /**
       * 删除备注
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/delete
       */
      delete(note_id: string): Promise<void>
    }

    export const enum CreateRequestPrivacy {
      /** 私密 */
      Private = 1,
      /** 公开 */
      Public = 2,
    }

    export interface CreateRequest {
      /** 人才ID */
      talent_id: string
      /** 投递ID */
      application_id?: string
      /** 创建人ID */
      creator_id?: string
      /** 内容 */
      content: string
      /** 备注私密属性（默认为公开） */
      privacy?: CreateRequestPrivacy
      /** 是否通知被@的用户 */
      notify_mentioned_user?: boolean
      /** 被@用户列表 */
      mention_entity_list?: Lark.MentionEntity[]
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface CreateResponse {
      note?: Lark.Note
    }

    export interface PatchRequest {
      /** 备注内容 */
      content: string
      /** 更新人 ID */
      operator_id?: string
      /** 是否通知被@的用户 */
      notify_mentioned_user?: boolean
      /** 被@用户列表 */
      mention_entity_list?: Lark.MentionEntity[]
    }

    export interface PatchQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface PatchResponse {
      /** 备注数据 */
      note?: Lark.Note
    }

    export interface GetQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }

    export interface GetResponse {
      /** 备注数据 */
      note?: Lark.Note
    }

    export interface ListQuery extends Pagination {
      /** 人才ID */
      talent_id: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
    }
  }

  export namespace ResumeSource {
    export interface Methods {
      /**
       * 获取简历来源列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/resume_source/list
       */
      list(query?: Pagination): Paginated<Lark.ResumeSource>
    }
  }

  export namespace EcoAccountCustomField {
    export interface Methods {
      /**
       * 创建账号自定义字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/create
       */
      create(body: CreateRequest): Promise<void>
      /**
       * 更新账号自定义字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_update
       */
      batchUpdate(body: BatchUpdateRequest): Promise<void>
      /**
       * 删除账号自定义字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_delete
       */
      batchDelete(body: BatchDeleteRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 适用范围 */
      scope: 1 | 2
      /** 自定义字段列表 */
      custom_field_list: Lark.EcoAccountCustomFieldData[]
    }

    export interface BatchUpdateRequest {
      /** 适用范围 */
      scope: 1 | 2
      /** 自定义字段列表 */
      custom_field_list: Lark.EcoAccountCustomFieldData[]
    }

    export interface BatchDeleteRequest {
      /** 适用范围 */
      scope: 1 | 2
      /** 要删除的自定义字段的 key 列表 */
      custom_field_key_list?: string[]
    }
  }

  export namespace EcoBackgroundCheckCustomField {
    export interface Methods {
      /**
       * 创建背调自定义字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/create
       */
      create(body: CreateRequest): Promise<void>
      /**
       * 更新背调自定义字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_update
       */
      batchUpdate(body: BatchUpdateRequest): Promise<void>
      /**
       * 删除背调自定义字段
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_delete
       */
      batchDelete(body: BatchDeleteRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 背调账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 自定义字段列表 */
      custom_field_list: Lark.EcoBackgroundCheckCustomFieldData[]
    }

    export interface BatchUpdateRequest {
      /** 背调账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 自定义字段列表 */
      custom_field_list: Lark.EcoBackgroundCheckCustomFieldData[]
    }

    export interface BatchDeleteRequest {
      /** 背调账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
    }
  }

  export namespace EcoBackgroundCheckPackage {
    export interface Methods {
      /**
       * 创建背调套餐和附加调查项
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/create
       */
      create(body: CreateRequest): Promise<void>
      /**
       * 更新背调套餐和附加调查项
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_update
       */
      batchUpdate(body: BatchUpdateRequest): Promise<void>
      /**
       * 删除背调套餐和附加调查项
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_delete
       */
      batchDelete(body: BatchDeleteRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 背调账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 背调套餐列表 */
      package_list: Lark.EcoBackgroundCheckPackageData[]
      /** 附加调查项列表 */
      additional_item_list?: Lark.EcoBackgroundCheckPackageAdditionalItem[]
    }

    export interface BatchUpdateRequest {
      /** 背调账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 背调套餐列表 */
      package_list: Lark.EcoBackgroundCheckPackageData[]
      /** 附加调查项列表 */
      additional_item_list?: Lark.EcoBackgroundCheckPackageAdditionalItem[]
    }

    export interface BatchDeleteRequest {
      /** 背调账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 要删除的套餐 ID 列表，删除套餐不影响已安排的背调 */
      package_id_list?: string[]
      /** 要删除的附加调查项 ID 列表，删除附加调查项不影响已安排的背调 */
      additional_item_id_list?: string[]
    }
  }

  export namespace EcoBackgroundCheck {
    export interface Methods {
      /**
       * 更新背调订单进度
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_progress
       */
      updateProgress(body: UpdateProgressRequest): Promise<void>
      /**
       * 回传背调订单的最终结果
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_result
       */
      updateResult(body: UpdateResultRequest): Promise<void>
      /**
       * 终止背调订单
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/cancel
       */
      cancel(body: CancelRequest): Promise<void>
    }

    export interface UpdateProgressRequest {
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
      report_file_list?: Lark.EcoBackgroundCheckReportFile[]
    }

    export interface UpdateResultRequest {
      /** 背调 ID */
      background_check_id: string
      /** 背调结果 */
      result: string
      /** 背调结果时间 */
      result_time: string
      /** 操作人角色，默认值为 1 */
      operator_role?: 1 | 2
      /** 报告列表 */
      report_file_list?: Lark.EcoBackgroundCheckReportFile[]
    }

    export interface CancelRequest {
      /** 背调 ID */
      background_check_id: string
    }
  }

  export namespace EcoExamPaper {
    export interface Methods {
      /**
       * 创建试卷列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/create
       */
      create(body: CreateRequest): Promise<void>
      /**
       * 更新试卷列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_update
       */
      batchUpdate(body: BatchUpdateRequest): Promise<void>
      /**
       * 删除试卷列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam_paper/batch_delete
       */
      batchDelete(body: BatchDeleteRequest): Promise<void>
    }

    export interface CreateRequest {
      /** 账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 试卷列表 */
      paper_list: Lark.EcoExamPaperData[]
    }

    export interface BatchUpdateRequest {
      /** 账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 试卷列表 */
      paper_list: Lark.EcoExamPaperData[]
    }

    export interface BatchDeleteRequest {
      /** 背调账号 ID，可在「账号绑定」事件中获取 */
      account_id: string
      /** 试卷 ID 列表 */
      paper_id_list: string[]
    }
  }

  export namespace EcoExam {
    export interface Methods {
      /**
       * 回传笔试安排结果
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/login_info
       */
      loginInfo(exam_id: string, body: LoginInfoRequest): Promise<void>
      /**
       * 回传笔试结果
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/update_result
       */
      updateResult(exam_id: string, body: UpdateResultRequest): Promise<void>
    }

    export interface LoginInfoRequest {
      /** 状态码，0-成功 非零-错误码 */
      result?: number
      /** 成功或失败的描述信息 */
      msg?: string
      /** 笔试作答信息 */
      exam_login_info: Lark.EcoExamLoginInfo
    }

    export interface UpdateResultRequest {
      /** 笔试结果 */
      result: string
      /** 笔试结果时间 */
      result_time?: string
      /** 报告列表 */
      report_list?: Lark.EcoExamResultReport[]
      /** 详细评价结果 */
      detail_list?: Lark.EcoExamResultDetail[]
    }
  }

  export namespace ReferralAccount {
    export interface Methods {
      /**
       * 启用内推账户
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/enable
       */
      enable(body: EnableRequest, query?: EnableQuery): Promise<EnableResponse>
      /**
       * 查询内推账户
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/get_account_assets
       */
      getAccountAssets(query?: GetAccountAssetsQuery): Promise<GetAccountAssetsResponse>
      /**
       * 注册内推账户
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 停用内推账户
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/deactivate
       */
      deactivate(referral_account_id: string, query?: DeactivateQuery): Promise<DeactivateResponse>
      /**
       * 全额提取内推账户余额
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/withdraw
       */
      withdraw(referral_account_id: string, body: WithdrawRequest): Promise<WithdrawResponse>
      /**
       * 内推账户提现数据对账
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/reconciliation
       */
      reconciliation(body: ReconciliationRequest): Promise<ReconciliationResponse>
    }

    export interface EnableRequest {
      /** 账户 ID */
      referral_account_id?: string
    }

    export interface EnableQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface EnableResponse {
      /** 账号信息 */
      account?: Lark.Account
    }

    export interface GetAccountAssetsQuery {
      /** 账户 ID */
      referral_account_id: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetAccountAssetsResponse {
      /** 账户信息 */
      account?: Lark.Account
    }

    export interface CreateRequest {
      /** 电话 */
      mobile?: Lark.Mobile
      /** 邮箱 */
      email?: string
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      /** 账号信息 */
      account?: Lark.Account
    }

    export interface DeactivateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface DeactivateResponse {
      /** 账号信息 */
      account?: Lark.Account
    }

    export const enum WithdrawRequestWithdrawBonusType {
      /** 积分 */
      Point = 1,
      /** 现金 */
      Cash = 2,
    }

    export interface WithdrawRequest {
      /** 请求提现的奖励类型 */
      withdraw_bonus_type: WithdrawRequestWithdrawBonusType[]
      /** 提现单ID，请求时由请求方提供，后续关于本次提现操作的交互都以此提现单ID为标识进行，需要保证唯一,用于保证提现的幂等性，传入重复ID会返回对应提现单提取的金额明细 */
      external_order_id: string
    }

    export interface WithdrawResponse {
      /** 请求时传入的提现单ID */
      external_order_id?: string
      /** 交易时间戳，需要保存，用于统一交易时间，方便对账 */
      trans_time?: string
      /** 本次提现金额明细 */
      withdrawal_details?: Lark.BonusAmount
    }

    export interface ReconciliationRequest {
      /** 按时间范围进行对账时 时间段的起始交易时间 */
      start_trans_time: string
      /** 按时间范围进行对账时 时间段的截止交易时间 */
      end_trans_time: string
      /** 交易信息 */
      trade_details?: Lark.TradeDetail[]
    }

    export interface ReconciliationResponse {
      /** 核对失败的信息 */
      check_failed_list?: Lark.CheckFailedAccountInfo[]
    }
  }

  export namespace Attachment {
    export interface Methods {
      /**
       * 创建附件
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uIDN1YjLyQTN24iM0UjN/create_attachment
       */
      create(): Promise<CreateResponse>
      /**
       * 获取附件信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/get
       */
      get(attachment_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取附件 PDF 格式下载链接
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/preview
       */
      preview(attachment_id: string): Promise<PreviewResponse>
    }

    export interface CreateResponse {
      /** 上传文件的 id */
      id?: string
    }

    export interface GetQuery {
      /** 附件类型 */
      type?: 1 | 2 | 3
    }

    export interface GetResponse {
      /** 附件信息 */
      attachment?: Lark.Attachment
    }

    export interface PreviewResponse {
      /** 预览链接 */
      url: string
    }
  }

  export namespace TalentOperationLog {
    export interface Methods {
      /**
       * 查询人才操作记录
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/talent_operation_log/search
       */
      search(body: SearchRequest, query?: SearchQuery): Paginated<Lark.TalentOperationLog>
    }

    export interface SearchRequest {
      /** 职位 ID 列表 */
      job_id_list?: string[]
      /** 操作人 ID 列表 */
      operator_id_list: string[]
      /** 操作类型 ID 列表 */
      operation_list: number[]
    }

    export interface SearchQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }
  }

  export namespace OfferSchema {
    export interface Methods {
      /**
       * 获取 Offer 申请表详细信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer_schema/get
       */
      get(offer_schema_id: string): Promise<GetResponse>
    }

    export const enum GetResponseScenario {
      /** Offer审批表 */
      ApplyOffer = 1,
    }

    export interface GetResponse {
      /** offer申请表ID */
      id?: string
      /** offer申请表使用场景 */
      scenario?: GetResponseScenario
      /** 申请表版本 */
      version?: number
      /** 字段对象信息 */
      object_list?: Lark.OfferSchemaDetail[]
    }
  }
}

Internal.define({
  '/hire/v1/locations/query': {
    POST: { name: 'hire.location.query', pagination: { argIndex: 1 } },
  },
  '/hire/v1/locations': {
    GET: { name: 'hire.location.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/roles/{role_id}': {
    GET: 'hire.role.get',
  },
  '/hire/v1/roles': {
    GET: { name: 'hire.role.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/user_roles': {
    GET: { name: 'hire.userRole.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/jobs/combined_create': {
    POST: 'hire.job.combinedCreate',
  },
  '/hire/v1/jobs/{job_id}/combined_update': {
    POST: 'hire.job.combinedUpdate',
  },
  '/hire/v1/jobs/{job_id}/update_config': {
    POST: 'hire.job.updateConfig',
  },
  '/hire/v1/jobs/{job_id}/managers/batch_update': {
    POST: 'hire.job.manager.batchUpdate',
  },
  '/hire/v1/jobs/{job_id}/get_detail': {
    GET: 'hire.job.getDetail',
  },
  '/hire/v1/jobs/{job_id}': {
    GET: 'hire.job.get',
  },
  '/hire/v1/jobs/{job_id}/recruiter': {
    GET: 'hire.job.recruiter',
  },
  '/hire/v1/jobs/{job_id}/config': {
    GET: 'hire.job.config',
  },
  '/hire/v1/jobs': {
    GET: { name: 'hire.job.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/jobs/{job_id}/close': {
    POST: 'hire.job.close',
  },
  '/hire/v1/jobs/{job_id}/open': {
    POST: 'hire.job.open',
  },
  '/hire/v1/job_schemas': {
    GET: { name: 'hire.jobSchema.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/advertisements/{advertisement_id}/publish': {
    POST: 'hire.advertisement.publish',
  },
  '/hire/v1/job_publish_records/search': {
    POST: { name: 'hire.jobPublishRecord.search', pagination: { argIndex: 1 } },
  },
  '/hire/v1/job_functions': {
    GET: { name: 'hire.jobFunction.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/job_types': {
    GET: { name: 'hire.jobType.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/job_requirements': {
    POST: 'hire.jobRequirement.create',
    GET: { name: 'hire.jobRequirement.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/job_requirements/{job_requirement_id}': {
    PUT: 'hire.jobRequirement.update',
    DELETE: 'hire.jobRequirement.delete',
  },
  '/hire/v1/job_requirements/search': {
    POST: 'hire.jobRequirement.listById',
  },
  '/hire/v1/job_requirement_schemas': {
    GET: { name: 'hire.jobRequirementSchema.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/job_processes': {
    GET: { name: 'hire.jobProcess.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/subjects': {
    GET: { name: 'hire.subject.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/talent_tags': {
    GET: { name: 'hire.talentTag.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/registration_schemas': {
    GET: { name: 'hire.registrationSchema.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/interview_feedback_forms': {
    GET: { name: 'hire.interviewFeedbackForm.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/interview_round_types': {
    GET: 'hire.interviewRoundType.list',
  },
  '/hire/v1/interview_registration_schemas': {
    GET: { name: 'hire.interviewRegistrationSchema.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/interviewers': {
    GET: { name: 'hire.interviewer.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/interviewers/{interviewer_id}': {
    PATCH: 'hire.interviewer.patch',
  },
  '/hire/v1/offer_approval_templates': {
    GET: { name: 'hire.offerApprovalTemplate.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/offer_custom_fields/{offer_custom_field_id}': {
    PUT: 'hire.offerCustomField.update',
  },
  '/hire/v1/offer_application_forms/{offer_application_form_id}': {
    GET: 'hire.offerApplicationForm.get',
  },
  '/hire/v1/offer_application_forms': {
    GET: { name: 'hire.offerApplicationForm.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/referrals/search': {
    POST: 'hire.referral.search',
  },
  '/hire/v1/referral_websites/job_posts': {
    GET: { name: 'hire.referralWebsite.jobPost.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/referral_websites/job_posts/{job_post_id}': {
    GET: 'hire.referralWebsite.jobPost.get',
  },
  '/hire/v1/referrals/get_by_application': {
    GET: 'hire.referral.getByApplication',
  },
  '/hire/v1/portal_apply_schemas': {
    GET: { name: 'hire.portalApplySchema.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/websites/{website_id}/channels': {
    POST: 'hire.website.channel.create',
    GET: { name: 'hire.website.channel.list', pagination: { argIndex: 1, itemsKey: 'website_channel_list' } },
  },
  '/hire/v1/websites/{website_id}/channels/{channel_id}': {
    DELETE: 'hire.website.channel.delete',
    PUT: 'hire.website.channel.update',
  },
  '/hire/v1/websites/{website_id}/site_users': {
    POST: 'hire.website.siteUser.create',
  },
  '/hire/v1/websites/{website_id}/job_posts/{job_post_id}': {
    GET: 'hire.website.jobPost.get',
  },
  '/hire/v1/websites/{website_id}/job_posts/search': {
    POST: { name: 'hire.website.jobPost.search', pagination: { argIndex: 2 } },
  },
  '/hire/v1/websites/{website_id}/job_posts': {
    GET: { name: 'hire.website.jobPost.list', pagination: { argIndex: 1 } },
  },
  '/hire/v1/websites/{website_id}/deliveries/create_by_resume': {
    POST: 'hire.website.delivery.createByResume',
  },
  '/hire/v1/websites/{website_id}/deliveries/create_by_attachment': {
    POST: 'hire.website.delivery.createByAttachment',
  },
  '/hire/v1/websites/{website_id}/delivery_tasks/{delivery_task_id}': {
    GET: 'hire.website.deliveryTask.get',
  },
  '/hire/v1/websites': {
    GET: { name: 'hire.website.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/agencies/protect': {
    POST: 'hire.agency.protect',
  },
  '/hire/v1/agencies/{agency_id}': {
    GET: 'hire.agency.get',
  },
  '/hire/v1/agencies/protection_period/search': {
    POST: 'hire.agency.protectSearch',
  },
  '/hire/v1/agencies/query': {
    GET: 'hire.agency.query',
  },
  '/hire/v1/agencies/get_agency_account': {
    POST: { name: 'hire.agency.getAgencyAccount', pagination: { argIndex: 1 } },
  },
  '/hire/v1/agencies/batch_query': {
    POST: { name: 'hire.agency.batchQuery', pagination: { argIndex: 1 } },
  },
  '/hire/v1/agencies/operate_agency_account': {
    POST: 'hire.agency.operateAgencyAccount',
  },
  '/hire/v1/talents/{talent_id}/external_info': {
    POST: 'hire.talent.externalInfo.create',
    PUT: 'hire.talent.externalInfo.update',
  },
  '/hire/v1/external_applications': {
    POST: 'hire.externalApplication.create',
    GET: { name: 'hire.externalApplication.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/external_applications/{external_application_id}': {
    PUT: 'hire.externalApplication.update',
    DELETE: 'hire.externalApplication.delete',
  },
  '/hire/v1/external_interviews': {
    POST: 'hire.externalInterview.create',
  },
  '/hire/v1/external_interviews/{external_interview_id}': {
    PUT: 'hire.externalInterview.update',
    DELETE: 'hire.externalInterview.delete',
  },
  '/hire/v1/external_interviews/batch_query': {
    POST: { name: 'hire.externalInterview.batchQuery', pagination: { argIndex: 1 } },
  },
  '/hire/v1/external_interview_assessments': {
    POST: 'hire.externalInterviewAssessment.create',
  },
  '/hire/v1/external_interview_assessments/{external_interview_assessment_id}': {
    PATCH: 'hire.externalInterviewAssessment.patch',
  },
  '/hire/v1/external_offers': {
    POST: 'hire.externalOffer.create',
  },
  '/hire/v1/external_offers/{external_offer_id}': {
    PUT: 'hire.externalOffer.update',
    DELETE: 'hire.externalOffer.delete',
  },
  '/hire/v1/external_offers/batch_query': {
    POST: { name: 'hire.externalOffer.batchQuery', pagination: { argIndex: 1 } },
  },
  '/hire/v1/external_background_checks': {
    POST: 'hire.externalBackgroundCheck.create',
  },
  '/hire/v1/external_background_checks/{external_background_check_id}': {
    PUT: 'hire.externalBackgroundCheck.update',
    DELETE: 'hire.externalBackgroundCheck.delete',
  },
  '/hire/v1/external_background_checks/batch_query': {
    POST: { name: 'hire.externalBackgroundCheck.batchQuery', pagination: { argIndex: 1 } },
  },
  '/hire/v1/external_referral_rewards': {
    POST: 'hire.externalReferralReward.create',
  },
  '/hire/v1/external_referral_rewards/{external_referral_reward_id}': {
    DELETE: 'hire.externalReferralReward.delete',
  },
  '/hire/v1/talent_pools/{talent_pool_id}/batch_change_talent_pool': {
    POST: 'hire.talentPool.batchChangeTalentPool',
  },
  '/hire/v1/talent_pools/': {
    GET: { name: 'hire.talentPool.search', pagination: { argIndex: 0 } },
  },
  '/hire/v1/talent_pools/{talent_pool_id}/talent_relationship': {
    POST: 'hire.talentPool.moveTalent',
  },
  '/hire/v1/talents/{talent_id}/tag': {
    POST: 'hire.talent.tag',
  },
  '/hire/v1/talents/combined_create': {
    POST: 'hire.talent.combinedCreate',
  },
  '/hire/v1/talents/combined_update': {
    POST: 'hire.talent.combinedUpdate',
  },
  '/hire/v1/talents/add_to_folder': {
    POST: 'hire.talent.addToFolder',
  },
  '/hire/v1/talents/remove_to_folder': {
    POST: 'hire.talent.removeToFolder',
  },
  '/hire/v1/talent_folders': {
    GET: { name: 'hire.talentFolder.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/talents/batch_get_id': {
    POST: 'hire.talent.batchGetId',
  },
  '/hire/v1/talents': {
    GET: { name: 'hire.talent.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/talent_objects/query': {
    GET: 'hire.talentObject.query',
  },
  '/hire/v2/talents/{talent_id}': {
    GET: 'hire.talent.get',
  },
  '/hire/v1/talents/{talent_id}/onboard_status': {
    POST: 'hire.talent.onboardStatus',
  },
  '/hire/v1/talent_blocklist/change_talent_block': {
    POST: 'hire.talentBlocklist.changeTalentBlock',
  },
  '/hire/v1/applications/{application_id}/get_detail': {
    GET: 'hire.application.getDetail',
  },
  '/hire/v1/applications/{application_id}/recover': {
    POST: 'hire.application.recover',
  },
  '/hire/v1/applications': {
    POST: 'hire.application.create',
    GET: { name: 'hire.application.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/applications/{application_id}/terminate': {
    POST: 'hire.application.terminate',
  },
  '/hire/v1/applications/{application_id}/transfer_stage': {
    POST: 'hire.application.transferStage',
  },
  '/hire/v1/termination_reasons': {
    GET: { name: 'hire.terminationReason.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/applications/{application_id}': {
    GET: 'hire.application.get',
  },
  '/hire/v1/applications/diversity_inclusions/search': {
    POST: 'hire.diversityInclusion.search',
  },
  '/hire/v1/evaluations': {
    GET: { name: 'hire.evaluation.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/exams': {
    POST: 'hire.exam.create',
  },
  '/hire/v1/tests/search': {
    POST: { name: 'hire.test.search', pagination: { argIndex: 1 } },
  },
  '/hire/v1/interviews': {
    GET: { name: 'hire.interview.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/interviews/get_by_talent': {
    GET: 'hire.interview.getByTalent',
  },
  '/hire/v2/interview_records/{interview_record_id}': {
    GET: 'hire.interviewRecord.get',
  },
  '/hire/v2/interview_records': {
    GET: { name: 'hire.interviewRecord.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/interview_records/attachments': {
    GET: 'hire.interviewRecord.attachment.get',
  },
  '/hire/v1/minutes': {
    GET: 'hire.minutes.get',
  },
  '/hire/v1/questionnaires': {
    GET: { name: 'hire.questionnaire.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/offers': {
    POST: 'hire.offer.create',
    GET: { name: 'hire.offer.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/offers/{offer_id}': {
    PUT: 'hire.offer.update',
    GET: 'hire.offer.get',
  },
  '/hire/v1/applications/{application_id}/offer': {
    GET: 'hire.application.offer',
  },
  '/hire/v1/offers/{offer_id}/offer_status': {
    PATCH: 'hire.offer.offerStatus',
  },
  '/hire/v1/offers/{offer_id}/intern_offer_status': {
    POST: 'hire.offer.internOfferStatus',
  },
  '/hire/v1/background_check_orders': {
    GET: { name: 'hire.backgroundCheckOrder.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/background_check_orders/batch_query': {
    POST: { name: 'hire.backgroundCheckOrder.batchQuery', pagination: { argIndex: 1 } },
  },
  '/hire/v1/tripartite_agreements': {
    POST: 'hire.tripartiteAgreement.create',
    GET: { name: 'hire.tripartiteAgreement.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/tripartite_agreements/{tripartite_agreement_id}': {
    PUT: 'hire.tripartiteAgreement.update',
    DELETE: 'hire.tripartiteAgreement.delete',
  },
  '/hire/v1/ehr_import_tasks/{ehr_import_task_id}': {
    PATCH: 'hire.ehrImportTask.patch',
  },
  '/hire/v1/applications/{application_id}/transfer_onboard': {
    POST: 'hire.application.transferOnboard',
  },
  '/hire/v1/applications/{application_id}/cancel_onboard': {
    POST: 'hire.application.cancelOnboard',
  },
  '/hire/v1/employees/{employee_id}': {
    PATCH: 'hire.employee.patch',
    GET: 'hire.employee.get',
  },
  '/hire/v1/employees/get_by_application': {
    GET: 'hire.employee.getByApplication',
  },
  '/hire/v1/todos': {
    GET: { name: 'hire.todo.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/evaluation_tasks': {
    GET: { name: 'hire.evaluationTask.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/exam_marking_tasks': {
    GET: { name: 'hire.examMarkingTask.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/interview_tasks': {
    GET: { name: 'hire.interviewTask.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/notes': {
    POST: 'hire.note.create',
    GET: { name: 'hire.note.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/notes/{note_id}': {
    PATCH: 'hire.note.patch',
    GET: 'hire.note.get',
    DELETE: 'hire.note.delete',
  },
  '/hire/v1/resume_sources': {
    GET: { name: 'hire.resumeSource.list', pagination: { argIndex: 0 } },
  },
  '/hire/v1/eco_account_custom_fields': {
    POST: 'hire.ecoAccountCustomField.create',
  },
  '/hire/v1/eco_account_custom_fields/batch_update': {
    PATCH: 'hire.ecoAccountCustomField.batchUpdate',
  },
  '/hire/v1/eco_account_custom_fields/batch_delete': {
    POST: 'hire.ecoAccountCustomField.batchDelete',
  },
  '/hire/v1/eco_background_check_custom_fields': {
    POST: 'hire.ecoBackgroundCheckCustomField.create',
  },
  '/hire/v1/eco_background_check_custom_fields/batch_update': {
    PATCH: 'hire.ecoBackgroundCheckCustomField.batchUpdate',
  },
  '/hire/v1/eco_background_check_custom_fields/batch_delete': {
    POST: 'hire.ecoBackgroundCheckCustomField.batchDelete',
  },
  '/hire/v1/eco_background_check_packages': {
    POST: 'hire.ecoBackgroundCheckPackage.create',
  },
  '/hire/v1/eco_background_check_packages/batch_update': {
    PATCH: 'hire.ecoBackgroundCheckPackage.batchUpdate',
  },
  '/hire/v1/eco_background_check_packages/batch_delete': {
    POST: 'hire.ecoBackgroundCheckPackage.batchDelete',
  },
  '/hire/v1/eco_background_checks/update_progress': {
    POST: 'hire.ecoBackgroundCheck.updateProgress',
  },
  '/hire/v1/eco_background_checks/update_result': {
    POST: 'hire.ecoBackgroundCheck.updateResult',
  },
  '/hire/v1/eco_background_checks/cancel': {
    POST: 'hire.ecoBackgroundCheck.cancel',
  },
  '/hire/v1/eco_exam_papers': {
    POST: 'hire.ecoExamPaper.create',
  },
  '/hire/v1/eco_exam_papers/batch_update': {
    PATCH: 'hire.ecoExamPaper.batchUpdate',
  },
  '/hire/v1/eco_exam_papers/batch_delete': {
    POST: 'hire.ecoExamPaper.batchDelete',
  },
  '/hire/v1/eco_exams/{exam_id}/login_info': {
    POST: 'hire.ecoExam.loginInfo',
  },
  '/hire/v1/eco_exams/{exam_id}/update_result': {
    POST: 'hire.ecoExam.updateResult',
  },
  '/hire/v1/referral_account/enable': {
    POST: 'hire.referralAccount.enable',
  },
  '/hire/v1/referral_account/get_account_assets': {
    GET: 'hire.referralAccount.getAccountAssets',
  },
  '/hire/v1/referral_account': {
    POST: 'hire.referralAccount.create',
  },
  '/hire/v1/referral_account/{referral_account_id}/deactivate': {
    POST: 'hire.referralAccount.deactivate',
  },
  '/hire/v1/referral_account/{referral_account_id}/withdraw': {
    POST: 'hire.referralAccount.withdraw',
  },
  '/hire/v1/referral_account/reconciliation': {
    POST: 'hire.referralAccount.reconciliation',
  },
  '/hire/v1/attachments': {
    POST: 'hire.attachment.create',
  },
  '/hire/v1/attachments/{attachment_id}': {
    GET: 'hire.attachment.get',
  },
  '/hire/v1/attachments/{attachment_id}/preview': {
    GET: 'hire.attachment.preview',
  },
  '/hire/v1/applications/{application_id}/interviews': {
    GET: { name: 'hire.application.interview.list', pagination: { argIndex: 1 } },
  },
  '/hire/v1/talent_operation_logs/search': {
    POST: { name: 'hire.talentOperationLog.search', pagination: { argIndex: 1 } },
  },
  '/hire/v1/jobs/{job_id}/managers/{manager_id}': {
    GET: 'hire.job.manager.get',
  },
  '/hire/v1/offer_schemas/{offer_schema_id}': {
    GET: 'hire.offerSchema.get',
  },
})
