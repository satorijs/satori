import * as Lark from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    baike: Baike.Methods
  }
}

export namespace Baike {
  export interface Methods {
    draft: Draft.Methods
    entity: Entity.Methods
    classification: Classification.Methods
    file: File.Methods
  }

  export namespace Draft {
    export interface Methods {
      /**
       * 创建草稿
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新草稿
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/update
       */
      update(draft_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
    }

    export interface CreateRequest {
      /** 实体词 Id */
      id?: string
      /** 词条名 */
      main_keys: Lark.Term[]
      /** 别名 */
      aliases?: Lark.Term[]
      /** 详情描述 */
      description?: string
      /** 相关数据 */
      related_meta?: Lark.RelatedMeta
      /** 外部 id 关联数据 */
      outer_info?: Lark.OuterInfo
      /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
      rich_text?: string
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      draft?: Lark.Draft
    }

    export interface UpdateRequest {
      /** 实体词 Id */
      id?: string
      /** 词条名 */
      main_keys: Lark.Term[]
      /** 别名 */
      aliases?: Lark.Term[]
      /** 详情描述 */
      description?: string
      /** 相关数据 */
      related_meta?: Lark.RelatedMeta
      /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
      rich_text?: string
    }

    export interface UpdateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface UpdateResponse {
      draft?: Lark.Draft
    }
  }

