export interface WebhookBody {
  object: string
  entry: Entry[]
}

export interface Entry {
  id: string
  time: number
  uid: string
  changes: Change[]
}

export interface Change {
  field: 'messages'
  value: MessageValue
}

export interface MessageValue {
  messaging_product: string
  metadata: {
    display_phone_number: string
    phone_number_id: string
  }
  contacts: {
    profile: {
      name: string
    }
    wa_id: string
  }[]
  messages: MessageBody[]
}

export interface MessageBodyBase {
  from: string
  id: string
  timestamp: string
  context?: {
    from: string
    id: string
  }
}

export interface ReceivedMedia {
  filename?: string
  caption?: string
  mime_type: string
  sha256: string
  id: string
  animated?: boolean
}

export interface MessageBodyText extends MessageBodyBase {
  type: 'text'
  text: {
    body: string
  }
}

export interface MessageBodyMedia extends MessageBodyBase {
  type: 'image' | 'audio' | 'video' | 'document'
  image?: ReceivedMedia
  audio?: ReceivedMedia
  video?: ReceivedMedia
  document?: ReceivedMedia
}

export interface MessageBodySticker extends MessageBodyBase {
  type: 'sticker'
  sticker?: ReceivedMedia
}

export interface MessageBodyLocation extends MessageBodyBase {
  type: 'location'
  location: {
    latitude: number
    longitude: number
  }
}

export interface MessageBodyInteractive extends MessageBodyBase {
  type: 'interactive'
  interactive: {
    type: 'button_reply'
    button_reply: {
      id: string
      title: string
    }
  } | {
    type: 'list_reply'
    list_reply: {
      id: string
      title: string
    }
  }
}

export type MessageBody = MessageBodyText | MessageBodyMedia | MessageBodySticker | MessageBodyLocation | MessageBodyInteractive

export interface SendMessageBase {
  messaging_product: 'whatsapp'
  recipient_type: 'individual'
  to: string
}

export type SendMessage =
  SendTextMessage |
  SendMediaMessage<'image'> |
  SendMediaMessage<'audio'> |
  SendMediaMessage<'video'> |
  SendMediaMessage<'document'> |
  SendMediaMessage<'sticker'> |
  SendButtonMessage

export interface SendTextMessage extends SendMessageBase {
  type: 'text'
  text: {
    body: string
  }
}

export interface Button {
  type: "reply"
  title: string
  id: string
}

/** https://developers.facebook.com/docs/whatsapp/on-premises/reference/messages#interactive-object */
export interface SendButtonMessage extends SendMessageBase {
  type: 'button'
  header?: object
  body: {
    text: string
  }
  footer?: {
    text: string
  }
  action: {
    buttons: Button[]
  }
}

export type MediaType = 'image' | 'audio' | 'video' | 'document' | 'sticker'

type MediaDetail = { id?: string; link?: string }

interface Media {
  image?: MediaDetail
  audio?: MediaDetail
  video?: MediaDetail
  document?: MediaDetail
  sticker?: MediaDetail
}

export interface SendMediaMessage<T extends MediaType> extends SendMessageBase, Media {
  type: T
}
