import { Lark, MessageContent } from '..'

export * from './content'

declare module '../event' {
  export interface Events {
    /**
     * Receive message event.
     * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/receive
     */
    'im.message.receive_v1': {
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
        message_type: keyof MessageContent
        content: string
        mentions: {
          key: string
          id: Lark.UserIds
          name: string
          tenant_key: string
        }[]
      }
    }
    /**
     * Message read event.
     * @see https://open.larksuite.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/message_read
     */
    'im.message.message_read_v1': {
      reader: {
        reader_id: Lark.UserIds
        read_time: string
        tenant_key: string
      }
      message_id_list: string[]
    }
    /**
     * Message card callback event.
     * @see https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/card-callback-communication
     */
    'card.action.trigger': {
      operator: {
        tenant_key: string
        user_id: string
        union_id: string
        open_id: string
      }
      token: string
      action: {
        value: any
        tag: string
        timezone?: string
        name?: string
        form_value?: any
        input_value?: string
        option?: string
        options?: string[]
        checked?: boolean
      }
      host: string
      /** 卡片分发类型，固定取值为 url_preview，表示链接预览卡片。仅链接预览卡片有此字段。 */
      delivery_type?: 'url_preview'
      context: {
        url?: string
        preview_token?: string
        open_message_id: string
        open_chat_id: string
      }
    }
    /**
     * 机器人自定义菜单事件
     * @see https://open.feishu.cn/document/client-docs/bot-v3/events/menu
     */
    'application.bot.menu_v6': {
      operator: {
        operator_name: string
        operator_id: {
          union_id: string
          user_id: string
          open_id: string
        }
      }
      event_key: string
      timestamp: number
    }
  }
}
