import { Adapter } from '@satorijs/core'
import { Logger, Schema, Time } from '@satorijs/env-node'
import { Dict } from 'cosmokit'
import { TelegramBot } from './bot'
import { handleUpdate } from './utils'

const logger = new Logger('telegram')

export class HttpPolling extends Adapter.Client<TelegramBot> {
  private offset: Dict<number> = {}
  private isListening = false

  async connect(bot: TelegramBot) {
    const { selfId } = bot
    this.offset[selfId] = this.offset[selfId] || 0

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
    previousUpdates.forEach(e => this.offset[selfId] = Math.max(this.offset[selfId], e.update_id))

    const polling = async () => {
      const updates = await bot.internal.getUpdates({
        offset: this.offset[selfId] + 1,
        timeout: (bot.config as HttpPolling.Config).pollingTimeout,
      })
      for (const e of updates) {
        this.offset[selfId] = Math.max(this.offset[selfId], e.update_id)
        handleUpdate(e, bot)
      }

      if (!this.isListening) {
        setTimeout(polling, 0)
      }
    }
    polling()
    logger.debug('listening updates %c', 'telegram: ' + bot.selfId)
  }

  async start(bot: TelegramBot) {
    this.isListening = true
    bot.initialize(this.connect.bind(this))
  }

  async stop() {
    this.isListening = false
  }
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
