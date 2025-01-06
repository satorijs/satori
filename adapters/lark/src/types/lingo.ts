import { Internal } from '../internal'
import { Classification, ClassificationFilter, Draft, Entity, I18nEntryDesc, MatchInfo, OuterInfo, Phrase, RelatedMeta, Repo, Term } from '.'

declare module '../internal' {
  interface Internal {
    /**
     * 创建草稿
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/draft/create
     */
    createLingoDraft(body: CreateLingoDraftRequest, query?: CreateLingoDraftQuery): Promise<CreateLingoDraftResponse>
    /**
     * 更新草稿
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/draft/update
     */
    updateLingoDraft(draft_id: string, body: UpdateLingoDraftRequest, query?: UpdateLingoDraftQuery): Promise<UpdateLingoDraftResponse>
    /**
     * 创建免审词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/create
     */
    createLingoEntity(body: CreateLingoEntityRequest, query?: CreateLingoEntityQuery): Promise<CreateLingoEntityResponse>
    /**
     * 更新免审词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/update
     */
    updateLingoEntity(entity_id: string, body: UpdateLingoEntityRequest, query?: UpdateLingoEntityQuery): Promise<UpdateLingoEntityResponse>
    /**
     * 删除免审词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/delete
     */
    deleteLingoEntity(entity_id: string, query?: DeleteLingoEntityQuery): Promise<void>
    /**
     * 获取词条详情
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/get
     */
    getLingoEntity(entity_id: string, query?: GetLingoEntityQuery): Promise<GetLingoEntityResponse>
    /**
     * 获取词条列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/list
     */
    listLingoEntity(query?: ListLingoEntityQuery): Promise<ListLingoEntityResponse>
    /**
     * 精准搜索词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/match
     */
    matchLingoEntity(body: MatchLingoEntityRequest, query?: MatchLingoEntityQuery): Promise<MatchLingoEntityResponse>
    /**
     * 模糊搜索词条
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/search
     */
    searchLingoEntity(body: SearchLingoEntityRequest, query?: SearchLingoEntityQuery): Promise<SearchLingoEntityResponse>
    /**
     * 词条高亮
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/entity/highlight
     */
    highlightLingoEntity(body: HighlightLingoEntityRequest): Promise<HighlightLingoEntityResponse>
    /**
     * 获取词典分类
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/classification/list
     */
    listLingoClassification(query?: ListLingoClassificationQuery): Promise<ListLingoClassificationResponse>
    /**
     * 获取词库列表
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/repo/list
     */
    listLingoRepo(): Promise<ListLingoRepoResponse>
    /**
     * 上传图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/file/upload
     */
    uploadLingoFile(form: UploadLingoFileForm): Promise<UploadLingoFileResponse>
    /**
     * 下载图片
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/lingo-v1/file/download
     */
    downloadLingoFile(file_token: string): Promise<ArrayBuffer>
  }
}

export interface CreateLingoDraftRequest {
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
  /** 国际化的词条释义 */
  i18n_descs?: I18nEntryDesc[]
}

