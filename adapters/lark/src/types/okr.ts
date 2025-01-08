import { ContentBlock, OkrBatch, OkrReview, Period, PeriodRule } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建 OKR 周期
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/create
     */
    createOkrPeriod(body: CreateOkrPeriodRequest): Promise<CreateOkrPeriodResponse>
    /**
     * 修改 OKR 周期状态
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/patch
     */
    patchOkrPeriod(period_id: string, body: PatchOkrPeriodRequest): Promise<PatchOkrPeriodResponse>
    /**
     * 获取 OKR 周期列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period/list
     */
    listOkrPeriod(query?: Pagination): Paginated<Period>
    /**
     * 获取 OKR 周期规则
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/period_rule/list
     */
    listOkrPeriodRule(): Promise<ListOkrPeriodRuleResponse>
    /**
     * 获取用户的 OKR 列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/user-okr/list
     */
    listOkrUserOkr(user_id: string, query?: ListOkrUserOkrQuery): Promise<ListOkrUserOkrResponse>
    /**
     * 批量获取 OKR
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/okr/batch_get
     */
    batchGetOkr(query?: BatchGetOkrQuery): Promise<BatchGetOkrResponse>
    /**
     * 创建 OKR 进展记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/create
     */
    createOkrProgressRecord(body: CreateOkrProgressRecordRequest, query?: CreateOkrProgressRecordQuery): Promise<CreateOkrProgressRecordResponse>
    /**
     * 删除 OKR 进展记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/delete
     */
    deleteOkrProgressRecord(progress_id: string): Promise<void>
    /**
     * 更新 OKR 进展记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/update
     */
    updateOkrProgressRecord(progress_id: string, body: UpdateOkrProgressRecordRequest, query?: UpdateOkrProgressRecordQuery): Promise<UpdateOkrProgressRecordResponse>
    /**
     * 获取 OKR 进展记录
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/get
     */
    getOkrProgressRecord(progress_id: string, query?: GetOkrProgressRecordQuery): Promise<GetOkrProgressRecordResponse>
    /**
     * 上传进展记录图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/image/upload
     */
    uploadOkrImage(form: UploadOkrImageForm): Promise<UploadOkrImageResponse>
    /**
     * 查询复盘信息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/review/query
     */
    queryOkrReview(query?: QueryOkrReviewQuery): Promise<QueryOkrReviewResponse>
  }
}

export interface CreateOkrPeriodRequest {
  /** 周期规则 id */
  period_rule_id: string
  /** 周期起始年月 */
  start_month: string
}

export interface CreateOkrPeriodResponse {
  /** 周期id */
  period_id?: string
  /** 周期起始年月 */
  start_month?: string
  /** 周期结束年月 */
  end_month?: string
}

export const enum PatchOkrPeriodRequestStatus {
  /** 正常状态 */
  NormalStatus = 1,
  /** 标记失效 */
  MarkInvalid = 2,
  /** 隐藏周期 */
  HiddenPeriod = 3,
}

export interface PatchOkrPeriodRequest {
  /** 周期显示状态 */
  status: PatchOkrPeriodRequestStatus
}

export const enum PatchOkrPeriodResponseStatus {
  /** 正常状态 */
  NormalStatus = 1,
  /** 标记失效 */
  MarkInvalid = 2,
  /** 隐藏周期 */
  HiddenPeriod = 3,
}

export interface PatchOkrPeriodResponse {
  /** 周期规则id */
  period_id?: string
  /** 周期显示状态 */
  status?: PatchOkrPeriodResponseStatus
}

export interface ListOkrPeriodRuleResponse {
  /** 指标库列表 */
  period_rules?: PeriodRule[]
}

export interface ListOkrUserOkrQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 请求列表的偏移，offset>=0 */
  offset: string
  /** 列表长度，0-10 */
  limit: string
  /** 请求OKR的语言版本（比如@的人名），lang=en_us/zh_cn */
  lang?: string
  /** period_id列表，最多10个 */
  period_ids?: string[]
}

