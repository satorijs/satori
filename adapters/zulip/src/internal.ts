import { Quester } from '@satorijs/satori'

export class Internal {
  constructor(public http: Quester) { }

  async register() {
    const response = await this.http.post<{
      queue_id: string
    }>('/api/v1/register', {
      fetch_event_types: `["message"]`,
    })
    return response
  }

  async events(params: {
    queue_id: string
    last_event_id: number
  }) {
    return this.http.get('/api/v1/events', {
      params,
      timeout: 60000,
    })
  }

  getOwnUser() {
    return this.http.get('/api/v1/users/me')
  }

  getMessage(id: string) {
    return this.http.get(`/api/v1/messages/${id}`)
  }
}