export interface CreateLingoDraftQuery {
  /** 词库ID */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateLingoDraftRequest {
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
  /** 国际化的词条释义 */
  i18n_descs?: I18nEntryDesc[]
}

export interface UpdateLingoDraftQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateLingoEntityRequest {
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
  /** 国际化的词条释义 */
  i18n_descs?: I18nEntryDesc[]
}

export interface CreateLingoEntityQuery {
  /** 词库 ID */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface UpdateLingoEntityRequest {
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
  /** 国际化的词条释义 */
  i18n_descs?: I18nEntryDesc[]
}

export interface UpdateLingoEntityQuery {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface DeleteLingoEntityQuery {
  /** 数据提供方（使用时需要将路径中的词条 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  provider?: string
  /** 外部唯一 id（使用时需要将路径中的词条 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  outer_id?: string
}

export interface GetLingoEntityQuery {
  /** 数据提供方（使用时需要将路径中的实体词 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  provider?: string
  /** 外部唯一 id（使用时需要将路径中的实体词 ID 固定为：enterprise_0，且提供 provider 和 outer_id） */
  outer_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface ListLingoEntityQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 数据提供方【可用来过滤数据】 */
  provider?: string
  /** 词库 id */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface MatchLingoEntityRequest {
  /** 实体词主关键词、全称、别名全匹配 */
  word: string
}

export interface MatchLingoEntityQuery {
  /** 词库ID */
  repo_id?: string
}

export interface SearchLingoEntityRequest {
  /** 搜索关键词 */
  query?: string
  /** 分类筛选 */
  classification_filter?: ClassificationFilter
  /** 词条的创建来源，1：用户主动创建，2：批量导入，3：官方词，4：OpenAPI 创建 */
  sources?: number[]
  /** 创建者 */
  creators?: string[]
}

export interface SearchLingoEntityQuery {
  /** 每页返回的词条量 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 词库ID */
  repo_id?: string
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface HighlightLingoEntityRequest {
  /** 需要被识别实体词内容的一句话（不要超过1000字） */
  text: string
}

export interface ListLingoClassificationQuery {
  /** 分页大小 */
  page_size?: number
  /** 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 */
  page_token?: string
  /** 词库ID */
  repo_id?: string
}

export interface UploadLingoFileForm {
  /** 文件名称，当前仅支持上传图片且图片格式为以下六种：icon、bmp、gif、png、jpeg、webp */
  name: string
  /** 二进制文件内容，高宽像素在 320-4096 像素之间，大小在 3KB-10MB 的图片 */
  file: Blob
}

export interface CreateLingoDraftResponse {
  draft?: Draft
}

export interface UpdateLingoDraftResponse {
  draft?: Draft
}

export interface CreateLingoEntityResponse {
  entity?: Entity
}

export interface UpdateLingoEntityResponse {
  entity?: Entity
}

export interface GetLingoEntityResponse {
  /** 实体词 */
  entity?: Entity
}

export interface ListLingoEntityResponse {
  /** 词条列表 */
  entities?: Entity[]
  /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface MatchLingoEntityResponse {
  /** 匹配结果 */
  results?: MatchInfo[]
}

export interface SearchLingoEntityResponse {
  /** 数据数组 */
  entities?: Entity[]
  /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface HighlightLingoEntityResponse {
  /** 返回识别到的实体词信息 */
  phrases?: Phrase[]
}

export interface ListLingoClassificationResponse {
  /** 分类list */
  items?: Classification[]
  /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
  page_token?: string
  /** 是否有下一页 */
  has_more?: boolean
}

export interface ListLingoRepoResponse {
  /** 词库列表 */
  items?: Repo[]
}

export interface UploadLingoFileResponse {
  /** 文件 token */
  file_token?: string
}

Internal.define({
  '/open-apis/lingo/v1/drafts': {
    POST: 'createLingoDraft',
  },
  '/open-apis/lingo/v1/drafts/{draft_id}': {
    PUT: 'updateLingoDraft',
  },
  '/open-apis/lingo/v1/entities': {
    POST: 'createLingoEntity',
    GET: 'listLingoEntity',
  },
  '/open-apis/lingo/v1/entities/{entity_id}': {
    PUT: 'updateLingoEntity',
    DELETE: 'deleteLingoEntity',
    GET: 'getLingoEntity',
  },
  '/open-apis/lingo/v1/entities/match': {
    POST: 'matchLingoEntity',
  },
  '/open-apis/lingo/v1/entities/search': {
    POST: 'searchLingoEntity',
  },
  '/open-apis/lingo/v1/entities/highlight': {
    POST: 'highlightLingoEntity',
  },
  '/open-apis/lingo/v1/classifications': {
    GET: 'listLingoClassification',
  },
  '/open-apis/lingo/v1/repos': {
    GET: 'listLingoRepo',
  },
  '/open-apis/lingo/v1/files/upload': {
    POST: { name: 'uploadLingoFile', multipart: true },
  },
  '/open-apis/lingo/v1/files/{file_token}/download': {
    GET: { name: 'downloadLingoFile', type: 'binary' },
  },
})
