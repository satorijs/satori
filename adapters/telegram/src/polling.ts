import { Adapter, Context, Schema, Time, Universal } from '@satorijs/core'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'

export class HttpPolling<C extends Context = Context> extends Adapter<C, TelegramBot<C>> {
  static reusable = true

  private offset = 0
  private timeout: NodeJS.Timeout

  async connect(bot: TelegramBot<C, TelegramBot.BaseConfig & HttpPolling.Options>) {
    bot.initialize(async () => {
      let _retryCount = 0
      let _initial = true
      const { retryTimes, retryInterval } = bot.config
      const { url } = await bot.internal.getWebhookInfo()
      if (url) {
        bot.logger.warn('Bot currently has a webhook set up, trying to remove it...')
        await bot.internal.setWebhook({ url: '' })
      }

      // Test connection / init offset with 0 timeout polling
      const previousUpdates = await bot.internal.getUpdates({
        allowed_updates: [],
        timeout: 0,
      })
      previousUpdates.forEach((e) => {
        this.offset = Math.max(this.offset, e.update_id)
      })

      const polling = async () => {
        try {
          const updates = await bot.internal.getUpdates({
            offset: this.offset + 1,
            timeout: Math.ceil(bot.config.pollingTimeout / 1000), // in seconds
          })
          if (!bot.isActive) return
          bot.online()
          _retryCount = 0
          _initial = false

          for (const e of updates) {
            this.offset = Math.max(this.offset, e.update_id)
            handleUpdate(e, bot)
          }
          this.timeout = setTimeout(polling, 0)
        } catch (e) {
          if (!bot.http.isError(e) || !e.response?.data) {
            // Other error
            bot.logger.warn('failed to get updates. reason: %s', e.message)
          } else {
            // Telegram error
            const { error_code, description } = e.response.data as any
            bot.logger.warn('failed to get updates: %c %s', error_code, description)
          }

          if (_initial && _retryCount > retryTimes) {
            bot.error = e
            return bot.status = Universal.Status.OFFLINE
          }
          if (!bot.isActive) return
          _retryCount++
          bot.status = Universal.Status.RECONNECT
          this.timeout = setTimeout(polling, retryInterval)
        }
      }
      polling()
      bot.logger.debug('listening updates %c', 'telegram: ' + bot.selfId)
    })
  }

  async disconnect() {
    clearTimeout(this.timeout)
  }
}

export namespace HttpPolling {
  export interface Options {
    protocol: 'polling'
    pollingTimeout?: number
    retryTimes?: number
    retryInterval?: number
  }

  export const Options: Schema<Options> = Schema.object({
    protocol: Schema.const('polling').required(process.env.KOISHI_ENV !== 'browser'),
    pollingTimeout: Schema.natural().role('ms').default(Time.second * 25).description('通过长轮询获取更新时请求的超时 (单位为毫秒)。'),
    retryTimes: Schema.natural().description('初次连接时的最大重试次数。').default(6),
    retryInterval: Schema.natural().role('ms').default(Time.second * 5).description('长轮询断开后的重试时间间隔 (单位为毫秒)。'),
  })
}
