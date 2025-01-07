import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 获取云文档内容
     * @see https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/docs-v1/content/get
     */
    getDocsContent(query?: GetDocsContentQuery): Promise<GetDocsContentResponse>
  }
}

export interface GetDocsContentQuery {
  /** 文档唯一标识 */
  doc_token: string
  /** 文档类型 */
  doc_type: 'docx'
  /** 内容类型 */
  content_type: 'markdown'
  /** 语言 */
  lang?: 'zh' | 'en' | 'ja'
}

export interface GetDocsContentResponse {
  /** 内容 */
  content?: string
}

Internal.define({
  '/docs/v1/content': {
    GET: 'getDocsContent',
  },
})
