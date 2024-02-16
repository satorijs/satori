import { Quester } from '@satorijs/satori'
import { SendMessage } from './types'

interface PhoneNumber {
  verified_name: string
  code_verification_status: string
  display_phone_number: string
  quality_rating: string
  id: string
}

export class Internal {
  constructor(public http: Quester) { }

  async getPhoneNumbers(id: string) {
    // https://developers.facebook.com/docs/whatsapp/business-management-api/manage-phone-numbers#all-phone-numbers
    const { data } = await this.http.get<{ data: PhoneNumber[] }>(`/${id}/phone_numbers`)
    return data
  }

  async messageReaction(selfId: string, channelId: string, messageId: string, emoji: string) {
    // https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#reaction-messages
    await this.http.post(`/${selfId}/messages`, {
      messaging_product: 'whatsapp',
      to: channelId,
      recipient_type: 'individual',
      type: 'reaction',
      reaction: {
        message_id: messageId,
        emoji,
      },
    })
  }

  async sendMessage(selfId: string, data: SendMessage) {
    const response = await this.http.post<{
      messages: { id: string }[]
    }>(`/${selfId}/messages`, data)
    return response
  }

  getMedia(mediaId: string) {
    return this.http.get<{ url: string }>('/' + mediaId)
  }

  uploadMedia(selfId: string, form: FormData) {
    return this.http.post<{ id: string }>(`/${selfId}/media`, form)
  }
}
