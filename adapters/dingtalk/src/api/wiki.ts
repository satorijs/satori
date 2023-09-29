import { Internal } from '../internal'
// GENERATED CONTENT

export interface ListNodesQuery {
  /** 父节点id(父节点dentryUuid)： */
  parentNodeId: string
  /** 分页游标, 首次拉取不用传。 */
  nextToken?: string
  /** 分页大小，默认值50。 */
  maxResults?: number
  /** 是否获取权限信息： */
  withPermissionRole?: unknown
  /** 操作人unionId。 */
  operatorId: string
}

export interface ListNodesResponse {
  nodes?: {
    nodeId?: string
    workspaceId?: string
    name?: string
    size?: number
    type?: string
    category?: string
    extension?: string
    url?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    hasChildren?: number
    statisticalInfo?: number
    permissionRole?: string
  }[]
  nextToken?: string
}

export interface GetNodeByUrlParams {
  /** 文档链接 */
  url: string
  /** 可选参数 */
  option?: unknown
}

export interface GetNodeByUrlQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface GetNodeByUrlResponse {
  node?: {
    nodeId?: string
    workspaceId?: string
    name?: string
    size?: number
    type?: string
    category?: string
    extension?: string
    url?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    hasChildren?: number
    statisticalInfo?: number
    permissionRole?: string
  }
}

export interface GetNodesParams {
  /** 节点id。 */
  nodeIds: string[]
  /** 可选参数。 */
  option?: unknown
}

export interface GetNodesQuery {
  /** 操作人unionId。 */
  operatorId: string
}

export interface GetNodesResponse {
  nodes?: {
    nodeId?: string
    workspaceId?: string
    name?: string
    size?: number
    type?: string
    category?: string
    extension?: string
    url?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    hasChildren?: number
    statisticalInfo?: number
    permissionRole?: string
  }[]
}

export interface GetNodeQuery {
  /** 是否获取统计信息： */
  withStatisticalInfo?: unknown
  /** 是否获取权限信息： */
  withPermissionRole?: unknown
  /** 操作人unionId。 */
  operatorId: string
}

export interface GetNodeResponse {
  node?: {
    nodeId?: string
    workspaceId?: string
    name?: string
    size?: number
    type?: string
    category?: string
    extension?: string
    url?: string
    creatorId?: string
    modifierId?: string
    createTime?: string
    modifiedTime?: string
    hasChildren?: number
    statisticalInfo?: number
    permissionRole?: string
  }
}

export interface WikiWordsDetailQuery {
  /** 词条名称，最大长度50个字符。 */
  wordName: string
}

export interface WikiWordsDetailResponse {
  data: {
    wordName: string
    uuid: number
    gmtCreate: number
    gmtModify: number
    orgName: string
    wordAlias: number
    highLightWordAlias: number
    wordFullName: string
    relatedDoc: number
    relatedLink: number
    creatorName: string
    updaterName: string
    approveName: string
    wordParaphrase: string
    simpleWordParaphrase: string
    contacts: number
    tagsList: number
    appLink: number
    imHighLight: number
    simHighLight: number
  }[]
  errMsg: string
  success: unknown
}

export interface WikiWordsParseParams {
  /** 待匹配词条的文本，最大长度4096个字符。 */
  content: string
}

export interface WikiWordsParseResponse {
  success?: unknown
  errMsg: string
  data: {
    startIndex: number
    endIndex: number
    wordName: string
  }[]
}

// funcName: isOldApi
Internal.define({
  '/wiki/nodes': { GET: { listNodes: false } },
  '/wiki/nodes/queryByUrl': { POST: { getNodeByUrl: false } },
  '/wiki/nodes/batchQuery': { POST: { getNodes: false } },
  '/wiki/nodes/{nodeId}': { GET: { getNode: false } },
  '/wiki/words/details': { GET: { wikiWordsDetail: false } },
  '/wiki/words/parse': { POST: { wikiWordsParse: false } },
})

declare module '../internal' {
  interface Internal {
    /**
     * 获取节点列表
     * @see https://developers.dingtalk.com/document/orgapp/get-node-list
     */
    listNodes(query: ListNodesQuery): Promise<ListNodesResponse>
    /**
     * 通过链接获取节点
     * @see https://developers.dingtalk.com/document/orgapp/get-node-by-link
     */
    getNodeByUrl(
      query: GetNodeByUrlQuery,
      params: GetNodeByUrlParams,
    ): Promise<GetNodeByUrlResponse>
    /**
     * 批量获取节点
     * @see https://developers.dingtalk.com/document/orgapp/obtain-nodes-in-batch
     */
    getNodes(
      query: GetNodesQuery,
      params: GetNodesParams,
    ): Promise<GetNodesResponse>
    /**
     * 获取节点
     * @see https://developers.dingtalk.com/document/orgapp/get-node
     */
    getNode(nodeId: string, query: GetNodeQuery): Promise<GetNodeResponse>
    /**
     * 根据词条名称获取该词条释义
     * @see https://developers.dingtalk.com/document/orgapp/enterprise-encyclopedia-query-entry-details-by-entry-name
     */
    wikiWordsDetail(
      query: WikiWordsDetailQuery,
    ): Promise<WikiWordsDetailResponse>
    /**
     * 外部传递过来的消息根据百科词库分词
     * @see https://developers.dingtalk.com/document/orgapp/enterprise-encyclopedia-match-entries-in-a-text
     */
    wikiWordsParse(
      params: WikiWordsParseParams,
    ): Promise<WikiWordsParseResponse>
  }
}
