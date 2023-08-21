import { Adapter, Quester } from '@satorijs/satori'
import { ZulipBot } from './bot'
import { adaptSession } from './utils'

export class HttpPolling extends Adapter.Client<ZulipBot> {
  async start(bot: ZulipBot) {
    await bot.initliaze()
    const r = await bot.internal.registerQueue({
      // event_types: `["message"]`,
    })
    let last = -1
    const polling = async () => {
      if (bot.status === 'disconnect') {
        return bot.offline()
      }
      try {
        const updates = await bot.internal.getEvents({
          queue_id: r.queue_id,
          last_event_id: last,
        })
        for (const e of updates.events) {
          bot.logger.debug(require('util').inspect(e, false, null, true))

          last = Math.max(last, e.id)
          const session = await adaptSession(bot, e)

          if (session) bot.dispatch(session)
          bot.logger.debug(require('util').inspect(session, false, null, true))
        }
        setTimeout(polling, 0)
      } catch (e) {
        if (!Quester.isAxiosError(e) || !e.response?.data) {
          bot.logger.warn('failed to get updates. reason: %s', e.stack)
        } else {
          bot.logger.error(e.stack)
        }
      }
    }
    polling()
    bot.logger.debug('listening updates %c', bot.sid)
  }
}
