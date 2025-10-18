import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    opticalCharRecognition: OpticalCharRecognition.Methods
  }
}

export namespace OpticalCharRecognition {
  export interface Methods {
    image: Image.Methods
  }

  export namespace Image {
    export interface Methods {
      /**
       * 识别图片中的文字
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/optical_char_recognition-v1/image/basic_recognize
       */
      basicRecognize(body: BasicRecognizeRequest): Promise<BasicRecognizeResponse>
    }

    export interface BasicRecognizeRequest {
      /** base64 后的图片数据 */
      image?: string
    }

    export interface BasicRecognizeResponse {
      /** 按区域识别，返回文本列表 */
      text_list: string[]
    }
  }
}

Internal.define({
  '/optical_char_recognition/v1/image/basic_recognize': {
    POST: 'opticalCharRecognition.image.basicRecognize',
  },
})
