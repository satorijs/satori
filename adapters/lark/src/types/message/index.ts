import { Internal, Lark } from '..'
import { Paginated, Pagination } from '../utils'

import { MessageContent } from './content'

export * from './content'
export * from './asset'

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

export interface Sender extends Lark.UserIdentifiers {
  sender_type: string
  tenant_key: string
}
export interface Mention extends Lark.UserIdentifiers {
  key: string
  name: string
  tenant_key: string
}

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
      message: {
        message_id: string
        root_id: string
        parent_id: string
        create_time: string
        chat_id: string
        chat_type: string
        message_type: MessageType
        content: string
        mentions: {
          key: string
          id: Lark.UserIds
          name: string
          tenant_key: string
        }[]
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

export interface MessagePayload {
  receive_id: string
  content: string
  msg_type: string
}

export interface Message {
  /**
   * The id of current message
   *
   * Should be started with `om_`
   */
  message_id: string
  /**
   * The id of the *root* message in reply chains
   * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2
   */
  root_id: string

  /**
   * The id of the direct *parent* message in reply chains
   * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#ac79c1c2
   */
  parent_id: string

  /**
   * The message type.
   * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json
   */
  msg_type: MessageType

  /**
   * The timestamp when the message is created in milliseconds.
   */
  create_time: string

  /**
   * The timestamp when the message is last updated in milliseconds.
   */
  update_time: string

  /**
   * Whether the message is deleted.
   */
  deleted: boolean

  /**
   * Whether the message is updated.
   */
  updated: boolean

  /**
   * The id of the group / channel the message is sent to.
   */
  chat_id: string

  /**
   * The sender of the message.
   * Can be a user or an app.
   */
  sender: Sender

  /**
   * The body of the message.
   */
  body: {
    /**
     * The content of the message.
     * Should be a string that represents the JSON object contains the message content.
     */
    content: string
  }

  /**
   * Users mentioned in the message.
   */
  mentions: Mention[]

  /**
   * The id of the direct *parent* message in `merge and repost` chains.
   */
  upper_message_id: string
}

export interface ReadUser {
  user_id_type: Lark.UserIdType
  user_id: string
  timestamp: string
  tenant_key: string
}

export interface GetMessageListParams {
  /**
   * Currently there is only 'chat' available
   * @see https://open.larksuite.com/document/server-docs/im-v1/message/list
   */
  container_id_type: 'p2p' | 'chat'
  /**
   * Should be in the format like `oc_234jsi43d3ssi993d43545f`
   */
  container_id: string
  /** Timestamp in seconds */
  start_time?: string | number
  /** Timestamp in seconds */
  end_time?: string | number
  /** @default 'ByCreateTimeAsc' */
  sort_type?: 'ByCreateTimeAsc' | 'ByCreateTimeDesc'
  /** Range from 1 to 50 */
  page_size?: number
  /**
   * If the current page is the first page, this field should be omitted.
   * Otherwise you could use the `page_token` from the previous response to
   * get the next page.
   */
  page_token?: string
}

declare module '../internal' {
  export interface Internal {
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create */
    sendMessage(receive_id_type: Lark.ReceiveIdType, message: MessagePayload): Promise<BaseResponse & { data: Message }>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/reply */
    replyMessage(message_id: string, message: MessagePayload): Promise<BaseResponse & { data: Message }>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/update */
    updateMessage(message_id: string, message: Omit<MessagePayload, 'receive_id'>): Promise<BaseResponse & { data: Message }>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/get */
    getMessage(message_id: string): Promise<BaseResponse & { data: Message }>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/delete */
    deleteMessage(message_id: string): Promise<BaseResponse>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/forward */
    forwardMessage(
      message_id: string,
      receive_id_type: Lark.ReceiveIdType,
      data: { receive_id: string },
    ): Promise<BaseResponse & { data: Message }>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/merge_forward */
    mergeForwardMessage(
      receive_id_type: Lark.ReceiveIdType,
      data: { receive_id: string; message_id_list: string[] },
    ): Promise<BaseResponse & { data: { message: Message; invalid_message_id_list: string[] }}>
    /** @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/read_users */
    getMessageReadUsers(message_id: string, params: Pagination<{ user_id_type: Lark.UserIdType }>): Promise<BaseResponse & { data: Paginated<ReadUser> }>
    /** @see https://open.larksuite.com/document/server-docs/im-v1/message/list */
    getMessageList(params: GetMessageListParams): Promise<BaseResponse & { data: Paginated<Message> }>
  }
}

Internal.define({
  '/im/v1/messages': {
    GET: 'getMessageList',
  },
  '/im/v1/messages?receive_id_type={receive_id_type}': {
    POST: 'sendMessage',
  },
  '/im/v1/messages/{message_id}/reply': {
    POST: 'replyMessage',
  },
  '/im/v1/messages/{message_id}': {
    GET: 'getMessage',
    PUT: 'updateMessage',
    DELETE: 'deleteMessage',
  },
  '/im/v1/messages/{message_id}/read_users': {
    GET: 'getMessageReadUsers',
  },
  '/im/v1/messages/{message_id}/forward?receive_id_type={receive_id_type}': {
    POST: 'forwardMessage',
  },
  '/im/v1/messages/merge_forward?receive_id_type={receive_id_type}': {
    POST: 'mergeForwardMessage',
  },
})
