import * as Lark from '.'
import { Internal, Paginated, Pagination } from '../internal'

declare module '../internal' {
  interface Internal {
    aily: Aily.Methods
  }
}

export namespace Aily {
  export interface Methods {
    ailySession: AilySession.Methods
    app: App.Methods
  }

  export namespace AilySession {
    export interface Methods {
      ailyMessage: AilyMessage.Methods
      run: Run.Methods
      /**
       * 创建会话
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/create
       */
      create(body: CreateRequest): Promise<CreateResponse>
      /**
       * 更新会话
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/update
       */
      update(aily_session_id: string, body: UpdateRequest): Promise<UpdateResponse>
      /**
       * 获取会话
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/get
       */
      get(aily_session_id: string): Promise<GetResponse>
      /**
       * 删除会话
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session/delete
       */
      delete(aily_session_id: string): Promise<void>
    }

    export interface CreateRequest {
      /** 渠道上下文 */
      channel_context?: string
      /** 其他透传信息 */
      metadata?: string
    }

    export interface CreateResponse {
      /** 创建的会话信息 */
      session?: Lark.AilySession
    }

    export interface UpdateRequest {
      /** 渠道上下文 */
      channel_context?: string
      /** 其他透传信息 */
      metadata?: string
    }

    export interface UpdateResponse {
      /** 会话信息 */
      session?: Lark.AilySession
    }

    export interface GetResponse {
      /** 会话信息 */
      session?: Lark.AilySession
    }

    export namespace AilyMessage {
      export interface Methods {
        /**
         * 发送智能伙伴消息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-aily_message/create
         */
        create(aily_session_id: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 获取智能伙伴消息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-aily_message/get
         */
        get(aily_session_id: string, aily_message_id: string): Promise<GetResponse>
        /**
         * 列出智能伙伴消息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-aily_message/list
         */
        list(aily_session_id: string, query?: ListQuery): Paginated<Lark.AilyMessage, 'messages'>
      }

      export interface CreateRequest {
        /** 幂等id，同一 session 下相同的幂等 id 算一条消息，有效期72h */
        idempotent_id: string
        /** 消息内容类型 */
        content_type: Lark.AilyMessageContentType
        /** 消息内容 */
        content: string
        /** 消息中包含的文件 ID 列表 */
        file_ids?: string[]
        /** 引用的消息 ID */
        quote_message_id?: string
        /** 被@的实体 */
        mentions?: Lark.AilyMention[]
      }

      export interface CreateResponse {
        /** 消息信息 */
        message?: Lark.AilyMessage
      }

      export interface GetResponse {
        /** 消息信息 */
        message?: Lark.AilyMessage
      }

      export interface ListQuery extends Pagination {
        /** 运行 ID */
        run_id?: string
        /** 返回生成中的消息 */
        with_partial_message?: boolean
      }
    }

    export namespace Run {
      export interface Methods {
        /**
         * 创建运行
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/create
         */
        create(aily_session_id: string, body: CreateRequest): Promise<CreateResponse>
        /**
         * 获取运行
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/get
         */
        get(aily_session_id: string, run_id: string): Promise<GetResponse>
        /**
         * 列出运行
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/list
         */
        list(aily_session_id: string, query?: Pagination): Paginated<Lark.Run, 'runs'>
        /**
         * 取消运行
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-run/cancel
         */
        cancel(aily_session_id: string, run_id: string): Promise<CancelResponse>
      }

      export interface CreateRequest {
        /** 应用 ID */
        app_id: string
        /** 技能 ID */
        skill_id?: string
        /** 指定技能 ID 时可以同时指定技能输入 */
        skill_input?: string
        /** 其他透传信息 */
        metadata?: string
      }

      export interface CreateResponse {
        /** 运行信息 */
        run?: Lark.Run
      }

      export interface GetResponse {
        /** 运行信息 */
        run?: Lark.Run
      }

      export interface CancelResponse {
        /** 运行信息 */
        run?: Lark.Run
      }
    }
  }

  export namespace App {
    export interface Methods {
      skill: Skill.Methods
      knowledge: Knowledge.Methods
      dataAsset: DataAsset.Methods
      dataAssetTag: DataAssetTag.Methods
    }

