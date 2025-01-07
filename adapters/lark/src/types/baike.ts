import { Classification, ClassificationFilter, Draft, Entity, EntityWord, MatchInfo, OuterInfo, Phrase, RelatedMeta, Term } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 创建草稿
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/create
     */
    createBaikeDraft(body: CreateBaikeDraftRequest, query?: CreateBaikeDraftQuery): Promise<CreateBaikeDraftResponse>
    /**
     * 更新草稿
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/update
     */
    updateBaikeDraft(draft_id: string, body: UpdateBaikeDraftRequest, query?: UpdateBaikeDraftQuery): Promise<UpdateBaikeDraftResponse>
    /**
     * 创建免审词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/create
     */
    createBaikeEntity(body: CreateBaikeEntityRequest, query?: CreateBaikeEntityQuery): Promise<CreateBaikeEntityResponse>
    /**
     * 更新免审词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/update
     */
    updateBaikeEntity(entity_id: string, body: UpdateBaikeEntityRequest, query?: UpdateBaikeEntityQuery): Promise<UpdateBaikeEntityResponse>
    /**
     * 获取词条详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/get
     */
    getBaikeEntity(entity_id: string, query?: GetBaikeEntityQuery): Promise<GetBaikeEntityResponse>
    /**
     * 获取词条列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/list
     */
    listBaikeEntity(query?: ListBaikeEntityQuery & Pagination): Promise<ListBaikeEntityResponse>
    /**
     * 精准搜索词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/match
     */
    matchBaikeEntity(body: MatchBaikeEntityRequest): Promise<MatchBaikeEntityResponse>
    /**
     * 模糊搜索词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/search
     */
    searchBaikeEntity(body: SearchBaikeEntityRequest, query?: SearchBaikeEntityQuery & Pagination): Promise<SearchBaikeEntityResponse>
    /**
     * 词条高亮
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/highlight
     */
    highlightBaikeEntity(body: HighlightBaikeEntityRequest): Promise<HighlightBaikeEntityResponse>
    /**
     * 提取潜在的词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/extract
     */
    extractBaikeEntity(body: ExtractBaikeEntityRequest): Promise<ExtractBaikeEntityResponse>
    /**
     * 获取词典分类
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/classification/list
     */
    listBaikeClassification(query?: Pagination): Promise<ListBaikeClassificationResponse>
    /**
     * 上传图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/upload
     */
    uploadBaikeFile(form: UploadBaikeFileForm): Promise<UploadBaikeFileResponse>
    /**
     * 下载图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/download
     */
    downloadBaikeFile(file_token: string): Promise<ArrayBuffer>
  }
}

export interface CreateBaikeDraftRequest {
  /** 实体词 Id */
  id?: string
  /** 词条名 */
  main_keys: Term[]
  /** 别名 */
  aliases?: Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}

export interface CreateBaikeDraftQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateBaikeDraftRequest {
  /** 实体词 Id */
  id?: string
  /** 词条名 */
  main_keys: Term[]
  /** 别名 */
  aliases?: Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: RelatedMeta
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}

export interface UpdateBaikeDraftQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateBaikeEntityRequest {
  /** 词条名 */
  main_keys: Term[]
  /** 别名 */
  aliases?: Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}

export interface CreateBaikeEntityQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateBaikeEntityRequest {
  /** 词条名 */
  main_keys: Term[]
  /** 别名 */
  aliases?: Term[]
  /** 详情描述 */
  description?: string
  /** 相关数据 */
  related_meta?: RelatedMeta
  /** 外部 id 关联数据 */
  outer_info?: OuterInfo
  /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
  rich_text?: string
}

export interface UpdateBaikeEntityQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface GetBaikeEntityQuery {
  /** 外部系统 */
  provider?: string
  /** 词条在外部系统中对应的唯一 ID */
  outer_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListBaikeEntityQuery {
  /** 相关外部系统【可用来过滤词条数据】 */
  provider?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface MatchBaikeEntityRequest {
  /** 搜索关键词，将与词条名、别名进行精准匹配 */
  word: string
}

export interface SearchBaikeEntityRequest {
  /** 搜索关键词 */
  query?: string
  /** 分类筛选 */
  classification_filter?: ClassificationFilter
  /** 词条的创建来源，1：用户主动创建，2：批量导入，3：官方词，4：OpenAPI 创建 */
  sources?: number[]
  /** 创建者 */
  creators?: string[]
}

export interface SearchBaikeEntityQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface HighlightBaikeEntityRequest {
  /** 需要识别百科词条的内容（不超过1000字） */
  text: string
}

export interface ExtractBaikeEntityRequest {
  /** 需要被提取百科实体词的文本（不会过滤租户已成为百科词条的内容） */
  text?: string
}

export interface UploadBaikeFileForm {
  /** 文件名称，当前仅支持上传图片且图片格式为以下六种：icon、bmp、gif、png、jpeg、webp */
  name: string
  /** 二进制文件内容，高宽像素在 320-4096 像素之间，大小在 3KB-10MB 的图片 */
  file: Blob
}

export interface CreateBaikeDraftResponse {
  draft?: Draft
}

export interface UpdateBaikeDraftResponse {
  draft?: Draft
}

export interface CreateBaikeEntityResponse {
  entity?: Entity
}

export interface UpdateBaikeEntityResponse {
  entity?: Entity
}

export interface GetBaikeEntityResponse {
  /** 实体词 */
  entity?: Entity
}

export interface ListBaikeEntityResponse {
  entities?: Entity[]
  /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
  page_token?: string
}

export interface MatchBaikeEntityResponse {
  /** 匹配结果 */
  results?: MatchInfo[]
}

export interface SearchBaikeEntityResponse {
  /** 数据数组 */
  entities?: Entity[]
  /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
  page_token?: string
}

export interface HighlightBaikeEntityResponse {
  /** 返回识别到的实体词信息 */
  phrases?: Phrase[]
}

export interface ExtractBaikeEntityResponse {
  /** 文本中可能的成为百科词条的实体词 */
  entity_word: EntityWord[]
}

export interface ListBaikeClassificationResponse {
  items?: Classification[]
  /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
  page_token?: string
}

export interface UploadBaikeFileResponse {
  /** 文件 token */
  file_token?: string
}

Internal.define({
  '/baike/v1/drafts': {
    POST: 'createBaikeDraft',
  },
  '/baike/v1/drafts/{draft_id}': {
    PUT: 'updateBaikeDraft',
  },
  '/baike/v1/entities': {
    POST: 'createBaikeEntity',
    GET: 'listBaikeEntity',
  },
  '/baike/v1/entities/{entity_id}': {
    PUT: 'updateBaikeEntity',
    GET: 'getBaikeEntity',
  },
  '/baike/v1/entities/match': {
    POST: 'matchBaikeEntity',
  },
  '/baike/v1/entities/search': {
    POST: 'searchBaikeEntity',
  },
  '/baike/v1/entities/highlight': {
    POST: 'highlightBaikeEntity',
  },
  '/baike/v1/entities/extract': {
    POST: 'extractBaikeEntity',
  },
  '/baike/v1/classifications': {
    GET: 'listBaikeClassification',
  },
  '/baike/v1/files/upload': {
    POST: { name: 'uploadBaikeFile', multipart: true },
  },
  '/baike/v1/files/{file_token}/download': {
    GET: { name: 'downloadBaikeFile', type: 'binary' },
  },
})
