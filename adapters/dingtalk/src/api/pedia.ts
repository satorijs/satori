import { Internal } from '../internal'
// GENERATED CONTENT

export interface PediaWordsQueryQuery {
  /** 查询主键编号。 */
  uuid: number
  /** 当前操作用户的userId。 */
  userId: string
}

export interface PediaWordsQueryResponse {
  data?: {
    wordName?: string
    uuid?: number
    gmtCreate?: number
    gmtModify?: number
    wordAlias?: number
    highLightWordAlias?: number
    relatedDoc?: number
    relatedLink?: number
    creatorName?: string
    updaterName?: string
    approveName?: string
    wordParaphrase?: string
    simpleWordParaphrase?: string
    contacts?: number
    tagsList?: number
    appLink?: number
    imHighLight?: number
    simHighLight?: number
    picList?: number
    contactList?: number
    userId?: string
    parentUuid?: number
  }
  success?: unknown
}

export interface PediaWordsSearchParams {
  /** 搜索关键词。 */
  wordName?: string
  /** 操作人的userId。 */
  userId: string
  /** 当前每页需要展示的数量，最大20。 */
  pageSize: number
  /** 当前查询的页数，从1开始。 */
  pageNumber: number
  /** 当前搜索列表的状态： */
  status: string
}

export interface PediaWordsSearchResponse {
  data?: {
    wordName?: string
    uuid?: number
    gmtCreate?: number
    gmtModify?: number
    wordAlias?: number
    highLightWordAlias?: number
    relatedLink?: number
    relatedDoc?: number
    creatorName?: string
    updaterName?: string
    approveName?: string
    wordParaphrase?: string
    simpleWordParaphrase?: string
    contacts?: number
    tagsList?: number
    appLink?: number
    imHighLight?: number
    simHighLight?: number
    picList?: number
    contactList?: number
    userId?: string
    parentUuid?: number
  }[]
  success?: unknown
}

export interface PediaWordsApproveParams {
  /** 当前审核的词条的主键编号。 */
  uuid: number
  /** 操作人的组织员工userId。 */
  userId: string
  /** 审核的结果： */
  approveStatus: string
  /** 拒绝的原因。 */
  approveReason?: string
  /** 当前内部群是否高亮： */
  imHighLight: unknown
  /** 服务群是否高亮： */
  simHighLight: unknown
}

export interface PediaWordsApproveResponse {
  success?: unknown
}

export interface PediaWordsDeleteQuery {
  /** 当前需要删除的词条主键编号。 */
  uuid: number
  /** 当前操作用户的userId。 */
  userId: string
}

export interface PediaWordsDeleteResponse {
  uuid?: number
  success?: unknown
}

export interface PediaWordsUpdateParams {
  /** 需要更新的词条编号。 */
  uuid: number
  /** 词条名称。 */
  wordName: string
  /** 词条别名列表，最大值10。 */
  wordAlias?: string[]
  /** 可高亮的别名列表，最大值10。 */
  highLightWordAlias?: string[]
  /** 词条相关文档信息，最大值10。 */
  relatedDoc?: object[]
  /** 词条相关链接信息，最大值10。 */
  relatedLink?: object[]
  /** 词条释义。 */
  wordParaphrase: string
  /** 相关应用对象。 */
  appLink?: object[]
  /** 操作人的userId。 */
  userId?: string
  /** 词条的相关图片信息，最大值10。 */
  picList?: object[]
  /** 词条的相关联系人信息，最大值10。 */
  contactList?: object[]
}

export interface PediaWordsUpdateResponse {
  uuid?: number
  success?: unknown
}

export interface PediaWordsAddParams {
  /** 新增词条的名称。 */
  wordName: string
  /** 词条的别名列表，多个名字的时候可以添加，每次调用最多传10个。 */
  wordAlias?: string[]
  /** 词条高亮别名列表，每次调用最多传10个。 */
  highLightWordAlias?: string[]
  /** 词条相关的文档列表，每次调用最多传10个。 */
  relatedDoc?: object[]
  /** 词条相关的链接信息，每次调用最多传10个。 */
  relatedLink?: object[]
  /** 词条释义，针对词条的描述内容。 */
  wordParaphrase: string
  /** 词条相关的图片信息，每次调用最多传10个。 */
  picList?: object[]
  /** 组织对应的员工userId。 */
  userId: string
  /** 词条相关的联系人信息，每次调用最多传10个。 */
  contactList?: object[]
}

export interface PediaWordsAddResponse {
  uuid?: number
  success?: unknown
}

// funcName: isOldApi
Internal.define({
  '/pedia/words/query': { POST: { pediaWordsQuery: false } },
  '/pedia/words/search': { POST: { pediaWordsSearch: false } },
  '/pedia/words/approve': { POST: { pediaWordsApprove: false } },
  '/pedia/words': {
    DELETE: { pediaWordsDelete: false },
    PUT: { pediaWordsUpdate: false },
    POST: { pediaWordsAdd: false },
  },
})
declare module '../internal' {
  interface Internal {
    /**
     * 根据词条主键ID查询当前词条详情
     * @see https://developers.dingtalk.com/document/app/entry-query
     */
    pediaWordsQuery(
      query: PediaWordsQueryQuery,
    ): Promise<PediaWordsQueryResponse>
    /**
     * 分页获取企业词条信息
     * @see https://developers.dingtalk.com/document/app/entry-search
     */
    pediaWordsSearch(
      params: PediaWordsSearchParams,
    ): Promise<PediaWordsSearchResponse>
    /**
     * 企业百科针对待审核词条进行审核
     * @see https://developers.dingtalk.com/document/app/entry-review
     */
    pediaWordsApprove(
      params: PediaWordsApproveParams,
    ): Promise<PediaWordsApproveResponse>
    /**
     * 企业百科针对uuid删除当前词条
     * @see https://developers.dingtalk.com/document/app/entry-delete
     */
    pediaWordsDelete(
      query: PediaWordsDeleteQuery,
    ): Promise<PediaWordsDeleteResponse>
    /**
     * 企业百科对当前已经生效词条进行编辑
     * @see https://developers.dingtalk.com/document/app/update-entry
     */
    pediaWordsUpdate(
      params: PediaWordsUpdateParams,
    ): Promise<PediaWordsUpdateResponse>
    /**
     * 企业百科增加当前企业词条信息
     * @see https://developers.dingtalk.com/document/app/new-entry
     */
    pediaWordsAdd(params: PediaWordsAddParams): Promise<PediaWordsAddResponse>
  }
}
