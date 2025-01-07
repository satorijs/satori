import { Term } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 识别文本语种
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/detect
     */
    detectTranslationText(body: DetectTranslationTextRequest): Promise<DetectTranslationTextResponse>
    /**
     * 翻译文本
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/translate
     */
    translateTranslationText(body: TranslateTranslationTextRequest): Promise<TranslateTranslationTextResponse>
  }
}

export interface DetectTranslationTextRequest {
  /** 需要被识别语种的文本 */
  text: string
}

export interface TranslateTranslationTextRequest {
  /** 源语言 */
  source_language: string
  /** 源文本 */
  text: string
  /** 目标语言 */
  target_language: string
  /** 请求级术语表，携带术语，仅在本次翻译中生效（最多能携带 128个术语词） */
  glossary?: Term[]
}

export interface DetectTranslationTextResponse {
  /** 识别的文本语种，返回符合  ISO 693-1 标准 */
  language: string
}

export interface TranslateTranslationTextResponse {
  /** 翻译后的文本 */
  text: string
}

Internal.define({
  '/translation/v1/text/detect': {
    POST: 'detectTranslationText',
  },
  '/translation/v1/text/translate': {
    POST: 'translateTranslationText',
  },
})