    export namespace Skill {
      export interface Methods {
        /**
         * 调用技能
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-skill/start
         */
        start(app_id: string, skill_id: string, body: StartRequest): Promise<StartResponse>
        /**
         * 获取技能信息
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-skill/get
         */
        get(app_id: string, skill_id: string): Promise<GetResponse>
        /**
         * 查询技能列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-skill/list
         */
        list(app_id: string, query?: Pagination): Paginated<Lark.Skill, 'skills'>
      }

      export interface StartRequest {
        /** 技能的全局变量 */
        global_variable?: Lark.SkillGlobalVariable
        /** 技能的自定义变量 */
        input?: string
      }

      export interface StartResponse {
        /** 技能的输出 */
        output?: string
        /** 技能的执行状态 */
        status?: string
      }

      export interface GetResponse {
        /** 技能信息 */
        skill?: Lark.Skill
      }
    }

    export namespace Knowledge {
      export interface Methods {
        /**
         * 执行数据知识问答
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-knowledge/ask
         */
        ask(app_id: string, body: AskRequest): Promise<AskResponse>
      }

      export interface AskRequest {
        /** 输入消息（当前仅支持纯文本输入） */
        message: Lark.AilyKnowledgeMessage
        /** 控制知识问答所依据的数据知识范围 */
        data_asset_ids?: string[]
        /** 控制知识问答所依据的数据知识分类范围 */
        data_asset_tag_ids?: string[]
      }

      export interface AskResponse {
        /** 响应状态，枚举值 */
        status?: 'processing' | 'finished'
        /** 结束类型，枚举值 */
        finish_type?: 'qa' | 'faq'
        /** 响应消息 */
        message?: Lark.AilyKnowledgeMessage
        /** 知识问答运行过程结构化数据，status=finished 且 finish_type=qa 时返回 */
        process_data?: Lark.AilyKnowledgeAskProcessData
        /** 匹配标准问答对结果，status=finished 且 finish_type=faq时返回 */
        faq_result?: Lark.AilyKnowledgeFaq
        /** 是否有结果，true 则 代表 message 中的内容是通过配置知识而生成的 */
        has_answer?: boolean
      }
    }

    export namespace DataAsset {
      export interface Methods {
        /**
         * 上传文件用于数据知识管理
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/upload_file
         */
        uploadFile(app_id: string, form: UploadFileForm, query?: UploadFileQuery): Promise<UploadFileResponse>
        /**
         * 创建数据知识
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/create
         */
        create(app_id: string, body: CreateRequest, query?: CreateQuery): Promise<CreateResponse>
        /**
         * 获取数据知识
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/get
         */
        get(app_id: string, data_asset_id: string, query?: GetQuery): Promise<GetResponse>
        /**
         * 删除数据知识
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/delete
         */
        delete(app_id: string, data_asset_id: string, query?: DeleteQuery): Promise<DeleteResponse>
        /**
         * 查询数据知识列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset/list
         */
        list(app_id: string, query?: ListQuery): Paginated<Lark.DataAsset>
      }

      export interface UploadFileForm {
        /** 需要上传的文件 */
        file: Blob
      }

      export interface UploadFileQuery {
        /** 应用环境，默认为线上环境，dev代表开发环境，只支持dev */
        tenant_type?: string
      }

      export interface UploadFileResponse {
        /** 数据知识文件 */
        file_info?: Lark.DataAssetFile
      }

      export interface CreateRequest {
        /** 连接类型 */
        connect_type: 'import' | 'direct'
        /** 数据源类型 */
        source_type: 'file' | 'lark_wiki_space' | 'lark_doc' | 'lark_helpdesk'
        /** 知识导入配置 */
        import_knowledge_setting?: Lark.DataAssetImportKnowledgeSetting
        /** 数据知识描述信息 */
        description?: Record<string, string>
      }

      export interface CreateQuery {
        /** 应用环境，默认为线上环境，dev代表开发环境，只支持dev */
        tenant_type?: string
      }

      export interface CreateResponse {
        /** 数据知识 */
        data_asset?: Lark.DataAsset
      }

