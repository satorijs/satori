import { Quester } from '@satorijs/satori'

export class Internal {
  constructor(public http: Quester) { }

  /** https://developer.rocket.chat/reference/api/realtime-api/method-calls/authentication/login */
  async login(user: string, password: string) {
    const { data } = await this.http.post('/api/v1/login', {
      user, password,
    })
    return data
  }

  /** https://developer.rocket.chat/reference/api/rest-api/endpoints/statistics/stats-endpoints/get-statistics */
  async statistics() {
    const { data } = await this.http.get('/api/v1/statistics')
    return data
  }

  /** https://developer.rocket.chat/reference/api/rest-api/endpoints/rooms/rooms-endpoints/get-rooms */
  async getRooms() {
    const { update } = await this.http.get('/api/v1/rooms.get')
    return update
  }
}
