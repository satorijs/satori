import { Adapter, Context } from '@satorijs/core'
import { Response } from '@cordisjs/plugin-server'
import { MatrixBot } from './bot'
import { dispatchSession } from './utils'
import { ClientEvent, M_ROOM_MEMBER } from './types'

export class HttpAdapter<C extends Context = Context> extends Adapter<C, MatrixBot<C>> {
  static inject = ['server']

  private txnId: string = null

  constructor(ctx: C) {
    super(ctx)
    ctx.server.all('/*path', async (req, res, next) => {
      const reqPath = '/' + req.params.path
      const match = this.bots.filter(bot => reqPath.startsWith(bot.config.path + '/'))
      if (match.length === 0) return next()
      //                                            Bearer
      const asToken = req.headers.get('authorization')?.substring(7) || req.query.get('access_token')
      if (!asToken) return next()
      const bots = match.filter(bot => bot.config.hsToken === asToken)
      if (!bots.length) {
        res.status = 403
        res.headers.set('content-type', 'application/json')
        res.body = JSON.stringify({ errcode: 'M_FORBIDDEN' })
        return
      }
      const trimmed = reqPath.substring(bots[0].config.path.length)
      const path = trimmed.startsWith('/_matrix/app/v1/') ? trimmed.substring(15) : trimmed
      if (req.method === 'PUT' && path.startsWith('/transactions/')) {
        const txnId = path.substring(14)
        const body = await req.json()
        this.transactions(body, res, bots, txnId)
      } else if (req.method === 'GET' && path.startsWith('/users/')) {
        const user = path.substring(7)
        this.users(res, bots, user)
      } else if (req.method === 'GET' && path.startsWith('/rooms/')) {
        const room = path.substring(7)
        this.rooms(res, bots, room)
      } else {
        res.status = 404
      }
    })
  }

  async connect(bot: MatrixBot): Promise<void> {
    try {
      await bot.initialize()
      bot.online()
    } catch (e) {
      bot.logger.error('failed to initialize', e)
      throw e
    }
  }

  private transactions(body: any, res: Response, bots: MatrixBot[], txnId: string) {
    const events = body.events as ClientEvent[]
    res.headers.set('content-type', 'application/json')
    res.body = JSON.stringify({})
    if (txnId === this.txnId) return
    this.txnId = txnId
    for (const event of events) {
      const inRoom = bots.filter(bot => bot.userId !== event.sender && bot.rooms.includes(event.room_id))
      let bot: MatrixBot
      if (event.type === 'm.room.member'
        && (event.content as M_ROOM_MEMBER).membership === 'invite'
        && (bot = bots.find(bot => bot.userId === event.state_key))
        && !inRoom.includes(bot)) {
        inRoom.push(bot)
      }
      inRoom.forEach(bot => dispatchSession(bot, event))
    }
  }

  private users(res: Response, bots: MatrixBot[], userId: string) {
    if (!bots.find(bot => bot.userId === userId)) {
      res.status = 404
      res.headers.set('content-type', 'application/json')
      res.body = JSON.stringify({ 'errcode': 'CHAT.SATORI.NOT_FOUND' })
      return
    }
    res.headers.set('content-type', 'application/json')
    res.body = JSON.stringify({})
  }

  private rooms(res: Response, bots: MatrixBot[], room: string) {
    res.status = 404
    res.headers.set('content-type', 'application/json')
    res.body = JSON.stringify({ 'errcode': 'CHAT.SATORI.NOT_FOUND' })
  }
}
