import { Acl, ConnectorParam, DataSource, I18nMeta, Item, ItemContent, ItemMetadata, PatchSchemaProperty, Schema, SchemaDisplay, SchemaProperty } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 搜索消息
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/message/create
     */
    createSearchMessage(body: CreateSearchMessageRequest, query?: CreateSearchMessageQuery): Paginated<string>
    /**
     * 搜索应用
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/app/create
     */
    createSearchApp(body: CreateSearchAppRequest, query?: CreateSearchAppQuery): Paginated<string>
    /**
     * 创建数据源
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/create
     */
    createSearchDataSource(body: CreateSearchDataSourceRequest): Promise<CreateSearchDataSourceResponse>
    /**
     * 删除数据源
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/delete
     */
    deleteSearchDataSource(data_source_id: string): Promise<void>
    /**
     * 修改数据源
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/patch
     */
    patchSearchDataSource(data_source_id: string, body: PatchSearchDataSourceRequest): Promise<PatchSearchDataSourceResponse>
    /**
     * 获取数据源
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/get
     */
    getSearchDataSource(data_source_id: string): Promise<GetSearchDataSourceResponse>
    /**
     * 批量获取数据源
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source/list
     */
    listSearchDataSource(query?: ListSearchDataSourceQuery): Paginated<DataSource>
    /**
     * 为指定数据项创建索引
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/create
     */
    createSearchDataSourceItem(data_source_id: string, body: CreateSearchDataSourceItemRequest): Promise<void>
    /**
     * 删除数据项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/delete
     */
    deleteSearchDataSourceItem(data_source_id: string, item_id: string): Promise<void>
    /**
     * 查询指定数据项
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/data_source-item/get
     */
    getSearchDataSourceItem(data_source_id: string, item_id: string): Promise<GetSearchDataSourceItemResponse>
    /**
     * 创建数据范式
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/create
     */
    createSearchSchema(body: CreateSearchSchemaRequest, query?: CreateSearchSchemaQuery): Promise<CreateSearchSchemaResponse>
    /**
     * 删除数据范式
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/delete
     */
    deleteSearchSchema(schema_id: string): Promise<void>
    /**
     * 修改数据范式
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/patch
     */
    patchSearchSchema(schema_id: string, body: PatchSearchSchemaRequest): Promise<PatchSearchSchemaResponse>
    /**
     * 获取数据范式
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/search-v2/schema/get
     */
    getSearchSchema(schema_id: string): Promise<GetSearchSchemaResponse>
  }
}

export interface CreateSearchMessageRequest {
  /** 搜索关键词 */
  query: string
  /** 消息来自user_id列表 */
  from_ids?: string[]
  /** 消息所在chat_id列表 */
  chat_ids?: string[]
  /** 消息类型(file/image/media) */
  message_type?: 'file' | 'image' | 'media'
  /** at用户user_id列表 */
  at_chatter_ids?: string[]
  /** 消息来自类型(bot/user) */
  from_type?: 'bot' | 'user'
  /** 会话类型(group_chat/p2p_chat) */
  chat_type?: 'group_chat' | 'p2p_chat'
  /** 消息发送起始时间 */
  start_time?: string
  /** 消息发送结束时间 */
  end_time?: string
}

export interface CreateSearchMessageQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export interface CreateSearchAppRequest {
  /** 搜索关键词 */
  query: string
}

export interface CreateSearchAppQuery extends Pagination {
  /** 此次调用中使用的用户ID的类型 */
  user_id_type?: 'user_id' | 'union_id' | 'open_id'
}

export const enum CreateSearchDataSourceRequestState {
  /** 已上线 */
  Online = 0,
  /** 未上线 */
  Offline = 1,
}

export const enum CreateSearchDataSourceRequestConnectType {
  /** 调用搜索请求时，使用的是飞书搜索接口 */
  Default = 0,
  /** 调用搜索请求时，使用的是自定义回调函数的Uri */
  Callback = 1,
}

export interface CreateSearchDataSourceRequest {
  /** data_source的展示名称 */
  name: string
  /** 数据源状态，0-已上线，1-未上线 */
  state?: CreateSearchDataSourceRequestState
  /** 对于数据源的描述 */
  description?: string
  /** 数据源在 search tab 上的展示图标路径 */
  icon_url?: string
  /** 数据源采用的展示模版名称 */
  template?: string
  /** 描述哪些字段可以被搜索 */
  searchable_fields?: string[]
  /** 数据源的国际化展示名称 */
  i18n_name?: I18nMeta
  /** 数据源的国际化描述 */
  i18n_description?: I18nMeta
  /** 数据源关联的 schema 标识 */
  schema_id?: string
  /** datasource对应的开放平台应用id */
  app_id?: string
  /** 搜索请求的接入方式 */
  connect_type?: CreateSearchDataSourceRequestConnectType
  /** 根据连接器类型不同所需要提供的相关参数 */
  connector_param?: ConnectorParam
  /** 是否使用问答服务 */
  enable_answer?: boolean
}