  export namespace Entity {
    export interface Methods {
      /**
       * 创建免审词条
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/create
       */
      create(body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
      /**
       * 更新免审词条
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/update
       */
      update(entity_id: string, body: UpdateRequest, query?: UpdateQuery): Promise<UpdateResponse>
      /**
       * 获取词条详情
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/get
       */
      get(entity_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 获取词条列表
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/list
       */
      list(query?: ListQuery): Promise<ListResponse> & AsyncIterableIterator<Lark.Entity>
      /**
       * 精准搜索词条
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/match
       */
      match(body: MatchRequest): Promise<MatchResponse>
      /**
       * 模糊搜索词条
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/search
       */
      search(body: SearchRequest, query?: SearchQuery): Promise<SearchResponse> & AsyncIterableIterator<Lark.Entity>
      /**
       * 词条高亮
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/highlight
       */
      highlight(body: HighlightRequest): Promise<HighlightResponse>
      /**
       * 提取潜在的词条
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/extract
       */
      extract(body: ExtractRequest): Promise<ExtractResponse>
    }

    export interface CreateRequest {
      /** 词条名 */
      main_keys: Lark.Term[]
      /** 别名 */
      aliases?: Lark.Term[]
      /** 详情描述 */
      description?: string
      /** 相关数据 */
      related_meta?: Lark.RelatedMeta
      /** 外部 id 关联数据 */
      outer_info?: Lark.OuterInfo
      /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
      rich_text?: string
    }

    export interface CreateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface CreateResponse {
      entity?: Lark.Entity
    }

    export interface UpdateRequest {
      /** 词条名 */
      main_keys: Lark.Term[]
      /** 别名 */
      aliases?: Lark.Term[]
      /** 详情描述 */
      description?: string
      /** 相关数据 */
      related_meta?: Lark.RelatedMeta
      /** 外部 id 关联数据 */
      outer_info?: Lark.OuterInfo
      /** 富文本格式（当填写富文本内容时，description字段将会失效可不填写），支持的格式参考[企业百科指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/overview)中的释义部分 */
      rich_text?: string
    }

    export interface UpdateQuery {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface UpdateResponse {
      entity?: Lark.Entity
    }

    export interface GetQuery {
      /** 外部系统 */
      provider?: string
      /** 词条在外部系统中对应的唯一 ID */
      outer_id?: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface GetResponse {
      /** 实体词 */
      entity?: Lark.Entity
    }

    export interface ListQuery extends Pagination {
      /** 相关外部系统【可用来过滤词条数据】 */
      provider?: string
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface ListResponse {
      entities?: Lark.Entity[]
      /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
      page_token?: string
    }

    export interface MatchRequest {
      /** 搜索关键词，将与词条名、别名进行精准匹配 */
      word: string
    }

    export interface MatchResponse {
      /** 匹配结果 */
      results?: Lark.MatchInfo[]
    }

    export interface SearchRequest {
      /** 搜索关键词 */
      query?: string
      /** 分类筛选 */
      classification_filter?: Lark.ClassificationFilter
      /** 词条的创建来源，1：用户主动创建，2：批量导入，3：官方词，4：OpenAPI 创建 */
      sources?: number[]
      /** 创建者 */
      creators?: string[]
    }

    export interface SearchQuery extends Pagination {
      /** 此次调用中使用的用户ID的类型 */
      user_id_type?: 'user_id' | 'union_id' | 'open_id'
    }

    export interface SearchResponse {
      /** 数据数组 */
      entities?: Lark.Entity[]
      /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
      page_token?: string
    }

    export interface HighlightRequest {
      /** 需要识别百科词条的内容（不超过1000字） */
      text: string
    }

    export interface HighlightResponse {
      /** 返回识别到的实体词信息 */
      phrases?: Lark.Phrase[]
    }

    export interface ExtractRequest {
      /** 需要被提取百科实体词的文本（不会过滤租户已成为百科词条的内容） */
      text?: string
    }

    export interface ExtractResponse {
      /** 文本中可能的成为百科词条的实体词 */
      entity_word: Lark.EntityWord[]
    }
  }

  export namespace Classification {
    export interface Methods {
      /**
       * 获取词典分类
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/classification/list
       */
      list(query?: Pagination): Promise<ListResponse> & AsyncIterableIterator<Lark.Classification>
    }

    export interface ListResponse {
      items?: Lark.Classification[]
      /** 分页标记，当还有下一页时会返回新的 page_token，否则 page_token 为空 */
      page_token?: string
    }
  }

  export namespace File {
    export interface Methods {
      /**
       * 上传图片
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/upload
       */
      upload(form: UploadForm): Promise<UploadResponse>
      /**
       * 下载图片
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/download
       */
      download(file_token: string): Promise<ArrayBuffer>
    }

    export interface UploadForm {
      /** 文件名称，当前仅支持上传图片且图片格式为以下六种：icon、bmp、gif、png、jpeg、webp */
      name: string
      /** 二进制文件内容，高宽像素在 320-4096 像素之间，大小在 3KB-10MB 的图片 */
      file: Blob
    }

    export interface UploadResponse {
      /** 文件 token */
      file_token?: string
    }
  }
}

Internal.define({
  '/baike/v1/drafts': {
    POST: 'baike.draft.create',
  },
  '/baike/v1/drafts/{draft_id}': {
    PUT: 'baike.draft.update',
  },
  '/baike/v1/entities': {
    POST: 'baike.entity.create',
    GET: { name: 'baike.entity.list', pagination: { argIndex: 0, itemsKey: 'entities' } },
  },
  '/baike/v1/entities/{entity_id}': {
    PUT: 'baike.entity.update',
    GET: 'baike.entity.get',
  },
  '/baike/v1/entities/match': {
    POST: 'baike.entity.match',
  },
  '/baike/v1/entities/search': {
    POST: { name: 'baike.entity.search', pagination: { argIndex: 1, itemsKey: 'entities' } },
  },
  '/baike/v1/entities/highlight': {
    POST: 'baike.entity.highlight',
  },
  '/baike/v1/entities/extract': {
    POST: 'baike.entity.extract',
  },
  '/baike/v1/classifications': {
    GET: { name: 'baike.classification.list', pagination: { argIndex: 0 } },
  },
  '/baike/v1/files/upload': {
    POST: { name: 'baike.file.upload', multipart: true },
  },
  '/baike/v1/files/{file_token}/download': {
    GET: { name: 'baike.file.download', type: 'binary' },
  },
})
