import { Quester } from '@satorijs/satori'
import { DMS, Message, User } from './types'

export class Internal {
  constructor(private http: Quester) { }

  async getMe() {
    return this.http.get<User>('/users/@me')
  }

  /** https://bot.q.qq.com/wiki/develop/api/openapi/dms/post_dms.html */
  async createDMS(recipient_id: string, source_guild_id: string) {
    return this.http.post<DMS>('/users/@me/dms', {
      recipient_id, source_guild_id,
    })
  }

  async getMessage(channelId: string, messageId: string) {
    const { message } = await this.http.get<{
      message: Message
    }>(`/channels/${channelId}/messages/${messageId}`)
    return message
  }
}
