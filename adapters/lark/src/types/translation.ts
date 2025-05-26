import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    translation: Translation.Methods
  }
}

export namespace Translation {
  export interface Methods {
    text: Text.Methods
  }

  export namespace Text {
    export interface Methods {
      /**
       * 识别文本语种
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/detect
       */
      detect(body: DetectRequest): Promise<DetectResponse>
      /**
       * 翻译文本
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/translate
       */
      translate(body: TranslateRequest): Promise<TranslateResponse>
    }

    export interface DetectRequest {
      /** 需要被识别语种的文本 */
      text: string
    }

    export interface DetectResponse {
      /** 识别的文本语种，返回符合  ISO 693-1 标准 */
      language: string
    }

    export interface TranslateRequest {
      /** 源语言 */
      source_language: string
      /** 源文本 */
      text: string
      /** 目标语言 */
      target_language: string
      /** 请求级术语表，携带术语，仅在本次翻译中生效（最多能携带 128个术语词） */
      glossary?: Lark.Term[]
    }

    export interface TranslateResponse {
      /** 翻译后的文本 */
      text: string
    }
  }
}

Internal.define({
  '/translation/v1/text/detect': {
    POST: 'translation.text.detect',
  },
  '/translation/v1/text/translate': {
    POST: 'translation.text.translate',
  },
})
