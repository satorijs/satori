import { remove } from 'cosmokit'
import { Context } from '.'
import { Bot } from './bot'

export abstract class Adapter<T extends Bot = Bot> {
  static reusable = true
  abstract start(bot: T): Promise<void>
  abstract stop(bot: T): Promise<void>
}

export namespace Adapter {
  export abstract class Client<T extends Bot = Bot> extends Adapter<T> {
    constructor(protected ctx: Context, protected bot: T) {
      super()
    }
  }

  export abstract class Server<T extends Bot = Bot> extends Adapter<T> {
    protected bots: T[] = []

    fork(ctx: Context, bot: T) {
      this.bots.push(bot)
      ctx.on('dispose', () => {
        remove(this.bots, bot)
      })
    }
  }
}
