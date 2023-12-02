import { Quester } from '@satorijs/satori'
import * as QQ from '../types'

export class GroupInternal {
  constructor(private http: () => Quester) { }

  async sendPrivateMessage(openid: string, data: QQ.Message.Request) {
    return this.http().post<{
      sendResult: {
        msg_id: string
        err_msg: string
        index: string
      }
      // id: string
      // timestamp: number
    }>(`/v2/users/${openid}/messages`, data)
  }

  async sendMessage(group_openid: string, data: QQ.Message.Request) {
    return this.http().post<{
      group_code: string
      msg: string
    } & {
      code: number
      message: string
      data: any
    }>(`/v2/groups/${group_openid}/messages`, data)
  }

  async sendFilePrivate(openid: string, data: QQ.Message.File.Request) {
    return this.http().post<QQ.Message.File.Response>(`/v2/users/${openid}/files`, data)
  }

  async sendFileGuild(group_openid: string, data: QQ.Message.File.Request) {
    return this.http().post<QQ.Message.File.Response>(`/v2/groups/${group_openid}/files`, data)
  }

  // @TODO enum
  async acknowledgeInteraction(interaction_id: string, code: number) {
    return this.http().put(`/interactions/${interaction_id}`, {
      code,
    })
  }

  // async getGuildMembers(group_openid: string, start_index: 0) {
  //   return this.http().get<{
  //     members: {
  //       member_openid: string
  //       join_timestamp: number
  //     }[]
  //     next_index: number
  //   }>(`/v2/groups/${group_openid}/members`, {
  //     params: {
  //       limit: 500,
  //       start_index,
  //     },
  //   })
  // }
}
