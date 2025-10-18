import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    wiki: Wiki.Methods
  }
}

export namespace Wiki {
  export interface Methods {
    space: Space.Methods
    task: Task.Methods
    node: Node.Methods
  }

  export namespace Space {
    export interface Methods {
      member: Member.Methods
      setting: Setting.Methods
      node: Node.Methods
      /**
       * 获取知识空间列表
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/list
       */
      list(query?: ListQuery): Paginated<Lark.Space>
      /**
       * 获取知识空间信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get
       */
      get(space_id: string, query?: GetQuery): Promise<GetResponse>
      /**
       * 创建知识空间
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 获取知识空间节点信息
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space/get_node
       */
      getNode(query?: GetNodeQuery): Promise<GetNodeResponse>
    }

    export interface ListQuery extends Pagination {
      /** 当查询个人文档库时，指定返回的文档库名称展示语言。可选值有：zh, id, de, en, es, fr, it, pt, vi, ru, hi, th, ko, ja, zh-HK, zh-TW。 */
      lang?: 'zh' | 'id' | 'de' | 'en' | 'es' | 'fr' | 'it' | 'pt' | 'vi' | 'ru' | 'hi' | 'th' | 'ko' | 'ja' | 'zh-HK' | 'zh-TW'
    }

    export interface GetQuery {
      /** 当查询个人文档库时，指定返回的文档库名称展示语言。可选值有：zh, id, de, en, es, fr, it, pt, vi, ru, hi, th, ko, ja, zh-HK, zh-TW。 */
      lang?: 'zh' | 'id' | 'de' | 'en' | 'es' | 'fr' | 'it' | 'pt' | 'vi' | 'ru' | 'hi' | 'th' | 'ko' | 'ja' | 'zh-HK' | 'zh-TW'
    }

    export interface GetResponse {
      /** 知识空间 */
      space?: Lark.Space
    }

    export interface CreateRequest {
      /** 知识空间名称 */
      name?: string
      /** 知识空间描述 */
      description?: string
      /** 表示知识空间的分享状态 */
      open_sharing?: 'open' | 'closed'
    }

    export interface CreateResponse {
      /** 知识空间信息 */
      space?: Lark.Space
    }

    export interface GetNodeQuery {
      /** 文档的wiki token */
      token: string
      /** 文档类型 */
      obj_type?: 'doc' | 'docx' | 'sheet' | 'mindnote' | 'bitable' | 'file' | 'slides' | 'wiki'
    }

    export interface GetNodeResponse {
      /** 节点信息 */
      node?: Lark.Node
    }

    export namespace Member {
      export interface Methods {
        /**
         * 获取知识空间成员列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/list
         */
        list(space_id: string, query?: Pagination): Paginated<Lark.Member, 'members'>
        /**
         * 添加知识空间成员
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/create
         */
        create(space_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 删除知识空间成员
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-member/delete
         */
        delete(space_id: string, member_id: string, body: DeleteRequest): Promise<DeleteResponse>
      }

      export interface CreateRequest {
        /** 知识库协作者 ID 类型 */
        member_type: string
        /** 知识库协作者 ID */
        member_id: string
        /** 知识库协作者角色 */
        member_role: string
      }

      export interface CreateQuery {
        /** 添加权限后是否通知对方 */
        need_notification?: boolean
      }

      export interface CreateResponse {
        /** 知识库协作者 */
        member?: Lark.Member
      }

      export interface DeleteRequest {
        /** 知识库协作者 ID 类型 */
        member_type: string
        /** 知识库协作者角色 */
        member_role: string
        /** 知识库协作者类型 */
        type?: 'user' | 'chat' | 'department'
      }

      export interface DeleteResponse {
        /** 成员信息 */
        member: Lark.Member
      }
    }

    export namespace Setting {
      export interface Methods {
        /**
         * 更新知识空间设置
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-setting/update
         */
        update(space_id: string, body: UpdateRequest): Promise<UpdateResponse>
      }

      export interface UpdateRequest {
        /** 谁可以创建空间的一级页面： "admin_and_member" = 管理员和成员 "admin"  - 仅管理员 */
        create_setting?: string
        /** 可阅读用户可否创建副本/打印/导出/复制： "allow" - 允许 "not_allow" - 不允许 */
        security_setting?: string
        /** 可阅读用户可否评论： "allow" - 允许 "not_allow" - 不允许 */
        comment_setting?: string
      }

      export interface UpdateResponse {
        /** 空间设置 */
        setting?: Lark.Setting
      }
    }

