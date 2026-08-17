import { Bot, Context } from '@satorijs/core'

import { Internal } from './internal'

export class HeychatBot<C extends Context = Context> extends Bot<C, HeychatBot.Config> {
  constructor(ctx: C, config: HeychatBot.Config) {
    super(ctx, config, 'heychat')

    this.internal = new Internal(this)
  }
}

export namespace HeychatBot {
  export interface Config {}
}
