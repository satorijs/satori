import { Adapter } from '@satorijs/core'
import { Schema } from '@satorijs/env-node'
import { QQGuildBot } from './bot'

export class WsClient extends Adapter<QQGuildBot> {
  async start(bot: QQGuildBot) {
    Object.assign(bot, await bot.getSelf())
    await bot.internal.startClient(bot.config.intents)
    bot.internal.on('ready', bot.online.bind(bot))
    bot.internal.on('message', msg => {
      const session = bot.adaptMessage(msg)
      if (session) bot.dispatch(session)
    })
  }

  async stop(bot: QQGuildBot) {
    bot.internal.stopClient()
    bot.offline()
  }
}

export namespace WsClient {
  export interface Config extends Adapter.WsClient.Config {}

  export const Config: Schema<Config> = Schema.intersect([
    Adapter.WsClient.Config,
  ])
}
