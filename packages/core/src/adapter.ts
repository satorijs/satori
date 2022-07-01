import { remove } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'

export abstract class Adapter<T extends Bot = Bot> {
  abstract start(bot: T): Promise<void>
  abstract stop(bot: T): Promise<void>
}

export namespace Adapter {
  export abstract class Client<T extends Bot = Bot> extends Adapter<T> {
    protected config: T['config']

    constructor(protected ctx: Context, protected bot: T) {
      super()
      this.config = bot.config
    }
  }

  export abstract class Server<T extends Bot = Bot> extends Adapter<T> {
    protected bots: T[] = []

    constructor(ctx: Context) {
      super()
      ctx.on('fork', (ctx, bot: T) => {
        this.bots.push(bot)
        ctx.on('dispose', () => {
          remove(this.bots, bot)
        })
      })
    }
  }
}
