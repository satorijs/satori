import { Adapter, Logger, Quester, Schema, Time, Universal } from '@satorijs/satori'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'

const logger = new Logger('telegram')

export class HttpPolling extends Adapter.Client<TelegramBot> {
  private offset = 0
  private timeout: NodeJS.Timeout

  async start(bot: TelegramBot<TelegramBot.BaseConfig & HttpPolling.Config>) {
    bot.initialize(async () => {
      let _retryCount = 0
      let _initial = true
      const { retryTimes, retryInterval } = bot.config
      const { url } = await bot.internal.getWebhookInfo()
      if (url) {
        logger.warn('Bot currently has a webhook set up, trying to remove it...')
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
          if (!Quester.isAxiosError(e) || !e.response?.data) {
            // Other error
            logger.warn('failed to get updates. reason: %s', e.message)
          } else {
            // Telegram error
            const { error_code, description } = e.response.data as any
            logger.warn('failed to get updates: %c %s', error_code, description)
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
      logger.debug('listening updates %c', 'telegram: ' + bot.selfId)
    })
  }

  async stop() {
    clearTimeout(this.timeout)
  }
}

export namespace HttpPolling {
  export interface Config {
    protocol: 'polling'
    pollingTimeout?: number
    retryTimes?: number
    retryInterval?: number
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('polling').required(process.env.KOISHI_ENV !== 'browser'),
    pollingTimeout: Schema.natural().role('ms').default(Time.second * 25).description('通过长轮询获取更新时请求的超时 (单位为毫秒)。'),
    retryTimes: Schema.natural().description('初次连接时的最大重试次数。').default(6),
    retryInterval: Schema.natural().role('ms').default(Time.second * 5).description('长轮询断开后的重试时间间隔 (单位为毫秒)。'),
  })
}
