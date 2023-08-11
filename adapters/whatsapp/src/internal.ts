import { Quester } from '@satorijs/satori'

interface PhoneNumber {
  verified_name: string
  code_verification_status: string
  display_phone_number: string
  quality_rating: string
  id: string
}

export class Internal {
  constructor(public http: Quester) {}

  async getPhoneNumbers(id: string) {
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
}