      export interface GetQuery {
        /** 结果是否包含数据与知识项 */
        with_data_asset_item?: boolean
        /** 结果是否包含数据知识连接状态 */
        with_connect_status?: boolean
        /** 应用环境，默认为线上环境，dev代表开发环境 */
        tenant_type?: string
      }

      export interface GetResponse {
        /** 数据知识 */
        data_asset?: Lark.DataAsset
      }

      export interface DeleteQuery {
        /** 应用环境，默认为线上环境，dev代表开发环境，只支持dev */
        tenant_type?: string
      }

      export interface DeleteResponse {
        /** 数据知识 */
        data_asset?: Lark.DataAsset
      }

      export interface ListQuery extends Pagination {
        /** 模糊匹配关键词 */
        keyword?: string
        /** 根据数据知识 ID 进行过滤 */
        data_asset_ids?: string[]
        /** 根据数据知识分类 ID 进行过滤 */
        data_asset_tag_ids?: string[]
        /** 结果是否包含数据与知识项目 */
        with_data_asset_item?: boolean
        /** 结果是否包含数据连接状态 */
        with_connect_status?: boolean
      }
    }

    export namespace DataAssetTag {
      export interface Methods {
        /**
         * 获取数据知识分类列表
         * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/aily-v1/app-data_asset_tag/list
         */
        list(app_id: string, query?: ListQuery): Paginated<Lark.DataAssetTag>
      }

      export interface ListQuery extends Pagination {
        /** 模糊匹配分类名称 */
        keyword?: string
        /** 模糊匹配分类名称 */
        data_asset_tag_ids?: string[]
      }
    }
  }
}

Internal.define({
  '/aily/v1/sessions': {
    POST: 'aily.ailySession.create',
  },
  '/aily/v1/sessions/{aily_session_id}': {
    PUT: 'aily.ailySession.update',
    GET: 'aily.ailySession.get',
    DELETE: 'aily.ailySession.delete',
  },
  '/aily/v1/sessions/{aily_session_id}/messages': {
    POST: 'aily.ailySession.ailyMessage.create',
    GET: { name: 'aily.ailySession.ailyMessage.list', pagination: { argIndex: 1, itemsKey: 'messages' } },
  },
  '/aily/v1/sessions/{aily_session_id}/messages/{aily_message_id}': {
    GET: 'aily.ailySession.ailyMessage.get',
  },
  '/aily/v1/sessions/{aily_session_id}/runs': {
    POST: 'aily.ailySession.run.create',
    GET: { name: 'aily.ailySession.run.list', pagination: { argIndex: 1, itemsKey: 'runs' } },
  },
  '/aily/v1/sessions/{aily_session_id}/runs/{run_id}': {
    GET: 'aily.ailySession.run.get',
  },
  '/aily/v1/sessions/{aily_session_id}/runs/{run_id}/cancel': {
    POST: 'aily.ailySession.run.cancel',
  },
  '/aily/v1/apps/{app_id}/skills/{skill_id}/start': {
    POST: 'aily.app.skill.start',
  },
  '/aily/v1/apps/{app_id}/skills/{skill_id}': {
    GET: 'aily.app.skill.get',
  },
  '/aily/v1/apps/{app_id}/skills': {
    GET: { name: 'aily.app.skill.list', pagination: { argIndex: 1, itemsKey: 'skills' } },
  },
  '/aily/v1/apps/{app_id}/knowledges/ask': {
    POST: 'aily.app.knowledge.ask',
  },
  '/aily/v1/apps/{app_id}/data_assets/upload_file': {
    POST: { name: 'aily.app.dataAsset.uploadFile', multipart: true },
  },
  '/aily/v1/apps/{app_id}/data_assets': {
    POST: 'aily.app.dataAsset.create',
    GET: { name: 'aily.app.dataAsset.list', pagination: { argIndex: 1 } },
  },
  '/aily/v1/apps/{app_id}/data_assets/{data_asset_id}': {
    GET: 'aily.app.dataAsset.get',
    DELETE: 'aily.app.dataAsset.delete',
  },
  '/aily/v1/apps/{app_id}/data_asset_tags': {
    GET: { name: 'aily.app.dataAssetTag.list', pagination: { argIndex: 1 } },
  },
})
