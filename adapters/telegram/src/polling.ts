import { Adapter, Context, Logger, Schema, Time } from '@satorijs/satori'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'
import axios from 'axios'

const logger = new Logger('telegram')

export class HttpPolling extends Adapter.Client<TelegramBot> {
  private offset = 0

  async start(bot: TelegramBot<Context, TelegramBot.BaseConfig & HttpPolling.Config>) {
    bot.initialize(async () => {
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
          if (bot.status === 'reconnect') bot.status = 'online'
          for (const e of updates) {
            this.offset = Math.max(this.offset, e.update_id)
            handleUpdate(e, bot)
          }
        } catch (e) {
          bot.status = 'reconnect'
          // Telegram error
          if (axios.isAxiosError(e) && e.response && e.response.data) {
            const errorBody = e.response.data
            logger.error('failed to get updates. (%c) reason: %s %c', errorBody.error_code, errorBody.description, 'telegram: ' + bot.selfId)
            // Handle Bot Conflict
            if (errorBody.error_code == 409) {
              bot.status = 'disconnect'
            }
          } else {
            // Other error
            logger.error('failed to get updates. reason: %s %c', e.message, 'telegram: ' + bot.selfId)
          }
        }
        setTimeout(polling, 0)
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
  }

  export const Config: Schema<Config> = Schema.object({
    protocol: Schema.const('polling' as const).required(),
    pollingTimeout: Schema.natural().role('time').default(Time.minute).description('通过长轮询获取更新时请求的超时 (单位为秒)。'),
  })
}