export interface CreateSearchDataSourceResponse {
  /** 数据源实例 */
  data_source?: DataSource
}

export const enum PatchSearchDataSourceRequestState {
  /** 已上线 */
  Online = 0,
  /** 未上线 */
  Offline = 1,
}

export interface PatchSearchDataSourceRequest {
  /** 数据源的展示名称 */
  name?: string
  /** 数据源状态，0-已上线，1-未上线 */
  state?: PatchSearchDataSourceRequestState
  /** 对于数据源的描述 */
  description?: string
  /** 数据源在 search tab 上的展示图标路径 */
  icon_url?: string
  /** 数据源名称多语言配置，json格式，key为语言locale，value为对应文案，例如{"zh_cn":"测试数据源", "en_us":"Test DataSource"} */
  i18n_name?: I18nMeta
  /** 数据源描述多语言配置，json格式，key为语言locale，value为对应文案，例如{"zh_cn":"搜索测试数据源相关数据", "en_us":"Search data from Test DataSource"} */
  i18n_description?: I18nMeta
  /** 修改connector的相关配置 */
  connector_param?: ConnectorParam
  /** 是否使用问答服务 */
  enable_answer?: boolean
}

export interface PatchSearchDataSourceResponse {
  /** 数据源 */
  data_source?: DataSource
}

export interface GetSearchDataSourceResponse {
  /** 数据源实例 */
  data_source?: DataSource
}

export const enum ListSearchDataSourceQueryView {
  /** 全量数据 */
  FULL = 0,
  /** 摘要数据 */
  BASIC = 1,
}

export interface ListSearchDataSourceQuery extends Pagination {
  /** 回包数据格式，0-全量数据；1-摘要数据。**注**：摘要数据仅包含"id"，"name"，"state"。 */
  view?: ListSearchDataSourceQueryView
}

export interface CreateSearchDataSourceItemRequest {
  /** item 在 datasource 中的唯一标识，只接受英文字母、数字和下划线 */
  id: string
  /** item 的访问权限控制 */
  acl: Acl[]
  /** item 的元信息 */
  metadata: ItemMetadata
  /** 结构化数据 */
  structured_data: string
  /** 非结构化数据，如文档文本 */
  content?: ItemContent
}

export interface GetSearchDataSourceItemResponse {
  /** 数据项实例 */
  item: Item
}

export interface CreateSearchSchemaRequest {
  /** 数据范式的属性定义 */
  properties: SchemaProperty[]
  /** 数据展示相关配置 */
  display: SchemaDisplay
  /** 用户自定义数据范式的唯一标识 */
  schema_id: string
}

export interface CreateSearchSchemaQuery {
  /** 是否只用来校验合法性 */
  validate_only?: boolean
}

export interface CreateSearchSchemaResponse {
  /** 数据范式实例 */
  schema?: Schema
}

export interface PatchSearchSchemaRequest {
  /** 数据展示相关配置 */
  display?: SchemaDisplay
  /** 数据范式的属性定义 */
  properties?: PatchSchemaProperty[]
}

export interface PatchSearchSchemaResponse {
  /** 数据范式实例 */
  schema?: Schema
}

export interface GetSearchSchemaResponse {
  /** 数据范式 */
  schema?: Schema
}

Internal.define({
  '/search/v2/message': {
    POST: { name: 'createSearchMessage', pagination: { argIndex: 1 } },
  },
  '/search/v2/app': {
    POST: { name: 'createSearchApp', pagination: { argIndex: 1 } },
  },
  '/search/v2/data_sources': {
    POST: 'createSearchDataSource',
    GET: { name: 'listSearchDataSource', pagination: { argIndex: 0 } },
  },
  '/search/v2/data_sources/{data_source_id}': {
    DELETE: 'deleteSearchDataSource',
    PATCH: 'patchSearchDataSource',
    GET: 'getSearchDataSource',
  },
  '/search/v2/data_sources/{data_source_id}/items': {
    POST: 'createSearchDataSourceItem',
  },
  '/search/v2/data_sources/{data_source_id}/items/{item_id}': {
    DELETE: 'deleteSearchDataSourceItem',
    GET: 'getSearchDataSourceItem',
  },
  '/search/v2/schemas': {
    POST: 'createSearchSchema',
  },
  '/search/v2/schemas/{schema_id}': {
    DELETE: 'deleteSearchSchema',
    PATCH: 'patchSearchSchema',
    GET: 'getSearchSchema',
  },
})
