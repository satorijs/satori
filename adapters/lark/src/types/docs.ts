import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    docs: Docs.Methods
  }
}

export namespace Docs {
  export interface Methods {
    content: Content.Methods
  }

  export namespace Content {
    export interface Methods {
      /**
       * 获取云文档内容
       * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/docs-v1/content/get
       */
      get(query?: GetQuery): Promise<GetResponse>
    }

    export interface GetQuery {
      /** 文档唯一标识 */
      doc_token: string
      /** 文档类型 */
      doc_type: 'docx'
      /** 内容类型 */
      content_type: 'markdown'
      /** 语言 */
      lang?: 'zh' | 'en' | 'ja'
    }

    export interface GetResponse {
      /** 内容 */
      content?: string
    }
  }
}

Internal.define({
  '/docs/v1/content': {
    GET: 'docs.content.get',
  },
})
