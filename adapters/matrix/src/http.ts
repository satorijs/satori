import { Adapter, Context, Logger } from '@satorijs/satori'
import { Context as KoaContext } from 'koa'
import { MatrixBot } from './bot'
import { dispatchSession } from './utils'
import { ClientEvent, M_ROOM_MEMBER } from './types'

declare module 'koa' {
  interface Context {
    bots: MatrixBot[]
  }
}

const logger = new Logger('matrix')

export class HttpAdapter extends Adapter.Server<MatrixBot> {
  private txnId: string = null

  hook(callback: (ctx: KoaContext) => void) {
    return (ctx: KoaContext) => {
      const bots = this.bots.filter(bot => (bot instanceof MatrixBot) && (bot.config.hsToken === ctx.query.access_token))
      if (!bots.length) {
        ctx.status = 403
        ctx.body = { errcode: 'M_FORBIDDEN' }
        return
      }
      ctx.bots = bots
      callback.call(this, ctx)
    }
  }

  public constructor(ctx: Context) {
    super()
    const put = (path: string, callback: (ctx: KoaContext) => void) => {
      ctx.router.put(path, this.hook(callback).bind(this))
      ctx.router.put('/_matrix/app/v1' + path, this.hook(callback).bind(this))
    }
    const get = (path: string, callback: (ctx: KoaContext) => void) => {
      ctx.router.get(path, this.hook(callback).bind(this))
      ctx.router.get('/_matrix/app/v1' + path, this.hook(callback).bind(this))
    }
    put('/transactions/:txnId', this.transactions)
    get('/users/:userId', this.users)
    get('/room/:roomAlias', this.rooms)
  }

  async start(bot: MatrixBot): Promise<void> {
    try {
      await bot.initialize()
      bot.online()
    } catch (e) {
      logger.error('failed to initialize', e)
      throw e
    }
  }

  private transactions(ctx: KoaContext) {
    const { txnId } = ctx.params
    const events = ctx.request.body.events as ClientEvent[]
    ctx.body = {}
    if (txnId === this.txnId) return
    this.txnId = txnId
    for (const event of events) {
      const bots = ctx.bots
        .filter(bot => bot.userId !== event.sender && bot.rooms.includes(event.room_id))
      let bot: MatrixBot
      if (event.type === 'm.room.member'
        && (event.content as M_ROOM_MEMBER).membership === 'invite'
        && (bot = ctx.bots.find(bot => bot.userId === event.state_key))
        && !bots.includes(bot)) {
        bots.push(bot)
      }
      bots.forEach(bot => dispatchSession(bot, event))
    }
  }

  private users(ctx: KoaContext) {
    const { userId } = ctx.params
    if (!ctx.bots.find(bot => bot.userId === userId)) {
      ctx.status = 404
      ctx.body = { 'errcode': 'CHAT.SATORI.NOT_FOUND' }
      return
    }
    ctx.body = {}
  }

  private rooms(ctx: KoaContext) {
    ctx.status = 404
    ctx.body = { 'errcode': 'CHAT.SATORI.NOT_FOUND' }
  }
}
