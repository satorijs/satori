import { Member, Node, Setting, Space, TaskResult } from '.'
import { Internal, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取知识空间列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/list
     */
    listWikiSpace(query?: ListWikiSpaceQuery): Paginated<Space>
    /**
     * 获取知识空间信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get
     */
    getWikiSpace(space_id: string, query?: GetWikiSpaceQuery): Promise<GetWikiSpaceResponse>
    /**
     * 创建知识空间
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/create
     */
    createWikiSpace(body: CreateWikiSpaceRequest): Promise<CreateWikiSpaceResponse>
    /**
     * 获取知识空间成员列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/list
     */
    listWikiSpaceMember(space_id: string, query?: Pagination): Paginated<Member, 'members'>
    /**
     * 添加知识空间成员
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/create
     */
    createWikiSpaceMember(space_id: string, body: CreateWikiSpaceMemberRequest, query?: CreateWikiSpaceMemberQuery): Promise<CreateWikiSpaceMemberResponse>
    /**
     * 删除知识空间成员
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/delete
     */
    deleteWikiSpaceMember(space_id: string, member_id: string, body: DeleteWikiSpaceMemberRequest): Promise<DeleteWikiSpaceMemberResponse>
    /**
     * 更新知识空间设置
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-setting/update
     */
    updateWikiSpaceSetting(space_id: string, body: UpdateWikiSpaceSettingRequest): Promise<UpdateWikiSpaceSettingResponse>
    /**
     * 创建知识空间节点
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/create
     */
    createWikiSpaceNode(space_id: string, body: CreateWikiSpaceNodeRequest): Promise<CreateWikiSpaceNodeResponse>
    /**
     * 获取知识空间节点信息
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get_node
     */
    getNodeWikiSpace(query?: GetNodeWikiSpaceQuery): Promise<GetNodeWikiSpaceResponse>
    /**
     * 获取知识空间子节点列表
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/list
     */
    listWikiSpaceNode(space_id: string, query?: ListWikiSpaceNodeQuery): Paginated<Node>
    /**
     * 移动知识空间节点
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move
     */
    moveWikiSpaceNode(space_id: string, node_token: string, body: MoveWikiSpaceNodeRequest): Promise<MoveWikiSpaceNodeResponse>
    /**
     * 更新知识空间节点标题
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/update_title
     */
    updateTitleWikiSpaceNode(space_id: string, node_token: string, body: UpdateTitleWikiSpaceNodeRequest): Promise<void>
    /**
     * 创建知识空间节点副本
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/copy
     */
    copyWikiSpaceNode(space_id: string, node_token: string, body: CopyWikiSpaceNodeRequest): Promise<CopyWikiSpaceNodeResponse>
    /**
     * 移动云空间文档至知识空间
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move_docs_to_wiki
     */
    moveDocsToWikiWikiSpaceNode(space_id: string, body: MoveDocsToWikiWikiSpaceNodeRequest): Promise<MoveDocsToWikiWikiSpaceNodeResponse>
    /**
     * 获取任务结果
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get
     */
    getWikiTask(task_id: string, query?: GetWikiTaskQuery): Promise<GetWikiTaskResponse>
    /**
     * 搜索 Wiki
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uEzN0YjLxcDN24SM3QjN/search_wiki
     */
    searchWikiNode(body: SearchWikiNodeRequest, query?: Pagination): Paginated<Node>
  }
}

export interface ListWikiSpaceQuery extends Pagination {
  /** 当查询个人文档库时，指定返回的文档库名称展示语言。可选值有：zh, id, de, en, es, fr, it, pt, vi, ru, hi, th, ko, ja, zh-HK, zh-TW。 */
  lang?: 'zh' | 'id' | 'de' | 'en' | 'es' | 'fr' | 'it' | 'pt' | 'vi' | 'ru' | 'hi' | 'th' | 'ko' | 'ja' | 'zh-HK' | 'zh-TW'
}

export interface GetWikiSpaceQuery {
  /** 当查询个人文档库时，指定返回的文档库名称展示语言。可选值有：zh, id, de, en, es, fr, it, pt, vi, ru, hi, th, ko, ja, zh-HK, zh-TW。 */
  lang?: 'zh' | 'id' | 'de' | 'en' | 'es' | 'fr' | 'it' | 'pt' | 'vi' | 'ru' | 'hi' | 'th' | 'ko' | 'ja' | 'zh-HK' | 'zh-TW'
}

export interface GetWikiSpaceResponse {
  /** 知识空间 */
  space?: Space
}

export interface CreateWikiSpaceRequest {
  /** 知识空间名称 */
  name?: string
  /** 知识空间描述 */
  description?: string
  /** 表示知识空间的分享状态 */
  open_sharing?: 'open' | 'closed'
}

export interface CreateWikiSpaceResponse {
  /** 知识空间信息 */
  space?: Space
}

export interface CreateWikiSpaceMemberRequest {
  /** 知识库协作者 ID 类型 */
  member_type: string
  /** 知识库协作者 ID */
  member_id: string
  /** 知识库协作者角色 */
  member_role: string
}

export interface CreateWikiSpaceMemberQuery {
  /** 添加权限后是否通知对方 */
  need_notification?: boolean
}

export interface CreateWikiSpaceMemberResponse {
  /** 知识库协作者 */
  member?: Member
}

export interface DeleteWikiSpaceMemberRequest {
  /** 知识库协作者 ID 类型 */
  member_type: string
  /** 知识库协作者角色 */
  member_role: string
  /** 知识库协作者类型 */
  type?: 'user' | 'chat' | 'department'
}

