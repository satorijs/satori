import { Adapter, Quester, Schema, Time } from '@satorijs/satori'
import { ZulipBot } from './bot'
import { adaptSession } from './utils'

export class HttpPolling extends Adapter.Client<ZulipBot> {
  async start(bot: ZulipBot) {
    await bot.initliaze()
    const r = await bot.internal.registerQueue({
      // event_types: `["message"]`,
    })
    let last = -1
    let _retryCount = 0
    bot.online()
    const { retryTimes, retryInterval } = bot.config
    const polling = async () => {
      if (bot.status === 'disconnect') {
        return bot.offline()
      }
      try {
        const updates = await bot.internal.getEvents({
          queue_id: r.queue_id,
          last_event_id: last,
        })
        bot.online()
        _retryCount = 0
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
        if (_retryCount > retryTimes) {
          bot.error = e
          return bot.status = 'offline'
        }
        _retryCount++
        bot.status = 'reconnect'
        setTimeout(() => polling(), retryInterval)
      }
    }
    polling()
    bot.logger.debug('listening updates %c', bot.sid)
  }
}

export namespace HttpPolling {
  export interface Config {
    protocol: 'polling'
    // pollingTimeout?: number
    retryTimes?: number
    retryInterval?: number
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('polling').required(process.env.KOISHI_ENV !== 'browser'),
    // pollingTimeout: Schema.natural().role('ms').default(Time.second * 25).description('通过长轮询获取更新时请求的超时 (单位为毫秒)。'),
    retryTimes: Schema.natural().description('连接时的最大重试次数。').default(6),
    retryInterval: Schema.natural().role('ms').default(Time.second * 5).description('长轮询断开后的重试时间间隔 (单位为毫秒)。'),
  })
}
