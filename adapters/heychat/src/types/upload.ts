import { Internal } from '../internal'
import FormData from 'form-data'

/**
 * 上传媒体文件
 */

declare module '../internal' {
  interface Internal {
    postUpload: (data: FormData) => Promise<void>
  }
}
Internal.define({
  '/upload': {
    POST: 'postUpload',
  },
})
