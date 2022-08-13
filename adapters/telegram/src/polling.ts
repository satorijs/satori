import { Adapter, Context, Logger, Schema, Time } from '@satorijs/satori'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'
import axios from 'axios'

const logger = new Logger('telegram')

export class HttpPolling extends Adapter.Client<TelegramBot> {
  private offset = 0

  async start(bot: TelegramBot<Context, TelegramBot.BaseConfig & HttpPolling.Config>) {
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
        if (bot.status === 'disconnect') {
          return bot.offline()
        }

        try {
          const updates = await bot.internal.getUpdates({
            offset: this.offset + 1,
            timeout: bot.config.pollingTimeout,
          })
          bot.online()
          _retryCount = 0
          _initial = false
          
          for (const e of updates) {
            this.offset = Math.max(this.offset, e.update_id)
            handleUpdate(e, bot)
          }
          setTimeout(polling, 0)
        } catch (e) {
          if (!axios.isAxiosError(e) || !e.response?.data) {
            // Other error
            logger.warn('failed to get updates. reason: %s', e.message)
          } else {
            // Telegram error
            const errorBody = e.response.data
            logger.warn('failed to get updates: (%c) %s', errorBody.error_code, errorBody.description)
          }

          if (_initial && _retryCount > retryTimes) {
            bot.error = e
            return bot.status = 'offline'
          }
          _retryCount++
          bot.status = 'reconnect'
          setTimeout(() => polling(), retryInterval)
        }
      }
      polling()
      logger.debug('listening updates %c', 'telegram: ' + bot.selfId)
    })
  }

  async stop() {}
}

export namespace HttpPolling {
  export interface Config {
    protocol: 'polling'
    pollingTimeout?: number
    retryTimes?: number
    retryInterval?: number
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('polling' as const).required(),
    pollingTimeout: Schema.natural().role('time').default(Time.minute).description('通过长轮询获取更新时请求的超时 (单位为秒)。'),
    retryTimes: Schema.natural().description('初次连接时的最大重试次数。').default(6),
    retryInterval: Schema.natural().role('ms').default(Time.second * 5).description('长轮询断开后的重试时间间隔 (单位为毫秒)。'),
  })
}
