import { Context, Dict, HTTP } from '@satorijs/core'

import { HeychatBot } from './bot'

export interface Internal {}

export class Internal<C extends Context = Context> {
  constructor(private bot: HeychatBot<C>) {}

  static define(routes: Dict<Partial<Record<HTTP.Method, string>>>) {}
}