export interface ListOkrUserOkrResponse {
  /** OKR周期总数 */
  total?: number
  /** OKR 列表 */
  okr_list?: OkrBatch[]
}

export interface BatchGetOkrQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** OKR ID 列表，最多10个 */
  okr_ids: string[]
  /** 请求OKR的语言版本（比如@的人名），lang=en_us/zh_cn，请求 Query中 */
  lang?: string
}

export interface BatchGetOkrResponse {
  /** OKR 列表 */
  okr_list?: OkrBatch[]
}

export const enum CreateOkrProgressRecordRequestTargetType {
  /** okr的O */
  Objective = 2,
  /** okr的KR */
  KeyResult = 3,
}

export interface CreateOkrProgressRecordRequest {
  /** 进展来源 */
  source_title: string
  /** 进展来源链接 */
  source_url: string
  /** 目标id，与target_type对应 */
  target_id: string
  /** 目标类型 */
  target_type: CreateOkrProgressRecordRequestTargetType
  /** 进展详情 富文本格式 */
  content: ContentBlock
  /** pc进展来源链接 */
  source_url_pc?: string
  /** mobile进展来源链接 */
  source_url_mobile?: string
}

export interface CreateOkrProgressRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateOkrProgressRecordResponse {
  /** OKR 进展ID */
  progress_id?: string
  /** 进展更新时间 毫秒 */
  modify_time?: string
  /** 进展 对应的 Content 详细内容 */
  content?: ContentBlock
}

export interface UpdateOkrProgressRecordRequest {
  /** 进展详情 富文本格式 */
  content: ContentBlock
}

export interface UpdateOkrProgressRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateOkrProgressRecordResponse {
  /** OKR 进展ID */
  progress_id?: string
  /** 进展更新时间 毫秒 */
  modify_time?: string
  /** 进展 对应的 Content 详细内容 */
  content?: ContentBlock
}

export interface GetOkrProgressRecordQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetOkrProgressRecordResponse {
  /** OKR 进展ID */
  progress_id?: string
  /** 进展更新时间 毫秒 */
  modify_time?: string
  /** 进展 对应的 Content 详细内容 */
  content?: ContentBlock
}

export const enum UploadOkrImageFormTargetType {
  /** okr的O */
  Objective = 2,
  /** okr的KR */
  KeyResult = 3,
}

export interface UploadOkrImageForm {
  /** 图片 */
  data: Blob
  /** 图片的目标ID */
  target_id: string
  /** 图片使用的目标类型 */
  target_type: UploadOkrImageFormTargetType
}

export interface UploadOkrImageResponse {
  /** 图片token */
  file_token?: string
  /** 图片下载链接 */
  url?: string
}

export interface QueryOkrReviewQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id' | 'people_admin_id'
  /** 目标用户id列表，最多5个 */
  user_ids: string[]
  /** period_id列表，最多5个 */
  period_ids: string[]
}

export interface QueryOkrReviewResponse {
  /** OKR复盘 列表 */
  review_list?: OkrReview[]
}

Internal.define({
  '/okr/v1/periods': {
    POST: 'createOkrPeriod',
    GET: { name: 'listOkrPeriod', pagination: { argIndex: 0 } },
  },
  '/okr/v1/periods/{period_id}': {
    PATCH: 'patchOkrPeriod',
  },
  '/okr/v1/period_rules': {
    GET: 'listOkrPeriodRule',
  },
  '/okr/v1/users/{user_id}/okrs': {
    GET: 'listOkrUserOkr',
  },
  '/okr/v1/okrs/batch_get': {
    GET: 'batchGetOkr',
  },
  '/okr/v1/progress_records': {
    POST: 'createOkrProgressRecord',
  },
  '/okr/v1/progress_records/{progress_id}': {
    DELETE: 'deleteOkrProgressRecord',
    PUT: 'updateOkrProgressRecord',
    GET: 'getOkrProgressRecord',
  },
  '/okr/v1/images/upload': {
    POST: { name: 'uploadOkrImage', multipart: true },
  },
  '/okr/v1/reviews/query': {
    GET: 'queryOkrReview',
  },
})
