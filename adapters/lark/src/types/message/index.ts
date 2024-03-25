import { Lark } from '..'
import { MessageContent } from './content'

export * from './content'

export type MessageType = 'text' | 'post' | 'image' | 'file' | 'audio' | 'media' | 'sticker' | 'interactive' | 'share_chat' | 'share_user'

export interface MessageContentMap {
  'text': MessageContent.Text
  'post': MessageContent.RichText
  'image': MessageContent.Image
  'file': MessageContent.File
  'audio': MessageContent.Audio
  'media': MessageContent.Media
  'sticker': MessageContent.Sticker
  'share_chat': MessageContent.ShareChat
  'share_user': MessageContent.ShareUser
}

export type MessageContentType<T extends MessageType> = T extends keyof MessageContentMap ? MessageContentMap[T] : any

declare module '../event' {
  export interface Events {
    /**
     * Receive message event.
     * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/receive
     */
    'im.message.receive_v1': EventSkeleton<'im.message.receive_v1', {
      sender: {
        sender_id: Lark.UserIds
        sender_type?: string
        tenant_key: string
      }
      message: Lark.Message & {
        chat_type: string
      }
    }>
    /**
     * Message read event.
     * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/message_read
     */
    'im.message.message_read_v1': EventSkeleton<'im.message.message_read_v1', {
      reader: {
        reader_id: Lark.UserIds
        read_time: string
        tenant_key: string
      }
      message_id_list: string[]
    }>
  }
}
