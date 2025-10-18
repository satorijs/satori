import * as Lark from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    speechToText: SpeechToText.Methods
  }
}

export namespace SpeechToText {
  export interface Methods {
    speech: Speech.Methods
  }

  export namespace Speech {
    export interface Methods {
      /**
       * 识别语音文件
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/file_recognize
       */
      fileRecognize(body: FileRecognizeRequest): Promise<FileRecognizeResponse>
      /**
       * 识别流式语音
       * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/stream_recognize
       */
      streamRecognize(body: StreamRecognizeRequest): Promise<StreamRecognizeResponse>
    }

    export interface FileRecognizeRequest {
      /** 语音资源 */
      speech: Lark.Speech
      /** 配置属性 */
      config: Lark.FileConfig
    }

    export interface FileRecognizeResponse {
      /** 语音识别后的文本信息 */
      recognition_text: string
    }

    export interface StreamRecognizeRequest {
      /** 语音资源 */
      speech: Lark.Speech
      /** 配置属性 */
      config: Lark.StreamConfig
    }

    export interface StreamRecognizeResponse {
      /** 16 位 String 随机串作为同一数据流的标识 */
      stream_id: string
      /** 数据流分片的序号，序号从 0 开始，每次请求递增 1 */
      sequence_id: number
      /** 语音流识别后的文本信息 */
      recognition_text: string
    }
  }
}

Internal.define({
  '/speech_to_text/v1/speech/file_recognize': {
    POST: 'speechToText.speech.fileRecognize',
  },
  '/speech_to_text/v1/speech/stream_recognize': {
    POST: 'speechToText.speech.streamRecognize',
  },
})