export interface DeleteWikiSpaceMemberResponse {
  /** 成员信息 */
  member: Member
}

export interface UpdateWikiSpaceSettingRequest {
  /** 谁可以创建空间的一级页面： "admin_and_member" = 管理员和成员 "admin"  - 仅管理员 */
  create_setting?: string
  /** 可阅读用户可否创建副本/打印/导出/复制： "allow" - 允许 "not_allow" - 不允许 */
  security_setting?: string
  /** 可阅读用户可否评论： "allow" - 允许 "not_allow" - 不允许 */
  comment_setting?: string
}

export interface UpdateWikiSpaceSettingResponse {
  /** 空间设置 */
  setting?: Setting
}

export interface CreateWikiSpaceNodeRequest {
  /** 文档类型，对于快捷方式，该字段是对应的实体的obj_type。 */
  obj_type: 'doc' | 'sheet' | 'mindnote' | 'bitable' | 'file' | 'docx' | 'slides'
  /** 父节点 token。若当前节点为一级节点，父节点 token 为空。 */
  parent_node_token?: string
  /** 节点类型 */
  node_type: 'origin' | 'shortcut'
  /** 快捷方式对应的实体node_token，当节点为快捷方式时，该值不为空。 */
  origin_node_token?: string
  /** 文档标题 */
  title?: string
}

export interface CreateWikiSpaceNodeResponse {
  /** 节点 */
  node?: Node
}

export interface GetNodeWikiSpaceQuery {
  /** 文档的wiki token */
  token: string
  /** 文档类型 */
  obj_type?: 'doc' | 'docx' | 'sheet' | 'mindnote' | 'bitable' | 'file' | 'slides' | 'wiki'
}

export interface GetNodeWikiSpaceResponse {
  /** 节点信息 */
  node?: Node
}

export interface ListWikiSpaceNodeQuery extends Pagination {
  /** 父节点token */
  parent_node_token?: string
}

export interface MoveWikiSpaceNodeRequest {
  /** 移动到的父节点token */
  target_parent_token?: string
  /** 移动到的知识空间ID */
  target_space_id?: string
}

export interface MoveWikiSpaceNodeResponse {
  /** 移动后的节点信息 */
  node?: Node
}

export interface UpdateTitleWikiSpaceNodeRequest {
  /** 节点新标题 */
  title: string
}

export interface CopyWikiSpaceNodeRequest {
  /** 目标父节点token */
  target_parent_token?: string
  /** 目标知识空间id */
  target_space_id?: string
  /** 复制后的新标题。如果填空，则新标题为空。如果不填，则使用原节点标题。 */
  title?: string
}

export interface CopyWikiSpaceNodeResponse {
  /** copy后的节点 */
  node: Node
}

export interface MoveDocsToWikiWikiSpaceNodeRequest {
  /** 节点的父亲token */
  parent_wiki_token?: string
  /** 文档类型 */
  obj_type: 'doc' | 'sheet' | 'bitable' | 'mindnote' | 'docx' | 'file' | 'slides'
  /** 文档token */
  obj_token: string
  /** 没有权限时，是否申请迁入文档 */
  apply?: boolean
}

export interface MoveDocsToWikiWikiSpaceNodeResponse {
  /** 移动后的知识库token */
  wiki_token?: string
  /** 任务id */
  task_id?: string
  /** 是否提交了文档迁入申请 */
  applied?: boolean
}

export interface GetWikiTaskQuery {
  /** 任务类型 */
  task_type: 'move'
}

export interface GetWikiTaskResponse {
  /** 任务结果 */
  task: TaskResult
}

export interface SearchWikiNodeRequest {
  /** 搜索关键词 */
  query: string
  /** 文档所属的知识空间ID，为空搜索所有 wiki */
  space_id?: string
  /** wiki token，不为空搜索该节点及其所有子节点，为空搜索所有 wiki（根据 space_id 选择 space） */
  node_id?: string
}

Internal.define({
  '/wiki/v2/spaces': {
    GET: { name: 'listWikiSpace', pagination: { argIndex: 0 } },
    POST: 'createWikiSpace',
  },
  '/wiki/v2/spaces/{space_id}': {
    GET: 'getWikiSpace',
  },
  '/wiki/v2/spaces/{space_id}/members': {
    GET: { name: 'listWikiSpaceMember', pagination: { argIndex: 1, itemsKey: 'members' } },
    POST: 'createWikiSpaceMember',
  },
  '/wiki/v2/spaces/{space_id}/members/{member_id}': {
    DELETE: 'deleteWikiSpaceMember',
  },
  '/wiki/v2/spaces/{space_id}/setting': {
    PUT: 'updateWikiSpaceSetting',
  },
  '/wiki/v2/spaces/{space_id}/nodes': {
    POST: 'createWikiSpaceNode',
    GET: { name: 'listWikiSpaceNode', pagination: { argIndex: 1 } },
  },
  '/wiki/v2/spaces/get_node': {
    GET: 'getNodeWikiSpace',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/move': {
    POST: 'moveWikiSpaceNode',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/update_title': {
    POST: 'updateTitleWikiSpaceNode',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/copy': {
    POST: 'copyWikiSpaceNode',
  },
  '/wiki/v2/spaces/{space_id}/nodes/move_docs_to_wiki': {
    POST: 'moveDocsToWikiWikiSpaceNode',
  },
  '/wiki/v2/tasks/{task_id}': {
    GET: 'getWikiTask',
  },
  '/wiki/v1/nodes/search': {
    POST: { name: 'searchWikiNode', pagination: { argIndex: 1 } },
  },
})
