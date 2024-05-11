import { Adapter, Context, Schema, Time, Universal } from '@satorijs/core'
import { ZulipBot } from './bot'
import { adaptSession } from './utils'

export class HttpPolling<C extends Context = Context> extends Adapter<C, ZulipBot<C>> {
  static reusable = true

  private timeout: NodeJS.Timeout

  async connect(bot: ZulipBot) {
    await bot.getLogin()
    const r = await bot.internal.registerQueue({
      // event_types: `["message"]`,
    })
    let last = -1
    let _retryCount = 0
    bot.online()
    const { retryTimes, retryInterval } = bot.config
    const polling = async () => {
      try {
        const updates = await bot.internal.getEvents({
          queue_id: r.queue_id,
          last_event_id: last,
        })
        if (!bot.isActive) {
          return bot.offline()
        }
        bot.online()
        _retryCount = 0
        for (const e of updates.events) {
          bot.logger.debug('[receive] %o', e)

          last = Math.max(last, e.id)
          const session = await adaptSession(bot, e)

          if (session) bot.dispatch(session)
          bot.logger.debug('[session] %o', session)
        }
        setTimeout(polling, 0)
      } catch (e) {
        if (!this.ctx.http.isError(e) || !e.response?.data) {
          bot.logger.warn('failed to get updates. reason: %s', e.stack)
        } else {
          bot.logger.error(e.stack)
        }
        if (_retryCount > retryTimes) {
          bot.error = e
          return bot.status = Universal.Status.OFFLINE
        }
        _retryCount++
        bot.status = Universal.Status.RECONNECT
        this.timeout = setTimeout(() => polling(), retryInterval)
      }
    }
    polling()
    bot.logger.debug('listening updates %c', bot.sid)
  }

  async disconnect(bot: ZulipBot) {
    clearTimeout(this.timeout)
  }
}

export namespace HttpPolling {
  export interface Options {
    protocol: 'polling'
    // pollingTimeout?: number
    retryTimes?: number
    retryInterval?: number
  }

  export const Options: Schema<Options> = Schema.object({
    protocol: Schema.const('polling').required(process.env.KOISHI_ENV !== 'browser'),
    // pollingTimeout: Schema.natural().role('ms').default(Time.second * 25).description('通过长轮询获取更新时请求的超时 (单位为毫秒)。'),
    retryTimes: Schema.natural().description('连接时的最大重试次数。').default(6),
    retryInterval: Schema.natural().role('ms').default(Time.second * 5).description('长轮询断开后的重试时间间隔 (单位为毫秒)。'),
  })
}
