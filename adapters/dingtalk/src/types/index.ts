export type AtUser = {
  dingtalkId: string
  staffId?: string // 企业内部群有的发送者在企业内的userid
}

export type DingtalkRequestBase = {
  msgtype: string // 消息类型
  msgId: string // 加密的消息ID
  createAt: string // 消息的时间戳，单位毫秒
  conversationType: string // 1：单聊 2：群聊
  conversationId: string // 会话ID
  conversationTitle?: string // 群聊时才有的会话标题
  senderId: string // 加密的发送者ID
  senderNick: string // 发送者昵称
  senderCorpId?: string // 企业内部群有的发送者当前群的企业corpId
  sessionWebhook: string // 当前会话的Webhook地址
  sessionWebhookExpiredTime: number // 当前会话的Webhook地址过期时间
  isAdmin?: boolean // 是否为管理员
  chatbotCorpId?: string // 加密的机器人所在的企业corpId
  isInAtList?: boolean // 是否在@列表中
  senderStaffId?: string // 企业内部群中@该机器人的成员userid
  chatbotUserId: string // 加密的机器人ID
  atUsers?: AtUser[] // 被@人的信息
  robotCode: string
}

export type Message = TextMessage | RichTextMessage

export interface TextMessage extends DingtalkRequestBase {
  msgtype: 'text'
  text: {
    content: string
  }
}

export interface PictureMessage extends DingtalkRequestBase {
  msgtype: 'picture'
  content: {
    downloadCode: string
  }
}

export interface RichTextMessage extends DingtalkRequestBase {
  msgtype: 'richText'
  content: {
    richText: ({
      text: string
    } & {
      pictureDownloadCode: string
      downloadCode: string
      type: 'picture'
    })[]
  }
}

// https://open.dingtalk.com/document/orgapp/types-of-messages-sent-by-robots
export interface SendMessageData {
  sampleText: { content: string }
  sampleMarkdown: {
    title?: string
    text: string
  }
  sampleImageMsg: {
    photoURL: string
  }
  sampleLink: {
    text: string
    title: string
    picUrl: string
    messageUrl: string
  }
  sampleAudio: {
    mediaId: string
    duration: string
  }
  sampleFile: {
    mediaId: string
    fileName: string
    fileType: string
  }
  sampleVideo: {
    duration: string
    videoMediaId: string
    videoType: string
    picMediaId: string
  }
}
