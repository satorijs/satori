import { Adapter } from '@satorijs/satori'
import { RocketChatBot } from './bot'
import { decodeMessage } from './utils'

export class WsServer extends Adapter.WsClient<RocketChatBot> {
  async prepare() {
    const endpoint = `wss://${this.bot.config.host}/websocket`
    return this.bot.http.ws(endpoint)
  }

  accept() {
    let loginQuery
    this.bot.socket.addEventListener('message', async ({ data }) => {
      const parsed = JSON.parse(data.toString())
      this.bot.logger.debug(require('util').inspect(parsed, false, null, true))
      if (parsed.msg === 'ping') {
        this.bot.socket.send(JSON.stringify({
          msg: 'pong',
        }))
      } else if (parsed.msg === 'connected') {
        await this.bot.initliaze()
        loginQuery = this.bot.callMethod('login', [
          {
            resume: this.bot.token,
          },
        ])
      } else if (parsed.msg === 'result' && parsed.id === loginQuery) {
        this.bot.online()
        const rooms = await this.bot.internal.getRooms()
        for (const room of rooms) {
          this.bot.logger.debug('subscribe to room: %s', room._id)
          this.bot.subscribe('stream-room-messages', [
            room._id,
            false,
          ])
        }
      } else if (parsed.msg === 'changed' && parsed.collection === 'stream-room-messages') {
        const message = parsed.fields.args[0]
        if (message.u._id === this.bot.selfId) return
        const session = await decodeMessage(this.bot, message)
        if (session) this.bot.dispatch(session)
        this.bot.logger.debug(require('util').inspect(session, false, 3, true))
      }
    })
    this.bot.socket.send(JSON.stringify({
      'msg': 'connect',
      'version': '1',
      'support': ['1'],
    }))
  }
}
