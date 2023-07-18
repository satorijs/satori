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
  messages: {
    from: string
    id: string
    timestamp: string
    type: string
    text: {
      body: string
    }
  }[]
}

export interface SendMessageBase {
  messaging_product: 'whatsapp'
  recipient_type: 'individual'
  to: string
}

export type SendMessage = SendTextMessage | SendMediaMessage<'image'> | SendMediaMessage<'audio'> | SendMediaMessage<'video'> | SendMediaMessage<'document'>

export interface SendTextMessage extends SendMessageBase {
  type: 'text'
  text: {
    body: string
  }
}
export type MediaType = 'image' | 'audio' | 'video' | 'document'

type MediaDetail = { id: string; link: string }

interface Media {
  image?: MediaDetail
  audio?: MediaDetail
  video?: MediaDetail
  document?: MediaDetail
}

export interface SendMediaMessage<T extends MediaType> extends SendMessageBase, Media {
  type: T
}
