import {} from '@cordisjs/plugin-http'
import {} from '@cordisjs/plugin-logger'
import { TelegramBot } from '../bot'

export interface Internal {}

export class Internal {
  constructor(public bot: TelegramBot) {}

  static define(method: string) {
    Internal.prototype[method] = async function (this: Internal, data = {}) {
      this.bot.ctx.logger.debug('[request] %s %o', method, data)
      try {
        const response = await this.bot.http.post('/' + method, data)
        this.bot.ctx.logger.debug('[response] %o', response)
        const { ok, result, error_code, description } = response
        if (ok) return result
        throw new Error(`Telegram API error ${error_code}. ${description}`)
      } catch (err) {
        if (err.response) {
          const body = await err.response.json().catch(() => null)
          if (body?.error_code && body.description) {
            throw new Error(`Telegram API error ${body.error_code}. ${body.description}`)
          }
        }
        throw err
      }
    }
  }
}