    export namespace Node {
      export interface Methods {
        /**
         * 创建知识空间节点
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/create
         */
        create(space_id: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 获取知识空间子节点列表
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/list
         */
        list(space_id: string, query?: ListQuery): Paginated<Lark.Node>
        /**
         * 移动知识空间节点
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move
         */
        move(space_id: string, node_token: string, body: MoveRequest): Promise<MoveResponse>
        /**
         * 更新知识空间节点标题
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/update_title
         */
        updateTitle(space_id: string, node_token: string, body: UpdateTitleRequest): Promise<void>
        /**
         * 创建知识空间节点副本
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/copy
         */
        copy(space_id: string, node_token: string, body: CopyRequest): Promise<CopyResponse>
        /**
         * 移动云空间文档至知识空间
         * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/space-node/move_docs_to_wiki
         */
        moveDocsToWiki(space_id: string, body: MoveDocsToWikiRequest): Promise<MoveDocsToWikiResponse>
      }

      export interface CreateRequest {
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

      export interface CreateResponse {
        /** 节点 */
        node?: Lark.Node
      }

      export interface ListQuery extends Pagination {
        /** 父节点token */
        parent_node_token?: string
      }

      export interface MoveRequest {
        /** 移动到的父节点token */
        target_parent_token?: string
        /** 移动到的知识空间ID */
        target_space_id?: string
      }

      export interface MoveResponse {
        /** 移动后的节点信息 */
        node?: Lark.Node
      }

      export interface UpdateTitleRequest {
        /** 节点新标题 */
        title: string
      }

      export interface CopyRequest {
        /** 目标父节点token */
        target_parent_token?: string
        /** 目标知识空间id */
        target_space_id?: string
        /** 复制后的新标题。如果填空，则新标题为空。如果不填，则使用原节点标题。 */
        title?: string
      }

      export interface CopyResponse {
        /** copy后的节点 */
        node: Lark.Node
      }

      export interface MoveDocsToWikiRequest {
        /** 节点的父亲token */
        parent_wiki_token?: string
        /** 文档类型 */
        obj_type: 'doc' | 'sheet' | 'bitable' | 'mindnote' | 'docx' | 'file' | 'slides'
        /** 文档token */
        obj_token: string
        /** 没有权限时，是否申请迁入文档 */
        apply?: boolean
      }

      export interface MoveDocsToWikiResponse {
        /** 移动后的知识库token */
        wiki_token?: string
        /** 任务id */
        task_id?: string
        /** 是否提交了文档迁入申请 */
        applied?: boolean
      }
    }
  }

  export namespace Task {
    export interface Methods {
      /**
       * 获取任务结果
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/wiki-v2/task/get
       */
      get(task_id: string, query?: GetQuery): Promise<GetResponse>
    }

    export interface GetQuery {
      /** 任务类型 */
      task_type: 'move'
    }

    export interface GetResponse {
      /** 任务结果 */
      task: Lark.TaskResult
    }
  }

  export namespace Node {
    export interface Methods {
      /**
       * 搜索 Wiki
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uEzN0YjLxcDN24SM3QjN/search_wiki
       */
      search(body: SearchRequest, query?: Pagination): Paginated<Lark.Node>
    }

    export interface SearchRequest {
      /** 搜索关键词 */
      query: string
      /** 文档所属的知识空间ID，为空搜索所有 wiki */
      space_id?: string
      /** wiki token，不为空搜索该节点及其所有子节点，为空搜索所有 wiki（根据 space_id 选择 space） */
      node_id?: string
    }
  }
}

Internal.define({
  '/wiki/v2/spaces': {
    GET: { name: 'wiki.space.list', pagination: { argIndex: 0 } },
    POST: 'wiki.space.create',
  },
  '/wiki/v2/spaces/{space_id}': {
    GET: 'wiki.space.get',
  },
  '/wiki/v2/spaces/{space_id}/members': {
    GET: { name: 'wiki.space.member.list', pagination: { argIndex: 1, itemsKey: 'members' } },
    POST: 'wiki.space.member.create',
  },
  '/wiki/v2/spaces/{space_id}/members/{member_id}': {
    DELETE: 'wiki.space.member.delete',
  },
  '/wiki/v2/spaces/{space_id}/setting': {
    PUT: 'wiki.space.setting.update',
  },
  '/wiki/v2/spaces/{space_id}/nodes': {
    POST: 'wiki.space.node.create',
    GET: { name: 'wiki.space.node.list', pagination: { argIndex: 1 } },
  },
  '/wiki/v2/spaces/get_node': {
    GET: 'wiki.space.getNode',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/move': {
    POST: 'wiki.space.node.move',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/update_title': {
    POST: 'wiki.space.node.updateTitle',
  },
  '/wiki/v2/spaces/{space_id}/nodes/{node_token}/copy': {
    POST: 'wiki.space.node.copy',
  },
  '/wiki/v2/spaces/{space_id}/nodes/move_docs_to_wiki': {
    POST: 'wiki.space.node.moveDocsToWiki',
  },
  '/wiki/v2/tasks/{task_id}': {
    GET: 'wiki.task.get',
  },
  '/wiki/v1/nodes/search': {
    POST: { name: 'wiki.node.search', pagination: { argIndex: 1 } },
  },
})
