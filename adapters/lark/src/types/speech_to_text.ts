import { FileConfig, Speech, StreamConfig } from '.'
import { Internal } from '../internal'

declare module '../internal' {
  interface Internal {
    /**
     * 识别语音文件
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/file_recognize
     */
    fileRecognizeSpeechToTextSpeech(body: FileRecognizeSpeechToTextSpeechRequest): Promise<FileRecognizeSpeechToTextSpeechResponse>
    /**
     * 识别流式语音
     * @see https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/speech_to_text-v1/speech/stream_recognize
     */
    streamRecognizeSpeechToTextSpeech(body: StreamRecognizeSpeechToTextSpeechRequest): Promise<StreamRecognizeSpeechToTextSpeechResponse>
  }
}

export interface FileRecognizeSpeechToTextSpeechRequest {
  /** 语音资源 */
  speech: Speech
  /** 配置属性 */
  config: FileConfig
}

export interface StreamRecognizeSpeechToTextSpeechRequest {
  /** 语音资源 */
  speech: Speech
  /** 配置属性 */
  config: StreamConfig
}

export interface FileRecognizeSpeechToTextSpeechResponse {
  /** 语音识别后的文本信息 */
  recognition_text: string
}

export interface StreamRecognizeSpeechToTextSpeechResponse {
  /** 16 位 String 随机串作为同一数据流的标识 */
  stream_id: string
  /** 数据流分片的序号，序号从 0 开始，每次请求递增 1 */
  sequence_id: number
  /** 语音流识别后的文本信息 */
  recognition_text: string
}

Internal.define({
  '/open-apis/speech_to_text/v1/speech/file_recognize': {
    POST: 'fileRecognizeSpeechToTextSpeech',
  },
  '/open-apis/speech_to_text/v1/speech/stream_recognize': {
    POST: 'streamRecognizeSpeechToTextSpeech',
  },
})
